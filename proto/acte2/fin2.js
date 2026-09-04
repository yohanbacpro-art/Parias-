/* PARIAS — Acte II · SAINTE-OMBRE, ET CE QUE LE MONDE EN A FAIT
 * ═══════════════════════════════════════════════════════════════════════
 * Le nom trouvé, il reste quatre lieues à faire. C'est la partie la plus
 * courte de l'acte et la seule qui ne se rattrape pas.
 *
 * Ysabel de Karlsberg n'est pas un monstre et ce n'est pas non plus une
 * pauvre femme. C'est la sœur cadette de votre père, née sans l'Onde dans
 * une maison qui n'était que ça, qui a écrit quatre lignes à Chastel en
 * pensant obtenir une rature — et qui a obtenu une nuit. Elle le sait
 * depuis dix-neuf ans, à quatre lieues d'une route de poste, sans changer
 * de nom.
 *
 * Elle a fait les deux choses : la lettre, et la sortie des enfants.
 * Il n'y a pas de version de cette histoire où l'on n'a pas les deux.
 *
 * L'épilogue ne raconte pas une fin écrite : il lit l'état réel de la
 * partie et rend des verdicts. Karlsberg, Alycia, Alarielle, les cinq
 * guerres, les neuf, ce qu'on a fermé, ce qu'on doit.
 * ═══════════════════════════════════════════════════════════════════════ */

