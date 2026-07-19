/**
 * Source unique des réalisations publiées.
 *
 * Règles éditoriales :
 * - ne jamais publier d'adresse précise ni de nom complet de client ;
 * - obtenir l'accord du client pour le texte ET pour chaque photo ;
 * - ne renseigner que des données vérifiables (volume, durée, équipe, services) ;
 * - passer `status` à `published` uniquement quand les deux consentements sont vrais.
 */

export type RealisationStatus = 'draft' | 'published';

export interface RealisationImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface RealisationReview {
  /** Extrait fidèle, jamais réécrit pour en modifier le sens. */
  quote: string;
  /** Prénom ou initiales uniquement, selon l'accord donné. */
  attribution: string;
  sourceLabel?: string;
  sourceUrl?: string;
}

export interface Realisation {
  slug: string;
  status: RealisationStatus;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  origin: string;
  destination: string;
  moveType: string;
  volumeM3?: number;
  durationLabel?: string;
  teamSize?: number;
  services: string[];
  constraints: string[];
  response: string[];
  images: RealisationImage[];
  review?: RealisationReview;
  /** Accord explicite pour publier le récit sans données personnelles. */
  clientPublicationConsent: boolean;
  /** Accord explicite pour toutes les images listées ci-dessus. */
  imagePublicationConsent: boolean;
  featured?: boolean;
}

// Aucun cas fictif : cette liste reste vide jusqu'à réception de preuves et des accords clients.
export const REALISATIONS: Realisation[] = [];

export const getPublishedRealisations = () =>
  REALISATIONS.filter(
    (item) =>
      item.status === 'published' &&
      item.clientPublicationConsent &&
      (item.images.length === 0 || item.imagePublicationConsent),
  );

