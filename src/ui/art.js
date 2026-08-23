/* PARIAS — Illustrations
 *
 * Deux registres d'images, résolus par identifiant :
 *   assets/events/<id>.webp     bandeau d'illustration d'un événement
 *   assets/portraits/<id>.webp  portrait d'un personnage
 *
 * Tant qu'un fichier n'existe pas, le jeu DESSINE l'image à sa place, en SVG,
 * de façon déterministe : le même personnage a toujours le même visage, le même
 * événement le même paysage. Ce n'est pas un pis-aller anonyme — le dessin est
 * informé par ce qu'il représente :
 *
 *   · un portrait prend la palette du peuple du personnage (PORTRAITS[id].peuple)
 *     et sa silhouette de ses attributs (PORTRAITS[id].trait) : capuche, heaume,
 *     couronne, voile, cornes, barbe…
 *   · un bandeau prend son ciel, son horizon et son motif de la famille de
 *     l'événement (VOYAGE, ONDE, NAIN, KHESH…).
 *
 * Déposer un vrai fichier au bon chemin suffit à remplacer le dessin, sans
 * toucher au code. Formats : bandeau 1200×480 (5:2), portrait 512×512.
 */

const ART_PATHS = { event: 'assets/events/', portrait: 'assets/portraits/' };
const ART_EXT = '.webp';

/* Illustrations embarquées. Vide en développement : le jeu lit alors les
 * fichiers de assets/. tools/build-standalone.js remplit cette table de données
 * en base64 pour le fichier unique — un fichier unique ne peut pas aller
 * chercher une image à côté de lui, et la page publiée n'a pas de « à côté ». */
const ART_INLINE = (typeof ART_INLINE_DATA !== 'undefined') ? ART_INLINE_DATA : {};

/* Source d'une illustration : embarquée si on l'a, sinon le fichier attendu. */
function artSource(id, kind){
  const embarquee = ART_INLINE[kind + '/' + id];
  return embarquee || (ART_PATHS[kind] + id + ART_EXT);
}

