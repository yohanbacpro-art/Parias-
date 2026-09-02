/* PARIAS — Acte I · C02 · LE CHEVALIER SANS VISAGE
 * ═══════════════════════════════════════════════════════════════════════
 * Le verbe de cet arc est TRAQUER UN HOMME.
 *
 * Pas d'enquête sur une bête, pas de falaise, pas de couvée : un adversaire
 * qui pense, qui choisit, et qui a une raison. Ce que l'enquête découvre
 * n'améliore pas le combat — elle rend le combat de plus en plus difficile
 * à vouloir.
 *
 * Le commanditaire ne ment pas sur les faits. Il ment sur l'ordre : onze
 * hommes sont morts, et ils ne sont pas morts au hasard.
 * ═══════════════════════════════════════════════════════════════════════ */

const ARC_C02 = {

ro_audience:{
  lieu:"Côte des Dents · Rochebrune · salle d'armes",
  titre:"Onze",
  qui:'guichard',
  texte:[
    "Rochebrune est une maison de côte : basse, longue, bâtie contre le vent avec des murs de six pieds et des fenêtres qui font la largeur d'une main. On y reçoit dans la salle d'armes parce que c'est la seule pièce assez grande, et on y sent le sel, la graisse d'armure et le chien mouillé.",
    "Guichard de Rochebrune a cinquante-trois ans et l'air d'un homme qui a très bien dormi jusqu'à il y a deux ans.",
    "« Onze. En dix-huit mois. Toujours de nuit, toujours seuls ou à deux, toujours sur la lande entre la tour de guet et le bourg. »",
    { sobre:"« On leur prend le visage. »",
      intense:"« Et on leur prend le visage. » Il le dit vite, comme un homme qui a répété la phrase pour ne pas avoir à s'arrêter dessus. « Pas le crâne, pas la tête. Le visage. De la racine des cheveux au menton, en suivant l'os. »",
      extreme:"« Et on leur prend le visage. » Il le dit vite, comme un homme qui a répété la phrase pour ne pas s'arrêter dessus. « Pas la tête : le visage. De la racine des cheveux au menton, en suivant l'os, avec les paupières et les lèvres. On rend les corps. On ne rend jamais ça. »" },
    "« Un brigand ? »",
    "« Un cavalier. Grand cheval de guerre, harnois complet, heaume fermé. Il ne parle pas, il ne demande rien, il ne prend pas les bourses. Trois de mes hommes l'ont vu de loin et sont revenus. »",
    "§ Trois hommes l'ont vu et sont revenus. Il vient de vous dire une chose énorme et il ne sait pas laquelle.",
    "« Et son cheval rentre. »",
    "« Chaque aube. Il arrive à ma porte au petit jour, seul, sans cavalier, il attend qu'on le décharge et il repart. »",
    "« Qu'on le décharge de quoi ? »",
    { sobre:"Il ne répond pas tout de suite.",
      intense:"Il ne répond pas tout de suite, et un homme de cinquante-trois ans qui ne répond pas tout de suite à une question qu'il attendait depuis le début de l'entretien vous apprend beaucoup sur ce qu'il a décidé de ne pas dire.",
      extreme:"Il ne répond pas tout de suite, et un homme de cinquante-trois ans qui ne répond pas tout de suite à la question qu'il attendait depuis le début de l'entretien vous apprend en une seconde ce qu'il a décidé de ne pas dire — et qu'il va le dire quand même, parce qu'il vous paie quatre cents couronnes et qu'il n'a plus personne d'autre." },
    "« D'une sacoche. Dedans il y a le visage de la nuit. Tendu sur un cadre de noisetier, gratté, salé, séché. Comme une peau de parchemin. »",
    "« Il vous les rend. »",
    "« Il me les **envoie**, messire. Ce n'est pas la même chose. »",
    "Quatre cents couronnes. La coutume ancienne est due par la maison de Rochebrune, et il l'a écrit dans sa lettre sans qu'on le lui demande.",
  ],
  choix:[
    { t:"« Dans quel ordre ? »",
      si:() => !a('ro_q_ordre'),
      detail:"Onze morts en dix-huit mois ne sont pas onze morts au hasard · Intellect + tactique contre 9",
      risque:"favorable",
      test:{ carac:'intellect', comp:'tactique', dc:9, manoeuvre:'ordre' },
      degres:{ dominante:'ro_ordre_dom', nette:'ro_ordre_ok', echec:'ro_ordre_ko' } },
    { t:"« Trois hommes l'ont vu et sont revenus. Pourquoi ? »",
      si:() => !a('ro_gervais'),
      detail:"Un homme qui laisse partir des témoins n'est pas en train de se cacher",
      va:'ro_survivants' },
    { t:"Demander à voir les visages",
      si:() => !a('ro_visages'),
      detail:"Onze pièces de peau tendues sur des cadres · quelque part dans cette maison",
      risque:"dangereux", va:'ro_visages' },
    { t:"Fixer les termes maintenant",
      si:() => !a('ro_termes_fait'),
      detail:"Or · noble adulte consentante · les deux · négocier · refuser",
      va:'ro_termes' },
  ],
},

ro_ordre_dom:{
  qui:'guichard',
  texte:[
    "@« Vous avez leurs noms ? »",
    "« Bien sûr que j'ai leurs noms. »",
    "« Dans l'ordre où ils sont morts. Et à côté de chacun, où il servait il y a deux ans. »",
    { sobre:"Il faut une heure et le rôle de la garnison. Ça se voit tout de suite.",
      intense:"Il faut une heure, deux registres de solde et un homme d'écriture qui n'a pas envie d'être là. Et ça se voit tout de suite, dès la troisième ligne — de la manière dont se voient les choses qu'on n'a jamais regardées : d'un coup, et sans possibilité de ne plus les voir.",
      extreme:"Il faut une heure, deux registres de solde et un homme d'écriture qui n'a manifestement aucune envie d'être là. Ça se voit à la troisième ligne. De la manière dont se voient les choses qu'on n'a jamais regardées parce que personne n'avait eu l'idée de les mettre côte à côte : d'un seul coup, et sans possibilité de ne plus les voir ensuite." },
    "§ Les onze morts servaient tous dans la même patrouille. La même. Il y a deux ans et trois mois.",
    "Quatorze hommes, une nuit d'octobre, sur la lande entre la tour de guet et le bourg. Onze sont morts en dix-huit mois, un par un, dans l'ordre inverse de l'ancienneté.",
    "« Il en reste trois », dites-vous.",
    "Guichard de Rochebrune a le rôle de solde dans les mains et il ne le lâche pas. Il regarde les trois derniers noms de la liste de cette patrouille.",
    "Il y a le sien.",
    "« Messire », dit-il enfin, d'une voix qui n'est plus celle d'un seigneur qui embauche. « Est-ce que je peux vous demander de rester assis pendant que je vous dis quelque chose ? »",
  ],
  effets:{ flags:['ro_q_ordre','ro_sait_ordre','ro_sait_patrouille'],
           exploit:{ eclat:4, temoins:'un', quoi:"vous avez lu l'ordre des morts de Rochebrune" },
           marque:"Les onze morts servaient dans la même patrouille, une nuit d'octobre il y a deux ans.",
           court:"La patrouille" },
  suite:'ro_aveu', libelleSuite:"Rester assis" },

ro_ordre_ok:{
  qui:'guichard',
  texte:[
    "« Dans l'ordre ? Je ne sais pas. Ils sont morts, messire, c'est déjà beaucoup. »",
    "« Donnez-moi les noms et les dates. »",
    "Il les donne. Il y a onze noms, onze dates, et rien d'autre — pas de compagnie, pas d'ancienneté, pas d'affectation, parce qu'un rôle de solde est dans un autre coffre et qu'il faut une clef qu'il n'a pas sur lui.",
    { sobre:"Sept sur onze avaient plus de quarante ans. C'est beaucoup pour une garnison de côte.",
      intense:"Une chose se voit quand même, à la troisième lecture : sept sur onze avaient plus de quarante ans. Dans une garnison de côte où l'on prend des garçons de seize ans et où l'on meurt de la mer, sept vétérans sur onze morts, ce n'est pas une proportion : c'est un choix.",
      extreme:"Une chose se voit à la troisième lecture : sept sur onze avaient plus de quarante ans. Dans une garnison de côte où l'on prend des garçons de seize ans, où l'on perd des hommes à la mer et jamais à la lande, sept vétérans sur onze morts n'est pas une proportion. C'est un choix, et quelqu'un l'a fait onze fois de suite." },
    "§ Il ne tue pas des soldats. Il tue des anciens.",
    "« Il vous faudra ce rôle de solde », dites-vous.",
    "« Il est à Rochebrune-la-Basse. Trois jours. »",
    "Vous n'avez pas trois jours et il le sait.",
  ],
  effets:{ flags:['ro_q_ordre','ro_sait_anciens'],
           marque:"Sept des onze morts avaient plus de quarante ans. Il tue des anciens.",
           court:"Des anciens" },
  suite:'ro_audience', libelleSuite:"Autre chose" },

ro_ordre_ko:{
  qui:'guichard',
  texte:[
    "@« Dans quel ordre ? »",
    "« Dans l'ordre où on les a trouvés, messire. Je ne tiens pas un livre de comptes de mes morts. »",
    "C'est faux — toutes les maisons tiennent un livre de comptes de leurs morts, ne serait-ce que pour les soldes — et le fait qu'il choisisse ce mensonge-là plutôt qu'un autre est en soi un renseignement.",
    "§ Sauf que vous ne savez pas encore quoi en faire, et qu'un renseignement dont on ne sait rien faire n'est qu'une gêne.",
    "« Onze hommes, messire. C'est tout ce qu'il y a à savoir. Trouvez-le et tuez-le. »",
  ],
  effets:{ flags:['ro_q_ordre'], cout:{ moral:2 } },
  suite:'ro_audience', libelleSuite:"Autre chose" },

ro_aveu:{
  qui:'guichard',
  titre:"Une nuit d'octobre",
  texte:[
    "Il fait sortir l'homme d'écriture. Il ferme la porte lui-même, ce qu'un seigneur ne fait jamais, et il reste debout dessus.",
    "« Il y a deux ans et trois mois, quatorze de mes hommes ont ramené un chevalier blessé de la lande. Un chevalier d'une maison de l'intérieur, jeté à la côte par une tempête, à demi noyé, avec une jambe cassée. Ser Aldren. Il a passé six semaines ici. »",
    "« Et ? »",
    { sobre:"« Et une nuit d'octobre, il est reparti. Sans son visage. »",
      intense:"« Et une nuit d'octobre, il est reparti sur la lande, à cheval, sans son visage. Ma patrouille l'a escorté jusqu'à la borne, comme on escorte un hôte. Quatorze hommes. Ils sont revenus à quatorze. »",
      extreme:"« Et une nuit d'octobre, il est reparti sur la lande, à cheval, la figure enveloppée dans un linge, et ma patrouille l'a escorté jusqu'à la borne comme on escorte un hôte de qualité. Quatorze hommes sont partis. Quatorze sont revenus. Et le lendemain matin, on a lavé le sol de la chambre haute, et personne — personne, messire — n'a demandé pourquoi il y avait à laver. »" },
    "« Qui lui a pris le visage ? »",
    "Silence.",
    "@« Vous ne me paierez pas quatre cents couronnes pour tuer un homme dont vous refusez de me dire pourquoi il tue. »",
    "« Si. C'est exactement ce que je vais faire. »",
    "§ Il a raison, et vous le savez tous les deux, et c'est la partie du métier dont on ne parle pas au moment de signer.",
    "« Vous êtes le douzième nom sur cette liste. »",
    "« Le treizième », dit Guichard de Rochebrune. « Il y en a un avant moi. C'est le mari de ma sœur, il a quarante ans, il est aimé de tout le monde dans cette maison et je le vois tous les jours à ma table. »",
    "Il ouvre la porte.",
    "« Trouvez Ser Aldren. Tuez-le. Et si vous êtes un homme d'honneur, messire, je vous conseille très sincèrement de ne pas chercher à savoir ce qui s'est passé dans ma chambre haute. »",
  ],
  effets:{ flags:['ro_sait_aldren','ro_sait_beaufrere'], suspicion:2,
           exploit:{ eclat:3, temoins:'un', quoi:"vous avez fait avouer Rochebrune" },
           marque:"Ser Aldren a été défiguré dans la chambre haute de Rochebrune, et quatorze hommes l'ont escorté dehors.",
           court:"La chambre haute" },
  suite:'ro_audience', libelleSuite:"Continuer" },

};

