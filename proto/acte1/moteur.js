/* PARIAS — Acte I · le moteur
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Conforme à design/narratif_v7/docs/SYSTEME_COMBAT_NARRATIF_V7.md.
 *
 *   POSITION → INTENTION → TEST → CONSÉQUENCE → NOUVELLE POSITION
 *
 * Le joueur choisit une **intention**, jamais un résultat. Le moteur la
 * confronte à ce que Yohan sait faire, à ce qu'il porte, à ce qu'il a déjà
 * cassé, au terrain et à l'adversaire — puis affiche une scène écrite pour le
 * degré obtenu.
 *
 * Cinq degrés, pas deux. La réussite coûteuse est le cœur du système : on
 * obtient ce qu'on voulait, et on le paie.
 * ═══════════════════════════════════════════════════════════════════════ */

/* ── L'aléa ────────────────────────────────────────────────────────────────
 * Deux dés à six faces moins sept : de −5 à +5, en cloche. Les extrêmes sont
 * rares. Le pack l'exige — « l'aléa ne doit jamais effacer une différence
 * énorme de niveau ». Un charretier ne tue pas Yohan sur un coup heureux. */
const de = n => 1 + Math.floor(Math.random() * n);
const alea = () => de(6) + de(6) - 7;

const DEGRES = [
  { id:'dominante',  min: 6, nom:"Domination",        note:"objectif atteint, et un avantage en plus" },
  { id:'nette',      min: 2, nom:"Réussite nette",    note:"objectif atteint" },
  { id:'couteuse',   min:-1, nom:"Réussite coûteuse", note:"objectif atteint — et vous le payez" },
  { id:'echec',      min:-5, nom:"Échec",             note:"position dégradée, la scène continue" },
  { id:'catastrophe',min:-99,nom:"Catastrophe",       note:"" },
];
const degreDeMarge = m => DEGRES.find(d => m >= d.min);

/* ── L'état ─────────────────────────────────────────────────────────────── */
const ETAT = {
  carac:{}, comp:{}, ressources:{},
  or:0, renom:0, suspicion:0,
  flags:new Set(),
  blessures:[],          // structurées : zone, type, gravité, fonction perdue…
  faits:[], portes:[],
  adaptation:{},         // manœuvres déjà servies, par adversaire
  gore:'intense',        // sobre · intense · extrême
  scene:null,
  melee:null,
  acte:{ saison:0, engagements:3, arcsFaits:[], arcsIgnores:[] },
};
const a = f => ETAT.flags.has(f);

/* ── Les blessures ─────────────────────────────────────────────────────────
 * Une blessure n'est pas un malus global. Elle a une zone, une fonction
 * perdue, et elle ne gêne que ce qu'elle gêne réellement : un avant-bras
 * ouvert n'empêche pas de mentir à un notaire. */
function blesser(b){
  if(ETAT.blessures.some(x => x.id === b.id)) return null;
  const blessure = Object.assign({
    gravite:2, douleur:2, saignement:0, fonction:[], traitement:null, cicatrice:null,
  }, b);
  ETAT.blessures.push(blessure);
  return blessure;
}

function malusDe(carac, comp){
  let m = 0;
  for(const b of ETAT.blessures){
    if(b.fonction.includes(carac) || b.fonction.includes(comp)) m += b.gravite;
    else if(b.douleur >= 3) m += 1;          // une douleur forte gêne tout
  }
  const sang = ETAT.ressources.sang;
  if(sang <= 40) m += 2;
  if(sang <= 20) m += 3;
  const end = ETAT.ressources.endurance;
  if(end <= 30) m += 1;
  if(end <= 10) m += 2;
  return m;
}

/* Le saignement se paie à chaque scène, pas à la fin du combat. */
function saigner(){
  const perte = ETAT.blessures.reduce((s, b) => s + (b.saignement || 0), 0);
  if(!perte) return null;
  ETAT.ressources.sang = Math.max(0, ETAT.ressources.sang - perte);
  return perte;
}

function soigner(id, comment){
  const b = ETAT.blessures.find(x => x.id === id);
  if(!b) return false;
  b.saignement = 0;
  b.traitement = comment || "pansé";
  b.gravite = Math.max(1, b.gravite - 1);
  return true;
}

