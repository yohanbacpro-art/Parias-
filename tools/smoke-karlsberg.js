/* PARIAS — Épreuve du chantier payé autrement qu'en or
 *
 *   node tools/build-standalone.js && node tools/smoke-karlsberg.js
 *
 * *« Jamais "Reconstruire le château : 10 000 or". Il faut de la pierre, des
 * ouvriers, un architecte, de la nourriture, des routes sûres, une garnison,
 * une population, des revenus, des alliances. »*
 *
 * On vérifie donc qu'aucune somme d'or ne suffit, que les ressources viennent
 * de décisions prises ailleurs, que le refus dit quoi ouvrir, et que Karlsberg
 * passe par ses six états nommés.
 */
const { chromium } = require('playwright-core');
const path = require('path');
const url = 'file://' + path.join(__dirname, '..', 'dist', 'parias.html');
let echecs = 0;
const verifie = (n, ok, d) => { if(ok) console.log('  ✔', n);
  else { echecs++; console.log('  ✘', n, d !== undefined ? '→ '+JSON.stringify(d).slice(0,280) : ''); } };

(async () => {
  const browser = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });
  await page.goto(url);
  await page.click('#btnStart');
  for(let i=0;i<6;i++){ if(!await page.isVisible('#prologueNextBtn')) break; await page.click('#prologueNextBtn'); await page.waitForTimeout(20); }

  /* ---------- 1. Tout l'or du monde ne suffit pas ---------- */
  console.log('\nTout l\'or du monde ne relève pas une maison');
  const or = await page.evaluate(() => {
    hero.flags = []; hero.chantier = []; hero.ressources = { pierre:0, bras:0, grain:0, faveurs:0 };
    hero.or = 999999;
    const etats = CHANTIER.map(o => {
      const e = ouvrageDisponible(o);
      return { id:o.id, ouvrable: !!(e && e.ok), bloque: e && e.bloque };
    });
    return { etats, ouvrables: etats.filter(e => e.ouvrable).map(e => e.id) };
  });
  console.log('    avec un million d\'or : ' + (or.ouvrables.join(', ') || 'rien'));
  verifie('avec un million d\'or et rien d\'autre, presque rien ne se bâtit',
    or.ouvrables.length <= 1, or.ouvrables);
  verifie('et le donjon en fait partie des refus',
    !or.ouvrables.includes('ch_donjon'), or.etats.find(e => e.id === 'ch_donjon'));

  /* ---------- 2. Les ressources viennent de ce qu'on a fait ailleurs ---------- */
  console.log('\nLa pierre vient d\'une carrière rendue à ses hommes');
  const sources = await page.evaluate(() => {
    hero.flags = []; hero.ressources = { pierre:0, bras:0, grain:0, faveurs:0 };
    const rien = { actives: sourcesActives().length, rendement: rendementParSaison() };
    hero.flags.push('rochebrune_carriere', 'refuge_tenu', 'route_franche', 'charles_allie');
    const ouvertes = { actives: sourcesActives().length, rendement: rendementParSaison() };
    ressourcesTick();
    return { rien, ouvertes, stock: { ...hero.ressources },
             raisons: sourcesActives().map(s => s.pourquoi) };
  });
  console.log('    ' + sources.raisons[0]);
  verifie('sans rien fait, rien ne rentre',
    sources.rien.actives === 0 && Object.values(sources.rien.rendement).every(v => v === 0), sources.rien);
  verifie('quatre décisions prises ailleurs ouvrent quatre sources',
    sources.ouvertes.actives === 4, sources.ouvertes.actives);
  verifie('et elles rapportent aux quatre ressources',
    Object.values(sources.stock).every(v => v > 0), sources.stock);
  verifie('chaque source dit d\'où elle vient, en toutes lettres',
    sources.raisons.every(r => r.length > 20), sources.raisons);

  /* ---------- 3. Le refus dit quoi aller ouvrir ---------- */
  console.log('\nUn refus dit ce qu\'il faudrait ouvrir, pas un chiffre à atteindre');
  const refus = await page.evaluate(() => {
    hero.flags = []; hero.chantier = ['ch_cour']; hero.or = 999999;
    hero.ressources = { pierre:0, bras:0, grain:0, faveurs:0 };
    const sansRoute = ouvrageDisponible(CHANTIER.find(o => o.id === 'ch_enceinte'));
    hero.flags.push('cg_route_fait');
    const sansPierre = ouvrageDisponible(CHANTIER.find(o => o.id === 'ch_enceinte'));
    return { sansRoute, sansPierre };
  });
  console.log('    ' + refus.sansRoute.bloque);
  console.log('    ' + refus.sansPierre.bloque + (refus.sansPierre.piste ? ' — ' + refus.sansPierre.piste : ''));
  verifie('la condition passe avant le stock : d\'abord la route',
    /route|défilé/i.test(refus.sansRoute.bloque), refus.sansRoute);
  verifie('la route ouverte, c\'est la pierre qui manque',
    /pierre/i.test(refus.sansPierre.bloque), refus.sansPierre);
  verifie('et le jeu dit où aller la chercher',
    !!refus.sansPierre.piste && refus.sansPierre.piste.length > 10, refus.sansPierre.piste);

  /* ---------- 4. Une partie qui a rendu des choses aux gens peut bâtir ---------- */
  console.log('\nUne partie où l\'on a rendu des choses à des gens peut bâtir');
  const jouee = await page.evaluate(() => {
    hero.flags = ['cg_route_fait','rochebrune_carriere','nain_pierre_taillee','brecourt_treuil',
                  'refuge_tenu','vaudreuil_sept_libres','fils_a_karlsberg','caleb_allie',
                  'route_franche','vaudreuil_defrichement','karlsberg_route_ouverte','gorge_ouverte',
                  'estrees_peage_leve','route_peage','aubremont_familles','arquenay_sauves',
                  'charles_allie','nain_maitre_oeuvre','nain_boucliers_venus','khesh_lances_offertes',
                  'karlsberg_rasee_deux_fois','torcy_veine_haute','vaudreuil_quatre_libres'];
    hero.chantier = []; hero.or = 6000;
    hero.ressources = { pierre:0, bras:0, grain:0, faveurs:0 };
    /* Vingt saisons pendant lesquelles ces sources travaillent. */
    for(let t = 0; t < 20; t++) ressourcesTick();
    const stock = { ...hero.ressources };
    /* Puis on bâtit tout ce qui devient ouvrable, dans l'ordre. */
    const bati = [];
    for(let tour = 0; tour < 14; tour++){
      const o = CHANTIER.find(x => { const e = ouvrageDisponible(x); return e && e.ok; });
      if(!o) break;
      payerRessources(Object.assign({ or:o.or||0 }, o.cout||{}));
      hero.chantier.push(o.id);
      (o.effet && o.effet.flags || []).forEach(f => { if(!hasFlag(f)) hero.flags.push(f); });
      bati.push(o.id);
      for(let t = 0; t < 6; t++) ressourcesTick();   // les semaines passent aussi
    }
    return { stock, bati, palier: palierKarlsberg().nom, reste: { ...hero.ressources } };
  });
  console.log(`    ${jouee.bati.length} ouvrages bâtis · Karlsberg est : ${jouee.palier}`);
  verifie('vingt saisons de sources ouvertes donnent de quoi commencer',
    jouee.stock.pierre > 20 && jouee.stock.bras > 20, jouee.stock);
  verifie('et on monte au-delà du fort', jouee.bati.includes('ch_donjon'), jouee.bati);
  verifie('Karlsberg atteint un état nommé, pas un pourcentage',
    ['Château','Domaine','Puissance régionale'].includes(jouee.palier), jouee.palier);

  /* ---------- 5. Les six états, dans l'ordre ---------- */
  console.log('\nRuines → refuge → fort → château → domaine → puissance');
  const paliers = await page.evaluate(() => {
    hero.chantier = [];
    const suivi = [palierKarlsberg().nom];
    for(const p of KARLSBERG_PALIERS){
      p.exige.forEach(id => { if(!hero.chantier.includes(id)) hero.chantier.push(id); });
      suivi.push(palierKarlsberg().nom);
    }
    return { suivi, noms: KARLSBERG_PALIERS.map(p => p.nom),
             dits: KARLSBERG_PALIERS.map(p => p.dit) };
  });
  console.log('    ' + paliers.noms.join(' → '));
  verifie('les six états existent', paliers.noms.length === 6, paliers.noms);
  verifie('on les traverse dans l\'ordre',
    paliers.suivi[paliers.suivi.length-1] === 'Puissance régionale', paliers.suivi);
  verifie('chacun se dit en une phrase',
    paliers.dits.every(d => d.length > 25), paliers.dits.length);

  /* ---------- 6. Les bras mangent ---------- */
  console.log('\nOn ne peut pas entasser des hommes sans les nourrir');
  const faim = await page.evaluate(() => {
    hero.flags = []; hero.ressources = { pierre:0, bras:40, grain:0, faveurs:0 };
    hero.chroniques = [];
    ressourcesTick();
    return { bras: hero.ressources.bras, chronique: hero.chroniques.map(c => c.texte)[0] || '' };
  });
  verifie('sans grain, des bras s\'en vont', faim.bras < 40, faim.bras);
  verifie('et on le raconte', /repartis|nourrit/.test(faim.chronique), faim.chronique);

  /* ---------- 7. L'écran montre d'où ça vient ---------- */
  console.log('\nL\'écran montre les sources, pas un rendement');
  const ecran = await page.evaluate(() => {
    hero.flags = ['rochebrune_carriere','refuge_tenu','charles_allie'];
    hero.chantier = ['ch_cour','ch_salle'];
    hero.ressources = { pierre:12, bras:9, grain:0, faveurs:4 };
    renderRessources();
    const g = document.getElementById('ressourcesBloc');
    return { palier: (g.querySelector('.kb-palier')||{}).textContent || '',
             dit: (g.querySelector('.kb-dit')||{}).textContent || '',
             suite: (g.querySelector('.kb-suite')||{}).textContent || '',
             cartes: g.querySelectorAll('.res').length,
             sources: [...g.querySelectorAll('.res-sources li')].map(e => e.textContent.trim()),
             rien: [...g.querySelectorAll('.res-rien')].map(e => e.textContent.trim()) };
  });
  verifie('l\'état de Karlsberg est nommé', ecran.palier === 'Refuge', ecran.palier);
  verifie('et dit en une phrase', ecran.dit.length > 25, ecran.dit);
  verifie('la suite est annoncée par des ouvrages, pas par un coût',
    /enceinte|puits/i.test(ecran.suite), ecran.suite);
  verifie('les quatre ressources sont affichées', ecran.cartes === 4, ecran.cartes);
  verifie('chaque source est nommée et expliquée',
    ecran.sources.length >= 3 && ecran.sources.every(t => t.length > 25), ecran.sources.slice(0,2));
  verifie('et ce qui manque dit quoi aller ouvrir',
    ecran.rien.some(t => /Il faudrait/.test(t)), ecran.rien);

  await browser.close();
  console.log(echecs ? `\n${echecs} échec(s).` : '\nKarlsberg se relève avec de la pierre, des bras, du grain et des dettes.');
  process.exit(echecs ? 1 : 0);
})();
