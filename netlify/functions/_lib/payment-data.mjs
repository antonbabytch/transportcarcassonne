const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, maxLength = 160) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function customFieldValue(field) {
  if (!field || typeof field !== 'object') return '';
  const value = field.text?.value ?? field.numeric?.value ?? field.dropdown?.value ?? '';
  return clean(String(value), 255);
}

function customFieldLabel(field) {
  return clean(field?.label?.custom ?? field?.label ?? '', 120).toLowerCase();
}

function findCustomField(session, keys, labelPatterns = []) {
  const fields = Array.isArray(session?.custom_fields) ? session.custom_fields : [];
  const normalizedKeys = new Set(keys.map((key) => key.toLowerCase()));

  for (const field of fields) {
    const key = clean(field?.key ?? '', 120).toLowerCase();
    const label = customFieldLabel(field);
    if (normalizedKeys.has(key) || labelPatterns.some((pattern) => pattern.test(label))) {
      const value = customFieldValue(field);
      if (value) return value;
    }
  }

  return '';
}

export function normalizeServiceDate(value) {
  const normalized = clean(value, 20);
  if (!normalized) return '';

  if (DATE_ONLY.test(normalized)) {
    const date = new Date(`${normalized}T00:00:00Z`);
    return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== normalized ? '' : normalized;
  }

  const french = /^(\d{2})[\/.\-](\d{2})[\/.\-](\d{4})$/.exec(normalized);
  if (!french) return '';

  const [, day, month, year] = french;
  const iso = `${year}-${month}-${day}`;
  const date = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== iso ? '' : iso;
}

export function normalizeCheckoutSession(session, now = new Date()) {
  if (!session || typeof session !== 'object' || !clean(session.id, 255)) {
    throw new Error('Invalid Stripe Checkout Session');
  }

  const metadata = session.metadata && typeof session.metadata === 'object' ? session.metadata : {};
  const rawKind = clean(metadata.payment_kind ?? metadata.type_paiement ?? '', 40).toLowerCase();
  const paymentKind = rawKind === 'solde' ? 'solde' : 'acompte';
  const quoteNumber = clean(
    metadata.quote_number ??
      metadata.numero_devis ??
      findCustomField(session, ['quote_number', 'numero_devis', 'devis'], [/num[eé]ro.*devis/, /r[eé]f[eé]rence.*devis/, /^devis$/]),
    80,
  );
  const serviceDate = normalizeServiceDate(
    metadata.service_date ??
      metadata.date_prestation ??
      findCustomField(session, ['service_date', 'date_prestation'], [/date.*prestation/, /date.*d[eé]m[eé]nagement/]),
  );
  const customerEmailRaw = clean(session.customer_details?.email ?? session.customer_email ?? '', 254).toLowerCase();
  const customerEmail = EMAIL.test(customerEmailRaw) ? customerEmailRaw : '';

  return {
    checkoutSessionId: clean(session.id, 255),
    paymentIntentId: clean(
      typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
      255,
    ),
    paymentLinkId: clean(
      typeof session.payment_link === 'string' ? session.payment_link : session.payment_link?.id,
      255,
    ),
    paymentKind,
    status: session.payment_status === 'paid' ? `${paymentKind}-recu` : 'paiement-en-attente',
    quoteNumber,
    serviceDate,
    customerName: clean(session.customer_details?.name ?? '', 120),
    customerEmail,
    amountTotal: Number.isSafeInteger(session.amount_total) && session.amount_total >= 0 ? session.amount_total : 0,
    currency: clean(session.currency ?? 'eur', 3).toLowerCase() || 'eur',
    stripePaymentStatus: clean(session.payment_status ?? 'unpaid', 40).toLowerCase(),
    createdAt: new Date((Number(session.created) || Math.floor(now.getTime() / 1000)) * 1000).toISOString(),
    updatedAt: now.toISOString(),
  };
}

export function formatAmount(amountMinor, currency = 'eur') {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: String(currency || 'eur').toUpperCase(),
  }).format((Number(amountMinor) || 0) / 100);
}

export function parisDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function daysBetween(dateA, dateB) {
  if (!DATE_ONLY.test(dateA) || !DATE_ONLY.test(dateB)) return null;
  const a = Date.parse(`${dateA}T00:00:00Z`);
  const b = Date.parse(`${dateB}T00:00:00Z`);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
  return Math.round((b - a) / 86_400_000);
}

