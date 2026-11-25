import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import sharp from 'sharp';
import { WORK_PHOTOS } from '../src/data/workGallery.ts';

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
  assert.equal(files.length, WORK_PHOTOS.length * 2);
  assert.equal(new Set(WORK_PHOTOS.map(photo => photo.id)).size, WORK_PHOTOS.length);
  assert.ok(files.every(file => file.endsWith('.webp')));
  for (const file of files) {
    const thumbnail = file.endsWith('-540.webp');
    const id = file.replace(/(?:-540)?\.webp$/, '');
    const photo = WORK_PHOTOS.find(photo => photo.id === id);
    assert.ok(photo, `Missing gallery entry for ${file}`);
    const metadata = await sharp(await readFile(new URL(file, directory))).metadata();
    assert.equal(metadata.exif, undefined);
    assert.equal(metadata.xmp, undefined);
    const width = photo.width ?? 1080;
    const height = photo.height ?? 1440;
    assert.equal(metadata.width, thumbnail ? 540 : width);
    assert.equal(metadata.height, thumbnail ? Math.round(height * 540 / width) : height);
    assert.ok((await readFile(new URL(file, directory))).length < 450 * 1024, `Image exceeds size budget: ${file}`);
    assert.ok(photo.fr.length > 15 && photo.en.length > 15);
  }
});
