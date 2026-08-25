/* PARIAS — Ce avec quoi on relève une maison
 *
 * Le document fondateur, mot pour mot :
 *
 *   « Jamais "Reconstruire le château : 10 000 or". Il faut de la pierre, des
 *     ouvriers, un architecte, de la nourriture, des routes sûres, une
 *     garnison, une population, des revenus, des alliances. »
 *
 * D'où quatre choses qui ne s'achètent pas, et une condition qui ne s'achète
 * pas non plus.
 *
 * Le point important : **on ne les gagne pas en cliquant**. Chacune vient d'une
 * source qu'on a ouverte en jouant — une carrière rendue à ses hommes, un
 * refuge tenu, une route rouverte, une dette naine soldée. Ouvrir une source,
 * c'est une décision prise ailleurs, dans une affaire, des mois plus tôt. Elle
 * rapporte ensuite chaque saison, toute seule, tant qu'elle tient.
 *
 * Relever Karlsberg n'est donc pas un poste de dépense : c'est ce que devient
 * une partie où l'on a rendu des choses à des gens.
 */

const RESSOURCES = {
  pierre:  { nom:"Pierre",     unite:"charrois", note:"taillée, charriée, montée" },
  bras:    { nom:"Bras",       unite:"hommes",   note:"des gens qui restent et qui bâtissent" },
  grain:   { nom:"Grain",      unite:"muids",    note:"de quoi les nourrir pendant qu'ils bâtissent" },
  faveurs: { nom:"Faveurs",    unite:"dettes",   note:"ce qu'on vous doit, et qu'on ne refuse pas" },
};

/* Une source ouverte rapporte chaque saison. `pourquoi` est ce qu'on affiche —
 * le joueur lit d'où vient sa pierre, pas un chiffre de production. */
const SOURCES = [
  /* — La pierre — */
  { flag:'rochebrune_carriere',  res:'pierre', n:3, quoi:"La carrière de Rochebrune", pourquoi:"les carriers taillent pour vous plutôt que pour leur ancien maître" },
  { flag:'nain_pierre_taillee',  res:'pierre', n:4, quoi:"Les charrois de Kar-Durak", pourquoi:"des blocs sciés qui se ferment sans mortier" },
  { flag:'brecourt_treuil',      res:'pierre', n:2, quoi:"Le treuil de Brécourt", pourquoi:"on remonte enfin ce qu'on extrait" },
  { flag:'torcy_veine_haute',    res:'pierre', n:2, quoi:"La veine haute de Torcy", pourquoi:"de la pierre à deux jours de route" },
  { flag:'karlsberg_rasee_deux_fois', res:'pierre', n:1, quoi:"Les ruines elles-mêmes", pourquoi:"Karlsberg a été rasée deux fois : il y a de quoi rebâtir dans ses propres décombres" },

  /* — Les bras —
     Le socle : dès que la cour est praticable, des gens s'arrêtent. Peu, mais
     il en vient toujours — c'est ce qui garantit qu'une partie qui ne fait
     rien d'autre avance quand même, très lentement. */
  { flag:'karlsberg_habitable', res:'bras', n:1, quoi:"Ceux qui s'arrêtent", pourquoi:"une cour praticable et un toit, ça se sait sur une route" },
  { flag:'refuge_tenu',          res:'bras', n:4, quoi:"Le corps de logis", pourquoi:"trente lits, et une règle : on ne demande pas d'où l'on vient" },
  { flag:'vaudreuil_sept_libres',res:'bras', n:3, quoi:"Les sept de Vaudreuil", pourquoi:"ils sont libres, et ils sont venus" },
  { flag:'vaudreuil_quatre_libres', res:'bras', n:2, quoi:"Les quatre de Vaudreuil", pourquoi:"quatre sur sept, c'est ce qu'on a pu" },
  { flag:'fils_a_karlsberg',     res:'bras', n:3, quoi:"Les Vaury de Vaubien", pourquoi:"cinq du nom sont montés à Karlsberg" },
  { flag:'aubremont_familles',   res:'bras', n:2, quoi:"Les familles d'Aubremont", pourquoi:"elles n'avaient plus de tour où rentrer" },
  { flag:'caleb_allie',          res:'bras', n:3, quoi:"Les quarante de Fort-aux-Princes", pourquoi:"sans bannière, sans lettre et sans conditions" },
  { flag:'arquenay_sauves',      res:'bras', n:2, quoi:"Ceux d'Arquenay", pourquoi:"ils sont rentrés, et certains ne sont pas repartis" },

  /* — Le grain — */
  { flag:'karlsberg_habitable', res:'grain', n:1, quoi:"Le potager de la cour", pourquoi:"quatre planches de légumes là où il y avait des ronces" },
  { flag:'route_franche',        res:'grain', n:3, quoi:"La route franche", pourquoi:"les convois passent chez vous parce que ça ne leur coûte rien" },
  { flag:'route_peage',          res:'grain', n:2, quoi:"Le péage de la vallée", pourquoi:"deux sous par essieu, et un registre tenu" },
  { flag:'vaudreuil_defrichement', res:'grain', n:3, quoi:"Le défrichement de Vaudreuil", pourquoi:"des arpents qui n'avaient rien porté depuis quarante ans" },
  { flag:'estrees_peage_leve',   res:'grain', n:2, quoi:"Le péage d'Estrées levé", pourquoi:"le sel remonte, et il s'échange" },
  { flag:'karlsberg_route_ouverte', res:'grain', n:3, quoi:"La voie de la vallée", pourquoi:"une route entretenue nourrit ce qu'il y a au bout" },
  { flag:'gorge_ouverte',        res:'grain', n:2, quoi:"La Gorge rouverte", pourquoi:"le commerce du sud repasse" },

  /* — Les faveurs — */
  { flag:'charles_allie',        res:'faveurs', n:2, quoi:"Charles de Mont-Draken", pourquoi:"il tient deux vallées avec vous" },
  { flag:'nain_maitre_oeuvre',   res:'faveurs', n:2, quoi:"Brann de Kar-Durak", pourquoi:"cent onze ans, six mots par jour, et un mur qui ne tombera plus" },
  { flag:'nain_boucliers_venus', res:'faveurs', n:2, quoi:"La Halle de Kar-Durak", pourquoi:"deux cents boucliers sont montés au jour pour vous" },
  { flag:'khesh_lances_offertes',res:'faveurs', n:2, quoi:"Les Dunes", pourquoi:"deux cents lances en douze jours, si on les appelle" },
  { flag:'trois_chenes_traite',  res:'faveurs', n:1, quoi:"Le traité des Trois Chênes", pourquoi:"deux cours elfiques vous doivent une paix" },
  { flag:'eltharion_reconnait',  res:'faveurs', n:2, quoi:"La stèle des Trois Chênes", pourquoi:"quarante et un noms Parias gravés par une cour elfique" },
  { flag:'alliance_valombre',    res:'faveurs', n:1, quoi:"Valombre", pourquoi:"une alliance de maison, avec ce que ça implique" },
];

