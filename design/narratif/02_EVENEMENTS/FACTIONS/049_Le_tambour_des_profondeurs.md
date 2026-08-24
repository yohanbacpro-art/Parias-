# Le tambour des profondeurs

**Catégorie :** FACTIONS
**Lieu-type :** Kar-Durak

## Scène

Les Nains interrompent tout travail lorsque des coups sourds remontent des galeries condamnées. Les anciens savent ce que cela signifie : les Peaux-Vertes rassemblent quelque chose de gros.

## Choix visibles

1. **Quitter Kar-Durak.**
2. **Offrir d'explorer.**
3. **Demander combien de guerriers les Nains peuvent mobiliser.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- crise Peau-Verte
- contrat
- bataille
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