/* Hachage stable (FNV-1a) : même id → même image, d'une partie à l'autre. */
function artHash(str){
  let h = 0x811c9dc5;
  for(let i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}
/* Suite déterministe tirée d'un identifiant : chaque appel avance d'un cran. */
function artSuite(id){
  let h = artHash(id);
  return () => { h ^= h << 13; h >>>= 0; h ^= h >> 17; h ^= h << 5; h >>>= 0; return h / 4294967296; };
}

/* ============================= PALETTES ============================= */
/* Chaque peuple a son encre : un fond, une carnation, un accent. */
const ART_PEUPLES = {
  humain:      { fond:'#3a352e', peau:'#c2a184', tissu:'#6b6257', accent:'#cbb99a' },
  paria:       { fond:'#2a1518', peau:'#b8977e', tissu:'#5e2027', accent:'#d2455a' },
  onde:        { fond:'#0e2b2a', peau:'#a9b6b2', tissu:'#14544f', accent:'#56d6c9' },
  elfe:        { fond:'#1d2c22', peau:'#e2d3bd', tissu:'#2f5c46', accent:'#cfe3c0' },
  elfe_noir:   { fond:'#1a1526', peau:'#8f8ba0', tissu:'#2a2140', accent:'#b39ddb' },
  nain:        { fond:'#2b1a10', peau:'#c9a07a', tissu:'#6b3b1c', accent:'#d99a4e' },
  khesh:       { fond:'#3a2a10', peau:'#a9754c', tissu:'#7a5a24', accent:'#e6c274' },
  peau_verte:  { fond:'#1e2412', peau:'#6f8f45', tissu:'#35471f', accent:'#8fbe4a' },
  homme_bete:  { fond:'#241c14', peau:'#7d6448', tissu:'#4a3a2a', accent:'#cfc0a3' },
  astrah:      { fond:'#231f1a', peau:'#bfa287', tissu:'#4a4038', accent:'#c6a04a' },
};
function artPeuple(nom){ return ART_PEUPLES[nom] || ART_PEUPLES.humain; }

/* ============================= PORTRAITS ============================= */
/* Un buste : épaules, cou, tête, puis les attributs du personnage. Le hachage
 * ne décide que du détail (largeur du visage, inclinaison) — l'identité vient
 * des métadonnées. */
function artVisage(id, meta){
  const m = meta || {};
  const p = artPeuple(m.peuple);
  const rnd = artSuite(id);
  const S = 512, cx = S/2;
  const teteR   = 106 + Math.round(rnd()*10);         // rayon du crâne
  const teteY   = 238;                                // centré : le médaillon rond recadre au milieu
  const machoire= teteR * (0.92 + rnd()*0.16);
  const epauleY = teteY + teteR + 62;
  const trait   = m.trait || 'nu';

  /* — Fond : champ dégradé + halo — */
  const fond = `
    <defs>
      <radialGradient id="f" cx="50%" cy="38%" r="80%">
        <stop offset="0%" stop-color="${p.tissu}" stop-opacity=".75"/>
        <stop offset="100%" stop-color="${p.fond}"/>
      </radialGradient>
      <linearGradient id="t" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${p.tissu}"/>
        <stop offset="100%" stop-color="${p.fond}"/>
      </linearGradient>
      <radialGradient id="v" cx="50%" cy="45%" r="72%">
        <stop offset="60%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity=".55"/>
      </radialGradient>
    </defs>
    <rect width="${S}" height="${S}" fill="url(#f)"/>
    <circle cx="${cx}" cy="${teteY}" r="${teteR*2.15}" fill="none" stroke="${p.accent}" stroke-width="1.5" opacity=".16"/>
    <circle cx="${cx}" cy="${teteY}" r="${teteR*1.62}" fill="none" stroke="${p.accent}" stroke-width="1.5" opacity=".22"/>`;

  /* — Buste — */
  const epaules = `<path d="M${cx-216} ${S} C ${cx-200} ${epauleY} ${cx-104} ${epauleY-30} ${cx} ${epauleY-30}
      C ${cx+104} ${epauleY-30} ${cx+200} ${epauleY} ${cx+216} ${S} Z" fill="url(#t)"/>`;
  const cou = `<path d="M${cx-30} ${teteY+teteR-14} L${cx-34} ${epauleY-20} L${cx+34} ${epauleY-20} L${cx+30} ${teteY+teteR-14} Z" fill="${p.peau}" opacity=".85"/>`;
  const tete = `<path d="M${cx-teteR} ${teteY-14}
      C ${cx-teteR} ${teteY-teteR*1.15} ${cx+teteR} ${teteY-teteR*1.15} ${cx+teteR} ${teteY-14}
      C ${cx+teteR} ${teteY+machoire*0.5} ${cx+machoire*0.52} ${teteY+machoire} ${cx} ${teteY+machoire}
      C ${cx-machoire*0.52} ${teteY+machoire} ${cx-teteR} ${teteY+machoire*0.5} ${cx-teteR} ${teteY-14} Z"
      fill="${p.peau}"/>`;

  /* — Regard : deux marques dans l'accent du peuple — */
  const oeilY = teteY - 4, oeilX = teteR * 0.42;
  const yeux = `
    <ellipse cx="${cx-oeilX}" cy="${oeilY}" rx="13" ry="${m.trait==='masque'?3:6}" fill="#100d0b"/>
    <ellipse cx="${cx+oeilX}" cy="${oeilY}" rx="13" ry="${m.trait==='masque'?3:6}" fill="#100d0b"/>
    <circle cx="${cx-oeilX}" cy="${oeilY}" r="4.2" fill="${m.onde ? ART_PEUPLES.onde.accent : p.accent}"/>
    <circle cx="${cx+oeilX}" cy="${oeilY}" r="4.2" fill="${m.onde ? ART_PEUPLES.onde.accent : p.accent}"/>
    <path d="M${cx-oeilX-16} ${oeilY-19} q 16 -8 32 -1" stroke="#2b211a" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M${cx+oeilX-16} ${oeilY-20} q 16 -7 32 1" stroke="#2b211a" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M${cx} ${oeilY+6} l -4 26 q 4 5 9 1" stroke="#8a6a52" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/>`;

  /* — Attributs : ce qui distingue vraiment un personnage d'un autre — */
  const A = {
    couronne: `<path d="M${cx-teteR*0.92} ${teteY-teteR*0.72} l ${teteR*0.34} ${-teteR*0.5} l ${teteR*0.3} ${teteR*0.34}
        l ${teteR*0.28} ${-teteR*0.56} l ${teteR*0.28} ${teteR*0.56} l ${teteR*0.3} ${-teteR*0.34} l ${teteR*0.34} ${teteR*0.5} Z"
        fill="${p.accent}" stroke="#1a140f" stroke-width="3"/>`,
    capuche: `<path d="M${cx-teteR*1.62} ${S}
        C ${cx-teteR*1.78} ${teteY-teteR*1.02} ${cx-teteR*1.12} ${teteY-teteR*1.62} ${cx} ${teteY-teteR*1.6}
        C ${cx+teteR*1.12} ${teteY-teteR*1.62} ${cx+teteR*1.78} ${teteY-teteR*1.02} ${cx+teteR*1.62} ${S} Z"
        fill="${p.tissu}" stroke="#0d0a08" stroke-width="3"/>
      <path d="M${cx-teteR*1.62} ${S} C ${cx-teteR*1.6} ${teteY+teteR*0.2} ${cx-teteR*1.2} ${teteY-teteR*1.1} ${cx-teteR*0.86} ${teteY-teteR*0.68}
        L ${cx-teteR*0.7} ${S} Z" fill="${p.fond}" opacity=".9"/>
      <path d="M${cx+teteR*1.62} ${S} C ${cx+teteR*1.6} ${teteY+teteR*0.2} ${cx+teteR*1.2} ${teteY-teteR*1.1} ${cx+teteR*0.86} ${teteY-teteR*0.68}
        L ${cx+teteR*0.7} ${S} Z" fill="${p.fond}" opacity=".9"/>
      <path d="M${cx-teteR*1.02} ${teteY-teteR*0.36}
        C ${cx-teteR*0.9} ${teteY-teteR*1.12} ${cx+teteR*0.9} ${teteY-teteR*1.12} ${cx+teteR*1.02} ${teteY-teteR*0.36} Z"
        fill="#0a0806" opacity=".72"/>`,
    heaume: `<path d="M${cx-teteR*1.04} ${teteY+6} C ${cx-teteR*1.04} ${teteY-teteR*1.3} ${cx+teteR*1.04} ${teteY-teteR*1.3} ${cx+teteR*1.04} ${teteY+6}
        L ${cx+teteR*1.04} ${teteY-teteR*0.1} L ${cx-teteR*1.04} ${teteY-teteR*0.1} Z" fill="${p.tissu}" stroke="${p.accent}" stroke-width="3"/>
      <rect x="${cx-6}" y="${teteY-teteR*0.3}" width="12" height="${teteR*1.05}" rx="4" fill="${p.tissu}" stroke="${p.accent}" stroke-width="2.5"/>`,
    voile: `<path d="M${cx-teteR*1.28} ${S} C ${cx-teteR*1.4} ${teteY-teteR*1.2} ${cx+teteR*1.4} ${teteY-teteR*1.2} ${cx+teteR*1.28} ${S} Z"
        fill="${p.tissu}" opacity=".62"/>
      <path d="M${cx-teteR*0.96} ${teteY-teteR*0.5} q ${teteR*0.96} ${-teteR*0.62} ${teteR*1.92} 0" fill="none" stroke="${p.accent}" stroke-width="3" opacity=".8"/>`,
    barbe: `<path d="M${cx-machoire*0.78} ${teteY+machoire*0.42}
        C ${cx-machoire*0.9} ${teteY+machoire*1.7} ${cx+machoire*0.9} ${teteY+machoire*1.7} ${cx+machoire*0.78} ${teteY+machoire*0.42}
        C ${cx+machoire*0.5} ${teteY+machoire*0.95} ${cx-machoire*0.5} ${teteY+machoire*0.95} ${cx-machoire*0.78} ${teteY+machoire*0.42} Z"
        fill="${p.tissu}" stroke="#100d0b" stroke-width="2"/>`,
    cornes: `<path d="M${cx-teteR*0.86} ${teteY-teteR*0.66} C ${cx-teteR*1.7} ${teteY-teteR*1.5} ${cx-teteR*1.62} ${teteY-teteR*0.2} ${cx-teteR*1.18} ${teteY+teteR*0.12}"
        fill="none" stroke="${p.accent}" stroke-width="15" stroke-linecap="round"/>
      <path d="M${cx+teteR*0.86} ${teteY-teteR*0.66} C ${cx+teteR*1.7} ${teteY-teteR*1.5} ${cx+teteR*1.62} ${teteY-teteR*0.2} ${cx+teteR*1.18} ${teteY+teteR*0.12}"
        fill="none" stroke="${p.accent}" stroke-width="15" stroke-linecap="round"/>`,
    masque: `<rect x="${cx-teteR*1.02}" y="${teteY-teteR*0.42}" width="${teteR*2.04}" height="${teteR*0.62}" rx="8"
        fill="${p.fond}" stroke="${p.accent}" stroke-width="2.5" opacity=".92"/>`,
    tresses: `<path d="M${cx-teteR*0.94} ${teteY-teteR*0.34}
        C ${cx-teteR*1.34} ${teteY+teteR*0.5} ${cx-teteR*1.24} ${teteY+teteR*1.5} ${cx-teteR*1.06} ${S}"
        fill="none" stroke="${p.tissu}" stroke-width="30" stroke-linecap="round"/>
      <path d="M${cx+teteR*0.94} ${teteY-teteR*0.34}
        C ${cx+teteR*1.34} ${teteY+teteR*0.5} ${cx+teteR*1.24} ${teteY+teteR*1.5} ${cx+teteR*1.06} ${S}"
        fill="none" stroke="${p.tissu}" stroke-width="30" stroke-linecap="round"/>
      <path d="M${cx-teteR*1.02} ${teteY-teteR*0.5}
        C ${cx-teteR*0.7} ${teteY-teteR*1.08} ${cx+teteR*0.7} ${teteY-teteR*1.08} ${cx+teteR*1.02} ${teteY-teteR*0.5}
        C ${cx+teteR*0.6} ${teteY-teteR*0.82} ${cx-teteR*0.6} ${teteY-teteR*0.82} ${cx-teteR*1.02} ${teteY-teteR*0.5} Z"
        fill="${p.tissu}"/>`,
    oreilles: `<path d="M${cx-teteR*0.96} ${teteY-6} l ${-teteR*0.62} ${-teteR*0.56} l ${teteR*0.28} ${teteR*0.72} Z" fill="${p.peau}"/>
      <path d="M${cx+teteR*0.96} ${teteY-6} l ${teteR*0.62} ${-teteR*0.56} l ${-teteR*0.28} ${teteR*0.72} Z" fill="${p.peau}"/>`,
    chapeau: `<path d="M${cx-teteR*1.55} ${teteY-teteR*0.55} q ${teteR*1.55} ${teteR*0.42} ${teteR*3.1} 0 q ${-teteR*1.55} ${teteR*0.3} ${-teteR*3.1} 0 Z" fill="${p.tissu}"/>
      <path d="M${cx-teteR*0.72} ${teteY-teteR*0.5} l 0 ${-teteR*0.62} q ${teteR*0.72} ${-teteR*0.24} ${teteR*1.44} 0 l 0 ${teteR*0.62} Z" fill="${p.tissu}" stroke="#100d0b" stroke-width="2"/>`,
    nu: '',
  };
  const dessus = A[trait] !== undefined ? A[trait] : '';
  /* La capuche et le heaume passent derrière la tête, le reste devant. */
  const derriere = (trait === 'capuche' || trait === 'voile' || trait === 'tresses') ? dessus : '';
  const devant   = derriere ? '' : dessus;
  const oreillesElfes = (m.peuple === 'elfe' || m.peuple === 'elfe_noir') ? A.oreilles : '';

  /* — Marque de l'Onde : ce que porte un Paria qui s'en sert — */
  const marque = m.onde
    ? `<path d="M${cx+teteR*0.5} ${teteY-teteR*0.74} l ${teteR*0.26} ${teteR*0.36} l ${-teteR*0.2} ${teteR*0.12} l ${teteR*0.3} ${teteR*0.46}"
         fill="none" stroke="${ART_PEUPLES.onde.accent}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>
       <circle cx="${cx}" cy="${teteY}" r="${teteR*1.28}" fill="none" stroke="${ART_PEUPLES.onde.accent}" stroke-width="2" opacity=".3"/>` : '';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">
${fond}${epaules}${derriere}${cou}${oreillesElfes}${tete}${yeux}${marque}${devant}
<rect width="${S}" height="${S}" fill="url(#v)"/>
<rect x="3" y="3" width="${S-6}" height="${S-6}" fill="none" stroke="${p.accent}" stroke-width="3" opacity=".45"/></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/* ============================= BANDEAUX D'ÉVÉNEMENT ============================= */
/* Un paysage : ciel, deux crêtes, un sol, un motif au premier plan. La famille
 * de l'événement décide de tout ; le hachage ne décide que du relief. */
const ART_SCENES = {
  VOYAGE:     { ciel:['#3d3527','#8a6a3a'], sol:'#241c14', accent:'#c9a227', motif:'route' },
  VILLE:      { ciel:['#2b2a2e','#6b6257'], sol:'#1d1b19', accent:'#cbb99a', motif:'ville' },
  TAVERNE:    { ciel:['#2a1d12','#7a4a1e'], sol:'#1a120c', accent:'#d98a2b', motif:'feu' },
  PARIA:      { ciel:['#241014','#7d1f2a'], sol:'#160d0e', accent:'#d2455a', motif:'ruine' },
  ONDE:       { ciel:['#0b2523','#1c6b64'], sol:'#0a1614', accent:'#56d6c9', motif:'faille' },
  GUERRE:     { ciel:['#2c1b16','#8a3a22'], sol:'#1a100d', accent:'#c8303f', motif:'lances' },
  POLITIQUE:  { ciel:['#241f2c','#5a4a6b'], sol:'#171420', accent:'#c6a04a', motif:'sceau' },
  CONTRAT:    { ciel:['#2a2419','#6f5b2a'], sol:'#1a160f', accent:'#c9a227', motif:'sceau' },
  KHESH:      { ciel:['#3a2a10','#c08a2e'], sol:'#2a1d0c', accent:'#e6c274', motif:'dunes' },
  ELFE:       { ciel:['#16281d','#4d8a5e'], sol:'#0f1a13', accent:'#cfe3c0', motif:'foret' },
  ELFE_NOIR:  { ciel:['#140f1e','#3c2f5c'], sol:'#0d0a14', accent:'#b39ddb', motif:'voute' },
  NAIN:       { ciel:['#1c1109','#6b3b1c'], sol:'#120b06', accent:'#d99a4e', motif:'mine' },
  PEAU_VERTE: { ciel:['#141a0c','#4a6b22'], sol:'#0e1208', accent:'#8fbe4a', motif:'horde' },
  HOMME_BETE: { ciel:['#1a140d','#5a4426'], sol:'#100c08', accent:'#cfc0a3', motif:'pierres' },
};
function artScene(id, famille){
  const s = ART_SCENES[famille] || ART_SCENES.VOYAGE;
  const rnd = artSuite(id);
  const W = 1200, H = 480, horizon = 300 + Math.round(rnd()*40);

  /* Crêtes : une ligne brisée déterministe, deux plans de profondeur. */
  const crete = (base, ampl, pas) => {
    let d = `M0 ${base}`;
    for(let x = 0; x <= W; x += pas) d += ` L${x} ${Math.round(base - rnd()*ampl)}`;
    return d + ` L${W} ${H} L0 ${H} Z`;
  };
  const loin  = crete(horizon - 22, 78, 100);
  const pres  = crete(horizon + 26, 46, 70);

  const astreX = 190 + Math.round(rnd()*820), astreY = 96 + Math.round(rnd()*70);
  const astre = `<circle cx="${astreX}" cy="${astreY}" r="${34 + Math.round(rnd()*22)}" fill="${s.accent}" opacity=".5"/>
    <circle cx="${astreX}" cy="${astreY}" r="${86 + Math.round(rnd()*30)}" fill="none" stroke="${s.accent}" stroke-width="1.5" opacity=".18"/>`;

  const bx = W/2, by = horizon + 108;
  const M = {
    route:  `<path d="M${bx-320} ${H} L${bx-34} ${horizon+16} L${bx+34} ${horizon+16} L${bx+320} ${H} Z" fill="${s.accent}" opacity=".16"/>
             <path d="M${bx-40} ${H} L${bx-6} ${horizon+18}" stroke="${s.accent}" stroke-width="3" opacity=".4"/>`,
    ville:  `<g fill="${s.sol}" stroke="${s.accent}" stroke-width="2" opacity=".95">
             <rect x="${bx-300}" y="${horizon-40}" width="110" height="${H-horizon+40}"/>
             <rect x="${bx-150}" y="${horizon-120}" width="80" height="${H-horizon+120}"/>
             <rect x="${bx+40}" y="${horizon-72}" width="130" height="${H-horizon+72}"/>
             <rect x="${bx+210}" y="${horizon-160}" width="60" height="${H-horizon+160}"/></g>`,
    feu:    `<path d="M${bx} ${by-120} C ${bx+66} ${by-40} ${bx+40} ${by} ${bx} ${by} C ${bx-40} ${by} ${bx-66} ${by-40} ${bx} ${by-120} Z" fill="${s.accent}" opacity=".65"/>
             <path d="M${bx} ${by-64} C ${bx+30} ${by-26} ${bx+18} ${by} ${bx} ${by} C ${bx-18} ${by} ${bx-30} ${by-26} ${bx} ${by-64} Z" fill="#f2d59a" opacity=".8"/>`,
    ruine:  `<g fill="${s.sol}" stroke="${s.accent}" stroke-width="2.5">
             <path d="M${bx-260} ${H} L${bx-260} ${horizon-30} L${bx-190} ${horizon-70} L${bx-190} ${H} Z"/>
             <path d="M${bx-60} ${H} L${bx-60} ${horizon-140} L${bx+10} ${horizon-90} L${bx+10} ${H} Z"/>
             <path d="M${bx+150} ${H} L${bx+150} ${horizon-46} L${bx+220} ${horizon-16} L${bx+220} ${H} Z"/></g>`,
    faille: `<path d="M${bx-180} ${H} L${bx-40} ${horizon-90} L${bx+16} ${horizon+10} L${bx-10} ${horizon-40} L${bx+130} ${H} Z" fill="${s.accent}" opacity=".55"/>
             <path d="M${bx-40} ${horizon-90} L${bx+16} ${horizon+10}" stroke="#eafffb" stroke-width="4" opacity=".8"/>`,
    lances: `<g stroke="${s.accent}" stroke-width="4" opacity=".8">${
              Array.from({length:11}, (_,i)=>{
                const x = bx - 300 + i*60 + Math.round(rnd()*18);
                const h2 = 120 + Math.round(rnd()*70);
                return `<line x1="${x}" y1="${H}" x2="${x+Math.round(rnd()*16-8)}" y2="${H-h2}"/>`;
              }).join('')}</g>`,
    sceau:  `<circle cx="${bx}" cy="${by-40}" r="76" fill="${s.accent}" opacity=".28"/>
             <circle cx="${bx}" cy="${by-40}" r="76" fill="none" stroke="${s.accent}" stroke-width="4"/>
             <path d="M${bx-34} ${by-4} L${bx} ${by-92} L${bx+34} ${by-4} Z" fill="${s.accent}" opacity=".85"/>`,
    dunes:  `<path d="M0 ${H} C ${W*0.22} ${horizon+40} ${W*0.38} ${H-40} ${W*0.6} ${horizon+70} C ${W*0.8} ${H-20} ${W*0.9} ${horizon+90} ${W} ${horizon+60} L${W} ${H} Z" fill="${s.accent}" opacity=".22"/>`,
    foret:  `<g fill="${s.sol}" stroke="${s.accent}" stroke-width="2">${
              Array.from({length:9}, (_,i)=>{
                const x = 70 + i*135, h2 = 130 + Math.round(rnd()*110);
                return `<path d="M${x} ${H} L${x-44} ${H-h2*0.55} L${x-20} ${H-h2*0.55} L${x-54} ${H-h2} L${x} ${H-h2-34} L${x+54} ${H-h2} L${x+20} ${H-h2*0.55} L${x+44} ${H-h2*0.55} Z"/>`;
              }).join('')}</g>`,
    voute:  `<path d="M${bx-260} ${H} L${bx-260} ${horizon+20} A 260 190 0 0 1 ${bx+260} ${horizon+20} L${bx+260} ${H} Z" fill="${s.sol}" stroke="${s.accent}" stroke-width="3"/>
             <path d="M${bx-120} ${H} L${bx-120} ${horizon+90} A 120 96 0 0 1 ${bx+120} ${horizon+90} L${bx+120} ${H} Z" fill="#07050a"/>`,
    mine:   `<g stroke="${s.accent}" stroke-width="5" fill="none">
             <path d="M${bx-170} ${H} L${bx} ${horizon-40} L${bx+170} ${H}"/>
             <path d="M${bx-100} ${H-90} L${bx+100} ${H-90}"/>
             <path d="M${bx-60} ${H-170} L${bx+60} ${H-170}"/></g>
             <rect x="${bx-46}" y="${H-70}" width="92" height="70" fill="${s.sol}" stroke="${s.accent}" stroke-width="3"/>`,
    horde:  `<g fill="${s.accent}" opacity=".55">${
              Array.from({length:26}, ()=>{
                const x = Math.round(rnd()*W), y = horizon + 30 + Math.round(rnd()*(H-horizon-40));
                const r2 = 6 + Math.round(rnd()*10);
                return `<circle cx="${x}" cy="${y}" r="${r2}"/>`;
              }).join('')}</g>`,
    pierres:`<g fill="${s.sol}" stroke="${s.accent}" stroke-width="3">${
              Array.from({length:5}, (_,i)=>{
                const x = bx - 300 + i*150, h2 = 120 + Math.round(rnd()*90);
                return `<path d="M${x-30} ${H} L${x-24} ${H-h2} L${x+22} ${H-h2-16} L${x+30} ${H} Z"/>`;
              }).join('')}</g>`,
  };

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
  <linearGradient id="c" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${s.ciel[0]}"/><stop offset="100%" stop-color="${s.ciel[1]}"/>
  </linearGradient>
  <radialGradient id="vg" cx="50%" cy="46%" r="76%">
    <stop offset="52%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".72"/>
  </radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#c)"/>
${astre}
<path d="${loin}" fill="${s.sol}" opacity=".55"/>
<path d="${pres}" fill="${s.sol}"/>
${M[s.motif] || ''}
<rect width="${W}" height="${H}" fill="url(#vg)"/>
<rect x="2" y="2" width="${W-4}" height="${H-4}" fill="none" stroke="${s.accent}" stroke-width="3" opacity=".35"/></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/* ============================= RÉSOLUTION ============================= */

/* Métadonnées d'un portrait, si le registre en connaît. */
function artMetaPortrait(id){
  return (typeof PORTRAITS !== 'undefined' && PORTRAITS[id]) || {};
}

/* Image de repli, quel que soit le registre. `info` est la famille de
 * l'événement pour un bandeau, ignoré pour un portrait. */
function artFallbackSVG(id, kind, info){
  return kind === 'portrait' ? artVisage(id, artMetaPortrait(id)) : artScene(id, info);
}

function artAttr(url){ return url.replace(/"/g, '&quot;'); }

/* Bandeau d'illustration d'un événement (renvoie du HTML, pas un nœud). */
function artEventBanner(id, famille){
  if(!id) return '';
  const fb = artAttr(artScene(id, famille));
  return `<div class="event-illu-wrap"><img class="event-illu" alt="" loading="lazy"
    src="${artAttr(artSource(id, 'event'))}" onerror="this.onerror=null;this.src=&quot;${fb}&quot;"></div>`;
}

/* Portrait seul, en médaillon — pour le combat, l'écran Personnage, une liste. */
function artPortraitImg(pnjId, className){
  if(!pnjId) return '';
  const fb = artAttr(artVisage(pnjId, artMetaPortrait(pnjId)));
  return `<img class="${className || 'portrait-img'}" alt="" loading="lazy"
    src="${artAttr(artSource(pnjId, 'portrait'))}" onerror="this.onerror=null;this.src=&quot;${fb}&quot;">`;
}

/* Vignette de personnage : portrait + nom + rôle. */
function artPortraitCard(pnjId){
  const p = (typeof PORTRAITS !== 'undefined' && PORTRAITS[pnjId]) || null;
  if(!p) return '';
  return `<div class="pnj-card">
    ${artPortraitImg(pnjId)}
    <div class="pnj-id"><div class="pnj-nom">${p.nom}</div><div class="pnj-role">${p.role}</div></div>
  </div>`;
}
