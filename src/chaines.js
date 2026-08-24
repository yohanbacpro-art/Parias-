/* PARIAS — Les chaînes
 *
 * C'est le moteur que le pack narratif réclame depuis la V4 :
 *
 *   « Les contrats sont conçus comme des chaînes et non comme des missions
 *     instantanées. »
 *   « L'objectif est que le jeu se souvienne réellement des décisions : un
 *     enfant sauvé, un noble humilié, un dragon blessé peuvent réapparaître
 *     bien plus tard. »
 *
 * Une chaîne est une histoire qui se joue **sur plusieurs tours**. Chaque étape
 * est un événement écrit ordinaire — donc illustré, avec des jets, des combats
 * et des branches, sans une ligne de rendu nouvelle. Ce que la chaîne ajoute,
 * c'est le temps : l'étape suivante n'arrive pas tout de suite. On l'accepte,
 * on voyage, on se bat ailleurs, on se repose, et un jour un homme vous
 * rattrape sur la route pour vous dire ce qui s'est passé pendant ce temps.
 *
 * Trois règles :
 *
 *   1. UNE SEULE AFFAIRE À LA FOIS. On ne mène pas deux contrats de front ; on
 *      n'est qu'un homme. Les chaînes d'arrière-plan (vendettas, secrets), en
 *      revanche, courent en parallèle et se rappellent à vous toutes seules.
 *   2. LES BRANCHES SONT DES DONNÉES. Une scène dit `effets:{ etape:"x" }` pour
 *      choisir la suite, `effets:{ issue:"y" }` pour refermer la chaîne. Aucun
 *      code par contrat.
 *   3. L'ISSUE SURVIT À TOUT. `hero.chaines.issues[id]` est écrit une fois et
 *      relu pour toujours — par d'autres chaînes, par les offres, par
 *      l'épilogue. C'est ça, se souvenir.
 */

/* Variables lues par le moteur après une scène : voir applyEffets. */
let chaineSuite = null;
let chaineIssue = null;

function heroChaines(){
  if(!hero.chaines) hero.chaines = { actives:[], faites:[], issues:{} };
  const c = hero.chaines;
  if(!c.actives) c.actives = [];
  if(!c.faites)  c.faites = [];
  if(!c.issues)  c.issues = {};
  return c;
}

function chaineParId(id){ return CHAINES.find(c => c.id === id) || null; }
function etapeParId(ch, id){ return ch.etapes.find(e => e.id === id) || null; }

/* Combien de semaines se sont écoulées depuis le début de la partie. */
function semaineCourante(){ return (hero.temps && hero.temps.semaines) || 0; }

/* ============================= ÉTAT ============================= */

function chaineEnCours(id){ return heroChaines().actives.find(a => a.id === id) || null; }
function chaineFaite(id){ return heroChaines().faites.includes(id); }
function issueDeChaine(id){ return heroChaines().issues[id] || null; }

/* L'affaire en cours — celle qui occupe Yohan. Il n'y en a jamais deux. */
function affaireEnCours(){
  return heroChaines().actives.find(a => {
    const ch = chaineParId(a.id);
    return ch && ch.type === 'contrat';
  }) || null;
}

/* Une chaîne est proposable si elle n'a jamais été menée, n'est pas en cours,
 * et que ses conditions sont réunies. */
function chaineDisponible(ch){
  if(chaineFaite(ch.id) || chaineEnCours(ch.id)) return false;
  if(ch.type === 'contrat' && affaireEnCours()) return false;
  if(ch.requis && !conditionsRemplies(ch.requis)) return false;
  if(ch.avant && !ch.avant()) return false;
  return true;
}

/* Les chaînes qu'un lieu peut proposer ce tour-ci. */
function chainesDuLieu(locId){
  return CHAINES.filter(ch => ch.type === 'contrat'
    && (!ch.lieux || ch.lieux.includes(locId))
    && chaineDisponible(ch));
}

/* Une chaîne rhabillée en offre, pour l'écran du lieu. */
function chaineEnOffre(ch, locId){
  const l = LOCATIONS.find(x => x.id === locId);
  return {
    id: 'CH_' + ch.id, chaine: ch.id, titre: ch.titre,
    commanditaire: ch.commanditaire, maisonNoble: ch.maison || null,
    lieu: l ? l.nom : '', locId, or: ch.or, type: ch.categorie || 'traque',
    danger: ch.danger || 'dangereux', pitch: ch.pitch, affaire: true,
  };
}

/* ============================= OUVRIR ET AVANCER ============================= */

function ouvrirChaine(id, apres){
  const ch = chaineParId(id);
  if(!ch || chaineEnCours(id)) return false;
  heroChaines().actives.push({ id, etape: ch.etapes[0].id, echeance: semaineCourante(), data:{} });
  return jouerEtapeChaine(id, apres);
}

