/* PARIAS — Contrôle d'intégrité des données de jeu
 *
 *   node tools/validate.js
 *
 * Vérifie que tout ce que le contenu référence existe réellement : scènes,
 * créatures du bestiaire, objets, pouvoirs, portraits, lieux — et signale les
 * scènes orphelines (écrites mais inatteignables).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const racine = path.join(__dirname, '..');
const fichiers = [
  'src/data/bestiary.js', 'src/data/portraits.js', 'src/data/locations.js',
  'src/data/events.js', 'src/data/contracts.js', 'src/data/powers.js',
  'src/data/items.js', 'src/data/lore.js', 'src/data/champions.js',
  'src/data/units.js', 'src/data/battles.js',
  'src/data/events_written.js', 'src/data/events_meetings.js', 'src/data/events_trame.js',
  'src/data/contracts_special.js', 'src/data/romances.js',
];

const ctx = vm.createContext({ console });
for(const f of fichiers){
  vm.runInContext(fs.readFileSync(path.join(racine, f), 'utf8'), ctx, { filename: f });
}

// Les `const` de haut niveau vivent dans la portée lexicale du contexte, pas sur
// l'objet global : on les récupère en évaluant une expression dans ce même contexte.
const {
  BESTIARY_FULL, PORTRAITS, LOCATIONS, EVENTS, CONTRACTS, ITEM_POOL,
  EVENTS_WRITTEN, EVENTS_RENCONTRE, EVENTS_TRAME, CONTRATS_SPECIAUX, EVENTS_ROMANCE,
  TREE, TREE_ELFES, COMPANIONS_POOL, LOC_COORDS, CHAMPIONS,
  UNIT_TYPES, BATTLES, TERRAINS, AFFINITES_DEPART,
} = vm.runInContext(`({
  BESTIARY_FULL, PORTRAITS, LOCATIONS, EVENTS, CONTRACTS, ITEM_POOL,
  EVENTS_WRITTEN, EVENTS_RENCONTRE, EVENTS_TRAME, CONTRATS_SPECIAUX, EVENTS_ROMANCE,
  TREE, TREE_ELFES, COMPANIONS_POOL, LOC_COORDS, CHAMPIONS,
  UNIT_TYPES, BATTLES, TERRAINS, AFFINITES_DEPART
})`, ctx);

const erreurs = [];
const avertissements = [];
const err  = m => erreurs.push('✗ ' + m);
function noterMarqueurs(effets){
  if(!effets) return;
  if(effets.flag) marqueursPoses.add(effets.flag);
  (effets.flags || []).forEach(f => marqueursPoses.add(f));
}
const warn = m => avertissements.push('! ' + m);

const bstIds   = new Set(BESTIARY_FULL.map(b => b.id));
const itemIds  = new Set(ITEM_POOL.map(i => i.id));
const locIds   = new Set(LOCATIONS.map(l => l.id));
const portrIds = new Set(Object.keys(PORTRAITS));
const champIds = new Set(Object.keys(CHAMPIONS));
const compagnonIds = new Set(Object.keys(COMPANIONS_POOL));
const batailleIds = new Set(Object.keys(BATTLES));
const uniteIds    = new Set(Object.keys(UNIT_TYPES));
const affiniteIds = new Set(Object.keys(AFFINITES_DEPART));
const tousLesEvenements = [
  ...EVENTS_WRITTEN.map(e => ({ ev:e, cat:'lieu' })),
  ...EVENTS_RENCONTRE.map(e => ({ ev:e, cat:'rencontre' })),
  ...EVENTS_TRAME.map(e => ({ ev:e, cat:'trame' })),
  ...CONTRATS_SPECIAUX.map(e => ({ ev:e, cat:'contrat' })),
  ...EVENTS_ROMANCE.map(e => ({ ev:e, cat:'romance' })),
];
// Certains marqueurs sont posés par le moteur et non par un effet de contenu :
// on les déclare ici pour que le contrôle des marqueurs orphelins reste utile.
const MARQUEURS_MOTEUR = [
  'prix_noble_accepte',   // src/game.js — choix du Prix du Paria dans un contrat
  'onde_devant_armee',    // src/battle.js — Coup de l'Onde employé en bataille
];
const marqueursPoses = new Set(MARQUEURS_MOTEUR);   // tout flag qu'un effet peut poser
const marqueursLus = new Map();     // flag → où il est exigé
const powerIds = new Set();
for(const arbre of [TREE, TREE_ELFES])
  for(const branche of Object.values(arbre))
    for(const n of branche.nodes) powerIds.add(n.id);

/* ---- Événements écrits ---- */
let nbScenes = 0, nbChoix = 0, nbCombats = 0, nbBatailles = 0;
const idsVus = new Set();
for(const { ev, cat } of tousLesEvenements){
  const nom = ev.id;
  if(idsVus.has(nom)) err(`Identifiant en double : ${nom}`);
  idsVus.add(nom);

  // Conditions d'apparition
  const req = ev.requis;
  if(req){
    if(req.compagnon && !compagnonIds.has(req.compagnon)) err(`${nom} : compagnon inconnu ${req.compagnon}`);
    (req.flags || []).forEach(f => marqueursLus.set(f, nom));
    (req.sansFlags || []).forEach(f => marqueursLus.set(f, nom));
    if(req.affinite && !affiniteIds.has(req.affinite.qui))
      err(`${nom} : affinité inconnue ${req.affinite.qui}`);
  }
  if((cat === 'romance' || cat === 'contrat') && !(req && req.sansFlags && req.sansFlags.length)){
    err(`${nom} : un ${cat} doit poser un marqueur via requis.sansFlags, sinon il se rejoue en boucle`);
  }
  if(cat === 'trame' && !(req && req.sansFlags && req.sansFlags.length)){
    err(`${nom} : un jalon de trame doit poser un marqueur via requis.sansFlags, sinon il se rejoue en boucle`);
  }
  if(!ev.scenes || !ev.scenes.start) err(`${nom} : pas de scène "start"`);
  if(ev.image === undefined) warn(`${nom} : aucune illustration déclarée`);
  (ev.lieux || []).forEach(l => { if(!locIds.has(l)) err(`${nom} : lieu inconnu ${l}`); });

  const atteintes = new Set(['start']);
  const aVoir = ['start'];
  while(aVoir.length){
    const id = aVoir.pop();
    const sc = ev.scenes[id];
    if(!sc){ err(`${nom} : scène référencée mais absente → ${id}`); continue; }
    nbScenes++;

    if(sc.pnj && !portrIds.has(sc.pnj)) err(`${nom}/${id} : portrait inconnu ${sc.pnj}`);
    if(!sc.texte || !sc.texte.length) err(`${nom}/${id} : scène sans texte`);
    if(sc.effets && sc.effets.item && !itemIds.has(sc.effets.item)) err(`${nom}/${id} : objet inconnu ${sc.effets.item}`);
    noterMarqueurs(sc.effets);

    const suivantes = [];
    if(sc.effets && sc.effets.affinite && !affiniteIds.has(sc.effets.affinite.qui))
      err(`${nom}/${id} : affinité inconnue ${sc.effets.affinite.qui}`);

    if(sc.bataille){
      nbBatailles++;
      if(!batailleIds.has(sc.bataille.def)) err(`${nom}/${id} : bataille inconnue ${sc.bataille.def}`);
      if(!sc.bataille.victoire || !sc.bataille.defaite) err(`${nom}/${id} : bataille sans issue victoire/defaite`);
      if(sc.bataille.victoire) suivantes.push(sc.bataille.victoire);
      if(sc.bataille.defaite)  suivantes.push(sc.bataille.defaite);
      if(sc.choix) err(`${nom}/${id} : une scène de bataille ne doit pas porter de choix`);
    } else if(sc.combat){
      nbCombats++;
      (sc.combat.groupe || []).forEach(g => {
        if(g.champion){
          if(!champIds.has(g.champion)) err(`${nom}/${id} : champion inconnu ${g.champion}`);
        } else if(g.bst){
          if(!bstIds.has(g.bst)) err(`${nom}/${id} : créature inconnue ${g.bst}`);
          if(!g.n || g.n < 1) err(`${nom}/${id} : effectif invalide pour ${g.bst}`);
        } else {
          err(`${nom}/${id} : entrée de groupe sans bst ni champion`);
        }
      });
      if(sc.combat.victoire) suivantes.push(sc.combat.victoire);
      if(sc.combat.defaite)  suivantes.push(sc.combat.defaite);
      if(!sc.combat.victoire || !sc.combat.defaite) err(`${nom}/${id} : combat sans issue victoire/defaite`);
      if(sc.choix) err(`${nom}/${id} : une scène de combat ne doit pas porter de choix`);
    } else if(sc.choix){
      sc.choix.forEach((c, i) => {
        nbChoix++;
        const ref = `${nom}/${id}#${i} « ${c.label} »`;
        if(!c.label) err(`${ref} : choix sans libellé`);
        if(c.test){
          if(!['agi','precision','vol'].includes(c.test.stat)) err(`${ref} : caractéristique inconnue ${c.test.stat}`);
          if(typeof c.test.dc !== 'number') err(`${ref} : seuil manquant`);
          if(!c.reussite || !c.echec) err(`${ref} : test sans reussite/echec`);
          if(c.reussite) suivantes.push(c.reussite);
          if(c.echec) suivantes.push(c.echec);
          if(c.suite) err(`${ref} : "suite" ignoré car le choix comporte un test`);
        } else {
          if(!c.suite) err(`${ref} : ni test ni suite`);
          else suivantes.push(c.suite);
        }
        if(c.requis){
          const r = c.requis;
          if(r.pouvoir && !powerIds.has(r.pouvoir)) err(`${ref} : pouvoir inconnu ${r.pouvoir}`);
          if(r.objet && !itemIds.has(r.objet)) err(`${ref} : objet inconnu ${r.objet}`);
        }
        if(c.effets && c.effets.item && !itemIds.has(c.effets.item)) err(`${ref} : objet inconnu ${c.effets.item}`);
        if(c.effets && c.effets.affinite && !affiniteIds.has(c.effets.affinite.qui))
          err(`${ref} : affinité inconnue ${c.effets.affinite.qui}`);
        noterMarqueurs(c.effets);
      });
    } else if(!sc.fin){
      warn(`${nom}/${id} : scène sans choix ni combat, et non marquée fin:true`);
    }

    suivantes.forEach(sid => { if(!atteintes.has(sid)){ atteintes.add(sid); aVoir.push(sid); } });
  }

  Object.keys(ev.scenes).forEach(sid => {
    if(!atteintes.has(sid)) warn(`${nom} : scène inatteignable → ${sid}`);
  });
}

