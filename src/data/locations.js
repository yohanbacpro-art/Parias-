/* PARIAS — Lieux de Vardhen (Content Pack V1.4)
 * familles_evenements_compatibles : filtre les événements tirables sur place.
 * LOC_COORDS : position en % sur le canevas SVG 1000x650 de la carte du monde.
 */
const LOCATIONS = [{"id": "LOC_001", "nom": "Karlsberg — Les Ruines du Loup", "peuple_dominant": "Paria (ruines)", "familles_evenements_compatibles": ["PARIA", "ONDE", "VOYAGE"], "danger_range": {"min": 2, "max": 4}, "description_courte": "Ancien siège Karlsberg, rasé pendant la Grande Purge"}, {"id": "LOC_002", "nom": "Fort-aux-Princes", "peuple_dominant": "Humain", "familles_evenements_compatibles": ["VILLE", "POLITIQUE", "CONTRAT", "VOYAGE"], "danger_range": {"min": 1, "max": 3}, "description_courte": "Forteresse-frontière, carrefour marchands/espions/mercenaires"}, {"id": "LOC_003", "nom": "Mont-Draken", "peuple_dominant": "Neutre / dragons", "familles_evenements_compatibles": ["VOYAGE", "ONDE"], "danger_range": {"min": 4, "max": 6}, "description_courte": "Montagne sacrée, dragon endormi dans ses veines de feu"}, {"id": "LOC_004", "nom": "Capitale d'Astrah", "peuple_dominant": "Humain", "familles_evenements_compatibles": ["VILLE", "POLITIQUE", "TAVERNE", "CONTRAT"], "danger_range": {"min": 1, "max": 3}, "description_courte": "Cœur du pouvoir humain, intrigues et guildes"}, {"id": "LOC_005", "nom": "Les Dunes Khesh", "peuple_dominant": "Khesh", "familles_evenements_compatibles": ["KHESH", "VOYAGE", "GUERRE"], "danger_range": {"min": 2, "max": 4}, "description_courte": "Terres arides, tempêtes de sable, cités perdues"}, {"id": "LOC_006", "nom": "La Cour lumineuse d'Eltharion", "peuple_dominant": "Elfe", "familles_evenements_compatibles": ["ELFE", "POLITIQUE"], "danger_range": {"min": 1, "max": 3}, "description_courte": "Capitale des Elfes Sylvains, magie omniprésente"}, {"id": "LOC_007", "nom": "La Cour d'Anarion", "peuple_dominant": "Humain (îles/mers)", "familles_evenements_compatibles": ["VILLE", "POLITIQUE", "CONTRAT"], "danger_range": {"min": 1, "max": 3}, "description_courte": "Cour du roi bâtisseur, marins et diplomates"}, {"id": "LOC_008", "nom": "Kar-Durak", "peuple_dominant": "Nain", "familles_evenements_compatibles": ["NAIN", "VOYAGE"], "danger_range": {"min": 2, "max": 4}, "description_courte": "Bastion nain creusé dans la pierre éternelle"}, {"id": "LOC_009", "nom": "Les Profondeurs Vertes", "peuple_dominant": "Peau-Verte", "familles_evenements_compatibles": ["PEAU_VERTE", "GUERRE"], "danger_range": {"min": 2, "max": 5}, "description_courte": "Territoires souterrains, loi du plus fort"}, {"id": "LOC_010", "nom": "La Forêt des Mille Cornes", "peuple_dominant": "Homme-Bête", "familles_evenements_compatibles": ["HOMME_BETE", "VOYAGE"], "danger_range": {"min": 2, "max": 4}, "description_courte": "Terres des hardes, domaine des Hommes-Bêtes"}, {"id": "LOC_011", "nom": "La Route Grise", "peuple_dominant": "Neutre / frontière", "familles_evenements_compatibles": ["VOYAGE", "CONTRAT"], "danger_range": {"min": 1, "max": 3}, "description_courte": "Route commerciale entre terres sauvages et royaumes"}, {"id": "LOC_012", "nom": "Le Défilé des Souffrances", "peuple_dominant": "Neutre / dangereux", "familles_evenements_compatibles": ["VOYAGE", "GUERRE"], "danger_range": {"min": 3, "max": 5}, "description_courte": "Passage mortel, embuscades fréquentes"}, {"id": "LOC_013", "nom": "Les Îles Interdites", "peuple_dominant": "Inconnu", "familles_evenements_compatibles": ["ONDE", "VOYAGE"], "danger_range": {"min": 3, "max": 6}, "description_courte": "Mystère, anomalies magiques"}, {"id": "LOC_014", "nom": "La Cicatrice", "peuple_dominant": "Onde", "familles_evenements_compatibles": ["ONDE", "PARIA"], "danger_range": {"min": 3, "max": 6}, "description_courte": "Cicatrice de l'Onde, origine de la magie Paria"}, {"id": "LOC_015", "nom": "Le Cimetière des Dragons de Sable", "peuple_dominant": "Khesh / dragons", "familles_evenements_compatibles": ["KHESH", "ONDE"], "danger_range": {"min": 4, "max": 6}, "description_courte": "Ossements géants, dragons des sables"}, {"id": "LOC_016", "nom": "Port-Noir", "peuple_dominant": "Humain (hors-la-loi)", "familles_evenements_compatibles": ["VILLE", "TAVERNE", "CONTRAT"], "danger_range": {"min": 1, "max": 4}, "description_courte": "Port de contrebandiers et mercenaires"}, {"id": "LOC_017", "nom": "L'Arène Rouge", "peuple_dominant": "Humain", "familles_evenements_compatibles": ["VILLE", "CONTRAT"], "danger_range": {"min": 1, "max": 5}, "description_courte": "Arène de duels et de combats organisés"}, {"id": "LOC_018", "nom": "Les Champs de Cendre", "peuple_dominant": "Guerre / ravagé", "familles_evenements_compatibles": ["GUERRE", "POLITIQUE"], "danger_range": {"min": 2, "max": 5}, "description_courte": "Terres brûlées par les conflits passés"}, {"id": "LOC_019", "nom": "La Côte des Dents", "peuple_dominant": "Neutre / dangereux", "familles_evenements_compatibles": ["VOYAGE", "ONDE"], "danger_range": {"min": 2, "max": 4}, "description_courte": "Côte rocheuse, naufrages et créatures marines"}, {"id": "LOC_020", "nom": "Les Pierres du Premier Rugissement", "peuple_dominant": "Homme-Bête (sanctuaire)", "familles_evenements_compatibles": ["HOMME_BETE", "ONDE"], "danger_range": {"min": 3, "max": 5}, "description_courte": "Sanctuaire ancestral des Hommes-Bêtes"}];

