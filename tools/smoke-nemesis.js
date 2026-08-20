/* PARIAS — Épreuve de l'arc du Livré
 *
 *   node tools/build-standalone.js && node tools/smoke-nemesis.js
 *
 * Vérifie que le nemesis apparaît quand il doit, qu'il s'intercale entre les
 * jalons de la trame sans les remplacer, que le Sillage rend réellement le duel
 * plus dur quand Yohan a brûlé l'Onde, et que les quatre issues de l'arc
 * s'écrivent différemment dans l'épilogue.
 */
const { chromium } = require('playwright-core');
const path = require('path');

const url = 'file://' + path.join(__dirname, '..', 'dist', 'parias.html');
let echecs = 0;
const verifie = (nom, ok, detail) => {
  if(ok) console.log('  ✔', nom);
  else { echecs++; console.log('  ✘', nom, detail !== undefined ? '→ '+JSON.stringify(detail).slice(0,240) : ''); }
};

async function nouvellePartie(browser){
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  page.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });
  await page.goto(url);
  await page.click('#btnStart');
  for(let i=0;i<6;i++){ if(!await page.isVisible('#prologueNextBtn')) break; await page.click('#prologueNextBtn'); await page.waitForTimeout(20); }
  return { ctx, page };
}

/* Déroule la modale ouverte en cliquant le choix demandé (index ou libellé). */
async function derouler(page, choix){
  for(let garde=0; garde<14; garde++){
    if(!await page.isVisible('#eventModal')) break;
    if(await page.isVisible('#scFinBtn')){ await page.click('#scFinBtn'); await page.waitForTimeout(60); continue; }
    if(await page.isVisible('#scChoix')){
      const b = await page.$$('#scChoix button:not(.locked)');
      if(!b.length){ await page.evaluate(()=>closeEventModal()); break; }
      let i = 0;
      if(typeof choix === 'string'){
        const labels = await Promise.all(b.map(x => x.textContent()));
        const j = labels.findIndex(l => l.includes(choix));
        i = j >= 0 ? j : 0;
      } else if(typeof choix === 'number') i = Math.min(choix, b.length-1);
      await b[i].click(); await page.waitForTimeout(60);
      continue;
    }
    await page.evaluate(()=>closeEventModal());
    break;
  }
}

