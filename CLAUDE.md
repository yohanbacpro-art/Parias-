# VARDHEN — document fondateur

Ce fichier fait autorité. Il porte le **prompt maître** du projet, l'état réel du
code au regard de ce prompt, et la feuille de route. Toute session de travail
commence par le lire.

Le `README.md` documente ce qui existe et comment le vérifier. Ce fichier-ci dit
ce que le jeu **doit être**.

---

## 1. Le prompt maître

VARDHEN est un **RPG narratif dark fantasy** centré sur *Yohan de Karlsberg*, un
Paria parcourant un monde vivant. Le joueur ne se déplace pas librement dans un
espace 3D. Le jeu fonctionne par :

> carte du monde → déplacement → lieu → scène narrative → choix → conséquences →
> combat ou bataille éventuels → évolution du monde → nouvelle décision.

La sensation visée se situe entre un RPG narratif, *Crusader Kings* pour les
personnages et les dynasties, et un jeu de mercenaire.

### Principe absolu — le joueur ne voit jamais le code narratif

Les fichiers d'événements contiennent des embranchements et des spoilers
destinés **au moteur seul**. Quand un événement s'ouvre, l'interface montre
uniquement : l'illustration, la date et le lieu, le texte, les personnages
présents, et **les choix actuellement accessibles**. Après un choix, on affiche
la scène suivante — jamais le résultat complet de l'événement, jamais les
branches futures.

### Boucle de jeu

Le joueur doit pouvoir : consulter la carte · choisir une destination · voyager
(ce qui fait avancer le temps) · croiser un événement de route · arriver dans un
lieu · y choisir ses activités · accepter des contrats · parler aux PNJ ·
commercer et s'équiper · dormir · explorer · vivre des événements narratifs ·
combattre · mener des batailles · bâtir réputation, relations et richesse ·
reconstruire Karlsberg · recruter · peser dans les grandes crises.

**Il doit toujours rester possible de simplement voyager et prendre des
contrats.** La quête principale ne se force jamais.

### Monde vivant

Le monde évolue quand Yohan n'est pas là. Chaque PNJ majeur a un âge, une
culture, une maison, une localisation, des traits, des relations, des objectifs,
une opinion de Yohan et des autres, un statut, un conjoint éventuel, des
enfants, des ennemis, des alliés, et **la mémoire des événements importants**.
Alycia, Alarielle, Charles de Mont-Draken, Lucius Furius Augustus, Caleb de
Fort-aux-Princes, Tyrion, Eltharion, Anarion et Khal-Vaene agissent sans le
joueur : alliances, guerres, mariages, naissances, défaites, morts.

**Jamais de simulation purement aléatoire.** Personnalité, intérêts, relations
et situation politique décident.

### Mémoire narrative

Une décision importante ne se réduit pas à `relation −20`. Elle pose un
marqueur : `LORD_ARMAND_HUMILIATED_BY_YOHAN`. Des mois plus tard, cet homme peut
envoyer des tueurs, provoquer en duel, marcher sur Karlsberg — ou renoncer.

Un enfant sauvé revient adulte. Un dragon blessé réapparaît. Un ennemi épargné
devient allié ou cherche vengeance. Un village sauvé envoie des soldats vingt
ans plus tard. **Les conséquences longues sont un pilier du jeu.**

### Contrats

Un contrat est une aventure, pas un bouton « tuer X » :

> audience → questions → négociation → préparation → voyage → complication →
> découverte → confrontation → combat ou bataille → décision → retour →
> paiement → conséquences.

Pour les maisons concernées par la tradition des Parias, **les termes se fixent
avant toute action** : Or · noble adulte consentante · Or + noble · négocier ·
refuser. Les femmes concernées sont de vrais PNJ adultes avec une personnalité
et une volonté. Rien n'est automatique ensuite.

### Karlsberg

