/* PARIAS — Épreuve de la sauvegarde
 *
 *   node tools/build-standalone.js && node tools/smoke-save.js
 *
 * Ouvre dist/parias.html dans un vrai navigateur et vérifie les promesses du
 * système de sauvegarde : aller-retour dans un emplacement, migration d'une
 * vieille partie, refus d'écraser du bon par du mauvais, et honnêteté quand le
 * navigateur interdit le stockage.
 */
const { chromium } = require('playwright-core');
const path = require('path');

const url = 'file://' + path.join(__dirname, '..', 'dist', 'parias.html');
let echecs = 0;
function verifie(nom, condition, detail){
  if(condition){ console.log('  ✔', nom); }
  else { echecs++; console.log('  ✘', nom, detail !== undefined ? '→ '+JSON.stringify(detail) : ''); }
}

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

  /* ---------- 1. Aller-retour dans un emplacement ---------- */
  console.log('\nAller-retour dans un emplacement');
  let page = await (await browser.newContext()).newPage();
  page.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });
  await page.goto(url);
  await page.click('#btnStart');
  await page.click('#btnSkipPrologue').catch(()=>{});

  const r1 = await page.evaluate(() => {
    hero.or = 4242; hero.niveau = 7; hero.renom = 33;
    hero.flags.push('marqueur_temoin');
    hero.trame.chapitre = 2;
    const ecrit = ecrireSlot('s2', hero);
    hero.or = 0; hero.niveau = 1; hero.renom = 0; hero.flags = [];
    const charge = chargerDepuis('s2');
    return { ecrit, charge, or: hero.or, niveau: hero.niveau, renom: hero.renom,
             flag: hero.flags.includes('marqueur_temoin'),
             setsReconstruits: hero.unlocked instanceof Set && hero.crisesDeclenchees instanceof Set,
             meta: listerSlots().find(s => s.id === 's2').meta };
  });
  verifie('écriture acceptée', r1.ecrit);
  verifie('chargement accepté', r1.charge);
  verifie('or, niveau et renom restitués', r1.or === 4242 && r1.niveau === 7 && r1.renom === 33, r1);
  verifie('marqueur d\'histoire restitué', r1.flag);
  verifie('les Set redeviennent des Set', r1.setsReconstruits);
  verifie('métadonnées lisibles sans charger', r1.meta && r1.meta.niveau === 7 && r1.meta.numeroChapitre === 3, r1.meta);

  /* ---------- 2. Une écriture ratée ne détruit pas la précédente ---------- */
  console.log('\nUne écriture ratée ne détruit pas la précédente');
  const r2 = await page.evaluate(() => {
    const avant = localStorage.getItem(SAVE_PREFIX + 's2');
    // Un personnage cyclique : JSON.stringify échoue, l'écriture doit renoncer.
    const casse = { niveau: 1, pvMax: 10, trame: {chapitre:0, points:0} };
    casse.moi = casse;
    const ok = ecrireSlot('s2', casse);
    const apres = localStorage.getItem(SAVE_PREFIX + 's2');
    return { ok, intact: avant === apres, relisible: !!lireSlot('s2') };
  });
  verifie('l\'écriture impossible est signalée', r2.ok === false);
  verifie('l\'ancienne sauvegarde est intacte', r2.intact);
  verifie('l\'emplacement reste relisible', r2.relisible);

  /* ---------- 3. Un texte illisible ne casse pas la partie en cours ---------- */
  console.log('\nUn texte illisible ne casse pas la partie en cours');
  const r3 = await page.evaluate(() => {
    const or = hero.or;
    let leve = false;
    try { chargerDepuisTexte('{"ceci":"n\'est pas une partie"}'); } catch(e){ leve = true; }
    return { leve, orIntact: hero.or === or };
  });
  verifie('le texte invalide est refusé', r3.leve);
  verifie('la partie en cours est préservée', r3.orIntact);

  /* ---------- 4. Récupération d'une partie d'avant les emplacements ---------- */
  console.log('\nRécupération d\'une partie d\'avant les emplacements');
  const ctx4 = await browser.newContext();
  page = await ctx4.newPage();
  page.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });
  await page.goto(url);
  await page.evaluate(() => {
    // Forme v1 : ni renom, ni armée, ni affinités, ni marqueurs.
    localStorage.setItem('parias_vardhen_save_v1', JSON.stringify({
      nom:'Yohan', niveau:5, pv:30, pvMax:40, or:900, suspicion:12,
      trame:{chapitre:1, points:4}, temps:{semaines:20}, position:'karlsberg',
      unlocked:['p_frappe'], crisesDeclenchees:[], compagnons:[], inventaire:[],
      equipement:{}, chroniques:[], actionsTour:3, talentPoints:0, xp:0
    }));
  });
  await page.reload();
  const r4 = await page.evaluate(() => {
    const recupere = !!lireSlot('s1');
    const charge = chargerDepuis('s1');
    return { recupere, charge, ancienneCleEffacee: !localStorage.getItem('parias_vardhen_save_v1'),
             niveau: hero.niveau, or: hero.or,
             version: JSON.parse(localStorage.getItem(SAVE_PREFIX + 's1')).version,
             versionAttendue: SAVE_VERSION,
             renom: hero.renom, armee: Array.isArray(hero.armee), affinites: !!hero.affinites,
             flags: Array.isArray(hero.flags),
             boutonReprendre: !!document.querySelector('#saveOptions button') };
  });
  verifie('la vieille partie est reprise dans l\'emplacement 1', r4.recupere);
  verifie('l\'ancienne clé est libérée', r4.ancienneCleEffacee);
  verifie('elle est migrée en version courante', r4.version === r4.versionAttendue, r4);
  verifie('les champs récents sont comblés', r4.renom === 0 && r4.armee && r4.affinites && r4.flags, r4);
  verifie('elle reste jouable (niveau 5, 900 or)', r4.niveau === 5 && r4.or === 900, r4);
  verifie('l\'accueil propose de reprendre', r4.boutonReprendre);
  await ctx4.close();

  /* ---------- 4 bis. Un emplacement d'une version antérieure se relit ---------- */
  console.log("\nUn emplacement écrit par la version précédente n'est pas perdu");
  const ctx4b = await browser.newContext();
  page = await ctx4b.newPage();
  page.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });
  await page.goto(url);
  await page.evaluate(() => {
    // Un enregistrement au format v3 : pas de réputations, ancien préfixe.
    localStorage.setItem('parias_save_v3_s2', JSON.stringify({
      version: 3,
      meta: { date:new Date().toISOString(), niveau:9, chapitre:'—', numeroChapitre:2,
              sang:60, renom:14, or:700, suspicion:20, lieu:'Kar-Durak', saison:'—',
              armee:0, compagnons:[], termine:false },
      hero: { nom:'Yohan', niveau:9, pv:50, pvMax:70, or:700, suspicion:20,
              trame:{chapitre:1, points:60}, temps:{semaines:40}, position:'LOC_008',
              unlocked:['p_frappe'], crisesDeclenchees:[], compagnons:[], inventaire:[],
              equipement:{}, chroniques:[], actionsTour:3, talentPoints:0, xp:0,
              flags:[], evenementsVus:[], renom:14, armee:[], affinites:{} }
    }));
  });
  await page.reload();
  const r4b = await page.evaluate(() => {
    const enr = lireSlot('s2');
    if(!enr) return { relu:false };
    const charge = chargerDepuis('s2');
    return { relu:true, charge, version: enr.version, niveau: hero.niveau,
             reputations: hero.reputations, meta: listerSlots().find(s => s.id === 's2').meta };
  });
  verifie("l'ancien emplacement est retrouvé", r4b.relu && r4b.charge, r4b);
  verifie('il est migré en version courante', r4b.version === 4, r4b.version);
  verifie('la réputation manquante est comblée',
    r4b.reputations && r4b.reputations.parias === 10 && r4b.reputations.nains === 0, r4b.reputations);
  verifie('la partie reste jouable au niveau 9', r4b.niveau === 9, r4b.niveau);
  await ctx4b.close();

  /* ---------- 5. Stockage refusé : le jeu le dit ---------- */
  console.log('\nStockage refusé : le jeu le dit');
  const ctx5 = await browser.newContext();
  page = await ctx5.newPage();
  page.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });
  await page.addInitScript(() => {
    // Ce que fait un navigateur qui cloisonne le stockage.
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get(){ throw new DOMException('refusé', 'SecurityError'); }
    });
  });
  await page.goto(url);
  const r5 = await page.evaluate(() => {
    const dispo = stockageDisponible();
    const auto = saveGame(false);
    return { dispo, auto, message: document.getElementById('saveStatusText').textContent,
             accueil: document.getElementById('saveOptions').textContent };
  });
  verifie('l\'indisponibilité est détectée', r5.dispo === false);
  verifie('la sauvegarde ne prétend pas avoir réussi', r5.auto === false);
  verifie('le joueur est averti', /refuse le stockage/.test(r5.message), r5.message);
  verifie('l\'accueil prévient aussi', /refuse le stockage/.test(r5.accueil), r5.accueil);

  const r5b = await page.evaluate(() => {
    document.querySelector('[data-screen="personnage"]')?.click();
    renderSauvegardes();
    const w = document.getElementById('saveWarning');
    return { visible: w.style.display !== 'none', slots: document.querySelectorAll('.slot').length,
             boutonsActifs: [...document.querySelectorAll('.slot-actions button')].filter(b => !b.disabled).length };
  });
  verifie('l\'écran Sauvegarde affiche l\'avertissement', r5b.visible);
  verifie('les quatre emplacements restent affichés', r5b.slots === 4, r5b.slots);
  verifie('aucun bouton ne promet une sauvegarde', r5b.boutonsActifs === 0, r5b.boutonsActifs);
  await ctx5.close();

  await browser.close();
  console.log(echecs ? `\n${echecs} échec(s).` : '\nSauvegarde : tout tient.');
  process.exit(echecs ? 1 : 0);
})();
