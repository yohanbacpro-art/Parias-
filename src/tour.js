/* PARIAS — Le pli du tour, et la quête au centre
 *
 * Terminer un tour ne devait pas être un bouton qui avance un compteur. Il
 * arrive maintenant quelque chose à chaque fois.
 *
 * LE PLI. À chaque fin de tour, Yohan reçoit un pli : ce qui a changé pendant
 * les semaines écoulées, ce que la lignée a fait, la nouvelle du monde — et
 * surtout **ce qu'on lui propose**. Trois choses au plus, cliquables, qui
 * mènent directement où il faut aller. Un tour ne se termine jamais sur rien.
 *
 * LA QUÊTE. Le bandeau sous le calendrier rappelle en permanence où en est
 * l'histoire, ce qu'il faut pour la faire avancer, et si quelque chose est déjà
 * prêt. On ne peut plus perdre de vue pourquoi on joue.
 */

/* ============================= CE QU'ON PROPOSE ============================= */

/* Une proposition sait se décrire et sait où elle mène. */
function propositionsDuTour(){
  const props = [];
  const lieu = LOCATIONS.find(l => l.id === hero.position) || null;

  // 1. Un jalon prêt à se produire passe avant tout le reste.
  const jalon = trameDisponible();
  if(jalon){
    props.push({
      cle:'jalon', titre:"Quelque chose vous attend",
      texte:"Ce qui devait arriver est arrivé. Cela ne peut plus être remis.",
      action:'jalon', bouton:"Voir",
    });
  }

  // 2. Le dénouement d'un lieu dont les trois affaires sont closes.
  for(const l of LOCATIONS){
    const den = denouementDisponible(l.id);
    if(den){
      props.push({
        cle:'denouement_' + l.id, titre:`${l.nom} attend une décision`,
        texte:"Les trois affaires sont réglées. Ce qui reste ne se paie pas en or.",
        action:'lieu', cible:l.id, bouton:"S'y rendre",
      });
      break;
    }
  }

  // 3. Ce qu'on cherche là où l'on se trouve : trois offres attendent déjà.
  if(lieu && props.length < 3){
    props.push({
      cle:'offres', titre:`Ce qu'on cherche à ${lieu.nom}`,
      texte:"Trois offres au tableau. Certaines se règlent sur place, d'autres demandent de partir.",
      action:'lieu', cible:lieu.id, bouton:"Voir",
    });
  }

  // 5. Une campagne ou une affaire personnelle ouverte.
  if(props.length < 3){
    const camp = contratsSpeciauxDisponibles('campagne')[0] || contratsSpeciauxDisponibles('personnel')[0];
    if(camp){
      props.push({
        cle:'special_' + camp.id, titre:camp.titre,
        texte:camp.resume || "On vous confie une colonne. Ce n'est pas un contrat ordinaire.",
        action:'special', cible:camp.id, bouton:"Écouter",
      });
    }
  }

  // 6. Filet : le registre général a toujours quelque chose.
  if(!props.length){
    const c = CONTRACTS[Math.floor(Math.random() * CONTRACTS.length)];
    props.push({
      cle:'general_' + c.id, titre:c.titre,
      texte:`${c.commanditaire} — ${c.pitch}`,
      action:'registre', bouton:"Au registre",
    });
  }

  return props.slice(0, 3);
}

/* ============================= LE PLI ============================= */

