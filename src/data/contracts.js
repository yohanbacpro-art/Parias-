/* PARIAS — Contrats (Content Pack V1.4)
 *
 * Le pack source contient 50 contrats dérivés de 10 archétypes. Les champs
 * `etapes`, `complications` et `issues` y sont strictement templatés (identiques
 * d'un contrat à l'autre, aux variables {commanditaire}/{lieu}/{type} près), et
 * `prix_paria` ne varie que par le nom de la noble proposée.
 *
 * On garde donc ici ce qui varie réellement (archétype + id + or + noble), et on
 * reconstruit le reste à l'expansion : CONTRACTS est identique au pack, mais
 * éditable sans recopier 50 fois les mêmes paragraphes.
 */

const CONTRACT_ARCHETYPES = [
  {base:"La Wyverne de Cendrepont",           commanditaire:"Maison de Valombre",  lieu:"Route Grise",               type:"chasse",        danger:"modéré",          pitch:"Une immense wyverne a établi son nid au-dessus d'une route commerciale."},
  {base:"Le Chevalier sans Visage",           commanditaire:"Maison Rochebrune",   lieu:"Côte des Dents",            type:"chasse",        danger:"dangereux",       pitch:"Une armure sans visage massacre les voyageurs après le coucher du soleil."},
  {base:"L'Héritier disparu",                 commanditaire:"Maison d'Arquenay",   lieu:"contreforts nains",         type:"sauvetage",     danger:"très dangereux",  pitch:"Le jeune héritier de la maison n'est jamais revenu d'une expédition."},
  {base:"Les Trois Frères Rouges",            commanditaire:"Maison de Vauclair",  lieu:"marais de Sombreval",       type:"traque",        danger:"extrême",         pitch:"Trois mercenaires ont assassiné un noble avant de fuir avec ses archives."},
  {base:"Le Troll du vieux pont",             commanditaire:"Maison de Sombreval", lieu:"Champs de Cendre",          type:"chasse",        danger:"légendaire",      pitch:"Un troll a coupé l'unique route permettant aux récoltes de rejoindre la ville."},
  {base:"La Dame captive",                    commanditaire:"Maison de Hauterive", lieu:"forêts de Valombre",        type:"sauvetage",     danger:"modéré",          pitch:"Une noble a été capturée par une bande installée dans une forteresse abandonnée."},
  {base:"Le Livre de Sang",                   commanditaire:"Maison de Cendrepont",lieu:"ruines impériales",         type:"récupération",  danger:"dangereux",       pitch:"Un registre susceptible de révéler d'anciennes filiations a été volé."},
  {base:"Le Capitaine félon",                 commanditaire:"Maison de Bellac",    lieu:"Défilé des Souffrances",    type:"traque",        danger:"très dangereux",  pitch:"Un capitaine a déserté avec la solde et plusieurs dizaines d'hommes."},
  {base:"La Bête sous la chapelle",           commanditaire:"Maison de Corven",    lieu:"frontière de Mont-Draken",  type:"enquête",       danger:"extrême",         pitch:"Des habitants disparaissent autour d'une chapelle que personne n'ose ouvrir."},
  {base:"Le Seigneur de guerre Peau-Verte",   commanditaire:"Maison de Brézé",     lieu:"Dunes Khesh",               type:"guerre",        danger:"légendaire",      pitch:"Un chef Peau-Verte rassemble plusieurs bandes près d'un passage stratégique."},
];

