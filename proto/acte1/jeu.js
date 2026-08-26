/* PARIAS — Acte I · la partie
 * ═══════════════════════════════════════════════════════════════════════
 * Sauvegarde unique, journal, réglage du détail, démarrage.
 * Rien ici ne décide de quoi que ce soit : c'est de la plomberie.
 * ═══════════════════════════════════════════════════════════════════════ */

const CLE = 'parias.acte1.v1';

function sauver(){
  try{
    localStorage.setItem(CLE, JSON.stringify({
      carac:ETAT.carac, comp:ETAT.comp, ressources:ETAT.ressources,
      or:ETAT.or, renom:ETAT.renom, suspicion:ETAT.suspicion,
      flags:[...ETAT.flags], blessures:ETAT.blessures,
      faits:ETAT.faits, portes:ETAT.portes, adaptation:ETAT.adaptation,
      gore:ETAT.gore, scene:ETAT.scene, melee:ETAT.melee, acte:ETAT.acte,
    }));
  }catch(e){ /* navigation privée, quota, tout ça : on joue quand même */ }
}

function charger(){
  let d = null;
  try{ d = JSON.parse(localStorage.getItem(CLE) || 'null'); }catch(e){ return false; }
  if(!d || !d.scene) return false;
  Object.assign(ETAT, d, { flags:new Set(d.flags || []) });
  return true;
}

function effacer(){
  try{ localStorage.removeItem(CLE); }catch(e){}
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

function demarrer(){
  document.getElementById('bJournal').onclick = () => basculerJournal();
  document.getElementById('jFermer').onclick  = () => basculerJournal(false);
  document.getElementById('bNeuf').onclick    = () => {
    if(confirm("Recommencer efface la partie en cours. Rien ne se récupère.")) nouvelle();
  };
  document.querySelectorAll('#gore button').forEach(b =>
    b.onclick = () => reglerGore(b.dataset.g));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') basculerJournal(false); });

  if(charger()){
    document.querySelectorAll('#gore button').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.g === ETAT.gore)));
    majBandeau();
    aller(ETAT.scene);
  }else{
    nouvelle();
  }
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
else demarrer();
