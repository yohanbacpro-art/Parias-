/* PARIAS — Les liens, sur quatre axes séparés
 *
 * Le document fondateur : *« Jamais une barre à remplir. Séparer au minimum
 * relation / confiance / attirance / compatibilité politique. Alycia et
 * Alarielle sont majeures et facultatives. Elles peuvent aimer Yohan et être en
 * désaccord avec lui, refuser, rompre, ou préférer leurs propres intérêts. »*
 *
 * D'où quatre axes, qui ne bougent pas ensemble :
 *
 *   relation    le temps passé, ce qu'on a traversé côte à côte
 *   confiance   ce qu'elle croit de ce que vous dites. Un mensonge la casse
 *               d'un coup et elle remonte lentement.
 *   attirance   ce qui n'a rien à voir avec les trois autres
 *   politique   **dérivée du monde**, pas d'un compteur : ce que vos actes
 *               coûtent à ce qu'elle défend. Alycia lit votre loyauté envers les
 *               Parias ; Alarielle lit vos engagements et leurs conséquences.
 *
 * Une jauge élevée ne suffit jamais. Chaque palier exige *plusieurs* axes à la
 * fois, et le refus n'est pas un échec de dé : c'est un désaccord, il porte une
 * raison, et cette raison s'affiche.
 *
 * COMPATIBILITÉ. `hero.affinites` reste écrit et lu : c'est la lecture courte
 * des axes. Tout ce qui l'utilisait — `requis.affinite` des événements écrits,
 * `si.affinite` des verdicts d'épilogue, les jalons de romance — continue de
 * fonctionner tel quel.
 */

const LIENS_AXES = ['relation', 'confiance', 'attirance'];

/* Ce que chacune regarde en priorité, et ce qu'elle ne pardonne pas. */
const LIENS_PROFILS = {
  alycia: {
    nom:"Alycia de Callensbourg",
    juge:"la loyauté envers les Parias, et la franchise",
    /* Sa compatibilité politique se lit dans ce que Yohan fait des siens. */
    politique(){
      let n = Math.round(reputationDe('parias') / 12);
      if(hasFlag('genealogies_vendues'))   n -= 10;
      if(hasFlag('genealogies_brulees'))   n += 4;
      if(hasFlag('cause_parias'))          n += 3;
      if(hasFlag('caleb_desolidarise'))    n += 1;
      if(hasFlag('lucius_offre') && hasFlag('banniere_haute')) n -= 2;
      return Math.max(-12, Math.min(12, n));
    },
    /* Ce qui casse la confiance chez elle : lui mentir, ou vendre les siens. */
    trahisons:[
      { flag:'genealogies_vendues', n:-9, quoi:"vous avez vendu la liste des Parias vivants" },
      { flag:'alycia_partie',       n:-4, quoi:"elle est partie, et vous l'avez laissée partir" },
    ],
  },
  alarielle: {
    nom:"Alarielle",
    juge:"les engagements tenus, et ce qu'ils coûtent au monde",
    politique(){
      let n = Math.round(reputationDe('elfes') / 12);
      if(criseEtape('ELFES') >= 4)         n -= 6;   // sa cour en guerre la reprend
      if(hasFlag('trois_chenes_traite'))   n += 5;
      if(hasFlag('alarielle_rappelee'))    n -= 4;
      if(hasFlag('alarielle_a_choisi'))    n += 8;
      if(hasFlag('valombre_dragon_mort'))  n -= 2;
      return Math.max(-12, Math.min(12, n));
    },
    trahisons:[
      { flag:'tyrion_rapport_faux', n:-5, quoi:"un rapport faux, signé de votre main" },
      { flag:'convoi_plomb_rompu',  n:-4, quoi:"un plomb rompu sur un convoi sous parole" },
    ],
  },
  eleonore: {
    nom:"Éléonore",
    juge:"ce qu'on fait de sa maison",
    politique(){ return Math.round(reputationDe('humains') / 14); },
    trahisons:[],
  },
};

/* ============================= L'ÉTAT ============================= */

function heroLiens(){
  if(!hero.liens) hero.liens = {};
  for(const qui of Object.keys(LIENS_PROFILS)){
    if(!hero.liens[qui]) hero.liens[qui] = {
      relation:0, confiance:0, attirance:0,
      griefs:[], promesses:[], etat:'inconnu',
    };
  }
  return hero.liens;
}

function lienDe(qui){ return heroLiens()[qui] || null; }

function axeDe(qui, axe){
  if(axe === 'politique'){
    const p = LIENS_PROFILS[qui];
    if(!p) return 0;
    try { return p.politique(); } catch(e){ return 0; }
  }
  const l = lienDe(qui);
  return l ? (l[axe] || 0) : 0;
}

