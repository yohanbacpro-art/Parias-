/* PARIAS — Chroniques de Vardhen · moteur de jeu V0.2
 *
 * Dépend des fichiers de src/data/ chargés avant celui-ci (BESTIARY_FULL,
 * LOCATIONS, EVENTS, CONTRACTS, TREE, ITEM_POOL, TRAME_CHAPITRES, …).
 *
 * Boucle principale : 3 actions par tour → « Terminer le tour » fait avancer
 * le calendrier de 2 à 6 semaines. Le monde progresse indépendamment du joueur.
 */

/* ============================= TRAME PRINCIPALE ============================= */
function gainPointsSang(n){
  hero.trame.points = Math.min(200, hero.trame.points + n);
  const nextIdx = hero.trame.chapitre+1;
  if(nextIdx < TRAME_CHAPITRES.length && hero.trame.points >= TRAME_CHAPITRES[nextIdx].seuil){
    hero.trame.chapitre = nextIdx;
    triggerChapitre(nextIdx);
    renderQuete();
    return true;
  }
  renderQuete();
  return false;
}

function triggerChapitre(idx){
  const ch = TRAME_CHAPITRES[idx];
  let extra = "";
  if(idx===1 && !hero.compagnons.find(c=>c.id==='alycia')){
    hero.compagnons.push(COMPANIONS_POOL.alycia);
    extra = `<p style="margin-top:10px;color:var(--onde-bright);">Une femme se révèle à Yohan, comme si elle l'observait depuis longtemps : <b>Alycia de Callensbourg</b>. ${COMPANIONS_POOL.alycia.desc}</p>`;
  }
  const box = document.getElementById('eventModalBox');
  if(ch.fin){
    box.innerHTML = `<span class="event-tag">Fin de la chronique</span><h3>${ch.titre}</h3><p>${ch.objectif}</p>
      <div style="text-align:left;max-width:360px;margin:16px 0;font-family:'Inter',sans-serif;font-size:12.5px;color:var(--parchment-dim);">
        <div>Niveau atteint : <b style="color:var(--gold);">${hero.niveau}</b></div>
        <div>Or amassé : <b style="color:var(--gold);">${hero.or}</b></div>
        <div>Compagnons : <b style="color:var(--gold);">${hero.compagnons.map(c=>c.nom).join(', ')||'aucun'}</b></div>
      </div>
      <div style="margin-top:16px;text-align:right;"><button class="primary" id="closeChapBtn">Nouvelle chronique</button></div>`;
    document.getElementById('eventModal').style.display='flex';
    document.getElementById('closeChapBtn').onclick = resetGame;
    return;
  }
  box.innerHTML = `<span class="event-tag">Chapitre ${idx+1}</span><h3>${ch.titre}</h3><p>${ch.objectif}</p>${extra}
    <div style="margin-top:16px;text-align:right;"><button class="primary" id="closeChapBtn">Continuer</button></div>`;
  document.getElementById('eventModal').style.display='flex';
  document.getElementById('closeChapBtn').onclick = closeEventModal;
}

function renderQuete(){
  const ch = TRAME_CHAPITRES[hero.trame.chapitre];
  const next = TRAME_CHAPITRES[hero.trame.chapitre+1];
  document.getElementById('queteChapitre').innerHTML = `<span class="qc-num">Chapitre ${hero.trame.chapitre+1}</span>${ch.titre}<p style="color:var(--parchment-dim);font-style:italic;font-size:14px;margin-top:8px;">${ch.objectif}</p>`;
  const pct = next ? Math.min(100, Math.round(100*(hero.trame.points-ch.seuil)/(next.seuil-ch.seuil))) : 100;
  document.getElementById('queteBar').style.width = pct+'%';
  document.getElementById('queteProgressText').textContent = next
    ? `${hero.trame.points} / ${next.seuil} points de sang avant : ${next.titre}`
    : `${hero.trame.points} points de sang — dernier chapitre atteint.`;

  const list = document.getElementById('compagnonList');
  if(!hero.compagnons.length){
    list.innerHTML = "<p class=\"compagnon-empty\">Yohan chemine seul, pour l'instant.</p>";
  } else {
    list.innerHTML = hero.compagnons.map(c=>`<div class="compagnon-card">
      <div class="cc-nom">${c.nom}</div>
      <div class="cc-desc">${c.desc}</div>
      <div class="cc-bonus">${c.bonusDesc}</div>
    </div>`).join('');
  }
}

/* ============================= ÉTAT GLOBAL ============================= */
let hero = {
  nom:"Yohan", niveau:3, xp:0,
  pvMax:42, pv:42, endMax:20, end:20, fatMax:100, fat:0,
  agi:12, vol:10, precision:5, defenseBase:12,
  paMax:3,
  talentPoints:3,
  unlocked: new Set(YOHAN_STARTING_POWERS),
  renaissanceUsed:false,
  pistolet1Charge:true, pistolet2Charge:true,
  or: 40,
  inventaire: [ {uid:"start_potion", itemId:"potion_vigueur", qty:2} ],
  equipement: { armure:null, accessoire:null },
  trame: { points:0, chapitre:0 },
  actionsTour: 3,
  suspicion: 5,
  compagnons: [],
};

/* ============================= NIVEAU & EXPÉRIENCE ============================= */
// Seuil d'XP cumulatif pour atteindre chaque niveau (index = niveau-1)
const XP_SEUILS = [0,0,20,45,75,110,150,195,245,300,360,425,495,570,650,735,825,920,1020,1125];
// Danger de bestiaire jugé équilibré pour un niveau donné (voir doc de référence)
function dangerRecommande(niveau){
  if(niveau<=4) return 1;
  if(niveau<=8) return 2;
  if(niveau<=12) return 3;
  if(niveau<=16) return 4;
  if(niveau<=19) return 5;
  return 6;
}
function bonusDeNiveau(niveau){ return Math.floor(niveau/2); }

function gainXP(n){
  hero.xp += n;
  let leveled = false;
  while(hero.niveau < 20 && hero.xp >= XP_SEUILS[hero.niveau]){
    hero.niveau++;
    hero.talentPoints += 1;
    leveled = true;
  }
  if(leveled){
    hero.pvMax = 42 + (hero.niveau-3)*5 + (hero.unlocked.has('resilience')?15:0);
    hero.pv = hero.pvMax; // Yohan se refait une santé complète en montant de niveau
  }
  return leveled;
}

let currentLieu = null;
let currentContract = null;
let contractState = null;
let combatReturnTo = null; // fonction à appeler après un combat

/* ============================= NAVIGATION ============================= */
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+id).classList.add('active');
  document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.toggle('active', b.dataset.screen===id));
  const cal = document.getElementById('calendarBar');
  if(cal.dataset.gameStarted==='1'){
    cal.style.display = (id==='combat') ? 'none' : 'flex';
  }
}

/* ============================= PROLOGUE ============================= */
let prologueIndex = 0;

function renderPrologue(){
  const slide = PROLOGUE_SLIDES[prologueIndex];
  document.getElementById('prologueText').innerHTML = `<span class="pt-eyebrow">${slide.eyebrow}</span>${slide.texte}`;
  const dots = document.getElementById('prologueDots');
  dots.innerHTML = PROLOGUE_SLIDES.map((_,i)=>`<span class="${i===prologueIndex?'on':''}"></span>`).join('');
  document.getElementById('prologueNextBtn').textContent = (prologueIndex===PROLOGUE_SLIDES.length-1) ? "Entrer en Vardhen" : "Poursuivre";
}

document.getElementById('prologueNextBtn').onclick = () => {
  if(prologueIndex < PROLOGUE_SLIDES.length-1){
    prologueIndex++;
    renderPrologue();
  } else {
    enterGame();
  }
};

/* ============================= CODEX ============================= */
function renderCodex(){
  const list = document.getElementById('codexList');
  list.innerHTML = CODEX_ENTRIES.map(e=>`<div class="codex-card">
    <div class="cx-nom">${e.nom}</div>
    <div class="cx-meta">${e.meta}</div>
    <div class="cx-desc">${e.desc}</div>
  </div>`).join('');
}

/* ============================= SAUVEGARDE ============================= */
const SAVE_KEY = "parias_vardhen_save_v1";

function serializeHero(){
  return JSON.stringify(hero, (k,v)=> v instanceof Set ? Array.from(v) : v);
}

function saveGame(silent){
  try{
    localStorage.setItem(SAVE_KEY, serializeHero());
    if(!silent) setSaveStatus("Partie sauvegardée.");
  } catch(e){ setSaveStatus("Échec de la sauvegarde : "+e.message); }
}

function loadHeroFromJSON(json){
  const obj = JSON.parse(json);
  obj.unlocked = new Set(obj.unlocked || YOHAN_STARTING_POWERS);
  obj.crisesDeclenchees = new Set(obj.crisesDeclenchees || []);
  hero = obj;
}

function hasLocalSave(){
  try{ return !!localStorage.getItem(SAVE_KEY); } catch(e){ return false; }
}

function setSaveStatus(msg){
  const el = document.getElementById('saveStatusText');
  if(el) el.textContent = msg;
}

function initSaveScreen(){
  const holder = document.getElementById('saveOptions');
  if(!holder) return;
  holder.innerHTML = '';
  if(hasLocalSave()){
    const btn = document.createElement('button');
    btn.className = 'ghost';
    btn.textContent = 'Charger la partie en cours';
    btn.onclick = () => {
      try{
        loadHeroFromJSON(localStorage.getItem(SAVE_KEY));
        enterGame();
      } catch(e){ alert("Sauvegarde illisible : "+e.message); }
    };
    holder.appendChild(btn);
  }
}

