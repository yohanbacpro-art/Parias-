/* PARIAS — L'arc du Livré
 *
 * Le nemesis de Yohan. Il paie une promesse faite très tôt : dans
 * TR_01_COURRIER, un registre de relais nomme un destinataire réduit à trois
 * lettres — **L.F.A.** — et le texte annonce que Yohan « le reconnaîtra plus
 * tard, et ce jour-là il regrettera de ne pas avoir eu peur plus tôt ».
 *
 * Ces trois lettres ne sont pas un nom. C'est le tampon que l'Empire appose sur
 * le dossier d'un enfant Paria pris pendant la Purge et gardé vivant :
 * **Livré · Formé · Assermenté**. L'homme signe de son tampon parce que c'est la
 * seule chose qu'on lui ait donnée à la place d'un nom.
 *
 * Il chasse les Parias. Pas pour l'Empire — l'Empire croit l'employer. Il les
 * rassemble pour que le sang s'arrête, et il compte être le dernier. C'est le
 * miroir exact de Yohan : même sang, même magie, conclusion inverse.
 *
 * Sa méthode, c'est lui qui l'a inventée : *cherchez-le par la Fatigue*. Seul
 * quelqu'un qui porte l'Onde pouvait comprendre qu'elle laisse un sillage.
 * En combat, cela se paie (voir `sillage` dans src/combat.js) : plus Yohan a
 * brûlé l'Onde, plus le Livré frappe fort.
 *
 * L'arc s'intercale entre les jalons de la trame : le moteur joue d'abord un
 * jalon disponible, puis un jalon du Livré, puis un attachement. Ses seuils de
 * sang tombent entre ceux de la trame — il revient quand l'histoire respire.
 */

