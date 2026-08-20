/* PARIAS — Campagnes et affaires personnelles
 *
 * Deux registres à part du registre ordinaire, affichés sur l'écran Contrats.
 *
 * CAMPAGNES (`categorie:"campagne"`) — on n'y va pas seul. Elles débouchent sur
 * une bataille rangée et se débloquent au RENOM, pas au niveau : personne ne
 * confie une colonne à un inconnu, si doué soit-il.
 *
 * AFFAIRES PERSONNELLES (`categorie:"personnel"`) — proposées par ceux que Yohan
 * a contrariés. Elles paient mieux que tout le reste, parce qu'elles ne sont pas
 * faites pour être honorées : ce sont des tests, des pièges ou des humiliations.
 * Elles n'apparaissent qu'après la rencontre qui les motive.
 *
 * Format identique aux événements écrits, avec un type de scène en plus :
 *   bataille: { def:"BAT_ROUTE", victoire:"scene", defaite:"scene" }
 *
 * Les CAMPAGNES MAJEURES (une par peuple) exigent en plus que la crise de ce
 * peuple ait réellement mûri dans la simulation du monde :
 *   requis:{ tensionMin:{ peuple:"khesh", n:60 } }
 * Elles n'apparaissent donc pas au même moment d'une partie à l'autre — c'est le
 * monde qui décide quand, pas le joueur.
 */

