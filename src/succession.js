/* PARIAS — La succession
 *
 * « On meurt, on hérite. » La partie ne s'arrête pas là : elle continue avec
 * quelqu'un d'autre, dans le même monde, avec la même mémoire.
 *
 * CE QUI RESTE AU MONDE — tout. Les crises en sont où elles en sont. Les neuf
 * se souviennent nommément de ce que le père a fait, et ils s'en souviendront
 * encore devant son enfant. Karlsberg est bâtie comme il l'a bâtie, les
 * carrières qu'il a rouvertes travaillent toujours, les dettes qu'on lui devait
 * sont dues à son héritier.
 *
 * CE QUI NE SE TRANSMET PAS — le niveau, les pouvoirs, ce qu'il avait dans les
 * mains, ceux qui l'aimaient, et la moitié de ce que le monde soupçonnait de
 * lui. Un héritier n'est pas son père : il commence bas, dans une maison haute.
 */

/* ============================= QUI PEUT SUCCÉDER ============================= */

function heritiersEligibles(){
  const l = (typeof heroLignee === 'function') ? heroLignee() : (hero.lignee || {enfants:[]});
  return (l.enfants || [])
    .filter(e => (e.age || 0) >= SUCCESSION_AGE_MAJORITE && !e.mort)
    /* Le sang d'abord — c'est ce nom-là qui se transmet — puis l'aîné. */
    .sort((a, b) => (b.paria ? 1 : 0) - (a.paria ? 1 : 0) || (b.age || 0) - (a.age || 0));
}

function successionPossible(){ return heritiersEligibles().length > 0; }

/* Transmettre de son vivant : possible dès qu'un héritier est majeur et que la
 * maison tient debout. Ce n'est pas une reddition, c'est une décision. */
function peutTransmettre(){
  if(!successionPossible()) return { non:"Aucun enfant de Yohan n'est en âge de recevoir quoi que ce soit." };
  const pal = (typeof palierKarlsberg === 'function') ? palierKarlsberg() : null;
  if(pal && pal.id === 'ruines')
    return { non:"On ne transmet pas un tas de pierres. Il faudrait d'abord que Karlsberg soit quelque chose." };
  return { oui:true };
}

/* ============================= LA MORT ============================= */

/* Elle devient probable, puis certaine. Appelée une fois par saison. */
function risqueDeMourir(){
  const a = hero.age || 0;
  if(a < SUCCESSION_AGE_DECLIN) return 0;
  if(a >= SUCCESSION_AGE_CERTAIN) return 1;
  const p = (a - SUCCESSION_AGE_DECLIN) / (SUCCESSION_AGE_CERTAIN - SUCCESSION_AGE_DECLIN);
  return 0.02 + p * p * 0.28;      // lent d'abord, puis franc
}

function successionTick(){
  if(hero.successionEnCours) return null;
  if((hero.flags || []).includes('chronique_terminee')) return null;
  if(Math.random() >= risqueDeMourir()) return null;
  return ouvrirSuccession('vieillesse');
}

/* ============================= LE PASSAGE ============================= */

let successionEtat = null;

function ouvrirSuccession(finId){
  const fin = SUCCESSION_FINS.find(f => f.id === finId) || SUCCESSION_FINS[0];
  const candidats = heritiersEligibles();
  hero.successionEnCours = true;

  /* Personne pour reprendre le nom : la chronique s'achève, et c'est
   * l'épilogue qui a le dernier mot — pas un écran de mort. */
  if(!candidats.length){
    hero.successionEnCours = false;
    if(!(hero.flags || []).includes('chronique_terminee')) hero.flags.push('chronique_terminee');
    if(typeof ouvrirEpilogue === 'function') ouvrirEpilogue();
    return { epilogue:true };
  }

  successionEtat = { fin, candidats };
  renderSuccession();
  if(typeof closeEventModal === 'function') closeEventModal();
  showScreen('succession');
  return { succession:true, candidats: candidats.length };
}

/* Ce que l'héritier garde du règne précédent. */
function heritageDuRegne(){
  return {
    or:        Math.round((hero.or || 0) * 0.6),
    renom:     Math.round(renomActuel() * 0.4),
    suspicion: hero.suspicion || 0,          // pondéré par le profil, plus bas
    armee:     (hero.armee || []).length,
    chantier:  (hero.chantier || []).length,
    palier:    (typeof palierKarlsberg === 'function') ? palierKarlsberg() : null,
    faveurs:   (hero.ressources || {}).faveurs || 0,
  };
}

