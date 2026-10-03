import googleRating from './google-rating.json';

/**
 * Source unique des avis Google affichés sur le site.
 *
 * Règle structurée impérative — voir `docs/AVIS-CLIENTS.md` :
 * ces avis ne doivent JAMAIS être ajoutés aux données structurées sous
 * forme de `Review` ou `AggregateRating`. Google n'accorde pas de rich
 * result à une entreprise qui balise ses propres avis ou ceux repris
 * d'une plateforme tierce. Les avis restent du contenu affiché, rien de plus.
 *
 * Règles éditoriales :
 * - ne recopier que des avis réellement publiés sur la fiche Google ;
 * - ne jamais réécrire un avis pour en modifier le sens ;
 * - une coupe est signalée par « […] », jamais par une reformulation ;
 * - prénom ou initiales uniquement, jamais le nom complet ;
 * - ne pas trier pour n'afficher que les meilleurs si d'autres existent.
 */

/**
 * Lien officiel « Demander des avis » copié depuis le profil Google Business
 * avec le compte administrateur. Ne jamais le deviner à partir du nom.
 */
export const REVIEWS = {
  googleReviewUrl: 'https://g.page/r/CfkVxczuGs8VEBM/review',
} as const;

export const hasGoogleReviewUrl = REVIEWS.googleReviewUrl.startsWith('https://');

/** Lien public vers la fiche Google, pour vérifier les avis à la source. */
export const GOOGLE_PROFILE_URL = 'https://g.page/r/CfkVxczuGs8VEBM';

export const hasGoogleProfileUrl = GOOGLE_PROFILE_URL.startsWith('https://');

/**
 * Note moyenne et nombre d'avis issus du dernier snapshot Google validé.
 * `count: 0` masque toute mention chiffrée sur le site.
 *
 * La fonction Netlify quotidienne met à jour ces chiffres dans le navigateur,
 * et chaque nouvelle compilation rafraîchit ce snapshot de secours.
 */
export const GOOGLE_RATING = {
  average: googleRating.ratingValue,
  count: googleRating.reviewCount,
  updatedAt: googleRating.lastUpdated,
} as const;

export const hasGoogleRating = GOOGLE_RATING.count > 0 && GOOGLE_RATING.average > 0;

export interface GoogleReview {
  /** Texte fidèle de l'avis publié. Coupes signalées par « […] ». */
  quote: string;
  /** Prénom ou initiales, selon ce qui est affiché publiquement sur Google. */
  author: string;
  /** Note laissée par le client, de 1 à 5. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Mois affiché par Google, au format `YYYY-MM`. Google ne donne pas le jour. */
  month: string;
  /** Prestation concernée, si elle ressort clairement de l'avis. */
  service?: string;
}

// Sélection fournie par le propriétaire le 3 octobre 2026 (captures Google).
// Le mois correspond à la visite affichée. La fin tronquée est signalée par […].
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    quote:
      'Transport Carcassonne, ils étaient excellents, polis et bien aimables vu comment ils nous ont aidé à mettre en place les meubles quand bien même qu’ils étaient pas obligés. Merci encore.\nJe vous les conseille à 100%',
    author: 'Faïzou D.',
    rating: 5,
    month: '2026-09',
  },
  {
    quote: "Super contente de l'intervention. Ils n'ont pas pu venir hier..mon prévenu. Sont venus aujourd'hui.à l'heure prévue intervention rapide..descente d'un sèchelinge à condensation du.1er étage et repris..je recommande […]",
    author: 'Maryse',
    rating: 5,
    month: '2026-09',
  },
];

// Avis de l'activité partenaire : jamais intégré à GOOGLE_REVIEWS ni à sa note.
// Attribution Débarras Carcassonne confirmée par le propriétaire.
export const PARTNER_REVIEW: GoogleReview & { continuation: string } = {
  author: 'Louis C.',
  rating: 5,
  month: '2026-09',
  quote: 'Un immense merci à Débarras Carcassonne !\nIntervention réalisée dans un appartement qui demandait énormément de travail, et le résultat est tout simplement impressionnant. Je ne reconnais plus les lieux.',
  continuation: 'Au-delà de la qualité du travail, j’ai surtout apprécié le professionnalisme, la disponibilité, la gentillesse et le sérieux du début à la fin. Communication parfaite, devis clair, travail efficace et soigné.\n\nOn sent vraiment quelqu’un qui prend son travail à cœur et qui cherche à rendre service à ses clients. C’est suffisamment rare pour être souligné.\n\nJe recommande sans aucune hésitation. Encore merci pour votre travail exceptionnel !',
};

export const hasGoogleReviews = GOOGLE_REVIEWS.length > 0;
