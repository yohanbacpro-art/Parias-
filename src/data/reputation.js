/* PARIAS — Réputation auprès des peuples
 *
 * À ne pas confondre avec les **tensions** (lore.js / game.js) : la tension est
 * la trajectoire propre d'un peuple, que Yohan la regarde ou non. La réputation,
 * c'est ce que ce peuple pense de *lui*.
 *
 * Elle va de −100 à +100 et ne bouge que par des choix — jamais par le temps qui
 * passe. Ce qu'elle change se voit tout de suite :
 *
 *   · les prix, chez les marchands de ce peuple ;
 *   · ce qu'on accepte de vous vendre — un peuple qui vous doit quelque chose
 *     sort ses vraies pièces de l'arrière-boutique ;
 *   · l'accueil : au fond du mépris, on ne vous sert plus, et on vous attend ;
 *   · des branches d'événements qui ne s'ouvrent qu'à ceux qu'on estime.
 *
 * Les Parias sont le seul peuple où Yohan part avec un crédit : il est des leurs,
 * qu'il le veuille ou non.
 */

const REPUTATION_DEPART = {
  humains:0, parias:10, khesh:0, elfes:0,
  elfes_noirs:0, nains:0, peaux_vertes:0, hommes_betes:0,
};

/* Les rangs, du plus bas au plus haut. `min` est inclusif ; on lit le tableau
 * à l'envers et on garde le premier rang atteint. */
const RANGS_REPUTATION = [
  { min:-100, id:'ennemi',   nom:"Ennemi juré",       prix:null, hostile:true,
    note:"On ne vous vend rien, et quelqu'un finira par venir vous le dire en face." },
  { min:-60,  id:'honni',    nom:"Honni",             prix:1.6,  hostile:false,
    note:"On vous sert parce que votre or est valable. On vous compte le double." },
  { min:-25,  id:'mefiance', nom:"Sous surveillance", prix:1.25, hostile:false,
    note:"On vous sert du bout des doigts, et on se souvient de votre visage." },
  { min:-9,   id:'inconnu',  nom:"Sans histoire",     prix:1,    hostile:false,
    note:"Vous n'êtes personne pour eux, ce qui est déjà mieux que beaucoup." },
  { min:30,   id:'estime',   nom:"Bien vu",           prix:0.85, hostile:false,
    note:"On vous fait un prix, et on sort ce qu'on ne montre pas à tout le monde." },
  { min:70,   id:'allie',    nom:"Des leurs",         prix:0.7,  hostile:false,
    note:"Vous avez droit à ce qu'ils gardent pour eux — et à ce qu'ils ne vendent pas." },
];

/* Quel peuple tient quel lieu. Le champ `peuple_dominant` des lieux est du texte
 * libre hérité du Content Pack : cette table est la référence du moteur.
 * `null` = terre de personne, aucune réputation ne s'y applique. */
const LOC_PEUPLE = {
  LOC_001:'parias',       // Karlsberg — Les Ruines du Loup
  LOC_002:'humains',      // Fort-aux-Princes
  LOC_003:null,           // Mont-Draken
  LOC_004:'humains',      // Capitale d'Astrah
  LOC_005:'khesh',        // Les Dunes Khesh
  LOC_006:'elfes',        // La Cour lumineuse d'Eltharion
  LOC_007:'elfes_noirs',  // La Cour d'Anarion
  LOC_008:'nains',        // Kar-Durak
  LOC_009:'peaux_vertes', // Les Profondeurs Vertes
  LOC_010:'hommes_betes', // La Forêt des Mille Cornes
  LOC_011:null,           // La Route Grise
  LOC_012:null,           // Le Défilé des Souffrances
  LOC_013:null,           // Les Îles Interdites
  LOC_014:'parias',       // La Cicatrice
  LOC_015:'khesh',        // Le Cimetière des Dragons de Sable
  LOC_016:'humains',      // Port-Noir
  LOC_017:'humains',      // L'Arène Rouge
  LOC_018:null,           // Les Champs de Cendre
  LOC_019:null,           // La Côte des Dents
  LOC_020:'hommes_betes', // Les Pierres du Premier Rugissement
};

/* Ce qu'on dit de Yohan chez eux, selon le rang atteint. Affiché sur l'écran
 * des Chroniques : une réputation qui n'est qu'un chiffre ne se joue pas. */
