/* PARIAS — LA BATAILLE
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Une échelle au-dessus du combat. Ici Yohan ne frappe plus : il commande,
 * et commander veut dire choisir trois ordres et vivre avec.
 *
 * Le système vient de `src/battle.js` et **il n'a pas été réécrit**. Les
 * mathématiques sont reprises trait pour trait — puissance, résistance,
 * terrain, triangle tactique, pertes au prorata, moral. Ce qui change ici,
 * et rien d'autre :
 *
 *   L'ÉTAT   `hero.armee` devient `ETAT.armee`, `hero.renom` devient
 *            `ETAT.renom`. Le proto n'a qu'un seul état et c'est celui-là.
 *   LE RENDU `renderBattle()` écrivait dans un DOM que le proto n'a pas.
 *            Une bataille est désormais une **scène qui se recompose** :
 *            les trois fronts se lisent, les ordres sont les choix, et
 *            chaque tour rouvre la même scène avec un champ différent.
 *
 * LE CHAMP — trois fronts, chacun avec son terrain. On répartit ses unités
 * au déploiement, on donne un ordre par front, et le tour se résout : les
 * deux camps frappent **en même temps**, ce qui interdit de jouer en
 * réaction.
 *
 * CE QUI DÉCIDE — deux ressources, jamais une.
 *   les effectifs · une unité vidée est dissoute, définitivement
 *   le moral      · à zéro l'armée rompt, même s'il lui reste des hommes
 *
 * YOHAN se place sur un front comme une unité. Sa présence tient le moral
 * sans le garantir, et il peut lâcher une fois par bataille un Coup de
 * l'Onde — devant deux mille témoins, ce qui se paie en Suspicion pendant
 * des saisons.
 *
 * API :
 *   ouvrirBataille(idChamp, retour)  · retour = scène où l'on revient
 *   ETAT.derniereBataille            · 'gagnee' | 'perdue' | null
 * ═══════════════════════════════════════════════════════════════════════ */

/* ══ 1 · CE QUI SE BAT ═════════════════════════════════════════════════════
 * Une unité n'est pas un individu : c'est un effectif. Elle ne meurt pas,
 * elle fond, et à zéro homme elle est rayée du rôle.
 *
 * Triangle tactique — chacun bat le suivant :
 *     cavalerie > archers > infanterie > cavalerie
 * Sa proie, on la frappe à +50 % ; son prédateur, à −25 %. */

const TRIANGLE = { cavalerie:'archers', archers:'infanterie', infanterie:'cavalerie' };

function avantageContre(catA, catB){
  if(TRIANGLE[catA] === catB) return 1.5;
  if(TRIANGLE[catB] === catA) return 0.75;
  return 1;
}

