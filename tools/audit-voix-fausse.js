/* Qui parle — les attributions **fausses**, pas les ambiguës.
 *
 * `audit-voix.js` liste les répliques que rien ne tranche, pour qu'on les
 * marque à la main. Cet outil-ci répond à l'autre question : parmi les
 * répliques que le moteur attribue **sans hésiter**, lesquelles se trompent ?
 *
 * On ne réimplémente pas la règle. On charge le jeu construit dans un vrai
 * navigateur et on appelle `peindreTexte()` — la fonction que le jeu emploie
 * lui-même — sur le texte de chaque scène. Une copie de la boucle dériverait
 * au premier correctif, et c'est précisément ce genre de dérive qu'on traque.
 *
 * Ce qui trahit une réplique peinte en Yohan qui n'est pas de lui :
 *
 *   · « messire », « monseigneur » — on ne se les donne pas à soi-même ;
 *   · une incise en `dit-elle` / `répond-il` dans la réplique même ;
 *
 * On a essayé « votre maison », « votre père » : c'est un mauvais signal, et
 * la liste l'a montré tout de suite. Yohan dit « votre père » à la fille de
 * Rochebrune, et il a raison de le dire — s'adresser à quelqu'un n'est pas
 * une preuve qu'on est quelqu'un d'autre. Un signal qui produit des faux
 * positifs coûte plus cher qu'il ne rapporte : on relit alors des répliques
 * justes, et on finit par ne plus relire du tout.
 *
 * Et l'inverse, plus rare : une réplique peinte en interlocuteur qui porte
 * une incise en `-vous`.
 *
 * L'outil ne corrige rien : il faut un `@` ou un `^` posé à la main, et
 * personne ne peut deviner l'intention à notre place.
 *
 *   node tools/audit-voix-fausse.js
 */
const { chromium } = require('playwright-core');
const path = require('path');

const JEU = 'file://' + path.resolve(__dirname, '..', 'dist', 'acte1.html');

/* Ce qu'un homme ne dit pas de lui-même. */
const PAS_YOHAN = [
  [String.raw`\bmessire\b`, 'i', '« messire »'],
  [String.raw`\bmonseigneur\b`, 'i', '« monseigneur »'],
  [String.raw`\b(dit|répond|demande|reprend|ajoute|souffle|lâche|conclut|coupe|corrige|insiste|murmure|observe|remarque|fait)-t?-?(elle|il)\b`, 'i', 'incise « …-elle / …-il »'],
];
/* Ce que l'interlocuteur ne dit pas. */
const PAS_AUTRE = [
  [String.raw`»[^«»]{0,24}?\b\w+-vous\b`, '', 'incise « …-vous »'],
];

(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium' });
  const p = await b.newPage();
  await p.goto(JEU, { waitUntil:'domcontentloaded' });
  for(let i = 0; i < 80; i++){
    if(await p.evaluate(() => typeof SCENES === 'object' && typeof peindreTexte === 'function')
         .catch(() => false)) break;
    await p.waitForTimeout(250);
  }
  if(!await p.evaluate(() => typeof peindreTexte === 'function')){
    console.error("Le jeu ne s'est pas monté — relancez `node tools/build-acte1.js`.");
    process.exit(2);
  }

  const res = await p.evaluate(({ py, pa }) => {
    const compile = l => l.map(([s, f, quoi]) => [new RegExp(s, f), quoi]);
    const PY = compile(py), PA = compile(pa);
    const out = [];
    const d = document.createElement('div');

    for(const id of Object.keys(SCENES)){
      const s = SCENES[id];
      if(!s || !s.texte) continue;
      try { d.innerHTML = peindreTexte(s.texte); } catch(e){ continue; }
      for(const par of d.querySelectorAll('p.recit.dit')){
        const t = par.textContent;
        const aYohan = par.classList.contains('moi');
        for(const [r, quoi] of (aYohan ? PY : PA))
          if(r.test(t)){ out.push({ id, a:aYohan ? 'Yohan' : "l'autre", quoi, t:t.slice(0, 140) }); break; }
      }
    }
    return out;
  }, { py:PAS_YOHAN, pa:PAS_AUTRE });

  console.log('\nPARIAS — attributions de voix douteuses\n');
  if(!res.length){ console.log('  ok  aucune\n'); await b.close(); return; }

  const parScene = {};
  for(const x of res) (parScene[x.id] = parScene[x.id] || []).push(x);
  for(const [id, l] of Object.entries(parScene)){
    console.log(`  ${id}`);
    for(const x of l) console.log(`      peinte « ${x.a} » · ${x.quoi}\n        ${x.t}`);
  }
  console.log(`\n${res.length} réplique(s) douteuse(s) dans ${Object.keys(parScene).length} scène(s).\n`);
  await b.close();
})();
