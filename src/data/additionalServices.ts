import type { HighIntentPage } from './highIntentPages';
import type { EnglishPage } from './englishPages';

type LocalService = {
  slug: string; englishSlug: string;
  title: string; englishTitle: string;
  intro: string; englishIntro: string;
  context: string[]; englishContext: string[];
  checklist: string[]; englishChecklist: string[];
  faqs: { q: string; a: string }[]; englishFaqs: { q: string; a: string }[];
};

export const ADDITIONAL_SERVICES: LocalService[] = [
  {
    slug: 'livraison-leboncoin-carcassonne', englishSlug: 'marketplace-furniture-collection-carcassonne',
    title: 'Livraison Leboncoin et meubles d’occasion à Carcassonne',
    englishTitle: 'Marketplace furniture collection in Carcassonne',
    intro: 'Le canapé vous plaît, mais il ne rentre pas dans votre voiture ? Faites étudier le retrait chez un particulier et la livraison chez vous, à Carcassonne et dans les environs. Une demande pour aujourd’hui ou demain reste possible selon le planning.',
    englishIntro: 'Found the right sofa on Leboncoin or Facebook Marketplace but cannot collect it? Ask about collection from a private seller and delivery to your home in Carcassonne or the surrounding area. Same-day or next-day requests depend on availability.',
    context: [
      'Avant de réserver le transport, confirmez avec le vendeur que le meuble est disponible, son état et ses dimensions. Une photo de l’annonce ne permet pas toujours de savoir si un canapé passe dans une cage d’escalier ou si une armoire peut être démontée.',
      'Le devis porte sur le transport et la manutention convenus, pas sur l’achat. Vous réglez directement le vendeur et lui transmettez le nom de la personne autorisée à retirer le bien. Nous ne sommes affiliés ni à Leboncoin ni à Facebook Marketplace.',
      'Plusieurs retraits peuvent être regroupés dans une même demande si les horaires des vendeurs et le volume le permettent. Indiquez chaque arrêt avant le devis. Une attente, un étage supplémentaire ou un démontage non annoncé peuvent modifier le périmètre à confirmer.',
    ],
    englishContext: [
      'Before booking transport, confirm availability, condition and exact dimensions with the seller. Check the collection and delivery staircases, doors and parking: a sofa that fits in the van may not fit through the front door.',
      'Pay the seller directly and authorise release to the agreed collection contact. The transport quote does not include purchasing, appraising or guaranteeing the item. Transport Carcassonne is independent of Leboncoin and Facebook Marketplace.',
      'If you are furnishing a second home from the UK, list each seller and nominate an authorised person for delivery. Multiple collections may be combined if the route, load and sellers’ time windows allow it. Any dismantling, stairs or waiting time must be agreed in advance.',
    ],
    checklist: ['Photos, dimensions et poids connu du meuble', 'Adresses de retrait et de livraison', 'Étages, ascenseurs, largeur des portes et stationnement', 'Créneau confirmé avec le vendeur et contact autorisé', 'Meuble déjà démonté ou démontage à étudier'],
    englishChecklist: ['Photos, dimensions and known weight', 'Collection and delivery locations', 'Floors, lifts, door widths and parking', 'Seller’s confirmed time window and authorised contact', 'Whether dismantling or reassembly is needed'],
    faqs: [
      { q: 'Pouvez-vous récupérer un canapé acheté sur Leboncoin ?', a: 'Oui, la demande peut être étudiée avec les dimensions, les deux adresses et les accès. Le vendeur doit confirmer le retrait et le paiement doit être réglé entre vous.' },
      { q: 'Le retrait peut-il avoir lieu aujourd’hui ?', a: 'Appelez pour vérifier le planning. La disponibilité du vendeur, les accès, le personnel nécessaire et le tarif doivent être confirmés avant le départ.' },
      { q: 'Pouvez-vous vérifier l’état du meuble à ma place ?', a: 'Le transport ne remplace pas votre contrôle avant achat. Toute demande de photos au retrait doit être convenue ; elle ne constitue ni une expertise ni une garantie sur le bien acheté.' },
    ],
    englishFaqs: [
      { q: 'Can you collect a sofa bought on Leboncoin?', a: 'Yes, subject to dimensions, weight, access and availability. Agree payment directly with the seller and authorise collection before the appointment.' },
      { q: 'Can I arrange delivery while I am in the UK?', a: 'Send the details in English and nominate an authorised person to receive the item. Any key arrangements and photographs must be agreed before booking.' },
      { q: 'Can you collect today?', a: 'Call with the seller’s time window and both addresses. Same-day collection is only confirmed once the schedule, access and written price have been checked.' },
    ],
  },
  {
    slug: 'transport-box-stockage-carcassonne', englishSlug: 'storage-unit-transport-carcassonne',
    title: 'Transport vers un box de stockage à Carcassonne', englishTitle: 'Storage unit transport in Carcassonne',
    intro: 'Entre deux logements, pendant des travaux ou pour libérer une pièce : faites transporter vos meubles et cartons vers le box que vous avez choisi, puis organisez leur retour quand vous êtes prêt.',
    englishIntro: 'Between properties, renovating a house or clearing space? Arrange furniture and box transport to the storage unit you have chosen, with a separate return delivery when you are ready.',
    context: [
      'Nous étudions le trajet et la manutention entre votre logement et votre centre de stockage. La location du box, son assurance, son accès et les conditions du centre restent à organiser directement avec l’exploitant : nous n’annonçons pas de garde-meuble nous appartenant.',
      'Vérifiez la largeur de porte, la présence d’un monte-charge, les horaires, les règles de chargement et le stationnement. Un code d’accès ne vaut pas automatiquement autorisation de retrait : le titulaire du contrat doit confirmer les personnes habilitées.',
      'Pour préparer la sortie du box, étiquetez les cartons par pièce et gardez les éléments utiles accessibles. Les meubles doivent être secs et prêts au stockage. Le retour constitue une nouvelle intervention, à chiffrer selon les adresses et la date réelles.',
    ],
    englishContext: [
      'This service covers the agreed transport and handling between your property and a storage facility. You arrange the storage contract, cover, fees and access directly with its operator. We do not advertise or provide our own storage facility.',
      'Check loading hours, parking, lifts, trolleys and the route to the unit. The named renter must authorise collection or delivery. Share any access instructions through an agreed private channel, not in public photographs.',
      'For a renovation or a gap between purchase and completion, prepare a labelled inventory and identify items needed first on return. Furniture should be dry and suitable for storage. Return delivery is quoted separately against its actual route and date.',
    ],
    checklist: ['Adresse et numéro de zone du centre, sans code confidentiel dans la demande', 'Volume, liste des meubles et cartons', 'Horaires autorisés et présence d’un monte-charge', 'Personne titulaire du box et contact habilité sur place', 'Transport aller seul ou projet de retour ultérieur'],
    englishChecklist: ['Storage facility location, without confidential access codes', 'Inventory of furniture and boxes', 'Loading hours, lift and parking restrictions', 'Renter’s authorisation and on-site contact', 'One-way transfer or a future return delivery'],
    faqs: [
      { q: 'Louez-vous aussi le box ?', a: 'Non. Cette prestation concerne le transport. Vous choisissez le centre et contractez directement avec lui pour le stockage et ses conditions.' },
      { q: 'Pouvez-vous récupérer seulement quelques meubles dans mon box ?', a: 'Oui, après accord sur l’inventaire et l’autorisation du titulaire. Les biens doivent pouvoir être identifiés et accessibles, sinon le temps de manutention doit être réévalué.' },
      { q: 'Le retour est-il inclus dans le prix ?', a: 'Uniquement s’il figure explicitement dans le devis accepté. Un retour à une autre date ou adresse nécessite une confirmation spécifique.' },
    ],
    englishFaqs: [
      { q: 'Do you rent storage units?', a: 'No. We quote for transport and agreed handling. You choose and contract with the storage operator separately.' },
      { q: 'Can you collect a few items from an existing unit?', a: 'Yes, subject to the renter’s authorisation, a clear inventory and access to the selected items. Reorganising the rest of the unit must be included in the agreed scope if needed.' },
      { q: 'Is return delivery included?', a: 'Only if explicitly stated in the accepted quote. A later return or a different address requires its own confirmed arrangements.' },
    ],
  },
  {
    slug: 'transport-etudiant-carcassonne', englishSlug: 'student-moves-carcassonne',
    title: 'Déménagement étudiant à Carcassonne', englishTitle: 'Student room removals in Carcassonne',
    intro: 'Une chambre, un studio, quelques cartons et un bureau : demandez un transport adapté au volume réel, pour une entrée en résidence, un changement de colocation ou un départ en fin d’année.',
    englishIntro: 'Moving into a student room, studio or shared house? Request transport for the actual load: boxes, a desk, a mattress or a small room’s contents, with collection and delivery planned around access and key handover.',
    context: [
      'Un petit volume ne nécessite pas toujours une formule de déménagement complète. Préparez une liste : cartons, valises, literie, bureau et électroménager. Le prix dépend du trajet, des accès, du portage et des personnes nécessaires, pas uniquement de la surface du studio.',
      'Les résidences peuvent imposer un horaire de livraison ou limiter l’accès aux véhicules. Vérifiez la remise des clés, l’état des lieux, l’ascenseur et le stationnement auprès du gestionnaire avant de choisir le créneau.',
      'Indiquez si les dates sont flexibles et si tout sera emballé avant notre arrivée. Un regroupement de trajets peut être étudié quand le planning s’y prête, mais aucune remise ni place partagée n’est garantie sans confirmation.',
    ],
    englishContext: [
      'Send a short inventory rather than only the room size: boxes, suitcases, bedding, a desk and any appliances. The quote depends on the route, stairs, carrying distance and required handling, not just the number of square metres.',
      'Check key collection, inventory appointments, residence delivery hours and vehicle access with the property manager. Allow time between leaving the old room and accessing the new one; waiting or storage is not automatically included.',
      'Tell us if dates are flexible and whether everything will be packed before collection. A shared route may be considered when a real matching trip exists, but no student discount or shared space is promised before confirmation.',
    ],
    checklist: ['Liste des cartons, valises et meubles', 'Deux adresses, étages et ascenseurs', 'Horaires de remise des clés et état des lieux', 'Date souhaitée et souplesse possible', 'Aide au portage ou démontage à prévoir dans le devis'],
    englishChecklist: ['List of boxes, suitcases and furniture', 'Both locations, floors and lifts', 'Key handover and inventory appointment times', 'Preferred date and any flexibility', 'Handling or dismantling to include in the quote'],
    faqs: [
      { q: 'Peut-on transporter uniquement des cartons et un matelas ?', a: 'Oui, décrivez leur nombre, les dimensions du matelas et les accès. Le créneau et le prix dépendent du trajet et de la manutention nécessaires.' },
      { q: 'Y a-t-il un tarif étudiant fixe ?', a: 'Aucun forfait étudiant unique n’est annoncé. Le devis est adapté au volume, à la distance et aux accès ; indiquez votre flexibilité pour étudier les possibilités.' },
      { q: 'Mes parents peuvent-ils organiser le transport ?', a: 'Oui, désignez un interlocuteur principal et confirmez qui autorise le retrait des biens et qui les réceptionne.' },
    ],
    englishFaqs: [
      { q: 'Can you move just boxes and a mattress?', a: 'Yes. Send quantities, mattress dimensions and access details so availability and a suitable quote can be checked.' },
      { q: 'Is there a fixed student price?', a: 'There is no universal student rate. The written quote reflects the actual load, route and access. Mention flexible dates so options can be considered.' },
      { q: 'Can a parent arrange the move?', a: 'Yes. Agree a main contact and confirm who authorises collection and who will receive the belongings.' },
    ],
  },
];

