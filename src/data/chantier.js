/* PARIAS — Le chantier de Karlsberg
 *
 *   « Jamais "Reconstruire le château : 10 000 or". Il faut de la pierre, des
 *     ouvriers, un architecte, de la nourriture, des routes sûres, une
 *     garnison, une population, des revenus, des alliances. »
 *
 * L'or ne suffit donc jamais, et à partir du fort il ne suffit même plus du
 * tout. Un ouvrage se paie en :
 *
 *   or        ce qu'on a gagné en travaillant — jamais seul
 *   cout      pierre / bras / grain / faveurs (voir src/data/ressources.js),
 *             qui ne s'achètent pas : ils viennent de sources ouvertes en
 *             jouant, des mois plus tôt, ailleurs
 *   exige     des conditions qui ne sont pas des stocks : une route sûre, une
 *             garnison, quelqu'un qui sache bâtir, assez d'habitants
 *   semaines  la vraie dépense : Yohan vieillit, le monde avance sans lui
 *
 * `requis` : l'ouvrage précédent, ou un marqueur d'histoire.
 * `effet`  : lu par chantierBonus() dans src/chantier.js.
 *
 * Les six états de l'endroit — ruines, refuge, fort, château, domaine,
 * puissance régionale — sont dans KARLSBERG_PALIERS.
 */

