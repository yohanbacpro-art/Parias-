/* PARIAS — Acte II · LE DUEL DE ROBERT D'ESCLAVELLE
 * ═══════════════════════════════════════════════════════════════════════
 * Un duel de province n'est pas un sport. C'est une procédure d'extinction :
 * deux hommes entrent dans un carré de terre battue et l'un des deux cesse
 * d'avoir des droits.
 *
 * Celui-ci arrive parce qu'une maison humiliée n'a pas d'autre instrument.
 * Robert d'Esclavelle a quarante-quatre ans, onze duels, et rien à perdre
 * que le peu qui lui reste — c'est-à-dire tout, dans ce monde-là.
 *
 * Ce que ce duel met sur la table, et que rien d'autre ne mettait :
 *   — LES DEUX PISTOLETS. Deux coups dans toute une vie de combat. Ici on
 *     peut en brûler un avant le premier fer, ce qui est légal, tenu pour
 *     ignoble, et parfaitement décisif.
 *   — LE DRAIN. Devant cent personnes et un héraut d'armes. Après ça, il
 *     n'y a plus de version où l'on ne sait pas.
 * ═══════════════════════════════════════════════════════════════════════ */

const situDuel = () => (a('du_epaule_lue') ? 3 : 0)
                     + (a('du_boue') ? 2 : 0)
                     - (ETAT.melee && ETAT.melee.tour > 1 ? 1 : 0);