const FIN2 = {

/* ══ LE MUR ═══════════════════════════════════════════════════════════════ */
fi_mur:{
  lieu:"Sainte-Ombre · quatre lieues de Fort-aux-Princes",
  titre:"Le mur",
  texte:[
    "Le prieuré de Sainte-Ombre est un rectangle de pierre grise dans un pli de terrain, avec un mur de sept pieds, un verger de pommiers et trente-et-une femmes dedans.",
    { sobre:"On voit la route de poste depuis la porte.",
      intense:"On voit la route de poste depuis la porte du prieuré. C'est ce détail qui vous arrête : quatre lieues, une heure de cheval, et dix-neuf ans.",
      extreme:"On voit la route de poste depuis la porte du prieuré — le ruban clair qui monte vers Fort-aux-Princes, les charrettes, les deux relais. C'est ce détail-là qui vous arrête net à cinquante pas du mur : quatre lieues. Une heure de cheval au pas. Dix-neuf ans. Elle n'a pas fui, elle ne s'est pas cachée, elle n'a pas changé de nom, et elle a passé dix-neuf ans à voir passer la route par laquelle quelqu'un finirait par venir." },
    () => a('sa_gerbaud')
      ? "Contre le mur, du côté sud, l'herbe est usée sur une longueur d'homme assis. Dix-neuf Prairials. Gerbaud n'a jamais menti sur ce point-là non plus."
      : "Contre le mur, du côté sud, l'herbe est usée sur une longueur d'homme assis, et depuis longtemps. Quelqu'un vient s'asseoir là régulièrement et ne franchit pas la porte.",
    "§ La porte n'est pas fermée. Elle ne l'a jamais été : c'est un prieuré de campagne, pas une place forte.",
    "Une femme d'une trentaine d'années balaie le seuil. Elle vous regarde arriver sans inquiétude particulière, ce qui veut dire qu'elle voit passer des hommes armés et que ça ne l'émeut plus.",
    "« Vous cherchez quelqu'un. »",
    "« Ysabel de Karlsberg. »",
    { sobre:"Elle repose son balai.",
      intense:"Elle repose son balai contre le mur, avec soin, et elle prend le temps de le caler.\n\n« Sœur Ysabel tient les comptes », dit-elle. « Elle est au parloir de six heures à dix heures. »",
      extreme:"Elle repose son balai contre le mur, avec soin, et prend le temps de le caler pour qu'il ne glisse pas. Ce geste dure quatre secondes et vous comprenez, en le regardant, qu'elle est en train de décider quelque chose.\n\n« Sœur Ysabel tient les comptes de la fondation », dit-elle enfin. « Elle est au parloir de six heures à dix heures, tous les jours, y compris le dimanche. Elle nous a demandé, il y a très longtemps, qu'on ne dise jamais qu'elle n'y était pas. »" },
    "« Elle vous a demandé ça. »",
    "« La première semaine. » La femme reprend son balai. « Nous ne savons pas pourquoi et nous ne le lui avons jamais demandé. C'est un peu le principe, ici. »",
  ],
  choix:[
    { t:"Entrer au parloir",
      detail:"elle y est de six heures à dix heures, tous les jours, depuis dix-neuf ans",
      risque:"définitif", va:'fi_parloir' },
    { t:"S'asseoir contre le mur d'abord",
      detail:"du côté sud, là où l'herbe est usée · une heure, pas plus",
      risque:"prudent", va:'fi_assis' },
  ],
},

fi_assis:{
  lieu:"Sainte-Ombre · le mur sud",
  titre:"Une heure contre la pierre",
  texte:[
    "Vous vous asseyez où quelqu'un s'assoit depuis dix-neuf ans.",
    { sobre:"La pierre est chaude. Il n'y a rien d'autre à dire là-dessus.",
      intense:"La pierre est chaude et l'herbe est courte, et on entend le prieuré derrière : de l'eau, une porte, une voix qui compte quelque chose à haute voix — un inventaire, probablement.",
      extreme:"La pierre est chaude au dos et l'herbe est courte, usée jusqu'à la terre sur une longueur d'homme assis. Derrière le mur on entend le prieuré fonctionner : de l'eau qu'on tire, une porte à ressort, et quelque part une voix de femme qui compte à haute voix — quatorze, quinze, seize — un inventaire de vivres ou de linge, la chose la plus ordinaire du monde." },
    "Vous comprenez pourquoi Gerbaud n'est jamais entré.",
    "§ Tant qu'on est contre le mur, il y a encore deux versions possibles de cette femme, et on peut choisir celle qui permet de continuer à vivre.",
    "Une heure plus tard vous vous relevez, et il n'y a plus qu'une porte.",
  ],
  effets:{ flags:['fi_assis'],
           marque:"Vous vous êtes assis une heure contre le mur sud de Sainte-Ombre, là où l'herbe est usée.",
           court:"Le mur sud" },
  suite:'fi_parloir', libelleSuite:"Entrer" },

/* ══ LE PARLOIR ═══════════════════════════════════════════════════════════ */
fi_parloir:{
  qui:'ysabel',
  lieu:"Sainte-Ombre · le parloir",
  titre:"Sœur Ysabel",
  texte:[
    "Le parloir est une pièce de dix pieds sur douze, avec une table, deux bancs, une fenêtre haute et un registre ouvert.",
    { sobre:"Une femme de soixante-quatre ans y tient des comptes.",
      intense:"Une femme de soixante-quatre ans y tient des comptes : la colonne de gauche en chiffres, la colonne de droite en toutes lettres, et une troisième colonne dont vous ne comprenez pas l'usage. Elle écrit d'une main petite et régulière.",
      extreme:"Une femme de soixante-quatre ans y tient des comptes. La colonne de gauche en chiffres, celle du milieu en toutes lettres, et une troisième à droite dont vous ne comprenez pas l'usage — un système à elle, mis au point sur des années, pour une fondation qui doit brasser trois cents couronnes l'an. Elle écrit d'une main petite, régulière, sans une rature, et elle ne lève pas la tête quand la porte s'ouvre parce que la porte s'ouvre douze fois par matinée." },
    "Elle lève la tête à la troisième seconde, parce que vous n'êtes pas entré comme les autres.",
    "§ Vous avez le visage de votre père. On vous l'a dit onze fois en onze ans par des gens qui ne l'avaient jamais vu.",
    "Elle, elle l'a vu.",
    { sobre:"Elle pose sa plume dans l'encrier. Correctement.",
      intense:"Elle pose sa plume dans l'encrier — correctement, pas en la lâchant — et elle referme le registre sur son doigt pour ne pas perdre la page.\n\n« Ah », dit-elle.",
      extreme:"Elle pose sa plume dans l'encrier. Correctement, sans la lâcher, en essuyant le bec sur le bord comme on le fait quand on a écrit toute sa vie. Puis elle referme le registre sur son doigt pour ne pas perdre la page, ce qui est le geste le plus étrange de toute cette matinée, parce qu'il suppose qu'elle compte y revenir.\n\n« Ah », dit-elle." },
    "Un seul mot. Pas de cri, pas de blanc, pas de main sur la bouche.",
    "« Vous savez qui je suis. »",
    "« Vous êtes le fils cadet d'Aymar. Loys est mort à neuf ans dans la cour, donc vous êtes Yohan, donc vous avez trente ans. » Elle a le calcul immédiat. « Asseyez-vous ou ne vous asseyez pas, mais fermez la porte, il y a des femmes qui passent. »",
    "Vous fermez la porte.",
    "@« Vous m'attendiez. »",
    { sobre:"« Depuis dix-neuf ans. »",
      intense:"« Depuis dix-neuf ans, tous les matins, de six heures à dix heures. » Elle croise les mains sur le registre. « C'est pour ça que je tiens les comptes au parloir et pas au bureau. On m'a proposé le bureau quatre fois. »",
      extreme:"« Depuis dix-neuf ans, tous les matins, de six heures à dix heures, y compris le dimanche. » Elle croise les mains sur la couverture du registre. « C'est exactement pour ça que je tiens les comptes de cette maison au parloir et pas au bureau, qui serait plus commode, mieux chauffé et plus clair. On m'a proposé le bureau quatre fois en dix-neuf ans. J'ai refusé quatre fois et je n'ai jamais donné de raison, et comme c'est ici, personne n'a insisté. »" },
    "« Vous auriez pu partir. »",
    "« Oui. »",
    "« Vous auriez pu changer de nom. »",
    "« Oui. » Elle soutient votre regard sans effort apparent. « Posez la vraie question, messire. Vous n'avez pas fait quatre lieues pour savoir comment j'occupe mes matinées. »",
  ],
  choix:[
    { t:"« Est-ce que c'est vous ? »",
      detail:"la question simple · et la seule qui compte encore",
      risque:"calculé", va:'fi_aveu' },
    { t:"Poser les quatre lignes sur la table",
      detail:"le registre de la crypte · le cachet de cadet · sa main",
      si:() => a('kar_quatre_noms') || a('pa_ysabel'),
      risque:"calculé", va:'fi_preuve' },
    { t:"« Pourquoi le parloir ? »",
      detail:"commencer par la seule chose qu'elle a organisée elle-même",
      risque:"prudent", va:'fi_parloir_pourquoi' },
  ],
},

fi_parloir_pourquoi:{
  qui:'ysabel',
  titre:"Pourquoi le parloir",
  texte:[
    "@« Pourquoi le parloir ? »",
    "C'est la première chose qui la déplace. Un mouvement des sourcils, très bref.",
    "« Parce qu'il fallait qu'on puisse me trouver », dit-elle.",
    "« Vous vouliez qu'on vous trouve. »",
    { sobre:"« Non. Je voulais qu'on **puisse** me trouver. Ce n'est pas pareil. »",
      intense:"« Non. Je voulais qu'on *puisse* me trouver. Ce n'est pas du tout la même chose et la nuance m'a occupée dix-neuf ans. » Elle ouvre une main. « Si j'avais voulu qu'on me trouve, j'aurais écrit. Personne ne m'a jamais écrit à moi, alors j'ai fait ce qu'il fallait pour ne pas être introuvable, et j'ai attendu. »",
      extreme:"« Non. Je voulais qu'on *puisse* me trouver. Ce n'est pas du tout la même chose, et la nuance m'a occupée dix-neuf ans — c'est même à peu près la seule chose qui m'ait occupée en dehors des comptes. » Elle ouvre une main sur la table. « Si j'avais voulu qu'on me trouve, j'aurais écrit une lettre. J'écris bien, j'ai le temps, et j'aurais su à qui. Je ne l'ai pas fait. J'ai simplement fait en sorte de n'être pas introuvable : mon nom, mon vrai nom, à quatre lieues d'une route de poste, dans une pièce où l'on entre sans frapper, quatre heures par jour. Et puis j'ai attendu que quelqu'un ait envie de chercher. »" },
    "« Personne n'est venu. »",
    "« Un homme vient tous les ans en Prairial et s'assoit contre le mur sud. » Elle le dit sans émotion. « Je l'ai vu la première année par la fenêtre haute. Il ne rentre pas. Je crois qu'il a peur de ce qu'il ferait. »",
    "§ Elle regarde vos mains. Pas votre visage : vos mains.",
    "« Vous, vous êtes rentré », dit-elle.",
  ],
  effets:{ flags:['fi_parloir_su'],
           marque:"« Je voulais qu'on puisse me trouver. Ce n'est pas pareil. » Dix-neuf ans au parloir.",
           court:"Le parloir" },
  suite:'fi_aveu', libelleSuite:"« Est-ce que c'est vous ? »" },

fi_preuve:{
  qui:'ysabel',
  titre:"Quatre lignes",
  texte:[
    "Vous posez ce que vous avez sur la table du parloir, à côté du registre de la fondation.",
    () => a('kar_quatre_noms')
      ? "La dernière page du registre de maison, sortie d'une crypte sous vingt ans de ronces. Quatre lignes d'une écriture penchée, dont une porte son nom."
      : "La copie du folio quarante-quatre du registre de maître Ombelin, tailleur de sceaux : un cachet de cadet, loup au filet vide, commandé par le chef de maison pour sa sœur cadette.",
    { sobre:"Elle regarde. Elle ne touche pas.",
      intense:"Elle regarde longuement, sans toucher, les mains toujours croisées sur son propre registre. Puis elle fait une chose que vous n'attendiez pas : elle corrige.",
      extreme:"Elle regarde longuement, sans rien toucher, les mains toujours croisées sur la couverture de son propre registre. Elle lit tout, y compris ce qui n'a pas d'importance. Puis elle fait une chose que vous n'attendiez à aucun moment de cette matinée : elle corrige." },
    "« La date est fausse », dit-elle.",
    "« Pardon ? »",
    "« La date du cachet. On l'a fait tailler en Ventôse, pas en Nivôse — mon frère l'a payé en Nivôse et l'a fait tailler deux mois plus tard, parce qu'il oubliait ce genre de choses et que c'est moi qui lui rappelais. » Un temps. « C'est moi qui ai rappelé à mon frère de faire tailler le cachet avec lequel j'allais écrire à Chastel. »",
    "§ Elle vient d'avouer en corrigeant une date.",
    "« Vous ne niez pas. »",
    "« Je ne nie rien depuis dix-neuf ans, messire. Personne ne m'avait rien demandé, c'est tout. »",
  ],
  effets:{ flags:['fi_preuve','fi_avoue'],
           marque:"Elle a avoué en corrigeant une date. Le cachet a été taillé en Ventôse, pas en Nivôse.",
           court:"La date est fausse" },
  suite:'fi_aveu', libelleSuite:"« Pourquoi. »" },

/* ══ L'AVEU ═══════════════════════════════════════════════════════════════ */
fi_aveu:{
  qui:'ysabel',
  titre:"Quatre lignes et une nuit",
  texte:[
    "@« Est-ce que c'est vous ? »",
    "« Oui. »",
    { sobre:"Aucun délai. Aucune préparation.",
      intense:"Aucun délai, aucune préparation, aucune des trois secondes qu'un être humain prend d'ordinaire avant d'avouer une chose de cette taille. Elle a eu dix-neuf ans pour préparer cette syllabe-là.",
      extreme:"Aucun délai, aucune préparation, aucune des trois ou quatre secondes qu'un être humain prend avant d'avouer une chose de cette taille. Elle a eu dix-neuf ans, quatre heures par matinée, six mille neuf cents matinées, pour préparer cette syllabe. C'est probablement le seul mot au monde qu'elle prononce sans y penser." },
    "« J'ai écrit quatre lignes au commissariat aux titres de Chastel en Germinal de la cent-quarante-troisième année. Je les ai écrites de ma main, scellées de mon cachet, et je les ai données au chapelain pour la poste, en lui disant que c'était une demande de secours pour la fondation d'un hospice. Il ne savait pas. »",
    "« Qu'est-ce qu'elles disaient ? »",
    "« Que la maison de Karlsberg entretenait une pratique héréditaire dont le registre du bailliage ne portait pas mention. Que le chef de maison se proposait de s'en servir publiquement. Et que la province avait intérêt à savoir ce qu'elle avait sur son flanc nord. »",
    "§ Quatre lignes. Une maison rayée, une nuit, une cour, un enfant de neuf ans mort dedans.",
    "« Vous saviez ce qu'ils feraient. »",
    { sobre:"« Non. »",
      intense:"« Non. »\n\n« Vous avez dénoncé une maison à un commissariat aux titres. »\n\n« J'ai dénoncé une maison à un **commissariat aux titres**, messire. Un bureau. Trois hommes, quatre cents volumes et une pile de droite. »",
      extreme:"« Non. »\n\n« Vous avez dénoncé une maison. »\n\n« J'ai dénoncé une maison à un commissariat aux titres. Écoutez le nom de l'institution, parce que c'est toute mon histoire : un *commissariat aux titres*. Un bureau. Trois hommes, quatre cents volumes de répertoire général, un guichet, une pile de gauche et une pile de droite. Ce que fait un commissariat aux titres quand il reçoit une lettre comme la mienne, c'est une enquête de trois ans, une convocation, et à la fin — au pire, au tout pire — une rature. Une ligne barrée dans un registre. La maison éteinte, les biens versés à la province, mon frère humilié devant un tribunal, et tout le monde vivant. »" },
    "« C'est ce que vous vouliez. »",
    "« C'est exactement ce que je voulais. » Sa voix n'a pas bougé. « Je voulais une rature. »",
    "Elle décroise enfin les mains.",
    { sobre:"« On m'a donné une nuit. »",
      intense:"« On m'a donné une nuit et quarante hommes. » Elle regarde la fenêtre haute. « Il y a dix-neuf ans que j'essaie de comprendre à quel étage de ce bâtiment ma lettre a cessé d'être une affaire de registre. »",
      extreme:"« On m'a donné une nuit, quarante hommes et une ordonnance signée du bas de la maison. » Elle regarde la fenêtre haute, la seule chose de cette pièce qui donne sur autre chose que des murs. « Il y a dix-neuf ans que j'essaie de comprendre à quel étage de ce bâtiment ma lettre a cessé d'être une affaire de registre pour devenir une affaire d'hommes armés. Je n'ai pas de réponse. Je n'aurai jamais de réponse. Ce n'est pas une excuse : ce que j'ai mis dans une boîte aux lettres a produit ce que ça a produit, et l'ignorance de la mécanique n'enlève pas une once du résultat. »" },
    "§ Elle ne pleure pas. Elle n'a probablement plus rien à pleurer depuis très longtemps.",
  ],
  choix:[
    { t:"« Pourquoi. »",
      detail:"la seule question à laquelle personne d'autre ne peut répondre",
      risque:"calculé", va:'fi_pourquoi' },
    { t:"« Loys avait neuf ans. »",
      detail:"le nom de votre frère · dans la cour, devant la porte des cuisines",
      risque:"calculé", va:'fi_loys' },
    { t:"Ne rien demander de plus",
      detail:"vous avez l'aveu · le reste est à elle et vous n'en voulez pas",
      risque:"prudent", va:'fi_choix' },
  ],
},

fi_pourquoi:{
  qui:'ysabel',
  titre:"Un enfant sur trois",
  texte:[
    "@« Pourquoi. »",
    "Elle prend son temps, cette fois. C'est la première fois de la matinée.",
    "« Vous savez ce que la maison gardait. »",
    "« Oui. »",
    "« Vous l'avez. »",
    "« Oui. »",
    { sobre:"« Moi non. »",
      intense:"« Moi non. » Elle le dit exactement du même ton qu'elle a dit *oui*. « Un enfant sur trois, dans cette famille, naît sans. Ce n'est écrit nulle part parce qu'on n'écrit pas ce genre de chose : on le sait, on le constate à onze ou douze ans, et on n'en reparle plus jamais. »",
      extreme:"« Moi non. » Elle le dit du même ton exactement qu'elle a dit *oui* à la question de savoir si elle avait fait rayer sa propre maison. « Un enfant sur trois, dans cette famille, naît sans. Ce n'est écrit nulle part — on n'écrit pas ce genre de chose, on n'en tient pas le compte, on le constate à onze ou douze ans quand rien ne vient, et ensuite on n'en reparle plus jamais de toute la vie de l'enfant. C'est ça, la mécanique. Pas la cruauté : le silence poli. »" },
    "« Et alors ? »",
    "« Et alors j'ai passé quarante-cinq ans dans une maison de quatorze personnes où j'étais la seule à qui l'on n'expliquait rien. » Elle a un geste minuscule de la main. « Pas la seule qu'on maltraitait. La seule à qui l'on n'expliquait rien, ce qui est très différent et beaucoup plus long. On ne m'a jamais rien refusé, messire. On ne m'a jamais rien proposé. »",
    "« Ce n'est pas une raison de faire tuer quatorze personnes. »",
    { sobre:"« Non. Ce n'en est pas une. »",
      intense:"« Non, ce n'en est pas une, et je ne vous la donne pas comme une raison. Vous m'avez demandé pourquoi ; je vous réponds pourquoi. Ce que vous appelez une raison, c'est quelque chose qui excuse. Il n'y en a pas. »",
      extreme:"« Non. Ce n'en est pas une, et je ne vous la donne pas comme telle. Vous m'avez demandé pourquoi, je vous réponds pourquoi : ce sont deux opérations distinctes et il n'y a que la première qui m'intéresse. Ce que vous appelez une raison est une chose qui excuse. Il n'y en a pas, il n'y en aura pas, et si j'en avais trouvé une en dix-neuf ans je serais partie d'ici depuis longtemps. »" },
    "§ « Il y a une deuxième chose », dit-elle, « et elle est pire. »",
    "« Dites. »",
    { sobre:"« Il allait s'en servir. »",
      intense:"« Votre père allait s'en servir. Publiquement, dans une guerre de province, contre des hommes. Il me l'a dit à table, en Pluviôse, comme on annonce un projet de bâtiment. »",
      extreme:"« Votre père allait s'en servir. Publiquement, devant des témoins, dans une guerre de province qui se préparait depuis deux ans et qui a fini par se faire sans lui. Il l'a annoncé à table, en Pluviôse, entre le potage et le reste, comme on annonce un projet de grange. Quatorze personnes autour de cette table. Personne n'a rien dit. Moi non plus. »" },
    "« Et vous avez pensé que ça les ferait tuer. »",
    "« J'ai su que ça les ferait tuer. Ce n'est pas de la clairvoyance : quatre cents ans que cette famille se cache, et il allait le faire voir à trois cents hommes en une après-midi. » Elle referme les mains. « J'ai eu raison, messire. C'est la partie que personne ne veut entendre. J'ai eu absolument raison sur ce point, et je m'y suis prise de la seule façon qui garantissait le désastre. »",
  ],
  effets:{ flags:['fi_pourquoi','a2_ysabel_motif'],
           marque:"Un enfant sur trois naît sans. Elle était celle-là. Et le père allait s'en servir en public.",
           court:"Un enfant sur trois" },
  suite:'fi_enfants', libelleSuite:"« Et le chapelain ? »" },

fi_loys:{
  qui:'ysabel',
  titre:"Loys",
  texte:[
    "@« Loys avait neuf ans. »",
    { sobre:"Elle ferme les yeux.",
      intense:"Elle ferme les yeux, et c'est la première défaillance de toute la matinée — pas des larmes : une fermeture.",
      extreme:"Elle ferme les yeux. C'est la première défaillance visible de toute la matinée, et ce ne sont pas des larmes : c'est une fermeture, nette, comme on ferme un volet à une heure décidée d'avance parce qu'on sait ce qui passe dans la rue à ce moment-là." },
    "« Loys avait neuf ans et il était dans la cour », dit-elle. « Devant la porte des cuisines. Il avait une épée de bois qu'un homme de la garnison lui avait taillée pour la Saint-Aubin. »",
    "« Vous étiez là. »",
    "« J'étais à la fenêtre du haut. »",
    "§ Vous ne saviez pas ça. Personne ne vous a jamais dit ça.",
    "« Vous l'avez vu. »",
    { sobre:"« Oui. »",
      intense:"« Oui. » Elle rouvre les yeux. « Et je vais vous dire la chose que vous êtes venu chercher sans le savoir, parce que c'est la seule que j'aie. Il ne s'est pas caché. »",
      extreme:"« Oui. » Elle rouvre les yeux et les tient sur vous, et sa voix ne bouge toujours pas, ce qui devient à ce stade proprement effrayant. « Et je vais vous dire la chose que vous êtes venu chercher ici sans le savoir vous-même, parce que c'est la seule que je possède et qu'elle ne vaut rien pour personne d'autre que vous. Il ne s'est pas caché. »" },
    "« Quoi ? »",
    "« Votre frère ne s'est pas caché. Il est allé se mettre devant la porte des cuisines avec son épée de bois, entre la porte et les hommes, et il y est resté. » Un temps. « Vous étiez derrière cette porte. Le chapelain vous faisait descendre par la cave à ce moment-là. »",
    "§ Neuf ans. Une épée de bois. Onze secondes, peut-être douze.",
    "« Je ne vous dis pas ça pour qu'il vous en reste quelque chose de doux », dit-elle. « Je vous le dis parce que c'est vrai et que je suis la seule personne vivante à l'avoir vu. »",
  ],
  effets:{ flags:['fi_loys','a2_loys_su'],
           faire:() => { ETAT.faits.push("Loys s'est mis devant la porte des cuisines avec une épée de bois."); },
           exploit:{ eclat:2, temoins:'aucun', quoi:"vous savez comment votre frère est mort" },
           marque:"Loys ne s'est pas caché. Il s'est mis devant la porte des cuisines, avec une épée de bois.",
           court:"L'épée de bois" },
  suite:'fi_enfants', libelleSuite:"« Et le chapelain ? »" },

fi_enfants:{
  qui:'ysabel',
  titre:"La cave",
  texte:[
    "@« Le chapelain m'a fait descendre par la cave. »",
    "« Oui. »",
    "« Comment savait-il qu'il fallait le faire cette nuit-là ? »",
    { sobre:"Silence.",
      intense:"Elle ne répond pas. Pour la première fois, elle regarde la table.",
      extreme:"Elle ne répond pas. Pour la première fois de la matinée elle regarde la table, et pas vous, et pas la fenêtre — et vous comprenez que vous venez de poser la seule question qu'elle n'a pas passé dix-neuf ans à préparer, parce que c'est la seule dont la réponse pourrait ressembler à une défense." },
    "@« Ysabel. »",
    "« Je le lui ai dit », dit-elle.",
    "§ La pièce ne change pas. C'est vous qui changez de place dedans.",
    "« Vous le lui avez dit. »",
    { sobre:"« Trois jours avant. »",
      intense:"« Trois jours avant. Je lui ai dit que si des hommes venaient de nuit, il devait prendre les deux enfants et sortir par la cave, sans attendre, sans demander, sans réveiller personne d'autre. »",
      extreme:"« Trois jours avant. Je suis allée le trouver, je lui ai fait jurer, et je lui ai dit que si des hommes venaient de nuit — n'importe quels hommes, n'importe quelle nuit — il devait prendre les deux enfants et sortir par la cave immédiatement. Sans attendre. Sans demander. Sans réveiller votre père, sans réveiller votre mère, sans se retourner. Il m'a demandé pourquoi. Je lui ai dit que ce n'était pas son affaire. Il a juré. C'était un homme qui tenait ses serments et il l'a tenu, et il est mort trois ans plus tard sans avoir jamais rien dit à personne. »" },
    "« Vous avez organisé notre sortie. »",
    "« Oui. »",
    "« Et vous avez écrit la lettre. »",
    "« Oui. »",
    { sobre:"« Les deux. »",
      intense:"« Les deux. » Elle relève la tête. « Ne cherchez pas laquelle des deux est la vraie, messire. Il n'y a pas de vraie. J'ai fait les deux, dans le même mois, avec la même main, et je savais parfaitement ce que je faisais dans les deux cas. »",
      extreme:"« Les deux. » Elle relève la tête et vous regarde de nouveau, et il n'y a rien dans son visage qui demande quoi que ce soit. « Ne cherchez pas laquelle des deux est la vraie. C'est ce que tout le monde fait et c'est ce qui empêche de comprendre quoi que ce soit à ce genre d'histoire. Il n'y a pas de vraie. J'ai écrit quatre lignes pour faire rayer cette maison, et je suis allée trois jours plus tôt faire jurer à un prêtre de sortir les enfants par la cave. Même mois. Même main. Même femme, parfaitement lucide dans les deux cas. »\n\n« Pourquoi les enfants ? »\n\n« Parce que vous n'aviez rien décidé. »" },
    "§ Vous êtes vivant à cause d'elle. Loys est mort à cause d'elle. Les deux sont vrais et il n'y a aucune façon de n'en garder qu'un.",
    "« Loys était dans la cour », dites-vous.",
    "« Loys était dans la cour parce qu'il est sorti par la porte au lieu de descendre par la cave », dit-elle, et sa voix casse enfin, sur ce mot-là et pas un autre, dix-neuf ans plus tard, à soixante-quatre ans, dans un parloir de campagne. « Le chapelain l'a appelé deux fois. »",
  ],
  effets:{ flags:['fi_enfants','a2_ysabel_complet'],
           faire:() => { ETAT.faits.push("Elle a écrit la lettre et fait jurer au chapelain de sortir les enfants. Les deux."); },
           marque:"Même mois, même main. Elle a fait rayer la maison et elle vous a fait sortir par la cave.",
           court:"Les deux" },
  suite:'fi_choix', libelleSuite:"Il reste à décider" },

/* ══ LA DÉCISION ══════════════════════════════════════════════════════════
 * Cinq portes. Aucune n'est la bonne et le jeu ne dira jamais laquelle
 * l'était. Elles ferment toutes quelque chose. */
fi_choix:{
  qui:'ysabel',
  lieu:"Sainte-Ombre · le parloir",
  titre:"Ce qu'on en fait",
  texte:[
    "Il est un peu plus de neuf heures. Le parloir ferme à dix.",
    { sobre:"Elle attend. Elle ne demande rien.",
      intense:"Elle attend, les mains sur son registre, dans la position exacte où vous l'avez trouvée en entrant. Elle ne demande rien et elle ne se lève pas.",
      extreme:"Elle attend, les mains croisées sur la couverture de son registre de fondation, dans la position exacte où vous l'avez trouvée en entrant une heure plus tôt. Elle ne demande rien. Elle ne se lève pas, ne recule pas, ne regarde pas la porte. Elle a organisé dix-neuf ans de sa vie autour de cette heure-ci ; il n'y a plus rien à organiser." },
    "« Vous avez une épée », dit-elle enfin, non pas comme une plainte : comme un point d'ordre.",
    "« Oui. »",
    "« C'est votre droit. Il n'y a pas de tribunal pour ça — une maison rayée n'a plus de partie civile, c'est même l'objet de la rature. » Elle hausse à peine les épaules. « Personne ne vous poursuivra. Les sœurs diront qu'un homme est entré et qu'elles n'ont pas vu son visage, et ce sera vrai. »",
    "« Vous plaidez pour ? »",
    "« Je constate. J'ai tenu des comptes toute ma vie, messire. Je constate. »",
  ],
  choix:[
    { t:"La tuer",
      detail:"une heure de cheval, dix-neuf ans, et quatorze personnes · c'est votre droit",
      risque:"définitif", definitif:true,
      ferme:"Ferme : tout ce qu'elle est la seule à savoir",
      va:'fi_tuer' },

    { t:"Lui faire tout écrire, signé",
      detail:"la lettre, les quatre lignes, le chapelain, la cave · et l'envoyer à Chastel",
      risque:"définitif", definitif:true,
      ferme:"Ferme : le silence qui protégeait votre nom",
      va:'fi_ecrire' },

    { t:"L'emmener",
      detail:"vivante, hors d'ici · devant une maison, devant les Parias, ou devant vous",
      risque:"définitif", definitif:true,
      ferme:"Ferme : la paix de cette femme, et probablement la vôtre",
      va:'fi_emmener' },

    { t:"Partir sans rien faire",
      detail:"refermer la porte du parloir · et la laisser à ses comptes",
      risque:"définitif", definitif:true,
      ferme:"Ferme : la possibilité d'y revenir un jour autrement",
      va:'fi_partir' },

    { t:"Lui demander une dernière chose",
      detail:"il y a une question qu'elle n'a pas eu à répondre et qui n'est pas « pourquoi »",
      risque:"calculé", va:'fi_derniere' },
  ],
},

fi_derniere:{
  qui:'ysabel',
  titre:"La dernière chose",
  texte:[
    "@« Une dernière chose. »",
    "« Je vous écoute. »",
    "« Vous avez recommencé ? »",
    { sobre:"« Pardon ? »",
      intense:"« Pardon ? »\n\n« En dix-neuf ans. Est-ce que vous avez écrit à quelqu'un d'autre. Une autre maison. Un autre nom. »",
      extreme:"« Pardon ? »\n\n« En dix-neuf ans. Est-ce que vous avez écrit à quelqu'un d'autre — une autre maison, un autre nom, une autre lettre de quatre lignes à un bureau qui a une pile de droite. Vous êtes ici avec de l'encre, du papier et quatre heures par jour, et vous avez appris que ça marchait. »" },
    "Elle a un très léger mouvement de la tête, qui pourrait être de l'approbation.",
    "« C'est une bonne question », dit-elle. « C'est la seule bonne question de la matinée, et personne n'aurait pensé à la poser. »",
    "« Répondez. »",
    "« Non. Je n'ai jamais rien écrit d'autre à personne. » Elle ouvre le registre de la fondation à la page où son doigt était resté. « Regardez la colonne de droite. Personne ne m'a jamais demandé à quoi elle sert. »",
    "Vous regardez. C'est une colonne de dates.",
    { sobre:"« Ce sont des versements », dit-elle.",
      intense:"« Ce sont des versements. La fondation de Sainte-Ombre entretient onze hospices de route. La colonne de droite dit lequel, et depuis quand. »",
      extreme:"« Ce sont des versements. Cette fondation entretient onze hospices de route entre Fort-aux-Princes et les Marches Grises — des maisons de trois lits où l'on couche les gens qui n'ont nulle part, gratuitement, sans registre et sans question. La colonne de droite dit lequel, et depuis quand, et c'est moi qui les ai tous fondés, un par un, en dix-neuf ans, avec l'argent d'une fondation dont j'ai fait doubler le revenu parce que je sais tenir des comptes. »" },
    "« Onze. »",
    "« Onze. Et avant que vous le disiez : non, ça ne compense rien, ça ne rachète rien, et ce n'est pas fait pour. » Elle referme le registre. « Quatorze morts, onze hospices. Ce n'est pas une balance, c'est une liste. J'ai simplement décidé, il y a dix-neuf ans, que puisque je resterais en vie, je resterais en vie **à faire quelque chose**, et pas à me tordre les mains dans une cellule. Les gens qui se tordent les mains ne servent à rien du tout. »",
    "§ Elle a raison sur ce point aussi, et c'est insupportable.",
  ],
  effets:{ flags:['fi_hospices','a2_onze_hospices'],
           marque:"Onze hospices de route en dix-neuf ans. « Ce n'est pas une balance, c'est une liste. »",
           court:"Onze hospices" },
  suite:'fi_choix2', libelleSuite:"Il reste à décider" },

fi_choix2:{
  qui:'ysabel',
  titre:"Neuf heures et demie",
  texte:[
    "Le parloir ferme à dix heures. Il en est neuf et demie.",
  ],
  choix:[
    { t:"La tuer",
      detail:"c'est votre droit, elle vient de le dire elle-même",
      risque:"définitif", definitif:true, ferme:"Ferme : onze hospices, et tout ce qu'elle sait", va:'fi_tuer' },
    { t:"Lui faire tout écrire, signé",
      detail:"et l'envoyer à Chastel · une rature contre une rature",
      risque:"définitif", definitif:true, ferme:"Ferme : le silence qui protégeait votre nom", va:'fi_ecrire' },
    { t:"L'emmener",
      detail:"vivante, hors d'ici",
      risque:"définitif", definitif:true, ferme:"Ferme : la paix de cette femme", va:'fi_emmener' },
    { t:"Partir",
      detail:"refermer la porte du parloir à neuf heures trente",
      risque:"définitif", definitif:true, ferme:"Ferme : la possibilité d'y revenir autrement", va:'fi_partir' },
  ],
},

fi_tuer:{
  qui:'ysabel',
  titre:"Le parloir de dix pieds sur douze",
  texte:[
    { sobre:"Elle ne bouge pas.",
      intense:"Elle ne bouge pas, ne se lève pas, ne lève pas les mains. Elle repousse simplement le registre de la fondation vers le bord de la table, du côté opposé, pour qu'il ne soit pas abîmé.",
      extreme:"Elle ne bouge pas. Ne se lève pas, ne recule pas, ne lève pas les mains — rien de ce que fait un corps quand il comprend. Elle fait une seule chose, et vous la verrez toute votre vie : elle repousse le registre de la fondation vers le bord opposé de la table, à deux mains, avec soin, pour qu'il ne soit pas abîmé. Trois cents couronnes l'an, onze hospices, une écriture petite et régulière. Elle range ses comptes." },
    "« Il y a une clef dans le tiroir de gauche », dit-elle. « La sœur cellérière ne saura pas où elle est. »",
    "« Taisez-vous. »",
    "« Le coffre de la fondation, messire, pas le mien. Je n'ai rien à moi. »",
    "§ C'est tout. Il n'y a pas de dernier mot, pas de pardon demandé, pas de nom prononcé.",
    { sobre:"C'est très court.",
      intense:"C'est très court, et c'est la partie que personne ne raconte : une femme de soixante-quatre ans assise à une table ne se défend pas, ne fuit pas, n'oppose rien. Il n'y a aucune difficulté technique. Absolument aucune.",
      extreme:"C'est très court. C'est la partie que personne ne raconte jamais dans ces histoires-là : une femme de soixante-quatre ans assise à une table de parloir ne se défend pas, ne fuit pas, n'oppose strictement rien à un homme de trente ans qui a onze ans de contrats derrière lui. Il n'y a aucune difficulté technique. Il n'y a rien du tout. Toute la difficulté était avant, et elle est restée avant." },
    "Vous ressortez à neuf heures quarante. La femme au balai est toujours sur le seuil.",
    "« Elle est morte », dites-vous.",
    "« Oui », dit la femme, et elle continue de balayer, et vous ne saurez jamais ce que ce *oui* voulait dire.",
    "§ Vous n'êtes pas poursuivi. Une maison rayée n'a plus de partie civile : c'est l'objet même de la rature, et le droit de la province vient de vous rendre le seul service qu'il vous ait jamais rendu.",
  ],
  effets:{ flags:['fi_tuee','a2_ysabel_morte'],
           faire:() => { ETAT.suspicion = Math.min(100, ETAT.suspicion + 6); },
           exploit:{ eclat:4, temoins:'un', quoi:"la dernière personne qui savait est morte dans un parloir" },
           marque:"Vous l'avez tuée dans un parloir de dix pieds sur douze. Elle avait rangé ses comptes d'abord.",
           court:"Le parloir" },
  plusTard:"Onze hospices de route perdent leur comptable. Trois ferment dans les deux ans.",
  suite:'a2_epilogue', libelleSuite:"Ce que le monde en a fait" },

fi_ecrire:{
  qui:'ysabel',
  titre:"De sa main",
  texte:[
    "@« Écrivez. »",
    "« Quoi ? »",
    "« Tout. Les quatre lignes, la date, le cachet, le chapelain, la cave, la fenêtre du haut. De votre main, signé, scellé de ce cachet de cadet si vous l'avez encore. »",
    { sobre:"« Je l'ai encore. »",
      intense:"« Je l'ai encore », dit-elle. « Dans le tiroir de droite, sous les quittances. Je ne m'en suis pas servie depuis dix-neuf ans et je ne l'ai pas jeté, et vous devinez pourquoi. »",
      extreme:"« Je l'ai encore », dit-elle, et elle ouvre le tiroir de droite sans se lever. « Sous les quittances de l'année passée. Je ne m'en suis pas servie depuis dix-neuf ans, je ne l'ai jamais jeté, et je n'ai jamais su dire si c'était par lâcheté ou par comptabilité. Vous venez de trancher pour moi et je vous en remercie sincèrement. »" },
    "Elle écrit trois heures. Le parloir devait fermer à dix ; personne ne vient.",
    "§ Elle n'écrit ni long ni beau : elle écrit **exact**. Dates, noms, montants, itinéraire du courrier, nom du chapelain, nom du tailleur de sceaux, folio du registre. C'est un document d'archiviste, et c'est cent fois pire qu'une confession.",
    "Quatre pages. Elle signe *Ysabel de Karlsberg*, ce qu'elle n'a pas écrit depuis dix-neuf ans, et elle scelle.",
    "« Vous savez ce que ça fait », dit-elle en tendant les feuilles.",
    "« Ça rétablit la maison. »",
    { sobre:"« Ça rouvre l'affaire. Ce n'est pas pareil. »",
      intense:"« Ça rouvre l'affaire, messire. Ce n'est pas pareil. » Elle garde les feuilles une seconde de plus. « Une rature qu'on rouvre, c'est un tribunal, des dépositions, une enquête sur ce que la maison gardait — et ce qu'elle gardait, vous l'avez sous les côtes. »",
      extreme:"« Ça rouvre l'affaire. Ce n'est pas du tout pareil et vous allez le découvrir à vos dépens si vous ne le mesurez pas maintenant. » Elle garde les feuilles une seconde de plus que nécessaire. « Une rature qu'on rouvre, c'est un tribunal de province, des dépositions publiques, une commission — et l'objet de l'enquête sera *ce que la maison de Karlsberg gardait*, puisque c'est ce que dit ma lettre. Vous allez faire écrire dans quatre cents volumes de répertoire général la seule chose que quatre cents ans de vos ancêtres se sont épuisés à ne pas y faire écrire. Et vous, vous l'avez sous les côtes. »" },
    "« Donnez. »",
    "Elle donne.",
    "« Bien », dit-elle, et elle rouvre son registre de fondation à la page où son doigt était resté ce matin. « Vous fermerez la porte en sortant. »",
  ],
  effets:{ flags:['fi_ecrit','a2_aveu_signe','a2_affaire_rouverte'],
           faire:() => { ETAT.suspicion = Math.min(100, ETAT.suspicion + 25); },
           exploit:{ eclat:12, temoins:'province', quoi:"l'aveu signé de celle qui a fait rayer Karlsberg" },
           marque:"Quatre pages, signées Ysabel de Karlsberg, scellées du cachet de cadet. L'affaire est rouverte.",
           court:"Quatre pages" },
  plusTard:"L'objet de l'enquête sera ce que la maison gardait. Vous l'avez sous les côtes.",
  suite:'a2_epilogue', libelleSuite:"Ce que le monde en a fait" },

fi_emmener:{
  qui:'ysabel',
  titre:"Hors d'ici",
  texte:[
    "@« Levez-vous. Vous venez avec moi. »",
    { sobre:"C'est la seule chose de la matinée qu'elle n'avait pas envisagée.",
      intense:"Elle vous regarde comme si vous aviez parlé une autre langue. C'est la seule chose de toute la matinée qu'elle n'avait pas envisagée en dix-neuf ans.",
      extreme:"Elle vous regarde comme si vous aviez parlé une autre langue, et vous comprenez que c'est la seule chose de toute cette matinée — de ces dix-neuf ans — qu'elle n'avait pas envisagée. Elle avait préparé la mort. Elle avait préparé l'aveu. Elle avait même préparé, on le devine, le fait que personne ne vienne jamais. Elle n'avait pas préparé de sortir." },
    "« Où ? »",
    "« Je ne sais pas encore. »",
    "« C'est une mauvaise réponse. »",
    "« C'est la seule que j'aie. Prenez votre manteau. »",
    "§ Elle met onze minutes à rassembler ce qu'elle possède, et ça tient dans une sacoche : deux vêtements, un couteau à papier, une paire de besicles, et le cachet.",
    "Elle laisse le registre de la fondation ouvert sur la table, avec un billet posé dessus. Vous ne lisez pas le billet.",
    "Sur le seuil, la femme au balai.",
    "« Sœur Ysabel s'en va », dit Ysabel.",
    "« Oui », dit la femme, et c'est tout, et personne n'essaie de rien.",
    { sobre:"Elle monte en croupe. Elle n'a pas monté à cheval depuis dix-neuf ans.",
      intense:"Elle monte en croupe, et il faut s'y reprendre à deux fois : elle n'est pas montée à cheval depuis dix-neuf ans et elle a soixante-quatre ans.",
      extreme:"Elle monte en croupe, et il faut s'y reprendre à deux fois parce qu'elle n'a pas monté à cheval depuis dix-neuf ans, qu'elle a soixante-quatre ans, et qu'elle refuse absolument qu'on l'aide au-delà d'une main. À la deuxième tentative elle est en selle, très droite, les deux mains sur la sacoche, et elle ne se retourne pas vers le mur." },
    "À la première halte, elle demande : « Qu'est-ce que vous allez faire de moi ? »",
    "@« Je ne sais pas. »",
    "« Alors ce sera long », dit-elle, et elle mange son pain.",
  ],
  effets:{ flags:['fi_emmenee','a2_ysabel_vivante','a2_ysabel_avec'],
           faire:() => { ETAT.suspicion = Math.min(100, ETAT.suspicion + 10);
                         retenir('caleb', "il a fait sortir une religieuse de Sainte-Ombre, à quatre lieues de chez moi"); },
           exploit:{ eclat:5, temoins:'quelques', quoi:"vous avez emmené vivante celle qui a fait rayer votre maison" },
           marque:"Vous l'avez emmenée. Elle n'était pas montée à cheval depuis dix-neuf ans.",
           court:"En croupe" },
  plusTard:"Une vieille femme qui sait tout et qui voyage avec vous. Il faudra bien en faire quelque chose, et elle attendra.",
  suite:'a2_epilogue', libelleSuite:"Ce que le monde en a fait" },

fi_partir:{
  qui:'ysabel',
  titre:"La porte du parloir",
  texte:[
    "Vous vous levez.",
    { sobre:"Elle ne dit rien.",
      intense:"Elle ne dit rien du tout. Elle attend de voir si vous allez vers elle ou vers la porte, et elle attend sans bouger, parce qu'elle a décidé il y a très longtemps de ne pas influer.",
      extreme:"Elle ne dit rien du tout. Elle attend de voir si vous allez vers elle ou vers la porte, sans bouger, sans un mot, sans même le petit ajustement de posture que fait un corps quand il espère. Elle a décidé il y a dix-neuf ans de ne rien peser dans cette scène-là, et elle tient sa décision jusqu'au bout, ce qui est peut-être la seule chose entièrement admirable de toute cette femme." },
    "Vous allez vers la porte.",
    "« Messire. »",
    "Vous vous arrêtez sans vous retourner.",
    { sobre:"« Ce n'est pas une clémence », dit-elle. « Ne le prenez pas pour ça. »",
      intense:"« Ce n'est pas une clémence », dit-elle. « Je vous le dis parce que vous allez y penser pendant des années et qu'il vaut mieux que ce soit clair : je n'ai rien reçu aujourd'hui. Je continue exactement comme avant, à la même table, aux mêmes heures. Vous n'avez rien changé du tout. »",
      extreme:"« Ce n'est pas une clémence », dit-elle. « Je vous le dis maintenant parce que vous allez y penser pendant des années et qu'il vaut mieux que ce soit clair tout de suite : je n'ai rien reçu aujourd'hui, vous ne m'avez rien donné, et il ne s'est rien passé qui ressemble à un pardon. Je continue exactement comme avant. Même table, mêmes heures, même colonne de droite. Vous n'avez rien changé du tout, sauf pour vous. »" },
    "« Je sais. »",
    "« Bien. » Un temps. « Fermez la porte. Il y a des femmes qui passent. »",
    "§ Vous fermez la porte du parloir de Sainte-Ombre à neuf heures quarante, et vous ne la rouvrirez jamais.",
    "À cinquante pas du mur, la route de poste monte vers Fort-aux-Princes. Une heure de cheval. Vous la regardez un long moment sans comprendre pourquoi.",
    "Puis vous comprenez : c'est ce qu'elle a regardé tous les matins pendant dix-neuf ans.",
  ],
  effets:{ flags:['fi_laissee','a2_ysabel_vivante','a2_ysabel_laissee'],
           exploit:{ eclat:3, temoins:'aucun', quoi:"vous êtes ressorti d'un parloir sans rien faire" },
           marque:"Vous avez fermé la porte du parloir. « Ce n'est pas une clémence. Ne le prenez pas pour ça. »",
           court:"La porte refermée" },
  plusTard:"Elle est toujours là, au parloir, de six à dix. Quelqu'un d'autre peut y aller.",
  suite:'a2_epilogue', libelleSuite:"Ce que le monde en a fait" },

/* ══ LA BASCULE DE TEMPS ══════════════════════════════════════════════════
 * Trois ans. Si le nom n'a pas été trouvé, l'acte se termine quand même —
 * ce n'est pas un échec, c'est un monde qui a continué plus vite que vous. */
a2_bascule_fin:{
  lieu:() => `${LIEUX[A2().lieu].nom} · le quatrième printemps`,
  titre:"Trois ans",
  texte:[
    "Trois ans.",
    { sobre:"C'est le temps qu'il a fallu à cinq guerres pour arriver à maturité.",
      intense:"C'est exactement le temps qu'il fallait à cinq guerres pour arriver à maturité, et elles n'ont attendu personne.",
      extreme:"C'est exactement le temps qu'il fallait à cinq guerres pour arriver à maturité. Elles n'ont attendu personne, elles n'ont tenu compte de rien, et aucune d'entre elles n'a le moins du monde changé de calendrier parce qu'un homme cherchait un nom dans quatre provinces." },
    () => {
      const A = A2(), hautes = Object.entries(A.crises || {})
        .filter(([, v]) => v >= 3).map(([k]) => CRISES[k].nom);
      if(!hautes.length) return "Aucune des cinq n'est arrivée au bout. C'est le meilleur état du monde qu'on pouvait espérer, et personne ne vous en saura gré.";
      return `Arrivées à maturité : ${hautes.join(' · ')}. Ce qui commence maintenant ne se joue plus à l'échelle d'un homme.`;
    },
    () => a('a2_nom_trouve')
      ? "Vous avez le nom. Vous n'êtes pas allé à Sainte-Ombre."
      : "Vous n'avez pas le nom. Quelqu'un, quelque part, a passé trois ans de plus à ne pas être trouvé, et à soixante-sept ans ça commence à compter.",
    "§ La question ne se referme pas : elle change d'échelle. Ce qui suit ne s'appelle plus chercher.",
  ],
  suite:'a2_epilogue', libelleSuite:"Ce que le monde en a fait" },

a2_epilogue:{ dyn:true, texte:[] },

};

