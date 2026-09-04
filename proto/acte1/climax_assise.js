/* PARIAS — Acte I · le contrat de bascule · L'ASSISE D'HIVER
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Ce n'est pas un contrat. Personne ne vous engage, personne ne vous paie,
 * et c'est la première fois de l'acte — voilà ce qui le rend différent des
 * six affaires du mur.
 *
 * Chastel monte son assise annuelle à Cendrepont. Chastel est semée trois
 * fois dans ce qui précède sans qu'on l'ait jamais vue : le poinçon sous la
 * douille du carreau, la compagnie qui abat la wyverne si Yohan ne la prend
 * pas, le clerc qui a lu les relevés d'Héloïse. C'est l'arsenal et ce sont
 * les archives. Ce sont les gens qui ont rayé la maison Karlsberg.
 *
 * Un seul banc, et c'est l'état de la partie qui le remplit. Le chef
 * d'accusation change de mots et jamais de fond :
 *
 *     quelqu'un a remué une pierre qu'on avait couchée il y a dix-neuf ans.
 *
 * L'ordalie n'est pas une bête. C'est un homme de quarante-sept ans qui a
 * gagné quarante et un duels judiciaires parce que Chastel n'apporte jamais
 * une cause qu'elle peut perdre — et parce que les règles du rond sont
 * écrites par son employeur.
 * ═══════════════════════════════════════════════════════════════════════ */

/* ── Qui est au banc ───────────────────────────────────────────────────────
 * Dans cet ordre. Le repli tient même pour un joueur qui n'a jamais touché
 * la wyverne : le prologue écrit toujours un nom sur un registre d'étape. */
const ACCUSES = [
  { si:() => a('loys') || a('vallee_se_souvient'), id:'loys',     qui:'loys' },
  { si:() => a('clerc_chastel'),                   id:'clerc',    qui:'clerc' },
  { si:() => a('pierre_en_depot'),                 id:'tailleur', qui:'tailleur' },
  { si:() => a('wy_amaury_ennemi'),                id:'amaury',   qui:'amaury' },
  { si:() => a('wy_gassien_vivant') && !a('wy_gassien_mort') && !a('wy_gassien_donne'),
                                                   id:'gassien',  qui:'gassien' },
  { si:() => true,                                 id:'sergent',  qui:'sergent' },
];
const accuse = () => ACCUSES.find(x => x.si());

/* ── Les règles du rond ────────────────────────────────────────────────────
 * Un duel judiciaire de Chastel n'est pas un combat : c'est une procédure.
 * Neuf pas de craie, pas de bouclier pour le requérant, trois temps pour le
 * champion et aucun pour vous. Sortir du rond vaut forfait, et un forfait
 * pend l'accusé. C'est le terrain, et le terrain appartient à Chastel. */
const ROND = { pas:9, temps:3 };
const tempsRestants = () => ROND.temps - (ETAT.acte.tempsPris || 0);

const ASSISE = {

/* ══ 1 · CHASTEL DESCEND ══════════════════════════════════════════════════ */
as_arrivee:{
  lieu:"Cendrepont · premières neiges · vingtième année après la Purge",
  titre:"Ce qui monte la vallée en hiver",
  texte:[
    "Rien ne monte cette vallée en hiver. C'est même la définition de l'hiver, ici : quinze jours après les premières neiges, la Route Grise se ferme, le col de Frimaire se ferme, et Cendrepont passe quatre mois à se regarder.",
    "Ce qui monte cette année arrive sur onze chariots, avec une escorte de trente hommes en manteau gris, et met six jours à faire ce qu'un cavalier fait en deux.",
    { sobre:"Neuf chariots portent des caisses. Deux portent des archives.",
      intense:"Neuf chariots portent des caisses cerclées de fer et bâchées de toile huilée. Deux portent des archives — on le sait parce qu'un essieu casse au troisième jour et qu'il faut tout décharger sur la neige : des registres, par centaines, dans des coffres de chêne numérotés à la craie, que six hommes remettent en place dans l'ordre exact où ils étaient.",
      extreme:"Neuf chariots portent des caisses cerclées de fer sous la toile huilée. Deux portent des archives — on l'apprend au troisième jour quand un essieu casse et qu'il faut tout décharger sur la neige : des registres par centaines, dans des coffres de chêne numérotés à la craie, que six hommes remettent en place dans l'ordre exact où ils étaient, en les recomptant deux fois, sous une pluie de grésil, pendant quatre heures." },
    "§ Il y a des maisons qui déplacent des armées. Chastel déplace ses papiers, et ça revient au même en plus lent.",
    "L'assise d'hiver de Chastel se tient une fois l'an dans un bourg de la province, par rotation, et elle ne s'est pas tenue à Cendrepont depuis vingt-deux ans. On dit que c'est parce que la Route Grise a rouvert. On le dit sans y croire tout à fait, et on a raison de ne pas y croire.",
    "L'aubergiste du Héron a vidé sa salle basse, décloué tous les papiers du mur du fond, et poncé la table. Il n'a pas été payé pour ça : on lui a dit de le faire.",
    () => a('palier_karlsberg')
      ? "Vous êtes dans cette vallée, en hiver, dans un bourg fermé, au moment où arrivent les gens dont le métier consiste à savoir qui est qui. On vous a dit d'être ailleurs. Vous n'êtes pas ailleurs."
      : "Vous êtes dans cette vallée pour la raison la plus bête du monde : l'hiver est arrivé quinze jours en avance et le col s'est fermé pendant que vous dormiez à trois lieues du sommet.",
  ],
  effets:{ flags:['assise'], marque:"L'assise d'hiver de Chastel s'est montée à Cendrepont.", court:"L'assise" },
  suite:'as_banc', libelleSuite:"La salle basse" },

/* ══ 2 · LE BANC — ce que vous avez laissé derrière ═══════════════════════ */
as_banc:{ dyn:true, texte:[], suite:'as_banc_sergent' },

as_banc_loys:{
  lieu:"L'auberge du Héron · la salle basse, vidée",
  titre:"Quinze ans",
  qui:'loys',
  texte:[
    "Il est assis sur un tabouret au milieu d'une pièce qu'il connaît par cœur, parce que sa mère y a servi de la bière pendant huit ans, et il ne la reconnaît pas.",
    "On a mis une table en travers, trois hommes derrière, un greffier sur le côté, et on a poussé les bancs contre les murs pour que le public tienne debout. Le public tient debout. Toute la vallée est là : il n'y a rien d'autre à faire en hiver et il n'y a rien de tel qu'une assise.",
    { sobre:"Il a quinze ans. Il tient ses mains l'une dans l'autre pour qu'elles arrêtent.",
      intense:"Il a quinze ans, il s'appelle Loys, et il tient ses mains l'une dans l'autre sur ses genoux pour qu'elles arrêtent de faire ce qu'elles font. Il a compris quelque chose que personne dans cette salle n'a encore compris — pas le chef d'accusation, qu'il ne saisit pas, mais le fait qu'aucun des trois hommes derrière la table ne l'a regardé une seule fois.",
      extreme:"Quinze ans. Il s'appelle Loys et il tient ses mains l'une dans l'autre sur ses genoux pour qu'elles arrêtent. Il a compris une chose que personne dans cette salle n'a encore comprise : aucun des trois hommes derrière la table ne l'a regardé une seule fois depuis qu'on l'a fait asseoir. On ne regarde pas une pièce à conviction." },
    "Il y a six semaines, il est monté à la falaise du gué parce que trois autres avaient dit qu'il n'oserait pas. Il a gratté la face sud d'une borne d'arpentage avec son couteau. Il l'a raconté debout sur un banc, dans cette salle, à des gens qui riaient.",
    "§ Un vieux charretier a dit « le domaine du Loup », et un homme de Chastel l'a entendu.",
    "Le vieux charretier est mort trois semaines plus tard, de vieillesse, à soixante-dix ans, dans son lit. C'est arrivé avant l'assise et personne n'y voit rien de particulier. Vous non plus, probablement.",
  ],
  effets:{ flags:['assise_loys'] },
  suite:'as_audience', libelleSuite:"Le chef d'accusation" },

as_banc_clerc:{
  lieu:"L'auberge du Héron · la salle basse, vidée",
  titre:"Le clerc",
  qui:'clerc',
  texte:[
    "Il porte encore la robe grise du greffe de Chastel, parce qu'on ne l'a pas destitué : on l'a fait asseoir sur un tabouret en robe de fonction, devant ses propres supérieurs, et c'est un raffinement de procédure qui vaut tous les fers du monde.",
    "Vingt-six ans. Il a passé quatre jours d'automne à lire quarante-trois relevés d'arpentage antérieurs à l'établissement de la maison de Valombre, pour une veuve qui l'avait payé pour trois.",
    { sobre:"Il a fait son métier. C'est tout ce qu'il a fait.",
      intense:"Il a fait son métier, et il l'a bien fait, et c'est exactement de ça qu'on lui fait grief. Un clerc qui lit vite est un clerc qui lit trop. Il a rendu à Héloïse de Valombre une transcription propre, datée, contresignée, avec en marge la mention d'un nom porté au relevé de la cent-quarante-troisième année et rayé du répertoire général.",
      extreme:"Il a fait son métier, bien, et c'est de ça qu'on lui fait grief. Un clerc qui lit vite lit trop. Il a rendu une transcription propre, datée, contresignée, avec en marge la mention d'un nom porté au relevé de la cent-quarante-troisième année et rayé du répertoire général — et il a ajouté, parce qu'un bon clerc ajoute toujours ça, la formule qui l'a perdu : *rature postérieure, main différente, sans ordonnance jointe.*" },
    "§ Sans ordonnance jointe. Trois mots. Ils disent qu'on a effacé un nom sans qu'aucun magistrat n'ait jamais signé qu'on pouvait.",
    "Il ne le sait probablement pas encore lui-même. Il a écrit ça comme on écrit une note de bas de page, un soir, en rangeant.",
  ],
  effets:{ flags:['assise_clerc','sans_ordonnance'] },
  suite:'as_audience', libelleSuite:"Le chef d'accusation" },

as_banc_tailleur:{
  lieu:"L'auberge du Héron · la salle basse, vidée",
  titre:"Le hangar",
  qui:'tailleur',
  texte:[
    "Ils ont trouvé la pierre. Ce n'est pas difficile de trouver une pierre quand on cherche une pierre : il y a onze tailleurs dans cette province et Chastel a onze hommes.",
    "Elle est là, sur la table, en travers, à côté du rôle : quarante livres de schiste gravé, la face sud d'un jalon impérial, avec un loup ancien de profil encadré de deux traits verticaux.",
    { sobre:"Le tailleur regarde la pierre. Il ne regarde que ça.",
      intense:"Le tailleur ne regarde pas les trois hommes derrière la table. Il regarde la pierre, et il la regarde comme un homme du métier regarde une taille — dans le sens de la gravure — parce que c'est la seule chose qu'il sache faire et qu'il est en train de la faire pour la dernière fois.",
      extreme:"Le tailleur ne regarde pas les juges. Il regarde la pierre, dans le sens de la gravure, comme un homme du métier lit une main — parce que c'est la seule chose qu'il sache faire et qu'il la fait pour la dernière fois. Ses mains sont posées à plat sur ses cuisses et il manque le bout de deux doigts à la gauche, ce qui n'a aucun rapport avec cette affaire et ce que personne dans la salle ne remarque." },
    "Recel de pierre de justice. Le chef existe, il est vieux, il est rarement invoqué, et il porte la corde.",
    "§ Il vous a demandé deux sous par semaine et il ne l'a pas inscrit au registre du hangar. C'est ce non-inscrit qui le tue : un dépôt déclaré serait une négligence, un dépôt caché est une intention.",
    "Son grand-père a taillé pour une maison rayée, plus au sud, il y a quarante ans, et il a continué d'être payé deux ans par des gens qui n'existaient plus parce que l'intendant n'avait pas reçu l'ordre d'arrêter. Il vous l'a raconté en rabattant la toile.",
  ],
  effets:{ flags:['assise_tailleur','pierre_saisie'] },
  suite:'as_audience', libelleSuite:"Le chef d'accusation" },

as_banc_amaury:{
  lieu:"L'auberge du Héron · la salle basse, vidée",
  titre:"Le fils",
  qui:'amaury',
  texte:[
    "Il est debout. On lui a laissé ça — un fils de maison ne s'assied pas sur un tabouret de bourg — et c'est la seule chose qu'on lui ait laissée.",
    "Amaury de Valombre, vingt-huit ans, l'air d'un homme qui n'a jamais eu de bonne nouvelle avant midi, et qui vient d'avoir la confirmation définitive que la journée ne s'arrangera pas.",
    { sobre:"Sa mère n'est pas dans la salle. Son registre, si.",
      intense:"Sa mère n'est pas dans la salle. Son registre y est : le livre de péage de Valombre, ouvert sur la table à la page de novembre, avec les passages francs du sel de Gassien le Lièvre alignés dans une colonne que personne n'a besoin d'expliquer.",
      extreme:"Sa mère n'est pas dans la salle. Son registre y est, ouvert sur la table à la page de novembre : les passages francs du sel de Gassien le Lièvre, alignés dans une colonne, contresignés d'une initiale qui n'est pas celle de l'officier de péage. Héloïse de Valombre a vendu sa tour en automne. Elle a vendu les archives avec. Elle savait ce qu'il y avait dedans." },
    "Le chef n'est pas le trafic d'œufs — Chastel se moque des œufs, et d'ailleurs Chastel en a acheté.",
    "§ Le chef est l'entente avec un contrebandier pour détourner des caravanes vers une bête, ce qui porte un nom très ancien et qui n'est pas *fraude*.",
    "Il vous voit dans le public. Il ne fait rien du tout : pas un signe, pas un mouvement des yeux, rien. C'est le seul geste élégant qu'il ait fait de toute sa vie et personne d'autre que vous ne saura jamais qu'il l'a fait.",
  ],
  effets:{ flags:['assise_amaury'] },
  suite:'as_audience', libelleSuite:"Le chef d'accusation" },

as_banc_gassien:{
  lieu:"L'auberge du Héron · la salle basse, vidée",
  titre:"Le Lièvre",
  qui:'gassien',
  texte:[
    "Il a le manteau de bonne coupe, les bottes de charretier, et il sourit — un vrai sourire, chaleureux, absolument sans rapport avec ce qui se passe derrière les yeux.",
    "Il sourit parce qu'il compte. Gassien le Lièvre compte depuis quarante ans et il n'a jamais rien fait d'autre : il regarde une situation, il additionne ce qu'elle contient, et il vend le résultat au plus offrant.",
    { sobre:"Il a une chose à vendre et il n'y en a qu'une.",
      intense:"En ce moment précis, dans cette salle, il n'a plus qu'une seule marchandise. Ce n'est ni le sel, ni les mules, ni les passages francs. C'est un homme d'armes sans nom qui est monté à cent quarante pieds et qui en est redescendu en sachant des choses qu'un homme d'armes ne sait pas.",
      extreme:"Dans cette salle, il n'a plus qu'une seule marchandise. Pas le sel, pas les mules, pas les passages francs : un homme d'armes sans nom, monté à cent quarante pieds et redescendu en sachant des choses qu'un homme d'armes ne sait pas. Il vous a vu entrer. Il n'a pas tourné la tête — il ne tourne jamais la tête — et il a légèrement redressé le menton, ce qui chez lui veut dire *nous allons parler d'affaires*." },
    "Contrebande, détournement de caravanes, entente. Trois chefs, la corde sur le deuxième.",
    "§ Il n'a pas peur. Il n'a jamais eu peur de sa vie. Il a un inventaire, et vous êtes dessus.",
  ],
  effets:{ flags:['assise_gassien'] },
  suite:'as_audience', libelleSuite:"Le chef d'accusation" },

as_banc_sergent:{
  lieu:"L'auberge du Héron · la salle basse, vidée",
  titre:"Douze ans de poste",
  qui:'sergent',
  texte:[
    "Il est assis très droit, en uniforme, les mains sur les genoux, et il a l'air de quelqu'un à qui l'on va reprocher un défaut de tenue de registre.",
    "C'est exactement ce qu'on va lui reprocher. Le sergent d'étape de la Route Grise tient le registre d'entrée depuis douze ans, à raison de onze à quarante lignes par semaine, et un registre d'étape se recopie, se transmet et se lit.",
    { sobre:"Chastel a relu douze ans de son écriture.",
      intense:"Chastel a fait relire douze ans de son écriture. C'est neuf mille lignes environ. Ça a pris trois clercs et deux mois, et personne dans cette salle ne mesure ce que ça représente comme décision : pour relire neuf mille lignes, il faut que quelqu'un, quelque part, ait signé un ordre.",
      extreme:"Chastel a fait relire douze ans de son écriture — neuf mille lignes, trois clercs, deux mois. Personne dans cette salle ne mesure ce que ça veut dire. On ne relit pas neuf mille lignes de registre d'étape parce qu'on soupçonne un sergent de mal écrire. On les relit parce qu'on cherche une ligne précise, qu'on sait à peu près quand elle a été portée, et qu'on ne sait pas encore sous quel nom." },
    "Le chef, tel qu'il est lu, est *négligence dans la tenue du rôle de passage*.",
    "§ Ce n'est pas de ça qu'il s'agit et il n'y a que deux personnes dans la salle qui le savent. Lui n'en fait pas partie.",
    "Il a douze ans de poste, une femme au bourg, et il a écrit ce qu'on lui a dicté, comme il l'a toujours fait, un jour de fin d'hiver, sur une route grise, pour un homme seul à cheval.",
  ],
  effets:{ flags:['assise_sergent'] },
  suite:'as_audience', libelleSuite:"Le chef d'accusation" },

};

/* Le banc se remplit tout seul. */
DYN.as_banc = () => aller('as_banc_' + accuse().id);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 2 — L'AUDIENCE
 *
 * Une audience est un lieu d'enquête comme un autre : il y a un greffe, un
 * champion, un accusé et un commissaire, et chacun des quatre rend quelque
 * chose qu'on n'aura plus l'occasion de prendre après.
 * ══════════════════════════════════════════════════════════════════════════ */

/* Le chef d'accusation, dans les mots de Chastel. */
const CHEF = {
  loys:     "propos publics tendant à réveiller un titre éteint",
  clerc:    "communication à un tiers d'une pièce du répertoire général",
  tailleur: "recel de pierre de justice",
  amaury:   "entente aux fins de détournement de convois",
  gassien:  "contrebande, détournement de convois, entente",
  sergent:  "négligence dans la tenue du rôle de passage",
};
const nomAccuse = () => GENS[accuse().qui].nom;

