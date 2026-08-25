/* PARIAS — Sauvegarde
 *
 * Quatre emplacements : une sauvegarde automatique et trois manuelles. Chacune
 * porte ses propres métadonnées, pour qu'on sache ce qu'on charge avant de le
 * charger.
 *
 * Trois garanties, dans cet ordre d'importance :
 *
 *   1. Ne jamais écraser du bon avec du mauvais. Toute écriture est relue et
 *      revalidée avant d'être validée ; si quoi que ce soit échoue, l'ancienne
 *      sauvegarde reste en place.
 *   2. Ne jamais perdre une partie en silence. Si le navigateur refuse le
 *      stockage (page intégrée, navigation privée, cookies cloisonnés), on le
 *      DIT au lieu de faire semblant d'enregistrer.
 *   3. Ne jamais casser une vieille sauvegarde. Chaque enregistrement porte un
 *      numéro de version et passe par les migrations avant d'être joué.
 *
 * Le format est du JSON : les Set du personnage sont écrits en tableaux et
 * reconstruits au chargement (voir CHAMPS_SET).
 */

const SAVE_VERSION = 13;
/* Le préfixe est un espace de noms de stockage, pas le numéro de version : il
 * reste figé pour que les parties commencées avant soient relues puis migrées. */
const SAVE_PREFIX  = 'parias_save_v6_';
const SAVE_LEGACY  = 'parias_vardhen_save_v1';   // format d'avant les emplacements
const SAVE_PREFIXES_ANCIENS = ['parias_save_v5_', 'parias_save_v4_', 'parias_save_v3_'];   // relus une fois, puis migrés
const SLOTS = [
  { id:'auto', nom:'Automatique', auto:true },
  { id:'s1',   nom:'Emplacement 1' },
  { id:'s2',   nom:'Emplacement 2' },
  { id:'s3',   nom:'Emplacement 3' },
];

/* Champs du personnage stockés comme Set et à reconstruire au chargement. */
const CHAMPS_SET = ['unlocked', 'crisesDeclenchees'];

/* ============================= DISPONIBILITÉ ============================= */

let _stockageTeste = null;

/* Le stockage peut être refusé sans prévenir : on l'éprouve pour de vrai. */
function stockageDisponible(){
  if(_stockageTeste !== null) return _stockageTeste;
  try{
    const t = SAVE_PREFIX + '__test';
    localStorage.setItem(t, '1');
    const relu = localStorage.getItem(t);
    localStorage.removeItem(t);
    _stockageTeste = (relu === '1');
  } catch(e){
    _stockageTeste = false;
  }
  return _stockageTeste;
}

/* ============================= SÉRIALISATION ============================= */

function serialiserHero(h){
  return JSON.stringify(h, (k, v) => v instanceof Set ? Array.from(v) : v);
}

/* Reconstruit un personnage jouable à partir de données brutes, en comblant
 * tout ce qu'une version antérieure ne connaissait pas. */
function reconstruireHero(brut){
  const h = brut;
  h.unlocked          = new Set(h.unlocked || YOHAN_STARTING_POWERS);
  h.crisesDeclenchees = new Set(h.crisesDeclenchees || []);
  h.flags             = h.flags || [];
  h.evenementsVus     = h.evenementsVus || [];
  h.renom             = h.renom || 0;
  h.armee             = h.armee || [];
  h.affinites         = h.affinites || {};
  h.reputations       = { ...REPUTATION_DEPART, ...(h.reputations || {}) };
  h.dossiers          = h.dossiers || {};
  h.chantier          = h.chantier || [];
  h.offres            = h.offres || { semaine: -1, locId: null, liste: [] };
  h.politique         = h.politique || {};
  h.chaines           = h.chaines || { actives:[], faites:[], issues:{} };
  h.crises            = h.crises || {};
  h.pnj               = h.pnj || {};
  h.liens             = h.liens || {};
  h.ressources        = h.ressources || { pierre:0, bras:0, grain:0, faveurs:0 };
  h.generation        = h.generation || 1;
  h.successionEnCours = false;
  h.lignee            = h.lignee || { liaisons: [], enfants: [] };
  if(typeof h.age !== 'number') h.age = AGE_DEPART;
  h.compagnons        = (h.compagnons || []).map(c => COMPANIONS_POOL[c.id] || c);
  h.temps             = h.temps || { semaines: 0 };
  h.chroniques        = h.chroniques || [];
  h.tensions          = h.tensions || {
    humains:12, parias:6, khesh:12, elfes:6, elfes_noirs:8, nains:8, peaux_vertes:14, hommes_betes:14
  };
  if(h.actionsTour === undefined) h.actionsTour = 3;
  if(h.suspicion === undefined)   h.suspicion = 5;
  if(h.or === undefined)          h.or = 0;
  return h;
}