const CHANTIER = [
  {
    id:"ch_cour", nom:"Déblayer la cour", or:200, semaines:2,
    desc:"Quarante ans d'éboulis, de ronces et d'os d'animaux. Il faut bien commencer par pouvoir marcher.",
    effet:{ renom:2, flags:["karlsberg_habitable"] },
    apres:"On peut traverser la cour sans se tordre une cheville. C'est peu. C'est la première fois depuis la Purge.",
  },
  {
    id:"ch_enceinte", nom:"Relever l'enceinte", or:500, semaines:6, requis:"ch_cour",
    cout:{ pierre:8, bras:6, grain:4 }, exige:['route_sure'],
    desc:"Avant les toits, les murs : c'est ce qu'on fait quand on compte rester. Trois pans à remonter, et la porte à reposer.",
    effet:{ defense:2, flags:["karlsberg_enceinte"] },
    apres:"Il y a une porte, et elle ferme. Ceux qui viennent doivent désormais frapper.",
  },
  {
    id:"ch_puits", nom:"Le puits et les granges", or:300, semaines:4, requis:"ch_cour",
    cout:{ pierre:4, bras:5, grain:2 },
    desc:"On ne tient pas une place sans eau ni grain. Le vieux puits est comblé, mais il est là.",
    effet:{ entretienMult:0.7 },
    apres:"On nourrit chez soi. Une colonne qui mange à Karlsberg coûte un tiers de moins qu'une colonne qui achète en route.",
  },
  {
    id:"ch_salle", nom:"La salle basse", or:350, semaines:4, requis:"ch_cour",
    cout:{ pierre:6, bras:4, grain:3 },
    desc:"Une seule pièce voûtée, sèche, avec un feu. Ce n'est pas du confort : c'est un endroit où l'Onde retombe.",
    effet:{ fatMax:10, reposMult:2 },
    apres:"On y dort vraiment. Le bourdonnement s'y calme comme il ne se calme nulle part ailleurs.",
  },
  {
    id:"ch_forge", nom:"La forge", or:500, semaines:5, requis:"ch_puits",
    cout:{ pierre:6, bras:6, grain:4, faveurs:1 },
    desc:"Un forgeron d'un hameau voisin accepte de venir, à condition qu'on lui bâtisse de quoi travailler.",
    effet:{ prixMult:0.75, flags:["karlsberg_forge"] },
    apres:"On répare au lieu de racheter. Tout ce qu'on achète ailleurs coûte un quart de moins, parce qu'on n'achète plus que ce qu'on ne sait pas faire.",
  },
  {
    id:"ch_refuge", nom:"Le corps de logis", or:600, semaines:7, requis:"ch_salle",
    cout:{ pierre:9, bras:8, grain:10 },
    desc:"De quoi loger trente personnes qui n'ont nulle part où aller. C'est la première décision qui ne sert à rien militairement.",
    effet:{ reputation:{parias:20, humains:-4}, flags:["refuge_tenu"] },
    apres:"Trente lits, un four, et une règle : on ne demande pas d'où l'on vient. Le mot circule vite chez ceux qui en ont besoin.",
  },
  {
    id:"ch_banniere", nom:"La bannière au-dessus de la porte", or:250, semaines:3, requis:"ch_enceinte",
    cout:{ bras:2 },
    desc:"Coudre le loup et le pendre en vue de la route. C'est un acte politique, et tout le monde le lira comme tel.",
    effet:{ renom:10, suspicion:15, reputation:{parias:16}, flags:["banniere_haute"] },
    apres:"On voit le loup depuis la route à une demi-lieue. Il n'y a plus moyen de prétendre que Karlsberg n'existe pas.",
  },
  {
    id:"ch_pierre", nom:"Graver l'acte de fondation", or:400, semaines:5,
    requis:"ch_muraille", requisFlag:"acte_fondation",
    cout:{ pierre:6, faveurs:4 }, exige:['population'],
    desc:"Le texte tient en trois lignes : la Maison Karlsberg tient ses terres de son propre chef et non d'une couronne.",
    effet:{ renom:6, reputation:{parias:18, humains:-10}, flags:["karlsberg_independante"] },
    apres:"Ce n'est pas une bravade : c'est un document administratif recopié sur une pierre. C'est précisément pour ça que personne ne pourra jamais prétendre qu'il n'a pas existé.",
  },

  /* ── Ce qui vient après le fort. À partir d'ici, l'or ne sert presque plus :
        il faut des gens, du grain, quelqu'un qui sache bâtir, et des dettes
        que d'autres maisons vous doivent. ──────────────────────────────── */
  {
    id:"ch_donjon", nom:"Le donjon", or:400, semaines:12, requis:"ch_enceinte",
    cout:{ pierre:22, bras:16, grain:14, faveurs:2 },
    exige:['route_sure', 'architecte', 'garnison'],
    desc:"Trois étages sur une base carrée, des murs de neuf pieds, un escalier qui tourne dans le mauvais sens pour l'assaillant. Ce n'est pas un symbole : c'est le seul endroit d'où l'on tient une vallée.",
    effet:{ defense:4, renom:12, suspicion:10, flags:["karlsberg_donjon"] },
    apres:"Le donjon se voit à trois lieues. Les cartes de la province devront être refaites, et ceux qui les font le savent déjà.",
  },
  {
    id:"ch_bourg", nom:"Le bourg au pied des murs", or:300, semaines:14, requis:"ch_donjon",
    cout:{ pierre:16, bras:24, grain:26 },
    exige:['population', 'route_sure'],
    desc:"On ne décide pas qu'un bourg existe : on trace des rues, on creuse un fossé, on donne des toits, et on attend de voir si les gens y restent. Quarante feux au départ.",
    effet:{ entretienMult:0.75, renom:8, reputation:{parias:14, humains:6}, flags:["karlsberg_bourg"] },
    apres:"Il y a un marché le troisième jour de chaque semaine, deux tavernes, une querelle de bornes en cours, et des enfants nés ici qui n'ont jamais vu les ruines.",
  },
  {
    id:"ch_muraille", nom:"La muraille de la vallée", or:600, semaines:18, requis:"ch_bourg",
    cout:{ pierre:34, bras:30, grain:24, faveurs:5 },
    exige:['architecte', 'garnison', 'population'],
    desc:"Fermer la vallée elle-même, pas seulement la maison : deux mille pas de courtine entre les deux versants, un corps de garde, et une porte qu'il faut deux attelages pour ouvrir.",
    effet:{ defense:6, renom:16, suspicion:14, reputation:{parias:18, humains:-8}, flags:["karlsberg_muraille","karlsberg_a_tenu"] },
    apres:"On n'entre plus dans la vallée du Loup : on y est admis. Trois maisons de la province ont fait demander, séparément, ce que Karlsberg comptait faire ensuite.",
  },
];