const ASSISE_2 = {

as_audience:{
  qui:'vasque',
  titre:"Maître Vasque lit",
  texte:[
    () => a('as_revenu')
      ? "La lecture reprend où elle en était. Une assise ne s'interrompt pas : elle continue pendant qu'on va et vient dans la salle, et c'est même à ça qu'on reconnaît une vraie."
      : "Il ne se lève pas pour lire. C'est le premier renseignement : un homme qui reste assis pour prononcer un chef d'accusation est un homme pour qui ce chef d'accusation n'est pas un événement.",
    () => a('as_revenu') ? "" :
      "Ancelin Vasque, commissaire aux titres de Chastel, quarante-quatre ans. Pas de chaîne, pas d'anneau, pas de fourrure. Une robe grise propre, des lunettes de lecture qu'il n'utilise que pour lire — il les retire pour parler — et une voix de fonctionnaire qui n'a jamais eu besoin de monter.",
    () => a('as_revenu') ? "" :
      `« Il est fait grief à ${nomAccuse()} de ${CHEF[accuse().id]}. »`,
    () => a('as_revenu') ? "" :
      { sobre:"La salle ne comprend pas la phrase. C'est fait pour.",
        intense:"La salle ne comprend pas la phrase. Personne ici n'a jamais entendu ces mots dans cet ordre, et c'est très exactement l'effet recherché : un chef d'accusation que le public ne comprend pas est un chef d'accusation que le public ne discute pas.",
        extreme:"La salle ne comprend pas la phrase et c'est l'effet recherché : un chef que le public ne comprend pas est un chef que le public ne discute pas. Deux femmes au fond répètent le mot *répertoire* à voix basse, l'une à l'autre, en essayant de le placer quelque part." },
    "§ Vous, vous comprenez. Vous êtes probablement le seul dans cette salle à comprendre, et c'est la définition exacte de la position dans laquelle il ne faut jamais se trouver.",
    () => a('as_revenu') ? "" :
      "Il pose la pièce, il retire ses lunettes, et il annonce la procédure : les faits sont établis par pièces, la parole est donnée à qui veut la prendre, et à défaut de contradiction utile la cause sera jugée avant la nuit.",
    () => a('as_revenu') ? "" :
      "Puis, sans changer de ton, comme on lit le troisième point d'une liste de quatre :",
    () => a('as_revenu') ? "" :
      "« Chastel tient un champion à l'assise. Toute personne qui conteste peut le faire dire. »",
  ],
  choix:[
    { t:"Le greffier tient le rôle. Aller le voir.",
      si:() => !a('as_greffe'),
      detail:"Dix-neuf ans qu'il écrit tout · un rôle dit qui a signé quoi · Présence + intellect contre 8",
      risque:"prudent",
      test:{ carac:'presence', comp:null, dc:8, manoeuvre:'greffe' },
      degres:{ dominante:'as_greffe_dom', nette:'as_greffe_ok', echec:'as_greffe_ko' } },

    { t:"L'homme au manteau gris, contre le mur du fond",
      si:() => !a('as_sorgue'),
      detail:"Il n'est pas de l'escorte · il ne regarde pas les juges · il regarde la salle",
      risque:"favorable",
      test:{ carac:'perception', comp:'tactique', dc:9, manoeuvre:'jauger' },
      degres:{ dominante:'as_sorgue_dom', nette:'as_sorgue_ok', echec:'as_sorgue_ko' } },

    { t:"Parler à l'accusé à la suspension",
      si:() => !a('as_parle'),
      detail:"Quelques minutes · dans un couloir · devant deux hommes en gris",
      va:'as_parler' },

    { t:"Aller trouver Vasque",
      si:() => !a('as_vasque'),
      detail:"Se faire remarquer par la seule personne de cette salle qui sache regarder",
      risque:"dangereux", va:'as_vasque' },

    { t:"Assez. Se lever.",
      detail:"On ne prépare bien qu'avec ce qu'on sait — et la nuit tombe à quatre heures",
      va:'as_moment' },
  ],
},

/* ── Le greffe ───────────────────────────────────────────────────────────── */
as_greffe_dom:{
  qui:'greffier',
  texte:[
    "Il a soixante ans, il tient le rôle de l'assise depuis dix-neuf ans, et il écrit pendant qu'il vous parle sans jamais perdre une ligne.",
    "C'est la seule catégorie d'homme au monde à qui l'on peut poser n'importe quelle question : un greffier ne juge pas, il consigne, et un homme qui consigne depuis dix-neuf ans a fini par lire ce qu'il consignait.",
    "« Le répertoire général est en bas, dans le deuxième chariot. Trois cent quarante volumes. Je les charge et je les décharge deux fois par an depuis dix-neuf ans et j'en ai ouvert peut-être quarante. »",
    "« Vous en avez ouvert un de trop. »",
    { sobre:"Il s'arrête d'écrire. C'est la seule fois.",
      intense:"Il s'arrête d'écrire. Une seconde, pas plus, et il reprend exactement où il en était — mais il s'est arrêté, et à ce métier-là, s'arrêter une seconde équivaut à hurler.",
      extreme:"Il s'arrête d'écrire. Une seconde entière, la plume à un quart de pouce du papier, avant de reprendre exactement où il en était. À ce métier-là, une seconde d'arrêt équivaut à hurler dans une église." },
    "« Volume cent-quarante-trois. Répertoire des maisons de la province, section des titres éteints. »",
    "« Éteints. »",
    "« C'est le mot du volume, messire, ce n'est pas le mien. Une maison éteinte est une maison sans héritier vivant : on ferme l'inscription, on porte la date, un magistrat signe, et c'est fini. Ça arrive deux ou trois fois par génération et ça tient en quatre lignes. »",
    "§ « Ce que je vais vous dire, je ne le redirai pas et je nierai l'avoir dit. »",
    "« La ligne de la maison Karlsberg n'est pas fermée. Elle est **raturée**. À l'encre, en travers, dans une main qui n'est pas celle du volume, et sans ordonnance jointe. »",
    "Il trempe sa plume.",
    "« On ne rature pas dans le répertoire général. On ne rature nulle part, dans mon métier. C'est la première chose qu'on apprend et c'est la seule qui compte. »",
  ],
  effets:{ flags:['as_revenu','as_greffe','as_sait_rature','sans_ordonnance'],
           exploit:{ eclat:3, temoins:'un', quoi:"vous avez fait parler le greffier de Chastel" },
           marque:"La ligne Karlsberg n'est pas fermée au répertoire : elle est raturée, sans ordonnance jointe.",
           court:"La rature" },
  suite:'as_audience', libelleSuite:"Revenir dans la salle" },

as_greffe_ok:{
  qui:'greffier',
  texte:[
    "Soixante ans, dix-neuf ans de rôle, et une plume qui ne s'arrête pas pendant qu'il vous répond.",
    "« Trois cent quarante volumes dans le deuxième chariot. Je les charge et je les décharge deux fois par an. Ne me demandez pas ce qu'il y a dedans : je consigne, je ne lis pas. »",
    "C'est faux et vous le savez tous les deux. Ce que ça veut dire, c'est qu'il ne le dira pas à un inconnu dans un couloir un jour d'assise.",
    "« Ce que je peux vous dire tient en une phrase et vous l'aurez de n'importe quel clerc pour un pichet : une inscription se ferme, elle ne s'efface pas. Un titre éteint reste écrit. »",
    "§ « Écrit et barré, si vous voulez. Mais écrit. »",
    "Il replonge sa plume et vous rend au couloir.",
  ],
  effets:{ flags:['as_revenu','as_greffe','as_sait_rature'],
           marque:"Une inscription se ferme, elle ne s'efface pas. Un titre éteint reste écrit.",
           court:"Écrit et barré" },
  suite:'as_audience', libelleSuite:"Revenir dans la salle" },

as_greffe_ko:{
  qui:'greffier',
  texte:[
    "Il ne lève pas les yeux et il ne s'arrête pas d'écrire.",
    "« Le rôle est public à la clôture, messire. Revenez demain matin, on l'affiche à la porte. »",
    "C'est une phrase de fonctionnaire, elle est parfaitement correcte, et elle signifie : *je ne vous connais pas, il y a trente hommes en gris dans ce bourg, et j'ai dix-neuf ans de service à ne pas perdre pour quelqu'un qui n'a même pas donné son nom.*",
    "§ Il a raison sur les quatre points.",
  ],
  effets:{ flags:['as_revenu','as_greffe'], cout:{ moral:3 } },
  suite:'as_audience', libelleSuite:"Revenir dans la salle" },

/* ── Le champion ─────────────────────────────────────────────────────────── */
as_sorgue_dom:{
  qui:'sorgue',
  texte:[
    "Il n'est pas de l'escorte. L'escorte est en manteau gris de Chastel, alignée, jeune, et elle regarde la porte. Lui est en manteau gris aussi, et il regarde la salle.",
    "Cinquante-deux ans. Un corps qui a été très fort et qui l'est encore par endroits. Il se tient adossé au mur du fond, tout le poids sur la jambe droite, et il ne change pas d'appui une seule fois en une heure et demie.",
    "§ Un homme qui ne change pas d'appui en une heure et demie a mal quand il change d'appui.",
    { sobre:"Il a une épée courte et pas de bouclier. Ses mains sont fausses.",
      intense:"Il a une épée courte à la hanche et pas de bouclier, ce qui ne se voit chez personne. Et ses mains sont fausses : trop épaisses aux jointures, avec cette déformation en bosses régulières qu'on prend en frappant du bois pendant trente ans, tous les jours, au même endroit.",
      extreme:"Épée courte à la hanche, pas de bouclier — ce qui ne se voit chez personne. Et ses mains sont fausses : trop épaisses aux jointures, bosselées régulièrement de la façon qu'on ne prend qu'en frappant du bois trente ans durant, tous les jours, au même endroit. L'ongle du pouce droit est noir et n'a pas repoussé droit depuis longtemps." },
    "Il croise votre regard et il ne le fuit pas. Il ne le soutient pas non plus : il le prend, il l'évalue, et il le rend. Puis il dit une chose, à voix normale, à sept pas, sans se détacher du mur.",
    "« Quarante et un. »",
    "« Pardon ? »",
    "« Vous alliez le demander. Quarante et un, et tous devant témoins, et tous à Chastel. Je m'appelle Renaud Sorgue. »",
    "§ « Et je vais vous dire la chose que je dis toujours, parce que ça m'évite du travail : je n'ai jamais gagné un seul de ces quarante et un. Chastel ne perd pas ses causes. On ne me met dans le rond que quand la cause est gagnée d'avance. »",
    "« Ça fait de vous quoi, exactement ? »",
    "« Une formalité, messire. Une formalité de neuf pas de diamètre. »",
    "Il vous explique les règles sans que vous les demandiez, posément, comme un homme qui trouve normal qu'on les connaisse : neuf pas de craie sur le sol, sortir du rond vaut forfait, pas de bouclier pour le requérant, et le champion peut appeler trois temps quand il veut. Le requérant, aucun.",
    "« C'est déloyal », dites-vous.",
    "« C'est écrit », dit-il. Et pour la première fois quelque chose bouge dans sa figure. « Ce n'est pas la même chose et c'est bien pire. »",
  ],
  effets:{ flags:['as_revenu','as_sorgue','as_sait_sorgue','as_sait_hanche','as_sait_regles'],
           marque:"Renaud Sorgue, quarante et un duels, une hanche morte, et trois temps contre zéro.",
           court:"Le Compteur" },
  suite:'as_audience', libelleSuite:"Revenir dans la salle" },

as_sorgue_ok:{
  qui:'sorgue',
  texte:[
    "Il n'est pas de l'escorte : l'escorte regarde la porte, lui regarde la salle.",
    "Cinquante-deux ans, épée courte, pas de bouclier. Il ne bouge pas du mur en une heure et demie et il ne cesse pas une seconde de compter les gens qui entrent.",
    "Quand vous passez à sa hauteur, il dit, sans se retourner :",
    "« Quarante et un. »",
    "« Quarante et un quoi ? »",
    "« Vous le saurez ou vous ne le saurez pas. »",
    "§ Un homme qui donne son chiffre avant qu'on demande son nom vous dit tout de suite ce qu'il vend.",
    "Vous n'obtenez rien de plus. Les règles du rond, vous les entendrez comme tout le monde : au moment où on les lira.",
  ],
  effets:{ flags:['as_revenu','as_sorgue','as_sait_sorgue'],
           marque:"Le champion de Chastel s'annonce par un chiffre : quarante et un.",
           court:"Quarante et un" },
  suite:'as_audience', libelleSuite:"Revenir dans la salle" },

as_sorgue_ko:{
  texte:[
    "Il y a un homme au mur du fond, en gris, qui n'est pas de l'escorte. Vous le remarquez et vous n'en tirez rien : il est adossé, il est vieux, il ne fait rien.",
    "§ Le seul renseignement que vous emportez, c'est qu'il vous a vu le regarder. Et ça, ça n'est pas un renseignement pour vous.",
  ],
  effets:{ flags:['as_revenu','as_sorgue'] },
  suite:'as_audience', libelleSuite:"Revenir dans la salle" },

/* ── L'accusé ────────────────────────────────────────────────────────────── */
as_parler:{ dyn:true, texte:[], suite:'as_parler_sergent' },

};
Object.assign(ASSISE, ASSISE_2);
DYN.as_parler = () => aller('as_parler_' + accuse().id);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 3 — L'ACCUSÉ, LE COMMISSAIRE, ET LE MOMENT
 * ══════════════════════════════════════════════════════════════════════════ */
const ASSISE_3 = {

as_parler_loys:{
  qui:'loys',
  texte:[
    "Le couloir de service du Héron fait quatre pieds de large et sent la bière depuis vingt ans. Deux hommes en gris se tiennent à chaque bout et ne font pas semblant de ne pas écouter.",
    "« Vous êtes le monsieur qui a tué la bête. »",
    "« Je suis un monsieur, oui. »",
    { sobre:"Il a quinze ans et il essaie d'être poli. C'est ça qui est difficile à regarder.",
      intense:"Il a quinze ans et il essaie d'être poli, et c'est ça qui est insoutenable — pas la peur, la politesse. Il ne demande pas ce qu'il risque. Il demande si sa mère a été prévenue et si on peut lui dire qu'il n'a rien cassé.",
      extreme:"Quinze ans, et il essaie d'être poli. C'est ça qui est insoutenable — pas la peur, la politesse. Il ne demande pas ce qu'il risque : il demande si sa mère a été prévenue, si on peut lui dire qu'il n'a rien cassé, et — parce qu'un garçon de quinze ans pense à ça avant le reste — si on lui rendra son couteau, qui était à son père." },
    "@« Loys. Le loup sur la borne. Tu l'as dit à combien de personnes ? »",
    "« La salle était pleine. »",
    "« Et avant la salle ? »",
    "Il réfléchit vraiment. C'est un garçon sérieux.",
    "« À personne. Ceux qui m'avaient défié sont restés en bas. Je suis monté seul et je suis redescendu seul et j'ai attendu trois jours pour le raconter, parce que je voulais le raconter dans la salle et pas dans une grange. »",
    "§ Il a attendu trois jours pour avoir un public. C'est exactement ce que vous auriez fait à quinze ans.",
  ],
  effets:{ flags:['as_revenu','as_parle','as_loys_parle'], cout:{ moral:6 },
           marque:"Loys a attendu trois jours pour raconter le loup devant une salle pleine.", court:"Loys" },
  suite:'as_audience', libelleSuite:"Revenir dans la salle" },

as_parler_clerc:{
  qui:'clerc',
  texte:[
    "Il parle vite et à voix basse, en robe de fonction, dans un couloir de service, et il n'a pas dormi depuis quatre jours.",
    "« Je n'ai commis aucune faute. J'ai transcrit une pièce du répertoire à la demande d'une partie ayant intérêt, contre paiement déclaré, avec mention de la cote. C'est l'usage. C'est exactement l'usage. »",
    "« Je sais. »",
    "« Alors pourquoi est-ce que je suis sur ce tabouret ? »",
    { sobre:"Il n'a pas encore compris. Ça va lui arriver dans la phrase suivante.",
      intense:"Il n'a pas encore compris, et vous voyez le moment exact où ça lui arrive : au milieu de sa propre phrase, quand il se met à réciter ce qu'il a écrit en marge.",
      extreme:"Il n'a pas encore compris. Vous voyez le moment précis où ça lui arrive — au milieu de sa propre phrase, quand il se met à réciter de mémoire ce qu'il a porté en marge, et que sa voix ralentit sur les trois derniers mots comme une roue qui accroche." },
    "« J'ai porté : *rature postérieure, main différente, sans ordonnance jointe.* »",
    "Silence.",
    "« C'est la formule. On la porte toujours. C'est… on la porte toujours, messire. »",
    "« Combien de fois l'avez-vous portée en trois ans ? »",
    "« Deux. »",
    "§ « L'autre fois, c'était une erreur de copie sur un moulin. »",
  ],
  effets:{ flags:['as_revenu','as_parle','as_sait_rature','sans_ordonnance'],
           marque:"Le clerc a porté « sans ordonnance jointe » deux fois en trois ans. L'autre était un moulin.",
           court:"Deux fois" },
  suite:'as_audience', libelleSuite:"Revenir dans la salle" },

as_parler_tailleur:{
  qui:'tailleur',
  texte:[
    "Il n'est pas en colère contre vous. C'est ce qui rend la conversation difficile.",
    "« J'ai pris deux sous par semaine et je ne l'ai pas inscrit. C'est ma faute et c'est la seule. Un dépôt déclaré, c'est une amende. »",
    "« Je vous ai demandé de ne pas l'inscrire. »",
    "« Vous ne m'avez rien demandé du tout, messire. C'est moi qui l'ai proposé. Je m'en souviens parce que j'ai rabattu la toile en le disant. »",
    { sobre:"Il a raison. C'est vérifiable et c'est vrai.",
      intense:"Il a raison. Vous le revoyez faire : le pouce dans le sillon du loup, deux fois, dans le sens de la gravure, puis la toile rabattue et cette phrase sur son grand-père qui a taillé pour une maison rayée. Personne ne lui a rien demandé.",
      extreme:"Il a raison, et vous le revoyez faire : le pouce dans le sillon, deux fois, dans le sens de la gravure. Puis la toile rabattue. Puis la phrase sur son grand-père, payé deux ans par des gens qui n'existaient plus. Personne ne lui a rien demandé. Il a décidé tout seul, dans son hangar, pour une raison qui n'appartient qu'à lui et qu'il ne vous dira pas." },
    "@« Vous saviez ce que c'était. »",
    "« Je savais que c'était de l'arpentage. Je ne savais pas de qui. »",
    "Il se tait, et il ajoute, sans vous regarder :",
    "§ « Je ne le sais toujours pas, messire, et je préfère. Ce que je ne sais pas, je ne peux pas le dire sur un tabouret. »",
  ],
  effets:{ flags:['as_revenu','as_parle','as_tailleur_ignore'], cout:{ moral:5 },
           marque:"Le tailleur ne sait pas à qui est le loup, et il préfère ne pas savoir.", court:"Il préfère" },
  suite:'as_audience', libelleSuite:"Revenir dans la salle" },

as_parler_amaury:{
  qui:'amaury',
  texte:[
    "« Vous venez voir le résultat ? »",
    "« Je viens voir si vous savez pourquoi vous êtes là. »",
    "« Je vends des œufs à un seigneur de guerre. Je paie un contrebandier pour qu'il rabatte les caravanes vers une bête. J'ai vingt-huit ans, ma mère a vendu la tour, et je serai pendu jeudi. Oui, messire, je sais pourquoi je suis là. »",
    { sobre:"Il se trompe. Ce n'est pas pour ça.",
      intense:"Il se trompe, et c'est ce qui rend cette conversation intéressante : il croit qu'on le pend pour ce qu'il a fait. On le pend parce que Chastel a racheté les archives de Valombre avec la tour, qu'on y a trouvé quarante-trois relevés d'arpentage, et qu'il faut bien une raison publique de descendre dans cette vallée avec deux chariots de registres.",
      extreme:"Il se trompe, et c'est ce qui rend la conversation intéressante. Il croit qu'on le pend pour ce qu'il a fait. On le pend parce que Chastel a racheté les archives de Valombre en même temps que la tour, qu'on y a trouvé quarante-trois relevés antérieurs, et qu'il faut bien un motif public pour descendre dans une vallée fermée avec deux chariots de papier et trente hommes." },
    "@« Votre mère a vendu la tour à qui ? »",
    "Il s'arrête. Un fils de maison ruinée sait exactement à qui sa mère a vendu la tour.",
    "« … à Chastel. »",
    "« En même temps que les archives. »",
    "§ « Elle a vendu les archives », dit-il enfin, et c'est la première fois de sa vie qu'il parle de sa mère comme d'un adversaire compétent.",
  ],
  effets:{ flags:['as_revenu','as_parle','as_sait_achat_archives'],
           marque:"Chastel a racheté la tour de Valombre — et les archives avec.", court:"Les archives vendues" },
  suite:'as_audience', libelleSuite:"Revenir dans la salle" },

as_parler_gassien:{
  qui:'gassien',
  texte:[
    "« Je me demandais quand vous viendriez. »",
    "Il n'est même pas attaché. Chastel a jugé qu'un contrebandier de quarante ans avec quatre mules saisies n'irait nulle part en hiver dans une vallée fermée, et Chastel a raison.",
    "« J'ai trois chefs. La corde tient au deuxième. Vous connaissez le seul moyen de faire tomber une entente, messire ? »",
    "« Donner l'autre partie. »",
    "« Donner quelqu'un de plus gros. Ce n'est pas la même chose, et j'ai vingt ans de métier qui tiennent dans cette différence-là. »",
    { sobre:"Il ne menace pas. Il expose une offre.",
      intense:"Il ne menace à aucun moment. Il expose une situation avec la neutralité d'un homme qui vend du sel : il a une marchandise, il y a un acheteur dans la pièce d'à côté, et il préférerait de très loin conclure avec vous parce que vous êtes plus près et que le transport coûte moins cher.",
      extreme:"Il ne menace pas une seule fois. Il expose, avec la neutralité d'un homme qui vend du sel : il a une marchandise, il y a un acheteur dans la pièce d'à côté, et il préférerait conclure avec vous parce que vous êtes plus près et que le transport revient moins cher. Il sourit pendant tout l'exposé. Le sourire est parfaitement chaleureux et n'a jamais eu le moindre rapport avec quoi que ce soit." },
    "@« Qu'est-ce que vous voulez ? »",
    "« Que vous vous leviez. Contestez la cause, prenez le rond, et si vous gagnez, l'entente tombe avec le chef. Je repars avec deux mules et une amende. »",
    "« Et si je ne me lève pas ? »",
    "§ « Alors je me lève, moi. Et je raconte à maître Vasque une histoire vraie qui commence à cent quarante pieds au-dessus du gué. »",
  ],
  effets:{ flags:['as_revenu','as_parle','as_gassien_marche'],
           marque:"Gassien vous a proposé un marché : le rond, ou il raconte le gué à Vasque.",
           court:"Le marché" },
  suite:'as_audience', libelleSuite:"Revenir dans la salle" },

as_parler_sergent:{
  qui:'sergent',
  texte:[
    "Il se lève quand vous entrez dans le couloir, et il se rassied quand il comprend que vous n'êtes personne d'officiel. Douze ans de poste apprennent ce réflexe-là avant tous les autres.",
    "« Négligence dans la tenue du rôle. Douze ans, messire. Je n'ai pas sauté une ligne en douze ans. »",
    "« Je sais. J'y ai signé. »",
    { sobre:"Il vous regarde. Il vous replace. Ça prend trois secondes.",
      intense:"Il vous regarde, et vous voyez le classement se faire — un homme qui écrit onze à quarante lignes par semaine depuis douze ans a une mémoire d'un genre particulier, qui ne retient pas les visages mais les circonstances. Trois secondes. Puis il détourne les yeux, ce qui est la réponse.",
      extreme:"Il vous regarde, et le classement se fait devant vous : un homme qui porte onze à quarante lignes par semaine pendant douze ans développe une mémoire qui ne retient pas les visages mais les circonstances — le temps qu'il faisait, la monture, l'heure, et si l'homme a hésité avant de donner son nom. Trois secondes. Puis il détourne les yeux, et c'est toute la réponse." },
    "@« Ils vous ont demandé une ligne en particulier ? »",
    "« Ils m'ont demandé de reconnaître mon écriture sur trois cent quatre lignes. Trois cent quatre. Sur douze ans. »",
    "« Vous les avez reconnues ? »",
    "« Toutes. C'est mon écriture. »",
    "§ Il n'a rien fait de mal et il ne s'en sortira pas pour autant, parce que trois cent quatre lignes ont été choisies par quelqu'un, et que ce quelqu'un n'a pas encore dit laquelle l'intéresse.",
  ],
  effets:{ flags:['as_revenu','as_parle','as_sait_304'], cout:{ moral:4 },
           marque:"Chastel a fait reconnaître au sergent trois cent quatre lignes de sa propre écriture.",
           court:"Trois cent quatre" },
  suite:'as_audience', libelleSuite:"Revenir dans la salle" },

/* ── Vasque ──────────────────────────────────────────────────────────────── */
as_vasque:{
  qui:'vasque',
  titre:"L'homme qui corrige les écritures",
  texte:[
    "On ne va pas trouver un commissaire aux titres pendant une assise. Ça ne se fait pas, ce n'est pas prévu par la procédure, et c'est très exactement pour ça que ça marche : il vous reçoit dans l'arrière-cuisine du Héron parce qu'il est trop surpris pour refuser.",
    "Il ne vous demande pas votre nom. Ça devrait vous rassurer et ça fait le contraire.",
    "« Vous voulez me parler du garçon », dit-il — ou du clerc, ou du tailleur, ou de qui est sur le tabouret, il s'adapte sans effort. « Tout le monde veut me parler de l'accusé. Personne ne veut jamais me parler de la cause. »",
    "« Quelle est la cause ? »",
    { sobre:"Il a l'air content. C'est la première fois qu'on lui pose la question.",
      intense:"Il a l'air content, et c'est terrible : c'est la première fois depuis longtemps qu'on lui pose une question qui l'intéresse, et il va y répondre honnêtement parce qu'un homme de quarante-quatre ans qui aime son métier ne résiste jamais à ça.",
      extreme:"Il a l'air sincèrement content. C'est la première fois depuis longtemps qu'on lui pose une question qui l'intéresse, et il va y répondre honnêtement — un homme de quarante-quatre ans qui aime son métier ne résiste jamais à ça, et Ancelin Vasque aime son métier comme un charpentier aime le bois." },
    "« La cause, messire, c'est le répertoire. Pas les gens : le répertoire. »",
    "Il pose ses lunettes sur la table, verres en l'air, à côté d'un pot de graisse d'oie qui n'a rien à faire là.",
    "« Une maison n'est pas des gens. Une maison est une inscription. Les gens meurent, se marient, s'exilent, changent de nom — l'inscription, elle, dit ce qui est. Tant qu'une inscription est propre, la province tient : on sait à qui est le gué, à qui est le quart du sel, qui doit quoi à qui. »",
    "« Et quand elle ne l'est pas ? »",
    "§ « Alors on a une province où deux hommes peuvent produire deux titres sur la même pierre. Vous savez comment ça s'appelle ? Ça s'appelle la guerre, et ça dure vingt ans. »",
    "« On a rayé la maison Karlsberg. »",
    "Il ne bronche pas. Il ne bronche pas *du tout*, ce qui vous apprend en une demi-seconde qu'il a passé six jours en chariot à préparer précisément cette conversation avec quelqu'un — pas forcément vous, mais quelqu'un.",
    "« En travers, à l'encre, dans une main qui n'est pas celle du volume, et sans ordonnance jointe. Oui. Je le sais depuis onze ans. »",
    "Un temps.",
    "« Je n'ai pas rayé cette ligne, messire. J'avais vingt-cinq ans et j'étais aux annexes. Je passe depuis onze ans à essayer de savoir qui l'a fait, et le jour où je le saurai, la personne en question aura commis un crime beaucoup plus grave que tout ce qui se juge dans cette salle. »",
    "« Alors pourquoi le tabouret ? »",
    { sobre:"« Parce que je ne peux pas descendre ici avec deux chariots de registres sans motif public. »",
      intense:"« Parce qu'un commissaire aux titres ne descend pas dans une vallée fermée, en hiver, avec deux chariots de répertoire et trente hommes, sans un motif public. Il me faut une cause. J'en ai pris une petite. »",
      extreme:"« Parce qu'un commissaire aux titres ne descend pas dans une vallée fermée, en hiver, avec deux chariots de répertoire et trente hommes, sans motif public. Il me faut une cause au rôle. J'en ai pris la plus petite que j'ai trouvée — et j'ai bien conscience, messire, de ce que ce mot recouvre quand la plus petite cause disponible est un garçon de quinze ans. »" },
    "§ « Je ne suis pas un homme cruel. Je suis un homme qui a besoin d'un motif au rôle. C'est pire et je le sais. »",
    "Il remet ses lunettes.",
    "« Cela dit — si quelqu'un se levait dans cette salle pour contester la cause, il me faudrait bien l'entendre. Et pour l'entendre, il me faudrait bien l'inscrire au rôle. »",
    "« Sous quel nom ? »",
    "« C'est la question, n'est-ce pas. »",
  ],
  effets:{ flags:['as_revenu','as_vasque','as_sait_vasque','sans_ordonnance'], suspicion:14,
           exploit:{ eclat:4, temoins:'un', quoi:"vous avez parlé de la rature au commissaire aux titres" },
           marque:"Vasque cherche depuis onze ans qui a raturé la ligne Karlsberg. Il ne sait pas encore que vous existez.",
           court:"Vasque" },
  suite:'as_audience', libelleSuite:"Revenir dans la salle" },

};
Object.assign(ASSISE, ASSISE_3);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 4 — LE MOMENT, ET LES TROIS PORTES QUI NE SONT PAS LE ROND
 * ══════════════════════════════════════════════════════════════════════════ */
