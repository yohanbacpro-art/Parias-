/* Régénère `proto/img/portraits.js` depuis les fichiers de `proto/img/`.
 *
 * Les portraits sont **petits exprès**. Les planches de `design/planches/`
 * sont des planches-contact : la plus grande tuile y fait 507×358 quand la
 * colonne de texte du jeu en fait 608. Agrandies, elles seraient floues.
 * Découpées à cent cinquante pixels et rendues à quarante, elles sont nettes.
 *
 * On produit un fichier de script plutôt que des <img src="…"> : le CSP de
 * la publication bloque toute image externe, et un data-URI dans un script
 * marche à l'identique en développement et dans le fichier assemblé.
 *
 * Lancer :  node tools/portraits.js
 */

const fs = require('fs');
const path = require('path');

const RACINE = path.resolve(__dirname, '..');
const SRC    = path.join(RACINE, 'proto/img');
const SORTIE = path.join(SRC, 'portraits.js');
const PLAFOND = 400 * 1024;   // au-delà, on a cessé de faire des vignettes

const fichiers = fs.readdirSync(SRC).filter(f => /\.(webp|png|jpg)$/.test(f)).sort();
if(!fichiers.length) throw new Error("proto/img/ ne contient aucune image.");

const TYPE = { '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg' };
const entrees = [];
let total = 0;

for(const f of fichiers){
  const buf = fs.readFileSync(path.join(SRC, f));
  const id  = path.basename(f, path.extname(f));
  const b64 = buf.toString('base64');
  total += b64.length;
  entrees.push(`  ${id}:"data:${TYPE[path.extname(f)]};base64,${b64}"`);
  console.log(`  ${id.padEnd(12)} ${String(Math.round(buf.length / 1024)).padStart(3)} Ko`);
}

if(total > PLAFOND)
  throw new Error(`${Math.round(total / 1024)} Ko de portraits : au-delà du plafond de ${PLAFOND / 1024} Ko. Réduire la qualité ou le nombre.`);

fs.writeFileSync(SORTIE,
  `/* Engendré par tools/portraits.js — ne pas modifier à la main. */\n` +
  `const PORTRAITS_DATA = {\n${entrees.join(',\n')},\n};\n`);

console.log(`\nproto/img/portraits.js — ${entrees.length} portraits, ${Math.round(total / 1024)} Ko encodés.`);
