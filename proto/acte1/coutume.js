/* PARIAS — Acte I · CE QUI SE PAIE APRÈS
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Trois femmes de l'Acte I fixent les termes de la coutume et disent, mot
 * pour mot, la même chose :
 *
 *   Ermengarde de Rochebrune — « Après. Pas avant. Je ne veux pas de la
 *     version où vous montez sur cette lande en me devant quelque chose. »
 *   Maëlys d'Arquenay — « Après. Quand vous serez remonté. »
 *   Iselle de Vauclair — « Après. Et pas dans cette maison : à l'auberge
 *     du bourg, où tout le monde nous verra, parce que c'est tout l'intérêt. »
 *
 * Ermengarde va jusqu'à poser la clef du cellier sur un tonneau et à décrire
 * la porte qui ne grince pas. Et cet après n'arrivait jamais. Le contrat se
 * fermait, la saison tournait, et la seule affaire qui rendait la scène était
 * la wyverne, où Aliénor vient le soir même — `wy_nuit`, dont ce fichier
 * reprend la forme entière.
 *
 * Ce n'était pas une pudeur de conception : c'était un trou. Une coutume
 * qu'on réclame et qui ne se tient pas n'est pas une ellipse, c'est une
 * promesse que le jeu oublie.
 *
 * ═══ CE QUI NE CHANGE PAS ═══
 *
 * Les termes. Ils se fixent avant toute action, ils sont ce qu'ils sont, et
 * ce fichier n'y touche pas d'une ligne : il rend la scène que les termes
 * annonçaient déjà. Ce qui se passe dedans reste entièrement décidé là —
 * par elle d'abord, qui a dit oui pour ses raisons et les a dites, et par le
 * joueur ensuite, à qui deux des quatre portes offrent de n'en rien faire.
 *
 * ═══ OÙ ÇA S'ACCROCHE ═══
 *
 * `prochaineDeLEntreSaison()`, en tête de file. C'est l'endroit exact que le
 * texte désigne : l'affaire est close, on est redescendu, on est revenu — et
 * ce qui avait été remis à *après* arrive. Une fois, jamais deux, et
 * seulement si la coutume a été accordée.
 * ═══════════════════════════════════════════════════════════════════════ */

/* Les trois portes d'entrée. Aucune scène ne pointe dessus par un `va:` :
 * c'est `prochaineDeLEntreSaison()` qui va les chercher quand la dette est
 * due, exactement comme pour les chasses de route. L'épreuve d'acceptation
 * ne peut pas deviner ça toute seule — elle lit ce tableau. */
const COUTUME_ENTREES = ['ro_nuit', 'ar_nuit', 'va_nuit'];

/* La file de l'entre-saisons demande un identifiant de scène ou rien. */
function nuitDue(){
  if(a('ro_coutume') && a('ro_ermengarde_accord') && !a('ro_nuit_faite')) return 'ro_nuit';
  if(a('ar_coutume') && a('ar_maelys_accord')     && !a('ar_nuit_faite')) return 'ar_nuit';
  if(a('va_coutume') && a('va_iselle_accord')     && !a('va_nuit_faite')) return 'va_nuit';
  return null;
}

