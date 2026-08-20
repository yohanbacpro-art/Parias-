/* PARIAS — Rencontres
 *
 * Les figures du Codex croisent la route de Yohan : par inadvertance, par
 * curiosité, ou l'arme à la main. Même format de scènes que events_written.js,
 * avec deux ajouts :
 *
 *   requis   conditions d'apparition, évaluées au tirage (pas au clic) :
 *            { chapitreMin, chapitreMax, sangMin, niveauMin, suspicionMin,
 *              suspicionMax, flags:[…], sansFlags:[…] }
 *   combat.groupe accepte { champion:"caleb" } en plus de { bst:…, n:… }
 *
 * Une rencontre jouée pose presque toujours un marqueur : ces gens se
 * souviennent de Yohan, et la suite du monde en tient compte.
 */

const EVENTS_RENCONTRE = [

/* ─────────────────── CALEB · Fort-aux-Princes ─────────────────── */
{
  id:"RC_CALEB", titre:"Le prince qui n'aime pas la concurrence", famille:"VILLE", rarete:"rare",
  image:"rc_caleb", lieux:["LOC_002"],
  requis:{ niveauMin:4, sansFlags:["caleb_rencontre"] },
  scenes:{
    start:{
      pnj:"caleb",
      texte:[
        "La salle basse de la garnison s'est vidée sans qu'on donne d'ordre. Quand Yohan comprend pourquoi, il est déjà trop tard pour ressortir : l'homme assis au fond, botté, sans escorte visible, a le même vide autour de lui que Yohan traîne partout.",
        "« Deux d'un coup dans la même ville. » Caleb de Fort-aux-Princes ne se lève pas. « Vous savez ce que ça fait, quand il y en a deux ? Ça fait qu'on cesse de croire que c'est une légende. »",
        "Il pousse une chaise du pied. C'est une invitation, et ce n'en est pas une."
      ],
      choix:[
        {label:"S'asseoir et l'écouter", detail:"Il a quelque chose à dire, et il le dira quoi qu'il arrive",
         suite:"assis"},
        {label:"Refuser et sortir", detail:"Jet de Volonté (14) · lui tourner le dos a un prix",
         test:{stat:"vol", dc:14}, reussite:"sort_ok", echec:"sort_ko"},
        {label:"Poser la main sur son arme", detail:"Deux Parias, une seule salle",
         suite:"duel_intro", effets:{suspicion:6}},
      ]
    },
    assis:{
      pnj:"caleb",
      texte:[
        "Caleb parle de Fort-aux-Princes comme d'un corps qu'il tiendrait debout à bout de bras. Les cols, les vivres, les trois maisons qui n'attendent qu'un faux pas. Il n'a pas le temps d'être un symbole ; il a une place à tenir.",
        "« Vous, vous vous baladez. Vous prenez des contrats, vous laissez des traces, et chaque trace que vous laissez me coûte à moi. Quand ils ont peur des Parias, ce n'est pas vous qu'ils viennent voir : je suis plus facile à trouver. »",
        "Il termine son verre. « Alors je vous propose un marché simple : restez loin de mes murs, et je ne dirai jamais à personne à quoi vous ressemblez. »"
      ],
      choix:[
        {label:"Accepter le marché", detail:"−Suspicion durable · Fort-aux-Princes reste fermé",
         suite:"pacte", effets:{suspicion:-12, xp:22, flag:"caleb_pacte"}},
        {label:"Refuser : personne ne dicte sa route à Yohan", detail:"Jet de Volonté (13)",
         test:{stat:"vol", dc:13}, reussite:"refus_ok", echec:"refus_ko"},
        {label:"Proposer l'inverse : une alliance entre Parias", detail:"Jet de Précision (15) · il déteste l'idée",
         test:{stat:"precision", dc:15}, reussite:"alliance_ok", echec:"alliance_ko"},
      ]
    },
    pacte:{ pnj:"caleb",
      texte:[
        "Ils ne se serrent pas la main — ce serait déjà trop d'engagement. Caleb hoche la tête une fois et se replonge dans ses papiers comme si Yohan avait déjà quitté la pièce.",
        "Fort-aux-Princes lui restera hostile, mais silencieuse. Dans le métier de Yohan, le silence d'une forteresse-frontière vaut plus cher qu'un allié bavard."
      ],
      effets:{flag:"caleb_rencontre"},
      fin:true
    },
    refus_ok:{
      pnj:"caleb",
      texte:[
        "« Non », dit Yohan. Rien d'autre. Il laisse le mot occuper toute la place qu'il mérite.",
        "Caleb le regarde longtemps, et ce qui passe sur son visage n'est pas de la colère : c'est quelque chose de plus embêtant pour lui, une forme de respect qu'il n'avait pas prévu de dépenser aujourd'hui.",
        "« Bon. » Il se rassoit. « Alors ne mourez pas bêtement. Le jour où ils vous prendront, ils sauront qu'on peut en prendre un. »"
      ],
      effets:{xp:28, sang:5, flags:["caleb_rencontre","caleb_respect"]},
      fin:true
    },
    refus_ko:{ pnj:"caleb",
      texte:[
        "Yohan refuse mal — trop vite, avec un mot de trop sur les princes qui se croient propriétaires des routes.",
        "Caleb ne répond rien du tout, ce qui est bien pire. Il reprend ses papiers, et dans la semaine, deux garnisons de la frontière reçoivent une description très précise d'un voyageur aux armes trop lourdes."
      ],
      effets:{suspicion:16, flags:["caleb_rencontre","caleb_hostile"]},
      fin:true
    },
    alliance_ok:{
      pnj:"caleb",
      texte:[
        "Yohan ne plaide pas la fraternité — il sait que Caleb la refuserait par principe. Il plaide l'arithmétique : deux Parias qui s'ignorent sont deux cibles isolées ; deux Parias qui savent où est l'autre sont un problème pour ceux qui les chassent.",
        "Caleb écoute jusqu'au bout, ce qu'il ne fait manifestement pas souvent. « Vous n'êtes pas mon allié », finit-il par dire. « Mais si vous êtes vivant quand ça tournera mal, envoyez un mot. »",
        "Ce n'est pas une alliance. C'est une adresse, et c'est déjà énorme."
      ],
      effets:{xp:34, sang:8, flags:["caleb_rencontre","caleb_adresse"]},
      fin:true
    },
    alliance_ko:{
      pnj:"caleb",
      texte:[
        "« Une alliance. » Caleb répète le mot comme on répète une plaisanterie qu'on n'a pas trouvée drôle. « Vous confondez le sang et la cause. Nous avons le même sang. Nous n'avons pas la même cause. »",
        "Il désigne la porte. « Le marché tient toujours : restez loin de mes murs. Je ne le proposerai pas deux fois. »"
      ],
      effets:{suspicion:4, flag:"caleb_rencontre"},
      fin:true
    },
    sort_ok:{ pnj:"caleb",
      texte:[
        "Yohan sort sans se retourner et sans presser le pas, ce qui demande plus de sang-froid que de rester.",
        "Personne ne le suit. Il apprendra plus tard que Caleb a dit à ses officiers, ce soir-là, qu'il n'avait vu personne d'intéressant — ce qui est, chez lui, une forme de politesse."
      ],
      effets:{xp:14, flag:"caleb_rencontre"},
      fin:true
    },
    sort_ko:{
      pnj:"caleb",
      texte:[
        "Yohan se lève pour sortir, et la porte s'ouvre avant qu'il l'atteigne — pas pour le laisser passer.",
        "« Vous ne comprenez pas », dit Caleb sans hausser la voix. « Ce n'était pas une conversation facultative. »"
      ],
      choix:[
        {label:"Alors ce sera un duel", suite:"duel_intro", effets:{suspicion:6}},
        {label:"Se rasseoir", detail:"Ravaler sa fierté coûte moins cher qu'un duel", suite:"assis"},
      ]
    },
    duel_intro:{
      pnj:"caleb",
      texte:[
        "Caleb se lève enfin, et l'air de la salle se charge d'un coup — deux Ondes dans la même pièce, qui se reconnaissent et se hérissent.",
        "« Pas à mort », dit-il en dégrafant son manteau. « Je veux juste savoir lequel de nous deux compte le plus. »"
      ],
      combat:{ groupe:[{champion:"caleb"}], victoire:"duel_gagne", defaite:"duel_perdu" }
    },
    duel_gagne:{
      pnj:"caleb",
      texte:[
        "Caleb met un genou à terre et lève la main avant que Yohan n'ait à décider quoi que ce soit. Il saigne, il sourit, et il a l'air soulagé — comme si la question qui le tenait éveillé venait enfin d'être tranchée.",
        "« Voilà. » Il crache du sang sur le plancher de sa propre garnison. « C'est vous. »",
        "Il ne le répétera à personne. Mais il le sait, et Yohan sait qu'il le sait, et cela vaut toutes les alliances qu'il aurait pu négocier."
      ],
      effets:{xp:60, sang:12, suspicion:8, flags:["caleb_rencontre","caleb_vaincu"]},
      fin:true
    },
    duel_perdu:{ pnj:"caleb",
      texte:[
        "Caleb s'arrête net quand Yohan tombe, et c'est ce geste-là — s'arrêter — qui dit le plus sur lui.",
        "« Pas à mort », répète-t-il à ses hommes qui accourent. « J'ai dit pas à mort. »",
        "Yohan se réveille à l'aube, hors des murs, ses armes posées à côté de lui et une bourse qu'il n'avait pas. Fort-aux-Princes lui restera fermée."
      ],
      effets:{or:60, xp:16, flags:["caleb_rencontre","caleb_hostile"]},
      fin:true
    }
  }
},

/* ─────────────────── TYRION · Cour d'Eltharion ─────────────────── */
{
  id:"RC_TYRION", titre:"La faute d'un autre peuple", famille:"ELFE", rarete:"rare",
  image:"rc_tyrion", lieux:["LOC_006"],
  requis:{ niveauMin:5, sansFlags:["tyrion_rencontre"] },
  scenes:{
    start:{
      pnj:"tyrion",
      texte:[
        "On ne croise pas le prince Tyrion par hasard dans les jardins d'Eltharion : on y est amené, par des gens qui ne se présentent pas, et on comprend en arrivant qu'on a été attendu.",
        "Il ne regarde pas Yohan. Il regarde un arbre dont les branches reproduisent, très bas, des fragments de conversation vieux de plusieurs siècles.",
        "« Mon peuple était là quand l'Onde a frappé. Nous aurions pu l'empêcher. Nous avons choisi de regarder. » Il se tourne enfin. « Et vous, vous êtes ce que ce regard a produit. »"
      ],
      choix:[
        {label:"Lui demander ce qu'il attend de Yohan", detail:"Il n'a pas fait venir un Paria pour philosopher",
         suite:"attend"},
        {label:"Lui renvoyer la faute", detail:"Jet de Volonté (14) · l'accuser devant sa propre cour",
         test:{stat:"vol", dc:14}, reussite:"faute_ok", echec:"faute_ko"},
        {label:"Demander ce que les Elfes savent de la Cicatrice", detail:"Jet de Précision (13) · ils étaient là",
         test:{stat:"precision", dc:13}, reussite:"savoir_ok", echec:"savoir_ko"},
      ]
    },
    attend:{
      pnj:"tyrion",
      texte:[
        "« Ce que j'attends ? » Tyrion a l'air sincèrement surpris qu'on lui pose la question. « Que vous existiez ailleurs. »",
        "Il explique, avec une courtoisie glaciale, que la présence d'un Paria à la cour donne des arguments à ceux qui veulent rouvrir de vieux dossiers — et que rouvrir de vieux dossiers, à Eltharion, se termine toujours par des noms gravés quelque part.",
        "« Ma sœur pense qu'on vous doit quelque chose. Je pense qu'on vous doit de la distance. Nous avons rarement tort tous les deux en même temps. »"
      ],
      choix:[
        {label:"Partir sans discuter", detail:"Il a été clair, et il n'a pas tort",
         suite:"part_propre", effets:{xp:16, suspicion:-4, flag:"tyrion_rencontre"}},
        {label:"Exiger un duel pour solder la dette de son peuple", detail:"Il ne peut pas refuser devant témoins",
         suite:"duel_intro", effets:{suspicion:8}},
      ]
    },
    part_propre:{
      texte:[
        "Yohan s'incline juste assez pour que ce ne soit pas une insulte, et quitte les jardins par où on l'a fait entrer.",
        "Derrière lui, l'arbre continue à murmurer des conversations que personne ne se rappelle avoir eues."
      ],
      fin:true
    },
    faute_ok:{
      pnj:"tyrion",
      texte:[
        "« Vous avez regardé », répète Yohan, assez fort pour que les deux gardes l'entendent. « Vous n'avez pas subi la Purge, vous ne portez pas ce sang, vous n'avez jamais eu à mentir sur votre propre nom. Vous avez regardé une fois, il y a des siècles, et vous appelez ça une faute pour ne pas avoir à l'appeler un choix. »",
        "Tyrion ne bouge pas. C'est un des gardes qui détourne les yeux le premier, et Tyrion le remarque.",
        "« Sortez », dit-il enfin, très calmement. Puis, alors que Yohan atteint la haie : « Alarielle avait raison. C'est insupportable. »"
      ],
      effets:{xp:34, sang:6, flags:["tyrion_rencontre","tyrion_ebranle"]},
      fin:true
    },
    faute_ko:{
      pnj:"tyrion",
      texte:[
        "Yohan accuse, et il accuse mal : trop de rancune, pas assez de précision. Tyrion écoute la charge entière sans ciller, puis la démonte en trois phrases dont aucune n'est fausse.",
        "« Vous ne voulez pas de justice », conclut-il. « Vous voulez que quelqu'un se sente coupable à votre place. » Il fait signe qu'on raccompagne Yohan. « Ce ne sera pas moi. »"
      ],
      effets:{suspicion:6, flag:"tyrion_rencontre"},
      fin:true
    },
    savoir_ok:{
      pnj:"tyrion",
      texte:[
        "Yohan ne demande pas pardon ni réparation : il demande des faits. Ce que les Elfes ont vu, où ils se tenaient, combien de temps la collision a duré.",
        "C'est la seule chose qui pouvait désarmer Tyrion — une question technique, posée sans émotion. Il répond, brièvement, mais il répond : l'Onde n'a pas frappé au hasard. Elle a suivi quelque chose. Et ce quelque chose bougeait.",
        "« Mon père le sait aussi », ajoute-t-il en tournant les talons. « Il ne vous le dira pas non plus. »"
      ],
      effets:{xp:38, sang:8, flags:["tyrion_rencontre","onde_suivait"]},
      fin:true
    },
    savoir_ko:{ pnj:"tyrion",
      texte:[
        "Yohan pose ses questions et se heurte à une paroi lisse. Tyrion répond à côté avec une élégance qui rend l'insistance impossible.",
        "Il ressort avec la certitude que les Elfes savent quelque chose, et rien de plus — ce qui est peut-être exactement l'effet recherché."
      ],
      effets:{xp:10, flag:"tyrion_rencontre"},
      fin:true
    },
    duel_intro:{
      pnj:"tyrion",
      texte:[
        "« Un duel. » Tyrion défait lentement l'agrafe de sa cape. « Vous croyez qu'une dette de siècle se solde en une heure d'armes. »",
        "Il dégaine quand même. Refuser devant sa propre cour lui coûterait plus que perdre."
      ],
      combat:{ groupe:[{champion:"tyrion"}], victoire:"duel_gagne", defaite:"duel_perdu" }
    },
    duel_gagne:{
      pnj:"tyrion",
      texte:[
        "Tyrion recule d'un pas, puis d'un autre, et abaisse sa lame de lui-même. Il n'est pas blessé au point de tomber ; il a simplement compris avant les autres que la suite ne lui appartient plus.",
        "« Rien n'est soldé », dit-il en essuyant sa garde. « Une dette de siècle ne se solde pas. »",
        "Puis, plus bas, pour Yohan seul : « Mais je ne dirai plus qu'ils ne valent rien. »"
      ],
      effets:{xp:70, sang:14, suspicion:10, flags:["tyrion_rencontre","tyrion_vaincu"]},
      fin:true
    },
    duel_perdu:{ pnj:"tyrion",
      texte:[
        "La lame de Tyrion s'arrête à un doigt de la gorge de Yohan, immobile, le temps que tout le monde ait bien vu où elle se trouvait.",
        "« Voilà », dit-il en la relevant. « Voilà exactement pourquoi je préfère la distance. »",
        "On raccompagne Yohan jusqu'à la lisière. Personne ne lui reprend rien : ce serait admettre qu'il avait quelque chose à prendre."
      ],
      effets:{xp:18, pv:-8, flag:"tyrion_rencontre"},
      fin:true
    }
  }
},

/* ─────────────────── CHARLES · Mont-Draken ─────────────────── */
{
  id:"RC_CHARLES", titre:"Le Sourire de Fer", famille:"VOYAGE", rarete:"rare",
  image:"rc_charles", lieux:["LOC_003"],
  requis:{ niveauMin:4, sansFlags:["charles_rencontre"] },
  scenes:{
    start:{
      pnj:"charles",
      texte:[
        "L'homme assis sur l'éperon rocheux mange du pain et du fromage en regardant la vallée, comme n'importe quel voyageur. Ce qui n'est pas comme n'importe quel voyageur, c'est ce qui dort deux cents pas plus bas, dans une faille d'où monte de la chaleur.",
        "« Ne descendez pas par là », dit Charles de Mont-Draken sans se retourner. « Il a le sommeil correct mais l'humeur mauvaise. »",
        "Il tapote la pierre à côté de lui. « Asseyez-vous. Vous avez la démarche d'un homme qui n'a pas dormi depuis trois nuits. »"
      ],
      choix:[
        {label:"S'asseoir et manger avec lui", detail:"Il n'a manifestement rien contre Yohan",
         suite:"repas"},
        {label:"Rester debout, main libre", detail:"Jet de Précision (12) · jauger avant de faire confiance",
         test:{stat:"precision", dc:12}, reussite:"jauge_ok", echec:"jauge_ko"},
        {label:"Descendre par la faille malgré l'avertissement", detail:"Un dragon des montagnes · très au-dessus du niveau habituel",
         suite:"faille"},
      ]
    },
    repas:{
      pnj:"charles",
      texte:[
        "Charles partage son pain sans poser une seule question sur ce que Yohan est. Il parle de la montagne, des cols qui se ferment, du prix du fer.",
        "Puis, la bouche pleine, en regardant toujours la vallée : « Vous êtes Paria. Ça se voit à la façon dont vous surveillez vos propres mains. »",
        "Il ne dit rien d'autre pendant un long moment. « Ça m'est égal. J'ai tué un dragon, j'en ai chevauché un autre, et je peux vous dire que ce qui menace les gens d'en bas n'a jamais été le sang de quelqu'un. »"
      ],
      choix:[
        {label:"Lui demander ce qui menace les gens d'en bas, alors", detail:"Jet de Précision (11)",
         test:{stat:"precision", dc:11}, reussite:"menace_ok", echec:"menace_ko"},
        {label:"Lui proposer ses services", detail:"Un prince qui ne hait pas les Parias, c'est rare",
         suite:"services"},
      ]
    },
    menace_ok:{
      pnj:"charles",
      texte:[
        "« Les hommes qui recousent de vieilles bannières », répond Charles sans hésiter. « Un dragon mange trente personnes par an et tout le monde en fait une chanson. Une guerre de succession en mange trente mille et on appelle ça de la politique. »",
        "Il essuie son couteau sur sa cuisse. « Il y a une armée qui se forme au sud sous des couleurs interdites. Vous le savez peut-être déjà. Moi je le sais, et je n'ai pas assez d'hommes. »",
        "Il tend la main. « Charles. Si un jour vous êtes du bon côté d'un champ de bataille, tâchez que ce soit du mien. »"
      ],
      effets:{xp:36, sang:6, flags:["charles_rencontre","charles_allie"]},
      fin:true
    },
    menace_ko:{ pnj:"charles",
      texte:[
        "Charles hausse les épaules et parle d'autre chose — la neige, les loups, une histoire de forgeron. Il ne répondra pas à cette question aujourd'hui.",
        "Yohan repart nourri, reposé, et pas plus renseigné. Ce n'est déjà pas rien."
      ],
      effets:{pv:6, fat:-10, xp:12, flag:"charles_rencontre"},
      fin:true
    },
    services:{
      pnj:"charles",
      texte:[
        "« Vos services. » Charles le regarde enfin en face, et son sourire mérite son surnom. « Vous m'offrez une arme dont tout le monde a peur, et vous croyez me faire une faveur. »",
        "Il réfléchit vraiment, ce qui est déjà remarquable. « Voilà ce que je vous offre en retour : pas un emploi. Un droit de passage. Mont-Draken vous laissera entrer, sortir, et dormir. Ce qui, pour vous, doit valoir plus qu'une solde. »"
      ],
      effets:{xp:30, sang:4, or:80, flags:["charles_rencontre","draken_ouverte"]},
      fin:true
    },
    jauge_ok:{
      pnj:"charles",
      texte:[
        "Yohan reste debout et observe : les mains posées à plat, l'arme rangée hors de portée immédiate, le dos exposé. Aucun de ces détails n'est un hasard chez un homme de guerre.",
        "Il est en train de dire, sans un mot, qu'il ne se battra pas aujourd'hui.",
        "Charles remarque que Yohan a remarqué. « Bien », dit-il simplement. « J'aime les gens qui regardent avant de décider. » Il tapote de nouveau la pierre."
      ],
      effets:{xp:20},
      choix:[
        {label:"S'asseoir", suite:"repas"},
      ]
    },
    jauge_ko:{ pnj:"charles",
      texte:[
        "Yohan reste sur ses gardes trop longtemps, et Charles finit par se lever en soupirant.",
        "« Tant pis. » Il remballe son pain. « Vous vous méfiez de la seule personne de cette montagne qui ne vous voulait rien. »",
        "Il descend vers le col sans se retourner."
      ],
      effets:{flag:"charles_rencontre"},
      fin:true
    },
    faille:{ pnj:"charles",
      texte:[
        "Yohan descend malgré l'avertissement. La chaleur monte par vagues, l'air sent le soufre, et à mi-pente il comprend que ce qu'il a pris pour une paroi est en train de respirer.",
        "Derrière lui, très haut, la voix de Charles arrive amortie par la roche : « Je vous avais prévenu ! »"
      ],
      combat:{ groupe:[{bst:"BST_011", n:1}], victoire:"faille_ok", defaite:"faille_ko" }
    },
    faille_ok:{
      pnj:"charles",
      texte:[
        "Charles est toujours sur son éperon quand Yohan remonte, couvert de cendre. Il a fini son pain.",
        "« Alors ça », dit-il, et pour la première fois il a l'air franchement impressionné. « Vous savez combien d'hommes vivants ont fait ça ? Deux. Et le deuxième vient de s'asseoir à côté de moi. »"
      ],
      effets:{xp:50, sang:10, flags:["charles_rencontre","charles_allie"], item:"armure_ecailles"},
      fin:true
    },
    faille_ko:{ pnj:"charles",
      texte:[
        "Yohan remonte la pente à quatre pattes, brûlé, sourd d'une oreille, et s'effondre à trois pas de l'éperon.",
        "Charles le retourne sur le dos avec le pied, constate qu'il respire, et lui met sa gourde dans la main. « Voilà pourquoi je préviens les gens. »"
      ],
      effets:{pv:-10, fat:15, xp:14, flag:"charles_rencontre"},
      fin:true
    }
  }
},

/* ─────────────────── KEM-VAL · Dunes Khesh ─────────────────── */
{
  id:"RC_KEMVAL", titre:"Deux bannis sous le même soleil", famille:"KHESH", rarete:"rare",
  image:"rc_kemval", lieux:["LOC_005"],
  requis:{ niveauMin:4, sansFlags:["kemval_rencontre"] },
  scenes:{
    start:{
      pnj:"kemval",
      texte:[
        "Il fait deux mètres dix et il est assis au bord du seul puits à deux jours de marche, ce qui règle la question de savoir qui boira le premier.",
        "Kem-Val ne porte aucune couleur de tribu. Un Khesh sans couleurs, dans les dunes, c'est un mort en sursis qui a décidé de prendre son temps.",
        "« Tu portes quelque chose », dit-il en indiquant vaguement la poitrine de Yohan. « Pas une arme. Quelque chose de plus lourd. » Il pousse l'outre vers lui. « Bois d'abord. On parle après. »"
      ],
      choix:[
        {label:"Boire et parler", detail:"Chez les Khesh, refuser l'eau est l'insulte",
         suite:"parle"},
        {label:"Lui dire ce qu'il porte", detail:"Un banni à un banni · l'Onde a un poids reconnaissable",
         suite:"aveu", effets:{sang:4}},
        {label:"Refuser l'outre", detail:"Jet de Volonté (13) · il faut une très bonne raison",
         test:{stat:"vol", dc:13}, reussite:"refus_ok", echec:"refus_ko"},
      ]
    },
    parle:{
      pnj:"kemval",
      texte:[
        "Kem-Val raconte sa propre histoire sans qu'on la lui demande, ce qui est sa façon d'exiger la réciproque : fils de Shak-A-Zulu, banni par son propre frère, réduit à garder un puits qui n'appartient à personne.",
        "« Khal-Vaene a pris les Dragons des Sables. Il les a pris comme on prend une dette, pas comme on prend une charge. » Il crache dans le sable. « Un jour les tribus s'uniront. La question est de savoir sous quel nom. »",
        "Il regarde Yohan. « Et toi, tu es banni de quoi ? »"
      ],
      choix:[
        {label:"« D'une maison qui n'existe plus. »", detail:"La vérité, en cinq mots",
         suite:"fraternite", effets:{sang:8, xp:28, flags:["kemval_rencontre","kemval_allie"]}},
        {label:"Mentir", detail:"Jet de Précision (14) · il a l'oreille des menteurs",
         test:{stat:"precision", dc:14}, reussite:"ment_ok", echec:"ment_ko"},
      ]
    },
    fraternite:{
      pnj:"kemval",
      texte:[
        "Kem-Val hoche lentement la tête, comme si la réponse confirmait ce qu'il pensait depuis le début.",
        "« Alors nous avons le même métier. » Il se lève, et l'ombre qu'il fait couvre le puits entier. « Retiens ce puits, Paria. Il est à moi tant que je vis. Tu y boiras toujours. »",
        "C'est, dans les dunes, l'équivalent exact d'un serment."
      ],
      fin:true
    },
    ment_ok:{ pnj:"kemval",
      texte:[
        "Yohan invente une histoire de dette et de maison marchande, plate, ennuyeuse, parfaitement crédible. Kem-Val l'accepte sans insister — un homme qui ment sur son bannissement a ses raisons, et les raisons se respectent.",
        "Ils passent la nuit au puits sans plus rien se dire. Au matin, l'outre est pleine et le géant est parti."
      ],
      effets:{xp:18, pv:5, flag:"kemval_rencontre"},
      fin:true
    },
    ment_ko:{
      pnj:"kemval",
      texte:[
        "Kem-Val écoute l'histoire jusqu'au bout, puis reprend son outre des mains de Yohan.",
        "« J'ai été trahi par mon frère », dit-il en la rebouchant. « Tu crois vraiment que je ne reconnais pas un mensonge ? »",
        "Il ne le frappe pas. Il fait pire : il lui tourne le dos et se rassoit face au désert, comme si Yohan avait cessé d'exister."
      ],
      effets:{suspicion:3, flag:"kemval_rencontre"},
      fin:true
    },
    aveu:{
      pnj:"kemval",
      texte:[
        "Yohan laisse l'Onde affleurer, juste assez pour que le sable autour du puits se mette à trembler en cercles serrés.",
        "Kem-Val ne recule pas. Il regarde le sable, puis Yohan, et quelque chose se détend dans ses épaules énormes.",
        "« Ah. » Il reprend une gorgée. « Alors on est deux à avoir un frère qui voudrait nous voir morts, sauf que le tien s'appelle un Empire. »"
      ],
      effets:{fat:12, xp:30, sang:8, flags:["kemval_rencontre","kemval_allie"]},
      fin:true
    },
    refus_ok:{
      pnj:"kemval",
      texte:[
        "« Bois d'abord toi-même », dit Yohan, sans agressivité, en désignant l'outre.",
        "Il y a un silence très long. Puis Kem-Val éclate d'un rire qui fait s'envoler quelque chose au loin, et boit une longue gorgée devant lui.",
        "« Prudent. Dans ces dunes, prudent, c'est un compliment. » Il lui repasse l'outre. « Assieds-toi, homme prudent. »"
      ],
      effets:{xp:22},
      choix:[ {label:"S'asseoir", suite:"parle"} ]
    },
    refus_ko:{ pnj:"kemval",
      texte:[
        "Yohan refuse l'eau, et il le fait mal — avec le geste de quelqu'un qui craint le poison.",
        "Kem-Val range l'outre en silence. Le puits reste ouvert : il n'est pas mesquin. Mais il ne dira plus un mot, et Yohan repartira sans savoir qui il vient de vexer."
      ],
      effets:{flag:"kemval_rencontre"},
      fin:true
    }
  }
},

/* ─────────────────── KHAL-VAENE · Cimetière des Dragons ─────────────────── */
{
  id:"RC_KHALVAENE", titre:"L'usurpateur au milieu des os", famille:"KHESH", rarete:"épique",
  image:"rc_khalvaene", lieux:["LOC_015"],
  requis:{ niveauMin:7, sansFlags:["khalvaene_rencontre"] },
  scenes:{
    start:{
      pnj:"khalvaene",
      texte:[
        "Le cimetière est un champ de côtes grandes comme des charpentes, plantées dans le sable sur des lieues. Sous la plus grande, une trentaine de guerriers Khesh ont dressé un camp, et au centre du camp, quelqu'un a fait poser un siège.",
        "Khal-Vaene ne se lève pas non plus. Décidément, pense Yohan, c'est une manie chez les gens qui ont pris un pouvoir qu'ils n'ont pas hérité.",
        "« On m'a parlé d'un homme qui a bu au puits de mon frère. » Il fait tourner une bague sur son doigt. « Dis-moi qu'on m'a menti. »"
      ],
      choix:[
        {label:"Nier avoir croisé Kem-Val", detail:"Jet de Précision (14)",
         test:{stat:"precision", dc:14}, reussite:"nie_ok", echec:"nie_ko"},
        {label:"L'assumer, et le regarder en face", detail:"Trente guerriers · assumer se paie",
         suite:"assume"},
        {label:"Lui proposer ses services contre son frère", detail:"Trahir vaut de l'or, ici",
         suite:"trahison"},
      ]
    },
    nie_ok:{ pnj:"khalvaene",
      texte:[
        "Yohan raconte une route différente, un puits différent, un géant qu'il n'a jamais vu. C'est plat, vérifiable, et suffisamment ennuyeux pour être vrai.",
        "Khal-Vaene fait un geste, et on rapporte à Yohan l'arme qu'on lui avait prise à l'entrée du camp. « Alors on m'a menti. Ça arrive souvent. »",
        "Yohan quitte le cimetière sans se retourner, avec la sensation très nette d'avoir passé une heure dans la gueule de quelque chose."
      ],
      effets:{xp:26, suspicion:-3, flag:"khalvaene_rencontre"},
      fin:true
    },
    nie_ko:{
      pnj:"khalvaene",
      texte:[
        "« Le puits du nord », coupe Khal-Vaene. « Tu viens de décrire le puits du nord. Il n'y a que celui de mon frère à trois jours d'ici. »",
        "Il se lève enfin, et trente guerriers se lèvent avec lui.",
        "« Tu as bu son eau. Tu porteras sa dette. »"
      ],
      combat:{ groupe:[{champion:"khal_vaene"},{bst:"BST_027",n:2}], victoire:"combat_gagne", defaite:"combat_perdu" }
    },
    assume:{
      pnj:"khalvaene",
      texte:[
        "« J'ai bu à son puits », dit Yohan. « Il me l'a offert. Je n'allais pas refuser de l'eau dans un désert pour ne pas froisser un homme que je ne connaissais pas. »",
        "Le camp entier retient son souffle. Khal-Vaene, lui, sourit — et c'est bien pire que s'il avait crié.",
        "« Voilà une réponse d'homme libre. » Il fait tourner sa bague. « Les hommes libres m'ont toujours coûté cher. »"
      ],
      choix:[
        {label:"Tenir la position", detail:"Il faudra probablement se battre",
         suite:"assume_tient", effets:{xp:20}},
        {label:"Négocier une sortie", detail:"Jet de Précision (15) · trente guerriers autour",
         test:{stat:"precision", dc:15}, reussite:"sortie_ok", echec:"assume_tient"},
      ]
    },
    assume_tient:{
      pnj:"khalvaene",
      texte:[
        "Khal-Vaene descend de son siège et dégrafe la chaîne qui retient son manteau de guerre.",
        "« Personne ne repart d'ici en ayant dit non devant mes hommes. Tu comprends ça, j'espère. Ce n'est pas contre toi. »"
      ],
      combat:{ groupe:[{champion:"khal_vaene"},{bst:"BST_027",n:2}], victoire:"combat_gagne", defaite:"combat_perdu" }
    },
    sortie_ok:{
      pnj:"khalvaene",
      texte:[
        "Yohan ne plaide pas sa cause : il plaide celle de Khal-Vaene. Tuer un étranger pour une gorgée d'eau, devant trente hommes, ce n'est pas de la force — c'est l'aveu qu'un puits perdu compte encore.",
        "L'usurpateur le fixe longtemps. Puis il rit, fort, et le camp rit avec lui parce qu'il faut rire.",
        "« Va-t'en, homme libre. Et dis à mon frère que je n'ai même pas relevé. » Ce qui, traduit, veut dire : dis-lui que j'y ai pensé."
      ],
      effets:{xp:44, sang:6, flags:["khalvaene_rencontre","khalvaene_epargne"]},
      fin:true
    },
    trahison:{
      pnj:"khalvaene",
      texte:[
        "Yohan propose ses services contre Kem-Val, et le prix est fixé en deux phrases — Khal-Vaene ne marchande pas, il achète.",
        "L'or est réel, lourd, versé sur place. Ce qui l'est aussi, c'est le regard que lui lancent les guerriers du camp : on paie l'outil, on ne l'estime pas.",
        "Yohan repart riche. Il repart aussi avec quelque chose qui ne se dépense pas."
      ],
      effets:{or:400, suspicion:10, sang:-4, xp:16, flags:["khalvaene_rencontre","trahi_kemval"]},
      fin:true
    },
    combat_gagne:{ pnj:"khalvaene",
      texte:[
        "Khal-Vaene tombe au milieu des os de dragons qu'il prétendait posséder, et le camp ne bouge pas. Chez les Khesh, on ne venge pas un chef qui a perdu en duel ouvert : on en cherche un autre.",
        "Ce qui vient de se passer va remonter les dunes plus vite qu'un cavalier. Quelque part, un banni va l'apprendre — et le trône des Dragons des Sables vient de se libérer."
      ],
      effets:{xp:90, sang:16, or:250, suspicion:14, flags:["khalvaene_rencontre","khalvaene_vaincu"]},
      fin:true
    },
    combat_perdu:{
      texte:[
        "On traîne Yohan hors du cercle d'os et on l'abandonne au bord des dunes avec une outre, ce qui est plus de clémence qu'il n'en attendait.",
        "« Pour l'eau de mon frère », lance quelqu'un depuis le camp. « Tu es quitte. »"
      ],
      effets:{pv:-12, suspicion:6, flag:"khalvaene_rencontre"},
      fin:true
    }
  }
},

/* ─────────────────── COUR NOIRE · Anarion ─────────────────── */
{
  id:"RC_ANARION", titre:"Une invitation qu'on ne refuse pas", famille:"POLITIQUE", rarete:"rare",
  image:"rc_anarion", lieux:["LOC_007"],
  requis:{ niveauMin:5, sansFlags:["anarion_rencontre"] },
  scenes:{
    start:{
      pnj:"anarion",
      texte:[
        "Le carton n'a pas de nom, pas de sceau, et il était dans la poche de Yohan sans qu'il sache quand on l'y a mis. C'est déjà toute la Cour Noire résumée en un geste.",
        "La fête est magnifique et parfaitement insupportable. On l'observe sans le regarder ; on parle de lui à voix haute en supposant qu'il ne comprend pas les allusions.",
        "Anarion le Magnifique ne lui adresse pas la parole. Il se contente, à l'autre bout de la salle, de lever son verre dans sa direction — et la moitié de la cour se retourne pour voir qui vient d'être adoubé ou condamné."
      ],
      choix:[
        {label:"Lever son verre en retour", detail:"Jouer leur jeu, à leurs règles",
         suite:"verre"},
        {label:"Traverser la salle et lui parler", detail:"Jet de Volonté (14) · personne ne fait ça",
         test:{stat:"vol", dc:14}, reussite:"traverse_ok", echec:"traverse_ko"},
        {label:"Repartir immédiatement", detail:"−Suspicion · on ne saura pas ce qu'ils voulaient",
         suite:"part", effets:{suspicion:-5}},
      ]
    },
    verre:{
      texte:[
        "Yohan lève son verre, boit, et repose le verre sans le vider — un détail qu'à peu près trente personnes remarquent et interprètent chacune à sa façon.",
        "Pendant l'heure qui suit, on lui parle enfin. Un cadeau lui est offert : une lame de duel dont la garde porte une marque qu'il ne reconnaît pas.",
        "Un cadeau de la Cour Noire n'est jamais gratuit. Mais il est toujours de bonne qualité."
      ],
      effets:{item:"accessoire_gants", xp:22, suspicion:8, flags:["anarion_rencontre","cadeau_anarion"]},
      fin:true
    },
    traverse_ok:{
      pnj:"anarion",
      texte:[
        "Yohan traverse la salle. Les conversations s'éteignent devant lui comme une traînée de bougies qu'on souffle.",
        "Anarion le laisse arriver jusqu'à lui, ce qui est déjà un événement. « Vous savez ce qui me plaît chez vous ? » dit-il sans préambule. « Vous êtes la seule chose ici qui ne cherche pas à me plaire. »",
        "Il lui pose une question, une seule, et c'est la bonne : « Que ferez-vous quand vous aurez repris le nom ? » Yohan n'a pas de réponse. Anarion sourit. « Alors nous nous reverrons. »"
      ],
      effets:{xp:40, sang:6, suspicion:10, flags:["anarion_rencontre","anarion_curieux"]},
      fin:true
    },
    traverse_ko:{
      pnj:"anarion",
      texte:[
        "Yohan traverse la salle et se fait intercepter aux trois quarts par un duelliste dont le sourire annonce la suite avec une politesse exquise.",
        "« On ne va pas au Roi », dit la Lame. « Le Roi vient. » Il recule d'un pas et découvre sa garde. « Ceci dit, la soirée manquait d'un divertissement. »"
      ],
      combat:{ groupe:[{champion:"lame_anarion"}], victoire:"duel_gagne", defaite:"duel_perdu" }
    },
    duel_gagne:{
      pnj:"anarion",
      texte:[
        "La Lame s'écroule sur le marbre au milieu d'un cercle de robes qui reculent sans cesser d'applaudir. À la Cour Noire, on applaudit surtout ce qui coûte cher à quelqu'un d'autre.",
        "Anarion, lui, n'a pas bougé de la soirée. Il lève de nouveau son verre — et cette fois, tout le monde comprend exactement ce que ça veut dire."
      ],
      effets:{xp:56, or:180, suspicion:14, flags:["anarion_rencontre","anarion_curieux"]},
      fin:true
    },
    duel_perdu:{
      texte:[
        "Yohan est reconduit par une porte de service avec une entaille propre à l'avant-bras et son arme rendue, nettoyée.",
        "« Le Roi vous remercie de la soirée », dit le majordome, sincèrement navré. « Il a trouvé cela très plaisant. »"
      ],
      effets:{pv:-9, suspicion:6, flag:"anarion_rencontre"},
      fin:true
    },
    part:{
      texte:[
        "Yohan repose le carton sur un guéridon et sort par où il est entré, avant même d'avoir traversé la première salle.",
        "Il ne saura jamais ce qu'on lui voulait. C'est très probablement la décision la plus saine qu'il ait prise ce mois-ci."
      ],
      effets:{xp:10, flag:"anarion_rencontre"},
      fin:true
    }
  }
},

/* ─────────────────── ARÈNE ROUGE ─────────────────── */
{
  id:"RC_ARENE", titre:"Le Tenant du Sable Rouge", famille:"CONTRAT", rarete:"inhabituel",
  image:"rc_arene", lieux:["LOC_017"],
  requis:{ sansFlags:["arene_tentee"] },
  scenes:{
    start:{ pnj:"tenant_arene",
      texte:[
        "L'Arène Rouge ne tue pas ses combattants — elle les use, ce qui rapporte plus longtemps. Le Tenant y est invaincu depuis deux saisons, et la maison paie très bien quiconque accepte de lui donner un vrai adversaire.",
        "Le régisseur détaille les termes sans lever les yeux de son registre : cent cinquante à l'inscription, quatre cents à la victoire, et pas d'armes de poing.",
        "Il ajoute, toujours sans lever les yeux : « Et pas de… » Il fait un geste vague de la main. « Vous voyez. On le remarquerait. »"
      ],
      choix:[
        {label:"S'inscrire et combattre à la loyale", detail:"+150 or à l'inscription · sans pouvoirs de l'Onde",
         suite:"combat_loyal", effets:{or:150, flag:"arene_tentee"}},
        {label:"S'inscrire et user de l'Onde quand même", detail:"Gagner à coup sûr, devant deux mille témoins",
         suite:"combat_onde", effets:{or:150, flag:"arene_tentee"}},
        {label:"Refuser : trop de monde, trop de regards", detail:"−Suspicion",
         suite:"refus", effets:{suspicion:-4, flag:"arene_tentee"}},
      ]
    },
    combat_loyal:{ pnj:"tenant_arene",
      texte:[
        "Le sable est plus profond qu'il n'y paraît depuis les gradins — c'est le vrai adversaire, celui qui fatigue les jambes en trois minutes.",
        "Le Tenant salue la foule avant de saluer Yohan, dans cet ordre, ce qui dit tout de sa profession."
      ],
      combat:{ groupe:[{champion:"champion_arene"}], victoire:"loyal_gagne", defaite:"loyal_perdu" }
    },
    loyal_gagne:{ pnj:"tenant_arene",
      texte:[
        "Le Tenant tombe dans le sable rouge et lève la main avant qu'on ait à le compter. La foule hurle un nom qu'elle ne connaît pas et qu'elle inventera d'ici demain.",
        "Le régisseur paie sans discuter, avec le respect sincère d'un homme qui vient de gagner beaucoup plus que ce qu'il verse.",
        "Yohan n'a pas touché à l'Onde une seule fois. Deux mille personnes ont vu un homme battre le Tenant à la seule force du poignet — et c'est exactement le genre de renommée qui n'attire pas les chasseurs."
      ],
      effets:{or:400, xp:44, sang:3, suspicion:2, flag:"arene_champion"},
      fin:true
    },
    loyal_perdu:{ pnj:"tenant_arene",
      texte:[
        "Le Tenant reste le Tenant. Il aide Yohan à se relever, lui tape l'épaule, et se tourne vers les gradins qui scandent son nom.",
        "Le régisseur ne rend pas l'inscription, mais il glisse tout de même : « Vous avez tenu six passes. La plupart en tiennent deux. »"
      ],
      effets:{pv:-10, xp:16},
      fin:true
    },
    combat_onde:{ pnj:"tenant_arene",
      texte:[
        "Yohan entre dans l'arène en ayant déjà décidé de tricher, ce qui change la façon dont on marche sur le sable.",
        "Le Tenant le salue. La foule se tait. Et Yohan laisse monter quelque chose qui n'a rien à faire dans un combat d'arène."
      ],
      combat:{ groupe:[{champion:"champion_arene"}], victoire:"onde_gagne", defaite:"onde_perdu" }
    },
    onde_gagne:{ pnj:"tenant_arene",
      texte:[
        "Le Tenant est projeté à six pas sans qu'on l'ait touché. Il n'y a pas d'applaudissements. Il y a deux mille personnes debout, absolument silencieuses.",
        "Le régisseur paie — il faut bien — et pousse la bourse sur la table du bout des doigts, comme si elle brûlait. « Sortez par les écuries. Tout de suite. »",
        "Yohan est riche. Il est aussi, depuis cet après-midi, le sujet de conversation de toute une capitale."
      ],
      effets:{or:400, xp:40, sang:6, suspicion:30, fat:20, flag:"arene_onde"},
      fin:true
    },
    onde_perdu:{ pnj:"tenant_arene",
      texte:[
        "L'Onde monte, rate, et le contrecoup fait plus de dégâts à Yohan qu'au Tenant. Ce qui est déjà humiliant devient dangereux : deux mille personnes ont vu le sable se soulever autour d'un homme qui perdait quand même.",
        "On l'évacue par les écuries sans le payer. Le régisseur ne dit rien du tout, ce qui vaut toutes les menaces."
      ],
      effets:{pv:-14, fat:25, suspicion:24},
      fin:true
    },
    refus:{
      texte:[
        "Yohan regarde les gradins se remplir, calcule combien de paires d'yeux cela représente, et rend le formulaire au régisseur.",
        "Quatre cents pièces, c'est beaucoup. Deux mille témoins, c'est plus cher."
      ],
      fin:true
    }
  }
},

/* ─────────────────── LUCIUS · Champs de Cendre ─────────────────── */
{
  id:"RC_LUCIUS", titre:"Le tacticien", famille:"GUERRE", rarete:"épique",
  image:"rc_lucius", lieux:["LOC_018","LOC_012"],
  requis:{ niveauMin:6, flags:["bannieres_vues"], sansFlags:["lucius_rencontre"] },
  scenes:{
    start:{
      pnj:"lucius",
      texte:[
        "Le camp couvre une colline entière et il est tenu comme une horloge : les feux alignés, les sentinelles relevées à l'heure, pas un homme qui traîne. Yohan a vu des armées ; il n'a jamais vu ça.",
        "On ne l'arrête pas. On l'escorte — ce qui est infiniment plus inquiétant — jusqu'à une tente où un homme sans armure déplace des jetons sur une carte des Champs de Cendre.",
        "« Karlsberg », dit Lucius Furius Augustus sans lever les yeux. « Je me demandais quand la rumeur deviendrait un visage. »"
      ],
      choix:[
        {label:"Demander ce qu'il compte faire des Parias", detail:"Autant l'entendre de sa bouche",
         suite:"question"},
        {label:"Lui proposer ses services", detail:"Jet de Précision (15) · il n'achète pas ce qu'il méprise",
         test:{stat:"precision", dc:15}, reussite:"services_ok", echec:"services_ko"},
        {label:"Partir pendant qu'il est encore possible de partir", detail:"Il laissera faire · c'est bien le problème",
         suite:"part", effets:{xp:14}},
      ]
    },
    question:{
      pnj:"lucius",
      texte:[
        "Lucius pose enfin son jeton et répond avec une franchise qui glace plus que n'importe quelle menace.",
        "« Rien de personnel. Un État a besoin que la force soit prévisible : une armée obéit, un impôt se calcule, un juge se remplace. Vous, on ne peut ni vous mesurer ni vous remplacer. Un État ne peut pas se construire autour de gens comme vous. »",
        "Il reprend son jeton. « Je ne vous hais pas. Je vais simplement devoir vous supprimer. Ce sera vers la fin — vous n'êtes pas prioritaires. »"
      ],
      choix:[
        {label:"Lui dire qu'il aura besoin de gens comme Yohan avant la fin", detail:"Jet de Volonté (15)",
         test:{stat:"vol", dc:15}, reussite:"besoin_ok", echec:"besoin_ko"},
        {label:"Sortir sans rien ajouter", detail:"Il a dit ce qu'il fallait entendre",
         suite:"part_lourd", effets:{xp:30, sang:6, flags:["lucius_rencontre","lucius_menace"]}},
      ]
    },
    besoin_ok:{
      pnj:"lucius",
      texte:[
        "« Vous avez deux cents hommes ici et une carte parfaite », dit Yohan. « Vous n'avez pas un seul homme capable d'arrêter ce qui sortira des Profondeurs quand les Peaux-Vertes remonteront. Ni ce qui dort sous Mont-Draken. Votre État prévisible n'a pas d'outil pour l'imprévisible. »",
        "Lucius s'immobilise. Pour la première fois, il regarde Yohan comme un facteur et non comme une nuisance.",
        "« ...Vers la fin », répète-t-il lentement. « Nous verrons. » Ce n'est pas une grâce. C'est un report, et de la part de cet homme-là, c'est presque une victoire."
      ],
      effets:{xp:52, sang:12, flags:["lucius_rencontre","lucius_report"]},
      fin:true
    },
    besoin_ko:{
      pnj:"lucius",
      texte:[
        "Yohan plaide son utilité, et c'est la pire chose à plaider devant un homme qui a construit toute sa doctrine sur le remplacement des irremplaçables.",
        "« Tout le monde est utile », répond Lucius en reprenant sa carte. « C'est précisément pour cela que personne n'est nécessaire. »",
        "L'audience est terminée. On raccompagne Yohan hors du camp, et un scribe note quelque chose derrière lui."
      ],
      effets:{suspicion:14, flags:["lucius_rencontre","lucius_menace"]},
      fin:true
    },
    services_ok:{
      pnj:"lucius",
      texte:[
        "Yohan ne se vend pas comme une arme — il se vend comme une information. Ce qu'il a vu sur les routes, quelles maisons ne paient plus leurs gardes, où les cols sont réellement tenus.",
        "Lucius écoute, prend deux notes, et fait verser une somme qui n'a rien d'insultant.",
        "« Vous comprenez que cela ne change rien à ce que je vous ai dit. » Il ne l'a pas encore dit. Il le dira à la prochaine visite, et Yohan sait déjà quoi."
      ],
      effets:{or:300, xp:34, flags:["lucius_rencontre","lucius_menace"]},
      fin:true
    },
    services_ko:{ pnj:"lucius",
      texte:[
        "Lucius laisse Yohan terminer son offre, puis retourne à ses jetons sans un mot, comme si la tente s'était vidée.",
        "Un officier touche le coude de Yohan. C'est tout : pas de menace, pas d'escorte armée. On le fait sortir comme on range un objet qui n'avait pas sa place sur la table."
      ],
      effets:{suspicion:8, flags:["lucius_rencontre","lucius_menace"]},
      fin:true
    },
    part_lourd:{
      texte:[
        "Yohan quitte le camp à pied, entre deux rangées de feux alignés au cordeau, et met une heure à cesser de compter les tentes.",
        "Deux cents ici. Il en a annoncé d'autres ailleurs, sans se vanter, comme on énonce un inventaire. Ce n'est pas une révolte : c'est un calendrier."
      ],
      fin:true
    },
    part:{ pnj:"lucius",
      texte:[
        "Yohan tourne les talons au milieu d'une phrase, et personne ne l'arrête — parce que personne, dans ce camp, ne considère qu'il représente un problème immédiat.",
        "C'est peut-être l'information la plus utile de la journée : Lucius Furius Augustus ne le craint pas encore."
      ],
      effets:{flag:"lucius_rencontre"},
      fin:true
    }
  }
},

];