/* ══ L'ENQUÊTE ════════════════════════════════════════════════════════════ */
const ARC_C02_2 = {

ro_survivants:{
  qui:'gervais',
  texte:[
    "Sur les trois qui l'ont vu et sont revenus, deux ont quitté la province. Le troisième a dix-neuf ans, il s'appelle Gervais, et il n'a pas quitté la province parce qu'il n'a nulle part où aller.",
    "On le trouve à l'écurie. Il n'est plus de garde depuis quatre mois : on l'a mis aux chevaux, ce qui dans une maison de côte est une façon polie de dire qu'on ne lui fait plus confiance.",
    "« Ils croient que je me suis couché », dit-il tout de suite, avant même qu'on demande. « Que j'ai fait le mort. »",
    "« Et ? »",
    "« J'ai fait le mort. »",
    { sobre:"Il tient un licol dans les mains et il ne le repose pas de tout l'entretien.",
      intense:"Il tient un licol dans les mains pendant tout l'entretien et il ne le repose pas une fois. C'est un garçon de dix-neuf ans qui a passé quatre mois à répéter une histoire qu'il ne raconte pas, et il va la raconter à un inconnu parce que c'est comme ça que ça marche.",
      extreme:"Il tient un licol pendant tout l'entretien et ne le repose pas une seule fois ; il le retourne, le plie, le replie. Un garçon de dix-neuf ans qui a passé quatre mois à répéter dans sa tête une histoire qu'il n'a racontée à personne, et qui va la raconter à un inconnu de passage, parce que c'est toujours comme ça que ça marche et que les maisons ne le savent jamais." },
    "« Il est descendu de cheval. Ça, personne ne le croit non plus. Un cavalier qui descend de cheval au milieu de la lande, la nuit, devant deux hommes armés. »",
    "« Qu'est-ce qu'il a fait ? »",
    "« Il m'a demandé mon âge. »",
    "§ Un heaume fermé, une voix qui sort de là-dedans, et une question sur un âge.",
    "« J'ai dit dix-neuf. Il a dit : *et il y a deux ans ?* J'ai dit dix-sept. Il est resté un moment sans rien dire. Puis il a dit : *tu n'y étais pas.* Et il est remonté à cheval. »",
    "« Et Perrin ? » — l'autre homme de la patrouille, celui qui n'est pas revenu.",
    "« Perrin avait quarante-quatre ans. »",
    "Il repose enfin le licol.",
    "« Il ne m'a pas épargné, messire. Il m'a **vérifié**. »",
  ],
  effets:{ flags:['ro_gervais','ro_sait_verifie','ro_sait_anciens'],
           exploit:{ eclat:3, temoins:'un', quoi:"vous avez écouté un garçon que personne n'écoutait" },
           marque:"Ser Aldren vérifie l'âge de ses victimes avant de les tuer. Il ne tue pas au hasard.",
           court:"Il vérifie" },
  suite:'ro_audience', libelleSuite:"Revenir" },

ro_visages:{
  texte:[
    "Ils sont dans la chapelle. C'est le seul endroit de la maison où Guichard de Rochebrune a jugé décent de les mettre, et c'est aussi le seul où personne ne va plus.",
    "Onze cadres de noisetier, appuyés contre le mur derrière l'autel, tournés face à la pierre.",
    { sobre:"On les retourne un par un. C'est un travail qu'il faut faire.",
      intense:"On les retourne un par un, et c'est un travail qu'il faut faire parce que personne d'autre ne le fera. Ils sont préparés comme on prépare une peau : grattés à l'intérieur, salés, tendus sur le cadre par de petites chevilles de bois régulièrement espacées. C'est propre. C'est même beau, de la beauté qu'a n'importe quel objet fait avec soin, et c'est ça qui est insupportable.",
      extreme:"On les retourne un par un et c'est un travail qu'il faut faire parce que personne d'autre ne le fera. Grattés à l'intérieur, salés, tendus sur le cadre par de petites chevilles de bois également espacées — quatorze chevilles par cadre, comptées, toujours quatorze. C'est propre, régulier, patient. C'est même beau de la beauté qu'a n'importe quel objet fait avec soin. Les paupières sont là. Les lèvres aussi. On reconnaît les hommes." },
    "§ Quatorze chevilles par cadre. Toujours quatorze. Il y en avait quatorze cette nuit-là.",
    "Sur le revers du bois de chaque cadre, au couteau, un chiffre. Onze cadres, onze chiffres — et ils ne vont pas de un à onze.",
    "Ils vont de quatorze à quatre.",
    "« Il compte à l'envers », dit une voix derrière vous.",
    "Une femme de vingt-six ans en robe de deuil se tient à l'entrée de la chapelle, et elle a manifestement l'habitude d'y venir seule.",
    "« Il en reste trois, messire. Quatre, trois, deux, un — non : trois, deux, un. Il a déjà pris le quatre au printemps. »",
    "« Et vous savez qui sont les trois. »",
    "« Je sais qui est le numéro un. J'avais quinze ans et j'étais dans le couloir. »",
  ],
  effets:{ flags:['ro_visages','ro_sait_ordre','ro_sait_chiffres'], cout:{ moral:8 },
           marque:"Onze cadres de noisetier, numérotés de quatorze à quatre. Il compte à l'envers.",
           court:"Quatorze à quatre" },
  suite:'ro_ermengarde', libelleSuite:"L'écouter" },

ro_ermengarde:{
  qui:'ermengarde',
  titre:"Le couloir",
  texte:[
    "Ermengarde de Rochebrune a vingt-six ans, elle est veuve depuis trois — un mariage de côte, un mari noyé, aucune romance à en tirer — et elle est la seule personne de cette maison qui entre encore dans la chapelle.",
    "« Ils vous ont dit qu'il était reparti une nuit d'octobre. »",
    "« On m'a dit qu'il était reparti sans son visage. »",
    "« C'est déjà plus que ce que mon père dit d'habitude. »",
    "Elle s'assied sur le banc de pierre, à côté des onze cadres retournés, comme quelqu'un qui s'assied à côté de gens qu'il connaît.",
    { sobre:"« J'avais quinze ans. Ma chambre donnait sur le couloir de la chambre haute. »",
      intense:"« J'avais quinze ans et ma chambre donnait sur le couloir de la chambre haute. Ce n'est pas une confidence, messire, c'est un plan de bâtiment : n'importe qui dans cette maison peut vous le dire, et personne ne s'est jamais demandé ce que ça voulait dire que j'aie quinze ans et une chambre là. »",
      extreme:"« J'avais quinze ans et ma chambre donnait sur le couloir de la chambre haute. Ce n'est pas une confidence : c'est un plan de bâtiment. N'importe qui ici peut vous le dire, et en deux ans pas une seule personne ne s'est demandé ce que ça voulait dire — qu'une fille de quinze ans dorme à onze pieds d'une porte derrière laquelle on a fait ce qu'on a fait, pendant tout le temps que ça a duré, et que ça a duré. »" },
    "« Combien de temps ? »",
    "« Une nuit entière. »",
    "Elle dit ça sans effet, en regardant les cadres.",
    "§ « Il n'a pas crié. C'est la chose dont je ne me suis jamais remise. Il n'a pas crié une seule fois, et j'ai su à ce moment-là qu'il en sortirait vivant. »",
    "@« Qui ? »",
    "« Ser Baudoin d'Escaut. Le mari de ma tante. Il a quarante ans, il est aimé de toute cette maison, il m'a appris à monter à cheval et il m'apporte des oranges à la Saint-Marc. »",
    "Un temps.",
    "« Ils étaient quatre dans la chambre et quatorze dans le couloir. Les quatre ont fait, les quatorze ont regardé, et tout le monde ici sait que ça a eu lieu et personne ne sait le dire à voix haute — moi comprise, messire, jusqu'à il y a quatre minutes. »",
    "« Pourquoi ? »",
    "« Pourquoi ils l'ont fait, ou pourquoi personne ne le dit ? »",
    "« Les deux. »",
    "« Pour la première, je ne sais pas et je crois qu'il n'y a rien à savoir. Ser Aldren avait été mieux reçu que Baudoin ne le supportait, il était plus jeune, il était plus beau, et il repartait. »",
    "Elle se lève.",
    "« Pour la seconde, c'est plus simple : parce qu'un homme aimé ne fait pas ça, donc il ne l'a pas fait. C'est comme ça que les maisons tiennent. »",
  ],
  effets:{ flags:['ro_ermengarde','ro_sait_baudoin','ro_sait_quatre'], cout:{ moral:6 },
           exploit:{ eclat:4, temoins:'un', quoi:"quelqu'un vous a dit à voix haute ce que toute une maison tait" },
           marque:"Ser Baudoin d'Escaut a défiguré Aldren une nuit entière. Quatorze hommes ont regardé.",
           court:"Baudoin" },
  suite:'ro_audience', libelleSuite:"Revenir" },

/* ── Les termes ──────────────────────────────────────────────────────────── */
ro_termes:{
  qui:'guichard',
  titre:"Ce que Rochebrune doit",
  texte:[
    "« Vous avez écrit les cinq mots dans votre lettre », dites-vous. « *Et honorera la coutume ancienne.* »",
    "« Je les ai écrits. »",
    "« Alors on fixe les termes maintenant, avant que je monte sur la lande. C'est la règle et elle protège tout le monde, à commencer par vous. »",
    { sobre:"Il n'aime pas ça. Personne n'aime ça. C'est fait pour.",
      intense:"Il n'aime pas ça. Personne n'aime ça, jamais, et c'est très exactement l'objet de la règle : une maison qui doit le Prix doit le regarder en face à jour, à froid, avant qu'il y ait un mort et une dette et un homme épuisé dans une salle d'armes.",
      extreme:"Il n'aime pas ça. Personne n'aime ça, et c'est l'objet de la règle : une maison qui doit le Prix le regarde en face à froid, avant qu'il y ait un mort, une dette, un homme épuisé et quarante raisons de tordre les mots. Ce qui se négocie après une victoire ne se négocie pas — ça se subit, dans un sens ou dans l'autre." },
    "« Quatre cents couronnes. Et pour l'autre moitié : ma fille est veuve, elle a vingt-six ans, elle décide seule et elle a déjà refusé deux maisons de la côte. Je ne parlerai pas pour elle et je ne lui demanderai rien. »",
    "« Bien. »",
    "« Ce n'est pas de la vertu, messire. C'est que je n'ai plus les moyens de perdre le peu qu'elle m'accorde encore. »",
  ],
  choix:[
    { t:"L'or seul",
      detail:"Quatre cents couronnes · et rien d'autre n'est demandé",
      ferme:"Ferme : ce que la coutume vous ouvrait ici",
      definitif:true, va:'ro_or_seul' },
    { t:"Demander à parler à Ermengarde de Rochebrune",
      detail:"À elle · pas à son père · et elle répond ce qu'elle veut",
      va:'ro_demande' },
    { t:"L'or, et on verra après",
      si:() => !a('ro_recadre'),
      detail:"Repousser la question · un Prix qu'on ne fixe pas devient un Prix qu'on prend",
      risque:"dangereux", va:'ro_apres' },
  ],
},

ro_or_seul:{
  qui:'guichard',
  texte:[
    "@« L'or. Rien d'autre. »",
    "Guichard de Rochebrune vous regarde comme s'il n'avait pas entendu, puis il comprend qu'il a entendu.",
    { sobre:"« Vous savez que ça se remarque. »",
      intense:"« Vous savez que ça se remarque, messire ? Un Paria qui ne réclame pas la coutume. Dans les maisons du nord ça fait une histoire, et les histoires arrivent avant les hommes. »",
      extreme:"« Vous savez que ça se remarque ? Un Paria qui ne réclame pas la coutume. Dans les maisons du nord ça fait une histoire, et les histoires arrivent toujours avant les hommes. On dira que vous êtes honorable, ce qui est charmant, ou que vous avez quelque chose à cacher, ce qui est plus intéressant — et il se trouve toujours quelqu'un pour préférer la version intéressante. »" },
    "« Quatre cents couronnes, messire. Et mon estime, dont vous ferez ce que vous voudrez : elle n'a pas cours sur la côte. »",
    "§ Il ne se trompe pas. C'est ça qui est agaçant.",
  ],
  effets:{ flags:['ro_termes_fait','ro_or_seul'], suspicion:3,
           marque:"Vous n'avez pas réclamé la coutume à Rochebrune.", court:"L'or seul" },
  suite:'ro_audience', libelleSuite:"Continuer" },

ro_apres:{
  qui:'guichard',
  texte:[
    "@« On verra après. »",
    "« Non », dit Guichard de Rochebrune, et c'est la première fois qu'il dit non de tout l'entretien. « On ne verra pas après. »",
    { sobre:"« Après, il y aura un mort et une dette. »",
      intense:"« Après, messire, il y aura un mort, une dette, un homme couvert de sang dans ma salle d'armes et une maison qui vous doit tout. Vous savez très bien ce qui se passe dans ces cas-là. Moi aussi : j'ai cinquante-trois ans et j'ai vu ça deux fois. »",
      extreme:"« Après, il y aura un mort, une dette, un homme couvert de sang dans ma salle d'armes et une maison qui lui doit tout. Vous savez ce qui se passe dans ces cas-là, et moi aussi : j'ai cinquante-trois ans, j'ai vu ça deux fois, et les deux fois la femme a dit oui parce qu'il n'y avait plus aucune manière de dire non. »" },
    "« Ce n'est pas ce que je demande. »",
    "« C'est ce que vous obtiendrez. La coutume protège les Parias, messire. Ce sont les termes fixés d'avance qui protègent les autres. »",
    "§ Il a raison sur toute la ligne et il vient de vous l'apprendre, ce qui est humiliant et utile.",
    "« Alors : l'or, ou vous parlez à ma fille. Choisissez maintenant. »",
  ],
  effets:{ flags:['ro_recadre'], cout:{ moral:3 },
           marque:"Rochebrune a refusé de repousser les termes. C'est lui qui avait raison.", court:"Recadré" },
  suite:'ro_termes', libelleSuite:"Choisir" },

ro_demande:{
  qui:'ermengarde',
  titre:"À elle",
  texte:[
    "Elle vous reçoit dans le cellier, debout, parce qu'il n'y a pas d'autre pièce de cette maison où l'on puisse parler sans que six personnes écoutent.",
    "« Mon père vous a dit que je décidais seule. »",
    "« Oui. »",
    "« Il le dit toujours. C'est vrai depuis trois ans et c'est vrai parce que je le lui ai fait payer très cher une fois. »",
    { sobre:"Elle attend. Elle ne va pas vous aider à formuler.",
      intense:"Elle attend, les bras croisés, et elle ne va pas vous aider à formuler — ce qui est parfaitement son droit et ce qui rend les trois phrases suivantes exactement aussi difficiles qu'elles doivent l'être.",
      extreme:"Elle attend, les bras croisés, et elle n'a aucune intention de vous aider à formuler. C'est son droit entier, et ça rend les trois phrases suivantes exactement aussi difficiles qu'elles doivent l'être — ce qui est, si l'on y réfléchit, tout ce que la règle demande." },
    "Vous le dites simplement : la coutume, ce qu'elle est, ce qu'elle n'est pas, qu'elle se refuse sans conséquence et que le contrat tient de toute façon.",
    "« Je sais ce qu'est la coutume, messire. Ma tante m'a fait la leçon quand j'avais douze ans, avec des mots effrayants, et c'est la seule leçon de cette maison dont j'aie vérifié la véracité toute seule. »",
    "Elle décroise les bras.",
    "« La réponse est oui. Et je vais vous dire pourquoi, parce que vous n'allez pas aimer. »",
    "« Dites. »",
    "« Parce que dans neuf jours vous allez monter sur cette lande tuer un homme à qui mon oncle a arraché le visage pendant que quatorze personnes regardaient et que j'écoutais. »",
    "§ « Et si vous le tuez, cette maison sera lavée. Et si cette maison est lavée, Ser Baudoin d'Escaut m'apportera encore des oranges à la Saint-Marc pendant vingt ans. »",
    "« Ce n'est pas une raison de dire oui. »",
    "« C'est la mienne. Je veux quelque chose que cette maison ne contrôle pas, et il se trouve que la coutume ancienne est la seule chose au monde que mon père ne peut ni refuser, ni négocier, ni raconter à sa sœur. »",
    "Elle vous regarde bien en face.",
    "« Vous n'êtes pas obligé d'accepter non plus, messire. C'est réciproque, cette affaire-là, et personne ne le dit jamais. »",
  ],
  choix:[
    { t:"Accepter les termes",
      detail:"L'or et la coutume · fixés avant tout, par elle, pour ses raisons",
      definitif:true, va:'ro_accord' },
    { t:"« Alors non. Pas comme ça. »",
      detail:"Refuser un oui qui sert à autre chose · elle peut très mal le prendre",
      risque:"définitif", definitif:true, va:'ro_refus' },
  ],
},

ro_accord:{
  qui:'ermengarde',
  texte:[
    "@« Alors c'est dit. »",
    "« C'est dit. » Elle ajoute, sans changer de ton : « Après. Pas avant. Je ne veux pas de la version où vous montez sur cette lande en me devant quelque chose. »",
    "§ Elle vient d'appliquer la règle mieux que vous. C'est fréquent et ça ne s'améliore pas avec l'âge.",
    "Elle décroche une clef de sa ceinture et la pose sur un tonneau.",
    "« Le cellier. Il y a une porte sur la cour des cuisines qui ne grince pas. Je ne vous demande pas d'être discret pour moi : je m'en moque. Je vous le demande pour la fille de dix-neuf ans qui dort au-dessus et qui n'a pas à apprendre ce genre de choses en une nuit. »",
  ],
  effets:{ flags:['ro_termes_fait','ro_coutume','ro_ermengarde_accord'],
           marque:"Ermengarde de Rochebrune a accepté les termes, pour ses propres raisons.",
           court:"Les termes" },
  suite:'ro_audience', libelleSuite:"Continuer" },

ro_refus:{
  qui:'ermengarde',
  texte:[
    "@« Non. Pas comme ça. »",
    "Elle ne bouge pas d'un pouce.",
    "« Développez. »",
    "« Vous ne dites pas oui à moi. Vous dites non à votre père et à votre tante, et je suis l'instrument. Je ne suis pas contre être un instrument, ça m'est arrivé souvent — mais pas de cet instrument-là. »",
    { sobre:"Un long silence.",
      intense:"Un long silence dans un cellier qui sent la pomme et la saumure, et une femme de vingt-six ans qui décide, en temps réel, si elle est insultée ou pas.",
      extreme:"Un long silence dans un cellier qui sent la pomme et la saumure. Une femme de vingt-six ans décide devant vous, en temps réel, si ce qu'on vient de lui dire est une délicatesse ou l'insulte la plus complète qu'on lui ait faite depuis trois ans — et les deux lectures sont défendables, et elle le sait, ce qui n'aide personne." },
    "« Vous venez de m'expliquer mes propres raisons, messire. »",
    "« Oui. »",
    "« C'est le genre de chose que fait mon père. »",
    "§ Elle a raison. On croit toujours protéger quelqu'un et on est en train de décider à sa place.",
    "« Alors ce sera l'or », dit-elle enfin. « Et je vous dirai une chose gratuitement, parce que vous m'avez agacée et que ça me met de bonne humeur : Ser Baudoin d'Escaut sera à la tour de guet vendredi. Il y va tous les quinze jours. Seul. »",
    "« Pourquoi seul ? »",
    "« Parce qu'il attend Ser Aldren depuis deux ans, messire, et qu'il n'a pas envie de témoins non plus. »",
  ],
  effets:{ flags:['ro_termes_fait','ro_or_seul','ro_ermengarde_froid','ro_sait_vendredi'],
           marque:"Vous avez refusé le oui d'Ermengarde. Elle vous a donné Baudoin à la place.",
           court:"Vendredi" },
  suite:'ro_audience', libelleSuite:"Continuer" },

};
Object.assign(ARC_C02, ARC_C02_2);

