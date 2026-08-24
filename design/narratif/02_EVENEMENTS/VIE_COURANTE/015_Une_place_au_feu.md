# Une place au feu

**Catégorie :** VIE_COURANTE
**Lieu-type :** camp

## Scène

Une voyageuse armée demande à partager le feu pour la nuit. Elle connaît manifestement les routes mieux qu'elle ne veut l'admettre et surveille les pistolets de Yohan.

## Choix visibles

1. **Refuser.**
2. **L'accepter mais monter la garde.**
3. **L'interroger franchement.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- compagnon temporaire
- espion potentiel
- relation
- vol possible
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
