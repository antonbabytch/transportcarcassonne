/**
 * Ajoutez ici le lien officiel « Demander des avis » du profil Google Business.
 * Il doit être copié depuis le profil administrateur, jamais deviné à partir du nom.
 */
export const REVIEWS = {
  googleReviewUrl: '',
} as const;

export const hasGoogleReviewUrl = REVIEWS.googleReviewUrl.startsWith('https://');

