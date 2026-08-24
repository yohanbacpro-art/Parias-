# Le percepteur

**Catégorie :** VIE_COURANTE
**Lieu-type :** village

## Scène

Un percepteur saisit le dernier cheval d'une famille incapable de payer une taxe de guerre. Les papiers semblent authentiques. La famille affirme avoir déjà payé.

## Choix visibles

1. **Ne rien faire.**
2. **Vérifier les registres.**
3. **Payer la dette.**
4. **Menacer le percepteur.**

## Logique développeur — SPOILERS

La résolution dépend de l'état des PNJ, des relations, de la réputation, de la suspicion et des flags mondiaux. Une escalade cohérente peut appeler `START_COMBAT` ou `START_BATTLE`; ne jamais déclencher une bataille sans forces organisées présentes.

## Conséquences persistantes possibles

- preuve de corruption
- relation maison
- réputation
- combat gardes possible
- planifier un rappel plusieurs jours, mois ou années plus tard lorsque pertinent
