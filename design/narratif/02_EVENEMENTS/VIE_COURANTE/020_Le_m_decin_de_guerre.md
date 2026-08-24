# Le médecin de guerre

**Catégorie :** VIE_COURANTE
**Lieu-type :** ville

## Scène

Un chirurgien soigne gratuitement des soldats mutilés mais achète des corps aux bourreaux. Une mère affirme que son fils vivant a été déclaré mort pour finir sur sa table.

## Choix visibles

1. **Ignorer.**
2. **Enquêter.**
3. **Confronter le chirurgien.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- médecin recrutable
- crime possible
- relation garnison
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
