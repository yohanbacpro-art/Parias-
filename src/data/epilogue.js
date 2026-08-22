/* PARIAS — Épilogue
 *
 * Ce que devient Vardhen quand Yohan repose la plume.
 *
 * L'épilogue n'est pas un texte : c'est un verdict, assemblé à partir de ce que
 * la partie a réellement fait. Chaque entrée porte une condition ; le moteur
 * (src/epilogue.js) retient la première qui tient dans les sections à verdict
 * unique, et toutes celles qui tiennent dans les sections cumulatives.
 *
 * Conditions reconnues :
 *   flags:[…]        tous ces marqueurs sont posés
 *   sansFlags:[…]    aucun de ces marqueurs
 *   unDes:[…]        au moins un de ces marqueurs
 *   affinite:{id:n}  lien au moins égal à n
 *   compagnon:'id'   ce compagnon est encore là
 *   tensionMax:{p:n} / tensionMin:{p:n}
 *   renomMin, suspicionMin, suspicionMax, armeeMin, niveauMin
 *   toujours:true    filet de sécurité — une section ne doit jamais rester vide
 *
 * L'ordre compte : le plus spécifique d'abord, le filet en dernier.
 */

/* ============================= OUVERTURE ============================= */
/* La toute dernière décision, celle qui donne son ton à tout le reste. */
const EPI_OUVERTURE = [
  { si:{flags:['voie_empire','fin_acte']}, titre:'Le nom rendu au monde',
    texte:`Il n'y eut pas de couronnement. Il y eut une signature, et des hommes qui la regardèrent
    sécher sans oser parler. Yohan de Karlsberg reprit un nom que l'Empire avait passé quarante ans à
    effacer, et l'Empire dut vivre avec. Ce n'était pas un pardon : c'était un fait, posé sur une table,
    trop lourd pour être retiré. Les scribes d'Astrah mirent trois ans à décider comment l'écrire.
    Ils finirent par l'écrire.` },
  { si:{flags:['voie_empire']}, titre:'Le nom rendu au monde',
    texte:`L'Empire ne rend rien. Il concède, quand il n'a plus le choix, et il appelle cela une
    faveur. Yohan accepta la faveur en sachant ce qu'elle valait. Karlsberg réapparut sur les
    registres, coincé entre deux domaines plus riches et une note en marge que personne n'effaça
    jamais. C'était peu. C'était infiniment plus que rien.` },
  { si:{flags:['voie_refuge','fin_acte']}, titre:'La maison ouverte',
    texte:`Il ne demanda rien à personne. Il ouvrit une porte, et ne la referma pas. Ceux qui vinrent
    les premiers étaient ceux qui n'avaient nulle part où aller — et c'est exactement pour eux que la
    porte avait été ouverte. On ne parla pas de royaume. On parla d'un endroit où l'on pouvait dormir
    sans compter les issues. En Vardhen, où l'on tue pour un titre, c'était une idée neuve.` },
  { si:{flags:['voie_refuge']}, titre:'La maison ouverte',
    texte:`Karlsberg ne redevint pas une maison noble. Elle devint une adresse — celle qu'on se donne
    à voix basse, quand on est traqué et qu'on cherche un toit. Aucun héraut n'annonça cela. Cela se
    sut quand même, comme se savent les choses qui comptent.` },
  { si:{flags:['voie_ordinaire']}, titre:"Ce qu'on refuse de devenir",
    texte:`Il aurait pu faire de son sang une bannière. Il en fit une chose privée, gardée, portée
    sans le dire. Les Parias n'eurent pas de roi cette année-là, et beaucoup lui en voulurent. Yohan
    supporta la rancune comme il avait supporté tout le reste : sans expliquer, sans se justifier,
    en continuant d'être là quand on avait besoin de quelqu'un qui ne fuit pas.` },
  { si:{flags:['fin_loup']}, titre:'Le loup au bout de la route',
    texte:`Ce ne fut pas une fin ; ce fut un arrêt. L'Onde avait fini de demander, et Yohan de
    répondre. Ce qui s'assit à la fin sur les ruines de Karlsberg avait le visage d'un homme et
    la patience de quelque chose de bien plus vieux. On ne raconte pas cette version aux enfants.` },
  { si:{toujours:true}, titre:'Ce qui reste',
    texte:`Yohan de Karlsberg vécut assez longtemps pour voir les conséquences de ses choix — ce qui,
    en Vardhen, tient déjà de la victoire. Il n'obtint pas de titre. Il n'obtint pas de pardon.
    Il obtint que son nom soit prononcé sans qu'on baisse la voix, et il jugea que cela suffisait.` },
];

