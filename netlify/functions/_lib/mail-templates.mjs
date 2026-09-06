import { formatAmount } from './payment-data.mjs';

const SITE_URL = (process.env.PUBLIC_SITE_URL || 'https://transportcarcassonne.fr').replace(/\/$/, '');
const PHONE = '06 80 87 30 47';

function htmlEscape(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function greeting(payment) {
  return payment.customerName ? `Bonjour ${payment.customerName},` : 'Bonjour,';
}

function quoteLabel(payment) {
  return payment.quoteNumber ? `devis n° ${payment.quoteNumber}` : 'votre devis';
}

function paymentStatusLabel(payment) {
  if (payment.status === 'acompte-recu') return 'Acompte reçu';
  if (payment.status === 'solde-recu') return 'Solde reçu';
  if (payment.status === 'paiement-rembourse') return 'Paiement remboursé';
  if (payment.status === 'paiement-echoue') return 'Paiement échoué';
  return payment.status || 'Paiement reçu';
}

function layout(content) {
  return `<div style="font-family:Arial,sans-serif;color:#15191c;line-height:1.65;max-width:620px;margin:auto">
    <div style="border-bottom:3px solid #a8703f;padding:16px 0;font-size:20px;font-weight:700">Transport Carcassonne</div>
    <div style="padding:24px 0">${content}</div>
    <div style="border-top:1px solid #e5e1d8;padding-top:16px;color:#5c6470;font-size:13px">Transport Carcassonne · ${PHONE} · contact@transportcarcassonne.fr</div>
  </div>`;
}

export function ownerPaymentEmail(payment) {
  const amount = formatAmount(payment.amountTotal, payment.currency);
  const statusLabel = paymentStatusLabel(payment);
  const details = [
    `Montant : ${amount}`,
    `Statut : ${statusLabel}`,
    payment.quoteNumber ? `Devis : ${payment.quoteNumber}` : '',
    payment.serviceDate ? `Date de prestation : ${payment.serviceDate}` : '',
    payment.customerName ? `Client : ${payment.customerName}` : '',
    payment.customerEmail ? `Email : ${payment.customerEmail}` : '',
    `Session Stripe : ${payment.checkoutSessionId}`,
  ].filter(Boolean);

  const text = `Un paiement Stripe a été reçu.\n\n${details.join('\n')}\n\nVérifiez le paiement dans Stripe avant de confirmer définitivement la réservation.`;
  const html = layout(`<h1 style="font-size:24px">Paiement Stripe reçu</h1><ul>${details.map((line) => `<li>${htmlEscape(line)}</li>`).join('')}</ul><p>Vérifiez le paiement dans Stripe avant de confirmer définitivement la réservation.</p>`);
  return { subject: `${statusLabel}${payment.quoteNumber ? ` — devis ${payment.quoteNumber}` : ''}`, text, html };
}

export function customerConfirmationEmail(payment) {
  const amount = formatAmount(payment.amountTotal, payment.currency);
  const text = `${greeting(payment)}\n\nNous avons bien reçu votre paiement de ${amount} concernant ${quoteLabel(payment)}.\n\nVotre paiement est enregistré. Nous vous confirmerons séparément l'organisation définitive de la prestation selon les informations du devis accepté.\n\nPour toute question : ${PHONE}.\n\nTransport Carcassonne`;
  const html = layout(`<p>${htmlEscape(greeting(payment))}</p><h1 style="font-size:24px">Votre paiement a bien été reçu</h1><p>Nous avons reçu votre paiement de <strong>${htmlEscape(amount)}</strong> concernant ${htmlEscape(quoteLabel(payment))}.</p><p>Votre paiement est enregistré. Nous vous confirmerons séparément l’organisation définitive de la prestation selon les informations du devis accepté.</p><p><a href="${SITE_URL}/paiement-securise/" style="color:#6b4422">Informations sur le paiement sécurisé</a></p>`);
  return { subject: `Paiement reçu — Transport Carcassonne`, text, html };
}

export function balanceReminderEmail(payment) {
  const text = `${greeting(payment)}\n\nPetit rappel concernant ${quoteLabel(payment)} : le solde reste à régler selon les modalités et l'échéance indiquées sur votre devis ou votre facture.\n\nSi vous avez déjà effectué le règlement, ignorez simplement ce message. Pour recevoir un lien de paiement ou poser une question, contactez-nous au ${PHONE}.\n\nTransport Carcassonne`;
  const html = layout(`<p>${htmlEscape(greeting(payment))}</p><h1 style="font-size:24px">Rappel concernant le solde</h1><p>Le solde de ${htmlEscape(quoteLabel(payment))} reste à régler selon les modalités et l’échéance indiquées sur votre devis ou votre facture.</p><p>Si vous avez déjà effectué le règlement, ignorez simplement ce message. Pour recevoir un lien de paiement ou poser une question, appelez-nous au <a href="tel:+33680873047" style="color:#6b4422">${PHONE}</a>.</p>`);
  return { subject: `Rappel de solde${payment.quoteNumber ? ` — devis ${payment.quoteNumber}` : ''}`, text, html };
}

export function reviewRequestEmail(payment) {
  const reviewUrl = process.env.GOOGLE_REVIEW_URL?.trim() || `${SITE_URL}/avis/`;
  const text = `${greeting(payment)}\n\nMerci de nous avoir confié votre prestation. Si vous le souhaitez, vous pouvez partager librement votre expérience, positive comme critique : ${reviewUrl}\n\nVotre retour honnête nous aide à améliorer notre service. Aucune remise ni contrepartie n'est liée à votre avis.\n\nTransport Carcassonne`;
  const html = layout(`<p>${htmlEscape(greeting(payment))}</p><h1 style="font-size:24px">Votre retour nous aide à progresser</h1><p>Si vous le souhaitez, vous pouvez partager librement votre expérience, positive comme critique.</p><p><a href="${htmlEscape(reviewUrl)}" style="display:inline-block;background:#a8703f;color:#15100a;text-decoration:none;padding:12px 18px;border-radius:4px;font-weight:700">Partager mon avis</a></p><p style="font-size:13px;color:#5c6470">Aucune remise ni contrepartie n’est liée à votre avis.</p>`);
  return { subject: 'Votre retour sur notre prestation', text, html };
}
