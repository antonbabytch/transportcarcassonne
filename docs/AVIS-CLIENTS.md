# Demander des avis clients sans filtrage

La page publique est `/avis/`. Elle est volontairement en `noindex` : elle sert après une prestation, pas à capter du trafic SEO.

## Configuration requise

1. Ouvrir le profil Google Business avec le compte administrateur.
2. Choisir l'action permettant de demander des avis et copier le lien officiel fourni par Google.
3. Coller ce lien dans `src/data/reviews.config.ts`, propriété `googleReviewUrl`.
4. Ouvrir `/avis/`, cliquer sur le bouton et vérifier sur mobile et ordinateur qu'il arrive sur la bonne fiche.
5. Une fois le lien testé, un QR code peut être généré à partir de cette URL exacte. Tester l'image imprimée avant de la joindre à un document client.

Ne pas construire le lien à partir du nom de l'entreprise et ne pas publier de QR code tant que la destination n'a pas été vérifiée.

## Afficher un nouvel avis sur le site

Les avis affichés sont recopiés à la main dans `src/data/reviews.config.ts`.
Il n'y a pas de récupération automatique : l'API Google Places impose une clé,
une facturation et des limites de mise en cache, et ne renvoie que quelques
avis. Une entrée ajoutée au fichier suffit.

1. Ouvrir la fiche Google et lire l'avis en entier, sans le tronquer.
2. Ajouter un objet dans `GOOGLE_REVIEWS` :

```ts
{
  quote: "Texte exact de l'avis, ponctuation d'origine comprise",
  author: 'Prénom I.',
  rating: 5,
  month: '2026-09',
}
```

3. `quote` : le texte tel qu'il est publié. Une coupe se signale par « […] ».
   Ne pas corriger l'orthographe ni la ponctuation du client.
4. `author` : prénom suivi de l'initiale du nom. Jamais le nom complet.
5. `month` : le mois affiché par Google, au format `YYYY-MM`. Google ne donne
   pas le jour, donc le site n'affiche que le mois et l'année.
6. `service` : facultatif, uniquement si la prestation ressort clairement de
   l'avis. Ne pas la deviner.
7. Lancer `npm run check` puis vérifier la page d'accueil.

### Note moyenne et nombre d'avis

`GOOGLE_RATING` reste à `0` tant que le total de la fiche compte des avis qui
ne viennent pas de clients. Un chiffre affiché sur le site doit correspondre à
ce qu'un visiteur retrouve sur Google.

Quand la fiche ne contient plus que des avis clients, renseigner `average` et
`count` avec les valeurs exactes de la fiche. La note apparaît alors dans le
bandeau de confiance et au-dessus des cartes.

### Ce que le site n'affichera jamais

Un avis rédigé par le propriétaire, un proche ou une personne qui gère la
fiche n'a pas sa place ici, même s'il est publié sur Google. C'est déjà la
règle de `LOCAL-SEO-OPERATIONS.md`, et un tel avis reste supprimable par
Google à tout moment.

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

