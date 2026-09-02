/* PARIAS — Acte II · ALARIELLE, ET LA PISTE DE L'ONDE
 * ═══════════════════════════════════════════════════════════════════════
 * Romance lente et politiquement explosive. Elle appartient au peuple dont
 * la guerre civile et l'Onde sont liées à l'origine du pouvoir Karlsberg.
 *
 * Son axe propre est le DEVOIR, et il ne s'achète pas. On ne le monte pas
 * en étant charmant : on le baisse en faisant des choses au monde.
 *
 * C'est aussi la piste qui explique pourquoi il y avait, dans chaque maison
 * de Paria, des gens qui n'avaient rien.
 * ═══════════════════════════════════════════════════════════════════════ */

const ALAR = {

el_arrivee:{
  lieu:"Aelthiriel · la porte basse",
  titre:"On n'y entre pas",
  texte:[
    "On n'entre pas à Aelthiriel : on y est reçu, et il faut une raison.",
    { sobre:"La porte basse est ouverte et gardée par quatre personnes qui ne portent pas d'arme.",
      intense:"La porte basse est ouverte — elle l'est toujours, c'est le principe — et elle est gardée par quatre personnes qui ne portent pas d'armes et qui vous arrêtent à onze pas sans faire un geste, simplement en cessant de faire autre chose.",
      extreme:"La porte basse est ouverte, elle l'est toujours, c'est le principe et c'est plus intimidant qu'une herse. Quatre gardes sans armes, assis, qui vous arrêtent à onze pas sans faire un geste — simplement en cessant tous les quatre, exactement en même temps, de faire ce qu'ils faisaient. On met une seconde à comprendre qu'on s'est arrêté soi-même." },
    "« Votre raison. »",
    "§ Il n'y a pas de bonne réponse et il y en a une seule.",
    "« Je suis un Paria et j'ai une question sur ce que j'ai sous les côtes. »",
    { sobre:"Les quatre se regardent. C'est la première fois qu'ils bougent.",
      intense:"Les quatre se regardent, ce qui est le premier mouvement qu'ils font, et l'un d'eux se lève et part sans un mot. Vous attendez quatre heures assis sur une pierre, et personne ne vous propose de l'eau, et personne ne vous en refuse : il n'y a simplement personne.",
      extreme:"Les quatre se regardent — le premier mouvement qu'ils font — et l'un se lève et part sans un mot. Vous attendez quatre heures assis sur une pierre. Personne ne vous propose d'eau, personne ne vous en refuse : il n'y a simplement plus personne, et la porte reste ouverte tout ce temps, ce qui est la chose la plus déroutante de la journée." },
    "Au bout de quatre heures, quelqu'un vient. Ce n'est pas celui qui est parti.",
    "C'est une femme d'apparence trentenaire, ce qui ne veut rien dire, et la première chose qu'elle fait est de vous regarder en face.",
    "§ Ça a l'air de rien. C'est la première fois depuis dix-neuf ans qu'un non-humain vous regarde en face.",
    "« Alarielle. On m'a dit qu'il y avait un Paria à la porte basse, et j'ai posé deux questions au lieu d'une. »",
    "« Lesquelles ? »",
    "« *Est-il armé* — ce que tout le monde demande. Et *qu'est-ce qu'il veut savoir* — ce que personne n'avait demandé. »",
  ],
  effets:{ flags:['el_rencontree'],
           faire:() => { bouger('alarielle', { relation:3 }); A2().lieu = 'aelthiriel'; A2().pistes.onde = Math.max(A2().pistes.onde, 1); },
           marque:"Alarielle vous a reçu à la porte basse d'Aelthiriel. Elle a demandé ce que vous vouliez savoir.",
           court:"Alarielle" },
  suite:'el_dette', libelleSuite:"La question" },

el_dette:{
  qui:'alarielle',
  titre:"Une dette ancienne",
  texte:[
    "Elle vous fait asseoir dans une pièce qui donne sur un mur, ce qui est un choix : il n'y a rien à regarder que la personne en face.",
    "« Votre question. »",
    "« Pourquoi onze maisons humaines ? »",
    { sobre:"Elle ne fait pas semblant de ne pas comprendre.",
      intense:"Elle ne fait pas semblant de ne pas comprendre, ce qui vous fait gagner une demi-journée et ce qui, chez une elfe de la cour, est une décision politique déguisée en politesse.\n\n« Vous savez donc que ce n'est pas un accident. »\n\n« Il y a une porte à Karlsberg qui s'ouvre à ma paume, et quatre entailles autour qui ne sont pas de l'écriture humaine. »",
      extreme:"Elle ne fait pas semblant de ne pas comprendre — ce qui vous fait gagner une demi-journée et ce qui, chez une elfe de sa maison, est une décision politique déguisée en politesse.\n\n« Vous savez donc que ce n'est pas un accident. »\n\n« Il y a une porte à Karlsberg qui s'ouvre à ma paume, et quatre entailles autour qui ne sont pas de l'écriture humaine. Elles sont trop régulières, trop fines, et faites d'un seul geste chacune. »" },
    "Elle se lève et va à la fenêtre qui donne sur un mur.",
    "« Il y a quatre cent onze ans, nous nous sommes fait la guerre. Pas celle-ci : une autre, la même, la précédente. »",
    "« Et ? »",
    { sobre:"« Une faction a décidé que ce qu'elle tenait ne devait pas tomber. »",
      intense:"« Une faction a décidé que ce qu'elle tenait ne devait pas tomber entre les mains de l'autre. Alors elle l'a **distribué**. Onze parts, onze maisons humaines choisies pour leur insignifiance, à qui l'on n'a rien expliqué et à qui l'on a dit une seule chose : *gardez ceci, ça se transmet, ne le dites à personne.* »",
      extreme:"« Une faction a décidé que ce qu'elle tenait ne devait pas tomber entre les mains de l'autre. Elle l'a distribué : onze parts, onze maisons humaines choisies exactement pour leur insignifiance — pas les plus puissantes, pas les plus loyales : les plus petites, celles dont personne n'aurait l'idée. On ne leur a rien expliqué. On leur a dit une phrase : *gardez ceci, ça se transmet, ne le dites à personne.* Et on est reparti se faire la guerre. »" },
    "« Et vous ne l'avez jamais repris. »",
    "« La faction qui l'a distribué a perdu. Ceux qui savaient où étaient les onze parts sont morts dans les onze années suivantes, et le registre a été détruit par les vainqueurs — pas par méchanceté : parce qu'on détruit les registres de ceux qu'on a battus, c'est ce qu'on fait depuis toujours. »",
    "§ « Quatre cent onze ans, messire. Nous avons posé quelque chose dans onze familles humaines, nous avons perdu la liste, et nous les avons regardées se faire chasser pour ça pendant quatre siècles. »",
    "« C'est ça, la faute historique. »",
    "« C'est ça. Et il y en a environ neuf dans ma cour qui savent, et huit qui trouvent que ce n'est pas le moment d'en parler. »",
  ],
  effets:{ flags:['el_dette','a2_onde_origine'],
           faire:() => { bouger('alarielle', { relation:3, confiance:4 }); A2().pistes.onde = Math.max(A2().pistes.onde, 2); },
           exploit:{ eclat:4, temoins:'un', quoi:"vous savez d'où vient l'Onde" },
           marque:"L'Onde est elfique. Onze parts distribuées à onze maisons humaines il y a quatre cent onze ans, et la liste a été détruite.",
           court:"Onze parts" },
  suite:'el_tyrion', libelleSuite:"On vous attend" },

el_tyrion:{
  qui:'tyrion',
  titre:"Le prince désapprouve",
  texte:[
    "On vous attend dans le couloir. C'est un couloir elfique, ce qui veut dire qu'il fait cent quarante pieds et qu'on voit venir les gens pendant très longtemps.",
    "Tyrion a l'air d'avoir quarante ans et il en a beaucoup plus. Il ne se présente pas.",
    "« Vous êtes le neuvième nom d'une liste de Mont-Draken. »",
    "« Vous êtes bien renseigné. »",
    "« Je paie pour l'être. C'est même à peu près la seule chose que je fasse. »",
    { sobre:"« Sortez d'Aelthiriel avant la nuit. »",
      intense:"« Vous allez sortir d'Aelthiriel avant la nuit, et je vais vous dire pourquoi, parce que je n'aime pas les menaces sans motif : elles vieillissent mal. »\n\n« J'écoute. »\n\n« Nous avons une guerre. Une vraie, avec des morts, contre mon propre sang. Et il y a dans cette cour neuf personnes qui pensent qu'on devrait s'occuper des Parias, ce qui veut dire prendre quarante et un humains sous notre protection au moment exact où nous n'arrivons pas à protéger les nôtres. »",
      extreme:"« Vous allez sortir d'Aelthiriel avant la nuit, et je vais vous dire pourquoi, parce que je n'aime pas les menaces sans motif : elles vieillissent mal et il faut les répéter.\n\n« Nous avons une guerre. Une vraie, avec des morts et des villages, contre mon propre sang. Et il y a dans cette cour neuf personnes — neuf, je les compte toutes les semaines — qui pensent que nous devrions nous occuper des Parias. Ce qui veut dire prendre quarante et un humains sous notre protection au moment précis où nous n'arrivons pas à protéger les nôtres, et donner à Anarion l'argument dont il rêve depuis onze ans : que nous avons toujours été le peuple qui pose ses fardeaux chez les autres. »" },
    "§ Il n'a pas tort. C'est la difficulté avec les gens comme lui : ils n'ont jamais tort sur les faits.",
    "« Et la faute historique ? »",
    "« Elle est réelle. Elle a quatre cent onze ans. » Il ne cille pas. « Ma sœur pense qu'on répare une faute de quatre cent onze ans pendant une guerre. Je pense qu'on la répare après, quand il reste quelqu'un pour la réparer. »",
    "« Votre sœur. »",
    "« Alarielle. Vous ne le saviez pas ? » Un temps très court. « Non, vous ne le saviez pas. Elle ne le dit jamais, parce que ça complique tout ce qu'elle obtient. »",
  ],
  effets:{ flags:['el_tyrion','el_frere'],
           faire:() => retenir('tyrion', "un Paria est entré à Aelthiriel et sa sœur l'a reçu"),
           marque:"Tyrion est le frère d'Alarielle. Il veut que vous sortiez avant la nuit.", court:"Tyrion" },
  choix:[
    { t:"Sortir avant la nuit",
      detail:"Il a raison sur les faits · et sortir ne coûte rien qu'on puisse nommer",
      va:'el_sortir' },
    { t:"« Neuf sur combien ? »",
      detail:"Il compte ses opposants toutes les semaines · un homme qui compte a peur d'un chiffre",
      risque:"calculé",
      test:{ carac:'intellect', comp:'tactique', dc:12, manoeuvre:'tyrion' },
      degres:{ dominante:'el_neuf_dom', couteuse:'el_neuf_cout', echec:'el_neuf_ko' } },
    { t:"Rester, et qu'il fasse ce qu'il veut",
      detail:"Un prince elfe, une cour, et un humain qui ne sort pas quand on le lui dit",
      ferme:"Ferme : toute chance que Tyrion vous accorde quoi que ce soit",
      risque:"définitif", definitif:true, va:'el_rester' },
  ],
},

el_sortir:{
  qui:'alarielle',
  texte:[
    "Vous sortez avant la nuit. Il n'y a rien d'humiliant là-dedans : il y a une guerre, un prince, et un humain de passage.",
    "Alarielle vous rejoint à la porte basse, ce qu'elle n'était pas obligée de faire et ce que trois personnes la voient faire.",
    "« Mon frère a raison sur les faits. »",
    "« Je sais. »",
    "« Il a toujours raison sur les faits. C'est ce qui le rend impossible à battre et ce qui l'empêche d'avoir raison sur autre chose. »",
    "§ Elle vous tend un petit objet plat, en bois, gravé de quatre entailles.",
    "« Les archives sont à onze lieues d'ici, dans une maison de la marche, et elles ne relèvent pas de la cour. Ça, c'est ce qu'il faut montrer à la porte. »",
    "« Pourquoi ? »",
    "« Parce que vous avez posé une question au lieu de demander quelque chose, et parce que ça fait quatre cent onze ans que personne ne nous en pose. »",
  ],
  effets:{ flags:['el_jeton','el_sorti'],
           faire:() => { bouger('alarielle', { relation:3, confiance:3, devoir:1 }); A2().pistes.onde = Math.max(A2().pistes.onde, 3); },
           marque:"Alarielle vous a donné un jeton de bois gravé pour les archives de la marche.",
           court:"Le jeton" },
  suite:'a2_carte', libelleSuite:"La carte" },

el_neuf_dom:{
  qui:'tyrion',
  texte:[
    "@« Neuf sur combien ? »",
    "Il ne répond pas.",
    "« Vous les comptez toutes les semaines. On ne compte pas ce qui ne bouge pas. »",
    { sobre:"« Neuf sur vingt-trois. »",
      intense:"« Neuf sur vingt-trois », dit-il enfin, et il le dit du ton d'un homme qui pose une pièce sur une table parce que la partie est finie. « Il y a quatre ans, elles étaient trois. »",
      extreme:"« Neuf sur vingt-trois », dit-il enfin, du ton d'un homme qui pose une pièce sur la table parce que la partie est finie et qu'il préfère la finir proprement. « Il y a quatre ans, elles étaient trois. Il y a un an, six. Vous voyez pourquoi je compte. »" },
    "§ Il ne vous chasse plus. Ce n'est pas de la sympathie : c'est qu'un homme qui vient de vous donner un chiffre a changé de conversation.",
    "^« Vous voulez savoir ce que je crains vraiment, humain ? Ce n'est pas votre peuple et ce n'est pas le vôtre en particulier. »",
    "« Quoi, alors ? »",
    "« Que ma sœur ait raison. Parce que si elle a raison, alors nous avons regardé quatre siècles de chasse en sachant, et il n'y a pas de guerre assez grande pour excuser ça. »",
    "Il fait trois pas dans le couloir de cent quarante pieds, puis il s'arrête.",
    "« Sortez avant la nuit quand même. Ce que je crains ne change pas ce que je dois faire. »",
  ],
  effets:{ flags:['el_tyrion_chiffre','el_sorti'],
           faire:() => { bouger('alarielle', { devoir:2 }); retenir('tyrion', "vous lui avez fait dire son chiffre : neuf sur vingt-trois"); },
           exploit:{ eclat:3, temoins:'un', quoi:"vous avez fait parler Tyrion" },
           marque:"Neuf sur vingt-trois à la cour d'Aelthiriel pensent qu'il faut s'occuper des Parias. Elles étaient trois il y a quatre ans.",
           court:"Neuf sur vingt-trois" },
  suite:'el_sortir', libelleSuite:"La porte basse" },

el_neuf_cout:{
  qui:'tyrion',
  texte:[
    "@« Neuf sur combien ? »",
    "« Ça ne vous regarde pas. »",
    "« Vous les comptez toutes les semaines. »",
    { sobre:"Il vous regarde longtemps et il change de ton.",
      intense:"Il vous regarde longtemps, et quand il reprend il a changé de ton — il est passé de l'homme qui explique à l'homme qui range.\n\n« Vous venez de me montrer que vous savez lire une cour. C'est la chose la plus dangereuse que vous pouviez faire dans ce couloir. »",
      extreme:"Il vous regarde longtemps, et quand il reprend il a changé de registre : il est passé de l'homme qui explique à l'homme qui range une information. « Vous venez de me montrer que vous savez lire une cour, humain. C'est la chose la plus dangereuse que vous pouviez faire dans ce couloir — beaucoup plus que d'avoir l'Onde, beaucoup plus que d'être sur une liste. Il y a onze humains qui savent lire une cour elfique et je connais les onze. »" },
    "« Sortez avant la nuit. Et ne revenez pas par la porte basse : elle est ouverte à ceux qui demandent, et vous avez cessé de demander. »",
    "§ Vous avez gagné un renseignement et perdu une porte. Ça arrive.",
  ],
  effets:{ flags:['el_tyrion_ferme','el_sorti'],
           faire:() => { retenir('tyrion', "vous avez lu sa cour, et il l'a compris"); bouger('alarielle', { devoir:-1 }); },
           marque:"Tyrion a fermé la porte basse. Vous saviez lire une cour et il l'a vu.",
           court:"La porte fermée" },
  suite:'el_sortir', libelleSuite:"La porte basse" },

el_neuf_ko:{
  qui:'tyrion',
  texte:[
    "@« Neuf sur combien ? »",
    "« Sur assez. »",
    "Il ne dit rien d'autre et il ne bouge pas, et vous restez debout dans un couloir de cent quarante pieds à attendre une suite qui ne vient pas.",
    "§ C'est une technique. Elle a quatre cents ans de plus que vous.",
    "« Sortez avant la nuit. »",
  ],
  effets:{ flags:['el_sorti'] },
  suite:'el_sortir', libelleSuite:"La porte basse" },

el_rester:{
  qui:'tyrion',
  texte:[
    "Vous ne sortez pas.",
    { sobre:"Il ne fait rien. C'est le pire.",
      intense:"Il ne fait rien du tout, et c'est le pire : pas de gardes, pas d'ultimatum, pas de scène. Il vous regarde ne pas sortir, il hoche la tête une fois comme un homme qui note un chiffre, et il s'en va par le couloir de cent quarante pieds.",
      extreme:"Il ne fait rien du tout, et c'est de très loin le pire : pas de gardes, pas d'ultimatum, pas de scène. Il vous regarde ne pas sortir, il hoche la tête une fois comme un homme qui note un chiffre dans une colonne, et il repart par les cent quarante pieds du couloir sans se presser. Une cour elfique ne vous jette pas dehors. Elle vous laisse rester, et elle cesse de vous adresser la parole, et au bout de neuf jours vous partez tout seul." },
    "Vous restez neuf jours. Personne ne vous adresse la parole sauf Alarielle, ce qui est exactement le problème : chacune de ses visites est comptée par quelqu'un.",
    "Le neuvième jour, elle vous trouve à la porte basse.",
    "« Vous partez. »",
    "« Oui. »",
    "« Bien. Ce n'était pas du courage, c'était de l'entêtement, et il m'a coûté trois voix. »",
    "§ *Trois voix.* Elle vient de vous dire, sans en avoir l'intention, qu'il y a un compte et qu'elle est dedans.",
    "Elle vous tend quand même un petit objet plat, en bois, gravé de quatre entailles.",
    "« Les archives de la marche. Elles ne relèvent pas de la cour, et c'est la seule raison pour laquelle je peux encore vous donner ça. »",
  ],
  effets:{ flags:['el_jeton','el_reste','a2_alarielle_scandale','a2_eltharion_vu'],
           faire:() => { bouger('alarielle', { relation:2, devoir:-3 }); retenir('tyrion', "vous êtes resté neuf jours après qu'il vous eut dit de partir");
                         A2().pistes.onde = Math.max(A2().pistes.onde, 3); },
           marque:"Vous êtes resté neuf jours à Aelthiriel. Ça a coûté trois voix à Alarielle.",
           court:"Trois voix" },
  suite:'a2_carte', libelleSuite:"La carte" },

};

