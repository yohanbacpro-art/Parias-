/* PARIAS — Deuxième vague du bestiaire
 *
 * Le premier bestiaire ne contenait que des bêtes. Un contrat de traque
 * commandité par une maison noble finissait donc toujours sur un ours ou une
 * wyverne, quel que soit son pitch : « retrouver une cible qui ne veut pas être
 * retrouvée » n'a jamais désigné un sanglier.
 *
 * Cette vague apporte surtout **ce contre quoi on se bat réellement dans ce
 * monde** : des hommes. Des brigands, des soldats de la Couronne, des hommes
 * d'armes de maison, des inquisiteurs de la Purge, des raiders elfes noirs, des
 * bandes peaux-vertes, des cavaliers khesh, des hordes d'Hommes-Bêtes. Plus
 * quelques bêtes qui manquaient aux régions froides et côtières.
 *
 * Chaque entrée porte deux champs que le premier bestiaire n'avait pas :
 *   famille : 'homme' | 'bete' | 'monstre' | 'mort' — sert au composeur de
 *             rencontres, qui n'envoie pas un ours escorter un sergent ;
 *   role    : 'piétaille' | 'soutien' | 'élite' | 'meneur' — décide de qui
 *             mène le groupe et de qui l'accompagne.
 *
 * Les valeurs suivent les mêmes paliers de Danger que la première vague.
 */

