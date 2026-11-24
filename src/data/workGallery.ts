// Photos supplied by the business for its portfolio. Public files are optimised
// copies; source photos and unredacted vehicle plates are not published.
export type WorkCategory = 'loading' | 'storage' | 'street';
export const WORK_PHOTOS: { id: string; category: WorkCategory; fr: string; en: string }[] = [
  { id: 'camion-hayon', category: 'loading', fr: 'Mobilier chargé dans un camion avec hayon', en: 'Furniture loaded in a truck with a tail lift' },
  { id: 'manutention-meubles', category: 'loading', fr: 'Manutention de meubles à bord du fourgon', en: 'Handling furniture inside the van' },
  { id: 'intervention-ville', category: 'street', fr: 'Fourgon chargé lors d’une intervention en soirée', en: 'Loaded van during an evening job' },
  { id: 'camion-transport', category: 'loading', fr: 'Camion de transport devant les box', en: 'Removal truck outside the storage units' },
  { id: 'acces-box', category: 'storage', fr: 'Mobilier dans l’allée d’accès aux box', en: 'Furniture in the access corridor to the storage units' },
  { id: 'mobilier-box', category: 'storage', fr: 'Meubles et cartons disposés dans un box', en: 'Furniture and boxes arranged in a storage unit' },
  { id: 'transport-vers-box', category: 'storage', fr: 'Mobilier et effets personnels à destination d’un box', en: 'Furniture and belongings delivered to a storage unit' },
];

export const workImage = (id: string, thumbnail = false) => `/images/realisations/${id}${thumbnail ? '-540' : ''}.webp`;
