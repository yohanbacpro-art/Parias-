/* Qui parle ?
 *
 * Le moteur attribue les répliques dans cet ordre : `@` pour Yohan, `^` pour
 * l'interlocuteur, les incises (*dites-vous* / *dit-elle*), puis l'alternance
 * — qui ne franchit pas une ligne de récit.
 *
 * Il reste donc un cas que rien ne tranche : une réplique non marquée, sans
 * incise, posée juste après du récit ou en tête de scène. Le moteur la donne
 * à l'interlocuteur, ce qui est vrai la plupart du temps — c'est lui qui
 * vient, c'est lui qui a quelque chose à dire. Quand c'est Yohan, il faut un
 * `@`, et personne ne peut le deviner à notre place.
 *
 * Cet outil ne corrige rien. Il sort la liste exacte de ces répliques-là,
 * avec la ligne de récit qui les précède, pour qu'on les relise et qu'on
 * marque celles qui sont de Yohan.
 *
 *   node tools/audit-voix.js              tout
 *   node tools/audit-voix.js acte2/prix   un fichier
 */

const fs = require('fs');
const path = require('path');

const RACINE = path.join(__dirname, '..', 'proto');

const filtre = process.argv[2] || '';
/* `coupe` (défaut) : seulement les répliques que l'alternance ne couvre pas.
 * `enchaine` : aussi celles qu'elle couvre, pour débusquer les tirades. */
const mode = process.argv[3] || 'coupe';

/* Ces deux expressions sont **celles du moteur**, recopiées de
 * `proto/acte1/moteur.js`. Si elles divergent, l'outil ment : il signale des
 * répliques que le moteur attribue très bien, et se tait sur celles qu'il
 * attribue mal. Toute modification là-bas se recopie ici. */
const DIT_YOHAN = /»[^«»]{0,24}?\b(dites|demandez|répondez|reprenez|constatez|répétez|lancez|corrigez|glissez|coupez|insistez|soufflez|ajoutez|concédez|admettez|articulez|murmurez|proposez|lâchez|objectez|précisez)-vous\b/;
const DIT_AUTRE = /»[,.]?\s*(dit|répond|demande|ajoute|reprend|constate|lâche|souffle|concède|corrige|glisse|coupe|conclut|observe|remarque|répète|note|admet|lit|traduit|explique|précise|insiste|murmure|articule|fait|finit|objecte)[a-zéèêà-]*\s+(?:[A-ZÀ-Þ]|l['’]|l[ea] |une? |s[oa]n |m[oa] )|»\s*(Elle|Il|Le |La )|\b(dit|répond|demande|répète|ajoute|reprend|corrige|constate|fait|souffle|concède|lâche|conclut|observe|remarque|note|admet|explique|précise|insiste|murmure|articule|objecte)-t?-?(elle|il)\b/;

const estReplique = t => /^[«—@^]/.test(t.trim());

/* On ne parse pas le JS : on lit les lignes de tableau `texte:[ … ]`, ce qui
 * suffit pour situer chaque réplique par rapport à ce qui la précède. */
function scannerFichier(rel){
  const src = fs.readFileSync(path.join(RACINE, rel), 'utf8').split('\n');
  const trouves = [];

  let scene = '(?)';        // dernière clé de scène rencontrée
  let dansTexte = false;
  let profondeur = 0;
  let precedent = null;     // dernier paragraphe vu, tel quel
  let dernierType = null;   // 'replique' | 'recit' | null (début de scène)

  src.forEach((ligne, i) => {
    const cle = ligne.match(/^([a-z][a-z0-9_]*)\s*:\s*\{/i);
    if(cle && !dansTexte){ scene = cle[1]; dernierType = null; }

    if(/^\s*texte\s*:\s*\[/.test(ligne)){
      dansTexte = true; profondeur = 0; dernierType = null; precedent = null;
      return;
    }
    if(!dansTexte) return;

    /* Fin du tableau : un `]` à la profondeur zéro. */
    if(/^\s*\],?\s*$/.test(ligne) && profondeur === 0){ dansTexte = false; return; }
    profondeur += (ligne.match(/\{/g) || []).length;
    profondeur -= (ligne.match(/\}/g) || []).length;
    if(profondeur < 0) profondeur = 0;

    /* Les paragraphes qui nous intéressent : une chaîne littérale, soit nue,
     * soit portée par un palier de gore (on juge sur `sobre`, qui donne le
     * ton des trois). */
    const nue    = ligne.match(/^\s*"((?:[^"\\]|\\.)*)"\s*,?\s*$/);
    const palier = ligne.match(/sobre\s*:\s*"((?:[^"\\]|\\.)*)"/);
    const brut = nue ? nue[1] : palier ? palier[1] : null;
    if(brut === null){
      /* Une fonction, un `()=>`, un commentaire : on ne sait pas, on coupe. */
      if(/^\s*\(\)\s*=>/.test(ligne)) dernierType = null;
      return;
    }

    const t = brut.replace(/\\n\\n/g, ' ').replace(/\\"/g, '"').trim();
    if(!t) return;

    if(t.startsWith('§')){ precedent = t; return; }   // le souffle ne coupe pas

    if(!estReplique(t)){ dernierType = 'recit'; precedent = t; return; }

    /* Réplique. Marquée ou attribuée par une incise : rien à signaler. */
    const marquee = /^[@^]/.test(t);
    const incise  = DIT_YOHAN.test(t) || DIT_AUTRE.test(t);

    /* Deux cas douteux, et ce ne sont pas les mêmes.
     *
     * `coupe` — ni marque ni incise, et l'alternance est coupée : début de
     * scène, ou récit juste avant. Le moteur dira « l'interlocuteur ».
     *
     * `enchaine` — ni marque ni incise, collée à la réplique précédente.
     * Le moteur alterne. C'est juste dans un échange, faux dans une tirade
     * que personne n'interrompt : « … » « … » d'un seul homme. */
    if(!marquee && !incise){
      const genre = dernierType === 'replique' ? 'enchaine' : 'coupe';
      if(genre === 'coupe' || mode !== 'coupe')
        trouves.push({
          scene, ligne:i + 1, genre,
          avant: precedent ? precedent.slice(0, 90) : '(début de scène)',
          texte: t.slice(0, 150),
        });
    }
    dernierType = 'replique';
    precedent = t;
  });

  return trouves;
}

const fichiers = [];
for(const acte of ['acte1', 'acte2']){
  const d = path.join(RACINE, acte);
  if(!fs.existsSync(d)) continue;
  for(const f of fs.readdirSync(d).filter(f => f.endsWith('.js')).sort())
    fichiers.push(`${acte}/${f}`);
}

console.log('\nPARIAS — répliques que rien n\'attribue\n');
console.log('  Sans marque, le moteur les donne à l\'interlocuteur — ou alterne');
console.log('  (lignes `·`). `@` pour Yohan, `^` pour celui d\'en face.\n');

let total = 0;
for(const rel of fichiers){
  if(filtre && !rel.includes(filtre)) continue;
  const t = scannerFichier(rel);
  if(!t.length) continue;
  total += t.length;
  console.log(`\n── ${rel}  (${t.length})\n`);
  let derniereScene = null;
  for(const c of t){
    if(c.scene !== derniereScene){ console.log(`   ${c.scene}`); derniereScene = c.scene; }
    const tag = c.genre === 'enchaine' ? '·' : ' ';
    console.log(`   ${tag} ${String(c.ligne).padStart(5)}  avant : ${c.avant}`);
    console.log(`            ${c.texte}`);
  }
}

console.log(`\n${total} réplique(s) à trancher.\n`);