const BESTIARY_V2 = [
  /* ─────────────────────── HOMMES — la route et les bois ─────────────────── */
  { id:"BST_041", nom:"Détrousseur de route", danger:1, pv:20, defense:11, pa_par_tour:2, precision:3,
    famille:'homme', role:'piétaille',
    attaque_base:{ degats_base:4, de_variance:"1d4" }, capacites_speciales:[], utilise_fatigue:false,
    note:"Un couteau, de mauvaises chaussures, et l'habitude de compter combien vous êtes avant d'attaquer." },
  { id:"BST_042", nom:"Brigand aguerri", danger:2, pv:32, defense:12, pa_par_tour:3, precision:4,
    famille:'homme', role:'piétaille',
    attaque_base:{ degats_base:6, de_variance:"1d6" },
    capacites_speciales:[{ nom:"Coup bas", cout_pa:2, effet:"Frappe une cible déjà blessée avec un bonus de touche", limite:"illimité" }],
    utilise_fatigue:false, note:"Il a survécu à trois hivers sur les routes, ce que peu de gens honnêtes peuvent dire." },
  { id:"BST_043", nom:"Arbalétrier embusqué", danger:2, pv:26, defense:11, pa_par_tour:2, precision:6,
    famille:'homme', role:'soutien', portee:true,
    attaque_base:{ degats_base:8, de_variance:"1d6" },
    capacites_speciales:[{ nom:"Tir ajusté", cout_pa:3, effet:"Ignore une partie de la Défense", limite:"1 fois toutes les 2 tours" }],
    utilise_fatigue:false, note:"Il tire une fois, bien, puis recharge pendant que les autres meurent devant lui." },
  { id:"BST_044", nom:"Chef de bande", danger:3, pv:52, defense:13, pa_par_tour:3, precision:5,
    famille:'homme', role:'meneur',
    attaque_base:{ degats_base:8, de_variance:"1d8" },
    capacites_speciales:[{ nom:"Tenez la ligne", cout_pa:2, effet:"Ses hommes gagnent un bonus de touche pendant 2 tours", limite:"1 fois par combat" }],
    utilise_fatigue:false, note:"Ce n'est pas le plus fort de la bande. C'est celui que les autres écoutent." },

  /* ─────────────────────── HOMMES — la Couronne et les maisons ────────────── */
  { id:"BST_045", nom:"Homme d'armes de maison", danger:2, pv:34, defense:14, pa_par_tour:2, precision:4,
    famille:'homme', role:'piétaille',
    attaque_base:{ degats_base:6, de_variance:"1d6" }, capacites_speciales:[], utilise_fatigue:false,
    note:"Payé au mois, nourri, et parfaitement conscient qu'il n'est pas payé pour mourir." },
  { id:"BST_046", nom:"Sergent de la Couronne", danger:3, pv:50, defense:15, pa_par_tour:3, precision:5,
    famille:'homme', role:'meneur',
    attaque_base:{ degats_base:8, de_variance:"1d8" },
    capacites_speciales:[{ nom:"Ordre de tenir", cout_pa:2, effet:"Relève la Défense de tous ses hommes de 2 pendant 2 tours", limite:"1 fois toutes les 3 tours" }],
    utilise_fatigue:false, note:"Vingt ans de service, une hallebarde bien entretenue, et aucune curiosité pour ce que vous êtes." },
  { id:"BST_047", nom:"Piquier d'ordonnance", danger:3, pv:46, defense:15, pa_par_tour:2, precision:4,
    famille:'homme', role:'piétaille',
    attaque_base:{ degats_base:9, de_variance:"1d8" },
    capacites_speciales:[{ nom:"Pique en garde", cout_pa:1, effet:"Frappe le premier qui s'approche de lui ce tour-ci", limite:"illimité" }],
    utilise_fatigue:false, note:"Trois mètres de frêne et de fer. On ne le contourne pas, on l'endure." },
  { id:"BST_048", nom:"Chevalier de maison", danger:4, pv:76, defense:17, pa_par_tour:3, precision:7,
    famille:'homme', role:'élite',
    attaque_base:{ degats_base:12, de_variance:"1d10" },
    capacites_speciales:[{ nom:"Charge d'honneur", cout_pa:3, effet:"Dégâts lourds, ignore la garde", limite:"1 fois par combat" }],
    utilise_fatigue:false, note:"Armure de plates, cheval mort sous lui il y a une heure, et toujours pas décidé à reculer." },
  { id:"BST_049", nom:"Inquisiteur de la Purge", danger:4, pv:64, defense:15, pa_par_tour:3, precision:8,
    famille:'homme', role:'meneur',
    attaque_base:{ degats_base:10, de_variance:"1d10" },
    capacites_speciales:[{ nom:"Fers de contrainte", cout_pa:2, effet:"Alourdit l'Onde : la Fatigue de Yohan monte plus vite pendant 3 tours", limite:"1 fois par combat" }],
    utilise_fatigue:true, note:"Il a un registre, une liste, et quarante ans d'expérience dans la reconnaissance d'un Paria qui ment." },
  { id:"BST_050", nom:"Capitaine de la garde noire", danger:5, pv:112, defense:17, pa_par_tour:4, precision:9,
    famille:'homme', role:'meneur',
    attaque_base:{ degats_base:15, de_variance:"2d8" },
    capacites_speciales:[{ nom:"Exécution", cout_pa:4, effet:"Dégâts massifs contre une cible sous la moitié de ses PV", limite:"illimité" }],
    utilise_fatigue:true, note:"On ne l'envoie pas arrêter les gens. On l'envoie clore un dossier." },

  /* ─────────────────────── HOMMES — les autres peuples ────────────────────── */
  { id:"BST_051", nom:"Raider elfe noir", danger:3, pv:44, defense:14, pa_par_tour:4, precision:7,
    famille:'homme', role:'élite',
    attaque_base:{ degats_base:8, de_variance:"1d8" },
    capacites_speciales:[{ nom:"Lames jumelles", cout_pa:3, effet:"Deux frappes dans le même geste", limite:"1 fois toutes les 2 tours" }],
    utilise_fatigue:false, note:"Il est entré, il a pris ce qu'il venait prendre, et vous n'étiez pas censé être là." },
  { id:"BST_052", nom:"Sorcier de Valombre", danger:4, pv:56, defense:13, pa_par_tour:3, precision:8,
    famille:'homme', role:'soutien', portee:true,
    attaque_base:{ degats_base:11, de_variance:"1d10" },
    capacites_speciales:[{ nom:"Fil d'ombre", cout_pa:3, effet:"Dégâts et malus de Précision à une cible pendant 2 tours", limite:"illimité" }],
    utilise_fatigue:true, note:"Il ne se bat pas : il rend le combat plus difficile pour tout le monde sauf les siens." },
  { id:"BST_053", nom:"Guerrier peau-verte", danger:2, pv:38, defense:12, pa_par_tour:3, precision:3,
    famille:'homme', role:'piétaille',
    attaque_base:{ degats_base:7, de_variance:"1d6" }, capacites_speciales:[], utilise_fatigue:false,
    note:"Grand, bruyant, et très supérieur à ce que la Couronne raconte dans ses rapports." },
  { id:"BST_054", nom:"Casse-fer peau-verte", danger:4, pv:80, defense:13, pa_par_tour:3, precision:5,
    famille:'homme', role:'élite',
    attaque_base:{ degats_base:13, de_variance:"1d10" },
    capacites_speciales:[{ nom:"Coup à deux mains", cout_pa:3, effet:"Dégâts lourds, réduit la Défense de la cible de 2 pendant 2 tours", limite:"illimité" }],
    utilise_fatigue:false, note:"Il porte une masse faite d'une enclume naine et d'un essieu de charrette." },
  { id:"BST_055", nom:"Chaman de la horde", danger:3, pv:42, defense:12, pa_par_tour:3, precision:6,
    famille:'homme', role:'soutien', portee:true,
    attaque_base:{ degats_base:7, de_variance:"1d8" },
    capacites_speciales:[{ nom:"Cri de la horde", cout_pa:2, effet:"Soigne 10 PV à un allié et le relance", limite:"1 fois toutes les 2 tours" }],
    utilise_fatigue:true, note:"Tant qu'il chante, ceux qui tombent se relèvent. Il faut le faire taire en premier." },
  { id:"BST_056", nom:"Cavalier khesh démonté", danger:3, pv:46, defense:13, pa_par_tour:4, precision:6,
    famille:'homme', role:'piétaille',
    attaque_base:{ degats_base:8, de_variance:"1d8" }, capacites_speciales:[], utilise_fatigue:false,
    note:"On lui a tué son cheval. C'est la pire chose qui puisse arriver à quelqu'un d'autre." },
  { id:"BST_057", nom:"Archer des lisières", danger:3, pv:40, defense:13, pa_par_tour:3, precision:9,
    famille:'homme', role:'soutien', portee:true,
    attaque_base:{ degats_base:9, de_variance:"1d8" },
    capacites_speciales:[{ nom:"Trois flèches", cout_pa:3, effet:"Trois tirs faibles répartis sur les cibles visibles", limite:"1 fois toutes les 2 tours" }],
    utilise_fatigue:false, note:"Il vous a vu entrer dans la clairière il y a un quart d'heure." },
  { id:"BST_058", nom:"Porteur de cornes", danger:3, pv:54, defense:12, pa_par_tour:3, precision:4,
    famille:'homme', role:'piétaille',
    attaque_base:{ degats_base:9, de_variance:"1d8" }, capacites_speciales:[], utilise_fatigue:false,
    note:"Un Homme-Bête des Pierres, qui se bat pour une raison qu'aucun humain n'a jamais pris la peine d'écouter." },
  { id:"BST_059", nom:"Doyen des Pierres", danger:5, pv:118, defense:15, pa_par_tour:4, precision:8,
    famille:'homme', role:'meneur',
    attaque_base:{ degats_base:15, de_variance:"2d8" },
    capacites_speciales:[{ nom:"Rappel du premier rugissement", cout_pa:3, effet:"Toute la harde regagne 12 PV et frappe avec un bonus ce tour-ci", limite:"1 fois par combat" }],
    utilise_fatigue:true, note:"Il se souvient d'avant la Purge, et il n'a pas l'intention de laisser recommencer." },
  { id:"BST_060", nom:"Marteau de Kar-Durak", danger:4, pv:88, defense:18, pa_par_tour:2, precision:6,
    famille:'homme', role:'élite',
    attaque_base:{ degats_base:13, de_variance:"1d10" },
    capacites_speciales:[{ nom:"Mur de boucliers", cout_pa:2, effet:"Encaisse à la place de l'allié le plus proche pendant 2 tours", limite:"illimité" }],
    utilise_fatigue:false, note:"Il tient une porte depuis quarante ans. Vous n'êtes qu'un incident de plus." },

  /* ─────────────────────── MERCENAIRES ET CHASSEURS ───────────────────────── */
  { id:"BST_061", nom:"Épéiste à gages", danger:3, pv:48, defense:14, pa_par_tour:3, precision:6,
    famille:'homme', role:'piétaille',
    attaque_base:{ degats_base:9, de_variance:"1d8" }, capacites_speciales:[], utilise_fatigue:false,
    note:"Il ne vous en veut pas. Il a été payé la veille, et il fera correctement son travail." },
  { id:"BST_062", nom:"Traqueur de Parias", danger:4, pv:66, defense:15, pa_par_tour:4, precision:8,
    famille:'homme', role:'élite',
    attaque_base:{ degats_base:11, de_variance:"1d10" },
    capacites_speciales:[{ nom:"Filet lesté", cout_pa:2, effet:"Immobilise brièvement et empêche un pouvoir de l'Onde le tour suivant", limite:"1 fois par combat" }],
    utilise_fatigue:true, note:"Il en a pris onze. Il sait exactement combien de temps un homme peut tenir l'Onde avant de s'écrouler." },
  { id:"BST_063", nom:"Duelliste de cour", danger:4, pv:60, defense:16, pa_par_tour:4, precision:9,
    famille:'homme', role:'élite',
    attaque_base:{ degats_base:10, de_variance:"1d10" },
    capacites_speciales:[{ nom:"Riposte", cout_pa:1, effet:"Rend la moitié des dégâts subis au prochain assaut", limite:"illimité" }],
    utilise_fatigue:false, note:"Il tue proprement, en public, et il facture la propreté." },

  /* ─────────────────────── BÊTES ET MONSTRES ─────────────────────────────── */
  { id:"BST_064", nom:"Meute affamée", danger:2, pv:28, defense:12, pa_par_tour:3, precision:4,
    famille:'bete', role:'piétaille',
    attaque_base:{ degats_base:5, de_variance:"1d6" },
    capacites_speciales:[{ nom:"En nombre", cout_pa:1, effet:"Bonus de touche tant qu'un autre loup attaque la même cible", limite:"illimité" }],
    utilise_fatigue:false, note:"L'hiver a été long. Ils n'ont plus peur du feu depuis trois semaines." },
  { id:"BST_065", nom:"Élan des tourbières", danger:3, pv:56, defense:12, pa_par_tour:2, precision:4,
    famille:'bete', role:'piétaille',
    attaque_base:{ degats_base:10, de_variance:"1d8" }, capacites_speciales:[], utilise_fatigue:false,
    note:"Une tonne d'animal qui n'attaque que si on le regarde trop longtemps. On le regarde toujours trop longtemps." },
  { id:"BST_066", nom:"Chien de fosse", danger:2, pv:34, defense:11, pa_par_tour:3, precision:4,
    famille:'bete', role:'piétaille',
    attaque_base:{ degats_base:6, de_variance:"1d6" }, capacites_speciales:[], utilise_fatigue:false,
    note:"Élevé pour l'Arène, revendu quand il a cessé de plaire, et rien n'a été retiré de ce qu'on lui a appris." },
  { id:"BST_067", nom:"Crabe des épaves", danger:3, pv:58, defense:16, pa_par_tour:2, precision:4,
    famille:'bete', role:'piétaille',
    attaque_base:{ degats_base:8, de_variance:"1d8" }, capacites_speciales:[], utilise_fatigue:false,
    note:"Il vit dans une coque échouée depuis une génération et considère la plage comme sienne." },
  { id:"BST_068", nom:"Noyeur des quais", danger:4, pv:72, defense:13, pa_par_tour:3, precision:6,
    famille:'monstre', role:'élite',
    attaque_base:{ degats_base:11, de_variance:"1d10" },
    capacites_speciales:[{ nom:"Prise et fond", cout_pa:3, effet:"Entraîne la cible sous l'eau : elle perd son prochain tour", limite:"1 fois par combat" }],
    utilise_fatigue:true, note:"Port-Noir perd deux hommes par hiver et n'a jamais déclaré pourquoi." },
  { id:"BST_069", nom:"Ombre de la Cicatrice", danger:5, pv:100, defense:16, pa_par_tour:4, precision:9,
    famille:'monstre', role:'meneur',
    attaque_base:{ degats_base:14, de_variance:"2d8" },
    capacites_speciales:[{ nom:"Aspiration de l'Onde", cout_pa:3, effet:"Ajoute 12 de Fatigue à Yohan et se soigne d'autant", limite:"1 fois toutes les 2 tours" }],
    utilise_fatigue:true, note:"Ce qui est resté quand la magie a brûlé la terre et que rien n'a repoussé." },
  { id:"BST_070", nom:"Charognard cuirassé", danger:3, pv:50, defense:15, pa_par_tour:2, precision:5,
    famille:'bete', role:'piétaille',
    attaque_base:{ degats_base:8, de_variance:"1d8" }, capacites_speciales:[], utilise_fatigue:false,
    note:"Il suit les colonnes depuis trois jours en attendant qu'il y ait quelque chose à manger." },
  { id:"BST_071", nom:"Marcheur de gibet", danger:2, pv:36, defense:11, pa_par_tour:2, precision:3,
    famille:'mort', role:'piétaille',
    attaque_base:{ degats_base:6, de_variance:"1d6" }, capacites_speciales:[], utilise_fatigue:false,
    note:"On l'a laissé au gibet trop longtemps, sur une terre qui ne pardonne pas ce genre de négligence." },
  { id:"BST_072", nom:"Porte-lanterne des morts", danger:4, pv:68, defense:14, pa_par_tour:3, precision:7,
    famille:'mort', role:'soutien', portee:true,
    attaque_base:{ degats_base:10, de_variance:"1d10" },
    capacites_speciales:[{ nom:"Relève", cout_pa:3, effet:"Remet debout un mort tombé avec un quart de ses PV", limite:"1 fois par combat" }],
    utilise_fatigue:true, note:"Tant que la lanterne brûle, ce qui tombe ne reste pas tombé." },
  { id:"BST_073", nom:"Colosse de tourbe", danger:5, pv:130, defense:16, pa_par_tour:3, precision:7,
    famille:'monstre', role:'élite',
    attaque_base:{ degats_base:16, de_variance:"2d8" },
    capacites_speciales:[{ nom:"Se refaire", cout_pa:2, effet:"Regagne 15 PV en aspirant la boue autour de lui", limite:"1 fois toutes les 3 tours" }],
    utilise_fatigue:false, note:"On l'a tué deux fois. La tourbe l'a rendu deux fois." },
  { id:"BST_074", nom:"Reine des galeries", danger:5, pv:108, defense:15, pa_par_tour:4, precision:8,
    famille:'monstre', role:'meneur',
    attaque_base:{ degats_base:14, de_variance:"2d8" },
    capacites_speciales:[{ nom:"Ponte", cout_pa:3, effet:"Fait apparaître deux araignées pâles à ses côtés", limite:"1 fois par combat" }],
    utilise_fatigue:true, note:"Kar-Durak a muré quatre galeries à cause d'elle et n'a jamais rouvert." },
  { id:"BST_075", nom:"Veilleur de la Purge", danger:6, pv:190, defense:18, pa_par_tour:5, precision:10,
    famille:'monstre', role:'meneur',
    attaque_base:{ degats_base:21, de_variance:"3d10" },
    capacites_speciales:[{ nom:"Sentence", cout_pa:4, effet:"Dégâts massifs et 20 de Fatigue imposée à tout porteur de l'Onde", limite:"1 fois par combat" }],
    utilise_fatigue:true, note:"Une chose qu'on a construite pour finir le travail, et qu'on a oublié d'éteindre." },
];