document.getElementById('btnSaveNow').onclick = () => saveGame(false);
document.getElementById('btnExportSave').onclick = () => {
  const blob = new Blob([serializeHero()], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'parias_vardhen_save.json';
  a.click();
  URL.revokeObjectURL(url);
  setSaveStatus("Fichier de sauvegarde exporté.");
};
document.getElementById('btnImportSave').onclick = () => document.getElementById('importFileInput').click();
document.getElementById('importFileInput').onchange = (e) => {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try{
      loadHeroFromJSON(reader.result);
      renderPersonnage(); renderMonde(); renderContracts(); renderCalendar(); renderChroniques(); renderQuete();
      setSaveStatus("Sauvegarde importée.");
    } catch(err){ setSaveStatus("Fichier invalide : "+err.message); }
  };
  reader.readAsText(file);
};

function enterGame(){
  document.getElementById('tabs').style.display='flex';
  const cal = document.getElementById('calendarBar');
  cal.style.display='flex';
  cal.dataset.gameStarted='1';
  renderPersonnage();
  renderMonde();
  renderContracts();
  renderCalendar();
  renderChroniques();
  renderQuete();
  showScreen('personnage');
}

initSaveScreen();

document.getElementById('btnStart').onclick = () => {
  prologueIndex = 0;
  renderPrologue();
  showScreen('prologue');
};
document.querySelectorAll('nav.tabs button').forEach(b=>{
  b.onclick = () => {
    showScreen(b.dataset.screen);
    if(b.dataset.screen==='chroniques') renderChroniques();
    if(b.dataset.screen==='quete') renderQuete();
    if(b.dataset.screen==='personnage') renderEquipement();
    if(b.dataset.screen==='codex') renderCodex();
  };
});
document.getElementById('btnBackMonde').onclick = () => showScreen('monde');
document.getElementById('btnBackContrats').onclick = () => showScreen('contrats');

/* ============================= TEMPS & CHRONIQUES ============================= */
hero.temps = { semaines: 0 };
hero.chroniques = [];
hero.tensions = {
  humains:12, parias:6, khesh:12, elfes:6, elfes_noirs:8, nains:8, peaux_vertes:14, hommes_betes:14
};
hero.crisesDeclenchees = new Set();

function dateFromSemaines(s){
  const saisonIdx = Math.floor(s/13)%4;
  const an = 3 + Math.floor(s/52);
  return { saison: SAISONS[saisonIdx], an, saisonIdx };
}

function renderCalendar(){
  const d = dateFromSemaines(hero.temps.semaines);
  document.getElementById('calendarText').innerHTML = `${d.saison}, An ${d.an} après la Purge <b>· semaine ${hero.temps.semaines % 13 + 1}/13</b>`;
  renderSuspicionBadge();
  renderApPips();
}

function advanceTime(semaines){
  const before = dateFromSemaines(hero.temps.semaines);
  hero.temps.semaines += semaines;
  const after = dateFromSemaines(hero.temps.semaines);
  if(after.saisonIdx !== before.saisonIdx || after.an !== before.an){
    const region = LOCATIONS[Math.floor(Math.random()*LOCATIONS.length)].nom;
    const line = NEWS_POOL[Math.floor(Math.random()*NEWS_POOL.length)](region);
    hero.chroniques.push({ date: `${after.saison}, An ${after.an}`, texte: line });
    progressTensions(after);
  }
  renderCalendar();
}

function progressTensions(dateInfo){
  const keys = Object.keys(hero.tensions);
  const nbTouches = 1 + Math.floor(Math.random()*2); // 1 ou 2 peuples avancent ce tick
  for(let i=0;i<nbTouches;i++){
    const k = keys[Math.floor(Math.random()*keys.length)];
    const before = hero.tensions[k];
    hero.tensions[k] = Math.min(100, hero.tensions[k] + 3 + Math.floor(Math.random()*8));
    if(before<90 && hero.tensions[k]>=90 && !hero.crisesDeclenchees.has(k)){
      hero.crisesDeclenchees.add(k);
      hero.chroniques.push({
        date: `${dateInfo.saison}, An ${dateInfo.an}`,
        texte: `⚠ ${PEUPLE_LABELS[k]} — La ${CRISE_NOMS[k]} menace désormais d'éclater ouvertement.`
      });
    }
  }
}

function tensionColor(v){
  if(v<50) return 'var(--onde-bright)';
  if(v<80) return 'var(--warn)';
  return 'var(--blood-bright)';
}

function renderTensions(){
  const grid = document.getElementById('tensionGrid');
  grid.innerHTML = '';
  Object.entries(hero.tensions).forEach(([k,v])=>{
    const div = document.createElement('div');
    div.className = 'tension-card';
    const color = tensionColor(v);
    const crise = v>=70 ? `<span class="tc-crise active">Vers : ${CRISE_NOMS[k]}</span>` : `<span class="tc-crise">Stable</span>`;
    div.innerHTML = `<div class="tc-nom">${PEUPLE_LABELS[k]}<b style="color:${color}">${v}</b></div>
      <div class="tension-bar"><div class="tension-fill" style="width:${v}%;background:${color};"></div></div>
      ${crise}`;
    grid.appendChild(div);
  });
}

function renderChroniques(){
  renderTensions();
  const list = document.getElementById('newsList');
  if(!hero.chroniques.length){
    list.innerHTML = `<p class="news-empty">Rien à signaler pour l'instant — le temps n'a pas encore assez avancé.</p>`;
    return;
  }
  list.innerHTML = hero.chroniques.map(n=>`<div class="news-item"><span class="ni-date">${n.date}</span>${n.texte}</div>`).join('');
}

/* ============================= PERSONNAGE / TALENTS ============================= */
function applyPassiveEffects(){
  const basePv = 42 + (hero.niveau-3)*5; // 42 au niveau 3, +5/niveau au-delà
  hero.pvMax = basePv;
  hero.renaissanceUsed = false;
  if(hero.unlocked.has('resilience')) hero.pvMax += 15;
  hero.pv = Math.min(hero.pv, hero.pvMax);
}

function renderPersonnage(){
  applyPassiveEffects();
  document.getElementById('charLvl').textContent = hero.niveau;
  document.getElementById('charPvText').textContent = `${hero.pv} / ${hero.pvMax}`;
  document.getElementById('charPvBar').style.width = (100*hero.pv/hero.pvMax)+'%';
  document.getElementById('charFatText').textContent = `0 / ${hero.fatMax}`;
  document.getElementById('charFatBar').style.width = '0%';
  const xpSeuil = hero.niveau<20 ? XP_SEUILS[hero.niveau] : hero.xp;
  document.getElementById('charStatsText').textContent = `Préc +${hero.precision} (+${bonusDeNiveau(hero.niveau)} niv.) / VOL ${hero.vol} · XP ${hero.xp}/${xpSeuil} · Danger recommandé : ${dangerRecommande(hero.niveau)}`;
  document.getElementById('talentPointsText').textContent = hero.talentPoints;
  renderEquipement();

  const grid = document.getElementById('treeGrid');
  grid.innerHTML = '';
  Object.entries(TREE).forEach(([key, branch])=>{
    const col = document.createElement('div');
    col.className = 'branch br-'+key;
    col.innerHTML = `<h4>${branch.label}</h4>`;
    branch.nodes.forEach((n,i)=>{
      const unlocked = hero.unlocked.has(n.id);
      const prereqOk = i===0 || hero.unlocked.has(branch.nodes[i-1].id);
      const cost = n.tier;
      const affordable = !unlocked && prereqOk && hero.talentPoints>=cost;
      const div = document.createElement('div');
      div.className = 'talent-node '+(unlocked?'unlocked':(prereqOk?'affordable':'locked'));
      div.innerHTML = `<div class="tn-name">${n.nom}</div><div class="tn-meta">Tier ${n.tier} · ${unlocked?'Acquis':(cost+' pt'+(cost>1?'s':''))}${n.passive?' · Passif':''}</div>`;
      if(affordable){
        div.onclick = () => {
          hero.talentPoints -= cost;
          hero.unlocked.add(n.id);
          renderPersonnage();
        };
      }
      col.appendChild(div);
    });
    grid.appendChild(col);
  });
}

function itemById(id){ return ITEM_POOL.find(i=>i.id===id); }

