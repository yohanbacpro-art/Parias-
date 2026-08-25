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
  'src/data/powers.js',
  'src/data/items.js', 'src/data/lore.js', 'src/data/champions.js',
  'src/data/units.js', 'src/data/battles.js',
  'src/data/events_written.js', 'src/data/events_written_2.js',
  'src/data/events_meetings.js', 'src/data/events_trame.js',
  'src/data/cadres.js', 'src/data/contracts_special.js', 'src/data/contrats_locaux.js', 'src/data/romances.js',
  'src/data/events_compagnons.js', 'src/data/events_nemesis.js', 'src/data/events_isolde.js',
  'src/data/reputation.js', 'src/data/epilogue.js',
  'src/data/chantier.js', 'src/data/events_suspicion.js', 'src/data/politique.js',
  'src/data/maisons.js', 'src/data/chaines.js', 'src/data/chaines_2.js',
  'src/data/chaines_secretes.js', 'src/data/explorations_vides.js',
  'src/data/crises.js', 'src/data/pnj_autonomes.js', 'src/data/ressources.js',
  'src/data/succession.js',
];

const ctx = vm.createContext({ console });
for(const f of fichiers){
  vm.runInContext(fs.readFileSync(path.join(racine, f), 'utf8'), ctx, { filename: f });
}

