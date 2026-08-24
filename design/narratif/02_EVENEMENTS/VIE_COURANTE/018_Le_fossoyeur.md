# Le fossoyeur

**Catégorie :** VIE_COURANTE
**Lieu-type :** cimetière

## Scène

Le fossoyeur demande de l'aide : plusieurs tombes ont été ouvertes de l'intérieur, mais aucun cadavre ne manque.

## Choix visibles

1. **Refuser.**
2. **Inspecter les tombes.**
3. **Attendre la nuit.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- créature
- culte
- combat nocturne
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
