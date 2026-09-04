/* La langue des personnages.
 *
 * Deux défauts se glissent dans un jeu écrit vite, et ils ne se voient pas
 * à la relecture parce qu'ils sont invisibles phrase par phrase :
 *
 *   1. **L'anachronisme.** Un mot d'aujourd'hui dans la bouche d'un homme
 *      de 1400. *Protocole*, *situation*, *catégorie*, *professionnel* :
 *      chacun passe tout seul, tous ensemble ils cassent le monde.
 *
 *   2. **La voix unique.** Tout le monde parle comme le narrateur — longues
 *      phrases analytiques, deux-points, tirets, énumérations en trois
 *      temps. Une abbesse de soixante-douze ans et un contrebandier ne
 *      construisent pas leurs phrases de la même façon.
 *
 * Cet outil mesure les deux. Il ne corrige rien : il dit où regarder.
 *
 *   node tools/audit-langue.js               le relevé complet
 *   node tools/audit-langue.js gassien       un personnage
 */

const fs = require('fs');
const path = require('path');

const RACINE = path.join(__dirname, '..', 'proto');
const cible = (process.argv[2] || '').toLowerCase();

/* ── Ce qui n'a pas sa place dans une bouche ──────────────────────────────
 * On ne liste que ce qui est vraiment daté ou vraiment abstrait. Les mots
 * savants existaient : un greffier dit *ordonnance*, un intendant dit
 * *cession*. Ce qu'on traque, c'est le vocabulaire de bureau moderne. */
const MODERNE = [
  'protocole', 'professionnel', 'professionnelle', 'situation', 'catégorie',
  'administratif', 'administrative', 'objectif', 'contexte', 'concept',
  'process', 'procédure', 'structure', 'système', 'niveau', 'secteur',
  'gérer', 'gère', 'gérez', 'impact', 'critère', 'paramètre', 'analyse',
  'analyser', 'stratégie', 'stratégique', 'logistique', 'organisation',
  'efficacité', 'rentabilité', 'psychologie', 'psychologique', 'motivation',
  'personnalité', 'réaliste', 'normal', 'normale', 'positif', 'négatif',
  'intéressant', 'compliqué', 'globalement', 'finalement', 'basiquement',
  'concrètement', 'techniquement', 'statistique', 'pourcentage', 'moyenne',
  'planning', 'budget', 'stock', 'client', 'contact', 'information',
  'informations', 'détail technique', 'expérience professionnelle',
];

/* ── Les tics du narrateur ────────────────────────────────────────────────
 * Ils sont excellents dans le récit et ils appauvrissent le dialogue quand
 * chaque personnage les emploie. On les compte, on ne les interdit pas. */
/* Le deux-points d'énumération n'est pas le deux-points d'explication.
 * « Un : Astrah relevée. Deux : Astrah relevée de mon vivant. » est la
 * signature de Lucius, pas un emprunt au narrateur — on ne le compte pas. */
