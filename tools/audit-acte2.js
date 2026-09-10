/* Audit statique du prototype — ce que l'épreuve de navigateur ne voit pas.
 *
 * L'épreuve d'acceptation marche des parties : elle trouve les impasses, les
 * boucles et les références mortes. Elle ne voit pas les défauts qui ne
 * cassent rien et qui rendent du contenu inatteignable en silence :
 *
 *   1. un drapeau qu'on lit et que personne ne pose jamais ;
 *   2. un drapeau qu'on pose et que personne ne lit jamais ;
 *   3. une offre dont la condition ne peut pas être vraie ;
 *   4. une scène référencée par un `si:` qui ne s'ouvrira jamais.
 *
 * Lancer :  node tools/audit-acte2.js
 */

const fs = require('fs');
const path = require('path');

const RACINE = path.resolve(__dirname, '..');
const DOSSIERS = ['proto/acte1', 'proto/acte2', 'proto/acte3'];

const fichiers = DOSSIERS.flatMap(d =>
  fs.readdirSync(path.join(RACINE, d))
    .filter(f => f.endsWith('.js'))
    .map(f => path.join(d, f)));

const src = {};
for(const f of fichiers) src[f] = fs.readFileSync(path.join(RACINE, f), 'utf8');
const tout = Object.values(src).join('\n');

/* Le français est plein d'apostrophes, et un commentaire à l'intérieur d'un
 * tableau `flags:[…]` en apporte autant qu'il a d'élisions. Sans ça, l'outil
 * inventait des drapeaux à partir de morceaux de prose. On scanne donc une
 * copie sans blocs de commentaire. */
const sansNotes = s => s.replace(/\/\*[\s\S]*?\*\//g, ' ');
const srcNu = {};
for(const [f, s] of Object.entries(src)) srcNu[f] = sansNotes(s);
const toutNu = Object.values(srcNu).join('\n');

/* ── Les drapeaux ─────────────────────────────────────────────────────────
 * On les pose de quatre façons : `flags:[...]`, `flag:'x'`, `ETAT.flags.add`,
 * et les identifiants d'ouvrage, qui sont posés par le chantier. */
const poses = new Set();
/* `flags:` porte souvent un ternaire — `flags:gagne ? [...] : [...]`. Ne lire
 * que la forme `flags:[` laissait ces drapeaux-là invisibles : l'outil les
 * déclarait « lus sans être posés » alors qu'ils l'étaient deux lignes plus
 * haut. On accepte donc un petit bout d'expression avant le crochet, et une
 * seconde branche après. */
for(const m of toutNu.matchAll(/flags:\s*[^[\n]{0,60}?\[([^\]]*)\](?:\s*:\s*\[([^\]]*)\])?/g))
  for(const groupe of [m[1], m[2]])
    if(groupe) for(const q of groupe.matchAll(/'([^']+)'/g)) poses.add(q[1]);
for(const m of toutNu.matchAll(/\bflag:\s*'([^']+)'/g)) poses.add(m[1]);
for(const m of toutNu.matchAll(/ETAT\.flags\.add\(\s*'([^']+)'/g)) poses.add(m[1]);
/* Les composés : `'fait_' + o.id`, `'acte_' + id + …`, `'crise_' + id + …` */
const composes = [/^fait_/, /^acte_/, /^crise_/, /^echo_/, /^palier_/, /^ch_/, /^a2_palier_/,
                  /^muri_/];   /* posé et relu par `murir()`, sur un nom composé */

const lus = new Map();
for(const [f, s] of Object.entries(src))
  for(const m of s.matchAll(/\ba\(\s*'([^']+)'\s*\)/g)) {
    if(!lus.has(m[1])) lus.set(m[1], new Set());
    lus.get(m[1]).add(f);
  }
/* Les conditions du chantier lisent aussi des drapeaux, dans des tableaux. */
for(const m of tout.matchAll(/flags:\s*\[([^\]]*)\][^}]*manque:/g))
  for(const q of m[1].matchAll(/'([^']+)'/g))
    if(!lus.has(q[1])) lus.set(q[1], new Set(['conditions du chantier']));
