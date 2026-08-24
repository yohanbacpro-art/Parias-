# CONTRAT 01 — Le Dragon de Valcroix

**Commanditaire :** Maison de Valcroix  
**Or initial proposé :** 1850 écus  
**Structure :** contrat scénarisé persistant

## Audience

Depuis trois semaines, un dragon descend des montagnes au coucher du soleil. Il n'attaque pas au hasard : granges, troupeaux et tours de guet sont brûlés, mais le château n'a jamais été touché. Le seigneur affirme que la créature doit être abattue avant les moissons.

Le commanditaire doit être joué comme un véritable PNJ : il peut être inquiet, arrogant, manipulateur ou pragmatique. Yohan peut poser des questions avant de parler du paiement.

## Prix du Paria

Les termes sont établis **avant tout départ et toute action contractuelle**.

Pour une maison humaine noble, le moteur recherche une **noble adulte réelle de la maison**, disponible dans l'état courant de la sauvegarde. Elle doit consentir explicitement à entrer dans les termes ancestraux. Si aucune candidate adulte consentante n'existe, cette partie du prix est indisponible.

Choix possibles : **Or / noble adulte consentante / Or + noble adulte consentante / négocier / refuser.**

Aucune grossesse ni relation amoureuse n'est automatique : après le contrat, les relations suivent le système normal du monde vivant.

## Chaîne de scènes

1. **Audience et vérification des pertes**
2. **Négociation du Prix du Paria**
3. **Enquête dans les villages brûlés**
4. **Ascension vers le nid**
5. **Découverte d'une raison cachée aux attaques**
6. **Combat contre créatures secondaires**
7. **Choix : poursuivre le dragon ou retourner confronter le commanditaire**
8. **Combat/BATAILLE possible contre le dragon**
9. **Retour et règlement du contrat**

## Conséquences cachées

Le contrat doit pouvoir modifier plusieurs éléments : relation avec Maison de Valcroix, état des PNJ, réputation, nouvelles du monde, accès à de futurs contrats et parfois situation militaire régionale. Un commanditaire ayant menti peut être confronté au retour. Un ennemi épargné peut revenir.

## Appels gameplay

- `START_COMBAT` lorsque la scène implique un petit affrontement.
- `START_BATTLE` lorsque des forces militaires sont réellement engagées.
- `UPDATE_RELATION`
- `UPDATE_SUSPICION`
- `SET_WORLD_FLAG`
- `SCHEDULE_FOLLOWUP`
