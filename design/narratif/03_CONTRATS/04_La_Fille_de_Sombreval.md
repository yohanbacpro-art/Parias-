# CONTRAT 04 — La Fille de Sombreval

**Commanditaire :** Maison de Sombreval  
**Or initial proposé :** 900 écus  
**Structure :** contrat scénarisé persistant

## Audience

La fille adulte du seigneur a disparu dans les marais avec quatre gardes. Un seul cheval est revenu. Le père veut qu'elle soit ramenée vivante et interdit de prévenir les autorités voisines.

Le commanditaire doit être joué comme un véritable PNJ : il peut être inquiet, arrogant, manipulateur ou pragmatique. Yohan peut poser des questions avant de parler du paiement.

## Prix du Paria

Les termes sont établis **avant tout départ et toute action contractuelle**.

Pour une maison humaine noble, le moteur recherche une **noble adulte réelle de la maison**, disponible dans l'état courant de la sauvegarde. Elle doit consentir explicitement à entrer dans les termes ancestraux. Si aucune candidate adulte consentante n'existe, cette partie du prix est indisponible.

Choix possibles : **Or / noble adulte consentante / Or + noble adulte consentante / négocier / refuser.**

Aucune grossesse ni relation amoureuse n'est automatique : après le contrat, les relations suivent le système normal du monde vivant.

## Chaîne de scènes

1. **Audience**
2. **Prix du Paria**
3. **Inspection du cheval**
4. **Marais**
5. **Découverte des gardes**
6. **Rencontre avec une faction tierce**
7. **Choix de négociation ou combat**
8. **Retrouver la disparue**
9. **Retour où sa version peut contredire celle de son père**

## Conséquences cachées

Le contrat doit pouvoir modifier plusieurs éléments : relation avec Maison de Sombreval, état des PNJ, réputation, nouvelles du monde, accès à de futurs contrats et parfois situation militaire régionale. Un commanditaire ayant menti peut être confronté au retour. Un ennemi épargné peut revenir.

## Appels gameplay

- `START_COMBAT` lorsque la scène implique un petit affrontement.
- `START_BATTLE` lorsque des forces militaires sont réellement engagées.
- `UPDATE_RELATION`
- `UPDATE_SUSPICION`
- `SET_WORLD_FLAG`
- `SCHEDULE_FOLLOWUP`
