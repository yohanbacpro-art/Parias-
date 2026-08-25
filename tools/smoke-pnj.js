/* PARIAS — Épreuve des neuf acteurs autonomes
 *
 *   node tools/build-standalone.js && node tools/smoke-pnj.js
 *
 * Ce qu'on vérifie : qu'ils agissent sans le joueur, que ce qu'ils font découle
 * de leurs intérêts et non d'un dé, qu'ils retiennent nommément ce que Yohan a
 * fait, et que ce qu'ils décident change réellement le monde.
 */
const { chromium } = require('playwright-core');
const path = require('path');
const url = 'file://' + path.join(__dirname, '..', 'dist', 'parias.html');
let echecs = 0;
const verifie = (n, ok, d) => { if(ok) console.log('  ✔', n);
  else { echecs++; console.log('  ✘', n, d !== undefined ? '→ '+JSON.stringify(d).slice(0,260) : ''); } };

(async () => {
  const browser = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });
  await page.goto(url);
  await page.click('#btnStart');
  for(let i=0;i<6;i++){ if(!await page.isVisible('#prologueNextBtn')) break; await page.click('#prologueNextBtn'); await page.waitForTimeout(20); }

  /* ---------- 1. Neuf personnes, pas neuf peuples ---------- */
  console.log('\nNeuf personnes, chacune avec ce qu\'il lui faut pour exister');
  const fiches = await page.evaluate(() => PNJ_AUTONOMES.map(p => ({
    id:p.id, nom:p.nom, age:p.age, lieu:p.lieu, peuple:p.peuple, maison:p.maison,
    traits:(p.traits||[]).length, ambitions:(p.ambitions||[]).length,
    retient:(p.retient||[]).length, actions:(p.actions||[]).length,
    portrait: typeof PORTRAITS !== 'undefined' && !!PORTRAITS[p.portrait],
    objectif: (()=>{ try { return p.objectif(); } catch(e){ return null; } })(),
  })));
  verifie('les neuf du document fondateur', fiches.length === 9, fiches.length);
  verifie('chacun a un âge, un lieu, une maison, un peuple',
    fiches.every(f => f.age > 0 && f.lieu && f.maison && f.peuple), fiches.find(f => !f.lieu));
  verifie('chacun a des traits et des ambitions',
    fiches.every(f => f.traits >= 2 && f.ambitions >= 1), fiches.map(f => f.traits));
  verifie('chacun a un objectif qui se formule en toutes lettres',
    fiches.every(f => f.objectif && f.objectif.length > 12), fiches.map(f => f.objectif).slice(0,2));
  verifie('chacun a de la mémoire à poser et des actes à faire',
    fiches.every(f => f.retient >= 3 && f.actions >= 3), fiches.map(f => [f.retient, f.actions]));
  verifie('chacun a son portrait', fiches.every(f => f.portrait), fiches.filter(f => !f.portrait));

  /* ---------- 2. L'objectif suit le monde, il n'est pas figé ---------- */
  console.log('\nCe qu\'ils poursuivent change avec le monde');
  const objectifs = await page.evaluate(() => {
    hero.flags = []; hero.crises = {}; syncTensions();
    const calme = PNJ_AUTONOMES.map(p => p.objectif());
    hero.crises.ELFES.palier = 4; hero.crises.HOMMES_BETES.palier = 3;
    hero.crises.ASTRAH.palier = 4; syncTensions();
    const guerre = PNJ_AUTONOMES.map(p => p.objectif());
    return { calme, guerre, changes: calme.filter((o,i) => o !== guerre[i]).length };
  });
  console.log(`    ${objectifs.changes} des neuf changent d'objectif quand le monde bascule`);
  verifie('un monde en guerre leur donne d\'autres priorités', objectifs.changes >= 4, objectifs.changes);

  /* ---------- 3. Ils se souviennent, nommément ---------- */
  console.log('\nIls retiennent, et ce qu\'ils retiennent porte une date');
  const memoire = await page.evaluate(() => {
    hero.pnj = {}; hero.flags = []; heroPnj();
    const avant = pnjOpinion('lucius');
    hero.flags.push('lucius_reporte', 'banniere_haute');
    pnjRelire({ saison:'Été', an:7 });
    const e = pnjEtat('lucius');
    return { avant, apres: pnjOpinion('lucius'),
             souvenirs: e.memoire.map(m => ({ texte:m.texte, date:m.date })),
             humeur: pnjHumeur('lucius').nom,
             alycia: (()=>{ hero.flags.push('genealogies_vendues'); pnjRelire({saison:'Été',an:7});
                            return { op: pnjOpinion('alycia'), humeur: pnjHumeur('alycia').nom }; })() };
  });
  memoire.souvenirs.forEach(s => console.log(`    ${s.date} — ${s.texte}`));
  verifie('un acte marquant devient un souvenir daté',
    memoire.souvenirs.length === 2 && memoire.souvenirs.every(s => /An \d/.test(s.date)), memoire.souvenirs);
  verifie('et il change ce qu\'il pense de vous', memoire.apres < memoire.avant, memoire);
  verifie('vendre la liste des Parias fait d\'Alycia une ennemie',
    ['hostile','ennemi'].includes(memoire.alycia.humeur), memoire.alycia);

  /* ---------- 4. Ils agissent, et ce n'est pas un dé ---------- */
  console.log('\nIls agissent d\'eux-mêmes, et toujours pour la même raison');
  const agir = await page.evaluate(() => {
    /* Dix ans. Avec la politique, le monde tourne comme en partie ; sans elle,
       il ne reste que les crises et eux — et c'est là qu'on peut vérifier
       qu'aucun dé ne décide à leur place, la politique ayant les siens. */
    const jouer = (flags, avecPolitique) => {
      hero.pnj = {}; hero.flags = flags.slice(); hero.chroniques = [];
      hero.crises = {}; hero.politique = {};
      heroPnj(); syncTensions();
      const faits = [];
      const d = { saison:'Printemps', an:5, saisonIdx:1 };
      for(let t = 0; t < 40; t++){
        criseTick(d);
        if(avecPolitique) politiqueTick(13);
        pnjTick(d).forEach(f => faits.push(f.pnj.id + '/' + f.action.id));
      }
      return faits.sort();
    };
    const vivant = jouer(['lucius_reporte'], true);
    const a = jouer(['lucius_reporte'], false);
    const b = jouer(['lucius_reporte'], false);
    const c = jouer(['genealogies_vendues'], false);
    return { vivant, a, b, c, memeMonde: JSON.stringify(a) === JSON.stringify(b) };
  });
  console.log('    ' + agir.vivant.slice(0, 6).join(' · '));
  verifie("en dix ans, la moitié d'entre eux au moins a fait quelque chose",
    agir.vivant.length >= 6, agir.vivant.length);
  verifie('deux mondes identiques produisent exactement les mêmes décisions',
    agir.memeMonde, { a:agir.a, b:agir.b });
  verifie("un monde différent en produit d'autres",
    JSON.stringify(agir.a) !== JSON.stringify(agir.c), { a:agir.a, c:agir.c });

  /* ---------- 5. Ce qu'ils décident change le monde ---------- */
  console.log('\nCe qu\'ils font compte');
  const monde = await page.evaluate(() => {
    hero.pnj = {}; hero.flags = ['alarielle_a_parle']; hero.chroniques = []; hero.crises = {};
    heroPnj(); syncTensions();
    hero.crises.ELFES.palier = 3;
    const avant = { elfes: reputationDe('parias'), pression: hero.crises.ELFES.pression };
    const d = { saison:'Hiver', an:9, saisonIdx:0 };
    const faits = [];
    for(let t = 0; t < 6; t++) pnjTick(d).forEach(f => faits.push(f));
    return { avant, apres: { parias: reputationDe('parias'), pression: hero.crises.ELFES.pression },
             flags: hero.flags.filter(f => /alarielle|eltharion|charles|lucius|tyrion|anarion/.test(f)),
             chroniques: hero.chroniques.map(c => c.texte),
             vieillis: PNJ_AUTONOMES.filter(p => pnjAge(p.id) > p.age).length };
  });
  verifie('une médiation freine réellement la crise elfique',
    monde.apres.pression < monde.avant.pression || monde.flags.includes('alarielle_mediation'), monde);
  verifie('leurs actes posent des marqueurs que le reste du jeu peut lire',
    monde.flags.length >= 2, monde.flags);
  verifie('chaque acte laisse une chronique écrite',
    monde.chroniques.length >= 2 && monde.chroniques.every(t => t.length > 60), monde.chroniques.slice(0,1));
  verifie('ils vieillissent', monde.vieillis === 9, monde.vieillis);

  /* ---------- 6. Ils meurent, et la mort tient ---------- */
  console.log('\nIls meurent, et ça ne se répare pas');
  const mort = await page.evaluate(() => {
    hero.pnj = {}; hero.flags = []; hero.chroniques = []; heroPnj();
    pnjEtat('khalvaene').age = 74;
    const d = { saison:'Automne', an:20, saisonIdx:2 };
    pnjTick(d);
    const apres = { vivant: pnjVivant('khalvaene'), flag: hasFlag('khalvaene_mort') };
    for(let t = 0; t < 8; t++) pnjTick(d);
    return { apres, encoreMort: !pnjVivant('khalvaene'),
             chronique: hero.chroniques.map(c => c.texte).find(t => /Khal-Vaene/.test(t)) || '' };
  });
  verifie('un très vieil homme finit par mourir', !mort.apres.vivant && mort.apres.flag, mort.apres);
  verifie('et il reste mort', mort.encoreMort);
  verifie('sa mort est racontée', mort.chronique.length > 60, mort.chronique.slice(0,80));

  /* ---------- 7. L'écran les montre pour ce qu'ils sont ---------- */
  console.log('\nL\'écran montre des gens, pas des jauges');
  const ecran = await page.evaluate(() => {
    hero.pnj = {}; hero.flags = ['trois_chenes_traite','banniere_haute']; heroPnj();
    pnjRelire({ saison:'Été', an:5 });
    renderChroniques();
    const g = document.getElementById('pnjGrid');
    return { cartes: g.querySelectorAll('.pnja').length,
             objectifs: g.querySelectorAll('.pnja-objectif').length,
             souvenirs: [...g.querySelectorAll('.pnja-memoire li')].map(e => e.textContent.trim()),
             humeurs: [...g.querySelectorAll('.pnja-humeur')].map(e => e.textContent.trim()),
             chiffres: /opinion\s*[:=]\s*-?\d/i.test(g.textContent) };
  });
  verifie('les neuf sont affichés', ecran.cartes === 9, ecran.cartes);
  verifie('chacun montre ce qu\'il poursuit', ecran.objectifs === 9, ecran.objectifs);
  verifie('ce qu\'ils retiennent est affiché en toutes lettres',
    ecran.souvenirs.length >= 2 && ecran.souvenirs.every(t => t.length > 25), ecran.souvenirs.slice(0,2));
  verifie('leur humeur est un mot, pas un nombre',
    ecran.humeurs.every(h => /^[a-zéè—]+$/i.test(h)) && !ecran.chiffres, ecran.humeurs);

  await browser.close();
  console.log(echecs ? `\n${echecs} échec(s).` : '\nNeuf personnes vivent, décident, se souviennent et meurent.');
  process.exit(echecs ? 1 : 0);
})();
