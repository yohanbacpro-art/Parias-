/* PARIAS — Ce qu'on dit de vous
 *
 * La Suspicion n'était qu'un compteur qui montait quand on frappait fort et
 * descendait quand on attendait. Elle a maintenant sa propre vie : des
 * événements qui la font monter parce qu'on a été vu, et d'autres qui la font
 * baisser parce qu'on a payé, menti, ou laissé quelqu'un d'autre porter le
 * nom.
 *
 * Format identique aux événements écrits (arbre de scènes). Ce qui change :
 *   requis    { suspicionMin, suspicionMax, … } — la palier décide de l'heure
 *   sens      'hausse' | 'baisse' — sert au tirage, pas au joueur
 *   unique    true : ne se reproduit jamais
 *
 * Règle d'écriture : aucun de ces événements n'est gratuit. On peut toujours
 * faire baisser la Suspicion — en or, en sang, en réputation, ou en laissant
 * faire une chose qu'on préférerait empêcher.
 */

const EVENTS_SUSPICION = [

/* ══════════════════ ON COMMENCE À VOUS CONNAÎTRE (5–35) ══════════════════ */
{
  id:"SU_PORTRAIT", titre:"Un portrait qui ressemble", sens:'hausse',
  image:"evt_traque", requis:{ suspicionMin:12 },
  scenes:{
    start:{
      texte:[
        "Le placard est cloué à hauteur d'homme sur le montant de la porte de l'auberge, et il est neuf : l'encre n'a pas encore bavé sous la pluie. Un visage y est dessiné au trait sec, de trois quarts, par quelqu'un qui savait dessiner.",
        "Ce n'est pas exactement Yohan. Le menton est trop lourd, les cheveux trop courts. Mais la cicatrice est au bon endroit, et le mot sous le dessin ne laisse aucune place au doute : PARIA. Quarante couronnes à qui le mène vivant. La moitié pour le reste.",
        "Trois hommes boivent à deux pas. Aucun n'a levé les yeux."
      ],
      choix:[
        {label:"Arracher l'affiche et partir",
         detail:"Le geste le plus simple, et le plus visible",
         test:{stat:"agi", dc:12}, reussite:"arrache_ok", echec:"arrache_ko"},
        {label:"Ne rien faire et boire son verre",
         detail:"Rester est parfois la seule chose qu'on ne soupçonne pas",
         suite:"reste"},
        {label:"Payer l'aubergiste pour qu'il en décloue d'autres",
         detail:"−60 or · il en reste toujours",
         requis:{or:60}, suite:"achat", effets:{or:-60, suspicion:-8}},
        {label:"Aller trouver le dessinateur",
         detail:"Quelqu'un l'a vu d'assez près pour le dessiner",
         suite:"dessinateur", effets:{suspicion:3}},
      ]
    },
    arrache_ok:{ fin:true,
      texte:["Le papier vient d'un coup, sans bruit, et disparaît sous le manteau avant que personne ait tourné la tête. Il en reste sûrement dix autres cloués entre ici et la vallée, mais celui-ci ne dira rien à personne."],
      effets:{suspicion:-4, xp:8}
    },
    arrache_ko:{ fin:true,
      texte:[
        "Le clou tient mieux que prévu. Le papier se déchire en deux, à mi-hauteur, et le bruit fait se retourner la salle entière.",
        "« Eh », dit l'un des trois hommes, sans se lever. « C'est pas le tien, ça. »",
        "Yohan sort avec la moitié du visage à la main et l'autre moitié toujours clouée derrière lui."
      ],
      effets:{suspicion:9, xp:5}
    },
    reste:{
      texte:[
        "Il commande, il boit, il paie. Personne ne regarde l'affiche parce que personne ne regarde jamais les affiches — c'est le mobilier de la porte, au même titre que le loquet.",
        "En sortant, il constate que l'un des trois hommes est parti avant lui."
      ],
      effets:{suspicion:2},
      choix:[
        {label:"Le suivre", detail:"Jet de Précision (12)",
         test:{stat:"precision", dc:12}, reussite:"suivre_ok", echec:"suivre_ko"},
        {label:"Prendre l'autre route", detail:"On perd du temps, on ne perd pas la tête",
         suite:"detour", effets:{fat:6, suspicion:-3}},
      ]
    },
    suivre_ok:{ fin:true,
      texte:[
        "L'homme marche vite et mal, en regardant deux fois par-dessus son épaule, ce qui est la meilleure façon de se faire suivre. Il s'arrête devant une maison basse, frappe trois coups, et dit un nom à travers la porte.",
        "Ce n'est pas celui de Yohan. C'est celui de la femme qui tient l'auberge."
      ],
      effets:{suspicion:-6, xp:14, flag:"su_denonciateur_connu"}
    },
    suivre_ko:{ fin:true,
      texte:["La rue tourne, se divise, et l'homme n'est plus là. Reste l'impression désagréable d'avoir marché dix minutes en montrant son visage à toute une rue."],
      effets:{suspicion:6}
    },
    detour:{ fin:true,
      texte:["Deux heures de plus par le chemin des bergers, à contourner un village dont on ne connaît personne. C'est le genre de prudence dont on ne saura jamais si elle a servi à quelque chose."]
    },
    achat:{ fin:true,
      texte:[
        "L'aubergiste prend les pièces sans les compter, ce qui veut dire qu'il en a déjà pris d'autres pour la raison inverse.",
        "« Y'en a douze entre ici et le pont », dit-il. « Demain matin y'en aura plus. Après, je sais pas qui les recloue, et je veux pas le savoir. »"
      ]
    },
    dessinateur:{
      texte:[
        "Il tient boutique deux rues plus loin, une échoppe de copiste avec trois pots d'encre et l'odeur de la colle chaude. Il a des mains de vieil homme et des yeux qui ont vu ce qu'il fallait voir.",
        "« Je dessine ce qu'on me décrit », dit-il sans lever la tête. « On m'a décrit un homme brun avec une marque à la joue. Vous voulez que je vous dise qui ? »"
      ],
      choix:[
        {label:"Payer pour le nom", detail:"−120 or",
         requis:{or:120}, suite:"nom_paye", effets:{or:-120, suspicion:-5, flag:"su_commanditaire_connu"}},
        {label:"Payer pour un autre visage", detail:"−200 or · il redessinera, en se trompant",
         requis:{or:200}, suite:"faux_visage", effets:{or:-200, suspicion:-14}},
        {label:"Le laisser à son encre", detail:"Il n'a rien fait d'autre que son travail",
         suite:"parti"},
      ]
    },
    nom_paye:{ fin:true,
      texte:["Il écrit le nom sur une chute de papier, le plie, le pousse du bout du doigt. « Je vous ai pas vu. Vous m'avez rien acheté. » Le nom est celui d'un percepteur de la Couronne, en poste depuis quatre ans dans la vallée."],
      effets:{xp:16}
    },
    faux_visage:{ fin:true,
      texte:[
        "« Un homme brun avec une marque à la joue », répète le copiste, et sa main part toute seule. Le menton s'allonge, le nez casse, la cicatrice descend de trois doigts.",
        "« Voilà. Il y en aura trente comme ça d'ici la fin du mois, et pas un ne vous ressemble. » Il souffle sur l'encre. « Le vôtre, gardez-le pour vous. »"
      ],
      effets:{xp:20, flag:"su_faux_portrait"}
    },
    parti:{ fin:true,
      texte:["Yohan sort. Derrière lui, la plume recommence à gratter le papier, et elle ne s'arrêtera pas."],
      effets:{suspicion:4}
    },
  }
},

{
  id:"SU_ENFANT", titre:"L'enfant qui a vu", sens:'hausse',
  image:"evt_paria", requis:{ suspicionMin:20 },
  scenes:{
    start:{
      texte:[
        "Elle a huit ans peut-être, elle est assise sur le muret depuis un moment, et elle a vu ce qui s'est passé derrière la grange — la lumière bleue, la main levée, l'homme qui est tombé sans qu'on le touche.",
        "Elle ne crie pas. Elle ne court pas. Elle regarde Yohan avec l'attention terrible des enfants qui ont compris quelque chose que les adultes leur cachent.",
        "« C'est toi qui fais la foudre », dit-elle. Ce n'est pas une question."
      ],
      choix:[
        {label:"Lui dire la vérité", detail:"Un enfant garde mal un secret, et se souvient bien",
         suite:"verite"},
        {label:"Lui faire peur", detail:"Efficace. Sale.",
         suite:"peur", effets:{suspicion:-8, renom:-3}},
        {label:"Lui donner une pièce et un mensonge", detail:"−15 or",
         requis:{or:15}, suite:"piece", effets:{or:-15}},
        {label:"Aller parler à sa mère avant elle", detail:"Jet de Volonté (13)",
         test:{stat:"vol", dc:13}, reussite:"mere_ok", echec:"mere_ko"},
      ]
    },
    verite:{ fin:true,
      texte:[
        "« Oui. »",
        "Elle hoche la tête, comme si on venait de lui confirmer que le ciel est bleu. Puis elle dit : « Mon oncle aussi il faisait ça. Ils sont venus le chercher. » Et elle redescend du muret, et elle rentre chez elle.",
        "Il ne saura jamais si elle en a parlé. Il saura, longtemps, qu'elle aurait pu."
      ],
      effets:{suspicion:5, xp:14, flag:"su_enfant_sait"}
    },
    peur:{ fin:true,
      texte:[
        "Il se penche, et il laisse l'Onde monter juste assez pour que l'air sente l'orage autour d'eux deux. Elle recule d'un pas, puis de trois, puis elle court.",
        "Elle ne dira rien à personne. C'est exactement ce qu'il voulait, et il met deux jours à s'en remettre."
      ],
      effets:{fat:8, xp:6}
    },
    piece:{ fin:true,
      texte:[
        "« C'était un tour. Regarde. » Il fait sauter la pièce, la referme dans son poing, ouvre la main vide. La pièce est derrière l'oreille de la petite, et elle rit, et le monde redevient un endroit où les hommes ne font pas la foudre.",
        "Elle repartira en racontant qu'un monsieur fait des tours. C'est une histoire qui voyage moins loin que l'autre."
      ],
      effets:{suspicion:-5, xp:10}
    },
    mere_ok:{ fin:true,
      texte:[
        "La mère écoute, les bras croisés, pendant qu'il explique qu'il y a eu une bagarre derrière la grange et que la petite a pu voir des choses qui font peur.",
        "« Elle raconte des histoires depuis qu'elle sait parler », dit la femme. « Celle-là, elle la racontera aussi. Personne l'écoutera. » Elle marque un temps. « Et vous, partez avant la nuit. »"
      ],
      effets:{suspicion:-10, xp:16}
    },
    mere_ko:{ fin:true,
      texte:[
        "La mère écoute mal, puis pas du tout, puis elle appelle son mari. Le mari appelle son frère. À aucun moment personne ne prononce le mot, mais tout le monde dans la cour l'a en tête.",
        "Yohan repart sous des regards qui l'accompagnent jusqu'au tournant."
      ],
      effets:{suspicion:12}
    },
  }
},

{
  id:"SU_PRETRE", titre:"Le prêtre qui compte les têtes", sens:'hausse',
  image:"evt_traque", requis:{ suspicionMin:30 },
  scenes:{
    start:{
      texte:[
        "Il fait le tour des hameaux avec un registre et deux gardes, et il inscrit les gens : nom, âge, maison, années de présence. La Purge a laissé ce goût-là aux administrations — savoir exactement qui est où, pour savoir tout de suite qui est en trop.",
        "Il lève les yeux vers Yohan. « Vous n'êtes pas d'ici. »"
      ],
      choix:[
        {label:"Donner un nom, un vrai métier, une histoire",
         detail:"Jet de Volonté (14)",
         test:{stat:"vol", dc:14}, reussite:"histoire_ok", echec:"histoire_ko"},
        {label:"Acheter une ligne dans le registre", detail:"−150 or · une identité écrite vaut mieux qu'une identité vraie",
         requis:{or:150}, suite:"achat", effets:{or:-150, suspicion:-16, flag:"su_inscrit_registre"}},
        {label:"Partir avant qu'il ait fini d'écrire", detail:"+Fatigue · on ne discute pas avec un registre",
         suite:"partir", effets:{fat:10, suspicion:6}},
        {label:"Lui demander ce qu'il cherche vraiment",
         detail:"Requiert du Renom · un homme connu peut poser des questions",
         requis:{renomMin:20}, suite:"question"},
      ]
    },
    histoire_ok:{ fin:true,
      texte:[
        "Charretier, de Malbrec, trois ans sur les routes du sel, une femme morte, pas d'enfant. Il le dit sans hésiter et sans détailler, du ton d'un homme qui a répété cette histoire mille fois parce qu'elle est vraie.",
        "Le prêtre écrit. Les gardes bâillent. Le registre avale une identité de plus."
      ],
      effets:{suspicion:-9, xp:14}
    },
    histoire_ko:{ fin:true,
      texte:[
        "Il donne un nom, puis un village, et le prêtre relève la tête : « Malbrec a brûlé il y a six ans. Il n'y a plus de charretiers à Malbrec. »",
        "Le silence dure trop longtemps. La plume ne bouge plus. L'un des gardes s'est déplacé sans qu'on l'entende."
      ],
      effets:{suspicion:14, xp:6}
    },
    achat:{ fin:true,
      texte:[
        "Les pièces passent sous le registre, ce qui est le seul endroit où le prêtre acceptait de les voir.",
        "« Anselme Vaury, journalier, deux ans de présence », dit-il en écrivant. « Vous existez. Tâchez de ne pas me faire regretter que vous existiez. »"
      ],
      effets:{xp:12}
    },
    partir:{ fin:true,
      texte:["Il tourne les talons au milieu d'une phrase, et il entend derrière lui la plume qui s'arrête, puis reprend. Ce qui vient d'être écrit n'est pas un nom : c'est une remarque."]
    },
    question:{ fin:true,
      texte:[
        "« Ce que je cherche ? » Le prêtre referme son registre sur son doigt. « Des trous. Des maisons où il manque un fils. Des villages où l'on compte quinze personnes et où l'on en nourrit seize. »",
        "Il regarde Yohan longuement. « Les Parias ne se cachent pas dans les bois, contrairement à ce qu'on raconte. Ils se cachent dans les familles. Et les familles mentent très mal. »"
      ],
      effets:{xp:18, suspicion:2, flag:"su_methode_registres"}
    },
  }
},

/* ══════════════════ ON VOUS CHERCHE (35–70) ══════════════════ */
{
  id:"SU_RABATTEUR", titre:"Le rabatteur", sens:'baisse',
  image:"evt_traque", requis:{ suspicionMin:35 },
  scenes:{
    start:{
      texte:[
        "Il s'assoit en face sans demander, pose ses deux mains à plat sur la table pour montrer qu'elles sont vides, et parle bas.",
        "« Je travaille pour ceux qui vous cherchent. Je suis payé à la piste, pas à la prise. » Il fait tourner une chope qu'il n'a pas commandée. « Une piste vaut trente couronnes. Une fausse piste, c'est le même prix pour moi. »"
      ],
      choix:[
        {label:"Acheter une fausse piste", detail:"−250 or · ils chercheront trois semaines dans la mauvaise vallée",
         requis:{or:250}, suite:"achat", effets:{or:-250, suspicion:-20}},
        {label:"Lui acheter la liste de ce qu'ils savent", detail:"−400 or",
         requis:{or:400}, suite:"liste", effets:{or:-400, suspicion:-10, flag:"su_liste_traqueurs"}},
        {label:"Refuser — et le laisser vivre", detail:"Il repartira vendre ce qu'il a vu ici",
         suite:"refus", effets:{suspicion:8}},
        {label:"Refuser autrement", detail:"Il n'y a pas de bonne façon de faire ça",
         suite:"autre"},
      ]
    },
    achat:{ fin:true,
      texte:[
        "L'homme empoche, se lève, et devient soudain très bavard : il racontera un homme brun aperçu sur la route du nord, avec une femme et un chariot, il donnera trois noms d'auberge et une date.",
        "« Ils vont y aller », dit-il. « Ils y vont toujours. C'est bien pour ça qu'on me paie. »"
      ],
      effets:{xp:16}
    },
    liste:{ fin:true,
      texte:[
        "Ce qu'ils savent tient sur deux feuillets, et c'est plus qu'il n'aurait voulu : la vallée, à peu près ; l'âge, à trois ans près ; la cicatrice ; un compagnonnage avec un nain ; et surtout la mention, deux fois soulignée, d'un intérêt de la maison de Varenne.",
        "Ce dernier mot vaut à lui seul les quatre cents couronnes."
      ],
      effets:{xp:24}
    },
    refus:{ fin:true,
      texte:["« Comme vous voulez. » Il finit la chope qu'il n'a pas commandée et s'en va d'un pas tranquille. Ce qu'il vient de voir vaut trente couronnes, et il ira les toucher avant la fin de la semaine."]
    },
    autre:{ fin:true,
      texte:["Il n'y a pas de bonne façon de faire ça. Il y a une ruelle, une main sur une bouche, et un homme qui ne rapportera rien à personne.", "Yohan met deux jours à cesser de revoir ses deux mains posées à plat sur la table."],
      effets:{suspicion:-12, renom:-6, fat:10, flag:"su_rabatteur_mort"}
    },
  }
},

{
  id:"SU_FAUX_PARIA", titre:"Un autre porte le nom", sens:'baisse',
  image:"evt_paria", requis:{ suspicionMin:40 },
  scenes:{
    start:{
      texte:[
        "Ils l'ont pris ce matin sur la place. Un homme de vingt-cinq ans, maigre, terrorisé, qui n'a jamais fait tomber personne d'un geste de la main et qui a le malheur d'avoir une marque de naissance sur la joue gauche.",
        "La foule y croit. Les gardes aussi, à peu près. Le sergent de la Couronne, lui, sait très bien que ce n'est pas lui — mais il a un rapport à rendre et une prime à toucher.",
        "Si on le laisse pendre, plus personne ne cherchera de Paria dans cette vallée avant longtemps."
      ],
      choix:[
        {label:"Le laisser porter le nom", detail:"−25 Suspicion · et il meurt à votre place",
         suite:"laisser", effets:{suspicion:-25, renom:-10, reputation:{parias:-14}, flag:"su_innocent_pendu"}},
        {label:"Payer sa rançon au sergent", detail:"−500 or · un rapport peut se réécrire",
         requis:{or:500}, suite:"rancon", effets:{or:-500, suspicion:-6, reputation:{humains:4}}},
        {label:"Le sortir de là, de nuit et sans bruit", detail:"Jet d'Agilité (15)",
         test:{stat:"agi", dc:15}, reussite:"evasion_ok", echec:"evasion_ko"},
        {label:"Se montrer, et faire la démonstration", detail:"Ils sauront qui est le vrai · très cher en visibilité",
         suite:"montrer", effets:{suspicion:22, renom:12, reputation:{parias:18}}},
      ]
    },
    laisser:{ fin:true,
      texte:[
        "Il regarde depuis le fond de la place, le capuchon relevé, et il ne bouge pas. Ça dure moins longtemps qu'on ne croit.",
        "Le soir même, un courrier part vers la capitale annonçant que le Paria de la vallée a été pris et exécuté. Pendant six mois, personne ne cherchera plus rien ici.",
        "Il y a des choses qu'on achète avec de l'or, et d'autres qu'on achète autrement."
      ],
      effets:{xp:12}
    },
    rancon:{ fin:true,
      texte:[
        "Le sergent compte les pièces deux fois, ce qui est le signe d'un homme honnête à sa manière.",
        "« Erreur d'identification », dit-il en déchirant la première page de son rapport. « Ça arrive plus souvent qu'on croit. » Le garçon est relâché à l'aube, sans un mot, et il court sans se retourner.",
        "La Couronne, elle, continuera de chercher."
      ],
      effets:{xp:20}
    },
    evasion_ok:{ fin:true,
      texte:[
        "Un toit, une lucarne, un verrou qui cède sous la lame, et un garçon qu'il faut porter les cinquante premiers pas parce que ses jambes ne le tiennent plus.",
        "À l'aube, la cellule est vide et le sergent a un problème. Le rapport dira ce qu'il pourra : un Paria qui s'évade d'une cellule fermée, ça se raconte."
      ],
      effets:{xp:26, suspicion:5, reputation:{parias:10}, flag:"su_evasion_reussie"}
    },
    evasion_ko:{ fin:true,
      texte:[
        "Le verrou tient, le chien aboie, et il faut redescendre du toit plus vite qu'on n'y est monté.",
        "Le garçon est pendu le lendemain, et cette fois il y a en plus la certitude, dans toute la vallée, que quelqu'un a essayé de le faire sortir."
      ],
      effets:{suspicion:16, renom:-4, fat:12}
    },
    montrer:{ fin:true,
      texte:[
        "Il monte sur la margelle du puits, au milieu de la place, et il lève la main.",
        "L'air se met à sentir l'orage. La corde du gibet prend feu à mi-hauteur, proprement, sans que rien d'autre ne brûle. Deux cents personnes voient exactement la même chose au même instant, et deux cents personnes en parleront pour le restant de leur vie.",
        "Le garçon est libre. Yohan ne l'est plus du tout."
      ],
      effets:{xp:30, fat:20, flag:"su_demonstration_publique"}
    },
  }
},

{
  id:"SU_MEDECIN", titre:"Le médecin des pauvres", sens:'baisse',
  image:"evt_paria", requis:{ suspicionMin:25 },
  scenes:{
    start:{
      texte:[
        "Il soigne à l'arrière d'une remise, pour rien, ceux que les barbiers-chirurgiens de la ville ne recevraient pas. Il a des mains sales et des instruments propres, ce qui est l'inverse de tous ses confrères.",
        "« Vous êtes venu pour le bras », dit-il sans lever les yeux, « ou pour l'autre chose ? »",
        "Il pose son couteau. « Parce que la brûlure que vous avez à l'intérieur du poignet, j'en ai vu quatre dans ma vie. Trois appartenaient à des gens qui sont morts pendus. »"
      ],
      choix:[
        {label:"Le laisser vous soigner et se taire", detail:"Il sait déjà · le reste dépend de lui",
         suite:"soigne"},
        {label:"L'acheter", detail:"−180 or · un homme qui soigne gratuitement a des dettes",
         requis:{or:180}, suite:"achete", effets:{or:-180, suspicion:-12}},
        {label:"Lui proposer autre chose que de l'or",
         detail:"Sa remise manque de tout · +Réputation, −Suspicion à retardement",
         suite:"echange", effets:{suspicion:-8, reputation:{parias:8, humains:5}}},
        {label:"Partir immédiatement", detail:"Il reste un homme qui a vu la marque",
         suite:"fuite", effets:{suspicion:7}},
      ]
    },
    soigne:{ fin:true,
      texte:[
        "Il recoud sans parler, serre le bandage, essuie ses mains. Puis, au moment où Yohan passe la porte :",
        "« Le quatrième n'est pas mort. Il tient une forge à Thal-Varen et il porte des manches longues même en été. » Il range son fil. « Ce que je veux dire, c'est que ça se fait. »"
      ],
      effets:{pv:14, xp:14, suspicion:-4, flag:"su_medecin_allie"}
    },
    achete:{ fin:true,
      texte:["L'or disparaît dans une boîte à instruments. « Ça paiera l'opium pour l'hiver », dit-il. « Et pour ce qui est de ce que j'ai vu : je vois soixante bras par semaine, monsieur. Je ne me souviens d'aucun. »"],
      effets:{pv:10, xp:10, flag:"su_medecin_allie"}
    },
    echange:{ fin:true,
      texte:[
        "Deux jours à porter, à charger, à ramener d'une ville voisine ce qui manquait : de la toile, de l'alcool, du fil, une seconde table.",
        "Le troisième jour, la remise reçoit douze personnes au lieu de quatre, et douze personnes verront un homme qui aide le médecin des pauvres. Aucune ne verra un Paria. C'est ainsi qu'on se cache le mieux : en étant vu en train de faire autre chose."
      ],
      effets:{xp:18, fat:8, flag:"su_medecin_allie"}
    },
    fuite:{ fin:true,
      texte:["Il sort sans se faire soigner, le bras toujours ouvert sous la manche. Derrière lui, un homme qui n'a rien demandé se retrouve avec un secret qu'il n'a pas choisi."]
    },
  }
},

/* ══════════════════ CHASSE OUVERTE (70+) ══════════════════ */
{
  id:"SU_CORDON", titre:"Le cordon", sens:'hausse',
  image:"evt_traque", requis:{ suspicionMin:65 },
  scenes:{
    start:{
      texte:[
        "Ils ne cherchent plus un homme : ils ferment une vallée. Deux compagnies de la Couronne tiennent les trois routes, on fouille les charrettes, on compte les gens à l'entrée et à la sortie des villages.",
        "Ce n'est plus une prime, c'est une opération. Quelqu'un, quelque part, a signé un ordre et débloqué de l'argent.",
        "Le cordon se resserre d'un village par jour."
      ],
      choix:[
        {label:"Passer par la montagne", detail:"Jet d'Agilité (15) · trois jours de rocaille",
         test:{stat:"agi", dc:15}, reussite:"montagne_ok", echec:"montagne_ko", effets:{fat:14}},
        {label:"Se faire passer pour un des leurs", detail:"Jet de Volonté (16)",
         test:{stat:"vol", dc:16}, reussite:"uniforme_ok", echec:"uniforme_ko"},
        {label:"Acheter le passage à un officier", detail:"−700 or",
         requis:{or:700}, suite:"achat", effets:{or:-700, suspicion:-18}},
        {label:"Rester, et laisser le cordon se refermer sur rien",
         detail:"Ne rien faire pendant qu'on vous cherche · coûteux en nerfs",
         suite:"attendre", effets:{fat:18, suspicion:-10}},
      ]
    },
    montagne_ok:{ fin:true,
      texte:["Trois jours de pierre, de vent et d'eau glacée, et un col que les cartes de la Couronne ne mentionnent pas parce que personne de sensé ne le prend. Il redescend de l'autre côté, sale, vidé, et hors du filet."],
      effets:{suspicion:-22, xp:20}
    },
    montagne_ko:{ fin:true,
      texte:["Le col est tenu. Ils ne sont que quatre, ils ont froid, ils ne s'attendaient à personne — mais ils sont quatre, et il faut redescendre par où l'on est monté en les laissant faire leur rapport."],
      effets:{suspicion:10, fat:12, xp:10}
    },
    uniforme_ok:{ fin:true,
      texte:[
        "Un manteau pris sur une corde à linge, une hallebarde ramassée contre un mur, et l'aplomb de traverser le poste de contrôle en engueulant un sergent sur la lenteur des fouilles.",
        "On lui répond « oui, monsieur ». On lui ouvre la barrière. Il continue de marcher pendant deux lieues sans respirer normalement."
      ],
      effets:{suspicion:-20, xp:24}
    },
    uniforme_ko:{ fin:true,
      texte:["Le manteau n'est pas de la bonne compagnie. Un caporal le remarque avant même de regarder le visage, et la seule sortie passe par un fossé, une haie, et une demi-journée à plat ventre dans l'eau."],
      effets:{suspicion:14, fat:16, pv:-10}
    },
    achat:{ fin:true,
      texte:[
        "L'officier prend l'argent dans le noir, sans compter, et regarde ailleurs pendant très exactement le temps qu'il faut.",
        "« Le cordon tient jusqu'à la Saint-Aubin », dit-il quand même. « Après, ils redéploient au nord. Vous avez neuf jours. »"
      ],
      effets:{xp:14, flag:"su_officier_achete"}
    },
    attendre:{ fin:true,
      texte:[
        "Il ne bouge pas. Il dort dans une cave, mange ce qu'on lui descend, et écoute pendant onze jours des bottes passer au-dessus de sa tête.",
        "Le cordon se referme, ne trouve rien, et se défait. Un rapport partira disant que le Paria a quitté la vallée depuis longtemps. Yohan sort d'une cave avec l'impression d'avoir vieilli de deux ans."
      ],
      effets:{xp:18}
    },
  }
},

{
  id:"SU_MARCHE", titre:"On vous offre un marché", sens:'baisse',
  image:"evt_traque", requis:{ suspicionMin:70 },
  scenes:{
    start:{
      texte:[
        "L'homme attend au bout de la jetée, seul, sans arme visible, avec la certitude tranquille de ceux qui ne sont jamais seuls.",
        "« Vous êtes fatigant à chercher », dit-il. « Alors on va arrêter. Ma maison peut faire disparaître votre nom des registres, éteindre la prime et rappeler deux compagnies. En trois semaines, vous n'existez plus. »",
        "Il laisse le silence faire son travail. « En échange, quand nous vous appellerons, vous viendrez. »"
      ],
      choix:[
        {label:"Accepter", detail:"−40 Suspicion · et une dette qu'on vous rappellera",
         suite:"accepte", effets:{suspicion:-40, flag:"su_dette_maison", reputation:{humains:8, parias:-10}}},
        {label:"Refuser", detail:"Refuser un marché, c'est en devenir un",
         suite:"refuse", effets:{suspicion:10, renom:6}},
        {label:"Demander le nom de la maison", detail:"Jet de Précision (14)",
         test:{stat:"precision", dc:14}, reussite:"nom_ok", echec:"nom_ko"},
        {label:"Négocier autre chose que soi", detail:"Requiert du Renom · on ne marchande qu'avec ce qu'on a",
         requis:{renomMin:40}, suite:"negocie", effets:{suspicion:-22, or:-800}},
      ]
    },
    accepte:{ fin:true,
      texte:[
        "Il n'y a pas de papier, pas de sceau, pas de témoin. Il y a une phrase dite à voix basse au bout d'une jetée, et c'est amplement suffisant.",
        "Trois semaines plus tard, les placards ont disparu des portes d'auberge. Les compagnies sont reparties vers le nord. Un homme brun avec une marque à la joue peut de nouveau traverser un village sans qu'on lève la tête.",
        "Un jour, on l'appellera. Ce jour-là, il n'aura pas le choix, et il le sait déjà."
      ],
      effets:{xp:20}
    },
    refuse:{ fin:true,
      texte:[
        "« Non. »",
        "L'homme hoche la tête, comme si c'était la réponse attendue et qu'elle ne changeait pas grand-chose. « Alors nous continuerons de vous chercher, et un jour nous vous trouverons, et ce jour-là il n'y aura plus d'offre. »",
        "Il s'en va. Il ne se retourne pas. C'est la partie la plus désagréable."
      ],
      effets:{xp:16}
    },
    nom_ok:{
      texte:[
        "Il y a une bague, sous le gant, dont la forme se devine — et un pli d'habitude, dans la façon dont l'homme tient les mains derrière le dos, qu'on ne prend qu'en servant une maison qui exige la tenue.",
        "Varenne. Ce n'est pas la Couronne qui le traque : c'est une duchesse qui le collectionne."
      ],
      effets:{xp:24, flag:"su_varenne_derriere"},
      choix:[
        {label:"Accepter, maintenant qu'on sait", detail:"−40 Suspicion",
         suite:"accepte", effets:{suspicion:-40, flag:"su_dette_maison"}},
        {label:"Refuser en connaissance de cause", suite:"refuse", effets:{suspicion:8}},
      ]
    },
    nom_ko:{
      texte:["Rien. Pas une bague, pas un accent, pas un pli. L'homme a été choisi précisément pour ne rien laisser lire, et il attend la réponse avec une patience de fonctionnaire."],
      choix:[
        {label:"Accepter", suite:"accepte", effets:{suspicion:-40, flag:"su_dette_maison"}},
        {label:"Refuser", suite:"refuse", effets:{suspicion:10}},
      ]
    },
    negocie:{ fin:true,
      texte:[
        "« Ma personne n'est pas à vendre. Mon bras l'est, à la pièce, et il coûte cher. »",
        "L'homme sourit pour la première fois. On ne signe rien, on ne promet rien : on paie huit cents couronnes pour trois interventions d'écritures dans des registres, et le nom s'efface à moitié.",
        "Ce n'est pas une dette. C'est une relation d'affaires, ce qui est plus cher et beaucoup plus sûr."
      ],
      effets:{xp:26, renom:8, flag:"su_affaires_maison"}
    },
  }
},

/* ══════════════════ CE QUI FAIT BAISSER, TRANQUILLEMENT ══════════════════ */
{
  id:"SU_MOISSON", titre:"Deux semaines aux moissons", sens:'baisse',
  image:"evt_paria", requis:{ suspicionMin:15 },
  scenes:{
    start:{
      texte:[
        "La ferme manque de bras et ne pose pas de questions : c'est la définition même d'un bon endroit.",
        "Quatorze jours à faucher, lier, charger, dormir dans la grange et manger à la table commune. Personne ne demande d'où vient l'homme silencieux qui travaille pour la nourriture — dans ce pays, la moitié des journaliers vient d'un endroit dont ils ne parlent pas."
      ],
      choix:[
        {label:"Faire les deux semaines entières",
         detail:"Du temps perdu, un visage oublié",
         suite:"complet"},
        {label:"Une semaine, puis reprendre la route",
         detail:"Moitié moins de temps, moitié moins d'effet",
         suite:"moitie"},
        {label:"Se servir de l'Onde pour aller plus vite",
         detail:"Trois jours au lieu de quatorze · et quatorze témoins",
         requis:{pouvoir:"foudre"}, suite:"onde"},
      ]
    },
    complet:{ fin:true,
      texte:[
        "Il apprend le nom des chiens, la façon dont le vieux tient sa faux, et à quel moment exact la fille aînée sert la soupe. Il ne dit presque rien pendant deux semaines et c'est la période la plus reposante depuis des mois.",
        "En partant, on lui donne du pain et un chapeau. Personne dans cette vallée ne se souviendra de lui, et c'est exactement ce qu'il était venu chercher."
      ],
      effets:{suspicion:-18, fat:-20, or:40, xp:8}
    },
    moitie:{ fin:true,
      texte:["Sept jours, la moitié du champ, et une paie honnête. Il repart avant qu'on ait eu le temps de s'habituer à lui — ce qui, tout compte fait, est la même chose que ne pas être venu."],
      effets:{suspicion:-9, fat:-10, or:20, xp:4}
    },
    onde:{ fin:true,
      texte:[
        "Le champ est fauché en trois jours par un homme seul, et personne dans la ferme ne comprend comment, mais tout le monde a une idée.",
        "Le vieux le paie quand même. Il le paie en le regardant dans les yeux, et il dit : « Partez ce soir. » Ce n'est pas de l'hostilité, c'est de la prudence, et c'est pire."
      ],
      effets:{suspicion:12, fat:16, or:60, xp:12}
    },
  }
},

{
  id:"SU_CONFESSION", titre:"Celui qui savait déjà", sens:'baisse',
  image:"evt_paria", requis:{ suspicionMin:20, reputationMin:{ parias:10 } },
  scenes:{
    start:{
      texte:[
        "Ils sont quatre dans la cave, et ils attendaient depuis un moment. Pas des soldats : un tonnelier, deux femmes, un garçon de quinze ans. Des gens qui ont tous perdu la même chose au même moment.",
        "« On sait qui vous êtes », dit le tonnelier. « On le sait depuis le début de l'été. On n'a rien dit à personne et on ne dira rien. »",
        "Il pose une main sur la table. « Mais on aimerait savoir ce que vous comptez faire. Parce que nous, on a des enfants, et si vous vous faites prendre dans cette vallée, c'est nous qu'on interrogera. »"
      ],
      choix:[
        {label:"Leur dire la vérité, entièrement",
         detail:"Un réseau qui sait est un réseau qui protège",
         suite:"verite", effets:{suspicion:-14, reputation:{parias:12}, flag:"su_reseau_vallee"}},
        {label:"Leur promettre de partir", detail:"−Suspicion, et un lieu de moins où revenir",
         suite:"partir", effets:{suspicion:-10, fat:8}},
        {label:"Leur demander de l'aide", detail:"Jet de Volonté (13)",
         test:{stat:"vol", dc:13}, reussite:"aide_ok", echec:"aide_ko"},
        {label:"Nier jusqu'au bout", detail:"Ils n'y croiront pas, et ils cesseront de couvrir",
         suite:"nie", effets:{suspicion:9, reputation:{parias:-8}}},
      ]
    },
    verite:{ fin:true,
      texte:[
        "Il parle une heure. La Purge, Karlsberg, l'Onde, ce qu'il cherche et pourquoi. Personne ne l'interrompt.",
        "À la fin, la plus âgée des deux femmes dit simplement : « Ma sœur est morte dans la grange de Vaubien en l'an dix-sept. » Puis, après un silence : « Vous logerez chez moi quand vous repasserez. »",
        "Il y a désormais quatre personnes dans cette vallée qui mentiront pour lui sans qu'on ait besoin de le leur demander."
      ],
      effets:{xp:22}
    },
    partir:{ fin:true,
      texte:["Il promet, et il tient : trois jours plus tard il est à quinze lieues. Le tonnelier avait raison — c'était la demande d'un homme raisonnable, et c'est aussi la fin d'un endroit où il aurait pu revenir."],
      effets:{xp:10}
    },
    aide_ok:{ fin:true,
      texte:[
        "Ce qu'il demande est modeste et c'est pour ça que ça marche : une cave, un nom d'emprunt tenu par quatre bouches, et quelqu'un pour dire au prévôt qu'on a vu passer un homme brun sur la route de l'ouest.",
        "Le garçon de quinze ans se propose pour le mensonge. Il le fera très bien."
      ],
      effets:{suspicion:-20, reputation:{parias:14}, xp:20, flag:"su_reseau_vallee"}
    },
    aide_ko:{ fin:true,
      texte:["Le tonnelier écoute, puis secoue la tête. « On vous couvre. On ne travaille pas pour vous. Ce n'est pas la même chose et je ne veux pas que ça le devienne. » C'est un refus honnête, et il n'y a rien à répondre."],
      effets:{suspicion:-4, xp:8}
    },
    nie:{ fin:true,
      texte:[
        "Il nie calmement, avec des mots simples, et il voit dans leurs yeux le moment exact où ils cessent de le croire — et, juste après, le moment où ils cessent de vouloir le protéger.",
        "Le tonnelier se lève le premier. « Alors on s'est trompés. Bonne route. »"
      ],
      effets:{xp:6}
    },
  }
},

{
  id:"SU_TAVERNE", titre:"L'histoire qu'on raconte", sens:'hausse',
  image:"evt_paria", requis:{ suspicionMin:18 },
  scenes:{
    start:{
      texte:[
        "Le conteur travaille bien : il fait taire la salle avant de commencer, et il a le sens du moment où l'on jette une bûche dans le feu.",
        "L'histoire qu'il raconte ce soir est celle d'un homme qui traverse les vallées, qui prend l'argent des puissants et qui fait tomber les hommes d'un geste. Il l'appelle « le Loup de Karlsberg ». La salle adore.",
        "Il y a trois détails dans son récit que seules quatre personnes vivantes peuvent connaître."
      ],
      choix:[
        {label:"Le laisser finir et payer sa tournée",
         detail:"Une légende bien racontée protège l'homme qui la vit",
         suite:"laisse", effets:{or:-30, renom:8, suspicion:6}},
        {label:"L'interrompre et corriger l'histoire",
         detail:"Jet de Volonté (13) · faire de la légende quelque chose d'inoffensif",
         test:{stat:"vol", dc:13}, reussite:"corrige_ok", echec:"corrige_ko"},
        {label:"Attendre la fin et lui demander où il a entendu ça",
         detail:"Trois détails ne se devinent pas",
         suite:"source", effets:{suspicion:3}},
        {label:"Sortir avant la fin", detail:"L'histoire continuera sans lui, et elle grandira",
         suite:"sort", effets:{suspicion:8, renom:4}},
      ]
    },
    laisse:{ fin:true,
      texte:[
        "Il paie la tournée du conteur comme n'importe quel client content, et il écoute la fin d'une histoire dont il est le sujet en hochant la tête aux bons endroits.",
        "Le Loup de Karlsberg fait deux têtes de plus que lui et ne saigne jamais. Tant mieux : plus la légende est grande, moins elle ressemble à l'homme assis au fond."
      ],
      effets:{xp:12}
    },
    corrige_ok:{ fin:true,
      texte:[
        "« C'est pas comme ça. » La salle se tourne. « Moi j'y étais, à Vaubien. Le type était petit, il puait, et il s'est enfui en laissant la bourse. »",
        "Il raconte dix minutes d'une histoire médiocre où le héros a peur, se trompe et gagne mal. Personne n'applaudit. Le conteur le déteste. C'est parfait : une légende qui ennuie est une légende qui meurt."
      ],
      effets:{suspicion:-14, renom:-6, xp:16}
    },
    corrige_ko:{ fin:true,
      texte:[
        "Il l'interrompt et se rend compte, à la troisième phrase, qu'il en sait trop et qu'il vient de le montrer à quarante personnes.",
        "« Et vous savez ça comment, vous ? » demande quelqu'un au fond. La question reste dans la salle bien après que Yohan en soit sorti."
      ],
      effets:{suspicion:16, xp:6}
    },
    source:{ fin:true,
      texte:[
        "Le conteur boit, s'essuie la bouche, et n'a aucune raison de mentir : « Un homme de Varenne. Il paie pour que je la raconte dans les auberges de la vallée. Deux couronnes par soir. »",
        "Quelqu'un est en train de fabriquer une légende, exprès, et il paie pour ça. Reste à savoir si c'est pour le rendre populaire ou pour le rendre repérable."
      ],
      effets:{xp:20, flag:"su_legende_fabriquee"}
    },
    sort:{ fin:true,
      texte:["Il sort au milieu d'une phrase, dans le froid, pendant que quarante personnes apprennent son histoire par cœur. Elle sera à trois vallées d'ici avant la fin du mois."]
    },
  }
},

{
  id:"SU_DELATION", titre:"Celui qui vous a vendu", sens:'hausse',
  image:"evt_traque", requis:{ suspicionMin:45 },
  scenes:{
    start:{
      texte:[
        "On l'apprend par hasard, comme toujours : une phrase de trop chez un maréchal-ferrant, un nom qui revient deux fois.",
        "L'homme qui a parlé n'est pas un ennemi. C'est un aubergiste chez qui Yohan a dormi trois nuits l'hiver dernier, qui a une femme malade et qui avait besoin de quarante couronnes plus qu'il n'avait besoin de sa tranquillité.",
        "Il est chez lui, en ce moment, à deux rues."
      ],
      choix:[
        {label:"Aller lui parler", detail:"Jet de Volonté (13) · il pourrait encore servir",
         test:{stat:"vol", dc:13}, reussite:"parle_ok", echec:"parle_ko"},
        {label:"Le payer plus cher qu'eux", detail:"−300 or · un homme qui se vend se rachète",
         requis:{or:300}, suite:"rachat", effets:{or:-300, suspicion:-14}},
        {label:"Ne rien faire", detail:"Il recommencera",
         suite:"rien", effets:{suspicion:10}},
        {label:"Régler la question", detail:"Définitivement · et tout le quartier comprendra pourquoi",
         suite:"regle", effets:{suspicion:-6, renom:-8, reputation:{humains:-10}, flag:"su_delateur_mort"}},
      ]
    },
    parle_ok:{ fin:true,
      texte:[
        "Il ne l'accuse pas. Il s'assoit, demande des nouvelles de la femme, écoute la réponse, et attend.",
        "L'aubergiste craque au bout de quatre minutes. Il pleure, il explique, il propose de rendre l'argent qu'il a déjà dépensé en remèdes.",
        "« Gardez-le », dit Yohan. « Et la prochaine fois qu'ils reviennent, dites-leur que je suis parti vers le sud. »"
      ],
      effets:{suspicion:-16, xp:20, flag:"su_aubergiste_retourne"}
    },
    parle_ko:{ fin:true,
      texte:[
        "Il s'assoit, et l'aubergiste comprend immédiatement pourquoi. La panique fait le reste : l'homme hurle avant même qu'on lui ait rien demandé, et deux voisins sortent sur le pas de leur porte.",
        "Il faut partir vite, et tout le monde dans la rue sait maintenant qu'il y avait une raison de hurler."
      ],
      effets:{suspicion:14, fat:8}
    },
    rachat:{ fin:true,
      texte:[
        "Trois cents couronnes, c'est sept fois ce qu'ils lui ont donné, et l'aubergiste les regarde comme on regarde une porte de sortie.",
        "« Ils repassent tous les mois », dit-il enfin. « Je leur dirai ce que vous voudrez. » C'est un homme qu'on a acheté deux fois : il se vendra une troisième. Mais pas cette saison."
      ],
      effets:{xp:14, flag:"su_aubergiste_retourne"}
    },
    rien:{ fin:true,
      texte:["Il n'y va pas. Il change d'auberge, de route, d'habitudes. Quelque part derrière lui, un homme continue de raconter à des gens qui paient tout ce dont il se souvient."]
    },
    regle:{ fin:true,
      texte:[
        "C'est rapide et ça ne ressemble à rien de ce qu'on raconte dans les histoires.",
        "L'aubergiste ne parlera plus. Sa femme, elle, parlera beaucoup, et tout un quartier saura qu'on ne dénonce pas impunément — ce qui protège Yohan, et le rend exactement aussi effrayant que ce qu'ils disent de lui."
      ],
      effets:{xp:10, fat:6}
    },
  }
},

];
