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
  'src/data/events_written.js', 'src/data/events_written_2.js',
  'src/data/events_meetings.js', 'src/data/events_trame.js',
  'src/data/contracts_special.js', 'src/data/romances.js',
  'src/data/events_nemesis.js', 'src/data/reputation.js', 'src/data/epilogue.js',
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
  EVENTS_NEMESIS, TREE, TREE_ELFES, COMPANIONS_POOL, LOC_COORDS, CHAMPIONS,
  UNIT_TYPES, BATTLES, TERRAINS, AFFINITES_DEPART,
  REPUTATION_DEPART, RANGS_REPUTATION, LOC_PEUPLE, REPUTATION_VOIX, SHOPS, BUTIN_PAR_PEUPLE,
  EPI_OUVERTURE, EPI_NOM, EPI_PEUPLES, EPI_GENS, EPI_NEMESIS, EPI_ONDE, EPI_LEGS,
} = vm.runInContext(`({
  BESTIARY_FULL, PORTRAITS, LOCATIONS, EVENTS, CONTRACTS, ITEM_POOL,
  EVENTS_WRITTEN, EVENTS_RENCONTRE, EVENTS_TRAME, CONTRATS_SPECIAUX, EVENTS_ROMANCE,
  EVENTS_NEMESIS, TREE, TREE_ELFES, COMPANIONS_POOL, LOC_COORDS, CHAMPIONS,
  UNIT_TYPES, BATTLES, TERRAINS, AFFINITES_DEPART,
  REPUTATION_DEPART, RANGS_REPUTATION, LOC_PEUPLE, REPUTATION_VOIX, SHOPS, BUTIN_PAR_PEUPLE,
  EPI_OUVERTURE, EPI_NOM, EPI_PEUPLES, EPI_GENS, EPI_NEMESIS, EPI_ONDE, EPI_LEGS
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
  ['EPI_GENS', EPI_GENS], ['EPI_NEMESIS', EPI_NEMESIS], ['EPI_ONDE', EPI_ONDE], ['EPI_LEGS', EPI_LEGS],
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
[['EPI_OUVERTURE', EPI_OUVERTURE], ['EPI_NOM', EPI_NOM], ['EPI_ONDE', EPI_ONDE],
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
