# Demander des avis clients sans filtrage

La page publique est `/avis/`. Elle est volontairement en `noindex` : elle sert après une prestation, pas à capter du trafic SEO.

## Configuration requise

1. Ouvrir le profil Google Business avec le compte administrateur.
2. Choisir l'action permettant de demander des avis et copier le lien officiel fourni par Google.
3. Coller ce lien dans `src/data/reviews.config.ts`, propriété `googleReviewUrl`.
4. Ouvrir `/avis/`, cliquer sur le bouton et vérifier sur mobile et ordinateur qu'il arrive sur la bonne fiche.
5. Une fois le lien testé, un QR code peut être généré à partir de cette URL exacte. Tester l'image imprimée avant de la joindre à un document client.

Ne pas construire le lien à partir du nom de l'entreprise et ne pas publier de QR code tant que la destination n'a pas été vérifiée.

## Déclenchement recommandé

- Envoyer l'invitation uniquement quand la prestation est terminée.
- Utiliser la même règle pour tous les clients, sans questionnaire préalable de satisfaction.
- Envoyer au maximum un rappel, trois à cinq jours après le premier message.
- Arrêter immédiatement les relances si le client demande à ne plus être contacté.
- Ne proposer ni remise, ni cadeau, ni contrepartie.

## Modèle SMS

> Bonjour [Prénom], merci de nous avoir confié votre [déménagement / transport] du [date]. Si vous le souhaitez, vous pouvez partager librement votre expérience, positive comme critique : https://transportcarcassonne.fr/avis/ — Transport Carcassonne

## Modèle de rappel unique

> Bonjour [Prénom], petit rappel sans obligation : votre retour sur notre prestation nous aide à progresser et peut aider d'autres clients. Vous pouvez le partager ici : https://transportcarcassonne.fr/avis/ Merci, Transport Carcassonne

## Modèle email

**Objet : Votre retour sur notre prestation**

Bonjour [Prénom],

Merci de nous avoir confié votre projet du [date]. Si vous souhaitez raconter votre expérience, tous les retours honnêtes sont bienvenus, sans contrepartie et sans note attendue.

Partager votre avis : https://transportcarcassonne.fr/avis/

Si un point nécessite une réponse directe, vous pouvez également nous écrire à contact@transportcarcassonne.fr. Ce contact ne conditionne pas la publication de votre avis.

Transport Carcassonne

## À ne pas faire

- demander « Êtes-vous satisfait ? » puis n'envoyer le lien Google qu'aux réponses positives ;
- demander explicitement cinq étoiles ;
- offrir une remise en échange d'un avis ;
- rédiger l'avis à la place du client ;
- reprendre un avis privé sur le site sans accord de publication ;
- ajouter `Review` ou `AggregateRating` dans les données structurées du site à partir d'avis contrôlés par l'entreprise.

