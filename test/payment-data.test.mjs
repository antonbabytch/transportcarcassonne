import assert from 'node:assert/strict';
import test from 'node:test';
import { createStripeSignature, verifyStripeSignature } from '../netlify/functions/_lib/stripe-signature.mjs';
import { daysBetween, normalizeCheckoutSession, normalizeServiceDate } from '../netlify/functions/_lib/payment-data.mjs';

test('verifies a valid Stripe signature and rejects an invalid one', () => {
  const payload = JSON.stringify({ id: 'evt_test' });
  const secret = 'whsec_test';
  const timestamp = 1_700_000_000;
  const signature = createStripeSignature(payload, timestamp, secret);

  assert.equal(
    verifyStripeSignature({
      payload,
      header: `t=${timestamp},v1=${signature}`,
      secret,
      nowSeconds: timestamp,
    }),
    timestamp,
  );

  assert.throws(() => verifyStripeSignature({
    payload,
    header: `t=${timestamp},v1=${'0'.repeat(64)}`,
    secret,
    nowSeconds: timestamp,
  }));
});

test('normalizes checkout data used by reminders and status tracking', () => {
  const session = normalizeCheckoutSession({
    id: 'cs_test_12345678',
    payment_status: 'paid',
    amount_total: 25500,
    currency: 'eur',
    created: 1_700_000_000,
    customer_details: { name: 'Jean Client', email: 'JEAN@example.com' },
    custom_fields: [
      { key: 'field_1', label: { custom: 'Numéro du devis' }, text: { value: '2059' } },
      { key: 'field_2', label: { custom: 'Date de prestation' }, text: { value: '15/09/2026' } },
    ],
  }, new Date('2026-09-05T10:00:00Z'));

  assert.equal(session.status, 'acompte-recu');
  assert.equal(session.quoteNumber, '2059');
  assert.equal(session.serviceDate, '2026-09-15');
  assert.equal(session.customerEmail, 'jean@example.com');
  assert.equal(session.amountTotal, 25500);
});

test('validates dates and calculates reminder offsets', () => {
  assert.equal(normalizeServiceDate('31/02/2026'), '');
  assert.equal(normalizeServiceDate('2026-09-15'), '2026-09-15');
  assert.equal(daysBetween('2026-09-12', '2026-09-15'), 3);
  assert.equal(daysBetween('2026-09-16', '2026-09-15'), -1);
});

