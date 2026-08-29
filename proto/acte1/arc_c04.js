/* PARIAS — Acte I · C04 · LES TROIS FRÈRES ROUGES
 * ═══════════════════════════════════════════════════════════════════════
 * Le verbe de cet arc est NÉGOCIER.
 *
 * Il se franchit entièrement sans tirer l'épée. C'est le seul du jeu dont
 * ce soit vrai, et c'est le but : prouver que la machine n'est pas un
 * moteur de combat déguisé en histoire.
 *
 * Le commanditaire ne ment sur rien. Il dit tout, calmement, et c'est pire :
 * il paie le triple pour qu'ils arrivent vivants parce qu'un mort ne signe
 * pas, et il n'a jamais eu l'intention de le cacher à quiconque saurait
 * lire un contrat.
 * ═══════════════════════════════════════════════════════════════════════ */

const ARC_C04 = {

va_audience:{
  lieu:"Marais de Sombreval · Vauclair · le cabinet",
  titre:"Le triple",
  qui:'aymar',
  texte:[
    "Vauclair est une maison neuve. Ça se voit à tout : les fenêtres sont grandes, le sol est carrelé au lieu d'être dallé, et il y a dans le cabinet du sire une table à écrire au lieu d'un râtelier d'armes.",
    "Aymar de Vauclair a trente-quatre ans, il a hérité il y a six ans, et il a triplé le revenu de sa maison en six ans avec de la tourbe.",
    "« Estève, Colin, Bertran. Trois frères. On les appelle les Rouges parce que leur mère était rousse, ce qui est la seule chose romanesque de toute cette affaire. »",
    "« Ce qu'on leur reproche ? »",
    "« Vol de bois, vol de tourbe, rébellion à sergent, et le fait de vivre dans un marais qui m'appartient. »",
    { sobre:"« Deux cents couronnes. Six cents s'ils arrivent vivants. »",
      intense:"« Deux cents couronnes s'ils arrivent. Six cents s'ils arrivent vivants — tous les trois, respirant, capables de tenir debout. Je vous le dis d'emblée parce que c'est un chiffre étrange et que vous alliez me le demander. »",
      extreme:"« Deux cents couronnes s'ils arrivent. Six cents s'ils arrivent vivants — tous les trois, respirant, capables de tenir debout et de tenir une plume. Je vous le dis tout de suite parce que c'est un chiffre étrange, que vous alliez me le demander, et que j'ai horreur des conversations où l'on tourne autour. »" },
    "§ *Capables de tenir une plume.* Il vient de le dire. Il n'a pas hésité, il ne s'est pas repris, et il vous regarde pour vérifier que vous l'avez entendu.",
    "« Vous voulez une signature. »",
    "« Je veux une déposition. » Il ouvre un tiroir et pose une feuille sur la table, face à vous, sans la pousser. « Elle est rédigée. Il ne manque que trois noms au bas. »",
    "« Et le contenu ? »",
    "« Lisez. Je ne cache rien : c'est le seul luxe que je m'autorise. »",
  ],
  choix:[
    { t:"Lire la déposition",
      si:() => !a('va_lu'),
      detail:"Elle est rédigée · il ne manque que trois noms · Intellect + tactique contre 9",
      risque:"favorable",
      test:{ carac:'intellect', comp:'tactique', dc:9, manoeuvre:'lire' },
      degres:{ dominante:'va_lu_dom', nette:'va_lu_ok', echec:'va_lu_ko' } },
    { t:"Demander à qui appartient le marais",
      si:() => !a('va_marais_q'),
      detail:"Une concession de tourbe se lit dans un registre, pas dans une bouche",
      va:'va_concession' },
    { t:"Trouver Dame Iselle de Vauclair",
      si:() => !a('va_iselle'),
      detail:"Sa belle-sœur administre les concessions · c'est elle qui tient les chiffres",
      va:'va_iselle' },
    { t:"Fixer les termes",
      si:() => !a('va_termes_fait'),
      detail:"Or · noble adulte consentante · les deux · négocier · refuser",
      va:'va_termes' },
    { t:"Entrer dans le marais",
      detail:"Onze mille arpents de tourbe, d'eau noire et de saules · et personne pour vous guider",
      va:'va_marais' },
  ],
},

va_lu_dom:{
  qui:'aymar',
  texte:[
    "C'est une déposition de trois pages, écrite par un clerc, dans la langue des clercs.",
    "Les deux premières pages disent ce qu'on attend : vol de bois, vol de tourbe, rébellion, dates, lieux. C'est vrai, probablement, et ça vaut la corde dans n'importe quelle province.",
    "La troisième page ne parle plus des trois frères.",
    { sobre:"§ Elle parle de quatre-vingts personnes qui vivent dans le marais.",
      intense:"§ Elle parle de quatre-vingts personnes qui vivent dans le marais, et elle les qualifie. Un seul mot, deux fois, à la ligne onze et à la ligne dix-neuf : *bande*.",
      extreme:"§ Elle parle de quatre-vingts personnes qui vivent dans le marais, et elle les qualifie. Un mot, deux fois, à la ligne onze et à la ligne dix-neuf : *bande*. Pas *communauté*, pas *tenanciers*, pas *fugitifs* — **bande**." },
    "« Vous savez ce que veut dire *bande* dans un acte, messire ? »",
    "« Non. »",
    "« Ça veut dire qu'on n'a pas à les juger un par un. » Il le dit sans satisfaction, du ton d'un homme qui explique un point de droit. « Une bande se disperse par ordonnance de police. Une bande n'a pas de tenanciers, donc pas de titres, donc pas d'appel. Il faut simplement qu'un membre de la bande le reconnaisse par écrit. »",
    "« Et trois frères qu'on va pendre reconnaissent volontiers n'importe quoi. »",
    "« Non. Trois frères qu'on va pendre ne reconnaissent rien du tout — c'est même le seul pouvoir qui leur reste et ils le savent. » Il se rassied. « Trois frères à qui l'on propose de ne pas pendre le cadet reconnaissent tout ce qu'on veut. Bertran a dix-neuf ans et il est le seul des trois à savoir écrire. »",
    "§ Six cents couronnes. Il ne les paie pas pour trois hommes vivants : il les paie pour un garçon de dix-neuf ans dont les deux frères aînés tiennent à la vie.",
  ],
  effets:{ flags:['va_lu','va_sait_bande','va_sait_bertran','va_sait_quatre_vingts'],
           exploit:{ eclat:4, temoins:'un', quoi:"vous avez lu jusqu'à la troisième page" },
           marque:"La déposition qualifie quatre-vingts personnes de « bande ». Bertran, dix-neuf ans, est le seul qui sache écrire.",
           court:"Le mot bande" },
  suite:'va_audience', libelleSuite:"Revenir" },

va_lu_ok:{
  qui:'aymar',
  texte:[
    "Trois pages de clerc. Vol de bois, vol de tourbe, rébellion à sergent, dates, lieux, témoins. C'est complet et c'est probablement exact.",
    "La troisième page parle des gens du marais et elle en parle longuement, dans une langue qui vous échappe : *sans titre ni tenure*, *attroupement continu*, *à l'exclusion de tout droit d'usage*.",
    "§ Vous ne savez pas ce que ces mots font. Vous savez juste qu'ils font quelque chose, et qu'ils occupent une page entière sur trois.",
    "« Ce sont des formules », dit Aymar de Vauclair.",
    "« Tout est une formule, dans ce papier. »",
    "« Oui », dit-il, et il sourit pour la première fois. « C'est exactement ce qu'un acte est censé être, messire, et c'est pour ça que ça marche. »",
  ],
  effets:{ flags:['va_lu','va_soupcon_page3'],
           marque:"La troisième page de la déposition parle des gens du marais, en langue de clerc.",
           court:"La troisième page" },
  suite:'va_audience', libelleSuite:"Revenir" },

va_lu_ko:{
  texte:[
    "Trois pages. Vous les lisez et vous comprenez la première.",
    "§ Un homme d'armes qui lit un acte de clerc est un homme d'armes qui regarde du papier, et c'est très exactement la raison pour laquelle il y a des clercs.",
    "« Ça a l'air en ordre. »",
    "« Ça l'est », dit Aymar de Vauclair.",
    "Et c'est vrai. C'est parfaitement en ordre, et c'est le problème.",
  ],
  effets:{ flags:['va_lu'], cout:{ moral:2 } },
  suite:'va_audience', libelleSuite:"Revenir" },

va_concession:{
  texte:[
    "Une concession de tourbe se lit au greffe du bailliage, qui est à une demi-journée, et qui ouvre le matin.",
    "Le greffier n'a aucune raison de vous cacher quoi que ce soit : une concession est un acte public, c'est même toute son utilité.",
    { sobre:"Vauclair a la concession depuis six ans. Elle porte sur onze mille arpents.",
      intense:"Aymar de Vauclair a obtenu la concession d'exploitation il y a six ans, l'année de son héritage, sur onze mille arpents de marais. C'est en ordre, c'est enregistré, c'est payé.",
      extreme:"Aymar de Vauclair a obtenu la concession d'exploitation six ans plus tôt, l'année de son héritage, sur onze mille arpents. C'est en ordre, enregistré, payé, contresigné. Il n'y a pas la moindre irrégularité et le greffier le dit avec une pointe de fierté professionnelle, comme on parle d'un dossier bien tenu." },
    "« Et les gens qui habitent dedans ? »",
    "« Une concession d'exploitation ne porte pas sur les habitants, messire. Elle porte sur la tourbe. »",
    "« Donc ils peuvent rester. »",
    "Le greffier réfléchit sérieusement, parce que c'est un homme sérieux.",
    "§ « Ils peuvent rester tant qu'ils sont quelqu'un. Le jour où un acte dit qu'ils ne sont personne, ils ne peuvent plus rester, et il n'y aura pas eu de procès. »",
    "« Comment un acte dit-il que des gens ne sont personne ? »",
    "« En les appelant autrement. »",
  ],
  effets:{ flags:['va_marais_q','va_sait_concession','va_sait_bande'],
           exploit:{ eclat:3, temoins:'un', quoi:"vous êtes allé lire une concession au greffe" },
           marque:"La concession porte sur la tourbe, pas sur les habitants. Il suffit de les appeler autrement.",
           court:"La concession" },
  suite:'va_audience', libelleSuite:"Revenir" },

va_iselle:{
  qui:'iselle',
  titre:"Celle qui tient les chiffres",
  texte:[
    "Elle administre les concessions de tourbe depuis quatre ans, depuis la mort de son mari, et elle le fait bien : Vauclair a triplé son revenu en six ans et deux tiers de ce triplement sortent de ses colonnes à elle.",
    "Iselle de Vauclair a vingt-neuf ans et le tour de main de quelqu'un qui a compris très tôt qu'être indispensable est la seule protection disponible.",
    "« Vous voulez savoir si mon beau-frère est un monstre. »",
    "« Je veux savoir combien vaut le marais. »",
    { sobre:"« Ah. Bien. »",
      intense:"« Ah. » Elle repose sa plume. « Bien. C'est la première fois qu'on me pose la bonne question, et je travaille ici depuis quatre ans. »",
      extreme:"« Ah. » Elle repose sa plume et elle vous regarde vraiment pour la première fois. « Bien. C'est la première fois qu'on me pose la bonne question dans cette maison, et j'y travaille depuis quatre ans. Les gens demandent toujours si Aymar est un monstre. La réponse est non, et elle ne sert à rien. »" },
    "« La tourbe se vend au chariot. Onze mille arpents à la profondeur moyenne du marais font environ quatre-vingt mille chariots. »",
    "« Et avec quatre-vingts personnes dedans ? »",
    "« Vingt-deux mille. On ne creuse pas là où les gens habitent : leurs huttes sont sur les buttes, et les buttes sont exactement les endroits où la tourbe est la plus épaisse, parce que c'est la tourbe épaisse qui fait les buttes. »",
    "§ Cinquante-huit mille chariots. C'est le prix de quatre-vingts personnes, et il est calculable, et quelqu'un l'a calculé.",
    "« Vous avez fait ce calcul. »",
    "« Je le fais tous les trimestres depuis quatre ans, messire. C'est mon travail. »",
    "Elle reprend sa plume.",
    "« Ce que je ne fais pas, c'est écrire la troisième page. »",
  ],
  effets:{ flags:['va_iselle','va_sait_chiffre','va_sait_bande'], cout:{ moral:4 },
           exploit:{ eclat:4, temoins:'un', quoi:"quelqu'un vous a donné le prix exact de quatre-vingts personnes" },
           marque:"Cinquante-huit mille chariots de tourbe. C'est ce que valent les quatre-vingts du marais.",
           court:"Cinquante-huit mille" },
  suite:'va_audience', libelleSuite:"Revenir" },

va_termes:{
  qui:'iselle',
  titre:"Ce que Vauclair doit",
  texte:[
    "Aymar de Vauclair a écrit les cinq mots dans sa lettre, et quand vous demandez à en fixer les termes il fait exactement ce qu'un homme de son espèce fait : il vous renvoie à quelqu'un.",
    "« Ma belle-sœur est majeure, veuve, et elle ne relève pas de moi. Adressez-vous à elle. Je ne serai ni informé de sa réponse ni fâché de l'une ou de l'autre. »",
    "§ C'est irréprochable. Tout est irréprochable chez cet homme et c'est ce qui rend le marais si difficile à regarder.",
    "Iselle de Vauclair vous écoute jusqu'au bout, sans vous interrompre, et elle pose une seule question.",
    "« Vous allez les ramener vivants ? »",
    "« Je ne sais pas encore. »",
    "« C'est la bonne réponse. Si vous m'aviez dit oui, j'aurais refusé, et si vous m'aviez dit non, j'aurais refusé aussi. »",
    { sobre:"Elle réfléchit un moment.",
      intense:"Elle réfléchit un moment, sans gêne, comme on examine une proposition d'affaires — ce qui est, quand on y pense, exactement ce que la coutume est, et personne dans aucune maison n'accepte jamais de le formuler ainsi.",
      extreme:"Elle réfléchit un moment, sans gêne, comme on examine une proposition d'affaires — ce que la coutume est très exactement, et que personne dans aucune maison n'accepte jamais de formuler ainsi. Elle a vingt-neuf ans, elle tient les comptes d'un homme qui va disperser quatre-vingts personnes, et elle a depuis longtemps cessé de se raconter des choses." },
    "« Oui. À une condition qui ne vous concerne pas et que je vais quand même vous dire, parce que vous la découvririez. »",
    "« Dites. »",
    "« Je pars de cette maison en Messidor. J'ai quatre ans de colonnes dans une malle et il me faut un endroit où aller. Ce n'est pas vous qui me le donnez, et vous ne me devez rien — mais si Aymar apprenait que j'ai dit oui à un Paria, il aurait un motif de me faire partir plus vite, et j'ai besoin qu'il en ait un. »",
    "« Vous vous servez de moi. »",
    "« Oui. Vous vouliez que je vous demande la permission ? »",
  ],
  choix:[
    { t:"Accepter les termes",
      detail:"L'or et la coutume · elle sait exactement pourquoi elle dit oui",
      definitif:true, va:'va_accord' },
    { t:"L'or seul",
      detail:"Deux cents couronnes, ou six cents · et rien d'autre n'est demandé",
      ferme:"Ferme : ce que la coutume ouvrait ici",
      definitif:true, va:'va_or_seul' },
  ],
},

va_accord:{
  qui:'iselle',
  texte:[
    "« C'est dit. »",
    "« C'est dit. » Elle referme son registre. « Après. Et pas dans cette maison : à l'auberge du bourg, où tout le monde nous verra, parce que c'est tout l'intérêt. »",
    "§ Elle organise sa propre disgrâce avec la même application qu'une colonne de chiffres, et elle est la seule personne de cette province à avoir un plan.",
    "« Une dernière chose, messire. Quand vous serez dans le marais. »",
    "« Oui ? »",
    "« Estève parle. C'est lui l'aîné et c'est lui qui parlera. Ne l'écoutez pas trop : il ment très bien et il a de bonnes raisons. »",
    "« Et lequel écouter ? »",
    "« Le petit. Il a dix-neuf ans et il n'a pas encore appris. »",
  ],
  effets:{ flags:['va_termes_fait','va_coutume','va_iselle_accord','va_sait_bertran'],
           marque:"Iselle de Vauclair a fixé les termes, pour organiser son propre départ.",
           court:"Les termes" },
  suite:'va_audience', libelleSuite:"Revenir" },

va_or_seul:{
  qui:'iselle',
  texte:[
    "« L'or seul. »",
    "« Bien. » Elle rouvre son registre, et il faut trois secondes pour voir que c'est un geste de contenance. « Vous m'obligez à trouver autre chose, ce qui est ennuyeux mais faisable. »",
    "§ Elle n'est ni blessée ni soulagée. Elle recalcule, c'est tout, et c'est ce qu'elle fait de mieux.",
    "« Je vous dois quand même un renseignement, puisque vous n'avez rien pris. Estève parle, et il ment très bien. Écoutez le petit : il a dix-neuf ans et il n'a pas encore appris. »",
  ],
  effets:{ flags:['va_termes_fait','va_or_seul','va_sait_bertran'], suspicion:2,
           marque:"Vous n'avez pas réclamé la coutume à Vauclair.", court:"L'or seul" },
  suite:'va_audience', libelleSuite:"Revenir" },

};

