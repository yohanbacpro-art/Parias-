/* PARIAS — Épreuve des quatre chantiers de la V1.1
 *
 *   node tools/build-standalone.js && node tools/smoke-arcs.js
 *
 * Isolde et le Second Empire · le consentement des compagnons ·
 * les conclusions d'attachement · les affaires locales et leurs dénouements.
 */
const { chromium } = require('playwright-core');
const path = require('path');
const url = 'file://' + path.join(__dirname, '..', 'dist', 'parias.html');
let echecs = 0;
const verifie = (n, ok, d) => { if(ok) console.log('  ✔', n);
  else { echecs++; console.log('  ✘', n, d !== undefined ? '→ '+JSON.stringify(d).slice(0,240) : ''); } };

async function partie(browser){
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  page.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });
  await page.goto(url);
  await page.click('#btnStart');
  for(let i=0;i<6;i++){ if(!await page.isVisible('#prologueNextBtn')) break; await page.click('#prologueNextBtn'); await page.waitForTimeout(20); }
  return { ctx, page };
}

/* Déroule la modale en cliquant le choix demandé (libellé partiel ou index). */
async function derouler(page, cible){
  for(let g=0; g<12; g++){
    if(!await page.isVisible('#eventModal')) break;
    if(await page.isVisible('#scFinBtn')){ await page.click('#scFinBtn'); await page.waitForTimeout(60); continue; }
    if(await page.isVisible('#scChoix')){
      const b = await page.$$('#scChoix button:not(.locked)');
      if(!b.length){ await page.evaluate(()=>closeEventModal()); break; }
      let i = 0;
      if(typeof cible === 'string'){
        const labels = await Promise.all(b.map(x => x.textContent()));
        const j = labels.findIndex(l => l.includes(cible));
        i = j >= 0 ? j : 0;
      } else if(typeof cible === 'number') i = Math.min(cible, b.length-1);
      await b[i].click(); await page.waitForTimeout(60);
      continue;
    }
    await page.evaluate(()=>closeEventModal());
    break;
  }
}

