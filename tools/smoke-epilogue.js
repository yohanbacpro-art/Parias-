/* PARIAS — Épreuve de l'épilogue
 *
 *   node tools/build-standalone.js && node tools/smoke-epilogue.js
 *
 * Deux chroniques opposées doivent produire deux fins différentes, et
 * l'héritage de la première doit se retrouver au départ de la seconde.
 */
const { chromium } = require('playwright-core');
const path = require('path');

const url = 'file://' + path.join(__dirname, '..', 'dist', 'parias.html');
let echecs = 0;
function verifie(nom, condition, detail){
  if(condition) console.log('  ✔', nom);
  else { echecs++; console.log('  ✘', nom, detail !== undefined ? '→ '+JSON.stringify(detail).slice(0,300) : ''); }
}

/* Amène le jeu jusqu'à l'écran d'épilogue avec un état donné. */
async function jouerJusquALaFin(page, etat){
  await page.click('#btnStart');
  for(let i = 0; i < 6; i++){
    if(!await page.isVisible('#prologueNextBtn')) break;
    await page.click('#prologueNextBtn'); await page.waitForTimeout(25);
  }
  await page.evaluate(e => {
    Object.assign(hero, e.hero);
    hero.flags.push(...e.flags);
    Object.assign(hero.tensions, e.tensions || {});
    (e.compagnons || []).forEach(id => { if(COMPANIONS_POOL[id]) hero.compagnons.push(COMPANIONS_POOL[id]); });
    Object.assign(hero.affinites, e.affinites || {});
    hero.trame.chapitre = TRAME_CHAPITRES.length - 2;
    hero.trame.points = 200;
    triggerChapitre(TRAME_CHAPITRES.length - 1);
  }, etat);
  await page.waitForTimeout(80);
  await page.click('#closeChapBtn');
  await page.waitForTimeout(120);
}

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args:['--no-sandbox'] });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  page.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });

  /* ---------- Chronique 1 : le nom rendu, le monde apaisé ---------- */
  console.log('\nChronique de l\'Empire — le nom rendu, le monde apaisé');
  await page.goto(url);
  await jouerJusquALaFin(page, {
    hero: { niveau:16, or:2400, renom:42, suspicion:30 },
    flags: ['voie_empire','fin_acte','karlsberg_reconnue','banniere_sceau',
            'crise_parias_reglee','crise_nains_reglee','kardurak_sauve',
            'horde_dispersee','crise_peaux_vertes_reglee','pierres_accordees',
            'archive_publiee','khesh_unifies','caleb_pacte','lucius_brise',
            'cycle_compris','nomme_par_onde','reseau_parias','sans_nom_leves',
            'route_grise_liberee','cg_kardurak_fait','cg_horde_fait','cg_khesh_fait'],
    tensions: { humains:15, elfes:20, khesh:20, nains:18, peaux_vertes:20, hommes_betes:20 },
    compagnons: ['alycia','alarielle'],
    affinites: { alycia:6, alarielle:4 },
  });

  const e1 = await page.evaluate(() => ({
    ecran: document.getElementById('screen-epilogue').classList.contains('active'),
    titre: document.querySelector('.epi-titre').textContent.trim(),
    peuples: [...document.querySelectorAll('.epi-peuple-nom')].map(n => n.textContent.trim()),
    gens: document.querySelectorAll('.epi-gens').length,
    legs: [...document.querySelectorAll('.epi-leg-nom')].map(n => n.textContent.trim()),
    onde: (document.querySelector('.epi-onde') || {}).textContent || '',
    bilan: document.querySelector('.epi-bilan').textContent,
    corps: document.getElementById('epilogueCorps').textContent,
    sauve: !!lireSlot('auto'),
    archive: !!lireSlot('s1'),
    garde: document.querySelector('.epi-garde').textContent,
    heritage: lireHeritage(),
  }));
  verifie('l\'écran d\'épilogue s\'ouvre', e1.ecran);
  verifie('le verdict correspond à la voie choisie', e1.titre === 'Le nom rendu au monde', e1.titre);
  verifie('les huit peuples rendent leur verdict', e1.peuples.length === 8, e1.peuples);
  verifie('les compagnes ont leur sort', e1.gens >= 4, e1.gens);
  verifie('Alycia est restée', /Alycia de Callensbourg<?\/?b?> ?resta|Alycia de Callensbourg/.test(e1.corps) && /resta\./.test(e1.corps));
  verifie('Kar-Durak est sauvée dans le texte', /Kar-Durak tint/.test(e1.corps));
  verifie('la Horde est dispersée dans le texte', /se défit en une saison/.test(e1.corps));
  verifie('le fil de l\'Onde est repris', /cycle/.test(e1.onde), e1.onde.slice(0,80));
  verifie('le compte est rendu', /Renom/.test(e1.bilan) && /42/.test(e1.bilan));
  verifie('la chronique achevée est enregistrée', e1.sauve);
  verifie('elle est rangée dans un emplacement manuel', e1.archive);
  verifie('l\'écran dit où elle est rangée', /Emplacement 1/.test(e1.garde), e1.garde);
  verifie('un héritage est constitué', e1.heritage && e1.heritage.chroniques === 1, e1.heritage);
  verifie('les legs mérités sont accordés', e1.legs.length >= 4, e1.legs);
  console.log('    legs :', e1.legs.join(' · '));
  console.log('    héritage :', JSON.stringify(e1.heritage.effet));

  /* ---------- L'héritage traverse ---------- */
  console.log('\nL\'héritage traverse jusqu\'à la chronique suivante');
  const attendu = e1.heritage.effet;
  await Promise.all([
    page.waitForNavigation({ waitUntil:'load' }),
    page.evaluate(() => nouvelleChronique()),
  ]);
  await page.waitForFunction(() => typeof hero !== 'undefined' && !!document.getElementById('btnStart'));
  const h2 = await page.evaluate(() => ({
    banniere: document.getElementById('heritageAccueil').textContent.trim(),
    avant: { or: hero.or, renom: hero.renom, tp: hero.talentPoints },
  }));
  verifie('l\'accueil annonce l\'héritage', /chronique achevée/.test(h2.banniere), h2.banniere);
  await page.click('#btnStart');
  const h2b = await page.evaluate(() => ({ or: hero.or, renom: hero.renom, tp: hero.talentPoints }));
  verifie('l\'or est transmis', h2b.or === h2.avant.or + (attendu.or || 0), [h2b.or, h2.avant.or, attendu.or]);
  verifie('le Renom est transmis', h2b.renom === h2.avant.renom + (attendu.renom || 0), [h2b.renom, attendu.renom]);
  verifie('les points de talent sont transmis', h2b.tp === h2.avant.tp + (attendu.talentPoints || 0), [h2b.tp, attendu.tp]);
  const survit = await page.evaluate(() => { const e = lireSlot('s1'); return e ? e.meta.niveau : null; });
  verifie('la chronique achevée survit à la nouvelle', survit === 16, survit);

  /* ---------- Chronique 2 : tout s'effondre ---------- */
  console.log('\nChronique du refuge — le monde s\'effondre');
  const ctx2 = await browser.newContext();
  const page2 = await ctx2.newPage();
  page2.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });
  await page2.goto(url);
  await jouerJusquALaFin(page2, {
    hero: { niveau:9, or:60, renom:4, suspicion:85 },
    flags: ['voie_refuge','refus_banniere','kardurak_tombe','grande_horde_passee',
            'archive_etouffee','trahi_kemval','caleb_hostile','vauclair_rancune',
            'onde_suivait','alarielle_renvoyee','valombre_abandonnee'],
    tensions: { humains:75, elfes:70, khesh:70, nains:70, peaux_vertes:78, hommes_betes:70 },
    compagnons: [],
    affinites: {},
  });
  const e2 = await page2.evaluate(() => ({
    titre: document.querySelector('.epi-titre').textContent.trim(),
    corps: document.getElementById('epilogueCorps').textContent,
    legs: [...document.querySelectorAll('.epi-leg-nom')].map(n => n.textContent.trim()),
    peuples: document.querySelectorAll('.epi-peuple').length,
  }));
  verifie('le verdict est celui du refuge', e2.titre === 'La maison ouverte', e2.titre);
  verifie('les huit peuples rendent encore leur verdict', e2.peuples === 8, e2.peuples);
  verifie('Kar-Durak tombe', /Kar-Durak tomba/.test(e2.corps));
  verifie('la Horde passe', /La Horde passa/.test(e2.corps));
  verifie('la trahison de Kemval est retenue', /Kemval/.test(e2.corps));
  verifie('cette fin transmet peu', e2.legs.length <= 1, e2.legs);
  verifie('les deux fins sont bien différentes', e1.titre !== e2.titre);
  await ctx2.close();

  await browser.close();
  console.log(echecs ? `\n${echecs} échec(s).` : '\nÉpilogue : les fins se distinguent, l\'héritage traverse.');
  process.exit(echecs ? 1 : 0);
})();
