interface ArticleSummary {
  title: string;
  description: string;
  category: string;
}

// Card translations only; the linked articles are in French.
export const BLOG_EN: Record<string, ArticleSummary> = {
  'autorisation-stationnement-demenagement-carcassonne': {
    title: 'Parking permits in Carcassonne: how and when to apply',
    description: 'Where to apply, how much time to allow and which rules apply in the Bastide and the Cité.',
    category: 'Carcassonne',
  },
  'calcul-volume-demenagement-m3': {
    title: 'How to work out your moving volume in m³',
    description: 'Estimate your load room by room, with formulas, box counts and checks that go beyond floor area.',
    category: 'Volume',
  },
  'checklist-demenagement-4-semaines': {
    title: 'Your four-week moving checklist',
    description: 'A week-by-week plan for boxes, access, paperwork and your inventory so nothing gets missed.',
    category: 'Checklist',
  },
  'demenagement-ete-haute-saison': {
    title: 'Moving in summer: preparing for the busy season',
    description: 'A practical plan for dates, quotes, volume, boxes, parking and hot weather.',
    category: 'Summer',
  },
  'demenagement-sans-ascenseur-portage': {
    title: 'Moving without a lift: stairs and carrying distances',
    description: 'How to measure carrying distances, assess stair access and send the details needed for an accurate quote.',
    category: 'Access',
  },
  'emballer-objets-fragiles-vaisselle-tableaux': {
    title: 'How to pack crockery, glassware, pictures and fragile items',
    description: 'A practical guide to materials, cushioning, boxes, labelling and inventory for fragile goods.',
    category: 'Packing',
  },
  'pianoplan-monte-escalier-carcassonne': {
    title: 'A Pianoplan joins our equipment in Carcassonne',
    description: 'Our Pianoplan 600J Speedy Vertical stair climber is available for pianos and heavy items, subject to access assessment.',
    category: 'Equipment',
  },
  'prix-demenagement-carcassonne-scenarios': {
    title: 'Moving prices in Carcassonne: four examples explained',
    description: 'Four scenarios illustrating guide prices and the factors that determine your actual moving quote.',
    category: 'Prices',
  },
  'verifier-demenageur-legal-documents': {
    title: 'How to check a removal company and its paperwork',
    description: 'What to check before moving: official registers, the quote, insurance, declared value and transport documents.',
    category: 'Regulations',
  },
};
