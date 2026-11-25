import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

test('Pianoplan has reciprocal language routes, honest load limits and quote links', async () => {
  const page = await readFile('src/components/PianoplanPage.astro', 'utf8');
  const routes = await readFile('src/data/i18n.ts', 'utf8');
  assert.match(routes, /\['\/monte-escalier-pianoplan-carcassonne\/', '\/en\/pianoplan-stair-climber-carcassonne\/'\]/);
  assert.match(page, /600 kg est la charge maximale nominale/);
  assert.match(page, /L’escalier doit supporter la machine et sa charge/);
  assert.match(page, /service=transport-piano&source=pianoplan/);
  assert.match(page, /annonce HNVI/);
});

test('equipment photographs are small, metadata-free and dimensioned correctly', async () => {
  for (const [name, width, height] of [
    ['pianoplan-600j-vertical-carcassonne-1024', 1024, 683],
    ['pianoplan-600j-vertical-carcassonne-512', 512, 342],
    ['pianoplan-commandes-chenilles-512', 512, 768],
  ]) {
    const buffer = await readFile(`public/images/equipement/${name}.webp`);
    const info = await sharp(buffer).metadata();
    assert.equal(info.width, width);
    assert.equal(info.height, height);
    assert.equal(info.exif, undefined);
    assert.equal(info.xmp, undefined);
    assert.ok(buffer.length < 100000);
  }
});
