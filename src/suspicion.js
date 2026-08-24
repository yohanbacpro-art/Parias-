/* PARIAS — La Suspicion, et ce qu'elle coûte
 *
 * Elle ne se contente plus d'être un nombre dans la barre du haut. Elle fait
 * trois choses :
 *
 *   1. ELLE SE PAIE, en permanence. Un homme recherché paie plus cher, se fait
 *      moins bien recruter, et voit son armée coûter davantage : nourrir vingt
 *      hommes sans attirer l'attention, ça se facture.
 *   2. ELLE PARLE. À chaque fin de tour, plus la Suspicion est haute, plus il
 *      arrive quelque chose à cause d'elle — un portrait cloué sur une porte,
 *      un rabatteur, un cordon de troupes. Ces événements-là sont aussi les
 *      seuls endroits où l'on peut la faire redescendre vite.
 *   3. ELLE SE VOIT. L'écran du lieu dit toujours, en clair, ce que la
 *      Suspicion actuelle change pour vous ici et maintenant.
 *
 * Rien n'est jamais gratuit : faire baisser la Suspicion coûte de l'or, du
 * temps, du Renom, ou quelque chose qu'on préférerait ne pas avoir fait.
 */

/* ============================= LES QUATRE PALIERS ============================= */

const SUSPICION_PALIERS = [
  { max:29,  cle:'low',  label:"Discret",
    resume:"Un visage parmi d'autres. Personne ne relie encore les histoires entre elles.",
    prixMult:1,    entretienMult:1,    chasse:0,    recrutement:0 },
  { max:59,  cle:'mid',  label:"Remarqué",
    resume:"On vous a décrit à deux ou trois personnes qui écrivent ce qu'on leur dit.",
    prixMult:1.08, entretienMult:1.10, chasse:0.10, recrutement:-10 },
  { max:84,  cle:'high', label:"Traqué",
    resume:"Votre nom circule avec un prix à côté. Les marchands surfacturent le risque de vous servir.",
    prixMult:1.20, entretienMult:1.25, chasse:0.25, recrutement:-25 },
  { max:100, cle:'crit', label:"Chasse ouverte",
    resume:"Ce n'est plus une prime, c'est une opération. On ferme des vallées pour vous.",
    prixMult:1.40, entretienMult:1.50, chasse:0.40, recrutement:-45 },
];

function palierSuspicion(v){
  const s = v === undefined ? (hero.suspicion || 0) : v;
  return SUSPICION_PALIERS.find(p => s <= p.max) || SUSPICION_PALIERS[SUSPICION_PALIERS.length - 1];
}

/* Ce que la Suspicion change, tout de suite. Certaines choses la tempèrent :
 * un faux portrait qui circule, un nom inscrit dans un registre, un réseau
 * qui ment pour vous. */
function suspicionEffets(){
  const p = palierSuspicion();
  const e = { cle:p.cle, label:p.label, resume:p.resume,
              prixMult:p.prixMult, entretienMult:p.entretienMult,
              chasse:p.chasse, recrutement:p.recrutement, couvertures:[] };
  const couv = [
    ['su_faux_portrait',    "un faux portrait circule à votre place", 0.35],
    ['su_inscrit_registre', "vous existez dans un registre sous un autre nom", 0.25],
    ['su_reseau_vallee',    "quatre personnes mentent pour vous sans qu'on le leur demande", 0.30],
    ['su_medecin_allie',    "un médecin ne se souvient d'aucun bras", 0.15],
    ['su_dette_maison',     "une maison a fait effacer votre nom — et vous le rappellera", 0.50],
  ];
  couv.forEach(([f, texte, force]) => {
    if(typeof hasFlag === 'function' && hasFlag(f)){
      e.couvertures.push(texte);
      e.chasse *= (1 - force);
      e.prixMult = 1 + (e.prixMult - 1) * (1 - force * 0.6);
      e.recrutement = Math.round(e.recrutement * (1 - force * 0.6));
    }
  });
  return e;
}

/* Multiplicateurs lus par la boutique et par la solde. */
function suspicionPrixMult(){ return suspicionEffets().prixMult; }
function suspicionEntretienMult(){ return suspicionEffets().entretienMult; }

/* ============================= LES ÉVÉNEMENTS ============================= */

/* Probabilité qu'un événement de Suspicion se produise en fin de tour. À zéro
 * on est tranquille ; en chasse ouverte, il arrive presque toujours quelque
 * chose. Une couverture solide réduit la pression. */
function chanceEvenementSuspicion(){
  const s = hero.suspicion || 0;
  if(s < 12) return 0;
  const e = suspicionEffets();
  const base = Math.min(0.75, 0.10 + s / 140);
  const abri = e.couvertures.length ? 0.75 : 1;
  return base * abri;
}

function evenementsSuspicionDisponibles(){
  const vus = heroVus();
  return EVENTS_SUSPICION.filter(ev => !vus.includes(ev.id) && conditionsRemplies(ev.requis));
}

/* Choisit un événement en penchant vers ce dont le joueur a besoin : au-dessus
 * de 60 de Suspicion, on lui offre plus souvent une porte de sortie. */
function tirerEvenementSuspicion(){
  const pool = evenementsSuspicionDisponibles();
  if(!pool.length) return null;
  const veutSortie = (hero.suspicion || 0) >= 60;
  const sens = veutSortie ? 'baisse' : 'hausse';
  const prefere = pool.filter(e => e.sens === sens);
  const liste = (prefere.length && Math.random() < 0.65) ? prefere : pool;
  return liste[Math.floor(Math.random() * liste.length)];
}

/* Rend true si un événement a été ouvert. `apres` est rappelé à sa fermeture. */
function tenterEvenementSuspicion(apres){
  if(evenementEnCours()) return false;      // un récit est déjà en vol
  if(Math.random() >= chanceEvenementSuspicion()) return false;
  const ev = tirerEvenementSuspicion();
  if(!ev) return false;
  filerApres(apres);
  openWrittenEvent(ev, LOCATIONS.find(l => l.id === hero.position) || null);
  return true;
}

/* ============================= CE QU'ON EN VOIT ============================= */

function blocSuspicion(){
  const e = suspicionEffets();
  const s = hero.suspicion || 0;
  const lignes = [];
  if(e.prixMult > 1.001)     lignes.push(`Les marchands vous vendent ${Math.round((e.prixMult - 1) * 100)} % plus cher`);
  if(e.entretienMult > 1.001) lignes.push(`Entretenir votre troupe coûte ${Math.round((e.entretienMult - 1) * 100)} % de plus`);
  if(e.recrutement < 0)      lignes.push(`On hésite à s'engager auprès de vous (${e.recrutement} au recrutement)`);
  if(e.chasse > 0)           lignes.push(`Environ ${Math.round(e.chasse * 100)} % de chances qu'on vous cherche activement chaque tour`);
  if(!lignes.length)         lignes.push("Rien ne change pour l'instant. C'est le but.");

  return `<div class="susp-bloc susp-${e.cle}">
    <div class="susp-tete"><span class="susp-label">${e.label}</span>
      <span class="susp-jauge"><i style="width:${s}%"></i></span>
      <span class="susp-val">${s}/100</span></div>
    <p class="susp-resume">${e.resume}</p>
    <ul class="susp-effets">${lignes.map(l => `<li>${l}</li>`).join('')}</ul>
    ${e.couvertures.length
      ? `<div class="susp-couv">Ce qui vous couvre : ${e.couvertures.join(' · ')}.</div>` : ''}
  </div>`;
}
