# Le troupeau immobile

**Catégorie :** CREATURES
**Lieu-type :** plaine

## Scène

Deux cents moutons restent parfaitement immobiles au milieu d'un champ. Aucun ne mange. Aucun ne bêle. Le berger a disparu.

## Choix visibles

1. **Contourner.**
2. **Examiner un animal.**
3. **Chercher le berger.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- magie
- prédateur
- malédiction
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
