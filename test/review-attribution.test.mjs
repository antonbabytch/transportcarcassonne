import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('selected transport reviews remain separate from the partner testimonial', async () => {
  const config = await readFile(new URL('../src/data/reviews.config.ts', import.meta.url), 'utf8');
  const component = await readFile(new URL('../src/components/GoogleReviews.astro', import.meta.url), 'utf8');
  const transport = config.split('export const GOOGLE_REVIEWS: GoogleReview[] = [')[1].split('];')[0];
  assert.match(transport, /Faïzou D\./);
  assert.match(transport, /Maryse/);
  assert.doesNotMatch(transport, /Louis|Débarras|Samia|Ivan|Наталья/);
  assert.match(config, /author: 'Louis C\.'/);
  assert.match(config, /Un immense merci à Débarras Carcassonne !/);
  assert.match(transport, /recommande \[…\]/);
  assert.match(component, /Partner business/);
  assert.match(component, /Activité partenaire/);
  assert.match(component, /not included in the Transport Carcassonne Google rating/);
  assert.match(component, /Cet avis n’entre pas dans la note Google/);
  assert.match(component, /<details class="gr__full-review">/);
  assert.doesNotMatch(component, /<script[^>]*application\/ld\+json/);
});
