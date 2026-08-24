/* PARIAS — Moteur politique
 *
 * Ce que fait ce fichier, tour après tour :
 *   1. il fait bouger l'influence des six puissances selon l'état du monde et
 *      selon ce que le joueur a fait ;
 *   2. il calcule leur posture envers Yohan, qui décide de ce qu'on lui propose
 *      et de qui lui tombe dessus ;
 *   3. il déclenche les édits — des décisions qui changent réellement quelque
 *      chose — et les fait remonter dans le pli du tour ;
 *   4. il dit, en clair, qui est en train de gagner. Parce que celui qui gagne
 *      donnera son nom au Second Empire.
 */

function heroPolitique(){
  if(!hero.politique) hero.politique = { influence:{}, edits:[], choc:1 };
  const p = hero.politique;
  if(!p.influence) p.influence = {};
  if(!p.edits) p.edits = [];
  if(p.choc === undefined) p.choc = 1;
  POUVOIRS.forEach(x => { if(p.influence[x.id] === undefined) p.influence[x.id] = x.depart; });
  return p;
}

function influencePouvoir(id){ return heroPolitique().influence[id] || 0; }

/* La posture, ramenée sur une échelle lisible. */
const POSTURES = [
  { min:-100, id:'guerre',  nom:"Vous veut mort",   note:"Ils ne cherchent plus à comprendre ce que vous êtes." },
  { min:-45,  id:'hostile', nom:"Hostile",          note:"On vous refuse tout, et on écrit votre nom quelque part." },
  { min:-15,  id:'froid',   nom:"Méfiant",          note:"On vous tolère parce qu'on n'a pas encore de raison de faire autrement." },
  { min:15,   id:'interet', nom:"Vous surveille",   note:"On vous trouve utile, ce qui n'est pas la même chose qu'ami." },
  { min:45,   id:'appui',   nom:"Vous soutient",    note:"On vous ouvre des portes, et on attendra quelque chose en retour." },
  { min:80,   id:'allie',   nom:"Vous appartient",  note:"Votre cause est devenue la leur, ou l'inverse." },
];
function postureDe(id){
  const p = pouvoirParId(id);
  if(!p) return POSTURES[2];
  const n = Math.max(-100, Math.min(100, p.posture()));
  let r = POSTURES[0];
  POSTURES.forEach(x => { if(n >= x.min) r = x; });
  return { ...r, valeur: Math.round(n) };
}

/* Qui l'emporte, si rien ne change. */
function puissanceDominante(){
  const pol = heroPolitique();
  return POUVOIRS.slice().sort((a, b) => pol.influence[b.id] - pol.influence[a.id])[0];
}

/* ============================= LE TOUR POLITIQUE ============================= */
/* Appelé une fois par tour, depuis advanceTime. Rend les lignes à afficher dans
 * le pli. */
function politiqueTick(semaines){
  const pol = heroPolitique();
  const lignes = [];
  const facteur = Math.max(1, semaines) / 4;   // la dérive est mensuelle

  POUVOIRS.forEach(p => {
    let d = 0;
    try { d = p.derive(); } catch(e){ d = 0; }
    pol.influence[p.id] = Math.max(0, Math.min(100, pol.influence[p.id] + d * facteur));
  });

  // Le choc des prix se résorbe : une crise ne dure pas éternellement.
  pol.choc = pol.choc + (1 - pol.choc) * 0.25;
  if(Math.abs(pol.choc - 1) < 0.01) pol.choc = 1;

  const edit = editDisponible();
  if(edit) lignes.push(appliquerEdit(edit));

  return lignes;
}

function editConditionsOk(e){
  if(heroPolitique().edits.includes(e.id)) return false;
  if(influencePouvoir(e.pouvoir) < (e.influenceMin || 0)) return false;
  if(e.requis && e.requis.tension){
    for(const [k, n] of Object.entries(e.requis.tension))
      if(((hero.tensions || {})[k] || 0) < n) return false;
  }
  if(e.requis && e.requis.flags && !e.requis.flags.every(f => hasFlag(f))) return false;
  return true;
}

function editDisponible(){
  const prets = EDITS.filter(editConditionsOk);
  if(!prets.length) return null;
  // Un édit par tour au plus, et pas systématiquement : la politique est lente.
  if(Math.random() > 0.45) return null;
  return prets[Math.floor(Math.random() * prets.length)];
}

function appliquerEdit(e){
  const pol = heroPolitique();
  pol.edits.push(e.id);
  const f = e.effet || {};
  if(f.suspicion) adjustSuspicion(f.suspicion);
  if(f.renom) ajusterRenom(f.renom);
  if(f.prixChoc) pol.choc = f.prixChoc;
  for(const [k, n] of Object.entries(f.reputation || {})) ajusterReputation(k, n);
  for(const [k, n] of Object.entries(f.tension || {})){
    if(hero.tensions && hero.tensions[k] !== undefined)
      hero.tensions[k] = Math.max(0, Math.min(100, hero.tensions[k] + n));
  }
  if(f.chronique && hero.chroniques){
    const d = dateFromSemaines(hero.temps ? hero.temps.semaines : 0);
    hero.chroniques.push({ date:`${d.saison}, An ${d.an}`, texte: '⚖ ' + f.chronique });
  }

  const p = pouvoirParId(e.pouvoir);
  return { edit:e, pouvoir:p, texte:`<b>${p ? p.nom : ''} — ${e.titre}.</b> ${e.texte}` };
}

/* Le choc politique se répercute sur les prix, comme le reste. */
function politiquePrixMult(){ return heroPolitique().choc || 1; }

/* ============================= L'ÉCRAN ============================= */

function renderPolitique(){
  const bloc = document.getElementById('politiqueGrid');
  if(!bloc) return;
  const pol = heroPolitique();
  const dom = puissanceDominante();

  const tete = document.getElementById('politiqueTete');
  if(tete){
    tete.innerHTML = dom.joueur
      ? `Aucune puissance humaine ne domine plus nettement que <b>Karlsberg</b>. C'est absurde, et c'est vrai.`
      : `Si rien ne change, le Second Empire portera le nom de <b>${dom.nom}</b>.`;
  }

  bloc.innerHTML = POUVOIRS.map(p => {
    const inf = Math.round(pol.influence[p.id] || 0);
    const po = postureDe(p.id);
    return `<div class="pouv${p.joueur ? ' pouv-nous' : ''} pouv-${po.id}">
      <div class="pouv-tete"><span class="pouv-nom">${p.nom}</span><span class="pouv-inf">${inf}</span></div>
      <div class="pouv-meneur">${p.meneur}</div>
      <div class="pouv-jauge"><i style="width:${inf}%"></i></div>
      <p class="pouv-credo">« ${p.credo} »</p>
      <div class="pouv-posture">${p.joueur ? "C'est vous." : `${po.nom} — ${po.note}`}</div>
    </div>`;
  }).join('');

  const hist = document.getElementById('politiqueEdits');
  if(hist){
    const faits = pol.edits.map(id => EDITS.find(e => e.id === id)).filter(Boolean);
    hist.innerHTML = faits.length
      ? faits.slice().reverse().map(e => {
          const p = pouvoirParId(e.pouvoir);
          return `<li><b>${p ? p.nom : ''} — ${e.titre}</b><br><span>${e.texte}</span></li>`;
        }).join('')
      : `<li class="pol-rien">Rien n'a encore été décidé. Ce qui ne veut pas dire que rien ne se prépare.</li>`;
  }
}
