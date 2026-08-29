/* PARIAS — ACTE II · LE DERNIER KARLSBERG
 * ═══════════════════════════════════════════════════════════════════════
 *
 * La question de l'acte tient en une phrase, rendue par une créature de
 * deux cent onze ans dans la bouche d'une femme morte :
 *
 *     « Ce n'est pas Chastel qui a fait rayer Karlsberg. C'est quelqu'un
 *       de chez nous qui le leur a demandé. »
 *
 * Ce n'est donc pas une reconstruction : c'est une identification. Karlsberg
 * n'est pas un chantier, c'est une adresse où l'on retourne pour comprendre,
 * et ce qu'on y trouve renvoie ailleurs.
 *
 * TROIS PISTES mènent au nom, et chacune appartient à quelqu'un :
 *   LE SANG   — Alycia de Callensbourg, et son réseau de Parias.
 *   L'ONDE    — Alarielle, et les archives elfiques.
 *   LE PAPIER — Ancelin Vasque, et le volume cent-quarante-trois.
 *
 * On ne peut pas finir les trois. Trois ans, une saison par déplacement, et
 * le monde qui avance pendant qu'on est ailleurs.
 * ═══════════════════════════════════════════════════════════════════════ */

const A2 = () => (ETAT.acte2 = ETAT.acte2 || {
  annee:0, saison:0, lieu:'cendrepont',
  pistes:{ sang:0, onde:0, papier:0 },
  vus:[], marqueurs:[],
  neuf:{}, crises:{},
  bannieres:false, refuge:0,
});

const SAISONS = ["printemps", "été", "automne", "hiver"];
const dateA2 = () => `${SAISONS[A2().saison]} · vingt-et-unième année après la Purge`.replace(
  'vingt-et-unième', ['vingt-et-unième','vingt-deuxième','vingt-troisième','vingt-quatrième'][A2().annee] );

/* ── Les liens ─────────────────────────────────────────────────────────────
 * Quatre axes, comme le prompt l'exige, et jamais une barre unique.
 * `politique` est dérivée du monde et ne s'achète pas.
 * Chacune a en plus un axe qui n'appartient qu'à elle :
 *   Alycia — la PEUR DE DÉPENDRE. Elle monte quand on lui donne.
 *   Alarielle — le DEVOIR. Il ne s'achète pas du tout. */
const LIENS = {
  alycia:    { relation:0, confiance:0, attirance:0, peur:0 },
  alarielle: { relation:0, confiance:0, attirance:0, devoir:0 },
};
const lien = q => (ETAT.liens = ETAT.liens || JSON.parse(JSON.stringify(LIENS)))[q];

function bouger(qui, d){
  const l = lien(qui);
  for(const [k, n] of Object.entries(d)) l[k] = Math.max(-20, Math.min(20, (l[k] || 0) + n));
}

/* La compatibilité politique se lit dans le monde, pas dans le cœur. */
function politique(qui){
  const A = A2();
  if(qui === 'alycia'){
    let p = 0;
    if(A.bannieres) p -= 4;                       // un château est une cible
    if(A.refuge >= 2) p += 3;                     // un refuge dispersé, non
    if(a('a2_montdraken_allie')) p -= 6;
    if(a('a2_reseau_protege')) p += 4;
    if(a('a2_paria_livre')) p -= 10;
    return p;
  }
  let p = 0;                                       // alarielle
  if(a('a2_anarion_soutenu')) p -= 3;
  if(a('a2_atrocite_couverte')) p -= 9;
  if(a('a2_tyrion_humilie')) p -= 4;
  if(a('a2_onde_rendue')) p += 5;
  if(a('a2_eltharion_soutenu')) p += 2;
  return p;
}

