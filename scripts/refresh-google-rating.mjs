// Refresh the static fallback before a production build. The runtime endpoint
// keeps the number current between builds; failures here preserve the last good
// committed snapshot instead of breaking a deployment.
import { readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchGoogleRating } from '../netlify/functions/_lib/google-rating.mjs';

const FILE = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'src',
  'data',
  'google-rating.json',
);

async function refreshSnapshot() {
  if (process.env.SKIP_RATING_REFRESH === '1') {
    console.log('[google-rating] remote refresh skipped; using the committed snapshot');
    return;
  }

  try {
    const currentText = await readFile(FILE, 'utf8');
    const current = JSON.parse(currentText);
    const fresh = await fetchGoogleRating();
    const updated = {
      ...current,
      ...fresh,
      lastUpdated: new Date().toISOString().slice(0, 10),
    };
    const updatedText = `${JSON.stringify(updated, null, 2)}\n`;

    if (updatedText === currentText) {
      console.log('[google-rating] static snapshot is already current');
      return;
    }

    const temporaryFile = `${FILE}.${process.pid}.tmp`;
    try {
      await writeFile(temporaryFile, updatedText, 'utf8');
      await rename(temporaryFile, FILE);
    } finally {
      await rm(temporaryFile, { force: true });
    }

    console.log(
      `[google-rating] snapshot updated: ${fresh.ratingValue}/5, ${fresh.reviewCount} reviews`,
    );
  } catch (error) {
    console.warn(`[google-rating] static snapshot kept (${error.message})`);
  }
}

await refreshSnapshot();
