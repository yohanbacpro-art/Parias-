/* PARIAS — Troupes
 *
 * L'armée de Karlsberg. Contrairement au bestiaire (des individus), une unité
 * est un effectif : elle ne « meurt » pas, elle fond. À zéro homme elle est
 * dissoute et disparaît du rôle.
 *
 * Triangle tactique — chacun bat le suivant :
 *   cavalerie  >  archers  >  infanterie  >  cavalerie
 * Une unité qui affronte sa proie frappe à +50 % ; face à son prédateur, −25 %.
 *
 * `renomRequis` : personne ne suit un inconnu. Le Renom se gagne aux contrats
 * et aux batailles (voir hero.renom).
 */

const UNIT_TYPES = {

  lanciers: {
    id:"lanciers", nom:"Lanciers de Karlsberg", categorie:"infanterie",
    effectif:60, attaque:7, defense:12, moral:10, portee:0,
    prix:180, entretien:12, renomRequis:0,
    desc:"Piquiers de levée. Rien d'extraordinaire, sinon qu'ils tiennent la ligne et brisent une charge.",
  },
  archers: {
    id:"archers", nom:"Archers des Friches", categorie:"archers",
    effectif:40, attaque:10, defense:6, moral:8, portee:1,
    prix:220, entretien:16, renomRequis:0,
    desc:"Frappent sans être frappés tant qu'on les tient à distance. Effondrent au corps à corps.",
  },
  cavalerie: {
    id:"cavalerie", nom:"Cavaliers de la Route Grise", categorie:"cavalerie",
    effectif:30, attaque:13, defense:9, moral:11, portee:0,
    prix:340, entretien:26, renomRequis:15,
    desc:"Chargent, débordent, taillent les tirailleurs. À jeter sur des archers, jamais sur des piques.",
  },
  veterans: {
    id:"veterans", nom:"Vétérans d'Astrah", categorie:"infanterie",
    effectif:45, attaque:12, defense:16, moral:14, portee:0,
    prix:480, entretien:34, renomRequis:35,
    desc:"Des hommes qui ont déjà tenu une ligne qui cédait. Ils coûtent cher parce qu'ils reviennent.",
  },
  arbaletriers: {
    id:"arbaletriers", nom:"Arbalétriers de Kar-Durak", categorie:"archers",
    effectif:35, attaque:15, defense:9, moral:12, portee:1,
    prix:520, entretien:38, renomRequis:45,
    desc:"Lents à recharger, mais un carreau nain traverse à peu près tout ce qui se présente.",
    requisFlag:"gorm_ami",
  },
  khesh: {
    id:"khesh", nom:"Lanciers Khesh", categorie:"cavalerie",
    effectif:35, attaque:16, defense:11, moral:15, portee:0,
    prix:600, entretien:44, renomRequis:55,
    desc:"Ils ne servent personne — ils honorent une dette. C'est plus fiable qu'une solde.",
    requisFlag:"kemval_allie",
  },
  parias: {
    id:"parias", nom:"Les Sans-Nom", categorie:"infanterie",
    effectif:20, attaque:20, defense:14, moral:18, portee:1,
    prix:0, entretien:0, renomRequis:0,
    desc:"Une poignée de porteurs de l'Onde qu'Alycia tenait cachés. Ils ne se recrutent pas : ils se méritent.",
    requisFlag:"cause_parias", unique:true,
  },
  /* ---- Troupes adverses : jamais recrutables, seulement rencontrées ---- */
  milice: {
    id:"milice", nom:"Milice levée", categorie:"infanterie", ennemi:true,
    effectif:70, attaque:5, defense:8, moral:6, portee:0,
    desc:"Des paysans à qui l'on a donné une pique la semaine dernière.",
  },
  pillards: {
    id:"pillards", nom:"Pillards", categorie:"infanterie", ennemi:true,
    effectif:50, attaque:9, defense:7, moral:8, portee:0,
    desc:"Ils frappent fort et se dispersent dès que ça tourne mal.",
  },
  mercenaires: {
    id:"mercenaires", nom:"Compagnie franche", categorie:"infanterie", ennemi:true,
    effectif:55, attaque:11, defense:13, moral:11, portee:0,
    desc:"Payés d'avance. Ils tiendront exactement le temps pour lequel on a payé.",
  },
  archers_merc: {
    id:"archers_merc", nom:"Tirailleurs à gages", categorie:"archers", ennemi:true,
    effectif:40, attaque:11, defense:6, moral:8, portee:1,
    desc:"Ils visent bien tant que personne ne s'approche.",
  },
  cavalerie_imp: {
    id:"cavalerie_imp", nom:"Cavalerie d'Astrah", categorie:"cavalerie", ennemi:true,
    effectif:35, attaque:15, defense:12, moral:13, portee:0,
    desc:"Bien montée, bien payée, bien commandée. Le vrai problème d'un champ ouvert.",
  },
  garde_imperiale: {
    id:"garde_imperiale", nom:"Garde impériale", categorie:"infanterie", ennemi:true,
    effectif:50, attaque:15, defense:18, moral:16, portee:0,
    desc:"Ceux-là ne rompent pas. Il faut les vider un par un.",
  },
  veterans_imp: {
    id:"veterans_imp", nom:"Vétérans de Lucius", categorie:"infanterie", ennemi:true,
    effectif:45, attaque:14, defense:16, moral:15, portee:0,
    desc:"Formés par un homme qui considère l'imprévu comme une faute d'organisation.",
  },
  horde: {
    id:"horde", nom:"Horde Peau-Verte", categorie:"infanterie", ennemi:true,
    effectif:90, attaque:10, defense:6, moral:12, portee:0,
    desc:"Le nombre comme doctrine. Effrayant tant que ça avance.",
  },
  elfes_noirs: {
    id:"elfes_noirs", nom:"Lames de la Cour Noire", categorie:"archers", ennemi:true,
    effectif:35, attaque:17, defense:10, moral:14, portee:1,
    desc:"Élégants, précis, et parfaitement dénués de scrupules.",
  },
};

