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

## État en production — 19/08/2026

Le workflow tourne et Telegram est vérifié.

| Élément | Valeur |
|---|---|
| URL de production | `https://hooks.massagebienetreolena.fr/webhook/transportcarcassonne-devis` |
| Bot Telegram | `transport_carcassonne_bot` |
| Conversation | `476774111` |
| Nœud e-mail | **désactivé** |

Netlify envoie trois notifications par demande : son webhook historique vers
Make, son e-mail intégré, et ce webhook. Les deux premiers n'ont pas été
touchés. Le doublon Telegram avec Make est temporaire et disparaîtra quand la
branche transport de Make sera coupée.

Le nœud e-mail reste désactivé tant que l'expéditeur n'est pas tranché :
l'e-mail actuel part de l'infrastructure Netlify, dont le gabarit n'est pas
modifiable, et aucune adresse détenue par l'entreprise ne l'envoie aujourd'hui.
Activer le nœud suppose de choisir entre un envoi SMTP depuis
`contact@transportcarcassonne.fr` et un envoi depuis un compte Gmail déjà
connecté à n8n, qui changerait l'expéditeur.

## Réinstaller depuis zéro

1. Dans n8n : **Workflows → … → Import from URL**, coller l'URL brute de ce
   fichier sur GitHub.
2. Nœud **Telegram** : choisir les identifiants
   `Telegram - transport_carcassonne_bot`. Le `chatId` est déjà renseigné.
3. Nœud **E-mail** : il arrive désactivé. Choisir les identifiants seulement
   au moment de l'activer.
4. Publier le workflow, puis copier l'**URL de production** du nœud webhook.
5. Dans Netlify : **Project configuration → Notifications → Form submission
   notifications → Add notification → HTTP POST request**, coller l'URL dans
   le champ **URL to notify**. Laisser le champ JWS vide.

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
