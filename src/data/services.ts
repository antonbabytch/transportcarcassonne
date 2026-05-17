export const SERVICES = [
  {
    slug: 'demenagement-local',
    name: 'Déménagement local',
    description: 'Carcassonne et environs (rayon 50 km)',
    priceFrom: 450,
    icon: '🏠',
  },
  {
    slug: 'demenagement-longue-distance',
    name: 'Déménagement longue distance',
    description: 'Carcassonne vers toute la France',
    priceFrom: 950,
    icon: '🚚',
  },
  {
    slug: 'demenagement-international',
    name: 'Déménagement international',
    description: "Espagne, Italie, Belgique au départ de Carcassonne",
    priceFrom: 2500,
    icon: '🌍',
  },
  {
    slug: 'transport-meubles',
    name: 'Transport de meubles',
    description: 'Un meuble, plusieurs objets, livraison',
    priceFrom: 80,
    icon: '🛋️',
  },
  {
    slug: 'transport-piano',
    name: 'Transport piano et objets lourds',
    description: "Pianos, coffres-forts, œuvres d'art",
    priceFrom: 350,
    icon: '🎹',
  },
  {
    slug: 'evacuation-dechets-metaux',
    name: 'Évacuation déchets et métaux',
    description: 'Transport de ferraille et déchets encombrants',
    priceFrom: 150,
    icon: '♻️',
  },
] as const;
