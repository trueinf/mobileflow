import { RoamingPack } from '../stores/youngProStore';

export const roamingPacks: RoamingPack[] = [
  {
    id: 'asia-pacific',
    name: 'Asia Pacific Pack',
    destination: 'Asia Pacific',
    data: '10GB',
    price: 20,
    duration: 7,
    countries: ['Singapore', 'Thailand', 'Indonesia', 'Malaysia', 'Philippines', 'Vietnam'],
  },
  {
    id: 'europe',
    name: 'Europe Pack',
    destination: 'Europe',
    data: '15GB',
    price: 30,
    duration: 14,
    countries: ['UK', 'France', 'Germany', 'Italy', 'Spain', 'Netherlands'],
  },
  {
    id: 'usa-canada',
    name: 'USA & Canada Pack',
    destination: 'North America',
    data: '20GB',
    price: 40,
    duration: 14,
    countries: ['USA', 'Canada'],
  },
  {
    id: 'global',
    name: 'Global Roaming',
    destination: 'Global',
    data: 'Unlimited',
    price: 60,
    duration: 30,
    countries: ['80+ countries'],
  },
];

export function getRoamingPackForDestination(destination: string): RoamingPack | null {
  const lowerDest = destination.toLowerCase();
  
  if (lowerDest.includes('asia') || lowerDest.includes('pacific')) {
    return roamingPacks[0];
  }
  if (lowerDest.includes('europe') || lowerDest.includes('uk') || lowerDest.includes('france')) {
    return roamingPacks[1];
  }
  if (lowerDest.includes('usa') || lowerDest.includes('america') || lowerDest.includes('canada')) {
    return roamingPacks[2];
  }
  
  return roamingPacks[3]; // Global as default
}

