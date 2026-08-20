/* PARIAS — Déroulement des événements
 *
 * Deux systèmes cohabitent :
 *   1. les événements ÉCRITS (events_written.js) — arbres de scènes, illustrés,
 *      avec des choix qui mènent à des suites différentes. Tirés en priorité,
 *      et jamais deux fois tant que le catalogue applicable n'est pas épuisé.
 *   2. les variantes GÉNÉRÉES (events.js) — remplissage, une seule scène,
 *      résolue par un jet de caractéristique.
 */

/* ============================= ÉVÉNEMENTS ÉCRITS ============================= */

let ecritState = null;   // { ev, lieu, retourEcran, dernierJet }

function heroFlags(){ if(!hero.flags) hero.flags = []; return hero.flags; }
function heroVus(){ if(!hero.evenementsVus) hero.evenementsVus = []; return hero.evenementsVus; }
function hasFlag(f){ return heroFlags().includes(f); }

/* Un événement est applicable au lieu courant — soit explicitement (champ
 * `lieux`), soit par la famille d'événements acceptée par ce lieu. */
function eventApplicable(ev, lieu){
  if(ev.lieux) return !!lieu && ev.lieux.includes(lieu.id);
  if(!lieu) return true;
  return lieu.familles_evenements_compatibles.includes(ev.famille);
}

/* Conditions d'apparition d'un événement (rencontres et trame surtout).
 * Évaluées au tirage, pas au clic : un événement dont les conditions ne sont
 * pas réunies n'apparaît simplement jamais. */
function conditionsRemplies(req){
  if(!req) return true;
  if(req.chapitreMin  !== undefined && hero.trame.chapitre < req.chapitreMin) return false;
  if(req.chapitreMax  !== undefined && hero.trame.chapitre > req.chapitreMax) return false;
  if(req.sangMin      !== undefined && hero.trame.points   < req.sangMin) return false;
  if(req.niveauMin    !== undefined && hero.niveau         < req.niveauMin) return false;
  if(req.suspicionMin !== undefined && hero.suspicion      < req.suspicionMin) return false;
  if(req.suspicionMax !== undefined && hero.suspicion      > req.suspicionMax) return false;
  if(req.renomMin     !== undefined && renomActuel() < req.renomMin) return false;
  if(req.compagnon    && !hero.compagnons.some(c=>c.id===req.compagnon)) return false;
  if(req.affinite     && affiniteAvec(req.affinite.qui) < req.affinite.min) return false;
  // Crise d'un peuple : c'est la simulation du monde qui décide de l'heure,
  // pas la progression du joueur.
  if(req.tensionMin){
    const t = (hero.tensions || {})[req.tensionMin.peuple];
    if(t === undefined || t < req.tensionMin.n) return false;
  }
  if(req.flags        && !req.flags.every(f=>hasFlag(f))) return false;
  if(req.sansFlags    && req.sansFlags.some(f=>hasFlag(f))) return false;
  return true;
}

/* Catalogue tirable en explorant : événements de lieu + rencontres dont les
 * conditions sont réunies. La trame n'y figure pas — elle se déclenche seule. */
function catalogueExploration(){
  return EVENTS_WRITTEN.concat(EVENTS_RENCONTRE.filter(e=>conditionsRemplies(e.requis)));
}

function pickWrittenEvent(lieu){
  const vus = heroVus();
  const applicables = catalogueExploration().filter(e => eventApplicable(e, lieu));
  const frais = applicables.filter(e => !vus.includes(e.id));
  if(!frais.length) return null;          // catalogue épuisé ici → repli sur les générés
  // Une rencontre disponible passe avant un événement de lieu : ces gens-là ne
  // repassent pas deux fois, et croiser une figure du monde vaut mieux qu'un
  // énième bandit de route.
  const rencontres = frais.filter(e=>e.id.startsWith('RC_'));
  const pool = (rencontres.length && Math.random() < 0.55) ? rencontres : frais;
  return pool[Math.floor(Math.random()*pool.length)];
}