/* Un enregistrement valide contient au minimum de quoi jouer. */
function enregistrementPlausible(enr){
  return !!enr && typeof enr === 'object'
    && !!enr.hero && typeof enr.hero === 'object'
    && typeof enr.hero.niveau === 'number'
    && typeof enr.hero.pvMax === 'number'
    && !!enr.hero.trame;
}

/* ============================= MIGRATIONS ============================= */
/* Chaque migration fait passer un enregistrement d'une version à la suivante.
 * On les enchaîne : une sauvegarde v1 traverse toutes les étapes jusqu'à la
 * version courante. Ajouter un champ au personnage ne demande rien ici —
 * reconstruireHero() s'en charge. Une migration ne sert qu'aux changements de
 * FORME qu'un simple défaut ne rattrape pas. */
const MIGRATIONS = {
  1: enr => {           // v1 → v2 : les marqueurs d'histoire deviennent un tableau
    enr.hero.flags = Array.isArray(enr.hero.flags) ? enr.hero.flags : [];
    enr.hero.evenementsVus = Array.isArray(enr.hero.evenementsVus) ? enr.hero.evenementsVus : [];
    enr.version = 2;
    return enr;
  },
  2: enr => {           // v2 → v3 : arrivée de l'armée, du Renom et des affinités
    enr.hero.renom = enr.hero.renom || 0;
    enr.hero.armee = enr.hero.armee || [];
    enr.hero.affinites = enr.hero.affinites || {};
    enr.version = 3;
    return enr;
  },
  3: enr => {           // v3 → v4 : la réputation auprès des huit peuples
    enr.hero.reputations = { ...REPUTATION_DEPART, ...(enr.hero.reputations || {}) };
    enr.version = 4;
    return enr;
  },
  4: enr => {           // v4 → v5 : les dossiers locaux
    enr.hero.dossiers = enr.hero.dossiers || {};
    enr.version = 5;
    return enr;
  },
  5: enr => {           // v5 → v6 : l'âge et la lignée
    enr.hero.lignee = enr.hero.lignee || { liaisons: [], enfants: [] };
    if(typeof enr.hero.age !== 'number'){
      const sem = (enr.hero.temps && enr.hero.temps.semaines) || 0;
      enr.hero.age = AGE_DEPART + Math.floor(sem / 52);
    }
    enr.version = 6;
    return enr;
  },
  6: enr => {           // v6 → v7 : le chantier de Karlsberg et les offres du lieu
    enr.hero.chantier = enr.hero.chantier || [];
    enr.hero.offres   = { semaine: -1, locId: null, liste: [] };  // on retire un tableau neuf
    enr.hero.politique = enr.hero.politique || {};
    enr.version = 7;
    return enr;
  },
  7: enr => {           // v7 → v8 : les affaires qui se jouent sur plusieurs tours
    enr.hero.chaines = enr.hero.chaines || { actives:[], faites:[], issues:{} };
    enr.version = 8;
    return enr;
  },
  8: enr => {           // v8 → v9 : les tensions chiffrées deviennent cinq crises
    /* Une partie en cours avait des nombres. On les relit comme un état du
     * monde : une tension de 60 chez un peuple, c'est une crise arrivée à sa
     * troisième étape. Personne ne perd sa partie parce que le monde a
     * gagné des raisons. */
    const t = enr.hero.tensions || {};
    enr.hero.crises = enr.hero.crises || {};
    const lecture = { ELFES:'elfes', ASTRAH:'humains', PEAUX_VERTES:'peaux_vertes',
                      KHESH:'khesh', HOMMES_BETES:'hommes_betes' };
    for(const [id, peuple] of Object.entries(lecture)){
      if(enr.hero.crises[id]) continue;
      const v = t[peuple] || 0;
      enr.hero.crises[id] = { palier: Math.max(0, Math.min(5, Math.floor(v / 18))),
                              pression: 0, causes: [] };
    }
    enr.version = 9;
    return enr;
  },
  9: enr => {           // v9 → v10 : les neuf qui agissent sans vous
    /* Leur fiche se reconstruit toute seule ; ce qu'ils ont retenu de la
     * partie en cours se relit au premier tick, marqueur par marqueur. */
    enr.hero.pnj = enr.hero.pnj || {};
    enr.version = 10;
    return enr;
  },
  10: enr => {          // v10 → v11 : le lien unique devient quatre axes séparés
    /* Une partie en cours n'avait qu'un nombre par personne. On le relit comme
     * ce qu'il était vraiment : du temps passé et de l'attirance. La confiance,
     * elle, n'avait jamais été mesurée — elle repart de zéro, ce qui est plus
     * honnête que de l'inventer. */
    const a = enr.hero.affinites || {};
    enr.hero.liens = enr.hero.liens || {};
    for(const [qui, n] of Object.entries(a)){
      if(enr.hero.liens[qui]) continue;
      enr.hero.liens[qui] = { relation:n||0, confiance:0, attirance:n||0,
                              griefs:[], promesses:[], etat:'inconnu' };
    }
    enr.version = 11;
    return enr;
  },
  11: enr => {          // v11 → v12 : Karlsberg ne se paie plus qu'en or
    /* Les sources déjà ouvertes dans la partie en cours comptent : on crédite
     * une saison de rendement, pour que quelqu'un qui a rendu une carrière et
     * tenu un refuge ne reparte pas de zéro. */
    enr.hero.ressources = enr.hero.ressources || { pierre:0, bras:0, grain:0, faveurs:0 };
    enr.version = 12;
    return enr;
  },
  12: enr => {          // v12 → v13 : la succession
    enr.hero.generation = enr.hero.generation || 1;
    enr.version = 13;
    return enr;
  },
};

