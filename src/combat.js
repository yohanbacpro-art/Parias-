/* PARIAS — Moteur de combat (multi-cibles)
 *
 * Un affrontement oppose deux camps :
 *   party  Yohan + les compagnons qui savent se battre (COMPANIONS_POOL[…].combat)
 *   foes   un ou plusieurs adversaires issus du bestiaire
 *
 * Tour de jeu : chaque membre du groupe reçoit ses PA. Le joueur choisit
 * librement qui agit (clic sur une carte du groupe) et sur qui (clic sur une
 * carte d'adversaire), puis termine le tour — les adversaires jouent alors.
 *
 * API utilisée ailleurs :
 *   startCombat(spec, defBonus, opts)  spec = gabarit unique | tableau |
 *                                      [{bst,n}] | [{champion}]
 *                                      opts.sansMort : une défaite est une
 *                                      retraite, jamais une mort permanente
 *   lastCombatVictory             true/false, lu par les contrats
 *   combatReturnTo()              défini par l'appelant, rappelé à la sortie
 *   rollDie / rollDice / fatZone  utilitaires partagés avec les événements
 */

let combat = null;
let lastCombatVictory = null;

function rollDie(sides){ return 1 + Math.floor(Math.random()*sides); }
function rollDice(notation){ const [n,sides]=notation.split('d').map(Number); let t=0; for(let i=0;i<n;i++)t+=rollDie(sides); return t; }

function fatZone(fat){
  if(fat<=40) return {name:"Sûre", cls:"", txtCls:"zn-sure", mult:1, failChance:0, contrecoup:false};
  if(fat<=70) return {name:"Tendue", cls:"zone-tendue", txtCls:"zn-tendue", mult:1.25, failChance:0.10, contrecoup:false};
  if(fat<=90) return {name:"Critique", cls:"zone-critique", txtCls:"zn-critique", mult:1.5, failChance:0.25, contrecoup:true};
  return {name:"Rupture", cls:"zone-rupture", txtCls:"zn-rupture", mult:2, failChance:0.45, contrecoup:true};
}

/* ============================= CONSTRUCTION DES CAMPS ============================= */

const NUMEROTATION = ["I","II","III","IV","V","VI"];

/* Accepte un gabarit unique, un tableau de gabarits, ou une composition
 * mêlant [{bst,n}] (bestiaire) et [{champion,n}] (figures nommées). */
function expandFoeSpec(spec){
  const out = [];
  (Array.isArray(spec) ? spec : [spec]).forEach(x=>{
    if(!x) return;
    if(x.groupe){
      // Tolère qu'on passe la définition de combat entière plutôt que son
      // groupe : sans cela l'adversaire serait construit à partir d'un objet
      // vide, et le combat s'ouvrirait sur un ennemi sans nom ni points de vie.
      out.push(...expandFoeSpec(x.groupe));
    } else if(x.champion){
      const tpl = CHAMPIONS[x.champion];
      if(!tpl){ console.warn('Champion inconnu :', x.champion); return; }
      for(let i=0;i<(x.n||1);i++) out.push(tpl);
    } else if(x.bst){
      const tpl = BESTIARY_FULL.find(b=>b.id===x.bst);
      if(!tpl){ console.warn('Bestiaire : identifiant inconnu', x.bst); return; }
      for(let i=0;i<(x.n||1);i++) out.push(tpl);
    } else {
      out.push(x);
    }
  });
  return out.length ? out : [BESTIARY_FULL[0]];
}

function makeFoe(tpl, index, total, sameName){
  const f = JSON.parse(JSON.stringify(tpl));
  return {
    side:"foe", ref:(f.id||'foe')+'_'+index,
    nom: sameName>1 ? `${f.nom} ${NUMEROTATION[index] || (index+1)}` : f.nom,
    portrait: f.portrait || null,
    danger: f.danger, pv: f.pv, pvMax: f.pv,
    defenseBase: f.defense, precision: f.precision, agi: 0,
    fat: 0, fatMax: 100,
    paMax: f.pa_par_tour || f.pa || 2, pa: 0,
    degBase: f.attaque_base ? f.attaque_base.degats_base : (f.degBase || 4),
    deDeg:   f.attaque_base ? f.attaque_base.de_variance  : (f.deDeg || "1d4"),
    sillage: f.sillage || null,
    special: (f.capacites_speciales && f.capacites_speciales[0])
      ? {nom:f.capacites_speciales[0].nom, desc:f.capacites_speciales[0].effet}
      : (f.special || null),
    poison: 0, garde: 0, gardeTours: 0, vivant: true,
  };
}

