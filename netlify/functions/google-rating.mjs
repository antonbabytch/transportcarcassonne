import { getStore } from '@netlify/blobs';
import {
  GOOGLE_RATING_STORE,
  loadStoredGoogleRating,
  refreshStoredGoogleRating,
} from './_lib/google-rating.mjs';

function publicValue(value) {
  return {
    ratingValue: value.ratingValue,
    reviewCount: value.reviewCount,
    updatedAt: value.updatedAt || null,
  };
}

export default async (request) => {
  if (request.method !== 'GET') {
    return Response.json(
      { error: 'method_not_allowed' },
      { status: 405, headers: { Allow: 'GET', 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const store = getStore({ name: GOOGLE_RATING_STORE, consistency: 'strong' });
    let rating = await loadStoredGoogleRating(store);
    if (!rating) rating = await refreshStoredGoogleRating({ store });

    return Response.json(publicValue(rating), {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('[google-rating] ERROR:', error.message);
    return Response.json(
      { error: 'rating_unavailable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
};

export const config = {
  path: '/api/google-rating',
};
