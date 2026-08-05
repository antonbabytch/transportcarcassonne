export type HighIntentPage = {
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  quote: {
    source: string;
    service: string;
    depart: string;
    logement?: string;
    distance?: string;
    urgent?: string;
  };
  primaryCta?: string;
  phoneCta?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  contextTitle: string;
  context: string[];
  profiles: { title: string; text: string }[];
  method: { title: string; text: string }[];
  checklistTitle: string;
  checklistIntro: string;
  checklist: string[];
  callout: { title: string; text: string };
  faqs: { q: string; a: string }[];
  related: { label: string; href: string; text: string }[];
};

export const HIGH_INTENT_PAGES: Record<string, HighIntentPage> = {
  entreprise: {
    slug: 'demenagement-entreprise-carcassonne',
    eyebrow: 'Bureaux, commerces et activités',
    title: 'Déménagement d’entreprise à Carcassonne',
    metaTitle: 'Déménagement entreprise Carcassonne | Devis sur mesure',
    metaDescription: 'Préparez un transfert de bureaux, commerce ou activité à Carcassonne : inventaire, accès, continuité, planning et devis détaillé selon le périmètre réel.',
    intro: 'Un transfert professionnel se prépare autour de l’activité à maintenir, des accès aux deux sites et du matériel réellement confié. Un inventaire précis permet de construire un devis lisible et un ordre d’intervention adapté.',
    quote: { source: 'landing-entreprise', service: 'demenagement-local', depart: 'Carcassonne', logement: 'bureau' },
    contextTitle: 'Un transfert professionnel ne se résume pas au transport',
    context: [
      'Le volume est un facteur important, mais il ne suffit pas. Les horaires d’accès à l’immeuble, la disponibilité d’un quai, la distance de portage, les règles du bailleur et la remise en service des postes de travail peuvent déterminer l’organisation.',
      'Avant toute proposition, il est utile de distinguer ce qui relève de la manutention et du transport, ce qui doit être préparé par vos équipes et ce qui nécessite un prestataire spécialisé. Les serveurs, machines, produits réglementés ou archives sensibles ne doivent jamais être ajoutés implicitement au périmètre.',
      'Pour limiter les interruptions, le transfert peut être découpé par zone, service ou priorité. La faisabilité d’une intervention fractionnée, en dehors des horaires d’ouverture ou sur plusieurs sites reste à confirmer dans le devis.',
    ],
    profiles: [
      { title: 'Bureaux et cabinets', text: 'Postes de travail, sièges, rangements, cartons d’archives et petits équipements, avec un plan d’implantation pour l’arrivée.' },
      { title: 'Commerces', text: 'Mobilier, réserve et matériel non réglementé, en tenant compte des horaires de livraison, de la rue et des contraintes du local.' },
      { title: 'Associations et petites structures', text: 'Transfert complet ou par lots, avec un interlocuteur désigné pour valider l’inventaire et la réception.' },
    ],
    method: [
      { title: 'Cadrer le périmètre', text: 'Lister les adresses, les dates possibles, les zones concernées et les éléments qui resteront en activité pendant le transfert.' },
      { title: 'Inventorier et photographier', text: 'Compter le mobilier, les cartons et les équipements, puis signaler dimensions, poids, fragilité et éventuelles données sensibles.' },
      { title: 'Repérer les accès', text: 'Vérifier étages, ascenseurs, quais, badges, stationnement, distance de portage et autorisations auprès des gestionnaires des deux sites.' },
      { title: 'Valider le déroulé', text: 'Faire apparaître dans le devis les prestations, exclusions, responsabilités, ordre de chargement et conditions de réception.' },
    ],
    checklistTitle: 'Informations à préparer pour le devis',
    checklistIntro: 'Plus le dossier est précis, plus il est facile de comparer une proposition à une autre et d’éviter les changements de périmètre tardifs.',
    checklist: [
      'Adresse, étage, ascenseur et contact d’accès pour chaque site',
      'Plan ou liste des bureaux, réserves et zones techniques',
      'Inventaire du mobilier avec dimensions des éléments hors gabarit',
      'Nombre estimé de cartons et d’archives',
      'Matériel informatique à transporter et intervenant chargé de le déconnecter',
      'Contraintes de sécurité, badges, confidentialité ou accueil du public',
      'Date souhaitée, créneaux autorisés et ordre de priorité à l’arrivée',
    ],
    callout: {
      title: 'Pour le matériel technique',
      text: 'Un serveur, une machine, un coffre, une œuvre ou un produit soumis à des règles particulières doit être signalé avant le devis. Son transport ne doit être considéré comme inclus qu’après confirmation écrite.',
    },
    faqs: [
      { q: 'Peut-on organiser le transfert le soir ou le week-end ?', a: 'La demande peut être étudiée, mais le créneau dépend des disponibilités, des règles d’accès aux bâtiments et des autorisations de voirie. Il doit être confirmé par écrit dans le devis.' },
      { q: 'Qui déconnecte les ordinateurs et le réseau ?', a: 'Sauf prestation expressément prévue, la sauvegarde des données, l’arrêt, la déconnexion et la remise en service relèvent de votre équipe informatique ou de votre prestataire. Le périmètre de manutention doit être écrit sans ambiguïté.' },
      { q: 'L’emballage des archives et du matériel est-il compris ?', a: 'Il dépend de la formule retenue. Le devis doit distinguer la fourniture des cartons, l’emballage, l’étiquetage, la manutention et le transport.' },
      { q: 'Comment est calculé le prix d’un déménagement professionnel ?', a: 'Le chiffrage dépend notamment du volume, des accès, de la distance, de l’effectif nécessaire, des horaires, du matériel de manutention et des prestations d’emballage. Une visite ou des photos peuvent être demandées avant d’établir le devis.' },
    ],
    related: [
      { label: 'Préparer les cartons', href: '/emballage-cartons-carcassonne/', text: 'Organisation, matériaux et étiquetage par zone.' },
      { label: 'Calculer le volume', href: '/blog/calcul-volume-demenagement-m3/', text: 'Construire un inventaire exploitable en mètres cubes.' },
      { label: 'Vérifier les documents', href: '/blog/verifier-demenageur-legal-documents/', text: 'Les contrôles utiles avant de signer un devis.' },
    ],
  },
  senior: {
    slug: 'demenagement-senior-carcassonne',
    eyebrow: 'Organisation progressive et interlocuteurs identifiés',
    title: 'Déménagement senior à Carcassonne',
    metaTitle: 'Déménagement senior Carcassonne | Organisation adaptée',
    metaDescription: 'Préparer un déménagement senior à Carcassonne : tri, inventaire, famille, résidence, accès et prestations clairement définies dans le devis.',
    intro: 'Quitter un logement occupé depuis longtemps demande souvent plus de préparation qu’un simple changement d’adresse. Le bon rythme consiste à décider tôt ce qui part, qui valide les choix et ce qui doit être réalisé par le déménageur.',
    quote: { source: 'landing-senior', service: 'demenagement-local', depart: 'Carcassonne' },
    contextTitle: 'Avancer sans imposer un rythme irréaliste',
    context: [
      'Le tri, les souvenirs, les documents et la destination de chaque meuble peuvent demander plusieurs échanges. Commencer par les pièces peu utilisées permet de conserver un quotidien stable jusqu’aux derniers jours.',
      'Lorsqu’un proche, un tuteur ou une résidence participe au projet, un interlocuteur principal doit être désigné. Il centralise les décisions, transmet les contraintes d’accès et évite des consignes contradictoires le jour du transfert.',
      'Une prestation de déménagement reste distincte des soins, de l’accompagnement médical et des démarches juridiques. Les services attendus — cartons, emballage, démontage, installation ou évacuation — doivent être décrits précisément dans le devis.',
    ],
    profiles: [
      { title: 'Changement de domicile', text: 'Préparation pièce par pièce, repérage du nouveau logement et choix des meubles compatibles avec l’espace disponible.' },
      { title: 'Entrée en résidence', text: 'Coordination avec l’établissement pour connaître le créneau, l’ascenseur, le point de livraison et les règles d’accès.' },
      { title: 'Projet suivi par la famille', text: 'Inventaire partagé et interlocuteur mandaté pour les décisions, la remise des clés et la réception des biens.' },
    ],
    method: [
      { title: 'Mesurer le nouveau logement', text: 'Relever les dimensions utiles, portes et circulations avant de décider quels meubles conserver.' },
      { title: 'Trier par destination', text: 'Séparer clairement ce qui part, reste, est donné, vendu ou confié à une filière adaptée. Rien ne doit être évacué sans validation.' },
      { title: 'Identifier les objets sensibles', text: 'Mettre à part papiers, médicaments, bijoux, clés et souvenirs irremplaçables qui ne doivent pas partir au fond du véhicule.' },
      { title: 'Préparer l’arrivée', text: 'Étiqueter les cartons par pièce et prévoir un plan simple pour installer d’abord le lit, le fauteuil et les éléments du quotidien.' },
    ],
    checklistTitle: 'Points à confirmer avant le jour J',
    checklistIntro: 'Cette liste peut être partagée entre la personne concernée, ses proches, la résidence et le professionnel.',
    checklist: [
      'Personne habilitée à valider les décisions et numéro joignable',
      'Liste des meubles avec destination dans le nouveau logement',
      'Cartons que la famille prépare et cartons éventuellement confiés au professionnel',
      'Accès, ascenseur, créneau et règles de la résidence',
      'Objets fragiles, importants ou de valeur à déclarer',
      'Clés, documents et nécessaire de première nuit conservés à part',
      'Solution confirmée pour les objets qui ne déménagent pas',
    ],
    callout: {
      title: 'Aucune évacuation sans accord clair',
      text: 'Un meuble ou un carton non destiné au nouveau logement doit être identifié et orienté vers une solution convenue. La manutention, le don, le recyclage ou la déchèterie sont des périmètres différents à préciser avant l’intervention.',
    },
    faqs: [
      { q: 'Un proche peut-il gérer le déménagement à distance ?', a: 'Oui, si son rôle est défini et si la remise des clés, les décisions d’inventaire et la réception sont organisées à l’avance. Les modalités doivent être acceptées par les parties.' },
      { q: 'Peut-on demander seulement l’emballage de certaines pièces ?', a: 'Le besoin peut être limité aux objets fragiles, à la cuisine ou à une partie du logement. La fourniture des matériaux et le temps d’emballage doivent apparaître séparément dans le devis.' },
      { q: 'Comment préparer une entrée en résidence senior ?', a: 'Demandez à la résidence le créneau autorisé, le point de stationnement, les dimensions de l’ascenseur, les protections demandées et le plan de la chambre ou de l’appartement.' },
      { q: 'Le déménageur s’occupe-t-il des démarches administratives ?', a: 'Le déménageur organise la prestation décrite au contrat. Les changements d’adresse, décisions patrimoniales, soins et démarches administratives restent à organiser séparément sauf service explicitement convenu.' },
    ],
    related: [
      { label: 'Checklist sur 4 semaines', href: '/blog/checklist-demenagement-4-semaines/', text: 'Un planning progressif jusqu’au jour J.' },
      { label: 'Emballage et cartons', href: '/emballage-cartons-carcassonne/', text: 'Choisir les contenants et protéger les objets.' },
      { label: 'Déménagement à Carcassonne', href: '/demenagement-carcassonne/', text: 'Accès, quartiers et contraintes locales.' },
    ],
  },
  emballage: {
    slug: 'emballage-cartons-carcassonne',
    eyebrow: 'Cartons, protection et étiquetage',
    title: 'Emballage et cartons de déménagement à Carcassonne',
    metaTitle: 'Emballage cartons Carcassonne | Préparer son déménagement',
    metaDescription: 'Cartons et emballage à Carcassonne : estimer les besoins, protéger les objets fragiles, étiqueter et préciser la prestation dans le devis.',
    intro: 'Un emballage adapté protège les biens et accélère le chargement. Le nombre de cartons, les matériaux fournis et les objets confiés au professionnel doivent être définis avant le devis.',
    quote: { source: 'landing-emballage', service: 'demenagement-local', depart: 'Carcassonne' },
    contextTitle: 'Choisir le contenant selon le poids et la fragilité',
    context: [
      'Un grand carton rempli de livres devient difficile à manipuler et peut céder. Les petits formats conviennent aux objets denses ; les formats plus volumineux sont réservés au linge, aux coussins et aux objets légers.',
      'La protection ne consiste pas seulement à ajouter du papier bulle. Il faut empêcher le mouvement dans le carton, séparer les surfaces fragiles et renforcer les points de contact. Les meubles, matelas, écrans et tableaux demandent des protections différentes.',
      'Si l’emballage est confié au déménageur, le devis doit indiquer les pièces ou catégories concernées, qui fournit les matériaux, le niveau de déballage attendu et les éventuelles exclusions.',
    ],
    profiles: [
      { title: 'Cartons préparés par le client', text: 'Le client emballe et étiquette ; le professionnel vérifie les conditions de manutention prévues avant le chargement.' },
      { title: 'Emballage ciblé', text: 'La demande porte sur certaines catégories : vaisselle, tableaux, livres, penderie ou objets fragiles identifiés.' },
      { title: 'Préparation plus complète', text: 'Le périmètre est établi pièce par pièce, avec fournitures, emballage et éventuel déballage indiqués au devis.' },
    ],
    method: [
      { title: 'Faire l’inventaire', text: 'Compter les objets par pièce et repérer ceux qui nécessitent un carton spécifique, une caisse ou une manutention séparée.' },
      { title: 'Répartir le poids', text: 'Utiliser de petits cartons pour le lourd, combler les vides et tester chaque carton sans le soulever par les rabats.' },
      { title: 'Étiqueter sur deux faces', text: 'Indiquer la pièce, le contenu, la fragilité et un numéro d’inventaire sur le dessus et sur un côté.' },
      { title: 'Constituer un lot essentiel', text: 'Garder avec soi les documents, clés, médicaments, chargeurs et effets nécessaires pour les premières 24 à 48 heures.' },
    ],
    checklistTitle: 'Matériaux à prévoir selon les biens',
    checklistIntro: 'La liste exacte dépend de l’inventaire. Des cartons propres, secs et suffisamment résistants sont préférables à des contenants déjà affaiblis.',
    checklist: [
      'Petits cartons pour livres, vaisselle et objets denses',
      'Cartons standards pour vêtements pliés et objets courants',
      'Cartons penderie si les vêtements doivent rester suspendus',
      'Papier, croisillons ou séparateurs pour la vaisselle',
      'Protections d’angle et enveloppes adaptées pour cadres et écrans',
      'Housses ou protections propres pour matelas et textiles',
      'Ruban résistant, marqueurs et étiquettes visibles',
    ],
    callout: {
      title: 'Objets à signaler avant l’emballage',
      text: 'Les produits inflammables, bouteilles de gaz, produits chimiques, denrées périssables, médicaments, plantes, bijoux et documents importants ne se traitent pas comme des cartons ordinaires. Demandez une confirmation pour chaque catégorie incertaine.',
    },
    faqs: [
      { q: 'Combien de cartons faut-il prévoir ?', a: 'Le nombre dépend davantage du contenu que de la seule surface. Un inventaire par pièce est plus fiable qu’un coefficient général. Notre guide de calcul du volume explique comment obtenir une première estimation.' },
      { q: 'Peut-on demander uniquement une prestation d’emballage ?', a: 'La demande peut être étudiée séparément. Les pièces concernées, les matériaux, le niveau de protection et le déballage éventuel doivent être précisés pour établir un devis.' },
      { q: 'Quand commencer les cartons ?', a: 'Commencez par les objets peu utilisés deux à trois semaines avant le départ, puis gardez le quotidien et un lot essentiel pour les derniers jours.' },
      { q: 'Les cartons réutilisés sont-ils adaptés ?', a: 'Ils peuvent convenir s’ils sont propres, secs, rigides et sans déchirure. Évitez les cartons déformés pour la vaisselle, les livres et les objets de valeur.' },
    ],
    related: [
      { label: 'Calcul du volume en m³', href: '/blog/calcul-volume-demenagement-m3/', text: 'Transformer un inventaire en estimation exploitable.' },
      { label: 'Checklist du déménagement', href: '/blog/checklist-demenagement-4-semaines/', text: 'Répartir les cartons dans le temps.' },
      { label: 'Tarifs indicatifs', href: '/tarifs/', text: 'Comprendre les variables prises en compte.' },
      { label: 'Transfert d’entreprise', href: '/demenagement-entreprise-carcassonne/', text: 'Préparer bureaux, archives et accès professionnels.' },
      { label: 'Déménagement senior', href: '/demenagement-senior-carcassonne/', text: 'Organiser progressivement le tri et l’installation.' },
    ],
  },
  urgent: {
    slug: 'transport-urgent-carcassonne',
    eyebrow: 'Transport express local · disponibilité à vérifier en direct',
    title: 'Transport express et urgent à Carcassonne aujourd’hui ou demain',
    metaTitle: 'Transport express Carcassonne | Urgent aujourd’hui ou demain',
    metaDescription: 'Transport express à Carcassonne pour meuble, électroménager, cartons, petit déménagement ou retrait magasin, aujourd’hui ou demain selon disponibilité.',
    intro: 'Un besoin de dernière minute ne permet pas d’attendre plusieurs jours de réponses. Pour un transport express local autour de Carcassonne, appelez directement avec les deux adresses, l’inventaire et l’heure limite : nous vérifions le créneau, les accès et les moyens disponibles avant de confirmer.',
    quote: { source: 'landing-urgent', service: 'transport-meubles', depart: 'Carcassonne', logement: 'petit-volume', distance: 'local', urgent: '1' },
    primaryCta: 'Envoyer les détails maintenant',
    phoneCta: 'Appeler maintenant · 06 80 87 30 47',
    ctaTitle: 'Besoin d’un transport aujourd’hui ou demain ?',
    ctaSubtitle: 'Le téléphone est le moyen le plus rapide. Indiquez les adresses, les objets, les accès et l’heure limite ; nous confirmons ensuite le créneau et le tarif.',
    contextTitle: 'Les demandes de transport express local que nous pouvons étudier rapidement',
    context: [
      'Ce service de transport express concerne en priorité Carcassonne et les communes proches, pour un petit volume compatible avec le véhicule et le temps disponible. Il peut s’agir d’un canapé, d’un lit, d’électroménager, de cartons, d’un achat entre particuliers ou d’un petit déménagement préparé au dernier moment.',
      'Une intervention le jour même ou le lendemain dépend du planning réel, du volume, du poids, des étages, du stationnement et du temps de trajet. Nous ne confirmons jamais un créneau avant d’avoir vérifié ces éléments et annoncé le périmètre de la prestation.',
      'Le tarif est adapté à la distance, au nombre d’objets, au temps de manutention, aux accès et au nombre de personnes nécessaires. Le prix et le créneau sont communiqués avant l’intervention afin que vous puissiez décider sans surprise.',
    ],
    profiles: [
      { title: 'Un meuble ou un achat', text: 'Canapé, table, armoire, lit ou électroménager à retirer chez un particulier ou dans un magasin de Carcassonne.' },
      { title: 'Petit déménagement local', text: 'Quelques meubles et cartons entre deux adresses proches, lorsque tout est prêt et que les accès sont clairement décrits.' },
      { title: 'Besoin professionnel ponctuel', text: 'Livraison locale pour un commerce, un bureau, une location ou un client qui a besoin d’un créneau très proche.' },
    ],
    method: [
      { title: 'Appelez avec les informations utiles', text: 'Donnez les deux adresses, l’heure limite, la liste des objets, leurs dimensions et les contraintes d’accès.' },
      { title: 'Envoyez des photos si nécessaire', text: 'Des photos du meuble, des escaliers, des portes et du stationnement permettent de vérifier plus vite la manutention.' },
      { title: 'Nous vérifions le créneau', text: 'Nous contrôlons le planning, le véhicule, le temps de trajet, le nombre de personnes et la faisabilité réelle.' },
      { title: 'Vous confirmez avant le départ', text: 'Le créneau, le tarif, les prestations incluses et les éventuelles limites sont validés avant l’intervention.' },
    ],
    checklistTitle: 'Ce qu’il faut préparer pour une réponse rapide',
    checklistIntro: 'Plus la demande est précise au premier appel, plus la disponibilité peut être vérifiée rapidement.',
    checklist: [
      'Adresse exacte de retrait et adresse exacte de livraison',
      'Créneau possible et heure à laquelle tout doit être terminé',
      'Liste des meubles, cartons ou appareils avec dimensions approximatives',
      'Étage, ascenseur, largeur des passages et distance de portage',
      'Possibilité de stationner près de chaque entrée',
      'État de préparation : meuble démonté ou non, cartons fermés, achat déjà réglé',
      'Photos des objets et des accès pour les éléments volumineux ou lourds',
    ],
    callout: {
      title: 'Aujourd’hui ou demain ne signifie pas « sans vérification »',
      text: 'La disponibilité n’est confirmée qu’après contrôle du planning, du volume, des accès et des moyens nécessaires. Un objet trop lourd, un passage impossible ou une prestation réglementée peut nécessiter une autre organisation.',
    },
    faqs: [
      { q: 'Qu’appelez-vous transport express à Carcassonne ?', a: 'Il s’agit d’une demande locale à traiter rapidement, souvent le jour même ou le lendemain : meuble, électroménager, cartons, retrait magasin ou petit volume. Express ne signifie pas automatique : le créneau est confirmé après vérification du planning, du véhicule, des accès et de la manutention.' },
      { q: 'Pouvez-vous intervenir aujourd’hui à Carcassonne ?', a: 'C’est parfois possible pour une courte distance et un volume limité. Appelez immédiatement avec les adresses, l’inventaire, les accès et l’heure limite. Le créneau reste soumis à confirmation.' },
      { q: 'Pouvez-vous intervenir demain ?', a: 'Une intervention le lendemain est souvent plus simple à organiser que le jour même, mais elle dépend toujours du planning et des moyens nécessaires. Plus les informations sont complètes, plus la réponse est rapide.' },
      { q: 'Transportez-vous un seul canapé ou un seul appareil ?', a: 'Oui, une demande pour un seul meuble ou appareil peut être étudiée. Il faut préciser les dimensions, le poids connu, les étages, l’ascenseur et les passages.' },
      { q: 'Pouvez-vous retirer un achat dans un magasin ?', a: 'Oui, si l’achat est prêt, réglé, accessible au retrait et compatible avec le véhicule. Transmettez le nom du magasin, le créneau de retrait, les dimensions et l’adresse de livraison.' },
      { q: 'Combien coûte un transport urgent local ?', a: 'Le tarif dépend de la distance, du volume, des accès, du temps de manutention, du nombre de personnes et du créneau. Le montant est annoncé avant confirmation ; aucune majoration automatique n’est promise ou appliquée sans explication.' },
      { q: 'Dans quelles communes intervenez-vous en urgence ?', a: 'La priorité est donnée à Carcassonne et aux communes proches comme Trèbes, Cazilhac, Palaja, Pennautier, Villemoustaussou ou Berriac. Une autre destination peut être étudiée selon le trajet et le planning.' },
    ],
    related: [
      { label: 'Transport de meubles', href: '/services/transport-meubles/', text: 'Un ou plusieurs meubles, achat en ligne ou livraison locale.' },
      { label: 'Livraison depuis un magasin', href: '/livraison-meubles-magasins-carcassonne/', text: 'Retrait et livraison d’un achat volumineux à Carcassonne.' },
      { label: 'Petit déménagement', href: '/petit-demenagement/', text: 'Studios, quelques meubles et petits volumes.' },
      { label: 'Tarifs indicatifs', href: '/tarifs/', text: 'Comprendre les éléments qui déterminent le prix.' },
    ],
  },
  livraisonMagasin: {
    slug: 'livraison-meubles-magasins-carcassonne',
    eyebrow: 'Retrait magasin et livraison locale',
    title: 'Livraison de meubles et achats magasin à Carcassonne',
    metaTitle: 'Livraison meubles magasin Carcassonne | Transport local',
    metaDescription: 'Retrait et livraison locale d’un canapé, meuble ou électroménager acheté en magasin à Carcassonne. Créneau rapide selon disponibilité, accès et dimensions.',
    intro: 'Vous avez acheté un canapé, une table, un lit ou un appareil volumineux et le magasin ne peut pas livrer assez vite ? Nous pouvons étudier le retrait au point de vente et la livraison à domicile à Carcassonne et dans les communes proches.',
    quote: { source: 'landing-livraison-magasin', service: 'transport-meubles', depart: 'Carcassonne', logement: 'petit-volume', distance: 'local' },
    primaryCta: 'Décrire l’achat à livrer',
    phoneCta: 'Appeler · 06 80 87 30 47',
    ctaTitle: 'Un achat volumineux à récupérer ?',
    ctaSubtitle: 'Appelez avec le magasin, les dimensions, le créneau de retrait et l’adresse de livraison. Un passage aujourd’hui ou demain peut être étudié selon disponibilité.',
    contextTitle: 'Une liaison simple entre le magasin et le client',
    context: [
      'Le retrait doit être préparé avant notre arrivée : achat réglé, bon de retrait disponible, personne autorisée identifiée et horaires du dépôt confirmés. Pour éviter l’attente, indiquez le point de retrait exact et le délai prévu par le magasin.',
      'Les dimensions du colis ne suffisent pas toujours. Un canapé, un réfrigérateur ou une armoire doit aussi passer par les portes, l’escalier et l’ascenseur du domicile. Les accès et le stationnement à l’arrivée sont donc vérifiés avant le créneau.',
      'Le service peut être demandé directement par l’acheteur ou par un commerce qui cherche une solution ponctuelle pour un client. Chaque livraison reste confirmée individuellement avec les coordonnées utiles, le périmètre de manutention et le tarif.',
    ],
    profiles: [
      { title: 'Acheteur particulier', text: 'Retrait d’un achat déjà réglé et livraison à domicile, avec mise en place simple à confirmer selon les accès.' },
      { title: 'Magasin ou commerçant', text: 'Solution locale ponctuelle lorsqu’un client a besoin d’une livraison plus proche que le planning habituel.' },
      { title: 'Achat entre particuliers', text: 'Retrait d’un meuble vendu en ligne ou d’occasion, après validation du rendez-vous avec le vendeur.' },
    ],
    method: [
      { title: 'Confirmer le retrait', text: 'Nom du magasin ou du vendeur, référence, personne de contact, adresse et plage horaire disponible.' },
      { title: 'Vérifier le gabarit', text: 'Dimensions, poids, emballage, position de transport imposée et éventuel besoin de manutention à deux.' },
      { title: 'Décrire la livraison', text: 'Adresse, étage, ascenseur, portes, escaliers, stationnement et pièce de destination.' },
      { title: 'Valider le service', text: 'Créneau, tarif, protection, manutention, mise en place et exclusions sont confirmés avant le retrait.' },
    ],
    checklistTitle: 'Informations à transmettre avant le retrait',
    checklistIntro: 'Une photo de l’étiquette ou du colis peut compléter les informations, sans envoyer de document bancaire ni de donnée sensible.',
    checklist: [
      'Nom et adresse exacte du magasin ou coordonnées du vendeur',
      'Référence de retrait utile, sans transmettre de donnée bancaire',
      'Dimensions, poids et nombre de colis ou de meubles',
      'Horaires du dépôt et délai d’attente éventuel',
      'Adresse complète de livraison et numéro joignable',
      'Étage, ascenseur, escaliers et largeur des portes',
      'Besoin éventuel de démontage, remontage ou mise en place',
    ],
    callout: {
      title: 'Le meuble doit être transportable et accessible',
      text: 'Nous vérifions les dimensions du véhicule et des passages avant de confirmer. Le branchement d’appareils, les travaux, le levage extérieur ou le démontage complexe ne sont jamais inclus implicitement.',
    },
    faqs: [
      { q: 'Pouvez-vous livrer un canapé acheté le jour même ?', a: 'La demande peut être étudiée immédiatement si le canapé est prêt au retrait, que ses dimensions sont connues et que le planning le permet. Le créneau est confirmé avant déplacement.' },
      { q: 'Travaillez-vous directement avec les magasins ?', a: 'Un magasin peut nous contacter pour une livraison ponctuelle, comme un client peut organiser lui-même le retrait. Les responsabilités, le contact de retrait, le destinataire et le tarif sont confirmés pour chaque mission.' },
      { q: 'Mon achat peut-il être monté à l’étage ?', a: 'Oui si le poids, les dimensions, l’escalier ou l’ascenseur et le nombre de personnes nécessaires le permettent. Ces informations doivent être vérifiées avant le devis.' },
      { q: 'Pouvez-vous démonter ou monter le meuble ?', a: 'Cette prestation n’est pas automatique. Elle peut être étudiée selon le meuble, la notice, l’état, le temps nécessaire et les outils à prévoir.' },
      { q: 'Livrez-vous hors de Carcassonne ?', a: 'Oui dans les communes proches et, selon le planning, plus loin dans l’Aude. La distance et le temps de trajet sont intégrés au tarif annoncé.' },
    ],
    related: [
      { label: 'Transport express et urgent local', href: '/transport-urgent-carcassonne/', text: 'Vérifier une disponibilité aujourd’hui ou demain.' },
      { label: 'Transport de meubles', href: '/services/transport-meubles/', text: 'Cadre général, protections et questions fréquentes.' },
      { label: 'Petit déménagement', href: '/petit-demenagement/', text: 'Pour plusieurs meubles et cartons sur une courte distance.' },
    ],
  },
};
