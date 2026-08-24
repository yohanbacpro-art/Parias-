# La chasse du prince

**Catégorie :** NOBLESSE
**Lieu-type :** forêt seigneuriale

## Scène

Une chasse mondaine tourne mal lorsqu'un animal monstrueux éventre deux rabatteurs. Les nobles veulent continuer pour ne pas perdre la face.

## Choix visibles

1. **Quitter la chasse.**
2. **Protéger les rabatteurs.**
3. **Prendre la piste du monstre.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- monstre
- relation prince
- chasse
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
