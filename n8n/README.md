# Notifications de demandes de devis — n8n

Ce dossier versionne le workflow n8n qui met en forme les demandes du
formulaire `devis-intelligent`. Le fichier est la source de vérité : toute
modification faite dans l'interface n8n doit être réexportée ici.

## Pourquoi ce workflow existe

Netlify envoie deux notifications par défaut :

- un **webhook sortant**, qui transmet les 60 champs bruts ;
- un **e-mail intégré**, dont le gabarit n'est pas modifiable et qui liste
  tous les champs, vides compris.

Le webhook contient donc déjà tout ; c'est la mise en forme qui manquait.
Ce workflow la fournit pour Telegram et pour l'e-mail.

## Installation

1. Dans n8n : **Workflows → … → Import from File**, choisir
   `transportcarcassonne-devis.json`.
2. Nœud **Telegram** : sélectionner les identifiants du bot, puis remplacer
   `REMPLACER_PAR_CHAT_ID` par l'identifiant réel de la conversation.
3. Nœud **E-mail** : sélectionner les identifiants Gmail. Le destinataire est
   `contact@transportcarcassonne.fr`.
4. Activer le workflow, puis copier l'**URL de production** du nœud webhook.
   Elle a la forme `https://hooks.<domaine>/webhook/transportcarcassonne-devis`.
5. Dans Netlify : **Project configuration → Notifications → Form submission
   notifications**, ajouter un webhook sortant vers cette URL.
6. Envoyer une demande de test depuis `/devis/`, vérifier Telegram et l'e-mail,
   puis supprimer la soumission de test.
7. Une fois le résultat validé, désactiver la notification e-mail intégrée de
   Netlify — sinon deux e-mails partent pour chaque demande.

## Ce que fait la mise en forme

Le nœud **Mettre en forme** ne garde que les champs renseignés et traduit les
valeurs codées du wizard : `oui-petit` devient « petit ascenseur »,
`plus-30m` devient « > 30 m », `2` devient « 2e étage ».

Le message Telegram place en tête ce qui sert à rappeler le client — nom,
téléphone, moyen et créneau de contact — puis le trajet, les accès au départ
et à l'arrivée, le volume, les services et l'estimation.

Un étage sans ascenseur est signalé par `⚠️`, comme les objets fragiles,
lourds, très grands et les pianos : ce sont les points qui changent le prix
et le nombre de personnes nécessaires.

L'e-mail reprend les mêmes données dans un tableau sectionné, avec le
téléphone cliquable.

## Règles à ne pas contourner

L'estimation affichée reste indicative et ne vaut jamais devis : c'est écrit
dans le message et dans l'e-mail. Voir `LEAD-AUTOMATION.md`.

Le workflow refuse tout formulaire dont le nom n'est ni `devis-intelligent`
ni `devis-transport`.

Les nœuds Telegram et E-mail sont réglés sur `continueRegularOutput` : si l'un
échoue, l'autre part quand même et la soumission reste stockée dans Netlify.

Aucun secret n'est présent dans ce fichier. Le token du bot et les
identifiants Gmail vivent dans les identifiants n8n, jamais dans le dépôt.