export const ADDITIONAL_FRENCH_PAGES: HighIntentPage[] = ADDITIONAL_SERVICES.map(service => ({
  slug: service.slug, eyebrow: 'Transport local · Carcassonne et alentours',
  title: service.title, metaTitle: service.title,
  metaDescription: `${service.title} : transport sur devis selon les biens, les accès et la date. Contact direct, créneau confirmé avant intervention.`,
  intro: service.intro,
  quote: { source: service.slug, service: service.slug, depart: 'Carcassonne' },
  embedQuoteForm: true, primaryCta: 'Demander un devis', ctaTitle: 'Décrivez votre transport',
  ctaSubtitle: 'Votre email est obligatoire pour recevoir une réponse écrite. Le créneau et le prix sont confirmés avant intervention.',
  contextTitle: 'Une prestation adaptée à votre situation', context: service.context,
  profiles: [
    { title: 'Un objet ou un petit volume', text: 'Listez chaque élément, ses dimensions et son poids connu pour déterminer la manutention nécessaire.' },
    { title: 'Aujourd’hui ou demain', text: 'Appelez avec les deux adresses et l’heure limite. Une intervention urgente dépend du planning réel.' },
    { title: 'Une organisation à distance', text: 'Désignez les contacts autorisés au retrait et à la livraison ; les accès doivent être convenus avant le déplacement.' },
  ],
  method: [
    { title: 'Décrire', text: 'Transmettez l’inventaire, les lieux et votre date souhaitée.' },
    { title: 'Vérifier', text: 'Précisez étages, ascenseurs, portes, stationnement et portage.' },
    { title: 'Confirmer', text: 'Validez le devis écrit, les prestations et le créneau disponible.' },
    { title: 'Réceptionner', text: 'Prévoyez une personne autorisée et contrôlez les biens à la livraison.' },
  ],
  checklistTitle: 'Les informations utiles pour votre devis', checklistIntro: 'Pas besoin d’un dossier compliqué : préparez ces éléments avant de nous contacter.', checklist: service.checklist,
  callout: { title: 'Le devis définit ce qui est compris', text: 'Un prix et un créneau ne sont acquis qu’après confirmation. Emballage, démontage, étage, attente et arrêt supplémentaire doivent être signalés avant intervention.' },
  faqs: service.faqs,
  related: [
    { label: 'Transport urgent', href: '/transport-urgent-carcassonne/', text: 'Une demande locale pour aujourd’hui ou demain.' },
    { label: 'Livraison magasin', href: '/livraison-meubles-magasins-carcassonne/', text: 'Retirer un achat volumineux dans un commerce.' },
    { label: 'Emballage et cartons', href: '/emballage-cartons-carcassonne/', text: 'Préparer les biens et préciser les options.' },
  ],
}));

