# V7 — ce qui fait autorité, et sur quoi

Ce dossier est le **Vardhen Narrative Pack V7 (version allégée)**, 49 fichiers,
sans les visuels. Il est arrivé après que la tranche jouable `proto/tranche-1.html`
a été écrite, et il corrige plusieurs choses que j'avais inventées faute de mieux.

Comme le V6 dans `design/narratif/`, c'est **la source d'écriture, pas du contenu
jouable** : le canon vient d'ici, les scènes et leurs coûts s'écrivent en JS.

## Ce qui fait désormais autorité

| Question | Le document qui tranche |
|---|---|
| La structure de la campagne | `docs/direction_narrative/PROMPT_DIRECTION_NARRATIVE_V7.md` — **trois actes** |
| Les capacités de Yohan | `docs/YOHAN_DE_KARLSBERG_FICHE_CANONIQUE_ET_PROGRESSION_V7.md` + `data/combat/yohan_canonical_start_v7.json` |
| La résolution d'une action | `docs/SYSTEME_COMBAT_NARRATIF_V7.md` — cinq degrés, pas deux |
| L'écriture d'un combat | `scenes_narratives/00_FORMAT_STANDARD/GABARIT_COMBAT_TEXTUEL_JOUEUR_MOTEUR.md` |
| Le gore et les scènes adultes | `scenes_narratives/00_FORMAT_STANDARD/RESOLUTION_COMBATS_CAPACITES_ET_CONTENU_ADULTE.md` |
| La forme d'une scène | `scenes_narratives/00_FORMAT_STANDARD/FORMAT_SCENE_NARRATIVE.md` |
| Le registre d'écriture visé | `scenes_narratives/01_ACTE_I_LE_PARIA/V7_C01_WYVERNE_COMBAT_LONG_JOUEUR.md` |

## Ce que la tranche jouable avait faux

1. **L'échelle.** J'avais posé Volonté 11, Précision 9, Vigueur 12 sur un d20.
   Le canon est une échelle 1–10, sept caractéristiques et seize compétences.
2. **La résolution binaire.** J'avais réussite/échec. Le canon a cinq degrés :
   dominante, nette, **coûteuse**, échec, catastrophe. La réussite coûteuse est
   ce qui manquait le plus.
3. **Les blessures.** J'avais une chaîne de texte et −1 à tous les jets. Le canon
   veut zone, type, gravité, douleur, saignement, fonction perdue, traitement,
   cicatrice — et une fonction perdue ferme des choix précis, pas tous.
4. **L'adaptation adverse.** Absente chez moi. Le canon donne +2 puis +4 à
   l'ennemi quand on répète la même manœuvre.
5. **L'ellipse.** Le canon exige qu'une scène intime propose toujours une sortie
   par l'ellipse. La tranche ne la proposait pas explicitement.
6. **Le réglage du gore.** `GORE_DETAIL` : sobre, intense, extrême — le détail
   change, les conséquences mécaniques non.

## Compatibilité V3–V6

Les identifiants V7 portent le préfixe `V7_`. Rien du V6 n'est renommé ni
supprimé ; `design/narratif/` reste en place.
