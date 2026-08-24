/* PARIAS — Le temps qui passe, et ce qu'on transmet
 *
 * Le Prix du Paria promettait depuis le début qu'« une descendance pourrait en
 * naître ». Elle en naît maintenant.
 *
 * Deux choses liées, parce que c'est la même :
 *
 *   LE TEMPS. Yohan a vingt-sept ans au premier tour et vieillit avec le
 *   calendrier. Passé quarante-cinq ans le corps commence à compter, passé
 *   cinquante-cinq il compte pour de bon. Les compagnons vieillissent aussi —
 *   sauf Alarielle, qui a deux cent quarante ans et pour qui une chronique
 *   entière est une saison.
 *
 *   LA LIGNÉE. Une liaison nouée au Prix du Paria est enregistrée. À chaque
 *   tour, elle peut donner une conception ; quarante semaines plus tard, une
 *   naissance. L'enfant porte les deux maisons, et le sang Paria une fois sur
 *   deux — c'est un héritage latent, pas une certitude.
 *
 * Ce que ça rapporte est réel et immédiat : une maison qui vous doit un enfant
 * vous soutient, et avoir quelqu'un à qui transmettre change ce qu'on fait de
 * sa vie.
 */

const AGE_DEPART = 27;
const GESTATION_SEMAINES = 40;
const CHANCE_CONCEPTION = 0.16;      // par tour, par liaison sans enfant en cours
const CHANCE_SANG_PARIA = 0.5;       // héritage latent, pas transmission garantie

const PRENOMS_FILS  = ["Otto","Perrin","Aldric","Gauvain","Bertrand","Renaud","Étienne","Guiral"];
const PRENOMS_FILLES = ["Ysoré","Aliénor","Mahaut","Berthe","Sibylle","Ermengarde","Clarisse","Aude"];

function heroLignee(){
  if(!hero.lignee) hero.lignee = { liaisons: [], enfants: [] };
  if(typeof hero.age !== 'number') hero.age = AGE_DEPART;
  return hero.lignee;
}

/* ============================= LIAISONS ============================= */

/* Nouée quand le Prix du Paria est réclamé avec consentement. */
function nouerLiaison(nom, maison, origine){
  const l = heroLignee();
  if(l.liaisons.some(x => x.nom === nom)) return null;
  const liaison = {
    nom, maison, origine,
    semaine: hero.temps ? hero.temps.semaines : 0,
    grossesse: null,      // semaine de conception, tant que l'enfant n'est pas né
    enfants: [],
  };
  l.liaisons.push(liaison);
  // La maison qui a consenti soutient Yohan — en or, chaque tour (voir
  // renteDesMaisons). Ce que la noblesse en pense, en revanche, dépend de la
  // façon dont il a réclamé son Prix : c'est prix.js qui en décide.
  if(!hasFlag('prix_noble_accepte')) heroFlags().push('prix_noble_accepte');
  return liaison;
}

/* Rente des maisons alliées : on ne l'annonce pas, elle arrive. */
function renteDesMaisons(){
  return heroLignee().liaisons.length * 60;
}

/* ============================= LE TEMPS ============================= */

/* Appelé par advanceTime. Rend la liste de ce qui s'est produit, pour que le
 * joueur le lise au lieu de le découvrir dans un tableau. */
function passerLeTemps(semaines){
  const l = heroLignee();
  const evenements = [];
  const avantAge = hero.age;
  hero.age = AGE_DEPART + Math.floor((hero.temps.semaines) / 52);
  if(hero.age !== avantAge && hero.age % 10 === 0)
    evenements.push({ type:'age', texte:`Yohan a ${hero.age} ans.` });

  l.enfants.forEach(e => { e.age = Math.floor((hero.temps.semaines - e.ne) / 52); });

  l.liaisons.forEach(liaison => {
    if(liaison.grossesse === null){
      if(Math.random() < CHANCE_CONCEPTION){
        liaison.grossesse = hero.temps.semaines;
        evenements.push({ type:'conception',
          texte:`${liaison.nom} fait savoir qu'elle attend un enfant. Elle ne demande rien.` });
      }
      return;
    }
    if(hero.temps.semaines - liaison.grossesse >= GESTATION_SEMAINES){
      const enfant = faireNaitre(liaison);
      evenements.push({ type:'naissance', enfant,
        texte:`${liaison.maison} annonce la naissance de <b>${enfant.nom}</b>, ${enfant.sexe === 'f' ? 'fille' : 'fils'} de ${liaison.nom}.` +
              (enfant.paria ? ` Les sages-femmes ont noté quelque chose et n'en ont parlé à personne.` : '') });
    }
  });

  return evenements;
}