const EVENTS_NEMESIS = [

/* ══════════ 1 · le hameau qu'on a vidé sans se battre ══════════ */
{
  id:"NE_01_TROIS_LETTRES", titre:"Le hameau qu'on n'a pas eu à brûler", famille:"PARIA", rarete:"épique",
  image:"ne_trois_lettres",
  requis:{ sangMin:26, flags:["tr_01_fait"], sansFlags:["ne_01_fait"] },
  scenes:{
    start:{
      texte:[
        "Le hameau est intact. C'est la première chose qui ne va pas.",
        "Pas de portes enfoncées, pas de toit noirci, pas de sang sur les seuils. Les feux ont été éteints proprement, la vaisselle rangée. Dans l'étable, deux bêtes attendent encore qu'on vienne les traire, et elles attendent depuis assez longtemps pour que ça s'entende.",
        "Onze maisons. Onze familles. Personne. Yohan a vu des villages rasés, des villages pillés, des villages fuis dans la panique. Il n'a jamais vu un village *rangé*.",
        "Sur le montant de la troisième porte, à hauteur d'homme, quelqu'un a marqué au fer trois lettres dans le bois : **L.F.A.**"
      ],
      choix:[
        {label:"Lire ce que le hameau raconte", detail:"Jet de Précision (14) · ils ne sont pas partis de force",
         test:{stat:"precision", dc:14}, reussite:"lecture_ok", echec:"lecture_ko"},
        {label:"Chercher qui a été emmené", detail:"Jet de Volonté (13) · les registres de baptême sont dans la chapelle",
         test:{stat:"vol", dc:13}, reussite:"registre_ok", echec:"registre_ko"},
        {label:"Toucher la marque", detail:"L'Onde garde la trace de ce qui l'a précédée · +12 Fatigue",
         suite:"touche", effets:{fat:12}},
      ]
    },
    lecture_ok:{
      texte:[
        "Yohan reconstitue la matinée pas à pas, et ce qu'il reconstitue lui donne froid.",
        "Ils ne se sont pas défendus. Ils n'ont pas non plus été surpris : les coffres sont ouverts et à moitié vidés, chacun a pris ce qu'on prend quand on sait qu'on ne revient pas. Quelqu'un leur a parlé, longtemps, calmement, et ils sont partis avec lui.",
        "Sur la place, les traces disent le reste : une file, deux gardes seulement, et devant, un seul cheval qui n'a pas eu besoin de piétiner.",
        "Un homme est venu chercher onze familles de Parias et les a convaincues de le suivre. Sans une porte enfoncée."
      ],
      effets:{sang:14, xp:36, flags:["ne_01_fait","lfa_connu","lfa_methode_douce"]},
      fin:true
    },
    lecture_ko:{
      texte:[
        "Yohan tourne dans le hameau une heure durant et n'en tire rien qu'il puisse nommer. Tout est en ordre, et c'est ça, l'anomalie : on ne range pas une maison qu'on abandonne.",
        "Il repart avec les trois lettres dans la tête et rien pour les accrocher."
      ],
      effets:{sang:6, xp:14, flags:["ne_01_fait","lfa_connu"]},
      fin:true
    },
    registre_ok:{
      pnj:"soeur_lisen",
      texte:[
        "La chapelle est ouverte. Le registre de baptême est là, à sa place, et il n'a pas été volé — il a été *annoté*.",
        "En marge de onze noms, la même main a inscrit une croix et une date : celle d'il y a neuf jours. En bas de la page, la même écriture a laissé une ligne entière, tracée sans hâte :",
        "« *Registre laissé sur place. Ces noms n'ont plus d'usage.* »",
        "Yohan referme le livre et reste un moment la main dessus. Il a passé sa vie à défendre un nom. Quelqu'un vient d'écrire que les noms n'ont plus d'usage, et onze familles l'ont suivi sans un cri."
      ],
      effets:{sang:16, xp:40, flags:["ne_01_fait","lfa_connu","lfa_registre_vu"]},
      fin:true
    },
    registre_ko:{
      texte:[
        "La chapelle a été vidée de ses papiers. Pas brûlée : vidée, avec méthode, jusqu'aux feuilles volantes coincées sous l'autel.",
        "Celui qui est passé ici ne détruit pas. Il emporte."
      ],
      effets:{sang:8, xp:18, flags:["ne_01_fait","lfa_connu"]},
      fin:true
    },
    touche:{
      texte:[
        "Yohan pose deux doigts sur le fer creusé dans le bois, et l'Onde répond avant qu'il ait rien demandé.",
        "Ce n'est pas un souvenir : c'est une *reconnaissance*. Quelque chose dans son sang identifie ce qui a marqué cette porte, et l'identifie comme sien.",
        "Il retire sa main trop vite. Le bourdonnement met une heure à retomber.",
        "Il sait maintenant une chose qu'il aurait préféré ne pas savoir : celui qui emmène les Parias en est un."
      ],
      effets:{sang:20, xp:44, fat:6, flags:["ne_01_fait","lfa_connu","lfa_est_paria"]},
      fin:true
    },
  }
},

/* ══════════ 2 · le registre du sillage ══════════ */
{
  id:"NE_02_SILLAGE", titre:"Le registre du sillage", famille:"ONDE", rarete:"épique",
  image:"ne_sillage",
  requis:{ sangMin:54, flags:["lfa_connu"], sansFlags:["ne_02_fait"] },
  scenes:{
    start:{
      texte:[
        "Le relais est une maison basse au bord d'une route que personne n'emprunte plus. Deux chevaux frais dans l'appentis, une cheminée tiède, et aucun homme : ils sont partis il y a moins d'une heure, et ils reviendront.",
        "Sur la table, un registre ouvert. Yohan le lit debout, et le lit deux fois.",
        "Ce ne sont pas des marchandises. Ce sont des *relevés*. Chaque ligne porte une date, un lieu, et une mesure — une échelle en quatre degrés, notée d'une plume régulière : **calme · tendu · critique · rompu**.",
        "Il connaît cette échelle. C'est la sienne. C'est celle de tous les porteurs de l'Onde, et il n'a jamais entendu personne la mettre par écrit.",
        "Il descend la colonne des dates jusqu'aux plus récentes, et il se trouve. Le pont où il a foudroyé trois hommes. La cour où il s'est effondré ensuite. La ferme où il a dormi deux jours. Tout est là, à un jour près, avec le degré atteint en face."
      ],
      choix:[
        {label:"Tout brûler", detail:"Effacer les relevés · le sillage ne sert qu'à celui qui le lit",
         suite:"brule", effets:{suspicion:-6, sang:10, xp:28, flags:["ne_02_fait","lfa_registre","lfa_brule"]}},
        {label:"Copier les relevés et les emporter", detail:"Jet de Précision (15) · comprendre la méthode, c'est pouvoir la fausser",
         test:{stat:"precision", dc:15}, reussite:"copie_ok", echec:"copie_ko"},
        {label:"Laisser le registre en place et s'inscrire dedans", detail:"Jet de Volonté (16) · être suivi là où on a décidé d'être",
         test:{stat:"vol", dc:16}, reussite:"appat_ok", echec:"appat_ko"},
        {label:"Attendre le retour des hommes du relais", detail:"Ils savent pour qui ils écrivent",
         suite:"attend"},
      ]
    },
    brule:{
      texte:[
        "Yohan pousse le registre dans l'âtre et souffle sur les braises jusqu'à ce que la couverture prenne. Il regarde brûler quatre ans de sa propre vie, relevée par un inconnu.",
        "Ça ne rend pas la méthode fausse. Ça la rend seulement, pour un temps, sans mémoire.",
        "Il repart avant que les hommes du relais ne rentrent. Ils trouveront des cendres et sauront qui les a faites."
      ],
      fin:true
    },
    copie_ok:{
      texte:[
        "Yohan recopie l'essentiel sur trois feuilles, en abrégeant ce qu'il peut, et laisse le registre exactement comme il l'a trouvé : à la même page, à la même ligne.",
        "Ce qu'il emporte vaut mieux qu'une piste. C'est un mode d'emploi. Le sillage se lit dans les jours qui suivent l'usage, il s'affaiblit avec la distance et l'eau vive, et il *ment* si on brûle l'Onde deux fois de suite au même endroit.",
        "Pour la première fois depuis qu'il a lu la lettre du courrier, Yohan n'est pas seulement chassé. Il sait comment on le chasse."
      ],
      effets:{sang:22, xp:56, flags:["ne_02_fait","lfa_registre","lfa_copie"]},
      fin:true
    },
    copie_ko:{
      texte:[
        "Les colonnes se recoupent, les abréviations renvoient à d'autres pages, et Yohan finit par se rendre compte qu'il recopie sans comprendre — ce qui, dans une heure, ne lui servira à rien.",
        "Il emporte les deux dernières feuilles. Il aura les dates, pas la méthode."
      ],
      effets:{sang:10, xp:24, flags:["ne_02_fait","lfa_registre"]},
      fin:true
    },
    appat_ok:{
      texte:[
        "Yohan prend la plume et écrit lui-même la ligne suivante. Date, lieu, degré : il choisit tout, et il choisit un endroit où il sera, et où il aura l'avantage.",
        "Puis il repose la plume dans le pli de la reliure, dans le sens où elle était.",
        "C'est le premier coup qu'il porte à un homme qu'il n'a jamais vu. Il ne saura que bien plus tard si le coup a porté."
      ],
      effets:{sang:24, xp:60, suspicion:8, flags:["ne_02_fait","lfa_registre","lfa_appat"]},
      fin:true
    },
    appat_ko:{
      texte:[
        "Yohan trace la ligne, la relit, et voit ce qu'un homme méthodique verra aussi : l'encre est plus fraîche que celle du dessus, l'inclinaison n'est pas la même, et personne au relais n'écrit ce lieu de cette façon.",
        "Il rature. Une rature dans un registre tenu par un maniaque, c'est une signature.",
        "Il s'en va en sachant qu'il vient de dire *je suis venu ici* à quelqu'un qui compte les taches d'encre."
      ],
      effets:{sang:12, xp:26, suspicion:14, flags:["ne_02_fait","lfa_registre","lfa_vu_venir"]},
      fin:true
    },
    attend:{
      pnj:"perrin",
      texte:[
        "Ils rentrent à la nuit, deux hommes fatigués qui n'ont pas d'armes sur eux, et l'un des deux s'assied en face de Yohan sans paraître surpris.",
        "« Vous êtes lequel ? » Il regarde le registre, puis Yohan. « Non, ne dites rien. Je préfère ne pas l'écrire. »",
        "Il parle sans se faire prier, parce qu'il n'a jamais aimé ce qu'il fait. Ils relèvent, ils ne chassent pas. On leur paie la ligne, pas la prise. Le destinataire ne vient jamais lui-même ; il envoie chercher les cahiers tous les deux mois, et il les rend annotés.",
        "« Il corrige nos fautes », dit l'homme. « Il souligne quand on écrit *critique* pour quelque chose qui n'était que *tendu*. » Il se frotte les yeux. « J'aimerais mieux qu'il nous engueule. »",
        "Yohan demande son nom. L'homme hausse les épaules : « Il n'en donne pas. Il tamponne. »"
      ],
      choix:[
        {label:"Leur demander de fausser les relevés", detail:"Jet de Volonté (14)",
         test:{stat:"vol", dc:14}, reussite:"fausse_ok", echec:"fausse_ko"},
        {label:"Les laisser tranquilles et partir", detail:"Ils n'ont rien fait que tenir un cahier",
         suite:"laisse", effets:{sang:14, xp:34, flags:["ne_02_fait","lfa_registre","lfa_relais_epargne"]}},
      ]
    },
    fausse_ok:{
      texte:[
        "« Vous continuez d'écrire », dit Yohan. « Vous écrivez juste toujours un degré en dessous. »",
        "L'homme réfléchit un long moment. « Il s'en apercevra. » — « Pas tout de suite. » — « Non », concède-t-il. « Pas tout de suite. »",
        "Il reprend sa plume. C'est tout ce qu'il fera pour Yohan, et c'est plus que ce qu'il se doit."
      ],
      effets:{sang:20, xp:50, flags:["ne_02_fait","lfa_registre","lfa_relais_retourne","lfa_relais_epargne"]},
      fin:true
    },
    fausse_ko:{
      texte:[
        "L'homme secoue la tête avant même que Yohan ait fini. « Vous partirez. Lui, il reste. »",
        "Il n'y a rien à répondre à ça, parce que c'est vrai."
      ],
      effets:{sang:10, xp:22, flags:["ne_02_fait","lfa_registre","lfa_relais_epargne"]},
      fin:true
    },
    laisse:{
      texte:[
        "Yohan repose le registre à sa page et sort. Derrière lui, l'homme le rappelle une fois :",
        "« Il ne vous veut pas de mal, vous savez. » Un temps. « C'est ce qui devrait vous inquiéter. »"
      ],
      fin:true
    },
  }
},

/* ══════════ 3 · la première fois ══════════ */
{
  id:"NE_03_SANS_NOM", titre:"L'homme qui a rendu son nom", famille:"PARIA", rarete:"épique",
  image:"ne_sans_nom",
  requis:{ sangMin:96, flags:["lfa_registre"], sansFlags:["ne_03_fait"] },
  scenes:{
    start:{
      pnj:"le_livre",
      texte:[
        "Il est assis à la table du fond, dos au mur, comme s'assied quelqu'un qui a appris à s'asseoir. Manteau impérial sans insigne, mains posées à plat, un cahier fermé devant lui. Il attend depuis un moment, et il attendait Yohan.",
        "« Asseyez-vous. Je ne vous toucherai pas ici. » Sa voix est basse, égale, sans accent d'aucune province. « Il y a dix-neuf personnes dans cette salle. »",
        "Yohan reste debout. L'homme accepte cela sans y attacher d'importance et pousse le cahier vers lui.",
        "« Vous avez lu mes relevés. Vous devriez lire la fin. »",
        "La dernière page ne porte pas de dates. Elle porte une liste de noms rayés, longue de deux colonnes, et en bas, la même main a écrit : *reste : quatre*.",
        "« Vous êtes le troisième. » Il retourne sa main, paume en l'air. Sur la peau, une marque que Yohan connaît trop bien : la brûlure fine que laisse l'Onde chez ceux qui en usent depuis l'enfance. « Je suis le quatrième. »"
      ],
      choix:[
        {label:"Lui demander son nom", detail:"C'est la seule question qui vaille",
         suite:"nom"},
        {label:"Lui demander pourquoi", detail:"Jet de Volonté (15) · un homme méthodique a une raison",
         test:{stat:"vol", dc:15}, reussite:"pourquoi_ok", echec:"pourquoi_ko"},
        {label:"Le frapper ici, devant dix-neuf témoins", detail:"Duel · il a choisi la salle, pas Yohan",
         suite:"frappe"},
        {label:"Sortir sans un mot", detail:"Ne rien lui donner, pas même une réponse",
         suite:"sort"},
      ]
    },
    nom:{
      pnj:"le_livre",
      texte:[
        "« Mon nom. » Il répète le mot comme on soupèse une pièce fausse. « On me l'a pris à six ans, avec le reste. »",
        "Il ouvre le cahier à la première page, la tourne vers Yohan. En haut, tamponné à l'encre officielle d'Astrah, un cartouche à trois cases, et dans chaque case un mot :",
        "**LIVRÉ · FORMÉ · ASSERMENTÉ**",
        "« Ils ne baptisent pas les enfants qu'ils gardent. Ils les classent. » Il referme le cahier. « J'ai signé de ce tampon pendant vingt-deux ans parce que je n'avais rien d'autre à signer. Les gens ont fini par croire que c'étaient des initiales. »",
        "Yohan regarde les trois lettres et comprend d'un coup toute la lettre du courrier mort, quatre ans plus tôt. *Ne le cherchez plus par le nom.* Ce n'était pas une consigne de traque. C'était sa règle de vie.",
        "« Vous vous demandez pourquoi je vous le dis. » Il se lève, et il est plus petit que Yohan l'imaginait. « Parce que vous mourrez en portant un nom, et moi je vivrai assez pour voir que ça n'aura servi à rien. »"
      ],
      effets:{sang:26, xp:70, flags:["ne_03_fait","lfa_vu","lfa_stigmate","lfa_parle"]},
      fin:true
    },
    pourquoi_ok:{
      pnj:"le_livre",
      texte:[
        "« Pourquoi. » Il hoche la tête, comme si la question méritait qu'on s'y arrête. « Vous croyez que je vous hais. Personne ne prend cette peine pour de la haine ; la haine est paresseuse. »",
        "Il compte sur ses doigts, sans emphase. « J'ai vu quatre-vingt-onze porteurs. J'en ai vu douze mourir de l'intérieur, la tête ouverte par ce qu'ils avaient appelé. J'en ai vu trente-quatre tuer quelqu'un qu'ils aimaient, dans le mauvais quart d'heure, sans le vouloir. J'ai vu deux villages entiers payer pour un seul homme fatigué. »",
        "« L'Onde ne fait pas des rois. Elle fait des accidents qui durent une vie. Le sang Paria est une maladie qui se transmet par le berceau, et il n'existe qu'un traitement : qu'il n'y ait plus de berceau. »",
        "Il regarde Yohan pour la première fois vraiment. « Je ne tue pas les miens. Je les emmène, je les compte, et je les laisse mourir vieux sans descendance. C'est plus lent que ce que fait l'Empire, et c'est définitif. »",
        "« Vous, vous relevez une maison. Vous voulez des héritiers. » Il remet son manteau. « C'est pour ça que vous êtes le seul que je devrai arrêter avant la fin. »"
      ],
      effets:{sang:28, xp:76, flags:["ne_03_fait","lfa_vu","lfa_parle","lfa_doctrine"]},
      fin:true
    },
    pourquoi_ko:{
      pnj:"le_livre",
      texte:[
        "« Pourquoi. » Il ne répond pas tout de suite, et quand il répond, c'est pour dire : « Vous n'êtes pas prêt à entendre une raison. Vous cherchez un monstre, et vous êtes déçu. »",
        "Il se lève. « Revenez quand vous aurez perdu quelque chose. On se comprendra mieux. »"
      ],
      effets:{sang:12, xp:32, flags:["ne_03_fait","lfa_vu"]},
      fin:true
    },
    frappe:{
      pnj:"le_livre",
      texte:[
        "Yohan dégaine dans une salle pleine, et l'homme ne recule pas d'un pouce — il *attendait* ça, et Yohan comprend une seconde trop tard qu'il vient de faire exactement ce qui était prévu.",
        "« Dix-neuf témoins », dit-il en se levant. « Merci. »"
      ],
      combat:{ groupe:[{champion:"le_livre"}], victoire:"frappe_gagne", defaite:"frappe_perdu" },
    },
    frappe_gagne:{
      pnj:"le_livre",
      texte:[
        "Il tombe sur un genou et lève une main — pas pour parer : pour arrêter. Yohan, le bras en l'air, s'aperçoit qu'il tremble de fatigue et que l'autre, lui, respire encore régulièrement.",
        "« Bien. » Il essuie sa bouche du dos de la main. « Vous étiez à *tendu* en entrant. Vous êtes à *critique* maintenant. J'ai ce qu'il me fallait. »",
        "Il se relève seul, ramasse son cahier, et sort au milieu des tables renversées sans que personne l'arrête.",
        "Sur le seuil, il se retourne : « Dix-neuf personnes vous ont vu faire ça. Vous êtes ce qu'ils raconteront de nous. »"
      ],
      effets:{sang:20, xp:64, suspicion:22, flags:["ne_03_fait","lfa_vu","lfa_frappe","lfa_mesure_prise"]},
      fin:true
    },
    frappe_perdu:{
      pnj:"le_livre",
      texte:[
        "Il ne frappe pas comme un soldat. Il frappe comme quelqu'un qui sait précisément à quel instant Yohan sera obligé de respirer, et il frappe à cet instant-là.",
        "Yohan se retrouve à genoux, la salle bourdonnant autour de lui, et l'homme le tient par le col sans serrer.",
        "« Non. » Presque doux. « Pas maintenant, pas ici, et pas pendant que vous êtes fatigué. Ce serait une mauvaise mesure. »",
        "Il le repose contre un banc comme on range un outil et s'en va."
      ],
      effets:{sang:14, xp:40, pv:-14, suspicion:10, flags:["ne_03_fait","lfa_vu","lfa_frappe","lfa_mesure_prise"]},
      fin:true
    },
    sort:{
      texte:[
        "Yohan tourne les talons et sort dans la rue sans avoir dit un mot. Derrière lui, rien : pas d'appel, pas de bruit de chaise. L'homme le laisse partir parce que le laisser partir ne lui coûte rien.",
        "Il marche une heure avant de se rendre compte de ce qui le dérange le plus : il n'a pas eu peur. Il a eu *honte*, et il ne sait pas encore de quoi."
      ],
      effets:{sang:16, xp:38, suspicion:-6, flags:["ne_03_fait","lfa_vu","lfa_parti"]},
      fin:true
    },
  }
},

/* ══════════ 4 · ce qu'il prend d'abord ══════════ */
{
  id:"NE_04_CE_QUIL_PREND", titre:"Ce qu'il prend d'abord", famille:"PARIA", rarete:"épique",
  image:"ne_ce_quil_prend",
  requis:{ sangMin:126, flags:["lfa_vu"], sansFlags:["ne_04_fait"] },
  scenes:{
    start:{
      texte:[
        "Il n'attaque pas Yohan. Il attaque ce que Yohan a mis quatre ans à construire, et il le fait un mardi, sans sommation, pendant que Yohan est ailleurs.",
        "Le messager arrive à cheval crevé et met un temps fou à dire les choses dans l'ordre."
      ],
      choix:[
        {label:"Écouter ce qu'on est venu dire", detail:"Ce qu'il a pris dépend de ce que vous aviez",
         suite:"quoi"},
      ]
    },
    quoi:{
      texte:[
        "Ce qu'il a pris, il l'a pris sans un mort — c'est sa manière, et c'est ce qui rend la chose insupportable. On ne peut même pas le haïr proprement."
      ],
      choix:[
        {label:"Les Sans-Nom", detail:"Ceux qu'Alycia a levés — il est venu les compter",
         requis:{flag:"sans_nom_leves"}, suite:"sans_nom"},
        {label:"La colonne", detail:"Une nuit dans le camp, et trois unités manquent à l'appel",
         requis:{renomMin:20}, suite:"colonne"},
        {label:"Le hameau qui vous abritait", detail:"Ceux qui n'avaient rien demandé",
         suite:"hameau"},
      ]
    },
    sans_nom:{
      pnj:"alycia",
      texte:[
        "Alycia l'attend au bord du camp, debout, très droite, et elle parle avant qu'il ait mis pied à terre.",
        "« Il est venu à midi. Seul. Il a demandé à leur parler, et je l'ai laissé faire, parce que j'ai cru que je pouvais gagner ça. »",
        "Elle s'interrompt. Ce n'est pas de la honte : c'est de la stupeur, encore.",
        "« Il ne leur a pas menti une seule fois. Il leur a dit exactement ce qui les attend : le bourdonnement qui empire, les enfants qui l'auront aussi, l'âge où on ne se contrôle plus. Il leur a demandé combien d'entre eux avaient déjà blessé quelqu'un sans le vouloir. » Un temps. « Onze mains se sont levées. »",
        "« Il en a emmené neuf. Ils sont partis avec lui. Personne ne les a forcés. »",
        "Elle regarde ses propres mains. « J'ai passé six ans à leur dire qu'ils valaient quelque chose. Il lui a fallu une après-midi. »"
      ],
      choix:[
        {label:"Aller les reprendre", detail:"Jet de Volonté (17) · les convaincre de revenir, pas les ramener de force",
         test:{stat:"vol", dc:17}, reussite:"reprend_ok", echec:"reprend_ko"},
        {label:"Les laisser partir", detail:"Ils ont choisi · c'est ce que vaut un choix",
         suite:"laisse_partir", effets:{sang:18, xp:50, affinite:{qui:"alycia", n:2}, flags:["ne_04_fait","lfa_coup","lfa_a_pris_les_siens"]}},
        {label:"Reprocher à Alycia de l'avoir laissé entrer", detail:"Elle a ouvert la porte",
         suite:"reproche", effets:{sang:8, xp:26, affinite:{qui:"alycia", n:-3}, flags:["ne_04_fait","lfa_coup","lfa_a_pris_les_siens"]}},
      ]
    },
    reprend_ok:{
      texte:[
        "Yohan les rattrape à deux jours de marche, sur une route qui monte, et il ne dégaine pas. Il s'assied avec eux et il parle jusqu'à la nuit.",
        "Il ne leur promet pas la guérison, parce qu'il n'y en a pas. Il leur promet ce qu'il a : un endroit, un nom au-dessus de la porte, et le droit de rater sans être effacé.",
        "Quatre reviennent. Cinq continuent la route. Yohan les regarde s'éloigner et ne leur en veut pas — c'est le prix d'avoir dit la vérité au lieu de la meilleure histoire.",
        "Les quatre qui reviennent ne parleront jamais de ces deux jours. Mais ils resteront jusqu'au bout."
      ],
      effets:{sang:26, xp:78, affinite:{qui:"alycia", n:3}, flags:["ne_04_fait","lfa_coup","lfa_repris_les_siens"]},
      fin:true
    },
    reprend_ko:{
      texte:[
        "Yohan les rattrape, et il parle, et il parle mal — parce qu'il est en colère, et qu'on n'a jamais convaincu personne en colère.",
        "Une femme lui répond calmement : « Vous, vous avez un nom qui vous porte. Nous, on n'a que ce qu'il y a dans le sang. Vous nous demandez de rester pour vous faire une maison. Lui nous demande juste de finir tranquilles. »",
        "Ils repartent. Yohan reste sur la route jusqu'à ce qu'il ne les voie plus."
      ],
      effets:{sang:14, xp:44, fat:10, flags:["ne_04_fait","lfa_coup","lfa_a_pris_les_siens"]},
      fin:true
    },
    laisse_partir:{ pnj:"alycia",
      texte:[
        "« Alors ils partent », dit Yohan.",
        "Alycia le regarde longuement. « Tu ne vas pas les chercher. »",
        "« Si je vais les chercher, je fais ce qu'il fait : je décide pour eux. » Il s'assied lourdement. « La seule chose qui nous sépare, lui et moi, c'est qu'on peut me dire non. »",
        "Elle finit par s'asseoir à côté de lui. Ils restent là un moment sans rien dire, ce qui est leur façon d'être d'accord."
      ],
      fin:true
    },
    reproche:{
      pnj:"alycia",
      texte:[
        "« Tu l'as laissé entrer. »",
        "Alycia ne se défend pas, et c'est bien pire. Elle attend qu'il ait fini, puis elle dit : « Oui. » Et elle s'en va finir la nuit ailleurs.",
        "Il aura besoin de longtemps pour comprendre que ce n'est pas à elle qu'il en voulait, et un peu plus longtemps encore pour le lui dire."
      ],
      fin:true
    },
    colonne:{
      pnj:"capitaine_ferre",
      texte:[
        "Il n'y a pas eu d'attaque. C'est le rapport du capitaine de garde qui est terrifiant : rien à signaler.",
        "Un homme est entré dans le camp à la nuit avec un ordre de mission authentique — parce qu'il en avait un — et il a passé trois heures à parler aux hommes autour des feux. Aux hommes, pas aux officiers.",
        "Au matin, trois unités manquaient. Pas désertées : *reversées*. Chacune avec un papier en règle, contresigné, indiquant le corps impérial qui les recevait.",
        "« Il connaissait leurs soldes », dit le capitaine. « Il connaissait les arriérés, unité par unité. Il a payé ce qu'on leur devait, devant tout le monde, et après seulement il leur a proposé de partir. »"
      ],
      choix:[
        {label:"Payer immédiatement tous les arriérés qui restent", detail:"−450 or · avant que le reste ne suive",
         requis:{or:450}, suite:"paye_solde", effets:{or:-450, sang:20, xp:60, renom:4, flags:["ne_04_fait","lfa_coup","lfa_solde_tenue"]}},
        {label:"Faire l'inspection soi-même, unité par unité", detail:"Jet de Volonté (16) · être vu à hauteur de feu",
         test:{stat:"vol", dc:16}, reussite:"inspection_ok", echec:"inspection_ko"},
        {label:"Pendre le capitaine de garde", detail:"L'exemple · +18 Suspicion, et ce que ça dit de vous",
         suite:"pend", effets:{suspicion:18, sang:6, xp:24, renom:-6, flags:["ne_04_fait","lfa_coup","lfa_colonne_saignee","pendu_le_capitaine"]}},
      ]
    },
    paye_solde:{
      texte:[
        "Yohan vide un coffre devant la troupe rassemblée et paie jusqu'au dernier sou, en commençant par les compagnies les plus mal traitées.",
        "Ce n'est pas de la générosité, et personne ne s'y trompe : c'est une réponse. Un autre est venu payer ce qu'ils devaient à leur place, et cet autre ne reviendra pas.",
        "Personne d'autre ne part cette semaine-là."
      ],
      fin:true
    },
    inspection_ok:{
      texte:[
        "Yohan passe la nuit suivante dans le camp, feu par feu, à écouter des hommes se plaindre du pain, des bottes et des officiers.",
        "Il ne promet rien qu'il ne peut tenir. Il retient les noms. Il note ce qui manque et il le fait venir dans la semaine.",
        "Ce n'est pas spectaculaire. C'est exactement ce que l'autre a fait, et c'est la seule manière de lui reprendre du terrain."
      ],
      effets:{sang:22, xp:66, renom:6, flags:["ne_04_fait","lfa_coup","lfa_colonne_tenue"]},
      fin:true
    },
    inspection_ko:{
      texte:[
        "Yohan fait le tour des feux et n'entend que ce qu'on dit à un seigneur qui fait le tour des feux : rien.",
        "Il repart avec l'impression d'avoir été poli. Quatre hommes de plus manqueront à l'appel avant la fin du mois."
      ],
      effets:{sang:10, xp:34, renom:-3, flags:["ne_04_fait","lfa_coup","lfa_colonne_saignee"]},
      fin:true
    },
    pend:{
      texte:[
        "On le pend au matin, devant la colonne rassemblée, et personne ne dit rien.",
        "Le soir, Yohan entend un homme raconter la chose à un autre, à voix basse, de l'autre côté d'un chariot. Il ne dit pas *le seigneur a fait justice*. Il dit : *ils se ressemblent, tu ne trouves pas ?*",
        "Yohan s'éloigne avant d'entendre la réponse."
      ],
      fin:true
    },
    hameau:{
      pnj:"mere_orsen",
      texte:[
        "Ils ne sont pas Parias. C'est tout l'intérêt.",
        "Le hameau qui a nourri Yohan trois hivers de suite a reçu la visite d'un homme poli avec un ordre en règle : réquisition, déplacement, indemnité. Chaque famille a touché son dû, en pièces comptées, contre signature.",
        "On les a réinstallés à quarante lieues, sur des terres correctes. Personne n'a été frappé. Personne n'est mort. Et il n'y a plus une seule porte à laquelle Yohan puisse frapper dans cette vallée.",
        "Mère Orsen, qui a lu l'ordre, le lui rend en secouant la tête. « Il n'a rien fait d'illégal. C'est ça qui devrait vous glacer. Il vous a retiré vos amis avec du papier. »"
      ],
      choix:[
        {label:"Aller les retrouver, un par un", detail:"Quarante lieues · ils ne doivent pas croire qu'on les a lâchés",
         suite:"retrouve", effets:{sang:22, xp:64, suspicion:-8, flags:["ne_04_fait","lfa_coup","lfa_hameau_suivi"]}},
        {label:"Faire annuler l'ordre par la voie officielle", detail:"Jet de Précision (16) · battre le papier avec du papier",
         test:{stat:"precision", dc:16}, reussite:"papier_ok", echec:"papier_ko"},
        {label:"Ne rien faire", detail:"Ils sont mieux là-bas, et c'est vrai",
         suite:"rien", effets:{sang:12, xp:36, flags:["ne_04_fait","lfa_coup","lfa_hameau_lache"]}},
      ]
    },
    retrouve:{
      texte:[
        "Il lui faut trois semaines et deux chevaux. Il les retrouve tous, un par un, et à chacun il dit la même chose : *je sais où vous êtes.*",
        "Rien d'autre. Ce n'est pas une protection, ce n'est pas une promesse. C'est le contraire exact de ce que l'autre leur a fait — quelqu'un a pris la peine de les suivre.",
        "Deux ans plus tard, quand il aura besoin d'une route sûre vers l'est, cinq maisons se souviendront."
      ],
      fin:true
    },
    papier_ok:{
      texte:[
        "Yohan remonte l'ordre jusqu'à l'intendance qui l'a émis et trouve la faille : la réquisition invoque une nécessité militaire dans une province où aucune campagne n'est ouverte.",
        "L'annulation prend quatre mois et coûte plus cher que ce qu'aurait coûté le rachat des terres. Elle passe.",
        "Le hameau revient. Une famille sur deux, seulement — les autres avaient déjà semé là-bas. Mais le nom de Karlsberg est de nouveau au-dessus de cette vallée, et pas le sien."
      ],
      effets:{sang:26, xp:74, or:-300, flags:["ne_04_fait","lfa_coup","lfa_hameau_repris"]},
      fin:true
    },
    papier_ko:{
      texte:[
        "L'ordre est irréprochable. Yohan le fait relire par trois clercs différents, qui lui répondent tous la même chose avec la même gêne polie : c'est régulier.",
        "Il finit par comprendre qu'il perd son temps et que c'était prévu aussi. Un homme qui vous fait passer quatre mois dans des bureaux est un homme qui sait où vous n'êtes pas."
      ],
      effets:{sang:12, xp:38, or:-120, flags:["ne_04_fait","lfa_coup","lfa_hameau_lache"]},
      fin:true
    },
    rien:{
      texte:[
        "Yohan replie l'ordre et le rend. « Ils sont mieux là-bas. »",
        "C'est vrai, et ce sera vrai encore dans dix ans. Ça n'empêche pas de savoir, en le disant, qu'on vient de perdre quelque chose qu'on ne récupérera pas."
      ],
      fin:true
    },
  }
},

/* ══════════ 5 · le nom qu'on lui donne ══════════ */
{
  id:"NE_05_LE_NOM_QUON_DONNE", titre:"Le nom qu'on lui donne", famille:"PARIA", rarete:"épique",
  image:"ne_le_nom",
  requis:{ sangMin:170, flags:["lfa_coup"], sansFlags:["ne_05_fait"] },
  scenes:{
    start:{
      pnj:"le_livre",
      texte:[
        "Il a choisi l'endroit et il l'a fait dire. Une carrière abandonnée à trois heures de Karlsberg, en fin d'après-midi, sans témoins — et la précision de l'heure est en soi une insulte : il sait combien de temps il faut à Yohan pour y arriver, et il sait dans quel état il arrivera.",
        "Il est là depuis longtemps. Il n'a pas d'armure. Il a posé son cahier sur une pierre plate, fermé, avec un caillou dessus pour que le vent ne l'ouvre pas.",
        "« Vous êtes venu à cheval », dit-il. « Bien. Vous êtes à *calme*. Je préfère. »",
        "Il roule ses manches. Les deux avant-bras sont blancs de la même brûlure fine, jusqu'au coude.",
        "« Un seul de nous deux ressortira d'ici avec quelque chose. Vous avez encore le choix de ce que c'est. »"
      ],
      choix:[
        {label:"En finir · le tuer", detail:"Duel · plus vous aurez brûlé l'Onde, plus il frappera fort",
         suite:"duel"},
        {label:"Lui donner un nom", detail:"Jet de Volonté (18) · exige de savoir ce que veut dire L.F.A.",
         requis:{flag:"lfa_stigmate"}, test:{stat:"vol", dc:18}, reussite:"nomme_ok", echec:"nomme_ko"},
        {label:"Lui proposer les Sans-Nom qui l'ont suivi", detail:"Les laisser finir tranquilles, et arrêter là",
         requis:{flag:"lfa_a_pris_les_siens"}, suite:"marche"},
        {label:"Reprendre son cahier et partir", detail:"Jet de Précision (17) · lui retirer sa mémoire, pas sa vie",
         test:{stat:"precision", dc:17}, reussite:"cahier_ok", echec:"cahier_ko"},
      ]
    },
    duel:{
      pnj:"le_livre",
      texte:[
        "Il ne dit rien de plus. Il ne se met même pas en garde — il attend, les mains ouvertes, et c'est Yohan qui doit commencer, ce qui est encore une manière de décider.",
        "Le premier échange apprend à Yohan tout ce qu'il avait besoin de savoir : l'autre ne frappe pas pour blesser. Il frappe pour faire durer."
      ],
      combat:{ groupe:[{champion:"le_livre"}], victoire:"duel_gagne", defaite:"duel_perdu", mortel:false },
    },
    duel_gagne:{
      pnj:"le_livre",
      texte:[
        "Il finit à genoux dans la poussière de la carrière, et il n'a toujours pas l'air surpris.",
        "« Vous avez brûlé beaucoup », dit-il, en cherchant sa respiration. « Vous n'auriez pas dû avoir besoin d'autant. »",
        "Yohan lève la main. L'autre ne ferme pas les yeux."
      ],
      choix:[
        {label:"Achever", detail:"Il ne s'arrêtera jamais autrement",
         suite:"tue", effets:{sang:34, xp:120, suspicion:14, flags:["ne_05_fait","nemesis_tue"]}},
        {label:"Le laisser vivant et lui prendre le cahier", detail:"Quatre-vingt-onze noms · sans mémoire, il recommence de zéro",
         suite:"brise", effets:{sang:30, xp:110, flags:["ne_05_fait","nemesis_brise"]}},
        {label:"Lui donner un nom", detail:"Jet de Volonté (16) · exige de savoir ce que veut dire L.F.A.",
         requis:{flag:"lfa_stigmate"}, test:{stat:"vol", dc:16}, reussite:"nomme_ok", echec:"nomme_ko"},
      ]
    },
    duel_perdu:{
      pnj:"le_livre",
      texte:[
        "Yohan tombe, et il ne se relève pas, et rien ne vient.",
        "L'autre s'accroupit à côté de lui, sans le toucher, et attend patiemment que la respiration revienne.",
        "« Non », dit-il enfin, presque avec douceur. « Je vous l'ai dit : je ne tue pas les miens. »",
        "Il se redresse, reprend son cahier sous son caillou, souffle la poussière sur la couverture.",
        "« Vous allez rentrer. Vous allez rebâtir votre maison, marier vos enfants, et mourir vieux en croyant avoir gagné. » Il range le cahier sous son manteau. « Et dans quatre-vingts ans quelqu'un de votre sang ouvrira la tête de quelqu'un d'autre sans le vouloir, et personne ne se souviendra de mon nom pour dire que j'avais prévenu. »",
        "« Parce que je n'en ai pas. »",
        "Il s'en va à pied. Yohan reste dans la carrière jusqu'à la nuit."
      ],
      effets:{sang:22, xp:80, pv:-20, flags:["ne_05_fait","nemesis_libre"]},
      fin:true
    },
    tue:{
      texte:[
        "C'est court, et ça ne ressemble à rien.",
        "Yohan reste debout au-dessus du corps d'un homme qu'il ne peut désigner à personne. Il ne peut pas dire *j'ai tué untel*. Il ne peut dire que *j'ai tué quelqu'un*, ce qui, en Vardhen, ne veut rien dire du tout.",
        "Il ramasse le cahier. Quatre-vingt-onze noms, dont soixante-dix-huit rayés. En dernière page, l'écriture régulière a ajouté une ligne récente : *reste : trois.* Le quatrième s'était déjà compté dehors.",
        "Yohan brûle le cahier dans la carrière. C'est la seule sépulture qu'il puisse lui donner."
      ],
      fin:true
    },
    brise:{
      pnj:"le_livre",
      texte:[
        "Yohan lui prend le cahier des mains et recule de trois pas.",
        "Et c'est là, seulement là, que l'homme change de visage. Il tend le bras — pas pour se battre : pour reprendre. « Rendez-le. »",
        "« Non. »",
        "« Il y a des noms dedans que personne d'autre n'a écrits. » Sa voix monte pour la première fois. « Si je ne les ai plus, ils n'ont jamais existé. »",
        "Yohan le regarde longtemps. « Maintenant vous savez ce que ça fait. »",
        "Il l'emporte. Derrière lui, dans la carrière, un homme reste à genoux devant une pierre plate où il n'y a plus rien."
      ],
      fin:true
    },
    nomme_ok:{
      pnj:"le_livre",
      texte:[
        "Yohan baisse la main.",
        "« Vous vous appelez Livré », dit-il. « C'est ce qu'ils ont écrit. Ce n'est pas ce que ça veut dire. »",
        "L'autre ne bouge pas.",
        "« *Livré*, c'est quelqu'un qu'on a donné. Un enfant qu'on a donné. » Yohan s'accroupit en face de lui, à hauteur, ce que personne ne fait jamais avec cet homme. « Vous avez passé vingt-deux ans à signer le nom de ce qu'on vous a fait, et à croire que c'était le nom de ce que vous êtes. »",
        "Un silence très long. Dans la carrière, le vent fait un bruit de papier.",
        "« Alors dites-le », finit par répondre l'homme, et sa voix n'est plus égale du tout. « Puisque vous savez si bien. Dites-le. »",
        "Yohan le dit. Un nom court, ordinaire, du genre qu'on donne à un garçon dans une vallée sans importance. Il ne l'a pas trouvé dans un registre : il l'a choisi, ce qui est exactement ce qu'on fait pour un enfant.",
        "L'homme reste immobile si longtemps que Yohan croit qu'il n'a pas entendu. Puis il ramasse son cahier, le pose contre sa poitrine, et s'en va sans un mot de plus.",
        "On ne le reverra pas. Trois ans plus tard, dans une province de l'est, un vieux maître d'école apprendra à des enfants de Parias à respirer contre l'Onde, et signera ses lettres d'un nom que personne n'a jamais vu sur un registre impérial."
      ],
      effets:{sang:40, xp:150, suspicion:-12, flags:["ne_05_fait","nemesis_nomme"]},
      fin:true
    },
    nomme_ko:{
      pnj:"le_livre",
      texte:[
        "« Vous vous appelez… » Yohan cherche, et la phrase se casse en deux dans sa bouche, parce qu'il s'aperçoit en la disant qu'il est en train d'offrir un cadeau à un homme qui a vidé onze villages.",
        "L'autre le voit hésiter, et quelque chose s'éteint dans son visage — quelque chose qui, une seconde, y avait été.",
        "« Non », dit-il. « Vous ne le pensiez pas. »",
        "Il se relève seul. « Ne recommencez jamais ça. C'est la seule chose que vous puissiez encore me faire. »"
      ],
      effets:{sang:20, xp:80, flags:["ne_05_fait","nemesis_libre"]},
      fin:true
    },
    marche:{
      pnj:"le_livre",
      texte:[
        "« Ceux que vous m'avez pris », dit Yohan. « Gardez-les. »",
        "L'autre attend la suite, parce qu'il y a toujours une suite.",
        "« Ils ont choisi. Je ne reviendrai pas les chercher, et je ne vous poursuivrai pas pour eux. » Yohan désigne la carrière autour d'eux, vide. « En échange, vous ne reparaissez plus devant les miens. Vous continuez votre compte ailleurs, jusqu'à ce que vous soyez le dernier. »",
        "« Vous acceptez donc que j'aie raison. »",
        "« J'accepte que vous ayez le droit de le croire. Ce n'est pas la même chose, et vous le savez très bien — sinon vous auriez emmené ceux qui ne voulaient pas venir. »",
        "Un très long silence. Puis l'homme ramasse son cahier et le range.",
        "« Marché », dit-il. « Ce n'est pas une paix. » — « Non », dit Yohan. « C'est un délai. »"
      ],
      effets:{sang:32, xp:120, flags:["ne_05_fait","nemesis_pacte"]},
      fin:true
    },
    cahier_ok:{
      pnj:"le_livre",
      texte:[
        "Yohan ne s'avance pas vers l'homme. Il s'avance vers la pierre plate.",
        "Le temps que l'autre comprenne, le cahier est sous le bras de Yohan et le caillou a roulé dans la poussière. Ils restent face à face à dix pas, et pour la première fois depuis quatre ans, c'est l'homme sans nom qui doit décider quelque chose dans l'urgence.",
        "Il ne bouge pas. Il ne bougera pas, parce que sauter sur Yohan, ce serait déjà avoir perdu la mesure.",
        "« Vous ne saurez pas les lire », dit-il.",
        "« Je n'ai pas besoin de les lire. » Yohan recule vers son cheval. « Je vais les rendre à leurs familles. »",
        "C'est la seule fois où il verra cet homme fermer les yeux."
      ],
      effets:{sang:30, xp:110, flags:["ne_05_fait","nemesis_brise","lfa_cahier_rendu"]},
      fin:true
    },
    cahier_ko:{
      pnj:"le_livre",
      texte:[
        "Yohan fait deux pas vers la pierre et s'aperçoit que l'homme s'est déplacé exactement en même temps, sans avoir l'air de se presser, et qu'il se trouve maintenant entre lui et le cahier.",
        "« Non. »",
        "Il ramasse le cahier lui-même et le glisse sous son manteau. « C'était la bonne idée. Vous l'avez eue trop tard, et vous l'avez montrée. »",
        "Il s'écarte et désigne la carrière. « Le reste tient toujours. »"
      ],
      choix:[
        {label:"Alors se battre", detail:"Il ne reste plus que ça",
         suite:"duel"},
        {label:"Repartir", detail:"Ne rien lui donner de plus aujourd'hui",
         suite:"repart", effets:{sang:14, xp:60, flags:["ne_05_fait","nemesis_libre"]}},
      ]
    },
    repart:{
      texte:[
        "Yohan remonte à cheval et s'en va au pas, sans se retourner, avec la certitude désagréable que c'est encore ce qui arrangeait le mieux l'autre.",
        "Il aura tout le trajet du retour pour se demander lequel des deux vient de gagner du temps sur l'autre."
      ],
      fin:true
    },
  }
},

];
