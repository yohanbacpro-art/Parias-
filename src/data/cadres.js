/* PARIAS — Les cadres d'une affaire menée en cinq phases
 *
 * Le registre général de cinquante contrats génériques a été supprimé : il
 * déclinait dix archétypes en cinquante affaires aux mêmes étapes et aux mêmes
 * issues. Mais les **affaires locales** — soixante dossiers écrits, un par
 * lieu — se jouent, elles, dans un cadre en cinq phases : audience,
 * préparation, approche, résolution, retour.
 *
 * Ce fichier garde ce cadre, et rien d'autre. Il ne contient aucune affaire :
 * seulement la façon de raconter celles qui existent.
 */

/* ---- Les cinq phases, et ce que le danger vaut en bestiaire ---- */
const STEP_NAMES = ["Audience","Préparation","Approche","Résolution","Retour"];
const DANGER_MAP = {"modéré":[1,2],"dangereux":[2,3],"très dangereux":[3,4],"extrême":[4,5],"légendaire":[5,6]};

/* ---- Habillage narratif des phases ----
 * Chaque phase est un paragraphe reconstruit à partir de ce qui est propre à
 * CETTE affaire — titre, pitch, commanditaire, lieu, danger, type — avec
 * plusieurs variantes. C'est ce qui permet à une affaire locale d'un dossier
 * de se jouer sans qu'on ait à écrire cinq paragraphes de liaison par affaire.
 */
const DANGER_QUALIF = {"modéré":"une affaire sérieuse, sans plus", "dangereux":"une affaire qui ne pardonne pas l'imprudence", "très dangereux":"une affaire qui a déjà coûté la vie à d'autres", "extrême":"une affaire dont peu reviennent indemnes", "légendaire":"une affaire dont on parlera encore dans un siècle, d'une manière ou d'une autre"};
const TYPE_ENJEU = {
  chasse:"traquer et abattre une créature qui ne cessera pas d'elle-même",
  sauvetage:"ramener quelqu'un vivant, avant qu'il ne soit trop tard",
  traque:"retrouver une cible qui ne veut pas être retrouvée",
  "récupération":"remettre la main sur quelque chose que d'autres convoitent tout autant",
  "enquête":"découvrir une vérité que certains préféreraient voir enterrée",
  guerre:"prendre position dans un conflit qui ne laissera personne indifférent",
};

const FRAME_PREP = [
  "{lieu} est encore loin, mais le nom « {titre} » occupe déjà toutes les pensées de Yohan. {commanditaire} n'a pas menti sur la gravité de la situation : c'est {qualif}. Il s'agit, au fond, de {enjeu} — et ce genre de mission ne laisse que peu de place à l'improvisation. Yohan vérifie une dernière fois son équipement avant de se mettre en route.",
  "Avant de partir pour {lieu}, Yohan repasse ce qu'il sait de « {titre} » — et surtout tout ce qu'il ignore encore. {commanditaire} a été clair sur un point : {qualif}. Réussir signifiera {enjeu}. Échouer aura un prix, pour Yohan comme pour ceux qui attendent son retour.",
  "Ce qu'on raconte sur « {titre} » ne suffit pas à savoir précisément à quoi s'attendre une fois arrivé à {lieu}. {commanditaire} parle de {qualif} sans vraiment chercher à rassurer Yohan. Mais l'enjeu est simple à formuler, même s'il ne l'est pas à accomplir : {enjeu}.",
];
const FRAME_APPROCHE = [
  "{lieu} se dessine enfin à l'horizon, et avec elle, la première vraie confrontation avec ce que cache « {titre} ». L'air a changé, ici — plus lourd, plus attentif. Yohan sait qu'il n'a plus le luxe de l'hésitation : {enjeu} ne se fera pas en reculant.",
  "Plus Yohan approche de {lieu}, plus le nom « {titre} » semble peser sur l'air lui-même. Chaque pas rapproche un peu plus du moment où {qualif} cessera d'être une simple mise en garde pour devenir une réalité concrète. Il n'y a plus de retour en arrière possible désormais.",
  "Il n'y a plus de retour en arrière : {lieu} est là, et « {titre} » avec elle. Yohan ralentit, observe, cherche le détail qui pourrait faire toute la différence. {commanditaire} attend un résultat — pas des excuses.",
];
const FRAME_RESOLUTION = [
  "Ce que {commanditaire} appelait « {titre} » a enfin un visage. Tout ce qui a mené jusqu'ici — {lieu}, les mises en garde, les doutes — converge en cet instant précis. Il n'y a plus de place pour la prudence excessive : il faut {enjeu}, maintenant ou jamais.",
  "« {titre} » cesse d'être une rumeur : Yohan y fait face, à {lieu}, sans plus aucun filtre entre lui et ce qu'il est venu accomplir. {qualif}, avait prévenu {commanditaire}. Yohan comprend enfin pourquoi.",
  "Tout ce qui a mené jusqu'ici converge en cet instant. {lieu} n'est plus une destination : c'est le lieu où Yohan devra {enjeu}, quel qu'en soit le prix à payer.",
];
const FRAME_RETOUR_SUCCESS = [
  "« {titre} » n'est plus une menace. {commanditaire} accueille la nouvelle avec un soulagement qu'il peine à cacher, et tiendra parole — cette affaire-là, au moins, restera derrière Yohan.",
  "L'affaire que {commanditaire} appelait « {titre} » trouve enfin sa fin — du moins celle que Yohan lui a donnée. Ce genre de victoire ne se fête jamais bien longtemps, mais elle compte.",
  "Ce qui inquiétait {commanditaire} sous le nom de « {titre} » appartient désormais au passé. Le prix payé pour y parvenir, lui, reste bien réel.",
];
const FRAME_RETOUR_FAIL = [
  "« {titre} » reste un problème irrésolu, et {commanditaire} le sait déjà. Ce genre d'échec ne s'oublie pas facilement — ni pour Yohan, ni pour ceux qui comptaient sur lui.",
  "L'affaire de « {titre} » échappe à Yohan, cette fois. {commanditaire} devra chercher une autre solution — ou attendre que la situation empire encore.",
  "Ce que {commanditaire} espérait voir réglé avec « {titre} » reste entier. Certaines missions ne pardonnent pas la moindre erreur ; celle-ci en faisait partie.",
];