/* ============================= LE NOM ============================= */
/* Ce que devient Karlsberg — le lieu, la maison, la bannière. */
const EPI_NOM = [
  { si:{flags:['karlsberg_independante']},
    texte:`Karlsberg ne releva d'aucune couronne. Ce n'était pas un royaume : trois villages, une
    route, des ruines relevées à la main. Mais nul n'y percevait l'impôt d'un autre, et cela, en
    Vardhen, se paie cher — chaque année, un peu.` },
  { si:{flags:['karlsberg_reconnue']},
    texte:`La maison de Karlsberg reparut dans l'armorial impérial, à la dernière page, dans une
    encre plus fraîche que les autres. Les vieilles familles trouvèrent la chose de mauvais goût.
    Elles s'y firent, comme on se fait à une cicatrice.` },
  { si:{flags:['acte_fondation']},
    texte:`Sur les ruines, on posa une pierre gravée qui ne portait pas de blason — seulement une
    date et un mot. Les voyageurs demandaient ce que le mot voulait dire. Les gens du lieu
    répondaient qu'ils le sauraient en restant.` },
  { si:{flags:['banniere_haute']},
    texte:`La bannière levée trop haut fit ce que font les bannières : elle attira les regards, et
    tout ce qui vient avec. Karlsberg fut connue avant d'être prête. Elle survécut de justesse à sa
    propre réputation.` },
  { si:{flags:['banniere_sceau']},
    texte:`Le sceau discret valut mieux qu'une bannière. On sut ce qu'il fallait savoir, et pas
    davantage — l'art le plus difficile qui soit quand on tient à ce qu'on protège.` },
  { si:{flags:['refus_banniere']},
    texte:`Il n'y eut jamais de bannière. Ceux qui suivirent Yohan suivirent un homme, pas un
    étendard — plus fragile, plus vrai, et impossible à hériter.` },
  { si:{toujours:true},
    texte:`Les ruines de Karlsberg restèrent des ruines, mais habitées. C'est une différence que
    seuls comprennent ceux qui ont dormi dedans.` },
];

/* ============================= LES PEUPLES ============================= */
/* Un verdict par peuple : d'abord ce que la partie a explicitement décidé,
 * ensuite l'état où la simulation du monde les a laissés. */
