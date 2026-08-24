/* PARIAS — Composer une rencontre
 *
 * Un contrat envoyait une créature, tirée dans le bestiaire par palier de
 * Danger, plus un doublon quand elle était trop faible. Résultat : « retrouver
 * une cible qui ne veut pas être retrouvée », commandité par une maison noble,
 * finissait sur un sanglier — et deux contrats de suite se ressemblaient.
 *
 * Une rencontre se compose maintenant comme une vraie opposition :
 *
 *   · le TYPE de l'affaire dit à quelle famille on a affaire (une traque, une
 *     récupération ou une guerre opposent des hommes ; une chasse oppose une
 *     bête ; un sauvetage, ce qui tient le prisonnier) ;
 *   · le LIEU dit lesquels : on ne croise pas les mêmes hommes chez les nains
 *     et dans les dunes khesh ;
 *   · le DANGER dit combien et de quelle trempe : un meneur, ses élites, sa
 *     piétaille, et parfois un soutien qui tire ou qui soigne.
 *
 * On y gagne trois choses : des combats qui ressemblent à leur pitch, une
 * difficulté qui vient du nombre autant que des chiffres, et une raison
 * mécanique de viser le chaman avant les guerriers.
 */

/* Ce qu'une affaire met en face de vous. */
const FAMILLE_PAR_TYPE = {
  chasse:        ['bete', 'monstre'],
  sauvetage:     ['homme', 'monstre'],
  traque:        ['homme'],
  "récupération":['homme', 'mort'],
  "enquête":     ['homme'],
  guerre:        ['homme'],
};

/* Les hommes qu'on croise quelque part. Un peuple ne se bat pas avec les
 * hommes d'un autre. */
const HOMMES_PAR_PEUPLE = {
  humains:     ['BST_041','BST_042','BST_043','BST_044','BST_045','BST_046','BST_047','BST_048','BST_049','BST_050','BST_061','BST_062','BST_063'],
  parias:      ['BST_041','BST_042','BST_043','BST_061','BST_062','BST_049'],
  khesh:       ['BST_056','BST_041','BST_042','BST_043','BST_061'],
  elfes:       ['BST_057','BST_063','BST_061'],
  elfes_noirs: ['BST_051','BST_052','BST_057','BST_061'],
  nains:       ['BST_060','BST_061','BST_043'],
  peaux_vertes:['BST_053','BST_054','BST_055'],
  hommes_betes:['BST_058','BST_059'],
  null:        ['BST_041','BST_042','BST_043','BST_044','BST_061'],
};

function bestiaireDe(id){ return BESTIARY_FULL.find(b => b.id === id) || null; }

/* Le vivier d'une rencontre : famille compatible, palier de Danger tenable, et
 * cohérent avec l'endroit quand il s'agit d'hommes. */
function vivierRencontre(familles, lo, hi, peuple){
  const permis = new Set(HOMMES_PAR_PEUPLE[peuple] || HOMMES_PAR_PEUPLE.null);
  const tirer = (bas, haut, roster) => BESTIARY_FULL.filter(b => {
    if(!familles.includes(b.famille)) return false;
    if(b.danger < bas || b.danger > haut) return false;
    if(b.famille === 'homme' && roster && !roster.has(b.id)) return false;
    return true;
  });
  let v = tirer(Math.max(1, lo - 1), hi, permis);
  if(v.length) return v;
  // Le peuple d'ici n'a personne à ce palier : on élargit la fourchette avant
  // de changer d'espèce. Une traque doit opposer des hommes, même si les
  // Hommes-Bêtes n'alignent pas de piétaille à ce niveau-là.
  v = tirer(1, 6, permis);
  if(v.length) return v;
  // Toujours rien : les mercenaires et les brigands, eux, vont partout.
  return tirer(Math.max(1, lo - 1), hi, new Set(HOMMES_PAR_PEUPLE.null));
}

function tirerDans(liste, filtre){
  const p = liste.filter(filtre);
  if(!p.length) return null;
  return p[Math.floor(Math.random() * p.length)];
}

/* Combien d'adversaires selon le palier. Un Danger élevé, c'est d'abord un
 * meneur ; un Danger faible, c'est du nombre. */
function tailleDeGroupe(danger){
  if(danger <= 1) return { pietaille:[2, 3], elite:0, soutien:0, meneur:false };
  if(danger === 2) return { pietaille:[2, 4], elite:0, soutien:0.4, meneur:false };
  if(danger === 3) return { pietaille:[2, 3], elite:0, soutien:0.5, meneur:true };
  if(danger === 4) return { pietaille:[1, 3], elite:1, soutien:0.5, meneur:true };
  if(danger === 5) return { pietaille:[0, 2], elite:1, soutien:0.6, meneur:true };
  return { pietaille:[0, 1], elite:1, soutien:0.4, meneur:true };   // 6 : le meneur suffit
}

