# Le pain noir

**Catégorie :** VIE_COURANTE
**Lieu-type :** village

## Scène

Une foule s'est formée devant un fournil. Le boulanger est accusé d'avoir mélangé de la sciure à la farine pendant une disette. Sa femme jure qu'un intendant seigneurial détourne les sacs de grain.

## Choix visibles

1. **Partir.**
2. **Inspecter les réserves.**
3. **Forcer l'intendant à venir répondre aux accusations.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- famine locale
- relation paysans
- relation maison
- émeute possible
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