(async () => {
  const browser = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox'] });

  /* ---------- 1. Les compagnons se recrutent, et se refusent ---------- */
  console.log("\nUn compagnon ne s'impose plus");
  let { ctx, page } = await partie(browser);
  const forcee = await page.evaluate(() => {
    hero.compagnons = []; hero.flags = [];
    triggerChapitre(1);            // l'ancien code ajoutait Alycia ici
    const apresChapitre = hero.compagnons.length;
    closeEventModal();
    return { apresChapitre };
  });
  verifie("le changement de chapitre n'ajoute plus personne", forcee.apresChapitre === 0, forcee);

  await page.evaluate(() => { hero.trame.points = 40; openWrittenEvent(EVENTS_COMPAGNONS[0], null); });
  await derouler(page, 'Refuser');
  const refus = await page.evaluate(() => ({
    groupe: hero.compagnons.length, refusee: hasFlag('alycia_refusee'),
    secondeOffre: !!EVENTS_COMPAGNONS.find(e => e.id === 'EC_ALYCIA_2' &&
      (hero.trame.points = 80, conditionsRemplies(e.requis))),
  }));
  verifie('on peut refuser, et elle ne rejoint pas le groupe', refus.groupe === 0 && refus.refusee, refus);
  verifie('un refus ouvre une seconde et dernière offre', refus.secondeOffre, refus);

  await page.evaluate(() => openWrittenEvent(EVENTS_COMPAGNONS.find(e => e.id === 'EC_ALYCIA_2'), null));
  await derouler(page, 'rester');
  const accepte = await page.evaluate(() => ({
    groupe: hero.compagnons.map(c => c.id),
    plusDeTroisieme: !EVENTS_COMPAGNONS.some(e => e.id.startsWith('EC_ALYCIA') && conditionsRemplies(e.requis)),
  }));
  verifie('accepter la fait entrer dans le groupe', accepte.groupe.includes('alycia'), accepte);
  verifie('et il n\'y a pas de troisième offre', accepte.plusDeTroisieme, accepte);

  const renvoi = await page.evaluate(() => {
    applyEffets({ renvoyer:'alycia' });
    return hero.compagnons.map(c => c.id);
  });
  verifie('on peut aussi congédier quelqu\'un', !renvoi.includes('alycia'), renvoi);
  await ctx.close();

  /* ---------- 2. Isolde : cinq jalons, des issues qui divergent ---------- */
  console.log("\nIsolde de Varenne et le Second Empire");
  ({ ctx, page } = await partie(browser));
  const ordre = await page.evaluate(() => {
    const vus = [];
    hero.flags = []; hero.trame.points = 0; hero.compagnons = [];
    for(let t=0; t<60 && vus.length < 20; t++){
      hero.trame.points = Math.min(200, hero.trame.points + 6);
      const ev = trameDisponible();
      if(!ev) continue;
      (ev.requis.sansFlags || []).forEach(f => hero.flags.push(f));
      // Un jalon d'Isolde attend un marqueur posé par le précédent : on le simule.
      if(ev.id === 'IS_01_INVITATION') hero.flags.push('isolde_connue');
      if(ev.id === 'EC_ALYCIA_1') hero.compagnons.push(COMPANIONS_POOL.alycia);
      if(ev.id === 'EC_ALARIELLE_1') hero.compagnons.push(COMPANIONS_POOL.alarielle);
      vus.push({ id: ev.id, sang: hero.trame.points });
    }
    return vus;
  });
  const iso = ordre.filter(o => o.id.startsWith('IS_'));
  console.log('    ' + ordre.map(o => o.id.replace(/_[A-Z].*$/, '')).join(' '));
  verifie('les cinq jalons d\'Isolde se déclenchent', iso.length === 5, iso.map(x=>x.id));
  verifie('dans l\'ordre', iso.map(x=>x.id).join(',').startsWith('IS_01'), iso.map(x=>x.id));
  verifie('un compagnon passe avant la politique',
    ordre.findIndex(o => o.id.startsWith('EC_')) < ordre.findIndex(o => o.id.startsWith('IS_')), ordre.map(o=>o.id));

  const fins = await page.evaluate(() => {
    const base = ['isolde_connue','is_01_fait','is_02_fait','is_03_fait','is_04_fait','dossier_soldes','tr_08_fait','isolde_alliee'];
    const issues = {};
    ['a_cote','publie','leopold','part'].forEach(sc => {
      hero.flags = base.slice();
      const ev = EVENTS_ISOLDE.find(e => e.id === 'IS_05_ETINCELLE');
      applyEffets(ev.scenes[sc].effets || {});
      issues[sc] = hero.flags.filter(f => f.startsWith('second_empire') || f.startsWith('isolde_') || f === 'leopold_sauve' || f === 'empire_ruine');
    });
    return issues;
  });
  verifie('rester à côté d\'elle fonde le Second Empire', fins.a_cote.includes('second_empire'), fins.a_cote);
  verifie('publier le dossier la brise', fins.publie.includes('isolde_brisee'), fins.publie);
  verifie('prévenir Léopold l\'écarte', fins.leopold.includes('isolde_ecartee'), fins.leopold);
  verifie('les trois issues diffèrent',
    new Set([fins.a_cote.join(), fins.publie.join(), fins.leopold.join()]).size === 3);
  await ctx.close();

  /* ---------- 3. Les attachements ont une fin ---------- */
  console.log("\nChaque attachement se conclut");
  ({ ctx, page } = await partie(browser));
  const rom = await page.evaluate(() => {
    const conclusions = ['RO_ALYCIA_4','RO_ALARIELLE_3','RO_ELEONORE_3'];
    const trouves = conclusions.filter(id => EVENTS_ROMANCE.some(e => e.id === id));
    // Chaque conclusion doit être atteignable depuis un état plausible.
    hero.compagnons = [COMPANIONS_POOL.alycia, COMPANIONS_POOL.alarielle];
    hero.affinites = { alycia:10, alarielle:10, eleonore:10 };
    hero.trame.points = 175;
    hero.flags = ['ro_alycia_1_fait','ro_alycia_2_fait','ro_alycia_3_fait','alycia_amants',
                  'ro_alarielle_1_fait','ro_alarielle_2_fait',
                  'prix_noble_accepte','ro_eleonore_1_fait','ro_eleonore_2_fait','eleonore_alliee','tr_05_fait'];
    const ouvertes = conclusions.filter(id => conditionsRemplies(EVENTS_ROMANCE.find(e => e.id === id).requis));
    return { trouves, ouvertes, total: EVENTS_ROMANCE.length };
  });
  verifie('les trois conclusions existent', rom.trouves.length === 3, rom.trouves);
  verifie('et sont atteignables en fin de chronique', rom.ouvertes.length === 3, rom.ouvertes);
  verifie(`les attachements comptent ${rom.total} scènes`, rom.total >= 10, rom.total);
  await ctx.close();

  /* ---------- 4. Les affaires locales, et ce qu'elles changent ---------- */
  console.log("\nLes affaires vont enfin quelque part");
  ({ ctx, page } = await partie(browser));
  const loc = await page.evaluate(() => {
    const noms = LOCATIONS.map(l => l.nom);
    const mauvais = [];
    Object.values(CONTRATS_LOCAUX_EXPANSES).flat().forEach(c => {
      if(!noms.includes(c.lieu)) mauvais.push(c.id + ' → ' + c.lieu);
    });
    // Les affaires écrites en chaînes déclarent, elles, les lieux où elles se
    // proposent : aucune ne doit viser un lieu qui n'est pas sur la carte.
    const chainesHorsCarte = CHAINES.filter(c => c.lieux)
      .flatMap(c => c.lieux.filter(id => !LOCATIONS.some(l => l.id === id)));
    return { affaires: Object.values(CONTRATS_LOCAUX_EXPANSES).flat().length, mauvais, chainesHorsCarte,
             lieuxCouverts: Object.keys(CONTRATS_LOCAUX_EXPANSES).length };
  });
  verifie('60 affaires locales sur les 20 lieux', loc.affaires === 60 && loc.lieuxCouverts === 20, loc);
  verifie('toutes se déroulent dans un lieu de la carte', loc.mauvais.length === 0, loc.mauvais.slice(0,4));
  verifie('aucune affaire écrite ne se propose dans un lieu inexistant',
    loc.chainesHorsCarte.length === 0, loc.chainesHorsCarte.slice(0,4));

  const dossier = await page.evaluate(() => {
    openLieu(LOCATIONS.find(l => l.id === 'LOC_016'));
    const offres = [...document.querySelectorAll('#lieuOffres .offre')].length;
    const dici = offresDuTour().filter(c => c.locale && !c.ailleurs).length;
    const avant = affairesDuLieu('LOC_016').length;
    CONTRATS_LOCAUX_EXPANSES.LOC_016.forEach(c => noterAffaireReglee(c));
    hero.offres = null;                    // le tableau se retire après coup
    renderLieu();
    return { offres, dici, avant,
             restantes: affairesDuLieu('LOC_016').length,
             complet: dossierComplet('LOC_016'),
             den: (denouementDisponible('LOC_016') || {}).id,
             bouton: !!document.getElementById('btnDenouement') };
  });
  verifie("l'écran du lieu propose toujours trois offres", dossier.offres === 3, dossier);
  verifie('le lieu a bien ses trois affaires au dossier', dossier.avant === 3, dossier);
  verifie('et il en propose au moins une de chez lui', dossier.dici >= 1, dossier);
  verifie('les régler vide le dossier', dossier.restantes === 0 && dossier.complet, dossier);
  verifie('et ouvre un dénouement', dossier.den === 'DL_016' && dossier.bouton, dossier);

  await page.evaluate(() => document.getElementById('btnDenouement').click());
  await page.waitForTimeout(200);
  const choixDen = await page.evaluate(() => [...document.querySelectorAll('#scChoix button')].map(b => b.textContent.split('\n')[0].trim()));
  verifie('le dénouement offre trois voies', choixDen.length === 3, choixDen);
  await derouler(page, 'fermer la filière');
  const suite = await page.evaluate(() => ({
    marqueur: hasFlag('dl_016_fait'), effet: hasFlag('port_assaini'),
    rep: hero.reputations.parias, clos: dossiersClos(),
    rejouable: !!denouementDisponible('LOC_016'),
  }));
  verifie('le choix laisse une trace durable', suite.marqueur && suite.effet, suite);
  verifie('et déplace une réputation', suite.rep > 10, suite.rep);
  verifie('le dénouement ne se rejoue pas', !suite.rejouable);
  verifie('le compteur de lieux menés au bout avance', suite.clos === 1, suite.clos);

  const epi = await page.evaluate(() => construireEpilogue(hero).bilan.dossiers);
  verifie('l\'épilogue en tient compte', epi === 1, epi);
  await ctx.close();

  await browser.close();
  console.log(echecs ? `\n${echecs} échec(s).` : "\nOn choisit ses compagnons, la politique a un visage, les liens se concluent, et chaque lieu mène quelque part.");
  process.exit(echecs ? 1 : 0);
})();