/* ══ LE MARAIS ════════════════════════════════════════════════════════════ */
const ARC_C04_2 = {

va_marais:{
  lieu:"Marais de Sombreval · onze mille arpents",
  titre:"Onze mille arpents",
  texte:[
    "Un marais de tourbe n'est pas de l'eau : c'est du sol qui n'a pas fini de se décider. On y marche, jusqu'au moment où l'on n'y marche plus, et il n'y a aucun moyen de savoir à l'avance lequel des deux on est en train de faire.",
    { sobre:"Des saules, de l'eau noire, et des buttes.",
      intense:"Des saules têtards par milliers, de l'eau noire immobile qui rend le ciel à l'envers, et des buttes — des dômes de tourbe de trente pieds de large et six pieds de haut, régulièrement espacés, dont on met une demi-journée à comprendre qu'ils ne sont pas naturels.",
      extreme:"Des saules têtards par milliers, de l'eau noire immobile qui rend le ciel à l'envers, et des buttes : des dômes de tourbe de trente pieds de large et six de haut, régulièrement espacés, qu'on met une demi-journée à cesser de croire naturels. L'air sent le fer et l'œuf. Ce qui remonte quand on enfonce un bâton n'est pas de la boue : c'est de la matière végétale qui a mis huit mille ans à ne pas pourrir." },
    "§ Quatre-vingts personnes vivent là-dedans et il n'y a pas un chemin.",
    "C'est le contraire d'une forteresse et ça protège mieux : on ne prend pas d'assaut un endroit où l'on ne peut pas marcher à trois de front.",
  ],
  choix:[
    { t:"Entrer à découvert et attendre qu'on vienne",
      detail:"S'asseoir sur une butte, allumer un feu, et laisser faire le temps",
      risque:"prudent", va:'va_nonne' },
    { t:"Entrer seul, de nuit, en cherchant les passes",
      detail:"Un marais a des passes · elles sont marquées pour ceux qui savent · Perception + furtivité contre 11",
      risque:"dangereux",
      test:{ carac:'perception', comp:'furtivite', dc:11, manoeuvre:'passes' },
      degres:{ dominante:'va_passes_dom', couteuse:'va_passes_cout', echec:'va_passes_ko' } },
    { t:"Payer un guide au bourg",
      detail:"Quarante couronnes · et le bourg saura exactement où vous êtes allé",
      requisOr:40, va:'va_guide' },
  ],
},

va_passes_dom:{
  texte:[
    "Un marais habité a des passes. Il en a forcément : quatre-vingts personnes ne vivent pas dans onze mille arpents sans aller chercher du bois, du sel et des nouvelles.",
    { sobre:"Elles sont marquées. Il faut savoir à quoi ressemble une marque.",
      intense:"Elles sont marquées, et les marques sont si simples qu'on met deux heures à les voir : un saule têtard sur deux, du côté de la passe, a été étêté un an plus tard que les autres. La repousse est plus courte. À dix pas ça ne se voit pas. À trois pas c'est une route.",
      extreme:"Elles sont marquées, et si simplement qu'on met deux heures à les voir : un saule têtard sur deux, du côté de la passe, a été étêté un an après les autres. La repousse est plus courte d'une saison. À dix pas ça ne se voit pas. À trois pas, dans le noir, en passant la main sur les têtes, c'est une route qu'on peut suivre à l'aveugle — et c'est très exactement ce que ça a été conçu pour être." },
    "§ Personne n'a inventé ça en une génération. Ces marques ont trente ans, au moins.",
    "Vous arrivez au village central en quatre heures, de nuit, sans mouiller autre chose que les bottes, et vous vous asseyez devant le feu commun avant que quiconque vous ait vu venir.",
    "Ce qui est, dans un marais, la chose la plus impressionnante qu'un étranger puisse faire.",
  ],
  effets:{ flags:['va_passes','va_respect'], cout:{ endurance:14 },
           exploit:{ eclat:4, temoins:'quelques', quoi:"vous avez lu les passes d'un marais habité" },
           marque:"Les passes de Sombreval sont marquées sur les saules depuis trente ans.", court:"Les passes" },
  suite:'va_nonne', libelleSuite:"Le feu commun" },

va_passes_cout:{
  texte:[
    "Vous trouvez la passe. Vous en sortez à un endroit et il n'y a pas de deuxième chance.",
    { sobre:"On ne se noie pas dans la tourbe. On s'y enfonce, ce qui est plus lent.",
      intense:"On ne se noie pas dans un marais de tourbe : on s'y enfonce, ce qui est différent et beaucoup plus lent. La tourbe tient les jambes comme une glaise tiède, elle ne lâche rien, et chaque mouvement pour en sortir descend de deux pouces. Vous mettez une heure et demie à faire six pieds.",
      extreme:"On ne se noie pas dans la tourbe : on s'y enfonce, ce qui est plus lent et bien plus intime. Elle tient les jambes comme une glaise tiède, ne lâche rien, et chaque mouvement pour s'en extraire fait descendre de deux pouces. Vous mettez une heure et demie à faire six pieds, à plat ventre sur des branches de saule cassées, avec la certitude froide et parfaitement raisonnable qu'il n'y a personne à trois lieues." },
    "§ Vous en sortez. Vous en sortez sans une botte, avec un genou qui a tourné et huit heures de perdues.",
    "Au matin, il y a quatre personnes assises à vingt pas de vous, sur une butte, qui vous regardent depuis un moment.",
    "« On vous a entendu toute la nuit », dit une femme très vieille. « On a hésité. »",
  ],
  effets:{ flags:['va_passes'], cout:{ endurance:26, vitalite:8 },
           blessure:{ id:'genou_va', zone:"Genou gauche", type:"tourné dans la tourbe",
                      gravite:2, douleur:2, saignement:0, fonction:['agilite','endurance','furtivite'],
                      cicatrice:"un genou qui grince en descendant" },
           marque:"Vous avez passé une nuit et demie dans la tourbe. Ils ont hésité à venir.",
           court:"La tourbe" },
  suite:'va_nonne', libelleSuite:"Se relever" },

va_passes_ko:{
  texte:[
    "Vous entrez de nuit dans onze mille arpents que vous ne connaissez pas, et vous ressortez au même endroit vingt-deux heures plus tard.",
    "§ Pas à un autre endroit. Au même. On appelle ça tourner et c'est ce que fait tout le monde.",
    "Un marais n'a pas de repères : les saules se ressemblent tous, les buttes se ressemblent toutes, et le soleil ne se voit pas sous un ciel de Sombreval en cette saison. On marche en cercle de quatre cents pas pendant une nuit entière avec la conviction absolue d'aller tout droit.",
    "Vous rentrez au bourg, trempé, avec vingt-deux heures de moins et l'humilité qui va avec.",
  ],
  effets:{ cout:{ endurance:22, moral:8 },
           marque:"Vous avez tourné vingt-deux heures dans le marais de Sombreval.", court:"Tourné" },
  suite:'va_marais', libelleSuite:"Autrement" },

va_guide:{
  texte:[
    "Le guide s'appelle Perrot, il a soixante ans, il coupe du saule pour les vanniers, et il connaît les passes parce que tout le bourg les connaît.",
    "« Tout le bourg les connaît ? »",
    "« Tout le bourg y a de la famille, messire. C'est la même famille. »",
    { sobre:"C'est le renseignement le plus important de l'affaire et il tombe en quatre mots.",
      intense:"C'est le renseignement le plus important de toute l'affaire et il tombe en quatre mots, sur un chemin, à un étranger qui a payé quarante couronnes. Les quatre-vingts du marais et les six cents du bourg ne sont pas deux populations : c'est une seule, coupée en deux il y a trente ans par quelque chose, et les deux moitiés se marient encore entre elles.",
      extreme:"C'est le renseignement le plus important de l'affaire et il tombe en quatre mots, sur un chemin de halage, à un étranger qui a payé quarante couronnes. Les quatre-vingts du marais et les six cents du bourg ne sont pas deux populations : c'est une seule, coupée en deux il y a trente ans, et les deux moitiés se marient encore entre elles. Ce que Vauclair veut disperser n'est pas une bande de fugitifs. C'est la moitié de son propre bourg." },
    "§ Quarante couronnes. C'est bon marché.",
    "Il vous mène au village central en trois heures, il refuse d'entrer, et il vous attend au bord.",
    "« Je vous ai amené. Je ne vous ai pas donné. »",
  ],
  effets:{ or:-40, flags:['va_guide','va_sait_famille','va_bourg_sait'],
           exploit:{ eclat:2, temoins:'quelques', quoi:"le bourg sait que vous êtes entré dans le marais" },
           marque:"Le marais et le bourg sont la même famille, coupée en deux il y a trente ans.",
           court:"La même famille" },
  suite:'va_nonne', libelleSuite:"Entrer" },

va_nonne:{
  qui:'nonne',
  titre:"Trente ans",
  texte:[
    "On l'appelle la Nonne parce qu'elle a été novice à seize ans, pendant onze mois, dans un couvent qui a brûlé — et parce que dans un marais un surnom suffit pour toute une vie.",
    "Elle a soixante-douze ans, elle est aveugle d'un œil, et elle tient Sombreval depuis trente ans au sens où l'on tient une chose : en s'en occupant tous les jours.",
    "« Vous venez pour les garçons. »",
    "« Oui. »",
    "« Ils sont là. Ils ne se cachent pas — on ne se cache pas chez soi. »",
    { sobre:"Le village est sur douze buttes. Quatre-vingts personnes.",
      intense:"Le village est sur douze buttes reliées par des passerelles de saule tressé. Des huttes de tourbe et de roseau, un four commun, des séchoirs à tourbe, des enfants. Beaucoup d'enfants — c'est ce qui frappe : dans un repaire de brigands il n'y a pas vingt-six enfants.",
      extreme:"Le village est sur douze buttes reliées par des passerelles de saule tressé : huttes de tourbe et de roseau, four commun, séchoirs, claies à anguilles. Et vingt-six enfants, ce qui est le chiffre qui frappe — un repaire de brigands n'a pas vingt-six enfants, ni deux femmes enceintes, ni une vieille qui apprend à trois gamines à tresser du saule sur le pas d'une porte." },
    "« Vauclair vous a dit *bande*. »",
    "« Il l'a écrit. »",
    "« Il l'écrit depuis quatre ans, messire, dans des lettres au bailli, et le bailli répond qu'il faut une reconnaissance. » Elle tourne son œil valide vers vous. « Vous savez ce que c'est, une reconnaissance ? »",
    "« Une signature. »",
    "« Une signature d'un des nôtres. Et ça fait trente ans qu'il n'y a rien à signer, parce qu'on ne sait pas écrire. »",
    "§ « Sauf le petit. On lui a appris. On a eu tort et on ne pouvait pas savoir. »",
  ],
  effets:{ flags:['va_nonne','va_sait_bande','va_sait_bertran','va_vu_village'], cout:{ moral:4 },
           marque:"Quatre-vingts personnes, vingt-six enfants, et un seul qui sache écrire.",
           court:"Le village" },
  suite:'va_freres', libelleSuite:"Les trois" },

};
Object.assign(ARC_C04, ARC_C04_2);

