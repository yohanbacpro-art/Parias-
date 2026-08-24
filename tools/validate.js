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
  'src/data/bestiary.js', 'src/data/bestiary_2.js', 'src/data/portraits.js', 'src/data/locations.js',
  'src/data/events.js', 'src/data/contracts.js', 'src/data/powers.js',
  'src/data/items.js', 'src/data/lore.js', 'src/data/champions.js',
  'src/data/units.js', 'src/data/battles.js',
  'src/data/events_written.js', 'src/data/events_written_2.js',
  'src/data/events_meetings.js', 'src/data/events_trame.js',
  'src/data/contracts_special.js', 'src/data/contrats_locaux.js', 'src/data/romances.js',
  'src/data/events_compagnons.js', 'src/data/events_nemesis.js', 'src/data/events_isolde.js',
  'src/data/reputation.js', 'src/data/epilogue.js',
  'src/data/chantier.js', 'src/data/events_suspicion.js', 'src/data/politique.js',
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
  EVENTS_NEMESIS, EVENTS_ISOLDE, EVENTS_COMPAGNONS,
  TREE, TREE_ELFES, COMPANIONS_POOL, LOC_COORDS, CHAMPIONS,
  UNIT_TYPES, BATTLES, TERRAINS, AFFINITES_DEPART, REGIONS, ROUTES, LOC_REGION,
  REPUTATION_DEPART, RANGS_REPUTATION, LOC_PEUPLE, REPUTATION_VOIX, SHOPS, BUTIN_PAR_PEUPLE,
  CONTRATS_LOCAUX, CONTRACT_COMPLICATIONS,
  CHANTIER, EVENTS_SUSPICION, POUVOIRS, EDITS,
  EPI_OUVERTURE, EPI_NOM, EPI_PEUPLES, EPI_GENS, EPI_NEMESIS, EPI_EMPIRE, EPI_LIGNEE, EPI_ONDE, EPI_LEGS,
} = vm.runInContext(`({
  BESTIARY_FULL, PORTRAITS, LOCATIONS, EVENTS, CONTRACTS, ITEM_POOL,
  EVENTS_WRITTEN, EVENTS_RENCONTRE, EVENTS_TRAME, CONTRATS_SPECIAUX, EVENTS_ROMANCE,
  EVENTS_NEMESIS, EVENTS_ISOLDE, EVENTS_COMPAGNONS,
  TREE, TREE_ELFES, COMPANIONS_POOL, LOC_COORDS, CHAMPIONS,
  UNIT_TYPES, BATTLES, TERRAINS, AFFINITES_DEPART, REGIONS, ROUTES, LOC_REGION,
  REPUTATION_DEPART, RANGS_REPUTATION, LOC_PEUPLE, REPUTATION_VOIX, SHOPS, BUTIN_PAR_PEUPLE,
  CONTRATS_LOCAUX, CONTRACT_COMPLICATIONS,
  CHANTIER, EVENTS_SUSPICION, POUVOIRS, EDITS,
  EPI_OUVERTURE, EPI_NOM, EPI_PEUPLES, EPI_GENS, EPI_NEMESIS, EPI_EMPIRE, EPI_LIGNEE, EPI_ONDE, EPI_LEGS
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
  ...EVENTS_NEMESIS.map(e => ({ ev:e, cat:'nemesis' })),
  ...EVENTS_ISOLDE.map(e => ({ ev:e, cat:'isolde' })),
  ...EVENTS_COMPAGNONS.map(e => ({ ev:e, cat:'compagnon' })),
  ...EVENTS_SUSPICION.map(e => ({ ev:e, cat:'suspicion' })),
];
// Certains marqueurs sont posés par le moteur et non par un effet de contenu :
// on les déclare ici pour que le contrôle des marqueurs orphelins reste utile.
const MARQUEURS_MOTEUR = [
  'prix_noble_accepte',   // src/lignee.js — Prix du Paria réclamé et consenti
  'onde_devant_armee',    // src/battle.js — Coup de l'Onde employé en bataille
  'descendance',          // src/lignee.js — première naissance
  'heritier_paria',       // src/lignee.js — un enfant porte l'Onde
  'chronique_terminee',   // src/epilogue.js — la chronique est allée à son terme
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

/* ---- Lisibilité de la carte ---- */
/* Un lieu sans région n'apparaît nulle part dans la liste ; une route vers un
 * lieu inexistant se dessine dans le vide. */
LOCATIONS.forEach(l => {
  if(!LOC_REGION[l.id]) err(`Carte : ${l.id} (${l.nom}) n'appartient à aucune région`);
  if(!LOC_COORDS[l.id]) err(`Carte : ${l.id} n'a pas de coordonnées`);
});
REGIONS.forEach(r => {
  r.lieux.forEach(id => { if(!locIds.has(id)) err(`Région ${r.id} : lieu inconnu « ${id} »`); });
  if(!r.nom || !r.note) err(`Région ${r.id} : nom ou description manquants`);
});
const relies = new Set();
ROUTES.forEach(([a, b], i) => {
  if(!locIds.has(a) || !locIds.has(b)) err(`Route ${i} : lieu inconnu (${a} → ${b})`);
  relies.add(a); relies.add(b);
});
LOCATIONS.forEach(l => {
  if(!relies.has(l.id)) err(`Carte : ${l.id} (${l.nom}) n'est relié par aucune route — on ne peut pas savoir comment y aller`);
});
console.log(`Carte       ${REGIONS.length} régions · ${ROUTES.length} routes · ${LOCATIONS.length} lieux tous reliés`);
console.log('');