function buildFoes(spec){
  const templates = expandFoeSpec(spec);
  const counts = {};
  templates.forEach(t => { counts[t.nom] = (counts[t.nom]||0)+1; });
  const seen = {};
  return templates.map((t,i)=>{
    seen[t.nom] = (seen[t.nom]||0);
    const f = makeFoe(t, seen[t.nom], templates.length, counts[t.nom]);
    seen[t.nom]++;
    f.ref = 'foe_'+i;
    return f;
  });
}

function buildYohan(extraDef){
  const armure     = hero.equipement.armure ? itemById(hero.equipement.armure) : null;
  const accessoire = hero.equipement.accessoire ? itemById(hero.equipement.accessoire) : null;

  const y = {
    side:"party", ref:"yohan", estYohan:true,
    nom:"Yohan", portrait:"yohan",
    pv: hero.pv>0 ? hero.pv : hero.pvMax, pvMax: hero.pvMax,
    fat: hero.fat, fatMax: hero.fatMax,
    precision: hero.precision, vol: hero.vol, agi: hero.agi,
    defenseBase: hero.defenseBase,
    paMax: hero.paMax, pa: 0,
    bonusNiveau: bonusDeNiveau(hero.niveau),
    pouvoirs: Array.from(hero.unlocked),
    pistolet1Charge: hero.pistolet1Charge !== false,
    pistolet2Charge: hero.pistolet2Charge !== false,
    inventaire: JSON.parse(JSON.stringify(hero.inventaire)),
    renaissanceUsed: false,
    poison: 0, garde: 0, gardeTours: 0, vivant: true,
  };

  if(armure){ y.defenseBase += (armure.def||0); y.agi += (armure.agi||0); }
  if(accessoire){ y.precision += (accessoire.prec||0); y.vol += (accessoire.vol||0); y.fatMax += (accessoire.fatMax||0); }
  if(extraDef) y.defenseBase += extraDef;

  // Bonus passifs des compagnons — ils s'appliquent même à ceux qui ne combattent pas
  hero.compagnons.forEach(c=>{
    if(!c.bonus) return;
    y.precision += (c.bonus.prec||0);
    y.vol       += (c.bonus.vol||0);
    y.fatMax    += (c.bonus.fatMax||0);
  });
  return y;
}

function buildCompanion(c){
  const st = c.combat.stats;
  return {
    side:"party", ref:c.id, estYohan:false,
    nom:c.nomCourt || c.nom, nomComplet:c.nom, portrait:c.id,
    arbre:c.combat.arbre,
    pv: st.pvMax, pvMax: st.pvMax,
    fat: 0, fatMax: st.fatMax,
    precision: st.precision, vol: st.vol, agi: st.agi,
    defenseBase: st.defenseBase,
    paMax: st.paMax, pa: 0,
    bonusNiveau: Math.floor(hero.niveau/3),
    pouvoirs: c.combat.pouvoirs.slice(),
    poison: 0, garde: 0, gardeTours: 0, vivant: true,
  };
}

function buildParty(extraDef){
  const party = [ buildYohan(extraDef) ];
  hero.compagnons.forEach(c => { if(c.combat) party.push(buildCompanion(c)); });
  return party;
}

/* ============================= CYCLE DE COMBAT ============================= */

function startCombat(spec, extraDef, opts){
  combat = {
    party: buildParty(extraDef),
    foes: buildFoes(spec),
    actorIdx: 0,
    targetIdx: 0,
    round: 1,
    over: false,
    // Un duel « pas à mort », ou un affrontement dont un événement écrit gère
    // déjà l'issue : la défaite y est une retraite, quel que soit le Danger.
    sansMort: !!(opts && opts.sansMort),
  };
  lastCombatVictory = null;

  showScreen('combat');
  document.getElementById('endScreen').style.display='none';
  document.getElementById('combatScreen').style.display='block';
  document.getElementById('logBox').innerHTML = '';

  const noms = combat.foes.map(f=>f.nom).join(', ');
  document.getElementById('vsEnemyName').textContent = combat.foes.length>1 ? `${combat.foes.length} adversaires` : combat.foes[0].nom;
  document.getElementById('vsPartyName').textContent = combat.party.length>1 ? `Le groupe (${combat.party.length})` : 'Yohan';
  logSystem(`Le combat commence : ${combat.party.map(p=>p.nom).join(' et ')} face à ${noms}.`);

  startPartyTurn();
}