/* ---- Batailles ---- */
for(const [id, b] of Object.entries(BATTLES)){
  if(b.id !== id) err(`Bataille ${id} : champ id incohérent (${b.id})`);
  if(!b.fronts || b.fronts.length !== 3) err(`Bataille ${id} : ${b.fronts?b.fronts.length:0} fronts au lieu de 3`);
  (b.fronts||[]).forEach((f,i)=>{
    if(!TERRAINS[f.terrain]) err(`Bataille ${id}/front ${i} : terrain inconnu ${f.terrain}`);
    if(!f.ennemis || !f.ennemis.length) warn(`Bataille ${id}/front ${i} (${f.nom}) : aucun adversaire`);
    (f.ennemis||[]).forEach(e=>{
      if(!uniteIds.has(e.type)) err(`Bataille ${id}/front ${i} : type d'unité inconnu ${e.type}`);
      else if(!UNIT_TYPES[e.type].ennemi) warn(`Bataille ${id}/front ${i} : ${e.type} est une unité recrutable, pas une troupe adverse`);
    });
  });
  ['recompense','echec'].forEach(k=>{
    (((b[k]||{}).flags)||[]).forEach(f => marqueursPoses.add(f));
  });
}

/* ---- Troupes ---- */
for(const [id, t] of Object.entries(UNIT_TYPES)){
  if(t.id !== id) err(`Unité ${id} : champ id incohérent (${t.id})`);
  if(!['infanterie','archers','cavalerie'].includes(t.categorie)) err(`Unité ${id} : catégorie inconnue ${t.categorie}`);
  ['effectif','attaque','defense','moral'].forEach(k=>{
    if(typeof t[k] !== 'number') err(`Unité ${id} : statistique manquante ${k}`);
  });
  if(!t.ennemi && typeof t.prix !== 'number') err(`Unité ${id} : recrutable sans prix`);
  if(t.requisFlag) marqueursLus.set(t.requisFlag, `unité ${id}`);
}

