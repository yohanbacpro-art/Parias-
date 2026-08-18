/* PARIAS — Trame, prologue, codex et simulation du monde */

const PROLOGUE_SLIDES = [
  {eyebrow:"L'Onde", texte:"Il y a des siècles, une collision magique traversa le monde et laissa une cicatrice à jamais ouverte. Un seul homme, touché par cette Onde, en porta le sang dans sa lignée. Ainsi naquirent les Karlsberg — et avec eux, les premiers Parias."},
  {eyebrow:"La Grande Purge", texte:"La Maison Karlsberg fut trahie et rasée. Ses ruines, au nord, restent gardées par une statue de loup que peu de voyageurs osent approcher la nuit. Mais le sang de l'Onde ne s'éteint jamais tout à fait."},
  {eyebrow:"Yohan", texte:"Aujourd'hui, un dernier héritier de ce sang parcourt les routes de Vardhen. Deux pistolets à silex à la ceinture, une épée bâtarde au fourreau, et dans les veines, quatre pouvoirs qu'il n'utilise qu'avec prudence — la Fatigue de l'Onde ne pardonne pas l'excès."},
  {eyebrow:"Le Prix du Paria", texte:"Les grandes maisons connaissent encore la coutume ancestrale. Un Paria qui accepte un contrat peut réclamer l'or — ou le prix ancien, jamais imposé, toujours négocié. Le monde n'attend pas Yohan. Il continue, qu'il agisse ou non."},
];

/* ---- Trame principale : progression par « points de sang » ---- */
const TRAME_CHAPITRES = [
  {seuil:0,   titre:"Le Sang Oublié", objectif:"Yohan porte le sang des Karlsberg, mais sans appuis ni ressources. Accumuler expérience et réputation pour être en mesure d'agir."},
  {seuil:30,  titre:"Une Alliée Inattendue", objectif:"Yohan n'est pas passé inaperçu. Quelqu'un le cherchait déjà — pour des raisons qui ne sont pas encore toutes claires."},
  {seuil:70,  titre:"Les Ruines Réveillées", objectif:"Retourner à Karlsberg n'est plus une fuite en avant, mais un choix — avec de premiers appuis à faire valoir."},
  {seuil:120, titre:"Rebâtir la Maison Karlsberg", objectif:"Le nom Karlsberg pourrait renaître. Reste à savoir ce que Yohan est prêt à sacrifier pour cela."},
  {seuil:180, titre:"Le Nom Karlsberg Renaît", objectif:"Fin de cette chronique : sur les ruines du Loup, une bannière se relève. Ce que Yohan en a payé lui appartient.", fin:true},
];

const COMPANIONS_POOL = {
  alycia: {
    id:"alycia", nom:"Alycia de Callensbourg",
    desc:"Paria extrêmement puissante, presque au niveau de Yohan, elle vit cachée. Séductrice, intelligente et manipulatrice, elle œuvre à empêcher l'extinction des Parias — et cherche des hommes assez puissants, compétents ou loyaux pour protéger les derniers survivants. Ses méthodes restent moralement ambiguës ; son aide n'est jamais gratuite.",
    bonus:{vol:2, fatMax:10}, bonusDesc:"+2 Volonté, +10 Fatigue max (soutien d'une Paria expérimentée)"
  },
};

