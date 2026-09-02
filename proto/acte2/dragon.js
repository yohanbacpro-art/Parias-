/* PARIAS — Acte II · LA GRANDE
 * ═══════════════════════════════════════════════════════════════════════
 * C'est une bête.
 *
 * Il faut le poser d'entrée, parce que tout le reste en découle et parce que
 * c'est ce que les histoires ratent toujours : elle ne parle pas, elle ne
 * négocie pas, elle n'a pas de dessein, elle ne vous en veut pas et elle ne
 * sait pas votre nom. Elle ne répond à rien. On ne peut pas la raisonner, la
 * menacer, l'acheter ni la comprendre au sens où l'on comprend quelqu'un.
 *
 * On peut seulement comprendre POURQUOI ELLE EST LÀ — et ça, ce n'est pas
 * un mystère, c'est de la zoologie : les Nains ont perdu la galerie haute il
 * y a deux ans, ce qui dormait dessous n'y dort plus, et un animal déplacé
 * de quarante tonnes descend vers le premier endroit où il y a de quoi
 * manger. Karlsberg est sur le chemin.
 *
 * Tout l'Acte II se paie ici. La muraille compte. La forge compte. Les
 * quarante hommes de Caleb comptent. Les Nains comptent. Le réseau d'Alycia
 * compte — pour évacuer, ce qui est la seule chose vraiment utile. La
 * méthode de Charles compte. Rien de ce qu'on a bâti n'est décoratif, et
 * rien de ce qu'on n'a pas bâti ne se rattrape ce jour-là.
 * ═══════════════════════════════════════════════════════════════════════ */

/* Ce que la préparation a réellement retiré du danger. Chaque ligne est une
 * décision prise des saisons plus tôt, dans une affaire qui n'avait rien à
 * voir avec un dragon. */
const PREPARE = [
  { id:'mur',      si:() => a('a2_muraille'),      n:3,
    quoi:"Douze pieds de muraille", note:"elle ne peut pas se poser dans la cour : il n'y a pas la place" },
  { id:'enceinte', si:() => a('ch_enceinte') && !a('a2_muraille'), n:1,
    quoi:"L'enceinte basse", note:"sept pieds, ça ne l'arrête pas — ça la ralentit d'une seconde et demie" },
  { id:'baliste',  si:() => a('a2_karlsberg_forge'), n:3,
    quoi:"Deux balistes de rempart", note:"la forge tourne depuis deux ans et quelqu'un ici a déjà servi une pièce" },
  { id:'bracq',    si:() => a('wy_sait_baliste') || a('wy_bracq_allie'), n:2,
    quoi:"Ce que Bracq vous a montré", note:"on ne tire pas sur une aile ouverte : on tire sur l'épaule au moment où elle ferme" },
  { id:'garnison', si:() => a('a2_caleb_quarante'), n:2,
    quoi:"Les quarante de Fort-aux-Princes", note:"des gens de chantier qui savent tenir une file et ne pas courir" },
  { id:'nains',    si:() => a('a2_maitre_oeuvre') || a('a2_nains_dehors'), n:3,
    quoi:"Les Nains", note:"ils sont les seuls au monde à en avoir déjà vu une, et ils savent où ça ne va pas" },
  { id:'evac',     si:() => a('a2_reseau_su') || a('aly_reseau_acquis') || a('a2_karlsberg_peuple'), n:2,
    quoi:"Le réseau d'Alycia", note:"le bourg est vide depuis quatre jours — c'est la seule chose vraiment utile" },
  { id:'methode',  si:() => a('cd_methode') || a('a2_charles_allie'), n:2,
    quoi:"La méthode de Mont-Draken", note:"on ne cherche pas la bête : on cartographie ce qu'elle évite" },
  { id:'elfe',     si:() => a('a2_alarielle_liee') || a('a2_alarielle_epouse') || lien('alarielle').relation >= 12, n:2,
    quoi:"Alarielle", note:"elle a lu quatre cents ans d'archives et il y a trois pages là-dessus" },
];

const preparation = () => PREPARE.filter(p => p.si());
const forcePrep = () => preparation().reduce((s, p) => s + p.n, 0);

/* La situation de combat : ce qu'on a bâti, moins ce qu'on a déjà cassé. */
function situGrande(){
  const m = ETAT.melee || {};
  return forcePrep() - (m.tour || 0) - (a('dr_epaule') ? -3 : 0) - (a('dr_brulee') ? -2 : 0);
}

