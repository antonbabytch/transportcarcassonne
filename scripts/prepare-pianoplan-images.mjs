import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

// Source: the HNVI listing supplied by the owner, lot 198054.
// Keep the actual machine unchanged; resize/encode only, without metadata.
await mkdir('public/images/equipement', { recursive: true });
for (const [source, name] of [['auction-front.jpg', 'pianoplan-600j-vertical-carcassonne'], ['auction-side.jpg', 'pianoplan-commandes-chenilles']]) {
  for (const width of (source === 'auction-front.jpg' ? [512, 1024] : [512])) {
    const result = await sharp(`outputs/pianoplan/${source}`).rotate()
      .resize({ width, withoutEnlargement: true }).webp({ quality: 82 })
      .toFile(`public/images/equipement/${name}-${width}.webp`);
    console.log(name, result.width, result.height, result.size);
  }
}