/* ---- Champions ---- */
for(const [id, c] of Object.entries(CHAMPIONS)){
  if(c.portrait && !portrIds.has(c.portrait)) err(`Champion ${id} : portrait inconnu ${c.portrait}`);
  ['danger','pv','defense','pa_par_tour','precision'].forEach(k => {
    if(typeof c[k] !== 'number') err(`Champion ${id} : statistique manquante ${k}`);
  });
  if(!c.attaque_base || typeof c.attaque_base.degats_base !== 'number')
    err(`Champion ${id} : attaque_base incomplète`);
}

/* ---- Marqueurs exigés mais jamais posés ---- */
for(const [flag, ou] of marqueursLus){
  if(!marqueursPoses.has(flag)) warn(`Marqueur « ${flag} » exigé par ${ou} mais posé nulle part`);
}

/* ---- Compagnons ---- */
for(const [id, c] of Object.entries(COMPANIONS_POOL)){
  if(c.id !== id) err(`Compagnon ${id} : champ id incohérent (${c.id})`);
  if(!portrIds.has(id)) warn(`Compagnon ${id} : aucun portrait déclaré`);
  if(c.combat){
    (c.combat.pouvoirs || []).forEach(p => { if(!powerIds.has(p)) err(`Compagnon ${id} : pouvoir inconnu ${p}`); });
    ['pvMax','fatMax','precision','vol','agi','defenseBase','paMax'].forEach(k => {
      if(typeof c.combat.stats[k] !== 'number') err(`Compagnon ${id} : statistique manquante ${k}`);
    });
    const arbre = c.combat.arbre;
    if(!['onde','elfique'].includes(arbre)) err(`Compagnon ${id} : arbre inconnu ${arbre}`);
    const source = arbre === 'elfique' ? TREE_ELFES : TREE;
    const dispo = new Set();
    Object.values(source).forEach(b => b.nodes.forEach(n => dispo.add(n.id)));
    (c.combat.pouvoirs || []).forEach(p => {
      if(!dispo.has(p)) err(`Compagnon ${id} : ${p} n'appartient pas à l'arbre ${arbre}`);
    });
  }
}

