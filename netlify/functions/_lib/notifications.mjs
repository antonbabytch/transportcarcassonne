import { sendMail } from './mail.mjs';
import {
  balanceReminderEmail,
  customerConfirmationEmail,
  ownerPaymentEmail,
  reviewRequestEmail,
} from './mail-templates.mjs';

async function deliver(to, message) {
  return sendMail({ to, ...message });
}

export async function sendOwnerPaymentNotification(payment) {
  const recipient = process.env.PAYMENT_NOTIFICATION_TO?.trim() || 'contact@transportcarcassonne.fr';
  return deliver(recipient, ownerPaymentEmail(payment));
}

export async function sendCustomerConfirmation(payment) {
  return deliver(payment.customerEmail, customerConfirmationEmail(payment));
}

export async function sendBalanceReminder(payment) {
  return deliver(payment.customerEmail, balanceReminderEmail(payment));
}

export async function sendReviewRequest(payment) {
  return deliver(payment.customerEmail, reviewRequestEmail(payment));
}