/* Un palier exige plusieurs axes à la fois, et un refus porte sa raison. */
function palierPossible(qui, seuils){
  const l = lien(qui), pol = politique(qui);
  const etat = Object.assign({}, l, { politique:pol });
  for(const [k, v] of Object.entries(seuils))
    if((etat[k] || 0) < v) return { ok:false, manque:k, ecart:v - (etat[k] || 0) };
  if(qui === 'alycia' && l.peur >= 12) return { ok:false, manque:'peur', ecart:l.peur };
  if(qui === 'alarielle' && l.devoir <= -8) return { ok:false, manque:'devoir', ecart:-l.devoir };
  return { ok:true };
}

const RAISONS = {
  relation:  "Elle ne vous connaît pas assez pour ça, et elle n'a pas l'intention de faire semblant.",
  confiance: "Elle ne vous croit pas encore. Ce n'est pas de l'hostilité : c'est une méthode qui l'a gardée en vie.",
  attirance: "Ce n'est pas là. Elle ne va pas jouer à ce que ce soit là.",
  politique: "Ce que vous êtes en train de faire du monde rend cette conversation impossible, et elle le sait avant vous.",
  peur:      "Vous lui avez trop donné. Chaque chose reçue est une chaîne, et elle a passé quinze ans à en couper.",
  devoir:    "Elle a un peuple. Ce n'est pas une excuse, c'est une hiérarchie, et vous êtes en dessous.",
};

/* ── Les neuf ──────────────────────────────────────────────────────────────
 * Ils bougent, ils veulent quelque chose cette saison, et ils retiennent —
 * nominativement, et daté. Rien de tout ça n'est tiré au sort. */
const NEUF = {
  alycia:    { nom:"Alycia de Callensbourg", quoi:"Paria · elle fait disparaître les chasseurs",
               ou:'route', objectifs:["protéger les derniers Parias","identifier leurs ennemis","garder sa liberté"] },
  alarielle: { nom:"Alarielle", quoi:"elfe · elle ne détourne pas les yeux",
               ou:'aelthiriel', objectifs:["protéger sa famille","réparer la faute elfique","éviter une nouvelle catastrophe"] },
  charles:   { nom:"Charles de Mont-Draken", quoi:"il protège les hommes de ce qui n'en est pas",
               ou:'montdraken', objectifs:["protéger les humains","détruire les menaces non humaines"] },
  lucius:    { nom:"Lucius Furius Augustus", quoi:"il veut relever Astrah",
               ou:'astrah', objectifs:["restaurer Astrah","accumuler des soutiens"] },
  caleb:     { nom:"Caleb de Fort-aux-Princes", quoi:"il compte ses concurrents",
               ou:'fortauxprinces', objectifs:["protéger sa maison","limiter ses concurrents"] },
  tyrion:    { nom:"Tyrion", quoi:"prince elfe · il veut la fin des Elfes noirs",
               ou:'aelthiriel', objectifs:["anéantir les Elfes noirs","protéger son peuple"] },
  anarion:   { nom:"Anarion", quoi:"il tient la marche noire",
               ou:'marchenoire', objectifs:["vaincre Eltharion","étendre son pouvoir"] },
  eltharion: { nom:"Eltharion", quoi:"il tient ce qui reste",
               ou:'aelthiriel', objectifs:["vaincre Anarion","préserver son peuple"] },
  khalvaene: { nom:"Khal-Vaene", quoi:"il unifie le désert",
               ou:'khesh', objectifs:["unifier les Khesh","garantir leur puissance"] },
};

function neufEtat(id){
  const A = A2();
  return (A.neuf[id] = A.neuf[id] || { ou:NEUF[id].ou, retient:[] });
}
function retenir(id, quoi){
  const n = neufEtat(id);
  const ligne = `${SAISONS[A2().saison]} de la ${['vingt-et-unième','vingt-deuxième','vingt-troisième','vingt-quatrième'][A2().annee]} — ${quoi}`;
  if(!n.retient.includes(ligne)) n.retient.push(ligne);
}

/* ── La carte ──────────────────────────────────────────────────────────────
 * Dix endroits. On ne peut être qu'à un par saison, et être quelque part,
 * c'est ne pas être ailleurs. */