// Les `const` de haut niveau vivent dans la portée lexicale du contexte, pas sur
// l'objet global : on les récupère en évaluant une expression dans ce même contexte.
const {
  BESTIARY_FULL, PORTRAITS, LOCATIONS, ITEM_POOL,
  EVENTS_WRITTEN, EVENTS_RENCONTRE, EXPLORATIONS_VIDES, EVENTS_TRAME, CONTRATS_SPECIAUX, EVENTS_ROMANCE,
  EVENTS_NEMESIS, EVENTS_ISOLDE, EVENTS_COMPAGNONS,
  TREE, TREE_ELFES, COMPANIONS_POOL, LOC_COORDS, CHAMPIONS,
  UNIT_TYPES, BATTLES, TERRAINS, AFFINITES_DEPART, REGIONS, ROUTES, LOC_REGION,
  REPUTATION_DEPART, RANGS_REPUTATION, LOC_PEUPLE, REPUTATION_VOIX, SHOPS, BUTIN_PAR_PEUPLE,
  CONTRATS_LOCAUX, CONTRACT_COMPLICATIONS,
  CHANTIER, EVENTS_SUSPICION, POUVOIRS, EDITS, MAISONS, CHAINES, CRISES, PNJ_AUTONOMES,
  RESSOURCES, SOURCES, CONDITIONS_CHANTIER, KARLSBERG_PALIERS,
  SUCCESSION_PROFILS, SUCCESSION_ETATS, SUCCESSION_FINS,
  EPI_OUVERTURE, EPI_NOM, EPI_PEUPLES, EPI_GENS, EPI_NEMESIS, EPI_EMPIRE, EPI_LIGNEE, EPI_ONDE, EPI_LEGS,
} = vm.runInContext(`({
  BESTIARY_FULL, PORTRAITS, LOCATIONS, ITEM_POOL,
  EVENTS_WRITTEN, EVENTS_RENCONTRE, EXPLORATIONS_VIDES, EVENTS_TRAME, CONTRATS_SPECIAUX, EVENTS_ROMANCE,
  EVENTS_NEMESIS, EVENTS_ISOLDE, EVENTS_COMPAGNONS,
  TREE, TREE_ELFES, COMPANIONS_POOL, LOC_COORDS, CHAMPIONS,
  UNIT_TYPES, BATTLES, TERRAINS, AFFINITES_DEPART, REGIONS, ROUTES, LOC_REGION,
  REPUTATION_DEPART, RANGS_REPUTATION, LOC_PEUPLE, REPUTATION_VOIX, SHOPS, BUTIN_PAR_PEUPLE,
  CONTRATS_LOCAUX, CONTRACT_COMPLICATIONS,
  CHANTIER, EVENTS_SUSPICION, POUVOIRS, EDITS, MAISONS, CHAINES, CRISES, PNJ_AUTONOMES,
  RESSOURCES, SOURCES, CONDITIONS_CHANTIER, KARLSBERG_PALIERS,
  SUCCESSION_PROFILS, SUCCESSION_ETATS, SUCCESSION_FINS,
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
  // Une étape de chaîne est un événement écrit ordinaire : elle passe par les
  // mêmes contrôles de scènes, de créatures, d'objets et de portraits.
  ...CHAINES.flatMap(ch => ch.etapes.map(e => ({ ev:e.ev, cat:'chaine' }))),
];
// Certains marqueurs sont posés par le moteur et non par un effet de contenu :
// on les déclare ici pour que le contrôle des marqueurs orphelins reste utile.
const MARQUEURS_MOTEUR = [
  'prix_noble_accepte',   // src/lignee.js — Prix du Paria réclamé et consenti
  'onde_devant_armee',    // src/battle.js — Coup de l'Onde employé en bataille
  'descendance',          // src/lignee.js — première naissance
  'heritier_paria',       // src/lignee.js — un enfant porte l'Onde
  'chronique_terminee',   // src/epilogue.js — la chronique est allée à son terme
  'lien_clarification_due', // src/liens.js — deux promesses qui ne tiennent pas ensemble
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
    /* Une scène peut se composer à l'ouverture (texteDyn/choixDyn) : c'est
     * ainsi qu'un refus dit sa raison au lieu de tomber sur un dé. On ne peut
     * pas l'exécuter ici, mais on peut lire les scènes qu'elle vise. */
    const dynamique = !!(sc.texteDyn || sc.choixDyn);
    if(!dynamique && (!sc.texte || !sc.texte.length)) err(`${nom}/${id} : scène sans texte`);
    if(sc.texteDyn && typeof sc.texteDyn !== 'function') err(`${nom}/${id} : texteDyn n'est pas une fonction`);
    if(sc.choixDyn && typeof sc.choixDyn !== 'function') err(`${nom}/${id} : choixDyn n'est pas une fonction`);
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
    } else if(sc.choixDyn){
      /* On relit la source de la fabrique de choix pour savoir où elle mène :
       * une scène visée qui n'existe pas casserait le récit à l'exécution. */
      const src = sc.choixDyn.toString();
      for(const m of src.matchAll(/(?:suite|reussite|echec):\s*"([a-z0-9_]+)"/g)) suivantes.push(m[1]);
      for(const m of src.matchAll(/label:\s*"[^"]+"/g)) nbChoix++;
      if(!suivantes.length) err(`${nom}/${id} : choixDyn ne mène nulle part`);
    } else if(sc.suite){
      // Scène de liaison : un battement de récit qui mène ailleurs sans choix.
      suivantes.push(sc.suite);
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
/* Les huit passages de lieu épuisé : ils remplacent deux cents variantes
 * générées, et ils doivent rester ce qu'ils sont — courts, écrits, sans
 * conséquence, et sans choix qui ferait croire à une décision. */
EXPLORATIONS_VIDES.forEach(e => {
  const ou = `EXPLORATION VIDE ${e.id}`;
  const sc = (e.scenes || {}).start;
  if(!sc) err(`${ou} : pas de scène start`);
  else {
    if(!sc.fin) err(`${ou} : doit se terminer tout de suite`);
    if(sc.choix) err(`${ou} : ne doit pas offrir de choix — il ne se passe rien`);
    if(sc.effets) err(`${ou} : ne doit rien changer au monde`);
    if(!sc.texte || sc.texte.length < 2) err(`${ou} : trop court pour être lu`);
  }
});

/* ---- Rapport ---- */
console.log(`Bestiaire   ${BESTIARY_FULL.length} créatures`);
console.log(`Lieux       ${LOCATIONS.length}`);
console.log(`Événements  ${EVENTS_WRITTEN.length} de lieu · ${EVENTS_RENCONTRE.length} rencontres · ${EVENTS_TRAME.length} jalons de trame`);
console.log(`            ${CONTRATS_SPECIAUX.length} contrats spéciaux · ${EVENTS_ROMANCE.length} attachements`);
console.log(`            ${nbScenes} scènes, ${nbChoix} choix, ${nbCombats} affrontements, ${nbBatailles} batailles · + ${EXPLORATIONS_VIDES.length} passages de lieu épuisé`);
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
    // Bornes des deux côtés : « Orsen » ne doit pas se déclencher sur « Orsenne ».
    const cites = NOMS_SCENE.filter(([, m]) =>
      new RegExp('\\b' + m.replace(/-/g, '\\-') + '\\b', 'i').test(txt));
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

/* ---- Les affaires écrites en chaînes ---- */
const chaineIds = new Set();
CHAINES.forEach(ch => {
  if(chaineIds.has(ch.id)) err(`CHAINES : identifiant en double « ${ch.id} »`);
  chaineIds.add(ch.id);
  if(!ch.etapes || !ch.etapes.length) err(`CHAINE ${ch.id} : aucune étape`);
  if(ch.type === 'contrat' && !ch.pitch)
    err(`CHAINE ${ch.id} : pas de pitch — elle ne peut pas s'afficher en offre`);
  // Une chaîne d'arrière-plan ne se propose jamais : elle se déclenche.
  if(ch.type !== 'contrat' && !ch.declencheur)
    err(`CHAINE ${ch.id} : ni contrat ni déclencheur — rien ne pourrait l'ouvrir`);
  if(ch.declencheur){
    const d = ch.declencheur;
    (d.flags || []).forEach(f => {
      if(!marqueursPoses.has(f))
        err(`CHAINE ${ch.id} : se déclenche sur « ${f} », que rien ne pose — elle dormirait pour toujours`);
    });
    (d.sansFlags || []).forEach(f => {
      if(!marqueursPoses.has(f))
        warn(`CHAINE ${ch.id} : exclue par « ${f} », que rien ne pose`);
    });
    if(d.apres && (d.apres[0] > d.apres[1] || d.apres[0] < 0))
      err(`CHAINE ${ch.id} : délai de déclenchement incohérent`);
  }
  (ch.lieux || []).forEach(l => { if(!locIds.has(l)) err(`CHAINE ${ch.id} : lieu inconnu ${l}`); });
  if(ch.maison && !MAISONS[ch.maison]) err(`CHAINE ${ch.id} : maison inconnue « ${ch.maison} »`);
  if(ch.prix && !ch.maison) err(`CHAINE ${ch.id} : réclame le Prix du Paria sans maison noble`);

  const etIds = new Set();
  ch.etapes.forEach(e => {
    if(etIds.has(e.id)) err(`CHAINE ${ch.id} : étape en double « ${e.id} »`);
    etIds.add(e.id);
    if(e.delai && (e.delai[0] > e.delai[1] || e.delai[0] < 0))
      err(`CHAINE ${ch.id}/${e.id} : délai incohérent`);
  });
  // Toute étape nommée par une autre doit exister, et toute étape doit être
  // atteignable depuis la première — sinon on écrit dans le vide.
  const atteintes = new Set([ch.etapes[0].id]);
  const nomme = [];
  ch.etapes.forEach(e => {
    if(e.suite) nomme.push([e.id, e.suite]);
    if(e.sinon) nomme.push([e.id, e.sinon]);
    Object.values(e.ev.scenes || {}).forEach(sc => {
      const eff = [sc.effets, ...(sc.choix || []).map(c => c.effets)].filter(Boolean);
      eff.forEach(f => {
        if(f.etape) nomme.push([e.id, f.etape]);
        if(f.issue && !(ch.issues || {})[f.issue])
          err(`CHAINE ${ch.id}/${e.id} : issue « ${f.issue} » sans ligne de chronique`);
      });
    });
  });
  nomme.forEach(([de, vers]) => {
    if(!etIds.has(vers)) err(`CHAINE ${ch.id}/${de} : renvoie vers l'étape inconnue « ${vers} »`);
    else atteintes.add(vers);
  });
  // L'enchaînement par défaut relie chaque étape à la suivante, sauf si la
  // précédente redirige toujours ailleurs.
  // Une étape peut rediriger sur certaines branches et retomber sur l'étape
  // suivante pour les autres : l'enchaînement par défaut existe dès qu'un
  // aboutissement ne nomme ni étape ni issue.
  ch.etapes.forEach((e, i) => {
    const nomme = f => !!(f && (f.etape || f.issue));
    const retombe = Object.values(e.ev.scenes || {}).some(sc => {
      if(sc.choix && sc.choix.length) return sc.choix.some(c => !nomme(c.effets) && !c.suite && !c.test);
      if(sc.suite) return false;                       // scène de liaison
      return !nomme(sc.effets);                        // aboutissement muet
    });
    if(retombe && !e.suite && i + 1 < ch.etapes.length) atteintes.add(ch.etapes[i + 1].id);
  });
  ch.etapes.forEach(e => {
    if(!atteintes.has(e.id)) warn(`CHAINE ${ch.id} : étape inatteignable → ${e.id}`);
  });
  // Une chaîne payée doit pouvoir l'être.
  (ch.paye || []).forEach(i => {
    if(!(ch.issues || {})[i]) err(`CHAINE ${ch.id} : l'issue payée « ${i} » n'existe pas`);
  });
  // Un choix verrouillé par un marqueur que rien ne pose est un choix mort :
  // il s'affiche grisé pour toujours et l'auteur ne s'en aperçoit jamais.
  ch.etapes.forEach(e => {
    Object.entries(e.ev.scenes || {}).forEach(([sid, sc]) => {
      (sc.choix || []).forEach(c => {
        const f = c.requis && c.requis.flag;
        if(f && !marqueursPoses.has(f))
          err(`CHAINE ${ch.id}/${e.id}/${sid} : le choix « ${c.label} » exige le marqueur `
              + `« ${f} », que rien ne pose — il resterait grisé pour toujours`);
      });
      // Même chose pour une étape verrouillée par un marqueur fantôme.
    });
    const rf = e.requis && e.requis.flags;
    (rf || []).forEach(f => {
      if(!marqueursPoses.has(f))
        err(`CHAINE ${ch.id}/${e.id} : étape conditionnée au marqueur « ${f} », que rien ne pose`);
    });
  });
  if(ch.or && !(ch.paye || []).length) warn(`CHAINE ${ch.id} : de l'or annoncé, aucune issue qui paie`);
});

/* ---- Les cinq crises régionales ----
 * Une crise doit avoir cinq étapes nommées, écrites, franchissables dans
 * l'ordre — et ce qui la pousse doit se lire dans des marqueurs qui existent
 * vraiment. Une condition sur un marqueur fantôme est une raison qui n'arrive
 * jamais : la crise retomberait au tirage de base, c'est-à-dire au hasard. */
const peuplesConnus = new Set(Object.keys(REPUTATION_DEPART));
const criseIds = new Set();
CRISES.forEach(c => {
  if(criseIds.has(c.id)) err(`CRISE ${c.id} : identifiant en double`);
  criseIds.add(c.id);
  if(!c.nom || !c.acteurs || !c.veille) err(`CRISE ${c.id} : nom, acteurs ou ligne de veille manquants`);
  (c.peuples || []).forEach(p => {
    if(!peuplesConnus.has(p)) err(`CRISE ${c.id} : peuple « ${p} » inconnu de la réputation`);
  });
  if(!Array.isArray(c.paliers) || c.paliers.length !== 5)
    err(`CRISE ${c.id} : ${(c.paliers||[]).length} étapes au lieu de cinq`);
  (c.paliers || []).forEach((p, i) => {
    const ou = `CRISE ${c.id}/${i+1}`;
    if(!p.nom)       err(`${ou} : étape sans nom`);
    if(!p.resume)    err(`${ou} : étape sans résumé affichable`);
    if(!p.chronique) err(`${ou} : étape sans chronique écrite`);
    if(p.chronique && p.chronique.length < 40) warn(`${ou} : chronique très courte`);
    if(typeof p.seuil !== 'number' || p.seuil <= 0) err(`${ou} : seuil absent ou nul`);
    if(i < 4 && (c.paliers[i+1].seuil || 0) < p.seuil)
      warn(`${ou} : l'étape suivante est moins chère à franchir que celle-ci`);
    noterMarqueurs(p.effets);
    for(const k of Object.keys((p.effets || {}).reputation || {}))
      if(!peuplesConnus.has(k)) err(`${ou} : peuple « ${k} » inconnu de la réputation`);
  });
  if(typeof c.pression !== 'function') err(`CRISE ${c.id} : pas de fonction pression()`);
});

/* Les marqueurs lus par pression() sont dans le corps des fonctions : on les
 * relit à la source, c'est la seule façon de les attraper. */
const sourceCrises = fs.readFileSync(path.join(racine, 'src/data/crises.js'), 'utf8');
const marqueursDeCrise = new Set();
for(const m of sourceCrises.matchAll(/hasFlag\('([a-z0-9_]+)'\)/g)) marqueursDeCrise.add(m[1]);
marqueursDeCrise.forEach(f => {
  if(!marqueursPoses.has(f))
    err(`CRISES : la pression lit le marqueur « ${f} », que rien ne pose — cette raison n'arriverait jamais`);
});
/* Et les crises qu'elles se lisent entre elles doivent exister. */
for(const m of sourceCrises.matchAll(/criseEtape\('([A-Z_]+)'\)/g)){
  if(!criseIds.has(m[1])) err(`CRISES : pression lue sur la crise « ${m[1]} », qui n'existe pas`);
}

/* ---- Les neuf acteurs autonomes ----
 * Une personne, pas une statistique : un âge, un lieu, une maison, des traits,
 * des ambitions, ce qu'elle retiendra de Yohan et ce qu'elle est capable de
 * faire toute seule. Un marqueur qu'elle guette et que rien ne pose est un
 * souvenir qu'elle n'aura jamais. */
/* Les marqueurs qu'ils posent en agissant — à collecter avant de vérifier ce
 * qu'ils guettent, puisqu'ils se souviennent aussi des actes les uns des autres. */
const sourcePnj = fs.readFileSync(path.join(racine, 'src/data/pnj_autonomes.js'), 'utf8');
for(const m of sourcePnj.matchAll(/flags:\[([^\]]*)\]/g))
  for(const f of m[1].matchAll(/'([a-z0-9_]+)'/g)) marqueursPoses.add(f[1]);
for(const m of sourcePnj.matchAll(/\bflag:\s*'([a-z0-9_]+)'/g)) marqueursPoses.add(m[1]);

const pnjIds = new Set();
PNJ_AUTONOMES.forEach(p => {
  const ou = `PNJ ${p.id}`;
  if(pnjIds.has(p.id)) err(`${ou} : identifiant en double`);
  pnjIds.add(p.id);
  if(!p.nom || !p.maison || !p.lieu) err(`${ou} : nom, maison ou localisation manquants`);
  if(typeof p.age !== 'number' || p.age <= 0) err(`${ou} : âge absent`);
  if(!peuplesConnus.has(p.peuple)) err(`${ou} : peuple « ${p.peuple} » inconnu de la réputation`);
  if(!portrIds.has(p.portrait)) err(`${ou} : aucun portrait « ${p.portrait} »`);
  if((p.traits || []).length < 2)    err(`${ou} : moins de deux traits`);
  if((p.ambitions || []).length < 1) err(`${ou} : aucune ambition`);
  if(typeof p.objectif !== 'function') err(`${ou} : pas d'objectif() qui suive le monde`);
  if(typeof p.opinion !== 'function')  err(`${ou} : pas d'opinion()`);
  if((p.retient || []).length < 3)     err(`${ou} : moins de trois souvenirs possibles`);
  (p.retient || []).forEach(r => {
    if(!marqueursPoses.has(r.flag))
      err(`${ou} : retient le marqueur « ${r.flag} », que rien ne pose — ce souvenir n'arrivera jamais`);
    if(!r.texte || r.texte.length < 20) err(`${ou}/${r.flag} : souvenir sans texte lisible`);
    if(typeof r.opinion !== 'number')   err(`${ou}/${r.flag} : souvenir sans effet sur l'opinion`);
  });
  if((p.actions || []).length < 3) err(`${ou} : moins de trois actes possibles`);
  const actIds = new Set();
  (p.actions || []).forEach(a => {
    const oa = `${ou}/${a.id}`;
    if(actIds.has(a.id)) err(`${oa} : acte en double`);
    actIds.add(a.id);
    if(typeof a.poids !== 'function') err(`${oa} : pas de poids() — il agirait n'importe quand`);
    if(typeof a.fait  !== 'function') err(`${oa} : pas de fait()`);
  });
});
for(const m of sourcePnj.matchAll(/criseEtape\('([A-Z_]+)'\)/g))
  if(!criseIds.has(m[1])) err(`PNJ : décision prise sur la crise « ${m[1]} », qui n'existe pas`);
for(const m of sourcePnj.matchAll(/crise:\s*\{\s*id:'([A-Z_]+)'/g))
  if(!criseIds.has(m[1])) err(`PNJ : acte qui pousse la crise « ${m[1]} », qui n'existe pas`);
for(const m of sourcePnj.matchAll(/pnjOpinion\('([a-z]+)'\)/g))
  if(!pnjIds.has(m[1])) err(`PNJ : opinion lue sur « ${m[1]} », qui n'est pas des neuf`);

/* ---- Ce avec quoi on relève Karlsberg ----
 * La règle du document fondateur : jamais « payer X or ». Un ouvrage au-delà du
 * premier doit donc coûter autre chose que de l'or, et cet autre chose doit
 * pouvoir venir de quelque part — une source accrochée à un marqueur fantôme
 * est un mur définitif. */
/* Les ouvrages posent des marqueurs, et certaines sources les guettent : on les
 * collecte avant de vérifier les sources. */
CHANTIER.forEach(o => noterMarqueurs(o.effet));

const resIds = new Set(Object.keys(RESSOURCES));
const sourcesParRes = {};
SOURCES.forEach(s => {
  const ou = `SOURCE ${s.flag}`;
  if(!resIds.has(s.res)) err(`${ou} : ressource « ${s.res} » inconnue`);
  if(!marqueursPoses.has(s.flag))
    err(`${ou} : accrochée à un marqueur que rien ne pose — cette source n'ouvrirait jamais`);
  if(!s.quoi || !s.pourquoi) err(`${ou} : sans nom ni raison affichable`);
  if(typeof s.n !== 'number' || s.n <= 0) err(`${ou} : rendement absent`);
  sourcesParRes[s.res] = (sourcesParRes[s.res] || 0) + 1;
});
resIds.forEach(r => {
  if(!sourcesParRes[r]) err(`RESSOURCE ${r} : aucune source ne l'apporte`);
  else if(sourcesParRes[r] < 3) warn(`RESSOURCE ${r} : seulement ${sourcesParRes[r]} source(s)`);
});
Object.entries(CONDITIONS_CHANTIER).forEach(([id, c]) => {
  if(!c.nom || !c.manque) err(`CONDITION ${id} : sans nom ni phrase de refus`);
  (c.flags || []).forEach(f => {
    if(!marqueursPoses.has(f)) err(`CONDITION ${id} : marqueur « ${f} » jamais posé`);
  });
  if(!(c.flags || []).length) err(`CONDITION ${id} : aucune façon de la remplir`);
});
const ouvragesConnus = new Set(CHANTIER.map(o => o.id));
CHANTIER.forEach(o => {
  const ou = `CHANTIER ${o.id}`;
  for(const k of Object.keys(o.cout || {}))
    if(!resIds.has(k)) err(`${ou} : coût en « ${k} », qui n'est pas une ressource`);
  (o.exige || []).forEach(c => {
    if(!CONDITIONS_CHANTIER[c]) err(`${ou} : condition « ${c} » inconnue`);
  });
  /* La règle, appliquée : seul le tout premier ouvrage peut ne rien demander
   * d'autre que de l'or et des bras. */
  if(o.id !== 'ch_cour' && !Object.keys(o.cout || {}).length)
    err(`${ou} : payé uniquement en or — c'est exactement ce que le document fondateur interdit`);
});
KARLSBERG_PALIERS.forEach(p => {
  if(!p.nom || !p.dit) err(`PALIER ${p.id} : sans nom ni phrase`);
  (p.exige || []).forEach(id => {
    if(!ouvragesConnus.has(id)) err(`PALIER ${p.id} : exige l'ouvrage « ${id} », qui n'existe pas`);
  });
});

/* ---- La succession ----
 * Chaque état de Karlsberg doit avoir sa phrase d'héritage, sinon l'héritier
 * arrive dans une maison que le jeu ne sait pas décrire. */
Object.entries(SUCCESSION_PROFILS).forEach(([id, p]) => {
  if(!p.nom || !p.dit) err(`SUCCESSION ${id} : sans nom ni phrase`);
  if(p.dit && p.dit.length < 40) warn(`SUCCESSION ${id} : phrase très courte`);
  (p.flags || []).forEach(f => marqueursPoses.add(f));
  if(typeof p.suspicionGardee !== 'number' || p.suspicionGardee < 0 || p.suspicionGardee > 1)
    err(`SUCCESSION ${id} : part de Suspicion conservée hors bornes`);
});
KARLSBERG_PALIERS.forEach(p => {
  if(!SUCCESSION_ETATS[p.id])
    err(`SUCCESSION : aucune phrase d'héritage pour l'état « ${p.id} »`);
});
SUCCESSION_FINS.forEach(f => {
  if(!f.titre || !f.texte) err(`SUCCESSION fin ${f.id} : sans titre ni texte`);
  if(typeof f.si !== 'function') err(`SUCCESSION fin ${f.id} : sans condition`);
});

/* ---- Les maisons nobles et le Prix ---- */
let nbNobles = 0, maisonsVides = 0;
Object.entries(MAISONS).forEach(([nom, m]) => {
  if(!Array.isArray(m.nobles)) { err(`MAISONS ${nom} : pas de liste de nobles`); return; }
  if(!m.nobles.length){ maisonsVides++; return; }
  m.nobles.forEach(n => {
    nbNobles++;
    if(!n.nom || !n.rang || !n.note) err(`MAISONS ${nom} : une noble sans nom, rang ou note`);
    if(!(n.age >= 18)) err(`MAISONS ${nom}/${n.nom} : le Prix ne peut engager qu'une adulte`);
    if(!n.accord) err(`MAISONS ${nom}/${n.nom} : aucune phrase de consentement`);
    const exigeante = n.exige && Object.keys(n.exige).length;
    if(exigeante && !n.refus) err(`MAISONS ${nom}/${n.nom} : elle peut refuser sans dire pourquoi`);
  });
});
if(!maisonsVides) warn("MAISONS : aucune maison sans candidate — le Prix n'est jamais indisponible");
// Toute maison qui commandite une affaire doit avoir un rôle écrit, sinon la
// moitié « Sang » du Prix disparaît sans que personne s'en aperçoive.
[...new Set(CHAINES.map(c => c.commanditaire).concat(CHAINES.map(c => c.maison)))]
  .filter(q => q && /^Maison /.test(q))
  .forEach(q => { if(!MAISONS[q]) err(`MAISONS : « ${q} » commandite une affaire sans avoir de rôle écrit`); });
console.log(`Chaînes     ${CHAINES.length} affaires · ${CHAINES.reduce((s,c)=>s+c.etapes.length,0)} étapes`);
console.log(`Maisons     ${Object.keys(MAISONS).length} maisons · ${nbNobles} nobles adultes · ${maisonsVides} sans candidate`);
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
console.log(`Karlsberg   ${CHANTIER.length} ouvrages · ${KARLSBERG_PALIERS.length} états · ${SOURCES.length} sources de ressources`);
console.log(`Personnages ${PNJ_AUTONOMES.length} acteurs autonomes · ${PNJ_AUTONOMES.reduce((s,p)=>s+p.actions.length,0)} actes · ${PNJ_AUTONOMES.reduce((s,p)=>s+p.retient.length,0)} souvenirs possibles`);
console.log(`Crises      ${CRISES.length} régionales · ${CRISES.reduce((s,c)=>s+c.paliers.length,0)} étapes nommées`);
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