/* ══ LA TRAQUE ════════════════════════════════════════════════════════════ */
const ARC_C02_3 = {

ro_traque:{
  lieu:"La lande, entre la tour de guet et le bourg",
  titre:"Trois façons de trouver un homme",
  texte:[
    "La lande de la Côte des Dents fait quatre lieues sur deux : de l'ajonc à hauteur de hanche, du granite affleurant, et un vent qui vient de l'ouest tous les jours de l'année sans exception.",
    "On n'y traque pas quelqu'un. Il n'y a rien à lire — l'ajonc se referme, le granite ne prend pas l'empreinte, et la pluie de côte efface une piste en deux heures.",
    "§ Ce qui veut dire qu'on ne le trouvera pas. Il faut qu'il vienne.",
    "Il y a trois façons de faire venir un homme, et vous les connaissez toutes les trois pour les avoir subies.",
  ],
  choix:[
    { t:"Suivre le cheval",
      si:() => !a('ro_vu'),
      detail:"Il rentre à l'aube et il repart · Perception + furtivité contre 10",
      risque:"prudent",
      test:{ carac:'perception', comp:'furtivite', dc:10, manoeuvre:'cheval' },
      degres:{ dominante:'ro_cheval_dom', nette:'ro_cheval_ok', echec:'ro_cheval_ko' } },
    { t:"La tour de guet, vendredi",
      si:() => a('ro_sait_vendredi'),
      detail:"Ser Baudoin y monte seul tous les quinze jours · il attend quelqu'un lui aussi",
      va:'ro_tour' },
    { t:"Fouiller la lande, quadrant par quadrant",
      detail:"Quatre lieues sur deux · de l'ajonc à hauteur de hanche · six jours",
      risque:"prudent", va:'ro_fouille' },
    { t:"Se faire appât",
      si:() => !a('ro_appat_rate'),
      detail:"Un homme seul sur la lande, de nuit, qui a l'air d'avoir quarante ans · Présence contre 9",
      risque:"dangereux",
      test:{ carac:'presence', comp:'furtivite', dc:9, manoeuvre:'appat' },
      degres:{ dominante:'ro_appat_dom', nette:'ro_appat_dom', echec:'ro_appat_ko' } },
  ],
},

ro_cheval_dom:{
  texte:[
    "Le cheval arrive à la porte de Rochebrune au petit jour, comme les onze fois précédentes : au pas, seul, la sacoche gauche pleine.",
    { sobre:"On le décharge. Il attend. Puis il repart, et vous partez avec.",
      intense:"On le décharge — un valet qui a fait ça onze fois et qui ne regarde plus ce qu'il sort. Le cheval attend, immobile, la tête basse, avec la patience d'un animal qui a été très bien dressé par quelqu'un qui avait le temps. Puis il repart, au pas, dans l'ouest.",
      extreme:"On le décharge. Le valet a fait ça onze fois et il ne regarde plus ce qu'il sort du cuir : il le prend à deux doigts, il le pose dans un panier, il s'essuie la main sur sa cuisse. Le cheval attend, tête basse, avec la patience d'un animal dressé par quelqu'un qui avait beaucoup de temps. Puis il repart au pas, vers l'ouest, sur une piste qu'il connaît par cœur." },
    "Il fait onze milles. Vous les faites derrière lui, à quatre cents pas, à pied, dans l'ajonc, parce qu'un cheval qui entend un cheval change de chemin.",
    "§ Onze milles, et il ne se retourne jamais. Aucun animal ne fait ça. Celui-ci le fait parce qu'on le lui a appris.",
    "Au bout des onze milles, il y a un corps de garde abandonné. Trois murs, un toit de goémon refait à la main, et une cheminée qui ne fume pas — on n'allume pas de feu quand on se cache, on gèle.",
    "Le cheval entre dans le corps de garde comme on rentre chez soi.",
  ],
  effets:{ flags:['ro_repaire','ro_discret'], cout:{ endurance:14 },
           exploit:{ eclat:5, temoins:'aucun', quoi:"vous avez suivi le cheval sur onze milles sans être vu" },
           marque:"Le corps de garde abandonné, onze milles à l'ouest. Il y vit.", court:"Le corps de garde" },
  suite:'ro_aldren', libelleSuite:"Entrer" },

ro_fouille:{
  texte:[
    "Il n'y a pas d'astuce. Il y a quatre lieues sur deux, de l'ajonc à hauteur de hanche, et six jours.",
    { sobre:"On coupe la lande en bandes et on les fait une par une.",
      intense:"On coupe la lande en bandes de deux cents pas et on les fait une par une, d'est en ouest, en marchant. C'est ce que font les gens qui cherchent un noyé et c'est la seule méthode au monde qui fonctionne toujours, à condition d'accepter qu'elle coûte exactement ce qu'elle coûte.",
      extreme:"On coupe la lande en bandes de deux cents pas et on les fait une par une, d'est en ouest, en marchant. C'est la méthode des gens qui cherchent un noyé : elle fonctionne toujours, à condition d'accepter le prix. Six jours. L'ajonc ouvre les jambes jusqu'aux genoux dès le premier et ne s'arrête plus, le vent d'ouest ne tombe jamais, et la nuit on dort dans un creux de granite en se disant qu'il est peut-être à deux cents pas." },
    "§ Au sixième jour, dans la dernière bande, il y a un corps de garde abandonné.",
    "Trois murs, un toit de goémon refait à la main, une cheminée qui ne fume pas. Un cheval de guerre attaché sous l'auvent, qui lève la tête et qui ne s'affole pas.",
    "Il vous a vu venir depuis quatre cents pas. Il a eu tout le temps de partir et il est là.",
  ],
  effets:{ flags:['ro_repaire','ro_fouille'], cout:{ endurance:26 },
           blessure:{ id:'jambes', zone:"Jambes", type:"ouvertes par l'ajonc, six jours",
                      gravite:1, douleur:1, saignement:0, fonction:['endurance'],
                      cicatrice:"des marbrures fines sur les tibias" },
           marque:"Six jours de lande, bande par bande, pour trouver un corps de garde.", court:"Six jours" },
  suite:'ro_aldren', libelleSuite:"Entrer" },

ro_cheval_ok:{
  texte:[
    "Vous suivez le cheval sept milles avant qu'il ne vous entende.",
    "Il ne s'affole pas : il s'arrête, il tourne la tête, il vous regarde pendant un temps considérable, et il repart — dans une autre direction que celle qu'il avait prise.",
    { sobre:"Vous perdez la journée. Vous gagnez un quart de lande.",
      intense:"Vous perdez la journée et vous gagnez un quart de lande : quoi qu'il y ait au bout, c'est à l'ouest, à moins de douze milles, et du côté de la mer. Sur quatre lieues sur deux, ça se cherche en deux jours.",
      extreme:"Vous perdez la journée et vous gagnez un quart de lande : c'est à l'ouest, à moins de douze milles, du côté de la mer. Sur quatre lieues sur deux, ça se fouille en deux jours de marche dans de l'ajonc à hauteur de hanche, avec les jambes ouvertes jusqu'au sang par les épines et le vent d'ouest dans la figure du matin au soir." },
    "Deux jours plus tard, vous trouvez le corps de garde abandonné. Trois murs, un toit de goémon, une cheminée qui ne fume pas.",
    "§ Il vous a entendu venir de très loin. C'est un homme qui vit seul sur une lande depuis deux ans.",
  ],
  effets:{ flags:['ro_repaire'], cout:{ endurance:22 },
           marque:"Vous avez trouvé le corps de garde, et il vous a entendu venir.", court:"Le corps de garde" },
  suite:'ro_aldren', libelleSuite:"Entrer" },

ro_cheval_ko:{
  texte:[
    "Le cheval vous repère au troisième mille et il fait une chose que vous n'avez jamais vu faire à un cheval : il revient sur ses pas.",
    "Pas au galop. Au pas, droit sur vous, jusqu'à trois toises, et il s'arrête.",
    { sobre:"Il vous regarde. Longtemps. Puis il rentre à Rochebrune.",
      intense:"Il vous regarde. Longtemps, sans peur et sans agressivité, de cette façon qu'ont les chevaux de guerre bien dressés d'examiner ce qui n'est pas prévu. Puis il fait demi-tour et il rentre à Rochebrune, où il n'a rien à faire, et il y reste toute la journée.",
      extreme:"Il vous regarde longtemps, sans peur et sans agressivité, de la façon qu'ont les chevaux de guerre bien dressés d'examiner ce qui n'est pas au programme. Puis il fait demi-tour et rentre à Rochebrune, où il n'a rien à faire, et il y reste toute la journée dans la cour, à l'attache, comme un objet qu'on rapporte." },
    "§ Il ne repartira pas tant que vous serez sur cette lande. C'est un message et vous êtes le destinataire.",
    "Il faut trouver une autre façon. Trois jours de perdus.",
  ],
  effets:{ cout:{ endurance:16, moral:5 }, flags:['ro_vu'] },
  suite:'ro_traque', libelleSuite:"Autrement" },

ro_tour:{
  lieu:"La tour de guet · vendredi · crépuscule",
  qui:'baudoin',
  texte:[
    "La tour de guet de Rochebrune est un doigt de granite de quarante pieds planté sur la falaise, avec une plateforme, un brasero et rien d'autre. On y monte par un escalier extérieur.",
    "Ser Baudoin d'Escaut y monte tous les quinze jours, seul, et il y reste jusqu'à la nuit tombée.",
    { sobre:"Il est exactement comme on vous l'a décrit. C'est le problème.",
      intense:"Il est exactement comme on vous l'a décrit, et c'est tout le problème : quarante ans, une belle voix, une façon de vous saluer d'un inconnu sur une plateforme de guet qui met immédiatement à l'aise. Il a apporté du vin et deux gobelets, ce qui veut dire qu'il en apporte deux tous les quinze jours depuis deux ans.",
      extreme:"Il est exactement comme on vous l'a décrit, et c'est le problème : quarante ans, une belle voix, la façon de saluer un inconnu qui met immédiatement à l'aise. Il a monté du vin et **deux** gobelets — ce qui veut dire qu'il en monte deux tous les quinze jours depuis deux ans, et qu'il en redescend un plein." },
    "« Vous êtes le Paria. »",
    "« Oui. »",
    "« Guichard aurait dû m'en parler. » Il sourit. « Il ne me parle plus beaucoup. Asseyez-vous. »",
    "§ Deux gobelets. Il n'attend pas un ami. Il attend celui dont il a pris le visage.",
    "« Vous montez ici tous les quinze jours. »",
    "« Depuis deux ans, oui. » Il sert le vin dans les deux gobelets et il en pousse un vers l'ouest, vers la lande, pas vers vous. « Je monte pour qu'il me trouve. »",
    "« Pourquoi ? »",
    { sobre:"« Parce que je ne dors plus. »",
      intense:"« Parce que je ne dors plus, messire, et parce que je suis très fatigué. » Il dit ça sans une once d'apitoiement, avec la précision d'un homme qui a fait le tour de la question. « Onze hommes. Il descend la liste. Je suis le numéro un. »",
      extreme:"« Parce que je ne dors plus et que je suis fatigué. » Aucun apitoiement : la précision d'un homme qui a fait cent fois le tour de la question. « Onze. Il descend la liste, un par an au début, un par mois maintenant. Je suis le numéro un. Et je monte ici tous les quinze jours avec deux gobelets parce que je préfère infiniment que ça se passe ici, entre lui et moi, plutôt qu'un soir dans ma chambre où dort ma femme. »" },
    "« Il ne monte jamais. »",
    "« Il ne monte jamais. Il me garde pour la fin. » Il boit. « Il a raison. C'est ce que j'aurais fait. »",
    "« Vous savez qu'il a raison sur le reste aussi. »",
    "Ser Baudoin d'Escaut regarde la lande pendant très longtemps.",
    "« Je sais exactement ce que j'ai fait, messire. Je n'ai pas d'explication et je n'en cherche pas. J'avais trente-huit ans, j'étais chez moi, il était mieux que moi, et j'ai eu une nuit entière pour m'arrêter. »",
    "§ « Ne vous fatiguez pas à me juger. Ça fait deux ans que je le fais très bien tout seul, et ça n'a jamais rendu personne son visage. »",
  ],
  effets:{ flags:['ro_baudoin_vu','ro_sait_baudoin','ro_baudoin_avoue'], cout:{ moral:5 },
           exploit:{ eclat:3, temoins:'un', quoi:"vous avez bu le vin de Ser Baudoin d'Escaut" },
           marque:"Baudoin d'Escaut monte à la tour tous les quinze jours avec deux gobelets, pour que ça finisse.",
           court:"Deux gobelets" },
  suite:'ro_aldren_tour', libelleSuite:"La nuit tombe" },

ro_appat_dom:{
  texte:[
    "C'est la plus simple des trois et la plus laide : il suffit d'être un homme de quarante ans, seul, à cheval, sur la lande, la nuit.",
    "Vous n'avez pas quarante ans. Vous avez un manteau de Rochebrune pris à l'écurie, une monture de la maison, et le pas d'un homme qui a fait vingt ans de garde — ce qui se joue, mal, avec le dos et avec les épaules, et ce qui suffit à quatre cents pas dans le noir.",
    { sobre:"Il vient à la quatrième nuit.",
      intense:"Il vient à la quatrième nuit. On ne l'entend pas venir : la lande est de l'ajonc et du granite, et un cheval de guerre au pas dans l'ajonc fait moins de bruit que le vent d'ouest. On le voit d'un coup, à trente pas, arrêté, et il était peut-être là depuis un quart d'heure.",
      extreme:"Il vient à la quatrième nuit. On ne l'entend pas : l'ajonc et le vent d'ouest avalent tout, et un cheval de guerre au pas ne fait pas plus de bruit qu'un homme qui respire. On le voit d'un coup, à trente pas, immobile — et l'idée qu'il soit peut-être là depuis un quart d'heure, à regarder, est celle qui reste." },
    "Harnois complet. Heaume fermé. Pas de bannière, pas de couleurs, pas d'écu.",
    "Il descend de cheval.",
    "§ Il descend toujours de cheval. C'est ce que Gervais a dit et personne ne l'a cru.",
  ],
  effets:{ flags:['ro_appat'], cout:{ endurance:12 },
           marque:"Vous vous êtes fait passer pour un ancien de la patrouille, quatre nuits sur la lande.",
           court:"L'appât" },
  suite:'ro_aldren', libelleSuite:"Il descend" },

ro_appat_ko:{
  texte:[
    "Quatre nuits. Six nuits. Neuf nuits.",
    { sobre:"Il ne vient pas. Vous n'êtes pas sur sa liste.",
      intense:"Il ne vient pas, et au bout de neuf nuits vous comprenez pourquoi : vous n'êtes pas sur sa liste. Il ne chasse pas des hommes de quarante ans sur une lande. Il chasse **quatorze noms**, et il sait à quoi ils ressemblent parce qu'il a passé six semaines dans leur maison.",
      extreme:"Il ne vient pas, et au bout de neuf nuits ça devient évident : vous n'êtes pas sur sa liste. Il ne chasse pas un type de quarante ans dans le noir — il chasse quatorze noms qu'il connaît de figure, parce qu'il a passé six semaines dans leur maison à manger à leur table, et parce qu'il en a maintenant onze tendus sur des cadres de noisetier." },
    "§ Neuf nuits de lande en manteau volé, pour découvrir qu'on n'avait rien compris à ce qu'on chassait.",
    "Vous rentrez avec les jambes ouvertes par l'ajonc jusqu'aux genoux et une leçon qui vaut cher : on ne piège pas un homme qui a une raison en lui proposant du hasard.",
  ],
  effets:{ flags:['ro_appat_rate'], cout:{ endurance:24, moral:8 },
           blessure:{ id:'jambes', zone:"Jambes", type:"ouvertes par l'ajonc, neuf nuits",
                      gravite:1, douleur:1, saignement:0, fonction:['endurance'],
                      cicatrice:"des marbrures fines sur les tibias, qui partiront un jour" },
           marque:"Neuf nuits d'appât sur la lande, pour rien.", court:"Neuf nuits" },
  suite:'ro_traque', libelleSuite:"Autrement" },

};
Object.assign(ARC_C02, ARC_C02_3);

