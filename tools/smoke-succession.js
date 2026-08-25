/* PARIAS — Épreuve de la succession
 *
 *   node tools/build-standalone.js && node tools/smoke-succession.js
 *
 * *« Le temps est une mécanique réelle. Les personnages vieillissent, les
 * enfants deviennent adultes […] on meurt, on hérite. Les descendants
 * Karlsberg comptent sur une longue campagne. »*
 *
 * On vérifie que la partie continue avec l'héritier, que le monde ne bouge pas
 * d'un pouce au passage — crises, mémoire des neuf, Karlsberg bâtie, sources
 * ouvertes — et que l'homme, lui, recommence.
 */
const { chromium } = require('playwright-core');
const path = require('path');
const url = 'file://' + path.join(__dirname, '..', 'dist', 'parias.html');
let echecs = 0;
const verifie = (n, ok, d) => { if(ok) console.log('  ✔', n);
  else { echecs++; console.log('  ✘', n, d !== undefined ? '→ '+JSON.stringify(d).slice(0,280) : ''); } };

/* Fabrique une partie tardive : un homme vieux, une maison bâtie, un monde
   avancé, et deux enfants adultes. */
const PARTIE_TARDIVE = () => {
  hero.age = 70; hero.generation = 1; hero.nom = 'Yohan';
  hero.niveau = 15; hero.xp = 900; hero.talentPoints = 7;
  hero.or = 5000; hero.renom = 80; hero.suspicion = 90;
  hero.compagnons = [COMPANIONS_POOL.alycia];
  hero.armee = [{ id:'u1', effectif:40 }];
  hero.flags = ['banniere_haute','rochebrune_carriere','refuge_tenu','route_franche',
                'charles_allie','lucius_reporte','cg_route_fait','karlsberg_habitable'];
  hero.chantier = ['ch_cour','ch_enceinte','ch_puits','ch_salle'];
  hero.ressources = { pierre:20, bras:15, grain:12, faveurs:6 };
  hero.crises = {}; heroCrises();
  hero.crises.ELFES.palier = 3; hero.crises.ASTRAH.palier = 2;
  hero.pnj = {}; heroPnj(); pnjRelire({ saison:'Été', an:30 });
  hero.liens = {}; heroLiens(); ajusterLien('alycia', { relation:8, confiance:8, attirance:8 });
  hero.lignee = { liaisons:[{ nom:'Dame Ysoré', maison:'Maison de Corven', enfants:[] }], enfants:[
    { nom:'Otto de Corven',   sexe:'m', mere:'Dame Ysoré', maison:'Maison de Corven', ne:0, age:24, paria:true },
    { nom:'Mahaut de Corven', sexe:'f', mere:'Dame Ysoré', maison:'Maison de Corven', ne:0, age:19, paria:false },
    { nom:'Aude de Corven',   sexe:'f', mere:'Dame Ysoré', maison:'Maison de Corven', ne:0, age:6,  paria:true },
  ]};
  hero.successionEnCours = false;
  syncTensions();
};

