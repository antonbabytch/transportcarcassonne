import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { postLead, trackAcceptedLead } from '../src/scripts/lead-submission.mjs';

test('POST encodes Netlify field names, Unicode and email correctly', async () => {
  const fields = new FormData();
  fields.set('form-name', 'devis-transport');
  fields.set('email', 'test+fr@example.com');
  fields.set('message', 'Étage 2 & canapé');
  await postLead(fields, async (url, options) => {
    assert.equal(url, '/');
    assert.equal(options.method, 'POST');
    const decoded = new URLSearchParams(options.body);
    assert.equal(decoded.get('form-name'), 'devis-transport');
    assert.equal(decoded.get('email'), 'test+fr@example.com');
    assert.equal(decoded.get('message'), 'Étage 2 & canapé');
    return { ok: true };
  });
});

test('server and network errors reject instead of reporting success', async () => {
  for (const status of [400, 403, 429, 500]) {
    await assert.rejects(postLead(new FormData(), async () => ({ ok: false, status })));
  }
  await assert.rejects(postLead(new FormData(), async () => { throw new Error('offline'); }));
});

test('only consented, non-test accepted leads reach analytics, without personal data', () => {
  const calls = [];
  const gtag = (...args) => calls.push(args);
  for (const consent of [null, 'denied', '']) assert.equal(trackAcceptedLead('devis-transport', 'en', consent, gtag), false);
  assert.equal(trackAcceptedLead('devis-transport', 'en', 'granted', gtag, true), false);
  assert.equal(trackAcceptedLead('devis-transport', 'en', 'granted', undefined), false);
  assert.equal(trackAcceptedLead('devis-transport', 'en', 'granted', gtag), true);
  assert.deepEqual(calls, [['event', 'generate_lead', { form_name: 'devis-transport', language: 'en', transport_type: 'beacon' }]]);
});

test('no old premature conversions or thank-you page conversion triggers remain', async () => {
  for (const path of ['src/layouts/BaseLayout.astro', 'src/components/QuoteWizard.astro', 'src/pages/merci.astro', 'src/pages/en/thank-you.astro']) {
    const source = await readFile(new URL(`../${path}`, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /['"](?:form_submit|devis_wizard_submit|generate_lead)['"]/);
  }
});