(async () => {
  const browser = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox'] });

  /* ---------- 1. Il n'arrive pas avant son heure, et pas à la place de la trame ---------- */
  console.log("\nIl arrive à son heure, et jamais à la place de la trame");
  let { ctx, page } = await nouvellePartie(browser);
  const ordre = await page.evaluate(() => {
    const vu = [];
    hero.trame.points = 0;
    for(let t=0; t<40 && vu.length < 8; t++){
      hero.trame.points = Math.min(200, hero.trame.points + 10);
      const ev = trameDisponible();
      if(!ev) continue;
      // On simule le jalon joué en posant son marqueur, sans jouer la scène.
      (ev.requis.sansFlags || []).forEach(f => hero.flags.push(f));
      vu.push({ id: ev.id, sang: hero.trame.points });
    }
    return vu;
  });
  console.log('    ' + ordre.map(o => `${o.id}@${o.sang}`).join('  '));
  const premierNe = ordre.findIndex(o => o.id.startsWith('NE_'));
  verifie("le premier jalon reste celui de la trame", ordre[0].id === 'TR_01_COURRIER', ordre[0]);
  verifie("le Livré n'ouvre pas la partie", premierNe > 0, premierNe);
  verifie("il s'intercale entre des jalons de trame",
    ordre.some((o,i) => o.id.startsWith('NE_') && i>0 && ordre[i-1].id.startsWith('TR_')), ordre.map(o=>o.id));
  verifie("NE_01 exige d'avoir lu le courrier", await page.evaluate(() =>
    (() => { const h = hero.flags; hero.flags = []; const ok = !conditionsRemplies(EVENTS_NEMESIS[0].requis); hero.flags = h; return ok; })()));
  await ctx.close();

  /* ---------- 2. Les trois lettres se laissent élucider ---------- */
  console.log("\nCe que veut dire L.F.A.");
  ({ ctx, page } = await nouvellePartie(browser));
  const lettres = await page.evaluate(async () => {
    hero.flags.push('tr_01_fait','lfa_connu','lfa_registre');
    hero.niveau = 14; hero.vol = 22; hero.precision = 20; hero.trame.points = 100;
    openWrittenEvent(EVENTS_NEMESIS.find(e => e.id === 'NE_03_SANS_NOM'), null);
    return document.getElementById('eventModalBox').textContent;
  });
  verifie("la rencontre s'ouvre sur le nemesis", /dos au mur|L\.F\.A|dix-neuf/.test(lettres), lettres.slice(0,120));
  await derouler(page, 'Lui demander son nom');
  const su = await page.evaluate(() => ({
    stigmate: hasFlag('lfa_stigmate'), vu: hasFlag('lfa_vu'),
    texte: document.body.textContent.includes('LIVRÉ') || hasFlag('lfa_stigmate'),
  }));
  verifie("le sens du tampon est acquis", su.stigmate, su);
  verifie("la rencontre est marquée jouée", su.vu);
  await ctx.close();

  /* ---------- 3. Le Sillage : brûler l'Onde nourrit l'adversaire ---------- */
  console.log("\nLe Sillage — la Fatigue de Yohan devient sa force");
  ({ ctx, page } = await nouvellePartie(browser));
  const sillage = await page.evaluate(() => {
    hero.niveau = 16; hero.pvMax = 120; hero.pv = 120;
    const mesure = fat => {
      hero.fat = fat;
      startCombat([{champion:'le_livre'}], null, {sansMort:true});
      const f = combat.foes[0];
      return { fat, degre: degreSillage().nom,
               prec: bonusSillage(f, 'precision'), deg: bonusSillage(f, 'degats') };
    };
    return [0, 50, 80, 100].map(mesure);
  });
  sillage.forEach(m => console.log(`    Fatigue ${String(m.fat).padStart(3)} → ${m.degre.padEnd(8)} +${m.prec} touche, +${m.deg} dégâts`));
  verifie("à froid, il ne vaut que ses statistiques", sillage[0].prec === 0 && sillage[0].deg === 0, sillage[0]);
  verifie("la Fatigue le renforce progressivement",
    sillage[1].deg > 0 && sillage[2].deg > sillage[1].deg && sillage[3].deg > sillage[2].deg, sillage);
  verifie("à la Rupture il atteint son bonus entier", sillage[3].deg === 12 && sillage[3].prec === 5, sillage[3]);
  verifie("les degrés reprennent les mots du registre",
    sillage.map(m=>m.degre).join(',') === 'calme,tendu,critique,rompu', sillage.map(m=>m.degre));
  const affiche = await page.evaluate(() => {
    hero.fat = 95; startCombat([{champion:'le_livre'}], null, {sansMort:true});
    return document.querySelector('#foeList .f-tag.sillage')?.textContent || '';
  });
  verifie("la règle est affichée au joueur", /Sillage/.test(affiche) && /rompu|critique/.test(affiche), affiche);

  /* Le duel est-il réellement plus dur à chaud ? On le mesure. */
  /* Le duel doit se gagner quand on arrive reposé, et se perdre souvent quand on
   * arrive vidé. On le mesure comme un joueur le joue : compagnes présentes,
   * pouvoirs tant que la Fatigue le permet, armes ensuite. */
  const duels = await page.evaluate(() => {
    hero.niveau = 16; hero.pvMax = 107; hero.precision = 9; hero.vol = 16;
    Object.values(TREE).forEach(br => br.nodes.slice(0, 3).forEach(n => hero.unlocked.add(n.id)));
    hero.compagnons = [COMPANIONS_POOL.alycia, COMPANIONS_POOL.alarielle];
    const simuler = (fat, n) => {
      let gagnes = 0;
      for(let i = 0; i < n; i++){
        hero.pv = hero.pvMax; hero.fat = fat;
        startCombat([{champion:'le_livre'}], null, {sansMort:true});
        for(let t = 0; t < 60 && !combat.over; t++){
          for(let k = 0; k < combat.party.length && !combat.over; k++){
            setActor(k);
            const a = combat.party[k];
            if(!a.vivant) continue;
            let garde = 0;
            while(a.pa > 0 && !combat.over && garde++ < 8){
              const dispo = (a.pouvoirs || []).map(powerById)
                .filter(pw => pw && !pw.passive && !pw.soinAllie && !pw.apaise && !pw.garde && pw.coutPA <= a.pa);
              const best = dispo.sort((x, y) => (y.degats || 0) - (x.degats || 0))[0];
              if(best && a.fat < 65) actorPower(best.id);
              else if(a.estYohan && a.pa >= 2) actorAttack('epee_lourde');
              else actorAttack(a.estYohan ? 'epee_legere' : 'simple');
            }
          }
          if(!combat.over) foesTurn();
        }
        if(lastCombatVictory) gagnes++;
      }
      return Math.round(100 * gagnes / n);
    };
    return { froid: simuler(0, 30), tendu: simuler(70, 30), rompu: simuler(95, 30) };
  });
  console.log(`    victoires — reposé ${duels.froid}% · tendu ${duels.tendu}% · à la Rupture ${duels.rompu}%`);
  verifie("le duel se gagne quand on arrive reposé", duels.froid >= 80, duels);
  verifie("il devient un vrai risque à la Rupture", duels.rompu <= 55, duels);
  verifie("la Fatigue fait la différence", duels.froid - duels.rompu >= 25, duels);
  await ctx.close();

  /* ---------- 4. Les issues s'écrivent différemment dans l'épilogue ---------- */
  console.log("\nQuatre fins pour un homme sans nom");
  ({ ctx, page } = await nouvellePartie(browser));
  const fins = await page.evaluate(() => {
    const base = ['tr_01_fait','lfa_connu','lfa_registre','lfa_vu','lfa_coup','ne_05_fait'];
    return ['nemesis_nomme','nemesis_pacte','nemesis_brise','nemesis_tue','nemesis_libre'].map(f => {
      hero.flags = base.concat(f);
      const v = construireEpilogue(hero).nemesis;
      return { f, texte: v ? v.texte.replace(/<[^>]+>/g,'').trim().slice(0, 60) : null };
    });
  });
  fins.forEach(x => console.log(`    ${x.f.padEnd(15)} ${x.texte}…`));
  verifie("chaque issue a son verdict", fins.every(x => x.texte));
  verifie("les cinq verdicts sont distincts", new Set(fins.map(x=>x.texte)).size === 5);
  const sansRien = await page.evaluate(() => {
    hero.flags = ['tr_01_fait'];
    return construireEpilogue(hero).nemesis;
  });
  verifie("une partie qui l'ignore n'a pas de verdict du Livré", sansRien === null, sansRien);
  const legs = await page.evaluate(() => {
    hero.flags = ['tr_01_fait','lfa_connu','lfa_registre','lfa_copie'];
    return construireEpilogue(hero).legs.map(l => l.id);
  });
  verifie("comprendre le sillage se transmet", legs.includes('sillage_su'), legs);
  await ctx.close();

  await browser.close();
  console.log(echecs ? `\n${echecs} échec(s).` : "\nLe Livré : il arrive à son heure, il coûte cher, et il finit autrement selon ce qu'on lui a fait.");
  process.exit(echecs ? 1 : 0);
})();