function renderEquipement(){
  document.getElementById('charOrText').textContent = hero.or;

  const slots = document.getElementById('equipSlots');
  slots.innerHTML = '';
  [["armure","Armure"],["accessoire","Accessoire"]].forEach(([slot,label])=>{
    const eq = hero.equipement[slot] ? itemById(hero.equipement[slot]) : null;
    const div = document.createElement('div');
    div.className = 'equip-slot'+(eq?' filled':'');
    div.innerHTML = eq
      ? `<span class="es-label">${label}</span><span class="es-nom">${eq.nom}</span><div class="es-desc">${eq.desc}</div>`
      : `<span class="es-label">${label}</span><span class="es-desc" style="font-style:italic;">Vide</span>`;
    slots.appendChild(div);
  });

  const inv = document.getElementById('invList');
  inv.innerHTML = '';
  if(!hero.inventaire.length){
    inv.innerHTML = '<p class="inv-empty">Le sac de Yohan est vide.</p>';
    return;
  }
  hero.inventaire.forEach(entry=>{
    const item = itemById(entry.itemId);
    if(!item) return;
    const row = document.createElement('div');
    row.className = 'inv-item';
    const isEquipped = (item.type==='armure' && hero.equipement.armure===item.id) || (item.type==='accessoire' && hero.equipement.accessoire===item.id);
    row.innerHTML = `<div><div class="ii-nom">${item.nom}${entry.qty>1?' ×'+entry.qty:''}</div><div class="ii-desc">${item.desc}</div></div>`;
    if(item.type==='armure' || item.type==='accessoire'){
      const btn = document.createElement('button');
      btn.className = 'ghost';
      btn.textContent = isEquipped ? 'Retirer' : 'Équiper';
      btn.onclick = () => {
        hero.equipement[item.type] = isEquipped ? null : item.id;
        renderEquipement();
      };
      row.appendChild(btn);
    } else {
      const span = document.createElement('span');
      span.className = 'cr-badge';
      span.textContent = 'Consommable';
      row.appendChild(span);
    }
    inv.appendChild(row);
  });

  renderShop();
}

function renderShop(){
  const shop = document.getElementById('shopList');
  if(!shop) return;
  shop.innerHTML = '';
  ITEM_POOL.forEach(item=>{
    const row = document.createElement('div');
    row.className = 'inv-item';
    row.innerHTML = `<div><div class="ii-nom">${item.nom} — ${item.prix} or</div><div class="ii-desc">${item.desc}</div></div>`;
    const btn = document.createElement('button');
    btn.className = 'ghost';
    btn.textContent = 'Acheter';
    btn.disabled = hero.or < item.prix;
    btn.onclick = () => {
      if(hero.or < item.prix) return;
      hero.or -= item.prix;
      const existing = hero.inventaire.find(e=>e.itemId===item.id);
      if(existing) existing.qty++;
      else hero.inventaire.push({uid: item.id+'_'+Date.now(), itemId:item.id, qty:1});
      saveGame(true);
      renderEquipement();
    };
    row.appendChild(btn);
    shop.appendChild(row);
  });
}

function grantLoot(){
  if(Math.random() < 0.5){
    const item = ITEM_POOL[Math.floor(Math.random()*ITEM_POOL.length)];
    const existing = hero.inventaire.find(e=>e.itemId===item.id);
    if(existing) existing.qty++;
    else hero.inventaire.push({uid: item.id+'_'+Date.now(), itemId:item.id, qty:1});
    return item;
  }
  return null;
}

/* ============================= MONDE (carte interactive) ============================= */
function dangerColor(l){
  const m = l.danger_range.max;
  if(m<=2) return 'var(--onde-bright)';
  if(m===3) return 'var(--gold)';
  if(m===4) return 'var(--warn)';
  return 'var(--blood-bright)';
}

function renderMonde(){
  const holder = document.getElementById('mapPins');
  holder.innerHTML = '';
  LOCATIONS.forEach(l=>{
    const c = LOC_COORDS[l.id] || {x:50,y:50};
    const color = dangerColor(l);
    const pin = document.createElement('div');
    pin.className = 'map-pin';
    pin.style.left = c.x+'%';
    pin.style.top = c.y+'%';
    pin.style.background = color;
    pin.style.color = color;
    pin.title = l.nom;
    pin.innerHTML = `<span class="pin-label">${l.nom}</span>`;
    pin.onclick = () => openLieu(l);
    holder.appendChild(pin);
  });
}

function openLieu(l){
  currentLieu = l;
  hero.position = l.id;
  document.getElementById('lieuNom').textContent = l.nom;
  document.getElementById('lieuDesc').textContent = l.description_courte+" — Peuple dominant : "+l.peuple_dominant+".";
  showScreen('lieu');
}

/* ============================= SUSPICION (pression de Paria traqué) ============================= */
function suspicionInfo(v){
  if(v<30) return {label:"Discret", cls:""};
  if(v<60) return {label:"Remarqué", cls:"mid"};
  if(v<85) return {label:"Traqué", cls:"high"};
  return {label:"Chasse ouverte", cls:"critical"};
}
function adjustSuspicion(n){
  hero.suspicion = Math.max(0, Math.min(100, hero.suspicion + n));
  renderCalendar();
}
function renderSuspicionBadge(){
  const el = document.getElementById('suspicionBadge');
  if(!el) return;
  const info = suspicionInfo(hero.suspicion);
  el.textContent = `${info.label} (${hero.suspicion})`;
  el.className = 'suspicion-badge '+info.cls;
}

function generateBountyHunter(){
  const tier = dangerRecommande(hero.niveau);
  return {
    id:"CHASSEUR_PRIME", nom:"Chasseur de primes", danger: Math.min(6, tier+1),
    pv: 55 + tier*8, defense: 15, pa_par_tour: 4, precision: 7 + Math.floor(tier/2),
    attaque_base:{ degats_base: 10 + tier, de_variance:"1d10" },
    capacites_speciales:[{ nom:"Filet lesté", effet:"Immobilise brièvement Yohan avant de frapper (effet narratif simplifié)." }],
  };
}

/* ============================= BLOCS NARRATIFS ============================= */
function suspicionTier(v){ if(v<30) return 'low'; if(v<60) return 'mid'; if(v<85) return 'high'; return 'crit'; }

