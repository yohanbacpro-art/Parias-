/* PARIAS — Épreuve du tour, du temps et de la carte
 *
 *   node tools/build-standalone.js && node tools/smoke-tour.js
 */
const { chromium } = require('playwright-core');
const path = require('path');
const url = 'file://' + path.join(__dirname, '..', 'dist', 'parias.html');
let echecs = 0;
const verifie = (n, ok, d) => { if(ok) console.log('  ✔', n);
  else { echecs++; console.log('  ✘', n, d !== undefined ? '→ '+JSON.stringify(d).slice(0,240) : ''); } };

(async () => {
  const browser = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });
  await page.goto(url);
  await page.click('#btnStart');
  for(let i=0;i<6;i++){ if(!await page.isVisible('#prologueNextBtn')) break; await page.click('#prologueNextBtn'); await page.waitForTimeout(20); }

  /* ---------- Le tour propose toujours quelque chose ---------- */
  console.log("\nUn tour ne se termine jamais sur rien");
  const tours = await page.evaluate(() => {
    const res = [];
    for(let t=0; t<25; t++){
      hero.actionsTour = 0;
      endTurnMeta();
      const props = [...document.querySelectorAll('.pli-prop-titre')].map(x => x.textContent);
      const quete = !!document.querySelector('.pli-quete-tete');
      res.push({ props: props.length, quete });
      closeEventModal();
    }
    return res;
  });
  const vides = tours.filter(t => t.props === 0).length;
  verifie('25 tours enchaînés, aucun sans proposition', vides === 0, vides);
  verifie('la quête principale figure dans chaque pli', tours.every(t => t.quete));
  console.log('    propositions par tour : ' + tours.map(t => t.props).join(''));

  const suivi = await page.evaluate(() => {
    hero.actionsTour = 0; endTurnMeta();
    const b = document.querySelector('.pli-prop button');
    const titre = document.querySelector('.pli-prop-titre').textContent;
    b.click();
    return { titre, ecran: [...document.querySelectorAll('.screen')].find(s => s.classList.contains('active')).id,
             modale: document.getElementById('eventModal').style.display };
  });
  verifie('cliquer une proposition mène quelque part',
    suivi.ecran !== 'screen-monde' || suivi.modale === 'flex', suivi);

  /* ---------- Le bandeau de quête ---------- */
  console.log("\nLa quête principale reste sous les yeux");
  const bandeau = await page.evaluate(() => {
    renderBandeauQuete();
    const el = document.getElementById('queteBandeau');
    return { texte: el.textContent.replace(/\s+/g,' ').trim(), visible: el.offsetParent !== null };
  });
  verifie('le bandeau est affiché en permanence', bandeau.visible, bandeau);
  verifie('il nomme le chapitre et ce qu\'il faut', /Chapitre/.test(bandeau.texte) && /jalons/.test(bandeau.texte), bandeau.texte);

  /* ---------- Le temps qui passe ---------- */
  console.log("\nLe temps passe sur Yohan");
  const temps = await page.evaluate(() => {
    hero.temps.semaines = 0; hero.age = AGE_DEPART;
    const depart = hero.age;
    hero.temps.semaines = 52 * 20; passerLeTemps(0);
    const vieux = hero.age;
    hero.temps.semaines = 52 * 19; passerLeTemps(0);
    const m46 = malusAge();
    hero.temps.semaines = 52 * 30; passerLeTemps(0);   // 57 ans
    const m55 = malusAge();
    hero.temps.semaines = 0; passerLeTemps(0);
    const jeune = malusAge();
    return { depart, vieux, m55, m46, jeune, ageFinal: hero.age };
  });
  verifie('Yohan commence à 27 ans', temps.depart === 27, temps.depart);
  verifie('et en a 47 après vingt ans', temps.vieux === 47, temps.vieux);
  verifie('passé 45 ans le corps compte', temps.m46.agi === -1 && temps.m46.pvMax < 0, temps.m46);
  verifie('passé 55 ans il compte davantage', temps.m55.agi === -2, temps.m55);
  verifie('à 27 ans, aucun malus', temps.jeune.agi === 0 && temps.jeune.pvMax === 0, temps.jeune);

  const combat = await page.evaluate(() => {
    hero.temps.semaines = 52 * 30; passerLeTemps(0);
    startCombat([{bst:'BST_001'}], null, {sansMort:true});
    const agiVieux = combat.party[0].agi;
    hero.temps.semaines = 0; passerLeTemps(0);
    startCombat([{bst:'BST_001'}], null, {sansMort:true});
    return { agiVieux, agiJeune: combat.party[0].agi };
  });
  verifie('et se sent au combat', combat.agiVieux < combat.agiJeune, combat);

  /* ---------- La descendance ---------- */
  console.log("\nLe Prix du Paria a des suites");
  const lignee = await page.evaluate(() => {
    hero.lignee = { liaisons: [], enfants: [] }; hero.flags = []; hero.temps.semaines = 0;
    hero.reputations = { ...REPUTATION_DEPART };
    const repAvant = reputationDe('humains');
    nouerLiaison('Lady Agnès', 'Maison de Corven', 'Le prince qui ne veut pas de témoin');
    const apresLiaison = { liaisons: hero.lignee.liaisons.length, rep: reputationDe('humains'),
                           rente: renteDesMaisons(), flag: hasFlag('prix_noble_accepte') };
    // On force la conception puis on laisse passer la gestation.
    hero.lignee.liaisons[0].grossesse = 0;
    hero.temps.semaines = 45;
    const ev = passerLeTemps(45);
    const e = hero.lignee.enfants[0];
    return { repAvant, apresLiaison, naissances: ev.filter(x => x.type === 'naissance').length,
             enfant: e && { nom:e.nom, age:e.age, paria:e.paria },
             flags: hero.flags.filter(f => f === 'descendance' || f === 'heritier_paria'),
             talent: hero.talentPoints };
  });
  verifie('réclamer le Prix noue une liaison', lignee.apresLiaison.liaisons === 1, lignee.apresLiaison);
  verifie('la maison le rend en réputation', lignee.apresLiaison.rep > lignee.repAvant, lignee.apresLiaison);
  verifie('et en soutien chaque tour', lignee.apresLiaison.rente === 60, lignee.apresLiaison.rente);
  verifie('une grossesse menée à terme donne une naissance', lignee.naissances === 1, lignee);
  verifie('l\'enfant porte les deux maisons', !!lignee.enfant && /de /.test(lignee.enfant.nom), lignee.enfant);
  verifie('sans doublon de particule', !!lignee.enfant && !/de de |de La /.test(lignee.enfant.nom), lignee.enfant);
  verifie('la première naissance change quelque chose', lignee.flags.includes('descendance'), lignee.flags);
  console.log(`    ${lignee.enfant.nom} · ${lignee.enfant.paria ? 'porte le sang' : 'ne porte rien'}`);

  const proportion = await page.evaluate(() => {
    let parias = 0;
    for(let i=0;i<400;i++){
      hero.lignee = { liaisons: [], enfants: [] }; hero.temps.semaines = 0; hero.flags = [];
      nouerLiaison('X'+i, 'Maison X', 'test');
      hero.lignee.liaisons[0].grossesse = 0; hero.temps.semaines = 45;
      passerLeTemps(45);
      if(hero.lignee.enfants[0] && hero.lignee.enfants[0].paria) parias++;
    }
    return Math.round(100 * parias / 400);
  });
  verifie(`le sang se transmet environ une fois sur deux (${proportion} %)`, proportion > 38 && proportion < 62, proportion);

  const conception = await page.evaluate(() => {
    let tours = 0, essais = 200;
    for(let i=0;i<essais;i++){
      hero.lignee = { liaisons: [], enfants: [] }; hero.temps.semaines = 0; hero.flags = [];
      nouerLiaison('Y'+i, 'Maison Y', 'test');
      let t = 0;
      while(hero.lignee.liaisons[0].grossesse === null && t < 100){ t++; hero.temps.semaines += 4; passerLeTemps(4); }
      tours += t;
    }
    return Math.round(tours / essais);
  });
  verifie(`une conception arrive en ~${conception} tours, ni tout de suite ni jamais`,
    conception >= 3 && conception <= 12, conception);

  /* ---------- La carte ---------- */
  console.log("\nLa carte se lit");
  const carte = await page.evaluate(() => {
    hero.position = 'LOC_004';
    hero.dossiers = { LOC_002:['AL_002_1','AL_002_2','AL_002_3'] };
    renderMonde();
    return {
      noms: document.querySelectorAll('.mp-nom').length,
      nomsVisibles: [...document.querySelectorAll('.mp-nom')].every(n => getComputedStyle(n).opacity !== '0'),
      regions: document.querySelectorAll('.map-region').length,
      routes: document.querySelectorAll('#mapRoutes line').length,
      ici: document.querySelectorAll('.map-pin.ici').length,
      decisions: document.querySelectorAll('.mp-badge.decision').length,
      liste: document.querySelectorAll('#listeLieux .lieu-row').length,
      blocs: document.querySelectorAll('#listeLieux .reg-bloc').length,
    };
  });
  verifie('les 20 lieux portent leur nom en clair', carte.noms === 20 && carte.nomsVisibles, carte);
  verifie('les quatre régions sont écrites sur la carte', carte.regions === 4, carte.regions);
  verifie('les routes sont tracées', carte.routes === 24, carte.routes);
  verifie('on voit où l\'on est', carte.ici === 1, carte.ici);
  verifie('un lieu qui attend une décision se signale', carte.decisions === 1, carte.decisions);
  verifie('et la liste dit la même chose en clair', carte.liste === 20 && carte.blocs === 4, carte);

  /* ---------- Les nouvelles troupes ---------- */
  console.log("\nDe quoi composer une armée");
  const armee = await page.evaluate(() => {
    const rec = Object.values(UNIT_TYPES).filter(t => !t.ennemi);
    const cats = {};
    rec.forEach(t => { cats[t.categorie] = (cats[t.categorie]||0)+1; });
    hero.renom = 100; hero.or = 99999; hero.flags = [];
    hero.reputations = { ...REPUTATION_DEPART };
    const sansEstime = rec.filter(t => !verrouReputation(t)).length;
    Object.keys(REPUTATION_DEPART).forEach(p => { hero.reputations[p] = 80; });
    const avecEstime = rec.filter(t => !verrouReputation(t)).length;
    return { total: rec.length, cats, sansEstime, avecEstime };
  });
  verifie('quinze troupes recrutables', armee.total === 15, armee.total);
  verifie('les trois catégories sont fournies',
    armee.cats.infanterie >= 5 && armee.cats.archers >= 4 && armee.cats.cavalerie >= 4, armee.cats);
  verifie('l\'estime d\'un peuple ouvre ses troupes', armee.avecEstime > armee.sansEstime, armee);

  await browser.close();
  console.log(echecs ? `\n${echecs} échec(s).` : "\nChaque tour apporte quelque chose, le temps passe pour de bon, et la carte se lit.");
  process.exit(echecs ? 1 : 0);
})();
