/* PARIAS — Ce qu'on vous propose ici
 *
 * Il y avait trois systèmes de contrats qui se marchaient dessus : un registre
 * général de cinquante affaires situées nulle part, des affaires locales dans un
 * autre onglet, et un pli de fin de tour qui proposait des contrats d'autres
 * régions à un homme qui n'y était pas.
 *
 * Il n'y en a plus qu'un. À chaque tour, l'endroit où se trouve Yohan propose
 * **trois offres** — les siennes d'abord, complétées par ce que le tableau des
 * mercenaires apporte quand le dossier du lieu est épuisé. Les offres sont
 * fixes pour le tour : on ne rafraîchit pas un tableau d'affichage en le
 * regardant.
 *
 * Une offre dit toujours quatre choses avant qu'on l'accepte : qui paie, ce
 * qu'il faut faire, **où** (ici, ou ailleurs — et alors c'est un voyage), et ce
 * que ça coûtera en Suspicion. Accepter, c'est partir.
 */

/* Combien une affaire fait monter la Suspicion, selon ce qu'elle demande. */
const SUSPICION_PAR_TYPE = {
  chasse: 2, sauvetage: 3, traque: 5, "récupération": 6, "enquête": 4, guerre: 8,
};
const SUSPICION_PAR_DANGER = {
  "modéré": 0, dangereux: 2, "très dangereux": 4, "extrême": 6, "légendaire": 8,
};
function suspicionDeLOffre(c){
  return (SUSPICION_PAR_TYPE[c.type] || 3) + (SUSPICION_PAR_DANGER[c.danger] || 0);
}

/* Un contrat du registre général, rhabillé aux couleurs d'un lieu réel. Le
 * réservoir reste utile ; ce qui ne l'était pas, c'est de l'afficher tel quel
 * avec des lieux qui n'existent pas sur la carte. */
const COMMANDITAIRES_LOCAUX = {
  humains:     ["Le prévôt de la place", "Une maison marchande", "Le capitaine de garde"],
  parias:      ["Un homme qui ne donne pas son nom", "Une famille de la vallée"],
  khesh:       ["Le conseil des tentes", "Un maître de caravane"],
  elfes:       ["Un gardien des lisières", "Un conseiller de la Cour"],
  elfes_noirs: ["Un courtier de Valombre", "Une maison mineure"],
  nains:       ["Une compagnie de galerie", "Le maître des Portes"],
  peaux_vertes:["Un chef de tribu", "Un éclaireur qui n'a pas dormi"],
  hommes_betes:["Un ancien des Pierres", "Un passeur de la forêt"],
  null:        ["Un voyageur qui paie comptant", "La guilde des rouliers"],
};
function rhabiller(c, lieu){
  const peuple = peupleDuLieu(lieu);
  const pool = COMMANDITAIRES_LOCAUX[peuple] || COMMANDITAIRES_LOCAUX.null;
  const h = artHash(c.id + lieu.id);
  return {
    ...c,
    id: 'G_' + lieu.id + '_' + c.id,
    origine: c.id,
    lieu: lieu.nom,
    locId: lieu.id,
    commanditaire: pool[h % pool.length],
    tableau: true,          // vient du tableau des mercenaires, pas du lieu
  };
}

/* ============================= LES TROIS OFFRES ============================= */

function heroOffres(){
  if(!hero.offres) hero.offres = { semaine: -1, locId: null, liste: [] };
  return hero.offres;
}

/* Stables pour un tour et un lieu : elles ne se retirent pas au sort à chaque
 * fois qu'on regarde l'écran. */