// Positions en pourcentage (0-100) sur le canevas 1000x650, disposées par thématique de région
const LOC_COORDS = {
  LOC_001: {x:26, y:44}, // Karlsberg — ruines, centre-ouest
  LOC_002: {x:41, y:16}, // Fort-aux-Princes — frontière nord
  LOC_003: {x:64, y:9},  // Mont-Draken — montagnes nord
  LOC_004: {x:47, y:46}, // Capitale d'Astrah — cœur humain
  LOC_005: {x:76, y:70}, // Dunes Khesh — désert sud-est
  LOC_006: {x:14, y:58}, // Cour lumineuse d'Eltharion — forêt ouest
  LOC_007: {x:47, y:85}, // Cour d'Anarion — côte sud
  LOC_008: {x:70, y:24}, // Kar-Durak — montagnes nord-est
  LOC_009: {x:7,  y:44}, // Profondeurs Vertes — souterrains ouest
  LOC_010: {x:21, y:76}, // Forêt des Mille Cornes — sud-ouest
  LOC_011: {x:35, y:32}, // Route Grise — route centrale
  LOC_012: {x:59, y:32}, // Défilé des Souffrances — col
  LOC_013: {x:60, y:92}, // Îles Interdites — mer du sud
  LOC_014: {x:47, y:22}, // La Cicatrice — faille de l'Onde
  LOC_015: {x:85, y:75}, // Cimetière des Dragons de Sable — désert profond
  LOC_016: {x:11, y:82}, // Port-Noir — côte ouest
  LOC_017: {x:52, y:52}, // L'Arène Rouge — près d'Astrah
  LOC_018: {x:65, y:58}, // Champs de Cendre — est ravagé
  LOC_019: {x:78, y:50}, // Côte des Dents — côte est
  LOC_020: {x:30, y:88}, // Pierres du Premier Rugissement — sanctuaire sud
};

/* ============================= LIRE LA CARTE ============================= */
/* La carte n'était qu'un semis de points sur des taches de couleur : on ne
 * savait ni où l'on était, ni ce qui menait où, ni ce qu'il y avait à faire.
 * Ces trois tables lui donnent une géographie. */

/* Les quatre régions, avec l'endroit où écrire leur nom sur le canevas. */
const REGIONS = [
  { id:'nord',   nom:"Les Marches du Nord", x:52, y:6,
    lieux:['LOC_002','LOC_003','LOC_008','LOC_011','LOC_012','LOC_014'],
    note:"Frontières, cols et forges. On y passe, on n'y reste pas." },
  { id:'coeur',  nom:"Le Cœur d'Astrah", x:30, y:38,
    lieux:['LOC_001','LOC_004','LOC_009','LOC_017'],
    note:"Le pouvoir humain, ses ruines et ce qui remonte dessous." },
  { id:'brulees',nom:"Les Terres Brûlées", x:80, y:40,
    lieux:['LOC_005','LOC_015','LOC_018','LOC_019'],
    note:"Ce que les guerres et le sable ont laissé." },
  { id:'sylve',  nom:"La Sylve et les Côtes", x:22, y:66,
    lieux:['LOC_006','LOC_007','LOC_010','LOC_013','LOC_016','LOC_020'],
    note:"Forêts anciennes, cours fermées et ports qui ne déclarent rien." },
];

/* Le réseau de routes. Chaque paire est un trait sur la carte : on voit enfin
 * ce qui mène où, et à quelle distance. */
const ROUTES = [
  ['LOC_002','LOC_011'], ['LOC_002','LOC_003'], ['LOC_003','LOC_008'],
  ['LOC_008','LOC_012'], ['LOC_012','LOC_011'], ['LOC_011','LOC_014'],
  ['LOC_014','LOC_004'], ['LOC_011','LOC_001'], ['LOC_001','LOC_004'],
  ['LOC_001','LOC_009'], ['LOC_004','LOC_017'], ['LOC_017','LOC_018'],
  ['LOC_012','LOC_018'], ['LOC_018','LOC_019'], ['LOC_019','LOC_005'],
  ['LOC_005','LOC_015'], ['LOC_001','LOC_006'], ['LOC_006','LOC_010'],
  ['LOC_010','LOC_016'], ['LOC_010','LOC_020'], ['LOC_020','LOC_007'],
  ['LOC_007','LOC_013'], ['LOC_016','LOC_009'], ['LOC_017','LOC_007'],
];

/* À quelle région appartient un lieu. */
const LOC_REGION = (() => {
  const m = {};
  REGIONS.forEach(r => r.lieux.forEach(id => { m[id] = r.id; }));
  return m;
})();

