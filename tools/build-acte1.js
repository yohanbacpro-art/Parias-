/* Assemble l'Acte I en un seul fichier.
 *
 * `proto/acte1/index.html` charge quatre scripts : c'est bien pour travailler,
 * c'est inutilisable pour partager. Ce script inline tout et produit
 * `dist/acte1.html`, au format attendu par la publication : pas de doctype,
 * pas de <html>, pas de <head>, pas de <body> — l'enveloppe est ajoutée à la
 * publication.
 *
 * Lancer :  node tools/build-acte1.js
 */

const fs = require('fs');
const path = require('path');

const RACINE = path.resolve(__dirname, '..');
const SRC    = path.join(RACINE, 'proto/acte1');
const SORTIE = path.join(RACINE, 'dist/acte1.html');

const lire = f => fs.readFileSync(path.join(SRC, f), 'utf8');

let html = lire('index.html');

/* On ne garde que le contenu de <head> utile et le corps. */
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1];

const titre  = head.match(/<title>[\s\S]*?<\/title>/)[0];
const desc   = head.match(/<meta name="description"[^>]*>/)[0];
const liens  = head.match(/<link[^>]*fonts\.googleapis[^>]*>/g).join('\n');
const style  = head.match(/<style>[\s\S]*?<\/style>/)[0];

/* Les quatre scripts, dans l'ordre de chargement — qui est le contrat de
 * dépendances : le moteur, puis le monde, puis l'arc, puis la partie. */
const SCRIPTS = ['moteur.js', 'monde.js', 'arc_wyverne.js', 'jeu.js'];
const scripts = SCRIPTS.map(f => `<script>\n/* ── ${f} ── */\n${lire(f)}\n</script>`).join('\n');

const corps = body.replace(/<script src="[^"]*"><\/script>\s*/g, '').trimEnd();

const sortie = [titre, desc, liens, style, '', corps, '', scripts, ''].join('\n');

fs.mkdirSync(path.dirname(SORTIE), { recursive:true });
fs.writeFileSync(SORTIE, sortie);

const ko = n => (n / 1024).toFixed(0) + ' Ko';
console.log(`dist/acte1.html — ${ko(sortie.length)}`);
for(const f of SCRIPTS) console.log(`   ${f.padEnd(18)} ${ko(lire(f).length)}`);