const EPI_PEUPLES = {
  humains: { nom:'L\'Empire d\'Astrah', verdicts:[
    { si:{reputationMax:{humains:-55}},
      texte:`Astrah fit de lui un cas d'école. Pendant quarante ans, on enseigna dans ses académies
      militaires comment on aurait dû traiter le problème Karlsberg, et chaque promotion arrivait à
      une conclusion différente.` },
    { si:{flags:['crise_parias_reglee'],  tensionMax:{humains:25}},
      texte:`Astrah cessa de chasser ce qu'elle ne comprenait pas — non par sagesse, mais parce que
      la chasse coûtait plus qu'elle ne rapportait. Les édits restèrent au mur. Personne ne les
      appliqua plus.` },
    { si:{tensionMax:{humains:20}},
      texte:`L'Empire garda sa forme et perdit son appétit. Les frontières tinrent, les impôts
      rentrèrent, et l'on cessa d'envoyer des hommes mourir pour des lignes sur une carte.` },
    { si:{tensionMin:{humains:65}},
      texte:`L'Empire entra dans le siècle des purges. Ce qui avait commencé par les Parias finit,
      comme toujours, par atteindre ceux qui les avaient dénoncés. Astrah se dévora par les bords.` },
    { si:{toujours:true},
      texte:`Astrah continua : lourde, lente, sûre d'elle. Les empires ne meurent pas de leurs
      erreurs, ils s'y installent.` },
  ]},
  parias: { nom:'Les Parias', verdicts:[
    { si:{flags:['sans_nom_leves','crise_parias_reglee']},
      texte:`Les Sans-Nom cessèrent d'être un mot d'injure. On les compta, on les nomma, on leur
      donna des terres que personne d'autre ne voulait — et ils en firent quelque chose, parce
      qu'ils n'avaient jamais eu le luxe de gâcher.` },
    { si:{flags:['reseau_parias']},
      texte:`Le réseau tint. Il n'eut jamais de nom, jamais de chef, jamais d'archive — c'est
      précisément pourquoi personne ne put le briser. On y passait de main en main, de grange en
      grange, jusqu'à un endroit sûr.` },
    { si:{flags:['sans_nom_caches']},
      texte:`Ceux qu'on avait cachés restèrent cachés. Ils vieillirent sans être inquiétés, et sans
      être libres. Yohan ne sut jamais s'il leur avait rendu service.` },
    { si:{flags:['cause_parias']},
      texte:`La cause survécut à celui qui l'avait portée, ce qui est la seule preuve qu'une cause
      valait quelque chose. Elle changea de mains, de méthodes, de visage. Elle ne s'éteignit pas.` },
    { si:{toujours:true},
      texte:`Les Parias restèrent ce qu'ils avaient toujours été : nombreux, dispersés, et
      indénombrables. On continua de nier leur existence dans les registres, et de leur acheter du
      grain en dehors.` },
  ]},
  khesh: { nom:'Les Khesh des Dunes', verdicts:[
    { si:{reputationMax:{khesh:-55}},
      texte:`Les Dunes gardèrent contre lui une dette de sang, et les Khesh ne remettent pas les
      dettes : ils les transmettent. Trois générations plus tard, un jeune homme du sud portait
      encore le nom de Karlsberg gravé à l'intérieur de son bouclier, du côté qu'on ne montre pas.` },
    { si:{flags:['khesh_unifies']},
      texte:`Les clans des Dunes n'avaient pas été unis depuis quatre générations. Ils le furent —
      brièvement, violemment, assez pour que le reste du monde s'en souvienne. Puis ils se
      redivisèrent, parce que c'est ainsi que vivent les Khesh, et que l'union n'était jamais le but.` },
    { si:{flags:['crise_khesh_reglee']},
      texte:`Le sable reprit ce qu'il devait reprendre, et pas davantage. Les puits changèrent de
      mains sans qu'on vide les villages. Pour les Dunes, c'est une paix.` },
    { si:{flags:['khesh_allie']},
      texte:`La dette khesh fut honorée jusqu'au bout, avec cette exactitude féroce qui déroute les
      hommes de l'Empire. On rendit à Yohan bien plus qu'il n'avait donné, et on ne lui laissa pas
      le choix d'accepter.` },
    { si:{flags:['khesh_seuls']},
      texte:`Les Khesh se passèrent de tout le monde, comme ils s'étaient toujours passés de tout le
      monde. Ils y perdirent des hommes et y gagnèrent ce à quoi ils tenaient : n'avoir rien à
      remercier.` },
    { si:{tensionMin:{khesh:60}},
      texte:`Les Dunes brûlèrent — le mot est faible pour ce qui s'y passa. Ce qui restait des clans
      remonta vers le nord, et le nord ne les attendait pas.` },
    { si:{toujours:true},
      texte:`Les Dunes gardèrent leur silence. Le sable ne dit jamais ce qu'il a recouvert.` },
  ]},
  elfes: { nom:'Eltharion', verdicts:[
    { si:{flags:['archive_publiee']},
      texte:`L'archive publiée fit à Eltharion ce que l'eau fait à la pierre : rien, longtemps, puis
      tout d'un coup. La Cour lumineuse dut répondre de quatre siècles de comptabilité soigneuse.
      Elle n'en mourut pas. Elle cessa d'être irréprochable, ce qui, pour elle, revient au même.` },
    { si:{flags:['archive_etouffee']},
      texte:`L'archive fut étouffée avec les égards dus aux choses gênantes. Eltharion continua de
      briller. Yohan garda ce qu'il savait, et cela lui pesa plus qu'il ne l'avait prévu.` },
    { si:{flags:['crise_elfes_reglee']},
      texte:`La Cour lumineuse consentit à voir ce qui poussait sous ses arbres. Ce fut lent, poli,
      et sincère à sa manière — les elfes ne changent pas d'avis, ils changent de siècle.` },
    { si:{tensionMin:{elfes:60}},
      texte:`Eltharion ferma ses routes. Les elfes ne firent pas la guerre : ils cessèrent
      simplement d'exister pour le reste du monde, ce qui est leur façon de la déclarer.` },
    { si:{toujours:true},
      texte:`Eltharion resta belle et fermée, occupée de sa propre lumière. On y parlait encore de
      Yohan trois cents ans plus tard, sans être tout à fait d'accord sur ce qu'il avait été.` },
  ]},
  elfes_noirs: { nom:'La Cour d\'Anarion', verdicts:[
    { si:{flags:['alliance_valombre']},
      texte:`Valombre paya ses dettes et en contracta d'autres, plus élégantes. Anarion appelait
      cela de la diplomatie. Ceux qui la subissaient avaient un autre mot.` },
    { si:{flags:['valombre_abandonnee']},
      texte:`Valombre s'effondra sur elle-même, sans un cri, comme s'effondrent les maisons trop
      longtemps vides. Anarion en tira les leçons qu'il voulut.` },
    { si:{flags:['anarion_curieux']},
      texte:`Anarion garda pour Yohan une curiosité de collectionneur — le pire regard qu'on puisse
      poser sur un homme, et le plus durable. Il ne lui voulut jamais de mal. Il ne lui laissa jamais
      la paix non plus.` },
    { si:{toujours:true},
      texte:`La Cour souterraine poursuivit ses affaires dans le noir, avec ce mélange de raffinement
      et de cruauté que le reste du monde préfère ignorer.` },
  ]},
  nains: { nom:'Kar-Durak', verdicts:[
    { si:{reputationMin:{nains:70}},
      texte:`Kar-Durak inscrivit Yohan de Karlsberg au registre des passages permanents — quatre
      hommes y figuraient avant lui en huit cents ans, et aucun n'était humain. La galerie qui porte
      sa marque est toujours ouverte.` },
    { si:{flags:['kardurak_sauve']},
      texte:`Kar-Durak tint. Les Grandes Portes se refermèrent sur une cité vivante, et les forges
      se rallumèrent une à une. Les nains inscrivirent le nom de Yohan dans la pierre, à l'endroit
      réservé aux dettes qu'on n'efface pas.` },
    { si:{flags:['kardurak_tombe']},
      texte:`Kar-Durak tomba. Ce qui restait des clans descendit vers le sud avec ce qu'il pouvait
      porter, et les Peaux-Vertes s'installèrent dans les forges. Le bruit des marteaux ne s'arrêta
      pas : il changea de mains.` },
    { si:{flags:['crise_nains_reglee']},
      texte:`La menace fut contenue aux abords des Profondeurs. Les nains n'appelèrent pas cela une
      victoire — ils appelèrent cela un répit, et se remirent à creuser.` },
    { si:{flags:['kardurak_dette']},
      texte:`La dette de Kar-Durak resta ouverte, ce qui, chez les nains, est une forme
      d'attachement. Ils envoyèrent chaque année de quoi la solder, et chaque année ils oublièrent
      d'en envoyer assez.` },
    { si:{toujours:true},
      texte:`Kar-Durak resta Kar-Durak : trop profonde pour être prise, trop lente pour se sauver
      elle-même.` },
  ]},
  peaux_vertes: { nom:'La Horde', verdicts:[
    { si:{flags:['horde_dispersee']},
      texte:`La Grande Horde se défit en une saison, comme se défont les hordes : par le haut. Ceux
      qui l'avaient rassemblée se disputèrent le droit de la commander, et il n'y eut bientôt plus
      rien à commander.` },
    { si:{flags:['crise_peaux_vertes_reglee']},
      texte:`Le flot fut brisé avant les Champs de Cendre. Les villages de l'est ne surent jamais
      ce qui les avait épargnés, et n'en remercièrent personne — ce qui est, au fond, la meilleure
      preuve que ça avait marché.` },
    { si:{flags:['grande_horde_passee']},
      texte:`La Horde passa. Elle passa sur tout. Il fallut deux générations pour que les Champs de
      Cendre méritent à nouveau leur nom au lieu de le mériter deux fois.` },
    { si:{tensionMin:{peaux_vertes:60}},
      texte:`Les tribus continuèrent de grossir dans les Profondeurs Vertes, patiemment, comme
      grossit une crue derrière un barrage que personne n'inspecte.` },
    { si:{toujours:true},
      texte:`Les Peaux-Vertes restèrent la chose que l'Empire promet chaque année de régler, et
      remet chaque année à l'année suivante.` },
  ]},
  hommes_betes: { nom:'Les Hommes-Bêtes', verdicts:[
    { si:{reputationMin:{hommes_betes:70}},
      texte:`La forêt le laissa passer jusqu'à la fin, et le laissa passer *seul*, ce qui ne s'était
      jamais vu. Aux Pierres, il y a un endroit où l'on empile trois cailloux quand un homme meurt.
      Il y en a trois, quelque part, pour lui.` },
    { si:{flags:['pierres_accordees']},
      texte:`Les Pierres du Premier Rugissement se turent — non parce qu'on les avait brisées, mais
      parce qu'on avait enfin écouté ce qu'elles disaient. Les hardes tinrent la Forêt des Mille
      Cornes et n'en sortirent plus. C'était tout ce qu'elles avaient jamais demandé.` },
    { si:{flags:['crise_hommes_betes_reglee']},
      texte:`La harde reflua vers la forêt sans qu'on ait eu besoin de la détruire. Les fermiers de
      la lisière trouvèrent cela suspect, puis commode, puis normal.` },
    { si:{flags:['hardes_installees']},
      texte:`Les hardes s'installèrent aux marges des terres humaines. On appela cela une invasion
      pendant dix ans, un voisinage pendant vingt, et plus rien du tout ensuite.` },
    { si:{tensionMin:{hommes_betes:60}},
      texte:`La forêt déborda. Ce qui en sortit n'était plus une harde mais une saison — quelque
      chose qu'on subit et qu'on attend de voir passer.` },
    { si:{toujours:true},
      texte:`La Forêt des Mille Cornes garda ses frontières mouvantes, et les cartographes
      continuèrent de mentir à leur sujet.` },
  ]},
};

