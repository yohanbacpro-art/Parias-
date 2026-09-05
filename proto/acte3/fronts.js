/* PARIAS — Acte III · LES DEUX FRONTS DU SUD ET DU NORD
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Le canon nomme cinq fronts pour l'Acte III. Quatre étaient écrits ; la
 * chronique parlait des deux autres sans qu'on puisse y aller.
 *
 *   « **Khesh :** Khal-Vaene peut tenter l'unification et Yohan peut
 *     infléchir son succès. »
 *   « **Grande Horde Homme-Bête :** elle profite du chaos sans être
 *     obligatoirement le "boss final". »
 *
 * ═══ LE PUITS DE SARAD ═══
 *
 * Il reste cinq feux. Quatre jureront si le cinquième jure, et le cinquième
 * ne jurera pas. Chez les Khesh on ne remplace pas un chef par une guerre :
 * on le remplace par un défi, et un grand chef qui défie un petit ne fait
 * pas un défi — il fait une exécution, et plus personne ne le suit ensuite.
 *
 * Khal-Vaene a donc besoin de quelqu'un qui n'appartienne à aucune tribu.
 * Et à la seconde où Yohan entre dans le cercle, le désert unifié devient
 * sa décision : *le désert bouge vers le nord* est la cinquième étape, et
 * le nord, c'est ici.
 *
 * ═══ LA COLONNE ═══
 *
 * Six mille descendent. On ne tient pas six mille avec ce qu'on a, et c'est
 * le premier front de l'acte où la bataille est un mauvais calcul plutôt
 * qu'un risque.
 *
 * Ce que personne n'a regardé : *les mères se regroupent au nord* est une
 * étape de migration, pas d'invasion. Une harde ne se regroupe pas pour
 * attaquer. Elle se regroupe quand elle recule.
 * ═══════════════════════════════════════════════════════════════════════ */

Object.assign(CHAMPS, {

  bat_horde:{
    id:'bat_horde',
    nom:"La marche sans frontière",
    lieu:"La marche humaine · le seuil de Trois-Chênes",
    intro:"Six mille descendent en trois colonnes, sans ordre, sans camp de nuit et sans rien piller — ce qui aurait dû renseigner tout le monde et n'a renseigné personne.",
    mise:"On ne tient pas six mille. On tient un seuil pendant le temps qu'il faut pour que six mille passent ailleurs, et le temps qu'il faut n'est jamais celui qu'on a prévu.",
    fronts:[
      { nom:"Le seuil",        terrain:'defile',
        ennemis:[{ type:'harde_cornes' }, { type:'harde_cornes', effectifPct:0.8 }] },
      { nom:"Le bois brûlé",   terrain:'bois',
        ennemis:[{ type:'harde_cornes', effectifPct:0.9 }, { type:'horde', effectifPct:0.6 }] },
      { nom:"La levée",        terrain:'colline',
        ennemis:[{ type:'harde_cornes', effectifPct:0.7 }] },
    ],
    victoire:{ renom:16, temoins:'province', flags:['a3_seuil_tenu'],
      texte:"Le seuil tient. La colonne oblique vers l'est à la nuit, sans un cri, comme elle avait descendu — et cinq hameaux qui n'auraient pas dû exister au printemps existent encore." },
    defaite:{ renom:-6, flags:['a3_seuil_perdu'],
      texte:"On décroche par la levée. La colonne passe le seuil dans la nuit et continue vers le sud, et la marche humaine n'a plus de frontière au sens où l'on employait ce mot." },
  },

});

