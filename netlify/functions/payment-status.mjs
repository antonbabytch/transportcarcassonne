import { getPayment } from './_lib/payment-store.mjs';

function response(status, body) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export default async (request) => {
  if (request.method !== 'GET') return response(405, { error: 'method_not_allowed' });

  const sessionId = new URL(request.url).searchParams.get('session_id') || '';
  if (!/^cs_(?:test_|live_)?[a-zA-Z0-9]{8,255}$/.test(sessionId)) {
    return response(400, { error: 'invalid_session_id' });
  }

  try {
    const payment = await getPayment(sessionId);
    if (!payment) return response(202, { status: 'verification-en-cours' });

    return response(200, {
      status: payment.status,
      paymentKind: payment.paymentKind,
      quoteNumber: payment.quoteNumber || null,
      amountTotal: payment.amountTotal,
      currency: payment.currency,
    });
  } catch (error) {
    console.error('Payment status lookup failed:', error);
    return response(503, { error: 'status_unavailable' });
  }
};

export const config = {
  path: '/api/payment/status',
};