/* Le passage lui-même. On garde le monde, on remplace l'homme. */
function succeder(nomEnfant){
  const l = heroLignee();
  const enfant = (l.enfants || []).find(e => e.nom === nomEnfant);
  if(!enfant) return null;

  const profil = SUCCESSION_PROFILS[enfant.paria ? 'paria' : 'sans_onde'];
  const ancien = { nom: hero.nom, age: hero.age, generation: hero.generation || 1 };
  const garde  = heritageDuRegne();

  /* — Ce qui disparaît avec lui — */
  hero.nom          = enfant.nom;
  hero.generation   = ancien.generation + 1;
  hero.age          = enfant.age;
  hero.niveau       = 3;
  hero.xp           = 0;
  hero.talentPoints = 3;
  hero.unlocked     = new Set(YOHAN_STARTING_POWERS);
  hero.inventaire   = [{ uid:'succ_potion_' + Date.now(), itemId:'potion_vigueur', qty:2 }];
  hero.equipement   = { armure:null, accessoire:null };
  hero.compagnons   = [];
  hero.liens        = {};            // ceux qui aimaient le père n'aiment pas le fils
  hero.affinites    = { ...AFFINITES_DEPART };
  hero.agi = 12; hero.vol = 10; hero.precision = 5; hero.defenseBase = 12;
  hero.pvMax = 42; hero.pv = 42; hero.fat = 0; hero.paMax = 3;
  hero.renaissanceUsed = false;
  for(const [k, v] of Object.entries(profil.stats)) hero[k] = (hero[k] || 0) + v;

  /* — Ce qui reste — */
  hero.or        = garde.or;
  hero.renom     = garde.renom;
  hero.suspicion = Math.round(garde.suspicion * profil.suspicionGardee);
  hero.trame     = { points: Math.min(200, profil.sang), chapitre: hero.trame.chapitre };
  /* La lignée repart de lui : ses frères et sœurs restent, ses parents non. */
  l.liaisons = [];
  l.enfants  = (l.enfants || []).filter(e => e.nom !== enfant.nom);

  profil.flags.forEach(f => { if(!hasFlag(f)) hero.flags.push(f); });
  if(!hasFlag('succession_faite')) hero.flags.push('succession_faite');
  hero.flags.push(`generation_${hero.generation}`);

  /* Les neuf ne changent pas d'avis parce que quelqu'un est mort. Ils notent. */
  if(hero.chroniques){
    const d = dateFromSemaines(hero.temps ? hero.temps.semaines : 0);
    hero.chroniques.push({ date:`${d.saison}, An ${d.an}`,
      texte:`✦ <b>${ancien.nom}</b> a cessé de tenir Karlsberg à ${ancien.age} ans. <b>${enfant.nom}</b> le tient désormais.` });
  }

  hero.successionEnCours = false;
  successionEtat = null;
  applyPassiveEffects();
  if(typeof syncTensions === 'function') syncTensions();
  saveGame(true);

  return { ancien, enfant, profil, garde };
}

/* ============================= L'ÉCRAN ============================= */

function renderSuccession(){
  const box = document.getElementById('successionCorps');
  if(!box || !successionEtat) return;
  const { fin, candidats } = successionEtat;
  const g = heritageDuRegne();
  const pal = g.palier;

  const cartes = candidats.map(e => {
    const p = SUCCESSION_PROFILS[e.paria ? 'paria' : 'sans_onde'];
    return `<div class="succ-carte" data-nom="${e.nom}">
      <div class="succ-nom">${e.nom}</div>
      <div class="succ-meta">${e.sexe === 'f' ? 'Fille' : 'Fils'} de ${e.mere} · ${e.age} ans · ${p.nom}</div>
      <p class="succ-dit">${p.dit}</p>
      <button class="primary succ-btn" data-nom="${e.nom}">Lui donner le nom</button>
    </div>`;
  }).join('');

  box.innerHTML = `
    <span class="event-tag">${fin.titre}</span>
    <h2 class="succ-titre">La maison Karlsberg change de main</h2>
    <p class="succ-texte">${fin.texte.replace('{age}', hero.age)}</p>
    <p class="succ-texte">${pal ? (SUCCESSION_ETATS[pal.id] || '') : ''}</p>
    <div class="succ-garde">
      <b>Ce qui passe avec le nom</b>
      <ul>
        <li>Karlsberg telle qu'elle est : ${g.chantier} ouvrage${g.chantier > 1 ? 's' : ''} debout${pal ? `, ${pal.nom.toLowerCase()}` : ''}</li>
        <li>Les sources ouvertes — carrières, refuges, routes — continuent de travailler</li>
        <li>${g.faveurs} dette${g.faveurs > 1 ? 's' : ''} qu'on doit encore à cette maison</li>
        <li>${g.armee} unité${g.armee > 1 ? 's' : ''} sous les bannières, et ${g.or} or sur ce qu'il restait</li>
        <li>Le monde entier : ce que les crises sont devenues, et ce que neuf personnes se rappellent</li>
      </ul>
      <b>Ce qui ne passe pas</b>
      <ul>
        <li>Ce qu'il savait faire, ce qu'il avait dans les mains, ceux qui l'aimaient</li>
        <li>Une partie de ce que le monde soupçonnait — un héritier n'est pas son père</li>
      </ul>
    </div>
    <h3 class="succ-h">Qui reprend le nom</h3>
    <div class="succ-grid">${cartes}</div>`;

  box.querySelectorAll('.succ-btn').forEach(b => {
    b.onclick = () => {
      const r = succeder(b.dataset.nom);
      if(r) montrerPassage(r);
    };
  });
}

function montrerPassage(r){
  const box = document.getElementById('successionCorps');
  box.innerHTML = `
    <span class="event-tag">Génération ${r.enfant ? (hero.generation) : ''}</span>
    <h2 class="succ-titre">${hero.nom}</h2>
    <p class="succ-texte">${r.profil.dit}</p>
    <p class="succ-texte">${r.ancien.nom} avait ${r.ancien.age} ans. Ce qu'il a fait est fait, et le monde s'en souvient — pas toujours en bien.</p>
    <p class="succ-texte">Ce qui recommence : un niveau, trois talents, deux fioles, et un nom que trop de gens connaissent déjà.</p>
    <div style="margin-top:20px;text-align:right;"><button class="primary" id="succContinuer">Continuer</button></div>`;
  document.getElementById('succContinuer').onclick = () => {
    showScreen('lieu');
    renderPersonnage(); renderQuete(); renderChroniques();
    if(typeof renderLieu === 'function') renderLieu();
  };
}
