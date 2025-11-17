import { create } from 'zustand';
import { Device } from '../types/device';

export interface HouseholdMember {
  id: string;
  name: string;
  age: number;
  role: 'parent' | 'teen' | 'kid';
}

export interface UsagePattern {
  dataUsage: 'light' | 'moderate' | 'heavy';
  gaming: boolean;
  videoStreaming: boolean;
  callUsage: 'low' | 'medium' | 'high';
  messaging: boolean;
}

export interface RecommendedPlan {
  planId: string;
  planName: string;
  dataAmount: string;
  price: number;
  memberId?: string;
  memberName?: string;
  savings?: number;
}

export interface SafetySettings {
  memberId: string;
  screenTimeLimit?: number; // hours per day
  bedtimeMode?: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
  allowedContacts?: string[];
  dataCap?: number; // GB per month
  locationSharing?: boolean;
  contentFiltering?: boolean;
  appRestrictions?: {
    enabled: boolean;
    blockedApps?: string[];
    allowedApps?: string[];
  };
  websiteBlocking?: {
    enabled: boolean;
    blockedCategories?: string[];
  };
  purchaseRestrictions?: boolean;
  socialMediaMonitoring?: boolean;
  weeklyReports?: boolean;
  emergencyContacts?: string[];
}

interface FamilyState {
  // Household
  household: {
    numberOfMembers: number;
    members: HouseholdMember[];
    existingDevices: string[];
  };
  
  // Usage
  usage: UsagePattern;
  
  // Recommendations
  recommendations: {
    sharedPlan?: RecommendedPlan;
    individualPlans: RecommendedPlan[];
    totalSavings: number;
    perMemberBreakdown: Array<{
      memberId: string;
      memberName: string;
      recommendedPlan: RecommendedPlan;
      savings: number;
    }>;
  };
  
  // Devices
  devices: {
    selectedDevices: Array<{
      deviceId: string;
      device: Device;
      assignedTo?: string; // memberId
      contractLength: 24 | 36;
    }>;
  };
  
  // Safety
  safety: {
    settings: SafetySettings[];
  };
  
  // Summary
  summary: {
    totalCost: number;
    monthlySavings: number;
    devices: Device[];
    plans: RecommendedPlan[];
  };
  
  // Actions
  setHousehold: (household: FamilyState['household']) => void;
  setUsage: (usage: UsagePattern) => void;
  setRecommendations: (recommendations: FamilyState['recommendations']) => void;
  addDevice: (device: Device, assignedTo?: string, contractLength?: 24 | 36) => void;
  removeDevice: (deviceId: string) => void;
  setSafetySettings: (settings: SafetySettings[]) => void;
  calculateSummary: () => void;
  reset: () => void;
}

const initialState = {
  household: {
    numberOfMembers: 0,
    members: [],
    existingDevices: [],
  },
  usage: {
    dataUsage: 'moderate' as const,
    gaming: false,
    videoStreaming: false,
    callUsage: 'medium' as const,
    messaging: true,
  },
  recommendations: {
    individualPlans: [],
    totalSavings: 0,
    perMemberBreakdown: [],
  },
  devices: {
    selectedDevices: [],
  },
  safety: {
    settings: [],
  },
  summary: {
    totalCost: 0,
    monthlySavings: 0,
    devices: [],
    plans: [],
  },
};

export const useFamilyStore = create<FamilyState>((set, get) => ({
  ...initialState,
  
  setHousehold: (household) => set({ household }),
  
  setUsage: (usage) => set({ usage }),
  
  setRecommendations: (recommendations) => set({ recommendations }),
  
  addDevice: (device, assignedTo, contractLength = 24) => {
    const currentDevices = get().devices.selectedDevices;
    const exists = currentDevices.find(d => d.deviceId === device.id);
    
    if (!exists) {
      set({
        devices: {
          selectedDevices: [
            ...currentDevices,
            {
              deviceId: device.id,
              device,
              assignedTo,
              contractLength,
            },
          ],
        },
      });
      get().calculateSummary();
    }
  },
  
  removeDevice: (deviceId) => {
    set({
      devices: {
        selectedDevices: get().devices.selectedDevices.filter(
          d => d.deviceId !== deviceId
        ),
      },
    });
    get().calculateSummary();
  },
  
  setSafetySettings: (settings) => set({ safety: { settings } }),
  
  calculateSummary: () => {
    const state = get();
    const deviceCosts = state.devices.selectedDevices.reduce((sum, item) => {
      const monthlyPrice = item.contractLength === 24 
        ? item.device.price24 
        : item.device.price36;
      return sum + monthlyPrice;
    }, 0);
    
    const planCosts = state.recommendations.sharedPlan
      ? state.recommendations.sharedPlan.price
      : state.recommendations.individualPlans.reduce((sum, plan) => sum + plan.price, 0);
    
    const totalCost = deviceCosts + planCosts;
    const monthlySavings = state.recommendations.totalSavings;
    
    set({
      summary: {
        totalCost,
        monthlySavings,
        devices: state.devices.selectedDevices.map(d => d.device),
        plans: state.recommendations.sharedPlan
          ? [state.recommendations.sharedPlan, ...state.recommendations.individualPlans]
          : state.recommendations.individualPlans,
      },
    });
  },
  
  reset: () => set(initialState),
}));

