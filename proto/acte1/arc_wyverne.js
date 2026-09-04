/* PARIAS — Acte I · C01 · La Wyverne de Cendrepont
 * ═══════════════════════════════════════════════════════════════════════
 * Développé depuis design/narratif_v7 · CONTRATS_COMPLETS_V7_01_10 § C01,
 * et depuis le combat long V7_C01_WYVERNE_COMBAT_LONG_JOUEUR.md, qui donne
 * le registre à tenir.
 *
 * Ce que l'arc met à l'épreuve :
 *   — un commanditaire qui ment par omission, et quatre façons de le voir ;
 *   — les termes du Prix fixés avant tout départ, avec une noble qui consent
 *     pour une raison qui n'a rien à voir avec Yohan ;
 *   — l'enquête qui change ce qui sera possible au combat ;
 *   — un combat long à cinq degrés, avec anatomie, vent, hauteur et plaies
 *     qui restent ;
 *   — le renom qui ne monte que devant témoins ;
 *   — une révélation qui retourne le contrat.
 * ═══════════════════════════════════════════════════════════════════════ */

const ARC_WYVERNE = {

/* ══ 1 · L'AUDIENCE ═══════════════════════════════════════════════════ */
wy_audience:{
  lieu:"Cendrepont · la maison de Valombre · salle haute",
  titre:"Trois caravanes",
  qui:'heloise',
  texte:[
    "La maison de Valombre n'est pas un château. C'est une grosse ferme fortifiée bâtie sur un éperon, avec une tour carrée qui sert de grenier, et l'odeur de la salle haute est celle de toutes les maisons de ce rang en fin d'hiver : suif froid, laine humide, et le fond d'aigre que laisse un plancher où l'on a renversé de la bière pendant quatre générations.",
    "Le feu marche. C'est la première chose qu'on remarque, parce que les maisons qui vous reçoivent dans le froid vous disent qu'elles n'ont pas d'argent, et celle-ci vous dit le contraire avant d'ouvrir la bouche.",
    "Héloïse de Valombre a quarante-six ans. Veuve depuis onze, elle tient la maison depuis onze — les deux dates sont les mêmes et personne ici ne fait de commentaire. Elle porte encore le noir, pas par deuil : parce que le noir ne montre pas l'usure et qu'elle n'a fait teindre aucune robe depuis six ans.",
    "Elle ne s'assied pas et ne vous propose pas de siège.",
    "« Trois caravanes en six semaines. La bête a fait son nid dans les rochers au-dessus du gué de Cendrepont, et la Route Grise passe sous ce nid. Elle descend, elle prend un cheval, elle remonte. Parfois elle prend autre chose qu'un cheval. »",
    "^« Deux cent cinquante couronnes. »",
    "Elle laisse tomber le chiffre comme on pose une pierre.",
    "§ « Et la coutume ancienne, si vous êtes de ceux à qui elle est due. Je l'ai écrit dans ma lettre. Je savais ce que j'écrivais. »",
  ],
  choix:[
    { t:"« Elle prend autre chose qu'un cheval. Combien de morts ? »",
      detail:"Une question à poser avant de dire oui, jamais après",
      risque:"sûr", va:'wy_morts' },
    { t:"Demander à voir les corps, ou ce qu'il en reste",
      detail:"Perception · anatomie — ce qu'une bête fait à un homme se lit",
      risque:"favorable",
      test:{ carac:'perception', comp:'anatomie', dc:11, manoeuvre:'examen' },
      degres:{ dominante:'wy_corps_dom', nette:'wy_corps_ok', couteuse:'wy_corps_ok', echec:'wy_corps_ko' } },
    { t:"« Pourquoi maintenant ? Une wyverne ne s'installe pas en six semaines. »",
      detail:"Intellect — un nid se bâtit, et ça prend une saison",
      risque:"favorable",
      test:{ carac:'intellect', comp:'bestiaire', dc:10, manoeuvre:'chronologie' },
      degres:{ dominante:'wy_pourquoi_dom', nette:'wy_pourquoi_ok', echec:'wy_pourquoi_ko' } },
    { t:"Ne rien demander. Parler des termes tout de suite",
      detail:"Un homme qui ne pose pas de questions coûte moins cher à recevoir",
      va:'wy_termes',
      effets:{ flags:['wy_discret'], marque:"Vous n'avez rien demandé à Valombre avant de dire oui.", court:"Rien demandé" } },
  ],
},

wy_morts:{
  qui:'heloise',
  texte:[
    "Elle ne détourne pas les yeux. C'est presque décevant : les gens qui mentent détournent les yeux, et elle ne ment pas.",
    "^« Onze. »",
    "Un temps.",
    "^« Deux charretiers à la première caravane. Une famille entière à la deuxième — six, dont trois enfants, et je vous épargne le détail parce que vous n'en avez pas besoin pour faire votre travail. Trois hommes de mon propre péage à la troisième, qui avaient reçu l'ordre d'aller voir. C'est moi qui ai donné cet ordre. »",
    "Elle se tourne enfin vers le feu.",
    "« Vous voulez que je vous dise que ça me tient éveillée ? Ça ne me tient pas éveillée. Ce qui me tient éveillée, c'est que la Route Grise rapporte quatre-vingts couronnes de péage par mois à cette maison, que le péage est la seule chose qui la fait tenir depuis que mon mari est mort en laissant plus de dettes que de terres, et que si la route reste fermée trois mois de plus je vends la tour. »",
    "§ « Onze morts et une tour. Voilà exactement pourquoi vous êtes là, et je préfère que vous le sachiez avant de discuter de mon or. »",
  ],
  effets:{ flags:['wy_sait_onze'], marque:"Onze morts, dont trois hommes qu'elle a elle-même envoyés voir.", court:"Onze morts" },
  suite:'wy_termes', libelleSuite:"Les termes",
},

wy_corps_dom:{
  texte:[
    "Ce qu'il reste des trois hommes du péage est dans la grange froide, sous des toiles, et personne ne les a touchés depuis qu'on les a rapportés parce que personne n'a voulu.",
    { sobre:"Vous soulevez les toiles une par une. Deux corps sont incomplets. Le troisième est presque intact, et c'est celui-là qui parle.",
      intense:"Vous soulevez les toiles une par une. Le premier n'a plus de jambes sous le genou — les sections sont nettes, arrachées d'un coup et non mâchées. Le deuxième a été ouvert du sternum au bassin et vidé, proprement, comme on vide un lièvre. Le troisième est presque intact, et c'est celui-là qui parle.",
      extreme:"Vous soulevez les toiles une par une. Le premier n'a plus de jambes sous le genou ; les sections sont nettes, l'os fémoral saillant et poli là où une mâchoire l'a tenu. Le deuxième a été ouvert du sternum au bassin et vidé — la cage thoracique est écartée de l'intérieur, les côtes rompues vers l'extérieur en éventail, et il n'y a plus rien dedans qu'un gel brun. Le troisième est presque intact, et c'est celui-là qui parle." },
    "Il n'a qu'une blessure : quatre perforations à l'épaule, disposées en arc, profondes de deux pouces. Une prise de serre. On l'a saisi, soulevé, et lâché — et il est mort de la chute, pas de la bête.",
    "§ Une wyverne qui chasse mange sur place. Une wyverne qui **emporte** rapporte à quelqu'un.",
    "Vous regardez à nouveau les deux autres. Le vidé n'a pas été mangé : il a été ouvert et abandonné. Le sectionné a perdu ses jambes d'un coup de mâchoire unique, sans acharnement.",
    "Ce n'est pas de la faim. C'est de la défense de territoire, et une bête qui défend un territoire défend quelque chose qui est dedans.",
    "Il y a une couvée dans ce nid. Vous le sauriez même si personne ne vous le disait jamais.",
  ],
  effets:{ flags:['wy_sait_couvee','wy_sait_onze'],
           marque:"Les corps disent une bête qui défend, pas qui chasse. Il y a une couvée.", court:"Une couvée" },
  suite:'wy_termes', libelleSuite:"Les termes",
},

wy_corps_ok:{
  texte:[
    "Ce qu'il reste des trois hommes du péage est dans la grange froide, sous des toiles.",
    { sobre:"Deux sont incomplets. Le troisième est presque entier et porte quatre perforations à l'épaule, en arc, profondes.",
      intense:"Deux sont incomplets — un sectionné aux genoux, un ouvert du sternum au bassin. Le troisième est presque entier et porte quatre perforations à l'épaule, disposées en arc, profondes de deux pouces.",
      extreme:"Deux sont incomplets — un sectionné aux genoux d'un seul coup de mâchoire, un ouvert du sternum au bassin et vidé de tout ce qu'un homme contient. Le troisième est presque entier et porte quatre perforations à l'épaule, en arc, profondes de deux pouces, où la chair a noirci autour." },
    "Une prise de serre. On l'a saisi et lâché.",
    "§ Une bête qui emporte ses proies au lieu de les manger sur place ne chasse pas pour elle.",
    "Vous ne savez pas encore ce qu'il y a dans ce nid. Vous savez qu'il y a quelque chose.",
  ],
  effets:{ flags:['wy_soupcon_couvee'], marque:"La wyverne emporte ses proies. Elle nourrit quelque chose.", court:"Elle emporte" },
  suite:'wy_termes', libelleSuite:"Les termes",
},

wy_corps_ko:{
  texte:[
    "Héloïse de Valombre vous laisse entrer dans la grange froide et reste sur le seuil, dehors, les mains dans les manches.",
    "Vous soulevez les toiles. Il fait moins quatre depuis six jours et le gel a fait son travail : ce qui est en dessous est dur, gris, et raconte beaucoup moins qu'un corps frais.",
    "Vous restez un quart d'heure. Vous en tirez ce que n'importe qui en tirerait : c'est une grosse bête, elle a des serres, et elle a très mal fini ces trois hommes.",
    "En ressortant, vous croisez son regard et vous savez tous les deux que vous n'avez rien appris.",
  ],
  effets:{ cout:{ moral:5 } },
  suite:'wy_termes', libelleSuite:"Les termes",
},

wy_pourquoi_dom:{
  qui:'heloise',
  texte:[
    "@« Une wyverne ne s'installe pas en six semaines, madame. Elle bâtit un nid, et un nid de cette taille demande une saison entière. Elle est là depuis l'automne. »",
    "Le silence dure trois secondes de trop.",
    "« Depuis l'automne, oui. »",
    "« Et elle n'a rien pris pendant quatre mois. »",
    "« Non. »",
    "Elle revient vers la table et pose les deux mains à plat dessus, doigts écartés — le geste de quelqu'un qui décide de dire quelque chose.",
    "« Elle prenait des bêtes. Un mouton par semaine, deux parfois, en haut, sur les pâtures du versant nord. Nous payions les bergers pour la perte et nous nous taisions, parce qu'une wyverne qui mange des moutons n'est pas un problème : c'est un impôt. »",
    "§ « Puis quelqu'un lui a tiré dessus. Et depuis ce jour-là elle descend sur la route. »",
    "@« Qui ? »",
    "« Je l'ignore, et c'est vrai. Ce que je sais, c'est que la première caravane est tombée neuf jours après. »",
    "Elle se redresse.",
    "« Voilà. Vous savez maintenant ce que je sais. Ça ne change rien à ce qu'il faut faire, mais je préfère que vous ne l'appreniez pas là-haut. »",
  ],
  effets:{ flags:['wy_sait_fleches','wy_heloise_franche'],
           marque:"Quelqu'un a tiré sur la wyverne à l'automne. C'est ça qui l'a fait descendre.", court:"On lui a tiré dessus" },
  suite:'wy_termes', libelleSuite:"Les termes",
},

wy_pourquoi_ok:{
  qui:'heloise',
  texte:[
    "@« Une wyverne ne s'installe pas en six semaines. Elle est là depuis plus longtemps. »",
    "Elle ne le nie pas, et elle ne le développe pas.",
    "« Depuis l'automne. Elle prenait des moutons sur le versant nord. Nous payions les bergers et nous nous taisions. »",
    "« Et qu'est-ce qui a changé ? »",
    "§ « Je l'ignore. »",
    "Elle le dit trop vite et elle le sait. C'est la seule fissure de l'entretien et elle se referme immédiatement.",
    "« Deux cent cinquante couronnes, messire, pour une bête sur une route. Vous n'êtes pas payé pour écrire sa biographie. »",
  ],
  effets:{ flags:['wy_soupcon_fleches'], marque:"La wyverne était là depuis l'automne et ne descendait pas. Quelque chose a changé.", court:"Quelque chose a changé" },
  suite:'wy_termes', libelleSuite:"Les termes",
},

wy_pourquoi_ko:{
  qui:'heloise',
  texte:[
    "La question sort mal — trop longue, trop savante, avec deux mots de bestiaire que vous avez lus quelque part et jamais employés à voix haute.",
    "Elle attend poliment que vous ayez fini.",
    "« Je vous engage pour la tuer, pas pour la comprendre. »",
    "§ Elle a raison et c'est humiliant, ce qui est exactement l'effet recherché.",
  ],
  suite:'wy_termes', libelleSuite:"Les termes",
},

/* ══ 2 · LES TERMES ═══════════════════════════════════════════════════ */
wy_termes:{
  lieu:"La même salle · les termes se fixent avant que rien ne commence",
  titre:"La coutume ancienne",
  qui:'alienor',
  texte:[
    "On ne discute pas le prix d'un Paria après coup. C'est la seule règle que les maisons et les Parias respectent également, et depuis assez longtemps pour que plus personne ne se rappelle pourquoi elle existe.",
    "Elle date d'un temps où les Parias mouraient sans descendance, parce que aucune maison ne voulait mêler son sang au leur, et où quelqu'un a décidé que si l'on tenait tant à les employer, on paierait aussi ce prix-là. Elle n'a rien d'aimable. Elle est seulement plus vieille que ceux qui doivent la tenir.",
    "Deux moitiés. **L'or**, qui se compte, se pèse et se conteste. **Le sang** : une femme de la maison, adulte, consentante, et qui doit le dire elle-même, à voix haute, devant témoin. Une maison qui refuse le sang paie l'or double. Une maison qui promet le sang sans le consentement de celle qu'elle promet est déshonorée dans six provinces, et il y a trois cents ans de sentences pour le prouver.",
    "Héloïse de Valombre fait entrer sa nièce sans prévenir.",
    "§ Aliénor de Valombre a vingt-quatre ans, un manteau de cheval encore mouillé, et elle entre en s'essuyant les mains sur les cuisses parce qu'elle sort de l'écurie.",
    "« On m'a expliqué. Je sais compter et je sais lire, alors épargnons-nous la partie où quelqu'un fait semblant que c'est romantique. »",
    "Elle s'assied sans qu'on le lui propose, exactement comme sa tante ne l'a pas fait pour vous.",
  ],
  choix:[
    { t:"L'or seul. Cinq cents couronnes, et rien d'autre",
      detail:"+500 couronnes · une maison paie double quand on ne réclame pas le reste",
      ferme:"Ferme : le sang de Valombre — on ne rouvre pas des termes fixés",
      definitif:true, va:'wy_or_seul',
      effets:{ or:500, flags:['wy_or_seul'],
               marque:"Vous n'avez pris que l'or à Valombre.", court:"L'or seul" } },
    { t:"Lui demander à elle, devant sa tante",
      detail:"C'est à elle de répondre, et elle a une raison qui n'est pas vous",
      risque:"sûr", va:'wy_demande' },
    { t:"L'or et le sang, comme le veut la coutume",
      detail:"+250 couronnes · la coutume se réclame d'une seule voix, et ce sera la vôtre",
      ferme:"Ferme : ce qu'Aliénor aurait pu vous dire — elle répondra, mais pas à vous",
      definitif:true, va:'wy_coutume_imposee',
      effets:{ or:250, flags:['wy_coutume','wy_coutume_imposee'],
               marque:"Vous avez réclamé la coutume entière sans rien demander à Aliénor.", court:"La coutume, imposée" } },
    { t:"Refuser les termes et sortir",
      detail:"Onze morts, une tour à vendre, et quelqu'un d'autre qui montera",
      ferme:"Ferme : toute l'affaire de Cendrepont",
      definitif:true, va:'wy_refus' },
  ],
},

wy_demande:{
  qui:'alienor',
  texte:[
    "@« Je ne le demanderai pas à votre tante. Je vous le demande à vous, et vous pouvez dire non devant elle. »",
    "Héloïse ouvre la bouche. Aliénor lève deux doigts de la table et sa tante se tait, ce qui apprend sur cette maison davantage que le registre des dettes.",
    "« Bien. » La nièce se penche en avant, coudes sur les genoux, dans une posture d'homme qu'elle n'a manifestement jamais eu l'intention de corriger. « Alors on va parler comme des adultes, et je vais vous dire ce que j'y gagne, parce que je ne crois pas une seconde que vous accepteriez si je faisais celle qui vous trouve beau. »",
    "^« Cette maison a un héritier et c'est mon cousin Amaury. Vous ne l'avez pas encore rencontré. Vous allez le rencontrer, et dans un quart d'heure vous saurez ce que tout le monde ici sait depuis dix ans : c'est un homme faible qui se croit habile, et il finira par vendre cette vallée à quelqu'un qui lui dira qu'il est intelligent. »",
    "^« Ma tante tient la maison depuis onze ans parce qu'elle est meilleure que lui à tout. Le jour où elle meurt, il hérite. C'est la loi et la loi est bête. »",
    "§ « Moi, je n'hérite de rien. Sauf si j'ai un enfant, et sauf si cet enfant a quelque chose que le sien n'aura pas. »",
    "Elle laisse ça poser. Le feu craque.",
    "« Le sang Paria se transmet une fois sur deux. Je le sais, ma tante le sait, et les archives de trois maisons de cette province le savent. Un enfant qui porte l'Onde, avec un nom de Valombre et une revendication écrite, ça ne se marie pas : ça se négocie. »",
    "^« Alors oui, messire. Pas pour vous. Vous n'y êtes pour rien et vous n'y serez pour rien : je ne vous demanderai jamais de le reconnaître, je ne vous écrirai pas, et si vous repassez dans huit ans je ne vous présenterai personne. »",
    "Un temps.",
    "« Si ça vous convient, dites-le maintenant. Si ça vous dégoûte, dites-le aussi — je préfère un homme qui trouve ça sale à un homme qui fait semblant de ne pas comprendre. »",
  ],
  effets:{ flags:['wy_alienor_franche'] },
  choix:[
    { t:"« Ça me convient. »",
      detail:"+250 couronnes · deux adultes, un marché, et aucun mensonge entre eux",
      ferme:"Ferme : Amaury de Valombre comme héritier tranquille",
      definitif:true, va:'wy_accord',
      effets:{ or:250, flags:['wy_coutume','wy_alienor_accord','wy_alienor_estime'],
               marque:"Aliénor de Valombre a dit oui pour ses raisons, et vous les connaissez.", court:"L'accord d'Aliénor" } },
    { t:"« Vous êtes en train de fabriquer un prétendant. »",
      detail:"Volonté — dire tout haut ce qu'elle vient de dire à moitié",
      risque:"favorable",
      test:{ carac:'volonte', comp:null, dc:9, manoeuvre:'franchise' },
      degres:{ dominante:'wy_pretendant_dom', nette:'wy_pretendant_ok', echec:'wy_pretendant_ko' } },
    { t:"« Alors je prends l'or. Fabriquez votre héritier avec quelqu'un d'autre. »",
      detail:"+500 couronnes · elle n'aura pas eu besoin de vous",
      ferme:"Ferme : le sang de Valombre",
      definitif:true, va:'wy_or_apres',
      effets:{ or:500, flags:['wy_or_seul','wy_alienor_estime'],
               marque:"Aliénor vous a proposé un marché franc et vous ne l'avez pas pris.", court:"L'or, quand même" } },
  ],
},

wy_pretendant_dom:{
  qui:'alienor',
  texte:[
    "@« Vous n'êtes pas en train de me demander un service. Vous êtes en train de fabriquer un prétendant, et vous voulez que le géniteur soit quelqu'un qui ne reviendra jamais réclamer quoi que ce soit. »",
    "Elle ne cille pas. Sa tante, au fond, s'assied — pour la première fois de l'entretien.",
    "« Oui. »",
    "§ « Et je vais vous dire ce qui me plaît chez vous, messire : vous venez de le dire à voix haute devant ma tante, ce que personne dans cette maison n'a osé faire en six ans. »",
    "Elle se redresse et son ton change, à peine.",
    "« Alors autant aller jusqu'au bout. Il y a une chose que je n'ai pas dite. Si j'ai un enfant de vous et qu'Amaury l'apprend, il essaiera de le faire disparaître. Pas moi — moi je suis sa cousine et il n'aura pas le cran. L'enfant, oui. »",
    "^« Je vous le dis parce que si vous acceptez, vous acceptez ça aussi, et je ne veux pas que vous puissiez prétendre plus tard que vous ne saviez pas. »",
    "Héloïse, du fond de la salle, sans lever la tête : « Elle a raison au sujet de mon fils. »",
    "C'est la phrase la plus lourde qui ait été prononcée dans cette pièce, et c'est une mère qui la dit.",
  ],
  effets:{ flags:['wy_alienor_franche','wy_amaury_danger','wy_heloise_lucide'],
           marque:"Héloïse de Valombre a reconnu devant vous que son fils est un danger.", court:"Elle sait, pour son fils" },
  choix:[
    { t:"« Ça me convient. Et je m'en souviendrai. »",
      detail:"+250 couronnes · un accord dont les deux parties connaissent le prix",
      ferme:"Ferme : Amaury de Valombre comme héritier tranquille",
      definitif:true, va:'wy_accord',
      effets:{ or:250, flags:['wy_coutume','wy_alienor_accord','wy_alienor_estime','wy_promesse_enfant'],
               marque:"Vous avez accepté la coutume en sachant ce qu'elle ferait courir à un enfant.", court:"L'accord, en connaissance" } },
    { t:"« Non. Je ne fabrique pas d'orphelin pour une querelle de succession. »",
      detail:"+500 couronnes",
      ferme:"Ferme : le sang de Valombre",
      definitif:true, va:'wy_or_apres',
      effets:{ or:500, flags:['wy_or_seul','wy_alienor_estime'],
               marque:"Vous avez refusé de fabriquer un héritier pour Valombre.", court:"Refusé" } },
  ],
},

wy_pretendant_ok:{
  qui:'alienor',
  texte:[
    "@« Vous fabriquez un prétendant. »",
    "« Évidemment. » Elle a presque l'air agacée qu'il ait fallu le dire. « Vous croyiez quoi ? »",
    "Héloïse, du fond : « Ma nièce est franche par calcul, messire, pas par vertu. C'est plus fiable. »",
    "§ C'est probablement le compliment le plus laid que quelqu'un ait fait à quelqu'un d'autre devant vous.",
  ],
  effets:{ flags:['wy_alienor_franche'] },
  choix:[
    { t:"« Ça me convient. »",
      detail:"+250 couronnes",
      ferme:"Ferme : Amaury de Valombre comme héritier tranquille",
      definitif:true, va:'wy_accord',
      effets:{ or:250, flags:['wy_coutume','wy_alienor_accord'],
               marque:"Aliénor de Valombre a dit oui pour ses raisons.", court:"L'accord d'Aliénor" } },
    { t:"« Je prends l'or. »",
      detail:"+500 couronnes",
      ferme:"Ferme : le sang de Valombre",
      definitif:true, va:'wy_or_apres',
      effets:{ or:500, flags:['wy_or_seul'],
               marque:"Vous n'avez pris que l'or à Valombre.", court:"L'or seul" } },
  ],
},

wy_pretendant_ko:{
  qui:'alienor',
  texte:[
    "L'accusation sort mal — un ton de moraliste, deux mots de trop, et cette façon de se redresser qu'ont les gens qui se croient au-dessus d'une transaction dont ils font partie.",
    "Elle attend qu'il ait fini.",
    "« Vous vendez votre épée pour tuer une bête qui a mangé six personnes, dont trois enfants, parce qu'on vous donne deux cent cinquante couronnes. »",
    "« Moi je vends ce que j'ai pour que cette maison ne tombe pas entre les mains d'un imbécile. »",
    "§ « Alors ne me faites pas la leçon, messire. Nous sommes assis à la même table. »",
  ],
  effets:{ flags:['wy_alienor_froid'] },
  choix:[
    { t:"« Vous avez raison. Ça me convient. »",
      detail:"+250 couronnes · vous venez de vous faire remettre à votre place et elle avait raison",
      ferme:"Ferme : Amaury de Valombre comme héritier tranquille",
      definitif:true, va:'wy_accord',
      effets:{ or:250, flags:['wy_coutume','wy_alienor_accord'],
               marque:"Aliénor vous a remis à votre place, et vous avez accepté ses termes.", court:"Remis à sa place" } },
    { t:"Prendre l'or et n'en plus parler",
      detail:"+500 couronnes",
      ferme:"Ferme : le sang de Valombre",
      definitif:true, va:'wy_or_apres',
      effets:{ or:500, flags:['wy_or_seul'],
               marque:"Vous n'avez pris que l'or à Valombre.", court:"L'or seul" } },
  ],
},

wy_or_seul:{
  qui:'heloise',
  texte:[
    "@« L'or seul. »",
    "Héloïse de Valombre fait apporter cinq cents couronnes et les compte devant vous. Une partie est en écus rognés de province ; elle le sait, vous le voyez, et elle continue de compter sans ralentir.",
    "Aliénor est encore là. Elle ne dit rien pendant tout le compte, et à la dernière pile elle sort sans regarder personne.",
    "§ Vous mettrez trois jours à comprendre que ce n'était pas du mépris.",
    "Héloïse referme le coffret elle-même.",
    "« Vous avez pris le double et vous avez évité une conversation. C'est ce que font la plupart des hommes que j'ai employés. »",
    "« Je ne vous le reproche pas. Je constate. »",
  ],
  suite:'wy_amaury', libelleSuite:"Le soir",
},

wy_or_apres:{
  qui:'alienor',
  texte:[
    "Elle encaisse mieux que vous ne l'auriez cru, et beaucoup moins bien qu'elle ne le montre. Elle se lève, remet son manteau de cheval encore mouillé, et s'arrête à la porte.",
    "« Vous êtes le troisième à dire non. »",
    "« Il y en a eu deux autres ? »",
    "« Un chevalier de Rochebrune, il y a deux ans, qui m'a fait la morale pendant une demi-heure et qui a fini par accepter. Et un Paria, l'hiver dernier, qui n'a même pas voulu s'asseoir. »",
    "§ « Vous, vous vous êtes assis, vous m'avez écoutée jusqu'au bout, et vous avez dit non. C'est la seule version que je puisse respecter, alors gardez votre or et allez tuer cette bête. »",
    "À la porte, sans se retourner :",
    "« Vous rencontrerez mon cousin ce soir. Il viendra vous voir seul et il ne le dira à personne. Écoutez-le jusqu'au bout — pas pour lui. Pour vous. »",
  ],
  effets:{ flags:['wy_alienor_estime','wy_prevenu_amaury'],
           marque:"Aliénor vous a prévenu que son cousin viendrait vous voir en secret.", court:"L'avertissement" },
  suite:'wy_amaury', libelleSuite:"Le soir",
},

wy_accord:{
  qui:'alienor',
  texte:[
    "@« Alors c'est dit. »",
    "Héloïse fait apporter deux cent cinquante couronnes et un contrat en deux exemplaires, manifestement rédigé avant l'audience — ce qu'Aliénor remarque en même temps que vous et souligne d'un regard.",
    "Aliénor le lit en entier, debout, sans se presser, et raye trois lignes avant de signer. Elle fait recopier les ratures sur le second exemplaire et attend que l'encre sèche.",
    "« La première disait que je ne pouvais pas rompre. La deuxième disait que vous ne pouviez pas. La troisième disait que l'enfant éventuel serait présenté à la maison. »",
    "Elle repose la plume.",
    "« Ma tante rédige des contrats comme elle tient des comptes : en se ménageant une porte partout. C'est ce qui a sauvé cette maison et c'est ce qui fait qu'on ne peut rien signer chez elle sans lire. »",
    "Héloïse ne le dément pas. Elle a même l'air, une seconde, presque fière.",
    "§ « Vous partez après-demain », dit Aliénor. « Je viendrai ce soir, quand votre entretien avec mon cousin sera fini. »",
    "@« Mon entretien avec votre cousin ? »",
    "« Il viendra. Il vient toujours. »",
  ],
  effets:{ flags:['wy_prevenu_amaury'],
           marque:"Le contrat de Valombre est signé, avec trois ratures de la main d'Aliénor.", court:"Le contrat, raturé" },
  suite:'wy_amaury', libelleSuite:"Le soir",
},

wy_refus:{
  qui:'heloise',
  texte:[
    "@« Non. »",
    "Elle ne discute pas, ne marchande pas, ne s'offusque pas. Elle reprend la lettre au sceau du héron et la range dans le coffret dont elle est sortie.",
    "« Vous avez lu les cinq mots que j'avais écrits et vous avez fait quatre jours de route pour venir me dire non en personne. C'est presque courtois. »",
    "Elle referme le coffret.",
    "§ « Quelqu'un d'autre montera dans le mois, messire. Il posera moins de questions, il coûtera moins cher, et il fera plus de dégâts. Ni vous ni moi n'y pouvons plus rien maintenant. »",
    "Aliénor vous regarde sortir. C'est le seul regard de la pièce qui ne soit pas froid, et vous ne saurez jamais ce qu'il voulait dire.",
  ],
  issue:"L'affaire est close",
  bilan:"Vous n'avez pas pris Cendrepont",
  apres:[
    "Une compagnie de Chastel monte au gué six semaines plus tard, pour cent quatre-vingts couronnes, avec deux balistes de siège et onze hommes. Ils mettent onze jours et perdent quatre des leurs.",
    "Ils trouvent trois œufs dans le nid. Ils sont vendus avant que le corps de la mère refroidisse, et un seigneur de guerre de la côte possède depuis trois montures qui n'existaient pas l'an dernier.",
    "§ Vous n'apprendrez cette dernière partie que dans deux ans, dans une taverne, par quelqu'un qui la racontera comme une bonne blague.",
  ],
  plusTard:"Vous n'avez rien perdu et rien gagné. C'est ce qu'il vous restera de cet hiver : quarante couronnes, une lettre pliée dans votre botte, et personne dans quatre provinces qui vous doive quoi que ce soit.",
},

wy_coutume_imposee:{
  qui:'alienor',
  texte:[
    "@« L'or et le sang. »",
    "Héloïse hoche la tête. La coutume respectée est une chose qu'elle sait ranger, classer et oublier ; c'est même précisément à ça que servent les coutumes.",
    "Aliénor vous regarde longuement. Assez longuement pour que ce soit inconfortable, et sans une once d'hostilité — ce qui est pire.",
    "Puis elle dit, à sa tante et pas à vous : « Qu'on m'écrive les termes. Je les lirai avant de les tenir. »",
    "Elle raye trois lignes au contrat avant de signer et fait recopier les ratures.",
    "§ Elle a dit oui. Vous ne saurez jamais ce qu'elle aurait répondu si vous le lui aviez demandé — ni pourquoi elle disait oui, ce qui, dans le cas d'Aliénor de Valombre, était toute l'histoire.",
    "À la porte : « Vous partez après-demain. Je viendrai ce soir. » Elle annonce ça comme une livraison de foin.",
  ],
  suite:'wy_amaury', libelleSuite:"Le soir",
},
};

/* ══════════════════════════════════════════════════════════════════════════
   2 · LE FILS, LA NUIT, LA ROUTE
   ══════════════════════════════════════════════════════════════════════════ */
