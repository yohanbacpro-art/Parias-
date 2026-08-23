/* PARIAS — Moteur des affaires locales
 *
 * Transforme les données de contracts_locaux.js en deux choses :
 *
 *   · des contrats jouables par le moteur existant, avec le vrai nom du lieu
 *     à la place des « marais de Sombreval » du registre général ;
 *   · un dénouement par lieu, converti en événement écrit ordinaire, pour qu'il
 *     bénéficie du même moteur de scènes, des mêmes effets et des mêmes
 *     contrôles que tout le reste.
 *
 * Le dossier d'un lieu est la mémoire de ce qu'on y a réglé : trois affaires
 * closes, et l'endroit change pour de bon.
 */

/* ---- Expansion en contrats jouables ---- */
function lieuNomDe(locId){
  const l = LOCATIONS.find(x => x.id === locId);
  return l ? l.nom : locId;
}

const CONTRATS_LOCAUX_EXPANSES = (() => {
  const out = {};
  for(const [locId, d] of Object.entries(CONTRATS_LOCAUX)){
    const nomLieu = lieuNomDe(locId);
    out[locId] = d.affaires.map(a => ({
      id: a.id,
      titre: a.titre,
      commanditaire: a.commanditaire,
      lieu: nomLieu,
      locId,
      local: true,
      type: a.type,
      danger: a.danger,
      pitch: a.pitch,
      or: a.or,
      complications: CONTRACT_COMPLICATIONS,
      issues: CONTRACT_ISSUES,
      prix_paria: a.noble ? {
        negocie_avant_depart: true,
        noble_proposee: { nom:a.noble, maison:a.commanditaire, adulte:true, consentement_requis:true },
        choix: ["OR", "NOBLE_CONSENTANTE", "OR_ET_NOBLE_CONSENTANTE", "NEGOCIER", "REFUSER"],
      } : null,
    }));
  }
  return out;
})();

/* ---- Les dénouements, convertis en événements écrits ---- */
const EVENTS_DOSSIERS = Object.entries(CONTRATS_LOCAUX).map(([locId, d]) => {
  const dn = d.denouement;
  const scenes = {
    start: {
      texte: dn.intro,
      choix: dn.choix.map((c, i) => ({
        label: c.label, detail: c.detail, suite: 'issue_' + i, effets: c.effets,
      })),
    },
  };
  dn.choix.forEach((c, i) => { scenes['issue_' + i] = { texte: c.texte, fin: true }; });
  return {
    id: dn.id, titre: dn.titre, famille: dn.famille, rarete: 'épique',
    image: dn.image, lieux: [locId], dossier: true,
    requis: { sansFlags: [dn.id.toLowerCase() + '_fait'] },
    scenes,
  };
});

/* ---- État du joueur ---- */
function heroDossiers(){
  if(!hero.dossiers) hero.dossiers = {};
  return hero.dossiers;
}
function dossierDe(locId){
  const d = heroDossiers();
  if(!d[locId]) d[locId] = [];
  return d[locId];
}
/* Appelé à la clôture d'un contrat local, quelle qu'en soit l'issue : une
 * affaire ratée reste une affaire réglée pour ceux qui vivent là. */
function noterAffaireReglee(contrat){
  if(!contrat || !contrat.local) return;
  const fait = dossierDe(contrat.locId);
  if(!fait.includes(contrat.id)) fait.push(contrat.id);
}

function affairesDuLieu(locId){
  return (CONTRATS_LOCAUX_EXPANSES[locId] || []).filter(c => !dossierDe(locId).includes(c.id));
}
function dossierComplet(locId){
  const total = (CONTRATS_LOCAUX_EXPANSES[locId] || []).length;
  return total > 0 && dossierDe(locId).length >= total;
}
function denouementDisponible(locId){
  if(!dossierComplet(locId)) return null;
  const ev = EVENTS_DOSSIERS.find(e => e.lieux[0] === locId);
  if(!ev || hasFlag(ev.id.toLowerCase() + '_fait')) return null;
  return ev;
}
/* Combien de lieux ont été menés jusqu'au bout — lu par l'épilogue. */
function dossiersClos(){
  return EVENTS_DOSSIERS.filter(e => hasFlag(e.id.toLowerCase() + '_fait')).length;
}

/* ---- Affichage du registre ---- */
function renderAffairesLocales(){
  const bloc = document.getElementById('affairesLocales');
  if(!bloc) return;
  const lieu = currentLieu || LOCATIONS.find(l => l.id === hero.position) || null;
  if(!lieu){ bloc.innerHTML = ''; return; }

  const restantes = affairesDuLieu(lieu.id);
  const fait = dossierDe(lieu.id).length;
  const total = (CONTRATS_LOCAUX_EXPANSES[lieu.id] || []).length;
  const den = denouementDisponible(lieu.id);
  const clos = dossierComplet(lieu.id) && !den;

  let html = `<div class="dossier-tete"><span class="dossier-nom">${(CONTRATS_LOCAUX[lieu.id]||{}).dossier || lieu.nom}</span>
    <span class="dossier-compte">${fait}/${total} affaires réglées</span></div>`;

  if(den){
    html += `<div class="dossier-den">Les trois affaires sont closes. Ce qui reste à décider ne se paie pas en or :
      ce sera l'état de cet endroit pour longtemps.
      <button class="primary" id="btnDenouement">${den.titre}</button></div>`;
  } else if(clos){
    html += `<p class="dossier-clos">Ce lieu est réglé. Ce qui s'y passe désormais vous doit quelque chose.</p>`;
  }
  bloc.innerHTML = html;

  restantes.forEach(c => {
    const row = document.createElement('div');
    row.className = 'contract-row locale';
    row.innerHTML = `<div><div class="cr-titre">${c.titre}</div>
      <div class="cr-meta">${c.commanditaire} · ${c.lieu} · ${c.type} · ${c.danger}</div></div>
      <span class="cr-badge ${c.prix_paria ? 'paria' : ''}">${c.prix_paria ? 'Prix Paria' : c.or + ' or'}</span>`;
    row.onclick = () => openContract(c);
    bloc.appendChild(row);
  });

  const b = document.getElementById('btnDenouement');
  if(b) b.onclick = () => openWrittenEvent(den, lieu);
}