/* ── L'adaptation adverse ──────────────────────────────────────────────────
 * « Répéter une manœuvre donne ADAPTATION +2, puis +4 à l'ennemi. »
 * Un adversaire intelligent apprend vos habitudes en trois échanges. */
function adaptationDe(adversaire, manoeuvre){
  if(!adversaire || !manoeuvre) return 0;
  const cle = adversaire + '/' + manoeuvre;
  const n = ETAT.adaptation[cle] || 0;
  return n === 0 ? 0 : (n === 1 ? 2 : 4);
}
function noterManoeuvre(adversaire, manoeuvre){
  if(!adversaire || !manoeuvre) return;
  const cle = adversaire + '/' + manoeuvre;
  ETAT.adaptation[cle] = (ETAT.adaptation[cle] || 0) + 1;
}

/* ── La résolution ─────────────────────────────────────────────────────────
 *   MARGE = caractéristique + compétence + équipement + situation
 *           − blessures − adaptation − difficulté + aléa                    */
/* `situation`, `equipement` et `dc` acceptent une fonction : ce que Yohan a
 * appris pendant l'enquête doit peser au moment du jet, pas au chargement du
 * fichier. Savoir qu'elle ne tourne pas à gauche vaut deux points. */
const val  = (x) => (typeof x === 'function' ? x() : (x || 0));
const val2 = (x) => (typeof x === 'function' ? x() : x);

function resoudre(t){
  const carac = ETAT.carac[t.carac] || 0;
  const comp  = t.comp ? (ETAT.comp[t.comp] || 0) : 0;
  const equip = val(t.equipement);
  const situ  = val(t.situation);
  const dc    = val(t.dc);
  const bless = malusDe(t.carac, t.comp);
  const adapt = adaptationDe(t.adversaire, t.manoeuvre);
  const d     = alea();
  const marge = carac + comp + equip + situ - bless - adapt - dc + d;
  noterManoeuvre(t.adversaire, t.manoeuvre);
  if(t.cout) depenser(t.cout);
  return { marge, degre: degreDeMarge(marge).id, detail:{ carac, comp, equip, situ, bless, adapt, d, dc } };
}

function depenser(c){
  for(const [k, n] of Object.entries(c))
    ETAT.ressources[k] = Math.max(0, Math.min(100, (ETAT.ressources[k] || 0) - n));
}

/* ── Le renom : ce que les témoins ont vu ──────────────────────────────────
 * Un exploit sans témoin ne compte pas. C'est toute la mécanique de l'acte :
 * on monte en se faisant voir, et se faire voir attire ceux qui cherchent un
 * Paria. Le silence est gratuit et ne mène nulle part. */
const TEMOINS = {
  aucun:   { f:0,    nom:"personne" },
  un:      { f:0.25, nom:"un homme" },
  quelques:{ f:0.55, nom:"quelques-uns" },
  foule:   { f:1,    nom:"toute une salle" },
  province:{ f:1.6,  nom:"la province entière" },
};

const RANGS = [
  { id:'inconnu',   seuil:0,  cri:"Nous cherchons un Paria",
    note:"Personne ne connaît votre nom. C'est confortable et ça ne paie rien." },
  { id:'nomme',     seuil:45, cri:"Nous cherchons Yohan",
    note:"On vous demande par votre nom. Les contrats montent, les questions aussi." },
  { id:'karlsberg', seuil:95, cri:"Nous cherchons Yohan de Karlsberg",
    note:"Le nom est ressorti. Ce qui vous cherche maintenant n'a plus rien d'un commanditaire." },
];
const rangActuel = () => RANGS.slice().reverse().find(r => ETAT.renom >= r.seuil) || RANGS[0];

/* Un exploit : un éclat, des témoins, et ce qu'on en dira. */
function exploit(e){
  const t = TEMOINS[val2(e.temoins)] || TEMOINS.aucun;
  const gagne = Math.round((e.eclat || 0) * t.f);
  const avant = rangActuel().id;
  ETAT.renom += gagne;
  if(e.suspicion) ETAT.suspicion = Math.min(100, ETAT.suspicion + Math.round(e.suspicion * (t.f || 0.2)));
  const monte = rangActuel().id !== avant;
  return { gagne, temoins:t, monte, rang:rangActuel(), quoi:e.quoi };
}