// [archétype, id, or, nom de la noble proposée (null = contrat générique, sans Prix du Paria)]
// suffixe : à partir de CTR_PARIA_011 le titre porte le nom de la maison commanditaire.
const CONTRACT_ROWS = [
  [0,"CTR_PARIA_001",250,"Lady Éléonore",false], [1,"CTR_PARIA_002",375,"Lady Isabeau",false],
  [2,"CTR_PARIA_003",500,"Lady Adélaïde",false], [3,"CTR_PARIA_004",875,"Lady Mathilde",false],
  [4,"CTR_PARIA_005",750,"Lady Aliénor",false],  [5,"CTR_PARIA_006",875,"Lady Constance",false],
  [6,"CTR_PARIA_007",1000,"Lady Marguerite",false],[7,"CTR_PARIA_008",1375,"Lady Héloïse",false],
  [8,"CTR_PARIA_009",1250,"Lady Blanche",false], [9,"CTR_PARIA_010",1375,"Lady Célestine",false],

  [0,"CTR_PARIA_011",250,"Lady Agnès",true],     [1,"CTR_PARIA_012",625,"Lady Philippa",true],
  [2,"CTR_PARIA_013",500,"Lady Ysabeau",true],   [3,"CTR_PARIA_014",625,"Lady Aveline",true],
  [4,"CTR_PARIA_015",750,"Lady Béatrice",true],  [5,"CTR_PARIA_016",1125,"Lady Rosamonde",true],
  [6,"CTR_PARIA_017",1000,"Lady Mélisende",true],[7,"CTR_PARIA_018",1125,"Lady Clarisse",true],
  [8,"CTR_PARIA_019",1250,"Lady Diane",true],    [9,"CTR_PARIA_020",1625,"Lady Ophélie",true],

  [0,"CTR_PARIA_021",250,"Lady Éléonore",true],  [1,"CTR_PARIA_022",375,"Lady Isabeau",true],
  [2,"CTR_PARIA_023",500,"Lady Adélaïde",true],  [3,"CTR_PARIA_024",875,"Lady Mathilde",true],
  [4,"CTR_PARIA_025",750,"Lady Aliénor",true],   [5,"CTR_PARIA_026",875,"Lady Constance",true],
  [6,"CTR_PARIA_027",1000,"Lady Marguerite",true],[7,"CTR_PARIA_028",1375,"Lady Héloïse",true],
  [8,"CTR_PARIA_029",1250,"Lady Blanche",true],  [9,"CTR_PARIA_030",1375,"Lady Célestine",true],

  [0,"CTR_GEN_031",250,null,true],  [1,"CTR_GEN_032",625,null,true],
  [2,"CTR_GEN_033",500,null,true],  [3,"CTR_GEN_034",625,null,true],
  [4,"CTR_GEN_035",750,null,true],  [5,"CTR_GEN_036",1125,null,true],
  [6,"CTR_GEN_037",1000,null,true], [7,"CTR_GEN_038",1125,null,true],
  [8,"CTR_GEN_039",1250,null,true], [9,"CTR_GEN_040",1625,null,true],

  [0,"CTR_GEN_041",250,null,true],  [1,"CTR_GEN_042",375,null,true],
  [2,"CTR_GEN_043",500,null,true],  [3,"CTR_GEN_044",875,null,true],
  [4,"CTR_GEN_045",750,null,true],  [5,"CTR_GEN_046",875,null,true],
  [6,"CTR_GEN_047",1000,null,true], [7,"CTR_GEN_048",1375,null,true],
  [8,"CTR_GEN_049",1250,null,true], [9,"CTR_GEN_050",1375,null,true],
];

const CONTRACT_COMPLICATIONS = ["cible différente des rumeurs", "rival engagé sur le même contrat", "trahison locale", "innocents présents", "objectif secondaire découvert"];
const CONTRACT_ISSUES = ["succès complet", "succès avec complication", "échec", "abandon", "retournement contre le commanditaire"];

const CONTRACTS = CONTRACT_ROWS.map(([archIdx, id, or, noble, suffixe]) => {
  const a = CONTRACT_ARCHETYPES[archIdx];
  const maison = a.commanditaire.replace("Maison ", "");
  return {
    id,
    titre: suffixe ? `${a.base} — ${maison}` : a.base,
    commanditaire: a.commanditaire,
    lieu: a.lieu,
    type: a.type,
    danger: a.danger,
    pitch: a.pitch,
    or,
    etapes: [
      {nom:"Audience",    contenu:`${a.commanditaire} expose le problème et négocie les termes avant toute action.`},
      {nom:"Préparation", contenu:`Le joueur peut enquêter, acheter du matériel, recruter ou partir immédiatement vers ${a.lieu}.`},
      {nom:"Approche",    contenu:"Une complication contextuelle est tirée : témoin, fausse piste, embuscade, météo, rival ou information inattendue."},
      {nom:"Résolution",  contenu:`La mission mène à une résolution de type ${a.type} : combat, duel, infiltration, négociation ou poursuite selon les choix.`},
      {nom:"Retour",      contenu:"Le monde enregistre le succès, l'échec ou les conséquences incomplètes ; les relations et réputations évoluent."},
    ],
    complications: CONTRACT_COMPLICATIONS,
    issues: CONTRACT_ISSUES,
    prix_paria: noble ? {
      negocie_avant_depart: true,
      noble_proposee: {nom: noble, maison: a.commanditaire, adulte: true, consentement_requis: true},
      choix: ["OR", "NOBLE_CONSENTANTE", "OR_ET_NOBLE_CONSENTANTE", "NEGOCIER", "REFUSER"],
      effets_relationnels: {
        contrat_reussi: "relation positive avec la maison",
        noble: "relation persistante avec le Paria si elle fait partie du prix accepté",
      },
      descendance: {
        possible_apres_relation: true,
        automatique: false,
        verification: "lors des avancées de temps pertinentes",
        facteurs: ["temps", "relation", "rencontres", "contexte"],
        enfant: "PNJ persistant, fils ou fille, lié aux deux maisons",
        potentiel_paria: "héritage latent probabiliste",
      },
    } : null,
  };
});

