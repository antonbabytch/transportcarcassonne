import nodemailer from 'nodemailer';

let transporter;

function mailSettings() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const from = process.env.PAYMENT_EMAIL_FROM?.trim() || user;

  if (!host || !Number.isInteger(port) || !user || !pass || !from) return null;
  return {
    host,
    port,
    secure: String(process.env.SMTP_SECURE ?? 'true').toLowerCase() !== 'false',
    auth: { user, pass },
    from,
  };
}

export function isMailConfigured() {
  return Boolean(mailSettings());
}

export async function sendMail({ to, subject, text, html }) {
  const settings = mailSettings();
  if (!settings) return { sent: false, reason: 'smtp-not-configured' };
  if (!to) return { sent: false, reason: 'recipient-missing' };

  transporter ??= nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: settings.auth,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const info = await transporter.sendMail({
    from: `Transport Carcassonne <${settings.from}>`,
    to,
    replyTo: process.env.PAYMENT_REPLY_TO?.trim() || settings.from,
    subject,
    text,
    html,
  });

  return { sent: true, messageId: info.messageId };
}