const FRONTS = {

/* ══════════════════════════════════════════════════════════════════════════
 * LE PUITS DE SARAD · Khal-Vaene
 * ══════════════════════════════════════════════════════════════════════════ */
a3_th_khesh:{
  qui:null,
  lieu:"Les dunes · le puits de Sarad · Thermidor",
  titre:"Cinq feux",
  texte:[
    "Khal-Vaene reçoit qui vient au puits de Sarad. Sans exception, sans escorte, assis par terre comme tout le monde, parce qu'un homme qui a réuni sept tribus ne s'assied pas plus haut qu'elles tant qu'il en manque cinq.",
    { sobre:"Il ne fait pas attendre. Il ne fait jamais attendre personne.",
      intense:"Il ne fait pas attendre. Il ne fait jamais attendre personne : c'est une règle qu'il s'est donnée à trente ans et qu'il n'a pas rompue depuis, et elle lui a valu plus de serments que ses quatre guerres.",
      extreme:"Il ne fait pas attendre. Il ne fait jamais attendre personne, et c'est la première chose qu'on vous a dite à quatre relais de distance en descendant.\n\nC'est une règle qu'il s'est donnée à trente ans, un matin, et qu'il n'a pas rompue une seule fois depuis. Elle lui a valu plus de serments que ses quatre guerres réunies, et il le sait, et il continue de la présenter comme une commodité." },
    "^« Cinq feux », dit-il. « Il en reste cinq. Quatre jureront le jour où le cinquième jurera, et le cinquième ne jurera pas. »",
    "@« Alors prenez-le. »",
    { sobre:"^« Je ne peux pas. »",
      intense:"^« Je ne peux pas, et ce n'est pas de la faiblesse. Chez nous, on ne remplace pas un chef par une guerre : on le remplace par un défi.\n\nUn homme de sept tribus qui défie un homme d'une seule ne fait pas un défi. Il fait une exécution, et après une exécution il n'y a plus de serments — il n'y a plus que des gens qui attendent. »",
      extreme:"^« Je ne peux pas. Ce n'est pas de la faiblesse et ce n'est pas de la délicatesse : c'est arithmétique.\n\nChez nous on ne remplace pas un chef par une guerre. On le remplace par un défi, devant les siens, dans un cercle que les siens ont tracé. C'est ainsi depuis toujours et c'est la seule raison pour laquelle douze tribus qui se haïssent peuvent finir par tenir ensemble.\n\nUn homme de sept tribus qui défie un homme d'une seule ne fait pas un défi. Il fait une exécution. Et après une exécution, il n'y a plus de serments : il n'y a plus que des gens qui obéissent et qui comptent les jours.\n\nJ'ai vu ça. Mon père a fait ça. Il a eu neuf tribus pendant quatre ans et il est mort seul dans une tente que personne n'a gardée. »" },
    "§ Voilà ce qu'il veut, et il ne l'a toujours pas demandé.",
    { sobre:"^« Vous n'appartenez à aucune tribu. »",
      intense:"^« Vous n'appartenez à aucune tribu, à aucun serment et à aucune dette d'ici. C'est très exactement ce qui manque : quelqu'un dont la victoire n'appartient à personne.\n\nAshrem tient le cinquième feu. Il a quarante ans. Il ne vous fera pas de politesse. »",
      extreme:"^« Vous n'appartenez à aucune tribu. À aucun serment, à aucune dette, à aucune vieille histoire de puits ou de femme prise.\n\nC'est très exactement ce qui manque au désert depuis onze ans : quelqu'un dont la victoire n'appartienne à personne. Si vous entrez dans le cercle et que vous en sortez debout, le cinquième feu ne s'éteint pas — il change de main, devant les siens, dans les formes, et les quatre autres jurent avant la fin du mois.\n\nAshrem tient le cinquième. Il a quarante ans, il a tué onze hommes dans un cercle, et il ne vous fera aucune politesse parce que ce serait m'en faire une à moi. »" },
  ],
  effets:{ flags:['a3_kh_sarad'],
           marque:"Cinq feux. Le cinquième est tenu par Ashrem, et un grand chef ne peut pas le défier lui-même.",
           court:"Cinq feux" },
  choix:[
    { t:"Entrer dans le cercle",
      detail:"un défi · devant les siens · onze hommes avant vous",
      risque:'définitif', va:'a3_kh_cercle' },

    { t:"« Et quand le désert n'aura plus qu'un feu ? »",
      detail:"Perception · lettres — il n'a pas dit ce qu'il ferait après, et il n'a pas oublié de le dire",
      risque:'favorable',
      test:{ carac:'perception', comp:'lettres', dc:13, adversaire:'khalvaene', manoeuvre:'apres' },
      degres:{ dominante:'a3_kh_apres', nette:'a3_kh_apres', couteuse:'a3_kh_apres',
               echec:'a3_kh_apres_ko', catastrophe:'a3_kh_apres_ko' } },

    { t:"Refuser",
      detail:"douze feux qui pillent valent peut-être mieux qu'un feu qui décide",
      risque:'calculé', va:'a3_kh_refus' },
  ],
},

a3_kh_apres:{
  qui:null,
  titre:"Ce qu'il fera du désert",
  texte:[
    "@« Vous m'avez dit ce qu'il fallait pour réunir le désert. Vous ne m'avez pas dit ce que vous en feriez. »",
    { sobre:"Il ne se dérobe pas.",
      intense:"Il ne se dérobe pas une seconde. C'est la question qu'il attendait — il l'attendait de vous, et il l'attend de quelqu'un depuis onze ans.",
      extreme:"Il ne se dérobe pas une seconde.\n\nEt vous comprenez, à la vitesse à laquelle il répond, que c'est la question qu'il attendait. Pas de vous en particulier : de quelqu'un. Il l'attend depuis onze ans et personne au sud ne la lui a jamais posée, parce qu'au sud on croit que ce qu'un chef khesh veut est évident." },
    { sobre:"^« Le désert ne nourrit pas douze tribus. Il en nourrit sept. »",
      intense:"^« Le désert ne nourrit pas douze tribus. Il en a nourri douze pendant quatre cents ans parce que les douze passaient leur temps à s'entretuer, ce qui est une façon de tenir un chiffre.\n\nRéuni, il en nourrit sept. Il en restera douze. Vous savez compter. »",
      extreme:"^« Le désert ne nourrit pas douze tribus. Il n'en a jamais nourri douze.\n\nIl en a porté douze pendant quatre cents ans parce que les douze passaient leur temps à s'entretuer autour des puits, ce qui est une façon très efficace de tenir un chiffre et dont personne ne parle jamais dans ces termes.\n\nRéuni, il en nourrit sept. Il en restera douze, et elles ne se battront plus entre elles. »\n\nUn temps.\n\n« Vous savez compter, messire. Vous savez donc déjà où elles iront. »" },
    "§ Le nord. Le nord, c'est ici.",
    { sobre:"^« Je ne vous mens pas et je ne vous demande pas de m'aider contre vous. »",
      intense:"^« Je ne vous mens pas. Je ne vous demande pas non plus de m'aider contre vous : je vous demande de choisir entre douze tribus qui pillent quatre provinces au hasard pendant deux cents ans, et une confédération qui monte une fois, en ordre, et avec qui on peut traiter.\n\nLa deuxième est pire une année. Elle est meilleure ensuite. Je ne peux rien prouver de tout ça. »",
      extreme:"^« Je ne vous mens pas. Je pourrais : vous ne pourriez pas vérifier, et vous seriez reparti content.\n\nJe ne vous demande pas non plus de m'aider contre vous. Je vous demande de choisir entre deux choses.\n\nDouze tribus qui pillent quatre provinces au hasard, chacune pour son compte, pendant deux cents ans encore — c'est ce qui se passe si je meurs demain et c'est ce qui s'est passé pendant quatre cents ans.\n\nOu une confédération qui monte une fois, en ordre, sous un serment, et avec qui on peut traiter parce qu'il y a quelqu'un à qui parler.\n\nLa deuxième est pire pendant une année et meilleure pendant cent. Je ne peux rien prouver de tout ça et je ne vais pas essayer : on ne prouve pas cent ans à un homme qui en a trente-trois. »" },
  ],
  effets:{ flags:['a3_kh_su'],
           exploit:{ eclat:5, temoins:'quelques',
                     quoi:"vous avez obtenu de Khal-Vaene ce qu'il fera du désert réuni" },
           marque:"Le désert réuni nourrit sept tribus sur douze. Les cinq autres monteront au nord, en ordre, sous un serment.",
           court:"Sept sur douze" },
  choix:[
    { t:"Entrer dans le cercle",
      detail:"en sachant où ira le désert · et en le sachant avant lui",
      risque:'définitif', va:'a3_kh_cercle' },
    { t:"Refuser",
      detail:"cent ans qu'on ne peut pas prouver contre une année qu'on peut compter",
      risque:'calculé', va:'a3_kh_refus' },
  ],
},

a3_kh_apres_ko:{
  qui:null,
  titre:"Ce qu'il ne développe pas",
  texte:[
    "@« Qu'est-ce que vous en ferez ? »",
    "^« Ce qu'on fait d'un désert réuni. » Il ne sourit pas et il ne se dérobe pas non plus. « Vous le saurez en même temps que moi. C'est vrai et ça ne vous suffira pas, et je n'ai rien de mieux. »",
    "§ Il y a une réponse et il ne la donne pas. Ce n'est pas la même chose que mentir, et ce n'est pas beaucoup mieux.",
  ],
  effets:{ marque:"Il n'a pas dit ce qu'il ferait du désert réuni.",
           court:"En même temps que moi" },
  choix:[
    { t:"Entrer dans le cercle",
      detail:"sans savoir ce qu'on met en marche",
      risque:'définitif', va:'a3_kh_cercle' },
    { t:"Refuser",
      detail:"on ne réunit pas un désert pour quelqu'un qui ne dit pas où il l'emmène",
      risque:'prudent', va:'a3_kh_refus' },
  ],
},

a3_kh_cercle:{
  melee:true, qui:null,
  lieu:"Les dunes · le cinquième feu · au petit jour",
  titre:"Le cercle d'Ashrem",
  texte:[
    "Le cercle est tracé par les siens, avec du sable de couleur, et il fait onze pas — ce qui n'est pas un hasard : c'est un pas par homme qu'Ashrem y a tué.",
    { sobre:"Il a quarante ans. Deux lames courbes, aucune armure.",
      intense:"Ashrem a quarante ans, deux lames courbes et pas un pouce d'armure, parce que dans un cercle khesh l'armure est un aveu et personne ne veut avouer devant sa propre tribu.\n\nIl ne vous regarde pas en entrant. Il regarde Khal-Vaene, assis par terre au troisième rang.",
      extreme:"Ashrem a quarante ans, deux lames courbes et pas un pouce d'armure sur lui.\n\nDans un cercle khesh, l'armure est un aveu. Personne n'en porte, personne n'en a jamais porté, et il n'existe pas de règle qui l'interdise — c'est plus fort qu'une règle, c'est ce que personne ne veut faire devant sa propre tribu.\n\nIl ne vous regarde pas en entrant. Il regarde Khal-Vaene, assis par terre au troisième rang comme tout le monde, et il le regarde assez longtemps pour que trois cents personnes comprennent qu'il sait très exactement ce qui se joue et qui l'a arrangé." },
    "^« Tu n'es pas d'ici », dit-il en khesh, puis dans votre langue, ce qui est une courtoisie et qu'il vous fait exprès. « Je le dirai à mes fils. Que celui qui m'a pris le feu n'était pas d'ici. »",
    "@« Ils l'entendront de vous ou de moi. »",
    { sobre:"^« De moi. Je compte bien te survivre. »",
      intense:"^« De moi. Je compte bien te survivre — et si je ne te survis pas, ils l'entendront quand même de moi, parce que je le leur ai dit hier soir. »\n\nIl écarte les bras une fois.\n\n« On ne meurt pas ici en n'ayant rien préparé. C'est la différence entre nous et vous. »",
      extreme:"^« De moi. Je compte bien te survivre.\n\nEt si je ne te survis pas, ils l'entendront quand même de moi, parce que je le leur ai dit hier soir, en entier, dans la tente, avec les deux versions. »\n\nIl écarte les bras une fois, lentement, ce qui n'est pas un salut et que personne ne traduit.\n\n« On ne meurt pas ici en n'ayant rien préparé. Un homme qui entre dans un cercle sans avoir dit à ses fils ce qu'ils diraient de lui est un homme qui n'a pas compris ce qu'est un cercle.\n\nC'est la seule différence entre nous et vous, messire, et c'est toute la différence. »" },
    "§ Il n'y a ni règles, ni temps, ni arrêt. On entre à deux et il en sort un debout.",
  ],
  effets:{ melee:{ position:"dans le cercle, onze pas", note:"Deux lames courbes · pas d'armure · pas de temps" } },
  choix:[
    { t:"Le laisser ouvrir",
      detail:"Perception · esquive — deux lames courbes ne parent pas, elles occupent",
      risque:'calculé',
      test:{ carac:'perception', comp:'esquive', dc:13, adversaire:'ashrem', manoeuvre:'attendre',
             cout:{ endurance:10 } },
      degres:{ dominante:'a3_kh_gagne', nette:'a3_kh_gagne', couteuse:'a3_kh_gagne_cout',
               echec:'a3_kh_perdu', catastrophe:'a3_kh_perdu' } },

    { t:"Fermer la distance",
      detail:"Force · épées — deux lames courbes sont deux lames courtes",
      risque:'risqué',
      test:{ carac:'force', comp:'epees', dc:14, adversaire:'ashrem', manoeuvre:'fermer',
             cout:{ endurance:16 } },
      degres:{ dominante:'a3_kh_gagne', nette:'a3_kh_gagne', couteuse:'a3_kh_gagne_cout',
               echec:'a3_kh_perdu', catastrophe:'a3_kh_perdu' } },

    { t:"Sortir du cercle",
      detail:"personne ne l'a jamais fait · et personne n'a jamais dit que c'était interdit",
      risque:'définitif', va:'a3_kh_sortir' },
  ],
},

a3_kh_gagne:{
  melee:true, qui:null,
  titre:"Le cinquième feu",
  texte:[
    { sobre:"Ça finit debout, et vous êtes celui qui est debout.",
      intense:"Ça finit debout. Il tombe sur un genou, il pose une lame à plat sur le sable — le geste, chez eux, n'a rien d'une reddition : c'est ce qu'on fait quand on a fini — et il attend.",
      extreme:"Ça finit debout, et personne dans ce cercle ne crie.\n\nIl tombe sur un genou et il pose une des deux lames à plat sur le sable, la pointe vers lui. Le geste n'a rien d'une reddition et il ne faut pas le prendre pour ça : c'est ce qu'on fait ici quand on a fini, et on le fait qu'on soit vainqueur ou non.\n\nIl attend. Trois cents personnes attendent avec lui, et pas une n'a bougé depuis le début." },
    "§ Ce qui suit n'est pas dans les mains du vainqueur. C'est dans les siennes.",
    { sobre:"^« Le feu est à toi », dit-il. « Je le dis fort pour qu'on l'entende. »",
      intense:"^« Le feu est à toi. » Il le dit fort, en khesh d'abord, pour que ce soient les siens qui l'entendent avant vous. « Je le dis moi-même parce que si c'est un autre qui le dit, ça ne vaut rien.\n\nEt maintenant tu le donnes à Khal-Vaene, parce que tu n'en veux pas, et parce que si tu le gardes je devrai revenir. »",
      extreme:"^« Le feu est à toi. »\n\nIl le dit fort, en khesh d'abord, pour que ce soient les siens qui l'entendent avant vous. Puis il le redit dans votre langue, ce qu'il n'était pas obligé de faire.\n\n« Je le dis moi-même. Si c'est un autre qui le dit, ça ne vaut rien : un feu qui change de main sur la parole d'un tiers se rechange de main dans les six mois, et j'ai vu ça deux fois.\n\nEt maintenant tu le donnes à Khal-Vaene. Parce que tu n'en veux pas, parce que tu ne saurais pas quoi en faire, et parce que si tu le gardes il faudra que je revienne, et je n'ai plus envie. »" },
    "§ Les quatre autres jurent avant la fin du mois. Le désert n'a plus qu'un feu et un serment.",
  ],
  effets:{ flags:['a3_khesh_tenu','a3_kh_unifie'],
           meleeMaj:{ eux:0, note:"Il a posé une lame à plat sur le sable" },
           exploit:{ eclat:12, temoins:'foule',
                     quoi:"vous avez pris le cinquième feu dans un cercle de onze pas" },
           faire:() => { const A = A2(); A.crises = A.crises || {}; A.crises.khesh = Math.max(A.crises.khesh || 0, 4); },
           marque:"Le cinquième feu a changé de main devant trois cents personnes. Le désert est réuni.",
           court:"Un feu et un serment" },
  plusTard:"Un désert réuni nourrit sept tribus sur douze. Les cinq autres monteront, en ordre, et il y aura quelqu'un à qui parler.",
  suite:'a3_retour', libelleSuite:"Rentrer",
},

a3_kh_gagne_cout:{
  melee:true, qui:null,
  titre:"Ce que coûtent deux lames courbes",
  texte:[
    "Vous êtes debout et il ne l'est pas, et ça vous a coûté quelque chose que vous garderez.",
    { sobre:"Deux lames courbes n'ont pas besoin de parer. Elles occupent, et pendant qu'elles occupent l'autre entre.",
      intense:"Deux lames courbes ne parent pas : elles occupent. On passe la première et on ne voit pas la seconde, et c'est très exactement ce qui s'est produit à la neuvième seconde.\n\nOn vous recoud sous la tente, avec du fil de tendon, et personne ne s'excuse.",
      extreme:"Deux lames courbes ne parent pas. Elles occupent — c'est le mot que les leurs emploient et il est juste : elles ne cherchent pas votre lame, elles cherchent votre attention, et pendant que vous la donnez à l'une, l'autre entre.\n\nÀ la neuvième seconde, la seconde est entrée.\n\nOn vous recoud sous la tente avec du fil de tendon, à froid, pendant que dehors trois cents personnes discutent de ce qu'elles viennent de voir. Personne ne s'excuse et personne ne demande si ça fait mal : ce sont deux choses qu'on ne demande pas ici." },
    "^« Le feu est à toi », dit Ashrem depuis l'autre côté de la tente, où on le recoud aussi. « Donne-le à Khal-Vaene. Je n'ai plus envie de revenir. »",
  ],
  effets:{ flags:['a3_khesh_tenu','a3_kh_unifie'],
           cout:{ sang:14, endurance:20 },
           exploit:{ eclat:10, temoins:'foule', quoi:"le cinquième feu a changé de main" },
           faire:() => { const A = A2(); A.crises = A.crises || {}; A.crises.khesh = Math.max(A.crises.khesh || 0, 4); },
           marque:"Le cinquième feu a changé de main, et vous en gardez quelque chose.",
           court:"À la neuvième seconde" },
  suite:'a3_retour', libelleSuite:"Rentrer",
},

a3_kh_perdu:{
  melee:true, qui:null,
  titre:"Onze pas, douze hommes",
  texte:[
    { sobre:"Il vous met à terre et il s'arrête.",
      intense:"Il vous met à terre et il s'arrête, ce que personne n'avait prévu — surtout pas les siens, qui font un bruit qu'on n'entend pas souvent dans un cercle.",
      extreme:"Il vous met à terre en moins de temps qu'il n'en faut pour le décrire, et il s'arrête.\n\nPersonne n'avait prévu ça. Surtout pas les siens : ils font un bruit qu'on n'entend pas souvent dans un cercle khesh, une sorte de murmure très bref, et ça veut dire qu'ils sont en train de recalculer quelque chose." },
    "^« Douze », dit-il aux siens, en khesh. Puis, dans votre langue, pour vous seul : « Onze. Je ne compte pas celui qu'on m'a envoyé. »",
    { sobre:"§ Il refuse de vous compter. C'est plus dur que de vous tuer.",
      intense:"§ Il refuse de vous compter. Devant trois cents personnes, il dit que ce défi n'en était pas un — et il a raison, et tout le monde le sait, et Khal-Vaene ne dit rien.",
      extreme:"§ Il refuse de vous compter.\n\nDevant trois cents personnes, il annonce que ce défi n'en était pas un : qu'on lui a envoyé un étranger parce qu'on n'osait pas venir soi-même, et qu'un homme qui envoie quelqu'un n'a pas gagné, même si l'envoyé était bon.\n\nIl a raison. Tout le monde dans ce cercle le sait. Khal-Vaene, assis par terre au troisième rang, ne dit rien du tout et ne dira rien, parce qu'il n'y a rien à répondre à ça et qu'il l'a su avant d'essayer." },
    "§ Les quatre autres feux ne jureront pas cette année. Il en reste cinq, et ils resteront cinq longtemps.",
  ],
  effets:{ flags:['a3_khesh_tenu','a3_kh_echoue'],
           cout:{ sang:22, endurance:24, moral:8 },
           marque:"Ashrem a refusé de vous compter. Le désert reste à cinq feux et Khal-Vaene n'a rien dit.",
           court:"Onze, pas douze" },
  plusTard:"Un grand chef qui envoie quelqu'un n'a pas gagné. C'est la règle et il la connaissait, et il a essayé quand même.",
  suite:'a3_retour', libelleSuite:"Rentrer",
},

a3_kh_sortir:{
  qui:null,
  titre:"La chose que personne n'a faite",
  texte:[
    "Vous sortez du cercle. Sans un mot, en marchant, devant trois cents personnes qui ne savent absolument pas quoi faire de ça.",
    { sobre:"Personne ne l'a jamais fait. Rien ne l'interdit.",
      intense:"Personne ne l'a jamais fait, et il n'existe aucune règle qui l'interdise — parce qu'on n'écrit pas de règle contre une chose que personne n'a envisagée.\n\nAshrem reste seul au milieu du sable de couleur, les deux lames basses.",
      extreme:"Personne ne l'a jamais fait.\n\nIl n'existe aucune règle qui l'interdise : on n'écrit pas de règle contre une chose que personne n'a jamais envisagée, et en quatre cents ans de cercles, aucun homme entré n'en est ressorti par ses pieds sans que l'autre soit à terre.\n\nAshrem reste seul au milieu du sable de couleur, les deux lames basses, devant sa propre tribu, dans une position pour laquelle sa langue n'a pas de mot." },
    "@« Ce feu est le vôtre. Je ne suis pas venu vous le prendre pour quelqu'un d'autre. »",
    { sobre:"^« Alors pourquoi es-tu entré ? »",
      intense:"^« Alors pourquoi es-tu entré ? »\n\n@« Pour que ce soit vous qui décidiez, et pas moi. »\n\nIl met un long temps.",
      extreme:"^« Alors pourquoi es-tu entré ? »\n\n@« Pour qu'on vous le demande dans un cercle au lieu de vous le prendre. Ce n'est pas la même chose et vous êtes le seul ici à qui ça change quelque chose. »\n\nIl met un très long temps. Trois cents personnes attendent, et pour la première fois de la matinée elles ne regardent pas le cercle : elles regardent Khal-Vaene." },
    "§ Ashrem jure quatre mois plus tard, de lui-même, sans que personne soit entré dans son cercle. Les quatre autres suivent parce que c'est lui.",
  ],
  effets:{ flags:['a3_khesh_tenu','a3_kh_unifie','a3_kh_sorti'],
           exploit:{ eclat:14, temoins:'foule',
                     quoi:"vous êtes sorti d'un cercle khesh debout et sans l'autre à terre" },
           faire:() => { const A = A2(); A.crises = A.crises || {}; A.crises.khesh = Math.max(A.crises.khesh || 0, 4); },
           marque:"Vous êtes sorti du cercle. Ashrem a juré quatre mois plus tard, de lui-même.",
           court:"Sorti debout" },
  plusTard:"On raconte encore cette matinée dans le désert, et on la raconte mal : dans toutes les versions, quelqu'un finit à terre.",
  suite:'a3_retour', libelleSuite:"Rentrer",
},

a3_kh_refus:{
  qui:null,
  titre:"Douze feux",
  texte:[
    "@« Non. »",
    { sobre:"^« Bien. »",
      intense:"^« Bien. » Il ne demande pas pourquoi. « Vous êtes le troisième. Les deux autres avaient de mauvaises raisons ; je ne sais pas encore pour vous et je ne le saurai pas. »",
      extreme:"^« Bien. »\n\nIl ne demande pas pourquoi, et il ne se lève pas non plus : un homme assis par terre qui reste assis par terre dit quelque chose de précis, et ce qu'il dit c'est *ceci ne change rien entre nous*.\n\n« Vous êtes le troisième à qui je le demande. Les deux autres avaient de mauvaises raisons — l'un voulait le feu, l'autre voulait qu'on le sache. Je ne sais pas quelle est la vôtre et je ne la saurai pas, parce que vous n'allez pas me la dire et que je n'ai pas à la demander. »" },
    "§ Il reste cinq feux. Ils resteront cinq, puis ils redeviendront douze, et douze tribus qui pillent au hasard n'ont jamais eu besoin de personne pour continuer.",
  ],
  effets:{ flags:['a3_khesh_tenu','a3_kh_refuse'],
           faire:() => { if(typeof retenir === 'function') retenir('khalvaene', "il a refusé le cercle au puits de Sarad"); },
           marque:"Vous avez refusé le cercle. Le désert reste à cinq feux, et il redeviendra douze.",
           court:"Douze feux" },
  suite:'a3_retour', libelleSuite:"Rentrer",
},

/* ══════════════════════════════════════════════════════════════════════════
 * LE SEUIL DE TROIS-CHÊNES · la colonne
 * ══════════════════════════════════════════════════════════════════════════ */
a3_th_horde:{
  qui:null,
  lieu:"La marche humaine · Trois-Chênes · Fructidor",
  titre:"Six mille",
  texte:[
    "Six mille descendent en trois colonnes. On a le chiffre parce qu'un homme de Chastel les a comptés depuis une crête pendant deux jours, et il est mort de froid en redescendant, et son carnet est arrivé.",
    { sobre:"Elles descendent sans rien piller. Personne n'a relevé ce détail.",
      intense:"Elles descendent depuis onze jours et elles n'ont rien pillé. Pas un troupeau, pas un grenier, pas un hameau — et il y en a quatre sur leur route qu'elles ont contournés.\n\nLe carnet le note deux fois. Personne à Chastel n'a relevé.",
      extreme:"Elles descendent depuis onze jours et elles n'ont rien pillé.\n\nPas un troupeau. Pas un grenier. Pas un hameau, et il y en a quatre sur leur route, dont deux sans palissade, qu'elles ont contournés — contournés, ce qui coûte une demi-journée à six mille personnes.\n\nLe carnet du mort le note deux fois, la seconde fois souligné. Personne à Chastel n'a relevé, parce qu'à Chastel on sait ce qu'est une horde et qu'on n'a pas besoin de lire pour le savoir." },
    "§ On ne tient pas six mille. Ce n'est pas une question de courage : c'est une question de front, et le seuil de Trois-Chênes en fait quatre cents pas.",
    { sobre:"Il y a autre chose dans le carnet.",
      intense:"Il y a autre chose dans le carnet, à la dernière page, écrit d'une main qui commençait à geler :\n\n*Les mères sont devant.*",
      extreme:"Il y a autre chose dans le carnet, à la dernière page, écrit d'une main qui commençait à geler et qui a mis trois lignes à écrire quatre mots :\n\n*Les mères sont devant.*\n\nUne harde met les mères au centre. Toujours. C'est la seule constante que quatre cents ans d'observations aient jamais établie sur les Hommes-Bêtes, et c'est vrai depuis qu'on écrit sur eux.\n\nElles ne sont au centre que quand la harde avance." },
  ],
  effets:{ flags:['a3_ho_colonne'],
           marque:"Six mille descendent sans rien piller, et les mères sont devant. Une harde ne met les mères devant que lorsqu'elle recule.",
           court:"Les mères devant" },
  choix:[
    { t:"Tenir le seuil",
      detail:"quatre cents pas de front · trois compagnies levées · six mille en face",
      risque:'définitif',
      va:() => ouvrirBataille('bat_horde', 'a3_ho_apres',
        [{ type:'lanciers' }, { type:'arbaletriers', effectifPct:0.8 },
         { type:'milice' }, { type:'eclaireurs', effectifPct:0.7 }]) },

    { t:"Monter voir ce qu'il y a derrière elles",
      detail:"Perception · pistage — elles ne pillent pas, et les mères sont devant",
      risque:'risqué',
      test:{ carac:'perception', comp:'pistage', dc:13, adversaire:'horde', manoeuvre:'nord',
             cout:{ endurance:12 } },
      degres:{ dominante:'a3_ho_nord', nette:'a3_ho_nord', couteuse:'a3_ho_nord',
               echec:'a3_ho_nord_ko', catastrophe:'a3_ho_nord_ko' } },

    { t:"Leur ouvrir la marche vers l'est",
      detail:"sans savoir pourquoi elles descendent · et en le payant devant trois maisons",
      risque:'calculé', va:'a3_ho_couloir' },
  ],
},

a3_ho_nord:{
  qui:null,
  lieu:"Au nord de la colonne · quatre jours",
  titre:"Ce qu'il y a derrière",
  texte:[
    "On remonte quatre jours à contre-courant d'une colonne de six mille, ce qui est possible parce qu'elle ne s'occupe pas de vous : c'est la deuxième chose qui aurait dû renseigner quelqu'un.",
    { sobre:"Le nord est vide. Pas abandonné : vide.",
      intense:"Le nord est vide. Ce n'est pas la même chose qu'abandonné — un pays abandonné garde ses bêtes mortes et ses feux éteints.\n\nCelui-là est propre. On a mangé tout ce qui pouvait l'être, et on a emporté le reste.",
      extreme:"Le nord est vide.\n\nCe n'est pas la même chose qu'abandonné. Un pays abandonné garde ses bêtes mortes, ses feux éteints, ses toits effondrés et l'odeur de ce qui a pourri sur place.\n\nCelui-là est propre. Absolument propre. On a mangé tout ce qui pouvait l'être, y compris ce qu'on ne mange pas d'ordinaire, et on a emporté le reste, y compris ce qui ne s'emporte pas.\n\nIl faut deux jours de plus pour trouver par quoi." },
    { sobre:"§ Ce sont des Peaux-Vertes. Beaucoup.",
      intense:"§ Ce sont des Peaux-Vertes, et ils ne descendent pas : ils s'étalent.\n\nCe qui use Kar-Durak par le bas déborde par le haut. Personne n'avait fait le lien parce que les deux affaires sont dans deux dossiers différents, à deux greffes différents, à cent quarante lieues l'un de l'autre.",
      extreme:"§ Ce sont des Peaux-Vertes.\n\nIls ne descendent pas et ils n'attaquent pas : ils s'étalent. C'est leur façon, on la connaît, et personne n'a jamais voulu l'apprendre — ils ne prennent pas, ils usent, et un pays usé n'a plus rien à défendre parce qu'il n'a plus rien.\n\nCe qui use Kar-Durak par le bas déborde par le haut. Les deux affaires sont dans deux dossiers différents, à deux greffes distants de cent quarante lieues, et personne n'a jamais posé les deux cartes sur la même table.\n\nLa Horde ne profite pas du chaos. Elle en sort." },
    "§ Six mille personnes descendent parce qu'il n'y a plus rien derrière elles, et elles n'ont rien pillé parce qu'elles n'ont pas le temps.",
  ],
  effets:{ flags:['a3_ho_su','a3_horde_comprise'],
           cout:{ endurance:10 },
           exploit:{ eclat:7, temoins:'un',
                     quoi:"vous avez compris pourquoi six mille Hommes-Bêtes descendaient" },
           marque:"La Horde ne profite pas du chaos : elle en sort. Ce qui use Kar-Durak par le bas déborde par le haut.",
           court:"Elle en sort" },
  choix:[
    { t:"Leur ouvrir la marche vers l'est",
      detail:"maintenant on sait pourquoi · et ça ne change rien à ce que ça coûte",
      risque:'calculé', va:'a3_ho_couloir' },
    { t:"Tenir le seuil quand même",
      detail:"six mille qui fuient quelque chose passent quand même par chez vous",
      risque:'définitif',
      va:() => ouvrirBataille('bat_horde', 'a3_ho_apres',
        [{ type:'lanciers' }, { type:'arbaletriers', effectifPct:0.8 },
         { type:'milice' }, { type:'eclaireurs', effectifPct:0.7 }]) },
  ],
},

a3_ho_nord_ko:{
  qui:null,
  titre:"Quatre jours pour rien",
  texte:[
    "On remonte quatre jours et on ne trouve rien. Le pays est vide, ce qui ne prouve rien : un pays que six mille viennent de traverser est vide par définition.",
    "§ Il y a une réponse quelque part au nord et elle est à deux jours de plus, et deux jours de plus, c'est le seuil qui tombe pendant qu'on marche.",
  ],
  effets:{ cout:{ endurance:14 },
           marque:"Quatre jours au nord, et rien qu'on puisse rapporter.",
           court:"Rien" },
  choix:[
    { t:"Redescendre et tenir le seuil",
      detail:"quatre cents pas de front · six mille en face",
      risque:'définitif',
      va:() => ouvrirBataille('bat_horde', 'a3_ho_apres',
        [{ type:'lanciers' }, { type:'arbaletriers', effectifPct:0.8 },
         { type:'milice' }, { type:'eclaireurs', effectifPct:0.7 }]) },
    { t:"Leur ouvrir la marche vers l'est",
      detail:"sans savoir · ce qui est la façon dont on décide la plupart du temps",
      risque:'calculé', va:'a3_ho_couloir' },
  ],
},

a3_ho_couloir:{
  qui:null,
  lieu:"La marche humaine · l'est de Trois-Chênes",
  titre:"Un couloir",
  texte:[
    "Ouvrir la marche, ça ne veut pas dire lever une barrière : il n'y a pas de barrière. Ça veut dire aller voir trois maisons et leur dire de ne pas lever d'hommes pendant onze jours.",
    { sobre:"Deux disent oui. La troisième dit non et le dit par écrit.",
      intense:"Deux disent oui — sans enthousiasme, parce qu'on leur a montré le chiffre et qu'un chiffre suffit à convaincre un homme qui compte.\n\nLa troisième dit non, le dit par écrit, et fait porter la lettre à Chastel le jour même.",
      extreme:"Deux disent oui.\n\nSans enthousiasme, sans discours et sans se cacher que ça ne leur plaît pas. On leur a montré le chiffre, et un chiffre suffit toujours à convaincre un homme qui compte : quatre cents pas de front contre six mille, il n'y a pas de deuxième lecture.\n\nLa troisième dit non. Elle le dit par écrit, en trois lignes, et elle fait porter la lettre à Chastel le jour même — pas à vous : à Chastel. C'est un choix, il est délibéré, et il coûtera exactement ce qu'il est fait pour coûter." },
    "§ La colonne passe en onze jours. Elle passe à l'est, elle ne s'arrête pas, et elle ne prend rien.",
    { sobre:"Le onzième soir, quelque chose est posé au seuil de Trois-Chênes.",
      intense:"Le onzième soir, quelque chose est posé au seuil de Trois-Chênes, au milieu du chemin, bien en vue.\n\nCe sont des cornes. Une paire, sciée à la base, très ancienne, d'un animal que personne dans cette province n'a jamais vu vivant.",
      extreme:"Le onzième soir, quelque chose est posé au seuil de Trois-Chênes.\n\nAu milieu du chemin, bien en vue, à l'endroit exact où l'on aurait tenu la ligne. Personne ne l'a vu arriver et personne n'a rien entendu.\n\nCe sont des cornes. Une paire, sciée à la base, très ancienne, polie par des mains — d'un animal que personne dans cette province n'a jamais vu vivant et dont on ne trouve pas le nom dans nos livres.\n\nOn ne sait pas ce que ça veut dire. On sait que ça a été posé et non jeté, et que quelqu'un a fait le chemin en sens inverse pour le poser." },
  ],
  effets:{ flags:['a3_horde_tenu','a3_ho_passee','a3_chastel_averti'],
           exploit:{ eclat:9, temoins:'province',
                     quoi:"six mille sont passés sans qu'on perde un hameau" },
           marque:"La colonne est passée à l'est en onze jours sans rien prendre. Une maison a écrit à Chastel. Des cornes sont posées au seuil.",
           court:"Onze jours" },
  plusTard:"Il n'y a pas eu de bataille, il n'y a pas eu de morts, et c'est très exactement pour ça que personne n'en parlera. Une province ne se souvient que de ce qui a saigné.",
  suite:'a3_retour', libelleSuite:"Rentrer",
},

a3_ho_apres:{ dyn:true, texte:[] },

};