/* Ce qui peut être recruté — le reste ne se rencontre que sur un champ de bataille. */
function unitesRecrutables(){
  return Object.values(UNIT_TYPES).filter(u => !u.ennemi);
}

/* Qui bat qui. */
const TRIANGLE = { cavalerie:"archers", archers:"infanterie", infanterie:"cavalerie" };

function avantageContre(catA, catB){
  if(TRIANGLE[catA] === catB) return 1.5;   // proie
  if(TRIANGLE[catB] === catA) return 0.75;  // prédateur
  return 1;
}

/* Terrains de front : où l'on se bat compte autant que qui. */
const TERRAINS = {
  plaine:  {nom:"Plaine",        cav:1.25, arc:1.0,  inf:1.0,  desc:"Terrain ouvert — la cavalerie y donne sa pleine mesure."},
  colline: {nom:"Colline",       cav:0.8,  arc:1.3,  inf:1.1,  desc:"Position dominante — les tirs portent, les charges s'essoufflent."},
  bois:    {nom:"Bois",          cav:0.6,  arc:0.8,  inf:1.2,  desc:"Couvert dense — l'infanterie s'y accroche, le reste s'y perd."},
  gue:     {nom:"Gué",           cav:0.7,  arc:1.1,  inf:0.9,  desc:"Passage étroit — on n'y engage jamais tout son monde."},
  ruines:  {nom:"Ruines",        cav:0.5,  arc:1.15, inf:1.25, desc:"Murs éventrés — chaque pan de mur vaut une compagnie."},
  defile:  {nom:"Défilé",        cav:0.5,  arc:1.2,  inf:1.3,  desc:"Gorge encaissée — le nombre n'y sert plus à rien."},
};

/* Ordres donnés à un front. Le vrai choix tactique du tour. */
const ORDRES = {
  tenir:    {nom:"Tenir",     atk:0.8, def:1.4, moral:+1,
             desc:"Encaisser sans rompre. Peu de pertes infligées, peu subies."},
  charger:  {nom:"Charger",   atk:1.5, def:0.7, moral:0,
             desc:"Tout donner. Écrase ou se fait écraser."},
  harceler: {nom:"Harceler",  atk:1.0, def:1.1, moral:0, tirSeul:true,
             desc:"Tirer et reculer. Seules les unités à distance frappent, mais elles ne sont pas rendues."},
  replier:  {nom:"Se replier", atk:0.3, def:1.2, moral:-2, repli:true,
             desc:"Céder le front pour sauver les hommes. Le moral en paie le prix."},
};
