/* PARIAS — Arbres de pouvoirs
 * TREE       : magie de l'Onde (Parias) — viscérale, coûteuse en Fatigue.
 * TREE_ELFES : magie ancienne/élémentaire des Elfes et Elfes noirs.
 */

const TREE = {
  sang:   {label:"Sang", cls:"br-sang", nodes:[
    {id:"griffe",  tier:1, nom:"Griffe écarlate", coutPA:1, coutFAT:6,  degBase:3, deDeg:"1d4", desc:"Attaque de mêlée qui fait saigner la cible."},
    {id:"drain",   tier:2, nom:"Drain vital", coutPA:2, coutFAT:30, degBase:8, deDeg:"1d8", desc:"Vole des PV à la cible.", vol:true},
    {id:"resilience", tier:3, nom:"Résilience du sang", passive:true, effect:"pvMax+15", desc:"+15 PV maximum (passif)."},
    {id:"renaissance", tier:4, nom:"Renaissance partielle", passive:true, effect:"renaissance", desc:"Une fois par vie, remonte à 1 PV au lieu de mourir."},
  ]},
  esprit: {label:"Esprit", cls:"br-esprit", nodes:[
    {id:"murmure", tier:1, nom:"Murmure", coutPA:1, coutFAT:5, degBase:0, deDeg:"1d1", desc:"Détecte mensonge/intention hostile (effet narratif)."},
    {id:"esprit",  tier:2, nom:"Buveur d'esprit", coutPA:3, coutFAT:45, degBase:6, deDeg:"1d6", desc:"Draine la Volonté/Fatigue de la cible."},
    {id:"domination", tier:3, nom:"Domination brève", coutPA:2, coutFAT:35, degBase:2, deDeg:"1d4", desc:"Contrôle un ennemi faible un tour."},
    {id:"rupture", tier:4, nom:"Rupture d'esprit", coutPA:3, coutFAT:50, degBase:10, deDeg:"1d10", desc:"Malus durable de Précision/VOL à la cible."},
  ]},
  force:  {label:"Force", cls:"br-force", nodes:[
    {id:"poussee", tier:1, nom:"Poussée de force", coutPA:1, coutFAT:8, degBase:4, deDeg:"1d4", desc:"Repousse et déstabilise la cible."},
    {id:"bouclier", tier:2, nom:"Bouclier cinétique", coutPA:2, coutFAT:18, degBase:0, deDeg:"1d1", desc:"Absorbe les prochains dégâts physiques (effet narratif simplifié)."},
    {id:"fracas", tier:3, nom:"Fracas", coutPA:2, coutFAT:28, degBase:9, deDeg:"1d8", desc:"Dégâts de zone courte portée."},
    {id:"onde_choc", tier:4, nom:"Onde de choc", coutPA:3, coutFAT:40, degBase:12, deDeg:"1d10", desc:"Repousse et étourdit les ennemis proches."},
  ]},
  tempete:{label:"Tempête", cls:"br-tempete", nodes:[
    {id:"etincelle", tier:1, nom:"Étincelle", coutPA:1, coutFAT:6, degBase:3, deDeg:"1d4", desc:"Petite attaque à distance."},
    {id:"foudre", tier:2, nom:"Foudre", coutPA:2, coutFAT:25, degBase:9, deDeg:"1d10", desc:"Décharge électrique, chance d'étourdir."},
    {id:"eclair_enchaine", tier:3, nom:"Éclair enchaîné", coutPA:2, coutFAT:32, degBase:7, deDeg:"1d8", desc:"Touche une deuxième cible proche."},
    {id:"tempete_ciel", tier:4, nom:"Tempête du ciel", coutPA:3, coutFAT:48, degBase:13, deDeg:"1d10", desc:"Zone + étourdissement."},
  ]},
};

const YOHAN_STARTING_POWERS = ["poussee","foudre","drain","esprit"];

