/* PARIAS — Acte III · LA CHRONIQUE
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Le canon demande une fin qui ne soit pas une fin écrite :
 *
 *     « Il n'existe aucune fin fixe. […] L'épilogue prend la forme d'une
 *       chronique historique et raconte Yohan, Karlsberg, ses relations et
 *       enfants éventuels, Alycia, Alarielle, Charles, Lucius, Caleb,
 *       Tyrion, Eltharion, Anarion, Khal-Vaene, ainsi que le destin des
 *       Elfes, Elfes noirs, humains, Astrah, Nains, Khesh, Parias,
 *       Hommes-Bêtes et Peaux-Vertes. »
 *
 * Jusqu'ici l'Acte III se terminait sur l'épilogue de l'Acte II — titre
 * compris. Voilà la vraie fin.
 *
 * ═══ LE CADRE ═══
 *
 * Ce n'est plus vous. C'est un homme de Chastel qui écrit soixante ans plus
 * tard, dans le volume qui suit le cent-quarante-troisième — celui où la
 * maison a été rayée. Il a des pièces et il a des trous, et il dit lesquels
 * sont lesquels, parce que c'est le métier.
 *
 * Le changement de voix est délibéré et il est le dernier effet du jeu : on
 * passe du présent de la deuxième personne au passé d'un greffe. Ce qui
 * était vécu devient consigné, et ce qui n'a pas été consigné disparaît.
 *
 * ═══ LA DERNIÈRE SECTION ═══
 *
 * *Ce que la chronique ne dit pas.* Elle liste ce que le joueur a fait et
 * dont aucun document ne porte trace : les onze hameaux passés dans la
 * nuit, le village qui a déclaré au lieu de brûler, les onze assis contre
 * un mur à onze cents pieds. Un greffe ne sait écrire que ce qu'on lui
 * apporte, et personne n'apporte ces choses-là.
 * ═══════════════════════════════════════════════════════════════════════ */

/* Un fragment de chronique : un chapeau en gras, puis ce qu'on en sait. */
const fragment = (titre, suite) => `**${titre}** ${suite}`;

/* Où en est une crise à la fin, par son nom d'étape. */
const etapeCrise = id => {
  const n = Math.min(4, (A2().crises || {})[id] || 0);
  return { n, nom:CRISES[id].nom, dit:CRISES[id].etapes[n] };
};

/* ── DE KARLSBERG ─────────────────────────────────────────────────────── */
function chroniqueKarlsberg(){
  const v = [];
  const p = palierKarlsberg();

  if(a('a3_siege_tenu'))
    v.push(fragment("La maison de Karlsberg a tenu son siège.",
      "C'est le fait le mieux établi de tout ce dossier : quatre relations concordantes, deux rôles de garde et un état de vivres. On s'accorde même sur le nombre de feux au pied du mur, ce qui n'arrive jamais."));
  else if(a('a3_siege_perdu'))
    v.push(fragment("La maison de Karlsberg est tombée une seconde fois.",
      "Vingt-huit ans après la première. Le greffe de Chastel a porté la seconde rature à la suite de la première, sur la même ligne, de la même encre — un clerc consciencieux a jugé que c'était la place, et personne ne l'a repris."));
  else
    v.push(fragment("On ne sait pas ce qu'est devenue la maison de Karlsberg.",
      "Elle figure aux rôles de la vingt-quatrième année et elle n'y figure plus à la trentième. Entre les deux il y a une vallée, trois cents feux, et aucun document."));

  const DIT = {
    ruines:   "Les pierres n'ont jamais été relevées. Ce qu'on appelle aujourd'hui Karlsberg est un lieu-dit sur une route que personne n'entretient.",
    refuge:   "Il n'y a jamais eu de château. Il y a eu un endroit sec où quarante personnes dormaient, et cela ne figure sur aucune carte, ce qui était très exactement le but.",
    fort:     "C'était un fort et rien de plus. Un fort n'est pas un titre : c'est un fait, et un fait se conteste sans qu'on ait besoin de l'attaquer.",
    chateau:  "C'était un château, donc une valeur, donc une ligne dans l'état des lieux de quelqu'un. Trois maisons en ont fait mention dans leurs comptes sans jamais le nommer.",
    domaine:  "C'était un domaine. On le comptait en feux et non en pierres : trois cents personnes qui n'avaient rien demandé.",
    puissance:"C'était une puissance régionale, ce qui, dans les Marches Grises, veut dire qu'on ne pouvait plus la traverser sans son accord.",
  };
  v.push(DIT[p]);

  if(a('a2_bannieres'))
    v.push(fragment("La bannière noire au loup blanc a été relevée publiquement.",
      "Volume cent-quarante-trois, section des titres relevés. C'est la première maison rayée à l'avoir été en quatre-vingts ans, et deux provinces ont demandé qu'on vérifie l'acte trois fois."));
  if(a('in_ys_lettre') || a('a3_tenu'))
    v.push(fragment("Le relèvement n'a jamais été contesté.",
      "Il l'aurait été — un relèvement l'est toujours, pendant trois générations — si la dernière du sang par ordre de naissance ne l'avait pas confirmé par écrit devant le commissariat aux titres. Elle l'a fait en quatre lignes."));
  return v;
}

