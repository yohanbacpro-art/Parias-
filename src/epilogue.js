/* PARIAS — Moteur d'épilogue et d'héritage
 *
 * Une chronique ne s'arrête plus sur un compteur : elle rend son verdict. On
 * relit les marqueurs posés par la partie, l'état des huit peuples, les liens
 * tissés, et on écrit la fin qui correspond — celle-là et pas une autre.
 *
 * Puis on demande au joueur ce qu'il veut faire de tout cela : conserver la
 * chronique achevée (elle reste chargeable, comme n'importe quelle sauvegarde)
 * et repartir avec un héritage, ou refermer le livre.
 */

const HERITAGE_CLE = 'parias_heritage_v1';

/* ============================= LECTURE DES CONDITIONS ============================= */

function epiCondition(si, h){
  if(!si) return true;
  if(si.toujours) return true;
  const flags = h.flags || [];
  if(si.flags     && !si.flags.every(f => flags.includes(f)))   return false;
  if(si.sansFlags && si.sansFlags.some(f => flags.includes(f))) return false;
  if(si.unDes     && !si.unDes.some(f => flags.includes(f)))    return false;
  if(si.compagnon && !(h.compagnons || []).some(c => c.id === si.compagnon)) return false;
  if(si.affinite){
    for(const [qui, n] of Object.entries(si.affinite)){
      if(((h.affinites || {})[qui] || 0) < n) return false;
    }
  }
  if(si.tensionMin){
    for(const [p, n] of Object.entries(si.tensionMin)){
      if(((h.tensions || {})[p] || 0) < n) return false;
    }
  }
  if(si.tensionMax){
    for(const [p, n] of Object.entries(si.tensionMax)){
      if(((h.tensions || {})[p] || 0) > n) return false;
    }
  }
  if(si.renomMin     !== undefined && (h.renom || 0) < si.renomMin)         return false;
  if(si.suspicionMin !== undefined && (h.suspicion || 0) < si.suspicionMin) return false;
  if(si.suspicionMax !== undefined && (h.suspicion || 0) > si.suspicionMax) return false;
  if(si.niveauMin    !== undefined && (h.niveau || 0) < si.niveauMin)       return false;
  if(si.armeeMin     !== undefined){
    const t = (h.armee || []).reduce((s,u) => s + (u.effectif || 0), 0);
    if(t < si.armeeMin) return false;
  }
  return true;
}

/* Le premier verdict qui tient. */
function epiPremier(liste, h){
  return liste.find(e => epiCondition(e.si, h)) || null;
}
/* Tous ceux qui tiennent. */
function epiTous(liste, h){
  return liste.filter(e => epiCondition(e.si, h));
}

/* ============================= CONSTRUCTION ============================= */

function construireEpilogue(h){
  const ouverture = epiPremier(EPI_OUVERTURE, h);
  const peuples = Object.entries(EPI_PEUPLES).map(([id, p]) => {
    const v = epiPremier(p.verdicts, h);
    return { id, nom: p.nom, texte: v ? v.texte : '', tension: (h.tensions || {})[id] || 0 };
  }).filter(p => p.texte);

  const jalons = (typeof trameProgres === 'function') ? trameProgres() : null;

  return {
    ouverture,
    nom:     epiPremier(EPI_NOM, h),
    peuples,
    gens:    epiTous(EPI_GENS, h),
    nemesis: epiPremier(EPI_NEMESIS, h),
    onde:    epiPremier(EPI_ONDE, h),
    legs:    epiTous(EPI_LEGS, h),
    bilan: {
      niveau: h.niveau,
      or: h.or,
      renom: h.renom || 0,
      suspicion: h.suspicion || 0,
      sang: h.trame ? h.trame.points : 0,
      semaines: h.temps ? h.temps.semaines : 0,
      armee: (h.armee || []).reduce((s,u) => s + (u.effectif || 0), 0),
      compagnons: (h.compagnons || []).map(c => c.nom),
      jalons: jalons ? `${jalons.faits}/${jalons.total}` : '—',
      liens: jalons ? `${jalons.romFaits}/${jalons.romTotal}` : '—',
      marqueurs: (h.flags || []).length,
      batailles: (h.flags || []).filter(f => f.startsWith('cg_') && f.endsWith('_fait')).length,
    },
  };
}

/* ============================= HÉRITAGE ============================= */

/* Ce qu'une chronique achevée transmet. On garde le legs le plus riche jamais
 * obtenu, pas le dernier : recommencer ne doit jamais faire reculer. */
