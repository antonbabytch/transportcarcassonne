import type { SERVICES } from './services';

type ServiceSlug = (typeof SERVICES)[number]['slug'];
type ServiceCopy = {
  name: string;
  title: string;
  summary: string;
  body: string[];
  included: string[];
  notIncluded: string[];
  faqs: { q: string; a: string }[];
};

// Keep the paragraph, list and question structure aligned with CoreServicePage.
// Prices and images come from the same service data as the French page.
export const CORE_SERVICES_EN: Record<ServiceSlug, ServiceCopy> = {
  'demenagement-local': {
    name: 'Local removals',
    title: 'Local removals in Carcassonne and the Aude',
    summary: 'Carcassonne and nearby towns (within 50 km)',
    body: [
      'Moving in or around Carcassonne? We review the volume, both addresses, access, route and preferred date before preparing your quote.',
      'We assess moves in Carcassonne, Trèbes, Pezens, Alzonne, Capendu, Bram, Lézignan-Corbières, Limoux and Castelnaudary. The quote confirms the area, vehicle and team needed for your project.',
      'Your written quote sets out the declared load, access constraints such as stairs and carrying distance, the services you choose, price and terms. Send a room-by-room inventory to help us estimate the load.',
      'On moving day, the equipment and protection should match the accepted quote. Tell us beforehand about fragile, heavy or valuable items and any changes in access.',
      'At the destination, we unload and place your belongings in the rooms you indicate. Furniture can be put back together if requested and agreed. We use covers and careful positioning to protect it in the van.',
      'Whether you rent or own a flat or a house, the moving slot is confirmed only once we have checked availability and you have accepted the agreed terms.',
    ],
    included: ['Loading and unloading the van', 'Furniture protection with blankets', 'Transport to your destination', 'Unloading and placement', 'Securing furniture in the van', 'Detailed written quote'],
    notIncluded: ['Box packing (paid option)', 'Furniture dismantling and reassembly (paid option)', 'External lifting equipment if needed (by quote)', 'Any storage arrangement not listed in the quote'],
    faqs: [
      { q: 'How far ahead should I book a local move?', a: 'It depends on availability, volume, route and access. A slot is not guaranteed before written confirmation.' },
      { q: 'Do you offer weekend slots?', a: 'Weekend requests are assessed according to availability. Timing and conditions are confirmed in your quote.' },
      { q: 'How is the price of a local move calculated?', a: 'It depends on volume, distance, access, parking, timing and options. The €450 starting guide is indicative; the written quote gives the actual price.' },
      { q: 'What if something changes on moving day?', a: 'The cancellation and rescheduling terms and any associated charges are the ones supplied before you accepted. Contact us as soon as possible if anything changes.' },
      { q: 'Do I need to be there throughout the move?', a: 'We recommend that you or an authorised representative be present at collection and delivery. Any different arrangements should be agreed in writing beforehand.' },
      { q: 'How will my furniture be protected?', a: 'The protection needed depends on the items. Check your quote for the materials planned for furniture, appliances, screens and delicate surfaces.' },
    ],
  },
  'demenagement-longue-distance': {
    name: 'Long-distance removals',
    title: 'Long-distance removals from Carcassonne',
    summary: 'From Carcassonne to destinations across France',
    body: [
      'Moving from the Aude to another part of France? We assess the route, load, access at each address and availability before confirming a long-distance move.',
      'The vehicle, loading, route and delivery slot are planned around the volume and access at both ends. Let us know about floors, lifts, restricted streets, parking and carrying distances.',
      'Larger moves can need multiple journeys or an additional vehicle. The quote specifies the resources and team; a grouped route or dedicated vehicle is included only if agreed.',
      'Tell us about valuable items such as artwork, sound equipment or musical instruments before we quote, so we can set out the protection and any limits that apply.',
      'Packing, dismantling, reassembly and cleaning are included only if explicitly listed. Tell us if delivery depends on collecting keys or completing a property purchase.',
      'The quote reflects the declared load, distance, access and chosen services. Check how tolls, fuel, any overnight stops and applicable options are handled.',
    ],
    included: ['Loading in Carcassonne', 'Long-distance transport to your destination', 'Unloading and placement', 'Careful handling and securing', 'Updates about your move', 'Detailed written quote'],
    notIncluded: ['Box packing (optional)', 'Dismantling and reassembly (optional)', 'Overnight arrangements if needed (by quote)', 'Confirm tolls and fuel in the quote'],
    faqs: [
      { q: 'How long will a move between Paris and Carcassonne take?', a: 'Timing depends on the route, load and access. Collection and delivery windows are confirmed once we agree the logistics.' },
      { q: 'Can I travel in the removal vehicle?', a: 'Passenger transport is not included. Arrange your journey separately unless a different agreement is made in writing.' },
      { q: 'Is storage available if the dates do not line up?', a: 'No in-house storage is promised. A third-party arrangement must be confirmed and priced in writing.' },
      { q: 'Which destinations in France can you assess?', a: 'We review long-distance routes across mainland France. Send both addresses so we can check the route and schedule and confirm feasibility in writing.' },
      { q: 'How is protection planned for a long journey?', a: 'Declare fragile and valuable items. The proposal should state how belongings will be protected and secured and specify the vehicle and any applicable limits.' },
      { q: 'Do I need to arrange a return journey?', a: 'No. A one-way move can be quoted; you do not need to arrange what the vehicle does after delivery. The €950 starting price is only a guide.' },
    ],
  },
  'demenagement-international': {
    name: 'International removals',
    title: 'International removals from Carcassonne',
    summary: 'Spain, Italy and Belgium from Carcassonne',
    body: [
      'Moving abroad from Carcassonne? We assess each request according to the destination, route, formalities, providers needed and available dates.',
      'Spain is close by, but the route, access, transport rules, documents and timing still need to be confirmed for each destination.',
      'Prepare an accurate inventory of boxes, furniture, appliances, valuables and anything that might be restricted. We check the volume, access, local requirements and possible charges before booking.',
      'The quote should name the resources planned and state whether any partner carriers or freight forwarders are involved. Check their roles and responsibilities before accepting.',
      'Protection matters on a long international journey. The quote should specify the materials planned and who will pack each category of belongings.',
      'For a non-EU move or a route with specific requirements, check the formalities with the competent authorities or a qualified professional. Any referral to a freight forwarder must be confirmed in writing.',
    ],
    included: ['Door-to-door transport', 'Handling at collection and delivery', 'Advice on the formalities to check', 'Professional packing recommended', 'Unloading and placement'],
    notIncluded: ['Any customs duties and taxes', 'Parking permits (arranged by the customer)', 'Alterations to the destination property'],
    faqs: [
      { q: 'Do you cover all of Europe?', a: 'We primarily assess routes to Spain, Italy, Belgium and Luxembourg. Contact us about other European destinations; we check each route individually.' },
      { q: 'Will you handle customs for my move?', a: 'Do not assume customs handling is included. Requirements vary by the route and the goods. Agree in writing who is responsible for the documents and formalities.' },
      { q: 'How long does delivery to Spain take?', a: 'Timing depends on the destination, load, formalities, access and traffic. The proposal confirms the schedule for your move.' },
    ],
  },
  'transport-meubles': {
    name: 'Furniture transport',
    title: 'Furniture transport in Carcassonne and the Aude',
    summary: 'One item, several pieces or a delivery',
    body: [
      'Need to move one or several items without booking a full house move? We assess furniture transport for single items or a group of pieces.',
      'This can cover a shop purchase, collection from a private seller, a gift, a few items between homes, inherited furniture or a sale made online.',
      'Send a list with dimensions and approximate weights, and say whether each item is assembled or needs dismantling. We confirm the equipment and vehicle in the quote.',
      'Protection depends on the item and its value. Flag fragile surfaces, antiques or existing marks before collection, so the planned protection and any limits can be documented.',
      'We cover Carcassonne and nearby towns within 50 km. For a longer trip, ask us to assess the actual route and dates.',
      'Price depends on the load, distance and access, including stairs, parking and carrying distance. The €80 starting guide is indicative; your written quote confirms the price.',
    ],
    included: ['Furniture loading and transport', 'Protection with blankets and wrapping', 'Delivery upstairs if agreed', 'Unloading and placement', 'Scratch protection and securing'],
    notIncluded: ['Dismantling and reassembly (priced option)', 'External lift if needed (by quote)', 'Box packing (not applicable)'],
    faqs: [
      { q: 'Can you transport one sofa?', a: 'Yes, we can assess a single item. The starting guide of €80 is indicative and depends on route, weight and access.' },
      { q: 'Can you dismantle wardrobes or beds?', a: 'Dismantling and reassembly can be requested. The exact items, work and price should be listed in the quote.' },
      { q: 'Can you collect an item on the same day?', a: 'We can review an urgent request, but cannot promise a time until we have checked availability.' },
      { q: 'Can you collect from a marketplace seller?', a: 'We can assess collection from the seller and delivery to your home. The quote confirms responsibilities, timing and price.' },
      { q: 'Will my sofa fit through the stairs?', a: 'Send the furniture, doorway and staircase dimensions, including any turns. If lifting equipment is needed, we confirm feasibility and price separately.' },
      { q: 'Can furniture be collected outside the Aude?', a: 'Longer collection routes can be considered. The quote reflects the journey, timing, access and the declared load.' },
    ],
  },
  'transport-piano': {
    name: 'Piano and heavy-item transport',
    title: 'Piano and heavy-item transport in Carcassonne',
    summary: 'Pianos, safes and artworks',
    body: [
      'Moving a piano requires care. We check its actual weight, dimensions, value and the full route at both addresses before confirming the job.',
      'Our Pianoplan 600J Speedy Vertical helps with suitable piano and heavy-item moves up or down stairs. Its 600 kg rating is a maximum. Stair dimensions, landings and load capacity all need to be checked first.',
      'The quote confirms the team, handling equipment and protection required. We consider both the instrument and vulnerable flooring, doorways and walls.',
      'Send clear photos and measurements of the piano and access route to the vehicle at both addresses. Some moves need specialist preparation, partial dismantling or an external lift.',
      'We can also assess a safe, sculpture, sports equipment or bulky artwork. For each item, we check its weight, access and any handling requirements.',
      'For artwork and valuable instruments, describe the item and its value before we quote. Protection, handling limits and insurance conditions should be confirmed in writing.',
      'We assess piano and heavy-item moves in Carcassonne and within 50 km. If a long-distance move includes a piano, we plan its transport as part of the wider move.',
    ],
    included: ['Technical assessment and tailored quote', 'Pianoplan available subject to access checks', 'Protection for the instrument', 'Transport to the destination', 'Team and handling confirmed in the quote'],
    notIncluded: ['External lift if required (additional charge)', 'Specialist dismantling for a grand piano if needed', 'Piano tuning after delivery (arranged by the customer)'],
    faqs: [
      { q: 'Should I tune my piano after the move?', a: 'Tuning is recommended, particularly if temperature or humidity has changed. Ask us about a tuner in Carcassonne.' },
      { q: 'How many people are needed to move a piano?', a: 'We assess the type of instrument, floors, access and lifting equipment before confirming the required team in the quote.' },
      { q: 'Do you transport grand pianos and other keyboard instruments?', a: 'We assess grand pianos, organs and harpsichords individually. They may require specialist preparation and equipment.' },
      { q: 'Can you move a piano up a spiral staircase?', a: 'We need the weight and dimensions of the instrument, together with measurements, step counts and turns. An external lift, if feasible, can be quoted separately.' },
      { q: 'How should I prepare a high-value piano for transport?', a: 'Declare its value and tell us about any fragile or antique parts. Ask your insurer about suitable cover and agree the protection and handling arrangements in writing.' },
      { q: 'How much does long-distance piano transport cost?', a: 'It depends on the instrument, route, weight, access, protection and team required. Ask for an individual assessment; no price is guaranteed on this page.' },
    ],
  },
  'evacuation-dechets-metaux': {
    name: 'Bulky item and scrap removal',
    title: 'Bulky item and scrap removal in Carcassonne',
    summary: 'Bulky waste, scrap metal and declared materials',
    body: [
      'Need to clear bulky items, remove scrap metal or take declared waste to a suitable facility? Tell us what you need to remove so we can assess the job.',
      'We consider old furniture, broken appliances, scrap metal, non-hazardous construction waste, rubble, timber and pallets. State what the load contains before booking.',
      'A request can cover a cellar, attic, garage or plot of land. Send a list with quantities and flag anything unusually heavy. If items were left by a previous owner, make sure you have authority to remove them.',
      'The disposal route should suit each type of material. Ask for the destination, exclusions and any relevant documents to be specified in the proposal.',
      'Price depends on volume, weight, sorting, access, travel distance and disposal fees. The amount shown is only a guide; the quote confirms the price.',
      'Timing depends on the materials, equipment and availability. An urgent request can be reviewed, but timing is not guaranteed before confirmation.',
    ],
    included: ['Loading bulky waste and scrap', 'Transport to suitable facilities', 'Furniture and appliance removal', 'Scrap and assorted metals', 'Non-hazardous construction waste'],
    notIncluded: ['Hazardous materials such as asbestos or chemicals', 'Radioactive waste', 'End-of-life vehicles (specialist disposal)'],
    faqs: [
      { q: 'Do you take scrap metal for recycling?', a: 'Recyclable metals can be taken to appropriate facilities. A price adjustment may be offered depending on the quantity and quality of the metal.' },
      { q: 'Do you collect from businesses?', a: 'We can assess business requests according to the materials, volume, collection frequency and suitable disposal route.' },
      { q: 'Do you clean up or carry out a full clearance?', a: 'Cleaning is not included by default; ask about it as an option. A full house clearance is a separate service with its own scope and quote.' },
    ],
  },
};
