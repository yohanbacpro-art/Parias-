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
    sans:"Ser Aldren a été pris vivant sur la Côte des Dents et pendu à Rochebrune après trois jours de question. Il a répété le même nom jusqu'à la fin — celui du chevalier qui l'avait défiguré et trahi. Ce nom est celui du beau-frère du seigneur de Rochebrune. Personne n'a pris de notes.",
  },
  {
    id:'C03', titre:"L'Héritier disparu", maison:"Maison d'Arquenay",
    lieu:"Contreforts nains", danger:"dangereux", or:300, prix:true,
    pitch:"Gaspard d'Arquenay, vingt-deux ans, n'est pas rentré des contreforts. Sa sœur Maëlys croit qu'il a fui un mariage politique. Sa maison paie pour qu'on le ramène.",
    sans:"Gaspard d'Arquenay est mort dans une galerie clandestine sous les contreforts, avec dix-neuf mineurs et quatorze prisonniers que sa propre maison y avait vendus. L'effondrement a été déclaré accidentel. Maëlys d'Arquenay a été mariée en Floréal à un homme qu'elle n'a vu que le jour du contrat.",
  },
  {
    id:'C04', titre:"Les Trois Frères Rouges", maison:"Maison de Vauclair",
    lieu:"Marais de Sombreval", danger:"modéré", or:200, prix:true,
    pitch:"Vauclair veut trois brigands vivants, et paie le triple si aucun ne meurt. Un contrat de mercenaire ne précise jamais pourquoi on tient tant à ce qu'un homme puisse parler — ou se taire.",
    sans:"Les trois frères ont été pris au filet dans les marais et exécutés dans la cour de Vauclair avant tout procès, pour vol et rébellion. Aucun des trois n'a été entendu. La communauté de serfs fugitifs qu'ils protégeaient a été dispersée dans le mois ; on en a retrouvé onze noyés dans les tourbières.",
  },
  {
    id:'C05', titre:"Le Troll du vieux pont", maison:"Maison de Sombreval",
    lieu:"Le vieux pont", danger:"dangereux", or:220, prix:true,
    pitch:"Le troll du vieux pont n'exige plus de péage. Il exige une histoire vraie. Le grain de Sombreval pourrit dans les granges depuis deux mois.",
    sans:"Le vieux pont a été repris à la poudre. Le troll a mis quatre jours à mourir sous les décombres et on l'entendait depuis le bourg. Le grain est passé. On a rebâti un pont neuf à trois cents pas en amont, et personne n'y raconte plus rien à personne.",
  },
  {
    id:'C06', titre:"La Dame captive", maison:"Maison de Hauterive",
    lieu:"Un moulin, quelque part", danger:"modéré", or:280, prix:true,
    pitch:"Isabeau de Hauterive, trente et un ans, a été enlevée par des mercenaires. Son époux paie bien et exige la discrétion — il l'exige même avant de dire combien.",
    sans:"Isabeau de Hauterive a été ramenée à son époux par une compagnie qui n'a posé aucune question et a été payée pour ça. Elle est morte en Prairial. La maison a fait dire une fièvre. Les preuves qu'elle emportait n'ont jamais été retrouvées, et son époux siège désormais au conseil de la province.",
  },
];

