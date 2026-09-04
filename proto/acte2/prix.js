/* PARIAS — LE PRIX DU PARIA
 * ═══════════════════════════════════════════════════════════════════════
 * La coutume n'a jamais été abrogée parce que personne n'a jamais voulu
 * l'écrire noir sur blanc : une maison noble qui emploie un Paria lui doit
 * l'Or et le Sang. Des pièces comptant, et une femme de son rang.
 *
 * TROIS RÈGLES, ET ELLES NE PLIENT PAS :
 *
 *   1. LES TERMES SE FIXENT AVANT TOUTE ACTION. Or seul · Sang seul · les
 *      deux · refuser. Une fois dits, ils ne se rediscutent plus, ni par le
 *      Paria ni par la maison.
 *   2. CE QUI EST STIPULÉ EST HONORÉ. Une maison qui se dérobe au Prix
 *      cesse d'être une maison : ça s'est vu deux fois en trois cents ans
 *      et les deux sont mortes de la honte avant de mourir d'autre chose.
 *      Le chef de maison ne discute pas. Il traverse un couloir.
 *   3. ELLE N'EST PAS À LA TABLE. On ne marchande pas avec elle : ce n'est
 *      pas son rôle dans ce monde-là. On lui dit. Elle vient.
 *
 * Et ce qu'aucun homme de ces provinces n'écrira jamais : pour beaucoup de
 * ces femmes, c'est la seule nuit de leur vie que personne n'aura arrangée
 * pour elles. Une veuve qui tient des comptes et n'a droit à rien qui se
 * raconte. Une cadette à qui il n'arrivera plus rien. Une épouse mariée à
 * onze ans d'un homme qui ne peut pas lui faire d'héritier.
 *
 * Elles ont chacune leur raison et aucune n'est romanesque : un enfant qui
 * porte l'Onde est le seul actif qu'une maison qui s'éteint puisse encore
 * produire, et il y a des femmes qui veulent, tout simplement, parce qu'on
 * ne leur a jamais demandé et qu'elles ont trente ans.
 * ═══════════════════════════════════════════════════════════════════════ */

const PRIX = () => (A2().prix = A2().prix || { termes:null, dame:null, liaisons:[] });

const DAMES = {
  sibylle: { id:'sibylle', nom:"Dame Sibylle de Verneuil", mobile:'pouvoir' },
  alix:    { id:'alix',    nom:"Dame Alix de Bragelonne",  mobile:'desir' },
  mahaut:  { id:'mahaut',  nom:"Dame Mahaut de Tourvieille", mobile:'mariee' },
};

const dameDuJour = () => {
  const P = PRIX();
  if(P.dame) return DAMES[P.dame];
  /* Qui la maison désigne dépend de la maison, jamais d'un dé. Une maison
   * qui s'éteint envoie celle qui a un calcul ; une maison qui va bien
   * envoie celle qui n'a rien à faire ; une maison sans héritier envoie
   * l'épouse de son fils, et personne ne trouve ça extraordinaire. */
  const id = a('a2_bannieres') || ETAT.renom >= 60 ? 'alix'
           : (a('px_une_fois') ? 'mahaut' : 'sibylle');
  P.dame = id;
  return DAMES[id];
};