const ARC_WYVERNE_2 = {

wy_amaury:{
  lieu:"Cendrepont · la chambre d'hôte, tour est · première nuit",
  titre:"Le fils",
  qui:'amaury',
  texte:[
    "Il frappe à la neuvième heure et il frappe mal — trop doucement d'abord, puis trop fort, comme quelqu'un qui a répété dans l'escalier et qui s'est trompé de version.",
    "Amaury de Valombre a vingt-huit ans, les mains d'un homme qui n'a jamais rien porté de lourd, et il entre en refermant derrière lui avec un soin qui dit tout de ce qui va suivre.",
    "« Ma mère ne sait pas que je suis ici. »",
    "Il s'assied sans qu'on le lui propose — c'est visiblement une manie de famille — et il pose sur le coffre une bourse qui sonne bien.",
    "« Cent couronnes. Pour vous, en plus. Et je ne vous demande rien qui contredise le contrat : vous tuez la bête, vous rouvrez la route, vous êtes payé par la maison. »",
    "« Je veux seulement que vous me rapportiez ce qu'il y a dans le nid. »",
    "§ Il dit ça avec l'assurance de quelqu'un qui a préparé sa phrase et qui n'a pas prévu la suivante.",
    "^« Il y a des œufs, messire. Une wyverne qui défend un territoire pendant six mois défend une couvée, tout le monde sait ça. »",
    "Il ne sait manifestement pas que la plupart des gens ne savent pas ça, ce qui veut dire que quelqu'un le lui a appris récemment.",
  ],
  choix:[
    { t:"« Qui vous a appris qu'il y avait une couvée ? »",
      detail:"Perception — il vient de citer quelqu'un sans s'en apercevoir",
      risque:"favorable",
      test:{ carac:'perception', comp:null, dc:10, manoeuvre:'lecture', adversaire:'amaury' },
      degres:{ dominante:'wy_amaury_dom', nette:'wy_amaury_ok', echec:'wy_amaury_ko' } },
    { t:"« Combien vaut un œuf de wyverne ? »",
      detail:"Le vrai sujet, posé sans détour",
      risque:"sûr", va:'wy_amaury_prix' },
    { t:"Prendre les cent couronnes et ne rien promettre",
      detail:"+100 couronnes · vous déciderez là-haut, devant le nid",
      va:'wy_amaury_pris',
      effets:{ or:100, flags:['wy_amaury_paye'],
               marque:"Vous avez pris les cent couronnes d'Amaury sans rien promettre.", court:"Ses cent couronnes" } },
    { t:"Le jeter dehors",
      detail:"Un fils qui achète un mercenaire dans le dos de sa mère",
      ferme:"Ferme : ce qu'Amaury aurait fini par vous dire",
      definitif:true, va:'wy_amaury_dehors',
      effets:{ flags:['wy_amaury_ennemi'],
               marque:"Vous avez jeté Amaury de Valombre hors de votre chambre.", court:"Jeté dehors" } },
  ],
},

wy_amaury_dom:{
  qui:'amaury',
  texte:[
    "@« Qui vous a appris qu'une wyverne qui défend un territoire défend une couvée ? »",
    "Il ouvre la bouche. La referme. Et pendant une seconde entière, son visage fait exactement ce que fait le visage d'un homme qui vient de comprendre qu'il a récité.",
    "« C'est… tout le monde sait ça. »",
    "« Non. Moi je le sais parce que j'ai passé onze ans à me faire payer pour tuer des choses. Vous, vous ne savez pas monter à cheval sans étrier. Qui vous l'a dit ? »",
    "Il tient huit secondes. C'est plus que ce que vous auriez parié.",
    "§ « Gassien. Gassien le Lièvre. Il tient le relais de sel à trois lieues, au bas du gué. »",
    "@« Et pourquoi un homme qui tient un relais de sel sait-il ce qu'il y a dans un nid de wyverne ? »",
    "Cette fois il ne répond pas du tout, ce qui est la réponse.",
    "« Cent cinquante », dit-il à la place, très vite. « Cent cinquante couronnes et vous ne prononcez pas son nom devant ma mère. »",
  ],
  effets:{ flags:['wy_sait_gassien','wy_sait_couvee'],
           marque:"Amaury a lâché le nom de Gassien le Lièvre, qui tient le relais de sel du bas du gué.", court:"Gassien" },
  choix:[
    { t:"Prendre les cent cinquante",
      detail:"+150 couronnes · et vous savez maintenant chez qui aller avant de monter",
      va:'wy_amaury_pris',
      effets:{ or:150, flags:['wy_amaury_paye'],
               marque:"Vous avez pris cent cinquante couronnes pour ne pas prononcer un nom.", court:"Le silence, payé" } },
    { t:"Refuser l'argent et garder le nom",
      detail:"Il saura que vous n'êtes pas acheté, et ça l'inquiétera",
      va:'wy_amaury_dehors',
      effets:{ flags:['wy_amaury_inquiet'],
               marque:"Vous avez refusé l'or d'Amaury après lui avoir soutiré le nom.", court:"Le nom sans l'or" } },
  ],
},

wy_amaury_ok:{
  qui:'amaury',
  texte:[
    "@« Qui vous a appris qu'il y avait une couvée ? »",
    "« Personne. C'est de notoriété. »",
    "Il ment mal, mais il ment vite, et il enchaîne avant que vous puissiez revenir dessus — ce qui, chez un homme de vingt-huit ans qui n'a jamais rien porté de lourd, est probablement la seule compétence qu'il ait développée.",
    "« Cent couronnes, messire. Un œuf. C'est tout. »",
    "§ Il y a quelqu'un derrière lui. Vous le savez à la façon dont il a récité, et vous ne saurez pas qui ce soir.",
  ],
  effets:{ flags:['wy_soupcon_amaury','wy_sait_couvee'],
           marque:"Amaury récite. Quelqu'un lui a appris ce qu'il y avait dans le nid.", court:"Il récite" },
  choix:[
    { t:"Prendre les cent couronnes",
      detail:"+100 couronnes · vous déciderez devant le nid",
      va:'wy_amaury_pris',
      effets:{ or:100, flags:['wy_amaury_paye'],
               marque:"Vous avez pris les cent couronnes d'Amaury.", court:"Ses cent couronnes" } },
    { t:"Refuser",
      detail:"Vous n'êtes pas acheté, et il saura que vous ne l'êtes pas",
      va:'wy_amaury_dehors',
      effets:{ flags:['wy_amaury_inquiet'], marque:"Vous avez refusé l'or d'Amaury.", court:"Refusé" } },
  ],
},

wy_amaury_ko:{
  qui:'amaury',
  texte:[
    "La question sort trop directe et trop tôt. Il se rétracte comme une huître.",
    "« Je ne vois pas ce que vous insinuez. »",
    "Il ramasse la bourse, la remet dans son manteau, se lève.",
    "« L'offre tient jusqu'à ce que vous montiez. Après, elle ne tient plus. »",
    "§ À la porte, il ajoute une phrase qu'il regrette immédiatement : « Et si vous croyez que ma mère vous dit tout, vous êtes plus bête que vous n'en avez l'air. »",
  ],
  effets:{ flags:['wy_amaury_inquiet'] },
  suite:'wy_nuit_ou_route', libelleSuite:"Plus tard",
},

wy_amaury_prix:{
  qui:'amaury',
  texte:[
    "@« Combien vaut un œuf de wyverne ? »",
    "Il sourit. C'est la première chose sincère qu'il fait depuis qu'il est entré, et c'est laid.",
    "« Un œuf fécondé, sorti d'un nid, avec un témoin qui peut jurer de sa provenance ? »",
    "^« Entre huit cents et mille deux cents couronnes. Une bête montable, dressée depuis l'éclosion, tenue par quelqu'un qui sait ce qu'il fait : quatre mille. »",
    "§ « Il y en a trois dans ce nid, messire. Vous êtes en train de calculer, et vous avez raison de calculer. »",
    "^« Ma mère va vendre la tour cette année. Elle vous l'a dit ? Elle le dit à tout le monde comme si c'était une fatalité. Ce n'est pas une fatalité. C'est un manque d'imagination. »",
    "^« Trois œufs, c'est trois mille couronnes. Trois mille couronnes, c'est la tour, les dettes de mon père, et de quoi tenir sept ans. »",
    "Il se penche.",
    "« Je ne suis pas un imbécile. Je suis le seul dans cette maison à voir qu'on est assis sur trois mille couronnes et qu'on paie un mercenaire pour aller les casser. »",
  ],
  effets:{ flags:['wy_sait_valeur','wy_sait_couvee'],
           marque:"Un œuf vaut mille couronnes. Il y en a trois dans le nid.", court:"Trois mille couronnes" },
  choix:[
    { t:"« Et vous les vendez à qui ? »",
      detail:"Volonté — un homme qui parle argent finit toujours par nommer l'acheteur",
      risque:"favorable",
      test:{ carac:'volonte', comp:null, dc:11, manoeuvre:'insistance', adversaire:'amaury' },
      degres:{ dominante:'wy_amaury_dom', nette:'wy_amaury_dom', couteuse:'wy_amaury_ok', echec:'wy_amaury_ko' } },
    { t:"Prendre les cent couronnes",
      detail:"+100 couronnes",
      va:'wy_amaury_pris',
      effets:{ or:100, flags:['wy_amaury_paye'],
               marque:"Vous avez pris les cent couronnes d'Amaury.", court:"Ses cent couronnes" } },
    { t:"« Votre mère a envoyé trois hommes mourir sur cette route. »",
      detail:"Ce n'est pas un argument. C'est ce qu'on dit quand on n'en a plus.",
      va:'wy_amaury_dehors',
      effets:{ flags:['wy_amaury_ennemi'],
               marque:"Vous avez rappelé les onze morts à Amaury de Valombre.", court:"Les onze morts" } },
  ],
},

wy_amaury_pris:{
  qui:'amaury',
  texte:[
    "Il pousse la bourse vers vous et vous la prenez, et il y a dans son soulagement quelque chose de presque touchant — un homme qui vient de découvrir que le monde s'achète et qui n'a pas encore compris que c'est la partie facile.",
    "« Bien. Bien. »",
    "Il se lève, se rassied, se relève.",
    "« Un seul œuf suffira. Deux si vous pouvez. Enveloppés dans de la laine, pas de la paille, et jamais en dessous de la température d'un corps. »",
    "§ Encore une chose qu'il ne sait pas de lui-même.",
    "Il s'arrête à la porte.",
    "« Vous n'avez rien promis, je sais. Vous êtes le genre d'homme qui ne promet rien. Mais vous avez pris l'argent, et à partir de maintenant, si vous cassez ces œufs, vous saurez exactement combien vous venez de casser. »",
    "C'est la phrase la plus intelligente qu'il ait prononcée de la soirée.",
  ],
  suite:'wy_nuit_ou_route', libelleSuite:"Plus tard",
},

wy_amaury_dehors:{
  qui:'amaury',
  texte:[
    "Il ne proteste pas. Il ramasse sa bourse avec la dignité maladroite d'un homme qui a déjà été jeté dehors et qui a mis au point une façon de le faire.",
    "À la porte, il se retourne.",
    "« Vous croyez que je suis un charognard. »",
    "« Oui. »",
    "« Ma mère va vendre la tour. La tour, messire — pas les terres, pas le péage, la tour, c'est-à-dire les archives, les registres et l'endroit où mon père est enterré. Et elle le fera avec le menton haut et tout le monde dira qu'elle est admirable. »",
    "§ « Moi je propose de vendre trois œufs d'une bête qui a mangé onze personnes, et je suis le charognard. »",
    "^« Bonne nuit. Ne mourez pas là-haut : ça ferait deux tours à vendre. »",
  ],
  suite:'wy_nuit_ou_route', libelleSuite:"Plus tard",
},

/* Aiguillage : la nuit n'a lieu que si la coutume a été réclamée. */
wy_nuit_ou_route:{
  dyn:true, texte:[], suite:'wy_route',
},

/* ══ LA NUIT ══════════════════════════════════════════════════════════════ */
wy_nuit:{
  lieu:"Cendrepont · la chambre d'hôte · plus tard dans la nuit",
  titre:"Ce qui se paie en sang",
  qui:'alienor',
  texte:[
    "Elle vient après minuit, quand la maison a fini de bouger, et elle vient de l'écurie — on le sent avant de la voir : cheval, foin, suint, et le froid qu'on rapporte dehors dans les cheveux.",
    "Elle a une bouteille. Pas du vin de la maison : de l'eau-de-vie de prune que les valets font eux-mêmes et que personne au-dessus du rang de palefrenier n'est censé boire.",
    "« J'ai passé deux heures avec la jument de mon oncle. Elle a un abcès au boulet et personne ici ne sait le percer sans qu'elle démolisse une stalle. »",
    "Elle pose la bouteille, retire ses gants, et montre ses mains — écorchées aux jointures, une entaille propre en travers de la paume droite.",
    "§ « Voilà. Vous savez maintenant à quoi je ressemble vraiment. Autant que ce soit fait tout de suite. »",
    a('wy_coutume_imposee')
      ? "Elle n'a pas dit un mot de plus depuis la salle haute. Elle est là parce que le papier le dit, elle l'a lu, elle l'a raturé trois fois, et elle tient ce qu'elle a signé."
      : "Elle s'assied sur le coffre, remonte un pied sous elle, et débouche la bouteille avec les dents.",
  ],
  choix:[
    { t:"« Vous n'êtes obligée à rien. Le contrat tient quand même. »",
      detail:"Vous gardez l'or · elle ne saura pas ce qui vous a arrêté",
      risque:"sûr", va:'wy_nuit_sortie' },
    { t:"Lui demander ce qu'elle veut, elle, cette nuit",
      detail:"Volonté — la question est simple, la poser ne l'est pas",
      risque:"favorable",
      test:{ carac:'volonte', comp:null, dc:a('wy_coutume_imposee') ? 12 : 9, manoeuvre:'question' },
      degres:{ dominante:'wy_nuit_veut', nette:'wy_nuit_veut', couteuse:'wy_nuit_veut_ko', echec:'wy_nuit_veut_ko' } },
    { t:"Boire avec elle et laisser venir",
      detail:"Elle est venue avec une bouteille et une décision déjà prise",
      va:'wy_nuit_boire' },
    { t:"Passer la nuit à parler, et rien d'autre",
      detail:"L'ellipse · le contrat n'exige rien qu'aucun des deux ne veuille",
      va:'wy_nuit_ellipse',
      effets:{ flags:['wy_nuit_ellipse'],
               marque:"La coutume n'a pas été tenue. Vous avez parlé jusqu'au matin.", court:"Rien, et tout" } },
  ],
},

wy_nuit_sortie:{
  qui:'alienor',
  texte:[
    "Elle s'arrête, la bouteille à mi-chemin de sa bouche.",
    "@« Pourquoi ? »",
    "« Parce que je ne saurai pas quoi en faire demain. »",
    "« Ce n'est pas une raison, c'est un inconfort. » Elle boit. « Et ce n'est pas à vous d'être mal à l'aise à ma place. Je vous rappelle que c'est moi qui ai demandé. »",
    "Elle repose la bouteille sur le coffre, sèchement.",
    "« Écoutez-moi une fois et on n'en reparle plus. J'ai vingt-quatre ans. J'ai eu trois amants, choisis par moi, dont deux qui valaient la peine. Je ne suis pas une vierge qu'on livre et je n'ai pas besoin qu'un mercenaire me protège d'une décision que j'ai prise avant qu'il arrive. »",
    "§ « Ce qui se passe cette nuit, c'est la seule chose de ma vie dont je décide entièrement toute seule. Ne me la reprenez pas pour vous sentir propre. »",
    "Un temps. Elle reprend la bouteille.",
    "« Asseyez-vous. Vous êtes fatigant debout. »",
  ],
  effets:{ flags:['wy_nuit_offert_sortie','wy_alienor_estime'],
           marque:"Vous lui avez offert de rompre. Elle a refusé et elle a expliqué pourquoi.", court:"Elle a refusé de sortir" },
  suite:'wy_nuit_ensemble',
},

wy_nuit_veut:{
  qui:'alienor',
  texte:[
    "@« Qu'est-ce que vous voulez, vous, cette nuit ? »",
    "Elle ne répond pas tout de suite. Elle regarde l'entaille de sa paume droite, la rouvre du pouce, la referme.",
    "« Personne ne me l'a demandé depuis six ans. »",
    "Elle boit. Elle tend la bouteille.",
    "« Je veux qu'on ne me parle pas de succession pendant six heures. Je veux qu'on ne me demande pas si je suis sûre. Je veux ne pas être polie, ne pas mesurer ce que je dis, ne pas calculer ce que ça coûtera à cette maison demain matin — je fais ça toute la journée, tous les jours, depuis que j'ai compris à dix-huit ans que j'étais la seule ici à savoir compter. »",
    "Elle vous regarde bien en face.",
    "§ « Et je veux que ce soit avec quelqu'un qui montera là-haut après-demain et qui ne redescendra peut-être pas. C'est laid à dire. Je le dis quand même, parce que vous avez demandé. »",
    "« Vous avez d'autres questions, ou on peut cesser de parler ? »",
  ],
  effets:{ flags:['wy_nuit_demande','wy_alienor_estime'],
           marque:"Vous lui avez demandé ce qu'elle voulait. Personne ne l'avait fait depuis six ans.", court:"La question posée" },
  suite:'wy_nuit_ensemble',
},

wy_nuit_veut_ko:{
  qui:'alienor',
  texte:[
    "La question sort mal — enveloppée, précautionneuse, sur ce ton qu'on prend avec les gens qu'on croit fragiles.",
    "Elle l'entend au premier mot.",
    "« Ne me ménagez pas. »",
    "Ce n'est pas dur. C'est net.",
    "« Si vous me traitez comme une chose délicate, je vais finir par me sentir comme une chose délicate, et je vous jure que ce n'est pas ce que je suis venue chercher dans cette chambre. »",
    "§ Elle boit au goulot et tend la bouteille sans vous regarder.",
    "^« Buvez. Et parlez-moi comme à quelqu'un que vous ne plaignez pas. »",
  ],
  suite:'wy_nuit_ensemble',
},

wy_nuit_boire:{
  qui:'alienor',
  texte:[
    "L'eau-de-vie de prune des valets de Valombre est infecte et elle chauffe comme une braise avalée. Elle en boit deux gorgées pour votre une, ce qui n'est pas de la bravade : c'est de l'entraînement.",
    "Elle parle. Beaucoup, et vite, comme quelqu'un qui ouvre une vanne rouillée.",
    "Son père, mort à la guerre du Détroit quand elle avait sept ans, dont elle ne garde qu'une odeur de cuir et une phrase. Sa mère, remariée en Basse-Marche, qui écrit deux fois l'an et n'est jamais revenue. Onze ans dans cette maison chez une tante qui l'a nourrie, éduquée, et n'a jamais pris la peine de lui mentir une seule fois — ce qu'elle appelle, sans ironie, de la tendresse.",
    "« Elle m'a dit à quatorze ans ce que je valais et pourquoi. Sur une carte, avec les fiefs dessus. Elle avait raison sur tout. »",
    "À un moment elle s'arrête au milieu d'une phrase, repose la bouteille, et le silence change de nature.",
    "§ Ce n'est plus le silence de deux personnes qui attendent. C'est celui de deux personnes qui ont cessé d'attendre.",
  ],
  suite:'wy_nuit_ensemble',
},

wy_nuit_ensemble:{
  qui:'alienor',
  texte:[
    "Elle vient. Elle ne se laisse pas faire et elle ne se donne pas : elle vient, et c'est un verbe qui a un sujet.",
    "Le premier geste est à elle — la paume entaillée à plat sur votre poitrine, pas pour repousser, pour sentir ce qu'il y a dessous. Elle a les doigts glacés et calleux, et il y a de la corne à la base de trois d'entre eux, là où on tient des rênes toute la journée.",
    "Elle trouve la cicatrice sous la clavicule. Trois ans, Orsenne, recousue par un barbier qui buvait — quatre pouces de bourrelet mal aligné qui tire par temps froid.",
    "Elle s'arrête dessus. Elle ne demande rien.",
    "Vous trouvez les siennes : une ligne blanche en travers de l'omoplate gauche, ancienne, régulière.",
    "« Une jument de trois ans qui m'a mise contre un mur de stalle. J'avais seize ans, j'ai fini le pansage avant d'aller me faire recoudre, et ma tante a dit que c'était la première chose intelligente que j'aie faite. »",
    "Elle prend votre visage à deux mains, fermement, pour que vous la regardiez.",
    "§ « Cette nuit, on ne parle plus de cette maison. »",
    { sobre:"Le feu descend et personne ne le remet.",
      intense:"Elle a une faim précise et impatiente qui n'a rien de romanesque et tout d'un appétit. Elle rit une fois — court, surpris, contre votre épaule — et cesse d'être quelqu'un qui calcule pendant plusieurs heures d'affilée, ce qui ne lui était pas arrivé depuis six ans. Le feu descend jusqu'aux braises et personne ne le remet.",
      extreme:"Elle a une faim précise, impatiente, sans une once de romanesque : elle prend ce qu'elle veut, dit ce qu'elle veut, et corrige quand ça ne va pas. Elle rit une fois — court, surpris, contre votre épaule — et cesse d'être quelqu'un qui calcule pendant plusieurs heures d'affilée, ce qui ne lui était pas arrivé depuis six ans. Elle laisse des marques et elle en emporte. Le feu descend jusqu'aux braises et personne ne le remet." },
    "Il fait noir depuis longtemps quand ils cessent de se parler, et ce qu'ils se disent alors n'appartient plus ni à la coutume, ni à la maison, ni au second exemplaire du contrat.",
  ],
  suite:'wy_nuit_matin',
},

wy_nuit_ellipse:{
  qui:'alienor',
  texte:[
    "@« On peut passer la nuit à parler. Le contrat n'oblige personne à autre chose que ce que les deux veulent. »",
    "Elle vous regarde un long moment. Puis elle hausse une épaule, remonte les deux pieds sous elle sur le coffre, et tend la bouteille.",
    "« D'accord. »",
    "C'est tout. Pas de soulagement, pas de reproche, pas de scène — et c'est précisément ce qui rend la chose facile.",
    "Ils parlent jusqu'à la quatrième heure du matin. De la jument à l'abcès. De la mère remariée en Basse-Marche qui écrit deux fois l'an. Du père mort au Détroit dont il ne reste qu'une odeur de cuir. De ce que c'est que de tenir des comptes que personne ne lit, dans une maison qui va vendre sa tour.",
    "§ Et de Karlsberg — pas la version des chansons. Celle où l'on a froid.",
    "Elle écoute ça sans rien dire, très longtemps, et elle ne demande jamais si c'est vrai.",
    "Quand elle s'en va, la coutume n'a pas été tenue, et personne dans cette maison n'ira le vérifier.",
  ],
  effets:{ flags:['wy_alienor_estime'] },
  suite:'wy_nuit_matin',
},

wy_nuit_matin:{
  lieu:"La chambre d'hôte · avant l'aube",
  qui:'alienor',
  texte:[
    "Elle est debout avant le jour, en train de se rhabiller dans le noir avec l'efficacité de quelqu'un qui a déjà eu à ne pas être vue en sortant d'une chambre.",
    a('wy_nuit_ellipse')
      ? "Elle n'a pas dormi. Elle a l'air d'avoir gagné quelque chose et de ne pas savoir quoi."
      : "Le feu est mort. Il gèle. Elle enfile ses bottes assise par terre, dos au coffre.",
    "« Ne dites rien de gentil. Vous allez le regretter à cheval, et moi j'y repenserai pendant six mois. »",
    a('wy_nuit_demande') || a('wy_nuit_offert_sortie') || a('wy_alienor_estime')
      ? "Un temps. « Mais merci d'avoir demandé. Ça, vous pouvez l'emporter. »"
      : "Elle ne dit rien de plus.",
    "Puis elle sort de sa poche un feuillet plié en quatre et le pose sur le coffre.",
    "« Le relevé du péage de la Route Grise, novembre et décembre. Je tiens les comptes de cette maison depuis quatre ans parce que ma tante a la vue basse et trop d'orgueil pour le dire. »",
    "§ « Regardez la troisième colonne. Le sel de Gassien le Lièvre passe au péage sans jamais payer depuis l'automne. Depuis l'automne exactement, messire. »",
    "^« Ma tante n'a pas signé cette exemption. Moi non plus. »",
    "Elle est déjà dans l'escalier quand vous comprenez ce qu'elle vient de vous mettre entre les mains.",
  ],
  effets:{ flags:['wy_sait_gassien','wy_releve_peage'],
           marque:"Aliénor vous a donné le relevé du péage : Gassien passe gratuitement depuis l'automne.", court:"Le relevé" },
  suite:'wy_route', libelleSuite:"La Route Grise",
},

};
Object.assign(ARC_WYVERNE, ARC_WYVERNE_2);

/* ══════════════════════════════════════════════════════════════════════════
   3 · LA ROUTE, LE RELAIS, LA PRÉPARATION
   ══════════════════════════════════════════════════════════════════════════ */
