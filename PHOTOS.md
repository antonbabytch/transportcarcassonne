# Photos à ajouter

Liste des photos à préparer pour remplacer les placeholders.

## Priorité haute

| Fichier | Ratio | Description | Utilisé sur |
|---------|-------|-------------|-------------|
| `public/images/equipe-hero.jpg` | 4/3 | Équipe devant le fourgon, extérieur | Accueil (hero), À propos |
| `public/images/demenagement-action.jpg` | 4/3 | Chargement/portage de meubles en action | Accueil, Services local, Transport meubles |
| `public/images/fourgon-20m3.jpg` | 16/9 | Fourgon 20 m³, vue extérieure ou intérieure | À propos (flotte), Service longue distance |

## Priorité moyenne

| Fichier | Ratio | Description | Utilisé sur |
|---------|-------|-------------|-------------|
| `public/images/fourgon-12m3.jpg` | 16/9 | Fourgon 12 m³ | À propos (flotte), Service international |
| `public/images/emballage-action.jpg` | 4/3 | Emballage professionnel de cartons | Service emballage |
| `public/images/piano-transport.jpg` | 4/3 | Transport d'un piano avec matériel spécialisé | Service piano |

## Priorité basse

| Fichier | Ratio | Description | Utilisé sur |
|---------|-------|-------------|-------------|
| `public/images/entrepot-meuble.jpg` | 16/9 | Intérieur garde-meuble / entrepôt | Tarifs, À propos |

## OG Image

| Fichier | Taille | Description |
|---------|--------|-------------|
| `public/images/og-default.jpg` | 1200×630 | Image par défaut pour partage réseaux sociaux |

## Comment remplacer un placeholder

Dans le composant qui affiche le placeholder, passer la prop `photo` :

```astro
<PhotoPlaceholder
  aspectRatio="4/3"
  label="Équipe TransDéménage"
  photo="/images/equipe-hero.jpg"
  alt="L'équipe TransDéménage Carcassonne devant son fourgon"
/>
```

Ou directement utiliser une balise `<img>` si le composant n'est pas utilisé.
