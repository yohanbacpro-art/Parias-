/* PARIAS — Les affaires écrites qui remplacent le registre générique
 *
 * Le jeu tirait, quand un lieu n'avait plus rien à proposer, dans un registre
 * de cinquante contrats dérivés de dix archétypes : mêmes étapes, mêmes
 * complications, mêmes issues, aux variables {commanditaire}/{lieu}/{type}
 * près. C'était du remplissage, et ça se voyait.
 *
 * Ce fichier le remplace par dix affaires écrites, une par une, placées
 * exactement là où le jeu manquait : l'Arène Rouge et la Côte des Dents
 * n'avaient rien du tout, Karlsberg, la cour d'Eltharion, la Cicatrice et le
 * Cimetière des Dragons de Sable n'avaient qu'une seule affaire.
 *
 * Même format que src/data/chaines.js — ce sont les mêmes chaînes, versées
 * dans le même tableau à la fin du fichier.
 */

const CHAINES_2 = [

/* ══════════════════════════════════════════════════════════════════════════
   L'ARÈNE ROUGE — I. Le compte du tenancier
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_ARENE_COMPTE", type:'contrat', titre:"Le Compte du tenancier",
  commanditaire:"Baltus, tenancier de l'Arène Rouge",
  or:900, danger:"dangereux", categorie:"traque",
  lieux:["LOC_017","LOC_016"],
  pitch:"Trois combats truqués en six semaines, et le tenancier n'y est pour rien — ce qui, dans une arène, est la pire nouvelle possible.",
  paye:["reseau_brise","part_prise","laisse_courir"],
  issues:{
    reseau_brise:"Le réseau qui truquait l'Arène Rouge a été brisé, et l'Arène s'en souvient.",
    part_prise:"Yohan a pris sa part du réseau de l'Arène plutôt que de le briser.",
    laisse_courir:"L'Arène Rouge continue de vendre des combats décidés d'avance.",
    abandonnee:"Le compte du tenancier est resté ouvert.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Baltus attend dans son cagibi.",
      ev:{ id:"CAC_1", titre:"Ce que Baltus ne comprend pas", famille:"VILLE", rarete:"majeur",
        image:"evt_taverne", pnj:"baltus",
        scenes:{
          start:{ pnj:"baltus", texte:[
            "Le cagibi de Baltus sent la sciure et le vinaigre. Il tient l'Arène depuis dix-neuf ans, il a un registre par saison, et il les a tous sortis.",
            "« Trois combats. Le Boucher qui tombe au deuxième assaut contre un gamin des quais. La Louve qui perd sa garde comme une débutante. Et Orso, qui s'est couché — Orso, qui a pris quatre-vingts combats sans jamais se coucher. »",
            "Il tape du doigt sur une colonne. « Les paris ont suivi. Trop bien. Quelqu'un savait avant moi, et je suis le seul qui devrait savoir avant. »"],
            choix:[
              {label:"Regarder les registres de paris", detail:"Jet de Précision (13) · les chiffres disent qui savait",
               test:{stat:"precision", dc:13}, reussite:"chiffres_ok", echec:"chiffres_ko"},
              {label:"Demander qui a peur", detail:"Jet de Volonté (12) · trois combattants qui perdent, ce sont trois hommes tenus",
               test:{stat:"vol", dc:12}, reussite:"peur_ok", echec:"peur_ko"},
              {label:"Aller voir Orso", detail:"Un homme qui s'est couché après quatre-vingts combats a une raison",
               suite:"orso"},
              {label:"Refuser : une arène truquée n'est pas une affaire", detail:"Ce n'est pas faux",
               suite:"refus", effets:{issue:"abandonnee"}},
            ]},
          chiffres_ok:{ pnj:"baltus", texte:[
            "Les gros paris ne tombent pas au hasard : ils tombent la veille au soir, entre la sixième et la huitième heure, toujours par des mises moyennes multipliées.",
            "Onze mises, onze noms différents, et onze fois la même écriture au dos du billet — un teneur de livre qui n'a pas pensé qu'on garderait les billets.",
            "Baltus regarde par-dessus l'épaule de Yohan et devient très pâle. « C'est mon neveu. »"],
            effets:{xp:26, flag:"arene_neveu"}, suite:"choix2"},
          chiffres_ko:{ texte:[
            "Dix-neuf saisons de registres, une écriture de tenancier, et deux nuits à additionner des colonnes pour arriver à la seule conclusion certaine : quelqu'un mise gros et gagne.",
            "On savait déjà."],
            effets:{xp:10, fat:12}, suite:"choix2"},
          peur_ok:{ texte:[
            "Orso ne parle pas. La Louve non plus. Le Boucher, lui, parle — parce qu'il a une fille de neuf ans à Port-Noir et qu'il vient de comprendre que ça ne s'arrêtera pas.",
            "« Ils ne menacent pas. Ils achètent. Et quand tu as pris une fois, tu n'es plus quelqu'un qui refuse : tu es quelqu'un qui négocie. »",
            "Il donne un lieu : l'entrepôt trois, sur les quais, celui qui sent le poisson."],
            effets:{xp:28, flag:"arene_boucher_parle"}, suite:"choix2"},
          peur_ko:{ texte:[
            "Trois combattants, trois silences, et l'un des trois qui se met à s'entraîner deux fois plus dur — ce qui est une réponse, mais pas une preuve."],
            effets:{xp:10}, suite:"choix2"},
          orso:{ texte:[
            "Orso a quarante-quatre ans et des mains qui ne se referment plus complètement. Il ne nie rien.",
            "« On m'a proposé, en une soirée, ce que je gagne en trois ans. » Il regarde ses mains. « Et on m'a dit que si je refusais, on prendrait le gamin qui me sert d'aide. Alors j'ai dit oui, et j'ai eu l'air d'un chien devant deux mille personnes. »",
            "« Vous voulez le nom ? Je vous le donne. Mais si vous y allez, allez-y en entier. À moitié, c'est moi qui paie. »"],
            effets:{xp:24, flag:"arene_orso_parle"}, suite:"choix2"},
          refus:{ fin:true, pnj:"baltus", texte:["Baltus referme ses registres un par un, lentement. « Dix-neuf ans », dit-il. « Vous savez ce qui me gêne le plus ? Que vous ayez raison. »"]},
          choix2:{ fin:true, texte:[
            "Il y a un entrepôt, un teneur de livre, et des gens qui achètent des hommes moins cher qu'ils ne les menacent.",
            "Reste à décider ce qu'on en fait."]},
        }}},

    { id:"entrepot", delai:[2,4], attente:"L'entrepôt trois ouvre à la nuit.",
      ev:{ id:"CAC_2", titre:"L'entrepôt trois", famille:"VILLE", rarete:"majeur",
        image:"evt_port_noir",
        scenes:{
          start:{ texte:[
            "L'entrepôt sent le poisson et la corde neuve. Ils sont neuf : un teneur de livre, deux courtiers, six hommes payés pour rester debout.",
            "Sur la table, un tableau à la craie. Les colonnes portent des noms de combattants ; les lignes, des dates ; les cases, des chiffres.",
            "Trois cases de la semaine prochaine sont déjà remplies."],
            choix:[
              {label:"Entrer par la porte", detail:"Neuf hommes, une porte, et pas de plan",
               suite:"assaut"},
              {label:"Prendre le tableau et partir", detail:"Jet de Précision (14) · la craie vaut plus que les corps",
               test:{stat:"precision", dc:14}, reussite:"tableau_ok", echec:"assaut"},
              {label:"Proposer d'en être", detail:"Jet de Volonté (14) · un tableau à la craie se partage",
               test:{stat:"vol", dc:14}, reussite:"part_ok", echec:"part_ko"},
            ]},
          assaut:{ texte:["Neuf hommes dans un entrepôt fermé, et de la corde neuve partout."],
            combat:{ groupe:[{bst:"BST_061", n:2}, {bst:"BST_042", n:3}, {bst:"BST_044", n:1}],
                     victoire:"gagne", defaite:"perdu" }},
          gagne:{ fin:true, texte:[
            "Le teneur de livre survit parce qu'il se met à genoux avant même qu'on le lui demande, ce qui est une compétence.",
            "Il donne tout : les mises, les dates, les combattants tenus, et le nom du courtier de Port-Noir qui finance.",
            "Le tableau à la craie part avec Yohan. Trois cases de la semaine prochaine ne se rempliront pas."],
            effets:{xp:44, flag:"arene_tableau"}},
          perdu:{ fin:true, texte:[
            "Six hommes payés pour rester debout font très bien ce pour quoi ils sont payés.",
            "On ressort par la fenêtre du fond, avec une côte fêlée et sans le tableau. Le lendemain, l'entrepôt trois est vide, propre, et à louer."],
            effets:{xp:16, pv:-22, fat:16, flag:"arene_manque"}},
          tableau_ok:{ fin:true, texte:[
            "Une porte de service, un chien qu'on nourrit, et neuf hommes qui regardent le mauvais côté de la pièce pendant les quarante secondes nécessaires.",
            "Le tableau est en ardoise ; on ne l'emporte pas. On le recopie, ce qui est mieux : ils ne sauront pas qu'on l'a vu."],
            effets:{xp:40, flags:["arene_tableau","arene_discret"]}},
          part_ok:{ fin:true, texte:[
            "Le teneur de livre écoute la proposition sans lever les yeux de ses colonnes, puis fait une chose inattendue : il tend la craie.",
            "« Deux dixièmes. Vous nous dites ce que le tenancier prépare, nous vous disons sur qui miser. Personne ne meurt, tout le monde gagne, et l'Arène continue exactement comme avant. »",
            "C'est très raisonnable, et c'est pour ça que c'est laid."],
            effets:{xp:34, or:1200, flag:"arene_associe"}},
          part_ko:{ texte:[
            "Le teneur de livre écoute, puis lève enfin les yeux. « Non. »",
            "Il pose la craie. « Vous êtes venu voir le tableau, pas en être. » Six hommes se lèvent en même temps."],
            suite:"assaut"},
        }}},

    { id:"decision", delai:[1,3], attente:"Il faut décider ce qu'on rapporte à Baltus.",
      ev:{ id:"CAC_3", titre:"Ce qu'on rapporte au tenancier", famille:"VILLE", rarete:"majeur",
        image:"evt_taverne", pnj:"baltus",
        scenes:{
          start:{ pnj:"baltus", texte:[
            "Baltus attend dans son cagibi, avec ses dix-neuf saisons de registres et une bouteille qu'il n'a pas ouverte.",
            "« Alors ? »"],
            choix:[
              {label:"Tout lui donner", detail:"Les noms, les dates, le courtier — et son neveu",
               requis:{flag:"arene_tableau"}, suite:"tout",
               effets:{issue:"reseau_brise", renom:10, reputation:{humains:10},
                       flags:["arene_propre"]}},
              {label:"Lui donner le réseau, taire son neveu", detail:"Jet de Volonté (13) · un vieil homme, une famille",
               requis:{flag:"arene_neveu"},
               test:{stat:"vol", dc:13}, reussite:"neveu_ok", echec:"neveu_ko"},
              {label:"Lui dire qu'on n'a rien trouvé", detail:"Et garder la part qu'on vient de prendre",
               requis:{flag:"arene_associe"}, suite:"rien",
               effets:{issue:"part_prise", renom:-4, reputation:{humains:-6}}},
              {label:"Lui dire la vérité : ça continuera", detail:"Ce qui est probablement vrai",
               suite:"continue", effets:{issue:"laisse_courir", xp:20}},
            ]},
          tout:{ fin:true, texte:[
            "Il lit les onze noms. Il arrive au dernier et s'arrête très longtemps dessus.",
            "« C'est le fils de ma sœur. »",
            "« Oui. »",
            "Il referme le registre. Le lendemain, l'Arène Rouge a un teneur de livre de moins, deux courtiers interdits de quais, et un tenancier qui ne parle plus à sa sœur.",
            "Les combats redeviennent des combats. C'est ce qu'on demandait."]},
          neveu_ok:{ fin:true, pnj:"baltus", texte:[
            "On lui donne le réseau entier, le courtier, les dates — et on laisse une case blanche à la onzième ligne.",
            "Baltus compte. Baltus compte toujours. Il voit la case blanche, la regarde, et ne pose pas la question.",
            "« Bien », dit-il seulement. Et il ferme le registre sur une chose qu'il a choisi de ne pas savoir, ce qui est une façon de vivre."],
            effets:{issue:"reseau_brise", renom:6, reputation:{humains:6}, xp:38,
                    flags:["arene_propre","arene_neveu_epargne"]}},
          neveu_ko:{ fin:true, pnj:"baltus", texte:[
            "On essaie de laisser la case blanche. Baltus la remplit tout seul, à voix haute, en levant les yeux :",
            "« Vous alliez me le cacher. » Il n'a pas l'air en colère. Il a l'air de quelqu'un à qui on vient de retirer la dernière chose.",
            "Le réseau tombe quand même. Le neveu aussi."],
            effets:{issue:"reseau_brise", renom:6, reputation:{humains:4}, xp:26,
                    flag:"arene_propre"}},
          rien:{ fin:true, pnj:"baltus", texte:[
            "« Rien. Des rumeurs, des coïncidences, deux combattants fatigués. »",
            "Baltus hoche la tête lentement, verse deux verres, et en pousse un vers Yohan.",
            "« Dix-neuf ans que je tiens cet endroit », dit-il. « Vous croyez que je ne sais pas reconnaître un homme qui vient de se faire acheter ? »",
            "Il boit quand même. Il n'y a plus rien à faire d'autre."]},
          continue:{ fin:true, pnj:"baltus", texte:[
            "« Ça continuera. Vous pouvez faire tomber ces neuf-là ; il y en aura neuf autres avant la fin de l'année. Une arène où l'on parie est une arène qu'on truque. »",
            "Baltus ouvre enfin sa bouteille.",
            "« Je sais », dit-il. « Je voulais juste que quelqu'un d'autre le dise à voix haute. »"]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   L'ARÈNE ROUGE — II. Ce qu'on doit à la fosse
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_ARENE_FOSSE", type:'contrat', titre:"Ce qu'on doit à la fosse",
  commanditaire:"Maison de Brézé", maison:"Maison de Brézé",
  or:1400, danger:"très dangereux", categorie:"sauvetage", prix:true,
  lieux:["LOC_017"],
  pitch:"Un fils de maison a gagné sa liberté dans la fosse il y a onze ans. Il n'est jamais sorti, et sa maison veut savoir pourquoi.",
  paye:["sorti","reste","mort_dans_la_fosse"],
  issues:{
    sorti:"Le fils de Brézé est sorti de la fosse, onze ans après y avoir gagné le droit d'en sortir.",
    reste:"Le fils de Brézé est resté dans la fosse, en connaissance de cause.",
    mort_dans_la_fosse:"Le fils de Brézé est mort dans la fosse, comme il l'avait probablement décidé.",
    abandonnee:"On n'a jamais su ce que le fils de Brézé faisait encore là.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"La maison de Brézé attend une réponse.",
      ev:{ id:"CAF_1", titre:"Onze ans", famille:"CONTRAT", rarete:"majeur",
        image:"evt_paria",
        scenes:{
          start:{ texte:[
            "Dame Constance de Brézé a soixante-huit ans, une main qui tremble et une voix qui ne tremble pas.",
            "« Mon fils s'appelait Aymeric. Il a été vendu à l'Arène à dix-neuf ans pour une dette que j'avais faite. Il a gagné son affranchissement au bout de quatre ans — c'est écrit, c'est enregistré, il est libre depuis sept ans. »",
            "Elle pose sur la table une liasse d'affranchissements refusés. Sept. Un par an.",
            "« Il ne sort pas. Il se réengage chaque année. Je veux savoir pourquoi, et je veux qu'il sorte. Dans cet ordre. »"],
            choix:[
              {label:"Accepter les deux, dans cet ordre", detail:"Savoir d'abord, décider ensuite",
               suite:"accepte", effets:{xp:14}},
              {label:"Prévenir : un homme libre qui reste a ses raisons", detail:"Jet de Volonté (12)",
               test:{stat:"vol", dc:12}, reussite:"prevenu_ok", echec:"prevenu_ko"},
              {label:"Refuser", detail:"On ne va pas chercher un adulte qui a choisi",
               suite:"refus", effets:{issue:"abandonnee"}},
            ]},
          accepte:{ fin:true, texte:["« Bien. » Elle range les sept refus un par un. « Ils sont datés. Vous verrez qu'ils sont tous du même jour de l'année. »"]},
          prevenu_ok:{ fin:true, texte:[
            "« Madame, s'il refuse depuis sept ans, il est possible qu'il ne veuille pas sortir. »",
            "Elle ne cille pas. « Je sais. J'ai eu sept ans pour y penser. » Un temps. « Alors ramenez-moi la raison. Si elle est bonne, je vivrai avec. Si elle est mauvaise, ramenez-moi mon fils. »",
            "C'est le contrat le plus honnête qu'on lui ait proposé depuis longtemps."],
            effets:{xp:22, flag:"breze_franchise"}},
          prevenu_ko:{ fin:true, texte:[
            "« Je n'ai pas demandé une opinion. »",
            "Elle referme la liasse. Le ton est celui d'une femme qui a enterré un mari, une fille et une fortune, et qui n'a plus le temps d'être contredite."],
            effets:{xp:10}},
          refus:{ fin:true, texte:["Elle accueille le refus sans un mot, ce qui est pire que de la colère. Elle a l'habitude qu'on lui dise non ; c'est ce qui l'a menée là."]},
        }}},

    { id:"fosse", delai:[3,6], attente:"Aymeric combat le troisième jour de la semaine.",
      ev:{ id:"CAF_2", titre:"Le troisième jour de la semaine", famille:"VILLE", rarete:"majeur",
        image:"evt_taverne",
        scenes:{
          start:{ texte:[
            "Aymeric de Brézé a trente-quatre ans, deux doigts en moins à la main gauche, et il gagne encore.",
            "Après le combat, il ne va pas boire. Il descend au niveau bas, celui des cages, et il y passe deux heures — tous les troisièmes jours, disent les gardiens, depuis sept ans.",
            "Au niveau bas, il y a les bêtes, les condamnés, et quatorze enfants achetés aux quais pour servir d'aides."],
            choix:[
              {label:"Le suivre en bas", detail:"Jet de Précision (13)",
               test:{stat:"precision", dc:13}, reussite:"bas_ok", echec:"bas_ko"},
              {label:"L'attendre et lui parler franchement", detail:"Jet de Volonté (14)",
               test:{stat:"vol", dc:14}, reussite:"parle_ok", echec:"parle_ko"},
              {label:"Payer un gardien", detail:"−250 or · les gardiens du niveau bas sont mal payés",
               requis:{or:250}, suite:"gardien", effets:{or:-250}},
            ]},
          bas_ok:{ fin:true, texte:[
            "Il ne fait rien de remarquable. Il vérifie les rations des quatorze, il recoud une manche, il apprend à un gamin de onze ans comment tomber sans se casser le poignet.",
            "Puis il s'assoit contre une grille et reste là jusqu'à ce qu'on vienne fermer.",
            "Le gardien murmure, sans qu'on lui demande rien : « Tant qu'il combat, le tenancier n'a pas besoin d'en envoyer un des petits. C'est le marché. Il l'a fait tout seul, il y a sept ans, et il ne l'a jamais dit à personne. »"],
            effets:{xp:36, flags:["breze_raison","breze_quatorze"]}},
          bas_ko:{ fin:true, texte:[
            "Le niveau bas est fermé aux étrangers et les gardiens ne s'achètent pas ce soir-là.",
            "On apprend seulement qu'il y descend, qu'il y reste deux heures, et que personne ne trouve ça bizarre — ce qui est en soi une information."],
            effets:{xp:14}},
          parle_ok:{ fin:true, texte:[
            "Il écoute la question jusqu'au bout, s'essuie les mains, et répond sans détour parce qu'il n'a plus l'âge des détours.",
            "« Ma mère veut savoir pourquoi je ne sors pas. Dites-lui qu'il y a quatorze gamins au niveau bas et que le tenancier prend un combattant dans le lot chaque fois qu'il en manque un en haut. »",
            "« Tant que je gagne, il n'en manque pas. »",
            "Il ramasse son casque. « Vous pouvez lui dire aussi que ce n'est pas de l'héroïsme. Je ne sais rien faire d'autre, et dehors je n'ai personne. Les deux sont vrais en même temps. »"],
            effets:{xp:40, flags:["breze_raison","breze_quatorze","breze_a_parle"]}},
          parle_ko:{ fin:true, texte:[
            "« Vous êtes payé par ma mère. »",
            "Ce n'est pas une question. Il ne s'énerve pas, il ne menace pas : il s'en va, et il y a dans cette façon de partir sept ans d'entraînement à ne pas discuter."],
            effets:{xp:12, flag:"breze_ferme"}},
          gardien:{ fin:true, texte:[
            "Deux cent cinquante écus achètent un gardien du niveau bas pour une soirée entière, ce qui en dit long sur ce qu'on les paie.",
            "« Les quatorze petits ? Ils servent d'aides. Et quand il manque un homme en haut, on en prend un dans le lot. Sauf que depuis sept ans il n'en manque jamais, parce que Brézé se réengage. »",
            "Il crache. « Tout le monde le sait ici. Personne ne le dit à sa mère : elle paierait pour le sortir, et alors ils prendraient un des petits dès le mois suivant. »"],
            effets:{xp:32, flags:["breze_raison","breze_quatorze"]}},
        }}},

    { id:"decision", delai:[2,4], attente:"Il faut trancher, et personne d'autre ne le fera.",
      ev:{ id:"CAF_3", titre:"Quatorze, ou un", famille:"CONTRAT", rarete:"majeur",
        image:"evt_enfant",
        scenes:{
          start:{ texte:[
            "Le marché tient parce que personne ne l'a écrit. Il suffirait de l'écrire pour qu'il tombe — ou pour que quatorze enfants prennent la place d'un homme de trente-quatre ans.",
            "Dame Constance attend une réponse. Le tenancier ne sait pas encore qu'on sait."],
            choix:[
              {label:"Racheter les quatorze", detail:"−2200 or · c'est la seule solution qui n'oblige personne",
               requis:{or:2200}, suite:"rachete", effets:{or:-2200}},
              {label:"Forcer le tenancier à s'engager par écrit", detail:"Jet de Volonté (16) · devant témoins, avec la maison de Brézé derrière",
               requis:{flag:"breze_raison"},
               test:{stat:"vol", dc:16}, reussite:"ecrit_ok", echec:"ecrit_ko"},
              {label:"Le sortir de force et laisser le reste", detail:"C'est ce que la maison a payé, mot pour mot",
               suite:"force"},
              {label:"Rapporter la raison, et rien de plus", detail:"Elle a dit qu'elle vivrait avec, si elle était bonne",
               requis:{flag:"breze_franchise"}, suite:"rapporte",
               effets:{issue:"reste", renom:4, reputation:{humains:6}}},
            ]},
          rachete:{ fin:true, texte:[
            "Deux mille deux cents écus pour quatorze contrats d'aide, rachetés un par un devant notaire parce qu'un lot se conteste et qu'un contrat individuel ne se conteste pas.",
            "Le tenancier signe en souriant : il fait une excellente affaire et il le sait.",
            "Aymeric de Brézé apprend la chose le troisième jour de la semaine suivante, au niveau bas, devant des cages vides. Il met un temps considérable à comprendre.",
            "Il sort de l'Arène onze jours plus tard, à pied, sans rien dire à personne. Sa mère l'attendait sur la route depuis le matin."],
            effets:{xp:60, issue:"sorti", renom:12, reputation:{humains:14, parias:10},
                    flags:["arene_quatorze_libres","breze_sorti"]}},
          ecrit_ok:{ fin:true, texte:[
            "Il faut la maison de Brézé, deux notaires, le prévôt des jeux et deux cents personnes dans les gradins pour qu'un tenancier d'arène signe quoi que ce soit.",
            "L'acte tient en une phrase : aucun aide de moins de seize ans ne descendra dans la fosse de l'Arène Rouge, sous peine de la fermeture des jeux.",
            "Aymeric lit l'acte trois fois. Puis il regarde Yohan avec une expression qu'on ne lui avait pas vue en onze ans.",
            "« Alors je peux partir. »",
            "Il ne part pas tout de suite. Il reste encore une saison, pour former celui qui gagne après lui. Mais il part."],
            effets:{xp:64, issue:"sorti", renom:14, reputation:{humains:16, parias:8},
                    flags:["arene_acte_signe","breze_sorti"]}},
          ecrit_ko:{ texte:[
            "Le tenancier écoute, sourit, et ne signe rien. « Vous n'avez pas de preuve, vous n'avez pas de témoin, et vous avez une vieille dame. »",
            "Il a raison sur les trois points."],
            suite:"force"},
          force:{ texte:[
            "On le sort de force. Il se défend, parce qu'il se défend toujours, et il y a deux gardes de fosse derrière lui qui n'ont pas envie d'expliquer une évasion."],
            combat:{ groupe:[{bst:"BST_061", n:1}, {bst:"BST_045", n:2}],
                     victoire:"force_ok", defaite:"force_ko" }},
          force_ok:{ fin:true, texte:[
            "Il est dehors. Il est vivant. Il ne dit pas un mot pendant les quatre jours du voyage.",
            "Dame Constance retrouve son fils, et son fils regarde par la fenêtre.",
            "Six semaines plus tard, une lettre arrive de l'Arène Rouge : deux aides du niveau bas sont descendus dans la fosse le mois dernier. L'un des deux avait douze ans.",
            "Aymeric lit la lettre. Il la repose. Il ne retournera pas là-bas et il ne se le pardonnera pas."],
            effets:{xp:44, issue:"sorti", renom:6, reputation:{humains:6},
                    flags:["breze_sorti","arene_deux_petits"]}},
          force_ko:{ fin:true, texte:[
            "Deux gardes de fosse et un homme qui se bat depuis quinze ans : le compte était mauvais dès le départ.",
            "Aymeric de Brézé meurt trois semaines plus tard, dans un combat qu'il n'aurait pas dû perdre, à un moment où il n'aurait pas dû baisser sa garde.",
            "Les quatorze du niveau bas restent quatorze. Pour cette année."],
            effets:{xp:20, pv:-26, issue:"mort_dans_la_fosse", renom:-8, reputation:{humains:-10}}},
          rapporte:{ fin:true, texte:[
            "On rapporte la raison, entière, sans l'arranger : quatorze enfants, un marché qu'il a fait tout seul, et un homme qui ne sait rien faire d'autre.",
            "Dame Constance écoute jusqu'au bout. Puis elle reste très longtemps sans rien dire.",
            "« Il a fait ça pendant sept ans et je pensais qu'il m'en voulait. »",
            "Elle paie le contrat en entier. Elle ne redemandera jamais qu'on aille le chercher, et elle fera verser, chaque année, de quoi nourrir correctement quatorze enfants au niveau bas d'une arène."]},
        }}},
  ]},


/* ══════════════════════════════════════════════════════════════════════════
   LA CÔTE DES DENTS — I. Les lanternes de la baie
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_COTE_LANTERNES", type:'contrat', titre:"Les lanternes de la baie",
  commanditaire:"Maison de Clairmont", maison:"Maison de Clairmont",
  or:1300, danger:"dangereux", categorie:"traque", prix:true,
  lieux:["LOC_019","LOC_016"],
  pitch:"Quatre navires perdus en un an sur des récifs cartographiés depuis deux siècles. Les capitaines qui survivent parlent tous d'une lanterne au mauvais endroit.",
  paye:["hameau_brise","hameau_racheté","fanal_bati"],
  issues:{
    hameau_brise:"Les naufrageurs de la Côte des Dents ont été livrés, et le hameau avec eux.",
    hameau_racheté:"Le hameau de la Côte des Dents a cessé d'allumer, parce qu'on lui a donné autre chose à faire.",
    fanal_bati:"Un vrai fanal brûle sur la pointe des Dents. On n'y perd plus de navires.",
    abandonnee:"On perd toujours des navires sur la Côte des Dents.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"L'armateur de Clairmont compte ses pertes.",
      ev:{ id:"CCL_1", titre:"Quatre navires", famille:"CONTRAT", rarete:"majeur",
        image:"evt_phare",
        scenes:{
          start:{ texte:[
            "Le comptoir de Clairmont à Port-Noir tient dans deux pièces qui sentent le goudron. L'armateur a étalé quatre livres de bord et une carte marine que son grand-père a fait tracer.",
            "« Les Dents sont sur cette carte depuis deux cent onze ans. Aucun capitaine des Clairmont ne s'y est perdu en deux cent onze ans. Quatre en un an. »",
            "Il tourne la carte vers Yohan. « Les trois survivants disent la même chose : ils ont vu le fanal de la pointe. Il n'y a pas de fanal sur la pointe. »"],
            choix:[
              {label:"Demander ce que devient la cargaison", detail:"Une lanterne coûte moins cher qu'un navire, et rapporte plus",
               suite:"cargaison"},
              {label:"Lire les livres de bord", detail:"Jet de Précision (12) · l'heure et la marée disent tout",
               test:{stat:"precision", dc:12}, reussite:"bord_ok", echec:"bord_ko"},
              {label:"Demander ce qu'il compte faire du hameau", detail:"Jet de Volonté (13) · il a déjà une idée, et elle est laide",
               test:{stat:"vol", dc:13}, reussite:"hameau_ok", echec:"hameau_ko"},
            ]},
          cargaison:{ fin:true, texte:[
            "« Elle disparaît. Pas toute : ce qui flotte, ce qui se porte, ce qui se revend sans registre. »",
            "Il referme le premier livre. « Ce qui reste, on le retrouve sur les plages, et les gens de la côte ont parfaitement le droit de le ramasser. C'est la coutume, elle a huit cents ans, et elle a été écrite pour les naufrages, pas pour ce qu'on fabrique. »"],
            effets:{xp:20, flag:"cote_coutume"}},
          bord_ok:{ fin:true, texte:[
            "Les quatre naufrages ont eu lieu à marée montante, entre la neuvième et la onzième heure, et toujours par temps couvert — jamais par nuit claire.",
            "Ce n'est pas une bête, ce n'est pas un courant, et ce n'est pas de la malchance. C'est un horaire.",
            "Quelqu'un attend la bonne marée et le bon ciel, allume, et attend."],
            effets:{xp:26, flag:"cote_horaire"}},
          bord_ko:{ fin:true, texte:["Quatre livres de bord, quatre écritures différentes, et des relevés d'heure faits par des gens qui coulaient. On n'en tire rien de sûr."],
            effets:{xp:8}},
          hameau_ok:{ fin:true, texte:[
            "Il ne se dérobe pas. C'est ce qui rend la conversation désagréable.",
            "« Le hameau de la pointe compte quarante et un habitants. S'il s'avère qu'ils allument, je demanderai au prévôt la corde pour les hommes et l'exil pour le reste, et je l'obtiendrai. »",
            "Un temps. « Je ne dis pas que ça me plaît. Je dis que quatre navires, ça fait quatre-vingts hommes noyés, et que quelqu'un doit payer une note pareille. »"],
            effets:{xp:24, flag:"cote_clairmont_dur"}},
          hameau_ko:{ fin:true, texte:["« Ce que je ferai du hameau me regarde. Trouvez d'abord s'il y a un hameau à regarder. »"],
            effets:{xp:8}},
        }}},

    { id:"pointe", delai:[3,6], attente:"Il faut une nuit couverte et une marée montante.",
      ev:{ id:"CCL_2", titre:"La nuit où ils allument", famille:"VOYAGE", rarete:"majeur",
        image:"evt_phare",
        scenes:{
          start:{ texte:[
            "Le hameau de la pointe compte quarante et un habitants, onze maisons, pas de port, pas de terre arable, et un banc d'huîtres que la maison de Clairmont a fait fermer il y a trois ans pour cause de contentieux de bornes.",
            "Depuis trois ans, ils vivent de ce que la mer rend.",
            "À la neuvième heure, deux hommes montent sur la pointe avec une lanterne à réflecteur. Il y a une voile au large."],
            choix:[
              {label:"Éteindre la lanterne", detail:"Le navire passe · les deux hommes sauront qui",
               suite:"eteint"},
              {label:"Les prendre sur le fait", detail:"Deux hommes, une lanterne, et un témoin",
               suite:"prend"},
              {label:"Allumer un second feu, plus loin, au bon endroit", detail:"Jet de Précision (14) · deux fanaux valent mieux qu'aucun",
               test:{stat:"precision", dc:14}, reussite:"second_ok", echec:"second_ko"},
              {label:"Ne rien faire cette nuit et regarder", detail:"On saura qui vient ramasser",
               suite:"regarde"},
            ]},
          eteint:{ fin:true, texte:[
            "On monte, on renverse la lanterne, et on la tient au sol pendant que l'huile brûle sur la pierre.",
            "Les deux hommes ne se battent pas. L'un d'eux, un vieux, dit seulement : « Vous savez ce que vous venez de faire ? »",
            "La voile passe au large et disparaît. Au hameau, on ne mangera pas cette semaine, et tout le monde le sait avant même que la lanterne soit froide."],
            effets:{xp:30, flags:["cote_vu","cote_hameau_affame"]}},
          prend:{ fin:true, texte:[
            "Les deux hommes se laissent prendre sans un geste. Le plus jeune a dix-sept ans. Le vieux en a soixante et des mains de pêcheur qui n'ont plus pêché depuis trois ans.",
            "« Vous nous livrez à Clairmont, ils nous pendent. » Ce n'est pas une plaidoirie : c'est un renseignement.",
            "« Le banc d'huîtres est à nous depuis huit générations. Ils l'ont fermé pour un contentieux de bornes qu'ils gagneront dans quatre ans. On a mangé quoi pendant quatre ans, à votre avis ? »"],
            effets:{xp:34, flags:["cote_vu","cote_deux_pris","cote_huitres"]}},
          second_ok:{ fin:true, texte:[
            "Trois cents pas plus au nord, à l'endroit exact où un vrai fanal devrait être, un feu de bois et une tôle de bateau font un second point lumineux.",
            "Le capitaine du navire voit deux feux là où sa carte n'en annonce aucun, fait ce que fait un capitaine prudent, et met à la cape jusqu'au jour.",
            "Il ne se perd pas. Les deux hommes sur la pointe regardent le second feu pendant très longtemps sans rien dire."],
            effets:{xp:38, flags:["cote_vu","cote_second_feu"]}},
          second_ko:{ texte:[
            "Le bois est mouillé, le vent tourne, et le second feu ne prend pas à temps.",
            "Le navire donne dans les Dents à la onzième heure. On l'entend avant de le voir."],
            suite:"naufrage"},
          regarde:{ texte:[
            "Le navire donne dans les Dents à la onzième heure. Il coule en vingt minutes, ce qui est long.",
            "Puis le hameau descend sur la plage, tout entier, y compris les enfants, avec des paniers."],
            suite:"naufrage"},
          naufrage:{ fin:true, texte:[
            "Ils ne tuent personne. C'est la première chose qu'on remarque, et elle compte.",
            "Ils repêchent d'abord les hommes — onze survivants, réchauffés, nourris, couchés dans les onze maisons — et ils ramassent la cargaison ensuite.",
            "Un vieux vérifie que chaque naufragé respire avant de toucher une seule caisse. Il fait ça avec la méthode de quelqu'un qui l'a fait souvent.",
            "Ce ne sont pas des assassins. Ce sont des gens qui ont faim et qui ont trouvé une coutume vieille de huit cents ans."],
            effets:{xp:26, flags:["cote_vu","cote_pas_de_morts","cote_huitres"]}},
        }}},

    { id:"decision", delai:[2,5], attente:"Clairmont attend un nom.",
      ev:{ id:"CCL_3", titre:"Ce qu'on rapporte à l'armateur", famille:"CONTRAT", rarete:"majeur",
        image:"evt_epave",
        scenes:{
          start:{ texte:[
            "Quarante et un habitants, un banc d'huîtres fermé pour trois ans encore, une coutume de huit cents ans, et quatre-vingts noyés qui ne reviendront pas.",
            "Les deux comptes sont vrais en même temps, et l'armateur attend un nom."],
            choix:[
              {label:"Les livrer", detail:"C'est ce qui a été payé, et quatre-vingts hommes sont morts",
               suite:"livre", effets:{issue:"hameau_brise", renom:6,
                                      reputation:{humains:10, parias:-10}}},
              {label:"Faire rouvrir le banc d'huîtres", detail:"Jet de Volonté (15) · un contentieux de bornes contre quatre navires par an",
               requis:{flag:"cote_huitres"},
               test:{stat:"vol", dc:15}, reussite:"huitres_ok", echec:"huitres_ko"},
              {label:"Payer un vrai fanal sur la pointe", detail:"−1800 or · et le hameau le tient, contre salaire",
               requis:{or:1800}, suite:"fanal", effets:{or:-1800}},
              {label:"Dire qu'on n'a rien trouvé", detail:"Les naufrages continueront",
               suite:"rien", effets:{issue:"abandonnee", reputation:{humains:-8}}},
            ]},
          livre:{ fin:true, texte:[
            "Le prévôt vient avec seize hommes. Trois pendaisons, la lanterne brûlée sur la place, et l'exil pour le reste — ordre exécuté en une matinée.",
            "Les quarante et un se dispersent sur la côte. On en retrouvera onze à Port-Noir dans l'année, et quatre au fond du port.",
            "Il n'y a plus de naufrages sur les Dents. C'est ce qu'on avait demandé, mot pour mot."]},
          huitres_ok:{ fin:true, texte:[
            "Il faut trois audiences, une carte de bornes de 1180, et la menace très polie d'aller expliquer au prévôt ce que quatre navires par an coûtent à la maison de Clairmont.",
            "L'armateur cède au troisième entretien, parce qu'il compte mieux qu'il ne déteste : le banc d'huîtres rapporte moins qu'un navire.",
            "Le banc rouvre au printemps. Les lanternes s'arrêtent la même semaine, sans qu'on ait eu besoin de le demander à quiconque.",
            "Le vieux de la pointe fait porter à Yohan, sans un mot, un panier d'huîtres. C'est tout ce qu'il a."],
            effets:{xp:56, issue:"hameau_racheté", renom:8,
                    reputation:{humains:6, parias:14},
                    flags:["cote_huitres_rouvertes","clairmont_cede"]}},
          huitres_ko:{ texte:[
            "L'armateur écoute trois fois et refuse trois fois. « Le contentieux suit son cours. Je ne vends pas ma bonne foi contre la paix. »",
            "Il faudra trouver autre chose, ou livrer le hameau."],
            suite:"fanal_ou_rien"},
          fanal:{ fin:true, texte:[
            "Mille huit cents écus pour une tour de pierre de vingt-deux pieds, une lanterne à réflecteur payée à Port-Noir, et six mois de gages.",
            "Le hameau le tient : deux hommes par nuit, à tour de rôle, contre salaire. Ce sont exactement les deux qui allumaient.",
            "Le vieux de la pointe passe la première nuit à comprendre que ce qu'il fait pour de l'argent est le contraire de ce qu'il faisait pour manger.",
            "Il n'y a plus de naufrages sur les Dents. Il n'y a pas eu de pendaison non plus."],
            effets:{xp:60, issue:"fanal_bati", renom:12,
                    reputation:{humains:12, parias:12},
                    flags:["cote_fanal","cote_route_cote"]}},
          fanal_ou_rien:{ fin:true, texte:[
            "Il reste un fanal à payer, ou un nom à donner. On ne décidera pas ce soir.",
            "Sur la pointe, la lanterne attend la prochaine nuit couverte."]},
          rien:{ fin:true, texte:[
            "« Rien. Des récifs, du mauvais temps, des capitaines fatigués. »",
            "L'armateur ne le croit pas une seconde et paie quand même la moitié, parce qu'un homme qui ment aussi mal a probablement une raison.",
            "Il perdra deux navires de plus dans les dix-huit mois. Le hameau mangera."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   LA CÔTE DES DENTS — II. La marée de quarante ans
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_COTE_MAREE", type:'contrat', titre:"La marée de quarante ans",
  commanditaire:"Le prieuré de la Côte", or:1600, danger:"très dangereux",
  categorie:"chasse",
  lieux:["LOC_019","LOC_013"],
  pitch:"Tous les quarante ans, la mer se retire plus loin qu'elle ne devrait sur la Côte des Dents. Ce qui reste sur le sable n'est pas mort.",
  paye:["referme","laisse_ouvert","emporte"],
  issues:{
    referme:"Ce qui remonte tous les quarante ans sur la Côte des Dents a été refermé, comme les fois d'avant.",
    laisse_ouvert:"On a laissé la basse mer suivre son cours sur la Côte des Dents.",
    emporte:"Quelque chose a été rapporté de la basse mer de la Côte des Dents.",
    abandonnee:"La marée de quarante ans est passée sans Yohan.",
  },
  etapes:[
    { id:"prieure", delai:[0,0], attente:"Le prieuré a onze jours d'avance sur la marée.",
      ev:{ id:"CCM_1", titre:"Ce que le prieuré tient à jour", famille:"VOYAGE", rarete:"majeur",
        image:"evt_chapelle",
        scenes:{
          start:{ texte:[
            "Le prieuré de la Côte tient trois registres : les baptêmes, les morts, et un troisième que le prieur sort d'un coffre à trois serrures.",
            "Il couvre six cent quarante ans et ne compte que seize entrées. La dernière date d'il y a trente-neuf ans et onze mois.",
            "« Tous les quarante ans, à trois mois près, la mer se retire d'une lieue sur la pointe. Elle découvre ce qu'il y a dessous. Nos prédécesseurs l'ont refermé seize fois. »",
            "Il pose le registre. « Je ne sais pas ce que ça veut dire, refermé. C'est le mot qu'ils emploient tous. »"],
            choix:[
              {label:"Lire les seize entrées", detail:"Jet de Précision (13) · six cents ans de gens qui ont eu le même problème",
               test:{stat:"precision", dc:13}, reussite:"seize_ok", echec:"seize_ko"},
              {label:"Demander ce qui arrive quand on ne referme pas", detail:"Il y a forcément une fois",
               suite:"pas_referme"},
              {label:"Demander qui d'autre sait", detail:"Un secret de six cents ans a des fuites",
               suite:"qui_sait"},
            ]},
          seize_ok:{ fin:true, texte:[
            "Les seize entrées disent la même chose de seize façons : on descend à basse mer, on trouve *la porte*, on la referme avec du sel, du plomb et une phrase, on remonte avant que la mer revienne.",
            "Quatre des seize ajoutent une note personnelle. La plus récente, il y a trente-neuf ans : *elle m'a parlé et elle connaissait le nom de ma mère.*",
            "Deux des seize n'ont pas d'écriture finale. Ce sont les deux fois où le prieur n'est pas remonté."],
            effets:{xp:30, sang:6, flags:["maree_seize","maree_parle"]}},
          seize_ko:{ fin:true, texte:["Six cent quarante ans d'écritures dans quatre langues dont deux sont mortes. On en tire une date, un lieu, et l'impression très nette que ces gens avaient peur."],
            effets:{xp:12, flag:"maree_seize"}},
          pas_referme:{ fin:true, texte:[
            "Le prieur cherche un moment, puis désigne la quatrième entrée en partant du haut.",
            "« Année 212. Le prieur d'alors a écrit qu'il ne descendrait pas, que c'était de la superstition, et qu'il l'écrivait pour qu'on s'en souvienne. »",
            "« On s'en souvient. Il y a eu, cette année-là, trois hameaux vidés sur onze lieues de côte. Ce n'est pas dans notre registre : c'est dans celui des morts. »"],
            effets:{xp:24, flag:"maree_212"}},
          qui_sait:{ fin:true, texte:[
            "« Nous. Et depuis quarante ans, un autre. »",
            "Il sort une lettre. Elle est signée d'un nom de Port-Noir, elle propose une somme considérable pour être présent à la prochaine basse mer, et elle est datée de onze ans.",
            "« Il en a envoyé une par an depuis. Elles montent. La dernière est arrivée le mois dernier. »"],
            effets:{xp:22, flag:"maree_acheteur"}},
        }}},

    { id:"basse_mer", delai:[6,11], attente:"La mer se retire dans quelques semaines.",
      ev:{ id:"CCM_2", titre:"Une lieue de sable", famille:"ONDE", rarete:"majeur",
        image:"evt_epave",
        scenes:{
          start:{ texte:[
            "La mer s'est retirée d'une lieue en une nuit, sans tempête et sans bruit. Le fond découvert n'est pas du sable : c'est un dallage.",
            "Il y a des épaves posées dessus, debout, dans l'ordre où elles ont coulé, la plus ancienne au fond. Et au bout du dallage, une ouverture rectangulaire dans la pierre, avec un escalier.",
            "On a environ neuf heures."],
            choix:[
              {label:"Descendre", detail:"Neuf heures, et six cents ans de gens qui l'ont fait avant",
               suite:"descend"},
              {label:"Fouiller les épaves d'abord", detail:"Jet de Précision (14) · elles sont dans l'ordre",
               test:{stat:"precision", dc:14}, reussite:"epaves_ok", echec:"epaves_ko"},
              {label:"Rester en haut et attendre la mer", detail:"On n'est pas obligé de descendre",
               suite:"attend", effets:{issue:"laisse_ouvert"}},
            ]},
          epaves_ok:{ texte:[
            "Onze épaves, la plus ancienne au fond, chacune plus proche de l'ouverture que la précédente. Elles n'ont pas coulé là : elles ont été rangées.",
            "Dans la plus récente — quarante ans, un caboteur de Port-Noir — on trouve un coffre de plomb scellé, un rouleau de corde neuve, et le squelette d'un homme assis, qui tient encore une clochette.",
            "Le coffre de plomb est ce que le seizième prieur n'a pas remonté."],
            effets:{xp:34, sang:8, flag:"maree_coffre"}, suite:"descend"},
          epaves_ko:{ texte:["Onze épaves posées debout, et trois heures de perdues à fouiller des cales pleines de vase. Il en reste six."],
            effets:{xp:12, fat:14}, suite:"descend"},
          descend:{ texte:[
            "L'escalier fait quatre-vingts marches et débouche dans une salle sèche, sous une lieue d'eau qui n'est plus là.",
            "Au centre, une dalle de plomb descellée. À côté, seize marques gravées dans la pierre — seize fois où quelqu'un est venu la resceller.",
            "Sous la dalle, quelque chose bouge et commence à parler. Elle connaît le nom de la mère de Yohan."],
            choix:[
              {label:"Resceller sans écouter", detail:"Jet de Volonté (16) · c'est ce que seize ont fait",
               test:{stat:"vol", dc:16}, reussite:"scelle_ok", echec:"scelle_ko"},
              {label:"L'écouter", detail:"Elle connaît des noms · quatorze prieurs l'ont écoutée et sont remontés",
               suite:"ecoute"},
              {label:"Descendre voir", detail:"Deux des seize ne sont pas remontés",
               suite:"voir"},
            ]},
          scelle_ok:{ fin:true, texte:[
            "Le sel, le plomb fondu, et la phrase — qui n'est pas une prière : c'est un acte notarié, récité, avec des noms et des dates.",
            "Ce qui est dessous se tait à la troisième ligne et ne dit plus rien du tout.",
            "On remonte avec deux heures d'avance. La mer revient à la nuit, exactement comme elle est revenue seize fois.",
            "Sur la pierre, il y a maintenant dix-sept marques."],
            effets:{xp:56, sang:10, issue:"referme", renom:4,
                    flags:["maree_scellee","maree_dix_sept"]}},
          scelle_ko:{ texte:[
            "Le plomb ne prend pas du premier coup, et pendant qu'il refroidit, elle parle.",
            "Elle parle de Karlsberg. Elle parle de la nuit de la porte basse. Elle donne trois détails que personne de vivant ne devrait connaître, et deux d'entre eux sont exacts."],
            suite:"ecoute"},
          ecoute:{ texte:[
            "Elle ne ment pas, ou pas de façon qu'on puisse attraper. Elle raconte la chute de Karlsberg comme quelqu'un qui y était, ce qui est impossible.",
            "Puis elle propose : la troisième chose, celle qu'elle n'a pas dite, contre la dalle laissée descellée jusqu'à la prochaine marée.",
            "Il reste quatre heures."],
            choix:[
              {label:"Resceller quand même", detail:"Quarante ans, c'est court",
               suite:"scelle_tard", effets:{issue:"referme", sang:8, xp:44,
                                            flags:["maree_scellee","maree_a_ecoute"]}},
              {label:"Prendre la troisième chose", detail:"Trois hameaux avaient été vidés, en 212",
               suite:"marche", effets:{issue:"laisse_ouvert", sang:16, suspicion:14, xp:50,
                                       flags:["maree_marche","maree_sait"]}},
              {label:"Remonter le coffre de plomb et resceller", detail:"Ce que le seizième n'a pas pu remonter",
               requis:{flag:"maree_coffre"}, suite:"coffre",
               effets:{issue:"emporte", sang:12, xp:52, flags:["maree_scellee","maree_coffre_remonte"]}},
            ]},
          voir:{ texte:[
            "On descend sous la dalle. C'est la chose la plus imprudente qu'on ait faite depuis longtemps, et deux des seize l'ont faite avant.",
            "Il y a une salle sous la salle, et il y a quelqu'un dedans qui n'a pas de raison d'être vivant."],
            combat:{ groupe:[{bst:"BST_072", n:1}, {bst:"BST_071", n:3}],
                     victoire:"voir_ok", defaite:"voir_ko", mortel:true }},
          voir_ok:{ fin:true, texte:[
            "Ce qui était là ne l'est plus. Ça a mis très longtemps à s'arrêter de parler.",
            "Dans la salle sous la salle, il y a seize dalles de plomb empilées contre un mur — seize, exactement — et deux corps en robe de prieuré, l'un très vieux, l'autre pas.",
            "On remonte avec une heure d'avance et sans rien dire au prieur de ce qu'il y avait sous sa dalle."],
            effets:{xp:64, sang:14, pv:-24, fat:22, issue:"referme",
                    flags:["maree_vidée","maree_deux_corps"]}},
          voir_ko:{ fin:true, texte:[
            "On remonte l'escalier bien plus vite qu'on ne l'a descendu, et la dalle reste descellée derrière.",
            "La mer revient à la nuit. Elle referme la salle, ce qui n'est pas la même chose que sceller la dalle.",
            "Onze lieues de côte n'auront pas un bon hiver, et il n'y aura pas de dix-septième marque sur la pierre."],
            effets:{xp:24, pv:-30, fat:24, issue:"laisse_ouvert",
                    reputation:{humains:-8}, flag:"maree_ouverte"}},
          scelle_tard:{ fin:true, texte:[
            "Le plomb prend à la deuxième coulée. Elle s'arrête au milieu d'une phrase, et le silence qui suit est pire que la voix.",
            "On remonte. Il y a dix-sept marques sur la pierre, et une chose qu'on ne saura jamais.",
            "Dans quarante ans, quelqu'un d'autre redescendra ces quatre-vingts marches, et elle recommencera par le nom de sa mère."]},
          marche:{ fin:true, texte:[
            "Elle dit la troisième chose. Elle est courte, elle est vérifiable, et elle change ce qu'on croyait savoir de la nuit où Karlsberg est tombée.",
            "Puis la mer revient, et la dalle reste descellée sous une lieue d'eau.",
            "Le prieur inscrira, à la dix-septième ligne de son registre, la seule chose qu'il puisse honnêtement écrire : *non refermée*.",
            "Onze lieues de côte apprendront ce que ça veut dire, et pas cette année."]},
          coffre:{ fin:true, texte:[
            "Le coffre de plomb du seizième prieur pèse ce que pèse le plomb. On le remonte à la corde, en trois heures, pendant que la dalle refroidit.",
            "Il contient un registre — le vrai, celui que le prieuré ne garde pas — où seize hommes ont écrit ce qu'ils ont réellement entendu sous la dalle.",
            "Six d'entre eux ont entendu parler de la Purge, quarante ans avant qu'elle ait lieu."]},
          attend:{ fin:true, texte:[
            "On reste en haut. La mer revient à la nuit, monte plus vite qu'elle n'est descendue, et referme la lieue de dallage comme si de rien n'était.",
            "Le prieur inscrit à la dix-septième ligne : *non refermée*. Il l'écrit d'une main ferme, parce qu'il a soixante-douze ans et qu'il ne verra pas la prochaine.",
            "On saura dans l'année ce que ça coûte."],
            effets:{xp:16, reputation:{humains:-6}, flag:"maree_ouverte"}},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   KARLSBERG — La borne de la vallée
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_KB_BORNE", type:'contrat', titre:"La borne de la vallée",
  commanditaire:"Le prévôt de la vallée du Loup", or:700, danger:"modéré",
  categorie:"escorte",
  lieux:["LOC_001"],
  pitch:"Une maison voisine a fait déplacer trois bornes de nuit. Sur le papier, la moitié de la vallée du Loup ne vous appartient plus.",
  paye:["bornes_rendues","proces_gagne","vallee_amputee"],
  issues:{
    bornes_rendues:"Les trois bornes de la vallée du Loup ont été remises où elles étaient.",
    proces_gagne:"La vallée du Loup a gagné son procès de bornes, ce qui vaut mieux qu'une victoire.",
    vallee_amputee:"La moitié basse de la vallée du Loup appartient désormais à quelqu'un d'autre.",
    abandonnee:"Le contentieux de bornes de la vallée du Loup dort dans un carton.",
  },
  etapes:[
    { id:"constat", delai:[0,0], attente:"Le prévôt veut un constat contradictoire.",
      ev:{ id:"CKB_1", titre:"Trois pierres de six cents livres", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_pierres",
        scenes:{
          start:{ texte:[
            "Le prévôt de la vallée a soixante ans, une mule, et le désintérêt magnifique d'un homme à onze mois de sa retraite.",
            "« Trois bornes. Six cents livres chacune. Déplacées de deux cent quarante pas vers le nord, sur une nuit sans lune, par des gens qui savaient exactement où les remettre. »",
            "Il crache. « La maison de Hauterive a déposé une revendication le lendemain matin. Le lendemain matin, messire. Ils avaient la requête écrite avant que les bornes soient froides. »"],
            choix:[
              {label:"Relever les traces", detail:"Jet de Précision (13) · six cents livres laissent une ornière",
               test:{stat:"precision", dc:13}, reussite:"traces_ok", echec:"traces_ko"},
              {label:"Demander qui a rédigé la requête", detail:"Jet de Volonté (12) · un acte, ça se signe",
               test:{stat:"vol", dc:12}, reussite:"acte_ok", echec:"acte_ko"},
              {label:"Aller remettre les bornes soi-même", detail:"Ce qui est illégal, mais rapide",
               suite:"remet"},
            ]},
          traces_ok:{ fin:true, texte:[
            "Une borne de six cents livres se déplace au treuil, sur rouleaux, et ça laisse deux ornières parallèles profondes de trois pouces sur quatre-vingts pas.",
            "Les ornières mènent au nord, puis obliquent vers l'est, puis s'arrêtent devant une grange de Hauterive où l'on a récemment lavé le sol.",
            "Le treuil est encore là, sous une bâche. Il porte la marque du charron de Hauterive, qui grave son nom sur tout ce qu'il fait parce qu'il en est fier."],
            effets:{xp:30, flags:["borne_treuil","borne_preuve"]}},
          traces_ko:{ fin:true, texte:["Il a plu quatre jours. Les ornières sont des rigoles, et les rigoles ne prouvent rien devant un juge."],
            effets:{xp:10}},
          acte_ok:{ fin:true, texte:[
            "La requête est déposée à la chancellerie de province, cotée, en règle — et rédigée d'une écriture de clerc qui a signé quatre-vingts actes pour Hauterive en trois ans.",
            "Elle porte la date du 14. Les bornes ont été déplacées dans la nuit du 13 au 14.",
            "Un acte de revendication demande onze jours de rédaction et deux visas. Celui-ci était prêt avant."],
            effets:{xp:28, flags:["borne_acte_date","borne_preuve"]}},
          acte_ko:{ fin:true, texte:["La chancellerie est fermée trois jours par semaine, le clerc de garde ne sait rien, et la requête est « au visa ». Elle y sera encore dans un mois."],
            effets:{xp:8}},
          remet:{ fin:true, texte:[
            "Six cents livres, un treuil emprunté, quatre hommes et une nuit entière. Les trois bornes retrouvent leurs trous d'origine, qui sont encore visibles, ce qui simplifie tout.",
            "Au matin, elles sont là où elles étaient depuis trois cents ans.",
            "Le surlendemain, Hauterive dépose une plainte pour déplacement illégal de bornes. Ils ont raison sur le fond de la procédure, et c'est très exactement le piège."],
            effets:{xp:24, flags:["borne_remise_nuit","borne_plainte"]}},
        }}},

    { id:"hauterive", delai:[3,7], attente:"Hauterive attend qu'on vienne.",
      ev:{ id:"CKB_2", titre:"Ce que veut Hauterive", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "Le seigneur de Hauterive reçoit debout, dans une salle où l'on a fait allumer trop de chandelles pour l'heure.",
            "« Nous ne contestons pas votre nom, messire. Nous contestons deux cent quarante pas de fond de vallée. C'est une affaire de bornes, pas une affaire d'honneur. »",
            "Il sourit. « Et une affaire de bornes se règle en dix ans devant un juge de province. Vous avez dix ans ? »",
            "Derrière lui, quatre hommes qui ne sont pas des serviteurs regardent Yohan sans le regarder."],
            choix:[
              {label:"Poser la preuve sur la table", detail:"Le treuil, ou la date de l'acte",
               requis:{flag:"borne_preuve"}, suite:"preuve",
               effets:{xp:36, flag:"borne_confondu"}},
              {label:"Lui demander ce qu'il y a dans ce fond de vallée", detail:"Jet de Précision (14) · deux cent quarante pas de rien ne valent pas ça",
               test:{stat:"precision", dc:14}, reussite:"fond_ok", echec:"fond_ko"},
              {label:"Lui proposer de partager", detail:"Jet de Volonté (14) · dix ans de procès coûtent plus que la moitié",
               test:{stat:"vol", dc:14}, reussite:"partage_ok", echec:"partage_ko"},
              {label:"Le menacer devant ses quatre hommes", detail:"Il a compté ses hommes · vous aussi",
               suite:"menace", effets:{renom:4, suspicion:8, reputation:{humains:-8}}},
            ]},
          preuve:{ fin:true, texte:[
            "Le treuil du charron, ou la date de l'acte : l'un ou l'autre suffit, et il n'a pas prévu qu'on les ait.",
            "Il regarde la pièce sur la table pendant un temps considérable, puis fait sortir ses quatre hommes d'un geste.",
            "« Bien », dit-il enfin, sans une once d'embarras. « Alors nous retirons la requête et vous ne portez pas plainte. C'est le seul arrangement où personne ne perd la face, et vous savez comme moi que c'est le seul qui tienne. »"],
            effets:{issue:"bornes_rendues", renom:6, reputation:{humains:8},
                    flags:["hauterive_recule","karlsberg_vallee_entiere"]}},
          fond_ok:{ fin:true, texte:[
            "Deux cent quarante pas de fond de vallée, humides, sans bois, sans pâture. Personne ne se bat pour ça.",
            "Sauf qu'ils contiennent le seul gué praticable en toute saison entre la vallée du Loup et la route de Chastel.",
            "Celui qui tient le gué tient l'accès de Karlsberg à l'ouest — et peut le fermer un jour de récolte, ou un jour de siège."],
            effets:{xp:34, flags:["borne_gue","karlsberg_gue_menace"]}},
          fond_ko:{ fin:true, texte:["Deux cent quarante pas de terrain humide, et un homme qui sourit. On n'apprend rien de plus ce jour-là."],
            effets:{xp:10}},
          partage_ok:{ fin:true, texte:[
            "« Cent vingt pas chacun, la borne médiane refaite aux frais des deux maisons, et l'accès du gué garanti par écrit dans les deux sens. »",
            "Il réfléchit longtemps. C'est moins que ce qu'il voulait, c'est plus que ce qu'un procès lui rapporterait, et il compte bien.",
            "« Fait. » Il tend la main, ce qui, chez ces gens-là, vaut un acte."],
            effets:{xp:44, issue:"proces_gagne", renom:4, reputation:{humains:10},
                    flags:["hauterive_partage","karlsberg_gue_partage"]}},
          partage_ko:{ fin:true, texte:[
            "« Partager ? » Il a l'air sincèrement amusé. « On partage entre égaux, messire. »",
            "Le mot reste dans la pièce longtemps après qu'il a cessé de sourire."],
            effets:{xp:12, flag:"hauterive_meprise"}},
          menace:{ fin:true, texte:[
            "Ça marche. C'est le problème : ça marche tout de suite, devant quatre témoins, et le seigneur de Hauterive retire sa requête en trois phrases.",
            "Il la redéposera dans dix-huit mois, avec un mémoire de quarante pages sur les manières d'un homme sans titre, et cette fois le juge de province lira."],
            effets:{xp:26, issue:"bornes_rendues",
                    flags:["hauterive_humilie","hauterive_reviendra"]}},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   LA COUR LUMINEUSE — Le serment mal traduit
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_ELTH_SERMENT", type:'contrat', titre:"Le serment mal traduit",
  commanditaire:"La chancellerie d'Eltharion", or:1500, danger:"modéré",
  categorie:"escorte",
  lieux:["LOC_006","LOC_010"],
  pitch:"Un traité de deux cents ans porte un mot qui n'a pas le même sens dans les deux langues. Trois hameaux humains vivent sur la différence.",
  paye:["traduit_juste","traduit_pour_eux","brule"],
  issues:{
    traduit_juste:"Le mot du traité d'Eltharion a été rétabli dans son sens exact, et trois hameaux ont déménagé.",
    traduit_pour_eux:"Le mot du traité d'Eltharion a été fixé dans le sens qui laisse trois hameaux debout.",
    brule:"Le traité d'Eltharion a brûlé, ce qui ne règle rien mais gagne une génération.",
    abandonnee:"Le mot du traité d'Eltharion attend toujours qu'on le tranche.",
  },
  etapes:[
    { id:"chancellerie", delai:[0,0], attente:"La chancellerie elfique attend un tiers.",
      ev:{ id:"CES_1", titre:"Un mot", famille:"ELFE", rarete:"majeur",
        image:"evt_archives",
        scenes:{
          start:{ texte:[
            "La chancellerie d'Eltharion tient dans une pièce ronde où il n'y a ni siège ni fenêtre. Le chancelier a quatre cents ans et l'air d'un homme qu'on dérange pour la première fois depuis longtemps.",
            "« Le traité de la Lisière, année 1141. Article neuf. Les humains peuvent *demeurer* sur les terres basses tant que dure la paix. »",
            "Il pose deux copies côte à côte. « En elfique, le mot signifie : passer la saison. En humain, il a été traduit par : habiter. »",
            "« Trois hameaux passent la saison chez nous depuis deux cent onze ans. Il y a quatre cents personnes et un cimetière. »"],
            choix:[
              {label:"Demander pourquoi maintenant", detail:"Deux cents ans, et la question tombe cette année",
               suite:"pourquoi"},
              {label:"Examiner les deux copies", detail:"Jet de Précision (14) · une traduction a un traducteur",
               test:{stat:"precision", dc:14}, reussite:"copies_ok", echec:"copies_ko"},
              {label:"Demander qui a intérêt à ce que ce soit tranché", detail:"Jet de Volonté (13)",
               test:{stat:"vol", dc:13}, reussite:"interet_ok", echec:"interet_ko"},
            ]},
          pourquoi:{ fin:true, texte:[
            "« Parce qu'un archiviste de vingt-deux ans a relu l'original le mois dernier. »",
            "Le chancelier a l'air de trouver ça aussi absurde que Yohan. « Il a fait son travail. Il l'a signalé, comme il devait. Et à l'instant où c'est signalé, cela existe. »",
            "« Nous ne pouvons plus ne pas savoir. C'est le problème des archives : elles ne se referment pas. »"],
            effets:{xp:22, flag:"serment_archiviste"}},
          copies_ok:{ fin:true, texte:[
            "La copie humaine n'est pas une traduction : c'est une recopie d'une traduction faite quatre-vingts ans après le traité, par un clerc humain, sur commande d'une maison humaine.",
            "Elle est de bonne foi. Le clerc a choisi *habiter* parce que le mot elfique n'a pas d'équivalent et qu'il fallait bien en mettre un.",
            "Mais l'original elfique porte, dans la marge, une annotation contemporaine du traité, d'une autre main : *ils resteront, et nous le savons en signant.*"],
            effets:{xp:36, sang:4, flags:["serment_marge","serment_de_bonne_foi"]}},
          copies_ko:{ fin:true, texte:["Deux copies, deux langues, quatre cents ans d'écart d'usage, et pas de dictionnaire pour une langue qui n'en a jamais voulu."],
            effets:{xp:12}},
          interet_ok:{ fin:true, texte:[
            "« La cour rivale, au sud. »",
            "Le chancelier le dit sans plaisir. « Si les terres basses redeviennent nôtres en droit, il faut les tenir en fait. Il faut y mettre des archers. Il faut les retirer d'ailleurs. »",
            "« Elle a fait acheter, l'an dernier, une copie du traité à un antiquaire de Port-Noir. Nous l'avons appris trop tard pour l'empêcher, et assez tôt pour comprendre pourquoi. »"],
            effets:{xp:32, flags:["serment_anarion","serment_piege"]}},
          interet_ko:{ fin:true, texte:["« Personne n'a intérêt à ce qu'un traité soit exact, messire. C'est bien pour ça que nous en sommes là. »"],
            effets:{xp:10}},
        }}},

    { id:"hameaux", delai:[3,6], attente:"Quatre cents personnes ne savent rien encore.",
      ev:{ id:"CES_2", titre:"Quatre cents personnes et un cimetière", famille:"VOYAGE", rarete:"majeur",
        image:"evt_chapelle",
        scenes:{
          start:{ texte:[
            "Les trois hameaux s'appellent Basse-Lisière, Le Gué et Sainte-Aube. Quatre cent onze personnes, cent trente feux, un moulin, et un cimetière de deux cent onze ans.",
            "Personne n'y sait lire l'elfique. Personne n'a jamais vu le traité. Ils savent seulement qu'ils sont là depuis toujours et qu'on ne les a jamais embêtés.",
            "Le doyen de Sainte-Aube a quatre-vingt-un ans. Il sort, sans qu'on le lui demande, un coffre où sont rangés deux cent onze ans de registres de baptême."],
            choix:[
              {label:"Leur dire la vérité tout de suite", detail:"Jet de Volonté (14) · quatre cents personnes et huit mois pour bouger",
               test:{stat:"vol", dc:14}, reussite:"vrai_ok", echec:"vrai_ko"},
              {label:"Chercher ce qui, chez eux, plaide leur cause", detail:"Jet de Précision (14) · un cimetière est un argument juridique",
               test:{stat:"precision", dc:14}, reussite:"plaide_ok", echec:"plaide_ko"},
              {label:"Ne rien leur dire pour l'instant", detail:"Une nouvelle pareille vide un hameau en une semaine",
               suite:"tait", effets:{xp:16}},
            ]},
          vrai_ok:{ fin:true, texte:[
            "Il faut trois réunions, une nuit entière, et la lecture à voix haute d'un article de traité devant cent trente chefs de feu qui n'ont jamais entendu parler du mot *demeurer*.",
            "Personne ne crie. C'est ce qui frappe le plus. Ils posent des questions pratiques : combien de temps, où, avec quoi.",
            "Le doyen de Sainte-Aube pose la seule qui compte : « Et le cimetière ? »"],
            effets:{xp:38, flags:["serment_dits","serment_cimetiere"]}},
          vrai_ko:{ fin:true, texte:[
            "La nouvelle sort mal, par un seul homme, un soir de marché, et fait ce que font ces nouvelles-là : elle devient en deux jours une expulsion imminente à la lance.",
            "Onze familles sont parties avant la fin de la semaine, en abandonnant la moisson sur pied."],
            effets:{xp:14, reputation:{humains:-6}, flag:"serment_panique"}},
          plaide_ok:{ fin:true, texte:[
            "Deux cent onze ans de baptêmes, de mariages et de morts, tenus par des prêtres humains sur une terre elfique, sans qu'une seule cour ait jamais protesté.",
            "En droit elfique, deux siècles d'usage non contesté valent titre — c'est un principe que leurs propres chancelleries invoquent tous les jours contre les cours rivales.",
            "Le cimetière n'est pas un argument sentimental : c'est deux cent onze ans de preuve écrite que la cour lumineuse savait, et n'a rien dit."],
            effets:{xp:42, sang:4, flags:["serment_usage","serment_cimetiere"]}},
          plaide_ko:{ fin:true, texte:["Des registres, un moulin, un cimetière. Rien de tout cela n'est un titre, et rien de tout cela ne se plaide dans une langue qu'on ne parle pas."],
            effets:{xp:12}},
          tait:{ fin:true, texte:[
            "On ne dit rien. On mange chez le doyen, on regarde le cimetière, et on repart avec une semaine de moins pour trouver autre chose.",
            "C'est peut-être un service. C'est peut-être une lâcheté. Les deux se ressemblent beaucoup vues d'ici."]},
        }}},

    { id:"tranche", delai:[3,6], attente:"La chancellerie veut une position.",
      ev:{ id:"CES_3", titre:"Ce qu'on écrit dans la marge", famille:"ELFE", rarete:"majeur",
        image:"evt_archives",
        scenes:{
          start:{ texte:[
            "Le chancelier attend. Il attend depuis quatre cents ans ; ça ne l'ennuie pas.",
            "« Vous êtes le tiers. Le traité prévoit qu'en cas de mot douteux, un tiers qui n'est d'aucune des deux parties propose le sens. Nous appliquerons ce que vous proposerez, et nous ne le rediscuterons pas. »",
            "C'est très généreux, et c'est exactement la façon dont une cour elfique se décharge d'une décision."],
            choix:[
              {label:"Proposer le sens exact : passer la saison", detail:"C'est ce que le mot veut dire · quatre cent onze personnes déménagent",
               suite:"exact", effets:{issue:"traduit_juste", renom:6,
                                      reputation:{elfes:14, humains:-14},
                                      flags:["serment_exact","lisiere_vidée"]}},
              {label:"Proposer le sens d'usage : habiter", detail:"Deux cent onze ans sans protestation valent titre",
               requis:{flag:"serment_usage"}, suite:"usage",
               effets:{issue:"traduit_pour_eux", renom:8,
                       reputation:{humains:16, elfes:-8},
                       flags:["serment_usage_retenu","lisiere_tenue"]}},
              {label:"Invoquer l'annotation de la marge", detail:"Jet de Volonté (15) · ils savaient en signant",
               requis:{flag:"serment_marge"},
               test:{stat:"vol", dc:15}, reussite:"marge_ok", echec:"marge_ko"},
              {label:"Faire disparaître l'original", detail:"Jet de Précision (16) · une chancellerie sans fenêtre a une seule porte",
               test:{stat:"precision", dc:16}, reussite:"brule_ok", echec:"brule_ko"},
            ]},
          exact:{ fin:true, texte:[
            "Le mot signifie passer la saison. On le dit, on l'écrit, on le signe.",
            "Les trois hameaux ont huit mois. Deux cent trente-huit personnes partent vers l'ouest, cent quarante vers le sud, trente-trois refusent de bouger et devront être portées.",
            "Le cimetière reste. C'est ce qu'on peut faire : la cour lumineuse s'engage par écrit à ne rien y bâtir, et les Elfes tiennent ce genre d'engagement pendant des siècles.",
            "Le doyen de Sainte-Aube meurt avant le déménagement, ce qui lui évite de le voir. On l'enterre chez lui."]},
          usage:{ fin:true, texte:[
            "Deux cent onze ans d'usage non contesté, plaidés dans le droit elfique lui-même, avec les registres de baptême posés sur la table de la chancellerie.",
            "Le chancelier examine l'argument pendant six jours — un délai qui, chez eux, marque le respect.",
            "« Le tiers a proposé. Nous appliquons. » Il fait porter à l'article neuf une note définitive : *habiter*.",
            "Trois hameaux ne le sauront jamais tout à fait. Ils continueront simplement à être là, comme depuis deux siècles."]},
          marge_ok:{ fin:true, texte:[
            "L'annotation de la marge est contemporaine du traité et d'une main de la cour : *ils resteront, et nous le savons en signant.*",
            "Yohan ne propose pas un sens. Il propose que la cour lumineuse lise ce que sa propre chancellerie a écrit le jour de la signature.",
            "Le silence dure très longtemps.",
            "« C'est de l'écriture de ma prédécesseur », dit enfin le chancelier. « De trois prédécesseurs avant moi. » Il referme le rouleau.",
            "« Le mot signifiait passer la saison. La cour, elle, savait qu'ils resteraient. Ce sont deux vérités et l'article n'en supporte qu'une. » Il fait porter la note : *habiter*.",
            "Puis il ajoute, pour lui-même : « Nous ne nous en sortons pas bien. »"],
            effets:{issue:"traduit_pour_eux", renom:12, sang:6,
                    reputation:{humains:16, elfes:6, parias:6},
                    flags:["serment_marge_lue","lisiere_tenue","eltharion_honnete"]}},
          marge_ko:{ texte:[
            "L'annotation est là, elle est authentique, et le chancelier refuse d'y voir autre chose qu'une note de travail.",
            "« Une marge n'engage pas. Si elle engageait, aucun traité ne tiendrait. » Il a raison en droit, et il le sait."],
            suite:"reprise"},
          reprise:{ fin:true, texte:[
            "Il reste le sens exact, l'usage, ou rien. La chancellerie attendra encore un mois, ce qui pour elle est une marque d'impatience considérable."],
            effets:{xp:18}},
          brule_ok:{ fin:true, texte:[
            "Une chancellerie sans fenêtre a une seule porte, et une seule porte se surveille très mal quand on est le tiers invité.",
            "L'original du traité de la Lisière brûle dans une lampe à huile, avec la copie de contrôle et l'annotation de la marge.",
            "L'archiviste de vingt-deux ans est renvoyé pour négligence. Il n'a rien fait.",
            "Sans original, l'article neuf reste ce que l'usage en a fait, et il faudra une génération avant qu'une cour ose rouvrir la question. Une génération, c'est tout ce qu'on pouvait acheter."],
            effets:{issue:"brule", renom:4, suspicion:12, sang:4,
                    reputation:{humains:10, elfes:-12},
                    flags:["serment_brule","lisiere_tenue"]}},
          brule_ko:{ fin:true, texte:[
            "Il y a une raison pour laquelle cette pièce n'a pas de fenêtre, et Yohan l'apprend à mi-chemin de la table.",
            "On ne le tue pas. On le raccompagne, avec une courtoisie parfaite, jusqu'à la limite des terres hautes, et la cour lumineuse propose elle-même le sens exact du mot.",
            "Trois hameaux ont huit mois."],
            effets:{issue:"traduit_juste", renom:-6, suspicion:10,
                    reputation:{elfes:-16, humains:-6},
                    flags:["serment_exact","lisiere_vidée"]}},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   LA CICATRICE — Ce qui pousse dedans
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_CICATRICE_POUSSE", type:'contrat', titre:"Ce qui pousse dans la Cicatrice",
  commanditaire:"Le conseil des trois villages de bordure", or:1200, danger:"très dangereux",
  categorie:"exploration",
  lieux:["LOC_014","LOC_018"],
  pitch:"La Cicatrice a grandi de deux cents pas cette année. Elle en gagnait dix par an depuis quarante ans.",
  paye:["ralentie","cause_trouvee","laissee"],
  issues:{
    ralentie:"La croissance de la Cicatrice a été ralentie, et personne ne sait pour combien de temps.",
    cause_trouvee:"On sait ce qui fait grandir la Cicatrice. Ce n'est pas une bonne nouvelle.",
    laissee:"La Cicatrice continue de grandir de deux cents pas par an.",
    abandonnee:"On n'est jamais entré dans la Cicatrice.",
  },
  etapes:[
    { id:"bordure", delai:[0,0], attente:"Les trois villages ont mis leur or en commun.",
      ev:{ id:"CCP_1", titre:"Deux cents pas", famille:"ONDE", rarete:"majeur",
        image:"evt_cicatrice",
        scenes:{
          start:{ texte:[
            "Les trois villages de bordure ont mis leur or en commun, ce qui fait douze cents écus et représente onze ans d'économies.",
            "« Dix pas par an depuis quarante ans, messire. On avait fait la paix avec dix pas. On plantait à cinquante pas de la ligne, on savait qu'on avait cinq ans. »",
            "La femme qui parle est meunière et tient les comptes des trois villages. Elle déroule une bande de toile où quarante ans de mesures sont cousues au fil rouge.",
            "« Cette année : deux cents. »"],
            choix:[
              {label:"Lire la bande de toile", detail:"Jet de Précision (13) · quarante ans de mesures valent une carte",
               test:{stat:"precision", dc:13}, reussite:"toile_ok", echec:"toile_ko"},
              {label:"Demander ce qui a changé cette année", detail:"Quelque chose a changé, forcément",
               suite:"change"},
              {label:"Demander ce qu'il y a dedans", detail:"Jet de Volonté (13) · quelqu'un y est entré",
               test:{stat:"vol", dc:13}, reussite:"dedans_ok", echec:"dedans_ko"},
            ]},
          toile_ok:{ fin:true, texte:[
            "Quarante ans de mesures cousues au fil rouge, une par saison, sur onze points de la ligne.",
            "La croissance n'est pas régulière : elle est nulle onze mois sur douze, et se fait d'un coup, toujours entre le solstice et la Saint-Aube.",
            "Et elle n'est pas uniforme : elle avance vers l'ouest, uniquement vers l'ouest, comme si elle allait quelque part."],
            effets:{xp:32, flags:["cicatrice_ouest","cicatrice_solstice"]}},
          toile_ko:{ fin:true, texte:["Quarante ans de fil rouge sur de la toile, cousus par quatre meunières successives, avec quatre façons de mesurer. On en tire une courbe et une migraine."],
            effets:{xp:10}},
          change:{ fin:true, texte:[
            "« Rien, messire. C'est bien ce qui nous fait peur. »",
            "Puis un vieux, au fond, dit une chose que personne ne relève : « Le puits de Sainte-Aube a tari en Nivôse. Il n'avait jamais tari. »",
            "Le puits de Sainte-Aube est à onze lieues à l'ouest de la Cicatrice, dans la direction exacte où elle avance."],
            effets:{xp:26, flags:["cicatrice_puits","cicatrice_ouest"]}},
          dedans_ok:{ fin:true, texte:[
            "« Mon frère. » La meunière ne baisse pas la voix. « Il y est entré il y a six ans pour ramener une chèvre. Il est ressorti au bout de deux jours. »",
            "« Il ne parle plus depuis. Il n'est pas fou : il travaille, il mange, il dort. Il ne parle plus, c'est tout. »",
            "« Et depuis six ans, chaque fois que la ligne bouge, il se lève dans la nuit et il marche vers l'ouest jusqu'à ce qu'on le rattrape. »"],
            effets:{xp:34, sang:4, flags:["cicatrice_frere","cicatrice_ouest"]}},
          dedans_ko:{ fin:true, texte:["Personne n'y entre. C'est la règle des trois villages depuis quarante ans, et c'est pour ça qu'ils sont encore trois."],
            effets:{xp:10}},
        }}},

    { id:"dedans", delai:[3,6], attente:"Il faut y entrer avant le solstice.",
      ev:{ id:"CCP_2", titre:"À l'intérieur", famille:"ONDE", rarete:"majeur",
        image:"evt_cicatrice",
        scenes:{
          start:{ texte:[
            "À l'intérieur de la Cicatrice, il n'y a pas de ruines : il y a de l'herbe, du silence, et une lumière qui vient d'en bas.",
            "Rien n'est mort. C'est ce qui met le plus longtemps à devenir insupportable : tout pousse, tout est vert, et rien ne bouge — pas un insecte, pas un oiseau, pas un souffle d'air.",
            "Au bout de quatre heures de marche vers le centre, on trouve la première des choses plantées."],
            choix:[
              {label:"Examiner ce qui est planté", detail:"Jet de Précision (15)",
               test:{stat:"precision", dc:15}, reussite:"plante_ok", echec:"plante_ko"},
              {label:"Aller jusqu'au centre", detail:"Encore six heures · l'Onde y est épaisse à respirer",
               suite:"centre", effets:{fat:22, sang:6}},
              {label:"Suivre la direction de l'ouest depuis l'intérieur", detail:"Jet de Volonté (14) · elle va quelque part",
               test:{stat:"vol", dc:14}, reussite:"ouest_ok", echec:"ouest_ko"},
              {label:"Ressortir tant qu'on sait encore par où", detail:"Deux jours suffisent à ne plus parler",
               suite:"sort", effets:{issue:"laissee", xp:16}},
            ]},
          plante_ok:{ texte:[
            "Ce sont des piquets. Des piquets d'arpenteur, en fer, plantés tous les cent pas sur une ligne parfaitement droite orientée à l'ouest.",
            "Les plus anciens sont rongés jusqu'à la moelle et datent d'avant la Purge. Les plus récents ont trois mois et portent une marque de forge : celle d'un atelier d'Astrah qui fournit les armées.",
            "Quelqu'un mesure la Cicatrice de l'intérieur depuis quarante ans. Quelqu'un, aussi, la guide."],
            effets:{xp:44, sang:8, flags:["cicatrice_piquets","cicatrice_astrah"]}, suite:"centre"},
          plante_ko:{ texte:["Du fer rouillé dans l'herbe, planté droit, à intervalles réguliers. Ce n'est pas naturel et on n'en tirera rien de plus aujourd'hui."],
            effets:{xp:14}, suite:"centre"},
          ouest_ok:{ texte:[
            "En marchant vers l'ouest à l'intérieur, on arrive au bord — et le bord n'est pas où il devrait être.",
            "Il y a, du côté ouest, une bande de deux cents pas où l'herbe est verte, silencieuse, et où le sol porte encore les traces d'une charrue de l'automne dernier.",
            "La Cicatrice n'a pas grandi cette année. Elle a été étendue."],
            effets:{xp:40, sang:8, flags:["cicatrice_etendue","cicatrice_ouest_su"]}, suite:"centre"},
          ouest_ko:{ texte:["On marche vers l'ouest quatre heures et on se retrouve à l'endroit d'où l'on est parti, ce qui devrait être impossible et qui ne l'est visiblement pas."],
            effets:{xp:12, fat:18}, suite:"centre"},
          centre:{ texte:[
            "Le centre de la Cicatrice est un cercle de terre nue de quarante pas, le seul endroit où rien ne pousse.",
            "Au milieu, il y a une dalle, et sur la dalle il y a trois hommes en robe grise qui relèvent des mesures.",
            "Ils lèvent la tête sans surprise, comme des gens qui attendaient de la visite depuis un moment."],
            choix:[
              {label:"Leur parler", detail:"Jet de Volonté (15)",
               test:{stat:"vol", dc:15}, reussite:"parle_ok", echec:"parle_ko"},
              {label:"Les prendre", detail:"Trois hommes en robe, au centre de la Cicatrice",
               suite:"combat"},
            ]},
          parle_ok:{ fin:true, texte:[
            "Ce ne sont pas des sorciers. Ce sont des arpenteurs — des vrais, avec des chaînes, des carnets et des gages.",
            "« Nous relevons la limite depuis quarante et un ans. Nous sommes la quatrième équipe. Nos gages viennent d'Astrah par un intermédiaire de Port-Noir. »",
            "« Ce qui s'est passé cette année ? Nous avons reçu l'ordre de déplacer les piquets de deux cents pas vers l'ouest. Nous les avons déplacés. La Cicatrice a suivi les piquets. »",
            "L'un d'eux ajoute, très bas : « Nous ne savions pas qu'elle suivrait. Nous le savons maintenant, et nous avons demandé à être relevés. On nous a répondu non. »"],
            effets:{xp:60, sang:12, issue:"cause_trouvee", suspicion:10,
                    reputation:{humains:6},
                    flags:["cicatrice_arpenteurs","cicatrice_astrah","cicatrice_suit_les_piquets"]}},
          parle_ko:{ texte:[
            "Ils répondent poliment, complètement, et pas une seule fois à la question posée. Au bout d'une heure, l'un d'eux consulte le ciel et dit : « Il faudrait que vous partiez. »",
            "Ce n'est pas une menace. C'est de la précision d'arpenteur."],
            suite:"combat"},
          combat:{ texte:["Trois hommes en robe grise, au centre d'un cercle où rien ne pousse, et quelque chose sous la dalle qui se réveille."],
            combat:{ groupe:[{bst:"BST_069", n:1}, {bst:"BST_071", n:4}],
                     victoire:"combat_ok", defaite:"combat_ko" }},
          combat_ok:{ fin:true, texte:[
            "Les trois arpenteurs meurent en essayant de ramasser leurs carnets, ce qui n'est pas ce qu'on attend de conspirateurs.",
            "Les carnets, eux, tiennent debout : quarante et un ans de relevés, quatre écritures, des gages payés depuis Astrah, et un ordre écrit du mois dernier — *déplacer la ligne de deux cents pas plein ouest.*",
            "Cette année, la Cicatrice a suivi. On arrache les piquets neufs et on les replante à leur ancienne place.",
            "Au printemps, la ligne a reculé de cent quatre-vingts pas. Personne ne sait dire pourquoi vingt manquent."],
            effets:{xp:64, sang:14, issue:"ralentie", renom:8, suspicion:8,
                    reputation:{humains:12},
                    flags:["cicatrice_piquets_rendus","cicatrice_astrah","cicatrice_reculee"]}},
          combat_ko:{ fin:true, texte:[
            "On ressort de la Cicatrice au bout de deux jours, du mauvais côté, à onze lieues de là où l'on est entré.",
            "On parle encore. C'est déjà ça.",
            "La ligne gagnera deux cents pas de plus l'année suivante, et les trois villages de bordure ne seront plus que deux."],
            effets:{xp:22, pv:-28, fat:26, sang:8, issue:"laissee",
                    reputation:{humains:-6}, flag:"cicatrice_echec"}},
          sort:{ fin:true, texte:[
            "On ressort par où l'on est entré, avant la fin du premier jour, et c'est probablement la décision la plus raisonnable de l'année.",
            "La meunière ne dit rien. Elle reprend son or, en laisse un tiers, et recoud un point de fil rouge sur la toile."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   LE CIMETIÈRE DES DRAGONS DE SABLE — L'os qui chante
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_CIM_OS", type:'contrat', titre:"L'os qui chante",
  commanditaire:"Aza fille de Khareth, des Dunes", or:1400, danger:"dangereux",
  categorie:"exploration",
  lieux:["LOC_015","LOC_005"],
  pitch:"Un os de dragon de sable vaut le prix d'un troupeau. Depuis un an, ceux qu'on rapporte du Cimetière rendent les gens sourds.",
  paye:["veine_fermee","os_rendus","commerce_tenu"],
  issues:{
    veine_fermee:"La veine qui rendait sourds les tailleurs d'os a été murée.",
    os_rendus:"Les os pris au Cimetière des Dragons de Sable ont été rapportés là où ils étaient.",
    commerce_tenu:"Le commerce d'os du Cimetière continue, avec des règles.",
    abandonnee:"On taille toujours l'os au Cimetière des Dragons de Sable.",
  },
  etapes:[
    { id:"dunes", delai:[0,0], attente:"Aza compte les sourds.",
      ev:{ id:"COS_1", titre:"Onze sourds", famille:"KHESH", rarete:"majeur",
        image:"evt_tambours",
        scenes:{
          start:{ texte:[
            "Aza fille de Khareth a vingt-neuf ans, la charge des puits de l'ouest, et un problème qu'aucune tribu ne veut nommer.",
            "« Onze tailleurs d'os sourds en un an. Pas malades : sourds. Ils entendaient la veille, ils n'entendent plus le lendemain, et ils disent tous la même chose. »",
            "Elle attend qu'on demande.",
            "« Que l'os chantait pendant qu'ils le taillaient. »"],
            choix:[
              {label:"Demander à voir un sourd", detail:"Onze hommes, et onze fois la même phrase",
               suite:"sourd"},
              {label:"Demander d'où viennent ces os-là", detail:"Jet de Précision (13) · un cimetière est grand",
               test:{stat:"precision", dc:13}, reussite:"veine_ok", echec:"veine_ko"},
              {label:"Demander ce que ça rapporte", detail:"Un os de dragon vaut un troupeau · c'est le vrai sujet",
               suite:"argent"},
            ]},
          sourd:{ fin:true, texte:[
            "Le plus jeune a dix-neuf ans. Il lit sur les lèvres depuis huit mois, ce qui est très rapide, et il écrit dans le sable pour répondre.",
            "*Ce n'était pas un bruit. C'était dans l'os, sous la lame. Ça montait. Quand ça s'est arrêté, j'ai su que c'était moi qui m'étais arrêté.*",
            "Il ajoute, sans qu'on le lui demande : *Je le retaillerais. C'était beau.*"],
            effets:{xp:26, flags:["os_sourds","os_chante"]}},
          veine_ok:{ fin:true, texte:[
            "Le Cimetière compte quatre-vingts carcasses sur onze lieues. Les tailleurs travaillent celles du bord, faciles d'accès, depuis six générations.",
            "Les onze sourds ont tous taillé dans la même carcasse — la vingt-troisième, dégagée l'an dernier par une tempête, et qui n'était pas là avant.",
            "Ce n'est pas un dragon de sable. Les proportions sont fausses, et il y a onze paires de côtes au lieu de neuf."],
            effets:{xp:34, sang:6, flags:["os_vingt_troisieme","os_pas_un_dragon"]}},
          veine_ko:{ fin:true, texte:["Quatre-vingts carcasses, six générations de tailleurs, et personne qui note d'où vient quoi. On taille où c'est commode."],
            effets:{xp:10}},
          argent:{ fin:true, texte:[
            "« Un os long vaut un troupeau de trente bêtes. Une plaque de crâne vaut le troupeau et le puits. »",
            "Aza ne s'en cache pas. « Trois tribus vivent de ça. Si je fais fermer le Cimetière, elles se retournent contre moi, et mon oncle perd trois bannières la même semaine. »",
            "« Je ne vous demande pas de fermer. Je vous demande de trouver ce qui rend sourd, et de me le dire avant que je doive décider. »"],
            effets:{xp:24, flag:"os_trois_tribus"}},
        }}},

    { id:"carcasse", delai:[3,6], attente:"La vingt-troisième carcasse attend.",
      ev:{ id:"COS_2", titre:"Onze paires de côtes", famille:"ONDE", rarete:"majeur",
        image:"evt_galerie",
        scenes:{
          start:{ texte:[
            "La vingt-troisième carcasse fait cent dix pas de long et n'est pas un dragon de sable. Elle n'est pas non plus un dragon.",
            "Le crâne est trop petit, la cage trop longue, et il y a, à l'intérieur de la cage, une seconde structure — plus petite, complète, recroquevillée, qui n'a pas été avalée : elle a été portée.",
            "Quand la lame d'un tailleur touche l'os, la seconde structure vibre. Elle vibre encore trois heures après."],
            choix:[
              {label:"Écouter, une fois, en connaissance de cause", detail:"Onze hommes sont sourds · Jet de Volonté (16)",
               test:{stat:"vol", dc:16}, reussite:"ecoute_ok", echec:"ecoute_ko"},
              {label:"Faire murer la carcasse", detail:"Du sable, des pierres, et l'accord de trois tribus",
               suite:"mure"},
              {label:"Faire rapporter tous les os déjà pris", detail:"Jet de Volonté (15) · un troupeau par os, et il y en a soixante",
               test:{stat:"vol", dc:15}, reussite:"rend_ok", echec:"rend_ko"},
              {label:"Établir une règle et laisser tailler ailleurs", detail:"Quatre-vingts carcasses · une seule pose problème",
               suite:"regle", effets:{issue:"commerce_tenu", xp:34,
                                      reputation:{khesh:8}, flag:"os_regle"}},
            ]},
          ecoute_ok:{ fin:true, texte:[
            "Ce n'est pas un son. C'est une chose qui se pose sur l'audition comme une main se pose sur une épaule, et qui reste.",
            "Ça dure quatre battements de cœur. Yohan entend encore après — mal pendant trois jours, puis normalement.",
            "Ce qu'il a compris pendant les quatre battements, il ne peut pas le formuler. Il sait seulement que la seconde structure était vivante quand la première est morte, qu'elle était vivante longtemps après, et qu'elle a mis très longtemps à cesser de l'être.",
            "Il fait murer la carcasse le lendemain, sans discussion et sans expliquer."],
            effets:{xp:56, sang:16, issue:"veine_fermee", suspicion:8,
                    reputation:{khesh:12},
                    flags:["os_ecoute","os_muree","os_ce_qui_etait_dedans"]}},
          ecoute_ko:{ fin:true, texte:[
            "Quatre battements de cœur, et le monde perd le haut de ses sons pendant onze jours.",
            "Onze jours à lire sur les lèvres, à ne pas entendre venir, à comprendre exactement ce que vivent les onze tailleurs.",
            "L'audition revient. On fait murer la carcasse le jour même, et personne ne demande pourquoi."],
            effets:{xp:34, sang:10, fat:20, issue:"veine_fermee", suspicion:6,
                    reputation:{khesh:10}, flags:["os_muree","os_sourd_onze_jours"]}},
          mure:{ fin:true, texte:[
            "Il faut l'accord de trois tribus, quatre jours de palabres aux puits, et la promesse formelle qu'aucune autre carcasse ne sera touchée.",
            "Puis quarante hommes, du sable, et onze jours de travail pour ensevelir cent dix pas d'os sous quatre pieds de dune.",
            "Aza fait planter une borne. Elle ne porte pas d'inscription : les gens des Dunes n'ont pas besoin qu'on leur écrive de ne pas creuser là."],
            effets:{xp:46, issue:"veine_fermee", reputation:{khesh:14},
                    flags:["os_muree"]}},
          rend_ok:{ fin:true, texte:[
            "Soixante-trois pièces d'os taillées dans la vingt-troisième carcasse, vendues en un an sur trois marchés et jusqu'à Port-Noir.",
            "Il faut quatre mois pour en retrouver cinquante et une, racheter vingt-neuf, en confisquer neuf, et convaincre treize propriétaires que ce qu'ils ont chez eux vaut mieux ailleurs.",
            "On les repose dans la cage, à leur place, avant de murer. Les onze sourds sont là, et ils regardent.",
            "Aucun ne recouvre l'audition. Mais ils voulaient être là."],
            effets:{xp:60, issue:"os_rendus", renom:6, reputation:{khesh:18},
                    flags:["os_rendus","os_muree"]}},
          rend_ko:{ texte:[
            "Trois tribus, soixante-trois pièces vendues, et un troupeau par pièce. On récupère onze os et une réputation d'homme qui coûte cher.",
            "Il faudra faire autrement."],
            suite:"mure"},
          regle:{ fin:true, texte:[
            "Quatre-vingts carcasses, une seule qui pose problème. On la mure, on la borne, et on établit la règle en trois articles devant les trois tribus :",
            "on ne taille pas ce qui a plus de neuf paires de côtes ; on ne taille pas seul ; et un tailleur qui entend chanter pose sa lame et sort.",
            "C'est peu. C'est plus que ce qu'ils avaient. Et le commerce continue, ce qui était le vrai enjeu pour tout le monde sauf pour les onze sourds."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   LA COUR D'ANARION — Le prisonnier de la troisième salle
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_ANARION_PRISON", type:'contrat', titre:"Le prisonnier de la troisième salle",
  commanditaire:"La cour d'Anarion", or:2000, danger:"très dangereux",
  categorie:"escorte",
  lieux:["LOC_007"],
  pitch:"Anarion propose un contrat en trois exemplaires : escorter un prisonnier de sa cour jusqu'à une frontière. Il ne dit pas qui, et le contrat est parfaitement rédigé.",
  paye:["livre","relache","garde"],
  issues:{
    livre:"Le prisonnier d'Anarion a été livré à la frontière, selon les termes exacts.",
    relache:"Le prisonnier d'Anarion n'est jamais arrivé à la frontière.",
    garde:"Le prisonnier d'Anarion a été gardé, et Anarion l'a appris.",
    abandonnee:"Le contrat en trois exemplaires n'a pas été signé.",
  },
  etapes:[
    { id:"contrat", delai:[0,0], attente:"Le contrat est sur la table, en trois exemplaires.",
      ev:{ id:"CAP_1", titre:"Trois exemplaires", famille:"POLITIQUE", rarete:"majeur",
        image:"rc_anarion", pnj:"anarion",
        scenes:{
          start:{ pnj:"anarion", texte:[
            "Anarion ne reçoit pas assis et ne fait pas attendre. Le contrat est déjà sur la table, en trois exemplaires, dans les deux langues, avec les visas.",
            "« Un prisonnier de ma troisième salle, escorté jusqu'à la borne du nord et remis à qui s'y présentera avec la contremarque. Onze jours de route. Deux mille écus. »",
            "Il ne flatte pas, ne menace pas et n'explique pas. « L'article quatre vous interdit de lui parler. L'article six m'interdit de vous mentir sur ce qu'il est. Lisez l'article six. »",
            "L'article six dit : *le prisonnier n'a commis aucun crime contre la cour d'Anarion.*"],
            choix:[
              {label:"Demander ce qu'il a commis, alors", detail:"L'article six est une invitation",
               suite:"quoi"},
              {label:"Lire tout le contrat, ligne à ligne", detail:"Jet de Précision (15) · il tient parole à la lettre, donc la lettre compte",
               test:{stat:"precision", dc:15}, reussite:"lu_ok", echec:"lu_ko"},
              {label:"Signer sans discuter", detail:"Deux mille écus et onze jours de route",
               suite:"signe", effets:{xp:16}},
              {label:"Refuser", detail:"Un contrat trop bien rédigé est un contrat qu'on a eu le temps d'écrire",
               suite:"refus", effets:{issue:"abandonnee", reputation:{elfes_noirs:-6}}},
            ]},
          quoi:{ fin:true, pnj:"anarion", texte:[
            "« Rien. » Il le dit sans une hésitation. « Il n'a rien commis. Il est ce qu'il est, et ce qu'il est intéresse quelqu'un au nord. »",
            "Un temps. « Vous voulez savoir si c'est honnête. Ce n'est pas honnête, et ce n'est pas malhonnête : c'est un échange. Je rends un homme à qui le réclame, et j'obtiens en retour une chose que je veux. »",
            "« L'article six est là précisément pour que vous puissiez décider en connaissance de cause. Je ne vous prendrai pas en traître. Je vous prendrai à la lettre. »"],
            effets:{xp:26, flags:["anarion_article_six","anarion_franc"]}},
          lu_ok:{ fin:true, pnj:"anarion", texte:[
            "Le contrat est irréprochable, et c'est en le lisant ligne à ligne qu'on voit ce qu'il ne dit pas.",
            "L'article quatre interdit de parler au prisonnier. L'article onze prévoit le paiement intégral *si l'escorte se présente à la borne*, et non si le prisonnier y arrive.",
            "L'article quatorze précise que la cour d'Anarion ne réclamera jamais le prisonnier, ni ne poursuivra quiconque à son sujet, quelle que soit l'issue.",
            "Ce n'est pas un contrat de livraison. Il a écrit un contrat qui lui permet d'être payé de sa part quoi qu'il arrive — et qui laisse à quelqu'un d'autre la possibilité de ne pas livrer."],
            effets:{xp:44, sang:4, flags:["anarion_article_onze","anarion_porte_ouverte"]}},
          lu_ko:{ fin:true, texte:["Onze pages dans deux langues, dont l'une n'a pas de mot pour *obligation*. Le contrat est en règle et c'est tout ce qu'on peut en dire."],
            effets:{xp:12}},
          signe:{ fin:true, pnj:"anarion", texte:[
            "Il contresigne, fait apposer trois cachets, et remet la contremarque dans un étui de plomb.",
            "« Onze jours. La borne du nord. » Il se détourne déjà. « Et l'article quatre, messire. Il compte. »"],
            effets:{flag:"anarion_signe"}},
          refus:{ fin:true, pnj:"anarion", texte:[
            "Il accepte le refus sans un mot de trop et fait reprendre les trois exemplaires.",
            "« Vous avez tort », dit-il à la porte. « Pas moralement. Vous auriez pu choisir, et maintenant quelqu'un d'autre choisira à votre place. »"]},
        }}},

    { id:"route", delai:[3,6], attente:"Onze jours de route vers la borne du nord.",
      ev:{ id:"CAP_2", titre:"Onze jours et l'article quatre", famille:"VOYAGE", rarete:"majeur",
        image:"evt_traque",
        scenes:{
          start:{ texte:[
            "Le prisonnier a peut-être trente ans, peut-être trois cents ; c'est un demi-elfe, et personne ne sait lire l'âge d'un demi-elfe.",
            "Il marche sans chaînes, parce que cette cour-là ne met pas de chaînes : elle met des contrats. Il mange, il dort, il ne parle pas.",
            "Le quatrième jour, il commence à parler tout seul, à voix basse, en marchant. Il récite des noms. Il y en a une centaine et il les récite dans l'ordre, tous les soirs.",
            "L'article quatre interdit de lui parler. Il n'interdit pas d'écouter."],
            choix:[
              {label:"Écouter les noms", detail:"Jet de Précision (14) · une centaine de noms dans l'ordre, ce n'est pas une prière",
               test:{stat:"precision", dc:14}, reussite:"noms_ok", echec:"noms_ko"},
              {label:"Lui parler, et rompre l'article quatre", detail:"Anarion tient parole à la lettre · vous aussi, jusqu'ici",
               suite:"parle"},
              {label:"Ne rien faire et marcher", detail:"Onze jours, un contrat, et deux mille écus",
               suite:"marche", effets:{xp:14}},
            ]},
          noms_ok:{ fin:true, texte:[
            "Ce ne sont pas des noms elfiques. Ce sont des noms de maisons Parias — des maisons rayées pendant la Purge, dans l'ordre exact où elles ont été rayées.",
            "Il en récite cent onze. Le registre officiel d'Astrah en compte quatre-vingt-quatre.",
            "Au huitième soir, il arrive à *Karlsberg* et s'arrête net, pour la première fois en huit jours. Puis il reprend au début."],
            effets:{xp:46, sang:10, flags:["anarion_prisonnier_recite","anarion_karlsberg"]}},
          noms_ko:{ fin:true, texte:["Une centaine de mots dans une langue qu'on ne parle pas, murmurés en marchant. On note le rythme et on n'en tire rien."],
            effets:{xp:12}},
          parle:{ fin:true, texte:[
            "Il répond du premier coup, comme quelqu'un qui attendait qu'on lui adresse la parole depuis très longtemps.",
            "« Je suis le témoin. » Il continue de marcher. « Il y a une chose, au nord, qui compte les maisons Parias effacées. Elle en compte cent onze. Le registre d'Astrah en compte quatre-vingt-quatre. »",
            "« Il me rend à ce qui me réclame parce que je vaux, pour lui, une chose qu'il veut davantage. Il ne ment pas : je n'ai rien fait contre lui. »",
            "Il se tourne enfin. « Vous êtes la centième et unième. Je peux vous dire les vingt-sept que le registre a perdues, ou je peux arriver à la borne. Pas les deux. »"],
            effets:{xp:52, sang:12, suspicion:8,
                    flags:["anarion_a_parle","anarion_karlsberg","anarion_vingt_sept"]}},
          marche:{ fin:true, texte:[
            "Onze jours, un homme qui récite des noms, et la borne du nord au bout.",
            "On ne lui parle pas. C'était dans le contrat, et un contrat qu'on respecte est la seule chose qui distingue un mercenaire d'un brigand — c'est du moins ce qu'on se dit le neuvième soir."]},
        }}},

    { id:"borne", delai:[1,2], attente:"La borne du nord est en vue.",
      ev:{ id:"CAP_3", titre:"La borne du nord", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_pierres",
        scenes:{
          start:{ texte:[
            "La borne du nord est une pierre levée dans une lande vide. Il n'y a personne.",
            "Puis, à la onzième heure, il y a quelqu'un : trois silhouettes en manteau qui n'ont pas approché, elles étaient là.",
            "L'une d'elles lève la contremarque.",
            "Le prisonnier s'arrête et regarde Yohan, pour la première fois depuis onze jours."],
            choix:[
              {label:"Le remettre", detail:"C'était le contrat, et le contrat était honnête",
               suite:"remet", effets:{issue:"livre", or:2000, renom:4,
                                      reputation:{elfes_noirs:12, parias:-14},
                                      flags:["anarion_livre"]}},
              {label:"Se présenter à la borne, et le laisser partir", detail:"L'article onze paie l'escorte, pas la livraison",
               requis:{flag:"anarion_article_onze"}, suite:"onze",
               effets:{issue:"relache", or:2000, renom:6,
                       reputation:{parias:18, elfes_noirs:-4},
                       flags:["anarion_relache","anarion_lettre_respectee"]}},
              {label:"Le garder", detail:"Trois silhouettes, une lande vide, et ce qu'il sait",
               suite:"garde"},
              {label:"Lui demander ce qu'il veut", detail:"Jet de Volonté (14) · onze jours qu'on ne le lui a pas demandé",
               test:{stat:"vol", dc:14}, reussite:"veut_ok", echec:"veut_ko"},
            ]},
          remet:{ fin:true, texte:[
            "On remet l'homme, on prend la contremarque, on compte l'or.",
            "Il ne résiste pas. Il ne dit rien non plus. Il se met à marcher entre les trois manteaux, et à quarante pas il recommence à réciter ses noms, à voix basse, dans l'ordre.",
            "On l'entend encore un moment. Puis plus du tout.",
            "La cour tiendra parole à la lettre : l'or est versé le jour même, sans un mot de commentaire."]},
          onze:{ fin:true, texte:[
            "Yohan se présente à la borne. Il présente l'escorte. Il ne présente pas le prisonnier, parce que l'article onze ne le demande pas.",
            "Les trois manteaux discutent longtemps, en elfique, d'une clause dans une langue qu'ils connaissent mieux que lui, et concluent qu'il a raison. C'est le genre de chose qui compte, pour eux.",
            "Le prisonnier part vers l'est, seul, sans remercier. À cent pas, il se retourne et crie vingt-sept noms, un par un, assez fort pour qu'on les entende tous.",
            "La cour paie sans discuter. Elle envoie même une note de trois lignes : *vous avez lu le contrat. C'est plus rare que vous ne croyez, et c'est pour cela que je l'écris ainsi.*"]},
          garde:{ texte:["Trois manteaux dans une lande vide, une contremarque levée, et un homme qui ne repart pas avec eux."],
            combat:{ groupe:[{bst:"BST_051", n:2}, {bst:"BST_052", n:1}],
                     victoire:"garde_ok", defaite:"garde_ko" }},
          garde_ok:{ fin:true, texte:[
            "Les trois manteaux ne fuient pas et ne se rendent pas. Ils ne sont pas là pour ça.",
            "Ce qui reste dans la lande met un moment à s'arrêter de bouger.",
            "Le prisonnier récite ses cent onze noms, entiers, en un jour et une nuit, et Yohan les écrit tous. Vingt-sept ne figurent dans aucun registre connu.",
            "La cour l'apprend en douze jours. Elle ne fait rien. Elle fait porter, deux mois plus tard, un seul feuillet : *l'article quatorze me lie. Il ne lie pas ce à quoi je devais vous rendre.*"],
            effets:{xp:66, sang:16, issue:"garde", suspicion:16, renom:8,
                    reputation:{parias:22, elfes_noirs:-16},
                    flags:["anarion_garde","anarion_vingt_sept","anarion_ce_qui_reclame"]}},
          garde_ko:{ fin:true, texte:[
            "On se réveille dans la lande, seul, avec la contremarque encore dans l'étui de plomb et deux mille écus qu'on n'a pas gagnés.",
            "Le prisonnier est parti vers le nord, entre trois manteaux, et il n'a probablement pas cessé de réciter."],
            effets:{xp:20, pv:-26, fat:20, issue:"livre",
                    reputation:{parias:-8}, flag:"anarion_livre"}},
          veut_ok:{ texte:[
            "« Qu'est-ce que vous voulez ? »",
            "Il met un long moment. Personne ne le lui a demandé depuis très longtemps.",
            "« Que quelqu'un retienne les vingt-sept. » Il regarde les trois manteaux. « Ce qui me réclame là-bas ne me tuera pas : il me gardera, et il compte mieux que moi. Ce n'est pas moi qu'il faut sauver. C'est la liste. »"],
            choix:[
              {label:"Prendre la liste et le remettre", detail:"C'est ce qu'il demande, mot pour mot",
               suite:"liste", effets:{issue:"livre", or:2000, sang:14, xp:56,
                                      reputation:{parias:10, elfes_noirs:10},
                                      flags:["anarion_livre","anarion_vingt_sept","anarion_liste_prise"]}},
              {label:"Prendre la liste et le garder quand même", detail:"Il n'a pas demandé ça",
               suite:"garde"},
            ]},
          veut_ko:{ texte:["Il ne répond pas. Onze jours de silence ne se rompent pas parce qu'on est arrivé au bout de la route."],
            suite:"remet"},
          liste:{ fin:true, texte:[
            "Vingt-sept noms, écrits deux fois, sur deux feuillets qui ne voyageront pas ensemble.",
            "Puis on le remet, parce que c'est ce qu'il a demandé, et parce qu'il a raison : ce qui le réclame le gardera, et une liste ne se garde pas dans une tête.",
            "Il part entre les trois manteaux sans se retourner. Il ne récite plus : il n'a plus besoin.",
            "Vingt-sept maisons Parias que le registre d'Astrah a perdues, et qui existent de nouveau quelque part, sur deux feuillets, chez un homme qui sait ce que ça vaut."]},
        }}},
  ]},
];
CHAINES_2.forEach(c => CHAINES.push(c));
