/* PARIAS — Construction d'un fichier unique
 *
 *   node tools/build-standalone.js
 *
 * Produit dist/parias.html : le jeu entier dans un seul fichier, tous les
 * scripts intégrés dans l'ordre déclaré par index.html. Utile pour partager une
 * version jouable par simple lien, sans serveur ni dossier.
 *
 * Le développement continue sur index.html + src/ — ce fichier est un artefact
 * de sortie, régénéré à la demande.
 */
const fs = require('fs');
const path = require('path');

const racine = path.join(__dirname, '..');
const source = path.join(racine, 'index.html');
const sortie = path.join(racine, 'dist', 'parias.html');

let html = fs.readFileSync(source, 'utf8');

const balises = [...html.matchAll(/<script src="([^"]+)"><\/script>\s*/g)];
if (!balises.length) {
  console.error('Aucune balise <script src> trouvée dans index.html — rien à intégrer.');
  process.exit(1);
}

let total = 0;
for (const m of balises) {
  const rel = m[1];
  const fichier = path.join(racine, rel);
  if (!fs.existsSync(fichier)) {
    console.error('Fichier introuvable :', rel);
    process.exit(1);
  }
  let js = fs.readFileSync(fichier, 'utf8');
  // Une chaîne contenant </script> refermerait la balise trop tôt.
  js = js.replace(/<\/script/gi, '<\\/script');
  total += js.length;
  html = html.replace(m[0], `<script>\n/* ${rel} */\n${js}\n</script>\n`);
}

// Repère de version : la date de construction, visible sous le titre.
const date = new Date().toISOString().slice(0, 10);
html = html.replace(
  /(<div class="sub" id="heroSub">)([^<]*)(<\/div>)/,
  `$1$2 · version jouable du ${date}$3`
);

fs.mkdirSync(path.dirname(sortie), { recursive: true });
fs.writeFileSync(sortie, html, 'utf8');

const ko = n => (n / 1024).toFixed(0) + ' Ko';
console.log(`${balises.length} scripts intégrés (${ko(total)} de JavaScript)`);
console.log(`→ dist/parias.html · ${ko(fs.statSync(sortie).size)}`);