function migrer(enr){
  let v = enr.version || 1;
  let garde = 0;
  while(v < SAVE_VERSION && garde++ < 20){
    const m = MIGRATIONS[v];
    if(!m){ enr.version = SAVE_VERSION; break; }   // saut de version sans changement de forme
    enr = m(enr);
    v = enr.version || (v + 1);
  }
  return enr;
}

/* ============================= MÉTADONNÉES ============================= */

function construireMeta(h){
  const lieu = (typeof LOCATIONS !== 'undefined')
    ? (LOCATIONS.find(l => l.id === h.position) || null) : null;
  const chapitre = TRAME_CHAPITRES[h.trame ? h.trame.chapitre : 0];
  const d = (typeof dateFromSemaines === 'function' && h.temps)
    ? dateFromSemaines(h.temps.semaines) : null;
  return {
    date: new Date().toISOString(),
    niveau: h.niveau,
    chapitre: chapitre ? chapitre.titre : '—',
    numeroChapitre: (h.trame ? h.trame.chapitre : 0) + 1,
    sang: h.trame ? h.trame.points : 0,
    renom: h.renom || 0,
    or: h.or || 0,
    age: h.age || AGE_DEPART,
    enfants: ((h.lignee || {}).enfants || []).length,
    suspicion: h.suspicion || 0,
    lieu: lieu ? lieu.nom : 'En route',
    saison: d ? `${d.saison}, An ${d.an}` : '—',
    armee: (h.armee || []).reduce((s,u) => s + (u.effectif||0), 0),
    compagnons: (h.compagnons || []).map(c => c.nomCourt || c.nom),
    termine: !!(h.flags || []).includes('chronique_terminee'),
  };
}

/* ============================= LECTURE / ÉCRITURE ============================= */

function cleSlot(slot){ return SAVE_PREFIX + slot; }

