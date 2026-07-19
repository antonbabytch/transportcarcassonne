import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const root = resolve('dist');
if (!existsSync(root)) {
  console.error('dist/ introuvable. Lancez npm run build avant cet audit.');
  process.exit(1);
}

const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  const path = join(dir, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
});
const htmlFiles = walk(root).filter(path => path.endsWith('.html'));
const text = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&(?:nbsp|#160);/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&quot;/gi, '"')
  .replace(/\s+/g, ' ')
  .trim();
const routeFor = file => {
  const rel = relative(root, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -10)}`;
  return `/${rel}`;
};
const pageForHref = href => {
  const clean = decodeURI(href.split('#')[0].split('?')[0]);
  if (!clean || /^(?:https?:|mailto:|tel:|sms:|javascript:)/i.test(clean)) return null;
  const pathname = clean.startsWith('/') ? clean : null;
  if (!pathname) return null;
  const candidates = pathname.endsWith('/')
    ? [join(root, pathname, 'index.html')]
    : [join(root, pathname, 'index.html'), join(root, `${pathname}.html`)];
  return candidates.find(existsSync) ?? candidates[0];
};

const errors = [];
const warnings = [];
const pages = [];
const inbound = new Map();

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const route = routeFor(file);
  if (route === '/__forms.html' || /^\/google[a-z0-9]+\.html$/i.test(route)) continue;
  const title = text(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? '';
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1] ?? '';
  const robots = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i)?.[1] ?? '';
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(match => text(match[1]));
  const noindex = /noindex/i.test(robots);

  if (!title) errors.push(`${route}: balise <title> absente`);
  else if (title.length < 30 || title.length > 65) warnings.push(`${route}: titre de ${title.length} caractères`);
  if (!description) errors.push(`${route}: meta description absente`);
  else if (description.length < 70 || description.length > 170) warnings.push(`${route}: description de ${description.length} caractères`);
  if (!canonical.startsWith('https://transportcarcassonne.fr/')) errors.push(`${route}: canonical invalide (${canonical || 'absente'})`);
  if (h1s.length !== 1) errors.push(`${route}: ${h1s.length} balise(s) H1`);

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\salt=(?:"[^"]*"|'[^']*')/i.test(match[0])) errors.push(`${route}: image sans attribut alt`);
  }
  for (const match of html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); }
    catch (error) { errors.push(`${route}: JSON-LD invalide (${error.message})`); }
  }
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
    const target = pageForHref(match[1]);
    if (!target) continue;
    if (!existsSync(target)) errors.push(`${route}: lien interne cassé vers ${match[1]}`);
    else inbound.set(routeFor(target), (inbound.get(routeFor(target)) ?? 0) + 1);
  }
  pages.push({ route, title, description, canonical, noindex });
}

for (const field of ['title', 'description', 'canonical']) {
  const seen = new Map();
  for (const page of pages.filter(page => !page.noindex)) {
    const value = page[field];
    if (!value) continue;
    if (seen.has(value)) errors.push(`${page.route}: ${field} dupliqué avec ${seen.get(value)}`);
    else seen.set(value, page.route);
  }
}
for (const page of pages.filter(page => !page.noindex && page.route !== '/')) {
  if (!inbound.get(page.route)) warnings.push(`${page.route}: page orpheline (aucun lien interne)`);
}

console.log(`Audit SEO statique : ${pages.length} pages HTML`);
for (const warning of warnings) console.warn(`WARN  ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);
console.log(`Résultat : ${errors.length} erreur(s), ${warnings.length} avertissement(s)`);
process.exitCode = errors.length ? 1 : 0;