/* ---- Recrutement ---- */
Object.values(UNIT_TYPES).forEach(t => {
  if(t.ennemi) return;
  Object.keys(t.reputationRequise || {}).forEach(p => {
    if(!Object.keys(REPUTATION_DEPART).includes(p))
      err(`Unité ${t.id} : peuple inconnu « ${p} » dans reputationRequise`);
  });
  if(t.requisFlag && !marqueursPoses.has(t.requisFlag))
    err(`Unité ${t.id} : marqueur « ${t.requisFlag} » jamais posé — elle serait irrecrutable`);
});
const recrutables = Object.values(UNIT_TYPES).filter(t => !t.ennemi);
console.log(`Recrutement ${recrutables.length} troupes recrutables · ${Object.values(UNIT_TYPES).length - recrutables.length} adverses`);
console.log('');

/* ---- Affaires locales ---- */
/* Le registre général affiche des lieux qui n'existent pas sur la carte : c'est
 * assumé, ce sont des affaires venues d'ailleurs. Les affaires LOCALES, elles,
 * doivent pointer sur un lieu réel, sans quoi on retombe exactement dans le
 * défaut qu'elles corrigent. */
const TYPES_CONTRAT = ['chasse','sauvetage','traque','récupération','enquête','guerre'];
const DANGERS_CONTRAT = ['modéré','dangereux','très dangereux','extrême','légendaire'];
let nbAffaires = 0, nbDenouements = 0;
const idsAffaires = new Set();
LOCATIONS.forEach(l => {
  if(!CONTRATS_LOCAUX[l.id]) err(`Affaires locales : ${l.id} (${l.nom}) n'a aucun dossier`);
});
Object.entries(CONTRATS_LOCAUX).forEach(([locId, d]) => {
  const ou = `Dossier ${locId}`;
  if(!locIds.has(locId)) err(`${ou} : lieu inconnu`);
  if(d.peuple !== null && d.peuple !== undefined && !Object.keys(REPUTATION_DEPART).includes(d.peuple))
    err(`${ou} : peuple inconnu « ${d.peuple} »`);
  if(!d.dossier) err(`${ou} : pas de nom de dossier`);
  if(!Array.isArray(d.affaires) || d.affaires.length !== 3)
    err(`${ou} : ${(d.affaires||[]).length} affaire(s) au lieu de 3`);
  (d.affaires || []).forEach(a => {
    nbAffaires++;
    if(idsAffaires.has(a.id)) err(`${ou} : identifiant d'affaire en double « ${a.id} »`);
    idsAffaires.add(a.id);
    if(!a.titre || !a.commanditaire || !a.pitch) err(`${ou}/${a.id} : titre, commanditaire ou accroche manquant`);
    if(!TYPES_CONTRAT.includes(a.type)) err(`${ou}/${a.id} : type inconnu « ${a.type} »`);
    if(!DANGERS_CONTRAT.includes(a.danger)) err(`${ou}/${a.id} : danger inconnu « ${a.danger} »`);
    if(typeof a.or !== 'number' || a.or <= 0) err(`${ou}/${a.id} : récompense absente`);
  });
  const dn = d.denouement;
  if(!dn){ err(`${ou} : pas de dénouement — les trois affaires ne mèneraient nulle part`); return; }
  nbDenouements++;
  const marqueur = dn.id.toLowerCase() + '_fait';
  if(!dn.intro || !dn.intro.length) err(`${ou} : dénouement sans introduction`);
  if(!Array.isArray(dn.choix) || dn.choix.length < 3)
    err(`${ou} : dénouement à moins de trois issues`);
  (dn.choix || []).forEach((c, i) => {
    if(!c.label || !c.texte || !c.texte.length) err(`${dn.id} choix ${i} : incomplet`);
    const f = (c.effets && (c.effets.flags || [])) || [];
    if(!f.includes(marqueur))
      err(`${dn.id} choix ${i} : ne pose pas « ${marqueur} » — le dénouement se rejouerait`);
    (c.effets && c.effets.reputation ? Object.keys(c.effets.reputation) : []).forEach(p => {
      if(!Object.keys(REPUTATION_DEPART).includes(p)) err(`${dn.id} choix ${i} : peuple inconnu « ${p} »`);
    });
    if(c.effets && c.effets.item && !itemIds.has(c.effets.item))
      err(`${dn.id} choix ${i} : objet inconnu « ${c.effets.item}»`);
    f.forEach(x => marqueursPoses.add(x));
  });
});
console.log(`Affaires locales ${nbAffaires} affaires sur ${Object.keys(CONTRATS_LOCAUX).length} lieux · ${nbDenouements} dénouements`);
console.log('');

