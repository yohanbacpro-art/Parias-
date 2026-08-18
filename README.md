# PARIAS — Chroniques de Vardhen

> *Le monde n'existe pas pour le joueur. Le joueur existe dans le monde.*

RPG narratif au tour par tour. On incarne **Yohan de Karlsberg**, dernier héritier
connu d'une maison Paria rasée pendant la Grande Purge : deux pistolets à silex,
une épée bâtarde, et dans les veines une magie de l'Onde qui fatigue autant
qu'elle détruit.

**Version actuelle : V0.2** — le monde, les contrats et l'affrontement.

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
| Événements contextuels (176 entrées, filtrés par lieu) | ✅ |
| Contrats en 5 phases (Audience → Retour), 50 au registre | ✅ |
| Combat tour par tour : 3 PA, d20 + Précision/VOL vs Défense | ✅ |
| Fatigue de l'Onde (Sûre → Tendue → Critique → Rupture) | ✅ |
| Arbre de pouvoirs de l'Onde, 4 branches × 4 tiers | ✅ |
| Équipement, inventaire, boutique itinérante | ✅ |
| Niveaux 1–20, XP, points de talent | ✅ |
| Suspicion : chasseurs de primes au-delà de 60 | ✅ |
| Tensions des 8 peuples, chroniques générées | ✅ |
| Trame principale en 5 chapitres, compagnons | ✅ |
| Sauvegarde locale + export/import fichier | ✅ |
| Arbre de pouvoirs elfique (`TREE_ELFES`) | 🚧 données prêtes, non branché |

## Règles clés

- **Points d'Action** — 3 par tour en combat. Tir 1 PA · épée légère 1 PA ·
  épée lourde 2 PA · recharger 1 PA · pouvoirs 1–3 PA.
- **Touche** — d20 + Précision (armes) ou + Volonté (pouvoirs) vs Défense.
  Marge ≥ 10 = critique (×1,5).
- **Fatigue de l'Onde** — 0–100. Plus la zone est haute, plus les pouvoirs coûtent
  cher (×1 → ×2), plus ils peuvent rater (0 % → 45 %), et à partir de Critique un
  échec inflige un contrecoup.
- **Mort permanente** — perdre contre un Danger 3+ met fin à la partie. Contre un
  Danger 1–2, Yohan s'en tire blessé.
- **Suspicion** — monte au combat et à l'intimidation, redescend au repos et avec
  le temps. À 60+, un chasseur de primes peut surgir en explorant.
- **Prix du Paria** — coutume ancestrale : un Paria peut réclamer l'or ou le prix
  ancien. Toujours négocié, jamais imposé, consentement requis.

## Structure

```
index.html            structure + styles + ordre de chargement
src/game.js           moteur : boucle de tour, événements, contrats, combat, UI
src/data/
  bestiary.js         40 créatures, Danger 1–6
  locations.js        20 lieux + coordonnées sur la carte
  events.js           176 événements + variantes narratives
  contracts.js        50 contrats (10 archétypes) + habillage narratif
  powers.js           arbres de pouvoirs (Onde, Elfes)
  items.js            équipement et consommables
  lore.js             prologue, trame, codex, calendrier, tensions
```

Les fichiers de `src/data/` sont des scripts classiques chargés avant `game.js` :
tout vit dans la portée globale, il n'y a ni bundler ni étape de build.

## Vérifier une modification

```bash
node --check src/game.js          # syntaxe
node -e "$(cat src/data/contracts.js); console.log(CONTRACTS.length)"   # données
```

Le contenu de jeu provient du **Content Pack V1.4**.
