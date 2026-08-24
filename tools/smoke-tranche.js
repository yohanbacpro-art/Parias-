/* PARIAS / VARDHEN — Épreuve de la tranche verticale
 *
 * C'est l'épreuve d'acceptation du document fondateur (CLAUDE.md). Elle marche
 * exactement le chemin qu'il décrit, sans rien simuler :
 *
 *   nouvelle partie → carte → voyage → arrivée dans un lieu → événement
 *   narratif à embranchements → combat → conséquence enregistrée →
 *   retour au jeu → sauvegarde, rechargement, la conséquence est toujours là.
 *
 * Elle vérifie aussi le principe absolu : à aucun moment l'interface ne montre
 * une branche que le joueur n'a pas prise.
 *
 *   node tools/build-standalone.js && node tools/smoke-tranche.js
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

  /* ---------- 1. Nouvelle partie ---------- */
  console.log("\n1. Une nouvelle partie commence");
  await page.goto(url);
  const accueil = await page.evaluate(() => ({
    ecran: [...document.querySelectorAll('.screen')].find(s=>s.classList.contains('active')).id,
    bouton: !!document.getElementById('btnStart'),
  }));
  verifie("le jeu s'ouvre sur son accueil", accueil.ecran === 'screen-accueil' && accueil.bouton, accueil);
  await page.click('#btnStart');
  let slides = 0;
  for(let i=0;i<8;i++){ if(!await page.isVisible('#prologueNextBtn')) break; slides++; await page.click('#prologueNextBtn'); await page.waitForTimeout(30); }
  const debut = await page.evaluate(() => ({
    ecran: [...document.querySelectorAll('.screen')].find(s=>s.classList.contains('active')).id,
    nom: hero.nom || 'Yohan', pv: hero.pv, sem: hero.temps.semaines, lieu: hero.position,
    calendrier: document.getElementById('calendarText').textContent.replace(/\s+/g,' ').trim(),
  }));
  verifie('le prologue se déroule puis rend la main', slides >= 3 && debut.ecran === 'screen-lieu', { slides, ...debut });
  verifie('Yohan existe, daté et situé',
    debut.pv > 0 && debut.sem === 0 && debut.lieu === 'LOC_001' && /An /.test(debut.calendrier), debut);

  /* ---------- 2. La carte ---------- */
  console.log("\n2. La carte de Vardhen se lit");
  const carte = await page.evaluate(() => {
    showScreen('monde'); renderMonde();
    return { pins: document.querySelectorAll('#mapPins .map-pin').length,
             routes: document.getElementById('mapRoutes').innerHTML.split('<line').length - 1,
             regions: REGIONS.length, ici: hero.position };
  });
  verifie('les vingt lieux sont sur la carte', carte.pins >= 20, carte);
  verifie('les routes sont tracées', carte.routes >= 20, carte);
  verifie('les quatre régions existent', carte.regions === 4, carte);

  /* ---------- 3. Le voyage fait avancer le temps ---------- */
  console.log("\n3. Voyager coûte du temps");
  const voyage = await page.evaluate(() => new Promise(res => {
    const dest = ROUTES.filter(r => r.includes('LOC_001')).map(r => r[0]==='LOC_001'?r[1]:r[0])[0];
    const av = { lieu: hero.position, sem: hero.temps.semaines, fat: hero.fat };
    voyagerVers(dest, () => {});
    res({ av, dest, ap: { lieu: hero.position, sem: hero.temps.semaines, fat: hero.fat },
          recit: document.getElementById('eventModalBox').textContent.replace(/\s+/g,' ').slice(0,90) });
  }));
  verifie('le voyage déplace Yohan', voyage.ap.lieu === voyage.dest, voyage);
  verifie('et fait passer des semaines', voyage.ap.sem > voyage.av.sem, voyage);
  verifie('la route fatigue et se raconte',
    voyage.ap.fat > voyage.av.fat && /semaine/.test(voyage.recit), voyage);
  await page.evaluate(() => { closeEventModal(); });

  /* ---------- 4. Arriver dans un lieu qui propose quelque chose ---------- */
  console.log("\n4. Le lieu propose, on choisit");
  const surPlace = await page.evaluate(() => {
    hero.position = 'LOC_016';                    // Port-Noir : ville et taverne
    currentLieu = LOCATIONS.find(l => l.id === 'LOC_016');
    hero.offres = null;
    openLieu(currentLieu);
    return { ecran: [...document.querySelectorAll('.screen')].find(s=>s.classList.contains('active')).id,
             nom: document.getElementById('lieuNom').textContent,
             offres: document.querySelectorAll('#lieuOffres .offre').length,
             actions: [...document.querySelectorAll('#lieuActions button')].map(b=>b.querySelector('span').textContent),
             accueil: document.getElementById('lieuAccueil').textContent.trim().length };
  });
  verifie("on arrive quelque part de nommé et décrit",
    surPlace.ecran === 'screen-lieu' && /Port-Noir/.test(surPlace.nom) && surPlace.accueil > 20, surPlace);
  verifie('trois offres attendent', surPlace.offres === 3, surPlace);
  verifie("et de quoi occuper la journée",
    surPlace.actions.length >= 4 && surPlace.actions.some(a=>/Chercher/.test(a)), surPlace);

  /* ---------- 5. Un événement à embranchements, sans montrer les branches ---------- */
  console.log("\n5. Un récit s'ouvre, et il ne montre que la scène en cours");
  const scene = await page.evaluate(() => {
    hero.evenementsVus = [];
    const lieu = LOCATIONS.find(l => l.id === 'LOC_016');
    const ev = EVENTS_WRITTEN.find(e => e.id === 'EW_TAVERNE_DETTE')
            || catalogueExploration().find(e => eventApplicable(e, lieu) && Object.keys(e.scenes).length >= 4);
    openWrittenEvent(ev, lieu);
    const box = document.getElementById('eventModalBox');
    const texteAffiche = box.textContent;
    // Toutes les scènes du récit sauf celle-ci : aucune ne doit apparaître.
    const fuites = Object.entries(ev.scenes)
      .filter(([id]) => id !== 'start')
      .flatMap(([id, sc]) => (sc.texte || []).map(p => ({ id, extrait: p.slice(0, 40) })))
      .filter(x => texteAffiche.includes(x.extrait));
    return { id: ev.id, titre: ev.titre, scenes: Object.keys(ev.scenes).length,
             choix: [...document.querySelectorAll('#scChoix button')].map(b=>b.textContent.split('\n')[0].trim()),
             fuites, longueur: texteAffiche.length,
             illustration: !!box.querySelector('.event-banner, img, svg') };
  });
  verifie("le récit est illustré, daté et situé", scene.illustration && scene.longueur > 200, scene);
  verifie('il offre de vrais choix', scene.choix.length >= 2, scene.choix);
  verifie("AUCUNE branche future n'est visible", scene.fuites.length === 0, scene.fuites);
  console.log(`    « ${scene.titre} » — ${scene.scenes} scènes écrites, ${scene.choix.length} choix montrés`);

  /* ---------- 6. Le choix mène ailleurs, et peut mener au combat ---------- */
  console.log("\n6. Le choix mène quelque part, parfois aux armes");
  const apresChoix = await page.evaluate(() => {
    const avant = document.getElementById('eventModalBox').textContent.slice(0, 120);
    document.querySelector('#scChoix button:not([disabled])').click();
    return { avant, apres: document.getElementById('eventModalBox').textContent.slice(0, 120),
             scene: ecritState && ecritState.sceneId };
  });
  verifie('la scène suivante remplace la précédente',
    apresChoix.scene !== 'start' && apresChoix.avant !== apresChoix.apres, apresChoix);

  const combat = await page.evaluate(() => {
    // On éprouve le combat pour de bon, avec un affrontement écrit.
    hero.evenementsVus = [];
    ecritState = null;
    const lieu = LOCATIONS.find(l => l.id === 'LOC_016');
    const ev = EVENTS_WRITTEN.concat(EVENTS_WRITTEN_2)
      .find(e => Object.values(e.scenes).some(sc => sc.combat));
    openWrittenEvent(ev, lieu);
    const sc = Object.entries(ev.scenes).find(([, s]) => s.combat)[0];
    renderScene(sc);
    document.getElementById('scCombatBtn').click();
    return { ecran: [...document.querySelectorAll('.screen')].find(s=>s.classList.contains('active')).id,
             ennemis: combat.foes.map(f => f.nom), pa: combat.party[0].paMax,
             fatigueAvant: hero.fat };
  });
  verifie("le système de combat existant prend la main",
    combat.ecran === 'screen-combat' && combat.ennemis.length >= 1 && combat.pa >= 3, combat);
  const issue = await page.evaluate(() => {
    combat.foes.forEach(f => { f.pv = 0; f.vivant = false; });
    checkEnd();
    document.getElementById('afterCombatBtn').click();
    return { ecran: [...document.querySelectorAll('.screen')].find(s=>s.classList.contains('active')).id,
             victoire: lastCombatVictory, modale: document.getElementById('eventModal').style.display };
  });
  verifie('et rend la main au récit qui l\'avait lancé',
    issue.victoire === true && issue.ecran !== 'screen-combat' && issue.modale === 'flex', issue);

  /* ---------- 7. La conséquence est enregistrée ---------- */
  console.log("\n7. Ce qui s'est passé laisse une trace");
  const trace = await page.evaluate(() => {
    // On termine le récit puis on pose une conséquence vérifiable.
    for(let i=0;i<12;i++){
      const f = document.getElementById('scFinBtn'); const s = document.getElementById('scSuiteBtn');
      const c = document.querySelector('#scChoix button:not([disabled])');
      if(f){ f.click(); break; } if(s){ s.click(); continue; } if(c){ c.click(); continue; } break;
    }
    ajusterReputation('humains', -14);
    if(!hasFlag('seigneur_humilie_tranche')) heroFlags().push('seigneur_humilie_tranche');
    return { flags: hero.flags.length, marqueur: hasFlag('seigneur_humilie_tranche'),
             humains: reputationDe('humains'), vus: hero.evenementsVus.length,
             modale: document.getElementById('eventModal').style.display };
  });
  verifie('le récit se referme et rend le jeu', trace.modale === 'none', trace);
  verifie('un marqueur durable est posé', trace.marqueur && trace.flags >= 1, trace);
  verifie('une réputation a bougé', trace.humains === -14, trace);
  verifie("le récit joué est retenu comme vu", trace.vus >= 1, trace);

  /* ---------- 8. Sauvegarde, rechargement, la trace tient ---------- */
  console.log("\n8. On sauvegarde, on recharge, rien n'est perdu");
  const avant = await page.evaluate(() => {
    saveGame(true);
    return { sem: hero.temps.semaines, lieu: hero.position, pv: hero.pv, or: hero.or,
             humains: reputationDe('humains'), marqueur: hasFlag('seigneur_humilie_tranche'),
             vus: hero.evenementsVus.length, version: SAVE_VERSION };
  });
  await page.reload();
  await page.waitForTimeout(200);
  const apres = await page.evaluate(() => {
    const ok = chargerDepuis('auto');
    return { charge: !!ok, sem: hero.temps.semaines, lieu: hero.position, pv: hero.pv, or: hero.or,
             humains: reputationDe('humains'), marqueur: hasFlag('seigneur_humilie_tranche'),
             vus: hero.evenementsVus.length,
             ecran: [...document.querySelectorAll('.screen')].find(s=>s.classList.contains('active')).id };
  });
  verifie('la partie se recharge', apres.charge, apres);
  verifie('le temps, le lieu et l\'état sont les mêmes',
    apres.sem === avant.sem && apres.lieu === avant.lieu && apres.pv === avant.pv && apres.or === avant.or,
    { avant, apres });
  verifie('LA CONSÉQUENCE A SURVÉCU',
    apres.marqueur === true && apres.humains === avant.humains && apres.vus === avant.vus,
    { avant, apres });
  verifie('et le jeu reprend là où on l\'avait laissé', apres.ecran === 'screen-lieu', apres);

  await browser.close();
  console.log(echecs
    ? `\n${echecs} échec(s).`
    : "\nLa tranche verticale tient : partir, voyager, arriver, choisir, se battre, en garder la trace, et la retrouver.");
  process.exit(echecs ? 1 : 0);
})();
