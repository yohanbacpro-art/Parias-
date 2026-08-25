/* PARIAS — Le moteur des neuf
 *
 * Ils vivent. Chaque saison, chacun regarde le monde, choisit ce qui lui
 * importe le plus, et le fait — ou ne fait rien, ce qui est aussi une décision.
 *
 * Deux règles, tirées du document fondateur :
 *
 *   1. « Jamais de simulation purement aléatoire. » Une action est choisie
 *      parce qu'elle pèse le plus lourd (`poids()`), pas parce qu'un dé est
 *      tombé dessus. Le seul hasard tolérable est l'ordre dans lequel deux
 *      personnes également décidées agissent la même saison.
 *
 *   2. « La mémoire des événements importants. » Ce qu'ils retiennent de Yohan
 *      est nominatif et daté : `retient[]` dit quel marqueur les marque, en
 *      quels termes, et ce que ça leur fait. Rien ne s'efface.
 *
 * Ce que produit une action : une ligne de chronique écrite, des marqueurs, et
 * de vrais effets — une crise poussée ou freinée, une influence déplacée, une
 * réputation, un mariage, une naissance, une mort.
 */

/* Au plus deux d'entre eux agissent par saison. Au-delà, la chronique devient
 * un journal d'agence de presse et le joueur ne suit plus personne. */
const PNJ_ACTIONS_PAR_SAISON = 2;

function heroPnj(){
  if(!hero.pnj) hero.pnj = {};
  for(const p of PNJ_AUTONOMES){
    if(!hero.pnj[p.id]) hero.pnj[p.id] = {
      age: p.age, vivant: true, faits: [], memoire: [], opinion: 0,
    };
  }
  return hero.pnj;
}

function pnjEtat(id){ return heroPnj()[id] || null; }
function pnjVivant(id){ const e = pnjEtat(id); return !!e && e.vivant; }
function pnjAge(id){ const e = pnjEtat(id); return e ? e.age : 0; }

/* ============================= LA MÉMOIRE =============================
 * Un marqueur posé quelque part dans le jeu devient, pour celui que ça
 * regarde, un souvenir daté qu'il gardera jusqu'à sa mort. */

function pnjRelire(dateInfo){
  const etats = heroPnj();
  const nouveaux = [];
  for(const p of PNJ_AUTONOMES){
    const e = etats[p.id];
    if(!e.vivant) continue;
    for(const r of (p.retient || [])){
      if(!hasFlag(r.flag)) continue;
      if(e.memoire.some(m => m.flag === r.flag)) continue;
      e.memoire.push({
        flag: r.flag, texte: r.texte, opinion: r.opinion,
        date: dateInfo ? `${dateInfo.saison}, An ${dateInfo.an}` : '—',
      });
      nouveaux.push({ pnj: p, souvenir: r });
    }
  }
  return nouveaux;
}

/* Ce qu'il pense de Yohan : ce qu'il a retenu, plus ce que ses propres
 * intérêts lui dictent. Jamais un compteur qui dérive tout seul. */
function pnjOpinion(id){
  const p = PNJ_PAR_ID(id), e = pnjEtat(id);
  if(!p || !e) return 0;
  let n = e.memoire.reduce((s, m) => s + (m.opinion || 0), 0);
  try { n += p.opinion() || 0; } catch(err){ /* une humeur ne casse pas un tour */ }
  return Math.max(-100, Math.min(100, Math.round(n)));
}

const PNJ_HUMEURS = [
  { min: 45,  nom:"dévoué",   note:"il ferait quelque chose d'imprudent pour vous" },
  { min: 20,  nom:"acquis",   note:"il vous compte parmi les siens" },
  { min: 5,   nom:"favorable",note:"il vous écouterait" },
  { min: -5,  nom:"neutre",   note:"vous n'êtes pas encore un sujet" },
  { min: -25, nom:"méfiant",  note:"il regarde ce que vous faites" },
  { min: -50, nom:"hostile",  note:"il travaille contre vous" },
  { min:-101, nom:"ennemi",   note:"il vous veut fini" },
];
function pnjHumeur(id){
  const n = pnjOpinion(id);
  return PNJ_HUMEURS.find(h => n >= h.min) || PNJ_HUMEURS[PNJ_HUMEURS.length - 1];
}

/* ============================= LE TICK ============================= */