Karlsberg commence en ruine. Sa reconstruction est une immense progression
**facultative**. Jamais « Reconstruire le château : 10 000 or ». Il faut de la
pierre, des ouvriers, un architecte, de la nourriture, des routes sûres, une
garnison, une population, des revenus, des alliances.

Progression visible : ruines → refuge → fort → château → domaine → puissance
régionale. Le joueur peut relever les Bannières du Loup. **Plus Karlsberg renaît,
moins l'identité de Yohan est cachable.**

### Suspicion

Jauge cachée ou semi-cachée sur l'identité de Yohan. Elle monte avec les
exploits, l'usage des pouvoirs devant témoins, les reliques Karlsberg, les liens
avec les Parias, la reconstruction. **Les seuils changent le monde**, ils
n'affichent pas un nombre : rumeurs → enquêtes → certaines puissances
comprennent → alliances, mariages, chasseurs, assassins → retour public.

### Romances

Jamais une barre à remplir. Séparer au minimum **relation / confiance /
attirance / compatibilité politique**. Alycia et Alarielle sont majeures et
facultatives. Elles peuvent aimer Yohan et être en désaccord avec lui, refuser,
rompre, ou préférer leurs propres intérêts.

### Temps et dynasties

Le temps est une mécanique réelle. Les personnages vieillissent, les enfants
deviennent adultes, les maisons évoluent, on meurt, on hérite, les guerres
commencent et finissent. Les descendants Karlsberg comptent sur une longue
campagne.

### Grande histoire

**Jamais d'« ACTE 1 » affiché.** L'histoire émerge : mercenaire paria → exploits
remarqués → identité dangereuse → acteur politique. Pendant ce temps courent la
guerre Eltharion/Anarion, les ambitions de Lucius, l'unification khesh, la
guerre de Kar-Durak, la Horde Homme-Bête et les rivalités humaines. Ces crises
doivent se dérouler différemment d'une partie à l'autre.

### Fin de partie

Pas de cinématique fixe. La fin lit l'état réel du monde : un siège de Karlsberg
possible, les alliés réellement gagnés, quelqu'un sauvé vingt ans plus tôt qui
revient, un enfant devenu adulte à la tête d'une unité, une maison humiliée
passée à l'ennemi, Alycia ou Alarielle présentes, absentes ou contre. Puis un
**épilogue historique dynamique**.

### Interface

Dark fantasy, élégante, lisible, immersive. Jamais un tableur : les systèmes
complexes se cachent derrière une présentation narrative simple.

### Méthode

Analyser avant de modifier. **Ne casser aucun système fonctionnel** — en
particulier le combat et la bataille, qui s'intègrent et ne se réécrivent pas.
Une sauvegarde unique. La boucle fondamentale d'abord. À chaque étape, **le jeu
reste jouable**.

---

## 2. Où en est le code

Audit au 24 août. Ce qui est là, ce qui manque, sans complaisance.

| Exigence du prompt | État | Où |
|---|---|---|
| Boucle carte → voyage → lieu → scène → choix → conséquence | **fait** | `lieu.js`, `offres.js`, `tour.js` |
| Le joueur ne voit jamais les branches futures | **fait** | `events_runner.js` ne rend que la scène active |
| Combat existant intégré, non réécrit | **fait** | `combat.js` (party vs groupe, PA, Fatigue) |
| Bataille existante intégrée, non réécrite | **fait** | `battle.js` (3 fronts, ordres, moral) |
| Sauvegarde unique et versionnée | **fait** | `save.js`, v8, migrations chaînées |
| Le temps passe, on vieillit, on a des enfants | **fait** | `lignee.js` |
| Contrats en aventures, pas en boutons | **fait** | `chaines.js` — 30 affaires sur 30 |
| Termes fixés avant toute action | **fait** | `prix.js` + `chaines.js` |
| Noble adulte réelle et consentante | **fait** | `data/maisons.js`, 19 femmes, droit de refus |
| Karlsberg progressif, jamais « payer X » | **partiel** | `chantier.js` — 8 ouvrages, mais l'or reste la seule monnaie |
| Suspicion qui change le monde | **fait** | `suspicion.js`, 4 paliers, 12 événements dédiés |
| Romances à axes séparés | **partiel** | `romances.js` — arcs écrits, un seul axe d'affinité |
| Mémoire narrative longue | **partiel** | marqueurs + issues de chaînes ; aucune chaîne d'arrière-plan écrite |
| PNJ majeurs qui agissent seuls | **manquant** | `politique.js` simule 6 puissances, pas 9 personnes |
| Crises régionales en étapes | **manquant** | `tensions` n'est qu'un nombre qui imprime une ligne |
| Fin lisant l'état réel du monde | **fait** | `epilogue.js`, 116 verdicts, 8 legs |
| Interface dark fantasy non-tableur | **fait** | un seul écran de jeu, le lieu |