/* ── DE YOHAN ─────────────────────────────────────────────────────────── */
function chroniqueYohan(){
  const v = [];
  const blessures = (ETAT.blessures || []).length;

  v.push(fragment("De Yohan de Karlsberg, on tient trois choses pour sûres.",
    "Qu'il était le dernier de son sang à porter le nom entier. Qu'il a vécu neuf ans sans le dire à quiconque ne fût pas mort depuis. Et qu'à la fin, quatre provinces le nommaient."));

  if(a('in_ch_inscrit') || a('a3_ch_inscrit'))
    v.push(fragment("Il est inscrit.",
      "De sa propre main, de son plein gré, au registre de la commission de Mont-Draken. C'est la pièce la plus étrange de ce dossier : un homme qui avait passé sa vie à ne pas être trouvé a demandé qu'on l'écrive."));
  else if(ETAT.suspicion >= 70)
    v.push(fragment("Il n'a jamais été inscrit nulle part, et tout le monde savait.",
      "C'est un état qui n'a pas de nom en droit. Il n'existe aucune procédure pour un homme que trois provinces reconnaissent et qu'aucun registre ne porte, et l'absence de procédure a été, très longtemps, sa seule protection."));
  else
    v.push(fragment("Il n'a jamais été inscrit, et on n'a jamais été certain.",
      "Il y a des rumeurs de relais, il y a deux dépositions qui se contredisent, et il y a un greffe qui a refusé de trancher. C'est probablement ce qu'il voulait."));

  if(blessures)
    v.push(fragment(`Il portait ${blessures === 1 ? "une chose" : enLettres(blessures) + " choses"} qui ne s'en sont jamais allées.`,
      `${(ETAT.blessures || []).map(b => b.zone).join(' · ')}. Aucune n'est mentionnée dans les relations officielles, qui préfèrent les hommes entiers.`));

  if(ETAT.renom >= 70)
    v.push(fragment("Sa réputation a dépassé ce qu'il avait fait, ce qui arrive à tout le monde et ne s'arrête jamais.",
      "On lui prête aujourd'hui onze faits dont trois sont établis, quatre sont douteux et quatre appartiennent à quelqu'un d'autre."));
  else if(ETAT.renom <= 25)
    v.push(fragment("Il n'a jamais été célèbre et il n'a rien fait pour l'être.",
      "C'est une chose que les chroniques rendent mal : elles ne savent écrire que ce qui a été remarqué."));
  return v;
}

/* ── DE SA MAISON ─────────────────────────────────────────────────────── */
function chroniqueMaison(){
  const v = [];
  if(a('a2_heritier'))
    v.push(fragment("Il a laissé un héritier.",
      "C'est tout ce que le rôle en dit, et un rôle qui dit ça a déjà tout dit : une maison relevée qui produit un héritier cesse d'être une exception et devient une maison."));
  if(a('a2_epouse_choisie') || a('a2_termes_signes'))
    v.push(fragment("Il s'est marié dans les formes.",
      "Onze pages signées des deux mains, avec une clause que l'épouse a écrite elle-même et dont les copies ultérieures ont supprimé trois mots. On ne sait pas lesquels."));
  if(a('a2_liaison'))
    v.push(fragment("Il y a des enfants dont la chronique ne porte pas le nom.",
      "Le Prix ancestral a produit ce qu'il produit depuis quatre cents ans : des branches. Les maisons concernées les ont inscrites sous leur propre nom, ce qui est la coutume, et c'est ainsi que le sang des Parias circule sans jamais figurer nulle part."));
  return v;
}

