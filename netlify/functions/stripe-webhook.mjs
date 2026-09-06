import { verifyStripeSignature } from './_lib/stripe-signature.mjs';
import { normalizeCheckoutSession } from './_lib/payment-data.mjs';
import {
  findPaymentByPaymentIntent,
  getPayment,
  isEventProcessed,
  markEventProcessed,
  savePayment,
} from './_lib/payment-store.mjs';
import {
  sendCustomerConfirmation,
  sendOwnerPaymentNotification,
} from './_lib/notifications.mjs';

const MAX_PAYLOAD_BYTES = 1_000_000;

function response(status, body) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

async function notifyPaidPayment(payment) {
  let current = payment;

  if (!current.ownerNotifiedAt) {
    const result = await sendOwnerPaymentNotification(current);
    if (result.sent) {
      current = { ...current, ownerNotifiedAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      await savePayment(current);
    }
  }

  if (!current.customerConfirmationSentAt && current.customerEmail) {
    const result = await sendCustomerConfirmation(current);
    if (result.sent) {
      current = { ...current, customerConfirmationSentAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      await savePayment(current);
    }
  }

  return current;
}

async function handleCheckoutSession(session) {
  const incoming = normalizeCheckoutSession(session);
  const existing = await getPayment(incoming.checkoutSessionId);
  let payment = {
    ...(existing ?? {}),
    ...incoming,
    ownerNotifiedAt: existing?.ownerNotifiedAt ?? null,
    customerConfirmationSentAt: existing?.customerConfirmationSentAt ?? null,
    balanceReminderSentAt: existing?.balanceReminderSentAt ?? null,
    reviewRequestSentAt: existing?.reviewRequestSentAt ?? null,
  };

  await savePayment(payment);
  if (payment.stripePaymentStatus === 'paid') payment = await notifyPaidPayment(payment);
  return payment;
}

async function handleAsyncPaymentFailure(session) {
  const incoming = normalizeCheckoutSession(session);
  const existing = await getPayment(incoming.checkoutSessionId);
  return savePayment({
    ...(existing ?? {}),
    ...incoming,
    status: 'paiement-echoue',
    stripePaymentStatus: 'unpaid',
    updatedAt: new Date().toISOString(),
  });
}

async function handleRefund(charge) {
  const paymentIntentId = typeof charge?.payment_intent === 'string' ? charge.payment_intent : charge?.payment_intent?.id;
  const payment = await findPaymentByPaymentIntent(paymentIntentId);
  if (!payment) return null;
  return savePayment({
    ...payment,
    status: charge.refunded ? 'rembourse' : 'remboursement-partiel',
    refundedAmount: Number.isSafeInteger(charge.amount_refunded) ? charge.amount_refunded : 0,
    updatedAt: new Date().toISOString(),
  });
}

export default async (request) => {
  if (request.method !== 'POST') return response(405, { error: 'method_not_allowed' });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) return response(503, { error: 'webhook_not_configured' });

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_PAYLOAD_BYTES) return response(413, { error: 'payload_too_large' });

  const payload = await request.text();
  if (Buffer.byteLength(payload, 'utf8') > MAX_PAYLOAD_BYTES) return response(413, { error: 'payload_too_large' });

  try {
    verifyStripeSignature({
      payload,
      header: request.headers.get('stripe-signature'),
      secret: webhookSecret,
    });
  } catch (error) {
    console.warn('Stripe webhook rejected:', error.message);
    return response(400, { error: 'invalid_signature' });
  }

  let event;
  try {
    event = JSON.parse(payload);
  } catch {
    return response(400, { error: 'invalid_json' });
  }

  if (!event?.id || !event?.type || !event?.data?.object) {
    return response(400, { error: 'invalid_event' });
  }

  if (await isEventProcessed(event.id)) return response(200, { received: true, duplicate: true });

  try {
    let payment = null;
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      payment = await handleCheckoutSession(event.data.object);
    } else if (event.type === 'checkout.session.async_payment_failed') {
      payment = await handleAsyncPaymentFailure(event.data.object);
    } else if (event.type === 'charge.refunded') {
      payment = await handleRefund(event.data.object);
    }

    await markEventProcessed(event.id, event.type);
    return response(200, {
      received: true,
      handled: Boolean(payment),
      status: payment?.status ?? null,
    });
  } catch (error) {
    console.error('Stripe webhook processing failed:', error);
    return response(500, { error: 'processing_failed' });
  }
};

export const config = {
  path: '/api/stripe/webhook',
};

