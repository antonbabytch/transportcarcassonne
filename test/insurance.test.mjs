import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('insurance summary contains no dates, policy number or blanket cover promise', async () => {
  const data = await source('src/data/insurance.ts');
  assert.doesNotMatch(data, /2021|2026|2027|64969091|sans garde-meubles|without furniture storage|all belongings are insured|tous vos biens sont assurés/);
  assert.match(data, /Allianz/);
  assert.match(data, /disponible sur demande/);
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
  assert.match(fields, /avant réservation/);
});
