/* PARIAS — Batailles
 *
 * Une échelle au-dessus du combat : ici Yohan ne frappe plus, il commande.
 *
 * Le champ est découpé en trois FRONTS (gauche, centre, droite), chacun avec son
 * terrain. On y répartit ses unités, on donne un ORDRE par front, et on résout
 * le tour — les deux camps frappent en même temps.
 *
 * Deux ressources décident de l'issue :
 *   les effectifs — une unité vidée est dissoute, définitivement
 *   le moral      — à zéro, l'armée rompt, même si elle a encore des hommes
 *
 * Yohan se place sur un front comme une unité : sa présence tient le moral, et
 * il peut lâcher une fois par bataille un Coup de l'Onde. Devant deux mille
 * témoins, ça se paie en Suspicion longtemps après.
 *
 * API :
 *   startBattle(def, retour)   def = entrée de BATTLES · retour = callback de sortie
 *   derniereBatailleGagnee     lu par les contrats de guerre
 */

let bataille = null;
let retourBataille = null;
let derniereBatailleGagnee = null;

/* ============================= CONSTRUCTION ============================= */

let _uid = 0;
function instancierUnite(type, effectifPct){
  const t = typeof type === 'string' ? UNIT_TYPES[type] : type;
  if(!t){ console.warn('Type d\'unité inconnu :', type); return null; }
  const eff = Math.max(1, Math.round(t.effectif * (effectifPct === undefined ? 1 : effectifPct)));
  return {
    uid: 'u'+(++_uid), type: t.id, nom: t.nom, categorie: t.categorie,
    effectif: eff, effectifMax: t.effectif,
    attaque: t.attaque, defense: t.defense, moral: t.moral, portee: t.portee,
    aBouge: false,
  };
}

/* Le rôle de l'armée vit sur hero.armee — des instances persistantes entre deux
 * batailles, avec leurs pertes. */
function armeeDuJoueur(){ if(!hero.armee) hero.armee = []; return hero.armee; }
function effectifTotal(list){ return list.reduce((s,u)=>s+u.effectif, 0); }

function startBattle(def, retour){
  const roster = armeeDuJoueur().filter(u=>u.effectif>0).map(u=>({ ...u, aBouge:false }));
  retourBataille = retour || null;
  derniereBatailleGagnee = null;

  bataille = {
    def,
    phase: 'deploiement',
    tour: 1,
    fronts: def.fronts.map((f,i)=>({
      idx: i, nom: f.nom, terrain: f.terrain,
      ordre: 'tenir',
      allies: [],
      ennemis: (f.ennemis||[]).map(e => instancierUnite(e.type, e.effectifPct)).filter(Boolean),
    })),
    reserve: roster,
    moralAllie: 100, moralEnnemi: 100,
    effectifInitialAllie: effectifTotal(roster),
    yohanFront: null,
    ondeUtilisee: false,
    over: false, victoire: null,
    journal: [],
  };
  bataille.effectifInitialEnnemi = bataille.fronts.reduce((s,f)=>s+effectifTotal(f.ennemis), 0);

  showScreen('bataille');
  document.getElementById('batFin').style.display = 'none';
  document.getElementById('batCorps').style.display = 'block';
  batLog('systeme', `${def.nom} — ${effectifTotal(roster)} hommes face à ${bataille.effectifInitialEnnemi}.`);
  if(def.intro) batLog('recit', def.intro);
  renderBattle();
}

/* ============================= RÈGLES ============================= */

function coefTerrain(terrain, categorie){
  const t = TERRAINS[terrain] || TERRAINS.plaine;
  return categorie === 'cavalerie' ? t.cav : categorie === 'archers' ? t.arc : t.inf;
}

/* Avantage moyen d'une unité face à la composition d'en face. */
function avantageMoyen(u, adverses){
  const vivants = adverses.filter(a=>a.effectif>0);
  if(!vivants.length) return 1;
  const somme = vivants.reduce((s,a)=>s + avantageContre(u.categorie, a.categorie) * a.effectif, 0);
  return somme / effectifTotal(vivants);
}

function puissanceFront(unites, ordreId, terrain, adverses){
  const o = ORDRES[ordreId] || ORDRES.tenir;
  return unites.reduce((total, u)=>{
    if(u.effectif<=0) return total;
    if(u.aBouge) return total;                  // une unité qui manœuvre ne frappe pas
    if(o.tirSeul && u.portee === 0) return total;
    const base = (u.effectif/10) * u.attaque;
    return total + base * o.atk * coefTerrain(terrain, u.categorie) * avantageMoyen(u, adverses);
  }, 0);
}