const ARC_WYVERNE_3 = {

wy_route:{
  lieu:"Route Grise · le gué de Cendrepont · deux jours plus tard",
  titre:"Ce qui pend au-dessus du gué",
  texte:[
    "Le gué de Cendrepont n'est pas un gué : c'est un rétrécissement où la route passe entre la rivière et une falaise de schiste haute de cent quarante pieds. Il y a trois cents pas où l'on ne peut ni se cacher, ni faire demi-tour avec un attelage, ni voir ce qui arrive de haut.",
    "Quelqu'un a choisi cet endroit il y a très longtemps pour y mettre un péage. C'est le même endroit qu'on choisirait pour un nid.",
    { sobre:"Sur les vires, à mi-hauteur, il y a des choses accrochées.",
      intense:"Sur les vires, à mi-hauteur, il y a des carcasses. Deux chevaux, un mulet, quelque chose de plus petit qu'on ne veut pas identifier. Elles ne sont pas tombées là : elles ont été posées, calées entre les rochers, et elles sèchent.",
      extreme:"Sur les vires, à mi-hauteur, il y a des carcasses calées entre les rochers, éventrées et vidées, la peau tannée par six semaines de gel et de vent. Deux chevaux. Un mulet. Et une chose plus petite dont il reste assez de tissu bleu pour qu'on sache que ce n'était pas un animal." },
    "Un garde-manger. Les wyvernes en font quand elles ont quelque chose à nourrir et pas le temps de chasser tous les jours.",
    "§ Cent quarante pieds au-dessus, dans une anfractuosité de la falaise, il y a le nid — et le nid est bâti autour d'une borne.",
    "Une vraie borne, taillée, ancienne, avec une face plate et des marques dessus. Une wyverne ne bâtit pas autour d'une pierre par hasard : elle bâtit autour de ce qui garde la chaleur du soleil le plus longtemps.",
    "En bas, au pied de la falaise, un homme et six autres montent deux balistes de campagne sous un couvert de branchages. L'homme a trois doigts à la main gauche et il vous voit arriver bien avant que vous le voyiez.",
  ],
  suite:'wy_bracq', libelleSuite:"L'homme aux balistes",
},

wy_bracq:{
  qui:'bracq',
  /* Il est là, il a deux engins tendus et onze jours de froid dans les os : il
   * travaille avec vous d'office. Les jets qui suivent ne décident pas de son
   * concours — ils décident de ce qu'il accepte de dire. */
  effets:{ flags:['wy_bracq_allie'] },
  texte:[
    "« Bracq. Maître des engins pour la maison de Valombre, ce qui veut dire que je suis le seul homme de la vallée qui sache tendre une baliste sans se faire arracher la main. »",
    "Il lève sa main gauche, trois doigts.",
    "« Enfin. Le seul qui sache le faire deux fois. »",
    "Il a cinquante ans, un dos de charpentier et l'humeur d'un homme qui monte des machines de siège dans le froid depuis onze jours pour une bête qu'il n'a pas envie de voir de près.",
    "« Deux balistes, six servants, trente-cinq carreaux. Portée utile : quatre-vingts pas si elle descend en ligne, rien du tout si elle tourne. On l'a ratée deux fois. »",
    "« Vous êtes le Paria ? »",
    "Il le dit sans agressivité, comme il dirait *vous êtes le charron*.",
  ],
  choix:[
    { t:"« Qui lui a tiré dessus à l'automne ? »",
      detail:"Volonté — un maître des engins connaît les flèches de son pays",
      risque:"favorable",
      test:{ carac:'volonte', comp:null, dc:10, manoeuvre:'question', adversaire:'bracq' },
      degres:{ dominante:'wy_bracq_dom', nette:'wy_bracq_ok', echec:'wy_bracq_ko' } },
    { t:"Monter voir le nid de plus près",
      detail:"Agilité · endurance — cent quarante pieds de schiste pourri, en février",
      risque:"risqué",
      test:{ carac:'agilite', comp:'furtivite', dc:13, manoeuvre:'escalade', cout:{ endurance:15 } },
      degres:{ dominante:'wy_nid_reco_dom', nette:'wy_nid_reco', couteuse:'wy_nid_reco_cout',
               echec:'wy_nid_reco_ko', catastrophe:'wy_nid_reco_cata' } },
    { t:"Examiner les carcasses des vires",
      detail:"Perception · bestiaire — un garde-manger dit combien de bouches il nourrit",
      risque:"favorable",
      test:{ carac:'perception', comp:'bestiaire', dc:11, manoeuvre:'examen' },
      degres:{ dominante:'wy_vires_dom', nette:'wy_vires_ok', echec:'wy_vires_ko' } },
    { t:"Descendre au relais de sel du bas du gué",
      detail:"Gassien le Lièvre · trois lieues · ce que son sel fait ici",
      si:() => a('wy_sait_gassien'),
      va:'wy_gassien' },
    { t:"Assez vu. Préparer le coup",
      detail:"On ne prépare bien qu'avec ce qu'on sait",
      va:'wy_prepa' },
  ],
},

wy_bracq_dom:{
  qui:'bracq',
  texte:[
    "Il se marre. C'est un rire court et sans joie, celui d'un homme à qui l'on vient de poser exactement la question qu'il attendait depuis six semaines.",
    "« Enfin quelqu'un. »",
    "Il vous emmène derrière la baliste de gauche et sort d'une caisse un carreau qu'il a manifestement gardé pour ça.",
    "« Retiré de l'aile gauche à la première caravane. Elle l'a fait tomber en volant et un charretier l'a ramassé. »",
    "C'est un carreau de baliste de campagne. Pas une flèche de chasse. Pas un trait d'arbalète de braconnier. Une pointe carrée de quatre pouces, à empennage de cuir, poinçonnée sous la douille.",
    "« Poinçon de l'arsenal de Chastel, série de l'an dernier. Il y a exactement deux engins de ce calibre dans cette vallée et je les ai montés tous les deux. »",
    "§ « Ceux-là. Ceux que je viens de tendre. »",
    "Il repose le carreau dans la caisse et il n'a plus du tout envie de rire.",
    "« Quelqu'un a sorti une de mes balistes à l'automne, l'a montée quelque part sur le versant nord, a tiré sur une bête qui mangeait des moutons et ne descendait pas, l'a blessée, et l'a remontée dans son râtelier avant que je m'en aperçoive. »",
    "^« Il y a trois hommes dans cette vallée qui savent tendre un de ces engins. Moi, et deux de mes servants. Et mes deux servants étaient à Chastel en octobre. »",
  ],
  effets:{ flags:['wy_sait_fleches','wy_sait_baliste','wy_bracq_allie'],
           exploit:{ eclat:4, temoins:'quelques', quoi:"vous avez posé la question que personne n'osait" },
           marque:"Le carreau retiré de l'aile vient d'une baliste de Valombre, tirée à l'automne.", court:"Une baliste de la maison" },
  suite:'wy_bracq', libelleSuite:"Revenir aux balistes",
},

wy_bracq_ok:{
  qui:'bracq',
  texte:[
    "@« On a retiré un carreau de son aile gauche à la première caravane. Un carreau, pas une flèche. »",
    "Il vous montre la caisse mais ne l'ouvre pas.",
    "« Militaire. Poinçonné. Je ne vous dirai pas de quel arsenal parce que je tiens à ma place et à mes trois doigts. »",
    "§ « Mais posez-vous la question suivante, messire, et posez-la à quelqu'un d'autre que moi : qui, dans une vallée de bergers, a de quoi tirer un carreau de baliste sur une bête à cent pieds ? »",
  ],
  effets:{ flags:['wy_sait_fleches','wy_sait_baliste'],
           marque:"Le carreau retiré de l'aile est militaire et poinçonné.", court:"Un carreau militaire" },
  suite:'wy_bracq', libelleSuite:"Revenir aux balistes",
},

wy_bracq_ko:{
  qui:'bracq',
  texte:[
    "« Je monte des engins. Je ne monte pas des dossiers. »",
    "Il retourne à sa baliste et se met à graisser une glissière qui n'en a aucun besoin, ce qui est la manière la plus universellement comprise de mettre fin à une conversation.",
    "§ Il n'a pas dit non. Il a dit *pas à vous, pas maintenant*, ce qui n'est pas la même chose.",
  ],
  suite:'wy_bracq', libelleSuite:"Revenir aux balistes",
},

wy_vires_dom:{
  texte:[
    "Il faut deux heures et une corde pour atteindre la première vire, et l'odeur monte bien avant qu'on y soit.",
    { sobre:"Les carcasses ne sont pas mangées de la même façon.",
      intense:"Les carcasses ne sont pas mangées de la même façon, et c'est là tout le renseignement. Sur les deux chevaux, les grandes masses musculaires — cuisses, encolure — ont été arrachées par bandes larges. Sur le mulet, non : il a été ouvert, et l'intérieur a été vidé proprement, sans que la carcasse soit entamée ailleurs.",
      extreme:"Les carcasses ne sont pas mangées de la même façon, et c'est là tout le renseignement. Sur les deux chevaux, les grandes masses — cuisses, encolure — ont été arrachées par bandes larges, l'os raclé jusqu'au blanc. Sur le mulet, non : il a été ouvert du poitrail à l'aine, le foie, les poumons et les intestins prélevés, et le reste laissé intact à sécher." },
    "Une adulte mange le muscle. Les organes mous, on les donne à ce qui n'a pas encore de dents.",
    "§ Il y a autre chose de vivant là-haut, et ça mange depuis au moins trois semaines.",
    "Sur la vire, en revenant, vous trouvez encore deux choses. Une coquille — un fragment large comme une main, épais comme un ongle de pouce, nacré à l'intérieur : une éclosion, pas une casse. Et, coincé sous une pierre, un morceau de laine cardée.",
    "De la laine cardée. Pas de la toison brute. De la laine préparée, du genre qu'on met dans une caisse pour transporter quelque chose de fragile.",
    "Quelqu'un est déjà monté à ce nid.",
  ],
  effets:{ flags:['wy_sait_couvee','wy_sait_laine','wy_deja_monte'],
           exploit:{ eclat:5, temoins:'quelques', quoi:"vous êtes monté aux vires" },
           marque:"Une éclosion a déjà eu lieu, et quelqu'un est monté au nid avec de la laine cardée.", court:"Quelqu'un est monté" },
  suite:'wy_bracq', libelleSuite:"Redescendre",
},

wy_vires_ok:{
  texte:[
    "Deux heures, une corde, et l'odeur.",
    { sobre:"Les deux chevaux ont été mangés au muscle. Le mulet a été ouvert et vidé de ses organes sans être entamé ailleurs.",
      intense:"Les deux chevaux ont été mangés au muscle — cuisses et encolure arrachées par bandes. Le mulet, lui, a été ouvert et vidé de ses organes mous, et le reste laissé à sécher.",
      extreme:"Les deux chevaux ont été mangés au muscle, l'os raclé jusqu'au blanc. Le mulet a été ouvert du poitrail à l'aine et vidé de ses organes mous, foie et poumons prélevés, le reste abandonné au gel." },
    "§ On donne les organes mous à ce qui n'a pas de dents.",
    "Il y a une couvée dans ce nid, et elle mange depuis des semaines.",
  ],
  effets:{ flags:['wy_sait_couvee'],
           marque:"Le garde-manger nourrit une couvée.", court:"Une couvée" },
  suite:'wy_bracq', libelleSuite:"Redescendre" },

wy_vires_ko:{
  texte:[
    "Vous montez à la première vire et vous n'y restez pas longtemps. Le vent tourne, l'odeur devient impossible, et le schiste part sous les mains par plaques de la taille d'une assiette.",
    "Vous redescendez avec deux paumes râpées et la seule information dont tout le monde disposait déjà : c'est une grosse bête et elle mange beaucoup.",
  ],
  effets:{ cout:{ endurance:8 } },
  suite:'wy_bracq', libelleSuite:"Redescendre" },

wy_nid_reco_dom:{
  texte:[
    "Cent quarante pieds de schiste, en février, sans corde sur les quarante derniers parce qu'il n'y a rien où l'amarrer.",
    "Vous montez par la cheminée est, dans l'ombre, du côté où le vent rabat votre odeur vers la rivière. Il vous faut une heure et demie et vous arrivez à trente pieds sous le nid, sur une vire de deux pouces, avec une vue complète.",
    "Le nid fait douze pieds de large. Il est bâti autour de la borne — et la borne est un jalon de route impérial, taillé, à quatre faces, gravé sur trois.",
    "§ Sur la face exposée au sud, sous quarante ans de fiente et de lichen, il y a un loup.",
    "Pas un loup héraldique. Un loup ancien, à la gueule fermée, encadré de deux barres — la marque de bornage des routes de la maison Karlsberg.",
    "Cette route était à votre famille. Il y a dix-neuf ans, on a gratté les pierres. On a manifestement oublié celle-là parce qu'elle est à cent quarante pieds et que personne n'y monte.",
    "Il vous faut un moment.",
    "Puis vous regardez le nid, parce que c'est pour ça que vous êtes monté.",
    "Trois œufs. Gris, mouchetés, gros comme des têtes d'enfant, calés contre la face sud de la borne — la face qui garde le soleil.",
    "Et une quatrième forme. Plus petite, immobile, la peau des ailes encore translucide : un jeune éclos, mort depuis plusieurs jours, que la mère n'a pas mangé et n'a pas jeté.",
  ],
  effets:{ flags:['wy_sait_couvee','wy_borne_karlsberg','wy_reco_nid','wy_jeune_mort'],
           exploit:{ eclat:6, temoins:'quelques', quoi:"vous êtes monté au nid, seul, de nuit" },
           cout:{ endurance:10 },
           marque:"La borne du nid porte le loup de Karlsberg. Cette route était à votre famille.", court:"Le loup sur la borne" },
  suite:'wy_bracq', libelleSuite:"Redescendre" },

wy_nid_reco:{
  texte:[
    "Vous montez par la cheminée est et vous vous arrêtez à quarante pieds sous le nid, là où le schiste cesse de tenir.",
    "De là, on voit ce qu'il faut : le nid fait douze pieds, il est bâti autour d'une borne de route ancienne, et il y a dedans trois formes ovales, grises, grosses comme des têtes d'enfant.",
    "§ Trois œufs. Amaury de Valombre n'a pas menti sur ce point.",
    "Vous redescendez avant que le vent tourne.",
  ],
  effets:{ flags:['wy_sait_couvee','wy_reco_nid'], cout:{ endurance:8 },
           exploit:{ eclat:4, temoins:'quelques', quoi:"vous êtes monté voir le nid" },
           marque:"Trois œufs dans le nid, bâti autour d'une borne de route ancienne.", court:"Trois œufs" },
  suite:'wy_bracq', libelleSuite:"Redescendre" },

wy_nid_reco_cout:{
  texte:[
    "Vous montez, et à quatre-vingts pieds une plaque de schiste de la taille d'une porte se détache sous votre pied gauche.",
    "Vous ne tombez pas. Vous restez suspendu à trois doigts de la main droite pendant le temps qu'il faut à quatre cents livres de pierre pour atteindre le bas de la falaise, et c'est un temps très long.",
    { sobre:"Vous vous rétablissez. L'épaule droite n'est plus tout à fait à sa place.",
      intense:"Vous vous rétablissez à la force d'un bras et l'épaule droite fait un bruit qu'on entend de l'intérieur du crâne. Ce n'est pas une luxation. C'est quelque chose qui a glissé et qui est revenu, et qui recommencera.",
      extreme:"Vous vous rétablissez à la force d'un bras. L'épaule droite fait un bruit mouillé qu'on entend de l'intérieur du crâne, la tête humérale sort et rentre sous la peau, et pendant six secondes le bras entier ne répond plus du tout." },
    "Vous voyez le nid quand même. Trois œufs, gris, calés contre une borne ancienne.",
    "La descente prend deux fois plus de temps que la montée.",
  ],
  effets:{ flags:['wy_sait_couvee','wy_reco_nid'], cout:{ endurance:20 },
           blessure:{ id:'epaule', zone:"Épaule droite", type:"tête humérale déboîtée puis remise",
                      gravite:2, douleur:3, saignement:0, fonction:['force','epees','armes_lourdes'],
                      cicatrice:"une épaule qui ressort au froid" },
           marque:"Vous avez vu les trois œufs, et votre épaule droite ne sera plus jamais fiable.", court:"L'épaule" },
  suite:'wy_bracq', libelleSuite:"Redescendre" },

wy_nid_reco_ko:{
  texte:[
    "Vous montez soixante pieds et vous vous arrêtez.",
    "Ce n'est pas la peur : c'est le calcul. Au-dessus, le schiste devient une pente d'ardoises empilées qui bougent quand on les regarde, il fait nuit dans une heure, et il n'y a pas un seul point d'amarrage sur les quatre-vingts pieds restants.",
    "§ Il y a un âge où l'on redescend, et c'est en général l'âge où l'on est encore vivant.",
    "Bracq ne dit rien quand vous revenez. Il vous tend une gourde et il ne dit rien, ce qui est la chose la plus polie qu'un homme puisse faire dans ce cas.",
  ],
  effets:{ cout:{ endurance:12, moral:5 } },
  suite:'wy_bracq', libelleSuite:"Revenir aux balistes" },

wy_nid_reco_cata:{
  texte:[
    "La plaque part à quatre-vingt-dix pieds et emporte les deux prises.",
    "Vous tombez douze pieds sur une vire en pente, vous rebondissez, et vous vous arrêtez parce qu'un ressaut de schiste vous prend en travers du flanc.",
    { sobre:"Deux côtes cèdent. Vous restez sur cette vire vingt minutes avant de pouvoir vous relever.",
      intense:"Deux côtes cèdent du côté gauche avec un bruit sec de branche verte. La douleur n'arrive pas tout de suite ; ce qui arrive tout de suite, c'est l'impossibilité d'inspirer. Vous restez sur cette vire vingt minutes, à quatre-vingts pieds, à essayer de reprendre un souffle qui ne revient que par tiers.",
      extreme:"Deux côtes cèdent du côté gauche avec un bruit sec de branche verte, et la troisième s'enfonce vers l'intérieur. Le goût qui monte dans la bouche est celui du fer. Vous restez sur cette vire vingt minutes, à quatre-vingts pieds au-dessus du gué, à cracher rouge dans la neige en essayant de reprendre un souffle qui ne revient que par tiers." },
    "La descente prend une heure et demie. Bracq et deux servants viennent vous chercher aux trente derniers pieds.",
    "§ Vous n'avez pas vu le nid.",
  ],
  effets:{ cout:{ endurance:30, vitalite:15, moral:10 },
           blessure:{ id:'cotes', zone:"Côtes gauches", type:"deux fêlées, une enfoncée",
                      gravite:3, douleur:4, saignement:1, fonction:['endurance','agilite','furtivite'],
                      traitement:null, cicatrice:"un flanc qui siffle par temps froid" },
           marque:"Vous êtes tombé de la falaise de Cendrepont et vous vous êtes brisé le flanc gauche.", court:"Le flanc" },
  suite:'wy_bracq', libelleSuite:"Redescendre" },

/* ══ LE RELAIS DE SEL ═══════════════════════════════════════════════════ */
wy_gassien:{
  lieu:"Bas du gué · le relais de sel · trois lieues plus bas",
  titre:"Le Lièvre",
  qui:'gassien',
  texte:[
    "Le relais de sel du bas du gué est une baraque de planches et un enclos, avec onze mules, quatre hommes, et beaucoup plus de sel que n'en justifie une baraque de planches.",
    "Gassien le Lièvre a quarante ans, un manteau de bonne coupe sur des bottes de charretier, et cette façon de vous voir arriver depuis quatre cents pas sans jamais lever la tête de ce qu'il fait.",
    "« Le Paria de Valombre. »",
    "Il se redresse enfin, s'essuie les mains, et sourit — un vrai sourire, chaleureux, et absolument sans rapport avec ce qui se passe derrière ses yeux.",
    "« On m'a dit que vous montiez. Vous voulez du sel ? Personne ne veut jamais de sel et pourtant tout le monde en achète. »",
    "§ Derrière lui, sur la table de l'enclos, il y a deux caisses ouvertes. Elles sont garnies de laine cardée.",
  ],
  choix:[
    { t:"« Vous rabattez les caravanes sous le nid. »",
      detail:"Volonté — l'accusation, à froid, sans preuve, en le regardant",
      risque:"risqué",
      test:{ carac:'volonte', comp:null, dc:13, manoeuvre:'accusation', adversaire:'gassien' },
      degres:{ dominante:'wy_gassien_dom', nette:'wy_gassien_ok', couteuse:'wy_gassien_cout',
               echec:'wy_gassien_ko', catastrophe:'wy_gassien_cata' } },
    { t:"Poser le relevé du péage sur la table",
      detail:"Son sel passe gratuitement depuis l'automne · et il n'y a qu'une explication",
      si:() => a('wy_releve_peage'),
      risque:"favorable", va:'wy_gassien_dom',
      effets:{ flags:['wy_gassien_confondu'] } },
    { t:"Lui parler de la laine cardée",
      detail:"Perception — deux caisses garnies, dans un relais de sel",
      si:() => a('wy_sait_laine'),
      risque:"favorable",
      test:{ carac:'perception', comp:null, dc:10, manoeuvre:'laine', adversaire:'gassien' },
      degres:{ dominante:'wy_gassien_dom', nette:'wy_gassien_ok', echec:'wy_gassien_ko' } },
    { t:"Ne rien dire, tout regarder, et repartir",
      detail:"On ne prévient pas un homme qu'on a compris",
      va:'wy_prepa',
      effets:{ flags:['wy_gassien_ignore'],
               marque:"Vous avez vu les caisses de laine chez Gassien et vous n'avez rien dit.", court:"Rien dit" } },
  ],
},

wy_gassien_dom:{
  qui:'gassien',
  texte:[
    "Il ne nie pas. C'est la première surprise.",
    "« Trois caravanes. » Il se rassied sur la caisse et croise les mains. « Vous voulez les chiffres exacts ou la version courte ? »",
    "« Les chiffres. »",
    "« Quatorze morts, pas onze — la maison de Valombre en compte onze parce que trois n'étaient pas déclarés au péage et qu'un mort non déclaré coûte moins cher qu'un mort déclaré. »",
    "Il dit ça sans la moindre gêne, du ton d'un homme qui corrige une erreur de comptabilité.",
    "« Ce que je fais : je tiens le relais du bas. Les caravanes s'arrêtent chez moi, je leur dis que la route est libre, et je leur conseille de partir à la troisième heure. La bête chasse à la troisième heure. »",
    "§ « Je ne les tue pas, messire. Je les renseigne mal. C'est très différent devant un juge, et j'ai vérifié. »",
    "@« Et pourquoi ? »",
    "« Parce qu'une bête qui a mangé revient au nid et y reste douze heures. Parce que pendant ces douze heures, on peut monter. Et parce que la seule fois où l'on est monté sans qu'elle ait mangé, j'ai perdu deux hommes et une main sur trois. »",
    "Il montre l'enclos, les caisses de laine, les onze mules.",
    "« Un œuf sorti vivant du nid vaut mille couronnes à Port-Noir. J'en ai déjà sorti un à l'automne, avant que la maison s'en mêle. Il en reste trois. »",
    "« Le fils de Valombre a mis six semaines à comprendre ce que je faisais, et trois jours à demander sa part. »",
  ],
  effets:{ flags:['wy_verite','wy_gassien_avoue','wy_amaury_complice'],
           exploit:{ eclat:6, temoins:'un', quoi:"vous avez fait avouer Gassien le Lièvre" },
           marque:"Gassien rabat les caravanes sous le nid pour vider les œufs pendant que la bête digère. Amaury est de moitié.", court:"La vérité" },
  suite:'wy_gassien_choix',
},

wy_gassien_ok:{
  qui:'gassien',
  texte:[
    "Le sourire tient trois secondes de trop, ce qui, chez un homme qui sourit aussi bien, revient à s'effondrer.",
    "« Vous avez de l'imagination. »",
    "« J'ai deux caisses de laine cardée sur votre table et un relais de sel qui ne vend pas de sel. »",
    "Il regarde les caisses. Il regarde la baraque. Il calcule ce qu'il peut encore nier et il arrive au bon résultat.",
    "« On monte pendant qu'elle digère. Douze heures après un repas, elle ne bouge plus du nid mais elle ne voit plus rien non plus. »",
    "§ « Je ne tue personne, messire. Je conseille mal les départs. Nuance juridique, et je l'ai fait vérifier. »",
    "Il ne dit rien d'Amaury. Vous savez qu'il y a un et il ne dit rien.",
  ],
  effets:{ flags:['wy_verite','wy_gassien_avoue'],
           exploit:{ eclat:4, temoins:'un', quoi:"vous avez fait plier Gassien" },
           marque:"Gassien avoue rabattre les caravanes pour vider le nid pendant la digestion.", court:"Il avoue" },
  suite:'wy_gassien_choix',
},

wy_gassien_cout:{
  qui:'gassien',
  texte:[
    "Il avoue. Il avoue même vite, et beaucoup, et c'est précisément le problème : un homme qui avoue en quatre minutes ce qu'il cache depuis six mois est un homme qui a déjà décidé de la suite.",
    "Le premier de ses quatre hommes est derrière vous depuis un moment.",
    { sobre:"Le coup arrive au-dessus de l'oreille et le monde bascule d'un quart.",
      intense:"Le manche de pioche arrive au-dessus de l'oreille gauche. Le monde bascule d'un quart et le son disparaît, remplacé par une note unique et très haute qui restera trois jours.",
      extreme:"Le manche de pioche arrive au-dessus de l'oreille gauche avec un bruit de melon. Le monde bascule d'un quart, le son disparaît sous une note unique et très haute, et quelque chose de chaud descend le long de la mâchoire avant même que la douleur commence." },
    "Vous ne tombez pas. C'est probablement la seule raison pour laquelle vous êtes encore vivant : les trois autres attendaient de voir si vous tombiez.",
    "Vous vous retournez, l'épée sort, et personne n'avance.",
    "§ « Bon », dit Gassien, très calme, sans se lever de sa caisse. « On va dire que ça n'a pas eu lieu et je vais tout vous raconter, parce que je préfère très largement ça à ce qui se passera si vous restez debout encore dix secondes. »",
    "Et il raconte tout.",
  ],
  effets:{ flags:['wy_verite','wy_gassien_avoue','wy_amaury_complice','wy_gassien_ennemi'],
           blessure:{ id:'tempe', zone:"Tempe gauche", type:"choc, oreille qui siffle",
                      gravite:2, douleur:3, saignement:1, fonction:['perception','furtivite'],
                      cicatrice:"une entaille dans le cuir chevelu" },
           marque:"Vous avez pris un manche de pioche au relais de sel, et Gassien a tout dit après.", court:"La tempe" },
  suite:'wy_gassien_choix',
},

wy_gassien_ko:{
  qui:'gassien',
  texte:[
    "@« Vous rabattez les caravanes sous le nid. »",
    "Il ne bouge pas d'un cil.",
    "« Je vends du sel. »",
    "Et il continue de vendre du sel pendant un quart d'heure, avec une patience de saint, en répondant à côté de chaque question avec une précision qui n'est possible que chez un homme qui a préparé cet entretien.",
    "§ Quand vous repartez, il vous accompagne jusqu'à la barrière et vous serre la main.",
    "« Bonne chasse, messire. Sincèrement. »",
    "Le pire, c'est qu'il est sincère.",
  ],
  effets:{ flags:['wy_gassien_prevenu'],
           marque:"Gassien sait que vous savez, et il n'a rien lâché.", court:"Il sait que vous savez" },
  suite:'wy_prepa', libelleSuite:"Remonter" },

wy_gassien_cata:{
  qui:'gassien',
  texte:[
    "L'accusation sort mal. Trop haut, trop tôt, devant quatre de ses hommes — et Gassien le Lièvre a quarante ans, un relais isolé, et exactement zéro raison de laisser un mercenaire l'accuser à voix haute devant son personnel.",
    "Il ne donne pas d'ordre. Il se contente de reculer d'un pas.",
    { sobre:"Ils s'y mettent à quatre. Vous ressortez de l'enclos.",
      intense:"Ils s'y mettent à quatre, avec des manches de pioche et un fléau de battage, dans un enclos de vingt pieds où l'on ne peut pas reculer. Vous en couchez deux et vous ressortez, et ce qui vous ressort n'est plus tout à fait entier.",
      extreme:"Ils s'y mettent à quatre, avec des manches de pioche et un fléau de battage, dans un enclos de vingt pieds. Vous ouvrez le premier de l'épaule à la hanche et il met un temps déraisonnable à s'en apercevoir. Le deuxième perd trois doigts en levant les bras. Les deux autres reculent. Vous ressortez de l'enclos, et ce qui ressort n'est plus tout à fait entier." },
    "Le fléau vous a pris le genou droit de côté, une fois, à pleine volée.",
    "§ « Ne redescendez pas ici », dit Gassien depuis la barrière, sans élever la voix. « Je n'ai rien contre vous. Mais ne redescendez pas ici. »",
  ],
  effets:{ flags:['wy_gassien_ennemi','wy_gassien_prevenu'],
           cout:{ vitalite:20, endurance:25, moral:10 },
           blessure:{ id:'genou', zone:"Genou droit", type:"ligament arraché, articulation instable",
                      gravite:3, douleur:3, saignement:0, fonction:['agilite','furtivite','equitation'],
                      cicatrice:"un genou qui lâche sans prévenir" },
           marque:"Vous avez perdu un genou dans un enclos à sel pour une accusation mal posée.", court:"Le genou" },
  suite:'wy_prepa', libelleSuite:"Remonter" },

wy_gassien_choix:{
  qui:'gassien',
  texte:[
    "Il attend. Il ne supplie pas, ne menace pas, ne se lève même pas de sa caisse.",
    "« Vous avez trois façons de finir cette conversation, messire, et je vais vous les donner parce que vous les trouverez tout seul de toute façon. »",
    "^« Vous me tuez. Personne ne me pleure, mes quatre hommes se dispersent, et le fils de Valombre trouve quelqu'un d'autre dans le mois — il a l'argent et il a maintenant l'idée, et l'idée est la partie difficile. »",
    "^« Vous me livrez. Le prévôt me pend ou ne me pend pas selon ce qu'il touche, et dans les deux cas le nom du fils de Valombre sort au procès, et la maison qui vous paie tombe avec moi. »",
    "§ « Ou vous prenez ma part. Trois œufs, mille couronnes pièce, je fournis les caisses, les mules et l'homme qui sait les tenir chauds. »",
    "^« Je ne vous conseille rien. Je constate que vous êtes payé deux cent cinquante couronnes pour un travail qui en vaut trois mille. »",
  ],
  choix:[
    { t:"Le tuer",
      detail:"Force · épées — quatre hommes dans un enclos de vingt pieds",
      risque:"risqué",
      test:{ carac:'force', comp:'epees', dc:12, manoeuvre:'enclos', adversaire:'gassien', cout:{ endurance:15 } },
      degres:{ dominante:'wy_gassien_mort', nette:'wy_gassien_mort', couteuse:'wy_gassien_mort_cout',
               echec:'wy_gassien_cata', catastrophe:'wy_gassien_cata' },
      ferme:"Ferme : ce que Gassien pouvait encore dire d'Amaury",
      definitif:true },
    { t:"Le laisser, et tout garder pour le retour",
      detail:"Un homme vivant qui a avoué est une pièce ; un homme mort n'est rien",
      va:'wy_prepa',
      effets:{ flags:['wy_gassien_vivant'],
               marque:"Vous avez laissé Gassien vivant, avec ce qu'il vous a dit.", court:"Vivant" } },
    { t:"Prendre sa part",
      detail:"+1000 couronnes à la livraison · et vous devenez la troisième main",
      ferme:"Ferme : ce que vous étiez en descendant de ce gué",
      definitif:true, va:'wy_prepa',
      effets:{ flags:['wy_associe_gassien'],
               marque:"Vous avez pris votre part du trafic d'œufs de Cendrepont.", court:"Associé" } },
  ],
},

wy_gassien_mort:{
  texte:[
    { sobre:"Ça prend le temps que ça prend. Ses quatre hommes ne restent pas.",
      intense:"Il ne se lève même pas de sa caisse. La pointe entre sous le sternum et remonte, et Gassien le Lièvre passe les quatre dernières secondes de sa vie à regarder ses propres mains comme s'il y cherchait une erreur de calcul. Ses quatre hommes ne restent pas.",
      extreme:"Il ne se lève même pas de sa caisse. La pointe entre sous le sternum, remonte, et trouve ce qu'elle cherche : il se vide vers l'intérieur, la bouche pleine, sans un cri, en regardant ses propres mains comme s'il y cherchait une erreur de calcul. Ses quatre hommes voient la couleur de ce qui sort et ne restent pas." },
    "§ Il avait raison sur un point : personne ne le pleure.",
    "Il avait raison sur l'autre aussi. Amaury de Valombre a l'argent, il a l'idée, et l'idée est la partie difficile.",
  ],
  effets:{ flags:['wy_gassien_mort'], cout:{ endurance:10 },
           exploit:{ eclat:5, temoins:'quelques', quoi:"vous avez tué Gassien le Lièvre chez lui" },
           marque:"Vous avez tué Gassien le Lièvre dans son enclos à sel.", court:"Gassien est mort" },
  suite:'wy_prepa', libelleSuite:"Remonter au gué" },

wy_gassien_mort_cout:{
  texte:[
    "Il se lève, lui. C'est la seule chose qu'il fait de travers dans toute l'affaire.",
    { sobre:"Ça finit quand même. L'un de ses hommes vous ouvre l'avant-bras avant de fuir.",
      intense:"Ça finit quand même, mais le troisième de ses hommes — un gamin de dix-neuf ans avec une serpe à sel — vous ouvre l'avant-bras gauche sur six pouces avant de comprendre qu'il devrait courir. Il court ensuite. Il court très bien.",
      extreme:"Ça finit quand même. Mais le troisième de ses hommes — un gamin de dix-neuf ans avec une serpe à sel — vous ouvre l'avant-bras gauche sur six pouces, jusqu'au tendon, et le sang gicle en pulsations régulières sur la paroi de la baraque avant que vous ayez serré le poing dessus. Il court ensuite. Il court très bien." },
    "§ Un enclos, quatre hommes, et une serpe : c'est comme ça qu'on meurt, quand on meurt bêtement.",
  ],
  effets:{ flags:['wy_gassien_mort'], cout:{ endurance:15, vitalite:10 },
           exploit:{ eclat:5, temoins:'quelques', quoi:"vous avez tué Gassien le Lièvre chez lui" },
           blessure:{ id:'avantbras', zone:"Avant-bras gauche", type:"ouvert jusqu'au tendon",
                      gravite:2, douleur:2, saignement:2, fonction:['lutte','bouclier','force'],
                      cicatrice:"six pouces de bourrelet blanc" },
           marque:"Vous avez tué Gassien et pris une serpe à sel dans l'avant-bras.", court:"L'avant-bras" },
  suite:'wy_prepa', libelleSuite:"Remonter au gué" },

};
Object.assign(ARC_WYVERNE, ARC_WYVERNE_3);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 4 — LA PRÉPARATION ET LE PREMIER ÉCHANGE
 *
 * Tout ce que l'enquête a rendu se paie ici, en points de situation. Savoir
 * qu'elle a une aile percée vaut deux points ; savoir qu'elle couve vaut une
 * manœuvre entière ; ne rien savoir vaut un homme au gué avec une épée.
 * ══════════════════════════════════════════════════════════════════════════ */

const ARC_WYVERNE_4 = {

wy_prepa:{
  lieu:"Le gué · le camp des balistes · la veille",
  titre:"Ce qu'on décide avant, on ne le décide pas pendant",
  texte:[
    "On ne dort pas au gué de Cendrepont. On y passe la nuit, ce qui n'est pas la même chose : le vent remonte la gorge à partir de minuit avec un bruit d'homme qui souffle dans une bouteille, et chaque fois qu'une plaque de schiste lâche là-haut, six servants de baliste se réveillent en même temps.",
    "Bracq fait chauffer de la poix pour rien, parce qu'un homme de cinquante ans qui ne dort pas a besoin de faire quelque chose de ses mains.",
    { sobre:"« Elle chasse à l'aube et au crépuscule. Le reste du temps, elle digère. »",
      intense:"« Elle chasse à l'aube et au crépuscule, messire. Le reste du temps, elle digère, et une bête de douze cents livres qui digère un cheval entier ne bouge pas plus qu'un tas de gravats. Douze heures. C'est ça, la fenêtre. »",
      extreme:"« Elle chasse à l'aube et au crépuscule, messire. Le reste du temps, elle digère, et une bête de douze cents livres qui a avalé un cheval par tiers ne bouge pas plus qu'un tas de gravats. Elle pue à quarante pas. On voit la bosse de ce qu'elle a mangé remonter et redescendre sous la peau du cou. Douze heures. C'est ça, la fenêtre. »" },
    "§ La Grise. C'est comme ça qu'on l'appelle en bas, du nom de la route qu'elle a fermée.",
    "Trente-quatre pieds d'envergure, la couleur exacte du schiste mouillé, le ventre ivoire sale d'une vieille dent. Pas de bras : deux pattes, deux ailes, et à l'arrière de chaque patte un ergot recourbé de sept pouces dont Bracq dit qu'il vaut mieux ne pas être griffé même sans profondeur, parce que ce qui est dessus vient de ce qu'elle mange et que ce qu'elle mange est mort depuis trois semaines.",
    "Demain, à l'aube, quelqu'un de cette vallée va mourir. La seule chose encore ouverte est le nom de cette personne, et la façon dont ça se passera.",
  ],
  choix:[
    { t:"Empoisonner le garde-manger",
      si:() => a('wy_sait_couvee'),
      detail:"Elle rapporte les organes aux petits · aconit et digitale dans le mulet · Intellect + alchimie contre 9",
      risque:"aléatoire",
      test:{ carac:'intellect', comp:'alchimie', dc:9, adversaire:'grise', manoeuvre:'poison',
             situation:() => a('wy_deja_monte') ? 2 : 0 },
      degres:{ dominante:'wy_ouv_poison_dom', couteuse:'wy_ouv_poison_cout', echec:'wy_ouv_poison_ko' } },

    { t:"Monter au nid avant l'aube, pendant qu'elle digère",
      si:() => a('wy_reco_nid') || a('wy_sait_gassien'),
      detail:"Cent quarante pieds de schiste dans le noir · Agilité + furtivité contre 10",
      risque:"très dangereux",
      test:{ carac:'agilite', comp:'furtivite', dc:10, adversaire:'grise', manoeuvre:'escalade',
             situation:() => (a('wy_deja_monte') ? 3 : 0) + (a('wy_sait_gassien') ? 1 : 0) },
      degres:{ dominante:'wy_ouv_nid_dom', couteuse:'wy_ouv_nid_cout', echec:'wy_ouv_nid_ko' } },

    { t:"La faire descendre dans l'axe des balistes",
      si:() => a('wy_bracq_allie'),
      detail:"Une mule vivante attachée au milieu du gué · quatre-vingts pas de portée utile · six servants",
      va:'wy_ouv_baliste' },

    { t:"L'attendre au gué, à découvert",
      detail:"Le passage rouvert, une caravane engagée, et vous entre les deux",
      ferme:"Ferme : toute possibilité que ça se passe discrètement",
      risque:"définitif", definitif:true, va:'wy_ouv_gue' },

    { t:"Descendre seul, de nuit, sans prévenir personne",
      detail:"Aucun témoin · aucun renom · aucun secours",
      ferme:"Ferme : que quiconque puisse raconter ce que vous avez fait ici",
      risque:"définitif", definitif:true, va:'wy_ouv_seul',
      effets:{ flags:['wy_sans_temoin'] } },
  ],
},

/* ── Ouverture · le poison ───────────────────────────────────────────────── */
wy_ouv_poison_dom:{
  texte:[
    "Il faut trois heures dans le froid, une corde, et un mulet mort depuis quatre jours qu'il faut rouvrir sans se faire vomir dessus par le vent.",
    { sobre:"Vous glissez l'aconit et la digitale dans les organes qu'elle n'a pas encore prélevés, et vous refermez proprement.",
      intense:"Vous rouvrez la cavité par la fente qu'elle a faite elle-même, vous écartez ce qui est resté, et vous placez la racine d'aconit pilée et les feuilles de digitale exactement là où elles seront prises : dans le foie, dans les poumons, dans le mou. Puis vous rabattez la peau et vous massez le pelage à rebrousse-poil pour effacer les traces de mains.",
      extreme:"Vous rouvrez la cavité par la fente qu'elle a faite elle-même. Ce qui reste dedans a quatre jours et la consistance d'une soupe froide ; ça vous monte jusqu'aux coudes et ça ne partira pas avant trois lavages. Vous placez la racine d'aconit pilée et la digitale dans le foie, dans les poumons, dans tout ce qui est mou et qu'elle emporte, parce que c'est le mou qu'on donne à ce qui n'a pas de dents. Puis vous rabattez la peau, vous massez le pelage à rebrousse-poil, et vous redescendez avec les avant-bras qui sentent quelque chose dont vous vous souviendrez à table pendant un mois." },
    "§ On n'empoisonne pas une wyverne. On empoisonne ce qu'elle rapporte.",
    "Au petit matin, elle vient chercher. Elle emporte le mulet à moitié, elle remonte, et pendant une heure il ne se passe rien du tout.",
    "Puis il se passe quelque chose là-haut. Un cri qui n'est pas un cri de chasse — plus haut, plus court, répété quatre fois — et un long raclement d'ailes contre la paroi.",
    "Quand elle redescend, elle descend mal. L'aile gauche bat un demi-temps en retard et elle ne tient pas la ligne : elle dérive vers la rivière et se rattrape à chaque fois d'un coup de reins qui lui coûte de la hauteur.",
    "Bracq vous regarde comme on regarde un homme qui vient de faire une chose qu'on désapprouve profondément et dont on va profiter.",
    "« Vous avez tué les petits. »",
    "« Oui. »",
    "« Bien. »",
    "§ Il ne le pense pas. Il le dit parce qu'il a six servants qui écoutent.",
  ],
  effets:{ flags:['wy_avantage_poison','wy_couvee_morte'], cout:{ endurance:15, concentration:5 },
           exploit:{ eclat:6, temoins:'quelques', quoi:"vous avez empoisonné la couvée avant le combat" },
           marque:"Vous avez empoisonné la couvée de Cendrepont dans un mulet mort.", court:"La couvée" },
  suite:'wy_combat_1', libelleSuite:"Elle descend" },

wy_ouv_poison_cout:{
  texte:[
    "Vous montez, vous ouvrez, vous placez — et à mi-chemin du retour le vent tourne.",
    "Elle rentre trois heures avant l'heure. Vous êtes à quarante pieds de la vire, sur la corde, exposé sur toute la longueur de la falaise, et il n'existe aucune version de cette situation où vous êtes autre chose qu'un objet accroché à un mur.",
    { sobre:"Elle passe. Elle ne vous voit pas. Vous restez immobile onze minutes.",
      intense:"Elle passe à vingt pieds. L'air qu'elle déplace vous décolle de la paroi et vous rabat dessus, l'épaule d'abord. Elle ne tourne pas la tête : ce qui pend contre du schiste gris et ne bouge pas n'est pas de la nourriture. Vous restez comme ça onze minutes, la joue contre la pierre, à compter vos propres battements de cœur pour ne pas compter autre chose.",
      extreme:"Elle passe à vingt pieds. L'air qu'elle déplace vous décolle de la paroi et vous rabat dessus, l'épaule d'abord, et l'odeur arrive avec — charogne tiède, ammoniac, quelque chose de sucré en dessous qui est le pire des trois. Elle ne tourne pas la tête : ce qui pend contre du schiste et ne bouge pas n'est pas de la nourriture. Vous restez onze minutes la joue contre la pierre, avec du sang de mulet séché jusqu'aux coudes, à compter vos battements de cœur pour ne pas compter autre chose." },
    "Le poison prendra. Il a pris : on l'entend, au lever du jour, à ce cri court répété quatre fois qui n'a rien à voir avec la chasse.",
    "Mais vous avez laissé douze pieds de corde neuve accrochés à la vire, et vous avez perdu la nuit.",
    "§ On paie toujours. La seule question est de savoir en quoi.",
  ],
  effets:{ flags:['wy_avantage_poison','wy_couvee_morte'], cout:{ endurance:28, concentration:12, moral:5 },
           exploit:{ eclat:6, temoins:'un', quoi:"vous avez empoisonné la couvée avant le combat" },
           marque:"Vous avez empoisonné la couvée — et passé onze minutes à vingt pieds d'elle.", court:"La couvée" },
  suite:'wy_combat_1', libelleSuite:"Elle descend" },

wy_ouv_poison_ko:{
  texte:[
    "L'aconit de février n'est pas l'aconit d'août. Vous le savez en le ramassant, vous le faites quand même, parce qu'il n'y a rien d'autre à trois lieues et que l'alchimie n'a jamais été ce que vous savez faire de mieux.",
    "Elle emporte le mulet à l'aube. Elle remonte. Il ne se passe rien du tout.",
    { sobre:"Rien, sauf qu'elle sait maintenant qu'on touche à sa réserve.",
      intense:"Rien — sauf qu'à la troisième heure elle redescend sur la vire, tourne autour de la carcasse rouverte, et la pousse du museau deux fois avant de la basculer dans le vide. Elle sait qu'on y a mis les mains. Elle ne sait pas qui. Elle saura ce soir.",
      extreme:"Rien — sauf qu'à la troisième heure elle redescend sur la vire, tourne autour de la carcasse rouverte, la pousse du museau, et la bascule dans le vide. Quatre cents livres de mulet en décomposition arrivent en bas dans un bruit qu'aucun des six servants n'oubliera, et éclatent. Elle sait qu'on y a mis les mains. Elle ne sait pas encore qui." },
    "§ Une bête qui se méfie est une bête qui ne descend pas droit.",
    "Vous avez perdu la nuit, vous avez perdu la surprise, et vous avez appris quelque chose sur vos propres limites : il y a des métiers qu'on n'apprend pas la veille.",
  ],
  effets:{ flags:['wy_mefiante'], cout:{ endurance:20, moral:8 },
           marque:"Vous avez raté l'empoisonnement et prévenu la bête.", court:"Elle se méfie" },
  suite:'wy_combat_1', libelleSuite:"Elle descend" },

/* ── Ouverture · le nid ──────────────────────────────────────────────────── */
wy_ouv_nid_dom:{
  texte:[
    "Trois heures avant l'aube, par la cheminée est, dans le noir complet et le vent qui rabat votre odeur vers la rivière.",
    "Vous arrivez sur la plateforme du nid à l'heure la plus longue de la nuit, celle où même les gens qui veillent ne veillent plus vraiment.",
    { sobre:"Elle dort sur le flanc, autour de la borne, la tête sous l'aile.",
      intense:"Elle dort sur le flanc gauche, enroulée autour de la borne, la tête repliée sous l'aile droite. Le cou fait une masse pâle où l'on voit encore, sous la peau, la bosse de ce qu'elle a mangé hier remonter et redescendre au rythme d'une chose qui n'est pas la respiration. Douze cents livres. À douze pieds. Endormie.",
      extreme:"Elle dort sur le flanc gauche, enroulée autour de la borne, la tête sous l'aile droite. Sous la peau du cou, la bosse de ce qu'elle a avalé hier remonte et redescend lentement, indépendamment du souffle, comme un poing qui se déplacerait dans un sac. Le nid est un lit de vingt ans de restes : des os longs, des essieux, un crâne de bœuf, un soulier d'enfant, et par-dessus tout ça un tapis de fiente blanche épais comme une main. Douze cents livres. À douze pieds. Endormie." },
    "§ Un homme raisonnable la tue maintenant, dans son sommeil, et rentre déjeuner.",
    "Il y a deux difficultés, et un homme raisonnable les connaît aussi. La première : à douze pieds, la seule chose qui tue une wyverne d'un coup est la moelle, sous l'occiput, et l'occiput est sous l'aile. La seconde : les œufs sont là, trois, gros comme des barriques de sel, tièdes, et le quatrième est éclos.",
    "Le petit vous regarde. Il fait la taille d'un chien de berger, il a la couleur de la craie, et il ne fait aucun bruit.",
    "Il ne fait aucun bruit parce qu'il n'a pas encore appris à en faire.",
  ],
  effets:{ flags:['wy_avantage_hauteur','wy_vu_le_petit','wy_sait_couvee'], cout:{ endurance:22, concentration:10 },
           exploit:{ eclat:8, temoins:'aucun', quoi:"vous êtes monté au nid pendant qu'elle dormait" },
           marque:"Vous êtes monté au nid de nuit. Il y a trois œufs et un petit éclos.", court:"Le nid" },
  suite:'wy_combat_1', libelleSuite:"Frapper" },

wy_ouv_nid_cout:{
  texte:[
    "Vous arrivez sur la plateforme du nid, et le nid n'est pas vide de choses qui bougent.",
    { sobre:"Vous posez la main sur quelque chose de tiède qui se met à crier.",
      intense:"Votre main gauche se pose, dans le noir, sur quelque chose de tiède et de mou qui n'était pas de la pierre — et ce quelque chose se met à crier. Ce n'est pas un cri d'oiseau. C'est un sifflement montant, à deux notes, qui monte encore, et qui monte toujours.",
      extreme:"Votre main gauche se pose dans le noir sur quelque chose de tiède, mou et couvert d'un duvet gluant qui n'était pas de la pierre. Le petit vous mord — sans force, sans dents encore, une pression de nourrisson sur le tranchant de la paume — puis il se met à crier. Un sifflement à deux notes qui monte, monte encore, et ne s'arrête pas." },
    "Elle est debout avant que vous ayez retiré la main.",
    "§ Douze cents livres qui se lèvent à douze pieds font le bruit d'une charrette qui bascule.",
    "Vous avez la hauteur. Vous avez le dos au vide, cent quarante pieds derrière les talons, la moitié de votre souffle laissée dans la cheminée est, et vous avez perdu exactement la seule chose que vous étiez monté chercher.",
  ],
  effets:{ flags:['wy_avantage_hauteur','wy_vu_le_petit','wy_sait_couvee','wy_reveillee'],
           cout:{ endurance:35, concentration:15 },
           exploit:{ eclat:8, temoins:'aucun', quoi:"vous êtes monté au nid pendant qu'elle dormait" },
           marque:"Vous avez réveillé la Grise sur son nid, à cent quarante pieds.", court:"Réveillée" },
  suite:'wy_combat_1', libelleSuite:"Elle est debout" },

wy_ouv_nid_ko:{
  texte:[
    "À cent dix pieds, dans le noir, la cheminée est se referme en un boyau de deux pieds où il faut passer l'épaule d'abord.",
    { sobre:"Vous passez. Le schiste vous prend la hanche au passage.",
      intense:"Vous passez, parce qu'on passe toujours, et le schiste vous racle du coude à la hanche sur toute la longueur en emportant le cuir, la chemise et une bande de peau large comme deux doigts. Ça ne saigne presque pas. Ça brûle comme si ça saignait.",
      extreme:"Vous passez, parce qu'on passe toujours. Le schiste vous racle du coude à la hanche en emportant le cuir, la chemise, et une bande de peau large comme deux doigts sur quatorze pouces de long. Ça ne saigne presque pas — c'est une plaie de râpe, pas de lame — mais ça suinte, ça colle à tout ce qu'on met dessus, et pendant huit jours chaque mouvement du bras gauche rouvrira la même chose." },
    "Et de l'autre côté du boyau, à quarante pieds sous le nid, le vent tourne.",
    "Il tourne pour de bon : d'ouest en nord, en une minute, comme il fait dans cette gorge deux jours sur trois en février. Votre odeur monte droit au nid.",
    "§ Ce n'est pas le vent qui a décidé. C'est vous, en choisissant février.",
    "Vous redescendez plus vite que vous n'êtes monté, ce qui n'est jamais une bonne façon de descendre, et vous arrivez au camp au moment où Bracq fait tendre les balistes.",
    "« Elle est réveillée », dit-il. Ce n'est pas une question.",
  ],
  effets:{ flags:['wy_reveillee'], cout:{ endurance:38, moral:8 },
           blessure:{ id:'flanc', zone:"Flanc gauche", type:"râpé du coude à la hanche",
                      gravite:1, douleur:2, saignement:0, fonction:['agilite','furtivite'],
                      cicatrice:"une bande lisse et sans poils, quatorze pouces" },
           marque:"Vous avez raté la montée de nuit et réveillé la bête.", court:"Le flanc" },
  suite:'wy_combat_1', libelleSuite:"Redescendre au gué" },

/* ── Ouverture · les balistes ────────────────────────────────────────────── */
wy_ouv_baliste:{
  qui:'bracq',
  texte:[
    "« Quatre-vingts pas si elle descend en ligne. Rien du tout si elle tourne. »",
    "Bracq répète la même phrase pour la quatrième fois depuis hier, et pour la quatrième fois il a raison. Deux balistes de rempart démontées et remontées sur des affûts de campagne, orientées dans l'axe du gué, calées sur des rondins parce que le sol est gelé sur six pouces et boueux en dessous.",
    "L'appât est une mule. Elle a onze ans, un jarret perdu, et elle serait morte à l'abattoir dans quinze jours de toute façon — ce qui ne change rien à ce qu'elle a compris dès qu'on l'a attachée au milieu de trois cents pas de route vide.",
    { sobre:"Elle tire sur sa longe et elle crie. C'est un bruit désagréable.",
      intense:"Elle tire sur la longe jusqu'à ce que le licol lui entame la nuque, et elle crie. Pas un braiment : un cri qui monte et redescend, sans fin, et qui ne sert à rien parce qu'il n'y a personne pour venir. Les six servants regardent tous très attentivement leurs cordages.",
      extreme:"Elle tire sur la longe jusqu'à ce que le licol lui entame la nuque et fasse une ligne de sang qui coule dans le poil de l'encolure. Elle crie sans arrêt — un cri qui monte et redescend, laid, humain par moments. Un des servants, un gamin, demande à voix basse si on ne pourrait pas au moins lui bander les yeux. Bracq répond que non : c'est le mouvement qui la fait descendre, pas le bruit." },
    "§ Voilà ce que coûte une route rouverte, et personne à Valombre ne l'écrira jamais dans un registre.",
    "Vous vous placez à trente pas de la mule, du côté de la rivière, derrière un ressaut de schiste haut de quatre pieds. Votre travail n'est pas de la tuer. Votre travail est de faire en sorte qu'elle reste dans l'axe pendant les huit secondes qu'il faut à six hommes pour armer, viser et lâcher.",
    "L'aube arrive comme elle arrive en février : sans lever le jour, en éclaircissant simplement le gris.",
    "Puis le cri de la mule s'arrête net.",
  ],
  effets:{ flags:['wy_avantage_baliste'],
           marque:"Vous avez fait attacher une mule vivante au milieu du gué.", court:"L'appât" },
  suite:'wy_combat_1', libelleSuite:"Elle est là" },

/* ── Ouverture · le gué à découvert ──────────────────────────────────────── */
wy_ouv_gue:{
  texte:[
    "Rouvrir la route est le contrat. Personne n'a écrit qu'il fallait attendre qu'elle soit sûre.",
    "Vous faites passer une caravane. Quatre chariots de sel du bas du gué, quatorze hommes, vingt-deux bêtes, et un convoyeur qui vous demande deux fois si c'est bien prudent avant d'accepter parce que vous lui offrez le double du tarif d'hiver sur votre propre bourse.",
    "Ce n'est pas prudent. C'est de la chasse. La caravane est ce qui fait descendre la bête à un endroit où vous êtes, et pas à un endroit où vous n'êtes pas.",
    { sobre:"Vous marchez au milieu de la colonne, à découvert, et vous attendez.",
      intense:"Vous marchez au milieu de la colonne, à découvert, à trois cents pas de tout abri, et vous attendez. Les hommes chantent la première demi-heure. Ils ne chantent plus la deuxième. Au bout d'une heure il n'y a plus que le bruit des roues ferrées sur le schiste, vingt-deux respirations, et cent quarante pieds de falaise à main droite.",
      extreme:"Vous marchez au milieu de la colonne, à découvert. Les hommes chantent la première demi-heure. Ils ne chantent plus la deuxième. Au bout d'une heure il n'y a que le bruit des roues ferrées, vingt-deux respirations, et cent quarante pieds de falaise à main droite d'où descend, par intermittence, une odeur que personne ne commente." },
    "§ Quatorze hommes marchent avec vous parce que vous les payez. Ils ne savent pas qu'ils sont l'hameçon.",
    "Elle prend le troisième chariot.",
    "Elle ne descend pas : elle se laisse tomber le long de la paroi sans un battement d'aile, ouvre à trente pieds du sol, et la chose que vous retenez de cet instant n'est pas sa taille — c'est le silence. Douze cents livres arrivent sans faire un bruit jusqu'à ce qu'elles touchent.",
    "Ensuite, ça fait beaucoup de bruit.",
  ],
  effets:{ flags:['wy_caravane','wy_temoins_foule'], or:-60,
           marque:"Vous avez engagé une caravane vivante comme appât au gué.", court:"La caravane" },
  suite:'wy_combat_1', libelleSuite:"Courir" },

/* ── Ouverture · seul et sans témoin ─────────────────────────────────────── */
wy_ouv_seul:{
  texte:[
    "Vous partez du camp deux heures avant l'aube sans réveiller Bracq, parce qu'un homme de cinquante ans qui a six servants sous sa responsabilité vous demanderait de ne pas faire ça, et qu'il aurait raison.",
    "Vous laissez le cheval trois cents pas en amont. Vous laissez le manteau, parce qu'un manteau prend le vent. Vous gardez l'épée longue, deux dagues, une corde de vingt pieds, et rien d'autre — pas même une gourde, parce que le cuir crisse.",
    { sobre:"Vous descendez dans le lit de la rivière et vous remontez le gué par l'eau.",
      intense:"Vous descendez dans le lit de la rivière et vous remontez les trois cents pas du gué dans l'eau, jusqu'à mi-cuisse, en février. Au bout de cinquante pas les jambes cessent de faire mal. C'est plus inquiétant que quand elles faisaient mal.",
      extreme:"Vous descendez dans le lit de la rivière et vous remontez les trois cents pas du gué dans l'eau, jusqu'à mi-cuisse, en février. Au bout de cinquante pas les jambes cessent de faire mal, ce qui est plus inquiétant que quand elles en faisaient. Au bout de cent, vous ne sentez plus vos pieds et vous vous surprenez à poser chaque pas en regardant, comme un homme qui vérifie que ses jambes lui appartiennent encore." },
    "§ Personne ne verra ça. C'est tout l'intérêt, et c'est tout le prix.",
    "Le renom est une monnaie qui ne s'obtient que devant témoins, et vous venez de choisir d'être payé en autre chose : en pouvoir revenir dans cette vallée dans dix ans sans que personne se souvienne de votre visage.",
    "Elle vous trouve à l'endroit exact où le gué se resserre, parce que c'est là qu'elle trouve tout le monde.",
  ],
  effets:{ flags:['wy_avantage_eau'], cout:{ endurance:18 },
           marque:"Vous êtes descendu seul, de nuit, sans témoin.", court:"Seul" },
  suite:'wy_combat_1', libelleSuite:"Elle vous a trouvé" },

};
Object.assign(ARC_WYVERNE, ARC_WYVERNE_4);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 5 — LE COMBAT
 *
 *   POSITION → INTENTION → TEST → CONSÉQUENCE → NOUVELLE POSITION
 *
 * Trois échanges. Le joueur choisit une intention, jamais un résultat. Ce
 * qu'il a appris pendant l'enquête entre dans le calcul ; ce qu'il a cassé
 * en montant aussi. Répéter une manœuvre la rend lisible : elle apprend.
 * ══════════════════════════════════════════════════════════════════════════ */

