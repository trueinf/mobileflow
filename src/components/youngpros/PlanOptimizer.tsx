import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { useYoungProStore } from "../../stores/youngProStore";
import { plans } from "../../data/devices";
import { TrendingUp, CheckCircle2, Globe, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface PlanOptimizerProps {
  onBack?: () => void;
}

export function PlanOptimizer({ onBack }: PlanOptimizerProps) {
  const { plans: planState, setRecommendedPlan, setAddOns } = useYoungProStore();
  const [workUsage, setWorkUsage] = useState([50]); // GB per month
  const [personalUsage, setPersonalUsage] = useState([30]);
  const [internationalCalls, setInternationalCalls] = useState(false);
  const [roaming, setRoaming] = useState(false);

  const calculateRecommendedPlan = () => {
    const totalUsage = workUsage[0] + personalUsage[0];
    
    let recommendedPlan;
    if (totalUsage > 150) {
      recommendedPlan = plans[0]; // Unlimited
    } else if (totalUsage > 100) {
      recommendedPlan = plans[1]; // 150GB
    } else if (totalUsage > 50) {
      recommendedPlan = plans[2]; // 80GB
    } else {
      recommendedPlan = plans[3]; // 40GB
    }

    const addOnsList: string[] = [];
    if (internationalCalls) {
      addOnsList.push("International Calls");
    }
    if (roaming) {
      addOnsList.push("Roaming Pack");
    }

    setRecommendedPlan(recommendedPlan);
    setAddOns(addOnsList);
  };

  const totalCost = planState.recommendedPlan
    ? planState.recommendedPlan.price + (roaming ? 20 : 0) + (internationalCalls ? 10 : 0)
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {onBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      )}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#00A9CE]/10 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-[#00A9CE]" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Plan Optimizer</h1>
            <p className="text-muted-foreground">
              Find the perfect plan based on your usage patterns
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Your Usage</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Work Data Usage</Label>
                <span className="text-sm font-semibold text-[#00A9CE]">
                  {workUsage[0]} GB/month
                </span>
              </div>
              <Slider
                value={workUsage}
                onValueChange={setWorkUsage}
                min={0}
                max={200}
                step={5}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Email, video calls, cloud sync, etc.
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Personal Data Usage</Label>
                <span className="text-sm font-semibold text-[#00A9CE]">
                  {personalUsage[0]} GB/month
                </span>
              </div>
              <Slider
                value={personalUsage}
                onValueChange={setPersonalUsage}
                min={0}
                max={200}
                step={5}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Streaming, social media, browsing, etc.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <Label>International Calls</Label>
                  <p className="text-xs text-muted-foreground">
                    Unlimited calls to selected countries
                  </p>
                </div>
                <Switch
                  checked={internationalCalls}
                  onCheckedChange={setInternationalCalls}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Roaming Pack</Label>
                  <p className="text-xs text-muted-foreground">
                    Data for international travel
                  </p>
                </div>
                <Switch
                  checked={roaming}
                  onCheckedChange={setRoaming}
                />
              </div>
            </div>

            <Button
              onClick={calculateRecommendedPlan}
              className="w-full bg-[#00A9CE] hover:bg-[#0098b8]"
            >
              Calculate Best Plan
            </Button>
          </div>
        </Card>

        {planState.recommendedPlan && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 border-2 border-[#00A9CE]">
              <h3 className="text-xl font-bold mb-4">Recommended Plan</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-[#00A9CE]">
                    ${planState.recommendedPlan.price}
                    <span className="text-lg text-muted-foreground">/mo</span>
                  </p>
                  <p className="font-semibold mt-1">
                    {planState.recommendedPlan.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {planState.recommendedPlan.data} data included
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Includes:</p>
                  <ul className="space-y-1">
                    {planState.recommendedPlan.perks?.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#00A9CE]" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {planState.addOns.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-semibold mb-2">Add-ons:</p>
                    <div className="flex flex-wrap gap-2">
                      {planState.addOns.map((addon) => (
                        <Badge key={addon} variant="secondary">
                          {addon}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Monthly Cost</span>
                    <span className="text-2xl font-bold text-[#00A9CE]">
                      ${totalCost}
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-[#00A9CE] hover:bg-[#0098b8]">
                  Select This Plan
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      <Card className="p-6 mt-6 bg-muted/30">
        <h3 className="font-semibold mb-4">Usage Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold mb-1">Work Usage</p>
            <p className="text-muted-foreground">
              Video calls use ~1GB/hour. Cloud sync and email are minimal.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1">Personal Usage</p>
            <p className="text-muted-foreground">
              Streaming HD video uses ~3GB/hour. Social media is much less.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

