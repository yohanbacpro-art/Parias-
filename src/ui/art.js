/* PARIAS — Illustrations
 *
 * Deux registres d'images, résolus par identifiant :
 *   assets/events/<id>.webp     bandeau d'illustration d'un événement
 *   assets/portraits/<id>.webp  portrait d'un personnage
 *
 * Tant qu'un fichier n'existe pas, on affiche un blason procédural généré en SVG
 * à partir de l'identifiant : toujours le même motif pour le même personnage,
 * dans la palette du jeu. Déposer le vrai fichier au bon chemin suffit à le
 * remplacer, sans toucher au code.
 *
 * Formats conseillés : bandeau 1200×480 (5:2), portrait 512×512 (carré).
 */

const ART_PATHS = { event: 'assets/events/', portrait: 'assets/portraits/' };
const ART_EXT = '.webp';

/* Hachage stable (FNV-1a) : même id → même blason, d'une partie à l'autre. */
function artHash(str){
  let h = 0x811c9dc5;
  for(let i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}

const ART_INKS = [
  ['#8b1e2b','#c8303f'], // sang
  ['#1c6b64','#5fd6cb'], // onde
  ['#8a6f1f','#c9a227'], // or
  ['#7a3a18','#d98a2b'], // cendre
  ['#2b3d2c','#6f9c6a'], // sylve
  ['#2a2f4a','#6b74a8'], // nuit
];

/* Blason procédural : un champ, une partition, une charge centrale. */
function artFallbackSVG(id, kind){
  const h = artHash(id);
  const [dark, bright] = ART_INKS[h % ART_INKS.length];
  const partition = (h >> 3) % 4;   // orientation du champ
  const charge    = (h >> 6) % 6;   // figure centrale
  const rings     = 2 + ((h >> 9) % 3);
  const w = kind === 'portrait' ? 512 : 1200;
  const hh = kind === 'portrait' ? 512 : 480;
  const cx = w/2, cy = hh/2;
  const r = Math.min(w,hh) * 0.26;

  const champs = [
    `<rect width="${w}" height="${hh}" fill="url(#g)"/>`,
    `<rect width="${w}" height="${hh}" fill="url(#g)"/><rect y="${hh/2}" width="${w}" height="${hh/2}" fill="${dark}" opacity=".35"/>`,
    `<rect width="${w}" height="${hh}" fill="url(#g)"/><rect width="${w/2}" height="${hh}" fill="${dark}" opacity=".3"/>`,
    `<rect width="${w}" height="${hh}" fill="url(#g)"/><path d="M0 ${hh} L${w} 0 L${w} ${hh} Z" fill="${dark}" opacity=".3"/>`,
  ];

  const charges = [
    // chevron
    `<path d="M${cx-r} ${cy+r*0.6} L${cx} ${cy-r*0.7} L${cx+r} ${cy+r*0.6}" fill="none" stroke="${bright}" stroke-width="${r*0.16}" stroke-linecap="round" stroke-linejoin="round"/>`,
    // faille de l'Onde
    `<path d="M${cx-r*0.3} ${cy-r} L${cx+r*0.2} ${cy-r*0.2} L${cx-r*0.15} ${cy+r*0.1} L${cx+r*0.3} ${cy+r}" fill="none" stroke="${bright}" stroke-width="${r*0.13}" stroke-linecap="round"/>`,
    // croissant
    `<path d="M${cx+r*0.55} ${cy-r*0.75} A ${r} ${r} 0 1 0 ${cx+r*0.55} ${cy+r*0.75} A ${r*0.78} ${r*0.78} 0 1 1 ${cx+r*0.55} ${cy-r*0.75} Z" fill="${bright}"/>`,
    // lame
    `<path d="M${cx} ${cy-r} L${cx+r*0.22} ${cy+r*0.35} L${cx} ${cy+r} L${cx-r*0.22} ${cy+r*0.35} Z" fill="${bright}"/>`,
    // tour
    `<path d="M${cx-r*0.6} ${cy+r*0.8} L${cx-r*0.6} ${cy-r*0.4} L${cx-r*0.3} ${cy-r*0.4} L${cx-r*0.3} ${cy-r*0.75} L${cx} ${cy-r*0.75} L${cx} ${cy-r*0.4} L${cx+r*0.3} ${cy-r*0.4} L${cx+r*0.3} ${cy-r*0.75} L${cx+r*0.6} ${cy-r*0.75} L${cx+r*0.6} ${cy+r*0.8} Z" fill="${bright}"/>`,
    // couronne de crocs
    `<path d="M${cx-r} ${cy+r*0.5} L${cx-r*0.5} ${cy-r*0.5} L${cx} ${cy+r*0.15} L${cx+r*0.5} ${cy-r*0.5} L${cx+r} ${cy+r*0.5} Z" fill="${bright}"/>`,
  ];

  let halos = '';
  for(let i=1;i<=rings;i++){
    halos += `<circle cx="${cx}" cy="${cy}" r="${r*(1 + i*0.42)}" fill="none" stroke="${bright}" stroke-width="1.5" opacity="${0.22/i}"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${hh}" width="${w}" height="${hh}">
<defs><radialGradient id="g" cx="50%" cy="42%" r="78%">
<stop offset="0%" stop-color="${dark}" stop-opacity=".85"/>
<stop offset="100%" stop-color="#120f0c"/></radialGradient></defs>
${champs[partition]}${halos}${charges[charge]}
<rect width="${w}" height="${hh}" fill="none" stroke="#3a2f28" stroke-width="6"/></svg>`;

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/* Construit une <img> qui bascule sur le blason si le fichier est absent. */
function artImage(id, kind, className){
  const img = document.createElement('img');
  img.className = className || (kind === 'portrait' ? 'portrait-img' : 'event-illu');
  img.alt = '';
  img.loading = 'lazy';
  img.dataset.artId = id;
  img.onerror = () => { img.onerror = null; img.src = artFallbackSVG(id, kind); };
  img.src = ART_PATHS[kind] + id + ART_EXT;
  return img;
}

/* Bandeau d'illustration d'un événement (renvoie du HTML, pas un nœud). */
function artEventBanner(id){
  if(!id) return '';
  const fb = artFallbackSVG(id, 'event').replace(/"/g, '&quot;');
  return `<div class="event-illu-wrap"><img class="event-illu" alt="" loading="lazy"
    src="${ART_PATHS.event}${id}${ART_EXT}" onerror="this.onerror=null;this.src=&quot;${fb}&quot;"></div>`;
}

/* Vignette de personnage : portrait + nom + rôle. */
function artPortraitCard(pnjId){
  const p = (typeof PORTRAITS !== 'undefined' && PORTRAITS[pnjId]) || null;
  if(!p) return '';
  const fb = artFallbackSVG(pnjId, 'portrait').replace(/"/g, '&quot;');
  return `<div class="pnj-card">
    <img class="portrait-img" alt="" loading="lazy"
      src="${ART_PATHS.portrait}${pnjId}${ART_EXT}" onerror="this.onerror=null;this.src=&quot;${fb}&quot;">
    <div class="pnj-id"><div class="pnj-nom">${p.nom}</div><div class="pnj-role">${p.role}</div></div>
  </div>`;
}
