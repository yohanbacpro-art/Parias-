# Le péage des morts

**Catégorie :** ROUTES
**Lieu-type :** pont

## Scène

Des hommes en armure réclament un péage au nom d'un seigneur mort depuis deux ans. Ils possèdent encore son sceau.

## Choix visibles

1. **Payer.**
2. **Contester leur autorité.**
3. **Tenter de saisir le sceau.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- bandits
- sceau utilisable
- combat
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
