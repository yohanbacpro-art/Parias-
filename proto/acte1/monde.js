/* PARIAS — Acte I · le monde et la machine de l'acte
 * ═══════════════════════════════════════════════════════════════════════
 *
 *   « Nous cherchons un Paria » → « Nous cherchons Yohan »
 *                               → « Nous cherchons Yohan de Karlsberg »
 *
 * L'acte est une machine à trois pièces, et les missions ne sont que la
 * troisième :
 *
 *   1. LE RENOM. Il ne monte que par ce que des témoins ont vu. Un exploit
 *      dans une cave vide ne vaut rien. Se faire voir est le seul chemin, et
 *      c'est aussi ce qui finit par réveiller le nom Karlsberg.
 *   2. LES ENGAGEMENTS. Six affaires sont offertes, on en prend trois. Les
 *      trois autres se règlent sans vous, mal, et on le lit au basculement.
 *   3. LE BASCULEMENT. Quand les trois saisons sont brûlées, le monde parle,
 *      puis le contrat exceptionnel s'ouvre — celui où l'on fait l'impossible
 *      devant trop de monde.
 * ═══════════════════════════════════════════════════════════════════════ */

const GENS = {
  yohan:      { nom:"Yohan de Karlsberg",   role:"Paria · dernier héritier connu",       lettre:"Y" },
  heloise:    { nom:"Héloïse de Valombre",  role:"veuve · tient la maison depuis onze ans", lettre:"H" },
  amaury:     { nom:"Amaury de Valombre",   role:"son fils · vingt-huit ans",            lettre:"A" },
  bracq:      { nom:"Bracq",                role:"maître des balistes · trois doigts",   lettre:"B" },
  gassien:    { nom:"Gassien le Lièvre",    role:"contrebandier · rabat les caravanes",  lettre:"G" },
  alienor:    { nom:"Aliénor de Valombre",  role:"nièce d'Héloïse · vingt-quatre ans",   lettre:"Æ" },
  sergent:    { nom:"Le sergent d'étape",   role:"Route Grise · douze ans de poste",     lettre:"S" },

  /* L'assise d'hiver — Chastel descend enfin de ses archives. */
  vasque:     { nom:"Ancelin Vasque",       role:"commissaire aux titres de Chastel",    lettre:"V" },
  sorgue:     { nom:"Renaud Sorgue",        role:"champion judiciaire · quarante et un", lettre:"R" },
  greffier:   { nom:"Le greffier",          role:"tient le rôle depuis dix-neuf ans",    lettre:"G" },
  loys:       { nom:"Loys",                 role:"quinze ans · il est monté à la borne", lettre:"L" },
  clerc:      { nom:"Le clerc de Chastel",  role:"vingt-six ans · il a lu les relevés",  lettre:"C" },
  tailleur:   { nom:"Le tailleur de pierre",role:"un hangar, pas assez de commandes",    lettre:"T" },

  /* C02 — Le Chevalier sans visage */
  guichard:   { nom:"Guichard de Rochebrune", role:"seigneur · onze patrouilles perdues",  lettre:"G" },
  aldren:     { nom:"Ser Aldren",             role:"le chevalier sans visage",             lettre:"A" },
  ermengarde: { nom:"Ermengarde de Rochebrune", role:"sa fille · veuve · vingt-six ans",   lettre:"E" },
  gervais:    { nom:"Gervais",                role:"dix-neuf ans · il a été relâché",      lettre:"G" },
  baudoin:    { nom:"Ser Baudoin d'Escaut",   role:"beau-frère du seigneur · très aimé",   lettre:"B" },

  /* C03 — L'Héritier disparu */
  maelys:     { nom:"Maëlys d'Arquenay",      role:"vingt ans · mariée en Floréal",        lettre:"M" },
  gaspard:    { nom:"Gaspard d'Arquenay",     role:"son frère · vingt-deux ans",           lettre:"G" },
  corbeil:    { nom:"Maître Corbeil",         role:"régisseur des mines d'Arquenay",       lettre:"C" },
  bergrun:    { nom:"Bergrun",                role:"chef de taille · quarante ans de fond", lettre:"B" },

  /* C04 — Les Trois Frères Rouges */
  aymar:      { nom:"Aymar de Vauclair",      role:"sire · concessions de tourbe",         lettre:"A" },
  iselle:     { nom:"Iselle de Vauclair",     role:"sa belle-sœur · veuve · vingt-neuf ans", lettre:"I" },
  esteve:     { nom:"Estève",                 role:"l'aîné · trente-quatre ans · il parle", lettre:"E" },
  bertran:    { nom:"Bertran",                role:"le cadet · dix-neuf ans · il écrit",    lettre:"B" },
  nonne:      { nom:"la Nonne",               role:"elle tient le marais depuis trente ans", lettre:"N" },

  /* C05 — Le Troll du vieux pont */
  ode:        { nom:"Ode de Sombreval",       role:"soixante-quatre ans · elle l'a connu enfant", lettre:"O" },
  adelie:     { nom:"Adélie de Sombreval",    role:"sa fille · trente et un ans · les granges", lettre:"A" },
  harn:       { nom:"Harn",                   role:"le vieux du pont · deux cent onze ans", lettre:"H" },
  meunier:    { nom:"Le meunier de l'amont",  role:"il passe le pont depuis quarante ans", lettre:"M" },

  /* C06 — La Dame captive */
  hauterive:  { nom:"Sire de Hauterive",      role:"l'époux · il exige la discrétion",     lettre:"H" },
  isabeau:    { nom:"Isabeau de Hauterive",   role:"trente et un ans · elle emporte quelque chose", lettre:"I" },
  jaufre:     { nom:"Jaufré",                 role:"capitaine des preneurs · payé d'avance", lettre:"J" },
};