/* ---- Réputation ---- */
/* Une condition sur un peuple mal orthographié ne s'ouvre jamais, et rien ne le
 * signale : la branche reste simplement invisible pour toujours. */
const PEUPLES_REP = Object.keys(REPUTATION_DEPART);
let nbRep = 0;
tousLesEvenements.forEach(({ ev }) => {
  const verifierPeuples = (obj, ou) => {
    Object.keys(obj || {}).forEach(p => {
      nbRep++;
      if(!PEUPLES_REP.includes(p)) err(`${ou} : peuple « ${p} » inconnu de la réputation`);
    });
  };
  verifierPeuples((ev.requis || {}).reputationMin, `${ev.id} (requis)`);
  verifierPeuples((ev.requis || {}).reputationMax, `${ev.id} (requis)`);
  Object.entries(ev.scenes || {}).forEach(([sid, sc]) => {
    verifierPeuples((sc.effets || {}).reputation, `${ev.id}/${sid}`);
    (sc.choix || []).forEach((c, i) => {
      verifierPeuples((c.effets || {}).reputation, `${ev.id}/${sid} choix ${i}`);
      verifierPeuples((c.requis || {}).reputationMin, `${ev.id}/${sid} choix ${i}`);
    });
  });
});
Object.entries(LOC_PEUPLE).forEach(([lid, p]) => {
  if(!locIds.has(lid)) err(`LOC_PEUPLE : lieu inconnu « ${lid} »`);
  if(p !== null && !PEUPLES_REP.includes(p)) err(`LOC_PEUPLE ${lid} : peuple inconnu « ${p} »`);
});
LOCATIONS.forEach(l => {
  if(!(l.id in LOC_PEUPLE)) err(`LOC_PEUPLE : ${l.id} (${l.nom}) n'est rattaché à aucun peuple, même pas à null`);
});
Object.keys(SHOPS).forEach(p => {
  if(!PEUPLES_REP.includes(p)) err(`SHOPS : peuple inconnu « ${p} »`);
});
Object.entries(BUTIN_PAR_PEUPLE).forEach(([p, ids]) => {
  if(!PEUPLES_REP.includes(p)) err(`BUTIN_PAR_PEUPLE : peuple inconnu « ${p} »`);
  ids.forEach(id => { if(!itemIds.has(id)) err(`BUTIN_PAR_PEUPLE ${p} : objet inconnu « ${id} »`); });
});
ITEM_POOL.forEach(it => {
  if(it.peuple !== null && it.peuple !== undefined && !PEUPLES_REP.includes(it.peuple))
    err(`Objet ${it.id} : peuple inconnu « ${it.peuple} »`);
  if(typeof it.rang !== 'number') err(`Objet ${it.id} : pas de rang`);
  if(it.unique && it.rang < 3) warn(`Objet ${it.id} : unique mais de rang ${it.rang}`);
});
/* Une pièce unique qu'aucune scène ne donne est un objet mort. */
const donnesParScene = new Set();
tousLesEvenements.forEach(({ ev }) => Object.values(ev.scenes || {}).forEach(sc => {
  if(sc.effets && sc.effets.item) donnesParScene.add(sc.effets.item);
  (sc.choix || []).forEach(c => { if(c.effets && c.effets.item) donnesParScene.add(c.effets.item); });
}));
ITEM_POOL.filter(it => it.unique).forEach(it => {
  if(!donnesParScene.has(it.id)) err(`Objet unique ${it.id} : aucune scène ne le donne — il est inatteignable`);
});
Object.values(BATTLES).forEach(b => {
  [b.butinPeuple, b.peupleAdverse, b.peupleAllie].forEach(p => {
    if(p && !PEUPLES_REP.includes(p)) err(`Bataille ${b.id} : peuple inconnu « ${p} »`);
  });
  if(b.butinPeuple && !BUTIN_PAR_PEUPLE[b.butinPeuple])
    err(`Bataille ${b.id} : aucun butin défini pour les ${b.butinPeuple}`);
});
console.log(`Réputation  ${PEUPLES_REP.length} peuples · ${nbRep} conditions et effets · ${Object.keys(SHOPS).length} marchands · ${ITEM_POOL.filter(i=>i.unique).length} pièces uniques`);
console.log('');

