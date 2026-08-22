/* PARIAS — Événements de lieu, deuxième vague
 *
 * Même format que events_written.js (le mode d'emploi complet est en tête de ce
 * fichier-là). Ceux-ci sont écrits pour les endroits qui n'avaient qu'un ou deux
 * récits : passé deux explorations, on retombait sur les variantes générées, et
 * c'était la première chose qu'on reprochait au jeu.
 *
 * Ils se servent des deux systèmes arrivés avec eux :
 *   effets:{ reputation:{ nains:8, humains:-4 } }   ce qu'un peuple retient
 *   requis:{ reputationMin:{ nains:30 } }           ce qu'on n'ouvre qu'aux estimés
 * et distribuent les pièces uniques de items.js, qui ne s'achètent nulle part.
 *
 * Le tableau est reversé dans EVENTS_WRITTEN en fin de fichier : tout ce qui
 * consomme le catalogue — moteur, validateur, manifeste — continue de n'en
 * connaître qu'un.
 */

const EVENTS_WRITTEN_2 = [

/* ══════════════════ KAR-DURAK ══════════════════ */
{
  id:"EW2_FORGE", titre:"La forge qui ne chauffe pas pour tout le monde", famille:"NAIN", rarete:"rare",
  image:"evt2_forge", lieux:["LOC_008"],
  scenes:{
    start:{
      pnj:"gorm",
      texte:[
        "La galerie des forges est à cinquante pas, et cinquante pas, chez les nains, c'est une frontière. Un apprenti barre le passage sans agressivité aucune : il fait son travail, et son travail est de compter qui entre.",
        "« Vous êtes inscrit ? » Il ne demande pas un nom. Il demande un registre.",
        "Derrière lui, la chaleur monte par vagues et on entend le rythme — trois coups, un temps, trois coups. Ce n'est pas du travail à la chaîne. C'est quelqu'un qui finit une pièce."
      ],
      choix:[
        {label:"Faire valoir ce qu'on leur a rendu", detail:"Requiert l'estime des Nains",
         requis:{reputationMin:{nains:30}}, suite:"invite"},
        {label:"Payer le droit d'entrée des étrangers", detail:"−200 or · c'est cher et c'est fait exprès",
         requis:{or:200}, suite:"paye", effets:{or:-200}},
        {label:"Demander ce qu'il faut pour être inscrit", detail:"Jet de Volonté (13)",
         test:{stat:"vol", dc:13}, reussite:"regle_ok", echec:"regle_ko"},
        {label:"Laisser tomber", detail:"Une galerie de plus qu'on ne verra pas",
         suite:"part", effets:{xp:8}},
      ]
    },
    invite:{
      pnj:"gorm",
      texte:[
        "L'apprenti ne décide pas seul. Il envoie quelqu'un, et c'est Gorm qui remonte, la barbe pleine de suie, l'air franchement contrarié d'avoir dû lâcher un ouvrage.",
        "« Lui ? » Il regarde Yohan comme on vérifie une soudure. « Il est au registre. Depuis quand tu ne lis plus le registre ? »",
        "Puis, à Yohan, en passant devant : « Ne touche à rien de rouge. »",
        "La galerie des forges de Kar-Durak n'est pas une salle : c'est une descente. Au fond, sur une enclume qui a servi à trois générations, Gorm pose une pièce achevée depuis longtemps et qu'il n'a jamais donnée à personne."
      ],
      choix:[
        {label:"L'accepter", detail:"Une pièce de maître · les nains ne reprennent jamais un don",
         suite:"marque", effets:{item:"u_marteau_gorik", xp:60, sang:8, reputation:{nains:6}}},
        {label:"La refuser et demander à travailler à la place", detail:"Jet de Précision (15) · une main d'homme sur une enclume naine",
         test:{stat:"precision", dc:15}, reussite:"travail_ok", echec:"travail_ko"},
      ]
    },
    marque:{
      pnj:"gorm",
      texte:[
        "« Elle porte la marque de mon père », dit Gorm. « Ça veut dire que si tu la perds, c'est lui qu'on aura perdu deux fois. »",
        "Il retourne à son ouvrage sans attendre de remerciement, ce qui est la manière naine de dire qu'il n'y a pas de quoi.",
        "Sur le chemin de la remontée, l'apprenti du registre s'écarte avant même que Yohan arrive à sa hauteur."
      ],
      fin:true
    },
    travail_ok:{ pnj:"gorm",
      texte:[
        "Yohan repose la pièce sur l'enclume et demande un marteau à la place.",
        "Gorm le regarde longuement, puis éclate d'un rire qui fait tourner trois têtes dans la galerie. « Il refuse un don pour demander du travail. Notez ça quelque part. »",
        "Il travaille jusqu'au matin, mal, sur une pièce sans importance, sous les remarques de six nains qui n'ont rien de mieux à faire. Au bout de la nuit, il n'a rien fabriqué qui vaille — mais il a fait quelque chose qu'aucun étranger n'avait fait à Kar-Durak depuis longtemps."
      ],
      effets:{xp:70, sang:12, reputation:{nains:16}, item:"accessoire_contrepoids"},
      fin:true
    },
    travail_ko:{ pnj:"gorm",
      texte:[
        "Yohan tient le marteau comme un homme qui a passé sa vie à tenir une épée, ce qui n'est pas la même chose du tout.",
        "La pièce est ratée en trois coups. Personne ne se moque, ce qui est pire : ils s'écartent poliment et le laissent finir.",
        "Gorm récupère le métal gâché et le remet au feu. « Reviens quand tu auras appris à ne pas forcer. »"
      ],
      effets:{xp:24, reputation:{nains:4}},
      fin:true
    },
    paye:{
      texte:[
        "Deux cents pièces pour franchir cinquante pas. L'apprenti les compte deux fois, note la somme, et s'écarte sans un mot de plus.",
        "La galerie vaut le prix : Yohan y trouve de quoi refaire son équipement chez des gens qui n'ont jamais vendu à perte de leur vie. Ce qu'il n'y trouve pas, c'est une conversation."
      ],
      effets:{xp:26, item:"armure_maille_naine", reputation:{nains:2}},
      fin:true
    },
    regle_ok:{
      texte:[
        "« Ce qu'il faut ? » L'apprenti a l'air soulagé qu'on lui pose enfin une question à laquelle il sait répondre.",
        "Il faut avoir rendu un service à la cité et qu'un nain l'ait consigné. Pas payé : consigné. Chez eux, l'or achète des marchandises, pas des passages.",
        "Yohan repart en sachant exactement ce qu'il devra faire pour revenir, ce qui vaut mieux qu'une entrée forcée."
      ],
      effets:{xp:22, sang:4, reputation:{nains:5}},
      fin:true
    },
    regle_ko:{
      texte:[
        "L'apprenti récite un règlement en quatre articles dont deux renvoient à d'autres articles, et Yohan comprend au troisième qu'il est en train de se faire proprement éconduire.",
        "« Revenez avec quelqu'un qui vous connaît. »"
      ],
      effets:{xp:10},
      fin:true
    },
    part:{
      texte:["Yohan tourne les talons. Derrière lui, le rythme reprend : trois coups, un temps, trois coups."],
      fin:true
    },
  }
},
{
  id:"EW2_DETTE_NAINE", titre:"Ce qu'un nain refuse de devoir", famille:"NAIN", rarete:"commun",
  image:"evt2_dette_naine", lieux:["LOC_008"],
  scenes:{
    start:{
      texte:[
        "Il s'appelle Durn, il tient un étal de ferrures dans la halle basse, et il doit de l'argent à Yohan depuis une escorte qui s'est mal passée trois mois plus tôt.",
        "Il le sait. Yohan sait qu'il le sait. Et Durn continue de compter ses clous en regardant obstinément ses mains, parce que dans la halle basse il y a quarante nains et que payer devant eux, c'est reconnaître devant eux.",
        "Un nain qui ne paie pas est un voleur. Un nain qui paie en public a été *obligé* de payer. Il n'y a pas de bonne sortie, et c'est exactement pour ça qu'il ne bouge pas."
      ],
      choix:[
        {label:"Réclamer, fort, devant tout le monde", detail:"On sera payé · on saura pourquoi",
         suite:"public", effets:{or:180, xp:20, reputation:{nains:-12}}},
        {label:"Acheter quelque chose à son étal, très cher", detail:"−0 or · lui laisser payer sa dette en marchandise",
         suite:"etal"},
        {label:"Revenir ce soir, quand la halle sera vide", detail:"Jet de Volonté (12)",
         test:{stat:"vol", dc:12}, reussite:"soir_ok", echec:"soir_ko"},
        {label:"Annuler la dette à voix haute", detail:"Perdre l'argent · gagner autre chose",
         suite:"annule", effets:{xp:34, sang:6, reputation:{nains:14}}},
      ]
    },
    public:{
      texte:[
        "Yohan réclame son dû, clairement, en nommant la somme et la date. Durn paie sur-le-champ, jusqu'au dernier sou, sans lever les yeux.",
        "La halle basse n'a rien manqué. Yohan repart avec son argent et avec la réputation d'un homme qui préfère être payé qu'estimé — chez des gens qui gardent ce genre de note pendant deux générations."
      ],
      fin:true
    },
    etal:{
      texte:[
        "Yohan choisit une pièce de ferronnerie sans intérêt et demande le prix. Durn annonce un chiffre absurde. Yohan hoche la tête et paie.",
        "La somme correspond, au sou près, à ce qui restait dû. Personne dans la halle n'a rien vu d'autre qu'un étranger qui se fait avoir sur un morceau de fer.",
        "Durn emballe la pièce avec un soin excessif. À l'intérieur du paquet, Yohan trouvera plus tard une seconde chose, qu'il n'a pas achetée."
      ],
      effets:{xp:40, sang:6, item:"accessoire_voile_khesh", reputation:{nains:10}},
      fin:true
    },
    soir_ok:{
      texte:[
        "La halle vide, Durn paie sans discuter, et ajoute deux pièces « pour l'attente ». Puis il reste planté là.",
        "« Vous auriez pu le faire ce matin », finit-il par dire. — « Oui. » — « Pourquoi non ? »",
        "Yohan hausse les épaules. « Parce que j'aurai peut-être encore besoin de traverser cette halle. »",
        "Durn hoche la tête très lentement, comme un homme qui vient de reclasser quelqu'un."
      ],
      effets:{or:180, xp:36, sang:4, reputation:{nains:9}},
      fin:true
    },
    soir_ko:{
      texte:[
        "La halle vide, l'étal l'est aussi. Durn a fermé plus tôt que d'habitude et il n'y a personne pour dire où il loge — ou plutôt, il y a quarante personnes qui savent et aucune qui le dira.",
        "Yohan repart sans son argent. Il le récupérera, un jour, quand ça n'aura plus d'importance."
      ],
      effets:{xp:14},
      fin:true
    },
    annule: {
      texte:[
        "« Durn. » Le nain lève enfin la tête. « La dette est éteinte. Devant témoins. »",
        "Un silence tombe sur trois étals à la ronde. Durn ouvre la bouche, la referme, et ce qu'il finit par dire ne s'adresse pas à Yohan mais à la halle entière : « Notez que je n'ai rien demandé. »",
        "« Personne n'a rien demandé », répond quelqu'un au fond.",
        "Yohan repart plus pauvre de cent quatre-vingts pièces, et avec quelque chose qui, à Kar-Durak, ne s'achète à aucun prix."
      ],
      fin:true
    },
  }
},

/* ══════════════════ LES DUNES KHESH ══════════════════ */
{
  id:"EW2_PUITS", titre:"Le puits qu'on ne partage pas deux fois", famille:"KHESH", rarete:"rare",
  image:"evt2_puits", lieux:["LOC_005"],
  scenes:{
    start:{
      pnj:"aza_khesh",
      texte:[
        "Le puits est profond, il est plein, et il appartient au clan qui campe autour depuis six jours. Ils sont dix-huit, dont sept enfants.",
        "À trois cents pas, un autre groupe attend sans approcher : neuf hommes, des chameaux qui ne tiennent plus debout, et pas une goutte. Ils sont d'un clan rival, et selon la loi des Dunes ils peuvent demander l'eau une fois.",
        "Ils ont déjà demandé. On a refusé.",
        "Aza-Rhun, qui commande ici, ne s'en cache pas : « Ils ont brûlé notre relais l'hiver dernier. La loi dit une fois. Elle ne dit pas qu'on doit dire oui. »"
      ],
      choix:[
        {label:"Acheter l'eau pour eux, au prix qu'elle vaut ici", detail:"−250 or",
         requis:{or:250}, suite:"achete", effets:{or:-250, sang:10, xp:44, reputation:{khesh:12}}},
        {label:"Rappeler la loi devant les deux camps", detail:"Jet de Volonté (16) · la loi ne dit pas ce qu'ils croient",
         test:{stat:"vol", dc:16}, reussite:"loi_ok", echec:"loi_ko"},
        {label:"Prendre l'eau de force pour les assoiffés", detail:"Deux clans contre vous, et vous aurez eu raison",
         suite:"force"},
        {label:"Ne pas se mêler d'une affaire de clans", detail:"Ce n'est pas votre désert",
         suite:"passe", effets:{xp:12}},
      ]
    },
    achete:{
      pnj:"aza_khesh",
      texte:[
        "Yohan pose l'or devant Aza-Rhun et annonce ce qu'il achète : dix-huit outres, pour les neuf hommes de là-bas.",
        "Elle regarde l'argent sans y toucher. « Vous savez qu'ils recommenceront. » — « Probablement. » — « Et vous payez quand même. » — « Je paie pour aujourd'hui. »",
        "Elle finit par prendre les pièces, et fait porter l'eau elle-même, ce qui n'était pas obligé. Les deux camps se regardent en silence pendant tout le transport.",
        "Le soir, l'un des neuf vient s'asseoir au bord du feu de Yohan sans demander la permission, ce qui, dans les Dunes, est une déclaration."
      ],
      fin:true
    },
    loi_ok:{
      pnj:"aza_khesh",
      texte:[
        "Yohan demande qu'on récite la loi. En entier. À voix haute, devant les deux camps.",
        "Un vieux s'en charge, et arrive au passage qu'Aza-Rhun avait cité en le tronquant : *une fois par saison, et le refus se paie au double la saison suivante.*",
        "Le refus n'est pas interdit. Il est simplement facturé — et les clans du sud ont la mémoire des factures.",
        "Aza-Rhun ferme les yeux une seconde. Puis elle fait ouvrir le puits, parce qu'un clan qui perd sur la loi préfère encore perdre tout de suite.",
        "« Vous nous avez épargné une saison de dettes », dit-elle plus tard. « Ne croyez pas que ce soit la même chose que nous avoir aidés. »"
      ],
      effets:{sang:16, xp:58, reputation:{khesh:18}},
      fin:true
    },
    loi_ko:{
      texte:[
        "Yohan cite la loi, et se trompe d'un mot — un seul, celui qui compte.",
        "Le vieux du clan corrige avec une politesse écrasante. Les deux camps regardent l'étranger qui vient de leur expliquer leur propre droit et de se tromper.",
        "L'eau reste au puits. Les neuf hommes repartiront à la nuit, vers le sud, et personne ne saura jamais s'ils sont arrivés."
      ],
      effets:{xp:16, reputation:{khesh:-6}},
      fin:true
    },
    force:{
      pnj:"aza_khesh",
      texte:[
        "Yohan marche vers le puits, et le clan se lève d'un seul mouvement.",
        "Aza-Rhun ne dégaine pas tout de suite. « Réfléchissez. Il y a des enfants derrière moi. »",
        "« Il y a neuf hommes qui vont mourir derrière moi. »",
        "« Oui », dit-elle. « Et ce sont les nôtres qui les ont brûlés, et ce sont les leurs qui ont brûlé notre relais, et ça fait quatre-vingts ans. Vous croyez arriver dans une histoire qui commence aujourd'hui. »",
        "Elle dégaine."
      ],
      combat:{ groupe:[{champion:"aza_rhun"},{bst:"BST_027", n:2}], victoire:"force_gagne", defaite:"force_perdu", mortel:false },
    },
    force_gagne:{ pnj:"aza_khesh",
      texte:[
        "Le clan recule. Personne n'est mort — Yohan s'y est employé, et c'est plus difficile que de tuer.",
        "Les neuf hommes boivent. Les enfants regardent. Aza-Rhun, assise dans le sable, tient son bras et ne dit rien du tout.",
        "Yohan repart avant la nuit, parce qu'il sait exactement ce qu'il vient de faire : il a eu raison une fois, dans un désert où on se souvient de tout."
      ],
      effets:{sang:14, xp:60, suspicion:10, reputation:{khesh:-16}},
      fin:true
    },
    force_perdu:{ pnj:"aza_khesh",
      texte:[
        "Ils sont dix-huit et ils connaissent le terrain. Yohan se retrouve à genoux dans le sable avec une lame khesh sous la gorge et pas un souffle pour discuter.",
        "Aza-Rhun le regarde longtemps avant de retirer la lame. « Partez. » Un temps. « Et n'écrivez pas à vos amis que les Khesh laissent mourir des gens. Écrivez que les Khesh comptent. »"
      ],
      effets:{xp:22, pv:-16, reputation:{khesh:-8}},
      fin:true
    },
    passe:{
      texte:[
        "Yohan remplit son outre, paie ce qu'on lui demande, et reprend la route sans se retourner.",
        "Il y a des jours où c'est la seule chose sensée à faire. Ça ne l'empêche pas de compter les silhouettes, à trois cents pas, jusqu'à ce que la dune les efface."
      ],
      fin:true
    },
  }
},
{
  id:"EW2_TEMPETE", titre:"Ce que la tempête met au jour", famille:"KHESH", rarete:"commun",
  image:"evt2_tempete", lieux:["LOC_005","LOC_015"],
  scenes:{
    start:{
      texte:[
        "La tempête dure onze heures. Quand elle passe, le désert n'est plus au même endroit : les dunes ont marché de quatre cents pas vers l'est et ont découvert ce qu'elles couvraient.",
        "Une caravane. Entière. Vingt bêtes, dix-sept hommes, les coffres encore sanglés — ensevelis debout, tous, dans la position où ils marchaient.",
        "Rien n'a été pillé. Personne ne les a trouvés avant aujourd'hui."
      ],
      choix:[
        {label:"Ouvrir les coffres", detail:"Ils n'en auront plus l'usage",
         suite:"coffres", effets:{or:420, xp:26, suspicion:4, reputation:{khesh:-8}}},
        {label:"Chercher qui ils étaient", detail:"Jet de Précision (13) · les sceaux de caravane portent un clan",
         test:{stat:"precision", dc:13}, reussite:"qui_ok", echec:"qui_ko"},
        {label:"Les recouvrir et marquer l'endroit", detail:"Le désert rend rarement deux fois",
         suite:"recouvre", effets:{sang:8, xp:30, reputation:{khesh:12}}},
      ]
    },
    coffres:{
      texte:[
        "Des épices, de la monnaie de trois royaumes, et un lot de fers de lance qui n'ont jamais servi.",
        "Yohan charge ce qu'il peut porter. À la troisième bête, il s'arrête, parce qu'un des morts a les deux bras refermés sur un enfant et qu'il faut décider de le déplacer ou pas.",
        "Il ne le déplace pas. C'est la seule chose qu'il fasse correctement de la journée.",
        "Trois semaines plus tard, un homme au marché de Port-Noir reconnaîtra un sceau de clan sur une pièce, et l'histoire commencera à circuler."
      ],
      fin:true
    },
    qui_ok:{
      texte:[
        "Les sceaux sont ceux du clan Amreth, disparu corps et biens il y a quatre ans, et qu'on accusait depuis d'avoir volé la caisse commune de trois clans avant de fuir vers le nord.",
        "La caisse est là. Sous le sable, à quatre jours de marche de l'endroit où ils devaient la livrer. Ils n'ont volé personne : ils ont été rattrapés par une tempête, et quatre ans de mépris ont couru sur des morts.",
        "Yohan ramène les sceaux et la caisse à qui de droit. On ne le remercie pas — on est trop occupé à réécrire quatre ans."
      ],
      effets:{or:180, sang:14, xp:52, reputation:{khesh:20}},
      fin:true
    },
    qui_ko:{
      texte:[
        "Le sable a mangé les sceaux, ou bien ils n'en portaient pas. Yohan retourne les coffres, les habits, les selles, et n'obtient rien qu'un nom gravé sur une gourde, qui pourrait être celui d'un homme comme celui d'un puits.",
        "Il prend ce qui se transporte et repart. Ils resteront ce qu'ils sont : dix-sept personnes que personne ne cherchait plus."
      ],
      effets:{or:200, xp:18},
      fin:true
    },
    recouvre:{
      texte:[
        "Yohan passe la fin du jour à remonter du sable à mains nues sur des gens qu'il ne connaît pas, puis plante trois lances en triangle — la marque khesh qui dit *ici, ne creusez pas*.",
        "Un berger le voit faire depuis une crête et ne descend pas. Mais il le raconte, et dans les Dunes on raconte vite.",
        "Le triangle tient encore aujourd'hui."
      ],
      fin:true
    },
  }
},
{
  id:"EW2_OSSEMENTS", titre:"Ce qui reste chaud dans les os", famille:"ONDE", rarete:"rare",
  image:"evt2_ossements", lieux:["LOC_015"],
  scenes:{
    start:{
      texte:[
        "Le Cimetière n'est pas un lieu de mort : c'est un lieu où la mort n'a pas fini. Les carcasses de dragons des sables font des arches de trente pas, et sous les côtes, à l'ombre, il fait dix degrés de moins qu'ailleurs.",
        "L'Onde ne se comporte pas normalement ici. Elle est *lente*. Yohan lève la main et le bourdonnement met deux secondes à répondre, comme un écho revenu de très loin.",
        "Dans la troisième cage thoracique, quelque chose brille encore, à l'endroit où le cœur aurait été."
      ],
      choix:[
        {label:"Aller le chercher", detail:"+22 Fatigue · l'Onde traîne, ici, et elle s'accroche",
         suite:"prend", effets:{fat:22}},
        {label:"Écouter d'abord ce que fait l'Onde ici", detail:"Jet de Volonté (15) · comprendre avant de toucher",
         test:{stat:"vol", dc:15}, reussite:"ecoute_ok", echec:"ecoute_ko"},
        {label:"Ressortir de sous les côtes", detail:"Tout ici est plus vieux que la prudence",
         suite:"sort", effets:{xp:14}},
      ]
    },
    prend:{
      texte:[
        "C'est une pierre, ou ce qui a été une pierre, prise dans un os qui a fondu autour d'elle. Elle est tiède. Elle est tiède depuis probablement quatre siècles.",
        "Quand Yohan la dégage, le bourdonnement s'arrête net dans tout le cimetière — d'un coup, partout, comme si on avait fermé une porte. Le silence dure trois secondes et c'est le silence le plus complet qu'il ait jamais entendu.",
        "Puis tout reprend, et il est seul sous des côtes de dragon avec une chose chaude dans la main."
      ],
      effets:{item:"u_lance_aza", sang:16, xp:60},
      fin:true
    },
    ecoute_ok:{
      texte:[
        "Yohan s'assied et ne fait rien pendant une heure, ce qui est la chose la plus difficile qu'on puisse demander à un porteur de l'Onde.",
        "Ce qu'il finit par comprendre le glace : l'Onde n'est pas lente ici, elle est *rassasiée*. Quelque chose de très grand en a pris beaucoup, il y a longtemps, et digère encore.",
        "La chose qui brille sous les côtes n'est pas un trésor. C'est ce qui reste d'un repas.",
        "Il la prend quand même — mais il sait maintenant ce qu'il tient, et il ne le tiendra pas de la même façon."
      ],
      effets:{item:"u_lance_aza", sang:24, xp:76, flags:["cycle_compris"]},
      fin:true
    },
    ecoute_ko:{
      texte:[
        "Yohan écoute, et l'Onde lui rend son propre bourdonnement décalé d'une seconde, ce qui au bout de dix minutes devient insupportable.",
        "Il ressort en trébuchant, la tête pleine d'un écho qui n'est pas le sien, et met deux jours à s'en défaire."
      ],
      effets:{fat:26, xp:20},
      fin:true
    },
    sort:{
      texte:[
        "Yohan ressort à la lumière et le bourdonnement redevient normal d'un coup, comme on remonte à l'air.",
        "Il regarde une dernière fois sous les côtes. Ça brille toujours. Ça brillera encore quand il sera mort."
      ],
      fin:true
    },
  }
},

/* ══════════════════ ELTHARION ══════════════════ */
{
  id:"EW2_CHANT", titre:"Le chant qu'on n'a pas le droit d'entendre", famille:"ELFE", rarete:"rare",
  image:"evt2_chant", lieux:["LOC_006"],
  scenes:{
    start:{
      pnj:"alarielle",
      texte:[
        "On chante quelque part sous les arbres, et Yohan s'aperçoit qu'il s'est arrêté de marcher sans décider de s'arrêter.",
        "Ce n'est pas beau. C'est autre chose : c'est *juste*, comme une pièce qui rentre. Le bourdonnement de l'Onde s'aligne dessus tout seul et redescend d'un cran.",
        "Un garde de la Cour apparaît sans bruit sur le sentier. Il n'a pas la main sur son arme. Il a la main levée, paume ouverte : arrêtez-vous là.",
        "« Ce chant n'est pas pour vous. Ce n'est pas une insulte. C'est un fait de fabrication. »"
      ],
      choix:[
        {label:"Demander pourquoi", detail:"Jet de Volonté (14) · un elfe expliquera si la question est bien posée",
         test:{stat:"vol", dc:14}, reussite:"pourquoi_ok", echec:"pourquoi_ko"},
        {label:"S'asseoir sur le sentier et écouter quand même", detail:"Ils ne frapperont pas · ils noteront",
         suite:"assis", effets:{fat:-18, sang:6, xp:30, reputation:{elfes:-10}}},
        {label:"Repartir immédiatement", detail:"On lui a demandé poliment",
         suite:"part", effets:{xp:16, reputation:{elfes:6}}},
        {label:"Demander qu'on le chante pour lui", detail:"Requiert l'estime des Elfes",
         requis:{reputationMin:{elfes:30}}, suite:"pour_lui"},
      ]
    },
    pourquoi_ok:{
      pnj:"alarielle",
      texte:[
        "Le garde réfléchit longtemps — pour un elfe, c'est de la courtoisie, pas de l'hésitation.",
        "« Il apaise. C'est tout ce qu'il fait. » Il désigne les arbres. « Il a été composé pour des gens qui vivent neuf cents ans et qui, au bout de six cents, ont besoin qu'on leur enlève un peu de mémoire chaque nuit pour continuer. »",
        "« Vous, vous en avez quatre-vingts. Si on vous en enlève, il ne reste rien. »",
        "Yohan reste un moment sans savoir quoi répondre à ça. Le garde attend, patiemment, parce qu'il a le temps.",
        "« Merci de me l'avoir dit », finit par dire Yohan. — « Personne ne le demande jamais », répond le garde. « On préfère croire qu'on nous refuse quelque chose. »"
      ],
      effets:{sang:12, xp:48, reputation:{elfes:14}},
      fin:true
    },
    pourquoi_ko:{
      texte:[
        "« Pourquoi ? » Le garde considère la question, et la trouve mal posée.",
        "« Parce que non. » Il ne bouge pas. Il ne bougera pas avant Yohan, et il peut tenir jusqu'à demain.",
        "Yohan repart avec le chant encore dans la tête et rien pour l'expliquer."
      ],
      effets:{xp:14},
      fin:true
    },
    assis:{
      texte:[
        "Yohan s'assied en travers du sentier, dos à un arbre, et écoute.",
        "Le garde ne le touche pas. Il s'assied en face, à six pas, et attend que ce soit fini. Deux autres arrivent et s'assoient aussi. Personne ne dit un mot.",
        "Le chant dure une heure. Quand il s'arrête, la Fatigue de Yohan est retombée comme après trois jours de sommeil, et il comprend en se relevant qu'il vient de prendre quelque chose à des gens qui ne pouvaient pas l'empêcher.",
        "Le garde se lève aussi. « Nous n'écrirons pas que vous avez été violent », dit-il. « Nous écrirons ce que vous avez fait. C'est pire. »"
      ],
      fin:true
    },
    pour_lui:{
      pnj:"alarielle",
      texte:[
        "Le garde s'écarte, va chercher quelqu'un, et revient avec trois chanteuses qui regardent Yohan avec une curiosité polie.",
        "Elles ne chantent pas le chant. Elles en chantent un autre, plus court, dont Alarielle expliquera plus tard qu'il a été composé au premier siècle pour les morts d'un peuple allié — donc pour des gens qui ne vivaient pas neuf cents ans.",
        "Il existait. Il attendait depuis mille ans que quelqu'un le mérite.",
        "Quand c'est fini, la plus âgée dit simplement : « Voilà. Maintenant nous ne pourrons plus dire que nous ne le faisons pas. »"
      ],
      effets:{fat:-30, sang:20, xp:70, item:"u_larme_eltharion", reputation:{elfes:10}},
      fin:true
    },
    part:{
      texte:["Yohan reprend le sentier en sens inverse. Le chant le suit sur cent pas, puis les arbres le referment."],
      fin:true
    },
  }
},
{
  id:"EW2_JARDIN", titre:"Le jardin qu'on laisse mourir", famille:"ELFE", rarete:"commun",
  image:"evt2_jardin", lieux:["LOC_006"],
  scenes:{
    start:{ pnj:"jardiniere",
      texte:[
        "Il y a un jardin, à l'écart de la Cour, que personne n'entretient plus. Les elfes passent devant sans le regarder, ce qui chez eux demande un effort constant.",
        "Il meurt. Lentement, comme meurent les choses elfiques : sans pourrir, en se retirant.",
        "Une vieille jardinière y vient encore, sans outils, et se contente de rester là quelques heures par jour."
      ],
      choix:[
        {label:"Lui demander pourquoi on l'abandonne", detail:"Jet de Volonté (12)",
         test:{stat:"vol", dc:12}, reussite:"pourquoi_ok", echec:"pourquoi_ko"},
        {label:"Payer de quoi le remettre en état", detail:"−320 or · les elfes n'accepteront pas l'or d'un homme",
         requis:{or:320}, suite:"paye", effets:{or:-320}},
        {label:"Y travailler soi-même une journée", detail:"Sans permission, sans témoin utile",
         suite:"travaille", effets:{xp:34, sang:6, reputation:{elfes:8}}},
      ]
    },
    pourquoi_ok:{ pnj:"jardiniere",
      texte:[
        "« Il a été planté pour quelqu'un », dit la vieille. « Elle est morte. Le jardin n'a plus de destinataire. »",
        "Yohan met un moment à comprendre que ce n'est pas de la tristesse : c'est de la comptabilité. Un jardin elfique est adressé à une personne, comme une lettre. Quand la personne meurt, la lettre n'a plus à être postée.",
        "« Vous pourriez le réadresser. » — « À qui ? » Elle sourit un peu. « Il faudrait quelqu'un qui vive assez longtemps pour que ça vaille la peine. »",
        "Elle le regarde. Elle a fait exprès de dire ça devant lui, et ils le savent tous les deux."
      ],
      choix:[
        {label:"Se proposer", detail:"Quatre-vingts ans, ce n'est pas rien pour un homme",
         suite:"adresse", effets:{sang:18, xp:56, reputation:{elfes:16}}},
        {label:"Proposer de l'adresser aux Parias", detail:"Un peuple, pas une personne · c'est irrégulier",
         suite:"parias", effets:{sang:14, xp:50, reputation:{elfes:6, parias:12}}},
        {label:"Ne rien proposer du tout", detail:"Ce n'est pas à lui d'hériter d'un jardin",
         suite:"rien", effets:{xp:22}},
      ]
    },
    pourquoi_ko:{ pnj:"jardiniere",
      texte:[
        "La vieille répond quelque chose sur les saisons et le sens des choses, et Yohan comprend au bout de dix minutes qu'elle est en train de ne pas lui répondre avec beaucoup de talent.",
        "Il la laisse à son jardin."
      ],
      effets:{xp:10},
      fin:true
    },
    adresse:{ pnj:"jardiniere",
      texte:[
        "« Alors adressez-le-moi. »",
        "Elle ne rit pas, ce qui est déjà une politesse. Elle demande son nom complet, sa maison, et la date à laquelle il pense mourir — question qu'un elfe pose sans malice.",
        "« Je n'en sais rien. » — « Bien. Alors nous dirons : jusqu'à. »",
        "Le jardin reprend en trois semaines. Il portera son nom sur un registre d'Eltharion pendant très longtemps après qu'il n'y aura plus personne pour le lire."
      ],
      fin:true
    },
    parias:{ pnj:"jardiniere",
      texte:[
        "« Adressez-le aux Parias. »",
        "La vieille repose ses mains sur ses genoux. « Un jardin s'adresse à quelqu'un. » — « Alors adressez-le à quelqu'un qui n'est pas encore né. »",
        "Long silence. Puis : « C'est irrégulier. » — « Oui. » — « Ce sera contesté. » — « Probablement. » — « Bien. »",
        "Il faudra deux ans à la Cour pour statuer. Elle statuera oui, à une voix, et personne ne saura jamais laquelle."
      ],
      fin:true
    },
    rien:{ pnj:"jardiniere",
      texte:[
        "Yohan ne dit rien. La vieille hoche la tête sans reproche — elle a proposé, il a entendu, l'affaire est close.",
        "Le jardin mettra encore quarante ans à finir de se retirer. Elle sera morte avant lui."
      ],
      fin:true
    },
    paye:{ pnj:"jardiniere",
      texte:[
        "Yohan pose l'argent. La vieille le regarde comme on regarde quelqu'un qui offre du sel à un poisson.",
        "« Ce n'est pas de l'argent qui manque. » Elle repousse les pièces avec deux doigts. « C'est quelqu'un à qui il serve. »",
        "Il remporte son or, un peu moins bête qu'en arrivant."
      ],
      effets:{or:320, xp:24},
      fin:true
    },
    travaille:{ pnj:"jardiniere",
      texte:[
        "Yohan arrache ce qui doit l'être, dégage ce qui étouffe, et remet de l'eau là où il en faut. Il fait ça mal, avec des mains d'homme d'armes, et il casse deux choses qu'il ne fallait pas casser.",
        "La vieille le regarde faire toute la journée sans intervenir une seule fois.",
        "Le soir, elle dit : « Vous avez perdu votre temps. » Un temps. « Merci. »"
      ],
      fin:true
    },
  }
},

/* ══════════════════ LES PROFONDEURS VERTES ══════════════════ */
{
  id:"EW2_TRIBUT", titre:"Le tribut des Profondeurs", famille:"PEAU_VERTE", rarete:"commun",
  image:"evt2_tribut", lieux:["LOC_009"],
  scenes:{
    start:{
      texte:[
        "Le passage est tenu par onze Peaux-Vertes qui ne sont pas là pour se battre. Ils sont là pour percevoir, ce qui est une innovation.",
        "Leur chef — une femelle orque d'un mètre quatre-vingt-dix qui a compté Yohan, ses armes et sa fatigue en trois secondes — annonce le tarif dans un impérial correct : « La moitié de ce que tu portes. Ou tu contournes. Le contour fait six jours. »",
        "Derrière elle, un jeune tient un bâton de compte avec des encoches. Ils tiennent des comptes."
      ],
      choix:[
        {label:"Payer le tribut", detail:"−260 or · six jours valent plus que ça",
         requis:{or:260}, suite:"paye", effets:{or:-260, xp:20, reputation:{peaux_vertes:8}}},
        {label:"Négocier un tarif de passage régulier", detail:"Jet de Volonté (15) · leur vendre l'idée d'un client",
         test:{stat:"vol", dc:15}, reussite:"nego_ok", echec:"nego_ko"},
        {label:"Refuser et passer", detail:"Onze, et le passage est étroit",
         suite:"refuse"},
        {label:"Contourner", detail:"Six jours de perdus, aucun ennemi de plus",
         suite:"contourne", effets:{xp:10}},
      ]
    },
    paye:{
      texte:[
        "Yohan paie. Le jeune taille une encoche, la compte à voix haute, et la chef vérifie.",
        "Puis elle s'écarte, et — c'est ça, le plus étrange — elle escorte Yohan jusqu'au bout du passage pour que personne d'autre ne le détrousse.",
        "« Tu as payé », explique-t-elle. « Si on te prend, tu ne paieras plus. »",
        "Il n'y a pas de meilleure définition d'un péage."
      ],
      fin:true
    },
    nego_ok:{
      texte:[
        "« Combien de gens paient, par mois ? »",
        "La chef plisse les yeux. Le jeune répond avant elle : « Quatre. » Elle lui met une claque à l'arrière du crâne, mais c'est dit.",
        "Yohan propose un tarif annuel, payé d'avance, contre passage libre et escorte. Un client qui revient plutôt que quatre qu'on détrousse une fois.",
        "Elle met un long moment à peser la chose — pas parce qu'elle est lente, parce que personne ne lui a jamais proposé de contrat. Puis elle crache dans sa main et la tend.",
        "Le jeune taille une encoche d'un genre nouveau."
      ],
      effets:{or:-140, sang:10, xp:52, reputation:{peaux_vertes:20}, flags:["passage_vert_paye"]},
      fin:true
    },
    nego_ko:{
      texte:[
        "Yohan parle de tarif annuel, de client fidèle, de volume. La chef l'écoute jusqu'au bout, par curiosité.",
        "« Non », dit-elle enfin. « Toi, tu veux payer moins. Moi, je veux que tu paies. »",
        "C'est difficile à contredire."
      ],
      choix:[
        {label:"Payer le tarif plein", detail:"−260 or", requis:{or:260},
         suite:"paye", effets:{or:-260, xp:16, reputation:{peaux_vertes:6}}},
        {label:"Contourner", detail:"Six jours", suite:"contourne", effets:{xp:8}},
      ]
    },
    refuse:{
      texte:[
        "Yohan avance. La chef soupire — vraiment, un soupir de contrariété administrative — et lève son arme.",
        "Le jeune, derrière, retourne son bâton de compte pour ne pas l'abîmer."
      ],
      combat:{ groupe:[{bst:"BST_034", n:2},{bst:"BST_017", n:2}], victoire:"refuse_gagne", defaite:"refuse_perdu", mortel:false },
    },
    refuse_gagne:{
      texte:[
        "Ils rompent et refluent dans les galeries basses en emportant leurs blessés, ce qui est plus discipliné que ce que font la plupart des compagnies humaines.",
        "Yohan passe. Sur le sol, le bâton de compte est resté, avec ses encoches soigneuses.",
        "Dans un mois, il y aura douze Peaux-Vertes au passage au lieu de onze, et ils ne discuteront plus."
      ],
      effets:{xp:44, sang:6, reputation:{peaux_vertes:-14}, item:"armure_os"},
      fin:true
    },
    refuse_perdu:{
      texte:[
        "Onze, dans un passage étroit, ça ne se contourne pas.",
        "Yohan revient à lui plus bas dans la galerie, allégé de sa bourse et pas d'autre chose. On l'a laissé vivant, ce qui n'est pas de la clémence : un mort ne repasse jamais."
      ],
      effets:{or:-300, pv:-18, xp:16, reputation:{peaux_vertes:-6}},
      fin:true
    },
    contourne:{
      texte:[
        "Six jours de marche autour, sur des chemins qui montent et qui descendent sans jamais avancer.",
        "Yohan arrive épuisé, avec tout son or et six jours de moins devant lui. C'était peut-être le bon choix. On ne le saura pas."
      ],
      effets:{fat:14},
      fin:true
    },
  }
},
{
  id:"EW2_JEUNE_CHEF", titre:"Celui qui veut être vu perdre", famille:"PEAU_VERTE", rarete:"rare",
  image:"evt2_jeune_chef", lieux:["LOC_009"],
  scenes:{
    start:{ pnj:"gruk",
      texte:[
        "Il s'appelle Gruk et il a peut-être dix-sept ans. Il barre le chemin seul, ce qui chez les siens est soit du courage, soit un très mauvais calcul.",
        "« Bats-toi », dit-il. « Devant eux. » Il désigne la crête : trente Peaux-Vertes assis, immobiles, qui regardent.",
        "Yohan met un moment à comprendre. Le petit ne veut pas gagner. Un jeune qui affronte seul un homme dont on parle et qui *tient un moment* devient quelqu'un. Un jeune qui n'ose pas reste un jeune."
      ],
      choix:[
        {label:"Se battre, et le laisser bien paraître", detail:"Jet de Précision (15) · perdre convenablement demande du métier",
         test:{stat:"precision", dc:15}, reussite:"beau_ok", echec:"beau_ko"},
        {label:"Se battre pour de bon", detail:"Il a demandé un combat",
         suite:"vrai"},
        {label:"Refuser devant tout le monde", detail:"Le renvoyer à sa crête",
         suite:"refuse", effets:{xp:12, reputation:{peaux_vertes:-10}}},
        {label:"Lui proposer de porter ses affaires trois jours", detail:"Jet de Volonté (14) · une autre manière d'être vu",
         test:{stat:"vol", dc:14}, reussite:"porte_ok", echec:"porte_ko"},
      ]
    },
    beau_ok:{ pnj:"gruk",
      texte:[
        "Yohan se bat mal, exprès, et il faut beaucoup de savoir-faire pour se battre mal de façon convaincante devant trente personnes qui font ça toute leur vie.",
        "Gruk tient quatorze échanges. Il touche deux fois. À la fin, Yohan le met à terre proprement, sans humiliation, et lui tend la main pour le relever — devant la crête.",
        "Le petit se relève seul, parce qu'il faut, mais il a compris. Il le dira à quelqu'un, un jour, ou il ne le dira jamais, ce qui revient au même.",
        "Sur la crête, trente Peaux-Vertes se lèvent et s'en vont sans un mot. C'est une ovation."
      ],
      effets:{sang:12, xp:54, reputation:{peaux_vertes:22}},
      fin:true
    },
    beau_ko:{ pnj:"gruk",
      texte:[
        "Yohan retient ses coups, et Gruk le sent — un gamin des Profondeurs sent ça avant de savoir marcher.",
        "Il s'arrête au milieu d'un échange, furieux, la lèvre fendue. « Tu me donnes. » Il jette son arme. « Je ne veux pas qu'on me donne. »",
        "Il remonte la crête sous les yeux des trente. Ce sera pire que s'il avait perdu."
      ],
      effets:{xp:20, reputation:{peaux_vertes:-8}},
      fin:true
    },
    vrai:{ pnj:"gruk",
      texte:[
        "« Tu as demandé un combat. » Yohan dégaine.",
        "Gruk sourit — vraiment, pour la première fois — et charge."
      ],
      combat:{ groupe:[{champion:"gruk"}], victoire:"vrai_gagne", defaite:"vrai_perdu", mortel:false },
    },
    vrai_gagne:{ pnj:"gruk",
      texte:[
        "Il est à terre au sixième échange, et il n'a rien touché du tout.",
        "Yohan s'écarte. Le petit reste assis dans la poussière un long moment, puis se relève et remonte vers la crête. Personne ne bouge pour l'accueillir.",
        "Il a demandé un vrai combat et il l'a eu. C'est la seule chose qu'on puisse dire pour la défense de cette journée."
      ],
      effets:{xp:34, reputation:{peaux_vertes:4}},
      fin:true
    },
    vrai_perdu:{ pnj:"gruk",
      texte:[
        "Il est jeune, il est rapide, et Yohan est arrivé fatigué. Ces trois faits mis bout à bout font une chute dans la poussière et un silence de trente personnes.",
        "Gruk ne l'achève pas. Il pose son pied sur la lame de Yohan, la fait glisser hors de portée, et remonte la crête.",
        "Cette histoire circulera dans les Profondeurs pendant des années, et elle ne sera pas à l'avantage de Yohan."
      ],
      effets:{pv:-14, xp:20, reputation:{peaux_vertes:12}},
      fin:true
    },
    porte_ok:{ pnj:"gruk",
      texte:[
        "« Non. » Gruk se raidit. « Mais tu vas porter mes affaires. »",
        "Yohan explique : trois jours, à travers les galeries, avec le paquetage du petit sur le dos, devant qui voudra le voir. Un homme dont on parle qui fait le porteur d'un gamin de dix-sept ans.",
        "Gruk le regarde comme s'il venait de proposer quelque chose d'obscène. Puis il calcule — parce qu'il est intelligent, et c'est bien le problème — et il voit exactement ce que ça vaut.",
        "Trois jours plus tard, il a un nom dans les Profondeurs, et Yohan a mal au dos."
      ],
      effets:{sang:16, xp:60, fat:10, reputation:{peaux_vertes:26}},
      fin:true
    },
    porte_ko:{ pnj:"gruk",
      texte:[
        "Yohan propose. Gruk n'entend que l'insulte, pas l'offre, et il n'a pas tort : la moitié de ce qu'on lui propose est humiliante.",
        "« Bats-toi ou pars. »"
      ],
      choix:[
        {label:"Se battre", suite:"vrai", detail:"Il n'y a plus d'autre porte"},
        {label:"Partir", suite:"refuse", detail:"Devant trente personnes", effets:{xp:10, reputation:{peaux_vertes:-10}}},
      ]
    },
    refuse:{ pnj:"gruk",
      texte:[
        "Yohan contourne le gamin et poursuit son chemin.",
        "Sur la crête, personne ne bouge. Gruk reste planté au milieu du passage, seul, pendant très longtemps."
      ],
      fin:true
    },
  }
},

/* ══════════════════ LA FORÊT DES MILLE CORNES ══════════════════ */
{
  id:"EW2_HARDE_BLESSEE", titre:"Ce que les chasseurs ont laissé", famille:"HOMME_BETE", rarete:"commun",
  image:"evt2_harde_blessee", lieux:["LOC_010"],
  scenes:{
    start:{
      texte:[
        "Six carcasses en travers d'une clairière, et pas une n'a été dépecée. On les a tuées et on est reparti.",
        "Ce ne sont pas des bêtes : ce sont des Hommes-Bêtes, et les traces autour sont celles de bottes humaines à clous impériaux. Une patrouille de chasse, primes à l'appui.",
        "La septième est vivante. Elle a une jambe brisée, elle ne peut ni fuir ni se battre, et elle regarde Yohan approcher sans le quitter des yeux."
      ],
      choix:[
        {label:"La soigner", detail:"Elle ne comprendra pas ce qu'on lui fait avant un moment",
         suite:"soigne", effets:{sang:10, xp:40, reputation:{hommes_betes:18}}},
        {label:"Suivre les traces de la patrouille", detail:"Ils ont trois heures d'avance",
         suite:"traque"},
        {label:"L'achever proprement", detail:"Elle ne passera pas la nuit seule",
         suite:"acheve", effets:{xp:20, sang:4, reputation:{hommes_betes:-6}}},
        {label:"Passer son chemin", detail:"La forêt règle ses affaires",
         suite:"passe", effets:{xp:8, reputation:{hommes_betes:-10}}},
      ]
    },
    soigne:{
      texte:[
        "Elle grogne quand il touche la jambe, et ne mord pas, ce qui demande de sa part un effort considérable.",
        "L'attelle est grossière. Elle tiendra. Yohan laisse de l'eau et sa dernière trousse, et s'écarte à dix pas pour dormir — assez loin pour ne pas peser, assez près pour qu'elle sache qu'il est là.",
        "Au matin, elle est partie. À l'endroit où il dormait, quelqu'un a posé trois pierres l'une sur l'autre.",
        "Il mettra des mois à apprendre ce que ça veut dire, et le jour où il l'apprendra, il s'assiéra pour digérer."
      ],
      fin:true
    },
    traque:{
      texte:[
        "Les traces vont vers l'est et ne se cachent pas : ils n'ont aucune raison de se cacher, ils font un travail légal.",
        "Yohan les rattrape au crépuscule, autour d'un feu, en train de compter des oreilles pour la prime."
      ],
      choix:[
        {label:"Les affronter", detail:"Ils sont cinq et ils sont en règle",
         suite:"combat"},
        {label:"Racheter les primes", detail:"−300 or · l'argent leur est plus utile que la chasse",
         requis:{or:300}, suite:"rachete", effets:{or:-300, sang:12, xp:48, reputation:{hommes_betes:14}}},
        {label:"Relever leurs noms et repartir", detail:"Jet de Précision (13) · une liste sert plus tard",
         test:{stat:"precision", dc:13}, reussite:"noms_ok", echec:"noms_ko"},
      ]
    },
    combat:{
      texte:["Yohan entre dans le cercle de feu, et le premier qui se lève comprend en une seconde qu'il ne s'agit pas d'un contrôle."],
      combat:{ groupe:[{champion:"chasseur_paria"},{bst:"BST_002", n:2}], victoire:"combat_gagne", defaite:"combat_perdu", mortel:false },
    },
    combat_gagne:{
      texte:[
        "C'est fini vite. Yohan brûle les primes dans leur propre feu et laisse les vivants repartir à pied.",
        "Sur le chemin du retour, il croise trois silhouettes cornues, immobiles entre deux arbres, qui le regardent passer sans bouger.",
        "Elles n'ont rien fait pendant le combat. Elles étaient là pendant tout le combat."
      ],
      effets:{sang:14, xp:60, suspicion:8, reputation:{hommes_betes:22, humains:-8}},
      fin:true
    },
    combat_perdu:{
      texte:[
        "Ils sont cinq, ils sont payés pour ça, et le chasseur qui les commande a déjà tué des Parias.",
        "Yohan décroche dans le noir, une côte fêlée, et met deux jours à ressortir de la forêt.",
        "La patrouille finira sa saison."
      ],
      effets:{pv:-22, xp:24},
      fin:true
    },
    rachete:{
      texte:[
        "« Combien pour tout ce que vous avez ? »",
        "Le chef de patrouille compte, annonce un chiffre, et Yohan paie sans discuter — ce qui l'inquiète assez pour qu'il pose la question : « Vous les revendez à qui ? »",
        "« À personne. »",
        "Il regarde Yohan brûler les primes dans le feu, et il n'y comprend rien du tout, et ça se voit. C'est peut-être le plus utile de la soirée : quelque part dans l'Empire, cinq hommes racontent maintenant une histoire qui ne tient pas debout."
      ],
      fin:true
    },
    noms_ok:{
      texte:[
        "Yohan reste dans les arbres jusqu'à ce qu'ils s'appellent par leurs noms, et il les note tous les cinq, avec l'unité et le lieutenant qui contresigne les primes.",
        "Il ne fait rien ce soir-là. Mais une liste de cinq noms et d'une signature vaut cher quand on la présente au bon moment, et Yohan a appris à attendre le bon moment."
      ],
      effets:{xp:44, sang:8, flags:["liste_chasseurs"], reputation:{hommes_betes:8}},
      fin:true
    },
    noms_ko:{
      texte:[
        "Ils ne s'appellent pas par leurs noms — ils s'appellent par des numéros, ce qui est une consigne, et une consigne veut dire qu'on leur a déjà reproché quelque chose.",
        "Yohan repart avec cette seule information, qui n'est pas rien, mais qui n'est pas une liste."
      ],
      effets:{xp:18},
      fin:true
    },
    acheve:{
      texte:[
        "Elle ne se débat pas. Elle le regarde faire, et c'est cela qui reste.",
        "Yohan la couvre de branchages comme on fait pour les siens, ce qui n'a peut-être aucun sens ici, et repart.",
        "Trois jours plus tard, il croise une harde qui s'écarte pour le laisser passer, sans un bruit, en le suivant des yeux beaucoup trop longtemps."
      ],
      fin:true
    },
    passe:{
      texte:[
        "Yohan contourne la clairière. Ce n'est pas sa forêt, ce ne sont pas ses morts, et il a mille raisons.",
        "La septième le regarde s'éloigner jusqu'à ce qu'il disparaisse. La forêt, elle, ne le quitte pas des yeux du tout."
      ],
      fin:true
    },
  }
},
{
  id:"EW2_MARQUE", titre:"La marque qu'on ne demande pas", famille:"HOMME_BETE", rarete:"rare",
  image:"evt2_marque", lieux:["LOC_010","LOC_020"],
  scenes:{
    start:{
      texte:[
        "Ils sont vingt et ils l'attendaient. Yohan s'en aperçoit à la manière dont le sous-bois est vide de tout ce qui devrait y vivre.",
        "Le plus vieux s'avance. Il porte les cornes basses et une odeur de fumée froide, et il pose au sol, entre eux, un objet enveloppé de cuir.",
        "Il ne parle pas l'impérial. Il n'en a pas besoin : il désigne l'objet, puis Yohan, puis le nord — et la question tient entière dans ces trois gestes. *Ceci est à toi si tu vas là-bas.*",
        "Le nord, c'est les Pierres. Et ce qu'on demande à quelqu'un qui va aux Pierres, on ne le lui demande pas deux fois."
      ],
      choix:[
        {label:"Accepter sans savoir ce qu'on demande", detail:"C'est exactement ce qu'ils testent",
         suite:"accepte"},
        {label:"Exiger de comprendre d'abord", detail:"Jet de Volonté (16) · sans langue commune",
         test:{stat:"vol", dc:16}, reussite:"comprend_ok", echec:"comprend_ko"},
        {label:"Refuser et reculer lentement", detail:"Vingt · et le sous-bois est vide",
         suite:"refuse", effets:{xp:16, reputation:{hommes_betes:-12}}},
      ]
    },
    accepte:{
      texte:[
        "Yohan ramasse le paquet sans l'ouvrir et se met en marche vers le nord.",
        "Ils l'accompagnent — pas en escorte : en cortège. Personne ne le touche, personne ne lui parle, et à chaque halte quelqu'un dépose de la nourriture à trois pas de lui et s'écarte.",
        "Aux Pierres, on lui montre où se tenir. Il se tient là. On lui montre quand écouter. Il écoute. Ce qui monte des Pierres n'est pas un son — c'est la même chose que l'Onde, mais qui ne demande rien.",
        "Quand c'est fini, le vieux ouvre le paquet lui-même et lui met la chose dans la main.",
        "Yohan ne saura jamais ce qu'il a été, ce jour-là : un témoin, un otage, une offrande ou un ami. Les quatre sont possibles. Aucun n'est retiré."
      ],
      effets:{item:"u_croc_premier", sang:24, xp:80, flags:["pierres_touchees"], reputation:{hommes_betes:26}},
      fin:true
    },
    comprend_ok:{
      texte:[
        "Yohan s'accroupit et dessine dans la terre. Le vieux s'accroupit en face et corrige son dessin. Cela prend une heure et demie.",
        "Ce qu'ils veulent : un témoin qui ne soit pas de la forêt. Les Pierres enregistrent tout ce qui passe devant elles, et une harde qui témoigne pour elle-même ne prouve rien à l'autre harde.",
        "Il y a eu un mort. Il y a un différend. Il faut quelqu'un d'extérieur qui se tienne aux Pierres et entende ce qu'elles rendent.",
        "« C'est un tribunal », dit Yohan à voix haute, pour lui-même. Le vieux ne comprend pas le mot, mais il comprend le ton, et il hoche la tête."
      ],
      choix:[
        {label:"Y aller", detail:"Témoigner pour des gens dont on ignore la langue",
         suite:"accepte"},
        {label:"Décliner, maintenant qu'on sait", detail:"Un jugement n'est pas une affaire d'étranger",
         suite:"decline", effets:{sang:8, xp:34, reputation:{hommes_betes:4}}},
      ]
    },
    comprend_ko:{
      texte:[
        "Yohan essaie les mots, les gestes, le dessin. Le vieux le regarde s'agiter avec une patience qui finit par ressembler à de la pitié.",
        "Au bout d'un moment il ramasse le paquet, le remet sous son bras, et la harde se retire dans le sous-bois sans un bruit.",
        "On ne lui redemandera pas."
      ],
      effets:{xp:20, reputation:{hommes_betes:-6}},
      fin:true
    },
    decline:{
      texte:[
        "Yohan refuse en connaissance de cause, ce qui n'est pas la même chose que refuser par peur — et le vieux fait la différence.",
        "Il reprend le paquet sans rancune apparente et désigne la route de l'ouest : *va-t'en par là, c'est plus court.*",
        "C'est le premier conseil qu'un Homme-Bête lui ait donné."
      ],
      fin:true
    },
    refuse:{
      texte:[
        "Yohan recule sans quitter le vieux des yeux, une main ouverte, jusqu'à sentir un arbre dans le dos.",
        "Personne ne bouge. Personne ne le suit. Le sous-bois se referme, et il met deux heures à retrouver un chemin qu'il connaissait pourtant."
      ],
      fin:true
    },
  }
},

/* ══════════════════ MONT-DRAKEN ══════════════════ */
{
  id:"EW2_VEINE", titre:"La veine qui répond", famille:"ONDE", rarete:"rare",
  image:"evt2_veine", lieux:["LOC_003"],
  scenes:{
    start:{
      texte:[
        "À mi-hauteur du Mont-Draken, la roche est tiède. Plus haut, elle est chaude. Plus haut encore, il y a une fissure d'où monte une lumière rouge qui pulse lentement — trois battements, une pause, trois battements.",
        "Yohan compte les battements sans le vouloir. Puis il s'aperçoit que sa propre Fatigue bat au même rythme, et qu'elle a commencé avant qu'il compte."
      ],
      choix:[
        {label:"Se laisser accorder au rythme", detail:"+30 Fatigue · voir ce qui se passe quand on cesse de résister",
         suite:"accorde", effets:{fat:30}},
        {label:"Résister et redescendre", detail:"Jet de Volonté (14)",
         test:{stat:"vol", dc:14}, reussite:"resiste_ok", echec:"resiste_ko"},
        {label:"Descendre dans la fissure", detail:"Jet de Précision (16) · elle est étroite et elle est chaude",
         test:{stat:"precision", dc:16}, reussite:"fissure_ok", echec:"fissure_ko"},
      ]
    },
    accorde:{
      texte:[
        "Yohan cesse de résister, et la montagne le prend.",
        "Ce n'est pas douloureux. C'est *large*. Pendant un temps qu'il ne pourra pas évaluer, il n'est pas particulièrement lui-même, et il ne trouve rien à y redire.",
        "Ce qui le ramène, c'est le froid : le soleil est passé de l'autre côté de la crête. Il a perdu six heures et il est assis à quarante pas de l'endroit où il croyait être.",
        "Dans sa main, une écaille de pierre qu'il n'a pas ramassée."
      ],
      effets:{sang:20, xp:56, fat:10, item:"accessoire_amulette", flags:["draken_ouverte"]},
      fin:true
    },
    resiste_ok:{
      texte:[
        "Yohan reprend son propre rythme de force, un battement à la fois, jusqu'à ce que le sien et celui de la montagne cessent de coïncider.",
        "C'est épuisant et c'est une victoire : il vient de prouver, à lui-même et à personne d'autre, que l'Onde peut être tenue quand elle vient de dehors.",
        "Il redescend en connaissant une chose que peu de porteurs savent."
      ],
      effets:{sang:14, xp:48, flags:["sait_traque_fatigue"]},
      fin:true
    },
    resiste_ko:{
      texte:[
        "Yohan résiste jusqu'au vertige, gagne trois minutes, et perd tout d'un coup.",
        "Il se réveille plus bas, la joue contre la pierre chaude, avec un mal de tête qui durera une semaine et le sentiment très net que quelque chose l'a reposé là."
      ],
      effets:{fat:34, pv:-10, xp:20},
      fin:true
    },
    fissure_ok:{
      texte:[
        "La fissure fait huit pas de profondeur et se termine sur une paroi lisse, qui n'est pas de la roche.",
        "C'est de l'écaille. Une seule, de la taille d'une porte de grange, et elle monte et descend très lentement.",
        "Yohan ressort en marche arrière, sans respirer, et met une heure à redescendre le versant. Il ne dira à personne ce qu'il a vu, et il évitera Mont-Draken pendant très longtemps.",
        "Le dragon n'est pas une légende. Il est simplement en train de dormir, et le Mont-Draken est ce qu'on voit de lui."
      ],
      effets:{sang:26, xp:70, suspicion:-4, flags:["draken_ouverte","verite_cicatrice"]},
      fin:true
    },
    fissure_ko:{
      texte:[
        "À six pas, la chaleur devient une main posée sur la poitrine, et Yohan comprend qu'il n'ira pas plus loin sans y rester.",
        "Il ressort brûlé aux avant-bras, sans avoir rien vu, et avec la certitude désagréable d'avoir été très près de quelque chose."
      ],
      effets:{pv:-16, fat:18, xp:22},
      fin:true
    },
  }
},
{
  id:"EW2_PELERIN", titre:"Celui qui monte pour ne pas redescendre", famille:"VOYAGE", rarete:"commun",
  image:"evt2_pelerin", lieux:["LOC_003"],
  scenes:{
    start:{
      pnj:"perrin",
      texte:[
        "Il monte depuis quatre jours et il en a pour deux de plus, sauf qu'il n'en a pas pour deux de plus : il tousse comme un homme qui n'ira pas jusqu'au soir.",
        "« On monte au Draken pour mourir dedans », explique-t-il entre deux quintes, presque gaiement. « Ça se fait dans ma vallée. On y monte quand on sait. »",
        "Il a soixante-dix ans, un sac trop lourd, et il a refusé trois fois qu'on l'accompagne."
      ],
      choix:[
        {label:"Porter son sac jusqu'en haut", detail:"Deux jours perdus, et il arrivera",
         suite:"porte", effets:{sang:12, xp:44, fat:8}},
        {label:"Le convaincre de redescendre", detail:"Jet de Volonté (15) · il n'a pas tort et c'est le problème",
         test:{stat:"vol", dc:15}, reussite:"descend_ok", echec:"descend_ko"},
        {label:"Lui demander ce qu'il y a dans le sac", detail:"Jet de Précision (12)",
         test:{stat:"precision", dc:12}, reussite:"sac_ok", echec:"sac_ko"},
        {label:"Le laisser à sa montagne", detail:"Il a choisi et il l'a dit trois fois",
         suite:"laisse", effets:{xp:14}},
      ]
    },
    porte:{
      texte:[
        "Yohan prend le sac et règle son pas sur le vieux, ce qui veut dire s'arrêter tous les cent pas et faire semblant d'admirer le paysage.",
        "Ils arrivent le troisième soir. Le vieux s'assied face à la fissure rouge, remercie poliment, et demande qu'on le laisse.",
        "Yohan redescend seul avec un sac vide et deux jours de retard. En bas, il s'aperçoit qu'il y a encore quelque chose dedans : une lettre, adressée à une femme d'une vallée qu'il ne connaît pas, avec l'itinéraire au dos.",
        "Il la portera. Ce n'est pas un choix : c'est ce qui reste à faire."
      ],
      fin:true
    },
    descend_ok:{
      texte:[
        "« Vous avez raison », dit Yohan. « Et vous allez redescendre quand même. »",
        "Le vieux le regarde de travers. « Vous êtes le premier à commencer par me donner raison. »",
        "« Parce que vous l'avez. Vous allez mourir. Ce n'est pas ça que je conteste. » Yohan s'assied sur une pierre. « Ce que je conteste, c'est que vous mouriez à quatre jours de gens qui vous auraient veillé. »",
        "Le vieux met très longtemps à répondre. Puis il tend son sac.",
        "Ils redescendent. Il mourra onze jours plus tard, dans un lit, entouré, en jurant que la montagne n'a rien perdu."
      ],
      effets:{sang:16, xp:58, or:120},
      fin:true
    },
    descend_ko:{
      texte:[
        "Yohan argumente pendant une demi-heure, bien, avec de bonnes raisons.",
        "Le vieux l'écoute, puis reprend son sac. « Vous parlez comme quelqu'un qui n'a pas encore eu à choisir. »",
        "Il repart en montant. Yohan le regarde jusqu'à ce que la pente le prenne."
      ],
      effets:{xp:22},
      fin:true
    },
    sac_ok:{
      texte:[
        "Le sac pèse quarante livres et contient : une couverture, deux jours de pain, et trente-deux livres de pierres.",
        "« Elles viennent de chez moi », dit le vieux sans gêne aucune. « On monte avec sa vallée. Sinon on monte tout seul. »",
        "Yohan reste un moment à digérer l'idée qu'un homme de soixante-dix ans a porté sa vallée sur quatre jours de dénivelé pour ne pas mourir en étranger."
      ],
      choix:[
        {label:"Porter les pierres", detail:"Quarante livres, deux jours", suite:"porte",
         effets:{sang:14, xp:50, fat:10}},
        {label:"Le laisser", detail:"Il porte ce qu'il a choisi de porter", suite:"laisse", effets:{xp:18}},
      ]
    },
    sac_ko:{
      texte:[
        "« De quoi je vis », répond le vieux, et il change de sujet avec une habileté qui ne laisse aucune ouverture.",
        "Il repart en montant. Le sac est trop lourd pour ce qu'il prétend contenir, et Yohan le sait, et il est déjà trop loin pour redemander."
      ],
      effets:{xp:12},
      fin:true
    },
    laisse:{
      texte:[
        "Yohan le salue et poursuit sa route.",
        "Deux cents pas plus loin, il se retourne. Le vieux monte toujours, très lentement, très droit."
      ],
      fin:true
    },
  }
},

/* ══════════════════ LA CÔTE DES DENTS & LES ÎLES ══════════════════ */
{
  id:"EW2_MAREE", titre:"Ce que la marée rend", famille:"VOYAGE", rarete:"commun",
  image:"evt2_maree", lieux:["LOC_019"],
  scenes:{
    start:{
      texte:[
        "La marée basse de la Côte des Dents découvre deux cents pas de fond, et le fond est un cimetière de coques.",
        "Les gens du village le savent et attendent. Ils sont dix-huit sur la grève, avec des paniers, et personne ne bouge avant le signal du plus vieux — parce que la mer remonte vite ici et qu'elle a déjà pris des ramasseurs.",
        "Aujourd'hui, elle a rendu quelque chose de gros : une cale entière, éventrée, avec des caisses encore sanglées dedans.",
        "Le plus vieux ne donne pas le signal. Il regarde le ciel."
      ],
      choix:[
        {label:"Descendre avant le signal", detail:"Une heure d'avance sur dix-huit personnes",
         suite:"avance", effets:{or:340, xp:26, reputation:{humains:-8}}},
        {label:"Attendre le signal avec eux", detail:"Jet de Volonté (12) · ne pas être celui qui déclenche la ruée",
         test:{stat:"vol", dc:12}, reussite:"attend_ok", echec:"attend_ko"},
        {label:"Demander au vieux ce qu'il regarde", detail:"Jet de Précision (14)",
         test:{stat:"precision", dc:14}, reussite:"ciel_ok", echec:"ciel_ko"},
      ]
    },
    avance:{
      texte:[
        "Yohan descend seul et personne ne le suit — ce qui aurait dû lui mettre la puce à l'oreille.",
        "Il remonte trois caisses avant que la mer ne change d'avis. Elle change d'avis en quatre minutes, comme elle le fait ici, et il termine la dernière remontée avec de l'eau à la poitrine.",
        "Sur la grève, dix-huit personnes le regardent, silencieuses, leurs paniers vides. Il a ce qu'il voulait. Il ne repassera pas par ce village."
      ],
      fin:true
    },
    attend_ok:{
      texte:[
        "Yohan attend. C'est plus long qu'il n'y paraît, avec des caisses sanglées à deux cents pas.",
        "Le vieux donne le signal onze minutes plus tard, quand le vent tourne — et dix-huit personnes descendent ensemble, se répartissent la cale sans un mot, et remontent avant la mer.",
        "On lui donne une part, parce qu'il a attendu. C'est moins que ce qu'il aurait pris seul. On lui offre aussi un lit et un repas, et l'usage du village à chaque passage, ce qui vaut beaucoup plus."
      ],
      effets:{or:180, sang:8, xp:44, reputation:{humains:12}, item:"trousse_campagne"},
      fin:true
    },
    attend_ko:{
      texte:[
        "Yohan attend, mal, en se déplaçant vers la pente, et quatre personnes le voient faire.",
        "Quand le signal tombe, il descend avec les autres, et récupère ce qu'on récupère quand on est arrivé avec les mains d'un homme qui n'a jamais ramassé une épave.",
        "Personne ne lui reproche rien. Personne ne lui propose rien non plus."
      ],
      effets:{or:90, xp:20},
      fin:true
    },
    ciel_ok:{
      texte:[
        "« Le vent », dit le vieux sans quitter l'horizon. « Il tourne dans un quart d'heure. Avant, la mer remonte par la faille du nord et vous la prenez dans le dos sans la voir. »",
        "Il explique le reste sans qu'on le lui demande : où poser les pieds, quelles coques sont creuses, pourquoi on ne ramasse jamais ce qui brille.",
        "« Vous êtes le premier étranger à demander au lieu de courir », conclut-il. « Les autres, on les repêche ou on ne les repêche pas. »",
        "Il donne le signal. Il fait signe à Yohan de descendre avec lui, à sa gauche, à l'endroit où on met les gens dont on veut qu'ils reviennent."
      ],
      effets:{or:210, sang:10, xp:52, reputation:{humains:14}, flags:["cote_liberee"]},
      fin:true
    },
    ciel_ko:{
      texte:[
        "« Rien », dit le vieux, et il ne quitte pas le ciel des yeux.",
        "Le signal tombe onze minutes plus tard sans que Yohan ait compris ce qui a changé. Il descend avec les autres et remonte avec sa part, en se demandant tout du long ce que ce vieux voit qu'il ne voit pas."
      ],
      effets:{or:120, xp:18},
      fin:true
    },
  }
},
{
  id:"EW2_NAUFRAGES", titre:"Ceux qui ne veulent pas être sauvés", famille:"VOYAGE", rarete:"rare",
  image:"evt2_naufrages", lieux:["LOC_019","LOC_013"],
  scenes:{
    start:{
      texte:[
        "Ils sont sept sur un rocher qui découvre à marée basse et disparaît à marée haute. Ils y sont depuis trois marées.",
        "Yohan a une barque. Il crie. Ils répondent — ils sont conscients, ils vont bien, ils comprennent parfaitement la situation.",
        "Et ils refusent de monter.",
        "« Pas encore », crie le plus âgé, la main en visière. « Revenez à la nuit. »"
      ],
      choix:[
        {label:"Insister maintenant", detail:"La marée monte dans deux heures",
         suite:"insiste"},
        {label:"Demander ce qu'ils attendent", detail:"Jet de Volonté (14) · à travers vingt pas d'eau",
         test:{stat:"vol", dc:14}, reussite:"attend_ok", echec:"attend_ko"},
        {label:"Revenir à la nuit comme demandé", detail:"Leur faire confiance sans rien comprendre",
         suite:"nuit"},
      ]
    },
    attend_ok:{
      texte:[
        "Il faut trois échanges pour que ça sorte, et ça sort de travers, comme sortent les choses qu'on a honte de dire.",
        "Le navire n'a pas coulé. Il est parti — sans eux, sur ordre, parce qu'ils avaient été mis à la mer. Sept hommes débarqués sur un rocher : c'est une exécution qui ne salit personne.",
        "Ce qu'ils attendent, c'est la nuit, parce que le navire mouille de l'autre côté du cap et qu'à la nuit il repartira. Tant qu'il est là, un canot qui approche du rocher se voit à deux lieues.",
        "« Si on monte maintenant », crie le vieux, « c'est vous qu'ils viendront chercher. »"
      ],
      choix:[
        {label:"Revenir à la nuit", detail:"Ils ont raison et ils ont compté",
         suite:"nuit"},
        {label:"Aller voir le navire d'abord", detail:"Sept hommes mis à la mer, c'est un capitaine à voir",
         suite:"navire"},
      ]
    },
    attend_ko:{
      texte:[
        "Le vent emporte la moitié des mots et Yohan ne recompose rien de cohérent. Ils crient, il crie, personne ne comprend personne.",
        "Au bout d'un moment, le vieux fait un geste sans équivoque : *partez*."
      ],
      choix:[
        {label:"Insister", suite:"insiste", detail:"Deux heures avant la marée"},
        {label:"Revenir à la nuit", suite:"nuit", detail:"Faire confiance sans comprendre"},
      ]
    },
    insiste:{
      texte:[
        "Yohan approche la barque. Deux d'entre eux la repoussent du pied, sérieusement, en gueulant de partir.",
        "Il finit par en embarquer trois — les trois qui ont cédé — et laisse les quatre autres sur le rocher.",
        "Deux heures plus tard, depuis la côte, il voit un canot quitter le cap et se diriger vers le rocher. Il n'y a rien à faire à cette distance. Rien du tout.",
        "Les trois qu'il a sauvés ne lui adresseront pas la parole pendant deux jours."
      ],
      effets:{sang:6, xp:34, pv:-6, reputation:{humains:-6}},
      fin:true
    },
    nuit:{
      texte:[
        "Yohan revient à la nuit noire, sans lanterne, à la rame, et il fait trois voyages parce que la barque ne prend que trois hommes.",
        "Sept vivants sur la grève, gelés, muets. Le vieux serre la main de Yohan un peu trop longtemps.",
        "« Vous avez fait ce qu'on vous a dit », lâche-t-il enfin. « Personne ne fait jamais ce qu'on lui dit. »",
        "Ils lui donneront le nom du navire et celui du capitaine. Le nom du capitaine servira."
      ],
      effets:{sang:16, xp:62, or:90, flags:["livre_bord","equipage_enterre"], reputation:{humains:10}},
      fin:true
    },
    navire:{
      texte:[
        "Le navire mouille derrière le cap, feux couverts, en attendant que le rocher fasse son travail.",
        "Yohan monte à bord par l'ancre. Le capitaine est dans sa cabine, en train de tenir son livre de bord — et ce qu'il y écrit, à cet instant, est le mot *naufrage*."
      ],
      choix:[
        {label:"Prendre le livre de bord et repartir", detail:"Jet de Précision (15) · une preuve vaut mieux qu'un cadavre",
         test:{stat:"precision", dc:15}, reussite:"livre_ok", echec:"livre_ko"},
        {label:"L'obliger à aller les chercher lui-même", detail:"Jet de Volonté (16)",
         test:{stat:"vol", dc:16}, reussite:"oblige_ok", echec:"oblige_ko"},
      ]
    },
    livre_ok:{
      texte:[
        "Yohan sort avec le livre et laisse le capitaine avec la seule chose qui lui reste : le temps de comprendre.",
        "Il récupère les sept à la nuit, comme prévu. Le livre, lui, ira à Port-Noir, où il vaudra très cher au bon acheteur — et beaucoup plus cher encore au bon tribunal."
      ],
      effets:{sang:20, xp:74, or:260, flags:["livre_bord","equipage_enterre"], reputation:{humains:8}},
      fin:true
    },
    livre_ko:{
      texte:[
        "Le pont grince. Le capitaine lève la tête. Il crie.",
        "Yohan repart par l'ancre avec une flèche dans l'épaule et sans le livre, et il faudra ramer beaucoup plus vite que prévu.",
        "Il récupère les sept quand même. C'est déjà ça."
      ],
      effets:{sang:12, xp:48, pv:-18, flags:["equipage_enterre"]},
      fin:true
    },
    oblige_ok:{
      texte:[
        "Yohan pose la pointe de son épée sur le livre ouvert, pas sur l'homme.",
        "« Vous allez écrire ce que vous avez fait, vous allez signer, et vous allez aller les chercher vous-même. »",
        "Le capitaine le fait. Il le fait mal, en tremblant, devant son propre équipage qui regarde son commandant ramer à la place d'un matelot.",
        "Ce navire ne se tiendra plus jamais tout à fait pareil. C'est le vrai châtiment, et il durera plus longtemps qu'une pendaison."
      ],
      effets:{sang:22, xp:80, flags:["livre_bord","equipage_enterre"], reputation:{humains:14}},
      fin:true
    },
    oblige_ko:{
      texte:[
        "Le capitaine n'est pas un lâche, ce qui complique tout. Il appelle, et il y a onze hommes sur ce pont."
      ],
      combat:{ groupe:[{champion:"garde_leopold", n:3}], victoire:"pont_gagne", defaite:"pont_perdu", mortel:false },
    },
    pont_gagne:{
      texte:[
        "Yohan tient le pont assez longtemps pour que l'équipage comprenne qu'il n'a pas envie de mourir pour la comptabilité de son capitaine.",
        "Ils vont chercher les sept eux-mêmes. Le capitaine reste enfermé dans sa cabine tout le temps que ça dure."
      ],
      effets:{sang:18, xp:70, suspicion:10, flags:["equipage_enterre"], item:"armure_plate_legere"},
      fin:true
    },
    pont_perdu:{
      texte:[
        "Onze hommes sur un pont mouillé, c'est trop. Yohan passe par-dessus bord et nage jusqu'à sa barque avec du sang dans l'eau derrière lui.",
        "Il récupère les sept à la nuit, comme prévu. Personne ne saura jamais qu'il a essayé autre chose."
      ],
      effets:{pv:-22, xp:40, flags:["equipage_enterre"]},
      fin:true
    },
  }
},
{
  id:"EW2_ILE", titre:"L'île qui n'était pas là", famille:"ONDE", rarete:"rare",
  image:"evt2_ile", lieux:["LOC_013"],
  scenes:{
    start:{
      texte:[
        "Le pilote la voit avant Yohan, et il s'arrête de parler au milieu d'une phrase.",
        "Une île. À deux lieues au sud-ouest. Basse, boisée, avec une plage claire — et absente de trois cartes différentes qu'il a sous la main, dont une qu'il a levée lui-même il y a six ans.",
        "« On rentre », dit-il, et il commence déjà à virer.",
        "L'Onde, dans la poitrine de Yohan, fait quelque chose qu'elle n'a jamais fait : elle *tire*."
      ],
      choix:[
        {label:"Exiger qu'on y aille", detail:"Jet de Volonté (15) · le pilote a très peur et il a raison",
         test:{stat:"vol", dc:15}, reussite:"aborde", echec:"refuse_pilote"},
        {label:"Y aller seul, à la nage, à marée descendante", detail:"+26 Fatigue · deux lieues",
         suite:"aborde", effets:{fat:26, pv:-8}},
        {label:"Relever sa position et rentrer", detail:"Jet de Précision (13) · savoir où elle était",
         test:{stat:"precision", dc:13}, reussite:"releve_ok", echec:"releve_ko"},
        {label:"Rentrer sans rien noter", detail:"Certaines choses n'ont pas à être trouvées deux fois",
         suite:"rentre", effets:{xp:16}},
      ]
    },
    aborde:{
      texte:[
        "La plage est vraie. Le sable est du sable, les arbres sont des arbres, et à trente pas du rivage il y a une murette de pierre sèche, montée de main d'homme, haute de trois pieds.",
        "Elle enclôt un carré parfait de vingt pas de côté. À l'intérieur : rien. De l'herbe rase, tondue par personne.",
        "L'Onde ne tire plus. Elle *attend*, ce qui est infiniment pire."
      ],
      choix:[
        {label:"Entrer dans le carré", detail:"+20 Fatigue",
         suite:"carre", effets:{fat:20}},
        {label:"Faire le tour sans entrer", detail:"Jet de Précision (14)",
         test:{stat:"precision", dc:14}, reussite:"tour_ok", echec:"tour_ko"},
        {label:"Repartir tant que la plage est encore là", detail:"Elle ne le sera peut-être pas longtemps",
         suite:"repart", effets:{sang:10, xp:36}},
      ]
    },
    carre:{
      texte:[
        "Yohan enjambe la murette.",
        "Il n'y a pas de vision, pas de voix, pas de lumière. Il y a simplement, d'un coup, la certitude absolue et parfaitement calme qu'il n'est pas le premier, que les autres sont repartis, et qu'ils sont tous morts vieux.",
        "Ce n'est pas un piège. C'est un endroit où l'on va, et d'où l'on revient, et qui n'a jamais rien demandé à personne.",
        "Il ressort au bout de quelques minutes ou de quelques heures. Sa Fatigue est tombée à zéro. Sur le sable, à l'endroit exact où il a franchi la murette, quelqu'un a laissé une empreinte de pied nu qui n'est pas la sienne, et qui date d'aujourd'hui."
      ],
      effets:{fat:-100, sang:26, xp:80, flags:["onde_suivait","cycle_compris"]},
      fin:true
    },
    tour_ok:{
      texte:[
        "Yohan fait le tour de la murette en comptant ses pas, et il compte quatre-vingt-quatre pas pour un carré de vingt pas de côté.",
        "Il recommence. Quatre-vingt-quatre. Il recommence dans l'autre sens. Soixante-seize.",
        "Il note les deux chiffres, remonte dans la barque, et ne remet plus jamais les pieds sur cette île. Ce qu'il a noté, en revanche, il le relira souvent."
      ],
      effets:{sang:18, xp:60, flags:["sceau_ancien_vu"]},
      fin:true
    },
    tour_ko:{
      texte:[
        "Yohan fait le tour, compte, se trompe, recommence, se trompe encore — et finit par admettre qu'il n'a peut-être jamais su compter jusqu'à quatre-vingts sans se perdre.",
        "Il repart avec un léger mal de mer sur la terre ferme, qui met trois jours à passer."
      ],
      effets:{fat:16, xp:24},
      fin:true
    },
    repart:{
      texte:[
        "Yohan remonte dans la barque et rame sans se retourner.",
        "Le pilote, lui, se retourne. « Elle y est encore ? » demande Yohan au bout d'un moment. Un silence. « Non. »"
      ],
      fin:true
    },
    refuse_pilote:{
      texte:[
        "« Non. » Le pilote ne discute même pas, ce qui ne lui ressemble pas. « J'ai quatre enfants et une seule carte de cette mer, et cette île n'est sur aucune des deux. »",
        "Il vire. Yohan pourrait insister. Il regarde l'homme trembler sur sa barre et n'insiste pas.",
        "L'île reste derrière eux pendant une heure, puis n'y est plus."
      ],
      effets:{xp:26, sang:6},
      fin:true
    },
    releve_ok:{
      texte:[
        "Yohan relève trois amers, l'heure, et la hauteur du soleil, et il note tout au dos d'une carte pendant que le pilote rame comme un damné.",
        "La position est bonne. Il y retournera un jour, ou il n'y retournera pas, mais il aura le choix — et c'est tout ce qu'il voulait aujourd'hui."
      ],
      effets:{sang:12, xp:44, flags:["recherche_port_noir"]},
      fin:true
    },
    releve_ko:{
      texte:[
        "Yohan lève trois amers et s'aperçoit en les reportant qu'ils se croisent en trois points différents.",
        "Il refait la mesure. Même chose. Le pilote, qui rame toujours, ne demande pas ce qui ne va pas — il a déjà compris et il préfère ne pas savoir."
      ],
      effets:{xp:20},
      fin:true
    },
    rentre:{
      texte:[
        "« On rentre. »",
        "Le pilote a viré avant la fin du mot. Personne ne parle du voyage du retour, ni ce soir-là, ni jamais."
      ],
      fin:true
    },
  }
},

/* ══════════════════ LA CICATRICE & KARLSBERG ══════════════════ */
{
  id:"EW2_ECHO", titre:"L'écho qui prend une voix connue", famille:"PARIA", rarete:"rare",
  image:"evt2_echo", lieux:["LOC_014","LOC_001"],
  scenes:{
    start:{
      texte:[
        "La Cicatrice renvoie les sons avec quelques secondes de retard — tout le monde le sait, tout le monde s'y fait au bout d'une heure.",
        "Ce à quoi on ne se fait pas, c'est quand l'écho commence à répondre autre chose.",
        "Yohan a dit son propre nom, par habitude, en entrant. Ce qui revient, quatre secondes plus tard, c'est son nom prononcé par la voix de son père."
      ],
      choix:[
        {label:"Répondre", detail:"+18 Fatigue · engager la conversation avec un écho",
         suite:"repond", effets:{fat:18}},
        {label:"Écouter sans répondre", detail:"Jet de Volonté (15) · savoir ce que c'est avant de lui parler",
         test:{stat:"vol", dc:15}, reussite:"ecoute_ok", echec:"ecoute_ko"},
        {label:"Sortir de la Cicatrice", detail:"Immédiatement",
         suite:"sort", effets:{xp:18}},
      ]
    },
    repond:{
      texte:[
        "Yohan répond. La voix répond à sa réponse. Cela dure une heure et demie.",
        "Ce n'est pas son père — il le sait au bout de trois échanges, parce que la chose ne sait rien qu'il ne sache déjà. Elle ne lui apprend rien. Elle lui *renvoie* : ses mots, ses souvenirs, ses reproches, dans une voix qu'il n'a plus entendue depuis dix-neuf ans.",
        "Ce qui est terrible, c'est que ça marche quand même. On peut pleurer devant un miroir.",
        "Il ressort à la nuit, vidé, avec la conviction très nette d'avoir été utilisé pour quelque chose — et sans arriver à regretter."
      ],
      effets:{sang:22, xp:64, fat:14, flags:["onde_suivait"]},
      fin:true
    },
    ecoute_ok:{
      texte:[
        "Yohan se tait, et l'écho continue tout seul.",
        "Il continue pendant vingt minutes. Il dit des choses que le père de Yohan aurait pu dire, puis des choses qu'il n'aurait jamais dites, puis des choses dans un ordre qui ne veut plus rien dire, puis il se met à répéter une seule phrase — la première, avec le nom.",
        "Ce n'est pas un fantôme. C'est un mécanisme, qui a trouvé une prise et qui tire dessus jusqu'à ce que quelqu'un morde.",
        "Yohan repart sans avoir mordu. C'est probablement la chose la plus difficile qu'il ait faite ce mois-là."
      ],
      effets:{sang:26, xp:76, flags:["cycle_compris","sait_traque_fatigue"]},
      fin:true
    },
    ecoute_ko:{
      texte:[
        "Yohan tient sept minutes.",
        "À la huitième, la voix dit quelque chose de précis — un détail d'une nuit d'hiver, une phrase de cuisine, rien du tout — et il répond avant d'avoir décidé de répondre.",
        "L'écho a ce qu'il voulait. La conversation dure jusqu'à la nuit et Yohan ressort en ne sachant plus très bien lesquels de ses souvenirs étaient là avant."
      ],
      effets:{fat:32, sang:14, xp:40},
      fin:true
    },
    sort:{
      texte:[
        "Yohan fait demi-tour et remonte le chemin de la faille sans courir, ce qui lui coûte.",
        "Derrière lui, la voix continue de l'appeler pendant deux cents pas, puis s'arrête net — pas en s'éloignant : en s'arrêtant."
      ],
      fin:true
    },
  }
},
{
  id:"EW2_PIERRE_BLASON", titre:"La pierre qu'on a retournée", famille:"PARIA", rarete:"rare",
  image:"evt2_pierre_blason", lieux:["LOC_001"],
  scenes:{
    start:{
      texte:[
        "Dans le mur d'une bergerie, à deux lieues des ruines, il y a une pierre posée à l'envers.",
        "Le berger ne sait pas pourquoi. Son grand-père a monté ce mur avec ce qu'il trouvait, et ce qu'il trouvait, à l'époque, c'était Karlsberg en morceaux.",
        "Yohan retourne la pierre. Dessous, le loup. Gravé, entier, intact — parce qu'on l'a mis face au mortier, et que le mortier l'a protégé de quarante ans d'édits."
      ],
      choix:[
        {label:"Acheter la pierre au berger", detail:"−120 or · elle vaut ce qu'il en demandera",
         requis:{or:120}, suite:"achete", effets:{or:-120, sang:14, xp:44}},
        {label:"Lui demander s'il y en a d'autres", detail:"Jet de Volonté (13)",
         test:{stat:"vol", dc:13}, reussite:"autres_ok", echec:"autres_ko"},
        {label:"La remettre à l'envers et s'en aller", detail:"Elle a survécu comme ça",
         suite:"remet", effets:{sang:10, xp:34}},
      ]
    },
    achete:{
      texte:[
        "Le berger demande cent vingt pièces avec l'air de quelqu'un qui a lancé un chiffre en l'air et s'attend à être marchandé.",
        "Yohan paie sans marchander, ce qui l'inquiète beaucoup plus que le prix.",
        "Il faudra un chariot, deux hommes et trois jours pour la ramener aux ruines. Elle sera la première pierre du mur qu'on relèvera — et tout le monde le saura, parce qu'il a payé au comptant devant témoins."
      ],
      effets:{flags:["acte_fondation"], reputation:{parias:14}},
      fin:true
    },
    autres_ok:{
      texte:[
        "« Des autres ? » Le berger réfléchit. « Le mur du fond, la fontaine, et le muret du chemin. Tout ce qui est en pierre de taille ici vient de là-haut. »",
        "Il faut deux jours pour faire le tour. Il y en a dix-neuf : linteaux, claveaux, un fragment d'écu, deux blocs avec des lettres.",
        "Toute une vallée a bâti ses murs avec la maison morte, et l'a fait sans malveillance aucune : c'était de la bonne pierre, elle était par terre, et personne n'allait la réclamer.",
        "Yohan met un long moment à décider s'il doit trouver ça terrible ou magnifique. Il finit par penser que c'est les deux, et que c'est ça, être Paria."
      ],
      effets:{sang:20, xp:66, item:"u_cuirasse_loup", flags:["cave_reperee"], reputation:{parias:18}},
      fin:true
    },
    autres_ko:{
      texte:[
        "Le berger se ferme d'un coup — il vient de comprendre à qui il parle, et il vient de comprendre que son mur est fait de la maison d'un mort.",
        "« J'ai rien pris à personne. » — « Je sais. » — « Mon grand-père a rien pris à personne. » — « Je sais. »",
        "Il ne dira plus rien d'utile."
      ],
      effets:{xp:20},
      fin:true
    },
    remet:{
      texte:[
        "Yohan remet la pierre dans le mortier, face contre le mur, exactement comme elle était.",
        "Elle a passé quarante ans à survivre en étant invisible. Il connaît le principe."
      ],
      fin:true
    },
  }
},

/* ══════════════════ L'ARÈNE ROUGE ══════════════════ */
{
  id:"EW2_ARENE_TRUQUEE", titre:"Le combat qu'on vous demande de perdre", famille:"VILLE", rarete:"commun",
  image:"evt2_arene_truquee", lieux:["LOC_017"],
  scenes:{
    start:{
      pnj:"dame_sarre",
      texte:[
        "L'homme qui aborde Yohan sous les gradins ne se présente pas et n'en a pas besoin : il porte l'argent d'une maison, et cela se voit à la façon dont il ne regarde jamais autour de lui.",
        "« Troisième combat. Vous perdez au deuxième échange. » Il pose une bourse sur le banc. « Quatre cents. La moitié maintenant. »",
        "Ce n'est même pas une menace. C'est un tarif, proposé à un homme qui a l'air d'en avoir besoin."
      ],
      choix:[
        {label:"Accepter et perdre comme convenu", detail:"+400 or · et l'Arène retiendra le nom",
         suite:"accepte", effets:{or:400, xp:20, suspicion:-4, reputation:{humains:-10}}},
        {label:"Accepter, prendre l'argent, et gagner", detail:"Jet de Volonté (16) · ils sauront où vous trouver",
         test:{stat:"vol", dc:16}, reussite:"double_ok", echec:"double_ko"},
        {label:"Refuser et le dire au régisseur", detail:"Jet de Précision (14) · encore faut-il être cru",
         test:{stat:"precision", dc:14}, reussite:"denonce_ok", echec:"denonce_ko"},
        {label:"Refuser sans rien dire à personne", detail:"Se battre pour de bon, et voilà tout",
         suite:"refuse", effets:{xp:26}},
      ]
    },
    accepte:{
      texte:[
        "Yohan tombe au deuxième échange, proprement, avec juste ce qu'il faut de conviction.",
        "Les gradins huent. Le régisseur, en sortant, lui glisse : « Vous êtes tombé sur la mauvaise jambe. Un homme qui prend un coup à droite ne tombe pas à gauche. »",
        "Il ne dit rien de plus. Il n'aura pas besoin d'en dire plus : à l'Arène Rouge, on ne raconte pas ces choses-là, on les note.",
        "Yohan ne se battra plus jamais ici sans qu'on regarde de quel côté il tombe."
      ],
      fin:true
    },
    double_ok:{
      texte:[
        "Yohan prend les deux cents pièces, monte sur le sable, et gagne au sixième échange.",
        "Il descend par la sortie des vainqueurs, ce qui est très pratique, parce qu'il y a trois hommes qui l'attendent à celle des vaincus.",
        "Il ne reverra pas l'homme au banc. Il verra son argent, en revanche, réclamé par voie légale trois mois plus tard — avec intérêts, devant un tribunal de Fort-aux-Princes, ce qui est une manière de perdre beaucoup plus élégante que prévu."
      ],
      effets:{or:200, sang:10, xp:56, suspicion:12, reputation:{humains:-6}},
      fin:true
    },
    double_ko:{
      texte:[
        "Yohan prend l'argent et monte sur le sable avec l'intention très ferme de gagner.",
        "Il gagne. Il redescend par la sortie des vaincus parce qu'il ne connaît pas encore l'Arène, et il y a trois hommes.",
        "On lui reprend la bourse, on lui casse deux doigts, et on lui explique posément que la maison ne fait pas de procès à des gens comme lui."
      ],
      effets:{pv:-20, xp:32, suspicion:8, reputation:{humains:-8}},
      fin:true
    },
    denonce_ok:{
      texte:[
        "Le régisseur écoute Yohan jusqu'au bout sans l'interrompre, puis referme son registre.",
        "« Je sais. » Il désigne les gradins du menton. « Trois maisons font ça depuis six ans. Je ne peux rien prouver et je ne peux surtout rien prouver contre elles. »",
        "« Alors pourquoi m'écouter ? » — « Parce que vous êtes le quatrième à venir me le dire, et que le jour où vous serez vingt, je pourrai. »",
        "Il note le nom de la maison, la date, et la somme. Puis il ajoute quelque chose que Yohan ne voit pas : une croix dans une colonne à part."
      ],
      effets:{sang:12, xp:50, reputation:{humains:12}, flags:["arene_tentee"]},
      fin:true
    },
    denonce_ko:{
      texte:[
        "Le régisseur écoute, hoche la tête, et fait exactement ce qu'on fait quand on est payé par les trois maisons : rien.",
        "« Je vais regarder ça », dit-il.",
        "Yohan monte sur le sable en sachant qu'il vient d'être vendu à celui-là même qu'il dénonçait. Le troisième combat sera plus dur que prévu."
      ],
      effets:{xp:22, pv:-14, reputation:{humains:-4}},
      fin:true
    },
    refuse:{
      texte:[
        "Yohan repousse la bourse du dos de la main et monte sur le sable.",
        "Il gagne, ou il perd — cela ne change rien à ce qui compte, et ce qui compte, c'est qu'un homme sous les gradins a noté son nom dans la colonne des choses qui ne s'achètent pas.",
        "Cette colonne-là est courte. Elle sert plus tard."
      ],
      effets:{sang:8, flags:["arene_tentee"], reputation:{humains:6}},
      fin:true
    },
  }
},

/* ══════════════════ PORT-NOIR & LES ROUTES ══════════════════ */
{
  id:"EW2_RECELEUR", titre:"Ce que le receleur ne veut plus garder", famille:"CONTRAT", rarete:"rare",
  image:"evt2_receleur", lieux:["LOC_016","LOC_017"],
  scenes:{
    start:{
      pnj:"taverniere",
      texte:[
        "L'arrière-boutique sent le poisson et le métal. Le receleur — un homme mou, très propre, qui n'a jamais tenu une arme — pose sur la table quelque chose qu'il tient enveloppé dans du drap.",
        "« Je vous le laisse à perte. » Il ne le déballe pas. « Je le veux hors de chez moi avant la fin de la semaine. »",
        "Il n'y a que deux raisons pour qu'un receleur brade : soit ça brûle, soit ça ne se vend pas. Et un objet qui ne se vend pas à Port-Noir, ça n'existe pas."
      ],
      choix:[
        {label:"Acheter sans regarder", detail:"−260 or · c'est ce qu'il propose et il est pressé",
         requis:{or:260}, suite:"aveugle", effets:{or:-260}},
        {label:"Exiger de voir avant", detail:"Jet de Volonté (13)",
         test:{stat:"vol", dc:13}, reussite:"voit_ok", echec:"voit_ko"},
        {label:"Demander qui le cherche", detail:"Jet de Précision (15) · la vraie question",
         test:{stat:"precision", dc:15}, reussite:"qui_ok", echec:"qui_ko"},
        {label:"Sortir", detail:"Une affaire dont le vendeur a peur n'est pas une affaire",
         suite:"sort", effets:{xp:14}},
      ]
    },
    aveugle:{
      texte:[
        "Yohan paie et emporte le paquet sans l'ouvrir, ce qui soulage visiblement le receleur d'un poids considérable.",
        "Il l'ouvre trois rues plus loin : un manteau. Coupe impériale, tissu excellent, et pas un insigne — pas un seul, pas même les traces de coutures d'un insigne retiré. Il a été fabriqué sans.",
        "Dans la doublure, une poche, et dans la poche un carnet vierge. Toutes les pages sont blanches sauf la dernière, qui porte deux mots : *reste : quatre.*"
      ],
      effets:{item:"u_manteau_livre", sang:14, xp:52, flags:["lfa_connu"]},
      fin:true
    },
    voit_ok:{
      texte:[
        "Le receleur déballe de mauvaise grâce. C'est un manteau. Sans insigne. Le tissu vaut trois fois ce qu'il en demande.",
        "« Il vient d'où ? » — « D'un homme qui l'a laissé chez moi en dépôt. » — « Et alors ? » — « Alors il est revenu le chercher », dit le receleur, « et je lui ai dit que je l'avais vendu, parce que j'avais peur, et maintenant il faut que ce soit vrai. »"
      ],
      choix:[
        {label:"L'acheter au prix proposé", detail:"−260 or", requis:{or:260},
         suite:"achete_vu", effets:{or:-260, item:"u_manteau_livre", sang:16, xp:60, flags:["lfa_connu"]}},
        {label:"L'acheter et rester en attendant qu'il revienne", detail:"−260 or · une occasion de le voir",
         requis:{or:260}, suite:"attend", effets:{or:-260, item:"u_manteau_livre", sang:20, xp:70, flags:["lfa_connu","lfa_vu_venir"]}},
        {label:"Refuser d'être le mensonge de quelqu'un", detail:"Il se débrouillera",
         suite:"sort", effets:{sang:6, xp:26}},
      ]
    },
    voit_ko:{
      texte:[
        "« Je ne déballe pas. » Le receleur remet le paquet sous son comptoir. « C'est le prix ou c'est rien. »",
        "Yohan sort. Le lendemain, la boutique a brûlé, et personne dans le quartier n'a rien vu."
      ],
      effets:{xp:24, flags:["lfa_connu"]},
      fin:true
    },
    qui_ok:{
      texte:[
        "« Qui le cherche ? »",
        "Le receleur ouvre la bouche et la referme trois fois. Puis il écrit quelque chose sur un bout de papier et le pousse vers Yohan au lieu de le dire — ce qui, chez un homme dont le métier est de parler bas, veut dire quelque chose.",
        "Trois lettres : **L.F.A.**",
        "« Je ne sais pas ce que c'est », dit-il très vite. « C'est comme ça qu'il a signé le reçu. Il signe. Il ne donne pas de nom, il signe. »"
      ],
      choix:[
        {label:"Acheter le manteau", detail:"−260 or", requis:{or:260},
         suite:"achete_vu", effets:{or:-260, item:"u_manteau_livre", sang:20, xp:70, flags:["lfa_connu"]}},
        {label:"Laisser le manteau et emporter le reçu", detail:"Une signature vaut mieux qu'un vêtement",
         suite:"recu", effets:{sang:18, xp:64, flags:["lfa_connu","lfa_registre_vu"]}},
      ]
    },
    qui_ko:{
      texte:[
        "« Personne. » Le receleur ment mal, mais il ment avec une constance admirable, et Yohan n'en tirera rien de plus aujourd'hui.",
        "« Le prix ou la porte. »"
      ],
      choix:[
        {label:"Payer", detail:"−260 or", requis:{or:260}, suite:"aveugle", effets:{or:-260}},
        {label:"La porte", suite:"sort", detail:"", effets:{xp:12}},
      ]
    },
    achete_vu:{
      texte:[
        "Yohan emporte le manteau. Le receleur ferme derrière lui et tire deux verrous qu'il n'avait pas mis en entrant.",
        "Dans la doublure, une poche. Dans la poche, un carnet vierge dont la dernière page porte deux mots : *reste : quatre.*"
      ],
      fin:true
    },
    attend:{
      texte:[
        "Yohan reste. Deux jours, dans l'arrière-boutique, avec un receleur qui transpire et une porte qu'on ne quitte pas des yeux.",
        "Personne ne vient. Le troisième matin, il y a un mot glissé sous la porte, écrit d'une main régulière :",
        "« *Vous portez mon manteau. Il vous ira. C'est le problème.* »"
      ],
      fin:true
    },
    recu:{
      texte:[
        "Yohan laisse le manteau et emporte le reçu, ce que le receleur trouve franchement incompréhensible.",
        "Trois lettres au bas d'un papier de dépôt, et une écriture qu'il reconnaîtra désormais partout où il la reverra.",
        "C'est peu. C'est plus qu'il n'avait ce matin."
      ],
      fin:true
    },
    sort:{
      texte:["Yohan sort. Derrière lui, le receleur remballe son paquet avec des gestes de plus en plus rapides."],
      fin:true
    },
  }
},
{
  id:"EW2_CONVOI", titre:"Le convoi qui n'aurait pas dû passer là", famille:"VOYAGE", rarete:"commun",
  image:"evt2_convoi", lieux:["LOC_011","LOC_012","LOC_016"],
  scenes:{
    start:{
      texte:[
        "Six chariots, quatre gardes, aucune bannière. Ce n'est pas assez d'escorte pour la marchandise et c'est trop d'escorte pour du grain.",
        "Le convoyeur en chef arrête Yohan de loin, la main sur son arbalète, et lui propose de l'engager avant même de savoir qui il est — ce qui veut dire qu'il a très peur de quelque chose."
      ],
      choix:[
        {label:"Accepter l'escorte", detail:"+220 or à l'arrivée · sans poser de questions",
         suite:"escorte"},
        {label:"Demander ce qu'ils transportent", detail:"Jet de Précision (14)",
         test:{stat:"precision", dc:14}, reussite:"quoi_ok", echec:"quoi_ko"},
        {label:"Les laisser passer et suivre à distance", detail:"Jet de Volonté (13) · voir ce qui les attend",
         test:{stat:"vol", dc:13}, reussite:"suit_ok", echec:"suit_ko"},
        {label:"Poursuivre son chemin", detail:"Ce n'est pas votre convoi",
         suite:"passe", effets:{xp:10}},
      ]
    },
    escorte:{
      texte:[
        "Yohan marche avec eux trois jours. Ils sont attaqués une fois, mollement, par des gens qui décrochent dès qu'ils comptent les lames.",
        "À l'arrivée, on le paie rubis sur l'ongle, et le convoyeur en chef lui serre la main avec une reconnaissance qui dépasse largement les services rendus.",
        "Yohan ne saura jamais ce qu'il y avait dans les chariots. Il y a des jours où c'est très bien comme ça."
      ],
      effets:{or:220, xp:36, reputation:{humains:6}},
      fin:true
    },
    quoi_ok:{
      texte:[
        "Yohan monte sur un moyeu et regarde par-dessus la bâche avant qu'on ait pu l'en empêcher.",
        "Des gens. Trente et un, serrés, silencieux, dont onze enfants. Pas enchaînés — c'est la première chose qu'il vérifie.",
        "Le convoyeur en chef ne dégaine pas. Il dit simplement, très bas : « Ils viennent des Champs de Cendre. Ils vont à l'ouest. Vous descendez de mon chariot, ou vous montez dedans avec eux. »",
        "Ce n'est pas de la contrebande. C'est un passage."
      ],
      choix:[
        {label:"Escorter le convoi jusqu'au bout", detail:"Aucun salaire · et c'est plus dangereux que prévu",
         suite:"passage", effets:{sang:16, xp:60, suspicion:8, reputation:{parias:16, humains:-4}}},
        {label:"Donner de l'argent et repartir", detail:"−200 or", requis:{or:200},
         suite:"donne", effets:{or:-200, sang:8, xp:40, reputation:{parias:8}}},
        {label:"Signaler le convoi à la prochaine garnison", detail:"C'est illégal, et c'est vrai",
         suite:"denonce", effets:{or:300, suspicion:-14, xp:20, reputation:{parias:-24, humains:14}}},
      ]
    },
    quoi_ko:{
      texte:[
        "Le convoyeur pose sa main sur la bâche avant que Yohan n'en soit à trois pas. « Non. »",
        "Il n'y a pas de suite à ça. Le convoi repart, et Yohan reste sur la route avec la certitude d'avoir manqué quelque chose."
      ],
      effets:{xp:16},
      fin:true
    },
    passage:{
      texte:[
        "Ils marchent onze jours et sont contrôlés deux fois. La première, le papier suffit. La seconde, il faut qu'un homme se tienne entre un sergent et une bâche et le regarde jusqu'à ce qu'il regarde ailleurs.",
        "Trente et un arrivés. Le convoyeur ne remercie pas — dans son métier, remercier, c'est reconnaître.",
        "Il donne à Yohan un itinéraire plié en quatre, avec quatre maisons marquées d'une croix. « Si un jour c'est vous dans le chariot. »"
      ],
      effets:{flags:["reseau_parias"]},
      fin:true
    },
    donne:{
      texte:[
        "Yohan donne ce qu'il a sur lui et redescend du chariot.",
        "Le convoyeur empoche sans compter et remonte sur son siège. « Vous auriez pu venir. » — « Je sais. » — « Bon. »",
        "Le convoi repart vers l'ouest. Yohan le regarde partir plus longtemps qu'il n'aurait cru."
      ],
      fin:true
    },
    denonce:{
      texte:[
        "La garnison est à quatre heures. Le sergent écoute, note, paie la prime d'information, et fait seller douze hommes.",
        "Yohan ne saura pas ce qu'ils ont trouvé, ni où sont allés les trente et un, ni ce qu'est devenue la femme qui l'a regardé par la fente de la bâche pendant qu'il descendait du moyeu.",
        "Il l'apprendra un peu, plus tard, par la façon dont certaines portes cesseront de s'ouvrir."
      ],
      fin:true
    },
    suit_ok:{
      texte:[
        "Yohan les suit à une demi-lieue pendant deux jours, et le troisième matin il voit ce qu'ils redoutaient : dix-huit cavaliers en travers de la route, qui attendent depuis la veille.",
        "Ce n'est pas une embuscade de pillards. Ils portent des couleurs, ils ont un officier, et ils ont un papier.",
        "Yohan a le temps de prendre une décision, ce qui est un luxe qu'il doit à ces deux jours de marche derrière une bâche."
      ],
      choix:[
        {label:"Prévenir le convoi", detail:"Ils ont une chance de contourner",
         suite:"prevenir", effets:{sang:14, xp:56, reputation:{parias:12}}},
        {label:"Regarder ce qui se passe", detail:"Savoir de quoi il retourne exactement",
         suite:"regarde", effets:{sang:8, xp:44, flags:["liste_chasseurs"]}},
      ]
    },
    suit_ko:{
      texte:[
        "Yohan les perd au deuxième embranchement. Ils ont pris une route qui n'est pas sur les cartes, ce qui répond à peu près à toutes les questions qu'il se posait.",
        "Il ne les reverra pas."
      ],
      effets:{xp:18},
      fin:true
    },
    prevenir:{
      texte:[
        "Yohan coupe par la crête et arrive avec une heure d'avance sur les chariots.",
        "Le convoyeur écoute, blêmit, et fait demi-tour sans discuter une seule seconde — ce qui prouve qu'il savait exactement de quoi Yohan parlait.",
        "Ils perdront neuf jours et arriveront quand même. C'est tout ce qu'il y a à dire, et c'est beaucoup."
      ],
      fin:true
    },
    regarde:{
      texte:[
        "Yohan regarde depuis la crête. Cela dure vingt minutes.",
        "Ils ne tuent personne. Ils font descendre tout le monde, comptent, notent, chargent onze personnes dans un chariot de la garnison, et laissent repartir les vingt autres.",
        "Onze sur trente et un. Ils avaient une liste, et sur cette liste il y avait onze noms.",
        "Yohan redescend quand la route est vide et ramasse ce que l'officier a laissé tomber en remontant à cheval : un feuillet de contrôle, avec onze noms et, en bas, un tampon à trois lettres."
      ],
      fin:true
    },
    passe:{
      texte:["Yohan les croise, les salue, et poursuit. Les chariots grincent longtemps derrière lui."],
      fin:true
    },
  }
},
{
  id:"EW2_VEILLEE", titre:"La veillée aux Pierres", famille:"HOMME_BETE", rarete:"commun",
  image:"evt2_veillee", lieux:["LOC_020","LOC_014"],
  scenes:{
    start:{
      texte:[
        "Quatre-vingts Hommes-Bêtes autour des Pierres, assis, immobiles, depuis le lever du jour. Il n'y a pas de feu. Il n'y a pas un bruit.",
        "Yohan comprend au bout d'un moment ce qui manque : les jeunes. Il n'y a que des adultes et des vieux. Les jeunes ont été envoyés ailleurs.",
        "Ce qui se passe ici est quelque chose qu'on ne montre pas aux enfants."
      ],
      choix:[
        {label:"S'asseoir avec eux", detail:"Sans savoir ce qu'on veille",
         suite:"assied", effets:{sang:14, xp:48, fat:-16, reputation:{hommes_betes:16}}},
        {label:"Écouter ce que rendent les Pierres", detail:"Jet de Volonté (16) · +20 Fatigue",
         test:{stat:"vol", dc:16}, reussite:"ecoute_ok", echec:"ecoute_ko", effets:{fat:20}},
        {label:"Se retirer sans troubler", detail:"On ne s'invite pas à une veillée",
         suite:"retire", effets:{xp:20, reputation:{hommes_betes:6}}},
      ]
    },
    assied:{
      texte:[
        "Yohan s'assied au bord du cercle, à l'extérieur, sans demander.",
        "Personne ne se retourne. Personne ne le chasse. Cela dure jusqu'à la nuit, et il est incapable de dire à quel moment il a cessé d'attendre que quelque chose arrive.",
        "Quand ils se lèvent, ils se lèvent tous ensemble, et se dispersent sans un mot. Le dernier passe devant Yohan, s'arrête, le renifle longuement — franchement, sans gêne — et repart.",
        "Il a été enregistré."
      ],
      effets:{flags:["pierres_sonnees"]},
      fin:true
    },
    ecoute_ok:{
      texte:[
        "Yohan ouvre l'Onde, doucement, et écoute ce que les Pierres tiennent.",
        "Ce n'est pas une voix. C'est un *registre* : tout ce qui est passé devant elles, dans l'ordre, sans jugement. Des hardes, des saisons, des hommes à cheval, une armée, une autre armée, un incendie, quatre siècles de silence, une armée encore.",
        "Et, il y a très longtemps, quelque chose de très grand qui est passé sans toucher terre.",
        "Il rouvre les yeux avec le nez qui saigne et quatre-vingts têtes cornues tournées vers lui — parce que ce qu'il vient de faire, ils l'ont senti, et parce qu'aucun homme n'avait jamais pu le faire."
      ],
      effets:{sang:28, xp:84, flags:["pierres_accordees","cycle_compris"], reputation:{hommes_betes:24}},
      fin:true
    },
    ecoute_ko:{
      texte:[
        "Yohan ouvre l'Onde et les Pierres ne lui rendent rien du tout — ou plutôt, elles lui rendent tout en même temps, ce qui revient à un mur.",
        "Il tient quatre secondes et se retrouve à quatre pattes dans l'herbe, la tête pleine d'un bruit de foule.",
        "Deux Hommes-Bêtes le relèvent et le portent hors du cercle sans brutalité, comme on sort quelqu'un qui a fait un malaise. Ce n'est pas hostile. C'est juste très humiliant."
      ],
      effets:{fat:24, pv:-8, xp:26},
      fin:true
    },
    retire:{
      texte:[
        "Yohan recule hors de vue et attend la nuit à un quart de lieue.",
        "Il ne saura jamais ce qu'ils veillaient. Mais quand il repassera par ce chemin, six mois plus tard, il y aura trois pierres empilées à l'endroit exact où il s'était arrêté."
      ],
      fin:true
    },
  }
},

/* ══════════════════ LES COLS ══════════════════ */
{
  id:"EW2_COL_FERME", titre:"Le col qu'on a fermé sans le dire", famille:"VOYAGE", rarete:"commun",
  image:"evt2_col_ferme", lieux:["LOC_003","LOC_012"],
  scenes:{
    start:{
      texte:[
        "La barrière est neuve, en travers du chemin, et elle ne porte aucun sceau. Deux hommes la gardent, mal payés et mal équipés, qui ne savent visiblement pas eux-mêmes pour qui ils travaillent.",
        "« Col fermé. » — « Par qui ? » — « On nous a dit fermé. »",
        "Derrière la barrière, la route est parfaitement praticable. Et à deux cents pas, on voit passer des chariots dans l'autre sens, qui eux ne sont pas arrêtés."
      ],
      choix:[
        {label:"Payer le passage comme les chariots", detail:"−90 or · c'est clairement le tarif",
         requis:{or:90}, suite:"paye", effets:{or:-90, xp:22}},
        {label:"Remonter à qui appartiennent les chariots", detail:"Jet de Précision (14)",
         test:{stat:"precision", dc:14}, reussite:"chariots_ok", echec:"chariots_ko"},
        {label:"Renverser la barrière", detail:"Deux hommes qui n'ont pas envie de mourir pour ça",
         suite:"renverse", effets:{xp:26, suspicion:8, reputation:{humains:-8}}},
        {label:"Passer par la crête", detail:"Une journée de plus, personne à qui parler",
         suite:"crete", effets:{fat:12, xp:14}},
      ]
    },
    paye:{
      texte:[
        "Yohan paie. L'un des gardes note la somme sur une ardoise et l'autre lève la barrière.",
        "Sur l'ardoise, en descendant la colonne, il y a une trentaine de lignes du jour — et le montant varie du simple au quadruple selon le nom en face.",
        "Ce n'est pas un péage. C'est un tri."
      ],
      fin:true
    },
    chariots_ok:{
      texte:[
        "Les chariots portent la marque d'une maison de commerce de Fort-aux-Princes, et ils passent gratuitement parce que la barrière est à eux.",
        "Fermer un col qu'on ne possède pas, laisser passer ses propres convois, faire payer les autres : c'est illégal, c'est parfaitement rentable, et personne n'a le temps d'aller vérifier au fond d'une montagne.",
        "Yohan relève le nom et le nombre de convois. Ce papier vaudra quelque chose à quelqu'un — et ce quelqu'un est probablement un concurrent."
      ],
      effets:{sang:10, xp:48, or:220, reputation:{humains:8}},
      fin:true
    },
    chariots_ko:{
      texte:[
        "Les bâches sont anonymes, les convoyeurs muets, et les traces de roues se perdent au premier lacet.",
        "Yohan finit par payer comme tout le monde, ce qui est exactement ce que le dispositif attendait de lui."
      ],
      effets:{or:-90, xp:16},
      fin:true
    },
    renverse:{
      texte:[
        "Yohan met la barrière en travers du ravin d'un coup d'épaule. Les deux gardes le regardent faire sans esquisser un geste — ils sont payés à la journée, pas au courage.",
        "« Vous allez avoir des ennuis », dit l'un, poliment. — « Vous aussi. » — « Oui », concède-t-il. « Mais nous, on est déjà en bas de l'échelle. »",
        "Le col restera ouvert trois semaines. Puis il y aura une nouvelle barrière, et quatre gardes."
      ],
      fin:true
    },
    crete:{
      texte:[
        "La crête est haute, ventée, et parfaitement praticable pour qui n'a pas de chariot.",
        "Yohan redescend de l'autre côté à la nuit, sans avoir payé et sans avoir parlé à personne. Il croise, dans la descente, deux familles qui font la même chose avec des enfants sur le dos.",
        "Elles n'ont pas eu le choix. Lui si. C'est toute la différence, et elle ne se voit pas sur le chemin."
      ],
      fin:true
    },
  }
},

/* ══════════════════ LE DÉSERT PROFOND ══════════════════ */
{
  id:"EW2_SANS_OMBRE", titre:"L'homme qui marche sans ombre", famille:"KHESH", rarete:"commun",
  image:"evt2_sans_ombre", lieux:["LOC_005","LOC_015"],
  scenes:{
    start:{
      texte:[
        "Il marche à trois cents pas, dans la même direction que Yohan, du même pas que Yohan, depuis quatre heures.",
        "Il ne se rapproche pas. Il ne s'éloigne pas. Il porte les habits d'un homme des Dunes et il n'a ni eau ni bête.",
        "Et à midi, quand le soleil est droit au-dessus, il n'a pas d'ombre. Yohan le vérifie trois fois."
      ],
      choix:[
        {label:"Aller à sa rencontre", detail:"+14 Fatigue · l'Onde le désigne clairement",
         suite:"rencontre", effets:{fat:14}},
        {label:"Changer de direction et voir", detail:"Jet de Précision (12)",
         test:{stat:"precision", dc:12}, reussite:"devie_ok", echec:"devie_ko"},
        {label:"L'ignorer et continuer", detail:"Le désert produit des choses, on ne discute pas avec",
         suite:"ignore", effets:{xp:18}},
      ]
    },
    rencontre:{
      texte:[
        "Yohan coupe vers lui. L'homme s'arrête et attend — première chose qu'il fasse de la journée qui ne soit pas exactement ce que fait Yohan.",
        "De près, il est parfaitement ordinaire : quarante ans, le visage brûlé, une cicatrice au menton. Il parle khesh, puis impérial quand il voit que Yohan ne suit pas.",
        "« Vous me voyez. » Ce n'est pas une question, et il y a dedans un tel soulagement que Yohan ne sait pas quoi en faire.",
        "Il est mort il y a onze jours, de soif, à deux heures de marche d'un puits qu'il n'a pas su trouver. Il continue de marcher parce qu'il ne sait pas faire autre chose, et parce que personne ne lui a dit."
      ],
      choix:[
        {label:"Le lui dire", detail:"C'est ce qu'on doit à quelqu'un",
         suite:"dit", effets:{sang:18, xp:56, reputation:{khesh:10}}},
        {label:"Le mener au puits", detail:"Deux heures · absurde, et peut-être pas",
         suite:"puits", effets:{sang:22, xp:64, fat:10, reputation:{khesh:14}}},
        {label:"Reculer et partir", detail:"Il n'y a rien à faire pour les morts",
         suite:"recule", effets:{xp:20, fat:8}},
      ]
    },
    dit:{
      texte:[
        "Yohan le lui dit simplement, sans détour, parce qu'il n'y a pas de manière douce.",
        "L'homme écoute, hoche la tête, et regarde ses propres mains un long moment. « Onze jours », répète-t-il. « J'ai cru que c'était le même jour. »",
        "Puis il demande qu'on prévienne son clan, et donne un nom, et une direction.",
        "Il n'est plus là avant que Yohan ait fini de le noter. Le nom, lui, est bon : le clan existe, et il attendait un homme depuis onze jours."
      ],
      fin:true
    },
    puits:{
      texte:[
        "Ils marchent deux heures ensemble sans parler beaucoup. L'homme reconnaît le terrain à mesure et son pas devient plus assuré.",
        "Le puits est là où Yohan a dit qu'il serait. L'homme s'accroupit au bord, regarde l'eau, et rit — un vrai rire, court, incrédule.",
        "« Deux heures. » Il secoue la tête. « Deux heures. »",
        "Il ne boit pas. Il n'en a plus besoin. Mais il fallait qu'il le trouve, et c'est fait, et cela suffit apparemment.",
        "Yohan reste seul au bord du puits, avec l'impression très nette d'avoir rendu un service à quelqu'un qui n'existait plus."
      ],
      fin:true
    },
    recule:{
      texte:[
        "Yohan recule de trois pas. L'homme le regarde reculer et ne bouge pas, et son visage fait quelque chose que Yohan mettra des semaines à cesser de revoir.",
        "Le lendemain, il n'est plus là. Ou il est ailleurs, à marcher au même pas que quelqu'un d'autre."
      ],
      fin:true
    },
    devie_ok:{
      texte:[
        "Yohan oblique de trente degrés vers le nord. À trois cents pas, l'homme oblique de trente degrés vers le nord.",
        "Il oblique encore. L'homme aussi, avec un temps de retard de quatre battements de cœur — toujours le même retard.",
        "Ce n'est pas quelqu'un qui suit. C'est quelque chose qui *répète*.",
        "Yohan cesse de bouger et attend. Au bout de quatre battements, l'homme s'arrête aussi. Ils restent immobiles face à face pendant très longtemps, à trois cents pas, dans un désert vide."
      ],
      effets:{sang:14, xp:50, flags:["onde_suivait"]},
      fin:true
    },
    devie_ko:{
      texte:[
        "Yohan oblique. Quand il regarde de nouveau, il n'y a plus personne — juste du sable et une ligne de crête.",
        "Il passe le reste de la journée à se retourner tous les cent pas."
      ],
      effets:{fat:10, xp:22},
      fin:true
    },
    ignore:{
      texte:[
        "Yohan continue et cesse de regarder. Cela demande de la discipline pendant deux heures, puis cela devient facile.",
        "Au soir, il est seul. Il l'était peut-être depuis le début."
      ],
      fin:true
    },
  }
},

/* ══════════════════ ELTHARION ══════════════════ */
{
  id:"EW2_TRADUCTION", titre:"Le mot qu'on a traduit de travers", famille:"ELFE", rarete:"commun",
  image:"evt2_traduction", lieux:["LOC_006"],
  scenes:{
    start:{
      pnj:"mere_orsen",
      texte:[
        "Une délégation humaine est à la Cour depuis six jours pour négocier des droits de coupe, et ça se passe très mal sans que personne comprenne pourquoi.",
        "Le traducteur impérial est correct. La Cour est courtoise. Et à chaque séance, la température baisse d'un cran.",
        "Yohan, qui n'a rien à voir avec cette affaire, entend par hasard le mot elfique que le traducteur rend par « exploitation », et quelque chose sonne faux."
      ],
      choix:[
        {label:"Vérifier le mot", detail:"Jet de Précision (14) · une bibliothèque et deux heures",
         test:{stat:"precision", dc:14}, reussite:"mot_ok", echec:"mot_ko"},
        {label:"Prévenir la délégation humaine", detail:"Jet de Volonté (13) · ils n'aiment pas les conseils",
         test:{stat:"vol", dc:13}, reussite:"humains_ok", echec:"humains_ko"},
        {label:"Ne pas se mêler d'une négociation", detail:"Ce n'est pas votre bois",
         suite:"passe", effets:{xp:14}},
      ]
    },
    mot_ok:{
      texte:[
        "Le mot ne veut pas dire « exploitation ». Il veut dire « prélèvement consenti », et il désigne dans la langue de la Cour un acte qui suppose que la chose prélevée ait, d'une manière ou d'une autre, donné son accord.",
        "Depuis six jours, la délégation impériale demande poliment à Eltharion l'autorisation d'exploiter une forêt. Et depuis six jours, Eltharion entend une délégation étrangère expliquer, séance après séance, qu'elle a l'intention de prendre quelque chose sans le consentement de personne.",
        "Il n'y a pas de conflit. Il y a un traducteur qui a appris la langue dans un livre."
      ],
      choix:[
        {label:"Le dire aux deux camps, en séance", detail:"Devant tout le monde, et devant le traducteur",
         suite:"seance", effets:{sang:14, xp:58, reputation:{elfes:16, humains:12}}},
        {label:"Le dire au traducteur seul", detail:"Lui laisser corriger et garder sa place",
         suite:"traducteur", effets:{sang:10, xp:48, reputation:{elfes:8, humains:8}}},
        {label:"Le garder pour soi", detail:"Une négociation qui échoue laisse une forêt debout",
         suite:"garde", effets:{sang:8, xp:36, reputation:{elfes:10, humains:-8}}},
      ]
    },
    seance:{
      texte:[
        "Yohan demande la parole, ce qu'un homme sans mandat ne fait pas à la Cour lumineuse, et l'obtient — parce que personne ne s'attendait à ce qu'il ose et que la curiosité l'a emporté.",
        "Il explique. En trois phrases. La salle met un temps considérable à absorber le fait que six jours de tension diplomatique reposaient sur un contresens.",
        "Le traducteur devient très pâle. L'ambassadeur devient très rouge. Un conseiller elfique dit quelque chose à voix basse à son voisin et les deux se mettent à rire, ce qui, à Eltharion, ne s'était pas produit en séance depuis quatre-vingts ans.",
        "L'accord sera signé le lendemain."
      ],
      fin:true
    },
    traducteur:{
      texte:[
        "Yohan attend le traducteur dans le couloir et le lui explique sans témoin.",
        "L'homme accuse le coup, vérifie lui-même, revient blême — et corrige le lendemain en séance sans mentionner d'où lui vient la correction.",
        "L'accord sera signé. Personne ne saura. Le traducteur, lui, saura, et il enverra à Yohan, deux ans plus tard, une lettre de recommandation dont il aura grand besoin."
      ],
      fin:true
    },
    garde:{
      texte:[
        "Yohan ne dit rien. La négociation s'enlise trois jours de plus, puis la délégation repart.",
        "La forêt reste debout. Deux cents bûcherons humains resteront sans travail cet hiver, et un traducteur gardera une place qu'il ne mérite pas.",
        "Il n'y a pas de bon choix dans cette histoire. Il y a seulement celui qu'on assume."
      ],
      fin:true
    },
    mot_ko:{
      texte:[
        "Deux heures dans un dépôt d'archives elfiques, et Yohan en ressort avec la certitude que le mot a onze acceptions, dont quatre contradictoires, et qu'il aurait fallu trois siècles pour trancher.",
        "Ce qui est, en soi, une information sur Eltharion."
      ],
      effets:{xp:20},
      fin:true
    },
    humains_ok:{
      texte:[
        "L'ambassadeur écoute Yohan par pure lassitude — il en est à six jours d'échec et il prendrait un conseil d'un chien.",
        "Il fait vérifier. Il découvre. Il ne remercie pas, parce qu'un ambassadeur ne remercie pas un inconnu de lui avoir montré que sa délégation était incompétente.",
        "Mais l'accord est signé dans la semaine, et le nom de Yohan figure dans un rapport, à Astrah, dans une colonne qui n'est pas la colonne habituelle."
      ],
      effets:{sang:10, xp:46, reputation:{humains:14, elfes:6}},
      fin:true
    },
    humains_ko:{
      texte:[
        "« Nos traducteurs sont assermentés », répond l'ambassadeur avec une politesse glaciale. « Le vôtre l'est-il ? »",
        "Yohan n'a pas de traducteur, ni de mandat, ni de raison d'être dans cette pièce, et l'ambassadeur vient de le lui faire remarquer avec beaucoup d'économie.",
        "La négociation échouera. La forêt restera debout."
      ],
      effets:{xp:18, reputation:{elfes:4}},
      fin:true
    },
    passe:{
      texte:["Yohan quitte le couloir des délégations et va s'occuper de ce qui le regarde."],
      fin:true
    },
  }
},

/* ══════════════════ LES CHAMPS DE CENDRE ══════════════════ */
{
  id:"EW2_MOISSON", titre:"La première moisson des Champs", famille:"GUERRE", rarete:"commun",
  image:"evt2_moisson", lieux:["LOC_018"],
  scenes:{
    start:{
      texte:[
        "Ils ont semé. C'est la première chose incroyable. Sur les Champs de Cendre, où le sol rend des os à chaque labour, quarante familles ont semé de l'orge il y a six mois.",
        "Et ça a poussé. C'est la deuxième chose incroyable.",
        "La troisième arrive au galop : douze cavaliers d'une compagnie franche qui a passé l'hiver dans les collines et qui a fait ses comptes en même temps qu'eux."
      ],
      choix:[
        {label:"Se placer entre les cavaliers et le champ", detail:"Douze, et une seule route pour arriver",
         suite:"barre"},
        {label:"Payer la compagnie pour qu'elle passe son chemin", detail:"−400 or · une récolte vaut plus",
         requis:{or:400}, suite:"paye", effets:{or:-400, sang:12, xp:48, reputation:{humains:12}}},
        {label:"Organiser la défense des paysans", detail:"Jet de Volonté (15) · quarante familles, deux heures",
         test:{stat:"vol", dc:15}, reussite:"defense_ok", echec:"defense_ko"},
        {label:"Aider à rentrer ce qui peut l'être", detail:"Sauver un tiers plutôt que perdre tout",
         suite:"rentre", effets:{sang:8, xp:36, reputation:{humains:6}}},
      ]
    },
    barre:{
      texte:[
        "Yohan se met en travers du chemin de terre, seul, et attend.",
        "Le capitaine de la compagnie s'arrête à dix pas. « Un ? » — « Un. » — « Pour de l'orge ? »",
        "« Pour une première récolte », dit Yohan. « Il n'y en a jamais eu ici. »",
        "Le capitaine réfléchit sincèrement — la nourriture est chère, mais un homme seul qui ne bouge pas devant douze cavaliers, ça veut souvent dire quelque chose de désagréable.",
        "Puis il hausse les épaules et met sa lance en arrêt."
      ],
      combat:{ groupe:[{champion:"garde_leopold", n:3},{bst:"BST_002", n:2}], victoire:"barre_gagne", defaite:"barre_perdu", mortel:false },
    },
    barre_gagne:{
      texte:[
        "Ils décrochent au bout de quelques minutes, en emportant deux blessés, avec la conviction très ferme que cette orge coûte plus cher qu'elle ne vaut.",
        "Les quarante familles rentrent leur moisson. Elles n'en donnent pas une gerbe à Yohan, parce qu'elles n'en ont pas de trop et qu'il n'a rien demandé.",
        "Mais quelqu'un, ce soir-là, écrit son nom sur un montant de porte — et il y sera encore dans vingt ans."
      ],
      effets:{sang:18, xp:66, suspicion:6, reputation:{humains:18}, flags:["cendre_tenue"]},
      fin:true
    },
    barre_perdu:{
      texte:[
        "Douze cavaliers contre un homme à pied sur un chemin plat : l'issue n'a jamais fait de doute, et Yohan le savait en s'y mettant.",
        "Il se réveille au bord du fossé. Le champ brûle. Les familles sont vivantes — la compagnie ne tue pas les gens qui sèment, elle en a besoin l'année prochaine.",
        "Un vieux lui apporte de l'eau sans un mot de reproche. C'est presque pire."
      ],
      effets:{pv:-24, xp:30, reputation:{humains:8}},
      fin:true
    },
    paye:{
      texte:[
        "Le capitaine compte l'or, le recompte, et fait faire demi-tour à sa colonne sans discuter — c'est un professionnel, et quatre cents pièces sans une égratignure, ça ne se refuse pas.",
        "« Vous reviendrez l'année prochaine », dit Yohan.",
        "« Bien sûr. » Il n'y a aucune malice dedans. « Vous aussi, j'espère. »"
      ],
      fin:true
    },
    defense_ok:{
      texte:[
        "Deux heures, quarante familles, et pas une arme sérieuse.",
        "Yohan ne leur fait pas faire la guerre : il leur fait faire ce qu'ils savent faire. Des fossés en travers du chemin. Des faux plantées la pointe en l'air dans les blés couchés. Les charrettes en travers de l'unique gué.",
        "Quand les douze cavaliers arrivent, ils trouvent un terrain où l'on ne charge pas, quarante personnes debout, et le capitaine qui compte le prix d'une jambe de cheval cassée.",
        "Ils repartent sans qu'un coup ait été porté. C'est la meilleure façon de gagner et c'est celle dont on parle le moins."
      ],
      effets:{sang:20, xp:72, reputation:{humains:20}, flags:["cendre_tenue"]},
      fin:true
    },
    defense_ko:{
      texte:[
        "Yohan donne trop d'ordres, trop vite, à des gens qui ne savent pas ce qu'est un ordre.",
        "Les fossés sont au mauvais endroit. Les charrettes bloquent la route de ceux qui fuient au lieu de celle des cavaliers.",
        "La compagnie prend la moitié de la récolte et repart. Ce n'est pas un désastre. C'est simplement moins bien que ce qu'un homme mieux préparé aurait obtenu, et Yohan le sait."
      ],
      effets:{xp:28, reputation:{humains:4}},
      fin:true
    },
    rentre:{
      texte:[
        "Yohan attelle, charge, et fait rouler pendant que quarante personnes fauchent comme des damnés.",
        "Ils sauvent un tiers. Les cavaliers prennent le reste sans même descendre de selle et repartent avant la nuit.",
        "Un tiers d'une première récolte sur les Champs de Cendre, ça veut dire qu'on sème encore l'année prochaine. C'était tout l'enjeu."
      ],
      fin:true
    },
  }
},

];

/* On reverse la deuxième vague dans le catalogue principal : le moteur, le
 * validateur et le manifeste continuent de ne connaître qu'un seul tableau. */
EVENTS_WRITTEN.push(...EVENTS_WRITTEN_2);
