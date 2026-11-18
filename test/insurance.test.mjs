import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('insurance information uses fixed certificate dates and no policy number', async () => {
  const data = await source('src/data/insurance.ts');
  assert.match(data, /2026-11-01/);
  assert.match(data, /2027-10-31/);
  assert.doesNotMatch(data, /64969091/);
  assert.match(data, /franchises/);
  assert.match(data, /excesses/);
  assert.match(data, /paiement des cotisations/);
});

test('both insurance routes have reciprocal language mappings and footer links', async () => {
  const routes = await source('src/data/i18n.ts');
  assert.match(routes, /\['\/assurance-demenagement\/', '\/en\/removal-insurance\/'\]/);
  const footer = await source('src/components/Footer.astro');
  for (const url of ['/assurance-demenagement/', '/en/removal-insurance/']) assert.ok(footer.includes(url));
  assert.match(await source('src/pages/assurance-demenagement.astro'), /<InsurancePage/);
  assert.match(await source('src/pages/en/removal-insurance.astro'), /<InsurancePage lang="en"/);
});

test('public insurance blocks omit certificate dates and card activity row', async () => {
  for (const file of ['src/components/InsuranceNotice.astro', 'src/components/InsurancePage.astro']) {
    const text = await source(file);
    assert.doesNotMatch(text, /2026|2027|certificateFrom|certificateUntil|Stated period|Période indiquée|Declared activity|Activité déclarée/);
  }
  const data = await source('src/data/insurance.ts');
  const faqs = data.slice(data.indexOf('export const INSURANCE_FAQS'));
  assert.doesNotMatch(faqs, /2026|2027/);
});

test('both lead forms show special-item guidance without collecting new data', async () => {
  for (const file of ['src/components/QuoteForm.astro', 'src/components/QuoteWizard.astro']) {
    assert.match(await source(file), /<SpecialItemsNotice/);
    assert.match(await source(file), /<InsuranceNotice/);
  }
  const fields = await source('src/components/SpecialItemsNotice.astro');
  assert.doesNotMatch(fields, /\srequired(?:\s|>|=)/);
  assert.doesNotMatch(fields, /type="file"/);
  assert.doesNotMatch(fields, /<(?:input|select|textarea)\b/);
  assert.match(fields, /ni déclaration de valeur ni confirmation d’assurance/);
});