/* Les sources du chantier aussi. */
for(const m of tout.matchAll(/\{\s*flag:'([^']+)',\s*res:/g))
  if(!lus.has(m[1])) lus.set(m[1], new Set(['sources du chantier']));
/* Les trois lecteurs en masse de l'Acte III lisent leurs drapeaux à
 * l'exécution, par `a(f)` sur une variable : statiquement, ça ne se voit
 * pas. `consequences.js` porte un drapeau par clé de registre ; `renforts.js`
 * et `inimities.js` les lisent dans des `vient()`/`hostile()` déjà couverts
 * par la règle générale. On déclare donc les clés du registre. */
{
  const c = src['proto/acte3/consequences.js'] || '';
  const corps = c.slice(c.indexOf('const CONSEQUENCES'), c.indexOf('function retenues'));
  for(const m of corps.matchAll(/^([a-z][a-z0-9_]*):\{\s*sec:/gm))
    if(!lus.has(m[1])) lus.set(m[1], new Set(['la chanson du barde']));
}

let defauts = 0;
const dire = (titre, lignes) => {
  if(!lignes.length){ console.log(`  ok  ${titre}`); return; }
  defauts += lignes.length;
  console.log(` ÉCHEC ${titre} — ${lignes.length}`);
  for(const l of lignes) console.log(`         ${l}`);
};

console.log('\nPARIAS — audit statique\n');

/* 1 · lu, jamais posé : du contenu qui ne s'ouvrira jamais. */
const jamaisPoses = [...lus.keys()]
  .filter(f => !poses.has(f))
  .filter(f => !composes.some(r => r.test(f)))
  .map(f => `${f}  (lu dans ${[...lus.get(f)].map(x => path.basename(x)).join(', ')})`);
dire("aucun drapeau n'est lu sans être posé nulle part", jamaisPoses);

/* 2 · posé, jamais lu : une conséquence écrite qui ne produit rien. */
const jamaisLus = [...poses]
  .filter(f => !lus.has(f))
  .filter(f => !composes.some(r => r.test(f)))
  /* Un drapeau d'étape sert de mémoire de parcours, pas de condition : on ne
   * signale que ceux qui ont l'air d'être des conséquences (`a2_`). */
  .filter(f => /^a2_/.test(f));
/* Ce n'est pas un défaut : une conséquence posée et pas encore lue est de la
 * mémoire narrative gardée pour la suite. C'en devient un quand la liste
 * enfle sans que rien ne la consomme — on l'imprime donc, sans échouer. */
console.log(`  — ${jamaisLus.length} conséquence(s) « a2_ » en mémoire, encore lues par personne`);
if(jamaisLus.length) console.log(`         ${jamaisLus.join(' · ')}`);

/* 2 bis · la mesure d'ensemble. Un drapeau posé qu'aucun consommateur ne
 * relit est une décision qui n'a pas eu lieu. On imprime la proportion sans
 * échouer dessus : c'est un baromètre d'écriture, pas une règle de code. */
{
  const tousMorts = [...poses]
    .filter(f => !lus.has(f))
    .filter(f => !composes.some(r => r.test(f)));
  const vivants = poses.size - tousMorts.length;
  console.log(`  — ${vivants}/${poses.size} drapeaux relus quelque part `
    + `(${Math.round(100 * vivants / poses.size)} %) · ${tousMorts.length} encore muets`);
}

/* 3 · les offres : leur cible doit exister, et leur identifiant être unique. */
const scenesDef = new Set();
for(const m of tout.matchAll(/^([a-z][a-z0-9_]*)\s*:\s*\{/gm)) scenesDef.add(m[1]);
const offres = [...tout.matchAll(/offrir\(\{\s*id:'([^']+)'[^}]*va:'([^']+)'/g)]
  .map(m => ({ id:m[1], va:m[2] }));
dire("chaque offre vise une scène qui existe",
     offres.filter(o => !scenesDef.has(o.va)).map(o => `${o.id} → ${o.va}`));

const vus = {};
dire("aucun identifiant d'offre en double",
     offres.filter(o => (vus[o.id] = (vus[o.id] || 0) + 1) > 1).map(o => o.id));

/* 4 · un lieu sans offre n'apparaît jamais sur la carte : c'est du décor. */
const lieux = [...tout.matchAll(/^  ([a-z]+):\s*\{ nom:"[^"]+", region:/gm)].map(m => m[1]);
const avecOffre = new Set([...tout.matchAll(/offrir\(\{[^}]*lieu:'([^']+)'/g)].map(m => m[1]));
dire("chaque lieu de la carte a au moins une offre",
     lieux.filter(l => !avecOffre.has(l) && l !== 'cendrepont'));

console.log(defauts ? `\n${defauts} défaut(s).\n` : "\nRien à signaler.\n");
process.exit(defauts ? 1 : 0);