/* ---- Reste du contenu ---- */
LOCATIONS.forEach(l => { if(!LOC_COORDS[l.id]) err(`Lieu ${l.id} : aucune coordonnée sur la carte`); });
CONTRACTS.forEach(c => { if(!c.etapes || c.etapes.length !== 5) err(`Contrat ${c.id} : ${c.etapes?c.etapes.length:0} étapes au lieu de 5`); });
EVENTS.forEach(e => { if(!e.choix || !e.choix.length) err(`Événement généré ${e.id} : aucun choix`); });

/* ---- Rapport ---- */
console.log(`Bestiaire   ${BESTIARY_FULL.length} créatures`);
console.log(`Lieux       ${LOCATIONS.length}`);
console.log(`Contrats    ${CONTRACTS.length}`);
console.log(`Événements  ${EVENTS_WRITTEN.length} de lieu · ${EVENTS_RENCONTRE.length} rencontres · ${EVENTS_TRAME.length} jalons de trame`);
console.log(`            ${CONTRATS_SPECIAUX.length} contrats spéciaux · ${EVENTS_ROMANCE.length} attachements`);
console.log(`            ${nbScenes} scènes, ${nbChoix} choix, ${nbCombats} affrontements, ${nbBatailles} batailles · + ${EVENTS.length} générés`);
console.log(`Troupes     ${Object.keys(UNIT_TYPES).length} types · ${Object.keys(BATTLES).length} champs de bataille`);
console.log(`Pouvoirs    ${powerIds.size} · Objets ${itemIds.size} · Portraits ${portrIds.size} · Champions ${champIds.size}`);
console.log('');

/* ---- Couverture par lieu ---- */
const tirables = [...EVENTS_WRITTEN, ...EVENTS_RENCONTRE];  // la trame et les romances ne se tirent pas sur place
console.log('Couverture par lieu (événements écrits tirables sur place) :');
let vides = 0;
LOCATIONS.forEach(l => {
  const n = tirables.filter(ev =>
    ev.lieux ? ev.lieux.includes(l.id)
             : l.familles_evenements_compatibles.includes(ev.famille)).length;
  if(n === 0){ vides++; err(`Lieu ${l.id} (${l.nom}) : aucun événement écrit ne peut s'y déclencher`); }
  else if(n <= 1) warn(`Lieu ${l.id} (${l.nom}) : un seul événement écrit disponible`);
  console.log(`  ${String(n).padStart(2)}  ${l.nom}`);
});
console.log('');

avertissements.forEach(a => console.log(a));
erreurs.forEach(e => console.log(e));

if(erreurs.length){
  console.log(`\n${erreurs.length} erreur(s).`);
  process.exit(1);
}
console.log(`\n✔ Contenu cohérent${avertissements.length ? ` (${avertissements.length} avertissement(s))` : ''}.`);