/* Ce qu'une scène écrite peut faire : bouger un ou plusieurs axes d'un coup,
 * et jamais tous dans le même sens. */
function ajusterLien(qui, delta){
  const l = lienDe(qui);
  if(!l) return;
  for(const axe of LIENS_AXES){
    if(typeof delta[axe] === 'number')
      l[axe] = Math.max(-12, Math.min(12, l[axe] + delta[axe]));
  }
  if(delta.grief) l.griefs.push({ quoi: delta.grief, semaine: semaineCourante() });
  if(delta.promesse) l.promesses.push({ quoi: delta.promesse, semaine: semaineCourante() });
  syncAffinites();
}

/* Ce que le monde a fait à sa confiance, sans qu'aucune scène l'écrive. */
function relireTrahisons(){
  for(const [qui, p] of Object.entries(LIENS_PROFILS)){
    const l = lienDe(qui);
    for(const t of (p.trahisons || [])){
      if(!hasFlag(t.flag)) continue;
      if(l.griefs.some(g => g.flag === t.flag)) continue;
      l.griefs.push({ flag: t.flag, quoi: t.quoi, semaine: semaineCourante() });
      l.confiance = Math.max(-12, l.confiance + t.n);
    }
  }
  syncAffinites();
}

/* La lecture courte, pour tout ce qui lisait `affinites` avant les axes. */
function syncAffinites(){
  if(!hero.affinites) hero.affinites = { ...AFFINITES_DEPART };
  for(const qui of Object.keys(LIENS_PROFILS)){
    const l = lienDe(qui);
    hero.affinites[qui] = Math.max(0, Math.round((l.relation + l.confiance + l.attirance) / 3));
  }
}

/* ============================= LES PALIERS =============================
 * Un palier n'est jamais un seuil unique. Il faut plusieurs axes à la fois —
 * c'est ce qui fait qu'on peut être désiré et pas cru, ou aimé et refusé. */

const LIENS_PALIERS = [
  { id:'inconnu',      nom:"Vous ne vous connaissez pas",
    exige:{} },
  { id:'connaissance', nom:"Vous vous connaissez",
    exige:{ relation:2 } },
  { id:'confiance',    nom:"Elle vous croit",
    exige:{ relation:4, confiance:4 } },
  { id:'attachement',  nom:"Il y a quelque chose",
    exige:{ relation:5, confiance:4, attirance:5 } },
  { id:'amants',       nom:"Vous êtes ensemble",
    exige:{ relation:6, confiance:6, attirance:7 } },
  { id:'engagement',   nom:"Elle a choisi de rester",
    exige:{ relation:8, confiance:8, attirance:8, politique:0 } },
  { id:'mariage',      nom:"Elle vous a épousé",
    exige:{ relation:10, confiance:9, attirance:8, politique:3 } },
];

function palierAtteint(qui){
  let dernier = LIENS_PALIERS[0];
  for(const p of LIENS_PALIERS){
    const ok = Object.entries(p.exige).every(([axe, n]) => axeDe(qui, axe) >= n);
    if(ok) dernier = p; else break;
  }
  return dernier;
}

/* Ce qui bloque le palier suivant — et c'est ça qu'on montre au joueur, jamais
 * un nombre. Un refus a toujours une raison, et elle est dite. */
const LIENS_MANQUES = {
  relation:  qui => "vous ne vous êtes pas assez vus pour ça",
  confiance: qui => "elle ne croit pas encore ce que vous dites",
  attirance: qui => "ce n'est pas ce qu'elle ressent",
  politique: qui => qui === 'alycia'
    ? "ce que vous faites des Parias se met en travers"
    : "ce que vous êtes en train de faire coûte trop à ce qu'elle défend",
};

function cequiBloque(qui){
  const actuel = palierAtteint(qui);
  const i = LIENS_PALIERS.findIndex(p => p.id === actuel.id);
  const suivant = LIENS_PALIERS[i + 1];
  if(!suivant) return null;
  const manques = Object.entries(suivant.exige)
    .filter(([axe, n]) => axeDe(qui, axe) < n)
    .map(([axe]) => LIENS_MANQUES[axe](qui));
  return { palier: suivant, manques };
}

/* La question que pose une scène avant de proposer un pas de plus : est-ce
 * qu'elle dirait oui ? Et si non, pourquoi. */
function elleAccepterait(qui, palierId){
  const p = LIENS_PALIERS.find(x => x.id === palierId);
  if(!p) return { oui:false, parce:"ce palier n'existe pas" };
  const manques = Object.entries(p.exige)
    .filter(([axe, n]) => axeDe(qui, axe) < n)
    .map(([axe]) => LIENS_MANQUES[axe](qui));
  return manques.length
    ? { oui:false, parce: manques[0], tous: manques }
    : { oui:true, parce:null, tous:[] };
}

