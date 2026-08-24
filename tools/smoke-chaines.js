/* PARIAS — Épreuve des affaires écrites en chaînes
 *
 * Une affaire n'est plus une mission qu'on expédie : c'est une histoire qui se
 * joue sur plusieurs tours, dont les termes se fixent avant tout départ, dont
 * les branches sont des données, et dont l'issue survit à la partie.
 *
 *   node tools/build-standalone.js && node tools/smoke-chaines.js
 */
const { chromium } = require('playwright-core');
const path = require('path');
const url = 'file://' + path.join(__dirname, '..', 'dist', 'parias.html');
let echecs = 0;
const verifie = (n, ok, d) => { if(ok) console.log('  ✔', n);
  else { echecs++; console.log('  ✘', n, d !== undefined ? '→ '+JSON.stringify(d).slice(0,260) : ''); } };

/* Un pilote qui sait cliquer sur tout ce que le jeu peut présenter : une scène,
 * un combat, l'écran de fin de combat, les termes du Prix, le règlement, le
 * pli du tour. Rend le nom de ce qu'il a fait, ou 'rien'. */
const PILOTE = () => {
  if(document.getElementById('screen-combat').classList.contains('active')){
    const end = document.getElementById('endScreen');
    if(end && end.style.display !== 'none'){
      const b = document.getElementById('afterCombatBtn');
      if(b){ b.click(); return 'apres-combat'; }
    }
    // On ne teste pas l'équilibrage ici : on tranche le combat et on avance.
    combat.foes.forEach(f => { f.pv = 0; f.vivant = false; });
    checkEnd();
    return 'combat';
  }
  if(document.getElementById('eventModal').style.display !== 'flex') return 'rien';
  const cb = document.getElementById('scCombatBtn');   if(cb){ cb.click(); return 'engage'; }
  const bb = document.getElementById('scBatailleBtn'); if(bb){ bb.click(); return 'bataille'; }
  const px = document.querySelector('#prixChaine button:not([disabled])');
  if(px){ px.click(); return 'prix'; }
  const ch = document.querySelector('#scChoix button:not([disabled])');
  if(ch){ ch.click(); return 'choix'; }
  const su = document.getElementById('scSuiteBtn'); if(su){ su.click(); return 'suite'; }
  const fi = document.getElementById('scFinBtn');   if(fi){ fi.click(); return 'fin'; }
  const pa = document.getElementById('chPayeBtn');  if(pa){ pa.click(); return 'paye'; }
  const pl = document.getElementById('pliFermer');  if(pl){ pl.click(); return 'pli'; }
  return 'rien';
};

async function vider(page, max = 40){
  const faits = [];
  for(let i = 0; i < max; i++){
    const a = await page.evaluate(PILOTE);
    if(a === 'rien') break;
    faits.push(a);
    await page.waitForTimeout(90);
  }
  return faits;
}

