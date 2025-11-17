import { RecommendedPlan } from "../stores/familyStore";

export interface FamilyPlan {
  id: string;
  name: string;
  data: string;
  price: number;
  sharedData: boolean;
  maxLines: number;
  perks: string[];
  familyDiscount: number; // percentage
}

export const familyPlans: FamilyPlan[] = [
  {
    id: "family-unlimited",
    name: "Family Unlimited",
    data: "Unlimited",
    price: 199,
    sharedData: true,
    maxLines: 10,
    perks: ["5G", "International calls", "Streaming perks", "Parental controls"],
    familyDiscount: 30,
  },
  {
    id: "family-300gb",
    name: "Family 300GB",
    data: "300GB Shared",
    price: 149,
    sharedData: true,
    maxLines: 8,
    perks: ["5G", "International calls", "Parental controls"],
    familyDiscount: 25,
  },
  {
    id: "family-150gb",
    name: "Family 150GB",
    data: "150GB Shared",
    price: 99,
    sharedData: true,
    maxLines: 6,
    perks: ["5G", "Parental controls"],
    familyDiscount: 20,
  },
  {
    id: "family-80gb",
    name: "Family 80GB",
    data: "80GB Shared",
    price: 69,
    sharedData: true,
    maxLines: 4,
    perks: ["5G"],
    familyDiscount: 15,
  },
];

export function calculateRecommendedPlan(
  householdSize: number,
  usage: "light" | "moderate" | "heavy",
  gaming: boolean,
  videoStreaming: boolean
): FamilyPlan {
  // Simple recommendation logic
  if (usage === "heavy" || (gaming && videoStreaming)) {
    return familyPlans[0]; // Unlimited
  } else if (usage === "moderate" || videoStreaming) {
    return householdSize > 4 ? familyPlans[1] : familyPlans[2]; // 300GB or 150GB
  } else {
    return householdSize > 3 ? familyPlans[2] : familyPlans[3]; // 150GB or 80GB
  }
}

export function calculateIndividualPlans(
  members: Array<{ age: number; role: string }>,
  usage: "light" | "moderate" | "heavy"
): RecommendedPlan[] {
  return members.map((member, index) => {
    let planPrice = 49;
    let dataAmount = "80GB";
    
    if (member.role === "parent") {
      planPrice = usage === "heavy" ? 89 : usage === "moderate" ? 69 : 49;
      dataAmount = usage === "heavy" ? "Unlimited" : usage === "moderate" ? "150GB" : "80GB";
    } else if (member.role === "teen") {
      planPrice = usage === "heavy" ? 69 : usage === "moderate" ? 49 : 39;
      dataAmount = usage === "heavy" ? "150GB" : usage === "moderate" ? "80GB" : "40GB";
    } else {
      planPrice = 39;
      dataAmount = "40GB";
    }
    
    return {
      planId: `individual-${index}`,
      planName: `${dataAmount} Individual`,
      dataAmount,
      price: planPrice,
      memberId: `member-${index}`,
      memberName: `Member ${index + 1}`,
    };
  });
}