/* ---- Illustrations ---- */
/* Un portrait mal attribué ne casse rien : il montre simplement le mauvais
 * visage, et personne ne s'en aperçoit avant de jouer la scène. */
const PEUPLES_DESSIN = ['humain','paria','onde','elfe','elfe_noir','nain','khesh',
                        'peau_verte','homme_bete','astrah'];
const TRAITS_DESSIN  = ['couronne','capuche','heaume','voile','barbe','cornes',
                        'masque','tresses','chapeau','nu'];
Object.entries(PORTRAITS).forEach(([id, p]) => {
  if(!p.nom || !p.role) err(`Portrait ${id} : nom ou rôle manquant`);
  if(!p.peuple) err(`Portrait ${id} : pas de peuple — le dessin de repli serait générique`);
  else if(!PEUPLES_DESSIN.includes(p.peuple)) err(`Portrait ${id} : peuple « ${p.peuple} » sans palette`);
  if(p.trait && !TRAITS_DESSIN.includes(p.trait)) err(`Portrait ${id} : attribut « ${p.trait} » non dessinable`);
});
Object.entries(CHAMPIONS).forEach(([k, c]) => {
  if(!c.portrait) err(`Champion ${k} : aucun portrait — l'adversaire se bat sans visage`);
  else if(!portrIds.has(c.portrait)) err(`Champion ${k} : portrait « ${c.portrait} » absent du registre`);
});
/* Deux champions distincts qui partagent un visage : l'un des deux montre celui
 * de l'autre. Seul un doublon volontaire (même personne, deux fiches) passe. */
const parPortrait = {};
Object.entries(CHAMPIONS).forEach(([k, c]) => { (parPortrait[c.portrait] = parPortrait[c.portrait] || []).push(k); });
Object.entries(parPortrait).forEach(([pid, ks]) => {
  if(ks.length > 1) warn(`Portrait ${pid} partagé par ${ks.join(' et ')} — vérifier que c'est la même personne`);
});
/* Une scène qui nomme un personnage du registre sans montrer son visage.
 * Le repérage se fait sur le nom propre : les personnages désignés par un nom
 * commun (« Le Chasseur », « Garde du Roi de Cendre ») ne peuvent pas être
 * détectés sans lever une alerte à chaque emploi ordinaire du mot — ceux-là
 * restent à la charge de l'auteur. */
/* « Eltharion » désigne à la fois le roi et sa capitale : impossible de trancher
 * sur le seul mot, et afficher le portrait du roi dans une scène qui parle de la
 * ville serait plus faux que de ne rien afficher. */
const MOTS_COMMUNS = ['garde','enfant','chasseur','tenant','lame','sourire','roi',
                      'princesse','homme','eltharion'];
const NOMS_SCENE = Object.entries(PORTRAITS)
  .map(([id, p]) => [id, p.nom.replace(/^(Princesse|Lady|Prince|Capitaine|Sœur|Mère|Dame|Le|La|L')\s*/, '').split(/[ ']/)[0]])
  .filter(([id, m]) => m.length > 3 && id !== 'yohan' && !MOTS_COMMUNS.includes(m.toLowerCase()));
