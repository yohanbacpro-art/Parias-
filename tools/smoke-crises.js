/* PARIAS — Épreuve des cinq crises régionales
 *
 *   node tools/build-standalone.js && node tools/smoke-crises.js
 *
 * Ce qu'on vérifie, c'est la promesse du document fondateur : que le monde
 * avance en étapes nommées et non en compteurs, qu'il avance pour des raisons
 * lisibles et non au hasard, qu'aucune étape ne se saute, que ce que fait
 * Yohan pèse dans les deux sens, et que l'ancien champ `tensions` — lu par les
 * édits, les événements écrits et l'épilogue — reste juste.
 */
const { chromium } = require('playwright-core');
const path = require('path');
const url = 'file://' + path.join(__dirname, '..', 'dist', 'parias.html');
let echecs = 0;
const verifie = (n, ok, d) => { if(ok) console.log('  ✔', n);
  else { echecs++; console.log('  ✘', n, d !== undefined ? '→ '+JSON.stringify(d).slice(0,260) : ''); } };

async function nouvellePartie(browser){
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  page.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });
  await page.goto(url);
  await page.click('#btnStart');
  for(let i=0;i<6;i++){ if(!await page.isVisible('#prologueNextBtn')) break; await page.click('#prologueNextBtn'); await page.waitForTimeout(20); }
  return { ctx, page };
}

