# Base d'automatisation des demandes de devis

La page `/devis/` envoie le formulaire Netlify `devis-intelligent`. Netlify reçoit la demande, déclenche les notifications déjà configurées, puis redirige vers `/merci/`. Aucun fichier n'est accepté par cette version du formulaire.

## Données structurées disponibles

- `lead_status` : `nouveau` à la création ;
- `lead_source` : `site-web` ou la valeur courte du paramètre `source` ;
- `form_version` : `smart-devis-v1` ;
- `landing_page` et `referrer`, enregistrés sans paramètres de requête ni fragment ;
- paramètres `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` ;
- trajet, date, logement, accès, inventaire, options et préférence de contact ;
- `estimation_min`, `estimation_max` et `estimation_volume_m3` ;
- `wizard_completed` : `oui` uniquement au moment de la soumission finale.

Les valeurs d'estimation restent indicatives. Elles ne doivent jamais être utilisées comme devis contractuel sans vérification humaine.

## Préremplissage depuis une campagne ou un outil interne

La page accepte les paramètres `depart`, `arrivee`, `date`, `volume`, `logement`, `distance`, `formule`, `service`, `source`, `cartons_total`, `cartons_petits`, `cartons_grands` et `cartons_livres` :

```text
/devis/?depart=Carcassonne&arrivee=Toulouse&date=2026-09-12&volume=18&service=demenagement-longue-distance&source=calculateur-volume&utm_source=google
```

Le calculateur d'emballage peut transmettre, par exemple, `cartons_total=36&cartons_petits=12&cartons_grands=18&cartons_livres=6`. Le wizard limite chaque valeur à un entier compris entre 0 et 500, la conserve dans le contexte Netlify et l'affiche dans le récapitulatif sans remplacer l'inventaire confirmé par le client.

Services reconnus : `demenagement-local`, `demenagement-longue-distance`, `demenagement-international`, `transport-meubles`, `transport-piano`.

Le contexte `service=trajet-groupe` est également reconnu. Dans ce cas, `volume_max` est conservé séparément dans `volume_offer_max` : il représente la capacité annoncée du trajet et ne préremplit jamais le volume réel du client.

## Mise en service Netlify

1. Déployer une prévisualisation puis vérifier dans **Forms** que `devis-intelligent` est détecté.
2. Envoyer une demande de test sans données personnelles réelles et contrôler chaque champ.
3. Configurer une notification propriétaire dans Netlify seulement après validation de l'adresse destinataire.
4. Vérifier les champs, la notification et la page `/merci/` sur mobile.
5. Supprimer la soumission de test.

Le fichier `public/__forms.html` contient la définition statique nécessaire à la détection lors du build.

Les pièces jointes sont volontairement désactivées. Des photos d'accès ou de mobilier peuvent révéler des données personnelles ; elles ne doivent être demandées qu'après le premier échange, via un canal dont l'accès, la conservation et la suppression ont été validés.

Dans Google Analytics, le wizard émet des événements `devis_*` et le layout émet un événement manuel `form_submit`. Si la mesure améliorée GA4 des interactions de formulaire est activée dans la propriété, vérifier qu'elle ne crée pas un second `form_submit` automatique ; désactiver cette interaction automatique ou renommer l'événement manuel avant d'exploiter les conversions.

## Webhook ou fonction : architecture recommandée pour la suite

Ne jamais placer une URL secrète, une clé CRM ou une clé email dans le JavaScript du navigateur. La future automatisation doit partir du serveur : notification Netlify sécurisée ou fonction déclenchée à la création d'une soumission.

Variables d'environnement proposées pour une future fonction, sans valeur dans le dépôt :

```text
LEADS_WEBHOOK_URL=
LEADS_WEBHOOK_SECRET=
LEADS_NOTIFICATION_TO=
LEADS_NOTIFICATION_FROM=
```

La fonction devra :

1. accepter uniquement l'événement de soumission attendu ;
2. refuser tout autre nom de formulaire ;
3. normaliser les textes et limiter leur longueur ;
4. transmettre uniquement les champs nécessaires ;
5. journaliser un identifiant de demande, jamais le contenu des champs libres ;
6. gérer les échecs sans perdre la soumission Netlify ;
7. ne transmettre aucune donnée à un tiers non validé et non documenté.

Le choix du CRM, du service email/SMS et les destinataires demandent une décision du propriétaire avant toute activation. Aucun fournisseur ni coût n'est supposé dans cette version.

## États conseillés dans le futur suivi commercial

`nouveau` → `a-qualifier` → `visite-planifiee` → `devis-envoye` → `accepte` ou `perdu` → `termine`.

Conserver séparément la source d'acquisition et le statut commercial. Ne pas écraser les UTM lors d'un changement de statut.

## Confidentialité et conservation

- limiter l'accès aux soumissions aux personnes qui traitent réellement les devis ;
- valider une protection d'accès et une durée de conservation avant toute future collecte de fichiers ;
- définir une durée de conservation opérationnelle, puis supprimer ou anonymiser les demandes sans suite ;
- ne demander aucun document d'identité, donnée bancaire ou contenu sensible via le formulaire ;
- ne pas envoyer de relance marketing sans consentement distinct ;
- documenter tout nouveau sous-traitant avant de lui transmettre des données.
