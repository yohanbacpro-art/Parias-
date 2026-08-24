/* PARIAS — Épreuve du jeu consolidé
 *
 * Un seul écran de jeu — le lieu. Trois offres tirées de là où l'on est.
 * Les voyages sortent des contrats, pas de la promenade. La Suspicion coûte
 * quelque chose et sait redescendre. Le repos paie la magie en semaines. Les
 * puissances bougent toutes seules.
 *
 *   node tools/build-standalone.js && node tools/smoke-consolidation.js
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
  for(let i=0;i<8;i++){ if(!await page.isVisible('#prologueNextBtn')) break; await page.click('#prologueNextBtn'); await page.waitForTimeout(20); }

  /* ---------- Un seul endroit où l'on joue ---------- */
  console.log("\nOn ne joue qu'à un seul endroit");
  const depart = await page.evaluate(() => ({
    ecran: [...document.querySelectorAll('.screen')].find(s => s.classList.contains('active')).id,
    onglets: [...document.querySelectorAll('#tabs button')].map(b => b.textContent.trim()),
    registreMort: !document.getElementById('screen-contrats'),
    offres: document.querySelectorAll('#lieuOffres .offre').length,
    actions: [...document.querySelectorAll('#lieuActions button')].map(b => b.querySelector('span').textContent),
  }));
  verifie("la partie commence sur l'écran du lieu", depart.ecran === 'screen-lieu', depart.ecran);
  verifie("l'onglet Contrats n'existe plus", depart.registreMort && !depart.onglets.includes('Contrats'), depart.onglets);
  verifie('trois offres sont posées en arrivant', depart.offres === 3, depart.offres);
  verifie("l'endroit propose aussi de chercher, se reposer et se faire oublier",
    depart.actions.some(a => /Chercher/.test(a)) && depart.actions.some(a => /reposer/.test(a))
    && depart.actions.some(a => /oublier/.test(a)), depart.actions);

  /* ---------- Les offres viennent d'ici ---------- */
  console.log("\nCe qu'on vous propose vient de là où vous êtes");
  const offres = await page.evaluate(() => {
    const res = [];
    for(const id of ['LOC_001','LOC_008','LOC_016','LOC_005','LOC_011']){
      hero.position = id; hero.offres = null;
      const o = offresDuTour();
      res.push({ id, n:o.length,
        ici: o.filter(c => c.locale && !c.ailleurs).length,
        ailleurs: o.filter(c => c.ailleurs).length,
        suspicion: o.every(c => typeof c.suspicion === 'number' && c.suspicion > 0),
        destVoisines: o.filter(c => c.ailleurs).every(c =>
          ROUTES.some(r => r.includes(id) && r.includes(c.ailleurs))) });
    }
    return res;
  });
  verifie('chaque lieu propose exactement trois offres', offres.every(o => o.n === 3), offres);
  verifie('au moins une vient toujours de ce lieu-ci', offres.every(o => o.ici >= 1), offres);
  verifie('chaque offre annonce son coût en Suspicion', offres.every(o => o.suspicion), offres);
  verifie('une offre lointaine ne va jamais plus loin qu\'un voisin de route',
    offres.every(o => o.destVoisines), offres);

  const stable = await page.evaluate(() => {
    hero.position = 'LOC_001'; hero.offres = null;
    const a = offresDuTour().map(c => c.id).join('|');
    const b = offresDuTour().map(c => c.id).join('|');
    const c = offresDuTour().map(x => x.id).join('|');
    hero.temps.semaines += 4;
    const apres = offresDuTour().map(x => x.id).join('|');
    return { identiques: a === b && b === c, renouvelees: apres !== a };
  });
  verifie("les offres ne se retirent pas au sort quand on regarde l'écran", stable.identiques, stable);
  verifie('mais le tour suivant en apporte de nouvelles', stable.renouvelees, stable);

  /* ---------- Le voyage sort du contrat ---------- */
  console.log("\nOn ne voyage que parce qu'un contrat vous emmène");
  const voyage = await page.evaluate(() => {
    // On force une offre lointaine pour éprouver le trajet.
    hero.position = 'LOC_001'; hero.offres = null;
    const liste = offresDuTour();
    const dest = ROUTES.filter(r => r.includes('LOC_001')).map(r => r[0] === 'LOC_001' ? r[1] : r[0])[0];
    liste[2] = { ...liste[2], ailleurs: dest, lieu: LOCATIONS.find(l => l.id === dest).nom };
    const av = { lieu: hero.position, sem: hero.temps.semaines, fat: hero.fat, susp: hero.suspicion };
    accepterOffre(liste[2].id);
    return { av, dest, apres:{ lieu: hero.position, sem: hero.temps.semaines, fat: hero.fat },
             modale: document.getElementById('eventModal').style.display,
             texte: document.getElementById('eventModalBox').textContent.replace(/\s+/g,' ').slice(0,120),
             retiree: !offresDuTour().some(c => c.id === liste[2].id) };
  });
  verifie('accepter une affaire lointaine déplace Yohan', voyage.apres.lieu === voyage.dest, voyage);
  verifie('et coûte des semaines de route', voyage.apres.sem > voyage.av.sem, voyage);
  verifie('la route fatigue', voyage.apres.fat > voyage.av.fat, voyage);
  verifie('le voyage se raconte', voyage.modale === 'flex' && /route/.test(voyage.texte), voyage.texte);
  verifie("une offre acceptée quitte le tableau", voyage.retiree, voyage.retiree);

  /* ---------- La Suspicion coûte, et sait redescendre ---------- */
  console.log("\nLa Suspicion se paie, et on peut la payer");
  await page.evaluate(() => { closeEventModal(); });
  const susp = await page.evaluate(() => {
    const lire = v => { hero.suspicion = v; const e = suspicionEffets();
      return { label:e.label, prix:+e.prixMult.toFixed(2), entretien:+e.entretienMult.toFixed(2),
               chasse:+e.chasse.toFixed(2), rec:e.recrutement }; };
    return [0, 40, 70, 95].map(lire);
  });
  verifie('les quatre paliers sont distincts', new Set(susp.map(s => s.label)).size === 4, susp);
  verifie('plus on est traqué, plus tout coûte cher',
    susp[0].prix < susp[1].prix && susp[1].prix < susp[2].prix && susp[2].prix < susp[3].prix, susp);
  verifie('et plus on recrute mal', susp[3].rec < susp[1].rec && susp[1].rec < 0, susp);
  verifie('à zéro, rien ne change', susp[0].prix === 1 && susp[0].chasse === 0, susp[0]);

  const boutique = await page.evaluate(() => {
    hero.position = 'LOC_008'; currentLieu = LOCATIONS.find(l => l.id === 'LOC_008');
    const lire = () => { const n = document.querySelector('#shopList .ii-nom');
      return n ? n.textContent : ''; };
    hero.suspicion = 0; renderEquipement(); const prixA = lire();
    hero.suspicion = 95; renderEquipement(); const prixB = lire();
    return { prixA, prixB };
  });
  const orDe = t => { const m = /(\d+)\s*or/.exec(t || ''); return m ? +m[1] : 0; };
  const nA = orDe(boutique.prixA), nB = orDe(boutique.prixB);
  verifie("le marchand fait payer le risque de vous servir", nB > nA, boutique);

  const couverture = await page.evaluate(() => {
    hero.suspicion = 80;
    const avant = suspicionEffets();
    heroFlags().push('su_faux_portrait');
    const apres = suspicionEffets();
    return { avantChasse:+avant.chasse.toFixed(3), apresChasse:+apres.chasse.toFixed(3),
             couvertures: apres.couvertures.length };
  });
  verifie('une couverture réduit vraiment la traque',
    couverture.apresChasse < couverture.avantChasse && couverture.couvertures === 1, couverture);

  const pool = await page.evaluate(() => {
    const paliers = [15, 30, 50, 75].map(v => {
      hero.suspicion = v; hero.evenementsVus = [];
      return { v, n: evenementsSuspicionDisponibles().length, p:+chanceEvenementSuspicion().toFixed(2) };
    });
    hero.suspicion = 5;
    return { paliers, calme: chanceEvenementSuspicion() };
  });
  verifie("des événements de Suspicion existent à chaque palier",
    pool.paliers.every(p => p.n > 0), pool.paliers);
  verifie('plus on est traqué, plus il arrive quelque chose',
    pool.paliers[0].p < pool.paliers[3].p, pool.paliers);
  verifie('un homme discret est tranquille', pool.calme === 0, pool.calme);

  const sortie = await page.evaluate(() => {
    hero.suspicion = 80; hero.evenementsVus = []; hero.or = 5000;
    const ev = EVENTS_SUSPICION.find(e => e.id === 'SU_RABATTEUR');
    openWrittenEvent(ev, null);
    const avant = hero.suspicion;
    const btn = [...document.querySelectorAll('#scChoix button')][0];
    const label = btn.textContent.split('\n')[0].trim();
    btn.click();
    return { avant, apres: hero.suspicion, label };
  });
  verifie('acheter une fausse piste fait vraiment redescendre la Suspicion',
    sortie.apres < sortie.avant - 15, sortie);

  /* ---------- Le repos paie la magie ---------- */
  console.log("\nUtiliser l'Onde se paie en semaines");
  await page.evaluate(() => { closeEventModal(); });
  const repos = await page.evaluate(() => {
    hero.position = 'LOC_016'; currentLieu = LOCATIONS.find(l => l.id === 'LOC_016');
    hero.fat = 80; hero.suspicion = 40; hero.pv = 10;
    const av = { sem: hero.temps.semaines, fat: hero.fat, susp: hero.suspicion, pv: hero.pv };
    doRepos(); closeEventModal();
    const ap = { sem: hero.temps.semaines, fat: hero.fat, susp: hero.suspicion, pv: hero.pv };
    const av2 = { sem: hero.temps.semaines, susp: hero.suspicion };
    seFaireOublier(); closeEventModal();
    return { av, ap, av2, ap2:{ sem: hero.temps.semaines, susp: hero.suspicion, fat: hero.fat } };
  });
  verifie('se reposer coûte des semaines', repos.ap.sem > repos.av.sem, repos);
  verifie('et rend de la Fatigue, des PV et un peu de discrétion',
    repos.ap.fat < repos.av.fat && repos.ap.pv > repos.av.pv && repos.ap.susp < repos.av.susp, repos);
  verifie('se faire oublier coûte une saison entière', repos.ap2.sem - repos.av2.sem >= 10, repos);
  verifie('et efface presque tout', repos.ap2.susp < repos.av2.susp - 20 && repos.ap2.fat === 0, repos);

  const fatigue = await page.evaluate(() => {
    hero.fat = 62; renderPersonnage();
    return { texte: document.getElementById('charFatText').textContent.replace(/\s+/g,' ').trim(),
             barre: document.getElementById('charFatBar').style.width };
  });
  verifie('la Fatigue est enfin affichée telle qu\'elle est',
    /62/.test(fatigue.texte) && fatigue.barre !== '0%' && fatigue.barre !== '', fatigue);

  /* ---------- Le chantier de Karlsberg ---------- */
  console.log("\nKarlsberg se relève, et cela se sent");
  const chantier = await page.evaluate(() => {
    hero.chantier = []; hero.or = 12000; hero.position = 'LOC_001';
    currentLieu = LOCATIONS.find(l => l.id === 'LOC_001');
    const avant = { def: chantierBonus().defense, entretien: chantierBonus().entretienMult,
                    sem: hero.temps.semaines, or: hero.or };
    batir('ch_cour'); closeEventModal();
    batir('ch_enceinte'); closeEventModal();
    batir('ch_puits'); closeEventModal();
    const b = chantierBonus();
    return { avant, ouvrages: hero.chantier.length,
             apres:{ def:b.defense, entretien:+b.entretienMult.toFixed(2), sem: hero.temps.semaines, or: hero.or },
             bloque: (ouvrageDisponible(CHANTIER.find(x => x.id === 'ch_pierre')) || {}).bloque };
  });
  verifie('bâtir consomme de l\'or et des semaines',
    chantier.apres.or < chantier.avant.or && chantier.apres.sem > chantier.avant.sem, chantier);
  verifie('trois ouvrages sont debout', chantier.ouvrages === 3, chantier);
  verifie('les murs donnent de la Défense', chantier.apres.def > chantier.avant.def, chantier);
  verifie('le puits fait baisser l\'entretien', chantier.apres.entretien < 1, chantier);
  verifie('un ouvrage sans prérequis reste barré', !!chantier.bloque, chantier.bloque);

  const passif = await page.evaluate(() => {
    applyPassiveEffects();
    const y = buildYohan();
    hero.chantier = [];
    applyPassiveEffects();
    const nu = buildYohan();
    return { avecMurs: y.defenseBase, sansMurs: nu.defenseBase };
  });
  verifie('le combat en tient compte', passif.avecMurs > passif.sansMurs, passif);

  /* ---------- La politique bouge toute seule ---------- */
  console.log("\nLes puissances avancent sans vous");
  const pol = await page.evaluate(() => {
    hero.politique = null; heroPolitique();
    const depart = { ...heroPolitique().influence };
    hero.tensions.humains = 70;
    for(let i = 0; i < 25; i++) politiqueTick(4);
    const fin = { ...heroPolitique().influence };
    return { depart, fin, dom: puissanceDominante().id, edits: heroPolitique().edits.length,
             bouge: Object.keys(depart).filter(k => Math.abs(fin[k] - depart[k]) > 3).length };
  });
  verifie("l'influence des puissances évolue", pol.bouge >= 3, pol);
  verifie("la faiblesse d'Astrah profite à quelqu'un",
    pol.fin.astrah < pol.depart.astrah && (pol.fin.lucius > pol.depart.lucius || pol.fin.varenne > pol.depart.varenne), pol);
  verifie('des édits finissent par tomber', pol.edits > 0, pol.edits);

  const karls = await page.evaluate(() => {
    hero.politique = null; heroPolitique();
    hero.chantier = ['ch_cour','ch_enceinte','ch_puits','ch_salle'];
    const av = influencePouvoir('karlsberg');
    for(let i = 0; i < 12; i++) politiqueTick(4);
    const ap = influencePouvoir('karlsberg');
    hero.chantier = [];
    hero.politique = null; heroPolitique();
    for(let i = 0; i < 12; i++) politiqueTick(4);
    return { av, avecMurs: ap, sansMurs: influencePouvoir('karlsberg') };
  });
  verifie('relever Karlsberg vous fait exister politiquement',
    karls.avecMurs > karls.av && karls.avecMurs > karls.sansMurs, karls);

  const ecran = await page.evaluate(() => {
    showScreen('chroniques'); renderChroniques();
    return { cartes: document.querySelectorAll('#politiqueGrid .pouv').length,
             nous: document.querySelectorAll('#politiqueGrid .pouv-nous').length,
             tete: document.getElementById('politiqueTete').textContent.trim().length };
  });
  verifie('les six puissances sont affichées', ecran.cartes === 6, ecran);
  verifie('la nôtre est distinguée', ecran.nous === 1, ecran);
  verifie('et on dit qui est en train de gagner', ecran.tete > 20, ecran);

  const surLieu = await page.evaluate(() => {
    hero.position = 'LOC_001'; hero.suspicion = 65;
    openLieu(LOCATIONS.find(l => l.id === 'LOC_001'));
    const t = document.getElementById('lieuPression').textContent.replace(/\s+/g,' ');
    return { long: t.length, susp: /Traqué/.test(t), pol: /pèse le plus lourd/.test(t) };
  });
  verifie("l'écran du lieu dit ce que la Suspicion change ici", surLieu.susp, surLieu);
  verifie('et qui tient la vallée', surLieu.pol, surLieu);

  /* ---------- La sauvegarde retient tout ça ---------- */
  console.log("\nUne partie reprise n'a rien oublié");
  const sauve = await page.evaluate(() => {
    hero.chantier = ['ch_cour','ch_enceinte'];
    hero.politique.influence.karlsberg = 42;
    hero.suspicion = 37;
    heroFlags().push('su_inscrit_registre');
    saveGame(true);
    const brut = JSON.parse(localStorage.getItem(cleSlot('auto')) || '{}');
    return { version: brut.version, attendue: SAVE_VERSION,
             chantier: (brut.hero.chantier || []).length,
             politique: !!brut.hero.politique,
             karlsberg: brut.hero.politique && brut.hero.politique.influence.karlsberg,
             suspicion: brut.hero.suspicion };
  });
  verifie('la sauvegarde est à la version courante', sauve.version === sauve.attendue, sauve);
  verifie('le chantier est enregistré', sauve.chantier === 2, sauve);
  verifie("l'état politique est enregistré", sauve.politique && sauve.karlsberg === 42, sauve);

  const migre = await page.evaluate(() => {
    const vieux = { version:6, meta:{}, hero: JSON.parse(serialiserHero(hero)) };
    delete vieux.hero.chantier; delete vieux.hero.politique; delete vieux.hero.offres;
    const m = migrer(vieux);
    return { version: m.version, chantier: Array.isArray(m.hero.chantier),
             politique: !!m.hero.politique, offres: !!m.hero.offres };
  });
  verifie('une partie v6 se reprend sans rien casser',
    migre.version === sauve.attendue && migre.chantier && migre.politique && migre.offres, migre);

  await browser.close();
  console.log(echecs
    ? `\n${echecs} échec(s).`
    : "\nUn seul écran, trois offres, des voyages qui viennent des contrats, une Suspicion qui coûte et des puissances qui avancent.");
  process.exit(echecs ? 1 : 0);
})();