/* « Maison de Corven » → « de Corven » ; « Vauclair » → « de Vauclair ». */
function nomDeMaison(maison){
  const brut = (maison || 'sans nom').replace(/^(La )?Maison\s+/i, '').trim();
  return /^(de |du |des |d')/i.test(brut) ? brut : 'de ' + brut;
}

function faireNaitre(liaison){
  const l = heroLignee();
  const fille = Math.random() < 0.5;
  const pool = fille ? PRENOMS_FILLES : PRENOMS_FILS;
  const pris = l.enfants.map(e => e.nom.split(' ')[0]);
  const dispo = pool.filter(p => !pris.includes(p));
  const prenom = (dispo.length ? dispo : pool)[Math.floor(Math.random() * (dispo.length ? dispo.length : pool.length))];
  const enfant = {
    nom: prenom + ' ' + nomDeMaison(liaison.maison),
    sexe: fille ? 'f' : 'm',
    mere: liaison.nom, maison: liaison.maison,
    ne: hero.temps.semaines, age: 0,
    paria: Math.random() < CHANCE_SANG_PARIA,
  };
  l.enfants.push(enfant);
  liaison.enfants.push(enfant.nom);
  liaison.grossesse = null;

  // Ce que ça change, tout de suite.
  ajusterReputation('humains', 12);
  gainPointsSang(10);
  if(enfant.paria){ gainPointsSang(10); ajusterReputation('parias', 10); }
  if(l.enfants.length === 1){
    // Avoir quelqu'un à qui transmettre change ce qu'on fait de sa vie.
    hero.talentPoints += 1;
    if(!hasFlag('descendance')) heroFlags().push('descendance');
  }
  if(enfant.paria && !hasFlag('heritier_paria')) heroFlags().push('heritier_paria');
  return enfant;
}

/* ============================= EFFETS DE L'ÂGE ============================= */
/* Lus par applyPassiveEffects : le corps finit par compter. */
function malusAge(){
  if(hero.age >= 55) return { agi:-2, pvMax:-8, note:"Cinquante-cinq ans. Les matins sont plus longs qu'avant." };
  if(hero.age >= 45) return { agi:-1, pvMax:-3, note:"Quarante-cinq ans. Rien de grave, sauf qu'on le sent le lendemain." };
  return { agi:0, pvMax:0, note:null };
}

/* ============================= AFFICHAGE ============================= */

function renderLignee(){
  const el = document.getElementById('ligneeBloc');
  if(!el) return;
  const l = heroLignee();
  const m = malusAge();

  let html = `<div class="lignee-age">Yohan a <b>${hero.age} ans</b>.` +
    (m.note ? ` <span class="lignee-note">${m.note}</span>` : '') + `</div>`;

  if(!l.liaisons.length && !l.enfants.length){
    html += `<p class="lignee-vide">Aucune liaison, aucun enfant. Le nom Karlsberg s'arrête à lui,
      et il le sait chaque fois qu'on le lui rappelle.</p>`;
    el.innerHTML = html;
    return;
  }

  html += `<div class="lignee-liste">`;
  l.liaisons.forEach(li => {
    const attend = li.grossesse !== null;
    const reste = attend ? Math.max(0, GESTATION_SEMAINES - (hero.temps.semaines - li.grossesse)) : 0;
    html += `<div class="lignee-carte">
      <div class="lignee-nom">${li.nom}</div>
      <div class="lignee-meta">${li.maison}${li.origine ? ' · ' + li.origine : ''}</div>
      <div class="lignee-etat">${attend
        ? `Attend un enfant — environ ${reste} semaine${reste > 1 ? 's' : ''}.`
        : (li.enfants.length ? li.enfants.join(', ') : 'Rien à annoncer.')}</div>
    </div>`;
  });
  l.enfants.forEach(e => {
    html += `<div class="lignee-carte enfant">
      <div class="lignee-nom">${e.nom}${e.paria ? ' <span class="lignee-onde">Onde</span>' : ''}</div>
      <div class="lignee-meta">${e.sexe === 'f' ? 'Fille' : 'Fils'} de ${e.mere} · ${e.age} an${e.age > 1 ? 's' : ''}</div>
      <div class="lignee-etat">${e.paria
        ? "Porte le sang. Personne ne le lui a encore dit."
        : "Ne porte rien de particulier. C'est peut-être une chance."}</div>
    </div>`;
  });
  html += `</div>`;
  if(l.liaisons.length){
    html += `<p class="lignee-rente">Les maisons alliées versent <b>${renteDesMaisons()} or</b> par tour.</p>`;
  }
  el.innerHTML = html;
}