const LIEUX = {
  cendrepont:     { nom:"Cendrepont", region:"Route Grise", loin:0,
                    note:"Le gué, l'auberge du Héron, et un mur où l'on cloue des papiers." },
  chastel:        { nom:"Chastel", region:"la province", loin:1,
                    note:"L'arsenal et les archives. Trois cent quarante volumes de répertoire général." },
  callensbourg:   { nom:"Callensbourg", region:"les Marches", loin:2,
                    note:"Une maison rayée avant la vôtre. Il n'en reste pas grand-chose et il en reste quelqu'un." },
  karlsberg:      { nom:"Karlsberg", region:"les Marches Grises", loin:3,
                    note:"Des ruines sous les ronces, à onze lieues de toute route entretenue." },
  fortauxprinces: { nom:"Fort-aux-Princes", region:"le sud humain", loin:2,
                    note:"Caleb y compte ses concurrents avec une exactitude de marchand." },
  montdraken:     { nom:"Mont-Draken", region:"la marche humaine", loin:3,
                    note:"On y forme des hommes à tuer ce qui n'est pas humain. C'est une école, pas un château." },
  astrah:         { nom:"Astrah", region:"le trône vide", loin:4,
                    note:"Une capitale sans roi depuis quarante ans, et un homme qui compte les soutiens." },
  aelthiriel:     { nom:"Aelthiriel", region:"la cour elfique", loin:4,
                    note:"On n'y entre pas : on y est reçu, et il faut une raison." },
  marchenoire:    { nom:"La Marche noire", region:"la cour d'Anarion", loin:5,
                    note:"Ce que les Elfes appellent une plaie et ce qu'Anarion appelle un royaume." },
  kardurak:       { nom:"Kar-Durak", region:"sous la montagne", loin:4,
                    note:"Onze portes, dont quatre sont tombées. Les Peaux-Vertes montent depuis deux ans." },
  khesh:          { nom:"Le désert khesh", region:"les Douze Feux", loin:5,
                    note:"Douze tribus, un homme qui les compte, et un serment qu'on ne prononce qu'une fois." },
  sainteombre:    { nom:"Sainte-Ombre", region:"quatre lieues de Fort-aux-Princes", loin:2,
                    note:"Un prieuré de trente-et-une femmes, une fondation, et dix-neuf ans de comptes tenus à la ligne près." },
};

/* Les visages de l'acte. Le moteur ne rend rien s'il ne connaît pas la
 * personne : ce qui suit n'est pas de la décoration, c'est la condition
 * pour qu'un interlocuteur ait un nom à l'écran. */
Object.assign(GENS, {
  alycia:    { nom:"Alycia de Callensbourg", role:"Paria · trente-deux ans · elle fait disparaître les gens", lettre:"A" },
  alarielle: { nom:"Alarielle",              role:"elfe · elle ne détourne pas les yeux",                     lettre:"Æ" },
  charles:   { nom:"Charles de Mont-Draken", role:"il protège les hommes de ce qui n'en est pas",             lettre:"C" },
  lucius:    { nom:"Lucius Furius Augustus", role:"il compte les soutiens d'un trône vide",                   lettre:"L" },
  caleb:     { nom:"Caleb de Fort-aux-Princes", role:"il achète des dettes, il ne prête pas",                 lettre:"C" },
  tyrion:    { nom:"Tyrion",                 role:"prince elfe · frère d'Alarielle",                          lettre:"T" },
  berold:    { nom:"Bérold",                 role:"chef de meute · onze ans à Mont-Draken",                   lettre:"B" },
  gerbaud:   { nom:"Gerbaud",                role:"maître d'armes de Karlsberg · soixante-dix ans",           lettre:"G" },
  ysabel:    { nom:"Ysabel de Karlsberg",    role:"sœur cadette de votre père · soixante-quatre ans",         lettre:"Y" },
});

enregistrerScenes({});