/* ══ SER ALDREN ═══════════════════════════════════════════════════════════ */
const ARC_C02_4 = {

ro_aldren:{
  qui:'aldren',
  titre:"Ce qu'il y a sous le heaume",
  texte:[
    () => a('ro_repaire')
      ? "Le corps de garde a trois murs, un toit de goémon et pas de feu. Il y a une paillasse, un râtelier à trois lances, un billot, et sur le billot un cadre de noisetier nu, monté, avec quatorze chevilles plantées et rien dessus."
      : "Il descend de cheval à trente pas et il vient à pied, sans se presser, l'épée au fourreau.",
    "« Vous n'êtes pas sur la liste. »",
    { sobre:"La voix sort du heaume et elle est très ordinaire.",
      intense:"La voix sort du heaume fermé et c'est la première surprise : elle est parfaitement ordinaire. Un peu étouffée par l'acier, un peu traînante sur les dentales — un homme sans lèvres articule mal les *p* et les *b* — et absolument sans emphase. On attend une voix de tombeau et on reçoit celle d'un homme qui vous demanderait l'heure.",
      extreme:"La voix sort du heaume et c'est la première surprise : elle est ordinaire. Étouffée par l'acier, traînante sur les dentales — un homme sans lèvres articule mal les *p* et les *b*, et il a appris à contourner les mots qui en ont trop — et absolument sans emphase. On attend une voix de tombeau ; on reçoit celle de quelqu'un qui demanderait l'heure." },
    "« Non. »",
    "« Alors vous êtes payé. » Un temps. « Par Guichard, ou par Baudoin ? »",
    "« Par Guichard. »",
    "« Bien. Baudoin ne paie pas les gens : il les convainc. C'est ce qui le rend dangereux et c'est ce qui a fait les quatorze. »",
    "§ Il ne bouge pas. Il n'a pas dégainé. Il est en harnois complet sur une lande à quatre lieues de tout et il vous parle comme deux hommes qui se croisent sur une route.",
    "« Vous avez vu les cadres. »",
    "« Onze. Numérotés de quatorze à quatre. »",
    "« De quatorze à deux. J'ai pris le trois et le deux ce mois-ci, ils ne les ont pas encore trouvés — ils sont dans un fossé de la lande basse et il pleut beaucoup. »",
    { sobre:"« Il ne reste que le un. »",
      intense:"« Il ne reste que le un. » Le heaume ne bouge pas. « Vous vous demandez pourquoi les visages. Tout le monde se le demande et personne ne me le demande, parce que personne ne me parle. »",
      extreme:"« Il ne reste que le un. » Le heaume ne bouge pas d'un pouce. « Vous vous demandez pourquoi les visages. Tout le monde se le demande, et personne ne me le demande, parce que personne ne me parle : on me tire dessus, on prie, on court. Vous êtes le quatrième en deux ans à rester debout et le premier à ne pas avoir dégainé. »" },
    "« Pourquoi les visages ? »",
    "« Parce qu'ils étaient quatorze dans le couloir et qu'ils ont regardé. »",
    "Un temps.",
    "« Un homme qui regarde et qui ne fait rien n'a pas de figure, messire. Ce n'est pas une image : il n'en a pas. Il n'y a personne derrière. J'ai passé une nuit entière à regarder quatorze personnes dans une porte ouverte, et j'ai eu tout le temps de vérifier. »",
    "« Et Baudoin ? »",
    "« Baudoin a fait. Baudoin a une figure. » Le heaume s'incline légèrement. « C'est pour ça qu'il est le numéro un et pas le numéro quatorze : je ne lui prendrai pas le visage. Je le tuerai. C'est ce qu'on doit à quelqu'un qui a fait quelque chose. »",
    "§ Il n'est pas fou. C'est ce qu'il y a de pire dans toute cette affaire : à aucun moment de cette conversation il n'est fou.",
    "« Guichard de Rochebrune est le douze. Il a regardé. Il aura son cadre. »",
    "« Et moi ? »",
    "« Vous n'êtes pas sur la liste. Je vous l'ai dit en arrivant. Ça veut dire que ce qui va se passer maintenant, c'est vous qui le choisissez, et pas moi. »",
    "Il attend. Il attend vraiment, et un homme en harnois complet qui attend au milieu d'une lande sans mettre la main à la garde est la chose la plus difficile à tuer du monde connu.",
  ],
  effets:{ flags:['ro_parle','ro_sait_liste','ro_sait_baudoin'], cout:{ moral:6 },
           exploit:{ eclat:4, temoins:'aucun', quoi:"vous avez parlé au chevalier sans visage" },
           marque:"Ser Aldren prend le visage de ceux qui ont regardé. Il tuera Baudoin, sans le défigurer.",
           court:"La liste" },
  suite:'ro_choix', libelleSuite:"Choisir" },

ro_aldren_tour:{
  qui:'aldren',
  titre:"Trois hommes sur une plateforme",
  texte:[
    "Il monte à la nuit tombée, par l'escalier extérieur, en harnois complet, et le granite rend chaque pas.",
    "Ser Baudoin d'Escaut ne se lève pas. Il ne dégaine pas. Il pousse simplement vers l'escalier le deuxième gobelet, qu'il a rempli il y a une heure.",
    "« Aldren. »",
    "« Baudoin. »",
    { sobre:"Aucun des deux ne bouge pendant un long moment.",
      intense:"Aucun des deux ne bouge pendant un long moment. Il y a quarante pieds de vide derrière la rambarde, un brasero qui n'éclaire que le bas des jambes, un vent d'ouest qui rend toute conversation pénible — et deux hommes qui attendent ça depuis deux ans et qui ne savent pas comment on commence.",
      extreme:"Aucun des deux ne bouge pendant un long moment. Quarante pieds de vide derrière la rambarde, un brasero qui n'éclaire que le bas des jambes, un vent d'ouest qui oblige à parler fort — et deux hommes qui attendent ça depuis deux ans sans savoir comment on l'entame. Le vin dans le deuxième gobelet a une pellicule dessus. Il est là depuis une heure." },
    "« Vous avez amené quelqu'un », dit Aldren.",
    "« Non », dit Baudoin. « Il était là avant moi. C'est Guichard qui l'a payé. »",
    "« Ah. »",
    "Le heaume se tourne vers vous, et c'est très désagréable parce qu'on ne sait jamais où regarde un heaume fermé.",
    "« Messire, il y a exactement trois façons de finir cette soirée et je vais vous les dire, parce que ce serait dommage que vous les découvriez en cours de route. »",
    "§ « Un : vous me tuez, et Baudoin redescend cet escalier. Deux : vous ne faites rien, et c'est moi qui redescends. Trois : vous nous tuez tous les deux, ce qui serait honnête et ce qui vous laisserait sans commanditaire. »",
    "Ser Baudoin d'Escaut boit une gorgée et repose le gobelet sur la pierre.",
    "« Il en a oublié une », dit-il. « Quatre : vous descendez cet escalier maintenant et vous nous laissez. »",
    "« Ce n'est pas une fin », dit Aldren.",
    "« Non », dit Baudoin. « C'en est une. Simplement, ce n'est pas la vôtre. »",
  ],
  effets:{ flags:['ro_parle','ro_sait_liste','ro_tour_trois'], cout:{ moral:6 },
           exploit:{ eclat:5, temoins:'un', quoi:"vous étiez sur la plateforme quand les deux se sont trouvés" },
           marque:"Aldren et Baudoin se sont trouvés sur la tour de guet, et vous étiez entre les deux.",
           court:"La plateforme" },
  suite:'ro_choix', libelleSuite:"Choisir" },

ro_choix:{
  titre:"Le contrat disait : trouvez-le et tuez-le",
  texte:[
    "Quatre cents couronnes. Un contrat de mercenaire. Une maison qui vous a menti par omission pendant une demi-journée et qui a fini par tout dire, ce qui est déjà plus que la moyenne.",
    "§ Rien de tout ça ne se résout en pensant. Ça se résout en faisant, et ce qu'on fait ne se reprend pas.",
  ],
  choix:[
    { t:"Le tuer. C'est le contrat.",
      detail:"Quatre cents couronnes · un harnois complet · un homme mieux entraîné que vous",
      ferme:"Ferme : toute version de cette affaire où Ser Aldren finit sa liste",
      risque:"très dangereux", definitif:true, va:'ro_duel_1' },

    { t:"« Finissez. Je ne vous gêne pas. »",
      detail:"Le numéro un est à quinze milles · ou à quatre pieds · et le contrat tombe",
      ferme:"Ferme : les quatre cents couronnes de Rochebrune",
      risque:"définitif", definitif:true, va:'ro_laisser' },

    { t:"Le ramener vivant à Rochebrune",
      si:() => !a('ro_tour_trois'),
      detail:"Un procès, des noms dits à voix haute, et quatorze cadres montrés à la salle",
      risque:"très dangereux", definitif:true, va:'ro_vivant' },

    { t:"Descendre. Rentrer. Ne rien encaisser.",
      detail:"Le contrat n'est pas rempli · vous n'avez tué personne · vous ne savez plus rien faire d'utile ici",
      ferme:"Ferme : Rochebrune, et ce qu'on dira de vous sur la côte",
      risque:"définitif", definitif:true, va:'ro_fin_parti' },
  ],
},

/* ── Le duel ─────────────────────────────────────────────────────────────── */
ro_duel_1:{
  qui:'aldren', melee:true,
  titre:"Harnois contre cuir",
  effets:{ melee:{ position:"à six pas", note:"Harnois complet · heaume fermé" } },
  texte:[
    "Il ne dit rien quand vous dégainez. Il ne dit plus rien du tout à partir de là, et c'est un renseignement : les gens qui parlent en se battant sont ceux qui ont peur ou ceux qui débutent.",
    { sobre:"Harnois complet contre cuir renforcé. Il n'y a pas de match.",
      intense:"Harnois complet contre cuir renforcé et mailles au torse. Il n'y a pas de match : vous ne pouvez pas le blesser en le frappant. On ne perce pas une plaque de trois lignes avec une épée longue, on ne la coupe pas, on ne l'entame pas. Contre un homme en harnois il n'y a que trois solutions et elles sont toutes les trois désagréables.",
      extreme:"Harnois complet contre cuir renforcé et mailles au torse. Il n'y a aucun match : on ne perce pas trois lignes de plaque avec une épée longue, on ne la coupe pas, on ne l'entame pas. Contre un homme en harnois il y a trois solutions — les défauts, le sol, ou la fatigue — et les trois consistent à accepter d'être frappé plusieurs fois en attendant." },
    "§ Il pèse quatre-vingts livres de plus que vous. Il n'a pas mangé correctement depuis deux ans.",
    "Et son heaume ne tient pas.",
    () => a('ro_visages') || a('ro_parle')
      ? "C'est la chose que vous emportez de tout ce que vous avez vu : un heaume se cale sur les pommettes et sur l'arête du nez. Il n'a ni pommettes, ni arête. Le sien glisse, et il le remonte du dos de la main gauche entre deux passes — vous l'avez vu faire deux fois en parlant."
      : "Vous n'avez pas encore compris pourquoi, mais son heaume bouge.",
  ],
  choix:[
    { t:"Les défauts — l'aisselle, le pli du coude, le jarret",
      detail:"Là où la plaque s'arrête et où il n'y a que de la maille · Agilité + anatomie contre 11",
      risque:"calculé",
      test:{ carac:'agilite', comp:'anatomie', dc:11, adversaire:'aldren', manoeuvre:'defauts', equipement:2 },
      degres:{ dominante:'ro_d1_defauts_dom', couteuse:'ro_d1_defauts_cout', echec:'ro_d1_defauts_ko' } },

    { t:"Le heaume",
      si:() => a('ro_visages') || a('ro_parle'),
      detail:"Il ne tient pas · il n'a plus de quoi le caler · Force + épées contre 10",
      risque:"dangereux",
      test:{ carac:'force', comp:'epees', dc:10, adversaire:'aldren', manoeuvre:'heaume', equipement:2, situation:2 },
      degres:{ dominante:'ro_d1_heaume_dom', couteuse:'ro_d1_heaume_cout', echec:'ro_d1_defauts_ko' } },

    { t:"Le mettre au sol",
      detail:"Quatre-vingts livres d'acier au sol se relèvent lentement · Force + lutte contre 12",
      risque:"très dangereux",
      test:{ carac:'force', comp:'lutte', dc:12, adversaire:'aldren', manoeuvre:'sol' },
      degres:{ dominante:'ro_d1_sol_dom', couteuse:'ro_d1_sol_cout', echec:'ro_d1_defauts_ko' } },

    { t:"Le laisser venir. Attendre.",
      detail:"Deux ans de lande, pas de feu, pas de viande · Endurance + tactique contre 9",
      risque:"prudent",
      test:{ carac:'endurance', comp:'tactique', dc:9, adversaire:'aldren', manoeuvre:'attendre' },
      degres:{ dominante:'ro_d1_attendre_dom', couteuse:'ro_d1_attendre_dom', echec:'ro_d1_attendre_ko' } },
  ],
},

ro_d1_defauts_dom:{
  melee:true,
  texte:[
    "L'aisselle droite. C'est toujours l'aisselle droite : un homme droitier lève le bras pour frapper et à ce moment-là la plaque d'épaule se soulève et découvre trois pouces de maille.",
    { sobre:"La pointe entre dans la maille et casse deux mailles. Ça suffit.",
      intense:"Une maille rivetée arrête une taille et n'arrête pas une pointe : il faut appuyer, les anneaux s'ouvrent un par un sous l'acier, et il y en a quatre à casser avant que ça entre. Vous en cassez quatre. Ça entre de deux pouces dans le grand dorsal, ce qui ne tue personne et ce qui coupe net l'envie de lever ce bras-là.",
      extreme:"Une maille rivetée arrête une taille, pas une pointe. Il faut appuyer : les anneaux s'ouvrent un par un, quatre d'affilée, avec un petit bruit métallique chacun, et ensuite ça entre. Deux pouces dans le grand dorsal. Ça ne tue personne. Ça coupe net l'envie de lever ce bras, et le sang qui descend à l'intérieur d'un harnois ne se voit pas du dehors — il s'accumule dans la cubitière et il finit par en sortir goutte à goutte par le pli du coude." },
    "§ Il recule pour la première fois. Un homme en harnois qui recule dépense trois fois ce que vous dépensez.",
    "Il passe l'épée à gauche. Il sait le faire — évidemment qu'il sait le faire, c'est un chevalier — mais il le fait moins bien.",
  ],
  effets:{ flags:['ro_aisselle'], cout:{ endurance:14 },
           meleeMaj:{ position:"à quatre pas", note:"Aisselle droite ouverte · il est passé à gauche" } },
  suite:'ro_duel_2', libelleSuite:"Continuer" },

ro_d1_defauts_cout:{
  melee:true,
  texte:[
    "Vous trouvez l'aisselle. Vous la trouvez en entrant à douze pouces d'un homme en harnois complet, ce qui est la seule façon et la pire.",
    { sobre:"Il vous prend du gantelet en pleine figure.",
      intense:"À douze pouces, un chevalier n'utilise pas son épée : il utilise ce qu'il a sur les mains. Le gantelet d'acier arrive de bas en haut sous la mâchoire et vous décolle du sol de quatre pouces. Vous ne perdez pas connaissance. Vous perdez trois dents et l'usage de la parole pour deux semaines.",
      extreme:"À douze pouces, un chevalier n'utilise pas l'épée : il utilise ce qu'il a sur les mains. Le gantelet arrive de bas en haut sous la mâchoire et vous décolle de quatre pouces. Vous ne perdez pas connaissance — vous perdez trois dents, dont deux que vous avalez, et vous passerez deux semaines à parler comme un homme qui a la bouche pleine de laine, à cracher des esquilles d'os et à ne pas pouvoir mordre." },
    "Mais la pointe est entrée. Deux pouces sous l'aisselle, et le bras droit ne se relèvera plus au-dessus de l'épaule.",
    "§ Trois dents contre un bras. C'est un bon échange et personne ne trouve ça agréable.",
  ],
  effets:{ flags:['ro_aisselle'], cout:{ endurance:16, vitalite:12 },
           blessure:{ id:'machoire', zone:"Mâchoire", type:"trois dents, gantelet d'acier",
                      gravite:2, douleur:3, saignement:1, fonction:['presence','endurance'],
                      cicatrice:"trois dents en moins du côté gauche, et un sifflement en parlant" },
           meleeMaj:{ position:"corps à corps", note:"Aisselle ouverte · votre mâchoire est cassée" } },
  suite:'ro_duel_2', libelleSuite:"Continuer" },

ro_d1_defauts_ko:{
  melee:true,
  texte:[
    "Vous entrez pour chercher un défaut et vous découvrez le défaut principal de cette idée : pour chercher un défaut, il faut se mettre là où un homme en harnois n'a plus qu'à laisser tomber son poids.",
    { sobre:"Il vous laisse tomber son poids dessus.",
      intense:"Il ne frappe pas. Il vous prend le poignet de la main gauche, il vous attire, et il vous laisse tomber quatre-vingts livres d'acier et cent quatre-vingts livres d'homme sur le côté droit. Le sol de la lande, c'est du granite sous six pouces de tourbe.",
      extreme:"Il ne frappe pas : il vous prend le poignet de la main gauche, vous attire, et laisse tomber quatre-vingts livres d'acier et cent quatre-vingts livres d'homme sur votre côté droit. Le sol de la lande est du granite sous six pouces de tourbe. Quelque chose cède dans les côtes, en bas à droite, et l'air part d'un coup — et vous restez comme ça, sous lui, à essayer d'inspirer pendant qu'un homme sans visage se relève lentement en s'appuyant sur vous." },
    "Il se relève. Il vous laisse vous relever aussi, ce qui n'est pas de la clémence : c'est qu'un homme en harnois ne se bat pas au sol, il attend qu'on soit debout.",
    "§ Il ne vous a pas encore frappé une seule fois. Il n'en a pas eu besoin.",
  ],
  effets:{ cout:{ endurance:20, vitalite:12 },
           blessure:{ id:'cotes_ro', zone:"Côtes droites", type:"cédées sous quatre-vingts livres d'acier",
                      gravite:2, douleur:3, saignement:0, fonction:['force','endurance','epees','lutte'],
                      cicatrice:"une respiration qui accroche à droite en montant" },
           meleeMaj:{ position:"debout, mal", note:"Il est entier" } },
  suite:'ro_duel_2', libelleSuite:"Continuer" },

ro_d1_heaume_dom:{
  melee:true,
  texte:[
    "Un heaume se cale sur trois points : les pommettes, l'arête du nez, et l'occiput. Il n'en a plus que le troisième.",
    { sobre:"Vous frappez du plat, en travers, sur le côté du heaume.",
      intense:"Vous ne cherchez pas à le percer — on ne perce pas un heaume. Vous frappez du plat, en travers, sur le flanc gauche de la coiffe, comme on frappe une porte pour la faire sortir de ses gonds. Et le heaume tourne d'un quart sur sa tête.",
      extreme:"Vous ne cherchez pas à percer — on ne perce pas un heaume. Vous frappez du plat, en travers, sur le flanc gauche de la coiffe, comme on frappe une porte pour la sortir de ses gonds. Le heaume tourne d'un quart de tour sur sa tête, et la fente de vue se retrouve sur son oreille. Pendant deux secondes et demie, Ser Aldren est un homme aveugle en harnois complet au milieu d'une lande." },
    "§ Deux secondes et demie. C'est très long et c'est très court, et c'est tout ce que cette nuit vous accordera.",
    "Il ne panique pas. Il fait exactement ce qu'il faut faire : il recule de trois pas, l'épée en travers devant lui, et il remet le heaume droit du dos de la main gauche.",
    "Mais il a reculé de trois pas, et vous avez vu, pendant qu'il tournait, ce qu'il y a sous le bord.",
    { sobre:"Il n'y a rien. C'est le mot exact.",
      intense:"Il n'y a rien. C'est le mot exact et il n'y en a pas d'autre : sous le bord du heaume, à la place où un homme a une joue, il y a de l'os couvert d'une peau brune et fine, tendue comme un tambour, sans un poil, et le coin de l'orbite est à l'air.",
      extreme:"Il n'y a rien, et c'est le mot exact. Sous le bord du heaume, là où un homme a une joue, il y a de l'os recouvert d'une peau brune et fine, tendue comme un tambour, sans un poil, et l'os de l'orbite est à l'air sur un demi-pouce. Ça a cicatrisé — ça a très bien cicatrisé, ce qui est la partie obscène : le corps a fait son travail avec application sur quelque chose qui n'aurait jamais dû avoir lieu." },
  ],
  effets:{ flags:['ro_heaume','ro_vu_dessous'], cout:{ endurance:12, moral:6 },
           meleeMaj:{ position:"à quatre pas", note:"Son heaume ne tient plus" } },
  suite:'ro_duel_2', libelleSuite:"Continuer" },

ro_d1_heaume_cout:{
  melee:true,
  texte:[
    "Vous frappez le heaume et il tourne, et vous entrez dans les deux secondes et demie.",
    { sobre:"Il frappe au jugé. Au jugé, un chevalier touche quand même.",
      intense:"Il frappe au jugé, aveugle, et c'est l'erreur : un chevalier aveugle ne frappe pas au hasard, il frappe là où il était en train d'aller. Vous y étiez. La taille vous prend le haut de la cuisse gauche à travers le cuir et ouvre jusqu'au fascia.",
      extreme:"Il frappe au jugé, aveugle — et c'est votre erreur, pas la sienne : un chevalier aveugle ne frappe pas au hasard, il frappe là où il allait déjà. Vous y étiez. La taille prend le haut de la cuisse gauche, traverse le cuir comme du papier et ouvre jusqu'au fascia sur sept pouces. Ce qui remonte tout de suite n'est pas la douleur : c'est la sensation très nette et très froide que la jambe est ouverte et qu'on peut voir dedans." },
    "Son heaume est de travers. Votre jambe est ouverte.",
    "§ On appelle ça un échange et c'est la seule chose honnête de tout ce métier.",
  ],
  effets:{ flags:['ro_heaume'], cout:{ endurance:14, vitalite:14 },
           blessure:{ id:'cuisse_ro', zone:"Cuisse gauche", type:"ouverte sur sept pouces",
                      gravite:2, douleur:3, saignement:4, fonction:['agilite','endurance','lutte'],
                      cicatrice:"sept pouces sur le haut de la cuisse, larges, mal recousus" },
           meleeMaj:{ position:"à trois pas", note:"Son heaume est de travers · votre cuisse est ouverte" } },
  suite:'ro_duel_2', libelleSuite:"Continuer" },

ro_d1_sol_dom:{
  melee:true,
  texte:[
    "On ne renverse pas un homme en harnois par la force. On le renverse par le pied.",
    { sobre:"Vous lui prenez le talon avec le vôtre et vous poussez au sternum.",
      intense:"Vous entrez, vous placez votre talon derrière le sien — le seul endroit du corps humain qu'aucun harnois ne protège, parce qu'on ne peut pas marcher avec une plaque sous le talon — et vous poussez au sternum des deux mains sur la garde. Quatre-vingts livres d'acier tombent en arrière, et elles tombent vite parce que tout ce qui est lourd tombe vite.",
      extreme:"Vous entrez, vous placez le talon derrière le sien — le seul endroit qu'aucun harnois ne couvre, parce qu'on ne marche pas avec une plaque sous le talon — et vous poussez au sternum des deux mains sur la garde. Quatre-vingts livres d'acier partent en arrière et arrivent vite, parce que tout ce qui est lourd arrive vite. Le bruit que fait un harnois complet sur du granite sous six pouces de tourbe s'entend à quatre cents pas et fait lever tous les oiseaux de la lande." },
    "§ Un homme en harnois se relève. Il met neuf secondes.",
    "Neuf secondes. Il faut avoir compté une fois pour savoir ce que ça représente, et il faut décider maintenant de ce qu'on en fait.",
  ],
  effets:{ flags:['ro_au_sol'], cout:{ endurance:18 },
           meleeMaj:{ position:"debout, lui au sol", note:"Neuf secondes" } },
  suite:'ro_duel_2', libelleSuite:"Neuf secondes" },

ro_d1_sol_cout:{
  melee:true,
  texte:[
    "Vous le renversez et il vous emporte.",
    { sobre:"Deux hommes au sol, dont un en armure. Ce n'est pas égal.",
      intense:"Deux hommes au sol dont un en armure, ce n'est pas une lutte, c'est un accident de charrette. Il vous arrive dessus, la coudière la première, dans les côtes, et une coudière d'acier chargée de deux cents livres fait exactement ce qu'un marteau ferait.",
      extreme:"Deux hommes au sol dont un en armure, ce n'est pas une lutte : c'est un accident de charrette. Il vous arrive dessus, coudière la première, dans les côtes, et une coudière d'acier chargée de deux cents livres fait ce qu'un marteau de forge ferait. Trois côtes, du même côté, avec le bruit qu'on entend de l'intérieur du crâne et qui n'appartient qu'à soi." },
    "Vous sortez de dessous. Il met ses neuf secondes à se relever, exactement neuf, et vous les passez à essayer de retrouver un souffle qui ne revient que par tiers.",
    "§ Vous êtes tous les deux debout et il n'y en a qu'un des deux qui respire.",
  ],
  effets:{ flags:['ro_au_sol'], cout:{ endurance:22, vitalite:14 },
           blessure:{ id:'cotes_ro', zone:"Côtes gauches", type:"trois, à la coudière",
                      gravite:3, douleur:3, saignement:0, fonction:['force','endurance','epees','lutte','agilite'],
                      cicatrice:"un flanc qui accroche à chaque inspiration profonde, six mois durant" },
           meleeMaj:{ position:"debout, tous les deux", note:"Vous ne respirez qu'à moitié" } },
  suite:'ro_duel_2', libelleSuite:"Continuer" },

ro_d1_attendre_dom:{
  melee:true,
  texte:[
    "Vous ne faites rien du tout. Vous gardez six pas et vous les gardez.",
    { sobre:"Un harnois pèse. Deux ans de lande pèsent plus.",
      intense:"Un harnois complet pèse quatre-vingts livres et il ne se porte pas : il se **soutient**, muscle par muscle, à chaque seconde. Un chevalier bien nourri tient une heure. Un homme qui vit depuis deux ans dans un corps de garde sans feu, sur du lapin et des moules, tient beaucoup moins.",
      extreme:"Un harnois complet pèse quatre-vingts livres et il ne se porte pas : il se soutient, muscle par muscle, à chaque seconde. Un chevalier bien nourri tient une heure. Un homme qui vit depuis deux ans dans un corps de garde sans feu, sur du lapin, des moules et ce qu'on vole aux fermes, ne tient pas quatre minutes — et il le sait, et c'est pour ça qu'il n'a jamais attaqué personne à plus de trente pas." },
    "Quatre minutes. Vous les comptez.",
    "À la troisième, le heaume commence à descendre. À la quatrième, il pose la pointe de son épée dans la tourbe et il s'appuie dessus — un demi-instant, aussitôt corrigé, et parfaitement visible.",
    "§ Vous êtes plus jeune, vous êtes en cuir, et vous avez mangé hier. C'est tout ce dont vous disposez et ça suffit.",
  ],
  effets:{ flags:['ro_use'], cout:{ endurance:8 },
           meleeMaj:{ position:"six pas", note:"Il s'appuie sur son épée" } },
  suite:'ro_duel_2', libelleSuite:"Continuer" },

ro_d1_attendre_ko:{
  melee:true,
  texte:[
    "Vous attendez, et il n'attend pas.",
    "C'est la deuxième chose qu'un homme en harnois sait de son harnois : qu'il ne dure pas. Il ne vous laissera donc jamais le temps de le laisser durer.",
    { sobre:"Il vient en trois pas et il ne s'arrête plus.",
      intense:"Il vient en trois pas et il ne s'arrête plus. Ce n'est pas de l'escrime : c'est un homme qui avance en frappant sans discontinuer, du haut vers le bas, en marchant, comme on abat un arbre — et vous reculez sur trente pas dans de l'ajonc à hauteur de hanche en parant tout ce que vous pouvez et en encaissant le reste sur les avant-bras.",
      extreme:"Il vient en trois pas et ne s'arrête plus. Ce n'est pas de l'escrime : c'est un homme qui avance en frappant sans discontinuer, de haut en bas, en marchant, comme on abat un arbre. Vous reculez sur trente pas dans de l'ajonc à hauteur de hanche, en parant ce que vous pouvez et en prenant le reste sur les avant-bras — et à la neuvième ou dixième, le cuir de l'avant-bras gauche cède et ce qui est dessous aussi." },
    "§ Il s'arrête de lui-même. Il s'arrête parce qu'il est à bout de souffle, pas parce que vous l'avez arrêté, et la différence compte.",
  ],
  effets:{ flags:['ro_use'], cout:{ endurance:24, vitalite:12 },
           blessure:{ id:'avantbras_ro', zone:"Avant-bras gauche", type:"ouvert en parant, à répétition",
                      gravite:2, douleur:2, saignement:3, fonction:['lutte','bouclier','epees'],
                      cicatrice:"trois entailles parallèles sur le dos de l'avant-bras" },
           meleeMaj:{ position:"trente pas cédés", note:"Il est à bout de souffle · vous saignez" } },
  suite:'ro_duel_2', libelleSuite:"Continuer" },

};
Object.assign(ARC_C02, ARC_C02_4);