const ASSISE_4 = {

as_moment:{
  qui:'vasque',
  titre:"« Quelqu'un conteste-t-il la cause ? »",
  texte:[
    "Il est quatre heures. Il fait nuit dehors depuis vingt minutes et on a allumé onze chandelles dans une salle qui en compte d'habitude trois, ce qui donne à toute la scène une clarté de veillée mortuaire.",
    "Vasque referme la pièce, retire ses lunettes, et pose la question de forme — celle qu'on pose depuis deux cents ans dans toutes les assises de la province et à laquelle personne n'a répondu oui depuis onze ans.",
    "« Quelqu'un conteste-t-il la cause ? »",
    { sobre:"Personne ne bouge. Quarante personnes debout, et personne ne bouge.",
      intense:"Personne ne bouge. Il y a quarante personnes debout contre les murs de cette salle, dont la moitié connaît l'accusé depuis sa naissance, et pas une ne bouge — parce que contester une cause devant Chastel n'est pas un acte de courage : c'est un acte de procédure, et personne ici ne sait ce qu'il coûte.",
      extreme:"Personne ne bouge. Quarante personnes debout contre les murs, dont la moitié connaît l'accusé depuis sa naissance, et pas une ne bouge. Contester une cause devant Chastel n'est pas un acte de courage, c'est un acte de procédure : personne ici ne sait ce qu'il coûte, personne ne sait comment on le formule, et l'ignorance de la formule tient les gens plus sûrement que la peur." },
    () => a('as_sait_sorgue')
      ? "Contre le mur du fond, Renaud Sorgue n'a toujours pas changé d'appui."
      : "Contre le mur du fond, un homme en gris qui n'est pas de l'escorte décolle l'épaule de la pierre. C'est le premier mouvement qu'il fait en trois heures.",
    () => a('as_gassien_marche')
      ? "Sur le tabouret, Gassien le Lièvre a tourné la tête. C'est la première fois de sa vie qu'il tourne la tête, et il la tourne vers vous."
      : "",
    "§ Trois secondes. C'est ce que dure la question de forme avant qu'on passe au délibéré.",
    "Une.",
    "Deux.",
  ],
  choix:[
    { t:"« Je conteste la cause. »",
      si:() => a('as_sait_rature'),
      detail:"Une inscription raturée sans ordonnance ne fonde rien · Présence + intellect contre 11",
      risque:"calculé",
      test:{ carac:'presence', comp:'tactique', dc:11, manoeuvre:'plaider',
             situation:() => (a('as_sait_vasque') ? 2 : 0) + (a('sans_ordonnance') ? 2 : 0) +
                             (a('as_sait_achat_archives') ? 1 : 0) },
      degres:{ dominante:'as_loi_dom', couteuse:'as_loi_cout', echec:'as_loi_ko' } },

    { t:"« Je la conteste comme héritier. »",
      si:() => a('as_sait_rature') && (a('wy_borne_karlsberg') || a('wy_pierre_karlsberg') || a('wy_borne_dite') || a('vallee_se_souvient')),
      detail:"Dire le nom entier, à voix haute, devant quarante personnes et le répertoire général",
      ferme:"Ferme : dix-neuf ans passés à n'être personne",
      risque:"définitif", definitif:true,
      test:{ carac:'volonte', comp:null, dc:9, manoeuvre:'nom',
             situation:() => (a('wy_pierre_karlsberg') ? 3 : 0) + (a('as_sait_rature') ? 2 : 0) },
      degres:{ dominante:'as_nom_dom', couteuse:'as_nom_cout', echec:'as_nom_ko' } },

    { t:"« Je conteste, et je le fais dire par les armes. »",
      detail:"Neuf pas de craie · pas de bouclier · trois temps pour lui, aucun pour vous",
      risque:"très dangereux", definitif:true,
      ferme:"Ferme : toute possibilité que cette assise se termine sans que la province vous ait vu",
      va:'as_rond_ouverture' },

    { t:"L'Onde. Ici. Maintenant.",
      detail:"Dans une salle de quarante personnes, devant le répertoire général de la province",
      ferme:"Ferme : tout. Absolument tout.",
      risque:"définitif", definitif:true,
      test:{ carac:'volonte', comp:'onde', dc:10, manoeuvre:'onde_salle', cout:{ concentration:35 },
             situation:() => a('onde_sur_soi') ? 2 : 0 },
      degres:{ dominante:'as_onde_dom', couteuse:'as_onde_cout', echec:'as_onde_ko' } },

    { t:"Ne rien faire. Sortir avant le délibéré.",
      detail:"Personne ne saura jamais que vous étiez dans cette salle",
      ferme:"Ferme : celui ou celle qui est sur le tabouret",
      risque:"définitif", definitif:true, va:'as_partir' },
  ],
},

/* ── Sortir ──────────────────────────────────────────────────────────────── */
as_partir:{
  lieu:"Cendrepont · la nuit · vingtième année après la Purge",
  titre:"Trois",
  texte:[
    "« Trois. »",
    "Vasque repose la pièce et prononce la formule de clôture des débats, et la salle recommence à respirer parce qu'une salle qui a retenu son souffle trois secondes ne sait pas qu'elle l'a retenu.",
    "Vous sortez pendant le délibéré. Ce n'est même pas discret : il y a quarante personnes debout et il en sort une, personne ne se retourne, et l'aubergiste vous tient la porte parce que c'est son métier de tenir la porte.",
    { sobre:"Dehors il neige. Vous marchez jusqu'à l'écurie et vous ne repartez pas, parce que le col est fermé.",
      intense:"Dehors il neige, à gros flocons lents, de la neige de vallée fermée. Vous marchez jusqu'à l'écurie et vous vous asseyez sur une botte de paille, et vous ne repartez pas — vous ne pouvez pas repartir, le col de Frimaire est fermé depuis huit jours et la Route Grise l'est depuis douze. Vous allez passer l'hiver dans ce bourg.",
      extreme:"Dehors il neige à gros flocons lents. Vous marchez jusqu'à l'écurie, vous vous asseyez sur une botte de paille, et vous ne repartez pas : le col de Frimaire est fermé depuis huit jours, la Route Grise depuis douze. Vous allez passer quatre mois dans un bourg de six cents habitants où l'on parlera de ça tous les jours, à toutes les tables, pendant quatre mois." },
    "§ La cause est jugée avant la nuit, comme annoncé. C'est une assise correctement tenue.",
    () => {
      const id = accuse().id;
      if(id === 'loys') return "Loys a quinze ans. On ne pend pas un garçon de quinze ans : on le marque au fer à l'épaule, on le raye du rôle des habitants, et on le met sur la route au printemps. Il n'y a pas de route au printemps pour un garçon marqué. Sa mère servait de la bière dans cette salle depuis huit ans ; elle n'y sert plus.";
      if(id === 'clerc') return "Le clerc est destitué, condamné aux fers pour deux ans, et transféré aux annexes de Chastel en Ventôse. On ne le reverra pas. Un homme de vingt-six ans qui a écrit *sans ordonnance jointe* dans un répertoire général ne ressort pas des annexes de Chastel.";
      if(id === 'tailleur') return "Le tailleur est pendu jeudi, à midi, dans la cour du Héron, pour recel de pierre de justice. Le chef est vieux et rarement invoqué. Il porte la corde et il l'a portée.";
      if(id === 'amaury') return "Amaury de Valombre est pendu jeudi. Sa mère n'est pas venue : elle a vendu la tour, elle a vendu les archives, et elle a quitté la province en automne. Elle savait ce qu'il y avait dans les coffres.";
      if(id === 'gassien') return "Gassien le Lièvre est pendu jeudi, sur le deuxième chef. Il n'a pas parlé de vous. Il n'a pas parlé du tout : un homme qui n'a plus rien à vendre se tait, c'est la seule chose qu'il ait jamais eue de propre.";
      return "Le sergent d'étape est destitué pour négligence, sans peine afflictive, après douze ans de service. Il a une femme au bourg. Il ne retrouvera pas de poste : on ne reprend pas un homme dont le rôle a été relu.";
    },
    "§ Vous êtes vivant, personne ne vous cherche, et vous avez exactement ce que vous étiez venu chercher dans cette province il y a un an : rien.",
    "L'hiver dure quatre mois. Vous les passez là.",
  ],
  effets:{ flags:['as_parti','acte1_silence'], cout:{ moral:25 },
           marque:"Vous êtes sorti pendant le délibéré de l'assise de Cendrepont.", court:"Sorti" },
  issue:"Fin de l'Acte I",
  bilan:"Vous n'avez rien fait, et c'était possible",
  apres:[
    "Ce n'est pas une punition et ce n'est pas un échec. C'est la seule fin de cet acte où le plan tient : dix-neuf ans à n'être personne, et une vingtième année qui se ferme sans que rien ne soit sorti.",
    () => `Vous finissez avec ${ETAT.or} couronnes, ${ETAT.blessures.length} blessure${ETAT.blessures.length > 1 ? 's' : ''}, et un rang que personne ne vous conteste : « ${rangActuel().cri} ».`,
    "Il y a des gens qui vivent comme ça jusqu'au bout. Il y en a même beaucoup, et ce sont les seuls Parias qui meurent vieux.",
  ],
  plusTard:"L'Acte II ne s'ouvre pas sur une convocation. Il s'ouvre sur ce que vous ferez du printemps.",
},

/* ── La loi ──────────────────────────────────────────────────────────────── */
as_loi_dom:{
  qui:'vasque',
  titre:"« Sur quel fondement ? »",
  texte:[
    "@« Je conteste la cause. »",
    "Il y a un bruit dans la salle, un seul, et c'est le greffier qui vient de poser sa plume — ce qu'il n'a pas fait de la journée.",
    "Vasque ne se retourne pas vers le public. Il remet ses lunettes, ce qui est le seul geste d'un homme qui vient de décider que la soirée serait plus longue que prévu.",
    "« Sur quel fondement ? »",
    "§ Voilà. C'est là que tout se joue, et ça ne se joue pas avec une épée.",
    "« La cause repose sur un titre éteint. Elle suppose donc que le titre soit éteint. Une extinction se constate au répertoire général : inscription close, date portée, ordonnance jointe, signature d'un magistrat. »",
    "« C'est exact. »",
    "« La ligne invoquée n'est pas close. Elle est raturée. À l'encre, en travers, dans une main qui n'est pas celle du volume. Et il n'y a pas d'ordonnance jointe. »",
    { sobre:"Le silence dans la salle change de nature.",
      intense:"Le silence dans la salle change de nature. Ce n'est plus le silence des gens qui attendent : c'est celui des gens qui viennent de comprendre qu'ils assistent à quelque chose et qui ne savent pas encore à quoi.",
      extreme:"Le silence change de nature. Ce n'est plus celui des gens qui attendent, c'est celui des gens qui viennent de comprendre qu'ils assistent à quelque chose sans savoir à quoi. Au fond, quelqu'un fait taire un enfant en lui mettant la main sur la bouche, franchement, comme on ferme une porte." },
    "« Il ne peut y avoir de propos tendant à réveiller un titre éteint », dites-vous, « s'il n'est pas établi que le titre soit éteint. Ce qui est établi, c'est qu'on l'a barré. Barrer n'est pas éteindre. »",
    "Vasque reste immobile pendant onze secondes. On les compte, dans cette salle, parce qu'il n'y a rien d'autre à faire.",
    "Puis il fait une chose que personne n'attendait : il se tourne vers le greffier.",
    "« Portez-le. Contradiction soulevée sur la validité de l'inscription au répertoire, volume cent-quarante-trois. »",
    "Le greffier reprend sa plume et écrit, et l'écriture d'un greffier qui écrit ça, dans une salle basse d'auberge, en hiver, est le bruit le plus lourd de toute cette année.",
    "« La cause est renvoyée », dit Vasque. « Je ne peux pas juger sur une inscription contestée. Il faudra un magistrat, une commission, et six mois. »",
    "§ Personne ne pend. Personne ne pendra. La cause vient de devenir trop grosse pour ce bourg.",
    "Il vous regarde, et il pose la seule question qui compte, très doucement, avec cette gêne particulière des gens polis qui vont être désagréables.",
    "« Il me faut vous inscrire au rôle, messire. Sous quel nom ? »",
  ],
  effets:{ flags:['as_loi_gagnee','as_cause_renvoyee'], suspicion:20,
           exploit:{ eclat:9, temoins:'foule', quoi:"vous avez fait renvoyer une cause de Chastel sur le répertoire" },
           marque:"Vous avez contesté l'inscription du volume cent-quarante-trois devant l'assise. La cause est renvoyée.",
           court:"La cause renvoyée" },
  suite:'as_rôle', libelleSuite:"Répondre" },

as_loi_cout:{
  qui:'vasque',
  texte:[
    "@« Je conteste la cause. »",
    "Vous la contestez, et vous la contestez bien — mais vous la contestez en homme qui a appris ça dans un couloir il y a deux heures, et Vasque a onze ans de répertoire.",
    "« Sur quel fondement ? »",
    "« La rature. »",
    "« Quelle rature, messire ? Nommez la cote. »",
    { sobre:"Vous ne connaissez pas la cote. C'est la seule chose que vous ne connaissez pas.",
      intense:"Vous ne connaissez pas la cote. C'est la seule chose que vous ne connaissiez pas et c'est précisément celle qu'il fallait — parce qu'une contradiction sans cote n'est pas une contradiction : c'est une opinion, et une assise ne connaît pas les opinions.",
      extreme:"Vous ne connaissez pas la cote. C'est la seule chose qui manquait et c'était la bonne : une contradiction sans cote n'est pas une contradiction, c'est une opinion, et une assise ne connaît pas les opinions. Il ne triomphe même pas. Il attend, poliment, en vous laissant tout le temps de ne pas trouver." },
    "Le greffier, qui n'a pas levé les yeux, dit à voix parfaitement neutre, sans s'adresser à personne :",
    "« Volume cent-quarante-trois. »",
    "§ Dix-neuf ans de rôle. Un homme de soixante ans vient de mettre sa retraite sur la table pour un inconnu qui a posé la bonne question dans un couloir.",
    "« Volume cent-quarante-trois », répétez-vous.",
    "Vasque regarde son greffier pendant très longtemps. Puis il fait porter la contradiction, et il renvoie la cause, et il demande votre nom pour le rôle.",
    "Le greffier écrit. Il écrira sa lettre de démission le mois suivant, à Chastel, dans un bureau qu'il occupe depuis dix-neuf ans, et il ne dira à personne pourquoi.",
  ],
  effets:{ flags:['as_loi_gagnee','as_cause_renvoyee','as_greffier_paie'], suspicion:20,
           exploit:{ eclat:7, temoins:'foule', quoi:"la cause a été renvoyée, et un greffier l'a payée" },
           marque:"Le greffier vous a soufflé la cote. Il démissionnera le mois suivant.",
           court:"Cent-quarante-trois" },
  suite:'as_rôle', libelleSuite:"Répondre" },

as_loi_ko:{
  qui:'vasque',
  texte:[
    "@« Je conteste la cause. »",
    "« À quel titre ? »",
    "Ce n'est pas la même question que *sur quel fondement*, et vous mettez une seconde de trop à voir la différence. Cette seconde vous coûte l'audience entière.",
    { sobre:"« Un particulier ne conteste pas une cause de titres. »",
      intense:"« Un particulier ne conteste pas une cause de titres, messire. Il n'a pas qualité. La contradiction est ouverte à la partie, à la maison intéressée, ou au ministère — et vous n'êtes ni l'un, ni l'autre, ni le troisième. » Il le dit sans hauteur, avec le regret sincère d'un homme qui aurait aimé vous entendre.",
      extreme:"« Un particulier ne conteste pas une cause de titres. Il n'a pas qualité. La contradiction est ouverte à la partie, à la maison intéressée ou au ministère, et vous n'êtes ni l'un, ni l'autre, ni le troisième. » Il le dit sans hauteur et sans plaisir, avec le regret sincère d'un homme qui aurait vraiment aimé vous entendre et à qui la procédure interdit de le faire." },
    "§ La loi de Chastel n'est pas injuste. Elle est fermée, ce qui est plus efficace.",
    "Il s'apprête à reprendre. Puis il s'arrête, et il ajoute — et c'est le geste d'un homme qui vous doit quelque chose pour la question qu'il n'a pas pu entendre :",
    "« Il reste une voie, et une seule, ouverte à qui n'a pas qualité. »",
    "Contre le mur du fond, Renaud Sorgue décolle l'épaule de la pierre.",
    "« Chastel tient un champion à l'assise. Toute personne peut le faire dire. **Toute** personne. C'est la seule porte de cette salle qui ne demande pas de nom. »",
  ],
  effets:{ flags:['as_loi_ratee'], cout:{ moral:8 },
           marque:"Vous n'avez pas qualité pour contester. Il reste le rond.", court:"Pas qualité" },
  suite:'as_rond_ouverture', libelleSuite:"Le rond" },

};
Object.assign(ASSISE, ASSISE_4);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 5 — LE ROND
 *
 * Un duel judiciaire de Chastel n'est pas un combat, c'est une procédure, et
 * la procédure est écrite par l'employeur du champion. Neuf pas de craie.
 * Sortir vaut forfait, et un forfait pend l'accusé. Pas de bouclier pour le
 * requérant. Trois temps pour Sorgue, aucun pour vous.
 *
 * D'où la forme, qui n'a rien à voir avec la Wyverne : on ne peut pas
 * reculer. Reculer est la seule chose qui fasse perdre. Et lui ne cherche
 * pas à vous tuer — il cherche à vous faire sortir, ce qui est beaucoup plus
 * facile et ce que quarante et un hommes n'ont pas vu venir.
 *
 * Sa faiblesse : une hanche morte. En neuf pas, une hanche morte ne coûte
 * rien. Il faut donc lui faire faire plus de neuf pas.
 * ══════════════════════════════════════════════════════════════════════════ */

/* Où vous êtes dans le rond. Deux, c'est le bord ; trois, c'est dehors. */
const bord = () => ETAT.acte.bord || 0;
const pousser = n => { ETAT.acte.bord = Math.max(0, Math.min(3, bord() + n)); };
const prendreTemps = () => { ETAT.acte.tempsPris = (ETAT.acte.tempsPris || 0) + 1; };

const ASSISE_5 = {

as_rond_ouverture:{
  qui:'sorgue',
  lieu:"La cour du Héron · onze chandelles et deux torches · nuit",
  titre:"Neuf pas",
  melee:true,
  effets:{ melee:{ position:"centre", note:"Trois temps pour lui · aucun pour vous" },
           faire:() => { ETAT.acte.bord = 0; ETAT.acte.tempsPris = 0; },
           flags:['as_rond'] },
  texte:[
    "On ne se bat pas dans la salle : on sort dans la cour, et deux hommes de l'escorte tracent le rond à la craie de charpentier sur les pavés gelés, à la corde, en neuf pas de diamètre.",
    { sobre:"Neuf pas. C'est plus petit que ce qu'on imagine.",
      intense:"Neuf pas. C'est très exactement la taille d'une pièce commune, et c'est infiniment plus petit que ce qu'on imagine quand on entend « neuf pas » : deux hommes armés à l'intérieur d'un cercle de neuf pas ne sont jamais à plus de deux pas l'un de l'autre.",
      extreme:"Neuf pas. La taille d'une pièce commune, et infiniment plus petit que ce qu'on imagine : deux hommes armés dans un cercle de neuf pas ne sont jamais à plus de deux pas l'un de l'autre. La craie est blanche sur du pavé noir mouillé et elle tiendra environ un quart d'heure avant d'être effacée par les pieds, ce dont personne ne semble s'inquiéter." },
    "Le greffier lit les règles depuis le seuil, à voix haute, sans emphase, parce que c'est une lecture de procédure.",
    "« Le requérant ne porte ni bouclier ni arme d'hast. Le champion peut requérir trois temps. Le requérant, aucun. Quiconque met un pied hors du rond est réputé s'être retiré, et la cause est jugée en l'état. »",
    "§ *La cause est jugée en l'état.* Six mots. C'est la corde de quelqu'un d'autre, attachée à vos talons.",
    "Renaud Sorgue entre dans le rond avant vous. Il ne salue pas, il ne se met pas en garde, il ne fait rien du tout : il va au centre, il pose son poids sur la jambe droite, et il attend.",
    "Épée courte. Pas de bouclier non plus — il y a droit et il n'en prend pas, ce qui n'est pas de la générosité mais un renseignement que vous mettrez trop longtemps à lire.",
    () => a('as_sait_hanche')
      ? "Il ne bougera pas de ce centre. Pas parce qu'il est arrogant : parce que sa hanche gauche est morte, qu'en neuf pas elle ne coûte rien, et que quarante et un hommes se sont épuisés autour d'un homme immobile."
      : "Il ne bouge pas. Vous mettrez un échange, peut-être deux, à comprendre pourquoi.",
    "Quand vous entrez à votre tour, il dit, à voix normale, pour vous et pour personne d'autre :",
    "« Un. »",
  ],
  suite:'as_rond_1', libelleSuite:"Un" },

/* ══ PREMIER ÉCHANGE ══════════════════════════════════════════════════════ */
as_rond_1:{
  qui:'sorgue',
  melee:true,
  texte:[
    { sobre:"Il n'attaque pas. Il avance d'un demi-pas et il attend que vous soyez ailleurs.",
      intense:"Il n'attaque pas. Il avance d'un demi-pas, l'épée basse, et il attend — et vous comprenez la première chose importante de cette nuit : il ne cherche pas votre corps. Il regarde vos pieds. Il a regardé vos pieds depuis le moment où vous êtes entré dans le rond et il n'a rien regardé d'autre.",
      extreme:"Il n'attaque pas. Un demi-pas, l'épée basse, et il attend. Et vous comprenez la première chose importante de cette nuit : il ne regarde pas votre poitrine, ni vos mains, ni vos yeux. Il regarde vos pieds. Il les regarde depuis que vous êtes entré et il n'a rien regardé d'autre, parce que ce qu'il chasse n'est pas votre vie — c'est le moment où l'un de ces deux pieds ira se poser sur de la craie." },
    "§ Quarante et un hommes sont morts ou déshonorés dans un cercle de neuf pas en se battant contre un adversaire, alors qu'ils se battaient contre un cercle.",
    "Autour, la cour est pleine. Toute la vallée est sortie dans la neige pour voir ça, et derrière les têtes, sur le seuil, Ancelin Vasque n'a pas remis ses lunettes.",
  ],
  choix:[
    { t:"Tenir le centre. Ne pas céder un pouce.",
      detail:"Il veut la place · la lui refuser coûte des côtes · Force + lutte contre 10",
      risque:"calculé",
      test:{ carac:'force', comp:'lutte', dc:10, adversaire:'sorgue', manoeuvre:'centre' },
      degres:{ dominante:'as_r1_centre_dom', couteuse:'as_r1_centre_cout', echec:'as_r1_centre_ko' } },

    { t:"Le prendre de vitesse",
      detail:"Cinquante-deux ans contre vingt-neuf · Agilité + épées contre 11",
      risque:"dangereux",
      test:{ carac:'agilite', comp:'epees', dc:11, adversaire:'sorgue', manoeuvre:'vitesse', equipement:2 },
      degres:{ dominante:'as_r1_vite_dom', couteuse:'as_r1_vite_cout', echec:'as_r1_vite_ko' } },

    { t:"Le faire tourner",
      si:() => a('as_sait_hanche'),
      detail:"Une hanche morte ne coûte rien en neuf pas · il faut lui en faire faire trente · Intellect + tactique contre 10",
      risque:"calculé",
      test:{ carac:'intellect', comp:'tactique', dc:10, adversaire:'sorgue', manoeuvre:'tourner', situation:2 },
      degres:{ dominante:'as_r1_tourner_dom', couteuse:'as_r1_tourner_cout', echec:'as_r1_tourner_ko' } },

    { t:"Lui répondre",
      detail:"Il compte à voix haute · un homme qui compte attend qu'on l'écoute · Présence contre 9",
      risque:"favorable",
      test:{ carac:'presence', comp:null, dc:9, adversaire:'sorgue', manoeuvre:'parler',
             situation:() => a('as_sait_sorgue') ? 2 : 0 },
      degres:{ dominante:'as_r1_parler_dom', couteuse:'as_r1_parler_cout', echec:'as_r1_parler_ko' } },
  ],
},

/* ── Tenir le centre ─────────────────────────────────────────────────────── */
as_r1_centre_dom:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous ne bougez pas non plus.",
    "C'est tout. C'est la seule chose à faire et personne ne la fait, parce qu'un homme à qui l'on avance dessus recule d'un demi-pas sans y penser — c'est ce demi-pas que Renaud Sorgue vend à Chastel depuis trente ans.",
    { sobre:"Vous encaissez trois passes sans céder un pouce.",
      intense:"Il donne trois passes en quatre secondes, courtes, sèches, du poignet, sans jamais engager l'épaule : ce ne sont pas des coups, ce sont des questions. Vous les prenez sur le fort de la lame, les pieds vissés, et vous répondez non trois fois.",
      extreme:"Trois passes en quatre secondes, courtes et sèches, du poignet, sans jamais engager l'épaule — ce ne sont pas des coups, ce sont des questions. La troisième vous ouvre le dos de la main gauche sur deux pouces, proprement, parce qu'il l'a voulu là : une main qui saigne est une main qu'on regarde, et un homme qui regarde sa main déplace son poids. Vous ne le déplacez pas. Vous répondez non trois fois." },
    "À la quatrième, il ne pose pas la question. Il s'arrête.",
    "« Deux », dit-il.",
    "§ Il ne compte pas les passes. Il compte les hommes qui ne reculent pas, et il vient de passer de un à deux en trente ans.",
  ],
  effets:{ flags:['as_tenu_centre'], cout:{ endurance:12 },
           meleeMaj:{ position:"centre, tenu", note:"Il vous a compté" },
           exploit:{ eclat:5, temoins:'foule', quoi:"vous n'avez pas reculé devant le champion de Chastel" } },
  suite:'as_rond_temps', libelleSuite:"Il lève la main" },