/* ── DE CEUX QUI L'ONT CONNU ──────────────────────────────────────────── */
function chroniqueLesNeuf(){
  const v = [];
  const la = lien('alycia'), lr = lien('alarielle');

  /* — Alycia — */
  if(a('a2_alycia_reste'))
    v.push(fragment("Alycia de Callensbourg est restée.",
      "Le réseau a continué de fonctionner depuis une maison qui figurait sur les cartes, ce qui était contraire à tout ce qu'elle avait pratiqué pendant quinze ans. Elle a dit une fois que c'était la décision la plus imprudente de sa vie et qu'elle la referait."));
  else if(a('a2_alycia_libre') || la.relation >= 8)
    v.push(fragment("Alycia de Callensbourg n'est pas restée, et le réseau a tenu.",
      "Sept en dix-huit mois au début ; on lui en attribue plus de deux cents à la fin. Aucun n'est écrit nulle part, par construction. Ils sont vivants, ce qui est la seule preuve qu'elle ait jamais acceptée."));
  else
    v.push(fragment("Alycia de Callensbourg a disparu des documents.",
      "Ce qui, la concernant, ne prouve rigoureusement rien : c'était son métier de faire disparaître les gens, et rien n'indique qu'elle se soit exclue de sa propre pratique."));

  /* — Alarielle — */
  if(a('a2_onde_rendue') || lr.relation >= 8)
    v.push(fragment("Alarielle a obtenu de sa cour ce qu'aucune cour elfique n'avait accordé en quatre cent onze ans.",
      "La faute a été reconnue par écrit. Le document est court, il est illisible pour nous, et neuf maisons ont voté contre."));
  else if(a('a2_acte_elfique'))
    v.push(fragment("Alarielle a fait porter la faute au registre, et sa cour ne le lui a pas pardonné.",
      "Elle n'a plus reçu de charge après cette année-là. Chez les Elfes, où l'on compte en siècles, ce genre de mise à l'écart n'est pas une punition : c'est un effacement."));
  else
    v.push(fragment("Alarielle n'a rien obtenu.",
      "Elle a passé le reste de sa vie — et il en restait beaucoup — à porter devant des maisons très anciennes une chose que ces maisons avaient décidé de ne pas entendre."));

  /* — Charles — */
  if(a('a3_registre_couronne'))
    v.push(fragment("Le registre de Mont-Draken a survécu à son auteur.",
      "Il est passé sous une couronne que personne ne reconnaissait, ce qui s'est révélé infiniment plus solide qu'un grenier. On y compte aujourd'hui plus de six cents noms et il n'en a jamais été retiré un seul."));
  else if(a('a3_ch_declare') || a('a3_ch_inscrit'))
    v.push(fragment("Charles « le Sourire de Fer » a porté Ravières devant quatre conseils.",
      "Un principe, un conseil s'assied dessus. Un village de soixante personnes qui a demandé de lui-même autre chose qu'un bûcher, un conseil ne sait pas quoi en faire. Trois provinces ont fini par écrire une formule pour ça, et elle porte le nom du village."));
  else if(a('in_ch_refuse') || a('cd_refus'))
    v.push(fragment("Charles « le Sourire de Fer » est mort sans successeur à sa commission.",
      "Le conseil a donné la place à quelqu'un qui promettait d'aller plus vite. Le registre est resté dans un grenier de Mont-Draken jusqu'à ce qu'on n'en retrouve plus la trace, et personne n'a pu dire à partir de quand."));
  else
    v.push(fragment("De Charles de Mont-Draken, les provinces ont retenu le nombre et non le registre.",
      "Trois cent quarante-six pièces sur un mur. On le cite encore pour ça. Les quatre-vingt-quinze qu'il n'a pas tués ne sont mentionnés dans aucun éloge et il n'en aurait pas voulu."));

  /* — Lucius — */
  if(a('a3_couronne_temoins'))
    v.push(fragment("Lucius Furius Augustus a été couronné devant quarante et une personnes.",
      "Une couronne prise devient une couronne au bout de trente ans, jamais avant. Celle-là a été contestée pendant dix-neuf, ce qui est le meilleur résultat obtenu par un homme qui se couronne lui-même depuis la chute de l'ancien empire."));
  else if(a('a3_couronne_seule') || a('a3_couronne_onze'))
    v.push(fragment("Lucius Furius Augustus s'est couronné devant onze personnes.",
      "On en discute toujours. C'est la position exacte où il savait qu'il serait, et il l'a fait quand même : les relations concordent sur ce point et c'est peut-être la seule chose admirable qu'on lui accorde."));
  else if(a('a3_lucius_refuse'))
    v.push(fragment("Lucius Furius Augustus s'est couronné seul et l'a payé.",
      "Astrah a eu un roi pendant six ans. Ce qui a suivi n'appartient plus à ce dossier et n'a rien d'agréable."));
  else
    v.push(fragment("Lucius Furius Augustus a compté des soutiens jusqu'à sa mort.",
      "Il en avait deux mille et il lui en manquait un. Les rôles d'Astrah s'arrêtent avec lui, sur une page laissée blanche pour un règne qui n'a pas eu lieu."));

  /* — Caleb — */
  if(a('a2_caleb_quarante') || a('cb_paye'))
    v.push(fragment("Caleb de Fort-aux-Princes a été payé, et il l'a noté.",
      "Ses créances ne sont jamais mortes avec lui : elles sont passées à sa nièce, qui les a tenues avec la même exactitude et moins de patience."));
  else if(a('cb_sans') || a('cb_renvoye'))
    v.push(fragment("Caleb de Fort-aux-Princes a rangé Karlsberg dans la colonne de ceux qui ne s'achètent pas.",
      "Ce n'est pas la bonne colonne. Il l'avait dit lui-même, sans menace, du ton dont il lisait un état de fermage."));
  else
    v.push(fragment("Caleb de Fort-aux-Princes a racheté le droit de passage de la gorge de Cendrepont.",
      "Il en a tiré, sur trente ans, onze fois ce qu'il l'avait payé. C'est la seule ligne de sa vie dont il ait jamais parlé à quelqu'un."));

  /* — Ysabel — */
  if(a('in_ys_lettre'))
    v.push(fragment("Ysabel de Karlsberg a confirmé de son vivant le relèvement de la maison qu'elle avait fait rayer.",
      "Elle a employé la même forme, le même greffe et le même cachet qu'à Germinal de la cent-quarante-troisième année — pour faire l'inverse. Aucun juriste de province n'a jamais su comment nommer ça."));
  else if(a('in_ys_morte') || a('a2_ysabel_morte'))
    v.push(fragment("Ysabel de Karlsberg est morte à Sainte-Ombre.",
      "Onze hospices de route ont perdu leur comptable dans l'année. Trois ont fermé. La fondation a mis quatre ans à retrouver quelqu'un capable de tenir trois colonnes."));
  return v;
}

