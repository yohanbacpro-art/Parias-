/* PARIAS — Équipement, consommables et marchands
 *
 * Chaque objet porte :
 *   type      armure · accessoire · consommable
 *   peuple    qui le fabrique (clé de PEUPLE_LABELS) ou null pour du commun
 *   rang      0 commun · 1 bon · 2 rare · 3 pièce de maître
 *   unique    true = ne se vend nulle part, se gagne dans une scène ou une bataille
 *
 * Ce qu'un marchand propose dépend du lieu (SHOPS, par peuple) et ce qu'il en
 * demande dépend de la réputation (src/reputation.js). Un peuple qui vous estime
 * sort ses pièces de rang 2 ; un peuple qui vous méprise ne sort rien du tout.
 *
 * Les objets uniques n'ont pas de prix d'achat : `prix` sert alors seulement à
 * les revendre, et à ce qu'un butin de bataille sache ce qu'il vaut.
 */
const ITEM_POOL = [

  /* ---- Commun : ce qu'on trouve partout, sur la Route Grise comme à Port-Noir ---- */
  {id:"armure_cuir", nom:"Cuirasse de cuir clouté", type:"armure", peuple:null, rang:0,
   desc:"+1 Défense", def:1, prix:60},
  {id:"potion_vigueur", nom:"Potion de Vigueur", type:"consommable", peuple:null, rang:0,
   desc:"Restaure 12 PV", pvHeal:12, prix:25},
  {id:"fiole_onde", nom:"Fiole de Sève d'Onde", type:"consommable", peuple:null, rang:1,
   desc:"Réduit la Fatigue de 20", fatReduce:20, prix:35},
  {id:"trousse_campagne", nom:"Trousse de campagne", type:"consommable", peuple:null, rang:1,
   desc:"Restaure 26 PV", pvHeal:26, prix:70},

  /* ---- Humains d'Astrah : de l'acier de série, bien fait, sans génie ---- */
  {id:"armure_plate_legere", nom:"Plaque légère de Fort-aux-Princes", type:"armure", peuple:"humains", rang:1,
   desc:"+2 Défense, −1 Agilité", def:2, agi:-1, prix:140},
  {id:"accessoire_gants", nom:"Gants du Tireur", type:"accessoire", peuple:"humains", rang:1,
   desc:"+1 Précision", prec:1, prix:110},
  {id:"armure_garde", nom:"Harnois de la garde d'Astrah", type:"armure", peuple:"humains", rang:2,
   desc:"+4 Défense, −2 Agilité", def:4, agi:-2, prix:420},
  {id:"accessoire_lunette", nom:"Lunette de pointeur impérial", type:"accessoire", peuple:"humains", rang:2,
   desc:"+3 Précision", prec:3, prix:390},

  /* ---- Nains de Kar-Durak : lourd, cher, et à peu près indestructible ---- */
  {id:"armure_maille_naine", nom:"Maille tressée de Kar-Durak", type:"armure", peuple:"nains", rang:1,
   desc:"+3 Défense", def:3, prix:290},
  {id:"armure_pierre_eternelle", nom:"Plates de Pierre Éternelle", type:"armure", peuple:"nains", rang:3,
   desc:"+6 Défense, −2 Agilité", def:6, agi:-2, prix:900},
  {id:"accessoire_contrepoids", nom:"Contrepoids de forge", type:"accessoire", peuple:"nains", rang:2,
   desc:"+2 Précision, +1 Volonté", prec:2, vol:1, prix:340},

  /* ---- Khesh : léger, pensé pour marcher trois jours sans boire ---- */
  {id:"armure_ecailles", nom:"Écailles de dragon des sables", type:"armure", peuple:"khesh", rang:2,
   desc:"+3 Défense, −1 Agilité", def:3, agi:-1, prix:260},
  {id:"accessoire_voile_khesh", nom:"Voile de clan khesh", type:"accessoire", peuple:"khesh", rang:1,
   desc:"+1 Agilité, +8 Fatigue maximum", agi:1, fatMax:8, prix:150},
  {id:"fiole_eau_profonde", nom:"Eau des puits profonds", type:"consommable", peuple:"khesh", rang:2,
   desc:"Réduit la Fatigue de 40", fatReduce:40, prix:90},

  /* ---- Elfes d'Eltharion : on ne vend pas, on accorde ---- */
  {id:"accessoire_amulette", nom:"Amulette de l'Onde", type:"accessoire", peuple:null, rang:1,
   desc:"+2 Volonté", vol:2, prix:120},
  {id:"accessoire_feuille", nom:"Feuille de la Cour lumineuse", type:"accessoire", peuple:"elfes", rang:2,
   desc:"+3 Volonté, +12 Fatigue maximum", vol:3, fatMax:12, prix:400},
  {id:"armure_sylve", nom:"Cuir chanté d'Eltharion", type:"armure", peuple:"elfes", rang:2,
   desc:"+2 Défense, +1 Agilité", def:2, agi:1, prix:360},

  /* ---- Elfes noirs de Valombre : élégant, et jamais tout à fait franc ---- */
  {id:"accessoire_camee", nom:"Camée de la Cour Noire", type:"accessoire", peuple:"elfes_noirs", rang:2,
   desc:"+2 Volonté, +2 Précision", vol:2, prec:2, prix:430},
  {id:"armure_nuit", nom:"Soie lestée de Valombre", type:"armure", peuple:"elfes_noirs", rang:2,
   desc:"+2 Défense, +2 Agilité", def:2, agi:2, prix:380},

  /* ---- Peaux-Vertes et Hommes-Bêtes : du butin, pas un commerce ---- */
  {id:"armure_os", nom:"Harnais d'os cousu", type:"armure", peuple:"peaux_vertes", rang:1,
   desc:"+2 Défense", def:2, prix:120},
  {id:"accessoire_totem", nom:"Totem de harde", type:"accessoire", peuple:"hommes_betes", rang:2,
   desc:"+2 Volonté, +10 Fatigue maximum", vol:2, fatMax:10, prix:280},

  /* ---- Parias : ce qui reste d'un peuple qu'on a effacé ---- */
  {id:"accessoire_anneau", nom:"Anneau de Sang Karlsberg", type:"accessoire", peuple:"parias", rang:2,
   desc:"+10 Fatigue maximum", fatMax:10, prix:180},

  /* ---- Pièces uniques : gagnées, jamais achetées ---- */
  {id:"u_manteau_livre", nom:"Manteau sans insigne", type:"armure", peuple:null, rang:3, unique:true,
   desc:"+3 Défense, +1 Agilité — celui qui le portait n'avait pas de nom non plus", def:3, agi:1, prix:500},
  {id:"u_marteau_gorik", nom:"Marque de Gorik", type:"accessoire", peuple:"nains", rang:3, unique:true,
   desc:"+3 Précision, +2 Défense — un nain a mis son nom dessus, et c'est un nain têtu", prec:3, def:2, prix:620},
  {id:"u_larme_eltharion", nom:"Larme d'Eltharion", type:"accessoire", peuple:"elfes", rang:3, unique:true,
   desc:"+4 Volonté, +20 Fatigue maximum — quatre siècles de regret dans une pierre", vol:4, fatMax:20, prix:760},
  {id:"u_lance_aza", nom:"Contrepoids des trois lances", type:"accessoire", peuple:"khesh", rang:3, unique:true,
   desc:"+2 Précision, +2 Agilité, +10 Fatigue maximum — Aza-Rhun l'a portée avant vous", prec:2, agi:2, fatMax:10, prix:640},
  {id:"u_cuirasse_loup", nom:"Cuirasse au loup effacé", type:"armure", peuple:"parias", rang:3, unique:true,
   desc:"+5 Défense — on a gratté le blason, le métal se souvient de sa forme", def:5, prix:700},
  {id:"u_croc_premier", nom:"Croc du Premier Rugissement", type:"accessoire", peuple:"hommes_betes", rang:3, unique:true,
   desc:"+3 Volonté, +2 Précision — la forêt vous a reconnu une fois", vol:3, prec:2, prix:680},
];

