/* PARIAS — Épreuve des liens sur quatre axes
 *
 *   node tools/build-standalone.js && node tools/smoke-liens.js
 *
 * Le document fondateur : *« Jamais une barre à remplir. Séparer au minimum
 * relation / confiance / attirance / compatibilité politique. Elles peuvent
 * aimer Yohan et être en désaccord avec lui, refuser, rompre. »*
 *
 * On vérifie donc que les axes bougent séparément, qu'un palier en exige
 * plusieurs à la fois, qu'un refus porte une raison écrite, que la politique se
 * lit dans le monde et non dans un compteur, et qu'une promesse rompue laisse
 * une trace.
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
  for(let i=0;i<6;i++){ if(!await page.isVisible('#prologueNextBtn')) break; await page.click('#prologueNextBtn'); await page.waitForTimeout(20); }

  /* ---------- 1. Quatre axes, et ils ne montent pas ensemble ---------- */
  console.log('\nQuatre axes séparés, pas une barre');
  const axes = await page.evaluate(() => {
    hero.liens = {}; hero.flags = []; heroLiens();
    const lire = () => ['relation','confiance','attirance','politique']
      .reduce((o,a) => (o[a] = axeDe('alycia', a), o), {});
    const depart = lire();
    ajusterLien('alycia', { relation:3, attirance:5, confiance:-2 });
    return { depart, apres: lire(), profils: Object.keys(LIENS_PROFILS) };
  });
  console.log('    ' + JSON.stringify(axes.apres));
  verifie('les quatre axes existent', Object.keys(axes.depart).length === 4, axes.depart);
  verifie('une scène peut resserrer ce qu\'on ressent en abîmant ce qu\'on croit',
    axes.apres.attirance > 0 && axes.apres.confiance < 0, axes.apres);
  verifie('ils ne bougent pas du même pas',
    axes.apres.relation !== axes.apres.attirance, axes.apres);

  /* ---------- 2. La politique se lit dans le monde ---------- */
  console.log('\nLa compatibilité politique n\'est pas un compteur');
  const pol = await page.evaluate(() => {
    hero.liens = {}; hero.flags = []; hero.crises = {}; heroLiens(); syncTensions();
    hero.reputations.parias = 0;
    const neutre = axeDe('alycia', 'politique');
    hero.reputations.parias = 90;
    const loyal = axeDe('alycia', 'politique');
    hero.flags.push('genealogies_vendues');
    const traitre = axeDe('alycia', 'politique');
    hero.reputations.elfes = 70;
    const ala = axeDe('alarielle', 'politique');
    hero.crises.ELFES.palier = 4;
    return { neutre, loyal, traitre, alaPaix: ala, alaGuerre: axeDe('alarielle','politique') };
  });
  console.log(`    Alycia — indifférent ${pol.neutre} · loyal ${pol.loyal} · après avoir vendu la liste ${pol.traitre}`);
  verifie('servir les Parias rapproche Alycia', pol.loyal > pol.neutre, pol);
  verifie('les vendre la met contre vous', pol.traitre < pol.neutre, pol);
  verifie('la guerre de sa cour éloigne Alarielle', pol.alaGuerre < pol.alaPaix, pol);

  /* ---------- 3. Un palier exige plusieurs axes à la fois ---------- */
  console.log('\nUne jauge pleine ne suffit jamais');
  const paliers = await page.evaluate(() => {
    hero.liens = {}; hero.flags = []; hero.crises = {}; heroLiens(); syncTensions();
    hero.reputations.parias = 60;
    ajusterLien('alycia', { attirance:12 });          // tout le désir du monde
    const desirSeul = { palier: palierAtteint('alycia').id,
                        refus: elleAccepterait('alycia', 'amants') };
    ajusterLien('alycia', { relation:8, confiance:8 });
    const complet = { palier: palierAtteint('alycia').id,
                      accord: elleAccepterait('alycia', 'amants') };
    return { desirSeul, complet, bloque: cequiBloque('alycia') };
  });
  verifie('l\'attirance seule ne fait pas des amants',
    paliers.desirSeul.palier === 'inconnu' && !paliers.desirSeul.refus.oui, paliers.desirSeul);
  verifie('et le refus dit lequel des quatre manque',
    typeof paliers.desirSeul.refus.parce === 'string' && paliers.desirSeul.refus.parce.length > 15,
    paliers.desirSeul.refus.parce);
  verifie('les trois réunis, elle accepte', paliers.complet.accord.oui, paliers.complet);

  /* ---------- 4. Elle peut aimer et être en désaccord ---------- */
  console.log('\nElle peut vous aimer et refuser de vous suivre');
  const desaccord = await page.evaluate(() => {
    hero.liens = {}; hero.flags = ['genealogies_vendues']; hero.crises = {};
    heroLiens(); syncTensions(); hero.reputations.parias = 20;
    ajusterLien('alycia', { relation:11, confiance:10, attirance:11 });
    return { palier: palierAtteint('alycia').id,
             amants: elleAccepterait('alycia', 'amants').oui,
             mariage: elleAccepterait('alycia', 'mariage'),
             politique: axeDe('alycia', 'politique') };
  });
  verifie('elle vous aime', desaccord.amants, desaccord);
  verifie('et elle ne vous épouse pas pour autant', !desaccord.mariage.oui, desaccord.mariage);
  verifie('la raison du refus est politique, et elle est dite',
    /Parias|défend/.test(desaccord.mariage.parce), desaccord.mariage.parce);

  /* ---------- 5. La trahison se retient toute seule ---------- */
  console.log('\nCe qu\'on lui a fait, elle le retient sans qu\'une scène l\'écrive');
  const grief = await page.evaluate(() => {
    hero.liens = {}; hero.flags = []; heroLiens();
    ajusterLien('alycia', { confiance:8 });
    const avant = axeDe('alycia', 'confiance');
    hero.flags.push('genealogies_vendues');
    relireTrahisons(); relireTrahisons();       // deux fois : ça ne doit compter qu'une
    const l = lienDe('alycia');
    return { avant, apres: axeDe('alycia','confiance'), griefs: l.griefs.map(g => g.quoi) };
  });
  verifie('la confiance se casse', grief.apres < grief.avant, grief);
  verifie('le grief est écrit en toutes lettres',
    grief.griefs.length === 1 && grief.griefs[0].length > 20, grief.griefs);

  /* ---------- 6. Deux en même temps : la promesse se retient ---------- */
  console.log('\nDeux liens à la fois : ce qui gêne, c\'est la promesse');
  const double = await page.evaluate(() => {
    hero.liens = {}; hero.flags = []; hero.crises = {}; heroLiens(); syncTensions();
    hero.reputations.parias = 70; hero.reputations.elfes = 70;
    ajusterLien('alycia',    { relation:8, confiance:8, attirance:9 });
    ajusterLien('alarielle', { relation:8, confiance:8, attirance:9 });
    liensTick();
    const sansPromesse = { simultanes: liensSimultanes(), rompue: promesseRompue(),
                           flag: hasFlag('lien_clarification_due') };
    ajusterLien('alycia', { promesse:'exclusivite' });
    liensTick();
    return { sansPromesse, avec: { rompue: promesseRompue(), flag: hasFlag('lien_clarification_due') },
             scene: EVENTS_ROMANCE.some(e => e.id === 'LI_CLARIFICATION'
                     && conditionsRemplies(e.requis)) };
  });
  verifie('deux liens en même temps ne déclenchent aucune rivalité automatique',
    double.sansPromesse.simultanes.length === 2 && !double.sansPromesse.flag, double.sansPromesse);
  verifie('mais une promesse d\'exclusivité démentie, si',
    !!double.avec.rompue && double.avec.flag, double.avec);
  verifie('et la scène de clarification devient disponible', double.scene, double.scene);

  /* ---------- 7. L'ancienne lecture reste juste ---------- */
  console.log('\nTout ce qui lisait « affinité » lit encore');
  const compat = await page.evaluate(() => {
    hero.liens = {}; hero.affinites = { ...AFFINITES_DEPART }; heroLiens();
    ajusterAffinite('alycia', 3);          // l'effet ancien, tel qu'il existe dans le contenu
    const l = lienDe('alycia');
    return { axes: { relation:l.relation, attirance:l.attirance, confiance:l.confiance },
             court: affiniteAvec('alycia'),
             migration: (()=>{ const m = migrer({ version:10, hero:{ niveau:5, pvMax:60,
                 trame:{chapitre:0,points:0}, affinites:{ alycia:6, alarielle:2, eleonore:0 } } });
                 return { version:m.version, alycia:m.hero.liens.alycia }; })() };
  });
  verifie('un effet `affinite` ancien nourrit les axes',
    compat.axes.relation === 3 && compat.axes.attirance === 3 && compat.axes.confiance === 0, compat.axes);
  verifie('la lecture courte reste disponible', compat.court > 0, compat.court);
  verifie('une partie d\'avant les axes se relit',
    compat.migration.alycia.relation === 6 && compat.migration.alycia.confiance === 0,
    compat.migration);

  /* ---------- 8. L'écran montre des phrases, pas des nombres ---------- */
  console.log('\nL\'écran ne montre aucun nombre');
  const ecran = await page.evaluate(() => {
    hero.liens = {}; hero.flags = ['genealogies_vendues']; hero.crises = {};
    heroLiens(); syncTensions();
    ajusterLien('alycia', { relation:6, confiance:5, attirance:9 });
    relireTrahisons(); liensTick(); renderLiens();
    const g = document.getElementById('liensGrid');
    return { cartes: g.querySelectorAll('.lien').length,
             axes: [...g.querySelectorAll('.lien-axes li')].map(e => e.textContent.trim()),
             bloque: (g.querySelector('.lien-bloque') || {}).textContent || '',
             griefs: [...g.querySelectorAll('.lien-griefs li')].map(e => e.textContent.trim()),
             chiffres: /\b-?\d+\s*\/\s*\d+|\b\d+\s*(pts?|points)\b/i.test(g.textContent) };
  });
  ecran.axes.slice(0,4).forEach(a => console.log('    ' + a));
  verifie('les quatre axes sont dits en toutes lettres', ecran.axes.length >= 4, ecran.axes.length);
  verifie('aucun n\'est chiffré', !ecran.chiffres, ecran.chiffres);
  verifie('ce qui bloque est expliqué', ecran.bloque.length > 20, ecran.bloque);
  verifie('ce qu\'elle n\'oublie pas est affiché', ecran.griefs.length >= 1, ecran.griefs);

  await browser.close();
  console.log(echecs ? `\n${echecs} échec(s).` : '\nQuatre axes séparés, des refus motivés, et des promesses qui se retiennent.');
  process.exit(echecs ? 1 : 0);
})();