/* Les conditions qui ne sont pas des stocks : une route sûre est un état du
 * monde, pas une pile de charrois. */
const CONDITIONS_CHANTIER = {
  route_sure: {
    nom:"une route sûre jusqu'à la vallée",
    flags:['cg_route_fait','karlsberg_route_ouverte','route_ferrand_engage','route_du_loup_nommee','route_escortee'],
    manque:"rien de lourd ne monte tant que le défilé n'est pas tenu",
  },
  garnison: {
    nom:"une garnison qui tienne les murs",
    flags:['caleb_allie','nain_boucliers_venus','karlsberg_a_tenu','route_ferrand_engage'],
    manque:"personne ne bâtit un donjon qu'il ne peut pas défendre",
  },
  architecte: {
    nom:"quelqu'un qui sache bâtir",
    flags:['nain_maitre_oeuvre','karlsberg_architecte'],
    manque:"il n'y a personne ici qui sache monter une voûte qui tienne",
  },
  population: {
    nom:"assez de monde pour que ce soit une ville",
    flags:['refuge_tenu','fils_a_karlsberg','aubremont_familles','vaudreuil_sept_libres'],
    manque:"un domaine sans habitants est un décor",
  },
};

/* Les six états visibles de Karlsberg. Le joueur ne voit jamais un pourcentage :
 * il voit le nom de ce qu'est devenu l'endroit. */
const KARLSBERG_PALIERS = [
  { id:'ruines',   nom:"Ruines",              exige:[], 
    dit:"Quarante ans de ronces sur ce qui fut une maison." },
  { id:'refuge',   nom:"Refuge",              exige:['ch_cour','ch_salle'],
    dit:"Un endroit sec, un feu, une porte. Des gens y dorment." },
  { id:'fort',     nom:"Fort",                exige:['ch_enceinte','ch_puits'],
    dit:"Des murs, de l'eau, du grain. Ceux qui viennent doivent frapper." },
  { id:'chateau',  nom:"Château",             exige:['ch_donjon','ch_forge'],
    dit:"Un donjon, une forge, une garnison. On ne prend plus ça au passage." },
  { id:'domaine',  nom:"Domaine",             exige:['ch_bourg','ch_refuge'],
    dit:"Un bourg au pied des murs, un marché, des gens qui y naissent." },
  { id:'puissance',nom:"Puissance régionale", exige:['ch_muraille','ch_pierre'],
    dit:"Karlsberg pèse sur la province. On compte avec elle, qu'on le veuille ou non." },
];
