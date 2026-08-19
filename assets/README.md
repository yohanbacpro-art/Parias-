# Illustrations

Deux dossiers, deux formats. Les fichiers sont **facultatifs** : tant qu'un fichier
manque, le jeu affiche à sa place un blason généré en SVG, stable pour un même
identifiant. Déposer le fichier au bon chemin suffit à le remplacer — aucun code
à modifier.

## `events/` — bandeaux d'événements

- **Format** : `<id>.webp`, ratio **5:2**, 1200×480 recommandé.
- **Cadrage** : l'image est recadrée en `object-fit: cover`, donc le sujet doit
  être centré verticalement.
- **id** : le champ `image` de l'événement dans `src/data/events_written.js`.

| Fichier attendu | Événement |
|---|---|
| `evt_peage.webp` | Le péage des Trois Clous |
| `evt_archives.webp` | Ce que gardent les archives |
| `evt_enfant.webp` | L'enfant qui fait trembler les vitres |
| `evt_cicatrice.webp` | Ce qui parle dans la Cicatrice |
| `evt_taverne.webp` | La table qui s'est tue |
| `evt_deux_maitres.webp` | Deux mains, un seul contrat |
| `evt_bannieres.webp` | Les bannières qu'on n'a plus le droit de coudre |
| `evt_lances.webp` | Le prix des trois lances |
| `evt_galerie.webp` | La galerie qu'on a murée deux fois |
| `evt_chapelle.webp` | La chapelle qu'on n'ouvre pas |
| `evt_orpailleur.webp` | Ce que l'orpailleur a remonté |
| `evt_traque.webp` | Un chasseur de primes rattrape Yohan |
| `evt_tunnel.webp` | Le tunnel qui monte |
| `evt_harde.webp` | La harde qui laisse passer |
| `evt_epave.webp` | L'épave qui n'a pas coulé |
| `evt_pierres.webp` | Les pierres qui écoutent |
| `evt_port_noir.webp` | Le manifeste qui ne correspond pas |

### Rencontres

| Fichier attendu | Rencontre |
|---|---|
| `rc_caleb.webp` | Le prince qui n'aime pas la concurrence |
| `rc_tyrion.webp` | La faute d'un autre peuple |
| `rc_charles.webp` | Le Sourire de Fer |
| `rc_kemval.webp` | Deux bannis sous le même soleil |
| `rc_khalvaene.webp` | L'usurpateur au milieu des os |
| `rc_anarion.webp` | Une invitation qu'on ne refuse pas |
| `rc_arene.webp` | Le Tenant du Sable Rouge |
| `rc_lucius.webp` | Le tacticien |

### Jalons de trame

| Fichier attendu | Jalon |
|---|---|
| `tr_courrier.webp` | Le courrier qui n'est jamais arrivé |
| `tr_alycia.webp` | Ce qu'elle n'a pas dit en arrivant |
| `tr_ruines.webp` | La statue qui garde encore |
| `tr_dette.webp` | Ce que son peuple doit |
| `tr_banniere.webp` | La bannière qu'il faut coudre |
| `tr_prix.webp` | Le prix du nom |

Les événements générés de `src/data/events.js` cherchent `evt_<famille>.webp`
en minuscules — `evt_voyage.webp`, `evt_ville.webp`, `evt_paria.webp`,
`evt_onde.webp`, `evt_guerre.webp`, `evt_politique.webp`, `evt_khesh.webp`,
`evt_elfe.webp`, `evt_elfe_noir.webp`, `evt_nain.webp`, `evt_peau_verte.webp`,
`evt_homme_bete.webp`, `evt_taverne.webp`, `evt_contrat.webp`.

## `portraits/` — portraits de personnages

- **Format** : `<id>.webp`, **carré**, 512×512 recommandé.
- Affiché en médaillon rond de 56 px : cadrer le visage au centre.
- **id** : la clé dans `src/data/portraits.js`.

Les 24 identifiants attendus sont listés dans ce fichier — protagoniste et
compagnons (`yohan`, `alycia`, `alarielle`), figures du Codex, et personnages
d'événements (`baltus`, `mere_orsen`, `soeur_lisen`, `gorm`, …).

## Vérifier

`node tools/validate.js` signale tout `image` ou `pnj` référencé sans entrée
correspondante. Il ne vérifie pas la présence des fichiers eux-mêmes, puisqu'ils
sont facultatifs par construction.
