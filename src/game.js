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
    extra = artPortraitCard('alycia') +
      `<p style="margin-top:10px;color:var(--onde-bright);">Une femme se révèle à Yohan, comme si elle l'observait depuis longtemps : <b>Alycia de Callensbourg</b>. ${COMPANIONS_POOL.alycia.desc}</p>
       <p style="font-family:'Inter',sans-serif;font-size:11.5px;color:var(--parchment-dim);">Elle se bat désormais aux côtés de Yohan — magie de l'Onde, offensive et vorace.</p>`;
  }
  if(idx===2 && !hero.compagnons.find(c=>c.id==='alarielle')){
    hero.compagnons.push(COMPANIONS_POOL.alarielle);
    extra = artPortraitCard('alarielle') +
      `<p style="margin-top:10px;color:var(--onde-bright);">Une émissaire d'Eltharion attend Yohan aux abords des ruines : <b>Princesse Alarielle</b>. ${COMPANIONS_POOL.alarielle.desc}</p>
       <p style="font-family:'Inter',sans-serif;font-size:11.5px;color:var(--parchment-dim);">Elle apporte la magie ancienne des Elfes — soin, protection et frappe en zone. Un arbre de pouvoirs que le sang Paria ne peut pas toucher.</p>`;
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

  const tr = (typeof trameProgres === 'function') ? trameProgres() : null;
  const trEl = document.getElementById('trameEtat');
  if(trEl && tr){
    trEl.innerHTML = tr.prochain
      ? `<span class="qc-num">Jalons de l'histoire · ${tr.faits}/${tr.total}</span>` +
        (tr.debloque
          ? `<b style="color:var(--onde-bright);">Quelque chose est prêt à se produire.</b> Terminez un tour pour que cela vienne à Yohan.`
          : `Le prochain jalon n'est pas encore mûr — il faut du sang, du temps, ou les bonnes rencontres.`)
      : `<span class="qc-num">Jalons de l'histoire · ${tr.faits}/${tr.total}</span>Tous les jalons connus ont été franchis.`;
    const liens = Object.entries(hero.affinites||{}).filter(([,v])=>v>0);
    if(liens.length){
      trEl.innerHTML += `<br><span class="qc-num" style="margin-top:8px;">Liens · ${tr.romFaits}/${tr.romTotal} moments partagés</span>`
        + liens.map(([qui,v])=>`${(PORTRAITS[qui]||{}).nom||qui} <b style="color:var(--gold);">${v}</b>`).join(' · ');
    }
  }

  const list = document.getElementById('compagnonList');
  if(!hero.compagnons.length){
    list.innerHTML = "<p class=\"compagnon-empty\">Yohan chemine seul, pour l'instant.</p>";
  } else {
    list.innerHTML = hero.compagnons.map(c=>`<div class="compagnon-card">
      ${artPortraitCard(c.id)}
      <div class="cc-desc">${c.desc}</div>
      <div class="cc-bonus">${c.bonusDesc}</div>
      ${c.combat ? `<div class="cc-bonus" style="color:var(--gold);">Au combat · ${c.combat.note} (${c.combat.stats.pvMax} PV, ${c.combat.stats.paMax} PA)</div>` : ''}
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
  flags: [],            // marqueurs posés par les événements écrits
  evenementsVus: [],    // événements écrits déjà joués (évite les répétitions)
  renom: 0,             // réputation militaire — débloque les campagnes
  armee: [],            // unités persistantes, avec leurs pertes
  affinites: {},        // liens tissés, alimentés uniquement par des choix
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
    cal.style.display = (id==='combat' || id==='bataille') ? 'none' : 'flex';
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

/* ============================= ÉCRAN SAUVEGARDE ============================= */
/* Le moteur de sauvegarde lui-même vit dans src/save.js. Ici on ne branche que
 * les commandes de l'écran Personnage : enregistrer, exporter, réimporter. */

document.getElementById('btnSaveNow').onclick = () => { saveGame(false); renderSauvegardes(); };

document.getElementById('btnExportSave').onclick = () => {
  const texte = serialiserHero({ version: SAVE_VERSION, meta: construireMeta(hero), hero });

  // Le téléchargement direct ne marche pas partout (page intégrée, sandbox,
  // file://). On propose donc toujours le texte de la sauvegarde à côté : c'est
  // le seul moyen qui fonctionne dans tous les cas.
  try{
    const blob = new Blob([texte], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'parias_vardhen_save.json';
    a.click();
    setTimeout(()=>URL.revokeObjectURL(url), 1000);
  } catch(e){ /* sans importance : le texte ci-dessous reste disponible */ }

  const zone = document.getElementById('saveTextZone');
  zone.style.display = 'block';
  const champ = document.getElementById('saveText');
  champ.value = texte;
  champ.focus();
  champ.select();
  setSaveStatus("Sauvegarde prête. Si le fichier ne s'est pas téléchargé, copiez le texte ci-dessous et conservez-le.");
};

document.getElementById('btnCopySave').onclick = async () => {
  const champ = document.getElementById('saveText');
  champ.select();
  try{
    await navigator.clipboard.writeText(champ.value);
    setSaveStatus('Sauvegarde copiée dans le presse-papiers.');
  } catch(e){
    setSaveStatus('Copie automatique refusée — le texte est sélectionné, faites Ctrl+C.');
  }
};

document.getElementById('btnPasteSave').onclick = () => {
  const zone = document.getElementById('saveTextZone');
  zone.style.display = 'block';
  const champ = document.getElementById('saveText');
  champ.value = '';
  champ.placeholder = 'Collez ici le texte d\'une sauvegarde, puis cliquez « Charger ce texte ».';
  champ.focus();
  setSaveStatus('Collez votre sauvegarde dans le champ, puis chargez-la.');
};

document.getElementById('btnLoadText').onclick = () => {
  const texte = document.getElementById('saveText').value.trim();
  if(!texte){ setSaveStatus('Le champ est vide.'); return; }
  try{
    chargerDepuisTexte(texte);
    setSaveStatus('Sauvegarde chargée. Enregistrez-la dans un emplacement pour la conserver.');
  } catch(err){ setSaveStatus('Texte invalide : '+err.message); }
};

document.getElementById('btnImportSave').onclick = () => document.getElementById('importFileInput').click();
document.getElementById('importFileInput').onchange = (e) => {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try{
      chargerDepuisTexte(reader.result);
      setSaveStatus("Sauvegarde importée. Enregistrez-la dans un emplacement pour la conserver.");
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
  renderArmee();
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
    if(b.dataset.screen==='armee') renderArmee();
    // Les campagnes et affaires personnelles s'ouvrent au fil du Renom et des
    // marqueurs : il faut refaire le tri à chaque visite, pas seulement au départ.
    if(b.dataset.screen==='contrats') renderContracts();
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
  renderSauvegardes();
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

/* ============================= ARMÉE ============================= */

function entretienTotal(){
  return (hero.armee||[]).filter(u=>u.effectif>0).reduce((s,u)=>{
    const t = UNIT_TYPES[u.type];
    if(!t || !t.entretien) return s;
    // On paie au prorata de l'effectif restant : une unité décimée coûte moins cher.
    return s + Math.round(t.entretien * (u.effectif/u.effectifMax));
  }, 0);
}

/* Une troupe qu'on ne paie pas finit par s'en aller. */
function payerLaSolde(){
  const du = entretienTotal();
  if(du <= 0) return;
  if(hero.or >= du){ hero.or -= du; return; }
  hero.or = 0;
  const vivantes = (hero.armee||[]).filter(u=>u.effectif>0);
  if(!vivantes.length) return;
  const partante = vivantes[vivantes.length-1];
  hero.armee = hero.armee.filter(u => u !== partante);
  ajusterRenom(-3);
  const box = document.getElementById('eventModalBox');
  box.innerHTML = `<span class="event-tag">Solde impayée</span><h3>Ils sont partis dans la nuit</h3>
    <p class="narrative">La solde n'a pas suivi, et ${partante.nom} a fait ce que font les hommes qu'on ne paie pas : ils ont plié leurs affaires sans bruit et ils sont partis avant l'aube.</p>
    <p class="narrative" style="color:var(--parchment-dim);font-style:italic;">Personne ne le dira à voix haute, mais tout le camp le sait avant midi. On suit un capitaine qui paie.</p>
    <div class="reward-tags"><span class="reward-tag neg">−3 Renom</span><span class="reward-tag neg">${partante.nom} dissoute</span></div>
    <div style="margin-top:16px;text-align:right;"><button class="primary" id="soldeBtn">Continuer</button></div>`;
  document.getElementById('eventModal').style.display='flex';
  document.getElementById('soldeBtn').onclick = () => { renderArmee(); closeEventModal(); };
}

function recruterUnite(typeId){
  const t = UNIT_TYPES[typeId];
  if(!t || t.ennemi) return;
  if(hero.or < (t.prix||0)) return;
  if(renomActuel() < (t.renomRequis||0)) return;
  if(t.requisFlag && !hasFlag(t.requisFlag)) return;
  if(t.unique && (hero.armee||[]).some(u=>u.type===typeId)) return;
  hero.or -= (t.prix||0);
  if(!hero.armee) hero.armee = [];
  hero.armee.push(instancierUnite(typeId));
  saveGame(true);
  renderArmee();
}

function dissoudreUnite(uid){
  hero.armee = (hero.armee||[]).filter(u=>u.uid!==uid);
  saveGame(true);
  renderArmee();
}

function renderArmee(){
  const rn = renomActuel();
  const tRenom = document.getElementById('renomTexte');
  if(!tRenom) return;
  tRenom.textContent = `${rn} · ${rangMilitaire(rn)}`;
  document.getElementById('renomBar').style.width = Math.min(100, rn) + '%';

  const vivantes = (hero.armee||[]).filter(u=>u.effectif>0);
  document.getElementById('armeeEffectif').textContent =
    vivantes.length ? `${vivantes.reduce((s,u)=>s+u.effectif,0)} hommes · ${vivantes.length} unité(s)` : 'aucune troupe';
  document.getElementById('armeeEntretien').textContent = entretienTotal() + ' or';
  document.getElementById('armeeOr').textContent = hero.or;

  // --- Rôle ---
  const role = document.getElementById('armeeRole');
  role.innerHTML = '';
  if(!vivantes.length){
    role.innerHTML = `<p class="inv-empty">Yohan ne commande personne. Une campagne exige une armée : commencez par recruter.</p>`;
  } else {
    vivantes.forEach(u=>{
      const t = UNIT_TYPES[u.type] || {};
      const pct = Math.max(0, 100*u.effectif/u.effectifMax);
      const div = document.createElement('div');
      div.className = 'unit-card allie';
      div.innerHTML = `<div class="u-top"><span class="u-nom">${u.nom}</span><span class="u-eff">${u.effectif}/${u.effectifMax}</span></div>
        <div class="u-bar"><i style="width:${pct}%"></i></div>
        <div class="u-meta">${u.categorie} · ATQ ${u.attaque} · DÉF ${u.defense}${u.portee?' · à distance':''} · entretien ${Math.round((t.entretien||0)*(u.effectif/u.effectifMax))} or</div>`;
      const btn = document.createElement('button');
      btn.className = 'ghost'; btn.textContent = 'Congédier';
      btn.style.marginTop = '8px';
      btn.onclick = () => dissoudreUnite(u.uid);
      div.appendChild(btn);
      role.appendChild(div);
    });
  }

  // --- Recrutement ---
  const rec = document.getElementById('recrutementList');
  rec.innerHTML = '';
  unitesRecrutables().forEach(t=>{
    const dejaUnique = t.unique && (hero.armee||[]).some(u=>u.type===t.id);
    const verrouRenom = renomActuel() < (t.renomRequis||0);
    const verrouFlag  = t.requisFlag && !hasFlag(t.requisFlag);
    const tropCher    = hero.or < (t.prix||0);

    const div = document.createElement('div');
    div.className = 'unit-card';
    div.style.cursor = 'default';
    div.innerHTML = `<div class="u-top"><span class="u-nom">${t.nom}</span>
        <span class="u-eff">${t.prix ? t.prix+' or' : 'sans solde'}</span></div>
      <div class="u-meta">${t.categorie} · ${t.effectif} hommes · ATQ ${t.attaque} · DÉF ${t.defense}${t.portee?' · à distance':''} · entretien ${t.entretien||0}/tour</div>
      <div class="u-desc">${t.desc}</div>`;

    const btn = document.createElement('button');
    btn.className = 'ghost';
    btn.style.marginTop = '8px';
    if(dejaUnique){ btn.textContent = 'Déjà au rôle'; btn.disabled = true; }
    else if(verrouFlag){ btn.textContent = 'Ils ne vous suivront pas encore'; btn.disabled = true; }
    else if(verrouRenom){ btn.textContent = `Renom ${t.renomRequis} requis (vous avez ${renomActuel()})`; btn.disabled = true; }
    else if(tropCher){ btn.textContent = `${t.prix} or requis`; btn.disabled = true; }
    else { btn.textContent = 'Recruter'; btn.onclick = () => recruterUnite(t.id); }
    div.appendChild(btn);
    rec.appendChild(div);
  });
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
  payerLaSolde();
  saveGame(true);
  renderCalendar();

  // Le temps qui passe fait avancer l'histoire : si un jalon de la trame a ses
  // conditions réunies, il se déclenche maintenant (ou dès que l'écran se libère).
  armerTrame();
}

function triggerExploration(){
  const lieu = LOCATIONS.find(l=>l.id===hero.position) || null;

  // Sous forte suspicion, la traque peut se manifester directement
  if(hero.suspicion>=60 && Math.random()<0.25){
    const box = document.getElementById('eventModalBox');
    box.innerHTML = `${artEventBanner('evt_traque')}<span class="event-tag">Traque</span><h3>Ils l'ont retrouvé</h3>
      ${artPortraitCard('chasseur_prime')}
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

  // Les événements écrits passent en premier, et ne se répètent pas tant que le
  // catalogue applicable n'est pas épuisé. Ensuite seulement, on retombe sur les
  // variantes générées de events.js, qui servent de remplissage.
  const ecrit = pickWrittenEvent(lieu);
  if(ecrit){ openWrittenEvent(ecrit, lieu); return; }

  const pool = lieu ? EVENTS.filter(e => lieu.familles_evenements_compatibles.includes(e.famille)) : EVENTS;
  const list = pool.length ? pool : EVENTS;
  const ev = list[Math.floor(Math.random()*list.length)];
  openEventModal(ev, lieu);
}

function closeEventModal(){
  document.getElementById('eventModal').style.display='none';
  // Un jalon de trame armé en fin de tour attendait que l'écran se libère.
  if(typeof resoudreTrameEnAttente === 'function') resoudreTrameEnAttente();
}

/* ============================= CONTRATS ============================= */
function renderContratsSpeciaux(){
  const rendu = (holder, categorie, vide) => {
    if(!holder) return;
    const dispo = contratsSpeciauxDisponibles(categorie);
    holder.innerHTML = '';
    if(!dispo.length){ holder.innerHTML = `<p class="inv-empty">${vide}</p>`; return; }
    dispo.forEach(c=>{
      const row = document.createElement('div');
      row.className = 'contract-row';
      const badge = categorie === 'campagne'
        ? `<span class="cr-badge campagne">Bataille</span>`
        : `<span class="cr-badge">Personnel</span>`;
      row.innerHTML = `<div><div class="cr-titre">${c.titre}</div>
        <div class="cr-meta">${c.commanditaire} · ${c.lieu}</div>
        <div class="cr-meta" style="color:var(--parchment);font-style:italic;margin-top:4px;">${c.resume||''}</div></div>${badge}`;
      row.onclick = () => ouvrirContratSpecial(c.id);
      holder.appendChild(row);
    });
  };
  rendu(document.getElementById('campagneList'), 'campagne',
    `Aucune campagne ouverte. Gagnez du Renom en menant des contrats et des batailles — le vôtre est de ${renomActuel()}.`);
  rendu(document.getElementById('personnelList'), 'personnel',
    "Personne n'a encore assez de raisons de vous en vouloir pour vous proposer quelque chose de tordu.");
}

function renderContracts(){
  renderContratsSpeciaux();
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
          if(o.id==="NOBLE_CONSENTANTE" || o.id==="OR_ET_NOBLE_CONSENTANTE"){
            if(!hasFlag('prix_noble_accepte')) heroFlags().push('prix_noble_accepte');
          }
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
        // Une menace faible ne se présente pas seule sur un contrat rémunéré
        const escorte = enemy.danger <= 2 ? [enemy, enemy] : [enemy];
        startCombat(escorte, contractState.mods.defBonus);
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
      ajusterRenom(3);   // un contrat honoré se sait, et le Renom monte
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