const TROUPES = {
  /* ── Ce qui suit Karlsberg ─────────────────────────────────────────── */
  lanciers:{ id:'lanciers', nom:"Lanciers de Karlsberg", categorie:'infanterie',
    effectif:60, attaque:7, defense:12, moral:10, portee:0,
    desc:"Piquiers de levée. Rien d'extraordinaire, sinon qu'ils tiennent la ligne et brisent une charge." },
  archers:{ id:'archers', nom:"Archers des Friches", categorie:'archers',
    effectif:40, attaque:10, defense:6, moral:8, portee:1,
    desc:"Frappent sans être frappés tant qu'on les tient à distance. S'effondrent au corps à corps." },
  frondeurs:{ id:'frondeurs', nom:"Frondeurs des hameaux", categorie:'archers',
    effectif:50, attaque:6, defense:5, moral:6, portee:1,
    desc:"Des paysans avec des lanières de cuir. Ils ne valent rien un par un et beaucoup à cinquante." },
  cavalerie:{ id:'cavalerie', nom:"Cavaliers de la Route Grise", categorie:'cavalerie',
    effectif:30, attaque:13, defense:9, moral:11, portee:0,
    desc:"Chargent, débordent, taillent les tirailleurs. À jeter sur des archers, jamais sur des piques." },
  eclaireurs:{ id:'eclaireurs', nom:"Éclaireurs des Friches", categorie:'cavalerie',
    effectif:20, attaque:8, defense:7, moral:9, portee:1,
    desc:"Trop peu nombreux pour tenir quoi que ce soit. Ils voient venir, et c'est souvent ce qui décide." },
  veterans:{ id:'veterans', nom:"Vétérans d'Astrah", categorie:'infanterie',
    effectif:45, attaque:12, defense:16, moral:14, portee:0,
    desc:"Des hommes qui ont déjà tenu une ligne qui cédait. Ils coûtent cher parce qu'ils reviennent." },
  sapeurs:{ id:'sapeurs', nom:"Sapeurs de Kar-Durak", categorie:'infanterie',
    effectif:25, attaque:9, defense:20, moral:13, portee:0,
    desc:"Ils ne chargent pas : ils s'enterrent. Une position tenue par des sapeurs se reprend au prix fort." },
  arbaletriers:{ id:'arbaletriers', nom:"Arbalétriers de Kar-Durak", categorie:'archers',
    effectif:35, attaque:15, defense:9, moral:12, portee:1,
    desc:"Lents à recharger. Un carreau nain traverse à peu près tout ce qui se présente." },
  parias:{ id:'parias', nom:"Les Sans-Nom", categorie:'infanterie',
    effectif:20, attaque:20, defense:14, moral:18, portee:1,
    desc:"Une poignée de porteurs de l'Onde. Ils ne se recrutent pas : ils se méritent." },

  /* ── Ce qui se rencontre, et jamais ne se recrute ──────────────────── */
  milice:{ id:'milice', nom:"Milice levée", categorie:'infanterie', ennemi:true,
    effectif:70, attaque:5, defense:8, moral:6, portee:0,
    desc:"Des paysans à qui l'on a donné une pique la semaine dernière." },
  pillards:{ id:'pillards', nom:"Pillards", categorie:'infanterie', ennemi:true,
    effectif:50, attaque:9, defense:7, moral:8, portee:0,
    desc:"Ils frappent fort et se dispersent dès que ça tourne mal." },
  mercenaires:{ id:'mercenaires', nom:"Compagnie franche", categorie:'infanterie', ennemi:true,
    effectif:55, attaque:11, defense:13, moral:11, portee:0,
    desc:"Payés d'avance. Ils tiendront exactement le temps pour lequel on a payé." },
  archers_merc:{ id:'archers_merc', nom:"Tirailleurs à gages", categorie:'archers', ennemi:true,
    effectif:40, attaque:11, defense:6, moral:8, portee:1,
    desc:"Ils visent bien tant que personne ne s'approche." },
  cavalerie_imp:{ id:'cavalerie_imp', nom:"Cavalerie d'Astrah", categorie:'cavalerie', ennemi:true,
    effectif:35, attaque:15, defense:12, moral:13, portee:0,
    desc:"Bien montée, bien payée, bien commandée. Le vrai problème d'un champ ouvert." },
  veterans_imp:{ id:'veterans_imp', nom:"Vétérans de Lucius", categorie:'infanterie', ennemi:true,
    effectif:45, attaque:14, defense:16, moral:15, portee:0,
    desc:"Formés par un homme qui considère l'imprévu comme une faute d'organisation." },
  horde:{ id:'horde', nom:"Horde Peau-Verte", categorie:'infanterie', ennemi:true,
    effectif:90, attaque:10, defense:6, moral:12, portee:0,
    desc:"Le nombre comme doctrine. Effrayant tant que ça avance." },
  harde_cornes:{ id:'harde_cornes', nom:"Harde des Mille Cornes", categorie:'infanterie', ennemi:true,
    effectif:75, attaque:13, defense:9, moral:17, portee:0,
    desc:"Ils ne tiennent pas une ligne : ils déferlent. Et ils ne reculent jamais les premiers." },
  troll_guerre:{ id:'troll_guerre', nom:"Trolls de guerre", categorie:'infanterie', ennemi:true,
    effectif:25, attaque:22, defense:17, moral:14, portee:0,
    desc:"Vingt-cinq créatures qui valent chacune dix hommes, et qu'aucune pique n'arrête vraiment." },
  chasseurs_ordre:{ id:'chasseurs_ordre', nom:"Ordre des Chasseurs", categorie:'infanterie', ennemi:true,
    effectif:45, attaque:16, defense:15, moral:18, portee:0,
    desc:"Formés pour une seule chose : prendre un Paria vivant. Ils savent attendre que la fatigue monte." },
};

/* Où l'on se bat compte autant que qui. */
const TERRAINS = {
  plaine: { nom:"Plaine",  cav:1.25, arc:1.0,  inf:1.0,  desc:"Terrain ouvert — la cavalerie y donne sa pleine mesure." },
  colline:{ nom:"Colline", cav:0.8,  arc:1.3,  inf:1.1,  desc:"Position dominante — les tirs portent, les charges s'essoufflent." },
  bois:   { nom:"Bois",    cav:0.6,  arc:0.8,  inf:1.2,  desc:"Couvert dense — l'infanterie s'y accroche, le reste s'y perd." },
  gue:    { nom:"Gué",     cav:0.7,  arc:1.1,  inf:0.9,  desc:"Passage étroit — on n'y engage jamais tout son monde." },
  ruines: { nom:"Ruines",  cav:0.5,  arc:1.15, inf:1.25, desc:"Murs éventrés — chaque pan de mur vaut une compagnie." },
  defile: { nom:"Défilé",  cav:0.5,  arc:1.2,  inf:1.3,  desc:"Gorge encaissée — le nombre n'y sert plus à rien." },
};