function resistanceFront(unites, ordreId, terrain){
  const o = ORDRES[ordreId] || ORDRES.tenir;
  return unites.reduce((total, u)=>{
    if(u.effectif<=0) return total;
    return total + (u.effectif/10) * u.defense * o.def * coefTerrain(terrain, u.categorie);
  }, 0);
}

/* Répartit des pertes sur les unités d'un front, au prorata de leur effectif. */
function infligerPertes(unites, pertes){
  const vivants = unites.filter(u=>u.effectif>0);
  const total = effectifTotal(vivants);
  if(!total || pertes<=0) return { pertes:0, dissoutes:[] };
  let restant = Math.min(pertes, total);
  const dissoutes = [];
  vivants.forEach((u,i)=>{
    const part = (i === vivants.length-1)
      ? restant
      : Math.min(restant, Math.round(pertes * (u.effectif/total)));
    const reel = Math.min(part, u.effectif);
    u.effectif -= reel;
    restant -= reel;
    if(u.effectif<=0) dissoutes.push(u.nom);
  });
  return { pertes: Math.min(pertes,total), dissoutes };
}

/* L'ennemi choisit ses ordres : simple, mais pas stupide. */
function ordreEnnemi(front){
  const mesUnites = front.ennemis.filter(u=>u.effectif>0);
  if(!mesUnites.length) return 'tenir';
  const face = front.allies.filter(u=>u.effectif>0);
  if(!face.length) return 'tenir';
  const moi  = effectifTotal(mesUnites);
  const lui  = effectifTotal(face);
  const queDesTireurs = mesUnites.every(u=>u.portee===1);
  if(queDesTireurs && lui > 0) return 'harceler';
  if(moi > lui * 1.4) return 'charger';
  if(moi < lui * 0.6) return 'tenir';
  return Math.random() < 0.4 ? 'charger' : 'tenir';
}

/* ============================= TOUR DE BATAILLE ============================= */

function resoudreTour(){
  if(!bataille || bataille.over) return;
  if(bataille.phase === 'deploiement'){
    if(!bataille.fronts.some(f=>f.allies.length)){
      batLog('systeme', "Aucune unité n'est déployée : la bataille ne peut pas commencer.");
      renderBattle(); return;
    }
    bataille.phase = 'bataille';
    batLog('systeme', '— Les lignes sont formées. —');
    renderBattle();
    return;
  }

  batLog('systeme', `— Tour ${bataille.tour} —`);

  // Le moral que rendent les ordres est mutualisé, pas cumulé front par front :
  // tenir partout ne doit pas régénérer plus vite que les pertes n'entament.
  let moralOrdres = 0;

  bataille.fronts.forEach(front=>{
    const ordreA = front.ordre;
    const ordreB = ordreEnnemi(front);
    const alliesVivants  = front.allies.filter(u=>u.effectif>0);
    const ennemisVivants = front.ennemis.filter(u=>u.effectif>0);
    if(!alliesVivants.length && !ennemisVivants.length) return;

    const terr = TERRAINS[front.terrain] ? front.terrain : 'plaine';

    // Les deux camps frappent en même temps : on calcule tout avant d'appliquer.
    const pA = puissanceFront(alliesVivants, ordreA, terr, ennemisVivants);
    const rA = resistanceFront(alliesVivants, ordreA, terr);
    const pB = puissanceFront(ennemisVivants, ordreB, terr, alliesVivants);
    const rB = resistanceFront(ennemisVivants, ordreB, terr);

    // Le harcèlement ne se fait pas rendre ses coups par la mêlée d'en face.
    const bAtteintParA = !(ORDRES[ordreB]||{}).tirSeul || (ORDRES[ordreA]||{}).tirSeul;
    const aAtteintParB = !(ORDRES[ordreA]||{}).tirSeul || (ORDRES[ordreB]||{}).tirSeul;

    const pertesB = bAtteintParA ? Math.max(ennemisVivants.length?1:0, Math.round((pA - rB*0.5)/5)) : 0;
    const pertesA = aAtteintParB ? Math.max(alliesVivants.length?1:0,  Math.round((pB - rA*0.5)/5)) : 0;

    const rB2 = infligerPertes(front.ennemis, Math.max(0,pertesB));
    const rA2 = infligerPertes(front.allies,  Math.max(0,pertesA));

    const nomOrdreA = (ORDRES[ordreA]||{}).nom || ordreA;
    const nomOrdreB = (ORDRES[ordreB]||{}).nom || ordreB;
    batLog('front', `<b>${front.nom}</b> (${TERRAINS[terr].nom}) — ${nomOrdreA} contre ${nomOrdreB} : `
      + `<span class="perte-e">${rB2.pertes} pertes ennemies</span>, `
      + `<span class="perte-a">${rA2.pertes} des nôtres</span>.`);
    rB2.dissoutes.forEach(n=> batLog('systeme', `${n} est anéantie.`));
    rA2.dissoutes.forEach(n=> batLog('perte', `${n} est anéantie.`));

    // Le moral suit les pertes et l'ordre donné
    bataille.moralAllie  -= Math.round(rA2.pertes / Math.max(1,bataille.effectifInitialAllie)  * 90);
    bataille.moralEnnemi -= Math.round(rB2.pertes / Math.max(1,bataille.effectifInitialEnnemi) * 90);
    moralOrdres += (ORDRES[ordreA]||{}).moral || 0;

    // Un front vidé de ses défenseurs entame le moral de toute l'armée
    if(!front.allies.some(u=>u.effectif>0) && front.ennemis.some(u=>u.effectif>0)){
      bataille.moralAllie -= 6;
    }
    if(!front.ennemis.some(u=>u.effectif>0) && front.allies.some(u=>u.effectif>0)){
      bataille.moralEnnemi -= 6;
    }
  });

  // Moyenne des ordres, et non leur somme
  bataille.moralAllie += Math.round(moralOrdres / bataille.fronts.length);

  // Yohan sur un front : sa seule présence retient la ligne, sans la garantir
  if(bataille.yohanFront !== null && bataille.fronts[bataille.yohanFront].allies.some(u=>u.effectif>0)){
    bataille.moralAllie += 1;
  }

  bataille.moralAllie  = Math.max(0, Math.min(100, bataille.moralAllie));
  bataille.moralEnnemi = Math.max(0, Math.min(100, bataille.moralEnnemi));

  bataille.fronts.forEach(f=>f.allies.forEach(u=>{ u.aBouge = false; }));
  bataille.tour++;
  renderBattle();
  verifierFinBataille();
}

