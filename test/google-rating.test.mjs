import assert from 'node:assert/strict';
import test from 'node:test';
import {
  GOOGLE_BUSINESS,
  parseGoogleRating,
  refreshStoredGoogleRating,
} from '../netlify/functions/_lib/google-rating.mjs';

const googleDocument = ({ rating = 5, count = 5 } = {}) => `
  [[${GOOGLE_BUSINESS.ftid}],"${GOOGLE_BUSINESS.mapsPath}"]]
  [["${GOOGLE_BUSINESS.placeId}","${GOOGLE_BUSINESS.name}",[43.1857042,2.546384],
  "${GOOGLE_BUSINESS.cid}"],"${GOOGLE_BUSINESS.name}",null,${rating},"${count} avis"]
`;

test('parses the rating only for the verified Transport Carcassonne profile', () => {
  assert.deepEqual(parseGoogleRating(googleDocument()), {
    ratingValue: 5,
    reviewCount: 5,
  });
  assert.deepEqual(parseGoogleRating(googleDocument({ rating: 4.9, count: 17 })), {
    ratingValue: 4.9,
    reviewCount: 17,
  });
  assert.throws(
    () => parseGoogleRating(googleDocument().replace(GOOGLE_BUSINESS.cid, '999')),
    /identifier not found/,
  );
});

test('stores a checked rating and reports whether the public value changed', async () => {
  const values = new Map();
  const store = {
    get: async (key) => values.get(key) || null,
    set: async (key, value) => values.set(key, value),
  };
  const fetchImpl = async () => ({
    ok: true,
    text: async () => googleDocument(),
  });
  const now = () => new Date('2026-09-15T05:30:00.000Z');

  const first = await refreshStoredGoogleRating({ store, fetchImpl, now });
  const second = await refreshStoredGoogleRating({ store, fetchImpl, now });

  assert.equal(first.status, 'updated');
  assert.equal(second.status, 'unchanged');
  assert.equal(JSON.parse(values.get('google-rating')).reviewCount, 5);
});
