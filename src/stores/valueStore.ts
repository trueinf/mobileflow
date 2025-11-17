import { create } from 'zustand';
import { Device } from '../types/device';

export interface Deal {
  id: string;
  title: string;
  description: string;
  discount: number;
  discountType: 'percentage' | 'dollar' | 'monthly';
  originalPrice: number;
  discountedPrice: number;
  validUntil: string;
  category: 'device' | 'plan' | 'bundle' | 'refurb' | 'limited';
  deviceId?: string;
  planId?: string;
}

export interface TrueCostBreakdown {
  deviceCost: number;
  planCost: number;
  contractLength: number;
  promoValue: number;
  trueMonthly: number;
  totalCost: number;
  savings: number;
}

export interface CompetitorComparison {
  provider: string;
  monthlyCost: number;
  totalCost: number;
  data: string;
  contractLength: number;
  upfrontCost: number;
  savings: number;
}

export interface RefurbDevice extends Device {
  condition: 'A' | 'B' | 'C';
  warrantyMonths: number;
  batteryHealth: number; // percentage
  estimatedLife: string;
  refurbCertified: boolean;
}

export interface BYOInfo {
  deviceModel: string;
  isCompatible: boolean;
  imei?: string;
  simType: 'physical' | 'esim' | 'both';
  planSuggestions: any[];
}

export interface PortingStatus {
  number: string;
  status: 'notStarted' | 'pending' | 'inProgress' | 'complete';
  steps: Array<{
    id: string;
    title: string;
    completed: boolean;
    estimatedTime?: string;
  }>;
  estimatedCompletion?: string;
}

interface ValueState {
  // Profile
  profile: {
    currentProvider: string;
    currentCost: number;
    usageLevel: 'light' | 'moderate' | 'heavy';
    priority: 'lowestCost' | 'bestDeal' | 'budgetUnderX';
    budgetLimit?: number;
  };
  
  // Deals
  deals: {
    activeDeals: Deal[];
    selectedDeal: Deal | null;
    sortBy: 'lowestCost' | 'biggestDiscount' | 'under30' | 'bestValue';
  };
  
  // Calculator
  calculator: {
    deviceCost: number;
    planCost: number;
    contractLength: 24 | 36;
    promoValue: number;
    trueMonthly: number;
    totalCost: number;
    competitorCompare: CompetitorComparison[];
  };
  
  // Refurb
  refurb: {
    selectedDevice: RefurbDevice | null;
  };
  
  // BYO
  byo: BYOInfo;
  
  // Porting
  porting: PortingStatus;
  
  // Actions
  setProfile: (profile: Partial<ValueState['profile']>) => void;
  setDeals: (deals: Deal[]) => void;
  setSelectedDeal: (deal: Deal | null) => void;
  setDealSort: (sortBy: ValueState['deals']['sortBy']) => void;
  calculateTrueCost: () => void;
  setCalculatorInputs: (inputs: Partial<ValueState['calculator']>) => void;
  setRefurbDevice: (device: RefurbDevice | null) => void;
  setBYOInfo: (info: Partial<BYOInfo>) => void;
  checkBYOCompatibility: (model: string) => void;
  setPortingStatus: (status: Partial<PortingStatus>) => void;
  reset: () => void;
}

const initialState = {
  profile: {
    currentProvider: '',
    currentCost: 0,
    usageLevel: 'moderate' as const,
    priority: 'lowestCost' as const,
  },
  deals: {
    activeDeals: [],
    selectedDeal: null,
    sortBy: 'lowestCost' as const,
  },
  calculator: {
    deviceCost: 0,
    planCost: 49,
    contractLength: 24,
    promoValue: 0,
    trueMonthly: 0,
    totalCost: 0,
    competitorCompare: [],
  },
  refurb: {
    selectedDevice: null,
  },
  byo: {
    deviceModel: '',
    isCompatible: false,
    simType: 'both' as const,
    planSuggestions: [],
  },
  porting: {
    number: '',
    status: 'notStarted' as const,
    steps: [
      { id: '1', title: 'Enter your number', completed: false },
      { id: '2', title: 'Verify account details', completed: false },
      { id: '3', title: 'Port request submitted', completed: false },
      { id: '4', title: 'Port complete', completed: false },
    ],
  },
};

export const useValueStore = create<ValueState>((set, get) => ({
  ...initialState,
  
  setProfile: (profile) => {
    set((state) => ({
      profile: { ...state.profile, ...profile },
    }));
  },
  
  setDeals: (deals) => {
    set({ deals: { ...get().deals, activeDeals: deals } });
  },
  
  setSelectedDeal: (deal) => {
    set({ deals: { ...get().deals, selectedDeal: deal } });
  },
  
  setDealSort: (sortBy) => {
    set({ deals: { ...get().deals, sortBy } });
  },
  
  setCalculatorInputs: (inputs) => {
    set((state) => ({
      calculator: { ...state.calculator, ...inputs },
    }));
    get().calculateTrueCost();
  },
  
  calculateTrueCost: () => {
    const { calculator } = get();
    const totalDeviceCost = calculator.deviceCost * calculator.contractLength;
    const totalPlanCost = calculator.planCost * calculator.contractLength;
    const totalPromoValue = calculator.promoValue * calculator.contractLength;
    
    const totalCost = totalDeviceCost + totalPlanCost - totalPromoValue;
    const trueMonthly = totalCost / calculator.contractLength;
    
    // Mock competitor comparison
    const competitorCompare: CompetitorComparison[] = [
      {
        provider: 'Telstra',
        monthlyCost: calculator.planCost + 10,
        totalCost: (calculator.planCost + 10) * calculator.contractLength,
        data: '80GB',
        contractLength: calculator.contractLength,
        upfrontCost: calculator.deviceCost + 50,
        savings: totalCost - ((calculator.planCost + 10) * calculator.contractLength + calculator.deviceCost + 50),
      },
      {
        provider: 'Vodafone',
        monthlyCost: calculator.planCost - 5,
        totalCost: (calculator.planCost - 5) * calculator.contractLength,
        data: '60GB',
        contractLength: calculator.contractLength,
        upfrontCost: calculator.deviceCost + 30,
        savings: totalCost - ((calculator.planCost - 5) * calculator.contractLength + calculator.deviceCost + 30),
      },
    ];
    
    set({
      calculator: {
        ...calculator,
        trueMonthly,
        totalCost,
        competitorCompare,
      },
    });
  },
  
  setRefurbDevice: (device) => {
    set({ refurb: { selectedDevice: device } });
  },
  
  setBYOInfo: (info) => {
    set({ byo: { ...get().byo, ...info } });
  },
  
  checkBYOCompatibility: (model) => {
    const compatible = model.toLowerCase().includes('iphone') ||
                      model.toLowerCase().includes('samsung') ||
                      model.toLowerCase().includes('pixel') ||
                      model.toLowerCase().includes('oneplus');
    
    const simType = model.toLowerCase().includes('iphone 14') ||
                    model.toLowerCase().includes('iphone 15') ||
                    model.toLowerCase().includes('pixel')
      ? 'esim' as const
      : 'both' as const;
    
    set({
      byo: {
        deviceModel: model,
        isCompatible: compatible,
        simType,
        planSuggestions: compatible
          ? [
              { id: 'plan-1', name: '40GB Plan', price: 39, data: '40GB' },
              { id: 'plan-2', name: '80GB Plan', price: 49, data: '80GB' },
            ]
          : [],
      },
    });
  },
  
  setPortingStatus: (status) => {
    set({ porting: { ...get().porting, ...status } });
  },
  
  reset: () => set(initialState),
}));