/* ── Yohan, valeurs canoniques V7 ───────────────────────────────────────── */
function neuf(){
  ETAT.carac = { force:7, agilite:7, endurance:8, perception:6, intellect:5, volonte:8, presence:6 };
  ETAT.comp  = { epees:7, armes_lourdes:4, hast:4, dagues:5, tir:3, jet:5, lutte:6, bouclier:5,
                 equitation:5, anatomie:4, bestiaire:3, alchimie:2, furtivite:5, tactique:4,
                 commandement:2, onde:4 };
  ETAT.ressources = { vitalite:100, endurance:100, concentration:80, sang:100, moral:85 };
  ETAT.or = 40; ETAT.renom = 6; ETAT.suspicion = 4;
  ETAT.flags = new Set(); ETAT.blessures = []; ETAT.faits = []; ETAT.portes = [];
  ETAT.adaptation = {};
  ETAT.acte = { saison:0, engagements:3, arcsFaits:[], arcsIgnores:[], arcsPerdus:[] };
  /* L'Acte II tient son propre état — l'année, les saisons, les cinq crises,
   * les quatre axes de chaque lien. Il se recompose tout seul à la première
   * lecture : il suffit de le vider ici, sinon une nouvelle partie hérite du
   * calendrier et des relations de la précédente. */
  ETAT.acte2 = null; ETAT.liens = null; ETAT.melee = null;
  ETAT.pistolets = 2;
}

/* ── Les six affaires de l'Acte I ──────────────────────────────────────────
 * Tirées de design/narratif_v7 · CONTRATS_COMPLETS_V7_01_10.
 * `entree` est écrite ; les autres portent leur dénouement sans Yohan. */