function openWrittenEvent(ev, lieu){
  ecritState = {
    ev, lieu,
    retourEcran: lieu ? 'lieu' : 'monde',
    dernierJet: null,
  };
  const vus = heroVus();
  if(!vus.includes(ev.id)) vus.push(ev.id);
  renderScene('start');
}

/* ---- Conditions d'accès à un choix ---- */
function choixVerrou(choix){
  const r = choix.requis;
  if(!r) return null;
  if(r.pouvoir && !hero.unlocked.has(r.pouvoir)){
    const p = powerById(r.pouvoir);
    return `Requiert : ${p ? p.nom : r.pouvoir}`;
  }
  if(r.or !== undefined && hero.or < r.or) return `Requiert ${r.or} or (vous en avez ${hero.or})`;
  if(r.objet && !hero.inventaire.some(e=>e.itemId===r.objet && e.qty>0)){
    const it = itemById(r.objet);
    return `Requiert : ${it ? it.nom : r.objet}`;
  }
  if(r.flag && !hasFlag(r.flag)) return `Hors de portée pour l'instant`;
  if(r.sansFlag && hasFlag(r.sansFlag)) return `Ce n'est plus possible`;
  if(r.renomMin !== undefined && (hero.renom || 0) < r.renomMin)
    return `Requiert ${r.renomMin} de Renom (vous en avez ${hero.renom || 0})`;
  if(r.compagnon && !hero.compagnons.some(c => c.id === r.compagnon))
    return `Requiert la présence d'un compagnon`;
  return null;
}

/* ---- Application des effets, et étiquettes à afficher ---- */
function applyEffets(e){
  if(!e) return [];
  const tags = [];
  if(e.or){
    hero.or = Math.max(0, hero.or + e.or);
    tags.push(`<span class="reward-tag${e.or<0?' neg':''}">${e.or>0?'+':'−'}${Math.abs(e.or)} or</span>`);
  }
  if(e.xp){ gainXP(e.xp); tags.push(`<span class="reward-tag">+${e.xp} XP</span>`); }
  if(e.pv){
    hero.pv = Math.max(1, Math.min(hero.pvMax, hero.pv + e.pv));
    tags.push(`<span class="reward-tag${e.pv<0?' neg':''}">${e.pv>0?'+':'−'}${Math.abs(e.pv)} PV</span>`);
  }
  if(e.fat){
    hero.fat = Math.max(0, Math.min(hero.fatMax, hero.fat + e.fat));
    tags.push(`<span class="reward-tag${e.fat>0?' neg':''}">${e.fat>0?'+':'−'}${Math.abs(e.fat)} Fatigue</span>`);
  }
  if(e.suspicion){
    adjustSuspicion(e.suspicion);
    tags.push(`<span class="reward-tag${e.suspicion>0?' neg':''}">${e.suspicion>0?'+':'−'}${Math.abs(e.suspicion)} Suspicion</span>`);
  }
  if(e.sang){ gainPointsSang(e.sang); tags.push(`<span class="reward-tag">+${e.sang} sang</span>`); }
  if(e.item){
    const it = itemById(e.item);
    if(it){
      const ex = hero.inventaire.find(x=>x.itemId===it.id);
      if(ex) ex.qty++; else hero.inventaire.push({uid: it.id+'_'+Date.now(), itemId:it.id, qty:1});
      tags.push(`<span class="reward-tag">${it.nom}</span>`);
    }
  }
  if(e.renom){ ajusterRenom(e.renom); tags.push(`<span class="reward-tag${e.renom<0?' neg':''}">${e.renom>0?'+':'−'}${Math.abs(e.renom)} Renom</span>`); }
  if(e.affinite){
    ajusterAffinite(e.affinite.qui, e.affinite.n);
    tags.push(`<span class="reward-tag">Lien resserré</span>`);
  }
  if(e.flag && !hasFlag(e.flag)) heroFlags().push(e.flag);
  (e.flags || []).forEach(f => { if(!hasFlag(f)) heroFlags().push(f); });
  return tags;
}