// Variantes de ton selon le type de contrat, pour que chasse/traque/sauvetage/récupération/
// enquête/guerre ne se lisent pas comme le même texte maquillé.
const CONTRACT_FLAVOR = {
  chasse:        { equip:"Yohan vérifie chaque lame, chaque cartouche — traquer une bête ne pardonne pas l'à-peu-près.", enquete:"Il interroge les chasseurs locaux sur les habitudes de la créature avant de partir." },
  sauvetage:     { equip:"Yohan prépare de quoi soigner et transporter quelqu'un de blessé, pas seulement de quoi se battre.", enquete:"Il cherche à savoir depuis combien de temps la personne a disparu, et dans quel état on l'a vue pour la dernière fois." },
  traque:        { equip:"Yohan s'équipe léger — sur une piste, la vitesse compte plus que le blindage.", enquete:"Il relève les traces encore fraîches avant qu'elles ne s'effacent." },
  "récupération":{ equip:"Yohan prévoit de quoi transporter ce qu'il doit ramener, en plus de quoi se défendre.", enquete:"Il se renseigne sur qui d'autre pourrait convoiter le même objet." },
  "enquête":     { equip:"Yohan range ses armes discrètement — ici, les questions comptent plus que l'épée.", enquete:"Il recoupe déjà les premières rumeurs avant même de se rendre sur place." },
  guerre:        { equip:"Yohan s'équipe comme pour un vrai champ de bataille, sans rien laisser au hasard.", enquete:"Il tente d'estimer les forces en présence avant de s'engager." },
};

const RESOLUTION_INTRO = {
  chasse:"La bête montre enfin le bout du museau.",
  sauvetage:"Le moment critique arrive — chaque seconde compte désormais.",
  traque:"La piste se termine ici, face à face.",
  "récupération":"Ce qu'il fallait récupérer est enfin en vue — mais pas sans gardien.",
  "enquête":"Les fils se rejoignent enfin, et la vérité prend une forme dangereuse.",
  guerre:"Le champ de bataille ne laisse plus de place aux tractations.",
};

/* Les complications possibles au cours d'une affaire menée en cinq phases. */
const CONTRACT_COMPLICATIONS = ["cible différente des rumeurs", "rival engagé sur le même contrat",
  "trahison locale", "innocents présents", "objectif secondaire découvert"];

/* Les issues possibles d'une affaire menée en cinq phases. */
const CONTRACT_ISSUES = ["succès complet", "succès avec complication", "échec",
  "abandon", "retournement contre le commanditaire"];
