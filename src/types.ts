export type AircraftType = 'Swallow' | 'Owl' | 'Jumbo' | 'Swift';

export interface DestinationItem {
  id: string;
  name: string;
  region: string;
  aircraft: AircraftType;
  progressCurrent: number;
  progressTarget: number;
  toNextStar: number | null; // null if reached max / fully starred
  stars: number; // e.g. 0, 1, 2, 3, 4
  maps: number;
  flights: number;
  landmark: string;
}

export type NavSection = 'Dashboard' | 'My Flights' | 'Collections' | 'Aircraft' | 'Statistics' | 'Settings';