(async () => {
  const browser = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });
  await page.goto(url);
  await page.click('#btnStart');
  for(let i=0;i<6;i++){ if(!await page.isVisible('#prologueNextBtn')) break; await page.click('#prologueNextBtn'); await page.waitForTimeout(20); }
  await page.evaluate(`window.PARTIE_TARDIVE = ${PARTIE_TARDIVE.toString()}`);

  /* ---------- 1. Qui peut succéder ---------- */
  console.log('\nUn enfant majeur, et le sang d\'abord');
  const qui = await page.evaluate(() => {
    PARTIE_TARDIVE();
    const e = heritiersEligibles();
    hero.lignee.enfants = hero.lignee.enfants.filter(x => x.age < 16);
    return { eligibles: e.map(x => `${x.nom} (${x.age}, ${x.paria ? 'Onde' : '—'})`),
             premier: e[0].nom, sansAdulte: heritiersEligibles().length,
             possible: successionPossible() };
  });
  console.log('    ' + qui.eligibles.join(' · '));
  verifie('seuls les majeurs héritent', qui.eligibles.length === 2, qui.eligibles);
  verifie('celui qui porte l\'Onde passe devant', /Otto/.test(qui.premier), qui.premier);
  verifie('un enfant de six ans ne succède pas', qui.sansAdulte === 0, qui.sansAdulte);

  /* ---------- 2. Transmettre de son vivant ---------- */
  console.log('\nTransmettre de son vivant est une décision, pas une reddition');
  const vivant = await page.evaluate(() => {
    PARTIE_TARDIVE();
    const avecMaison = peutTransmettre();
    hero.chantier = [];
    const enRuines = peutTransmettre();
    hero.chantier = ['ch_cour','ch_enceinte','ch_puits','ch_salle'];
    hero.lignee.enfants = [];
    const sansEnfant = peutTransmettre();
    return { avecMaison, enRuines, sansEnfant };
  });
  verifie('avec une maison debout et un héritier, c\'est offert', !!vivant.avecMaison.oui, vivant.avecMaison);
  verifie('on ne transmet pas un tas de pierres',
    !vivant.enRuines.oui && /pierres/.test(vivant.enRuines.non), vivant.enRuines);
  verifie('ni un nom à personne',
    !vivant.sansEnfant.oui && /enfant/.test(vivant.sansEnfant.non), vivant.sansEnfant);

  /* ---------- 3. Le monde ne bouge pas d'un pouce ---------- */
  console.log('\nLe monde reste exactement où il en était');
  const monde = await page.evaluate(() => {
    PARTIE_TARDIVE();
    const avant = {
      crises: CRISES.map(c => criseEtape(c.id)),
      memoireLucius: pnjEtat('lucius').memoire.map(m => m.texte),
      humeurLucius: pnjHumeur('lucius').nom,
      chantier: hero.chantier.slice(),
      palier: palierKarlsberg().nom,
      sources: sourcesActives().length,
      ressources: { ...hero.ressources },
      armee: hero.armee.length,
      chroniques: hero.chroniques.length,
    };
    ouvrirSuccession('transmission');
    const r = succeder('Otto de Corven');
    const apres = {
      crises: CRISES.map(c => criseEtape(c.id)),
      memoireLucius: pnjEtat('lucius').memoire.map(m => m.texte),
      humeurLucius: pnjHumeur('lucius').nom,
      chantier: hero.chantier.slice(),
      palier: palierKarlsberg().nom,
      sources: sourcesActives().length,
      ressources: { ...hero.ressources },
      armee: hero.armee.length,
      chroniques: hero.chroniques.length,
    };
    return { avant, apres, ok: !!r };
  });
  verifie('la succession se fait', monde.ok);
  verifie('les crises en sont au même point',
    JSON.stringify(monde.avant.crises) === JSON.stringify(monde.apres.crises), monde.apres.crises);
  verifie('Lucius se souvient encore de ce que le père lui a fait',
    JSON.stringify(monde.avant.memoireLucius) === JSON.stringify(monde.apres.memoireLucius),
    monde.apres.memoireLucius);
  verifie('et il reste hostile à cette maison-là, pas à cet homme-là',
    monde.avant.humeurLucius === monde.apres.humeurLucius
    && ['hostile','ennemi'].includes(monde.apres.humeurLucius), monde.apres.humeurLucius);
  verifie('Karlsberg est debout comme il l\'a laissée',
    monde.apres.palier === monde.avant.palier && monde.apres.chantier.length === monde.avant.chantier.length,
    monde.apres);
  verifie('les carrières et les refuges travaillent toujours',
    monde.apres.sources === monde.avant.sources && monde.apres.ressources.pierre === monde.avant.ressources.pierre,
    monde.apres.ressources);
  verifie('l\'armée reste sous les bannières', monde.apres.armee === monde.avant.armee, monde.apres.armee);
  verifie('et le passage est consigné dans la chronique',
    monde.apres.chroniques > monde.avant.chroniques, monde.apres.chroniques);

  /* ---------- 4. L'homme, lui, recommence ---------- */
  console.log('\nL\'héritier n\'est pas son père');
  const homme = await page.evaluate(() => {
    PARTIE_TARDIVE();
    const avant = { nom:hero.nom, niveau:hero.niveau, or:hero.or, renom:renomActuel(),
                    suspicion:hero.suspicion, compagnons:hero.compagnons.length,
                    lien:axeDe('alycia','relation'), pouvoirs:hero.unlocked.size };
    const r = succeder('Otto de Corven');
    const apres = { nom:hero.nom, niveau:hero.niveau, or:hero.or, renom:renomActuel(),
                    suspicion:hero.suspicion, compagnons:hero.compagnons.length,
                    lien:axeDe('alycia','relation'), pouvoirs:hero.unlocked.size,
                    generation:hero.generation, age:hero.age,
                    onde:hasFlag('succession_onde'), fait:hasFlag('succession_faite') };
    return { avant, apres, garde:r.garde };
  });
  console.log(`    ${homme.avant.nom} (niv. ${homme.avant.niveau}) → ${homme.apres.nom} (niv. ${homme.apres.niveau}), génération ${homme.apres.generation}`);
  verifie('c\'est quelqu\'un d\'autre', homme.apres.nom !== homme.avant.nom, homme.apres.nom);
  verifie('il recommence au niveau trois', homme.apres.niveau === 3, homme.apres.niveau);
  verifie('il a l\'âge de l\'enfant', homme.apres.age === 24, homme.apres.age);
  verifie('ce que son père savait faire ne se transmet pas',
    homme.apres.pouvoirs <= homme.avant.pouvoirs, homme);
  verifie('ceux qui aimaient le père ne l\'aiment pas',
    homme.apres.compagnons === 0 && homme.apres.lien === 0, homme.apres);
  verifie('il garde une partie de l\'or et du renom, pas tout',
    homme.apres.or < homme.avant.or && homme.apres.or > 0
    && homme.apres.renom < homme.avant.renom, homme);
  verifie('et une partie seulement de ce que le monde soupçonnait',
    homme.apres.suspicion < homme.avant.suspicion && homme.apres.suspicion > 0, homme);
  verifie('l\'Onde lui est venue', homme.apres.onde && homme.apres.fait, homme.apres);
  verifie('la génération est comptée', homme.apres.generation === 2, homme.apres.generation);

  /* ---------- 5. Sans héritier, c'est l'épilogue ---------- */
  console.log('\nSans personne pour reprendre le nom, la chronique s\'achève');
  const sans = await page.evaluate(() => {
    PARTIE_TARDIVE();
    hero.lignee.enfants = [];
    const r = ouvrirSuccession('vieillesse');
    return { r, ecran: document.getElementById('screen-epilogue').classList.contains('active'),
             flag: hasFlag('chronique_terminee') };
  });
  verifie('on bascule sur l\'épilogue et pas sur un écran de mort',
    sans.r.epilogue && sans.ecran, sans);
  verifie('la chronique est marquée close', sans.flag, sans.flag);

  /* ---------- 6. La mort devient probable, puis certaine ---------- */
  console.log('\nLa mort devient probable, puis certaine');
  const mort = await page.evaluate(() => {
    PARTIE_TARDIVE();
    const courbe = [40, 60, 66, 72, 78, 84, 90].map(a => {
      hero.age = a; return { a, p: +risqueDeMourir().toFixed(3) };
    });
    hero.age = 90; hero.successionEnCours = false;
    const t = successionTick();
    return { courbe, tick: !!t };
  });
  console.log('    ' + mort.courbe.map(c => `${c.a} ans : ${Math.round(c.p*100)}%`).join(' · '));
  verifie('avant soixante-six ans, on ne meurt pas de vieillesse',
    mort.courbe.filter(c => c.a < 66).every(c => c.p === 0), mort.courbe);
  verifie('le risque monte avec l\'âge',
    mort.courbe[3].p > mort.courbe[2].p && mort.courbe[4].p > mort.courbe[3].p, mort.courbe);
  verifie('à quatre-vingt-quatre ans, c\'est certain', mort.courbe[5].p === 1, mort.courbe[5]);
  verifie('et le tour de saison le déclenche', mort.tick, mort.tick);

  /* ---------- 7. L'écran dit ce qui passe et ce qui ne passe pas ---------- */
  console.log('\nL\'écran dit ce qui passe, et ce qui ne passe pas');
  const ecran = await page.evaluate(() => {
    PARTIE_TARDIVE();
    ouvrirSuccession('transmission');
    const g = document.getElementById('successionCorps');
    return { actif: document.getElementById('screen-succession').classList.contains('active'),
             titre: (g.querySelector('.succ-titre')||{}).textContent || '',
             cartes: g.querySelectorAll('.succ-carte').length,
             listes: g.querySelectorAll('.succ-garde li').length,
             boutons: g.querySelectorAll('.succ-btn').length,
             texte: g.textContent };
  });
  verifie('l\'écran de succession s\'ouvre', ecran.actif && ecran.titre.length > 10, ecran.titre);
  verifie('les deux héritiers sont proposés', ecran.cartes === 2 && ecran.boutons === 2, ecran.cartes);
  verifie('ce qui passe et ce qui ne passe pas est écrit',
    ecran.listes >= 6 && /ne passe pas/i.test(ecran.texte), ecran.listes);
  verifie('l\'état de Karlsberg est raconté, pas chiffré',
    /murs qui ferment|toit|donjon|bourg|vallée|pierres/i.test(ecran.texte), ecran.texte.slice(0,120));

  await browser.close();
  console.log(echecs ? `\n${echecs} échec(s).` : '\nLa partie continue avec l\'héritier, dans le monde que son père a fait.');
  process.exit(echecs ? 1 : 0);
})();
