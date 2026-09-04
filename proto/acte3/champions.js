/* PARIAS — Acte III · CEUX QUI VIENNENT EUX-MÊMES
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Quatre personnes n'envoient pas d'hommes. Ce n'est pas qu'elles n'en ont
 * pas — Charles en a vingt et Chastel en a trois cents. C'est qu'aucune des
 * quatre ne considère qu'une compagnie soit l'outil adapté au problème.
 *
 * Elles arrivent après le siège, une par une, dans l'ordre de ce qu'elles
 * pèsent. Et aucune des quatre ne veut la même chose :
 *
 *   RENAUD SORGUE  finit une phrase commencée il y a neuf ans dans un
 *                  rond de neuf pas. Il avait cinquante-deux ans ; il en a
 *                  soixante et un. Vous en aviez vingt-neuf.
 *
 *   CHARLES        ne se bat pas. Il sert un papier, ce qui est pire, et
 *                  il a raison — il a toujours eu raison, c'est toute la
 *                  difficulté de sa vie et il la traîne depuis trente ans.
 *
 *   GUILLAUME      n'est pas un ennemi et n'en a jamais été un. Il vient
 *   DE SAULT       écrire trois lignes, parce qu'il est le seul homme au
 *                  monde à tenir un registre de ce que vous avez fait.
 *
 *   YSABEL         a déjà rayé cette maison une fois, à Germinal de la
 *                  cent-quarante-troisième année. Elle sait comment on
 *                  s'y prend. Vous l'avez laissée vivante.
 *
 * AUCUNE DE CES QUATRE SCÈNES NE SE GAGNE PAR LES ARMES. Deux se finissent
 * sans qu'on dégaine, une se finit avec un papier, et celle qui se bat est
 * la moins importante des quatre.
 * ═══════════════════════════════════════════════════════════════════════ */

/* Ceux qu'on n'a pas encore vus. La file se vide une confrontation à la
 * fois, et l'épilogue ne s'ouvre qu'après. */
function championsRestants(){
  return championsContre().filter(c => !a('in_fait_' + c.id));
}