/* ── DES GUERRES ──────────────────────────────────────────────────────── */
function chroniqueGuerres(){
  const v = [];

  /* — Les Elfes — */
  const e = etapeCrise('elfes');
  if(a('a3_pont_tenu'))
    v.push(fragment("Le pont de Saulaie a tenu.",
      "Le pont de Saulaie a tenu une nuit qu'aucun des deux camps n'avait portée à ses états. Une saison de ligne de fleuve, c'est trois mois de récoltes pour onze hameaux, et c'est tout ce qu'on achète là-bas."));
  else if(a('a3_pont_perdu') || a('a3_fl_casse'))
    v.push(fragment("La ligne du fleuve est descendue de quatre lieues.",
      `Le rapport de Germinal porte *arche sud abattue*. ${a('a3_fl_passes') ? "Il ne mentionne pas les quatre cent onze personnes passées la nuit précédente, parce qu'elles ne figuraient sur aucun état avant et n'y figurent pas après." : "Il porte aussi *sans perte*, ce qui est exact dans la seule colonne où quelqu'un comptait."}`));
  v.push(fragment(`${e.nom} :`, `*${e.dit}.*${e.n >= 4 ? " Les deux cours ont cessé d'exister en tant que cours. Ce qui les a remplacées n'a pas de nom dans notre langue." : ""}`));

  if(a('a2_tyrion_humilie'))
    v.push(fragment("Tyrion n'a jamais pardonné.",
      "Il a vécu quatre cents ans de plus que l'homme qui l'avait humilié, ce qui lui a laissé le temps de le faire savoir à des gens qui n'étaient pas encore nés."));

  /* — Astrah — */
  const as = etapeCrise('astrah');
  v.push(fragment(`${as.nom} :`, `*${as.dit}.*`));

  /* — Kar-Durak — */
  const kd = etapeCrise('kardurak');
  if(a('a3_porte_ouverte'))
    v.push(fragment("La onzième porte de Kar-Durak a été ouverte une fois.",
      "Le rôle de garde de cette journée-là existe, il est complet, et il porte onze noms suivis d'une mention que le greffe naine n'a jamais consenti à traduire. La porte a été rescellée le soir même, de l'intérieur, ce qui suppose que quelqu'un est resté."));
  else if(a('a3_porte_scellee'))
    v.push(fragment("La onzième porte a été refermée sous de la pierre.",
      "Un sceau tient six cents ans. De la pierre tient plus longtemps. C'est la seule décision de cette guerre dont les Nains parlent encore avec approbation."));
  else if(a('a3_porte_refusee'))
    v.push(fragment("Personne n'est descendu à la onzième.",
      "Kar-Durak a tenu sur trois portes, ce qui fait vingt ans. Vingt ans, chez eux, se dit *un délai* et non *une victoire*."));
  v.push(fragment(`${kd.nom} :`, `*${kd.dit}.*`));

  /* — Khesh — */
  const kh = etapeCrise('khesh');
  v.push(fragment(`${kh.nom} :`, `*${kh.dit}.* ${
    kh.n >= 4 ? "Khal-Vaene a réuni douze tribus sous un serment que personne n'a rompu de son vivant, puis il a tourné le désert vers le nord. Ce qu'il en a fait ensuite dépasse ce dossier."
    : kh.n >= 3 ? "Khal-Vaene a réuni le désert et il est mort avant de s'en servir. Le serment a tenu onze ans après lui, ce que personne au nord n'avait prévu."
    : kh.n >= 1 ? "Khal-Vaene y a passé sa vie. Il en manquait cinq à sa mort, et son successeur a fait cinq guerres pour les avoir."
    : "Khal-Vaene n'a jamais réuni le désert. Les feux se sont rallumés un par un après lui, et il y en a de nouveau douze."}`));

  /* — La Horde — */
  const ho = etapeCrise('hordes');
  v.push(fragment(`${ho.nom} :`, `*${ho.dit}.* ${
    ho.n >= 4 ? "Elle n'a jamais été battue : elle a fini par n'avoir plus rien devant elle, ce qui n'est pas la même chose et ce que les chroniques de l'époque ont toutes confondu."
    : "Elle a profité de tout et n'a rien conclu. C'est la façon dont les hardes fonctionnent et personne dans quatre provinces n'a voulu l'apprendre."}`));
  return v;
}

