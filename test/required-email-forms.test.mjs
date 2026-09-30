import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const emailInputs = (source) => source.match(/<input\b[^>]*name="email"[^>]*>/gi) ?? [];

const assertRequiredEmailInputs = (inputs, label) => {
  assert.ok(inputs.length > 0, `${label} must contain an email input`);
  for (const input of inputs) {
    assert.match(input, /\btype="email"/i, `${label} email input must use type=email`);
    assert.match(input, /\brequired\b/i, `${label} email input must be required`);
  }
};

test('every lead form requires a valid email address', async () => {
  const [shortForm, wizard, netlifyDetector] = await Promise.all([
    read('src/components/QuoteForm.astro'),
    read('src/components/QuoteWizard.astro'),
    read('public/__forms.html'),
  ]);

  assertRequiredEmailInputs(emailInputs(shortForm), 'QuoteForm');
  assertRequiredEmailInputs(emailInputs(wizard), 'QuoteWizard');

  const detectorInputs = emailInputs(netlifyDetector);
  assert.equal(detectorInputs.length, 2, 'Netlify detector must describe both lead-form email fields');
  assertRequiredEmailInputs(detectorInputs, 'Netlify detector');
});