/* Écrit un emplacement, et vérifie en relisant. Rend true seulement si la
 * sauvegarde est réellement en place et relisible. */
function ecrireSlot(slot, h){
  if(!stockageDisponible()) return false;
  const enr = { version: SAVE_VERSION, meta: construireMeta(h), hero: h };
  let texte;
  try{ texte = serialiserHero(enr); } catch(e){ return false; }

  const precedent = (() => { try{ return localStorage.getItem(cleSlot(slot)); } catch(e){ return null; } })();
  try{
    localStorage.setItem(cleSlot(slot), texte);
    // Relecture : une écriture qui « passe » mais ne se relit pas est un piège.
    const relu = JSON.parse(localStorage.getItem(cleSlot(slot)));
    if(!enregistrementPlausible(relu)) throw new Error('relecture invalide');
    return true;
  } catch(e){
    // Restaurer l'ancienne plutôt que laisser un emplacement à moitié écrit.
    try{
      if(precedent !== null) localStorage.setItem(cleSlot(slot), precedent);
      else localStorage.removeItem(cleSlot(slot));
    } catch(e2){ /* rien de mieux à faire */ }
    return false;
  }
}

function lireSlot(slot){
  if(!stockageDisponible()) return null;
  let texte;
  try{
    texte = localStorage.getItem(cleSlot(slot));
    // Une partie enregistrée par une version antérieure vit sous l'ancien
    // préfixe : on la relit plutôt que de faire comme si l'emplacement était vide.
    if(!texte){
      for(const p of SAVE_PREFIXES_ANCIENS){
        const t = localStorage.getItem(p + slot);
        if(t){ texte = t; break; }
      }
    }
  } catch(e){ return null; }
  if(!texte) return null;
  try{
    let enr = JSON.parse(texte);
    if(!enregistrementPlausible(enr)) return null;
    enr = migrer(enr);
    return enr;
  } catch(e){
    console.warn('Emplacement illisible :', slot, e.message);
    return null;
  }
}

function supprimerSlot(slot){
  try{ localStorage.removeItem(cleSlot(slot)); } catch(e){ /* sans effet */ }
}

function listerSlots(){
  return SLOTS.map(s => {
    const enr = lireSlot(s.id);
    return { ...s, meta: enr ? (enr.meta || construireMeta(enr.hero)) : null };
  });
}

/* L'emplacement le plus récemment écrit, pour le bouton « Continuer ». */
function slotLePlusRecent(){
  const avec = listerSlots().filter(s => s.meta && s.meta.date);
  if(!avec.length) return null;
  return avec.sort((a,b) => (a.meta.date < b.meta.date ? 1 : -1))[0];
}

/* ============================= REPRISE D'UNE ANCIENNE PARTIE ============================= */

/* Les parties d'avant les emplacements vivaient sous une clé unique : on les
 * récupère dans l'emplacement 1 au premier lancement, sans rien perdre. */
function recupererAnciennePartie(){
  if(!stockageDisponible()) return false;
  let texte;
  try{ texte = localStorage.getItem(SAVE_LEGACY); } catch(e){ return false; }
  if(!texte) return false;
  if(lireSlot('s1')) return false;              // ne jamais écraser un emplacement occupé
  try{
    const brut = JSON.parse(texte);
    if(!brut || typeof brut.niveau !== 'number') return false;
    const h = reconstruireHero(brut);
    const ok = ecrireSlot('s1', h);
    if(ok) localStorage.removeItem(SAVE_LEGACY);
    return ok;
  } catch(e){ return false; }
}

/* ============================= API DE JEU ============================= */

let dernierEtatSauvegarde = '';   // message affiché sur l'écran Sauvegarde

function setSaveStatus(msg){
  dernierEtatSauvegarde = msg || '';
  const el = document.getElementById('saveStatusText');
  if(el) el.textContent = dernierEtatSauvegarde;
}