const COUTUME = {

/* ══════════════════════════════════════════════════════════════════════════
 * ERMENGARDE DE ROCHEBRUNE — le cellier, et la porte qui ne grince pas
 *
 * Vingt-six ans, veuve, elle décide seule depuis trois ans et elle l'a fait
 * payer cher une fois. Elle a appliqué la règle mieux que Yohan dans la
 * scène des termes ; elle continue.
 * ══════════════════════════════════════════════════════════════════════════ */

ro_nuit:{
  lieu:"Rochebrune · le cellier · après l'affaire",
  titre:"Ce qui avait été remis",
  qui:'ermengarde',
  texte:[
    "La porte de la cour des cuisines ne grince pas. Elle avait raison, et elle avait vérifié : il y a du suif frais sur les deux gonds, mis là par quelqu'un qui savait quel soir on s'en servirait.",
    { sobre:"Le cellier sent la pomme et la saumure.",
      intense:"Le cellier sent la pomme, la saumure et la terre battue. Il y a une chandelle posée dans un plat, deux verres, et un pichet qui n'est pas de la table du seigneur — du cidre de l'année, trouble, celui qu'on boit aux cuisines.",
      extreme:"Le cellier sent la pomme, la saumure et la terre battue froide. Une chandelle dans un plat d'étain, deux verres dépareillés, un pichet de cidre trouble de l'année — celui des cuisines, pas celui de la table.\n\nElle a tout monté elle-même. On le voit à ce que rien n'est disposé : une femme qui aurait fait porter ça par une servante aurait eu un plateau." },
    "Ermengarde de Rochebrune est assise sur un billot, en robe de dessous et en manteau d'homme, les cheveux défaits et les pieds nus sur la terre battue, ce qui doit être glacé et ce dont elle n'a pas l'air de s'apercevoir.",
    () => a('ro_aldren_mort')
      ? "« On l'a enterré ce matin, du côté nord, sans messe. Mon père a payé le fossoyeur pour qu'il oublie où. »"
      : a('ro_aldren_vivant')
      ? "« Il est parti ce matin. Vivant. Mon père n'a pas dormi et il ne dormira pas avant un mois. »"
      : "« C'est fini, en tout cas. C'est le mot que mon père emploie et il l'emploie beaucoup trop souvent depuis ce matin. »",
    "§ « Je n'ai pas changé d'avis, si c'est la question. Je vous préviens seulement que je suis de très mauvaise humeur, et que ça n'a aucun rapport avec vous. »",
  ],
  choix:[
    { t:"« Vous n'êtes obligée à rien. L'affaire est close et payée. »",
      detail:"Elle a fixé les termes elle-même · lui rappeler qu'ils se rompent",
      risque:"sûr", va:'ro_nuit_sortie' },
    { t:"Lui demander pourquoi elle est de mauvaise humeur",
      detail:"Perception — il y a une réponse et elle n'est pas celle qu'on croit",
      risque:"favorable",
      test:{ carac:'perception', comp:null, dc:10, manoeuvre:'humeur' },
      degres:{ dominante:'ro_nuit_pourquoi', nette:'ro_nuit_pourquoi',
               couteuse:'ro_nuit_pourquoi_ko', echec:'ro_nuit_pourquoi_ko' } },
    { t:"Boire le cidre des cuisines et ne rien demander",
      detail:"Elle a monté deux verres · c'est déjà une phrase",
      va:'ro_nuit_cidre' },
    { t:"Passer la nuit à parler, et rien d'autre",
      detail:"L'ellipse · personne dans cette maison n'ira le vérifier",
      va:'ro_nuit_ellipse' },
  ],
},

ro_nuit_sortie:{
  qui:'ermengarde',
  texte:[
    "Elle vous laisse finir. Elle laisse toujours finir : c'est une façon de se donner le temps de choisir entre trois réponses.",
    "« Je sais. C'est moi qui ai écrit la clause, vous vous rappelez ? »",
    "§ « Et je vais vous dire ce qui m'agace, parce que vous venez de le faire deux fois en huit jours. »",
    "^« Vous décidez à ma place de ce qui est bon pour moi, et vous appelez ça de la délicatesse. Mon père fait exactement la même chose, avec exactement la même voix, et il croit exactement la même chose de lui-même. »",
    "Un temps.",
    { sobre:"« Asseyez-vous. »",
      intense:"« Alors voilà : je ne suis pas une jeune fille qu'on livre, je ne suis pas une veuve qu'on console, et je n'ai pas besoin qu'un homme d'armes me protège d'une décision que j'ai prise avant qu'il monte sur la lande.\n\nAsseyez-vous. Vous êtes insupportable debout. »",
      extreme:"« Alors voilà, et on n'en reparle plus. Je ne suis pas une jeune fille qu'on livre. Je ne suis pas une veuve qu'on console. J'ai été mariée quatre ans à un homme de quarante et un ans qui a été correct avec moi, ce qui est déjà beaucoup, et je n'ai rien décidé de ces quatre ans-là.\n\nCeci, je l'ai décidé. Ne me le reprenez pas pour vous sentir propre en redescendant la lande.\n\nAsseyez-vous. Vous êtes insupportable debout. »" },
  ],
  effets:{ flags:['ro_nuit_offert_sortie', 'ro_ermengarde_estime'],
           marque:"Vous lui avez offert de rompre les termes. Elle a expliqué pourquoi c'était une insulte.",
           court:"Elle a refusé" },
  suite:'ro_nuit_ensemble',
},

ro_nuit_pourquoi:{
  qui:'ermengarde',
  texte:[
    "@« Pourquoi de mauvaise humeur ? »",
    "Elle vous regarde comme si la question était mal posée, puis elle comprend qu'elle est bien posée et que c'est ça qui la gêne.",
    "« Parce que pendant onze jours, dans cette maison, j'ai été la seule personne à savoir quelque chose que tout le monde savait. »",
    { sobre:"« Quatorze hommes ont regardé. Quatorze. »",
      intense:"« Quatorze hommes ont regardé mon oncle par alliance défigurer un chevalier de cette maison, une nuit entière, et sont redescendus dîner. Onze sont morts depuis. Trois sont encore ici. L'un d'eux m'a appris à monter à cheval. »",
      extreme:"« Quatorze hommes ont regardé mon oncle par alliance défigurer un chevalier de cette maison. Une nuit entière. Puis ils sont redescendus, ils ont dîné, et ils ont continué pendant deux ans à passer devant moi dans les couloirs en me souhaitant le bonjour.\n\nOnze sont morts depuis, et c'est pour ça que vous êtes venu. Trois sont encore ici. L'un des trois m'a appris à monter à cheval quand j'avais sept ans, et je ne peux plus le regarder sans faire le calcul. »" },
    "Elle se verse du cidre et n'en boit pas.",
    "§ « Voilà. Vous avez demandé. C'est la première fois en deux ans que quelqu'un demande quelque chose dans cette maison au lieu d'attendre que ça se range tout seul. »",
    "^« Maintenant venez, et cessez de me faire parler de ma famille. »",
  ],
  effets:{ flags:['ro_nuit_demande', 'ro_ermengarde_estime', 'ro_sait_quatorze'],
           marque:"Trois des quatorze qui ont regardé sont encore à Rochebrune. L'un d'eux lui a appris à monter à cheval.",
           court:"Les trois qui restent" },
  suite:'ro_nuit_ensemble',
},

ro_nuit_pourquoi_ko:{
  qui:'ermengarde',
  texte:[
    "La question sort du mauvais côté — avec la précaution qu'on met à parler aux gens qui viennent d'enterrer quelqu'un.",
    "« Ce n'est pas du chagrin. »",
    "Elle le dit sans agacement, ce qui est pire que de l'agacement.",
    "« Personne n'est mort que j'aimais. Ce n'est pas du chagrin, ce n'est pas de la peur, et ce n'est pas non plus ce que les hommes appellent de la nervosité quand ils ne savent pas nommer autre chose. »",
    "§ Elle souffle la moitié de la chandelle avec deux doigts, ce qui laisse le cellier dans une lumière très basse et qui règle la question.",
    "^« On va faire autrement : vous ne me demandez plus rien, et moi je ne vous explique plus rien. C'est reposant. »",
  ],
  suite:'ro_nuit_ensemble',
},

ro_nuit_cidre:{
  qui:'ermengarde',
  texte:[
    "Le cidre de l'année est trouble, âpre, et il a un fond de pomme gâtée que les gens des cuisines appellent du caractère.",
    "Elle boit en silence un long moment, les pieds sur la terre battue, le manteau d'homme ouvert sur les épaules.",
    "Puis elle parle, sans qu'on ait rien demandé, comme quelqu'un qui a décidé que ce serait plus rapide.",
    "« Mon mari est mort en Nivôse il y a trois ans, d'une fièvre, en quatre jours. Il avait quarante et un ans, il était correct, il ne m'a jamais levé la main dessus et je ne l'ai jamais choisi. Quand on me plaint, je dis que c'était un bon mari, et c'est vrai, et ce n'est pas une réponse à la question qu'on me pose. »",
    { sobre:"« Depuis trois ans, je décide. C'est tout ce que j'ai gagné. »",
      intense:"« Depuis trois ans, je décide. De la maison, du fermage, de qui reste et de qui part. Mon père signe. C'est tout ce que j'ai gagné à ces quatre ans-là, et c'est beaucoup plus que ce qu'obtiennent les femmes dont le mari ne meurt pas. »",
      extreme:"« Depuis trois ans, je décide. Le fermage, les réparations, qui reste dans cette maison et qui en part, et combien on donne aux veuves des onze patrouilleurs. Mon père signe et il a l'honnêteté de le savoir.\n\nC'est tout ce que j'ai gagné à ces quatre ans-là. C'est beaucoup plus que ce qu'obtiennent les femmes dont le mari ne meurt pas, et il n'y a aucune manière de dire cette phrase-là à voix haute sans passer pour un monstre, alors je ne la dis jamais. Sauf ce soir, à quelqu'un qui repart demain. »" },
    "Elle repose son verre sur le billot, à côté du vôtre, et le silence change de nature.",
    "§ Ce n'est plus le silence de deux personnes qui attendent. C'est celui de deux personnes qui ont fini d'attendre.",
  ],
  effets:{ flags:['ro_ermengarde_estime'] },
  suite:'ro_nuit_ensemble',
},

ro_nuit_ensemble:{
  qui:'ermengarde',
  texte:[
    "Elle se lève du billot la première, et c'est elle qui éteint la chandelle — d'un souffle, sans cérémonie, parce qu'une chandelle dans un cellier se voit sous la porte depuis la cour.",
    "Le premier geste est à elle : la main à plat sur le sternum, ouverte, non pour repousser. Elle a les doigts froids et l'ongle du pouce cassé net, ce qui ne vient pas d'un travail de dame.",
    "Elle trouve ce qu'il y a à trouver — la chose sous la clavicule, l'autre au-dessus de la hanche — et elle ne pose aucune question, ce qui est une politesse qu'on rencontre trois fois dans une vie.",
    "Vous trouvez les siennes. Une vieille brûlure sur l'avant-bras gauche, large comme une paume, régulière.",
    "« Un chaudron de teinture, à neuf ans. J'ai voulu le porter comme les femmes du lavoir. Ma mère a pleuré et ma nourrice m'a giflée, dans cet ordre, et j'ai trouvé que ma nourrice avait raison. »",
    { sobre:"Le froid du cellier cesse d'être un sujet.",
      intense:"Elle n'a rien de pressé et rien de solennel. Elle prend son temps comme on prend son temps sur une chose qu'on n'aura pas deux fois, elle dit ce qu'elle veut à voix très basse à cause de la fille de dix-neuf ans qui dort deux étages plus haut, et elle rit une fois — court, dans le noir, contre votre cou — ce qui ne lui était pas arrivé depuis Nivôse.",
      extreme:"Elle n'a rien de pressé et rien de solennel. Elle prend son temps comme on prend son temps sur une chose qu'on sait qu'on n'aura pas deux fois, elle dit exactement ce qu'elle veut et corrige ce qui ne va pas, à voix très basse à cause de la fille de dix-neuf ans qui dort deux étages au-dessus.\n\nElle rit une fois, court, dans le noir, contre votre cou. Elle dira plus tard que c'est la seule chose de cette nuit-là dont elle se souvienne exactement.\n\nLa terre battue est glacée et personne ne s'en aperçoit avant le matin." },
    "Il fait noir depuis longtemps quand ils cessent de parler, et ce qu'ils se disent alors n'appartient ni à la coutume, ni à la maison, ni au second exemplaire du contrat.",
  ],
  suite:'ro_nuit_matin',
},

ro_nuit_ellipse:{
  qui:'ermengarde',
  texte:[
    "@« On peut passer la nuit à parler. La coutume n'oblige personne à autre chose que ce que les deux veulent. »",
    "Elle vous regarde un long moment par-dessus son verre.",
    "« Vous êtes fatigant. Mais d'accord. »",
    "Pas de soulagement, pas de reproche, pas de scène. Elle remonte les pieds sur le billot, ramène le manteau d'homme sur ses genoux, et remplit les deux verres.",
    "Ils parlent jusqu'à la quatrième heure. Du fermage, qu'elle tient depuis trois ans et que personne ne relit. Des veuves des onze patrouilleurs, à qui elle a fait donner ce qu'il fallait sans le demander à son père. D'un mari mort en quatre jours à quarante et un ans, qui était correct.",
    "§ Et de Karlsberg — pas la version qu'on chante. Celle où l'on a froid.",
    "Elle écoute ça sans rien dire, très longtemps, et elle ne demande pas une seule fois si c'est vrai.",
    "Au matin, la coutume n'aura pas été tenue, et personne dans cette maison n'ira le vérifier.",
  ],
  effets:{ flags:['ro_nuit_ellipse', 'ro_ermengarde_estime'],
           marque:"La coutume n'a pas été tenue à Rochebrune. Vous avez parlé jusqu'au matin.",
           court:"Rien, et tout" },
  suite:'ro_nuit_matin',
},

ro_nuit_matin:{
  lieu:"Rochebrune · le cellier · avant le jour",
  qui:'ermengarde',
  texte:[
    "Elle est debout avant l'aube et elle se rhabille dans le noir avec l'aisance de quelqu'un qui a déjà eu à ne pas être vu en sortant d'une pièce.",
    a('ro_nuit_ellipse')
      ? "Elle n'a pas dormi. Elle a l'air d'avoir gagné quelque chose et de ne pas savoir quoi en faire."
      : "La chandelle est morte depuis longtemps. Elle remet ses bas assise sur le billot, dos à la porte.",
    "« Ne dites rien d'aimable. Vous le regretterez en selle et moi j'y repenserai six mois. »",
    a('ro_nuit_demande') || a('ro_nuit_offert_sortie')
      ? "Un temps. « Mais vous avez demandé, et vous êtes le premier. Ça, emportez-le. »"
      : "Elle n'ajoute rien.",
    "Puis elle décroche du mur une planchette de fermage, la retourne, et écrit trois noms au charbon sur le bois nu.",
    "§ « Les trois qui ont regardé et qui sont encore ici. Le premier tient l'écurie. Le deuxième est chapelain. Le troisième est mon cousin par les femmes et il dînera à la table de mon père ce soir. »",
    "^« Je ne vous demande rien. Je vous dis seulement que cette maison ne l'écrira jamais nulle part, et qu'à partir de ce matin nous sommes deux à le savoir. »",
    "Elle vous laisse la planchette et elle sort par la porte qui ne grince pas.",
  ],
  effets:{ flags:['ro_nuit_faite', 'ro_sait_quatorze', 'ro_planchette'],
           marque:"Ermengarde a écrit au charbon les trois noms que Rochebrune n'écrira jamais.",
           court:"Trois noms au charbon" },
  suite:'entre_saisons', libelleSuite:"Reprendre la route",
},

/* ══════════════════════════════════════════════════════════════════════════
 * MAËLYS D'ARQUENAY — après qu'on est remonté
 *
 * Vingt ans, majeure depuis huit mois, mariée en Floréal à un homme qu'elle
 * n'a jamais vu. Elle a dit oui pour décider une chose dans sa vie et elle
 * l'a formulé elle-même, sans qu'on l'aide. C'est la plus jeune des trois et
 * la seule qui ait encore quelque chose à perdre : la scène lui laisse donc
 * la porte la plus large, et ne lui retire pas sa décision pour autant.
 * ══════════════════════════════════════════════════════════════════════════ */

ar_nuit:{
  lieu:"Arquenay · le grenier à fourrage · le soir du jour où l'on est remonté",
  titre:"Ce qu'elle avait décidé",
  qui:'maelys',
  texte:[
    "Ce n'est pas une chambre : c'est le grenier à fourrage au-dessus de l'écurie, où l'on accède par une échelle et où il n'y a aucune raison d'entrer après la nuit.",
    { sobre:"Du foin, une lanterne sourde, une couverture de cheval.",
      intense:"Du foin de deuxième coupe, une lanterne sourde posée à plat pour que la lumière ne passe pas par les fentes, et deux couvertures de cheval étendues l'une sur l'autre. Il fait dix degrés de plus qu'en bas parce que l'écurie chauffe par le plancher.",
      extreme:"Du foin de deuxième coupe, une lanterne sourde couchée à plat pour que rien ne passe par les fentes du plancher, deux couvertures de cheval étendues l'une sur l'autre et battues.\n\nIl y fait dix degrés de plus qu'en bas : l'écurie chauffe par en dessous, huit chevaux respirent sous vos pieds, et c'est le seul endroit d'Arquenay où l'on ait chaud sans que le régisseur en tienne le compte." },
    () => a('ar_trente_quatre') || a('ar_tenu') || a('ar_vingt_sept')
      ? "Elle a passé la journée en bas du puits, à compter les gens qui remontaient, et elle a le noir de fond dans le creux des ongles."
      : a('ar_sans_retour')
      ? "Elle a passé la journée à la recette du puits trois, à attendre une benne qui n'a rien ramené, et elle n'a pas pleuré une seule fois devant les hommes."
      : "Elle a passé la journée debout à la recette et elle n'a pas plus dormi cette nuit que les onze précédentes.",
    () => a('ar_gaspard')
      ? "^« Il dort. Il a dormi quatorze heures et il s'est réveillé deux fois en criant, et Corbeil est venu trois fois demander quand il pourrait lui parler. J'ai dit non trois fois. C'est la deuxième chose que je décide. »"
      : "^« Ne me demandez pas comment je vais. Tout le monde me l'a demandé aujourd'hui et je n'ai plus de réponse qui tienne debout. »",
    "§ « J'ai vingt ans, j'épouse en Floréal, et il me reste onze semaines pendant lesquelles je suis encore quelqu'un qui décide. Je n'ai pas changé d'avis. »",
  ],
  choix:[
    { t:"« Non. Pas ce soir, pas comme ça. »",
      detail:"Elle a vingt ans, elle vient d'enterrer ou de retrouver son frère · refuser franchement",
      risque:"sûr", va:'ar_nuit_non' },
    { t:"Lui demander ce qu'elle veut, elle",
      detail:"Volonté — la question est simple ; la poser à vingt ans sans la blesser ne l'est pas",
      risque:"favorable",
      test:{ carac:'volonte', comp:null, dc:11, manoeuvre:'question' },
      degres:{ dominante:'ar_nuit_veut', nette:'ar_nuit_veut',
               couteuse:'ar_nuit_veut_ko', echec:'ar_nuit_veut_ko' } },
    { t:"Monter, et la laisser mener",
      detail:"Elle a choisi le lieu, l'heure et la lanterne · tout est déjà décidé",
      va:'ar_nuit_ensemble' },
    { t:"Rester, parler, et rien d'autre",
      detail:"L'ellipse · onze semaines, et une chose décidée qui n'est pas celle-là",
      va:'ar_nuit_ellipse' },
  ],
},

ar_nuit_non:{
  qui:'maelys',
  texte:[
    "@« Non. Pas ce soir. »",
    "Elle encaisse sans broncher, ce qui est exactement ce qu'on lui a appris à faire.",
    "« Bon. »",
    "Puis, au bout d'un moment, d'une voix qui a repris sa dureté de cour de roulage :",
    "^« Vous avez le droit. C'était écrit dans le formulaire, dans les deux sens, et j'avais lu les deux sens. »",
    { sobre:"« Dites-moi seulement si c'est à cause de mon âge. »",
      intense:"« Dites-moi seulement une chose, et dites-la-moi vraiment. Est-ce que c'est parce que vous n'avez pas envie, ou parce que vous avez décidé que je ne savais pas ce que je faisais ?\n\nLa première, je l'accepte tout de suite. La deuxième, c'est la trente et unième fois qu'on me la fait en huit mois. »",
      extreme:"« Dites-moi seulement une chose, et dites-la-moi vraiment, parce que je saurai si vous mentez : est-ce que c'est parce que vous n'avez pas envie, ou parce que vous avez décidé pour moi que je ne savais pas ce que je faisais ?\n\nLa première, je l'accepte tout de suite et on n'en parle plus. La deuxième, c'est la trente et unième fois en huit mois, et je les ai comptées. »" },
    "§ Il n'y a pas de bonne réponse rapide à ça, et elle le sait, et c'est précisément pour ça qu'elle la pose.",
    "Elle finit par hausser une épaule et par s'asseoir dans le foin, la lanterne entre vous deux.",
    "^« Alors restez au moins jusqu'à ce que l'écurie soit froide. Je n'ai personne à qui parler dans cette maison depuis le onze. »",
  ],
  effets:{ flags:['ar_nuit_refusee', 'ar_maelys_estime'],
           marque:"Vous avez refusé la coutume à Arquenay, après coup. Elle a demandé pourquoi, et c'était la bonne question.",
           court:"Refusée" },
  suite:'ar_nuit_ellipse',
},

ar_nuit_veut:{
  qui:'maelys',
  texte:[
    "@« Qu'est-ce que vous voulez, vous ? Pas ce que vous avez décidé. Ce que vous voulez. »",
    "Elle ouvre la bouche pour répondre vite — elle répond vite à tout depuis huit mois — et elle ne le fait pas.",
    "Le silence dure assez longtemps pour qu'on entende les chevaux bouger en dessous.",
    { sobre:"« Je ne sais pas. Personne ne me l'a jamais demandé. »",
      intense:"« Je ne sais pas. » Elle a l'air sincèrement embarrassée, ce qui ne lui ressemble pas. « Ce n'est pas une figure de style. Personne ne me l'a jamais demandé, alors je n'ai jamais eu à le savoir, et je découvre à l'instant que ce n'est pas la même chose que ne rien vouloir. »",
      extreme:"« Je ne sais pas. » Elle a l'air sincèrement embarrassée, ce qui ne lui ressemble pas du tout. « Ce n'est pas une figure de style et ce n'est pas de la pudeur. Personne ne me l'a jamais demandé — ni ma mère, ni Corbeil, ni l'homme que j'épouse en Floréal, qui a écrit trois lettres et n'a posé aucune question dans les trois.\n\nAlors je n'ai jamais eu à le savoir. Et je découvre à l'instant que n'avoir jamais eu à le savoir, ce n'est pas du tout la même chose que ne rien vouloir. »" },
    "Elle relève la tête.",
    "^« Je veux qu'on ne me félicite pas. Pas une fois cette nuit. Tout le monde me félicite depuis six semaines pour un mariage que je n'ai pas choisi, et je crois que c'est de ça que je suis le plus fatiguée au monde. »",
    "§ « Et je veux décider quand ça commence et quand ça s'arrête. Les deux. C'est tout. Ce n'est pas beaucoup. »",
  ],
  effets:{ flags:['ar_nuit_demande', 'ar_maelys_estime'],
           marque:"Personne n'avait jamais demandé à Maëlys d'Arquenay ce qu'elle voulait. Elle a mis un long moment à répondre.",
           court:"La question posée" },
  suite:'ar_nuit_ensemble',
},

ar_nuit_veut_ko:{
  qui:'maelys',
  texte:[
    "La question sort avec toutes les précautions du monde, et toutes les précautions du monde, à une femme de vingt ans, s'entendent comme une seule chose.",
    "« Vous me parlez comme Corbeil. »",
    "Ce n'est pas dit méchamment. C'est dit avec une lassitude qui a huit mois d'ancienneté.",
    "« Il met ce ton-là pour m'annoncer les choses désagréables. Depuis huit mois, quand j'entends ce ton, je sais qu'on a décidé quelque chose sans moi et qu'on vient me le présenter joliment. »",
    "§ Elle se penche et redresse la lanterne d'un cran, ce qui éclaire le grenier autrement et met fin à la conversation.",
    "^« Parlez-moi comme à la femme qui a fixé les termes. C'était moi. Il y a onze jours. Dans une cour de roulage. »",
  ],
  suite:'ar_nuit_ensemble',
},

ar_nuit_ensemble:{
  qui:'maelys',
  texte:[
    "C'est elle qui couche la lanterne sur le flanc, ce qui ne l'éteint pas mais renvoie toute la lumière contre une poutre.",
    "Elle a vingt ans et elle n'a pas l'expérience qu'elle laisse croire à la cour de roulage ; elle a en revanche une résolution que très peu de gens de trente ont, et il se trouve que dans cette pièce c'est la résolution qui compte.",
    "Le premier geste est à elle. Il est maladroit et il est assumé, et elle ne s'excuse pas, ce qui est la seule chose qui rende un geste maladroit supportable.",
    "Vous avez le noir de fond dans les ongles tous les deux. Elle le remarque avant vous, et c'est la première fois de la soirée qu'elle a l'air d'avoir vingt ans.",
    { sobre:"L'écurie chauffe par le plancher jusqu'au petit matin.",
      intense:"Elle dit quand commencer et elle dit quand s'arrêter, les deux, comme elle l'avait annoncé, et elle s'arrête une fois au milieu pour rire de quelque chose qu'elle ne raconte pas.\n\nEn dessous, huit chevaux bougent dans la paille toute la nuit, et le plancher renvoie leur chaleur jusqu'au petit matin.",
      extreme:"Elle dit quand commencer et elle dit quand s'arrêter, les deux, exactement comme elle l'avait annoncé — et elle s'arrête une fois au milieu, pour rire d'une chose qu'elle refuse de raconter et qu'elle emportera en Floréal.\n\nIl n'y a rien de tragique là-dedans et rien de triomphal. Il y a une femme de vingt ans qui décide d'une chose, entièrement, dans un grenier à fourrage, onze semaines avant qu'on ne décide de tout le reste à sa place.\n\nEn dessous, huit chevaux bougent dans la paille. Le plancher renvoie leur chaleur jusqu'au petit matin." },
  ],
  suite:'ar_nuit_matin',
},

ar_nuit_ellipse:{
  qui:'maelys',
  texte:[
    () => a('ar_nuit_refusee')
      ? "Vous restez. L'écurie met quatre heures à se refroidir et ils parlent pendant les quatre heures."
      : "@« On peut rester là et parler. La coutume n'oblige personne à autre chose que ce que les deux veulent. »",
    () => a('ar_nuit_refusee') ? "" : "« D'accord », dit-elle, et le mot sort trop vite pour être tout à fait indifférent.",
    "Elle parle de son frère — pas du garçon qu'on est allé chercher, de celui qui avait onze ans et qui lui faisait réciter les tables de tonnage en riant.",
    "Elle parle du contrat de mariage, qu'elle a lu en entier, deux fois, y compris les clauses de reprise de dot, ce qu'aucune des femmes de cette maison n'avait jamais fait avant elle.",
    { sobre:"Elle parle de la province où elle part et qu'elle ne connaît pas.",
      intense:"Elle parle de la province où elle part, qu'elle ne connaît pas, dont elle a fait recopier la carte et les trois routes principales, et où elle a déjà décidé de quoi elle s'occuperait : les comptes, puisque c'est ce qu'elle sait faire et que personne ne le lui refusera.",
      extreme:"Elle parle de la province où elle part et qu'elle ne connaît pas. Elle en a fait recopier la carte par un clerc, avec les trois routes principales et les distances, et elle l'a apprise. Elle a même décidé de quoi elle s'occuperait là-bas : les comptes — parce que c'est ce qu'elle sait faire, parce que personne ne le lui refusera, et parce qu'une femme qui tient les comptes d'une maison finit toujours par en tenir autre chose." },
    "§ Et de Karlsberg, à un moment, parce qu'elle demande et qu'elle demande bien.",
    "Elle ne demande pas si c'est vrai. Elle demande combien de personnes vivaient dans la vallée, ce qui est une tout autre question et une bien meilleure.",
  ],
  effets:{ flags:['ar_nuit_ellipse', 'ar_maelys_estime'],
           marque:"La coutume n'a pas été tenue à Arquenay. Elle a demandé combien de personnes vivaient dans la vallée.",
           court:"Rien, et tout" },
  suite:'ar_nuit_matin',
},

ar_nuit_matin:{
  lieu:"Arquenay · la cour de roulage · à l'aube",
  qui:'maelys',
  texte:[
    "Elle descend l'échelle la première et elle est déjà en tenue de cour de roulage quand vous arrivez en bas : robe sombre, cheveux noués serré, le registre sous le bras. Personne dans cette maison ne saura jamais qu'elle a passé une nuit ailleurs que dans son lit.",
    a('ar_nuit_ellipse') || a('ar_nuit_refusee')
      ? "« On ne dira rien à personne, dans les deux sens. Ce qui n'a pas eu lieu ne regarde pas Corbeil non plus. »"
      : "« On ne dira rien à personne. Pas par honte : parce que ça ne les regarde pas, et que c'est exactement ce que veut dire *décider*. »",
    "Elle sort de son registre une feuille pliée en quatre — pas celle des deux colonnes, une autre — et vous la tend sans commentaire.",
    { sobre:"C'est une liste de quatorze noms.",
      intense:"C'est une liste de quatorze noms, écrits de sa main, avec en regard de chacun un lieu et une date. Aucun ne figure au rôle de la compagnie.",
      extreme:"C'est une liste de quatorze noms, de sa main, avec en regard de chacun un lieu et une date — et pour onze d'entre eux, une seconde ligne plus courte, un nom de femme et un nom de village.\n\nAucun des quatorze ne figure au rôle de la compagnie d'Arquenay. C'est tout le problème, et c'est pour ça qu'elle a mis onze nuits à l'écrire." },
    "§ « Les quatorze sans nom du fond. Je les ai fait nommer. Il m'a fallu onze jours, trois mineurs qui ont accepté de parler et une bouteille par mineur. »",
    "^« Je pars en Floréal et je ne pourrai rien en faire là-bas. Vous, vous descendez vers le sud. Faites-en ce que vous voudrez, ou n'en faites rien — mais maintenant ils ont des noms, et ça, on ne peut plus le défaire. »",
  ],
  effets:{ flags:['ar_nuit_faite', 'ar_quatorze_nommes'],
           marque:"Maëlys a fait nommer les quatorze du fond. Onze jours, trois mineurs, une bouteille chacun.",
           court:"Quatorze noms" },
  suite:'entre_saisons', libelleSuite:"Reprendre la route",
},

/* ══════════════════════════════════════════════════════════════════════════
 * ISELLE DE VAUCLAIR — l'auberge du bourg, où tout le monde verra
 *
 * Vingt-neuf ans, veuve, quatre ans de colonnes dans une malle, et un départ
 * organisé pour Messidor. Elle a dit oui pour qu'Aymar ait un motif de la
 * chasser plus vite. Elle est la seule des trois à vouloir des témoins, et
 * la scène doit le prendre au sérieux : le public est le but.
 * ══════════════════════════════════════════════════════════════════════════ */

va_nuit:{
  lieu:"Le bourg de Vauclair · l'auberge · à la vue de tout le monde",
  titre:"Là où tout le monde verra",
  qui:'iselle',
  texte:[
    "Elle a retenu la chambre elle-même, sous son nom, à midi, devant la femme de l'aubergiste et devant deux charretiers. Elle a payé d'avance et elle a demandé un reçu.",
    { sobre:"Elle dîne en bas, à la table du milieu.",
      intense:"Elle dîne en bas, à la table du milieu, celle qu'on voit de la porte et des deux fenêtres. Elle porte du gris de veuve, elle mange lentement, et elle salue par son nom chaque personne du bourg qui entre.",
      extreme:"Elle dîne en bas, à la table du milieu — celle qu'on voit de la porte, des deux fenêtres et de l'escalier. Elle porte le gris de veuve, ce qui est un choix ; elle mange lentement, ce qui en est un autre ; et elle salue par son nom, à voix nette, chaque personne du bourg qui pousse la porte.\n\nEn trois heures, onze personnes l'ont vue. Elle les a comptées. Elle vous dira le chiffre plus tard, sans en faire d'histoire, comme on rend un état de dépenses." },
    () => a('va_trois')
      ? "« Ils ont pendu les trois. Bertran a signé, et ils l'ont pendu avec sa signature encore fraîche sur la déposition. Vous étiez là. Moi aussi : depuis la fenêtre du cabinet, parce que quelqu'un doit regarder. »"
      : a('va_deux')
      ? "« Ils en ont pendu deux sans les entendre. Personne n'a signé, personne n'a rien lu, et ça s'est fait en une demi-heure. »"
      : a('va_tenanciers') || a('va_greffe')
      ? "« Quatre-vingts personnes sont au rôle du bailliage depuis hier matin. Avec la cote et la date. Aymar l'a appris à midi et il n'a rien dit du tout, ce qui chez lui est un hurlement. »"
      : "« C'est fini, et personne dans cette maison n'a l'intention de me dire comment. »",
    "§ « Je monte dans un moment. Vous montez un quart d'heure après moi — pas plus, parce que l'intérêt est qu'on le remarque, et pas moins, parce que j'ai encore un peu de dignité et que ça me regarde. »",
  ],
  choix:[
    { t:"« Vous n'avez pas besoin de moi pour ça. »",
      detail:"Elle veut un motif · lui proposer de le fabriquer sans le payer",
      risque:"sûr", va:'va_nuit_sortie' },
    { t:"Lui demander si le calcul est bon",
      detail:"Intellect — elle tient des colonnes, on peut lui parler en colonnes",
      risque:"favorable",
      test:{ carac:'intellect', comp:'lettres', dc:11, manoeuvre:'calcul' },
      degres:{ dominante:'va_nuit_calcul', nette:'va_nuit_calcul',
               couteuse:'va_nuit_calcul_ko', echec:'va_nuit_calcul_ko' } },
    { t:"Monter un quart d'heure après elle",
      detail:"Elle a tout organisé, jusqu'à la durée du quart d'heure",
      va:'va_nuit_ensemble' },
    { t:"Monter, et passer la nuit à parler",
      detail:"L'ellipse · le bourg verra la même chose et ne saura pas la différence",
      va:'va_nuit_ellipse' },
  ],
},

va_nuit_sortie:{
  qui:'iselle',
  texte:[
    "@« Vous n'avez pas besoin de moi pour ça. Il suffit qu'on nous voie monter. »",
    "Elle repose sa cuiller, s'essuie la bouche, et vous regarde avec quelque chose qui ressemble beaucoup à de l'amusement.",
    "« Vous me proposez de mentir à un homme que je méprise pour m'épargner une nuit dont je n'ai pas dit qu'elle me coûtait. »",
    { sobre:"« C'est prévenant, et c'est à côté. »",
      intense:"« C'est prévenant. C'est aussi complètement à côté, et je vais vous dire pourquoi une fois.\n\nSi je monte avec vous en ayant menti, je pars de cette maison en ayant menti, et j'emporte ça dans la malle avec les quatre ans de colonnes. Ce n'est pas le genre de chose que je veux dans ma malle. »",
      extreme:"« C'est prévenant, et c'est complètement à côté. Je vais vous dire pourquoi une fois, et ensuite on montera ou on ne montera pas.\n\nJ'ai vingt-neuf ans. Je tiens les comptes d'un homme qui vient de disperser quatre-vingts personnes en les appelant une bande, et je les ai tenus jusqu'au bout, proprement, parce que c'était mon travail et que je n'ai pas d'autre métier.\n\nJe pars en Messidor avec une malle. Ce qu'il y a dedans, je le sais ligne par ligne. Si j'y mets un mensonge ce soir, je le saurai aussi, et lui, je ne pourrai pas le vendre. »" },
    "§ Elle se lève, et onze personnes dans cette salle la regardent se lever.",
    "^« Un quart d'heure. Si vous ne montez pas, je n'en penserai pas moins de vous — mais montez pour la bonne raison ou ne montez pas du tout. »",
  ],
  effets:{ flags:['va_nuit_offert_sortie', 'va_iselle_estime'],
           marque:"Vous lui avez proposé de faire semblant. Elle a refusé de mettre un mensonge dans sa malle.",
           court:"Pas de faux-semblant" },
  suite:'va_nuit_ensemble',
},

va_nuit_calcul:{
  qui:'iselle',
  texte:[
    "@« Est-ce que le calcul est bon ? Vous partez avec un motif. Qu'est-ce qu'il vous coûte ? »",
    "C'est la première question qu'on lui pose depuis des années à laquelle elle ait envie de répondre, et ça se voit à ce qu'elle pose sa cuiller avant de parler.",
    { sobre:"« Le motif me fait partir en Messidor au lieu de Vendémiaire. »",
      intense:"« Le motif me fait partir en Messidor au lieu de Vendémiaire. Quatre mois. À quatre mois près je pars avec la malle et sans la dot de veuve, parce qu'Aymar aura eu le temps de faire réviser l'acte par son notaire, qui est aussi le sien. Il l'a déjà fait pour sa propre mère. »",
      extreme:"« Le motif me fait partir en Messidor au lieu de Vendémiaire : quatre mois. Ce n'est pas du confort, c'est toute la question.\n\nÀ Vendémiaire, Aymar aura eu le temps de faire réviser l'acte de veuvage par son notaire — qui est aussi le sien, et qui l'a déjà fait pour sa propre mère il y a neuf ans. Je pars alors avec la malle et rien d'autre.\n\nÀ Messidor, je pars avec la malle, la dot, et quatre ans de colonnes que personne n'a relues. La différence entre les deux, ce sont onze cents couronnes et le droit de choisir où je m'arrête. »" },
    "Elle regarde la salle, brièvement, et revient à vous.",
    "§ « Alors oui : le calcul est bon. Il est même excellent, et vous êtes la première personne en quatre ans à me demander de le poser à voix haute. »",
    "^« Ce que ça me coûte, c'est de le devoir à quelqu'un. Je n'aime pas ça et je le fais quand même, ce qui est exactement ce que j'ai passé quatre ans à conseiller à des gens qui ne m'écoutaient pas. »",
  ],
  effets:{ flags:['va_nuit_calcul', 'va_iselle_estime', 'va_sait_dot'],
           marque:"Quatre mois de différence : la malle seule, ou la malle, la dot et quatre ans de colonnes.",
           court:"Le calcul" },
  suite:'va_nuit_ensemble',
},

va_nuit_calcul_ko:{
  qui:'iselle',
  texte:[
    "La question sort comme un reproche déguisé en arithmétique, ce qui est la seule manière de la poser qu'elle ne supportera pas.",
    "« Vous me demandez si je me vends à bon prix. »",
    "Elle n'élève pas la voix. Elle n'élève jamais la voix : c'est son métier de ne pas l'élever.",
    "« La réponse est oui, et vous le savez déjà, et vous avez posé la question pour que ce soit moi qui le dise. »",
    "§ Elle repousse son assiette de deux pouces, ce qui, chez elle, équivaut à quitter la table.",
    "^« Un quart d'heure. Et gardez vos calculs : les miens sont faits depuis Germinal, ils sont justes, et je ne les soumets à personne. »",
  ],
  suite:'va_nuit_ensemble',
},

va_nuit_ensemble:{
  qui:'iselle',
  texte:[
    "La chambre de l'auberge du bourg a un lit, une table, une fenêtre sur la place, et des cloisons de planches à travers lesquelles on entend très bien la salle d'en bas — ce qui, ce soir, fait partie du dispositif.",
    "Elle a défait ses cheveux et retiré le gris de veuve, et il reste une femme de vingt-neuf ans qui a passé la journée à organiser sa propre disgrâce avec l'application d'une colonne de chiffres.",
    "Le premier geste est à elle, précis, sans préambule, comme tout ce qu'elle fait.",
    "« Je vais vous dire une chose une fois, et ensuite je ne parlerai plus de la maison. »",
    "^« Je n'ai pas fait ça pour me venger d'Aymar. Je l'ai fait parce que c'est la seule pièce du jeu que je pouvais encore bouger, et parce qu'une femme qui ne bouge aucune pièce finit à la table de son beau-frère à cinquante ans, en gris, à corriger les additions de ses neveux. »",
    { sobre:"Puis elle cesse de parler de comptes.",
      intense:"Puis elle cesse de parler de comptes, ce qui ne lui était pas arrivé depuis la mort de son mari, et elle a l'air d'un peu se surprendre elle-même.\n\nElle ne demande rien qu'elle n'ait décidé de demander. Elle rit deux fois. En bas, la salle s'est tue une première fois quand vous êtes monté, et elle se tait une seconde fois plus tard, et Iselle de Vauclair entend les deux silences et ne s'en cache pas.",
      extreme:"Puis elle cesse de parler de comptes — ce qui ne lui était pas arrivé depuis la mort de son mari il y a six ans — et elle a l'air de s'en surprendre elle-même, brièvement, avant de décider que c'est très bien.\n\nElle ne demande rien qu'elle n'ait décidé de demander, et elle le demande dans les termes qu'elle veut. Elle rit deux fois, dont une longue.\n\nEn bas, la salle s'est tue une première fois quand vous êtes monté. Elle se tait une seconde fois plus tard. Iselle de Vauclair entend les deux silences, sait exactement ce qu'ils vaudront chez le notaire d'Aymar, et ne s'en cache pas une seconde — et c'est peut-être la chose la plus difficile de toute cette nuit à regarder en face." },
  ],
  suite:'va_nuit_matin',
},

va_nuit_ellipse:{
  qui:'iselle',
  texte:[
    "@« On monte, et on parle. Le bourg verra exactement la même chose. »",
    "« Le bourg verra exactement la même chose », répète-t-elle, et elle ne dit ni oui ni non — elle prend l'escalier.",
    "Dans la chambre, elle retire ses souliers, s'assied sur le lit contre le mur, et sort de sa manche un carnet qu'elle n'a montré à personne.",
    "« Puisqu'on parle, autant parler de quelque chose d'utile. »",
    { sobre:"Ce sont les colonnes du marais.",
      intense:"Ce sont les colonnes du marais : quatre ans de tourbe sortie de Sombreval, année par année, avec les tonnages déclarés et les tonnages réels. Les deux séries ne se ressemblent pas.",
      extreme:"Ce sont les colonnes du marais : quatre ans de tourbe sortie de Sombreval, année par année, avec en regard les tonnages déclarés au bailliage et les tonnages réellement chargés aux quais de Chastel.\n\nLes deux séries ne se ressemblent pas. Elles ne se ressemblent même pas de loin, et l'écart est régulier, ce qui est la signature d'une décision et non d'une négligence." },
    "Ils passent la nuit là-dessus, assis chacun à un bout du lit, avec une chandelle et un carnet entre eux, et la salle d'en bas raconte tout autre chose.",
    "§ « Vous voyez : ça aussi, ça se fait à deux. »",
  ],
  effets:{ flags:['va_nuit_ellipse', 'va_iselle_estime', 'va_colonnes_vues'],
           marque:"La coutume n'a pas été tenue à Vauclair. Elle a sorti quatre ans de colonnes à la place.",
           court:"Rien, et les colonnes" },
  suite:'va_nuit_matin',
},

va_nuit_matin:{
  lieu:"Le bourg de Vauclair · la place · au matin",
  qui:'iselle',
  texte:[
    "Elle descend la première, en gris, coiffée, à sept heures, et elle traverse la salle d'un bout à l'autre au lieu de sortir par la cour.",
    { sobre:"Elle salue l'aubergiste par son nom.",
      intense:"Elle salue l'aubergiste par son nom, le remercie pour la chambre, et demande si le reçu de la veille peut être daté du jour. Il peut. Il l'est.",
      extreme:"Elle salue l'aubergiste par son nom, le remercie pour la chambre d'une voix parfaitement posée, et demande si le reçu de la veille peut être daté du jour plutôt que de midi. Il peut. Il l'est, devant témoins, et elle le plie en quatre et le range dans sa manche avec le carnet.\n\nC'est une pièce. Elle vient de la fabriquer sous vos yeux et elle n'a même pas eu à mentir pour l'obtenir." },
    "Sur la place, elle vous tend la main comme on la tend à un associé, ce qui, à sept heures du matin dans un bourg de tourbe, est la chose la plus scandaleuse qu'elle puisse faire.",
    "« Aymar le saura avant midi. Sa sœur tient l'épicerie en face et elle n'a jamais su garder quoi que ce soit pendant six heures. »",
    a('va_nuit_ellipse')
      ? "^« Et il croira ce qu'il voudra, ce qui est précisément ce qu'on voulait tous les deux. »"
      : "^« Je vous dois quatre mois. Je ne les oublierai pas : je note tout, et j'ai déjà noté celui-là. »",
    "Puis elle sort de sa manche un feuillet — pas le carnet, une seule page recopiée à la main — et le pose dans la vôtre.",
    "§ « Les tonnages de Sombreval, déclarés et réels, sur quatre ans. Je n'en ferai rien : je pars, et une femme qui part avec une dot ne dépose pas de plainte contre la maison qui la lui verse. Vous, vous ne partez nulle part. »",
    "^« Ne me remerciez pas. Ce n'est pas un cadeau, c'est un transfert de compte : je le sors de ma malle et je le mets dans la vôtre, et à partir de maintenant c'est vous qui portez ce que ça pèse. »",
  ],
  effets:{ flags:['va_nuit_faite', 'va_colonnes_vues', 'va_tonnages'],
           marque:"Iselle vous a passé les tonnages de Sombreval, déclarés et réels, sur quatre ans.",
           court:"Les tonnages" },
  suite:'entre_saisons', libelleSuite:"Reprendre la route",
},

};

enregistrerScenes(COUTUME);