let sansVisage = 0;
tousLesEvenements.forEach(({ ev }) => {
  Object.entries(ev.scenes || {}).forEach(([sid, sc]) => {
    if(sc.pnj) return;
    const txt = (sc.texte || []).join(' ');
    const cites = NOMS_SCENE.filter(([, m]) => new RegExp('\\b' + m.replace(/-/g, '\\-'), 'i').test(txt));
    if(cites.length === 1){
      sansVisage++;
      warn(`${ev.id}/${sid} : ${PORTRAITS[cites[0][0]].nom} est nommé mais aucun portrait n'est affiché (pnj:"${cites[0][0]}")`);
    }
  });
});
console.log(`Illustrations ${Object.keys(PORTRAITS).length} portraits · ${tousLesEvenements.filter(x => x.ev.image).length}/${tousLesEvenements.length} événements illustrés${sansVisage ? ` · ${sansVisage} scène(s) sans visage` : ''}`);
console.log('');

/* ---- Épilogue ---- */
/* Un verdict conditionné à un marqueur qui n'existe pas ne se déclenche jamais :
 * la fin serait muette sans que rien ne le signale. */
const PEUPLES_MONDE = ['humains','parias','khesh','elfes','elfes_noirs','nains','peaux_vertes','hommes_betes'];
const sectionsEpi = [
  ['EPI_OUVERTURE', EPI_OUVERTURE], ['EPI_NOM', EPI_NOM],
  ['EPI_GENS', EPI_GENS], ['EPI_NEMESIS', EPI_NEMESIS], ['EPI_EMPIRE', EPI_EMPIRE], ['EPI_LIGNEE', EPI_LIGNEE], ['EPI_ONDE', EPI_ONDE], ['EPI_LEGS', EPI_LEGS],
  ...Object.entries(EPI_PEUPLES).map(([id, p]) => [`EPI_PEUPLES.${id}`, p.verdicts]),
];
let nbVerdicts = 0;
for(const [nom, liste] of sectionsEpi){
  liste.forEach((e, i) => {
    nbVerdicts++;
    const ou = `${nom}[${i}]`;
    const si = e.si || {};
    [...(si.flags||[]), ...(si.sansFlags||[]), ...(si.unDes||[])].forEach(f => {
      if(!marqueursPoses.has(f)) err(`${ou} : marqueur « ${f} » jamais posé — ce verdict est inatteignable`);
    });
    Object.keys(si.affinite || {}).forEach(q => {
      if(!affiniteIds.has(q)) err(`${ou} : affinité inconnue « ${q} »`);
    });
    if(si.compagnon && !compagnonIds.has(si.compagnon)) err(`${ou} : compagnon inconnu « ${si.compagnon} »`);
    [...Object.keys(si.tensionMin || {}), ...Object.keys(si.tensionMax || {}),
     ...Object.keys(si.reputationMin || {}), ...Object.keys(si.reputationMax || {})].forEach(p => {
      if(!PEUPLES_MONDE.includes(p)) err(`${ou} : peuple inconnu « ${p} »`);
    });
    if(!e.texte) err(`${ou} : verdict sans texte`);
  });
}
/* Chaque section à verdict unique doit avoir un filet, sinon une partie peut
 * atteindre la fin et n'avoir rien à lire. */
[['EPI_OUVERTURE', EPI_OUVERTURE], ['EPI_NOM', EPI_NOM], ['EPI_ONDE', EPI_ONDE], ['EPI_LIGNEE', EPI_LIGNEE],
 ...Object.entries(EPI_PEUPLES).map(([id, p]) => [`EPI_PEUPLES.${id}`, p.verdicts])
].forEach(([nom, liste]) => {
  if(!liste.some(e => e.si && e.si.toujours)) err(`${nom} : aucun verdict de repli — la fin peut rester muette`);
  const dernier = liste[liste.length - 1];
  if(dernier && !(dernier.si && dernier.si.toujours)) warn(`${nom} : le repli n'est pas en dernière position`);
});
PEUPLES_MONDE.forEach(p => { if(!EPI_PEUPLES[p]) err(`Épilogue : aucun verdict pour le peuple « ${p} »`); });
const legsIds = new Set();
EPI_LEGS.forEach(l => {
  if(!l.id) err('EPI_LEGS : legs sans identifiant');
  else if(legsIds.has(l.id)) err(`EPI_LEGS : identifiant en double « ${l.id} »`);
  else legsIds.add(l.id);
  if(!l.effet || !Object.keys(l.effet).length) err(`EPI_LEGS ${l.id} : legs sans effet`);
});
console.log(`Épilogue    ${nbVerdicts} verdicts · ${EPI_LEGS.length} legs transmissibles`);
console.log('');