/* ============================= DEUX EN MÊME TEMPS =============================
 * Le pack l'autorise et refuse la rivalité caricaturale automatique. Ce qui est
 * mémorisé, ce sont les mensonges et les promesses incompatibles. */

function promesseExclusive(qui){
  const l = lienDe(qui);
  return !!l && l.promesses.some(p => p.quoi === 'exclusivite');
}

function liensSimultanes(){
  return Object.keys(LIENS_PROFILS)
    .filter(qui => ['amants','engagement','mariage'].includes(palierAtteint(qui).id));
}

/* Vrai quand une promesse faite à l'une est démentie par ce qui se passe avec
 * l'autre. C'est ce qui arme la scène de clarification. */
function promesseRompue(){
  const doubles = liensSimultanes();
  if(doubles.length < 2) return null;
  const menteur = doubles.find(promesseExclusive);
  if(!menteur) return null;
  return { promise: menteur, autre: doubles.find(q => q !== menteur) };
}

/* Appelé en fin de tour : relit le monde, note ce qui a changé d'état, et arme
 * la clarification quand il y a de quoi. */
function liensTick(){
  heroLiens();
  relireTrahisons();
  const bascules = [];
  for(const qui of Object.keys(LIENS_PROFILS)){
    const l = lienDe(qui);
    const p = palierAtteint(qui);
    if(p.id !== l.etat){
      const monte = LIENS_PALIERS.findIndex(x => x.id === p.id)
                  > LIENS_PALIERS.findIndex(x => x.id === l.etat);
      l.etat = p.id;
      bascules.push({ qui, palier:p, monte });
    }
  }
  const rompue = promesseRompue();
  if(rompue && !hasFlag('lien_clarification_due')) hero.flags.push('lien_clarification_due');
  return bascules;
}

/* ============================= L'ÉCRAN =============================
 * Quatre axes, quatre phrases. Aucun nombre : le joueur lit une personne. */

const LIENS_MOTS = {
  relation:  [[8,"vous avez traversé des choses ensemble"], [4,"vous vous connaissez"], [1,"vous vous êtes croisés"], [-99,"vous ne vous connaissez pas"]],
  confiance: [[8,"elle vous croit sur parole"], [4,"elle vous croit"], [1,"elle vérifie encore"], [-3,"elle ne vous croit pas"], [-99,"elle sait que vous lui avez menti"]],
  attirance: [[8,"elle vous veut"], [5,"il y a quelque chose et elle le sait"], [2,"elle vous trouve quelque chose"], [-99,"ce n'est pas là"]],
  politique: [[6,"vous voulez la même chose"], [2,"ce que vous faites lui convient"], [-1,"elle a des réserves"], [-5,"vous êtes en désaccord"], [-99,"ce que vous faites détruit ce qu'elle défend"]],
};
function motDAxe(axe, n){
  const t = LIENS_MOTS[axe].find(([seuil]) => n >= seuil);
  return t ? t[1] : '';
}

function renderLiens(){
  const bloc = document.getElementById('liensGrid');
  if(!bloc) return;
  heroLiens();

  const actifs = Object.keys(LIENS_PROFILS).filter(qui =>
    LIENS_AXES.some(a => axeDe(qui, a) !== 0) || palierAtteint(qui).id !== 'inconnu');

  if(!actifs.length){
    bloc.innerHTML = `<p class="liens-vide">Yohan n'a de lien avec personne, pour l'instant. C'est une manière de vivre.</p>`;
    return;
  }

  bloc.innerHTML = actifs.map(qui => {
    const p = LIENS_PROFILS[qui];
    const l = lienDe(qui);
    const pal = palierAtteint(qui);
    const bloque = cequiBloque(qui);
    const face = (typeof artPortraitImg === 'function') ? artPortraitImg(qui, 'lien-face') : '';
    const axes = ['relation','confiance','attirance','politique']
      .map(a => `<li><span class="lien-axe">${a}</span>${motDAxe(a, axeDe(qui, a))}</li>`).join('');
    const griefs = l.griefs.length
      ? `<div class="lien-griefs"><b>Ce qu'elle n'oublie pas</b><ul>${
          l.griefs.slice(-2).map(g => `<li>${g.quoi}</li>`).join('')}</ul></div>` : '';

    return `<div class="lien">
      <div class="lien-tete">${face}
        <div><span class="lien-nom">${p.nom}</span>
             <span class="lien-etat">${pal.nom}</span></div>
      </div>
      <div class="lien-juge">Elle juge ${p.juge}.</div>
      <ul class="lien-axes">${axes}</ul>
      ${bloque && bloque.manques.length
        ? `<div class="lien-bloque"><b>Ce qui n'est pas encore là :</b> ${bloque.manques.join(' ; ')}.</div>`
        : ''}
      ${griefs}
    </div>`;
  }).join('');
}