/* L'ordre est le vrai choix du tour, et il vaut pour tout un front. */
const ORDRES = {
  tenir:    { nom:"Tenir",       atk:0.8, def:1.4, moral:+1,
              desc:"Encaisser sans rompre. Peu de pertes infligées, peu subies." },
  charger:  { nom:"Charger",     atk:1.5, def:0.7, moral:0,
              desc:"Tout donner. Écrase, ou se fait écraser." },
  harceler: { nom:"Harceler",    atk:1.0, def:1.1, moral:0, tirSeul:true,
              desc:"Tirer et reculer. Seuls les tireurs frappent — et on ne leur rend pas leurs coups." },
  replier:  { nom:"Se replier",  atk:0.3, def:1.2, moral:-2, repli:true,
              desc:"Céder le front pour sauver les hommes. Le moral en paie le prix." },
};

/* ══ 2 · LES CHAMPS ════════════════════════════════════════════════════════
 * Un champ n'est pas un décor : c'est trois terrains et une composition
 * adverse, et les deux ensemble posent le problème. */
const CHAMPS = {
  bat_kardurak:{
    id:'bat_kardurak',
    nom:"La onzième porte",
    lieu:"Kar-Durak · la galerie basse",
    intro:"Onze portes. Quatre sont tombées. Les Peaux-Vertes n'en prennent aucune : ils les usent, trente des leurs toutes les nuits pour trois des nôtres, et ils ont trente mille.",
    mise:"Ce qu'on tient ce soir, on le tient. Ce qu'on lâche ne se reprend pas : une porte de Kar-Durak se referme de l'intérieur ou pas du tout.",
    fronts:[
      { nom:"Le pont-levis",      terrain:'gue',
        ennemis:[{ type:'horde' }, { type:'horde', effectifPct:0.6 }] },
      { nom:"La galerie basse",   terrain:'defile',
        ennemis:[{ type:'troll_guerre', effectifPct:0.8 }, { type:'horde', effectifPct:0.5 }] },
      { nom:"L'escalier d'angle", terrain:'ruines',
        ennemis:[{ type:'horde', effectifPct:0.7 }] },
    ],
    victoire:{ renom:14, temoins:'province', flags:['bat_kardurak_tenue','a2_kardurak_aide'],
      texte:"La onzième porte tient. On la referme de l'intérieur au matin, avec les mêmes pierres, dans le même ordre — parce que c'est ainsi qu'on fait ici et qu'aucune bataille ne change ça." },
    defaite:{ renom:-4, flags:['bat_kardurak_perdue'],
      texte:"La galerie basse cède à la troisième heure. On évacue par l'escalier d'angle en emportant ce qu'on peut porter, et la montagne tient désormais sur trois portes." },
  },

  bat_marche:{
    id:'bat_marche',
    nom:"La ligne du fleuve",
    lieu:"La Marche noire · le gué d'Aumance",
    intro:"Anarion ne recrute pas : il constate. Il constate ce matin qu'il y a un gué, quatre cents hommes en face, et qu'aucune des deux cours ne viendra.",
    mise:"Une ligne de fleuve ne se gagne pas : elle se tient une saison de plus. C'est tout ce qu'on peut acheter ici, et ça vaut ce que valent trois mois.",
    fronts:[
      { nom:"Le gué",         terrain:'gue',
        ennemis:[{ type:'mercenaires' }, { type:'archers_merc', effectifPct:0.7 }] },
      { nom:"La berge haute", terrain:'colline',
        ennemis:[{ type:'archers_merc' }] },
      { nom:"Le bois de saule", terrain:'bois',
        ennemis:[{ type:'mercenaires', effectifPct:0.8 }, { type:'milice' }] },
    ],
    victoire:{ renom:11, temoins:'foule', flags:['bat_marche_tenue','a2_anarion_soutenu'],
      texte:"Le gué reste au nord. Anarion ne remercie pas — il note, ce qui chez lui est davantage — et la ligne du fleuve tiendra un hiver de plus." },
    defaite:{ renom:-3, flags:['bat_marche_perdue'],
      texte:"On repasse le gué dans l'autre sens à la nuit. La ligne du fleuve descend de quatre lieues, et quatre lieues de marche noire, ce sont onze hameaux." },
  },

  bat_route:{
    id:'bat_route',
    nom:"L'embuscade de la Route Grise",
    lieu:"La Route Grise · trois lieues sous Cendrepont",
    intro:"Ils ont coupé la route en trois endroits et attendent les convois depuis six semaines. Trois cents pillards mal commandés — mais trois cents.",
    mise:"Une route coupée ne tue personne. Elle ferme un péage, et un péage fermé vide une vallée en trois ans.",
    fronts:[
      { nom:"Le pont",     terrain:'gue',     ennemis:[{ type:'pillards', effectifPct:0.7 }] },
      { nom:"La chaussée", terrain:'plaine',  ennemis:[{ type:'pillards' }, { type:'milice', effectifPct:0.6 }] },
      { nom:"Le talus",    terrain:'colline', ennemis:[{ type:'archers_merc', effectifPct:0.6 }] },
    ],
    victoire:{ renom:9, temoins:'foule', flags:['bat_route_ouverte'],
      texte:"Les pillards refluent vers les bois et n'en ressortiront pas de la saison. La Route Grise est ouverte, et c'est un nom qui l'a rouverte." },
    defaite:{ renom:-3, flags:['bat_route_perdue'],
      texte:"La colonne décroche par le talus. La route restera coupée, et on saura qui a essayé." },
  },
};