/* ══ LES TROIS ════════════════════════════════════════════════════════════ */
const ARC_C04_3 = {

va_freres:{
  qui:'esteve',
  titre:"Ce qu'on ne signe pas",
  texte:[
    "Ils sont assis tous les trois sur la même butte, devant le four commun, et ils vous attendaient — pas ce jour-là, pas vous en particulier : depuis quatre ans, quelqu'un.",
    "Estève a trente-quatre ans et c'est lui qui parle. Colin en a vingt-huit, il ne dit rien de toute la conversation, et il a une hache de bûcheron posée à plat contre sa jambe qu'il ne touche pas une seule fois.",
    "Bertran a dix-neuf ans. Il tient un morceau de charbon et une planche, et il écrivait quand vous êtes arrivé.",
    "« Six cents couronnes si on arrive vivants », dit Estève. « Deux cents si on arrive. »",
    "« Vous savez le tarif. »",
    "« On sait le tarif depuis quatre ans, messire. Vous êtes le cinquième. »",
    { sobre:"« Les quatre autres ? »",
      intense:"« Les quatre autres ? »\n\n« Deux sont repartis. Un est resté — il vit sur la butte de l'est, il a épousé une fille d'ici, il coupe du saule. » Estève sourit. « Et un a essayé, et il est dans la tourbe, et je ne vous dirai pas où parce que ça ne sert à rien. »",
      extreme:"« Les quatre autres ? »\n\n« Deux sont repartis, et l'un des deux a rendu l'acompte, ce qui est rare. Un est resté : il vit sur la butte de l'est, il a épousé une fille d'ici, il coupe du saule et il a deux enfants. » Estève sourit. « Et un a essayé. Il est dans la tourbe. Je ne vous dirai pas où — non pas pour vous cacher quelque chose, mais parce que la tourbe garde les corps entiers pendant huit mille ans, et qu'un jour quelqu'un le trouvera, et qu'il vaut mieux que ce soit quelqu'un qui ne connaisse aucun de nos noms. »" },
    "« Le contrat dit vivants. »",
    "« Le contrat dit vivants parce qu'un mort ne signe pas. Ça, on l'a compris la deuxième année. »",
    "§ « Alors voilà où on en est, messire, et c'est simple : nous, on peut mourir. Ce qu'on ne peut pas, c'est signer. »",
    "Bertran lève la tête de sa planche pour la première fois.",
    "« C'est moi qui signerais », dit-il. « C'est pour ça qu'on paie le triple. Je le sais. »",
    "« Tais-toi », dit Estève, sans dureté.",
    "« Non. Il faut qu'il le sache : si vous nous emmenez tous les trois, ils me mettront devant une table et ils diront à mes frères ce qu'ils leur diront, et je signerai. Pas parce que je suis lâche. Parce que j'ai dix-neuf ans et que je ne peux pas les regarder pendre. »",
  ],
  effets:{ flags:['va_freres','va_sait_bertran','va_sait_signature'], cout:{ moral:6 },
           exploit:{ eclat:3, temoins:'quelques', quoi:"les trois frères vous ont expliqué leur propre prix" },
           marque:"Bertran sait qu'il signera. C'est pour ça que Vauclair paie le triple.",
           court:"Il signera" },
  suite:'va_choix', libelleSuite:"Décider" },

va_choix:{
  titre:"Ce qu'on peut faire d'un acte",
  texte:[
    "Il y a une chose que ni Vauclair, ni la Nonne, ni les trois frères ne peuvent faire, et vous êtes le seul de cette province à pouvoir la faire : vous n'êtes tenu à rien.",
    "§ Un homme qui n'est tenu à rien peut aller au greffe.",
    () => a('va_sait_concession') || a('va_iselle')
      ? "Une concession porte sur la tourbe, pas sur les habitants. Un acte qui appelle des gens *bande* les fait disperser sans procès. Et un acte qui les appelle **tenanciers** ne le fait pas — mais il faut une possession, une durée, et quelqu'un de qualité pour l'attester."
      : "Vous ne savez pas comment marche un acte. C'est la moitié du problème et personne dans ce marais ne peut vous l'apprendre.",
  ],
  choix:[
    { t:"Aller au greffe du bailliage avant Vauclair",
      si:() => a('va_sait_bande') && (a('va_sait_concession') || a('va_iselle')),
      detail:"Faire enregistrer quatre-vingts tenanciers avant qu'un acte les appelle autrement · Intellect + Présence contre 12",
      risque:"calculé", definitif:true,
      test:{ carac:'intellect', comp:'tactique', dc:12, manoeuvre:'greffe',
             situation:() => (a('va_iselle') ? 3 : 0) + (a('va_sait_famille') ? 2 : 0) +
                             (a('va_nonne') ? 2 : 0) + (a('va_sait_chiffre') ? 1 : 0) },
      degres:{ dominante:'va_greffe_dom', couteuse:'va_greffe_cout', echec:'va_greffe_ko' } },

    { t:"Les ramener tous les trois",
      detail:"Six cents couronnes · Bertran signera · quatre-vingts personnes seront dispersées",
      ferme:"Ferme : toute version de cette affaire où le marais existe encore dans un an",
      risque:"définitif", definitif:true, va:'va_fin_trois' },

    { t:"N'en ramener que deux",
      si:() => a('va_sait_bertran'),
      detail:"Deux cents couronnes · Estève et Colin pendent · et personne ne signe",
      ferme:"Ferme : les quatre cents couronnes de la différence",
      risque:"définitif", definitif:true, va:'va_deux' },

    { t:"Repartir et rendre l'acompte",
      detail:"Comme deux des quatre avant vous · le cinquième s'en va",
      ferme:"Ferme : Vauclair, et ce qu'on dira de vous à Sombreval",
      risque:"définitif", definitif:true, va:'va_fin_parti' },
  ],
},

va_greffe_dom:{
  qui:'nonne',
  lieu:"Greffe du bailliage · une demi-journée de Sombreval",
  titre:"Trente ans, un four et vingt-six enfants",
  texte:[
    "Il ne faut pas une épée. Il faut trois choses, et le greffier vous les a dites lui-même sans savoir ce qu'il faisait : une possession, une durée, et quelqu'un de qualité pour l'attester.",
    "**La possession.** La Nonne fait une demi-journée de marche à soixante-douze ans, avec un œil, pour aller s'asseoir devant un greffier de bailliage et décrire douze buttes, un four commun, des séchoirs à tourbe et vingt-six enfants.",
    "**La durée.** Trente ans. Elle les prouve d'une façon qu'aucun clerc n'avait prévue : le registre des baptêmes du bourg, où quatre-vingts naissances de Sombreval ont été portées en trente ans par des curés successifs qui ne se sont jamais demandé où ces gens habitaient.",
    { sobre:"§ On les a baptisés pendant trente ans. On ne baptise pas une bande.",
      intense:"§ On les a baptisés pendant trente ans, mariés, enterrés. Portés au registre, un par un, par l'Église. On ne baptise pas une bande : on baptise des gens, et un registre paroissial est un acte public que le bailliage est tenu de recevoir.",
      extreme:"§ On les a baptisés pendant trente ans. Mariés. Enterrés. Portés au registre un par un par quatre curés successifs qui n'ont jamais posé la question. On ne baptise pas une bande : on baptise des gens. Et un registre paroissial est un acte public que le bailliage est tenu de recevoir, sans discussion, sans appréciation, parce que c'est écrit — et tout ce dont Aymar de Vauclair s'est servi pendant quatre ans se retourne d'un coup, dans le même sens, avec la même force." },
    () => a('va_iselle')
      ? "**La qualité.** Iselle de Vauclair signe l'attestation. Elle administre les concessions de tourbe depuis quatre ans, elle est veuve d'un Vauclair, et elle atteste par écrit que la concession porte sur la tourbe et non sur les habitants.\n\nElle le fait dans le greffe, à la plume, devant témoin, en écriture de comptable — et elle demande qu'on lui lise l'acte à voix haute avant de signer, ce que personne ne fait jamais."
      : "**La qualité.** Il faut quelqu'un. Il n'y a que vous, et vous n'êtes personne — alors vous produisez l'acte de concession lui-même, qui porte sur la tourbe et non sur les habitants, et qui est signé d'Aymar de Vauclair.\n\nUn homme peut témoigner contre lui-même sans le savoir, à condition qu'il ait écrit quelque chose six ans plus tôt.",
    "Le greffier enregistre. Ça prend deux heures, quatre feuilles et une taxe de onze couronnes que vous payez.",
    "§ Quatre-vingts tenanciers de Sombreval, portés au rôle du bailliage, avec date et cote.",
    "Trois jours plus tard, un clerc de Vauclair se présente au même guichet avec une déposition de trois pages où il manque trois noms au bas.",
    "Le greffier lui répond qu'il n'y a pas de bande à cette adresse.",
  ],
  effets:{ or:-11, flags:['va_greffe','va_tenanciers','va_marais_sauve'],
           exploit:{ eclat:9, temoins:'quelques', quoi:"vous avez fait inscrire quatre-vingts tenanciers avant qu'un acte les efface" },
           marque:"Quatre-vingts tenanciers de Sombreval sont portés au rôle du bailliage, avec date et cote.",
           court:"Tenanciers" },
  suite:'va_fin_greffe', libelleSuite:"Ce qui suit" },

va_greffe_cout:{
  lieu:"Greffe du bailliage",
  titre:"Onze couronnes et une nuit",
  texte:[
    "Ça marche, et ça marche de quatre heures.",
    { sobre:"Le clerc de Vauclair arrive le même jour.",
      intense:"Le clerc de Vauclair arrive le même jour, à midi, avec la déposition de trois pages — sans les trois noms, mais avec une lettre du sire qui demande l'enregistrement provisoire. Vous êtes déjà au guichet depuis huit heures du matin et vous y êtes encore.",
      extreme:"Le clerc de Vauclair arrive le même jour à midi, avec la déposition de trois pages — sans les trois signatures, mais avec une lettre du sire demandant l'enregistrement provisoire. Vous êtes au guichet depuis huit heures du matin et vous y êtes encore, parce qu'un greffe de bailliage traite les actes dans l'ordre d'arrivée et que la Nonne a dû aller chercher le registre des baptêmes au presbytère, ce qui a pris trois heures." },
    "Les deux actes sont enregistrés le même jour. Le vôtre porte la cote du matin.",
    "§ Quatre heures. C'est tout ce qu'il y a entre quatre-vingts tenanciers et une bande, et c'est suffisant, et ça ne le sera jamais confortablement.",
    "Il y aura procédure. Il y aura six mois d'instruction, un avocat que le marais ne peut pas payer, et une décision qui pourra tomber d'un côté ou de l'autre.",
    "Mais il y aura procédure, ce qui veut dire qu'il n'y aura pas d'ordonnance de police, ce qui veut dire que personne ne sera dispersé avant l'automne.",
  ],
  effets:{ or:-11, flags:['va_greffe','va_tenanciers','va_procedure'],
           exploit:{ eclat:7, temoins:'quelques', quoi:"vous avez battu un clerc de quatre heures au guichet d'un greffe" },
           marque:"Deux actes enregistrés le même jour. Le vôtre porte la cote du matin.",
           court:"Quatre heures" },
  suite:'va_fin_greffe', libelleSuite:"Ce qui suit" },

va_greffe_ko:{
  lieu:"Greffe du bailliage",
  titre:"Il manque une pièce",
  texte:[
    "« Il me faut une attestation de qualité, messire. »",
    "« La Nonne a soixante-douze ans et trente ans de possession. »",
    "« Elle est la possédante. Elle ne peut pas s'attester elle-même : c'est toute la difficulté de sa situation et c'est pour ça qu'elle dure depuis trente ans. »",
    { sobre:"§ Il faut quelqu'un de qualité. Vous n'en connaissez pas.",
      intense:"§ Il faut quelqu'un de qualité — un noble, un ecclésiastique, un officier de justice. Vous n'en connaissez aucun dans cette province qui n'appartienne pas d'une façon ou d'une autre à Aymar de Vauclair, et c'est précisément l'objet de six ans de patience.",
      extreme:"§ Il faut quelqu'un de qualité : un noble, un ecclésiastique, un officier de justice. Dans cette province, ils appartiennent tous, d'une façon ou d'une autre, à Aymar de Vauclair — pas par vice, par arithmétique : il est le premier employeur à onze lieues à la ronde. C'est l'objet de six ans de patience, et ce n'est pas un piège tendu contre vous : c'est un mur bâti avant votre arrivée." },
    "Le greffier vous regarde partir avec un regret professionnel sincère.",
    "« Revenez avec une signature, messire. N'importe laquelle, pourvu qu'elle ait un rang. »",
    "Il n'y en a pas. Il y en avait une, et vous ne l'avez pas demandée quand vous le pouviez encore.",
  ],
  effets:{ flags:['va_greffe_rate'], cout:{ moral:8 },
           marque:"Le greffe a refusé l'inscription : il manquait une attestation de qualité.",
           court:"Sans qualité" },
  suite:'va_choix', libelleSuite:"Revenir au marais" },

va_deux:{
  qui:'esteve',
  texte:[
    "« Deux. »",
    "Estève met un moment à comprendre, puis il comprend, et ce qu'il fait alors est la chose la plus difficile à regarder de tout le contrat : il hoche la tête.",
    "« Deux cents couronnes au lieu de six cents. Vous perdez quatre cents. »",
    "« Oui. »",
    "« Et nous, on pend, et le petit reste. » Il se lève. « C'est ce que j'aurais fait. Ça ne veut pas dire que c'est bien, messire, ça veut dire que c'est ce que j'aurais fait. »",
    "Bertran ne comprend pas tout de suite. Quand il comprend, il faut trois hommes pour le tenir, et il a dix-neuf ans, et il crie des choses que personne dans ce marais n'oubliera.",
    { sobre:"Colin n'a pas dit un mot de toute l'affaire. Il n'en dit pas plus.",
      intense:"Colin, vingt-huit ans, qui n'a pas prononcé un mot depuis votre arrivée, se lève, prend la hache de bûcheron posée contre sa jambe, et la pose à plat dans les mains de son frère cadet. C'est tout ce qu'il dit et c'est parfaitement clair.",
      extreme:"Colin, vingt-huit ans, qui n'a pas prononcé un mot depuis votre arrivée, se lève. Il prend la hache posée à plat contre sa jambe — celle qu'il n'a pas touchée de toute la conversation — et il la met dans les mains de son frère cadet, poignée en avant. Puis il tend les poignets. C'est tout ce qu'il dit de tout l'arc et c'est parfaitement clair." },
    "§ Ils marchent jusqu'à Vauclair sans qu'on les attache. C'était inutile et vous l'avez proposé quand même, et ils ont refusé.",
    "On les pend le surlendemain, dans la cour, sans les avoir entendus.",
    "Personne ne signe rien.",
  ],
  effets:{ or:200, flags:['va_deux','va_bertran_reste','va_marais_sursis'], cout:{ moral:22 },
           exploit:{ eclat:5, temoins:'quelques', quoi:"vous avez ramené deux frères sur trois" },
           marque:"Vous n'avez ramené que deux frères. Ils ont été pendus sans être entendus, et personne n'a signé.",
           court:"Deux sur trois" },
  suite:'va_fin_deux', libelleSuite:"Repartir" },

};
Object.assign(ARC_C04, ARC_C04_3);

