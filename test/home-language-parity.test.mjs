import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { HOME_EN } from '../src/data/homeEnglish.ts';
import { SERVICES } from '../src/data/services.ts';
import { getLanguageAlternates } from '../src/data/i18n.ts';

const source = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('both home URLs use the same localized hero, layouts and quote form', async () => {
  for (const [path, element] of [['src/pages/index.astro', /<HomePage \/>/], ['src/pages/en/index.astro', /<HomePage lang="en" \/>/]]) {
    const html = await source(path);
    assert.match(html, /import HomePage from/);
    assert.match(html, element);
  }
  const home = await source('src/components/HomePage.astro');
  for (const component of ['DeliveryHero', 'UrgentTransportSpotlight', 'GoogleReviews', 'AdditionalServices', 'ComboOffer', 'QuoteForm']) {
    assert.match(home, new RegExp(`<${component} lang=\\{lang\\}`));
  }
  const hero = await source('src/components/DeliveryHero.astro');
  assert.match(hero, /id="dvan"/);
  assert.match(hero, /delivery-mobile\.mp4.*delivery\.mp4/);
  assert.match(hero, /prefers-reduced-motion: reduce/);
});

test('every French service card and home specialty has an English destination', () => {
  assert.deepEqual(Object.keys(HOME_EN.services), SERVICES.map(service => service.slug));
  for (const href of [...SERVICES.map(service => `/services/${service.slug}/`), ...HOME_EN.specialties.map(service => service.href)]) {
    assert.ok(getLanguageAlternates(href)?.english.startsWith('/en/'), href);
  }
});
