import { Deal } from '../stores/valueStore';

export const mockDeals: Deal[] = [
  {
    id: 'deal-1',
    title: '50% Off First 6 Months',
    description: 'Get 50% off your plan for the first 6 months',
    discount: 50,
    discountType: 'percentage',
    originalPrice: 69,
    discountedPrice: 34.5,
    validUntil: '2024-12-31',
    category: 'plan',
    planId: 'plan-150gb',
  },
  {
    id: 'deal-2',
    title: 'Refurb iPhone 13 - $25/mo',
    description: 'Certified refurbished iPhone 13 in excellent condition',
    discount: 40,
    discountType: 'percentage',
    originalPrice: 45,
    discountedPrice: 25,
    validUntil: '2024-11-30',
    category: 'refurb',
    deviceId: 'iphone-13-refurb',
  },
  {
    id: 'deal-3',
    title: 'Bundle Deal: Device + Plan',
    description: 'Save $200 when you bundle a device with any plan',
    discount: 200,
    discountType: 'dollar',
    originalPrice: 89,
    discountedPrice: 69,
    validUntil: '2024-12-15',
    category: 'bundle',
  },
  {
    id: 'deal-4',
    title: 'Limited: $30/mo Unlimited',
    description: 'Unlimited data plan for just $30/mo (first 12 months)',
    discount: 60,
    discountType: 'dollar',
    originalPrice: 89,
    discountedPrice: 30,
    validUntil: '2024-10-31',
    category: 'limited',
    planId: 'plan-unlimited',
  },
  {
    id: 'deal-5',
    title: 'Budget Phone Special',
    description: 'Samsung Galaxy A54 for just $20/mo',
    discount: 50,
    discountType: 'percentage',
    originalPrice: 42,
    discountedPrice: 20,
    validUntil: '2024-12-31',
    category: 'device',
    deviceId: 'samsung-a54',
  },
  {
    id: 'deal-6',
    title: 'Switch & Save $15/mo',
    description: 'Switch from any provider and save $15/month for 12 months',
    discount: 15,
    discountType: 'monthly',
    originalPrice: 49,
    discountedPrice: 34,
    validUntil: '2024-12-31',
    category: 'plan',
  },
];

export function getDealsByCategory(category: string): Deal[] {
  if (category === 'all') return mockDeals;
  return mockDeals.filter(deal => deal.category === category);
}

export function sortDeals(deals: Deal[], sortBy: string): Deal[] {
  const sorted = [...deals];
  
  switch (sortBy) {
    case 'lowestCost':
      return sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
    case 'biggestDiscount':
      return sorted.sort((a, b) => {
        const discountA = a.originalPrice - a.discountedPrice;
        const discountB = b.originalPrice - b.discountedPrice;
        return discountB - discountA;
      });
    case 'under30':
      return sorted.filter(d => d.discountedPrice < 30).sort((a, b) => a.discountedPrice - b.discountedPrice);
    case 'bestValue':
      return sorted.sort((a, b) => {
        const valueA = (a.originalPrice - a.discountedPrice) / a.originalPrice;
        const valueB = (b.originalPrice - b.discountedPrice) / b.originalPrice;
        return valueB - valueA;
      });
    default:
      return sorted;
  }
}

