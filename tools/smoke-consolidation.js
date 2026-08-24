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

  /* ---------- Accepter une offre lance vraiment l'affaire ---------- */
  console.log("\nAccepter une offre lance l'affaire");
  await page.evaluate(() => { closeEventModal(); hero.position = 'LOC_001';
    currentLieu = LOCATIONS.find(l => l.id === 'LOC_001'); hero.offres = null; renderLieu(); });
  await page.click('#lieuOffres .offre .offre-btn');
  await page.waitForTimeout(200);
  const lance = await page.evaluate(() => ({
    ecran: [...document.querySelectorAll('.screen')].find(s => s.classList.contains('active')).id,
    titre: document.getElementById('ctrTitre').textContent,
    corps: document.getElementById('ctrBody').textContent.replace(/\s+/g,' ').trim(),
    boutons: [...document.querySelectorAll('#ctrBody button')].length,
  }));
  verifie("l'écran du contrat s'ouvre", lance.ecran === 'screen-contrat' && lance.titre.length > 3, lance);
  verifie("et il est écrit, pas vide", lance.corps.length > 200, lance.corps.length);
  verifie('il y a quelque chose à choisir', lance.boutons >= 2, lance.boutons);
  verifie("aucune faute d'accord ni d'élision",
    !/ reçoit Yohan en personne/.test(lance.corps) && !/s'agit de une/.test(lance.corps), lance.corps.slice(0,160));

  const chaine = await page.evaluate(() => {
    const vus = [];
    for(let i = 0; i < 4; i++){
      vus.push(STEP_NAMES[contractState.stepIndex]);
      const b = document.querySelector('#ctrBody button');
      if(!b) break;
      if(b.id === 'goCombatBtn') break;      // le combat est éprouvé plus bas
      b.click();
    }
    return { vus };
  });
  verifie("les phases s'enchaînent jusqu'au combat",
    chaine.vus.length >= 3 && chaine.vus[0] === 'Audience', chaine);

  /* ---------- Le Prix du Paria ---------- */
  console.log("\nUne maison noble doit l'Or et le Sang");
  const prixCouverture = await page.evaluate(() => ({
    contrats: CONTRACTS.length,
    avecPrix: CONTRACTS.filter(c => !!prixPariaDe(c)).length,
    localesNobles: Object.values(CONTRATS_LOCAUX_EXPANSES).flat().filter(c => commanditaireNoble(c)).length,
    peuple: commanditaireNoble({ commanditaire:"Une veuve du quartier bas" }),
    stable: prixPariaDe(CONTRACTS[7]).noble_proposee.nom === prixPariaDe(CONTRACTS[7]).noble_proposee.nom,
  }));
  verifie('toute maison noble doit le Prix', prixCouverture.avecPrix === prixCouverture.contrats, prixCouverture);
  verifie("un commanditaire du commun paie en or", prixCouverture.peuple === false, prixCouverture);
  verifie('des affaires locales le portent aussi', prixCouverture.localesNobles >= 1, prixCouverture);
  verifie('la même affaire propose toujours la même femme', prixCouverture.stable);

  const nomMaison = await page.evaluate(() => {
    hero.position = 'LOC_004'; hero.dossiers = {};
    CONTRATS_LOCAUX_EXPANSES.LOC_004.forEach(c => noterAffaireReglee(c));
    hero.offres = null;
    const o = offresDuTour().filter(c => c.tableau);
    return { total:o.length, maisons: o.filter(c => /^Maison /.test(c.commanditaire)).length,
             entremetteurs: o.filter(c => c.entremetteur).length,
             doublons: o.length - new Set(o.map(c => c.titre.split(' — ')[0])).size };
  });
  verifie("l'écran du lieu n'efface plus le nom de la maison",
    nomMaison.total > 0 && nomMaison.maisons === nomMaison.total && nomMaison.entremetteurs === nomMaison.total, nomMaison);
  verifie('et ne propose jamais deux fois la même histoire', nomMaison.doublons === 0, nomMaison);

  const termes = await page.evaluate(() => {
    const c = CONTRACTS.find(x => x.or >= 500);
    const prix = prixPariaDe(c);
    const essai = choix => {
      hero.or = 0; hero.renom = 0; hero.suspicion = 20;
      hero.reputations = { ...REPUTATION_DEPART };
      hero.lignee = { liaisons:[], enfants:[] };
      hero.or += Math.round(c.or * multiplicateurDuPrix(choix));
      appliquerPrix(c, choix, prix);
      return { choix, or: hero.or, renom: renomActuel(), susp: hero.suspicion,
               humains: reputationDe('humains'), parias: reputationDe('parias'),
               liaisons: hero.lignee.liaisons.length };
    };
    return ['OR', 'NOBLE_CONSENTANTE', 'OR_ET_NOBLE_CONSENTANTE'].map(essai);
  });
  const [orSeul, nobleSeule, entier] = termes;
  verifie("l'Or seul paie le mieux et ne noue rien",
    orSeul.or > entier.or && orSeul.liaisons === 0, termes);
  verifie("le consentement seul renonce à l'or",
    nobleSeule.or < entier.or / 3 && nobleSeule.liaisons === 1, termes);
  verifie('le Prix entier prend les deux', entier.liaisons === 1 && entier.or > nobleSeule.or, termes);
  verifie('et il se paie en réputation et en Suspicion',
    entier.humains < orSeul.humains && entier.parias > orSeul.parias && entier.susp > orSeul.susp, termes);
  verifie('réclamer le Prix entier fait le plus de Renom',
    entier.renom > nobleSeule.renom && nobleSeule.renom > orSeul.renom, termes);

  /* ---------- Les rencontres ---------- */
  console.log("\nUne affaire oppose ce qu'elle annonce");
  const bestiaire = await page.evaluate(() => {
    const f = {};
    BESTIARY_FULL.forEach(b => { f[b.famille] = (f[b.famille] || 0) + 1; });
    return { total: BESTIARY_FULL.length, familles: f,
             sansRole: BESTIARY_FULL.filter(b => !b.role).length };
  });
  verifie('le bestiaire compte au moins 75 créatures', bestiaire.total >= 75, bestiaire.total);
  verifie('dont de vrais adversaires humains', bestiaire.familles.homme >= 20, bestiaire.familles);
  verifie('toutes ont un rôle de rencontre', bestiaire.sansRole === 0, bestiaire);

  const groupes = await page.evaluate(() => {
    const res = [];
    for(const id of ['LOC_001','LOC_008','LOC_005','LOC_010','LOC_016']){
      const l = LOCATIONS.find(x => x.id === id);
      for(const type of ['chasse','traque','guerre','récupération']){
        for(const danger of ['modéré','dangereux','très dangereux','extrême']){
          const g = composerRencontre({ titre:'x', type, danger, or:300, locId:id }, l);
          res.push({ id, type, danger, n:g.length,
                     familles: [...new Set(g.map(b => b.famille))],
                     annonce: annonceRencontre(g).liste });
        }
      }
    }
    return res;
  });
  verifie('une rencontre est toujours composée', groupes.every(g => g.n >= 1 && g.n <= 5),
    groupes.filter(g => g.n < 1 || g.n > 5).slice(0,3));
  verifie('un groupe ne mélange jamais les familles', groupes.every(g => g.familles.length === 1),
    groupes.filter(g => g.familles.length > 1).slice(0,3));
  verifie('une traque oppose des hommes, pas un sanglier',
    groupes.filter(g => g.type === 'traque').every(g => g.familles[0] === 'homme'),
    groupes.filter(g => g.type === 'traque' && g.familles[0] !== 'homme').slice(0,3));
  verifie('une chasse oppose une bête ou un monstre',
    groupes.filter(g => g.type === 'chasse').every(g => ['bete','monstre'].includes(g.familles[0])),
    groupes.filter(g => g.type === 'chasse' && !['bete','monstre'].includes(g.familles[0])).slice(0,3));
  // « épéiste à gagess » : un « ss » en fin de mot est la marque d'un pluriel
  // recollé à un nom déjà pluriel. (\b ne convient pas : « cuirassés » finit
  // sur un caractère non-ASCII et déclencherait une fausse alerte.)
  verifie('le pluriel des noms composés est correct',
    groupes.every(g => !/ss(?= |$)/.test(g.annonce)),
    groupes.filter(g => /ss(?= |$)/.test(g.annonce)).map(g => g.annonce).slice(0,4));
  const tablePluriel = await page.evaluate(() => ({
    compose: pluriel('épéiste à gages'), adj: pluriel('loup déformé'),
    invariable: pluriel('ours des montagnes'), elide: pluriel("cerf d'écorce"),
    cheval: pluriel('cheval de guerre'), trait: pluriel('chauve-souris géante'),
  }));
  verifie('seul le noyau du nom se met au pluriel',
    tablePluriel.compose === 'épéistes à gages' && tablePluriel.elide === "cerfs d'écorce"
    && tablePluriel.invariable === 'ours des montagnes' && tablePluriel.adj === 'loups déformés'
    && tablePluriel.cheval === 'chevaux de guerre' && tablePluriel.trait === 'chauves-souris géantes',
    tablePluriel);
  const varieteGuerre = new Set(groupes.filter(g => g.type === 'guerre').map(g => g.id + '|' + g.annonce.replace(/\d+ /g,''))).size;
  verifie("deux régions n'opposent pas les mêmes hommes", varieteGuerre >= 8, varieteGuerre);

  const chasseur = await page.evaluate(() => {
    hero.suspicion = 90;
    const g = generateBountyHunter();
    return { n: g.length, chef: g[0].nom };
  });
  verifie('un chasseur de primes vient accompagné', chasseur.n >= 3 && /Chasseur/.test(chasseur.chef), chasseur);

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
