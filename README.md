# PARIAS — Chroniques de Vardhen

> *Le monde n'existe pas pour le joueur. Le joueur existe dans le monde.*

RPG narratif au tour par tour. On incarne **Yohan de Karlsberg**, dernier héritier
connu d'une maison Paria rasée pendant la Grande Purge : deux pistolets à silex,
une épée bâtarde, et dans les veines une magie de l'Onde qui fatigue autant
qu'elle détruit.

**Version actuelle : V0.3** — les événements écrits, le combat de groupe et les images.

## Lancer le jeu

Aucune dépendance, aucun build. Ouvrir `index.html` dans un navigateur.

Pour éviter les restrictions `file://` (import de sauvegarde), servir le dossier :

```bash
python3 -m http.server 8000   # puis http://localhost:8000
```

## Ce qui est jouable

| Système | État |
|---|---|
| Prologue en 4 écrans | ✅ |
| Carte du monde (20 lieux, épingles colorées par Danger) | ✅ |
| Boucle de tour : 3 actions puis 2–6 semaines qui passent | ✅ |
| **Événements écrits** : 11 récits ramifiés, 89 scènes, 53 choix | ✅ |
| Événements générés (200 variantes) — remplissage quand les écrits sont épuisés | ✅ |
| Contrats en 5 phases (Audience → Retour), 50 au registre | ✅ |
| **Combat de groupe** : party contre plusieurs adversaires, cibles au clic | ✅ |
| Pouvoirs de zone, à cibles multiples, de soin et de protection | ✅ |
| Combat tour par tour : 3 PA, d20 + Précision/VOL vs Défense | ✅ |
| Fatigue de l'Onde (Sûre → Tendue → Critique → Rupture) | ✅ |
| Arbre de pouvoirs de l'Onde, 4 branches × 4 tiers | ✅ |
| Équipement, inventaire, boutique itinérante | ✅ |
| Niveaux 1–20, XP, points de talent | ✅ |
| Suspicion : chasseurs de primes au-delà de 60 | ✅ |
| Tensions des 8 peuples, chroniques générées | ✅ |
| Trame principale en 5 chapitres | ✅ |
| **Compagnons combattants** : Alycia (Onde), Alarielle (magie ancienne) | ✅ |
| **Illustrations** : bandeaux d'événement et portraits, avec blason de repli | ✅ |
| Sauvegarde locale + export/import fichier | ✅ |
| Arbre de pouvoirs elfique (`TREE_ELFES`) | ✅ joué par Alarielle |

## Règles clés

- **Le groupe** — Yohan et ses compagnons combattent ensemble. Chaque membre a
  ses propres PA ; on clique une carte du groupe pour choisir qui agit, une carte
  d'adversaire pour choisir la cible, puis « Terminer le tour ».
- **Points d'Action** — 3 par tour pour Yohan, 2 pour les compagnons. Tir 1 PA ·
  épée légère 1 PA · épée lourde 2 PA · recharger 1 PA · pouvoirs 1–3 PA.
- **Portée des pouvoirs** — cible unique, `cibles: 2` (rebond à 60 % des dégâts),
  ou `zone: true` (tous les adversaires). Certains soignent, apaisent la Fatigue
  ou protègent le groupe au lieu de frapper.
- **Deux magies** — Yohan et Alycia puisent dans l'Onde, viscérale et vorace ;
  Alarielle dans la magie ancienne d'Eltharion, qui soigne et protège. Le sang
  Paria ne donne pas accès à l'arbre elfique, et réciproquement.
- **Touche** — d20 + Précision (armes) ou + Volonté (pouvoirs) vs Défense.
  Marge ≥ 10 = critique (×1,5).
- **Fatigue de l'Onde** — 0–100. Plus la zone est haute, plus les pouvoirs coûtent
  cher (×1 → ×2), plus ils peuvent rater (0 % → 45 %), et à partir de Critique un
  échec inflige un contrecoup.
- **Mort permanente** — le combat n'est perdu que si tout le groupe tombe. Contre
  un Danger 3+, c'est la fin de la partie ; contre un Danger 1–2, Yohan s'en tire
  blessé. S'il tombe alors qu'un compagnon tient encore, le combat continue sans
  lui — et il repart à 1 PV si le groupe l'emporte.
- **Suspicion** — monte au combat et à l'intimidation, redescend au repos et avec
  le temps. À 60+, un chasseur de primes peut surgir en explorant.
- **Prix du Paria** — coutume ancestrale : un Paria peut réclamer l'or ou le prix
  ancien. Toujours négocié, jamais imposé, consentement requis.

## Structure

```
index.html            structure + styles + ordre de chargement
src/game.js           boucle de tour, monde, personnage, contrats, sauvegarde
src/combat.js         moteur de combat de groupe (party vs adversaires)
src/events_runner.js  déroulement des événements écrits et générés
src/ui/art.js         résolution des images + blason procédural de repli
src/data/
  bestiary.js         40 créatures, Danger 1–6
  locations.js        20 lieux + coordonnées sur la carte
  events.js           200 événements générés + variantes narratives
  events_written.js   11 événements écrits, ramifiés en scènes
  contracts.js        50 contrats (10 archétypes) + habillage narratif
  powers.js           arbres de pouvoirs (Onde, Elfes) + portée des sorts
  items.js            équipement et consommables
  portraits.js        registre des personnages illustrés
  lore.js             prologue, trame, compagnons, codex, calendrier, tensions
assets/               illustrations à déposer — voir assets/README.md
tools/validate.js     contrôle d'intégrité du contenu
```

Les fichiers de `src/data/` sont des scripts classiques chargés avant `game.js` :
tout vit dans la portée globale, il n'y a ni bundler ni étape de build.

## Vérifier une modification

```bash
node tools/validate.js                       # cohérence du contenu
for f in src/*.js src/*/*.js; do node --check "$f"; done   # syntaxe
```

`tools/validate.js` vérifie que chaque scène référencée existe, que les créatures,
objets, pouvoirs, portraits et lieux cités sont réels, et signale les scènes
écrites mais inatteignables.

## Écrire un événement

Tout se passe dans `src/data/events_written.js`. Un événement est un arbre de
scènes ; le format complet est documenté en tête de fichier. En résumé :

```js
{
  id:"EW_EXEMPLE", titre:"…", famille:"VOYAGE", rarete:"rare",
  image:"evt_exemple",            // assets/events/evt_exemple.webp
  lieux:["LOC_011"],              // facultatif : sinon, filtré par famille
  scenes:{
    start:{
      pnj:"baltus",               // portrait affiché
      texte:["paragraphe…"],
      choix:[
        {label:"Payer", detail:"−20 or", suite:"paye", effets:{or:-20}},
        {label:"Refuser", test:{stat:"vol", dc:13}, reussite:"ok", echec:"ko"},
        {label:"User de l'Onde", requis:{pouvoir:"foudre"}, suite:"onde"},
      ]
    },
    ko:{ texte:["…"], combat:{groupe:[{bst:"BST_002",n:2}], victoire:"apres", defaite:"apres"} },
    apres:{ texte:["…"], effets:{suspicion:5}, fin:true }
  }
}
```

Un choix verrouillé reste visible, grisé, avec la raison affichée — le joueur
voit ce qu'il rate. Les événements écrits ne se répètent pas tant que ceux
applicables au lieu ne sont pas tous vus.

Le contenu de jeu provient du **Content Pack V1.4**.
