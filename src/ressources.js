/* PARIAS — Ce qu'on a, et d'où ça vient
 *
 * Quatre stocks, et rien qui s'achète. Une source s'ouvre parce qu'on a rendu
 * une carrière à ses hommes, tenu un refuge, rouvert une route, soldé une dette
 * naine. Elle rapporte ensuite chaque saison, toute seule, tant qu'elle tient.
 *
 * Le joueur ne voit jamais un rendement : il voit la liste de ce qui travaille
 * pour lui et pourquoi. C'est la même règle que partout ailleurs — les nombres
 * sont dans le moteur, les raisons sont à l'écran.
 */

function heroRessources(){
  if(!hero.ressources) hero.ressources = { pierre:0, bras:0, grain:0, faveurs:0 };
  for(const k of Object.keys(RESSOURCES))
    if(typeof hero.ressources[k] !== 'number') hero.ressources[k] = 0;
  return hero.ressources;
}

function ressourceDe(k){ return heroRessources()[k] || 0; }

/* Les sources ouvertes — celles dont le marqueur est posé. */
function sourcesActives(){ return SOURCES.filter(s => hasFlag(s.flag)); }

/* Ce qui rentre chaque saison, par ressource. */
function rendementParSaison(){
  const r = { pierre:0, bras:0, grain:0, faveurs:0 };
  sourcesActives().forEach(s => { r[s.res] += s.n; });
  return r;
}

/* Appelé une fois par saison. Les bras mangent : une place qui abrite plus de
 * gens qu'elle n'en nourrit en perd, et c'est ce qui empêche d'entasser. */
function ressourcesTick(){
  const st = heroRessources();
  const r = rendementParSaison();
  for(const k of Object.keys(r)) st[k] += r[k];

  const faim = Math.max(0, Math.floor(st.bras / 6) - Math.floor(st.grain / 4));
  if(faim > 0){
    st.bras = Math.max(0, st.bras - faim);
    if(hero.chroniques && faim >= 2){
      const d = dateFromSemaines(hero.temps ? hero.temps.semaines : 0);
      hero.chroniques.push({ date:`${d.saison}, An ${d.an}`,
        texte:`⌂ Karlsberg nourrit moins de monde qu'elle n'en abrite. ${faim} hommes sont repartis avant l'hiver.` });
    }
  }
  for(const k of Object.keys(st)) st[k] = Math.min(999, st[k]);
  return r;
}

/* ============================= PAYER ============================= */

function coutManquant(cout){
  const manque = [];
  if(!cout) return manque;
  if(cout.or && (hero.or || 0) < cout.or)
    manque.push({ res:'or', il:cout.or - (hero.or||0), nom:"or" });
  for(const k of Object.keys(RESSOURCES)){
    if(cout[k] && ressourceDe(k) < cout[k])
      manque.push({ res:k, il: cout[k] - ressourceDe(k), nom: RESSOURCES[k].nom.toLowerCase() });
  }
  return manque;
}

function payerRessources(cout){
  if(!cout) return;
  if(cout.or) hero.or = Math.max(0, (hero.or||0) - cout.or);
  const st = heroRessources();
  for(const k of Object.keys(RESSOURCES))
    if(cout[k]) st[k] = Math.max(0, st[k] - cout[k]);
}

/* Où trouver ce qui manque : on ne dit pas « il vous faut 8 pierres », on dit
 * quelles décisions du monde ouvrent une carrière. */
function ouTrouver(res){
  return SOURCES.filter(s => s.res === res && !hasFlag(s.flag)).slice(0, 3).map(s => s.quoi);
}

/* ============================= LES CONDITIONS ============================= */

function conditionRemplie(id){
  const c = CONDITIONS_CHANTIER[id];
  return !!c && c.flags.some(f => hasFlag(f));
}
function conditionsManquantes(liste){
  return (liste || []).filter(id => !conditionRemplie(id))
    .map(id => CONDITIONS_CHANTIER[id]).filter(Boolean);
}

/* ============================= L'ÉTAT DE KARLSBERG ============================= */

function palierKarlsberg(){
  let dernier = KARLSBERG_PALIERS[0];
  for(const p of KARLSBERG_PALIERS){
    if(p.exige.every(id => ouvrageFait(id))) dernier = p; else break;
  }
  return dernier;
}
function palierSuivant(){
  const i = KARLSBERG_PALIERS.findIndex(p => p.id === palierKarlsberg().id);
  return KARLSBERG_PALIERS[i + 1] || null;
}

/* ============================= L'ÉCRAN ============================= */

function renderRessources(){
  const bloc = document.getElementById('ressourcesBloc');
  if(!bloc) return;
  heroRessources();
  const rend = rendementParSaison();
  const actives = sourcesActives();
  const pal = palierKarlsberg();
  const suiv = palierSuivant();

  const cartes = Object.entries(RESSOURCES).map(([k, r]) => {
    const sources = actives.filter(s => s.res === k);
    return `<div class="res">
      <div class="res-tete"><span class="res-nom">${r.nom}</span>
        <span class="res-n">${ressourceDe(k)}<i>${r.unite}</i></span></div>
      <div class="res-note">${r.note}</div>
      ${sources.length
        ? `<ul class="res-sources">${sources.map(s =>
            `<li><b>${s.quoi}</b> — ${s.pourquoi}</li>`).join('')}</ul>
           <div class="res-flux">+${rend[k]} par saison</div>`
        : `<div class="res-rien">Rien ne vous en apporte. ${
             ouTrouver(k).length ? 'Il faudrait : ' + ouTrouver(k).join(', ') + '.' : ''}</div>`}
    </div>`;
  }).join('');

  bloc.innerHTML = `
    <div class="kb-etat">
      <span class="kb-palier">${pal.nom}</span>
      <p class="kb-dit">${pal.dit}</p>
      ${suiv ? `<p class="kb-suite">Pour que ce soit <b>${suiv.nom.toLowerCase()}</b>, il faudrait : ${
        suiv.exige.filter(id => !ouvrageFait(id))
          .map(id => (CHANTIER.find(o => o.id === id) || {}).nom || id).join(', ')}.</p>` : ''}
    </div>
    <div class="res-grid">${cartes}</div>`;
}
