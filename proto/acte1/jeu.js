/* PARIAS — Acte I · la partie
 * ═══════════════════════════════════════════════════════════════════════
 * Sauvegarde unique, journal, réglage du détail, démarrage.
 * Rien ici ne décide de quoi que ce soit : c'est de la plomberie.
 * ═══════════════════════════════════════════════════════════════════════ */

const CLE = 'parias.acte1.v1';

/* ── L'état de la sauvegarde ──────────────────────────────────────────────
 *
 * `sauver()` avalait ses exceptions en silence. C'est défendable pour un
 * quota dépassé ; ça ne l'est pas du tout dans un cadre bac à sable sans
 * `allow-same-origin`, où le seul accès à `localStorage` lève un
 * `SecurityError` — le jeu avait alors l'air d'enregistrer à chaque scène et
 * n'enregistrait rien, et on perdait trois heures de partie en fermant
 * l'onglet, sans avoir jamais été prévenu.
 *
 * On garde le try/catch, parce qu'un jeu ne doit pas s'arrêter de tourner
 * pour ça. Mais on retient ce qui s'est passé, et l'écran le dit. */
const SAUVEGARDE = { possible:null, quand:null, taille:0 };

/* Ce qu'une partie contient. Sert à `sauver()` et au code de partie. */
function instantane(){
  return {
    carac:ETAT.carac, comp:ETAT.comp, ressources:ETAT.ressources,
    or:ETAT.or, renom:ETAT.renom, suspicion:ETAT.suspicion,
    flags:[...ETAT.flags], blessures:ETAT.blessures,
    faits:ETAT.faits, portes:ETAT.portes, adaptation:ETAT.adaptation,
    gore:ETAT.gore, scene:ETAT.scene, melee:ETAT.melee, acte:ETAT.acte,
    /* L'Acte II a son propre calendrier, ses cinq crises, ses trois pistes
     * et les quatre axes de chaque lien. Sans ces deux lignes, recharger au
     * milieu de l'acte rend un monde neuf à un homme qui ne l'est pas. */
    acte2:ETAT.acte2, liens:ETAT.liens, pistolets:ETAT.pistolets,
  };
}

function sauver(){
  let texte;
  try { texte = JSON.stringify(instantane()); }
  catch(e){ SAUVEGARDE.possible = false; return false; }
  try {
    localStorage.setItem(CLE, texte);
    /* Écrire n'est pas enregistrer : certains navigateurs acceptent la
     * consigne et ne gardent rien. On relit. */
    if(localStorage.getItem(CLE) !== texte) throw new Error('non relue');
    SAUVEGARDE.possible = true;
    SAUVEGARDE.quand = Date.now();
    SAUVEGARDE.taille = texte.length;
    majSauvegarde();
    return true;
  } catch(e){
    SAUVEGARDE.possible = false;
    majSauvegarde();
    return false;
  }
}

function charger(){
  let d = null;
  try{ d = JSON.parse(localStorage.getItem(CLE) || 'null'); }catch(e){ return false; }
  return reprendre(d);
}

/* Reprendre un instantané, d'où qu'il vienne — la mémoire du navigateur ou
 * un code de partie collé à la main. */
function reprendre(d){
  if(!d || !d.scene) return false;
  Object.assign(ETAT, d, { flags:new Set(d.flags || []) });
  return true;
}

function effacer(){
  try{ localStorage.removeItem(CLE); }catch(e){}
}

/* ── Le code de partie ────────────────────────────────────────────────────
 * La seule sauvegarde qui marche partout : du texte, que le joueur garde où
 * il veut. C'est le filet quand la mémoire du navigateur est fermée, et
 * c'est aussi la seule façon de porter une partie d'un appareil à l'autre. */
function codeDePartie(){
  try { return btoa(unescape(encodeURIComponent(JSON.stringify(instantane())))); }
  catch(e){ return ''; }
}

function reprendreCode(code){
  try {
    const d = JSON.parse(decodeURIComponent(escape(atob((code || '').trim()))));
    return reprendre(d);
  } catch(e){ return false; }
}

/* L'indicateur du bandeau. Discret quand tout va bien — c'est une plomberie,
 * pas une scène — et net quand rien ne s'enregistre. */
function majSauvegarde(){
  const el = document.getElementById('bSauve');
  if(!el) return;
  if(SAUVEGARDE.possible === false){
    el.className = 'perdue';
    el.textContent = 'non enregistré';
    el.title = "Ce navigateur n'autorise pas l'enregistrement ici. Ouvrez le journal : "
             + "vous pouvez copier un code de partie et le recoller plus tard.";
  } else if(SAUVEGARDE.possible === true){
    el.className = 'tenue';
    el.textContent = 'enregistré';
    el.title = "La partie s'enregistre toute seule à chaque scène.";
  } else {
    el.className = '';
    el.textContent = '';
    el.title = '';
  }
}

