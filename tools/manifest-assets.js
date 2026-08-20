/* PARIAS — Manifeste des illustrations
 *
 *   node tools/manifest-assets.js
 *
 * Réécrit assets/README.md à partir des données du jeu : la liste exacte des
 * fichiers que le jeu cherchera, avec ce que chacun représente. Écrite à la
 * main, cette liste dérivait à chaque événement ajouté ; générée, elle ne peut
 * plus mentir.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const racine = path.join(__dirname, '..');
const fichiers = ['portraits','locations','events','lore','champions',
  'events_written','events_meetings','events_trame','events_nemesis','contracts_special','romances'];
const ctx = vm.createContext({ console });
fichiers.forEach(f => vm.runInContext(fs.readFileSync(path.join(racine,'src/data',f+'.js'),'utf8'), ctx, {filename:f}));
const G = vm.runInContext(`({PORTRAITS, EVENTS, EVENTS_WRITTEN, EVENTS_RENCONTRE, EVENTS_TRAME,
  EVENTS_NEMESIS, CONTRATS_SPECIAUX, EVENTS_ROMANCE, CHAMPIONS})`, ctx);

const tableau = (entetes, lignes) =>
  `| ${entetes.join(' | ')} |\n|${entetes.map(()=>'---').join('|')}|\n` +
  lignes.map(l => `| ${l.join(' | ')} |`).join('\n');

const section = (titre, liste) => liste.length
  ? `### ${titre}\n\n${tableau(['Fichier attendu','Illustre'],
      liste.map(e => [`\`${e.image}.webp\``, e.titre.replace(/\|/g,'\\|')]))}\n`
  : '';

/* Les familles servent au dessin de repli ET aux événements générés. */
const familles = [...new Set(G.EVENTS.map(e => e.famille))].sort();

const doc = `# Illustrations

Deux dossiers, deux formats. Les fichiers sont **facultatifs** : tant qu'un
fichier manque, le jeu dessine l'image à sa place, en SVG, à partir de ce
qu'elle représente — la palette du peuple et les attributs du personnage pour un
portrait, la famille de l'événement pour un bandeau. Déposer le fichier au bon
chemin suffit à le remplacer, aucun code à modifier.

> Ce fichier est **généré** : \`node tools/manifest-assets.js\`. Ne pas l'éditer à
> la main — ajouter un événement ou un personnage puis relancer la commande.

## \`events/\` — bandeaux d'événements

- **Format** : \`<id>.webp\`, ratio **5:2**, 1200×480 recommandé.
- **Cadrage** : recadré en \`object-fit: cover\`, sujet centré verticalement.
- **id** : le champ \`image\` de l'événement.

${section('Événements de lieu', G.EVENTS_WRITTEN)}
${section('Rencontres', G.EVENTS_RENCONTRE)}
${section('Jalons de la trame', G.EVENTS_TRAME)}
${section("L'arc du Livré", G.EVENTS_NEMESIS)}
${section('Campagnes et affaires personnelles', G.CONTRATS_SPECIAUX)}
${section('Attachements', G.EVENTS_ROMANCE)}
### Événements générés

Les ${G.EVENTS.length} variantes de \`src/data/events.js\` cherchent un bandeau par
famille : ${familles.map(f => `\`evt_${f.toLowerCase()}.webp\``).join(', ')}.

## \`portraits/\` — portraits de personnages

- **Format** : \`<id>.webp\`, **carré**, 512×512 recommandé.
- Affiché en médaillon rond : cadrer le visage **au centre**, il est recadré en cercle.
- **id** : la clé dans \`src/data/portraits.js\`.

${tableau(['Fichier attendu','Personnage','Peuple','Attribut'],
  Object.entries(G.PORTRAITS).map(([id,p]) =>
    [`\`${id}.webp\``, `${p.nom} — *${p.role}*`, p.peuple || '—', (p.trait||'nu') + (p.onde ? ' · Onde' : '')]))}

### Combattants nommés

Chaque champion affiche le portrait ci-dessous pendant un affrontement.

${tableau(['Champion','Portrait utilisé'],
  Object.entries(G.CHAMPIONS).map(([k,c]) => [c.nom, `\`${c.portrait}\``]))}

## Vérifier

\`node tools/validate.js\` signale tout \`image\` ou \`pnj\` référencé sans entrée
correspondante, tout champion dont le portrait n'existe pas au registre, et tout
portrait dont le peuple ou l'attribut ne serait pas dessinable. Il ne vérifie pas
la présence des fichiers eux-mêmes, puisqu'ils sont facultatifs par construction.
`;

fs.writeFileSync(path.join(racine,'assets','README.md'), doc, 'utf8');
const nbEv = G.EVENTS_WRITTEN.length + G.EVENTS_RENCONTRE.length + G.EVENTS_TRAME.length
           + G.EVENTS_NEMESIS.length + G.CONTRATS_SPECIAUX.length + G.EVENTS_ROMANCE.length;
console.log(`assets/README.md régénéré : ${nbEv} bandeaux + ${familles.length} familles, ${Object.keys(G.PORTRAITS).length} portraits`);
