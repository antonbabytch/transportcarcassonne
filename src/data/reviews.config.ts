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
 * Note moyenne et nombre d'avis, recopiés depuis la fiche Google.
 * `count: 0` masque toute mention chiffrée sur le site.
 *
 * Relevés le 01/09/2026, après retrait des avis qui ne venaient pas de
 * clients. Le chiffre affiché ici doit toujours correspondre à ce qu'un
 * visiteur retrouve sur la fiche : le remettre à jour à chaque nouvel avis.
 */
export const GOOGLE_RATING = {
  average: 5,
  count: 3,
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

// Avis recopiés depuis la fiche Google, sans modification :
// ponctuation et espacement d'origine conservés.
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    quote:
      "Équipe au top et très ponctuelle . Grâce à eux la surprise pour l anniversaire d une amie a été très réussie . Très bonne communication . Merci à eux",
    author: 'Samia B.',
    rating: 5,
    month: '2026-06',
  },
  {
    quote: 'Super service ! Je recommande vivement',
    author: 'Ivan R.',
    rating: 5,
    month: '2026-05',
  },
  {
    quote:
      "Le déménagement s'est déroulé facilement et sans problème, les déménageurs ont fait un excellent travail et le prix était raisonnable.",
    author: 'Наталья Е.',
    rating: 5,
    month: '2026-09',
  },
];

export const hasGoogleReviews = GOOGLE_REVIEWS.length > 0;