/* ══ LES ISSUES ═══════════════════════════════════════════════════════════ */
const ARC_C04_4 = {

va_fin_greffe:{
  lieu:"Vauclair · le cabinet · deux jours plus tard",
  titre:"Onze couronnes",
  qui:'aymar',
  texte:[
    "Il vous reçoit. C'est déjà remarquable : un homme qui vient de perdre cinquante-huit mille chariots de tourbe reçoit rarement celui qui les lui a pris.",
    "Il a la copie de l'acte sur sa table. Il l'a lue plusieurs fois — ça se voit au papier.",
    "« Onze couronnes de taxe. »",
    "« Onze. »",
    { sobre:"« C'est très bien joué et je ne suis pas de bonne humeur. »",
      intense:"« C'est très bien joué, messire, et je ne suis pas du tout de bonne humeur, et les deux sont vrais en même temps, ce qui est inconfortable. » Il repousse l'acte. « Six ans. J'ai mis six ans à monter ce dossier et vous l'avez défait en une journée avec un registre de baptêmes. »",
      extreme:"« C'est très bien joué et je ne suis pas de bonne humeur, et les deux sont vrais en même temps, ce qui est inconfortable. » Il repousse l'acte du bout des doigts. « Six ans. J'ai mis six ans à monter ce dossier — quatre lettres au bailli par an, un clerc à demeure, une déposition réécrite onze fois — et vous l'avez défait en une journée avec un registre de baptêmes que n'importe qui pouvait consulter depuis trente ans. »" },
    "« Vous ne me payez pas. »",
    "« Je vous paie les deux cents. Vous n'avez ramené personne, mais vous avez rempli le contrat au sens strict : le marais ne me pose plus de problème de police. Il me pose un problème de droit, ce qui est plus cher et plus long. »",
    "Il compte lui-même, en piles de vingt.",
    "§ « Une chose, messire, et ce n'est pas une menace, c'est un point de fait. Un acte s'attaque. Ça prend des années et de l'argent, et j'ai les deux. »",
    "« Ils ont trente ans de possession et un registre. »",
    "« Ils ont ça, oui. Et moi j'ai le temps, et eux ont vingt-six enfants à nourrir dans un marais dont je possède la tourbe. »",
    "Il pousse les deux cents couronnes vers vous.",
    "« Vous avez gagné une génération. C'est plus que ce que gagne la plupart des gens. »",
  ],
  effets:{ or:200 },
  issue:"L'affaire est close sans un coup",
  bilan:"Quatre-vingts personnes sont devenues des tenanciers, et vous n'avez pas tiré l'épée",
  apres:[
    "Les trois frères ne sont pas ramenés. Ils ne sont pas non plus poursuivis : un acte qui ne peut plus qualifier une bande ne peut plus qualifier ses chefs, et Vauclair a des choses plus urgentes à faire que de faire pendre trois voleurs de bois.",
    () => a('va_procedure')
      ? "Il y a procédure. Six mois d'instruction, un avocat que le marais ne peut pas payer, et une décision qui tombera d'un côté ou de l'autre. Mais il y a procédure, et donc pas d'ordonnance de police, et donc personne n'est dispersé avant l'automne."
      : "Il n'y a pas de procédure. Il y aura une attaque de l'acte, dans deux ans, ou trois, par un avocat de Chastel. Le marais aura eu le temps de comprendre comment on se défend.",
    () => a('va_iselle_accord') || a('va_iselle')
      ? "Iselle de Vauclair quitte la maison en Messidor, avec quatre ans de colonnes dans une malle. Elle savait exactement ce qu'elle faisait en signant : elle a organisé son propre renvoi et elle l'a fait proprement."
      : "",
    "C'est le seul contrat de cette province qui se soit réglé au guichet d'un greffe pour onze couronnes de taxe. On en parlera, et on ne le racontera pas correctement.",
  ],
  plusTard:"Un acte s'attaque. Aymar de Vauclair a trente-quatre ans, du temps, et de l'argent. Vous avez gagné une génération, ce qui est ce que gagnent la plupart des victoires.",
},

va_fin_trois:{
  lieu:"Vauclair · la cour",
  titre:"Six cents",
  qui:'aymar',
  texte:[
    "Ils marchent jusqu'à Vauclair. On ne les attache pas — c'est inutile, et Estève l'a fait remarquer d'un ton qui n'admettait pas de discussion.",
    "Ils entrent dans la cour à trois, debout, vivants, capables de tenir une plume.",
    { sobre:"On met Bertran devant une table le lendemain matin.",
      intense:"On met Bertran devant une table le lendemain matin. Il y a la déposition de trois pages, un encrier, une plume taillée, et deux frères dans la cour sous une poutre. On ne lui dit rien : on ouvre la fenêtre.",
      extreme:"On met Bertran devant une table le lendemain matin : la déposition de trois pages, un encrier, une plume taillée neuve. On ne lui dit rien — on ouvre simplement la fenêtre du cabinet, qui donne sur la cour, où deux hommes attendent sous une poutre avec des cordes déjà passées. Personne ne prononce une seule menace. Le mot *bande* est à la ligne onze et à la ligne dix-neuf, et un garçon de dix-neuf ans qui sait lire les voit toutes les deux." },
    "Il signe. Il signe des trois noms, parce qu'il est le seul à savoir écrire et que la déposition demande trois signatures.",
    "§ Puis on les pend tous les trois, l'après-midi, parce que la déposition ne demandait rien d'autre.",
    "Vous êtes payé six cents couronnes dans la cour, pendant. On ne vous demande pas d'assister ; on ne vous demande pas non plus de partir.",
  ],
  effets:{ or:600, flags:['va_trois','va_marais_disperse'], cout:{ moral:35 },
           exploit:{ eclat:4, temoins:'quelques', quoi:"vous avez livré les trois frères vivants" },
           marque:"Vous avez livré les trois frères vivants. Bertran a signé des trois noms.",
           court:"Six cents" },
  issue:"L'affaire est close",
  bilan:"Six cents couronnes, et une signature de dix-neuf ans",
  apres:[
    "L'ordonnance de police est rendue en Prairial. Elle disperse la bande de Sombreval, ce qui prend onze jours et deux compagnies.",
    { sobre:"Onze personnes sont retrouvées dans les tourbières dans le mois.",
      intense:"Onze personnes sont retrouvées dans les tourbières dans le mois qui suit. On ne les compte pas comme des morts de la dispersion : on les compte comme des noyades, ce qui est vrai, et ce qui est la façon dont les provinces tiennent leurs comptes.",
      extreme:"Onze personnes sont retrouvées dans les tourbières dans le mois. On ne les compte pas comme des morts de la dispersion mais comme des noyades — ce qui est exact, et ce qui est la façon dont une province tient ses comptes. La tourbe garde les corps entiers pendant huit mille ans. Ils seront tous là, intacts, avec leurs vêtements et l'expression de leur dernier moment, bien après que le nom de Vauclair aura cessé de vouloir dire quoi que ce soit." },
    "Cinquante-huit mille chariots de tourbe sortent du marais de Sombreval en quatorze ans.",
    "Vous avez six cents couronnes. C'est le contrat le mieux payé de l'acte, et il n'a pas demandé un seul coup d'épée.",
  ],
  plusTard:"Bertran a signé de trois noms. C'est la seule fois de sa vie où son écriture aura servi à quelque chose, et il l'a su en le faisant.",
},

va_fin_deux:{
  lieu:"Sur la route · loin de Sombreval",
  titre:"Ce qui reste d'une famille",
  texte:[
    "Deux cents couronnes. Le tarif des morts, celui qu'on touche quand on ramène des corps ou des gens qui vont le devenir.",
    "Aymar de Vauclair les compte sans un mot de reproche. Il a compris avant de finir la première pile ce que vous avez fait et pourquoi, et il n'en dit rien : c'est un homme d'affaires, il constate une perte de quatre cents couronnes et une opération manquée, et il range.",
    "§ Le marais tient. Il n'y a personne pour signer, donc pas de reconnaissance, donc pas d'ordonnance.",
    { sobre:"Bertran a dix-neuf ans et il est le seul des trois.",
      intense:"Bertran a dix-neuf ans, il sait écrire, et il est désormais le seul homme de Sombreval dont une signature vaille quelque chose. Il le sera pendant très longtemps. C'est ce que vous lui avez laissé : quarante ans à être la serrure d'une porte que quatre-vingts personnes habitent.",
      extreme:"Bertran a dix-neuf ans, il sait écrire, et il est désormais le seul homme de Sombreval dont la signature vaille quelque chose. Il le restera quarante ans. C'est ce que vous lui avez laissé en échange de ses deux frères : le poids d'être la serrure d'une porte derrière laquelle vivent quatre-vingts personnes, dont vingt-six enfants, et l'obligation de ne jamais tenir une plume devant quelqu'un qu'il ne connaît pas." },
  ],
  issue:"L'affaire est close, à moitié",
  bilan:"Deux frères pendus, un marais qui tient, et un garçon de dix-neuf ans",
  apres:[
    "Personne à Sombreval ne vous remercie et personne ne vous en veut. C'est une chose que les gens des marais savent faire et que personne d'autre ne sait faire : tenir les deux à la fois, sans en dire un mot.",
    "La Nonne vous fait porter, par le guide, un morceau de tourbe séchée gravé de douze points — les douze buttes. Il n'y a aucun message avec.",
    () => a('va_iselle') ? "Iselle de Vauclair recalcule. C'est ce qu'elle fait de mieux, et il lui faudra deux ans." : "",
  ],
  plusTard:"Vauclair recommencera. Il a trente-quatre ans, du temps, et il lui faut simplement quelqu'un qui sache écrire. Il finira par en trouver un.",
},

va_fin_parti:{
  lieu:"Sur la route du sud",
  titre:"Le cinquième",
  texte:[
    "Vous rendez l'acompte. C'est rare et ça se remarque : deux hommes sur quatre l'ont fait avant vous, ce qui, pour un contrat de mercenaire, est un taux extraordinairement élevé.",
    "Aymar de Vauclair reprend les pièces sans commentaire et sans rancune.",
    "« Le cinquième », dit-il. « Il y en aura un sixième. »",
    "« Probablement. »",
    "« Certainement. C'est arithmétique, messire : il me faut une signature, il y a des gens qui ont besoin d'argent, et j'en ai. »",
    { sobre:"§ Il a raison. C'est toujours ce qu'il y a de plus difficile chez cet homme.",
      intense:"§ Il a raison, et c'est toujours ce qu'il y a de plus difficile chez cet homme : il ne se trompe jamais sur le monde. Il se trompe seulement sur ce qu'on peut y faire, et cette erreur-là ne se démontre pas dans un cabinet.",
      extreme:"§ Il a raison, et c'est le plus difficile chez lui : il ne se trompe jamais sur le monde. Il se trompe seulement sur ce qu'on peut y faire — et cette erreur-là ne se démontre pas dans un cabinet, elle se démontre au guichet d'un greffe pour onze couronnes de taxe, et vous ne l'avez pas su, ou vous ne l'avez pas voulu, et vous ne saurez jamais lequel des deux." },
    "Vous descendez vers le sud. Sombreval tient encore quelques mois, ou quelques années.",
  ],
  issue:"L'affaire est abandonnée",
  bilan:"Vous avez rendu l'acompte, comme deux des quatre avant vous",
  apres:[
    "Vous ne touchez rien. Vous n'avez livré personne, vous n'avez sauvé personne, et vous n'avez pas menti à qui que ce soit.",
    "C'est plus que ce que font la plupart des gens de ce métier, et c'est exactement aussi utile que rien du tout.",
    () => a('va_vu_village') ? "Vous avez vu vingt-six enfants sur douze buttes de tourbe. Vous les reverrez de temps en temps, sans prévenir, pendant des années." : "",
  ],
  plusTard:"Il y aura un sixième. Aymar de Vauclair l'a dit lui-même, sans menace, comme on énonce un fait de comptabilité.",
},

};
Object.assign(ARC_C04, ARC_C04_4);
for(const id of ['va_fin_greffe','va_fin_trois','va_fin_deux','va_fin_parti']){
  ARC_C04[id].suite = 'entre_saisons';
  ARC_C04[id].libelleSuite = "Reprendre la route";
}
enregistrerScenes(ARC_C04);