/* ══ LES ARCHIVES DE LA MARCHE ═══════════════════════════════════════════ */
const ALAR_2 = {

el_archives:{
  qui:'alarielle',
  lieu:"La marche elfique · une maison basse · onze lieues d'Aelthiriel",
  titre:"Ce qui ne se transmet pas droit",
  texte:[
    "Ce ne sont pas des archives : c'est une maison basse de quatre pièces, tenue par deux personnes très âgées, avec des rayonnages qui font le tour des murs et un poêle au milieu.",
    "Le jeton de bois ouvre la porte. Personne ne le regarde deux fois.",
    () => a('el_jeton') && lien('alarielle').relation >= 6
      ? "Alarielle est venue. Elle n'était pas obligée et elle a fait onze lieues, et l'un des deux vieillards lui a dit quelque chose à l'oreille en la voyant entrer qui l'a fait fermer les yeux une seconde."
      : "Vous y allez seul. Les deux vieillards vous servent du thé sans qu'on ait rien demandé et vous laissent.",
    "§ Il faut quatre jours pour trouver, parce qu'il n'y a pas de catalogue et que le classement suit une logique qui a quatre cents ans.",
    "Ce qu'on trouve tient en onze feuillets et ce n'est pas la liste des maisons : la liste a été détruite, on le savait.",
    "C'est autre chose. C'est un rapport d'observation, rédigé cent ans après la distribution, par quelqu'un qui a passé sa vie à regarder ce qu'il était advenu des onze parts.",
    { sobre:"Il y a une phrase qui est soulignée, et elle a été soulignée par celui qui écrivait.",
      intense:"Il y a une phrase soulignée deux fois, et elle a été soulignée par celui qui écrivait, ce qui ne se fait pas dans un rapport et ce qui veut dire qu'il tenait à ce qu'on la voie.",
      extreme:"Il y a une phrase soulignée deux fois par celui-là même qui écrivait — ce qui ne se fait pas dans un rapport d'observation, ce qui est même une faute professionnelle, et ce qui veut dire qu'un homme a posé sa plume, a réfléchi, et a décidé qu'il aimait mieux commettre une faute que risquer qu'on ne la lise pas." },
    "§ *Cela ne se transmet pas droit.*",
    "« Ça veut dire quoi ? » demande l'un des vieillards, qui lit par-dessus votre épaule et qui n'a manifestement jamais ouvert ces feuillets.",
    "Ça veut dire ce que ça dit.",
    { sobre:"Dans une maison, certains l'ont et d'autres non. C'est tout, et c'est énorme.",
      intense:"Dans une famille de Paria, certains l'ont et d'autres non. Ce n'est pas une question de branche, d'aîné ou de cadet : ça saute, ça revient, ça manque un enfant sur trois sans raison. Un enfant sur trois, pendant quatre cents ans, dans onze maisons.",
      extreme:"Dans une famille de Paria, certains l'ont et d'autres non. Ce n'est pas une question de branche, d'aînesse ou de cadetterie : ça saute, ça revient, ça manque un enfant sur trois sans que personne ait jamais pu prédire lequel. Un enfant sur trois. Pendant quatre cents ans. Dans onze maisons qui savaient toutes qu'elles gardaient quelque chose, sans savoir quoi ni pourquoi, et qui ont donc passé quatre siècles à savoir très exactement lesquels de leurs enfants comptaient." },
    "§ Vous étiez trois. Vous, une sœur plus petite, et un frère mort en bas âge dont vous n'aviez jamais entendu parler.",
    "Et il y avait une génération avant vous, et dans cette génération il y avait votre père, et il y avait sa sœur.",
  ],
  effets:{ flags:['el_archives','a2_ne_transmet_pas_droit','a2_onde_rendue'],
           faire:() => { A2().pistes.onde = 4; bouger('alarielle', { confiance:2 }); },
           exploit:{ eclat:4, temoins:'aucun', quoi:"vous savez pourquoi il y avait, dans chaque maison de Paria, des gens qui n'avaient rien" },
           marque:"« Cela ne se transmet pas droit. » Un enfant sur trois ne l'a pas. Dans onze maisons, pendant quatre cents ans.",
           court:"Pas droit" },
  suite:'el_jardin', libelleSuite:"Le jardin fermé" },

el_jardin:{
  qui:'alarielle',
  lieu:"Aelthiriel · un jardin qu'on ferme",
  titre:"Le jardin fermé",
  texte:[
    () => lien('alarielle').relation >= 8
      ? "Elle vous fait entrer par une porte qui n'est pas la porte basse, et personne ne le remarque parce qu'il est quatre heures du matin."
      : "Elle vous reçoit dans le jardin, ce qui est déjà une chose, et trois personnes le sauront avant midi.",
    { sobre:"Un jardin elfique fermé n'a rien de ce qu'on imagine.",
      intense:"Un jardin elfique fermé n'a rien de ce qu'on imagine : ce n'est ni un verger ni un parterre. C'est quarante pieds sur quarante de mousse, six pierres posées, et un arbre. Un seul. Il a probablement quatre cents ans et il est plus petit que vous.",
      extreme:"Un jardin elfique fermé n'a rien de ce qu'on imagine : ni verger, ni parterre, ni fleurs. Quarante pieds sur quarante de mousse rase, six pierres posées à des intervalles qui ne sont pas réguliers et qui ne sont pas non plus au hasard, et un arbre. Un seul, au tiers de la surface. Il a probablement quatre cents ans, il est plus petit que vous, et il a été taillé chaque année pendant quatre cents ans par des gens dont c'était le seul lien avec ceux d'avant." },
    "« Vous avez lu la phrase soulignée. »",
    "« Oui. »",
    "« Alors vous avez maintenant la réponse à une question que vous n'aviez pas posée, ce qui est la seule façon dont on obtient les vraies. »",
    "§ Elle s'assied sur une des six pierres, et il n'y en a pas de deuxième à portée, ce qui est aussi un choix.",
    "« Je vais vous dire ce que je veux, messire, parce que vous allez finir par vous le demander et que vous vous tromperez. »",
    "« Dites. »",
    { sobre:"« Je ne veux pas vous sauver. »",
      intense:"« Je ne veux pas vous sauver, et je ne vous trouve pas fascinant. Vous êtes le premier Paria que je rencontre et vous n'êtes pas très différent d'un homme d'armes humain de trente ans, ce qui est un compliment que vous mettrez du temps à comprendre. »",
      extreme:"« Je ne veux pas vous sauver, je ne vous trouve pas fascinant, et je ne suis pas curieuse de ce que vous avez sous les côtes. Vous êtes le premier Paria que je rencontre et vous n'êtes pas très différent d'un homme d'armes humain de trente ans — même façon de s'asseoir, même méfiance, mêmes silences aux mêmes endroits. C'est un compliment et vous mettrez des années à comprendre pourquoi. »" },
    "« Alors quoi ? »",
    "« Nous avons posé quelque chose chez vous il y a quatre cent onze ans et nous avons regardé ce que ça faisait. J'ai deux cent quarante ans. J'ai regardé pendant cent quatre-vingts. »",
    "§ « Ce n'est pas de la culpabilité. La culpabilité, c'est ce qu'on ressent. Ça, c'est ce qu'on doit. »",
  ],
  effets:{ flags:['el_jardin'],
           faire:() => bouger('alarielle', { relation:3, confiance:3, attirance:2 }),
           marque:"Alarielle a deux cent quarante ans et elle a regardé pendant cent quatre-vingts.",
           court:"Le jardin" },
  choix:[
    { t:"« Vous ne me devez rien. »",
      detail:"Refuser une dette de quatre cent onze ans · elle ne s'y attend pas",
      va:'el_rien_du' },
    { t:"« Deux cent quarante ans. Et moi trente. »",
      detail:"Poser la seule question qui compte entre vous deux, et la poser tôt",
      va:'el_longevite' },
    { t:"Ne rien dire",
      detail:"Un jardin de quarante pieds, six pierres, un arbre de quatre cents ans · et le temps qu'il faut",
      va:'el_silence' },
  ],
},

el_rien_du:{
  qui:'alarielle',
  texte:[
    "@« Vous ne me devez rien. »",
    "Elle tourne la tête. C'est la première fois qu'elle a l'air surprise.",
    "« Pardon ? »",
    "« Ce que vous devez, vous le devez à onze maisons dont il reste quarante et une personnes. Moi, vous ne me devez rien : je ne suis pas onze maisons, je suis un homme assis sur de la mousse. »",
    { sobre:"Long silence.",
      intense:"Long silence. Un arbre de quatre cents ans, six pierres, et une elfe qui n'avait pas prévu cette phrase-là.\n\n« C'est agaçant », dit-elle enfin.\n\n« Pourquoi ? »\n\n« Parce que ça me retire le seul cadre dans lequel je savais vous parler. »",
      extreme:"Long silence. Un arbre de quatre cents ans plus petit qu'un homme, six pierres, de la mousse rase, et une elfe de deux cent quarante ans qui n'avait pas prévu cette phrase.\n\n« C'est agaçant », dit-elle enfin.\n\n« Pourquoi ? »\n\n« Parce que ça me retire le seul cadre dans lequel je savais comment vous parler. J'ai passé cent quatre-vingts ans à préparer une conversation avec un Paria, messire, et vous venez d'en refuser la prémisse au bout de six minutes. »" },
    "§ Elle rit. C'est court, ça ne se répétera pas de la saison, et ça vaut plus que tout ce qui précède.",
    "« Alors il faudra trouver autre chose. »",
    "« Il faudra. »",
  ],
  effets:{ flags:['el_rien_du'],
           faire:() => bouger('alarielle', { relation:4, confiance:4, attirance:4, devoir:2 }),
           marque:"Vous avez refusé qu'Alarielle vous doive quelque chose. Elle a ri.", court:"Rien dû" },
  suite:'a2_carte', libelleSuite:"La carte" },

el_longevite:{
  qui:'alarielle',
  texte:[
    "@« Deux cent quarante ans. Et moi trente, et dans ce métier on ne fait pas soixante. »",
    "« Oui. »",
    "« Ça ne vous gêne pas ? »",
    { sobre:"« Si. Ça me gêne depuis cent quatre-vingts ans. »",
      intense:"« Si. Ça me gêne depuis cent quatre-vingts ans et pas seulement avec vous. » Elle regarde l'arbre. « J'ai eu trois amis humains. Le premier est mort de vieillesse et j'ai trouvé ça supportable. Le deuxième est mort à trente et un ans d'une fièvre, et le troisième d'un accident de cheval à quarante-quatre, et ces deux-là je ne les ai pas trouvés supportables du tout. »",
      extreme:"« Si. Ça me gêne depuis cent quatre-vingts ans, et pas seulement avec vous. » Elle regarde l'arbre. « J'ai eu trois amis humains. Le premier est mort de vieillesse à soixante-dix-huit ans et j'ai trouvé ça supportable — c'est un bon chiffre, on a le temps de se dire les choses. Le deuxième est mort à trente et un ans d'une fièvre en quatre jours. Le troisième d'un accident de cheval à quarante-quatre, un mardi, sans rien qui l'annonce. Ces deux-là, non. Je ne les ai pas trouvés supportables et je ne les trouve toujours pas supportables, et le troisième est mort il y a soixante ans. »" },
    "« Alors pourquoi recommencer ? »",
    "« Parce que la seule alternative est de ne parler qu'à des gens de mon peuple, et j'ai essayé pendant quarante ans, et c'est ce qui m'a le plus abîmée. »",
    "§ Elle ne dit pas *vous*. Elle ne dira pas *vous* avant longtemps, et ce n'est pas de la pudeur : c'est du calcul, et elle est très bonne à ça.",
  ],
  effets:{ flags:['el_longevite'],
           faire:() => bouger('alarielle', { relation:3, confiance:5, attirance:3 }),
           marque:"Alarielle a eu trois amis humains. Deux sont morts trop tôt.", court:"Trois amis" },
  suite:'a2_carte', libelleSuite:"La carte" },

el_silence:{
  qui:'alarielle',
  texte:[
    "Vous ne dites rien.",
    { sobre:"On reste dans le jardin. Longtemps.",
      intense:"On reste dans le jardin longtemps. Il n'y a rien à regarder qu'un arbre plus petit qu'un homme et six pierres qui ne sont ni régulières ni au hasard, et au bout d'une heure on commence à comprendre l'intervalle entre les pierres, et c'est probablement tout ce que ce jardin a jamais eu à enseigner.",
      extreme:"On reste dans le jardin longtemps — deux heures, peut-être trois. Il n'y a rien à regarder qu'un arbre plus petit qu'un homme et six pierres posées à des intervalles ni réguliers ni aléatoires. Au bout d'une heure, on commence à voir l'intervalle. Au bout de deux, on voit qu'il correspond à quelque chose. Au bout de trois, on n'a toujours pas compris à quoi, et c'est probablement tout ce que ce jardin a jamais eu à enseigner à qui que ce soit." },
    "§ Elle ne parle pas non plus. C'est un peuple qui sait faire ça et qui l'utilise contre les humains depuis toujours, sauf qu'ici ce n'est pas contre.",
    "Quand vous vous levez, à la nuit, elle dit une seule chose.",
    "« Revenez par ce jardin. Pas par la porte basse. »",
  ],
  effets:{ flags:['el_silence_jardin'],
           faire:() => bouger('alarielle', { relation:2, confiance:3, attirance:5 }),
           marque:"Trois heures de silence dans un jardin fermé. Elle vous a dit de revenir par là.",
           court:"Par le jardin" },
  suite:'a2_carte', libelleSuite:"La carte" },

};
Object.assign(ALAR, ALAR_2);
enregistrerScenes(ALAR);

offrir({ id:'el_arrivee', lieu:'aelthiriel', va:'el_arrivee',
         titre:"La porte basse",
         si:() => a('a2_indice_elfe') || a('kar_coffre') });
offrir({ id:'el_archives', lieu:'aelthiriel', va:'el_archives',
         titre:"Les archives de la marche",
         si:() => a('el_jeton') });
