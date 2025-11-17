import { useEffect } from "react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { useFamilyStore } from "../../../stores/familyStore";
import { FamilyBundleSavings } from "../FamilyBundleSavings";
import { CheckCircle2, Smartphone, Users, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface StepSummaryProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepSummary({ onNext, onBack }: StepSummaryProps) {
  const { household, recommendations, devices, safety, summary, calculateSummary } =
    useFamilyStore();

  useEffect(() => {
    calculateSummary();
  }, [calculateSummary]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Review Your Family Plan</h2>
        <p className="text-muted-foreground">
          Review everything before proceeding to checkout.
        </p>
      </div>

      <div className="space-y-6">
        {/* Plan Summary */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-[#00A9CE]" />
            <h3 className="text-xl font-bold">Plan Summary</h3>
          </div>
          {recommendations.sharedPlan && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-semibold">{recommendations.sharedPlan.planName}</p>
                  <p className="text-sm text-muted-foreground">
                    {recommendations.sharedPlan.dataAmount} shared data
                  </p>
                </div>
                <p className="text-2xl font-bold">
                  ${recommendations.sharedPlan.price}
                  <span className="text-sm text-muted-foreground">/mo</span>
                </p>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• {household.numberOfMembers} family members</p>
                <p>• Shared data pool</p>
                <p>• 5G coverage included</p>
                <p>• Parental controls included</p>
              </div>
            </div>
          )}
        </Card>

        {/* Devices Summary */}
        {devices.selectedDevices.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="w-6 h-6 text-[#00A9CE]" />
              <h3 className="text-xl font-bold">
                Selected Devices ({devices.selectedDevices.length})
              </h3>
            </div>
            <div className="space-y-3">
              {devices.selectedDevices.map((item) => (
                <div
                  key={item.deviceId}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.device.image}
                      alt={item.device.name}
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <p className="font-semibold">{item.device.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.contractLength}-month contract
                      </p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">
                    $
                    {item.contractLength === 24
                      ? item.device.price24
                      : item.device.price36}
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Safety Settings Summary */}
        {safety.settings.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-[#00A9CE]" />
              <h3 className="text-xl font-bold">
                Safety Settings ({safety.settings.length} members)
              </h3>
            </div>
            <div className="space-y-2">
              {safety.settings.map((setting) => {
                const member = household.members.find(
                  (m) => m.id === setting.memberId
                );
                return (
                  <div
                    key={setting.memberId}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{member?.name || "Member"}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {setting.screenTimeLimit && (
                          <Badge variant="secondary" className="text-xs">
                            {setting.screenTimeLimit}h/day limit
                          </Badge>
                        )}
                        {setting.bedtimeMode?.enabled && (
                          <Badge variant="secondary" className="text-xs">
                            Bedtime mode
                          </Badge>
                        )}
                        {setting.contentFiltering && (
                          <Badge variant="secondary" className="text-xs">
                            Content filter
                          </Badge>
                        )}
                        {setting.locationSharing && (
                          <Badge variant="secondary" className="text-xs">
                            Location sharing
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Total Cost */}
        <Card className="p-6 bg-gradient-to-br from-[#00A9CE]/10 to-white border-2 border-[#00A9CE]/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Total Monthly Cost</h3>
            <p className="text-4xl font-bold text-[#00A9CE]">
              ${summary.totalCost}
              <span className="text-lg text-muted-foreground">/mo</span>
            </p>
          </div>
          {summary.monthlySavings > 0 && (
            <FamilyBundleSavings
              savings={summary.monthlySavings}
              originalTotal={summary.totalCost + summary.monthlySavings}
            />
          )}
        </Card>

        {/* What's Next */}
        <Card className="p-6 bg-muted/30">
          <h4 className="font-semibold mb-3">What's Next?</h4>
          <ul className="space-y-2">
            {[
              "Review your plan and device selections",
              "Complete payment setup",
              "Activate your family plan",
              "Set up devices and parental controls",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A9CE]" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          size="lg"
          className="bg-[#00A9CE] hover:bg-[#0098b8] text-white px-8"
          onClick={onNext}
        >
          Proceed to Checkout
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

