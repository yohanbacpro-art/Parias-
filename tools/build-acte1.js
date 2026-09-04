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

const lire = f => fs.readFileSync(f.startsWith('../') ? path.join(SRC, f) : path.join(SRC, f), 'utf8');

let html = lire('index.html');

/* On ne garde que le contenu de <head> utile et le corps. */
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1];

const titre  = head.match(/<title>[\s\S]*?<\/title>/)[0];
const desc   = head.match(/<meta name="description"[^>]*>/)[0];
const liens  = head.match(/<link[^>]*fonts\.googleapis[^>]*>/g).join('\n');
const style  = head.match(/<style>[\s\S]*?<\/style>/)[0];

/* L'ordre de chargement d'`index.html` **est** le contrat de dépendances : on
 * le lit là où il est écrit au lieu d'en tenir une copie ici. Une liste
 * recopiée à la main dérive — elle a dérivé, et le fichier publié a tourné
 * plusieurs semaines sans les chasses, sans les batailles et sans l'Acte III
 * pendant que le prototype, lui, les avait. */
const SCRIPTS = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
if(!SCRIPTS.length) throw new Error("index.html ne charge aucun script : le contrat est vide.");
const scripts = SCRIPTS.map(f => `<script>\n/* ── ${f} ── */\n${lire(f)}\n</script>`).join('\n');

const corps = body.replace(/<script src="[^"]*"><\/script>\s*/g, '').trimEnd();

const sortie = [titre, desc, liens, style, '', corps, '', scripts, ''].join('\n');

fs.mkdirSync(path.dirname(SORTIE), { recursive:true });
fs.writeFileSync(SORTIE, sortie);

const ko = n => (n / 1024).toFixed(0) + ' Ko';
console.log(`dist/acte1.html — ${ko(sortie.length)}`);
for(const f of SCRIPTS) console.log(`   ${f.padEnd(26)} ${ko(lire(f).length)}`);
