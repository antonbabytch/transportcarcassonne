export interface GroupedTrip {
  id: string;
  departure: string;
  arrival: string;
  date: string;
  availableVolumeM3: number;
  directionFlexible?: boolean;
  note?: string;
}

// Ajouter ici uniquement des trajets réellement planifiés et confirmés.
// La page affiche un état vide honnête tant qu'aucune disponibilité n'est publiée.
export const GROUPED_TRIPS: GroupedTrip[] = [];