/* Ce que l'enquête a payé, en points, au moment du jet. */
const situGrise = () =>
  (a('wy_avantage_poison') ? 3 : 0) +
  (a('wy_avantage_hauteur') ? 2 : 0) +
  (a('wy_avantage_baliste') ? 2 : 0) +
  (a('wy_avantage_eau') ? 1 : 0) +
  (a('wy_mefiante') ? -2 : 0) +
  (a('wy_reveillee') ? -2 : 0) +
  (a('wy_caravane') ? -1 : 0);

const ARC_WYVERNE_5 = {

/* ══ PREMIER ÉCHANGE ══════════════════════════════════════════════════════ */
wy_combat_1:{
  lieu:"Le gué de Cendrepont · aube · dix-neuvième année après la Purge",
  titre:"La Grise",
  melee:true,
  effets:{ melee:{ position:"à découvert", note:"Elle est entière" } },
  texte:[
    () => a('wy_avantage_hauteur')
      ? "Vous êtes sur la plateforme du nid, à cent quarante pieds, sur douze pieds de largeur utile, et derrière vos talons il n'y a plus rien du tout jusqu'à la rivière."
      : "Elle touche le sol à quarante pas, et le sol le fait savoir : le schiste gelé claque sous elle comme une vitre.",
    { sobre:"Trente-quatre pieds d'envergure. Elle replie et redevient plus petite qu'on ne l'imaginait, et beaucoup plus lourde.",
      intense:"Trente-quatre pieds d'envergure ouverte, puis elle replie, et la chose surprenante est qu'elle devient plus petite qu'on ne l'imaginait et infiniment plus lourde. Ce n'est pas un oiseau. C'est un taureau qui a des ailes à la place des épaules et qui se déplace par bonds courts, en avant, la tête basse, le cou tendu à l'horizontale.",
      extreme:"Trente-quatre pieds d'envergure, puis elle replie et devient plus petite qu'on ne l'imaginait et infiniment plus lourde. Ce n'est pas un oiseau : c'est un taureau qui a des ailes à la place des épaules, qui avance par bonds courts, tête basse, cou tendu à l'horizontale, et dont chaque expiration sort en jet visible avec des filaments accrochés aux commissures. Entre les dents recourbées il y a des choses qui sont restées là depuis plusieurs repas et qui ont noirci." },
    () => a('wy_avantage_poison')
      ? "§ Elle descend mal. L'aile gauche bat un demi-temps en retard, et elle sait ce que vous avez fait à ses petits."
      : (a('wy_reveillee')
        ? "§ Elle vous attendait. Ça change tout le reste."
        : "§ Elle n'a pas peur de vous. Rien dans son histoire ne lui a appris à avoir peur de quelque chose de votre taille."),
    () => a('wy_sait_fleches')
      ? "L'aile gauche porte, à mi-membrane, un trou fermé de la taille d'un poing, bordé d'un bourrelet blanc épais comme une corde. Un carreau de baliste, l'automne dernier, mal soigné. Une membrane recousue par la bête elle-même ne se retend jamais complètement : **elle ne peut plus virer serré à gauche.**"
      : "Il y a quelque chose de faux dans sa façon de tourner, et vous n'avez ni le temps ni le renseignement pour savoir quoi.",
    "Elle vous voit. Elle s'arrête. Elle incline la tête de côté, exactement comme une poule, ce qui devrait être ridicule et ne l'est pas du tout.",
    "Puis elle charge, et un homme apprend en une seconde et demie que douze cents livres qui accélèrent ne font pas de bruit de pas : elles font un bruit continu.",
  ],
  choix:[
    { t:"Lui ouvrir l'aile percée",
      si:() => a('wy_sait_fleches'),
      detail:"La cicatrice de baliste · elle ne vire pas serré à gauche · Agilité + épées contre 9",
      risque:"calculé",
      test:{ carac:'agilite', comp:'epees', dc:9, adversaire:'grise', manoeuvre:'aile',
             equipement:2, situation:() => situGrise() + 2 },
      degres:{ dominante:'wy_c1_aile_dom', couteuse:'wy_c1_aile_cout', echec:'wy_c1_aile_ko' } },

    { t:"La gorge, en montée, à l'instant où elle ouvre",
      detail:"Le seul moment où le cou est exposé · une demi-seconde · Force + épées contre 12",
      risque:"très dangereux",
      test:{ carac:'force', comp:'epees', dc:12, adversaire:'grise', manoeuvre:'gorge',
             equipement:2, situation:situGrise },
      degres:{ dominante:'wy_c1_gorge_dom', couteuse:'wy_c1_gorge_cout', echec:'wy_c1_gorge_ko' } },

    { t:"Encaisser la première charge et la laisser passer",
      detail:"Ne rien tenter · lire sa mécanique · Endurance + bouclier contre 7",
      risque:"prudent",
      test:{ carac:'endurance', comp:'bouclier', dc:7, adversaire:'grise', manoeuvre:'encaisser',
             equipement:1, situation:situGrise },
      degres:{ dominante:'wy_c1_tenir_dom', couteuse:'wy_c1_tenir_cout', echec:'wy_c1_tenir_ko' } },

    { t:"Passer dessous et lui prendre le jarret",
      detail:"Sous le poitrail, dans l'axe · les ergots passent au-dessus · Agilité + lutte contre 10",
      risque:"dangereux",
      test:{ carac:'agilite', comp:'lutte', dc:10, adversaire:'grise', manoeuvre:'jarret',
             situation:situGrise },
      degres:{ dominante:'wy_c1_jarret_dom', couteuse:'wy_c1_jarret_cout', echec:'wy_c1_jarret_ko' } },

    { t:"L'Onde",
      detail:"Ce que personne dans cette vallée n'a jamais vu faire à un homme · Volonté + Onde contre 10",
      ferme:() => a('wy_sans_temoin') ? null : "Ferme : l'idée que vous êtes un homme d'armes ordinaire",
      risque:"définitif", definitif:true,
      test:{ carac:'volonte', comp:'onde', dc:10, adversaire:'grise', manoeuvre:'onde',
             cout:{ concentration:25 }, situation:situGrise },
      degres:{ dominante:'wy_c1_onde_dom', couteuse:'wy_c1_onde_cout', echec:'wy_c1_onde_ko' } },
  ],
},

/* ── L'aile ──────────────────────────────────────────────────────────────── */
wy_c1_aile_dom:{
  melee:true,
  texte:[
    "Vous ne reculez pas devant la charge : vous vous décalez d'un pas et demi sur sa gauche, du côté où elle ne peut plus se refermer.",
    "Elle essaie quand même. C'est ça, le renseignement de Bracq : elle essaie quand même, parce qu'une bête ne sait pas qu'elle est infirme, elle sait seulement que certains mouvements font mal.",
    { sobre:"L'épée entre dans la membrane à hauteur de la vieille cicatrice et ouvre sur quatre pieds.",
      intense:"L'aile passe au-dessus de vous, tendue, et vous frappez de bas en haut dans la membrane à hauteur de la vieille cicatrice de baliste. Une membrane de wyverne tendue a la résistance d'une voile de bateau ; sous la pointe, elle ne coupe pas, elle **file**. La déchirure part du trou ancien et court sur quatre pieds jusqu'au bord d'attaque en faisant le bruit d'une toile qu'on ouvre.",
      extreme:"L'aile passe au-dessus de vous, tendue à craquer, et vous frappez de bas en haut dans la membrane à hauteur du vieux trou de carreau. Ça ne coupe pas : ça file. La déchirure part de la cicatrice et court sur quatre pieds jusqu'au bord d'attaque avec un bruit de toile ouverte, et par la fente s'ouvre une gerbe fine et régulière — la grande veine alaire, qui pisse à chaque battement et repeint le schiste sur dix pas à chaque fois qu'elle essaie de reprendre l'air." },
    "§ Elle ne volera plus aujourd'hui. Peut-être plus jamais.",
    "Elle recule pour la première fois de sa vie. Elle recule mal, en crabe, l'aile traînant sur la pierre, et elle crie — et c'est le premier cri de cette matinée qui ressemble à de la peur.",
  ],
  effets:{ flags:['wy_aile_ouverte'], cout:{ endurance:12 },
           meleeMaj:{ position:"vous tenez sa gauche", note:"Aile gauche ouverte · elle saigne · elle ne vole plus" },
           exploit:{ eclat:7, temoins:() => a('wy_sans_temoin') ? 'aucun' : (a('wy_caravane') ? 'foule' : 'quelques'),
                     quoi:"vous avez cloué une wyverne au sol d'un seul coup" } },
  suite:'wy_combat_2', libelleSuite:"Elle recule" },

wy_c1_aile_cout:{
  melee:true,
  texte:[
    "Vous prenez sa gauche et vous frappez à la cicatrice, et ça marche — la membrane file sur deux pieds.",
    "Ce qui ne marche pas, c'est ce que vous aviez oublié : quand une aile se déchire, la bête ne s'arrête pas. Elle bascule.",
    { sobre:"Douze cents livres vous passent dessus par le travers. Le genou droit prend le mauvais angle.",
      intense:"Douze cents livres partent en travers et vous roulent dessus, épaule contre hanche. Vous n'êtes pas écrasé — le schiste est en pente et vous partez avec elle — mais le genou droit reste une demi-seconde sous un poids qui n'a jamais été prévu pour ça, et quelque chose cède à l'intérieur avec la sensation exacte d'une lanière qu'on tranche.",
      extreme:"Douze cents livres partent en travers et vous roulent dessus, épaule contre hanche, et vous partez avec elle sur douze pieds de schiste gelé. Le genou droit reste une demi-seconde sous un poids qui n'a jamais été prévu pour ça et quelque chose cède dedans avec la sensation d'une lanière qu'on tranche. Vous vous relevez. Vous vous relevez parce qu'il n'y a pas d'autre option, et la jambe accepte de porter à condition qu'on ne lui demande pas de tourner." },
    "§ Elle ne volera plus aujourd'hui. Vous ne courrez plus aujourd'hui. On appelle ça un échange.",
  ],
  effets:{ flags:['wy_aile_ouverte'], cout:{ endurance:20, vitalite:12 },
           blessure:{ id:'genou', zone:"Genou droit", type:"ligament rompu sous le poids",
                      gravite:2, douleur:3, saignement:0, fonction:['agilite','furtivite','lutte','equitation'],
                      cicatrice:"une jambe qui prévient du temps qu'il va faire" },
           meleeMaj:{ position:"au sol, vous vous relevez", note:"Aile gauche ouverte · votre genou est parti" },
           exploit:{ eclat:7, temoins:() => a('wy_sans_temoin') ? 'aucun' : (a('wy_caravane') ? 'foule' : 'quelques'),
                     quoi:"vous avez cloué une wyverne au sol et payé un genou" } },
  suite:'wy_combat_2', libelleSuite:"Se relever" },

wy_c1_aile_ko:{
  melee:true,
  texte:[
    "Le renseignement était bon. Le pas et demi ne l'était pas.",
    "Vous prenez sa gauche trop tôt, d'un quart de seconde, et un quart de seconde à cette vitesse représente sept pieds : quand l'épée arrive, la membrane n'est plus là, et l'épaule d'aile — un bloc d'os et de tendon gros comme un tonneau — est arrivée à sa place.",
    { sobre:"Le choc vous envoie à six pas. L'épée reste quelque part derrière.",
      intense:"Le choc vous envoie à six pas et vous arrivez sur le dos, sans souffle, avec la certitude froide et parfaitement calme d'un homme qui vient de constater que son épée est restée là-bas et qu'il n'y arrivera pas avant elle.",
      extreme:"Le choc vous envoie à six pas et vous arrivez sur le dos sans un souffle dans le corps, la bouche ouverte sur rien, avec la certitude froide et parfaitement calme d'un homme qui a vu son épée partir dans l'autre sens et qui compte, très vite, combien de pas la sépare de lui et combien la séparent d'elle." },
    "§ Elle est arrivée sur vous. Voilà la position nouvelle.",
    "Elle ne mord pas tout de suite. Elle pose une patte sur votre poitrine, comme on pose une main sur une porte pour l'empêcher de se refermer, et elle vous regarde de côté.",
  ],
  effets:{ cout:{ endurance:22, vitalite:8, moral:6 },
           flags:['wy_desarme'],
           meleeMaj:{ position:"au sol, sous sa patte", note:"Elle est entière · vous n'avez plus l'épée" } },
  suite:'wy_combat_2', libelleSuite:"Elle vous regarde" },

/* ── La gorge ────────────────────────────────────────────────────────────── */
wy_c1_gorge_dom:{
  melee:true,
  texte:[
    "Il y a une demi-seconde, à chaque charge, où le cou se redresse pour ouvrir la gueule. Une demi-seconde où la gorge cesse d'être un tube blindé de plaques et devient de la peau.",
    "Vous ne l'attendez pas debout : vous plongez en avant, sous elle, et vous frappez en remontant à deux mains.",
    { sobre:"La lame entre sous la mâchoire et ressort. Beaucoup de choses sortent avec.",
      intense:"La lame entre à trois pouces sous la mâchoire et ressort de l'autre côté du cou. Vous ne retirez pas : vous tirez vers vous, en marchant à reculons, et vous ouvrez la gorge sur toute la longueur de la lame. Ce qui sort n'est pas rouge : c'est presque noir, et ça sort par saccades chaudes qui vous atteignent au visage à chaque battement.",
      extreme:"La lame entre à trois pouces sous la mâchoire et ressort de l'autre côté. Vous ne retirez pas — vous tirez vers vous en marchant à reculons, et la gorge s'ouvre sur toute la longueur de l'acier. Le sang de wyverne est presque noir et il sort par saccades chaudes, à chaque battement, et vous en prenez plein la bouche et les yeux. Avec, il y a de l'air : la trachée est ouverte et elle siffle, et à chaque expiration elle projette une écume rose qui monte à hauteur d'homme." },
    "§ Ça devrait la tuer. Ça ne la tue pas.",
    "Une wyverne a quatre-vingts pieds de vaisseaux et un cœur de la taille d'un seau. Elle a désormais trois minutes à vivre, et elle va les employer entièrement à vous tuer.",
  ],
  effets:{ flags:['wy_gorge_ouverte'], cout:{ endurance:18 },
           meleeMaj:{ position:"face à elle, à trois pas", note:"Gorge ouverte · elle se vide · trois minutes" },
           exploit:{ eclat:9, temoins:() => a('wy_sans_temoin') ? 'aucun' : (a('wy_caravane') ? 'foule' : 'quelques'),
                     quoi:"vous avez ouvert la gorge d'une wyverne au premier échange" } },
  suite:'wy_combat_2', libelleSuite:"Trois minutes" },

wy_c1_gorge_cout:{
  melee:true,
  texte:[
    "Vous plongez, vous remontez, et la lame entre — mais deux pouces trop bas, dans le muscle du cou et non dans la gorge.",
    "Elle referme la gueule. Pas sur vous : sur l'épée.",
    { sobre:"Elle serre. Vous tenez la garde à deux mains et vous êtes soulevé du sol.",
      intense:"Elle serre les mâchoires sur la lame et lève la tête, et comme vous n'avez pas eu la présence d'esprit de lâcher, vous montez avec. Vous vous retrouvez à sept pieds du sol, suspendu à la garde d'une épée tenue par une bête de douze cents livres, à quatorze pouces de son œil. Vous voyez la membrane nictitante passer sur cet œil, latéralement, deux fois.",
      extreme:"Elle serre les mâchoires sur la lame et lève la tête, et comme vous n'avez pas lâché, vous montez avec. Sept pieds au-dessus du sol, suspendu à la garde, à quatorze pouces d'un œil de la taille d'une pomme où passe latéralement, deux fois, une membrane grise. L'acier crisse contre les dents. Son haleine, à cette distance, n'est pas une odeur : c'est une chose humide qui se dépose sur le visage." },
    "Vous lâchez. On lâche toujours, et c'est de six pieds qu'on tombe.",
    { sobre:"Vous atterrissez mal. Deux doigts de la main gauche ne repartent pas dans le bon sens.",
      intense:"Vous atterrissez sur le schiste, main gauche à plat pour amortir, ce qui est exactement ce qu'il ne faut pas faire de six pieds : l'annulaire et l'auriculaire partent en arrière avec un bruit de brindilles, et l'os du métacarpe fait une bosse sous la peau qui n'y était pas.",
      extreme:"Vous atterrissez sur le schiste, main gauche à plat, ce qu'il ne faut jamais faire de six pieds : l'annulaire et l'auriculaire partent en arrière avec un bruit de brindilles sèches et restent là, à contre-sens, pendant que le métacarpe fait sous la peau une bosse blanche. La douleur met deux secondes complètes à arriver, et quand elle arrive elle arrive d'un coup, jusqu'à l'épaule." },
    "§ Elle recrache l'épée. Elle est à quatre pas. Vous avez une main et demie.",
  ],
  effets:{ cout:{ endurance:20, vitalite:10 },
           blessure:{ id:'main', zone:"Main gauche", type:"deux doigts brisés, métacarpe déplacé",
                      gravite:2, douleur:3, saignement:0, fonction:['lutte','bouclier','jet','furtivite'],
                      cicatrice:"deux doigts qui ne se referment plus tout à fait" },
           meleeMaj:{ position:"debout, à quatre pas", note:"Elle est entière · votre main gauche est finie" } },
  suite:'wy_combat_2', libelleSuite:"Ramasser l'épée" },

wy_c1_gorge_ko:{
  melee:true,
  texte:[
    "La demi-seconde n'arrive pas. Ou elle arrive et vous n'êtes pas dedans, ce qui revient au même et se raconte moins bien.",
    "Elle ne redresse pas le cou : elle frappe de côté, gueule fermée, comme un cheval qui donne du chanfrein — et douze cents livres qui donnent du chanfrein, c'est une porte de grange lancée à vingt milles à l'heure.",
    { sobre:"Vous partez de neuf pas et vous arrivez contre le ressaut de schiste. Quelque chose se casse dans le dos.",
      intense:"Vous partez de neuf pas et vous arrivez contre le ressaut de schiste, dos le premier. Il y a un bruit sec, à l'intérieur, en haut du dos, et pendant un moment très long il n'y a plus d'air nulle part dans le monde — ni dehors ni dedans. Vous restez à genoux, la bouche ouverte, en train d'apprendre à respirer par petits tiers.",
      extreme:"Vous partez de neuf pas et vous arrivez dos le premier contre le ressaut de schiste. Un bruit sec, en haut du dos, du côté droit : deux côtes. Il n'y a plus d'air nulle part dans le monde pendant un temps très long, et quand il revient il revient par tiers, avec au bout de chaque tiers une pointe qui vous plie en deux. Vous crachez. Ce que vous crachez est rose et mousseux, ce qui est la mauvaise couleur." },
    "§ Elle prend son temps. Ça, c'est nouveau, et c'est très mauvais.",
    "Une bête qui a faim se jette. Une bête qui a compris qu'elle a le dessus fait ce qu'elle fait maintenant : elle avance de trois pas, s'arrête, incline la tête, et attend de voir si vous vous relevez.",
  ],
  effets:{ cout:{ endurance:28, vitalite:16, moral:8 },
           blessure:{ id:'dos', zone:"Côtes droites", type:"deux côtes fêlées, haut du dos",
                      gravite:2, douleur:3, saignement:0, fonction:['force','endurance','epees','armes_lourdes'],
                      cicatrice:"un point entre les omoplates qui prévient de la pluie" },
           meleeMaj:{ position:"à genoux contre la paroi", note:"Elle est entière · elle prend son temps" } },
  suite:'wy_combat_2', libelleSuite:"Se relever" },

/* ── Tenir ───────────────────────────────────────────────────────────────── */
wy_c1_tenir_dom:{
  melee:true,
  texte:[
    "Il y a une chose qu'on apprend chez les Parias et qu'on n'apprend nulle part ailleurs : le premier échange ne sert pas à gagner. Il sert à voir.",
    "Vous ne frappez pas. Vous vous mettez de trois quarts derrière le ressaut de schiste, l'épaule basse, et vous laissez la charge arriver sur la pierre.",
    { sobre:"Elle percute le ressaut. Vous encaissez ce qui passe par-dessus.",
      intense:"Elle percute le ressaut de plein poitrail et quatre pieds de schiste gelé explosent. Ce qui passe par-dessus vous atteint quand même — un coup d'aile repliée, sec, en travers de l'épaule — mais vous êtes derrière quatre pieds de pierre et elle est devant, et pendant deux secondes complètes vous la voyez faire tout ce qu'elle sait faire.",
      extreme:"Elle percute le ressaut de plein poitrail et quatre pieds de schiste gelé explosent en éclats de la taille d'une main, dont trois vous ouvrent la joue et le front. Le coup d'aile repliée qui passe par-dessus vous prend en travers de l'épaule. Mais vous êtes derrière quatre pieds de pierre, et pendant deux secondes complètes vous la voyez faire, de très près, tout ce qu'elle sait faire." },
    "§ Et ce qu'elle sait faire est faux de trois façons.",
    "Un : elle attaque toujours en tournant à droite, et jamais à gauche. Deux : les ergots arrivent une seconde après la gueule, toujours, et jamais avant — c'est une bête qui mord d'abord et qui tient ensuite. Trois : quand elle ouvre les ailes pour freiner, elle ferme les yeux. Un dixième de seconde. Elle les ferme.",
    "Vous saignez de la face et vous respirez fort, et vous venez de gagner ce premier échange plus complètement que si vous l'aviez blessée.",
  ],
  effets:{ flags:['wy_sait_fleches','wy_lue'], cout:{ endurance:14, vitalite:5 },
           meleeMaj:{ position:"derrière le ressaut", note:"Elle est entière · vous l'avez lue" },
           marque:"Vous avez lu la Grise avant de la toucher : elle ne vire pas à gauche, et elle ferme les yeux pour freiner.",
           court:"Vous l'avez lue" },
  suite:'wy_combat_2', libelleSuite:"Sortir du couvert" },

wy_c1_tenir_cout:{
  melee:true,
  texte:[
    "Vous vous mettez derrière le ressaut, l'épaule basse, et vous encaissez.",
    "Le ressaut ne tient pas.",
    { sobre:"Quatre pieds de schiste gelé partent d'un bloc et vous partez avec.",
      intense:"Quatre pieds de schiste gelé se détachent du sol d'un seul bloc — c'est une dalle, pas un rocher, et une dalle posée sur de la boue gelée ne résiste pas à douze cents livres. Vous partez avec elle sur huit pas, coincé entre la pierre et le poitrail, dans un vacarme de pierre contre pierre où vous ne savez plus, pendant trois secondes, ce qui est à vous et ce qui est à elle.",
      extreme:"Quatre pieds de schiste gelé se détachent d'un bloc et partent avec vous sur huit pas, coincé entre la dalle et le poitrail. Trois secondes de vacarme où l'on ne sait plus ce qui est à soi. Quand ça s'arrête, vous êtes au sol, la dalle sur les jambes, et il y a une chaleur rapide qui descend le long du mollet gauche — la seule sensation du monde qui ne trompe jamais personne : quelque chose est ouvert et ça coule vite." },
    "Vous sortez de là-dessous. Vous en sortez parce qu'elle vous laisse en sortir : elle a reculé pour reprendre de l'élan, et c'est ce recul qui vous sauve.",
    "§ Vous avez vu ce que vous vouliez voir. Vous l'avez payé au tarif de la vallée.",
    "Elle attaque en tournant à droite et jamais à gauche. Elle mord d'abord et griffe ensuite. Et quand elle ouvre les ailes pour freiner, elle ferme les yeux.",
  ],
  effets:{ flags:['wy_sait_fleches','wy_lue'], cout:{ endurance:22, vitalite:14 },
           blessure:{ id:'mollet', zone:"Mollet gauche", type:"ouvert sur la pierre, saigne",
                      gravite:2, douleur:2, saignement:3, fonction:['agilite','endurance','furtivite'],
                      cicatrice:"une entaille en croissant, large" },
           meleeMaj:{ position:"debout, la jambe mauvaise", note:"Elle est entière · vous l'avez lue · vous saignez" } },
  suite:'wy_combat_2', libelleSuite:"Se remettre en garde" },

wy_c1_tenir_ko:{
  melee:true,
  texte:[
    "Vous décidez de ne rien tenter. Elle décide de ne pas charger.",
    "C'est un renseignement, en soi, et c'en est un mauvais : la bête a une patience que vous ne lui prêtiez pas. Elle s'arrête à douze pas, ouvre les ailes à demi pour occuper toute la largeur du gué, et se met à avancer au pas.",
    { sobre:"Elle vous pousse vers la rivière sans vous toucher. Vous reculez pendant quarante pas.",
      intense:"Elle vous pousse vers la rivière sans vous toucher une seule fois. Ailes à demi ouvertes, cou bas, un pas puis un pas, et vous reculez — quarante pas, cinquante — parce qu'il n'y a rien d'autre à faire quand une chose deux fois plus large que la route avance vers vous et que vous avez choisi de ne pas frapper.",
      extreme:"Elle vous pousse vers la rivière sans vous toucher une fois. Ailes à demi ouvertes pour occuper toute la largeur du gué, cou bas, un pas puis un pas. Vous reculez quarante pas, puis cinquante, jusqu'à sentir sous le talon la pente où le schiste devient de la vase et où l'eau de février attend, et vous comprenez ce qu'elle fait : elle vous met dans l'eau. Dans l'eau on ne court pas." },
    "§ Vous avez perdu quarante pas de route et toute l'initiative. Elle a appris que vous reculiez.",
    "Le froid de la rivière vous prend les bottes à la troisième minute. Vous n'avez plus le choix, et n'avoir plus le choix est exactement ce qu'elle cherchait.",
  ],
  effets:{ cout:{ endurance:18, moral:10 }, flags:['wy_acculee_eau'],
           meleeMaj:{ position:"dos à la rivière, dans la vase", note:"Elle est entière · elle vous a poussé à l'eau" } },
  suite:'wy_combat_2', libelleSuite:"Il faut sortir de là" },

/* ── Le jarret ───────────────────────────────────────────────────────────── */
wy_c1_jarret_dom:{
  melee:true,
  texte:[
    "Le seul endroit sûr autour d'une wyverne est directement dessous, et il est sûr pendant une seconde et demie.",
    "Vous plongez sous le poitrail au moment où elle arrive, vous laissez la gueule passer au-dessus, et vous prenez la patte gauche à deux mains derrière l'articulation.",
    { sobre:"Vous sectionnez le tendon d'un seul coup de dague. La patte cède.",
      intense:"Le tendon d'une wyverne, derrière le jarret, est une corde de deux pouces qu'on sent rouler sous les doigts comme un câble de puits. Vous posez la dague dessus, vous appuyez, et vous ne coupez pas : vous **sciez**, une fois, deux fois, dans un membre qui se débat et qui vous soulève du sol à chaque secousse. À la troisième, ça lâche — et la corde remonte sous la peau jusqu'au genou avec un claquement qu'on sent dans les mains.",
      extreme:"Le tendon, derrière le jarret, est une corde de deux pouces qu'on sent rouler sous les doigts comme un câble de puits. Vous posez la dague et vous sciez — une fois, deux fois, accroché à une patte qui se débat et vous soulève à chaque secousse. À la troisième, ça lâche. La corde tranchée remonte sous la peau jusqu'au genou avec un claquement qu'on sent dans les mains, la peau se creuse là où elle est passée, et la patte gauche cesse simplement d'exister pour sa propriétaire : elle continue à pousser dessus, et le membre plie à l'envers." },
    "§ Une chose qui pèse douze cents livres a besoin de deux pattes. Elle vient d'en perdre une.",
    "Elle tombe sur le côté et elle ne se relèvera plus complètement. Elle se relèvera à moitié, appuyée sur les poignets d'aile comme un vieillard sur ses coudes, et c'est dans cette position que le reste de ce combat va se dérouler.",
  ],
  effets:{ flags:['wy_jarret'], cout:{ endurance:16 },
           meleeMaj:{ position:"sous elle, vous ressortez", note:"Jarret gauche tranché · elle ne tient plus debout" },
           exploit:{ eclat:8, temoins:() => a('wy_sans_temoin') ? 'aucun' : (a('wy_caravane') ? 'foule' : 'quelques'),
                     quoi:"vous avez mis une wyverne à terre à la dague, par en dessous" } },
  suite:'wy_combat_2', libelleSuite:"Ressortir" },

wy_c1_jarret_cout:{
  melee:true,
  texte:[
    "Vous plongez dessous, vous prenez la patte, vous posez la dague — et vous découvrez la seule chose que Bracq avait dite et que vous aviez rangée au fond : les ergots.",
    "Sept pouces, recourbés, à l'arrière de chaque patte. Ils n'arrivent pas comme une griffe qui frappe. Ils arrivent comme un croc de boucher qui remonte.",
    { sobre:"Il vous ouvre la cuisse. Vous coupez quand même le tendon, à moitié.",
      intense:"L'ergot entre dans la cuisse droite par l'extérieur et remonte de huit pouces avant de ressortir. Vous coupez quand même — à moitié, le tendon ne cède pas complètement — et vous roulez de sous elle avec une jambe qui fonctionne encore et une autre qui a une bouche.",
      extreme:"L'ergot entre dans la cuisse droite par l'extérieur, à quatre doigts au-dessus du genou, et remonte de huit pouces avant de ressortir. Ça ne fait pas mal tout de suite : ça fait froid, et ça fait un bruit. Vous coupez quand même — à moitié — et vous roulez de sous elle avec une cuisse ouverte sur huit pouces d'où sort, à chaque battement, une quantité de sang qui vous renseigne immédiatement sur le temps qu'il vous reste." },
    "§ Ce qui est sur cet ergot vient de ce qu'elle mange. Et ce qu'elle mange est mort depuis trois semaines.",
    "Ce n'est pas le venin qui tue, dans une griffure de wyverne. C'est ce qu'il y a dessous, et ça met neuf jours.",
  ],
  effets:{ flags:['wy_jarret_moitie','wy_infecte'], cout:{ endurance:20, vitalite:18 },
           blessure:{ id:'cuisse', zone:"Cuisse droite", type:"ouverte à l'ergot, souillée",
                      gravite:3, douleur:3, saignement:4, fonction:['agilite','endurance','furtivite','equitation'],
                      cicatrice:"huit pouces de bourrelet irrégulier, et ce qui a poussé dedans" },
           meleeMaj:{ position:"au sol, vous roulez", note:"Jarret entamé · votre cuisse est ouverte" } },
  suite:'wy_combat_2', libelleSuite:"Se relever" },

wy_c1_jarret_ko:{
  melee:true,
  texte:[
    "Vous plongez sous le poitrail et le poitrail n'y est plus.",
    "Elle a freiné. Elle a ouvert les ailes à deux pas et freiné, et vous passez sous rien du tout en pleine vitesse, à plat ventre, sur douze pieds de schiste gelé.",
    { sobre:"Vous vous retournez sur le dos. Elle est déjà au-dessus.",
      intense:"Vous vous retournez sur le dos et elle est déjà au-dessus, la tête à trois pieds de la vôtre, assez près pour que vous voyiez les choses coincées entre les dents et assez près pour qu'il n'y ait plus aucune manœuvre disponible dans aucun manuel du monde.",
      extreme:"Vous vous retournez sur le dos et elle est déjà au-dessus. La tête à trois pieds. Assez près pour compter les dents recourbées et voir ce qui est resté coincé entre elles depuis plusieurs repas ; assez près pour recevoir sur le visage, en même temps que l'odeur, la salive filante qui pend des commissures. Il n'existe plus aucune manœuvre dans aucun manuel du monde." },
    "§ Elle a freiné en fermant les yeux. Un dixième de seconde. Vous l'avez vu, à plat ventre, par en dessous.",
    "C'est le seul gain de cet échange et il vous a coûté toute la peau des avant-bras. Il faudra s'en contenter.",
  ],
  effets:{ flags:['wy_lue'], cout:{ endurance:24, vitalite:10, moral:5 },
           meleeMaj:{ position:"sur le dos, elle au-dessus", note:"Elle est entière · elle ferme les yeux pour freiner" } },
  suite:'wy_combat_2', libelleSuite:"Elle ouvre la gueule" },

/* ── L'Onde ──────────────────────────────────────────────────────────────── */
wy_c1_onde_dom:{
  melee:true,
  texte:[
    "Vous ne l'avez pas fait devant témoin depuis six ans. Il y a une raison, et cette raison a un nom, et ce nom est le vôtre.",
    "Vous posez le pied gauche, vous ouvrez la main, et vous cessez de retenir.",
    { sobre:"L'air, entre elle et vous, devient quelque chose de solide et de rapide.",
      intense:"L'air entre elle et vous cesse d'être de l'air. Ça part du plexus, ça descend dans le bras, ça sort — et sur trente pas la rivière se creuse en une gouttière, le schiste gelé se lève en plaques, et douze cents livres lancées à pleine charge s'arrêtent dans le vide comme un homme qui percute une porte qu'il croyait ouverte.",
      extreme:"L'air entre elle et vous cesse d'être de l'air. Ça part du plexus, ça descend le long du bras, ça sort de la main ouverte, et sur trente pas la rivière se creuse en gouttière, le schiste se lève en plaques, la mule attachée au milieu du gué est couchée sur le flanc sans avoir été touchée. Douze cents livres lancées à pleine charge s'arrêtent dans le vide, se plient sur elles-mêmes, et repartent en arrière de neuf pieds. Quelque chose craque dans le poitrail — de l'intérieur." },
    "§ Il n'y a pas de bruit. C'est ça, le pire, pour ceux qui regardent : il n'y a pas de bruit.",
    "Elle se relève. Elle se relève de travers et elle a quelque chose de cassé dedans, mais ce n'est pas ce qui compte dans cette minute.",
    () => a('wy_sans_temoin')
      ? "Ce qui compte, c'est que personne n'a vu. Le gué est vide, la nuit finit, et la seule chose vivante qui sait ce que vous venez de faire va mourir dans les dix minutes."
      : "Ce qui compte, c'est le silence derrière vous. Six servants de baliste, un maître des engins de cinquante ans, et le convoyeur, ont tous cessé, exactement en même temps, de faire ce qu'ils étaient en train de faire.",
  ],
  effets:{ flags:['wy_onde_vue','wy_grise_brisee'], cout:{ endurance:14 },
           exploit:{ eclat:12, suspicion:30,
                     temoins:() => a('wy_sans_temoin') ? 'aucun' : (a('wy_caravane') ? 'province' : 'foule'),
                     quoi:"vous avez arrêté une wyverne en pleine charge sans la toucher" },
           meleeMaj:{ position:"debout, la main ouverte", note:"Quelque chose est cassé dans son poitrail" },
           marque:"Vous avez employé l'Onde au gué de Cendrepont.", court:"L'Onde" },
  suite:'wy_combat_2', libelleSuite:"Elle se relève" },

wy_c1_onde_cout:{
  melee:true,
  texte:[
    "Six ans sans s'en servir devant quelqu'un, ça ne se rattrape pas parce qu'on en a besoin.",
    "Ça part. Ça part mal : trop large, sans direction, en nappe au lieu d'une pointe.",
    { sobre:"Elle est renversée. Tout ce qui se trouvait derrière elle aussi.",
      intense:"Elle est renversée — et avec elle quarante pieds de gué : la mule d'appât part en tonneau, une baliste bascule de son affût et brise l'épaule d'un servant, et le mur de schiste rend trois cents livres de pierre qui descendent sur la route.",
      extreme:"Elle est renversée, et avec elle quarante pieds de gué. La mule d'appât part en tonneau et arrive contre un rocher, morte. Une baliste bascule de son affût et l'épaule d'un servant part avec, si nettement qu'il regarde son propre bras pendre sans comprendre à qui il est. Trois cents livres de schiste descendent de la paroi sur la route." },
    "Et vous, vous êtes à genoux.",
    { sobre:"Le nez saigne. Les deux oreilles aussi. Vous ne voyez pas bien pendant une minute.",
      intense:"Le nez saigne des deux narines en continu, sans caillot, et les deux oreilles également. Le monde a perdu ses sons aigus et gardé les graves ; vous entendez le fleuve et pas les cris. Vous restez à genoux le temps qu'il faut, c'est-à-dire beaucoup trop longtemps.",
      extreme:"Le nez saigne des deux narines en continu, sans caillot, et les deux oreilles aussi — ce n'est pas de l'écoulement, c'est du sang franc qui vous coule dans le col. Le monde a perdu ses aigus et gardé les graves : vous entendez le fleuve et vous n'entendez pas le servant qui hurle à neuf pas. Vous restez à genoux beaucoup trop longtemps." },
    "§ Ils ont tous vu. Et l'un d'eux ne remontera plus jamais sur une baliste.",
  ],
  effets:{ flags:['wy_onde_vue','wy_onde_ratee'], cout:{ endurance:26, concentration:20, vitalite:12, moral:10 },
           exploit:{ eclat:12, suspicion:34,
                     temoins:() => a('wy_sans_temoin') ? 'aucun' : (a('wy_caravane') ? 'province' : 'foule'),
                     quoi:"vous avez renversé quarante pieds de gué sans toucher personne" },
           meleeMaj:{ position:"à genoux", note:"Elle se relève · vous saignez du nez et des oreilles" },
           marque:"Vous avez employé l'Onde et estropié un servant de Valombre.", court:"L'Onde a débordé" },
  suite:'wy_combat_2', libelleSuite:"Se relever" },

wy_c1_onde_ko:{
  melee:true,
  texte:[
    "Ça ne part pas.",
    "Ça ne part pas parce qu'on ne se sert pas de cette chose-là comme d'une arme qu'on dégaine : il faut la place, le temps, et un endroit dans le crâne où l'on est seul. Vous n'avez aucun des trois, et douze cents livres arrivent.",
    { sobre:"Vous prenez la charge de plein fouet, sans arme levée, la main encore ouverte.",
      intense:"Vous prenez la charge de plein fouet, la main encore ouverte, l'épée encore basse. Le poitrail vous prend et vous partez avec, sur quinze pas, comme une chose sans articulation. Quand ça s'arrête, il y a un moment de calme parfait où l'on est simplement couché sur de la pierre froide et où l'on trouve ça reposant.",
      extreme:"Vous prenez la charge de plein fouet, la main ouverte, l'épée basse. Le poitrail vous cueille et vous partez sur quinze pas comme une chose sans articulation, en rebondissant deux fois. Quand ça s'arrête il y a un moment de calme parfait, couché sur la pierre froide, où l'on trouve la situation reposante — et c'est ce moment-là, précisément, qui tue les hommes qui meurent ce jour-là." },
    "§ La concentration ne revient pas parce qu'on la rappelle. Elle revient quand elle veut.",
    "Elle est sur vous avant que vous ayez retrouvé la position debout, et vous avez brûlé, pour rien, la seule chose que vous ayez que les autres n'ont pas.",
  ],
  effets:{ cout:{ endurance:26, concentration:30, vitalite:16, moral:10 },
           meleeMaj:{ position:"au sol, elle sur vous", note:"Elle est entière · l'Onde n'est pas venue" } },
  suite:'wy_combat_2', libelleSuite:"Elle est sur vous" },

};
Object.assign(ARC_WYVERNE, ARC_WYVERNE_5);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 6 — DEUXIÈME ET TROISIÈME ÉCHANGES
 *
 * Elle a désormais vu ce que vous savez faire. Rejouer la même manœuvre coûte
 * deux points, puis quatre : c'est le moteur qui la fait apprendre, pas un
 * texte qui prétend qu'elle apprend.
 * ══════════════════════════════════════════════════════════════════════════ */

