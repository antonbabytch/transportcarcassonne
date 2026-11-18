// Public certificate facts only. Do not publish the policy number or original document.
// Renewal requires a new certificate; these dates must never roll forward automatically.
export const INSURANCE = {
  insurer: 'Allianz IARD',
  certificateFrom: '2026-11-01',
  certificateUntil: '2027-10-31',
  paths: { fr: '/assurance-demenagement/', en: '/en/removal-insurance/' },
} as const;

export const INSURANCE_FAQS = {
  fr: [
    { q: 'Votre entreprise est-elle assurée ?', a: 'Transport Carcassonne dispose d’une attestation Allianz IARD pour un contrat Allianz Solution Entreprise comprenant la responsabilité civile professionnelle, pour une activité de déménagement sans garde-meubles. L’attestation indique la période du 1er novembre 2026 au 31 octobre 2027, sous réserve du paiement des cotisations. Elle est disponible sur demande ; les conditions, limites et exclusions du contrat restent applicables.' },
    { q: 'Mon piano ou un objet de valeur est-il couvert ?', a: 'La couverture d’un piano, notamment à queue, ou d’un objet de valeur ne peut pas être déduite de la seule attestation de responsabilité civile. Signalez sa valeur estimée, ses dimensions, son poids et les accès. La faisabilité et les garanties applicables doivent être confirmées par écrit avant toute réservation, avec l’assureur si nécessaire.' },
    { q: 'Tous mes biens sont-ils assurés à leur valeur totale ?', a: 'L’attestation ne constitue pas une assurance tous risques ni une promesse de remboursement intégral. Le périmètre, les plafonds, les franchises et les exclusions dépendent du contrat et du dossier. Une déclaration de valeur ne crée pas, à elle seule, une garantie supplémentaire.' },
    { q: 'Comment obtenir votre attestation ?', a: 'Demandez-la par e-mail à contact@transportcarcassonne.fr, en précisant votre projet et sa date. Le document vous est transmis directement. Pour une intervention après le 31 octobre 2027, demandez une attestation renouvelée.' },
  ],
  en: [
    { q: 'Is your business insured?', a: 'Transport Carcassonne holds an Allianz IARD certificate for an Allianz Solution Entreprise policy including professional civil liability for removals without furniture storage. The certificate states a period from 1 November 2026 to 31 October 2027, subject to payment of premiums. It is available on request; policy terms, limits and exclusions apply.' },
    { q: 'Is my piano or valuable item covered?', a: 'Cover for a piano, particularly a grand piano, or a valuable item cannot be established from the liability certificate alone. Please provide its estimated value, dimensions, weight and access details. Feasibility and applicable cover must be confirmed in writing before booking, with the insurer where necessary.' },
    { q: 'Are all my belongings insured for their full value?', a: 'The certificate is not an all-risks policy or a promise of full reimbursement. Scope, limits, excesses and exclusions depend on the policy and the particular job. A declaration of value does not, by itself, create additional insurance cover.' },
    { q: 'How can I obtain your insurance certificate?', a: 'Email contact@transportcarcassonne.fr with your project and planned date. We provide the document directly. For work after 31 October 2027, please request a renewed certificate.' },
  ],
} as const;
