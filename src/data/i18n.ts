import { ADDITIONAL_SERVICES } from './additionalServices.ts';

const ROUTES = [
  ...ADDITIONAL_SERVICES.map(service => [`/${service.slug}/`, `/en/${service.englishSlug}/`] as const),
  ['/', '/en/'],
  ['/devis/', '/en/quote/'],
  ['/contact/', '/en/contact/'],
  ['/tarifs/', '/en/removal-prices-carcassonne/'],
  ['/a-propos/', '/en/about-transport-carcassonne/'],
  ['/nos-garanties/', '/en/why-choose-us/'],
  ['/realisations/', '/en/our-work/'],
  ['/monte-escalier-pianoplan-carcassonne/', '/en/pianoplan-stair-climber-carcassonne/'],
  ['/assurance-demenagement/', '/en/removal-insurance/'],
  ['/comment-ca-marche/', '/en/how-it-works/'],
  ['/formules/', '/en/removal-services-carcassonne/'],
  ['/petit-demenagement/', '/en/small-removals-carcassonne/'],
  ['/transport-urgent-carcassonne/', '/en/urgent-transport-carcassonne/'],
  ['/livraison-meubles-magasins-carcassonne/', '/en/furniture-delivery-carcassonne/'],
  ['/demenagement-entreprise-carcassonne/', '/en/office-removals-carcassonne/'],
  ['/demenagement-senior-carcassonne/', '/en/senior-removals-carcassonne/'],
  ['/emballage-cartons-carcassonne/', '/en/packing-service-carcassonne/'],
  ['/mission-logistique-longue-distance/', '/en/long-distance-logistics-assistance/'],
  ['/services/demenagement-local/', '/en/local-removals-carcassonne/'],
  ['/services/demenagement-longue-distance/', '/en/long-distance-removals-france/'],
  ['/services/demenagement-international/', '/en/international-removals-carcassonne/'],
  ['/services/transport-meubles/', '/en/furniture-transport-carcassonne/'],
  ['/services/transport-piano/', '/en/piano-moving-carcassonne/'],
  ['/services/evacuation-dechets-metaux/', '/en/bulky-item-removal-carcassonne/'],
  ['/demenagement-carcassonne/', '/en/removals-carcassonne/'],
  ['/demenagement-trebes/', '/en/removals-trebes/'],
  ['/demenagement-limoux/', '/en/removals-limoux/'],
  ['/demenagement-castelnaudary/', '/en/removals-castelnaudary/'],
  ['/demenagement-narbonne/', '/en/removals-narbonne/'],
  ['/demenagement-lezignan-corbieres/', '/en/removals-lezignan-corbieres/'],
  ['/demenagement-bram/', '/en/removals-bram/'],
  ['/demenagement-capendu/', '/en/removals-capendu/'],
  ['/demenagement-pezens/', '/en/removals-pezens/'],
  ['/demenagement-alzonne/', '/en/removals-alzonne/'],
  ['/blog/', '/en/blog/'],
] as const;

function normalise(pathname: string) {
  const clean = pathname.split(/[?#]/, 1)[0].replace(/^\/+|\/+$/g, '');
  return clean ? `/${clean}/` : '/';
}

const frenchToEnglish = new Map<string, string>(ROUTES.map(([fr, en]) => [fr, en]));
const englishToFrench = new Map<string, string>(ROUTES.map(([fr, en]) => [en, fr]));
export function getLanguageAlternates(pathname: string) {
  const path = normalise(pathname);
  if (path.startsWith('/en/')) {
    const french = englishToFrench.get(path);
    return french ? { french, english: path } : null;
  }

  const english = frenchToEnglish.get(path);
  return english ? { french: path, english } : null;
}

export function getLanguageSwitchPath(pathname: string) {
  const alternatives = getLanguageAlternates(pathname);
  if (!alternatives) return null;
  return normalise(pathname).startsWith('/en/') ? alternatives.french : alternatives.english;
}

export function localizeNavLink(href: string, french: string, english: string, lang: 'fr' | 'en') {
  const translated = lang === 'en' ? frenchToEnglish.get(normalise(href)) : undefined;
  return {
    href: translated ?? href,
    label: lang === 'fr' ? french : translated ? english : `${english} (FR)`,
    hreflang: lang === 'en' ? translated ? 'en-GB' : 'fr-FR' : undefined,
  };
}

export const EN_SERVICE_NAMES = {
  'demenagement-local': 'Local removals',
  'demenagement-longue-distance': 'Long-distance removals',
  'demenagement-international': 'International removals',
  'transport-meubles': 'Furniture transport',
  'transport-piano': 'Piano and heavy items',
  'evacuation-dechets-metaux': 'Bulky and metal item removal',
} as const;