/* ══ LA FIN ═══════════════════════════════════════════════════════════════ */
const ARC_C02_5 = {

ro_duel_2:{
  qui:'aldren', melee:true,
  titre:"Ce qu'on fait d'un homme qu'on a battu",
  texte:[
    () => a('ro_au_sol') ? "Il est au sol et il lui reste sept secondes."
      : (a('ro_use') ? "Il souffle. On entend un homme souffler dans un heaume fermé et c'est un bruit qu'on n'oublie pas — c'est celui d'un homme dans une pièce close."
      : (a('ro_aisselle') || a('ro_heaume') ? "Il est entamé. Un homme en harnois entamé reste un homme en harnois, et il le sait mieux que vous."
      : "Il n'est pas entamé. Vous, si.")),
    () => ETAT.blessures.length >= 3
      ? "Vous portez trois choses qui ne s'en iront pas seules, sur une lande, à quatre lieues de tout, et il n'y a personne à quinze milles à la ronde."
      : "Il n'y a personne à quinze milles. C'est vrai pour vous deux et ça n'a jamais réconforté personne.",
    "§ Il ne demande pas grâce et il ne demandera pas. Ce n'est pas du courage : c'est qu'il a déjà eu une nuit entière pour apprendre que ça ne sert à rien.",
  ],
  choix:[
    { t:"Finir",
      detail:"Le pli du coude, l'aisselle, le défaut de la cuirasse · Force + anatomie",
      risque:"définitif", definitif:true,
      test:{ carac:'force', comp:'anatomie',
             dc:() => 11 - (a('ro_au_sol') ? 4 : 0) - (a('ro_use') ? 2 : 0) - (a('ro_aisselle') ? 2 : 0) - (a('ro_heaume') ? 2 : 0),
             adversaire:'aldren', manoeuvre:'finir', equipement:2 },
      degres:{ dominante:'ro_fin_tue', couteuse:'ro_tue_cout', echec:'ro_battu' } },

    { t:"Lui ôter le heaume",
      detail:"Il n'a pas de visage · le lui montrer devant vous est la seule chose qu'on puisse encore lui faire",
      ferme:"Ferme : l'idée que vous ne feriez jamais ça",
      risque:"définitif", definitif:true,
      test:{ carac:'agilite', comp:'lutte',
             dc:() => 12 - (a('ro_au_sol') ? 5 : 0) - (a('ro_heaume') ? 3 : 0) - (a('ro_use') ? 2 : 0),
             adversaire:'aldren', manoeuvre:'heaume2' },
      degres:{ dominante:'ro_heaume_ote', couteuse:'ro_heaume_ote', echec:'ro_battu' } },

    { t:"« Arrêtez. »",
      detail:"Un homme qui a une liste ne s'arrête pas parce qu'on le lui demande · Présence contre 12",
      risque:"calculé",
      test:{ carac:'presence', comp:null, dc:12, adversaire:'aldren', manoeuvre:'arreter',
             situation:() => (a('ro_parle') ? 2 : 0) + (a('ro_vu_dessous') ? 2 : 0) + (a('ro_ermengarde') ? 2 : 0) },
      degres:{ dominante:'ro_arret_dom', couteuse:'ro_arret_cout', echec:'ro_battu' } },
  ],
},

ro_tue_cout:{
  texte:[
    "Vous le tuez et ça prend le temps que ça prend, parce qu'un homme en harnois complet ne meurt pas d'un coup : il meurt de trois, et entre les trois il continue.",
    { sobre:"Le troisième entre au pli du coude et remonte. Il s'assied.",
      intense:"Le troisième entre au pli du coude gauche et remonte le long de l'humérus, et il ouvre ce qu'il faut ouvrir. Il s'assied dans l'ajonc, dos contre le mur du corps de garde, et il met un temps déraisonnable à mourir parce que c'est comme ça que ça se passe quand on ouvre un bras et pas un cœur.",
      extreme:"Le troisième entre au pli du coude gauche et remonte le long de l'humérus. Il s'assied dans l'ajonc, dos au mur du corps de garde, et il met un temps déraisonnable à mourir : le sang sort par la cubitière goutte à goutte, régulièrement, et remplit d'abord le gantelet avant de couler sur la tourbe. On voit exactement combien de temps il reste et lui aussi." },
    "Il ne dit rien pendant tout ce temps. Puis, quand il devient évident que c'est fini :",
    "« Le cadre est sur le billot. Il est monté. Quatorze chevilles. »",
    "« Je ne vais pas le faire. »",
    "« Je sais. » Un temps. « C'est pour ça que je vous le dis. »",
    "§ Il meurt sans qu'on ait jamais su à quoi il ressemblait.",
    "Vous lui laissez le heaume. C'est la seule chose que vous puissiez encore décider et vous la décidez.",
  ],
  effets:{ flags:['ro_aldren_mort','ro_heaume_laisse'], cout:{ endurance:16, vitalite:8, moral:12 },
           exploit:{ eclat:9, temoins:'aucun', quoi:"vous avez tué le chevalier sans visage" },
           marque:"Vous avez tué Ser Aldren dans l'ajonc, et vous lui avez laissé son heaume.",
           court:"Aldren est mort" },
  suite:'ro_fin_tue', libelleSuite:"Redescendre" },

ro_heaume_ote:{
  qui:'aldren',
  titre:"Ce qu'il y a dessous",
  texte:[
    "Les courroies sont sous le menton. Il n'a pas de menton — il en a l'os — et les courroies passent par-dessus.",
    { sobre:"Vous les coupez et vous ôtez le heaume.",
      intense:"Vous les coupez et vous ôtez le heaume, et il se débat de la façon dont se débat un homme à qui l'on fait la seule chose qui lui reste à faire subir : violemment, en silence, et sans espoir.",
      extreme:"Vous les coupez et vous ôtez le heaume. Il se débat comme se débat un homme à qui l'on fait la dernière chose qu'on puisse encore lui faire subir : violemment, en silence, sans un mot, et sans espoir — et il est plus fort que vous mais il n'a plus de souffle, et ça finit toujours par la même chose." },
    { sobre:"Ce n'est pas une plaie. C'est un crâne avec des yeux.",
      intense:"Ce n'est pas une plaie, ce n'est pas une brûlure, ce n'est rien de ce qu'on imagine. C'est de l'os recouvert d'une peau brune, fine, sans un poil, tendue sur toute la face. Il n'y a pas de nez : il y a deux ouvertures. Il n'y a pas de lèvres : il y a des dents, toutes, en permanence, jusqu'aux molaires. Et il y a deux yeux parfaitement normaux au milieu de ça, qui vous regardent.",
      extreme:"Ce n'est pas une plaie, ce n'est pas une brûlure, ce n'est rien de ce qu'on imagine. C'est de l'os recouvert d'une peau brune, fine, sans un poil, tendue sur toute la face et luisante par endroits. Pas de nez : deux ouvertures. Pas de lèvres : les dents, toutes, jusqu'aux molaires, en permanence, et les gencives à l'air. Pas de paupières — c'est ça le pire, il n'a pas de paupières, il ne peut pas fermer les yeux, il ne les a pas fermés depuis deux ans et il ne les fermera plus jamais. Et ces deux yeux-là sont parfaitement normaux, et ils vous regardent." },
    "§ Il ne peut pas fermer les yeux. Il n'a pas dormi de sommeil complet depuis deux ans.",
    "Il ne se bat plus. Il est assis dans l'ajonc, en harnois complet, la tête nue, et il attend que vous fassiez ce qui suit.",
    "Vous avez le choix et il n'y a plus de bonne réponse. Il n'y en avait pas avant non plus, mais on pouvait encore l'ignorer.",
  ],
  effets:{ flags:['ro_heaume_ote','ro_vu_dessous'], cout:{ moral:18 },
           marque:"Vous avez ôté le heaume de Ser Aldren. Il n'a pas de paupières.",
           court:"Sans le heaume" },
  choix:[
    { t:"Le tuer",
      detail:"Il est assis, tête nue, désarmé · c'est aussi simple que ça en a l'air",
      risque:"définitif", definitif:true, va:'ro_fin_tue',
      effets:{ flags:['ro_aldren_mort'], cout:{ moral:10 },
               exploit:{ eclat:9, temoins:'aucun', quoi:"vous avez tué le chevalier sans visage, tête nue" },
               marque:"Vous avez tué Ser Aldren après lui avoir ôté son heaume.", court:"Aldren est mort" } },
    { t:"Lui rendre le heaume",
      detail:"Et redescendre · sans le contrat, sans l'or, et avec ça dans le crâne",
      risque:"définitif", definitif:true, va:'ro_fin_liste',
      effets:{ flags:['ro_laisse','ro_heaume_rendu'], cout:{ moral:-8 },
               marque:"Vous lui avez rendu son heaume et vous êtes redescendu.", court:"Rendu" } },
  ],
},

ro_arret_dom:{
  qui:'aldren',
  texte:[
    "@« Arrêtez. »",
    "Il s'arrête. Pas parce que vous l'avez demandé : parce qu'un homme qui parle pendant un combat vient de faire une chose que personne n'a faite depuis deux ans.",
    "« Vous ne pouvez rien me proposer, messire. »",
    "« Non. »",
    "« Alors quoi ? »",
    { sobre:"« Il en reste un. Après lui, il ne reste rien. »",
      intense:"« Il en reste un », dites-vous. « Après Baudoin, la liste est finie. Et à ce moment-là, vous serez un homme de trente-quatre ans, en harnois, sur une lande, sans visage et sans liste. »",
      extreme:"« Il en reste un. Après Baudoin, la liste est finie. Et à ce moment-là vous serez un homme de trente-quatre ans, en harnois complet, sur une lande, sans visage, sans liste, sans rien à faire du lendemain et avec des yeux qui ne se ferment pas. Vous y avez pensé ? »" },
    "Silence.",
    "« Tous les jours », dit Ser Aldren.",
    "Il rengaine. C'est un geste de trois secondes qui coûte plus cher que tout ce qui précède.",
    "« Je le finirai quand même. »",
    "« Je sais. »",
    "« Et vous ? »",
    "§ Voilà. C'est votre tour et il n'y a pas de bonne réponse.",
  ],
  effets:{ flags:['ro_arret'], cout:{ endurance:6 },
           exploit:{ eclat:5, temoins:'aucun', quoi:"vous avez fait rengainer le chevalier sans visage" },
           marque:"Ser Aldren a rengainé devant vous. Il finira quand même.", court:"Il a rengainé" },
  choix:[
    { t:"« Alors finissez. »",
      detail:"Le contrat tombe · Baudoin meurt · Rochebrune ne vous paiera rien",
      risque:"définitif", definitif:true, va:'ro_fin_liste',
      effets:{ flags:['ro_laisse'], marque:"Vous avez laissé Ser Aldren finir sa liste.", court:"Finissez" } },
    { t:"« Alors je vous tue quand même. »",
      detail:"Il vient de rengainer · ça ne rend pas la chose plus facile, ça la rend plus rapide",
      risque:"définitif", definitif:true, va:'ro_fin_tue',
      effets:{ flags:['ro_aldren_mort','ro_tue_rengaine'], cout:{ moral:16 },
               exploit:{ eclat:8, temoins:'aucun', quoi:"vous avez tué un homme qui venait de rengainer" },
               marque:"Vous avez tué Ser Aldren après qu'il eut rengainé.", court:"Après qu'il eut rengainé" } },
  ],
},

ro_arret_cout:{
  qui:'aldren',
  texte:[
    "@« Arrêtez. »",
    "« Non. »",
    "Il n'y a rien d'autre. Pas de discours, pas d'explication : un homme qui a passé deux ans sur une lande à descendre une liste ne s'arrête pas parce qu'un inconnu le lui demande en pleine nuit.",
    { sobre:"Il ne s'arrête pas et vous avez baissé la garde pour parler.",
      intense:"Il ne s'arrête pas, et vous avez baissé la garde pour parler, et c'est une erreur que tout le monde commet une fois. La taille vous prend l'épaule gauche par-dessus le cuir, à plat mais de tout le poids d'un harnois lancé, et l'articulation sort.",
      extreme:"Il ne s'arrête pas, et vous avez baissé la garde pour parler : l'erreur que tout le monde commet une fois. La taille prend l'épaule gauche par-dessus le cuir, à plat mais de tout le poids d'un harnois en mouvement, et l'articulation sort — pas cassée : sortie, ce qui est différent et ce qui veut dire qu'il faudra la remettre soi-même, contre un mur, en comptant jusqu'à trois." },
    "Puis il recule de trois pas et il rengaine.",
    "« Vous n'êtes pas sur la liste », dit-il. « Je vous l'avais dit. Ne me forcez pas à vous y mettre. »",
    "§ Il vient de vous démettre une épaule pour ne pas avoir à vous tuer. C'est le geste le plus délicat de la nuit.",
  ],
  effets:{ flags:['ro_arret'], cout:{ endurance:12, vitalite:10 },
           blessure:{ id:'epaule_ro', zone:"Épaule gauche", type:"démise, remise contre un mur",
                      gravite:2, douleur:3, saignement:0, fonction:['force','lutte','bouclier','epees'],
                      cicatrice:"une épaule qui ressortira à la première occasion" },
           marque:"Ser Aldren vous a démis une épaule pour ne pas avoir à vous tuer.", court:"L'épaule" },
  suite:'ro_fin_liste', libelleSuite:"Redescendre" },

ro_battu:{
  qui:'aldren',
  texte:[
    "Vous vous êtes trompé, et se tromper contre un homme en harnois complet ne se répare pas dans la même nuit.",
    { sobre:"Vous vous retrouvez au sol, désarmé, avec une pointe au creux de la gorge.",
      intense:"Ça finit vite. Vous êtes au sol, dans l'ajonc, désarmé, avec la pointe d'une épée de chevalier posée dans le creux de la gorge et quatre-vingts livres d'acier debout au-dessus qui ne respirent presque pas.",
      extreme:"Ça finit vite. Au sol, dans l'ajonc, désarmé, la pointe d'une épée de chevalier dans le creux de la gorge, avec quatre-vingts livres d'acier debout au-dessus qui respirent à peine. Les épines de l'ajonc vous entrent dans le dos par une douzaine d'endroits et c'est ridiculement la seule chose que vous sentez." },
    "Il ne pousse pas.",
    "« Vous n'êtes pas sur la liste. »",
    "Il retire la pointe. Il remonte à cheval — ce qui lui prend beaucoup de temps, et il ne s'excuse pas de vous faire attendre.",
    "« Dites à Guichard de Rochebrune que je passerai en Floréal. Dites-lui de bien manger d'ici là. »",
    "§ Vous rentrez à Rochebrune à pied, en deux jours, sans épée, et vous n'avez tué personne.",
  ],
  effets:{ flags:['ro_battu','ro_laisse'], cout:{ endurance:20, vitalite:10, moral:16 },
           marque:"Ser Aldren vous a mis à terre et vous a laissé la vie. Vous n'êtes pas sur la liste.",
           court:"Pas sur la liste" },
  suite:'ro_fin_perdu', libelleSuite:"Rentrer" },

ro_laisser:{
  qui:'aldren',
  texte:[
    "@« Finissez. Je ne vous gêne pas. »",
    "Le heaume ne bouge pas pendant un long moment.",
    "« Vous êtes payé quatre cents couronnes pour me tuer. »",
    "« Oui. »",
    "« Et vous ne les prenez pas. »",
    "« Non. »",
    { sobre:"« Pourquoi ? »",
      intense:"« Pourquoi ? » Et la voix, pour la première fois de la nuit, a quelque chose dedans — pas de la gratitude : de la méfiance professionnelle. Un homme qui reçoit quelque chose sans l'avoir demandé cherche d'abord ce qu'on lui prend en échange.",
      extreme:"« Pourquoi ? » Et la voix a, pour la première fois, quelque chose dedans — pas de la gratitude : de la méfiance. Un homme qui reçoit quelque chose sans l'avoir demandé cherche d'abord ce qu'on lui prend en échange, et Ser Aldren a passé six semaines dans une maison où on l'a très bien reçu." },
    "« Parce que ma maison a été rayée pendant que des gens regardaient dans un couloir. »",
    "Vous ne l'avez pas décidé. C'est sorti, dans une lande, à quatre lieues de tout, devant la seule personne du monde connu à qui ça ne servira à rien.",
    "§ Il ne demande pas quelle maison. C'est peut-être la chose la plus élégante qu'un homme ait faite pour vous depuis dix-neuf ans.",
    "« Alors nous ne nous reverrons pas », dit Ser Aldren. « Ne redescendez pas à Rochebrune avant Floréal. »",
    "Il remonte à cheval. Le cheval part au pas, vers l'ouest, sans se retourner.",
  ],
  effets:{ flags:['ro_laisse','ro_aldren_vivant'], cout:{ moral:-6 }, suspicion:4,
           marque:"Vous avez laissé Ser Aldren finir sa liste, et vous lui avez dit pourquoi.",
           court:"Finissez" },
  suite:'ro_fin_liste', libelleSuite:"Redescendre" },

ro_vivant:{
  qui:'aldren',
  texte:[
    "@« Je vous ramène à Rochebrune. Vivant. »",
    "« Pour quoi faire ? »",
    "« Pour que quatorze noms soient dits à voix haute dans une salle. »",
    { sobre:"Le heaume s'incline. C'est peut-être un rire.",
      intense:"Le heaume s'incline de côté et il y a un son dedans, court, qui est peut-être un rire et qui est peut-être autre chose — un homme sans lèvres ne rit pas comme les autres et on ne s'y habitue pas.",
      extreme:"Le heaume s'incline et il y a un son dedans, court et sec. Un homme sans lèvres ne rit pas comme les autres : ça sort par les ouvertures du nez, ça ne module pas, et on ne s'y habitue jamais." },
    "« Vous croyez qu'ils écouteront. »",
    "« Ils écouteront s'il y a quatorze cadres sur la table. »",
    "« Il y en a onze dans la chapelle et trois dans un fossé. »",
    "« Alors on ira les chercher. »",
    "Long silence. Le vent d'ouest, l'ajonc, deux hommes debout dans le noir.",
    "§ « D'accord », dit Ser Aldren. Et c'est le mot le plus effrayant de toute cette affaire, parce qu'il veut dire qu'il y a pensé avant vous.",
    "Il tend son épée par la lame.",
    "« Une condition, messire. Vous ne me quittez pas. Pas une heure, pas la nuit, pas pour aller pisser. Parce que si vous me quittez une heure dans cette maison, il y aura un accident très regrettable et vous aurez ramené un mort. »",
  ],
  effets:{ flags:['ro_vivant','ro_aldren_vivant'], cout:{ moral:4 },
           exploit:{ eclat:7, temoins:'aucun', quoi:"vous avez ramené le chevalier sans visage vivant" },
           marque:"Ser Aldren s'est rendu, à condition que vous ne le quittiez pas.", court:"Vivant" },
  suite:'ro_fin_vivant', libelleSuite:"Redescendre" },

};
Object.assign(ARC_C02, ARC_C02_5);

