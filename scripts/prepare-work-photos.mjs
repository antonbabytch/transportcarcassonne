// Run explicitly on the owner's machine. Never copy original photos to public/.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Input must already have plates/private details removed. This script only
// creates responsive WebP versions; it does NOT redact private information.
// Usage: node scripts/prepare-work-photos.mjs <image-id> <sanitised-file> [...]
const args = process.argv.slice(2);
if (!args.length || args.length % 2) throw new Error('Provide image-id / sanitised-file pairs.');
const photos = [];
for (let i = 0; i < args.length; i += 2) {
  if (!/^[a-z0-9-]+$/.test(args[i])) throw new Error('Invalid image id.');
  photos.push([args[i], path.resolve(args[i + 1])]);
}
const output = fileURLToPath(new URL('../public/images/realisations/', import.meta.url));
await mkdir(output, { recursive: true });
for (const [id, filename] of photos) {
  for (const width of [1080, 540]) {
    // sharp strips EXIF/GPS by default; no withMetadata/keepMetadata call.
    const result = await sharp(filename).rotate()
      .resize({ width, withoutEnlargement: true }).webp({ quality: 82 })
      .toFile(path.join(output, `${id}${width === 540 ? '-540' : ''}.webp`));
    console.log(`${id}: ${result.width}×${result.height}, ${Math.round(result.size / 1024)} KB`);
  }
}