/* ── Le prologue ───────────────────────────────────────────────────────── */
const SCENES_MONDE = {

prologue:{
  lieu:"Quelque part sur la Route Grise · dix-neuvième année après la Purge",
  titre:"Ce qu'on est quand on n'est plus rien",
  texte:[
    "Il y a trois façons de reconnaître un Paria, et deux d'entre elles sont fausses.",
    "La première dit qu'ils ont les yeux clairs. C'est faux : ils les ont comme tout le monde. La deuxième dit qu'ils sentent le métal. C'est faux aussi, mais ça vient d'une vraie chose — quand l'Onde bouge dans un corps, l'air autour prend un goût de pièce de monnaie qu'on aurait gardée trop longtemps sous la langue.",
    "La troisième est la bonne, et elle ne se voit pas : un Paria est quelqu'un dont la maison a été rayée. Pas vaincue, pas ruinée. **Rayée.** On a brûlé les registres, gratté les pierres, rebaptisé les hameaux, et payé des gens pour oublier. Il y a dix-neuf ans, sept cents personnes se sont couchées nobles et se sont réveillées inexistantes, et celles qui ont survécu à la semaine ont appris très vite qu'un homme sans registre n'a pas de recours, pas d'héritage, pas de tribunal, et rien à quoi s'accrocher quand quelqu'un décide qu'il ne devrait pas être là.",
    "§ Yohan de Karlsberg a vingt-neuf ans et il n'a jamais dit son nom entier à personne qui ne soit pas mort depuis.",
    "Il a une épée longue sobre, usée, bien équilibrée, achetée à un armurier qui ne posait pas de questions et payée avec l'argent d'un contrat dont il ne parle pas. Une dague robuste. Une protection de voyage — cuir renforcé, mailles sur le torse et les épaules, des gants assez fins pour sentir la garde. Ça l'a sauvé onze fois des coupures et des carreaux mal tirés. Ça ne transformera jamais un coup de masse en caresse.",
    "Il a aussi, quelque part sous les côtes, une chose qui pousse quand il a peur, et qu'il ne contrôle pas très bien.",
    "Ce qu'il fait, c'est du travail. On l'engage pour tuer des bêtes, retrouver des gens, escorter du sel, régler des querelles que les maisons ne veulent pas porter devant un prévôt. Il est bon. Il n'est pas connu. Les deux vont ensemble et ça lui va très bien.",
    "Voilà où on en est : un homme qui vaut mieux que sa réputation, sur une route grise, en fin d'hiver, avec quarante écus, une lettre pliée dans sa botte, et une cicatrice sous la clavicule qui le tire quand il gèle.",
  ],
  suite:'prologue_lettre', libelleSuite:"La lettre",
},

prologue_lettre:{
  titre:"La lettre",
  texte:[
    "La lettre est arrivée par un muletier à l'auberge d'étape, il y a onze jours. Elle porte le sceau de la maison de Valombre — un héron sur trois vagues — et elle est courte.",
    "*Une bête a fait son nid au-dessus de la Route Grise, à Cendrepont. Trois caravanes en six semaines. La maison de Valombre paie deux cent cinquante couronnes à qui rouvrira la route, et honorera la coutume ancienne si celui qui vient est de ceux à qui elle est due.*",
    "§ *…et honorera la coutume ancienne.*",
    "Ces cinq mots changent tout. Une maison qui les écrit sait ce qu'elle écrit. Elle sait ce qu'est un Paria, elle sait ce qu'on lui doit, et elle sait qu'en le mettant noir sur blanc elle vient de rendre la lettre dangereuse pour elle-même.",
    "Ce qui veut dire que la maison de Valombre est aux abois.",
    "Il y a huit ans, Yohan aurait brûlé la lettre. Un Paria qui répond à une maison qui connaît la coutume, c'est un Paria qui accepte d'être reconnu comme tel, et être reconnu comme tel, c'est le premier pas d'un chemin dont il a vu le bout chez d'autres — et le bout, en général, c'est une corde ou un bûcher.",
    "Il ne l'a pas brûlée. Il l'a pliée dans sa botte, il a pris la route de Cendrepont, et il a mis onze jours à faire quatre jours de chemin parce qu'il s'est arrêté deux fois pour réfléchir.",
    "Il est à une demi-lieue.",
  ],
  choix:[
    { t:"Entrer à Cendrepont sous son propre nom",
      detail:"Yohan. Pas de la Karlsberg, pas de titre. Un nom d'homme.",
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
    "« Yohan. »",
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
    "« Perrin. Perrin de Saulx. »",
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
      va: x.entree || 'pas_ecrit',
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

SCENES_MONDE.pas_ecrit = {
  titre:"Pas encore écrit",
  texte:[
    "Cette affaire existe dans le pack narratif, en six lignes, et elle attend d'être développée à cinq mille mots comme l'a été la Wyverne de Cendrepont.",
    "§ C'est ici que se branche le contenu à venir : la machine de l'acte est finie, les arcs se posent dedans.",
    "Reprenez le tableau et prenez la Wyverne — c'est celle qui est écrite.",
  ],
  suite:'entre_saisons', libelleSuite:"Revenir au tableau",
};

SCENES_MONDE.hub_retour = { dyn:true };



/* ── Enregistrement et aiguillages ─────────────────────────────────────── */
enregistrerScenes(SCENES_MONDE);
DYN.hub        = () => rendreHub();
DYN.hub_retour = () => rendreHub();
DYN.bascule    = () => rendreBascule();