/* ---- Résolution mécanique ---- */
const STEP_NAMES = ["Audience","Préparation","Approche","Résolution","Retour"];
const DANGER_MAP = {"modéré":[1,2],"dangereux":[2,3],"très dangereux":[3,4],"extrême":[4,5],"légendaire":[5,6]};

/* ---- Habillage narratif des phases ----
 * Le texte source (etapes.contenu) est un squelette quasi identique recopié sur les 50
 * contrats. On ne s'en sert donc pas comme texte affiché : chaque phase est un vrai
 * paragraphe reconstruit à partir de ce qui est propre à CE contrat (titre, pitch,
 * commanditaire, lieu, danger, type), avec plusieurs variantes tirées au hasard.
 */
const DANGER_QUALIF = {"modéré":"une affaire sérieuse, sans plus", "dangereux":"une affaire qui ne pardonne pas l'imprudence", "très dangereux":"une affaire qui a déjà coûté la vie à d'autres", "extrême":"une affaire dont peu reviennent indemnes", "légendaire":"une affaire dont on parlera encore dans un siècle, d'une manière ou d'une autre"};
const TYPE_ENJEU = {
  chasse:"traquer et abattre une créature qui ne cessera pas d'elle-même",
  sauvetage:"ramener quelqu'un vivant, avant qu'il ne soit trop tard",
  traque:"retrouver une cible qui ne veut pas être retrouvée",
  "récupération":"remettre la main sur quelque chose que d'autres convoitent tout autant",
  "enquête":"découvrir une vérité que certains préféreraient voir enterrée",
  guerre:"prendre position dans un conflit qui ne laissera personne indifférent",
};