const CODEX_ENTRIES = [
  {nom:"Yohan de Karlsberg — Le Loup solitaire", meta:"Humain / Paria · Maison Karlsberg · 27 ans", desc:"Héritier d'une maison presque exterminée, l'un des Parias les plus dangereux du monde actuel. Le retour public du nom Karlsberg pourrait changer l'équilibre politique de Vardhen."},
  {nom:"Alycia de Callensbourg", meta:"Paria, vit cachée", desc:"Presque aussi puissante que Yohan. Séductrice, intelligente et manipulatrice, elle cherche à empêcher l'extinction des Parias — et des hommes assez puissants ou loyaux pour protéger les derniers survivants. Ses méthodes restent moralement ambiguës."},
  {nom:"Caleb de Fort-aux-Princes", meta:"Prince · Maison Fort-aux-Princes · Paria", desc:"Extrêmement dangereux, farouche, place Fort-aux-Princes avant tout. N'apprécie pas la concurrence et ne considère pas les autres Parias comme des alliés naturels."},
  {nom:"Otto le Noir de Karlsberg", meta:"Ancien seigneur de la Maison Karlsberg", desc:"Puissant seigneur Paria qui résista dix ans aux forces d'Astrah avant de négocier avec Auguste le Grand — Karlsberg entra dans l'ordre impérial sans perdre son identité."},
  {nom:"Karl d'Astrah", meta:"Ancien Empereur d'Astrah", desc:"Devenu empereur après la guerre civile, il fit croire à une réconciliation avec les Parias avant de les trahir — la Grande Trahison qui faillit détruire Karlsberg."},
  {nom:"Léopold IV d'Astrah — « le Roi de Cendre »", meta:"Empereur actuel d'Astrah · ~52 ans", desc:"Règne sur un Empire affaibli. Pragmatique, il ne cherche pas nécessairement la mort d'un Paria découvert — il y voit une menace, une arme, ou un symbole politique."},
  {nom:"Eltharion le Grand", meta:"Roi des Elfes", desc:"Témoin direct de la création de l'Onde, l'un des rares êtres à connaître les circonstances exactes de la naissance du pouvoir des Karlsberg. Incarne la prudence et la mémoire."},
  {nom:"Anarion le Magnifique", meta:"Roi des Elfes noirs", desc:"Fondateur de la civilisation elfique noire après avoir quitté l'ancien ordre. Élégant, charismatique, excessif — l'un des plus redoutables utilisateurs de magie de Vardhen."},
  {nom:"Prince Tyrion", meta:"Fils d'Eltharion le Grand", desc:"A juré d'anéantir les Elfes noirs. Vision dure du monde ; méprise les Parias sans la haine absolue de Lucius, les voyant comme la conséquence d'une faute ancienne."},
  {nom:"Princesse Alarielle", meta:"Famille d'Eltharion", desc:"Extrêmement convoitée par les grandes lignées elfiques. Cherche à réparer la faute commise par son peuple — contrairement à Tyrion, elle ne hait pas les Parias."},
  {nom:"Lucius Furius Augustus", meta:"Prince, prétendant impérial", desc:"Tacticien hors pair dont l'ambition est de restaurer l'Empire d'Astrah. Déteste les Parias, qu'il juge incompatibles avec un État stable — candidat majeur au déclenchement du Second Empire."},
  {nom:"Charles « le Sourire de Fer » de Mont-Draken", meta:"Prince · Maison Mont-Draken", desc:"Tueur de dragon reconnu, l'un des rares humains à en chevaucher un. Son objectif est de protéger l'humanité avant tout — pas hostile aux Parias, dont il juge la puissance utile."},
  {nom:"Kem-Val — Le Banni", meta:"Khesh · ~45 ans · ~2,10 m", desc:"Fils de Shak-A-Zulu. Figure bannie des tribus Khesh, dont le destin pourrait peser sur une future unification."},
  {nom:"Khal-Vaene", meta:"Khesh · frère de Kem-Val", desc:"Usurpateur des Dragons des Sables. Ambitieux, dangereux et compétent, il voit en Kem-Val une menace directe pour son pouvoir."},
  {nom:"Le Seigneur des Cornes", meta:"Titre légendaire des Hommes-Bêtes", desc:"Ancienne tradition racontant qu'un chef réussit autrefois à unir une immense quantité de hardes — un titre qu'un joueur Homme-Bête pourrait chercher à reprendre."},
];

/* ---- Temps qui passe & simulation du monde ---- */
const SAISONS = ["Printemps","Été","Automne","Hiver"];

const NEWS_POOL = [
  r=>`${r} — Des marchands rapportent des prix en hausse après une série d'embuscades sur les routes voisines.`,
  r=>`${r} — Une maison locale annonce renforcer ses gardes après plusieurs disparitions inexpliquées.`,
  r=>`${r} — Des rumeurs circulent : un individu aurait manifesté des pouvoirs attribués aux Parias.`,
  r=>`${r} — Une délégation quitte la région pour négocier une alliance avec ses voisins.`,
  r=>`${r} — Les tensions montent entre deux maisons rivales ; certains parlent déjà de rupture ouverte.`,
  r=>`${r} — Une créature inhabituelle a été aperçue près des abords de la région, sans confirmation.`,
  r=>`${r} — Un chef local aurait juré fidélité à un prétendant plus puissant.`,
  r=>`${r} — La récolte de la saison s'annonce maigre ; les prix devraient encore grimper.`,
  r=>`${r} — Un contrat resté sans preneur inquiète de plus en plus la maison commanditaire.`,
  r=>`${r} — Des voyageurs racontent avoir croisé une caravane errante, sans meneur reconnu.`,
];

const CALME_TEXTES = [
  "Rien de notable ne se passe cette semaine. Yohan reprend son souffle.",
  "Une semaine tranquille. Le monde, ailleurs, continue de tourner.",
  "Rien à signaler ici — mais la Fatigue, elle, retombe doucement.",
  "Une accalmie. Yohan profite du répit pour s'entraîner un peu.",
];

const CRISE_NOMS = {
  humains:"Second Empire", parias:"Renaissance des Parias", khesh:"Grande Unification",
  elfes:"crise elfique commune (encore à définir)", elfes_noirs:"crise elfique commune (encore à définir)",
  nains:"Guerre des Profondeurs", peaux_vertes:"Remontée vers la Surface", hommes_betes:"Grande Horde"
};

const PEUPLE_LABELS = {
  humains:"Humains", parias:"Parias", khesh:"Khesh", elfes:"Elfes",
  elfes_noirs:"Elfes noirs", nains:"Nains", peaux_vertes:"Peaux-Vertes", hommes_betes:"Hommes-Bêtes"
};