/* ---- Manœuvres ---- */

function deplacerUnite(uid, destination){
  if(!bataille || bataille.over) return;
  let unite = null, source = null;

  const iRes = bataille.reserve.findIndex(u=>u.uid===uid);
  if(iRes >= 0){ unite = bataille.reserve[iRes]; source = 'reserve'; }
  else {
    for(const f of bataille.fronts){
      const i = f.allies.findIndex(u=>u.uid===uid);
      if(i >= 0){ unite = f.allies[i]; source = f; break; }
    }
  }
  if(!unite) return;
  if(source === destination) return;

  // Hors déploiement, une manœuvre coûte le tour de l'unité
  if(bataille.phase !== 'deploiement'){
    if(unite.aBouge) return;
    unite.aBouge = true;
  }

  if(source === 'reserve') bataille.reserve = bataille.reserve.filter(u=>u.uid!==uid);
  else source.allies = source.allies.filter(u=>u.uid!==uid);

  if(destination === 'reserve') bataille.reserve.push(unite);
  else destination.allies.push(unite);

  if(bataille.phase !== 'deploiement'){
    batLog('systeme', `${unite.nom} manœuvre vers ${destination === 'reserve' ? 'la réserve' : destination.nom} — elle ne combattra pas ce tour-ci.`);
  }
  renderBattle();
}

function placerYohan(idx){
  if(!bataille || bataille.over) return;
  bataille.yohanFront = (bataille.yohanFront === idx) ? null : idx;
  renderBattle();
}