function ouvrirPliDuTour(resume){
  const d = dateFromSemaines(hero.temps.semaines);
  const props = propositionsDuTour();
  const tr = trameProgres();
  const ch = TRAME_CHAPITRES[hero.trame.chapitre];

  const lignes = [];
  if(resume && resume.nouvelle) lignes.push(`<li class="pli-monde">${resume.nouvelle}</li>`);
  (resume && resume.lignee || []).forEach(e => lignes.push(`<li class="pli-lignee">${e.texte}</li>`));
  (resume && resume.politique || []).forEach(e => lignes.push(`<li class="pli-politique">${e.texte}</li>`));
  if(resume && resume.solde) lignes.push(`<li class="pli-solde">${resume.solde}</li>`);
  if(resume && resume.rente) lignes.push(`<li class="pli-or">${resume.rente}</li>`);

  const box = document.getElementById('eventModalBox');
  box.innerHTML = `
    <span class="event-tag">${d.saison}, An ${d.an}</span>
    <h3>Ce qui s'est passé pendant ce temps</h3>
    ${lignes.length ? `<ul class="pli-liste">${lignes.join('')}</ul>`
                    : `<p class="pli-rien">Les semaines ont passé sans que rien ne remonte jusqu'à vous.</p>`}

    <div class="pli-quete">
      <div class="pli-quete-tete">Chapitre ${hero.trame.chapitre + 1} · ${ch.titre}</div>
      <p>${ch.objectif}</p>
      <div class="pli-quete-etat">${tr.debloque
        ? `<b>Quelque chose est prêt à se produire.</b>`
        : `Jalons franchis : ${tr.faits}/${tr.total}. Il faut du sang, du temps, ou les bonnes rencontres.`}</div>
    </div>

    <div class="pli-props-titre">Ce qu'on vous propose</div>
    <div class="pli-props" id="pliProps"></div>

    <div style="margin-top:16px;text-align:right;">
      <button class="primary" id="pliFermer">Reprendre la route</button>
    </div>`;

  const holder = document.getElementById('pliProps');
  props.forEach(p => {
    const div = document.createElement('div');
    div.className = 'pli-prop';
    div.innerHTML = `<div><div class="pli-prop-titre">${p.titre}</div>
      <div class="pli-prop-texte">${p.texte}</div></div>`;
    const b = document.createElement('button');
    b.className = 'ghost';
    b.textContent = p.bouton;
    b.onclick = () => { closeEventModal(); suivreProposition(p); };
    div.appendChild(b);
    holder.appendChild(div);
  });

  document.getElementById('eventModal').style.display = 'flex';
  document.getElementById('pliFermer').onclick = () => {
    closeEventModal();
    // Un jalon prêt se déclenche en refermant le pli : le tour se termine sur
    // l'histoire, pas sur un bouton.
    resoudreTrameEnAttente();
  };
}

function suivreProposition(p){
  if(p.action === 'jalon'){ resoudreTrameEnAttente(); return; }
  if(p.action === 'lieu'){
    const l = LOCATIONS.find(x => x.id === p.cible);
    if(l) openLieu(l);
    return;
  }
  if(p.action === 'contrat'){ accepterOffre(p.cible); return; }
  if(p.action === 'special'){ ouvrirContratSpecial(p.cible); return; }
  showScreen('lieu'); renderLieu();
}

/* ============================= LE BANDEAU DE QUÊTE ============================= */
/* Toujours visible : on ne doit jamais avoir à chercher pourquoi on joue. */
function renderBandeauQuete(){
  const el = document.getElementById('queteBandeau');
  if(!el || !hero.trame) return;
  const ch = TRAME_CHAPITRES[hero.trame.chapitre];
  const suivant = TRAME_CHAPITRES[hero.trame.chapitre + 1];
  const tr = (typeof trameProgres === 'function') ? trameProgres() : null;
  const manque = suivant ? Math.max(0, suivant.seuil - hero.trame.points) : 0;

  el.innerHTML = `
    <div class="bq-gauche">
      <span class="bq-num">Chapitre ${hero.trame.chapitre + 1}</span>
      <span class="bq-titre">${ch.titre}</span>
    </div>
    <div class="bq-droite">
      ${tr && tr.debloque
        ? `<span class="bq-pret">Quelque chose est prêt — terminez un tour</span>`
        : (suivant
            ? `<span class="bq-etape">Encore ${manque} points de sang avant : ${suivant.titre}</span>`
            : `<span class="bq-etape">Dernier chapitre.</span>`)}
      ${tr ? `<span class="bq-jalons">${tr.faits}/${tr.total} jalons</span>` : ''}
    </div>`;
  el.onclick = () => { showScreen('quete'); renderQuete(); };
}
