/* PARIAS — Les affaires locales
 *
 * Le registre général (contracts.js) reste ce qu'il est : cinquante affaires
 * venues d'ailleurs, utiles pour vivre, interchangeables par construction. Leur
 * défaut n'était pas d'être répétitives — c'était que leurs lieux (« marais de
 * Sombreval », « contreforts nains ») n'existent nulle part sur la carte. On
 * reconnaissait donc rien.
 *
 * Ici, chaque lieu de Vardhen a ses propres affaires : trois, avec ses gens, ses
 * ennuis à lui, et un commanditaire qui habite là.
 *
 * Et surtout elles vont quelque part. Les trois affaires d'un lieu forment un
 * **dossier**. Quand les trois sont réglées, un dénouement se déclenche : une
 * scène écrite où l'on décide ce que devient l'endroit — et ce choix reste. Il
 * pose un marqueur, déplace une réputation, et se relit dans l'épilogue.
 *
 * Format d'une affaire : les mêmes champs que le registre général, plus rien.
 * Le moteur de contrat (game.js) les joue à l'identique.
 */

const CONTRATS_LOCAUX = {

LOC_001: { peuple:'parias', dossier:"Les Ruines du Loup", affaires:[
  {id:"AL_001_1", titre:"Les pilleurs de la crypte basse", commanditaire:"Les gens du hameau de Vaubien", type:"chasse", danger:"modéré", or:220,
   pitch:"Trois hommes descendent chaque nuit dans ce qui reste des caves Karlsberg et remontent avec ce qu'ils peuvent porter."},
  {id:"AL_001_2", titre:"Le géomètre qui mesure pour quelqu'un", commanditaire:"Un ancien fermier des terres Karlsberg", type:"enquête", danger:"modéré", or:280,
   pitch:"Un homme arpente les ruines avec une chaîne d'arpenteur et refuse de dire pour qui il lève le plan."},
  {id:"AL_001_3", titre:"Ce qui a élu domicile dans la tour nord", commanditaire:"Les gens du hameau de Vaubien", type:"chasse", danger:"dangereux", or:420,
   pitch:"La tour nord tient encore debout, et depuis l'automne quelque chose y monte la nuit et en redescend au matin."},
 ],
 denouement:{
  id:"DL_001", titre:"Ce qu'on fait d'un tas de pierres", famille:"PARIA", image:"dl_001",
  intro:["Les ruines sont dégagées, la crypte scellée, la tour vide. Ce qui reste tient en trois pans de mur et un carré d'herbe rase.",
         "Le hameau de Vaubien attend une réponse : est-ce qu'on rebâtit ici, ou est-ce qu'on prend les pierres ?"],
  choix:[
   {label:"Relever l'enceinte", detail:"Trois ans de travail, et un endroit qui existe",
    texte:["On relève d'abord l'enceinte, avant les toits : c'est ce qu'on fait quand on compte rester. Vaubien fournit les bras, Yohan la nourriture, et personne ne signe rien.",
           "À la deuxième année, il y a onze feux à l'intérieur des murs. À la troisième, quelqu'un se plaint du prix du sel."],
    effets:{sang:14, xp:70, or:-400, flags:["dl_001_fait","karlsberg_repris","acte_fondation"], reputation:{parias:16}}},
   {label:"Laisser les pierres au hameau", detail:"+500 or · ils en feront des maisons",
    texte:["Yohan cède les pierres de taille à Vaubien, à charge pour eux de les prendre.",
           "En dix-huit mois, la moitié de Karlsberg est devenue quatorze granges, deux fours et un mur d'église. C'est probablement le meilleur usage qu'on ait fait de cette maison depuis quarante ans."],
    effets:{or:500, sang:8, xp:56, flags:["dl_001_fait"], reputation:{parias:8, humains:10}}},
   {label:"Sceller le site et n'y toucher plus", detail:"Ni ruine habitée, ni carrière",
    texte:["Yohan fait murer la crypte, coucher ce qui menace, et planter une haie vive tout autour. Puis il s'en va.",
           "L'endroit restera exactement ainsi pendant des décennies. Les gens de Vaubien y mènent leurs enfants une fois par an, sans savoir dire pourquoi."],
    effets:{sang:12, xp:60, flags:["dl_001_fait","karlsberg_scelle"], reputation:{parias:6}}},
  ]}
},

LOC_002: { peuple:'humains', dossier:"Fort-aux-Princes", affaires:[
  {id:"AL_002_1", titre:"La solde qui n'arrive jamais entière", commanditaire:"Le sergent-major de la porte est", type:"enquête", danger:"modéré", or:260,
   pitch:"La garnison touche sa solde amputée d'un cinquième depuis huit mois, et personne au-dessus du sergent ne veut compter."},
  {id:"AL_002_2", titre:"Les trois maisons du quartier bas", commanditaire:"Une veuve du quartier bas", type:"traque", danger:"dangereux", or:380,
   pitch:"Trois maisons ont brûlé en six semaines, toujours des propriétaires qui refusaient de vendre."},
  {id:"AL_002_3", titre:"Le prince qui ne veut pas de témoin", commanditaire:"Un intendant de Fort-aux-Princes", type:"récupération", danger:"très dangereux", or:600, noble:"Lady Agnès",
   pitch:"Des papiers ont quitté la citadelle dans une charrette de foin, et celui qui les a fait sortir a été retrouvé noyé."},
 ],
 denouement:{
  id:"DL_002", titre:"Qui tient la porte est", famille:"POLITIQUE", image:"dl_002",
  intro:["Trois affaires plus tard, le tableau est complet et il n'est pas beau : un capitaine détourne la solde, achète les maisons du quartier bas avec, et a fait noyer le clerc qui s'en était aperçu.",
         "Le sergent-major attend. Il a quarante hommes qui le suivraient et aucune idée de ce qu'il doit en faire."],
  choix:[
   {label:"Porter le dossier à la citadelle", detail:"La voie légale · lente et vérifiable",
    texte:["Il faut onze semaines, deux déplacements et un greffier qui accepte de dater. Le capitaine est cassé de son grade et envoyé à la frontière est.",
           "Le quartier bas ne récupère pas ses maisons. Mais la solde arrive entière depuis, et quarante hommes savent qui a fait ça."],
    effets:{sang:12, xp:66, renom:8, flags:["dl_002_fait","fort_assaini"], reputation:{humains:18}}},
   {label:"Laisser le sergent-major s'en charger", detail:"Quarante hommes, une nuit, aucun papier",
    texte:["Yohan donne le dossier au sergent et s'en va. Ce qui se passe cette nuit-là ne figure dans aucun registre.",
           "Au matin, le capitaine a démissionné pour raisons de santé et quitté la province. Le quartier bas récupère ses actes de propriété, signés de sa main, avec une écriture un peu tremblée."],
    effets:{sang:14, xp:70, suspicion:8, flags:["dl_002_fait","fort_assaini","fort_justice_sommaire"], reputation:{humains:8}}},
   {label:"Vendre le dossier au capitaine", detail:"+900 or · il paiera n'importe quoi",
    texte:["Il paie sans marchander, ce qui prouve qu'il en avait les moyens depuis le début.",
           "Le quartier bas continue de brûler jusqu'à l'hiver. Le sergent-major, lui, ne demande jamais ce qu'est devenu le dossier — il a compris tout seul, et c'est pire."],
    effets:{or:900, xp:40, flags:["dl_002_fait"], reputation:{humains:-16}}},
  ]}
},

LOC_003: { peuple:null, dossier:"Mont-Draken", affaires:[
  {id:"AL_003_1", titre:"Les pèlerins qu'on ne redescend pas", commanditaire:"Le prieur du refuge de mi-pente", type:"sauvetage", danger:"dangereux", or:320,
   pitch:"Quatre pèlerins sont montés cette saison et aucun n'est redescendu, ce qui est deux de trop même pour le Draken."},
  {id:"AL_003_2", titre:"Ce que la chaleur fait remonter", commanditaire:"Une compagnie de mineurs de Kar-Durak", type:"chasse", danger:"très dangereux", or:520,
   pitch:"Les galeries d'essai ont réveillé quelque chose qui vit très près des veines de feu et n'aime pas le bruit."},
  {id:"AL_003_3", titre:"Le relevé qu'on veut faire disparaître", commanditaire:"Un cartographe d'Astrah", type:"récupération", danger:"extrême", or:780,
   pitch:"Un relevé de la face nord existe, un seul, et trois personnes sont mortes depuis qu'il a été levé."},
 ],
 denouement:{
  id:"DL_003", titre:"Ce qui dort sous la montagne", famille:"ONDE", image:"dl_003",
  intro:["Les trois affaires disent la même chose sous des angles différents : quelque chose de très grand respire sous le Mont-Draken, et plus on creuse près des veines de feu, plus il remue.",
         "Le prieur, les mineurs et le cartographe attendent tous que quelqu'un tranche ce qu'on fait de cette information."],
  choix:[
   {label:"Faire fermer les galeries d'essai", detail:"Kar-Durak perdra une veine · le Draken se rendort",
    texte:["Il faut convaincre une compagnie naine de renoncer à une veine de fer, ce qui est à peu près aussi facile que de leur demander de renoncer à respirer. Yohan y arrive en leur montrant le relevé.",
           "Les galeries sont murées et bénies, dans cet ordre. Le Draken cesse de gronder avant l'hiver. Personne ne saura jamais ce qu'on a évité."],
    effets:{sang:18, xp:80, flags:["dl_003_fait","draken_scelle"], reputation:{nains:-10, humains:8}}},
   {label:"Publier le relevé", detail:"Que tout le monde sache ce qu'il y a là-dessous",
    texte:["Le relevé circule. On en rit beaucoup pendant deux ans, puis un peu moins.",
           "Le pèlerinage double. Les mineurs continuent. Et pour la première fois, ce qui arrive sur le Draken arrive à des gens qui ont été prévenus."],
    effets:{sang:16, xp:76, or:400, flags:["dl_003_fait","draken_ouverte","verite_cicatrice"]}},
   {label:"Garder le relevé et fermer la bouche", detail:"Certaines cartes ne devraient pas exister",
    texte:["Yohan brûle le relevé devant le cartographe, qui pleure, et devant le prieur, qui approuve.",
           "Le Mont-Draken redevient une montagne dangereuse et ordinaire. C'est un mensonge par omission qui sauvera probablement plus de vies qu'il n'en coûtera."],
    effets:{sang:14, xp:70, flags:["dl_003_fait","draken_tu"]}},
  ]}
},

LOC_004: { peuple:'humains', dossier:"Capitale d'Astrah", affaires:[
  {id:"AL_004_1", titre:"Le greffe qui perd des dossiers", commanditaire:"Un avocat des petites causes", type:"enquête", danger:"modéré", or:300,
   pitch:"Onze dossiers de succession ont disparu du greffe central en deux ans, tous concernant des familles sans héritier direct."},
  {id:"AL_004_2", titre:"Les enfants du quartier des tanneurs", commanditaire:"Une sage-femme du quartier des tanneurs", type:"sauvetage", danger:"dangereux", or:400,
   pitch:"Des enfants disparaissent du quartier des tanneurs, et la garde a cessé de prendre les plaintes."},
  {id:"AL_004_3", titre:"Ce que l'ambassade elfique n'a pas dit", commanditaire:"Un secrétaire du Grand Registre", type:"récupération", danger:"très dangereux", or:700, noble:"Lady Philippa",
   pitch:"Une correspondance a été retirée des archives officielles la veille d'une audience, et l'audience a mal tourné."},
 ],
 denouement:{
  id:"DL_004", titre:"La ville qui perd ses papiers", famille:"POLITIQUE", image:"dl_004",
  intro:["Trois affaires, un seul fil : quelqu'un, dans Astrah, fait disparaître des écritures — successions, plaintes, correspondances.",
         "Ce n'est pas une conspiration. C'est un service entier qui a pris l'habitude de vendre l'oubli, et qui a cessé de compter."],
  choix:[
   {label:"Faire tomber le service", detail:"Onze arrestations, et six mois de chaos administratif",
    texte:["Le chef de bureau et dix commis sont arrêtés. Le greffe d'Astrah cesse de fonctionner pendant six mois, ce qui ruine une centaine de familles honnêtes.",
           "C'était juste. C'était ruineux. Les deux à la fois, et il faut vivre avec."],
    effets:{sang:14, xp:74, flags:["dl_004_fait","greffe_purge"], reputation:{humains:12, parias:6}}},
   {label:"Obtenir la restitution, sans arrestations", detail:"Jet de Volonté implicite · tout revient, personne ne tombe",
    texte:["Yohan négocie ce qu'aucun juge n'aurait obtenu : la restitution intégrale, dossier par dossier, contre le silence.",
           "Onze successions retrouvent leurs héritiers. Le service continue de fonctionner, dirigé par les mêmes gens, qui savent désormais que quelqu'un compte."],
    effets:{sang:16, xp:80, or:300, flags:["dl_004_fait","greffe_tenu"], reputation:{humains:16}}},
   {label:"Se faire une place dans le service", detail:"+1000 or et un accès · au prix qu'on imagine",
    texte:["Yohan ne dénonce rien. Il obtient mieux : un homme à lui au greffe central d'Astrah, qui fera disparaître ou apparaître ce qu'il faudra, quand il le faudra.",
           "C'est extraordinairement utile. Les enfants du quartier des tanneurs, eux, continuent de disparaître."],
    effets:{or:1000, sang:8, xp:50, suspicion:-10, flags:["dl_004_fait","greffe_complice"], reputation:{humains:-12, parias:-8}}},
  ]}
},

LOC_005: { peuple:'khesh', dossier:"Les Dunes Khesh", affaires:[
  {id:"AL_005_1", titre:"Le puits empoisonné de Serth", commanditaire:"Le clan Serth", type:"enquête", danger:"modéré", or:280,
   pitch:"Un puits partagé par trois clans est devenu amer en une nuit, et chacun accuse les deux autres."},
  {id:"AL_005_2", titre:"La caravane des quarante jours", commanditaire:"Un maître de caravane khesh", type:"sauvetage", danger:"dangereux", or:420,
   pitch:"Une caravane a quarante jours de retard sur une route qui en prend vingt-deux."},
  {id:"AL_005_3", titre:"Ceux qui prennent le nom d'un autre clan", commanditaire:"Le conseil des tentes", type:"traque", danger:"très dangereux", or:640,
   pitch:"Des pillards attaquent en portant les couleurs d'un clan qui n'a rien fait, et ça marche depuis trop longtemps."},
 ],
 denouement:{
  id:"DL_005", titre:"Le conseil des tentes", famille:"KHESH", image:"dl_005",
  intro:["Le conseil se tient sous une seule tente, ce qui n'était pas arrivé depuis onze ans. Trois clans, un puits, une caravane sauvée et des pillards démasqués.",
         "On demande à l'étranger de dire ce qu'il a vu. Ce qu'il dira décidera si les tentes restent ensemble ou se séparent au matin."],
  choix:[
   {label:"Dire exactement ce qui s'est passé", detail:"Y compris ce que le clan Serth a fait",
    texte:["Yohan dit tout, y compris que Serth a empoisonné son propre puits pour accuser ses voisins et récupérer leur part de la route.",
           "Serth est mis au ban. C'est brutal, c'est juste, et cela coûte aux Dunes deux cents lances qu'il faudra remplacer."],
    effets:{sang:16, xp:80, flags:["dl_005_fait","dunes_verite"], reputation:{khesh:18}}},
   {label:"Taire ce que Serth a fait", detail:"Les trois clans restent · le mensonge tient",
    texte:["Yohan attribue le puits aux pillards, ce qui est faux et parfaitement crédible.",
           "Les trois clans repartent ensemble. Serth sait que Yohan sait, et paiera cette dette pendant des années — c'est une bonne dette et c'est aussi une laisse."],
    effets:{sang:14, xp:74, or:500, flags:["dl_005_fait","dunes_unies","khesh_dette"], reputation:{khesh:10}}},
   {label:"Refuser de témoigner", detail:"Ce n'est pas votre désert",
    texte:["« Je ne suis pas des vôtres et je ne dirai pas qui l'est. »",
           "Le conseil se sépare au matin sans avoir rien tranché. Deux ans plus tard, deux des trois clans se feront la guerre pour ce puits — et le troisième aura disparu."],
    effets:{sang:8, xp:54, flags:["dl_005_fait","dunes_divisees"], reputation:{khesh:-6}}},
  ]}
},

LOC_006: { peuple:'elfes', dossier:"La Cour lumineuse", affaires:[
  {id:"AL_006_1", titre:"L'arbre qu'on a coupé de nuit", commanditaire:"Un gardien des lisières", type:"enquête", danger:"modéré", or:300,
   pitch:"Un arbre-mémoire de quatre cents ans a été abattu de nuit, proprement, par quelqu'un qui savait où frapper."},
  {id:"AL_006_2", titre:"Ce qui traverse la frontière ouest", commanditaire:"La Cour lumineuse", type:"traque", danger:"dangereux", or:440,
   pitch:"Quelque chose passe la frontière ouest chaque nouvelle lune et repart, et les gardes ne le voient jamais."},
  {id:"AL_006_3", titre:"L'archiviste qui ne dort plus", commanditaire:"Un conseiller de la Cour", type:"enquête", danger:"très dangereux", or:660,
   pitch:"Un archiviste de six cents ans a cessé de dormir depuis qu'il a classé un fonds qu'on croyait perdu."},
 ],
 denouement:{
  id:"DL_006", titre:"Ce que la Cour préfère ne pas savoir", famille:"ELFE", image:"dl_006",
  intro:["Le fonds retrouvé, l'arbre abattu, le passeur de la frontière ouest : les trois affaires tiennent ensemble, et ce qu'elles disent est simple.",
         "Une branche de la Cour fait sortir vers l'ouest ce qu'Eltharion refuse de reconnaître : les archives de la Purge, celles où l'on a écrit qu'on fermait les routes."],
  choix:[
   {label:"Aider à les faire sortir", detail:"Que la vérité existe ailleurs qu'ici",
    texte:["Yohan escorte le dernier convoi jusqu'à la frontière. Le fonds arrivera intact à Fort-aux-Princes et sera copié onze fois avant la fin de l'année.",
           "Eltharion mettra soixante ans à admettre l'existence de ces pages. Elles seront irréfutables depuis longtemps."],
    effets:{sang:18, xp:86, flags:["dl_006_fait","archive_publiee"], reputation:{elfes:-14, parias:20}}},
   {label:"Rendre le fonds à la Cour", detail:"Ils choisiront ce qu'ils en font",
    texte:["Yohan ramène le fonds à la Cour lumineuse et le remet en séance, devant témoins, de sorte qu'on ne puisse plus dire qu'il n'a pas existé.",
           "Le fonds est scellé pour deux siècles. C'est moins que la publication et beaucoup plus que l'oubli — et personne n'a été trahi."],
    effets:{sang:16, xp:80, flags:["dl_006_fait","archive_scellee"], reputation:{elfes:20}}},
   {label:"En prendre une copie et laisser faire", detail:"Ne rien décider, tout garder",
    texte:["Yohan copie ce qui compte et laisse le convoi partir sans lui.",
           "Il aura les pages. Il ne saura jamais quoi en faire, et elles resteront dans un coffre à Karlsberg pendant vingt ans, à peser."],
    effets:{sang:12, xp:70, flags:["dl_006_fait","archive_copiee"], reputation:{elfes:4}}},
  ]}
},

LOC_007: { peuple:'elfes_noirs', dossier:"La Cour d'Anarion", affaires:[
  {id:"AL_007_1", titre:"Le duel qu'on ne peut pas refuser", commanditaire:"Une maison mineure de Valombre", type:"guerre", danger:"dangereux", or:420,
   pitch:"Une maison a été provoquée par un duelliste professionnel et n'a personne à lui opposer."},
  {id:"AL_007_2", titre:"Ce qu'on sert au dernier service", commanditaire:"Un échanson de la Cour Noire", type:"enquête", danger:"très dangereux", or:580,
   pitch:"Trois convives sont morts en six mois, toujours au dernier service, toujours d'autre chose."},
  {id:"AL_007_3", titre:"La dette qu'Anarion a rachetée", commanditaire:"Un prêteur de Valombre", type:"récupération", danger:"très dangereux", or:700, noble:"Lady Ysabeau",
   pitch:"Le roi a racheté toutes les dettes d'une maison en une nuit, et cette maison voudrait savoir pourquoi."},
 ],
 denouement:{
  id:"DL_007", titre:"Ce qu'Anarion trouve amusant", famille:"ELFE_NOIR", image:"dl_007",
  intro:["Le duelliste, l'échanson et les dettes rachetées : trois fils, un seul nœud, et le nœud a un nom.",
         "Anarion le Magnifique fait éliminer une maison de Valombre par trois moyens simultanés, sans qu'aucun soit illégal. Et il a fait en sorte que Yohan le découvre."],
  choix:[
   {label:"Prévenir la maison visée", detail:"Elle a peut-être une nuit d'avance",
    texte:["Ils écoutent, ne le croient pas, puis le croient trop tard. Deux membres de la maison s'enfuient par mer cette nuit-là et survivent.",
           "Anarion enverra à Yohan un mot de félicitations parfaitement sincère. C'est le pire remerciement qu'il ait jamais reçu."],
    effets:{sang:16, xp:82, flags:["dl_007_fait","valombre_avertie"], reputation:{elfes_noirs:-10, humains:8}}},
   {label:"Aller demander à Anarion pourquoi", detail:"Il répondra · c'est bien le problème",
    texte:["« Parce qu'ils étaient devenus ennuyeux », dit-il en servant lui-même le vin. « Vous vouliez une raison plus grande. Il n'y en a pas. »",
           "Yohan repart avec la certitude d'avoir compris quelque chose d'important sur la Cour Noire, et l'envie très nette de ne plus jamais y remettre les pieds."],
    effets:{sang:18, xp:88, or:400, flags:["dl_007_fait","anarion_curieux"], reputation:{elfes_noirs:12}}},
   {label:"Ne rien faire du tout", detail:"C'est leur cour et leurs règles",
    texte:["Yohan encaisse ses trois contrats et s'en va.",
           "La maison disparaît des registres de Valombre dans le mois. Personne ne trouve cela remarquable, ce qui est la chose la plus remarquable de toute l'affaire."],
    effets:{or:300, xp:52, flags:["dl_007_fait"], reputation:{elfes_noirs:6}}},
  ]}
},

LOC_008: { peuple:'nains', dossier:"Kar-Durak", affaires:[
  {id:"AL_008_1", titre:"L'étai qu'on n'a pas posé", commanditaire:"Une compagnie de galerie", type:"enquête", danger:"modéré", or:300,
   pitch:"Un effondrement a tué neuf mineurs dans une galerie dont les étais avaient été payés mais jamais posés."},
  {id:"AL_008_2", titre:"Ce qui remonte par le puits d'aération", commanditaire:"Le maître des Grandes Portes", type:"chasse", danger:"dangereux", or:460,
   pitch:"Quelque chose est monté des niveaux abandonnés par un puits d'aération et n'est pas redescendu."},
  {id:"AL_008_3", titre:"La commande d'Astrah", commanditaire:"Le conseil des forges", type:"récupération", danger:"très dangereux", or:680,
   pitch:"Une commande d'armes pour Astrah a disparu entre la forge et la porte, à l'intérieur de la cité."},
 ],
 denouement:{
  id:"DL_008", titre:"Ce que Kar-Durak se doit à elle-même", famille:"NAIN", image:"dl_008",
  intro:["Les étais non posés, la commande disparue, et les neuf morts : tout remonte à la même compagnie, la plus ancienne de la cité, qui vend son acier à deux camps depuis quatre ans.",
         "Le conseil des forges ne veut pas l'entendre. Le maître des Grandes Portes, lui, veut savoir ce que l'étranger va dire."],
  choix:[
   {label:"Le dire au conseil, en séance", detail:"Une compagnie de huit cents ans",
    texte:["Il faut trois jours pour être entendu et une heure pour être cru. La compagnie est dissoute, ses marques rayées de la pierre du registre — ce que les nains ne font qu'une fois par siècle.",
           "Neuf familles reçoivent le prix du sang. Kar-Durak perd un tiers de sa production pendant deux ans et ne s'en plaint jamais devant un étranger."],
    effets:{sang:18, xp:86, flags:["dl_008_fait","kardurak_purge"], reputation:{nains:22}}},
   {label:"Le dire au maître des Portes seul", detail:"Qu'il règle ça entre nains",
    texte:["Le maître écoute, remercie, et ne dit pas ce qu'il compte faire.",
           "La compagnie continue d'exister. Ses trois anciens sont remplacés dans l'année, sans explication publique, et les étais sont posés partout. Les neuf morts ne sont jamais mentionnés."],
    effets:{sang:14, xp:76, flags:["dl_008_fait","kardurak_discret"], reputation:{nains:14}}},
   {label:"Vendre l'information à Astrah", detail:"+1100 or · ils paient très cher pour ça",
    texte:["Astrah apprend que son fournisseur d'armes arme aussi ses ennemis. La commande suivante est annulée et la province cherche un autre forgeron.",
           "Kar-Durak perd un marché de vingt ans. Personne à Kar-Durak ne saura jamais d'où c'est venu — ce qui n'empêchera pas de se méfier des étrangers un peu plus qu'avant."],
    effets:{or:1100, xp:52, flags:["dl_008_fait"], reputation:{nains:-18, humains:10}}},
  ]}
},

LOC_009: { peuple:'peaux_vertes', dossier:"Les Profondeurs Vertes", affaires:[
  {id:"AL_009_1", titre:"Les tambours qui ne s'arrêtent plus", commanditaire:"Un éclaireur de Kar-Durak", type:"enquête", danger:"dangereux", or:340,
   pitch:"Les tambours battent sans interruption depuis onze jours, ce qui n'arrive que pour une chose."},
  {id:"AL_009_2", titre:"Ce que les tribus se disputent", commanditaire:"Un chef de tribu des galeries hautes", type:"traque", danger:"très dangereux", or:560,
   pitch:"Deux tribus se massacrent pour une galerie que ni l'une ni l'autre ne peut tenir, et quelqu'un les y pousse."},
  {id:"AL_009_3", titre:"Le seigneur qui compte ses bandes", commanditaire:"Le maître des Grandes Portes", type:"guerre", danger:"extrême", or:820,
   pitch:"Un chef rassemble les bandes des niveaux bas, méthodiquement, en payant leurs chefs plutôt qu'en les battant."},
 ],
 denouement:{
  id:"DL_009", titre:"Ce qui monte des niveaux bas", famille:"PEAU_VERTE", image:"dl_009",
  intro:["Les tambours, la galerie disputée, les bandes achetées : tout tient dans une seule main, et cette main paie en acier de Kar-Durak.",
         "Le chef des niveaux bas veut la surface. Il l'aura dans deux ans, ou dans dix, selon ce qui se décide maintenant."],
  choix:[
   {label:"Couper la route de l'acier", detail:"Sans acier, les bandes se redivisent",
    texte:["Il ne s'agit pas de se battre : il s'agit de faire fermer trois galeries de contrebande et d'en dire le nom aux bons nains.",
           "Les bandes se redivisent en une saison. Le chef survit, plus pauvre et beaucoup plus prudent. La surface a gagné dix ans."],
    effets:{sang:16, xp:84, flags:["dl_009_fait","horde_dispersee"], reputation:{nains:14, peaux_vertes:-12}}},
   {label:"Aller le voir et négocier un passage", detail:"Il achète les chefs · il peut acheter la paix",
    texte:["Il reçoit Yohan comme on reçoit un fournisseur : sans hostilité et sans illusion.",
           "L'accord tient en trois points et ne concerne que la Route Grise, qui restera ouverte. Ce n'est pas la paix. C'est un couloir dans quelque chose de très grand qui monte quand même."],
    effets:{sang:18, xp:88, or:400, flags:["dl_009_fait","passage_vert_paye","horde_pressentie"], reputation:{peaux_vertes:20}}},
   {label:"Prévenir la surface et laisser venir", detail:"Deux ans pour se préparer",
    texte:["Yohan porte l'information à Kar-Durak, à Fort-aux-Princes et aux Champs de Cendre, et se fait recevoir avec le sérieux qu'on accorde aux prophètes de malheur.",
           "Deux villages sur onze le croiront et déménageront. Ce seront les deux seuls qui existeront encore dans cinq ans."],
    effets:{sang:14, xp:78, flags:["dl_009_fait","horde_pressentie","horde_comptee"], reputation:{humains:12, nains:10}}},
  ]}
},

LOC_010: { peuple:'hommes_betes', dossier:"La Forêt des Mille Cornes", affaires:[
  {id:"AL_010_1", titre:"Les pièges de la lisière est", commanditaire:"Un fermier de la lisière", type:"chasse", danger:"modéré", or:260,
   pitch:"Quelqu'un pose des pièges à mâchoires sur la lisière, et ce ne sont pas les fermiers."},
  {id:"AL_010_2", titre:"La harde qui ne migre plus", commanditaire:"Un vieux passeur de la forêt", type:"enquête", danger:"dangereux", or:400,
   pitch:"Une harde qui migrait chaque automne depuis toujours reste sur place, et la forêt s'en trouve mal."},
  {id:"AL_010_3", titre:"Ce que les chasseurs de primes rapportent", commanditaire:"Les gens de trois hameaux", type:"traque", danger:"très dangereux", or:600,
   pitch:"Une compagnie de chasse aux primes travaille la forêt depuis six mois, légalement, et les hameaux commencent à en payer le prix."},
 ],
 denouement:{
  id:"DL_010", titre:"Où passe la lisière", famille:"HOMME_BETE", image:"dl_010",
  intro:["Les pièges, la harde immobile et la compagnie de chasse racontent une seule chose : la lisière bouge, et personne n'a jamais écrit où elle est.",
         "Les trois hameaux veulent une frontière. La harde aussi, à sa façon. Il n'y a jamais eu personne pour la tracer."],
  choix:[
   {label:"Tracer la frontière avec les deux camps", detail:"Des semaines · et il faudra que les deux y soient",
    texte:["Il faut onze jours, un vieux passeur, beaucoup de dessins dans la terre, et une patience que Yohan ne se connaissait pas.",
           "La ligne est marquée par des pierres empilées par trois. Elle sera respectée quarante ans — plus longtemps qu'aucun traité signé à Astrah pendant la même période."],
    effets:{sang:20, xp:92, flags:["dl_010_fait","harde_toleree","pierres_accordees"], reputation:{hommes_betes:20, humains:12}}},
   {label:"Chasser la compagnie de primes", detail:"Le problème, ce sont eux",
    texte:["Ils ne se battent pas : ils comptent, et le compte n'est pas bon pour eux. Ils quittent la province avant la fin du mois.",
           "La harde reprend sa migration l'automne suivant. Les pièges rouillent. Rien n'est réglé, et tout va mieux."],
    effets:{sang:14, xp:78, suspicion:8, flags:["dl_010_fait"], reputation:{hommes_betes:16, humains:-6}}},
   {label:"Vendre la carte des passages aux chasseurs", detail:"+900 or · ils sauront enfin où frapper",
    texte:["Yohan vend ce que le vieux passeur lui a montré. La compagnie triple ses prises en une saison.",
           "La harde ne migre plus jamais. Deux ans plus tard, la forêt cesse d'envoyer des cerfs vers l'est, et les trois hameaux comprennent ce que ça leur coûte."],
    effets:{or:900, xp:48, flags:["dl_010_fait","hardes_installees"], reputation:{hommes_betes:-24, humains:-8}}},
  ]}
},

LOC_011: { peuple:null, dossier:"La Route Grise", affaires:[
  {id:"AL_011_1", titre:"Le relais qui ne relaie plus", commanditaire:"La guilde des rouliers", type:"enquête", danger:"modéré", or:240,
   pitch:"Le relais du kilomètre onze a cessé de fournir des chevaux frais, et refuse d'expliquer pourquoi."},
  {id:"AL_011_2", titre:"Les péages qui poussent", commanditaire:"Un marchand de sel", type:"traque", danger:"dangereux", or:360,
   pitch:"Quatre nouveaux péages sont apparus sur cent lieues, tous avec des papiers qui ont l'air vrais."},
  {id:"AL_011_3", titre:"Ce qui attend au kilomètre quarante", commanditaire:"La guilde des rouliers", type:"chasse", danger:"très dangereux", or:560,
   pitch:"Six convois ont disparu au même endroit en deux mois, sans traces de combat."},
 ],
 denouement:{
  id:"DL_011", titre:"Qui tient la Route Grise", famille:"VOYAGE", image:"dl_011",
  intro:["La route est dégagée, les faux péages démontés, le relais rouvert. Pour la première fois depuis des années, on peut aller d'un bout à l'autre sans payer trois fois.",
         "La guilde des rouliers propose à Yohan de tenir la route : un droit de passage, des hommes, et la responsabilité de ce qui s'y passe."],
  choix:[
   {label:"Accepter la charge", detail:"+8 Renom · un revenu, et un devoir",
    texte:["Yohan tient la Route Grise. Cela veut dire douze hommes à payer, quatre relais à approvisionner, et l'obligation d'y aller soi-même quand quelque chose cloche.",
           "Cela veut dire aussi que le sel arrive, que les gens voyagent, et qu'on prononce le nom de Karlsberg d'un bout à l'autre de cent lieues sans baisser la voix."],
    effets:{sang:16, xp:82, renom:8, or:300, flags:["dl_011_fait","route_grise_liberee","route_tenue"], reputation:{humains:16}}},
   {label:"La confier à la guilde", detail:"+700 or · ils la tiendront bien",
    texte:["La guilde tient la route correctement pendant six ans, puis mal, puis la revend à quelqu'un d'autre.",
           "Yohan touche sa part, une fois, et n'a plus jamais à s'en occuper. C'est exactement ce qu'il avait demandé."],
    effets:{or:700, xp:56, flags:["dl_011_fait","route_grise_liberee"], reputation:{humains:8}}},
   {label:"La laisser sans maître", detail:"Une route qui n'appartient à personne",
    texte:["« Une route à personne. » Le maître de guilde le prend pour une plaisanterie, puis comprend que non.",
           "Il n'y aura ni péage ni protection. Cela marchera étonnamment longtemps, parce que tout le monde y a intérêt — jusqu'au jour où quelqu'un n'y aura plus intérêt."],
    effets:{sang:12, xp:70, flags:["dl_011_fait","route_grise_liberee","route_libre"], reputation:{parias:10, humains:6}}},
  ]}
},

LOC_012: { peuple:null, dossier:"Le Défilé des Souffrances", affaires:[
  {id:"AL_012_1", titre:"Les corps du virage haut", commanditaire:"Un prêtre de passage", type:"enquête", danger:"dangereux", or:340,
   pitch:"On ramasse trois corps par mois au virage haut, et ils ne sont pas tous tombés."},
  {id:"AL_012_2", titre:"La bande qui connaît les horaires", commanditaire:"Un convoyeur du sel", type:"traque", danger:"très dangereux", or:520,
   pitch:"Une bande attaque uniquement les convois qui portent de la valeur, et jamais les autres."},
  {id:"AL_012_3", titre:"Ce que le défilé retient", commanditaire:"Les gens du dernier hameau", type:"chasse", danger:"extrême", or:760,
   pitch:"Quelque chose s'est installé dans les éboulis du versant nord et ne laisse plus passer les troupeaux."},
 ],
 denouement:{
  id:"DL_012", titre:"Le passage ou le contour", famille:"VOYAGE", image:"dl_012",
  intro:["Le défilé est net pour la première fois de mémoire d'homme. Ce qui reste à décider est vieux de deux siècles : faut-il le tenir, ou l'abandonner ?",
         "Le contour fait six jours. Le défilé en fait un, et tue régulièrement. Les deux hameaux du bout attendent qu'on tranche pour eux."],
  choix:[
   {label:"Fortifier le passage", detail:"−600 or · deux tours et douze hommes",
    texte:["Deux tours sèches et douze hommes payés à l'année. Ce n'est pas une forteresse : c'est assez pour qu'une bande organisée aille chercher ailleurs.",
           "Le défilé devient une route ordinaire. Les deux hameaux du bout doublent en dix ans. On finit par l'appeler autrement, ce qui est le vrai signe."],
    effets:{or:-600, sang:16, xp:84, renom:6, flags:["dl_012_fait","defile_tenu"], reputation:{humains:16}}},
   {label:"Faire ouvrir le contour proprement", detail:"Six jours, mais six jours vivants",
    texte:["Il faut convaincre trois propriétaires et une abbaye, ce qui prend plus de temps que de tuer n'importe quoi dans le défilé.",
           "Le contour s'ouvre. Le défilé se vide, s'éboule tout seul en quelques hivers, et cesse d'exister — ce que deux siècles de garnisons n'avaient pas obtenu."],
    effets:{sang:18, xp:88, flags:["dl_012_fait","defile_contourne"], reputation:{humains:12}}},
   {label:"Ne rien faire et prendre la prime", detail:"+600 or · le défilé restera le défilé",
    texte:["Yohan encaisse et s'en va. Ce qu'il a nettoyé se reconstitue en une saison, parce que c'est un défilé et qu'un défilé attire.",
           "Le prêtre de passage continue de ramasser trois corps par mois. Il ne se plaint pas : il note les noms quand il en trouve."],
    effets:{or:600, xp:48, flags:["dl_012_fait"]}},
  ]}
},

LOC_013: { peuple:null, dossier:"Les Îles Interdites", affaires:[
  {id:"AL_013_1", titre:"Le bateau qui revient sans personne", commanditaire:"Un armateur de Port-Noir", type:"enquête", danger:"dangereux", or:380,
   pitch:"Un caboteur est rentré au port toutes voiles dehors, en bon état, et vide."},
  {id:"AL_013_2", titre:"Ce que la marée dépose", commanditaire:"Un érudit d'Astrah", type:"récupération", danger:"très dangereux", or:560,
   pitch:"Des objets qui ne devraient pas exister s'échouent sur la même plage à chaque grande marée."},
  {id:"AL_013_3", titre:"Ceux qui y sont restés", commanditaire:"Une famille de Port-Noir", type:"sauvetage", danger:"extrême", or:800,
   pitch:"Trois marins ont été débarqués sur une île qui n'est sur aucune carte, il y a onze mois."},
 ],
 denouement:{
  id:"DL_013", titre:"Ce qu'on rapporte des Îles", famille:"ONDE", image:"dl_013",
  intro:["Les trois affaires convergent sur un fait que personne ne veut formuler : il y a là-bas des endroits où l'Onde ne se comporte pas comme ailleurs, et on peut en revenir.",
         "L'érudit veut publier. L'armateur veut affréter. La famille veut simplement qu'on arrête."],
  choix:[
   {label:"Aider l'érudit à publier", detail:"La connaissance, et ce qu'elle attire",
    texte:["Le mémoire paraît à Astrah et fait rire pendant un an. Puis trois expéditions partent, dont deux ne reviennent pas.",
           "Ce qu'on saura ensuite des Îles, on le devra à ce mémoire. Ce qu'on y perdra aussi."],
    effets:{sang:16, xp:82, or:500, flags:["dl_013_fait","iles_publiees","sceau_ancien_vu"]}},
   {label:"Faire fermer les Îles à la navigation", detail:"Convaincre Port-Noir de renoncer",
    texte:["Convaincre Port-Noir de renoncer à quelque chose de rentable relève de l'exploit. Yohan y arrive en montrant le caboteur vide à trente capitaines à la fois.",
           "Les Îles sortent des routes. Elles resteront hors des cartes une génération, et c'est probablement la bonne durée."],
    effets:{sang:18, xp:88, flags:["dl_013_fait","iles_fermees"], reputation:{humains:14}}},
   {label:"Y retourner chercher les trois marins", detail:"Onze mois · il n'en reviendra pas trois",
    texte:["Il en revient un. Il a vieilli de onze mois exactement, il est en bonne santé, et il ne se souvient de rien après le débarquement.",
           "Il vivra encore quarante ans à Port-Noir, tranquille, et refusera toute sa vie de s'approcher de l'eau."],
    effets:{sang:20, xp:94, fat:20, flags:["dl_013_fait","onde_suivait"], reputation:{humains:10}}},
  ]}
},

LOC_014: { peuple:'parias', dossier:"La Cicatrice", affaires:[
  {id:"AL_014_1", titre:"Ceux qui campent au bord", commanditaire:"Un ancien de la Cicatrice", type:"sauvetage", danger:"dangereux", or:360,
   pitch:"Une douzaine de gens campent au bord de la faille et refusent d'en partir, et certains ne mangent plus."},
  {id:"AL_014_2", titre:"L'expédition d'Astrah", commanditaire:"Un ancien de la Cicatrice", type:"traque", danger:"très dangereux", or:540,
   pitch:"Une expédition impériale descend dans la faille avec des instruments et sans aucune autorisation locale."},
  {id:"AL_014_3", titre:"Ce qui remonte quand on appelle", commanditaire:"Une famille des bords", type:"chasse", danger:"extrême", or:780,
   pitch:"Quelqu'un a appelé quelque chose depuis le fond, et ce quelque chose est monté."},
 ],
 denouement:{
  id:"DL_014", titre:"Ce qu'on fait d'une plaie ouverte", famille:"ONDE", image:"dl_014",
  intro:["La faille est calme, les campements dispersés, l'expédition renvoyée. Restent les anciens des bords, qui vivent là depuis toujours et savent ce que c'est.",
         "« Vous êtes le seul de votre sang qui soit venu jusqu'ici trois fois », dit le plus vieux. « Alors dites-nous ce qu'on en fait. »"],
  choix:[
   {label:"En faire un lieu gardé", detail:"Des gens qui savent, en permanence",
    texte:["Onze familles s'installent officiellement aux bords, avec un mandat écrit de Karlsberg et de quoi vivre. Leur travail : empêcher les gens de descendre.",
           "Elles y sont encore trois générations plus tard. On ne descend plus. C'est la seule chose qui ait jamais marché."],
    effets:{or:-400, sang:20, xp:92, flags:["dl_014_fait","cicatrice_gardee"], reputation:{parias:22}}},
   {label:"En faire un lieu d'étude paria", detail:"Comprendre l'Onde, et le payer",
    texte:["Ce qui commence là ne ressemble à rien : sept porteurs de l'Onde, un ancien, et l'idée qu'on peut mesurer plutôt que subir.",
           "En quinze ans, ils apprendront plus sur l'Onde que quatre siècles de peur. Quatre d'entre eux y laisseront la raison, et ils l'auront su en commençant."],
    effets:{sang:22, xp:96, flags:["dl_014_fait","cicatrice_etudiee","cycle_compris"], reputation:{parias:16}}},
   {label:"La faire condamner", detail:"Combler, murer, oublier",
    texte:["Il faut deux ans, une fortune et l'accord des anciens, qui ne le donnent pas de bon cœur.",
           "La Cicatrice est comblée sur trois cents pas. Ce n'est probablement qu'une couverture posée sur quelque chose de très profond. Cela suffira pour deux siècles, ce qui est plus que la plupart des solutions."],
    effets:{or:-700, sang:16, xp:84, flags:["dl_014_fait","cicatrice_comblee"], reputation:{parias:-8, humains:14}}},
  ]}
},

LOC_015: { peuple:'khesh', dossier:"Le Cimetière des Dragons", affaires:[
  {id:"AL_015_1", titre:"Les pilleurs d'os", commanditaire:"Le clan gardien du cimetière", type:"traque", danger:"dangereux", or:380,
   pitch:"Une compagnie découpe les carcasses à la scie et revend l'os de dragon à Port-Noir."},
  {id:"AL_015_2", titre:"Ce qui niche dans la cage thoracique", commanditaire:"Le clan gardien du cimetière", type:"chasse", danger:"très dangereux", or:580,
   pitch:"Quelque chose s'est installé dans la troisième carcasse et le clan a perdu deux hommes en essayant de vérifier."},
  {id:"AL_015_3", titre:"L'ossuaire qu'on n'a jamais rouvert", commanditaire:"Un vieux de la garde des os", type:"récupération", danger:"extrême", or:820,
   pitch:"Un ossuaire scellé depuis trois siècles s'est ouvert seul, et le clan refuse d'y entrer."},
 ],
 denouement:{
  id:"DL_015", titre:"Ce que gardent les gardiens", famille:"KHESH", image:"dl_015",
  intro:["Le clan gardien garde ce cimetière depuis onze générations et ne sait plus très bien pourquoi. L'ossuaire ouvert le leur a rappelé.",
         "Ce n'est pas un cimetière : c'est un dépôt. Quelqu'un, très anciennement, a rassemblé ici ce qui restait des dragons des sables — et a mis des gens devant."],
  choix:[
   {label:"Refermer l'ossuaire et se taire", detail:"Onze générations avaient raison",
    texte:["Il faut trois jours pour remettre la dalle et une semaine pour que Yohan cesse d'y penser.",
           "Le clan reprend sa garde. Ils ne savent toujours pas pourquoi. Ils savent maintenant que quelqu'un d'autre l'a vérifié, et cela leur suffit largement."],
    effets:{sang:16, xp:82, flags:["dl_015_fait","ossuaire_referme"], reputation:{khesh:20}}},
   {label:"Faire venir un érudit", detail:"Que quelqu'un sache lire ce qui est écrit",
    texte:["L'érudit met quatre mois à faire le voyage et onze jours à lire ce qui est gravé sous la dalle.",
           "Ce qu'il traduit tient en deux phrases et ne parle pas de dragons. Il refuse de dire à Yohan ce que c'est. Il repart, écrit un mémoire, et le brûle."],
    effets:{sang:20, xp:92, flags:["dl_015_fait","ossuaire_lu","verite_cicatrice"], reputation:{khesh:-6}}},
   {label:"Vendre l'emplacement à Port-Noir", detail:"+1200 or · l'os de dragon vaut une fortune",
    texte:["Trois compagnies remontent la côte dans l'année. Le clan gardien se bat pour un cimetière qu'il ne peut pas tenir et perd quarante hommes en deux saisons.",
           "L'os de dragon fait la fortune de Port-Noir pendant six ans. Ensuite il n'y en a plus."],
    effets:{or:1200, xp:50, flags:["dl_015_fait","cimetiere_vendu"], reputation:{khesh:-26}}},
  ]}
},

LOC_016: { peuple:'humains', dossier:"Port-Noir", affaires:[
  {id:"AL_016_1", titre:"Le manifeste qui ne correspond jamais", commanditaire:"Un courtier maritime", type:"enquête", danger:"modéré", or:280,
   pitch:"Les cargaisons débarquées ne correspondent aux manifestes sur aucun navire depuis trois mois."},
  {id:"AL_016_2", titre:"Ceux qu'on ne débarque pas", commanditaire:"Une femme du quai nord", type:"sauvetage", danger:"dangereux", or:420,
   pitch:"Des gens embarquent à Port-Noir et n'arrivent nulle part, et les familles n'obtiennent aucune réponse."},
  {id:"AL_016_3", titre:"Le capitaine que tout le monde protège", commanditaire:"Un armateur de Port-Noir", type:"traque", danger:"très dangereux", or:640,
   pitch:"Un capitaine a coulé trois navires assurés en deux ans, et le port entier fait semblant de ne pas compter."},
 ],
 denouement:{
  id:"DL_016", titre:"Ce que Port-Noir accepte de savoir", famille:"VILLE", image:"dl_016",
  intro:["Les manifestes, les disparus et les navires coulés forment le même dessin : Port-Noir vit d'un commerce qu'il refuse de nommer, et tout le monde en touche un peu.",
         "Le port a compris que Yohan a compris. On lui propose donc de participer, poliment, avant de devoir envisager autre chose."],
  choix:[
   {label:"Faire fermer la filière", detail:"Le port perdra un quart de son revenu",
    texte:["Il faut trois semaines, deux témoins qu'il faut cacher, et le livre de bord d'un capitaine.",
           "La filière ferme. Port-Noir perd un quart de son revenu et s'en remet en quatre ans. Onze personnes rentrent chez elles. Yohan ne peut plus dormir à Port-Noir sans quelqu'un à la porte."],
    effets:{sang:18, xp:88, suspicion:12, flags:["dl_016_fait","port_assaini","sabotage_port_noir"], reputation:{humains:14, parias:16}}},
   {label:"Prendre une part de la filière", detail:"+1000 or par an · et savoir ce qu'on transporte",
    texte:["Yohan prend une part. Il obtient en échange le droit de dire quels navires ne partent pas — ce qui, correctement employé, sauve plus de gens qu'une dénonciation.",
           "Il y gagne beaucoup d'argent. Il ne raconte cette histoire à personne, jamais, et surtout pas à Alycia."],
    effets:{or:1000, sang:10, xp:60, flags:["dl_016_fait","port_complice"], reputation:{humains:-6, parias:-10}}},
   {label:"Prévenir les familles et partir", detail:"Ni justice, ni complicité",
    texte:["Yohan fait le tour des familles du quai nord, une par une, et leur dit ce qu'il sait.",
           "Rien ne change au port. Mais plus personne du quai nord n'embarque à bord de ces navires-là, et cela suffit à faire tarir la filière en dix-huit mois — sans un procès et sans un mort."],
    effets:{sang:16, xp:80, flags:["dl_016_fait","port_tari"], reputation:{humains:8, parias:12}}},
  ]}
},

LOC_017: { peuple:'humains', dossier:"L'Arène Rouge", affaires:[
  {id:"AL_017_1", titre:"Les combattants qu'on ne rend pas", commanditaire:"Le régisseur de l'Arène", type:"enquête", danger:"modéré", or:300,
   pitch:"Des combattants sous contrat cessent d'apparaître aux registres de sortie sans figurer aux registres de décès."},
  {id:"AL_017_2", titre:"Les paris de la troisième maison", commanditaire:"Un teneur de livre", type:"traque", danger:"dangereux", or:440,
   pitch:"Une maison gagne trop souvent et trop précisément pour que ce soit de la chance."},
  {id:"AL_017_3", titre:"Ce qu'on fait combattre le dernier soir", commanditaire:"Le régisseur de l'Arène", type:"chasse", danger:"très dangereux", or:660,
   pitch:"Le dernier combat de la saison oppose un homme à quelque chose que la maison a acheté et n'a pas déclaré."},
 ],
 denouement:{
  id:"DL_017", titre:"À qui appartient le sable", famille:"VILLE", image:"dl_017",
  intro:["Le régisseur a maintenant tout ce qu'il lui fallait : les combattants disparus, les paris truqués, et ce qui a été acheté pour le dernier soir.",
         "« Je peux fermer trois maisons demain », dit-il. « Ou je peux fermer l'Arène. Dites-moi laquelle, parce que je n'y arrive pas. »"],
  choix:[
   {label:"Fermer les trois maisons", detail:"L'Arène continue, propre",
    texte:["Les trois maisons sont exclues. Il faut deux ans pour que les paris reprennent honnêtement, et l'Arène perd la moitié de sa recette.",
           "Elle survit. Les combattants sortent par la porte des vainqueurs ou par celle des vaincus, et dans les deux cas ils sortent."],
    effets:{sang:14, xp:78, renom:6, flags:["dl_017_fait","arene_assainie"], reputation:{humains:16}}},
   {label:"Fermer l'Arène", detail:"Deux cents personnes sans travail",
    texte:["Le régisseur ferme lui-même, un matin, sans annonce. Deux cents personnes perdent leur gagne-pain — palefreniers, cuisinières, teneurs de livres.",
           "Personne ne meurt plus sur ce sable. C'est tout ce qu'on peut mettre de l'autre côté de la balance, et c'est peut-être assez."],
    effets:{sang:16, xp:82, flags:["dl_017_fait","arene_fermee"], reputation:{humains:-8, parias:10}}},
   {label:"Reprendre l'Arène", detail:"−800 or · elle vous appartiendra",
    texte:["Yohan rachète le bail. C'est légal, c'est cher, et c'est la chose la plus étrange qu'il ait faite de sa vie.",
           "L'Arène Rouge appartient à un Paria pendant onze ans. On n'y meurt plus. On y gagne moins. Et deux fois par an, la maison paie le voyage de retour de qui veut arrêter."],
    effets:{or:-800, sang:18, xp:86, renom:10, flags:["dl_017_fait","arene_reprise"], reputation:{humains:12, parias:14}}},
  ]}
},

LOC_018: { peuple:null, dossier:"Les Champs de Cendre", affaires:[
  {id:"AL_018_1", titre:"Ce que le labour remonte", commanditaire:"Les familles installées", type:"enquête", danger:"modéré", or:260,
   pitch:"Le premier labour a remonté autre chose que des os, et les familles voudraient savoir quoi."},
  {id:"AL_018_2", titre:"La compagnie franche des hauteurs", commanditaire:"Les familles installées", type:"guerre", danger:"dangereux", or:440,
   pitch:"Une compagnie franche tient les hauteurs et fait payer l'eau à ceux qui labourent en bas."},
  {id:"AL_018_3", titre:"Le charnier qu'on veut retrouver", commanditaire:"Une délégation d'Astrah", type:"récupération", danger:"très dangereux", or:620, noble:"Lady Aveline",
   pitch:"Astrah cherche un charnier de la Purge, officiellement pour l'honorer, et n'explique pas pourquoi maintenant."},
 ],
 denouement:{
  id:"DL_018", titre:"Ce qu'on sème sur un charnier", famille:"GUERRE", image:"dl_018",
  intro:["Le charnier est retrouvé. Il contient quatre cents personnes et le registre de leur exécution, plié dans une boîte de plomb par quelqu'un qui voulait qu'on sache.",
         "Astrah veut le récupérer. Les familles installées veulent continuer de labourer. Yohan tient la boîte."],
  choix:[
   {label:"Rendre le registre à Astrah", detail:"+900 or · ils l'enterreront proprement",
    texte:["La délégation repart avec la boîte et une gratitude officielle. Le charnier est consacré, entouré d'un mur bas et d'une inscription qui ne dit ni qui ni pourquoi.",
           "Les familles labourent en paix. Le registre n'est jamais reparu."],
    effets:{or:900, xp:56, flags:["dl_018_fait","charnier_consacre"], reputation:{humains:14, parias:-16}}},
   {label:"En faire copier le registre partout", detail:"Quatre cents noms, dans onze provinces",
    texte:["Il faut quatre mois, onze copistes et beaucoup d'argent. Les quatre cents noms circulent.",
           "Trente-neuf familles retrouvent quelqu'un. Astrah nie l'authenticité pendant quarante ans, ce qui est exactement le temps qu'il faut pour que plus personne ne le lui demande."],
    effets:{or:-500, sang:22, xp:96, flags:["dl_018_fait","charnier_publie","cause_parias"], reputation:{parias:24, humains:-14}}},
   {label:"Le remettre dans la terre", detail:"Là où quelqu'un l'avait mis",
    texte:["Yohan replie la boîte de plomb et la remet exactement où elle était, avec les quatre cents.",
           "« Quelqu'un l'a mise là pour qu'on la trouve », proteste un des laboureurs. « Oui », dit Yohan. « Un jour où quelqu'un pourra en faire quelque chose. Ce n'est pas aujourd'hui. »"],
    effets:{sang:16, xp:80, flags:["dl_018_fait","charnier_rendu"], reputation:{parias:10}}},
  ]}
},

LOC_019: { peuple:null, dossier:"La Côte des Dents", affaires:[
  {id:"AL_019_1", titre:"Le feu qu'on allume au mauvais endroit", commanditaire:"Le gardien du phare", type:"enquête", danger:"dangereux", or:340,
   pitch:"Quelqu'un allume un feu sur la pointe sud les nuits sans lune, et les navires le prennent pour le phare."},
  {id:"AL_019_2", titre:"Ce que le village ne déclare pas", commanditaire:"Un inspecteur des épaves", type:"traque", danger:"dangereux", or:420,
   pitch:"Trois naufrages en un an, et pas une seule cargaison déclarée aux registres de sauvetage."},
  {id:"AL_019_3", titre:"Ce qui vient avec la grande marée", commanditaire:"Les femmes du village", type:"chasse", danger:"très dangereux", or:600,
   pitch:"À la plus grande marée de l'année, quelque chose remonte jusqu'aux maisons basses."},
 ],
 denouement:{
  id:"DL_019", titre:"Ce que la côte gagne à mentir", famille:"VOYAGE", image:"dl_019",
  intro:["Le faux feu, les cargaisons non déclarées : la moitié du village vit de naufrages provoqués. L'autre moitié le sait et se tait, parce qu'on mange.",
         "Le gardien du phare, lui, allume le vrai feu tous les soirs depuis trente et un ans, seul contre son propre village."],
  choix:[
   {label:"Dénoncer le village", detail:"Onze arrestations, et un village mort",
    texte:["L'inspecteur des épaves fait son travail. Onze hommes sont pendus à Fort-aux-Princes, et le village ne s'en relève pas : il n'y a rien d'autre à faire ici.",
           "Le gardien du phare continue d'allumer son feu tous les soirs, pour un village de quatorze habitants. Il ne remercie pas Yohan."],
    effets:{sang:12, xp:74, flags:["dl_019_fait","cote_denoncee"], reputation:{humains:14, parias:-8}}},
   {label:"Leur trouver de quoi vivre autrement", detail:"−500 or · des barques et du sel",
    texte:["Quatre barques, du sel, et un contrat de fourniture avec Port-Noir qu'il faut aller arracher soi-même.",
           "Le faux feu ne se rallume pas. Ce n'est pas de la vertu : c'est qu'il y a maintenant quelque chose de moins dangereux à faire. C'est presque toujours comme ça que ça marche."],
    effets:{or:-500, sang:20, xp:92, flags:["dl_019_fait","cote_liberee","phare_rallume"], reputation:{humains:20}}},
   {label:"Prendre une part sur les épaves", detail:"+800 or · et fermer les yeux",
    texte:["Yohan touche sa part sur trois naufrages. C'est beaucoup d'argent pour très peu de travail.",
           "Le quatrième navire porte quarante et un passagers. Il n'y a pas de survivant. Yohan apprend le chiffre par une gazette, deux mois plus tard, et le retient."],
    effets:{or:800, xp:44, suspicion:6, flags:["dl_019_fait","cote_complice"], reputation:{humains:-14, parias:-6}}},
  ]}
},

LOC_020: { peuple:'hommes_betes', dossier:"Les Pierres du Premier Rugissement", affaires:[
  {id:"AL_020_1", titre:"Ceux qui viennent gratter les pierres", commanditaire:"Une harde des Pierres", type:"traque", danger:"dangereux", or:360,
   pitch:"Des gens viennent de nuit racler les gravures des Pierres pour les revendre à des collectionneurs d'Astrah."},
  {id:"AL_020_2", titre:"La harde qui ne veut plus des Pierres", commanditaire:"Un ancien des Pierres", type:"enquête", danger:"dangereux", or:420,
   pitch:"Une jeune harde refuse de venir aux Pierres et dit que ce qu'elles rendent est faux."},
  {id:"AL_020_3", titre:"Ce que les Pierres ont cessé de dire", commanditaire:"Un ancien des Pierres", type:"enquête", danger:"extrême", or:740,
   pitch:"Depuis trois hivers, les Pierres ne rendent plus rien de ce qui s'est passé après la Purge."},
 ],
 denouement:{
  id:"DL_020", titre:"Ce qu'un sanctuaire doit se rappeler", famille:"HOMME_BETE", image:"dl_020",
  intro:["Les Pierres ne se taisent pas : elles ont été *effacées*. Quelqu'un est venu, il y a trois hivers, et a fait ce qu'il fallait pour qu'elles cessent d'enregistrer la Purge.",
         "Les anciens veulent savoir ce qu'on fait maintenant. La jeune harde, elle, veut qu'on les abatte."],
  choix:[
   {label:"Refaire enregistrer la Purge", detail:"+26 Fatigue · il faut un porteur de l'Onde",
    texte:["Il faut trois jours, un porteur de l'Onde, et raconter aux Pierres ce qui s'est passé — en entier, sans rien retirer.",
           "Yohan y laisse davantage qu'il n'avait prévu. Mais les Pierres reprennent. Ce qui est arrivé aux Parias est désormais gravé dans un sanctuaire que l'Empire ne peut ni acheter ni brûler."],
    effets:{fat:26, sang:24, xp:100, flags:["dl_020_fait","pierres_accordees","pierres_sonnees"], reputation:{hommes_betes:24, parias:18}}},
   {label:"Laisser les Pierres muettes", detail:"Une harde neuve, sans quatre siècles sur le dos",
    texte:["La jeune harde a peut-être raison : on peut recommencer quand on ne se souvient pas.",
           "Les Pierres restent muettes. Deux générations plus tard, personne dans la forêt ne saura ce qu'était la Purge, et les hardes iront mieux. Yohan ne se pardonnera jamais tout à fait cette décision."],
    effets:{sang:14, xp:78, flags:["dl_020_fait","pierres_muettes"], reputation:{hommes_betes:12}}},
   {label:"Trouver qui les a effacées", detail:"Trois hivers · la piste est froide et elle mène loin",
    texte:["La piste est froide et elle mène exactement là où Yohan craignait qu'elle mène : à quelqu'un qui savait que les Pierres enregistrent, et qui tenait à ce qu'elles n'enregistrent pas les Parias.",
           "Sur le montant du dernier relais où l'on a vu le passeur, il y a trois lettres marquées au fer."],
    effets:{sang:22, xp:96, flags:["dl_020_fait","lfa_connu","pierres_effacees"], reputation:{hommes_betes:16}}},
  ]}
},

};
