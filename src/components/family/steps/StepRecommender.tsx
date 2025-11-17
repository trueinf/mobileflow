import { useEffect } from "react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { useFamilyStore } from "../../../stores/familyStore";
import { calculateRecommendedPlan, calculateIndividualPlans, familyPlans } from "../../../data/familyPlans";
import { FamilyBundleSavings } from "../FamilyBundleSavings";
import { CheckCircle2, Users, Wifi } from "lucide-react";
import { motion } from "framer-motion";

interface StepRecommenderProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepRecommender({ onNext, onBack }: StepRecommenderProps) {
  const { household, usage, recommendations, setRecommendations } = useFamilyStore();

  useEffect(() => {
    // Calculate recommendations
    const sharedPlan = calculateRecommendedPlan(
      household.numberOfMembers,
      usage.dataUsage,
      usage.gaming,
      usage.videoStreaming
    );

    const individualPlans = calculateIndividualPlans(
      household.members,
      usage.dataUsage
    );

    const individualTotal = individualPlans.reduce((sum, plan) => sum + plan.price, 0);
    const savings = individualTotal - sharedPlan.price;
    const savingsPerPerson = savings / household.numberOfMembers;

    const perMemberBreakdown = household.members.map((member, index) => ({
      memberId: member.id,
      memberName: member.name || `Member ${index + 1}`,
      recommendedPlan: {
        planId: sharedPlan.id,
        planName: sharedPlan.name,
        dataAmount: sharedPlan.data,
        price: Math.round(sharedPlan.price / household.numberOfMembers),
        savings: savingsPerPerson,
      },
      savings: savingsPerPerson,
    }));

    setRecommendations({
      sharedPlan: {
        planId: sharedPlan.id,
        planName: sharedPlan.name,
        dataAmount: sharedPlan.data,
        price: sharedPlan.price,
        savings,
      },
      individualPlans,
      totalSavings: savings,
      perMemberBreakdown,
    });
  }, [household, usage, setRecommendations]);

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Recommended Plan for Your Family</h2>
        <p className="text-muted-foreground">
          Based on your household size and usage patterns, here's what we recommend.
        </p>
      </div>

      {recommendations.sharedPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="p-6 border-2 border-[#00A9CE]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="bg-[#00A9CE] text-white mb-2">Recommended</Badge>
                <h3 className="text-2xl font-bold mb-2">
                  {recommendations.sharedPlan.planName}
                </h3>
                <p className="text-muted-foreground">
                  {recommendations.sharedPlan.dataAmount} shared data for {household.numberOfMembers} members
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#00A9CE]">
                  ${recommendations.sharedPlan.price}
                  <span className="text-lg text-muted-foreground">/mo</span>
                </p>
                <p className="text-sm text-muted-foreground">Total for all lines</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { icon: Users, label: `${household.numberOfMembers} Lines` },
                { icon: Wifi, label: recommendations.sharedPlan.dataAmount },
                { icon: CheckCircle2, label: "5G Included" },
                { icon: CheckCircle2, label: "Parental Controls" },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-[#00A9CE]" />
                    <span className="text-sm">{feature.label}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {recommendations.totalSavings > 0 && (
            <FamilyBundleSavings
              savings={recommendations.totalSavings}
              originalTotal={recommendations.individualPlans.reduce(
                (sum, p) => sum + p.price,
                0
              )}
            />
          )}

          <Card className="p-6">
            <h4 className="font-semibold mb-4">Per Member Breakdown</h4>
            <div className="space-y-3">
              {recommendations.perMemberBreakdown.map((breakdown) => (
                <div
                  key={breakdown.memberId}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{breakdown.memberName}</p>
                    <p className="text-sm text-muted-foreground">
                      {breakdown.recommendedPlan.dataAmount} shared
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${breakdown.recommendedPlan.price}
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </p>
                    {breakdown.savings > 0 && (
                      <p className="text-sm text-green-600">
                        Save ${Math.round(breakdown.savings)}/mo
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-muted/30">
            <h4 className="font-semibold mb-2">What's Included</h4>
            <ul className="space-y-2">
              {[
                "Shared data pool for all family members",
                "Advanced parental controls",
                "5G coverage across Australia",
                "International calls included",
                "24/7 family support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A9CE]" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          size="lg"
          className="bg-[#00A9CE] hover:bg-[#0098b8] text-white px-8"
          onClick={handleNext}
        >
          Continue to Devices
        </Button>
      </div>
    </div>
  );
}