/* ══ 3 · LE NOYAU ══════════════════════════════════════════════════════════
 * Repris de `src/battle.js` sans modification des formules. Tout ce qui
 * suit décide de qui meurt, et ça n'a pas à changer parce qu'on a changé
 * d'écran. */

let bataille = null;
let _uidUnite = 0;

function instancierUnite(type, effectifPct){
  const t = typeof type === 'string' ? TROUPES[type] : type;
  if(!t) return null;
  const eff = Math.max(1, Math.round(t.effectif * (effectifPct === undefined ? 1 : effectifPct)));
  return { uid:'u' + (++_uidUnite), type:t.id, nom:t.nom, categorie:t.categorie,
           effectif:eff, effectifMax:t.effectif,
           attaque:t.attaque, defense:t.defense, moral:t.moral, portee:t.portee };
}

/* Le rôle vit sur `ETAT.armee` : des instances persistantes d'une bataille à
 * l'autre, avec leurs pertes. Une compagnie qui a saigné reste saignée. */
function armee(){ return (ETAT.armee = ETAT.armee || []); }
function effectifTotal(list){ return list.reduce((s, u) => s + u.effectif, 0); }

function lever(type, effectifPct){
  const u = instancierUnite(type, effectifPct);
  if(u) armee().push(u);
  return u;
}

function coefTerrain(terrain, categorie){
  const t = TERRAINS[terrain] || TERRAINS.plaine;
  return categorie === 'cavalerie' ? t.cav : categorie === 'archers' ? t.arc : t.inf;
}

function avantageMoyen(u, adverses){
  const vivants = adverses.filter(a => a.effectif > 0);
  if(!vivants.length) return 1;
  const somme = vivants.reduce((s, a) => s + avantageContre(u.categorie, a.categorie) * a.effectif, 0);
  return somme / effectifTotal(vivants);
}

function puissanceFront(unites, ordreId, terrain, adverses){
  const o = ORDRES[ordreId] || ORDRES.tenir;
  return unites.reduce((total, u) => {
    if(u.effectif <= 0) return total;
    if(o.tirSeul && u.portee === 0) return total;
    const base = (u.effectif / 10) * u.attaque;
    return total + base * o.atk * coefTerrain(terrain, u.categorie) * avantageMoyen(u, adverses);
  }, 0);
}

function resistanceFront(unites, ordreId, terrain){
  const o = ORDRES[ordreId] || ORDRES.tenir;
  return unites.reduce((total, u) => {
    if(u.effectif <= 0) return total;
    return total + (u.effectif / 10) * u.defense * o.def * coefTerrain(terrain, u.categorie);
  }, 0);
}

/* Les pertes se répartissent au prorata de l'effectif : une grosse unité
 * encaisse davantage, ce qui n'est ni juste ni injuste, c'est de la surface. */
function infligerPertes(unites, pertes){
  const vivants = unites.filter(u => u.effectif > 0);
  const total = effectifTotal(vivants);
  if(!total || pertes <= 0) return { pertes:0, dissoutes:[] };
  let restant = Math.min(pertes, total);
  const dissoutes = [];
  vivants.forEach((u, i) => {
    const part = (i === vivants.length - 1)
      ? restant
      : Math.min(restant, Math.round(pertes * (u.effectif / total)));
    const reel = Math.min(part, u.effectif);
    u.effectif -= reel;
    restant -= reel;
    if(u.effectif <= 0) dissoutes.push(u.nom);
  });
  return { pertes:Math.min(pertes, total), dissoutes };
}

