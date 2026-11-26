import test from 'node:test';
import assert from 'node:assert/strict';
import { getLanguageAlternates, getLanguageSwitchPath, localizeNavLink } from '../src/data/i18n.ts';

test('home, blog, quotes and service language switches go to reciprocal pages', () => {
  for (const [french, english] of [
    ['/', '/en/'],
    ['/blog/', '/en/blog/'],
    ['/devis/', '/en/quote/'],
    ['/services/demenagement-local/', '/en/local-removals-carcassonne/'],
    ['/services/transport-piano/', '/en/piano-moving-carcassonne/'],
    ['/realisations/', '/en/our-work/'],
  ]) {
    assert.equal(getLanguageSwitchPath(french), english);
    assert.equal(getLanguageSwitchPath(english), french);
    assert.deepEqual(getLanguageAlternates(english), { french, english });
  }
  assert.equal(getLanguageSwitchPath('/devis?source=hero#quote'), '/en/quote/');
});

test('untranslated pages have no false alternate or homepage fallback', () => {
  for (const path of ['/calculateur-volume-demenagement/', '/en/moving-to-carcassonne/', '/en/uk-france-removals-carcassonne/']) {
    assert.equal(getLanguageAlternates(path), null);
    assert.equal(getLanguageSwitchPath(path), null);
  }
  assert.deepEqual(localizeNavLink('/outils-demenagement/', 'Outils', 'Tools', 'en'), {
    href: '/outils-demenagement/', label: 'Tools (FR)', hreflang: 'fr-FR',
  });
});