/* ── Le texte gradué ───────────────────────────────────────────────────────
 * Un paragraphe peut être écrit en trois intensités. Le détail change ; la
 * conséquence mécanique, jamais. */
/* Un peu de gras et d'italique, rien d'autre : le récit n'a pas besoin de plus. */
function md(t){
  return t.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\*([^*]+)\*/g, '<i>$1</i>');
}

function texteDe(p){
  if(typeof p === 'function') p = p();      // un paragraphe qui lit l'état
  if(!p) return '';
  if(typeof p === 'string') return p;
  return p[ETAT.gore] || p.intense || p.sobre || '';
}

/* ── Les effets d'une scène ou d'un choix ──────────────────────────────── */
function appliquer(e){
  if(!e) return [];
  const tags = [];
  const T = (cls, txt) => tags.push(`<span class="${cls}">${txt}</span>`);

  if(e.faire) e.faire();
  const or = val(e.or);
  if(or){ ETAT.or += or; T(or > 0 ? 'bien' : 'mal', `${or > 0 ? '+' : '−'}${Math.abs(or)} or`); }
  (e.flags || []).forEach(f => ETAT.flags.add(f));
  if(e.flag) ETAT.flags.add(e.flag);
  if(e.cout) depenser(e.cout);
  if(e.rendre) for(const [k, n] of Object.entries(e.rendre))
    ETAT.ressources[k] = Math.min(100, (ETAT.ressources[k] || 0) + n);

  if(e.blessure){
    const b = blesser(e.blessure);
    if(b) T('mal', `${b.zone} — ${b.type}`);
  }
  if(e.soigne && soigner(e.soigne.id, e.soigne.comment)) T('bien', "blessure pansée");

  if(e.exploit){
    const r = exploit(e.exploit);
    if(r.gagne > 0) T('renom', `+${r.gagne} renom · vu par ${r.temoins.nom}`);
    else T('rien', "personne n'a vu");
    if(r.monte) T('rang', `On dit désormais : « ${r.rang.cri} »`);
  }
  if(e.suspicion){ ETAT.suspicion = Math.min(100, ETAT.suspicion + e.suspicion); T('mal', `+${e.suspicion} suspicion`); }
  if(e.marque){ ETAT.faits.push(e.marque); T('marque', e.court || "inscrit au journal"); }
  if(e.melee) ETAT.melee = Object.assign({}, e.melee);
  if(e.meleeMaj && ETAT.melee) Object.assign(ETAT.melee, e.meleeMaj);
  (e.tags || []).forEach(x => T('', x));

  majBandeau();
  return tags;
}

/* ── Rendu ─────────────────────────────────────────────────────────────── */
let SCENES = {};
let dernierJet = null;

function enregistrerScenes(bloc){ Object.assign(SCENES, bloc); }

/* Scènes composées à l'ouverture : le tableau des mercenaires, le
 * basculement, les aiguillages qui lisent l'état de la partie. */
const DYN = {};

