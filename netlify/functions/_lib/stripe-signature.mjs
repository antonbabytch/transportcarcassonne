import { createHmac, timingSafeEqual } from 'node:crypto';

function safeHexEqual(left, right) {
  if (!/^[a-f0-9]{64}$/i.test(left) || !/^[a-f0-9]{64}$/i.test(right)) return false;
  const leftBuffer = Buffer.from(left, 'hex');
  const rightBuffer = Buffer.from(right, 'hex');
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function createStripeSignature(payload, timestamp, secret) {
  return createHmac('sha256', secret).update(`${timestamp}.${payload}`, 'utf8').digest('hex');
}

export function verifyStripeSignature({ payload, header, secret, toleranceSeconds = 300, nowSeconds = Math.floor(Date.now() / 1000) }) {
  if (typeof payload !== 'string' || !payload) throw new Error('Missing webhook payload');
  if (typeof header !== 'string' || !header) throw new Error('Missing Stripe-Signature header');
  if (typeof secret !== 'string' || !secret) throw new Error('Missing webhook secret');

  let timestamp = 0;
  const signatures = [];
  for (const part of header.split(',')) {
    const [key, value] = part.trim().split('=', 2);
    if (key === 't') timestamp = Number(value);
    if (key === 'v1' && value) signatures.push(value);
  }

  if (!Number.isSafeInteger(timestamp) || timestamp <= 0 || signatures.length === 0) {
    throw new Error('Malformed Stripe-Signature header');
  }
  if (Math.abs(nowSeconds - timestamp) > toleranceSeconds) {
    throw new Error('Webhook timestamp is outside the allowed tolerance');
  }

  const expected = createStripeSignature(payload, timestamp, secret);
  if (!signatures.some((signature) => safeHexEqual(signature, expected))) {
    throw new Error('Webhook signature verification failed');
  }

  return timestamp;
}

