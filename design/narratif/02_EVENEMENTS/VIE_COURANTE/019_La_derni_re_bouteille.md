# La dernière bouteille

**Catégorie :** VIE_COURANTE
**Lieu-type :** taverne

## Scène

Deux mercenaires se disputent une bouteille ayant appartenu à leur capitaine mort. La dispute devient un règlement de comptes sur une bataille où quelqu'un aurait abandonné les autres.

## Choix visibles

1. **Observer.**
2. **Acheter la bouteille.**
3. **Demander ce qui s'est réellement passé.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- recrue potentielle
- ancien crime
- duel
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