const AFFAIRES = [
  {
    id:'C01', titre:"La Wyverne de Cendrepont", maison:"Maison de Valombre",
    lieu:"Route Grise · Cendrepont", danger:"dangereux", or:250, prix:true,
    pitch:"Une wyverne a fait son nid au-dessus de la Route Grise. Trois caravanes en six semaines, et la veuve de Valombre paie deux cent cinquante couronnes pour rouvrir la route.",
    entree:'wy_audience',
    sans:"La wyverne de Cendrepont a été abattue en Ventôse par une compagnie de Chastel, à la baliste, après onze jours de siège et quatre morts. On a trouvé trois œufs au nid. Ils ont été vendus avant que le corps refroidisse, et un seigneur de guerre de la côte possède désormais trois montures qui n'existaient pas l'an dernier.",
  },
  {
    id:'C02', titre:"Le Chevalier sans visage", maison:"Maison Rochebrune",
    lieu:"Côte des Dents", danger:"très dangereux", or:400, prix:true,
    pitch:"Un cavalier noir mutile les patrouilles de Rochebrune. On retrouve les corps sans visage, prélevé proprement, et son cheval revient seul chaque aube.",
    entree:'ro_audience',
    sans:"Ser Aldren a été pris vivant sur la Côte des Dents et pendu à Rochebrune après trois jours de question. Il a répété le même nom jusqu'à la fin — celui du chevalier qui l'avait défiguré et trahi. Ce nom est celui du beau-frère du seigneur de Rochebrune. Personne n'a pris de notes.",
  },
  {
    id:'C03', titre:"L'Héritier disparu", maison:"Maison d'Arquenay",
    lieu:"Contreforts nains", danger:"dangereux", or:300, prix:true,
    pitch:"Gaspard d'Arquenay, vingt-deux ans, n'est pas rentré des contreforts. Sa sœur Maëlys croit qu'il a fui un mariage politique. Sa maison paie pour qu'on le ramène.",
    entree:'ar_audience',
    sans:"Gaspard d'Arquenay est mort dans une galerie clandestine sous les contreforts, avec dix-neuf mineurs et quatorze prisonniers que sa propre maison y avait vendus. L'effondrement a été déclaré accidentel. Maëlys d'Arquenay a été mariée en Floréal à un homme qu'elle n'a vu que le jour du contrat.",
  },
  {
    id:'C04', titre:"Les Trois Frères Rouges", maison:"Maison de Vauclair",
    lieu:"Marais de Sombreval", danger:"modéré", or:200, prix:true,
    pitch:"Vauclair veut trois brigands vivants, et paie le triple si aucun ne meurt. Un contrat de mercenaire ne précise jamais pourquoi on tient tant à ce qu'un homme puisse parler — ou se taire.",
    entree:'va_audience',
    sans:"Les trois frères ont été pris au filet dans les marais et exécutés dans la cour de Vauclair avant tout procès, pour vol et rébellion. Aucun des trois n'a été entendu. La communauté de serfs fugitifs qu'ils protégeaient a été dispersée dans le mois ; on en a retrouvé onze noyés dans les tourbières.",
  },
  {
    id:'C05', titre:"Le Troll du vieux pont", maison:"Maison de Sombreval",
    lieu:"Le vieux pont", danger:"dangereux", or:220, prix:true,
    pitch:"Le troll du vieux pont n'exige plus de péage. Il exige une histoire vraie. Le grain de Sombreval pourrit dans les granges depuis deux mois.",
    entree:'tr_audience',
    sans:"Le vieux pont a été repris à la poudre. Le troll a mis quatre jours à mourir sous les décombres et on l'entendait depuis le bourg. Le grain est passé. On a rebâti un pont neuf à trois cents pas en amont, et personne n'y raconte plus rien à personne.",
  },
  {
    id:'C06', titre:"La Dame captive", maison:"Maison de Hauterive",
    lieu:"Un moulin, quelque part", danger:"modéré", or:280, prix:true,
    pitch:"Isabeau de Hauterive, trente et un ans, a été enlevée par des mercenaires. Son époux paie bien et exige la discrétion — il l'exige même avant de dire combien.",
    entree:'ha_audience',
    sans:"Isabeau de Hauterive a été ramenée à son époux par une compagnie qui n'a posé aucune question et a été payée pour ça. Elle est morte en Prairial. La maison a fait dire une fièvre. Les preuves qu'elle emportait n'ont jamais été retrouvées, et son époux siège désormais au conseil de la province.",
  },
];