function offresDuTour(){
  const lieu = LOCATIONS.find(l => l.id === hero.position);
  if(!lieu) return [];
  const o = heroOffres();
  const semaine = hero.temps ? hero.temps.semaines : 0;
  if(o.semaine === semaine && o.locId === lieu.id && o.liste.length) return o.liste;

  const rnd = artSuite(lieu.id + '_' + semaine);
  const liste = [];

  /* 1. Le dossier du lieu d'abord — c'est ce qu'on est venu régler.
   *    On en garde deux au plus, pour laisser la place à ce qui vient
   *    d'ailleurs : un homme qui ne bouge jamais n'a pas d'histoire. */
  const ici = affairesDuLieu(lieu.id);
  ici.slice(0, ici.length >= 3 ? 2 : 3).forEach(a => liste.push({ ...a, locale: true }));

  /* 2. Ce qu'un voisin fait dire jusqu'ici. Une vraie affaire de son dossier :
   *    accepter, c'est prendre la route, et le dossier de là-bas avance. */
  const voisins = ROUTES.filter(r => r.includes(lieu.id))
    .map(r => r[0] === lieu.id ? r[1] : r[0])
    .filter(id => affairesDuLieu(id).length);
  if(voisins.length && liste.length < 3){
    const dest = voisins[Math.floor(rnd() * voisins.length)];
    const l2 = LOCATIONS.find(x => x.id === dest);
    const pool = affairesDuLieu(dest);
    const a = pool[Math.floor(rnd() * pool.length)];
    if(l2 && a) liste.push({ ...a, locale:true, ailleurs: dest, lieu: l2.nom,
                             semainesRoute: semainesDeVoyage(lieu.id, dest) });
  }

  /* 3. Le tableau des mercenaires bouche les trous, rhabillé au lieu. */
  if(liste.length < 3){
    const pool = CONTRACTS.filter(c => !hero.contratsFaits || !hero.contratsFaits.includes(c.id));
    const reste = pool.length ? pool : CONTRACTS.slice();
    const tirage = reste.slice();
    while(liste.length < 3 && tirage.length){
      const c = tirage.splice(Math.floor(rnd() * tirage.length), 1)[0];
      liste.push(rhabiller(c, lieu));
    }
  }

  liste.forEach(c => { c.suspicion = suspicionDeLOffre(c); });
  o.semaine = semaine; o.locId = lieu.id; o.liste = liste;
  return liste;
}

/* Une offre acceptée disparaît du tableau : on ne la reprend pas deux fois. */
function retirerOffre(id){
  const o = heroOffres();
  o.liste = o.liste.filter(c => c.id !== id);
}

/* ============================= LE VOYAGE ============================= */
/* Accepter un contrat qui se déroule ailleurs, c'est partir. Le trajet coûte du
 * temps et n'est pas toujours tranquille. */

function distanceEntre(a, b){
  const p1 = LOC_COORDS[a], p2 = LOC_COORDS[b];
  if(!p1 || !p2) return 1;
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}
function semainesDeVoyage(a, b){
  return Math.max(1, Math.round(distanceEntre(a, b) / 14));
}

/* Rend true si un incident de route s'est produit (et l'a affiché). */
function voyagerVers(destId, apres){
  const depart = hero.position;
  const l = LOCATIONS.find(x => x.id === destId);
  if(!l){ if(apres) apres(); return false; }
  const semaines = semainesDeVoyage(depart, destId);

  hero.position = destId;
  currentLieu = l;
  const resume = advanceTime(semaines);
  // La route se paie en fatigue, et elle fait un peu oublier.
  hero.fat = Math.min(hero.fatMax, hero.fat + 4 * semaines);
  adjustSuspicion(-2);
  saveGame(true);

  const box = document.getElementById('eventModalBox');
  box.innerHTML = `${artEventBanner('evt_voyage', 'VOYAGE')}
    <span class="event-tag">Voyage</span><h3>Vers ${l.nom}</h3>
    <p class="narrative">${semaines} semaine${semaines > 1 ? 's' : ''} de route. ${
      pickVariant([
        "On dort où l'on peut et on parle le moins possible.",
        "La route est longue et sans histoire, ce qui est la meilleure chose qu'on puisse en dire.",
        "Deux contrôles, un péage, et personne qui regarde de trop près.",
      ])}</p>
    <div class="reward-tags"><span class="reward-tag neg">+${4 * semaines} Fatigue</span>
      <span class="reward-tag">−2 Suspicion</span></div>
    ${resume && resume.nouvelle ? `<p class="narrative" style="color:var(--parchment-dim);font-style:italic;">${resume.nouvelle}</p>` : ''}
    <div style="margin-top:16px;text-align:right;"><button class="primary" id="voyBtn">Arriver</button></div>`;
  document.getElementById('eventModal').style.display = 'flex';
  document.getElementById('voyBtn').onclick = () => { closeEventModal(); if(apres) apres(); };
  return true;
}

/* ============================= ACCEPTER ============================= */

function accepterOffre(id){
  const c = offresDuTour().find(x => x.id === id);
  if(!c) return;
  retirerOffre(id);
  const lancer = () => {
    // Une affaire se paie en visibilité avant même d'avoir commencé.
    adjustSuspicion(c.suspicion || 0);
    openContract(c);
  };
  if(c.ailleurs) voyagerVers(c.ailleurs, lancer);
  else lancer();
}