/* Joue l'étape due d'une chaîne. Rend true si un événement s'est ouvert. */
function jouerEtapeChaine(id, apres){
  if(evenementEnCours()) return false;
  const a = chaineEnCours(id);
  const ch = chaineParId(id);
  if(!a || !ch) return false;
  const et = etapeParId(ch, a.etape);
  if(!et){ cloreChaine(id, 'interrompue'); return false; }

  chaineSuite = null; chaineIssue = null;
  chaineActiveId = id;

  // Une étape dont les conditions ne tiennent plus saute à son repli : un PNJ
  // mort ne revient pas parler, et la chaîne doit pouvoir s'en remettre.
  if(et.requis && !conditionsRemplies(et.requis) && et.sinon){
    a.etape = et.sinon;
    return jouerEtapeChaine(id, apres);
  }

  filerApres(() => { conclureEtape(id); if(apres) apres(); });
  openWrittenEvent(et.ev, LOCATIONS.find(l => l.id === hero.position) || null);
  return true;
}
let chaineActiveId = null;

/* Appelé à la fermeture de l'événement d'étape : on lit où la scène a dit
 * d'aller, et on date la suite. */
function conclureEtape(id){
  const a = chaineEnCours(id);
  const ch = chaineParId(id);
  if(!a || !ch) return;

  if(chaineIssue){ const i = chaineIssue; chaineIssue = null; chaineSuite = null; cloreChaine(id, i); return; }

  const et = etapeParId(ch, a.etape);
  const suivante = chaineSuite || (et && et.suite) || etapeApres(ch, a.etape);
  chaineSuite = null;

  // Les termes se fixent une fois, juste après l'audience, avant tout départ.
  if(ch.prix && !a.data.prix && suivante){
    a.etape = suivante;
    a.echeance = semaineCourante();
    ouvrirTermesDuPrix(ch, a, () => { programmerEtape(ch, a, suivante); });
    return;
  }

  if(!suivante){ cloreChaine(id, (et && et.issue) || 'menee'); return; }

  programmerEtape(ch, a, suivante);
}

/* Date l'étape suivante. C'est ce délai qui fait qu'une affaire se vit au lieu
 * de se cliquer : entre deux étapes, on a le temps de voyager, de se battre
 * ailleurs, de se reposer, et de recevoir de mauvaises nouvelles. */
function programmerEtape(ch, a, suivante){
  const cible = etapeParId(ch, suivante);
  if(!cible){ cloreChaine(ch.id, 'menee'); return; }
  a.etape = suivante;
  const d = cible.delai || [2, 5];
  a.echeance = semaineCourante() + d[0] + Math.floor(Math.random() * (d[1] - d[0] + 1));
  saveGame(true);
  if(typeof renderLieu === 'function' && document.getElementById('screen-lieu')) renderLieu();
}

function etapeApres(ch, id){
  const i = ch.etapes.findIndex(e => e.id === id);
  return (i >= 0 && i + 1 < ch.etapes.length) ? ch.etapes[i + 1].id : null;
}

/* ---- Les termes, avant tout départ ----
 * Le pack est explicite : « Les termes sont établis avant tout départ et toute
 * action contractuelle. » On les fixe donc entre l'audience et la mise en
 * route, jamais après coup. */
function ouvrirTermesDuPrix(ch, a, apres){
  const faux = { titre: ch.titre, commanditaire: ch.commanditaire,
                 maisonNoble: ch.maison, or: ch.or, noble: true };
  const prix = prixPariaDe(faux);
  if(!prix){ a.data.prix = 'OR'; apres(); return false; }

  const p = prix.noble_proposee;
  const box = document.getElementById('eventModalBox');
  box.innerHTML = `${artEventBanner('tr_prix', 'PARIA')}
    <span class="event-tag">Les termes</span><h3>Le Prix du Paria</h3>
    <p class="narrative">La coutume n'a jamais été abrogée, et ${ch.commanditaire} le sait mieux
      que personne : une maison noble qui emploie un Paria lui doit <b>l'Or et le Sang</b>.
      Rien ne commence avant que les termes soient dits.</p>
    ${p ? `<div class="prix-noble"><b>${p.nom}</b> · ${p.rang}, ${p.age} ans<span>${p.note}</span></div>`
        : `<div class="prix-indispo">${prix.indisponible}</div>`}
    <div class="prix-choices" id="prixChaine"></div>`;

  const holder = document.getElementById('prixChaine');
  optionsDuPrix(faux, prix).forEach(o => {
    const b = document.createElement('button');
    b.innerHTML = `${o.label}<small>${o.sub}</small><small class="prix-detail">${o.detail}</small>`;
    b.onclick = () => {
      if(o.id === 'REFUSER'){ cloreChaine(ch.id, 'refusee'); closeEventModal(); renderLieu(); return; }
      a.data.prix = o.id === 'NEGOCIER' ? (Math.random() < 0.5 ? 'OR_ET_NOBLE_CONSENTANTE' : 'OR') : o.id;
      a.data.prixDonnees = prix;
      if(o.id === 'NOBLE_CONSENTANTE' || o.id === 'OR_ET_NOBLE_CONSENTANTE'){
        if(!hasFlag('prix_noble_accepte')) heroFlags().push('prix_noble_accepte');
      }
      closeEventModal();
      apres();
    };
    holder.appendChild(b);
  });
  document.getElementById('eventModal').style.display = 'flex';
  return true;
}

