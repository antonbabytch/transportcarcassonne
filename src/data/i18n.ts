import { ENGLISH_PAGES } from './englishPages';

const ROUTES = [
  ['/', '/en/'],
  ['/devis/', '/en/quote/'],
  ['/contact/', '/en/contact/'],
  ['/tarifs/', '/en/removal-prices-carcassonne/'],
  ['/a-propos/', '/en/about-transport-carcassonne/'],
  ['/nos-garanties/', '/en/why-choose-us/'],
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
  ['/blog/', '/en/moving-to-carcassonne/'],
] as const;

function normalise(pathname: string) {
  const clean = pathname.split('?')[0].split('#')[0];
  return clean === '/' ? '/' : `${clean.replace(/^\/+|\/+$/g, '')}/`.replace(/^/, '/');
}

const frenchToEnglish = new Map<string, string>(ROUTES.map(([fr, en]) => [fr, en]));
const englishToFrench = new Map<string, string>(ROUTES.map(([fr, en]) => [en, fr]));
const englishSwitchToFrench = new Map<string, string>([
  ...englishToFrench,
  ...ENGLISH_PAGES.map(page => [`/en/${page.slug}/`, page.frenchPath] as const),
]);

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
  const path = normalise(pathname);
  if (path.startsWith('/en/')) return englishSwitchToFrench.get(path) || '/';
  return frenchToEnglish.get(path) || '/en/';
}
