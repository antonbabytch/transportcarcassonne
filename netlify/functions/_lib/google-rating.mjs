/**
 * Public Google rating reader for the one verified Transport Carcassonne profile.
 *
 * Google does not expose this value as a stable unauthenticated API. The public
 * Maps embed is therefore parsed defensively and only accepted when the exact
 * business identifiers are present. No customer names or review texts are read.
 */
export const GOOGLE_BUSINESS = Object.freeze({
  name: 'Transport Carcassonne',
  cid: '1571504407915599353',
  mapsPath: '/g/11z670d857',
  ftid: '"1346063675432110829","1571504407915599353"',
  placeId: '0x12ae2dc7f3300aed:0x15cf1aeeccc515f9',
});

export const GOOGLE_RATING_SOURCE_URL =
  'https://www.google.com/maps?q=Transport%20Carcassonne&cid=1571504407915599353&hl=fr&output=embed';

export const GOOGLE_RATING_STORE = 'site-data';
export const GOOGLE_RATING_KEY = 'google-rating';

export function assertGoogleRating(value) {
  if (!value || !Number.isFinite(value.ratingValue)) {
    throw new Error('Google rating is missing or invalid');
  }
  if (value.ratingValue < 1 || value.ratingValue > 5) {
    throw new Error(`Google rating outside accepted range: ${value.ratingValue}`);
  }
  if (!Number.isInteger(value.reviewCount) || value.reviewCount < 1 || value.reviewCount > 10_000) {
    throw new Error(`Google review count outside accepted range: ${value.reviewCount}`);
  }
}

export function parseGoogleRating(html) {
  if (typeof html !== 'string' || !html.includes(GOOGLE_BUSINESS.ftid)) {
    throw new Error('Expected Transport Carcassonne Google identifier not found');
  }
  if (!html.includes(GOOGLE_BUSINESS.placeId) || !html.includes(GOOGLE_BUSINESS.name)) {
    throw new Error('Expected Transport Carcassonne Google entity not found');
  }

  const escapedName = GOOGLE_BUSINESS.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = html.match(
    new RegExp(`"${escapedName}",null,(\\d(?:[.,]\\d+)?)\\s*,\\s*"(\\d+)\\s+avis"`),
  );
  if (!match) throw new Error('Google rating/review pattern not found');

  const value = {
    ratingValue: Math.round(Number.parseFloat(match[1].replace(',', '.')) * 10) / 10,
    reviewCount: Number.parseInt(match[2], 10),
  };
  assertGoogleRating(value);
  return value;
}

export async function fetchGoogleRating(fetchImpl = globalThis.fetch) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetchImpl(GOOGLE_RATING_SOURCE_URL, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; TransportCarcassonneRatingBot/1.0; +https://transportcarcassonne.fr/)',
        'Accept-Language': 'fr-FR,fr;q=0.9',
      },
    });
    if (!response.ok) throw new Error(`Google Maps HTTP ${response.status}`);
    return parseGoogleRating(await response.text());
  } finally {
    clearTimeout(timeout);
  }
}

export async function loadStoredGoogleRating(store) {
  const raw = await store.get(GOOGLE_RATING_KEY);
  if (!raw) return null;

  const value = JSON.parse(raw);
  assertGoogleRating(value);
  return value;
}

export async function refreshStoredGoogleRating({
  store,
  fetchImpl = globalThis.fetch,
  now = () => new Date(),
}) {
  const fetched = await fetchGoogleRating(fetchImpl);
  const previous = await loadStoredGoogleRating(store);

  if (previous && Math.abs(fetched.reviewCount - previous.reviewCount) > 50) {
    throw new Error(
      `Suspicious Google review-count change: ${previous.reviewCount} -> ${fetched.reviewCount}`,
    );
  }

  const checkedAt = now().toISOString();
  const changed =
    !previous ||
    previous.ratingValue !== fetched.ratingValue ||
    previous.reviewCount !== fetched.reviewCount;
  const record = {
    ...fetched,
    source: 'Google Business Profile',
    updatedAt: changed ? checkedAt : previous.updatedAt,
    checkedAt,
  };

  await store.set(GOOGLE_RATING_KEY, JSON.stringify(record));
  return { status: changed ? 'updated' : 'unchanged', previous, ...record };
}