/* ============================= LES GENS ============================= */
/* Cumulatif : chaque personne dont Yohan a croisé la route et laissé une trace. */
const EPI_GENS = [
  /* — Compagnes et liens — */
  { si:{compagnon:'alycia', affinite:{alycia:5}},
    texte:`<b>Alycia de Callensbourg</b> resta. Non par devoir, non par dette — elle avait passé sa
    vie à s'acquitter de dettes et savait reconnaître autre chose. Ils ne se marièrent pas. Ils
    partagèrent une maison, un feu, et le silence de ceux qui n'ont plus rien à se prouver.` },
  { si:{compagnon:'alycia', affinite:{alycia:3}},
    texte:`<b>Alycia</b> demeura la seule personne devant qui Yohan n'avait pas besoin de choisir
    ses mots. Ils ne mirent jamais de nom là-dessus. Ils n'en eurent pas besoin.` },
  { si:{compagnon:'alycia'},
    texte:`<b>Alycia</b> partit un matin sans prévenir, ce qui, de sa part, était une politesse.
    Elle laissa sa liste, complétée jusqu'à la dernière ligne, et rien d'autre.` },
  { si:{compagnon:'alarielle', affinite:{alarielle:5}},
    texte:`<b>Alarielle</b> ne rentra pas à Eltharion. La Cour lumineuse considéra cela comme une
    perte ; elle le considéra comme un choix, le premier qu'elle ait fait seule en trois siècles.` },
  { si:{compagnon:'alarielle', affinite:{alarielle:3}},
    texte:`<b>Alarielle</b> repartit vers les siens en promettant de revenir. Les elfes tiennent
    leurs promesses ; ils les tiennent seulement à leur échelle de temps.` },
  { si:{compagnon:'alarielle'},
    texte:`<b>Alarielle</b> rentra à Eltharion et fit un rapport exact, complet, et
    soigneusement vidé de tout ce qui comptait.` },
  { si:{flags:['alarielle_renvoyee']},
    texte:`<b>Alarielle</b>, renvoyée avant la fin, écrivit un jour une lettre qu'elle n'envoya pas.
    On la retrouva dans ses affaires, bien plus tard, et personne ne sut à qui elle était destinée.` },
  { si:{affinite:{eleonore:4}},
    texte:`<b>Éléonore</b> tint parole, ce qui surprit tout le monde sauf Yohan. Elle garda une
    porte ouverte à Astrah — une seule, discrète, dont elle ne parla jamais et qu'elle ne ferma
    jamais non plus.` },
  { si:{flags:['eleonore_alliee']},
    texte:`<b>Éléonore</b> resta une alliée à distance : de l'information, jamais de soutien
    public. Yohan apprit à ne pas lui en vouloir. Cela lui prit des années.` },
  /* — Les princes — */
  { si:{flags:['caleb_pacte']},
    texte:`<b>Caleb de Fort-aux-Princes</b> devint quelque chose qui ressemblait à un allié, sans
    jamais cesser de compter les points. Il mourut vieux, riche, et persuadé d'avoir gagné.` },
  { si:{flags:['caleb_respect']},
    texte:`<b>Caleb</b> ne pardonna pas d'avoir été battu, mais il cessa de le nier. C'était, chez
    lui, un sommet de générosité.` },
  { si:{flags:['caleb_hostile']},
    texte:`<b>Caleb</b> passa le reste de sa vie à nuire à Yohan par des voies détournées, avec une
    constance qui força l'admiration de leurs ennemis communs.` },
  { si:{flags:['lucius_brise']},
    texte:`<b>Lucius</b> perdit son armée et, avec elle, la seule chose qui le rendait supportable
    à ses propres yeux. On le retrouva des années plus tard, marchand de chevaux, correct en
    affaires.` },
  { si:{flags:['lucius_vainqueur']},
    texte:`<b>Lucius</b> gagna sa bataille, et l'Empire lui donna les terres promises. Il les
    administra bien. C'est peut-être le pire de l'histoire.` },
  { si:{flags:['tyrion_vaincu']},
    texte:`<b>Tyrion</b> régla sa dette dans le sang et la trouva enfin soldée. Il ne redemanda
    jamais rien à personne.` },
  { si:{flags:['tyrion_dette_soldee']},
    texte:`<b>Tyrion</b> paya ce qu'il devait, jusqu'au dernier sou et au dernier mot. Puis il
    disparut, et fit bien.` },
  { si:{flags:['khalvaene_epargne']},
    texte:`<b>Khalvaene</b>, épargné, tint sa parole de Khesh — c'est-à-dire absolument, et d'une
    façon que Yohan n'avait pas prévue.` },
  { si:{flags:['khalvaene_vaincu']},
    texte:`<b>Khalvaene</b> tomba dans les Dunes, et les Dunes firent ce qu'elles font de ceux qui
    tombent : elles les gardèrent.` },
  { si:{flags:['kemval_allie']},
    texte:`<b>Kemval</b> resta loyal jusqu'à un point que Yohan ne mérita pas toujours.` },
  { si:{flags:['trahi_kemval']},
    texte:`<b>Kemval</b> ne dit rien quand il comprit. C'est ce silence que Yohan revit le plus
    souvent, ensuite, les nuits où il ne dormait pas.` },
  { si:{flags:['charles_allie']},
    texte:`<b>Charles</b> mit son nom au bas d'un document qu'il n'aurait pas dû signer, et ne le
    regretta pas une seule fois. Il fut le seul.` },
  { si:{flags:['gorm_ami']},
    texte:`<b>Gorm</b> continua de descendre là où personne ne descend, et de remonter avec des
    choses que personne ne voulait voir. Il envoya de la bière à Karlsberg chaque hiver.` },
  { si:{flags:['vauclair_neutralisee']},
    texte:`<b>La maison Vauclair</b> perdit son crédit, ses comptes et sa clientèle — dans cet
    ordre, et sans qu'aucun coup ne soit porté.` },
  { si:{flags:['vauclair_apaisee']},
    texte:`<b>La maison Vauclair</b> et Karlsberg finirent par commercer. L'argent n'a pas de
    mémoire ; les hommes qui le manient en ont, mais moins qu'ils ne le prétendent.` },
  { si:{flags:['vauclair_rancune']},
    texte:`<b>La maison Vauclair</b> garda sa rancune, l'entretint, la transmit. Trois générations
    plus tard on haïssait encore le nom de Karlsberg sans très bien savoir pourquoi.` },
  { si:{flags:['enfant_sauvee']},
    texte:`<b>L'enfant des Champs de Cendre</b> grandit. Elle ne sut jamais qui l'avait tirée de là,
    et raconta toute sa vie qu'un loup l'avait portée jusqu'à la route.` },
];

