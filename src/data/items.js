/* PARIAS — Équipement, consommables et boutique itinérante */
const ITEM_POOL = [
  {id:"armure_cuir", nom:"Cuirasse de cuir clouté", type:"armure", desc:"+1 Défense", def:1, prix:60},
  {id:"armure_plate_legere", nom:"Plaque légère de Fort-aux-Princes", type:"armure", desc:"+2 Défense, −1 Agilité", def:2, agi:-1, prix:140},
  {id:"armure_ecailles", nom:"Armure d'écailles de Wyverne", type:"armure", desc:"+3 Défense, −2 Agilité", def:3, agi:-2, prix:260},
  {id:"accessoire_amulette", nom:"Amulette de l'Onde", type:"accessoire", desc:"+2 Volonté", vol:2, prix:120},
  {id:"accessoire_gants", nom:"Gants du Tireur", type:"accessoire", desc:"+1 Précision", prec:1, prix:110},
  {id:"accessoire_anneau", nom:"Anneau de Sang Karlsberg", type:"accessoire", desc:"+10 Fatigue maximum", fatMax:10, prix:180},
  {id:"potion_vigueur", nom:"Potion de Vigueur", type:"consommable", desc:"Restaure 12 PV", pvHeal:12, prix:25},
  {id:"fiole_onde", nom:"Fiole de Sève d'Onde", type:"consommable", desc:"Réduit la Fatigue de 20", fatReduce:20, prix:35},
];