const PRIX_SCENES = {

/* ══ LES TERMES ═══════════════════════════════════════════════════════════ */
px_termes:{
  qui:'verneuil',
  lieu:() => `${LIEUX[A2().lieu].nom} · le cabinet · ${dateA2()}`,
  titre:"L'Or et le Sang",
  texte:[
    "Sire Gaucher de Verneuil a soixante et un ans, quatre fermes, un moulin en indivision, et un problème que ses propres hommes ne régleront pas.",
    { sobre:"Il vient au Prix avant même de dire ce qu'il veut.",
      intense:"Il vient au Prix lui-même, tout de suite, avant d'avoir dit un mot de ce qu'il attend — parce qu'un chef de maison qui laisse un Paria aborder le sujet le premier a déjà perdu la conversation.",
      extreme:"Il vient au Prix lui-même, immédiatement, avant d'avoir dit un mot de ce qu'il attend de vous.\n\nLa manœuvre est vieille et elle est bonne : un chef de maison qui laisse un Paria aborder le sujet le premier a déjà perdu la conversation, et il l'a appris à ses dépens il y a trente ans. Il pose donc la chose comme on pose une pièce comptable, avec l'exactitude d'un homme à qui il ne reste que la tenue." },
    "« La coutume est ce qu'elle est. Ma maison vous doit l'Or et le Sang. »",
    "§ Il ne s'excuse pas et ne s'indigne pas. Il constate une dette.",
    "@« Et si je demande les deux ? »",
    { sobre:"« Alors vous aurez les deux. Il n'y a rien à discuter. »",
      intense:"« Alors vous aurez les deux. » Il ne cille pas. « Il n'y a rien à discuter, messire. Une maison qui stipule honore. »",
      extreme:"« Alors vous aurez les deux. » Il ne cille pas d'un cil. « Il n'y a rien à discuter, messire, et je vous saurais gré de ne pas essayer : ça nous ferait perdre une heure et ça m'obligerait à être désagréable.\n\nUne maison qui stipule honore. C'est tout ce que ça veut dire, et c'est tout ce qui nous reste. Deux maisons se sont dérobées au Prix en trois cents ans. On sait encore leurs noms. On ne sait plus où sont leurs terres. »" },
    "@« Et elle ? »",
    { sobre:"« Elle est de ma parenté et elle sait ce que ma maison doit. »",
      intense:"« Elle est de ma parenté, elle a l'âge, elle sait ce que ma maison doit et à qui. » Il pose les deux mains à plat. « Je vais traverser un couloir et le lui dire. C'est tout ce que j'ai à faire et c'est le pire quart d'heure de mon année. »",
      extreme:"« Elle est de ma parenté, elle a l'âge, elle sait exactement ce que ma maison doit et à qui, parce qu'elle en tient les comptes. » Il pose les deux mains à plat sur le bois.\n\n« Je vais traverser un couloir et le lui dire. Trente pas. C'est tout ce que j'ai à faire dans cette affaire, et c'est le pire quart d'heure de mon année. Vous croyez que le Prix coûte de l'or et une femme ? Le Prix coûte trente pas dans un couloir, une fois, et on les refait ensuite toutes les nuits pendant dix ans. »" },
    "§ Il attend. Quatre termes. Rien ne se négocie : c'est la coutume qui fixe, pas les hommes.",
  ],
  effets:{ flags:['px_termes'] },
  choix:[
    { t:"L'Or seul",
      detail:"la maison paie et respire · on vous prendra pour un mercenaire cher, ce qui est un déguisement commode",
      risque:"prudent", definitif:true, va:'px_or' },

    { t:"Le Sang seul",
      detail:"renoncer aux quatre cents couronnes · c'est le terme que les maisons craignent, parce qu'il ne s'oublie pas",
      risque:"définitif", ferme:"Ferme : quatre cents couronnes, et la version commode",
      definitif:true, va:'px_sang' },

    { t:"Le Prix entier",
      detail:"l'Or et le Sang · la coutume dans sa forme pleine, celle qu'on n'écrit nulle part",
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
    "@« L'or. »",
    { sobre:"Il ne montre rien. Il est soulagé.",
      intense:"Il ne montre rien du tout, et il est soulagé : ça se voit aux épaules, une demi-seconde, avant qu'il ne les remonte.",
      extreme:"Il ne montre rigoureusement rien, et il est soulagé — ça se voit aux épaules, une demi-seconde, avant qu'il ne les remonte.\n\nUn vieil homme qui vient d'éviter trente pas dans un couloir, et qui préfère largement quatre cents couronnes à ce quart d'heure-là." },
    "« Quatre cents. Cinq cents si c'est fait avant la Saint-Aubin. »",
    "§ Il paie au-dessus du tarif, et vous savez tous les deux pourquoi.",
    "L'intendant vous rattrape à la cour, sans méchanceté, par métier :",
    "« Vous avez bien fait, messire. On dira que vous êtes cher. C'est infiniment mieux que le reste. »",
    { sobre:"C'est un déguisement, et il est commode.",
      intense:"Un Paria qui prend l'or est un mercenaire cher. Un Paria qui prend le Sang est un Paria. Toute la différence est là, elle n'a rien à voir avec l'argent, et elle vaut des années de tranquillité.",
      extreme:"Un Paria qui prend l'or est, aux yeux de quatre provinces, un mercenaire cher : désagréable, utile, oubliable.\n\nUn Paria qui prend le Sang est un Paria au sens plein — celui de la coutume et de la Purge — et ça ne s'oublie dans aucune maison avant deux générations. Toute la différence entre les deux termes est là. Elle n'a rien à voir avec l'argent et elle vaut des années de sommeil." },
  ],
  effets:{ or:400, flags:['px_or','a2_prix_or'],
           faire:() => { PRIX().termes = 'or'; ETAT.suspicion = Math.max(0, ETAT.suspicion - 4); },
           exploit:{ eclat:3, temoins:'quelques', quoi:"quatre cents couronnes, et rien d'autre" },
           marque:"Vous avez pris l'or seul. « On dira que vous êtes cher. C'est infiniment mieux que le reste. »",
           court:"Quatre cents" },
  suite:'a2_carte', libelleSuite:"La carte" },

px_sang:{
  qui:'verneuil',
  titre:"Sans l'or",
  texte:[
    "@« Le Sang. Pas l'or. »",
    { sobre:"Il met un long temps.",
      intense:"Il met un temps très long, et quand il répond, sa voix a changé de registre. Elle est plus basse. Ce n'est pas de la colère.",
      extreme:"Il met un temps très long — assez pour qu'on entende le feu, la pendule du couloir et quelqu'un qui marche à l'étage — et quand il répond, sa voix a changé de registre. Plus basse, plus lente. Ce n'est pas de la colère : c'est un homme qui vient de comprendre qu'il ne traite pas avec ce qu'il croyait." },
    "« Vous renoncez à quatre cents couronnes. »",
    "@« Oui. »",
    "« Les Parias prennent l'or. Ils le prennent tous, depuis trois cents ans, parce que l'or se dépense et que le reste s'écrit. »",
    "@« Je sais. »",
    { sobre:"« Alors vous voulez qu'on sache. »",
      intense:"« Alors ce n'est pas d'argent que vous avez besoin : vous voulez qu'on sache. » Il se lève et va à la fenêtre. « C'est très intelligent et je vous déteste sincèrement pour ça. »",
      extreme:"« Alors ce n'est pas de l'argent qu'il vous faut. Vous voulez qu'on sache. »\n\nIl se lève, va à la fenêtre et reste dos à vous.\n\n« Quatre cents couronnes s'oublient en un trimestre. Une maison qui a payé le Sang figure dans les conversations de trois provinces pendant vingt ans, et ses petits-enfants l'entendent. C'est très intelligent, messire. Je vous déteste sincèrement pour ça et je le dis sans hausser la voix, parce que ça ne changerait rien à ce que je dois. »" },
    "§ Il tire le cordon sans se retourner.",
    "^« Je vais lui dire. Je vais lui dire en entier, sans arranger, parce que je ne suis pas un maquignon et que je réponds de cette maison. »",
  ],
  effets:{ flags:['px_sang','a2_prix_sang'],
           faire:() => { PRIX().termes = 'sang'; },
           marque:"Vous avez renoncé aux quatre cents couronnes. « Vous voulez qu'on sache. »",
           court:"Sans l'or" },
  suite:'px_elle', libelleSuite:"Il tire le cordon" },

px_entier:{
  qui:'verneuil',
  titre:"La coutume dans sa forme pleine",
  texte:[
    "@« Les deux. »",
    { sobre:"Il encaisse sans un mot et note le montant.",
      intense:"Il encaisse sans un mot, prend sa plume et note quelque chose. Ce qu'il note, c'est le montant — un homme qui tient une maison note toujours le montant d'abord, parce que c'est la moitié qu'il sait traiter.",
      extreme:"Il encaisse sans un mot, prend sa plume et note quelque chose.\n\nCe qu'il note, c'est le montant : trois cent vingt couronnes, le tarif exact du Prix entier, rabais coutumier déduit. Un homme qui tient une maison depuis trente ans note toujours le montant en premier — c'est la seule moitié de cette affaire qu'il sache traiter, et ça lui donne quatre secondes avant d'avoir à penser à l'autre." },
    "« Trois cent vingt, et le reste. »",
    "@« Le tarif est de quatre cents. »",
    "« Le tarif est de quatre cents pour l'or seul. » Il repose la plume. « Le Prix entier se compte autrement, et il se compte à la baisse. Ce qui devrait vous renseigner sur ce que la coutume pense de vous et de moi. »",
    "§ C'est exact, c'est humiliant pour les deux hommes de la pièce, et ce n'est écrit nulle part.",
    "Il tire le cordon et reste debout, la main dessus, sans le lâcher.",
    { sobre:"« Trente pas. C'est ça, le Prix. »",
      intense:"« Vous savez ce que je déteste là-dedans ? Ce n'est pas l'argent, l'argent n'est rien. C'est que je vais devoir traverser un couloir. » Il lâche enfin le cordon. « Trente pas. C'est ça, le Prix du Paria. »",
      extreme:"« Vous savez ce que je déteste le plus dans cette coutume, messire ? Ce n'est pas l'argent — l'argent n'est rien, j'en ai vu partir pour des choses plus bêtes. Ce n'est même pas ce qu'on dira de ma maison : on dit toujours quelque chose.\n\nC'est que je vais devoir traverser un couloir, entrer dans une pièce, et dire une phrase à une femme de ma parenté que je connais depuis qu'elle a quatre ans. » Il lâche le cordon. « Trente pas. Voilà le Prix du Paria. Le reste est de la comptabilité. »" },
  ],
  effets:{ or:320, flags:['px_entier','a2_prix_entier'],
           faire:() => { PRIX().termes = 'entier'; },
           marque:"Le Prix entier. « Trente pas. Voilà le Prix du Paria. Le reste est de la comptabilité. »",
           court:"Trente pas" },
  suite:'px_elle', libelleSuite:"Trente pas" },

px_refus:{
  qui:'verneuil',
  titre:"Personne ne refuse le Prix",
  texte:[
    "@« Rien. Ni l'un ni l'autre. Le contrat, au tarif d'un homme d'armes. »",
    { sobre:"Il ne comprend pas, et il le dit.",
      intense:"Il ne comprend pas, et il le dit — ce qui, chez un homme de soixante et un ans qui tient une maison, vaut un aveu.",
      extreme:"Il ne comprend pas, et il le dit à voix haute, ce qui chez un homme de soixante et un ans qui tient une maison depuis trente ans est assez rare pour valoir un aveu. Il repose sa plume et vous regarde comme on regarde une pièce comptable qui ne tombe pas juste, et dont on sait qu'elle finira par tomber juste parce qu'elles tombent toujours juste." },
    "« Pourquoi ? »",
    "@« Parce que la coutume existe pour humilier votre maison, et que je n'ai pas besoin de votre maison humiliée. »",
    "« Vous en avez besoin bien plus que vous ne croyez. »",
    "§ Il a raison, et c'est désagréable.",
    { sobre:"^« Vous renoncez à un droit, pas à un cadeau. »",
      intense:"^« Vous renoncez à un droit, messire, pas à un cadeau. Le Prix est la seule ligne de tout ce droit qui reconnaisse qu'un Paria est quelqu'un — quelqu'un à qui une maison peut devoir. »",
      extreme:"^« Vous renoncez à un droit et pas à un cadeau, et c'est là que vous vous trompez de conversation.\n\nLe Prix du Paria est la seule ligne, dans tout le droit de ces quatre provinces, qui reconnaisse qu'un Paria est quelqu'un. Quelqu'un à qui une maison noble peut devoir quelque chose. Le jour où plus personne ne le réclamera, plus personne ne devra rien, et vous ne serez plus qu'un homme sans nom qu'on emploie et qu'on paie. » Il se rassoit. « Vous croyez faire un geste. Vous laissez mourir votre seul article. »" },
    "Il paie deux cent cinquante, le tarif d'un homme d'armes ordinaire, et vous fait raccompagner par la grande porte, ce qui n'était pas obligatoire et qu'il fait exprès.",
  ],
  effets:{ or:250, flags:['px_refuse','a2_prix_refuse'],
           faire:() => { PRIX().termes = 'aucun'; ETAT.suspicion = Math.max(0, ETAT.suspicion - 6); },
           exploit:{ eclat:5, temoins:'quelques', quoi:"un Paria qui n'a pas réclamé son Prix" },
           marque:"Vous avez refusé le Prix. « Vous laissez mourir votre seul article. »",
           court:"Le seul article" },
  plusTard:"Le Prix est la seule ligne du droit qui reconnaisse qu'un Paria est quelqu'un. Vous venez d'en laisser tomber une.",
  suite:'a2_carte', libelleSuite:"La carte" },

/* ══ ELLE ═════════════════════════════════════════════════════════════════ */
px_elle:{ dyn:true, texte:[], suite:'a2_carte' },

/* — LA VEUVE. Elle tient les comptes, elle a fait la seule arithmétique
     qu'une maison mourante puisse encore faire, et elle l'énonce. */
px_sibylle:{
  qui:'sibylle',
  lieu:"Verneuil · la petite salle",
  titre:"Ce qu'un enfant vaut",
  texte:[
    "Vingt-neuf ans. Un mari mort il y a quatre ans. Les comptes de la maison entre les mains depuis presque autant.",
    { sobre:"Elle entre seule et ferme la porte.",
      intense:"Elle entre seule, ferme la porte derrière elle et s'assoit avant qu'on le lui propose. Trois gestes, quatre secondes, et ils disent tout : personne ne l'accompagne, personne n'écoute, et elle n'est pas venue en quémandeuse.",
      extreme:"Elle entre seule, ferme la porte derrière elle et s'assoit avant qu'on le lui propose.\n\nTrois gestes, quatre secondes, et ils disent l'essentiel. Personne ne l'accompagne. Personne n'écoute derrière. Et elle n'est pas venue en quémandeuse. Son oncle a fait ses trente pas il y a une heure et demie ; elle a manifestement passé cette heure et demie à réfléchir." },
    "« Il me l'a dit. Il l'a très mal dit, le pauvre homme. Il l'a dit en entier. »",
    "@« Vous n'êtes pas obligée. »",
    { sobre:"« Ne commencez pas par là. »",
      intense:"« Ne commencez pas par là. » Le geste est sec. « C'est la phrase que les hommes disent pour se mettre eux-mêmes à l'aise, et elle a l'effet exactement inverse : elle me met en position de vous rassurer. »",
      extreme:"« Ne commencez pas par là, je vous prie. » Le geste est sec, presque agacé.\n\n« C'est la phrase que les hommes servent d'abord pour se mettre eux-mêmes à l'aise, et elle produit l'effet rigoureusement inverse : elle me met en position de vous rassurer, vous. J'ai vingt-neuf ans, je tiens les comptes de cette maison depuis quatre ans, et je n'ai été obligée à rien depuis la mort de mon mari. C'est à peu près tout ce que sa mort m'ait apporté. »" },
    "§ Elle pose un feuillet plié sur la table. Ce n'est pas une lettre : c'est un état.",
    "^« Verneuil. Quatre fermes, un moulin en indivision, cent quatre-vingts arpents dont quarante en friche. Trois adultes de mon sang, dont un vieillard. Aucun héritier mâle. »",
    "@« Je ne vois pas ce que — »",
    "« Vous allez voir. »",
    { sobre:"« Trente ans que cette maison n'a produit aucun actif. »",
      intense:"^« En trente ans, cette maison n'a produit aucun actif. Pas un mariage utile, pas une charge, pas un droit de péage. Elle décline au rythme du siècle, ni plus vite ni moins vite, et dans deux générations il restera un nom sur un bail. »",
      extreme:"^« En trente ans, cette maison n'a produit rigoureusement aucun actif. Pas un mariage utile — j'ai été le dernier, et il est mort. Pas une charge. Pas un droit de péage, pas une concession, pas une alliance.\n\nElle décline exactement au rythme du siècle, ni plus vite ni moins vite que ses voisines, et dans deux générations il en restera un nom sur un bail de fermage que personne ne saura plus prononcer. Ce n'est pas un drame, messire. C'est une courbe, et je la tiens à jour tous les trimestres. »" },
    "Elle repousse le feuillet.",
    "« Et puis il y a vous. »",
    "§ Elle le dit sans une once de coquetterie, et c'est ça qui glace.",
    { sobre:"^« Un enfant de vous porterait ce que vous portez. »",
      intense:"^« Un enfant de vous porterait, selon toute probabilité, ce que vous portez. » Elle soutient le regard sans effort. « Ne niez pas. Ça nous ferait perdre une heure et je n'ai pas d'heure à perdre. »",
      extreme:"^« Un enfant de vous porterait, selon toute probabilité, ce que vous portez. »\n\nElle soutient le regard sans la moindre difficulté.\n\n« Ne le niez pas, ça nous ferait perdre une heure et je n'en ai pas à perdre. Toute la province le suppose depuis deux ans ; la différence entre la province et moi, c'est qu'elle suppose et que je tiens des livres. J'ai relevé onze faits vérifiables sur vous en trois ans, dont quatre que vous croyez sans témoin. J'en ai tiré une conclusion et je n'ai aucune envie de vous la lire à voix haute. »" },
    "@« Vous voulez un enfant qui ait ça. »",
    { sobre:"« Je veux un actif. »",
      intense:"« Je veux un **actif**. C'est le mot que j'emploie dans ma tête depuis une heure et demie. » Elle ne baisse pas les yeux. « C'est laid. Dites-le si ça vous soulage : c'est le seul que cette maison puisse encore produire, et il se produit comme ça. »",
      extreme:"« Je veux un actif. »\n\nElle ne baisse pas les yeux une seconde.\n\n« C'est le mot que j'emploie dans ma tête depuis une heure et demie, et je vous le donne tel quel plutôt que de vous servir quelque chose de plus présentable. C'est laid. Vous pouvez le dire, ça ne changera rien : cette maison a quatre fermes et pas d'avenir, un enfant qui porte ce que vous portez est la seule chose de valeur qu'elle soit encore en état de produire, et il se trouve — je n'ai pas dessiné le monde — que ça se produit de cette façon-là et pas en signant un acte. »" },
    "@« Et vous, dans tout ça ? »",
    "§ Elle met du temps, pour la première fois.",
    { sobre:"^« Moi, ça fait quatre ans que personne ne me touche. »",
      intense:"^« Moi ? » Le demi-sourire n'a rien d'aimable. « J'ai vingt-neuf ans, je suis veuve depuis quatre, et pendant ces quatre ans il ne s'est rien passé — une veuve qui tient des comptes n'a droit à rien qui puisse se raconter. Alors non, ce n'est pas seulement un calcul. J'aurais préféré. »",
      extreme:"^« Moi ? »\n\nLe demi-sourire n'a rien d'aimable et il est dirigé contre elle-même.\n\n« J'ai vingt-neuf ans. Veuve depuis quatre, d'un homme correct que je n'ai pas aimé et pour qui je n'ai jamais rien senti d'autre que de la patience. Pendant ces quatre années il ne s'est rigoureusement rien passé, parce qu'une veuve qui tient les comptes d'une maison n'a droit à rien qui puisse se raconter à trois lieues à la ronde. »\n\nElle repose les mains à plat.\n\n« Alors non, ce n'est pas uniquement un calcul, et j'aurais très sincèrement préféré que ça le soit. Un calcul, je sais le défendre. Le reste, je vous le dis une fois et je ne le redirai jamais. »" },
    "@« Vous m'avez vu quatre fois. »",
    "« Cinq. Et vous ne m'avez pas vue une seule, ce qui est la partie de cette histoire que je trouve la plus désagréable. »",
  ],
  choix:[
    { t:"Rester",
      detail:"elle a dit ce qu'elle voulait, dans ses termes · il n'y a rien à ajouter",
      risque:"définitif", definitif:true, va:'px_nuit_sibylle' },

    { t:"« Un enfant sur trois naît sans rien. »",
      detail:"lui donner le chiffre entier · elle tient des livres, qu'elle tienne celui-là",
      risque:"calculé", va:'px_un_sur_trois' },
  ],
},

px_un_sur_trois:{
  qui:'sibylle',
  titre:"Un sur trois",
  texte:[
    "@« Un enfant sur trois naît sans rien. C'est le chiffre. Vous tenez des livres : tenez celui-là aussi. »",
    { sobre:"Elle ne bronche pas.",
      intense:"Elle ne bronche pas une seconde — ce qui veut dire qu'elle avait le chiffre avant vous.",
      extreme:"Elle ne bronche pas une seule seconde, et vous comprenez avec un temps de retard désagréable qu'elle avait ce chiffre avant vous. Qu'elle l'a peut-être depuis plus longtemps. Et qu'elle a passé son heure et demie à faire exactement le calcul que vous venez de lui proposer de faire." },
    "« Deux sur trois, alors. C'est ainsi qu'on lit un chiffre quand on veut savoir s'il faut y aller. »",
    "@« Et si c'est le troisième ? »",
    "« Alors j'aurai un enfant. » Elle hausse à peine les épaules. « Ce ne sera pas une catastrophe, messire, ce sera un enfant. Je le tiendrai comme je tiens le reste. »",
    "§ Elle ajoute la seule chose de la soirée qui la fasse hésiter.",
    { sobre:"^« Il ne portera pas votre nom. »",
      intense:"^« Il portera Verneuil. Pas Karlsberg. » Elle vous regarde. « Vous n'aurez aucun droit dessus, aucun, et je vous le dis maintenant parce que les hommes le découvrent trop tard et le prennent très mal. »",
      extreme:"^« Il portera Verneuil. Pas Karlsberg. »\n\nElle le dit fermement : c'est manifestement la part qu'elle a préparée.\n\n« Vous n'aurez aucun droit sur cet enfant. Aucun. Ni de le voir, ni de le nommer, ni de le reconnaître, ni de vous en mêler dans huit ans si l'idée vous prend. C'est ainsi dans la coutume et ainsi dans le droit, et je vous le dis maintenant plutôt que dans huit ans, parce que les hommes le découvrent trop tard et le prennent très mal. J'ai vu ce que ça a fait à deux maisons de cette vallée. »" },
  ],
  effets:{ flags:['px_su_le_chiffre'],
           marque:"« Il portera Verneuil. Vous n'aurez aucun droit dessus. » Elle le dit avant, pas dans huit ans.",
           court:"Verneuil" },
  suite:'px_nuit_sibylle', libelleSuite:"Rester" },

px_nuit_sibylle:{
  qui:'sibylle',
  lieu:"Verneuil · l'étage",
  titre:"La petite salle, puis l'étage",
  texte:[
    { sobre:"Elle souffle la chandelle du couloir en passant, par habitude.",
      intense:"Elle souffle la chandelle du couloir en passant — par habitude, pas par pudeur. Une femme qui compte les chandelles de cette maison depuis quatre ans ne s'arrête pas de les compter pour si peu.",
      extreme:"Elle souffle la chandelle du couloir en passant, sans y penser, par pure habitude d'une femme qui compte les chandelles de cette maison depuis quatre ans et qui ne va pas cesser pour si peu.\n\nCe geste-là, plus que tout ce qui s'est dit en bas, vous apprend à qui vous avez affaire." },
    "Il n'y a rien de solennel, et elle ne laisse rien le devenir.",
    { sobre:"Elle ne tremble pas et elle ne joue pas.",
      intense:"Elle ne tremble pas, ne joue rien, ne fait aucune des choses prévues pour ce moment-là. Elle est directe, exigeante, un peu brusque, et elle sait ce qu'elle veut d'une manière qui n'a rien à voir avec quatre ans de veuvage.",
      extreme:"Elle ne tremble pas. Elle ne joue rien du tout, ne baisse pas les yeux, ne fait aucune des choses que quatre siècles de convenances ont prévues pour ce moment-là.\n\nElle est directe, exigeante, un peu brusque. Elle dit ce qu'elle veut et corrige ce qui ne lui va pas, à voix basse, avec la même absence totale de détour qu'en bas devant son état de fermage. Ce n'est pas de l'audace : c'est une femme de vingt-neuf ans qui a décidé quelque chose il y a deux heures et qui ne compte pas passer la nuit à en avoir l'air surprise." },
    "§ Elle a la peau chaude et les mains froides, elle mord au creux de l'épaule pour ne pas faire de bruit, et elle rit une fois — bas, contre votre gorge, d'une chose qu'elle ne dira pas.",
    { sobre:"Ce n'est ni tendre ni froid.",
      intense:"Ce n'est ni tendre ni froid : c'est deux adultes qui ont posé leurs termes en toutes lettres, qui n'ont plus rien à se cacher ni à se marchander, et qui découvrent que c'est une combinaison rare et redoutablement efficace.",
      extreme:"Ce n'est pas tendre, et ce n'est surtout pas froid — contrairement à ce que la conversation d'en bas laissait attendre.\n\nC'est deux adultes qui ont posé leurs termes en toutes lettres, qui n'ont plus rien à se cacher ni à se marchander, et qui découvrent que c'est une combinaison beaucoup plus rare et beaucoup plus efficace que tout ce que les chansons racontent. Il y a de la faim là-dedans, des deux côtés, et personne ne fait semblant du contraire. Elle est bruyante et elle s'en veut de l'être, deux fois, et la deuxième fois elle cesse de s'en vouloir." },
    "Au milieu de la nuit, dans le noir, elle dit une seule chose qui n'a rien à voir avec des comptes.",
    "« Quatre ans. »",
    "§ Puis plus rien. Elle ne le redira jamais — elle avait prévenu.",
    "Au matin elle est debout la première, habillée, et l'état de fermage est reparti avec elle.",
    "« Vous partez quand ? »",
    "@« Ce matin. »",
    { sobre:"« Bien. Faites correctement ce qu'on vous a demandé. »",
      intense:"« Bien. » Elle rattache ses cheveux, dos à vous. « Faites ce que mon oncle vous a demandé, et faites-le correctement. Je ne tiens pas à devoir expliquer à cette maison que j'ai payé pour un homme qui a bâclé. »",
      extreme:"« Bien. »\n\nElle rattache ses cheveux, dos à vous, devant une fenêtre qu'elle vient d'ouvrir en grand alors qu'il est tôt.\n\n« Faites ce que mon oncle vous a demandé, et faites-le correctement, sans économiser votre peine. Je ne tiens pas à devoir expliquer aux trois adultes de cette maison que j'ai payé le Prix pour un homme qui a bâclé. »\n\nElle sort sans se retourner, et il n'y a rien à en conclure : elle a des comptes à faire, c'est mardi." },
  ],
  effets:{ flags:['px_nuit','px_liaison','a2_prix_paye','a2_liaison_verneuil','px_une_fois'],
           suspicion:9,
           faire:() => { PRIX().liaisons.push('sibylle');
                         retenir('caleb', "une maison de la vallée a payé le Sang, ce qui se sait et se compte"); },
           exploit:{ eclat:6, temoins:'quelques', quoi:"le Prix du Paria, honoré dans sa forme pleine" },
           marque:"Verneuil a payé le Sang. Elle voulait un actif, et quatre ans de rien.",
           court:"Quatre ans" },
  plusTard:"Une maison qui a payé le Sang figure dans les conversations de trois provinces pendant vingt ans, et ses petits-enfants l'entendent.",
  suite:'px_apres', libelleSuite:"La suite" },

/* — LA CADETTE. Rien à administrer, quarante ans devant elle, et l'envie
     dite sans décoration. */
px_alix:{
  qui:'alix',
  lieu:"Bragelonne · la galerie",
  titre:"Elle n'a pas de compte à tenir",
  texte:[
    "Vingt-quatre ans, deux frères aînés, et rien du tout à administrer — ce qui, dans une maison qui va bien, est une condition très particulière.",
    { sobre:"On n'a pas eu à la faire venir.",
      intense:"On n'a pas eu à la faire venir : elle attendait dans la galerie, et il est clair qu'elle savait ce qui se dirait dans le cabinet avant votre arrivée.",
      extreme:"On n'a pas eu à la faire venir. Elle attendait dans la galerie, appuyée au chambranle, et il est parfaitement clair qu'elle savait ce qui allait se dire dans le cabinet de son père avant même que vous mettiez pied à terre dans la cour.\n\nUne maison de province n'a aucun secret pour ses cadettes : ce sont les seules à avoir le temps d'écouter." },
    "« Il a mis quarante minutes à me le dire. Il aurait pu mettre quatre. »",
    "@« Il ne voulait pas le dire. »",
    "« Personne ne veut le dire. C'est une coutume conçue pour que personne ne veuille la dire. » Elle hausse une épaule. « J'ai vingt-quatre ans, messire. On m'a expliqué le Prix du Paria à onze. »",
    "§ Elle n'a ni feuillet, ni état, ni calcul.",
    { sobre:"^« Je ne vais rien vous vendre. »",
      intense:"^« Je ne vais rien vous vendre et je n'ai rien à défendre. » Elle marche jusqu'à la fenêtre. « Mes frères ont les terres, ma sœur a un contrat de mariage depuis ses quinze ans, et moi j'ai une chambre au bout d'une galerie et quarante ans devant moi. »",
      extreme:"^« Je ne vais rien vous vendre et je n'ai strictement rien à défendre : ni domaine, ni charge, ni avenir qu'un enfant viendrait consolider. Vous n'aurez pas droit à l'état de fermage. »\n\nElle marche jusqu'à la fenêtre de la galerie et regarde la cour.\n\n« Mes deux frères ont les terres. Ma sœur a un contrat de mariage signé depuis ses quinze ans, avec onze pages de clauses qu'elle n'a jamais lues. Et moi j'ai une chambre au bout de cette galerie, une rente de veuve sans avoir été mariée, et quarante ans devant moi dans lesquels il n'arrivera rigoureusement rien. »" },
    "@« Alors pourquoi ? »",
    "§ Elle se retourne, et elle ne prend aucun détour.",
    { sobre:"^« Parce que j'en ai envie. »",
      intense:"^« Parce que j'en ai envie. » Elle soutient le regard sans effort. « C'est tout. Ça vous suffit ou ça ne vous suffit pas, mais ne cherchez rien d'autre : il n'y a rien d'autre. »",
      extreme:"^« Parce que j'en ai envie. »\n\nElle soutient le regard sans le moindre effort et sans une once de provocation, ce qui est infiniment plus déstabilisant que si elle en avait mis.\n\n« C'est tout. Pas de calcul, pas de dette de maison, pas d'enfant à produire, pas de courbe à redresser. J'ai vu passer un homme dont trois provinces racontent des choses, mon père doit une coutume, et j'en ai envie. Ça vous suffit ou ça ne vous suffit pas — mais ne cherchez rien derrière, vous ne trouverez rien, et vous allez me faire perdre le peu de nerf qu'il m'a fallu pour descendre cette galerie. »" },
    "@« On vous a poussée ? »",
    { sobre:"« Mon père a essayé de m'en dissuader pendant vingt minutes. »",
      intense:"« Mon père a passé vingt de ses quarante minutes à tenter de m'en dissuader. » Premier vrai sourire. « Il m'a proposé de payer l'or lui-même, sur sa cassette. Je lui ai dit non deux fois. »",
      extreme:"« Mon père a passé vingt de ses quarante minutes à tenter de m'en dissuader, et les vingt autres à me décrire ce qu'on dirait de moi dans la vallée. »\n\nPremier vrai sourire de la soirée.\n\n« Il m'a proposé de payer l'or lui-même, de sa propre cassette, pour que la question ne se pose pas. Je lui ai dit non deux fois, et la seconde assez fort pour que la cuisine entende. Alors non, messire : personne ne m'a poussée. On a fait tout ce qu'on a pu dans l'autre sens. »" },
  ],
  choix:[
    { t:"Rester",
      detail:"elle a été très claire · elle déteste qu'on ajoute",
      risque:"définitif", definitif:true, va:'px_nuit_alix' },
    { t:"« Vous savez ce qu'on dira de vous. »",
      detail:"le poser une fois, en face · vingt-quatre ans et quarante devant elle",
      risque:"calculé", va:'px_alix_dira' },
  ],
},

px_alix_dira:{
  qui:'alix',
  titre:"Ce qu'on dira",
  texte:[
    "@« Vous savez ce qu'on dira de vous. »",
    { sobre:"« Mot pour mot. »",
      intense:"« Mot pour mot. Je pourrais vous l'écrire ce soir, et vous vérifieriez dans six mois. »",
      extreme:"« Mot pour mot. » Elle ne se départ pas. « Je pourrais vous l'écrire ce soir, mettre le papier sous scellé, et vous le feriez ouvrir dans six mois pour vérifier. Je me trompe rarement là-dessus : j'ai eu vingt-quatre ans pour écouter ce qu'on dit des femmes de cette vallée, et il n'y a que quatre phrases en circulation. Elles servent pour tout le monde. »" },
    "@« Et ça ne compte pas ? »",
    "« Bien sûr que ça compte. » Elle s'assoit sur le rebord. « Ça comptera deux ans, ça deviendra une plaisanterie pendant trois, et ensuite je serai une femme de trente ans dont on a dit quelque chose il y a longtemps. C'est un coût. Je l'ai chiffré. »",
    "@« Vous venez de dire que vous ne calculiez rien. »",
    { sobre:"« J'ai dit que je n'avais rien à vendre. Ce n'est pas pareil. »",
      intense:"« J'ai dit que je n'avais rien à *vous* vendre. Je n'ai pas dit que j'étais idiote. » Franchement amusée. « J'ai calculé ce que ça me coûte et j'ai décidé que ça les valait. C'est ça, vouloir quelque chose : ce n'est pas ignorer le prix. »",
      extreme:"« J'ai dit que je n'avais rien à *vous* vendre. Je n'ai jamais dit que j'étais idiote, et ce serait bien la première fois qu'on me le reprocherait dans cette maison. »\n\nElle a l'air franchement amusée, ce qui est pire.\n\n« Évidemment que j'ai calculé ce que ça me coûte : deux ans de vallée, une réputation, et un contrat de mariage qui aurait pu être un peu meilleur dans huit ans. J'ai fait le compte et j'ai décidé que ça les valait. C'est ça, vouloir quelque chose. Ce n'est pas ignorer le prix — n'importe qui peut vouloir en ignorant le prix, ça n'a aucun mérite. »" },
    "§ Elle vous regarde un instant de trop.",
    "^« Autre chose ? Je vous préviens : il m'a fallu un certain courage pour descendre cette galerie, et il ne durera pas toute la nuit. »",
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
    { sobre:"Elle pousse le verrou derrière elle.",
      intense:"Elle pousse le verrou — ce qui, dans une maison de vingt personnes avec deux frères aînés, est la décision de la soirée, et pas ce qui suit.",
      extreme:"Elle pousse le verrou derrière elle, et il faut mesurer ce que c'est.\n\nDans une maison de vingt personnes, avec deux frères aînés, une mère et un domestique qui dort au bout du couloir, un verrou tiré à cette heure-là est un fait que trois personnes auront constaté avant l'aube. C'est la vraie décision de la soirée. Elle est prise. Ce qui suit n'est plus une décision." },
    "Elle est nerveuse et elle ne le cache pas, ce qui est infiniment plus honnête que le contraire.",
    { sobre:"Puis elle cesse de l'être.",
      intense:"Puis elle cesse de l'être, assez vite, et ce qui reste est une femme de vingt-quatre ans qui voulait ça depuis un moment et qui n'a plus aucune raison de faire comme si non.",
      extreme:"Puis elle cesse de l'être, assez vite et sans transition nette.\n\nCe qui reste est une femme de vingt-quatre ans qui voulait ça depuis assez longtemps pour y avoir pensé en détail, qui n'a plus la moindre raison de faire semblant du contraire, et qui découvre avec une franchise déconcertante qu'elle n'a aucune envie d'être délicate." },
    "§ Elle demande des choses. Elle en refuse d'autres, aussi nettement, sans que ça ait l'air de coûter à personne.",
    "Elle a la peau chaude, elle griffe sans s'en apercevoir, et elle rit deux fois dans la nuit — franchement, pas du tout à voix basse, ce qui est un problème de maison et pas un problème de chambre.",
    { sobre:"Au matin elle est de très bonne humeur.",
      intense:"Au matin elle est de franchement bonne humeur, ce à quoi rien ne vous avait préparé, et elle n'a pas la moindre intention de s'excuser auprès de qui que ce soit.",
      extreme:"Au matin elle est de franchement bonne humeur — ce à quoi rien, dans dix ans de contrats, ne vous avait préparé — et elle n'a pas la plus petite intention de s'excuser auprès de qui que ce soit, ni ce matin ni jamais.\n\nElle prend son temps. Elle ouvre les volets en grand alors qu'il est tôt et que la cour est pleine." },
    "@« Vous allez avoir des ennuis. »",
    "« J'ai déjà des ennuis. Ils commencent en bas de l'escalier et ils dureront deux ans. » Elle attache sa robe. « Je vous ai dit que j'avais chiffré. »",
    "§ Elle s'arrête à la porte.",
    { sobre:"^« Ne m'écrivez pas. »",
      intense:"^« Ne m'écrivez pas. Une lettre ferait de cette histoire une autre histoire, et je tiens beaucoup à celle-ci telle qu'elle est. »",
      extreme:"^« Ne m'écrivez pas. »\n\nElle le dit sans dureté, en tirant le verrou.\n\n« Une lettre ferait de cette nuit autre chose. Cette autre chose est très bien pour les gens à qui elle arrive, mais ce n'est pas ce que j'ai voulu et je n'en ai pas envie. Je tiens beaucoup à celle-ci exactement telle qu'elle est : une nuit que j'ai décidée, dont j'ai payé le prix d'avance, et dont personne ne pourra jamais me dire qu'on me l'a arrangée. »" },
  ],
  effets:{ flags:['px_nuit','px_liaison','a2_prix_paye','a2_liaison_bragelonne','px_une_fois'],
           suspicion:11,
           faire:() => { PRIX().liaisons.push('alix');
                         retenir('caleb', "Bragelonne a payé le Sang et la cadette n'en fait pas mystère"); },
           exploit:{ eclat:5, temoins:'quelques', quoi:"une cadette de Bragelonne a tiré un verrou" },
           marque:"« Ne m'écrivez pas. Ça ferait de cette histoire une autre histoire. »",
           court:"Le verrou" },
  suite:'px_apres', libelleSuite:"La suite" },

/* — L'ÉPOUSE. Mariée à onze ans à un homme qui ne peut pas lui faire
     d'héritier, et qui le sait. C'est lui qui l'envoie. Elle vient. */
px_mahaut:{
  qui:'mahaut',
  lieu:"Tourvieille · le cabinet du bas",
  titre:"Ce que son mari lui a demandé",
  texte:[
    "Dame Mahaut de Tourvieille a trente et un ans. Elle est mariée depuis vingt à Gilles de Tourvieille, qui en a cinquante-huit.",
    { sobre:"C'est lui qui vous reçoit d'abord, et c'est lui qui a stipulé.",
      intense:"C'est lui qui vous a reçu, c'est lui qui a stipulé le Prix entier, et c'est lui qui, à la fin de l'entretien, a dit une phrase que vous n'attendiez pas : *« Ma femme viendra vous voir. »*",
      extreme:"C'est lui qui vous a reçu. C'est lui qui a stipulé le Prix entier sans qu'on le lui demande, ce qui ne se fait pas. Et c'est lui qui, à la fin de l'entretien, a dit d'une voix parfaitement égale une phrase que vous n'attendiez pas :\n\n*« Ma femme viendra vous voir ce soir. Ne lui parlez pas de moi. »*" },
    "§ Elle vient à neuf heures, seule, sans se cacher, en traversant la cour devant six domestiques.",
    "« Il vous a dit de ne pas lui parler de lui. »",
    "@« Oui. »",
    "« Alors je vais en parler, moi, une fois, et on n'y reviendra pas. »",
    { sobre:"« Vingt ans. Aucun enfant. Ce n'est pas de moi que ça vient. »",
      intense:"« Vingt ans de mariage. Aucun enfant. » Elle s'assoit sans qu'on l'y invite. « Ce n'est pas de moi que ça vient, et il le sait depuis douze ans parce qu'il y a une fille à Sorgues qui a été très claire là-dessus avant de mourir. »",
      extreme:"« Vingt ans de mariage. Aucun enfant. »\n\nElle s'assoit sans qu'on l'y invite, avec l'aisance d'une femme qui est chez elle.\n\n« Ce n'est pas de moi que ça vient. Il le sait depuis douze ans, précisément, parce qu'il y avait une fille à Sorgues qui a été très claire sur la question avant de mourir en couches d'un enfant qui n'était pas de lui non plus. Il a payé, il a enterré, il a compris, et depuis douze ans il n'a plus jamais posé la main sur moi. »" },
    "@« Et il vous envoie. »",
    { sobre:"« Il ne m'envoie pas. Il a stipulé. C'est différent. »",
      intense:"« Il ne m'envoie pas : il a stipulé le Prix entier, ce qui n'est pas la même chose. » Elle a un geste bref. « Une maison qui stipule honore, et il a soixante ans et une branche cadette qui compte les jours. »",
      extreme:"« Il ne m'envoie pas. Il a stipulé le Prix entier, ce qui n'est pas la même chose, et vous verrez que la nuance a beaucoup occupé cet homme. »\n\nElle a un geste bref.\n\n« Une maison qui stipule honore. Il a cinquante-huit ans, une branche cadette qui compte les jours, et un domaine qui passera à un neveu qu'il méprise depuis trente ans. Il a réfléchi pendant deux hivers et il a trouvé la seule combinaison où sa maison garde ses terres et où personne n'a rien à lui reprocher : la coutume. On ne peut pas accuser un homme d'honorer une coutume. »" },
    "§ « Voilà pour lui. On n'en reparle plus. »",
    "@« Et vous ? »",
    { sobre:"Elle met un temps.",
      intense:"Elle met un temps — le premier — et quand elle reprend, ce n'est plus du tout le même dossier.",
      extreme:"Elle met un temps. Le premier depuis qu'elle est entrée, et il dure. Quand elle reprend, ce n'est plus du tout le même dossier qu'elle plaide, et elle le sait, et elle a manifestement décidé d'y aller quand même." },
    { sobre:"« J'ai été mariée à onze ans. »",
      intense:"« J'ai été mariée à onze ans à un homme qui en avait trente-huit. Ce n'est pas une plainte : ça se faisait, ça se fait encore, et deux de mes cousines ont eu pire. »",
      extreme:"« J'ai été mariée à onze ans à un homme qui en avait trente-huit. »\n\nElle le dit sans une once d'apitoiement, ce qui rend la chose beaucoup plus difficile à entendre.\n\n« Ce n'est pas une plainte. Ça se faisait, ça se fait encore, deux de mes cousines ont eu pire, et Gilles n'a jamais été cruel — il a été absent, ce qui est une autre affaire et pas forcément une meilleure. »" },
    { sobre:"« J'ai trente et un ans et je n'ai jamais rien choisi. »",
      intense:"« J'ai trente et un ans. Je n'ai jamais choisi une seule chose de ma vie. Pas mon nom, pas ma maison, pas mon mari, pas une seule des trois cent soixante-cinq journées d'aucune de mes vingt années. »",
      extreme:"« J'ai trente et un ans, messire, et je n'ai jamais rien choisi de ma vie. Pas mon nom, pas ma maison, pas mon mari, pas une seule des trois cent soixante-cinq journées d'aucune de mes vingt dernières années. On m'a mariée, on m'a installée, on m'a expliqué mes devoirs, et j'ai été très convenable. »\n\nElle relève la tête.\n\n« Et voilà que la seule chose qu'on me laisse décider dans une vie entière, c'est celle-là. C'est grotesque. J'y ai pensé toute la semaine et je n'arrive pas à décider si c'est grotesque ou si c'est une chance. »" },
    "@« Vous pouvez ne pas décider ce soir. »",
    { sobre:"« Si. Justement. Je peux décider. »",
      intense:"« Si. » Elle se lève. « C'est exactement ce que je viens de vous dire : je *peux* décider. Une fois. C'est la première et il n'y en aura pas d'autre, et vous voudriez que je la remette à plus tard ? »",
      extreme:"« Si. »\n\nElle se lève, et pour la première fois de la soirée il y a quelque chose de sec dans sa voix.\n\n« C'est très exactement ce que je viens de passer un quart d'heure à vous dire : je *peux* décider. Une fois. Dans une vie. C'est la première et il n'y en aura pas d'autre — et vous, vous voudriez que je la remette à plus tard, par délicatesse, pour que vous vous sentiez mieux ? »\n\nUn temps.\n\n« Non, messire. Ce soir. »" },
  ],
  choix:[
    { t:"Rester",
      detail:"elle a passé la semaine à décider · c'est décidé",
      risque:"définitif", definitif:true, va:'px_nuit_mahaut' },

    { t:"« Et l'enfant, si enfant il y a ? »",
      detail:"il portera Tourvieille · et un homme de cinquante-huit ans le sait déjà",
      risque:"calculé", va:'px_mahaut_enfant' },
  ],
},

px_mahaut_enfant:{
  qui:'mahaut',
  titre:"Il portera Tourvieille",
  texte:[
    "@« Et l'enfant, si enfant il y a ? »",
    "« Il portera Tourvieille et Gilles le reconnaîtra le jour même. »",
    "@« Sans un mot ? »",
    { sobre:"« Sans un mot. Il a écrit l'acte il y a trois semaines. »",
      intense:"« Sans un mot. » Elle sort un pli de sa manche. « Il a fait dresser l'acte de reconnaissance il y a trois semaines, en blanc, sans date et sans nom. Il attendait de savoir s'il y aurait quelqu'un à mettre dedans. »",
      extreme:"« Sans un mot, et il l'a préparé. »\n\nElle sort un pli de sa manche et le pose sur la table sans l'ouvrir.\n\n« Il a fait dresser l'acte de reconnaissance il y a trois semaines, par son propre notaire, en blanc : sans date, sans nom, sans prénom. Il attendait simplement de savoir s'il y aurait un jour quelqu'un à mettre dedans. » Un temps. « Voilà l'homme que j'ai épousé à onze ans. Il n'est pas cruel. Il est **méthodique**, et je ne sais toujours pas, après vingt ans, si c'est mieux ou si c'est pire. »" },
    "§ « Et si l'enfant porte ce que vous portez ? »",
    "@« Un sur trois naît sans. »",
    { sobre:"« Deux sur trois, alors. Il y a compté. »",
      intense:"« Deux sur trois, donc. » Elle range le pli. « Il y a compté, croyez-moi. Une branche cadette qui compte les jours réfléchit à deux fois avant de contester l'héritage d'un enfant dont on raconte des choses. »",
      extreme:"« Deux sur trois, donc. »\n\nElle range le pli dans sa manche.\n\n« Il y a compté, croyez-moi, il compte tout. Une branche cadette qui attend depuis trente ans réfléchit à deux fois avant de contester l'héritage d'un enfant dont on raconte des choses dans la vallée. Gilles ne veut pas un héritier, messire : il veut un héritier **qu'on n'attaque pas**. Ce n'est pas la même commande et ça explique pourquoi il a choisi un Paria plutôt qu'un cousin discret. »" },
    "@« Vous approuvez ? »",
    "« Je trouve ça d'un cynisme parfait. » Elle hausse les épaules. « Et ça me convient, parce que pour une fois, ce qui l'arrange et ce que je veux sont la même chose, et ça n'était jamais arrivé en vingt ans. »",
  ],
  effets:{ flags:['px_mahaut_acte'],
           marque:"L'acte de reconnaissance est écrit en blanc depuis trois semaines. « Il n'est pas cruel. Il est méthodique. »",
           court:"L'acte en blanc" },
  suite:'px_nuit_mahaut', libelleSuite:"Rester" },

px_nuit_mahaut:{
  qui:'mahaut',
  lieu:"Tourvieille · la chambre d'hôte",
  titre:"La première fois qu'elle décide",
  texte:[
    { sobre:"Elle ne se cache pas et ne se presse pas.",
      intense:"Elle ne se cache pas, ne se presse pas, ne baisse pas la voix dans le couloir. Six domestiques l'ont vue traverser la cour ; elle n'a aucune intention de faire semblant maintenant.",
      extreme:"Elle ne se cache pas et ne se presse pas. Elle ne baisse pas la voix dans le couloir, ne referme pas la porte sans bruit, ne fait rien de ce qu'on fait quand on a honte.\n\nSix domestiques l'ont vue traverser la cour à neuf heures. Elle n'a pas la moindre intention de faire semblant maintenant, et c'est manifestement délibéré : c'est même, en soi, la chose qu'elle a décidée." },
    { sobre:"Elle est maladroite au début et ça ne la gêne pas.",
      intense:"Elle est maladroite au début — vingt ans d'un mariage où il ne s'est presque rien passé, et douze où il ne s'est rien passé du tout — et ça ne la gêne pas une seconde. Elle demande. Elle recommence.",
      extreme:"Elle est maladroite au début, et il faut savoir de quoi c'est fait : vingt ans d'un mariage où il ne s'est presque rien passé, dont douze où il ne s'est rien passé du tout, et rien avant, et rien à côté.\n\nÇa ne la gêne pas une seconde. Elle demande comment. Elle recommence. Elle rit une fois d'elle-même, brièvement, et elle continue — et il y a dans cette absence totale de honte quelque chose de beaucoup plus troublant que n'importe quelle audace." },
    "§ Puis elle cesse d'être maladroite, et ce qui vient ensuite ne ressemble à rien de ce qui a été dit en bas.",
    { sobre:"Elle a trente et un ans et elle rattrape vingt années en une nuit.",
      intense:"Elle a trente et un ans et elle est affamée d'une façon qui n'a rien à voir avec vous : c'est vingt ans qui remontent d'un coup, et elle le sait, et elle ne s'en excuse pas.",
      extreme:"Elle a trente et un ans et elle est affamée d'une manière qui n'a presque rien à voir avec vous — c'est vingt années qui remontent en une nuit, elle en est parfaitement consciente, elle vous le dit même à un moment, à voix basse, contre votre bouche, et elle ne s'en excuse pas une seconde.\n\nElle est bruyante. Elle laisse la chandelle allumée. Elle regarde." },
    "Vers trois heures, dans le noir, sans transition :",
    "« Personne ne m'a jamais demandé si j'avais envie de quelque chose. »",
    "@« De rien ? »",
    { sobre:"« De rien. En vingt ans. »",
      intense:"« De rien du tout. En vingt ans. Ni d'un plat, ni d'une robe, ni d'un voyage, ni de ça. On m'a demandé si j'étais souffrante, une fois, quand j'ai eu la fièvre. »",
      extreme:"« De rien du tout. En vingt ans. »\n\nUn temps.\n\n« Ni d'un plat, ni d'une robe, ni d'un voyage, ni d'un livre, ni de ça. On m'a demandé si j'étais souffrante, une fois, l'année de la fièvre, et je me rappelle très précisément le jour parce que c'était une question sur moi. »\n\nElle se retourne dans le noir.\n\n« Vous, vous m'avez proposé de ne pas décider ce soir. C'était idiot et c'était la deuxième. »" },
    "§ Au matin elle traverse la cour dans l'autre sens, devant les mêmes six domestiques, sans presser le pas.",
    { sobre:"Gilles de Tourvieille ne dit rien. Il paie.",
      intense:"Gilles de Tourvieille ne dit rien du tout. Il fait compter trois cent vingt couronnes devant vous, il vous remercie de votre diligence sur le contrat, et il ne pose aucune question.",
      extreme:"Gilles de Tourvieille ne dit rien du tout. Il fait compter trois cent vingt couronnes devant vous, sur sa propre table, en pièces neuves. Il vous remercie de votre diligence sur le contrat en trois phrases correctes. Il ne pose aucune question, ne fait aucune allusion, et vous raccompagne jusqu'à la cour.\n\nSur le seuil, il regarde un moment quelque chose derrière vous et il dit, sans changer de ton : « Elle a ri. Hier soir. Je l'ai entendue d'en bas. » Puis il rentre." },
  ],
  effets:{ or:0, flags:['px_nuit','px_liaison','a2_prix_paye','a2_liaison_tourvieille','px_une_fois'],
           suspicion:13,
           faire:() => { PRIX().liaisons.push('mahaut');
                         retenir('caleb', "Tourvieille a stipulé le Prix entier de lui-même, ce qui veut dire qu'il n'a plus d'héritier"); },
           exploit:{ eclat:7, temoins:'quelques', quoi:"une épouse de Tourvieille a traversé la cour deux fois" },
           marque:"« Personne ne m'a jamais demandé si j'avais envie de quelque chose. » — « Elle a ri. Je l'ai entendue d'en bas. »",
           court:"Elle a ri" },
  plusTard:"Un acte de reconnaissance dort en blanc dans une manche, sans date et sans nom.",
  suite:'px_apres', libelleSuite:"La suite" },

/* ══ CE QUE ÇA DEVIENT ═══════════════════════════════════════════════════ */
px_apres:{
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  titre:"Ce qu'une liaison fait dans une province",
  texte:[
    "Une liaison de Prix n'est ni secrète ni publique : elle est **sue**, ce qui est un troisième état que seules les provinces savent produire.",
    { sobre:"Personne n'en parle devant vous. Tout le monde en parle.",
      intense:"Personne n'en parlera jamais devant vous. Tout le monde en parle. Et ce qui change est parfaitement concret, dans les deux sens.",
      extreme:"Personne n'en parlera jamais devant vous. Tout le monde en parle.\n\nEt ce qui change est parfaitement concret, dans les deux sens à la fois — c'est la part que les récits ne rendent jamais. Une maison qui a payé le Sang ne peut plus vous traiter en fournisseur. C'est une alliance autant qu'une plaie." },
    "**Chez les maisons humaines.** On vous reçoit moins bien et on vous paie mieux. Un homme qui a réclamé le Prix connaît ses droits, et un homme qui connaît ses droits coûte cher.",
    "**Chez les Parias.** Le mot passe en trois semaines par des chemins que vous ne connaissez pas. Un des quarante et un vous fait porter quelque chose sans explication : une bourse, une information, ou rien qu'un signe.",
    "**Au bailliage.** Rien. La coutume n'est écrite nulle part, donc elle ne s'instruit pas.",
    () => a('a2_alycia_epouse') || a('ml_signe') || a('ml_termes')
      ? "§ Alycia l'apprend par le réseau, avant vous, comme tout le reste.\n\nElle ne fait pas de scène — elle n'en a jamais fait. Elle dit une phrase, un soir, sans lever les yeux : « C'est votre droit et je ne le discute pas. La prochaine fois, vous me le direz avant. Sinon je l'apprendrai comme les autres et je le prendrai comme les autres. »"
      : "§ Il n'y a personne à qui l'expliquer, ce qui rend les choses plus simples et pas meilleures.",
    { sobre:"Et il y a la question qu'on ne pose pas.",
      intense:"Reste la question qu'on ne pose pas et qui met des mois à se répondre. Une maison qui a un enfant du Prix ne l'annonce pas : elle a un enfant, voilà tout, et il porte son nom à elle.",
      extreme:"Reste la question qu'on ne pose pas et qui met des mois à se répondre.\n\nUne maison qui a un enfant du Prix ne l'annonce évidemment pas. Elle a un enfant, voilà tout : il porte son nom à elle, il est inscrit à son registre à elle, personne n'a rien à ajouter. On l'apprend par recoupement — une date, un baptême, un silence bien tenu — des années plus tard, ou jamais.\n\nCertains Parias en ont onze dans quatre provinces et n'en ont jamais vu un seul." },
  ],
  effets:{ flags:['px_apres','a2_liaison'],
           faire:() => { ETAT.renom += 6;
                         if(typeof bouger === 'function' && (a('ml_signe') || a('a2_alycia_epouse')))
                           bouger('alycia', { confiance:-3 }); },
           marque:"La liaison est sue : ni secrète ni publique. On vous reçoit moins bien et on vous paie mieux.",
           court:"Sue" },
  suite:'a2_carte', libelleSuite:"La carte" },

};

enregistrerScenes(PRIX_SCENES);

Object.assign(GENS, {
  verneuil: { nom:"Sire Gaucher de Verneuil", role:"soixante et un ans · quatre fermes et un moulin en indivision", lettre:"G" },
  sibylle:  { nom:"Dame Sibylle de Verneuil", role:"vingt-neuf ans · veuve · elle tient les comptes", lettre:"S" },
  alix:     { nom:"Dame Alix de Bragelonne",  role:"vingt-quatre ans · cadette · rien à administrer", lettre:"A" },
  mahaut:   { nom:"Dame Mahaut de Tourvieille", role:"trente et un ans · mariée depuis vingt à un homme qui en a cinquante-huit", lettre:"M" },
});

DYN.px_elle = () => {
  const d = dameDuJour();
  aller(d.mobile === 'desir' ? 'px_alix' : d.mobile === 'mariee' ? 'px_mahaut' : 'px_sibylle');
};

offrir({ id:'px_termes', lieu:'cendrepont', va:'px_termes',
         titre:"Une maison vous fait demander",
         si:() => !a('px_termes') && ETAT.renom >= 20 });

entree2('px_sibylle', 'px_alix', 'px_mahaut');
