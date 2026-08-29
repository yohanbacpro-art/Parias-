/* PARIAS — Acte I · C06 · LA DAME CAPTIVE
 * ═══════════════════════════════════════════════════════════════════════
 * Le verbe de cet arc est ESCORTER.
 *
 * Il n'y a rien à trouver : on sait où elle est dès la première heure. Tout
 * l'arc est le chemin du retour — et la seule question qui compte est de
 * savoir vers où.
 *
 * Le commanditaire ment sur une seule chose et il ment par omission, comme
 * les autres : il n'y a jamais eu de demande de rançon.
 * ═══════════════════════════════════════════════════════════════════════ */

/* La route : trois étapes, et ce qui vous suit derrière. */
const route = () => (ETAT.acte.route = ETAT.acte.route || { etape:0, avance:0, suivi:0 });
const avancer = (a2, s) => { const r = route(); r.etape += 1; r.avance += (a2 || 0); r.suivi += (s || 0); };
const barreRoute = () => {
  const r = route();
  return { position:`étape ${r.etape}`, note:`Avance ${r.avance} · derrière vous ${r.suivi}` };
};

const ARC_C06 = {

ha_audience:{
  lieu:"Hauterive · le cabinet · portes fermées",
  titre:"La discrétion d'abord",
  qui:'hauterive',
  texte:[
    "Il fait fermer les portes avant de dire bonjour. C'est la première chose et c'est la seule qui compte : on ferme les portes avant de savoir si l'homme en face acceptera.",
    "Le sire de Hauterive a cinquante et un ans, il est en deuil de rien du tout, et il porte une bague de conseil de province qu'il n'a pas encore le droit de porter.",
    "« Avant toute chose : ce qui se dit ici ne sort pas d'ici. Vous vous engagez maintenant ou vous sortez maintenant. »",
    "« Vous ne m'avez pas encore dit combien. »",
    "« Non. C'est délibéré. Je veux savoir si vous prenez la discrétion avant l'argent. »",
    "§ Aucun homme au monde n'a jamais posé cette condition pour retrouver sa femme.",
    "« Mon épouse a été enlevée il y a dix-huit jours. Isabeau de Hauterive, trente et un ans. Six hommes, une compagnie franche, au retour d'un pèlerinage. Ils la tiennent dans un moulin abandonné à quatorze lieues d'ici, et je sais exactement lequel. »",
    "« Vous savez lequel. »",
    "« Depuis onze jours. »",
    { sobre:"« Et vous n'y êtes pas allé. »",
      intense:"« Et vous n'y êtes pas allé. »\n\n« Non. » Il ne se justifie pas et il ne détourne pas les yeux. « J'ai quatorze hommes d'armes. Ils en ont six. Je n'y suis pas allé et je ne vous dirai pas pourquoi : c'est précisément ce que j'achète. »",
      extreme:"« Et vous n'y êtes pas allé. »\n\n« Non. » Il ne se justifie pas, ne détourne pas les yeux, ne cille pas. « J'ai quatorze hommes d'armes sous ce toit. Ils en ont six, dans un moulin sans mur d'enceinte, à quatorze lieues. Je n'y suis pas allé et je ne vous dirai pas pourquoi — c'est exactement ce que j'achète, messire, et c'est pour ça que le prix est ce qu'il est. »" },
    "« Deux cent quatre-vingts couronnes. Vous la ramenez ici. Vous ne parlez à personne, et surtout pas à elle. »",
    "§ *Et surtout pas à elle.*",
  ],
  choix:[
    { t:"« Quelle rançon demandent-ils ? »",
      si:() => !a('ha_rancon'),
      detail:"Dix-huit jours d'enlèvement, onze jours à savoir où · il y a forcément un chiffre",
      va:'ha_rancon' },
    { t:"Parler à sa chambrière",
      si:() => !a('ha_chambriere'),
      detail:"Une femme qui habille une autre femme tous les matins sait tout d'elle",
      va:'ha_chambriere' },
    { t:"Se renseigner sur la compagnie",
      si:() => !a('ha_jaufre_su'),
      detail:"Six hommes, une compagnie franche, un capitaine · les compagnies ont une réputation",
      va:'ha_compagnie' },
    { t:"Fixer les termes",
      si:() => !a('ha_termes_fait'),
      detail:"Or · noble adulte consentante · les deux · négocier · refuser",
      va:'ha_termes' },
    { t:"Aller au moulin",
      detail:"Quatorze lieues · six hommes · et une femme dont on vous a interdit de vous approcher",
      va:'ha_moulin' },
  ],
},

ha_rancon:{
  qui:'hauterive',
  texte:[
    "« Quelle rançon ? »",
    "Il y a un silence de trois secondes, et trois secondes chez un homme qui a fermé les portes avant de dire bonjour, c'est une réponse complète.",
    "« Il n'y en a pas eu. »",
    "« Dix-huit jours et pas de demande. »",
    "« Pas une ligne. »",
    { sobre:"§ Une compagnie franche ne prend pas une femme noble pour rien.",
      intense:"§ Une compagnie franche ne prend pas une femme noble pour rien. Prendre un otage coûte : il faut le nourrir, le garder, occuper six hommes, et ne pas être trouvé. On ne fait pas ça dix-huit jours pour le plaisir. On le fait parce qu'on a été payé — et si ce n'est pas par une rançon, c'est par quelqu'un.",
      extreme:"§ Une compagnie franche ne prend pas une femme noble pour rien. Un otage coûte : il faut le nourrir, le garder jour et nuit, immobiliser six hommes armés pendant dix-huit jours et ne pas se faire trouver. Personne ne fait ça sans être payé. Et s'il n'y a pas eu de demande de rançon en dix-huit jours, c'est que le paiement a eu lieu avant — ce qui veut dire que le commanditaire n'est pas le mari, ou que c'est lui." },
    "« Vous y avez pensé, messire », dit Hauterive, qui vous a regardé y penser. « Vous avez pensé que je les avais payés moi-même. »",
    "« Oui. »",
    "« C'est faux, et je ne peux pas le prouver, et je ne vais pas essayer. » Il se rassied. « Cherchez plutôt qui d'autre au monde aurait intérêt à ce que ma femme disparaisse dix-huit jours sans qu'on la cherche officiellement. »",
    "« Et qui ? »",
    "« Elle. »",
  ],
  effets:{ flags:['ha_rancon','ha_sait_pas_rancon','ha_soupcon_elle'],
           exploit:{ eclat:3, temoins:'un', quoi:"vous avez posé la question de la rançon" },
           marque:"Dix-huit jours d'enlèvement et pas une demande de rançon.", court:"Pas de rançon" },
  suite:'ha_audience', libelleSuite:"Revenir" },

ha_chambriere:{
  texte:[
    "Elle s'appelle Guiote, elle a quarante ans, elle habille Isabeau de Hauterive depuis onze ans, et elle est la seule personne de cette maison qui pleure vraiment.",
    "« Elle a emporté quoi, pour son pèlerinage ? »",
    "« Un coffre. »",
    "« Quelle taille ? »",
    { sobre:"« Grand comme ça. » Elle montre. C'est petit.",
      intense:"« Grand comme ça. » Elle montre avec les mains : un coffret de deux pieds sur un, celui où l'on met des lettres et rien d'autre. « Elle l'a porté elle-même jusqu'à la voiture. Je le lui ai proposé et elle a dit non. »",
      extreme:"« Grand comme ça. » Elle montre : deux pieds sur un, la taille d'un coffret à lettres et de rien d'autre. « Elle l'a porté elle-même jusqu'à la voiture. Je le lui ai proposé — c'est mon travail, je porte ses affaires depuis onze ans — et elle a dit non, et elle a dit non d'une façon dont elle n'avait jamais dit non en onze ans. »" },
    "« Il y avait quoi dedans ? »",
    "« Je ne l'ai jamais ouvert. »",
    "« Guiote. »",
    "Elle regarde la porte. Elle a quarante ans, elle a onze ans de place dans cette maison, et il n'y a rien d'autre pour elle à trente lieues.",
    "§ « Des lettres. Elle les rangeait la nuit et elle les ressortait la nuit, et elle en a recopié pendant trois mois. »",
    "« Recopié ? »",
    "« De sa main. Elle recopiait des lettres qui n'étaient pas d'elle. »",
    "Un temps.",
    "« Et elle a demandé au palefrenier, en Ventôse, combien de jours il faut pour aller à Chastel par les petites routes. »",
  ],
  effets:{ flags:['ha_chambriere','ha_sait_coffret','ha_sait_chastel','ha_soupcon_elle'], cout:{ moral:3 },
           exploit:{ eclat:3, temoins:'un', quoi:"la chambrière vous a parlé malgré sa place" },
           marque:"Isabeau a emporté un coffret de lettres recopiées, et elle a demandé la route de Chastel.",
           court:"Le coffret" },
  suite:'ha_audience', libelleSuite:"Revenir" },

ha_compagnie:{
  texte:[
    "Une compagnie franche a une réputation, parce qu'une compagnie franche vit de sa réputation : personne n'engage six hommes dont on ne sait rien.",
    "Celle-ci est menée par un nommé Jaufré, quarante-six ans, quatorze ans de service dans deux provinces, et son dossier tient en trois lignes qu'un sergent de recrutement vous récite de mémoire.",
    { sobre:"« Il n'a jamais rompu un contrat et il n'a jamais tué de commanditaire. »",
      intense:"« Jaufré n'a jamais rompu un contrat en quatorze ans et il n'a jamais touché à un commanditaire. C'est tout ce qu'on sait de lui et c'est tout ce qu'il faut savoir : on l'engage cher parce qu'il finit ce qu'il commence. »",
      extreme:"« Jaufré n'a jamais rompu un contrat en quatorze ans et n'a jamais touché à un commanditaire. C'est tout ce qu'on sait de lui, et c'est tout ce qu'il faut : on l'engage cher parce qu'il finit ce qu'il commence, même quand ça cesse d'être payant, même quand celui qui paie meurt. Il a fini un contrat une fois pour un homme mort depuis six semaines, sans savoir qui le paierait, et c'est pour ça qu'il coûte le double de tout le monde. »" },
    "§ Un homme qui ne rompt jamais un contrat est un homme dont il suffit de connaître le contrat.",
    "« Et l'enlèvement d'une dame ? »",
    "Le sergent hausse les épaules.",
    "« C'est neuf, pour lui. Il n'a jamais fait ça. Il escorte, il garde, il convoie. Ce n'est pas un preneur d'otages, messire : c'est un convoyeur. »",
  ],
  effets:{ flags:['ha_jaufre_su','ha_sait_convoyeur','ha_soupcon_elle'],
           exploit:{ eclat:2, temoins:'un', quoi:"vous avez cherché la réputation d'une compagnie" },
           marque:"Jaufré n'a jamais rompu un contrat en quatorze ans. Et ce n'est pas un preneur d'otages : c'est un convoyeur.",
           court:"Un convoyeur" },
  suite:'ha_audience', libelleSuite:"Revenir" },

ha_termes:{
  qui:'hauterive',
  titre:"Ce que Hauterive doit",
  texte:[
    "« Vous avez écrit les cinq mots. »",
    "« Mon clerc les a écrits. C'est la formule d'usage quand on s'adresse à un homme de votre sorte, et je ne l'ai pas relue. »",
    "§ Voilà une chose qu'aucune maison n'avait encore dite à voix haute : la coutume ancienne est devenue une formule de politesse dans un modèle de lettre.",
    "« Elle est due ou elle ne l'est pas. »",
    "« Elle est due. Je ne me défile pas. » Il ouvre les mains. « Seulement il n'y a, dans cette maison, qu'une seule femme noble et majeure, et c'est celle que vous partez chercher. »",
    "Silence.",
    "« Vous voyez le problème, messire. Moi je le vois très bien. »",
    { sobre:"Il pose une bourse sur la table.",
      intense:"Il pose une bourse sur la table, et le geste est celui d'un homme qui règle un compte, pas d'un homme qui achète quelque chose.\n\n« Deux cent quatre-vingts, et deux cents de plus au titre de la coutume, en argent, parce que je n'ai personne à qui la demander et que je ne vais pas demander à quelqu'un qui n'est pas de ma maison. »",
      extreme:"Il pose une bourse sur la table, du geste d'un homme qui règle un compte et non de celui qui achète quelque chose.\n\n« Deux cent quatre-vingts, et deux cents de plus au titre de la coutume, en argent. Je n'ai personne à qui la demander, je ne vais pas demander à quelqu'un qui n'est pas de ma maison, et l'idée de vous proposer ma femme quand vous partez la chercher me paraît d'une bassesse qui dépasse même ce que vous devez déjà penser de moi. »" },
    "« C'est régulier ? »",
    "« C'est régulier. La coutume prévoit la compensation quand la maison ne peut pas fournir. Vérifiez si vous voulez : c'est écrit, ça date de trois cents ans, et ça a été écrit par des gens qui avaient prévu ce cas exact. »",
    "§ Il a raison. C'est le seul point de toute cette affaire où cet homme est irréprochable, et il tient à ce qu'on le note.",
  ],
  choix:[
    { t:"Prendre la compensation",
      detail:"Quatre cent quatre-vingts couronnes en tout · et rien d'autre n'est demandé à personne",
      va:'ha_compensation' },
    { t:"Refuser la compensation",
      detail:"Deux cent quatre-vingts seulement · la coutume n'est pas une somme",
      va:'ha_refus_comp' },
  ],
},

ha_compensation:{
  qui:'hauterive',
  texte:[
    "« J'accepte la compensation. »",
    "« Bien. »",
    "Il compte. Il compte vite et bien, comme tout ce qu'il fait.",
    "§ Quatre cent quatre-vingts couronnes avant d'avoir monté à cheval. C'est le plus gros paiement de l'acte et il arrive avant le travail, ce qui n'arrive jamais.",
    "« Vous payez d'avance. »",
    "« Je paie d'avance parce que je veux que vous soyez déjà payé quand vous la verrez. »",
    "« Pourquoi ? »",
    "« Parce qu'elle vous offrira davantage. »",
  ],
  effets:{ or:480, flags:['ha_termes_fait','ha_compensation','ha_paye_avance'],
           marque:"Hauterive a payé d'avance, la compensation comprise, pour que vous soyez déjà payé en la voyant.",
           court:"Payé d'avance" },
  suite:'ha_audience', libelleSuite:"Revenir" },

ha_refus_comp:{
  qui:'hauterive',
  texte:[
    "« Non. La coutume n'est pas une somme. Quand une maison ne peut pas fournir, elle ne fournit pas : elle ne rachète pas. »",
    { sobre:"Il vous regarde d'une façon nouvelle.",
      intense:"Il vous regarde d'une façon nouvelle — pas avec sympathie : avec intérêt, ce qui est beaucoup plus dangereux chez un homme qui va siéger au conseil de province.",
      extreme:"Il vous regarde d'une façon nouvelle. Pas avec sympathie : avec intérêt, ce qui est infiniment plus dangereux chez un homme qui va siéger au conseil de province et qui vient de découvrir qu'un Paria peut refuser deux cents couronnes pour une raison de forme." },
    "« Vous êtes le premier. »",
    "« Le premier quoi ? »",
    "« En dix-neuf ans, j'ai vu trois maisons régler la coutume en argent et je n'ai jamais entendu parler d'un Paria qui refuse. » Il repousse la moitié de la bourse. « Deux cent quatre-vingts, alors. »",
    "§ Il note quelque chose. Pas sur du papier : dans sa tête, où ça se garde mieux.",
  ],
  effets:{ or:280, flags:['ha_termes_fait','ha_refus_comp','ha_remarque'], suspicion:4,
           exploit:{ eclat:3, temoins:'un', quoi:"vous avez refusé de laisser racheter la coutume" },
           marque:"Vous avez refusé que Hauterive rachète la coutume en argent. Il l'a remarqué.",
           court:"Refusé" },
  suite:'ha_audience', libelleSuite:"Revenir" },

};