function startPartyTurn(){
  combat.party.forEach(p=>{
    if(!p.vivant) { p.pa = 0; return; }
    p.pa = p.paMax;
    if(p.gardeTours>0){ p.gardeTours--; if(p.gardeTours===0){ p.garde = 0; } }
    applyPoison(p);
  });
  // Le premier acteur vivant qui a des PA prend la main
  const first = combat.party.findIndex(p=>p.vivant && p.pa>0);
  combat.actorIdx = first >= 0 ? first : 0;
  ensureTarget();
  document.getElementById('turnCount').textContent = combat.round;
  logSystem(`— Tour ${combat.round} : au groupe de jouer —`);
  renderCombat();
  checkEnd();
}

function foesTurn(){
  combat.foes.forEach(f=>{
    if(!f.vivant || combat.over) return;
    applyPoison(f);
    if(!f.vivant) return;
    let paLeft = f.paMax;
    while(paLeft>0 && livingParty().length){
      const cost = (f.special && Math.random()<0.35 && paLeft>=2) ? 2 : 1;
      if(cost>paLeft) break;
      paLeft -= cost;
      const cible = pickFoeTarget();
      if(!cible) break;
      if(cost===2 && f.special) foeSpecialAttack(f, cible); else foeBasicAttack(f, cible);
      if(!livingParty().length) break;
    }
  });
  combat.round++;
  renderCombat();
  if(checkEnd()) return;
  startPartyTurn();
}

/* Les adversaires achèvent volontiers un blessé : deux tirages, on garde le plus bas. */
function pickFoeTarget(){
  const alive = livingParty();
  if(!alive.length) return null;
  const a = alive[Math.floor(Math.random()*alive.length)];
  const b = alive[Math.floor(Math.random()*alive.length)];
  return (a.pv <= b.pv) ? a : b;
}

function livingParty(){ return combat.party.filter(p=>p.vivant); }
function livingFoes(){ return combat.foes.filter(f=>f.vivant); }
function activeActor(){ return combat.party[combat.actorIdx]; }
function currentTarget(){ return combat.foes[combat.targetIdx]; }

function ensureTarget(){
  const t = combat.foes[combat.targetIdx];
  if(!t || !t.vivant){
    const i = combat.foes.findIndex(f=>f.vivant);
    combat.targetIdx = i >= 0 ? i : 0;
  }
}

function setActor(i){
  const p = combat.party[i];
  if(!p || !p.vivant || combat.over) return;
  combat.actorIdx = i;
  renderCombat();
}

function setTarget(i){
  const f = combat.foes[i];
  if(!f || !f.vivant || combat.over) return;
  combat.targetIdx = i;
  renderCombat();
}

document.getElementById('endTurnBtn').onclick = () => {
  if(!combat || combat.over) return;
  foesTurn();
};

/* ============================= RÉSOLUTION ============================= */

function defenseOf(c){ return c.defenseBase + Math.floor((c.agi||0)/2) + (c.garde||0); }

function attemptTouch(atkPrec, defDef){
  const roll = rollDie(20); const total = roll+atkPrec; const margin = total-defDef;
  return {hit: total>=defDef, crit: margin>=10, roll, total};
}

function damage(target, amount){
  target.pv = Math.max(0, target.pv - amount);
  if(target.pv<=0) downed(target);
}

function downed(c){
  if(!c.vivant) return;
  // Renaissance partielle : Yohan seulement, une fois par combat
  if(c.estYohan && c.pouvoirs.includes('renaissance') && !c.renaissanceUsed){
    c.renaissanceUsed = true;
    c.pv = 1;
    logSystem("La Renaissance partielle s'active : Yohan revient à 1 PV.");
    return;
  }
  c.vivant = false;
  c.pa = 0;
  logHit(c.nom, c.side==='party' ? `${c.nom} s'effondre.` : `${c.nom} est mis hors de combat.`, c.side==='party' ? 'hit' : 'crit');
  if(c.side==='foe') ensureTarget();
}

function applyPoison(c){
  if(c.poison>0){
    c.pv = Math.max(0, c.pv-3); c.poison--;
    logHit("Poison", `${c.nom} subit 3 dégâts de poison (${c.poison} tour(s) restant(s)).`, 'hit');
    if(c.pv<=0) downed(c);
  }
}

/* ---- Actions du groupe ---- */

