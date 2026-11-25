// Photos supplied by the business for its portfolio. Public files are optimised
// copies; source photos and unredacted vehicle plates are not published.
export type WorkCategory = 'loading' | 'storage' | 'street' | 'handling';
export const WORK_PHOTOS: { id: string; category: WorkCategory; fr: string; en: string; width?: number; height?: number }[] = [
  { id: 'camion-hayon', category: 'loading', fr: 'Mobilier chargé dans un camion avec hayon', en: 'Furniture loaded in a truck with a tail lift' },
  { id: 'manutention-meubles', category: 'loading', fr: 'Manutention de meubles à bord du fourgon', en: 'Handling furniture inside the van' },
  { id: 'intervention-ville', category: 'street', fr: 'Fourgon chargé lors d’une intervention en soirée', en: 'Loaded van during an evening job' },
  { id: 'camion-transport', category: 'loading', fr: 'Camion de transport devant les box', en: 'Removal truck outside the storage units' },
  { id: 'acces-box', category: 'storage', fr: 'Mobilier dans l’allée d’accès aux box', en: 'Furniture in the access corridor to the storage units' },
  { id: 'mobilier-box', category: 'storage', fr: 'Meubles et cartons disposés dans un box', en: 'Furniture and boxes arranged in a storage unit' },
  { id: 'transport-vers-box', category: 'storage', fr: 'Mobilier et effets personnels à destination d’un box', en: 'Furniture and belongings delivered to a storage unit' },
  { id: 'demenagement-carcassonne-chargement-cartons', category: 'loading', fr: 'Chargement des cartons de déménagement dans le fourgon', en: 'Loading moving boxes into the van' },
  { id: 'demenagement-carcassonne-manutention-cartons', category: 'handling', fr: 'Manutention des cartons entre l’entrée du logement et le véhicule', en: 'Carrying boxes between the building entrance and the vehicle' },
  { id: 'transport-carcassonne-cartons-escalier', category: 'loading', fr: 'Cartons regroupés près de l’escalier pour le chargement', en: 'Boxes gathered beside the steps for loading' },
  { id: 'transport-carcassonne-intervention-soiree', category: 'street', fr: 'Chargement de mobilier dans une rue commerçante en soirée', en: 'Loading furniture on a shopping street in the evening' },
  { id: 'transport-carcassonne-manutention-palette', category: 'handling', fr: 'Déplacement d’une palette filmée au transpalette', en: 'Moving a stretch-wrapped pallet with a pallet truck' },
  { id: 'transport-carcassonne-mobilier-camion', category: 'loading', fr: 'Mobilier, cartons et matériel de manutention à bord du camion', en: 'Furniture, boxes and handling equipment inside the truck', width: 941, height: 1672 },
];

export const workImage = (id: string, thumbnail = false) => `/images/realisations/${id}${thumbnail ? '-540' : ''}.webp`;