/* L'ennemi choisit ses ordres. Simple, et pas stupide : il charge quand il
 * est en nombre, il tient quand il ne l'est pas, et il harcèle s'il n'a que
 * des tireurs — ce qui est exactement ce qu'un capitaine ferait. */
function ordreEnnemi(front){
  const miens = front.ennemis.filter(u => u.effectif > 0);
  if(!miens.length) return 'tenir';
  const face = front.allies.filter(u => u.effectif > 0);
  if(!face.length) return 'tenir';
  const moi = effectifTotal(miens), lui = effectifTotal(face);
  if(miens.every(u => u.portee === 1) && lui > 0) return 'harceler';
  if(moi > lui * 1.4) return 'charger';
  if(moi < lui * 0.6) return 'tenir';
  return Math.random() < 0.4 ? 'charger' : 'tenir';
}

/* ── Le tour ────────────────────────────────────────────────────────────
 * Les deux camps frappent en même temps : on calcule tout avant d'appliquer
 * quoi que ce soit. C'est ce qui interdit de jouer en réaction et ce qui
 * fait qu'un ordre est un pari. */
function resoudreTour(){
  if(!bataille || bataille.over) return;
  bataille.journal = [];
  let moralOrdres = 0;

  bataille.fronts.forEach(front => {
    const ordreA = front.ordre;
    const ordreB = ordreEnnemi(front);
    const alliesVivants  = front.allies.filter(u => u.effectif > 0);
    const ennemisVivants = front.ennemis.filter(u => u.effectif > 0);
    if(!alliesVivants.length && !ennemisVivants.length) return;

    const terr = TERRAINS[front.terrain] ? front.terrain : 'plaine';

    const pA = puissanceFront(alliesVivants, ordreA, terr, ennemisVivants);
    const rA = resistanceFront(alliesVivants, ordreA, terr);
    const pB = puissanceFront(ennemisVivants, ordreB, terr, alliesVivants);
    const rB = resistanceFront(ennemisVivants, ordreB, terr);

    /* Le harcèlement ne se fait pas rendre ses coups par la mêlée d'en face. */
    const bAtteintParA = !(ORDRES[ordreB] || {}).tirSeul || (ORDRES[ordreA] || {}).tirSeul;
    const aAtteintParB = !(ORDRES[ordreA] || {}).tirSeul || (ORDRES[ordreB] || {}).tirSeul;

    const pertesB = bAtteintParA ? Math.max(ennemisVivants.length ? 1 : 0, Math.round((pA - rB * 0.5) / 5)) : 0;
    const pertesA = aAtteintParB ? Math.max(alliesVivants.length ? 1 : 0,  Math.round((pB - rA * 0.5) / 5)) : 0;

    const rB2 = infligerPertes(front.ennemis, Math.max(0, pertesB));
    const rA2 = infligerPertes(front.allies,  Math.max(0, pertesA));

    bataille.journal.push({
      front:front.nom, terrain:TERRAINS[terr].nom,
      ordreA:(ORDRES[ordreA] || {}).nom || ordreA,
      ordreB:(ORDRES[ordreB] || {}).nom || ordreB,
      eux:rB2.pertes, nous:rA2.pertes,
      dissoutesEux:rB2.dissoutes, dissoutesNous:rA2.dissoutes,
    });

    bataille.moralAllie  -= Math.round(rA2.pertes / Math.max(1, bataille.effectifInitialAllie)  * 90);
    bataille.moralEnnemi -= Math.round(rB2.pertes / Math.max(1, bataille.effectifInitialEnnemi) * 90);
    moralOrdres += (ORDRES[ordreA] || {}).moral || 0;

    /* Un front vidé de ses défenseurs entame le moral de toute l'armée. */
    if(!front.allies.some(u => u.effectif > 0) && front.ennemis.some(u => u.effectif > 0))
      bataille.moralAllie -= 6;
    if(!front.ennemis.some(u => u.effectif > 0) && front.allies.some(u => u.effectif > 0))
      bataille.moralEnnemi -= 6;
  });

  /* Moyenne des ordres, et non leur somme : tenir partout ne régénère pas
   * plus vite que les pertes n'entament. */
  bataille.moralAllie += Math.round(moralOrdres / bataille.fronts.length);

  /* Yohan sur un front : sa seule présence retient la ligne, sans la garantir. */
  if(bataille.yohanFront !== null && bataille.fronts[bataille.yohanFront].allies.some(u => u.effectif > 0))
    bataille.moralAllie += 1;

  bataille.moralAllie  = Math.max(0, Math.min(100, bataille.moralAllie));
  bataille.moralEnnemi = Math.max(0, Math.min(100, bataille.moralEnnemi));
  bataille.tour++;
}