/* Ce qu'elle a perdu au premier échange pèse sur sa difficulté. */
const dcGrise = base => () => base
  - (a('wy_aile_ouverte') ? 2 : 0)
  - (a('wy_jarret') ? 3 : 0)
  - (a('wy_jarret_moitie') ? 1 : 0)
  - (a('wy_gorge_ouverte') ? 3 : 0)
  - (a('wy_grise_brisee') ? 2 : 0)
  - (a('wy_avantage_poison') ? 1 : 0)
  + (a('wy_desarme') ? 3 : 0)
  + (a('wy_acculee_eau') ? 2 : 0);

const ARC_WYVERNE_6 = {

/* ══ DEUXIÈME ÉCHANGE ═════════════════════════════════════════════════════ */
wy_combat_2:{
  titre:"Ce qu'elle a appris de vous",
  melee:true,
  texte:[
    () => a('wy_desarme')
      ? "La patte pèse sur votre poitrine sans appuyer vraiment. Elle vous tient comme on tient une porte, et l'épée est à onze pas derrière elle."
      : (a('wy_acculee_eau')
        ? "L'eau vous prend jusqu'aux genoux et le fond est de la vase à galets. On ne se déplace pas là-dedans : on s'y déplace en s'annonçant."
        : "Vous vous remettez en garde, et la garde n'a plus la même valeur qu'il y a quarante secondes."),
    { sobre:"Elle ne charge plus. Elle tourne.",
      intense:"Elle ne charge plus. Elle tourne — grands pas latéraux, ailes à demi ouvertes, la tête maintenue à la même hauteur que la vôtre, et les yeux qui ne vous quittent pas. Ce n'est plus de la faim. C'est de la méthode.",
      extreme:"Elle ne charge plus. Elle tourne — grands pas latéraux, ailes à demi ouvertes, la tête maintenue exactement à la hauteur de la vôtre, les deux yeux fixes. Elle a du sang plein le poitrail et une partie n'est pas le sien. Ce n'est plus de la faim : c'est de la méthode, et ça vient d'une bête qui a vingt ans et qui a tué plus d'hommes que vous." },
    () => a('wy_lue')
      ? "§ Vous savez qu'elle tourne à droite et jamais à gauche. Elle sait maintenant ce que vous avez essayé de faire, et elle ne vous laissera pas le refaire deux fois."
      : "§ Elle a vu ce que vous savez faire. Refaire la même chose vous coûtera deux points, puis quatre. C'est la règle de tous les adversaires qui ont un cerveau.",
    () => a('wy_avantage_baliste')
      ? "Derrière vous, à quatre-vingts pas, Bracq attend dans l'axe avec deux balistes tendues et six hommes qui n'ont pas encore lâché. Il ne tirera pas tant que vous serez dans la ligne. C'est à vous de sortir de la ligne, ou de l'y mettre."
      : "",
    () => a('wy_vu_le_petit')
      ? "Et derrière elle, à douze pieds, il y a trois œufs gros comme des barriques de sel et une chose de la taille d'un chien de berger qui vous regarde sans faire de bruit."
      : "",
    "Elle s'arrête. Elle a choisi.",
  ],
  choix:[
    { t:"La forcer à tourner à gauche",
      si:() => a('wy_sait_fleches') || a('wy_lue'),
      detail:"Se placer là où elle ne peut pas se refermer · l'obliger à se démonter elle-même · Intellect + tactique contre 9",
      risque:"calculé",
      test:{ carac:'intellect', comp:'tactique', dc:dcGrise(9), adversaire:'grise', manoeuvre:'gauche',
             situation:() => a('wy_lue') ? 2 : 0 },
      degres:{ dominante:'wy_c2_gauche_dom', couteuse:'wy_c2_gauche_cout', echec:'wy_c2_gauche_ko' } },

    { t:"La mettre dans l'axe des balistes",
      si:() => a('wy_avantage_baliste'),
      detail:"Sortir de la ligne en l'entraînant dedans · huit secondes à tenir · Présence + commandement contre 10",
      risque:"dangereux",
      test:{ carac:'presence', comp:'commandement', dc:dcGrise(10), adversaire:'grise', manoeuvre:'baliste' },
      degres:{ dominante:'wy_c2_baliste_dom', couteuse:'wy_c2_baliste_cout', echec:'wy_c2_baliste_ko' } },

    { t:"Menacer la couvée",
      si:() => a('wy_sait_couvee') || a('wy_vu_le_petit'),
      detail:"Se placer entre elle et le nid · une mère cesse d'être méthodique · Volonté + bestiaire contre 9",
      ferme:"Ferme : toute possibilité de repartir d'ici sans avoir fait ça",
      risque:"définitif", definitif:true,
      test:{ carac:'volonte', comp:'bestiaire', dc:dcGrise(9), adversaire:'grise', manoeuvre:'couvee' },
      degres:{ dominante:'wy_c2_couvee_dom', couteuse:'wy_c2_couvee_cout', echec:'wy_c2_couvee_ko' } },

    { t:"Aller la chercher · corps à corps",
      detail:"Ne plus lui laisser la distance · sous la gueule, contre le poitrail · Force + lutte contre 11",
      risque:"très dangereux",
      test:{ carac:'force', comp:'lutte', dc:dcGrise(11), adversaire:'grise', manoeuvre:'corps' },
      degres:{ dominante:'wy_c2_corps_dom', couteuse:'wy_c2_corps_cout', echec:'wy_c2_corps_ko' } },

    { t:"Attendre. La laisser se vider.",
      si:() => a('wy_gorge_ouverte') || a('wy_aile_ouverte') || a('wy_avantage_poison'),
      detail:"Ne rien tenter · reculer au rythme exact de son sang · Endurance + tactique contre 8",
      risque:"prudent",
      test:{ carac:'endurance', comp:'tactique', dc:dcGrise(8), adversaire:'grise', manoeuvre:'attendre' },
      degres:{ dominante:'wy_c2_vider_dom', couteuse:'wy_c2_vider_cout', echec:'wy_c2_vider_ko' } },
  ],
},

/* ── Tourner à gauche ────────────────────────────────────────────────────── */
wy_c2_gauche_dom:{
  melee:true,
  texte:[
    "Il n'y a rien à inventer. Il faut simplement se tenir toujours du même côté et ne jamais en démordre, pas une fois, pas une seule seconde, pendant deux minutes entières.",
    "Vous vous décalez sur sa gauche. Elle tourne à droite pour vous reprendre en face — un tour complet, trois cent soixante degrés, parce qu'elle ne peut pas faire l'autre quart. Vous vous décalez encore. Elle refait un tour.",
    { sobre:"Trois tours. Au quatrième, elle est essoufflée et vous ne l'êtes pas.",
      intense:"Trois tours. Au quatrième, une bête de douze cents livres qui a tourné quatre fois sur elle-même sur du schiste gelé n'est plus une machine : c'est un animal qui souffle, dont la langue sort, et dont les pattes arrière commencent à chercher où se poser. Vous, vous avez marché trente pas.",
      extreme:"Trois tours. Au quatrième, douze cents livres qui ont tourné quatre fois sur du schiste gelé ne sont plus une machine : c'est un animal qui souffle par la gueule ouverte, langue pendante, avec de l'écume aux commissures et les pattes arrière qui cherchent leur appui. Sa vieille cicatrice d'aile s'est rouverte toute seule sous l'effort et pisse en fine ligne à chaque tour, redessinant un cercle rouge sur la pierre — le cercle exact de sa propre infirmité." },
    "§ Un homme peut battre une chose deux fois plus rapide que lui. Il ne peut pas la battre à la course : il peut la battre à la géométrie.",
    "Au cinquième tour, elle fait la seule chose qui lui reste : elle s'arrête et elle ouvre grand, face à vous, pour vous faire peur.",
    "Ce qui est très exactement l'instant qu'il fallait attendre.",
  ],
  effets:{ flags:['wy_epuisee','wy_ouverte'], cout:{ endurance:16 },
           meleeMaj:{ position:"sur sa gauche, à sept pas", note:"Elle souffle · elle est ouverte de face" },
           exploit:{ eclat:6, temoins:() => a('wy_sans_temoin') ? 'aucun' : (a('wy_caravane') ? 'foule' : 'quelques'),
                     quoi:"vous avez épuisé une wyverne en la faisant tourner sur elle-même" } },
  suite:'wy_combat_3', libelleSuite:"Maintenant" },

wy_c2_gauche_cout:{
  melee:true,
  texte:[
    "Vous prenez sa gauche et vous tenez. Deux tours. Trois.",
    "Au quatrième, elle ne tourne pas : elle recule d'un bond de neuf pieds, ce dont vous ne la pensiez pas capable, et elle vous reprend en face sans avoir eu à pivoter.",
    { sobre:"Le coup d'aile vous prend en pleine poitrine. Vous partez dans la vase.",
      intense:"Le coup d'aile arrive de face, à plat, et ce n'est pas un coup : c'est un mur qui se déplace. Vous partez de sept pas et vous arrivez dans la vase du bord, sur le dos, avec toute une saison d'eau glacée qui entre par le col.",
      extreme:"Le coup d'aile arrive de face, à plat — pas un coup : un mur qui se déplace. Vous partez de sept pas et vous arrivez dans la vase du bord, sur le dos, l'eau de février par le col, et vous avalez une gorgée de rivière avant de comprendre dans quel sens est le ciel. Le schiste sous la vase vous a ouvert le cuir chevelu ; ça saigne comme saigne toujours le cuir chevelu, c'est-à-dire beaucoup et pour rien." },
    "§ Elle est épuisée. Vous êtes trempé, en février, et le froid tue plus lentement mais il tue aussi.",
    "Vous vous relevez. Elle souffle, la langue sortie, immobile à onze pas. Aucun des deux ne peut plus se permettre un quatrième échange.",
  ],
  effets:{ flags:['wy_epuisee'], cout:{ endurance:26, vitalite:8 },
           blessure:{ id:'crane', zone:"Cuir chevelu", type:"ouvert sur le schiste",
                      gravite:1, douleur:1, saignement:2, fonction:['perception'],
                      cicatrice:"une raie blanche dans les cheveux" },
           meleeMaj:{ position:"dans la vase, debout", note:"Elle souffle · vous êtes trempé" } },
  suite:'wy_combat_3', libelleSuite:"Il n'y aura pas de quatrième" },

wy_c2_gauche_ko:{
  melee:true,
  texte:[
    "La géométrie est bonne. Le sol ne l'est pas.",
    "Vous prenez sa gauche pour la troisième fois et le schiste gelé, sous le pied d'appui, se comporte comme du schiste gelé : il part en plaques.",
    { sobre:"Vous perdez trois pas. Elle en gagne neuf.",
      intense:"Vous perdez trois pas et vous les perdez de la pire manière — un genou à terre, la main libre à plat sur la pierre pour ne pas partir complètement. Elle en gagne neuf. Un adversaire qui vient d'apprendre que vous vous décalez toujours du même côté n'a besoin que d'une seule fois pour vous y attendre.",
      extreme:"Vous perdez trois pas, genou à terre, main à plat. Elle en gagne neuf. Et elle vous attend là — parce qu'un adversaire qui a vu trois fois le même déplacement n'a plus besoin de vous suivre : il lui suffit d'aller à l'endroit où vous allez arriver." },
    "§ Répéter une manœuvre, c'est écrire son propre nom sur la pierre. Elle a appris à lire.",
    "La gueule arrive au niveau du sol, de côté, dans le mouvement d'une faux.",
  ],
  effets:{ cout:{ endurance:22, vitalite:12, moral:6 },
           meleeMaj:{ position:"un genou à terre", note:"Elle vous attend où vous allez" } },
  suite:'wy_combat_3', libelleSuite:"Se relever ou mourir à genoux" },

/* ── Les balistes ────────────────────────────────────────────────────────── */
wy_c2_baliste_dom:{
  melee:true, qui:'bracq',
  texte:[
    "@« BRACQ ! LIGNE ! »",
    "Vous ne criez pas pour être entendu — à quatre-vingts pas, dans une gorge, on n'entend rien. Vous criez pour qu'il voie la bouche bouger et qu'il comprenne le seul mot qui compte.",
    "Il comprend. Un homme qui monte des machines de siège depuis onze ans dans le froid ne comprend jamais autre chose que ce mot-là.",
    "Ensuite c'est de l'arithmétique, et l'arithmétique se fait avec les jambes : vous devez la garder derrière vous et vous mettre hors de l'axe en huit secondes, sur un sol qui ne pardonne pas, avec une bête qui vous suit parce que vous êtes ce qui bouge.",
    { sobre:"Vous sortez de la ligne à la septième seconde. Les deux carreaux partent ensemble.",
      intense:"Vous sortez de la ligne à la septième seconde, en vous laissant tomber derrière le ressaut, et les deux balistes partent ensemble avec ce claquement de câble mouillé qu'aucun autre engin ne fait. Quatre-vingts pas, en ligne, sur une cible de trente pieds de large qui n'a pas la place de tourner.",
      extreme:"Vous sortez de la ligne à la septième seconde en vous laissant tomber derrière le ressaut, et les deux balistes partent ensemble dans un claquement de câble mouillé. Le premier carreau entre par le poitrail et n'en ressort pas. Le second entre plus haut, à la base du cou, ressort de l'autre côté en emportant une main de viande, et va se planter dans la paroi à quarante pieds où il restera dix ans. Elle est arrêtée net, comme un cheval qui prend une haie qu'il n'a pas vue." },
    "§ Onze jours de siège, six semaines de route fermée, trente-cinq carreaux préparés. Il en aura fallu deux et un homme pour la mettre dans l'axe.",
    "Elle n'est pas morte. Elle est clouée : une bête percée de deux carreaux de campagne ne meurt pas de ça, elle meurt de ce qui arrive ensuite. Mais elle est arrêtée, et pour la première fois de cette matinée, elle est à votre merci.",
  ],
  effets:{ flags:['wy_clouee','wy_grise_brisee','wy_bracq_reconnaissant'], cout:{ endurance:20 },
           meleeMaj:{ position:"derrière le ressaut", note:"Deux carreaux dedans · elle est clouée" },
           exploit:{ eclat:8, temoins:() => a('wy_caravane') ? 'foule' : 'quelques',
                     quoi:"vous avez mis la wyverne dans l'axe des balistes et l'y avez tenue" },
           marque:"Vous avez mis la Grise dans l'axe et Bracq a tiré deux carreaux dedans.", court:"Les balistes" },
  suite:'wy_combat_3', libelleSuite:"Approcher" },

wy_c2_baliste_cout:{
  melee:true,
  texte:[
    "@« BRACQ ! LIGNE ! »",
    "Il comprend, il fait armer, et vous courez — et à la sixième seconde vous savez déjà que huit ne suffiront pas.",
    { sobre:"Le carreau de gauche part trop tôt. Il vous passe assez près pour vous décoiffer.",
      intense:"Le carreau de gauche part une seconde trop tôt, parce qu'un servant de dix-neuf ans a lâché le déclencheur en voyant arriver une chose de trente-quatre pieds. Il vous passe à hauteur de tempe. Un carreau de baliste à quatre-vingts pas ne siffle pas : il claque, une seule fois, et l'air derrière lui vous gifle.",
      extreme:"Le carreau de gauche part une seconde trop tôt — un servant de dix-neuf ans a lâché en voyant arriver trente-quatre pieds de bête. Il vous passe à hauteur de tempe, si près que l'empennage de cuir vous ouvre l'oreille en la traversant, et vous n'entendez plus rien de ce côté-là pendant trois jours. Il ne siffle pas : il claque, une fois, et l'air derrière lui vous gifle." },
    "Le carreau de droite, lui, arrive où il faut. Il entre dans le haut de l'aile droite et l'épingle à ce qui reste du ressaut.",
    "§ Un seul carreau, et une oreille. La transaction s'est faite sans vous demander votre avis.",
    "Elle arrache l'aile pour se libérer. Le bruit que ça fait n'est pas un bruit qu'on décrit à quelqu'un qui n'était pas là.",
  ],
  effets:{ flags:['wy_aile_ouverte','wy_grise_brisee'], cout:{ endurance:24, vitalite:8 },
           blessure:{ id:'oreille', zone:"Oreille droite", type:"ouverte par un empennage · sourde de ce côté",
                      gravite:1, douleur:1, saignement:1, fonction:['perception'],
                      cicatrice:"une oreille fendue, qui n'entend plus les aigus" },
           meleeMaj:{ position:"hors de l'axe", note:"Aile droite arrachée · elle est libre et furieuse" },
           exploit:{ eclat:6, temoins:() => a('wy_caravane') ? 'foule' : 'quelques',
                     quoi:"vous avez tenu la ligne des balistes en y restant une seconde de trop" } },
  suite:'wy_combat_3', libelleSuite:"Elle se libère" },

wy_c2_baliste_ko:{
  melee:true,
  texte:[
    "Vous criez. Il comprend. Elle comprend aussi.",
    "Il faut arrêter de se dire qu'une bête est bête. Elle a passé onze jours à regarder des hommes monter deux machines dans le fond du gué, et elle a compris exactement ce qu'un cerf comprend d'un affût : il y a un endroit où l'on ne va pas.",
    { sobre:"Elle sort de l'axe et prend la paroi. Les balistes ne tireront pas.",
      intense:"Elle sort de l'axe par la gauche du gué et se plaque contre la paroi, dans l'ombre, là où le tir rasant des deux engins ne peut pas descendre. Puis elle avance le long de la falaise, en vous gardant entre elle et la ligne — et un homme entre une wyverne et deux balistes tendues est le pire endroit du monde.",
      extreme:"Elle sort de l'axe par la gauche du gué et se plaque contre la paroi, dans l'ombre, là où le tir rasant ne descend pas. Puis elle avance le long de la falaise en vous gardant entre elle et la ligne. Vous voyez Bracq lever la main pour empêcher ses hommes de lâcher — vous le voyez de très loin, très nettement, et vous comprenez que vous venez d'être fait prisonnier de votre propre plan." },
    "§ Vous êtes maintenant le seul obstacle entre trente-cinq carreaux et la seule cible de la vallée.",
    "Elle le sait. Il n'y a aucune façon d'écrire ça qui ne soit pas ridicule, et pourtant : elle le sait.",
  ],
  effets:{ cout:{ endurance:20, moral:8 }, flags:['wy_hors_axe'],
           meleeMaj:{ position:"entre elle et les balistes", note:"Elle est entière · elle vous garde dans la ligne" } },
  suite:'wy_combat_3', libelleSuite:"Sortir de là" },

/* ── La couvée ───────────────────────────────────────────────────────────── */
wy_c2_couvee_dom:{
  melee:true,
  texte:[
    "Il faut sept pas pour se mettre entre une mère et ce qu'elle a pondu, et ces sept pas sont les plus longs de la vallée.",
    "Vous les faites en la regardant. Puis vous posez la pointe de l'épée sur le premier œuf.",
    { sobre:"Elle s'arrête. Tout ce qui était méthode disparaît d'un coup.",
      intense:"Elle s'arrête. Ce n'est pas un ralentissement : c'est un arrêt, total, à mi-pas, une patte encore en l'air. Et tout ce qui était méthode chez elle depuis deux minutes s'efface d'un seul coup, remplacé par autre chose de beaucoup plus vieux et de beaucoup plus bête. Elle baisse la tête. Elle siffle — un son bas, continu, sur deux notes, qui n'est pas une menace mais une supplique.",
      extreme:"Elle s'arrête à mi-pas, une patte en l'air. Tout ce qui était méthode chez elle disparaît d'un coup, remplacé par quelque chose de beaucoup plus vieux et de beaucoup plus bête. Elle baisse la tête au ras du sol, elle siffle — un son bas, continu, à deux notes, qui n'est pas une menace : c'est une supplique — et elle recule. Douze cents livres reculent d'un pas. Puis d'un autre. La chose de la taille d'un chien de berger se traîne entre ses pattes et se met à crier, et elle ne le regarde même pas, parce qu'elle ne peut pas quitter des yeux la pointe posée sur la coquille." },
    "§ Voilà. C'est aussi simple que ça, et c'est aussi laid que ça.",
    "Vous êtes un homme de vingt-quatre ans qui tient une famille en otage pour rouvrir une route de sel. Aucune version de cette matinée ne vous rendra ce que vous venez de dépenser ici.",
    "Elle est ouverte, désarmée, à sept pas, et elle ne bougera plus tant que la pointe sera où elle est.",
  ],
  effets:{ flags:['wy_otage','wy_ouverte','wy_couvee_menacee'], cout:{ moral:15 },
           meleeMaj:{ position:"entre elle et le nid", note:"Elle recule · elle supplie · elle est ouverte" },
           marque:"Vous avez tenu la couvée de la Grise en otage pour la faire reculer.", court:"L'otage" },
  suite:'wy_combat_3', libelleSuite:"Décider" },

wy_c2_couvee_cout:{
  melee:true,
  texte:[
    "Vous prenez les sept pas et vous les prenez trop lentement d'une demi-seconde.",
    { sobre:"Elle arrive sur vous avant l'œuf. Il n'y a plus de tactique du tout.",
      intense:"Elle arrive sur vous avant que la pointe touche la coquille, et ce qui arrive n'a rien à voir avec les deux minutes précédentes : c'est une charge d'animal qui a cessé de calculer. Vous êtes emporté, retourné, écrasé contre le rebord du nid, et pendant quatre secondes il n'y a plus dans le monde que de la poitrine, des ailes et du bruit.",
      extreme:"Elle arrive avant que la pointe touche la coquille, et ce n'est plus une manœuvre : c'est une charge d'animal qui a cessé de calculer. Vous êtes emporté, retourné, écrasé contre le rebord du nid — vingt ans d'os, d'essieux et de fiente sèche — et pendant quatre secondes il n'y a plus au monde que de la poitrine, des ailes et un bruit continu. Quand ça s'arrête, votre bras droit est sous vous, dans une position que les bras ne prennent pas." },
    "Vous vous en sortez pour une seule raison : elle vous lâche pour se retourner vers les œufs, parce que les œufs comptent plus que vous.",
    "§ Vous avez cessé d'être une menace et vous êtes redevenu ce que vous étiez en arrivant dans cette vallée : un détail.",
    "L'épaule droite est démise. Vous la remettez vous-même, contre la paroi, et le bruit que ça fait vous appartient.",
  ],
  effets:{ flags:['wy_couvee_menacee'], cout:{ endurance:26, vitalite:16, moral:8 },
           blessure:{ id:'epaule_d', zone:"Épaule droite", type:"démise et remise à froid",
                      gravite:2, douleur:3, saignement:0, fonction:['force','epees','armes_lourdes','bouclier'],
                      cicatrice:"une épaule qui sortira désormais toute seule" },
           meleeMaj:{ position:"contre la paroi", note:"Elle protège le nid · votre épaule est mauvaise" } },
  suite:'wy_combat_3', libelleSuite:"Se remettre debout" },

wy_c2_couvee_ko:{
  melee:true,
  texte:[
    "Il y a un défaut dans le plan et il tient en une phrase : pour menacer une couvée, il faut d'abord y arriver.",
    "Elle est entre vous et le nid depuis le début. Elle n'a pas bougé de là depuis le début. Ce n'est pas un hasard : c'est la seule chose qu'elle fait depuis six semaines.",
    { sobre:"Vos sept pas vous mettent exactement là où elle voulait que vous soyez.",
      intense:"Vos sept pas vous amènent exactement là où elle voulait que vous soyez : de face, à distance de gueule, sans le ressaut, sans l'axe des balistes, et sans l'ombre d'une raison de vous trouver là.",
      extreme:"Vos sept pas vous amènent exactement là où elle voulait : de face, à distance de gueule, sans couvert, sans axe de tir, et sans l'ombre d'une raison d'être là. La chose la plus humiliante d'un combat perdu n'est pas de le perdre. C'est le quart de seconde où l'on comprend que l'autre attendait qu'on fasse précisément ça." },
    "§ Elle a défendu ce nid contre trois caravanes et onze hommes. Vous êtes le douzième à essayer de passer par là.",
  ],
  effets:{ cout:{ endurance:18, moral:12 },
           meleeMaj:{ position:"de face, à distance de gueule", note:"Elle est entière · vous êtes où elle voulait" } },
  suite:'wy_combat_3', libelleSuite:"Encaisser" },

/* ── Le corps à corps ────────────────────────────────────────────────────── */
wy_c2_corps_dom:{
  melee:true,
  texte:[
    "Une bête qui a trente-quatre pieds d'envergure a besoin de distance comme un homme a besoin d'air. Il faut donc lui prendre la distance, et il n'y a qu'une façon : entrer.",
    "Vous entrez sous la gueule, épaule la première, jusqu'au poitrail, et vous restez collé.",
    { sobre:"Elle ne peut plus vous mordre : vous êtes trop près. Vous montez sur elle.",
      intense:"À douze pouces du poitrail, une gueule de wyverne ne sert plus à rien : la mâchoire ne se referme pas sur ce qui est en dessous d'elle. Elle secoue, elle se cabre, elle essaie de reculer — et vous montez avec, une main dans le repli d'aile, les genoux serrés sur la carène du sternum, comme un homme qui grimperait à un arbre en train de tomber.",
      extreme:"À douze pouces du poitrail, une gueule de wyverne ne sert plus à rien : la mâchoire ne se referme pas sur ce qui est dessous. Elle secoue, se cabre, recule — et vous montez avec, une main enfoncée jusqu'au poignet dans le repli d'aile, les genoux serrés sur la carène du sternum, la joue contre une peau qui est chaude, granuleuse, et qui bat. On sent son cœur à travers. C'est un coup sourd toutes les deux secondes, énorme, et il est juste sous votre oreille." },
    "§ Vous êtes accroché à douze cents livres de panique. C'est la meilleure position de la matinée.",
    "Elle fait la seule chose qui lui reste : elle se jette sur le flanc pour vous écraser. Et une wyverne qui se jette sur le flanc offre, pendant une seconde entière, ce qu'elle n'offre jamais autrement — le dessous du cou, à bout portant.",
  ],
  effets:{ flags:['wy_agrippe','wy_ouverte'], cout:{ endurance:24 },
           meleeMaj:{ position:"accroché à son poitrail", note:"Vous êtes dessus · le cou est à portée" },
           exploit:{ eclat:9, temoins:() => a('wy_sans_temoin') ? 'aucun' : (a('wy_caravane') ? 'foule' : 'quelques'),
                     quoi:"vous êtes monté sur une wyverne vivante" } },
  suite:'wy_combat_3', libelleSuite:"Frapper maintenant" },

wy_c2_corps_cout:{
  melee:true,
  texte:[
    "Vous entrez. Vous arrivez au poitrail. Et vous découvrez ce que découvrent tous les hommes qui entrent au corps à corps avec quelque chose de trois fois leur poids : entrer est facile, rester est un métier.",
    { sobre:"Elle vous secoue et vous partez. Le bras gauche reste accroché une seconde de trop.",
      intense:"Elle vous secoue comme un chien secoue un rat, et vous partez — mais le bras gauche, pris dans le repli d'aile, reste une seconde de trop. Une seconde de trop, à cette force-là, c'est une épaule qui sort et un coude qui apprend à plier dans le mauvais sens.",
      extreme:"Elle vous secoue comme un chien secoue un rat et vous partez — mais le bras gauche, pris dans le repli d'aile, reste une seconde de trop. À cette force-là, une seconde suffit : l'épaule sort, et le coude apprend à plier dans un sens dont il n'avait pas l'usage. Vous atterrissez à six pas avec un bras qui pend et qui, quand vous le regardez, fait un angle qui n'appartient à personne." },
    "Vous êtes vivant parce que vous avez lâché avant qu'elle ne décide de vous garder.",
    "§ Un bras. Il en reste un, et l'épée est une arme qu'on peut tenir d'une seule main quand on n'a plus le choix.",
  ],
  effets:{ cout:{ endurance:30, vitalite:16 },
           blessure:{ id:'bras_g', zone:"Bras gauche", type:"épaule sortie, coude forcé",
                      gravite:3, douleur:3, saignement:0, fonction:['lutte','bouclier','force','jet'],
                      cicatrice:"un bras qui ne se lève plus au-dessus de l'horizontale" },
           meleeMaj:{ position:"à six pas, un bras", note:"Elle est entière · votre bras gauche est fini" } },
  suite:'wy_combat_3', libelleSuite:"À une main" },

wy_c2_corps_ko:{
  melee:true,
  texte:[
    "Vous entrez, et elle ne recule pas : elle se laisse tomber en avant, de tout son poids, comme un mur qu'on pousse et qui bascule vers vous.",
    { sobre:"Douze cents livres vous mettent au sol et restent dessus.",
      intense:"Douze cents livres vous mettent au sol et restent dessus. Ce n'est pas douloureux au début. C'est simplement impossible : les côtes ne descendent plus, le ventre ne se creuse plus, et l'air qui reste dans le corps est tout l'air qu'il y aura.",
      extreme:"Douze cents livres vous mettent au sol et restent dessus. Ce n'est pas douloureux au début : c'est simplement impossible. Les côtes ne descendent plus, le ventre ne se creuse plus, et l'air qui est dans le corps est tout l'air qu'il y aura jamais. Au bout de neuf secondes, la vue se referme par les bords, en gris, comme un couloir. Au bout de quinze, on cesse de se débattre — non par courage, mais parce qu'il n'y a plus de quoi." },
    "Elle se relève parce qu'un bruit, quelque part, l'a distraite. Un bruit de câble, ou de pierre, ou un cri. Vous ne saurez jamais lequel.",
    "§ Vous êtes vivant par accident. Ça arrive plus souvent qu'on ne le raconte.",
    "L'air revient en deux fois. La deuxième fois est pire que la première.",
  ],
  effets:{ cout:{ endurance:34, vitalite:22, moral:10 },
           blessure:{ id:'thorax', zone:"Thorax", type:"comprimé sous son poids · trois côtes",
                      gravite:3, douleur:3, saignement:0, fonction:['endurance','force','lutte','epees'],
                      cicatrice:"une respiration qui siffle à l'effort, pour toujours" },
           meleeMaj:{ position:"au sol, l'air revient", note:"Elle est entière · vous ne respirez qu'à moitié" } },
  suite:'wy_combat_3', libelleSuite:"Se relever" },

/* ── La laisser se vider ─────────────────────────────────────────────────── */
wy_c2_vider_dom:{
  melee:true,
  texte:[
    "Il n'y a rien de glorieux dans ce qui suit et c'est ce qui le rend efficace.",
    "Vous reculez. Pas en fuyant : au rythme exact où elle avance, en gardant sept pas, en ne frappant jamais, en ne présentant jamais une occasion. Et vous laissez la seule chose qui travaille pour vous continuer à travailler.",
    { sobre:"Elle laisse une trace sur le schiste. La trace s'élargit.",
      intense:"Elle laisse une trace sur le schiste. Au début c'est une ligne pointillée ; au bout de quarante pas c'est une ligne continue ; au bout de cent, c'est une largeur de main. Une bête qui saigne à ce débit-là n'a pas de temps, et le temps est la seule ressource qu'un homme a en plus.",
      extreme:"Elle laisse une trace sur le schiste. Une ligne pointillée, puis continue, puis large comme une main. Au bout de cent quarante pas elle marche dedans, et à chaque pas ça fait le bruit qu'on entend chez un boucher. Sa langue est sortie. Ses yeux ont cette fixité vitreuse qui n'est plus de la volonté : c'est ce qui reste quand le sang ne monte plus assez haut." },
    "§ Cent quarante pas. C'est tout ce qu'il a fallu.",
    "Elle s'arrête d'elle-même. Elle pose le poitrail sur la pierre, garde la tête haute encore un moment — parce qu'elles gardent la tête haute jusqu'au bout, celles-là — et cesse d'essayer d'avancer.",
    "Elle est vivante. Elle est à sept pas. Elle vous regarde.",
  ],
  effets:{ flags:['wy_a_terre','wy_ouverte'], cout:{ endurance:10 },
           meleeMaj:{ position:"à sept pas, debout", note:"Elle est à terre · elle vous regarde" } },
  suite:'wy_combat_3', libelleSuite:"Approcher" },

wy_c2_vider_cout:{
  melee:true,
  texte:[
    "Reculer au rythme d'une bête qui saigne suppose que la bête ignore ce que vous faites. Elle ne l'ignore pas longtemps.",
    "À la quatrième minute, elle change de méthode : elle cesse d'avancer sur vous et se met à couper — grands déplacements latéraux pour vous rabattre vers la paroi, pour réduire les sept pas à cinq, puis à trois.",
    { sobre:"Vous êtes acculé. Le dernier bond vous atteint à l'épaule.",
      intense:"Vous êtes acculé contre le schiste et le dernier bond arrive sans préparation. Vous parez de l'avant-bras — ce qui est absurde et ce qu'on fait toujours — et les dents prennent l'épaule par-dessus le cuir : elles ne referment pas, elles râpent, et râper avec des dents recourbées de deux pouces revient à passer un râteau dans un muscle.",
      extreme:"Vous êtes acculé et le dernier bond arrive sans préparation. Vous parez de l'avant-bras, ce qui est absurde et ce qu'on fait toujours, et les dents prennent l'épaule par-dessus le cuir. Elles ne referment pas : elles râpent. Passer des dents recourbées de deux pouces dans un deltoïde revient à y passer un râteau — quatre sillons parallèles, profonds, qui montrent le blanc au fond avant que le sang ne les remplisse. Et ces dents-là sortent d'une gueule où pourrissent, depuis des semaines, les restes de onze personnes." },
    "§ Elle se vide toujours. Vous aussi, maintenant.",
    "C'est devenu une course entre deux hémorragies, et la plus grosse des deux n'est pas forcément la plus rapide.",
  ],
  effets:{ flags:['wy_infecte'], cout:{ endurance:20, vitalite:14 },
           blessure:{ id:'epaule_g', zone:"Épaule gauche", type:"quatre sillons profonds · souillée",
                      gravite:2, douleur:3, saignement:4, fonction:['force','epees','lutte','jet'],
                      cicatrice:"quatre lignes parallèles, et ce qui a poussé dedans" },
           meleeMaj:{ position:"acculé à la paroi", note:"Elle se vide · vous aussi" } },
  suite:'wy_combat_3', libelleSuite:"Il faut en finir" },

wy_c2_vider_ko:{
  melee:true,
  texte:[
    "Vous reculez, et elle ne vous suit pas.",
    "Elle fait mieux : elle vous laisse reculer, et elle va boire.",
    { sobre:"Elle descend à la rivière, boit longuement, et remonte.",
      intense:"Elle descend au bord de la rivière à trente pas, plonge la gueule dans l'eau glacée, et boit pendant un temps déraisonnable — quarante secondes, peut-être une minute — pendant que vous la regardez sans oser fermer la distance. Puis elle relève la tête, et la trace qu'elle laissait sur le schiste est déjà moins large.",
      extreme:"Elle descend au bord de la rivière, plonge la gueule dans l'eau glacée et boit pendant quarante secondes pleines, à grandes gorgées qu'on voit descendre le long du cou. L'eau de février fait exactement ce que fait l'eau de février sur une plaie ouverte : elle resserre. Quand elle relève la tête, le sang qui coulait en ligne coule maintenant en gouttes, et vous comprenez que vous venez de lui offrir la seule chose qu'elle ne pouvait pas prendre toute seule — le temps." },
    "§ Une bête qui a vingt ans dans une gorge de montagne connaît sa gorge mieux que vous.",
    "Vous avez perdu quatre minutes, une partie de votre avantage, et toute l'idée que le temps travaillait pour vous.",
  ],
  effets:{ cout:{ endurance:14, moral:8 }, flags:['wy_a_bu'],
           meleeMaj:{ position:"à trente pas", note:"Elle a bu · elle saigne moins" } },
  suite:'wy_combat_3', libelleSuite:"Reprendre" },

};
Object.assign(ARC_WYVERNE, ARC_WYVERNE_6);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 7 — TROISIÈME ÉCHANGE, LE NID, LE RETOUR
 *
 * Le troisième échange lit tout ce qui précède. On peut la tuer, la laisser
 * partir, ou ne pas y arriver — et ne pas y arriver, avec assez de sang
 * perdu, veut dire mourir au gué de Cendrepont à trente ans.
 * ══════════════════════════════════════════════════════════════════════════ */

