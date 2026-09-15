import { getStore } from '@netlify/blobs';
import {
  GOOGLE_RATING_STORE,
  refreshStoredGoogleRating,
} from './_lib/google-rating.mjs';

/**
 * Refreshes the cached public Google rating every morning. The visible site
 * reads this cache at runtime, so a new review appears without a manual deploy.
 */
export default async () => {
  try {
    const result = await refreshStoredGoogleRating({
      store: getStore({ name: GOOGLE_RATING_STORE, consistency: 'strong' }),
    });
    console.log('[refresh-google-rating]', JSON.stringify(result));
    return Response.json(result, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[refresh-google-rating] ERROR:', error.message);
    return Response.json(
      { status: 'error', error: 'rating_refresh_failed' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
};

export const config = {
  schedule: '30 5 * * *',
};