const CONTRATS_SPECIAUX = [

/* ══════════════════════════ CAMPAGNES ══════════════════════════ */
{
  id:"CG_ROUTE", categorie:"campagne", titre:"Rouvrir la Route Grise",
  commanditaire:"Ligue marchande de Fort-aux-Princes", lieu:"La Route Grise",
  image:"cg_route", famille:"CONTRAT", rarete:"inhabituel",
  requis:{ renomMin:0, sansFlags:["cg_route_fait"] },
  resume:"Trois cents pillards tiennent la route la plus fréquentée du nord. La Ligue paie la solde, mais pas les pertes.",
  scenes:{
    start:{
      texte:[
        "La Ligue marchande ne cherche pas un héros : elle cherche quelqu'un qui accepte de perdre des hommes. Six semaines que la Route Grise est coupée, six semaines que les prix montent, et aucune maison ne veut engager ses propres soldats pour un problème qui ne touche que le commerce.",
        "Le contrat est net. Ils paient la solde et l'équipement. Ils ne remplacent pas les morts.",
        "« Vous menez, vous décidez, vous encaissez », dit le facteur de la Ligue. « Et si vous perdez, nous n'aurons jamais eu cette conversation. »"
      ],
      choix:[
        {label:"Accepter et mener la colonne", detail:"Bataille rangée · trois fronts",
         suite:"champ"},
        {label:"Demander une avance pour recruter", detail:"Jet de Précision (12) · +250 or avant de partir",
         test:{stat:"precision", dc:12}, reussite:"avance_ok", echec:"avance_ko"},
        {label:"Décliner", detail:"La route restera coupée", suite:"decline"},
      ]
    },
    avance_ok:{
      texte:[
        "Yohan explique posément qu'une colonne sous-effectif perd, et qu'une colonne qui perd ne rouvre aucune route. Le facteur cède : deux cent cinquante pièces d'avance, contre une part réduite à l'arrivée.",
        "C'est de quoi lever une compagnie de plus. Autant s'en servir avant de partir."
      ],
      effets:{or:250, xp:20},
      choix:[ {label:"Mener la colonne", detail:"Passez par l'écran Armée si vous voulez recruter d'abord", suite:"champ"} ]
    },
    avance_ko:{
      texte:[
        "Le facteur écoute, hoche la tête, et ne bouge pas d'une pièce. « Nous payons la solde. Le reste est votre métier, pas le nôtre. »",
        "Ce sera donc avec ce qu'on a."
      ],
      choix:[ {label:"Mener la colonne quand même", suite:"champ"} ]
    },
    champ:{
      texte:[
        "La colonne remonte la Route Grise à l'aube et trouve exactement ce qu'on lui avait annoncé : un pont tenu, une chaussée barrée, un talus garni de tireurs.",
        "Trois problèmes distincts. Trois fronts."
      ],
      bataille:{ def:"BAT_ROUTE", victoire:"gagne", defaite:"perdu" }
    },
    gagne:{
      texte:[
        "La Ligue paie sans discuter et fait circuler le nom du capitaine qui a rouvert la route — pas le nom de famille, seulement le prénom. C'est déjà beaucoup.",
        "Les convois repartent le surlendemain. Quelque part, un facteur note dans un registre qu'il existe désormais quelqu'un à qui l'on peut confier une colonne."
      ],
      effets:{flag:"cg_route_fait"},
      fin:true
    },
    perdu:{
      texte:[
        "Ce qui reste de la colonne rentre par petits groupes pendant trois jours. La Ligue ne paie pas le solde et ne rappellera pas.",
        "La route reste coupée. Le nom de celui qui a essayé circule quand même — dans l'autre sens."
      ],
      effets:{flag:"cg_route_fait"},
      fin:true
    },
    decline:{
      texte:[
        "Yohan rend le contrat au facteur sans le lire jusqu'au bout.",
        "Mener des hommes qu'on ne peut pas remplacer, pour des gens qui n'auront jamais eu cette conversation — il y a des métiers plus honnêtes, et il en exerce déjà un."
      ],
      fin:true
    }
  }
},

{
  id:"CG_CENDRE", categorie:"campagne", titre:"Déloger la compagnie franche",
  commanditaire:"Maison de Sombreval", lieu:"Les Champs de Cendre",
  image:"cg_cendre", famille:"GUERRE", rarete:"rare",
  requis:{ renomMin:18, sansFlags:["cg_cendre_fait"] },
  resume:"Une compagnie de mercenaires tient les hauteurs des Champs de Cendre. Sombreval veut la crête, pas les prisonniers.",
  scenes:{
    start:{
      texte:[
        "Sombreval a essayé deux fois. Deux fois, la compagnie franche a laissé monter la moitié d'une colonne avant de la renvoyer en bas.",
        "« Ce ne sont pas des brigands », prévient l'intendante. « Ils sont payés d'avance et ils savent exactement combien de temps ils doivent tenir. »",
        "Elle pose la bourse. « Rendez-moi la crête. Ce que vous faites de ceux qui l'occupent ne me regarde pas. »"
      ],
      choix:[
        {label:"Prendre la crête de front", detail:"Bataille · la colline avantage les tireurs adverses",
         suite:"champ"},
        {label:"Tenter de racheter la compagnie", detail:"−450 or · des mercenaires, ça s'achète deux fois",
         requis:{or:450}, suite:"rachat", effets:{or:-450}},
        {label:"Refuser", detail:"Deux colonnes y sont déjà passées", suite:"refus"},
      ]
    },
    rachat:{
      texte:[
        "Yohan monte seul sous bannière blanche et propose au capitaine franc exactement ce qu'on lui a déjà versé, plus un quart.",
        "L'homme réfléchit longtemps, puis refuse — pas par loyauté : parce qu'une compagnie qui se revend une fois ne se fait plus jamais engager.",
        "« Mais je vous aurai prévenu honnêtement », ajoute-t-il en le raccompagnant. « Nous tiendrons la crête, et vous, vous venez de perdre l'effet de surprise. »"
      ],
      effets:{xp:22},
      choix:[ {label:"Attaquer quand même", suite:"champ"} ]
    },
    champ:{
      texte:[
        "La cendre monte à mi-mollet et étouffe le bruit des pas, ce qui donne à toute la manœuvre une qualité de rêve désagréable.",
        "En haut, la compagnie franche attend en ordre. Elle n'a aucune raison de descendre."
      ],
      bataille:{ def:"BAT_CENDRE", victoire:"gagne", defaite:"perdu" }
    },
    gagne:{
      texte:[
        "Les mercenaires décrochent en bon ordre au crépuscule — ils ne fuient pas, ils constatent. Le capitaine franc salue depuis la selle avant de disparaître dans la cendre.",
        "Sombreval paie et, pour la première fois, une maison écrit un nom complet dans son registre au lieu d'un surnom."
      ],
      effets:{flag:"cg_cendre_fait"},
      fin:true
    },
    perdu:{
      texte:[
        "Troisième colonne renvoyée en bas de la crête. Les mercenaires n'ont même pas poursuivi : ils sont payés pour tenir, pas pour courir.",
        "Sombreval règle la moitié de la solde et cesse la conversation."
      ],
      effets:{flag:"cg_cendre_fait"},
      fin:true
    },
    refus:{
      texte:[
        "« Deux colonnes », répète Yohan en rendant la bourse. « Vous en avez perdu deux, et vous m'expliquez que la troisième sera différente parce que c'est moi. »",
        "L'intendante ne dément pas. C'était exactement l'argument."
      ],
      fin:true
    }
  }
},

{
  id:"CG_DEFILE", categorie:"campagne", titre:"Boucher le Défilé",
  commanditaire:"Kar-Durak", lieu:"Le Défilé des Souffrances",
  image:"cg_defile", famille:"GUERRE", rarete:"épique",
  requis:{ renomMin:38, sansFlags:["cg_defile_fait"] },
  resume:"Une horde remonte des Profondeurs. Il n'y a qu'une gorge, et personne d'autre pour la tenir.",
  scenes:{
    start:{
      pnj:"gorm",
      texte:[
        "Gorm fils de Gorik n'a pas envoyé de messager : il est venu lui-même, à pied, en trois jours, ce qui pour un nain de son rang revient à hurler.",
        "« Ils remontent. Pas une bande — une horde. Et ils remontent par le Défilé parce que c'est le seul endroit où nos galeries ne servent à rien. »",
        "Il pose une carte sur la table et n'essaie pas de la rendre encourageante. « Nous n'avons pas d'armée de surface. Nous avons de l'or et de l'acier. Vous avez des hommes. »"
      ],
      choix:[
        {label:"Tenir la gorge", detail:"Bataille · le défilé annule le nombre, s'il est bien tenu",
         suite:"champ"},
        {label:"Demander des arbalétriers nains en renfort", detail:"Jet de Volonté (13)",
         test:{stat:"vol", dc:13}, reussite:"renfort_ok", echec:"renfort_ko"},
        {label:"Refuser : ce n'est pas une bataille, c'est un sacrifice", detail:"Kar-Durak s'en souviendra",
         suite:"refus", effets:{flags:["cg_defile_fait","kardurak_abandonne"]}},
      ]
    },
    renfort_ok:{
      pnj:"gorm",
      texte:[
        "Yohan ne demande pas de l'aide : il explique que des arbalétriers dans une gorge valent trois fois ce qu'ils valent ailleurs, et que Kar-Durak a intérêt à ce que la gorge tienne.",
        "Gorm grogne, ce qui chez lui vaut acquiescement. « Une compagnie. Et ils rentrent chez eux vivants ou je vous poursuis moi-même. »"
      ],
      effets:{xp:30, or:200, flag:"gorm_ami"},
      choix:[ {label:"Prendre position dans la gorge", suite:"champ"} ]
    },
    renfort_ko:{ pnj:"gorm",
      texte:[
        "Gorm écoute et secoue la tête. « Chaque arbalétrier que je vous donne est un arbalétrier qui ne tient plus une porte en bas. »",
        "Ce sera avec ce qu'on a. Comme d'habitude."
      ],
      choix:[ {label:"Prendre position dans la gorge", suite:"champ"} ]
    },
    champ:{
      texte:[
        "La gorge fait quarante pas de large à son point le plus étroit et il n'y a rien à contourner, rien à déborder, aucune finesse possible.",
        "En bas, le bruit monte avant les corps : des tambours, un grondement, puis la première vague."
      ],
      bataille:{ def:"BAT_DEFILE", victoire:"gagne", defaite:"perdu" }
    },
    gagne:{
      pnj:"gorm",
      texte:[
        "Quand ça s'arrête enfin, la gorge est impraticable — non pas tenue : bouchée, par ce qu'ils y ont laissé.",
        "Gorm remonte à travers le champ sans dire un mot, compte les corps des siens, puis ceux de Yohan. Il fait les deux comptes avec le même soin.",
        "« Kar-Durak paiera », dit-il enfin. « Et Kar-Durak se souviendra, ce qui vaut plus cher. »"
      ],
      effets:{flags:["cg_defile_fait","kardurak_dette"]},
      fin:true
    },
    perdu:{
      texte:[
        "La ligne cède au troisième assaut et il n'y a nulle part où se replier dans une gorge — seulement en arrière, plus vite qu'eux, en abandonnant les blessés.",
        "La horde passe. Ce qu'elle fera des vallées, Yohan l'apprendra par les Chroniques, comme tout le monde."
      ],
      effets:{flag:"cg_defile_fait"},
      fin:true
    },
    refus:{
      pnj:"gorm",
      texte:[
        "« Vous me demandez de jeter mes hommes dans un entonnoir pour gagner trois semaines », dit Yohan.",
        "Gorm le regarde longuement, puis roule sa carte. « Oui. » Il n'ajoute rien, ne plaide pas, ne s'énerve pas.",
        "Il repart à pied, comme il est venu. C'est ce départ-là, pas la horde, que Yohan se rappellera."
      ],
      fin:true
    }
  }
},

{
  id:"CG_KARLSBERG", categorie:"campagne", titre:"Reprendre les Ruines du Loup",
  commanditaire:"Personne — c'est une affaire de famille", lieu:"Karlsberg",
  image:"cg_karlsberg", famille:"PARIA", rarete:"épique",
  requis:{ renomMin:28, flags:["tr_03_fait"], sansFlags:["cg_karlsberg_fait"] },
  resume:"Quelqu'un s'est installé dans les ruines. Il n'y a pas de commanditaire, pas de solde, et aucune raison de le faire — sauf une.",
  scenes:{
    start:{
      texte:[
        "L'information vient d'un charretier, pas d'un espion : les ruines du nord ne sont plus vides. On y a relevé un pan de mur, on y garde une porte, on y fait payer un droit de passage.",
        "Quelqu'un a compris avant Yohan que Karlsberg valait quelque chose. Ils ne savent probablement même pas quel nom ils occupent.",
        "Il n'y a pas de contrat. Personne ne paiera. C'est la première fois que Yohan lèvera des hommes pour lui-même, et il faudra le leur dire."
      ],
      choix:[
        {label:"Leur dire la vérité et les mener quand même", detail:"Jet de Volonté (14) · pas de solde, pas de butin promis",
         test:{stat:"vol", dc:14}, reussite:"verite_ok", echec:"verite_ko"},
        {label:"Payer de sa poche et ne rien expliquer", detail:"−500 or · la loyauté s'achète, un temps",
         requis:{or:500}, suite:"paye", effets:{or:-500}},
      ]
    },
    verite_ok:{
      texte:[
        "Yohan les réunit et leur dit exactement ce qu'il en est : pas de commanditaire, pas de solde garantie, un tas de pierres au bout de la route et un nom que la plupart d'entre eux n'ont jamais entendu.",
        "Puis il leur dit pourquoi. Ce n'est pas long, et il ne le dit qu'une fois.",
        "Personne ne part. Ce n'est pas de l'enthousiasme — c'est plus embarrassant que ça, et beaucoup plus solide."
      ],
      effets:{sang:10, xp:40},
      choix:[ {label:"Marcher sur les ruines", suite:"champ"} ]
    },
    verite_ko:{
      texte:[
        "Yohan explique mal, s'entend expliquer mal, et voit trois hommes ranger leur paquetage pendant qu'il parle encore.",
        "Ceux qui restent, restent par habitude ou par manque d'ailleurs. Ça marchera, ou ça ne marchera pas."
      ],
      effets:{xp:14},
      choix:[ {label:"Marcher sur les ruines", suite:"champ"} ]
    },
    paye:{
      texte:[
        "Cinq cents pièces de sa propre bourse, versées sans un mot d'explication. Les hommes ne posent pas de questions à une solde payée d'avance.",
        "Ils marcheront. Ils se battront correctement. Et aucun d'eux ne saura jamais ce qu'ils reprenaient."
      ],
      choix:[ {label:"Marcher sur les ruines", suite:"champ"} ]
    },
    champ:{
      texte:[
        "Le loup de pierre est visible à une demi-lieue, et Yohan comprend en le voyant que les occupants ne l'ont pas abattu — eux non plus n'ont pas osé.",
        "Ils tiennent la brèche nord, la grande salle et le verger. Trois positions. C'était déjà comme ça, autrefois."
      ],
      bataille:{ def:"BAT_KARLSBERG", victoire:"gagne", defaite:"perdu" }
    },
    gagne:{
      texte:[
        "Le dernier d'entre eux sort de la grande salle les mains ouvertes et demande au nom de qui on le prend.",
        "Yohan le lui dit. L'homme répète le nom une fois, lentement, comme on répète quelque chose qu'on ne comprend pas encore mais qu'on retiendra.",
        "Le soir, il y a des feux dans le carré d'herbe pour la première fois depuis la Purge. Ce n'est pas une maison relevée. C'est un campement dans des ruines. Mais ce sont ses ruines."
      ],
      effets:{flags:["cg_karlsberg_fait","karlsberg_tenu"]},
      fin:true
    },
    perdu:{
      texte:[
        "Ils décrochent avant la nuit, sous les yeux du loup de pierre qui n'a rien empêché du tout.",
        "Yohan compte ses morts à trois cents pas de la porte de ses ancêtres. C'est le genre de détail qu'aucune chronique ne relèvera."
      ],
      effets:{flag:"cg_karlsberg_fait", sang:4},
      fin:true
    }
  }
},

{
  id:"CG_TYRION", categorie:"campagne", titre:"Le champ que Tyrion a choisi",
  commanditaire:"Prince Tyrion", lieu:"Marches d'Eltharion",
  image:"cg_tyrion", famille:"ELFE", rarete:"épique",
  requis:{ renomMin:45, flags:["tyrion_rencontre"], sansFlags:["cg_tyrion_fait"] },
  resume:"Tyrion ne demande pas d'aide. Il propose un champ, et confie le centre à Yohan — devant toute sa cour.",
  scenes:{
    start:{
      pnj:"tyrion",
      texte:[
        "Le message n'est pas une requête. C'est une carte, une date, et une position : le centre.",
        "Tyrion a monté une opération contre une colonne d'Elfes noirs et il tiendra la gauche. Il a besoin d'un centre qui ne cède pas, et il a choisi de le confier au seul Paria qu'il connaisse.",
        "« Ne vous méprenez pas », dit-il quand Yohan arrive. « Je ne vous fais pas confiance. Je vous mets à l'endroit où l'on verra très exactement ce que vous valez. »"
      ],
      choix:[
        {label:"Accepter le centre", detail:"Bataille · c'est un examen public",
         suite:"champ"},
        {label:"Exiger la gauche à la place", detail:"Jet de Volonté (15) · le refuser devant sa cour",
         test:{stat:"vol", dc:15}, reussite:"gauche_ok", echec:"gauche_ko"},
        {label:"Décliner l'invitation", detail:"Il aura sa réponse quand même",
         suite:"decline", effets:{flags:["cg_tyrion_fait","tyrion_confirme"]}},
      ]
    },
    gauche_ok:{
      pnj:"tyrion",
      texte:[
        "« Vous me donnez le centre pour pouvoir dire, si ça tourne mal, que c'est le Paria qui a rompu », dit Yohan devant une dizaine d'officiers elfes. « Donnez-moi votre aile. Prenez la mienne. »",
        "Le silence dure exactement le temps qu'il faut pour que ce soit intenable.",
        "« Non », dit finalement Tyrion. Puis, plus bas : « Mais vous aviez raison de le demander. Le centre reste à vous, et si le centre tient, je le dirai moi-même. »"
      ],
      effets:{xp:36, sang:6, flag:"tyrion_ebranle"},
      choix:[ {label:"Prendre le centre", suite:"champ"} ]
    },
    gauche_ko:{ pnj:"tyrion",
      texte:[
        "Yohan proteste, et il proteste devant témoins, ce qui est exactement ce qu'il ne fallait pas faire.",
        "Tyrion ne répond même pas. Un officier lui indique sa position d'un geste, et la conversation est close."
      ],
      effets:{suspicion:4},
      choix:[ {label:"Prendre le centre", suite:"champ"} ]
    },
    champ:{ pnj:"tyrion",
      texte:[
        "Les Elfes noirs arrivent par la lisière, sans hâte, dans cette élégance qui est chez eux une forme d'insulte.",
        "À gauche, la colonne de Tyrion s'ébranle avec une précision de parade. Au centre, il y a Yohan, ses hommes, et environ trois cents personnes qui regardent."
      ],
      bataille:{ def:"BAT_TYRION", victoire:"gagne", defaite:"perdu" }
    },
    gagne:{
      pnj:"tyrion",
      texte:[
        "Tyrion traverse le champ à pied pour venir constater lui-même l'état du centre. Il regarde les lignes, compte, et ne dit rien pendant un temps déraisonnable.",
        "Puis, assez fort pour ses officiers : « Le centre a tenu. » Trois mots, une fois, devant tout le monde.",
        "Ce n'est pas de l'amitié. C'est un fait consigné publiquement par quelqu'un qui n'y avait aucun intérêt — et à Eltharion, ça vaut plus qu'une alliance."
      ],
      effets:{flag:"cg_tyrion_fait"},
      fin:true
    },
    perdu:{
      pnj:"tyrion",
      texte:[
        "Le centre cède peu après midi, et l'aile de Tyrion doit se replier pour ne pas être tournée.",
        "Il ne reproche rien. Il n'en a pas besoin : trois cents personnes ont vu, et c'était le but de l'exercice depuis le début."
      ],
      effets:{flags:["cg_tyrion_fait","tyrion_confirme"]},
      fin:true
    },
    decline:{ pnj:"tyrion",
      texte:[
        "Yohan renvoie la carte sans annotation.",
        "Tyrion tiendra son champ sans lui, gagnera probablement, et n'aura plus jamais besoin de se demander ce que valait ce Paria-là. Il a sa réponse."
      ],
      fin:true
    }
  }
},

{
  id:"CG_LUCIUS", categorie:"campagne", titre:"Le calendrier de Lucius",
  commanditaire:"Personne — il vous a inscrit d'office", lieu:"Champs de Cendre",
  image:"cg_lucius", famille:"GUERRE", rarete:"épique",
  requis:{ renomMin:65, flags:["lucius_rencontre","tr_05_fait"], sansFlags:["cg_lucius_fait"] },
  resume:"Il avait dit « vers la fin, vous n'êtes pas prioritaires ». La fin est arrivée plus vite que prévu.",
  scenes:{
    start:{
      pnj:"lucius",
      texte:[
        "Le message tient en une ligne, sans menace, sans emphase : un lieu, une date, et la mention *je préfère que ce soit réglé proprement*.",
        "Ce n'est pas un défi. C'est une convocation administrative pour une opération qu'il a planifiée comme il planifie tout le reste.",
        "La seule chose que Lucius Furius Augustus n'a pas prévue, c'est que Yohan ait une armée à y amener."
      ],
      choix:[
        {label:"S'y rendre", detail:"Bataille · en face, la meilleure infanterie de Vardhen",
         suite:"champ"},
        {label:"Le prendre de vitesse la veille", detail:"Jet de Précision (15) · désorganiser son ordre parfait",
         test:{stat:"precision", dc:15}, reussite:"vitesse_ok", echec:"vitesse_ko"},
        {label:"Ne pas venir", detail:"Il n'insistera pas · il reviendra",
         suite:"absent", effets:{flags:["cg_lucius_fait","lucius_reporte"], suspicion:10}},
      ]
    },
    vitesse_ok:{ pnj:"lucius",
      texte:[
        "Yohan fait ce que Lucius ne fait jamais : il arrive en avance et il improvise. Un pont brûlé la veille, deux fourrages détournés, un guide payé pour se tromper.",
        "Rien de décisif. Juste assez pour qu'une armée réglée comme une horloge arrive avec une aile en retard et de l'humeur.",
        "Contre un homme dont toute la doctrine repose sur la prévisibilité, c'est peut-être la seule arme qui vaille."
      ],
      effets:{xp:44, sang:8, flag:"lucius_desorganise"},
      choix:[ {label:"Prendre position", suite:"champ"} ]
    },
    vitesse_ko:{
      texte:[
        "Les patrouilles impériales sont exactement là où elles devaient être, à l'heure où elles devaient y être. Yohan perd une nuit et deux éclaireurs à s'en assurer.",
        "L'ordre parfait est intact. Il faudra le briser de face."
      ],
      effets:{pv:-6, fat:10},
      choix:[ {label:"Prendre position", suite:"champ"} ]
    },
    champ:{
      texte:[
        "Ils sont en ordre avant le lever du jour, alignés au cordeau, sans un cri, sans un cheval qui bouge.",
        "Et au fond, à découvert, un homme sans armure qui regarde le champ comme on regarde une carte."
      ],
      bataille:{ def:"BAT_LUCIUS", victoire:"gagne", defaite:"perdu" }
    },
    gagne:{
      pnj:"lucius",
      texte:[
        "L'ordre parfait se défait par le milieu, et une armée qui n'a jamais appris à rompre ne sait pas rompre proprement.",
        "Lucius remonte à cheval sans hâte pendant la déroute. Il ne fuit pas : il quitte une réunion qui n'a rien donné.",
        "Il croise le regard de Yohan à trois cents pas, incline très légèrement la tête, et s'en va. Il vient de reclasser Karlsberg de « pas prioritaire » à autre chose."
      ],
      effets:{flag:"cg_lucius_fait"},
      fin:true
    },
    perdu:{
      texte:[
        "Rien ne s'est effondré en face. À aucun moment. Ce n'était pas une bataille — c'était une démonstration, et Yohan en était le sujet.",
        "On le laisse repartir avec ses survivants. C'est délibéré : un exemple ne sert à rien si personne ne le raconte."
      ],
      effets:{flag:"cg_lucius_fait"},
      fin:true
    },
    absent:{
      texte:[
        "Yohan ne vient pas. L'armée impériale occupe le terrain une journée entière, puis se retire en bon ordre.",
        "Aucune représaille, aucun message. Simplement, quelque part, une ligne rayée puis réécrite un peu plus haut dans une colonne."
      ],
      fin:true
    }
  }
},


/* ══════════════════════════ CAMPAGNES MAJEURES ══════════════════════════ */
/* Une par peuple. Le monde décide de leur heure : voir requis.tensionMin. */

{
  id:"CG_KHESH", categorie:"campagne", titre:"L'Unification des Sables",
  commanditaire:"Kem-Val le Banni", lieu:"Les Dunes Khesh",
  image:"cg_khesh", famille:"KHESH", rarete:"épique",
  requis:{ renomMin:40, tensionMin:{peuple:"khesh", n:55}, sansFlags:["cg_khesh_fait"] },
  resume:"Khal-Vaene a rassemblé les tribus. Kem-Val a réuni ce qui refuse. Il manque une armée qui n'appartienne à aucun des deux.",
  scenes:{
    start:{
      pnj:"kemval",
      texte:[
        "Kem-Val n'a pas envoyé de message : il est venu, seul, à pied, et il s'est assis sans qu'on l'y invite.",
        "« Mon frère a réuni les tribus. Chez nous, réunir les tribus veut dire une seule chose : on part vers le nord et on ne s'arrête qu'à la mer. »",
        "Il pose ses mains à plat. « Je peux lui opposer la moitié des lances. Pas plus. Il me manque quelque chose qui ne soit ni à lui ni à moi — sinon ce sera une guerre de famille, et une guerre de famille ne se termine jamais. »"
      ],
      choix:[
        {label:"Amener l'armée de Karlsberg", detail:"Bataille · un tiers neutre change tout",
         suite:"champ"},
        {label:"Demander ce que Yohan y gagne", detail:"Jet de Précision (13) · il ne s'en offusquera pas",
         test:{stat:"precision", dc:13}, reussite:"gagne_ok", echec:"gagne_ko"},
        {label:"Refuser de se mêler d'une succession Khesh", detail:"Ils règleront ça entre eux, comme toujours",
         suite:"refus", effets:{flags:["cg_khesh_fait","khesh_seuls"]}},
      ]
    },
    gagne_ok:{
      pnj:"kemval",
      texte:[
        "« Qu'est-ce que j'y gagne ? »",
        "Kem-Val ne prend pas mal la question — il a l'air soulagé qu'on la pose franchement plutôt que d'invoquer l'honneur.",
        "« Les Dunes cessent d'être une frontière. Tu passes, tu commerces, tu recrutes. Et le jour où quelqu'un viendra te chercher, tu auras deux mille lances qui te devront quelque chose. » Il hausse les épaules. « Ou bien mon frère gagne, et tu n'auras plus jamais de Khesh comme voisins tranquilles. »"
      ],
      effets:{xp:36, sang:5},
      choix:[ {label:"Amener l'armée", suite:"champ"} ]
    },
    gagne_ko:{ pnj:"kemval",
      texte:[
        "Yohan pose la question de travers, avec ce ton de marchand qui vexe partout et dans les dunes plus qu'ailleurs.",
        "Kem-Val répond quand même, brièvement, sans un mot de trop. Il ne redemandera rien."
      ],
      choix:[ {label:"Amener l'armée", suite:"champ"} ]
    },
    champ:{ pnj:"khalvaene",
      texte:[
        "La plaine de sel est blanche, plate et sans un pouce de couvert. On y voit tout venir, ce qui n'aide personne.",
        "En face, les lances de Khal-Vaene sont rangées par tribu, chaque bannière à sa place. Il a fait ça proprement."
      ],
      bataille:{ def:"BAT_KHESH", victoire:"gagne", defaite:"perdu" }
    },
    gagne:{
      pnj:"kemval",
      texte:[
        "Les lances se plantent dans le sel une par une, à mesure que leurs porteurs changent de camp. Chez les Khesh, on ne se rend pas : on reconnaît.",
        "Kem-Val ne poursuit pas son frère. Il reste au milieu de la plaine jusqu'au soir, et quand il revient, il ne dit qu'une chose : « Le puits du nord est à toi. Tous les puits sont à toi. »"
      ],
      effets:{flags:["cg_khesh_fait","kemval_allie"]},
      fin:true
    },
    perdu:{ pnj:"kemval",
      texte:[
        "La ligne cède au centre et le sel boit ce qu'il faut. Kem-Val couvre la retraite lui-même, ce qui lui ressemble et ne lui vaudra rien.",
        "Les tribus marcheront vers le nord. Yohan entendra parler de ce qu'elles y feront, comme tout le monde, par les Chroniques."
      ],
      effets:{flag:"cg_khesh_fait"},
      fin:true
    },
    refus:{ pnj:"kemval",
      texte:[
        "Kem-Val hoche la tête sans insister et se relève. Il a fait quatre jours de marche pour cette conversation et il n'en montre rien.",
        "« Tu as raison », dit-il en partant. « Ce n'est pas ta guerre. » C'est exactement ce qu'il fallait ne pas entendre."
      ],
      fin:true
    }
  }
},

{
  id:"CG_KARDURAK", categorie:"campagne", titre:"La Guerre des Profondeurs",
  commanditaire:"Kar-Durak", lieu:"Kar-Durak",
  image:"cg_kardurak", famille:"NAIN", rarete:"épique",
  requis:{ renomMin:42, tensionMin:{peuple:"nains", n:55}, sansFlags:["cg_kardurak_fait"] },
  resume:"Le tunnel n'allait pas au Défilé. Il allait sous la Halle des Forges, et il vient de déboucher.",
  scenes:{
    start:{
      pnj:"gorm",
      texte:[
        "Le messager nain est arrivé en trois jours et il est mort en arrivant, ce qui dit à peu près tout de la course.",
        "Le tunnel ne visait pas le Défilé. Il visait Kar-Durak, par-dessous, et il a débouché avant-hier au milieu de la Halle des Forges.",
        "Gorm écrit, sur un feuillet qui sent la fumée : *Nous tenons trois salles. Nous n'en tiendrons pas quatre. Si le nom de Karlsberg veut dire quelque chose, qu'il le dise maintenant.*"
      ],
      choix:[
        {label:"Descendre sous la montagne", detail:"Bataille · aucun front à contourner",
         suite:"champ"},
        {label:"Envoyer de l'or et des vivres à la place", detail:"−800 or · ils tiendront peut-être plus longtemps",
         requis:{or:800}, suite:"or", effets:{or:-800, flags:["cg_kardurak_fait","kardurak_soutenu"]}},
        {label:"Ne pas venir", detail:"Une armée de surface sous terre, c'est une armée perdue",
         suite:"refus", effets:{flags:["cg_kardurak_fait","kardurak_abandonne"]}},
      ]
    },
    champ:{
      texte:[
        "Sous la montagne, il n'y a ni ciel ni flanc : trois salles, trois goulets, et de la roche partout ailleurs.",
        "La Halle des Forges brûle encore d'un feu que personne n'a allumé. Le sol du Grand Escalier remue."
      ],
      bataille:{ def:"BAT_KARDURAK", victoire:"gagne", defaite:"perdu" }
    },
    gagne:{
      pnj:"gorm",
      texte:[
        "Quand le dernier tombe, Gorm s'assoit au milieu de sa Halle et reste là très longtemps sans rien dire.",
        "Puis il se relève, prend un burin, et grave lui-même dans le pilier central un nom qui n'est pas nain.",
        "« Ça durera plus longtemps que nous deux », dit-il. C'est la chose la plus affectueuse qu'un nain puisse faire."
      ],
      effets:{flags:["cg_kardurak_fait","gorm_ami","kardurak_dette"]},
      fin:true
    },
    perdu:{ pnj:"gorm",
      texte:[
        "Les niveaux hauts sont perdus. Les nains scellent derrière eux, comme ils l'ont déjà fait une fois, et redescendent vivre plus bas.",
        "Gorm serre l'avant-bras de Yohan avant qu'il ne remonte au jour. Il ne le remercie pas et ne lui reproche rien. Les deux auraient été déplacés."
      ],
      effets:{flag:"cg_kardurak_fait"},
      fin:true
    },
    or:{
      texte:[
        "Huit cents pièces de vivres et de fer partent vers la montagne par la route la plus rapide.",
        "Kar-Durak tiendra plus longtemps. Peut-être assez. Yohan n'en saura rien avant des mois, et c'est le prix de n'être pas venu."
      ],
      fin:true
    },
    refus:{
      texte:[
        "Yohan ne répond pas au feuillet. C'est militairement défendable : une armée de surface engagée sous terre est une armée qu'on ne récupère pas.",
        "Ce sera aussi la première chose que les nains diront de lui, longtemps après que tout le reste aura été oublié."
      ],
      fin:true
    }
  }
},

{
  id:"CG_SURFACE", categorie:"campagne", titre:"La Remontée",
  commanditaire:"Les basses terres", lieu:"Les Profondeurs Vertes",
  image:"cg_surface", famille:"PEAU_VERTE", rarete:"épique",
  requis:{ renomMin:45, tensionMin:{peuple:"peaux_vertes", n:60}, sansFlags:["cg_surface_fait"] },
  resume:"Ils ne sortent plus par une galerie : par toutes à la fois, sur trente lieues. Personne n'a d'armée là-bas. Personne sauf Yohan.",
  scenes:{
    start:{
      texte:[
        "Ce ne sont pas des rumeurs : ce sont des gens sur les routes, avec des charrettes, dans le mauvais sens.",
        "La Remontée a commencé sur trente lieues de front. Aucune maison ne peut couvrir ça, et aucune n'essaie — chacune se replie sur ses murs et laisse les basses terres au milieu.",
        "Il n'y a pas de commanditaire. Il n'y a que des villages, et un endroit où une armée peut encore servir à quelque chose."
      ],
      choix:[
        {label:"Choisir un point et le tenir", detail:"Bataille · on ne sauve pas trente lieues, on en sauve une",
         suite:"champ"},
        {label:"Organiser l'évacuation plutôt que la défense", detail:"Jet de Précision (14) · sauver des gens, pas du terrain",
         test:{stat:"precision", dc:14}, reussite:"evac_ok", echec:"evac_ko"},
        {label:"Se replier avec les maisons", detail:"C'est ce que fait tout le monde",
         suite:"repli", effets:{flags:["cg_surface_fait","basses_terres_perdues"]}},
      ]
    },
    evac_ok:{
      texte:[
        "Yohan renonce à défendre et se met à compter : les routes praticables, les gués, les charrettes disponibles, le temps qu'il faut pour vider un village.",
        "Son armée ne se bat pas — elle escorte, elle ouvre les routes, elle tient les carrefours douze heures et repart. Onze villages passent au nord.",
        "Ce n'est pas une victoire. Personne n'écrira de chanson là-dessus. Onze villages, tout de même."
      ],
      effets:{renom:22, sang:14, xp:150, or:-200, flags:["cg_surface_fait","evacuation_reussie"]},
      fin:true
    },
    evac_ko:{
      texte:[
        "Le plan est bon et arrive tard. Trois villages sur onze passent le gué avant que la route ne soit coupée.",
        "Yohan reste sur la levée avec ce qu'il reste de temps."
      ],
      effets:{sang:5, xp:40},
      choix:[ {label:"Tenir la levée", suite:"champ"} ]
    },
    champ:{
      texte:[
        "Le point choisi vaut ce que vaut n'importe quel point sur trente lieues : rien de particulier, sauf qu'on a décidé de s'y arrêter.",
        "Ils arrivent par vagues, sans ordre apparent, et la première n'est pas la pire."
      ],
      bataille:{ def:"BAT_SURFACE", victoire:"gagne", defaite:"perdu" }
    },
    gagne:{
      texte:[
        "La deuxième vague ralentit. La troisième s'arrête à distance et regarde. La quatrième ne vient pas.",
        "Personne n'a donné cet ordre. Ils ont simplement vu ce qui restait de la première, et une migration, ça se décide vague par vague.",
        "Sur trente lieues de front, la Remontée s'arrête ici. Personne ne saura jamais pourquoi ici plutôt qu'ailleurs."
      ],
      effets:{flag:"cg_surface_fait"},
      fin:true
    },
    perdu:{
      texte:[
        "La levée cède avant midi. Yohan décroche avec ce qui tient encore debout, et derrière eux les basses terres cessent d'exister comme lieu habité.",
        "Il faudra une génération. Peut-être deux."
      ],
      effets:{flag:"cg_surface_fait"},
      fin:true
    },
    repli:{
      texte:[
        "Yohan replie son armée derrière les murs, comme les maisons, comme tout le monde, et regarde de loin la fumée monter sur trente lieues.",
        "C'était le choix raisonnable. Il le restera longtemps après qu'il aura cessé d'être supportable."
      ],
      fin:true
    }
  }
},

{
  id:"CG_HORDE", categorie:"campagne", titre:"La Grande Horde",
  commanditaire:"Personne — les hardes marchent", lieu:"La Forêt des Mille Cornes",
  image:"cg_horde", famille:"HOMME_BETE", rarete:"épique",
  requis:{ renomMin:38, tensionMin:{peuple:"hommes_betes", n:60}, sansFlags:["cg_horde_fait"] },
  resume:"Les hardes marchent ensemble pour la première fois depuis des siècles. Quelqu'un a repris le titre de Seigneur des Cornes.",
  scenes:{
    start:{
      texte:[
        "Les totems de la lisière ont été abattus — par ceux qui les avaient plantés. Une harde qui abat ses propres bornes ne défend plus un territoire : elle en cherche un autre.",
        "Elles marchent ensemble, ce qui n'était pas arrivé depuis des siècles, et elles marchent vers les terres cultivées.",
        "Quelqu'un a repris un titre que tout le monde croyait légendaire."
      ],
      choix:[
        {label:"Les arrêter au gué du nord", detail:"Bataille · l'endroit où la forêt cesse",
         suite:"champ"},
        {label:"Demander à parler au Seigneur des Cornes", detail:"Jet de Volonté (15) · personne n'a essayé",
         requis:{flag:"harde_toleree"}, test:{stat:"vol", dc:15}, reussite:"parle_ok", echec:"champ"},
        {label:"Laisser passer", detail:"Ce ne sont pas ses terres",
         suite:"laisse", effets:{flags:["cg_horde_fait","grande_horde_passee"]}},
      ]
    },
    parle_ok:{
      texte:[
        "Yohan entre seul sous les arbres, sans arme visible, et on le laisse aller loin — parce qu'un jour il a franchi une ligne de totems les paumes ouvertes, et que ces choses-là se transmettent.",
        "Le Seigneur des Cornes n'est pas un géant : c'est une vieille femme, appuyée sur une hampe, entourée de chefs qui ont trois fois sa taille.",
        "« Nous partons parce que la forêt meurt », dit-elle. « Pas parce que nous voulons vos champs. Montre-nous où aller, et nous n'irons pas là. »"
      ],
      choix:[
        {label:"Leur ouvrir les Champs de Cendre", detail:"Personne n'y vit · personne n'y vivra",
         suite:"cendre", effets:{renom:20, sang:20, xp:180,
           flags:["cg_horde_fait","hardes_installees","crise_hommes_betes_reglee"]}},
        {label:"Refuser : il n'a pas de terres à donner", detail:"C'est vrai · et ça ne changera rien à ce qui suit",
         suite:"champ"},
      ]
    },
    cendre:{
      texte:[
        "Yohan leur ouvre les Champs de Cendre — une terre brûlée par des guerres humaines, que personne ne réclame et que personne ne cultivera avant un siècle.",
        "La vieille femme écoute la description jusqu'au bout, puis hoche la tête une fois. Les hardes obliquent vers l'est dans la nuit.",
        "Aucune bataille n'a lieu. Personne ne saura qu'il y en avait une à éviter, et c'est très exactement le problème de ce genre de victoire."
      ],
      fin:true
    },
    champ:{
      texte:[
        "Le gué du nord est l'endroit où la forêt cesse et où les champs commencent. C'est là que ça se joue, faute d'ailleurs.",
        "Elles arrivent au son des tambours, sans se presser, et elles couvrent la lisière d'un bord à l'autre."
      ],
      bataille:{ def:"BAT_HORDE", victoire:"gagne", defaite:"perdu" }
    },
    gagne:{
      texte:[
        "Les hardes se défont comme elles s'étaient faites : d'un coup, sans négociation, chacune reprenant sa direction.",
        "Le titre redevient vacant. Il le restera peut-être encore quelques siècles — ou jusqu'à ce que la forêt meure pour de bon."
      ],
      effets:{flag:"cg_horde_fait"},
      fin:true
    },
    perdu:{
      texte:[
        "Le gué est franchi avant le soir. Ce qui suit se lira dans les Chroniques pendant deux ans.",
        "Il y a un Seigneur des Cornes, désormais, et tout le monde connaît son nom."
      ],
      effets:{flag:"cg_horde_fait"},
      fin:true
    },
    laisse:{
      texte:[
        "Yohan ne bouge pas son armée. Les hardes passent le gué et se répandent sur les terres cultivées.",
        "Ce n'étaient pas ses terres. Il se le répétera plusieurs fois."
      ],
      fin:true
    }
  }
},

{
  id:"CG_ELTHARION", categorie:"campagne", titre:"La Faute d'Eltharion",
  commanditaire:"Princesse Alarielle", lieu:"La Cour lumineuse d'Eltharion",
  image:"cg_eltharion", famille:"ELFE", rarete:"épique",
  requis:{ renomMin:44, tensionMin:{peuple:"elfes", n:50}, flags:["archive_elfique"],
           sansFlags:["cg_eltharion_fait"] },
  resume:"L'archive est réelle et Alarielle veut la lire à voix haute devant la cour. La moitié de cette cour a des soldats.",
  scenes:{
    start:{
      pnj:"alarielle",
      texte:[
        "« Je vais la lire », dit Alarielle. « Devant la cour, à voix haute, du premier chiffre au dernier. »",
        "Elle sait exactement ce que cela déclenchera : la moitié des maisons a intérêt à ce que trois siècles restent silencieux, et cette moitié-là entretient des archers.",
        "« Je ne vous demande pas de me protéger. Je vous demande de tenir le pavillon des archives assez longtemps pour que j'aie fini de lire. »"
      ],
      choix:[
        {label:"Tenir le pavillon", detail:"Bataille · il faut tenir, pas vaincre",
         suite:"champ"},
        {label:"Lui proposer de publier l'archive ailleurs", detail:"Jet de Précision (14) · sans effusion",
         test:{stat:"precision", dc:14}, reussite:"ailleurs_ok", echec:"champ"},
        {label:"Lui dire de brûler l'archive", detail:"Trois siècles de plus ne changeront rien",
         suite:"brule", effets:{flags:["cg_eltharion_fait","archive_etouffee"]}},
      ]
    },
    ailleurs_ok:{
      pnj:"alarielle",
      texte:[
        "« Une lecture publique, c'est un événement », dit Yohan. « Trois cents copies chez trois cents notaires humains, c'est un fait. On n'assassine pas un fait. »",
        "Alarielle le regarde longuement. « Vous proposez de la donner à des humains. » Un temps. « Mon peuple ne s'en remettra pas. »",
        "« Non », convient-il. Elle sourit — un vrai sourire, très bref. « Faisons ça. »"
      ],
      effets:{renom:12, sang:18, xp:160, or:-400,
        flags:["cg_eltharion_fait","archive_publiee","crise_elfes_reglee"]},
      fin:true
    },
    champ:{ pnj:"alarielle",
      texte:[
        "Le pavillon des archives est en pierre blanche et n'a jamais été conçu pour être défendu, ce qui se voit tout de suite.",
        "Alarielle monte à la tribune et ouvre le premier registre. Dehors, les premiers traits partent avant qu'elle ait fini la première colonne."
      ],
      bataille:{ def:"BAT_ELTHARION", victoire:"gagne", defaite:"perdu" }
    },
    gagne:{
      pnj:"alarielle",
      texte:[
        "Elle a fini de lire. C'est la seule chose qui comptait, et elle a fini de lire.",
        "Trois siècles de mesures, de dates et de signatures, énoncés à voix haute devant une cour qui ne peut plus prétendre ne pas savoir.",
        "Tyrion était au fond de la salle du début à la fin. Il n'a pas fait un geste pour empêcher quoi que ce soit, et ce sera consigné aussi."
      ],
      effets:{flag:"cg_eltharion_fait"},
      fin:true
    },
    perdu:{ pnj:"alarielle",
      texte:[
        "Le pavillon brûle avec ce qu'il contenait, et Alarielle en est sortie de justesse avec quatre feuillets sur trois cents.",
        "Officiellement, c'est un accident. Officiellement, il n'y a jamais rien eu à mesurer."
      ],
      effets:{flag:"cg_eltharion_fait"},
      fin:true
    },
    brule: {
      pnj:"alarielle",
      texte:[
        "« Brûlez-la », dit Yohan. « Trois siècles de plus ne changeront rien, et vous, vous serez morte dans trois jours. »",
        "Alarielle ne discute pas. C'est ce qui rend la chose insupportable : elle obéit, proprement, comme elle fait tout.",
        "Ils regardent l'archive brûler ensemble. Ni l'un ni l'autre ne reparlera de cette soirée."
      ],
      fin:true
    }
  }
},

{
  id:"CG_PARIAS", categorie:"campagne", titre:"La Renaissance des Parias",
  commanditaire:"Alycia de Callensbourg", lieu:"Un refuge sans nom",
  image:"cg_parias", famille:"PARIA", rarete:"épique",
  requis:{ renomMin:46, compagnon:"alycia", tensionMin:{peuple:"parias", n:45},
           sansFlags:["cg_parias_fait"] },
  resume:"L'Ordre des Chasseurs a localisé le refuge. Trente-trois noms, et tout ce que Yohan a pu lever.",
  scenes:{
    start:{
      pnj:"alycia",
      texte:[
        "Alycia n'a pas la liste à la main. C'est la première fois, et c'est ce qui inquiète Yohan avant qu'elle n'ait parlé.",
        "« Ils l'ont trouvé. » Elle ne dit pas *le refuge*, elle ne le nomme jamais. « Pas par hasard. Quelqu'un a vendu l'emplacement, et je saurai qui, plus tard, s'il y a un plus tard. »",
        "Elle relève enfin les yeux. « Trente-trois personnes. Deux savent se battre. J'y vais de toute façon, avec ou sans toi — je te le dis pour que tu ne croies pas me faire une faveur. »"
      ],
      choix:[
        {label:"Y aller avec toute l'armée", detail:"Bataille · rien à négocier",
         suite:"champ"},
        {label:"Vider le refuge avant qu'ils n'arrivent", detail:"Jet de Précision (15) · une course, pas une bataille",
         test:{stat:"precision", dc:15}, reussite:"vide_ok", echec:"champ"},
        {label:"Payer l'Ordre pour qu'il regarde ailleurs", detail:"−1200 or · ils ont un tarif, comme tout le monde",
         requis:{or:1200}, suite:"paye", effets:{or:-1200}},
      ]
    },
    vide_ok:{
      pnj:"alycia",
      texte:[
        "Yohan ne défend pas le refuge : il le vide. Trois nuits, quatre routes, des charrettes payées trop cher et des gens qu'on réveille sans explication.",
        "Quand l'Ordre des Chasseurs arrive, il trouve des lits froids, des cendres tièdes et rien d'autre. Une opération parfaitement montée contre un endroit vide.",
        "Alycia compte les têtes à l'arrivée. Trente-trois. Elle recommence deux fois, à voix haute, et il n'y a rien à ajouter à ça."
      ],
      effets:{renom:18, sang:30, xp:220, or:-500,
        flags:["cg_parias_fait","refuge_vide","crise_parias_reglee"]},
      fin:true
    },
    champ:{ pnj:"chasseur_prime",
      texte:[
        "Le refuge est au bout d'un chemin creux, dans un ancien prieuré dont les murs tiennent encore.",
        "L'Ordre des Chasseurs monte en trois colonnes, sans se presser. Ils ne sont pas venus pour une bataille : ils sont venus pour une rafle, et ils découvrent en arrivant qu'il y a une armée devant."
      ],
      bataille:{ def:"BAT_PARIAS", victoire:"gagne", defaite:"perdu" }
    },
    gagne:{
      pnj:"alycia",
      texte:[
        "Le lendemain matin, ils sont trente-trois. C'est la première fois depuis la Purge que ce chiffre ne baisse pas d'une année sur l'autre.",
        "Alycia ne sort pas le rouleau ce soir-là. Elle s'assoit contre un mur du prieuré et ne fait rien du tout pendant plusieurs heures, ce qui, chez elle, est un événement historique.",
        "« Il faudra recommencer », finit-elle par dire. « Ailleurs, autrement, dans six mois. » Elle ferme les yeux. « Mais pas ce soir. »"
      ],
      effets:{flag:"cg_parias_fait"},
      fin:true
    },
    perdu:{
      pnj:"alycia",
      texte:[
        "Yohan décroche avec ce qu'il peut emmener, et ce qu'il peut emmener n'est pas trente-trois.",
        "Alycia ne dit rien pendant trois jours. Le quatrième, elle sort le rouleau, et elle commence à rayer."
      ],
      effets:{flag:"cg_parias_fait"},
      fin:true
    },
    paye:{ pnj:"alycia",
      texte:[
        "Douze cents pièces changent de main dans une arrière-salle, et l'opération est reportée pour raisons de renseignement insuffisant.",
        "Ça marche. Ça marche exactement une fois, et les deux parties le savent en signant.",
        "Alycia apprend le prix par un tiers, des semaines plus tard. Elle ne remercie pas — elle demande combien de temps ça achète. Yohan n'a pas la réponse."
      ],
      effets:{sang:12, xp:120, flags:["cg_parias_fait","ordre_achete"]},
      fin:true
    }
  }
},

/* ══════════════════════════ AFFAIRES PERSONNELLES ══════════════════════════ */
{
  id:"CS_CALEB", categorie:"personnel", titre:"La faveur de Fort-aux-Princes",
  commanditaire:"Caleb de Fort-aux-Princes", lieu:"Fort-aux-Princes",
  image:"cs_caleb", famille:"CONTRAT", rarete:"rare",
  requis:{ flags:["caleb_hostile"], sansFlags:["cs_caleb_fait"] },
  resume:"Caleb propose un contrat très bien payé, dans un endroit très mal choisi. Ce n'est pas une réconciliation.",
  scenes:{
    start:{
      pnj:"caleb",
      texte:[
        "Le message porte le sceau de Fort-aux-Princes et un montant qui n'a aucun rapport avec le travail décrit : escorter un convoi de sel sur trois jours.",
        "Trois jours d'escorte pour le prix d'une chasse au dragon. Caleb n'est pas généreux, et il n'a pas oublié.",
        "En marge, de sa main : *Vous aviez dit que personne ne vous dictait votre route. Prouvez-le.*"
      ],
      choix:[
        {label:"Chercher où est le piège avant de partir", detail:"Jet de Précision (14)",
         test:{stat:"precision", dc:14}, reussite:"piege_ok", echec:"piege_ko"},
        {label:"Accepter tel quel et encaisser", detail:"L'or est réel · le reste aussi",
         suite:"piege_ko"},
        {label:"Renvoyer le contrat déchiré", detail:"Il comprendra · il en enverra un autre",
         suite:"refus", effets:{xp:16, flags:["cs_caleb_fait"]}},
      ]
    },
    piege_ok:{
      pnj:"caleb",
      texte:[
        "Yohan remonte l'itinéraire sur une carte au lieu de le lire. Le convoi traverse trois lieues de territoire réclamé par une maison en litige avec Fort-aux-Princes — et un escorteur pris là-bas n'est pas un escorteur : c'est une preuve d'incursion.",
        "Caleb ne veut pas la mort de Yohan. Il veut un incident diplomatique avec un Paria dedans, et une maison rivale qui s'en charge à sa place.",
        "Yohan se présente à la garnison et pose la carte sur la table de Caleb, l'itinéraire souligné."
      ],
      choix:[
        {label:"Exiger le vrai contrat, ou rien", detail:"Jet de Volonté (13)",
         test:{stat:"vol", dc:13}, reussite:"vrai_ok", echec:"vrai_ko"},
        {label:"Faire l'escorte, mais par un autre chemin", detail:"Deux jours de plus, aucun incident",
         suite:"detour", effets:{or:520, xp:34, fat:12, flags:["cs_caleb_fait"]}},
      ]
    },
    vrai_ok:{
      pnj:"caleb",
      texte:[
        "Caleb regarde la carte, puis Yohan, et éclate d'un rire bref et sincère qui ne lui ressemble pas du tout.",
        "« Il a fallu combien de temps ? » — « Une heure. » — « J'avais parié deux jours. »",
        "Il retire la carte, sort une autre bourse d'un tiroir, et pose un contrat différent : un vrai, ennuyeux, honnête. « Vous m'agacez toujours autant. Mais on ne piège pas deux fois quelqu'un qui vérifie. »"
      ],
      effets:{or:600, xp:46, sang:6, flags:["cs_caleb_fait","caleb_respect"]},
      fin:true
    },
    vrai_ko:{
      pnj:"caleb",
      texte:[
        "Yohan hausse le ton, et c'est l'erreur : Caleb n'a jamais rien concédé à quelqu'un qui crie dans sa propre garnison.",
        "« Sortez. » Il reprend la carte. « Le contrat est retiré. Vous avez évité le piège et perdu l'argent — dans mon métier, on appelle ça un match nul. »"
      ],
      effets:{xp:20, flags:["cs_caleb_fait"]},
      fin:true
    },
    detour:{ pnj:"caleb",
      texte:[
        "Yohan fait l'escorte par le sud, deux jours de plus, sans jamais approcher le territoire litigieux. Le sel arrive. Personne n'est pris nulle part.",
        "Caleb paie l'intégralité de la somme sans commentaire — payer était le seul moyen de ne pas admettre que le piège existait."
      ],
      fin:true
    },
    piege_ko:{
      texte:[
        "L'escorte se passe sans un incident pendant deux jours et demi. C'est au gué du troisième jour que quarante cavaliers d'une maison dont Yohan n'a jamais entendu le nom lui demandent ce qu'il fait sur leurs terres.",
        "La réponse honnête — *j'escorte du sel pour Fort-aux-Princes* — est exactement la pire des réponses possibles."
      ],
      combat:{ groupe:[{champion:"garde_leopold"},{bst:"BST_002",n:2}], victoire:"piege_survecu", defaite:"piege_survecu" }
    },
    piege_survecu:{ pnj:"caleb",
      texte:[
        "Yohan décroche du gué avec le convoi et arrive à destination avec deux caisses de moins et une réputation d'incursion armée.",
        "Caleb paie rubis sur l'ongle, publiquement, avec force remerciements — ce qui achève de graver l'affaire dans les registres de trois maisons.",
        "C'était le contrat depuis le début."
      ],
      effets:{or:700, suspicion:18, xp:26, flags:["cs_caleb_fait","incident_frontiere"]},
      fin:true
    },
    refus:{ pnj:"caleb",
      texte:[
        "Yohan déchire le contrat en quatre et renvoie les morceaux par le même coursier.",
        "Il n'a rien gagné et rien perdu. Caleb, lui, vient d'apprendre que le piège était trop gros — et le prochain sera meilleur."
      ],
      fin:true
    }
  }
},

{
  id:"CS_TYRION", categorie:"personnel", titre:"La commission d'Eltharion",
  commanditaire:"Prince Tyrion", lieu:"Cour lumineuse d'Eltharion",
  image:"cs_tyrion", famille:"ELFE", rarete:"rare",
  requis:{ flags:["tyrion_rencontre"], sansFlags:["cs_tyrion_fait","cg_tyrion_fait"] },
  resume:"Tyrion confie à Yohan une course d'archiviste. Ce n'est pas une insulte — c'est pire, c'est un test.",
  scenes:{
    start:{
      pnj:"tyrion",
      texte:[
        "La commission est humiliante et parfaitement polie : convoyer trois caisses d'archives d'un pavillon à un autre, à l'intérieur même de la cour. Une journée de travail pour un porteur.",
        "La somme proposée est celle d'un contrat de chasse.",
        "« Vous vous demandez pourquoi », dit Tyrion sans lever les yeux. « C'est déjà la première partie du travail. »"
      ],
      choix:[
        {label:"Faire le travail sans poser de question", detail:"Jet de Volonté (12) · ravaler, et observer",
         test:{stat:"vol", dc:12}, reussite:"porte_ok", echec:"porte_ko"},
        {label:"Ouvrir les caisses", detail:"Jet d'Agilité (14) · elles sont scellées, évidemment",
         test:{stat:"agi", dc:14}, reussite:"ouvre_ok", echec:"ouvre_ko"},
        {label:"Refuser une course de domestique", detail:"C'est exactement ce qu'il attend",
         suite:"refus", effets:{flags:["cs_tyrion_fait","tyrion_confirme"]}},
      ]
    },
    porte_ok:{
      pnj:"tyrion",
      texte:[
        "Yohan porte les caisses. Il les porte bien, sans un mot, en une journée, devant une cour entière qui fait semblant de ne pas regarder.",
        "Et pendant qu'il porte, il compte : les gardes, les relèves, les pavillons dont les portes ne s'ouvrent jamais. Une course de domestique est le meilleur laissez-passer du monde.",
        "Tyrion le paie le soir même. « Vous n'avez pas demandé pourquoi. » — « Vous m'aviez dit que c'était la première partie. » — « ...Oui. » Il a l'air, pour la première fois, légèrement décontenancé."
      ],
      effets:{or:480, xp:44, sang:5, flags:["cs_tyrion_fait","cour_elfique_connue"]},
      fin:true
    },
    porte_ko:{
      texte:[
        "Yohan porte les caisses en ruminant, et rumine si bien qu'il ne voit rien du tout de ce qui l'entoure.",
        "Il est payé, correctement, et raccompagné à la lisière comme n'importe quel porteur. C'était peut-être tout ce qu'il y avait à comprendre."
      ],
      effets:{or:480, xp:16, flag:"cs_tyrion_fait"},
      fin:true
    },
    ouvre_ok:{
      pnj:"tyrion",
      texte:[
        "Les sceaux elfiques se rouvrent sans se briser si l'on sait où appuyer, et Yohan a passé assez d'années à ne pas être honnête pour le savoir.",
        "Les caisses contiennent des relevés. Des mesures d'Onde, datées, sur trois siècles, avec des colonnes de chiffres qui décroissent régulièrement — le nombre de porteurs recensés, année après année.",
        "La dernière colonne s'arrête il y a quatre ans, sur un chiffre qui n'est pas zéro. Les Elfes comptent les Parias survivants. Ils les comptent encore."
      ],
      effets:{xp:50, sang:12, flags:["cs_tyrion_fait","recensement_elfique"]},
      fin:true
    },
    ouvre_ko:{
      pnj:"tyrion",
      texte:[
        "Le sceau se brise net, proprement, bruyamment. Il n'y a personne dans le couloir et cela n'a aucune importance : ces sceaux-là sont faits pour dire qu'on les a ouverts.",
        "Tyrion vient constater lui-même, sans se presser. « Voilà. » Il ne semble ni surpris ni fâché. « C'était la deuxième partie du travail, et vous venez d'y répondre. »",
        "On raccompagne Yohan sans le payer."
      ],
      effets:{suspicion:10, xp:18, flags:["cs_tyrion_fait","tyrion_confirme"]},
      fin:true
    },
    refus:{ pnj:"tyrion",
      texte:[
        "Yohan repose la commission sur la table et sort des jardins sans attendre qu'on le raccompagne.",
        "Il n'a rien porté, rien ouvert, rien appris. Tyrion, lui, a obtenu la réponse qu'il cherchait en une phrase et sans rien dépenser."
      ],
      fin:true
    }
  }
},

{
  id:"CS_VAUCLAIR", categorie:"personnel", titre:"Ce que Vauclair n'a pas oublié",
  commanditaire:"Dame Sarre de Vauclair", lieu:"Vauclair",
  image:"cs_vauclair", famille:"POLITIQUE", rarete:"rare",
  requis:{ flags:["vauclair_rancune"], sansFlags:["cs_vauclair_fait"] },
  resume:"Dame Sarre propose un contrat somptueux. Elle sourit en le proposant, ce qui est mauvais signe.",
  scenes:{
    start:{
      pnj:"dame_sarre",
      texte:[
        "La même pièce sans fenêtre, la même femme, le même sourire. Neuf cents pièces pour récupérer un coffret chez un prêteur de Port-Noir.",
        "« Vous m'avez coûté cher », dit-elle sans amertume apparente. « Il me semble équitable que vous me rapportiez quelque chose. »",
        "Le coffret existe. Le prêteur existe. C'est le reste qui est en question."
      ],
      choix:[
        {label:"Se renseigner sur le prêteur avant d'accepter", detail:"Jet de Précision (13)",
         test:{stat:"precision", dc:13}, reussite:"preteur_ok", echec:"preteur_ko"},
        {label:"Accepter et partir immédiatement", detail:"+900 or promis · elle sourit toujours",
         suite:"preteur_ko"},
        {label:"Lui rendre le contrat et lui souhaiter bonne chance", detail:"Elle attendra une autre occasion",
         suite:"refus", effets:{xp:14, flag:"cs_vauclair_fait"}},
      ]
    },
    preteur_ok:{
      pnj:"dame_sarre",
      texte:[
        "Trois questions à Port-Noir suffisent : le prêteur est mort il y a deux mois, et son étude est sous scellés de la garde. Récupérer un coffret là-dedans, ce n'est pas une commission — c'est une effraction sur bien saisi.",
        "Yohan revient à Vauclair et le dit à voix haute, dans la pièce sans fenêtre, en prenant son temps.",
        "Dame Sarre l'écoute jusqu'au bout. « Vous êtes fatigant », dit-elle enfin, et pour la première fois elle a l'air sincère. « Bon. Le coffret est réellement à moi. Et il est réellement sous scellés. Voulez-vous le vrai prix ? »"
      ],
      choix:[
        {label:"Négocier le vrai prix", detail:"Jet de Précision (12) · un travail illégal, payé en conséquence",
         test:{stat:"precision", dc:12}, reussite:"vrai_ok", echec:"vrai_ko"},
        {label:"Refuser : elle a essayé deux fois", detail:"+Renom auprès de personne, mais on dort mieux",
         suite:"refus_ferme", effets:{xp:30, sang:4, flags:["cs_vauclair_fait","vauclair_neutralisee"]}},
      ]
    },
    vrai_ok:{ pnj:"dame_sarre",
      texte:[
        "Le prix triple quand on cesse de prétendre que le travail est propre. Yohan entre dans l'étude scellée une nuit de pluie, ressort avec le coffret, et ne l'ouvre pas — c'était la seule condition qu'il ait posée à voix haute.",
        "Dame Sarre paie sans compter, ce qui chez elle est une forme de respect.",
        "« Nous ne serons jamais alliés », dit-elle en refermant la porte. « Mais je crois que j'ai cessé d'essayer de vous faire pendre. »"
      ],
      effets:{or:1400, suspicion:12, xp:52, flags:["cs_vauclair_fait","vauclair_apaisee"]},
      fin:true
    },
    vrai_ko:{ pnj:"dame_sarre",
      texte:[
        "Yohan demande mal, trop tôt, et Dame Sarre reprend l'avantage en trois phrases. Il fera le travail au tarif initial, ce qui, pour une effraction sur bien saisi, est un très mauvais tarif.",
        "Le coffret est récupéré. La somme est versée. Et quelque part dans les registres de la garde de Port-Noir, une description commence à circuler."
      ],
      effets:{or:900, suspicion:20, xp:24, flag:"cs_vauclair_fait"},
      fin:true
    },
    preteur_ko:{
      texte:[
        "Yohan part le soir même et découvre les scellés de la garde en arrivant devant l'étude — c'est-à-dire au pire moment possible pour découvrir quoi que ce soit.",
        "Il entre quand même : repartir sans le coffret après trois jours de route serait pire.",
        "La patrouille arrive au moment où il en ressort."
      ],
      combat:{ groupe:[{champion:"garde_leopold", n:2}], victoire:"fuite", defaite:"fuite" }
    },
    fuite:{ pnj:"dame_sarre",
      texte:[
        "Yohan quitte Port-Noir par la route de terre avec le coffret et une description de lui-même qui circulera dans trois ports avant la fin du mois.",
        "Dame Sarre paie les neuf cents pièces promises, intégralement, avec un plaisir qu'elle ne cherche même pas à dissimuler.",
        "« Vous voyez », dit-elle. « Vous avez fini par travailler pour moi. »"
      ],
      effets:{or:900, suspicion:26, xp:22, flags:["cs_vauclair_fait","recherche_port_noir"]},
      fin:true
    },
    refus_ferme:{
      pnj:"dame_sarre",
      texte:[
        "« Deux fois », dit Yohan en reposant le contrat. « Vous avez essayé deux fois. Il n'y aura pas de troisième conversation. »",
        "Il sort sans attendre la réponse. Derrière lui, Dame Sarre ne rappelle pas ses gardes — elle est bien des choses, mais elle sait reconnaître une porte qui se ferme définitivement.",
        "Vauclair ne le piégera plus. Vauclair ne l'emploiera plus non plus."
      ],
      fin:true
    },
    refus:{
      texte:[
        "Yohan rend le contrat sans l'avoir lu jusqu'au bout et quitte Vauclair le jour même.",
        "Il n'a rien perdu. Elle n'a rien dépensé. Ils se retrouveront."
      ],
      fin:true
    }
  }
},

];