/* ---- Le bestiaire et les rencontres ---- */
const FAMILLES_BST = new Set(['homme', 'bete', 'monstre', 'mort']);
const ROLES_BST = new Set(['piétaille', 'soutien', 'élite', 'meneur']);
const bstVus = new Set();
BESTIARY_FULL.forEach(b => {
  if(bstVus.has(b.id)) err(`BESTIAIRE : identifiant en double « ${b.id} »`);
  bstVus.add(b.id);
  if(!FAMILLES_BST.has(b.famille)) err(`BESTIAIRE ${b.id} : famille inconnue « ${b.famille} »`);
  if(!ROLES_BST.has(b.role)) err(`BESTIAIRE ${b.id} : rôle inconnu « ${b.role} »`);
  if(!(b.pv > 0) || !(b.defense > 0)) err(`BESTIAIRE ${b.id} : créature sans PV ni Défense`);
  if(!b.attaque_base || !(b.attaque_base.degats_base > 0)) err(`BESTIAIRE ${b.id} : créature sans attaque`);
  (b.capacites_speciales || []).forEach(cap => {
    if(!cap.nom || !cap.effet) err(`BESTIAIRE ${b.id} : capacité sans nom ou sans effet`);
  });
});
// Une rencontre doit pouvoir se composer pour chaque type d'affaire, à chaque
// palier de Danger : sinon un contrat tombe sur un vivier vide.
const FAMILLE_PAR_TYPE_ATTENDU = {
  chasse:['bete','monstre'], sauvetage:['homme','monstre'], traque:['homme'],
  "récupération":['homme','mort'], "enquête":['homme'], guerre:['homme'],
};
Object.entries(FAMILLE_PAR_TYPE_ATTENDU).forEach(([type, familles]) => {
  for(let d = 1; d <= 6; d++){
    const n = BESTIARY_FULL.filter(b => familles.includes(b.famille) && b.danger === d).length;
    if(!n) warn(`Rencontres : aucune créature de type « ${type} » au Danger ${d}`);
  }
});
// Chaque famille doit avoir de quoi mener et de quoi suivre.
['homme','bete','monstre','mort'].forEach(f => {
  const pool = BESTIARY_FULL.filter(b => b.famille === f);
  if(!pool.some(b => b.role === 'piétaille')) err(`Rencontres : la famille « ${f} » n'a aucune piétaille`);
  if(f === 'homme' && !pool.some(b => b.role === 'meneur')) err("Rencontres : aucun meneur humain");
});
const parFamille = {};
BESTIARY_FULL.forEach(b => { parFamille[b.famille] = (parFamille[b.famille] || 0) + 1; });
console.log(`Rencontres  ${Object.entries(parFamille).map(([f, n]) => `${n} ${f}`).join(' · ')}`);
console.log('');

/* ---- Le chantier de Karlsberg ---- */
const ouvrageIds = new Set();
CHANTIER.forEach(o => {
  if(!o.id) err('CHANTIER : ouvrage sans identifiant');
  else if(ouvrageIds.has(o.id)) err(`CHANTIER : identifiant en double « ${o.id} »`);
  else ouvrageIds.add(o.id);
  if(!(o.or > 0)) err(`CHANTIER ${o.id} : un ouvrage doit coûter de l'or`);
  if(!(o.semaines > 0)) err(`CHANTIER ${o.id} : un ouvrage doit coûter des semaines`);
  if(!o.desc || !o.apres) err(`CHANTIER ${o.id} : il manque la description ou le texte d'achèvement`);
  if(!o.effet || !Object.keys(o.effet).length) err(`CHANTIER ${o.id} : ouvrage sans effet`);
  noterMarqueurs(o.effet);
});
CHANTIER.forEach(o => {
  if(o.requis && !ouvrageIds.has(o.requis)) err(`CHANTIER ${o.id} : prérequis inconnu « ${o.requis} »`);
});
// Aucun ouvrage ne doit dépendre de lui-même, directement ou non.
CHANTIER.forEach(o => {
  const vus = new Set();
  let cur = o;
  while(cur && cur.requis){
    if(vus.has(cur.requis)){ err(`CHANTIER ${o.id} : chaîne de prérequis circulaire`); break; }
    vus.add(cur.requis);
    if(cur.requis === o.id){ err(`CHANTIER ${o.id} : dépend de lui-même`); break; }
    cur = CHANTIER.find(x => x.id === cur.requis);
  }
});
const orTotalChantier = CHANTIER.reduce((s, o) => s + o.or, 0);
const semTotalChantier = CHANTIER.reduce((s, o) => s + o.semaines, 0);
console.log(`Chantier    ${CHANTIER.length} ouvrages · ${orTotalChantier} or et ${semTotalChantier} semaines pour tout relever`);