function pnjTick(dateInfo){
  const etats = heroPnj();
  pnjRelire(dateInfo);

  /* On vieillit une fois par an, au passage de l'hiver. */
  if(dateInfo && dateInfo.saisonIdx === 0){
    for(const p of PNJ_AUTONOMES) if(etats[p.id].vivant) etats[p.id].age += 1;
  }

  /* Chacun propose ce qui lui tient le plus à cœur. Les plus décidés
   * passent — pas les plus chanceux. */
  const candidats = [];
  for(const p of PNJ_AUTONOMES){
    const e = etats[p.id];
    if(!e.vivant) continue;
    let meilleure = null;
    for(const a of (p.actions || [])){
      if(e.faits.includes(a.id)) continue;
      let w = 0;
      try { w = a.poids() || 0; } catch(err){ w = 0; }
      if(w > 0 && (!meilleure || w > meilleure.poids)) meilleure = { action:a, poids:w };
    }
    if(meilleure) candidats.push({ pnj:p, ...meilleure });
  }
  candidats.sort((a, b) => b.poids - a.poids || (Math.random() - 0.5));

  const faits = [];
  for(const c of candidats.slice(0, PNJ_ACTIONS_PAR_SAISON)){
    const res = appliquerActionPnj(c.pnj, c.action, dateInfo);
    if(res) faits.push(res);
  }
  return faits;
}

function appliquerActionPnj(p, action, dateInfo){
  const e = heroPnj()[p.id];
  let r;
  try { r = action.fait(); } catch(err){ return null; }
  if(!r) return null;

  e.faits.push(action.id);

  (r.flags || []).forEach(f => { if(!hasFlag(f)) hero.flags.push(f); });
  if(r.flag && !hasFlag(r.flag)) hero.flags.push(r.flag);
  for(const [k, n] of Object.entries(r.reputation || {}))
    if(typeof ajusterReputation === 'function') ajusterReputation(k, n);
  if(r.suspicion && typeof adjustSuspicion === 'function') adjustSuspicion(r.suspicion);
  if(r.renom && typeof ajusterRenom === 'function') ajusterRenom(r.renom);
  if(typeof r.or === 'number') hero.or = Math.max(0, (hero.or || 0) + r.or);
  if(r.crise && typeof crisePousser === 'function') crisePousser(r.crise.id, r.crise.n);
  if(r.politique && typeof heroPolitique === 'function'){
    const pol = heroPolitique();
    pol.influence[r.politique.id] = Math.max(0, Math.min(100,
      (pol.influence[r.politique.id] || 0) + r.politique.n));
  }
  if(r.affinite && typeof ajusterAffinite === 'function')
    ajusterAffinite(r.affinite.qui, r.affinite.n);
  if(r.mort) e.vivant = false;

  if(hero.chroniques){
    hero.chroniques.push({
      date: dateInfo ? `${dateInfo.saison}, An ${dateInfo.an}` : '—',
      texte: '☗ ' + r.texte,
    });
  }
  return { pnj:p, action, texte:r.texte };
}

/* ============================= L'ÉCRAN ============================= */

function renderPnj(){
  const grid = document.getElementById('pnjGrid');
  if(!grid) return;
  const etats = heroPnj();

  grid.innerHTML = PNJ_AUTONOMES.map(p => {
    const e = etats[p.id];
    const h = pnjHumeur(p.id);
    const memoire = e.memoire.slice(-3).reverse()
      .map(m => `<li><span class="pnja-quand">${m.date}</span>${m.texte}</li>`).join('');
    let obj = '';
    try { obj = p.objectif() || ''; } catch(err){ obj = ''; }

    const face = (typeof artPortraitImg === 'function')
      ? artPortraitImg(p.portrait, 'pnja-face') : '';

    return `<div class="pnja${e.vivant ? '' : ' pnja-mort'} pnja-${h.nom}">
      <div class="pnja-tete">${face}
        <div class="pnja-ident">
          <span class="pnja-nom">${p.nom}</span>
          <span class="pnja-sous">${e.vivant ? `${e.age} ans · ${p.lieu}` : 'mort'}</span>
        </div>
        <span class="pnja-humeur">${e.vivant ? h.nom : '—'}</span>
      </div>
      ${e.vivant ? `<div class="pnja-objectif"><b>En ce moment :</b> ${obj}</div>` : ''}
      <div class="pnja-traits">${p.traits.join(' · ')}</div>
      ${memoire ? `<div class="pnja-memoire-titre">Ce qu'il retient de vous</div>
                   <ul class="pnja-memoire">${memoire}</ul>`
                : `<div class="pnja-memoire-vide">${e.vivant ? "Rien encore. Vous ne vous êtes pas croisés d'assez près." : ''}</div>`}
    </div>`;
  }).join('');
}