function actorAttack(kind){
  const a = activeActor(); const t = currentTarget();
  if(!a || !a.vivant || !t || !t.vivant || combat.over) return;

  let cost, deg, deDe, label;
  if(kind==="pistolet1"||kind==="pistolet2"){
    const slot = kind==="pistolet1"?"pistolet1Charge":"pistolet2Charge";
    if(!a[slot]) return;
    cost=1; deg=6; deDe="1d6"; label="Tir de pistolet"; a[slot]=false;
  } else if(kind==="epee_legere"){ cost=1; deg=4; deDe="1d4"; label="Attaque légère (épée)"; }
  else if(kind==="epee_lourde"){ cost=2; deg=7; deDe="1d4"; label="Attaque lourde (épée)"; }
  else { cost=1; deg=4; deDe="1d6"; label="Attaque"; }
  if(a.pa<cost) return;
  a.pa -= cost;

  const touche = attemptTouch(a.precision+(a.bonusNiveau||0), defenseOf(t));
  if(!touche.hit){
    logHit(`${a.nom} · ${label}`, `Le coup manque ${t.nom}. (jet ${touche.total} vs Déf ${defenseOf(t)})`, 'miss');
  } else {
    let dmg = deg+rollDice(deDe)+(a.bonusNiveau||0); if(touche.crit) dmg = Math.round(dmg*1.5);
    damage(t, dmg);
    logHit(`${a.nom} · ${label}`, `${dmg} dégâts${touche.crit?' — coup critique !':''} sur ${t.nom}.`, touche.crit?'crit':'hit');
    flashPanel('enemyPanel');
  }
  afterPartyAction();
}

function actorRecharge(slot){
  const a = activeActor();
  if(!a || a.pa<1 || a[slot]) return;
  a.pa -= 1; a[slot]=true;
  logSystem(`${a.nom} recharge son pistolet.`);
  renderCombat();
}

function actorConcentrate(){
  const a = activeActor();
  if(!a || a.pa<1) return;
  a.pa -= 1; a.fat = Math.max(0, a.fat-5);
  logSystem(`${a.nom} se concentre et apaise sa Fatigue (−5).`);
  renderCombat();
}

function actorUseItem(uid){
  const a = activeActor();
  if(!a || !a.inventaire || a.pa<1) return;
  const entry = a.inventaire.find(e=>e.uid===uid);
  if(!entry || entry.qty<1) return;
  const item = itemById(entry.itemId);
  a.pa -= 1;
  entry.qty--;
  if(entry.qty<=0) a.inventaire = a.inventaire.filter(e=>e.uid!==uid);
  let msg = `${a.nom} utilise ${item.nom}.`;
  if(item.pvHeal){ a.pv = Math.min(a.pvMax, a.pv+item.pvHeal); msg += ` +${item.pvHeal} PV.`; }
  if(item.fatReduce){ a.fat = Math.max(0, a.fat-item.fatReduce); msg += ` −${item.fatReduce} Fatigue.`; }
  logHit(a.nom, msg, 'power');
  renderCombat();
}

function actorPower(powerId){
  const a = activeActor();
  if(!a || !a.vivant || combat.over) return;
  const p = powerById(powerId);
  if(!p || a.pa<p.coutPA) return;

  const zone = fatZone(a.fat);
  const fatCost = Math.round(p.coutFAT*zone.mult);
  a.pa -= p.coutPA;
  const echec = Math.random() < zone.failChance;
  a.fat = Math.min(a.fatMax, a.fat+fatCost);

  if(echec){
    let msg = `${p.nom} échoue — le pouvoir se dissipe sans effet (zone ${zone.name}).`;
    if(zone.contrecoup){ const c=rollDie(6)+2; damage(a, c); msg+=` Contrecoup : ${a.nom} encaisse ${c} dégâts.`; }
    logHit(`${a.nom} · ${p.nom}`, msg, 'power');
    afterPartyAction();
    return;
  }

  /* --- Soutien : soin, apaisement, garde --- */
  if(p.soinAllie){
    const blesse = livingParty().reduce((m,x)=> (x.pv/x.pvMax < m.pv/m.pvMax ? x : m), livingParty()[0]);
    const soin = Math.min(p.soinAllie, blesse.pvMax - blesse.pv);
    blesse.pv += soin;
    logHit(`${a.nom} · ${p.nom}`, soin>0 ? `${blesse.nom} récupère ${soin} PV.` : `${blesse.nom} est déjà au mieux de sa forme.`, 'power');
    afterPartyAction(); return;
  }
  if(p.apaise){
    const eprouve = livingParty().reduce((m,x)=> (x.fat > m.fat ? x : m), livingParty()[0]);
    const avant = eprouve.fat;
    eprouve.fat = Math.max(0, eprouve.fat - p.apaise);
    logHit(`${a.nom} · ${p.nom}`, `${eprouve.nom} retrouve son souffle (−${avant-eprouve.fat} Fatigue).`, 'power');
    afterPartyAction(); return;
  }
  if(p.garde){
    livingParty().forEach(x=>{ x.garde = p.garde; x.gardeTours = (p.gardeTours||2)+1; });
    logHit(`${a.nom} · ${p.nom}`, `Le groupe est protégé (+${p.garde} Défense pendant ${p.gardeTours||2} tours).`, 'power');
    afterPartyAction(); return;
  }

  /* --- Offensif : cible unique, chaîne, ou zone --- */
  let cibles;
  if(p.zone) cibles = livingFoes();
  else if(p.cibles>1) cibles = [currentTarget(), ...livingFoes().filter(f=>f!==currentTarget())].filter(Boolean).slice(0, p.cibles);
  else cibles = [currentTarget()].filter(Boolean);

  if(!cibles.length){ afterPartyAction(); return; }

  cibles.forEach((t, i)=>{
    if(!t || !t.vivant) return;
    const touche = attemptTouch(a.vol+(a.bonusNiveau||0), defenseOf(t));
    if(!touche.hit){
      logHit(`${a.nom} · ${p.nom}`, `Le pouvoir échoue à toucher ${t.nom}. (jet ${touche.total} vs Déf ${defenseOf(t)})`, 'miss');
      return;
    }
    let dmg = p.degBase+rollDice(p.deDeg)+(a.bonusNiveau||0);
    if(touche.crit) dmg = Math.round(dmg*1.5);
    if(i>0 && p.cibles>1) dmg = Math.round(dmg*0.6); // le rebond porte moins fort
    damage(t, dmg);
    let msg = `${dmg} dégâts${touche.crit?' — coup critique !':''} sur ${t.nom}.`;
    if(p.vol){ const heal=Math.min(Math.round(dmg*0.5), a.pvMax-a.pv); a.pv+=heal; if(heal>0) msg+=` ${a.nom} récupère ${heal} PV.`; }
    logHit(`${a.nom} · ${p.nom}`, msg, 'power');
  });
  flashPanel('enemyPanel');
  afterPartyAction();
}