/* ============================= CELUI QUI SUIVAIT ============================= */
/* Le fil du Livré. Il n'apparaît que si Yohan a su qu'il existait. */
const EPI_NEMESIS = [
  { si:{flags:['nemesis_nomme']},
    texte:`<b>L'homme sans nom</b> en reçut un, dans une carrière, d'un homme qui n'avait aucune
    raison de lui en donner. Ce fut la seule chose que Yohan lui prit, et la seule qu'il lui
    laissa. On dit qu'il enseigna, ensuite, dans une province de l'est — à respirer contre l'Onde,
    et à durer. Personne n'a jamais retrouvé son cahier.` },
  { si:{flags:['nemesis_pacte']},
    texte:`<b>L'homme sans nom</b> tint son délai. Il ne reparut plus devant les gens de Karlsberg,
    et continua son compte ailleurs, méthodiquement, jusqu'à un chiffre que personne ne connaît.
    Ce n'était pas une paix. Cela en eut la durée.` },
  { si:{flags:['nemesis_brise']},
    texte:`<b>L'homme sans nom</b> perdut son cahier, et avec lui la seule chose qui reliait
    quatre-vingt-onze personnes à l'idée qu'elles avaient existé. Il recommença. On recommence
    toujours. Mais il recommença de zéro, et il n'avait plus l'âge.` },
  { si:{flags:['nemesis_tue']},
    texte:`<b>L'homme sans nom</b> mourut sans nom, ce qui était exactement son projet, et Yohan
    n'eut jamais personne à qui dire ce qu'il avait fait ce jour-là. On ne raconte pas la mort de
    quelqu'un qu'on ne peut pas nommer. La chose resta entre lui et une carrière vide.` },
  { si:{flags:['nemesis_libre']},
    texte:`<b>L'homme sans nom</b> ne fut jamais arrêté. Il laissa Yohan vivre — c'était son
    argument, et il ne le retira pas. Quelque part, un cahier continua de se remplir, et une ligne
    y resta ouverte au nom de Karlsberg pendant tout le reste du siècle.` },
  { si:{flags:['lfa_vu']},
    texte:`<b>L'homme sans nom</b> disparut des routes sans que rien ne se conclue. Yohan ne sut
    jamais s'il avait renoncé, changé de province, ou simplement fini par se compter lui-même.` },
  { si:{flags:['lfa_connu']},
    texte:`Trois lettres poursuivirent Yohan jusqu'au bout : <b>L.F.A.</b> Il ne rencontra jamais
    l'homme qui les portait, et passa le reste de sa vie à ne pas savoir de qui il s'était méfié.` },
];

