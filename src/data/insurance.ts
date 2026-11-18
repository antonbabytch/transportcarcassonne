// Public summary only; policy documents are supplied privately on request.
export const INSURANCE = {
  insurer: 'Allianz IARD',
  paths: { fr: '/assurance-demenagement/', en: '/en/removal-insurance/' },
} as const;

export const INSURANCE_FAQS = {
  fr: [
    { q: 'Votre entreprise est-elle assurée ?', a: 'Oui, Transport Carcassonne est assurée auprès d’Allianz. Notre attestation d’assurance est disponible sur demande.' },
    { q: 'Comment obtenir votre attestation d’assurance ?', a: 'Contactez-nous à contact@transportcarcassonne.fr. Nous vous transmettons le justificatif directement, sans publier les documents contractuels sur le site.' },
  ],
  en: [
    { q: 'Is your business insured?', a: 'Yes, Transport Carcassonne is insured with Allianz. Our insurance certificate is available on request.' },
    { q: 'How can I obtain your insurance certificate?', a: 'Contact us at contact@transportcarcassonne.fr. We provide the certificate directly; policy documents are not published on this website.' },
  ],
} as const;
