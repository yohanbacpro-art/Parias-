/* PARIAS — Acte II · LES TROIS LOINTAINS
 * ═══════════════════════════════════════════════════════════════════════
 * La Marche noire, Kar-Durak, le désert khesh. Cinq saisons aller-retour
 * pour deux d'entre eux : y aller, c'est renoncer à autre chose, et le jeu
 * ne le cache pas.
 *
 * Ce sont les trois seuls endroits où l'on peut peser sur une crise au lieu
 * de la regarder avancer. Ce qu'on y fait pose les drapeaux que
 * `pousserCrises()` lit : `a2_anarion_soutenu`, `a2_kardurak_aide`,
 * `a2_khesh_gene`, `a2_khesh_serment`, `a2_hordes_gene`.
 *
 * Aucun des trois ne se règle. On y gagne une saison de retard sur une
 * catastrophe, et c'est déjà beaucoup plus que ce que la plupart des gens
 * obtiennent d'une guerre.
 * ═══════════════════════════════════════════════════════════════════════ */

const LOINTAINS = {

/* ══ LA MARCHE NOIRE ══════════════════════════════════════════════════════
 * Anarion ne recrute pas : il constate. Sa proclamation — la marche
 * accueillera quiconque a été rayé d'un registre — est le seul endroit du
 * monde connu où « Paria » n'est pas une condamnation, et c'est un piège
 * qui n'a pas besoin d'être un piège pour en être un. */
an_arrivee:{
  lieu:"La Marche noire · le poste de Vaeth",
  titre:"Ce qu'Anarion appelle un royaume",
  texte:[
    "Cinq saisons. On ne va pas à la Marche noire sur un coup de tête : on y va en ayant renoncé à un an de tout le reste.",
    { sobre:"Ce n'est pas ce qu'on raconte.",
      intense:"Ce n'est pas du tout ce qu'on raconte au sud. Il n'y a pas de fumée noire, pas de terre morte, pas de bois pétrifié. Il y a des champs, des remises, des chemins entretenus et une file de gens au poste frontière.",
      extreme:"Ce n'est rien de ce qu'on raconte au sud, et le décalage est si complet qu'il faut deux jours pour cesser de chercher la ruse. Pas de fumée noire, pas de terre morte, pas de forêts pétrifiées. Des champs de seigle mal drainés, des remises, des chemins d'empierrement récent, et au poste de Vaeth une file de trente personnes qui attendent d'être inscrites — avec des enfants, des ballots et des bêtes." },
    "Le poste est tenu par des Elfes noirs et par des humains, dans une proportion d'environ un pour six.",
    "L'officier qui vous reçoit a votre âge et parle la langue de la province sans accent, ce qui veut dire qu'il y est né.",
    "« Registre ? » demande-t-il.",
    "« Pardon ? »",
    { sobre:"« De quel registre avez-vous été rayé. »",
      intense:"« De quel registre avez-vous été rayé. » Il ne lève pas les yeux de sa page. « C'est la seule question du poste. Il n'y en a pas d'autre. »",
      extreme:"« De quel registre avez-vous été rayé. » Il ne lève même pas les yeux de sa page. « C'est la seule question du poste, messire, il n'y en a aucune autre. Ni votre nom, ni ce que vous avez fait, ni pourquoi. Le seigneur Anarion a proclamé que la marche accueille quiconque a été rayé d'un registre. Il n'a rien proclamé d'autre, alors nous ne demandons rien d'autre. »\n\n« Et si je mens ? »\n\n« Alors vous aurez menti pour entrer dans un endroit dont tout le monde essaie de sortir. Ça arrive. Nous notons. »" },
    "§ Trente personnes dans une file, et pas une seule à qui l'on demande ce qu'elle a fait.",
    "Vous voyez, en trois jours : deux familles de Parias du sud, un ancien clerc de Chastel, quatre Hommes-Bêtes qui labourent, et une femme naine de Kar-Durak qui tient une forge sans avoir le droit d'y mettre sa marque.",
    "Vous voyez aussi les colonnes qui partent vers l'ouest, et ce qu'elles vont faire à Eltharion, et le fait qu'un tiers des hommes dedans sont ceux de la file.",
  ],
  choix:[
    { t:"Demander à voir Anarion",
      detail:"il reçoit · c'est même une part de la méthode",
      risque:"calculé", va:'an_anarion' },
    { t:"Parler aux Parias de la file",
      detail:"deux familles du sud · savoir ce qu'on leur a promis exactement",
      risque:"prudent", va:'an_parias' },
    { t:"Repartir",
      detail:"cinq saisons pour trois jours · et rien qui vous engage",
      risque:"prudent", va:'an_repartir' },
  ],
},

an_parias:{
  titre:"Ce qu'on leur a promis",
  texte:[
    "Ils viennent de la province de Sarve. Le père a quarante ans, la mère trente-cinq, trois enfants dont un de neuf ans.",
    "On leur a promis exactement ceci, et pas une syllabe de plus : une terre à défricher, aucune question, et le droit de ne pas être rendus.",
    "« Le droit de ne pas être rendus », répétez-vous.",
    { sobre:"« C'est le seul qui compte », dit le père.",
      intense:"« C'est le seul qui compte », dit le père. « On nous a offert des terres trois fois. Deux fois on nous a rendus. »",
      extreme:"« C'est le seul qui compte, messire, et vous en êtes un aussi alors ne faites pas semblant du contraire. » Il ne dit pas ça avec agressivité : il constate. « On nous a offert des terres trois fois en douze ans. Deux fois on nous a rendus. La troisième c'était une maison de la Route Grise, très correcte, très polie, qui nous a gardés quatre ans et qui nous a rendus le jour où un commissaire aux titres a écrit une lettre. Ici on ne rend pas. C'est écrit sur le mur du poste. »" },
    "« Et ce qu'on leur demande en échange ? »",
    "« L'aîné. »",
    "§ Un fils de dix-sept ans dans une colonne qui part vers l'ouest.",
    "« Ce n'est pas une conscription », dit la mère, très vite, comme quelqu'un qui a déjà eu cette conversation. « Il n'y a pas d'obligation. Il n'y a que des gens qui doivent quelque chose et une guerre qui a besoin de monde, et au bout de deux hivers tout le monde y va. »",
    "« Vous auriez préféré quoi ? »",
    "« Rien de ce qui existe », dit-elle. « Il n'y a rien qui existe. C'est pour ça qu'on est ici. »",
  ],
  effets:{ flags:['an_parias','a2_anarion_vu'],
           marque:"Deux familles de Parias à la Marche noire. On ne rend pas ; au bout de deux hivers, l'aîné part vers l'ouest.",
           court:"On ne rend pas" },
  suite:'an_anarion', libelleSuite:"Demander à voir Anarion" },

an_anarion:{
  lieu:"La Marche noire · la salle basse",
  titre:"Anarion",
  texte:[
    "Il reçoit dans une salle sans estrade, avec une table de travail et quatre secrétaires, et c'est une mise en scène : il le sait, vous le savez, et il ne s'en cache pas.",
    { sobre:"Il est très vieux et ça ne se voit pas de la façon dont ça se voit chez les hommes.",
      intense:"Il est très vieux — quatre cents ans, peut-être plus — et ça ne se voit d'aucune des façons dont ça se voit chez les hommes. Ça se voit à ce qu'il ne demande rien pour situer la conversation.",
      extreme:"Il est très vieux. Quatre cents ans, peut-être davantage, et ça ne se voit d'aucune des façons dont ça se voit chez les hommes : pas la peau, pas les mains, pas le dos. Ça se voit à ce qu'il ne pose aucune des questions par lesquelles on situe une conversation. Il sait déjà qui vous êtes, ce que vous avez fait dans quatre provinces, et il a fait le tri entre ce qui l'intéresse et ce qui ne l'intéresse pas avant que vous entriez." },
    "« Karlsberg », dit-il. « Vous avez mis dix-neuf ans. »",
    "« À quoi ? »",
    "« À venir voir. » Il repousse une liasse. « Il y a onze maisons rayées dans les quatre provinces humaines depuis la Purge. Neuf ont envoyé quelqu'un ici dans les cinq ans. Vous êtes le dernier et vous êtes le seul qui ait un nom que les gens répètent. »",
    "« Vous allez me proposer quelque chose. »",
    { sobre:"« Non. »",
      intense:"« Non. » Il a l'air sincèrement amusé. « Je ne propose rien à personne : c'est toute ma méthode et c'est pour ça qu'elle marche. Je proclame, et les gens viennent. »",
      extreme:"« Non. » Il a l'air sincèrement amusé, ce qui est la chose la plus déstabilisante de la pièce. « Je ne propose rien à personne. C'est toute ma méthode, c'est la raison pour laquelle elle fonctionne, et c'est ce qu'Eltharion n'a jamais compris en quatre cents ans. Je ne recrute pas, je ne négocie pas, je n'achète pas. Je proclame une règle simple, je la tiens sans exception, et les gens viennent d'eux-mêmes en trouvant que c'est leur idée. »" },
    "« Une règle. »",
    "« On ne rend personne. » Il écarte les mains. « Voilà. C'est tout. Onze mots, tenus depuis soixante ans sans une seule exception, y compris quand ça m'a coûté deux villes. Vous n'imaginez pas ce qu'on obtient d'un monde entier avec une seule règle qu'on ne casse jamais. »",
    "§ Il a raison, et c'est exactement ce qui rend la chose difficile à regarder.",
    "« Et l'aîné des familles part vers l'ouest au bout de deux hivers. »",
    "« Oui. »",
    "« Sans obligation. »",
    "« Sans obligation, ce qui est bien pire et vous l'avez déjà compris, sinon vous ne l'auriez pas dit sur ce ton. » Il se penche. « Messire de Karlsberg. Je n'ai pas besoin de vous et je ne vous demanderai rien. Mais si un jour on vous chasse de vos quatre provinces — et on vous chassera, parce que vous avez sous les côtes exactement la chose qu'elles ne tolèrent pas — il y a un poste à Vaeth où l'on ne pose qu'une question. »",
  ],
  choix:[
    { t:"Lui donner quelque chose sur Eltharion",
      detail:"ce que vous avez vu à Aelthiriel · une cour, des maisons rappelées",
      si:() => a('el_rencontree') || a('el_sorti'),
      risque:"définitif", ferme:"Ferme : ce qu'Alarielle pourra encore vous dire",
      va:'an_donner' },
    { t:"« Je ne viendrai pas. »",
      detail:"le dire en face · à quelqu'un qui n'a rien demandé",
      risque:"calculé", va:'an_refus' },
    { t:"Prendre le poste de Vaeth comme une porte de sortie",
      detail:"ne rien promettre · et savoir que la porte existe",
      risque:"calculé", va:'an_porte' },
  ],
},

an_donner:{
  titre:"Ce qui se paie en choses humaines",
  texte:[
    "Vous lui dites ce que vous avez vu à Aelthiriel. Pas grand-chose : une cour, des maisons rappelées du sud, un prince qui compte les voix et une elfe qui a parlé contre lui.",
    { sobre:"Ce n'est presque rien. Chez lui, c'est beaucoup.",
      intense:"Ce n'est presque rien pour vous. Vous voyez, à la façon dont un des quatre secrétaires cesse d'écrire, que ce n'est pas presque rien pour eux.",
      extreme:"Ce n'est presque rien de votre point de vue : quatre observations d'un homme qui ne connaît pas cette cour. Vous voyez, à la seconde exacte où l'un des quatre secrétaires cesse d'écrire pour lever la tête, que ce n'est pas du tout presque rien du leur — et vous comprenez trop tard que le renseignement ne vaut jamais ce que celui qui le donne estime qu'il vaut." },
    "Anarion ne remercie pas. Il note quelque chose lui-même, de sa main, ce qu'il n'a pas fait de toute la conversation.",
    "« Vous ne m'avez rien demandé en échange », dit-il.",
    "« Non. »",
    "« C'est une erreur. Prenez quelque chose : ce qu'on donne pour rien, on regrette de l'avoir donné, et le regret pourrit tout. »",
    "Il fait pousser vers vous une bourse que vous n'aviez pas vue arriver.",
    "§ Deux saisons plus tard, une colonne de la Marche noire franchit le fleuve à l'endroit exact où les maisons du sud avaient été rappelées.",
  ],
  effets:{ or:180, flags:['an_donne','a2_anarion_soutenu','a2_anarion_vu'],
           faire:() => { bouger('alarielle', { confiance:-8, devoir:-4 });
                         retenir('anarion', "il m'a donné une cour sans rien demander");
                         retenir('alarielle', "il a parlé d'Aelthiriel à Anarion"); },
           marque:"Vous avez donné Aelthiriel à Anarion pour rien, et il vous a payé quand même.",
           court:"La colonne au fleuve" },
  plusTard:"Une colonne a franchi le fleuve là où les maisons du sud avaient été rappelées. Alarielle l'apprendra.",
  suite:'a2_carte', libelleSuite:"La carte" },

an_refus:{
  titre:"En face",
  texte:[
    "« Je ne viendrai pas. »",
    "« Je sais », dit Anarion.",
    "« Vous savez ? »",
    { sobre:"« Vous relevez quelque chose. On ne vient pas ici en relevant. »",
      intense:"« Vous êtes en train de relever quelque chose, ou d'essayer. On ne vient à Vaeth qu'après avoir cessé d'essayer, et ça prend en général onze ans de plus que vous n'en avez. »",
      extreme:"« Vous êtes en train de relever quelque chose, ou d'essayer, ce qui revient au même pour ce dont je parle. On ne vient à Vaeth qu'après avoir cessé d'essayer. C'est la seule condition réelle, elle n'est écrite nulle part, et elle prend en général onze ans de plus que vous n'en avez vécu. Revenez à cinquante ans, messire. Nous aurons tous les deux une conversation beaucoup plus courte. »" },
    "« Et d'ici là ? »",
    "« D'ici là je ferai la guerre à Eltharion et vous chercherez le nom de celui qui a écrit à Chastel. » Il reprend sa liasse. « Nous avons chacun un travail. Le mien est plus grand ; le vôtre est plus difficile. »",
    "§ Il ne demande pas comment il sait pour Chastel, et vous ne le demandez pas non plus, parce qu'il y a des questions qu'on ne pose pas dans une salle où quatre secrétaires écrivent.",
  ],
  effets:{ flags:['an_refus','a2_anarion_vu'],
           faire:() => retenir('anarion', "il a dit non en face, ce que personne ne fait ici"),
           exploit:{ eclat:4, temoins:'quelques', quoi:"vous avez refusé Anarion dans sa propre salle" },
           marque:"« Revenez à cinquante ans. Nous aurons une conversation plus courte. »",
           court:"À cinquante ans" },
  suite:'a2_carte', libelleSuite:"La carte" },

an_porte:{
  titre:"Le poste de Vaeth",
  texte:[
    "Vous ne promettez rien et vous ne refusez rien, ce qui est la seule chose que cet homme-là ne peut pas classer.",
    "« C'est une réponse d'homme d'armes », dit-il. « Vous gardez la position. »",
    "« Oui. »",
    "« Bien. » Il hausse une épaule d'un pouce. « Alors sachez ceci et faites-en ce que vous voulez : le poste de Vaeth ne demande qu'une chose et ne la vérifie pas. Il ne se ferme jamais. Il ne se fermera pas non plus pour trente ou quarante personnes qui arriveraient ensemble, un jour, avec des charrettes. »",
    "§ Il ne dit pas *quarante et un*. Il dit *trente ou quarante*.",
    "« Je n'ai pas dit qu'ils étaient quarante », dites-vous.",
    "« Non », dit Anarion, et il reprend son travail.",
  ],
  effets:{ flags:['an_porte','a2_anarion_vu','a2_vaeth_ouvert'],
           faire:() => retenir('anarion', "il a gardé la position, ce qui est rare"),
           marque:"Le poste de Vaeth ne se fermera pas non plus pour trente ou quarante personnes arrivant ensemble.",
           court:"Vaeth" },
  plusTard:"Il existe désormais un endroit au monde où les quarante et un pourraient aller. C'est chez Anarion.",
  suite:'a2_carte', libelleSuite:"La carte" },

an_repartir:{
  titre:"Cinq saisons pour trois jours",
  texte:[
    "Vous repartez sans franchir le poste.",
    { sobre:"Ce n'est pas rien d'avoir vu la file.",
      intense:"Ce n'est pas rien d'avoir vu la file : trente personnes, des enfants, des ballots, et une seule question posée au guichet. On ne l'oublie pas parce qu'on est reparti.",
      extreme:"Ce n'est pas rien d'avoir vu la file. Trente personnes avec des enfants et des ballots, une seule question au guichet, et aucune des trente qui aurait été reçue nulle part ailleurs dans le monde connu. On ne défait pas ça en tournant bride. Vous ferez cinq saisons de retour en y pensant, et vous n'aurez toujours pas de réponse en arrivant." },
    "§ Cinq saisons de route pour trois jours de regard. C'est le prix des lointains et personne ne l'a jamais trouvé bon.",
  ],
  effets:{ flags:['an_vu_seulement','a2_anarion_vu'],
           marque:"Vous avez vu la file du poste de Vaeth et vous n'êtes pas entré.",
           court:"La file" },
  suite:'a2_carte', libelleSuite:"La carte" },

/* ══ KAR-DURAK ════════════════════════════════════════════════════════════ */
kd_arrivee:{
  lieu:"Kar-Durak · la troisième porte",
  titre:"Onze portes, dont quatre sont tombées",
  texte:[
    "On n'entre pas à Kar-Durak : on est admis à la troisième porte, dans un sas de quarante pieds, par des Nains qui n'ont pas dormi.",
    { sobre:"Ils ont perdu quatre portes en deux ans.",
      intense:"Quatre portes en deux ans. Un Nain vous dirait que c'est une mauvaise décennie ; ce Nain-ci ne dit rien du tout, ce qui en dit plus long.",
      extreme:"Quatre portes en deux ans. Dans la mémoire de cette montagne, ça n'était arrivé qu'une fois, il y a huit cents ans, et les chants de cette époque-là sont des chants qu'on ne chante plus. Un Nain de bonne humeur vous dirait que c'est une mauvaise décennie. Celui qui vous fait franchir le sas ne dit rien du tout, ne vous regarde pas, et ne demande pas votre nom — trois manquements aux usages en douze secondes." },
    "Le problème n'est pas militaire. Le problème est arithmétique : onze portes demandent quatre mille défenseurs et il en reste deux mille trois cents.",
    "« Vous êtes venu pourquoi ? » demande le capitaine de la troisième — une femme de cent-quarante ans, une hache, et le tiers de son visage brûlé.",
    "« Voir. »",
    "« Personne ne vient voir. » Elle vous fait signe de la suivre. « Venez voir, alors. »",
    "§ Elle vous montre la galerie basse : deux cents pieds de front, huit hommes en poste, et une odeur qui monte depuis quatre mois.",
    "« Les Peaux-Vertes ne prennent pas les portes », dit-elle. « Ils les usent. Ils envoient trente des leurs toutes les nuits pour tuer trois des nôtres, et ils ont trente mille et nous avons deux mille trois cents. C'est tout. Il n'y a pas de stratégie. Il n'y a qu'une soustraction. »",
    "« Que vous faut-il ? »",
    "« Des bras et du temps, et vous n'avez ni l'un ni l'autre. »",
  ],
  choix:[
    { t:"Tenir la galerie basse trois nuits",
      detail:"huit hommes en poste sur deux cents pieds · vous en faites neuf",
      risque:"définitif", va:'kd_tenir' },

    { t:"Leur ouvrir une route au sud",
      detail:"les forges du milieu peuvent descendre · il faut une route sûre et quelqu'un qui la garantisse",
      si:() => a('a2_bannieres') || a('kar_refuge') || ETAT.renom >= 50,
      risque:"définitif", ferme:"Ferme : la discrétion de ce que vous tenez au sud",
      va:'kd_route' },

    { t:"Solder la dette naine",
      detail:"une maison humaine doit à cette montagne depuis quatre-vingts ans · payez-la",
      requisOr:400, risque:"calculé", va:'kd_dette' },

    { t:"Repartir",
      detail:"il n'y a pas de version de cette histoire que vous puissiez gagner",
      risque:"prudent", va:'kd_repartir' },
  ],
},

kd_tenir:{
  melee:true,
  titre:"Trois nuits",
  effets:{ melee:{ eux:30, position:"deux cents pieds de front", pression:"nuit" },
           flags:['kd_tenu','a2_kardurak_aide'],
           cout:{ endurance:24 },
           blessure:{ id:'kd_cuisse', zone:"cuisse gauche", type:"lacération", gravite:2, douleur:3,
                      fonction:['marche'], traitement:"recousue par un chirurgien nain",
                      cicatrice:"quatre pouces, en travers" },
           faire:() => retenir('charles', "il s'est battu pour des Nains, ce qui est déjà une position"),
           exploit:{ eclat:9, temoins:'quelques', quoi:"trois nuits sur le front de la galerie basse" },
           marque:"Trois nuits dans la galerie basse de Kar-Durak. Neuvième homme sur deux cents pieds.",
           court:"La galerie basse" },
  texte:[
    "Trois nuits.",
    { sobre:"Ce n'est pas une bataille. C'est un travail.",
      intense:"Ce n'est pas une bataille : c'est un travail de nuit, répétitif, sale, où l'on tue trois ou quatre créatures par tour de garde et où personne ne gagne rien.",
      extreme:"Ce n'est pas une bataille et il faut le dire clairement, parce que tout ce qu'on raconte sur les guerres de la montagne est faux. C'est un travail de nuit. Répétitif, sale, mal éclairé, sans gloire d'aucune sorte : on tue trois ou quatre créatures par tour de garde, on traîne les corps hors du front pour qu'ils ne servent pas d'abri, on recharge, on attend, et à l'aube on a exactement le même nombre de pieds de galerie qu'à la veille — sauf qu'on est huit au lieu de neuf." },
    "La deuxième nuit, une lance de jet vous ouvre la cuisse gauche sur quatre pouces. Le chirurgien nain recoud debout, en parlant d'autre chose.",
    "La troisième nuit, il n'y a rien. Personne ne vient. C'est la pire des trois.",
    "§ Au matin, le capitaine à la hache vous fait porter deux cents pieds de galerie sur son propre relevé, à votre nom, dans une langue que vous ne lisez pas.",
    "« Ça sert à quoi ? » demandez-vous.",
    "« À rien du tout », dit-elle. « Dans quatre-vingts ans, quelqu'un lira ce relevé et saura qu'un homme est venu. C'est notre seule façon de dire merci et elle est très mauvaise. »",
  ],
  plusTard:"Deux cents pieds de galerie portés à votre nom sur un relevé nain. Ça se lira dans quatre-vingts ans.",
  suite:'a2_carte', libelleSuite:"La carte" },

kd_route:{
  titre:"Trois mille Nains vers la plaine",
  texte:[
    "Les forges du milieu emploient trois mille Nains. Elles vont tomber : tout le monde le sait à Kar-Durak et personne ne le dit à voix haute, parce que le dire c'est commencer l'évacuation.",
    "Une évacuation demande une route sûre au sud, des vivres à quatre étapes, et quelqu'un dont la parole vaut assez pour que trois mille personnes acceptent de sortir de leur montagne.",
    { sobre:"Vous avez les trois. C'est la première fois.",
      intense:"Vous avez les trois, ce qui n'était pas vrai il y a deux ans. C'est même la première fois de votre vie que ce que vous avez construit sert à quelque chose que vous n'aviez pas prévu.",
      extreme:"Vous avez les trois. Une route, parce que vous tenez ou connaissez ceux qui la tiennent ; des vivres, parce qu'on peut lever quatre étapes quand on a un nom ; et une parole qui vaut, ce qui est la partie invraisemblable — trois mille Nains ne sortent pas d'une montagne sur la parole d'un mercenaire, ils en sortent sur la parole d'une maison. C'est la première fois de votre vie que ce que vous avez relevé sert à quelque chose que vous n'aviez pas prévu en le relevant." },
    "L'évacuation prend une saison et demie et se passe mal : deux cent quarante morts sur la route, une épidémie à la troisième étape, et une querelle de préséance qui manque de tout faire échouer au dernier col.",
    "§ Deux mille sept cent soixante Nains arrivent en plaine. Kar-Durak tient sur ses trois portes hautes avec ceux qui ont refusé de partir.",
    "Le capitaine à la hache est de ceux qui ont refusé.",
    "« Vous avez sauvé les forges », dit-elle au dernier col, « et vous avez tué la montagne. Les deux sont vrais. Vous vous y ferez. »",
  ],
  effets:{ flags:['kd_route','a2_kardurak_aide','a2_nains_dehors'],
           faire:() => { A2().crises.kardurak = Math.min(A2().crises.kardurak || 0, 2.4);
                         retenir('caleb', "trois mille Nains sont descendus en plaine grâce à lui"); },
           or:-150,
           exploit:{ eclat:20, temoins:'province', quoi:"deux mille sept cent soixante Nains sortis de la montagne" },
           marque:"Deux mille sept cent soixante Nains évacués vers la plaine. Deux cent quarante morts sur la route.",
           court:"Le dernier col" },
  plusTard:"Trois mille Nains sans montagne, en plaine, dans une province qui n'a rien demandé. Ça ne restera pas sans conséquence.",
  suite:'a2_carte', libelleSuite:"La carte" },

kd_dette:{
  titre:"Quatre-vingts ans",
  texte:[
    "Une maison humaine — pas la vôtre, une autre, éteinte depuis — doit à Kar-Durak quatre cents couronnes depuis quatre-vingts ans, pour un ouvrage de mine livré et jamais payé.",
    "Les Nains n'ont jamais réclamé. Ils ont écrit.",
    { sobre:"Vous payez.",
      intense:"Vous payez la dette d'une maison morte que vous n'avez jamais vue, à des gens qui ne vous ont rien demandé, pendant qu'ils perdent une porte tous les six mois.",
      extreme:"Vous payez la dette d'une maison morte que vous n'avez jamais vue, à des gens qui ne vous ont rien demandé, dans une montagne qui perd une porte tous les six mois et pour qui quatre cents couronnes ne changeront strictement rien à la soustraction en cours. C'est le geste le moins utile de tout votre séjour. C'est aussi le seul qu'ils comprennent immédiatement." },
    "Le trésorier de la montagne a deux cent dix ans. Il vérifie l'inscription, il vérifie deux fois, et il fait venir un scribe.",
    "« Vous n'êtes pas de cette maison. »",
    "« Non. »",
    "« Alors pourquoi ? »",
    "« Parce qu'elle est éteinte et que ça restera écrit. »",
    "§ Il regarde le registre un long moment.",
    "« Vous savez ce que nous faisons, nous, d'une maison rayée qui a payé ? » dit-il. « Nous ne rayons rien. Nous n'avons jamais rayé personne en huit cents ans. C'est ce qui nous distingue de vos provinces et c'est aussi pour ça que nous perdons. »",
    "Il fait porter au relevé : *acquitté, la cent-quarante-cinquième année, par Karlsberg*.",
    "§ Trois saisons plus tard, un Nain de cent onze ans se présente à Karlsberg sans avoir été demandé.",
    "Il s'appelle Brann, il dit six mots par jour, et il a le titre de maître d'œuvre de la Halle basse — ce qui, dans cette montagne, se transmet une fois par siècle.",
    "« On m'envoie », dit-il. C'est tout ce qu'on obtiendra sur le sujet, cette année-là comme les suivantes.",
  ],
  effets:{ or:-400, flags:['kd_dette','a2_dette_naine','a2_kardurak_aide','a2_maitre_oeuvre'],
           faire:() => retenir('charles', "il a payé la dette d'une maison morte à des Nains"),
           exploit:{ eclat:6, temoins:'quelques', quoi:"une dette de quatre-vingts ans acquittée par une maison rayée" },
           marque:"« Acquitté, la cent-quarante-cinquième année, par Karlsberg. » Les Nains ne rayent personne.",
           court:"Acquitté" },
  suite:'a2_carte', libelleSuite:"La carte" },

kd_repartir:{
  titre:"La soustraction",
  texte:[
    "Vous repartez. Il n'y a pas de version de cette histoire qu'un homme puisse gagner et le capitaine à la hache vous l'a dit avant tout le monde.",
    "§ « Vous êtes venu voir », dit-elle au sas. « C'est déjà plus que ce qu'ont fait quatre provinces en deux ans. »",
    "C'est peut-être vrai et ça ne console de rien.",
  ],
  effets:{ flags:['kd_vu'],
           marque:"Vous êtes allé à Kar-Durak et vous en êtes reparti. Deux mille trois cents pour onze portes.",
           court:"La soustraction" },
  suite:'a2_carte', libelleSuite:"La carte" },

/* ══ LE DÉSERT KHESH ══════════════════════════════════════════════════════ */
kh_arrivee:{
  lieu:"Le désert khesh · le puits de Sarad",
  titre:"Les feux qu'on compte",
  texte:[
    "Cinq saisons pour arriver, et la première chose qu'on apprend au puits de Sarad, c'est qu'on ne compte pas les tribus khesh : on compte leurs feux.",
    () => {
      const n = Math.min(4, Math.floor(A2().crises.khesh || 0));
      return ["Il y en a douze.", "Il y en a douze.", "Il y en a neuf.", "Il y en a cinq.", "Il y en a un."][n] +
             " Un homme met onze ans à faire passer ce chiffre de douze à un, et il en est à l'endroit où il en est.";
    },
    { sobre:"Khal-Vaene reçoit qui vient au puits.",
      intense:"Khal-Vaene reçoit qui vient au puits de Sarad, sans exception et sans escorte, parce qu'un homme qui unifie douze tribus ne peut pas se permettre d'avoir l'air de craindre quelqu'un.",
      extreme:"Khal-Vaene reçoit qui vient au puits de Sarad. Sans exception, sans escorte, assis par terre comme tout le monde, parce qu'un homme qui prétend unifier douze tribus ne peut à aucun prix avoir l'air de craindre quoi que ce soit — et parce que la seule chose qui tienne douze tribus ensemble, c'est que chacune puisse dire qu'elle l'a vu de près." },
    "Il a cinquante ans, des mains de charpentier, et il pose exactement trois questions.",
    "« D'où venez-vous ? »",
    "« Des provinces du nord. »",
    "« Qu'est-ce qu'on y dit de moi ? »",
    "« Qu'on ne sait pas compter au-delà de cinq feux. »",
    { sobre:"Il rit.",
      intense:"Il rit — franchement, longuement, et les quinze personnes assises autour du puits rient avec lui, ce qui est probablement le point.",
      extreme:"Il rit franchement, longuement, la tête en arrière, et les quinze personnes assises autour du puits rient avec lui — pas par courtisanerie, on le voit très bien : parce que c'est drôle. C'est un homme qui a compris avant tout le monde qu'on ne tient pas douze tribus par la peur, et qu'un chef dont on peut rire avec est un chef dont on ne rit pas derrière." },
    "« Troisième question », dit-il. « Qu'est-ce que vous voulez ? »",
  ],
  choix:[
    { t:"« Que vous n'alliez pas au nord. »",
      detail:"le dire tout de suite · à un homme qui a passé onze ans à préparer d'y aller",
      risque:"définitif", va:'kh_nord' },

    { t:"« Comprendre pourquoi vous y allez. »",
      detail:"la seule question que personne au nord n'a posée en onze ans",
      risque:"calculé", va:'kh_pourquoi' },

    { t:"« Rien. »",
      detail:"un homme qui ne veut rien est une chose rare dans un désert",
      risque:"prudent", va:'kh_rien' },
  ],
},

kh_pourquoi:{
  titre:"Deux puits",
  texte:[
    "« Comprendre pourquoi vous y allez. »",
    "Il regarde le puits de Sarad — la margelle, la corde, les deux femmes qui tirent.",
    { sobre:"« Parce que celui-ci baisse depuis quarante ans. »",
      intense:"« Parce que celui-ci baisse depuis quarante ans. » Il n'ajoute rien pendant un moment. « Voilà. C'est toute la réponse et personne au nord ne l'a jamais demandée. »",
      extreme:"« Parce que celui-ci baisse depuis quarante ans. » Il n'ajoute rien pendant un long moment, et personne autour du puits ne comble le silence. « Voilà. C'est toute la réponse, elle tient en une phrase, et personne au nord ne l'a jamais demandée en onze ans. On m'a envoyé quatre émissaires. Trois voulaient savoir combien d'hommes j'avais. Le quatrième voulait savoir ce que je voulais et il est reparti avant que je réponde. »" },
    "« Un puits. »",
    "« Onze puits, sur les vingt-deux que nous avions. Il n'y a pas de guerre khesh, messire, il n'y en a jamais eu : il y a douze tribus qui se battaient pour onze puits mourants, et un homme qui leur a expliqué qu'on pouvait faire autrement. »",
    "« En allant au nord. »",
    "« En allant là où il y a de l'eau. » Il hausse les épaules. « Ce n'est pas une invasion, c'est un déplacement. Le problème est qu'il n'y a aucune différence entre les deux quand on est celui qui est déjà sur l'eau. »",
    "§ Personne au nord ne sait ça. Quatre provinces se préparent à une guerre sainte et il s'agit de la nappe phréatique.",
    "« Il y a autre chose », dit-il. « Vous ne l'avez pas demandé, alors je vous le donne. »",
    "« Quoi ? »",
    "« Je ne veux pas y aller. » Il se lève. « J'ai cinquante ans, j'ai passé onze ans à réunir douze tribus pour un déplacement que je ne veux pas faire, et je continuerai parce que c'est la seule chose que je puisse faire de mes onze puits. Si quelqu'un, un jour, m'apporte une autre solution, je l'écouterai debout. Personne n'a jamais essayé. »",
  ],
  effets:{ flags:['kh_pourquoi','a2_khesh_su','a2_khesh_vu'],
           faire:() => retenir('khalvaene', "il a posé la troisième question, ce qu'aucun des quatre autres n'a fait"),
           exploit:{ eclat:5, temoins:'quelques', quoi:"vous savez ce que quatre provinces ignorent" },
           marque:"Il n'y a pas de guerre khesh : il y a onze puits qui meurent. Khal-Vaene ne veut pas y aller.",
           court:"Onze puits" },
  choix:[
    { t:"« Je vais chercher une autre solution. »",
      detail:"des Nains creusent · et il y en a trois mille en plaine",
      si:() => a('a2_nains_dehors') || a('a2_dette_naine'),
      risque:"définitif", ferme:"Ferme : une saison de plus sur le nom", va:'kh_puits' },
    { t:"Emporter ce qu'il a dit au nord",
      detail:"quatre provinces se préparent à la mauvaise guerre",
      risque:"calculé", va:'kh_dire' },
    { t:"Ne rien promettre",
      detail:"vous n'avez ni les Nains, ni l'eau, ni le temps",
      risque:"prudent", va:'kh_rien' },
  ],
},

kh_puits:{
  titre:"Ceux qui savent creuser",
  texte:[
    "Il y a, dans le monde connu, exactement un peuple qui sait aller chercher de l'eau à trois cents pieds sous une roche sèche, et il vient de perdre sa montagne.",
    { sobre:"L'idée met une saison à se dire et deux ans à se faire.",
      intense:"L'idée se dit en une phrase et se fait en deux ans : des Nains sans montagne, un désert sans eau, et personne qui ait jamais imaginé mettre les deux dans la même pièce.",
      extreme:"L'idée se dit en une phrase et se fait en deux ans. Des Nains sans montagne — trois mille, en plaine, sans ouvrage, dans une province qui les tolère mal et le leur fait sentir. Un désert avec onze puits mourants et douze tribus qui vont bouger vers le nord faute de mieux. Personne, dans toute l'histoire écrite de ces provinces, n'a jamais imaginé mettre ces deux problèmes dans la même pièce, parce que personne n'a jamais eu de raison d'être dans les deux pièces à la fois." },
    "Il faut quatre voyages, deux interprètes, un trésorier nain de deux cent dix ans, un chef qui accepte que des étrangers creusent sous son désert, et onze mois de négociation sur qui possède l'eau une fois qu'elle sort.",
    "§ La réponse à cette dernière question — *l'eau appartient au puits, pas à celui qui l'a creusé* — est trouvée par le trésorier nain, qui la sort d'un précédent de six cent quarante ans.",
    "Le premier forage donne à quatre-vingt-dix pieds, ce qui est ridiculement peu et ce que personne n'avait vérifié depuis deux cents ans parce que personne n'avait de raison de creuser.",
    "Khal-Vaene regarde l'eau monter sans rien dire pendant très longtemps.",
    "« J'ai passé onze ans », dit-il enfin.",
    "« Je sais. »",
    "« Il aurait suffi que quelqu'un vienne. » Il se tourne vers vous. « Ce n'est pas de la gratitude, messire, c'est de la colère. Onze ans. Personne n'est venu. »",
  ],
  effets:{ flags:['kh_puits','a2_khesh_gene','a2_hordes_gene','a2_eau'],
           faire:() => { A2().crises.khesh = Math.min(A2().crises.khesh || 0, 1.5);
                         retenir('khalvaene', "il a apporté de l'eau, ce que personne n'avait essayé en onze ans"); },
           or:-260,
           exploit:{ eclat:22, temoins:'province', quoi:"des Nains sans montagne creusent des puits dans le désert khesh" },
           marque:"Le premier forage a donné à quatre-vingt-dix pieds. Onze ans, et il aurait suffi que quelqu'un vienne.",
           court:"Quatre-vingt-dix pieds" },
  plusTard:"Le désert ne monte pas vers le nord cette décennie. Quatre provinces ne sauront jamais pourquoi.",
  suite:'a2_carte', libelleSuite:"La carte" },

kh_dire:{
  titre:"La mauvaise guerre",
  texte:[
    "Vous rapportez au nord ce que personne n'y sait : onze puits, quarante ans de baisse, et un homme de cinquante ans qui ne veut pas venir.",
    { sobre:"On vous écoute poliment.",
      intense:"On vous écoute poliment dans trois maisons et on ne vous croit dans aucune. Ce n'est pas de la bêtise : c'est qu'une nappe phréatique ne se lève pas contre un adversaire, et qu'une province ne sait rien faire d'autre.",
      extreme:"On vous écoute poliment dans trois maisons et on ne vous croit dans aucune des trois. Ce n'est même pas de la bêtise, et c'est ce qui rend la chose désespérante : on vous croit parfaitement sur les faits. Simplement, une province sait lever des hommes, elle sait fortifier une frontière, elle sait payer des mercenaires — et elle ne sait rien faire du tout d'une nappe phréatique qui baisse à cinq cents lieues. Alors elle lève des hommes." },
    "§ Un seul homme vous croit et vous prend au sérieux, et c'est le pire de tous : Lucius Furius Augustus, qui vous fait dire qu'il trouve l'information *très intéressante pour qui saura s'en servir*.",
    "Vous n'avez rien empêché. Vous avez donné à quelqu'un une saison d'avance.",
  ],
  effets:{ flags:['kh_dit','a2_khesh_su','a2_lucius_vu'],
           faire:() => retenir('lucius', "il m'a apporté sans le vouloir la seule chose que personne d'autre n'avait"),
           exploit:{ eclat:4, temoins:'quelques', quoi:"vous avez porté au nord ce que le nord ne voulait pas entendre" },
           marque:"Quatre provinces lèvent des hommes contre une nappe phréatique. Lucius, lui, a trouvé ça très intéressant.",
           court:"Très intéressant" },
  suite:'a2_carte', libelleSuite:"La carte" },

kh_nord:{
  titre:"Debout",
  texte:[
    "« Que vous n'alliez pas au nord. »",
    { sobre:"Le puits se tait.",
      intense:"Les quinze personnes assises autour du puits se taisent en même temps, ce qui n'est pas un silence : c'est une chose qu'un groupe fait quand il attend de savoir s'il doit se lever.",
      extreme:"Les quinze personnes assises autour du puits se taisent exactement en même temps, et ce n'est pas un silence : c'est ce que fait un groupe qui attend de savoir s'il doit se lever. Vous avez vu ça deux fois dans votre vie et les deux fois quelqu'un est mort dans la minute." },
    "Khal-Vaene lève une main, à hauteur de hanche, et le puits se rassoit.",
    "« Vous êtes le cinquième qu'on m'envoie », dit-il. « Vous êtes le premier à le dire tout de suite. Les quatre autres ont mis trois jours. »",
    "« On ne m'envoie pas. »",
    "« Je sais. C'est pour ça que je vous laisse parler. » Il croise les bras. « Donnez-moi une raison. Pas une menace : les provinces m'en ont donné quatre et elles ne valaient rien. Une raison. »",
    "§ Vous n'en avez aucune. Vous ne savez rien de ce désert, de ses puits, ni de ce qui pousse douze tribus à bouger.",
    "« Je n'en ai pas », dites-vous.",
    "« Non. » Il n'a pas l'air déçu ; il a l'air d'un homme qui vient de vérifier quelque chose. « Alors asseyez-vous et demandez-moi pourquoi j'y vais, et ce sera la première fois en onze ans. »",
  ],
  effets:{ flags:['kh_franc','a2_khesh_vu'],
           faire:() => retenir('khalvaene', "il a dit ce qu'il voulait en premier, ce qui ne se fait pas et qui m'a plu"),
           marque:"« Vous êtes le cinquième. Vous êtes le premier à le dire tout de suite. »",
           court:"Le cinquième" },
  suite:'kh_pourquoi', libelleSuite:"S'asseoir" },

kh_rien:{
  titre:"Un homme qui ne veut rien",
  texte:[
    "« Rien. »",
    "Khal-Vaene vous regarde un long moment.",
    { sobre:"« C'est très rare dans un désert. »",
      intense:"« C'est très rare dans un désert », dit-il. « Ici, tout le monde veut quelque chose : c'est même la définition d'un désert. »",
      extreme:"« C'est très rare dans un désert », dit-il, et il ne sourit pas. « Vous ne comprenez sans doute pas ce que ça veut dire ici. Un désert, c'est un endroit où chaque personne que vous croisez veut quelque chose de vous — de l'eau, de l'ombre, une bête, un passage. C'est même la définition technique. Un homme qui ne veut rien est soit très riche, soit mourant, soit menteur, et vous n'avez l'air d'aucun des trois. »" },
    "« Je suis venu voir. »",
    "« Alors restez trois jours et voyez. Après quoi vous voudrez quelque chose, comme tout le monde, et nous reparlerons. »",
    "§ Vous restez trois jours. Vous voyez le puits, la corde, les deux femmes qui tirent, et le niveau qu'on marque chaque matin sur la margelle avec un caillou.",
    "Trente ans de cailloux, en descendant.",
  ],
  effets:{ flags:['kh_trois_jours','a2_khesh_vu'],
           marque:"Trente ans de cailloux sur la margelle du puits de Sarad, en descendant.",
           court:"La margelle" },
  suite:'kh_pourquoi', libelleSuite:"Poser la question" },

};

enregistrerScenes(LOINTAINS);

offrir({ id:'an_arrivee', lieu:'marchenoire', va:'an_arrivee',
         titre:"Le poste de Vaeth",
         si:() => a('a2_question_ouverte') || ETAT.renom >= 40 });
offrir({ id:'kd_arrivee', lieu:'kardurak', va:'kd_arrivee',
         titre:"Onze portes, dont quatre sont tombées",
         si:() => true });
offrir({ id:'kh_arrivee', lieu:'khesh', va:'kh_arrivee',
         titre:"Le puits de Sarad",
         si:() => true });
offrir({ id:'acte_charles', lieu:'montdraken', va:'acte_charles',
         titre:"Charles de Mont-Draken",
         si:() => (a('kar_berold') || ETAT.suspicion >= 30)
               && !['ch_avoue','ch_nie','ch_esquive','ch_trois_cent_onze'].some(a) });
