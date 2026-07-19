# Transport Carcassonne

Site Astro statique de déménagement et transport local autour de Carcassonne.
Le projet réunit les pages commerciales, les guides locaux, un devis intelligent,
des calculateurs et les contrôles SEO avant déploiement Netlify.

## Développement

Prérequis : Node.js 22.12 ou plus récent.

```bash
npm ci
npm run dev
```

Commandes utiles :

```bash
npm run check          # Astro + TypeScript
npm run build          # production statique dans dist/
npm run audit:seo      # build + liens, metadata, schema et pages orphelines
npm run report:leads -- --self-test
npm run report:leads -- chemin/vers/export-netlify.csv
```

## Parcours principal

- `/devis/` : devis intelligent en cinq étapes, estimation non contractuelle
  et attribution UTM/source ;
- `/formules/` : Essentielle, Confort et Clé en main ;
- `/nos-garanties/` : identité et transparence contractuelle ;
- `/realisations/` : cas clients vérifiés uniquement ;
- `/outils-demenagement/` : hub des calculateurs et outils ;
- `/blog/` : guides locaux et réglementaires.

Les CTA commerciaux doivent pointer vers `/devis/` et conserver un paramètre
`source` court. `/contact/` reste la page de coordonnées générales.

## Contenu piloté par les données

- `src/data/services.ts` : services généraux ;
- `src/data/cities.ts` : villes réellement desservies ;
- `src/data/highIntentPages.ts` : pages entreprise, senior et emballage ;
- `src/data/movingRoutes.ts` : routes longue distance documentées ;
- `src/data/groupedTrips.ts` : places réellement disponibles ;
- `src/data/realisations.ts` : cas publiables avec consentements ;
- `src/content/blog/` : articles Markdown validés par le schema Astro.

Ne pas créer de ville, trajet, avis, disponibilité ou réalisation fictive.

## Formulaires et données

Netlify détecte les formes statiques dans `public/__forms.html` :

- `devis-transport` : formulaire court historique ;
- `devis-intelligent` : formulaire complet, 62 champs métier synchronisés.

Le formulaire intelligent n'accepte pas de fichier : les photos d'accès ou de
mobilier doivent être demandées ultérieurement par un canal adapté. Les
intégrations CRM, email, SMS ou paiement nécessitent des secrets côté serveur et
ne doivent jamais être ajoutées au JavaScript public.

Voir `LEAD-AUTOMATION.md`, `LEAD-REPORT.md` et `CLIENT-PORTAL.md`.

## Déploiement

Le site cible `https://transportcarcassonne.fr`. Avant publication :

1. exécuter `npm run check` puis `npm run audit:seo` ;
2. tester les deux Netlify Forms sur un deploy preview ;
3. vérifier les champs, les notifications et `/merci/` ;
4. confirmer les prix, services, assurances, statut réglementé et mentions
   légales avec le propriétaire ;
5. lancer Lighthouse mobile sur l’URL publique ;
6. envoyer `sitemap-index.xml` dans Google Search Console.

La checklist complète se trouve dans `LAUNCH-CHECKLIST.md`. Une action GitHub
hebdomadaire vérifie aussi la compilation et l’audit SEO.
