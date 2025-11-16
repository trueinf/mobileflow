export interface Device {
  id: string;
  name: string;
  brand: string;
  image: string;
  price24: number;
  price36: number;
  upfront?: number;
  matchScore?: number;
  badges?: string[];
  category: string[];
  specs: {
    camera: string;
    display: string;
    battery: string;
    storage: string;
    chipset: string;
    refreshRate: string;
  };
  colors: string[];
  inStock: boolean;
  bestFor?: string;
  gamingScore?: number;
}

export interface Plan {
  id: string;
  name: string;
  data: string;
  price: number;
  studentDiscount?: number;
  perks?: string[];
}

export interface QuizResult {
  style: string;
  budget: string;
  priority: string;
  ownership: string;
  tradeIn: boolean;
}