const ENUM = /\b(un|deux|trois|quatre|cinq|six|sept|primo|secundo|tertio|d'abord|ensuite|enfin)\s*:/gi;

const TICS = [
  { id:'deux-points',  test: t => Math.max(0,
      (t.match(/ : /g) || []).length - (t.match(ENUM) || []).length) },
  { id:'tiret-cadratin', test: t => (t.match(/ — /g) || []).length },
  { id:'énumération-3', test: t => (t.match(/\b\w+, \w+ et \w+\b/g) || []).length },
  { id:'ce-qui-c-est', test: t => (t.match(/\bce (?:qui|que) [^,.]{2,40}, c'est\b/g) || []).length },
  { id:'phrase-longue', test: t => t.split(/[.!?]/).filter(p => p.trim().split(/\s+/).length > 34).length },
];

const estReplique = t => /^[«—@^]/.test(t.trim());

function scanner(rel){
  const src = fs.readFileSync(path.join(RACINE, rel), 'utf8').split('\n');
  const lignes = [];
  let qui = null, dansTexte = false, prof = 0;

  src.forEach((ligne, i) => {
    const q = ligne.match(/qui\s*:\s*'([a-z_]+)'/);
    if(q && !dansTexte) qui = q[1];
    if(/^\s*texte\s*:\s*\[/.test(ligne)){ dansTexte = true; prof = 0; return; }
    if(!dansTexte) return;
    if(/^\s*\],?\s*$/.test(ligne) && prof === 0){ dansTexte = false; return; }
    prof += (ligne.match(/\{/g) || []).length;
    prof -= (ligne.match(/\}/g) || []).length;
    if(prof < 0) prof = 0;

    const nue    = ligne.match(/^\s*"((?:[^"\\]|\\.)*)"\s*,?\s*$/);
    const palier = ligne.match(/(?:sobre|intense|extreme)\s*:\s*"((?:[^"\\]|\\.)*)"/);
    const brut = nue ? nue[1] : palier ? palier[1] : null;
    if(brut === null) return;
    const t = brut.replace(/\\n\\n/g, ' ').replace(/\\"/g, '"').trim();
    if(!t || !estReplique(t.replace(/^§\s*/, ''))) return;
    lignes.push({ qui: qui || '(sans visage)', rel, ligne: i + 1, t });
  });
  return lignes;
}

const fichiers = [];
for(const acte of ['acte1', 'acte2', 'acte3'])
  for(const f of fs.readdirSync(path.join(RACINE, acte)).filter(f => f.endsWith('.js')).sort())
    fichiers.push(`${acte}/${f}`);

const toutes = fichiers.flatMap(scanner);
const parQui = new Map();
for(const l of toutes){
  if(!parQui.has(l.qui)) parQui.set(l.qui, []);
  parQui.get(l.qui).push(l);
}

/* ── 1 · les anachronismes ─────────────────────────────────────────────────
 * On ne cherche que dans ce qui est **entre guillemets**. Le récit a le droit
 * de dire *méfiance professionnelle* : c'est le narrateur qui parle, et il
 * n'est d'aucun siècle. Un personnage, lui, est de 1400. */
const rxModerne = new RegExp(`\\b(${MODERNE.join('|')})\\b`, 'gi');
const entreGuillemets = t => (t.match(/«[^»]*»/g) || []).join(' ');
const fautes = [];
for(const l of toutes){
  const m = entreGuillemets(l.t).match(rxModerne);
  if(m) fautes.push({ ...l, mots:[...new Set(m.map(x => x.toLowerCase()))] });
}

console.log('\nPARIAS — la langue des personnages\n');
console.log('── 1 · mots qui ne sont pas de ce monde\n');
if(!fautes.length) console.log('   aucun.\n');
for(const f of fautes){
  if(cible && f.qui !== cible) continue;
  console.log(`   ${f.rel}:${f.ligne}  ${f.qui}  [${f.mots.join(' · ')}]`);
  console.log(`      ${f.t.slice(0, 120)}`);
}

/* ── 2 · tout le monde parle pareil ────────────────────────────────────── */
console.log('\n── 2 · les tics du narrateur, par personnage\n');
console.log('   personnage        répl.  ' + TICS.map(t => t.id.slice(0, 7).padStart(8)).join('') + '   pour 100 répliques');

const rangs = [...parQui.entries()]
  .filter(([, ls]) => ls.length >= 8)
  .map(([qui, ls]) => {
    const c = TICS.map(t => ls.reduce((s, l) => s + t.test(l.t), 0));
    return { qui, n: ls.length, c, densite: c.reduce((a, b) => a + b, 0) / ls.length };
  })
  .sort((a, b) => b.densite - a.densite);

for(const r of rangs){
  if(cible && r.qui !== cible) continue;
  console.log(`   ${r.qui.padEnd(18)}${String(r.n).padStart(4)}  `
    + r.c.map(n => String(n).padStart(8)).join('')
    + `      ${(r.densite * 100).toFixed(0)}`);
}

const moy = rangs.reduce((s, r) => s + r.densite, 0) / (rangs.length || 1);
console.log(`\n   moyenne : ${(moy * 100).toFixed(0)} tics pour 100 répliques.`);
console.log('   Un écart faible entre les personnages = une seule voix pour tous.\n');