/* Ce que l'affaire rapporte, une fois et une seule, aux termes convenus. */
function payerLaChaine(ch, data){
  if(!ch.or) return '';
  const mult = data && data.prix ? multiplicateurDuPrix(data.prix) : 1;
  const or = Math.round(ch.or * mult);
  hero.or += or;
  gainPointsSang(6);
  ajusterRenom(5);
  let msg = `<b>${or} pièces d'or</b> changent de main.`;
  if(data && data.prix && data.prixDonnees)
    msg += appliquerPrix({ titre: ch.titre, commanditaire: ch.commanditaire, or: ch.or },
                         data.prix, data.prixDonnees);
  return msg;
}

function cloreChaine(id, issue){
  const c = heroChaines();
  const a = chaineEnCours(id);
  const chp = chaineParId(id);
  let paiement = '';
  if(chp && (chp.paye || []).includes(issue)) paiement = payerLaChaine(chp, a && a.data);
  c.actives = c.actives.filter(a => a.id !== id);
  if(!c.faites.includes(id)) c.faites.push(id);
  c.issues[id] = issue;
  const ch = chaineParId(id);
  if(ch && ch.fin) { try { ch.fin(issue); } catch(e){ /* une fin ne doit jamais casser le tour */ } }
  if(ch && hero.chroniques){
    const d = dateFromSemaines(semaineCourante());
    const ligne = (ch.issues && ch.issues[issue]) || `${ch.titre} — l'affaire est close.`;
    hero.chroniques.push({ date:`${d.saison}, An ${d.an}`, texte:'❧ ' + ligne });
  }
  saveGame(true);
  if(paiement){
    const box = document.getElementById('eventModalBox');
    box.innerHTML = `${artEventBanner('tr_prix', 'CONTRAT')}
      <span class="event-tag">Règlement</span><h3>${ch.titre}</h3>
      <p class="narrative">${paiement}</p>
      <div style="margin-top:16px;text-align:right;"><button class="primary" id="chPayeBtn">Continuer</button></div>`;
    document.getElementById('eventModal').style.display = 'flex';
    document.getElementById('chPayeBtn').onclick = () => {
      closeEventModal(); renderPersonnage(); showScreen('lieu'); renderLieu();
    };
  }
}

/* ============================= LE TEMPS QUI RATTRAPE ============================= */

/* Les étapes dont l'heure est venue. Appelé en fin de tour. */
function etapesMures(){
  return heroChaines().actives.filter(a => a.echeance <= semaineCourante());
}

/* Rend true si une étape s'est ouverte ; `apres` reprend derrière. */
function tenterEtapeDeChaine(apres){
  if(evenementEnCours()) return false;      // un récit est déjà en vol
  const mures = etapesMures();
  if(!mures.length) return false;
  // L'affaire en cours passe avant les chaînes d'arrière-plan : c'est elle
  // qu'on attend.
  const a = mures.find(x => { const ch = chaineParId(x.id); return ch && ch.type === 'contrat'; }) || mures[0];
  return jouerEtapeChaine(a.id, apres);
}

/* ============================= CE QU'ON EN VOIT ============================= */

/* La ligne d'état d'une affaire en cours, pour l'écran du lieu. */
function blocAffaireEnCours(){
  const a = affaireEnCours();
  if(!a) return '';
  const ch = chaineParId(a.id);
  if(!ch) return '';
  const et = etapeParId(ch, a.etape);
  const reste = Math.max(0, a.echeance - semaineCourante());
  const i = ch.etapes.findIndex(e => e.id === a.etape) + 1;
  return `<div class="affaire-cours">
    <div class="ac-tete"><span class="ac-titre">${ch.titre}</span>
      <span class="ac-etape">${i}/${ch.etapes.length}</span></div>
    <div class="ac-qui">${ch.commanditaire}</div>
    <p class="ac-attente">${reste > 0
      ? `${et && et.attente ? et.attente : "Il n'y a plus qu'à attendre."} <b>Environ ${reste} semaine${reste > 1 ? 's' : ''}.</b>`
      : `<b>La suite vous attend.</b> Terminez le tour.`}</p>
  </div>`;
}

/* Ce que l'épilogue et les autres chaînes relisent. */
function chainesMenees(){ return heroChaines().faites.length; }
function chaineFinieAinsi(id, issue){ return issueDeChaine(id) === issue; }