/* ============================= L'ONDE ============================= */
/* Le fil qui court sous toute la chronique : ce qui suivait Yohan. */
const EPI_ONDE = [
  { si:{flags:['nomme_par_onde','cycle_compris']},
    texte:`Il connut le nom, et il connut le cycle. Savoir les deux ne l'arrêta pas — cela lui donna
    seulement le choix du moment. C'est peu. C'est tout ce que le sang Paria a jamais accordé à
    personne.` },
  { si:{flags:['cycle_compris']},
    texte:`Il avait compris le cycle : ce qui prend, ce qui rend, et ce qui ne rend jamais. La
    compréhension ne guérit rien. Elle permet de tenir les comptes, et de savoir quand on est en
    train de perdre.` },
  { si:{flags:['nomme_par_onde']},
    texte:`L'Onde l'avait nommé, une fois, et n'eut plus jamais besoin de recommencer. Il y a des
    choses qu'on n'entend qu'une fois.` },
  { si:{flags:['verite_cicatrice']},
    texte:`Ce qu'il vit à la Cicatrice, il ne le raconta à personne — pas par secret, mais parce
    qu'aucune des langues de Vardhen n'a de mot pour cela.` },
  { si:{flags:['prix_noble_accepte']},
    texte:`Le prix fut payé. Il ne fut jamais question de le regretter : on ne regrette pas ce
    qu'on a choisi les yeux ouverts. On le porte.` },
  { si:{flags:['onde_suivait']},
    texte:`Ce qui suivait Yohan continua de suivre. Simplement, à la fin, il ne se retournait plus.` },
  { si:{toujours:true},
    texte:`L'Onde ne le lâcha pas. Elle ne lâche personne. Elle attendit, comme elle attend toujours,
    que le sang trouve un autre porteur.` },
];

