const { chromium } = require('playwright-core');
const FILE = 'file://' + require('path').join(__dirname, '..', 'dist', 'parias.html');   // le bundle, pas les sources

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('console', m => {
    const t = m.text();
    if (m.type() === 'error' && !/fonts\.googleapis|ERR_CONNECTION|ERR_FILE_NOT_FOUND|ERR_NAME/.test(t)) errors.push('CONSOLE: ' + t);
    if (/introuvable|inconnu/i.test(t)) errors.push('WARN: ' + t);
  });
  const log = s => console.log('· ' + s);

  await page.goto(FILE); await page.waitForTimeout(300);
  log('bundle chargé (fichier unique)');
  await page.click('#btnStart');
  for (let i = 0; i < 4; i++) { await page.click('#prologueNextBtn'); await page.waitForTimeout(30); }
  log('prologue OK depuis le bundle');

  // ───── 1. Les campagnes majeures restent fermées sans tension ─────
  await page.evaluate(() => { hero.renom = 60; hero.or = 20000; });
  let ouvertes = await page.evaluate(() => contratsSpeciauxDisponibles('campagne').map(c => c.id));
  log(`Renom 60, tensions au départ → campagnes : ${ouvertes.join(', ')}`);
  if (ouvertes.some(id => ['CG_KHESH','CG_KARDURAK','CG_SURFACE','CG_HORDE','CG_PARIAS'].includes(id)))
    throw new Error('une campagne majeure est ouverte sans que la crise ait mûri');

  // ───── 2. La crise d'un peuple les ouvre ─────
  await page.evaluate(() => {
    hero.tensions.khesh = 70; hero.tensions.nains = 70;
    hero.tensions.peaux_vertes = 70; hero.tensions.hommes_betes = 70;
    hero.tensions.parias = 60; hero.tensions.elfes = 60;
    hero.compagnons = [COMPANIONS_POOL.alycia];
    if (!hasFlag('archive_elfique')) hero.flags.push('archive_elfique');
  });
  ouvertes = await page.evaluate(() => contratsSpeciauxDisponibles('campagne').map(c => c.id));
  log(`tensions montées → campagnes : ${ouvertes.join(', ')}`);
  const majeures = ['CG_KHESH','CG_KARDURAK','CG_SURFACE','CG_HORDE','CG_ELTHARION','CG_PARIAS'];
  const manquantes = majeures.filter(id => !ouvertes.includes(id));
  if (manquantes.length) throw new Error('campagnes majeures absentes : ' + manquantes.join(', '));

  // ───── 3. Jouer une bataille majeure ─────
  await page.evaluate(() => {
    hero.armee = [];
    ['veterans','veterans','arbaletriers','cavalerie','lanciers','archers']
      .forEach(t => { if (UNIT_TYPES[t] && !UNIT_TYPES[t].requisFlag) hero.armee.push(instancierUnite(t)); });
    ouvrirContratSpecial('CG_KARDURAK');
  });
  await page.waitForTimeout(100);
  log(`campagne majeure ouverte : « ${(await page.textContent('#eventModalBox h3')).trim()} »`);

  for (let d = 0; d < 5; d++) {
    if (await page.isVisible('#scBatailleBtn')) break;
    const b = await page.$$('#scChoix button:not(.locked)');
    if (!b.length) break;
    await b[0].click(); await page.waitForTimeout(60);
  }
  if (!await page.isVisible('#scBatailleBtn')) throw new Error('scène de bataille non atteinte');
  await page.click('#scBatailleBtn'); await page.waitForTimeout(150);

  const bat = await page.evaluate(() => ({
    nom: bataille.def.nom, peuple: bataille.def.peuple,
    fronts: bataille.fronts.map(f => `${f.nom} (${TERRAINS[f.terrain].nom}) : ${f.ennemis.map(u => u.nom + ' ' + u.effectif).join(', ')}`),
    ennemis: bataille.effectifInitialEnnemi, nous: bataille.effectifInitialAllie,
  }));
  log(`bataille « ${bat.nom} » · peuple : ${bat.peuple} · ${bat.nous} contre ${bat.ennemis}`);
  bat.fronts.forEach(f => log('    ' + f));

  // Déployer tout, ordres agressifs, résoudre
  await page.evaluate(() => {
    while (bataille.reserve.length) {
      const u = bataille.reserve[0];
      deplacerUnite(u.uid, bataille.fronts[bataille.reserve.length % 3]);
    }
    bataille.fronts.forEach(f => f.ordre = 'charger');
    placerYohan(1);
    renderBattle();
  });
  await page.click('#batActionBtn'); await page.waitForTimeout(80);
  for (let t = 0; t < 40; t++) {
    if (await page.isVisible('#batFinBtn')) break;
    await page.click('#batActionBtn'); await page.waitForTimeout(40);
  }
  const issue = await page.evaluate(() => ({ v: bataille.victoire, t: bataille.tour, ma: bataille.moralAllie, me: bataille.moralEnnemi }));
  log(`issue : victoire=${issue.v} en ${issue.t} tours · moral ${issue.ma}/${issue.me}`);
  await page.click('#batFinBtn'); await page.waitForTimeout(120);
  if (await page.isVisible('#scFinBtn')) await page.click('#scFinBtn');
  log('retour de campagne majeure joué');

  // ───── 4. Les nouveaux jalons de trame ─────
  const jalons = await page.evaluate(() => EVENTS_TRAME.map(e => e.id));
  log(`jalons de trame : ${jalons.length} — ${jalons.join(', ')}`);

  let joues = 0;
  await page.evaluate(() => { openLieu(LOCATIONS.find(l => l.id === 'LOC_011')); });
  for (let i = 0; i < 20; i++) {
    // On pilote la fin de tour par code : un clic serait intercepté par la modale
    // qu'un jalon précédent vient d'ouvrir.
    await page.evaluate(() => {
      hero.trame.points = Math.min(200, hero.trame.points + 18);
      hero.actionsTour = 0;
      if (document.getElementById('eventModal').style.display !== 'flex') endTurnMeta();
    });
    await page.waitForTimeout(90);

    // Dérouler tout ce qui s'est ouvert, y compris un enchaînement de jalons
    for (let garde = 0; garde < 12; garde++) {
      if (!await page.isVisible('#eventModal')) break;
      const id = await page.evaluate(() => ecritState && ecritState.ev ? ecritState.ev.id : null);
      if (await page.isVisible('#scFinBtn')) {
        if (id && (id.startsWith('TR_') || id.startsWith('RO_'))) joues++;
        await page.click('#scFinBtn'); await page.waitForTimeout(70);
      } else if (await page.isVisible('#scChoix')) {
        const b = await page.$$('#scChoix button:not(.locked)');
        if (!b.length) { await page.evaluate(() => closeEventModal()); break; }
        await b[0].click(); await page.waitForTimeout(60);
      } else if (await page.isVisible('#scCombatBtn')) {
        // Un jalon peut passer par un affrontement : il faut le mener pour que la
        // scène suivante pose son marqueur.
        await page.click('#scCombatBtn'); await page.waitForTimeout(90);
        for (let t = 0; t < 50 && !(await page.isVisible('#afterCombatBtn')); t++) {
          const a = await page.$$('#weaponActions button:not([disabled]), #powerActions button:not([disabled])');
          if (a.length) await a[0].click(); else await page.click('#endTurnBtn');
          await page.waitForTimeout(15);
        }
        if (await page.isVisible('#afterCombatBtn')) await page.click('#afterCombatBtn');
        await page.waitForTimeout(90);
      } else if (await page.isVisible('#scBatailleBtn')) {
        await page.evaluate(() => { closeEventModal(); });   // on ne mène pas les batailles ici
        break;
      } else {
        await page.evaluate(() => { document.getElementById('eventModal').style.display = 'none'; });
        break;
      }
    }
  }
  const prog = await page.evaluate(() => trameProgres());
  log(`jalons joués en enchaînant les tours : ${joues} · progression ${prog.faits}/${prog.total}`);
  if (prog.faits < 7) throw new Error('la trame ne progresse pas : ' + prog.faits);

  // ───── 5. Sauvegarde dans le bundle ─────
  const sauve = await page.evaluate(() => { saveGame(true); return !!lireSlot('auto'); });
  log('sauvegarde locale depuis le bundle : ' + sauve);

  await browser.close();
  console.log('\n' + (errors.length ? 'ERREURS :\n' + errors.join('\n') : '✔ aucune erreur JS'));
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error('ÉCHEC : ' + e.message); process.exit(1); });