/* ── Le journal ─────────────────────────────────────────────────────────── */
function basculerJournal(ouvrir){
  const j = document.getElementById('journal');
  const veut = ouvrir === undefined ? !j.classList.contains('ouvert') : ouvrir;
  j.classList.toggle('ouvert', veut);
  document.getElementById('bJournal').setAttribute('aria-expanded', String(veut));
  if(veut) majBandeau();
}

/* ── Le détail ──────────────────────────────────────────────────────────── */
const GORES = ['sobre', 'intense', 'extreme'];
const GORE_NOMS = { sobre:"sobre", intense:"intense", extreme:"extrême" };

function reglerGore(g){
  ETAT.gore = g;
  document.querySelectorAll('#gore button').forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.g === g)));
  sauver();
  if(ETAT.scene) aller(ETAT.scene);      // la scène se réécrit dans le nouveau registre
}

/* ── Démarrage ──────────────────────────────────────────────────────────── */
function nouvelle(){
  effacer();
  neuf();
  ETAT.gore = document.querySelector('#gore [aria-pressed="true"]')?.dataset.g || 'intense';
  majBandeau();
  aller('prologue');
}

/* ── Le code de partie, côté journal ─────────────────────────────────────── */
function brancherCodeDePartie(){
  const zone = document.getElementById('codePartie');
  const mot  = document.getElementById('motPartie');
  const voir = document.getElementById('bCode');
  const coller = document.getElementById('bColler');
  if(!zone || !voir || !coller) return;

  const dire = t => { if(mot) mot.textContent = t || ''; };

  voir.onclick = () => {
    const code = codeDePartie();
    if(!code){ dire("Le code n'a pas pu être fabriqué. Signalez-le."); return; }
    zone.hidden = false;
    zone.value = code;
    zone.focus();
    zone.select();
    dire(`Sélectionné — copiez-le et gardez-le où vous voulez. ${
      Math.round(code.length / 1024)} Ko de texte.`);
  };

  coller.onclick = () => {
    if(zone.hidden || !zone.value.trim()){
      zone.hidden = false;
      zone.value = '';
      zone.focus();
      dire("Collez un code de partie ici, puis cliquez encore sur « Reprendre un code ».");
      return;
    }
    if(!reprendreCode(zone.value)){
      dire("Ce code n'est pas lisible. Rien n'a été touché : votre partie en cours est intacte.");
      return;
    }
    zone.hidden = true;
    zone.value = '';
    dire('');
    document.querySelectorAll('#gore button').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.g === ETAT.gore)));
    basculerJournal(false);
    majBandeau();
    sauver();
    aller(ETAT.scene);
  };
}

function demarrer(){
  document.getElementById('bJournal').onclick = () => basculerJournal();
  document.getElementById('jFermer').onclick  = () => basculerJournal(false);
  document.getElementById('bNeuf').onclick    = () => auSeuil();
  document.querySelectorAll('#gore button').forEach(b =>
    b.onclick = () => reglerGore(b.dataset.g));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') basculerJournal(false); });
  brancherCodeDePartie();

  /* On sait tout de suite si ce navigateur nous laisse enregistrer : mieux
   * vaut l'apprendre au seuil qu'au bout de trois heures. */
  (function eprouverStockage(){
    try {
      localStorage.setItem(CLE + '.essai', '1');
      localStorage.removeItem(CLE + '.essai');
      SAUVEGARDE.possible = true;
    } catch(e){ SAUVEGARDE.possible = false; }
    const sous = document.getElementById('sousPartie');
    if(sous && SAUVEGARDE.possible === false)
      sous.textContent = "Ce navigateur n'enregistre rien ici. Copiez le code de partie "
                       + "avant de fermer l'onglet : c'est la seule chose qui survivra.";
    majSauvegarde();
  })();

  /* On n'ouvre plus sur la dernière sauvegarde : on ouvre sur le seuil, et
   * c'est le joueur qui décide de reprendre ou de recommencer. */
  const d = (() => { try { return JSON.parse(localStorage.getItem(CLE) || 'null'); } catch(e){ return null; } })();
  if(d && d.gore) ETAT.gore = d.gore;
  document.querySelectorAll('#gore button').forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.g === ETAT.gore)));
  rendreMenu();
}

/* Le bandeau propose de revenir au seuil sans perdre la partie en cours. */
function auSeuil(){
  if(typeof sauver === 'function' && ETAT.scene) sauver();
  rendreMenu();
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
else demarrer();
