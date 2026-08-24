# La chose dans le puits

**Catégorie :** CREATURES
**Lieu-type :** village

## Scène

Chaque nuit, quelque chose remonte le puits et dépose des objets volés sur la margelle. Cette nuit, il a laissé une main humaine.

## Choix visibles

1. **Condamner le puits.**
2. **Descendre.**
3. **Attendre ce qui remontera.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- monstre
- victimes
- donjon
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