/* Le Coup de l'Onde. Une fois par bataille, et jamais gratuitement : deux
 * mille personnes regardent un front, et ce qu'elles voient ne s'oublie pas. */
function coupDeLOnde(idx){
  if(!bataille || bataille.ondeUtilisee) return null;
  const front = bataille.fronts[idx];
  if(!front) return null;
  const vivants = front.ennemis.filter(u => u.effectif > 0);
  const pertes = Math.round(effectifTotal(vivants) * 0.35);
  const r = infligerPertes(front.ennemis, pertes);
  bataille.ondeUtilisee = true;
  bataille.moralEnnemi = Math.max(0, bataille.moralEnnemi - 22);
  bataille.moralAllie  = Math.min(100, bataille.moralAllie + 4);
  depenser({ concentration:40, endurance:20 });
  ETAT.suspicion = Math.min(100, ETAT.suspicion + 30);
  ETAT.flags.add('bat_onde_publique');
  return r;
}

function finDeBataille(){
  if(!bataille) return null;
  const nous = bataille.fronts.reduce((s, f) => s + effectifTotal(f.allies), 0)
             + effectifTotal(bataille.reserve);
  const eux  = bataille.fronts.reduce((s, f) => s + effectifTotal(f.ennemis), 0);
  if(eux <= 0)                              return 'gagnee';
  if(bataille.moralEnnemi <= 0)             return 'gagnee';
  if(nous <= 0)                             return 'perdue';
  if(bataille.moralAllie <= 0)              return 'perdue';
  if(bataille.tour > 8)                     return bataille.moralAllie >= bataille.moralEnnemi ? 'gagnee' : 'perdue';
  return null;
}

/* ══ 4 · LA BATAILLE COMME SCÈNE ═══════════════════════════════════════════
 * Le proto ne connaît que des scènes. Une bataille en est une seule, qui se
 * recompose à chaque tour : les fronts se lisent dans le texte, les ordres
 * sont les choix, et le champ change sous le joueur sans qu'il change
 * d'écran. */

/* `pretees` : des troupes qu'on ne possède pas et qu'on commande une fois.
 * C'est le cas normal avant Karlsberg — un homme sans maison n'a pas d'armée,
 * on lui en confie une, et ce qui en revient ne lui appartient toujours pas. */
function ouvrirBataille(idChamp, retour, pretees){
  const def = CHAMPS[idChamp];
  if(!def) return;
  const roster = pretees
    ? pretees.map(p => instancierUnite(p.type, p.effectifPct)).filter(Boolean)
    : armee().filter(u => u.effectif > 0);

  bataille = {
    def, retour: retour || 'entre_saisons',
    phase:'deploiement', tour:1,
    fronts: def.fronts.map((f, i) => ({
      idx:i, nom:f.nom, terrain:f.terrain, ordre:'tenir',
      allies:[], ennemis:(f.ennemis || []).map(e => instancierUnite(e.type, e.effectifPct)).filter(Boolean),
    })),
    reserve: roster,
    moralAllie:100, moralEnnemi:100,
    yohanFront:null, ondeUtilisee:false, over:false,
    journal:[], effectifInitialAllie:effectifTotal(roster),
    pretees:!!pretees,
  };
  bataille.effectifInitialEnnemi = bataille.fronts.reduce((s, f) => s + effectifTotal(f.ennemis), 0);
  aller('bat_champ');
}

/* ── Lire un front ──────────────────────────────────────────────────────
 * Jamais un tableau. Un capitaine ne lit pas des colonnes : il regarde une
 * ligne et il sait si elle tient. */
function lireFront(f){
  const t = TERRAINS[f.terrain] || TERRAINS.plaine;
  const nous = f.allies.filter(u => u.effectif > 0);
  const eux  = f.ennemis.filter(u => u.effectif > 0);
  const nom = u => `${u.nom} (${u.effectif})`;
  const cote = (list, vide) => list.length ? list.map(nom).join(' · ') : vide;
  return `**${f.nom}** — *${t.nom}.* ${t.desc}\n\n`
       + `Nous : ${cote(nous, "personne")}. En face : ${cote(eux, "plus personne")}.`;
}

/* Un nom de front porte son article — « Le pont-levis ». Au milieu d'une
 * phrase, la majuscule est une faute ; on la rend au bas de casse sans
 * toucher aux noms propres. */