/* ── Le prologue ───────────────────────────────────────────────────────── */
const SCENES_MONDE = {

prologue:{
  lieu:"Quelque part sur la Route Grise · dix-neuvième année après la Purge",
  titre:"Ce qu'on est quand on n'est plus rien",
  texte:[
    { sobre:"L'homme met plus longtemps à mourir que prévu.",
      intense:"L'homme met plus longtemps à mourir que prévu. Ils mettent toujours plus longtemps que prévu ; c'est la première chose qu'on apprend et la seule qu'on n'oublie pas.",
      extreme:"L'homme met beaucoup plus longtemps à mourir que prévu.\n\nIls mettent toujours plus longtemps. C'est la première chose qu'on apprend dans ce métier et la seule qu'on n'oublie jamais : les récits expédient ça en une ligne, et en vrai on est accroupi dans la boue à côté de quelqu'un qui respire encore par un trou qui n'est pas fait pour, en attendant que ça s'arrête, parce qu'il n'y a rien d'autre à faire." },
    "Il s'appelait Ferrand, ou c'est ce qu'il a dit à l'étape. Il détroussait les charrettes de sel avec trois autres, mal, depuis six semaines. Les trois autres ont couru.",
    { sobre:"Vous êtes payé quarante écus pour ça.",
      intense:"Quarante écus. C'est le tarif d'un homme sur cette route : moins qu'un bœuf, plus qu'un mouton.",
      extreme:"Quarante écus. C'est très exactement le tarif d'un homme sur cette route en fin d'hiver — moins qu'un bœuf de labour, un peu plus qu'un mouton gras. Personne dans cette province ne trouve ça choquant et vous avez cessé de le trouver choquant il y a environ sept ans, ce qui est la partie dont on ne parle à personne." },
    "§ Voilà. C'est ça, le métier. Le reste est de la chanson.",
    "Vous essuyez la lame sur son manteau parce que c'est le seul tissu sec à deux lieues, vous prenez sa bourse — onze sous et une dent de sanglier percée —, et vous laissez le corps aux corbeaux parce que la terre est encore gelée sur trois pieds.",
    { sobre:"Il y a trois façons de reconnaître un Paria. Deux sont fausses.",
      intense:"Il y a trois façons de reconnaître un Paria. Deux sont fausses. On raconte qu'ils ont les yeux clairs : faux. On raconte qu'ils sentent le métal : faux aussi, mais ça vient de quelque chose de vrai.",
      extreme:"Il y a trois façons de reconnaître un Paria, et deux d'entre elles sont fausses.\n\nOn raconte qu'ils ont les yeux clairs. Faux : ils les ont comme tout le monde. On raconte qu'ils sentent le métal — faux aussi, mais celle-là vient d'une chose vraie : quand l'Onde bouge dans un corps, l'air autour prend un goût de pièce de cuivre gardée trop longtemps sous la langue. Ferrand l'a senti. C'est même la dernière chose qu'il a comprise, et il n'a pas eu le temps d'en faire quoi que ce soit." },
    { sobre:"La troisième est la bonne : un Paria est quelqu'un dont la maison a été rayée.",
      intense:"La troisième est la bonne et elle ne se voit pas. Un Paria est quelqu'un dont la maison a été **rayée**. Pas vaincue. Pas ruinée. Rayée : registres brûlés, pierres grattées, hameaux rebaptisés, et des gens payés pour oublier.",
      extreme:"La troisième est la bonne et elle ne se voit sur personne. Un Paria est quelqu'un dont la maison a été **rayée**. Pas vaincue, pas ruinée, pas déchue — rayée. On a brûlé les registres, gratté les pierres, rebaptisé les hameaux, racheté les baux, et payé assez de monde pour que ça s'oublie en une génération.\n\nIl y a dix-neuf ans, sept cents personnes se sont couchées nobles et se sont réveillées inexistantes. Celles qui ont passé la semaine ont appris très vite ce que ça veut dire dans les faits : un homme sans registre n'a pas de recours, pas d'héritage, pas de tribunal, pas de plainte à déposer, et personne à qui manquer le jour où quelqu'un décide qu'il ne devrait pas être là." },
    "§ Yohan de Karlsberg a vingt-neuf ans et il n'a jamais dit son nom entier à personne qui ne soit pas mort depuis.",
    { sobre:"Une épée bâtarde, deux pistolets à silex, du cuir renforcé.",
      intense:"Une épée bâtarde usée et bien équilibrée. Une dague. Deux pistolets à silex à la ceinture, chargés, qu'on ne recharge pas dans un combat : deux coups, et ensuite deux masses de fer inutiles. Du cuir renforcé, des mailles sur le torse.",
      extreme:"Une épée bâtarde, sobre, usée, remontée deux fois, payée avec l'argent d'un contrat dont il ne parle pas à un armurier qui ne posait pas de questions. Une dague robuste. Deux pistolets à silex à la ceinture, chargés — deux coups, exactement deux, parce qu'on ne recharge pas un silex dans un combat et qu'après ça on porte deux masses de fer inutiles pendant le reste de la journée. Du cuir renforcé, des mailles sur le torse et les épaules, des gants assez fins pour sentir la garde.\n\nÇa l'a sauvé onze fois des coupures et des carreaux mal tirés. Ça ne transformera jamais un coup de masse en caresse et il ne se raconte pas d'histoires là-dessus." },
    "Et une chose sous les côtes qui pousse toute seule quand il a peur, qu'il contrôle mal, et qui a tué Ferrand deux secondes avant qu'il ait décidé de le tuer.",
    { sobre:"Voilà où on en est.",
      intense:"Voilà où on en est : un homme qui vaut mieux que sa réputation, sur une route grise, en fin d'hiver, avec quarante écus, du sang qui sèche sur une manche, et une lettre pliée dans sa botte.",
      extreme:"Voilà où on en est. Un homme qui vaut nettement mieux que sa réputation et qui y tient, sur une route grise, en fin d'hiver, avec quarante écus, onze sous, une dent de sanglier percée, du sang qui sèche sur la manche gauche, une cicatrice sous la clavicule qui le tire quand il gèle — et une lettre pliée dans sa botte depuis onze jours." },
  ],
  suite:'prologue_lettre', libelleSuite:"La lettre",
},

prologue_lettre:{
  titre:"La lettre",
  texte:[
    "Elle est arrivée par un muletier à l'auberge d'étape, il y a onze jours. Sceau de la maison de Valombre — un héron sur trois vagues — et quatre lignes.",
    "*Une bête a fait son nid au-dessus de la Route Grise, à Cendrepont. Trois caravanes en six semaines. La maison de Valombre paie deux cent cinquante couronnes à qui rouvrira la route, et honorera la coutume ancienne si celui qui vient est de ceux à qui elle est due.*",
    "§ *…et honorera la coutume ancienne.*",
    { sobre:"Cinq mots qui changent tout.",
      intense:"Cinq mots. Une maison qui les écrit sait exactement ce qu'elle écrit : elle sait ce qu'est un Paria, elle sait ce qu'on lui doit, et elle sait qu'en le mettant sur du papier elle vient de se rendre la lettre dangereuse à elle-même.",
      extreme:"Cinq mots, et ils changent la nature du papier.\n\nUne maison qui écrit ça sait très précisément ce qu'elle écrit. Elle sait ce qu'est un Paria. Elle sait ce qu'une maison noble lui doit — l'Or et le Sang, des pièces comptant et une femme de son rang, parce qu'on n'appelle pas un Paria de gaieté de cœur et que la coutume existe pour que ça coûte. Et elle sait qu'en le portant sur du papier avec son sceau dessus, elle vient de fabriquer une pièce qui l'accuse elle-même." },
    "Ce qui veut dire une seule chose : la maison de Valombre est aux abois.",
    { sobre:"Il y a huit ans, il aurait brûlé la lettre.",
      intense:"Il y a huit ans, il aurait brûlé la lettre sans la finir. Un Paria qui répond à une maison qui connaît la coutume accepte d'être reconnu comme tel — et il a vu où ça mène chez d'autres. Le bout du chemin, c'est une corde, ou un bûcher, ou une nuit.",
      extreme:"Il y a huit ans, il aurait brûlé la lettre avant la troisième ligne.\n\nUn Paria qui répond à une maison connaissant la coutume accepte, par ce seul fait, d'être reconnu comme tel. Il a vu où ça mène chez trois autres — il connaissait les trois, il en a enterré deux, il n'a pas retrouvé le troisième. Le bout du chemin est toujours le même et il n'en existe que trois formes : une corde, un bûcher, ou une nuit où quarante hommes entrent par la porte qu'on ne barrait pas." },
    "Il ne l'a pas brûlée. Il l'a pliée dans sa botte, il a pris la route de Cendrepont, et il a mis onze jours à faire quatre jours de chemin parce qu'il s'est arrêté deux fois pour réfléchir et une fois pour tuer Ferrand.",
    "Il est à une demi-lieue.",
  ],
  choix:[
    { t:"Entrer à Cendrepont sous son propre nom",
      detail:"Yohan. Pas de Karlsberg, pas de titre. Un nom d'homme.",
      risque:"favorable",
      va:'prologue_nom',
      effets:{ flags:['nom_donne'], marque:"Vous êtes entré à Cendrepont sous votre nom.", court:"Votre nom" } },
    { t:"Entrer sous un faux nom",
      detail:"Un Paria sans nom se fait payer moins et dort mieux",
      ferme:"Ferme : le rang que ce contrat pouvait vous donner — on ne parlera pas de vous",
      definitif:true, va:'prologue_faux',
      effets:{ flags:['faux_nom'], suspicion:-2,
               marque:"Vous êtes entré à Cendrepont sous un faux nom.", court:"Un faux nom" } },
    { t:"Faire demi-tour",
      detail:"La lettre est dangereuse pour vous autant que pour elle",
      ferme:"Ferme : la maison de Valombre, et tout ce qui en découlait",
      definitif:true, va:'prologue_demi_tour' },
  ],
},
prologue_nom:{
  texte:[
    "@« Yohan. »",
    "Le sergent d'étape écrit le nom sur son registre d'entrée avec l'application d'un homme qui sait à peine tenir une plume et qui y met un point d'honneur.",
    "« Yohan de quoi ? »",
    "« Yohan. »",
    "Il lève les yeux. Il a douze ans de poste sur cette route, il a vu passer tout ce qui passe, et il a exactement l'expression de quelqu'un qui vient de comprendre quelque chose qu'il préférerait ne pas avoir compris.",
    "Il n'insiste pas. Il écrit *Yohan, homme d'armes, seul, à cheval*, il tourne le registre, et il pousse l'encrier vers vous d'un doigt.",
    "§ « Signez, messire. Et si vous montez à Cendrepont, faites-le avant la nuit. On n'ouvre plus les portes après. »",
    "Ce n'est pas grand-chose. Un nom sur un registre d'étape.",
    "Mais un registre d'étape se recopie, se transmet, et se lit — et il y a en ce moment, dans quatre provinces, des gens dont le métier consiste précisément à lire des registres d'étape.",
  ],
  effets:{ exploit:{ eclat:8, temoins:'un', quoi:"Un nom sur un registre" }, suspicion:3 },
  suite:'hub', libelleSuite:"Cendrepont",
},

prologue_faux:{
  texte:[
    "@« Perrin. Perrin de Saulx. »",
    "Le sergent d'étape écrit *Perrin de Saulx, homme d'armes, seul, à cheval* et ne lève pas les yeux une seule fois. C'est un bon faux nom : assez banal pour ne rien dire, assez précis pour ne pas sonner faux.",
    "« Signez, messire. Et si vous montez à Cendrepont, faites-le avant la nuit. On n'ouvre plus les portes après. »",
    "§ Vous signez d'une main qui n'est pas la vôtre. Vous savez le faire. Vous avez appris à le faire à seize ans, dans une remise, en trois nuits, parce que celui qui vous cachait alors avait dit que ça vous sauverait la vie plus souvent qu'une épée.",
    "Il avait raison. Ça vous a sauvé la vie quatre fois.",
    "Ça vous a aussi coûté onze ans pendant lesquels personne, absolument personne, n'a jamais eu de raison de vous devoir quoi que ce soit.",
  ],
  suite:'hub', libelleSuite:"Cendrepont",
},

prologue_demi_tour:{
  texte:[
    "Vous ne montez pas à Cendrepont.",
    "Vous redescendez la Route Grise vers le sud, et au bout de quatre jours vous prenez un contrat d'escorte pour un marchand de laine qui paie douze écus et ne sait pas ce qu'est un Paria.",
    "C'est une vie. Elle a duré dix-neuf ans et elle peut durer encore.",
  ],
  issue:"L'Acte I ne commence pas",
  bilan:"Vous avez brûlé la lettre trop tard et fait demi-tour trop tôt",
  apres:[
    "La wyverne de Cendrepont tue onze personnes de plus avant qu'une compagnie de Chastel l'abatte à la baliste au printemps.",
    "La maison de Valombre ne réécrit jamais à personne les cinq mots dangereux. Une maison qui a tendu la main une fois et n'a rien attrapé ne recommence pas.",
    "§ Il n'y a pas d'histoire ici. C'est bien ce que vous vouliez.",
  ],
  plusTard:"Rien. Absolument rien, et pour toujours. C'est ce que coûte le choix de ne pas être là.",
},

/* ── Le tableau : les six affaires, trois saisons ─────────────────────── */
hub:{ dyn:true },

/* ── Le basculement ────────────────────────────────────────────────────── */
bascule:{ dyn:true },

};

