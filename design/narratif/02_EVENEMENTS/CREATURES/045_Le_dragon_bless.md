# Le dragon blessé

**Catégorie :** CREATURES
**Lieu-type :** montagne

## Scène

Un dragon déjà blessé par une armée s'est écrasé dans une vallée. Trois groupes différents convergent vers lui : chasseurs, soldats et pillards.

## Choix visibles

1. **Laisser les autres agir.**
2. **Tenter de l'achever.**
3. **Observer avant de choisir un camp.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- dragon persistant
- trésor
- bataille multipartite
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
