# Le pont brûle

**Catégorie :** ROUTES
**Lieu-type :** route

## Scène

Des cavaliers incendient un pont derrière eux. Sur l'autre rive, une colonne de réfugiés approche tandis qu'une armée est visible au loin.

## Choix visibles

1. **Partir.**
2. **Aider les réfugiés.**
3. **Poursuivre les cavaliers.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- réfugiés sauvés
- information militaire
- bataille future
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
