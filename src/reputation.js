/* PARIAS — Moteur de réputation
 *
 * La réputation ne bouge que par des choix (voir applyEffets dans
 * events_runner.js, clé `reputation`). Ce fichier la lit, la borne, l'annonce
 * quand elle change de rang, et applique ce qu'elle coûte ou rapporte.
 */

function heroReputations(){
  if(!hero.reputations) hero.reputations = { ...REPUTATION_DEPART };
  // Un peuple ajouté après coup ne doit pas rester indéfini.
  Object.keys(REPUTATION_DEPART).forEach(p => {
    if(typeof hero.reputations[p] !== 'number') hero.reputations[p] = REPUTATION_DEPART[p];
  });
  return hero.reputations;
}

function reputationDe(peuple){ return heroReputations()[peuple] || 0; }

function rangReputation(peuple){
  const v = reputationDe(peuple);
  let rang = RANGS_REPUTATION[0];
  for(const r of RANGS_REPUTATION) if(v >= r.min) rang = r;
  return rang;
}

/* Déplace la réputation et l'annonce si elle franchit un rang — un changement
 * qu'on ne voit pas ne se joue pas. */
function ajusterReputation(peuple, n){
  if(!n || !(peuple in REPUTATION_DEPART)) return;
  const reps = heroReputations();
  const avant = rangReputation(peuple);
  reps[peuple] = Math.max(-100, Math.min(100, reps[peuple] + n));
  const apres = rangReputation(peuple);
  if(apres.id !== avant.id){
    const monte = n > 0;
    const d = (typeof dateFromSemaines === 'function' && hero.temps)
      ? dateFromSemaines(hero.temps.semaines) : null;
    hero.chroniques.push({
      date: d ? `${d.saison}, An ${d.an}` : '—',
      texte: `${monte ? '◆' : '◇'} ${PEUPLE_LABELS[peuple]} — Yohan est désormais « ${apres.nom} » chez eux. ${apres.note}`
    });
  }
}

/* Le peuple qui tient un lieu, ou null en terre de personne. */
function peupleDuLieu(lieu){
  if(!lieu) return null;
  return LOC_PEUPLE[lieu.id] || null;
}

/* Prix pratiqué envers Yohan chez ce peuple. `null` = on refuse de le servir. */
function multiplicateurPrix(peuple){
  if(!peuple) return 1;                    // terre de personne : prix de caravane
  const r = rangReputation(peuple);
  return r.prix;
}
function prixPour(item, peuple){
  const m = multiplicateurPrix(peuple);
  if(m === null) return null;
  return Math.max(1, Math.round(item.prix * m));
}

/* Un lieu dont le peuple vous tient pour ennemi ne vous accueille plus. */
function lieuHostile(lieu){
  const p = peupleDuLieu(lieu);
  return !!p && rangReputation(p).hostile;
}

/* ============================= AFFICHAGE ============================= */

function couleurReputation(v){
  if(v <= -55) return 'var(--blood-bright)';
  if(v < 20)   return 'var(--parchment-dim)';
  if(v < 45)   return 'var(--parchment)';
  if(v < 75)   return 'var(--onde-bright)';
  return 'var(--gold)';
}

function renderReputations(){
  const grid = document.getElementById('reputationGrid');
  if(!grid) return;
  const reps = heroReputations();
  grid.innerHTML = '';
  Object.keys(REPUTATION_DEPART).forEach(p => {
    const v = reps[p];
    const r = rangReputation(p);
    const voix = (REPUTATION_VOIX[p] || {})[r.id] || r.note;
    const couleur = couleurReputation(v);
    // Barre centrée sur zéro : la moitié gauche est ce qu'on vous reproche.
    const pct = Math.abs(v) / 2;                       // 0–50 % de la largeur
    const gauche = v < 0 ? (50 - pct) : 50;
    const div = document.createElement('div');
    div.className = 'rep-card' + (r.hostile ? ' hostile' : '');
    div.innerHTML = `<div class="rep-nom">${PEUPLE_LABELS[p]}
        <span class="rep-rang" style="color:${couleur}">${r.nom}</span></div>
      <div class="rep-bar"><i style="left:${gauche}%;width:${pct}%;background:${couleur};"></i>
        <span class="rep-zero"></span></div>
      <div class="rep-voix">${voix}</div>
      <div class="rep-effet">${r.prix === null
        ? 'Ne vous vendent plus rien.'
        : (r.prix === 1 ? 'Prix ordinaires.'
          : `Prix ×${r.prix.toFixed(2).replace(/0$/,'')} chez eux.`)}</div>`;
    grid.appendChild(div);
  });
}