/* Après chaque action : vérifier la fin, sinon passer la main si l'acteur est à sec. */
function afterPartyAction(){
  ensureTarget();
  if(checkEnd()){ renderCombat(); return; }
  const a = activeActor();
  if(a && (a.pa<=0 || !a.vivant)){
    const next = combat.party.findIndex(p=>p.vivant && p.pa>0);
    if(next>=0) combat.actorIdx = next;
  }
  renderCombat();
}

/* ---- Le Sillage ---- */
/* Un adversaire qui a appris à lire l'Onde frappe d'autant plus fort que Yohan
 * l'a brûlée. La mesure est la Fatigue actuelle de Yohan, rapportée à son
 * maximum : à zéro, l'adversaire vaut ses statistiques nominales ; à la
 * Rupture, il vaut son bonus entier. Gagner en vidant ses pouvoirs, c'est le
 * nourrir — c'est tout le sujet du duel. */
function fractionSillage(){
  const y = combat.party.find(p => p.estYohan);
  if(!y || !y.fatMax) return 0;
  return Math.max(0, Math.min(1, y.fat / y.fatMax));
}
function bonusSillage(f, champ){
  if(!f.sillage) return 0;
  return Math.round((f.sillage[champ] || 0) * fractionSillage());
}
/* Ce que l'interface affiche : le degré atteint, dans les mots du registre. */
function degreSillage(){
  const p = fractionSillage();
  if(p <= 0.4) return { nom:'calme',    pct:Math.round(p*100) };
  if(p <= 0.7) return { nom:'tendu',    pct:Math.round(p*100) };
  if(p <= 0.9) return { nom:'critique', pct:Math.round(p*100) };
  return          { nom:'rompu',    pct:Math.round(p*100) };
}

/* ---- Actions des adversaires ---- */

function foeBasicAttack(f, cible){
  const touche = attemptTouch(f.precision + bonusSillage(f, 'precision'), defenseOf(cible));
  if(!touche.hit){ logHit(f.nom, `L'attaque manque ${cible.nom}.`, 'miss'); return; }
  let dmg = f.degBase+rollDice(f.deDeg)+bonusSillage(f, 'degats');
  if(touche.crit) dmg=Math.round(dmg*1.5);
  damage(cible, dmg);
  const sil = f.sillage && bonusSillage(f, 'degats') > 0 ? ` — il frappe dans le souffle (${degreSillage().nom})` : '';
  logHit(f.nom, `${dmg} dégâts${touche.crit?' — critique !':''} infligés à ${cible.nom}${sil}.`, touche.crit?'crit':'hit');
  flashPanel('playerPanel');
}