function aller(id){
  const s = SCENES[id];
  if(!s){ console.error('Scène absente :', id); return; }
  /* Un aiguillage qui se compose lui-même — la carte, l'épilogue — réécrit
   * SCENES[id] puis se rappelle. Sans ce garde-fou il boucle ; avec, il
   * garde son `dyn` et se recompose à chaque visite au lieu de servir une
   * fois la version périmée de la saison précédente. */
  if(s.dyn && DYN[id] && aller.encours !== id){
    aller.encours = id;
    try { DYN[id](); } finally { aller.encours = null; }
    return;
  }
  ETAT.scene = id;

  const perte = saigner();
  const el = document.getElementById('scene');
  let h = '';

  /* `lieu` et `titre` acceptent une fonction, comme le reste : une scène qui
   * se rejoue à des saisons différentes doit pouvoir dire où et quand. */
  const lieu = val2(s.lieu), titre = val2(s.titre);
  if(lieu)  h += `<p class="lieu">${lieu}</p>`;
  if(titre) h += `<h1>${titre}</h1>`;
  if(dernierJet){ h += dernierJet; dernierJet = null; }
  if(s.qui) h += vignette(s.qui);
  if(s.melee && ETAT.melee) h += barreMelee();

  const tags = appliquer(s.effets);
  if(perte) tags.push(`<span class="mal">−${perte} sang</span>`);
  if(tags.length) h += `<div class="effets">${tags.join('')}</div>`;

  h += (s.texte || []).map(texteDe).filter(Boolean).map(t =>
    t.startsWith('§') ? `<p class="souffle">${md(t.slice(1))}</p>` : `<p class="recit">${md(t)}</p>`
  ).join('');

  if(s.issue) h += blocIssue(s);

  const choix = (s.choix || []).filter(c => !c.si || c.si());
  if(choix.length){
    h += '<div class="choix">' + choix.map((c, i) => {
      const bloque = c.requisOr && ETAT.or < c.requisOr;
      const ferme = val2(c.ferme);
      /* `t` et `detail` acceptent une fonction : un choix qui compte des
       * charges ou lit l'état doit pouvoir le dire au moment du rendu. */
      const t = val2(c.t), detail = val2(c.detail);
      return `<button data-i="${i}" class="${c.definitif ? 'definitif' : ''}"${
        c.risque ? ` data-risque="${c.risque}"` : ''}${bloque ? ' disabled' : ''}>
        <span class="ch-t">${t}</span>
        ${c.risque ? `<span class="ch-risque">${c.risque}</span>` : ''}
        ${detail ? `<span class="ch-detail">${bloque ? `Il vous manque ${c.requisOr - ETAT.or} or — ` : ''}${detail}</span>` : ''}
        ${ferme ? `<span class="ch-ferme">${ferme}</span>` : ''}
      </button>`;
    }).join('') + '</div>';
  } else if(s.suite){
    h += `<div class="suite"><button data-suite="1">${s.libelleSuite || 'Continuer'}</button></div>`;
  }

  el.innerHTML = h;
  window.scrollTo({ top:0, behavior:'instant' });

  el.querySelectorAll('.choix button:not([disabled])').forEach(b =>
    b.onclick = () => jouer(choix[+b.dataset.i]));
  const suiv = el.querySelector('[data-suite]');
  if(suiv) suiv.onclick = () => aller(s.suite);

  if(typeof sauver === 'function') sauver();
}

function jouer(c){
  if(c.avant) c.avant();
  appliquer(c.effets);
  const ferme = val2(c.ferme);
  if(ferme) ETAT.portes.push(ferme.replace(/^Ferme : /, ''));

  if(c.test){
    const r = resoudre(c.test);
    const d = DEGRES.find(x => x.id === r.degre);
    const NOMS = { force:'Force', agilite:'Agilité', endurance:'Endurance', perception:'Perception',
                   intellect:'Intellect', volonte:'Volonté', presence:'Présence' };
    const COMPS = { epees:'épées', dagues:'dagues', lutte:'lutte', armes_lourdes:'armes lourdes',
                    hast:"armes d'hast", tir:'tir', jet:'armes de jet', bouclier:'bouclier',
                    equitation:'équitation', anatomie:'anatomie', bestiaire:'bestiaire',
                    alchimie:'alchimie', furtivite:'furtivité', tactique:'tactique',
                    commandement:'commandement', onde:"maîtrise de l'Onde" };
    const parts = [`${NOMS[c.test.carac]} ${r.detail.carac}`];
    if(c.test.comp) parts.push(`${COMPS[c.test.comp] || c.test.comp} ${r.detail.comp}`);
    if(r.detail.equip) parts.push(`équipement ${r.detail.equip > 0 ? '+' : ''}${r.detail.equip}`);
    if(r.detail.situ)  parts.push(`terrain ${r.detail.situ > 0 ? '+' : ''}${r.detail.situ}`);
    if(r.detail.bless) parts.push(`blessures −${r.detail.bless}`);
    if(r.detail.adapt) parts.push(`il vous a lu −${r.detail.adapt}`);
    dernierJet = `<p class="jet ${r.degre}">${parts.join(' · ')} contre ${r.detail.dc}
      <b>${d.nom}</b>${d.note ? ` — ${d.note}` : ''}</p>`;
    aller(cible(c.degres, r.degre));
    return;
  }
  aller(c.va);
}

/* Une scène par degré, et un repli vers le voisin le plus proche : on n'oblige
 * pas l'auteur à écrire cinq issues là où trois suffisent. */
function cible(degres, obtenu){
  const ordre = ['dominante', 'nette', 'couteuse', 'echec', 'catastrophe'];
  const i = ordre.indexOf(obtenu);
  for(let d = 0; d < 5; d++){
    if(degres[ordre[i - d]]) return degres[ordre[i - d]];
    if(degres[ordre[i + d]]) return degres[ordre[i + d]];
  }
  return degres.nette || Object.values(degres)[0];
}