/* ── DES PEUPLES ──────────────────────────────────────────────────────── */
function chroniquePeuples(){
  const e = etapeCrise('elfes'), as = etapeCrise('astrah'), kh = etapeCrise('khesh'),
        kd = etapeCrise('kardurak'), ho = etapeCrise('hordes');
  const v = [];

  v.push(fragment("Des Elfes,", e.n >= 4
    ? "il reste des maisons et il ne reste plus de cour. Aelthiriel se visite. On y compte onze familles là où les rôles anciens en portaient quatre cents."
    : "il reste ce qui restait : des maisons très anciennes, des générations très longues, et un renouvellement si lent qu'une guerre de neuf ans y compte pour un incident."));

  v.push(fragment("Des Elfes noirs,", a('a2_anarion_soutenu')
    ? "on dit aujourd'hui qu'ils ont gagné, ce qui est faux et commode. Ils ont obtenu la marche, le fleuve et le silence des deux cours, et ils n'ont jamais obtenu d'être autre chose que ce qu'on raconte d'eux."
    : "on ne dit à peu près que des sottises. Ils sont élégants, ils sont patients, et ils tiennent des maisons dont les alliances ne survivent pas à leurs auteurs."));

  v.push(fragment("Des humains,", "il n'y a rien de général à écrire, ce qui est le propre des humains : quatre provinces, vingt-cinq maisons, et pas deux qui aient traversé ces années de la même façon."));

  v.push(fragment("D'Astrah,", as.n >= 4
    ? "il reste une couronne, une salle des rôles, et onze règnes qui n'ont produit aucun roi jusqu'à celui-là. On discute encore de savoir s'il compte."
    : "il reste ce qu'il en restait avant : quatre cents ans de rôles rangés par règne, et personne pour les continuer."));

  v.push(fragment("Des Nains,", kd.n >= 4
    ? "il reste trois portes et une charge héréditaire qui n'a plus de galerie à tenir. Ils la tiennent quand même. C'est le mot le plus juste qu'on puisse écrire sur eux."
    : "il reste Kar-Durak, ce qui, pour une cité que trente mille Peaux-Vertes usaient trente par nuit, est le résultat que personne n'attendait."));

  v.push(fragment("Des Khesh,", kh.n >= 3
    ? "il reste une confédération, ce qui n'existait pas avant et n'a pas de nom dans leur langue. Ils en ont emprunté un au nord et ils ne l'aiment pas."
    : "il reste des tribus, des chefs, des défis et des soumissions — c'est-à-dire ce qu'il y avait avant, et ce qui y sera après."));

  v.push(fragment("Des Parias,", a('a2_reseau_protege') || a('a2_bannieres')
    ? "il reste, pour la première fois en quatre cents ans, une adresse. Ce n'est pas rien et ce n'est pas une sécurité : une adresse se donne, et tout ce qui se donne finit par être donné."
    : "il reste ce qu'il en restait : des lignées humaines, un sang qu'on ne peut pas voir, et un potentiel qui saute trois générations et revient sans prévenir dans un hameau de onze feux."));

  v.push(fragment("Des Hommes-Bêtes,", ho.n >= 3
    ? "il reste une marche humaine sans frontière et onze hameaux qui ne se sont jamais repeuplés. On y met des bornes tous les vingt ans et on les retrouve ailleurs."
    : "il reste des troupeaux qui manquent, ce qui est leur façon d'exister dans nos documents depuis toujours."));

  v.push(fragment("Des Peaux-Vertes,", kd.n >= 4
    ? "il reste trente mille des leurs sous Kar-Durak et pas un seul chef que nous sachions nommer. C'est un aveu et je l'écris comme tel."
    : "il reste ce qu'on savait : ils ne prennent pas, ils usent, et nous avons mis onze cents ans à comprendre la différence."));
  return v;
}