const DRAGON = {

/* ══ 1 · LES SIGNES ═══════════════════════════════════════════════════════ */
dr_signes:{
  lieu:() => `Les Marches Grises · ${dateA2()}`,
  titre:"Ce qui ne correspond à rien",
  texte:[
    "Ça commence comme toujours : des bêtes qui manquent.",
    { sobre:"Puis les plaies ne vont pas.",
      intense:"Puis on regarde les plaies, et elles ne vont pas. Un loup laisse une plaie de loup. Un ours laisse une plaie d'ours. Ceci ne laisse pas de plaie du tout : ça laisse un animal en deux moitiés propres, à cinquante pas l'une de l'autre.",
      extreme:"Puis on regarde les plaies, et elles ne vont pas du tout. Un loup laisse une plaie de loup, un ours une plaie d'ours, un homme-bête une plaie d'homme-bête, et tout le monde dans une marche sait lire les trois à quatre pas. Ceci ne laisse pas de plaie : ça laisse une vache de six cents livres en deux moitiés à peu près propres, distantes de cinquante pas, et rien entre les deux. Le vieux qui vous appelle a soixante-dix ans, il a vu quatre guerres et il ne trouve rien à dire." },
    "§ Ensuite un hameau de quatre feux, à sept lieues au nord, dans la nuit du douze.",
    "Il n'est pas brûlé. C'est le premier détail qui compte : il n'est pas brûlé, il est **écrasé** — trois toitures effondrées vers l'intérieur, sur une ligne droite, et la quatrième maison intacte à vingt pas de la ligne.",
    "Quelque chose s'est posé. Quelque chose de trop lourd, qui a touché en descendant, et qui ne visait rien.",
    () => a('a2_charles_vu') || a('cd_registre')
      ? "Vous faites porter un moulage à Mont-Draken. La réponse arrive en onze jours, de la main de Charles, et elle tient en une ligne : *Trois cent douze pièces au mur. Rien ne correspond. J'arrive.*"
      : "Il y a une école, à Mont-Draken, qui tient un mur de trois cent onze pièces étiquetées. Vous n'y connaissez personne et vous n'avez pas le temps d'y aller.",
    "§ Le seize, on la voit.",
    { sobre:"Elle passe très haut, vers le sud, sans s'arrêter.",
      intense:"Elle passe très haut, vers le sud, à une heure de l'après-midi, et elle ne s'arrête pas. Quatre-vingts personnes la voient en même temps. Personne ne dit rien pendant environ une minute.",
      extreme:"Elle passe très haut, vers le sud, à une heure de l'après-midi par temps clair, et elle ne s'arrête pas. Quatre-vingts personnes du bourg la voient en même temps, dans le même silence, et le silence dure environ une minute après qu'elle a disparu. Personne ne crie. C'est une chose que les récits inventent : on ne crie pas. On regarde, on continue de regarder l'endroit où elle n'est plus, et ensuite quelqu'un dit quelque chose de très banal parce qu'il faut bien parler." },
    "Elle fait quatre-vingts pieds d'envergure. On peut le savoir sans instrument : elle passe entre les deux crêtes et on connaît la distance entre les deux crêtes.",
  ],
  effets:{ flags:['dr_signes','a2_dragon'],
           faire:() => { retenir('charles', "il y a quelque chose dans les Marches Grises qui ne correspond à aucune de mes pièces");
                         retenir('caleb', "il y a une bête dans les Marches et j'ai des créances là-bas"); },
           marque:"Un hameau écrasé, pas brûlé. Quatre-vingts pieds d'envergure entre les deux crêtes.",
           court:"Le seize" },
  choix:[
    { t:"Envoyer demander aux Nains",
      detail:"ils sont les seuls au monde à avoir vécu sous quelque chose de cette taille",
      risque:"prudent", va:'dr_nains' },
    { t:"Cartographier ce qu'elle évite",
      detail:"la méthode de Mont-Draken · lente, exaspérante, et elle marche",
      si:() => a('cd_methode') || a('a2_charles_allie') || a('a2_charles_vu'),
      risque:"calculé", va:'dr_methode' },
    { t:"Faire évacuer le bourg tout de suite",
      detail:"trente et un feux · avant de savoir quoi que ce soit",
      risque:"prudent", va:'dr_evacuer' },
  ],
},

dr_nains:{
  lieu:"Karlsberg · la forge",
  titre:"Ce qui dormait sous la onzième",
  texte:[
    () => a('a2_maitre_oeuvre')
      ? "Brann de Kar-Durak dit six mots par jour. Ce jour-là il en dit quatre-vingts, ce qui n'était pas arrivé depuis onze ans, et il faut aller chercher quelqu'un pour traduire parce qu'il passe au nain à la troisième phrase."
      : "Il faut onze jours pour qu'un Nain accepte de venir, et celui qui vient a deux cent dix ans et n'est pas content d'être là.",
    "@« Vous avez une carte de la montagne ? »",
    "On sort une carte de la montagne. Il la retourne, parce qu'elle est fausse dans le sens où on l'a dessinée.",
    { sobre:"« Onze portes. Quatre sont tombées. »",
      intense:"« Onze portes. Quatre sont tombées en deux ans. » Il pose le doigt sur la plus haute. « Celle-ci en Ventôse, il y a vingt-six mois. On l'appelle la galerie haute. C'est là qu'étaient nos archives. »\n\n« Je sais. »\n\n« Vous ne savez pas ce qu'il y avait sous nos archives. »",
      extreme:"« Onze portes. Quatre sont tombées en deux ans, ce qui n'était arrivé qu'une fois en huit cents ans. » Il pose le doigt sur la plus haute du tracé. « Celle-ci en Ventôse, il y a vingt-six mois. Vous l'appelez la galerie haute et vous savez tous que c'est là qu'étaient nos archives — c'est même la seule chose que les hommes retiennent de cette guerre, parce que c'est la seule qui ressemble à une tragédie racontable. »\n\nIl fait glisser le doigt de trois pouces vers le bas.\n\n« Personne ne demande jamais ce qu'il y avait sous les archives. »" },
    "§ Sous les archives, il y a une galerie que les Nains n'ont pas creusée et qu'ils n'ouvrent pas.",
    "Elle est sur les plans depuis six cents ans, avec un mot que le traducteur met un moment à rendre.",
    "« *Ce qui est dessous* », finit-il par dire. « Ce n'est pas un nom. C'est une case du registre. »",
    "« Vous saviez ce qu'il y avait dedans. »",
    { sobre:"« Nous savions qu'il y avait quelque chose et qu'il ne fallait pas ouvrir. »",
      intense:"« Nous savions qu'il y avait quelque chose, qu'il ne fallait pas ouvrir, et que tant qu'on ne creusait pas de ce côté-là il ne se passait rien pendant des siècles. » Il hausse les épaules. « Ce n'est pas de la sagesse, messire. C'est de l'exploitation minière. »",
      extreme:"« Nous savions qu'il y avait quelque chose. Nous savions qu'il ne fallait pas ouvrir. Et nous savions que tant qu'on ne creusait pas de ce côté-là, il ne se passait strictement rien pendant six siècles. » Il hausse les épaules avec une lassitude de deux cent dix ans. « Ce n'est pas de la sagesse et il n'y a pas de prophétie, messire, arrêtez de me regarder comme ça. C'est de l'exploitation minière. On ne creuse pas là où le rendement est mauvais et le risque connu. Puis les Peaux-Vertes ont ouvert la galerie haute avec trente mille hommes, et le plafond de ce qui est dessous est devenu le sol de ce qui est dessus. »" },
    "« Elle est sortie. »",
    "« Elle est sortie, elle a trouvé la lumière, et elle a faim. »",
    "§ Il n'y a rien d'autre. Pas de dessein, pas de vengeance, pas de destin.",
    "« Elle en veut à quelqu'un ? »",
    "Le Nain vous regarde un long moment, et sa réponse est ce que vous retiendrez de toute cette affaire.",
    { sobre:"« C'est une bête. »",
      intense:"« C'est une bête, messire. Elle ne veut rien à personne. » Il replie la carte. « Elle est déplacée, elle est énorme, elle mange, et vous êtes sur son chemin parce que votre vallée est ce qu'il y a de plus bas entre la montagne et la plaine. C'est tout. Il n'y a rien à comprendre de plus et il n'y a rien à lui dire. »",
      extreme:"« C'est une bête, messire. » Il replie la carte avec soin. « Elle ne veut rien à personne, elle n'a pas de projet, elle ne sait pas ce qu'est une maison ni ce qu'est un homme au-delà de la question de savoir si ça se mange. Elle est déplacée, elle est énorme, elle a faim, et votre vallée se trouve être le point le plus bas entre la montagne et la plaine — c'est tout, c'est de la géographie. Vous allez passer six mois à chercher ce qu'elle veut dire, parce que vous êtes des hommes et que vous faites toujours ça. Elle ne veut rien dire. Il n'y a rien à lui dire non plus. »" },
    "« Alors quoi ? »",
    "« Alors on la tue, ou on part. Nous, nous sommes partis. Trois mille. »",
  ],
  effets:{ flags:['dr_nains','dr_sait','a2_dragon_su'],
           faire:() => { const C = CHANTIER(); C.faveurs += 1; },
           exploit:{ eclat:3, temoins:'quelques', quoi:"vous savez ce que c'est et d'où ça vient" },
           marque:"« Ce qui est dessous » — une case du registre nain, sous la galerie haute, ouverte par les Peaux-Vertes. Elle est déplacée et elle a faim.",
           court:"Ce qui est dessous" },
  suite:'dr_preparer', libelleSuite:"Il reste quatre semaines" },

dr_methode:{
  lieu:"Les Marches Grises · cinq jours de relevés",
  titre:"Ce qu'elle évite",
  texte:[
    "On ne cherche pas la bête. On cartographie ce qu'elle évite : c'est lent, exaspérant, et ça marche.",
    { sobre:"Cinq jours. Trois choses.",
      intense:"Cinq jours de relevés à quatre équipes, et on en sort trois choses. Aucune n'est spectaculaire et les trois vont décider de tout.",
      extreme:"Cinq jours de relevés, quatre équipes, quarante-sept fermes visitées et onze carcasses mesurées. On en sort trois choses. Aucune n'est spectaculaire, aucune ne ferait un récit, et ce sont les trois qui décideront de tout ce qui va se passer — c'est la leçon entière de Mont-Draken et elle tient là-dedans." },
    "**Une.** Elle ne se pose jamais dans un fond étroit. Jamais. Quarante-sept relevés, pas une exception : il lui faut de la place pour ouvrir, et un fond de vallée à moins de cent pieds de large la piège.",
    "**Deux.** Elle chasse au crépuscule et pas la nuit. Elle voit mal dans le noir — ce qui est logique pour une chose qui a passé six cents ans sous une montagne et que personne n'avait pensé à en déduire.",
    { sobre:"**Trois.** Elle se pose toujours du même côté.",
      intense:"**Trois.** À chaque fois qu'on peut l'établir — sept fois sur onze — elle aborde par la droite et se pose en appui sur l'antérieur droit. Toujours. Un animal qui fait toujours la même chose du même côté a mal quelque part de l'autre.",
      extreme:"**Trois**, et c'est celui-là qui vaut cinq jours de relevés dans la boue. À chaque fois qu'on peut l'établir — sept fois sur onze, ce qui est un très bon taux — elle aborde par la droite et prend appui sur l'antérieur droit en touchant. Toujours. Sans exception. Un animal de quarante tonnes qui fait invariablement la même chose du même côté a quelque chose qui ne va pas de l'autre : une vieille fracture, une articulation prise, une aile qui ne porte plus la charge en fin de virage. **L'épaule gauche.**" },
    "§ On ne sait pas ce qu'elle a à l'épaule gauche. On sait qu'elle ne s'en sert pas pour se poser, et ça suffit.",
    "C'est la méthode de Charles de Mont-Draken, exactement : on ne cherche pas ce que c'est, on cherche ce que ça ne fait pas.",
  ],
  effets:{ flags:['dr_methode','dr_epaule','dr_sait'],
           cout:{ endurance:12 },
           exploit:{ eclat:5, temoins:'quelques', quoi:"cinq jours de relevés dans la boue, et une épaule gauche" },
           marque:"Pas de fond étroit. Pas la nuit. Et elle se pose toujours sur l'antérieur droit : l'épaule gauche ne porte plus.",
           court:"L'épaule gauche" },
  suite:'dr_preparer', libelleSuite:"Il reste quatre semaines" },

dr_evacuer:{
  lieu:"Karlsberg · le bourg",
  titre:"Trente et un feux",
  texte:[
    "Évacuer un bourg avant de savoir ce qu'on évacue est une décision qu'aucun seigneur de cette province ne prendrait, parce qu'elle est ridicule si l'on se trompe et invisible si l'on a raison.",
    { sobre:"On le vide en quatre jours.",
      intense:"On le vide en quatre jours, ce qui est un temps absurde — et qui n'est possible que parce que quelqu'un ici a passé quinze ans à faire disparaître des gens et sait exactement comment on déplace quatre-vingts personnes qui ne veulent pas partir.",
      extreme:"On le vide en quatre jours, ce qui est un temps absurde pour trente et un feux, et qui n'est possible que pour une seule raison : il y a dans cette maison quelqu'un qui a passé quinze ans à faire disparaître des gens dans quatre provinces et qui sait, dans le détail, comment on déplace quatre-vingts personnes qui ne veulent pas partir. On ne discute pas. On ne convainc pas. On donne trois adresses, une heure de départ et une charrette, et on part le premier." },
    "Il y a onze disputes, deux refus, un vieux qui s'enferme et qu'il faut porter.",
    "§ Le quatrième soir, il n'y a plus personne au pied des murs.",
    "Pendant les trois semaines suivantes, il ne se passe rien du tout, et vous devenez l'homme qui a évacué un bourg pour une vache coupée en deux.",
    "Deux maisons de la Route Grise le font savoir. Un placard circule à Chastel.",
    { sobre:"Puis le hameau de Sarve.",
      intense:"Puis, le vingt-neuf, il y a le hameau de Sarve, qui n'a pas été évacué parce qu'il ne dépend pas de vous, et où il y avait neuf feux.",
      extreme:"Puis, la nuit du vingt-neuf, il y a le hameau de Sarve. Il n'a pas été évacué parce qu'il ne dépend pas de vous, qu'on n'y a pas cru, et que son seigneur a dit à ses gens que Karlsberg s'affolait pour du bétail. Il y avait neuf feux. Il y en a quatre le lendemain matin, et le reste tient dans une charrette qu'on descend au bourg vide de Karlsberg, parce que c'est le seul endroit à onze lieues où il y a trente lits qui ne servent à personne." },
    "Plus personne ne parle du placard.",
  ],
  effets:{ flags:['dr_evacue','dr_bourg_vide','a2_hordes_refugies'],
           faire:() => { bouger('alycia', { relation:3, confiance:4 });
                         const C = CHANTIER(); C.grain = Math.max(0, C.grain - 3);
                         retenir('caleb', "il a vidé son bourg quatre semaines avant, sur rien, et il avait raison"); },
           exploit:{ eclat:7, temoins:'province', quoi:"un bourg vidé quatre semaines avant, sur presque rien" },
           marque:"Le bourg vidé en quatre jours sur presque rien. Sarve n'a pas été évacué : neuf feux, quatre le lendemain.",
           court:"Quatre jours" },
  suite:'dr_preparer', libelleSuite:"Il reste quatre semaines" },

/* ══ 2 · LA PRÉPARATION ═══════════════════════════════════════════════════
 * L'écran qui paie tout l'acte. Rien ne s'y achète : on lit ce qu'on a
 * décidé ailleurs, et ce qu'on n'a pas décidé n'est pas là. */
dr_preparer:{ dyn:true, texte:[], suite:'dr_veille' },

dr_veille:{
  lieu:"Karlsberg · la veille",
  titre:"La nuit du trente-quatre",
  texte:[
    "On sait quand : elle passe tous les onze ou douze jours et le dernier passage était le vingt-deux.",
    { sobre:"Il n'y a rien à faire de la dernière nuit.",
      intense:"Il n'y a rien à faire de la dernière nuit. Tout est en place ou ne le sera pas ; les cordes sont graissées ou elles ne le sont pas ; les gens sont partis ou ils sont là.",
      extreme:"Il n'y a rien à faire de la dernière nuit et c'est la partie que personne ne raconte. Tout est en place ou ne le sera pas. Les cordes des pièces sont graissées ou elles ne le sont pas. Les gens sont partis ou ils sont restés. On a vérifié quatre fois, on vérifie une cinquième pour s'occuper les mains, et ensuite il reste huit heures dont on ne peut absolument rien faire." },
    () => a('a2_alycia_epouse') || a('ml_signe') || a('ml_termes') || a('ml_tacite')
      ? "Alycia ne dort pas. Elle a placé quatre-vingt-onze personnes en quatre jours et elle recompte la liste pour la troisième fois de la nuit, à voix basse, dans le noir, parce qu'elle ne sait pas faire autrement."
      : "Vous êtes seul dans la salle basse, et c'est très bien : il y a des choses qu'on fait mieux sans personne à rassurer.",
    () => a('a2_enfant')
      ? "§ Loyse a onze mois. Elle est à quatorze lieues, chez des gens dont vous ne connaissez pas le nom, et c'est la première fois de votre vie que vous comprenez pourquoi les hommes font des choses stupides."
      : "§ Il n'y a personne à qui vous deviez survivre en particulier, ce qui est une liberté et n'en a pas l'air cette nuit-là.",
    () => {
      const p = preparation();
      if(!p.length) return "Vous n'avez rien. Pas de mur haut, pas de pièce d'artillerie, pas de Nain, pas d'homme qui sache tenir une file. Vous avez une épée bâtarde et ce que vous avez sous les côtes, et c'est très exactement ce que vous aviez à dix-neuf ans.";
      return "§ Ce qu'il y a, et d'où ça vient :\n\n" + p.map(x => `**${x.quoi}** — ${x.note}`).join('\n\n');
    },
    "Elle arrive à sept heures et demie, un peu avant le crépuscule, par le sud-ouest.",
    "Elle aborde par la droite.",
  ],
  effets:{ flags:['dr_veille'],
           melee:{ eux:1, position:"vos murs, ou ce qui en tient lieu", tour:0 },
           marque:"La nuit du trente-quatre. Elle est arrivée à sept heures et demie, par le sud-ouest, en abordant par la droite.",
           court:"Sept heures et demie" },
  suite:'dr_combat_1', libelleSuite:"Elle descend" },

/* ══ 3 · LA GRANDE ════════════════════════════════════════════════════════ */
dr_combat_1:{
  melee:true,
  lieu:"Karlsberg · le crépuscule",
  titre:"La Grande",
  effets:{ meleeMaj:{ position:"elle descend", note:"entière", tour:0 } },
  texte:[
    { sobre:"Quatre-vingts pieds d'envergure, et le bruit vient avant.",
      intense:"Quatre-vingts pieds d'envergure. Le bruit arrive avant elle : ce n'est pas un cri, c'est un déplacement d'air, un souffle bas et continu qu'on sent dans la poitrine à quatre cents pas.",
      extreme:"Quatre-vingts pieds d'envergure ouverte. Le bruit arrive largement avant elle et ce n'est pas un cri — les récits mentent là-dessus comme sur le reste : c'est un déplacement d'air. Un souffle bas, continu, régulier, à peu près une battue toutes les trois secondes, qu'on ne perçoit pas avec les oreilles mais dans le sternum, à quatre cents pas. Les chevaux l'ont su vingt minutes avant vous." },
    "Elle est grise-brune, terreuse, sale — la couleur de six cents pieds de roche. Rien de brillant, rien d'écailleux au sens des tapisseries : une peau épaisse, plissée aux articulations, avec de la mousse morte accrochée dans les plis du cou.",
    { sobre:"Elle est maigre.",
      intense:"Et elle est maigre. C'est le détail qui fait le plus peur : on voit les côtes d'une chose de quarante tonnes.",
      extreme:"Et elle est maigre. C'est le détail qui fait, de très loin, le plus peur, et personne ne s'y attendait : on voit les côtes. On voit les côtes d'une chose de quarante tonnes, sous une peau qui pend un peu au flanc, et ça veut dire exactement ce que ça veut dire — elle est sortie il y a vingt-six mois d'un endroit où elle n'avait rien mangé depuis six cents ans, et elle n'a pas encore rattrapé." },
    "§ Elle ne rugit pas. Elle ne vous regarde pas. Elle ne fait aucune des choses qu'on raconte.",
    "Elle cherche de la nourriture, elle ne trouve pas de fond assez large, elle tourne une fois au-dessus de la vallée — et elle aborde par la droite.",
    () => a('dr_epaule')
      ? "L'épaule gauche ne porte pas. Vous le voyez en une seconde parce que vous avez passé cinq jours dans la boue à établir qu'elle ne porterait pas."
      : "Il y a quelque chose de faux dans sa façon d'aborder, et vous n'avez ni le temps ni le renseignement pour savoir quoi.",
    () => a('a2_muraille')
      ? "Elle ne peut pas se poser dans la cour : douze pieds de muraille et deux tours de flanquement, il n'y a pas la place d'ouvrir. Elle doit se poser en dehors, sur le glacis, ce qui la met à quatre-vingts pas de vos pièces et de face."
      : (a('ch_enceinte')
        ? "Sept pieds d'enceinte. Ça ne l'arrête pas : ça lui coûte une seconde et demie à franchir, et une seconde et demie est une quantité énorme."
        : "Il n'y a pas de mur. Elle se pose dans la cour, et la cour devient tout de suite trop petite pour tout le monde."),
  ],
  choix:[
    { t:"Les pièces sur l'épaule gauche, à la fermeture",
      si:() => a('a2_karlsberg_forge'),
      detail:"On ne tire pas sur une aile ouverte · on tire sur l'épaule à l'instant où elle ferme · Perception + tir contre 11",
      risque:"calculé",
      test:{ carac:'perception', comp:'tir', dc:() => a('dr_epaule') ? 8 : 11,
             adversaire:'grande', manoeuvre:'baliste',
             equipement:() => a('wy_sait_baliste') || a('wy_bracq_allie') ? 3 : 1,
             situation:situGrande },
      degres:{ dominante:'dr_c1_baliste_dom', couteuse:'dr_c1_cout', echec:'dr_c1_ko' } },

    { t:"Tenir la file et ne pas courir",
      detail:"Quarante hommes en ligne derrière un mur · c'est tout ce qu'on leur demande · Présence + commandement contre 10",
      si:() => a('a2_caleb_quarante') || a('a2_garnison'),
      risque:"dangereux",
      test:{ carac:'presence', comp:'commandement', dc:10, adversaire:'grande', manoeuvre:'file',
             situation:situGrande },
      degres:{ dominante:'dr_c1_file_dom', couteuse:'dr_c1_cout', echec:'dr_c1_ko' } },

    { t:"La faire descendre dans le fond étroit",
      si:() => a('dr_methode'),
      detail:"Elle ne se pose jamais à moins de cent pieds de large · il y a un défilé à trois cents pas · Intellect + tactique contre 9",
      risque:"calculé",
      test:{ carac:'intellect', comp:'tactique', dc:9, adversaire:'grande', manoeuvre:'defile',
             situation:situGrande },
      degres:{ dominante:'dr_c1_defile_dom', couteuse:'dr_c1_cout', echec:'dr_c1_ko' } },

    { t:"L'Onde, tout de suite, sur l'aile en appui",
      detail:"Quatre-vingts témoins et ce qu'on ne peut plus reprendre · Volonté + Onde contre 13",
      ferme:"Ferme : ce que la province pouvait encore ignorer",
      risque:"définitif", definitif:true,
      test:{ carac:'volonte', comp:'onde', dc:13, adversaire:'grande', manoeuvre:'onde',
             cout:{ concentration:30 }, situation:situGrande },
      degres:{ dominante:'dr_c1_onde_dom', couteuse:'dr_c1_cout', echec:'dr_c1_ko' } },

    { t:"Rester immobile et la laisser prendre ce qu'elle est venue prendre",
      detail:"Il y a quatorze bêtes dans l'enclos bas · elle ne vise personne · Volonté + tactique contre 8",
      risque:"prudent",
      test:{ carac:'volonte', comp:'tactique', dc:8, adversaire:'grande', manoeuvre:'immobile',
             situation:situGrande },
      degres:{ dominante:'dr_c1_bete_dom', couteuse:'dr_c1_cout', echec:'dr_c1_ko' } },
  ],
},

dr_c1_baliste_dom:{
  melee:true,
  titre:"À la fermeture",
  effets:{ meleeMaj:{ position:"posée, de face, à quatre-vingts pas", note:"épaule gauche ouverte", tour:1 },
           flags:['dr_touchee','dr_epaule_ouverte'],
           exploit:{ eclat:12, temoins:'foule', quoi:"un carreau de rempart dans l'épaule d'une chose de quarante tonnes" },
           marque:"Le carreau entre à la fermeture, dans l'épaule gauche. Elle ne crie pas : elle se pose et elle regarde son épaule.",
           court:"À la fermeture" },
  texte:[
    "On ne tire pas sur une aile ouverte : la membrane est tendue, le carreau passe au travers et fait un trou dans du vide.",
    "On tire sur l'épaule à l'instant exact où elle ferme, quand le membre revient et que toute la masse se ramasse sur trois pieds carrés d'articulation.",
    { sobre:"Le carreau entre.",
      intense:"Les deux pièces partent à une demi-seconde d'écart. La première manque de dix pieds. La seconde entre.",
      extreme:"Les deux pièces partent à une demi-seconde d'écart, ce qui est exactement ce qu'on avait répété. La première manque de dix pieds vers le bas — c'est normal, c'est même prévu : elle sert à obtenir la correction. La seconde entre. Un carreau de rempart de quatre pieds, ferré, tiré à quatre-vingts pas sur une articulation qui se referme, et il entre jusqu'à l'empennage." },
    "§ Elle ne crie pas.",
    "C'est la chose la plus difficile à soutenir de toute la soirée : elle ne crie pas, elle ne rugit pas, elle ne se cabre pas.",
    { sobre:"Elle se pose, et elle regarde son épaule.",
      intense:"Elle finit sa descente — mal, lourdement, en touchant du poitrail — puis elle se pose sur le glacis, tourne la tête, et **regarde son épaule**. Longuement. Comme un chien qui a marché sur quelque chose.",
      extreme:"Elle finit sa descente — mal, très lourdement, en touchant d'abord du poitrail, ce qui fait un bruit qu'aucun des quatre-vingts témoins n'oubliera. Puis elle se pose sur le glacis, replie, tourne la tête sur son long cou, et elle **regarde son épaule**. Longuement. Avec exactement l'attention d'un chien qui a marché sur quelque chose et qui essaie de comprendre ce qu'il a sous la patte. C'est à cette seconde-là que la moitié des hommes sur le rempart cessent d'avoir peur et commencent à avoir autre chose, qu'aucun d'eux ne saura nommer." },
    "Puis elle relève la tête vers le mur, et l'autre moitié des hommes découvre qu'elle avait raison d'avoir peur.",
  ],
  suite:'dr_combat_2', libelleSuite:"Elle vient" },

dr_c1_file_dom:{
  melee:true,
  titre:"Quarante hommes qui ne courent pas",
  effets:{ meleeMaj:{ position:"derrière le mur, en ligne", note:"entière", tour:1 },
           flags:['dr_file_tenue'],
           exploit:{ eclat:10, temoins:'foule', quoi:"quarante hommes qui n'ont pas couru" },
           marque:"Personne n'a couru. C'est tout ce qu'on leur demandait et c'est la chose la plus difficile de la soirée.",
           court:"La file" },
  texte:[
    "On ne demande pas à quarante hommes de tuer un dragon. On leur demande de ne pas courir.",
    { sobre:"C'est infiniment plus difficile.",
      intense:"C'est infiniment plus difficile, et c'est la seule chose qui décide. Une file qui tient est un mur ; une file qui court est une file de dos.",
      extreme:"C'est infiniment plus difficile que de se battre, et c'est la seule chose qui décide de tout. Une file qui tient derrière un rempart est un mur de plus. Une file qui court est quarante dos qui descendent un escalier en même temps, et il n'existe aucune force au monde capable de la reformer ensuite. Tous ceux qui ont commandé le savent, aucun ne l'écrit, et on l'apprend une fois." },
    "Le sergent s'appelle Ambroise, il a quarante-trois ans et une hanche qui le fait boiter par temps humide, et il fait une seule chose ce soir-là : il se met au milieu de la file, dos au vide, face à ses hommes, et il ne se retourne pas une fois.",
    "Il ne la voit pas arriver. Il ne la verra pas de toute la soirée.",
    "§ Personne ne court.",
    "Deux hommes lâchent leur pique. Personne ne court.",
    () => a('a2_caleb_dedans')
      ? "Ce sont les hommes de Fort-aux-Princes. Vous ne saurez jamais s'ils sont à vous — mais ce soir-là, sur ce mur, la question ne se pose pour personne, et Ambroise a raison depuis le début."
      : "Ce sont vos hommes, et ils tiennent, et vous découvrez ce que ça vaut.",
  ],
  suite:'dr_combat_2', libelleSuite:"Elle vient" },

dr_c1_defile_dom:{
  melee:true,
  titre:"Cent pieds de large",
  effets:{ meleeMaj:{ position:"au défilé, à trois cents pas des murs", note:"gênée", tour:1 },
           flags:['dr_defile','dr_genee'],
           exploit:{ eclat:11, temoins:'quelques', quoi:"un dragon amené là où il ne peut pas ouvrir" },
           marque:"Elle est descendue dans le défilé. Quatre-vingt-dix pieds de large : elle ne peut pas ouvrir en grand.",
           court:"Le défilé" },
  texte:[
    "Quarante-sept relevés, pas une exception : elle ne se pose jamais dans un fond de moins de cent pieds.",
    "Ce qui veut dire, si on le retourne — et c'est tout l'art de Mont-Draken de retourner les relevés — qu'un fond de quatre-vingt-dix pieds est un endroit où elle **ne peut pas** se poser, mais où elle peut être obligée de descendre.",
    { sobre:"On lui donne une raison de descendre là.",
      intense:"On lui donne une raison de descendre là : quatorze bêtes attachées court dans le défilé, et rien d'autre à manger sur onze lieues parce qu'on a passé quatre jours à tout rentrer.",
      extreme:"On lui donne une raison de descendre là, et la raison est laide : quatorze bêtes attachées court au fond du défilé, sous un ciel de quatre-vingt-dix pieds de large, et rien d'autre à manger dans un rayon de onze lieues parce qu'on a passé quatre jours à rentrer, cacher ou abattre tout ce qui pouvait la nourrir ailleurs. C'est un appât. Il n'y a pas d'autre mot et personne ne cherche à en trouver un." },
    "§ Elle descend. Elle descend mal.",
    "Un animal qui doit replier avant d'avoir fini sa descente arrive lourd, de travers, et met trois ou quatre secondes à se remettre d'aplomb entre des parois de roche.",
    "Trois ou quatre secondes.",
    { sobre:"C'est plus que tout ce qu'on aura d'autre.",
      intense:"C'est plus de temps que tout ce que la soirée vous donnera d'autre, et ça n'a coûté que cinq jours de boue et quatorze bêtes.",
      extreme:"C'est plus de temps que tout ce que cette soirée vous donnera d'autre, mis bout à bout. Ça n'a coûté que cinq jours de relevés dans la boue, quatorze bêtes, et le fait d'avoir écouté un homme de soixante et un ans qu'un conseil de province a refusé d'écouter pendant trente ans." },
  ],
  suite:'dr_combat_2', libelleSuite:"Trois secondes" },

dr_c1_onde_dom:{
  melee:true,
  titre:"Devant quatre-vingts personnes",
  effets:{ meleeMaj:{ position:"déséquilibrée à l'appui", note:"aile droite forcée", tour:1 },
           flags:['dr_onde','a2_onde_publique','dr_genee'], suspicion:30,
           cout:{ concentration:12 },
           exploit:{ eclat:20, temoins:'foule', quoi:"l'Onde employée sur quarante tonnes, devant tout un rempart" },
           faire:() => { retenir('charles', "il a poussé quarante tonnes devant quatre-vingts témoins");
                         bouger('alycia', { peur:4 }); },
           marque:"L'aile droite en appui, forcée d'un pied et demi. Devant quatre-vingts personnes. Il n'y a plus rien à cacher.",
           court:"Un pied et demi" },
  texte:[
    "Il n'y a aucune façon de faire ça discrètement. C'est même la définition du choix.",
    { sobre:"Vous prenez l'aile droite, celle qui porte.",
      intense:"Vous ne prenez pas la bête — quarante tonnes ne se poussent pas. Vous prenez l'aile droite au moment de l'appui, celle qui porte toute la charge parce que la gauche ne porte plus.",
      extreme:"Vous ne prenez pas la bête. Quarante tonnes ne se poussent pas et il n'y a jamais eu personne, en quatre cents ans, capable de pousser quarante tonnes. Vous prenez l'aile droite, à l'instant précis de l'appui, celle qui porte l'intégralité de la charge parce que la gauche ne porte plus depuis six cents ans. Vous ne la déplacez pas : vous la retardez d'un pied et demi." },
    "§ Un pied et demi.",
    "Elle touche de travers, à quinze pieds de son point d'appui, et le glacis se soulève sur trente pas comme un tapis qu'on secoue.",
    { sobre:"Et quatre-vingts personnes ont vu.",
      intense:"Et quatre-vingts personnes ont vu. Pas une lueur, pas un geste théâtral : elles ont vu quarante tonnes rater leur appui sans raison, à l'instant où un homme a levé la main.",
      extreme:"Et quatre-vingts personnes ont vu. Il n'y a eu ni lueur, ni geste, ni rien de ce que les tapisseries mettent dans ces moments-là. Elles ont vu quarante tonnes rater un appui sans aucune raison physique, exactement à la seconde où un homme sur le rempart a levé une main à hauteur de poitrine. C'est tout. C'est amplement suffisant. Il y a parmi ces quatre-vingts personnes deux hommes de Fort-aux-Princes, un clerc, et une femme dont le cousin est sergent d'étape à Chastel." },
    "Il n'y aura plus jamais de version où l'on ne sait pas.",
  ],
  suite:'dr_combat_2', libelleSuite:"Elle se relève" },

dr_c1_bete_dom:{
  melee:true,
  titre:"Quatorze bêtes",
  effets:{ meleeMaj:{ position:"à l'enclos bas, occupée", note:"elle mange", tour:1 },
           flags:['dr_bete','dr_genee'],
           marque:"Quatorze bêtes dans l'enclos bas. Personne n'a bougé. Elle a mangé pendant vingt minutes et personne n'a bougé.",
           court:"Vingt minutes" },
  texte:[
    "Il y a quatorze bêtes dans l'enclos bas et il n'y a personne dedans, parce qu'on a vidé le bourg ou parce qu'on a eu de la chance.",
    "Elle ne vise personne. Elle n'a jamais visé personne : elle a écrasé un hameau en se posant, ce qui n'est pas la même chose, et le vieux de la première ferme le savait déjà.",
    { sobre:"Ne pas bouger est ce qu'il y a de plus dur.",
      intense:"Rester immobile pendant qu'une chose de quarante tonnes mange à cent pas est ce qu'il y a de plus dur, et ça ne s'apprend pas : ça se décide une fois, à l'avance, pour tout le monde en même temps.",
      extreme:"Rester immobile pendant qu'une chose de quarante tonnes mange à cent pas de vous est, de très loin, ce qu'il y a de plus difficile à faire de toute cette soirée. Ça ne s'apprend pas et ça ne se commande pas dans l'instant : ça se décide une fois, à l'avance, à froid, pour tout le monde en même temps, et ensuite chacun tient parce que les autres tiennent." },
    "§ Elle mange vingt minutes.",
    "Personne ne bouge. Deux hommes vomissent sans bouger, ce qui est un exploit qu'aucune chanson ne mentionnera jamais.",
    "Puis elle relève la tête, et elle regarde le mur, et on comprend que quatorze bêtes ne suffisent pas — pas quand on n'a rien mangé depuis six cents ans et qu'on voit encore ses côtes.",
    { sobre:"Elle vient quand même.",
      intense:"Elle vient quand même. Vingt minutes gagnées, quatorze bêtes perdues, et rien de réglé — mais vingt minutes de jour en moins, et elle voit mal dans le noir.",
      extreme:"Elle vient quand même, et il faut être honnête sur ce qu'on a obtenu : rien du tout, sauf vingt minutes. Vingt minutes de crépuscule en moins. Or elle a passé six cents ans sous une montagne et elle voit mal dans le noir — c'est le deuxième des trois relevés, celui dont personne n'avait vu l'usage, et il vient de valoir quatorze bêtes." },
  ],
  suite:'dr_combat_2', libelleSuite:"Elle vient" },

/* Les conséquences partagées du premier échange : elles lisent la manœuvre
 * au lieu de multiplier les scènes. */
dr_c1_cout:{
  melee:true,
  titre:"Ça marche, et ça coûte",
  effets:{ meleeMaj:{ position:"au contact du mur", note:"entière", tour:1 },
           flags:['dr_cout_1'],
           cout:{ endurance:16 },
           blessure:{ id:'dr_bras', zone:"avant-bras droit", type:"brûlure profonde", gravite:2, douleur:3,
                      fonction:['epees','tir'], traitement:null,
                      cicatrice:"une plaque lisse de la largeur d'une main" },
           marque:"Ça a marché et le glacis a pris feu. Quatre hommes brûlés, dont vous.",
           court:"L'avant-bras" },
  texte:[
    "Ça marche. Ça marche et ce n'est pas gratuit, ce qui est la règle de toutes les choses qui marchent.",
    { sobre:"Elle souffle.",
      intense:"Elle souffle — et il faut être précis, parce que tout ce qu'on raconte là-dessus est faux : ce n'est pas un jet dirigé, ce n'est pas une arme. C'est un animal acculé qui vide ses poumons.",
      extreme:"Elle souffle, et il faut être très précis parce que tout ce qu'on raconte là-dessus est faux. Ce n'est pas un jet dirigé. Ce n'est pas une arme, elle ne vise pas, il n'y a aucune intention dedans. C'est un animal gêné qui vide brutalement des poumons de quarante tonnes, et ce qui sort est chaud, chargé, et ne va nulle part en particulier — ce qui est bien pire qu'un jet, parce qu'un jet, on peut se mettre à côté." },
    "Le glacis prend sur soixante pas. Une des deux pièces brûle avec ses cordes.",
    "§ Quatre hommes sont touchés, dont vous.",
    "L'avant-bras droit, sur la largeur d'une main, jusqu'au muscle. Ça ne saigne pas — les brûlures profondes ne saignent pas, c'est ce qui les rend difficiles à évaluer sur le moment et faciles à sous-estimer.",
    "Vous tenez encore une épée. Vous la tenez mal.",
  ],
  suite:'dr_combat_2', libelleSuite:"Elle vient" },

dr_c1_ko:{
  melee:true,
  titre:"Non",
  effets:{ meleeMaj:{ position:"dans la cour", note:"entière", tour:1 },
           flags:['dr_echec_1','dr_brulee'],
           cout:{ endurance:22, moral:14 },
           marque:"Elle est entrée. Le mur n'a rien arrêté du tout et il y a onze morts avant la nuit.",
           court:"Elle est entrée" },
  texte:[
    "Non.",
    { sobre:"Ça ne marche pas.",
      intense:"Ça ne marche pas, et il n'y a pas de deuxième essai : elle a franchi la ligne pendant qu'on essayait.",
      extreme:"Ça ne marche pas, et il n'y a pas de deuxième essai — c'est la différence entre une bête de quarante tonnes et n'importe quel adversaire humain. Un homme vous laisse le temps de corriger. Elle franchit la ligne pendant que vous corrigez, parce qu'elle ne sait pas qu'il y a une ligne." },
    "Elle entre. Ce qui suit dure environ quatre minutes et il n'y a pas grand-chose à en dire de cohérent, parce que personne n'a rien vu de cohérent.",
    "§ Onze morts.",
    "Le puits est comblé pour la deuxième fois en vingt ans, par une chose qui s'est appuyée dessus.",
    () => a('a2_caleb_quarante')
      ? "Ambroise est vivant. Sept des quarante ne le sont pas, et c'est lui qui écrira à Fort-aux-Princes, parce qu'il tient à le faire lui-même."
      : "Il n'y avait pas assez de monde pour tenir quoi que ce soit, et c'est apparu en quatre minutes.",
    "Puis elle repart, parce qu'elle a eu ce qu'elle est venue chercher et qu'elle n'a aucune raison de rester.",
    "Elle reviendra dans onze ou douze jours.",
  ],
  suite:'dr_combat_2', libelleSuite:"Onze ou douze jours" },

/* ── DEUXIÈME ÉCHANGE ──────────────────────────────────────────────────── */
dr_combat_2:{
  melee:true,
  lieu:"Karlsberg",
  titre:"Ce qu'elle fait quand on lui fait mal",
  effets:{ meleeMaj:{ tour:1 } },
  texte:[
    () => a('dr_echec_1')
      ? "Onze ou douze jours, et on n'a pas onze ou douze jours pour devenir meilleurs. On a onze ou douze jours pour décider autrement."
      : "Elle est à terre, gênée, et c'est le moment le plus dangereux — un animal blessé qui ne peut pas partir est très exactement ce qu'il y a de pire au monde.",
    { sobre:"Elle ne fuit pas.",
      intense:"Elle ne fuit pas et elle ne charge pas non plus. Elle fait la chose la plus animale possible : elle cherche par où sortir, et tout ce qui se trouve entre elle et la sortie cesse d'exister.",
      extreme:"Elle ne fuit pas et elle ne charge pas — les deux supposeraient une décision. Elle fait la seule chose qu'un animal fait dans cette situation, et c'est bien pire que les deux autres : elle cherche par où sortir. Elle ne cherche pas à vous tuer, elle n'a aucune opinion sur vous, elle cherche une trouée assez large pour ouvrir. Tout ce qui se trouve entre elle et cette trouée cesse d'exister, sans intention, sans colère, comme une charrette écrase un chat." },
    () => a('dr_epaule_ouverte')
      ? "§ L'épaule gauche saigne. Une articulation de cette taille ne se ferme pas : elle saigne pendant des heures, et elle a déjà perdu de quoi vider trois hommes."
      : "§ Elle est entière. Rien de ce qu'on lui a fait ne l'a entamée, et il faut le savoir avant de choisir ce qu'on tente maintenant.",
    () => a('a2_muraille')
      ? "Elle est contre douze pieds de muraille, dans un angle rentrant, et elle ne peut pas ouvrir. Vous avez construit ça il y a deux ans pour d'autres raisons."
      : "Il n'y a rien qui la contraigne. Elle va où elle veut et elle en met une seconde et demie.",
    () => a('a2_maitre_oeuvre') || a('a2_nains_dehors')
      ? "Les Nains vous crient quelque chose depuis la tour ouest. Le traducteur met quatre secondes : **« la gorge, non — le pli du cou, sous la mâchoire, là où la peau se plisse quand elle baisse la tête. »**"
      : "Personne ici n'a jamais vu une chose pareille de près, et personne ne sait où frapper.",
  ],
  choix:[
    { t:"Le pli du cou, sous la mâchoire",
      si:() => a('a2_maitre_oeuvre') || a('a2_nains_dehors'),
      detail:"Là où la peau se plisse quand elle baisse la tête · six cents ans de savoir nain · Force + épées contre 12",
      risque:"très dangereux",
      test:{ carac:'force', comp:'epees', dc:12, adversaire:'grande', manoeuvre:'pli',
             equipement:2, situation:situGrande },
      degres:{ dominante:'dr_c2_pli_dom', couteuse:'dr_c2_cout', echec:'dr_c2_ko' } },

    { t:"Achever l'épaule ouverte",
      si:() => a('dr_epaule_ouverte'),
      detail:"Une articulation qui saigne depuis vingt minutes · finir le travail · Force + armes lourdes contre 10",
      risque:"dangereux",
      test:{ carac:'force', comp:'armes_lourdes', dc:10, adversaire:'grande', manoeuvre:'epaule',
             equipement:2, situation:situGrande },
      degres:{ dominante:'dr_c2_epaule_dom', couteuse:'dr_c2_cout', echec:'dr_c2_ko' } },

    { t:"Lui ouvrir la sortie",
      detail:"Faire tomber la poterne et la laisser partir · elle n'est venue tuer personne · Intellect + tactique contre 9",
      risque:"calculé",
      test:{ carac:'intellect', comp:'tactique', dc:9, adversaire:'grande', manoeuvre:'sortie',
             situation:situGrande },
      degres:{ dominante:'dr_c2_sortie_dom', couteuse:'dr_c2_cout', echec:'dr_c2_ko' } },

    { t:"L'Onde, sur le cou, à fond",
      detail:"Tout ce qu'il reste, en une fois · et ce que ça coûte au corps · Volonté + Onde contre 14",
      risque:"définitif", definitif:true,
      test:{ carac:'volonte', comp:'onde', dc:14, adversaire:'grande', manoeuvre:'onde',
             cout:{ concentration:40 }, situation:situGrande },
      degres:{ dominante:'dr_c2_onde_dom', couteuse:'dr_c2_cout', echec:'dr_c2_ko' } },
  ],
},

dr_c2_pli_dom:{
  melee:true,
  titre:"Six cents ans de savoir",
  effets:{ meleeMaj:{ position:"à terre, le cou ouvert", note:"mourante", tour:2 },
           flags:['dr_cou','dr_mortelle'],
           cout:{ endurance:20 },
           exploit:{ eclat:26, temoins:'foule', quoi:"le pli du cou, sous la mâchoire, comme les Nains l'ont dit" },
           marque:"Le pli du cou, sous la mâchoire. Les Nains le savaient depuis six cents ans et personne ne le leur avait demandé.",
           court:"Le pli" },
  texte:[
    "La gorge d'une chose pareille est une plaque de corne de quatre pouces. Tout le monde vise la gorge. Personne n'y arrive.",
    { sobre:"Le pli, c'est autre chose.",
      intense:"Le pli du cou est autre chose : c'est l'endroit où la peau doit se plier quand la tête descend, et une peau qui se plie ne peut pas être blindée. C'est de la mécanique, pas de la magie.",
      extreme:"Le pli du cou est une tout autre affaire, et c'est une évidence dès qu'on l'a entendue une fois : c'est l'endroit où la peau doit obligatoirement se plier quand la tête descend vers le sol. Une peau qui se plie ne peut pas porter quatre pouces de corne — aucun animal du monde connu n'y échappe, c'est de la mécanique et pas de la magie. Il faut simplement le savoir, et pour le savoir il faut avoir vécu six cents ans sous la même montagne qu'elle." },
    "Elle baisse la tête pour saisir un homme au sol. Elle est obligée de la baisser.",
    "§ Le pli s'ouvre, et l'épée entre jusqu'à la garde dans une chose qui n'a rien de dur.",
    { sobre:"Ce n'est pas héroïque. C'est très proche et très laid.",
      intense:"Il n'y a rien d'héroïque là-dedans. C'est très proche, très laid, et ce qui sort est chaud et n'arrête pas de sortir.",
      extreme:"Il n'y a rien d'héroïque là-dedans et il faut le dire, parce que dans dix ans on en fera une tapisserie. C'est à trois pieds. C'est très laid. Ce qui sort est chaud, sort à la pression, et n'arrête pas de sortir pendant un temps que personne ne mesure — quelqu'un dira quatre minutes, quelqu'un d'autre un quart d'heure. Vous êtes dessous pendant toute la durée parce qu'il n'y a nulle part où aller." },
    "Elle ne meurt pas tout de suite. Ces choses-là ne meurent pas tout de suite : elle met la nuit.",
    "§ Elle passe la nuit couchée sur le glacis, sans bouger, la tête à plat, à respirer de plus en plus lentement.",
    "Personne ne l'achève. Personne n'ose et personne ne veut, et à l'aube elle a cessé, et on ne sait pas dire à quel moment.",
  ],
  suite:'dr_apres', libelleSuite:"Le matin" },

dr_c2_epaule_dom:{
  melee:true,
  titre:"Finir",
  effets:{ meleeMaj:{ position:"à terre, l'antérieur brisé", note:"elle ne repartira pas", tour:2 },
           flags:['dr_epaule_finie','dr_mortelle'],
           cout:{ endurance:24 },
           blessure:{ id:'dr_cotes', zone:"côtes gauches", type:"enfoncement", gravite:2, douleur:3,
                      fonction:['endurance','lutte'], traitement:null,
                      cicatrice:"rien à voir, et une respiration qui siffle par temps froid" },
           exploit:{ eclat:22, temoins:'foule', quoi:"l'articulation d'une chose de quarante tonnes, finie à la masse" },
           marque:"L'articulation ouverte, finie à la masse. Elle ne repartira jamais de cette vallée.",
           court:"L'articulation" },
  texte:[
    "Une articulation d'épaule, sur une chose de quarante tonnes, fait la taille d'une roue de charrette.",
    { sobre:"On l'ouvre à la masse.",
      intense:"Le carreau est dedans depuis vingt minutes. On finit à la masse, à deux hommes, en tapant sur le manche du carreau pour l'enfoncer.",
      extreme:"Le carreau est dedans depuis vingt minutes, planté jusqu'à l'empennage dans une articulation qui saigne. On finit à la masse — à deux, l'un tenant, l'autre frappant sur l'empennage comme sur un coin à fendre, à quatre pieds d'une tête de six pieds de long. C'est le travail le plus laid que vous ferez de votre vie et il ressemble beaucoup plus à de l'abattage qu'à un combat." },
    "Elle vous prend au flanc du bout de la mâchoire, sans même refermer, et vous partez à onze pieds contre le parapet.",
    "§ Trois côtes.",
    "Vous vous relevez parce qu'il n'y a rien d'autre à faire, et l'articulation est ouverte.",
    { sobre:"Elle ne repartira pas.",
      intense:"Elle ne repartira pas de cette vallée. Une chose de quarante tonnes qui ne peut plus s'appuyer d'un côté ne se relève pas, ne s'envole pas, et ne va nulle part.",
      extreme:"Elle ne repartira pas de cette vallée. C'est réglé à la seconde où l'articulation cède, et tout le monde sur le rempart le comprend en même temps : une chose de quarante tonnes qui ne peut plus prendre appui d'un côté ne se relève pas, ne s'envole pas, et n'ira nulle part. Ce qui suit n'est plus un combat. C'est une agonie qu'il faudra regarder, ou pas regarder, et les deux se paient." },
  ],
  suite:'dr_apres', libelleSuite:"Le matin" },

dr_c2_sortie_dom:{
  melee:true,
  titre:"Lui ouvrir",
  effets:{ meleeMaj:{ position:"elle sort", note:"vivante", tour:2 },
           flags:['dr_partie','dr_vivante'],
           exploit:{ eclat:9, temoins:'foule', quoi:"une poterne abattue pour laisser sortir quarante tonnes" },
           marque:"On a fait tomber la poterne et douze pieds de courtine. Elle est sortie. Personne d'autre n'est mort.",
           court:"La poterne" },
  texte:[
    "Elle cherche par où sortir. On lui donne par où sortir.",
    { sobre:"On abat notre propre poterne.",
      intense:"On abat la poterne à la masse et au levier, plus douze pieds de courtine avec — deux ans de chantier, quatre-vingts charrois de pierre — pendant qu'une chose de quarante tonnes cherche une trouée à trente pas.",
      extreme:"On abat notre propre poterne, à la masse et au levier, à six hommes, plus douze pieds de courtine avec elle parce que la poterne seule ne fait pas la largeur. Deux ans de chantier. Quatre-vingts charrois de pierre taillée montés à dos de mulet depuis Kar-Durak. On les jette par terre en onze minutes pendant qu'une chose de quarante tonnes cherche une trouée à trente pas et écrase par distraction tout ce qui se trouve entre elle et le mur." },
    "§ Elle sort.",
    "Elle ne remercie pas, elle ne comprend pas, elle ne saura jamais. Elle trouve une ouverture, elle passe, elle ouvre dans le champ derrière et elle s'en va vers le nord.",
    { sobre:"Personne d'autre ne meurt.",
      intense:"Personne d'autre ne meurt cette nuit-là. C'est le seul chiffre qui compte et c'est celui qu'on retiendra le moins.",
      extreme:"Personne d'autre ne meurt cette nuit-là. C'est le seul chiffre qui compte réellement, c'est celui que l'on retiendra le moins, et c'est celui qu'aucune chanson ne mentionnera jamais — parce qu'une chanson ne sait pas quoi faire d'un seigneur qui abat son propre mur pour laisser partir un dragon vivant." },
    "Elle reviendra. Peut-être dans onze jours, peut-être dans un an, peut-être jamais si elle trouve mieux au nord.",
    "§ Vous avez douze pieds de courtine par terre et une décision qui vous suivra longtemps.",
  ],
  suite:'dr_apres', libelleSuite:"Le matin" },

dr_c2_onde_dom:{
  melee:true,
  titre:"Tout, en une fois",
  effets:{ meleeMaj:{ position:"le cou rompu", note:"morte sur le coup", tour:2 },
           flags:['dr_onde_finale','dr_mortelle','a2_onde_publique'], suspicion:40,
           cout:{ concentration:35, vitalite:18 },
           blessure:{ id:'dr_saignement', zone:"nez et oreilles", type:"rupture", gravite:2, douleur:2,
                      saignement:2, fonction:['onde'], traitement:null,
                      cicatrice:"une surdité partielle à gauche qui ne reviendra pas" },
           exploit:{ eclat:34, temoins:'province', quoi:"quarante tonnes arrêtées net devant quatre-vingts témoins" },
           faire:() => { retenir('charles', "il a rompu le cou d'une chose de quarante tonnes sans la toucher");
                         retenir('lucius', "il a fait devant quatre-vingts personnes ce dont Astrah a eu trois rois");
                         bouger('alycia', { peur:6 }); },
           marque:"Le cou rompu sans contact, devant quatre-vingts témoins. Vous saignez des oreilles et vous n'entendez plus à gauche.",
           court:"Tout, en une fois" },
  texte:[
    "Il ne s'agit plus de pousser une aile d'un pied et demi.",
    { sobre:"Vous prenez le cou.",
      intense:"Vous prenez le cou. Pas la bête : le cou. Douze pieds de long, une masse énorme, et une colonne qui n'est faite pour supporter qu'un seul sens de contrainte.",
      extreme:"Vous prenez le cou. Pas la bête — la bête ne se prend pas, on a établi ça il y a une heure. Le cou : douze pieds de long, une masse considérable au bout, et une colonne vertébrale qui n'est conçue pour encaisser la contrainte que dans un seul sens, comme toutes les colonnes vertébrales de toutes les choses vivantes depuis le début du monde. Vous n'avez pas besoin de force. Vous avez besoin du mauvais sens." },
    "§ Il n'y a pas de lumière, pas de bruit, rien à voir.",
    "La tête part de deux pieds sur le côté, dans une direction que rien dans son anatomie n'autorise, et le reste s'arrête.",
    { sobre:"Vous tombez au même moment.",
      intense:"Vous tombez au même moment qu'elle, ce que quatre-vingts personnes remarquent, et vous saignez du nez et des oreilles.",
      extreme:"Vous tombez au même moment qu'elle. Quatre-vingts personnes le remarquent, et deux d'entre elles en tireront la bonne conclusion des années plus tard : ça se paie, ça se paie sur le corps, et ça se paie tout de suite. Vous saignez du nez et des deux oreilles. Vous n'entendrez plus rien à gauche pendant onze jours, puis vous entendrez mal, puis ce sera comme ça." },
    "On vous relève. La chose est morte à quinze pas, la tête de travers, sans une plaie sur elle.",
    "§ Personne ne dira jamais qu'il a vu un homme lever la main. Ils diront tous qu'ils ont vu **la chose s'arrêter**, ce qui est infiniment plus difficile à démentir.",
  ],
  suite:'dr_apres', libelleSuite:"Le matin" },

dr_c2_cout:{
  melee:true,
  titre:"On l'a, et on le paie",
  effets:{ meleeMaj:{ position:"à terre", note:"mourante", tour:2 },
           flags:['dr_mortelle','dr_cout_2'],
           cout:{ endurance:26, vitalite:14 },
           blessure:{ id:'dr_jambe', zone:"jambe droite", type:"fracture ouverte", gravite:3, douleur:4,
                      saignement:2, fonction:['agilite','equitation','marche'],
                      traitement:null, cicatrice:"une claudication définitive par temps froid" },
           marque:"Elle est mortelle. Vous avez la jambe droite ouverte et vous boiterez jusqu'à la fin.",
           court:"La jambe droite" },
  texte:[
    "Ça porte. Ça porte et vous êtes dessous quand la masse descend.",
    { sobre:"La jambe droite.",
      intense:"Ce n'est pas un coup. C'est un appui : elle cherche à se redresser, elle pose, et ce qu'elle pose fait quatre tonnes sur trois pieds carrés.",
      extreme:"Ce n'est pas un coup et ce n'est pas une attaque : c'est un appui. Elle cherche simplement à se redresser, elle pose l'antérieur droit là où elle peut le poser, et ce qu'elle pose fait à peu près quatre tonnes réparties sur trois pieds carrés de glacis. Vous êtes sur ces trois pieds carrés. La jambe cède du fémur et sort par la cuisse, et vous voyez la chose avant de la sentir, ce qui laisse une seconde entière pour comprendre." },
    "§ On vous tire de là à trois, sous elle, pendant qu'elle est occupée à mourir.",
    "Elle met la nuit. Vous mettez onze semaines, et ce n'est pas fini au bout de onze semaines.",
    "Vous boiterez par temps froid jusqu'à la fin, ce qui vous fera penser à ce soir-là environ quatre mille fois.",
  ],
  suite:'dr_apres', libelleSuite:"Le matin" },

dr_c2_ko:{
  melee:true,
  titre:"Elle s'en va",
  effets:{ meleeMaj:{ position:"elle repart", note:"vivante", tour:2 },
           flags:['dr_partie','dr_vivante','dr_echec_2'],
           cout:{ endurance:22, moral:16 },
           marque:"Elle est repartie d'elle-même, quand elle a eu fini. Rien de ce qu'on a fait n'y a changé quoi que ce soit.",
           court:"Rien" },
  texte:[
    "Rien ne marche.",
    { sobre:"Elle s'en va quand elle a fini, pas quand on la chasse.",
      intense:"Elle repart d'elle-même, quand elle a eu ce qu'elle voulait, et pas une seconde avant. Rien de ce qu'on a fait n'a modifié quoi que ce soit à son horaire.",
      extreme:"Elle repart d'elle-même, quand elle a eu ce qu'elle était venue chercher, et pas une seconde plus tôt. C'est l'humiliation exacte de la soirée et elle mettra des années à passer : rien, absolument rien de ce qui a été bâti, prévu, répété et payé n'a modifié d'une minute l'horaire d'un animal qui ne savait même pas qu'on était là." },
    "§ Elle ouvre dans le champ derrière et elle part vers le nord, lourdement, en montant mal.",
    "Ce qui reste : le glacis brûlé sur soixante pas, une pièce détruite, l'enclos bas vide.",
    () => a('dr_evacue')
      ? "Et personne dans le bourg, parce qu'on l'avait vidé quatre semaines plus tôt sur une vache coupée en deux."
      : "Et le bourg, où l'on n'avait évacué personne.",
    "Elle reviendra dans onze ou douze jours. Il faudra recommencer, avec moins.",
  ],
  suite:'dr_apres', libelleSuite:"Le matin" },

/* ══ 4 · LE MATIN ═════════════════════════════════════════════════════════ */
dr_apres:{
  lieu:"Karlsberg · l'aube",
  titre:"Le matin",
  texte:[
    () => a('dr_mortelle')
      ? "Elle est morte sur le glacis, à quatre-vingts pas de la porte charretière, et elle occupe à peu près la surface du bourg."
      : "Elle est partie vers le nord. Le glacis est brûlé sur soixante pas et il y a du silence.",
    { sobre:"On ne sait pas quoi faire du matin.",
      intense:"Personne ne sait quoi faire du matin. C'est toujours comme ça et personne ne le raconte : il n'y a pas de joie, il y a des gens debout qui ne savent pas où se mettre.",
      extreme:"Personne ne sait quoi faire du matin. C'est toujours exactement comme ça après et aucun récit ne le dit jamais : il n'y a pas de joie, pas de cris, pas de bras levés. Il y a des gens debout, sales, qui ne savent pas où se mettre, qui recomptent, qui touchent des choses sans raison, et qui attendent que quelqu'un leur dise que c'est fini pour pouvoir s'asseoir." },
    () => {
      const p = preparation();
      if(p.length >= 6) return "§ Il y a eu, cette nuit, une muraille, des pièces, des hommes qui n'ont pas couru, des Nains qui savaient où frapper et un bourg vide. Rien de tout ça n'existait il y a trois ans. Rien de tout ça n'a été bâti pour un dragon.";
      if(p.length >= 3) return "§ Il y a eu ce qu'on avait. Ce n'était pas assez pour que ce soit facile, c'était assez pour que ce soit possible, et la différence entre les deux tient dans quatre ou cinq décisions prises des saisons plus tôt pour d'autres raisons.";
      return "§ Il n'y avait presque rien. On a fait avec presque rien, et le prix de « presque rien » se lit sur le glacis.";
    },
    () => a('dr_mortelle')
      ? "Un Nain de cent onze ans fait le tour du corps pendant trois heures, en silence, et prend des mesures. À la fin il dit six mots, qui sont : « Nous ne savions pas sa taille. »"
      : "On ne sait pas où elle est allée. Trois hameaux du nord le sauront avant l'hiver.",
    () => a('a2_enfant')
      ? "Loyse revient de ses quatorze lieues le surlendemain. Elle a onze mois, elle ne comprend rien à rien, et c'est reposant."
      : "",
    "§ Il faut décider ce qu'on en dit, parce que quatre-vingts personnes vont en parler et qu'elles en parleront dans le sens qu'on leur donne le premier jour.",
  ],
  choix:[
    { t:"Rien. On ne raconte rien.",
      detail:"quatre-vingts témoins raconteront de toute façon · mais pas avec vos mots",
      risque:"prudent", va:'dr_fin_rien' },

    { t:"Le dire entier, y compris l'Onde",
      si:() => a('a2_onde_publique') || a('dr_onde') || a('dr_onde_finale'),
      detail:"ils ont vu · autant que ce soit dit par vous, une fois, proprement",
      risque:"définitif", ferme:"Ferme : toute ambiguïté sur ce que vous êtes",
      definitif:true, va:'dr_fin_dire' },

    { t:"Faire porter la tête à Mont-Draken",
      si:() => a('dr_mortelle'),
      detail:"trois cent douze pièces au mur · il en manque une treizième de six pieds",
      risque:"calculé", va:'dr_fin_montdraken' },

    { t:"Donner le corps aux Nains",
      si:() => a('dr_mortelle') && (a('a2_maitre_oeuvre') || a('a2_nains_dehors')),
      detail:"ils ont vécu six cents ans au-dessus · c'est à eux que ça revient",
      risque:"calculé", va:'dr_fin_nains' },
  ],
},

dr_fin_rien:{
  titre:"Ce qu'on n'a pas dit",
  issue:"Fin de l'Acte II",
  bilan:"Une bête est descendue sur Karlsberg, et personne n'a raconté ce qui s'est passé.",
  texte:[
    "On ne raconte rien.",
    { sobre:"Ça ne marche pas comme ça.",
      intense:"Ça ne marche jamais comme ça. Quatre-vingts personnes ont vu ; elles racontent ; et une histoire qu'on ne raconte pas soi-même se raconte quand même, plus mal, et sans qu'on puisse la corriger.",
      extreme:"Ça ne marche jamais comme ça et vous le savez avant de le décider. Quatre-vingts personnes ont vu quelque chose ; elles vont le raconter, ce soir, à l'étape, à la foire, à leur belle-sœur ; et une histoire qu'on ne raconte pas soi-même se raconte de toute façon — en pire, sans ordre, avec les détails qui frappent au lieu des détails qui comptent, et sans que personne puisse plus jamais la corriger." },
    "§ En trois mois, il y a quatre versions. En un an, il y en a une seule, et ce n'est aucune des quatre.",
    "Elle dit qu'une bête est descendue sur Karlsberg et que Karlsberg tient toujours. C'est vrai, c'est court, et c'est infiniment plus efficace que tout ce que vous auriez pu faire dire.",
  ],
  apres:[
    "Vous n'avez rien déclaré, rien démenti, rien organisé.",
    "La province a fabriqué elle-même la seule phrase dont vous aviez besoin.",
  ],
  plusTard:"Quatre-vingts témoins, une seule version, et vous n'en avez écrit aucun mot.",
  suite:'a2_epilogue' },

dr_fin_dire:{
  titre:"Une fois, proprement",
  issue:"Fin de l'Acte II",
  bilan:"Vous avez dit vous-même, en une fois et devant témoins, ce que vous êtes.",
  texte:[
    "Vous le dites une fois, dans la cour, devant ceux qui étaient là, sans emphase et sans excuse.",
    { sobre:"Ce n'est pas un discours. C'est un procès-verbal.",
      intense:"Ce n'est pas un discours et surtout pas une révélation : c'est un procès-verbal. Ce qui s'est passé, dans l'ordre, y compris la partie que personne n'explique.",
      extreme:"Ce n'est pas un discours, ce n'est surtout pas une révélation, et il n'y a aucun effet de manche : c'est un procès-verbal. Ce qui s'est passé, dans l'ordre, avec les heures, y compris la partie que personne dans cette cour ne sait expliquer et que vous n'expliquez pas non plus, parce que vous ne l'expliquez pas mieux qu'eux." },
    "§ Personne ne bouge. Personne ne part. C'est ce que vous surveilliez et c'est ce qui compte.",
    () => a('a2_declare')
      ? "Le registre de la commission de Mont-Draken porte votre nom au folio un depuis deux ans. Ce que vous dites ce matin-là ne fait que le rendre public, et Charles avait dit que ça finirait comme ça."
      : "Il existe, à Mont-Draken, un registre neuf dans une armoire fermée à clef. Il est toujours vide.",
    "En onze jours, la province entière sait. Il n'y a plus de suspicion : il y a un fait, établi, daté, avec quatre-vingts témoins.",
    { sobre:"Un fait se traite autrement qu'une rumeur.",
      intense:"C'est beaucoup plus dangereux et beaucoup plus solide qu'une rumeur : une rumeur se creuse, un fait se traite. Les maisons qui ne peuvent pas traiter avec vous cessent d'écrire, et celles qui le peuvent écrivent enfin.",
      extreme:"C'est à la fois beaucoup plus dangereux et beaucoup plus solide qu'une rumeur, et personne dans ces provinces n'a jamais essayé. Une rumeur se creuse indéfiniment ; un fait se traite. Trois maisons cessent d'écrire dans le mois. Deux écrivent pour la première fois en cinq ans. Un commissaire aux titres ouvre un dossier et le referme au bout de six semaines faute de savoir sous quel chef l'instruire, parce qu'il n'existe aucun texte." },
  ],
  apres:[
    "Il n'y a plus rien à deviner. Ce que la province mettait dix ans à supposer, elle l'a su en onze jours, par vous.",
    "Ce qui vous cherche désormais n'a plus rien d'un commanditaire.",
  ],
  plusTard:"Il n'existe aucun texte sous lequel instruire ce que vous avez déclaré. On en écrira un.",
  suite:'a2_epilogue' },

dr_fin_montdraken:{
  qui:'charles',
  titre:"La treizième",
  issue:"Fin de l'Acte II",
  bilan:"La tête est au mur de Mont-Draken, étiquetée, avec trois noms sur l'étiquette.",
  texte:[
    "Il faut onze jours, quatre chariots et une grue de chantier pour porter une tête de six pieds à Mont-Draken.",
    { sobre:"Charles la reçoit sans un mot.",
      intense:"Charles de Mont-Draken reçoit la chose sans un mot, dans la cour d'exercice, devant deux cents élèves qui ont cessé de travailler pour la première fois depuis qu'on tient le registre de l'école.",
      extreme:"Charles de Mont-Draken reçoit la chose dans la cour d'exercice, sans un mot, devant deux cents élèves qui ont tous cessé de travailler en même temps — ce qui, d'après le registre de l'école, n'était jamais arrivé en trente et un ans. Il fait le tour du chariot deux fois. Il monte dessus. Il passe une demi-heure à examiner le pli du cou, et quand il redescend il a l'air d'un homme de soixante et un ans qui vient d'apprendre quelque chose." },
    "« Le pli », dit-il enfin.",
    "« Les Nains le savaient. »",
    "« Depuis six cents ans, j'imagine. » Il essuie ses mains. « Trente et un ans que je tiens ce mur, messire. Trois cent douze pièces. J'ai fait envoyer onze demandes écrites à Kar-Durak en trente ans, dont quatre sur les grandes espèces. »",
    "« Ils n'ont pas répondu. »",
    "« Ils ont répondu à chaque fois. » Il vous regarde. « *Nous ne discutons pas de ce qui est dessous avec ceux du dessus.* Onze fois la même phrase, en trente ans, mot pour mot. »",
    "§ Il écrit l'étiquette lui-même, comme toujours.",
    "*Trois cent treizième pièce. Marches Grises. Espèce non répertoriée. Le pli du cou, sous la mâchoire — renseignement nain.*",
    "Puis il ajoute trois noms dessous : le vôtre, celui du Nain, et celui d'Ambroise, sergent, quarante-trois ans, dont la file n'a pas couru.",
    "« Ce n'est pas un mur de trophées », dit-il en accrochant l'étiquette. « Ça n'a jamais été un mur de trophées. C'est un registre, et il vient d'apprendre quelque chose pour la première fois en onze ans. »",
  ],
  effets:{ flags:['dr_montdraken','a2_charles_allie','a2_montdraken_allie'],
           faire:() => retenir('charles', "il m'a apporté la treizième et il m'a donné le renseignement nain"),
           exploit:{ eclat:16, temoins:'province', quoi:"la trois cent treizième pièce du mur de Mont-Draken" } },
  apres:[
    "Le mur de Mont-Draken a une pièce de plus et trois noms de plus, dont un nain.",
    "Charles de Mont-Draken a soixante et un ans, un registre vide dans une armoire, et une raison de vous devoir quelque chose.",
  ],
  plusTard:"Onze demandes écrites en trente ans, onze fois la même réponse. Vous avez obtenu en une nuit ce qu'il cherchait depuis trente ans.",
  suite:'a2_epilogue' },

dr_fin_nains:{
  titre:"Ce qui revient à qui",
  issue:"Fin de l'Acte II",
  bilan:"Le corps est retourné sous la montagne, par la galerie qu'ils n'ouvrent pas.",
  texte:[
    "Le Nain ne demande rien. C'est vous qui proposez, et il met quatre jours à répondre, ce qui pour un Nain est une réponse immédiate.",
    { sobre:"« Nous la reprenons. »",
      intense:"« Nous la reprenons », dit-il. Et il ajoute quelque chose que le traducteur refuse d'abord de rendre, puis rend mal : « Elle était à nous par le dessous. »",
      extreme:"« Nous la reprenons », dit-il. Puis il ajoute une phrase que le traducteur refuse d'abord de rendre — il dit qu'elle ne se traduit pas, ce qui est faux, et qu'il finit par rendre mal parce qu'on insiste : « Elle était à nous par le dessous. » Ce n'est pas une revendication de propriété. C'est une case de registre, comme *ce qui est dessous*, et il n'y en a pas d'autre." },
    "§ Il faut deux mois, soixante Nains et une route entière refaite pour remonter quarante tonnes à la montagne.",
    "Ils ne la font pas entrer par la galerie haute, qui est aux mains des Peaux-Vertes.",
    "Ils rouvrent la onzième porte — celle qui est fermée depuis six cents ans, celle dont le plan porte un mot qui n'est pas un nom — et ils la font descendre par là, et ils la referment derrière.",
    "@« Vous rouvrez une porte que vous n'ouvrez pas. »",
    { sobre:"« Une fois. »",
      intense:"« Une fois », dit-il. « On la referme le soir même. Il y a un ordre des choses, messire, et il ne dit pas ce que vous croyez : il ne dit pas *ne pas savoir*. Il dit *remettre*. »",
      extreme:"« Une fois. On la referme le soir même, avec les mêmes pierres, dans le même ordre. » Il vous regarde de ses deux cent dix ans. « Vous croyez que notre règle est de ne pas savoir ce qu'il y a dessous. Ce n'est pas ça du tout, et c'est ce que les hommes ne comprennent jamais de nous. Nous savons parfaitement ce qu'il y a dessous : c'est écrit, c'est daté, c'est mesuré, et depuis avant-hier c'est même mesuré correctement. Notre règle, c'est de **remettre**. »" },
    "§ Vous n'avez pas la tête, vous n'avez pas de trophée, vous n'avez rien à montrer à personne.",
    "Vous avez soixante Nains qui vous doivent une porte rouverte et refermée, et une route de montagne entièrement refaite qui passe par votre vallée.",
  ],
  effets:{ flags:['dr_nains_rendu','a2_dette_naine','a2_maitre_oeuvre','a2_route_franche'],
           faire:() => { const C = CHANTIER(); C.pierre += 6; C.faveurs += 3; },
           exploit:{ eclat:12, temoins:'quelques', quoi:"la onzième porte rouverte un jour, et refermée le soir" } },
  apres:[
    "Il n'y a pas de trophée, pas de tête au mur, rien à montrer.",
    "Il y a une route de montagne refaite qui passe par votre vallée, et soixante Nains qui savent pourquoi.",
  ],
  plusTard:"« Notre règle, ce n'est pas de ne pas savoir. C'est de remettre. »",
  suite:'a2_epilogue' },

};