/* ══ LE MOULIN ════════════════════════════════════════════════════════════ */
const ARC_C06_2 = {

ha_moulin:{
  qui:'jaufre',
  lieu:"Un moulin abandonné · quatorze lieues de Hauterive",
  titre:"Six hommes et une porte ouverte",
  texte:[
    "Le moulin a perdu sa roue il y a dix ans et son toit à moitié. Il reste deux pièces sèches, une cheminée qui tire, et une porte.",
    "La porte est ouverte.",
    { sobre:"Six hommes autour d'un feu, dehors. Aucun ne se lève.",
      intense:"Six hommes autour d'un feu, dehors, à quarante pas de la porte ouverte. Aucun ne se lève quand vous arrivez. Trois vous ont vu venir depuis un quart d'heure et l'ont dit aux trois autres, et personne n'a jugé nécessaire de changer de position.",
      extreme:"Six hommes autour d'un feu, dehors, à quarante pas de la porte ouverte. Aucun ne se lève. Trois vous ont vu venir depuis un quart d'heure et l'ont signalé aux autres sans hausser la voix, et personne n'a jugé nécessaire de changer de position — ce qui est soit de l'arrogance, soit une compagnie très bien tenue, et un coup d'œil aux armes en faisceau et au picotin des chevaux règle la question en trois secondes." },
    "L'un d'eux se lève quand même, par politesse. Quarante-six ans, une barbe grise coupée court, un manteau de bonne coupe entretenu.",
    "« Jaufré. »",
    "« On vous paie deux cent quatre-vingts couronnes pour la ramener. »",
    "« On me paie six cents pour qu'elle ne le soit pas. »",
    "§ Il le dit tout de suite. Sans négocier, sans jouer, sans même l'ombre d'une mise en scène.",
    "« Vous auriez pu attendre que je pose la question. »",
    "« Pourquoi ? Vous l'auriez posée, j'aurais menti, vous auriez fini par le savoir, et on aurait perdu deux heures. J'ai quatorze ans de métier, messire : la seule chose que j'aie à vendre, c'est qu'on sait toujours où j'en suis. »",
    "« Qui paie ? »",
    "« Elle. »",
    "Il montre la porte ouverte du menton.",
    "« Elle est là-dedans. Elle n'est pas attachée, elle n'a jamais été attachée, et elle vous attend depuis onze jours parce qu'on savait que Hauterive finirait par payer quelqu'un. »",
    "« Vous me laissez entrer. »",
    "« Je vous laisse entrer. » Il se rassied près du feu. « Mon contrat dit : la conduire où elle veut aller, la garder en chemin, et n'empêcher personne de lui parler. C'est elle qui l'a rédigé. »",
  ],
  effets:{ flags:['ha_moulin','ha_jaufre','ha_sait_elle_paie'],
           marque:"Jaufré est payé six cents par Isabeau elle-même. Elle n'a jamais été attachée.",
           court:"Elle paie" },
  suite:'ha_isabeau', libelleSuite:"Entrer" },

ha_isabeau:{
  qui:'isabeau',
  titre:"Ce qu'il y a dans le coffret",
  texte:[
    "Elle est assise à une table de meunier, dos à la cheminée, avec un coffret de deux pieds sur un devant elle et une chandelle.",
    "Isabeau de Hauterive a trente et un ans. Elle a l'air de quelqu'un qui n'a pas dormi correctement depuis longtemps et qui a cessé de s'en préoccuper.",
    "« Vous êtes le premier », dit-elle. « J'en attendais un depuis le neuvième jour. »",
    "« Votre mari paie deux cent quatre-vingts couronnes pour vous ramener. »",
    "« Il en paierait deux mille. » Elle pose la main à plat sur le coffret. « Et ce n'est pas moi qu'il rachète. »",
    { sobre:"Elle ouvre le coffret. Il y a des lettres.",
      intense:"Elle ouvre le coffret et le tourne vers vous. Il y a des lettres, quarante ou cinquante, en deux liasses : une de papier jauni, une de papier neuf de la même main.\n\n« Les vieilles sont de lui. Les neuves sont de moi : je les ai recopiées pendant trois mois, la nuit, parce qu'une seule liasse se brûle et que deux liasses dans deux endroits ne se brûlent pas. »",
      extreme:"Elle ouvre le coffret et le tourne vers vous : quarante ou cinquante lettres, en deux liasses — une de papier jauni, une de papier neuf de la même main d'écriture.\n\n« Les vieilles sont de lui. Les neuves sont de moi : recopiées pendant trois mois, la nuit, à la chandelle, mot pour mot, avec les ratures et les abréviations, parce qu'une liasse se brûle et que deux liasses dans deux endroits différents ne se brûlent pas. Il m'a fallu onze semaines pour comprendre ça toute seule. Personne n'apprend ça à une femme. »" },
    "« Elles disent quoi ? »",
    "« Que mon mari a fait empoisonner Ansel de Vermoise en Brumaire de l'an dernier, pour un siège au conseil de province qu'il occupera en Prairial. »",
    "§ Elle le dit comme on lit un inventaire, ce qui veut dire qu'elle l'a dit à voix haute cent fois, seule, dans une chambre, pour pouvoir le dire une fois devant quelqu'un.",
    "« Pourquoi ne pas être partie, simplement ? »",
    "« Parce qu'une femme qui part est une femme qui fuit son mari, et qu'on la ramène. Une femme enlevée est une victime, et on la cherche — et pendant qu'on la cherche, elle avance. »",
    "Elle referme le coffret.",
    "« J'ai payé Jaufré six cents couronnes de ma dot pour être enlevée dans les règles. Il me reste onze lieues à faire jusqu'à Chastel et il me faut quelqu'un qui sache se battre, parce que mon mari a fini par comprendre. »",
    "« Comment le savez-vous ? »",
    "« Parce qu'il vous a envoyé, messire, et qu'il ne vous a pas dit de me ramener vivante. »",
  ],
  effets:{ flags:['ha_isabeau','ha_sait_lettres','ha_sait_chastel','ha_verite'], cout:{ moral:4 },
           exploit:{ eclat:4, temoins:'aucun', quoi:"vous avez appris pourquoi il fallait de la discrétion avant le prix" },
           marque:"Isabeau s'est fait enlever elle-même. Le coffret prouve un empoisonnement, et Chastel est à onze lieues.",
           court:"Les lettres" },
  suite:'ha_choix', libelleSuite:"Décider" },

ha_choix:{
  titre:"Vers où",
  texte:[
    "Il n'y a jamais eu de captive. Il y a une femme de trente et un ans, six hommes qu'elle paie, un coffret de lettres et onze lieues.",
    "§ Le contrat dit : la ramener ici. Il ne dit rien d'autre, et il a été rédigé par un homme qui savait exactement ce qu'il ne disait pas.",
  ],
  choix:[
    { t:"L'escorter jusqu'à Chastel",
      detail:"Onze lieues · le coffret arrive au greffe · et vous ne serez jamais payé",
      ferme:"Ferme : les couronnes de Hauterive, et toute maison de cette province qui apprendra pourquoi",
      risque:"définitif", definitif:true, va:'ha_partir' },

    { t:"La ramener à Hauterive",
      detail:"Le contrat, à la lettre · deux cent quatre-vingts couronnes · et elle meurt d'une fièvre en Prairial",
      ferme:"Ferme : ce que ces lettres pouvaient encore faire",
      risque:"définitif", definitif:true, va:'ha_ramener' },

    { t:"Prendre le coffret et la laisser",
      detail:"Les lettres valent plus que la femme pour tout le monde · y compris pour son mari",
      ferme:"Ferme : toute version où vous n'avez pas fait ça",
      risque:"définitif", definitif:true, va:'ha_coffret' },

    { t:"Repartir. Dire à Hauterive que le moulin était vide.",
      detail:"Vous ne touchez rien · elle fait ses onze lieues avec six hommes au lieu de sept",
      risque:"définitif", definitif:true, va:'ha_fin_parti' },
  ],
},

/* ══ LES ONZE LIEUES ══════════════════════════════════════════════════════ */
ha_partir:{
  qui:'jaufre', melee:true,
  titre:"Onze lieues",
  effets:{ faire:() => { ETAT.acte.route = { etape:0, avance:0, suivi:0 }; },
           melee:barreRoute, flags:['ha_escorte'] },
  texte:[
    "On part une heure avant l'aube parce que c'est l'heure où les guetteurs dorment, et Jaufré le sait depuis quatorze ans.",
    "Sept hommes, une femme, un coffret, deux chariots légers et onze lieues de petites routes.",
    { sobre:"Le premier jour, il ne se passe rien.",
      intense:"Le premier jour il ne se passe rien du tout, ce qui est le pire des renseignements : quatorze hommes d'armes de Hauterive ne mettent pas plus d'une journée à parcourir onze lieues, et s'ils ne sont pas là, c'est qu'ils sont ailleurs — c'est-à-dire devant.",
      extreme:"Le premier jour, rien. C'est le pire renseignement possible : quatorze hommes d'armes ne mettent pas plus d'une journée à couvrir onze lieues, et s'ils ne sont pas derrière vous, c'est qu'ils sont devant — ce qui suppose qu'ils savent où vous allez, ce qui suppose qu'on le leur a dit." },
    "« Il y a onze lieues et trois façons d'y arriver », dit Jaufré. « La route de poste, les chemins de traverse, et la rivière. »",
    "« Vous avez un avis. »",
    "« J'ai quatorze ans d'avis et ils se contredisent tous. C'est vous qui payez la décision — non pas en argent : en responsabilité, ce qui est plus cher. »",
  ],
  choix:[
    { t:"La route de poste",
      detail:"Deux jours · des relais, des témoins, du monde · et parfaitement visible",
      risque:"calculé",
      test:{ carac:'presence', comp:'tactique', dc:10, manoeuvre:'poste' },
      degres:{ dominante:'ha_poste_dom', couteuse:'ha_poste_cout', echec:'ha_poste_ko' } },
    { t:"Les traverses",
      detail:"Quatre jours · personne · et personne pour vous voir non plus",
      risque:"dangereux",
      test:{ carac:'perception', comp:'furtivite', dc:11, manoeuvre:'traverses' },
      degres:{ dominante:'ha_trav_dom', couteuse:'ha_trav_cout', echec:'ha_trav_ko' } },
    { t:"La rivière",
      detail:"Un jour et demi · une barque de meunier · et aucun endroit où se mettre à couvert",
      risque:"très dangereux",
      test:{ carac:'intellect', comp:'tactique', dc:11, manoeuvre:'riviere' },
      degres:{ dominante:'ha_riv_dom', couteuse:'ha_riv_cout', echec:'ha_riv_ko' } },
  ],
},

ha_poste_dom:{
  melee:true,
  texte:[
    "La route de poste est le contraire d'une cachette et c'est précisément l'idée.",
    { sobre:"On voyage à découvert, avec des témoins à chaque relais.",
      intense:"On voyage à découvert, en payant les relais, en signant les registres d'étape, en dînant dans les salles communes. À chaque relais, onze à quarante personnes voient passer une dame de trente et un ans qui n'est manifestement ni attachée, ni malade, ni contrainte.",
      extreme:"On voyage à découvert : on paie les relais, on signe les registres, on dîne dans les salles communes. À chaque étape, onze à quarante personnes voient une dame de trente et un ans qui n'est ni attachée, ni malade, ni contrainte, et qui demande au sergent d'étape d'inscrire son nom en toutes lettres — Isabeau de Hauterive, née de Vermoise — parce qu'un registre d'étape se recopie, se transmet et se lit." },
    "§ On ne fait pas disparaître une femme que trois cents personnes ont vue passer en deux jours.",
    "C'est Isabeau qui a eu l'idée. Vous l'avez seulement acceptée, ce qui est déjà la moitié du travail d'une escorte.",
    "Les quatorze de Hauterive sont sur cette route. On les croise au deuxième relais.",
    "Ils ne font rien. Quatorze hommes d'armes dans la cour d'un relais de poste, à midi, devant quarante témoins, ne font rien du tout — et leur capitaine salue, parce qu'il faut bien saluer.",
  ],
  effets:{ faire:() => avancer(50, 10), flags:['ha_temoins','ha_registres'], meleeMaj:barreRoute,
           exploit:{ eclat:5, temoins:'province', quoi:"trois cents personnes ont vu passer Isabeau de Hauterive libre" },
           marque:"Isabeau a signé les registres d'étape en toutes lettres, à chaque relais.",
           court:"Les registres" },
  suite:'ha_derniere', libelleSuite:"La dernière lieue" },

ha_poste_cout:{
  melee:true,
  texte:[
    "La route de poste marche jusqu'au deuxième relais.",
    { sobre:"Au deuxième relais, il y a huit hommes en gris qui ne sont pas de Hauterive.",
      intense:"Au deuxième relais, il y a huit hommes qui ne portent pas les couleurs de Hauterive et qui ne sont pas non plus de la maréchaussée. Ils ne vous attendent pas dans la cour : ils sont dans la salle, attablés, et ils se lèvent quand Isabeau entre.",
      extreme:"Au deuxième relais, huit hommes qui ne portent pas les couleurs de Hauterive et ne sont pas de la maréchaussée. Ils ne sont pas dans la cour : ils sont dans la salle, attablés depuis un moment, avec des chopes vides devant eux — ce qui veut dire qu'ils attendent depuis longtemps, ce qui veut dire qu'on leur a dit où et quand." },
    "Ça se règle en une minute et demie, dans une salle de relais, entre les tables, où personne ne peut se servir d'une épée longue correctement.",
    "Deux des hommes de Jaufré restent par terre. Trois des huit aussi. Les cinq autres partent par la cour.",
    "§ Quarante témoins ont vu ça. Ce n'est pas rien : on n'organise pas deux fois une chose que quarante personnes ont vue.",
    "Mais vous avez perdu deux hommes et une demi-journée, et Isabeau a du sang de quelqu'un d'autre sur sa robe pour les neuf lieues restantes.",
  ],
  effets:{ faire:() => avancer(35, 25), flags:['ha_temoins','ha_deux_morts'],
           cout:{ endurance:16, vitalite:10 }, meleeMaj:barreRoute,
           blessure:{ id:'main_ha', zone:"Main droite", type:"ouverte entre les tables d'une salle de relais",
                      gravite:1, douleur:2, saignement:1, fonction:['epees','lutte'],
                      cicatrice:"une entaille en travers de la paume" },
           exploit:{ eclat:5, temoins:'foule', quoi:"une salle de relais entière vous a vu défendre Isabeau de Hauterive" },
           marque:"Huit hommes attendaient au deuxième relais. Deux des six de Jaufré sont morts.",
           court:"Le deuxième relais" },
  suite:'ha_derniere', libelleSuite:"La dernière lieue" },

ha_poste_ko:{
  melee:true,
  texte:[
    "On est visible, et être visible ne protège que si les gens qui vous voient comptent pour quelque chose.",
    { sobre:"Au premier relais, le maître de poste refuse les chevaux.",
      intense:"Au premier relais, le maître de poste refuse les chevaux. Il n'y a pas de discussion, pas d'explication, pas d'excuse : il refuse, il retourne à ses écuries, et il ne ressort pas. Hauterive a écrit avant vous — c'est ce que fait un homme qui a quatorze hommes d'armes et un clerc.",
      extreme:"Au premier relais, le maître de poste refuse les chevaux. Pas de discussion, pas d'explication : il refuse, retourne à ses écuries et n'en ressort pas. Hauterive a écrit avant vous, à tous les relais de la route, ce que fait un homme qui possède quatorze hommes d'armes et un clerc — et une lettre de maison à un maître de poste ne coûte rien du tout, et arrive plus vite qu'un convoi." },
    "Il faut faire onze lieues avec les chevaux qu'on a, en les ménageant, ce qui prend quatre jours au lieu de deux.",
    "§ Quatre jours. Derrière vous, quatorze hommes ont des chevaux de relais.",
  ],
  effets:{ faire:() => avancer(20, 45), flags:['ha_relais_fermes'], cout:{ endurance:14 },
           meleeMaj:barreRoute,
           marque:"Hauterive avait écrit à tous les relais avant vous.", court:"Les relais fermés" },
  suite:'ha_derniere', libelleSuite:"La dernière lieue" },

ha_trav_dom:{
  melee:true,
  texte:[
    "Les traverses ne sont pas des routes : ce sont des chemins de fermes, des sentes de bûcheron et des passages de gué qui n'existent qu'à la belle saison.",
    { sobre:"Quatre jours. Personne. C'est exactement ce qu'on voulait.",
      intense:"Quatre jours sans croiser personne d'autre que trois bergers et un colporteur, ce qui est exactement ce qu'on voulait et ce qui coûte deux nuits dehors, un chariot cassé et le double de fatigue. On avance de trois lieues par jour au lieu de six.",
      extreme:"Quatre jours sans croiser autre chose que trois bergers et un colporteur : exactement ce qu'on voulait. Ça coûte deux nuits dehors, un essieu cassé qu'il faut remplacer par une branche de frêne et douze heures perdues, et le double de fatigue pour tout le monde. Trois lieues par jour au lieu de six, et Isabeau de Hauterive fait les deux dernières à pied sans le dire à personne." },
    "§ Personne ne vous trouve. C'est une victoire complète et parfaitement invisible, ce qui est la définition d'une bonne escorte.",
    "Au soir du quatrième jour, on voit les toits de Chastel depuis une crête, et il y a une lieue.",
    "Jaufré s'arrête son cheval et il regarde la ville pendant un long moment.",
    "« En quatorze ans, c'est le premier contrat dont je ne connaissais pas la fin en partant. »",
  ],
  effets:{ faire:() => avancer(45, 5), flags:['ha_discret'], cout:{ endurance:20 },
           meleeMaj:barreRoute,
           marque:"Quatre jours de traverses. Personne ne vous a trouvés.", court:"Les traverses" },
  suite:'ha_derniere', libelleSuite:"La dernière lieue" },

ha_trav_cout:{
  melee:true,
  texte:[
    "Les traverses marchent, et elles coûtent ce que coûtent les traverses.",
    { sobre:"Le gué du troisième jour est plus haut qu'annoncé.",
      intense:"Le gué du troisième jour est plus haut que ce que disait le berger, parce qu'il a plu en amont et que les bergers ne savent pas ce qui se passe en amont. Le chariot part en travers au milieu, avec le coffret dedans.",
      extreme:"Le gué du troisième jour est plus haut que ce que disait le berger : il a plu en amont, et un berger ne sait pas ce qui se passe en amont. Le chariot part en travers au milieu, avec le coffret dedans, et il faut entrer dans une eau de printemps jusqu'à la poitrine pour aller le chercher — pas le chariot : le coffret, parce que le chariot ne vaut rien et que quarante lettres recopiées à la main pendant trois mois valent la vie d'un homme." },
    "Vous ressortez avec le coffret au-dessus de la tête et un cheval en moins.",
    "§ Les lettres sont mouillées sur les bords. Isabeau les sèche une par une devant un feu pendant six heures, en les tournant, sans en perdre une.",
    "Elle ne dit rien pendant les six heures. Il n'y a rien à dire : ce sont trois mois de nuits.",
  ],
  effets:{ faire:() => avancer(30, 15), flags:['ha_discret','ha_lettres_mouillees'],
           cout:{ endurance:24, vitalite:6 }, meleeMaj:barreRoute,
           marque:"Le coffret est passé dans un gué de printemps. Elle a séché quarante lettres une par une.",
           court:"Le gué" },
  suite:'ha_derniere', libelleSuite:"La dernière lieue" },

ha_trav_ko:{
  melee:true,
  texte:[
    "On se perd. Ce n'est pas honteux : c'est ce qui arrive quand on prend des chemins de fermes dans une province qu'on ne connaît pas, avec deux chariots et huit personnes.",
    { sobre:"Deux jours de perdus, et on ressort sur la route de poste.",
      intense:"Deux jours de perdus, et le pire : on ressort sur la route de poste, à six lieues du départ, exactement à l'endroit où l'on aurait été si l'on n'avait rien fait — sauf qu'on a deux jours de moins et des chevaux fatigués.",
      extreme:"Deux jours perdus, et pire : on ressort sur la route de poste à six lieues du départ, exactement là où l'on serait si l'on n'avait rien tenté — avec deux jours de moins, des chevaux fourbus, et huit personnes qui ont cessé de croire que quelqu'un mène cette colonne." },
    "§ Derrière vous, quatorze hommes ont eu deux jours et une route droite.",
  ],
  effets:{ faire:() => avancer(15, 50), cout:{ endurance:22, moral:8 }, meleeMaj:barreRoute,
           marque:"Deux jours perdus dans les traverses, pour ressortir sur la route de poste.",
           court:"Perdus" },
  suite:'ha_derniere', libelleSuite:"La dernière lieue" },

ha_riv_dom:{
  melee:true,
  texte:[
    "La rivière descend vers Chastel et elle y descend en un jour et demi, ce qu'aucun cheval ne fait.",
    "Il faut une barque de meunier, et un meunier, et une raison de payer un meunier assez cher pour qu'il ne parle pas.",
    { sobre:"Trente-six heures, dont une nuit entière sur l'eau.",
      intense:"Trente-six heures dont une nuit entière sur l'eau, sans feu, sans lumière, à se laisser porter au fil dans une barque à fond plat avec huit personnes et un coffret. Personne ne parle. On entend les berges des deux côtés et on ne voit rien.",
      extreme:"Trente-six heures dont une nuit entière sur l'eau, sans feu, sans lumière, portés au fil dans une barque à fond plat de vingt-huit pieds. Huit personnes, un coffret, et l'interdiction absolue de parler : sur une rivière, de nuit, une voix porte à six cents pas et une berge est un endroit où quelqu'un peut être assis. On entend les deux rives à la fois et on ne voit ni l'une ni l'autre." },
    "§ Aucun cavalier ne peut suivre une barque. C'est mécanique et c'est la seule chose de tout l'arc qui soit entièrement de votre côté.",
    "Vous arrivez au port de Chastel au matin du deuxième jour, avant les quatorze, avant les huit, avant tout le monde.",
  ],
  effets:{ faire:() => avancer(60, 0), flags:['ha_riviere','ha_avance'], cout:{ endurance:12 },
           meleeMaj:barreRoute,
           exploit:{ eclat:4, temoins:'quelques', quoi:"vous avez descendu la rivière de nuit sans une lumière" },
           marque:"Trente-six heures de rivière. Vous êtes arrivés avant tout le monde.", court:"La rivière" },
  suite:'ha_derniere', libelleSuite:"Le port de Chastel" },

ha_riv_cout:{
  melee:true,
  texte:[
    "La rivière est rapide et elle n'offre aucun couvert, ce qui est exactement le marché qu'on a accepté en montant dans la barque.",
    { sobre:"Au deuxième coude, il y a des arcs sur la berge droite.",
      intense:"Au deuxième coude, il y a des arcs sur la berge droite. Quatre, à soixante pas, sur une barque à fond plat de vingt-huit pieds qui ne peut ni virer, ni accélérer, ni se mettre à couvert.",
      extreme:"Au deuxième coude, quatre arcs sur la berge droite, à soixante pas, sur une barque à fond plat de vingt-huit pieds qui ne peut ni virer, ni accélérer, ni se couvrir. Soixante pas, c'est la distance à laquelle un archer médiocre touche un homme couché. Il n'y a rien à faire d'intelligent : il y a à se coucher sur le coffret et à compter." },
    "Onze flèches en quarante secondes. Un des hommes de Jaufré prend la troisième dans la gorge et il tombe par-dessus bord, et on ne s'arrête pas, parce qu'on ne s'arrête pas.",
    "Vous prenez la neuvième dans le dos, en travers de l'omoplate, en couvrant le coffret.",
    "§ Le courant vous sort du coude en quarante secondes. C'est tout ce qu'il fallait tenir.",
  ],
  effets:{ faire:() => avancer(50, 10), flags:['ha_riviere','ha_un_mort'],
           cout:{ endurance:16, vitalite:16 }, meleeMaj:barreRoute,
           blessure:{ id:'omoplate_ha', zone:"Omoplate droite", type:"flèche, tirée à soixante pas",
                      gravite:2, douleur:3, saignement:3, fonction:['force','epees','jet','armes_lourdes'],
                      cicatrice:"un trou net dans l'omoplate qui siffle au vent d'est" },
           exploit:{ eclat:5, temoins:'quelques', quoi:"vous avez couvert le coffret de votre dos sous onze flèches" },
           marque:"Onze flèches au deuxième coude. Un homme de Jaufré est tombé par-dessus bord.",
           court:"Le coude" },
  suite:'ha_derniere', libelleSuite:"Le port de Chastel" },

ha_riv_ko:{
  melee:true,
  texte:[
    "Il n'y a pas de barque.",
    { sobre:"Le meunier a été payé avant vous.",
      intense:"Le meunier a été payé avant vous. Pas beaucoup — un meunier ne coûte pas cher — et pas pour trahir : simplement pour ne pas avoir de barque disponible cette semaine, ce qui n'est un crime nulle part et ce qui suffit.",
      extreme:"Le meunier a été payé avant vous. Pas cher — un meunier ne coûte pas cher — et pas pour trahir : simplement pour ne pas avoir de barque disponible cette semaine. Ce n'est un crime dans aucune province, ça se dit en trois mots et ça ne se prouve jamais, et c'est ce qui rend un homme comme Hauterive dangereux : il n'a jamais besoin de demander à personne de faire quelque chose de grave." },
    "§ Deux jours perdus à trouver autre chose, et il faut finir à cheval, par la route de poste, sans le moindre avantage.",
  ],
  effets:{ faire:() => avancer(15, 45), cout:{ endurance:16, moral:8 }, meleeMaj:barreRoute,
           marque:"Le meunier avait été payé pour ne pas avoir de barque cette semaine.",
           court:"Pas de barque" },
  suite:'ha_derniere', libelleSuite:"La dernière lieue" },

};
Object.assign(ARC_C06, ARC_C06_2);