function foeSpecialAttack(f, cible){
  const touche = attemptTouch(f.precision + bonusSillage(f, 'precision'), defenseOf(cible));
  if(!touche.hit){ logHit(f.nom, `${f.special.nom} manque ${cible.nom}.`, 'miss'); return; }
  let dmg = f.degBase+rollDice(f.deDeg)+bonusSillage(f, 'degats');
  damage(cible, dmg);
  let msg = `${f.special.nom} inflige ${dmg} dégâts à ${cible.nom}.`;
  const nom = f.special.nom.toLowerCase();
  if(nom.includes("venimeux") || nom.includes("poison")){ cible.poison=3; msg+=` ${cible.nom} est empoisonné (3 dégâts/tour, 3 tours).`; }
  if(nom.includes("esprit")){ const s=rollDie(8); cible.vol=Math.max(0,cible.vol-1); f.pv=Math.min(f.pvMax,f.pv+s); msg+=` ${f.nom} se soigne de ${s} PV.`; }
  if(nom.includes("relève")){
    const y = livingParty().find(p => p.estYohan);
    if(y){
      const avant = y.fat;
      y.fat = Math.min(y.fatMax, y.fat + 8);
      msg += ` Il tient le rythme de la respiration de Yohan (Fatigue ${avant} → ${y.fat}).`;
    }
  }
  if(nom.includes("zone") || nom.includes("souffle")){
    livingParty().filter(p=>p!==cible).forEach(p=>{
      const d = Math.round(dmg*0.5); damage(p, d);
      msg += ` ${p.nom} est pris dans le souffle (${d}).`;
    });
  }
  logHit(f.nom, msg, 'power');
  flashPanel('playerPanel');
}

/* ============================= FIN DE COMBAT ============================= */