const STAT_NOMS = { agi:"Agilité", precision:"Précision", vol:"Volonté" };

function renderScene(sceneId){
  const { ev, lieu } = ecritState;
  const sc = ev.scenes[sceneId];
  if(!sc){ console.warn('Scène introuvable :', ev.id, sceneId); closeEventModal(); return; }
  ecritState.sceneId = sceneId;

  // Une scène de combat peut être atteinte au retour de l'écran d'affrontement
  showScreen(ecritState.retourEcran);

  const tags = applyEffets(sc.effets);
  const box = document.getElementById('eventModalBox');

  let html = artEventBanner(ev.image, ev.famille);
  html += `<span class="event-tag">${ev.famille} · ${ev.rarete}${lieu?' · '+lieu.nom:''}</span>`;
  if(sceneId === 'start') html += `<h3>${ev.titre}</h3>`;
  if(sc.pnj) html += artPortraitCard(sc.pnj);
  if(ecritState.dernierJet){ html += ecritState.dernierJet; ecritState.dernierJet = null; }
  html += sc.texte.map(p=>`<p class="narrative">${p}</p>`).join('');
  if(tags.length) html += `<div class="reward-tags">${tags.join('')}</div>`;

  // --- Scène de bataille rangée ---
  if(sc.bataille){
    const def = BATTLES[sc.bataille.def];
    const armee = (hero.armee||[]).filter(u=>u.effectif>0);
    const hommes = armee.reduce((n,u)=>n+u.effectif, 0);
    html += `<p class="mech-line">Bataille rangée · votre armée compte ${armee.length} unité(s), ${hommes} hommes.</p>`;
    if(!armee.length){
      html += `<p class="narrative fail">Yohan n'a aucune troupe. Une bataille rangée ne se mène pas seul — passez par l'écran <b>Armée</b> pour lever des hommes.</p>
        <div style="margin-top:16px;text-align:right;"><button class="primary" id="scRetourBtn">Revenir</button></div>`;
      box.innerHTML = html;
      document.getElementById('eventModal').style.display='flex';
      document.getElementById('scRetourBtn').onclick = closeEventModal;
      return;
    }
    html += `<div style="margin-top:16px;text-align:right;"><button class="primary" id="scBatailleBtn">Prendre le commandement</button></div>`;
    box.innerHTML = html;
    document.getElementById('eventModal').style.display='flex';
    document.getElementById('scBatailleBtn').onclick = () => {
      closeEventModal();
      const suiteV = sc.bataille.victoire, suiteD = sc.bataille.defaite;
      startBattle(def, (gagnee) => renderScene(gagnee ? suiteV : suiteD));
    };
    return;
  }

  // --- Scène de combat ---
  if(sc.combat){
    html += `<div style="margin-top:16px;text-align:right;"><button class="primary" id="scCombatBtn">Engager le combat</button></div>`;
    box.innerHTML = html;
    document.getElementById('eventModal').style.display='flex';
    document.getElementById('scCombatBtn').onclick = () => {
      closeEventModal();
      const suiteV = sc.combat.victoire, suiteD = sc.combat.defaite;
      combatReturnTo = () => {
        if(lastCombatVictory && suiteV) renderScene(suiteV);
        else if(!lastCombatVictory && suiteD) renderScene(suiteD);
        else { closeEventModal(); showScreen(ecritState.retourEcran); }
      };
      // Une scène de combat définit déjà ce qui arrive en cas de défaite : on
      // désactive la mort permanente, sauf si l'événement la réclame (mortel:true).
      startCombat(sc.combat.groupe, undefined, { sansMort: !sc.combat.mortel });
    };
    return;
  }

  // --- Scène terminale ---
  if(!sc.choix || !sc.choix.length){
    html += `<div style="margin-top:18px;text-align:right;"><button class="primary" id="scFinBtn">Continuer</button></div>`;
    box.innerHTML = html;
    document.getElementById('eventModal').style.display='flex';
    document.getElementById('scFinBtn').onclick = () => {
      renderPersonnage(); renderQuete(); closeEventModal(); saveGame(true);
    };
    return;
  }

  // --- Scène à choix ---
  html += `<div class="choix-list" id="scChoix"></div>`;
  box.innerHTML = html;
  document.getElementById('eventModal').style.display='flex';

  const cl = document.getElementById('scChoix');
  sc.choix.forEach(choix=>{
    const verrou = choixVerrou(choix);
    const b = document.createElement('button');
    if(verrou) b.className = 'locked';
    b.innerHTML = `<span class="ch-label">${choix.label}</span>` +
                  (verrou ? `<span class="ch-detail">${verrou}</span>`
                          : (choix.detail ? `<span class="ch-detail">${choix.detail}</span>` : ''));
    if(verrou){ b.disabled = true; cl.appendChild(b); return; }

    b.onclick = () => {
      applyEffets(choix.effets);
      if(choix.test){
        const stat = hero[choix.test.stat] || 0;
        const roll = rollDie(20);
        const total = roll + stat;
        const reussi = total >= choix.test.dc;
        ecritState.dernierJet = `<p class="mech-line">« ${choix.label} » — jet de ${STAT_NOMS[choix.test.stat]||choix.test.stat} : ${roll}+${stat} = ${total} (seuil ${choix.test.dc}) → ${reussi?'réussite':'échec'}</p>`;
        renderScene(reussi ? choix.reussite : choix.echec);
      } else {
        renderScene(choix.suite);
      }
    };
    cl.appendChild(b);
  });
}