// Arbre de pouvoirs des Elfes (Eltharion) et Elfes noirs (Anarion) — magie ancienne/élémentaire,
// distincte de la magie viscérale de l'Onde des Parias. Non encore branché à un personnage
// jouable (seul Yohan, un Paria, est jouable pour l'instant) : prêt pour un futur PC/compagnon Elfe.
const TREE_ELFES = {
  lumiere: {label:"Lumière Ancienne", nodes:[
    {id:"eclat", tier:1, nom:"Éclat", coutPA:1, coutFAT:6, degBase:3, deDeg:"1d4", desc:"Rayon de lumière pure, dégâts faibles."},
    {id:"voile_protecteur", tier:2, nom:"Voile Protecteur", coutPA:2, coutFAT:16, degBase:0, deDeg:"1d1", desc:"Réduit les dégâts subis pendant 2 tours (effet narratif simplifié)."},
    {id:"purification", tier:3, nom:"Purification", coutPA:2, coutFAT:26, degBase:7, deDeg:"1d8", desc:"Dégâts accrus contre les créatures corrompues/magiques."},
    {id:"lumiere_ancienne", tier:4, nom:"Lumière de l'Onde Première", coutPA:3, coutFAT:42, degBase:12, deDeg:"1d10", desc:"Capstone : lumière originelle, dégâts élevés en zone."},
  ]},
  nature: {label:"Nature Sylvaine", nodes:[
    {id:"racines", tier:1, nom:"Racines", coutPA:1, coutFAT:6, degBase:2, deDeg:"1d4", desc:"Entrave la cible, dégâts faibles."},
    {id:"croissance", tier:2, nom:"Croissance", coutPA:2, coutFAT:16, degBase:0, deDeg:"1d1", desc:"Soin progressif sur plusieurs tours (effet narratif simplifié)."},
    {id:"tempete_feuilles", tier:3, nom:"Tempête de Feuilles", coutPA:2, coutFAT:26, degBase:8, deDeg:"1d8", desc:"Dégâts de zone tranchants."},
    {id:"foret_ancestrale", tier:4, nom:"Forêt Ancestrale", coutPA:3, coutFAT:40, degBase:11, deDeg:"1d10", desc:"Capstone : invoque des racines massives, dégâts élevés + entrave."},
  ]},
  ombre: {label:"Séduction & Ombre (Elfes noirs)", nodes:[
    {id:"charme", tier:1, nom:"Charme", coutPA:1, coutFAT:8, degBase:0, deDeg:"1d1", desc:"Manipule brièvement une cible faible (effet narratif)."},
    {id:"lame_ombre", tier:2, nom:"Lame d'Ombre", coutPA:2, coutFAT:20, degBase:8, deDeg:"1d8", desc:"Attaque furtive, bonus si la cible est déjà touchée ce tour."},
    {id:"excès", tier:3, nom:"Excès", coutPA:2, coutFAT:30, degBase:9, deDeg:"1d8", desc:"Puissance brute au prix d'un coût de Fatigue élevé."},
    {id:"apotheose_noire", tier:4, nom:"Apothéose Noire", coutPA:3, coutFAT:46, degBase:14, deDeg:"1d10", desc:"Capstone : magie dévastatrice à la Anarion — dégâts très élevés, risque élevé."},
  ]},
  ondes_anciennes: {label:"Mémoire de l'Onde", nodes:[
    {id:"vision", tier:1, nom:"Vision", coutPA:1, coutFAT:6, degBase:0, deDeg:"1d1", desc:"Révèle une information sur l'ennemi (effet narratif)."},
    {id:"resonance", tier:2, nom:"Résonance", coutPA:2, coutFAT:18, degBase:7, deDeg:"1d6", desc:"Dégâts basés sur l'écho de l'Onde originelle."},
    {id:"rappel", tier:3, nom:"Rappel", coutPA:2, coutFAT:28, degBase:0, deDeg:"1d1", desc:"Réduit la Fatigue d'un allié proche (effet narratif simplifié)."},
    {id:"echo_premier", tier:4, nom:"Écho Premier", coutPA:3, coutFAT:44, degBase:13, deDeg:"1d10", desc:"Capstone : frappe avec la puissance de la collision originelle de l'Onde."},
  ]},
};
