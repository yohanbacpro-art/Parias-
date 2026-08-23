/* PARIAS — L'arc d'Isolde de Varenne, ou le Second Empire
 *
 * Le troisième pôle politique du jeu, et le seul qui ne se combat pas.
 *
 *   Lucius veut l'Empire par les armes. Le Livré veut la fin du sang Paria.
 *   Isolde, elle, veut l'Empire par les registres — et elle l'aura probablement,
 *   que Yohan y participe ou non.
 *
 * Son arme est exactement celle qui a effacé Karlsberg : le papier. C'est tout
 * le sujet de l'arc. Elle peut rendre à Yohan son nom d'un trait de plume, et
 * accepter, c'est reconnaître que le trait de plume décide de qui existe.
 *
 * Les jalons s'intercalent entre ceux de la trame et de l'arc du Livré : ses
 * seuils de sang tombent dans les creux. Le dénouement attend que Yohan ait
 * choisi sa voie (TR_10), parce que c'est cette voie qu'Isolde vient acheter.
 */

const EVENTS_ISOLDE = [

/* ══════════ 1 · une invitation qui n'engage à rien ══════════ */
{
  id:"IS_01_INVITATION", titre:"L'invitation qui n'engage à rien", famille:"POLITIQUE", rarete:"épique",
  image:"is_invitation",
  requis:{ sangMin:44, sansFlags:["is_01_fait"] },
  scenes:{
    start:{ pnj:"isolde",
      texte:[
        "La lettre arrive par un courrier régulier, en plein jour, sans précaution d'aucune sorte — ce qui est déjà une manière de dire quelque chose.",
        "Elle est parfaitement légale. Elle n'accuse personne, ne propose rien, ne demande rien. Elle constate : une maison de Varenne possède des terres qui touchent l'ancien domaine Karlsberg, une question de bornage est restée en suspens depuis quarante ans, et la duchesse serait heureuse de la régler.",
        "En bas, une signature nette : **Isolde de Varenne**.",
        "Un homme dans la situation de Yohan reçoit rarement du courrier. Il n'en reçoit jamais qui puisse être lu à voix haute devant un juge."
      ],
      choix:[
        {label:"S'y rendre", detail:"Une question de bornage, dit-elle",
         suite:"visite"},
        {label:"Vérifier d'abord ce qu'est la maison de Varenne", detail:"Jet de Précision (14)",
         test:{stat:"precision", dc:14}, reussite:"enquete_ok", echec:"enquete_ko"},
        {label:"Ne pas répondre", detail:"Une lettre à laquelle on ne répond pas ne prouve rien",
         suite:"ignore", effets:{sang:6, xp:24, flags:["is_01_fait","isolde_ignoree"]}},
      ]
    },
    enquete_ok:{
      texte:[
        "Varenne n'est pas une grande maison : c'est une petite maison qui a épousé quatre grandes.",
        "En trois générations, elle est entrée par mariage dans les archives, les péages, les greffes et deux évêchés. Elle ne possède presque rien en propre. Elle possède l'endroit où l'on écrit ce que possèdent les autres.",
        "La duchesse actuelle a trente-quatre ans, n'a pas d'armée, et a fait annuler l'an dernier trois titres nobiliaires anciens pour vice de forme. Les trois maisons concernées soutenaient Astrah.",
        "Yohan repose le rapport et met un long moment à formuler ce qui le dérange : cette femme fait, méthodiquement et légalement, exactement ce que l'Empire a fait à Karlsberg."
      ],
      choix:[
        {label:"S'y rendre quand même", detail:"Surtout maintenant", suite:"visite",
         effets:{flags:["isolde_devinee"]}},
        {label:"Rester loin d'elle", detail:"On ne gagne pas contre quelqu'un qui tient le greffe",
         suite:"ignore", effets:{sang:10, xp:36, flags:["is_01_fait","isolde_ignoree","isolde_devinee"]}},
      ]
    },
    enquete_ko:{
      texte:[
        "Les registres publics disent que la maison de Varenne est ancienne, discrète et sans histoires, ce qui décrit à peu près la moitié de la noblesse d'Astrah.",
        "Yohan n'apprend rien. Il ira donc voir de ses yeux."
      ],
      choix:[
        {label:"S'y rendre", detail:"", suite:"visite"},
      ]
    },
    visite:{
      pnj:"isolde",
      texte:[
        "Elle le reçoit dans une salle de travail, pas dans une salle d'audience : une longue table, des cartons rangés par années, et deux clercs qui ne lèvent pas la tête.",
        "Elle ne se lève pas non plus, mais elle repousse son travail sur le côté, ce qui chez elle est visiblement l'équivalent d'un salut militaire.",
        "« La borne est là. » Elle déplie un plan. « Votre grand-père l'a fait déplacer de dix-sept toises en 3812. Mon grand-père a protesté. Personne n'a tranché parce que votre maison a cessé d'exister avant l'audience. »",
        "Un temps. Elle relève les yeux pour la première fois.",
        "« Je propose que nous tranchions. C'est-à-dire : je propose de reconnaître qu'il y avait quelqu'un en face. »",
        "Yohan met une seconde à comprendre ce qu'elle vient de faire. Elle n'a pas parlé de sa maison, de son sang, de sa tête mise à prix. Elle vient de le traiter, pendant trente secondes, comme un propriétaire terrien ordinaire ayant un différend de bornage.",
        "C'est la première fois depuis dix-neuf ans."
      ],
      choix:[
        {label:"Trancher le bornage, et rien d'autre", detail:"Ne pas lui donner davantage",
         suite:"borne", effets:{sang:14, xp:44, or:200, flags:["is_01_fait","isolde_connue"], reputation:{humains:6}}},
        {label:"Lui demander ce qu'elle veut vraiment", detail:"Jet de Volonté (15)",
         test:{stat:"vol", dc:15}, reussite:"veut_ok", echec:"veut_ko"},
        {label:"Lui demander pourquoi elle prend ce risque", detail:"Recevoir un Paria n'est pas une affaire de bornage",
         suite:"risque"},
      ]
    },
    borne:{
      pnj:"isolde",
      texte:[
        "Ils tranchent. Cela prend une heure et deux clercs, et à la fin il y a un acte signé où le nom de Karlsberg figure comme partie à un différend réglé de bon accord.",
        "« Voilà », dit-elle en soufflant sur l'encre. « Vous existez dans un registre. C'est peu de chose. »",
        "Elle le raccompagne elle-même jusqu'à la cour, ce qui n'était pas obligé, et ne dit plus rien jusqu'au portail.",
        "« Vous vous demandez ce que ça me coûte », dit-elle enfin. « Rien. C'est le problème de ce pays : effacer un homme coûte cher, et le réinscrire ne coûte rien du tout. Personne ne le fait, voilà tout. »"
      ],
      fin:true
    },
    veut_ok:{
      pnj:"isolde",
      texte:[
        "« Vous n'avez pas fait venir un Paria pour dix-sept toises. »",
        "Elle repose sa plume. Le premier clerc lève la tête ; elle ne le regarde pas et il la rebaisse.",
        "« Non. » Elle croise les mains. « J'ai fait venir un homme qui sait ce que vaut un registre. C'est rare. La plupart des gens croient que le pouvoir est dans les armées — c'est faux, il est dans le fait que quelqu'un, quelque part, ait écrit que l'armée appartient à untel. »",
        "« Vous avez été effacé de cette façon. Vous êtes donc le seul homme de ce royaume qui n'aura pas besoin qu'on lui explique. »",
        "Yohan demande ce qu'elle prépare. Elle répond sans détour, ce qui est plus déstabilisant qu'un mensonge :",
        "« Astrah tombera dans une génération, par sa propre comptabilité. Je m'assure que ce qui la remplacera me doive quelque chose. »"
      ],
      effets:{sang:20, xp:64, flags:["is_01_fait","isolde_connue","isolde_franche"], reputation:{humains:4}},
      fin:true
    },
    veut_ko:{
      pnj:"isolde",
      texte:[
        "« Ce que je veux ? » Elle sourit poliment, sans chaleur particulière. « Que la borne soit à sa place. »",
        "Et elle y revient, et l'affaire est réglée, et Yohan ressort une heure plus tard avec un acte parfaitement régulier et le sentiment désagréable d'avoir été mesuré du regard pendant tout ce temps."
      ],
      effets:{sang:10, xp:34, or:200, flags:["is_01_fait","isolde_connue"]},
      fin:true
    },
    risque:{
      pnj:"isolde",
      texte:[
        "« Recevoir un Paria dans une maison noble, ce n'est pas une affaire de bornage. »",
        "« Non », convient-elle. « C'est une affaire d'édit. L'édit de proscription vise ceux qui usent de l'Onde en public et ceux qui les hébergent sciemment. » Elle désigne la salle, les cartons, les clercs. « Vous êtes venu régler un différend foncier documenté. Il y a deux témoins assermentés et un acte. Si l'on m'interroge, je produirai l'acte. »",
        "« Et s'ils insistent ? »",
        "« Ils n'insisteront pas. Le préfet qui pourrait insister doit sa charge à mon beau-frère. » Elle reprend sa plume. « Voilà comment on protège quelqu'un, monsieur de Karlsberg. Pas avec des murs. »"
      ],
      effets:{sang:16, xp:52, or:200, flags:["is_01_fait","isolde_connue","isolde_franche"], reputation:{humains:8}},
      fin:true
    },
    ignore:{
      texte:[
        "Yohan brûle la lettre et ne répond pas.",
        "Trois mois plus tard, un acte de bornage est enregistré au greffe de la province, réglant le différend de 3812 en faveur de la partie Karlsberg, en son absence et sans qu'elle ait rien demandé.",
        "Elle l'a fait quand même. C'est ça, le message."
      ],
      fin:true
    },
  }
},

/* ══════════ 2 · le dossier ══════════ */
{
  id:"IS_02_DOSSIER", titre:"Ce qu'un carton peut faire", famille:"POLITIQUE", rarete:"épique",
  image:"is_dossier",
  requis:{ sangMin:80, flags:["isolde_connue"], sansFlags:["is_02_fait"] },
  scenes:{
    start:{
      pnj:"isolde",
      texte:[
        "Cette fois il n'y a pas de prétexte. Un carton posé sur la table, et elle qui attend qu'il l'ouvre.",
        "Dedans : les états de solde de la garnison d'Astrah sur onze ans. Rien de secret. Rien de volé. Onze années de pièces comptables que n'importe qui peut demander au greffe, et que personne n'a jamais lues bout à bout parce que cela représente quatre mille feuillets.",
        "Elle les a lus bout à bout.",
        "« L'Empire paie neuf mille hommes. » Elle pose un doigt sur une colonne. « Il en nourrit six mille. Ce n'est pas un détournement : c'est une habitude. Trois mille soldats fantômes, depuis onze ans, dans des unités qui existent sur le papier parce que personne n'a jamais eu intérêt à les rayer. »",
        "« Le jour où quelqu'un les raye, l'Empire découvre qu'il a un tiers d'armée en moins que ce qu'il croit. »"
      ],
      choix:[
        {label:"Demander ce qu'elle attend de lui", detail:"Elle ne montre rien sans raison",
         suite:"service"},
        {label:"Lui faire remarquer que c'est une arme, pas un dossier", detail:"Jet de Volonté (15)",
         test:{stat:"vol", dc:15}, reussite:"arme_ok", echec:"arme_ko"},
        {label:"Refuser d'en savoir davantage", detail:"Ce qu'on ignore ne peut pas être exigé de vous",
         suite:"refuse_savoir", effets:{sang:10, xp:40, flags:["is_02_fait","isolde_distance"]}},
      ]
    },
    arme_ok:{
      pnj:"isolde",
      texte:[
        "« Ce n'est pas un dossier. C'est une arme, et vous me la montrez pour que je sache que vous en avez. »",
        "Elle a un vrai sourire, cette fois — bref, surpris, presque amusé.",
        "« Oui. » Elle referme le carton. « La plupart des gens à qui je montre ça se mettent à parler de justice. Vous, vous avez compté les hommes. »",
        "« Vous comptez vous en servir ? » — « Un jour. Pas maintenant. Une arme qu'on emploie cesse d'être une menace. »",
        "Elle repousse le carton vers lui de deux doigts. « Vous, en revanche, vous pourriez avoir besoin d'une menace bien plus tôt que moi. »"
      ],
      choix:[
        {label:"Le prendre", detail:"Une arme qui ne se dégaine pas",
         suite:"prend", effets:{sang:22, xp:70, flags:["is_02_fait","isolde_dossier","dossier_soldes"]}},
        {label:"Le laisser sur la table", detail:"Ce qu'on accepte d'elle, on le lui doit",
         suite:"laisse", effets:{sang:16, xp:56, flags:["is_02_fait","isolde_distance"]}},
      ]
    },
    arme_ko:{
      pnj:"isolde",
      texte:[
        "Yohan parle de justice, de ce que valent trois mille hommes qui n'existent pas, de ce que ça dit d'un empire.",
        "Elle écoute avec une patience polie qui, au bout d'une minute, devient franchement humiliante.",
        "« Monsieur de Karlsberg. Je ne vous ai pas fait venir pour être indignée avec vous. »"
      ],
      choix:[
        {label:"Demander ce qu'elle attend", detail:"", suite:"service"},
      ]
    },
    service:{
      pnj:"isolde",
      texte:[
        "« Ce que j'attends de vous est ridiculement petit », dit-elle. « C'est ce qui devrait vous inquiéter. »",
        "Un greffier de province, à quatre jours de route, refuse depuis huit mois d'enregistrer un acte. Pas par corruption : par scrupule. L'acte est régulier, il le sait, et il le trouve *injuste* — il transfère à la maison de Varenne un droit de péage qui faisait vivre trois hameaux.",
        "« Il ne cédera pas à l'argent. Il a déjà refusé deux fois. » Elle range ses papiers. « Allez le voir. Vous êtes exactement ce qu'il croit combattre : un homme sans droits. Expliquez-lui ce que ça fait. »",
        "Yohan comprend très bien ce qu'on lui demande. On lui demande de servir d'argument vivant à quelqu'un qui va prendre le péage de trois hameaux."
      ],
      choix:[
        {label:"Y aller et convaincre le greffier", detail:"Jet de Volonté (16) · un homme honnête, et c'est le problème",
         test:{stat:"vol", dc:16}, reussite:"greffier_ok", echec:"greffier_ko"},
        {label:"Y aller, et le prévenir au lieu de le convaincre", detail:"Jet de Précision (15) · retourner la commission",
         test:{stat:"precision", dc:15}, reussite:"previent_ok", echec:"previent_ko"},
        {label:"Refuser la commission en face", detail:"Lui dire non pendant qu'elle regarde",
         suite:"refuse_face", effets:{sang:18, xp:60, flags:["is_02_fait","isolde_refus_net"]}},
      ]
    },
    prend:{
      pnj:"isolde",
      texte:[
        "Yohan emporte le carton. Il pèse quatre livres et il vaut une province.",
        "« Vous ne me demandez pas ce que je veux en échange », remarque-t-elle au moment où il sort.",
        "« Non. » — « Bien. » Elle se remet au travail. « Cela viendra tout seul, et vous le saurez quand ce sera là. C'est plus honnête que de le fixer d'avance. »"
      ],
      choix:[
        {label:"Écouter tout de même sa commission", detail:"", suite:"service"},
      ]
    },
    laisse:{
      pnj:"isolde",
      texte:[
        "Yohan repousse le carton au milieu de la table.",
        "Elle le regarde faire sans commentaire, puis hoche la tête une fois — pas de la déception : de la prise de note.",
        "« Vous avez raison, d'ailleurs. » Elle le range. « Ce que je donne, je le reprends toujours d'une manière ou d'une autre. Peu de gens le voient avant. »"
      ],
      choix:[
        {label:"Écouter tout de même sa commission", detail:"", suite:"service"},
      ]
    },
    greffier_ok:{
      texte:[
        "Le greffier a soixante ans, une bonne écriture et aucune illusion. Il écoute Yohan pendant une heure sans l'interrompre.",
        "Yohan ne ment pas. Il raconte ce que c'est que de n'exister dans aucun registre : les routes qu'on ne prend pas, le médecin qu'on n'appelle pas, la terre qu'on ne peut pas transmettre. Il raconte bien, parce que c'est vrai.",
        "Le vieil homme finit par tremper sa plume. « Vous savez que je vais enregistrer un acte qui ruine trois hameaux. »",
        "« Oui. » — « Et vous le dites quand même. » — « Oui. »",
        "« Au moins vous ne me prenez pas pour un imbécile. » Il signe. « Dites-lui que c'est la dernière fois. »",
        "Yohan repart avec ce qu'on lui demandait, et avec la sensation très nette d'avoir été employé exactement comme on emploie un outil bien choisi."
      ],
      effets:{sang:24, xp:76, or:400, flags:["is_02_fait","isolde_dossier","isolde_service_rendu"], reputation:{humains:-6}},
      fin:true
    },
    greffier_ko:{
      texte:[
        "Le greffier écoute Yohan et voit à travers lui en dix minutes.",
        "« Vous êtes venu me raconter votre malheur pour que je fasse le malheur de trois villages. » Il repose sa plume. « Sortez de mon bureau. »",
        "Il n'enregistrera jamais l'acte. Six mois plus tard, il sera muté ; l'acte sera enregistré par son successeur. Cela n'aura servi à rien du tout, sauf à ce que Yohan sache ce qu'il a essayé de faire."
      ],
      effets:{sang:10, xp:40, flags:["is_02_fait","isolde_dossier"]},
      fin:true
    },
    previent_ok:{ pnj:"isolde",
      texte:[
        "Yohan fait le voyage, s'assied devant le greffier, et lui explique exactement ce qu'on l'a envoyé faire.",
        "Puis il lui explique comment tenir : l'acte est régulier, mais il porte une mention de délégation qui expire au changement de préfet. S'il tient huit mois de plus, il faudra tout refaire.",
        "« Pourquoi me dites-vous ça ? » — « Parce qu'on m'a envoyé vous faire changer d'avis, et que je n'aime pas qu'on se serve de ce que je suis. »",
        "Le péage restera aux trois hameaux quatre ans de plus.",
        "Isolde apprendra ce qui s'est passé — elle apprend tout — et ne dira rien du tout à ce sujet, jamais, ce qui est sa manière de facturer."
      ],
      effets:{sang:26, xp:82, flags:["is_02_fait","isolde_dossier","isolde_trahie_petit"], reputation:{humains:12}},
      fin:true
    },
    previent_ko:{ pnj:"isolde",
      texte:[
        "Yohan tente de prévenir le greffier et s'y prend mal : le vieil homme, terrifié à l'idée d'être mêlé à une intrigue de duchesse, enregistre l'acte le soir même pour s'en débarrasser.",
        "Le péage change de mains. Yohan a obtenu ce qu'Isolde voulait, en essayant de faire le contraire.",
        "C'est la pire des deux issues et il n'y a personne à qui s'en plaindre."
      ],
      effets:{sang:12, xp:44, flags:["is_02_fait","isolde_dossier","isolde_service_rendu"], reputation:{humains:-4}},
      fin:true
    },
    refuse_face:{
      pnj:"isolde",
      texte:[
        "« Non. »",
        "Elle attend la suite. Il n'y en a pas.",
        "« Vous ne me demandez pas plus d'argent. » — « Non. » — « Vous ne me faites pas de morale non plus. » — « Vous n'écouteriez pas. »",
        "Elle repose sa plume et le regarde vraiment, pour la deuxième fois en deux entrevues.",
        "« Vous êtes la première personne depuis longtemps qui me refuse quelque chose sans essayer de me faire sentir coupable. » Elle reprend son travail. « Je vous en saurai gré. Cela ne veut pas dire que je vous demanderai moins la prochaine fois. »"
      ],
      fin:true
    },
    refuse_savoir:{
      pnj:"isolde",
      texte:[
        "Yohan referme le carton sans le lire jusqu'au bout et le repousse.",
        "« Prudent », dit-elle, sans ironie perceptible. « Ce qu'on ignore ne peut pas être exigé de vous. »",
        "Elle le range. « Vous êtes le premier à comprendre ça avant d'avoir été échaudé. Cela nous fera gagner du temps à tous les deux. »"
      ],
      fin:true
    },
  }
},

/* ══════════ 3 · le mariage qui manque ══════════ */
{
  id:"IS_03_MARIAGE", titre:"Le mariage qui manque", famille:"POLITIQUE", rarete:"épique",
  image:"is_mariage",
  requis:{ sangMin:116, flags:["isolde_connue"], sansFlags:["is_03_fait"] },
  scenes:{
    start:{
      pnj:"isolde",
      texte:[
        "Elle a déplié une carte, mais ce n'est pas une carte de terrain : c'est un arbre. Onze maisons, reliées par des traits de trois couleurs — mariages faits, mariages promis, mariages nécessaires.",
        "Dix traits sont noirs. Un est rouge.",
        "« La maison de Corven. » Elle tapote le trait rouge. « Le vieux comte refuse de marier sa fille. Sans Corven, l'ensemble ne tient pas : ce sont eux qui bordent la route du sel. »",
        "« Et sa fille ? » demande Yohan.",
        "Un silence très court. « Sa fille a dit oui il y a deux ans. C'est le père qui a changé d'avis. »"
      ],
      choix:[
        {label:"Aller voir le comte", detail:"Entendre ses raisons avant de juger",
         suite:"comte"},
        {label:"Aller voir la fille d'abord", detail:"Elle a dit oui · personne ne le lui redemande",
         suite:"fille"},
        {label:"Demander à Isolde ce qu'elle ferait si elle échouait", detail:"Jet de Volonté (16)",
         test:{stat:"vol", dc:16}, reussite:"echec_ok", echec:"echec_ko"},
        {label:"Refuser de se mêler d'un mariage", detail:"Il y a des choses qu'un homme ne fait pas",
         suite:"refuse", effets:{sang:14, xp:52, flags:["is_03_fait","isolde_refus_net"]}},
      ]
    },
    echec_ok:{
      pnj:"isolde",
      texte:[
        "« Et si Corven ne cède pas ? »",
        "Elle ne répond pas tout de suite. Elle range le trait rouge sous son doigt, comme on couvre une carte à jouer.",
        "« Alors je ferai casser leur titre. » Elle dit cela du même ton que le bornage. « Il y a un vice de forme dans leur inféodation de 3784. Je l'ai trouvé il y a quatre ans. C'est solide. »",
        "« Ils perdraient tout. » — « Oui. » — « Et vous préférez le mariage. » — « Évidemment. Un mariage me donne Corven avec ses hommes, ses greniers et sa loyauté. Un procès me donne des ruines et un ennemi de plus. »",
        "Elle relève les yeux. « Ce que vous prenez pour de la cruauté est de l'économie. Je fais toujours la version la moins chère, et la version la moins chère est presque toujours la plus douce. Presque. »"
      ],
      effets:{sang:20, xp:66, flags:["isolde_franche","isolde_menace_corven"]},
      choix:[
        {label:"Aller voir le comte", detail:"", suite:"comte"},
        {label:"Aller voir la fille", detail:"", suite:"fille"},
      ]
    },
    echec_ko:{
      pnj:"isolde",
      texte:[
        "« Je ne prévois pas d'échouer », dit-elle, et elle replie la carte.",
        "C'est tout ce qu'elle dira."
      ],
      choix:[
        {label:"Aller voir le comte", detail:"", suite:"comte"},
        {label:"Aller voir la fille", detail:"", suite:"fille"},
      ]
    },
    comte:{
      texte:[
        "Le comte de Corven a soixante-douze ans et reçoit Yohan dans une salle où il fait froid parce qu'on économise le bois.",
        "Il ne tourne pas autour du pot. « Je sais qui vous envoie. Je sais ce qu'elle a sur nous. Je sais que je vais perdre. »",
        "« Alors pourquoi refuser ? »",
        "« Parce que le garçon qu'on lui destine a trente et un ans et qu'il a déjà enterré deux femmes. » Le vieil homme regarde le feu maigre. « On m'a expliqué que c'étaient des fièvres. On me l'a expliqué deux fois. »",
        "Il n'a pas de preuve. Il n'aura jamais de preuve. Il a un pressentiment de vieil homme et une fille de vingt-quatre ans qui, elle, a dit oui."
      ],
      choix:[
        {label:"Enquêter sur les deux épouses mortes", detail:"Jet de Précision (16) · deux fièvres, deux fois",
         test:{stat:"precision", dc:16}, reussite:"fievres_ok", echec:"fievres_ko"},
        {label:"Convaincre le comte de céder", detail:"Jet de Volonté (16) · il perdra tout sinon",
         test:{stat:"vol", dc:16}, reussite:"cede_ok", echec:"cede_ko"},
        {label:"Aller parler à la fille", detail:"C'est elle qui épouse", suite:"fille"},
      ]
    },
    fille:{
      texte:[
        "Elle s'appelle Ysoré, elle a vingt-quatre ans, et elle reçoit Yohan dans les écuries parce que c'est le seul endroit où son père ne vient pas.",
        "« Il croit me protéger. » Elle brosse un cheval sans s'arrêter. « Il ne comprend pas que je sais compter. Si nous ne faisons pas ce mariage, la duchesse casse notre titre, et je passe le reste de ma vie à être la fille de quelqu'un qui n'est plus rien. »",
        "« Votre père parle de deux épouses mortes. »",
        "Sa main s'arrête une seconde, puis reprend. « Je sais. » Un temps. « Vous croyez que je n'y ai pas pensé ? »",
        "Elle se retourne enfin. « J'ai vingt-quatre ans et deux choix, et les deux sont mauvais. Ce que je demande, ce n'est pas qu'on me sauve. C'est qu'on arrête de décider à ma place lequel des deux je prends. »"
      ],
      choix:[
        {label:"Enquêter sur les deux épouses mortes", detail:"Jet de Précision (16) · lui donner de quoi choisir",
         test:{stat:"precision", dc:16}, reussite:"fievres_ok", echec:"fievres_ko"},
        {label:"Obtenir d'Isolde un autre prétendant", detail:"Jet de Volonté (17) · lui faire refaire son arbre",
         test:{stat:"vol", dc:17}, reussite:"autre_ok", echec:"autre_ko"},
        {label:"Rapporter à Isolde qu'Ysoré est d'accord", detail:"C'est ce qu'on vous demandait",
         suite:"rapporte", effets:{sang:14, xp:56, or:500, flags:["is_03_fait","isolde_service_rendu","corven_marie"]}},
      ]
    },
    fievres_ok:{
      texte:[
        "Deux fièvres, deux fois, dans deux provinces différentes, avec deux médecins qui ont depuis quitté le service de la maison.",
        "Yohan retrouve le second. Il ne se fait pas prier longtemps : il n'a jamais pu dormir correctement depuis.",
        "Ce n'était pas le mari. C'était la mère du mari, qui n'a jamais accepté aucune des deux, et qui tient la cuisine depuis quarante ans.",
        "Ce n'est pas un secret d'État. C'est une vieille femme et une théière. Mais c'est écrit, signé, et daté."
      ],
      choix:[
        {label:"Porter la preuve à Isolde", detail:"Elle refera son arbre plutôt que de perdre Corven",
         suite:"preuve_isolde", effets:{sang:26, xp:88, flags:["is_03_fait","isolde_dette","corven_sauve"], reputation:{humains:10}}},
        {label:"Donner la preuve à Ysoré, et rien à personne d'autre", detail:"C'est elle qui décide",
         suite:"preuve_ysore", effets:{sang:28, xp:92, flags:["is_03_fait","corven_sauve","ysore_libre"], reputation:{humains:8}}},
        {label:"La garder pour la vendre plus tard", detail:"+700 or · une vieille femme et une théière, ça vaut cher",
         suite:"preuve_vendue", effets:{or:700, sang:10, xp:50, suspicion:6, flags:["is_03_fait","corven_marie"]}},
      ]
    },
    fievres_ko:{
      texte:[
        "Deux médecins, deux provinces, et deux pistes qui s'arrêtent sur des gens introuvables.",
        "Yohan revient avec un dossier vide et l'exacte quantité de soupçons qu'il avait en partant.",
        "Ce qui est le pire résultat possible : assez pour ne pas dormir, pas assez pour agir."
      ],
      choix:[
        {label:"Convaincre le comte de céder quand même", detail:"Jet de Volonté (15)",
         test:{stat:"vol", dc:15}, reussite:"cede_ok", echec:"cede_ko"},
        {label:"Rapporter à Isolde qu'Ysoré est d'accord", detail:"", suite:"rapporte",
         effets:{sang:12, xp:50, or:500, flags:["is_03_fait","isolde_service_rendu","corven_marie"]}},
      ]
    },
    preuve_isolde:{
      pnj:"isolde",
      texte:[
        "Elle lit la déposition deux fois, très vite, puis la repose.",
        "« Une belle-mère. » Elle a l'air, pour la première fois, franchement contrariée. « Quatre ans d'arbre généalogique défaits par une belle-mère. »",
        "Elle tire une feuille et se met à réécrire. « Le cadet, alors. Il a dix-neuf ans et il est sot, mais sa mère est morte, ce qui est manifestement le critère décisif dans cette famille. »",
        "Au moment où Yohan sort : « Karlsberg. » Il se retourne. « Vous auriez pu me la vendre. Ou la garder pour me tenir. »",
        "« Je sais. »",
        "« Alors je vous dois quelque chose », dit-elle, et elle a l'air d'en être sincèrement agacée."
      ],
      fin:true
    },
    preuve_ysore:{
      texte:[
        "Yohan pose la déposition sur la paille, entre eux, et ne dit rien du tout.",
        "Ysoré la lit debout, la relit, et reste un long moment sans bouger.",
        "« Vous ne l'avez pas portée à la duchesse. » — « Non. » — « Pourquoi ? »",
        "« Parce que vous m'avez dit ce que vous vouliez : décider vous-même. »",
        "Elle plie le papier et le range dans son corsage. Ce qu'elle en fera, Yohan ne le saura que bien plus tard : elle épousera le cadet, à ses conditions, avec la déposition en dépôt chez un notaire et une clause qui la fait publier si elle meurt de fièvre.",
        "Elle vivra jusqu'à soixante-onze ans et gouvernera Corven pendant quarante d'entre elles."
      ],
      fin:true
    },
    preuve_vendue:{
      texte:[
        "Yohan garde la déposition. Le mariage se fait comme prévu.",
        "Il revendra la pièce quatre ans plus tard, très cher, à quelqu'un qui en fera un usage qu'il ne cherchera pas à connaître.",
        "Ysoré de Corven meurt d'une fièvre à vingt-huit ans. Yohan l'apprend par une gazette, deux mois après, entre deux annonces de foire."
      ],
      fin:true
    },
    autre_ok:{
      pnj:"isolde",
      texte:[
        "« Trouvez-lui quelqu'un d'autre. »",
        "Isolde lève un sourcil. « J'ai passé quatre ans sur cet arbre. »",
        "« Vous en passerez quatre de plus. Elle a dit oui à un mariage, pas à un tombeau. »",
        "Long silence. Elle a devant elle un homme sans titre, sans terres et sans droits, qui lui demande de refaire quatre ans de travail pour une fille qu'il a rencontrée une fois.",
        "« Le cadet », dit-elle enfin, en tirant une feuille. « Il est sot. Ce sera moins bon pour la route du sel. »",
        "Elle écrit. Puis, sans lever la tête : « Ne prenez pas l'habitude. »"
      ],
      effets:{sang:24, xp:84, flags:["is_03_fait","corven_sauve","isolde_dette"], reputation:{humains:6}},
      fin:true
    },
    autre_ko:{
      pnj:"isolde",
      texte:[
        "« Non. » Elle ne lève même pas les yeux. « Vous me demandez de défaire quatre ans de travail sur une intuition de vieillard. »",
        "« Ce n'est pas une intuition. » — « Alors apportez-moi autre chose qu'une conviction. »",
        "Elle a raison, et c'est ce qui rend la sortie si désagréable."
      ],
      choix:[
        {label:"Enquêter sur les deux épouses", detail:"Jet de Précision (15)",
         test:{stat:"precision", dc:15}, reussite:"fievres_ok", echec:"fievres_ko"},
        {label:"Rapporter qu'Ysoré est d'accord", detail:"", suite:"rapporte",
         effets:{sang:12, xp:50, or:500, flags:["is_03_fait","isolde_service_rendu","corven_marie"]}},
      ]
    },
    cede_ok:{
      texte:[
        "Yohan explique au vieux comte, chiffres en main, ce que coûte un procès en cassation de titre, et ce qu'il reste à une maison qui le perd.",
        "Le comte cède. Il signe en pleurant, sans bruit, ce qui est bien pire que s'il criait.",
        "« Vous reviendrez me voir dans cinq ans », dit-il en rendant la plume. « Vous me direz si j'avais tort. »",
        "Yohan reviendra. Il n'aimera pas ce qu'il trouvera."
      ],
      effets:{sang:16, xp:60, or:500, flags:["is_03_fait","isolde_service_rendu","corven_marie"], reputation:{humains:-4}},
      fin:true
    },
    cede_ko:{ pnj:"isolde",
      texte:[
        "Le comte écoute tous les arguments et ne bouge pas d'un pouce.",
        "« J'ai soixante-douze ans. On ne me fait plus peur avec la ruine. » Il raccompagne Yohan lui-même. « Dites-lui de casser le titre. Au moins ce sera elle qui l'aura fait. »",
        "Isolde cassera le titre. Corven sera vendu par lots. Ysoré épousera un marchand de laine trois ans plus tard et sera, d'après tout ce qu'on en saura, raisonnablement heureuse."
      ],
      effets:{sang:14, xp:54, flags:["is_03_fait","corven_brise"], reputation:{humains:-8}},
      fin:true
    },
    rapporte:{
      pnj:"isolde",
      texte:[
        "« Elle est d'accord. C'est le père qui bloque. »",
        "« Je sais. » Isolde écrit une ligne. « Merci de l'avoir vérifié : je ne signe jamais un mariage dont la promise ne veut pas. »",
        "Yohan met un moment à décider si c'est un scrupule ou de la prudence. Il finit par penser que chez elle, la distinction n'existe pas.",
        "Le comte cédera dans le mois. Personne ne saura jamais ce qui l'a fait céder."
      ],
      fin:true
    },
    refuse:{
      pnj:"isolde",
      texte:[
        "« Je ne me mêle pas d'un mariage. »",
        "Elle replie la carte sans discuter. « Très bien. »",
        "C'est tout. Pas de reproche, pas de marchandage. Trois mois plus tard, le titre de Corven est cassé pour vice de forme dans l'inféodation de 3784, et les terres sont vendues par lots.",
        "Elle n'y fera jamais allusion devant lui. Elle n'en aura pas besoin."
      ],
      effets:{flags:["corven_brise"]},
      fin:true
    },
  }
},

/* ══════════ 4 · ce qu'elle offre à Karlsberg ══════════ */
{
  id:"IS_04_OFFRE", titre:"Un nom rendu d'un trait de plume", famille:"POLITIQUE", rarete:"épique",
  image:"is_offre",
  requis:{ sangMin:152, flags:["isolde_connue"], sansFlags:["is_04_fait"] },
  scenes:{
    start:{
      pnj:"isolde",
      texte:[
        "Elle a fait dresser une table dans la salle des cartons, avec deux couverts, ce qui est de sa part un déploiement considérable.",
        "L'acte est déjà rédigé. Il tient en une page et demie.",
        "« Restauration de la maison Karlsberg dans ses titres, terres et droits antérieurs à la Purge. » Elle le tourne vers lui. « Avec effet rétroactif. Cela signifie que vous n'avez jamais cessé d'exister. Cela signifie que les quarante dernières années deviennent, juridiquement, une erreur administrative. »",
        "Yohan lit. C'est régulier. C'est solide. Il y a quatre contreseings, dont deux qu'il ne pensait pas possibles.",
        "« Ce qu'il manque », dit-elle, « c'est votre signature en bas de la seconde page. Et celle-là engage autre chose. »",
        "La seconde page est un acte d'hommage. Karlsberg, restaurée, reconnaîtrait tenir ses terres de la couronne à venir — la sienne."
      ],
      choix:[
        {label:"Signer les deux pages", detail:"Le nom rendu, contre un suzerain",
         requis:{sansFlag:"voie_refuge"}, suite:"signe"},
        {label:"Signer la première, refuser la seconde", detail:"Jet de Volonté (18) · elle n'a aucune raison d'accepter",
         test:{stat:"vol", dc:18}, reussite:"une_seule_ok", echec:"une_seule_ko"},
        {label:"Refuser les deux", detail:"Un nom qu'on rend peut se reprendre",
         suite:"refuse"},
        {label:"Lui demander ce qu'elle fera de Lucius", detail:"Requiert de l'avoir rencontré",
         requis:{flag:"lucius_rencontre"}, suite:"lucius"},
      ]
    },
    lucius:{
      pnj:"isolde",
      texte:[
        "« Lucius Furius Augustus lève une armée pour restaurer l'Empire. Vous rédigez des actes pour le remplacer. Vous ne pouvez pas gagner tous les deux. »",
        "« Nous pouvons parfaitement gagner tous les deux », dit-elle en servant le vin. « Simplement pas la même chose. »",
        "Elle explique, avec une clarté qui laisse Yohan un peu froid : Lucius fera la guerre, gagnera peut-être, et se retrouvera à la tête d'un pays dont il faudra tenir les greffes, les péages, les évêchés et les registres de solde. Il n'aura personne pour le faire. Elle aura tout le monde.",
        "« Un empereur qui ne tient pas ses écritures n'est pas un empereur : c'est un général en visite. »",
        "« Et il l'acceptera ? »",
        "« Il ne le remarquera pas. » Elle boit une gorgée. « C'est la beauté de la chose. Personne ne remarque jamais. »"
      ],
      choix:[
        {label:"Signer les deux pages", detail:"", requis:{sansFlag:"voie_refuge"}, suite:"signe"},
        {label:"Signer la première seulement", detail:"Jet de Volonté (17)",
         test:{stat:"vol", dc:17}, reussite:"une_seule_ok", echec:"une_seule_ko"},
        {label:"Refuser les deux", detail:"", suite:"refuse"},
        {label:"Prévenir Lucius", detail:"Lui vendre ce qu'elle prépare",
         suite:"prevenir_lucius", effets:{sang:20, xp:80, or:600, flags:["is_04_fait","isolde_trahie","lucius_averti_isolde"]}},
      ]
    },
    signe:{
      pnj:"isolde",
      texte:[
        "Yohan signe les deux pages.",
        "Il n'y a pas de sonnerie de trompettes. Il y a une plume qui gratte, du sable qu'on répand sur l'encre, et une femme qui souffle dessus.",
        "« Voilà. » Elle range l'acte dans un carton parmi cent autres. « Vous êtes le comte de Karlsberg. Vous l'avez toujours été ; c'est juste qu'on l'avait mal noté. »",
        "Yohan reste assis très longtemps. Quarante ans, une maison rasée, un peuple traqué — et cela se défait en une page et demie, parce qu'une femme a passé quatre ans à préparer les contreseings.",
        "« Vous comprenez pourquoi je ne lève pas d'armée », dit-elle doucement.",
        "Oui. Il comprend. C'est bien le problème."
      ],
      effets:{sang:30, xp:120, or:800, flags:["is_04_fait","isolde_alliee","karlsberg_legalise","karlsberg_reconnue"], reputation:{humains:20, parias:-10}},
      fin:true
    },
    une_seule_ok:{
      pnj:"isolde",
      texte:[
        "« La première. Pas la seconde. »",
        "Elle pose sa fourchette. « Vous me demandez de vous rendre une maison sans rien recevoir. »",
        "« Je vous demande de me rendre une maison parce que vous avez besoin qu'il existe une maison Paria restaurée. Pas moi : *une*. » Yohan pousse la seconde page loin de lui. « Le jour où vous prendrez le pouvoir, il vous faudra montrer que votre ordre répare ce que l'ancien a cassé. Une maison qui vous doit tout ne prouve rien. Une maison qui ne vous doit rien et qui existe quand même, ça, ça se cite. »",
        "Le silence dure. Un des clercs, au fond, a cessé d'écrire.",
        "« Vous venez de me vendre mon propre argument », dit-elle enfin.",
        "Elle prend la seconde page et la déchire proprement en deux, dans le sens de la longueur.",
        "« Signez la première. Et sortez avant que je change d'avis, ce qui va arriver dans environ une minute. »"
      ],
      effets:{sang:36, xp:140, flags:["is_04_fait","karlsberg_legalise","karlsberg_reconnue","isolde_respect"], reputation:{humains:14, parias:6}},
      fin:true
    },
    une_seule_ko:{
      pnj:"isolde",
      texte:[
        "Yohan tente de séparer les deux pages, et il argumente honnêtement, et cela ne suffit pas.",
        "« Non. » Elle rassemble les feuillets. « Je ne fais pas de cadeaux, monsieur de Karlsberg. Je fais des investissements. »",
        "Elle range l'acte entier dans un carton. « L'offre reste. Elle restera longtemps — c'est le genre de chose que je peux me permettre d'attendre. Vous, non. »"
      ],
      choix:[
        {label:"Signer les deux pages", detail:"", requis:{sansFlag:"voie_refuge"}, suite:"signe"},
        {label:"Sortir sans signer", detail:"", suite:"refuse"},
      ]
    },
    refuse:{
      pnj:"isolde",
      texte:[
        "Yohan repousse les deux pages.",
        "« Un nom qu'on me rend, on peut me le reprendre. Le mien, personne ne me l'a donné. »",
        "Elle le regarde longuement, puis fait quelque chose d'inattendu : elle repousse son assiette et s'accoude à la table, ce qui est chez elle un abandon de posture considérable.",
        "« C'est la réponse la plus stupide que j'aie entendue cette année. » Un temps. « Et je crois que si j'étais à votre place, je la ferais aussi. »",
        "Elle raccompagne Yohan jusqu'à la cour. Sur le seuil : « Nous serons peut-être ennemis. »",
        "« Peut-être. »",
        "« J'aimerais autant pas. Vous êtes reposant. »"
      ],
      effets:{sang:26, xp:100, flags:["is_04_fait","isolde_refusee","isolde_respect"], reputation:{parias:14}},
      fin:true
    },
    prevenir_lucius:{
      pnj:"lucius",
      texte:[
        "Lucius écoute Yohan jusqu'au bout, dans une tente de campagne où l'on entend ferrer des chevaux.",
        "Puis il pose une seule question : « Combien de contreseings ? »",
        "« Quatre. » — « Lesquels ? »",
        "Yohan les nomme. Lucius s'assied lentement.",
        "« Elle a le trésorier. » Il a l'air, pour la première fois, d'un homme qui vient de perdre quelque chose. « J'ai passé six ans à lever une armée et elle a le trésorier. »",
        "Il paie Yohan sans discuter, très bien, et le fait raccompagner poliment.",
        "Ce qui se passera entre eux ensuite prendra onze ans et ne fera pas un seul mort — et Yohan aura mis le doigt dessus."
      ],
      fin:true
    },
  }
},

/* ══════════ 5 · l'étincelle ══════════ */
{
  id:"IS_05_ETINCELLE", titre:"L'étincelle du Second Empire", famille:"POLITIQUE", rarete:"épique",
  image:"is_etincelle",
  requis:{ sangMin:176, flags:["is_04_fait"], sansFlags:["is_05_fait"] },
  scenes:{
    start:{
      pnj:"isolde",
      texte:[
        "Cela ne ressemble à rien. C'est le plus troublant.",
        "Il n'y a pas de siège d'Astrah, pas de porte enfoncée, pas de couronne arrachée. Il y a une session ordinaire du Grand Registre, un ordre du jour de onze points, et au point sept une question de validation des titres impériaux depuis la Purge.",
        "Onze maisons votent. Dix votent avec Varenne. Léopold IV apprend en fin de journée que ses actes de règne des quarante dernières années sont suspendus à réexamen, ce qui, juridiquement, veut dire qu'il n'a jamais régné.",
        "Isolde n'est même pas dans la salle. Elle travaille, comme toujours, dans une pièce pleine de cartons.",
        "« Vous êtes venu voir à quoi ça ressemble », dit-elle sans lever la tête. « Alors regardez bien. Ça ressemble à ça. »"
      ],
      choix:[
        {label:"Se tenir à côté d'elle", detail:"Requiert d'avoir signé son hommage",
         requis:{flag:"isolde_alliee"}, suite:"a_cote"},
        {label:"Lui dire ce que ça coûtera, et rester quand même", detail:"Jet de Volonté (17)",
         test:{stat:"vol", dc:17}, reussite:"averti_ok", echec:"averti_ko"},
        {label:"Publier le dossier des soldes fantômes", detail:"Requiert le dossier · faire tomber les deux à la fois",
         requis:{flag:"dossier_soldes"}, suite:"publie"},
        {label:"Aller prévenir le Roi de Cendre", detail:"Requiert de l'avoir approché · il a une journée",
         requis:{flag:"tr_08_fait"}, suite:"leopold"},
        {label:"Repartir sans rien faire", detail:"Ce n'est pas votre empire",
         suite:"part", effets:{sang:20, xp:90, flags:["is_05_fait","second_empire","isolde_regente"]}},
      ]
    },
    a_cote:{
      pnj:"isolde",
      texte:[
        "Yohan reste. Il n'y a rien à faire — c'est un bureau, pas une bataille — et c'est précisément pourquoi sa présence compte : quand les onze maisons sortiront de la salle, elles verront qui se tenait à côté d'elle.",
        "« Vous savez ce que vous faites là ? » demande-t-elle vers le soir.",
        "« Je suis la preuve. » — « De quoi ? » — « Que votre ordre répare. Une maison Paria restaurée, debout dans votre antichambre le jour où vous prenez le pouvoir. »",
        "« Exactement. » Elle range son dernier carton. « Vous vous êtes vendu très cher, en fin de compte. Je ne l'ai compris qu'après. »",
        "Le Second Empire n'aura pas de date de fondation. Il aura un procès-verbal, au point sept d'un ordre du jour, et un comte Paria dans la pièce d'à côté."
      ],
      effets:{sang:34, xp:150, or:1200, flags:["is_05_fait","second_empire","isolde_regente","yohan_du_second_empire"], reputation:{humains:24, parias:8}},
      fin:true
    },
    averti_ok:{
      pnj:"isolde",
      texte:[
        "« Vous allez y arriver », dit Yohan. « Et vous allez découvrir ce que découvre tout le monde : qu'un pays ne se tient pas par les écritures. »",
        "Elle lève enfin la tête.",
        "« Vous avez dix maisons et un procès-verbal. Vous n'avez pas un seul homme qui mourra pour vous. Le jour où quelqu'un refusera de reconnaître votre point sept, vous n'aurez rien pour l'y forcer, et ce jour-là arrivera. »",
        "Long silence. Elle ne le contredit pas.",
        "« Je sais », dit-elle enfin. « J'ai calculé sept ans. Peut-être neuf. »",
        "« Et ensuite ? »",
        "« Ensuite quelqu'un lèvera une armée et je devrai lui donner ma fille ou ma tête. » Elle range sa plume. « Ce sera peut-être vous. Ce sera plus probablement quelqu'un que je n'aurai pas vu venir. »",
        "Elle se lève. « Merci de l'avoir dit à voix haute. Personne d'autre n'osera. »"
      ],
      effets:{sang:30, xp:140, flags:["is_05_fait","second_empire","isolde_regente","isolde_lucide"], reputation:{humains:12}},
      fin:true
    },
    averti_ko:{
      pnj:"isolde",
      texte:[
        "Yohan lui dit ce qui l'attend, et il le dit mal — trop tôt, trop fort, dans une pièce où travaillent deux clercs.",
        "Elle l'écoute, referme un carton, et répond sans élever la voix : « Vous êtes en train de m'expliquer la politique. »",
        "Elle sort. Le Second Empire commence sans qu'on ait retenu ce que Yohan en pensait."
      ],
      effets:{sang:18, xp:90, flags:["is_05_fait","second_empire","isolde_regente"]},
      fin:true
    },
    publie:{
      texte:[
        "Yohan fait porter le carton au Grand Registre pendant que la session siège encore, avec une requête d'inscription au point onze : vérification des états de solde de la garnison, exercices 3849 à 3860.",
        "La séance ne se termine jamais. On suspend au point huit.",
        "Ce que quatre mille feuillets établissent est simple : l'Empire paie neuf mille hommes et en nourrit six mille. Ce qu'ils établissent accessoirement, c'est que trois des onze maisons qui votaient avec Varenne encaissent la différence depuis onze ans.",
        "Le point sept ne passera pas. Léopold restera empereur d'un empire ruiné. Trois maisons tomberont. Varenne survivra — elle survit toujours — mais avec quatre ans de travail à recommencer et une réputation d'imprudence dont elle ne se défera pas.",
        "Isolde envoie un mot le lendemain. Une ligne : « *C'était l'arme, en effet. Bien joué.* »",
        "Il n'y aura pas de Second Empire cette génération-ci."
      ],
      effets:{sang:38, xp:170, suspicion:20, flags:["is_05_fait","isolde_brisee","empire_ruine","dossier_publie"], reputation:{humains:-14, parias:16}},
      fin:true
    },
    leopold:{
      pnj:"leopold",
      texte:[
        "Il faut quatre heures pour arriver et deux pour être reçu, et il en reste très peu.",
        "Léopold IV écoute Yohan debout, sans s'asseoir une seule fois, et ne l'interrompt pas.",
        "« Le point sept », répète-t-il quand c'est fini. « Ils me défont au point sept d'un ordre du jour. »",
        "Il regarde par la fenêtre un long moment. Puis : « Pourquoi vous ? Je vous ai fait chasser pendant dix ans. »",
        "« Parce que je préfère un empire qui décline à un empire qui recommence. Le vôtre a fini d'apprendre ce qu'il pouvait faire aux gens comme moi. Le sien n'a pas commencé. »",
        "Le vieil homme a un rire bref et sans joie. « Voilà la première raison honnête qu'on me donne depuis quinze ans. »",
        "Il fera suspendre la session par ordonnance à la sixième heure. C'est illégal. C'est efficace. Cela lui coûtera trois maisons et deux provinces, et lui achètera onze ans."
      ],
      effets:{sang:34, xp:160, or:900, flags:["is_05_fait","isolde_ecartee","leopold_sauve"], reputation:{humains:18, parias:-6}},
      fin:true
    },
    part:{
      texte:[
        "Yohan sort de la salle des cartons et rentre chez lui.",
        "Le Second Empire naît ce jour-là, au point sept, sans qu'un coup soit tiré. Personne dans les campagnes ne s'en aperçoit avant l'hiver.",
        "Ce qui change pour Karlsberg tient en une ligne d'un formulaire d'impôt reçu au printemps : l'en-tête n'est plus le même.",
        "C'est tout. C'était toujours tout."
      ],
      fin:true
    },
  }
},

];