DYN.a3_ho_apres = () => {
  const gagne = ETAT.derniereBataille === 'gagnee';
  const su = a('a3_ho_su');

  SCENES.a3_ho_apres = {
    dyn:true,
    lieu:"Trois-Chênes · au matin",
    titre:gagne ? "Le seuil" : "Ce qui passe",
    texte:[
      gagne
        ? "Le seuil a tenu. La colonne oblique vers l'est à la nuit, sans un cri, comme elle avait descendu — et on met deux jours à comprendre qu'elle serait allée à l'est de toute façon."
        : "Le seuil n'a pas tenu. La colonne passe dans la nuit et continue vers le sud, et il n'y a rien devant elle avant quarante lieues.",
      su
        ? (gagne
            ? "§ Vous êtes le seul à savoir ce que vous venez de repousser : six mille personnes qui n'avaient plus de nord. Vous ne le direz pas. Une province qui vient de gagner n'écoute pas ce genre de chose."
            : "§ Vous êtes le seul à savoir ce que vous venez de ne pas arrêter, et ce que ça veut dire pour Kar-Durak, et personne ne fera le lien avant onze ans.")
        : (gagne
            ? "§ On compte les morts et on ne compte pas ce qui manque. Il n'y a pas un grenier vidé sur onze jours de descente, et le carnet du mort de Chastel le notait deux fois."
            : "§ Personne ne saura jamais pourquoi elles descendaient. Ce genre de question ne se pose pas à une province qui vient de perdre un seuil."),
      gagne
        ? "Cinq hameaux qui n'auraient pas dû exister au printemps existent encore. C'est le compte qu'on tient, et c'est un bon compte."
        : "Trois hameaux de plus dans les six mois. Puis la marche humaine cesse d'avoir une frontière, au sens où l'on employait ce mot.",
    ],
    effets:{ flags:['a3_horde_tenu'],
             marque:gagne ? "Le seuil de Trois-Chênes a tenu. Cinq hameaux existent encore."
                          : "Le seuil est tombé. La marche humaine n'a plus de frontière.",
             court:gagne ? "Cinq hameaux" : "Plus de frontière" },
    suite:'a3_retour', libelleSuite:"Rentrer",
  };
  aller('a3_ho_apres');
};

enregistrerScenes(FRONTS);
entree2('a3_th_khesh', 'a3_th_horde', 'a3_ho_apres');
