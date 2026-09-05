/* PARIAS — Acte II · LES TROIS HOMMES, ET LA NUIT
 * ═══════════════════════════════════════════════════════════════════════
 * Charles de Mont-Draken n'est pas un méchant : c'est un homme qui fait son
 * métier, et son métier est de protéger les hommes de ce qui n'en est pas.
 * Lucius veut des soutiens. Caleb compte ses concurrents.
 *
 * Aucun des trois n'a tort sur les faits. C'est ce qui rend cet acte
 * difficile à traverser proprement.
 * ═══════════════════════════════════════════════════════════════════════ */

const GENS2 = {

/* ══ CHARLES DE MONT-DRAKEN ══════════════════════════════════════════════ */
acte_charles:{
  qui:'charles',
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  titre:"Il vient lui-même",
  texte:[
    "Il ne fait pas envoyer. Il vient, avec quatre hommes qui restent dehors, et il entre dans la salle commune d'un relais comme entre un homme qui a payé la salle pour la soirée — parce qu'il l'a payée.",
    { sobre:"Charles de Mont-Draken a cinquante-trois ans, et il est exactement de la taille de sa réputation.",
      intense:"Charles de Mont-Draken a cinquante-trois ans, et il est très exactement de la taille de sa réputation — ce qui est la mauvaise nouvelle, parce qu'on espère toujours qu'elle soit exagérée.\n\nIl est venu à cheval. Trois relais l'ont remarqué : quand le prince de Mont-Draken se déplace à cheval, c'est qu'il a décidé que ce n'était pas une affaire de guerre.",
      extreme:"Charles de Mont-Draken a cinquante-trois ans, et il est très exactement de la taille de sa réputation.\n\nC'est la mauvaise nouvelle. On espère toujours qu'une réputation soit exagérée ; celle-là ne l'est pas, et il suffit de le voir traverser une salle basse pour comprendre qu'aucun des récits qu'on rapporte sur lui n'a eu besoin d'être arrangé.\n\nIl est venu à cheval, et trois relais de la Route Grise l'ont noté, parce que dans quatre provinces on sait ce que ça veut dire. Quand le prince de Mont-Draken se déplace à cheval, c'est qu'il a décidé d'avance que ce n'était pas une affaire de guerre.\n\nCe qui est resté à Mont-Draken est ce que tout le monde regarde sans en parler." },
    "« Je ne suis pas venu vous prendre. Si j'étais venu vous prendre, il y aurait vingt hommes et un magistrat, et ce serait à quatre heures du matin. »",
    "« Pourquoi, alors ? »",
    { sobre:"« Parce que six de mes hommes ne sont pas rentrés d'une crypte. »",
      intense:"« Parce que six de mes hommes ne sont pas rentrés d'une crypte, et que quatre d'entre eux, d'après le seul qui soit revenu, sont morts sans une blessure. » Il s'assied sans qu'on l'invite. « Je forme des hommes depuis vingt-deux ans à tuer ce qui n'est pas humain. Je veux savoir ce qui a tué les miens. »",
      extreme:"« Parce que six de mes hommes ne sont pas rentrés d'une crypte, et que quatre d'entre eux sont morts sans une blessure — pas une entaille, pas un os, rien. » Il s'assied sans qu'on l'invite et pose ses deux mains à plat sur la table.\n\nLa gauche est brûlée du poignet au petit doigt. Une brûlure ancienne, plate, régulière, sans un pli : ce n'est pas du feu. C'est ce que fait une lanière de harnais quand elle chauffe et qu'on ne la lâche pas.\n\n« Je forme des hommes depuis vingt-deux ans à tuer ce qui n'est pas humain. J'en ai enterré cent quatorze. Je connais le nom des cent quatorze et la façon dont chacun est mort, et il y en a quatre pour lesquels je n'ai pas de ligne à écrire. Ça m'empêche de dormir depuis Germinal. »" },
    "§ Il ne ment pas. C'est ce qui est le plus difficile à absorber chez lui.",
    "@« Ce n'était pas moi. »",
    "« Je sais. Bérold me l'a dit et Bérold ne se trompe pas. » Il fait tourner un gobelet qu'il ne boit pas. « Ce que Bérold m'a dit, c'est que la maison a refusé qu'ils soient là. Voilà exactement ses mots, et il a mis onze jours à les trouver. »",
    "« Et vous en concluez quoi ? »",
    "« Que ce que vous êtes est plus vieux et plus grand que ce que je croyais, et que je n'ai formé personne à ça. »",
    "Un temps.",
    "« Je vais vous poser une seule question, messire, et je vous demande d'y répondre sans rien préparer. »",
    "« Posez. »",
    "§ « Est-ce que vous en avez tué ? Des gens. Pas au combat : avec **ça**. »",
  ],
  choix:[
    { t:"« Oui. »",
      si:() => a('as_onde_salle') || a('a2_onde_publique') || a('kar_escalier_bouche') || a('wy_morte_onde'),
      detail:"C'est vrai · il le sait probablement · et mentir à cet homme-là ne rapporte rien",
      va:'ch_oui' },
    { t:"« Non. »",
      detail:"Vrai ou faux selon ce que vous avez fait · il n'a aucun moyen de vérifier",
      va:'ch_non' },
    { t:"« Vous en avez tué combien, vous ? »",
      detail:"Cent quatorze enterrés d'un côté · et de l'autre, un chiffre qu'il ne tient pas",
      risque:"dangereux",
      test:{ carac:'presence', comp:null, dc:12, manoeuvre:'charles' },
      degres:{ dominante:'ch_retour_dom', couteuse:'ch_retour_cout', echec:'ch_non' } },
  ],
},

ch_oui:{
  qui:'charles',
  texte:[
    "@« Oui. »",
    { sobre:"Il hoche la tête. Il ne se lève pas.",
      intense:"Il hoche la tête, une fois, et il ne se lève pas et il n'appelle personne. Il reste assis avec son gobelet et il regarde la table pendant un temps déraisonnable.\n\n« Merci. »",
      extreme:"Il hoche la tête une fois. Il ne se lève pas, il n'appelle personne, il ne pose pas la main sur quoi que ce soit. Il reste assis avec son gobelet et il regarde le bois de la table pendant un temps déraisonnable — trente secondes, peut-être quarante, ce qui est très long entre deux hommes qui ne se parlent pas.\n\n« Merci. »" },
    "« Vous me remerciez. »",
    "« Vous venez de me rendre mon métier. » Il se lève enfin. « Depuis Germinal je me demandais si j'avais passé vingt-deux ans à former des hommes contre des gens. C'est une question qui use. »",
    "« Et maintenant ? »",
    "« Maintenant je sais que vous tuez, ce qui fait de vous un danger, ce qui fait de moi quelqu'un qui a raison, et je vais très bien dormir. »",
    "§ Il n'y a aucune ironie là-dedans et c'est ce qui rend la chose insupportable.",
    "« Vous auriez préféré quoi ? » demandez-vous.",
    "« Que vous mentiez. » Il remet son manteau. « J'aurais eu un doute à traîner. Un doute, ça oblige à réfléchir, et je n'ai plus le temps de réfléchir : j'ai une commission, vingt hommes, et une marche qui n'a plus de frontière. »",
  ],
  effets:{ flags:['ch_avoue','a2_montdraken_certain'], suspicion:15,
           faire:() => retenir('charles', "vous lui avez dit oui, et il a dormi"),
           marque:"Charles de Mont-Draken vous a demandé si vous aviez tué avec ça. Vous avez dit oui.",
           court:"Il dort" },
  suite:'a2_saison', libelleSuite:"Il sort" },

ch_non:{
  qui:'charles',
  texte:[
    "@« Non. »",
    { sobre:"Il vous regarde longtemps et il ne dit pas s'il vous croit.",
      intense:"Il vous regarde longtemps et il ne dit pas s'il vous croit, ce qui est le pire de tout : un homme qui vous croit vous laisse tranquille, un homme qui ne vous croit pas vous arrête, et un homme qui ne dit rien vous met dans une colonne dont vous ne connaîtrez jamais le titre.",
      extreme:"Il vous regarde longtemps et il ne dit pas s'il vous croit. C'est le pire de tout : un homme qui vous croit vous laisse tranquille, un homme qui ne vous croit pas vous arrête, et un homme qui ne dit rien vous range dans une colonne dont vous ne connaîtrez jamais le titre. Il a vingt-deux ans d'habitude et il ne fait plus ça exprès." },
    "« Bien. »",
    "Il se lève. Il remet son manteau, il paie la salle qu'il avait déjà payée, et il s'arrête à la porte.",
    "« Je vais vous dire une chose que je ne devrais pas et que vous ne pourrez pas utiliser. »",
    "« Dites. »",
    "§ « La liste ne vient pas de nous. Elle nous est arrivée, et je n'ai jamais su d'où, et ça fait six ans que je fais chasser des gens sur un papier dont j'ignore l'auteur. »",
    "@« Ça ne vous gêne pas ? »",
    "« Ça me gêne tous les jours. » Il ouvre la porte. « Le jour où je saurai qui l'a écrite, messire, j'irai le voir avec vingt hommes et un magistrat, à quatre heures du matin, et personne dans cette province ne pourra m'en empêcher. »",
  ],
  effets:{ flags:['ch_nie','a2_charles_doute'], suspicion:4,
           faire:() => retenir('charles', "vous lui avez dit non, et il n'a pas dit s'il vous croyait"),
           marque:"Charles ignore d'où vient la liste. Le jour où il le saura, il ira avec vingt hommes.",
           court:"Vingt hommes" },
  suite:'a2_saison', libelleSuite:"Il sort" },

ch_retour_dom:{
  qui:'charles',
  texte:[
    "@« Vous en avez tué combien, vous ? »",
    "« Cent quatorze morts. Ce n'est pas la question que vous posez. »",
    "« Non. »",
    { sobre:"« Trois cent onze. »",
      intense:"« Trois cent onze », dit-il, et il le dit tout de suite, sans chercher. « En vingt-deux ans, mes hommes et moi. Je tiens le compte de ceux qu'on tue comme de ceux qu'on perd, parce qu'un homme qui ne tient que le second compte devient très vite une brute avec une cause. »",
      extreme:"« Trois cent onze », dit-il immédiatement, sans chercher, sans hésiter sur l'unité. « En vingt-deux ans, mes hommes et moi. Je tiens le compte de ceux qu'on tue comme de ceux qu'on perd — c'est dans un registre, à Mont-Draken, et je l'écris de ma main tous les mois. Un homme qui ne tient que le second compte devient une brute avec une cause en environ quatre ans. J'en ai vu trois. »" },
    "« Combien étaient humains ? »",
    "Silence.",
    "« Je ne réponds pas à celle-là. »",
    "« Pourquoi ? »",
    "§ « Parce que je connais le chiffre, messire, et parce qu'il est le seul de mes deux registres que je n'ai jamais montré à personne. »",
    "Il se lève.",
    "« Vous êtes plus dangereux que je ne croyais et ce n'est pas à cause de ce que vous avez sous les côtes. »",
  ],
  effets:{ flags:['ch_trois_cent_onze','a2_charles_respect'],
           faire:() => retenir('charles', "vous lui avez posé la seule question qu'il ne se pose pas"),
           exploit:{ eclat:3, temoins:'un', quoi:"Charles de Mont-Draken vous a donné son chiffre" },
           marque:"Trois cent onze en vingt-deux ans. Il ne dit pas combien étaient humains.",
           court:"Trois cent onze" },
  suite:'a2_saison', libelleSuite:"Il sort" },

ch_retour_cout:{
  qui:'charles',
  texte:[
    "@« Vous en avez tué combien, vous ? »",
    "« Ce n'est pas une conversation », dit-il en se levant. « C'est une esquive, et je les reconnais depuis vingt-deux ans. »",
    "§ Il ne s'énerve pas. Il range, ce qui est pire.",
    "^« Je suis venu chercher une réponse et je repars avec une manière de ne pas répondre, ce qui est une réponse. »",
    "« Ce n'est pas— »",
    "« Si. » Il est déjà à la porte. « Bonne route, messire. Restez à l'ouest de la Route Grise : à l'est, j'ai un magistrat et une commission, et je ne pourrai plus décider grand-chose. »",
  ],
  effets:{ flags:['ch_esquive'], suspicion:8,
           faire:() => retenir('charles', "vous avez esquivé sa question, ce qui en est une"),
           marque:"Charles vous a conseillé de rester à l'ouest de la Route Grise.", court:"À l'ouest" },
  suite:'a2_saison', libelleSuite:"Il sort" },

/* ══ LUCIUS FURIUS AUGUSTUS ══════════════════════════════════════════════ */
lu_astrah:{
  qui:'lucius',
  lieu:"Astrah · le palais du conseil · une salle qui n'a plus de trône",
  titre:"Le trône vide",
  texte:[
    "Astrah n'a plus de roi depuis quarante ans et la ville est plus riche qu'elle ne l'a jamais été, ce qui est le genre de fait qu'on ne dit pas à voix haute dans une salle de conseil.",
    "Lucius Furius Augustus a quarante-trois ans. Il vous reçoit debout, il vous serre l'avant-bras, et il vous appelle par votre nom entier dès la première phrase.",
    () => a('a2_bannieres')
      ? "« Yohan de Karlsberg. Volume cent-quarante-trois, section des titres relevés. Je l'ai lu le jour de l'enregistrement : je paie un homme à Chastel pour me lire les relevés. »"
      : "« Yohan de Karlsberg. Ne faites pas cette tête : je paie un homme à Chastel pour me lire les registres, et vous êtes dedans depuis Nivôse. »",
    "§ Il n'y a aucune menace. C'est même le contraire : il vient de vous dire qu'il sait, pour que vous n'ayez pas à vous demander.",
    "« Je vais vous faire gagner une demi-journée. Voici ce que je veux, dans l'ordre. »",
    { sobre:"« Astrah. Et je ne veux rien d'autre. »",
      intense:"« Un : Astrah relevée. Deux : Astrah relevée de mon vivant, ce qui me laisse vingt ans et pas trente. Trois : rien. Il n'y a pas de trois. »",
      extreme:"« Un : Astrah relevée. Deux : Astrah relevée de mon vivant, ce qui me laisse vingt ans et pas trente, et qui explique tout ce que je fais et tout ce que je ferai. Trois : rien. Il n'y a pas de trois, messire. Les gens croient toujours qu'il y a un trois — une revanche, une femme, une blessure d'enfance. Il n'y a pas de trois et c'est ce qui me rend efficace. »" },
    "« Et moi là-dedans ? »",
    "« Une maison relevée qui n'a pas d'alliance est une maison qui en cherche une. Deux maisons relevées qui s'appuient l'une sur l'autre valent quatre fois une maison relevée seule. Vous n'avez pas de terres, pas d'hommes et pas d'argent — et vous avez un nom que quatre provinces ont entendu prononcer cet hiver. »",
    "§ « Un nom, c'est exactement ce qui me manque. J'ai tout le reste. »",
  ],
  choix:[
    { t:"Écouter l'offre",
      detail:"Il a préparé un chiffre · les hommes comme lui préparent toujours un chiffre",
      va:'lu_offre' },
    { t:"« Vous savez ce que je suis. »",
      detail:"Un Paria · et il vient de proposer une alliance publique à un Paria",
      va:'lu_sait' },
    { t:"Refuser tout de suite",
      detail:"Sans écouter · sans négocier · un homme qui n'a pas de trois n'a pas d'ami",
      ferme:"Ferme : l'appui d'Astrah, et ce qu'il aurait apporté",
      risque:"définitif", definitif:true, va:'lu_refus' },
  ],
},

lu_offre:{
  qui:'lucius',
  texte:[
    "« Deux cents hommes d'armes à demeure, entretenus par Astrah, cantonnés aux Marches Grises. Un maçon, quatre charpentiers et de quoi les payer trois ans. Et une reconnaissance publique du relèvement de Karlsberg au conseil de province, que j'obtiendrai parce que j'ai les voix. »",
    "« En échange de quoi ? »",
    "« De votre nom sur un acte d'alliance, et de votre présence physique à Astrah trois fois par an. »",
    { sobre:"« C'est tout ? »",
      intense:"« C'est tout ? »\n\n« C'est tout. Je ne veux pas votre épée, messire : j'ai deux mille épées. Je veux qu'on voie une maison rayée revenue d'entre les morts se tenir à côté de moi trois fois par an, parce que c'est exactement ce que je suis en train de faire à Astrah et que les gens ont besoin de le voir avant de le croire. »",
      extreme:"« C'est tout ? »\n\n« C'est tout. Je ne veux pas votre épée : j'ai deux mille épées et je peux en payer mille de plus demain. Je veux qu'on voie une maison rayée revenue d'entre les morts se tenir à côté de moi trois fois par an. C'est très exactement ce que je fais à Astrah — relever ce qu'on a déclaré mort — et les gens ne croient pas une idée : ils croient une image. Vous êtes une image, et vous êtes la meilleure disponible sur le marché cette année. »" },
    "« Et les Parias ? »",
    "« Quoi, les Parias ? »",
    "« Il y en a quarante et un. On les chasse. »",
    "§ Il réfléchit sincèrement pendant quatre secondes, ce qui est déjà plus que la plupart.",
    "^« Ce n'est pas mon sujet. Je ne dis pas que c'est bien, je dis que ce n'est pas mon sujet et que je ne vais pas faire semblant qu'il le devienne pour vous vendre un contrat. »",
    "« C'est honnête. »",
    "« C'est de la technique. L'honnêteté sur les petites choses achète tout le reste, et j'utilise ça depuis vingt ans. » Il sourit. « Je vous le dis aussi, remarquez. »",
  ],
  effets:{ flags:['lu_offre','a2_lucius_vu'],
           faire:() => retenir('lucius', "vous avez écouté son offre jusqu'au bout"),
           marque:"Lucius offre deux cents hommes, un maçon, et une reconnaissance publique. Contre un nom sur un acte.",
           court:"L'offre" },
  choix:[
    { t:"Accepter",
      detail:"Deux cents hommes aux Marches Grises · et Karlsberg dans la guerre d'Astrah",
      ferme:"Ferme : toute possibilité de rester en dehors de ce qui vient",
      risque:"définitif", definitif:true, va:'lu_accepte' },
    { t:"Refuser",
      detail:"Rester sans terres, sans hommes et sans argent · et sans obligations",
      risque:"définitif", definitif:true, va:'lu_refus' },
    { t:"« Plus tard. »",
      detail:"Il a vingt ans devant lui et pas trente · un délai lui coûte plus qu'à vous",
      va:'lu_plus_tard' },
  ],
},

lu_sait:{
  qui:'lucius',
  texte:[
    "@« Vous savez ce que je suis. »",
    "« Un Paria. Oui. »",
    "« Et vous proposez une alliance publique à un Paria. »",
    { sobre:"« Je propose une alliance publique à une maison relevée. »",
      intense:"« Je propose une alliance publique à une maison relevée par acte au bailliage de Chastel. Ce que vous avez sous les côtes ne figure sur aucun acte. » Il écarte les mains. « Je ne suis pas naïf, messire : je sais que ça se saura, je sais que ça me coûtera trois maisons du nord, et j'ai fait le calcul avant de vous faire venir. »",
      extreme:"« Je propose une alliance publique à une maison relevée par acte au bailliage de Chastel. Ce que vous avez sous les côtes ne figure sur aucun acte et ne peut donc figurer dans aucune alliance. » Il écarte les mains. « Je ne suis pas naïf : je sais que ça se saura, je sais que ça me coûtera trois maisons du nord et probablement Mont-Draken, et j'ai fait le calcul deux fois avant de vous faire venir. Trois maisons du nord contre une image que personne d'autre ne peut m'offrir : je signe. »" },
    "« Et si Mont-Draken vous demande de me livrer ? »",
    "« Il me le demandera. »",
    "« Et ? »",
    "« Et je refuserai tant que ça me coûtera moins cher que ça ne me rapporte. » Il vous regarde en face. « Je viens de vous dire exactement ce qui arrivera le jour où ça s'inversera, messire, et j'ai remarqué que peu de gens écoutent cette phrase-là. »",
    "§ Il est le seul homme rencontré cette année à décrire à l'avance le jour où il vous trahira.",
  ],
  effets:{ flags:['lu_franc','a2_lucius_vu'],
           faire:() => retenir('lucius', "vous lui avez demandé s'il vous livrerait, et il a répondu"),
           marque:"Lucius vous a décrit à l'avance le jour où il vous trahira.", court:"Le jour" },
  suite:'lu_offre', libelleSuite:"L'offre" },

lu_accepte:{
  qui:'lucius',
  texte:[
    "L'acte est signé en trois exemplaires, dans une salle sans trône, devant onze témoins dont quatre sont des maisons du sud.",
    "§ Deux cents hommes d'armes montent aux Marches Grises en Thermidor. Un maçon arrive avec quatre charpentiers, et la première chose qu'ils font est de dégager la cour, ce qui prend six semaines.",
    "Karlsberg n'est plus des ruines sous les ronces. C'est un chantier avec deux cents hommes dedans.",
    "Ce qui veut dire, très exactement, ce qu'Alycia avait dit : c'est une adresse.",
  ],
  effets:{ flags:['lu_allie','a2_lucius_aide','a2_bannieres'],
           faire:() => { A2().bannieres = true; bouger('alycia', { relation:-3 });
                         retenir('lucius', "vous avez signé"); retenir('charles', "vous vous êtes allié à Astrah"); },
           suspicion:20,
           exploit:{ eclat:10, temoins:'province', quoi:"Karlsberg s'est alliée à Astrah par acte public" },
           marque:"Alliance signée avec Lucius. Deux cents hommes aux Marches Grises et un chantier à Karlsberg.",
           court:"L'alliance" },
  suite:'a2_carte', libelleSuite:"La carte" },

lu_refus:{
  qui:'lucius',
  texte:[
    "@« Non. »",
    "Il ne discute pas et ne réessaie pas. C'est peut-être ce qu'il a de plus impressionnant : il retire l'offre de la table en une phrase et il passe à autre chose.",
    "« Dommage. Sincèrement, et sans rancune : j'aurais aimé. »",
    "§ « Une chose, avant que vous partiez, et ce n'est pas une menace parce que ça ne me sert à rien. »",
    "@« Dites. »",
    "« Une maison relevée qui n'a d'alliance avec personne n'est pas neutre, messire. Elle est **disponible**. Et il y a dans cette province trois personnes qui savent lire un registre de relèvement, et je suis la plus aimable des trois. »",
  ],
  effets:{ flags:['lu_refuse','a2_lucius_refuse','a2_lucius_vu'],
           faire:() => retenir('lucius', "vous avez refusé son alliance sans négocier"),
           marque:"Vous avez refusé Lucius. Une maison sans alliance est disponible, pas neutre.",
           court:"Disponible" },
  suite:'a2_carte', libelleSuite:"La carte" },

lu_plus_tard:{
  qui:'lucius',
  texte:[
    "@« Plus tard. »",
    "« Combien plus tard ? »",
    "« Je ne sais pas. »",
    { sobre:"Il accepte, ce qui surprend.",
      intense:"« D'accord. » Il accepte tout de suite, ce qui surprend, et il l'explique aussitôt parce qu'il explique tout : « Un délai me coûte un an et vous coûte tout. Vous n'avez pas d'hommes, moi si. Le temps est de mon côté et il ne l'a jamais été de personne d'autre dans cette pièce. »",
      extreme:"« D'accord. » Il accepte tout de suite, ce qui surprend, et il l'explique aussitôt parce que c'est un homme qui explique tout : « Un délai me coûte un an. Il vous coûte tout. Vous n'avez ni hommes, ni terres, ni argent, et la seule chose que vous ayez — un nom entendu par quatre provinces — se dévalue de moitié chaque année où il ne se passe rien. Dans deux ans vous viendrez me chercher, et l'offre sera moins bonne, et vous la prendrez. » Il sourit sans méchanceté. « Je vous le dis parce que ça ne change rien : vous partirez quand même. »" },
  ],
  effets:{ flags:['lu_delai','a2_lucius_vu'],
           faire:() => retenir('lucius', "vous avez demandé un délai et il vous l'a donné"),
           marque:"Lucius vous a accordé un délai en vous expliquant pourquoi il n'y perdait rien.",
           court:"Le délai" },
  suite:'a2_carte', libelleSuite:"La carte" },

/* ══ CALEB DE FORT-AUX-PRINCES ═══════════════════════════════════════════ */
ca_fort:{
  qui:'caleb',
  lieu:"Fort-aux-Princes · le cabinet des créances",
  titre:"Celui qui compte",
  texte:[
    "Fort-aux-Princes ne ressemble pas à un fort. C'est un comptoir avec des murs, et le cabinet des créances est la plus grande pièce de la maison.",
    "Caleb de Fort-aux-Princes a trente-six ans et il ne se lève pas non plus.",
    () => a('a2_bannieres')
      ? "« Karlsberg. » Il tapote une chemise sur son bureau. « J'ai ouvert un dossier le jour de l'enregistrement. Il fait déjà onze feuillets. »"
      : "« Vous n'avez rien relevé. » Il tapote une chemise. « Ça fait de vous une curiosité et pas un dossier, et je préfère les curiosités : elles ne coûtent rien. »",
    "@« Vous ouvrez un dossier sur tout le monde ? »",
    "« Sur toute maison susceptible d'exister à moins de quarante lieues. Il y en a cent onze. » Il écarte les mains. « Ce n'est pas de l'hostilité, c'est de la comptabilité. Je n'ai pas d'ennemis, messire : j'ai des concurrents, et un concurrent, ça se rachète. »",
    "§ C'est la première fois de l'année que quelqu'un vous explique ce qu'il fera de vous en termes purement commerciaux, et c'est reposant.",
    "@« Vous voulez racheter quoi ? »",
    { sobre:"« Le droit de passage de la gorge de Cendrepont. »",
      intense:"« Le droit de passage de la gorge de Cendrepont. » Il ouvre la chemise. « Il figure au relevé d'arpentage de la cent-quarante-troisième année sous le nom de votre maison. Valombre le prélève depuis six générations sans titre. Si Karlsberg existe à nouveau, ce droit existe à nouveau, et il vaut onze cents couronnes par an. »",
      extreme:"« Le droit de passage de la gorge de Cendrepont, le gué, la falaise et le quart du sel. » Il ouvre la chemise et fait pivoter un feuillet. « Portés au relevé d'arpentage de la cent-quarante-troisième année sous le nom de votre maison. Valombre le prélève depuis six générations sans titre — pas par fraude : parce que personne ne le lui a jamais contesté, ce qui est la façon dont on acquiert à peu près tout dans cette province. Onze cents couronnes par an. J'ai le chiffre depuis Ventôse. »" },
    "« Et vous voulez me l'acheter. »",
    "« Je veux vous l'acheter avant que vous sachiez ce qu'il vaut, et je viens de vous le dire, ce qui ruine mon propre plan et ce qui devrait vous indiquer que j'ai autre chose en tête. »",
  ],
  effets:{ flags:['ca_vu','a2_caleb_vu','ca_droit_su'],
           faire:() => retenir('caleb', "vous êtes venu à Fort-aux-Princes"),
           marque:"La gorge de Cendrepont vaut onze cents couronnes par an, et elle est à Karlsberg au relevé.",
           court:"Onze cents par an" },
  choix:[
    { t:"« Quoi d'autre ? »",
      detail:"Un homme qui ruine son propre plan a un deuxième plan",
      va:'ca_autre' },
    { t:"Lui vendre le droit",
      detail:"Une somme comptant · et Valombre continue de prélever pour quelqu'un d'autre",
      risque:"définitif", definitif:true, va:'ca_vend' },
    { t:"Refuser et le garder",
      detail:"Onze cents par an · qu'il faudra faire reconnaître, ce qui suppose d'exister",
      risque:"calculé", definitif:true, va:'ca_garde' },
  ],
},

ca_autre:{
  qui:'caleb',
  texte:[
    "@« Quoi d'autre ? »",
    "« Sainte-Ombre. »",
    "§ Il le dit sans préparation, et il vous regarde le recevoir.",
    { sobre:"@« Le couvent est sur mes terres. »",
      intense:"@« La maison des sœurs de Sainte-Ombre est à quatre lieues d'ici, sur mes terres, et je la dote depuis onze ans. Ça fait de moi la seule personne au monde qui puisse faire ouvrir cette porte à quelqu'un qui n'est pas de la famille d'une sœur. »",
      extreme:"@« La maison des sœurs de Sainte-Ombre est à quatre lieues, sur mes terres, et je la dote de quatre-vingts couronnes par an depuis onze ans. Ça n'est pas de la piété : c'est une maison qui recueille des femmes de qualité sans dot, et une maison comme celle-là sait des choses sur onze familles de cette province. Ça fait de moi la seule personne au monde capable de faire ouvrir cette porte à quelqu'un qui n'est pas de la famille d'une sœur. »" },
    "« Vous savez pourquoi je voudrais y entrer. »",
    "« Non. Et je ne veux pas le savoir : ça deviendrait un renseignement, et un renseignement, ça se vend, et je serais obligé d'envisager de le vendre. »",
    "§ Il referme la chemise.",
    "^« Le droit de passage contre la porte. C'est mon offre et elle est bonne : vous me donnez onze cents couronnes par an que vous ne toucherez jamais parce que vous n'avez pas de quoi les faire reconnaître, et je vous donne une porte que personne d'autre ne peut vous ouvrir. »",
  ],
  effets:{ flags:['ca_sainte_ombre'],
           marque:"Caleb dote Sainte-Ombre depuis onze ans. Il peut faire ouvrir la porte.",
           court:"La porte" },
  choix:[
    { t:"Accepter : le droit contre la porte",
      detail:"Onze cents couronnes par an que vous n'auriez jamais touchées · contre quatre lieues",
      risque:"définitif", definitif:true, va:'ca_marche' },
    { t:"Refuser et trouver un autre chemin",
      detail:"Un mur de couvent, quatre lieues d'une route de poste · il y a toujours un autre chemin",
      risque:"dangereux", definitif:true, va:'ca_garde' },
  ],
},

ca_marche:{
  qui:'caleb',
  texte:[
    "L'acte tient en une page et il est rédigé avant que vous ayez fini de dire oui, ce qui veut dire qu'il était rédigé avant votre arrivée.",
    "@« Vous l'aviez préparé. »",
    "« J'ai préparé les quatre. » Il range les trois autres sans les montrer. « Un homme qui ne prépare qu'une version d'un entretien est un homme qui va perdre trois entretiens sur quatre. »",
    "§ Il vous donne une lettre de recommandation à la mère supérieure de Sainte-Ombre, cachetée, et il ne la cachette pas devant vous, ce qui est délibéré.",
    "^« Une chose, messire, et elle est gratuite. »",
    "« Vous ne donnez rien de gratuit. »",
    "« Celle-là, si, parce qu'elle me protège. » Il pose la lettre. « Quoi que vous alliez faire derrière ce mur, ne le faites pas dans l'enceinte. Je dote cette maison depuis onze ans et je compte continuer. »",
  ],
  effets:{ flags:['ca_lettre','ca_droit_vendu','a2_porte_sainte_ombre'], or:0,
           faire:() => retenir('caleb', "vous lui avez cédé le droit de passage de Cendrepont"),
           marque:"Vous avez cédé le droit de passage de Cendrepont contre une lettre pour Sainte-Ombre.",
           court:"La lettre" },
  suite:'a2_carte', libelleSuite:"La carte" },

ca_vend:{
  qui:'caleb',
  texte:[
    "@« Combien ? »",
    "« Six cents comptant. »",
    "« Il vaut onze cents par an. »",
    "« Il vaut onze cents par an à quelqu'un qui peut le faire reconnaître. Vous ne le pouvez pas : il faudrait une instance contre Valombre, six ans, un avocat, et une maison qui existe assez pour ester en justice. » Il compte déjà. « Six cents comptant, c'est le prix d'une chose que vous ne pouvez pas utiliser. C'est même généreux, et je suis généreux uniquement quand ça se remarque. »",
    "§ Six cents couronnes. C'est le plus gros paiement de l'acte.",
    "Et le droit de passage de la gorge où votre famille prélevait un sou par essieu il y a deux cents ans appartient désormais à un comptoir de Fort-aux-Princes.",
  ],
  effets:{ or:600, flags:['ca_droit_vendu'],
           faire:() => retenir('caleb', "vous lui avez vendu Cendrepont pour six cents comptant"),
           marque:"Vous avez vendu le droit de passage de Cendrepont à Caleb pour six cents couronnes.",
           court:"Six cents" },
  suite:'a2_carte', libelleSuite:"La carte" },

ca_garde:{
  qui:'caleb',
  texte:[
    "@« Je le garde. »",
    "« Bien. » Il referme la chemise sans une trace de contrariété. « C'est le bon choix, d'ailleurs, si vous êtes encore vivant dans six ans. »",
    "« Et si je ne le suis pas ? »",
    "« Alors c'est le mauvais, et je rachèterai le droit à vos héritiers, ou à personne, et ça ne changera rien à ma vie. »",
    "§ Il se lève enfin — la seule fois — et il vous accompagne à la porte du cabinet, ce qui chez lui est un honneur mesuré.",
    "@« Vous avez refusé Lucius aussi ? »",
    "« Comment le savez-vous ? »",
    "« Je ne le savais pas. » Il ouvre la porte. « Maintenant si. »",
  ],
  effets:{ flags:['ca_garde','ca_droit_garde'],
           faire:() => retenir('caleb', "vous avez gardé le droit de passage, ce qui fait de vous un concurrent"),
           marque:"Vous avez gardé le droit de passage. Caleb l'a noté.", court:"Gardé" },
  suite:'a2_carte', libelleSuite:"La carte" },

};
enregistrerScenes(GENS2);

offrir({ id:'lu_astrah', lieu:'astrah', va:'lu_astrah', titre:"Le trône vide",
         si:() => ETAT.renom >= 60 || a('a2_bannieres') });
offrir({ id:'ca_fort', lieu:'fortauxprinces', va:'ca_fort', titre:"Le cabinet des créances",
         si:() => a('kar_coffre') });
