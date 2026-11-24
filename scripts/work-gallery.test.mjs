import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import sharp from 'sharp';

const source = p => readFile(new URL(`../${p}`, import.meta.url), 'utf8');
test('gallery has reciprocal language routes and homepage entry points', async () => {
  assert.match(await source('src/data/i18n.ts'), /\['\/realisations\/', '\/en\/our-work\/'\]/);
  assert.match(await source('src/pages/index.astro'), /<WorkGallery preview/);
  assert.match(await source('src/pages/en/index.astro'), /<WorkGallery lang="en" preview/);
  assert.doesNotMatch(await source('astro.config.mjs'), /!page.includes\('\/realisations'\)/);
});
test('all public portfolio images have responsive copies without EXIF metadata', async () => {
  const directory = new URL('../public/images/realisations/', import.meta.url);
  const files = await readdir(directory);
  assert.equal(files.length, 14);
  assert.ok(files.every(file => file.endsWith('.webp')));
  for (const file of files) {
    const metadata = await sharp(await readFile(new URL(file, directory))).metadata();
    assert.equal(metadata.exif, undefined);
    assert.equal(metadata.xmp, undefined);
    assert.equal(metadata.width, file.includes('-540') ? 540 : 1080);
    assert.equal(metadata.height, file.includes('-540') ? 720 : 1440);
  }
});