const CHAMPIONS = {

/* L'aiguillage. Il ne dit jamais combien il en reste : on l'apprend en les
 * voyant arriver, ce qui est la façon dont ces choses arrivent. */
a3_champions:{ dyn:true, texte:[] },

/* ══════════════════════════════════════════════════════════════════════════
 * RENAUD SORGUE · soixante et un ans
 *
 * Il l'a dit lui-même, il y a neuf ans, à la fin du deuxième temps :
 * « Après ce temps-là, il n'y a plus de règlement. Il n'y a plus qu'un
 * homme de cinquante-deux ans et un homme de vingt-neuf. »
 *
 * Il vient finir la phrase. L'écart s'est creusé du mauvais côté pour lui
 * et il le sait mieux que personne — c'est très exactement son métier de
 * savoir ce genre de chose. Il vient quand même.
 * ══════════════════════════════════════════════════════════════════════════ */
in_sorgue:{
  qui:'sorgue',
  lieu:"Karlsberg · la cour · au jour",
  titre:"Un homme de soixante et un ans",
  texte:[
    "Il arrive seul, à cheval, sans escorte et sans héraut, et il attend dans la cour qu'on veuille bien descendre. Il a mis quatre jours et il en mettra quatre pour repartir, s'il repart.",
    { sobre:"Il a soixante et un ans. Ça se voit et il ne le cache pas.",
      intense:"Il a soixante et un ans. Ça se voit à la façon dont il descend de cheval — en deux temps, en s'appuyant, sans se presser — et il ne fait rien du tout pour le cacher, ce qui est déjà un renseignement.",
      extreme:"Il a soixante et un ans et ça se voit à une seule chose : il descend de cheval en deux temps, la main gauche à plat sur le troussequin, en posant d'abord le pied droit.\n\nIl ne fait rigoureusement rien pour le dissimuler. Un homme de son métier qui laisse voir ça devant témoins a fait un calcul et l'a fait il y a longtemps : il n'y a plus rien à cacher, il ne travaille plus à l'illusion, et il économise ce qui lui reste pour l'endroit où ça comptera.\n\nC'est infiniment plus inquiétant que si vous ne l'aviez pas vu." },
    "« Chastel m'envoie », dit-il. « Ce n'est pas la raison pour laquelle je suis là, mais c'est la raison qui figurera sur le rôle, alors autant qu'elle soit dite en premier. »",
    "@« Et la vraie ? »",
    { sobre:"« Vous savez la vraie. »",
      intense:"« Vous la savez. » Il détache ses gants, un doigt à la fois. « Il n'y avait pas de troisième temps, ce soir-là. Je vous l'avais dit avant qu'on entre. »",
      extreme:"« Vous la savez, messire, et si vous ne la saviez pas vous ne seriez pas descendu seul dans une cour où un homme de Chastel attend à cheval. »\n\nIl détache ses gants, un doigt après l'autre, sans lever les yeux.\n\n« Il n'y avait pas de troisième temps, ce soir-là. Je vous l'avais annoncé avant qu'on entre dans le rond, et je l'ai répété au deuxième. J'ai dit : après ce temps-là il n'y a plus de règlement, il n'y a plus qu'un homme de cinquante-deux ans et un homme de vingt-neuf.\n\nJe n'ai pas menti. J'ai simplement été interrompu. »" },
    "§ Neuf ans. Il en a soixante et un. Vous en avez trente-huit.",
    { sobre:"^« L'écart s'est refermé. »",
      intense:"^« L'écart s'est refermé du mauvais côté pour moi », dit-il, et il le dit comme on lit un relevé. « Vingt-trois ans d'écart, alors. Vingt-trois aujourd'hui. Sauf que vingt-neuf contre cinquante-deux et trente-huit contre soixante et un, ce n'est pas la même arithmétique. »",
      extreme:"^« L'écart n'a pas bougé et il s'est refermé quand même », dit-il, exactement du ton dont il lisait les règles du rond. « C'est ce que je n'avais pas prévu à cinquante-deux ans.\n\nVingt-trois ans nous séparaient alors, vingt-trois nous séparent aujourd'hui. Mais vingt-neuf contre cinquante-deux, c'est un homme qui a l'expérience contre un homme qui a le souffle. Trente-huit contre soixante et un, c'est un homme qui a les deux contre un homme qui n'a plus que l'expérience.\n\nJe le sais. C'est même ma spécialité, savoir ce genre de chose. Quarante et un duels, et je n'en ai jamais perdu un parce que je m'étais trompé sur l'arithmétique. »\n\nIl finit avec le gant gauche.\n\n« Je suis venu quand même. Ça devrait vous renseigner sur ce que ce soir-là m'a coûté. »" },
  ],
  effets:{ flags:['in_sorgue_vu'],
           marque:"Renaud Sorgue est venu seul à Karlsberg. Soixante et un ans, et une phrase à finir.",
           court:"Soixante et un ans" },
  choix:[
    { t:"Tracer le rond",
      detail:"neuf pas · trois temps chacun · il n'a jamais demandé autre chose",
      risque:"définitif", va:'in_so_rond' },

    { t:"« Non. »",
      detail:"un homme de soixante et un ans qui a fait quatre jours de route · et vous dites non",
      risque:"calculé", va:'in_so_non' },

    { t:"Lui demander ce que Chastel a écrit",
      detail:"Perception · lettres — il a dit *ce qui figurera sur le rôle*, et il l'a dit exprès",
      risque:"favorable",
      test:{ carac:'perception', comp:'lettres', dc:11, adversaire:'sorgue', manoeuvre:'role' },
      degres:{ dominante:'in_so_role_dom', nette:'in_so_role_dom', couteuse:'in_so_role_ok',
               echec:'in_so_role_ko', catastrophe:'in_so_role_ko' } },
  ],
},

in_so_role_dom:{
  qui:'sorgue',
  titre:"Ce qui figurera sur le rôle",
  texte:[
    "@« Vous avez dit : *la raison qui figurera sur le rôle*. Vous l'avez dit avant tout le reste. »",
    { sobre:"Il ne bouge pas.",
      intense:"Il ne bouge pas et il ne répond pas tout de suite, ce qu'il n'a pas fait une seule fois de sa vie devant quarante personnes.",
      extreme:"Il ne bouge pas. Il ne répond pas tout de suite non plus, ce qu'un homme qui a passé quarante et un duels à ne jamais mettre une seconde de trop ne fait pas par hasard.\n\nUn homme qui annonce sa raison officielle en premier, avant même de se présenter, ne le fait que pour une chose : pour que vous entendiez qu'il y en a une autre, et pour ne pas avoir à vous la dire." },
    "^« Chastel a porté : *sommation d'avoir à comparaître, avec assistance armée si refus*. »",
    "@« C'est une arrestation. »",
    { sobre:"« C'est une arrestation. »",
      intense:"« C'est une arrestation, oui. » Il remet ses gants dans sa ceinture. « Et j'ai quarante-huit hommes à trois lieues d'ici qui attendent que je fasse un signe de la main. »",
      extreme:"« C'est une arrestation, oui. »\n\nIl range les gants dans sa ceinture, posément.\n\n« Et j'ai quarante-huit hommes de Chastel à trois lieues d'ici, dans le bois de la crête est, qui attendent depuis hier soir que je fasse un signe du bras. C'est ainsi qu'on va chercher un homme qui a tenu un siège. »\n\nUn temps.\n\n« Je ne l'ai pas fait. Je suis descendu seul dans votre cour et je vous ai parlé du rond avant de vous parler du rôle, ce qui est une faute assez grave, dans mon métier, pour que je perde ma charge si quelqu'un la rapporte.\n\nParce que si je fais le signe, il n'y aura pas de rond. Il y aura quarante-huit hommes, et ça ne m'intéresse pas. »" },
    "§ Voilà la vraie raison. Elle tenait dans l'ordre de deux phrases et il vous a laissé douze secondes pour l'entendre.",
  ],
  effets:{ flags:['in_so_quarante_huit'],
           exploit:{ eclat:3, temoins:'quelques', quoi:"vous avez entendu ce qu'il avait mis dans l'ordre de ses phrases" },
           marque:"Quarante-huit hommes à trois lieues, et il n'a pas fait le signe.",
           court:"Le signe" },
  choix:[
    { t:"Tracer le rond",
      detail:"il a payé sa charge pour l'avoir · c'est le prix qu'il y met",
      risque:"définitif", va:'in_so_rond' },
    { t:"« Faites le signe. »",
      detail:"quarante-huit hommes, et une maison qui vient de tenir un siège",
      risque:"définitif",
      ferme:"Ferme : ce que neuf ans de silence entre vous valaient",
      va:'in_so_signe' },
  ],
},

in_so_role_ok:{
  qui:'sorgue',
  titre:"Le rôle",
  texte:[
    "@« Qu'est-ce que Chastel a écrit exactement ? »",
    "« Une sommation. Avec assistance armée en cas de refus. »",
    "@« Combien d'hommes ? »",
    "« Assez. » Il remet ses gants dans sa ceinture. « Je ne suis pas venu vous les compter. »",
    "§ Il y a autre chose et vous ne l'obtiendrez pas. Cet homme a passé quarante ans à ne dire que ce qu'il a décidé de dire.",
  ],
  effets:{ marque:"Une sommation, avec assistance armée. Il n'a pas voulu compter.",
           court:"Une sommation" },
  choix:[
    { t:"Tracer le rond",
      detail:"neuf pas · c'est tout ce qu'il a jamais demandé à personne",
      risque:"définitif", va:'in_so_rond' },
    { t:"« Non. »",
      detail:"et voir ce qu'il fait d'un refus",
      risque:"calculé", va:'in_so_non' },
  ],
},

in_so_role_ko:{
  qui:'sorgue',
  titre:"Il ne dira pas",
  texte:[
    "@« Qu'est-ce que Chastel a écrit ? »",
    "« Ce que Chastel écrit ne vous regarde pas encore. Ça vous regardera quand on vous le lira, et on vous le lira si vous refusez. »",
    "§ C'est net, c'est courtois, et ça ferme la porte proprement.",
  ],
  effets:{ marque:"Il n'a pas dit ce que Chastel avait écrit.", court:"Pas encore" },
  choix:[
    { t:"Tracer le rond",
      detail:"neuf pas · c'est tout ce qu'il a jamais demandé",
      risque:"définitif", va:'in_so_rond' },
    { t:"« Non. »",
      detail:"un homme de soixante et un ans, quatre jours de route, et un refus",
      risque:"calculé", va:'in_so_non' },
  ],
},

in_so_signe:{
  qui:'sorgue',
  titre:"Quarante-huit",
  texte:[
    "@« Faites le signe. »",
    { sobre:"Il met un temps très long.",
      intense:"Il met un temps très long. Puis il hoche la tête une fois, remonte à cheval — en deux temps, en s'appuyant — et lève le bras droit vers la crête est.",
      extreme:"Il met un temps très long, et pendant ce temps-là il vous regarde d'une façon qu'il n'a pas eue une seule fois depuis qu'il est descendu de cheval.\n\nCe n'est ni de la déception ni du soulagement. C'est le regard d'un homme qui vient de recevoir un renseignement définitif sur quelqu'un et qui le range.\n\nPuis il hoche la tête une fois, remonte en selle en deux temps, la main gauche au troussequin, et lève le bras droit vers le bois de la crête est." },
    "§ Il y a une chose que personne ne dit sur les sièges : le second est toujours plus court que le premier.",
    { sobre:"Karlsberg tient trois jours.",
      intense:"Karlsberg tient trois jours contre quarante-huit hommes de Chastel, ce qui est beaucoup plus que quiconque n'aurait parié, et beaucoup moins que ce qu'il aurait fallu.\n\nSorgue commande. Il ne descend jamais de cheval et il ne fait aucune faute.",
      extreme:"Karlsberg tient trois jours contre quarante-huit hommes de Chastel.\n\nC'est considérablement plus que ce que quiconque aurait parié — quarante-huit hommes d'une maison de province prennent un fort en une journée — et considérablement moins que ce qu'il aurait fallu.\n\nRenaud Sorgue commande du dehors, à cheval, à quatre cents pas. Il ne descend pas une seule fois, il ne s'approche pas une seule fois, et il ne commet pas une seule faute en trois jours.\n\nIl n'est jamais entré dans un rond avec vous. C'est la seule chose qu'il ait obtenue de cette affaire et il n'en voulait aucune autre." },
  ],
  effets:{ flags:['in_sorgue_fait','in_fait_sorgue','a3_chastel_venu','a3_tombee'],
           cout:{ moral:14 },
           marque:"Vous lui avez dit de faire le signe. Quarante-huit hommes, et trois jours.",
           court:"Le signe" },
  suite:'a3_champions', libelleSuite:"Après" },

in_so_non:{
  qui:'sorgue',
  titre:"Non",
  texte:[
    "@« Non. »",
    { sobre:"Il hoche la tête. Il ne discute pas.",
      intense:"Il hoche la tête. Il ne discute pas une seconde, ce qui est parfaitement dans sa manière et ce qui rend la chose difficile.\n\n« C'est votre droit. Il n'y a pas de règle qui oblige un homme à entrer dans un rond. »",
      extreme:"Il hoche la tête une fois. Il ne discute pas, ne plaide pas, n'insiste d'aucune façon — parfaitement dans sa manière, et c'est très exactement ce qui rend la chose difficile à faire.\n\n« C'est votre droit », dit-il. « Il n'y a aucune règle au monde qui oblige un homme à entrer dans un rond, et j'ai passé quarante ans à expliquer ça à des gens qui ne voulaient pas l'entendre. »\n\nIl remonte à cheval. En deux temps." },
    { sobre:"À vingt pas, il s'arrête.",
      intense:"À vingt pas, il arrête son cheval sans se retourner.\n\n« Vous auriez gagné », dit-il. « Je le dis parce que c'est vrai et parce que je n'aurai pas d'autre occasion de le dire. »",
      extreme:"À vingt pas, il arrête son cheval. Il ne se retourne pas.\n\n« Vous auriez gagné, messire. »\n\nUn temps.\n\n« Je le dis parce que c'est vrai, parce que je sais reconnaître ce genre de chose mieux que quiconque dans quatre provinces, et parce que je n'aurai aucune autre occasion de le dire à personne.\n\nJ'avais quatre-vingt-dix secondes dans les jambes. Peut-être cent. C'est le calcul que j'ai fait pendant quatre jours de route et je l'ai refait chaque soir en espérant m'être trompé. »\n\nIl repart au pas.\n\n« Ne le dites à personne. Ça ne servirait qu'à moi. »" },
    "§ Il fait quatre jours de route dans l'autre sens. Chastel le remplace dans l'année.",
  ],
  effets:{ flags:['in_sorgue_fait','in_fait_sorgue','in_so_refuse'],
           faire:() => { ETAT.renom = Math.max(0, ETAT.renom - 3); },
           exploit:{ eclat:2, temoins:'quelques', quoi:"vous avez refusé le rond à un homme de soixante et un ans" },
           marque:"Vous avez refusé le rond. « Vous auriez gagné. Ne le dites à personne. »",
           court:"Quatre-vingt-dix secondes" },
  suite:'a3_champions', libelleSuite:"Après" },

/* ── Le rond, une seconde fois ──────────────────────────────────────────── */
in_so_rond:{
  melee:true, qui:'sorgue',
  lieu:"Karlsberg · la cour · à la craie",
  titre:"Neuf pas, neuf ans plus tard",
  texte:[
    "Il trace le rond lui-même, à la craie, sur les pavés de votre cour. Neuf pas, mesurés au pied, en marchant — et il met sensiblement plus longtemps qu'il y a neuf ans.",
    { sobre:"La maison entière est sortie. Personne ne dit rien.",
      intense:"La maison entière est sortie et s'est rangée contre les murs sans qu'on le lui demande. Trois cents personnes, et pas un bruit : elles savent toutes qui est cet homme parce qu'on leur a raconté l'assise d'hiver pendant neuf ans.",
      extreme:"La maison entière est sortie et s'est rangée d'elle-même contre les murs de la cour, à la distance exacte où l'on se met quand on a déjà vu ça ou qu'on l'a assez entendu raconter.\n\nTrois cents personnes. Pas un bruit, pas un pari, pas un commentaire.\n\nElles savent toutes qui est cet homme. On leur a raconté l'assise d'hiver pendant neuf ans, tous les hivers, et l'histoire s'est considérablement améliorée en route — mais le nom, lui, n'a pas bougé d'un pouce." },
    "« Trois temps chacun », dit-il. « Comme la dernière fois. »",
    "@« Vous n'en aviez pris qu'un. »",
    "« J'en prendrai trois. » Il n'y a pas d'humour là-dedans. « C'est l'autre chose qui change à soixante et un ans : on prend tous ses temps, et on les prend tôt. »",
    { sobre:"§ Il salue. Le salut est exactement le même.",
      intense:"§ Il salue, et le salut est exactement le même qu'il y a neuf ans : pointe basse, pied arrière, la tête qui ne dépasse pas ce qu'elle doit dépasser. Pas un pouce de perdu.\n\nC'est la dernière chose de cet homme qui n'ait pas vieilli.",
      extreme:"§ Il salue, et le salut est rigoureusement identique à celui d'il y a neuf ans. Pointe basse. Pied arrière. Une inclinaison de tête qui ne dépasse pas d'un pouce ce qu'elle doit dépasser.\n\nPas un cheveu de perdu, pas une hésitation, pas un tremblement.\n\nC'est la dernière chose chez cet homme qui n'ait pas vieilli, et il le sait, et c'est probablement la raison pour laquelle il l'a fait si lentement." },
  ],
  effets:{ melee:{ position:"dans le rond, à neuf pas", note:"Trois temps chacun · il les prendra tôt" } },
  choix:[
    { t:"Le laisser venir",
      detail:"Endurance · esquive — il a quatre-vingt-dix secondes et il le sait",
      risque:"favorable",
      test:{ carac:'endurance', comp:'esquive', dc:11, adversaire:'sorgue', manoeuvre:'attente',
             situation:() => a('as_sorgue_cede') ? 2 : 0 },
      degres:{ dominante:'in_so_attente', nette:'in_so_attente', couteuse:'in_so_cout',
               echec:'in_so_ko', catastrophe:'in_so_ko' } },

    { t:"Entrer dedans tout de suite",
      detail:"Force · épées — ne pas lui laisser ses quatre-vingt-dix secondes",
      risque:"risqué",
      test:{ carac:'force', comp:'epees', dc:13, adversaire:'sorgue', manoeuvre:'entree',
             cout:{ endurance:14 } },
      degres:{ dominante:'in_so_entree', nette:'in_so_entree', couteuse:'in_so_cout',
               echec:'in_so_ko', catastrophe:'in_so_ko' } },

    { t:"Ne pas frapper. Du tout",
      detail:"tenir la garde et ne rien lancer · il faudra qu'il vienne trois fois",
      risque:"calculé", va:'in_so_rien' },
  ],
},

in_so_attente:{
  melee:true, qui:'sorgue',
  titre:"Quatre-vingt-dix secondes",
  texte:[
    "Vous ne faites rien. C'est très difficile devant trois cents personnes et c'est la seule réponse.",
    { sobre:"Il vient. Il vient bien, et il vient vite.",
      intense:"Il vient, et il vient extraordinairement bien : les mêmes appels, la même pointe haute, la même main de fer — quarante et un duels ne se désapprennent pas en neuf ans.\n\nCe qui ne tient pas, c'est le reste.",
      extreme:"Il vient, et il vient extraordinairement bien.\n\nLes mêmes appels du pied. La même pointe qui ne va nulle part et qui vous oblige quand même à la regarder. La même façon de prendre la moitié du rond avant vous. Quarante et un duels judiciaires ne se désapprennent pas en neuf ans et ne se désapprendront jamais : à quatre-vingts ans il ferait encore ça mieux que n'importe qui.\n\nCe qui ne tient pas, ce n'est pas la main. C'est tout le reste." },
    { sobre:"À la quatre-vingtième seconde, la garde descend de trois pouces.",
      intense:"À la quatre-vingtième seconde, la garde descend de trois pouces. Pas par fatigue visible, pas par relâchement : le bras la descend tout seul, sans demander, et il n'y a rien à faire contre ça.\n\nIl le sent au moment où ça se produit. Il lève deux doigts.",
      extreme:"À la quatre-vingtième seconde, la garde descend de trois pouces.\n\nCe n'est pas de la fatigue visible. Il ne souffle pas, il ne ralentit pas, son visage ne dit rien du tout. Le bras descend la garde tout seul, sans demander la permission à personne, et il n'existe aucune volonté au monde qui fasse remonter un bras de soixante et un ans quand il a décidé.\n\nIl le sent à la seconde exacte où ça se produit — il a passé quarante ans à guetter ça chez les autres.\n\nIl lève deux doigts. Premier temps." },
    "§ Il en prendra deux autres. Il vous l'avait annoncé et il n'avait pas menti.",
    { sobre:"Au troisième, il baisse la lame lui-même.",
      intense:"Au troisième temps, il ne remonte pas la garde. Il baisse la lame, à hauteur de cuisse, et il reste comme ça au milieu du rond devant trois cents personnes.\n\n« Voilà », dit-il. « C'était ça, la phrase. »",
      extreme:"Au troisième temps, il ne remonte pas la garde.\n\nIl baisse la lame à hauteur de cuisse, il reste debout au milieu du rond, et il ne dit rien pendant un temps que personne dans cette cour n'ose interrompre.\n\n« Voilà », dit-il enfin. « C'était ça, la phrase. »\n\n@« Vous saviez. »\n\n« Depuis le premier soir. » Il regarde la craie. « Un homme de cinquante-deux ans et un homme de vingt-neuf : je vous ai dit ça il y a neuf ans en croyant que c'était une menace. C'en était une, à l'époque.\n\nJ'ai eu neuf ans pour comprendre que c'était une date. »" },
  ],
  effets:{ flags:['in_sorgue_fait','in_fait_sorgue','in_so_fini','in_so_epargne'],
           cout:{ endurance:24 },
           meleeMaj:{ eux:0, position:"debout dans le rond", note:"Il a baissé la lame lui-même" },
           exploit:{ eclat:10, temoins:'foule',
                     quoi:"vous avez laissé Renaud Sorgue finir sa phrase et il l'a finie tout seul" },
           marque:"Il a baissé la lame au troisième temps. « C'était ça, la phrase. »",
           court:"La phrase" },
  suite:'in_so_apres', libelleSuite:"Ce qu'on en fait" },

in_so_entree:{
  melee:true, qui:'sorgue',
  titre:"Ne pas lui donner ses secondes",
  texte:[
    "Vous entrez dedans à la première seconde, et cette fois vous savez pourquoi personne ne le fait — sauf que cette fois, c'est la bonne réponse.",
    { sobre:"Il n'a pas les jambes.",
      intense:"Il a la main. Il a toujours la main et il l'aura jusqu'au bout. Il n'a pas les jambes, et une entrée franche ne se pare pas avec la main : elle s'évite avec les jambes.",
      extreme:"Il a la main. Il a toujours la main, il l'aura jusqu'au dernier jour, et il vous détourne la première attaque avec une économie que personne d'autre au monde n'obtient.\n\nMais une entrée franche ne se pare pas avec la main. Elle s'évite avec les jambes, en cédant un demi-pas de côté au bon moment — et le bon moment, à soixante et un ans, arrive un tiers de seconde trop tard.\n\nUn tiers de seconde. C'est tout ce qui sépare cet homme de ce qu'il était." },
    "Vous êtes au contact en trois secondes, garde contre garde, et il n'y a plus d'escrime du tout.",
    { sobre:"Vous le mettez au sol. Il ne se relève pas seul.",
      intense:"Vous le mettez au sol de l'épaule. Il tombe correctement — il tombera correctement toute sa vie — et il ne se relève pas seul, et personne dans la cour ne bouge pour l'aider parce que personne n'ose.",
      extreme:"Vous le mettez au sol de l'épaule, sans élégance, avec tout le poids.\n\nIl tombe correctement. Il tombera correctement jusqu'à sa dernière heure, c'est la chose qu'on lui a apprise en premier et ce sera la dernière à partir.\n\nEt il ne se relève pas seul.\n\nTrois cents personnes regardent un homme de soixante et un ans essayer de se remettre debout sur des pavés, et pas une ne bouge — pas par cruauté : parce que personne n'ose lui faire ça.\n\nVous lui tendez la main. Il la prend, ce qui est de très loin la chose la plus dure qu'il ait faite de la journée." },
  ],
  effets:{ flags:['in_sorgue_fait','in_fait_sorgue','in_so_fini','in_so_battu'],
           cout:{ endurance:18 },
           meleeMaj:{ eux:0, position:"debout, la main tendue", note:"Il l'a prise" },
           exploit:{ eclat:8, temoins:'foule', quoi:"vous avez battu Renaud Sorgue en trois secondes" },
           marque:"Vous l'avez mis au sol en trois secondes. Il a pris la main que vous lui tendiez.",
           court:"Trois secondes" },
  suite:'in_so_apres', libelleSuite:"Ce qu'on en fait" },

in_so_rien:{
  melee:true, qui:'sorgue',
  titre:"Rien du tout",
  texte:[
    "Vous prenez la garde et vous ne lancez rien. Pas une attaque, pas une feinte, pas un déplacement d'intention. Rien.",
    { sobre:"Il comprend au bout de quarante secondes.",
      intense:"Il met quarante secondes à comprendre, ce qui est très long pour lui. Puis il s'arrête net au milieu du rond.\n\n« Ah », dit-il.",
      extreme:"Il met environ quarante secondes à comprendre, ce qui est très long pour un homme qui lit un adversaire en trois passes.\n\nPuis il s'arrête net au milieu du rond, la lame à mi-hauteur, et il ne bouge plus.\n\n« Ah », dit-il.\n\nC'est tout. De sa part c'est un discours entier et trois cents personnes viennent d'assister à quelque chose dont aucune ne saisit la nature." },
    { sobre:"^« Vous me faites marcher. »",
      intense:"^« Vous me faites marcher. » Il baisse la lame. « Il y a neuf ans, dans une salle de Cendrepont, j'ai dit à un homme de vingt-neuf ans qu'il ne m'avait pas encore fait marcher et que c'était la seule chose qui lui restait. »\n\n@« Vous vous en souvenez. »\n\n« Je me souviens de tout. C'est la partie du métier dont personne ne parle. »",
      extreme:"^« Vous me faites marcher. »\n\nIl baisse la lame complètement.\n\n« Il y a neuf ans, dans une salle de Cendrepont, entre le deuxième et le troisième temps, j'ai dit à un homme de vingt-neuf ans qu'il ne m'avait pas encore fait marcher et que c'était très exactement la seule chose qui lui restait à essayer. »\n\n@« Vous vous en souvenez. »\n\n« Je me souviens de tout, messire. De tout, dans l'ordre, avec le temps qu'il faisait. C'est la partie de ce métier dont personne ne parle jamais et c'est celle qui coûte le plus cher. »\n\nIl regarde le rond qu'il vient de tracer sur vos pavés.\n\n« Quarante et un duels. Je peux vous les réciter. Il n'y en a pas un seul dont j'aie envie. »" },
    "§ Il sort du rond de lui-même. Les deux pieds, franchement, sans que personne ait à le compter.",
  ],
  effets:{ flags:['in_sorgue_fait','in_fait_sorgue','in_so_fini','in_so_marche'],
           exploit:{ eclat:9, temoins:'foule',
                     quoi:"vous avez fait marcher Renaud Sorgue sans lever la lame une seule fois" },
           marque:"Vous ne l'avez pas touché une fois. Il est sorti du rond de lui-même.",
           court:"Il a marché" },
  suite:'in_so_apres', libelleSuite:"Ce qu'on en fait" },

in_so_cout:{
  melee:true, qui:'sorgue',
  titre:"Il a encore la main",
  texte:[
    "Il a soixante et un ans et il a encore la main, et vous l'apprenez de la façon dont on apprend ce genre de chose.",
    { sobre:"La pointe entre sous les côtes, à droite.",
      intense:"La pointe entre sous les côtes flottantes, à droite, sur trois pouces, et ressort. C'est mesuré, c'est propre, et ce n'était pas fait pour tuer — un homme qui a gagné quarante et un duels judiciaires n'a pas passé sa vie à tuer, il a passé sa vie à finir.",
      extreme:"La pointe entre sous les côtes flottantes, à droite, sur trois pouces exactement, et ressort par le même trajet.\n\nC'est mesuré, c'est propre, c'est placé à un demi-pouce de l'endroit où ça vous tuerait, et ça n'y est pas.\n\nUn homme qui a gagné quarante et un duels judiciaires n'a pas passé quarante ans à tuer des gens : il a passé quarante ans à **finir** des duels, ce qui n'est pas le même métier et ce qui demande infiniment plus de main." },
    "Vous le finissez quand même. Ça prend onze secondes de plus qu'il n'en avait, et onze secondes est précisément ce qui vous sépare.",
  ],
  effets:{ flags:['in_sorgue_fait','in_fait_sorgue','in_so_fini','in_so_battu'],
           cout:{ endurance:28, vitalite:20, sang:14 },
           meleeMaj:{ eux:0, position:"debout, ouvert au flanc", note:"Onze secondes de plus qu'il n'en avait" },
           faire:() => blesser({ id:'in_so_cotes', zone:"sous les côtes, à droite", type:"perforation nette",
                                 gravite:3, douleur:3, saignement:3, fonction:['endurance'],
                                 cicatrice:"une entrée et une sortie sous les côtes flottantes droites" }),
           exploit:{ eclat:7, temoins:'foule', quoi:"vous avez battu Renaud Sorgue, et il vous a ouvert le flanc" },
           marque:"Il vous a ouvert le flanc à soixante et un ans. Vous l'avez fini onze secondes plus tard.",
           court:"Onze secondes" },
  suite:'in_so_apres', libelleSuite:"Ce qu'on en fait" },

in_so_ko:{
  melee:true, qui:'sorgue',
  titre:"Quarante-deux",
  texte:[
    "Il vous a.",
    { sobre:"Il a soixante et un ans et il vous a, et il n'y a rien à en dire.",
      intense:"Il a soixante et un ans, quatre jours de route dans les jambes, une garde qui descend de trois pouces — et il vous a.\n\nIl n'y a rien à en dire. C'est ce qu'un homme fait quand il a passé quarante ans à faire une seule chose.",
      extreme:"Il a soixante et un ans. Il a quatre jours de route dans les jambes, une garde qui lui descend toute seule de trois pouces, et quatre-vingt-dix secondes en tout.\n\nIl vous a en soixante-dix.\n\nIl n'y a rigoureusement rien à en dire, aucune leçon à en tirer et aucun réconfort à y chercher. C'est ce qu'un homme obtient quand il a passé quarante ans à faire une seule chose et rien d'autre, et c'est pour cette raison exacte que Chastel n'a jamais apporté une cause qu'elle pouvait perdre." },
    "La pointe se pose sous votre mâchoire et n'y entre pas. Trois cents personnes de votre maison regardent.",
    "« Cédez », dit-il. Et plus bas, pour vous seul : « Ne les faites pas regarder ça. »",
  ],
  effets:{ flags:['in_sorgue_fait','in_fait_sorgue','in_so_fini','in_so_perdu'],
           cout:{ endurance:30, vitalite:22, sang:12, moral:10 },
           meleeMaj:{ eux:0, position:"à genoux sur vos propres pavés", note:"Quarante-deux" },
           faire:() => { ETAT.renom = Math.max(0, ETAT.renom - 10); },
           marque:"Il vous a battu dans votre propre cour. « Ne les faites pas regarder ça. »",
           court:"Quarante-deux" },
  suite:'in_so_apres', libelleSuite:"Ce qu'on en fait" },

in_so_apres:{
  qui:'sorgue',
  lieu:"Karlsberg · la cour · au soir",
  titre:"Ce qu'un homme fait de quarante et un duels",
  texte:[
    () => a('in_so_perdu')
      ? "Il ne vous emmène pas. Il aurait dû, il avait le rôle pour, et il ne le fait pas."
      : "Il reste jusqu'au soir. Personne ne lui demande de partir et il ne demande à personne s'il peut rester.",
    () => a('in_so_perdu')
      ? { sobre:"@« Vous avez une sommation. »\n\n« J'ai une sommation. J'ai aussi soixante et un ans. »",
          intense:"@« Vous avez une sommation. »\n\n« J'ai une sommation, oui. » Il la sort, la regarde, la remet. « J'ai aussi soixante et un ans, quarante et un duels, et exactement une chose que je voulais de vous. Je l'ai eue ce matin.\n\nChastel voulait autre chose. Chastel n'a qu'à venir la chercher elle-même. »",
          extreme:"@« Vous avez une sommation. »\n\n« J'ai une sommation, oui. »\n\nIl la sort de son pourpoint, la déplie, la regarde comme on regarde un objet qui appartient à quelqu'un d'autre, et la remet.\n\n« J'ai aussi soixante et un ans, quarante et un duels judiciaires, une charge que je vais perdre, et exactement une chose que je voulais de vous. Je l'ai eue ce matin, dans votre cour, devant trois cents personnes.\n\nChastel voulait autre chose. Chastel a trois cents hommes et une commission de province : elle n'a qu'à venir la chercher elle-même, et elle viendra, et ça ne me regarde plus.\n\nJe n'ai jamais travaillé pour Chastel, messire. J'ai travaillé dans des ronds. Ce n'est pas la même chose et il m'a fallu quarante ans pour m'autoriser à le dire. »" }
      : { sobre:"@« Pourquoi être venu ? »\n\n« Pour savoir. »",
          intense:"@« Vous avez fait quatre jours de route pour ça. »\n\n« J'ai fait quarante ans de route pour ça. » Il regarde la craie sur vos pavés. « Quarante et un duels, messire, et pas un seul dont j'aie envie. Un seul dont je me demandais.\n\nMaintenant je sais. Je vais pouvoir m'arrêter. »",
          extreme:"@« Vous avez fait quatre jours de route pour ça. »\n\n« J'ai fait quarante ans de route pour ça. »\n\nIl regarde la craie qui s'efface déjà sur vos pavés, là où trois cents personnes ont marché dessus tout l'après-midi.\n\n« Quarante et un duels judiciaires. Je peux tous vous les réciter, avec la date, le temps qu'il faisait et le nom. Il n'y en a pas un seul dont j'aie envie de me souvenir et j'y suis condamné.\n\nUn seul m'a occupé. Un seul, en quarante ans, où quelqu'un a fait quelque chose que je n'avais pas prévu — et Chastel a payé pour que la cause tombe, et je n'ai jamais su ce qui se serait passé au troisième temps.\n\nMaintenant je sais. » Il ramasse ses gants. « Je vais pouvoir m'arrêter. C'est tout ce que je suis venu chercher et je ne pouvais l'obtenir de personne d'autre au monde. »" },
    "§ Il repart au matin. Il ne fait pas le signe vers la crête est, et les quarante-huit hommes rentrent à Chastel sans avoir vu Karlsberg.",
  ],
  effets:{ flags:['in_so_parti'],
           marque:"Renaud Sorgue est reparti sans faire le signe. Quarante et un duels, et un seul qui l'occupait.",
           court:"Il s'arrête" },
  suite:'a3_champions', libelleSuite:"Après" },

/* ══════════════════════════════════════════════════════════════════════════
 * CHARLES DE MONT-DRAKEN · soixante-sept ans
 *
 * Il ne se bat pas. Il n'a jamais eu de haine pour rien de ce qu'il a tué,
 * il compte depuis trente ans, et il a raison — c'est toute la difficulté
 * de sa vie et il la traîne sans que personne l'ait jamais aidé à la
 * porter, parce que les deux camps trouvent plus confortable qu'il soit un
 * boucher.
 *
 * Cette confrontation-là n'a pas d'issue par les armes. Elle en a une par
 * le registre, et c'est celle que personne n'attend.
 * ══════════════════════════════════════════════════════════════════════════ */
in_charles:{
  qui:'charles',
  lieu:"Karlsberg · la salle basse",
  titre:"Trois cent douze pièces",
  texte:[
    "Il arrive avec vingt hommes et il les laisse dans la cour. Il monte seul, il retire son manteau, et il s'assied sans qu'on l'y invite — comme la première fois, il y a neuf ans, dans une salle de relais.",
    { sobre:"Il a soixante-sept ans. Il tient toujours son compte.",
      intense:"Il a soixante-sept ans. Les mains sont les mêmes — des mains de charpentier avec un ongle noir — et il pose sur la table un registre relié qu'il n'avait pas la dernière fois.",
      extreme:"Il a soixante-sept ans et il n'a rien perdu de ce qui comptait chez lui : les mains sont les mêmes, des mains de charpentier avec un ongle noir, et elles se posent à plat sur le bois avant qu'il ne parle, exactement comme il y a neuf ans.\n\nCe qui est nouveau, c'est le registre. Un volume relié, épais de deux pouces, qu'il pose devant lui sans l'ouvrir et sur lequel il garde la main gauche pendant tout l'entretien." },
    "« Trois cent quarante-six », dit-il. « Pièces sur le mur. C'était trois cent douze la dernière fois. »",
    "@« Et le registre ? »",
    { sobre:"« Quatre-vingt-quatorze inscrits. »",
      intense:"« Quatre-vingt-quatorze inscrits. » Il n'a pas besoin de l'ouvrir. « En sept ans. Sur quatre provinces. Je le tiens de ma main tous les mois et personne ne l'a jamais vu que moi et deux magistrats. »",
      extreme:"« Quatre-vingt-quatorze inscrits. »\n\nIl n'ouvre pas le volume et il n'en a pas besoin.\n\n« En sept ans, sur quatre provinces. Chaque ligne porte un nom, une date, un lieu, ce que la personne a fait et devant combien de témoins. Je l'écris de ma main tous les mois. Personne ne l'a jamais lu, sauf moi et deux magistrats qui n'avaient pas le choix. »\n\nUn temps.\n\n« Sur les quatre-vingt-quatorze, soixante et onze sont vivants. Onze ont une charge. Quatre enseignent. Trois sont morts de vieillesse.\n\nAucun n'a été brûlé. C'est le chiffre pour lequel j'ai passé trente ans à me faire traiter de boucher par les deux camps. »" },
    "§ Voilà ce que ça donne, une commission accordée en Ventôse à un homme qu'on croyait vouloir tuer les enfants de l'Onde.",
    { sobre:"^« Il manque une ligne. »",
      intense:"^« Il manque une ligne », dit-il, et c'est là qu'il pose enfin la main sur le volume. « Une seule. Elle manque depuis neuf ans et je n'ai jamais réussi à en tenir un autre compte. »",
      extreme:"^« Il manque une ligne. »\n\nIl pose enfin la main à plat sur le volume, ce qu'il n'avait pas fait en s'asseyant.\n\n« Une seule. Elle manque depuis neuf ans et j'ai essayé quatre fois d'en tenir un autre compte pour ne plus y penser, et ça n'a jamais marché.\n\nJe ne suis pas venu vous arrêter, messire. J'ai vingt hommes dans votre cour parce qu'on ne traverse pas la marche sans vingt hommes et pour aucune autre raison. Il n'y a aucun magistrat avec moi. Je n'ai pas de commission pour vous : j'ai demandé qu'on m'en accorde une et on me l'a refusée trois fois, parce que trois conseils successifs ont estimé qu'une maison qui a tenu un siège vaut mieux qu'un principe.\n\nJe suis venu vous le demander. Comme il y a neuf ans, et pour la dernière fois : c'est mon dernier hiver de commission. »" },
  ],
  effets:{ flags:['in_charles_vu'],
           marque:"Quatre-vingt-quatorze inscrits, soixante et onze vivants, aucun brûlé. Il manque une ligne.",
           court:"Une ligne" },
  choix:[
    { t:"S'inscrire",
      detail:"une ligne · un nom, une date, un lieu · et ce n'est plus un secret",
      risque:"définitif",
      ferme:"Ferme : la seule chose qui vous protégeait encore",
      va:'in_ch_inscrit' },

    { t:"« Non. Pour la deuxième fois. »",
      detail:"il vous avait prévenu qu'il redemanderait · il ne demandera pas une troisième",
      risque:"calculé", va:'in_ch_non' },

    { t:"Lui demander le registre",
      detail:"Présence · commandement — quatre-vingt-quatorze noms dans un volume que deux magistrats ont vu",
      risque:"risqué",
      test:{ carac:'presence', comp:'commandement', dc:13, adversaire:'charles', manoeuvre:'registre',
             situation:() => (a('a3_tenu') ? 3 : 0) + (a('a2_charles_respect') ? 2 : 0) },
      degres:{ dominante:'in_ch_registre', nette:'in_ch_registre', couteuse:'in_ch_registre_cout',
               echec:'in_ch_registre_ko', catastrophe:'in_ch_registre_ko' } },
  ],
},

in_ch_inscrit:{
  qui:'charles',
  titre:"La quatre-vingt-quinzième",
  texte:[
    "@« Écrivez. »",
    { sobre:"Il ouvre le volume. Il ne dit pas merci.",
      intense:"Il ouvre le volume à la page en cours, il trempe sa plume, et il ne dit pas merci — cet homme n'a jamais remercié personne d'avoir fait ce qu'il fallait faire.\n\nIl écrit lentement. Six lignes, pas une.",
      extreme:"Il ouvre le volume à la page en cours et trempe sa plume dans un encrier qu'il a apporté.\n\nIl ne dit pas merci. Cet homme n'a jamais remercié personne d'avoir fait ce qu'il fallait faire, et il ne commencera pas à soixante-sept ans.\n\nIl écrit lentement, en formant chaque lettre, et il n'écrit pas une ligne : il en écrit six. Le nom, la date, le lieu. Ce que vous portez, dans les termes du registre et pas dans ceux de la rumeur. Devant combien de témoins. Ce qui a été fait avec, en trois occasions datées.\n\nEt une sixième, qu'il ajoute après avoir posé la plume et l'avoir reprise :\n\n*A tenu Karlsberg. Trois cents feux. N'a pas été demandé.*" },
    "@« Qu'est-ce que ça change ? »",
    { sobre:"« Pour vous, rien aujourd'hui. »",
      intense:"« Pour vous ? Rien aujourd'hui. Vous serez inscrit, ce qui veut dire qu'un magistrat peut vous convoquer et que personne ne peut vous brûler sans passer devant lui. C'est tout ce que ça donne et c'est déjà beaucoup plus que ce qu'ont les quatre-vingt-quatorze autres. »",
      extreme:"« Pour vous ? Rien du tout aujourd'hui. »\n\nIl sèche l'encre.\n\n« Vous êtes inscrit. Ça veut dire qu'un magistrat de province peut vous convoquer, ce qui est désagréable, et que personne ne peut vous prendre à quatre heures du matin sans passer devant lui, ce qui l'est nettement moins. C'est exactement ce que ça donne et je ne vous vendrai pas autre chose.\n\nCe que ça change n'est pas pour vous. »\n\nIl referme le volume.\n\n« Il y a dans la marche, en ce moment, entre quarante et soixante enfants qui font tomber des murs sans le vouloir et dont les villages décident tout seuls. Vous savez ce que décide un village.\n\nÀ partir d'aujourd'hui, quand j'irai devant le conseil, je n'aurai plus quatre-vingt-quatorze noms dont personne n'a entendu parler. J'en aurai quatre-vingt-quinze, et le quatre-vingt-quinzième a tenu un siège devant trois provinces.\n\nC'est pour ça que je le demande depuis sept ans. » " },
    "§ Il repart le matin même avec ses vingt hommes. C'est son dernier hiver de commission et il le passera à porter un volume relié devant quatre conseils.",
  ],
  effets:{ flags:['in_charles_fait','in_fait_charles','in_ch_inscrit','a2_registre_onde'],
           faire:() => { ETAT.suspicion = 100;
                         if(typeof retenir === 'function') retenir('charles', "il s'est inscrit de lui-même, le quatre-vingt-quinzième"); },
           exploit:{ eclat:6, temoins:'province',
                     quoi:"vous vous êtes fait inscrire au registre de votre plein gré" },
           marque:"Vous êtes le quatre-vingt-quinzième. « A tenu Karlsberg. N'a pas été demandé. »",
           court:"Quatre-vingt-quinze" },
  plusTard:"Un homme inscrit ne se cache plus. Ce n'est pas la même chose qu'être en sécurité.",
  suite:'a3_champions', libelleSuite:"Après" },

in_ch_non:{
  qui:'charles',
  titre:"La deuxième fois",
  texte:[
    "@« Non. Pour la deuxième fois. »",
    { sobre:"Il hoche la tête. Il referme le volume.",
      intense:"Il hoche la tête, referme le volume, et le remet sous son bras. Il ne discute pas — il n'a jamais discuté avec personne, c'est peut-être son seul défaut.",
      extreme:"Il hoche la tête une fois. Il referme le volume, le range sous son bras gauche, et se lève sans s'appuyer sur la table, ce qu'un homme de soixante-sept ans ne fait pas facilement.\n\nIl ne discute pas. Il n'a jamais discuté avec quiconque en trente ans : il expose, il demande, et il encaisse la réponse. C'est peut-être son seul défaut et c'est celui qui lui a coûté trois refus de conseil." },
    { sobre:"^« Je ne redemanderai pas. »",
      intense:"^« Je ne redemanderai pas », dit-il sur le seuil. « Ce n'est pas une menace : c'est mon dernier hiver. Il y aura quelqu'un après moi et je ne sais pas qui. »",
      extreme:"^« Je ne redemanderai pas », dit-il sur le seuil, sans se retourner complètement.\n\n« Ce n'est pas une menace et je vous demande de ne pas l'entendre comme ça. C'est mon dernier hiver de commission. On m'a accordé quatre ans en Ventôse, il y en a eu sept parce que personne ne voulait la place, et j'ai soixante-sept ans.\n\nIl y aura quelqu'un après moi. Je ne sais pas qui et je n'ai aucun moyen de le choisir. »\n\nUn temps.\n\n« Ce que je sais, c'est que le prochain n'aura pas mon registre. Il aura ce que le conseil lui donnera, et le conseil donne toujours à quelqu'un qui promet d'aller plus vite. »\n\nIl remet son manteau.\n\n« Bonne route, messire. Restez à l'ouest de la Route Grise. »" },
    "§ Il a dit exactement ça il y a neuf ans, dans une salle de relais, en partant. C'est la seule chose qu'il ait répétée de toute sa vie.",
  ],
  effets:{ flags:['in_charles_fait','in_fait_charles','in_ch_refuse'],
           cout:{ moral:6 },
           faire:() => { if(typeof retenir === 'function') retenir('charles', "il a dit non une seconde fois, et c'était mon dernier hiver"); },
           marque:"Vous avez refusé une seconde fois. C'était son dernier hiver de commission.",
           court:"Le dernier hiver" },
  plusTard:"Il y aura quelqu'un après lui, et le conseil donne toujours la place à qui promet d'aller plus vite.",
  suite:'a3_champions', libelleSuite:"Après" },

in_ch_registre:{
  qui:'charles',
  titre:"Ce qu'on fait d'un volume relié",
  texte:[
    "@« Donnez-moi le registre. »",
    { sobre:"C'est la première fois en trente ans qu'on lui demande ça.",
      intense:"Il ne répond pas. C'est, très probablement, la première fois en trente ans qu'on lui demande cette chose-là, et il n'a pas de réponse préparée parce qu'il n'a jamais envisagé qu'on la demande.",
      extreme:"Il ne répond pas.\n\nEt vous comprenez, en le regardant ne pas répondre, que c'est la première fois en trente ans qu'on lui demande ça. Pas *ce qu'il y a dedans* — ça, on le lui a demandé, et il a refusé, et deux magistrats ont fini par l'obtenir.\n\nLe volume. Qu'il le donne.\n\nIl n'a aucune réponse préparée parce qu'il n'a jamais, en trente ans, envisagé une seconde que quelqu'un veuille le porter." },
    "@« Vous avez soixante-sept ans, c'est votre dernier hiver, et le prochain n'aura pas votre registre. Vous l'avez dit vous-même. »",
    "« Je ne l'ai pas encore dit. »",
    "@« Vous alliez. »",
    { sobre:"Long silence.",
      intense:"Long silence. Puis : « Une maison. Ça n'a jamais été tenu par une maison. C'est tenu par un homme et ça meurt avec lui, c'est toute la faiblesse de la chose et je n'ai jamais rien trouvé contre. »",
      extreme:"Long silence. Il regarde le volume sous sa main.\n\n« Une maison », dit-il enfin. « Ça n'a jamais été tenu par une maison. C'est tenu par un homme, ça meurt avec lui, et c'est toute la faiblesse de l'affaire : j'ai passé sept ans à écrire quatre-vingt-quatorze lignes qui disparaîtront dans un grenier de Mont-Draken en même temps que moi.\n\nJ'ai cherché. Quatre conseils, deux ordres religieux, l'école. Aucun ne le prend sans le changer, et un registre qu'on change n'est plus un registre : c'est une liste, et une liste sert à celui qui la tient. »\n\nIl relève la tête.\n\n« Vous me demandez de le confier à une maison humaine relevée par un homme qui y figure. »\n\n@« Oui. »\n\n« C'est la pire idée que j'aie entendue en trente ans. »\n\nUn temps très long.\n\n« C'est aussi la seule. »" },
    "§ Il le pousse en travers de la table. Il ne le lâche pas tout de suite.",
    { sobre:"^« Trois conditions. »",
      intense:"^« Trois conditions, et elles ne se négocient pas. »\n\n**Un.** On n'y retire jamais un nom. **Deux.** On ne le montre à aucun conseil, à aucun ordre, à aucune couronne — seulement à un magistrat qui le réclame et seulement dans les formes. **Trois.** On y inscrit quelqu'un de la maison, tous les mois, de sa propre main.",
      extreme:"^« Trois conditions, et aucune ne se négocie. »\n\n**Un.** On n'en retire jamais un nom. Jamais, pour aucune raison, y compris quand ça coûte à la maison — et ça coûtera.\n\n**Deux.** On ne le montre à aucun conseil, à aucun ordre, à aucune couronne. À un magistrat qui le réclame dans les formes, oui. À quelqu'un qui le demande poliment, jamais, et c'est toujours celui-là qui le demande poliment.\n\n**Trois.** Quelqu'un de la maison l'écrit de sa main tous les mois. Pas un clerc. Quelqu'un qui y figure ou qui aurait pu.\n\n« Un registre écrit par un homme qui n'a rien à y craindre devient une liste en quatre ans. J'ai vu ça arriver deux fois. »" },
    "@« C'est tout ? »",
    "« C'est tout. Le reste est de la comptabilité et vous en avez un qui sait compter. »",
  ],
  effets:{ flags:['in_charles_fait','in_fait_charles','in_ch_registre','a2_registre_onde'],
           faire:() => { if(typeof retenir === 'function') retenir('charles', "il m'a demandé le registre et je le lui ai donné"); },
           exploit:{ eclat:12, temoins:'province',
                     quoi:"Charles de Mont-Draken vous a confié son registre, ce qu'il n'a fait de personne en trente ans" },
           marque:"Il vous a confié le registre. Quatre-vingt-quatorze noms, trois conditions, et rien d'écrit.",
           court:"Le registre" },
  plusTard:"Une maison qui tient le registre des porteurs de l'Onde ne redevient jamais une maison ordinaire.",
  suite:'a3_champions', libelleSuite:"Après" },

in_ch_registre_cout:{
  qui:'charles',
  titre:"Pas à vous",
  texte:[
    "@« Donnez-moi le registre. »",
    { sobre:"« Non. »",
      intense:"« Non. » Il ne met pas une seconde à répondre. « Vous y figurez, ou vous devriez y figurer. On ne confie pas un registre à quelqu'un qui a un intérêt dans ce qui est écrit dedans. »",
      extreme:"« Non. »\n\nIl ne met pas une seconde à répondre, ce qui règle la question de savoir s'il y avait déjà pensé.\n\n« Vous y figurez, ou vous devriez y figurer, et c'est la même chose du point de vue du volume. On ne confie pas un registre à quelqu'un qui a un intérêt personnel dans ce qui est écrit dedans. C'est la première règle de tous les greffes de ce monde, elle a mille ans, et elle a mille ans parce qu'elle est juste. »" },
    "§ Il a raison. Il a toujours raison, c'est toute la difficulté de sa vie, et il la traîne depuis trente ans.",
    "« Cela dit », ajoute-t-il en se levant, « vous êtes le premier à l'avoir demandé. Je le note. »",
  ],
  effets:{ flags:['in_charles_fait','in_fait_charles','in_ch_demande'],
           faire:() => { if(typeof retenir === 'function') retenir('charles', "il a demandé le registre, ce que personne n'a jamais fait"); },
           exploit:{ eclat:3, temoins:'un', quoi:"vous êtes le premier à lui avoir demandé le registre" },
           marque:"Il a refusé le registre. « Vous êtes le premier à l'avoir demandé. Je le note. »",
           court:"Le premier" },
  suite:'a3_champions', libelleSuite:"Après" },

in_ch_registre_ko:{
  qui:'charles',
  titre:"Ce que ça dit de vous",
  texte:[
    "@« Donnez-moi le registre. »",
    { sobre:"Il vous regarde longtemps.",
      intense:"Il vous regarde longtemps, et ce n'est pas de la colère : c'est un homme qui reclasse quelque chose.\n\n« Quatre-vingt-quatorze noms », dit-il. « Vous venez de me demander quatre-vingt-quatorze personnes. »",
      extreme:"Il vous regarde longtemps, et il n'y a pas une once de colère là-dedans. C'est un homme qui reclasse quelque chose, et le voir faire ça est nettement pire.\n\n« Quatre-vingt-quatorze noms », dit-il enfin. « Avec la date, le lieu, et ce que chacun a fait devant combien de témoins.\n\nVous venez de me demander quatre-vingt-quatorze personnes, messire. Pas un volume. »\n\nIl le remet sous son bras.\n\n« Je ne sais pas pourquoi vous le vouliez. Je ne vous ferai pas l'injure de supposer le pire, parce que je vous ai vu tenir un siège pour trois cents feux qui ne vous avaient rien demandé.\n\nMais je vais l'écrire, et dans onze ans quelqu'un le lira, et je ne pourrai plus expliquer ce que j'en pensais. »" },
    "§ Il l'écrit. Là, devant vous, avant de se lever.",
  ],
  effets:{ flags:['in_charles_fait','in_fait_charles','in_ch_note','a2_charles_froid'],
           cout:{ moral:8 },
           faire:() => { if(typeof retenir === 'function') retenir('charles', "il m'a demandé quatre-vingt-quatorze personnes"); },
           marque:"Vous lui avez demandé le registre. Il a écrit ce que ça disait de vous, devant vous.",
           court:"Il l'a écrit" },
  suite:'a3_champions', libelleSuite:"Après" },

/* ══════════════════════════════════════════════════════════════════════════
 * GUILLAUME DE SAULT · quarante-cinq ans
 *
 * Il n'est pas un ennemi. Il ne l'a jamais été et il ne le sera jamais : il
 * tient un carnet, il a écrit *à revoir dans deux ans* sous un nom, et il a
 * mis neuf ans à revenir parce qu'il tient une liste et pas une rancune.
 *
 * C'est la seule des quatre confrontations où quelqu'un repart avec quelque
 * chose au lieu d'en prendre.
 * ══════════════════════════════════════════════════════════════════════════ */
in_sault:{
  qui:'sault',
  lieu:"Karlsberg · le chemin de ronde · au crépuscule",
  titre:"Trois lignes",
  texte:[
    "Il monte au chemin de ronde tout seul, sans qu'on l'ait annoncé, et il regarde la vallée pendant un long moment avant de s'apercevoir qu'on est derrière lui.",
    { sobre:"Il a quarante-cinq ans et le même pourpoint gris.",
      intense:"Quarante-cinq ans, le même pourpoint gris de bonne coupe entretenu par quelqu'un, et le carnet dans la même poche intérieure.\n\nLes mains ont des marques, maintenant. Deux.",
      extreme:"Quarante-cinq ans. Le même pourpoint gris de bonne coupe, entretenu par quelqu'un dont c'est le travail, et le carnet dans la même poche intérieure.\n\nLes mains ont des marques, maintenant. Deux : une sur le dos de la gauche, une qui traverse le pouce droit.\n\nEn neuf ans, il a eu à parer deux fois. C'est un renseignement complet sur ce qu'ont été ces neuf ans." },
    "« J'ai écrit *à revoir dans deux ans* », dit-il sans se retourner. « Il y a neuf. »",
    "@« Vous êtes en retard. »",
    { sobre:"« Je suis en retard de sept ans et j'ai une bonne raison. »",
      intense:"« De sept ans, oui. J'ai une raison et elle est mauvaise. » Il sort le carnet. « Je ne savais pas quoi écrire. »",
      extreme:"« De sept ans, oui. J'ai une raison et elle est très mauvaise. »\n\nIl sort le carnet de sa poche intérieure — le même, relié, plus épais qu'avant — et il le tient sans l'ouvrir.\n\n« Je ne savais pas quoi écrire.\n\nÇa ne m'était jamais arrivé en onze ans. Ça m'est arrivé pour vous et ça ne s'est pas arrangé, et j'ai mis sept ans à comprendre pourquoi. »" },
    "§ Il ouvre le carnet. Il est beaucoup plus épais qu'il y a neuf ans.",
    { sobre:"^« Soixante-neuf noms. »",
      intense:"^« Soixante-neuf noms, maintenant. » Il tourne les pages sans chercher. « Trois lignes chacun. Où, contre quoi, comment ça a fini.\n\nEt une page blanche. »",
      extreme:"^« Soixante-neuf noms, maintenant. »\n\nIl tourne les pages sans chercher : il sait exactement où sont les choses dans son propre carnet.\n\n« Trois lignes chacun. Où, contre quoi, comment ça a fini. Dix-neuf croix pour ceux que je n'ai pas rencontrés, dont onze qui ont refusé.\n\nEt une page blanche. »\n\nIl l'ouvre.\n\n« La vôtre. J'ai fait le trajet quatre fois en neuf ans. Quatre fois. La première, vous étiez à Sainte-Ombre. La deuxième, vous meniez une bataille pour des Nains. La troisième, on m'a dit que vous aviez levé une vallée sans contrat pour rouvrir une chaussée que Chastel laissait fermée.\n\nÀ chaque fois je repartais parce que je ne savais pas quoi mettre dans les trois lignes. »" },
    "@« Et cette fois ? »",
    { sobre:"« Cette fois j'ai regardé la vallée. »",
      intense:"« Cette fois j'ai passé une heure au chemin de ronde à regarder la vallée avant qu'on vienne me chercher. »\n\nIl referme le carnet sur son doigt.\n\n« Trois cents feux. Un intendant qui compte. Une maison qui a tenu un siège. Ça ne s'écrit pas en trois lignes, et je n'ai jamais eu qu'un carnet de trois lignes. »",
      extreme:"« Cette fois j'ai passé une heure entière ici avant que quelqu'un vienne me chercher, et j'ai regardé la vallée. »\n\nIl referme le carnet sur son doigt.\n\n« Trois cents feux. Un intendant qui tient des comptes que j'ai demandé à voir et qu'on m'a montrés sans hésiter, ce qui ne se fait nulle part. Une maison relevée qui a tenu un siège.\n\nJe tiens un carnet de trois lignes, messire. Trois lignes, c'est fait pour un homme dans un rond : où, contre quoi, comment ça a fini. C'est parfait pour ça et ça ne sert à rien d'autre.\n\nJ'ai passé onze ans à croire que je gardais la mémoire des hommes qui valaient quelque chose. J'ai passé les neuf suivants à comprendre que je gardais la mémoire de la seule chose que je savais mesurer. »" },
  ],
  effets:{ flags:['in_sault_vu'],
           marque:"Soixante-neuf noms, dix-neuf croix, et une page blanche depuis neuf ans.",
           court:"La page blanche" },
  choix:[
    { t:"Entrer dans le rond",
      detail:"c'est ce qu'il est venu chercher les quatre premières fois · pas la cinquième",
      risque:"calculé", va:'in_sa_rond' },

    { t:"« Écrivez ce que vous voulez. »",
      detail:"il a fait quatre fois le trajet · il a droit à sa page",
      risque:"prudent", va:'in_sa_ecrire' },

    { t:"Lui proposer autre chose que trois lignes",
      detail:"un homme qui tient un registre depuis vingt ans, et une maison qui en cherche un",
      si:() => a('a3_tenu'),
      risque:"définitif", va:'in_sa_rester' },
  ],
},

in_sa_rond:{
  melee:true, qui:'sault',
  titre:"Une cinquième fois",
  texte:[
    "@« Tracez le rond. »",
    { sobre:"Il ne bouge pas.",
      intense:"Il ne bouge pas. Puis il rit — une fois, court, sans amertume, le même rire qu'il y a neuf ans quand vous lui aviez servi son propre enchaînement.\n\n« Non », dit-il.",
      extreme:"Il ne bouge pas d'un pouce. Il regarde la craie qu'il n'a pas sortie, le chemin de ronde, la vallée.\n\nPuis il rit. Une fois, court, sans une once d'amertume — très exactement le même rire qu'il y a neuf ans, dans une cour de relais, quand vous lui aviez servi son propre enchaînement.\n\n« Non », dit-il." },
    { sobre:"^« Je ne suis pas venu pour ça. »",
      intense:"^« Je ne suis pas venu pour ça, et vous le savez, et vous me le proposez pour m'éviter d'avoir à le dire. »\n\nIl remet le carnet dans sa poche.\n\n« C'est courtois. C'est la chose la plus courtoise qu'on m'ait faite en vingt ans, et je préfère quand même le dire. »",
      extreme:"^« Je ne suis pas venu pour ça. Vous le savez parfaitement, et vous venez de me le proposer pour m'éviter d'avoir à le dire à voix haute.\n\nC'est courtois. C'est très probablement la chose la plus courtoise qu'on m'ait faite en vingt ans de carnet, et je préfère quand même le dire. »\n\nIl remet le carnet dans sa poche intérieure.\n\n« Un rond de neuf pas entre un homme de quarante-cinq ans et un homme de trente-huit ans qui a tenu un siège il y a trois semaines ne renseigne sur rien du tout. Ça ferait trois lignes fausses.\n\nJ'ai soixante-neuf pages. Je peux vivre avec une blanche. Je ne peux pas vivre avec une fausse. »" },
    "§ Il repart le lendemain. La page reste blanche et le carnet repart avec elle.",
  ],
  effets:{ flags:['in_sault_fait','in_fait_sault','in_sa_blanche'],
           marque:"Il a refusé le rond. « Je peux vivre avec une page blanche. Pas avec une fausse. »",
           court:"Une page blanche" },
  suite:'a3_champions', libelleSuite:"Après" },

in_sa_ecrire:{
  qui:'sault',
  titre:"Ce qu'il finit par mettre",
  texte:[
    "@« Écrivez ce que vous voulez. Vous avez fait le trajet quatre fois. »",
    { sobre:"Il écrit, debout, au chemin de ronde.",
      intense:"Il écrit debout, au chemin de ronde, contre le parapet, dans une lumière qui ne va pas durer dix minutes. Ça lui prend un moment.\n\nPuis il vous lit les trois lignes, ce qu'il ne fait jamais.",
      extreme:"Il écrit debout, contre le parapet du chemin de ronde, dans une lumière qui ne durera pas dix minutes et qui ne dure pas dix minutes.\n\nÇa lui prend un long moment. Il rature une fois, ce qu'il n'a manifestement jamais fait.\n\nPuis il fait la chose qu'il ne fait jamais : il vous lit ce qu'il a écrit." },
    { sobre:"^« *Karlsberg. N'est pas entré dans le rond. Trois cents feux.* »",
      intense:"^« *Karlsberg, la vingt-neuvième année. Épée bâtarde, bonne main, a appris où regarder. N'est pas entré dans le rond et n'avait pas à y entrer.*\n\n*Trois cents feux au pied du mur. C'est la seule ligne de ce carnet qui compte autre chose que des hommes seuls, et je ne sais pas quoi en faire.* »",
      extreme:"^« *Karlsberg, la vingt-neuvième année après la Purge.*\n\n*Épée bâtarde, bonne main, a appris où regarder — ce que quinze sur soixante-neuf n'apprennent jamais.*\n\n*N'est pas entré dans le rond, et n'avait aucune raison d'y entrer. Trois cents feux au pied du mur, un intendant qui tient les comptes, une chaussée rouverte sans contrat.*\n\n*C'est la seule ligne de ce carnet qui compte autre chose que des hommes seuls. Je ne sais pas quoi en faire et je l'écris quand même, parce qu'un registre qui n'écrit que ce qu'il sait mesurer ment par omission pendant vingt ans.* »\n\nIl referme le carnet.\n\n« C'est quatre lignes. Je n'en avais jamais écrit quatre. »" },
    "§ Il repart au matin, et il ne repassera plus, et ce n'est pas une menace ni une promesse : c'est un homme qui a fini une page.",
  ],
  effets:{ flags:['in_sault_fait','in_fait_sault','in_sa_ecrit'],
           exploit:{ eclat:4, temoins:'un',
                     quoi:"la seule page de son carnet qui compte autre chose que des hommes seuls" },
           marque:"« C'est la seule ligne de ce carnet qui compte autre chose que des hommes seuls. »",
           court:"Quatre lignes" },
  suite:'a3_champions', libelleSuite:"Après" },

in_sa_rester:{
  qui:'sault',
  titre:"Vingt ans de registre",
  texte:[
    "@« Vous tenez un registre depuis vingt ans. »",
    "« Un carnet. »",
    "@« Vous avez dit *registre*, il y a neuf ans, dans une cour de relais. Vous avez dit qu'une maison a un registre, une province un cartulaire, et un homme d'armes rien du tout. »",
    { sobre:"Il ne dit rien.",
      intense:"Il ne dit rien pendant un long moment. Il n'avait manifestement pas prévu qu'on lui rende ses propres mots à neuf ans de distance.\n\n« Vous avez retenu ça. »\n\n@« Vous étiez le premier à me l'expliquer. »",
      extreme:"Il ne dit rien pendant un très long moment.\n\nIl n'avait manifestement pas prévu qu'on lui rende ses propres mots à neuf ans de distance, et il est en train de vérifier, dans sa tête, s'il les a bien dits — ce qui prend quelques secondes chez un homme qui se souvient de tout.\n\n« Vous avez retenu ça. »\n\n@« Vous étiez le premier à me l'expliquer, et vous me l'avez expliqué en pensant que ça ne servirait à personne. »" },
    "§ Une maison a un registre. Karlsberg en a un depuis trois ans et il compte des sacs de grain.",
    { sobre:"@« Il y a une place ici pour quelqu'un qui écrit ce qui est vrai. »",
      intense:"@« Il y a une place ici. Pas une charge, pas une solde : une place. Quelqu'un qui écrit ce qui s'est réellement passé, tous les mois, sans rien arranger, et qui a le droit de me contredire au bas de la page. »\n\n« Vous êtes en train de m'engager. »\n\n@« Je suis en train de vous demander où ira votre carnet quand vous mourrez. »",
      extreme:"@« Il y a une place ici. »\n\nIl attend, parce qu'il sait qu'il y a une suite.\n\n@« Pas une charge et pas une solde — vous refuseriez les deux et vous auriez raison. Une place. Quelqu'un qui écrit ce qui s'est réellement passé dans cette vallée, tous les mois, sans rien arranger, et qui a le droit écrit de me contredire au bas de la page. »\n\n« Vous êtes en train de m'engager. »\n\n@« Je suis en train de vous demander où ira votre carnet le jour où vous mourrez. »\n\nSilence complet.\n\n« Dans un grenier », dit-il enfin. « Comme tout le reste. C'est la seule chose de ma vie à laquelle je n'ai jamais trouvé de réponse et j'y pense tous les hivers depuis mes quarante ans. »" },
    "Il reste. Ça prend trois jours et il ne dit jamais oui : il descend simplement de la tour un matin avec le carnet et il demande où sont les archives.",
  ],
  effets:{ flags:['in_sault_fait','in_fait_sault','in_sa_reste','a3_chroniqueur'],
           exploit:{ eclat:5, temoins:'quelques',
                     quoi:"vous avez donné un grenier à un homme qui n'en avait pas" },
           marque:"Guillaume de Sault écrit désormais les chroniques de Karlsberg. Il a le droit de vous contredire au bas de la page.",
           court:"Le chroniqueur" },
  plusTard:"Soixante-neuf noms sont entrés aux archives de Karlsberg avec lui. Ils n'iront pas dans un grenier.",
  suite:'a3_champions', libelleSuite:"Après" },

/* ══════════════════════════════════════════════════════════════════════════
 * YSABEL DE KARLSBERG · soixante-dix ans
 *
 * Elle a rayé cette maison une fois. Elle sait comment on s'y prend, c'est
 * la seule personne vivante qui le sache, et vous l'avez laissée vivante
 * dans un parloir de dix pieds sur douze en fermant la porte derrière vous.
 *
 * Ce n'était pas une clémence. Elle l'a compris avant vous.
 * ══════════════════════════════════════════════════════════════════════════ */
in_ysabel:{
  qui:'ysabel',
  lieu:"Karlsberg · la salle basse · Nivôse",
  titre:"Quatre lignes, une seconde fois",
  texte:[
    "Elle n'est pas venue. Elle a soixante-dix ans et elle n'a pas quitté Sainte-Ombre depuis vingt-neuf ans.",
    "Ce qui arrive, c'est une copie. Un clerc du commissariat aux titres de Chastel la porte lui-même, avec l'air d'un homme qui préférerait être ailleurs.",
    { sobre:"Quatre lignes. Écrites de sa main, scellées de son cachet.",
      intense:"Quatre lignes, écrites d'une main de soixante-dix ans qui n'a pas tremblé, scellées d'un cachet que vous connaissez parce que vous en avez tenu le pareil dans une crypte il y a vingt-neuf ans.\n\nLe clerc vous les lit à voix haute. La forme l'exige.",
      extreme:"Quatre lignes.\n\nÉcrites d'une main de soixante-dix ans qui n'a pas tremblé une seule fois sur quatre lignes, scellées d'un cachet que vous reconnaissez immédiatement : vous en avez tenu le pareil dans une crypte, il y a vingt-neuf ans, sur un coffre dont votre tante avait la clef.\n\nLe clerc vous les lit à voix haute parce que la forme l'exige et parce qu'un acte doit être entendu par celui qu'il vise.\n\nIl lit mal. Il lit comme un homme qui a compris ce qu'il porte." },
    "§ *La maison de Karlsberg est relevée par un acte du bailliage de Chastel, la vingt-quatrième année. La soussignée, née Karlsberg, dernière du sang par ordre de naissance, déclare le relèvement régulier en la forme et le confirme.*",
    { sobre:"Elle ne raye rien. Elle confirme.",
      intense:"Elle ne raye rien.\n\nElle confirme. Un relèvement de titre contesté par personne devient inattaquable le jour où le dernier survivant du sang, par ordre de naissance, le confirme par écrit devant le commissariat. C'est la seule chose au monde qui puisse fermer définitivement le dossier de Karlsberg, et elle est la seule personne vivante à pouvoir la faire.",
      extreme:"Elle ne raye rien.\n\nElle confirme.\n\nIl faut un moment pour comprendre ce que ça veut dire, et ce moment est très désagréable. Un relèvement de titre que personne ne conteste reste attaquable pendant trois générations : il suffit qu'un héritier de la maison rayée se présente et dise que ça s'est mal fait.\n\nIl devient inattaquable le jour où le dernier survivant du sang, par ordre de naissance, le confirme par écrit devant le commissariat aux titres.\n\nElle est cette personne. Elle est la seule au monde. Et elle vient d'employer, en quatre lignes, exactement la même forme, le même greffe et le même cachet qu'à Germinal de la cent-quarante-troisième année — pour faire l'inverse." },
    "Il y a une cinquième ligne, sous le sceau, qui ne fait pas partie de l'acte et que le clerc ne lit pas.",
    { sobre:"^« Je sais faire les deux. On ne m'a jamais demandé de faire l'autre. »",
      intense:"Vous la lisez vous-même.\n\n^« Je sais faire les deux, messire. On ne m'a simplement jamais demandé de faire l'autre. »",
      extreme:"Vous la lisez vous-même, à voix basse, et deux fois.\n\n^« Je sais faire les deux, messire. On ne m'a simplement jamais demandé de faire l'autre.\n\nVous avez refermé la porte du parloir et vous êtes parti sans me dire ce que vous vouliez. J'ai mis cinq ans à décider que ce n'était pas parce que vous n'aviez rien à me demander. »" },
  ],
  effets:{ flags:['in_ysabel_fait','in_fait_ysabel','in_ys_confirme','a2_titre_inattaquable'],
           exploit:{ eclat:8, temoins:'province',
                     quoi:"le relèvement de Karlsberg est devenu inattaquable" },
           marque:"Ysabel a confirmé le relèvement. Le titre est inattaquable. « Je sais faire les deux. »",
           court:"Elle a confirmé" },
  choix:[
    { t:"Lui répondre",
      detail:"quatre lieues d'une route de poste · elle en a soixante-dix · et vous savez écrire",
      risque:"calculé", va:'in_ys_repondre' },

    { t:"Ne pas répondre",
      detail:"elle n'a rien demandé · c'est même toute la question depuis neuf ans",
      risque:"prudent", va:'in_ys_silence' },
  ],
},

in_ys_repondre:{
  qui:'ysabel',
  titre:"Ce qu'on écrit à quelqu'un qui a rayé sa propre maison",
  texte:[
    "Vous écrivez. Ça prend trois soirs et deux brouillons brûlés, ce qui est peu pour une lettre qu'on doit à quelqu'un depuis neuf ans.",
    { sobre:"Vous n'écrivez pas de pardon. Il n'y en a pas à donner.",
      intense:"Vous n'écrivez pas de pardon. Il n'y en a pas à donner : sept cents personnes, dont un garçon de neuf ans dans une cour, et rien de ce qu'on écrit ne touche à ça.\n\nVous écrivez ce qu'elle vous a demandé sans le demander : ce que vous vouliez, en fermant cette porte.",
      extreme:"Vous n'écrivez pas de pardon.\n\nIl n'y en a pas à donner et elle serait la première à refuser d'en recevoir un. Sept cents personnes se sont couchées nobles et se sont réveillées inexistantes ; un garçon de neuf ans est sorti par la porte au lieu de descendre par la cave ; et rien de ce qu'un homme peut écrire ne touche à ça, jamais, sous aucune forme.\n\nVous écrivez la seule chose qu'elle vous ait demandée en neuf ans sans jamais la demander : ce que vous vouliez, ce matin-là, en refermant la porte du parloir." },
    "§ Vous ne le saviez pas ce matin-là. Vous le savez maintenant, ce qui est très exactement ce qui vous a pris neuf ans.",
    { sobre:"Sa réponse fait deux lignes.",
      intense:"Sa réponse arrive en Ventôse et fait deux lignes.\n\n^« Vous vouliez que quelqu'un qui savait reste en vie pour le voir. C'est ce que j'ai fait pendant neuf ans et c'est la seule chose utile que j'aie faite de ma vie entière. »",
      extreme:"Sa réponse arrive en Ventôse. Elle fait deux lignes, écrites de la même main qui n'a pas tremblé.\n\n^« Vous vouliez que quelqu'un qui savait reste en vie assez longtemps pour le voir. C'est ce que j'ai fait pendant neuf ans, depuis un parloir de dix pieds sur douze, et c'est très exactement la seule chose utile que j'aie faite de ma vie entière.\n\nJe meurs cet hiver. Ne venez pas. Quatre lieues, c'est trop peu pour que ça veuille dire quelque chose, et vous le savez depuis le premier jour. »" },
    "Elle meurt en Germinal. Sainte-Ombre l'enterre au carré des sœurs, sous le nom qu'elle a porté vingt-neuf ans.",
  ],
  effets:{ flags:['in_ys_lettre','in_ys_morte'],
           marque:"« Vous vouliez que quelqu'un qui savait reste en vie pour le voir. » Elle est morte en Germinal.",
           court:"Deux lignes" },
  suite:'a3_champions', libelleSuite:"Après" },

in_ys_silence:{
  qui:'ysabel',
  titre:"Rien",
  texte:[
    "Vous n'écrivez pas. C'est ce que vous avez fait il y a neuf ans en refermant une porte, et c'est cohérent, et la cohérence n'a jamais été une vertu.",
    { sobre:"Elle n'écrit pas non plus.",
      intense:"Elle n'écrit pas non plus. Elle n'a jamais rien demandé et elle ne commencera pas à soixante-dix ans.\n\nLa confirmation, elle, tient. Un acte de commissariat ne dépend pas de ce qu'on en fait ensuite.",
      extreme:"Elle n'écrit pas non plus.\n\nElle n'a rien demandé en neuf ans, elle n'a rien demandé dans le parloir, elle n'a rien demandé dans les quatre lignes de l'acte — et elle ne commencera pas à soixante-dix ans.\n\nLa confirmation tient. Un acte de commissariat aux titres ne dépend absolument pas de ce qu'on en fait ensuite : il est enregistré, il est daté, il est scellé, et il rendra le relèvement de Karlsberg inattaquable pendant trois cents ans, que quiconque lui réponde ou non.\n\nC'est probablement le seul geste entièrement gratuit de toute cette histoire." },
    "§ Elle meurt en Germinal. Sainte-Ombre l'enterre au carré des sœurs, sous le nom qu'elle a porté vingt-neuf ans, et personne de Karlsberg n'y est.",
  ],
  effets:{ flags:['in_ys_silence','in_ys_morte'], cout:{ moral:8 },
           marque:"Vous n'avez pas répondu. Elle est morte en Germinal, et personne de Karlsberg n'y était.",
           court:"Rien" },
  suite:'a3_champions', libelleSuite:"Après" },

};

