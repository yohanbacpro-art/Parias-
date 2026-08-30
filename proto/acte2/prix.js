/* PARIAS — LE PRIX DU PARIA
 * ═══════════════════════════════════════════════════════════════════════
 * La coutume n'a jamais été abrogée parce que personne n'a jamais voulu
 * l'écrire noir sur blanc : une maison noble qui emploie un Paria lui doit
 * l'Or et le Sang. Des pièces comptant, et une femme de son rang.
 *
 * C'est une humiliation, et c'est fait pour : on n'appelle pas un Paria de
 * gaieté de cœur, et la coutume existe pour que ça se sache.
 *
 * COMMENT ÇA MARCHE, ET CE QUE ÇA N'EST PAS :
 *
 *   — LES TERMES SE FIXENT AVANT TOUTE ACTION, entre Yohan et le chef de
 *     maison. Or seul · le Sang seul · les deux · refuser. C'est un contrat
 *     entre deux hommes qui parlent d'une troisième personne comme d'une
 *     ligne, et le jeu ne fait rien pour rendre ça élégant.
 *   — ELLE N'EST PAS À LA TABLE. On ne marchande pas avec elle : ce n'est
 *     pas son rôle dans ce monde-là et prétendre le contraire serait une
 *     politesse moderne. Elle vient après, on lui a dit, et elle décide.
 *   — ELLE DÉCIDE. Pour le pouvoir — un enfant qui porte l'Onde est le seul
 *     actif qu'une maison qui s'éteint puisse encore produire — ou par
 *     désir, ce qui se dit sans décoration. Ou elle refuse, et alors
 *     l'option n'existe simplement pas, avec la raison écrite en clair.
 *
 * Rien n'est automatique ensuite. Pas de grossesse de scénario, pas
 * d'amour, pas de dette. Ce qui suit suit le monde vivant.
 * ═══════════════════════════════════════════════════════════════════════ */

const PRIX = () => (A2().prix = A2().prix || { termes:null, dame:null, liaisons:[] });

/* Les maisons qui doivent, et qui a quelque chose à y perdre. */
const DAMES = {
  sibylle: {
    id:'sibylle', nom:"Dame Sibylle de Verneuil", age:29,
    maison:"Verneuil", quoi:"veuve · elle tient les comptes depuis quatre ans",
    mobile:'pouvoir',
    si:() => true,
  },
  alix: {
    id:'alix', nom:"Dame Alix de Bragelonne", age:24,
    maison:"Bragelonne", quoi:"cadette · elle n'a rien à administrer et elle le sait",
    mobile:'desir',
    si:() => ETAT.renom >= 45,
  },
  hersende: {
    id:'hersende', nom:"Dame Hersende de Chastel-Bas", age:34,
    maison:"Chastel-Bas", quoi:"elle a un fils de neuf ans et une position",
    mobile:'refus',
    si:() => true,
  },
};

const dameDuJour = () => {
  const A2p = PRIX();
  if(A2p.dame) return DAMES[A2p.dame];
  /* Qui la maison propose dépend de la maison, pas d'un dé : une maison qui
   * s'éteint envoie celle qui a un calcul, une maison qui va bien envoie
   * celle qui a envie, et certaines n'envoient personne. */
  const id = a('a2_bannieres') || ETAT.renom >= 60 ? 'alix'
           : (a('px_refuse_une') ? 'hersende' : 'sibylle');
  A2p.dame = id;
  return DAMES[id];
};

