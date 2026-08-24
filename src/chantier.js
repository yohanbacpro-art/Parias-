/* PARIAS — Moteur du chantier
 *
 * Bâtir coûte de l'or et des semaines. Les semaines sont la vraie dépense :
 * pendant qu'on bâtit, Yohan vieillit et le monde avance sans lui.
 */

function heroChantier(){
  if(!hero.chantier) hero.chantier = [];
  return hero.chantier;
}
function ouvrageFait(id){ return heroChantier().includes(id); }

function ouvrageDisponible(o){
  if(ouvrageFait(o.id)) return null;
  if(o.requis && !ouvrageFait(o.requis)){
    const p = CHANTIER.find(x => x.id === o.requis);
    return { bloque:`Demande d'abord : ${p ? p.nom : o.requis}` };
  }
  if(o.requisFlag && !hasFlag(o.requisFlag)) return { bloque:"Ce qu'il faudrait graver n'existe pas encore" };
  if(hero.or < o.or) return { bloque:`${o.or} or requis (vous en avez ${hero.or})` };
  return { ok:true };
}

/* Le cumul de tout ce qui est bâti — lu par le combat, la boutique, l'armée. */
function chantierBonus(){
  const b = { defense:0, fatMax:0, entretienMult:1, prixMult:1, reposMult:1 };
  heroChantier().forEach(id => {
    const o = CHANTIER.find(x => x.id === id);
    if(!o || !o.effet) return;
    b.defense       += o.effet.defense || 0;
    b.fatMax        += o.effet.fatMax || 0;
    b.entretienMult *= (o.effet.entretienMult !== undefined ? o.effet.entretienMult : 1);
    b.prixMult      *= (o.effet.prixMult !== undefined ? o.effet.prixMult : 1);
    b.reposMult      = Math.max(b.reposMult, o.effet.reposMult || 1);
  });
  return b;
}

function batir(id){
  const o = CHANTIER.find(x => x.id === id);
  if(!o) return;
  const d = ouvrageDisponible(o);
  if(!d || !d.ok) return;

  hero.or -= o.or;
  heroChantier().push(o.id);
  const e = o.effet || {};
  if(e.renom) ajusterRenom(e.renom);
  if(e.suspicion) adjustSuspicion(e.suspicion);
  for(const [p, n] of Object.entries(e.reputation || {})) ajusterReputation(p, n);
  (e.flags || []).forEach(f => { if(!hasFlag(f)) heroFlags().push(f); });

  // Bâtir prend des semaines : le monde avance, et Yohan vieillit avec.
  const resume = advanceTime(o.semaines);
  gainPointsSang(4);
  applyPassiveEffects();
  saveGame(true);

  const box = document.getElementById('eventModalBox');
  const tags = [];
  if(e.defense) tags.push(`<span class="reward-tag">+${e.defense} Défense</span>`);
  if(e.fatMax) tags.push(`<span class="reward-tag">+${e.fatMax} Fatigue max</span>`);
  if(e.entretienMult) tags.push(`<span class="reward-tag">Entretien ×${e.entretienMult}</span>`);
  if(e.prixMult) tags.push(`<span class="reward-tag">Prix ×${e.prixMult}</span>`);
  if(e.renom) tags.push(`<span class="reward-tag">+${e.renom} Renom</span>`);
  if(e.suspicion) tags.push(`<span class="reward-tag neg">+${e.suspicion} Suspicion</span>`);
  for(const [p, n] of Object.entries(e.reputation || {}))
    tags.push(`<span class="reward-tag${n < 0 ? ' neg' : ''}">${n > 0 ? '+' : '−'}${Math.abs(n)} chez les ${PEUPLE_LABELS[p]}</span>`);

  box.innerHTML = `${artEventBanner('evt_paria', 'PARIA')}
    <span class="event-tag">Chantier · ${o.semaines} semaines</span><h3>${o.nom}</h3>
    <p class="narrative">${o.apres}</p>
    <div class="reward-tags"><span class="reward-tag neg">−${o.or} or</span>${tags.join('')}</div>
    ${resume && resume.nouvelle ? `<p class="narrative" style="color:var(--parchment-dim);font-style:italic;">Pendant ce temps : ${resume.nouvelle}</p>` : ''}
    <div style="margin-top:16px;text-align:right;"><button class="primary" id="chBtn">Continuer</button></div>`;
  document.getElementById('eventModal').style.display = 'flex';
  document.getElementById('chBtn').onclick = () => { closeEventModal(); ouvrirChantier(); };
}

function ouvrirChantier(){
  const b = chantierBonus();
  const faits = heroChantier().length;
  const box = document.getElementById('eventModalBox');
  box.innerHTML = `<span class="event-tag">Karlsberg — Les Ruines du Loup</span>
    <h3>Le chantier</h3>
    <p class="narrative">${faits === 0
      ? "Trois pans de mur, un loup de pierre fendu, et de l'herbe rase. Tout est à faire, et personne ne le fera à votre place."
      : `${faits} ouvrage${faits > 1 ? 's' : ''} debout. ${faits >= CHANTIER.length ? "Il n'y a plus rien à relever : Karlsberg tient." : "Le reste attend."}`}</p>
    <div class="chantier-etat">Défense +${b.defense} · Fatigue max +${b.fatMax}
      · Entretien ×${b.entretienMult.toFixed(2)} · Prix ×${b.prixMult.toFixed(2)}
      · Repos ×${b.reposMult}</div>
    <div class="chantier-liste" id="chantierListe"></div>
    <div style="margin-top:16px;text-align:right;"><button class="primary" id="chFermer">Fermer</button></div>`;

  const holder = document.getElementById('chantierListe');
  CHANTIER.forEach(o => {
    const etat = ouvrageDisponible(o);
    const div = document.createElement('div');
    div.className = 'ouvrage' + (etat === null ? ' fait' : '') + (etat && etat.bloque ? ' bloque' : '');
    div.innerHTML = `<div><div class="ouv-nom">${o.nom}</div>
      <div class="ouv-desc">${etat === null ? o.apres : o.desc}</div>
      <div class="ouv-cout">${o.or} or · ${o.semaines} semaines</div></div>`;
    const btn = document.createElement('button');
    btn.className = 'ghost';
    if(etat === null){ btn.textContent = 'Debout'; btn.disabled = true; }
    else if(etat.bloque){ btn.textContent = etat.bloque; btn.disabled = true; }
    else { btn.textContent = 'Bâtir'; btn.onclick = () => { closeEventModal(); batir(o.id); }; }
    div.appendChild(btn);
    holder.appendChild(div);
  });

  document.getElementById('eventModal').style.display = 'flex';
  document.getElementById('chFermer').onclick = () => { closeEventModal(); renderLieu(); };
}