const DUEL = {

du_provoque:{
  qui:'esclavelle',
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  titre:"Le gant, et ce qu'il y a dedans",
  texte:[
    "Il ne jette pas de gant. Personne ne jette de gant : c'est une invention de tapisserie.",
    { sobre:"Il vous gifle, en public, avec la main ouverte.",
      intense:"Il traverse la salle basse de l'auberge, s'arrête à un pas, et vous frappe au visage avec la main ouverte, assez fort pour que la moitié de la salle l'entende. C'est la procédure. Elle est laide et elle est efficace.",
      extreme:"Il traverse la salle basse de l'auberge du Héron, s'arrête à un pas, attend que vous leviez la tête — il attend, c'est important, il faut que vous regardiez — et il vous frappe au visage avec la main ouverte, assez fort pour que le bruit couvre la salle et pour que votre lèvre s'ouvre contre les dents. C'est la procédure exacte, celle du droit de province, et elle est laide et parfaitement efficace : un coup porté à main ouverte devant témoins ne se refuse pas. On y répond ou l'on cesse d'exister socialement le lendemain matin." },
    "**Robert d'Esclavelle.** Quarante-quatre ans, onze duels, un nez qu'on lui a refait trois fois et une maison qui tient sur deux fermes et un moulin.",
    () => a('a2_bannieres') || a('a2_donjon')
      ? "Sa maison est en travers de la voie de la vallée. Depuis que Karlsberg monte, la route passe chez vous et ne passe plus chez lui. Ça ne se plaide devant aucun tribunal."
      : "Vous ne lui avez rien fait. Il vous a choisi parce que vous êtes un Paria, que personne ne relèvera votre nom, et qu'un homme qui tue un Paria en duel régulier n'a rien à expliquer à personne.",
    "§ Il parle pour la salle, pas pour vous. C'est aussi la procédure.",
    { sobre:"« Un Paria n'a pas de sang à laver. Je vais quand même le répandre. »",
      intense:"« Messieurs, cet homme n'a pas de maison, donc pas de sang à laver, donc rien à défendre. » Il essuie sa main sur sa cuisse. « Je vais quand même le répandre, et personne n'écrira une ligne. »",
      extreme:"« Messieurs. » Il ne quitte pas votre visage des yeux et il parle à la salle, ce qui demande un entraînement. « Cet homme n'a pas de maison. Il n'a donc pas de sang à laver, pas de nom à défendre, et aucun parent pour porter plainte. » Il essuie sa main ouverte sur sa cuisse, lentement, comme après avoir touché quelque chose. « Je vais quand même le répandre sur la terre battue de la place, devant vous tous, et il n'y aura pas une ligne écrite nulle part. C'est ça, un Paria. C'est un homme qu'on peut tuer proprement. »" },
    "§ La salle ne dit rien. Une femme sort. Le tavernier commence à rentrer les brocs de terre.",
    "Il y a exactement trois façons de sortir de là, et deux d'entre elles vous coûtent plus que le duel.",
  ],
  effets:{ flags:['du_provoque'] },
  choix:[
    { t:"Accepter, et fixer les armes",
      detail:"c'est l'offensé qui répond, mais c'est le provoqué qui choisit le fer · demain, à la place, à sept heures",
      risque:"dangereux", va:'du_accepte' },

    { t:"Le tuer maintenant, dans la salle",
      detail:"ce ne serait pas un duel · ce serait un meurtre devant trente témoins, et ils le diraient",
      risque:"définitif", ferme:"Ferme : la possibilité d'être quelqu'un de régulier dans cette province",
      definitif:true, va:'du_meurtre' },

    { t:"Ne pas répondre",
      detail:"partir · et devenir, en une nuit, l'homme qui ne répond pas",
      risque:"définitif", ferme:"Ferme : ce que votre nom valait sur la Route Grise",
      definitif:true, va:'du_refuse' },
  ],
},

du_accepte:{
  qui:'esclavelle',
  lieu:"Cendrepont · la place · sept heures",
  titre:"Ce qu'on regarde avant",
  texte:[
    "On se bat sur la place, dans un carré de vingt pas marqué à la chaux, avec un héraut d'armes du bailliage qui compte les gens et note les noms.",
    { sobre:"Il y a cent personnes.",
      intense:"Il y a cent personnes à sept heures du matin un jour de semaine. Personne ne travaille. Deux enfants sont montés sur le mur du cimetière.",
      extreme:"Il y a cent personnes sur la place à sept heures du matin, un jour de semaine, dans une bourgade de trois cents âmes. Personne ne travaille. Le boulanger a ouvert et refermé. Deux enfants sont montés sur le mur bas du cimetière et personne ne les fait descendre, parce que tout le monde a compris qu'il n'y a rien à cacher à des enfants qui ont déjà vu tuer un cochon." },
    "§ Ce qu'on a le droit de faire, dans le droit de province : tout ce qu'on porte sur soi en entrant dans le carré.",
    "Ce n'est pas un oubli du texte. C'est le texte : un duel n'est pas un sport, c'est une extinction, et la loi ne s'intéresse qu'à la régularité de la provocation.",
    "Vous avez donc, sur vous : une épée bâtarde, deux pistolets à silex chargés, et ce que vous avez sous les côtes.",
    { sobre:"Lui a une épée de main et demie et une dague de parade.",
      intense:"Lui a une épée de main et demie, une dague de parade au côté gauche, et onze duels derrière lui, ce qui vaut mieux que n'importe quel équipement.",
      extreme:"Lui a une épée de main et demie qui a été rehaussée deux fois, une dague de parade au côté gauche, un gambison neuf sous une chemise propre — le gambison est légal, tout le monde en porte, et tout le monde fait semblant que non — et onze duels derrière lui. Onze. C'est un chiffre qui vaut mieux que n'importe quel équipement de ce monde, et il vous regarde le calculer." },
    "§ Il vous reste un quart d'heure et il y a trois choses à faire d'un quart d'heure.",
  ],
  choix:[
    { t:"Le regarder marcher",
      detail:"onze duels laissent des traces · un homme de quarante-quatre ans a mal quelque part et ne le sait plus",
      risque:"prudent", va:'du_lire' },
    { t:"Regarder la terre",
      detail:"il a plu quatre jours · la moitié du carré est de la boue et l'autre a séché",
      risque:"prudent", va:'du_terre' },
    { t:"Ne rien faire de ce quart d'heure",
      detail:"il y a des hommes que la préparation dessert · il vaut mieux entrer froid que serré",
      risque:"calculé", va:'du_combat_1' },
  ],
},

du_lire:{
  titre:"Onze duels",
  texte:[
    "Il fait les cent pas dans le carré, sur la longueur, sept fois.",
    { sobre:"Il tourne toujours du même côté.",
      intense:"Il tourne sept fois sur sept par la droite. Un homme qui marche tourne indifféremment. Un homme qui a mal à un genou tourne du côté de l'autre.",
      extreme:"Il fait sept allers-retours et il tourne sept fois par la droite. Un homme qui marche sans y penser tourne indifféremment d'un côté ou de l'autre — c'est mesurable, c'est constant, et n'importe qui peut le vérifier sur une place de marché en dix minutes. Un homme qui tourne toujours du même côté protège quelque chose : un genou, une hanche, une vieille adhérence. Chez lui, c'est le genou gauche, et il ne le sait probablement plus lui-même depuis six ou sept ans." },
    "§ Sur un pas de côté vers sa gauche, il devra reculer au lieu de pivoter.",
    "Une demi-seconde. C'est tout ce qu'on obtient d'un quart d'heure, et c'est énorme.",
  ],
  effets:{ flags:['du_epaule_lue'],
           exploit:{ eclat:1, temoins:'aucun', quoi:"vous avez compté ses pas" },
           marque:"Robert d'Esclavelle protège son genou gauche depuis six ou sept ans et ne le sait plus.",
           court:"Le genou gauche" },
  suite:'du_combat_1', libelleSuite:"Sept heures" },

du_terre:{
  titre:"Quatre jours de pluie",
  texte:[
    "Il a plu quatre jours et il a cessé avant-hier.",
    { sobre:"Le carré n'a pas séché uniformément.",
      intense:"Le carré est orienté nord-sud. Le côté est a pris le soleil pendant deux jours et a durci ; le côté ouest, à l'ombre du mur de l'église, est encore gras sur deux pouces.",
      extreme:"Le carré de chaux est orienté nord-sud, et le mur de l'église le borde à l'ouest sur toute sa longueur. Le côté est a pris le soleil pendant deux jours pleins : il a durci, il est bon, on y prend appui. Le côté ouest est resté à l'ombre : il est encore gras sur deux pouces, et deux pouces de terre grasse sous un homme qui charge, c'est un pied qui part au troisième pas." },
    "§ On ne choisit pas son côté : le héraut place les deux hommes.",
    "Mais on choisit où l'on recule, et un homme qu'on fait reculer vers l'ouest recule vers de la boue sans savoir qu'il y va.",
  ],
  effets:{ flags:['du_boue'],
           marque:"Le côté ouest du carré est encore gras sur deux pouces. Un homme qu'on y fait reculer ne le sait pas.",
           court:"Deux pouces" },
  suite:'du_combat_1', libelleSuite:"Sept heures" },

/* ══ LE DUEL ══════════════════════════════════════════════════════════════ */
du_combat_1:{
  melee:true,
  lieu:"Cendrepont · le carré",
  titre:"Robert d'Esclavelle",
  effets:{ melee:{ eux:1, position:"vingt pas de chaux", note:"entier", tour:0 } },
  texte:[
    "Le héraut dit trois phrases réglementaires que personne n'écoute, puis il sort du carré.",
    { sobre:"Il vient droit.",
      intense:"Il ne fait aucune des choses des duellistes de récit. Il ne salue pas, ne parle pas, ne cherche pas la distance. Il vient droit, vite, l'épée basse, et il vous donne trois secondes pour comprendre que les onze duels ne sont pas une réputation.",
      extreme:"Il ne fait aucune des choses que font les duellistes dans les récits. Il ne salue pas. Il ne parle pas. Il ne cherche pas la distance, ne tourne pas, n'étudie rien — il a étudié pendant que vous comptiez ses pas. Il vient droit, vite, l'épée basse et la dague déjà sortie, et vous avez environ trois secondes pour comprendre que onze duels n'est pas une réputation : c'est une méthode, elle consiste à ne jamais laisser le premier échange devenir un deuxième, et elle a marché onze fois." },
    () => a('du_epaule_lue')
      ? "§ Il charge en ligne. Sur un pas vers sa gauche, il devra reculer au lieu de pivoter : une demi-seconde, et vous savez exactement où elle est."
      : "§ Il charge en ligne et vous ne savez rien de lui que ce qu'il vous montre, ce qui est très peu.",
    () => a('du_boue')
      ? "Le côté ouest est gras. Il est en train d'y aller et il ne le sait pas."
      : "",
    "Cent personnes. Un héraut d'armes du bailliage qui tient un rôle.",
  ],
  choix:[
    choixPistolet({ dc:9, adversaire:'esclavelle', situation:situDuel,
      degres:{ dominante:'du_pistolet_dom', couteuse:'du_pistolet_cout', echec:'du_pistolet_ko' } }),

    { t:"Le pas vers sa gauche",
      si:() => a('du_epaule_lue'),
      detail:"là où il doit reculer au lieu de pivoter · une demi-seconde · Agilité + épées contre 8",
      risque:"calculé",
      test:{ carac:'agilite', comp:'epees', dc:8, adversaire:'esclavelle', manoeuvre:'gauche',
             equipement:2, situation:situDuel },
      degres:{ dominante:'du_gauche_dom', couteuse:'du_cout', echec:'du_ko' } },

    { t:"Encaisser le premier échange",
      detail:"onze duels finissent tous au premier échange · le douzième n'a qu'à durer · Endurance + épées contre 10",
      risque:"dangereux",
      test:{ carac:'endurance', comp:'epees', dc:10, adversaire:'esclavelle', manoeuvre:'encaisser',
             equipement:1, situation:situDuel },
      degres:{ dominante:'du_tenir_dom', couteuse:'du_cout', echec:'du_ko' } },

    { t:"La dague, à la main gauche, avant qu'il l'ouvre",
      detail:"il sort la dague en même temps que l'épée · c'est son unique défaut de méthode · Agilité + dagues contre 11",
      risque:"très dangereux",
      test:{ carac:'agilite', comp:'dagues', dc:11, adversaire:'esclavelle', manoeuvre:'dague',
             equipement:1, situation:situDuel },
      degres:{ dominante:'du_dague_dom', couteuse:'du_cout', echec:'du_ko' } },
  ],
},

du_pistolet_dom:{
  melee:true,
  titre:"À sept pas",
  effets:{ meleeMaj:{ position:"il est à terre", note:"la hanche ouverte", tour:1 },
           flags:['du_pistolet','a2_pistolet_public'],
           exploit:{ eclat:9, temoins:'foule', quoi:"un pistolet à silex dans un duel de province" },
           marque:"Vous avez tiré à sept pas, dans un duel régulier. C'est légal. Cent personnes l'ont vu.",
           court:"Sept pas" },
  texte:[
    "On ne tire pas un pistolet à silex comme on tire une arbalète : il y a un délai entre la pierre et la poudre, et ce délai fait rater tous ceux qui l'ignorent.",
    { sobre:"Vous tirez à sept pas.",
      intense:"Vous laissez venir jusqu'à sept pas — quatre de moins que le confort, deux de plus que la panique — et vous tirez pendant qu'il accélère, en tenant la ligne un demi-souffle après le déclenchement.",
      extreme:"Vous laissez venir jusqu'à sept pas. Quatre de moins que le confort, deux de plus que la panique, et c'est la seule distance qui vaille : assez près pour que le délai de la platine ne compte plus, assez loin pour qu'il ne soit pas déjà sur vous quand la balle part. Vous tenez la ligne un demi-souffle après le déclenchement, ce qui est la seule chose qu'il faut apprendre et que personne n'apprend." },
    "§ Le bruit arrive à toute la place en même temps que la fumée.",
    { sobre:"Trois quarts d'once de plomb dans la hanche droite.",
      intense:"Trois quarts d'once de plomb, à sept pas, dans la hanche droite. Un gambison n'arrête pas ça. Rien de ce que ce monde sait fabriquer n'arrête ça.",
      extreme:"Trois quarts d'once de plomb, à sept pas, entrent dans la hanche droite et n'en ressortent pas. Un gambison n'arrête pas ça. Une brigandine n'arrête pas ça. Il n'existe rien dans ce monde, à sept pas, qui arrête ça — c'est très exactement pour cette raison que deux cents ans de tapisseries et de chansons n'ont pas encore décidé si c'est une arme d'homme." },
    "Il tombe en trois temps : le genou, la main, puis le côté. Il ne lâche pas l'épée.",
    "§ Personne n'applaudit. Personne ne siffle non plus.",
    "Le héraut d'armes note quelque chose sur son rôle, et vous saurez seulement des mois plus tard qu'il a écrit : *régulier*.",
    { sobre:"Mais cent personnes ont vu un homme régler un duel sans croiser le fer.",
      intense:"Ce qui est écrit au rôle et ce qui se raconte à l'étape ne sont jamais la même chose. Le rôle dit *régulier*. L'étape dira que le Paria n'a pas croisé le fer.",
      extreme:"Ce qui est porté au rôle et ce qui se raconte à l'étape ne sont jamais la même chose, et c'est la deuxième leçon de la matinée. Le rôle dit *régulier*, ce qui est exact et vous protège devant n'importe quel tribunal de province. L'étape dira que le Paria de Karlsberg n'a pas croisé le fer avec Robert d'Esclavelle, et l'étape n'a pas tort non plus. Vous porterez les deux versions pendant des années." },
  ],
  suite:'du_fin', libelleSuite:"Il est à terre" },

du_gauche_dom:{
  melee:true,
  titre:"La demi-seconde",
  effets:{ meleeMaj:{ position:"il a reculé, il est de travers", note:"le flanc ouvert", tour:1 },
           flags:['du_gauche'],
           exploit:{ eclat:11, temoins:'foule', quoi:"onze duels battus par un quart d'heure d'observation" },
           marque:"Un pas vers sa gauche. Il a reculé au lieu de pivoter, comme depuis six ans.",
           court:"La demi-seconde" },
  texte:[
    "Un pas. Vers sa gauche, dans son mouvement, à contretemps de sa charge.",
    { sobre:"Il recule au lieu de pivoter.",
      intense:"Un homme entier pivote sur le genou gauche et vous rattrape. Lui recule d'un demi-pas, parce que son genou ne pivote plus depuis six ans et que son corps a cessé de le lui demander.",
      extreme:"Un homme entier pivote sur le genou gauche, ouvre la hanche et vous rattrape sans y penser — c'est le geste le plus élémentaire de l'escrime et on l'apprend en trois semaines. Lui recule d'un demi-pas. Son genou ne pivote plus depuis six ou sept ans, son corps a cessé de le lui demander, et il a construit onze victoires sur une méthode qui rend ce défaut invisible : ne jamais laisser un adversaire arriver au deuxième échange." },
    "§ C'est le deuxième échange.",
    () => a('du_boue')
      ? "Et il recule vers l'ouest, où la terre est grasse sur deux pouces, ce qu'il ne sait pas."
      : "Et il découvre, à quarante-quatre ans, devant cent personnes, qu'il a un défaut.",
    "Le flanc s'ouvre sur toute sa longueur. Vous ne le prenez pas : vous prenez le bras d'épée, au-dessus du coude, parce qu'un flanc tue et qu'un bras finit un duel.",
    { sobre:"Il lâche l'épée.",
      intense:"Il lâche l'épée. Il la regarde par terre pendant environ une seconde et demie, ce qui est la chose la plus longue de la matinée.",
      extreme:"Il lâche l'épée. Elle tombe à plat, sans bruit particulier, sur de la terre battue. Il la regarde par terre pendant environ une seconde et demie — une seconde et demie, avec cent personnes autour et un bras qui ne se referme plus — et c'est de très loin la chose la plus longue de toute cette matinée, pour lui comme pour vous." },
  ],
  suite:'du_fin', libelleSuite:"Il est désarmé" },

du_tenir_dom:{
  melee:true,
  titre:"Le douzième",
  effets:{ meleeMaj:{ position:"deuxième échange", note:"il souffle", tour:1 },
           flags:['du_tenu'], cout:{ endurance:18 },
           blessure:{ id:'du_flanc', zone:"flanc gauche", type:"estoc peu profond", gravite:1, douleur:2,
                      saignement:1, fonction:[], traitement:null, cicatrice:"trois pouces, sous les côtes" },
           exploit:{ eclat:8, temoins:'foule', quoi:"le premier échange encaissé, ce que personne n'avait fait" },
           marque:"Onze duels finis au premier échange. Le douzième est allé au deuxième.",
           court:"Le douzième" },
  texte:[
    "Onze duels. Onze premiers échanges.",
    { sobre:"Il faut simplement que le douzième dure.",
      intense:"Il n'y a rien à trouver : il faut que le douzième dure. C'est tout le plan, il est humiliant à formuler, et c'est le bon.",
      extreme:"Il n'y a rien de brillant à trouver et c'est ce qui rend la chose supportable : il faut simplement que le douzième dure. C'est tout le plan. Il est humiliant à formuler à voix haute, il ne fera jamais une chanson, et c'est le seul qui tienne debout — parce qu'un homme dont la méthode entière consiste à finir en quatre secondes n'a, par construction, jamais eu à apprendre la cinquième." },
    "Le premier échange coûte trois pouces sous les côtes, à gauche, et un pas en arrière.",
    "§ Le deuxième n'a pas lieu tout de suite, et c'est là que tout se joue.",
    { sobre:"Il souffle.",
      intense:"Il souffle. À quarante-quatre ans, après quatre secondes à cette vitesse, un homme souffle — et il vient de découvrir, devant cent personnes, qu'il souffle.",
      extreme:"Il souffle. C'est tout. Quarante-quatre ans, un gambison neuf, quatre secondes à une vitesse que personne ne tient plus longtemps que ça, et il souffle. Il vient de le découvrir devant cent personnes en même temps que vous, et il faut voir son visage à cette seconde-là : ce n'est pas de la peur, c'est de l'arithmétique. Il fait le compte de ce qui lui reste et il n'aime pas le résultat." },
  ],
  suite:'du_combat_2', libelleSuite:"Le deuxième échange" },

du_dague_dom:{
  melee:true,
  titre:"La main gauche",
  effets:{ meleeMaj:{ position:"il n'a plus de parade", note:"la main gauche ouverte", tour:1 },
           flags:['du_dague'],
           exploit:{ eclat:10, temoins:'foule', quoi:"la dague de parade prise avant qu'elle s'ouvre" },
           marque:"Sa dague de parade est par terre avec deux doigts dessus.",
           court:"La main gauche" },
  texte:[
    "Il sort l'épée et la dague dans le même mouvement, en même temps, toujours. C'est rapide, c'est efficace, et c'est son unique défaut de méthode : deux mains qui partent ensemble ne se couvrent pas l'une l'autre.",
    { sobre:"Vous prenez la main gauche.",
      intense:"Vous ne prenez ni l'épée ni l'homme : vous prenez la main gauche, à l'ouverture, du tranchant, dans le premier huitième de seconde où elle est seule.",
      extreme:"Vous ne prenez ni l'épée, ni l'homme, ni rien qui ressemble à une cible d'escrime. Vous prenez la main gauche, à l'ouverture, du tranchant et de très près, dans le premier huitième de seconde où elle sort et où elle n'est couverte par rien. C'est un geste de rue et pas un geste de salle, on ne l'enseigne dans aucune école de la province, et il faut avoir passé onze ans à se battre pour de l'argent contre des gens qui ne suivent aucune règle." },
    "§ La dague tombe. Deux doigts tombent avec elle.",
    { sobre:"Il ne crie pas. Il regarde sa main.",
      intense:"Il ne crie pas — les mains ne font pas crier tout de suite, c'est plus tard — il regarde sa main gauche et il compte, ce que font tous les hommes qui perdent des doigts.",
      extreme:"Il ne crie pas. Les mains ne font pas crier tout de suite : ça prend quatre ou cinq secondes, le temps que ça remonte, et pendant ces quatre ou cinq secondes l'homme regarde sa main et il compte. Ils comptent tous. Robert d'Esclavelle, quarante-quatre ans, onze duels, compte les doigts de sa main gauche devant cent personnes et il en trouve trois." },
    "Il n'a plus de parade. Un homme sans parade, dans un carré de vingt pas, a environ trente secondes.",
  ],
  suite:'du_fin', libelleSuite:"Trente secondes" },

du_cout:{
  melee:true,
  titre:"Ça passe, et vous le payez",
  effets:{ meleeMaj:{ position:"corps à corps", note:"les deux touchés", tour:1 },
           flags:['du_cout'], cout:{ endurance:20 },
           blessure:{ id:'du_epaule_g', zone:"épaule gauche", type:"estoc profond", gravite:2, douleur:3,
                      saignement:2, fonction:['bouclier','lutte'], traitement:null,
                      cicatrice:"une entrée nette et une sortie qui l'est moins" },
           marque:"Ça a marché. Sa dague est passée par l'épaule gauche, de part en part.",
           court:"De part en part" },
  texte:[
    "Ça marche. Il fallait juste être à la portée de sa dague pour que ça marche.",
    { sobre:"Elle entre dans l'épaule gauche.",
      intense:"Elle entre dans l'épaule gauche, de bas en haut, et elle ressort. Une dague de parade fait dix pouces : dans une épaule, dix pouces, ça traverse.",
      extreme:"Elle entre dans l'épaule gauche, de bas en haut, dans le creux entre le deltoïde et la clavicule, et elle ressort par-derrière. Une dague de parade de province fait dix pouces de lame ; dans une épaule d'homme, dix pouces, ça traverse et il en reste. Le froid arrive avant la douleur, ce qui est toujours la partie la plus déroutante, et pendant environ deux secondes le bras fonctionne encore parfaitement." },
    "§ Vous êtes tous les deux touchés et il n'y en a qu'un des deux qui ait encore ses deux bras.",
    "Ce n'est pas vous.",
  ],
  suite:'du_combat_2', libelleSuite:"Le deuxième échange" },

du_ko:{
  melee:true,
  titre:"Quatre secondes",
  effets:{ meleeMaj:{ position:"à terre, dans la chaux", note:"il est debout au-dessus", tour:1 },
           flags:['du_ko'], cout:{ endurance:26, moral:12 },
           blessure:{ id:'du_cuisse', zone:"cuisse droite", type:"taille profonde", gravite:3, douleur:4,
                      saignement:3, fonction:['agilite','equitation'], traitement:null,
                      cicatrice:"neuf pouces en travers du quadriceps" },
           marque:"Onze duels finissent au premier échange. Vous avez failli être le douzième.",
           court:"Quatre secondes" },
  texte:[
    "Voilà pourquoi il en a gagné onze.",
    { sobre:"Quatre secondes.",
      intense:"Quatre secondes. Il n'y a rien à raconter d'autre : quatre secondes, une taille dans la cuisse droite, et vous êtes assis dans la chaux avec une jambe qui ne répond plus.",
      extreme:"Quatre secondes. Il n'y a strictement rien d'autre à en dire et c'est bien le problème : quatre secondes, une taille en travers de la cuisse droite sur neuf pouces, et vous êtes assis dans la chaux avec une jambe qui ne répond pas du tout et du sang qui part au rythme du cœur, ce qui veut dire l'artère fémorale de très près. Cent personnes viennent de voir tout ce qu'il y avait à voir." },
    "§ Il est debout au-dessus de vous et il ne se presse pas. Un homme qui a gagné onze duels sait exactement combien de temps il a.",
    "Le héraut d'armes n'arrête rien : un duel ne s'arrête que par la mort, le forfait ou l'incapacité, et vous êtes conscient.",
  ],
  suite:'du_combat_2', libelleSuite:"Il ne se presse pas" },

du_pistolet_cout:{
  melee:true,
  titre:"Le délai",
  effets:{ meleeMaj:{ position:"corps à corps", note:"il est touché au bras", tour:1 },
           flags:['du_pistolet','a2_pistolet_public'], cout:{ endurance:14 },
           blessure:{ id:'du_visage', zone:"pommette gauche", type:"coupure profonde", gravite:1, douleur:3,
                      saignement:2, fonction:['perception'], traitement:null,
                      cicatrice:"de l'os de la joue à la mâchoire, et elle se verra toujours" },
           exploit:{ eclat:5, temoins:'foule', quoi:"un coup de pistolet dans un duel, et il est arrivé quand même" },
           marque:"Le délai de la platine. Il est arrivé sur vous pendant que la poudre prenait.",
           court:"Le délai" },
  texte:[
    "Il y a un délai entre la pierre et la poudre. Il est court. Il n'est pas nul, et un homme qui charge parcourt trois pas dedans.",
    { sobre:"Le coup part et il est déjà là.",
      intense:"Le coup part, la balle prend le bras au lieu du corps, et il est déjà sur vous — parce qu'il a vu le pistolet se lever et qu'il a fait la seule chose qui vaille : accélérer.",
      extreme:"Le coup part. La balle prend le bras gauche au lieu du corps, ce qui est une blessure et pas une décision, et il est déjà sur vous. C'est exactement ce qu'il fallait faire de son côté et il l'a fait sans réfléchir : quand un homme lève un pistolet à onze pas, on n'esquive pas, on accélère, parce que la seule chose qui sauve est de réduire le délai à zéro. Onze duels lui ont appris ça, et pas dans un livre." },
    "§ La garde de sa dague vous ouvre la joue de l'os à la mâchoire.",
    "Vous porterez ça toute votre vie et on vous le demandera environ deux cents fois.",
    "Le pistolet est vide, chaud, et parfaitement inutile pour le reste de la matinée.",
  ],
  suite:'du_combat_2', libelleSuite:"Le deuxième échange" },

du_pistolet_ko:{
  melee:true,
  titre:"Un long feu",
  effets:{ meleeMaj:{ position:"à terre", note:"il n'a rien", tour:1 },
           flags:['du_longfeu','a2_pistolet_public'], cout:{ endurance:24, moral:14 },
           blessure:{ id:'du_ventre', zone:"ventre, au-dessus de la hanche", type:"estoc", gravite:3, douleur:4,
                      saignement:3, fonction:['endurance','lutte'], traitement:null,
                      cicatrice:"quatre pouces, et une digestion qui n'est jamais redevenue normale" },
           marque:"Un long feu. La platine a claqué, la poudre a mis un temps, et lui non.",
           court:"Un long feu" },
  texte:[
    "Un long feu.",
    { sobre:"La platine claque, et rien ne part.",
      intense:"La platine claque, l'amorce prend, et la charge met un temps — un temps ridicule, une fraction — pendant lequel il n'y a rien au bout du canon qu'un homme qui arrive.",
      extreme:"La platine claque parfaitement. L'amorce prend. Et la charge met un temps : un temps ridicule, une petite fraction de seconde, qui arrive quand la poudre a pris l'humidité de quatre jours de pluie et qu'on n'a pas rechargé le matin même. Ce temps-là ne se voit pas. Il s'entend, après coup, quand on se repasse la scène pendant des mois : *clac* — et puis le coup, une fraction trop tard, dans le ciel." },
    "§ Le coup part en l'air pendant qu'il vous met sa lame au-dessus de la hanche.",
    "Un pistolet vide dans la main droite et quatre pouces d'acier dans le ventre : c'est la position la plus stupide dans laquelle un homme puisse se trouver, et cent personnes la regardent.",
    "Il ne dit rien. Il n'a pas besoin.",
  ],
  suite:'du_combat_2', libelleSuite:"Il retire la lame" },

/* ── DEUXIÈME ÉCHANGE ─────────────────────────────────────────────────── */
du_combat_2:{
  melee:true,
  lieu:"Cendrepont · le carré",
  titre:"Ce qu'on fait quand on n'a plus de bonne solution",
  effets:{ meleeMaj:{ tour:2 } },
  texte:[
    () => a('du_ko') || a('du_longfeu')
      ? "Vous êtes par terre. Il est debout. Cent personnes regardent et le héraut n'arrêtera rien."
      : "Il souffle, il saigne, et il est toujours entre vous et la sortie du carré.",
    { sobre:"Un duel ne s'arrête que par la mort, le forfait ou l'incapacité.",
      intense:"Le droit de province est court là-dessus : un duel s'arrête par la mort, par le forfait déclaré à voix haute, ou par l'incapacité constatée. Aucun des trois n'est arrivé.",
      extreme:"Le droit de province tient en une phrase et le héraut l'a lue tout à l'heure sans que personne écoute : un duel s'arrête par la mort de l'un des deux, par le forfait déclaré à voix haute devant le héraut, ou par l'incapacité constatée par le héraut lui-même. Aucun des trois n'est arrivé. Ce qui veut dire, très concrètement, que rien ni personne sur cette place n'a le pouvoir d'interrompre ce qui se passe, et que tout le monde ici le sait." },
    () => charges() > 0
      ? "§ Il vous reste un coup à la ceinture."
      : "§ Les deux pistolets sont vides. On ne recharge pas un silex dans un duel : quarante secondes avec les mains sèches, et vous n'avez ni l'un ni l'autre.",
    "Il y a cent témoins, un héraut d'armes, deux enfants sur le mur du cimetière.",
  ],
  choix:[
    choixPistolet({ dc:8, adversaire:'esclavelle', situation:situDuel,
      degres:{ dominante:'du_pistolet_dom', couteuse:'du_2_cout', echec:'du_2_ko' } }),

    { t:"Finir à l'épée, proprement",
      detail:"ce que tout le monde est venu voir · Force + épées contre 10",
      risque:"dangereux",
      test:{ carac:'force', comp:'epees', dc:10, adversaire:'esclavelle', manoeuvre:'finir',
             equipement:2, situation:situDuel },
      degres:{ dominante:'du_epee_dom', couteuse:'du_2_cout', echec:'du_2_ko' } },

    choixDrain({ dc:11, adversaire:'esclavelle', humain:true, temoins:'foule', cout:26,
      situation:situDuel,
      degres:{ dominante:'du_drain_dom', couteuse:'du_2_cout', echec:'du_2_ko' } }),

    { t:"Lui laisser le forfait",
      detail:"un homme qui a perdu peut le dire à voix haute · encore faut-il lui en laisser le temps",
      risque:"calculé",
      test:{ carac:'presence', comp:'tactique', dc:9, adversaire:'esclavelle', manoeuvre:'forfait',
             situation:situDuel },
      degres:{ dominante:'du_forfait_dom', couteuse:'du_2_cout', echec:'du_2_ko' } },
  ],
},

du_epee_dom:{
  melee:true,
  titre:"Ce que tout le monde est venu voir",
  effets:{ meleeMaj:{ position:"il est à terre", note:"fini", tour:3 },
           flags:['du_epee','du_gagne'],
           exploit:{ eclat:14, temoins:'foule', quoi:"Robert d'Esclavelle, au fer, devant cent personnes" },
           marque:"Fini au fer, devant cent personnes. C'est ce qu'ils étaient venus voir et ils ne l'ont pas aimé.",
           court:"Au fer" },
  texte:[
    "Cent personnes sont venues voir deux hommes se battre à l'épée. Elles vont l'avoir.",
    { sobre:"Ce n'est pas beau.",
      intense:"Ce n'est pas beau. Ça ne l'est jamais et c'est la seule chose que les récits ne rendent pas : deux hommes fatigués, très près, qui se donnent des coups courts et laids en respirant fort.",
      extreme:"Ce n'est pas beau. Ça ne l'est jamais et c'est très exactement ce qu'aucune tapisserie ne rend : deux hommes fatigués, à moins d'un pas l'un de l'autre, qui se donnent des coups courts, brefs et laids en respirant très fort par la bouche. Il n'y a pas de passes. Il n'y a pas de dégagements. Il y a deux hommes qui s'appuient l'un sur l'autre et qui essaient de placer neuf pouces d'acier quelque part de mou." },
    "§ Vous le placez le premier. Sous l'aisselle droite, vers le bas, dans l'axe.",
    { sobre:"Ça ne le tue pas tout de suite.",
      intense:"Ça ne tue pas tout de suite. Ça ne tue jamais tout de suite : ça enlève d'abord la station debout, puis l'usage du bras, puis la parole, et la mort arrive bien après, quand tout le monde a eu le temps de la voir venir.",
      extreme:"Ça ne le tue pas tout de suite et c'est la partie que personne ne raconte. Un homme touché sous l'aisselle, dans l'axe, perd d'abord la station debout — il s'assoit, littéralement, il s'assoit dans la chaux comme quelqu'un qui vient de se rappeler quelque chose. Puis l'usage du bras. Puis la parole. La mort arrive largement après, sur une place où cent personnes ont eu tout le temps de la regarder venir et où plus personne ne parle depuis un moment." },
    "Il met onze minutes. Le héraut d'armes reste dans le carré avec lui, ce qui est son travail, et personne d'autre n'entre.",
  ],
  suite:'du_fin', libelleSuite:"Onze minutes" },

du_drain_dom:{
  melee:true,
  titre:"Devant cent personnes et un héraut d'armes",
  effets:{ meleeMaj:{ position:"il est à genoux", note:"il refroidit", tour:3 },
           flags:['du_drain','du_gagne','a2_onde_publique','a2_drain_public'],
           faire:() => { drainer(34); drainVu('foule');
                         retenir('charles', "il a vidé un homme devant cent personnes et un héraut d'armes");
                         if(typeof bouger === 'function') bouger('alycia', { peur:5 }); },
           exploit:{ eclat:20, temoins:'foule', quoi:"un homme vidé sur une place publique" },
           marque:"Vous l'avez vidé devant cent personnes. Vos plaies se sont refermées pendant qu'il refroidissait.",
           court:"Il refroidit" },
  texte:[
    "Pousser déplace. Prendre est l'autre branche, et personne dans ces provinces n'a jamais vu la deuxième.",
    { sobre:"Vous le prenez.",
      intense:"Vous ne le frappez pas. Vous posez la main à plat sur son sternum, à travers la chemise, et vous prenez ce qui le tient encore chaud.",
      extreme:"Vous ne le frappez pas. Vous posez la main à plat sur son sternum, à travers une chemise propre et un gambison neuf, et vous prenez. Il n'y a pas de lumière. Il n'y a pas de bruit. Il y a un homme de quarante-quatre ans qui cesse progressivement d'être chaud, à genoux dans la chaux, en vous regardant — parce qu'il vous regarde, tout le temps, et qu'il ne comprend pas ce qui lui arrive et qu'il n'a aucun mot pour le demander." },
    "§ Et vous, vous vous refermez.",
    { sobre:"Ce qui saignait cesse de saigner.",
      intense:"Ce qui saignait cesse de saigner. La chaleur revient dans les mains, la vue se recentre, la fatigue s'en va — et tout ça se voit de l'extérieur, très bien, par cent personnes.",
      extreme:"Ce qui saignait cesse de saigner. La chaleur revient dans les mains, d'abord, puis dans le visage. La vue se recentre. La fatigue de quatre jours s'en va comme on retire un manteau mouillé. Et tout cela se voit de l'extérieur — parfaitement, complètement, par cent personnes qui regardent un homme se redresser pendant qu'un autre s'affaisse, au même rythme, dans le même carré de chaux, sans qu'aucun des deux ne bouge." },
    "Personne ne crie. C'est ça, le pire.",
    "§ Il n'y a pas de mot dans cette province pour ce que cent personnes viennent de voir, et il y en aura un avant l'hiver.",
    "Le héraut d'armes n'écrit rien du tout sur son rôle. Il regarde sa page pendant très longtemps, et il ne l'écrit pas, et cette page-là existe encore quelque part, vide.",
  ],
  plusTard:"Cent témoins, deux enfants sur un mur, et un héraut d'armes qui n'a rien écrit. On trouvera un mot avant l'hiver.",
  suite:'du_fin', libelleSuite:"Il refroidit" },

du_forfait_dom:{
  melee:true,
  titre:"À voix haute",
  effets:{ meleeMaj:{ position:"il a parlé", note:"vivant", tour:3 },
           flags:['du_forfait','du_gagne','du_vivant'],
           exploit:{ eclat:7, temoins:'foule', quoi:"un duel réglé sans mort, ce qui ne s'était pas vu depuis onze ans" },
           faire:() => retenir('caleb', "il a laissé Esclavelle déclarer forfait, ce qui coûte plus cher qu'un mort"),
           marque:"Il a déclaré forfait à voix haute devant le héraut. Il vivra, et c'est bien pire pour lui.",
           court:"Le forfait" },
  texte:[
    "Un homme qui a perdu peut le déclarer. Encore faut-il qu'on lui en laisse le temps, et personne ne le laisse jamais.",
    { sobre:"Vous reculez d'un pas.",
      intense:"Vous reculez d'un pas et vous baissez la pointe. C'est tout. C'est la chose la plus difficile de la matinée et elle ne ressemble à rien.",
      extreme:"Vous reculez d'un pas et vous baissez la pointe. C'est tout. Ça ne ressemble absolument à rien, aucun récit n'en fera quoi que ce soit, et c'est de très loin la chose la plus difficile de la matinée — parce qu'un homme qui recule d'un pas dans un carré de vingt pas avec un adversaire encore armé vient de remettre sa vie entre les mains de quelqu'un qui a onze morts derrière lui." },
    "Il met huit secondes.",
    "§ « Forfait. »",
    { sobre:"Il le dit assez fort pour le héraut, pas plus.",
      intense:"Il le dit une fois, assez fort pour le héraut et pas plus, sans lever les yeux. Cent personnes l'entendent quand même : une place se tait très bien quand il faut.",
      extreme:"Il le dit une seule fois, assez fort pour que le héraut d'armes l'entende et pas un décibel de plus, sans lever les yeux de la terre battue. Cent personnes l'entendent parfaitement : une place de marché se tait extraordinairement bien quand il le faut, et elle s'est tue depuis un moment." },
    "Le héraut le porte au rôle et c'est fini, légalement, à la seconde.",
    "§ Vous venez de lui laisser la vie. Dans cette province, un homme qui a déclaré forfait à voix haute vivra trente ans avec ça, et sa maison aussi.",
    "Vous ne lui avez pas fait de cadeau. Vous lui avez fait quelque chose de bien pire et vous le savez tous les deux en sortant du carré.",
  ],
  plusTard:"Il est vivant. Sa maison porte un forfait déclaré, ce qui se transmet aux enfants dans ces provinces.",
  suite:'du_fin', libelleSuite:"Il sort du carré" },

du_2_cout:{
  melee:true,
  titre:"Vous l'avez, et vous êtes par terre",
  effets:{ meleeMaj:{ position:"tous les deux à terre", note:"fini", tour:3 },
           flags:['du_gagne','du_cher'], cout:{ endurance:24 },
           blessure:{ id:'du_main', zone:"main gauche", type:"section", gravite:2, douleur:3,
                      fonction:['lutte','bouclier'], traitement:null,
                      cicatrice:"l'auriculaire et la moitié de l'annulaire" },
           marque:"Vous l'avez eu et vous avez laissé deux doigts dans le carré.",
           court:"Deux doigts" },
  texte:[
    "Vous l'avez.",
    { sobre:"Et vous laissez deux doigts dans la chaux.",
      intense:"Et vous laissez deux doigts de la main gauche dans la chaux du carré. Personne ne les ramasse. On balaie la place à midi.",
      extreme:"Et vous laissez deux doigts de la main gauche dans la chaux du carré — l'auriculaire entier, l'annulaire à moitié. Personne ne les ramasse et personne n'y pense : on balaie la place à midi comme tous les jours, avec le reste, parce qu'une place de marché sert à autre chose et qu'il y a marché le lendemain." },
    "§ Vous êtes assis tous les deux, à trois pas l'un de l'autre, et aucun des deux n'arrive à se relever tout de suite.",
    "C'est une position très bête et elle dure une minute entière.",
  ],
  suite:'du_fin', libelleSuite:"Se relever" },

du_2_ko:{
  melee:true,
  titre:"Le douzième",
  issue:"Vous êtes mort dans un carré de chaux",
  bilan:"Robert d'Esclavelle en a gagné douze.",
  effets:{ flags:['du_perdu'], cout:{ vitalite:60, sang:40 },
           marque:"Robert d'Esclavelle en a gagné douze. Deux enfants regardaient depuis le mur du cimetière." },
  texte:[
    "Non.",
    { sobre:"Il en a gagné douze.",
      intense:"Il en a gagné douze. C'était la chose la plus probable depuis le début et tout le monde sur cette place le savait, y compris vous.",
      extreme:"Il en a gagné douze. C'était, depuis le début, l'issue de très loin la plus probable : quarante-quatre ans, onze duels, une méthode qui marche, contre un homme qui n'avait pour lui qu'un quart d'heure d'observation et deux coups de plomb. Tout le monde sur cette place le savait. Vous aussi. C'est même pour ça qu'ils sont venus." },
    "§ Le héraut d'armes constate, note, et referme son rôle.",
    "Deux enfants regardent depuis le mur du cimetière et personne ne les fait descendre.",
    "On vous relève une heure plus tard, quand la place est vide.",
  ],
  apres:[
    "Karlsberg reste ce qu'elle est, avec ce qu'il y a dedans, et sans personne pour la relever plus haut.",
    "Un homme qui meurt dans un carré de chaux ne laisse pas d'épilogue. Il laisse un rôle de héraut, correctement tenu.",
  ],
  suite:'a2_epilogue' },

du_fin:{
  lieu:"Cendrepont · la place · huit heures",
  titre:"Ce qu'on emporte d'une place de marché",
  texte:[
    "Il est huit heures. Le boulanger rouvre.",
    () => a('du_forfait')
      ? "Robert d'Esclavelle sort du carré sur ses jambes, avec sa maison et sans son honneur, ce qui dans cette province est la plus longue des peines."
      : (a('du_drain')
        ? "Robert d'Esclavelle est à genoux dans la chaux et il ne se relèvera pas. Il n'a aucune plaie."
        : "Robert d'Esclavelle est mort ou en train de l'être, et il y a du monde autour de lui."),
    { sobre:"Personne ne vous parle.",
      intense:"Personne ne vous adresse la parole en sortant du carré. Ce n'est pas de l'hostilité : c'est qu'il n'existe rien à dire à un homme qui sort d'un carré de chaux.",
      extreme:"Personne ne vous adresse la parole en sortant du carré, et il faut du temps pour comprendre que ce n'est pas de l'hostilité. C'est qu'il n'existe absolument rien à dire à un homme qui sort d'un carré de chaux. On ne félicite pas. On ne console pas. On s'écarte proprement, on regarde ailleurs avec application, et on retourne à ce qu'on faisait — et à midi la place est balayée." },
    () => a('a2_drain_public')
      ? "§ Sauf qu'aujourd'hui, ce n'est pas ça. Aujourd'hui, cent personnes s'écartent en vous regardant, et deux enfants sont encore sur le mur."
      : "§ Le rôle du héraut porte le mot *régulier*, et c'est la seule chose qui vous protège de tout le reste.",
    () => charges() === 0
      ? "Les deux pistolets sont vides. Il faudra une heure, une table, de la lumière et des mains sèches, et ce ne sera pas ce matin."
      : (charges() === 1
        ? "Il reste un coup à la ceinture. On recharge l'autre le soir, à la lumière, et ça prend quarante minutes."
        : ""),
  ],
  effets:{ faire:() => { if(charges() === 0) ETAT.flags.add('du_vides'); },
           marque:"Le rôle du héraut porte le mot « régulier ».",
           court:"Régulier" },
  suite:'du_apres', libelleSuite:"Le soir" },

du_apres:{
  qui:'alycia',
  lieu:"Cendrepont · le soir",
  titre:"Recharger",
  texte:[
    "Recharger un pistolet à silex demande une table, de la lumière, une baguette, et de ne pas être pressé.",
    { sobre:"Elle vous regarde faire.",
      intense:"Alycia vous regarde faire, assise en face, sans rien dire, pendant les quarante minutes que ça prend.",
      extreme:"Alycia vous regarde faire, assise en face de vous, sans un mot, pendant les quarante minutes entières que ça prend — la poudre, la bourre, la balle, la baguette, la poudre d'amorce, le silex qu'on vérifie et qu'on resserre. Elle ne bouge pas. Elle ne commente pas. Et vous savez très bien qu'elle est en train de préparer quelque chose de désagréable, parce qu'elle ne regarde jamais personne travailler." },
    () => a('a2_drain_public')
      ? "« Cent personnes », dit-elle enfin."
      : "« Vous avez tiré », dit-elle enfin.",
    () => a('a2_drain_public')
      ? "« Je sais. »\n\n« Non, vous ne savez pas. Vous croyez que le problème est qu'ils ont vu. » Elle se penche. « Le problème est que **vous vous êtes refermé**. Ils ont vu un homme se guérir. Ce n'est pas une arme, ça, messire : c'est une promesse. Il y a des gens dans cette province qui vendraient leurs enfants pour ça et qui viennent de découvrir où vous habitez. »"
      : "« Oui. »\n\n« Bien. » Elle repousse la lampe vers vous. « Ne vous excusez jamais de ça devant qui que ce soit. Un homme qui s'excuse d'avoir tiré est un homme qui promet de ne pas recommencer, et vous allez recommencer. »",
    "§ Elle a raison sur les deux points et elle le sait, ce qui est sa manière habituelle d'avoir raison.",
    "« Il vous en reste combien ? »",
    () => charges() === 0 ? "« Aucun. Je recharge les deux. »" : "« Un. »",
    { sobre:"« Deux coups. Dans une vie entière. »",
      intense:"« Deux coups », dit-elle. « Vous avez deux coups dans une vie entière, à cause d'un délai de quarante secondes que personne n'a jamais réussi à raccourcir en deux cents ans. » Elle se lève. « Réfléchissez très bien à qui vous les donnez. »",
      extreme:"« Deux coups. » Elle se lève et remet son manteau. « Vous avez deux coups à disposition dans une vie entière, parce qu'aucun armurier de ce monde n'a réussi en deux cents ans à raccourcir un rechargement en dessous de quarante secondes, et que quarante secondes n'existent pas quand quelqu'un veut vous tuer. » Elle s'arrête à la porte. « Alors réfléchissez très bien à qui vous les donnez, messire. Un jour il y aura quelqu'un en face de vous qui vaudra vraiment un de ces deux coups, et j'aimerais assez que vous l'ayez encore. »" },
  ],
  effets:{ faire:() => { recharger(); bouger('alycia', { relation:2, confiance:3 }); },
           flags:['du_recharge'],
           marque:"« Vous avez deux coups dans une vie entière. Réfléchissez très bien à qui vous les donnez. »",
           court:"Deux coups" },
  suite:'a2_carte', libelleSuite:"La carte" },

du_meurtre:{
  qui:'esclavelle',
  titre:"Trente témoins",
  texte:[
    "Vous ne le laissez pas finir sa phrase.",
    { sobre:"C'est très rapide.",
      intense:"C'est très rapide et c'est très laid : on ne tire pas l'épée dans une salle basse, on prend la dague, et une dague dans une salle basse à un pas, c'est trois secondes.",
      extreme:"C'est très rapide et c'est extraordinairement laid. On ne tire pas une épée bâtarde dans une salle basse d'auberge — il n'y a pas la place, c'est même la raison pour laquelle on se bat sur les places. On prend la dague. Une dague, à un pas, entre des tables, sur un homme qui parlait encore à la salle et qui n'avait pas la main sur son fer : trois secondes, et deux d'entre elles sont lui qui essaie de comprendre." },
    "§ Trente témoins, dont le tavernier, qui tient un registre parce que la loi de province l'y oblige.",
    "Ce n'est pas un duel. Il n'y a pas eu de héraut, pas de carré, pas de délai réglementaire — il y a eu une provocation régulière et un homme mort avant d'avoir eu le temps de la voir aboutir.",
    { sobre:"C'est un meurtre, et ça le restera.",
      intense:"C'est un meurtre au sens exact du droit de province, ça le restera, et trente personnes le diront dans le même sens parce qu'elles ont toutes vu la même chose.",
      extreme:"C'est un meurtre au sens strict et technique du droit de province : la provocation était régulière, la réponse ne l'était pas. Ça le restera. Et trente personnes le raconteront toutes dans le même sens, sans se concerter, sans malveillance particulière, parce qu'elles ont toutes vu exactement la même chose et qu'il n'y a pas deux façons de la voir." },
    "§ Vous ne serez pas poursuivi. On ne poursuit pas pour un Paria, et Esclavelle n'avait plus de parents pour le faire.",
    "Mais dans cette province, à partir de ce soir, vous êtes l'homme qui a tué Robert d'Esclavelle dans une auberge. C'est tout ce que vous serez pendant très longtemps, et ça se transmet.",
  ],
  effets:{ flags:['du_meurtre','a2_meurtrier'], suspicion:22,
           faire:() => { bouger('alycia', { confiance:-4 });
                         retenir('caleb', "il a tué un homme dans une auberge devant trente témoins, ce qui abîme un nom");
                         retenir('charles', "il a tué hors du carré : je note la méthode"); },
           exploit:{ eclat:6, temoins:'foule', quoi:"Robert d'Esclavelle, dans une salle basse, à la dague" },
           marque:"Robert d'Esclavelle est mort dans une auberge, à la dague, devant trente témoins et un registre.",
           court:"Trente témoins" },
  plusTard:"Vous êtes l'homme qui a tué Esclavelle dans une auberge. Dans cette province, ça se transmet.",
  suite:'a2_carte', libelleSuite:"La carte" },

du_refuse:{
  titre:"L'homme qui ne répond pas",
  texte:[
    "Vous prenez votre manteau et vous sortez.",
    { sobre:"Personne ne vous arrête.",
      intense:"Personne ne vous arrête et personne ne dit rien. C'est ce qui rend la chose très claire : il n'y a rien à ajouter à un homme qui sort.",
      extreme:"Personne ne vous arrête, personne ne vous insulte, personne ne dit quoi que ce soit. C'est précisément ce qui rend la chose parfaitement claire, et c'est bien pire que des cris : il n'y a rien à ajouter à un homme qui sort d'une salle où on vient de le frapper à main ouverte. La salle s'est déjà prononcée en se taisant." },
    "§ Il n'y a pas de sanction. Il n'y a pas de loi. Il y a une étape sur la Route Grise, et à l'étape on raconte.",
    "En trois semaines, c'est dans quatre bourgs. En trois mois, le mot arrive avant vous.",
    { sobre:"On vous propose moins de contrats, et moins cher.",
      intense:"Ce qui change est concret : moins de contrats, moins cher, et des maisons qui négocient autrement parce qu'un homme qui a refusé une fois refusera peut-être encore.",
      extreme:"Ce qui change est entièrement concret et n'a rien de moral. Moins de contrats. Moins cher. Des intendants qui prennent trois jours de plus pour répondre. Et surtout : des maisons qui négocient autrement, parce qu'un homme d'armes qui a laissé passer une gifle publique est un homme d'armes dont on peut espérer qu'il laissera passer autre chose." },
    "§ Robert d'Esclavelle, lui, ne recommencera pas. Il a obtenu ce qu'il voulait sans risquer un os.",
    "C'est peut-être la décision la plus intelligente de l'année. Elle coûte exactement ce qu'elle a l'air de coûter.",
  ],
  effets:{ flags:['du_refuse','a2_gifle_publique'],
           faire:() => { ETAT.renom = Math.max(0, ETAT.renom - 14);
                         bouger('alycia', { relation:-2 });
                         retenir('caleb', "il a encaissé une gifle publique sans répondre : son prix baisse"); },
           marque:"Vous avez encaissé la gifle et vous êtes sorti. Le mot arrive avant vous depuis.",
           court:"Sans répondre" },
  plusTard:"Un homme d'armes qui a laissé passer une gifle publique est un homme dont on espère qu'il laissera passer autre chose.",
  suite:'a2_carte', libelleSuite:"La carte" },

};

enregistrerScenes(DUEL);

Object.assign(GENS, {
  esclavelle: { nom:"Robert d'Esclavelle", role:"quarante-quatre ans · onze duels · deux fermes et un moulin", lettre:"R" },
});

/* Il vient quand Karlsberg commence à peser, ou quand le nom se répète. */
offrir({ id:'du_provoque', lieu:'cendrepont', va:'du_provoque',
         titre:"Un homme vous attend dans la salle basse",
         si:() => !a('du_provoque')
               && (a('a2_bannieres') || a('a2_donjon') || ETAT.renom >= 55) });

entree2('du_combat_1');
