import { create } from 'zustand';
import { Device } from '../types/device';

export interface YPProfile {
  jobType: string;
  hybridWork: boolean;
  travelFrequency: 'none' | 'occasional' | 'frequent' | 'very-frequent';
  budgetComfort: 'budget' | 'moderate' | 'comfortable' | 'premium';
  prestigePreference: 'value' | 'balanced' | 'prestige';
}

export interface ScorerAnswers {
  productivityImportance: number; // 1-5
  batteryImportance: number; // 1-5
  cameraImportance: number; // 1-5
  designPreference: number; // 1-5
  budgetLimit: number; // monthly budget
  travelFrequency: 'none' | 'occasional' | 'frequent' | 'very-frequent';
  hybridWork: boolean;
}

export interface ScorerResults {
  valueScore: number; // 0-100
  prestigeScore: number; // 0-100
  workScore: number; // 0-100
  recommendation: 'value' | 'balanced' | 'prestige';
}

export interface RoamingPack {
  id: string;
  name: string;
  destination: string;
  data: string;
  price: number;
  duration: number; // days
  countries: string[];
}

export interface ESIMInfo {
  compatible: boolean;
  deviceInfo?: {
    model: string;
    carrier: string;
    activationDate?: string;
  };
  qrCode?: string;
}

interface YoungProState {
  // Profile
  profile: YPProfile;
  
  // Scorer
  scorer: {
    answers: Partial<ScorerAnswers>;
    results: ScorerResults | null;
  };
  
  // Devices
  devices: {
    selectedDevice: Device | null;
    filteredDevices: Device[];
  };
  
  // Plans
  plans: {
    recommendedPlan: any | null;
    addOns: string[];
  };
  
  // Travel
  travel: {
    destination: string;
    roamingPack: RoamingPack | null;
    travelSuggestions: any[];
  };
  
  // eSIM
  esim: ESIMInfo;
  
  // Actions
  setProfile: (profile: Partial<YPProfile>) => void;
  setScorerAnswers: (answers: Partial<ScorerAnswers>) => void;
  calculateScores: () => void;
  setSelectedDevice: (device: Device | null) => void;
  setRecommendedPlan: (plan: any) => void;
  setAddOns: (addOns: string[]) => void;
  setTravelDestination: (destination: string) => void;
  setRoamingPack: (pack: RoamingPack | null) => void;
  setESIMInfo: (info: ESIMInfo) => void;
  reset: () => void;
}

const initialState = {
  profile: {
    jobType: '',
    hybridWork: false,
    travelFrequency: 'occasional' as const,
    budgetComfort: 'moderate' as const,
    prestigePreference: 'balanced' as const,
  },
  scorer: {
    answers: {},
    results: null,
  },
  devices: {
    selectedDevice: null,
    filteredDevices: [],
  },
  plans: {
    recommendedPlan: null,
    addOns: [],
  },
  travel: {
    destination: '',
    roamingPack: null,
    travelSuggestions: [],
  },
  esim: {
    compatible: false,
  },
};

export const useYoungProStore = create<YoungProState>((set, get) => ({
  ...initialState,
  
  setProfile: (profile) => {
    set((state) => ({
      profile: { ...state.profile, ...profile },
    }));
  },
  
  setScorerAnswers: (answers) => {
    set((state) => ({
      scorer: {
        ...state.scorer,
        answers: { ...state.scorer.answers, ...answers },
      },
    }));
  },
  
  calculateScores: () => {
    const { answers } = get().scorer;
    
    // Calculate value score (battery + price sensitivity + productivity)
    const valueScore = Math.min(100, 
      (answers.batteryImportance || 3) * 15 +
      (answers.budgetLimit ? Math.max(0, 100 - (answers.budgetLimit / 10)) : 50) * 0.3 +
      (answers.productivityImportance || 3) * 10
    );
    
    // Calculate prestige score (camera + design + premium brand)
    const prestigeScore = Math.min(100,
      (answers.cameraImportance || 3) * 15 +
      (answers.designPreference || 3) * 15 +
      (answers.prestigePreference === 'prestige' ? 40 : answers.prestigePreference === 'balanced' ? 20 : 0)
    );
    
    // Calculate work score (productivity + battery + 5G)
    const workScore = Math.min(100,
      (answers.productivityImportance || 3) * 20 +
      (answers.batteryImportance || 3) * 15 +
      (answers.hybridWork ? 30 : 15)
    );
    
    // Determine recommendation
    let recommendation: 'value' | 'balanced' | 'prestige' = 'balanced';
    if (valueScore > prestigeScore + 20) {
      recommendation = 'value';
    } else if (prestigeScore > valueScore + 20) {
      recommendation = 'prestige';
    }
    
    set({
      scorer: {
        ...get().scorer,
        results: {
          valueScore: Math.round(valueScore),
          prestigeScore: Math.round(prestigeScore),
          workScore: Math.round(workScore),
          recommendation,
        },
      },
    });
  },
  
  setSelectedDevice: (device) => {
    set({
      devices: {
        ...get().devices,
        selectedDevice: device,
      },
    });
  },
  
  setRecommendedPlan: (plan) => {
    set({
      plans: {
        ...get().plans,
        recommendedPlan: plan,
      },
    });
  },
  
  setAddOns: (addOns) => {
    set({
      plans: {
        ...get().plans,
        addOns,
      },
    });
  },
  
  setTravelDestination: (destination) => {
    set({
      travel: {
        ...get().travel,
        destination,
      },
    });
  },
  
  setRoamingPack: (pack) => {
    set({
      travel: {
        ...get().travel,
        roamingPack: pack,
      },
    });
  },
  
  setESIMInfo: (info) => {
    set({ esim: info });
  },
  
  reset: () => set(initialState),
}));

