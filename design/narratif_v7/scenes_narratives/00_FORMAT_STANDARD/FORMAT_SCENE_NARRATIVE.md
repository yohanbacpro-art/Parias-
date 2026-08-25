# Format standard d'une scène narrative

Chaque scène possède deux fichiers portant le même identifiant.

- `*_JOUEUR.md` : uniquement ce qui peut être affiché à l'écran.
- `*_MOTEUR_SPOILERS.md` : déclencheurs, tests, branches, flags, effets, rappels et conséquences longues. Ce fichier ne doit jamais être exposé au joueur.

## Convention JOUEUR

```text
ID / TITRE / LIEU / MOMENT
ILLUSTRATION SUGGÉRÉE

NARRATION
Texte sensoriel et contextualisé, sans révéler l'avenir.

DIALOGUE
NOM — « Réplique. »

CHOIX
[C1] Texte exact affiché.
[C2] Texte exact affiché.
```

Une scène JOUEUR ne décrit que l'état présent. Après un choix, le moteur affiche une autre scène, jamais un résumé anticipé des conséquences.

## Convention MOTEUR / SPOILERS

```text
ID / ACTE / TYPE / STATUT CANONIQUE
PRÉREQUIS ET EXCLUSIONS
PNJ / LIEUX / ILLUSTRATION / MUSIQUE
VARIABLES LUES

NŒUDS
N01 -> choix -> condition/test -> N02 ou N03

APPELS SYSTÈME
COMBAT(id, participants, terrain, règles de défaite)
BATAILLE(id, armées, objectifs, renforts, retraite)

EFFETS
flags, relations, réputation, suspicion, ressources, blessures, temps

CONSÉQUENCES
immédiates / différées / longues / mondiales

GARDE-FOUS
continuité, consentement, impossibilités, contenu à ne pas révéler
```

## Règles d'écriture

1. Trois à cinq choix utiles par nœud ; aucun faux choix cosmétique présenté comme majeur.
2. Les conditions peuvent ouvrir un choix, modifier une réplique ou changer silencieusement une issue.
3. Un échec doit produire une histoire, pas seulement bloquer le joueur.
4. Tout combat prévoit victoire, défaite/retraite et, si pertinent, mort ou capture.
5. Les batailles utilisent l'armée réellement disponible et les alliés réellement acquis.
6. Les relations sont multidimensionnelles : confiance, respect, affection/attirance, peur, dette, compatibilité politique.
7. Les conséquences longues ont une fenêtre de rappel, un déclencheur et une solution si le PNJ concerné est mort ou indisponible.
8. Aucun choix intime ne contourne le consentement explicite d'un personnage adulte.
9. Les actes structurent l'auteur et le moteur, jamais l'interface du joueur.
10. Les identifiants et flags sont stables, en majuscules ASCII avec préfixe de scène.