/* ---- La Suspicion ---- */
const sensValides = new Set(['hausse', 'baisse']);
EVENTS_SUSPICION.forEach(e => {
  if(!sensValides.has(e.sens)) err(`EVENTS_SUSPICION ${e.id} : sens inconnu « ${e.sens} »`);
  if(!e.requis || e.requis.suspicionMin === undefined)
    err(`EVENTS_SUSPICION ${e.id} : sans requis.suspicionMin, il se déclencherait à zéro de Suspicion`);
});
// Chaque palier doit avoir de quoi se produire, et de quoi en sortir.
[[12, 'Remarqué'], [40, 'Traqué'], [70, 'Chasse ouverte']].forEach(([seuil, nom]) => {
  const dispo = EVENTS_SUSPICION.filter(e => (e.requis.suspicionMin || 0) <= seuil);
  if(!dispo.length) err(`Suspicion : aucun événement ne peut se produire au palier « ${nom} » (${seuil})`);
  const sorties = dispo.filter(e => Object.values(e.scenes).some(sc =>
    (sc.effets && sc.effets.suspicion < 0) ||
    (sc.choix || []).some(c => c.effets && c.effets.suspicion < 0)));
  if(!sorties.length) err(`Suspicion : au palier « ${nom} », aucun moyen de faire redescendre la Suspicion`);
});
const nbBaisses = EVENTS_SUSPICION.filter(e => e.sens === 'baisse').length;
console.log(`Suspicion   ${EVENTS_SUSPICION.length} événements dédiés · ${nbBaisses} offrent une porte de sortie`);

/* ---- La politique des puissances ---- */
const pouvIds = new Set();
POUVOIRS.forEach(p => {
  if(pouvIds.has(p.id)) err(`POUVOIRS : identifiant en double « ${p.id} »`);
  pouvIds.add(p.id);
  if(typeof p.derive !== 'function') err(`POUVOIRS ${p.id} : pas de dérive d'influence`);
  if(typeof p.posture !== 'function') err(`POUVOIRS ${p.id} : pas de posture envers Yohan`);
  if(!(p.depart >= 0 && p.depart <= 100)) err(`POUVOIRS ${p.id} : influence de départ hors bornes`);
});
if(!POUVOIRS.some(p => p.joueur)) err('POUVOIRS : aucune puissance ne représente le joueur');
const editIds = new Set();
EDITS.forEach(e => {
  if(editIds.has(e.id)) err(`EDITS : identifiant en double « ${e.id} »`);
  editIds.add(e.id);
  if(!pouvIds.has(e.pouvoir)) err(`EDITS ${e.id} : puissance inconnue « ${e.pouvoir} »`);
  if(!e.titre || !e.texte) err(`EDITS ${e.id} : édit sans titre ou sans texte`);
  if(!e.effet || !Object.keys(e.effet).length) err(`EDITS ${e.id} : édit sans effet réel`);
  if(e.effet && e.effet.tension)
    Object.keys(e.effet.tension).forEach(k => {
      if(!PEUPLES_MONDE.includes(k)) err(`EDITS ${e.id} : peuple inconnu « ${k} »`);
    });
  if(e.effet && e.effet.reputation)
    Object.keys(e.effet.reputation).forEach(k => {
      if(!PEUPLES_MONDE.includes(k)) err(`EDITS ${e.id} : peuple inconnu « ${k} »`);
    });
});
POUVOIRS.forEach(p => {
  if(!EDITS.some(e => e.pouvoir === p.id))
    warn(`POUVOIRS ${p.id} : cette puissance ne décide jamais rien`);
});
console.log(`Politique   ${POUVOIRS.length} puissances · ${EDITS.length} édits`);
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
