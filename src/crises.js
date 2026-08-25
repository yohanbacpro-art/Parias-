/* PARIAS — Le moteur des crises régionales
 *
 * Ce qui existait avant : huit nombres qui montaient de 3 à 10 au hasard une
 * fois par saison et qui, en franchissant 90, imprimaient une ligne. Le monde
 * ne vivait pas : il tirait aux dés.
 *
 * Ce qui existe maintenant : cinq crises, cinq étapes nommées chacune,
 * franchies dans l'ordre. Ce qui les pousse se lit dans l'état réel de la
 * partie (`pression()` dans src/data/crises.js) — jamais dans un tirage.
 *
 * Le hasard n'a plus qu'un seul rôle, et il est mince : l'ordre dans lequel
 * deux crises également mûres franchissent leur palier le même trimestre. Une
 * partie ne se rejoue donc pas à l'identique, mais elle ne dérive jamais sans
 * raison.
 *
 * COMPATIBILITÉ. `hero.tensions` ne disparaît pas : il est **dérivé** de l'état
 * des crises à chaque tick (voir syncTensions). Tout ce qui le lisait — les
 * édits politiques, les conditions `tensionMin` des événements écrits, les
 * verdicts d'épilogue — continue de fonctionner sans une ligne de changement,
 * mais lit désormais un monde qui a des raisons.
 */

/* ============================= L'ÉTAT ============================= */

function heroCrises(){
  if(!hero.crises) hero.crises = {};
  for(const c of CRISES){
    if(!hero.crises[c.id]) hero.crises[c.id] = { palier:0, pression:0, causes:[] };
  }
  return hero.crises;
}

/* Le palier atteint : 0 tant que rien n'a commencé, 1 à 5 ensuite. */
function criseEtape(id){
  const e = (hero.crises || {})[id];
  return e ? e.palier : 0;
}

/* Le nom de l'étape en cours — c'est ce qu'on montre, jamais le nombre. */
function criseEtapeNom(id){
  const c = CRISE_PAR_ID(id);
  const n = criseEtape(id);
  if(!c) return '';
  return n === 0 ? c.veille : c.paliers[n - 1].nom;
}

function criseFinie(id){ return criseEtape(id) >= 5; }

/* Ce qu'une scène écrite peut faire à une crise : la pousser ou la freiner.
 * On agit sur la pression, jamais sur le palier — on accélère l'Histoire, on
 * ne la saute pas. */
function crisePousser(id, n){
  const e = heroCrises()[id];
  if(e) e.pression = Math.max(0, e.pression + n);
}
function criseApaiser(id, n){ crisePousser(id, -Math.abs(n)); }

/* ============================= LE TICK ============================= */

/* Appelé une fois par saison depuis advanceTime(). Rend la liste des paliers
 * franchis ce trimestre — le tour s'en sert pour l'annonce. */
function criseTick(dateInfo){
  const etats = heroCrises();
  const franchis = [];

  /* On mélange l'ordre d'examen : deux crises également mûres ne franchissent
   * pas toujours dans le même ordre, et c'est la seule part de hasard. */
  const ordre = CRISES.slice().sort(() => Math.random() - 0.5);

  for(const c of ordre){
    const e = etats[c.id];
    if(e.palier >= 5) continue;

    let causes = [];
    try { causes = c.pression() || []; } catch(err){ causes = []; }
    const somme = causes.reduce((s, x) => s + (x.n || 0), 0);

    e.causes = causes;
    e.pression = Math.max(0, e.pression + somme);

    const seuil = c.paliers[e.palier] ? c.paliers[e.palier].seuil : 999999;
    if(e.pression >= seuil){
      e.pression -= seuil;
      e.palier += 1;
      franchis.push(ouvrirPalier(c, e.palier, dateInfo));
    }
  }

  syncTensions();
  return franchis;
}

/* Une étape qui s'ouvre : sa chronique s'écrit, son marqueur se pose, et le
 * monde change un peu. */
