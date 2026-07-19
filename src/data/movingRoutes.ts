export type MovingRoute = {
  slug: string;
  destination: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  distance: string;
  drivingTime: string;
  corridor: string;
  intro: string;
  routeContext: string[];
  accessTitle: string;
  accessNotes: string[];
  officialParkingUrl: string;
  officialParkingLabel: string;
  officialParkingSummary: string;
  secondarySourceUrl?: string;
  secondarySourceLabel?: string;
  planning: { label: string; title: string; text: string }[];
  pricingFactors: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export const MOVING_ROUTES: MovingRoute[] = [
  {
    slug: 'toulouse',
    destination: 'Toulouse',
    region: 'Haute-Garonne',
    metaTitle: 'Déménagement Carcassonne Toulouse | Organisation et devis',
    metaDescription: 'Préparez un déménagement Carcassonne–Toulouse : volume, A61, accès aux deux logements, stationnement officiel à Toulouse et devis selon le projet réel.',
    distance: 'environ 95 km',
    drivingTime: 'environ 1 h 10 hors arrêts et circulation',
    corridor: 'A61, selon les adresses et les conditions du jour',
    intro: 'Ce trajet relie deux villes proches, mais les temps de chargement et d’accès pèsent souvent davantage que la conduite elle-même. Les deux adresses, le volume et le stationnement doivent être vérifiés avant le chiffrage.',
    routeContext: [
      'La liaison habituelle emprunte l’A61. La durée annoncée par un calculateur routier ne comprend ni le portage, ni le chargement, ni les pauses, ni la circulation à l’approche de Toulouse. Un planning réaliste sépare ces postes.',
      'Au départ, une adresse dans la Bastide Saint-Louis ou la Cité peut imposer une réservation, un portage plus long ou un véhicule adapté. À l’arrivée, les règles dépendent du quartier toulousain, de la longueur du véhicule et de la gêne occasionnée à la circulation.',
      'Le devis doit préciser les prestations aux deux adresses : protection, manutention, transport, démontage éventuel et mise en place. Le simple kilométrage ne permet pas d’en déduire un prix fiable.',
    ],
    accessTitle: 'À Toulouse : anticiper l’arrêté de stationnement',
    accessNotes: [
      'Repérer l’emplacement possible au plus près de l’entrée et mesurer la distance de portage.',
      'Signaler un centre-ville, une aire à accès limité, un couloir de bus ou une rue qui devrait être fermée.',
      'Vérifier les dimensions du véhicule par rapport aux restrictions indiquées pour le secteur.',
      'Conserver la décision municipale et respecter les prescriptions de signalisation reçues.',
    ],
    officialParkingUrl: 'https://metropole.toulouse.fr/demarches/demenagement-demander-un-arrete-de-circulation-ou-stationnement',
    officialParkingLabel: 'Démarche officielle de Toulouse Métropole',
    officialParkingSummary: 'Toulouse Métropole indique actuellement une demande cinq jours ouvrés à l’avance pour une place de stationnement, délai pouvant passer à dix jours en cas de gêne à la circulation. Les conditions peuvent évoluer : la page officielle et l’arrêté délivré font foi.',
    planning: [
      { label: 'J-21', title: 'Inventaire et adresses', text: 'Lister mobilier, cartons, étages, ascenseurs, caves et conditions d’accès des deux logements.' },
      { label: 'J-15', title: 'Stationnement', text: 'Vérifier les démarches à Carcassonne et à Toulouse, puis déposer les demandes dans les délais applicables.' },
      { label: 'J-7', title: 'Déroulé confirmé', text: 'Valider horaires, contacts, clés, volume final et consignes de signalisation.' },
      { label: 'Jour J', title: 'Contrôle des deux sites', text: 'Faire le point sur l’inventaire au départ et noter les réserves éventuelles à la réception.' },
    ],
    pricingFactors: [
      { title: 'Volume réel', text: 'Le mobilier démonté, les cartons, la cave et le garage doivent être comptés.' },
      { title: 'Accès', text: 'Étages, ascenseur, portage et stationnement modifient le temps de manutention.' },
      { title: 'Date et horaire', text: 'Le créneau souhaité, les contraintes d’immeuble et les autorisations structurent le planning.' },
      { title: 'Prestations', text: 'Emballage, démontage, remontage et objets particuliers doivent être chiffrés explicitement.' },
    ],
    faqs: [
      { q: 'Le trajet Carcassonne–Toulouse peut-il être réalisé dans la journée ?', a: 'Cela dépend du volume, des accès, du créneau autorisé et du temps de manutention aux deux adresses. La durée routière seule ne permet pas de confirmer le planning.' },
      { q: 'Qui effectue la demande de stationnement à Toulouse ?', a: 'Le client ou le professionnel peut la préparer selon l’organisation convenue. Vérifiez dans le devis qui en a la charge et qui fournit ou pose la signalisation prévue par l’arrêté.' },
      { q: 'Comment obtenir un prix pour ce trajet ?', a: 'Transmettez les adresses, l’inventaire ou le volume, les étages, les ascenseurs, la distance de portage, la date et les options souhaitées. Un devis peut ensuite être établi sur ce périmètre.' },
    ],
  },
  {
    slug: 'montpellier',
    destination: 'Montpellier',
    region: 'Hérault',
    metaTitle: 'Déménagement Carcassonne Montpellier | Accès et devis',
    metaDescription: 'Organisez un déménagement Carcassonne–Montpellier : trajet A61/A9, volume, accès à l’Écusson ou aux quartiers, stationnement et devis détaillé.',
    distance: 'environ 150 km',
    drivingTime: 'environ 1 h 40 hors arrêts et circulation',
    corridor: 'A61 puis A9, selon les adresses et les conditions du jour',
    intro: 'Sur cet axe, il faut articuler trajet autoroutier, manutention aux deux logements et règles d’accès propres au quartier d’arrivée. L’Écusson et les aires piétonnes demandent une préparation différente d’une résidence disposant d’un parking privé.',
    routeContext: [
      'L’itinéraire habituel rejoint l’A9 après l’A61. Une marge est nécessaire pour les pauses, les conditions de circulation et les manœuvres ; elle ne doit pas être confondue avec le temps de manutention.',
      'À Montpellier, l’adresse exacte change fortement le scénario. Un accès en aire piétonne, un arrêt limité dans le temps, un sous-sol dont le gabarit est insuffisant ou un immeuble sans ascenseur nécessitent des informations précises avant le devis.',
      'Photographier la rue, l’entrée et l’ascenseur permet de choisir un mode opératoire cohérent. Toute autorisation doit être demandée auprès du service compétent et confirmée avant l’intervention.',
    ],
    accessTitle: 'À Montpellier : distinguer voirie et aire piétonne',
    accessNotes: [
      'Identifier si l’adresse se situe dans l’Écusson ou une autre aire piétonne réglementée.',
      'Vérifier si un accès temporaire est nécessaire pour le véhicule de déménagement.',
      'Contrôler la hauteur des parkings, le rayon de braquage et le point de déchargement autorisé.',
      'Informer le syndic ou la résidence et réserver l’ascenseur si leur règlement l’exige.',
    ],
    officialParkingUrl: 'https://www.montpellier.fr/vie-quotidienne/vivre-ici/se-deplacer-aire-pietonne-montpellier',
    officialParkingLabel: 'Règles officielles des aires piétonnes de Montpellier',
    officialParkingSummary: 'La Ville présente une procédure d’accès temporaire pour les déménagements dans ses aires piétonnes et rappelle que le stationnement y est interdit. Selon l’adresse, vérifiez aussi les règles générales de voirie auprès de la Ville. Les prescriptions reçues restent prioritaires.',
    planning: [
      { label: 'J-21', title: 'Qualifier les deux accès', text: 'Obtenir photos, étages, ascenseurs, parkings et contraintes de copropriété.' },
      { label: 'J-15', title: 'Vérifier les autorisations', text: 'Identifier l’aire piétonne ou la zone de stationnement et contacter le service compétent.' },
      { label: 'J-7', title: 'Fixer l’ordre de chargement', text: 'Séparer le nécessaire à l’arrivée et les objets qui doivent être installés en premier.' },
      { label: 'Jour J', title: 'Respecter le créneau d’accès', text: 'Garder les justificatifs disponibles et maintenir libres les circulations communes.' },
    ],
    pricingFactors: [
      { title: 'Volume et véhicule', text: 'L’inventaire conditionne le véhicule, l’effectif et la durée de chargement.' },
      { title: 'Portage urbain', text: 'Une aire piétonne ou un stationnement éloigné augmente la distance de manutention.' },
      { title: 'Trajet', text: 'Distance, péages éventuels et organisation du retour sont intégrés au chiffrage.' },
      { title: 'Protection et montage', text: 'Les prestations demandées à chaque adresse doivent être listées séparément.' },
    ],
    faqs: [
      { q: 'Peut-on stationner directement dans l’Écusson ?', a: 'L’Écusson est une aire piétonne réglementée. Il faut vérifier la procédure d’accès temporaire auprès de la Ville et respecter la durée et les conditions accordées.' },
      { q: 'Le temps de route affiché correspond-il à la durée du déménagement ?', a: 'Non. Il faut ajouter chargement, protection, pauses, circulation, portage et déchargement. Le planning dépend également des horaires autorisés aux deux adresses.' },
      { q: 'Quelles informations envoyer pour un devis Carcassonne–Montpellier ?', a: 'Envoyez les deux adresses complètes, les étages, les accès, l’inventaire, les objets particuliers, la date et les prestations souhaitées. Des photos ou une visite peuvent compléter l’évaluation.' },
    ],
  },
  {
    slug: 'perpignan',
    destination: 'Perpignan',
    region: 'Pyrénées-Orientales',
    metaTitle: 'Déménagement Carcassonne Perpignan | Planning et devis',
    metaDescription: 'Préparez un déménagement Carcassonne–Perpignan : itinéraire A61/A9, accès, délai municipal de stationnement, volume et devis personnalisé.',
    distance: 'environ 115 km',
    drivingTime: 'environ 1 h 15 hors arrêts et circulation',
    corridor: 'A61 puis A9, selon les adresses et les conditions du jour',
    intro: 'Le trajet est relativement court, mais un accès central ou une demande tardive de stationnement peut compliquer toute la journée. À Perpignan, la Ville demande d’anticiper l’occupation du domaine public.',
    routeContext: [
      'L’itinéraire courant suit l’A61 puis l’A9. La durée varie avec les points exacts de départ et d’arrivée, les pauses et la circulation ; elle reste distincte du temps de protection, chargement et déchargement.',
      'À l’arrivée, une rue du centre, une fermeture temporaire ou l’absence d’emplacement proche peut augmenter le portage. La disponibilité d’un ascenseur doit aussi être confirmée avec la résidence ou le syndic.',
      'Pour éviter une hypothèse fragile, le devis doit partir d’un inventaire et de photographies des accès. Les objets lourds ou hors gabarit doivent être signalés avec leurs dimensions et leur poids approximatif.',
    ],
    accessTitle: 'À Perpignan : prévoir le délai d’instruction',
    accessNotes: [
      'Déterminer si le véhicule occupera le domaine public ou si une voie doit être temporairement fermée.',
      'Déposer la demande suffisamment tôt avec l’adresse, la date, le véhicule et l’emprise souhaitée.',
      'Lire les prescriptions de l’arrêté avant d’organiser la signalisation et le créneau.',
      'Prévoir une solution de portage si l’emplacement demandé n’est pas accordé ou se trouve éloigné.',
    ],
    officialParkingUrl: 'https://www.mairie-perpignan.fr/demarches/travaux-demenagements-et-livraisons',
    officialParkingLabel: 'Démarche officielle de la Ville de Perpignan',
    officialParkingSummary: 'La Ville de Perpignan indique actuellement un délai d’instruction de deux semaines pour une demande d’arrêté temporaire de stationnement ou de fermeture de voie. Vérifiez la procédure en vigueur au moment du projet.',
    planning: [
      { label: 'J-21', title: 'Volume et accès', text: 'Rassembler l’inventaire et les informations des deux logements avant la demande de devis.' },
      { label: 'J-15', title: 'Démarche de voirie', text: 'Tenir compte du délai annoncé par Perpignan et des démarches applicables au départ à Carcassonne.' },
      { label: 'J-7', title: 'Confirmation finale', text: 'Mettre à jour le nombre de cartons, les objets ajoutés et les contacts d’accès.' },
      { label: 'Jour J', title: 'Réception documentée', text: 'Contrôler le mobilier et porter les réserves utiles sur le bulletin de livraison.' },
    ],
    pricingFactors: [
      { title: 'Inventaire', text: 'Le nombre de meubles, cartons et objets spéciaux détermine le volume utile.' },
      { title: 'Manutention', text: 'Étages, escaliers, ascenseur et portage influencent le temps d’intervention.' },
      { title: 'Itinéraire', text: 'Distance, péages éventuels et organisation globale figurent dans le chiffrage.' },
      { title: 'Options', text: 'Cartons, emballage et montage sont chiffrés seulement s’ils sont demandés.' },
    ],
    faqs: [
      { q: 'Quel délai prévoir pour le stationnement à Perpignan ?', a: 'La page officielle indique actuellement deux semaines d’instruction pour les demandes liées à un déménagement, une livraison ou des travaux. Vérifiez ce délai au moment du dépôt.' },
      { q: 'Un déménagement Carcassonne–Perpignan est-il facturé uniquement au kilomètre ?', a: 'Non. Le volume, les accès, la manutention, la date, l’effectif et les prestations demandées comptent avec le trajet.' },
      { q: 'Faut-il transmettre des photos des deux rues ?', a: 'C’est recommandé lorsque le stationnement, la largeur, les marches ou la distance de portage ne sont pas évidents. Les photos complètent l’adresse et l’inventaire.' },
    ],
  },
  {
    slug: 'bordeaux',
    destination: 'Bordeaux',
    region: 'Gironde',
    metaTitle: 'Déménagement Carcassonne Bordeaux | Accès, ZFE et devis',
    metaDescription: 'Préparez un déménagement Carcassonne–Bordeaux : trajet A61/A62, volume, accès, AOT, ZFE bordelaise et devis établi selon les deux adresses.',
    distance: 'environ 335 km',
    drivingTime: 'environ 3 h 20 hors arrêts et circulation',
    corridor: 'A61 puis A62, selon les adresses et les conditions du jour',
    intro: 'Ce trajet demande de coordonner plusieurs heures de conduite, la manutention aux deux logements et les règles d’accès dans la métropole bordelaise. L’adresse d’arrivée doit être vérifiée à la fois pour le stationnement et pour la circulation du véhicule.',
    routeContext: [
      'L’itinéraire courant rejoint Toulouse par l’A61 puis Bordeaux par l’A62. Le temps routier indicatif ne comprend pas les pauses, les conditions de circulation autour des agglomérations, ni les opérations de chargement et de déchargement.',
      'À Bordeaux, un logement dans l’hypercentre, une aire à accès contrôlé, une rue proche du tramway ou une adresse sans emplacement privé peut nécessiter un repérage détaillé. La largeur de la rue, le gabarit du véhicule et la distance de portage doivent être communiqués avant le devis.',
      'La métropole dispose également d’une Zone à faibles émissions à l’intérieur de la rocade. La conformité du véhicule et la présence de la vignette Crit’Air doivent être contrôlées indépendamment de l’autorisation de stationnement.',
    ],
    accessTitle: 'À Bordeaux : vérifier AOT et accès à la ZFE',
    accessNotes: [
      'Identifier si le chargement ou le déchargement nécessite d’occuper temporairement le domaine public.',
      'Sélectionner la commune exacte : les démarches diffèrent entre Bordeaux et les autres communes de la métropole.',
      'Vérifier si l’adresse se trouve dans le périmètre intra-rocade de la ZFE et contrôler la situation du véhicule.',
      'Photographier la rue, l’entrée, les marches et l’ascenseur, puis confirmer le point de déchargement autorisé.',
    ],
    officialParkingUrl: 'https://entreprendre.bordeaux-metropole.fr/projets-immobiliers-fonciers-urbanisme/dans-quels-cas-demander-une-aot-bordeaux-metropole',
    officialParkingLabel: 'Procédure officielle d’AOT de Bordeaux Métropole',
    officialParkingSummary: 'Bordeaux Métropole rappelle que toute occupation de l’espace public doit être autorisée et renvoie, pour la commune de Bordeaux, vers son téléservice. La Métropole indique aussi que sa ZFE couvre la zone intra-rocade, 7 jours sur 7 et 24 heures sur 24, avec vignette Crit’Air requise. Vérifiez les deux démarches au moment du projet.',
    secondarySourceUrl: 'https://entreprendre.bordeaux-metropole.fr/professionnels-comment-vous-deplacer-travailler-dans-zfe',
    secondarySourceLabel: 'Vérifier les règles officielles de la ZFE',
    planning: [
      { label: 'J-30', title: 'Inventaire complet', text: 'Lister mobilier, cartons, cave, garage et objets particuliers, puis documenter les deux accès.' },
      { label: 'J-21', title: 'AOT et véhicule', text: 'Identifier la commune d’arrivée, la procédure d’occupation du domaine public et les règles ZFE applicables.' },
      { label: 'J-7', title: 'Planning confirmé', text: 'Mettre à jour le volume, les contacts, les clés et les prescriptions reçues pour le stationnement.' },
      { label: 'Jour J', title: 'Documents accessibles', text: 'Conserver autorisations, inventaire et documents de transport hors des cartons.' },
    ],
    pricingFactors: [
      { title: 'Volume et effectif', text: 'Le contenu réel détermine le véhicule, le temps de manutention et l’organisation du chargement.' },
      { title: 'Accès bordelais', text: 'Une rue contrôlée, un portage long ou un ascenseur limité modifie le déroulé à l’arrivée.' },
      { title: 'Trajet autoroutier', text: 'Distance, péages éventuels, pauses et organisation globale sont intégrés au chiffrage.' },
      { title: 'Prestations choisies', text: 'Emballage, démontage, remontage et objets particuliers doivent apparaître séparément.' },
    ],
    faqs: [
      { q: 'Faut-il une autorisation de stationnement à Bordeaux ?', a: 'Elle est à vérifier dès que le déménagement nécessite une occupation particulière du domaine public. Bordeaux Métropole renvoie vers la démarche de la commune concernée ; le document délivré fixe les conditions applicables.' },
      { q: 'La ZFE de Bordeaux concerne-t-elle un véhicule de déménagement ?', a: 'La page officielle indique que la ZFE intra-rocade concerne particuliers et professionnels et impose une vignette Crit’Air. Il faut contrôler le véhicule prévu et les règles en vigueur à la date du trajet.' },
      { q: 'Peut-on déduire le prix des 335 km ?', a: 'Non. Le kilométrage n’intègre ni le volume, ni les accès, ni le temps de manutention, ni les prestations demandées. Ces informations sont nécessaires pour établir un devis.' },
    ],
  },
  {
    slug: 'paris',
    destination: 'Paris',
    region: 'Île-de-France',
    metaTitle: 'Déménagement Carcassonne Paris | AOT et organisation',
    metaDescription: 'Organisez un déménagement Carcassonne–Paris : long trajet, inventaire, planning, AOT parisienne, stationnement et devis selon les accès réels.',
    distance: 'environ 770 km',
    drivingTime: 'environ 7 h 30 hors arrêts et circulation',
    corridor: 'A61 puis A20, A71 et A10 selon l’itinéraire retenu',
    intro: 'Un déménagement vers Paris ne doit pas être planifié à partir du seul temps affiché par un GPS. La conduite, les pauses, les accès parisiens et la manutention forment un ensemble dont le déroulé doit être validé avant le départ.',
    routeContext: [
      'Plusieurs itinéraires sont possibles selon les conditions et les adresses exactes. La durée indicative ne tient pas compte des pauses, des aléas routiers, de l’entrée dans l’agglomération ni du temps nécessaire pour protéger et manipuler les biens.',
      'À Paris, l’arrondissement, la largeur de la voie, les horaires, le stationnement payant et la présence éventuelle d’un monte-meubles changent le scénario. Une photographie de la rue ne remplace pas la procédure municipale, mais elle permet d’identifier plus tôt une difficulté.',
      'Selon le volume, les accès et les règles applicables au transport, l’opération peut exiger une organisation sur plus d’une journée. Le devis doit indiquer les dates ou périodes de chargement et de livraison au lieu de laisser supposer une arrivée immédiate.',
    ],
    accessTitle: 'À Paris : déposer l’AOT au moins quinze jours avant',
    accessNotes: [
      'Déposer la demande via le service numérique de la Ville au moins quinze jours avant la date prévue.',
      'Déclarer les immatriculations via le lien transmis après accord et paiement de l’AOT.',
      'Ne pas confondre AOT et place garantie : la Ville précise que l’autorisation ne constitue pas une réservation.',
      'Signaler un monte-meubles, un stationnement hors bande payante ou un besoin supérieur à six heures.',
    ],
    officialParkingUrl: 'https://www.paris.fr/pages/faq-demenagements-4404',
    officialParkingLabel: 'Service officiel de déménagement de la Ville de Paris',
    officialParkingSummary: 'La Ville demande actuellement de déposer l’AOT au moins quinze jours avant. Elle précise que l’AOT est indispensable pour stationner hors bande payante, rester plus de six heures au même emplacement ou utiliser un monte-meubles. Elle ne réserve pas automatiquement une place et les immatriculations doivent être déclarées.',
    planning: [
      { label: 'J-45', title: 'Volume et dates possibles', text: 'Établir un inventaire complet et définir une période réaliste de chargement et de livraison.' },
      { label: 'J-21', title: 'Dossier parisien', text: 'Préparer l’AOT avec l’adresse, le véhicule, le créneau et les besoins particuliers.' },
      { label: 'J-7', title: 'Contrôles finaux', text: 'Vérifier l’accord, les immatriculations, le volume final et le contact présent à l’arrivée.' },
      { label: 'Livraison', title: 'Réception méthodique', text: 'Contrôler les biens, noter les réserves utiles et conserver le bulletin de livraison.' },
    ],
    pricingFactors: [
      { title: 'Volume à transporter', text: 'L’inventaire définit le véhicule, la protection, l’effectif et la durée des opérations.' },
      { title: 'Organisation du trajet', text: 'La distance, les pauses, les péages éventuels et le calendrier de livraison sont pris en compte.' },
      { title: 'Accès parisien', text: 'Portage, étage, ascenseur, AOT et contraintes de voie peuvent peser fortement sur le temps.' },
      { title: 'Périmètre du service', text: 'Emballage, montage et manutention particulière doivent être confirmés dans le devis.' },
    ],
    faqs: [
      { q: 'L’AOT parisienne garantit-elle une place devant l’immeuble ?', a: 'Non. La Ville indique que ses services ne réservent pas une place. L’AOT autorise des modalités de stationnement et peut prévoir une période de réservation mise en œuvre par le demandeur selon les règles indiquées.' },
      { q: 'Le trajet peut-il être chargé et livré le même jour ?', a: 'Il est impossible de le confirmer avec la seule distance. Le volume, les temps de manutention, les pauses, la circulation, l’AOT et les règles applicables doivent être intégrés au planning écrit.' },
      { q: 'Quand déposer la demande parisienne ?', a: 'La Ville de Paris demande actuellement un dépôt au moins quinze jours avant le déménagement. Il est prudent de préparer les informations plus tôt et de vérifier la procédure officielle.' },
    ],
  },
];