const ARC_WYVERNE_7 = {

wy_combat_3:{
  titre:"L'un des deux ne remonte pas",
  melee:true,
  texte:[
    () => a('wy_clouee') ? "Elle est épinglée au sol par deux carreaux de campagne et elle continue d'essayer d'avancer. C'est la chose la plus difficile à regarder de toute la matinée."
      : (a('wy_otage') ? "Elle est à sept pas, tête basse, et elle siffle sur deux notes sans arrêter, et rien de tout cela ne s'adresse à vous : ça s'adresse à ce qu'il y a derrière vous, dans le nid."
      : (a('wy_a_terre') ? "Elle a posé le poitrail sur la pierre. La tête reste haute. Elle vous regarde comme regardent les choses qui ont compris et qui n'ont pas l'intention de le montrer."
      : (a('wy_agrippe') ? "Vous êtes accroché à son poitrail, la joue contre une peau qui bat, et elle est en train de basculer sur le flanc pour vous écraser dessous."
      : (a('wy_ouverte') ? "Elle est ouverte de face, essoufflée, la langue sortie, à portée."
      : "Elle est entière. Vous ne l'êtes plus.")))),
    () => {
      const n = ETAT.blessures.length;
      const s = ETAT.ressources.sang;
      if(n >= 3 || s <= 45) return { sobre:"Vous n'avez plus grand-chose. Le froid a cessé de se faire sentir, ce qui est mauvais signe.",
        intense:"Vous n'avez plus grand-chose. Le froid a cessé de se faire sentir — c'est le premier des trois signes, et le deuxième est cette envie parfaitement déraisonnable de s'asseoir un moment. Vous vous connaissez assez pour savoir qu'il n'y aura pas de quatrième échange, quel que soit celui qui le demande.",
        extreme:"Vous n'avez plus grand-chose. Le froid a cessé de se faire sentir — premier signe. L'envie parfaitement déraisonnable de s'asseoir un moment — deuxième. Le troisième arrive quand la bouche devient pâteuse et que le goût du métal monte de la gorge, et il est arrivé il y a une minute. Il n'y aura pas de quatrième échange, quel que soit celui qui le demande." };
      if(n >= 1) return "Vous saignez de trois endroits et il vous reste du souffle pour une chose et une seule. Le choix de laquelle est le dernier choix de cette matinée.";
      return "Vous êtes en meilleur état qu'elle et c'est la seule fois de la matinée où ce sera vrai. Ça ne durera pas.";
    },
    "§ Vingt ans dans une gorge de schiste. Onze personnes. Trois caravanes. Une couvée dans une borne.",
    "Elle n'a rien fait de mal. C'est la partie du métier que personne ne dit à voix haute au moment de signer.",
  ],
  choix:[
    { t:"La moelle, sous l'occiput",
      detail:"Le seul endroit qui tue d'un coup · quatre pouces de large · Force + anatomie contre 10",
      risque:"définitif", definitif:true,
      ferme:"Ferme : toute possibilité qu'elle reparte de ce gué vivante",
      test:{ carac:'force', comp:'anatomie', dc:dcGrise(10), adversaire:'grise', manoeuvre:'moelle',
             equipement:() => a('wy_desarme') ? -3 : 2,
             situation:() => (a('wy_ouverte') ? 3 : 0) + (a('wy_a_terre') ? 4 : 0) +
                             (a('wy_clouee') ? 5 : 0) + (a('wy_otage') ? 4 : 0) + (a('wy_agrippe') ? 4 : 0) },
      degres:{ dominante:'wy_c3_moelle_dom', couteuse:'wy_c3_moelle_cout', echec:'wy_c3_moelle_ko' } },

    { t:"Achever aux balistes",
      si:() => a('wy_avantage_baliste') && !a('wy_hors_axe'),
      detail:"Sortir de la ligne et laisser six hommes finir · trente-trois carreaux restants",
      risque:"définitif", definitif:true,
      ferme:"Ferme : que ce soit vous qui l'ayez tuée",
      va:'wy_c3_baliste' },

    { t:"La laisser partir",
      si:() => a('wy_ouverte') || a('wy_a_terre') || a('wy_otage') || a('wy_epuisee'),
      detail:"Reculer · ouvrir la route · et ne pas rouvrir la Route Grise",
      risque:"définitif", definitif:true,
      ferme:"Ferme : les deux cent cinquante couronnes de Valombre",
      va:'wy_c3_epargne' },

    { t:"L'Onde · tout ce qui reste",
      si:() => !a('wy_onde_vue'),
      detail:"Vider la concentration jusqu'au fond · Volonté + Onde contre 9",
      risque:"définitif", definitif:true,
      ferme:() => a('wy_sans_temoin') ? null : "Ferme : l'idée que vous êtes un homme d'armes ordinaire",
      test:{ carac:'volonte', comp:'onde', dc:9, adversaire:'grise', manoeuvre:'onde_fin',
             cout:{ concentration:40 },
             situation:() => ETAT.ressources.concentration >= 40 ? 2 : -4 },
      degres:{ dominante:'wy_c3_onde_dom', couteuse:'wy_c3_onde_cout', echec:'wy_c3_onde_ko' } },

    { t:"Rompre. Redescendre. Vivre.",
      detail:"Le contrat n'est pas rempli · la route reste fermée · vous rentrez sur vos jambes",
      risque:"définitif", definitif:true,
      ferme:"Ferme : le contrat de Valombre, et ce qu'on dira de vous dans cette vallée",
      va:'wy_c3_rompre' },
  ],
},

/* ── La moelle ───────────────────────────────────────────────────────────── */
wy_c3_moelle_dom:{
  texte:[
    "Il y a, entre la base du crâne et la première vertèbre, un espace de quatre pouces où les plaques ne se recouvrent pas parce qu'il faut bien que la tête puisse bouger.",
    "Quatre pouces. Sur trente-quatre pieds de bête. C'est tout ce qu'un homme a jamais eu.",
    { sobre:"La pointe entre là. Tout s'arrête d'un coup, sans transition.",
      intense:"Vous prenez l'épée à la lame, main gantée à mi-fer, et vous poussez comme on pousse un pieu — pas un coup : une poussée, tout le corps derrière. La pointe entre à quatre pouces sous l'occiput et trouve le canal. Et il ne se passe rien de spectaculaire du tout : douze cents livres cessent, d'un coup, sans transition, sans convulsion, sans un son. Debout une seconde, à terre la suivante.",
      extreme:"Vous prenez l'épée à la lame, main gantée à mi-fer, et vous poussez comme on pousse un pieu — tout le corps derrière. La pointe entre à quatre pouces sous l'occiput, racle l'os, trouve le canal et le remplit. Il ne se passe rien de spectaculaire : douze cents livres cessent d'exister d'un coup. Pas de convulsion, pas de cri. Les yeux restent ouverts et la membrane grise ne repasse plus. Le seul mouvement des trois minutes suivantes est celui de la vessie qui se vide et d'une patte arrière qui gratte trois fois le schiste, lentement, sans que rien la commande." },
    "§ Elle est morte avant d'avoir touché le sol. C'est plus qu'on n'en accorde à la plupart des hommes.",
    () => a('wy_sans_temoin')
      ? "Il n'y a personne pour voir ça. La gorge est vide, l'aube se lève sur du gris, et vous restez assis à côté d'elle un long moment, parce qu'il n'y a rien d'autre à faire et personne devant qui faire autre chose."
      : "Derrière vous, il ne se passe rien pendant sept secondes. Puis un des servants se met à hurler, un seul, un cri idiot et sans mots, et les cinq autres s'y mettent en même temps. Bracq ne crie pas. Bracq s'assoit sur l'affût de sa baliste et met sa main à trois doigts sur sa figure.",
  ],
  effets:{ flags:['wy_morte','wy_morte_par_vous'], cout:{ endurance:10 },
           exploit:{ eclat:14, suspicion:6,
                     temoins:() => a('wy_sans_temoin') ? 'aucun' : (a('wy_caravane') ? 'province' : 'foule'),
                     quoi:"vous avez tué la wyverne de Cendrepont à l'épée" },
           marque:"Vous avez tué la Grise d'une poussée sous l'occiput.", court:"La Grise est morte" },
  suite:'wy_nid', libelleSuite:"Monter au nid" },

wy_c3_moelle_cout:{
  texte:[
    "Vous trouvez les quatre pouces. Vous ne les trouvez pas du premier coup.",
    { sobre:"La première poussée racle l'os et glisse. Elle vous prend le bras avant la seconde.",
      intense:"La première poussée racle la plaque occipitale et glisse de côté, et vous avez très exactement le temps de comprendre votre erreur avant que la tête ne revienne. Elle vous prend l'avant-bras droit — pas d'un coup de gueule : d'un mouvement de côté, presque paresseux, comme un chien qui déplace un os. Puis elle serre.",
      extreme:"La première poussée racle la plaque occipitale et glisse. La tête revient et prend l'avant-bras droit d'un mouvement de côté presque paresseux, comme un chien qui déplace un os. Puis elle serre, et vous entendez les deux os de l'avant-bras céder l'un après l'autre, distinctement, avec un intervalle d'une demi-seconde entre les deux — le radius, puis le cubitus." },
    "Vous ne lâchez pas l'épée. Vous ne pouvez plus : la main est fermée dessus et elle ne s'ouvrira plus avant qu'on ne la desserre de force.",
    "La seconde poussée se fait de la main gauche, à plat sur le pommeau, et elle entre.",
    { sobre:"Elle meurt en vous tenant le bras. Il faut la desserrer après.",
      intense:"Elle meurt en vous tenant le bras. C'est un détail qu'on n'imagine pas : une gueule morte ne s'ouvre pas toute seule. Il faut trois hommes, un levier de bois et onze minutes pour vous sortir de là, et pendant onze minutes vous êtes attaché par le poignet à ce que vous venez de tuer.",
      extreme:"Elle meurt en vous tenant le bras, et une gueule morte ne s'ouvre pas toute seule. Il faut trois hommes, un levier de frêne et onze minutes pour vous en sortir, et pendant onze minutes vous êtes attaché par le poignet à ce que vous venez de tuer, la joue contre une peau qui refroidit, à regarder de très près les choses coincées entre ses dents. Quand le bras sort, il sort mou, et il pend." },
    "§ La route est rouverte. Vous n'écrirez plus jamais de la main droite.",
  ],
  effets:{ flags:['wy_morte','wy_morte_par_vous'], cout:{ endurance:22, vitalite:20 },
           blessure:{ id:'avantbras_d', zone:"Avant-bras droit", type:"les deux os brisés dans sa gueule",
                      gravite:3, douleur:3, saignement:1, fonction:['force','epees','armes_lourdes','lutte','tir'],
                      cicatrice:"un avant-bras qui a pris deux mois à se refermer et qui ne se redresse plus" },
           exploit:{ eclat:14, suspicion:6,
                     temoins:() => a('wy_sans_temoin') ? 'aucun' : (a('wy_caravane') ? 'province' : 'foule'),
                     quoi:"vous avez tué la wyverne de Cendrepont, le bras dans sa gueule" },
           marque:"Vous avez tué la Grise en lui laissant votre avant-bras droit.", court:"Le bras droit" },
  suite:'wy_nid', libelleSuite:"Monter au nid" },

wy_c3_moelle_ko:{
  texte:[
    "Vous poussez, et la pointe part sur la plaque comme un couteau sur une assiette.",
    { sobre:"Il n'y a pas de deuxième chance. Elle vous a.",
      intense:"Il n'y a pas de deuxième chance sur un coup de moelle : soit on entre, soit on est à quatorze pouces d'une gueule ouverte avec une épée engagée dans le mauvais sens et rien dans les mains pour ce qui vient.",
      extreme:"Il n'y a pas de deuxième chance sur un coup de moelle. Soit on entre, soit on est à quatorze pouces d'une gueule ouverte, l'épée engagée dans le mauvais sens, les deux bras hors de position, et le monde entier qui se réduit à un tunnel de dents recourbées." },
    { sobre:"Ce qui suit se passe vite et vous n'en gardez que des morceaux.",
      intense:"Ce qui suit se passe très vite et vous n'en garderez que des morceaux : le schiste contre la joue, une odeur, un poids, quelque chose qui cède du côté gauche du corps, et la certitude étrangement calme que ce n'est pas la douleur qui vous tuera mais le froid, ensuite, si personne ne vient.",
      extreme:"Ce qui suit se passe vite et vous n'en garderez que des morceaux : le schiste contre la joue, l'odeur, le poids, quelque chose qui cède du côté gauche, et le bruit très net que fait votre propre sang en tombant sur de la pierre gelée — parce qu'il tombe de haut, ce qui veut dire qu'il sort vite, ce qui veut dire qu'il n'y a plus beaucoup de décisions à prendre. La certitude étrangement calme, aussi, que ce n'est pas ça qui vous tuera. C'est le froid, ensuite, si personne ne vient." },
    "§ Personne ne vient toujours, dans ces cas-là. Personne vient parfois.",
  ],
  effets:{ cout:{ endurance:40, vitalite:35, moral:15 },
           blessure:{ id:'flanc_ouvert', zone:"Flanc gauche", type:"ouvert par un ergot, profond",
                      gravite:3, douleur:3, saignement:6, fonction:['force','endurance','agilite','epees','lutte'],
                      cicatrice:"une plaie qui a mis quatre mois et qui suinte encore quand il gèle" },
           marque:"Vous avez manqué la moelle et payé le flanc gauche.", court:"Le flanc ouvert" },
  suite:'wy_survie', libelleSuite:"…" },

/* Aiguillage : à ce point, l'état du corps décide seul. */
wy_survie:{ dyn:true, texte:[], suite:'wy_traine' },

wy_traine:{
  texte:[
    () => a('wy_sans_temoin')
      ? "Personne ne vient, parce que vous avez choisi que personne ne saurait où vous étiez."
      : "Bracq vient. Un homme de cinquante ans avec trois doigts et six servants terrifiés descend les quatre-vingts pas du gué en courant, ce qu'aucun règlement de maison ne lui demandait de faire.",
    () => a('wy_sans_temoin')
      ? "Vous sortez de là seul, sur les coudes, sur cent quarante pas, en février, avec un flanc ouvert. Ça prend deux heures. Il n'existe aucun témoin, aucun récit, et rien de ce que vous avez fait ce matin n'est arrivé du point de vue de la vallée."
      : "On vous sort de là à quatre. On vous porte jusqu'au camp sur un plateau de baliste démonté, ce qui est probablement la première fois qu'un engin de siège sert à ça, et Bracq maintient lui-même les deux mains sur votre flanc pendant tout le trajet.",
    { sobre:"La bête est partie. Elle est repartie en haut, blessée, et la route reste ce qu'elle était.",
      intense:"La bête, elle, est repartie en haut. Blessée, essoufflée, saignant de trois endroits, mais vivante — et la Route Grise reste très exactement ce qu'elle était en novembre : fermée.",
      extreme:"La bête est repartie en haut. Blessée, saignant de trois endroits, mais vivante. Et la Route Grise reste très exactement ce qu'elle était en novembre : fermée, avec des choses accrochées aux vires à mi-hauteur." },
    "§ On ne meurt pas toujours. Il arrive qu'on rentre simplement moins complet qu'on n'est parti.",
  ],
  effets:{ flags:['wy_echec_total','wy_grise_vivante'],
           marque:"Vous avez perdu au gué de Cendrepont et vous en êtes revenu.", court:"Vous avez perdu" },
  suite:'wy_retour', libelleSuite:"Redescendre à Valombre" },

wy_mort:{
  lieu:"Le gué de Cendrepont · vingt minutes plus tard",
  titre:"Yohan de Karlsberg",
  texte:[
    { sobre:"Le froid arrive avant le reste. C'est presque supportable.",
      intense:"Le froid arrive avant le reste et il arrive par les pieds, puis par les mains, puis il cesse d'être du froid pour devenir une sorte de chaleur mal placée. On dit que c'est la dernière chose agréable. On dit vrai.",
      extreme:"Le froid arrive par les pieds, puis par les mains, puis il cesse d'être du froid pour devenir une chaleur mal placée qui monte des cuisses vers le ventre. Le sang, sur la pierre gelée, ne coagule pas : il fume, et il continue de fumer bien après qu'on ait cessé d'y contribuer." },
    "Vous n'avez pas dit à Héloïse de Valombre pourquoi vous aviez pris ce contrat plutôt qu'un autre. Vous n'avez pas dit à Bracq ce que vous aviez vu sur la borne. Vous n'avez dit à personne, en dix-neuf ans, quel nom on avait rayé.",
    "§ Et cette borne, à cent quarante pieds, porte un loup sous quarante ans de fiente, et il n'y a plus personne au monde pour savoir de qui il est.",
    "La Route Grise reste fermée. Le sel du bas du gué continue de passer chez Gassien le Lièvre. Amaury de Valombre vend trois œufs à un seigneur de guerre de la côte au printemps, et sa mère vend la tour à l'automne.",
    "On enterre un mercenaire sans nom au bord de la route, à l'endroit exact où le péage de sa propre famille prélevait un sou par essieu, il y a deux cents ans.",
  ],
  issue:"Fin",
  bilan:"Le dernier Karlsberg est mort au gué de Cendrepont, à vingt-quatre ans, et personne ne l'a su",
  apres:[
    "Ce n'est pas une punition. C'est ce qui arrive quand on entre en dernier échange avec trois blessures ouvertes et un choix qui demandait un corps entier.",
    "L'Acte I s'arrête ici. Il n'y a pas d'héritier, il n'y a pas de suite, et il n'y a rien à récupérer : c'est ce que veut dire *définitif*.",
  ],
  plusTard:"Rien. Et c'est exactement ce qui rend le reste précieux.",
},

/* ── Les balistes ────────────────────────────────────────────────────────── */
wy_c3_baliste:{
  qui:'bracq',
  texte:[
    "Vous levez le bras et vous sortez de la ligne, et c'est tout ce que vous avez à faire.",
    "Ce n'est pas votre travail de la tuer. C'est votre travail de rouvrir la route, et six hommes payés par la maison de Valombre attendent depuis onze jours dans le froid de pouvoir faire le leur.",
    { sobre:"Trente-trois carreaux restent. Il en faut neuf.",
      intense:"Il en faut neuf. Ils tirent en alternance, une baliste puis l'autre, à quatre-vingts pas, sur une chose qui ne vole plus et qui essaie de remonter le gué. Bracq compte à voix haute entre chaque salve, parce qu'un maître d'engins compte toujours, et parce qu'un homme qui compte n'a pas à penser à autre chose.",
      extreme:"Il en faut neuf. Ils tirent en alternance à quatre-vingts pas sur une chose qui ne vole plus et qui essaie de remonter le gué. Les quatre premiers entrent sans effet visible. Le cinquième ouvre le ventre et ce qui en sort traîne derrière elle sur quinze pas avant qu'elle ne marche dessus. Elle continue d'avancer avec ça. Le neuvième lui prend le cou de biais. Bracq compte à voix haute entre chaque salve, parce qu'un maître d'engins compte toujours et parce qu'un homme qui compte n'a pas à penser à autre chose." },
    "§ Ça prend onze minutes. C'est très long, onze minutes.",
    "Personne ne crie, à la fin. Le gamin de dix-neuf ans qui servait la baliste de gauche va vomir derrière l'affût et deux de ses camarades l'accompagnent, ce qui est une chose que font les hommes qui ont fait quelque chose ensemble.",
    "Bracq essuie ses trois doigts sur sa cuisse.",
    "« C'est vous qui l'avez mise là. Je le dirai comme ça à la dame. »",
    "« Dites-le comme vous voulez. »",
    "« Non, messire. Je le dirai comme ça. »",
  ],
  effets:{ flags:['wy_morte','wy_morte_baliste','wy_bracq_reconnaissant'],
           exploit:{ eclat:9, temoins:() => a('wy_caravane') ? 'foule' : 'quelques',
                     quoi:"la wyverne est morte sous les balistes que vous aviez mises dans l'axe" },
           marque:"La Grise est morte sous neuf carreaux de Valombre, et Bracq dira que c'est vous.", court:"Neuf carreaux" },
  suite:'wy_nid', libelleSuite:"Monter au nid" },

/* ── L'épargner ──────────────────────────────────────────────────────────── */
wy_c3_epargne:{
  texte:[
    "Vous reculez d'un pas. Puis d'un autre. Puis vous baissez la pointe.",
    "Il n'y a aucun raisonnement là-dedans qu'on puisse défendre devant une veuve qui paie deux cent cinquante couronnes. Il y a une bête à sept pas qui a vingt ans, une aile percée par une baliste de Chastel l'automne dernier, une couvée dans une borne, et qui n'a jamais rien fait d'autre que ce que font les choses de son espèce depuis avant qu'il y ait des routes.",
    { sobre:"Elle ne comprend pas tout de suite. Puis elle recule aussi.",
      intense:"Elle ne comprend pas tout de suite. Une bête acculée ne sait pas lire un homme qui recule : elle attend le coup pendant plusieurs secondes, la tête basse, avant que quelque chose ne se relâche dans la nuque. Puis elle recule aussi. Elle recule sur trente pas sans vous quitter des yeux, et elle remonte la paroi en s'aidant des poignets d'aile parce qu'elle ne peut plus voler.",
      extreme:"Elle ne comprend pas tout de suite : une bête acculée ne sait pas lire un homme qui recule, et elle attend le coup pendant plusieurs secondes, la tête au ras de la pierre. Puis quelque chose se relâche dans la nuque. Elle recule sur trente pas sans vous quitter des yeux, traînant l'aile ouverte dans son propre sang, et elle remonte les cent quarante pieds de paroi aux poignets d'aile, par à-coups, en s'arrêtant deux fois. La dernière chose qu'on voit d'elle, c'est une masse grise qui se hisse sur le rebord du nid et qui disparaît dedans." },
    "§ La Route Grise reste fermée. Vous venez de décider ça pour tout le monde et sans consulter personne.",
    "Quatre caravanes par semaine en été. Trois villages qui vivent du sel du bas du gué. Une maison qui vend sa tour à l'automne parce que le péage ne rapporte plus.",
    "Vous n'avez pas fait ça par bonté. Vous l'avez fait parce que vous avez vu, à cent quarante pieds, un loup gravé sur une borne de route sous quarante ans de fiente, et qu'il vous a semblé, l'espace de quelques secondes, que cette gorge n'appartenait pas à la maison de Valombre.",
    () => a('wy_sans_temoin')
      ? "Personne n'a vu. Vous direz ce que vous voudrez en bas, et ce que vous direz sera la vérité officielle, et vous saurez."
      : "Six servants de baliste ont vu. Bracq a vu. Ce que vous direz en bas n'aura aucune importance : ils étaient là.",
  ],
  effets:{ flags:['wy_epargnee','wy_grise_vivante'], cout:{ moral:-10 },
           exploit:{ eclat:4, temoins:() => a('wy_sans_temoin') ? 'aucun' : 'quelques',
                     quoi:"vous avez laissé partir la wyverne de Cendrepont" },
           marque:"Vous avez épargné la Grise et laissé la Route Grise fermée.", court:"Épargnée" },
  suite:'wy_retour', libelleSuite:"Redescendre à Valombre" },

/* ── L'Onde, jusqu'au fond ───────────────────────────────────────────────── */
wy_c3_onde_dom:{
  texte:[
    "Il reste une chose et une seule, et elle n'est pas dans les bras.",
    "Vous cessez de retenir, et cette fois vous ne retenez rien du tout.",
    { sobre:"Le gué se soulève. Elle est prise dedans.",
      intense:"Ce n'est plus une poussée : c'est le gué entier qui se soulève sur quarante pas. Le schiste part en plaques, la rivière se creuse jusqu'au lit, et douze cents livres sont prises dedans et retournées deux fois avant d'arriver contre la paroi. La colonne vertébrale ne résiste pas à ça. Rien ne résiste à ça, et c'est pour cette raison précise qu'un homme qui sait le faire ne peut pas rester longtemps un homme ordinaire.",
      extreme:"Ce n'est plus une poussée : le gué entier se soulève sur quarante pas. Le schiste part en plaques de la taille d'une porte, la rivière se creuse jusqu'au lit et retombe, et douze cents livres sont prises dedans, retournées deux fois, et arrivent contre la paroi dans le sens de la longueur. Le dos casse en deux endroits. Elle est morte avant de redescendre, et elle redescend en s'ouvrant." },
    "§ Vous êtes à genoux, le nez et les oreilles en sang, dans un silence qu'aucun de ces hommes n'oubliera.",
    () => a('wy_sans_temoin')
      ? "Il n'y a personne. Le gué est vide sur trois cents pas, la lumière monte, et vous restez à genoux dans quarante pas de pierre retournée en écoutant votre propre sang tomber sur du schiste. Personne ne saura jamais. C'est le meilleur résultat possible et vous n'en tirez aucune joie."
      : "Bracq est le premier à parler, et il met deux minutes à le faire. « Messire. » Puis, plus bas, à ses six hommes, sans se retourner : « Vous n'avez rien vu. Aucun de vous. » Deux d'entre eux hochent la tête. Les quatre autres, non.",
  ],
  effets:{ flags:['wy_morte','wy_morte_onde','wy_onde_vue'], cout:{ endurance:25, vitalite:10 },
           exploit:{ eclat:16, suspicion:45,
                     temoins:() => a('wy_sans_temoin') ? 'aucun' : (a('wy_caravane') ? 'province' : 'foule'),
                     quoi:"le gué s'est soulevé et la wyverne est morte sans être touchée" },
           marque:"Vous avez tué la Grise par l'Onde, en soulevant quarante pas de gué.", court:"L'Onde" },
  suite:'wy_nid', libelleSuite:"Monter au nid" },

wy_c3_onde_cout:{
  texte:[
    "Ça part, et ça emporte tout, et ça vous emporte aussi.",
    { sobre:"Elle meurt. Vous ne vous relevez pas avant la nuit.",
      intense:"Elle meurt contre la paroi et vous, vous restez couché dans les gravats pendant six heures. Ce n'est pas de l'évanouissement : c'est autre chose, une absence claire où l'on entend tout et où l'on ne commande plus rien du corps. On vous parle. Vous entendez. Vous ne répondez pas parce que la mâchoire n'appartient plus au même homme.",
      extreme:"Elle meurt contre la paroi. Vous, vous restez couché dans les gravats pendant six heures — pas évanoui : absent d'une façon claire, où l'on entend tout et où l'on ne commande plus rien. On vous parle, on vous porte, on vous met quelque chose de chaud dans les mains. Vous entendez. Vous ne répondez pas parce que la mâchoire n'appartient plus au même homme. Vous saignez des oreilles pendant deux jours et vous vous réveillez le troisième en ayant perdu une semaine complète de mémoire, dont le soir de votre arrivée à Valombre." },
    "§ Ce qu'on prend là-dedans, on ne le rend pas entièrement.",
    () => a('wy_sans_temoin')
      ? "Personne n'a vu. Personne n'aurait pu vous ramasser non plus, et vous devez d'être vivant au fait qu'un charretier du bas du gué est passé par là au crépuscule et n'a pas eu le cœur de laisser un homme dans les pierres."
      : "Six servants et un maître d'engins ont porté, pendant six heures, un homme qui venait de retourner quarante pas de route sans le toucher. Deux d'entre eux ont demandé à être relevés de leur poste avant la fin du mois. Ils n'ont pas dit pourquoi, et personne ne leur a demandé.",
  ],
  effets:{ flags:['wy_morte','wy_morte_onde','wy_onde_vue','wy_onde_brulure'],
           cout:{ endurance:45, concentration:50, vitalite:22, moral:12 },
           blessure:{ id:'onde', zone:"Ce que l'Onde prend", type:"six heures d'absence · deux jours de sang aux oreilles",
                      gravite:2, douleur:1, saignement:0, fonction:['intellect','concentration','perception','onde'],
                      cicatrice:"une semaine de mémoire qui n'est jamais revenue" },
           exploit:{ eclat:16, suspicion:50,
                     temoins:() => a('wy_sans_temoin') ? 'un' : (a('wy_caravane') ? 'province' : 'foule'),
                     quoi:"le gué s'est soulevé, et l'homme qui l'a fait est resté six heures à terre" },
           marque:"Vous avez tué la Grise par l'Onde et vous y avez laissé une semaine de mémoire.", court:"Ce que l'Onde prend" },
  suite:'wy_nid', libelleSuite:"Plus tard, monter au nid" },

wy_c3_onde_ko:{
  texte:[
    "Il n'y a rien.",
    "On ne vide pas un puits deux fois dans la même matinée. Vous cherchez l'endroit dans le crâne où ça se prend, vous le trouvez, et il est vide — et pendant que vous cherchez, vous êtes un homme immobile, la main ouverte, devant une chose qui avance.",
    { sobre:"Elle vous prend en pleine poitrine. Vous ne vous relevez pas seul.",
      intense:"Elle vous prend en pleine poitrine et vous ne vous relevez pas seul. Ce n'est pas une défaite héroïque : c'est un homme qui a parié sur ce qu'il avait de rare, qui l'avait déjà dépensé, et qui a mis une seconde et demie à s'en apercevoir.",
      extreme:"Elle vous prend en pleine poitrine, et ce qui reste de cette seconde et demie n'a rien d'héroïque : un homme immobile, la main ouverte, qui parie sur ce qu'il a de rare et qui l'a déjà dépensé. Vous ne vous relevez pas seul. Vous ne vous relevez pas du tout pendant un moment." },
    "§ Le plus rare de ce qu'on possède est aussi le plus fini.",
  ],
  effets:{ cout:{ endurance:40, concentration:30, vitalite:30, moral:15 },
           blessure:{ id:'sternum', zone:"Sternum", type:"enfoncé · le souffle ne revient qu'à moitié",
                      gravite:3, douleur:3, saignement:3, fonction:['endurance','force','epees','lutte','onde'],
                      cicatrice:"un creux au milieu de la poitrine où l'os n'est pas revenu" },
           marque:"Vous avez rappelé l'Onde à vide et pris la charge sans rien dans les mains.", court:"Le puits vide" },
  suite:'wy_survie', libelleSuite:"…" },

/* ── Rompre ──────────────────────────────────────────────────────────────── */
wy_c3_rompre:{
  texte:[
    "Il y a un moment, dans un métier comme celui-ci, où le seul geste professionnel consiste à s'en aller.",
    "Ce n'est pas de la lâcheté et ce n'est pas non plus du courage : c'est une addition. Vous comptez ce qui vous reste, vous comptez ce qu'il faudrait, et vous constatez que les deux nombres ne se rencontrent pas.",
    { sobre:"Vous reculez jusqu'à l'eau et vous descendez le gué à contre-courant.",
      intense:"Vous reculez jusqu'à l'eau et vous descendez les trois cents pas du gué dans la rivière, à contre-courant, en février, parce que c'est le seul endroit où une chose de douze cents livres n'a aucun intérêt à vous suivre. Elle vous suit quand même sur cent pas, le long de la berge, avant de renoncer et de retourner à ses vires.",
      extreme:"Vous reculez jusqu'à l'eau et vous descendez les trois cents pas du gué dans la rivière, à contre-courant, en février, la plaie ouverte dans l'eau glacée — ce qui arrête le sang et vous fait hurler à l'intérieur de la bouche fermée. Elle vous suit sur cent pas le long de la berge, sans se presser, avant de renoncer et de remonter à ses vires manger ce qui y sèche." },
    "§ Personne ne meurt aujourd'hui. C'est le résultat le plus rare de tous, et c'est celui dont on parle le moins.",
    "Vous arrivez au camp trempé, gris, et vivant. Bracq ne dit rien du tout. Bracq a cinquante ans, trois doigts, et une opinion très précise sur les hommes qui savent s'arrêter.",
    "« Trente-cinq carreaux, dit-il enfin. Il en reste trente-cinq. On recommencera au printemps avec quatre balistes au lieu de deux. »",
    "« Vous n'aurez pas quatre balistes. Elle vend la tour. »",
    "« Je sais. »",
  ],
  effets:{ flags:['wy_rompu','wy_grise_vivante','wy_bracq_respect'], cout:{ moral:12 },
           marque:"Vous avez rompu le combat au gué et laissé la Grise vivante.", court:"Rompu" },
  suite:'wy_retour', libelleSuite:"Redescendre à Valombre" },

};
Object.assign(ARC_WYVERNE, ARC_WYVERNE_7);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 8 — LE NID ET LA BORNE
 *
 * Trois œufs valent plus que le contrat. Et sous quarante ans de fiente, un
 * jalon de route impérial porte un loup que personne dans cette vallée n'a
 * jamais eu de raison de regarder.
 * ══════════════════════════════════════════════════════════════════════════ */

