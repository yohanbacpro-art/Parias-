/* PARIAS — L'écran du lieu, seul écran de jeu
 *
 * Avant : un onglet Contrats avec deux registres, un écran de lieu qui ne
 * servait à rien (« Yohan se trouve ici »), et un pli de fin de tour qui
 * proposait des affaires d'autres régions. On ne savait plus où regarder.
 *
 * Maintenant tout se passe ici. L'endroit où Yohan se trouve montre :
 *   · son état — ce qu'on pense de lui ici, ce qu'il risque à y rester ;
 *   · ses trois offres du tour, avec ce qu'elles paient et ce qu'elles coûtent ;
 *   · ce qu'on peut y faire — chercher, se reposer, commercer, bâtir ;
 *   · le dossier du lieu, et la décision quand les trois affaires sont closes.
 *
 * Les autres onglets redeviennent ce qu'ils auraient toujours dû être : des
 * fiches qu'on consulte, pas des endroits où l'on joue.
 */

function renderLieu(){
  const l = currentLieu || LOCATIONS.find(x => x.id === hero.position);
  if(!l) return;
  currentLieu = l;

  const peuple = peupleDuLieu(l);
  const rang = peuple ? rangReputation(peuple) : null;
  const region = REGIONS.find(r => r.lieux.includes(l.id));

  /* --- En-tête : où l'on est, et comment on y est reçu --- */
  document.getElementById('lieuNom').textContent = l.nom;
  document.getElementById('lieuDesc').innerHTML =
    `<span class="lieu-region">${region ? region.nom : '—'}</span> · ${l.description_courte}
     · Danger ${l.danger_range.min}–${l.danger_range.max}`;

  const accueil = document.getElementById('lieuAccueil');
  if(accueil){
    accueil.className = 'lieu-accueil' + (rang && rang.hostile ? ' hostile' : '');
    accueil.innerHTML = peuple
      ? `<b>${PEUPLE_LABELS[peuple]}</b> · ${rang.nom} — ${(REPUTATION_VOIX[peuple] || {})[rang.id] || rang.note}`
      : `<b>Terre de personne.</b> Personne ne tient ce lieu, personne n'y protège personne.`;
  }

  /* --- Ce qu'on dit de vous, et ce que ça coûte ici --- */
  const pres = document.getElementById('lieuPression');
  if(pres){
    const dom = (typeof puissanceDominante === 'function') ? puissanceDominante() : null;
    const po = dom && !dom.joueur ? postureDe(dom.id) : null;
    pres.innerHTML = (typeof blocSuspicion === 'function' ? blocSuspicion() : '')
      + (dom ? `<p class="lieu-politique">Dans cette vallée, c'est <b>${dom.nom}</b> qui pèse le plus lourd.
          ${dom.joueur ? "C'est-à-dire vous." : `${po.nom} — ${po.note}`}</p>` : '');
  }

  /* --- Le dossier du lieu --- */
  const dos = document.getElementById('lieuDossier');
  const fait = dossierDe(l.id).length;
  const total = (CONTRATS_LOCAUX_EXPANSES[l.id] || []).length;
  const den = denouementDisponible(l.id);
  if(dos){
    dos.innerHTML = `<div class="dossier-tete">
        <span class="dossier-nom">${(CONTRATS_LOCAUX[l.id] || {}).dossier || l.nom}</span>
        <span class="dossier-compte">${fait}/${total} affaires réglées</span></div>` +
      (den ? `<div class="dossier-den">Les trois affaires sont closes. Ce qui reste ne se paie pas en or.
              <button class="primary" id="btnDenouement">${den.titre}</button></div>`
           : (fait >= total ? `<p class="dossier-clos">Ce lieu est réglé. Ce qui s'y passe désormais vous doit quelque chose.</p>` : ''));
    const b = document.getElementById('btnDenouement');
    if(b) b.onclick = () => openWrittenEvent(den, l);
  }

  /* --- Les trois offres du tour --- */
  const off = document.getElementById('lieuOffres');
  if(off){
    off.innerHTML = '';
    const offres = offresDuTour();
    if(!offres.length){
      off.innerHTML = `<p class="offres-vide">Personne ne cherche personne aujourd'hui. Terminez le tour :
        les semaines apportent toujours quelque chose.</p>`;
    }
    offres.forEach(c => {
      const ailleurs = c.ailleurs ? LOCATIONS.find(x => x.id === c.ailleurs) : null;
      const noble = (typeof commanditaireNoble === 'function') && commanditaireNoble(c);
      const trajet = ailleurs ? semainesDeVoyage(hero.position, c.ailleurs) : 0;
      const div = document.createElement('div');
      div.className = 'offre' + (c.locale ? ' locale' : '') + (ailleurs ? ' ailleurs' : '');
      div.innerHTML = `
        <div class="offre-tete">
          <span class="offre-titre">${c.titre}</span>
          <span class="offre-prix${noble ? ' prix-paria' : ''}">${noble ? 'Or et Sang' : c.or + ' or'}</span>
        </div>
        <div class="offre-qui">${c.commanditaire}${c.entremetteur ? ` · par l'entremise de ${c.entremetteur.toLowerCase()}` : ''}${c.locale ? ' · affaire du lieu' : ' · tableau des mercenaires'}</div>
        <p class="offre-pitch">${c.pitch}</p>
        <div class="offre-pied">
          <span class="offre-tag ${c.danger === 'modéré' ? '' : 'chaud'}">${c.danger}</span>
          <span class="offre-tag">${c.type}</span>
          <span class="offre-tag susp">+${c.suspicion} Suspicion</span>
          ${noble ? `<span class="offre-tag paria">Prix du Paria · ${c.or} or et le consentement</span>` : ''}
          ${ailleurs ? `<span class="offre-tag voyage">${ailleurs.nom} · ${trajet} sem. de route</span>`
                     : `<span class="offre-tag ici">sur place</span>`}
        </div>`;
      const b = document.createElement('button');
      b.className = 'ghost offre-btn';
      b.textContent = ailleurs ? 'Accepter et partir' : 'Accepter';
      b.onclick = () => accepterOffre(c.id);
      div.appendChild(b);
      off.appendChild(div);
    });
  }

  /* --- Ce qu'on peut faire ici --- */
  const act = document.getElementById('lieuActions');
  if(act){
    const zone = fatZone(hero.fat);
    act.innerHTML = '';
    const bouton = (label, detail, fn, off) => {
      const d = document.createElement('button');
      d.className = 'lieu-act';
      d.disabled = !!off;
      d.innerHTML = `<span>${label}</span><span class="la-detail">${detail}</span>`;
      d.onclick = fn;
      act.appendChild(d);
    };
    bouton("Chercher quelque chose", "1 action · ce que l'endroit cache",
      () => useAction('explorer'), hero.actionsTour <= 0);
    bouton("Se reposer", `Plusieurs jours · Fatigue ${hero.fat} → ${Math.max(0, hero.fat - 35)}`,
      () => doRepos(), false);
    bouton("Se faire oublier", `Une saison entière · Suspicion ${hero.suspicion} → ${Math.max(0, hero.suspicion - 30)}`,
      () => seFaireOublier(), hero.suspicion < 25);
    if(peuple !== null || SHOPS[peuple]) bouton("Voir le marchand", "Ce qu'on vend ici",
      () => { showScreen('personnage'); renderEquipement(); }, false);
    if(l.id === 'LOC_001') bouton("Le chantier de Karlsberg", "Ce qu'on relève, et ce que ça coûte",
      () => ouvrirChantier(), false);
  }
}