function lireHeritage(){
  try{
    const t = localStorage.getItem(HERITAGE_CLE);
    if(!t) return null;
    const h = JSON.parse(t);
    return (h && typeof h === 'object' && Array.isArray(h.legs)) ? h : null;
  } catch(e){ return null; }
}

function ecrireHeritage(epi){
  const ancien = lireHeritage();
  const ids = new Set([...(ancien ? ancien.legs : []), ...epi.legs.map(l => l.id)]);
  const legs = [...ids];
  const cumul = { or:0, renom:0, talentPoints:0 };
  legs.forEach(id => {
    const l = EPI_LEGS.find(x => x.id === id);
    if(!l) return;
    for(const [k, v] of Object.entries(l.effet || {})) cumul[k] = (cumul[k] || 0) + v;
  });
  const donnees = {
    legs,
    effet: cumul,
    chroniques: (ancien ? ancien.chroniques || 0 : 0) + 1,
    derniere: { ouverture: epi.ouverture ? epi.ouverture.titre : '', date: new Date().toISOString() },
  };
  try{ localStorage.setItem(HERITAGE_CLE, JSON.stringify(donnees)); } catch(e){ return false; }
  return true;
}

/* Applique l'héritage au personnage de départ. Appelé une fois, au tout début. */
function appliquerHeritage(){
  const h = lireHeritage();
  if(!h || !h.effet) return null;
  hero.or           += h.effet.or || 0;
  hero.renom         = (hero.renom || 0) + (h.effet.renom || 0);
  hero.talentPoints += h.effet.talentPoints || 0;
  return h;
}

/* ============================= ÉCRAN ============================= */

let epilogueCourant = null;

/* Range la chronique achevée dans un emplacement manuel libre, pour qu'ouvrir
 * la suivante ne l'efface pas. Rend le nom de l'emplacement, ou null si tous
 * sont occupés — auquel cas on le dit au joueur au lieu d'écraser son travail. */
function archiverChronique(){
  for(const s of SLOTS){
    if(s.auto) continue;
    if(lireSlot(s.id)) continue;
    if(ecrireSlot(s.id, hero)) return s.nom;
  }
  return null;
}

function ouvrirEpilogue(){
  if(!(hero.flags || []).includes('chronique_terminee')) hero.flags.push('chronique_terminee');
  epilogueCourant = construireEpilogue(hero);
  epilogueCourant.archive = archiverChronique();
  saveGame(true);
  ecrireHeritage(epilogueCourant);
  renderEpilogue();
  closeEventModal();
  showScreen('epilogue');
}