/* Le Coup de l'Onde : une fois par bataille, sur le front où se tient Yohan. */
function coupDeLOnde(){
  if(!bataille || bataille.over || bataille.ondeUtilisee) return;
  if(bataille.yohanFront === null) return;
  const front = bataille.fronts[bataille.yohanFront];
  const cibles = front.ennemis.filter(u=>u.effectif>0);
  if(!cibles.length) return;

  bataille.ondeUtilisee = true;
  const cible = cibles.reduce((m,u)=> u.effectif > m.effectif ? u : m, cibles[0]);
  const fauches = Math.max(1, Math.round(cible.effectif * 0.55));
  cible.effectif = Math.max(0, cible.effectif - fauches);

  bataille.moralEnnemi = Math.max(0, bataille.moralEnnemi - 18);
  bataille.moralAllie  = Math.min(100, bataille.moralAllie + 6);
  hero.fat = Math.min(hero.fatMax, hero.fat + 35);

  batLog('onde', `Yohan lâche l'Onde sur ${front.nom} : <b>${fauches} hommes</b> de ${cible.nom} sont fauchés d'un coup. `
    + `Les deux armées ont vu. Le moral ennemi s'effondre — et plus personne, ici, ne doutera de ce qu'est Yohan de Karlsberg.`);
  if(cible.effectif<=0) batLog('systeme', `${cible.nom} est anéantie.`);

  renderBattle();
  verifierFinBataille();
}

/* ============================= FIN DE BATAILLE ============================= */

function verifierFinBataille(){
  if(!bataille || bataille.over) return false;
  const ennemisRestants = bataille.fronts.reduce((s,f)=>s+effectifTotal(f.ennemis.filter(u=>u.effectif>0)), 0);
  const alliesRestants  = bataille.fronts.reduce((s,f)=>s+effectifTotal(f.allies.filter(u=>u.effectif>0)), 0)
                        + effectifTotal(bataille.reserve);

  let victoire = null;
  if(ennemisRestants<=0 || bataille.moralEnnemi<=0) victoire = true;
  else if(alliesRestants<=0 || bataille.moralAllie<=0) victoire = false;
  if(victoire === null) return false;

  bataille.over = true;
  bataille.victoire = victoire;
  derniereBatailleGagnee = victoire;
  appliquerSuitesBataille(victoire);
  afficherFinBataille(victoire);
  return true;
}

function appliquerSuitesBataille(victoire){
  // Les survivants rentrent au rôle avec leurs pertes ; les unités vidées sont dissoutes.
  const survivants = [];
  bataille.fronts.forEach(f=>f.allies.forEach(u=>{ if(u.effectif>0) survivants.push(u); }));
  bataille.reserve.forEach(u=>{ if(u.effectif>0) survivants.push(u); });
  hero.armee = survivants.map(u=>({ ...u, aBouge:false }));

  const d = bataille.def;
  const gains = victoire ? (d.recompense||{}) : (d.echec||{});
  if(gains.renom)   ajusterRenom(gains.renom);
  if(gains.or)      hero.or = Math.max(0, hero.or + gains.or);
  if(gains.sang)    gainPointsSang(gains.sang);
  if(gains.xp)      gainXP(gains.xp);
  if(gains.suspicion) adjustSuspicion(gains.suspicion);
  (gains.flags||[]).forEach(f=>{ if(!hasFlag(f)) heroFlags().push(f); });
  if(gains.reputation){
    for(const [p, n] of Object.entries(gains.reputation)) ajusterReputation(p, n);
  }

  // Ce qu'on ramasse sur le champ : l'équipement de ceux qu'on vient de battre.
  // `peupleAdverse` est celui d'en face — à ne pas confondre avec `peuple`, qui
  // désigne le peuple dont cette bataille est la crise.
  bataille.butin = null;
  if(victoire){
    if(d.butinPeuple) bataille.butin = butinDeBataille(d.butinPeuple);
    // Battre un peuple laisse des traces chez lui, même quand la cause est juste.
    // Une compagnie franche ou une bande de pillards n'est le peuple de personne :
    // les tailler en pièces ne coûte rien à personne.
    if(d.peupleAdverse) ajusterReputation(d.peupleAdverse, -8);
    if(d.peupleAllie)   ajusterReputation(d.peupleAllie, 12);
  }

  // Employer l'Onde devant une armée, c'est renoncer à l'anonymat
  if(bataille.ondeUtilisee){ adjustSuspicion(25); if(!hasFlag('onde_devant_armee')) heroFlags().push('onde_devant_armee'); }

  saveGame(true);
}

