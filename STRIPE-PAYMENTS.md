# Paiements Stripe — Transport Carcassonne

Cette intégration complète Tiime Smart sans créer une seconde facturation. Tiime reste la source des devis et factures ; Stripe collecte le paiement par un lien personnel.

## Parcours client

1. Le devis est contrôlé et accepté.
2. Une facture d'acompte est créée dans Tiime.
3. Un lien Stripe à usage unique est créé pour le montant exact.
4. Le lien est envoyé au client par le canal convenu.
5. Stripe redirige vers `https://transportcarcassonne.fr/paiement-confirme/?session_id={CHECKOUT_SESSION_ID}`.
6. Le webhook enregistre le statut `acompte-recu` et déclenche les emails configurés.
7. Le rappel de solde est envoyé avant la date de prestation si cette date est disponible.
8. La demande d'avis peut être activée après un test complet.

La confirmation Stripe ne remplace jamais la facture Tiime.

## Créer un lien d'acompte dans Stripe

Pour chaque devis :

- créer un paiement ponctuel avec le libellé `Acompte — devis n° XXXX` ;
- utiliser le montant TTC exact de la facture d'acompte ;
- collecter le nom et l'email du client ;
- ajouter le champ personnalisé `Numéro du devis` ;
- ajouter le champ personnalisé `Date de prestation (JJ/MM/AAAA)` pour permettre les rappels ;
- limiter le lien à une seule transaction réussie ;
- dans « Après le paiement », rediriger vers `https://transportcarcassonne.fr/paiement-confirme/?session_id={CHECKOUT_SESSION_ID}` ; Stripe remplace automatiquement le texte entre accolades par l’identifiant de la session.

Pour un paiement du solde créé via l'API, utiliser la métadonnée `payment_kind=solde`. Par défaut, un paiement est classé comme acompte.

Ne jamais utiliser une estimation du calculateur comme montant contractuel. Le montant vient du devis et de la facture contrôlés.

## Configurer le webhook Stripe

Créer un endpoint Stripe vers :

```text
https://transportcarcassonne.fr/api/stripe/webhook
```

Événements requis :

```text
checkout.session.completed
checkout.session.async_payment_succeeded
checkout.session.async_payment_failed
charge.refunded
```

Copier le secret `whsec_...` dans la variable Netlify `STRIPE_WEBHOOK_SECRET`. Ne jamais placer ce secret dans Git, `.env.example`, une capture ou un message.

Le serveur :

- vérifie la signature et l'ancienneté de l'événement ;
- refuse les corps trop volumineux ;
- ignore les événements déjà traités ;
- conserve uniquement les données nécessaires dans Netlify Blobs ;
- n'enregistre aucune donnée de carte bancaire.

## Configurer les emails Hostinger

Ajouter dans Netlify les variables listées dans `.env.example`. `SMTP_PASS` doit être le mot de passe d'application ou SMTP de la boîte d'envoi, ajouté directement dans Netlify.

Les emails prévus sont :

- notification propriétaire après paiement ;
- confirmation client après paiement ;
- rappel du solde avant la prestation ;
- demande d'avis après la prestation.

Le cron `payment-reminders` s'exécute à 07:00 UTC. Les confirmations manquées à cause d'une configuration SMTP incomplète sont retentées par le cron.

## Activer la demande d'avis

1. Copier le lien officiel « Demander des avis » depuis Google Business Profile.
2. Le placer dans `GOOGLE_REVIEW_URL` sur Netlify.
3. Tester l'email avec une adresse interne.
4. Passer `AUTO_REVIEW_REQUESTS=true` uniquement après validation.

Sans lien Google configuré, le message renvoie vers `/avis/`, qui permet encore de transmettre un retour par email.

L'invitation est identique pour tous les clients et ne demande aucune note déterminée. Aucune récompense ni remise ne doit être proposée.

## Tests avant mise en production

- effectuer tout le parcours en mode test Stripe ;
- vérifier le statut enregistré et les deux premiers emails ;
- utiliser une date de prestation proche pour contrôler le rappel ;
- vérifier que les événements Stripe répétés ne renvoient pas deux emails ;
- simuler un remboursement et confirmer l'arrêt des rappels ;
- seulement ensuite créer l'endpoint en mode production.