as_r1_centre_cout:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous tenez. Vous tenez au prix qu'il faut payer pour tenir contre un homme qui a fait ça quarante et une fois.",
    { sobre:"La troisième passe entre sous les côtes flottantes. Vous restez debout.",
      intense:"Les deux premières passes sont des questions. La troisième n'en est pas une : elle entre sous les côtes flottantes du côté droit, à plat, sur deux pouces, et ressort avant que vous ayez fini de comprendre qu'elle est entrée. Vous restez debout et vous ne reculez pas, ce qui est la seule chose qui compte et ce qui vous coûte tout le reste.",
      extreme:"Les deux premières passes sont des questions. La troisième n'en est pas une : elle entre sous les côtes flottantes à droite, à plat pour passer entre les os, sur deux pouces, et ressort avant que vous ayez fini de comprendre. Ça ne fait pas mal — ça fait chaud, puis froid, et la chemise se colle en trois secondes. Vous restez debout et vous ne reculez pas, et c'est tout ce qui compte, et ça vous coûte tout le reste." },
    "« Deux », dit-il, sans satisfaction. Puis, plus bas, pour vous seul : « Ne regardez pas. Si vous regardez, vous reculez. »",
    "§ Il vient de vous donner un conseil. C'est un professionnel : il ne veut pas gagner sur un homme qui se rate tout seul.",
  ],
  effets:{ flags:['as_tenu_centre'], cout:{ endurance:14, vitalite:10 },
           blessure:{ id:'flottantes', zone:"Côtes flottantes droites", type:"perforée à plat, deux pouces",
                      gravite:2, douleur:2, saignement:3, fonction:['force','endurance','lutte'],
                      cicatrice:"un trou net qui se ferme en trois semaines et se rappelle en hiver" },
           meleeMaj:{ position:"centre, tenu", note:"Vous saignez · il vous a compté" },
           exploit:{ eclat:5, temoins:'foule', quoi:"vous n'avez pas reculé devant le champion de Chastel" } },
  suite:'as_rond_temps', libelleSuite:"Il lève la main" },

as_r1_centre_ko:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous décidez de ne pas bouger, et vous bougez.",
    { sobre:"Un demi-pas. Vous ne l'avez pas décidé.",
      intense:"Un demi-pas en arrière, sur la troisième passe, et vous ne l'avez pas décidé — c'est la jambe qui l'a décidé, comme elle le décide chez tout le monde, parce qu'une lame qui arrive au visage est une lame qui arrive au visage et qu'il y a des choses plus vieilles que le courage.",
      extreme:"Un demi-pas en arrière sur la troisième passe, et vous ne l'avez pas décidé. C'est la jambe. Elle le décide chez tout le monde : une lame qui arrive au visage est une lame qui arrive au visage, et il y a dans un corps humain des choses beaucoup plus anciennes que le courage et qui ont toujours le dernier mot d'un quart de seconde." },
    "Il avance d'un pas entier dans la place que vous venez de lui donner. Il ne frappe pas. Il occupe.",
    "« Un », dit-il.",
    "§ Vous avez perdu un demi-pas sur neuf. Ça ne se reprend pas : dans ce rond, le terrain ne change de main qu'une fois.",
  ],
  effets:{ faire:() => pousser(1), cout:{ endurance:10 },
           meleeMaj:{ position:"un demi-pas cédé", note:"Il occupe le centre" } },
  suite:'as_rond_temps', libelleSuite:"Suivant" },

/* ── La vitesse ──────────────────────────────────────────────────────────── */
as_r1_vite_dom:{
  qui:'sorgue', melee:true,
  texte:[
    "Vingt-neuf ans contre cinquante-deux. C'est le seul avantage qui ne se discute pas et le seul qu'on ne puisse pas lui retirer.",
    { sobre:"Vous entrez, vous touchez, vous ressortez avant sa parade.",
      intense:"Vous entrez avant qu'il ait fini d'avancer son demi-pas, vous touchez au-dessus du coude gauche, et vous êtes ressorti quand sa parade arrive à l'endroit où vous étiez. La lame lui ouvre la manche et le bras dessous sur quatre pouces.",
      extreme:"Vous entrez avant qu'il ait fini son demi-pas, vous touchez au-dessus du coude gauche, et vous êtes ressorti quand sa parade arrive où vous étiez. La manche s'ouvre et le bras dessous sur quatre pouces — une entaille propre, peu profonde, qui saigne beaucoup et immédiatement parce que c'est un endroit qui saigne toujours beaucoup et immédiatement." },
    "La cour fait un bruit. Un seul, court, quarante personnes ensemble.",
    "Renaud Sorgue baisse les yeux vers son bras avec la curiosité polie d'un homme à qui l'on montre un objet.",
    "§ « Tiens », dit-il. Et rien d'autre.",
    "Il lève la main gauche vers le seuil, deux doigts.",
  ],
  effets:{ flags:['as_touche_1'], cout:{ endurance:10 },
           meleeMaj:{ position:"centre disputé", note:"Il saigne du bras gauche" },
           exploit:{ eclat:6, temoins:'foule', quoi:"vous avez touché le champion de Chastel au premier échange" } },
  suite:'as_rond_temps', libelleSuite:"Deux doigts" },

as_r1_vite_cout:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous entrez vite. Vous entrez plus vite que lui et c'est vrai jusqu'au bout.",
    { sobre:"Il ne pare pas : il vous laisse entrer et il vous accompagne vers le bord.",
      intense:"Il ne pare pas. C'est la deuxième chose importante de cette nuit et elle coûte cher à apprendre : il vous laisse entrer, il prend votre lame sur la garde, et il **accompagne** — épaule contre épaule, deux pas, dans le sens où vous alliez déjà, et vous alliez vers la craie.",
      extreme:"Il ne pare pas. Il vous laisse entrer, prend la lame sur la garde, et il accompagne : épaule contre épaule, deux pas, exactement dans le sens où vous alliez. Cinquante-deux ans, deux cent dix livres et trente ans de bois frappé tous les jours au même endroit. On ne résiste pas à ça de face, et de toute façon la question n'est pas de résister — quand vous vous arrêtez, vos talons sont à un pouce de la craie." },
    "Il recule d'un pas et il vous laisse revenir. Il ne finit pas.",
    "§ Il ne finit jamais au premier. Un homme qu'on sort du rond en trente secondes, ça se remarque ; un homme qu'on sort au troisième, ça s'appelle un duel.",
    "« Deux », dit-il.",
  ],
  effets:{ faire:() => pousser(1), flags:['as_touche_1'], cout:{ endurance:14 },
           meleeMaj:{ position:"talons près de la craie", note:"Il vous accompagne au lieu de parer" } },
  suite:'as_rond_temps', libelleSuite:"Revenir" },

as_r1_vite_ko:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous entrez vite et il n'est pas là.",
    "Il n'a pas esquivé — un homme avec cette hanche n'esquive pas. Il a simplement tourné le buste de dix degrés et laissé passer, et vous découvrez à cet instant qu'un adversaire immobile est infiniment plus difficile à toucher qu'un adversaire qui bouge, parce qu'un adversaire qui bouge vous dit où il sera.",
    { sobre:"Le pommeau arrive sur la tempe. Vous partez de trois pas.",
      intense:"Le pommeau arrive sur la tempe droite en même temps que vous comprenez qu'il n'était pas là. Il n'y a pas de douleur : il y a un bruit à l'intérieur du crâne, la cour qui bascule de quinze degrés, et trois pas parcourus sans les avoir demandés.",
      extreme:"Le pommeau arrive sur la tempe droite pendant que vous comprenez encore qu'il n'était pas là. Pas de douleur : un bruit à l'intérieur du crâne, la cour qui bascule de quinze degrés, un goût de métal, et trois pas parcourus sans les avoir demandés. Quand le monde se remet droit, il y a de la craie blanche sur le bout de votre botte gauche." },
    "De la craie. Sur la botte.",
    "§ Pas dehors. Sur la ligne. Il y a une différence et c'est la seule chose au monde qui compte pendant les deux secondes qui suivent.",
    "« Un », dit Renaud Sorgue, et il attend que vous reveniez.",
  ],
  effets:{ faire:() => pousser(2), cout:{ endurance:16, vitalite:8, concentration:10 },
           meleeMaj:{ position:"sur la ligne", note:"De la craie sur la botte" } },
  suite:'as_rond_temps', libelleSuite:"Revenir au centre" },

/* ── Le faire tourner ────────────────────────────────────────────────────── */
as_r1_tourner_dom:{
  qui:'sorgue', melee:true,
  texte:[
    "Il faut renoncer à le toucher. C'est très difficile et c'est toute la solution : pendant quatre-vingt-dix secondes, vous ne cherchez pas à le blesser, vous cherchez à ce qu'il change d'appui.",
    "Vous prenez sa gauche. Il pivote. Vous reprenez sa gauche. Il pivote encore.",
    { sobre:"Au cinquième pivot, quelque chose se voit.",
      intense:"Au cinquième pivot, quelque chose se voit : il ne tourne pas sur la hanche, il tourne en déplaçant tout le corps en trois petits pas, ce qui prend un demi-temps de plus. Au huitième, le demi-temps devient un temps. Au onzième, il souffle par la bouche.",
      extreme:"Au cinquième pivot, ça se voit : il ne tourne pas sur la hanche, il déplace tout le corps en trois petits pas, ce qui coûte un demi-temps. Au huitième, le demi-temps devient un temps entier. Au onzième, il souffle par la bouche, et la sueur qui lui descend de la tempe en décembre, dans une cour à quatre degrés, n'a rien à voir avec l'effort d'un homme qui a donné trois passes." },
    "§ En neuf pas, une hanche morte ne coûte rien. Vous venez de lui en faire faire trente-quatre.",
    "Il s'arrête au centre. Il ne remonte pas la garde. Il lève la main gauche, deux doigts, vers le seuil.",
    "« Temps. »",
    "Sa voix n'a pas changé. Sa respiration, si.",
  ],
  effets:{ flags:['as_hanche_travaille'], cout:{ endurance:16 },
           meleeMaj:{ position:"vous tournez, il pivote", note:"Il souffle · sa hanche travaille" },
           exploit:{ eclat:5, temoins:'foule', quoi:"vous avez fait tourner le champion sur une hanche morte" } },
  suite:'as_rond_temps', libelleSuite:"Temps" },

as_r1_tourner_cout:{
  qui:'sorgue', melee:true,
  texte:[
    "Le plan est bon. Le rond ne l'est pas.",
    { sobre:"On ne tourne pas autour d'un homme dans neuf pas sans finir sur la craie.",
      intense:"On ne tourne pas autour d'un homme dans un cercle de neuf pas : il n'y a pas la place. Chaque fois que vous prenez sa gauche, vous prenez aussi trois pieds vers l'extérieur, et il le sait depuis trente ans — il n'a même pas besoin de vous suivre, il lui suffit de pivoter au ralenti pendant que vous faites tout le travail de vous rapprocher du bord.",
      extreme:"On ne tourne pas autour d'un homme dans neuf pas : il n'y a pas la place. Chaque prise de sa gauche vous coûte trois pieds vers l'extérieur, et il le sait depuis trente ans. Il n'a pas besoin de vous suivre. Il pivote au ralenti, à son rythme, en vous laissant faire tout le travail — et au quatrième tour vous n'êtes plus dans un cercle de neuf pas, vous êtes dans un couloir de deux qui longe la craie." },
    "Vous le sentez à quelque chose de bête : le bruit du sol. Le pavé du centre est propre, celui du bord est couvert du sable qu'on a jeté pour l'adhérence, et le sable crisse.",
    "§ Sa hanche travaille. Vous, vous êtes au bord.",
    "« Deux », dit-il. Puis il lève deux doigts vers le seuil. « Temps. »",
  ],
  effets:{ faire:() => pousser(2), flags:['as_hanche_travaille'], cout:{ endurance:18 },
           meleeMaj:{ position:"le couloir du bord", note:"Sa hanche travaille · le sable crisse sous vous" } },
  suite:'as_rond_temps', libelleSuite:"Temps" },

as_r1_tourner_ko:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous prenez sa gauche et il ne pivote pas.",
    "Il fait quelque chose de beaucoup plus simple et que vous n'aviez pas prévu parce que c'est trop simple : il traverse. Deux pas en ligne droite à travers le centre du rond, sur sa jambe valide, pour se retrouver de l'autre côté.",
    { sobre:"Un homme qui ne peut pas tourner peut encore aller tout droit.",
      intense:"Un homme qui ne peut pas tourner peut encore aller tout droit, et un cercle de neuf pas a l'immense avantage qu'on le traverse toujours en trois pas. Vous avez construit un plan sur une infirmité, et l'infirmité était vraie, et le plan était faux.",
      extreme:"Un homme qui ne peut pas tourner peut encore aller tout droit, et un cercle de neuf pas se traverse toujours en trois pas. Vous avez bâti un plan sur une infirmité : l'infirmité était vraie et le plan était faux, ce qui est la façon la plus humiliante de perdre un échange parce qu'on ne peut la reprocher à personne." },
    "Il vous cueille au passage, de l'épaule, en travers du dos. Vous partez de quatre pas.",
    "§ La craie est sous vos deux pieds. Pas dehors. Sous.",
    "« Un », dit-il, et il vous laisse revenir, parce qu'il ne finit jamais au premier.",
  ],
  effets:{ faire:() => pousser(2), cout:{ endurance:18, vitalite:6 },
           meleeMaj:{ position:"les deux pieds sur la ligne", note:"Il traverse au lieu de tourner" } },
  suite:'as_rond_temps', libelleSuite:"Revenir" },

/* ── Lui répondre ────────────────────────────────────────────────────────── */
as_r1_parler_dom:{
  qui:'sorgue', melee:true,
  texte:[
    "« Un », a-t-il dit.",
    "« Deux cent onze », dites-vous.",
    "Il s'arrête. Pas beaucoup — un quart de seconde, l'épée toujours basse — mais un homme qui n'a pas été interrompu depuis trente ans s'arrête très visiblement quand on l'interrompt.",
    "« Pardon ? »",
    "« Le nombre de volumes du répertoire général qu'on a descendus dans cette vallée pour juger un chef d'accusation qui tient en onze mots. Vous comptez, je compte. »",
    { sobre:"Il y a quelque chose dans sa figure. Ça ne dure pas.",
      intense:"Il y a quelque chose dans sa figure et ça ne dure pas, mais c'était là : l'expression d'un homme à qui l'on vient de parler au lieu de lui parler par-dessus. Trente ans qu'on le fait entrer dans un rond, qu'on le paie, et qu'on ne lui adresse pas la parole.",
      extreme:"Quelque chose passe dans sa figure et ne dure pas, mais c'était là : l'expression d'un homme à qui l'on vient d'adresser la parole. Trente ans qu'on le fait entrer dans un rond, qu'on le paie le soir même en pièces comptées, et que pas un des quarante et un ne lui a jamais parlé d'autre chose que de mourir." },
    "« Vous croyez me déconcentrer. »",
    "« Non. Je crois que vous n'avez pas envie d'être ici, et que ça fait trente ans que ça dure. »",
    "Il donne deux passes, courtes, presque distraites. Vous les prenez.",
    "§ « Quarante et un », dit-il. « Pas un seul que Chastel pouvait perdre. Vous savez ce que c'est, de gagner quarante et une fois sans avoir jamais rien gagné ? »",
    "@« Je crois, oui. »",
    "Il lève deux doigts vers le seuil sans vous quitter des yeux.",
    "« Temps. »",
  ],
  effets:{ flags:['as_sorgue_parle','as_sait_hanche'],
           meleeMaj:{ position:"centre, à deux pas", note:"Il vous parle" },
           exploit:{ eclat:4, temoins:'foule', quoi:"vous avez parlé au champion de Chastel dans le rond" },
           marque:"Renaud Sorgue a gagné quarante et une fois sans avoir jamais rien gagné.", court:"Quarante et un" },
  suite:'as_rond_temps', libelleSuite:"Temps" },

as_r1_parler_cout:{
  qui:'sorgue', melee:true,
  texte:[
    "« Un », a-t-il dit.",
    "« Vous n'êtes pas obligé de faire ça. »",
    { sobre:"Il ne répond pas. Il donne trois passes pendant que vous parlez.",
      intense:"Il ne répond pas et il ne s'arrête pas, et c'est la leçon : on ne parle pas dans un rond de neuf pas à un homme qui y travaille depuis trente ans. Les trois passes arrivent pendant votre phrase, et une phrase coûte exactement un demi-temps de garde.",
      extreme:"Il ne répond pas et il ne ralentit pas. On ne parle pas dans un rond de neuf pas à un homme qui y travaille depuis trente ans : les trois passes arrivent pendant votre phrase, parce qu'une phrase coûte un demi-temps de garde et qu'il vend ce demi-temps à Chastel depuis avant votre naissance. La deuxième vous prend la joue, de la pommette à la mâchoire, assez profond pour qu'on voie ce qu'il y a derrière." },
    "« Si », dit-il enfin, quand c'est fini. « Je suis obligé. C'est même la seule chose vraie qu'on puisse dire de moi. »",
    "§ Le sang chaud dans le col, en décembre, dans une cour pleine de gens qui se taisent.",
    "Il lève deux doigts vers le seuil. « Temps. »",
  ],
  effets:{ flags:['as_sorgue_parle'], cout:{ endurance:12, vitalite:8 },
           blessure:{ id:'joue', zone:"Joue droite", type:"ouverte de la pommette à la mâchoire",
                      gravite:1, douleur:2, saignement:2, fonction:['presence'],
                      cicatrice:"une ligne qui traverse la figure et qu'on regarde avant de vous écouter" },
           meleeMaj:{ position:"centre", note:"Vous saignez de la figure" } },
  suite:'as_rond_temps', libelleSuite:"Temps" },

as_r1_parler_ko:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous ouvrez la bouche et vous n'avez rien à dire.",
    "C'est une chose qui arrive et dont personne ne parle : on décide de parler, on prend l'air de quelqu'un qui va parler, et il ne vient rien du tout parce qu'on est dans une cour, en décembre, dans un cercle de craie, devant quarante personnes et un homme qui a fait ça quarante et une fois.",
    { sobre:"Il ne profite même pas. Il attend que vous ayez refermé la bouche.",
      intense:"Il n'en profite même pas. Il attend, poliment, que vous ayez refermé la bouche — et cette politesse-là vaut trois coups au visage, devant quarante personnes qui l'ont vue.",
      extreme:"Il n'en profite pas. Il attend que vous ayez refermé la bouche, poliment, l'épée basse, et cette politesse vaut trois coups au visage devant quarante personnes qui l'ont vue. Quelque part dans la cour, quelqu'un rit — un rire nerveux, immédiatement étouffé, et c'est le pire son de toute cette nuit." },
    "« Un », dit-il, sans méchanceté aucune.",
    "§ Vous avez brûlé un échange à ne rien faire. Il en reste deux.",
  ],
  effets:{ cout:{ moral:10 }, meleeMaj:{ position:"centre", note:"Vous avez perdu un échange" } },
  suite:'as_rond_temps', libelleSuite:"Temps" },

};
Object.assign(ASSISE, ASSISE_5);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 6 — LES TEMPS, ET LE DEUXIÈME ÉCHANGE
 *
 * Le temps est la vraie arme de Chastel : il en a trois, vous n'en avez
 * aucun, et chacun casse ce que vous venez de construire. Toute la forme du
 * duel tient là — survivre à ses trois temps, après quoi il n'est plus qu'un
 * homme de quarante-sept ans avec une hanche morte.
 * ══════════════════════════════════════════════════════════════════════════ */

DYN.as_rond_temps = () => {
  const A = ETAT.acte;
  if(bord() >= 3) return aller('as_forfait');
  A.passe = (A.passe || 0) + 1;
  if(A.passe === 1){ prendreTemps(); return aller('as_temps_1'); }
  if(A.passe === 2){ prendreTemps(); return aller('as_temps_2'); }
  return aller('as_rond_3');
};