function ouvrirPalier(c, n, dateInfo){
  const pal = c.paliers[n - 1];
  const f = pal.effets || {};

  if(typeof hero.flags !== 'undefined'){
    const marqueur = `crise_${c.id}_${n}`;
    if(!hasFlag(marqueur)) hero.flags.push(marqueur);
    if(f.flag && !hasFlag(f.flag)) hero.flags.push(f.flag);
    (f.flags || []).forEach(x => { if(!hasFlag(x)) hero.flags.push(x); });
  }
  for(const [k, v] of Object.entries(f.reputation || {})){
    if(typeof ajusterReputation === 'function') ajusterReputation(k, v);
  }
  if(f.prixChoc && typeof heroPolitique === 'function'){
    const pol = heroPolitique();
    pol.choc = Math.max(pol.choc || 1, f.prixChoc);
  }
  if(hero.chroniques){
    hero.chroniques.push({
      date: `${dateInfo.saison}, An ${dateInfo.an}`,
      texte: `⚠ <b>${c.nom} — ${pal.nom}.</b> ${pal.chronique}`,
    });
  }
  /* On garde l'ancien registre : d'autres écrans le lisent encore. */
  if(hero.crisesDeclenchees && n >= 4){
    (c.peuples || []).forEach(p => hero.crisesDeclenchees.add(p));
  }
  return { crise:c, palier:n, nom:pal.nom, chronique:pal.chronique };
}

/* ============================= LA TENSION DÉRIVÉE =============================
 * Un peuple dont la crise en est à la troisième étape sur cinq est à 60 de
 * tension. Ce n'est plus un compteur qui monte : c'est une lecture. */

function tensionDeCrise(c, e){
  const seuil = c.paliers[Math.min(e.palier, 4)].seuil || 100;
  const part  = e.palier >= 5 ? 0 : Math.min(1, e.pression / seuil);
  return Math.max(0, Math.min(100, Math.round(e.palier * 18 + part * 18)));
}

function syncTensions(){
  if(!hero.tensions) hero.tensions = {};
  const etats = heroCrises();
  for(const c of CRISES){
    const t = tensionDeCrise(c, etats[c.id]);
    (c.peuples || []).forEach(p => { hero.tensions[p] = t; });
  }
  /* Les Parias n'ont pas de crise régionale : leur tension, c'est ce que le
   * monde soupçonne de Yohan. */
  hero.tensions.parias = Math.max(0, Math.min(100,
    Math.round((hero.suspicion || 0) * 0.7 + Math.max(0, reputationDe('parias')) * 0.2)));
}

/* ============================= L'ÉCRAN ============================= */

function renderCrises(){
  const grid = document.getElementById('criseGrid');
  if(!grid) return;
  const etats = heroCrises();

  grid.innerHTML = CRISES.map(c => {
    const e = etats[c.id];
    const commencee = e.palier > 0;
    const pal = commencee ? c.paliers[e.palier - 1] : null;

    const pas = c.paliers.map((p, i) => {
      const etat = i < e.palier ? 'passe' : (i === e.palier ? 'suivant' : '');
      const titre = i < e.palier ? p.nom : (i === e.palier ? 'Ce qui vient' : '—');
      return `<i class="cr-pas ${etat}" title="${titre}"></i>`;
    }).join('');

    /* Les trois causes qui pèsent le plus. On montre pourquoi ça bouge, pas
     * de combien : le joueur lit le monde, pas une feuille de calcul. */
    const causes = (e.causes || []).slice()
      .sort((a, b) => Math.abs(b.n) - Math.abs(a.n)).slice(0, 3)
      .map(x => `<li class="${x.n < 0 ? 'freine' : 'pousse'}">${x.pourquoi}</li>`).join('');

    return `<div class="crise${commencee ? ' active' : ''}${e.palier >= 5 ? ' close' : ''}">
      <div class="cr-tete"><span class="cr-nom">${c.nom}</span><span class="cr-pas-rang">${pas}</span></div>
      <div class="cr-acteurs">${c.acteurs}</div>
      <div class="cr-etape">${commencee ? pal.nom : 'En veille'}</div>
      <p class="cr-resume">${commencee ? pal.resume : c.veille}</p>
      ${causes ? `<ul class="cr-causes">${causes}</ul>` : ''}
    </div>`;
  }).join('');
}

/* Une ligne pour l'épilogue et les récapitulatifs : où en est le monde. */
function crisesResume(){
  return CRISES.map(c => ({
    id: c.id, nom: c.nom, palier: criseEtape(c.id), etape: criseEtapeNom(c.id),
  }));
}