function pickVariant(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function buildNarrativeBlock(ev, lieu){
  const introPool = FAMILLE_INTRO[ev.famille] || ["Quelque chose retient l'attention de Yohan."];
  const outroPool = SUSPICION_OUTRO[suspicionTier(hero.suspicion)];
  const intro = pickVariant(introPool);
  const outro = pickVariant(outroPool);
  const lieuLine = lieu ? `<p class="narrative" style="font-size:14px;color:var(--parchment-dim);font-style:italic;">${lieu.description_courte}</p>` : '';
  return `<p class="narrative">${intro}</p>${lieuLine}<p class="narrative">${ev.texte}</p><p class="narrative" style="color:var(--parchment-dim);font-style:italic;font-size:14.5px;">${outro}</p>`;
}

/* ============================= BOUCLE DE TOUR : 3 ACTIONS ============================= */
document.getElementById('btnActExplorer').onclick = () => useAction('explorer');
document.getElementById('btnActContrats').onclick = () => useAction('contrats');
document.getElementById('btnActBoutique').onclick = () => useAction('boutique');
document.getElementById('btnActRepos').onclick = () => useAction('repos');
document.getElementById('btnEndTurn').onclick = () => endTurnMeta();

function renderApPips(){
  const holder = document.getElementById('apPips');
  if(!holder) return;
  holder.innerHTML = '';
  for(let i=0;i<3;i++){
    const p = document.createElement('div');
    p.className = 'pip'+(i<hero.actionsTour?' filled':'');
    holder.appendChild(p);
  }
  ['btnActExplorer','btnActContrats','btnActBoutique','btnActRepos'].forEach(id=>{
    const b = document.getElementById(id);
    if(b) b.disabled = hero.actionsTour<=0;
  });
}

function useAction(kind){
  if(hero.actionsTour<=0) return;
  hero.actionsTour--;
  renderCalendar();
  if(kind==='explorer') triggerExploration();
  else if(kind==='contrats'){ showScreen('contrats'); renderContracts(); }
  else if(kind==='boutique'){ showScreen('personnage'); renderEquipement(); }
  else if(kind==='repos') doRepos();
  if(hero.actionsTour<=0) endTurnMeta();
}

function doRepos(){
  hero.fat = Math.max(0, hero.fat-20);
  hero.pv = Math.min(hero.pvMax, hero.pv + Math.round(hero.pvMax*0.1));
  adjustSuspicion(-8);
  const box = document.getElementById('eventModalBox');
  box.innerHTML = `<h3>Un moment de répit</h3>
    <p class="narrative">${pickVariant(["Yohan trouve un coin tranquille — une arrière-cour, une chapelle vide, un simple recoin loin des regards — et laisse son corps souffler.", "Le temps d'une pause, Yohan redevient simplement un homme fatigué, pas un Paria traqué.", "Il ne se passe rien de notable. C'est exactement ce dont Yohan avait besoin."])}</p>
    <div class="reward-tags"><span class="reward-tag">−20 Fatigue</span><span class="reward-tag neg" style="border-color:var(--onde-bright);color:var(--onde-bright);">−8 Suspicion</span></div>
    <div style="margin-top:16px;text-align:right;"><button class="primary" id="closeRepBtn">Continuer</button></div>`;
  document.getElementById('eventModal').style.display='flex';
  document.getElementById('closeRepBtn').onclick = () => { renderPersonnage(); closeEventModal(); saveGame(true); };
}

function endTurnMeta(){
  const lieu = LOCATIONS.find(l=>l.id===hero.position) || null;
  advanceTime(2 + Math.floor(Math.random()*5)); // 2 à 6 semaines
  adjustSuspicion(-1); // le temps qui passe aide un peu à se faire oublier
  hero.actionsTour = 3;

  const karlsberg = lieu && (lieu.id==='LOC_001' || lieu.id==='LOC_014');
  gainPointsSang(karlsberg ? 5 : 1);
  saveGame(true);
  renderCalendar();
}

function triggerExploration(){
  const lieu = LOCATIONS.find(l=>l.id===hero.position) || null;

  // Sous forte suspicion, la traque peut se manifester directement
  if(hero.suspicion>=60 && Math.random()<0.25){
    const box = document.getElementById('eventModalBox');
    box.innerHTML = `<span class="event-tag">Traque</span><h3>Ils l'ont retrouvé</h3>
      <p class="narrative">${pickVariant(["Une silhouette encapuchonnée se détache de la foule, trop précise dans ses mouvements pour être un simple passant. Un chasseur de primes — et il n'est pas venu discuter.", "Le bruit d'une arme qu'on arme résonne dans le silence. Quelqu'un, enfin, a fini par mettre un nom sur le visage caché de Yohan.", "Ce n'est pas une coïncidence : le chasseur qui lui barre la route connaît exactement qui il traque."])}</p>
      <div style="margin-top:16px;text-align:right;"><button class="primary" id="bhFightBtn">Affronter</button></div>`;
    document.getElementById('eventModal').style.display='flex';
    document.getElementById('bhFightBtn').onclick = () => {
      closeEventModal();
      combatReturnTo = () => { if(lieu) openLieu(lieu); else showScreen('monde'); };
      startCombat(generateBountyHunter());
    };
    return;
  }

  const pool = lieu ? EVENTS.filter(e => lieu.familles_evenements_compatibles.includes(e.famille)) : EVENTS;
  const list = pool.length ? pool : EVENTS;
  const ev = list[Math.floor(Math.random()*list.length)];
  openEventModal(ev, lieu);
}

function openCalmModal(){
  const box = document.getElementById('eventModalBox');
  box.innerHTML = `<h3>Le temps passe</h3><p style="color:var(--parchment-dim);font-style:italic;">${CALME_TEXTES[Math.floor(Math.random()*CALME_TEXTES.length)]}</p>
    <div style="margin-top:16px;text-align:right;"><button class="primary" id="closeCalmBtn">Continuer</button></div>`;
  document.getElementById('eventModal').style.display='flex';
  document.getElementById('closeCalmBtn').onclick = closeEventModal;
}

function closeEventModal(){
  document.getElementById('eventModal').style.display='none';
}

/* ============================= RÉSOLUTION DES ÉVÉNEMENTS ============================= */
function classifyChoice(label){
  const l = label.toLowerCase();
  if(/enquêt|examin|inspect|chercher|questionn|observ|analys/.test(l)) return 'enquete';
  if(/négoci|marchand|convaincre|persuad|parle|discut|propos/.test(l)) return 'negociation';
  if(/évit|fuir|ignor|s'éloign|reculer|renonc|laisse/.test(l)) return 'evitement';
  if(/aid|secour|protég|sauv|défend/.test(l)) return 'aide';
  if(/menac|intimid|forcer|imposer/.test(l)) return 'intimidation';
  return 'generique';
}

function resolveEventChoice(label, ev){
  const cat = classifyChoice(label);
  const mult = RARETE_MULT[ev.rarete] || 1;
  let statUsed, statNom, dc, orGain=0, xpGain=0, fatCost=0, pvCost=0;

  switch(cat){
    case 'enquete':      statUsed=hero.precision; statNom='Précision'; dc=11; orGain=Math.round(8*mult);  xpGain=Math.round(6*mult); break;
    case 'negociation':  statUsed=hero.precision; statNom='Précision'; dc=12; orGain=Math.round(15*mult); break;
    case 'evitement':    statUsed=hero.agi;       statNom='Agilité';   dc=9;  fatCost=5; break;
    case 'aide':         statUsed=hero.vol;       statNom='Volonté';   dc=12; orGain=Math.round(5*mult);  xpGain=Math.round(8*mult); break;
    case 'intimidation': statUsed=hero.precision; statNom='Précision'; dc=13; orGain=Math.round(10*mult); pvCost=Math.round(3*mult); break;
    default:              statUsed=hero.precision; statNom='Précision'; dc=11; orGain=Math.round(6*mult);  xpGain=Math.round(4*mult);
  }

  const roll = rollDie(20);
  const total = roll + statUsed;
  const success = total >= dc;
  const variants = NARRATIVE_VARIANTS[cat] || NARRATIVE_VARIANTS.generique;
  const narrative = pickVariant(success ? variants.success : variants.fail);

  if(cat==='intimidation') adjustSuspicion(3); // se faire remarquer, réussite ou non
  if(cat==='evitement' && success) adjustSuspicion(-2);

  let html = `<p class="narrative ${success?'success':'fail'}">${narrative}</p>`;

  const tags = [];
  if(success){
    if(orGain){ hero.or += orGain; tags.push(`<span class="reward-tag">+${orGain} or</span>`); }
    if(xpGain){ gainXP(xpGain); tags.push(`<span class="reward-tag">+${xpGain} XP</span>`); }
  } else {
    if(fatCost){ hero.fat = Math.min(hero.fatMax, hero.fat+fatCost); tags.push(`<span class="reward-tag neg">+${fatCost} Fatigue</span>`); }
    if(pvCost){ hero.pv = Math.max(1, hero.pv-pvCost); tags.push(`<span class="reward-tag neg">−${pvCost} PV</span>`); }
  }
  if(tags.length) html += `<div class="reward-tags">${tags.join('')}</div>`;
  html += `<p class="mech-line">Jet de ${statNom} : ${roll}+${statUsed} = ${total} (seuil ${dc})</p>`;
  return html;
}

function openEventModal(ev, lieu){
  const box = document.getElementById('eventModalBox');
  box.innerHTML = `<span class="event-tag">${ev.famille} · ${ev.rarete}${lieu?' · '+lieu.nom:''}</span>
    <h3>${ev.titre}</h3>
    ${buildNarrativeBlock(ev, lieu)}
    <div class="choix-list" id="choixList"></div>`;
  document.getElementById('eventModal').style.display='flex';
  const cl = document.getElementById('choixList');
  ev.choix.forEach((label, idx)=>{
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.onclick = () => {
      // On se fie à l'indicateur peut_declencher_affrontement (ev.combat), plus fiable
      // que la famille d'issue seule (certains "traque" ne combattent pas, certains
      // "escorte"/"enquête" le peuvent).
      if(idx===0 && ev.combat){
        const zoneRef = lieu || {danger_range:{min:1,max:3}};
        const enemy = pickEnemyForZone(zoneRef, ev.rarete);
        closeEventModal();
        combatReturnTo = () => { if(lieu) openLieu(lieu); else showScreen('monde'); };
        startCombat(enemy);
      } else {
        const resultHtml = resolveEventChoice(label, ev);
        cl.innerHTML = `<p style="color:var(--parchment-dim);font-style:italic;font-size:13.5px;margin-top:10px;">« ${label} »</p>${resultHtml}
          <div style="margin-top:14px;text-align:right;"><button class="primary" id="closeEvBtn">Continuer</button></div>`;
        document.getElementById('closeEvBtn').onclick = () => { renderPersonnage(); closeEventModal(); saveGame(true); };
      }
    };
    cl.appendChild(btn);
  });
}

function rarityToDangerRange(rarete, base){
  // Ajuste la fourchette de Danger de la zone selon la rareté de l'événement
  if(rarete==="commun") return [base[0], Math.max(base[0],base[0]+1)];
  if(rarete==="inhabituel") return [base[0], Math.min(6,base[1])];
  if(rarete==="rare") return [Math.min(6,base[0]+1), Math.min(6,base[1]+1)];
  return [Math.min(6,base[1]), Math.min(6,base[1]+2)]; // épique
}

function pickEnemyForZone(lieu, rarete){
  const [lo,hi] = rarityToDangerRange(rarete, [lieu.danger_range.min, lieu.danger_range.max]);
  // Les rencontres aléatoires (passer le tour) restent bornées au Danger raisonnable pour le
  // niveau de Yohan (+1 de marge) — les contrats, choisis consciemment et prévisualisés, n'ont
  // pas cette limite.
  const plafondNiveau = dangerRecommande(hero.niveau) + 1;
  const hiAjuste = Math.min(hi, plafondNiveau);
  let pool = BESTIARY_FULL.filter(b=>b.danger>=lo && b.danger<=hiAjuste);
  if(!pool.length) pool = BESTIARY_FULL.filter(b=>b.danger<=hiAjuste);
  if(!pool.length) pool = BESTIARY_FULL.filter(b=>b.danger<=hi);
  if(!pool.length) pool = BESTIARY_FULL;
  return pool[Math.floor(Math.random()*pool.length)];
}

/* ============================= CONTRATS ============================= */
function renderContracts(){
  const list = document.getElementById('contractList');
  list.innerHTML = '';
  CONTRACTS.forEach(c=>{
    const row = document.createElement('div');
    row.className = 'contract-row';
    row.innerHTML = `<div><div class="cr-titre">${c.titre}</div>
      <div class="cr-meta">${c.commanditaire} · ${c.lieu} · ${c.type} · ${c.danger}</div></div>
      <span class="cr-badge ${c.prix_paria?'paria':''}">${c.prix_paria?'Prix Paria':c.or+' or'}</span>`;
    row.onclick = () => openContract(c);
    list.appendChild(row);
  });
}

function fillTemplate(str, c){
  return str.replace(/\{titre\}/g, c.titre).replace(/\{lieu\}/g, c.lieu).replace(/\{commanditaire\}/g, c.commanditaire);
}

function contractNarrative(c, step){
  const qualif = DANGER_QUALIF[c.danger] || "une affaire à ne pas prendre à la légère";
  const enjeu = TYPE_ENJEU[c.type] || "mener cette mission à bien";
  const fill = (str) => fillTemplate(str, c).replace(/\{qualif\}/g, qualif).replace(/\{enjeu\}/g, enjeu);
  switch(step){
    case "Audience":
      return `<p><b>${c.commanditaire}</b> reçoit Yohan en personne, sans intermédiaire — signe que l'affaire compte réellement pour la maison. L'affaire porte déjà un nom, murmuré à mots couverts dans certains cercles : <b>${c.titre}</b>. Ce que l'on en dit suffit à comprendre qu'il s'agit de ${qualif}.</p><p>${c.pitch}</p><p style="color:var(--parchment-dim);font-style:italic;">Au fond, il ne s'agit que de ${enjeu} — mais Yohan sait mieux que quiconque que ce genre de mission cache toujours plus qu'il n'y paraît.</p>`;
    case "Préparation": return `<p>${fill(pickVariant(FRAME_PREP))}</p>`;
    case "Approche":    return `<p>${fill(pickVariant(FRAME_APPROCHE))}</p>`;
    case "Résolution":  return `<p>${fill(pickVariant(FRAME_RESOLUTION))}</p>`;
    default: return '';
  }
}

function flavorFor(type, key, fallback){
  return (CONTRACT_FLAVOR[type] && CONTRACT_FLAVOR[type][key]) || fallback;
}

function openContract(c){
  currentContract = c;
  contractState = {stepIndex:0, prixChoisi:null, aborted:false, complication:null, mods:{orMult:1, defBonus:0, enemyPvMult:1, skipCombat:false, infoGained:false}};
  document.getElementById('ctrTitre').textContent = c.titre;
  showScreen('contrat');
  renderContractStep();
}

function renderStepTrack(){
  const track = document.getElementById('stepTrack');
  track.innerHTML = '';
  STEP_NAMES.forEach((n,i)=>{
    const span = document.createElement('span');
    span.className = 'step-pill '+(i<contractState.stepIndex?'done':(i===contractState.stepIndex?'current':''));
    span.textContent = n;
    track.appendChild(span);
  });
}

function goNextStep(){ contractState.stepIndex++; renderContractStep(); }

function renderChoiceButtons(container, choices){
  const holder = document.createElement('div');
  holder.className = 'choix-list';
  choices.forEach(ch=>{
    const b = document.createElement('button');
    b.textContent = ch.label;
    b.onclick = ch.onClick;
    holder.appendChild(b);
  });
  container.appendChild(holder);
}

function renderContractStep(){
  renderStepTrack();
  const c = currentContract;
  const body = document.getElementById('ctrBody');
  const step = STEP_NAMES[contractState.stepIndex];

  if(step==="Audience"){
    body.innerHTML = `${contractNarrative(c,'Audience')}<div id="audienceExtra"></div>`;
    const extra = document.getElementById('audienceExtra');

    if(c.prix_paria){
      const p = c.prix_paria.noble_proposee;
      extra.innerHTML = `<h3>Négociation du Prix du Paria</h3>
        <p style="color:var(--parchment-dim);font-size:13.5px;">La maison propose, selon la coutume ancestrale : l'Or, ou ${p?p.nom+' ('+p.maison+')':'une noble consentante'} — jamais l'un sans le consentement établi.</p>
        <div class="prix-choices" id="prixChoices"></div>`;
      const opts = [
        {id:"OR", label:"Réclamer l'Or seul", sub:c.or+" pièces d'or"},
        {id:"NOBLE_CONSENTANTE", label:"Réclamer "+(p?p.nom:"la noble consentante"), sub:"Relation persistante possible"},
        {id:"OR_ET_NOBLE_CONSENTANTE", label:"Réclamer le Prix complet", sub:"Or + relation persistante"},
        {id:"NEGOCIER", label:"Négocier les termes", sub:"Issue incertaine"},
        {id:"REFUSER", label:"Refuser le contrat", sub:"Met fin à la mission"},
      ];
      const holder = document.getElementById('prixChoices');
      opts.forEach(o=>{
        const b = document.createElement('button');
        b.innerHTML = `${o.label}<small>${o.sub}</small>`;
        b.onclick = () => {
          contractState.prixChoisi = o.id;
          if(o.id==="REFUSER"){
            body.innerHTML += `<p style="color:var(--blood-bright);margin-top:12px;">Yohan décline. Le contrat est clos sans suite.</p>`;
          } else if(o.id==="NEGOCIER"){
            const success = Math.random()<0.5;
            contractState.mods.orMult = success ? 1.3 : 0.85;
            body.innerHTML += `<p style="margin-top:12px;color:${success?'var(--onde-bright)':'var(--warn)'};">${success?"La négociation porte ses fruits — de meilleures conditions sont obtenues.":"La négociation tourne court — la maison concède un peu moins que prévu."}</p>
              <div style="margin-top:10px;text-align:right;"><button class="primary" id="audNextBtn">Poursuivre</button></div>`;
            document.getElementById('audNextBtn').onclick = goNextStep;
          } else {
            goNextStep();
          }
        };
        holder.appendChild(b);
      });
    } else {
      renderChoiceButtons(extra, [
        {label:"Accepter directement", onClick:()=>goNextStep()},
        {label:"Négocier de meilleures conditions", onClick:()=>{
          const success = Math.random()<0.5;
          contractState.mods.orMult = success ? 1.25 : 1;
          extra.innerHTML = `<p style="color:${success?'var(--onde-bright)':'var(--parchment-dim)'};margin-top:10px;">${success?"Le commanditaire cède — le paiement sera meilleur.":"Le commanditaire ne bouge pas d'un pouce."}</p>
            <div style="margin-top:10px;text-align:right;"><button class="primary" id="audNextBtn">Poursuivre</button></div>`;
          document.getElementById('audNextBtn').onclick = goNextStep;
        }},
        {label:"Poser des questions sur la menace", onClick:()=>{
          contractState.mods.infoGained = true;
          extra.innerHTML = `<p style="color:var(--onde-bright);margin-top:10px;">${c.commanditaire} partage ce qu'il sait — Yohan abordera la suite mieux informé.</p>
            <div style="margin-top:10px;text-align:right;"><button class="primary" id="audNextBtn">Poursuivre</button></div>`;
          document.getElementById('audNextBtn').onclick = goNextStep;
        }},
      ]);
    }
    return;
  }

  if(step==="Préparation"){
    body.innerHTML = `${contractNarrative(c,'Préparation')}<div id="prepExtra"></div>`;
    const extra = document.getElementById('prepExtra');
    renderChoiceButtons(extra, [
      {label:"S'équiper avec soin", onClick:()=>{
        contractState.mods.defBonus = 2;
        advanceTime(1);
        extra.innerHTML = `<p style="color:var(--onde-bright);margin-top:10px;">${flavorFor(c.type,'equip',"Yohan prend le temps de s'équiper soigneusement.")} (+2 Défense pour cette mission)</p>
          <div style="margin-top:10px;text-align:right;"><button class="primary" id="prepNextBtn">Poursuivre</button></div>`;
        document.getElementById('prepNextBtn').onclick = goNextStep;
      }},
      {label:"Partir sans attendre", onClick:()=>goNextStep()},
      {label:"Enquêter sur la cible", onClick:()=>{
        contractState.mods.infoGained = true;
        advanceTime(1);
        extra.innerHTML = `<p style="color:var(--onde-bright);margin-top:10px;">${flavorFor(c.type,'enquete',"Quelques recoupements permettent à Yohan d'en apprendre plus sur ce qui l'attend.")}</p>
          <div style="margin-top:10px;text-align:right;"><button class="primary" id="prepNextBtn">Poursuivre</button></div>`;
        document.getElementById('prepNextBtn').onclick = goNextStep;
      }},
    ]);
    return;
  }

  if(step==="Approche"){
    if(!contractState.complication && c.complications && c.complications.length){
      contractState.complication = c.complications[Math.floor(Math.random()*c.complications.length)];
    }
    const compHtml = contractState.complication
      ? `<p style="margin-top:10px;color:var(--warn);"><b>Complication :</b> ${contractState.complication}.</p>`
      : '';
    body.innerHTML = `${contractNarrative(c,'Approche')}${compHtml}<div id="approcheExtra"></div>`;
    const extra = document.getElementById('approcheExtra');
    const [, hi] = DANGER_MAP[c.danger] || [1,2];
    const difficulte = 9 + hi*2;
    renderChoiceButtons(extra, [
      {label:"Affronter directement", onClick:()=>goNextStep()},
      {label:"Contourner discrètement", onClick:()=>{
        const roll = Math.floor(Math.random()*20)+1;
        const total = roll + hero.agi + (contractState.mods.infoGained?2:0);
        const success = total>=difficulte;
        const stealthCompletable = ['sauvetage','récupération','enquête'].includes(c.type);
        let narr;
        if(success && stealthCompletable){
          contractState.mods.skipCombat = true;
          narr = pickVariant(["Yohan se déplace sans un bruit, lisant chaque ombre avant de s'y engager — personne ne le voit passer.", "Chaque pas est calculé. Yohan longe les murs, évite la lumière, et atteint son objectif sans être repéré.", "La discrétion paie : Yohan se glisse jusqu'à ce qu'il est venu chercher, sans un regard posé sur lui."]);
        } else if(success){
          // Chasse/traque/guerre : contourner ne remplace pas l'objectif (éliminer la menace),
          // mais donne un avantage tactique réel avant l'affrontement, désormais inévitable.
          contractState.mods.enemyPvMult = Math.min(contractState.mods.enemyPvMult, 0.7);
          narr = pickVariant([
            "Yohan se déplace sans un bruit et prend position — mais se faufiler ne suffira pas ici : la menace devra de toute façon être affrontée. Au moins Yohan aura-t-il l'avantage de la surprise.",
            "La discrétion de Yohan ne change rien à l'objectif de la mission — mais elle lui offre une ouverture nette pour frapper le premier coup.",
            "Se faufiler permet à Yohan d'observer sans être vu, et de choisir exactement où porter le premier coup. Le reste, il faudra le régler à la dure.",
          ]);
        } else {
          narr = pickVariant(["Un faux pas, un bruit de trop — Yohan est repéré avant d'avoir pu se mettre en position.", "La discrétion se brise net : quelqu'un a remarqué le mouvement, et il n'y a plus de retour possible.", "Yohan pensait pouvoir se faufiler ; ce n'est manifestement pas le cas aujourd'hui."]);
        }
        extra.innerHTML = `<p class="narrative ${success?'success':'fail'}">${narr}</p>
          <p class="mech-line">Jet d'Agilité : ${roll}+${hero.agi}${contractState.mods.infoGained?'+2 (info)':''} = ${total} (seuil ${difficulte})</p>
          <div style="margin-top:12px;text-align:right;"><button class="primary" id="apprNextBtn">Poursuivre</button></div>`;
        document.getElementById('apprNextBtn').onclick = goNextStep;
      }},
      {label:"Négocier ou ruser", onClick:()=>{
        const roll = Math.floor(Math.random()*20)+1;
        const total = roll + hero.precision + (contractState.mods.infoGained?2:0);
        const success = total>=difficulte;
        if(success) contractState.mods.enemyPvMult = 0.75;
        const narr = success
          ? pickVariant(["Un mot bien placé, une ruse discrète, et Yohan prend l'ascendant avant même que l'affrontement ne commence.", "Yohan manipule la situation à son avantage — l'adversaire, sans le savoir, entre déjà affaibli dans ce qui va suivre.", "La ruse fonctionne : Yohan a semé le doute ou le désordre juste assez pour que la suite lui soit favorable."])
          : pickVariant(["La ruse de Yohan tombe à plat — en face, on n'est pas dupe.", "Rien à faire : l'adversaire reste sur ses gardes, imperméable à toute manœuvre.", "Yohan tente sa chance, mais la situation ne se laisse pas manipuler si facilement."]);
        extra.innerHTML = `<p class="narrative ${success?'success':'fail'}">${narr}</p>
          <p class="mech-line">Jet de Précision : ${roll}+${hero.precision}${contractState.mods.infoGained?'+2 (info)':''} = ${total} (seuil ${difficulte})</p>
          <div style="margin-top:12px;text-align:right;"><button class="primary" id="apprNextBtn">Poursuivre</button></div>`;
        document.getElementById('apprNextBtn').onclick = goNextStep;
      }},
    ]);
    return;
  }

  if(step==="Résolution"){
    const compRef = contractState.complication ? `<p style="color:var(--parchment-dim);font-style:italic;">Après avoir géré « ${contractState.complication} », Yohan reste concentré sur l'essentiel.</p>` : '';

    if(contractState.mods.skipCombat){
      body.innerHTML = `<p>${compRef}Yohan se faufile jusqu'au terme de « ${c.titre} » sans avoir à croiser le fer.</p>
        <div style="margin-top:14px;"><button class="primary" id="nextStepBtn">Voir le retour</button></div>`;
      contractState.resolutionSuccess = true;
      document.getElementById('nextStepBtn').onclick = goNextStep;
      return;
    }

    if(c.type==="enquête"){
      const [, hi] = DANGER_MAP[c.danger] || [1,2];
      const difficulte = 10 + hi*2;
      const roll = Math.floor(Math.random()*20)+1;
      const bonusInfo = contractState.mods.infoGained ? 2 : 0;
      const total = roll + hero.precision + bonusInfo;
      const success = total>=difficulte;
      body.innerHTML = `${compRef}${contractNarrative(c,'Résolution')}
        <p style="margin-top:10px;">Jet d'enquête : ${roll} + ${hero.precision}${bonusInfo?'+2 (info)':''} = <b>${total}</b> vs difficulté ${difficulte} → <b style="color:${success?'var(--onde-bright)':'var(--blood-bright)'}">${success?'Succès':'Échec'}</b></p>
        <div style="margin-top:14px;"><button class="primary" id="nextStepBtn">Voir le retour</button></div>`;
      contractState.resolutionSuccess = success;
      document.getElementById('nextStepBtn').onclick = goNextStep;
    } else {
      const [lo,hi] = DANGER_MAP[c.danger] || [1,2];
      let pool = BESTIARY_FULL.filter(b=>b.danger>=lo && b.danger<=hi);
      let forced = BESTIARY_FULL.find(b => c.titre.toLowerCase().includes(b.nom.toLowerCase().split(' ')[0].toLowerCase()));
      let enemy = JSON.parse(JSON.stringify(forced || (pool.length? pool[Math.floor(Math.random()*pool.length)] : BESTIARY_FULL[0])));
      if(contractState.mods.enemyPvMult !== 1) enemy.pv = Math.max(1, Math.round(enemy.pv * contractState.mods.enemyPvMult));
      const recommande = dangerRecommande(hero.niveau);
      const warnHtml = enemy.danger > recommande+1
        ? `<p style="margin-top:8px;color:var(--blood-bright);">⚠ Cette menace (Danger ${enemy.danger}) dépasse nettement ce que Yohan affronte habituellement à son niveau (${hero.niveau}, Danger recommandé ${recommande}). Prudence.</p>`
        : '';
      body.innerHTML = `${compRef}${contractNarrative(c,'Résolution')}
        <p style="margin-top:10px;color:var(--parchment-dim);font-style:italic;">${RESOLUTION_INTRO[c.type]||''} La menace se révèle : <b>${enemy.nom}</b> (Danger ${enemy.danger}).${contractState.mods.enemyPvMult!==1?" Yohan a déjà l'avantage.":''}</p>
        ${warnHtml}
        <div style="margin-top:14px;"><button class="primary" id="goCombatBtn">Engager le combat</button></div>`;
      document.getElementById('goCombatBtn').onclick = () => {
        combatReturnTo = () => { contractState.stepIndex++; showScreen('contrat'); renderContractStep(); };
        startCombat(enemy, contractState.mods.defBonus);
      };
    }
    return;
  }

  if(step==="Retour"){
    advanceTime(4 + Math.floor(Math.random()*5)); // 4 à 8 semaines pour la mission écoulée
    let msg = "";
    let lootHtml = "";
    if(contractState.resolutionSuccess === false){
      msg = fillTemplate(pickVariant(FRAME_RETOUR_FAIL), c) + " L'enquête n'a pas suffi à établir la vérité complète.";
    } else if(lastCombatVictory === false){
      msg = fillTemplate(pickVariant(FRAME_RETOUR_FAIL), c) + " Yohan a dû reculer face à la menace.";
    } else {
      const orGagne = Math.round(c.or * (contractState.mods.orMult||1));
      hero.or += orGagne;
      gainPointsSang(5);
      msg = fillTemplate(pickVariant(FRAME_RETOUR_SUCCESS), c) + ` Yohan reçoit ${orGagne} pièces d'or.`;
      if(c.prix_paria && (contractState.prixChoisi==="NOBLE_CONSENTANTE" || contractState.prixChoisi==="OR_ET_NOBLE_CONSENTANTE")){
        const p = c.prix_paria.noble_proposee;
        msg += " Une relation persistante se noue avec "+(p?p.nom:"la noble concernée")+" ; le temps dira si une descendance en naîtra.";
      }
      const looted = grantLoot();
      if(looted) lootHtml = `<p style="margin-top:8px;color:var(--onde-bright);">Butin trouvé : <b>${looted.nom}</b> — ${looted.desc}.</p>`;
    }
    body.innerHTML = `<p class="narrative">${msg}</p>${lootHtml}<div style="margin-top:14px;"><button class="ghost" id="doneBtn">Retour au registre</button></div>`;
    document.getElementById('doneBtn').onclick = () => { renderEquipement(); showScreen('contrats'); };
    return;
  }
}

/* ============================= MOTEUR DE COMBAT ============================= */
let player, enemy, turnCount, poisonStacks, lastCombatVictory;

function rollDie(sides){ return 1 + Math.floor(Math.random()*sides); }
function rollDice(notation){ const [n,sides]=notation.split('d').map(Number); let t=0; for(let i=0;i<n;i++)t+=rollDie(sides); return t; }

function fatZone(fat){
  if(fat<=40) return {name:"Sûre", cls:"", txtCls:"zn-sure", mult:1, failChance:0, contrecoup:false};
  if(fat<=70) return {name:"Tendue", cls:"zone-tendue", txtCls:"zn-tendue", mult:1.25, failChance:0.10, contrecoup:false};
  if(fat<=90) return {name:"Critique", cls:"zone-critique", txtCls:"zn-critique", mult:1.5, failChance:0.25, contrecoup:true};
  return {name:"Rupture", cls:"zone-rupture", txtCls:"zn-rupture", mult:2, failChance:0.45, contrecoup:true};
}

function startCombat(enemyTemplate, extraDef){
  player = JSON.parse(JSON.stringify(hero));
  player.pv = hero.pv>0?hero.pv:hero.pvMax;
  player.bonusNiveau = bonusDeNiveau(hero.niveau);
  // Application des bonus d'équipement
  const armure = hero.equipement.armure ? itemById(hero.equipement.armure) : null;
  const accessoire = hero.equipement.accessoire ? itemById(hero.equipement.accessoire) : null;
  if(armure){ player.defenseBase += (armure.def||0); player.agi += (armure.agi||0); }
  if(accessoire){ player.precision += (accessoire.prec||0); player.vol += (accessoire.vol||0); player.fatMax += (accessoire.fatMax||0); }
  if(extraDef) player.defenseBase += extraDef;
  hero.compagnons.forEach(c=>{
    player.precision += (c.bonus.prec||0);
    player.fatMax += (c.bonus.fatMax||0);
    player.vol += (c.bonus.vol||0);
  });
  player.pa = player.paMax;
  player.unlocked = Array.from(hero.unlocked);
  player.inventaire = JSON.parse(JSON.stringify(hero.inventaire));
  enemy = JSON.parse(JSON.stringify(enemyTemplate));
  enemy.paMax = enemy.pa_par_tour || enemy.pa || 2;
  enemy.pa = enemy.paMax;
  enemy.pvMax = enemy.pv;
  enemy.degBase = enemy.attaque_base ? enemy.attaque_base.degats_base : (enemy.degBase||4);
  enemy.deDeg = enemy.attaque_base ? enemy.attaque_base.de_variance : (enemy.deDeg||"1d4");
  enemy.special = (enemy.capacites_speciales && enemy.capacites_speciales[0]) ? {nom:enemy.capacites_speciales[0].nom, desc:enemy.capacites_speciales[0].effet} : (enemy.special||null);
  turnCount = 1; poisonStacks = 0; lastCombatVictory = null;

  showScreen('combat');
  document.getElementById('endScreen').style.display='none';
  document.getElementById('combatScreen').style.display='block';

  document.getElementById('vsEnemyName').textContent = enemy.nom;
  document.getElementById('enemyName').textContent = enemy.nom;
  document.getElementById('eDanger').textContent = enemy.danger;
  document.getElementById('eDef').textContent = enemy.defense;
  document.getElementById('ePrec').textContent = "+"+enemy.precision;
  document.getElementById('eDeg').textContent = enemy.degBase+" + "+enemy.deDeg;
  document.getElementById('eSpecial').textContent = enemy.special ? (enemy.special.nom+" — "+enemy.special.desc) : "Aucune";

  document.getElementById('logBox').innerHTML = '';
  logSystem(`Le combat commence : Yohan affronte ${enemy.nom} (Danger ${enemy.danger}).`);
  renderCombat();
  startPlayerTurn();
}

function startPlayerTurn(){
  player.pa = player.paMax;
  document.getElementById('turnCount').textContent = turnCount;
  applyPoisonIfAny();
  renderCombat();
  logSystem(`— Tour ${turnCount} : à Yohan de jouer —`);
}

document.getElementById('endTurnBtn').onclick = () => {
  if(enemy.pv<=0 || player.pv<=0) return;
  enemyTurn();
};

function enemyTurn(){
  let paLeft = enemy.paMax;
  while(paLeft>0 && player.pv>0){
    const cost = enemy.special && Math.random()<0.35 && paLeft>=2 ? 2 : 1;
    if(cost>paLeft) break;
    paLeft -= cost;
    if(cost===2 && enemy.special) resolveEnemySpecialAttack(); else resolveEnemyBasicAttack();
    if(player.pv<=0) break;
  }
  turnCount++;
  renderCombat();
  if(checkEnd()) return;
  startPlayerTurn();
}

function checkEnd(){
  if(enemy.pv<=0){
    lastCombatVictory=true; hero.pv = player.pv; hero.inventaire = player.inventaire;
    adjustSuspicion(5); // un combat, même gagné, se remarque
    const xpGagne = enemy.danger * 12;
    const leveledUp = gainXP(xpGagne);
    logSystem(`Victoire ! Yohan gagne ${xpGagne} points d'expérience.`);
    if(leveledUp){
      hero.pv = hero.pvMax;
      logSystem(`Yohan passe au niveau ${hero.niveau} ! PV max augmentés, un nouveau Point de Talent est disponible.`);
    }
    showEnd(true, leveledUp);
    saveGame(true);
    return true;
  }
  if(player.pv<=0){
    if(player.unlocked.includes('renaissance') && !player.renaissanceUsed){
      player.renaissanceUsed = true; hero.unlocked.add('renaissance'); // reste débloqué
      player.pv = 1;
      logSystem("La Renaissance partielle s'active : Yohan revient à 1 PV.");
      renderCombat();
      return false;
    }
    adjustSuspicion(5);
    if(enemy.danger <= 2){
      // Menace mineure : Yohan survit, blessé — pas de mort permanente pour un simple loup
      lastCombatVictory=false; hero.pv = Math.max(1, Math.round(hero.pvMax*0.3)); hero.inventaire = player.inventaire;
      showEnd(false, false, false);
    } else {
      // Menace sérieuse (Danger 3+) : mort permanente, fidèle au pilier du monde
      lastCombatVictory=false;
      showEnd(false, false, true);
    }
    saveGame(true);
    return true;
  }
  return false;
}

function resetGame(){
  try{ localStorage.removeItem(SAVE_KEY); } catch(e){}
  try{ location.reload(); } catch(e){}
}

function showEnd(victory, leveledUp, permadeath){
  document.getElementById('combatScreen').style.display='none';
  const el = document.getElementById('endScreen');
  el.style.display='block';
  el.className = 'end-screen '+(victory?'':'defeat');
  const lvlHtml = leveledUp ? `<p style="color:var(--gold);">Yohan atteint le niveau ${hero.niveau} !</p>` : '';
  if(victory){
    el.innerHTML = `<h2>Victoire</h2><p>${enemy.nom} s'effondre.</p>${lvlHtml}<button class="primary" id="afterCombatBtn">Continuer</button>`;
    document.getElementById('afterCombatBtn').onclick = () => { if(combatReturnTo) combatReturnTo(); else showScreen('monde'); };
  } else if(permadeath){
    el.innerHTML = `<h2>Yohan est mort</h2>
      <p>Face à ${enemy.nom}, le dernier sang connu des Karlsberg s'éteint. Le monde continue, indifférent.</p>
      <div style="text-align:left;max-width:360px;margin:16px auto;font-family:'Inter',sans-serif;font-size:12.5px;color:var(--parchment-dim);">
        <div>Niveau atteint : <b style="color:var(--gold);">${hero.niveau}</b></div>
        <div>Chapitre de la quête : <b style="color:var(--gold);">${TRAME_CHAPITRES[hero.trame.chapitre].titre}</b></div>
        <div>Or amassé : <b style="color:var(--gold);">${hero.or}</b></div>
        <div>Compagnons : <b style="color:var(--gold);">${hero.compagnons.map(c=>c.nom).join(', ')||'aucun'}</b></div>
      </div>
      <button class="primary" id="afterCombatBtn">Nouvelle partie</button>`;
    document.getElementById('afterCombatBtn').onclick = resetGame;
  } else {
    el.innerHTML = `<h2>Retraite</h2><p>Yohan s'en tire de justesse face à ${enemy.nom}, blessé mais vivant.</p><button class="primary" id="afterCombatBtn">Continuer</button>`;
    document.getElementById('afterCombatBtn').onclick = () => { if(combatReturnTo) combatReturnTo(); else showScreen('monde'); };
  }
}

function spendPA(n){ player.pa -= n; }
function attemptTouch(atkPrec, defDef){
  const roll = rollDie(20); const total = roll+atkPrec; const margin = total-defDef;
  return {hit: total>=defDef, crit: margin>=10, roll, total};
}

function playerBasicAttack(kind){
  let cost, deg, deDe, label;
  if(kind==="pistolet1"||kind==="pistolet2"){
    const slot = kind==="pistolet1"?"pistolet1Charge":"pistolet2Charge";
    if(!player[slot]) return;
    cost=1; deg=6; deDe="1d6"; label="Tir de pistolet"; player[slot]=false;
  } else if(kind==="epee_legere"){ cost=1; deg=4; deDe="1d4"; label="Attaque légère (épée)"; }
  else { cost=2; deg=7; deDe="1d4"; label="Attaque lourde (épée)"; }
  if(player.pa<cost) return;
  spendPA(cost);
  const t = attemptTouch(player.precision+(player.bonusNiveau||0), enemy.defense);
  if(!t.hit){ logHit(label, `Le coup manque sa cible. (jet ${t.total} vs Déf ${enemy.defense})`, 'miss'); }
  else {
    let dmg = deg+rollDice(deDe)+(player.bonusNiveau||0); if(t.crit) dmg = Math.round(dmg*1.5);
    enemy.pv = Math.max(0, enemy.pv-dmg);
    logHit(label, `${dmg} dégâts${t.crit?' — coup critique !':''} sur ${enemy.nom}.`, t.crit?'crit':'hit');
    flashEnemy();
  }
  renderCombat(); checkEnd();
}

function playerRecharge(slot){
  if(player.pa<1 || player[slot]) return;
  spendPA(1); player[slot]=true;
  logSystem(`Yohan recharge son pistolet.`);
  renderCombat();
}

function getUnlockedActivePowers(){
  const out = [];
  Object.values(TREE).forEach(branch=>branch.nodes.forEach(n=>{
    if(!n.passive && player.unlocked.includes(n.id)) out.push(n);
  }));
  return out;
}

function playerPower(powerId){
  const all = [];
  Object.values(TREE).forEach(b=>b.nodes.forEach(n=>all.push(n)));
  const p = all.find(x=>x.id===powerId);
  if(!p || player.pa<p.coutPA) return;
  const zone = fatZone(player.fat);
  const fatCost = Math.round(p.coutFAT*zone.mult);
  spendPA(p.coutPA);
  const echec = Math.random() < zone.failChance;
  player.fat = Math.min(player.fatMax, player.fat+fatCost);
  if(echec){
    let msg = `${p.nom} échoue — le pouvoir se dissipe sans effet (zone ${zone.name}).`;
    if(zone.contrecoup){ const c=rollDie(6)+2; player.pv=Math.max(0,player.pv-c); msg+=` Contrecoup : Yohan encaisse ${c} dégâts.`; }
    logHit(p.nom, msg, 'power');
  } else {
    const t = attemptTouch(player.vol+(player.bonusNiveau||0), enemy.defense);
    if(!t.hit){ logHit(p.nom, `Le pouvoir échoue à toucher ${enemy.nom}. (jet ${t.total} vs Déf ${enemy.defense})`, 'miss'); }
    else {
      let dmg = p.degBase+rollDice(p.deDeg)+(player.bonusNiveau||0); if(t.crit) dmg=Math.round(dmg*1.5);
      enemy.pv = Math.max(0, enemy.pv-dmg);
      let msg = `${dmg} dégâts${t.crit?' — coup critique !':''} sur ${enemy.nom}.`;
      if(p.vol){ const heal=Math.round(dmg*0.5); player.pv=Math.min(player.pvMax,player.pv+heal); msg+=` Yohan récupère ${heal} PV.`; }
      logHit(p.nom, msg, 'power');
      flashEnemy();
    }
  }
  renderCombat(); checkEnd();
}

function playerConcentrate(){
  if(player.pa<1) return;
  spendPA(1); player.fat = Math.max(0, player.fat-5);
  logSystem(`Yohan se concentre et apaise sa Fatigue (-5).`);
  renderCombat();
}

function playerUseItem(uid){
  const entry = player.inventaire.find(e=>e.uid===uid);
  if(!entry || entry.qty<1 || player.pa<1) return;
  const item = itemById(entry.itemId);
  spendPA(1);
  entry.qty--;
  if(entry.qty<=0) player.inventaire = player.inventaire.filter(e=>e.uid!==uid);
  let msg = `Yohan utilise ${item.nom}.`;
  if(item.pvHeal){ player.pv = Math.min(player.pvMax, player.pv+item.pvHeal); msg += ` +${item.pvHeal} PV.`; }
  if(item.fatReduce){ player.fat = Math.max(0, player.fat-item.fatReduce); msg += ` −${item.fatReduce} Fatigue.`; }
  logHit(item.nom, msg, 'power');
  renderCombat();
}

function resolveEnemyBasicAttack(){
  const t = attemptTouch(enemy.precision, player.defenseBase+Math.floor(player.agi/2));
  if(!t.hit){ logHit(enemy.nom, `L'attaque manque Yohan.`, 'miss'); }
  else {
    let dmg = enemy.degBase+rollDice(enemy.deDeg); if(t.crit) dmg=Math.round(dmg*1.5);
    player.pv = Math.max(0, player.pv-dmg);
    logHit(enemy.nom, `${dmg} dégâts${t.crit?' — critique !':''} infligés à Yohan.`, t.crit?'crit':'hit');
    flashPlayer();
  }
}

function resolveEnemySpecialAttack(){
  const t = attemptTouch(enemy.precision, player.defenseBase+Math.floor(player.agi/2));
  if(!t.hit){ logHit(enemy.nom, `${enemy.special.nom} manque sa cible.`, 'miss'); return; }
  let dmg = enemy.degBase+rollDice(enemy.deDeg);
  player.pv = Math.max(0, player.pv-dmg);
  let msg = `${enemy.special.nom} inflige ${dmg} dégâts à Yohan.`;
  if(enemy.special.nom.toLowerCase().includes("venimeux")){ poisonStacks=3; msg+=` Yohan est empoisonné (3 dégâts/tour, 3 tours).`; }
  if(enemy.special.nom.toLowerCase().includes("esprit")){ const s=rollDie(8); player.vol=Math.max(0,player.vol-1); enemy.pv=Math.min(enemy.pvMax,enemy.pv+s); msg+=` ${enemy.nom} se soigne de ${s} PV.`; }
  logHit(enemy.nom, msg, 'power');
  flashPlayer();
}

function applyPoisonIfAny(){
  if(poisonStacks>0){
    player.pv = Math.max(0, player.pv-3); poisonStacks--;
    logHit("Poison", `Yohan subit 3 dégâts de poison (${poisonStacks} tour(s) restant(s)).`, 'hit');
  }
}

function flashEnemy(){ const p=document.getElementById('enemyPanel'); p.classList.remove('shake'); void p.offsetWidth; p.classList.add('shake','flash-red'); }
function flashPlayer(){ const p=document.getElementById('playerPanel'); p.classList.remove('shake'); void p.offsetWidth; p.classList.add('shake','flash-red'); }

function renderCombat(){
  if(!player) return;
  document.getElementById('pvText').textContent = `${player.pv} / ${player.pvMax}`;
  document.getElementById('pvBar').style.width = (100*player.pv/player.pvMax)+'%';
  document.getElementById('fatText').textContent = `${player.fat} / ${player.fatMax}`;
  const zone = fatZone(player.fat);
  const fatBar = document.getElementById('fatBar');
  fatBar.style.width = player.fat+'%'; fatBar.className='fat-fill '+zone.cls;
  const zn = document.getElementById('fatZoneName'); zn.textContent=zone.name; zn.className='fat-zone-name '+zone.txtCls;

  const pips = document.getElementById('paPips'); pips.innerHTML='';
  for(let i=0;i<player.paMax;i++){ const d=document.createElement('div'); d.className='pip'+(i<player.pa?' filled':''); d.textContent=i+1; pips.appendChild(d); }

  const wa = document.getElementById('weaponActions'); wa.innerHTML='';
  wa.appendChild(makeActionBtn(`Pistolet 1 ${player.pistolet1Charge?'(chargé)':'(vide)'}`,'1 PA',()=>playerBasicAttack('pistolet1'), player.pa<1||player.pv<=0||!player.pistolet1Charge));
  if(!player.pistolet1Charge) wa.appendChild(makeActionBtn('Recharger pistolet 1','1 PA',()=>playerRecharge('pistolet1Charge'), player.pa<1));
  wa.appendChild(makeActionBtn(`Pistolet 2 ${player.pistolet2Charge?'(chargé)':'(vide)'}`,'1 PA',()=>playerBasicAttack('pistolet2'), player.pa<1||player.pv<=0||!player.pistolet2Charge));
  if(!player.pistolet2Charge) wa.appendChild(makeActionBtn('Recharger pistolet 2','1 PA',()=>playerRecharge('pistolet2Charge'), player.pa<1));
  wa.appendChild(makeActionBtn('Attaque légère (épée)','1 PA',()=>playerBasicAttack('epee_legere'), player.pa<1));
  wa.appendChild(makeActionBtn('Attaque lourde (épée)','2 PA',()=>playerBasicAttack('epee_lourde'), player.pa<2));
  wa.appendChild(makeActionBtn('Se concentrer (−5 Fatigue)','1 PA',()=>playerConcentrate(), player.pa<1));
  (player.inventaire||[]).filter(e=>{const it=itemById(e.itemId); return it && it.type==='consommable' && e.qty>0;}).forEach(entry=>{
    const item = itemById(entry.itemId);
    wa.appendChild(makeActionBtn(`Utiliser : ${item.nom} (×${entry.qty})`, '1 PA', ()=>playerUseItem(entry.uid), player.pa<1));
  });

  const pa2 = document.getElementById('powerActions'); pa2.innerHTML='';
  getUnlockedActivePowers().forEach(p=>{
    const z = fatZone(player.fat);
    const proj = Math.round(p.coutFAT*z.mult);
    const disabled = player.pa<p.coutPA || player.pv<=0;
    pa2.appendChild(makeActionBtn(p.nom, `${p.coutPA} PA · +${proj} FAT`, ()=>playerPower(p.id), disabled, true));
  });

  if(enemy){
    document.getElementById('ePvText').textContent = `${enemy.pv} / ${enemy.pvMax}`;
    document.getElementById('ePvBar').style.width = (100*enemy.pv/enemy.pvMax)+'%';
  }
}

function makeActionBtn(label, cost, onClick, disabled, isPower){
  const b = document.createElement('button');
  b.className = 'act'+(isPower?' power':'');
  b.disabled = !!disabled;
  b.innerHTML = `<span>${label}</span><span class="cost">${cost}</span>`;
  b.onclick = onClick;
  return b;
}
function logSystem(msg){ const box=document.getElementById('logBox'); const p=document.createElement('p'); p.innerHTML=`<span class="tag system">Système</span>${msg}`; box.appendChild(p); box.scrollTop=box.scrollHeight; }
function logHit(actor,msg,cls){ const box=document.getElementById('logBox'); const p=document.createElement('p'); p.innerHTML=`<span class="tag">${actor}</span><span class="${cls}">${msg}</span>`; box.appendChild(p); box.scrollTop=box.scrollHeight; }