const ASSISE_6 = {

as_rond_temps:{ dyn:true, texte:[], suite:'as_rond_2' },

as_temps_1:{
  qui:'sorgue',
  titre:"Premier temps",
  melee:true,
  texte:[
    "Un temps dure ce que le champion décide, et personne ne le chronomètre parce que personne n'a jamais osé demander comment on le chronomètre.",
    "Il sort du rond — lui a le droit — il s'assied sur le billot à démonter les roues, et un garçon de l'escorte lui apporte de l'eau dans un gobelet d'étain. C'est manifestement un rite : le garçon sait exactement où se placer et Sorgue ne le remercie pas, ce qui veut dire qu'il l'a remercié les cent premières fois.",
    { sobre:"Vous restez dans le rond. Vous n'avez pas le droit d'en sortir.",
      intense:"Vous restez dans le rond, parce qu'un requérant qui sort du rond s'est retiré, temps ou pas temps. Vous restez donc debout au milieu d'un cercle de craie, seul, sous quarante regards, pendant qu'un homme de quarante-sept ans boit de l'eau assis à six pas.",
      extreme:"Vous restez dans le rond : un requérant qui sort s'est retiré, temps ou pas temps. Vous restez donc debout, seul, au milieu d'un cercle de craie, sous quarante regards et deux torches, pendant qu'un homme assis à six pas boit de l'eau lentement. C'est ça, le temps. Ce n'est pas du repos — c'est une humiliation qui se donne des airs de règlement." },
    "§ Il ne se repose pas beaucoup. Il vous laisse refroidir.",
    "Au bout d'un moment il dit, sans lever la tête :",
    () => a('as_sorgue_parle')
      ? "« Vous alliez me demander pourquoi je continue. »\n\n« Oui. »\n\n« Parce que le jour où je dis non, ils prennent quelqu'un de vingt-cinq ans qui ne sait pas encore qu'on ne peut pas gagner. Moi je sais. Donc je gagne, et il n'y a pas de mort. Sur quarante et un, j'en ai tué quatre. Quatre en trente ans, messire. Le suivant en ferait quatre par an. »"
      : (a('as_touche_1')
        ? "« Vous êtes rapide. Ils le sont tous. » Il regarde son bras ouvert sans intérêt particulier. « J'ai été rapide aussi. Ça part vers quarante ans et ça ne prévient pas : un matin on se lève et on est devenu un homme qui attend. »"
        : "« Vous vous demandez comment on fait quarante et une fois. » Il boit. « On ne fait rien. On reste au milieu. Ce sont les autres qui font tout, et au bout d'un moment ils ont fait assez de choses pour qu'il y en ait une de trop. »"),
    () => bord() >= 2
      ? "Puis il regarde vos pieds, très ouvertement, et il regarde la craie sous vos pieds.\n\n« Vous êtes à un pouce. Je vous le dis parce que vous ne le savez pas, et parce que je ne veux pas gagner comme ça. Revenez au centre pendant le temps. Vous en avez le droit. »"
      : "Puis il repose le gobelet, et le garçon l'emporte sans un mot.",
    "Il se relève. La façon dont il se relève de ce billot vous en apprend plus sur sa hanche que toute l'heure précédente.",
  ],
  effets:{ flags:['as_sait_hanche'],
           faire:() => { if(bord() >= 2) pousser(-1); },
           meleeMaj:{ note:() => `Temps : ${tempsRestants()} restant${tempsRestants() > 1 ? 's' : ''}` } },
  suite:'as_rond_2', libelleSuite:"Deux" },

as_temps_2:{
  qui:'sorgue',
  titre:"Deuxième temps",
  melee:true,
  texte:[
    "Il ne va pas jusqu'au billot cette fois. Il sort d'un pas, il reste debout, et il pose la main gauche sur le mur de l'écurie — pas pour s'appuyer, pour vérifier qu'il pourrait s'appuyer.",
    { sobre:"Il souffle par la bouche. Il ne l'a pas fait depuis trente ans devant témoins.",
      intense:"Il souffle par la bouche, franchement, en décembre, dans une cour à quatre degrés. Un homme de quarante-sept ans qui a passé trente ans à ne jamais souffler devant témoins est en train de le faire devant toute la vallée, et quelques personnes dans cette cour viennent de comprendre quelque chose.",
      extreme:"Il souffle par la bouche, franchement, dans une cour à quatre degrés, et la vapeur sort en grosses bouffées irrégulières. Trente ans à ne jamais souffler devant témoins, et il le fait devant toute la vallée. Sur le seuil, Ancelin Vasque a changé de position pour la première fois de la soirée. Quelques personnes dans cette cour viennent de comprendre quelque chose et n'osent pas encore se le dire." },
    "« Dernier », dit-il, en levant deux doigts. « Il ne m'en restera plus. »",
    "« Je sais. »",
    "« Vous savez, oui. Vous êtes le premier à avoir compté. »",
    "§ Il ne dit pas ça comme un compliment. Il le dit comme un homme qui pose un objet.",
    () => a('as_hanche_travaille')
      ? "« Vous m'avez fait faire trente-quatre pas. » Il regarde sa jambe gauche comme on regarde un cheval qui boite. « En trente ans, mon record était onze. »"
      : "^« Vous ne m'avez pas encore fait marcher. C'est la seule chose qui vous reste et vous ne l'avez pas trouvée. »",
    "Il remonte la garde. Il la remonte moins haut qu'au début et vous êtes probablement le seul, avec Vasque, à voir de combien.",
    "« Après ce temps-là, messire, il n'y a plus de règlement. Il n'y a plus qu'un homme de quarante-sept ans et un homme de vingt-quatre, dans un rond de neuf pas, et pas de troisième temps. »",
    "« Ça vous inquiète ? »",
    "« Ça me repose. »",
  ],
  effets:{ flags:['as_dernier_temps','as_sait_hanche'],
           meleeMaj:{ note:"Plus aucun temps" } },
  suite:'as_rond_3', libelleSuite:"Trois" },

/* ══ DEUXIÈME ÉCHANGE ═════════════════════════════════════════════════════ */
as_rond_2:{
  qui:'sorgue',
  titre:"Deux",
  melee:true,
  texte:[
    { sobre:"Il rentre dans le rond et il a changé quelque chose.",
      intense:"Il rentre dans le rond et il a changé quelque chose. Ce n'est pas la garde, ce n'est pas l'appui : c'est la distance. Il se tient un demi-pied plus près qu'au premier échange, ce qui est très peu et ce qui veut dire qu'il a fini de vous évaluer.",
      extreme:"Il rentre dans le rond et il a changé quelque chose. Pas la garde, pas l'appui : la distance. Un demi-pied de moins qu'au premier échange. C'est très peu et ça veut dire qu'il a fini de vous évaluer, qu'il a rangé ce qu'il a trouvé, et qu'il travaille maintenant sur un homme dont il connaît trois habitudes." },
    "§ C'est la vraie raison des quarante et un. Il ne vous bat pas au premier échange : il vous lit au premier échange.",
    () => bord() >= 2
      ? "Vos talons sont à un pouce de la craie. Tout ce qui vous arrive maintenant vous arrive avec le vide dans le dos."
      : (bord() === 1
        ? "Vous avez cédé un demi-pas et vous ne l'avez pas repris. Le rond fait toujours neuf pas ; le vôtre en fait huit et demi."
        : "Vous êtes au centre. C'est plus rare qu'on ne croit au deuxième échange."),
    "« Deux », dit-il.",
  ],
  choix:[
    { t:"Le pousser au bord à son tour",
      detail:"Il n'a jamais eu à reculer · sa hanche ne recule pas · Force + lutte contre 11",
      risque:"dangereux",
      test:{ carac:'force', comp:'lutte', dc:11, adversaire:'sorgue', manoeuvre:'pousser',
             situation:() => (a('as_hanche_travaille') ? 2 : 0) - bord() },
      degres:{ dominante:'as_r2_pousser_dom', couteuse:'as_r2_pousser_cout', echec:'as_r2_pousser_ko' } },

    { t:"La hanche",
      si:() => a('as_sait_hanche'),
      detail:"Sous la ceinture, à gauche, là où il ne peut pas descendre la garde · Force + anatomie contre 10",
      risque:"calculé",
      test:{ carac:'force', comp:'anatomie', dc:10, adversaire:'sorgue', manoeuvre:'hanche',
             equipement:2, situation:() => a('as_hanche_travaille') ? 3 : 0 },
      degres:{ dominante:'as_r2_hanche_dom', couteuse:'as_r2_hanche_cout', echec:'as_r2_hanche_ko' } },

    { t:"Ne rien faire. Le laisser venir.",
      detail:"Il a deux cent dix livres et une jambe · venir lui coûte plus qu'à vous · Endurance + tactique contre 9",
      risque:"prudent",
      test:{ carac:'endurance', comp:'tactique', dc:9, adversaire:'sorgue', manoeuvre:'attendre',
             situation:() => -bord() },
      degres:{ dominante:'as_r2_attendre_dom', couteuse:'as_r2_attendre_cout', echec:'as_r2_attendre_ko' } },

    { t:"Le désarmer",
      detail:"Une cause tombe sur une épée par terre aussi bien que sur un mort · Agilité + épées contre 12",
      risque:"très dangereux",
      test:{ carac:'agilite', comp:'epees', dc:12, adversaire:'sorgue', manoeuvre:'desarmer', equipement:2 },
      degres:{ dominante:'as_r2_desarmer_dom', couteuse:'as_r2_desarmer_cout', echec:'as_r2_desarmer_ko' } },
  ],
},

as_r2_pousser_dom:{
  qui:'sorgue', melee:true,
  texte:[
    "Personne ne l'a jamais poussé. C'est ça, la faille des quarante et un : quarante et un hommes ont essayé de le toucher et pas un n'a essayé de le déplacer.",
    { sobre:"Vous entrez au corps et vous poussez. Il ne peut pas ancrer à gauche.",
      intense:"Vous lâchez la distance, vous entrez au corps, épaule sous son épaule, et vous poussez — pas un coup, une poussée continue, celle qu'on donne à une charrette. Un homme qui résiste à une poussée le fait en ancrant la jambe arrière. Sa jambe arrière est la gauche, et sa hanche gauche est morte depuis dix ans.",
      extreme:"Vous lâchez la distance, vous entrez au corps, épaule sous épaule, et vous poussez — pas un coup : une poussée continue, celle qu'on donne à une charrette embourbée. On résiste à ça en ancrant la jambe arrière. La sienne est la gauche. Sa hanche gauche est morte depuis dix ans et elle lâche à la deuxième seconde avec un bruit qu'il est le seul à entendre et qui lui traverse la figure." },
    "Il recule. Renaud Sorgue recule de quatre pas dans son propre rond, devant quarante personnes, pour la première fois depuis trente ans.",
    "§ La cour ne fait aucun bruit. Aucun. C'est cent fois plus impressionnant qu'un cri.",
    "Sur le seuil, le greffier s'est levé.",
    "Sorgue se rétablit au bord, une main sur le pavé, et il regarde la craie sous sa propre botte pendant une seconde entière.",
    "Puis il se redresse et il rit — un rire court, sans joie, celui d'un homme à qui l'on vient de faire exactement ce qu'il fait aux autres.",
    "« Ah », dit-il. « Voilà. »",
  ],
  effets:{ flags:['as_pousse'], cout:{ endurance:16 },
           meleeMaj:{ position:"vous tenez le centre", note:"C'est lui qui est au bord" },
           exploit:{ eclat:8, temoins:'foule', quoi:"vous avez fait reculer le champion de Chastel dans son propre rond" },
           marque:"Renaud Sorgue a reculé pour la première fois en trente ans.", court:"Il a reculé" },
  suite:'as_rond_temps', libelleSuite:"Trois" },

as_r2_pousser_cout:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous entrez au corps. C'est la bonne idée et c'est la mauvaise distance.",
    { sobre:"Il vous prend l'épée entre son bras et son flanc, et il serre.",
      intense:"À douze pouces, une épée courte ne sert plus à rien — pour aucun des deux. Il le sait depuis trente ans et vous l'apprenez maintenant : il coince votre lame entre son bras gauche et son flanc, il serre, et pendant deux secondes vous êtes deux hommes qui s'appuient l'un sur l'autre comme des lutteurs de foire, sauf qu'il a deux cent dix livres et vous non.",
      extreme:"À douze pouces, une épée courte ne sert à rien, pour aucun des deux. Il coince votre lame entre son bras gauche et son flanc — sur son propre bras ouvert, sans un son — il serre, et pendant deux secondes vous êtes deux hommes qui s'appuient l'un sur l'autre comme des lutteurs de foire. Sauf qu'il a deux cent dix livres et trente ans de bois frappé, et que son front vous arrive sur l'arête du nez avec la lenteur tranquille d'une porte qu'on ferme." },
    "Vous le poussez quand même. Il recule de deux pas et vous de trois.",
    "§ Vous saignez du nez dans une cour glacée et il est toujours plus près du centre que vous.",
  ],
  effets:{ faire:() => pousser(1), flags:['as_pousse'], cout:{ endurance:18, vitalite:8 },
           blessure:{ id:'nez', zone:"Nez", type:"cassé au front, en corps à corps",
                      gravite:1, douleur:2, saignement:2, fonction:['perception'],
                      cicatrice:"un nez qui n'est plus tout à fait droit et qui siffle à froid" },
           meleeMaj:{ position:"trois pas cédés", note:"Vous saignez du nez" } },
  suite:'as_rond_temps', libelleSuite:"Trois" },

as_r2_pousser_ko:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous entrez pour pousser et il n'y a rien à pousser.",
    "Il s'est effacé d'un quart de tour — le seul quart de tour que sa hanche lui permette encore, celui qui va vers la droite — et vous traversez l'endroit où il était avec toute la vitesse que vous y aviez mise.",
    { sobre:"Un homme qui pousse et qui ne rencontre rien continue.",
      intense:"Un homme qui pousse et qui ne rencontre rien continue. C'est de la mécanique, pas du combat : deux cents livres lancées sur quatre pieds mettent trois pas à s'arrêter, et le rond n'en a que neuf.",
      extreme:"Un homme qui pousse et ne rencontre rien continue : c'est de la mécanique, pas du combat. Deux cents livres lancées mettent trois pas à s'arrêter et le rond n'en fait que neuf. Vous vous arrêtez avec les deux pieds à cheval sur la craie et le pied gauche complètement dehors, sur le pavé nu, dans le sable qu'on a jeté pour l'adhérence." },
    "Il ne dit rien. Il ne réclame rien. Il attend, et c'est pire que tout, parce que quarante personnes ont vu où est votre pied et que la seule personne qui puisse en décider est sur le seuil.",
    "§ Vasque ne dit rien non plus. Il regarde. Puis il détourne les yeux — délibérément, longuement, vers le mur de l'écurie.",
    "Un commissaire aux titres vient de refuser de voir quelque chose. Vous ne saurez jamais pourquoi.",
    "Vous rentrez dans le rond.",
  ],
  effets:{ faire:() => pousser(2), flags:['as_vasque_detourne'], cout:{ endurance:18, moral:6 },
           meleeMaj:{ position:"un pied dehors, non vu", note:"Vasque a détourné les yeux" },
           marque:"Vous êtes sorti du rond et le commissaire a regardé ailleurs.", court:"Il a regardé ailleurs" },
  suite:'as_rond_temps', libelleSuite:"Trois" },

as_r2_hanche_dom:{
  qui:'sorgue', melee:true,
  texte:[
    "Sous la ceinture, à gauche. C'est le seul endroit du corps où un homme ne peut pas descendre la garde s'il tient son épée haute, et c'est le seul endroit de ce corps-là qui ne peut plus s'écarter.",
    { sobre:"La lame entre au-dessus du grand trochanter. Il tombe sur un genou.",
      intense:"La lame entre au-dessus de l'os de la hanche, en biais, sur trois pouces, dans un muscle qui a été rebâti quinze fois autour d'une articulation morte. Ce n'est pas une blessure grave — sur n'importe qui d'autre, c'est une plaie de quinze jours. Sur lui, c'est le retrait de la seule chose qui tenait la jambe.",
      extreme:"La lame entre au-dessus de l'os de la hanche, en biais, trois pouces, dans un muscle rebâti quinze fois autour d'une articulation morte. Sur n'importe qui d'autre : une plaie de quinze jours. Sur lui, c'est le retrait de la seule chose qui tenait encore la jambe debout. Il tombe sur le genou droit, lourdement, des deux mains sur le pavé, et l'épée courte part en tintant sur trois pieds." },
    "Il tombe sur un genou au milieu de son propre rond.",
    "§ La cour se met à faire du bruit. Beaucoup de bruit, d'un coup, et pas du tout celui qu'on croirait.",
    "Ce ne sont pas des cris de victoire. Ce sont quarante personnes qui viennent de voir tomber une chose qu'elles croyaient sans mécanisme, et qui découvrent en une seconde que Chastel est faite d'hommes.",
    "Renaud Sorgue tend la main vers son épée. Elle est à trois pieds. Il ne l'atteindra pas sans se relever, et il ne se relèvera pas.",
    "Il arrête de tendre la main. Il pose les deux paumes à plat sur le pavé, et il attend, à genoux, comme un homme qui a fini sa journée.",
  ],
  effets:{ flags:['as_sorgue_terre','as_desarme'], cout:{ endurance:14 },
           meleeMaj:{ position:"debout, lui à genoux", note:"Il est à terre, désarmé" },
           exploit:{ eclat:10, temoins:'foule', quoi:"vous avez mis à terre le champion de Chastel" },
           marque:"Renaud Sorgue est tombé sur un genou dans son propre rond.", court:"À genoux" },
  suite:'as_rond_3', libelleSuite:"Trois" },

as_r2_hanche_cout:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous trouvez la hanche. Vous la trouvez en lui donnant tout ce qu'il attendait.",
    { sobre:"Pour frapper là, il faut descendre. Il vous prend en descendant.",
      intense:"Pour frapper sous la ceinture, il faut descendre — l'épaule, la tête, la ligne entière — et un homme qui descend offre sa nuque. Il ne prend pas la nuque : il prend l'omoplate, à plat, avec le tranchant, de haut en bas, de tout le poids d'un bras qui frappe du bois depuis trente ans.",
      extreme:"Pour frapper sous la ceinture il faut descendre, et un homme qui descend offre sa nuque. Il ne prend pas la nuque — quatre morts en trente ans, il ne cherche pas le cinquième. Il prend l'omoplate gauche, à plat, avec le tranchant, de haut en bas et de tout le poids. L'os ne casse pas. Le bras cesse simplement d'être à vous pendant six secondes, ce qui est très long, et il ne redeviendra jamais tout à fait le vôtre." },
    "Mais vous l'avez touché. Trois pouces au-dessus de l'os, en biais, dans ce qui restait de muscle utile.",
    "§ Vous êtes deux hommes cassés dans un cercle de craie, et l'un des deux a vingt-trois ans de moins.",
    "Il ne tombe pas. Il change d'appui — pour la première fois de la soirée — et le fait de le voir changer d'appui vaut tout ce que ça vient de coûter.",
  ],
  effets:{ flags:['as_hanche_touchee'], cout:{ endurance:16, vitalite:10 },
           blessure:{ id:'omoplate', zone:"Omoplate gauche", type:"écrasée à plat du tranchant",
                      gravite:2, douleur:3, saignement:0, fonction:['force','epees','lutte','bouclier'],
                      cicatrice:"une épaule qui remonte moins haut que l'autre" },
           meleeMaj:{ position:"centre disputé", note:"Sa hanche est touchée · votre épaule est morte" } },
  suite:'as_rond_temps', libelleSuite:"Trois" },

as_r2_hanche_ko:{
  qui:'sorgue', melee:true,
  texte:[
    "Il protège cette hanche depuis dix ans. Dix ans, tous les jours, dans quarante et un ronds et dans tous les escaliers du monde.",
    { sobre:"Il n'y a pas de coup à donner là. Il n'y en a jamais eu.",
      intense:"Un homme protège son point faible mieux que tout le reste, parce qu'il y pense en permanence — c'est même la définition d'un point faible. Le vôtre, il l'a trouvé en un échange. Le sien, il le garde depuis dix ans.",
      extreme:"Un homme protège son point faible mieux que tout le reste : il y pense en permanence, c'est la définition même. Le vôtre, il l'a trouvé en un échange. Le sien, il le garde depuis dix ans, dans quarante et un ronds et dans tous les escaliers du monde, et il a organisé autour de lui une garde entière que personne n'a jamais eu le temps de comprendre." },
    "La parade arrive avant votre lame, basse, et la riposte vous prend au-dessus du genou droit — pas profond, mais exactement à l'endroit où il faut pour qu'un homme cesse de vouloir avancer.",
    "§ Il vient de vous faire ce que vous vouliez lui faire, en un tiers du temps, et sans y penser.",
    "« Deux », dit-il. Il n'en tire aucune fierté. Il compte, c'est tout.",
  ],
  effets:{ faire:() => pousser(1), cout:{ endurance:14, vitalite:10 },
           blessure:{ id:'genou_as', zone:"Cuisse droite", type:"ouverte au-dessus du genou",
                      gravite:2, douleur:2, saignement:2, fonction:['agilite','lutte','endurance'],
                      cicatrice:"quatre pouces au-dessus du genou, qui tirent en montant les escaliers" },
           meleeMaj:{ position:"un pas cédé", note:"Votre cuisse est ouverte" } },
  suite:'as_rond_temps', libelleSuite:"Trois" },

as_r2_attendre_dom:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous ne faites rien.",
    "Vous vous mettez en garde au centre, vous respirez, et vous attendez — et vous découvrez la seule chose que Renaud Sorgue ne peut pas se permettre : le temps.",
    { sobre:"Il a deux cent dix livres, quarante-sept ans et une jambe. Debout coûte.",
      intense:"Il a deux cent dix livres, quarante-sept ans et une jambe qui travaille pour deux. Rester debout lui coûte. Rester debout en garde lui coûte davantage. Rester debout en garde devant un homme qui ne bouge pas, sans pouvoir appeler de temps parce qu'il vient d'en dépenser un, lui coûte plus que trois passes.",
      extreme:"Deux cent dix livres, quarante-sept ans, une jambe qui travaille pour deux. Rester debout coûte ; rester debout en garde coûte davantage ; rester debout en garde devant un homme immobile, sans pouvoir appeler de temps parce qu'il vient d'en brûler un, coûte plus que trois passes. À la quarantième seconde, sa jambe droite commence à trembler d'un tremblement fin et régulier, de fatigue, celui qu'on ne commande pas." },
    "§ Quarante et un hommes ont cru qu'il fallait faire quelque chose. C'était l'inverse.",
    "Il finit par venir, parce qu'un champion qui ne vient pas n'est pas un champion et qu'il y a quarante personnes.",
    "Il vient mal. Il vient d'une jambe.",
  ],
  effets:{ flags:['as_use'], meleeMaj:{ position:"centre", note:"Il tremble de la jambe droite" },
           exploit:{ eclat:5, temoins:'foule', quoi:"vous avez laissé le champion de Chastel s'user debout" } },
  suite:'as_rond_temps', libelleSuite:"Trois" },

as_r2_attendre_cout:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous attendez. Il attend aussi.",
    { sobre:"Deux hommes immobiles dans un cercle de craie, et une cour qui commence à parler.",
      intense:"Deux hommes immobiles dans un cercle de craie, en décembre, sous deux torches. Au bout d'une minute la cour commence à parler ; au bout de deux, quelqu'un siffle ; au bout de trois, un homme de l'escorte frappe le pavé du talon de sa hampe, trois coups, et c'est le règlement qui parle.",
      extreme:"Deux hommes immobiles dans un cercle de craie, sous deux torches. Au bout d'une minute la cour parle ; au bout de deux, quelqu'un siffle ; au bout de trois, un homme de l'escorte frappe trois fois le pavé du talon de sa hampe. C'est le règlement : le requérant qui n'engage pas est réputé se retirer. On ne vous l'a pas lu. On ne lit jamais celui-là, on le frappe." },
    "Vous engagez parce qu'il faut engager, et engager sur commande n'est pas engager quand on veut.",
    "§ Le rond n'est pas un terrain. C'est un règlement, et le règlement est de l'autre côté.",
    "Il vous prend l'avant-bras droit du plat de la lame, sur l'os. Ça ne coupe pas. Ça fait quelque chose de plus bête et de plus efficace : ça vous fait lâcher.",
    "Vous rattrapez l'épée de la main gauche avant qu'elle touche le sol. La cour ne l'a pas vu. Lui, si.",
  ],
  effets:{ faire:() => pousser(1), cout:{ endurance:12, vitalite:6 },
           blessure:{ id:'cubitus', zone:"Avant-bras droit", type:"frappé sur l'os, à plat",
                      gravite:1, douleur:2, saignement:0, fonction:['epees','force'],
                      cicatrice:"un avant-bras qui lâche parfois sans prévenir" },
           meleeMaj:{ position:"un pas cédé", note:"Votre main droite lâche" } },
  suite:'as_rond_temps', libelleSuite:"Trois" },