/* On complète les entrées et on les verse dans le bestiaire principal, pour
 * que tout ce qui lit BESTIARY_FULL — combat, contrats, campagnes, Codex — les
 * voie sans changer d'une ligne. */
BESTIARY_V2.forEach(b => {
  b.attaque_base.formule = `${b.attaque_base.degats_base} + ${b.attaque_base.de_variance} + Niveau_zone`;
  b.note_originale = b.note;
  BESTIARY_FULL.push(b);
});

/* La première vague n'avait ni famille ni rôle : on les lui donne, sinon le
 * composeur de rencontres ne saurait pas quoi faire des quarante premières. */
const FAMILLE_V1 = {
  BST_012:'monstre', BST_020:'monstre', BST_023:'mort', BST_024:'mort', BST_025:'monstre',
  BST_026:'homme', BST_037:'monstre', BST_038:'monstre', BST_040:'monstre', BST_017:'monstre',
  BST_033:'monstre', BST_015:'monstre', BST_034:'monstre', BST_016:'monstre', BST_013:'monstre',
  BST_010:'monstre', BST_011:'monstre', BST_006:'monstre', BST_008:'monstre', BST_009:'monstre',
  BST_018:'bete', BST_019:'bete', BST_021:'bete', BST_022:'bete',
};
BESTIARY_FULL.forEach(b => {
  if(!b.famille) b.famille = FAMILLE_V1[b.id] || 'bete';
  if(!b.role) b.role = b.danger >= 6 ? 'meneur' : (b.danger >= 4 ? 'élite' : 'piétaille');
});