/* ── CE QUE LA CHRONIQUE NE DIT PAS ───────────────────────────────────── */
function chroniqueTrous(){
  const t = [];
  if(a('a3_fl_passes'))
    t.push("que quatre cent onze personnes ont traversé un pont dans une nuit de Germinal, dans l'ordre inverse de leur distance, et que les deux charrettes abandonnées à la troisième heure appartenaient à l'homme qui a proposé de les abandonner ;");
  if(a('a3_ch_declare'))
    t.push("qu'un village de soixante personnes a demandé un papier au lieu d'un bûcher, et qu'il l'a demandé lui-même, et qu'un métayer de Ravières l'a formulé mieux qu'aucun conseil de province en sept ans ;");
  if(a('a3_ch_inscrit'))
    t.push("qu'une ligne de registre a été écrite pour qu'une autre puisse venir après elle, et que la seconde a onze ans ;");
  if(a('a3_escalier_vu'))
    t.push("qu'à onze cents pieds sous Kar-Durak, onze gardes se sont assis contre un mur en ordre, les armes rangées à côté d'eux, et ont attendu ;");
  if(a('in_so_epargne') || a('in_so_fini'))
    t.push("qu'un homme de cinquante-six ans a baissé sa lame de lui-même au milieu d'un rond de craie, devant trois cents personnes, et que personne dans cette cour n'a compris ce qui venait de se payer ;");
  if(a('in_sa_ecrit') || a('in_sa_reste'))
    t.push("qu'un carnet de trois lignes a fini par en écrire quatre ;");
  if(a('ch_meute_faite'))
    t.push("qu'un garçon de douze ans a nourri une meute pendant six semaines pour sauver le troupeau de son grand-père, et qu'il a tenu les comptes d'une maison neuf ans plus tard ;");
  if(a('a3_fl_casse') && !a('a3_fl_passes'))
    t.push("que le mot *perte*, dans un rapport d'état, ne désigne que ce qui figurait déjà quelque part ;");

  if(!t.length)
    return ["§ Un greffe ne sait écrire que ce qu'on lui apporte. On ne lui a rien apporté de cette vallée, et ce n'est pas une négligence : personne, là-bas, n'a jamais pensé que ça s'écrivait."];

  return [
    "§ Il faut, pour finir, dire ce que ce dossier ne contient pas.",
    "Un greffe ne sait écrire que ce qu'on lui apporte, et il ne lui a été apporté, de tout ceci, aucune pièce. Je le tiens de relais, de gens âgés et de deux hommes qui y étaient. Rien de ce qui suit n'est établi et je l'écris quand même, parce qu'un registre qui n'écrit que ce qu'il sait mesurer ment par omission pendant quatre cents ans.",
    "**On ne trouvera nulle part** " + t.join('\n\n'),
    { sobre:"C'est ce qui reste quand les guerres deviennent la géographie.",
      intense:"Ce sont les choses dont un homme fait sa vie, et ce sont exactement celles qu'un greffe ne peut pas porter. J'ai vérifié quatre cents ans de nos volumes : nous n'avons jamais su écrire que ce qui a coûté ou rapporté.",
      extreme:"Ce sont les choses dont un homme fait sa vie, et ce sont très exactement celles qu'un greffe ne sait pas porter.\n\nJ'ai relu quatre cents ans de nos volumes avant d'écrire cette page. Nous savons noter ce qui a coûté, ce qui a rapporté, ce qui a été pris et ce qui a été rendu. Nous n'avons pas de colonne pour une nuit où quelqu'un a décidé de faire passer les gens avant de casser le pont.\n\nJe n'en ouvrirai pas une : je n'ai pas qualité pour ça, et je n'ai plus l'âge. Je signale seulement, à qui tiendra ce volume après moi, que le trou est là et qu'il est de notre fait." },
  ];
}