/* ══ LES ISSUES ═══════════════════════════════════════════════════════════ */
const ARC_C02_6 = {

ro_fin_tue:{
  lieu:"Rochebrune · trois jours plus tard",
  titre:"Ce qu'on rapporte de la lande",
  qui:'guichard',
  texte:[
    "Vous rapportez le heaume. C'est tout ce qu'il y a à rapporter et c'est ce que demandent tous les contrats de ce genre : une pièce qu'on puisse poser sur une table.",
    "Guichard de Rochebrune la regarde longtemps sans y toucher.",
    "« Il est mort ? »",
    "« Oui. »",
    "« Il a dit quelque chose ? »",
    "§ Voilà la seule question que les commanditaires posent toujours et à laquelle il n'y a jamais de bonne réponse.",
    () => a('ro_sait_baudoin')
      ? "Ser Baudoin d'Escaut entre dans la salle d'armes à ce moment-là, parce qu'un homme aimé entre partout, et il vient serrer l'avant-bras du Paria qui a sauvé la maison.\n\nIl le fait bien. Il le fait avec une chaleur parfaitement authentique — et c'est ça qui est intolérable : il n'y a rien de faux dans cet homme, il a fait ce qu'il a fait et il est aussi sincèrement soulagé qu'un autre."
      : "Un homme de quarante ans que vous n'avez jamais vu entre dans la salle d'armes et vient vous serrer l'avant-bras avec une chaleur parfaitement authentique. On vous dit son nom. Vous l'oubliez dans l'heure.",
    () => a('ro_ermengarde')
      ? "Ermengarde de Rochebrune ne descend pas. Elle est dans la chapelle, où elle est toujours, avec onze cadres de noisetier qu'on ne peut plus rendre à personne."
      : "",
    "On vous paie dans la cour, en pièces comptées deux fois, par un régisseur consciencieux qui a l'air très fatigué.",
  ],
  issue:"L'affaire est close",
  bilan:"Le chevalier sans visage est mort, et la maison de Rochebrune est lavée",
  apres:[
    () => a('ro_tue_rengaine')
      ? "Il avait rengainé. Vous l'avez tué après. C'est parfaitement conforme au contrat et il n'y a rien à en dire de plus, et vous y penserez pendant des années."
      : (a('ro_heaume_ote')
        ? "Vous lui avez ôté le heaume avant. Vous êtes la seule personne vivante à savoir à quoi il ressemblait, et vous n'avez rien fait de cette connaissance."
        : "Vous lui avez laissé son heaume. C'est peu. C'était tout ce qui restait à décider."),
    () => a('ro_sait_baudoin')
      ? "Ser Baudoin d'Escaut dort. Il a recommencé à dormir la semaine de votre départ, et il dormira très bien pendant vingt ans."
      : "",
    () => a('ro_coutume')
      ? "Ermengarde de Rochebrune a obtenu ce qu'elle voulait de cette affaire : quelque chose que sa maison ne contrôle pas. Elle quittera Rochebrune dans l'année."
      : "",
  ],
  plusTard:"Onze cadres de noisetier restent dans une chapelle de la Côte des Dents. Personne ne sait quoi en faire et personne n'ose les brûler.",
},

ro_fin_liste:{
  lieu:"Sur la route · loin de la Côte des Dents",
  titre:"Floréal",
  texte:[
    "Vous ne redescendez pas à Rochebrune. C'est ce qu'il a dit et c'est le seul conseil qu'on vous ait donné gratuitement de toute cette affaire.",
    "La nouvelle vous rattrape en Floréal, sur une route, par un colporteur qui ne sait pas ce qu'il raconte.",
    { sobre:"Ser Baudoin d'Escaut est mort à la tour de guet. Puis le seigneur de Rochebrune.",
      intense:"Ser Baudoin d'Escaut est mort à la tour de guet, seul, un vendredi. On l'a trouvé assis contre la rambarde avec deux gobelets à côté de lui, dont un vide et un plein — et il avait son visage, ce qui a beaucoup troublé tout le monde et n'a été expliqué à personne.",
      extreme:"Ser Baudoin d'Escaut est mort à la tour de guet, seul, un vendredi soir. On l'a trouvé assis contre la rambarde avec deux gobelets, l'un vide et l'autre plein — et il avait son visage, entier, ce qui a troublé toute la province et n'a jamais été expliqué. On n'a pas compris que c'était le seul honneur qu'un homme sans figure pouvait rendre à un homme qui avait fait quelque chose." },
    "Guichard de Rochebrune est mort trois semaines plus tard. Lui n'avait plus son visage.",
    "§ Douze. Puis rien. La liste est finie et on n'a plus jamais entendu parler du cavalier noir de la Côte des Dents.",
    "Rochebrune passe à Ermengarde, qui a vingt-six ans, qui est veuve, et qui a passé deux ans à s'asseoir dans une chapelle à côté de onze cadres.",
  ],
  issue:"L'affaire n'est pas remplie",
  bilan:"Vous avez laissé un homme finir sa liste",
  apres:[
    "Vous n'avez pas touché les quatre cents couronnes. Vous n'avez pas rempli le contrat. Sur la Côte des Dents, on dira que le Paria a échoué, et c'est la version qui restera parce que c'est la seule que quelqu'un ait intérêt à raconter.",
    () => a('ro_heaume_rendu')
      ? "Vous lui avez rendu son heaume. C'est le seul geste de toute cette affaire qui n'ait servi à personne d'autre qu'à lui."
      : "",
    () => a('ro_ermengarde_accord') || a('ro_ermengarde_froid')
      ? "Ermengarde de Rochebrune tient la maison. Elle a fait brûler les onze cadres au solstice, dans la cour, devant tout le monde, et elle a lu les onze noms à voix haute avant."
      : "Ermengarde de Rochebrune tient la maison. On dit qu'elle a fait brûler quelque chose dans la cour au solstice.",
  ],
  plusTard:"Un homme sans visage vit quelque part sur une lande de quatre lieues sur deux, sans liste, avec des yeux qui ne se ferment pas. Il a trente-quatre ans.",
},

ro_fin_vivant:{
  lieu:"Rochebrune · la salle d'armes · toute la maison debout",
  titre:"Quatorze noms",
  texte:[
    "Il n'y a pas de procès. Il n'y a jamais eu de procès dans une maison de côte et il n'y en aura pas ce jour-là : il y a une salle d'armes, quarante personnes, un homme en harnois qu'on n'a pas désarmé parce que personne n'a osé, et quatorze cadres de noisetier sur une table.",
    "Onze pleins. Trois vides — on est allé chercher les deux du fossé, et le quatorzième n'a jamais été monté.",
    { sobre:"Il les lit. Il lit les quatorze noms à voix haute, dans l'ordre.",
      intense:"Il lit les quatorze noms à voix haute, dans l'ordre, en commençant par le quatorze. La voix sort du heaume, étouffée, traînante sur les dentales, et il met un temps considérable parce qu'un homme sans lèvres articule mal et qu'il tient à ce qu'on comprenne chaque nom.",
      extreme:"Il lit les quatorze noms à voix haute, dans l'ordre, en commençant par le quatorze. La voix sort du heaume, étouffée, traînante sur les dentales, et il met un temps considérable — un homme sans lèvres articule mal, il contourne les mots, il reprend, et il tient absolument à ce que chaque nom soit compris. Personne ne bouge pendant les quatorze. Deux femmes sortent au huitième." },
    "Puis le numéro un.",
    "Ser Baudoin d'Escaut est dans la salle. Il ne fuit pas. Il aurait pu fuir toute la semaine et il ne l'a pas fait, ce qui n'est pas de la bravoure — c'est un homme très fatigué qui vient de comprendre que quelqu'un a enfin réglé le problème à sa place.",
    "§ Il ne nie pas. C'est ça qui casse la maison en deux : personne n'avait prévu qu'il ne nierait pas.",
    "Guichard de Rochebrune fait pendre son beau-frère le surlendemain, dans la cour, devant sa propre sœur, et cette maison ne s'en remettra pas de son vivant.",
    "Ser Aldren est pendu le même jour, à la même heure, à la poutre voisine, parce qu'il a tué onze hommes et que c'est aussi la loi.",
    "Il n'a pas discuté ce point une seule fois.",
  ],
  issue:"L'affaire est close autrement",
  bilan:"Quatorze noms ont été dits à voix haute, et deux hommes ont été pendus",
  apres:[
    "Vous avez rempli le contrat au sens le plus strict : vous avez trouvé Ser Aldren et il est mort. On vous paie les quatre cents couronnes sans un mot, dans une cour où plus personne ne se parle.",
    "C'est la seule fin de cette affaire où la chose est dite. C'est aussi celle qui coûte le plus cher au plus grand nombre, et vous n'avez pas décidé ça tout seul : lui aussi savait comment ça finirait, et il est monté quand même.",
    () => a('ro_ermengarde')
      ? "Ermengarde de Rochebrune était dans la salle. Elle a entendu son nom prononcé au septième rang, parce qu'elle avait quinze ans et qu'elle était dans le couloir, et Ser Aldren compte tout le monde."
      : "",
  ],
  plusTard:"Une maison de la Côte des Dents a pendu son propre sang devant sa propre cour. Les provinces retiennent ce genre de choses beaucoup plus longtemps qu'un mercenaire ne l'imagine.",
},

ro_fin_parti:{
  lieu:"Sur la route du sud",
  titre:"Descendre",
  texte:[
    "Vous descendez l'escalier, ou vous tournez le cheval, ou vous sortez du corps de garde — selon l'endroit où vous étiez quand vous avez décidé — et vous ne revenez pas.",
    "Il n'y a pas de scène. C'est ce qu'il y a de plus étrange dans les décisions de ce genre : elles n'ont pas de scène. On s'en va, et le monde continue exactement comme il aurait continué.",
    { sobre:"Vous ne touchez rien. Vous ne devez rien. Vous n'avez rien fait.",
      intense:"Vous ne touchez pas les quatre cents couronnes, vous ne devez rien à personne, et vous n'avez rien fait — ni pour Rochebrune, ni contre, ni pour l'homme au heaume. Trois semaines de route et d'enquête pour arriver exactement là où vous seriez arrivé en ne prenant pas la lettre.",
      extreme:"Vous ne touchez pas l'or, vous ne devez rien, et vous n'avez rien fait — ni pour Rochebrune, ni contre, ni pour l'homme au heaume. Trois semaines de route, une maison ouverte en deux, une femme qui vous a dit à voix haute ce qu'elle taisait depuis deux ans, et vous arrivez très exactement là où vous seriez arrivé en ne prenant pas la lettre." },
    "§ Sauf que vous savez. C'est la seule chose que vous emportez et elle ne se revend pas.",
  ],
  issue:"L'affaire est abandonnée",
  bilan:"Vous êtes descendu et vous n'avez rien fait",
  apres:[
    "Sur la Côte des Dents, on dira que le Paria est venu, qu'il a posé des questions pendant trois semaines, et qu'il est reparti. C'est exact.",
    "La liste continue de descendre. Elle arrivera au numéro un quand elle y arrivera.",
  ],
  plusTard:"Deux ans plus tard, quelqu'un vous demandera si vous avez connu l'affaire du chevalier sans visage. Vous direz non.",
},

ro_fin_perdu:{
  lieu:"Rochebrune · deux jours de marche plus tard",
  titre:"À pied",
  qui:'guichard',
  texte:[
    "On rentre à pied. C'est deux jours de lande, sans épée, avec ce qu'on porte, et personne ne vous a proposé de cheval parce qu'il n'y avait personne.",
    "Guichard de Rochebrune vous reçoit debout et il vous écoute jusqu'au bout, ce qui est plus que ce que font la plupart des commanditaires.",
    "« Il a dit Floréal. »",
    "« Floréal. »",
    { sobre:"Il s'assied. C'est la première fois qu'il s'assied devant vous.",
      intense:"Il s'assied. C'est la première fois de toute l'affaire qu'il s'assied devant vous, et il le fait comme un homme de cinquante-trois ans qui vient d'apprendre le mois de sa mort avec une précision qu'il n'avait pas demandée.",
      extreme:"Il s'assied — la première fois de toute l'affaire — comme un homme de cinquante-trois ans qui vient d'apprendre le mois de sa propre mort avec une précision qu'il n'avait pas demandée. Il ne pleure pas et il ne crie pas. Il regarde le mur d'armes en face de lui, où il y a onze épées de garnison qui n'ont servi à rien." },
    "« Il vous a laissé la vie. »",
    "« Il a dit que je n'étais pas sur la liste. »",
    "« Non », dit Guichard de Rochebrune. « Vous n'y êtes pas. C'est bien ce que je lui reproche. »",
    "§ On vous paie le tiers, l'usage des maisons du nord. Le régisseur s'excuse à voix basse.",
  ],
  issue:"L'affaire est perdue",
  bilan:"Vous avez été battu, et il vous a laissé la vie",
  apres:[
    () => `${ETAT.blessures.length} blessure${ETAT.blessures.length > 1 ? 's' : ''}, deux jours de lande à pied, et le tiers de quatre cents couronnes.`,
    "Ser Aldren descendra jusqu'au numéro un. Il l'a annoncé, avec le mois, à l'homme qu'il tuera en dernier — ce qui n'est pas de la cruauté : c'est un chevalier qui prévient.",
  ],
  plusTard:"Vous n'êtes pas sur la liste. C'est la seule chose que Ser Aldren vous ait donnée, et il vous faudra des années pour décider si c'était un cadeau.",
},

};
Object.assign(ARC_C02, ARC_C02_6);

/* La traque s'ouvre depuis l'audience, et les issues rendent la main. */
ARC_C02.ro_audience.choix.push({
  t:"Monter sur la lande",
  detail:"On ne prépare bien qu'avec ce qu'on sait · et la nuit tombe tôt sur la côte",
  va:'ro_traque',
});
for(const id of ['ro_fin_tue','ro_fin_liste','ro_fin_vivant','ro_fin_parti','ro_fin_perdu']){
  ARC_C02[id].suite = 'entre_saisons';
  ARC_C02[id].libelleSuite = "Reprendre la route";
}

enregistrerScenes(ARC_C02);