as_r2_attendre_ko:{
  qui:'sorgue', melee:true,
  texte:[
    "Attendre suppose qu'on ait le temps. Vous ne l'avez pas : c'est lui qui a les temps, c'est écrit sur le règlement, et il vient d'en garder un exprès.",
    "Il avance de deux pas, il donne quatre passes en six secondes, et à la quatrième il lève la main gauche.",
    "« Temps. »",
    { sobre:"Il sort du rond en pleine action. Vous restez dedans, la garde haute, seul.",
      intense:"Il sort du rond au milieu de l'échange, en laissant votre garde levée sur rien, et il va boire. Vous restez au centre d'un cercle de craie, l'épée en l'air, devant quarante personnes, à attendre qu'un homme de quarante-sept ans ait fini son gobelet.",
      extreme:"Il sort du rond au milieu de l'échange, laissant votre garde levée sur rien, et il va boire. Vous restez au centre, l'épée en l'air, devant quarante personnes, pendant qu'un homme de quarante-sept ans finit un gobelet d'étain sans se presser. C'est là que trois personnes dans cette cour se mettent à rire, et c'est là que vous comprenez comment on perd quarante et une fois." },
    "§ Le temps n'est pas un repos. C'est une arme, et c'est la seule qu'il ait vraiment.",
  ],
  effets:{ faire:() => { pousser(1); prendreTemps(); }, cout:{ endurance:16, moral:10 },
           meleeMaj:{ position:"seul au centre", note:() => `Temps : ${Math.max(0, tempsRestants())}` } },
  suite:'as_rond_temps', libelleSuite:"Trois" },

as_r2_desarmer_dom:{
  qui:'sorgue', melee:true,
  texte:[
    "Une cause tombe sur une épée par terre exactement comme elle tombe sur un mort. C'est écrit dans le même règlement, dans la phrase juste après, et personne ne la lit jamais parce que personne n'y arrive.",
    { sobre:"Vous prenez la lame en spirale et vous la sortez de sa main.",
      intense:"Il faut deux choses pour désarmer un homme : de la vitesse, et savoir où sont ses doigts. Les siens sont bosselés, épaissis, mal refermés — trente ans de bois frappé au même endroit ont laissé une main qui serre très fort et qui ne serre plus vite. Vous prenez sa lame en spirale, au fort, et vous l'arrachez du poignet vers le haut.",
      extreme:"Il faut deux choses pour désarmer : la vitesse, et savoir où sont ses doigts. Les siens sont bosselés, épaissis, mal refermés ; trente ans de bois frappé au même endroit ont fait une main qui serre très fort et qui ne serre plus vite. Vous prenez la lame en spirale, au fort, et vous l'arrachez vers le haut. Le petit doigt part avec — pas arraché : luxé en arrière, à l'envers, et il reste comme ça." },
    "L'épée courte fait onze pieds en l'air et retombe hors du rond.",
    "§ Hors du rond. Il ne peut pas aller la chercher : il serait réputé s'être retiré.",
    "Renaud Sorgue regarde son arme sur les pavés, de l'autre côté d'une ligne de craie de charpentier, avec l'expression d'un homme qui vient de comprendre une plaisanterie très ancienne.",
    "« Trente ans que je fais sortir des gens de ce cercle », dit-il. « Et c'est mon épée. »",
  ],
  effets:{ flags:['as_desarme','as_sorgue_desarme'], cout:{ endurance:14 },
           meleeMaj:{ position:"centre", note:"Son épée est hors du rond" },
           exploit:{ eclat:11, temoins:'foule', quoi:"vous avez désarmé le champion de Chastel" },
           marque:"L'épée de Renaud Sorgue est tombée hors du rond.", court:"Désarmé" },
  suite:'as_rond_3', libelleSuite:"Trois" },

as_r2_desarmer_cout:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous prenez sa lame en spirale et elle ne sort pas.",
    { sobre:"Une main de trente ans de bois ne lâche pas. Vous partez tous les deux au sol.",
      intense:"Une main qui a frappé du bois tous les jours pendant trente ans ne lâche pas une épée parce qu'on tire dessus. Ce qui cède, c'est l'équilibre — le vôtre et le sien — et deux hommes armés qui perdent l'équilibre ensemble dans un cercle de neuf pas arrivent au sol dans un désordre que personne n'a jamais su décrire.",
      extreme:"Une main qui a frappé du bois trente ans durant ne lâche pas parce qu'on tire dessus. Ce qui cède, c'est l'équilibre, celui des deux, et deux hommes armés qui tombent ensemble dans neuf pas arrivent au sol dans un désordre qu'aucun maître d'armes n'a jamais su décrire. Vous vous retrouvez dessous, sa garde en travers de la gorge, et pendant trois secondes le monde se réduit à un avant-bras qui appuie et à du pavé gelé dans le dos." },
    "Il ne finit pas. Il se relève, ce qui lui prend un temps considérable, et il vous laisse vous relever aussi.",
    "« Vous auriez pu », dites-vous.",
    "« Non », dit-il, et il n'explique pas.",
    "§ Quatre morts en trente ans. Il compte ceux-là aussi, et ce sont les seuls qu'il compte pour de bon.",
  ],
  effets:{ cout:{ endurance:20, vitalite:8 },
           meleeMaj:{ position:"debout, tous les deux", note:"Il ne vous a pas fini" } },
  suite:'as_rond_temps', libelleSuite:"Trois" },

as_r2_desarmer_ko:{
  qui:'sorgue', melee:true,
  texte:[
    "On ne désarme pas un homme qui vous a lu.",
    { sobre:"Il attendait ça. Il l'attendait depuis le premier échange.",
      intense:"Il attendait ça. Pas ce coup-là précisément : il attendait qu'un homme plus rapide que lui, qui l'a vu tomber sur ses doigts, essaie enfin de faire la seule chose élégante que ce rond autorise. Ils essaient tous vers le deuxième. Il en a désarmé onze en trente ans, à la contre-spirale, dans le même mouvement.",
      extreme:"Il attendait. Pas ce coup précisément : il attendait qu'un homme plus rapide, qui a regardé ses doigts, tente enfin la seule chose élégante que ce rond autorise. Ils essaient tous vers le deuxième échange. Il en a désarmé onze en trente ans à la contre-spirale, dans le même mouvement, et le douzième ne fait pas exception." },
    "Votre épée part. Elle ne sort pas du rond — elle tombe à quatre pas, dans le rond, et c'est toute la différence entre perdre un duel et perdre une cause.",
    "§ Il ne se jette pas dessus. Il recule d'un pas et il attend que vous la ramassiez.",
    "Ce n'est pas de la générosité. C'est un homme qui refuse de gagner sur ce genre de chose, et qui vous a déjà dit pourquoi.",
    "Vous la ramassez. Vos deux talons sont sur la craie quand vous vous relevez.",
  ],
  effets:{ faire:() => pousser(2), cout:{ endurance:18, moral:6 },
           meleeMaj:{ position:"les talons sur la craie", note:"Il vous a laissé ramasser" } },
  suite:'as_rond_temps', libelleSuite:"Trois" },

};
Object.assign(ASSISE, ASSISE_6);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 7 — TROIS
 *
 * Plus de temps. Il n'y a plus de règlement qui le protège : il n'y a qu'un
 * homme de quarante-sept ans avec une hanche morte, et un de vingt-neuf qui
 * saigne. C'est la seule partie du duel qui soit un duel.
 * ══════════════════════════════════════════════════════════════════════════ */
const ASSISE_7 = {

as_rond_3:{
  qui:'sorgue',
  titre:"Trois",
  melee:true,
  texte:[
    () => a('as_sorgue_terre')
      ? "Il est à genoux au milieu de son rond, les deux paumes à plat sur le pavé, son épée à trois pieds et hors de portée. Il ne tend plus la main vers elle."
      : (a('as_sorgue_desarme')
        ? "Il est debout, au centre, les mains vides, et son épée est de l'autre côté d'une ligne de craie qu'il ne peut pas franchir."
        : (a('as_use') || a('as_hanche_travaille') || a('as_hanche_touchee')
          ? "Il tient encore. Il tient de la façon dont tient un homme qui a compté ses temps et qui n'en a plus : les épaules un peu hautes, la garde un peu basse, et tout le poids sur une jambe qui a fait le travail de deux pendant un quart d'heure."
          : "Il n'a plus de temps et il n'en a pas besoin. Il est au centre, il est entier, et vous êtes celui des deux qui saigne.")),
    () => {
      const n = ETAT.blessures.length;
      if(bord() >= 2) return "Vos talons sont sur la craie. Un pas en arrière — un seul, celui que la jambe prend toute seule — et la cause est jugée en l'état.";
      if(n >= 3) return "Vous portez trois choses qui ne s'en iront pas toutes seules, dans une cour à quatre degrés, et le froid a commencé à faire ce que le froid fait aux gens qui saignent.";
      return "Vous êtes debout au centre d'un cercle de neuf pas et vous avez encore les deux jambes. C'est plus que quarante et un hommes avant vous.";
    },
    "§ Il n'y a pas de quatrième échange dans un duel judiciaire. Il n'y en a jamais eu : le greffier ferme le rôle à la troisième passe.",
    "Sur le seuil, Ancelin Vasque a fini par remettre ses lunettes, ce qui ne sert à rien pour regarder une cour et qui est le geste d'un homme qui veut avoir quelque chose dans les mains.",
    "« Trois », dit Renaud Sorgue.",
  ],
  choix:[
    { t:"Finir",
      detail:"Une cause tombe sur un mort · Force + épées",
      risque:"définitif", definitif:true,
      ferme:"Ferme : toute version de cette nuit où personne ne meurt",
      test:{ carac:'force', comp:'epees', dc:() => 11 - (a('as_sorgue_terre') ? 5 : 0) - (a('as_sorgue_desarme') ? 4 : 0)
                                             - (a('as_use') ? 2 : 0) - (a('as_hanche_touchee') ? 2 : 0),
             adversaire:'sorgue', manoeuvre:'finir', equipement:2 },
      degres:{ dominante:'as_r3_finir_dom', couteuse:'as_r3_finir_cout', echec:'as_r3_finir_ko' } },

    { t:"Le désarmer",
      si:() => !a('as_desarme'),
      detail:"Le règlement le dit à la phrase d'après · personne ne la lit jamais · Agilité + épées",
      risque:"très dangereux",
      test:{ carac:'agilite', comp:'epees', dc:() => 12 - (a('as_use') ? 3 : 0) - (a('as_hanche_touchee') ? 2 : 0),
             adversaire:'sorgue', manoeuvre:'desarmer', equipement:2 },
      degres:{ dominante:'as_r3_desarmer_dom', couteuse:'as_r3_desarmer_cout', echec:'as_r3_finir_ko' } },

    { t:"Lui offrir de céder",
      detail:"Un champion qui cède fait tomber la cause aussi sûrement qu'un champion mort · Présence",
      risque:"calculé",
      test:{ carac:'presence', comp:null, dc:11, adversaire:'sorgue', manoeuvre:'ceder',
             situation:() => (a('as_sorgue_parle') ? 3 : 0) + (a('as_sorgue_terre') || a('as_sorgue_desarme') ? 3 : 0) +
                             (a('as_use') || a('as_hanche_travaille') ? 2 : 0) },
      degres:{ dominante:'as_r3_ceder_dom', couteuse:'as_r3_ceder_cout', echec:'as_r3_ceder_ko' } },
  ],
},

as_r3_finir_dom:{
  qui:'sorgue', melee:true,
  texte:[
    { sobre:"Ça ne prend pas longtemps et il ne se défend pas beaucoup.",
      intense:"Ça ne prend pas longtemps. Il se défend — il se défend correctement, comme il a tout fait correctement pendant trente ans — mais un homme sur une jambe, sans temps, contre un homme de vingt-quatre ans, ça ne se défend pas très longtemps.",
      extreme:"Ça ne prend pas longtemps. Il se défend correctement, comme il a tout fait correctement pendant trente ans, mais un homme sur une jambe et sans temps ne tient pas contre vingt-quatre ans. La pointe entre au-dessus de la clavicule et descend, et il ne tombe pas tout de suite : il reste debout deux secondes en vous tenant l'avant-bras, non pas pour se retenir mais pour vous empêcher de retirer, parce qu'un homme qui a vu quatre morts sait que ce qui fait mal c'est le retrait." },
    "Il s'assied avant de tomber. C'est une chose qu'on ne voit pas souvent et c'est extraordinairement digne : il plie les jambes et il s'assied sur le pavé de sa propre cour, dans son propre rond, et il pose l'épée à côté de lui.",
    "« Quarante et un », dit-il.",
    "« Quarante-deux », dites-vous.",
    "§ « Non. » Il a du sang dans la bouche et il articule quand même, parce qu'il tient à ce point-là à ce qu'on compte juste. « Quarante et un. Vous n'êtes pas le quarante-deuxième. C'est moi. »",
    "Il met quatre minutes. Personne dans cette cour ne dit un mot pendant quatre minutes, et le garçon de l'escorte qui apportait l'eau reste debout à six pas avec le gobelet dans les mains parce qu'il ne sait pas quoi faire d'autre.",
  ],
  effets:{ flags:['as_gagne','as_sorgue_mort'], cout:{ endurance:14, moral:14 },
           exploit:{ eclat:14, temoins:'province', quoi:"vous avez tué le champion judiciaire de Chastel" },
           marque:"Vous avez tué Renaud Sorgue dans le rond, devant toute la vallée.", court:"Sorgue est mort" },
  suite:'as_verdict', libelleSuite:"La cause" },

as_r3_finir_cout:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous finissez. Vous finissez mal, et mal veut dire long.",
    { sobre:"Trois coups au lieu d'un. Il vous ouvre le flanc en tombant.",
      intense:"Il faut trois coups au lieu d'un, parce que le premier ne va pas où il devait et que le deuxième non plus, et parce qu'un homme qui a trente ans de métier meurt en travaillant. Au deuxième, il vous ouvre le flanc gauche sur six pouces — la seule blessure qu'il vous fasse de toute la nuit avec l'intention de la faire.",
      extreme:"Il faut trois coups au lieu d'un : le premier ne va pas où il devait, le deuxième non plus, et un homme avec trente ans de métier meurt en travaillant. Au deuxième il vous ouvre le flanc gauche sur six pouces, jusqu'au muscle, la seule blessure de toute la nuit qu'il vous fasse en voulant vous la faire. Au troisième c'est fini, et ce n'est pas propre, et quarante personnes le voient." },
    "§ Une cour qui a vu quelqu'un mourir vite raconte un duel. Une cour qui a vu quelqu'un mourir lentement raconte autre chose.",
    "Le garçon de l'escorte lâche le gobelet. Il tombe sur le pavé et il roule, longtemps, et c'est le seul bruit.",
  ],
  effets:{ flags:['as_gagne','as_sorgue_mort','as_sale'], cout:{ endurance:18, vitalite:16, moral:18 },
           blessure:{ id:'flanc_as', zone:"Flanc gauche", type:"ouvert sur six pouces",
                      gravite:2, douleur:3, saignement:3, fonction:['force','endurance','agilite'],
                      cicatrice:"six pouces qu'il a voulus, et il avait raison de les vouloir" },
           exploit:{ eclat:14, temoins:'province', quoi:"vous avez tué le champion de Chastel, salement" },
           marque:"Vous avez mis trois coups à tuer Renaud Sorgue, devant toute la vallée.", court:"Trois coups" },
  suite:'as_verdict', libelleSuite:"La cause" },

as_r3_finir_ko:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous entrez pour finir et c'est vous qui êtes fini.",
    { sobre:"Il n'avait plus de temps. Il avait encore trente ans de métier.",
      intense:"Il n'avait plus de temps à demander. Il avait encore trente ans de métier, et trente ans de métier, chez un homme qui ne peut plus bouger, ça devient une seule chose : savoir exactement où vous allez arriver. Il vous prend l'épaule sur l'entrée, la jambe d'appui derrière la vôtre, et le pavé gelé fait le reste.",
      extreme:"Il n'avait plus de temps à demander mais il avait trente ans de métier, et chez un homme qui ne peut plus bouger ça se réduit à une seule chose : savoir où vous allez arriver. L'épaule sur l'entrée, la jambe d'appui derrière la vôtre, et le pavé gelé fait le reste. Vous arrivez sur le dos, la nuque la première, et pendant quatre secondes il n'y a plus rien du tout — ni la cour, ni le froid, ni le nom de l'homme qui vous tient." },
    "Quand ça revient, sa pointe est posée au creux de votre gorge et vous êtes hors du rond de la moitié du corps.",
    "§ Hors du rond. Quarante personnes le voient et il n'y a pas de commissaire au monde qui puisse détourner les yeux de ça.",
    "Il retire la pointe tout de suite. Il ne la laisse pas une seconde de plus qu'il ne faut.",
    "« Trois », dit-il. Et à voix basse, en se redressant, pour vous seul : « Vous avez fait mieux que les quarante et un. Ça ne vaut rien, et je vous le dis quand même. »",
  ],
  effets:{ flags:['as_perdu'], cout:{ endurance:24, vitalite:18, moral:16 },
           blessure:{ id:'nuque', zone:"Nuque", type:"cognée sur le pavé gelé",
                      gravite:2, douleur:2, saignement:0, fonction:['perception','intellect','onde'],
                      cicatrice:"des maux de tête à froid, pour des années" } },
  suite:'as_fin_perdu', libelleSuite:"Le délibéré" },

as_r3_desarmer_dom:{
  qui:'sorgue', melee:true,
  texte:[
    "Il n'y a pas de raison de le tuer. Il n'y en a jamais eu : le règlement dit *ou désarmé*, à la phrase d'après, dans la même ligne, et personne ne la lit parce que personne n'y arrive.",
    { sobre:"Vous lui sortez l'épée de la main et vous l'envoyez par-dessus la craie.",
      intense:"Vous prenez sa lame au fort, vous montez, et vous ouvrez sa main pour lui — parce qu'à ce stade il n'a plus la force de la refermer et que vous le savez tous les deux. L'épée courte passe par-dessus la ligne de craie et s'arrête sur les pavés du dehors.",
      extreme:"Vous prenez sa lame au fort, vous montez, et vous lui ouvrez la main — à ce stade il n'a plus la force de la refermer et vous le savez tous les deux, et il sait que vous le savez, ce qui est la seule chose de toute cette nuit qui l'atteigne vraiment. L'épée passe par-dessus la craie et s'arrête sur les pavés du dehors, à plat, sans un rebond." },
    "Vous ne le touchez pas. Vous reculez d'un pas et vous baissez la pointe.",
    "§ Un homme désarmé dans un rond de neuf pas est un homme qui a perdu. Ça suffit. C'est même écrit.",
    "Renaud Sorgue regarde son arme dehors. Puis il regarde le seuil, où se tient Ancelin Vasque, et il dit — à lui, pas à vous, à voix haute et parfaitement claire pour toute la cour :",
    "« Le champion est désarmé. La cause tombe. »",
    "Un temps.",
    "« Portez-le au rôle, maître Vasque, et portez-le en entier. »",
  ],
  effets:{ flags:['as_gagne','as_sorgue_vivant','as_desarme'], cout:{ endurance:12 },
           exploit:{ eclat:13, temoins:'province', quoi:"vous avez désarmé le champion de Chastel sans le tuer" },
           marque:"Renaud Sorgue a été désarmé et il l'a proclamé lui-même.", court:"Désarmé" },
  suite:'as_verdict', libelleSuite:"La cause" },

as_r3_desarmer_cout:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous sortez l'épée de sa main et vous y laissez deux doigts.",
    { sobre:"Pas les siens. Les vôtres.",
      intense:"Pas les siens : les vôtres. Sa lame vous passe entre l'index et le majeur de la main gauche au moment où vous refermez dessus, et une lame qui passe là ne coupe pas — elle ouvre la commissure jusqu'au poignet et sépare ce qui était ensemble.",
      extreme:"Pas les siens : les vôtres. Sa lame passe entre l'index et le majeur gauches au moment où vous refermez dessus. Une lame qui entre là ne coupe pas : elle ouvre la commissure jusqu'au poignet et sépare ce qui tenait ensemble, proprement, sur toute la longueur, et la main s'ouvre en deux comme un livre avant que vous ayez senti quoi que ce soit." },
    "L'épée sort quand même. Elle franchit la craie.",
    "« Le champion est désarmé », dit Renaud Sorgue au seuil, sans regarder votre main. « La cause tombe. »",
    "§ Il ne regarde pas votre main parce qu'il l'a vue, et parce qu'un homme qui a vendu trente ans de son corps sait exactement ce que ça coûte de le faire remarquer.",
  ],
  effets:{ flags:['as_gagne','as_sorgue_vivant','as_desarme'], cout:{ endurance:14, vitalite:14 },
           blessure:{ id:'main_ouverte', zone:"Main gauche", type:"ouverte de la commissure au poignet",
                      gravite:3, douleur:3, saignement:4, fonction:['lutte','bouclier','epees','jet','furtivite'],
                      cicatrice:"une main qui s'ouvre en deux au repos et qu'on regarde" },
           exploit:{ eclat:13, temoins:'province', quoi:"vous avez désarmé le champion de Chastel en y laissant la main" },
           marque:"Vous avez désarmé Sorgue et vous y avez laissé la main gauche.", court:"La main" },
  suite:'as_verdict', libelleSuite:"La cause" },

as_r3_ceder_dom:{
  qui:'sorgue', melee:true,
  texte:[
    "Vous baissez la pointe. C'est tout ce que vous faites, et dans un rond de neuf pas c'est énorme.",
    "@« Renaud Sorgue. Cédez. »",
    "La cour fait un bruit. Personne n'a jamais entendu ça et pour cause : on ne demande pas à un champion judiciaire de céder, on le tue ou on sort du cercle, et il n'existe pas de troisième colonne au registre.",
    "« Je ne peux pas céder, messire. Un champion qui cède n'est plus un champion. »",
    "« Vous avez quarante et un duels. Vous m'avez dit que vous n'en aviez gagné aucun. »",
    { sobre:"Il ne répond pas tout de suite.",
      intense:"Il ne répond pas tout de suite. Il reste où il est, la garde à mi-hauteur, un homme de quarante-sept ans dans une cour glacée devant quarante personnes qui viennent d'entendre quelque chose qu'elles ne comprennent pas.",
      extreme:"Il ne répond pas tout de suite. Il reste où il est, la garde à mi-hauteur, dans une cour à quatre degrés, devant quarante personnes qui viennent d'entendre une phrase qu'elles ne comprennent pas et une réponse qui n'arrive pas. Sur le seuil, Ancelin Vasque a cessé de faire semblant de regarder ailleurs." },
    "§ « Le jour où je dis non, ils prennent quelqu'un de vingt-cinq ans. » C'est ce qu'il vous a dit au premier temps.",
    "« Ils prendront quelqu'un de vingt-cinq ans », dit-il enfin.",
    "« Ils prendront quelqu'un de vingt-cinq ans quand vous mourrez, Sorgue. Vous ne les en empêchez pas. Vous le retardez, et vous le payez tout seul. »",
    "Il regarde le seuil. Il regarde son garçon d'eau, qui a dix-sept ans. Il regarde le rond.",
    "Puis il pose son épée sur le pavé — pas jetée, posée, la pointe vers lui — et il se redresse, et il dit à Ancelin Vasque, très clairement :",
    "« Le champion cède. La cause tombe. »",
    "« Sorgue. » Vasque a retiré ses lunettes. « Vous savez ce que ça veut dire pour vous. »",
    "« Je le sais depuis trente ans, maître. C'est la première fois qu'on me donne l'occasion de le dire à voix haute. »",
  ],
  effets:{ flags:['as_gagne','as_sorgue_vivant','as_sorgue_cede'], cout:{ endurance:8 },
           exploit:{ eclat:12, temoins:'province', quoi:"le champion de Chastel a cédé, et il l'a dit lui-même" },
           marque:"Renaud Sorgue a cédé dans le rond, à voix haute, devant Chastel.", court:"Il a cédé" },
  suite:'as_verdict', libelleSuite:"La cause" },