const PRIX_SCENES = {

/* ══ LES TERMES ═══════════════════════════════════════════════════════════ */
px_termes:{
  qui:'verneuil',
  lieu:() => `${LIEUX[A2().lieu].nom} · le cabinet · ${dateA2()}`,
  titre:"L'Or et le Sang",
  texte:[
    "Sire Gaucher de Verneuil a soixante et un ans, une maison de quatre fermes, et un problème qu'il ne peut pas régler avec ses propres hommes.",
    { sobre:"Il en vient au Prix sans qu'on ait besoin de le nommer.",
      intense:"Il en vient au Prix lui-même, tout de suite, avant même de dire ce qu'il veut — parce qu'un chef de maison qui laisse un Paria aborder le sujet le premier a déjà perdu la conversation.",
      extreme:"Il en vient au Prix lui-même, immédiatement, avant même d'avoir dit ce qu'il attend de vous. C'est la manœuvre habituelle et elle est bonne : un chef de maison qui laisse un Paria aborder le sujet le premier a déjà perdu la conversation, et il l'a apprise à ses dépens il y a trente ans. Il pose donc la chose sur la table comme on pose une pièce comptable, avec une exactitude qui est sa seule façon de rester digne." },
    "« La coutume est ce qu'elle est. Ma maison vous doit l'Or et le Sang. »",
    "§ Il ne s'excuse pas. Il ne s'indigne pas non plus. Il constate une dette.",
    { sobre:"« Vous choisissez, et vous choisissez maintenant. »",
      intense:"« Vous choisissez maintenant, avant de savoir ce que je vais vous demander de faire, et une fois choisi ça ne se rediscute pas. C'est la coutume et elle est ainsi faite pour que personne ne puisse marchander en cours de route. »",
      extreme:"« Vous choisissez maintenant. Avant de savoir ce que je vais vous demander, avant de connaître la difficulté, avant de voir les lieux — et une fois choisi, ça ne se rediscute plus. C'est la coutume et elle est faite exactement comme ça pour une raison : afin que personne, ni vous ni moi, ne puisse marchander en cours de route en fonction de ce que ça devient. On paie ce qu'on a dit qu'on paierait. »" },
    "« Et le Sang, concrètement. »",
    "« Une femme de mon rang, majeure, qui accepte. »",
    "« Qui accepte de quoi ? »",
    { sobre:"« Vous savez très bien de quoi. »",
      intense:"« Vous savez très bien de quoi, messire, et je ne vais pas le dire à voix haute dans mon propre cabinet. » Il pose les mains à plat. « Elle acceptera ou elle n'acceptera pas. Ça, je ne le décide pas — et si vous croyez que je le décide, vous n'avez jamais mis les pieds dans une maison noble. »",
      extreme:"« Vous savez très bien de quoi, messire, et je ne vais pas le formuler à voix haute dans mon propre cabinet, à mon âge. » Il pose les deux mains à plat sur la table. « Ce que je peux faire, c'est le lui dire. Ce que je ne peux pas faire, c'est répondre à sa place. Et si vous croyez qu'un chef de maison décide de ça pour une femme adulte de sa parenté, vous n'avez jamais vécu dans une maison noble et vous vous faites une idée très romanesque de mon autorité. Je réponds de mes terres et de mes hommes. Pas de ça. »" },
    "§ Il attend. Quatre termes, et rien à négocier : c'est la coutume qui fixe, pas les hommes.",
  ],
  effets:{ flags:['px_termes'] },
  choix:[
    { t:"L'Or seul",
      detail:"la maison paie et respire · on vous prend pour un mercenaire, ce qui est un déguisement commode",
      risque:"prudent", definitif:true, va:'px_or' },

    { t:"Le Sang seul",
      detail:"renoncer à l'or · c'est le terme que les maisons craignent le plus, parce qu'il ne s'oublie pas",
      risque:"définitif", ferme:"Ferme : quatre cents couronnes, et la version commode",
      definitif:true, va:'px_sang' },

    { t:"Le Prix entier",
      detail:"l'Or et le Sang · la coutume dans sa forme complète, celle qu'on n'écrit nulle part",
      risque:"définitif", ferme:"Ferme : ce que les maisons humaines pensaient encore de vous",
      definitif:true, va:'px_entier' },

    { t:"Refuser le Prix",
      detail:"ne prendre que le contrat · aucun Paria n'a fait ça de mémoire d'homme",
      risque:"calculé", definitif:true, va:'px_refus' },
  ],
},

px_or:{
  qui:'verneuil',
  titre:"Quatre cents couronnes",
  texte:[
    "« L'or. »",
    { sobre:"Il ne montre rien. Il est soulagé.",
      intense:"Il ne montre rien du tout, et il est soulagé — ça se voit aux épaules, une demi-seconde, avant qu'il les remonte.",
      extreme:"Il ne montre absolument rien, et il est soulagé : ça se voit aux épaules, une demi-seconde, avant qu'il ne les remonte. Un vieil homme qui vient d'éviter d'avoir à porter une conversation à une femme de sa parenté, et qui préfère largement quatre cents couronnes à cette conversation-là." },
    "« Quatre cents. Cinq cents, si vous le faites avant la Saint-Aubin. »",
    "§ Il paie plus cher que le tarif et vous savez tous les deux pourquoi.",
    "En sortant, l'intendant vous glisse — pas par méchanceté, par métier : « Vous avez bien fait. On dira que vous êtes cher, ce qui est infiniment mieux que le reste. »",
    { sobre:"C'est un déguisement, et il est commode.",
      intense:"Un Paria qui prend l'or est un mercenaire cher. Un Paria qui prend le Sang est un Paria. C'est toute la différence et elle vaut des années de tranquillité.",
      extreme:"Un Paria qui prend l'or est, aux yeux de quatre provinces, un mercenaire cher — désagréable, utile, oubliable. Un Paria qui prend le Sang est un Paria, au sens plein, celui de la coutume et de la Purge, et ça ne s'oublie dans aucune maison pendant deux générations. C'est toute la différence entre les deux termes, elle n'a rien à voir avec l'argent, et elle vaut des années de tranquillité." },
  ],
  effets:{ or:400, flags:['px_or','a2_prix_or'],
           faire:() => { PRIX().termes = 'or'; ETAT.suspicion = Math.max(0, ETAT.suspicion - 4); },
           exploit:{ eclat:3, temoins:'quelques', quoi:"quatre cents couronnes, et rien d'autre" },
           marque:"Vous avez pris l'or seul. « On dira que vous êtes cher, ce qui est infiniment mieux que le reste. »",
           court:"Quatre cents" },
  suite:'a2_carte', libelleSuite:"La carte" },

px_sang:{
  qui:'verneuil',
  titre:"Sans l'or",
  texte:[
    "« Le Sang. Pas l'or. »",
    { sobre:"Il met un temps.",
      intense:"Il met un temps très long, et quand il répond sa voix a changé de registre.",
      extreme:"Il met un temps très long — assez pour qu'on entende le feu, la pendule et quelqu'un qui marche à l'étage — et quand il répond sa voix a changé de registre. Pas en colère. Plus bas, plus lent, comme un homme qui vient de comprendre qu'il ne traite pas avec ce qu'il croyait." },
    "« Vous renoncez à quatre cents couronnes. »",
    "« Oui. »",
    "« Personne ne fait ça. Les Parias prennent l'or. Ils prennent tous l'or, depuis trois cents ans, parce que l'or se dépense et que le reste s'écrit. »",
    "« Je sais. »",
    { sobre:"« Alors vous voulez qu'on le sache. »",
      intense:"« Alors vous ne voulez pas de l'argent : vous voulez qu'on sache. » Il se lève et va à la fenêtre. « C'est très intelligent et je vous déteste sincèrement pour ça. »",
      extreme:"« Alors vous ne voulez pas d'argent. Vous voulez qu'on sache. » Il se lève, va à la fenêtre, et reste dos à vous un moment. « Quatre cents couronnes s'oublient en un trimestre. Une maison qui a payé le Sang figure dans les conversations de trois provinces pendant vingt ans, et ses enfants l'entendent. C'est très intelligent, messire. Je vous déteste sincèrement pour ça, et je le dis sans hausser le ton parce que ça ne changerait rien. »" },
    "§ Il tire le cordon.",
    "« Je vais lui dire. Je vais lui dire exactement, sans arranger, parce que je ne suis pas un maquignon et que je réponds de cette maison. »",
    "« Et si elle refuse ? »",
    "« Alors vous n'aurez rien du tout, ni l'or ni le reste, et ce sera très bien fait pour vous. »",
  ],
  effets:{ flags:['px_sang','a2_prix_sang'],
           faire:() => { PRIX().termes = 'sang'; },
           marque:"Vous avez renoncé aux quatre cents couronnes. « Vous voulez qu'on sache. »",
           court:"Sans l'or" },
  suite:'px_elle', libelleSuite:"Il tire le cordon" },

px_entier:{
  qui:'verneuil',
  titre:"La coutume dans sa forme complète",
  texte:[
    "« Les deux. »",
    { sobre:"Il encaisse sans un mot.",
      intense:"Il encaisse sans un mot. Il note quelque chose. Ce qu'il note, c'est le montant, parce qu'un homme qui tient une maison note toujours le montant en premier — c'est la seule partie qu'il sait traiter.",
      extreme:"Il encaisse sans un mot, prend sa plume et note quelque chose. Ce qu'il note, c'est le montant : trois cent vingt couronnes, le tarif exact du Prix entier, moins le rabais coutumier. Un homme qui tient une maison depuis trente ans note toujours le montant en premier, parce que c'est la seule moitié de cette affaire qu'il sait traiter, et qu'il gagne quatre secondes avant d'avoir à penser à l'autre." },
    "« Trois cent vingt, et le reste. »",
    "« Le tarif est de quatre cents. »",
    "« Le tarif est de quatre cents pour l'or seul. » Il repose la plume. « Le Prix entier se compte autrement et il se compte à la baisse, messire, ce qui devrait vous renseigner sur ce que la coutume pense de vous et de moi. »",
    "§ C'est vrai, c'est humiliant pour tout le monde dans la pièce, et c'est écrit nulle part.",
    "Il tire le cordon.",
    { sobre:"« Je vais lui dire. »",
      intense:"« Je vais lui dire. » Un temps. « Vous savez ce que je déteste le plus dans cette coutume ? Ce n'est pas ce qu'elle me coûte. C'est que je vais devoir traverser un couloir. »",
      extreme:"« Je vais lui dire. » Il reste debout, la main sur le cordon, sans le lâcher. « Vous savez ce que je déteste le plus là-dedans, messire ? Ce n'est pas l'argent, l'argent n'est rien. Ce n'est même pas ce qu'on dira de ma maison, on dit toujours quelque chose. C'est que je vais devoir traverser un couloir, entrer dans une pièce, et dire une phrase à une femme de ma parenté que je connais depuis qu'elle a quatre ans. Trente pas. C'est ça, le Prix du Paria. Les trente pas. »" },
  ],
  effets:{ or:320, flags:['px_entier','a2_prix_entier'],
           faire:() => { PRIX().termes = 'entier'; },
           marque:"Le Prix entier. « C'est que je vais devoir traverser un couloir. Trente pas. »",
           court:"Trente pas" },
  suite:'px_elle', libelleSuite:"Trente pas" },

px_refus:{
  qui:'verneuil',
  titre:"Personne ne refuse le Prix",
  texte:[
    "« Rien. Ni l'un ni l'autre. Le contrat, et le tarif d'un homme d'armes ordinaire. »",
    { sobre:"Il ne comprend pas.",
      intense:"Il ne comprend pas, et il le dit — ce qui, chez un homme de soixante et un ans qui tient une maison, est rare au point d'être un aveu.",
      extreme:"Il ne comprend pas, et il le dit à voix haute, ce qui chez un homme de soixante et un ans qui tient une maison depuis trente ans est assez rare pour valoir un aveu. Il repose sa plume. Il vous regarde comme on regarde une pièce comptable qui ne tombe pas juste et dont on sait qu'elle finira par tomber juste, parce qu'elles tombent toujours juste." },
    "« Pourquoi ? »",
    "« Parce que la coutume existe pour humilier votre maison, et que je n'ai pas besoin de votre maison humiliée. »",
    "« Vous en avez besoin plus que vous ne croyez. La coutume est la seule chose de ce droit qui reconnaisse qu'un Paria existe. »",
    "§ Il a raison et c'est désagréable.",
    { sobre:"« Vous vous appauvrissez d'un droit. »",
      intense:"« Vous renoncez à un droit, messire, pas à un cadeau. Le jour où plus personne ne réclamera le Prix, plus personne ne devra rien à un Paria, et ce jour-là vous ne serez plus rien du tout dans ce droit-ci. »",
      extreme:"« Vous renoncez à un droit et pas à un cadeau, et c'est là que vous vous trompez. Le Prix du Paria est la seule ligne de tout le droit de ces quatre provinces qui reconnaisse qu'un Paria est quelqu'un — quelqu'un à qui une maison peut devoir quelque chose. Le jour où plus personne ne le réclamera, plus personne ne devra rien, et vous ne serez plus, juridiquement, qu'un homme sans nom qu'on emploie et qu'on paie. » Il se rassoit. « Vous croyez faire un geste. Vous êtes en train de laisser mourir votre seul article. »" },
    "Il paie deux cent cinquante, le tarif d'un homme d'armes ordinaire.",
    "Il vous fait raccompagner par la grande porte, ce qui n'était pas obligatoire, et il le fait exprès.",
  ],
  effets:{ or:250, flags:['px_refuse','a2_prix_refuse'],
           faire:() => { PRIX().termes = 'aucun'; ETAT.suspicion = Math.max(0, ETAT.suspicion - 6); },
           exploit:{ eclat:5, temoins:'quelques', quoi:"un Paria qui n'a pas réclamé son Prix" },
           marque:"Vous avez refusé le Prix. « Vous êtes en train de laisser mourir votre seul article. »",
           court:"Le seul article" },
  plusTard:"Le Prix est la seule ligne du droit qui reconnaisse qu'un Paria est quelqu'un. Vous venez d'en laisser tomber une.",
  suite:'a2_carte', libelleSuite:"La carte" },

/* ══ ELLE ═════════════════════════════════════════════════════════════════
 * Elle n'était pas à la table. On lui a dit. Elle vient, et elle décide —
 * pour ce que ça vaut, ou parce qu'elle en a envie. */
px_elle:{ dyn:true, texte:[], suite:'a2_carte' },

/* — Le calcul. Une maison qui s'éteint, et le seul actif qu'elle puisse
     encore produire. C'est froid, c'est explicite, et c'est elle qui le dit. */
px_sibylle:{
  qui:'sibylle',
  lieu:"Verneuil · la petite salle",
  titre:"Ce qu'un enfant vaut",
  texte:[
    "Dame Sibylle de Verneuil a vingt-neuf ans, un mari mort depuis quatre ans, et les comptes de la maison entre les mains depuis presque autant.",
    { sobre:"Elle entre seule et elle ferme la porte.",
      intense:"Elle entre seule, ferme la porte derrière elle, et s'assoit avant qu'on lui propose. Ce sont trois gestes et ils disent tout.",
      extreme:"Elle entre seule, ferme la porte derrière elle et s'assoit avant qu'on ne le lui propose. Ce sont trois gestes, ils prennent quatre secondes, et ils disent l'essentiel : personne ne l'accompagne, personne n'écoute, et elle n'est pas venue en quémandeuse. Son oncle a traversé son couloir de trente pas il y a une heure et demie. Elle a manifestement passé cette heure et demie à réfléchir." },
    "« Il me l'a dit. Il l'a très mal dit, le pauvre homme, mais il l'a dit entièrement. »",
    "« Vous n'êtes pas obligée. »",
    { sobre:"« Ne commencez pas par là. »",
      intense:"« Ne commencez pas par là. » Elle a un geste sec. « C'est la phrase que les hommes disent pour se mettre à l'aise, et elle met tout le monde mal. Je sais parfaitement ce que je ne suis pas obligée de faire. »",
      extreme:"« Ne commencez pas par là, s'il vous plaît. » Elle a un geste sec, presque agacé. « C'est la phrase que les hommes disent d'abord pour se mettre eux-mêmes à l'aise, et elle a l'effet exactement inverse : elle me met en position de vous rassurer. Je sais parfaitement ce que je ne suis pas obligée de faire. J'ai vingt-neuf ans, je tiens les comptes de cette maison depuis quatre ans, et je n'ai été obligée à rien depuis la mort de mon mari. C'est même à peu près la seule chose que sa mort m'ait apportée. »" },
    "§ Elle pose sur la table un feuillet plié qu'elle a apporté, et ce n'est pas une lettre : c'est un état.",
    "« Verneuil : quatre fermes, un moulin en indivision, cent quatre-vingts arpents dont quarante en friche. Trois adultes de mon sang, dont un vieillard. Aucun héritier mâle. »",
    "« Je ne vois pas ce que — »",
    "« Vous allez voir. »",
    { sobre:"« Une maison qui n'a rien produit un actif en trente ans. »",
      intense:"« En trente ans, cette maison n'a produit aucun actif. Pas un mariage utile, pas une charge, pas un droit. Elle décline exactement au rythme du siècle, ni plus vite ni moins vite, et dans deux générations il n'en restera qu'un nom sur un bail. »",
      extreme:"« En trente ans, cette maison n'a produit strictement aucun actif. Pas un mariage utile — j'ai été le dernier, et il est mort. Pas une charge, pas un droit de péage, pas une concession, pas une alliance. Elle décline exactement au rythme du siècle, ni plus vite ni moins vite que ses voisines, et dans deux générations il en restera un nom sur un bail de fermage que personne ne saura plus prononcer. Ce n'est pas un drame, messire. C'est une courbe, et je la tiens à jour tous les trimestres. »" },
    "Elle repousse le feuillet vers vous.",
    "« Et puis il y a vous. »",
    "§ Elle le dit sans une once de coquetterie, et c'est ça qui glace.",
    { sobre:"« Un enfant de vous porterait ce que vous portez. »",
      intense:"« Un enfant de vous porterait, selon toute probabilité, ce que vous portez. » Elle soutient votre regard. « Ne niez pas, ça nous ferait perdre une heure et je n'ai pas d'heure à perdre. Toute la province le suppose, et moi je fais des comptes, pas des suppositions. »",
      extreme:"« Un enfant de vous porterait, selon toute probabilité, ce que vous portez. » Elle soutient votre regard sans la moindre difficulté. « Ne le niez pas : ça nous ferait perdre une heure, et je n'ai pas d'heure à perdre. Toute la province le suppose depuis deux ans. La différence entre la province et moi, c'est que la province suppose et que moi je tiens des livres. J'ai relevé onze faits vérifiables sur vous en trois ans, dont quatre que vous croyez sans témoin. J'en ai tiré une conclusion, et je n'ai aucune envie de vous la lire à voix haute. »" },
    "« Vous voulez un enfant qui ait ça. »",
    { sobre:"« Je veux un actif. »",
      intense:"« Je veux un **actif**, messire, et c'est le mot que j'emploie dans ma tête depuis une heure et demie. » Elle ne baisse pas les yeux. « C'est laid. Dites-le si vous voulez, ça ne changera rien : c'est le seul que cette maison puisse encore produire, et il se trouve qu'il se produit comme ça. »",
      extreme:"« Je veux un actif. » Elle ne baisse pas les yeux une seconde. « C'est le mot que j'emploie dans ma tête depuis une heure et demie, et je vous l'offre tel quel plutôt que de vous servir autre chose de plus présentable. C'est laid. Vous pouvez le dire, ça ne changera rien du tout. Cette maison a quatre fermes et pas d'avenir ; un enfant qui porte ce que vous portez est la seule chose de valeur qu'elle soit encore en état de produire, et il se trouve — c'est ainsi, je n'ai pas dessiné le monde — qu'il se produit de cette façon-là et pas en signant un acte. »" },
    "§ « Et vous, dans tout ça ? » demandez-vous.",
    "Elle met du temps pour la première fois.",
    { sobre:"« Moi, ça fait quatre ans que personne ne me touche. »",
      intense:"« Moi ? » Elle a un demi-sourire qui n'est pas aimable. « Moi, j'ai vingt-neuf ans, je suis veuve depuis quatre ans, et pendant ces quatre ans il ne s'est absolument rien passé — parce qu'une veuve qui tient des comptes n'a droit à rien qui puisse se raconter. Alors non, ce n'est pas seulement un calcul, et j'aurais préféré que ça le soit. »",
      extreme:"« Moi ? » Elle a un demi-sourire qui n'a rien d'aimable, dirigé contre elle-même. « Moi, j'ai vingt-neuf ans. Je suis veuve depuis quatre ans d'un homme correct que je n'ai pas aimé et pour qui je n'ai jamais rien senti d'autre que de la patience. Pendant ces quatre années il ne s'est rigoureusement rien passé, parce qu'une veuve qui tient les comptes d'une maison n'a droit à rien qui puisse se raconter à trois lieues à la ronde. » Elle repose ses mains à plat sur la table. « Alors non, ce n'est pas uniquement un calcul, et j'aurais très sincèrement préféré que ça le soit — un calcul, je sais le défendre. Le reste, je vous le dis une fois et je ne le redirai jamais. »" },
    "« Vous m'avez vu quatre fois. »",
    "« Cinq. Et vous ne m'avez pas vue une seule, ce qui est la partie que je trouve la plus désagréable de toute cette histoire. »",
  ],
  choix:[
    { t:"Rester",
      detail:"elle a dit ce qu'elle voulait, dans ses termes · il n'y a rien à ajouter",
      risque:"définitif", definitif:true, va:'px_nuit' },

    { t:"« Et si l'enfant naît sans rien ? »",
      detail:"un sur trois · c'est le chiffre, et elle tient des livres",
      risque:"calculé", va:'px_un_sur_trois' },

    { t:"Partir",
      detail:"prendre l'or, ou rien du tout · et refermer la porte derrière soi",
      risque:"prudent", va:'px_partir' },
  ],
},

px_un_sur_trois:{
  qui:'sibylle',
  titre:"Un sur trois",
  texte:[
    "« Un enfant sur trois naît sans rien. C'est le chiffre. Vous tenez des livres : tenez celui-là aussi. »",
    { sobre:"Elle ne bronche pas.",
      intense:"Elle ne bronche pas une seconde, ce qui veut dire qu'elle avait le chiffre avant vous.",
      extreme:"Elle ne bronche pas une seule seconde, et vous comprenez avec un temps de retard désagréable qu'elle avait ce chiffre avant vous — qu'elle l'a peut-être depuis plus longtemps que vous, et qu'elle a passé son heure et demie à faire exactement le calcul que vous venez de lui proposer de faire." },
    "« Deux sur trois, alors », dit-elle. « C'est comme ça qu'on lit un chiffre quand on veut savoir s'il faut y aller. »",
    "« Et si c'est le troisième ? »",
    "« Alors j'aurai un enfant. » Elle hausse à peine les épaules. « Ce ne sera pas une catastrophe, messire, ce sera un enfant. Je le tiendrai comme je tiens le reste. »",
    "§ Elle ajoute, et c'est la seule chose de la soirée qui la fasse hésiter :",
    { sobre:"« Il ne portera pas votre nom. »",
      intense:"« Il portera Verneuil. Pas Karlsberg. » Elle vous regarde. « Vous n'aurez aucun droit dessus, aucun, et je vous préviens maintenant parce que les hommes découvrent ça trop tard et le prennent très mal. »",
      extreme:"« Il portera Verneuil. Pas Karlsberg. » Elle le dit fermement, et c'est manifestement la partie qu'elle a préparée. « Vous n'aurez aucun droit sur cet enfant. Aucun. Ni de le voir, ni de le nommer, ni de le reconnaître, ni de vous en occuper si l'idée vous prenait dans huit ans. C'est ainsi dans la coutume, c'est ainsi dans le droit, et je vous le dis maintenant plutôt que dans huit ans — parce que les hommes découvrent ça trop tard et le prennent très mal, et j'ai vu ce que ça fait à deux maisons de la vallée. »" },
    "« Et si je le voulais quand même ? »",
    "« Vous ne l'aurez pas. » Elle se lève. « Vous saurez qu'il existe. C'est plus que ce que beaucoup obtiennent et c'est déjà beaucoup trop pour ce que la coutume prévoit. »",
  ],
  effets:{ flags:['px_su_le_chiffre'],
           marque:"« Il portera Verneuil. Vous n'aurez aucun droit dessus. » Elle le dit avant, pas dans huit ans.",
           court:"Verneuil" },
  choix:[
    { t:"Rester",
      detail:"en sachant les deux chiffres et le nom qu'il portera",
      risque:"définitif", definitif:true, va:'px_nuit' },
    { t:"Partir",
      detail:"il y a des comptes qu'on ne veut pas tenir",
      risque:"prudent", va:'px_partir' },
  ],
},

px_nuit:{
  qui:'sibylle',
  lieu:"Verneuil · l'étage",
  titre:"La petite salle, puis l'étage",
  texte:[
    { sobre:"Elle souffle la chandelle du couloir en passant, par habitude.",
      intense:"Elle souffle la chandelle du couloir en passant — par habitude, pas par pudeur : c'est une femme qui compte les chandelles d'une maison depuis quatre ans et qui ne s'arrête pas de le faire pour si peu.",
      extreme:"Elle souffle la chandelle du couloir en passant, sans y penser, par habitude d'une femme qui compte les chandelles de cette maison depuis quatre ans et qui ne va pas cesser de les compter pour si peu. Ce geste-là, plus que tout ce qui a été dit en bas, vous apprend à qui vous avez affaire." },
    "Il n'y a rien de solennel et elle ne laisse rien le devenir.",
    { sobre:"Elle ne tremble pas et elle ne joue pas.",
      intense:"Elle ne tremble pas, ne joue rien, ne fait aucune des choses qu'on attend. Elle est directe, exigeante, un peu brusque, et elle sait ce qu'elle veut d'une façon qui n'a rien à voir avec quatre ans de veuvage.",
      extreme:"Elle ne tremble pas. Elle ne joue rien du tout, ne baisse pas les yeux, ne fait aucune des choses que quatre siècles de convenances ont prévues pour ce moment-là. Elle est directe, exigeante et un peu brusque ; elle dit ce qu'elle veut et corrige ce qui ne lui va pas, à voix basse, avec la même absence complète de détour qu'en bas devant son état de fermage. Ce n'est pas de l'audace. C'est une femme de vingt-neuf ans qui a décidé quelque chose il y a deux heures et qui ne compte pas passer la nuit à en avoir l'air surprise." },
    "§ Elle est chaude, précise, très présente, et elle rit une fois — bas, contre votre épaule, d'une chose qu'elle ne dira pas.",
    { sobre:"Ce n'est pas tendre et ce n'est pas froid non plus.",
      intense:"Ce n'est pas tendre et ce n'est pas froid : c'est deux adultes qui ont dit exactement ce qu'ils voulaient et qui n'ont plus rien à négocier, et il se trouve que c'est une combinaison rare et très efficace.",
      extreme:"Ce n'est pas tendre et ce n'est surtout pas froid, contrairement à ce que la conversation d'en bas laissait attendre. C'est deux adultes qui ont posé leurs termes en toutes lettres, qui n'ont plus rien à se cacher ni à se marchander, et qui découvrent que c'est une combinaison beaucoup plus rare et beaucoup plus efficace que tout ce que les chansons racontent. Il y a de la faim là-dedans, des deux côtés, et personne ne fait semblant qu'il n'y en a pas." },
    "Au milieu de la nuit, dans le noir, elle dit une seule chose qui n'a rien à voir avec des comptes :",
    "« Quatre ans. »",
    "Puis plus rien, et elle ne le redira jamais — elle avait prévenu.",
    "§ Au matin elle est déjà debout, habillée, et son état de fermage est reparti avec elle.",
    { sobre:"« Vous partez quand ? »",
      intense:"« Vous partez quand ? » demande-t-elle en ouvrant le volet, du ton dont on demande l'heure.\n\n« Ce matin. »\n\n« Bien. » Un temps. « Faites ce qu'il vous a demandé de faire, et faites-le correctement. Je ne veux pas devoir expliquer à cette maison que j'ai payé pour rien. »",
      extreme:"« Vous partez quand ? » demande-t-elle en ouvrant le volet, exactement du ton dont on demande l'heure à quelqu'un qu'on connaît peu.\n\n« Ce matin. »\n\n« Bien. » Elle rattache ses cheveux, dos à vous. « Alors faites ce que mon oncle vous a demandé, et faites-le correctement, sans économiser votre peine. Je ne tiens pas à devoir expliquer aux trois adultes de cette maison que j'ai payé le Prix pour un homme qui a bâclé. »\n\nElle sort. Elle ne se retourne pas et il n'y a rien à en conclure : elle a des comptes à faire, c'est mardi." },
  ],
  effets:{ flags:['px_nuit','px_liaison','a2_prix_paye','a2_liaison_verneuil'],
           suspicion:9,
           faire:() => { PRIX().liaisons.push('sibylle');
                         retenir('caleb', "une maison de la vallée a payé le Sang, ce qui se sait et se compte"); },
           exploit:{ eclat:6, temoins:'quelques', quoi:"le Prix du Paria, payé dans sa forme complète" },
           marque:"Verneuil a payé le Sang. Dame Sibylle voulait un actif, et quatre ans de rien.",
           court:"Quatre ans" },
  plusTard:"Une maison qui a payé le Sang figure dans les conversations de trois provinces pendant vingt ans, et ses enfants l'entendent.",
  suite:'px_apres', libelleSuite:"La suite" },

px_partir:{
  qui:'sibylle',
  titre:"La porte refermée",
  texte:[
    "Vous vous levez et vous allez à la porte.",
    { sobre:"Elle ne vous retient pas.",
      intense:"Elle ne vous retient pas, ne demande pas pourquoi, et ne change pas de visage. Elle range son feuillet.",
      extreme:"Elle ne vous retient pas, ne demande aucune explication, et son visage ne change pas d'un iota. Elle replie son état de fermage en trois, soigneusement, et le range dans sa manche — le geste d'une femme qui a présenté un dossier, qui l'a vu refusé, et qui range le dossier." },
    "« Vous direz à mon oncle que c'est moi qui ai refusé », dit-elle.",
    "« Ce n'est pas vrai. »",
    { sobre:"« Non. Mais c'est mieux pour tout le monde. »",
      intense:"« Non. C'est mieux pour tout le monde, et ça ne coûte rien qu'à moi, et je suis la seule ici à savoir combien ça coûte. » Elle ouvre elle-même la porte. « Bonne nuit, messire. »",
      extreme:"« Non, ce n'est pas vrai. » Elle se lève. « Mais c'est mieux pour tout le monde : mieux pour cette maison, qui n'aura pas à porter d'avoir été dédaignée par un Paria ; mieux pour vous, qui n'aurez pas un vieil homme humilié comme ennemi ; et ça ne coûte qu'à moi, ce qui est un arrangement dont j'ai l'habitude. » Elle ouvre elle-même la porte et s'écarte. « Bonne nuit, messire. »" },
    "§ Elle vous fait raccompagner et vous ne la reverrez pas de tout le contrat.",
    "Le montant est versé sans un mot. L'intendant est glacial. Personne ne vous explique rien.",
  ],
  effets:{ or:400, flags:['px_partir_dame','px_refuse_une'],
           faire:() => { PRIX().dame = null; },
           marque:"Vous êtes parti. Elle a dit qu'elle dirait que c'était elle. « Ça ne coûte qu'à moi. »",
           court:"La porte refermée" },
  suite:'a2_carte', libelleSuite:"La carte" },

/* — Le désir, dit sans décoration. Une cadette qui n'a rien à administrer,
     qui a vu ce que la province raconte, et qui a choisi. */
px_alix:{
  qui:'alix',
  lieu:"Bragelonne · la galerie",
  titre:"Elle n'a pas de compte à tenir",
  texte:[
    "Dame Alix de Bragelonne a vingt-quatre ans, deux frères aînés, et rien du tout à administrer — ce qui, dans une maison qui va bien, est une condition très particulière.",
    { sobre:"Elle n'a pas attendu qu'on la fasse venir.",
      intense:"On n'a pas eu à la faire venir. Elle attendait dans la galerie, et il est très clair qu'elle savait depuis avant votre arrivée ce qui allait se dire dans le cabinet.",
      extreme:"On n'a pas eu à la faire venir : elle attendait dans la galerie, appuyée au chambranle, et il est parfaitement clair qu'elle savait ce qui allait se dire dans le cabinet de son père avant même que vous mettiez pied à terre dans la cour. Une maison de province n'a aucun secret pour ses cadettes — elles sont les seules à avoir le temps d'écouter." },
    "« Il a mis quarante minutes à me le dire. Il aurait pu mettre quatre. »",
    "« Il ne voulait pas le dire. »",
    "« Personne ne veut le dire. C'est une coutume conçue pour que personne ne veuille la dire. » Elle hausse une épaule. « J'ai vingt-quatre ans, messire, on m'a expliqué le Prix du Paria à onze. »",
    "§ Elle n'a ni feuillet, ni état, ni calcul.",
    { sobre:"« Je ne vais rien vous vendre. »",
      intense:"« Je ne vais rien vous vendre et je n'ai rien à défendre. » Elle marche jusqu'à la fenêtre. « Mes frères ont les terres, ma sœur a un contrat de mariage depuis ses quinze ans, et moi j'ai une chambre au bout d'une galerie et quarante ans devant moi. »",
      extreme:"« Je ne vais rien vous vendre et je n'ai strictement rien à défendre — ni un domaine, ni une charge, ni un avenir qu'un enfant pourrait consolider. Vous n'aurez pas droit à l'état de fermage. » Elle marche jusqu'à la fenêtre de la galerie et regarde la cour. « Mes deux frères ont les terres. Ma sœur a un contrat de mariage signé depuis ses quinze ans, avec onze pages de clauses qu'elle n'a jamais lues. Et moi j'ai une chambre au bout de cette galerie, une rente de veuve sans avoir été mariée, et quarante ans devant moi dans lesquels il n'arrivera rigoureusement rien. »" },
    "« Alors pourquoi ? »",
    "Elle se retourne, et elle ne prend pas de détour.",
    { sobre:"« Parce que j'en ai envie. »",
      intense:"« Parce que j'en ai envie. » Elle soutient le regard sans effort. « C'est tout. Ça vous suffit ou ça ne vous suffit pas, mais ne cherchez pas autre chose : il n'y a rien d'autre. »",
      extreme:"« Parce que j'en ai envie. » Elle soutient votre regard sans le moindre effort et sans une once de provocation, ce qui est infiniment plus déstabilisant que si elle en avait mis. « C'est tout. Il n'y a pas de calcul, pas de dette de maison, pas d'enfant à produire, pas de courbe à redresser. J'ai vu passer un homme dont trois provinces racontent des choses, mon père doit une coutume, et j'en ai envie. Ça vous suffit ou ça ne vous suffit pas — mais ne cherchez rien derrière, vous ne trouverez rien, et vous allez me faire perdre le peu de nerf qu'il m'a fallu pour descendre cette galerie. »" },
    "§ « On vous a poussée ? »",
    { sobre:"« Mon père a essayé de m'en dissuader pendant vingt minutes. »",
      intense:"« Mon père a passé vingt de ses quarante minutes à essayer de m'en dissuader. » Elle a un vrai sourire, le premier. « Il m'a proposé de payer l'or lui-même sur sa cassette. Je lui ai dit non deux fois. »",
      extreme:"« Mon père a passé vingt de ses quarante minutes à tenter de m'en dissuader, et les vingt autres à me décrire ce qu'on dirait de moi dans la vallée. » Elle a un vrai sourire, le premier de la soirée. « Il m'a proposé de payer l'or lui-même, de sa propre cassette, pour que la question ne se pose pas. Je lui ai dit non deux fois, et la seconde fois assez fort pour que la cuisine entende. Alors non, messire : personne ne m'a poussée. On a fait tout ce qu'on a pu dans l'autre sens. »" },
  ],
  choix:[
    { t:"Rester",
      detail:"elle a été très claire · il n'y a rien à ajouter et elle déteste qu'on ajoute",
      risque:"définitif", definitif:true, va:'px_nuit_alix' },
    { t:"« Vous savez ce qu'on dira de vous. »",
      detail:"le lui poser une fois, en face · elle a vingt-quatre ans et quarante devant elle",
      risque:"calculé", va:'px_alix_dira' },
    { t:"Partir",
      detail:"prendre l'or et refermer · sans explication, parce qu'il n'y en a pas de bonne",
      risque:"prudent", va:'px_partir' },
  ],
},

px_alix_dira:{
  qui:'alix',
  titre:"Ce qu'on dira",
  texte:[
    "« Vous savez ce qu'on dira de vous. »",
    { sobre:"« Mot pour mot. »",
      intense:"« Mot pour mot », dit-elle. « Je pourrais vous l'écrire ce soir et vous vérifierez dans six mois. »",
      extreme:"« Mot pour mot », dit-elle, sans se départir. « Je pourrais vous l'écrire ce soir, mettre le papier dans une enveloppe, et vous le feriez ouvrir dans six mois pour vérifier. Je me trompe rarement là-dessus : j'ai eu vingt-quatre ans pour écouter ce qu'on dit des femmes de cette vallée, et il n'y a que quatre phrases en circulation. Elles servent pour tout le monde. »" },
    "« Et ça ne compte pas ? »",
    "« Bien sûr que ça compte. » Elle se rassoit sur le rebord. « Ça comptera pendant deux ans, ça deviendra une plaisanterie pendant trois, et ensuite je serai une femme de trente ans dont on a dit quelque chose il y a longtemps. C'est un coût. Je l'ai chiffré. »",
    "« Vous venez de dire que vous ne calculiez rien. »",
    { sobre:"« J'ai dit que je n'avais rien à vendre. Ce n'est pas pareil. »",
      intense:"« J'ai dit que je n'avais rien à vous vendre. Je n'ai pas dit que j'étais idiote. » Elle a l'air franchement amusée. « J'ai calculé ce que ça me coûte. J'ai simplement décidé que ça les valait. C'est ça, vouloir quelque chose, messire — ce n'est pas ne pas savoir le prix. »",
      extreme:"« J'ai dit que je n'avais rien à *vous* vendre. Je n'ai jamais dit que j'étais idiote, et ce serait bien la première fois qu'on me le reprocherait dans cette maison. » Elle a l'air franchement amusée, et c'est pire. « Bien sûr que j'ai calculé ce que ça me coûte : deux ans de vallée, une réputation, et un contrat de mariage qui aurait pu être un peu meilleur dans huit ans. J'ai fait le compte et j'ai décidé que ça les valait. C'est ça, vouloir quelque chose. Ce n'est pas ignorer le prix — n'importe qui peut vouloir en ignorant le prix, ça n'a aucun mérite. »" },
    "§ Elle vous regarde un instant de trop.",
    "« Autre chose ? Parce que je vous préviens : j'ai eu besoin d'un certain courage pour descendre cette galerie, et il ne durera pas toute la nuit. »",
  ],
  effets:{ flags:['px_alix_lucide'],
           marque:"« Vouloir quelque chose, ce n'est pas ignorer le prix. » Elle avait tout chiffré.",
           court:"Elle avait chiffré" },
  suite:'px_nuit_alix', libelleSuite:"Non, rien d'autre" },

px_nuit_alix:{
  qui:'alix',
  lieu:"Bragelonne · au bout de la galerie",
  titre:"Au bout de la galerie",
  texte:[
    { sobre:"Elle ferme la porte au verrou, ce qui n'est pas rien dans une maison pleine.",
      intense:"Elle pousse le verrou — ce qui, dans une maison de vingt personnes avec deux frères aînés, est la décision de la soirée et pas ce qui suit.",
      extreme:"Elle pousse le verrou derrière elle, et il faut mesurer ce que c'est : dans une maison de vingt personnes, avec deux frères aînés, une mère et un domestique qui dort au bout du couloir, un verrou tiré à cette heure-là est un fait que trois personnes auront constaté avant l'aube. C'est la vraie décision de la soirée, et elle est prise, et ce qui suit n'est plus une décision." },
    "Elle est nerveuse et elle ne le cache pas, ce qui est infiniment plus honnête que le contraire.",
    { sobre:"Puis elle cesse de l'être.",
      intense:"Puis elle cesse de l'être, assez vite, et ce qui reste est une jeune femme de vingt-quatre ans qui voulait quelque chose depuis un moment et qui n'a plus aucune raison de faire comme si non.",
      extreme:"Puis elle cesse de l'être, assez vite et sans transition nette, et ce qui reste est une femme de vingt-quatre ans qui voulait ça depuis suffisamment longtemps pour y avoir pensé en détail, qui n'a désormais plus aucune raison de faire semblant du contraire, et qui découvre avec une franchise déconcertante qu'elle n'a aucune envie d'être délicate." },
    "§ Elle demande des choses. Elle en refuse d'autres, aussi nettement, sans que ça ait l'air de coûter quoi que ce soit à personne.",
    "Elle a la peau chaude, elle mord, et elle rit deux fois dans la nuit — franchement, pas du tout à voix basse, ce qui est un problème de maison et pas un problème de chambre.",
    { sobre:"Au matin elle est de très bonne humeur.",
      intense:"Au matin elle est de très bonne humeur, ce à quoi rien ne vous avait préparé, et elle n'a pas la moindre intention de s'excuser auprès de qui que ce soit.",
      extreme:"Au matin elle est de franchement bonne humeur — ce à quoi absolument rien dans dix ans de contrats ne vous avait préparé — et elle n'a pas la plus petite intention de s'excuser auprès de qui que ce soit, ni ce matin ni jamais. Elle prend son temps. Elle ouvre les volets en grand alors qu'il est tôt et que la cour est pleine." },
    "« Vous allez avoir des ennuis », dites-vous.",
    "« J'ai déjà des ennuis. Ils commencent en bas de l'escalier et ils dureront deux ans. » Elle attache sa robe. « Je vous ai dit que j'avais chiffré. »",
    "§ Elle s'arrête à la porte.",
    { sobre:"« Ne m'écrivez pas. »",
      intense:"« Ne m'écrivez pas », dit-elle. « Ça ferait de cette histoire une autre histoire, et je tiens beaucoup à celle-ci telle qu'elle est. »",
      extreme:"« Ne m'écrivez pas. » Elle le dit sans dureté, en tirant le verrou. « Une lettre ferait de cette nuit autre chose, et cette autre chose est très bien pour les gens à qui elle arrive, mais ce n'est pas ce que j'ai voulu et je n'en ai pas envie. Je tiens beaucoup à celle-ci exactement telle qu'elle est : une nuit que j'ai décidée, dont j'ai payé le prix d'avance, et dont personne ne pourra jamais me dire qu'on me l'a arrangée. »" },
  ],
  effets:{ flags:['px_nuit','px_liaison','a2_prix_paye','a2_liaison_bragelonne'],
           suspicion:11,
           faire:() => { PRIX().liaisons.push('alix');
                         retenir('caleb', "Bragelonne a payé le Sang et la cadette n'en fait pas mystère"); },
           exploit:{ eclat:5, temoins:'quelques', quoi:"une cadette de Bragelonne a tiré un verrou" },
           marque:"« Ne m'écrivez pas. Ça ferait de cette histoire une autre histoire. »",
           court:"Le verrou" },
  suite:'px_apres', libelleSuite:"La suite" },

/* — Le refus. Il existe, il est écrit en clair, et l'option disparaît. */
px_hersende:{
  qui:'verneuil',
  lieu:"Chastel-Bas · le seuil",
  titre:"Personne ne consent",
  texte:[
    "On ne vous fait pas entrer dans une salle. On vous répond sur le seuil, ce qui est déjà une réponse.",
    { sobre:"L'intendant récite quelque chose qu'on lui a fait apprendre.",
      intense:"L'intendant récite trois phrases qu'on lui a manifestement fait apprendre par cœur une heure plus tôt, et il les récite mal, en regardant le sol.",
      extreme:"L'intendant récite trois phrases qu'on lui a fait apprendre par cœur une heure plus tôt. Il les récite mal, sans lever les yeux du seuil, et il s'y reprend une fois — parce que ce n'est pas son métier, parce qu'il connaît la dame en question depuis douze ans, et parce qu'il sait parfaitement que le message est humiliant pour les deux maisons à la fois." },
    "« Dame Hersende de Chastel-Bas a été informée. Elle décline. »",
    "« Elle décline. »",
    "« Elle a chargé de vous dire pourquoi, ce qui n'était pas obligé. »",
    "§ Il déplie un billet et lit, mot pour mot, parce qu'on lui a demandé de ne pas résumer.",
    { sobre:"*« J'ai un fils de neuf ans. »*",
      intense:"*« J'ai un fils de neuf ans qui héritera de cette maison. Tout ce qui affaiblit son titre, je le refuse — sans considération pour l'homme, dont je n'ai rien à dire, et sans considération pour la coutume, que je trouve juste. »*",
      extreme:"*« J'ai un fils de neuf ans qui héritera de cette maison, et sa position est déjà contestée par une branche cadette qui n'attend qu'un prétexte. Tout ce qui affaiblit son titre, je le refuse. Cela vaut pour cette coutume comme pour le reste, sans aucune considération pour l'homme, dont je n'ai rien à dire ni en bien ni en mal, et sans aucune considération pour la coutume elle-même, que je tiens d'ailleurs pour juste : une maison qui appelle un Paria doit payer, et ma maison paiera — en or, et elle paiera plein tarif. »*" },
    "« C'est tout ? »",
    "« Il y a une dernière ligne. »",
    "*« Qu'on ne me propose personne d'autre de cette maison. J'ai vérifié : il n'y a personne d'autre en âge, et je ne veux pas qu'on aille chercher. »*",
    "§ Elle a fermé la porte devant tout le monde, y compris devant ceux de sa propre maison qui auraient été tentés d'insister.",
    "L'or est versé en entier, plein tarif, sans rabais coutumier. C'est la maison qui l'a voulu ainsi.",
  ],
  effets:{ or:400, flags:['px_hersende','px_refuse_maison','a2_prix_indisponible'],
           faire:() => { PRIX().dame = null; PRIX().termes = 'or'; },
           marque:"Chastel-Bas décline, avec la raison écrite. « Qu'on ne me propose personne d'autre. »",
           court:"Elle décline" },
  suite:'a2_carte', libelleSuite:"La carte" },

/* ══ CE QUE ÇA DEVIENT ═══════════════════════════════════════════════════ */
px_apres:{
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  titre:"Ce qu'une liaison fait dans une province",
  texte:[
    "Une liaison de Prix n'est ni secrète ni publique : elle est **sue**, ce qui est un troisième état que seules les provinces savent produire.",
    { sobre:"Ce qui change est concret.",
      intense:"Personne n'en parle devant vous. Tout le monde en parle. Et ce qui change est parfaitement concret, dans les deux sens.",
      extreme:"Personne n'en parlera jamais devant vous. Tout le monde en parle. Et ce qui change est parfaitement concret, dans les deux sens à la fois, ce qui est la partie que les récits ne rendent jamais : une maison qui a payé le Sang est une maison qui ne peut plus vous traiter en fournisseur, et c'est aussi bien une alliance qu'une plaie." },
    "**Chez les maisons humaines.** On vous reçoit moins bien et on vous paie mieux. Un homme qui a réclamé le Prix est un homme qui connaît ses droits, et un homme qui connaît ses droits coûte cher.",
    "**Chez les Parias.** Le mot passe en trois semaines par des chemins que vous ne connaissez pas. Un des quarante et un vous fait porter quelque chose sans un mot d'explication : une bourse, ou une information, ou rien du tout qu'un signe.",
    "**Au bailliage.** Rien. La coutume n'est écrite nulle part, donc elle ne s'instruit pas.",
    () => a('a2_alycia_epouse') || a('ml_signe') || a('ml_termes')
      ? "§ Et Alycia l'apprend, comme tout le reste, par le réseau, avant vous.\n\nElle ne fait pas de scène — elle n'en a jamais fait. Elle dit une phrase, un soir, sans lever les yeux : « C'est votre droit et je ne le discute pas. Mais la prochaine fois, vous me le direz avant, ou je l'apprendrai comme les autres et je le prendrai comme les autres. »"
      : "§ Il n'y a personne à qui l'expliquer, ce qui rend les choses plus simples et pas meilleures.",
    "Et il y a la question qu'on ne pose pas et qui met des mois à se répondre.",
    { sobre:"On saura, ou on ne saura pas.",
      intense:"Une maison qui a un enfant du Prix ne l'annonce pas : elle a un enfant, voilà tout, et il porte son nom à elle. On l'apprend par recoupement, des années plus tard, ou jamais.",
      extreme:"Une maison qui a un enfant du Prix ne l'annonce évidemment pas : elle a un enfant, voilà tout, il porte son nom à elle, il est inscrit à son registre à elle et personne n'a rien à ajouter. On l'apprend par recoupement — une date, un baptême, un silence bien tenu — des années plus tard, ou jamais du tout. Certains Parias en ont onze dans quatre provinces et n'en ont jamais vu un seul." },
  ],
  effets:{ flags:['px_apres','a2_liaison'],
           faire:() => { ETAT.renom += 6;
                         if(typeof bouger === 'function' && (a('ml_signe') || a('a2_alycia_epouse')))
                           bouger('alycia', { confiance:-3 }); },
           marque:"La liaison est sue, ce qui n'est ni secret ni public. On vous reçoit moins bien et on vous paie mieux.",
           court:"Sue" },
  suite:'a2_carte', libelleSuite:"La carte" },

};

enregistrerScenes(PRIX_SCENES);

Object.assign(GENS, {
  verneuil: { nom:"Sire Gaucher de Verneuil", role:"soixante et un ans · quatre fermes et un moulin en indivision", lettre:"G" },
  sibylle:  { nom:"Dame Sibylle de Verneuil", role:"vingt-neuf ans · veuve · elle tient les comptes", lettre:"S" },
  alix:     { nom:"Dame Alix de Bragelonne",  role:"vingt-quatre ans · cadette · rien à administrer", lettre:"A" },
});

/* Qui vient dépend de la maison et de l'état du monde, jamais d'un dé. */
DYN.px_elle = () => {
  const d = dameDuJour();
  if(d.mobile === 'refus') return aller('px_hersende');
  aller(d.mobile === 'desir' ? 'px_alix' : 'px_sibylle');
};

offrir({ id:'px_termes', lieu:'cendrepont', va:'px_termes',
         titre:"Une maison vous fait demander",
         si:() => !a('px_termes') && ETAT.renom >= 20 });

entree2('px_sibylle', 'px_alix', 'px_hersende');