/* ── L'aiguillage ───────────────────────────────────────────────────────── */
DYN.a3_champions = () => {
  const reste = championsRestants();

  if(!reste.length){
    SCENES.a3_champions = {
      dyn:true,
      lieu:"Karlsberg · la fin de l'hiver",
      titre:"Ce qui reste quand plus personne ne monte",
      texte:[
        a('a3_tenu')
          ? "L'hiver finit. Plus personne ne remonte la vallée, et il faut trois semaines pour cesser de regarder la route de poste tous les matins."
          : "L'hiver finit quand même. C'est la seule chose de cette année qui n'ait rien demandé à personne.",
        { sobre:"§ Il n'y a pas de dernière bataille.",
          intense:"§ Il n'y a pas de dernière bataille et il n'y en a jamais eu. Ce qui finit une histoire comme celle-ci, ce n'est pas un siège levé : c'est le jour où plus personne n'a de raison de monter.",
          extreme:"§ Il n'y a pas de dernière bataille, il n'y en a jamais eu, et quiconque en attendait une n'a pas compris ce que ce monde fait aux gens.\n\nCe qui finit une histoire comme celle-ci n'est pas un siège levé ni un ennemi abattu. C'est le jour où plus personne, dans quatre provinces, n'a de raison particulière de remonter cette vallée — parce qu'ils sont morts, parce qu'ils ont obtenu ce qu'ils voulaient, ou parce qu'ils ont fini par écrire ce qu'ils étaient venus écrire." },
      ],
      suite:'a2_epilogue', libelleSuite:"Ce que le monde en a fait",
    };
    aller('a3_champions');
    return;
  }

  /* Un à la fois, le plus lourd d'abord. On n'annonce jamais combien il en
   * reste : on les voit arriver. */
  aller(reste[0].champion);
};

enregistrerScenes(CHAMPIONS);

/* Elles ne sont la cible d'aucun `va:` : c'est l'aiguillage qui les appelle. */
entree2('a3_champions', 'in_sorgue', 'in_charles', 'in_sault', 'in_ysabel');
