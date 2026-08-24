# La borne brisée

**Catégorie :** ROUTES
**Lieu-type :** route

## Scène

Une borne frontière a été arrachée et déplacée de plusieurs centaines de pas. Deux villages sont désormais prêts à se battre pour les mêmes pâturages.

## Choix visibles

1. **Continuer.**
2. **Chercher l'ancienne fondation.**
3. **Arbitrer en faveur d'un village.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- frontière locale
- relation villages
- bagarre possible
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