/* La rencontre d'une affaire. Rend un tableau de gabarits prêt pour
 * startCombat, et une phrase qui dit à quoi on a affaire. */
function composerRencontre(c, lieu){
  const [lo, hi] = DANGER_MAP[c.danger] || [1, 2];
  const familles = FAMILLE_PAR_TYPE[c.type] || ['bete', 'monstre'];
  const peuple = lieu ? peupleDuLieu(lieu) : null;

  // Une créature nommée dans le titre reste la menace : « Les Trois Frères
  // Rouges » n'est pas un ours, mais « Le Basilic de la mine » en est un.
  const nomme = BESTIARY_FULL.find(b =>
    c.titre && c.titre.toLowerCase().includes(b.nom.toLowerCase()));

  let vivier = vivierRencontre(familles, lo, hi, peuple);
  if(!vivier.length) vivier = vivierRencontre(['bete', 'monstre'], lo, hi, peuple);
  if(!vivier.length) vivier = BESTIARY_FULL.filter(b => b.danger >= lo && b.danger <= hi);
  if(!vivier.length) vivier = BESTIARY_FULL.slice();

  const t = tailleDeGroupe(hi);
  const groupe = [];

  const meneur = nomme
    || (t.meneur ? (tirerDans(vivier, b => b.role === 'meneur' && b.danger >= hi - 1)
                 || tirerDans(vivier, b => b.role === 'élite')) : null)
    || tirerDans(vivier, b => b.danger === hi)
    || vivier[0];
  groupe.push(meneur);

  const memeFamille = b => b.famille === meneur.famille;
  if(t.elite){
    const e = tirerDans(vivier, b => b.role === 'élite' && b.id !== meneur.id && memeFamille(b));
    if(e) groupe.push(e);
  }
  if(Math.random() < t.soutien){
    const s = tirerDans(vivier, b => b.role === 'soutien' && memeFamille(b));
    if(s) groupe.push(s);
  }
  const [minP, maxP] = t.pietaille;
  const n = minP + Math.floor(Math.random() * (maxP - minP + 1));
  // Le repli reste dans la famille du meneur : un ours n'escorte pas un sergent.
  const pietaille = tirerDans(vivier, b => b.role === 'piétaille' && memeFamille(b))
                 || tirerDans(vivier, b => b.id !== meneur.id && memeFamille(b) && b.danger <= meneur.danger)
                 || tirerDans(BESTIARY_FULL, b => b.famille === meneur.famille && b.role === 'piétaille'
                                                  && b.danger <= Math.max(1, meneur.danger))
                 || meneur;
  for(let i = 0; i < n; i++) groupe.push(pietaille);

  // Jamais plus de cinq : au-delà, l'écran de combat devient illisible et le
  // tour du joueur interminable. Et jamais deux familles dans le même groupe.
  return groupe.filter(b => b && b.famille === meneur.famille)
               .slice(0, 5)
               .map(b => JSON.parse(JSON.stringify(b)));
}

/* ---- Le pluriel, correctement ----
 * « 3 épéiste à gagess » n'est pas du français. Dans un nom composé, seul le
 * noyau se met au pluriel : ce qui suit une préposition n'y touche pas
 * (épéistes à gages, chiens des dunes). Sans préposition, tout s'accorde
 * (loups déformés, meutes affamées). */
const PREPOSITIONS = / (?:à|de|des|du|au|aux|sans|sous|en) | d'/;

function motAuPluriel(mot){
  if(/[sxz]$/i.test(mot)) return mot;                 // ours, chauve-souris
  if(/al$/i.test(mot)) return mot.slice(0, -2) + 'aux';
  if(/(eau|eu)$/i.test(mot)) return mot + 'x';
  return mot + 's';
}

function pluriel(nom){
  const coupe = nom.search(PREPOSITIONS);
  const noyau = coupe === -1 ? nom : nom.slice(0, coupe);
  const reste = coupe === -1 ? '' : nom.slice(coupe);
  return noyau.split(/([ -])/).map(m => /^[ -]$/.test(m) ? m : motAuPluriel(m)).join('') + reste;
}

/* Comment on l'annonce avant d'engager. */
function annonceRencontre(groupe){
  const counts = {};
  groupe.forEach(b => { counts[b.nom] = (counts[b.nom] || 0) + 1; });
  const parts = Object.entries(counts).map(([nom, n]) =>
    n > 1 ? `${n} ${pluriel(nom.charAt(0).toLowerCase() + nom.slice(1))}` : nom);
  const danger = Math.max(...groupe.map(b => b.danger));
  const liste = parts.length > 1
    ? parts.slice(0, -1).join(', ') + ' et ' + parts[parts.length - 1]
    : parts[0];
  return { liste, danger, nombre: groupe.length };
}
