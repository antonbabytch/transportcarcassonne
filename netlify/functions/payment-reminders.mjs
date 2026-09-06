import { daysBetween, parisDate } from './_lib/payment-data.mjs';
import { listPayments, savePayment } from './_lib/payment-store.mjs';
import {
  sendBalanceReminder,
  sendCustomerConfirmation,
  sendOwnerPaymentNotification,
  sendReviewRequest,
} from './_lib/notifications.mjs';

function positiveInteger(value, fallback) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 && parsed <= 90 ? parsed : fallback;
}

async function updateAfterSend(payment, field, send) {
  if (payment[field]) return payment;
  const result = await send(payment);
  if (!result.sent) return payment;
  const updated = { ...payment, [field]: new Date().toISOString(), updatedAt: new Date().toISOString() };
  await savePayment(updated);
  return updated;
}

export default async () => {
  const today = parisDate();
  const balanceDaysBefore = positiveInteger(process.env.BALANCE_REMINDER_DAYS_BEFORE, 3);
  const reviewDaysAfter = positiveInteger(process.env.REVIEW_REQUEST_DAYS_AFTER, 1);
  const autoReviewEnabled = String(process.env.AUTO_REVIEW_REQUESTS || '').toLowerCase() === 'true';

  let payments;
  try {
    payments = await listPayments();
  } catch (error) {
    console.error('Unable to list payment records:', error);
    return;
  }

  for (const original of payments) {
    if (!['acompte-recu', 'solde-recu'].includes(original.status)) continue;

    try {
      let payment = original;
      payment = await updateAfterSend(payment, 'ownerNotifiedAt', sendOwnerPaymentNotification);
      if (payment.customerEmail) {
        payment = await updateAfterSend(payment, 'customerConfirmationSentAt', sendCustomerConfirmation);
      }

      if (!payment.customerEmail || !payment.serviceDate || payment.status !== 'acompte-recu') continue;
      const daysUntilService = daysBetween(today, payment.serviceDate);

      if (daysUntilService === balanceDaysBefore) {
        payment = await updateAfterSend(payment, 'balanceReminderSentAt', sendBalanceReminder);
      }

      if (autoReviewEnabled && daysUntilService !== null && daysUntilService <= -reviewDaysAfter) {
        await updateAfterSend(payment, 'reviewRequestSentAt', sendReviewRequest);
      }
    } catch (error) {
      console.error(`Reminder processing failed for ${original.checkoutSessionId}:`, error);
    }
  }
};

export const config = {
  schedule: '0 7 * * *',
};