const dedans = n => /^(Le |La |Les |L')/.test(n) ? n[0].toLowerCase() + n.slice(1) : n;

function etatDesTroupes(){
  const nous = bataille.fronts.reduce((s, f) => s + effectifTotal(f.allies), 0);
  const eux  = bataille.fronts.reduce((s, f) => s + effectifTotal(f.ennemis), 0);
  const dit = m => m >= 80 ? "entière" : m >= 55 ? "ébranlée" : m >= 30 ? "qui plie" : m > 0 ? "au bord de rompre" : "rompue";
  return `Nous sommes ${nous}, ils sont ${eux}. Notre ligne est ${dit(bataille.moralAllie)} ; la leur est ${dit(bataille.moralEnnemi)}.`;
}

/* Ce que le tour a coûté, raconté et non tabulé. */
function raconterLeTour(){
  if(!bataille.journal.length) return [];
  return bataille.journal.map(j => {
    let t = `**${j.front}** — ${j.ordreA} contre ${j.ordreB}. `;
    t += j.eux || j.nous
      ? `Ils laissent ${j.eux} hommes, nous ${j.nous}.`
      : `Rien ne bouge : deux lignes qui se regardent.`;
    if(j.dissoutesEux.length)  t += ` ${j.dissoutesEux.join(' et ')} n'existe plus.`;
    if(j.dissoutesNous.length) t += ` **${j.dissoutesNous.join(' et ')} n'existe plus.**`;
    return t;
  });
}

const BATAILLE = {

/* Le champ. Une seule scène, et elle se réécrit à chaque tour. */
bat_champ:{ dyn:true, texte:[] },

/* Le déploiement — la seule décision qu'on prend sans information. */
bat_deploiement:{ dyn:true, texte:[] },

bat_fin:{ dyn:true, texte:[] },

};

DYN.bat_deploiement = () => {
  const d = bataille.def;
  const reste = bataille.reserve.filter(u => u.effectif > 0);
  const u = reste[0];

  /* Une unité à la fois, dans l'ordre du rôle. On ne voit pas où sont les
   * autres pendant qu'on place celle-ci : c'est ce qui rend le déploiement
   * difficile, et c'est exactement ce qu'est un déploiement. */
  SCENES.bat_deploiement = {
    dyn:true,
    lieu:`${d.lieu} · avant le jour`,
    titre:"Où on les met",
    texte:[
      reste.length === bataille.effectifDeployables
        ? d.mise
        : "",
      `Il reste à placer : ${reste.map(x => `${x.nom} (${x.effectif})`).join(' · ')}.`,
      `**${u.nom}** — ${TROUPES[u.type] ? TROUPES[u.type].desc : ''}`,
      "§ On déploie sans savoir ce qu'ils feront. C'est la seule décision de la journée qu'on prend sans information, et c'est celle qui décide du reste.",
      ...bataille.fronts.map(lireFront),
    ].filter(Boolean),
    choix: bataille.fronts.map((f, i) => ({
      t:`${f.nom}`,
      detail:() => {
        const t = TERRAINS[f.terrain];
        const c = u.categorie === 'cavalerie' ? t.cav : u.categorie === 'archers' ? t.arc : t.inf;
        return `${t.nom} · ${c >= 1.2 ? "le terrain les sert" : c <= 0.8 ? "le terrain les gêne" : "terrain neutre"}`
             + ` · en face : ${effectifTotal(f.ennemis.filter(x => x.effectif > 0)) || 0}`;
      },
      risque:'calculé',
      avant:() => {
        bataille.fronts[i].allies.push(u);
        bataille.reserve = bataille.reserve.filter(x => x.uid !== u.uid);
      },
      va:() => bataille.reserve.filter(x => x.effectif > 0).length ? 'bat_deploiement' : 'bat_champ',
    })),
  };
  aller('bat_deploiement');
};

DYN.bat_champ = () => {
  /* Déploiement d'abord, et une seule fois. */
  if(bataille.phase === 'deploiement'){
    if(bataille.reserve.filter(u => u.effectif > 0).length){
      bataille.effectifDeployables = bataille.reserve.length;
      aller('bat_deploiement');
      return;
    }
    bataille.phase = 'bataille';
  }

  const issue = finDeBataille();
  if(issue){ bataille.issue = issue; aller('bat_fin'); return; }

  const d = bataille.def;
  const premierTour = bataille.tour === 1;

  const texte = [
    premierTour ? d.intro : "",
    ...raconterLeTour(),
    etatDesTroupes(),
    ...bataille.fronts.map(lireFront),
    bataille.yohanFront === null
      ? "§ Vous n'êtes sur aucun front. On vous voit de partout et on ne vous a nulle part."
      : `§ Vous êtes sur **${bataille.fronts[bataille.yohanFront].nom}**. Tant que vous y êtes debout, la ligne y tient un peu plus qu'elle ne le devrait.`,
  ].filter(Boolean);

  /* Trois ordres à donner, un par front, puis le tour se résout. Pour ne pas
   * faire un formulaire, on donne le front qui a le plus besoin d'un ordre :
   * celui où quelque chose est encore debout des deux côtés. */
  const chauds = bataille.fronts.filter(f =>
    f.allies.some(u => u.effectif > 0) && f.ennemis.some(u => u.effectif > 0));
  const cible = chauds[0] || bataille.fronts[0];

  const choix = Object.entries(ORDRES).map(([id, o]) => ({
    t:`${cible.nom} — ${o.nom}`,
    detail:o.desc,
    risque:id === 'charger' ? 'risqué' : id === 'replier' ? 'prudent' : 'calculé',
    avant:() => {
      cible.ordre = id;
      /* Les autres fronts gardent l'ordre qu'on leur a laissé la dernière
       * fois : un capitaine ne redonne pas trois ordres par heure. */
      resoudreTour();
    },
    va:'bat_champ',
  }));

  if(bataille.yohanFront === null || bataille.yohanFront !== cible.idx)
    choix.push({
      t:`Aller sur ${dedans(cible.nom)}`,
      detail:"Votre présence tient le moral · elle ne le garantit pas · et on vous voit",
      risque:'calculé',
      avant:() => { bataille.yohanFront = cible.idx; },
      va:'bat_champ',
    });

  if(!bataille.ondeUtilisee && bataille.yohanFront !== null)
    choix.push({
      t:"Le Coup de l'Onde",
      detail:() => `Un tiers de ce qui est en face de vous, d'un coup · devant toute une armée · +30 suspicion`,
      risque:'définitif',
      ferme:"Ferme : l'idée que personne ne sait ce que vous êtes",
      avant:() => { coupDeLOnde(bataille.yohanFront); },
      va:'bat_champ',
    });

  SCENES.bat_champ = {
    dyn:true,
    lieu:`${d.lieu} · ${['première','deuxième','troisième','quatrième','cinquième','sixième','septième','huitième'][Math.min(bataille.tour - 1, 7)]} heure`,
    titre:premierTour ? d.nom : `${d.nom} — ${cible.nom}`,
    texte, choix,
  };
  aller('bat_champ');
};

DYN.bat_fin = () => {
  const d = bataille.def;
  const gagne = bataille.issue === 'gagnee';
  const bilan = gagne ? d.victoire : d.defaite;

  /* Les pertes sont définitives : ce qui reste au rôle est ce qui est
   * remonté du champ, et rien ne se reconstitue tout seul. */
  const survivants = bataille.fronts.flatMap(f => f.allies).concat(bataille.reserve)
    .filter(u => u.effectif > 0);
  const perdus = bataille.effectifInitialAllie - effectifTotal(survivants);
  if(!bataille.pretees) ETAT.armee = survivants;

  SCENES.bat_fin = {
    dyn:true,
    lieu:`${d.lieu} · au soir`,
    titre:gagne ? "La ligne a tenu" : "La ligne a cédé",
    texte:[
      bilan.texte,
      perdus > 0
        ? `Il manque ${perdus} hommes au rôle ce soir. On les compte au matin, une fois, et on ne recommence pas.`
        : "Personne ne manque au rôle. C'est arrivé trois fois dans l'histoire de cette province et personne n'y croira.",
      a('bat_onde_publique')
        ? "§ Et il y a ce qu'un front entier a vu faire à un homme qui n'aurait pas dû pouvoir le faire. Ça ne s'oublie pas, ça se raconte, et ça se raconte vite."
        : "",
    ].filter(Boolean),
    effets:{
      flags:bilan.flags,
      exploit:bilan.renom > 0
        ? { eclat:bilan.renom, temoins:bilan.temoins || 'foule', quoi:`vous avez commandé à ${d.nom.toLowerCase()}` }
        : null,
      faire:() => { if(bilan.renom < 0) ETAT.renom = Math.max(0, ETAT.renom + bilan.renom); },
      marque:gagne ? `${d.nom} — la ligne a tenu.` : `${d.nom} — la ligne a cédé.`,
      court:d.nom,
    },
    issue:gagne ? "La bataille est gagnée" : "La bataille est perdue",
    bilan:gagne ? d.nom : `${d.nom}, et ce qu'elle coûte`,
    suite:bataille.retour, libelleSuite:"Après",
  };
  ETAT.derniereBataille = bataille.issue;
  aller('bat_fin');
};

enregistrerScenes(BATAILLE);