const ARC_WYVERNE_8 = {

wy_nid:{
  lieu:"Cent quarante pieds au-dessus de la Route Grise",
  titre:"Ce qu'il y a dans la borne",
  texte:[
    () => a('wy_deja_monte') || a('wy_avantage_hauteur')
      ? "La montée est plus facile la seconde fois, et infiniment plus longue : rien ne presse, et quand rien ne presse on sent chaque prise dans les mains abîmées."
      : "Cent quarante pieds de schiste par la cheminée est, en plein jour, avec une corde et deux hommes de Bracq en bas qui tiennent le bout et qui n'aiment pas ça.",
    "La plateforme fait vingt pieds sur douze. Le nid en occupe la moitié : un tapis de vingt ans de restes, tassé, blanchi, où l'on marche sur des choses qui craquent et qu'on préfère ne pas identifier.",
    { sobre:"Il y a un essieu de chariot, un crâne de bœuf, et un soulier d'enfant.",
      intense:"On identifie quand même. Un essieu de chariot avec sa roue encore ferrée. Un crâne de bœuf. Trois casques de la garde de Valombre, dont deux avec ce qu'il faut dedans. Un soulier d'enfant, tanné par le froid, qui ne peut pas venir d'ici parce qu'aucun enfant de la vallée ne portait ce cuir-là.",
      extreme:"On identifie quand même. Un essieu de chariot avec sa roue ferrée. Un crâne de bœuf. Trois casques de la garde de Valombre, dont deux qui n'ont pas été vidés et qu'il vaut mieux ne pas retourner. Des bassins humains, reconnaissables entre tous parce que c'est l'os qu'on ne mange pas. Et un soulier d'enfant, tanné par le gel, d'un cuir qui ne vient pas de cette vallée — ce qui veut dire qu'il est arrivé ici dans une caravane, ce qui veut dire qu'il n'est pas arrivé seul." },
    "§ Onze personnes en six semaines, disait la lettre. La lettre comptait mal, et depuis longtemps.",
    "Et au milieu de tout ça, la borne.",
    { sobre:"Un jalon de route impérial, à quatre faces, gravé sur trois. Les œufs sont contre.",
      intense:"Un jalon impérial de six pieds, à quatre faces, planté là bien avant qu'il y ait une maison de Valombre. Trois faces gravées. Le nid a été bâti autour, et les trois œufs sont calés contre la pierre parce que la pierre garde la chaleur du jour jusqu'au milieu de la nuit — ce qui est la raison exacte pour laquelle une bête choisit un endroit pareil, et personne n'y avait pensé en six semaines de siège.",
      extreme:"Un jalon impérial de six pieds, à quatre faces, gravé sur trois, planté là avant qu'il y ait une maison de Valombre. Le nid a été bâti autour et les trois œufs sont calés contre la pierre, à demi enfouis dans un mélange de fiente et de matière fermentée qui dégage une chaleur qu'on sent à travers la botte. C'est un four. Elle avait construit un four, et six semaines de siège n'avaient pas suffi à un seul homme pour se demander pourquoi elle ne bougeait pas de là." },
    () => a('wy_couvee_morte')
      ? "Les trois œufs sont intacts. Le quatrième, celui qui était éclos, ne l'est plus : la chose de la taille d'un chien de berger est couchée contre la borne, et l'aconit a mis six heures à faire ce qu'il fait."
      : (a('wy_vu_le_petit')
        ? "Le quatrième est éclos, et il est vivant. Il fait la taille d'un chien de berger, il a la couleur de la craie, et il vient vers vous parce que ce qui vient jusqu'ici a toujours été sa mère."
        : "Les trois œufs font chacun la taille d'une barrique de sel. Ils sont tièdes. On sent, à travers la coquille, quelque chose bouger dedans quand on pose la main dessus."),
    "Un œuf de wyverne se vend trois cents couronnes à un maquignon honnête et mille à quelqu'un qui n'a pas de scrupules. Il y en a trois.",
  ],
  choix:[
    { t:"Les détruire",
      detail:"La route est rouverte pour vingt ans · et vous ne repartez qu'avec le contrat",
      ferme:"Ferme : les neuf cents couronnes que trois œufs valaient",
      risque:"définitif", definitif:true, va:'wy_nid_detruire' },

    { t:"Les emporter",
      detail:"Trois œufs · plus que le contrat lui-même · et il faudra les vendre à quelqu'un",
      ferme:"Ferme : l'idée que vous ayez rouvert cette route pour de bon",
      risque:"définitif", definitif:true, va:'wy_nid_prendre' },

    { t:"En emporter un. Détruire les deux autres.",
      detail:"Trois cents couronnes · et deux de moins dans le ciel de cette vallée",
      risque:"définitif", definitif:true, va:'wy_nid_un' },

    { t:"Les laisser",
      detail:"Ils écloront au printemps · la Route Grise se refermera dans trois ans",
      ferme:"Ferme : toute prétention à avoir réglé quoi que ce soit ici",
      risque:"définitif", definitif:true, va:'wy_nid_laisser' },
  ],
},

wy_nid_detruire:{
  texte:[
    { sobre:"Une coquille de wyverne fait un demi-pouce. Il faut un talon et de la patience.",
      intense:"Une coquille d'œuf de wyverne fait un demi-pouce d'épaisseur et la consistance d'une poterie mal cuite. On ne l'écrase pas : on la perce, au talon, et il faut s'y reprendre. Le premier prend quatre coups. Ce qui sort n'a pas de forme et ne bouge pas.",
      extreme:"Une coquille de wyverne fait un demi-pouce et la consistance d'une poterie mal cuite. On la perce au talon, et il faut s'y reprendre. Le premier prend quatre coups. Le deuxième deux. Le troisième est plus avancé que les autres et il bouge encore quand la coquille s'ouvre — trois pouces de museau, des yeux fermés sous la peau, des doigts d'aile parfaitement formés et parfaitement inutiles — et il faut finir ça aussi, au talon, parce qu'on ne laisse pas une chose comme ça sur une plateforme à cent quarante pieds." },
    () => a('wy_vu_le_petit') && !a('wy_couvee_morte')
      ? "Et il y a le quatrième, qui n'est pas dans un œuf, qui vous a suivi tout le temps que ça a duré, et qui n'a pas compris une seule seconde de ce qui s'est passé."
      : "",
    "§ Personne ne vous paiera pour ça et personne ne le saura. C'est le seul geste entièrement gratuit de toute cette affaire.",
    "La Route Grise est rouverte pour vingt ans. Quatre caravanes par semaine en été, trois villages qui vivent du sel, un péage qui rapporte à nouveau, une tour qui ne sera pas vendue.",
    "Vous redescendez avec du blanc d'œuf séché sur les bottes et deux cent cinquante couronnes à venir.",
  ],
  effets:{ flags:['wy_oeufs_detruits','wy_route_reouverte'], cout:{ moral:8 },
           exploit:{ eclat:4, temoins:'aucun', quoi:"vous avez détruit la couvée au nid, sans témoin" },
           marque:"Vous avez détruit les trois œufs au nid. La Route Grise est rouverte pour vingt ans.",
           court:"Les œufs détruits" },
  suite:'wy_borne', libelleSuite:"La borne" },

wy_nid_prendre:{
  texte:[
    "Il faut trois voyages, deux paniers de bât rembourrés de laine, et six heures.",
    "Un œuf de wyverne pèse quatre-vingt-dix livres. Il faut le descendre sur cent quarante pieds de schiste au bout d'une corde, en le tenant écarté de la paroi avec une perche, sans qu'il touche une seule fois, parce qu'un choc de plus d'un pied le tue et qu'un œuf mort ne vaut rien.",
    { sobre:"Les deux hommes de Bracq refusent de participer. Vous faites les trois voyages.",
      intense:"Les deux hommes de Bracq refusent de toucher aux paniers. Ils tiennent la corde, parce qu'un homme tient la corde, mais ils ne touchent pas aux paniers et ils ne vous regardent pas quand vous passez à côté d'eux. Vous faites les trois voyages. À la fin, vous ne sentez plus vos avant-bras et il fait nuit.",
      extreme:"Les deux hommes de Bracq refusent de toucher aux paniers. Ils tiennent la corde parce qu'un homme tient la corde, mais ils ne vous regardent pas quand vous passez. Vous faites les trois voyages. Au troisième, la corde a mangé vos paumes jusqu'au vif et vous laissez des marques rouges sur la laine du panier ; à la fin, vous ne sentez plus vos avant-bras et il fait nuit depuis deux heures." },
    "§ Neuf cents couronnes. Trois fois et demie le contrat. Et il faut maintenant trouver quelqu'un.",
    "Il y a exactement deux acheteurs à moins de quarante lieues, et vous les avez rencontrés tous les deux cette semaine.",
  ],
  effets:{ flags:['wy_oeufs_pris'], cout:{ endurance:25, vitalite:5 },
           blessure:{ id:'paumes', zone:"Paumes", type:"mangées par la corde",
                      gravite:1, douleur:2, saignement:0, fonction:['epees','lutte','tir'],
                      cicatrice:"des mains qui ne referment plus complètement pendant trois semaines" },
           marque:"Vous avez descendu les trois œufs de la Grise sur cent quarante pieds.", court:"Trois œufs" },
  suite:'wy_borne', libelleSuite:"Avant de redescendre : la borne" },

wy_nid_un:{
  texte:[
    "Vous en prenez un — le plus petit, celui qui bouge le moins, celui qui a le plus de chances d'arriver en bas entier.",
    "Les deux autres, au talon.",
    { sobre:"C'est un compromis. Les compromis, dans ce métier, ont la propriété de ne satisfaire personne.",
      intense:"C'est un compromis, et les compromis dans ce métier ont cette propriété-là : ils vous coûtent le mépris de ceux qui auraient tout détruit et celui de ceux qui auraient tout vendu, et ils ne vous rapportent l'estime de personne. Trois cents couronnes, deux coquilles ouvertes, et une chose de moins dans le ciel de cette vallée sur trois.",
      extreme:"C'est un compromis, et les compromis dans ce métier vous coûtent le mépris de ceux qui auraient tout détruit et de ceux qui auraient tout vendu, sans vous rapporter l'estime de personne. Trois cents couronnes dans un panier de laine, deux coquilles ouvertes au talon avec ce qui sort dedans, et l'impression très nette, en redescendant, d'avoir fait la moitié de deux choses." },
    "§ Un œuf. Dans trois ans, quelque part, une bête de trente-quatre pieds portera un homme qui aura payé pour ça.",
  ],
  effets:{ flags:['wy_oeuf_un','wy_route_reouverte'], cout:{ endurance:18, moral:5 },
           marque:"Vous avez emporté un œuf et détruit les deux autres.", court:"Un œuf" },
  suite:'wy_borne', libelleSuite:"La borne" },

wy_nid_laisser:{
  texte:[
    "Vous ne les touchez pas.",
    "Ce n'était pas dans le contrat. Le contrat disait : la bête. Le contrat ne disait pas la couvée, et un homme qui lit les contrats à la lettre a le droit de s'en tenir à la lettre pendant exactement le temps qu'il met à redescendre.",
    { sobre:"Ils écloront en avril. Ils chasseront à l'automne. Dans trois ans, la route se referme.",
      intense:"Ils écloront en avril, sans mère, et deux sur trois mourront de faim dans les six semaines parce que personne ne leur rapportera d'organes mous. Le troisième descendra sur la route au bout de quatre mois, parce que ce qui a faim descend, et il commencera par les chiens et les chèvres. Dans trois ans, il aura la taille de sa mère et la Route Grise se refermera. Il y aura une autre lettre, un autre contrat, deux cent cinquante couronnes, et un autre homme.",
      extreme:"Ils écloront en avril, sans mère, et deux sur trois mourront de faim dans les six semaines. Le troisième descendra au bout de quatre mois parce que ce qui a faim descend : il commencera par les chiens, puis les chèvres, puis un vieux, puis un enfant, dans cet ordre, toujours dans cet ordre. Dans trois ans il aura la taille de sa mère, et la Route Grise se refermera. Il y aura une autre lettre, un autre contrat, deux cent cinquante couronnes, et un autre homme." },
    "§ Vous avez tué une bête. Vous n'avez rien réglé du tout, et vous le savez en reposant la main sur la coquille tiède.",
  ],
  effets:{ flags:['wy_oeufs_laisses'],
           marque:"Vous avez laissé les trois œufs dans le nid. Ils écloront en avril.", court:"Les œufs laissés" },
  suite:'wy_borne', libelleSuite:"La borne" },

/* ── La borne ────────────────────────────────────────────────────────────── */
wy_borne:{
  titre:"Le loup sous la fiente",
  texte:[
    () => a('wy_borne_karlsberg')
      ? "Vous l'aviez vu en montant, de nuit, à trente pieds, et vous n'aviez pas eu le loisir de vous arrêter dessus. Vous l'avez maintenant."
      : "Il reste une chose sur cette plateforme, et c'est celle pour laquelle personne n'est jamais monté ici en six semaines de siège.",
    "Un jalon de route impérial, à quatre faces, six pieds de haut, dont trois pieds sont pris dans le nid. La face nord porte une distance en lieues et un chiffre effacé. La face est porte le sceau de l'arpentage impérial, qui est le même sur toutes les routes du monde connu.",
    "La face sud est prise sous quarante ans de fiente durcie, épaisse comme une main, et c'est celle qu'il faut gratter.",
    { sobre:"Vous grattez à la dague. Ça prend une heure.",
      intense:"Vous grattez à la dague, par plaques, en soufflant sur la poussière blanche qui vous revient dans la figure. Ça prend une heure et vous auriez pu être en bas depuis longtemps, au chaud, avec deux cent cinquante couronnes.",
      extreme:"Vous grattez à la dague, par plaques. La fiente de wyverne durcie a la consistance de la craie et la même poussière : elle vous revient dans la figure, dans les yeux, dans la bouche, et elle a un goût d'ammoniac qui restera trois jours. Ça prend une heure. Vous auriez pu être en bas depuis longtemps, au chaud, avec deux cent cinquante couronnes." },
    "§ Sous la dernière plaque, il y a un loup.",
    "Pas un loup héraldique — pas de langue tirée, pas de posture, pas de couronne. Un loup ancien, de profil, la gueule fermée, encadré de deux traits verticaux. Une gravure d'arpentage, pas de blason : la marque du seigneur dont le domaine commençait à cette borne, apposée par un fonctionnaire impérial qui notait ce genre de chose il y a deux cents ans.",
    "Vous connaissez ce loup. Vous l'avez vu sur une bague, sur un linteau, sur le pommeau d'une épée qui a brûlé avec la maison, et sur rien d'autre depuis dix-neuf ans.",
    "La gorge de Cendrepont, le gué, le péage, la falaise et le nid ont appartenu à votre famille. La maison de Valombre prélève un sou par essieu depuis six générations sur une route qu'elle n'a jamais possédée, et elle a raison de le faire, parce qu'il n'y a plus personne pour dire le contraire.",
    "§ Il n'y a plus personne. Il y a vous, à cent quarante pieds, couvert de fiente, avec une dague à la main.",
  ],
  choix:[
    { t:"Effacer le loup",
      detail:"Trois heures de dague · et plus jamais personne ne fera le rapprochement",
      ferme:"Ferme : la seule preuve gravée que cette route vous appartenait",
      risque:"définitif", definitif:true, va:'wy_borne_effacer',
      effets:{ flags:['wy_borne_effacee'] } },

    { t:"La laisser telle quelle",
      detail:"Sous quarante ans de fiente, elle a tenu · elle tiendra encore · mais vous l'avez découverte",
      risque:"définitif", definitif:true, va:'wy_borne_laisser' },

    { t:"Détacher la face gravée et l'emporter",
      detail:"Quarante livres de pierre à descendre · et quelque chose à poser quelque part, un jour",
      risque:"définitif", definitif:true, va:'wy_borne_emporter' },
  ],
},

wy_borne_effacer:{
  texte:[
    "Trois heures. Il fait nuit à la deuxième et vous continuez au toucher.",
    { sobre:"Vous entaillez la gravure en croisillons jusqu'à ce qu'elle ne soit plus qu'une surface abîmée.",
      intense:"On n'efface pas une gravure de deux cents ans : on la détruit. Il faut entailler en croisillons, profond, sur toute la surface, jusqu'à ce qu'un homme qui passerait là dans trente ans ne voie plus qu'une pierre attaquée par le gel. Vous cassez la pointe de votre dague à la deuxième heure et vous finissez avec l'autre.",
      extreme:"On n'efface pas une gravure de deux cents ans : on la détruit. Il faut entailler en croisillons, profond, sur toute la surface, jusqu'à ce que ce ne soit plus qu'une pierre mangée par le gel. La pointe de votre dague casse à la deuxième heure. Vous finissez avec l'autre, à genoux dans le nid, dans le noir, dans l'odeur, les mains en sang à force de manquer la pierre — et à un moment, sans que vous l'ayez décidé, vous vous mettez à frapper au lieu de graver." },
    "§ Dix-neuf ans qu'on efface cette maison. Vous venez d'y participer de vos propres mains.",
    "C'est le geste le plus raisonnable de toute cette affaire. Un homme qui veut vivre vieux efface ce genre de chose et redescend.",
    "Vous restez assis à côté de la borne un long moment avant de redescendre, et vous ne sauriez pas dire à quoi vous pensez.",
  ],
  effets:{ flags:['wy_borne_effacee'], cout:{ moral:14 },
           blessure:{ id:'doigts', zone:"Doigts", type:"ouverts sur la pierre, trois heures durant",
                      gravite:1, douleur:1, saignement:0, fonction:[],
                      cicatrice:"des jointures qui ont pris deux semaines" },
           marque:"Vous avez effacé de vos mains le loup de Karlsberg sur la borne de Cendrepont.",
           court:"Le loup effacé" },
  suite:'wy_retour', libelleSuite:"Redescendre" },

wy_borne_laisser:{
  texte:[
    "Vous rabattez de la fiente sèche par-dessus, avec le plat de la dague, et vous tassez.",
    "Quarante ans l'ont couverte. Elle en tiendra bien vingt de plus, et dans vingt ans vous serez soit mort, soit dans une position où ce loup ne sera plus un danger mais un titre.",
    { sobre:"C'est un pari. C'est même exactement ce que le mot veut dire.",
      intense:"C'est un pari, au sens strict : vous laissez sur une falaise, à cent quarante pieds au-dessus d'une route qu'on vient de rouvrir, la seule preuve gravée qu'un mercenaire sans nom descend d'une maison rayée. Et vous venez de rouvrir cette route, ce qui veut dire que dans six mois il y passera quatre caravanes par semaine, et que dans dix ans quelqu'un montera ici par curiosité.",
      extreme:"C'est un pari au sens strict. Vous laissez, à cent quarante pieds au-dessus d'une route que vous venez de rouvrir, la seule preuve gravée qu'un mercenaire sans nom descend d'une maison rayée. Et vous venez de la rouvrir : dans six mois il y passera quatre caravanes par semaine, dans deux ans un arpenteur, dans dix un garçon de quinze ans qui montera par défi et qui racontera en bas ce qu'il aura vu — et la vallée aura de la mémoire, comme toutes les vallées." },
    "§ Il y a des choses qu'on ne détruit pas, même quand on devrait. C'est en général comme ça qu'on se fait prendre.",
  ],
  effets:{ flags:['wy_borne_intacte'], suspicion:5,
           marque:"Vous avez recouvert le loup et laissé la borne intacte au-dessus de la route rouverte.",
           court:"La borne laissée" },
  suite:'wy_retour', libelleSuite:"Redescendre" },

wy_borne_emporter:{
  texte:[
    "La face sud d'un jalon impérial fait quatre pouces d'épaisseur, deux pieds de large, et il y a un plan de clivage naturel dans tout schiste taillé.",
    { sobre:"Il faut un coin, un maillet improvisé, et deux heures. Elle se détache d'un bloc.",
      intense:"Il faut un coin — la pointe cassée d'un carreau de baliste fait l'affaire — un caillou en guise de maillet, et deux heures à taper au même endroit sans jamais taper fort. La pierre finit par décider toute seule : elle se fend d'un coup, proprement, sur toute la hauteur, et la face gravée vous reste dans les mains.",
      extreme:"Il faut un coin — la pointe cassée d'un carreau de baliste fait l'affaire — un caillou en maillet, et deux heures à taper au même endroit sans jamais taper fort, dans le noir, dans une odeur qui ne s'en va plus des vêtements. La pierre décide toute seule : elle se fend d'un coup, proprement, sur toute la hauteur, et quarante livres de schiste gravé vous restent dans les mains, tièdes du côté du nid." },
    "Quarante livres à descendre sur cent quarante pieds. Vous le faites au bout d'une corde, comme les œufs, et ça prend une heure de plus.",
    "§ Vous n'avez pas de maison où la poser. C'est bien ça, le problème, et c'est bien ça la raison.",
    "Un homme qui emporte quarante livres de pierre gravée sans avoir de mur où la mettre est un homme qui a décidé qu'il aurait un mur.",
    "Vous ne vous le formulez pas ainsi. Vous vous dites simplement que ça ne se laisse pas.",
  ],
  effets:{ flags:['wy_borne_emportee','wy_pierre_karlsberg'], cout:{ endurance:20 },
           marque:"Vous avez descendu la face gravée de la borne — quarante livres de schiste au loup de Karlsberg.",
           court:"La pierre" },
  suite:'wy_retour', libelleSuite:"Redescendre" },

};
Object.assign(ARC_WYVERNE, ARC_WYVERNE_8);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 9 — LE RETOUR, LE PAIEMENT, LES ISSUES
 *
 * L'affaire ne finit pas quand la bête tombe. Elle finit quand on redescend
 * dire ce qu'on a vu — et ce qu'on choisit de ne pas dire vaut, dans cette
 * vallée, plus cher que deux cent cinquante couronnes.
 * ══════════════════════════════════════════════════════════════════════════ */

/* Ce que Valombre doit : le tarif du tableau, prime de rang comprise. */
const dueDuContrat = () => (ETAT.acte.contrat && ETAT.acte.contrat.or) || 250;