const FRAME_PREP = [
  "{lieu} est encore loin, mais le nom « {titre} » occupe déjà toutes les pensées de Yohan. {commanditaire} n'a pas menti sur la gravité de la situation : c'est {qualif}. Il s'agit, au fond, de {enjeu} — et ce genre de mission ne laisse que peu de place à l'improvisation. Yohan vérifie une dernière fois son équipement avant de se mettre en route.",
  "Avant de partir pour {lieu}, Yohan repasse ce qu'il sait de « {titre} » — et surtout tout ce qu'il ignore encore. {commanditaire} a été clair sur un point : {qualif}. Réussir signifiera {enjeu}. Échouer aura un prix, pour Yohan comme pour ceux qui attendent son retour.",
  "Ce qu'on raconte sur « {titre} » ne suffit pas à savoir précisément à quoi s'attendre une fois arrivé à {lieu}. {commanditaire} parle de {qualif} sans vraiment chercher à rassurer Yohan. Mais l'enjeu est simple à formuler, même s'il ne l'est pas à accomplir : {enjeu}.",
];
const FRAME_APPROCHE = [
  "{lieu} se dessine enfin à l'horizon, et avec elle, la première vraie confrontation avec ce que cache « {titre} ». L'air a changé, ici — plus lourd, plus attentif. Yohan sait qu'il n'a plus le luxe de l'hésitation : {enjeu} ne se fera pas en reculant.",
  "Plus Yohan approche de {lieu}, plus le nom « {titre} » semble peser sur l'air lui-même. Chaque pas rapproche un peu plus du moment où {qualif} cessera d'être une simple mise en garde pour devenir une réalité concrète. Il n'y a plus de retour en arrière possible désormais.",
  "Il n'y a plus de retour en arrière : {lieu} est là, et « {titre} » avec elle. Yohan ralentit, observe, cherche le détail qui pourrait faire toute la différence. {commanditaire} attend un résultat — pas des excuses.",
];
const FRAME_RESOLUTION = [
  "Ce que {commanditaire} appelait « {titre} » a enfin un visage. Tout ce qui a mené jusqu'ici — {lieu}, les mises en garde, les doutes — converge en cet instant précis. Il n'y a plus de place pour la prudence excessive : il faut {enjeu}, maintenant ou jamais.",
  "« {titre} » cesse d'être une rumeur : Yohan y fait face, à {lieu}, sans plus aucun filtre entre lui et ce qu'il est venu accomplir. {qualif}, avait prévenu {commanditaire}. Yohan comprend enfin pourquoi.",
  "Tout ce qui a mené jusqu'ici converge en cet instant. {lieu} n'est plus une destination : c'est le lieu où Yohan devra {enjeu}, quel qu'en soit le prix à payer.",
];
const FRAME_RETOUR_SUCCESS = [
  "« {titre} » n'est plus une menace. {commanditaire} accueille la nouvelle avec un soulagement qu'il peine à cacher, et tiendra parole — cette affaire-là, au moins, restera derrière Yohan.",
  "L'affaire que {commanditaire} appelait « {titre} » trouve enfin sa fin — du moins celle que Yohan lui a donnée. Ce genre de victoire ne se fête jamais bien longtemps, mais elle compte.",
  "Ce qui inquiétait {commanditaire} sous le nom de « {titre} » appartient désormais au passé. Le prix payé pour y parvenir, lui, reste bien réel.",
];
const FRAME_RETOUR_FAIL = [
  "« {titre} » reste un problème irrésolu, et {commanditaire} le sait déjà. Ce genre d'échec ne s'oublie pas facilement — ni pour Yohan, ni pour ceux qui comptaient sur lui.",
  "L'affaire de « {titre} » échappe à Yohan, cette fois. {commanditaire} devra chercher une autre solution — ou attendre que la situation empire encore.",
  "Ce que {commanditaire} espérait voir réglé avec « {titre} » reste entier. Certaines missions ne pardonnent pas la moindre erreur ; celle-ci en faisait partie.",
];

// Variantes de ton selon le type de contrat, pour que chasse/traque/sauvetage/récupération/
// enquête/guerre ne se lisent pas comme le même texte maquillé.
const CONTRACT_FLAVOR = {
  chasse:        { equip:"Yohan vérifie chaque lame, chaque cartouche — traquer une bête ne pardonne pas l'à-peu-près.", enquete:"Il interroge les chasseurs locaux sur les habitudes de la créature avant de partir." },
  sauvetage:     { equip:"Yohan prépare de quoi soigner et transporter quelqu'un de blessé, pas seulement de quoi se battre.", enquete:"Il cherche à savoir depuis combien de temps la personne a disparu, et dans quel état on l'a vue pour la dernière fois." },
  traque:        { equip:"Yohan s'équipe léger — sur une piste, la vitesse compte plus que le blindage.", enquete:"Il relève les traces encore fraîches avant qu'elles ne s'effacent." },
  "récupération":{ equip:"Yohan prévoit de quoi transporter ce qu'il doit ramener, en plus de quoi se défendre.", enquete:"Il se renseigne sur qui d'autre pourrait convoiter le même objet." },
  "enquête":     { equip:"Yohan range ses armes discrètement — ici, les questions comptent plus que l'épée.", enquete:"Il recoupe déjà les premières rumeurs avant même de se rendre sur place." },
  guerre:        { equip:"Yohan s'équipe comme pour un vrai champ de bataille, sans rien laisser au hasard.", enquete:"Il tente d'estimer les forces en présence avant de s'engager." },
};

const RESOLUTION_INTRO = {
  chasse:"La bête montre enfin le bout du museau.",
  sauvetage:"Le moment critique arrive — chaque seconde compte désormais.",
  traque:"La piste se termine ici, face à face.",
  "récupération":"Ce qu'il fallait récupérer est enfin en vue — mais pas sans gardien.",
  "enquête":"Les fils se rejoignent enfin, et la vérité prend une forme dangereuse.",
  guerre:"Le champ de bataille ne laisse plus de place aux tractations.",
};