/* ============================= ÉVÉNEMENTS GÉNÉRÉS (repli) ============================= */

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
  box.innerHTML = `${artEventBanner('evt_'+ev.famille.toLowerCase(), ev.famille)}
    <span class="event-tag">${ev.famille} · ${ev.rarete}${lieu?' · '+lieu.nom:''}</span>
    <h3>${ev.titre}</h3>
    ${buildNarrativeBlock(ev, lieu)}
    <div class="choix-list" id="choixList"></div>`;
  document.getElementById('eventModal').style.display='flex';
  const cl = document.getElementById('choixList');
  ev.choix.forEach((label, idx)=>{
    const btn = document.createElement('button');
    btn.innerHTML = `<span class="ch-label">${label}</span>`;
    btn.onclick = () => {
      // On se fie à l'indicateur peut_declencher_affrontement (ev.combat), plus fiable
      // que la famille d'issue seule (certains "traque" ne combattent pas, certains
      // "escorte"/"enquête" le peuvent).
      if(idx===0 && ev.combat){
        const zoneRef = lieu || {danger_range:{min:1,max:3}};
        const groupe = pickEnemyGroupForZone(zoneRef, ev.rarete);
        closeEventModal();
        combatReturnTo = () => { if(lieu) openLieu(lieu); else showScreen('monde'); };
        startCombat(groupe);
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
  // Les rencontres aléatoires restent bornées au Danger raisonnable pour le niveau de
  // Yohan (+1 de marge) — les contrats, choisis consciemment et prévisualisés, non.
  const plafondNiveau = dangerRecommande(hero.niveau) + 1;
  const hiAjuste = Math.min(hi, plafondNiveau);
  let pool = BESTIARY_FULL.filter(b=>b.danger>=lo && b.danger<=hiAjuste);
  if(!pool.length) pool = BESTIARY_FULL.filter(b=>b.danger<=hiAjuste);
  if(!pool.length) pool = BESTIARY_FULL.filter(b=>b.danger<=hi);
  if(!pool.length) pool = BESTIARY_FULL;
  return pool[Math.floor(Math.random()*pool.length)];
}

/* Compose un groupe : les créatures faibles viennent en nombre, les fortes seules.
 * Le groupe grossit aussi avec la taille du groupe de Yohan, pour rester tendu. */
function pickEnemyGroupForZone(lieu, rarete){
  const chef = pickEnemyForZone(lieu, rarete);
  const renfortsPossibles = Math.max(0, 4 - chef.danger);      // Danger 1 → 3 ; Danger 4+ → 0
  const bonusGroupe = Math.max(0, (hero.compagnons||[]).filter(c=>c.combat).length);
  const n = 1 + Math.min(renfortsPossibles, Math.floor(Math.random()*(1+renfortsPossibles)) + bonusGroupe);
  return [{ bst: chef.id, n: Math.min(n, 4) }];
}


/* ============================= AFFINITÉS ============================= */
/* Le lien avec quelqu'un ne monte que par des choix — jamais par le temps. */
function heroAffinites(){
  if(!hero.affinites) hero.affinites = { ...AFFINITES_DEPART };
  return hero.affinites;
}
function affiniteAvec(qui){ const a = heroAffinites(); return a[qui] || 0; }
function ajusterAffinite(qui, n){
  const a = heroAffinites();
  a[qui] = Math.max(0, (a[qui]||0) + n);
}

/* ============================= TRAME PRINCIPALE ============================= */
/*
 * Les jalons de l'histoire ne se cherchent pas : ils se débloquent. À chaque fin
 * de tour, on regarde si l'un d'eux a ses conditions réunies — et le premier
 * disponible se déclenche de lui-même.
 *
 * Si une modale occupe déjà l'écran (repos, changement de chapitre, événement en
 * cours), le déclenchement attend qu'elle se referme plutôt que de l'écraser.
 */

let tramePending = false;

/* Trois fils, dans cet ordre : la trame principale, puis celui qui poursuit
 * Yohan, puis l'intime. Les seuils du Livré tombent entre ceux de la trame — il
 * revient donc dans les tours où l'histoire respire, et jamais à sa place. */
function trameDisponible(){
  return EVENTS_TRAME.find(ev => conditionsRemplies(ev.requis))
      || EVENTS_NEMESIS.find(ev => conditionsRemplies(ev.requis))
      || EVENTS_ROMANCE.find(ev => conditionsRemplies(ev.requis))
      || null;
}

function modaleOuverte(){
  const m = document.getElementById('eventModal');
  return !!m && m.style.display === 'flex';
}

/* Appelé en fin de tour : arme le déclencheur, puis tente de le résoudre. */
function armerTrame(){
  tramePending = true;
  resoudreTrameEnAttente();
}

function resoudreTrameEnAttente(){
  if(!tramePending || modaleOuverte()) return false;
  tramePending = false;
  const ev = trameDisponible();
  if(!ev) return false;
  openWrittenEvent(ev, LOCATIONS.find(l=>l.id===hero.position) || null);
  return true;
}

/* Un jalon est joué dès que le marqueur qu'il pose est présent. */
function trameJouee(ev){
  const marqueurs = (ev.requis && ev.requis.sansFlags) || [];
  return marqueurs.some(f => hasFlag(f));
}

/* Compte des jalons de la trame, pour l'écran de quête. */
function trameProgres(){
  const total = EVENTS_TRAME.length;
  const faits = EVENTS_TRAME.filter(trameJouee).length;
  const prochain = EVENTS_TRAME.find(ev => !trameJouee(ev)) || null;
  const romTotal = EVENTS_ROMANCE.length;
  const romFaits = EVENTS_ROMANCE.filter(trameJouee).length;
  const nemTotal = EVENTS_NEMESIS.length;
  const nemFaits = EVENTS_NEMESIS.filter(trameJouee).length;
  return { total, faits, prochain, romTotal, romFaits, nemTotal, nemFaits,
           debloque: !!trameDisponible() };
}

/* ============================= CONTRATS SPÉCIAUX ============================= */
/* Campagnes et affaires personnelles : proposées sur l'écran Contrats, jouées
 * comme des événements écrits. */
function contratsSpeciauxDisponibles(categorie){
  return CONTRATS_SPECIAUX.filter(c =>
    (!categorie || c.categorie === categorie) && conditionsRemplies(c.requis));
}

function ouvrirContratSpecial(id){
  const c = CONTRATS_SPECIAUX.find(x=>x.id===id);
  if(!c) return;
  ecritState = { ev:c, lieu:null, retourEcran:'contrats', dernierJet:null };
  renderScene('start');
}
