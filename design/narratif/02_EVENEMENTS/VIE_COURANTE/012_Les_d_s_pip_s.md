# Les dés pipés

**Catégorie :** VIE_COURANTE
**Lieu-type :** taverne

## Scène

Un jeune noble perd une fortune aux dés puis accuse un vétéran de l'avoir volé. Ses gardes ferment les sorties tandis que le tavernier cache déjà les bouteilles coûteuses.

## Choix visibles

1. **Rester hors de l'affaire.**
2. **Examiner les dés.**
3. **Prendre parti publiquement.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- duel possible
- relation maison
- contact vétéran
- dette de jeu
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