/* ============================= LE LEGS ============================= */
/* Ce qu'une chronique achevée transmet à la suivante. Chaque palier est
 * atteint par un exploit précis : rien n'est offert. */
const EPI_LEGS = [
  { id:'nom_grave',  nom:'Un nom gravé',
    si:{unDes:['karlsberg_independante','karlsberg_reconnue','acte_fondation']},
    effet:{or:150},
    texte:`La prochaine chronique commence avec 150 pièces d'or — ce qu'un nom reconnu vaut, en
    crédit, chez les marchands qui s'en souviennent.` },
  { id:'renom_arme', nom:'Une réputation d\'armes',
    si:{renomMin:30},
    effet:{renom:10},
    texte:`Les capitaines se rappellent des bannières. Le prochain Karlsberg lèvera ses troupes avec
    10 points de Renom d'avance.` },
  { id:'sang_su',    nom:'Le sang su',
    si:{flags:['cycle_compris']},
    effet:{talentPoints:1},
    texte:`Ce qu'un porteur a compris du cycle ne se reperd pas entièrement. Un point de talent
    supplémentaire au départ.` },
  { id:'route_sure', nom:'Des routes sûres',
    si:{unDes:['route_grise_liberee','cote_liberee','defile_tenu','cendre_tenue']},
    effet:{or:80},
    texte:`Les routes tenues restent tenues un moment. 80 pièces d'or d'avance, et des chemins qui
    ne réclament pas de péage.` },
  { id:'sillage_su', nom:'Le sillage connu',
    si:{unDes:['lfa_copie','nemesis_nomme','nemesis_brise','nemesis_tue']},
    effet:{renom:5, or:60},
    texte:`Ce qu'un chasseur avait mis vingt ans à écrire ne se reperd pas : on sait désormais
    comment on traque un porteur de l'Onde, donc comment on ne l'est pas. 5 de Renom et 60 pièces
    d'avance, et des routes qu'on sait prendre.` },
  { id:'main_tendue', nom:'Une main tendue',
    si:{unDes:['reseau_parias','sans_nom_leves','crise_parias_reglee']},
    effet:{talentPoints:1},
    texte:`Ceux qu'on a sortis de l'ombre se souviennent de la main. Un point de talent
    supplémentaire, et des portes qui s'ouvrent sans qu'on frappe.` },
];
