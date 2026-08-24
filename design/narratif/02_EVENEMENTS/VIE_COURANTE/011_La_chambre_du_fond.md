# La chambre du fond

**Catégorie :** VIE_COURANTE
**Lieu-type :** taverne

## Scène

Une aubergiste demande discrètement à Yohan de regarder une chambre dont le locataire n'est pas sorti depuis trois jours. La porte est verrouillée de l'intérieur et une odeur métallique passe sous le battant.

## Choix visibles

1. **Refuser et commander à boire.**
2. **Forcer la porte.**
3. **Questionner d'abord l'aubergiste et les voisins de chambre.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- cadavre ou survivant selon état
- indice criminel
- combat possible
- rumeur locale
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