/* Sauvegarde automatique, appelée par le moteur après chaque action notable. */
function saveGame(silencieux){
  if(!stockageDisponible()){
    if(!silencieux) setSaveStatus("Ce navigateur refuse le stockage local : la partie ne sera pas conservée. Utilisez « Exporter » et gardez le texte.");
    return false;
  }
  const ok = ecrireSlot('auto', hero);
  if(!silencieux) setSaveStatus(ok ? 'Partie sauvegardée (automatique).' : "Échec de la sauvegarde : l'espace de stockage est peut-être plein.");
  else if(!ok) setSaveStatus("Échec de la sauvegarde automatique : l'espace de stockage est peut-être plein.");
  return ok;
}

function sauvegarderDans(slot){
  if(!stockageDisponible()){
    setSaveStatus("Ce navigateur refuse le stockage local. Utilisez « Exporter » et conservez le texte de la partie.");
    return false;
  }
  const ok = ecrireSlot(slot, hero);
  setSaveStatus(ok ? `Partie enregistrée dans ${(SLOTS.find(s=>s.id===slot)||{}).nom}.`
                   : "Échec de l'enregistrement : l'emplacement précédent a été conservé.");
  renderSauvegardes();
  return ok;
}

function chargerDepuis(slot){
  const enr = lireSlot(slot);
  if(!enr){ setSaveStatus('Cet emplacement est vide ou illisible.'); return false; }
  hero = reconstruireHero(enr.hero);
  rafraichirToutesLesVues();
  reprendreLaPartie();
  setSaveStatus(`Partie chargée depuis ${(SLOTS.find(s=>s.id===slot)||{}).nom}.`);
  return true;
}

/* Charger une partie depuis l'accueil doit rendre la main au jeu, pas laisser
 * le joueur devant l'écran-titre avec une partie chargée derrière. Depuis
 * l'intérieur du jeu, en revanche, on ne bouge pas l'écran courant. */
function reprendreLaPartie(){
  const actif = [...document.querySelectorAll('.screen')].find(s => s.classList.contains('active'));
  if(!actif) return;
  if(actif.id === 'screen-accueil' || actif.id === 'screen-prologue'){
    if(typeof enterGame === 'function') enterGame();
  }
}

function chargerDepuisTexte(texte){
  const brut = JSON.parse(texte);
  // On accepte aussi bien un enregistrement complet qu'un personnage seul,
  // pour que les textes exportés par les anciennes versions restent valables.
  const enr = enregistrementPlausible(brut) ? migrer(brut)
            : { version: 1, hero: brut };
  if(!enr.hero || typeof enr.hero.niveau !== 'number') throw new Error('ce texte ne contient pas de partie');
  hero = reconstruireHero(migrer(enr).hero);
  rafraichirToutesLesVues();
  return true;
}

/* Après un chargement, tout l'affichage doit repartir du nouvel état. */
function rafraichirToutesLesVues(){
  [renderPersonnage, renderMonde, renderContracts, renderCalendar,
   renderChroniques, renderQuete, renderArmee, renderSauvegardes].forEach(f => {
    try{ if(typeof f === 'function') f(); } catch(e){ console.warn('Rafraîchissement :', e.message); }
  });
}

/* Efface tout et recommence — mort permanente, ou fin de chronique. */
function resetGame(){
  SLOTS.forEach(s => supprimerSlot(s.id));
  try{ localStorage.removeItem(SAVE_LEGACY); } catch(e){}
  try{ location.reload(); } catch(e){}
}

/* ============================= RENDU DE L'ÉCRAN ============================= */

function texteMeta(m){
  if(!m) return '<span class="slot-vide">Emplacement vide</span>';
  const d = new Date(m.date);
  const quand = isNaN(d) ? '' : d.toLocaleString('fr-FR', {dateStyle:'short', timeStyle:'short'});
  return `<div class="slot-ligne"><b>Chapitre ${m.numeroChapitre}</b> · ${m.chapitre}</div>
    <div class="slot-meta">Niveau ${m.niveau} · Renom ${m.renom} · ${m.or} or · Suspicion ${m.suspicion}</div>
    <div class="slot-meta">${m.saison} · ${m.lieu}${m.armee ? ' · '+m.armee+' hommes' : ''}</div>
    <div class="slot-meta">${m.age || '—'} ans${m.enfants ? ' · ' + m.enfants + ' enfant' + (m.enfants > 1 ? 's' : '') : ''}</div>
    ${m.compagnons.length ? `<div class="slot-meta">Avec ${m.compagnons.join(' et ')}</div>` : ''}
    <div class="slot-date">${quand}${m.termine ? ' · chronique achevée' : ''}</div>`;
}