/* ── Le hub, composé à l'ouverture ─────────────────────────────────────── */
function rendreHub(){
  const A = ETAT.acte;
  const reste = A.engagements - A.arcsFaits.length;
  const rang = rangActuel();

  const perdus = A.arcsPerdus || [];
  const dispo = AFFAIRES.filter(x => !A.arcsFaits.includes(x.id) && !perdus.includes(x.id));
  const saisons = ["Fin d'hiver", "Printemps", "Été", "Automne"];

  SCENES.hub = {
    lieu:`Cendrepont · ${saisons[Math.min(A.saison, 3)]} · dix-neuvième année après la Purge`,
    titre: A.arcsFaits.length === 0 ? "Le tableau des mercenaires" : "Ce qui reste sur le tableau",
    texte:[
      A.arcsFaits.length === 0
        ? "La salle basse de l'auberge du Héron sert de bureau d'embauche à toute la vallée, parce que c'est là qu'il y a un feu et parce que l'aubergiste prend un sou par lettre affichée. Le mur du fond est couvert de papiers de tailles différentes, certains vieux de deux ans, cloués les uns par-dessus les autres."
        : "Le mur du fond a moins de papiers qu'à votre arrivée. Certains sont partis parce que quelqu'un d'autre les a pris. D'autres parce qu'il n'y avait plus rien à faire.",
      `§ Vous n'avez pas de troupe, pas de château, pas de nom qu'on puisse écrire. Vous avez un cheval, une épée, et **${reste} saison${reste > 1 ? 's' : ''}** avant que l'hiver revienne et que la vallée se referme.`,
      "On ne prend pas six affaires. On en prend trois. Les autres seront prises par d'autres, ou par personne, et ça se saura.",
      `Pour l'instant, dans cette vallée, on dit : « ${rang.cri} ». ${rang.note}`,
      rang.id === 'inconnu' ? "" :
        (rang.id === 'nomme'
          ? "Les sommes ont monté de moitié depuis qu'on vous demande par votre nom, et deux lettres du mur sont adressées au lieu d'être affichées. C'est ce que rapporte le renom. Le reste de ce qu'il rapporte n'arrive pas par le mur."
          : "Les papiers du mur ne vous concernent plus tout à fait. On vous écrit, maintenant, et pas seulement des maisons ; l'aubergiste garde deux plis sous le comptoir qu'il n'a pas voulu clouer au mur, et il ne veut pas dire pourquoi."),
      perdus.length
        ? `§ ${perdus.map(id => AFFAIRES.find(x => x.id === id).titre).join(' · ')} — décroché${perdus.length > 1 ? 's' : ''} du mur pendant que vous vous remettiez. Quelqu'un d'autre les a.`
        : "",
    ].filter(Boolean),
    choix: (reste > 0 ? dispo : []).map(x => ({
      t: `${x.titre} — ${x.maison}`,
      detail: `${x.lieu} · ${x.danger} · ${prime(x.or)} couronnes${x.prix ? " · la coutume est due" : ""}`,
      va: x.entree,
      effets:{ flags:['pris_' + x.id] },
      avant: () => { A.arcsFaits.push(x.id); A.saison++; A.contrat = { id:x.id, or:prime(x.or) }; },
    })).concat(reste <= 0 ? [{
      t:"Ne rien prendre de plus. L'hiver revient.",
      detail:"Trois saisons brûlées · le tableau se referme",
      risque:"définitif", definitif:true, va:'bascule',
    }] : []),
  };
  aller('hub');
}

