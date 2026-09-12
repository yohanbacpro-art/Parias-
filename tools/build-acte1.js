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

/* ── La même chose, en page web complète ──────────────────────────────────
 * `dist/acte1.html` est sans enveloppe parce que la publication en artefact
 * en fournit une. Un serveur ordinaire, lui, n'en fournit aucune : ouvert
 * tel quel, le fichier n'a ni doctype, ni langue, ni encodage déclaré.
 *
 * On écrit donc la même construction une seconde fois, habillée, dans
 * `docs/`, d'où GitHub Pages sert le jeu à une adresse publique. Les deux
 * sorties viennent du même assemblage : elles ne peuvent pas diverger. */
const WEB = path.join(RACINE, 'docs/index.html');
const page = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#0A0908">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='88'%3E%F0%9F%90%BA%3C/text%3E%3C/svg%3E">
${[titre, desc, liens, style].join('\n')}
</head>
<body>
${corps}

${scripts}
</body>
</html>
`;
fs.mkdirSync(path.dirname(WEB), { recursive:true });
fs.writeFileSync(WEB, page);
/* Sans ce fichier, Pages passe le site à Jekyll, qui ignore tout ce qui
 * commence par un souligné et ajoute une étape de construction dont on n'a
 * aucun besoin pour une page unique. */
fs.writeFileSync(path.join(RACINE, 'docs/.nojekyll'), '');

const ko = n => (n / 1024).toFixed(0) + ' Ko';
console.log(`dist/acte1.html — ${ko(sortie.length)}   (artefact)`);
console.log(`docs/index.html — ${ko(page.length)}   (web)`);
for(const f of SCRIPTS) console.log(`   ${f.padEnd(26)} ${ko(lire(f).length)}`);
