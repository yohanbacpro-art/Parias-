/* PARIAS — Combattants nommés
 *
 * Les figures du monde qui peuvent croiser le fer avec Yohan. Même format que
 * le bestiaire (voir bestiary.js) pour que le moteur de combat les accepte tels
 * quels, plus un `portrait` et une note d'intention.
 *
 * Référencés dans un groupe de combat par { champion:"caleb" }.
 *
 * Calibrage repris du bestiaire :
 *   Danger 4 → 70 PV · Déf 14 · 3 PA · Préc 6 · 10+1d10
 *   Danger 5 → 105 PV · Déf 15 · 4 PA · Préc 8 · 14+2d8
 *   Danger 6 → 185 PV · Déf 17 · 5 PA · Préc 10 · 20+3d10
 * Les champions s'en écartent un peu : moins de PV bruts, plus de précision et
 * des capacités qui font mal — ce sont des duels, pas des sacs à points de vie.
 */
const CHAMPIONS = {

  caleb: {
    id:"CHP_CALEB", nom:"Caleb de Fort-aux-Princes", portrait:"caleb",
    danger:5, pv:88, defense:16, pa_par_tour:4, precision:9,
    attaque_base:{ degats_base:13, de_variance:"2d8" },
    capacites_speciales:[{ nom:"Onde princière", cout_pa:2,
      effet:"Décharge de l'Onde en zone : touche tout le groupe de Yohan" }],
    intention:"Ne cherche pas à tuer — cherche à établir qui, des deux Parias, compte le plus.",
  },

  tyrion: {
    id:"CHP_TYRION", nom:"Prince Tyrion", portrait:"tyrion",
    danger:5, pv:96, defense:17, pa_par_tour:4, precision:10,
    attaque_base:{ degats_base:12, de_variance:"2d8" },
    capacites_speciales:[{ nom:"Sentence elfique", cout_pa:2,
      effet:"Frappe précise qui impose un malus durable — et empoisonne la plaie" }],
    intention:"Méprise les Parias sans les haïr. Frappe pour prouver un point, pas par colère.",
  },

  khal_vaene: {
    id:"CHP_KHAL", nom:"Khal-Vaene", portrait:"khalvaene",
    danger:5, pv:110, defense:15, pa_par_tour:4, precision:8,
    attaque_base:{ degats_base:15, de_variance:"2d8" },
    capacites_speciales:[{ nom:"Souffle des sables", cout_pa:3,
      effet:"Tempête en zone : sable et lames sur tout le groupe" }],
    intention:"Usurpateur des Dragons des Sables. Ne laisse aucun témoin de ses défaites.",
  },

  kem_val: {
    id:"CHP_KEMVAL", nom:"Kem-Val le Banni", portrait:"kemval",
    danger:4, pv:82, defense:15, pa_par_tour:3, precision:8,
    attaque_base:{ degats_base:12, de_variance:"1d10" },
    capacites_speciales:[{ nom:"Charge du banni", cout_pa:2,
      effet:"Charge irrésistible, ignore une partie de l'armure" }],
    intention:"Se bat pour être reconnu, pas pour vaincre. Reconnaît la valeur chez l'adversaire.",
  },

  charles: {
    id:"CHP_CHARLES", nom:"Charles le Sourire de Fer", portrait:"charles",
    danger:5, pv:104, defense:17, pa_par_tour:4, precision:9,
    attaque_base:{ degats_base:14, de_variance:"2d8" },
    capacites_speciales:[{ nom:"Garde du tueur de dragon", cout_pa:1,
      effet:"Se met en garde : très difficile à toucher pendant un tour" }],
    intention:"Protège l'humanité avant tout. Ne voit pas les Parias comme des ennemis — sauf si on l'y force.",
  },

  lame_anarion: {
    id:"CHP_LAME_ANARION", nom:"Lame de la Cour Noire", portrait:"anarion",
    danger:4, pv:64, defense:16, pa_par_tour:4, precision:9,
    attaque_base:{ degats_base:11, de_variance:"1d10" },
    capacites_speciales:[{ nom:"Poison de cour", cout_pa:2,
      effet:"Lame empoisonnée : dégâts continus 3/tour pendant 3 tours" }],
    intention:"Duelliste d'Anarion. L'élégance jusque dans la manière de tuer.",
  },

  champion_arene: {
    id:"CHP_ARENE", nom:"Le Tenant du Sable Rouge", portrait:"chasseur_prime",
    danger:4, pv:76, defense:15, pa_par_tour:3, precision:8,
    attaque_base:{ degats_base:11, de_variance:"1d10" },
    capacites_speciales:[{ nom:"Coup de la foule", cout_pa:2,
      effet:"Frappe théâtrale qui galvanise les gradins et le blesse davantage" }],
    intention:"Invaincu à l'Arène Rouge. Se bat pour la foule, pas pour la mort.",
  },

  garde_leopold: {
    id:"CHP_GARDE_ASTRAH", nom:"Garde du Roi de Cendre", portrait:"leopold",
    danger:3, pv:52, defense:15, pa_par_tour:3, precision:6,
    attaque_base:{ degats_base:8, de_variance:"1d8" },
    capacites_speciales:[],
    intention:"Discipline impériale. Ils viennent toujours à plusieurs.",
  },

  chasseur_paria: {
    id:"CHP_CHASSEUR", nom:"Chasseur de Parias", portrait:"chasseur_prime",
    danger:4, pv:72, defense:16, pa_par_tour:4, precision:9,
    attaque_base:{ degats_base:11, de_variance:"1d10" },
    capacites_speciales:[{ nom:"Filet lesté", cout_pa:2,
      effet:"Immobilise brièvement la cible avant de frapper" }],
    intention:"Professionnel. Connaît la Fatigue de l'Onde et sait attendre qu'elle monte.",
  },
};