/* Le basculement : ce qui s'est passé sans vous, et ce que le monde dit. */
function rendreBascule(){
  const A = ETAT.acte;
  A.arcsIgnores = AFFAIRES.filter(x => !A.arcsFaits.includes(x.id)).map(x => x.id);
  const ignores = AFFAIRES.filter(x => A.arcsIgnores.includes(x.id));
  const rang = rangActuel();

  SCENES.bascule = {
    lieu:"Cendrepont · premières neiges · vingtième année après la Purge",
    titre:"Ce qui s'est passé pendant ce temps",
    texte:[
      "L'hiver revient sur la Route Grise avec quinze jours d'avance et referme la vallée. Le tableau du Héron est nettoyé une fois l'an ; l'aubergiste décloue les papiers, les compte, et brûle ceux dont personne ne viendra plus.",
      "§ Vous en avez pris trois. Voici ce qu'il est advenu des trois autres.",
    ].concat(ignores.map(x => `**${x.titre}.** ${x.sans}`)).concat([
      "Aucune de ces trois choses n'est de votre faute. Vous ne pouviez pas être à quatre endroits, et personne de sensé ne vous le reprochera.",
      "Vous y penserez quand même. C'est la seule chose que le métier n'apprend pas à faire taire.",
      `§ Dans cette vallée, désormais, on dit : « ${rang.cri} »`,
      rang.id === 'inconnu'
        ? "Vous avez travaillé proprement et sans témoin. Personne ne sait votre nom, personne ne vous doit rien, et le prochain contrat se négociera exactement comme le premier. C'est un choix, et il a un prix."
        : (rang.id === 'nomme'
          ? "On vous demande par votre nom, maintenant. Les lettres arrivent adressées, les sommes montent, et deux personnes dans cette province ont commencé à se demander d'où sort un homme d'armes que personne ne se rappelle avoir vu grandir."
          : "Quelqu'un, quelque part, a fait le rapprochement entre ce que vous savez faire et une maison rayée il y a dix-neuf ans. Ce n'est pas une rumeur de taverne : c'est écrit, quelque part, dans un dossier, avec une date. Ce qui vous cherche maintenant n'a plus rien d'un commanditaire."),
    ]),
    suite:'as_arrivee', libelleSuite:"Ce qui monte la vallée",
  };
  aller('bascule');
}



SCENES_MONDE.hub_retour = { dyn:true };



/* ── Enregistrement et aiguillages ─────────────────────────────────────── */
enregistrerScenes(SCENES_MONDE);
DYN.hub        = () => rendreHub();
DYN.hub_retour = () => rendreHub();
DYN.bascule    = () => rendreBascule();