enregistrerScenes(DRAGON);

/* ── L'écran de préparation ────────────────────────────────────────────── */
DYN.dr_preparer = () => {
  const p = preparation();
  const manque = PREPARE.filter(x => !x.si());
  SCENES.dr_preparer = {
    dyn:true,
    lieu:"Karlsberg · quatre semaines",
    titre:"Ce qu'on a, et ce qu'on n'a pas",
    texte:[
      "Quatre semaines. On ne bâtit pas une muraille en quatre semaines et on ne forme pas quarante hommes : ce qu'on a, on l'a depuis des saisons, pour d'autres raisons, et c'est tout ce qu'on aura.",
      () => p.length
        ? "§ Ce qui est là :\n\n" + p.map(x => `**${x.quoi}** — ${x.note}`).join('\n\n')
        : "§ Il n'y a rien. Aucune des décisions de ces trois années n'a laissé quoi que ce soit d'utile ici, ce qui est un jugement dur et exact.",
      () => manque.length
        ? "Ce qui n'est pas là : " + manque.map(x => x.quoi.toLowerCase()).join(' · ') + ". Rien de tout ça ne s'obtient en quatre semaines."
        : "Il n'y a rien qui manque. C'est la seule fois de toute cette histoire où l'on peut écrire cette phrase.",
      () => {
        const f = forcePrep();
        if(f >= 14) return "§ Vous ne gagnerez pas facilement. Vous pouvez gagner, ce qui n'était pas vrai il y a trois ans et ne l'est vrai que grâce à des décisions dont aucune ne concernait un dragon.";
        if(f >= 7)  return "§ Ça peut se faire. Ça se paiera cher et ça peut se faire.";
        return "§ Il faut être clair : avec ça, on ne tue pas quarante tonnes. On peut au mieux la faire partir, et il faudra encaisser d'abord.";
      },
    ],
    suite:'dr_veille', libelleSuite:"La veille",
  };
  aller('dr_preparer');
};

/* Elle descend quand la montagne a assez lâché, et de toute façon avant la
 * fin de l'acte : c'est le dernier événement des Marches Grises. */
offrir({ id:'dr_signes', lieu:'karlsberg', va:'dr_signes',
         titre:"Ce qui ne correspond à rien",
         si:() => !a('dr_signes')
               && (crise('kardurak') >= 2 || A2().annee >= 2) });

entree2('dr_preparer');