const REPUTATION_VOIX = {
  humains: {
    ennemi:"Astrah a mis son nom sur une liste, et pas celle des invités.",
    honni:"Dans les garnisons impériales, on cite son nom pour dire ce qu'il ne faut pas devenir.",
    mefiance:"Les officiers savent qui il est. Ils n'ont pas encore décidé quoi en faire.",
    inconnu:"Un Paria de plus dont l'Empire n'a pas encore le dossier complet.",
    estime:"Certains capitaines diraient volontiers du bien de lui, à voix basse et hors service.",
    allie:"Il y a des garnisons entières qui ne le verront jamais passer, et le noteront ainsi.",
  },
  parias: {
    ennemi:"Les siens le tiennent pour pire que l'Empire : lui avait le choix.",
    honni:"Chez les Parias, on ferme les volets quand il passe.",
    mefiance:"Ils ne savent pas s'il les relève ou s'il se sert d'eux.",
    inconnu:"Un nom de plus dans une liste de survivants.",
    estime:"On dit de lui qu'il n'a encore lâché personne.",
    allie:"Là où il passe, on lui donne le lit du fond et on ne pose pas de question.",
  },
  khesh: {
    ennemi:"Les clans ont une dette de sang à son nom, et les Khesh ne les oublient pas.",
    honni:"Aux Dunes, son nom se dit avec le geste qui écarte le mauvais sort.",
    mefiance:"Les clans l'observent. Ils observent longtemps.",
    inconnu:"Un étranger de plus qui ne survivrait pas trois jours seul.",
    estime:"Deux clans lui doivent de l'eau. C'est plus que ça n'en a l'air.",
    allie:"On lui a donné un nom khesh. Personne ne lui a dit lequel.",
  },
  elfes: {
    ennemi:"Eltharion a fermé ses routes à son nom, ce qui est leur façon de déclarer la guerre.",
    honni:"À la Cour lumineuse, on l'appelle « l'incident ».",
    mefiance:"On l'a inscrit quelque part. Les elfes inscrivent tout.",
    inconnu:"Trop bref pour qu'ils s'en occupent.",
    estime:"Quelques-uns le reçoivent, ce qui pour un elfe demande une décision.",
    allie:"Une branche de la Cour parle de lui comme d'un ami, et ne le dit qu'entre soi.",
  },
  elfes_noirs: {
    ennemi:"À Valombre, quelqu'un a mis un prix sur lui et l'a payé d'avance.",
    honni:"Anarion le trouve grossier, ce qui chez lui précède les mauvaises nouvelles.",
    mefiance:"La Cour souterraine le trouve intéressant, ce qui n'est jamais bon signe.",
    inconnu:"Ils n'ont pas encore décidé de son prix.",
    estime:"On lui ouvre certaines portes, et on note lesquelles.",
    allie:"Anarion l'invite. Cela reste une invitation d'Anarion.",
  },
  nains: {
    ennemi:"Kar-Durak a gravé son nom dans la colonne des dettes impayées.",
    honni:"Aux Grandes Portes, on ne lui ouvre plus.",
    mefiance:"Les nains lui font crédit, le crédit le plus court qu'ils accordent.",
    inconnu:"Un homme de plus qui ne sait pas reconnaître du bon acier.",
    estime:"Une galerie porte sa marque au registre des passages autorisés.",
    allie:"Gorm boit à sa santé, et fait boire les autres, ce qui vaut traité.",
  },
  peaux_vertes: {
    ennemi:"Les tribus se racontent comment le tuer. C'est déjà une forme de respect.",
    honni:"Dans les Profondeurs, son nom sert à faire peur aux jeunes.",
    mefiance:"Ils savent qu'il frappe fort. Ils n'ont pas décidé s'il tient debout.",
    inconnu:"Trop maigre pour valoir une chasse.",
    estime:"Deux chefs de tribu ont accepté de ne pas le manger. C'est un traité.",
    allie:"Une tribu porte sa marque sur ses boucliers, ce qui n'était jamais arrivé.",
  },
  hommes_betes: {
    ennemi:"La forêt a son odeur en mémoire, et la forêt ne pardonne pas.",
    honni:"Les hardes s'écartent de sa route, puis se referment derrière lui.",
    mefiance:"Les Pierres ont enregistré son passage. Elles enregistrent tout.",
    inconnu:"Une odeur d'homme parmi d'autres.",
    estime:"Une harde le laisse traverser sans le suivre.",
    allie:"On lui a rugi dessus une fois, ce qui chez eux est une invitation à dîner.",
  },
};