const ARC_WYVERNE_9 = {

wy_retour:{
  lieu:"Valombre · la salle basse · quatre jours plus tard",
  titre:"Ce qu'on rapporte",
  qui:'heloise',
  texte:[
    () => a('wy_morte')
      ? "La nouvelle est descendue la vallée plus vite que vous. Quand vous arrivez à Valombre, il y a des gens sur le chemin de ronde qui n'ont aucune raison d'y être, et l'aubergiste du Héron a déjà cloué au mur du fond un papier qui dit que la Route Grise est ouverte."
      : (a('wy_epargnee')
        ? "Aucune nouvelle n'est descendue avant vous, parce qu'il n'y avait aucune nouvelle. Vous arrivez à Valombre dans une cour où l'on continue de faire ce qu'on faisait la semaine dernière."
        : "Vous arrivez à Valombre porté sur un cheval que vous ne montez pas vraiment, et la première personne qui vous voit entrer dans la cour va chercher quelqu'un sans dire un mot."),
    "Héloïse de Valombre vous reçoit dans la salle basse, debout, comme la première fois. Elle a quarante-six ans, onze ans de veuvage, et une façon de tenir les mains devant elle qui n'appartient qu'aux gens qui ont appris à ne rien laisser voir dans une pièce pleine d'hommes.",
    () => a('wy_morte')
      ? "« On me dit que c'est fait. »"
      : (a('wy_epargnee') ? "« On me dit que vous êtes redescendu. »" : "« On me dit que vous êtes vivant. »"),
    "« C'est fait, ou ce n'est pas fait ? »",
    "§ Voilà. On y est. La partie du métier qu'aucun manuel d'armes ne traite.",
    () => (a('wy_sait_gassien') || a('wy_releve_peage') || a('wy_amaury_complice') || a('wy_soupcon_amaury'))
      ? "Parce qu'il y a la bête, et il y a le reste : un contrebandier qui rabattait les caravanes vers le gué pour que la bête mange, un fils de la maison qui lui achetait des œufs, et un registre de péage où le sel de Gassien le Lièvre passe franc depuis l'automne."
      : "Vous n'avez que la bête à rapporter. C'est déjà davantage que ce que la plupart des hommes rapportent d'une gorge comme celle-là.",
    () => a('wy_amaury_complice')
      ? "Amaury de Valombre est adossé à la cheminée, à sept pas derrière sa mère, et il n'a pas dit bonjour."
      : "",
  ],
  choix:[
    { t:"Tout dire. Gassien, le fils, le registre.",
      si:() => a('wy_sait_gassien') || a('wy_releve_peage') || a('wy_amaury_complice'),
      detail:"Elle apprendra que son fils vend des œufs de la bête qui a mangé onze personnes",
      ferme:"Ferme : toute alliance future avec Amaury de Valombre",
      risque:"définitif", definitif:true, va:'wy_ret_tout' },

    { t:"Dire Gassien. Taire le fils.",
      si:() => a('wy_sait_gassien') || a('wy_releve_peage'),
      detail:"Un contrebandier tombe · un héritier vous doit quelque chose de très lourd",
      ferme:"Ferme : la confiance d'Héloïse, si elle l'apprend un jour",
      risque:"définitif", definitif:true, va:'wy_ret_gassien' },

    { t:"Ne rien dire. Prendre l'argent.",
      detail:"Le contrat disait : la bête · le contrat ne disait rien d'autre",
      risque:"définitif", definitif:true, va:'wy_ret_rien' },

    { t:"Lui parler de la borne",
      si:() => a('wy_borne_karlsberg') || a('wy_borne_intacte') || a('wy_pierre_karlsberg'),
      detail:"Lui demander à qui appartenait cette gorge avant Valombre · et lui donner une raison de chercher",
      ferme:"Ferme : dix-neuf ans passés à n'être personne",
      risque:"définitif", definitif:true, va:'wy_ret_borne' },
  ],
},

wy_ret_tout:{
  qui:'heloise',
  texte:[
    "Vous le dites dans l'ordre, sans commentaire, comme un rapport d'étape : les carcasses sur les vires, les organes prélevés qui disent une couvée, le carreau de baliste de l'automne dernier, le relais de sel du bas du gué, les caravanes rabattues vers le rétrécissement, et le registre de péage où le sel de Gassien le Lièvre passe franc depuis novembre.",
    "Puis le nom du fils.",
    { sobre:"Elle ne bouge pas pendant tout le récit. À la fin, elle regarde la cheminée.",
      intense:"Elle ne bouge pas pendant tout le récit. Pas une main, pas un pied. Quand vous avez fini, elle regarde la cheminée — sept pas derrière elle, où son fils s'est adossé — et elle la regarde longtemps, sans se retourner, ce qui est la seule chose vraiment terrible de toute cette scène.",
      extreme:"Elle ne bouge pas pendant tout le récit : pas une main, pas un pied, pas un battement de paupière hors du rythme. Quand vous avez fini, elle regarde la cheminée à sept pas derrière elle, sans se retourner, et elle la regarde très longtemps. C'est la seule chose vraiment terrible de cette scène : une femme de quarante-six ans qui ne se retourne pas parce qu'elle sait déjà tout ce qu'elle verrait." },
    "« Amaury. »",
    "« Mère. »",
    "« Combien. »",
    "Un silence de quatre secondes.",
    "« Mille par œuf. Un acompte de trois cents versé en Frimaire. »",
    "« Et tu savais qu'il les rabattait. »",
    "« Je savais qu'il les rabattait. »",
    "§ Elle ne crie pas. Personne, dans cette pièce, ne criera à aucun moment.",
    "^« Vous serez payé, messire. Deux cent cinquante couronnes, comme convenu, et vous les avez gagnées deux fois. »",
    "Elle marque un temps.",
    "« La seconde fois, vous me les avez fait payer cher. Sortez, s'il vous plaît. Le régisseur vous comptera dans la cour. »",
  ],
  effets:{ flags:['wy_verite_dite','wy_amaury_ennemi','wy_heloise_dette'],
           exploit:{ eclat:5, temoins:'quelques', quoi:"vous avez dit à Héloïse de Valombre ce que faisait son fils" },
           marque:"Vous avez dit à Héloïse de Valombre que son fils achetait les œufs de la Grise.",
           court:"Tout dit" },
  suite:'wy_paiement', libelleSuite:"La cour" },

wy_ret_gassien:{
  qui:'heloise',
  texte:[
    "Vous donnez le contrebandier. Les carcasses, la couvée, le carreau, le relais de sel, les caravanes rabattues, et le registre où le sel passe franc depuis novembre.",
    "Vous ne donnez pas le nom du fils, et pour ne pas le donner il faut mentir sur un point précis : qui payait les œufs. Vous dites : un seigneur de guerre de la côte, par un intermédiaire, sans nom. C'est vrai à peu près. C'est faux exactement là où ça compte.",
    { sobre:"Elle écoute. Elle pose deux questions. Elle n'en pose pas une troisième.",
      intense:"Elle écoute sans interrompre, pose deux questions courtes — la date du premier passage franc, et le nom de l'officier de péage qui a validé — et n'en pose pas une troisième. Elle aurait pu. La troisième était facile : *et qui, chez moi, a signé ce passage franc ?* Elle ne la pose pas, et vous ne saurez jamais si c'est parce qu'elle ne l'a pas vue ou parce qu'elle l'a vue trop bien.",
      extreme:"Elle écoute sans interrompre, pose deux questions courtes — la date du premier passage franc, le nom de l'officier de péage qui l'a validé — et n'en pose pas une troisième. Elle aurait pu ; la troisième était facile. *Et qui, chez moi, a signé ce passage franc ?* Elle ne la pose pas. Vous la regardez ne pas la poser, et vous emportez de Valombre cette image-là plutôt que n'importe quelle autre : une femme intelligente qui décide, devant vous, de ne pas être intelligente pendant quatre secondes." },
    "Derrière elle, à sept pas, Amaury de Valombre n'a pas bougé de la cheminée.",
    "§ Vous venez de lui faire un cadeau qu'il n'a pas demandé. Ce sont les plus lourds.",
    "Il vous rattrape dans la cour, plus tard, pendant qu'on compte l'argent. Il ne dit pas merci. Il dit :",
    "« Je ne sais pas encore ce que ça va me coûter. Mais je sais que ça va me coûter, et je sais à qui. »",
  ],
  effets:{ flags:['wy_gassien_donne','wy_amaury_dette','wy_heloise_menti'],
           marque:"Vous avez livré Gassien à Héloïse et couvert son fils.", court:"Le fils couvert" },
  suite:'wy_paiement', libelleSuite:"La cour" },

wy_ret_rien:{
  qui:'heloise',
  texte:[
    "« C'est fait. »",
    "« C'est tout ? »",
    "« C'est tout ce que le contrat demandait. »",
    { sobre:"Elle vous regarde un long moment.",
      intense:"Elle vous regarde un long moment, sans hostilité, avec cette attention exacte des gens qui font des comptes toute la journée et qui savent tout de suite quand une colonne ne tombe pas juste. Elle sait qu'il manque quelque chose. Elle ne sait pas quoi, et elle a assez vécu pour savoir aussi qu'on n'obtient rien d'un homme qui a décidé de s'en tenir à la lettre.",
      extreme:"Elle vous regarde longtemps, sans hostilité, avec l'attention exacte de quelqu'un qui fait des comptes toute la journée et qui voit tout de suite quand une colonne ne tombe pas juste. Elle sait qu'il manque quelque chose. Elle ne sait pas quoi. Et elle a assez vécu pour savoir qu'on n'obtient rien d'un homme qui a décidé de s'en tenir à la lettre — alors elle ne demande pas, et le fait de ne pas demander lui coûte visiblement quelque chose." },
    "« Très bien. Le régisseur vous comptera dans la cour. »",
    "Puis, alors que vous êtes déjà à la porte, sans élever la voix :",
    "« Messire. Vous avez passé onze jours dans cette gorge et vous en redescendez avec une seule phrase. Je ne vous en veux pas. Je note. »",
    "§ Elle note. Cette femme a onze ans de veuvage et une maison qui tient debout : elle note tout, et elle range.",
  ],
  effets:{ flags:['wy_rien_dit','wy_heloise_reserve'],
           marque:"Vous n'avez rien dit à Valombre de ce que vous aviez trouvé au gué.", court:"Rien dit" },
  suite:'wy_paiement', libelleSuite:"La cour" },

wy_ret_borne:{
  qui:'heloise',
  texte:[
    "« Il y a une borne dans ce nid. Un jalon impérial. Trois faces gravées. »",
    "« Je sais. Il y en a onze sur la Route Grise. Mon mari en a fait relever le tracé la deuxième année de notre mariage, pour un procès de péage contre Chastel. »",
    "« Il en manquait une au relevé. »",
    { sobre:"Elle s'arrête. C'est la première fois qu'elle s'arrête.",
      intense:"Elle s'arrête. C'est la première fois de tout cet entretien, et de tout le précédent, qu'Héloïse de Valombre s'arrête au milieu d'une phrase.",
      extreme:"Elle s'arrête. C'est la première fois de tout cet entretien — et du précédent — qu'Héloïse de Valombre s'arrête au milieu d'une phrase, et vous comprenez à cette seconde que vous venez de faire une chose beaucoup plus grave que tout ce que vous avez fait au gué." },
    "« La borne du nid. »",
    "« Oui. »",
    "« Vous êtes monté à cent quarante pieds et vous avez gratté quarante ans de fiente sur la face sud d'un jalon d'arpentage. »",
    "« Oui. »",
    "« Pourquoi ? »",
    "§ Voilà la question. Il n'y a aucune bonne réponse et vous le saviez en montant l'escalier.",
    "@« Parce que personne ne l'avait fait. »",
    "Elle vous regarde. Une femme qui tient une maison depuis onze ans a passé onze ans à écouter des hommes lui expliquer pourquoi ils avaient fait des choses, et elle a développé pour ça une oreille dont il faudrait se méfier.",
    "« Messire. Dans mes archives — dans la tour que je vends à l'automne — il y a un coffre de relevés de péage qui remonte à deux cents ans. Je ne les ai jamais lus. Personne ne les a jamais lus. »",
    "Un temps.",
    "« Je peux les faire lire. »",
    "Ce n'est ni une menace ni une offre. C'est exactement ce que ça a l'air d'être : une femme intelligente qui vient de comprendre qu'un homme s'intéresse à quelque chose, et qui range l'information avec les autres.",
  ],
  effets:{ flags:['wy_borne_dite','wy_heloise_curieuse'], suspicion:14,
           marque:"Vous avez parlé de la borne à Héloïse de Valombre. Elle peut faire lire ses archives.",
           court:"La borne dite" },
  suite:'wy_paiement', libelleSuite:"La cour" },

/* ── Le paiement, et le Prix ─────────────────────────────────────────────── */
wy_paiement:{
  lieu:"Valombre · la cour · une heure plus tard",
  titre:"Ce qu'on emporte",
  effets:{ or:() => a('wy_morte') ? dueDuContrat()
                  : (a('wy_epargnee') || a('wy_rompu') ? 0 : Math.round(dueDuContrat() / 3)) },
  texte:[
    () => a('wy_morte')
      ? `Le régisseur compte ${dueDuContrat()} couronnes sur le rebord d'une auge à chevaux parce qu'il n'y a pas d'autre surface plate dans cette cour. Il compte deux fois. C'est un homme consciencieux et il a l'air très fatigué.`
      : (a('wy_epargnee') || a('wy_rompu')
        ? "Le régisseur ne compte rien du tout, parce qu'il n'y a rien à compter. Le contrat disait : la bête. La bête est vivante, la route est fermée, et il n'existe aucune clause qui prévoie autre chose."
        : `Le régisseur compte ${Math.round(dueDuContrat() / 3)} couronnes — le tiers, l'usage des maisons du nord quand un homme a manifestement tout donné et que la chose n'est pas faite. Il vous les tend en s'excusant à voix basse, ce qu'aucun règlement ne lui demande.`),
    () => a('wy_coutume')
      ? "§ Et il y a l'autre moitié du Prix, qui ne se compte pas dans une cour."
      : "",
    () => a('wy_coutume') && a('wy_alienor_accord')
      ? "Aliénor de Valombre vous attend au bout de la cour, près de l'écurie, avec un cheval sellé qui n'est pas le vôtre et un paquet de toile. Vingt-quatre ans, la même façon que sa tante de tenir les mains, et beaucoup moins de patience.\n\n« Vous partez aujourd'hui. Je pars dans quinze jours. Ma tante croit que je vais chez les sœurs de Sainte-Ombre. »\n\n« Et vous n'allez pas chez les sœurs de Sainte-Ombre. »\n\n« Je vais là où on a besoin d'une femme qui sait lire un registre de péage. Vous m'avez donné l'idée, messire, en me demandant si je consentais. Personne n'avait jamais demandé. »"
      : "",
    () => a('wy_coutume_imposee')
      ? "Aliénor de Valombre ne descend pas dans la cour. Une servante vous apporte le paquet de toile — deux chemises et du pain — et repart sans un mot. La coutume a été honorée à la lettre, dans la lettre exacte, et il n'y a rien à ajouter à ça pendant les vingt prochaines années."
      : "",
    () => a('wy_oeufs_pris') || a('wy_oeuf_un')
      ? "Reste ce qui est dans les paniers de bât, sous la laine, et qui ne peut pas rester là longtemps : un œuf de wyverne meurt en dix jours s'il n'est pas maintenu au chaud, et neuf cents couronnes qui refroidissent sont neuf cents couronnes perdues."
      : "",
    "Le régisseur remonte l'escalier. La cour se vide. Il est quatre heures et il fera nuit dans une heure.",
  ],
  choix:[
    { t:"Vendre les œufs à Amaury de Valombre",
      si:() => (a('wy_oeufs_pris') || a('wy_oeuf_un')) && !a('wy_amaury_ennemi'),
      detail:"Mille par œuf · il a l'argent, il a l'acheteur, et il vous doit un silence",
      risque:"définitif", definitif:true, va:'wy_vendre_amaury' },

    { t:"Vendre les œufs à l'acheteur de Gassien",
      si:() => (a('wy_oeufs_pris') || a('wy_oeuf_un')) && a('wy_gassien_vivant') && !a('wy_gassien_donne'),
      detail:"Huit cents par œuf, payés comptant, sans nom et sans registre",
      risque:"définitif", definitif:true, va:'wy_vendre_gassien' },

    { t:"Casser les œufs dans la cour de Valombre",
      si:() => a('wy_oeufs_pris') || a('wy_oeuf_un'),
      detail:"Devant qui se trouvera là · et il se trouvera du monde",
      ferme:"Ferme : neuf cents couronnes, et toute discrétion",
      risque:"définitif", definitif:true, va:'wy_casser_cour' },

    { t:"Monter en selle et partir",
      detail:"Reprendre la Route Grise vers le sud · et laisser cette vallée derrière",
      va:'wy_issue' },
  ],
},

wy_vendre_amaury:{
  qui:'amaury',
  texte:[
    "Il vous reçoit dans l'ancienne sellerie, parce qu'il n'a pas de pièce à lui dans cette maison et que c'est déjà toute son histoire.",
    "Vingt-huit ans, l'air de quelqu'un qui n'a jamais eu de bonne nouvelle avant midi, et une bourse de cuir qu'il a manifestement préparée avant de savoir si vous viendriez.",
    { sobre:"« Trois mille. Comptés. Je ne demande pas comment vous les avez descendus. »",
      intense:"« Trois mille. Comptés hier, parce que j'ai passé la semaine à me dire que soit vous mourriez là-haut, soit vous descendriez avec, et qu'il n'y avait pas de troisième possibilité. » Il pousse la bourse sur l'établi sans la lâcher tout de suite. « Vous avez tué la bête et vous me vendez sa couvée. Vous vous rendez compte de ce que ça fait de vous ? »",
      extreme:"« Trois mille. Comptés hier, parce que j'ai passé la semaine à me dire que soit vous mourriez là-haut, soit vous descendriez avec, et qu'il n'y avait pas de troisième possibilité. » Il pousse la bourse sur l'établi sans la lâcher. « Vous avez tué la bête et vous me vendez sa couvée. Vous m'avez appelé charognard, dans cette cour, avec les yeux, quand j'ai dit que je vendais des œufs. Vous vous rendez compte de ce que ça fait de vous ? »" },
    "« Un homme qui a besoin de trois mille couronnes. »",
    "« Bienvenue. C'est une maison nombreuse. »",
    "§ Ce n'est pas de l'amitié. C'est mieux que ça, dans ce métier : c'est un intérêt commun que ni l'un ni l'autre ne peut avouer.",
    "Il fera monter les œufs par le col de Frimaire dans quinze jours, dans des paniers doublés de laine et chauffés au charbon de bois, et il en tirera cinq mille d'un seigneur de guerre de la côte des Dents dont il ne dira jamais le nom devant vous. Il aura raison de ne pas le dire : dans trois ans, ce nom vous cherchera.",
  ],
  effets:{ or:3000, flags:['wy_oeufs_vendus_amaury','wy_amaury_associe'],
           exploit:{ eclat:3, temoins:'un', quoi:"vous avez vendu la couvée au fils de la maison" },
           marque:"Vous avez vendu les œufs de la Grise à Amaury de Valombre pour trois mille couronnes.",
           court:"Trois mille" },
  suite:'wy_issue', libelleSuite:"Partir" },

wy_vendre_gassien:{
  qui:'gassien',
  texte:[
    "Le relais de sel du bas du gué, une deuxième fois, et cette fois c'est vous qui arrivez avec quelque chose à vendre.",
    "Gassien le Lièvre ne fait aucun commentaire là-dessus. C'est un professionnel : il ne perd pas de temps à savourer, il compte.",
    { sobre:"« Deux mille quatre. Comptant, ce soir, en argent de Chastel. »",
      intense:"« Deux mille quatre. Comptant, ce soir, en argent de Chastel, sans lettre de change et sans nom écrit nulle part. C'est huit cents par œuf au lieu de mille, et vous savez pourquoi : je prends le risque de la route et vous prenez la différence en tranquillité. » Il vous regarde par-dessus une caisse de sel. « Et je vous vends autre chose avec, gratuitement : personne ne saura jamais que vous les avez eus. »",
      extreme:"« Deux mille quatre. Comptant, ce soir, en argent de Chastel, sans lettre de change et sans un nom écrit nulle part. Huit cents par œuf au lieu de mille : je prends le risque de la route, vous prenez la différence en tranquillité. » Il vous regarde par-dessus une caisse de sel, et le sourire arrive, chaleureux, sans aucun rapport avec ce qui se passe derrière les yeux. « Et je vous vends autre chose avec, pour rien : personne ne saura jamais que vous les avez eus. Vous ne mesurez pas encore ce que ça vaut, messire. Vous le mesurerez dans dix ans. »" },
    "§ Il a raison. C'est ça, le pire.",
    "Vous avez tué la bête qui faisait vivre son commerce et vous repartez avec son argent dans la sacoche, et il vous serre la main à l'ancienne, à l'avant-bras, comme deux hommes qui viennent de comprendre qu'ils ne se feront jamais de mal l'un à l'autre parce que ce serait mauvais pour les affaires.",
  ],
  effets:{ or:2400, flags:['wy_oeufs_vendus_gassien','wy_gassien_associe'],
           marque:"Vous avez vendu les œufs de la Grise à Gassien le Lièvre pour deux mille quatre cents.",
           court:"Deux mille quatre" },
  suite:'wy_issue', libelleSuite:"Partir" },

wy_casser_cour:{
  texte:[
    "Vous sortez le premier panier de la bâtière et vous le posez au milieu de la cour de Valombre, à quatre heures de l'après-midi, à l'heure où l'on rentre les bêtes.",
    "Il y a une douzaine de personnes dans cette cour. Le régisseur. Deux palefreniers. Une cuisinière avec un seau. Trois hommes de la garde. Amaury de Valombre, à une fenêtre du premier.",
    { sobre:"Vous ouvrez les paniers et vous cassez les œufs, un par un, au talon.",
      intense:"Vous ouvrez les paniers et vous cassez les œufs au talon, un par un, sans rien dire, dans une cour où plus personne ne bouge. Il faut quatre coups pour le premier. La cuisinière pose son seau. Le régisseur redescend trois marches et s'arrête.",
      extreme:"Vous ouvrez les paniers et vous cassez les œufs au talon, un par un, sans un mot, dans une cour où plus personne ne bouge. Quatre coups pour le premier. Ce qui sort se répand sur les pavés en une flaque épaisse et jaune où quelque chose de gris est enroulé sur soi-même, et la cuisinière pose son seau et met sa main devant sa bouche. Le troisième est le plus avancé. Il faut finir, et il faut finir devant tout le monde, parce que c'est exactement ce que vous êtes venu faire." },
    "§ Neuf cents couronnes sur des pavés. Trois mille, en vérité, au prix où le fils de la maison les aurait payées.",
    "Vous ne dites rien du tout. Il n'y a rien à dire : le geste est le message, et il est adressé à une fenêtre du premier étage.",
    "Quand vous vous retournez, la fenêtre est fermée.",
    "Cette histoire fera le tour de la vallée en quatre jours et la province en trois semaines. On ne racontera pas que vous avez tué une wyverne — ça, on l'aura déjà oublié. On racontera qu'un mercenaire a cassé trois mille couronnes sur les pavés d'une cour noble sans dire pourquoi.",
  ],
  effets:{ flags:['wy_oeufs_casses_cour','wy_amaury_ennemi'], cout:{ moral:-8 },
           exploit:{ eclat:11, temoins:'foule',
                     quoi:"vous avez brisé trois mille couronnes d'œufs dans la cour de Valombre" },
           marque:"Vous avez cassé les œufs de la Grise dans la cour de Valombre, devant témoins.",
           court:"Dans la cour" },
  suite:'wy_issue', libelleSuite:"Partir" },

/* Aiguillage : l'issue lit ce qui s'est réellement passé. */
wy_issue:{ dyn:true, texte:[], suite:'wy_fin_route' },

};
Object.assign(ARC_WYVERNE, ARC_WYVERNE_9);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 10 — LES ISSUES
 *
 * Une issue n'est pas un score. C'est une lecture : ce qui est mort, ce qui
 * vit, qui vous doit quelque chose, et ce que ça coûtera plus tard.
 * ══════════════════════════════════════════════════════════════════════════ */

const ARC_WYVERNE_10 = {

wy_fin_route:{
  lieu:"La Route Grise · vers le sud",
  titre:"Ce qu'on laisse derrière",
  texte:[
    "Vous repassez le gué de Cendrepont trois jours plus tard, dans l'autre sens, avec le premier convoi de sel de l'année.",
    "Quatorze chariots. Il n'y en avait pas eu quatorze d'un coup depuis l'automne. Les hommes marchent au milieu de la route au lieu de raser la paroi, et l'un d'eux chante, ce qui n'est pas grand-chose et qui est en réalité toute la différence.",
    { sobre:"Les carcasses sont toujours sur les vires. Elles y sécheront jusqu'à l'été.",
      intense:"Les carcasses sont toujours accrochées aux vires à mi-hauteur. Personne n'ira les décrocher : elles sécheront là jusqu'à l'été et tomberont d'elles-mêmes en morceaux, et dans dix ans il restera des os coincés dans le schiste que personne ne saura plus expliquer.",
      extreme:"Les carcasses sont toujours accrochées aux vires. Personne n'ira les décrocher : elles sécheront jusqu'à l'été et tomberont en morceaux, et dans dix ans il restera dans le schiste des fémurs de cheval et deux bassins humains que personne ne saura plus expliquer." },
    () => a('wy_borne_effacee')
      ? "À cent quarante pieds au-dessus de vous, sur une plateforme de vingt pieds sur douze, il y a une borne d'arpentage dont la face sud est ruinée par ce qui ressemble à quarante hivers de gel."
      : (a('wy_pierre_karlsberg')
        ? "À cent quarante pieds au-dessus de vous, il y a une borne d'arpentage à laquelle il manque une face. Quarante livres de schiste gravé voyagent dans votre bât, enveloppées dans une chemise, et pèsent sur le garrot du cheval à chaque montée."
        : "À cent quarante pieds au-dessus de vous, il y a une borne d'arpentage dont la face sud porte un loup, recouverte de fiente sèche que vous avez tassée vous-même, au-dessus d'une route où passeront quatre caravanes par semaine à partir de juin."),
    "§ Vous ne l'avez dit à personne. C'est ce que vous faites depuis dix-neuf ans et vous êtes très bon à ce jeu-là.",
  ],
  issue:"L'affaire est close",
  bilan:"La Route Grise est rouverte",
  apres:[
    () => a('wy_morte_par_vous') ? "Vous avez tué la Grise à l'épée, à quatre pouces sous l'occiput, et vous en garderez ce qu'on garde de ces choses-là."
      : (a('wy_morte_onde') ? "Vous avez tué la Grise sans la toucher, et il y avait des gens pour le voir." :
         (a('wy_morte_baliste') ? "La Grise est morte sous neuf carreaux de Valombre, et Bracq dira à qui voudra l'entendre que c'est vous qui l'aviez mise là." : "La Grise est morte.")),
    () => a('wy_oeufs_detruits') ? "La couvée est détruite. Cette gorge est vide pour vingt ans, et personne ne vous a payé pour la partie qui comptait."
      : (a('wy_oeufs_laisses') ? "Trois œufs sont restés dans le nid. Ils écloront en avril, et dans trois ans quelqu'un affichera une lettre au mur du Héron."
      : (a('wy_oeufs_casses_cour') ? "La couvée est morte sur les pavés d'une cour noble, devant douze personnes qui le raconteront pendant vingt ans."
      : (a('wy_oeufs_vendus_amaury') || a('wy_oeufs_vendus_gassien')
        ? "La couvée est vivante et elle voyage vers la côte des Dents. Dans trois ans, quelqu'un dont vous ignorez le nom aura trois montures qui n'existaient pas."
        : "La couvée a quitté cette gorge dans vos paniers."))),
    () => a('wy_verite_dite') ? "Amaury de Valombre sait ce que vous avez dit à sa mère, et il a vingt-huit ans devant lui pour y penser."
      : (a('wy_amaury_dette') ? "Amaury de Valombre vous doit un silence, et il vous l'a dit lui-même : il ne sait pas encore ce que ça va lui coûter."
      : (a('wy_rien_dit') ? "Héloïse de Valombre note. C'est ce qu'elle fait de mieux et elle a onze ans d'avance sur vous." : "")),
    () => a('wy_coutume') && a('wy_alienor_accord')
      ? "Aliénor de Valombre quitte Valombre dans quinze jours pour une destination qu'elle n'a dite qu'à vous. Elle a vingt-quatre ans, elle sait lire un registre de péage, et elle ne vous doit rien : c'est précisément pour ça qu'elle reviendra."
      : (a('wy_coutume_imposee')
        ? "Aliénor de Valombre n'est pas descendue dans la cour. La coutume a été honorée dans sa lettre exacte, et c'est une chose qui ne se rattrape pas, ni avec de l'or, ni avec du temps, ni en tuant d'autres bêtes."
        : (a('wy_or_seul') ? "Vous n'avez pris que l'or. Dans les maisons du nord, cela se remarque, et cela se commente." : "")),
  ],
  plusTard:"Un seigneur de guerre de la côte des Dents, un fils cadet qui a maintenant un secret et de l'argent, une veuve qui vend sa tour à l'automne, et un loup gravé au-dessus d'une route que vous venez de rendre passante.",
},

wy_fin_vivante:{
  lieu:"La Route Grise · vers le sud",
  titre:"Ce qui reste en haut",
  texte:[
    "Vous quittez la vallée par le sud, seul, sans convoi, parce qu'il n'y a pas de convoi : la Route Grise est fermée et elle le restera.",
    { sobre:"On vous regarde partir. Personne ne dit rien.",
      intense:"On vous regarde partir depuis le chemin de ronde de Valombre, et personne ne dit rien, et ce silence-là est une chose que vous emporterez plus loin que la vallée. Ils n'ont pas de colère : ils ont l'habitude. Trois hommes de Chastel ont essayé avant vous. La différence est que vous, vous êtes redescendu entier.",
      extreme:"On vous regarde partir depuis le chemin de ronde et personne ne dit rien, et ce silence-là voyage plus loin que la vallée. Ils n'ont pas de colère : ils ont l'habitude. Trois compagnies ont essayé avant vous et il en est revenu des morceaux. La différence est que vous, vous êtes redescendu entier, et qu'on ne sait pas encore quoi faire de cette information." },
    () => a('wy_epargnee')
      ? "§ Elle est là-haut. Une aile ouverte sur quatre pieds, un jarret entamé, une couvée dans une borne — et vingt ans devant elle si personne ne remonte."
      : "§ Elle est là-haut. Blessée, essoufflée, plus méfiante qu'avant — et désormais, elle sait ce qu'un homme peut faire.",
    "Cendrepont vendra sa tour à l'automne. Les trois villages du bas du gué passeront par le col de Frimaire, qui fait onze lieues de plus et qui ferme quatre mois par an. Gassien le Lièvre fera fortune.",
    "Rien de tout cela n'est théorique et vous en connaissez le détail, parce que vous avez lu le registre.",
  ],
  issue:"L'affaire est close, et elle n'est pas réglée",
  bilan:"La Grise est vivante et la Route Grise est fermée",
  apres:[
    () => a('wy_epargnee')
      ? "Vous l'avez laissée partir alors qu'elle était à sept pas et à votre merci. Six servants de baliste l'ont vu, ou personne — mais vous, vous savez pourquoi vous l'avez fait, et ce n'était pas de la pitié."
      : "Vous avez rompu le combat et vous êtes redescendu sur vos jambes. C'est le résultat le plus rare de tous et celui dont on parle le moins.",
    () => a('wy_bracq_respect') || a('wy_bracq_reconnaissant')
      ? "Bracq, maître des engins de la maison de Valombre, cinquante ans, trois doigts, a une opinion très précise sur les hommes qui savent s'arrêter, et il la donnera à qui la lui demandera pendant les vingt années qui viennent."
      : "",
    () => a('wy_borne_karlsberg') || a('wy_pierre_karlsberg')
      ? "Et il y a la borne. Une gorge que votre famille possédait, tenue depuis six semaines par une bête que vous avez laissée en vie, au-dessus d'une route que personne n'empruntera plus."
      : "",
  ],
  plusTard:"Une lettre sera affichée au mur du Héron l'an prochain, avec un chiffre plus élevé. Quelqu'un d'autre montera. Ce sera une compagnie de Chastel, à la baliste, et ils trouveront trois œufs au nid.",
},

wy_fin_perdu:{
  lieu:"Quelque part au sud de Cendrepont · trois semaines plus tard",
  titre:"Ce qu'on rapporte quand on ne rapporte rien",
  texte:[
    "Il faut trois semaines pour qu'un flanc ouvert en février cesse d'être une chose qui décide de votre journée, et il faut le double pour qu'il cesse d'être une chose qui décide de vos nuits.",
    { sobre:"Vous n'avez pas rempli le contrat. Quatre-vingts couronnes, l'usage du nord.",
      intense:"Vous n'avez pas rempli le contrat. Le régisseur de Valombre a compté quatre-vingts couronnes sur le rebord d'une auge — le tiers, l'usage des maisons du nord quand un homme a manifestement tout donné et que la chose n'est pas faite — et il s'est excusé à voix basse, ce qu'aucun règlement ne lui demandait.",
      extreme:"Vous n'avez pas rempli le contrat. Quatre-vingts couronnes, le tiers, l'usage des maisons du nord quand un homme a tout donné et que la chose n'est pas faite. Le régisseur s'est excusé à voix basse, ce qu'aucun règlement ne lui demandait, et il n'a pas pu s'empêcher de regarder le flanc pendant qu'il comptait." },
    "§ Ce n'est pas la première fois qu'un homme redescend d'une gorge sans ce qu'il était monté chercher. C'est la première fois que c'est vous.",
    "La vallée en parlera un mois. Puis il y aura autre chose — une crue, une taxe, une guerre au sud — et il ne restera qu'une ligne dans une conversation d'auberge : *on avait pris un Paria, l'hiver dernier, il n'a pas pu.*",
    "Ce qui est, tout compte fait, le meilleur résultat possible pour un homme qui tient à ne pas exister.",
  ],
  issue:"L'affaire est perdue",
  bilan:"Vous êtes redescendu du gué sans la bête, et vivant",
  apres:[
    "Il n'y a rien à récupérer et personne ne vous doit rien. C'est ce que veut dire *définitif* : ça ne se rejoue pas, ça se porte.",
    () => `Vous repartez de cette vallée avec ${ETAT.blessures.length} blessure${ETAT.blessures.length > 1 ? 's' : ''}, ${ETAT.or} couronnes, et la connaissance très exacte de ce que vous valez contre douze cents livres.`,
    "Le mur du fond de l'auberge du Héron a d'autres papiers. Il en a toujours d'autres.",
  ],
  plusTard:"La Route Grise se rouvrira sans vous, en Ventôse, par une compagnie de Chastel qui y laissera quatre hommes et onze jours. On trouvera trois œufs au nid, et ils seront vendus avant que le corps refroidisse.",
},

};
Object.assign(ARC_WYVERNE, ARC_WYVERNE_10);

/* ══════════════════════════════════════════════════════════════════════════
 * LES AIGUILLAGES — trois scènes qui ne s'écrivent pas : elles lisent.
 * ══════════════════════════════════════════════════════════════════════════ */

/* La nuit n'a lieu que si la coutume a été réclamée et accordée. */
DYN.wy_nuit_ou_route = () =>
  aller(a('wy_coutume') && (a('wy_alienor_accord') || a('wy_coutume_imposee')) ? 'wy_nuit' : 'wy_route');

/* À l'issue d'un troisième échange manqué, c'est le corps qui décide. */
DYN.wy_survie = () => {
  const sang = ETAT.ressources.sang;
  const graves = ETAT.blessures.filter(b => b.gravite >= 3).length;
  aller((sang <= 25 || graves >= 3) ? 'wy_mort' : 'wy_traine');
};

/* L'issue lit ce qui est mort, ce qui vit, et ce qu'on emporte. */
DYN.wy_issue = () =>
  aller(a('wy_morte') ? 'wy_fin_route' : (a('wy_echec_total') ? 'wy_fin_perdu' : 'wy_fin_vivante'));

/* Le retour des issues vers le tableau des mercenaires. */
for(const id of ['wy_fin_route', 'wy_fin_vivante', 'wy_fin_perdu']){
  ARC_WYVERNE[id].suite = 'entre_saisons';
  ARC_WYVERNE[id].libelleSuite = "Reprendre la route";
}

enregistrerScenes(ARC_WYVERNE);