(async () => {
  const browser = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox'] });

  /* ---------- 1. Cinq crises, cinq étapes, et rien de commencé ---------- */
  console.log('\nCinq crises en veille, et cinq étapes nommées chacune');
  let { ctx, page } = await nouvellePartie(browser);
  const depart = await page.evaluate(() => ({
    nb: CRISES.length,
    paliers: CRISES.map(c => c.paliers.length),
    etapes: CRISES.map(c => criseEtape(c.id)),
    noms: CRISES.map(c => c.paliers.map(p => p.nom)),
    veilles: CRISES.map(c => criseEtapeNom(c.id)),
    tensions: { ...hero.tensions },
  }));

  verifie('cinq crises régionales', depart.nb === 5, depart.nb);
  verifie('cinq étapes chacune', depart.paliers.every(n => n === 5), depart.paliers);
  verifie('aucune n\'a commencé au premier jour', depart.etapes.every(n => n === 0), depart.etapes);
  verifie('chaque étape porte un nom écrit',
    depart.noms.flat().every(n => typeof n === 'string' && n.length > 3), depart.noms.flat().length);
  verifie('en veille, on montre une phrase et pas un chiffre',
    depart.veilles.every(v => /[a-zé]/.test(v) && !/^\d+$/.test(v)), depart.veilles);
  verifie('aucune tension de peuple n\'est inventée au départ',
    ['humains','elfes','elfes_noirs','khesh','nains','peaux_vertes','hommes_betes']
      .every(p => depart.tensions[p] === 0), depart.tensions);
  verifie('celle des Parias part de ce que le monde soupçonne déjà',
    depart.tensions.parias > 0 && depart.tensions.parias < 20, depart.tensions.parias);

  /* ---------- 2. Les étapes se franchissent dans l'ordre ---------- */
  console.log('\nAucune étape ne se saute');
  const marche = await page.evaluate(() => {
    const suivi = [];
    const d = { saison:'Printemps', an:3 };
    for(let t = 0; t < 60; t++){
      criseTick(d);
      suivi.push(CRISES.map(c => criseEtape(c.id)));
    }
    return { suivi, fin: CRISES.map(c => ({ id:c.id, palier:criseEtape(c.id), etape:criseEtapeNom(c.id) })) };
  });
  let saut = null, recul = null;
  for(let i = 1; i < marche.suivi.length; i++){
    for(let k = 0; k < 5; k++){
      const av = marche.suivi[i-1][k], ap = marche.suivi[i][k];
      if(ap - av > 1) saut = { trimestre:i, crise:k, av, ap };
      if(ap < av)     recul = { trimestre:i, crise:k, av, ap };
    }
  }
  marche.fin.forEach(c => console.log(`    ${c.id.padEnd(13)} ${c.palier}/5  ${c.etape}`));
  verifie('jamais deux paliers d\'un coup', !saut, saut);
  verifie('et jamais de retour en arrière', !recul, recul);
  verifie('quinze ans plus tard, le monde a bougé',
    marche.fin.some(c => c.palier >= 2), marche.fin);
  verifie('chaque crise en cours affiche son étape nommée',
    marche.fin.filter(c => c.palier > 0).every(c => c.etape.length > 3), marche.fin);

  /* ---------- 3. Ce qui pousse est lisible, et ce n'est pas le hasard ---------- */
  console.log('\nLe monde avance pour des raisons, et il les dit');
  const causes = await page.evaluate(() => {
    hero.flags = [];
    const avant = CRISE_PAR_ID('ELFES').pression();
    hero.flags.push('fleche_tyrion_veut_la_mort', 'anarion_offense');
    const apres = CRISE_PAR_ID('ELFES').pression();
    hero.flags.push('trois_chenes_traite');
    const freine = CRISE_PAR_ID('ELFES').pression();
    const somme = l => l.reduce((s, x) => s + x.n, 0);
    return {
      avant: somme(avant), apres: somme(apres), freine: somme(freine),
      pourquoi: apres.map(x => x.pourquoi),
      libelles: apres.every(x => typeof x.pourquoi === 'string' && x.pourquoi.length > 10),
    };
  });
  console.log(`    sans rien ${causes.avant} · deux affronts ${causes.apres} · avec le traité ${causes.freine}`);
  verifie('ce que fait Yohan pousse la crise', causes.apres > causes.avant, causes);
  verifie('et ce qu\'il signe la freine', causes.freine < causes.apres, causes);
  verifie('chaque cause est une phrase, pas un coefficient', causes.libelles, causes.pourquoi.slice(0,3));

  /* ---------- 4. Deux mondes identiques divergent pour une seule raison ---------- */
  console.log('\nUne seule décision, deux mondes');
  const divergence = await page.evaluate(() => {
    const jouer = flags => {
      hero.crises = {}; hero.flags = flags.slice(); hero.chroniques = [];
      const d = { saison:'Été', an:4 };
      for(let t = 0; t < 24; t++) criseTick(d);
      return criseEtape('PEAUX_VERTES');
    };
    return { sans: jouer([]), scelle: jouer(['kardurak_moins_quatre_scelle']),
             ouvert: jouer(['kardurak_moins_quatre_ouvert', 'gorge_federation']) };
  });
  console.log(`    Kar-Durak après six ans — sans rien ${divergence.sans}/5 · scellé ${divergence.scelle}/5 · rouvert et fédéré ${divergence.ouvert}/5`);
  verifie('sceller le niveau moins-quatre retarde le siège',
    divergence.scelle < divergence.sans, divergence);
  verifie('le rouvrir et laisser fédérer les clans l\'avance',
    divergence.ouvert > divergence.sans, divergence);

  /* ---------- 5. L'ancien champ tensions reste juste ---------- */
  console.log('\nLes tensions sont désormais une lecture, pas un compteur');
  const derive = await page.evaluate(() => {
    hero.crises = {}; hero.flags = [];
    const lire = () => ({
      elfes: hero.tensions.elfes, humains: hero.tensions.humains,
      nains: hero.tensions.nains, pv: hero.tensions.peaux_vertes,
      parias: hero.tensions.parias,
    });
    syncTensions();
    const zero = lire();
    hero.crises.ELFES.palier = 3; hero.crises.ASTRAH.palier = 5;
    syncTensions();
    const avance = lire();
    const memePeuple = hero.tensions.elfes === hero.tensions.elfes_noirs;
    hero.suspicion = 80; syncTensions();
    return { zero, avance, memePeuple, pariasSuspects: hero.tensions.parias };
  });
  console.log(`    elfes ${derive.zero.elfes} → ${derive.avance.elfes} · humains ${derive.zero.humains} → ${derive.avance.humains}`);
  verifie('une crise à sa troisième étape se lit autour de 54',
    derive.avance.elfes >= 50 && derive.avance.elfes <= 60, derive.avance);
  verifie('une crise à son terme dépasse le seuil des édits',
    derive.avance.humains >= 90, derive.avance);
  verifie('les deux cours elfiques partagent leur crise', derive.memePeuple, derive);
  verifie('la tension des Parias suit la suspicion',
    derive.pariasSuspects >= 50, derive.pariasSuspects);

  /* ---------- 6. L'écran raconte, il ne tabule pas ---------- */
  console.log('\nL\'écran des Chroniques montre une étape, jamais une jauge');
  const ecran = await page.evaluate(() => {
    hero.crises = {}; hero.flags = []; hero.chroniques = [];
    const d = { saison:'Automne', an:6 };
    for(let t = 0; t < 20; t++) criseTick(d);
    renderChroniques();
    const g = document.getElementById('criseGrid');
    return {
      cartes: g.querySelectorAll('.crise').length,
      pas: g.querySelectorAll('.cr-pas').length,
      etapes: [...g.querySelectorAll('.cr-etape')].map(e => e.textContent.trim()),
      causes: [...g.querySelectorAll('.cr-causes li')].map(e => e.textContent.trim()),
      texte: g.textContent,
      chroniques: hero.chroniques.map(c => c.texte),
      barres: g.querySelectorAll('.tension-bar, .tension-fill').length,
    };
  });
  verifie('les cinq crises sont affichées', ecran.cartes === 5, ecran.cartes);
  verifie('chacune montre ses cinq étapes', ecran.pas === 25, ecran.pas);
  verifie('aucune barre chiffrée ne subsiste', ecran.barres === 0, ecran.barres);
  verifie('aucune pression n\'est montrée au joueur',
    !/pression|seuil|\bn\s*:/.test(ecran.texte), ecran.texte.slice(0, 160));
  verifie('les causes affichées sont des phrases',
    ecran.causes.length > 0 && ecran.causes.every(c => c.length > 12), ecran.causes.slice(0,2));
  verifie('un palier franchi laisse une chronique écrite',
    ecran.chroniques.some(t => /—/.test(t) && t.length > 60), ecran.chroniques.slice(0,2));

  /* ---------- 7. Une partie d'avant survit à la bascule ---------- */
  console.log('\nUne sauvegarde d\'avant les crises se relit');
  const migration = await page.evaluate(() => {
    const enr = { version:8, hero:{ niveau:5, pvMax:60, trame:{chapitre:0, points:0},
      tensions:{ humains:72, elfes:36, khesh:20, nains:54, peaux_vertes:54, hommes_betes:18, parias:9, elfes_noirs:36 } } };
    const m = migrer(JSON.parse(JSON.stringify(enr)));
    return { version:m.version, crises:m.hero.crises };
  });
  console.log('    ' + Object.entries(migration.crises).map(([k,v]) => `${k} ${v.palier}/5`).join(' · '));
  verifie('la sauvegarde passe en v9', migration.version === 9, migration.version);
  verifie('les anciens nombres se relisent en étapes',
    migration.crises.ASTRAH.palier === 4 && migration.crises.ELFES.palier === 2, migration.crises);
  verifie('aucune crise ne démarre au-delà de la cinquième',
    Object.values(migration.crises).every(c => c.palier >= 0 && c.palier <= 5), migration.crises);

  await ctx.close();
  await browser.close();
  console.log(echecs ? `\n${echecs} échec(s).` : '\nLe monde avance en étapes, pour des raisons, et il les dit.');
  process.exit(echecs ? 1 : 0);
})();