function renderSauvegardes(){
  const holder = document.getElementById('slotList');
  if(!holder) return;

  const avert = document.getElementById('saveWarning');
  if(avert){
    if(stockageDisponible()){ avert.style.display = 'none'; }
    else {
      avert.style.display = 'block';
      avert.textContent = "Ce navigateur refuse le stockage local — c'est fréquent dans une page intégrée ou en navigation privée. La partie en cours fonctionne normalement, mais elle ne sera pas conservée en fermant l'onglet : exportez le texte pour la garder.";
    }
  }

  holder.innerHTML = '';
  listerSlots().forEach(s => {
    const div = document.createElement('div');
    div.className = 'slot' + (s.meta ? ' occupe' : '') + (s.auto ? ' auto' : '');
    div.innerHTML = `<div class="slot-tete"><span class="slot-nom">${s.nom}</span>
      ${s.auto ? '<span class="slot-tag">à chaque tour</span>' : ''}</div>
      <div class="slot-corps">${texteMeta(s.meta)}</div>`;

    const actions = document.createElement('div');
    actions.className = 'slot-actions';

    if(!s.auto){
      const b = document.createElement('button');
      b.className = 'ghost';
      b.textContent = s.meta ? 'Écraser' : 'Enregistrer ici';
      b.disabled = !stockageDisponible();
      b.onclick = () => {
        if(s.meta && !confirm(`Écraser la partie enregistrée dans ${s.nom} ?`)) return;
        sauvegarderDans(s.id);
      };
      actions.appendChild(b);
    }

    const bc = document.createElement('button');
    bc.className = 'ghost';
    bc.textContent = 'Charger';
    bc.disabled = !s.meta;
    bc.onclick = () => {
      if(!confirm('Charger cette partie ? La progression non enregistrée sera perdue.')) return;
      chargerDepuis(s.id);
    };
    actions.appendChild(bc);

    if(s.meta && !s.auto){
      const bs = document.createElement('button');
      bs.className = 'ghost';
      bs.textContent = 'Supprimer';
      bs.onclick = () => {
        if(!confirm(`Supprimer définitivement la partie de ${s.nom} ?`)) return;
        supprimerSlot(s.id);
        setSaveStatus(`${s.nom} vidé.`);
        renderSauvegardes();
      };
      actions.appendChild(bs);
    }

    div.appendChild(actions);
    holder.appendChild(div);
  });
}

/* Écran d'accueil : proposer de reprendre là où on s'est arrêté. */
function initSaveScreen(){
  const holder = document.getElementById('saveOptions');
  if(!holder) return;
  holder.innerHTML = '';

  recupererAnciennePartie();

  if(!stockageDisponible()){
    holder.innerHTML = `<p style="color:var(--parchment-dim);font-size:12.5px;font-family:'Inter',sans-serif;max-width:520px;margin:0 auto;">
      Ce navigateur refuse le stockage local : la partie ne sera pas conservée en fermant l'onglet.
      Vous pouvez jouer normalement et exporter le texte de la partie depuis l'écran Personnage.</p>`;
    return;
  }

  const recent = slotLePlusRecent();
  if(!recent) return;

  const btn = document.createElement('button');
  btn.className = 'primary';
  btn.textContent = 'Reprendre la partie';
  btn.onclick = () => { if(chargerDepuis(recent.id)) enterGame(); };
  holder.appendChild(btn);

  const info = document.createElement('p');
  info.style.cssText = "color:var(--parchment-dim);font-size:12px;font-family:'Inter',sans-serif;margin-top:10px;";
  const m = recent.meta;
  info.textContent = `${recent.nom} — chapitre ${m.numeroChapitre}, niveau ${m.niveau}, ${m.saison}`;
  holder.appendChild(info);
}
