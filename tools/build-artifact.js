/* PARIAS — Le jeu sous forme de page publiable
 *
 *   node tools/build-standalone.js && node tools/build-artifact.js
 *
 * `dist/parias.html` est un document complet : doctype, <html>, <head>, <body>.
 * Une page d'Artifact est en revanche *insérée* dans un squelette fourni par
 * l'hôte : on ne doit livrer que le contenu, sinon on obtient un document
 * imbriqué dans un autre et rien ne s'affiche.
 *
 * Ce script fait exactement une chose : retirer l'enveloppe et recoller le
 * contenu du <head> devant celui du <body>. Le <title> reste en tête, parce que
 * c'est lui qui nomme la page. Aucune ligne de jeu n'est modifiée.
 */
const fs = require('fs');
const path = require('path');

const racine  = path.join(__dirname, '..');
const source  = path.join(racine, 'dist', 'parias.html');
const cible   = path.join(racine, 'dist', 'parias-artifact.html');

const doc = fs.readFileSync(source, 'utf8');

const tete = doc.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
const corps = doc.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if(!tete || !corps){
  console.error("dist/parias.html n'a pas la forme attendue — lancez d'abord build-standalone.js");
  process.exit(1);
}

/* Le charset et le viewport sont posés par le squelette de l'hôte : les
 * redéclarer dans le corps n'a aucun effet et brouille la lecture. */
const enTete = tete[1].replace(/<meta[^>]*charset[^>]*>\s*/i, '')
                      .replace(/<meta[^>]*viewport[^>]*>\s*/i, '');

fs.writeFileSync(cible, enTete.trimStart() + '\n' + corps[1]);

const ko = Math.round(fs.statSync(cible).size / 1024);
console.log(`→ dist/parias-artifact.html · ${ko} Ko`);
if(ko > 16000) console.log('⚠ au-delà de la limite de 16 Mo d\'un Artifact');