(async () => {
  const browser = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });
  await page.goto(url);
  await page.click('#btnStart');
  for(let i=0;i<8;i++){ if(!await page.isVisible('#prologueNextBtn')) break; await page.click('#prologueNextBtn'); await page.waitForTimeout(20); }

  /* ---------- Le contenu ---------- */
  console.log("\nCe que les affaires promettent");
  const contenu = await page.evaluate(() => ({
    chaines: CHAINES.length,
    etapes: CHAINES.reduce((s,c)=>s+c.etapes.length,0),
    scenes: CHAINES.reduce((s,c)=>s+c.etapes.reduce((t,e)=>t+Object.keys(e.ev.scenes).length,0),0),
    toutesNobles: CHAINES.every(c => !c.prix || !!MAISONS[c.maison]),
    toutesSituees: CHAINES.every(c => (c.lieux||[]).every(l => LOCATIONS.some(x=>x.id===l))),
    issuesEcrites: CHAINES.every(c => Object.keys(c.issues||{}).length >= 3),
  }));
  verifie('des affaires écrites existent', contenu.chaines >= 3, contenu);
  verifie('chacune tient sur plusieurs étapes', contenu.etapes >= 12, contenu);
  verifie('et sur de vraies scènes', contenu.scenes >= 60, contenu);
  verifie('celles qui réclament le Prix ont une maison réelle', contenu.toutesNobles);
  verifie('toutes se déroulent sur la carte', contenu.toutesSituees);
  verifie('chacune sait finir de plusieurs façons', contenu.issuesEcrites);

  /* ---------- Le Prix ne s'invente plus ---------- */
  console.log("\nUne femme, pas une option de menu");
  const prix = await page.evaluate(() => {
    const c = { commanditaire:"Maison de Valcroix", maisonNoble:"Maison de Valcroix", or:1000, noble:true };
    hero.renom = 0; hero.suspicion = 0; hero.reputations = { ...REPUTATION_DEPART };
    const a = prixPariaDe(c);
    hero.suspicion = 90;
    const b = prixPariaDe(c);
    const vide = prixPariaDe({ commanditaire:"Maison de Clairmont", maisonNoble:"Maison de Clairmont", or:1000, noble:true });
    return {
      calme: a.noble_proposee && a.noble_proposee.nom,
      calmeAdulte: a.noble_proposee && a.noble_proposee.age >= 18,
      traque: b.noble_proposee && b.noble_proposee.nom,
      traqueRefus: b.indisponible,
      videRefus: vide.indisponible, videOptions: vide.choix,
    };
  });
  verifie('la maison propose quelqu\'un de nommé et adulte', !!prix.calme && prix.calmeAdulte, prix);
  verifie('une maison sans femme adulte ne peut pas payer en sang',
    !!prix.videRefus && prix.videOptions.length === 3 && !prix.videOptions.includes('NOBLE_CONSENTANTE'), prix);
  verifie('sous forte Suspicion, certaines refusent',
    prix.traque !== prix.calme || !!prix.traqueRefus, prix);

  const options = await page.evaluate(() => {
    hero.suspicion = 0; hero.renom = 0;
    const sansPersonne = { commanditaire:"Maison de Méricourt", maisonNoble:"Maison de Méricourt", or:900, noble:true };
    const p = prixPariaDe(sansPersonne);
    return optionsDuPrix(sansPersonne, p).map(o => o.id);
  });
  verifie('on ne propose jamais de réclamer une femme qui n\'existe pas',
    !options.includes('NOBLE_CONSENTANTE') && !options.includes('OR_ET_NOBLE_CONSENTANTE'), options);

  /* ---------- Une affaire s'offre là où elle se déroule ---------- */
  console.log("\nL'affaire se propose là où elle se joue");
  const offre = await page.evaluate(() => {
    hero.position = 'LOC_003'; currentLieu = LOCATIONS.find(l=>l.id==='LOC_003'); hero.offres = null;
    const o = offresDuTour();
    const ici = o.find(c=>c.chaine);
    return { n:o.length, chaine: o.filter(c=>c.chaine).length, titre: ici && ici.titre,
             // une affaire de Mont-Draken ne doit pas se proposer à Port-Noir
             ailleurs: (() => { hero.position='LOC_016'; hero.offres=null;
               const l = CHAINES.find(x=>x.id===(ici||{}).chaine);
               return !!l && !!l.lieux && !l.lieux.includes('LOC_016')
                      && offresDuTour().some(c=>c.chaine===l.id); })() };
  });
  verifie('le lieu qui la porte la propose', offre.chaine === 1 && offre.n === 3, offre);
  verifie('un autre lieu ne la propose pas', offre.ailleurs === false, offre);

  /* ---------- L'audience, puis les termes, puis l'attente ---------- */
  console.log("\nOn signe avant de partir, et ensuite on attend");
  const menee = await page.evaluate(() => {
    hero.position = 'LOC_003'; currentLieu = LOCATIONS.find(l=>l.id==='LOC_003'); hero.offres = null;
    const c = offresDuTour().find(x=>x.chaine); accepterOffre(c.id);
    return c.chaine;                       // l'affaire tirée varie : on suit celle-là
  });
  await page.waitForTimeout(150);
  const audience = await page.evaluate(() => ({
    modale: document.getElementById('eventModal').style.display,
    titre: document.getElementById('eventModalBox').querySelector('h3').textContent,
    choix: document.querySelectorAll('#scChoix button').length,
  }));
  verifie("l'audience s'ouvre en toutes lettres", audience.modale === 'flex' && audience.choix >= 3, audience);

  for(let i=0;i<6;i++){
    const encore = await page.evaluate(() => {
      if(document.querySelector('#prixChaine button')) return false;
      const b = document.querySelector('#scChoix button') || document.getElementById('scFinBtn')
              || document.getElementById('scSuiteBtn');
      if(b){ b.click(); return true; }
      return false;
    });
    await page.waitForTimeout(120);
    if(!encore) break;
  }
  const termes = await page.evaluate(() => ({
    titre: document.getElementById('eventModalBox').querySelector('h3').textContent,
    noble: !!document.querySelector('.prix-noble'),
    options: [...document.querySelectorAll('#prixChaine button')].length,
    prixFixe: !!(hero.chaines.actives[0] && hero.chaines.actives[0].data.prix),
  }));
  verifie('les termes se fixent avant tout départ',
    /Prix du Paria/.test(termes.titre) && termes.noble && termes.options >= 4 && !termes.prixFixe, termes);

  const apresTermes = await page.evaluate(() => {
    const b = [...document.querySelectorAll('#prixChaine button')].find(x=>/Prix entier/.test(x.textContent));
    b.click();
    const a = hero.chaines.actives[0];
    return { prix: a.data.prix, etape: a.etape, attente: a.echeance - hero.temps.semaines,
             or: hero.or, liaisons: hero.lignee.liaisons.length };
  });
  verifie('le terme choisi est retenu', apresTermes.prix === 'OR_ET_NOBLE_CONSENTANTE', apresTermes);
  verifie("la suite est datée : on ne l'a pas tout de suite", apresTermes.attente > 0, apresTermes);
  verifie("rien n'est payé avant que ce soit fait",
    apresTermes.or < 100 && apresTermes.liaisons === 0, apresTermes);

  const surPlace = await page.evaluate(() => {
    showScreen('lieu'); renderLieu();
    const t = document.querySelector('.affaire-cours');
    return { visible: !!t, texte: t ? t.textContent.replace(/\s+/g,' ').trim() : '' };
  });
  verifie("l'écran du lieu rappelle l'affaire en cours et ce qu'on attend",
    surPlace.visible && /semaine/.test(surPlace.texte), surPlace);

  const uneSeule = await page.evaluate(() => {
    hero.position = 'LOC_011'; hero.offres = null;
    return offresDuTour().filter(c=>c.chaine).length;
  });
  verifie("on ne mène jamais deux affaires de front", uneSeule === 0, uneSeule);

  /* ---------- Le temps la ramène, jusqu'au bout ---------- */
  console.log("\nElle revient vous chercher, tour après tour");
  const journal = [];
  let clos = false;
  for(let t = 0; t < 20 && !clos; t++){
    await page.evaluate(() => { hero.actionsTour = 0; endTurnMeta(); });
    await page.waitForTimeout(150);
    const faits = await vider(page);
    const etat = await page.evaluate(() => ({
      etape: hero.chaines.actives[0] ? hero.chaines.actives[0].etape : null,
      faites: hero.chaines.faites.length,
    }));
    journal.push({ t, faits: faits.join(','), etape: etat.etape });
    clos = etat.faites > 0;
  }
  const fin = await page.evaluate(() => ({
    faites: hero.chaines.faites, issues: hero.chaines.issues,
    or: hero.or, liaisons: hero.lignee.liaisons.map(l=>l.nom),
    chroniques: hero.chroniques.filter(c=>/❧/.test(c.texte)).map(c=>c.texte),
    actives: hero.chaines.actives.length,
  }));
  verifie("l'affaire se termine sans qu'on ait à la relancer", clos, journal.slice(-3));
  verifie("elle a pris plusieurs tours", journal.length >= 3, journal.length);
  console.log('    étapes traversées : ' + journal.map(j => j.etape || 'close').join(' → '));
  verifie("son issue est enregistrée pour toujours",
    fin.faites.includes(menee) && !!fin.issues[menee], { menee, ...fin });
  verifie('elle laisse une ligne dans les chroniques', fin.chroniques.length >= 1, fin.chroniques);
  verifie('le règlement paie ce qui avait été convenu', fin.or > 500, fin.or);
  verifie('et la maison a tenu sa part', fin.liaisons.length === 1, fin.liaisons);
  verifie("plus rien n'est en cours", fin.actives === 0, fin.actives);

  const relire = await page.evaluate(id => ({
    issue: issueDeChaine(id),
    faite: chaineFaite(id),
    reproposee: (() => { hero.position='LOC_003'; hero.offres=null;
      return offresDuTour().some(c=>c.chaine===id); })(),
    menees: chainesMenees(),
  }), menee);
  verifie('une affaire menée ne se repropose jamais', relire.reproposee === false, relire);
  verifie("et reste relisible par ce qui viendra après",
    !!relire.issue && relire.faite && relire.menees >= 1, relire);

  /* ---------- La sauvegarde ---------- */
  console.log("\nUne partie reprise se souvient de ses affaires");
  const sauve = await page.evaluate(() => {
    saveGame(true);
    const brut = JSON.parse(localStorage.getItem(cleSlot('auto')) || '{}');
    const vieux = { version:7, meta:{}, hero: JSON.parse(serialiserHero(hero)) };
    delete vieux.hero.chaines;
    const m = migrer(vieux);
    return { version: brut.version, attendue: SAVE_VERSION,
             issues: brut.hero.chaines && Object.keys(brut.hero.chaines.issues).length,
             migre: m.version === SAVE_VERSION && !!m.hero.chaines };
  });
  verifie("l'issue est écrite dans la sauvegarde",
    sauve.version === sauve.attendue && sauve.issues >= 1, sauve);
  verifie('une partie v7 se reprend sans rien casser', sauve.migre, sauve);

  await browser.close();
  console.log(echecs
    ? `\n${echecs} échec(s).`
    : "\nLes affaires se signent avant de partir, se jouent sur plusieurs tours, et laissent une trace qu'on relira.");
  process.exit(echecs ? 1 : 0);
})();