function renderEpilogue(){
  const epi = epilogueCourant || construireEpilogue(hero);
  const b = epi.bilan;
  const d = (typeof dateFromSemaines === 'function') ? dateFromSemaines(b.semaines) : null;
  const ans = Math.floor(b.semaines / 52);

  const section = (titre, corps) => corps
    ? `<section class="epi-section"><h3 class="epi-h">${titre}</h3>${corps}</section>` : '';

  const gens = epi.gens.length
    ? epi.gens.map(g => `<p class="epi-gens">${g.texte}</p>`).join('')
    : `<p class="epi-gens epi-seul">Yohan traversa Vardhen sans y laisser de visage derrière lui.
       Personne ne l'attendait nulle part. C'était, à sa manière, un choix aussi.</p>`;

  const peuples = epi.peuples.map(p => `<div class="epi-peuple">
      <div class="epi-peuple-nom">${p.nom}</div>
      <p>${p.texte}</p>
    </div>`).join('');

  const legs = epi.legs.length
    ? `<div class="epi-legs">${epi.legs.map(l => `<div class="epi-leg">
         <div class="epi-leg-nom">${l.nom}</div><p>${l.texte}</p></div>`).join('')}</div>`
    : `<p class="epi-gens epi-seul">Cette chronique ne transmet rien. Le prochain Karlsberg
       repartira exactement d'où celui-ci était parti.</p>`;

  document.getElementById('epilogueCorps').innerHTML = `
    <div class="epi-ouverture">
      <span class="epi-tag">Fin de la chronique</span>
      <h2 class="epi-titre">${epi.ouverture ? epi.ouverture.titre : 'Ce qui reste'}</h2>
      <p class="epi-texte">${epi.ouverture ? epi.ouverture.texte : ''}</p>
      ${epi.nom ? `<p class="epi-texte">${epi.nom.texte}</p>` : ''}
    </div>

    ${section('Le monde après', `<div class="epi-peuples">${peuples}</div>`)}
    ${section('Ceux qui restaient', gens)}
    ${section('Celui qui suivait', epi.nemesis ? `<p class="epi-gens">${epi.nemesis.texte}</p>` : '')}
    ${section("Ce qui suivait", epi.onde ? `<p class="epi-texte epi-onde">${epi.onde.texte}</p>` : '')}

    <section class="epi-section">
      <h3 class="epi-h">Le compte</h3>
      <div class="epi-bilan">
        <div><span>Niveau atteint</span><b>${b.niveau}</b></div>
        <div><span>Points de sang</span><b>${b.sang}</b></div>
        <div><span>Renom</span><b>${b.renom}</b></div>
        <div><span>Suspicion</span><b>${b.suspicion}</b></div>
        <div><span>Or</span><b>${b.or}</b></div>
        <div><span>Jalons de l'histoire</span><b>${b.jalons}</b></div>
        <div><span>Moments partagés</span><b>${b.liens}</b></div>
        <div><span>Campagnes menées</span><b>${b.batailles}</b></div>
        <div><span>Hommes sous bannière</span><b>${b.armee}</b></div>
        <div><span>Durée</span><b>${ans} an${ans > 1 ? 's' : ''}${d ? ` · ${d.saison}, An ${d.an}` : ''}</b></div>
      </div>
      ${b.compagnons.length ? `<p class="epi-compagnons">Ils étaient là à la fin : ${b.compagnons.join(', ')}.</p>` : ''}
    </section>

    ${section('Ce qui se transmet', legs)}

    <div class="epi-fin">
      <p class="epi-garde">${epi.archive
        ? `Cette chronique a été rangée dans <b>${epi.archive}</b> : vous pouvez y revenir quand vous voulez depuis l'écran Sauvegarde. Une nouvelle chronique repart de zéro, avec ce qui se transmet.`
        : `Vos trois emplacements manuels sont pleins : cette chronique n'est conservée que dans l'emplacement automatique, qu'une nouvelle chronique remplacera. Enregistrez-la dans un emplacement, ou exportez-en le texte, avant de recommencer.`}</p>
      <div class="epi-boutons">
        <button class="primary" id="btnNouvelleChronique">Ouvrir une nouvelle chronique</button>
        <button class="ghost" id="btnResterEpilogue">Rester encore un moment</button>
      </div>
    </div>`;

  document.getElementById('btnNouvelleChronique').onclick = () => {
    const avertissement = epi.archive
      ? `Ouvrir une nouvelle chronique ? Celle-ci reste enregistrée dans ${epi.archive}.`
      : `Ouvrir une nouvelle chronique ? Vos emplacements manuels sont pleins : CETTE CHRONIQUE SERA PERDUE.`;
    if(!confirm(avertissement)) return;
    nouvelleChronique();
  };
  document.getElementById('btnResterEpilogue').onclick = () => showScreen('quete');
}

/* Ce que les chroniques précédentes ont laissé, annoncé sur l'accueil. */
function renderHeritageAccueil(){
  const el = document.getElementById('heritageAccueil');
  if(!el) return;
  const h = lireHeritage();
  if(!h || !h.chroniques){ el.innerHTML = ''; return; }
  const e = h.effet || {};
  const gains = [];
  if(e.or)           gains.push(`<b>${e.or}</b> pièces d'or`);
  if(e.renom)        gains.push(`<b>${e.renom}</b> de Renom`);
  if(e.talentPoints) gains.push(`<b>${e.talentPoints}</b> point${e.talentPoints > 1 ? 's' : ''} de talent`);
  const noms = h.legs.map(id => (EPI_LEGS.find(x => x.id === id) || {}).nom).filter(Boolean);
  el.innerHTML = `<p class="epi-heritage">
    ${h.chroniques} chronique${h.chroniques > 1 ? 's' : ''} achevée${h.chroniques > 1 ? 's' : ''}.
    ${noms.length ? 'Ce qui vous suit : ' + noms.join(', ') + '.' : ''}
    ${gains.length ? '<br>Le prochain Karlsberg part avec ' + gains.join(', ') + '.' : ''}</p>`;
}

/* Recommence une chronique sans effacer les emplacements : ce qui a été joué
 * reste jouable. Seul l'héritage traverse. */
function nouvelleChronique(){
  try{ localStorage.removeItem(SAVE_PREFIX + 'auto'); } catch(e){}
  try{ location.reload(); } catch(e){}
}