enregistrerScenes(FIN2);

offrir({ id:'fi_mur', lieu:'sainteombre', va:'fi_mur',
         titre:"Un prieuré de trente-et-une femmes",
         si:() => a('a2_nom_trouve') });

/* ══ L'ÉPILOGUE ═══════════════════════════════════════════════════════════
 * Il ne raconte pas une fin : il lit l'état réel de la partie et rend des
 * verdicts. Chaque paragraphe est gagné par quelque chose qui s'est
 * réellement produit, et deux parties n'en produisent pas les mêmes. */
function verdictsA2(){
  const A = A2(), v = [];
  const l = lien('alycia'), e = lien('alarielle');

  /* — Karlsberg — */
  if(a('a2_bannieres'))
    v.push("**Karlsberg est sur les cartes.** Bannière noire au loup blanc, volume cent-quarante-trois, section des titres relevés. C'est la première maison rayée à se relever dans cette province depuis quatre-vingts ans, et trois bailliages ont demandé copie de l'acte pour savoir comment on fait.");
  else if(a('kar_refuge'))
    v.push("**Karlsberg n'a pas de nom.** Il y a des gens sous les ruines, il y a un puits qui remarche, et il n'y a rien sur aucune carte. Ceux qui y dorment ne savent pas comment s'appelle l'endroit, ce qui est le meilleur système de défense jamais inventé.");
  else if(a('kar_brule'))
    v.push("**Il n'y a plus rien à lire à Karlsberg.** Vous avez emporté ce qui comptait et brûlé le reste. Personne ne saura jamais ce qu'il y avait dans cette crypte — vous non plus, pour la moitié.");
  else if(a('kar_ferme'))
    v.push("**Karlsberg est refermée.** Les ronces ont repris en deux saisons. C'est une adresse que personne ne peut donner, et il y a des années où c'est tout ce qu'on demande.");
  else
    v.push("**Vous n'êtes pas retourné à Karlsberg.** Les ruines sont toujours des ruines, à onze lieues de toute route entretenue, et quelqu'un d'autre y descendra un jour.");

  /* — Ysabel — */
  if(a('a2_ysabel_morte'))
    v.push("**Ysabel de Karlsberg est morte dans un parloir.** Onze hospices de route ont perdu leur comptable ; trois ferment dans les deux ans. La fondation de Sainte-Ombre a mis quatre ans à retrouver un système de colonnes qui tienne.");
  else if(a('a2_aveu_signe'))
    v.push("**L'affaire de Karlsberg est rouverte.** Quatre pages d'une écriture petite et régulière, scellées d'un cachet de cadet, déposées au commissariat aux titres. Ce qui s'ouvre n'est pas une réhabilitation : c'est une enquête publique sur ce que la maison gardait.");
  else if(a('a2_ysabel_avec'))
    v.push("**Elle voyage avec vous.** Une femme de soixante-quatre ans, une sacoche, un cachet, et la totalité de ce qui s'est passé cette nuit-là dans une seule tête. Personne ne sait quoi en faire, elle la première.");
  else if(a('a2_ysabel_laissee'))
    v.push("**Elle est toujours au parloir, de six à dix.** Elle vous l'avait dit : ce n'était pas une clémence, et rien n'a changé pour elle. Gerbaud continue de venir s'asseoir contre le mur sud, tous les ans, en Prairial.");
  else if(a('a2_nom_trouve'))
    v.push("**Vous avez le nom et vous n'y êtes pas allé.** Quatre lieues. Il y a des hommes qui vivent trente ans avec quatre lieues devant eux.");
  else
    v.push("**Le nom n'a pas été trouvé.** Trois pistes, trois ans, et une question qui reste entière — ce qui, pour une question de cette nature, veut dire qu'elle sera reprise par quelqu'un d'autre.");

  /* — Alycia — */
  if(a('aly_ensemble'))
    v.push("**Le Loup et la Sorcière** est cloué sur onze murs d'étape et elle a gardé les onze affiches. Elle n'a jamais dit la phrase. Elle la fait, ce qui est plus long à voir et dure plus longtemps.");
  else if(a('aly_reseau_acquis'))
    v.push("**Trente-huit personnes ordinaires dans trente-quatre endroits ordinaires** travaillent pour ce que vous cherchez, et pas une d'entre elles ne connaît votre nom. Alycia est quelque part et vous ne savez pas où, ce qui est exactement ce qu'elle voulait.");
  else if(a('aly_onze_karlsberg'))
    v.push("**Onze Parias dorment à Karlsberg** — les plus vieux, ceux qui ne tenaient plus un déplacement de plus. Vingt-sept restent dispersés. Si Karlsberg tombe, onze tombent avec, et elle vous l'a dit avant de les amener.");
  else if(a('aly_partie'))
    v.push("**Alycia est partie remettre trente-huit personnes ailleurs.** Trois saisons, peut-être quatre, peut-être davantage. Elle a dit qu'elle reviendrait et elle ne ment jamais sur ce genre de détail.");
  else if(a('aly_marie'))
    v.push("**Vous vous êtes marié dans une maison qui compte.** C'était le bon calcul et ça le reste. Alycia travaille toujours avec vous et ne s'assoit plus dos à la porte.");
  else if(l.relation >= 10)
    v.push("**Alycia de Callensbourg fait toujours la route avec vous**, trois longueurs devant, les auberges à deux sorties, les hommes comptés en entrant. Il n'y a rien de dit et il y a quatre saisons de route.");
  else
    v.push("**Alycia de Callensbourg est ailleurs.** Elle avait quinze ans d'avance sur vous en matière de disparition et elle les a toujours.");

  /* — Alarielle — */
  if(a('a2_onde_rendue'))
    v.push("**La dette elfique est écrite quelque part.** Onze parts distribuées il y a quatre cent onze ans, une liste détruite, et une archive rouverte par une elfe qui n'a pas détourné les yeux. Ce qui est au registre ne se referme plus.");
  else if(a('el_archives'))
    v.push("**« Cela ne se transmet pas droit. »** Un enfant sur trois naît sans, et personne dans votre famille ne l'a jamais écrit. Une elfe vous l'a fait lire dans un volume de quatre cents ans, et c'est ce qui explique tout le reste.");
  else if(e.relation >= 8)
    v.push("**Alarielle vous reçoit**, ce qui, à Aelthiriel, n'est ni rien ni beaucoup. Sa cour est en guerre et son frère compte les voix.");
  else if(a('a2_alarielle_scandale'))
    v.push("**Alarielle a parlé devant la cour et elle a perdu.** Elle a parlé quand même. Tyrion n'a pas oublié qui était dans la pièce.");
  else
    v.push("**Vous n'êtes pas allé à Aelthiriel**, ou vous y êtes allé sans qu'il en reste rien. Les archives elfiques resteront fermées de votre vivant.");

  /* — les cinq guerres — */
  const c = A.crises || {};
  const dit = [];
  for(const [id, n] of Object.entries(c)){
    const e2 = Math.min(4, Math.floor(n));
    if(e2 >= 3) dit.push(`**${CRISES[id].nom}** — ${CRISES[id].etapes[e2].toLowerCase()}`);
  }
  v.push(dit.length
    ? "Ce que le monde a fait pendant ce temps : " + dit.join(' · ') + "."
    : "Aucune des cinq guerres n'est arrivée au bout en trois ans. C'est rare, ça ne tiendra pas, et personne ne vous en saura gré.");

  /* — ce qu'on sait de vous — */
  if(ETAT.suspicion >= 75)
    v.push("**On sait ce que vous êtes.** Ce n'est plus une rumeur d'étape : c'est une commission de province, un dossier, et trois maisons qui ont voté pour. Ce qui vous cherche maintenant n'a plus rien d'un commanditaire.");
  else if(ETAT.suspicion >= 45)
    v.push("**On enquête.** Deux maisons ont demandé des relevés, un clerc a été payé pour lire des registres, et quelqu'un a fait graver un bois avec votre visage dessus.");
  else
    v.push("**On ne sait toujours pas.** Après trois ans, quatre provinces et onze étapes, il n'y a rien de plus au dossier qu'un homme d'armes de haute taille, cheval bai, épée à une main et demie.");

  /* — Karlsberg, ce qu'elle est devenue — */
  if(typeof palierDeKarlsberg === 'function' && CHANTIER().faits.length){
    const pal = palierDeKarlsberg();
    v.push(`**Karlsberg est ${pal.nom.toLowerCase()}.** ${pal.dit} `
      + (a('a2_pierre_regle') ? "Dans la fondation, en toutes lettres : *on ne demande pas d'où l'on vient*. Le tailleur a dit que ça voulait dire : venez."
       : a('a2_pierre_noms')  ? "Onze noms gravés dans l'angle sud-est, et trois lignes laissées vides. Ce sont les vides que les gens regardent."
       : a('a2_pierre_dates') ? "Deux dates dans l'angle sud-est, et rien sur qui l'a rasée."
       : a('a2_muraille')     ? "De Chastel, par temps clair, on voit Karlsberg."
       : a('a2_donjon')       ? "Onze cavaliers sont venus prendre les mesures du donjon et sont repartis sans descendre."
       : a('a2_refuge_ouvert')? "Trente lits, pleins en quatre mois, sous une règle affichée au charbon."
       : "Il y a un toit, de l'eau, et des gens dedans."));
  }

  /* — le dragon — */
  if(a('dr_mortelle'))
    v.push("**La Grande est morte sur le glacis de Karlsberg**, "
      + (a('dr_nains_rendu') ? "et elle est retournée sous la montagne par une porte rouverte un jour et refermée le soir. Il n'y a pas de trophée : il y a une route de montagne refaite qui passe par votre vallée."
       : a('dr_montdraken')  ? "et sa tête est la trois cent treizième pièce du mur de Mont-Draken, avec trois noms sur l'étiquette dont un nain."
       : "et personne n'a su quoi faire du matin."));
  else if(a('dr_vivante'))
    v.push("**La Grande est vivante.** Elle est partie vers le nord "
      + (a('dr_partie') && a('dr_defile') ? "après qu'on eut abattu douze pieds de sa propre courtine pour la laisser sortir."
         : "quand elle a eu fini, et pas une seconde avant.")
      + " Trois hameaux du nord l'apprendront avant l'hiver.");
  else if(a('a2_dragon'))
    v.push("**Il y a quelque chose dans les Marches Grises** qui ne correspond à aucune des trois cent douze pièces de Mont-Draken, et l'affaire n'est pas réglée.");

  /* — l'épouse, l'autre, l'enfant — */
  if(a('a2_alycia_epouse'))
    v.push("**Alycia de Callensbourg est votre femme.** "
      + (a('a2_callensbourg_releve')
         ? "Deux maisons rayées de la Route Grise sont alliées par acte, inscrites au bailliage, et parfaitement localisables."
         : "Devant quatre-vingts témoins, dans une chapelle, sans greffe : aucun tribunal ne le reconnaît et toute la province a compris ce qu'est Karlsberg."));
  else if(a('a2_alarielle_epouse'))
    v.push("**Alarielle est votre femme**, sous une rubrique créée pour l'occasion par un collège qui a siégé onze fois : *ce qu'on choisit en connaissant la durée*. Elle a deux cent onze ans. Vous en avez trente.");
  else if(a('a2_marie'))
    v.push(`**${GENS.epouse.nom} tient cette maison.** `
      + (a('a2_trois_signatures') ? "Il y a trois signatures sur une feuille de trois lignes, ce dont il n'existe aucun exemple en trois cents ans."
       : a('a2_epouse_froide')    ? "Elle l'a appris par une servante, comme la première fois. Elle tient sa parole à la lettre, et rien qu'à la lettre."
       : a('a2_epouse_proche')    ? "Il n'y avait personne d'autre. Deux personnes qui n'ont personne d'autre finissent par se parler ; ça prend des années."
       : a('a2_scandale')         ? "Vous avez refusé la fiction, et la province a choisi le mot elle-même."
       : "Les comptes sont justes, le four banal est bâti, l'école a onze élèves."));

  if(a('a2_enfant'))
    v.push("**Loyse est née à Karlsberg**, de deux Parias, dans la salle basse parce que c'est la pièce la mieux chauffée. Sa mère l'a mise sur sa liste avant qu'elle naisse et n'arrive pas à l'en sortir. Il faudra choisir, à ses onze ans, entre la cacher et la déclarer.");
  else if(a('a2_sans_enfant'))
    v.push("**Il n'y a pas d'enfant.** Les quatre points étaient mauvais, tous les quatre, et deux personnes qui savent compter ont dit non le même soir.");

  /* — les trois hommes — */
  const hommes = [];
  if(a('a2_caleb_pacte'))   hommes.push("**Caleb** a la route franche et un droit de premier refus sur votre forge" + (a('cb_signe') ? ", et une troisième clause qui dort au bailliage" : ""));
  else if(a('a2_caleb_note'))   hommes.push("**Caleb** vous a rangé dans la colonne de ceux qui ne s'achètent pas, qui n'est pas la bonne");
  else if(a('a2_caleb_froid'))  hommes.push("**Caleb** vous a retiré de son marché : vous ne pouvez plus acheter un essieu à trois lieues de chez vous");
  else if(a('a2_caleb_hostile'))hommes.push("**Caleb** vous a décrit le lendemain de sa propre mort, devant quatre clercs qui n'ont pas levé la tête");

  if(a('a2_titre_inattaquable')) hommes.push("**Astrah a un roi** et *Maison de Karlsberg, Marches Grises, reconnue* est la première ligne d'un rôle royal qu'aucun bailliage ne peut rayer");
  else if(a('a2_role_royal'))    hommes.push("**Astrah a un roi**, et vous êtes à la quatrième ligne de son rôle — ce qui était mérité");
  else if(a('a2_lucius_refuse')) hommes.push("**Lucius** vous a fait sortir par la cour d'honneur devant onze témoins, pour rien, après un refus sans témoins");
  else if(a('a2_lucius_froid'))  hommes.push("**Lucius** a mis une seconde de trop à répondre, et il n'en met jamais");

  if(a('a2_declare'))            hommes.push("**Le registre de Mont-Draken n'est plus vide** : il y a un nom au folio un, écrit de votre main, et il ne s'est rien passé");
  else if(a('a2_charles_attend'))hommes.push("**Charles** a soixante et un ans, un cahier vide dans une armoire, et il vous le redemandera");
  else if(a('a2_charles_froid')) hommes.push("**Charles** a rangé son registre neuf le jour où vous lui avez proposé quelqu'un d'autre, et vous avez entendu la clef");
  if(hommes.length) v.push(hommes.join(" · ") + ".");

  /* — ce qu'on a ouvert ailleurs — */
  const ailleurs = [];
  if(a('a2_eau'))          ailleurs.push("le premier forage khesh a donné à quatre-vingt-dix pieds, et le désert ne monte pas vers le nord cette décennie");
  if(a('a2_nains_dehors')) ailleurs.push("deux mille sept cent soixante Nains sont descendus en plaine, et deux cent quarante sont morts sur la route");
  if(a('a2_dette_naine'))  ailleurs.push("une dette de quatre-vingts ans est portée acquittée au relevé de Kar-Durak, par Karlsberg");
  if(a('a2_vaeth_ouvert')) ailleurs.push("le poste de Vaeth ne se fermera pas non plus pour trente ou quarante personnes arrivant ensemble");
  if(a('a2_onze_hospices'))ailleurs.push("onze hospices de route tiennent toujours entre Fort-aux-Princes et les Marches Grises");
  if(ailleurs.length) v.push("Ce qui reste ouvert ailleurs : " + ailleurs.join(' · ') + ".");

  /* — ce qui est fermé — */
  if(ETAT.portes && ETAT.portes.length)
    v.push("**Ce qui est fermé pour de bon :** " + ETAT.portes.slice(-6).join(' · ') + ".");

  return v;
}