/* ── LA SCÈNE ─────────────────────────────────────────────────────────── */
const EPILOGUE3 = {
  a3_chronique:{ dyn:true, texte:[] },
};

DYN.a3_chronique = () => {
  const tenu = a('a3_siege_tenu');

  const texte = [
    { sobre:"Ce qui suit est tiré du volume qui fait suite au cent-quarante-troisième, au greffe de Chastel.",
      intense:"Ce qui suit est tiré du volume qui fait suite au cent-quarante-troisième — celui où la maison a été rayée — au greffe général de Chastel. La main est celle d'un clerc dont nous n'avons pas le nom, écrivant soixante ans après les faits.",
      extreme:"Ce qui suit est tiré du volume qui fait suite au cent-quarante-troisième, au greffe général de Chastel.\n\nLe cent-quarante-troisième est celui où la maison a été rayée. Le suivant a été ouvert quatre-vingts ans plus tard par un clerc dont nous n'avons pas le nom, qui écrivait soixante ans après les faits, avec des pièces, des trous, et l'habitude de dire lesquels étaient lesquels.\n\nOn ne sait pas pourquoi il a jugé que c'était la place." },

    "§ **De la maison de Karlsberg, des Marches Grises.**",
    ...chroniqueKarlsberg(),
    ...chroniqueMaison(),

    "§ **De l'homme.**",
    ...chroniqueYohan(),

    "§ **De ceux qui l'ont connu.**",
    ...chroniqueLesNeuf(),

    "§ **Des guerres de ce temps.**",
    ...chroniqueGuerres(),

    "§ **Des peuples.**",
    ...chroniquePeuples(),

    ...chroniqueTrous(),
  ];

  SCENES.a3_chronique = {
    dyn:true,
    lieu:"Chastel · le greffe général · soixante ans plus tard",
    titre:"Ce qu'on a fini par écrire",
    texte,
    effets:{ flags:['a3_chronique'],
             marque:tenu ? "Karlsberg figure au volume qui suit le cent-quarante-troisième."
                          : "La seconde rature a été portée à la suite de la première, sur la même ligne.",
             court:"La chronique" },
    issue:"La chronique est close",
    bilan:tenu ? `Karlsberg, ${palierKarlsberg() === 'ruines' ? "des pierres" : "une maison"}, et un nom qui a été réécrit`
               : "Karlsberg, deux fois en vingt-huit ans",
    plusTard:"Le volume est encore à Chastel. On le consulte quatre fois par siècle, et jamais pour cette page-là.",
  };
  aller('a3_chronique');
};

enregistrerScenes(EPILOGUE3);
entree2('a3_chronique');
