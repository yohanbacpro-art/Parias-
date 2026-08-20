/* PARIAS — Événements de trame
 *
 * Ce sont les jalons de la quête principale. Contrairement aux autres, ils ne se
 * tirent pas en explorant : ils se DÉBLOQUENT, et se déclenchent d'eux-mêmes à la
 * fin d'un tour dès que leurs conditions sont réunies — le temps qui passe fait
 * avancer l'histoire, même quand Yohan ne cherche rien.
 *
 * Un seul se déclenche par fin de tour, dans l'ordre du tableau : le premier
 * débloqué non encore joué. Ils posent des marqueurs dont les suivants dépendent,
 * ce qui garantit l'enchaînement.
 *
 * Conditions (`requis`) : chapitreMin, sangMin, niveauMin, suspicionMin,
 * compagnon, flags:[…], sansFlags:[…] — voir conditionsRemplies() dans
 * src/events_runner.js.
 */

const EVENTS_TRAME = [

/* ══════════ 1 · quelqu'un cherchait déjà ══════════ */
{
  id:"TR_01_COURRIER", titre:"Le courrier qui n'est jamais arrivé", famille:"PARIA", rarete:"rare",
  image:"tr_courrier",
  requis:{ sangMin:8, sansFlags:["tr_01_fait"] },
  scenes:{
    start:{
      pnj:"perrin",
      texte:[
        "L'homme est mort depuis deux jours au bord du chemin, et ce n'est pas ce qui retient Yohan : c'est la sacoche de courrier, intacte, que personne n'a pris la peine de fouiller. On l'a tué pour l'empêcher d'arriver, pas pour ce qu'il portait.",
        "Une seule lettre à l'intérieur. Le sceau a brûlé — délibérément, au moment de la fermeture, ce qui est une manière de dire *ceci ne doit pas être identifié*.",
        "Le texte tient en trois lignes : « Il est vivant. Il porte les armes de son père. Ne le cherchez plus par le nom, cherchez-le par la Fatigue. »"
      ],
      choix:[
        {label:"Comprendre ce que veut dire « par la Fatigue »", detail:"Jet de Précision (12) · c'est une méthode, pas une image",
         test:{stat:"precision", dc:12}, reussite:"methode_ok", echec:"methode_ko"},
        {label:"Chercher à qui la lettre était destinée", detail:"Jet de Précision (13)",
         test:{stat:"precision", dc:13}, reussite:"destinataire_ok", echec:"destinataire_ko"},
        {label:"Brûler la lettre et enterrer le courrier", detail:"Ne rien apprendre · ne rien laisser derrière",
         suite:"brule", effets:{suspicion:-8, xp:14}},
      ]
    },
    methode_ok:{
      texte:[
        "Yohan relit la phrase et le sang lui descend d'un coup. *Cherchez-le par la Fatigue.* Ce n'est pas une métaphore : quelqu'un a compris que l'Onde laisse une trace mesurable après usage, et qu'un Paria épuisé est repérable pendant des jours.",
        "Cela veut dire que chaque fois qu'il a utilisé son pouvoir, il a laissé un sillage. Cela veut dire qu'on ne le traque pas au hasard depuis un moment.",
        "Il replie la lettre et la garde. Ce qu'elle contient vaut plus qu'un contrat : c'est la première fois qu'il voit comment on le chasse."
      ],
      effets:{sang:12, xp:30, flags:["tr_01_fait","sait_traque_fatigue"]},
      fin:true
    },
    methode_ko:{
      texte:[
        "Yohan tourne la phrase dans tous les sens et n'en tire qu'un malaise. *Par la Fatigue.* Une menace, sans doute, ou une manière de dire qu'on l'attendra au bout de l'épuisement.",
        "Il garde la lettre. Un jour elle voudra dire quelque chose."
      ],
      effets:{sang:6, xp:12, flag:"tr_01_fait"},
      fin:true
    },
    destinataire_ok:{
      texte:[
        "La sacoche porte une numérotation de relais. Yohan remonte la route à l'envers sur une demi-journée et trouve le poste où le courrier a été chargé.",
        "Le registre est tenu proprement : la lettre partait vers le sud, vers un destinataire enregistré sous trois lettres seulement — **L.F.A.**",
        "Le nom ne lui dit rien aujourd'hui. Il le reconnaîtra plus tard, et ce jour-là il regrettera de ne pas avoir eu peur plus tôt."
      ],
      effets:{sang:10, xp:26, flags:["tr_01_fait","initiales_lfa"]},
      fin:true
    },
    destinataire_ko:{
      texte:[
        "Le relais a brûlé trois semaines plus tôt. On ne remonte pas une piste qui s'arrête sur des cendres.",
        "Yohan garde la lettre et reprend la route, avec la certitude désagréable qu'on parle de lui dans des pièces où il n'entrera jamais."
      ],
      effets:{sang:5, xp:10, flag:"tr_01_fait"},
      fin:true
    },
    brule:{
      texte:[
        "Yohan enterre le courrier correctement, pierre sur le visage, et regarde la lettre se tordre dans le feu.",
        "Il n'apprendra rien. Mais rien de ce qu'il vient de lire ne pourra être retrouvé sur lui, et pour un homme dans sa situation, c'est parfois le meilleur usage d'une information."
      ],
      effets:{sang:4, flag:"tr_01_fait"},
      fin:true
    }
  }
},

/* ══════════ 2 · ce qu'Alycia veut vraiment ══════════ */
{
  id:"TR_02_ALYCIA", titre:"Ce qu'elle n'a pas dit en arrivant", famille:"PARIA", rarete:"rare",
  image:"tr_alycia",
  requis:{ compagnon:"alycia", sangMin:38, sansFlags:["tr_02_fait"] },
  scenes:{
    start:{
      pnj:"alycia",
      texte:[
        "Alycia attend qu'ils soient à l'abri, la nuit tombée, le feu bas. Elle a cette manière de choisir son moment qui fait qu'on ne sait jamais si c'est de la délicatesse ou du calcul.",
        "« Je ne t'ai pas trouvé par hasard », dit-elle enfin. « Je te cherchais depuis quatre ans. »",
        "Elle sort d'une doublure un rouleau de noms — une trentaine, certains rayés. « Des porteurs. Vivants, cachés, dispersés. Je les tiens en vie un par un et je perds du terrain. Il me faut quelqu'un dont le nom seul vaut une armée. »"
      ],
      choix:[
        {label:"Demander pourquoi elle l'a caché si longtemps", detail:"Jet de Volonté (13)",
         test:{stat:"vol", dc:13}, reussite:"pourquoi_ok", echec:"pourquoi_ko"},
        {label:"Accepter d'être ce nom", detail:"+Suspicion · c'est exactement ce qu'elle demande",
         suite:"accepte", effets:{suspicion:12, sang:14, xp:34, flags:["tr_02_fait","cause_parias"]}},
        {label:"Refuser : il ne relèvera pas une maison pour en devenir la bannière", detail:"Elle s'y attendait",
         suite:"refuse"},
      ]
    },
    pourquoi_ok:{
      pnj:"alycia",
      texte:[
        "« Parce que si je te l'avais dit le premier soir », répond-elle sans détourner les yeux, « tu aurais cru que je t'aidais pour ça. Et tu aurais eu raison. »",
        "Elle remet le rouleau dans sa doublure. « Je manipule les gens, Yohan. C'est ce que je sais faire, et je ne vais pas prétendre le contraire à un homme qui l'a compris avant moi. Ce que je peux te promettre, c'est que ce que je veux est réel. »",
        "Le feu baisse encore. « Trente-et-un noms. Il y en avait quarante il y a quatre ans. »"
      ],
      choix:[
        {label:"Accepter d'être ce nom", detail:"+Suspicion · devenir visible pour qu'ils vivent cachés",
         suite:"accepte", effets:{suspicion:12, sang:18, xp:40, flags:["tr_02_fait","cause_parias"]}},
        {label:"Proposer autre chose : les protéger sans être un symbole", detail:"Jet de Précision (14)",
         test:{stat:"precision", dc:14}, reussite:"tiers_ok", echec:"tiers_ko"},
      ]
    },
    pourquoi_ko:{
      pnj:"alycia",
      texte:[
        "Yohan pose la question de travers — avec du soupçon là où il fallait de la fermeté — et Alycia se referme comme une porte.",
        "« Tu me demandes si je te mens », dit-elle en rangeant le rouleau. « Bien sûr que je te mens. Sur des détails. Sur l'essentiel, non. Tu apprendras la différence, ou tu ne l'apprendras pas. »",
        "Elle se couche dos au feu et ne dit plus rien de la nuit."
      ],
      effets:{sang:8, xp:16, flag:"tr_02_fait"},
      fin:true
    },
    accepte:{ pnj:"alycia",
      texte:[
        "Yohan accepte, et il sait exactement ce qu'il accepte : devenir la cible la plus visible de Vardhen pour que trente-et-une personnes puissent rester invisibles.",
        "Alycia n'a pas l'air triomphante. Elle a l'air soulagée, ce qui est différent, et pour la première fois Yohan la croit tout à fait.",
        "« Alors il va falloir que le nom Karlsberg redevienne quelque chose », dit-elle. « Un nom mort ne protège personne. »"
      ],
      fin:true
    },
    tiers_ok:{
      pnj:"alycia",
      texte:[
        "Yohan propose l'inverse de ce qu'elle demande : pas une bannière, un réseau. Des routes sûres, des relais payés, des maisons endettées envers un homme qu'elles ne peuvent pas nommer. La discrétion comme méthode, pas comme fuite.",
        "Alycia écoute jusqu'au bout, et ce qui passe sur son visage est rare chez elle : elle n'y avait pas pensé.",
        "« C'est plus lent », dit-elle enfin. « C'est plus lent, et ça peut marcher. » Elle reprend le rouleau et raye une ligne, puis en ajoute une autre. « Trente-deux, alors. Je te compte dedans. »"
      ],
      effets:{sang:20, xp:46, or:-120, flags:["tr_02_fait","reseau_parias"]},
      fin:true
    },
    tiers_ko:{
      pnj:"alycia",
      texte:[
        "L'idée est bonne et Yohan l'explique mal — trop de conditions, pas assez de moyens. Alycia démonte le plan point par point, sans méchanceté, avec la précision de quelqu'un qui a déjà essayé.",
        "« J'ai tenté ça pendant deux ans », conclut-elle. « J'ai enterré six personnes en le tentant. »"
      ],
      effets:{sang:8, xp:18, flag:"tr_02_fait"},
      fin:true
    },
    refuse:{
      pnj:"alycia",
      texte:[
        "« Non », dit Yohan. « Je ne relève pas Karlsberg pour en faire un drapeau. »",
        "Alycia hoche la tête lentement. Elle ne discute pas, ce qui est sa manière de rester. « Bien. Alors relève-la pour toi. » Elle range le rouleau. « Et quand elle sera debout, tu regarderas ce qu'il en reste, et tu décideras à ce moment-là. »",
        "Ce n'est pas un renoncement de sa part. C'est un report — et elle est très douée pour les reports."
      ],
      effets:{sang:6, xp:22, flags:["tr_02_fait","refus_banniere"]},
      fin:true
    }
  }
},

/* ══════════ 3 · les ruines du Loup ══════════ */
{
  id:"TR_03_RUINES", titre:"La statue qui garde encore", famille:"PARIA", rarete:"épique",
  image:"tr_ruines",
  requis:{ sangMin:62, sansFlags:["tr_03_fait"] },
  scenes:{
    start:{
      texte:[
        "Il n'y a pas eu de décision. Un matin, la route que prend Yohan est celle du nord, et il n'a pas envie d'en discuter avec lui-même.",
        "Karlsberg est plus petit que dans son souvenir. C'est toujours ainsi. Le mur d'enceinte tient encore sur deux côtés, la grande salle est un carré d'herbe, et devant ce qui était la porte, le loup de pierre est debout — intact, alors que tout le reste a été abattu.",
        "On ne l'a pas épargné par respect. On l'a laissé parce que personne n'a osé le toucher."
      ],
      choix:[
        {label:"Toucher la statue", detail:"L'Onde reconnaît l'Onde · quoi qu'il en coûte",
         suite:"touche"},
        {label:"Fouiller les caves de la grande salle", detail:"Jet de Précision (13)",
         test:{stat:"precision", dc:13}, reussite:"cave_ok", echec:"cave_ko"},
        {label:"Rester à la lisière et regarder", detail:"Certaines choses ne se visitent pas",
         suite:"lisiere", effets:{sang:6, xp:20}},
      ]
    },
    touche:{
      texte:[
        "La pierre est froide, puis n'est plus froide du tout. Yohan retire la main trop tard : l'Onde de la statue et la sienne se sont reconnues, et quelque chose se réveille sous l'herbe du carré central.",
        "Ils sortent lentement, sans hostilité particulière — trois formes qui ont gardé cette porte trop longtemps pour savoir s'arrêter.",
        "Ils ne l'attaquent pas parce qu'il est un intrus. Ils l'attaquent parce que c'est tout ce qui leur reste à faire."
      ],
      combat:{ groupe:[{bst:"BST_020",n:1},{bst:"BST_023",n:2}], victoire:"gardiens_vaincus", defaite:"gardiens_perdu" }
    },
    gardiens_vaincus:{
      texte:[
        "Quand le dernier tombe, il ne se disperse pas : il s'assoit, littéralement, contre le socle de la statue, et cesse d'être.",
        "Le loup de pierre, lui, s'est fendu du museau à la nuque pendant l'affrontement. Dans la fente, coincé depuis des décennies, un tube de plomb scellé à la cire.",
        "Il contient l'acte de fondation de la Maison Karlsberg. Pas une copie : l'original, avec les seings, les témoins, et la mention que la maison tient ses terres *de son propre chef et non d'une couronne*."
      ],
      effets:{sang:25, xp:70, flags:["tr_03_fait","acte_fondation"]},
      fin:true
    },
    gardiens_perdu:{
      texte:[
        "Yohan décroche vers le mur d'enceinte et les gardiens ne le poursuivent pas au-delà de la porte. Ils n'ont jamais eu pour mission de poursuivre : seulement d'empêcher d'entrer.",
        "Il repart en boitant, avec la certitude d'être passé à côté de quelque chose, et l'obligation de revenir."
      ],
      effets:{sang:8, xp:20, pv:-8, flag:"tr_03_fait"},
      fin:true
    },
    cave_ok:{
      texte:[
        "Sous le carré d'herbe, l'escalier de service est intact — trop étroit pour qu'on ait pris la peine de l'effondrer.",
        "Les caves ont brûlé, mais le feu monte : le niveau bas est resté. Yohan y trouve les réserves d'une maison qui vivait bien, des barriques éventrées, et dans une niche murée à la hâte, un coffre de campagne aux armes du Loup.",
        "Dedans : de l'or ancien, encore valable, et une lame d'apparat qui n'a jamais servi."
      ],
      effets:{or:450, sang:18, xp:56, item:"accessoire_anneau", flags:["tr_03_fait","cave_karlsberg"]},
      fin:true
    },
    cave_ko:{
      texte:[
        "Yohan passe la journée à déplacer des pierres et n'atteint jamais le niveau bas. L'escalier de service s'est effondré sur lui-même, et rouvrir ça demanderait dix hommes et une semaine.",
        "Il note l'emplacement. Dix hommes et une semaine, ça s'achète — quand on a de quoi."
      ],
      effets:{sang:10, xp:22, fat:12, flags:["tr_03_fait","cave_reperee"]},
      fin:true
    },
    lisiere:{
      texte:[
        "Yohan reste à la lisière jusqu'au soir, assis dans l'herbe, à regarder un carré vide où des gens ont vécu.",
        "Il ne franchit pas la porte. Il n'a rien trouvé, rien affronté, rien emporté.",
        "Il repart avec quelque chose quand même : la première certitude, depuis des années, que cet endroit existe réellement et qu'il n'est pas une histoire qu'on lui a racontée."
      ],
      fin:true
    }
  }
},


/* ══════════ 4 · ceux qu'on tenait cachés ══════════ */
{
  id:"TR_07_SANS_NOM", titre:"Ceux qui n'ont plus de nom", famille:"PARIA", rarete:"épique",
  image:"tr_sans_nom",
  requis:{ flags:["cause_parias","tr_03_fait"], sangMin:78, sansFlags:["tr_07_fait"] },
  scenes:{
    start:{
      pnj:"alycia",
      texte:[
        "Ils sont sept, et ils attendent depuis l'aube à l'orée du camp sans oser franchir la ligne des feux.",
        "Alycia les a fait venir sans prévenir. « Voilà ce que ta décision a produit », dit-elle. « Sept sur trente-trois qui ont accepté de sortir. Les autres attendent de voir ce qui arrive à ceux-là. »",
        "Aucun ne donne son nom. Le plus âgé a peut-être cinquante ans et tient ses mains croisées d'une façon que Yohan reconnaît immédiatement : c'est la posture de quelqu'un qui a passé sa vie à empêcher ses doigts de trembler devant témoins."
      ],
      choix:[
        {label:"Les prendre comme ils sont, sans rien exiger", detail:"Ils deviennent une unité · les Sans-Nom",
         suite:"prend", effets:{sang:16, xp:60, renom:6, flags:["tr_07_fait","sans_nom_leves"]}},
        {label:"Leur demander d'abord s'ils veulent se battre", detail:"Jet de Volonté (13) · personne ne le leur a demandé",
         test:{stat:"vol", dc:13}, reussite:"demande_ok", echec:"demande_ko"},
        {label:"Les renvoyer se cacher", detail:"Sept porteurs visibles, c'est sept cibles",
         suite:"renvoie", effets:{sang:6, xp:30, suspicion:-10, flags:["tr_07_fait","sans_nom_caches"]}},
      ]
    },
    prend:{
      texte:[
        "Yohan ne leur demande rien : ni leur nom, ni d'où ils viennent, ni ce qu'ils savent faire. Il leur indique où dormir et à quelle heure on mange.",
        "C'est exactement ce qu'il fallait. Le plus âgé desserre les mains vers le milieu du repas et ne les recroise plus.",
        "Le camp entier comprend en une soirée ce qu'ils sont, et le camp entier décide en une soirée de ne pas en parler. C'est peut-être ça, une maison."
      ],
      fin:true
    },
    demande_ok:{
      pnj:"alycia",
      texte:[
        "« Est-ce que vous voulez vous battre ? » demande Yohan. « Pas est-ce que vous pouvez. Est-ce que vous voulez. »",
        "Le silence dure très longtemps. Puis le plus âgé répond, et sa voix ne tremble pas du tout : « Non. Aucun de nous. » Un temps. « Mais nous voulons cesser de courir, et il n'y a pas d'autre chemin pour ça. »",
        "Alycia détourne les yeux. C'est la seule fois où Yohan la verra faire ça."
      ],
      effets:{sang:20, xp:70, renom:8, flags:["tr_07_fait","sans_nom_leves","sans_nom_consentants"]},
      fin:true
    },
    demande_ko:{
      texte:[
        "La question sort mal — trop solennelle, presque cérémonieuse — et sept personnes qui ont passé leur vie à se faire discrètes n'ont aucune idée de comment on répond à ça devant témoins.",
        "Ils hochent la tête tous ensemble, ce qui ne veut rien dire, et Yohan sait que ça ne veut rien dire.",
        "Ils restent. Il ne saura jamais s'ils l'ont choisi."
      ],
      effets:{sang:12, xp:40, flags:["tr_07_fait","sans_nom_leves"]},
      fin:true
    },
    renvoie:{
      pnj:"alycia",
      texte:[
        "« Renvoyez-les. Sept porteurs visibles autour de moi, ce sont sept cibles, et je suis déjà la plus grosse. »",
        "Alycia ne discute pas — c'est même exactement l'argument qu'elle aurait employé six mois plus tôt.",
        "Ce qu'elle dit à la place, très bas, en les regardant repartir : « Ils ont mis quatre ans à accepter de sortir. »"
      ],
      fin:true
    }
  }
},

/* ══════════ 5 · la dette des Elfes ══════════ */
{
  id:"TR_04_DETTE", titre:"Ce que son peuple doit", famille:"ONDE", rarete:"épique",
  image:"tr_dette",
  requis:{ compagnon:"alarielle", sansFlags:["tr_04_fait"] },
  scenes:{
    start:{
      pnj:"alarielle",
      texte:[
        "Alarielle attend d'être seule avec Yohan pour parler, et elle choisit un moment où il ne peut pas s'en aller : au milieu d'un gué, l'eau aux genoux.",
        "« Mon frère vous a dit que nous avions regardé. C'est faux. » Elle avance de deux pas dans le courant. « Nous n'avons pas regardé. Nous avons mesuré. »",
        "Elle explique en quelques phrases ce que trois siècles de cour ont enterré : les Elfes ont vu l'Onde arriver, l'ont suivie, ont calculé où elle frapperait — et ont choisi de ne prévenir personne pour observer ce qu'elle ferait à un être vivant."
      ],
      choix:[
        {label:"Demander qui était l'être vivant", detail:"La réponse va faire mal",
         suite:"qui"},
        {label:"Lui demander pourquoi elle avoue ça maintenant", detail:"Jet de Précision (13)",
         test:{stat:"precision", dc:13}, reussite:"maintenant_ok", echec:"maintenant_ko"},
        {label:"La laisser au milieu du gué", detail:"Certaines vérités arrivent trop tard pour servir",
         suite:"gue", effets:{sang:4, xp:16, flag:"tr_04_fait"}},
      ]
    },
    qui:{
      pnj:"alarielle",
      texte:[
        "« Un homme qui traversait, avec sa famille. » Alarielle ne détourne pas les yeux, ce qui doit lui demander un effort considérable. « Nous avons son nom dans nos archives. Il est le vôtre. »",
        "L'eau du gué continue de couler comme si de rien n'était.",
        "« Il n'a pas été choisi par l'Onde », dit-elle. « Il a été choisi par nous, en ne le prévenant pas. Toute votre lignée existe parce que mon peuple a voulu voir ce qui se passerait. »"
      ],
      choix:[
        {label:"Encaisser, et lui demander ce qu'elle compte en faire", detail:"Jet de Volonté (14)",
         test:{stat:"vol", dc:14}, reussite:"encaisse_ok", echec:"encaisse_ko"},
        {label:"Lui dire de partir", detail:"Elle partira · elle ne reviendra pas",
         suite:"renvoie"},
      ]
    },
    encaisse_ok:{
      pnj:"alarielle",
      texte:[
        "Yohan reste debout dans le courant beaucoup plus longtemps qu'il n'est confortable, et quand il parle, sa voix est parfaitement égale.",
        "« Donc ma maison est une expérience. » Un temps. « Qu'est-ce que vous comptez faire de cette dette ? »",
        "Alarielle sort d'une manche un feuillet plié — la copie de l'archive elfique, avec les mesures, les dates, et les signatures de ceux qui ont décidé de se taire. « La rendre publique. Quand vous serez assez fort pour survivre au scandale, et pas un jour avant. »"
      ],
      effets:{sang:26, xp:74, flags:["tr_04_fait","archive_elfique"]},
      fin:true
    },
    encaisse_ko:{ pnj:"alarielle",
      texte:[
        "Yohan sort du gué sans un mot et marche jusqu'à la nuit sans s'arrêter une fois. Alarielle suit à distance, ce qui est la seule chose correcte à faire.",
        "Ils ne reparleront pas de cette conversation avant longtemps. Mais elle a été dite, et rien n'est jamais tout à fait pareil après."
      ],
      effets:{sang:14, xp:34, flags:["tr_04_fait","dette_sue"]},
      fin:true
    },
    maintenant_ok:{
      pnj:"alarielle",
      texte:[
        "« Pourquoi maintenant ? » demande Yohan. « Vous auriez pu me le dire au premier jour, ou jamais. »",
        "« Parce qu'au premier jour vous n'aviez rien à perdre », répond-elle. « Un homme qui n'a rien pardonne facilement : ça ne lui coûte rien. Vous commencez à avoir quelque chose. Je veux savoir ce que vous ferez de cette vérité maintenant qu'elle peut vous coûter. »",
        "Ce n'est pas une confession. C'est un test — et elle a la décence de ne pas le cacher."
      ],
      effets:{xp:30},
      choix:[ {label:"Demander qui était l'être vivant", suite:"qui"} ]
    },
    maintenant_ko:{ pnj:"alarielle",
      texte:[
        "Yohan cherche l'arrière-pensée et passe à côté de l'aveu. Alarielle répond poliment à la mauvaise question, et le gué se traverse en silence.",
        "Ce qu'elle voulait dire, elle ne le redira pas de sitôt."
      ],
      effets:{sang:8, xp:18, flag:"tr_04_fait"},
      fin:true
    },
    renvoie:{
      pnj:"alarielle",
      texte:[
        "« Partez. »",
        "Alarielle ne plaide pas. Elle s'incline dans l'eau jusqu'aux genoux, remonte la berge, et disparaît entre les arbres sans se retourner une seule fois.",
        "Yohan traverse seul. Il a eu raison, probablement. Il vient aussi de perdre la seule personne de Vardhen qui estimait lui devoir quelque chose."
      ],
      effets:{sang:10, xp:26, flags:["tr_04_fait","alarielle_renvoyee"]},
      fin:true
    },
    gue:{
      texte:[
        "Yohan finit de traverser et remonte sur la berge sans l'écouter jusqu'au bout.",
        "Trois siècles de silence elfique tiennent encore un jour de plus. Il a d'autres urgences, et il a appris à trier."
      ],
      fin:true
    }
  }
},

/* ══════════ 6 · la bannière ══════════ */
{
  id:"TR_05_BANNIERE", titre:"La bannière qu'il faut coudre", famille:"POLITIQUE", rarete:"épique",
  image:"tr_banniere",
  requis:{ sangMin:105, flags:["tr_03_fait"], sansFlags:["tr_05_fait"] },
  scenes:{
    start:{
      texte:[
        "Le tailleur de Fort-aux-Princes n'a pas posé une seule question, ce qui coûte plus cher que le travail lui-même. Sur sa table, la toile est prête et la soie est là.",
        "Il ne manque que la décision : quel loup, et à quelle taille.",
        "Une bannière visible relève une maison. Elle désigne aussi, à cent lieues à la ronde, exactement où frapper."
      ],
      choix:[
        {label:"La grande bannière, portée au vent", detail:"Karlsberg redevient public · +++ Suspicion",
         suite:"grande", effets:{suspicion:35, sang:24, xp:60, or:-200, flags:["tr_05_fait","banniere_haute"]}},
        {label:"Un sceau discret, sur les papiers seulement", detail:"La maison existe en droit, pas en vue",
         suite:"sceau", effets:{sang:16, xp:50, or:-80, flags:["tr_05_fait","banniere_sceau"]}},
        {label:"Rien du tout — pas encore", detail:"Jet de Volonté (12) · reporter est aussi un choix",
         test:{stat:"vol", dc:12}, reussite:"rien_ok", echec:"rien_ko"},
      ]
    },
    grande: {
      texte:[
        "Yohan choisit le grand format, le loup assis, le fil d'or. Le tailleur travaille trois jours et ne dort pas beaucoup.",
        "Quand la bannière sort de l'atelier, deux personnes la voient. Le lendemain, la ville entière sait. La semaine suivante, trois cours en parlent, et quelque part au sud, un homme sans armure déplace un jeton sur une carte et le pose sur un nom qu'il avait rangé dans « plus tard ».",
        "La Maison Karlsberg existe de nouveau. Elle a duré vingt minutes avant d'être une cible."
      ],
      fin:true
    },
    sceau:{
      texte:[
        "Pas de bannière : un sceau. Un loup de la taille d'un ongle, sur de la cire, au bas de contrats parfaitement ordinaires.",
        "C'est plus lent, c'est moins beau, et c'est terriblement efficace : au bout de quelques mois, une maison existe pour les notaires, les prêteurs et les juges — et pour personne d'autre.",
        "Les maisons ne meurent pas de manquer de bannières. Elles meurent de manquer de créanciers."
      ],
      fin:true
    },
    rien_ok:{
      texte:[
        "Yohan regarde la toile vide longtemps, puis paie le tailleur pour son temps et pour son silence, et ressort les mains vides.",
        "Ce n'est pas de la peur. C'est le calcul le plus froid qu'il ait fait depuis des années : une maison qu'on relève trop tôt se fait abattre avec toutes les personnes qui s'y sont rattachées.",
        "La toile attendra. Lui aussi."
      ],
      effets:{sang:12, xp:40, suspicion:-10, flags:["tr_05_fait","banniere_reportee"]},
      fin:true
    },
    rien_ko:{
      texte:[
        "Yohan repousse la décision, et il la repousse mal : il laisse la commande en suspens, l'acompte versé, la toile sur la table d'un homme qui parle à des clients toute la journée.",
        "Une bannière qu'on n'a pas décidée est la pire des deux options — elle a le coût de la visibilité sans en avoir le bénéfice."
      ],
      effets:{or:-60, suspicion:14, sang:6, flag:"tr_05_fait"},
      fin:true
    }
  }
},


/* ══════════ 7 · le Roi de Cendre ══════════ */
{
  id:"TR_08_ROI_CENDRE", titre:"Une audience qu'on ne refuse pas", famille:"POLITIQUE", rarete:"épique",
  image:"tr_roi_cendre",
  requis:{ sangMin:118, flags:["tr_05_fait"], sansFlags:["tr_08_fait"] },
  scenes:{
    start:{
      pnj:"leopold",
      texte:[
        "L'escorte impériale est arrivée sans armes tirées et avec un sauf-conduit signé de la main du Roi de Cendre lui-même. Refuser aurait été plus dangereux que venir.",
        "Léopold IV reçoit dans une pièce de travail, pas dans une salle du trône. Il a l'air fatigué de la manière dont on l'est à cinquante ans quand on tient un empire qui se défait.",
        "« Karlsberg. » Il ne se lève pas non plus. « Vous savez ce qui m'intéresse chez vous ? Ce n'est pas votre sang. C'est que vous ayez une armée et que vous ne l'ayez pointée sur aucune de mes villes. »"
      ],
      choix:[
        {label:"Demander une reconnaissance officielle de la maison", detail:"Jet de Précision (15) · énorme, et il pourrait dire oui",
         test:{stat:"precision", dc:15}, reussite:"reco_ok", echec:"reco_ko"},
        {label:"Lui demander pourquoi Astrah a trahi Karlsberg", detail:"Jet de Volonté (14) · trois générations plus tard",
         test:{stat:"vol", dc:14}, reussite:"trahison_ok", echec:"trahison_ko"},
        {label:"Écouter ce qu'il propose", detail:"Il n'a pas fait venir Yohan pour l'admirer",
         suite:"propose"},
      ]
    },
    propose:{
      pnj:"leopold",
      texte:[
        "« Lucius lève une armée sous les couleurs de mon grand-père », dit Léopold sans détour. « La moitié de mes maisons attend de voir qui gagne avant de choisir. Je n'ai pas les moyens d'une guerre sur deux fronts. »",
        "Il pousse un feuillet sur la table. « Une charge de marche : vous tenez le nord, vous répondez de ce qui s'y passe, et l'Empire ne vous cherche pas. Ce n'est pas une amnistie. C'est un arrangement. »",
        "« Et si Lucius l'emporte », ajoute-t-il, « vous et moi aurons exactement le même problème. »"
      ],
      choix:[
        {label:"Accepter la charge de marche", detail:"L'Empire cesse de chasser · Karlsberg lui doit quelque chose",
         suite:"charge", effets:{sang:20, xp:80, renom:15, suspicion:-25,
           flags:["tr_08_fait","charge_de_marche"]}},
        {label:"Refuser : Karlsberg ne relèvera de personne", detail:"L'acte de fondation dit « de son propre chef »",
         suite:"refuse", effets:{sang:16, xp:70, flags:["tr_08_fait","karlsberg_independante"]}},
      ]
    },
    charge:{ pnj:"garde_astrah",
      texte:[
        "Yohan signe. C'est un morceau de papier qui dit qu'un Paria répond du nord au nom d'un Empire qui a rasé sa maison — et c'est le premier document officiel portant le nom Karlsberg depuis la Purge.",
        "Léopold le contresigne sans commentaire. Au moment où Yohan sort, il ajoute, sans lever la tête : « Mon grand-père a eu tort. Je ne le dirai pas deux fois, et je le nierai si on me cite. »"
      ],
      fin:true
    },
    refuse:{
      pnj:"leopold",
      texte:[
        "« L'acte de fondation de ma maison dit qu'elle tient ses terres de son propre chef et non d'une couronne », dit Yohan. « Je ne signerai pas le contraire. »",
        "Léopold reprend le feuillet, le relit comme s'il ne l'avait pas écrit, et le repose.",
        "« Vous savez que je peux vous faire arrêter dans cette pièce. » Un temps. « Vous savez aussi que je ne le ferai pas, parce que Lucius est un problème plus urgent que votre fierté. Sortez. Tenez le nord quand même. Nous ne l'aurons jamais dit. »"
      ],
      fin:true
    },
    reco_ok:{
      pnj:"leopold",
      texte:[
        "Yohan ne demande pas une grâce : il demande une ligne dans un registre. Que la Maison Karlsberg existe en droit, comme les quarante autres, sans mention particulière.",
        "Léopold le regarde très longtemps. « Vous demandez la seule chose que je peux donner et qui ne me coûte rien immédiatement, et qui me coûtera tout dans vingt ans. » Il a presque l'air amusé. « C'est bien joué. »",
        "Il fait venir un scribe. La ligne est écrite pendant que Yohan est encore dans la pièce."
      ],
      effets:{sang:26, xp:100, renom:12, suspicion:-15, flags:["tr_08_fait","karlsberg_reconnue"]},
      choix:[ {label:"Écouter ce qu'il veut en échange", suite:"propose"} ]
    },
    reco_ko:{ pnj:"leopold",
      texte:[
        "Yohan demande trop, trop tôt, et sur le mauvais registre — celui de la réparation plutôt que celui de l'utilité.",
        "Léopold écoute jusqu'au bout par pure politesse d'État. « Vous confondez ce que je vous dois avec ce que je peux vous donner », dit-il enfin. « Il n'y a que le second qui existe. »"
      ],
      effets:{xp:30},
      choix:[ {label:"Écouter ce qu'il propose", suite:"propose"} ]
    },
    trahison_ok:{
      pnj:"leopold",
      texte:[
        "« Pourquoi ? » demande Yohan. « Otto le Noir avait négocié. Karlsberg était entrée dans l'ordre impérial. Pourquoi votre aïeul a-t-il trahi ? »",
        "Léopold ne fait pas semblant de chercher. Il connaît la réponse, et il l'a manifestement retournée souvent.",
        "« Parce qu'il a eu peur d'une chose qu'il ne pouvait pas mesurer. » Il croise les mains. « C'est la seule raison pour laquelle les États tuent, jeune homme. Toutes les autres sont des habillages. »"
      ],
      effets:{sang:14, xp:70, flags:["tr_08_fait","verite_purge"]},
      choix:[ {label:"Écouter ce qu'il propose", suite:"propose"} ]
    },
    trahison_ko:{ pnj:"leopold",
      texte:[
        "La question sort chargée de trois générations de rancune, et un empereur n'a aucune raison de répondre à ça.",
        "« C'était il y a longtemps », dit Léopold, et il passe à autre chose avec une aisance qui a demandé des années d'entraînement."
      ],
      choix:[ {label:"Écouter ce qu'il propose", suite:"propose"} ]
    }
  }
},

/* ══════════ 8 · ce que l'Onde suivait ══════════ */
{
  id:"TR_09_CE_QUI_SUIVAIT", titre:"Ce que l'Onde suivait", famille:"ONDE", rarete:"épique",
  image:"tr_suivait",
  requis:{ sangMin:132, sansFlags:["tr_09_fait"] },
  scenes:{
    start:{
      texte:[
        "Trois informations que Yohan porte depuis des mois se rejoignent enfin, et il faut être immobile et fatigué pour que ça arrive.",
        "Un : l'Onde n'a pas frappé au hasard, elle suivait quelque chose qui bougeait. Deux : la Cicatrice récite des noms de porteurs, et elle ne s'arrête pas au passé. Trois : les Pierres du Premier Rugissement sont accordées sur une note qui vient du nord.",
        "Ce n'est pas une cicatrice. C'est un point de passage, et il est encore ouvert."
      ],
      choix:[
        {label:"Retourner à la Cicatrice et demander", detail:"Jet de Volonté (16) · elle connaît son nom, désormais",
         test:{stat:"vol", dc:16}, reussite:"demande_ok", echec:"demande_ko"},
        {label:"Recouper avec l'archive elfique", detail:"Requiert l'archive · trois siècles de mesures",
         requis:{flag:"archive_elfique"}, suite:"archive"},
        {label:"Ne pas creuser", detail:"Certaines vérités ne servent personne",
         suite:"laisse", effets:{sang:8, xp:40, flag:"tr_09_fait"}},
      ]
    },
    demande_ok:{
      texte:[
        "Yohan revient sur la pierre vitrifiée et pose la question à voix haute, comme un imbécile ou comme quelqu'un qui a compris que c'est la seule méthode.",
        "La récitation s'interrompt. Pour la première fois, elle change.",
        "Elle ne récite plus des noms : elle récite une seule date, encore et encore, dans une langue que personne ne parle plus mais que le sang comprend. Une date à venir. Pas lointaine."
      ],
      effets:{sang:28, xp:130, fat:30, pv:-10, flags:["tr_09_fait","date_annoncee"]},
      fin:true
    },
    demande_ko:{
      texte:[
        "La pression monte plus vite que la dernière fois — elle a appris, ou lui a désappris — et Yohan rompt au bout de quelques secondes.",
        "Il redescend en saignant du nez, avec une seule certitude : ce qui parle là-dedans attend quelque chose, et l'attente a une fin."
      ],
      effets:{sang:12, xp:50, fat:25, pv:-12, flag:"tr_09_fait"},
      fin:true
    },
    archive:{
      texte:[
        "Les colonnes elfiques donnent les mesures d'Onde année par année sur trois siècles. Yohan ne cherche pas les chiffres : il cherche la courbe.",
        "Elle ne décroît pas régulièrement. Elle pulse — un creux, un pic, un creux — à intervalle exact. Les Elfes l'ont mesurée sans jamais l'interpréter, parce qu'interpréter aurait signifié admettre qu'ils avaient laissé passer quelque chose de cyclique.",
        "Le prochain pic n'est pas dans trois siècles. Au rythme relevé, il est pour bientôt — et le dernier a produit les Parias."
      ],
      effets:{sang:24, xp:120, flags:["tr_09_fait","cycle_compris"]},
      fin:true
    },
    laisse:{
      texte:[
        "Yohan replie ses trois informations et les range là où il range ce qui ne l'aide pas à survivre cette semaine.",
        "Elles ne s'en iront pas. Elles attendront, exactement comme ce qu'elles décrivent."
      ],
      fin:true
    }
  }
},

/* ══════════ 9 · le prix du nom ══════════ */
{
  id:"TR_06_PRIX", titre:"Le prix du nom", famille:"PARIA", rarete:"épique",
  image:"tr_prix",
  requis:{ sangMin:150, flags:["tr_05_fait"], sansFlags:["tr_06_fait"] },
  scenes:{
    start:{
      pnj:"chasseur_prime",
      texte:[
        "Ils ne se cachent même plus. Ils attendent sur la route, en travers, quatre silhouettes et un homme devant qui ne porte aucune couleur.",
        "« Vous avez rendu le travail beaucoup plus simple », dit-il, presque cordial. « Pendant des années il a fallu chercher un homme sans nom. Maintenant il suffit de suivre un nom. »",
        "Il écarte les mains. « Ce n'est pas une embuscade, c'est une facture. Quelqu'un a mis un prix sur Karlsberg, et nous sommes venus l'encaisser. »"
      ],
      choix:[
        {label:"Demander qui paie", detail:"Jet de Précision (14) · un professionnel ne dit pas ça",
         test:{stat:"precision", dc:14}, reussite:"qui_ok", echec:"qui_ko"},
        {label:"Racheter le contrat", detail:"−600 or · tout le monde a un prix, eux les premiers",
         requis:{or:600}, suite:"rachat", effets:{or:-600}},
        {label:"En finir maintenant", detail:"Cinq contre le groupe · c'est pour ça qu'on relève un nom",
         suite:"bataille"},
      ]
    },
    qui_ok:{
      pnj:"chasseur_prime",
      texte:[
        "« Un professionnel ne dit jamais qui paie », convient Yohan. « Mais un professionnel ne s'arrête pas non plus au milieu d'une route pour faire la conversation. Vous voulez que je sache. »",
        "L'homme sourit, et pour la première fois le sourire atteint ses yeux. « Trois initiales sur le contrat. L.F.A. Il paie bien, il paie d'avance, et il précise qu'il n'y a pas d'urgence. »",
        "*Pas d'urgence.* Yohan comprend : il n'est pas une menace pour Lucius. Il est une ligne d'inventaire qu'on solde quand on passe dans le secteur."
      ],
      effets:{xp:40, sang:10, flags:["initiales_lfa"]},
      choix:[
        {label:"Racheter le contrat", detail:"−600 or", requis:{or:600}, suite:"rachat", effets:{or:-600}},
        {label:"En finir maintenant", suite:"bataille"},
      ]
    },
    qui_ko:{
      pnj:"chasseur_prime",
      texte:[
        "« Vous savez bien que non », dit l'homme, et il dégrafe la boucle de son manteau.",
        "Les quatre derrière lui se déploient sans un mot. Ils l'ont fait cent fois."
      ],
      choix:[
        {label:"En finir maintenant", suite:"bataille"},
        {label:"Racheter le contrat", detail:"−600 or", requis:{or:600}, suite:"rachat", effets:{or:-600}},
      ]
    },
    rachat:{
      pnj:"chasseur_prime",
      texte:[
        "L'homme compte l'or sans se presser, puis le fait disparaître. « C'est correct. C'est même généreux. »",
        "Il siffle, et les quatre reculent de la route comme s'ils n'avaient jamais eu l'intention de s'y tenir.",
        "« Nous ne reviendrons pas. » Il remonte en selle. « Mais nous ne sommes pas les seuls sur le registre, et le suivant vous coûtera plus cher, parce qu'il saura que vous payez. »"
      ],
      effets:{sang:14, xp:44, suspicion:6, flags:["tr_06_fait","contrat_rachete"]},
      fin:true
    },
    bataille:{ pnj:"chasseur_prime",
      texte:[
        "Yohan ne répond pas. Il avance de trois pas sur la route, ce qui est une réponse suffisante, et derrière lui le groupe se déploie sans qu'il ait à le demander.",
        "« Bon », dit le chasseur, presque satisfait. « Au moins c'est net. »"
      ],
      combat:{ groupe:[{champion:"chasseur_paria"},{champion:"garde_leopold"},{bst:"BST_002",n:2}],
               victoire:"bataille_gagnee", defaite:"bataille_perdue" }
    },
    bataille_gagnee:{ pnj:"chasseur_prime",
      texte:[
        "La route reste vide un long moment après. Yohan fouille le chasseur et trouve le contrat, plié dans une poche intérieure : une somme, une description, et trois initiales.",
        "**L.F.A.** — et en marge, d'une écriture nette et sans colère : *pas prioritaire.*",
        "C'est cette mention qui décide Yohan, plus que tout le reste. On ne relève pas une maison pour rester une ligne d'inventaire dans les papiers de quelqu'un d'autre."
      ],
      effets:{sang:32, xp:110, or:320, suspicion:12, flags:["tr_06_fait","contrat_lfa_saisi"]},
      fin:true
    },
    bataille_perdue:{
      texte:[
        "Ils ne l'achèvent pas. On n'achève pas une facture : on la reporte.",
        "Yohan revient à lui sur le bas-côté, dépouillé de sa bourse, avec une entaille propre en travers de la paume — la marque qu'on met aux débiteurs, pour que le suivant sache que le compte est déjà ouvert.",
        "Le nom Karlsberg vient de coûter son premier vrai prix. Il en coûtera d'autres."
      ],
      effets:{or:-250, pv:-14, sang:10, suspicion:10, flags:["tr_06_fait","marque_debiteur"]},
      fin:true
    }
  }
},

/* ══════════ 10 · ce qu'une maison doit choisir ══════════ */
{
  id:"TR_10_LA_MAISON", titre:"Ce qu'une maison doit choisir", famille:"POLITIQUE", rarete:"épique",
  image:"tr_maison",
  requis:{ sangMin:162, flags:["tr_06_fait"], sansFlags:["tr_10_fait"] },
  scenes:{
    start:{ pnj:"alycia",
      texte:[
        "Karlsberg existe : un nom, une armée, des ruines tenues, des créanciers. Ce qui n'existe pas encore, c'est une réponse à la seule question que toutes les maisons finissent par poser.",
        "Trois messages sont arrivés la même semaine, et aucun n'est une menace.",
        "L'Empire propose une marche. Alycia propose un refuge permanent pour les porteurs. Et une maison voisine propose une alliance ordinaire — la chose la plus banale du monde, et la plus difficile à obtenir pour un nom qui était mort."
      ],
      choix:[
        {label:"Karlsberg sera une marche de l'Empire", detail:"Puissance, protection, et une laisse",
         suite:"empire", effets:{sang:18, xp:90, renom:20, or:800, suspicion:-20,
           flags:["tr_10_fait","voie_empire"]}},
        {label:"Karlsberg sera un refuge", detail:"Ce que personne d'autre ne peut offrir · et une cible permanente",
         suite:"refuge", effets:{sang:26, xp:100, suspicion:20,
           flags:["tr_10_fait","voie_refuge","cause_parias"]}},
        {label:"Karlsberg sera une maison ordinaire", detail:"Des alliances, des dettes, des mariages · la voie lente",
         suite:"ordinaire", effets:{sang:20, xp:95, renom:10, or:400,
           flags:["tr_10_fait","voie_ordinaire"]}},
      ]
    },
    empire:{ pnj:"alycia",
      texte:[
        "Yohan choisit la marche. Karlsberg tiendra le nord au nom d'un Empire qui l'a rasée, ce qui est soit une victoire complète soit une capitulation élégante — et personne, y compris lui, ne saura trancher avant vingt ans.",
        "Les avantages sont immédiats : l'or, les hommes, la fin de la chasse.",
        "Alycia lit la charge de marche jusqu'au bout sans un commentaire. Puis elle la repose et parle d'autre chose, et c'est ce silence-là qui coûte le plus cher de toute l'affaire."
      ],
      fin:true
    },
    refuge:{
      texte:[
        "Yohan choisit le refuge. Les ruines du Loup deviennent le seul endroit de Vardhen où un porteur de l'Onde peut dormir sans compter les sorties.",
        "C'est intenable, c'est ruineux, et ça fait de Karlsberg une cible permanente pour tout ce qui compte à Vardhen.",
        "Le premier soir, il y a trente-trois personnes dans le carré d'herbe. Le trentième jour, il y en a quarante et une. Personne n'a fait de proclamation : ça s'est su, c'est tout."
      ],
      fin:true
    },
    ordinaire:{
      texte:[
        "Yohan choisit l'ennui. Des alliances, des dettes, des contrats de grain, des mariages entre gens qui se connaissent à peine.",
        "C'est la voie la plus lente et la seule qui ne dépende de personne. Une maison ne meurt pas de manquer de gloire : elle meurt de manquer de voisins qui ont intérêt à ce qu'elle vive.",
        "Dans dix ans, plus personne ne se rappellera que Karlsberg était un nom de Paria. C'est exactement le but."
      ],
      fin:true
    }
  }
},

/* ══════════ 11 · fin de la chronique ══════════ */
{
  id:"TR_11_LE_NOM", titre:"Le nom Karlsberg", famille:"PARIA", rarete:"épique",
  image:"tr_le_nom",
  requis:{ sangMin:190, flags:["tr_10_fait"], sansFlags:["tr_11_fait"] },
  scenes:{
    start:{
      texte:[
        "Il n'y a pas de dernière bataille. C'est la première chose qui surprend Yohan.",
        "Il y a une matinée d'automne, un carré d'herbe où l'on a relevé deux pans de mur, un loup de pierre fendu du museau à la nuque, et des gens qui font des choses ordinaires à l'intérieur d'une enceinte qui n'existait plus il y a trois ans.",
        "Quelqu'un demande à Yohan, sans y attacher d'importance, où l'on doit ranger les outils. Il répond. C'est à ce moment précis, en indiquant un appentis, qu'il comprend que c'est fini."
      ],
      choix:[
        {label:"Faire graver l'acte de fondation sur le mur", detail:"Requiert l'acte · « de son propre chef et non d'une couronne »",
         requis:{flag:"acte_fondation"}, suite:"grave",
         effets:{sang:10, xp:200, flags:["tr_11_fait","fin_acte"]}},
        {label:"Ne rien graver du tout", detail:"Les maisons qui durent n'ont pas besoin de se le rappeler",
         suite:"rien", effets:{sang:10, xp:180, flags:["tr_11_fait","fin_sobre"]}},
        {label:"Faire relever la statue du loup", detail:"Elle est fendue · on peut la laisser fendue",
         suite:"loup", effets:{sang:10, xp:190, flags:["tr_11_fait","fin_loup"]}},
      ]
    },
    grave:{
      texte:[
        "Le tailleur met onze jours. Le texte est court : la Maison Karlsberg tient ses terres de son propre chef et non d'une couronne, avec les seings et la date d'origine.",
        "Ce n'est pas une bravade — c'est un document administratif recopié sur une pierre. C'est précisément pour ça que personne ne pourra jamais prétendre qu'il n'a pas existé.",
        "Yohan ne fait pas de discours. Il regarde le tailleur travailler, tous les jours, jusqu'à la dernière lettre."
      ],
      fin:true
    },
    rien:{
      texte:[
        "Yohan ne fait rien graver. Pas de proclamation, pas de bannière au-dessus de la porte, pas de date sur le mur.",
        "Les maisons qui durent ne passent pas leur temps à rappeler qu'elles existent : elles paient leurs dettes, tiennent leurs routes et marient leurs enfants, et personne ne songe à vérifier leurs titres.",
        "Le soir, il y a des feux dans le carré d'herbe et quelqu'un se plaint du prix du sel. C'est la chose la plus extraordinaire qui soit arrivée à cet endroit depuis la Purge."
      ],
      fin:true
    },
    loup: {
      texte:[
        "Ils remontent la statue sans reboucher la fente. C'était le seul point sur lequel Yohan a été catégorique.",
        "Un loup de pierre fendu du museau à la nuque, redressé quand même, à l'endroit exact où il a toujours été.",
        "Les voyageurs qui passent demandent parfois pourquoi on ne l'a pas réparée. Les gens d'ici répondent qu'elle est très bien comme ça, et ils changent de sujet."
      ],
      fin:true
    }
  }
},

];
