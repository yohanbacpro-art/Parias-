/* Épreuve d'acceptation de l'Acte I.
 *
 * Elle ne vérifie pas que le texte est bon — personne ne sait faire ça. Elle
 * vérifie les quatre choses qui cassent un jeu à choix :
 *
 *   1. aucune scène référencée n'est absente ;
 *   2. aucune scène écrite n'est inatteignable ;
 *   3. deux cents parties aléatoires arrivent toutes à une issue ;
 *   4. l'écran ne montre jamais une branche qu'on n'a pas prise.
 *
 * Lancer :  node tools/check-acte1.js
 */

const path = require('path');
const { chromium } = require('playwright-core');

const RACINE = path.resolve(__dirname, '..');
const PAGE   = 'file://' + path.join(RACINE, 'proto/acte1/index.html');
const PARTIES = Number(process.env.PARTIES || 600);

let echecs = 0;
const dit = (ok, quoi, note) => {
  if(!ok) echecs++;
  console.log(`${ok ? '  ok ' : ' ÉCHEC'} ${quoi}${note ? ' — ' + note : ''}`);
};

(async () => {
  const nav = await chromium.launch({
    executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium',
  });
  const page = await nav.newPage();

  const erreurs = [];
  page.on('pageerror', e => erreurs.push(String(e)));
  const hors = t => /fonts\.googleapis|fonts\.gstatic|Failed to load resource|ERR_CONNECTION|ERR_NAME_NOT_RESOLVED/.test(t);
  page.on('console', m => { if(m.type() === 'error' && !hors(m.text())) erreurs.push(m.text()); });

  await page.goto(PAGE);
  await page.waitForFunction(() => typeof SCENES === 'object' && !!document.querySelector('#scene h1'));

  console.log('\nPARIAS — Acte I\n');

  /* ── 1 · le graphe ─────────────────────────────────────────────────────── */
  /* Le tableau des mercenaires se compose à l'ouverture : il faut le faire
   * composer avant de lire le graphe, sinon ses six entrées n'existent pas. */
  const graphe = await page.evaluate(() => {
    rendreHub();
    const cibles = s => {
      const out = [];
      if(s.suite) out.push(s.suite);
      for(const c of (s.choix || [])){
        if(c.va) out.push(c.va);
        if(c.degres) out.push(...Object.values(c.degres));
      }
      return out;
    };
    const def = Object.keys(SCENES);
    const ref = {};
    for(const [id, s] of Object.entries(SCENES)) ref[id] = cibles(s);
    /* Les scènes que les aiguillages composent : le banc et le couloir. */
    const parBanc = ACCUSES.map(x => ['as_banc_' + x.id, 'as_parler_' + x.id]).flat();
    /* L'Acte II ne se navigue pas par `va:` mais par la carte : chaque arc
     * s'inscrit au registre des offres et c'est là qu'est son entrée. */
    const parOffre = OFFRES.map(o => o.va);
    const parNeuf = Object.keys(NEUF).map(id => 'acte_' + id);
    /* Les étapes d'Alycia ne se référencent nulle part : c'est elle qui
     * vient, et l'aiguillage choisit laquelle. */
    const parBeat = BEATS_ALYCIA.map(b => [b.id, b.rate]).flat().filter(Boolean)
      .concat(ENTREES2)
      /* Les chasses et le duel ne se référencent nulle part : c'est la file
       * de l'entre-saisons qui va les chercher quand le monde est prêt. */
      .concat(RENCONTRES);
    return { def, ref, dyn:Object.keys(DYN), echos:Object.keys(ECHOS),
             parBanc, parOffre, parNeuf, parBeat };
  });

  const SCENES_DYN = graphe.dyn;
  const ECHOS_IDS = Object.fromEntries(graphe.echos.map(id => [id, 1]));
  const definies = new Set(graphe.def);
  const referencees = new Set();
  const absentes = [];
  for(const [id, cibles] of Object.entries(graphe.ref))
    for(const c of cibles){
      referencees.add(c);
      if(!definies.has(c)) absentes.push(`${id} → ${c}`);
    }

  dit(absentes.length === 0, `${definies.size} scènes, aucune référence morte`,
      absentes.slice(0, 6).join(' · '));

  /* Une scène orpheline est une scène qu'on a écrite pour rien. Les entrées
   * du jeu et les cibles d'aiguillage dynamique n'en sont pas. */
  const entrees = new Set(['prologue', 'hub', 'bascule', 'hub_retour', 'acte1_fin',
                           'wy_nuit', 'wy_route', 'wy_mort', 'wy_traine',
                           'wy_fin_route', 'wy_fin_vivante', 'wy_fin_perdu',
                           'convalescence', 'palier_nomme', 'palier_karlsberg',
                           'as_arrivee', 'as_rond_2', 'as_rond_3', 'as_forfait', 'as_temps_1', 'as_temps_2',
                           'as_fin_nom', 'as_fin_yohan', 'as_fin_anonyme', 'as_fin_silence',
                           'as_fin_onde', 'as_fin_perdu',
                           'karls_lettre', 'karls_pierre', 'karls_gamin', 'karls_rien',
                           'ar_compte_scene', 'ar_effondrement',
                           'a2_rien', 'a2_crise', 'a2_acte', 'a2_bascule_fin', 'a2_epilogue']
                          .concat(graphe.dyn)
                          .concat(graphe.parOffre)
                          .concat(graphe.parNeuf)
                          .concat(graphe.parBeat)
                          .concat(Object.keys(ECHOS_IDS).map(id => 'echo_' + id))
                          .concat(graphe.parBanc));
  const orphelines = graphe.def.filter(id => !referencees.has(id) && !entrees.has(id));
  dit(orphelines.length === 0, "aucune scène écrite n'est inatteignable", orphelines.join(' · '));

  /* ── 2 · les parties ───────────────────────────────────────────────────── */
  const bilan = await page.evaluate(async (n) => {
    const vues = new Set();
    const issues = {};
    let bloquees = 0, tropLong = 0;

    /* Deux tiers des parties partent du prologue — c'est le vrai chemin. Le
     * tiers restant entre directement dans l'affaire, sinon l'arc long ne
     * serait jamais parcouru : cinq des six contrats ne sont pas écrits. */
    for(let p = 0; p < n; p++){
      localStorage.clear();
      neuf();
      ETAT.gore = ['sobre','intense','extreme'][p % 3];
      if(p % 3 === 0){ aller('prologue'); }
      else if(p % 3 === 1){ ETAT.acte.arcsFaits.push('C01'); aller('wy_audience'); }
      else { ETAT.acte.arcsFaits.push('C01','C02','C03'); aller('a2_ouverture'); }

      for(let pas = 0; pas < 900; pas++){
        vues.add(ETAT.scene);
        const s = SCENES[ETAT.scene];
        /* Un aiguillage qui se compose lui-même garde son `dyn` : il est
         * branché, il a des choix, ce n'est pas une impasse. Une scène
         * `dyn` sans aiguillage, si. */
        if(s.dyn && !DYN[ETAT.scene]) { bloquees++; break; }
        if(s.issue){
          issues[s.issue] = (issues[s.issue] || 0) + 1;
          if(!s.suite) break;                 // une fin de partie s'arrête là
          aller(s.suite); continue;           // une fin d'affaire rend la main
        }

        const choix = (s.choix || []).filter(c => !c.si || c.si())
                                     .filter(c => !(c.requisOr && ETAT.or < c.requisOr));
        if(choix.length){
          jouer(choix[Math.floor(Math.random() * choix.length)]);
        }else if(s.suite){
          aller(s.suite);
        }else{
          bloquees++; break;
        }
        if(pas === 899) tropLong++;
      }
    }
    return { vues:[...vues], issues, bloquees, tropLong, total:n };
  }, PARTIES);

  dit(bilan.bloquees === 0, `${PARTIES} parties aléatoires, aucune impasse`,
      bilan.bloquees ? `${bilan.bloquees} bloquées` : '');
  dit(bilan.tropLong === 0, "aucune boucle infinie",
      bilan.tropLong ? `${bilan.tropLong} > 400 pas` : '');

  const somme = Object.values(bilan.issues).reduce((a, b) => a + b, 0);
  dit(somme >= PARTIES, `${somme} issues atteintes sur ${PARTIES} parties`);
  dit(Object.keys(bilan.issues).length >= 4,
      `${Object.keys(bilan.issues).length} issues distinctes atteintes`);

  /* Un aiguillage dynamique ne s'affiche jamais : il compte comme vu. Les
   * branches « Domination » demandent une marge de +6 et ne sortent presque
   * jamais au hasard : elles sont vérifiées par le rendu, pas par la marche. */
  const vues = new Set(bilan.vues.concat(graphe.dyn));
  const marchables = graphe.def.filter(id => !/_dom$/.test(id));
  const manquantes = marchables.filter(id => !vues.has(id));
  const couverture = Math.round(100 * (marchables.length - manquantes.length) / marchables.length);
  /* La marche est uniforme ; un joueur ne l'est pas. Une branche profonde qui
   * sort rarement n'est pas un défaut — une famille entière de branches qui ne
   * sort jamais en est un. On échoue bas, et on imprime toujours la liste. */
  dit(couverture >= 92,
      `couverture ${couverture} % des scènes atteignables au hasard (${marchables.length - manquantes.length}/${marchables.length})`,
      manquantes.length ? manquantes.join(' · ') : '');

  /* Les branches « Domination » demandent une marge de +6 : le hasard les
   * sert rarement. On les rend donc toutes, une par une, pour vérifier au
   * moins qu'elles s'affichent sans erreur. */
  const rendu = await page.evaluate((ids) => {
    const muettes = [];
    for(const id of ids){
      localStorage.clear(); neuf();
      ETAT.gore = 'extreme';
      try{
        aller(id);
        const el = document.getElementById('scene');
        if(el.textContent.trim().length < 40) muettes.push(id);
      }catch(e){ muettes.push(id + ' (' + e.message + ')'); }
    }
    return muettes;
  }, graphe.def.filter(id => !SCENES_DYN.includes(id)));
  dit(rendu.length === 0, `les ${graphe.def.length} scènes s'affichent toutes`, rendu.slice(0, 6).join(' · '));

  /* ── 3 · rien ne fuit ──────────────────────────────────────────────────── */
  const fuite = await page.evaluate(() => {
    /* On rejoue une scène à embranchements et on lit l'écran : aucune des
     * scènes-cibles ne doit apparaître dedans, seulement les libellés. */
    localStorage.clear(); neuf();
    aller('wy_combat_1');
    const html = document.getElementById('scene').innerHTML;
    const s = SCENES.wy_combat_1;
    const suspects = [];
    for(const c of (s.choix || []))
      for(const cible of Object.values(c.degres || {})){
        const t = SCENES[cible];
        for(const p of (t.texte || [])){
          const txt = typeof p === 'string' ? p : (typeof p === 'function' ? '' : (p.intense || ''));
          if(txt.length > 40 && html.includes(txt.slice(0, 40))) suspects.push(cible);
        }
      }
    return { suspects, aIds:/wy_c1_/.test(html) };
  });
  dit(fuite.suspects.length === 0 && !fuite.aIds,
      "l'écran ne montre aucune branche non prise", fuite.suspects.join(' · '));

  /* ── 4 · le témoin fait le renom ───────────────────────────────────────── */
  const renom = await page.evaluate(() => {
    neuf(); const a0 = ETAT.renom;
    exploit({ eclat:10, temoins:'aucun' }); const sans = ETAT.renom - a0;
    exploit({ eclat:10, temoins:'foule' }); const avec = ETAT.renom - a0 - sans;
    return { sans, avec };
  });
  dit(renom.sans === 0 && renom.avec > 0,
      "un exploit sans témoin ne rapporte rien", `sans ${renom.sans} · foule ${renom.avec}`);

  /* ── 5 · les erreurs de page ───────────────────────────────────────────── */
  dit(erreurs.length === 0, "aucune erreur JavaScript", erreurs.slice(0, 3).join(' | '));

  console.log('\nIssues atteintes :');
  for(const [nom, n] of Object.entries(bilan.issues).sort((a, b) => b[1] - a[1]))
    console.log(`   ${String(n).padStart(4)}  ${nom}`);

  await nav.close();
  console.log(echecs ? `\n${echecs} épreuve(s) en échec.\n` : "\nToutes les épreuves passent.\n");
  process.exit(echecs ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