export const ADDITIONAL_ENGLISH_PAGES: EnglishPage[] = ADDITIONAL_SERVICES.map(service => ({
  slug: service.englishSlug, title: service.englishTitle, heading: service.englishTitle,
  description: `${service.englishTitle}. Local collection and delivery, English enquiries and a written quote based on your inventory, access and date.`,
  eyebrow: 'Local transport · Carcassonne and the Aude', intro: service.englishIntro,
  frenchPath: `/${service.slug}/`, image: '/images/demenagement-ville.webp', imageAlt: 'Transport and removal service in the Carcassonne area',
  serviceName: service.englishTitle, formService: service.slug,
  highlights: [{ value: 'English', label: 'Written enquiries welcome' }, { value: 'Local', label: 'Carcassonne and nearby towns' }, { value: 'On request', label: 'Date and price confirmed first' }],
  sections: [
    { title: 'How this service works', paragraphs: service.englishContext },
    { title: 'What to send for an accurate quote', paragraphs: ['Share the practical details below. Do not include identity documents, banking information or confidential access codes in the form.'], bullets: service.englishChecklist },
    { title: 'Need collection today or tomorrow?', paragraphs: ['Call with both locations, the inventory and the latest possible delivery time. Urgent work is only accepted when the actual schedule, access and handling resources allow it. No slot or rate is guaranteed before confirmation.'] },
  ],
  steps: [
    { title: 'Describe the load', text: 'Send the inventory, route and preferred date in English.' },
    { title: 'Check access', text: 'Confirm floors, lifts, parking and collection permissions.' },
    { title: 'Agree the quote', text: 'Check the written scope, available time slot and price.' },
    { title: 'Arrange reception', text: 'Nominate an authorised contact and check the goods on delivery.' },
  ],
  faqs: service.englishFaqs,
  related: [
    { title: 'Urgent local transport', href: '/en/urgent-transport-carcassonne/', text: 'Today or tomorrow, subject to availability.' },
    { title: 'Second-home removals', href: '/en/second-home-removals-carcassonne/', text: 'Plan a villa or holiday-home delivery from abroad.' },
    { title: 'Furniture delivery', href: '/en/furniture-delivery-carcassonne/', text: 'Shop collections and bulky purchases.' },
  ],
}));
