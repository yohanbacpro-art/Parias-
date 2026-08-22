/* PARIAS — Épreuve de la réputation, de l'économie et de la deuxième vague
 *
 *   node tools/build-standalone.js && node tools/smoke-monde.js
 */
const { chromium } = require('playwright-core');
const path = require('path');
const url = 'file://' + path.join(__dirname, '..', 'dist', 'parias.html');
let echecs = 0;
const verifie = (n, ok, d) => { if(ok) console.log('  ✔', n);
  else { echecs++; console.log('  ✘', n, d !== undefined ? '→ '+JSON.stringify(d).slice(0,220) : ''); } };

(async () => {
  const browser = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('pageerror', e => { echecs++; console.log('  ✘ erreur de page :', e.message); });
  await page.goto(url);
  await page.click('#btnStart');
  for(let i=0;i<6;i++){ if(!await page.isVisible('#prologueNextBtn')) break; await page.click('#prologueNextBtn'); await page.waitForTimeout(20); }

  /* ---------- La réputation ---------- */
  console.log('\nLa réputation change ce qu\'on vous vend');
  const rep = await page.evaluate(() => {
    const kd = LOCATIONS.find(l => l.id === 'LOC_008');
    const etat = v => {
      hero.reputations.nains = v;
      openLieu(kd); renderEquipement();
      return { rang: rangReputation('nains').nom,
               prix: prixPour(itemById('armure_maille_naine'), 'nains'),
               articles: document.querySelectorAll('#shopList .ii-nom').length,
               hostile: document.getElementById('lieuHostile').style.display !== 'none' };
    };
    return { neutre: etat(0), estime: etat(40), allie: etat(85), honni: etat(-40), ennemi: etat(-80) };
  });
  verifie('à zéro, on est un client ordinaire', rep.neutre.rang === 'Sans histoire' && rep.neutre.prix === 290, rep.neutre);
  verifie("l'estime baisse le prix et sort du stock",
    rep.estime.prix < rep.neutre.prix && rep.estime.articles > rep.neutre.articles, rep);
  verifie('être des leurs ouvre encore plus', rep.allie.articles > rep.estime.articles, rep.allie);
  verifie('le mépris se paie', rep.honni.prix > rep.neutre.prix, rep.honni);
  verifie("l'hostilité ferme la boutique", rep.ennemi.articles === 0 && rep.ennemi.prix === null, rep.ennemi);
  verifie("et elle est annoncée en arrivant", rep.ennemi.hostile, rep.ennemi);

  const chr = await page.evaluate(() => {
    hero.reputations.nains = 0; hero.chroniques = [];
    ajusterReputation('nains', 45);
    const monte = hero.chroniques.length;
    ajusterReputation('nains', -80);
    return { monte, descend: hero.chroniques.length - monte,
             texte: hero.chroniques.map(c => c.texte) };
  });
  verifie('franchir un rang est annoncé dans les deux sens', chr.monte === 1 && chr.descend >= 1, chr);
  console.log('    ' + chr.texte.join('\n    '));

  const bornes = await page.evaluate(() => {
    hero.reputations.nains = 90; ajusterReputation('nains', 50);
    const haut = hero.reputations.nains;
    hero.reputations.nains = -90; ajusterReputation('nains', -50);
    return { haut, bas: hero.reputations.nains };
  });
  verifie('la réputation reste bornée à ±100', bornes.haut === 100 && bornes.bas === -100, bornes);

  /* ---------- L'économie ---------- */
  console.log("\nL'équipement : chaque peuple le sien, et l'unique ne s'achète pas");
  const eco = await page.evaluate(() => {
    const vendus = new Set();
    const parLieu = {};
    LOCATIONS.forEach(l => {
      hero.reputations = { ...REPUTATION_DEPART };
      openLieu(l); renderEquipement();
      const noms = [...document.querySelectorAll('#shopList .ii-nom')].map(n => n.textContent.split(' — ')[0]);
      noms.forEach(n => vendus.add(n));
      parLieu[l.id] = noms.length;
    });
    const uniques = ITEM_POOL.filter(i => i.unique).map(i => i.nom);
    return { vendus:[...vendus], uniqueEnVente: uniques.filter(n => vendus.has(n)),
             etals: parLieu, nbUniques: uniques.length };
  });
  verifie('aucune pièce unique n\'est en vente', eco.uniqueEnVente.length === 0, eco.uniqueEnVente);
  verifie(`les ${eco.nbUniques} pièces uniques restent à gagner`, eco.nbUniques >= 6);
  verifie('les étals diffèrent selon le lieu', new Set(Object.values(eco.etals)).size > 1, eco.etals);
  const sansEtal = Object.entries(eco.etals).filter(([, n]) => n === 0).map(([id]) => id);
  verifie('Peaux-Vertes et Hommes-Bêtes ne tiennent pas boutique',
    sansEtal.includes('LOC_009') && sansEtal.includes('LOC_010'), sansEtal);

  const butin = await page.evaluate(() => {
    hero.inventaire = [];
    let pris = 0;
    for(let i=0;i<200;i++) if(butinDeBataille('nains')) pris++;
    const ids = hero.inventaire.map(e => e.itemId);
    return { pris, horsTable: ids.filter(id => !BUTIN_PAR_PEUPLE.nains.includes(id)) };
  });
  verifie('le butin tombe parfois, pas toujours', butin.pris > 40 && butin.pris < 180, butin.pris);
  verifie('il ne sort jamais de la table du peuple battu', butin.horsTable.length === 0, butin.horsTable);

  const loot = await page.evaluate(() => {
    hero.inventaire = [];
    for(let i=0;i<300;i++) grantLoot();
    const rangs = hero.inventaire.map(e => itemById(e.itemId));
    return { unique: rangs.filter(i => i.unique).length, haut: rangs.filter(i => i.rang > 1).length };
  });
  verifie('un butin de contrat ne donne jamais de pièce unique ni de maître',
    loot.unique === 0 && loot.haut === 0, loot);

  /* ---------- La deuxième vague ---------- */
  console.log("\nLa deuxième vague : plus personne ne retombe sur le remplissage");
  const vague = await page.evaluate(() => {
    const res = {};
    LOCATIONS.forEach(l => {
      hero.evenementsVus = []; hero.flags = [];
      const tires = new Set();
      for(let i=0;i<40;i++){
        const ev = pickWrittenEvent(l);
        if(!ev) break;
        tires.add(ev.id);
        hero.evenementsVus.push(ev.id);
      }
      res[l.id] = tires.size;
    });
    return res;
  });
  const mini = Math.min(...Object.values(vague));
  verifie('chaque lieu enchaîne au moins 4 récits écrits avant de se répéter', mini >= 4,
    Object.entries(vague).filter(([, n]) => n < 4));
  console.log('    récits écrits par lieu : ' + Object.values(vague).join(' '));

  const nouveaux = await page.evaluate(() => EVENTS_WRITTEN_2.length);
  verifie('la deuxième vague compte 26 récits', nouveaux === 26, nouveaux);

  /* Les nouveaux récits se jouent vraiment, choix compris. */
  console.log('\nChaque nouveau récit se déroule jusqu\'au bout');
  const parcours = await page.evaluate(async () => {
    const echecs = [];
    for(const ev of EVENTS_WRITTEN_2){
      for(let branche = 0; branche < 4; branche++){
        hero.flags = []; hero.or = 5000; hero.renom = 60; hero.pv = hero.pvMax;
        hero.reputations = { humains:60, parias:60, khesh:60, elfes:60,
                             elfes_noirs:60, nains:60, peaux_vertes:60, hommes_betes:60 };
        try {
          openWrittenEvent(ev, LOCATIONS.find(l => l.id === (ev.lieux||['LOC_011'])[0]));
          for(let pas = 0; pas < 10; pas++){
            if(document.getElementById('scFinBtn')) break;
            if(document.getElementById('scCombatBtn')) break;   // les combats sont éprouvés ailleurs
            const b = [...document.querySelectorAll('#scChoix button:not(.locked)')];
            if(!b.length){ echecs.push(ev.id + ' : scène sans issue'); break; }
            b[Math.min(branche, b.length-1)].click();
          }
        } catch(e){ echecs.push(ev.id + ' : ' + e.message); }
        closeEventModal();
      }
    }
    return echecs;
  });
  verifie('aucune branche ne casse ni ne bloque', parcours.length === 0, parcours.slice(0, 6));

  await browser.close();
  console.log(echecs ? `\n${echecs} échec(s).` : '\nLe monde réagit, les étals diffèrent, et les lieux ont de quoi raconter.');
  process.exit(echecs ? 1 : 0);
})();
