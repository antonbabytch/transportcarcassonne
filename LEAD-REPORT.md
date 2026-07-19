# Rapport agrégé des leads Netlify

`scripts/lead-report.mjs` transforme un export CSV du formulaire Netlify en rapport Markdown agrégé. Il n'utilise aucune dépendance externe et n'effectue aucune requête réseau.

## Utilisation

Depuis la racine du projet :

```powershell
node scripts/lead-report.mjs "C:\chemin\vers\devis-intelligent.csv"
```

Le rapport est imprimé dans le terminal. Pour l'enregistrer :

```powershell
node scripts/lead-report.mjs "C:\chemin\vers\devis-intelligent.csv" --output "C:\chemin\vers\rapport-leads.md"
```

Vérifier le parseur avec le jeu de données synthétique intégré :

```powershell
node scripts/lead-report.mjs --self-test
```

Le script accepte les champs CSV entourés de guillemets, les virgules, les guillemets doublés et les retours ligne à l'intérieur d'une cellule.

## Contenu du rapport

- nombre total de leads ;
- complétion du wizard ;
- sources et dimensions UTM ;
- types de trajet, formules, options et contextes détectés ;
- moyennes, médianes et tranches des estimations indicatives ;
- nombre de leads par date de soumission ;
- nombre de demandes sans nom, téléphone ou consentement requis.

Les en-têtes habituels de Netlify et les noms du formulaire `devis-intelligent` sont détectés de manière souple. La date souhaitée du déménagement n'est jamais confondue avec la date de création du lead.

## Sécurité et confidentialité

Le rapport ne restitue jamais les valeurs des champs suivants :

- nom, téléphone ou email ;
- villes, codes postaux ou adresses ;
- messages et inventaires libres ;
- photos, liens de fichiers ou identifiants de soumission.

Seuls des nombres et des dimensions d'acquisition ou de service sont affichés. Une valeur source/UTM ressemblant à un email, un numéro de téléphone, une URL ou un texte anormalement long est remplacée par `[valeur masquée]`.

Précautions recommandées :

1. Exporter uniquement le formulaire et la période nécessaires.
2. Conserver le CSV brut dans un emplacement local protégé.
3. Ne jamais joindre le CSV brut à un email ou à une issue GitHub.
4. Supprimer l'export lorsqu'il n'est plus nécessaire.
5. Relire le rapport Markdown avant de le partager.

Le rapport ne déduplique pas les soumissions et ne calcule pas de chiffre d'affaires. Les fourchettes restent des estimations non contractuelles.