as_r3_ceder_cout:{
  qui:'sorgue', melee:true,
  texte:[
    "@« Renaud Sorgue. Cédez. »",
    "« Non. »",
    "Ce n'est pas de l'orgueil : c'est un homme qui a construit trente ans sur une seule règle et à qui l'on demande de la casser dans une cour de province devant un garçon de dix-sept ans qui lui apporte de l'eau.",
    "Il vient. Il vient d'une jambe, mal, et vous n'avez pas remonté la garde parce que vous étiez en train de parler.",
    { sobre:"Vous le désarmez quand même. Ça coûte l'épaule.",
      intense:"Vous le désarmez quand même — il n'a plus de quoi tenir une épée contre un homme qui a vu ce qu'il fait — mais parler avec la pointe basse dans un rond de neuf pas se paie, et ça se paie sur l'épaule droite, à plat, du même coup qu'il donne depuis trente ans.",
      extreme:"Vous le désarmez quand même : il n'a plus de quoi tenir une épée contre quelqu'un qui a vu ce qu'il fait. Mais parler la pointe basse dans neuf pas se paie, et ça se paie sur l'épaule droite, à plat, du coup qu'il donne depuis trente ans — celui qui ne casse rien, qui n'ouvre rien, et après lequel un bras met quatre mois à remonter au-dessus de l'horizontale." },
    "« Le champion est désarmé », dit-il au seuil, essoufflé, sans une once de rancune. « La cause tombe. »",
    "§ Il a refusé de céder et il a proclamé sa propre défaite d'une voix parfaitement claire. Il n'y a aucune contradiction là-dedans, et vous mettrez des années à comprendre pourquoi.",
  ],
  effets:{ flags:['as_gagne','as_sorgue_vivant','as_desarme'], cout:{ endurance:16, vitalite:8 },
           blessure:{ id:'epaule_as', zone:"Épaule droite", type:"frappée à plat, de tout le poids",
                      gravite:2, douleur:3, saignement:0, fonction:['force','epees','armes_lourdes','jet'],
                      cicatrice:"quatre mois avant de repasser l'horizontale" },
           exploit:{ eclat:12, temoins:'province', quoi:"le champion de Chastel a été désarmé et l'a proclamé" },
           marque:"Sorgue a refusé de céder, et il a proclamé lui-même sa défaite.", court:"Il a refusé" },
  suite:'as_verdict', libelleSuite:"La cause" },

as_r3_ceder_ko:{
  qui:'sorgue', melee:true,
  texte:[
    "@« Renaud Sorgue. Cédez. »",
    "Il ne répond pas et il ne s'arrête pas, et vous comprenez trop tard ce que vous venez de faire : vous avez parlé, la pointe basse, à trois pas d'un homme qui compte, dans le troisième échange d'un duel judiciaire.",
    { sobre:"Il ne vous tue pas. Il fait mieux.",
      intense:"Il ne vous tue pas — quatre morts en trente ans, il ne cherche pas le cinquième. Il fait mieux : il vous prend l'épaule d'un coup à plat, il passe la jambe, et il vous met **dehors**. Pas au sol : dehors. Deux pieds de l'autre côté de la craie, debout, intact, et parfaitement visible de toute la cour.",
      extreme:"Il ne vous tue pas : quatre morts en trente ans, il ne cherche pas le cinquième. Il fait mieux. Un coup à plat sur l'épaule, la jambe passée derrière, et vous êtes **dehors** — pas au sol : debout, intact, les deux pieds sur le pavé nu de l'autre côté de la ligne, parfaitement visible des quarante personnes de cette cour et du commissaire sur le seuil, qui cette fois ne détourne pas les yeux." },
    "§ « Quiconque met un pied hors du rond est réputé s'être retiré, et la cause est jugée en l'état. »",
    "« Trois », dit Renaud Sorgue, et pour la première fois de la nuit il a l'air fatigué de lui-même.",
  ],
  effets:{ flags:['as_perdu','as_sorti'], cout:{ endurance:14, moral:14 } },
  suite:'as_fin_perdu', libelleSuite:"Le délibéré" },

/* ── Sortir du rond ──────────────────────────────────────────────────────── */
as_forfait:{
  qui:'sorgue',
  titre:"La craie",
  texte:[
    "Ça ne se décide pas. C'est même toute la cruauté de la chose : personne ne décide jamais de sortir d'un rond.",
    { sobre:"Le pied part en arrière tout seul, et il se pose sur du pavé nu.",
      intense:"Le pied part en arrière tout seul, comme il part chez tout le monde, et il ne rencontre pas la craie : il rencontre le pavé nu du dehors, et cette différence de texture sous une semelle est la sensation la plus violente de toute cette nuit.",
      extreme:"Le pied part tout seul, comme chez tout le monde, et il ne rencontre pas la craie : il rencontre le pavé nu, le sable, le froid du dehors. Cette différence de texture sous une semelle — trois quarts de seconde — est la sensation la plus violente de la nuit, plus que n'importe quelle lame, parce qu'elle arrive avec la totalité de ce qu'elle veut dire." },
    "Renaud Sorgue baisse son épée immédiatement. Il ne frappe pas un homme qui est sorti : ce serait de la barbarie, et il n'est pas barbare, il est employé.",
    "« Le requérant s'est retiré », lit le greffier depuis le seuil, sans lever la tête. « La cause est jugée en l'état. »",
    "§ En l'état. Deux mots. Ils viennent d'être prononcés par un homme de soixante ans qui n'a pas voulu les prononcer.",
  ],
  effets:{ flags:['as_perdu','as_sorti'], cout:{ moral:20 } },
  suite:'as_fin_perdu', libelleSuite:"Le délibéré" },

};
Object.assign(ASSISE, ASSISE_7);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 8 — LE RÔLE, LE NOM, ET CE QUI SE FERME
 * ══════════════════════════════════════════════════════════════════════════ */
const ASSISE_8 = {

as_verdict:{
  qui:'vasque',
  lieu:"La cour du Héron · la craie à moitié effacée",
  titre:"« La cause tombe »",
  texte:[
    "Ancelin Vasque descend les deux marches du seuil et entre dans la cour, ce qu'un commissaire aux titres ne fait jamais, et il vient jusqu'au bord du rond.",
    "Il regarde la craie. Elle est effacée sur les trois quarts : un quart d'heure de pieds sur du pavé mouillé, et il ne reste plus qu'un arc de cercle blanc du côté de l'écurie.",
    () => a('as_sorgue_mort')
      ? "Il regarde ensuite Renaud Sorgue, assis contre le pavé, et il le regarde longtemps. Il ne dit rien à personne pendant ce temps-là. Un homme qui a employé un autre homme pendant trente ans n'a pas de formule pour ça, et Chastel n'en a pas prévu."
      : "Il regarde ensuite Renaud Sorgue, debout ou à genoux, désarmé, vivant. Il ne dit rien à personne pendant plusieurs secondes.",
    "Puis il se tourne vers le seuil.",
    "« Portez : le champion de l'assise a été défait dans les formes. La cause tombe. »",
    { sobre:"La cour explose. Pas de joie — de bruit.",
      intense:"La cour ne crie pas tout de suite : elle met deux secondes, comme les salles mettent toujours deux secondes, et ensuite elle fait un bruit qui n'est pas de la joie. C'est le bruit de quarante personnes qui viennent de voir une chose arriver alors qu'elles savaient depuis toujours que cette chose n'arrivait pas.",
      extreme:"La cour met deux secondes, comme les salles mettent toujours deux secondes, et le bruit qu'elle fait ensuite n'est pas de la joie. C'est celui de quarante personnes qui viennent de voir arriver une chose dont elles savaient depuis toujours qu'elle n'arrivait pas. Deux femmes pleurent. Un homme frappe le mur de l'écurie du plat de la main, plusieurs fois, sans raison." },
    () => {
      const id = accuse().id;
      if(id === 'loys') return "On détache Loys dans la salle basse et on le rend à sa mère dans le couloir de service, entre deux hommes en gris qui ne savent plus très bien ce qu'ils gardent. Il a quinze ans. Il ne comprendra ce qui s'est passé cette nuit que dans dix ans, et il le comprendra d'un coup, et ça décidera du reste de sa vie.";
      if(id === 'clerc') return "Le clerc est relevé sur-le-champ. Il reste assis sur son tabouret pendant qu'on le lui annonce, en robe de fonction, et il met un temps déraisonnable à comprendre qu'il peut se lever. Il retournera à Chastel au printemps et il y lira des relevés pendant quarante ans, en portant chaque fois qu'il le faudra la formule qui l'a mis sur ce tabouret.";
      if(id === 'tailleur') return "Le tailleur de pierre est relâché sans peine. La pierre, elle, reste saisie : elle repart à Chastel dans le deuxième chariot, avec le répertoire, cotée et numérotée à la craie. Vous ne la reverrez pas de votre vivant.";
      if(id === 'amaury') return "Amaury de Valombre est relâché sans peine et sans un mot. Il ne vous remercie pas. Il traverse la cour, il prend un cheval qui n'est pas le sien à l'écurie du Héron, et il quitte cette vallée dans la nuit, en hiver, par un col fermé — ce qui est soit du courage, soit la seule chose qui lui restait.";
      if(id === 'gassien') return "Gassien le Lièvre est relâché sur le deuxième chef. Il garde une amende, deux mules et son cou. Il vous serre l'avant-bras à l'ancienne, dans la cour, devant tout le monde, et cette poignée de main publique vous coûtera plus cher dans dix ans que tout ce qui s'est passé dans ce rond.";
      return "Le sergent d'étape est rétabli dans ses fonctions. Il remonte à son poste le lendemain, à pied, dans la neige, et il rouvre son registre. Il portera onze à quarante lignes par semaine pendant encore huit ans, et il n'écrira plus jamais un nom sans se demander qui le relira.";
    },
    "§ Il reste une formalité. Une seule, et c'est celle-là qui décide de l'Acte II.",
    "Ancelin Vasque fait signe au greffier de descendre avec le rôle.",
    "« Il me faut vous inscrire, messire. On n'a jamais défait un champion d'assise sans que ce soit porté. »",
  ],
  effets:{ flags:['as_cause_tombee'] },
  suite:'as_rôle', libelleSuite:"« Sous quel nom ? »" },

/* ── Le rôle ─────────────────────────────────────────────────────────────── */
as_rôle:{
  qui:'vasque',
  titre:"« Sous quel nom ? »",
  texte:[
    "Le greffier tient le rôle ouvert sur son avant-bras, la plume prête, et il ne lève pas les yeux — pas par déférence : parce qu'un greffier qui lève les yeux à ce moment-là influence une réponse, et qu'il a dix-neuf ans de métier.",
    { sobre:"Quarante personnes attendent. C'est très silencieux.",
      intense:"Quarante personnes attendent dans une cour glacée, et il faut avoir vécu ça pour savoir à quel point quarante personnes qui attendent une réponse font peu de bruit. On entend la plume. On entend le pavé.",
      extreme:"Quarante personnes attendent dans une cour à quatre degrés, et il faut l'avoir vécu pour savoir combien quarante personnes qui attendent une réponse font peu de bruit. On entend la plume contre l'encrier. On entend le grésil sur la toile des chariots. On entend, dans la salle basse, quelqu'un déplacer un banc, et ce bruit-là paraît obscène." },
    "§ Dix-neuf ans. Onze ans à porter un faux nom sur les registres d'étape, huit avant ça à n'en porter aucun.",
    "Et une phrase, maintenant, dans une cour de Cendrepont, devant un commissaire aux titres de Chastel, un greffier qui a lu le volume cent-quarante-trois, et toute une vallée.",
  ],
  choix:[
    { t:"« Perrin de Saulx. »",
      detail:"Un faux nom · assez banal pour ne rien dire · vous repartez comme vous êtes venu",
      ferme:"Ferme : tout ce que cette nuit pouvait valoir",
      risque:"prudent", definitif:true, va:'as_fin_anonyme',
      effets:{ flags:['as_faux_nom'] } },

    { t:"« Yohan. »",
      detail:"Un prénom. Pas de maison, pas de titre, pas de particule.",
      risque:"calculé", definitif:true, va:'as_fin_yohan',
      effets:{ flags:['as_prenom'] } },

    { t:"@« Yohan de Karlsberg. »",
      detail:"Le nom entier · devant le répertoire général de la province",
      ferme:"Ferme : dix-neuf ans passés à n'être personne",
      risque:"définitif", definitif:true, va:'as_fin_nom',
      effets:{ flags:['as_nom_donne'] } },

    { t:"Ne rien répondre",
      detail:"Un silence se porte au rôle comme le reste · et il se lit aussi bien",
      risque:"dangereux", definitif:true, va:'as_fin_silence',
      effets:{ flags:['as_silence_rôle'] } },
  ],
},

/* ── La contestation en héritier ─────────────────────────────────────────── */
as_nom_dom:{
  qui:'vasque',
  titre:"« Je la conteste comme héritier »",
  texte:[
    "@« Je conteste la cause. »",
    "« Sur quel fondement ? »",
    "« Sur celui-ci : la contradiction est ouverte à la maison intéressée. »",
    { sobre:"Vasque repose la pièce. Très lentement.",
      intense:"Ancelin Vasque repose la pièce sur la table, très lentement, et il retire ses lunettes de la main gauche sans quitter votre visage des yeux — ce qui, chez un homme qui ne fait rien d'inutile, est le geste le plus violent dont il dispose.",
      extreme:"Ancelin Vasque repose la pièce, très lentement, et retire ses lunettes de la main gauche sans quitter votre visage. Chez un homme qui ne fait rien d'inutile, c'est le geste le plus violent dont il dispose. Le greffier, lui, n'a pas bougé du tout — mais sa plume s'est arrêtée à un quart de pouce du papier et elle y reste, et une goutte d'encre finit par tomber sur le rôle et s'y étaler." },
    "« La maison intéressée est éteinte. »",
    "« La maison intéressée est **raturée**. Vous l'avez dit vous-même, dans une arrière-cuisine, il y a deux heures : en travers, à l'encre, dans une main qui n'est pas celle du volume, et sans ordonnance jointe. »",
    "Silence.",
    "@« Volume cent-quarante-trois, section des titres éteints. La gorge de Cendrepont, le gué, le droit de passage et le quart du sel. »",
    "§ Il y a un moment, dans certaines vies, où l'on entend sa propre voix dire une chose et où l'on sait qu'on ne la reprendra pas.",
    "@« Yohan de Karlsberg. »",
    { sobre:"La salle ne fait aucun bruit. Personne ne sait ce que ce nom veut dire.",
      intense:"La salle ne fait aucun bruit, et c'est ce qui est extraordinaire : sur quarante personnes debout dans cette pièce, il y en a peut-être trois qui savent ce que ce nom veut dire. Les autres attendent poliment la suite d'une phrase.",
      extreme:"La salle ne fait aucun bruit. Sur quarante personnes debout, trois peut-être savent ce que ce nom veut dire ; les autres attendent poliment la suite d'une phrase. C'est ça, dix-neuf ans de travail d'effacement bien fait : on peut prononcer le nom d'une maison de sept cents personnes dans une salle pleine, dans sa propre vallée, et n'être compris de personne." },
    "Les trois qui savent : le greffier, qui a lu le volume. Vasque, qui le cherche depuis onze ans.",
    "Et, contre le mur du fond, un homme de quarante-sept ans qui vient de décoller l'épaule de la pierre et qui ne bougera plus du reste de la soirée.",
    "Vasque remet ses lunettes. Ses mains sont parfaitement stables et sa voix n'a pas monté d'un demi-ton.",
    "« Greffier. Portez : contradiction soulevée par la partie intéressée, sur la validité de l'inscription au volume cent-quarante-trois. La cause est renvoyée. »",
    "Puis, à vous, presque doucement :",
    "« Vous venez de faire une chose que je cherche depuis onze ans, messire, et vous l'avez faite de la pire façon possible. Il va falloir que vous restiez en vie six mois. »",
  ],
  effets:{ flags:['as_nom_donne','as_loi_gagnee','as_cause_renvoyee','as_vasque_allie'],
           suspicion:45,
           exploit:{ eclat:22, temoins:'province', quoi:"vous avez dit votre nom entier devant une assise de Chastel" },
           marque:"Vous avez dit « Yohan de Karlsberg » devant le commissaire aux titres et son greffier.",
           court:"Le nom entier" },
  suite:'as_fin_nom', libelleSuite:"Ce qui commence" },

as_nom_cout:{
  qui:'vasque',
  texte:[
    "« Je conteste la cause. Comme héritier. »",
    "Vous le dites trop tôt — avant le fondement, avant la cote, avant tout ce qui aurait fait de cette phrase un acte de procédure plutôt qu'une déclaration.",
    "« Héritier de quoi, messire ? »",
    "« De la maison Karlsberg. »",
    { sobre:"Quelqu'un rit. Ça part au fond et ça se propage.",
      intense:"Quelqu'un rit. Ça part au fond, sur deux ou trois personnes, et ça se propage à la moitié de la salle en quatre secondes — pas de la méchanceté : du soulagement. Une soirée d'assise est très longue et un fou qui se lève est exactement ce qu'il faut.",
      extreme:"Quelqu'un rit. Ça part au fond, sur deux ou trois, et ça gagne la moitié de la salle en quatre secondes. Ce n'est pas de la méchanceté, c'est du soulagement : une soirée d'assise est très longue, et un homme qui se lève pour réclamer une maison dont personne n'a entendu parler est exactement ce qu'il fallait. Une femme, près de la cheminée, dit assez fort pour qu'on l'entende : « Et moi je suis la reine des Astrah. »" },
    "Vasque ne rit pas. Vasque ne rit pas du tout, et il lui faut trois secondes pour obtenir le silence en levant simplement la main.",
    "« Le rire est une réponse de salle. Ce n'en est pas une de droit. »",
    "Il vous regarde longtemps.",
    "« Vous ne savez pas comment on soulève une contradiction. Vous savez ce que vous êtes. Ce ne sont pas les mêmes savoirs et il vous manque le premier. »",
    "§ « Je vais donc vous poser la seule question qui puisse encore servir à quelque chose ce soir : où est la pièce ? »",
    "Vous n'avez pas de pièce. Vous avez une falaise, une borne, un loup sous quarante ans de fiente, et un souvenir de bague.",
    "« Alors la cause suit son cours », dit-il. « Et vous, messire, vous venez de faire entrer votre nom au rôle d'une assise de Chastel sans rien pour l'étayer. »",
    "Il se tourne vers le greffier.",
    "« Portez-le quand même. Portez-le exactement. »",
  ],
  effets:{ flags:['as_nom_donne','as_nom_nu','as_loi_ratee'], suspicion:50,
           exploit:{ eclat:16, temoins:'province', quoi:"vous avez réclamé une maison rayée sans une pièce" },
           marque:"Vous avez dit votre nom devant l'assise, sans une seule pièce pour l'étayer.",
           court:"Sans pièce" },
  suite:'as_rond_ouverture', libelleSuite:"Il reste le rond" },

as_nom_ko:{
  qui:'vasque',
  texte:[
    "Vous vous levez, et le nom ne sort pas.",
    { sobre:"Dix-neuf ans d'habitude sont plus forts qu'une décision.",
      intense:"Dix-neuf ans d'habitude sont plus forts qu'une décision prise il y a onze secondes. La bouche s'ouvre, l'air part, et ce qui arrive est ce qui arrive depuis dix-neuf ans à chaque fois qu'on demande un nom : rien du tout.",
      extreme:"Dix-neuf ans d'habitude sont plus forts qu'une décision prise onze secondes plus tôt. La bouche s'ouvre, l'air part, et il arrive ce qui arrive depuis dix-neuf ans chaque fois qu'on demande un nom : rien. Le corps a été dressé à ça — par un homme qui vous cachait, dans une remise, quand vous aviez seize ans, et qui vous a fait répéter trois nuits — et le corps obéit à ce dressage-là avant d'obéir à vous." },
    "« Messire ? »",
    "« … Je conteste la cause. »",
    "« À quel titre ? »",
    "Rien.",
    "§ Vasque attend. Il attend vraiment, longtemps, plus longtemps que la procédure ne l'exige, et c'est la chose la plus généreuse qu'il fasse de la soirée.",
    "« Un particulier ne conteste pas une cause de titres », dit-il enfin, à regret. « Il n'a pas qualité. »",
    "Contre le mur du fond, Renaud Sorgue décolle l'épaule de la pierre.",
  ],
  effets:{ flags:['as_nom_rate'], cout:{ moral:14 },
           marque:"Vous vous êtes levé et le nom n'est pas sorti.", court:"Rien n'est sorti" },
  suite:'as_rond_ouverture', libelleSuite:"Le rond" },

};
Object.assign(ASSISE, ASSISE_8);

/* ══════════════════════════════════════════════════════════════════════════
 * PARTIE 9 — L'ONDE, ET CE QUI SE FERME
 * ══════════════════════════════════════════════════════════════════════════ */