function afficherFinBataille(victoire){
  document.getElementById('batCorps').style.display = 'none';
  const el = document.getElementById('batFin');
  el.style.display = 'block';
  el.className = 'end-screen ' + (victoire ? '' : 'defeat');

  const d = bataille.def;
  const gains = victoire ? (d.recompense||{}) : (d.echec||{});
  const restants = effectifTotal(hero.armee);
  const perdus = Math.max(0, bataille.effectifInitialAllie - restants);

  const lignes = [];
  if(gains.renom) lignes.push(`Renom <b style="color:var(--gold);">${gains.renom>0?'+':''}${gains.renom}</b>`);
  if(gains.or)    lignes.push(`Or <b style="color:var(--gold);">${gains.or>0?'+':''}${gains.or}</b>`);
  if(gains.sang)  lignes.push(`Sang <b style="color:var(--gold);">+${gains.sang}</b>`);
  if(gains.xp)    lignes.push(`Expérience <b style="color:var(--gold);">+${gains.xp}</b>`);
  if(bataille.butin) lignes.push(`Ramassé sur le champ : <b style="color:var(--gold);">${bataille.butin.nom}</b>`);
  if(victoire && d.peupleAdverse) lignes.push(`Chez les ${PEUPLE_LABELS[d.peupleAdverse]} <b style="color:var(--blood-bright);">−8</b>`);
  if(victoire && d.peupleAllie) lignes.push(`Chez les ${PEUPLE_LABELS[d.peupleAllie]} <b style="color:var(--gold);">+12</b>`);

  el.innerHTML = `<h2>${victoire ? 'La ligne a tenu' : 'L\'armée a rompu'}</h2>
    <p>${victoire ? (d.texteVictoire || 'Le champ reste aux couleurs de Karlsberg.')
                  : (d.texteDefaite  || 'Ce qui reste de l\'armée décroche dans le désordre.')}</p>
    <div style="text-align:left;max-width:380px;margin:16px auto;font-family:'Inter',sans-serif;font-size:12.5px;color:var(--parchment-dim);">
      <div>Pertes : <b style="color:var(--blood-bright);">${perdus} hommes</b></div>
      <div>Il reste : <b style="color:var(--parchment);">${restants} hommes</b></div>
      ${lignes.map(l=>`<div>${l}</div>`).join('')}
    </div>
    <button class="primary" id="batFinBtn">Continuer</button>`;
  document.getElementById('batFinBtn').onclick = () => {
    const r = retourBataille; retourBataille = null;
    if(r) r(victoire); else showScreen('monde');
  };
}

/* ============================= RENOM ============================= */

function ajusterRenom(n){
  if(hero.renom === undefined) hero.renom = 0;
  hero.renom = Math.max(0, hero.renom + n);
}
function renomActuel(){ return hero.renom === undefined ? 0 : hero.renom; }
function rangMilitaire(r){
  if(r < 15) return "Inconnu";
  if(r < 35) return "Chef de bande";
  if(r < 60) return "Capitaine";
  if(r < 100) return "Commandant";
  return "Seigneur de guerre";
}

/* ============================= RENDU ============================= */

function batLog(cls, msg){
  if(!bataille) return;
  bataille.journal.push({cls, msg});
  const box = document.getElementById('batJournal');
  if(!box) return;
  const p = document.createElement('p');
  p.className = 'bat-log-'+cls;
  p.innerHTML = msg;
  box.appendChild(p);
  box.scrollTop = box.scrollHeight;
}

function carteUnite(u, contexte){
  const pct = Math.max(0, 100*u.effectif/u.effectifMax);
  const cls = ['unit-card', contexte, u.effectif<=0?'morte':'', u.aBouge?'a-bouge':''].filter(Boolean).join(' ');
  return `<div class="${cls}" data-uid="${u.uid}">
    <div class="u-top"><span class="u-nom">${u.nom}</span><span class="u-eff">${u.effectif}</span></div>
    <div class="u-bar"><i style="width:${pct}%"></i></div>
    <div class="u-meta">${u.categorie} · ATQ ${u.attaque} · DÉF ${u.defense}${u.portee?' · à distance':''}${u.aBouge?' · manœuvre':''}</div>
  </div>`;
}