/* ============================= MARCHANDS ============================= */
/* Ce qu'on trouve chez qui. `rangMax` est le rang le plus élevé qu'un peuple
 * sort d'emblée ; l'estime en débloque un de plus (voir renderShop).
 * Les Peaux-Vertes et les Hommes-Bêtes ne tiennent pas boutique : leur
 * équipement se prend sur un champ de bataille. */
const SHOPS = {
  humains:     { nom:"Comptoir d'Astrah", rangMax:1,
                 note:"De l'acier de série, correct, garanti par un sceau qui ne vaut rien." },
  nains:       { nom:"Forge de Kar-Durak", rangMax:1,
                 note:"On vous vend ce qu'on vend aux étrangers. Le reste est derrière." },
  khesh:       { nom:"Tente de clan", rangMax:1,
                 note:"On échange plus qu'on ne vend, et on regarde longtemps avant." },
  elfes:       { nom:"Dépôt de la Cour lumineuse", rangMax:1,
                 note:"Eltharion ne vend pas : Eltharion accorde, contre une somme." },
  elfes_noirs: { nom:"Étal de Valombre", rangMax:2,
                 note:"Tout est à vendre. C'est ce qui devrait vous inquiéter." },
  parias:      { nom:"Fond de charrette", rangMax:1,
                 note:"Ce que des gens en fuite ont pu emporter, et revendent pour manger." },
};

/* Le colporteur des terres de personne : peu de choses, aucun prix d'ami. */
const COLPORTEUR = { nom:"Colporteur de route", rangMax:1,
  note:"Il passe, il n'a pas de boutique, et il ne fait de prix à personne." };

/* Butin de bataille : ce qu'on ramasse sur le peuple qu'on vient de battre. */
const BUTIN_PAR_PEUPLE = {
  humains:['armure_plate_legere','accessoire_gants','armure_garde','accessoire_lunette'],
  nains:['armure_maille_naine','accessoire_contrepoids'],
  khesh:['armure_ecailles','accessoire_voile_khesh','fiole_eau_profonde'],
  elfes:['armure_sylve','accessoire_feuille'],
  elfes_noirs:['armure_nuit','accessoire_camee'],
  peaux_vertes:['armure_os'],
  hommes_betes:['accessoire_totem'],
  parias:['accessoire_anneau'],
};