/* ── Habillage ─────────────────────────────────────────────────────────── */
function vignette(id){
  const g = GENS[id];
  if(!g) return '';
  return `<div class="qui"><div class="visage">${g.lettre}</div>
    <div><div class="nom">${g.nom}</div><div class="role">${g.role}</div></div></div>`;
}

function barreMelee(){
  const m = ETAT.melee;
  return `<div class="melee">
    ${m.eux !== undefined ? `<span>Debout en face · <b>${m.eux}</b></span>` : ''}
    ${m.position ? `<span>Position · <b>${m.position}</b></span>` : ''}
    ${m.note ? `<span>${m.note}</span>` : ''}</div>`;
}

function blocIssue(s){
  return `<div class="issue"><p class="etiquette">${s.issue}</p><h2>${s.bilan}</h2>
    ${(s.apres || []).map(texteDe).filter(Boolean).map(t => `<p class="recit">${md(t)}</p>`).join('')}
    ${s.plusTard ? `<div class="plus-tard"><p class="etiquette">Ce que ça coûtera</p><p>${s.plusTard}</p></div>` : ''}</div>`;
}

/* ── Le bandeau et le journal ──────────────────────────────────────────── */
function majBandeau(){
  const r = rangActuel();
  const set = (id, v) => { const el = document.getElementById(id); if(el) el.innerHTML = v; };
  set('bRang', `« ${r.cri} »`);
  set('bOr', ETAT.or + ' or');
  set('bChair', etatDuCorps());
  const j = document.getElementById('journalCorps');
  if(!j) return;
  const liste = (titre, sous, items, cls, vide) =>
    `<h2>${titre}</h2><p class="sous">${sous}</p><ul>${items.length
      ? items.map(x => `<li class="${cls}">${x}</li>`).join('')
      : `<li class="vide">${vide}</li>`}</ul>`;

  j.innerHTML =
    `<h2>Ce que Yohan sait faire</h2><p class="sous">Échelle mortelle : 1 à 10</p>
     <div class="fiche">${Object.entries(ETAT.carac).map(([k, v]) =>
        `<span><i>${CARAC_NOMS[k]}</i><b>${v}</b></span>`).join('')}</div>
     <div class="fiche fiche-comp">${['epees','lutte','anatomie','bestiaire','tactique','onde','furtivite','jet']
        .map(k => `<span><i>${k === 'onde' ? "Onde" : k}</i><b>${ETAT.comp[k]}</b></span>`).join('')}</div>
     <div class="jauges">${Object.entries(ETAT.ressources).map(([k, v]) =>
        `<div class="jauge"><i>${k}</i><span style="width:${v}%"></span><b>${v}</b></div>`).join('')}</div>` +
    liste("Ce que vous portez", "Une blessure ne gêne que ce qu'elle gêne",
      ETAT.blessures.map(b => `<b>${b.zone}</b> — ${b.type}${b.fonction.length
        ? ` <i>(gêne : ${b.fonction.join(', ')})</i>` : ''}${b.saignement ? ` <u>saigne</u>` : ''}${
        b.traitement ? ` · ${b.traitement}` : ''}`), 'plaie', "Rien de cassé. Pour l'instant.") +
    liste("Ce que vous avez fait", "Rien ici ne se reprend", ETAT.faits, '', "La journée commence.") +
    liste("Ce que vous ne pouvez plus faire", "Les portes fermées", ETAT.portes, 'close',
      "Toutes les routes sont encore ouvertes.");
}

function etatDuCorps(){
  const n = ETAT.blessures.length;
  const sang = ETAT.ressources.sang;
  if(!n && sang > 90) return '';
  const mots = [];
  if(n) mots.push(n + (n > 1 ? ' plaies' : ' plaie'));
  if(sang <= 40) mots.push('vous perdez du sang');
  if(ETAT.ressources.endurance <= 30) mots.push('à bout de souffle');
  return mots.join(' · ');
}

const CARAC_NOMS = { force:'Force', agilite:'Agilité', endurance:'Endurance', perception:'Perception',
                     intellect:'Intellect', volonte:'Volonté', presence:'Présence' };
