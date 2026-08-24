# CONTRAT 02 — Les Mille Gueules

**Commanditaire :** Maison d'Arquenay  
**Or initial proposé :** 1100 écus  
**Structure :** contrat scénarisé persistant

## Audience

Des dizaines de mineurs ont disparu sous une exploitation de fer. Les survivants parlent de voix qui imitent leurs proches. La maison veut rouvrir la mine avant la fin du mois.

Le commanditaire doit être joué comme un véritable PNJ : il peut être inquiet, arrogant, manipulateur ou pragmatique. Yohan peut poser des questions avant de parler du paiement.

## Prix du Paria

Les termes sont établis **avant tout départ et toute action contractuelle**.

Pour une maison humaine noble, le moteur recherche une **noble adulte réelle de la maison**, disponible dans l'état courant de la sauvegarde. Elle doit consentir explicitement à entrer dans les termes ancestraux. Si aucune candidate adulte consentante n'existe, cette partie du prix est indisponible.

Choix possibles : **Or / noble adulte consentante / Or + noble adulte consentante / négocier / refuser.**

Aucune grossesse ni relation amoureuse n'est automatique : après le contrat, les relations suivent le système normal du monde vivant.

## Chaîne de scènes

1. **Audience**
2. **Prix du Paria**
3. **Interroger les survivants**
4. **Descente dans la mine**
5. **Séparation possible du groupe**
6. **Découverte de la colonie**
7. **Combat**
8. **Décision concernant la mine**
9. **Retour**

## Conséquences cachées

Le contrat doit pouvoir modifier plusieurs éléments : relation avec Maison d'Arquenay, état des PNJ, réputation, nouvelles du monde, accès à de futurs contrats et parfois situation militaire régionale. Un commanditaire ayant menti peut être confronté au retour. Un ennemi épargné peut revenir.

## Appels gameplay

- `START_COMBAT` lorsque la scène implique un petit affrontement.
- `START_BATTLE` lorsque des forces militaires sont réellement engagées.
- `UPDATE_RELATION`
- `UPDATE_SUSPICION`
- `SET_WORLD_FLAG`
- `SCHEDULE_FOLLOWUP`