/* ══ LA DERNIÈRE LIEUE ════════════════════════════════════════════════════ */
const ARC_C06_3 = {

ha_derniere:{
  qui:'isabeau', melee:true,
  titre:"La dernière lieue",
  effets:{ meleeMaj:barreRoute },
  texte:[
    () => route().suivi >= 40
      ? "Ils sont derrière. Pas loin : on les voit depuis la crête, à trois quarts de lieue, et ils sont plus nombreux qu'à Hauterive — quatorze plus huit, ou quatorze plus ce qu'on a pu acheter en chemin."
      : (route().suivi >= 15
        ? "Ils sont derrière, mais loin. On a de l'avance, pas beaucoup, et l'avance est la seule monnaie de cette dernière lieue."
        : "Il n'y a personne derrière. C'est presque inquiétant et ça ne l'est pas : vous avez simplement bien travaillé."),
    "Chastel est là. Une ville de province avec un mur, quatre portes, un port fluvial et un greffe de bailliage qui ouvre à la première cloche.",
    { sobre:"Il reste une lieue et une porte.",
      intense:"Il reste une lieue, une porte, et le fait qu'un greffe n'ouvre pas la nuit. Ce qu'on a mis quatre jours à gagner peut se perdre en attendant une cloche du matin devant un mur.",
      extreme:"Il reste une lieue, une porte, et le fait qu'un greffe de bailliage n'ouvre pas la nuit. Tout ce qu'on a gagné en quatre jours peut se perdre à attendre une cloche du matin, assis contre un mur d'enceinte, à cent pas d'un guichet fermé — et les gens qui vous suivent le savent aussi bien que vous." },
    "Isabeau de Hauterive tient le coffret sur ses genoux depuis onze lieues et elle ne l'a laissé à personne.",
    "« Une dernière chose, messire, et je vous la dois. »",
    "« Dites. »",
    "« Quand ces lettres seront au greffe, je ne serai plus utile à personne. Mon mari sera pendu ou il ne le sera pas, et dans les deux cas je serai une femme de trente et un ans sans maison, sans dot — je l'ai donnée à Jaufré — et avec une réputation qui tiendra en une phrase. »",
    "§ « Je le sais depuis le premier jour où j'ai recopié une lettre. Je ne vous demande rien. Je vous le dis pour que vous sachiez ce que vous escortez. »",
  ],
  choix:[
    { t:"Entrer par la porte, à découvert, et attendre la cloche devant le greffe",
      detail:"Une nuit à cent pas d'un guichet fermé · en ville · avec des témoins",
      risque:"calculé",
      test:{ carac:'presence', comp:'tactique', dc:() => 10 + Math.floor(route().suivi / 20),
             manoeuvre:'porte' },
      degres:{ dominante:'ha_fin_greffe', couteuse:'ha_fin_greffe_cher', echec:'ha_derniere_ko' } },

    { t:"Faire entrer le coffret seul",
      detail:"Un coffret passe une porte de ville dans un panier de linge · elle reste dehors",
      ferme:"Ferme : l'idée que vous escortiez une personne et pas un objet",
      risque:"dangereux", definitif:true,
      test:{ carac:'intellect', comp:'furtivite', dc:11, manoeuvre:'coffret_seul' },
      degres:{ dominante:'ha_fin_coffret_seul', couteuse:'ha_fin_coffret_seul', echec:'ha_derniere_ko' } },

    { t:"Les attendre sur la crête",
      detail:"Sept contre quatorze ou plus · sur un terrain que vous choisissez · pour gagner une nuit",
      risque:"très dangereux", definitif:true, va:'ha_crete' },
  ],
},

ha_crete:{
  qui:'jaufre', melee:true,
  titre:"Sept",
  texte:[
    "On ne gagne pas une bataille à sept contre vingt-deux. On gagne une nuit, ce qui n'est pas la même chose et ce qui est tout ce qu'il faut.",
    "Jaufré comprend en trois secondes et il ne discute pas : il descend de cheval, il regarde la crête, et il place ses hommes sans qu'on ait à lui expliquer.",
    { sobre:"« Une crête, une haie, et un seul passage. C'est déjà ça. »",
      intense:"« Une crête, une haie de deux cents ans, et un seul passage de six pieds où l'on ne monte pas à deux de front. » Il crache. « J'ai vu pire. Deux fois. »",
      extreme:"« Une crête, une haie vive de deux cents ans et un seul passage de six pieds où l'on ne monte pas à deux de front. » Il crache. « J'ai vu pire deux fois, et les deux fois j'y étais du bon côté de la haie, ce qui est la seule chose qui compte dans ce métier. »" },
    "Il envoie deux hommes avec Isabeau et le coffret vers la porte de la ville.",
    "« Ils y seront à la cloche. Nous, on tient jusqu'à la cloche. »",
    "« Et après la cloche ? »",
    "« Après la cloche, ils n'ont plus de raison de monter cette crête, et ils rentreront chez eux, parce que ce sont des hommes payés au mois et qu'aucun d'eux ne meurt pour un siège au conseil de province. »",
    "§ Il a raison. C'est le renseignement le plus utile de tout l'arc et il vient d'un homme qui n'a jamais rompu un contrat en quatorze ans.",
    "Ils montent trois fois. Trois fois, dans un passage de six pieds, contre cinq hommes et une haie.",
    { sobre:"Ça dure quatre heures. Deux des cinq ne redescendent pas.",
      intense:"Ça dure quatre heures et ça ne ressemble à rien de ce qu'on raconte : pas de charge, pas de mêlée, pas d'exploit. Trois montées, trois reculs, et entre les trois, une heure d'attente chaque fois, dans le noir, à écouter des chevaux en bas. Deux des cinq ne redescendent pas de cette crête.",
      extreme:"Quatre heures, et ça ne ressemble à rien de ce qu'on raconte : pas de charge, pas de mêlée, pas d'exploit. Trois montées, trois reculs, et entre chaque, une heure d'attente dans le noir à écouter des chevaux souffler en bas. Ce qu'on retient, ce n'est pas le combat : c'est l'attente, et le froid, et le fait qu'un homme blessé au ventre à la deuxième montée met les quatre heures à mourir en demandant de l'eau qu'on n'a pas." },
    "La cloche sonne à la sixième heure.",
    "Les vingt-deux redescendent la pente et rentrent chez eux, exactement comme Jaufré l'avait dit, parce que ce sont des hommes payés au mois.",
  ],
  effets:{ flags:['ha_crete','ha_deux_morts_crete'], cout:{ endurance:30, vitalite:18 },
           blessure:{ id:'cuisse_ha', zone:"Cuisse gauche", type:"ouverte dans un passage de six pieds",
                      gravite:2, douleur:3, saignement:3, fonction:['agilite','endurance','lutte'],
                      cicatrice:"une cuisse qui se rappelle à la troisième heure de marche" },
           exploit:{ eclat:9, temoins:'quelques', quoi:"vous avez tenu une crête à cinq contre vingt-deux jusqu'à la cloche" },
           marque:"Vous avez tenu la crête quatre heures. Deux des cinq ne sont pas redescendus.",
           court:"La crête" },
  suite:'ha_fin_greffe', libelleSuite:"La cloche" },

ha_derniere_ko:{
  melee:true,
  texte:[
    "Ils arrivent avant la cloche.",
    { sobre:"Ça se passe à cent pas d'un guichet fermé, dans une rue de ville, à l'aube.",
      intense:"Ça se passe à cent pas d'un guichet fermé, dans une rue de ville qui se réveille, à l'aube grise, et il n'y a rien d'héroïque là-dedans : vingt hommes dans une rue de douze pieds contre sept, ça ne se raconte pas, ça se compte.",
      extreme:"Ça se passe à cent pas d'un guichet fermé, dans une rue de douze pieds qui se réveille, à l'aube grise. Vingt hommes contre sept : ça ne se raconte pas, ça se compte. Une fenêtre s'ouvre au premier étage, quelqu'un regarde, et la fenêtre se referme — et c'est ce bruit-là de volet qu'on emporte, pas le reste." },
    "Vous ne perdez pas le coffret. C'est la seule chose que vous ne perdez pas.",
    "Jaufré prend une lame sous l'aisselle à la deuxième minute et il finit quand même le contrat, parce qu'il n'en a jamais rompu un en quatorze ans : il pousse Isabeau et le coffret dans la ruelle d'à côté, il revient, et il tient la rue trente secondes de plus.",
    "§ Trente secondes de plus, à quarante-six ans, avec une lame sous l'aisselle. C'est tout ce qu'un homme peut donner et il l'a donné.",
    "La cloche sonne pendant.",
  ],
  effets:{ flags:['ha_jaufre_mort','ha_rue'], cout:{ endurance:26, vitalite:22, moral:14 },
           blessure:{ id:'flanc_ha', zone:"Flanc droit", type:"ouvert dans une rue de douze pieds",
                      gravite:3, douleur:3, saignement:4, fonction:['force','endurance','agilite','lutte'],
                      cicatrice:"un flanc qui a mis quatre mois et qui tire en se retournant" },
           exploit:{ eclat:8, temoins:'foule', quoi:"une rue de Chastel a vu sept hommes en tenir vingt" },
           marque:"Jaufré est mort dans une rue de Chastel en finissant son contrat.", court:"Jaufré" },
  suite:'ha_fin_greffe_cher', libelleSuite:"La cloche" },

/* ══ LES ISSUES ═══════════════════════════════════════════════════════════ */
ha_fin_greffe:{
  lieu:"Chastel · le greffe du bailliage · première cloche",
  titre:"Quarante lettres",
  qui:'isabeau',
  texte:[
    "Un greffe de bailliage ouvre à la première cloche et il ouvre pour tout le monde. C'est même son seul principe et c'est celui qui décide de cette affaire.",
    "Isabeau de Hauterive dépose quarante-deux lettres — vingt et une originales, vingt et une copies de sa main — contre récépissé, cote et date.",
    { sobre:"Ça prend une heure et onze couronnes.",
      intense:"Ça prend une heure, onze couronnes de droit de dépôt, et un clerc de vingt-six ans qui compte les pièces à voix haute une par une sans manifester le moindre intérêt pour leur contenu, ce qui est très exactement son métier et ce qui est, ce matin-là, la chose la plus rassurante du monde.",
      extreme:"Une heure, onze couronnes de droit de dépôt, et un clerc de vingt-six ans qui compte les pièces à voix haute, une par une, sans manifester le moindre intérêt pour leur contenu. C'est exactement son métier, et c'est ce matin-là la chose la plus rassurante du monde connu : après quatre jours de route et onze lieues, ce qui sauve quarante-deux lettres, c'est un homme qui s'en moque et qui les compte bien." },
    "§ Une pièce déposée au greffe ne se brûle plus. C'est tout ce qu'elle voulait et il lui a fallu trois mois de nuits, six cents couronnes de dot et onze lieues.",
    "Elle signe le récépissé. Puis elle reste assise sur le banc du greffe pendant un long moment, sans rien faire, parce qu'il n'y a plus rien à faire.",
    "« Voilà », dit-elle.",
  ],
  issue:"L'affaire est close autrement",
  bilan:"Quarante-deux lettres sont déposées au greffe de Chastel, contre récépissé",
  apres:[
    "Le sire de Hauterive est arrêté en Prairial, le mois où il devait prendre son siège au conseil de province. Il est jugé sur les lettres, ce qui prend onze mois, et il est exécuté l'année suivante.",
    () => a('ha_jaufre_mort')
      ? "Jaufré est mort dans une rue de Chastel en finissant un contrat qu'il n'était plus payé pour finir. Quatorze ans, pas une rupture. Ses hommes se sont dispersés le mois suivant : une compagnie franche est un capitaine, et rien d'autre."
      : "Jaufré est reparti vers le sud avec quatre hommes et six cents couronnes de dot. Il n'a rompu aucun contrat en quatorze ans et il n'en a pas rompu celui-là.",
    () => a('ha_paye_avance')
      ? "Vous étiez payé d'avance. Hauterive avait dit pourquoi : *pour que vous soyez déjà payé quand vous la verrez.* Il avait raison sur tout sauf sur ce que ça produirait."
      : "Vous n'êtes pas payé, et il n'y a personne pour vous payer : le commanditaire est aux fers.",
    "Isabeau de Hauterive a trente et un ans, aucune maison, aucune dot, et une réputation qui tient en une phrase. Elle le savait avant de commencer et elle l'a dit à voix haute sur une crête, à une lieue de la ville.",
  ],
  plusTard:"Un siège au conseil de province reste vacant deux ans. Personne ne fait le rapprochement entre cette vacance et une femme qui a recopié quarante lettres à la chandelle pendant trois mois.",
},

ha_fin_greffe_cher:{
  lieu:"Chastel · le greffe · première cloche",
  titre:"Ce que ça a coûté",
  texte:[
    "Le dépôt se fait quand même. Il se fait à l'heure, contre récépissé, cote et date, par une femme qui a du sang qui n'est pas le sien jusqu'aux coudes et que le clerc ne regarde pas.",
    "§ Un greffe ne juge pas de quoi ont l'air les gens qui déposent. C'est son unique vertu et elle est immense.",
    "Quarante-deux pièces. Onze couronnes de droit. Une heure.",
    () => a('ha_jaufre_mort')
      ? "Jaufré n'est pas là. Il est resté dans une rue à cent pas, avec deux de ses hommes, et il a tenu trente secondes de plus qu'il n'aurait dû."
      : "Il manque des gens autour de la table du greffe, et personne ne les compte à voix haute.",
    "Isabeau signe le récépissé de la main gauche parce que la droite ne répond plus très bien.",
  ],
  issue:"L'affaire est close, et elle a coûté ce qu'elle a coûté",
  bilan:"Les lettres sont déposées, et il manque des gens",
  apres:[
    "Le sire de Hauterive est arrêté en Prairial et exécuté l'année suivante. Le résultat est exactement le même que si tout s'était bien passé, ce qui est la chose la plus difficile à admettre de tout ce métier.",
    () => `${ETAT.blessures.length} blessure${ETAT.blessures.length > 1 ? 's' : ''}, onze lieues, et quarante-deux pièces au greffe.`,
    "On ne compte pas les morts d'une escorte dans un récépissé. Il n'y a pas de case.",
  ],
  plusTard:"Isabeau de Hauterive fait dire une messe par an, en Prairial, pour des noms qu'elle est seule à connaître. Elle le fera trente ans.",
},

ha_fin_coffret_seul:{
  lieu:"Chastel · le greffe",
  titre:"Un panier de linge",
  texte:[
    "Un coffret de deux pieds sur un passe une porte de ville dans un panier de linge, sous une lavandière qui rentre au matin, pour quatre couronnes et aucune question.",
    "Les lettres arrivent au greffe. Elles sont déposées, cotées, datées.",
    { sobre:"Elle reste dehors. C'était le prix et elle l'a accepté.",
      intense:"Elle reste dehors, parce qu'une femme de trente et un ans qu'on cherche ne passe pas une porte de ville dans un panier de linge. Elle l'a accepté en trois secondes, sans discuter, parce qu'elle avait déjà fait le calcul avant vous.",
      extreme:"Elle reste dehors : une femme de trente et un ans qu'on cherche ne passe pas une porte de ville dans un panier de linge. Elle l'a accepté en trois secondes sans discuter — elle avait fait le calcul avant vous, probablement dès le moulin, et elle attendait seulement que quelqu'un d'autre le formule pour ne pas avoir à le proposer elle-même." },
    "§ Les vingt-deux la trouvent dans la matinée, à une demi-lieue de la porte.",
    "Ils ne la tuent pas. On ne tue pas une dame de maison sur une route : on la ramène chez son mari, et c'est même exactement ce que le mot *ramener* a toujours voulu dire dans ce contrat.",
    "Elle meurt en Prairial. La maison fait dire une fièvre.",
    "Le dépôt, lui, tient. Il tient parce qu'un greffe ne rend pas ce qu'on lui a confié, et le sire de Hauterive est arrêté en Messidor, deux mois après l'enterrement de sa femme, sur des pièces déposées par une lavandière dont personne n'a jamais retrouvé le nom.",
  ],
  effets:{ flags:['ha_coffret_passe','ha_isabeau_morte'], cout:{ moral:22 } },
  issue:"L'affaire est close autrement",
  bilan:"Les lettres sont arrivées et elle n'est pas arrivée",
  apres:[
    "Vous avez escorté un objet. C'est ce que vous avez décidé à une lieue d'une porte de ville, et l'objet est arrivé, et il a fait exactement ce qu'il devait faire.",
    "Elle vous avait dit sur la crête ce qu'elle escortait elle-même : quarante lettres qui valaient plus qu'elle. Vous l'avez crue. C'est peut-être le pire dans cette affaire — vous l'avez crue.",
  ],
  plusTard:"Un siège au conseil de province reste vacant deux ans, et une tombe de Hauterive porte une date de Prairial et le mot *fièvre*.",
},

ha_ramener:{
  lieu:"Hauterive · la cour",
  titre:"À la lettre",
  qui:'hauterive',
  texte:[
    "Elle ne résiste pas. C'est ce qui rend le retour insupportable sur quatorze lieues : elle monte dans le chariot, elle s'assied, et elle ne dit plus un seul mot pendant deux jours.",
    { sobre:"Jaufré ne s'y oppose pas non plus.",
      intense:"Jaufré ne s'y oppose pas. Son contrat dit *la conduire où elle veut aller* — et quand elle cesse de vouloir aller quelque part, le contrat cesse. Il rend six cents couronnes de dot, en pièces comptées, à une femme qui ne les prend pas. Il les laisse sur la table du moulin et il part.",
      extreme:"Jaufré ne s'y oppose pas : son contrat dit *la conduire où elle veut aller*, et quand elle cesse de vouloir aller quelque part, le contrat cesse de lui-même. Il rend les six cents couronnes de dot en pièces comptées deux fois. Elle ne les prend pas. Il les laisse sur la table du moulin, il regarde la table un moment, et il part avec ses six hommes sans un mot pour personne — quatorze ans, pas une rupture, et il vient de tenir celui-là aussi." },
    "Le coffret arrive à Hauterive avec elle. Le sire l'ouvre dans la cour, devant tout le monde, et il compte les lettres à voix haute.",
    "« Quarante-deux. Il y en a le double. »",
    "« Elle les a recopiées. »",
    "« Je sais. » Il referme le coffret. « Elle les a recopiées pendant trois mois dans ma propre maison et je ne m'en suis aperçu qu'en Ventôse. »",
    "§ Il vous paie dans la cour, en pièces comptées deux fois, et il vous remercie.",
    "Il la remercie elle aussi, à voix haute, devant la maison — de s'être laissé ramener sans faire d'histoire — et c'est la phrase la plus obscène de tout cet acte.",
    "Elle meurt en Prairial. On dit une fièvre.",
  ],
  effets:{ or:280, flags:['ha_ramenee','ha_isabeau_morte'], cout:{ moral:30 },
           marque:"Vous avez ramené Isabeau de Hauterive à son mari, avec le coffret.", court:"Ramenée" },
  issue:"L'affaire est close",
  bilan:"Le contrat est rempli à la lettre",
  apres:[
    "Deux cent quatre-vingts couronnes, comptées deux fois, dans une cour, par un homme qui vous remercie.",
    "Les lettres sont brûlées le soir même dans la cheminée du cabinet. Les deux liasses : elle avait raison de dire que deux liasses dans deux endroits ne se brûlent pas, et tort de croire qu'elle aurait deux endroits.",
    "Le sire de Hauterive prend son siège au conseil de province en Prairial, la semaine de l'enterrement.",
  ],
  plusTard:"Il siégera dix-neuf ans. C'est un administrateur compétent et il n'y a pas une plainte contre lui dans les registres de la province.",
},

ha_coffret:{
  lieu:"Un moulin abandonné",
  titre:"Ce qui vaut plus qu'elle",
  texte:[
    "Vous prenez le coffret.",
    { sobre:"Jaufré ne bouge pas. Son contrat porte sur elle, pas sur un objet.",
      intense:"Jaufré ne bouge pas : son contrat porte sur la conduire où elle veut aller et sur n'empêcher personne de lui parler, et il n'y a pas une ligne sur un coffret. Il l'a lu trois fois avant de le signer et il le récite de mémoire pendant que vous sortez.",
      extreme:"Jaufré ne bouge pas. Son contrat porte sur la conduire où elle veut aller et sur n'empêcher personne de lui parler ; il n'y a pas une ligne sur un coffret. Il l'a lu trois fois avant de le signer, il le récite de mémoire pendant que vous sortez, et il le récite d'une voix parfaitement neutre — parce que c'est vrai, parce que c'est son métier, et parce qu'il vient de comprendre qu'il a rédigé un mauvais contrat pour la première fois en quatorze ans." },
    "Elle ne crie pas et ne supplie pas. Elle vous regarde partir avec le coffret, debout à une table de meunier, et elle dit une seule chose :",
    "« Vous les vendrez à qui ? »",
    "§ C'est une bonne question. Vous mettrez onze jours à trouver la réponse.",
    "Le sire de Hauterive paie mille deux cents couronnes pour ce coffret. Il les paie sans négocier, dans la même heure, ce qui vous apprend que vous auriez pu demander le double.",
  ],
  effets:{ or:1200, flags:['ha_vendu','ha_isabeau_morte'], cout:{ moral:40 },
           exploit:{ eclat:2, temoins:'un', quoi:"vous avez vendu quarante-deux lettres à celui qu'elles accusaient" },
           marque:"Vous avez vendu le coffret d'Isabeau à son mari pour mille deux cents couronnes.",
           court:"Mille deux cents" },
  issue:"L'affaire est close, et c'est le mot juste",
  bilan:"Mille deux cents couronnes, et une femme dans un moulin",
  apres:[
    "C'est le plus gros paiement de l'acte, de très loin, et il ne vient d'aucun contrat : il vient d'une transaction que personne ne vous avait proposée et que vous avez montée seul.",
    "Elle est retrouvée trois semaines plus tard. La maison fait dire une fièvre, ce qui est la formule et ce qui trompe exactement personne dans la province.",
    "Jaufré, lui, ne rompt toujours pas de contrat. Il en refuse un, cependant, six mois plus tard, quand un homme d'armes sans nom se présente pour une escorte dans le sud.",
  ],
  plusTard:"Mille deux cents couronnes se dépensent en dix-huit mois. Le reste ne se dépense pas.",
},

ha_fin_parti:{
  lieu:"Hauterive · le cabinet",
  titre:"Le moulin était vide",
  qui:'hauterive',
  texte:[
    "« Le moulin était vide. »",
    "Il vous regarde pendant onze secondes. C'est un homme qui a fermé les portes avant de dire bonjour et il sait parfaitement ce qu'il est en train d'entendre.",
    "« Vide. »",
    "« Vide depuis plusieurs jours. Feux froids, litières emportées. Ils sont partis vers le sud. »",
    { sobre:"« Vers le sud. »",
      intense:"« Vers le sud », répète-t-il, et il n'y croit pas une seconde, et il ne dira rien, parce qu'un homme qui a exigé la discrétion avant le prix ne peut pas se plaindre qu'on lui rapporte trop peu.",
      extreme:"« Vers le sud », répète-t-il, et il n'y croit pas une seconde. Il ne dira rien non plus : un homme qui a exigé la discrétion avant le prix ne peut pas se plaindre qu'on lui en rapporte trop peu, et il le sait, et il sait que vous le savez, et il n'y a rien de plus à faire dans ce cabinet." },
    "« Vous ne serez pas payé. »",
    "« Je sais. »",
    "§ Onze lieues au nord, une femme de trente et un ans fait sa route avec six hommes au lieu de sept.",
  ],
  issue:"L'affaire est abandonnée",
  bilan:"Vous avez menti au commanditaire et vous n'avez rien touché",
  apres:[
    "Elle arrive à Chastel ou elle n'y arrive pas, et vous ne le saurez pas avant Prairial, et vous n'aurez pas décidé.",
    "Ce n'est pas un demi-mal : c'est un demi-tout, ce qui est la seule chose que ce métier propose vraiment souvent et dont personne ne parle.",
    "Vous n'avez pas touché deux cent quatre-vingts couronnes, vous avez menti à un homme qui allait siéger au conseil de province, et vous êtes le seul au monde à savoir laquelle des deux choses vous coûtera le plus cher.",
  ],
  plusTard:"En Prairial, un colporteur vous apprendra si un siège de conseil de province a été occupé ou non. Ce sera la seule fois de votre vie où une nouvelle de politique provinciale vous coupera le souffle.",
},

};
Object.assign(ARC_C06, ARC_C06_3);
ARC_C06.ha_audience.choix.push({
  t:"Fixer les termes",
  si:() => !a('ha_termes_fait'),
  detail:"Or · noble adulte consentante · les deux · négocier · refuser",
  va:'ha_termes',
});
for(const id of ['ha_fin_greffe','ha_fin_greffe_cher','ha_fin_coffret_seul','ha_ramener','ha_coffret','ha_fin_parti']){
  ARC_C06[id].suite = 'entre_saisons';
  ARC_C06[id].libelleSuite = "Reprendre la route";
}
enregistrerScenes(ARC_C06);
