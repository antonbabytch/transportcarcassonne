import { getStore } from '@netlify/blobs';

const STORE_NAME = 'stripe-payment-automation';

function store() {
  return getStore({ name: STORE_NAME, consistency: 'strong' });
}

function safeKeyPart(value) {
  const normalized = String(value || '').replace(/[^a-zA-Z0-9_-]/g, '');
  if (!normalized) throw new Error('Invalid payment storage key');
  return normalized.slice(0, 255);
}

function paymentKey(sessionId) {
  return `payments/${safeKeyPart(sessionId)}.json`;
}

function eventKey(eventId) {
  return `events/${safeKeyPart(eventId)}.json`;
}

export async function getPayment(sessionId) {
  return store().get(paymentKey(sessionId), { type: 'json', consistency: 'strong' });
}

export async function savePayment(payment) {
  await store().setJSON(paymentKey(payment.checkoutSessionId), payment);
  return payment;
}

export async function listPayments() {
  const paymentStore = store();
  const { blobs } = await paymentStore.list({ prefix: 'payments/' });
  const records = [];
  for (const blob of blobs) {
    const record = await paymentStore.get(blob.key, { type: 'json', consistency: 'strong' });
    if (record) records.push(record);
  }
  return records;
}

export async function findPaymentByPaymentIntent(paymentIntentId) {
  if (!paymentIntentId) return null;
  const payments = await listPayments();
  return payments.find((payment) => payment.paymentIntentId === paymentIntentId) ?? null;
}

export async function isEventProcessed(eventId) {
  return Boolean(await store().get(eventKey(eventId), { type: 'json', consistency: 'strong' }));
}

export async function markEventProcessed(eventId, eventType) {
  await store().setJSON(eventKey(eventId), {
    eventId,
    eventType,
    processedAt: new Date().toISOString(),
  });
}

