#!/usr/bin/env node

import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const REQUIRED_FIELD_ALIASES = {
  name: ['nom', 'name', 'full_name', 'nom_prenom'],
  phone: ['telephone', 'tel', 'phone', 'phone_number'],
  consent: ['consentement_confidentialite', 'consent', 'privacy_consent'],
};

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];

    if (inQuotes) {
      if (char === '"') {
        if (input[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && input[index + 1] === '\n') index += 1;
      row.push(field);
      if (row.some((value) => value.trim() !== '')) rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (inQuotes) throw new Error('CSV invalide : guillemet fermant manquant.');
  row.push(field);
  if (row.some((value) => value.trim() !== '')) rows.push(row);
  return rows;
}

function normalizeHeader(value) {
  return String(value || '')
    .replace(/^\uFEFF/, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function buildTable(csvText) {
  const parsed = parseCsv(csvText);
  if (parsed.length === 0) throw new Error('Le fichier CSV est vide.');

  const headers = parsed[0].map(normalizeHeader);
  if (headers.every((header) => !header)) throw new Error('Le CSV ne contient aucun en-tête exploitable.');

  const rows = parsed.slice(1).map((values) => {
    const result = {};
    headers.forEach((header, index) => {
      if (header) result[header] = String(values[index] ?? '').trim();
    });
    return result;
  }).filter((row) => Object.values(row).some(Boolean));

  return { headers, rows };
}

function findHeader(headers, aliases) {
  for (const alias of aliases) {
    if (headers.includes(alias)) return alias;
  }
  for (const alias of aliases) {
    const match = headers.find((header) => header.endsWith(`_${alias}`));
    if (match) return match;
  }
  return null;
}

function safeDimension(value) {
  const raw = String(value || '').trim().toLowerCase();
  if (!raw) return '(non renseigné)';
  const compactDigits = raw.replace(/\D/g, '');
  if (
    raw.includes('@')
    || /https?:\/\/|www\./i.test(raw)
    || compactDigits.length >= 7
    || raw.length > 80
    || /[\r\n]/.test(raw)
  ) return '[valeur masquée]';

  const cleaned = raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9._ -]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 48);
  return cleaned || '[valeur masquée]';
}

function markdownEscape(value) {
  return String(value).replaceAll('\\', '\\\\').replaceAll('|', '\\|').replace(/[\r\n]+/g, ' ');
}

function countDimension(rows, header) {
  const counts = new Map();
  for (const row of rows) {
    const label = header ? safeDimension(row[header]) : '(colonne absente)';
    counts.set(label, (counts.get(label) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'fr'));
}

function renderCountTable(title, entries, total) {
  const lines = [`### ${title}`, '', '| Valeur | Leads | Part |', '|---|---:|---:|'];
  if (entries.length === 0) {
    lines.push('| (aucune donnée) | 0 | 0 % |');
  } else {
    for (const [label, count] of entries) {
      const share = total ? `${((count / total) * 100).toFixed(1).replace('.', ',')} %` : '0 %';
      lines.push(`| ${markdownEscape(label)} | ${count} | ${share} |`);
    }
  }
  lines.push('');
  return lines;
}

function parseMoney(value) {
  const raw = String(value || '').replace(/[\s\u00A0\u202F€]/g, '').replace(',', '.');
  if (!raw) return null;
  const number = Number(raw.replace(/[^0-9.-]/g, ''));
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function formatEuro(value) {
  return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(value))} €`;
}

function average(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function dateKey(value) {
  const raw = String(value || '').trim();
  if (!raw) return null;
  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
  const french = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (french) return `${french[3]}-${french[2]}-${french[1]}`;
  const parsed = Date.parse(raw);
  return Number.isFinite(parsed) ? new Date(parsed).toISOString().slice(0, 10) : null;
}

function isYes(value) {
  return ['1', 'true', 'yes', 'oui', 'on', 'x'].includes(String(value || '').trim().toLowerCase());
}

function serviceCounts(rows, headers) {
  const counts = new Map();
  const routeHeader = findHeader(headers, ['type_trajet']);
  const formulaHeader = findHeader(headers, ['formule_prefill', 'formule']);
  const contextHeader = findHeader(headers, ['request_context']);
  const options = [
    ['service_cartons', 'Option : cartons et matériel'],
    ['service_emballage', 'Option : emballage'],
    ['service_demontage', 'Option : démontage / remontage'],
    ['service_deballage', 'Option : déballage'],
    ['objet_piano', 'Objet : piano'],
    ['objet_lourd', 'Objet : lourd'],
  ];

  for (const row of rows) {
    if (routeHeader && row[routeHeader]) {
      const label = `Trajet : ${safeDimension(row[routeHeader])}`;
      counts.set(label, (counts.get(label) || 0) + 1);
    }
    if (formulaHeader && row[formulaHeader]) {
      const label = `Formule : ${safeDimension(row[formulaHeader])}`;
      counts.set(label, (counts.get(label) || 0) + 1);
    }
    if (contextHeader && row[contextHeader] && row[contextHeader] !== 'devis-standard') {
      const label = `Contexte : ${safeDimension(row[contextHeader])}`;
      counts.set(label, (counts.get(label) || 0) + 1);
    }
    for (const [field, label] of options) {
      const header = findHeader(headers, [field]);
      if (header && isYes(row[header])) counts.set(label, (counts.get(label) || 0) + 1);
    }
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'fr'));
}

function generateReport(csvText) {
  const { headers, rows } = buildTable(csvText);
  const total = rows.length;
  const leadSource = findHeader(headers, ['lead_source']) || (headers.includes('source') ? 'source' : null);
  const utmSource = findHeader(headers, ['utm_source']);
  const utmMedium = findHeader(headers, ['utm_medium']);
  const utmCampaign = findHeader(headers, ['utm_campaign']);
  const completedHeader = findHeader(headers, ['wizard_completed', 'completed']);
  const minHeader = findHeader(headers, ['estimation_min', 'estimate_min']);
  const maxHeader = findHeader(headers, ['estimation_max', 'estimate_max']);
  const submittedAt = findHeader(headers, ['created_at', 'submitted_at', 'submission_date', 'date_submission', 'created']);

  const completed = { yes: 0, no: 0, unknown: 0 };
  for (const row of rows) {
    if (!completedHeader || !row[completedHeader]) completed.unknown += 1;
    else if (isYes(row[completedHeader])) completed.yes += 1;
    else completed.no += 1;
  }

  const estimatePairs = rows.map((row) => ({
    min: minHeader ? parseMoney(row[minHeader]) : null,
    max: maxHeader ? parseMoney(row[maxHeader]) : null,
  })).filter((pair) => pair.min !== null && pair.max !== null && pair.max >= pair.min);
  const minima = estimatePairs.map((pair) => pair.min);
  const maxima = estimatePairs.map((pair) => pair.max);
  const estimateBuckets = new Map([
    ['< 500 €', 0],
    ['500–999 €', 0],
    ['1 000–1 999 €', 0],
    ['2 000–3 499 €', 0],
    ['≥ 3 500 €', 0],
  ]);
  for (const value of minima) {
    const bucket = value < 500 ? '< 500 €' : value < 1000 ? '500–999 €' : value < 2000 ? '1 000–1 999 €' : value < 3500 ? '2 000–3 499 €' : '≥ 3 500 €';
    estimateBuckets.set(bucket, estimateBuckets.get(bucket) + 1);
  }

  const daily = new Map();
  if (submittedAt) {
    for (const row of rows) {
      const day = dateKey(row[submittedAt]);
      if (day) daily.set(day, (daily.get(day) || 0) + 1);
    }
  }

  const contactHeaders = Object.fromEntries(
    Object.entries(REQUIRED_FIELD_ALIASES).map(([key, aliases]) => [key, findHeader(headers, aliases)]),
  );
  const missing = { name: 0, phone: 0, consent: 0, nameAndPhone: 0 };
  for (const row of rows) {
    const noName = contactHeaders.name ? !row[contactHeaders.name].trim() : false;
    const noPhone = contactHeaders.phone ? !row[contactHeaders.phone].trim() : false;
    const noConsent = contactHeaders.consent ? !isYes(row[contactHeaders.consent]) : false;
    if (noName) missing.name += 1;
    if (noPhone) missing.phone += 1;
    if (noConsent) missing.consent += 1;
    if (noName && noPhone) missing.nameAndPhone += 1;
  }

  const lines = [
    '# Rapport agrégé des demandes de devis',
    '',
    'Source analysée : export CSV local',
    '',
    '> Ce rapport contient uniquement des agrégats. Il n’affiche ni nom, téléphone, email, adresse, message, photo, URL de fichier ou identifiant de soumission.',
    '',
    '## Vue d’ensemble',
    '',
    `- **Leads analysés : ${total}**`,
    `- Wizard terminé : **${completed.yes}**`,
    `- Wizard non terminé : **${completed.no}**`,
    `- Statut de complétion absent : **${completed.unknown}**`,
    `- Estimations valides : **${estimatePairs.length}**`,
    '',
    '## Acquisition',
    '',
    ...renderCountTable('Sources', countDimension(rows, leadSource), total),
    ...renderCountTable('UTM source', countDimension(rows, utmSource), total),
    ...renderCountTable('UTM medium', countDimension(rows, utmMedium), total),
    ...renderCountTable('UTM campaign', countDimension(rows, utmCampaign), total),
    '## Services et contexte',
    '',
    ...renderCountTable('Demandes détectées', serviceCounts(rows, headers), total),
    '## Estimations indicatives',
    '',
  ];

  if (estimatePairs.length) {
    lines.push(
      `- Minimum moyen : **${formatEuro(average(minima))}**`,
      `- Maximum moyen : **${formatEuro(average(maxima))}**`,
      `- Minimum médian : **${formatEuro(median(minima))}**`,
      `- Maximum médian : **${formatEuro(median(maxima))}**`,
      '',
      '| Fourchette du minimum estimé | Leads |',
      '|---|---:|',
      ...[...estimateBuckets.entries()].map(([label, count]) => `| ${label} | ${count} |`),
      '',
    );
  } else {
    lines.push('Aucune paire `estimation_min` / `estimation_max` valide détectée.', '');
  }

  lines.push('## Leads par jour', '');
  if (!submittedAt) {
    lines.push('Colonne de date de soumission non détectée. `date_souhaitee` n’est volontairement jamais utilisée comme date de création du lead.', '');
  } else if (!daily.size) {
    lines.push('Aucune date de soumission exploitable.', '');
  } else {
    lines.push('| Date | Leads |', '|---|---:|');
    for (const [day, count] of [...daily.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      lines.push(`| ${day} | ${count} |`);
    }
    lines.push('');
  }

  lines.push(
    '## Qualité des contacts obligatoires',
    '',
    `- Nom manquant : **${contactHeaders.name ? missing.name : 'colonne absente'}**`,
    `- Téléphone manquant : **${contactHeaders.phone ? missing.phone : 'colonne absente'}**`,
    `- Nom et téléphone manquants ensemble : **${contactHeaders.name && contactHeaders.phone ? missing.nameAndPhone : 'colonnes incomplètes'}**`,
    `- Consentement absent ou non confirmé : **${contactHeaders.consent ? missing.consent : 'colonne absente'}**`,
    '',
    '## Limites',
    '',
    '- Les montants sont des estimations non contractuelles, pas du chiffre d’affaires.',
    '- Les dimensions source/UTM suspectes sont masquées automatiquement.',
    '- Le rapport ne déduit pas les doublons : l’export doit être filtré selon la période et le formulaire souhaités.',
    '',
  );

  return { markdown: lines.join('\n'), summary: { total, completed, estimateCount: estimatePairs.length, missing, daily } };
}

async function runSelfTest() {
  const fixture = `created_at,lead_source,utm_source,utm_medium,utm_campaign,type_trajet,formule_prefill,service_emballage,wizard_completed,estimation_min,estimation_max,nom,telephone,consentement_confidentialite,message,depart_ville,photo_acces_depart\r\n
"2026-07-18T09:10:00Z","google-maps","google","organic","local, été","local","confort","oui","oui","650","780","Alice","0600000000","oui","Texte, avec virgule","Carcassonne","https://files.example/a.jpg"\r\n
"2026-07-18T11:30:00Z","person@example.com","newsletter","email","été","france","","non","non","1 400","1 680","Bob","","oui","Ligne 1\nLigne 2 avec \"\"guillemets\"\"","Narbonne",""\r\n
"2026-07-19T08:00:00Z","cta","","","","local","essentielle","non","oui","450","540","","0700000000","non","","Limoux",""`;

  const parsed = parseCsv(fixture);
  assert.equal(parsed.length, 4, 'Le parseur doit conserver les trois lignes de données.');
  assert.equal(parsed[2][14], 'Ligne 1\nLigne 2 avec "guillemets"', 'Les retours ligne et guillemets CSV doivent être décodés.');

  const report = generateReport(fixture);
  assert.equal(report.summary.total, 3);
  assert.equal(report.summary.completed.yes, 2);
  assert.equal(report.summary.completed.no, 1);
  assert.equal(report.summary.estimateCount, 3);
  assert.equal(report.summary.missing.phone, 1);
  assert.equal(report.summary.missing.name, 1);
  assert.equal(report.summary.daily.get('2026-07-18'), 2);
  assert.ok(report.markdown.includes('[valeur masquée]'));
  assert.ok(!report.markdown.includes('person@example.com'));
  assert.ok(!report.markdown.includes('Alice'));
  assert.ok(!report.markdown.includes('Bob'));
  assert.ok(!report.markdown.includes('Carcassonne'));
  assert.ok(!report.markdown.includes('0600000000'));
  assert.ok(!report.markdown.includes('files.example'));
  process.stdout.write('Self-test OK: quoted CSV, agrégats et protection PII validés.\n');
}

function usage() {
  return `Usage:
  node scripts/lead-report.mjs <export.csv>
  node scripts/lead-report.mjs <export.csv> --output <rapport.md>
  node scripts/lead-report.mjs --self-test
`;
}

function parseArgs(args) {
  const options = { input: null, output: null, selfTest: false, help: false };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === '--self-test') options.selfTest = true;
    else if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg === '--output' || arg === '-o') {
      options.output = args[index + 1] || null;
      index += 1;
    } else if (arg.startsWith('--output=')) options.output = arg.slice('--output='.length);
    else if (arg.startsWith('-')) throw new Error(`Option inconnue : ${arg}`);
    else if (!options.input) options.input = arg;
    else throw new Error(`Argument inattendu : ${arg}`);
  }
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(usage());
    return;
  }
  if (options.selfTest) {
    await runSelfTest();
    return;
  }
  if (!options.input) throw new Error(`Chemin du CSV manquant.\n\n${usage()}`);

  const inputPath = path.resolve(options.input);
  const csvText = await readFile(inputPath, 'utf8');
  const { markdown } = generateReport(csvText);

  if (options.output) {
    const outputPath = path.resolve(options.output);
    await writeFile(outputPath, `${markdown}\n`, 'utf8');
    process.stdout.write('Rapport agrégé enregistré.\n');
  } else {
    process.stdout.write(`${markdown}\n`);
  }
}

main().catch((error) => {
  process.stderr.write(`Erreur lead-report : ${error.message}\n`);
  process.exitCode = 1;
});
