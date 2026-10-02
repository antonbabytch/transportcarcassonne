import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('one native disclosure replaces the two independent floating links', async () => {
  const component = await readFile(new URL('../src/components/ContactButton.astro', import.meta.url), 'utf8');
  const layout = await readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
  assert.equal((component.match(/<summary\b/g) || []).length, 1);
  assert.match(component, /<details class="contact-fab" data-contact-fab>/);
  assert.equal((component.match(/<a href=/g) || []).length, 2);
  assert.match(component, /tel:\$\{SITE.phone\}/);
  assert.match(component, /https:\/\/wa.me\/\$\{SITE.phoneWhatsapp\}/);
  assert.match(component, /aria-controls="contact-fab-options"/);
  assert.match(component, /event.key !== 'Escape'/);
  assert.match(component, /pointerdown/);
  assert.match(component, /env\(safe-area-inset-bottom/);
  assert.match(component, /Contact options/);
  assert.match(component, /Choisir un moyen de contact/);
  assert.equal((layout.match(/<ContactButton\b/g) || []).length, 1);
  assert.doesNotMatch(layout, /float-cta/);
});