function checkEnd(){
  if(combat.over) return true;

  if(!livingFoes().length){
    combat.over = true;
    lastCombatVictory = true;
    const yohan = combat.party.find(p=>p.estYohan);

    hero.pv = yohan.pv > 0 ? yohan.pv : 1;
    hero.fat = yohan.fat;
    hero.inventaire = yohan.inventaire;
    hero.pistolet1Charge = true;   // Yohan recharge entre deux affrontements
    hero.pistolet2Charge = true;
    if(yohan.pv<=0) logSystem("Yohan est resté debout de justesse — il repart à 1 PV.");

    adjustSuspicion(5); // un combat, même gagné, se remarque
    const xpGagne = combat.foes.reduce((s,f)=>s + f.danger*12, 0);
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

  if(!livingParty().length){
    combat.over = true;
    lastCombatVictory = false;
    adjustSuspicion(5);
    const dangerMax = Math.max(...combat.foes.map(f=>f.danger||1));
    if(dangerMax <= 2 || combat.sansMort){
      // Menace mineure, ou affrontement dont l'issue est écrite ailleurs :
      // Yohan survit, blessé — pas de mort permanente
      const yohan = combat.party.find(p=>p.estYohan);
      hero.pv = Math.max(1, Math.round(hero.pvMax*0.3));
      hero.fat = yohan ? yohan.fat : hero.fat;
      hero.inventaire = yohan ? yohan.inventaire : hero.inventaire;
      showEnd(false, false, false);
    } else {
      // Menace sérieuse (Danger 3+) : mort permanente, fidèle au pilier du monde
      showEnd(false, false, true);
    }
    saveGame(true);
    return true;
  }
  return false;
}

function showEnd(victory, leveledUp, permadeath){
  document.getElementById('combatScreen').style.display='none';
  const el = document.getElementById('endScreen');
  el.style.display='block';
  el.className = 'end-screen '+(victory?'':'defeat');
  const lvlHtml = leveledUp ? `<p style="color:var(--gold);">Yohan atteint le niveau ${hero.niveau} !</p>` : '';
  const tombes = combat.foes.map(f=>f.nom).join(', ');

  if(victory){
    el.innerHTML = `<h2>Victoire</h2><p>${tombes} — plus rien ne bouge.</p>${lvlHtml}<button class="primary" id="afterCombatBtn">Continuer</button>`;
    document.getElementById('afterCombatBtn').onclick = () => { if(combatReturnTo) combatReturnTo(); else showScreen('monde'); };
  } else if(permadeath){
    el.innerHTML = `<h2>Yohan est mort</h2>
      <p>Le dernier sang connu des Karlsberg s'éteint. Le monde continue, indifférent.</p>
      <div style="text-align:left;max-width:360px;margin:16px auto;font-family:'Inter',sans-serif;font-size:12.5px;color:var(--parchment-dim);">
        <div>Niveau atteint : <b style="color:var(--gold);">${hero.niveau}</b></div>
        <div>Chapitre de la quête : <b style="color:var(--gold);">${TRAME_CHAPITRES[hero.trame.chapitre].titre}</b></div>
        <div>Or amassé : <b style="color:var(--gold);">${hero.or}</b></div>
        <div>Compagnons : <b style="color:var(--gold);">${hero.compagnons.map(c=>c.nom).join(', ')||'aucun'}</b></div>
      </div>
      <button class="primary" id="afterCombatBtn">Nouvelle partie</button>`;
    document.getElementById('afterCombatBtn').onclick = resetGame;
  } else {
    el.innerHTML = `<h2>Retraite</h2><p>Le groupe décroche de justesse, blessé mais vivant.</p><button class="primary" id="afterCombatBtn">Continuer</button>`;
    document.getElementById('afterCombatBtn').onclick = () => { if(combatReturnTo) combatReturnTo(); else showScreen('monde'); };
  }
}

/* ============================= RENDU ============================= */

function fighterCard(c, idx, role){
  const pvPct  = Math.max(0, 100*c.pv/c.pvMax);
  const zone   = fatZone(c.fat);
  const cls    = ['fighter', role, c.vivant ? '' : 'down'].filter(Boolean).join(' ');
  const meta   = c.side==='foe'
    ? `Danger ${c.danger} · Déf ${defenseOf(c)}`
    : `${c.pa}/${c.paMax} PA · Déf ${defenseOf(c)}`;
  const tags = [];
  if(c.poison>0) tags.push(`<span class="f-tag warn">Poison ${c.poison}</span>`);
  if(c.garde>0)  tags.push(`<span class="f-tag">Garde +${c.garde}</span>`);
  if(c.side==='foe' && c.special) tags.push(`<span class="f-tag warn">${c.special.nom}</span>`);
  // Le Sillage doit se voir : une règle de combat invisible est un piège.
  if(c.side==='foe' && c.sillage){
    const d = degreSillage();
    const bp = bonusSillage(c, 'precision'), bd = bonusSillage(c, 'degats');
    tags.push(`<span class="f-tag sillage">Sillage · ${d.nom} · +${bp} touche, +${bd} dégâts</span>`);
  }
  if(c.side==='party' && !c.estYohan) tags.push(`<span class="f-tag">${c.arbre==='elfique'?'Magie ancienne':'Onde'}</span>`);

  const fatBar = c.side==='party'
    ? `<div class="f-bar fat ${zone.cls}"><i style="width:${Math.max(0,c.fat)}%"></i></div>`
    : '';

  // Le visage de celui qu'on frappe : un combat écrit met des gens en face.
  const face = c.portrait ? artPortraitImg(c.portrait, 'f-face') : '';

  return `<div class="${cls}" data-idx="${idx}" data-side="${c.side}">
    <div class="f-top">${face}<span class="f-nom">${c.nom}</span><span class="f-meta">${c.pv}/${c.pvMax} PV</span></div>
    <div class="f-bar pv"><i style="width:${pvPct}%"></i></div>
    ${fatBar}
    <div class="f-top" style="margin-top:4px;"><span class="f-meta">${meta}</span></div>
    ${tags.length?`<div class="f-tags">${tags.join('')}</div>`:''}
  </div>`;
}

function renderCombat(){
  if(!combat) return;

  // --- Groupe ---
  const pl = document.getElementById('partyList');
  pl.innerHTML = combat.party.map((p,i)=>fighterCard(p, i, i===combat.actorIdx ? 'active' : '')).join('');
  pl.querySelectorAll('.fighter').forEach(el=>{
    el.onclick = () => setActor(parseInt(el.dataset.idx,10));
  });

  // --- Adversaires ---
  const fl = document.getElementById('foeList');
  fl.innerHTML = combat.foes.map((f,i)=>fighterCard(f, i, i===combat.targetIdx && f.vivant ? 'target' : '')).join('');
  fl.querySelectorAll('.fighter').forEach(el=>{
    el.onclick = () => setTarget(parseInt(el.dataset.idx,10));
  });

  const a = activeActor();
  document.getElementById('actorName').textContent = a ? a.nom : '—';

  // --- PA de l'acteur actif ---
  const pips = document.getElementById('paPips'); pips.innerHTML='';
  if(a) for(let i=0;i<a.paMax;i++){
    const d=document.createElement('div'); d.className='pip'+(i<a.pa?' filled':''); d.textContent=i+1; pips.appendChild(d);
  }

  // --- Armes / actions de base ---
  const wa = document.getElementById('weaponActions'); wa.innerHTML='';
  const t = currentTarget();
  const bloque = !a || !a.vivant || combat.over || !t || !t.vivant;

  if(a && a.estYohan){
    wa.appendChild(makeActionBtn(`Pistolet 1 ${a.pistolet1Charge?'(chargé)':'(vide)'}`,'1 PA',()=>actorAttack('pistolet1'), bloque||a.pa<1||!a.pistolet1Charge));
    if(!a.pistolet1Charge) wa.appendChild(makeActionBtn('Recharger pistolet 1','1 PA',()=>actorRecharge('pistolet1Charge'), !a||a.pa<1));
    wa.appendChild(makeActionBtn(`Pistolet 2 ${a.pistolet2Charge?'(chargé)':'(vide)'}`,'1 PA',()=>actorAttack('pistolet2'), bloque||a.pa<1||!a.pistolet2Charge));
    if(!a.pistolet2Charge) wa.appendChild(makeActionBtn('Recharger pistolet 2','1 PA',()=>actorRecharge('pistolet2Charge'), !a||a.pa<1));
    wa.appendChild(makeActionBtn('Attaque légère (épée)','1 PA',()=>actorAttack('epee_legere'), bloque||a.pa<1));
    wa.appendChild(makeActionBtn('Attaque lourde (épée)','2 PA',()=>actorAttack('epee_lourde'), bloque||a.pa<2));
  } else if(a){
    wa.appendChild(makeActionBtn('Attaque','1 PA',()=>actorAttack('simple'), bloque||a.pa<1));
  }
  if(a) wa.appendChild(makeActionBtn('Se concentrer (−5 Fatigue)','1 PA',()=>actorConcentrate(), !a.vivant||combat.over||a.pa<1));

  (a && a.inventaire || []).filter(e=>{const it=itemById(e.itemId); return it && it.type==='consommable' && e.qty>0;}).forEach(entry=>{
    const item = itemById(entry.itemId);
    wa.appendChild(makeActionBtn(`Utiliser : ${item.nom} (×${entry.qty})`, '1 PA', ()=>actorUseItem(entry.uid), !a.vivant||combat.over||a.pa<1));
  });

  // --- Pouvoirs de l'acteur actif ---
  const pa2 = document.getElementById('powerActions'); pa2.innerHTML='';
  if(a){
    const zoneAct = fatZone(a.fat);
    (a.pouvoirs||[]).map(powerById).filter(p=>p && !p.passive).forEach(p=>{
      const proj = Math.round(p.coutFAT*zoneAct.mult);
      const soutien = p.soinAllie || p.apaise || p.garde;
      const disabled = combat.over || !a.vivant || a.pa<p.coutPA || (!soutien && (!t || !t.vivant));
      const portee = p.zone ? ' · tous' : (p.cibles>1 ? ` · ${p.cibles} cibles` : '');
      pa2.appendChild(makeActionBtn(p.nom, `${p.coutPA} PA · +${proj} FAT${portee}`, ()=>actorPower(p.id), disabled, true));
    });
    if(!pa2.children.length){
      pa2.innerHTML = `<p style="font-family:'Inter',sans-serif;font-size:11px;color:var(--parchment-dim);">Aucun pouvoir actif.</p>`;
    }
  }

  const btn = document.getElementById('endTurnBtn');
  btn.disabled = combat.over;
  const restants = combat.party.filter(p=>p.vivant && p.pa>0).length;
  btn.textContent = restants>1 ? `Terminer le tour (${restants} membres ont encore des PA)` : 'Terminer le tour';
}

function makeActionBtn(label, cost, onClick, disabled, isPower){
  const b = document.createElement('button');
  b.className = 'act'+(isPower?' power':'');
  b.disabled = !!disabled;
  b.innerHTML = `<span>${label}</span><span class="cost">${cost}</span>`;
  b.onclick = onClick;
  return b;
}

function flashPanel(id){
  const p=document.getElementById(id);
  if(!p) return;
  p.classList.remove('shake'); void p.offsetWidth; p.classList.add('shake','flash-red');
}

function logSystem(msg){ const box=document.getElementById('logBox'); const p=document.createElement('p'); p.innerHTML=`<span class="tag system">Système</span>${msg}`; box.appendChild(p); box.scrollTop=box.scrollHeight; }
function logHit(actor,msg,cls){ const box=document.getElementById('logBox'); const p=document.createElement('p'); p.innerHTML=`<span class="tag">${actor}</span><span class="${cls}">${msg}</span>`; box.appendChild(p); box.scrollTop=box.scrollHeight; }
