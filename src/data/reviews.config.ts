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
  googleReviewUrl: '',
} as const;

export const hasGoogleReviewUrl = REVIEWS.googleReviewUrl.startsWith('https://');

/** Lien public vers la fiche Google, pour vérifier les avis à la source. */
export const GOOGLE_PROFILE_URL = '';

export const hasGoogleProfileUrl = GOOGLE_PROFILE_URL.startsWith('https://');

/**
 * Note moyenne et nombre d'avis, recopiés depuis la fiche Google.
 * `count: 0` masque toute mention chiffrée sur le site.
 */
export const GOOGLE_RATING = {
  average: 0,
  count: 0,
} as const;

export const hasGoogleRating = GOOGLE_RATING.count > 0 && GOOGLE_RATING.average > 0;

export interface GoogleReview {
  /** Texte fidèle de l'avis publié. Coupes signalées par « […] ». */
  quote: string;
  /** Prénom ou initiales, selon ce qui est affiché publiquement sur Google. */
  author: string;
  /** Note laissée par le client, de 1 à 5. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Date de publication au format ISO (YYYY-MM-DD). */
  date: string;
  /** Prestation concernée, si elle ressort clairement de l'avis. */
  service?: string;
}

// À remplir uniquement avec des avis réellement publiés sur la fiche Google.
// Tant que la liste est vide, aucune section d'avis n'apparaît sur le site.
export const GOOGLE_REVIEWS: GoogleReview[] = [];

export const hasGoogleReviews = GOOGLE_REVIEWS.length > 0;
