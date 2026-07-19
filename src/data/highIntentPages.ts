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
  };
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
};
