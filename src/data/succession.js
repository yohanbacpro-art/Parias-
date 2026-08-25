/* PARIAS — Ce qui se transmet, et à qui
 *
 * Le document fondateur : *« Le temps est une mécanique réelle. Les personnages
 * vieillissent, les enfants deviennent adultes, les maisons évoluent, on meurt,
 * on hérite […] Les descendants Karlsberg comptent sur une longue campagne. »*
 *
 * D'où la succession. Ce n'est pas une fin qu'on regarde : c'est la partie qui
 * continue avec quelqu'un d'autre.
 *
 * Ce qui reste au monde : tout. Les crises en sont où elles en sont, les neuf
 * se souviennent de ce que le père a fait, Karlsberg est bâtie comme il l'a
 * bâtie, les dettes qu'on lui devait sont dues à son enfant.
 *
 * Ce qui ne se transmet pas : le niveau, les pouvoirs, ce que Yohan avait dans
 * les mains, et ceux qui l'aimaient. Un héritier n'est pas son père.
 */

const SUCCESSION_AGE_MAJORITE = 16;

/* La mort ne tombe pas d'un coup : elle devient probable, puis certaine. */
const SUCCESSION_AGE_DECLIN  = 66;
const SUCCESSION_AGE_CERTAIN = 84;

/* Ce qu'un héritier reçoit, selon ce qu'il est. Le sang décide de peu de
 * choses, mais il décide de la seule qui compte pour ce nom-là. */
const SUCCESSION_PROFILS = {
  paria: {
    nom:"porte l'Onde",
    dit:"Le bourdonnement lui est venu à onze ans, pendant une fièvre. On ne le lui a jamais expliqué, et il a compris tout seul.",
    stats:{ vol:2, precision:1 },
    sang:40, suspicionGardee:0.55,
    flags:['heritier_paria','succession_onde'],
  },
  sans_onde: {
    nom:"ne porte rien",
    dit:"Rien ne s'est jamais réveillé en lui, et c'est peut-être la meilleure chose qui lui soit arrivée. Il porte le nom sans porter la chose.",
    stats:{ precision:2, agi:1 },
    sang:10, suspicionGardee:0.30,
    flags:['succession_sans_onde'],
  },
};

/* Ce que l'héritier trouve en arrivant, écrit selon l'état réel de la maison. */
const SUCCESSION_ETATS = {
  ruines:    "Il hérite d'un nom et d'un tas de pierres. C'est très exactement ce que son père avait reçu.",
  refuge:    "Il hérite d'un toit, d'un feu, et de gens qui dorment là parce qu'on ne leur a pas demandé d'où ils venaient.",
  fort:      "Il hérite de murs qui ferment, d'un puits qui donne, et d'une porte à laquelle il faut frapper.",
  chateau:   "Il hérite d'un donjon qu'on voit à trois lieues et d'une garnison qui a déjà un avis sur lui.",
  domaine:   "Il hérite d'un bourg, d'un marché, d'une querelle de bornes en cours, et d'enfants nés ici qui n'ont jamais vu les ruines.",
  puissance: "Il hérite d'une vallée fermée, d'une province qui compte avec elle, et de trois maisons qui ont fait demander, séparément, ce que Karlsberg comptait faire ensuite.",
};

/* Les façons dont un règne s'achève, et ce que l'héritier en porte. */
const SUCCESSION_FINS = [
  { id:'vieillesse', si:h => h.age >= SUCCESSION_AGE_DECLIN,
    titre:"De vieillesse",
    texte:"Il est mort dans la salle basse, un matin de fin d'hiver, sans que personne s'en aperçoive avant midi. Il avait {age} ans, ce qui, pour un homme qui a fait ce métier-là, relève de l'anomalie statistique." },
  { id:'transmission', si:() => true,
    titre:"De son vivant",
    texte:"Il n'est pas mort. Il a fait venir un notaire, signé quatre feuillets, et posé l'anneau sur la table sans discours. Puis il est allé s'asseoir dehors, et il y est resté longtemps." },
];
