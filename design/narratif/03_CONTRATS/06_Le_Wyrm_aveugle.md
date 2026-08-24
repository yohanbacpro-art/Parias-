# CONTRAT 06 — Le Wyrm aveugle

**Commanditaire :** Prince de Mont-Draken  
**Or initial proposé :** 3000 écus  
**Structure :** contrat scénarisé persistant

## Audience

Quelque chose d'ancien s'est réveillé sous une forteresse. Charles ne demande pas à Yohan de sauver les pierres : il veut savoir si la créature peut atteindre les vallées humaines.

Le commanditaire doit être joué comme un véritable PNJ : il peut être inquiet, arrogant, manipulateur ou pragmatique. Yohan peut poser des questions avant de parler du paiement.

## Prix du Paria

Les termes sont établis **avant tout départ et toute action contractuelle**.

Pour une maison humaine noble, le moteur recherche une **noble adulte réelle de la maison**, disponible dans l'état courant de la sauvegarde. Elle doit consentir explicitement à entrer dans les termes ancestraux. Si aucune candidate adulte consentante n'existe, cette partie du prix est indisponible.

Choix possibles : **Or / noble adulte consentante / Or + noble adulte consentante / négocier / refuser.**

Aucune grossesse ni relation amoureuse n'est automatique : après le contrat, les relations suivent le système normal du monde vivant.

## Chaîne de scènes

1. **Audience avec Charles**
2. **Négociation**
3. **Exploration souterraine**
4. **Découverte d'anciennes galeries**
5. **Premier contact**
6. **Retour possible pour demander des troupes**
7. **Combat ou BATAILLE selon préparation**
8. **Sort du Wyrm**
9. **Réaction de Charles**

## Conséquences cachées

Le contrat doit pouvoir modifier plusieurs éléments : relation avec Prince de Mont-Draken, état des PNJ, réputation, nouvelles du monde, accès à de futurs contrats et parfois situation militaire régionale. Un commanditaire ayant menti peut être confronté au retour. Un ennemi épargné peut revenir.

## Appels gameplay

- `START_COMBAT` lorsque la scène implique un petit affrontement.
- `START_BATTLE` lorsque des forces militaires sont réellement engagées.
- `UPDATE_RELATION`
- `UPDATE_SUSPICION`
- `SET_WORLD_FLAG`
- `SCHEDULE_FOLLOWUP`