const ASSISE_9 = {

as_onde_dom:{
  titre:"Onze chandelles",
  texte:[
    "Il n'y a pas de raison de faire ça. C'est important de le noter tout de suite : il y avait deux autres portes dans cette salle et vous prenez celle-ci.",
    "Vous vous levez, vous ouvrez la main, et vous cessez de retenir dans une pièce de vingt pieds sur trente contenant quarante personnes, un commissaire aux titres, un greffier, et deux chariots de répertoire général garés dans la cour.",
    { sobre:"Les onze chandelles s'éteignent en même temps. Rien d'autre ne bouge.",
      intense:"Les onze chandelles s'éteignent en même temps — pas soufflées : arrêtées, comme on arrête une horloge. La table de trois cents livres recule de deux pieds sur le plancher avec un raclement qui dure une seconde entière. Et personne n'est touché. Personne. C'est ça qui rend la chose insupportable pour ceux qui la voient : il ne se passe rien de violent, il se passe quelque chose d'impossible.",
      extreme:"Les onze chandelles s'éteignent en même temps — pas soufflées : arrêtées, comme une horloge. La table de trois cents livres recule de deux pieds avec un raclement d'une seconde entière. Les pièces du dossier se lèvent de six pouces au-dessus du bois et redescendent. Le feu de la cheminée se couche à l'horizontale et se redresse. Et personne n'est touché — personne — et c'est ça qui est insupportable pour ceux qui regardent : il ne se passe rien de violent, il se passe quelque chose d'impossible, dans une salle basse d'auberge, un mardi de décembre." },
    "§ Il fait complètement noir pendant quatre secondes. C'est le seul cadeau que la soirée fasse à quiconque.",
    "Quand on rallume, personne n'a bougé de sa place. Quarante personnes debout contre les murs d'une salle basse, immobiles, dans le noir, pendant quatre secondes — et pas une n'a bougé, parce que bouger aurait voulu dire admettre que c'était arrivé.",
    "Ancelin Vasque est resté assis. Il a les deux mains à plat sur la table, il regarde le vide devant lui, et il dit — à personne, d'une voix parfaitement égale :",
    "« Ah. »",
    "Un temps.",
    "« Greffier. Ne portez pas. »",
    "« Maître— »",
    "« **Ne portez pas.** »",
    "§ Un commissaire aux titres vient d'ordonner de ne pas consigner. Onze ans qu'il cherche qui a raturé une ligne sans ordonnance, et il vient de faire la même chose en trois mots.",
    "Il se lève, il ramasse ses lunettes, et il prononce la formule de renvoi sans regarder personne. La cause est renvoyée. L'accusé sort libre avant minuit.",
    "Et quarante personnes rentrent chez elles dans la neige avec, dans le crâne, quelque chose dont elles ne parleront pas ce soir, ni demain, mais dont l'une d'elles parlera dans six semaines, à Chastel, dans une autre pièce, à quelqu'un dont c'est le métier d'écouter ce genre de chose.",
  ],
  effets:{ flags:['as_onde_salle','as_cause_renvoyee','as_gagne'], cout:{ endurance:20, concentration:20 },
           exploit:{ eclat:20, suspicion:60, temoins:'province',
                     quoi:"onze chandelles se sont arrêtées en même temps dans une salle d'assise" },
           marque:"Vous avez employé l'Onde devant l'assise de Chastel. Vasque a ordonné de ne pas consigner.",
           court:"Ne portez pas" },
  suite:'as_fin_onde', libelleSuite:"Ce qui commence" },

as_onde_cout:{
  titre:"Ce qui déborde",
  texte:[
    "Vous ouvrez la main dans une pièce de vingt pieds sur trente contenant quarante personnes, et vous découvrez la seule chose qui distingue une salle basse d'un gué de montagne : les murs.",
    { sobre:"Ça part et ça rebondit. Il y a des gens partout.",
      intense:"Ça part, et ça ne s'en va nulle part : ça rebondit. Les onze chandelles s'éteignent, la table part en arrière et prend deux hommes contre le mur, le manteau de cheminée descend de trois pouces avec toute la suie de quarante ans, et une poutre du plancher haut se fend sur sa longueur avec un bruit de fusil.",
      extreme:"Ça part et ça ne s'en va nulle part : ça rebondit. Les onze chandelles s'éteignent, la table de trois cents livres part en arrière et prend deux hommes contre le mur — l'un des deux hurle et n'arrête pas —, le manteau de cheminée descend de trois pouces en lâchant quarante ans de suie, et une poutre du plancher haut se fend sur toute sa longueur avec un bruit de fusil. Une femme de soixante ans est jetée contre l'angle du bar et ne se relève pas seule." },
    "Vous êtes à genoux, le nez et les oreilles en sang, dans le noir, au milieu d'une pièce où quarante personnes hurlent en même temps.",
    "§ Ils fuient. C'est le mot exact. Quarante personnes tentent de sortir en même temps par une porte de trois pieds et personne ne meurt uniquement parce que le battant a cédé.",
    "Quand la lumière revient, il reste six personnes dans la salle : deux blessés, le greffier, l'accusé sur son tabouret, Renaud Sorgue debout au fond, et Ancelin Vasque assis, la robe grise couverte de suie, qui n'a pas bougé d'un pouce.",
    "Il vous regarde à genoux et il dit, sans la moindre hostilité, ce qui est cent fois pire que n'importe quelle menace :",
    "« Vous n'aviez pas besoin de faire ça. J'aurais renvoyé la cause. Il fallait une pièce et une phrase. »",
    "Un temps.",
    "« Maintenant il me faut un rapport. »",
  ],
  effets:{ flags:['as_onde_salle','as_onde_deborde','as_cause_renvoyee','as_gagne','as_vasque_rapport'],
           cout:{ endurance:30, concentration:35, vitalite:12, moral:16 },
           exploit:{ eclat:20, suspicion:75, temoins:'province',
                     quoi:"une salle d'assise a été retournée sans que personne soit touché" },
           marque:"Vous avez retourné la salle basse du Héron. Vasque doit écrire un rapport.",
           court:"Le rapport" },
  suite:'as_fin_onde', libelleSuite:"Ce qui commence" },

as_onde_ko:{
  texte:[
    "Vous vous levez, vous ouvrez la main, et il ne se passe rien.",
    "Rien du tout. Vous êtes un homme debout au milieu d'une salle basse, la main tendue vers une table, devant quarante personnes qui attendent poliment que vous disiez quelque chose.",
    { sobre:"On ne prend pas cette chose-là sur commande. Jamais.",
      intense:"On ne prend pas cette chose-là sur commande. Il faut la place, le temps, et un endroit dans le crâne où l'on est seul — et il n'y a aucun des trois dans une pièce de vingt pieds sur trente contenant quarante personnes qui vous regardent.",
      extreme:"On ne prend pas cette chose sur commande. Il faut la place, le temps, et un endroit dans le crâne où l'on est seul, et il n'y a aucun des trois dans une salle de vingt pieds contenant quarante personnes qui vous regardent. Vous restez la main ouverte pendant trois secondes de trop, ce qui, dans une pièce silencieuse, est une éternité mesurable et publique." },
    "« Vous vouliez dire quelque chose, messire ? »",
    "Vasque est poli. Il est même bienveillant, ce qui achève de tout ruiner.",
    "§ Quarante personnes viennent de voir un homme se lever pour rien. Ça ne coûte pas la vie. Ça coûte autre chose.",
    "Vous vous rasseyez. Contre le mur du fond, Renaud Sorgue n'a pas décollé l'épaule de la pierre : il n'y a pas de raison, il ne s'est rien passé.",
  ],
  effets:{ cout:{ concentration:35, moral:16 },
           marque:"Vous vous êtes levé au milieu de l'assise, la main ouverte, et rien n'est venu.",
           court:"Rien n'est venu" },
  suite:'as_moment', libelleSuite:"Il reste les autres portes" },

/* ══════════════════════════════════════════════════════════════════════════
 * LES ISSUES DE L'ACTE I
 * ══════════════════════════════════════════════════════════════════════════ */

as_fin_nom:{
  lieu:"Cendrepont · la nuit · vingtième année après la Purge",
  titre:"Ce qui est écrit",
  texte:[
    "Le greffier écrit *Yohan de Karlsberg* sur le rôle de l'assise d'hiver de Cendrepont, à la ligne quatorze, d'une écriture qu'il tient depuis dix-neuf ans et qui ne tremble pas.",
    { sobre:"Un rôle d'assise se recopie en trois exemplaires.",
      intense:"Un rôle d'assise se recopie en trois exemplaires : un pour le bourg, un pour la province, un pour le répertoire général. Les trois partent au printemps par trois routes différentes, ce qui est une précaution vieille de deux cents ans et parfaitement raisonnable.",
      extreme:"Un rôle d'assise se recopie en trois exemplaires : le bourg, la province, le répertoire général. Ils partent au printemps par trois routes différentes — précaution vieille de deux cents ans, parfaitement raisonnable, et absolument impossible à défaire. Il faudrait brûler trois bâtiments dans trois villes, et même là il resterait la mémoire de quarante personnes." },
    "§ Dix-neuf ans à n'être personne, effacés par onze syllabes dans une cour de province, un mardi de décembre.",
    "Vous passez l'hiver à Cendrepont, parce que le col est fermé et qu'il n'y a nulle part où aller. Quatre mois. On vous salue dans la rue.",
    () => a('as_sorgue_mort')
      ? "On enterre Renaud Sorgue le surlendemain, dans le cimetière du bourg, parce qu'on ne remonte pas un corps à Chastel en décembre. Il y a onze personnes. Le garçon qui lui apportait l'eau est l'une des onze, et il repart avec l'épée courte, que personne ne lui a donnée et que personne ne lui réclame."
      : "Renaud Sorgue quitte le service de Chastel avant le printemps. Un champion défait n'est plus un champion : c'est écrit dans la même ligne du même règlement. Il a quarante-sept ans, une hanche morte, trente ans de service et aucune pension, parce que le règlement ne prévoyait pas qu'il perde un jour.",
    () => a('as_vasque_allie')
      ? "Ancelin Vasque repart à Chastel au printemps avec deux chariots de registres, un rôle en trois exemplaires, et une contradiction soulevée sur le volume cent-quarante-trois qu'il va devoir instruire lui-même. Il vous a dit de rester en vie six mois. Ce n'était pas une menace ; c'était un délai de procédure, et c'est infiniment plus inquiétant."
      : "Ancelin Vasque repart à Chastel au printemps. Il a onze ans de recherche sur une ligne raturée, et il a désormais un nom à mettre en face. Ce qu'il en fera dépend d'un homme que vous avez rencontré deux heures et que vous n'avez pas eu le temps de comprendre.",
  ],
  issue:"Fin de l'Acte I",
  bilan:"Le nom est écrit à la ligne quatorze, en trois exemplaires",
  apres:[
    () => `Vous finissez cet acte avec ${ETAT.or} couronnes, ${ETAT.blessures.length} blessure${ETAT.blessures.length > 1 ? 's' : ''}, ${ETAT.faits.length} choses au journal qui ne se reprennent pas, et un nom dans un répertoire.`,
    "Ce n'est pas une victoire. C'est un changement de nature du problème : jusqu'à ce soir, vous étiez un homme que personne ne cherchait. À partir de ce soir, vous êtes une inscription contestée dans le répertoire général d'une province.",
    "Les inscriptions contestées, on les instruit. Et on les tranche.",
  ],
  plusTard:"L'Acte II — Le Dernier Karlsberg — s'ouvre à la fonte des neiges, sur trois cavaliers qui remontent la Route Grise et qui n'ont pas de contrat à proposer.",
},

as_fin_yohan:{
  lieu:"Cendrepont · la nuit",
  titre:"Un prénom",
  texte:[
    "« Yohan. »",
    "« Yohan de quoi, messire ? »",
    "« Yohan. »",
    { sobre:"Le greffier écrit. Vasque ne dit rien.",
      intense:"Le greffier écrit *Yohan, homme d'armes, sans maison* et il ne lève pas les yeux. Vasque ne dit rien du tout — il n'a pas à dire quelque chose : un rôle enregistre ce qu'on déclare, et personne n'est tenu de déclarer une maison qu'il n'a pas.",
      extreme:"Le greffier écrit *Yohan, homme d'armes, sans maison*, et il ne lève pas les yeux. Vasque ne dit rien : un rôle enregistre ce qu'on déclare et nul n'est tenu de déclarer une maison qu'il n'a pas. Mais il remet ses lunettes pour lire ce que le greffier vient d'écrire, ce qu'il n'a fait pour aucune autre ligne de la soirée." },
    "§ C'est la réponse la plus dangereuse des quatre, et c'est parce qu'elle a l'air d'être la moyenne.",
    "Un faux nom est un mur. Le nom entier est une déclaration. Un prénom seul, dans un rôle d'assise, en face de « a défait le champion », est une **question** — et Chastel est une administration : elle ne laisse pas de questions ouvertes dans ses registres. Elle les instruit.",
    "Vous passez l'hiver à Cendrepont. Au printemps, un clerc que vous ne verrez jamais recopiera cette ligne à Chastel, s'arrêtera dessus, et écrira en marge la formule que les clercs écrivent dans ces cas-là :",
    "*maison non déclarée — à vérifier.*",
  ],
  issue:"Fin de l'Acte I",
  bilan:"Un prénom seul dans un rôle d'assise, et une marge à vérifier",
  apres:[
    () => `Vous finissez avec ${ETAT.or} couronnes, ${ETAT.blessures.length} blessure${ETAT.blessures.length > 1 ? 's' : ''}, et le rang que la province vous donne : « ${rangActuel().cri} ».`,
    "Vous n'avez pas menti et vous n'avez pas dit. C'est la position la plus honnête de la soirée et c'est aussi celle qui laisse le plus de travail aux autres.",
    "Ils le feront. C'est leur métier, ils ont trois cent quarante volumes, et ils ont tout l'hiver.",
  ],
  plusTard:"L'Acte II s'ouvre le jour où quelqu'un remonte la Route Grise avec une copie de ce rôle et une question à poser.",
},

as_fin_anonyme:{
  lieu:"Cendrepont · la nuit",
  titre:"Perrin de Saulx",
  texte:[
    "« Perrin de Saulx. »",
    "Le greffier écrit. C'est un bon faux nom : assez banal pour ne rien dire, assez précis pour ne pas sonner faux, et vous le portez depuis onze ans sur tous les registres d'étape de quatre provinces.",
    { sobre:"Vasque ne le croit pas une seconde. Il ne dit rien.",
      intense:"Ancelin Vasque ne le croit pas une seconde et il ne dit rien, parce qu'un rôle enregistre ce qu'on déclare et qu'il n'existe pas de procédure pour dire à un homme qu'il ment sur son propre nom devant quarante témoins.",
      extreme:"Ancelin Vasque ne le croit pas une seconde et il ne dit rien : un rôle enregistre ce qu'on déclare, et il n'existe aucune procédure permettant de dire à un homme qu'il ment sur son nom devant quarante témoins. Il vous regarde pendant que le greffier écrit, et son regard n'a rien d'hostile — c'est celui d'un homme qui range une information dans un tiroir dont il connaît le numéro." },
    "§ Toute la province a vu ce que vous avez fait cette nuit. Personne ne sait à qui l'attribuer.",
    "C'est un exploit rare et c'est un très mauvais placement. Le renom sans le nom ne se garde pas : dans six mois, l'histoire circulera avec un blanc au milieu, et les blancs se remplissent tout seuls — de faux, en général, et parfois de vrai.",
    "Vous passez l'hiver à Cendrepont. On vous salue dans la rue et on vous appelle *messire de Saulx*, et vous répondez, et chaque fois ça coûte une seconde de plus qu'il n'en faudrait.",
    "Au printemps, vous descendez la Route Grise. Personne ne vous cherche.",
  ],
  issue:"Fin de l'Acte I",
  bilan:"La province a vu, et la province ne sait pas qui",
  apres:[
    () => `${ETAT.or} couronnes, ${ETAT.blessures.length} blessure${ETAT.blessures.length > 1 ? 's' : ''}, et un faux nom sur un rôle d'assise.`,
    "Vous êtes vivant, personne ne vous cherche, et vous avez fait cette nuit la seule chose de votre vie qui aurait mérité d'être signée.",
    "C'est un choix. Il tient. Il a même tenu dix-neuf ans.",
  ],
  plusTard:"L'Acte II s'ouvre sur la question qu'il faudra bien finir par trancher : à quoi sert de faire des choses que personne ne peut vous attribuer ?",
},

as_fin_silence:{
  lieu:"Cendrepont · la nuit",
  titre:"Ce qu'on porte quand on ne répond pas",
  texte:[
    "Vous ne répondez pas.",
    "Le greffier attend, la plume prête, et il attend longtemps parce qu'un greffier n'interrompt jamais un silence : c'est le seul pouvoir qu'il ait et il l'exerce rarement.",
    { sobre:"Vasque finit par dicter lui-même.",
      intense:"Ancelin Vasque finit par dicter lui-même, à voix parfaitement neutre, et ce qu'il dicte vous apprend en une phrase tout ce que vous n'aviez pas compris de lui en une soirée.",
      extreme:"Ancelin Vasque finit par dicter lui-même, d'une voix neutre, et ce qu'il dicte vous apprend en une phrase tout ce que vous n'aviez pas compris de lui de toute la soirée. Il ne cherche pas à vous prendre. Il cherche à écrire quelque chose de vrai, et il n'a pas d'autre matériau que ce que vous venez de lui refuser." },
    "« Portez : *un homme, requérant, a défait le champion de l'assise. N'a pas déclaré de nom. La cause tombe.* »",
    "Le greffier lève les yeux pour la première fois de la soirée.",
    "« Maître, un rôle ne peut pas porter *un homme*. »",
    "« Il le portera. »",
    "§ Un commissaire aux titres vient d'inscrire un blanc dans un registre. C'est la chose exactement contraire à tout ce à quoi il croit, et il l'a faite pour vous, et vous ne saurez jamais pourquoi.",
    "Peut-être parce qu'un homme qui cherche depuis onze ans qui a raturé une ligne comprend mieux que personne ce que coûte une ligne mal portée.",
    "Peut-être parce qu'il préfère un blanc qu'il pourra remplir lui-même à un faux nom qu'il faudrait défaire.",
    "Vous passez l'hiver à Cendrepont. Il repart au printemps sans vous avoir reparlé une seule fois.",
  ],
  issue:"Fin de l'Acte I",
  bilan:"Il y a un blanc dans le rôle de l'assise d'hiver, et un homme sait où",
  apres:[
    () => `${ETAT.or} couronnes, ${ETAT.blessures.length} blessure${ETAT.blessures.length > 1 ? 's' : ''}, et une ligne inachevée dans le répertoire général d'une province.`,
    "Un blanc dans un registre est la seule chose qu'une administration ne supporte pas. Elle ne le poursuit pas : elle le remplit.",
    "La question de l'Acte II n'est pas de savoir si on le remplira. C'est de savoir qui tiendra la plume.",
  ],
  plusTard:"L'Acte II s'ouvre à Chastel, dans une pièce sans fenêtre, sur un homme de quarante-quatre ans qui relit une ligne incomplète pour la trentième fois.",
},

as_fin_onde:{
  lieu:"Cendrepont · la nuit · vingtième année après la Purge",
  titre:"Ce qu'on ne peut pas ne pas avoir vu",
  texte:[
    "Il n'y a pas de rôle à remplir. C'est la première chose : Vasque a ordonné de ne pas porter, et le greffier n'a pas porté.",
    { sobre:"Ce qui est écrit peut se raturer. Ce que quarante personnes ont vu, non.",
      intense:"Ce qui est écrit peut se raturer — la maison Karlsberg en est la preuve, en travers, à l'encre, dans une main qui n'est pas celle du volume. Ce que quarante personnes ont vu dans une salle basse un mardi de décembre ne se rature pas. Ça se raconte, ça se déforme, ça grossit, et ça arrive quelque part six semaines plus tard sous une forme qu'on ne contrôle plus.",
      extreme:"Ce qui est écrit se rature : la maison Karlsberg en est la preuve, en travers, à l'encre, dans une main qui n'est pas celle du volume. Ce que quarante personnes ont vu un mardi de décembre dans une salle basse ne se rature pas. Ça se raconte, ça se déforme, ça grossit d'un tiers à chaque bouche, et ça arrive six semaines plus tard, quelque part, sous une forme que personne ne contrôle plus et où les onze chandelles sont devenues onze morts." },
    "§ On ne cherche plus un Paria dans cette province. On cherche ce qui a éteint onze chandelles.",
    "Vous passez l'hiver à Cendrepont parce que le col est fermé, et ce sont quatre mois pendant lesquels une vallée de six cents personnes vit avec vous et avec ce qu'elle a vu.",
    "On ne vous parle pas. On ne vous évite pas non plus. On fait ce que font les gens devant une chose qui ne rentre dans aucune case : on continue, on vous sert votre bière, on vous salue, et on ne vous invite pas.",
    () => a('as_vasque_rapport')
      ? "Ancelin Vasque écrit son rapport. Il l'écrit pendant tout l'hiver, il le déchire deux fois, et il finit par l'envoyer au printemps par le premier courrier — dix-neuf pages, sans une adjectif, où il décrit exactement ce qu'il a vu et où il ne conclut rien. Un homme qui refuse de conclure dans un rapport administratif est un homme qui a peur de sa propre conclusion."
      : "Ancelin Vasque n'écrit rien. C'est un choix, et pour un commissaire aux titres c'est un crime — le même, exactement, que celui qu'il cherche depuis onze ans. Il repart au printemps avec deux chariots de registres et une chose qu'il n'a pas consignée, et ça, il devra le porter tout seul.",
  ],
  issue:"Fin de l'Acte I",
  bilan:"Quarante personnes ont vu, et il n'y en a aucune trace écrite",
  apres:[
    () => `${ETAT.or} couronnes, ${ETAT.blessures.length} blessure${ETAT.blessures.length > 1 ? 's' : ''}, une suspicion de ${ETAT.suspicion}, et rien du tout au registre.`,
    "Vous n'avez pas dit votre nom. Vous avez fait beaucoup mieux : vous avez montré ce que ce nom veut dire, à quarante témoins, sans le prononcer.",
    "Les Parias ne se cachent pas parce qu'ils ont un nom. Ils se cachent parce qu'ils ont ça sous les côtes, et parce que la Purge n'a jamais eu d'autre objet que ça.",
  ],
  plusTard:"L'Acte II ne s'ouvre pas sur une convocation. Il s'ouvre sur des gens dont c'est le métier, qui ne posent pas de questions et qui ne sont jamais moins de trois.",
},

as_fin_perdu:{
  lieu:"Cendrepont · la nuit",
  titre:"En l'état",
  texte:[
    "« La cause est jugée en l'état. »",
    "Vasque prononce la formule sans plaisir aucun, et il la prononce vite, ce qui est sa façon à lui d'abréger.",
    () => {
      const id = accuse().id;
      if(id === 'loys') return "Loys est marqué au fer à l'épaule gauche, rayé du rôle des habitants, et mis à la route au printemps. Il a quinze ans. Sa mère servait de la bière dans cette salle depuis huit ans ; elle n'y sert plus. On ne saura jamais ce qu'il est devenu, ce qui est le sort de la plupart des gens.";
      if(id === 'clerc') return "Le clerc est destitué et transféré aux annexes de Chastel pour deux ans. Il a vingt-six ans et il a écrit trois mots exacts dans une marge. On ne le reverra pas.";
      if(id === 'tailleur') return "Le tailleur de pierre est pendu jeudi, à midi, dans la cour du Héron, à l'endroit exact où l'on avait tracé le rond. La craie n'était pas encore complètement effacée.";
      if(id === 'amaury') return "Amaury de Valombre est pendu jeudi. Il n'a pas demandé à vous voir et il n'a fait porter aucun message, ce qui, chez lui, est probablement de la délicatesse.";
      if(id === 'gassien') return "Gassien le Lièvre est pendu jeudi sur le deuxième chef. Il n'a pas parlé de vous. Un homme qui a passé quarante ans à vendre des choses meurt en gardant la dernière, et personne ne saura jamais si c'était du calcul ou autre chose.";
      return "Le sergent d'étape est destitué pour négligence après douze ans de service. Il a une femme au bourg. Il ne retrouvera pas de poste : on ne reprend pas un homme dont le rôle a été relu.";
    },
    { sobre:"Vous avez perdu devant quarante personnes. Ça se sait avant la fin de la semaine.",
      intense:"Vous avez perdu devant quarante personnes, ce qui se sait avant la fin de la semaine et se raconte pendant vingt ans. Mais vous vous êtes levé, et personne d'autre dans cette salle ne s'est levé, et ça aussi ça se raconte — pas au même endroit, pas par les mêmes gens, et pas tout de suite.",
      extreme:"Vous avez perdu devant quarante personnes : ça se sait avant la fin de la semaine et ça se raconte vingt ans. Mais vous vous êtes levé, et personne d'autre dans cette salle ne s'est levé. Ça aussi se raconte — pas au même endroit, pas par les mêmes gens, et pas tout de suite. Le tiers des gens qui vous salueront dans dix ans le feront pour ça, et pas un ne vous dira pourquoi." },
    "§ Renaud Sorgue ne compte pas ce duel. Vous l'apprendrez plus tard, par quelqu'un d'autre : il en est resté à quarante et un.",
    "Vous passez l'hiver à Cendrepont, parce que le col est fermé et qu'il n'y a nulle part où aller.",
  ],
  issue:"Fin de l'Acte I",
  bilan:"Vous vous êtes levé, et ça n'a pas suffi",
  apres:[
    () => `${ETAT.or} couronnes, ${ETAT.blessures.length} blessure${ETAT.blessures.length > 1 ? 's' : ''}, et un hiver de quatre mois dans un bourg où tout le monde sait.`,
    "Ce n'est pas un échec de joueur. Il y a des ronds qu'on ne gagne pas, des règlements écrits par l'adversaire, et des hommes de quarante-sept ans qui ont fait ça quarante et une fois.",
    "Le reste — ce que vous avez appris, ce que vous portez, ce que la province a vu — ne s'annule pas. Rien ne s'annule dans ce jeu. C'est même le seul principe.",
  ],
  plusTard:"L'Acte II s'ouvre au printemps, sur un homme qui a une raison très précise de retourner à Chastel.",
},

};
Object.assign(ASSISE, ASSISE_9);
enregistrerScenes(ASSISE);


/* ══════════════════════════════════════════════════════════════════════════
 * L'ACTE II
 * Toutes les fins de l'Acte I sont des fins d'acte, pas des fins de partie :
 * l'hiver se termine et quelqu'un vient.
 * ══════════════════════════════════════════════════════════════════════════ */
for(const id of ['as_fin_nom','as_fin_yohan','as_fin_anonyme','as_fin_silence',
                 'as_fin_onde','as_fin_perdu','as_partir']){
  ASSISE[id].suite = 'a2_ouverture';
  ASSISE[id].libelleSuite = "La fonte";
}
