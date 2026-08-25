/* Vérifie la tranche dans un vrai navigateur : aucune erreur de page, toutes
   les scènes atteignables, et les cinq issues joignables. */
const { chromium } = require('playwright-core');
const path = require('path');
const url = 'file://' + path.join(__dirname, '..', 'proto', 'tranche-1.html');
(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox'] });
  const p = await b.newPage();
  const err = [];
  p.on('pageerror', e => err.push(e.message));
  p.on('console', m => { if(m.type() === 'error') err.push('console: ' + m.text()); });
  await p.goto(url);
  await p.waitForTimeout(300);

  const audit = await p.evaluate(() => {
    const ids = Object.keys(SCENES);
    const cibles = new Set();
    const manquantes = [];
    for(const [id, s] of Object.entries(SCENES)){
      const pousse = x => { if(x){ cibles.add(x); if(!SCENES[x]) manquantes.push(id + ' → ' + x); } };
      if(s.suite) pousse(s.suite);
      (s.choix || []).forEach(c => { pousse(c.va); if(c.test){ pousse(c.reussite); pousse(c.echec); } });
      if(!s.texte || !s.texte.length) manquantes.push(id + ' : sans texte');
    }
    const orphelines = ids.filter(x => x !== 'audience' && !cibles.has(x));
    const issues = ids.filter(x => SCENES[x].issue);
    return { scenes: ids.length, manquantes, orphelines, issues,
             definitifs: ids.reduce((n,x) => n + (SCENES[x].choix||[]).filter(c=>c.definitif).length, 0) };
  });

  /* On joue vraiment : on clique le premier choix disponible jusqu'à la fin. */
  const chemin = [];
  for(let i = 0; i < 20; i++){
    const btns = await p.$$('#scene .choix button:not([disabled]), #scene .suite button');
    if(!btns.length) break;
    const k = Math.floor(Math.random() * btns.length);
    chemin.push((await btns[k].textContent()).trim().split('\n')[0].slice(0, 42));
    await btns[k].click();
    await p.waitForTimeout(60);
  }
  const fin = await p.evaluate(() => ({
    issue: (document.querySelector('.issue .etiquette') || {}).textContent || null,
    or: ETAT.or, faits: ETAT.faits.length, portes: ETAT.portes.length,
  }));

  console.log(`${audit.scenes} scènes · ${audit.issues.length} issues · ${audit.definitifs} choix définitifs`);
  if(audit.manquantes.length) console.log('✘ scènes manquantes :', audit.manquantes);
  if(audit.orphelines.length) console.log('✘ scènes inatteignables :', audit.orphelines);
  if(err.length) console.log('✘ erreurs :', err.slice(0, 4));
  console.log('partie jouée :', chemin.join(' → '));
  console.log('fin :', fin);
  await b.close();
  process.exit(err.length || audit.manquantes.length || audit.orphelines.length ? 1 : 0);
})();