DYN.a2_epilogue = () => {
  const A = A2();
  SCENES.a2_epilogue = {
    dyn:true,
    lieu:`Quatre provinces · ${dateA2()}`,
    titre:"Ce que le monde en a fait",
    texte:[
      "Un acte ne se termine pas : il change d'échelle. Ce qui suit est l'état réel du monde à la fin de la troisième année, lu sur ce qui s'est produit et pas sur ce qui était prévu.",
    ],
    issue:"Fin de l'Acte II",
    bilan: a('a2_ysabel_morte') ? "La dernière personne qui savait est morte dans un parloir de dix pieds sur douze."
         : a('a2_aveu_signe')   ? "L'affaire est rouverte, et l'objet de l'enquête sera ce que la maison gardait."
         : a('a2_ysabel_avec')  ? "Elle voyage avec vous, et personne ne sait quoi en faire."
         : a('a2_ysabel_laissee') ? "Vous avez fermé la porte du parloir, et ce n'était pas une clémence."
         : a('a2_nom_trouve')   ? "Vous avez le nom. Il reste quatre lieues."
         : "Trois ans, trois pistes, et une question entière.",
    apres: verdictsA2(),
    plusTard:"Les crises qui arrivent maintenant ne se jouent plus à l'échelle d'un homme. Le monde ne se referme pas : il monte d'un cran.",
  };
  aller('a2_epilogue');
};