function renderBattle(){
  if(!bataille) return;
  const d = bataille.def;

  document.getElementById('batTitre').textContent = d.nom;
  document.getElementById('batTour').textContent =
    bataille.phase === 'deploiement' ? 'Déploiement' : `Tour ${bataille.tour}`;
  document.getElementById('batMoralAllieBar').style.width  = bataille.moralAllie+'%';
  document.getElementById('batMoralEnnemiBar').style.width = bataille.moralEnnemi+'%';
  document.getElementById('batMoralAllieTxt').textContent  = bataille.moralAllie;
  document.getElementById('batMoralEnnemiTxt').textContent = bataille.moralEnnemi;

  // --- Fronts ---
  const holder = document.getElementById('batFronts');
  holder.innerHTML = bataille.fronts.map((f,i)=>{
    const t = TERRAINS[f.terrain] || TERRAINS.plaine;
    const yohanIci = bataille.yohanFront === i;
    const optionsOrdre = Object.entries(ORDRES).map(([id,o])=>
      `<option value="${id}"${f.ordre===id?' selected':''}>${o.nom}</option>`).join('');
    return `<div class="front${yohanIci?' avec-yohan':''}" data-front="${i}">
      <div class="front-tete">
        <span class="front-nom">${f.nom}</span>
        <span class="front-terrain" title="${t.desc}">${t.nom}</span>
      </div>
      <div class="front-ennemis">
        <div class="front-label">En face</div>
        ${f.ennemis.filter(u=>u.effectif>0).map(u=>carteUnite(u,'ennemi')).join('') || '<div class="front-vide">Plus personne.</div>'}
      </div>
      <div class="front-ordre">
        <label>Ordre</label>
        <select data-ordre="${i}" ${bataille.over?'disabled':''}>${optionsOrdre}</select>
        <div class="ordre-desc">${(ORDRES[f.ordre]||{}).desc||''}</div>
      </div>
      <div class="front-allies" data-drop="${i}">
        <div class="front-label">Nos lignes</div>
        ${f.allies.filter(u=>u.effectif>0).map(u=>carteUnite(u,'allie')).join('') || '<div class="front-vide">Personne ne tient ce front.</div>'}
        <button class="ghost front-yohan" data-yohan="${i}">${yohanIci?'Yohan tient ce front':'Placer Yohan ici'}</button>
      </div>
    </div>`;
  }).join('');

  // --- Réserve ---
  const res = document.getElementById('batReserve');
  res.innerHTML = bataille.reserve.filter(u=>u.effectif>0).map(u=>carteUnite(u,'allie')).join('')
    || '<div class="front-vide">Réserve vide.</div>';

  // --- Interactions ---
  const selection = () => document.querySelector('.unit-card.selectionnee');
  holder.querySelectorAll('.unit-card.allie, #batReserve .unit-card').forEach(()=>{});
  document.querySelectorAll('.unit-card.allie').forEach(el=>{
    el.onclick = (e) => {
      e.stopPropagation();
      const deja = el.classList.contains('selectionnee');
      document.querySelectorAll('.unit-card').forEach(c=>c.classList.remove('selectionnee'));
      if(!deja) el.classList.add('selectionnee');
    };
  });
  holder.querySelectorAll('[data-drop]').forEach(zone=>{
    zone.onclick = () => {
      const sel = selection();
      if(!sel) return;
      deplacerUnite(sel.dataset.uid, bataille.fronts[parseInt(zone.dataset.drop,10)]);
    };
  });
  res.onclick = () => {
    const sel = selection();
    if(sel) deplacerUnite(sel.dataset.uid, 'reserve');
  };
  holder.querySelectorAll('[data-ordre]').forEach(sel=>{
    sel.onchange = () => { bataille.fronts[parseInt(sel.dataset.ordre,10)].ordre = sel.value; renderBattle(); };
  });
  holder.querySelectorAll('[data-yohan]').forEach(btn=>{
    btn.onclick = (e) => { e.stopPropagation(); placerYohan(parseInt(btn.dataset.yohan,10)); };
  });

  // --- Boutons ---
  const act = document.getElementById('batActionBtn');
  act.textContent = bataille.phase === 'deploiement' ? 'Engager la bataille' : 'Résoudre le tour';
  act.disabled = bataille.over;
  act.onclick = resoudreTour;

  const onde = document.getElementById('batOndeBtn');
  const peut = !bataille.over && !bataille.ondeUtilisee && bataille.yohanFront !== null
            && bataille.phase !== 'deploiement';
  onde.disabled = !peut;
  onde.textContent = bataille.ondeUtilisee
    ? "Coup de l'Onde — déjà employé"
    : (bataille.yohanFront === null ? "Coup de l'Onde — placez Yohan sur un front" : "Coup de l'Onde (+35 Fatigue, très visible)");
  onde.onclick = coupDeLOnde;

  document.getElementById('batAide').textContent = bataille.phase === 'deploiement'
    ? "Cliquez une unité, puis un front pour l'y placer. Le déploiement est libre — ensuite, manœuvrer coûtera son tour à l'unité."
    : "Une unité qui change de front ne combat pas ce tour-ci. Choisissez un ordre par front, puis résolvez.";
}
