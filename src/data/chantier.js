/* PARIAS — Le chantier de Karlsberg
 *
 * On parlait de relever une maison depuis le début sans jamais en poser une
 * pierre. Voici les pierres.
 *
 * Chaque ouvrage coûte de l'or et des semaines — le temps est la vraie monnaie,
 * parce qu'il fait vieillir Yohan et avancer le monde pendant qu'on bâtit. En
 * échange, chacun donne un avantage qu'on sent au jeu, pas une ligne de plus
 * sur une fiche.
 *
 * `requis` : l'ouvrage précédent, ou un marqueur d'histoire.
 * `effet`  : lu par chantierBonus() dans src/chantier.js.
 */

const CHANTIER = [
  {
    id:"ch_cour", nom:"Déblayer la cour", or:200, semaines:2,
    desc:"Quarante ans d'éboulis, de ronces et d'os d'animaux. Il faut bien commencer par pouvoir marcher.",
    effet:{ renom:2, flags:["karlsberg_habitable"] },
    apres:"On peut traverser la cour sans se tordre une cheville. C'est peu. C'est la première fois depuis la Purge.",
  },
  {
    id:"ch_enceinte", nom:"Relever l'enceinte", or:800, semaines:6, requis:"ch_cour",
    desc:"Avant les toits, les murs : c'est ce qu'on fait quand on compte rester. Trois pans à remonter, et la porte à reposer.",
    effet:{ defense:2, flags:["karlsberg_enceinte"] },
    apres:"Il y a une porte, et elle ferme. Ceux qui viennent doivent désormais frapper.",
  },
  {
    id:"ch_puits", nom:"Le puits et les granges", or:500, semaines:4, requis:"ch_cour",
    desc:"On ne tient pas une place sans eau ni grain. Le vieux puits est comblé, mais il est là.",
    effet:{ entretienMult:0.7 },
    apres:"On nourrit chez soi. Une colonne qui mange à Karlsberg coûte un tiers de moins qu'une colonne qui achète en route.",
  },
  {
    id:"ch_salle", nom:"La salle basse", or:600, semaines:4, requis:"ch_enceinte",
    desc:"Une seule pièce voûtée, sèche, avec un feu. Ce n'est pas du confort : c'est un endroit où l'Onde retombe.",
    effet:{ fatMax:10, reposMult:2 },
    apres:"On y dort vraiment. Le bourdonnement s'y calme comme il ne se calme nulle part ailleurs.",
  },
  {
    id:"ch_forge", nom:"La forge", or:900, semaines:5, requis:"ch_puits",
    desc:"Un forgeron d'un hameau voisin accepte de venir, à condition qu'on lui bâtisse de quoi travailler.",
    effet:{ prixMult:0.75, flags:["karlsberg_forge"] },
    apres:"On répare au lieu de racheter. Tout ce qu'on achète ailleurs coûte un quart de moins, parce qu'on n'achète plus que ce qu'on ne sait pas faire.",
  },
  {
    id:"ch_refuge", nom:"Le corps de logis", or:1100, semaines:7, requis:"ch_salle",
    desc:"De quoi loger trente personnes qui n'ont nulle part où aller. C'est la première décision qui ne sert à rien militairement.",
    effet:{ reputation:{parias:20, humains:-4}, flags:["refuge_tenu"] },
    apres:"Trente lits, un four, et une règle : on ne demande pas d'où l'on vient. Le mot circule vite chez ceux qui en ont besoin.",
  },
  {
    id:"ch_banniere", nom:"La bannière au-dessus de la porte", or:400, semaines:3, requis:"ch_enceinte",
    desc:"Coudre le loup et le pendre en vue de la route. C'est un acte politique, et tout le monde le lira comme tel.",
    effet:{ renom:10, suspicion:15, reputation:{parias:16}, flags:["banniere_haute"] },
    apres:"On voit le loup depuis la route à une demi-lieue. Il n'y a plus moyen de prétendre que Karlsberg n'existe pas.",
  },
  {
    id:"ch_pierre", nom:"Graver l'acte de fondation", or:700, semaines:5,
    requis:"ch_enceinte", requisFlag:"acte_fondation",
    desc:"Le texte tient en trois lignes : la Maison Karlsberg tient ses terres de son propre chef et non d'une couronne.",
    effet:{ renom:6, reputation:{parias:18, humains:-10}, flags:["karlsberg_independante"] },
    apres:"Ce n'est pas une bravade : c'est un document administratif recopié sur une pierre. C'est précisément pour ça que personne ne pourra jamais prétendre qu'il n'a pas existé.",
  },
];