**La tranche verticale demandée existe et tourne.** `tools/smoke-tranche.js` en
est l'épreuve d'acceptation : elle marche le chemin exact — nouvelle partie →
carte → voyage → lieu → récit à embranchements → combat → conséquence
enregistrée → sauvegarde → rechargement — et vérifie au passage qu'aucune
branche non prise n'apparaît jamais à l'écran.

Inventaire : 20 lieux · 4 régions · 24 routes · 75 créatures · 12 champions ·
29 troupes · 12 champs de bataille · 130 événements écrits illustrés · **30
affaires en chaînes (101 étapes, 564 scènes, 313 choix, 142 issues)** · 60
affaires locales + 20 dénouements · 50 contrats au registre · 25 maisons nobles ·
8 ouvrages de Karlsberg · 116 verdicts d'épilogue.

---

## 3. Feuille de route

Dans cet ordre. À chaque étape, le jeu reste jouable et les épreuves passent.

1. ~~Les 30 affaires écrites en chaînes depuis les canevas du pack.~~ **Fait** :
   30 affaires, 101 étapes, 564 scènes, 313 choix, 142 issues.
2. **Les 10 chaînes secrètes** (`design/narratif/02_EVENEMENTS/CHAINES_SECRETS`).
   Le moteur les accepte déjà : elles tournent en arrière-plan, en parallèle de
   l'affaire en cours, et se déclenchent sur un marqueur plutôt que sur une
   acceptation. C'est le pilier « conséquences longues » rendu visible.
3. **Les crises régionales en cinq étapes**
   (`design/narratif/05_GRANDE_HISTOIRE/CRISES_REGIONALES`), qui remplacent les
   tensions numériques : Elfes, Astrah, Khesh, Peaux-Vertes, Hommes-Bêtes.
4. Les neuf PNJ majeurs comme acteurs autonomes, avec objectifs et mémoire
   (`design/narratif/02_EVENEMENTS/PERSONNAGES/autonomous_npcs.json`).
5. Les romances à axes séparés (`design/narratif/05_GRANDE_HISTOIRE/ROMANCES`).
6. Karlsberg payé autrement qu'en or : pierre, bras, routes, faveurs.
7. La succession jouable — on continue avec l'héritier.

---

## 4. Règles de travail

- **Rien ne casse.** `node tools/validate.js` puis les neuf épreuves de
  navigateur avant tout commit (voir README, *Vérifier une modification*).
- **Pas de bundler.** Scripts classiques en portée globale ; l'ordre de
  chargement dans `index.html` est le contrat de dépendances.
- **Le contenu vit dans `src/data/`**, le moteur dans `src/`.
- **Une étape de chaîne est un événement écrit ordinaire.** On n'ajoute pas de
  rendu : on écrit des scènes.
- **`design/narratif/` est la source d'écriture**, pas du contenu jouable. Le
  canon vient de là ; les scènes, les choix et leurs coûts s'écrivent en JS.
- **Le français du jeu est soigné** : pas de fautes d'accord, d'élision ni de
  pluriel dans les textes générés.
