import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Card } from "../../ui/card";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Switch } from "../../ui/switch";
import { useFamilyStore } from "../../../stores/familyStore";
import { motion } from "framer-motion";

interface StepUsageProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepUsage({ onNext, onBack }: StepUsageProps) {
  const { usage, setUsage } = useFamilyStore();

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">How Does Your Family Use Data?</h2>
        <p className="text-muted-foreground">
          This helps us recommend the right data plan for everyone.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            Overall Data Usage
          </Label>
          <RadioGroup
            value={usage.dataUsage}
            onValueChange={(value: "light" | "moderate" | "heavy") =>
              setUsage({ ...usage, dataUsage: value })
            }
            className="grid grid-cols-3 gap-4"
          >
            <div className={`flex items-start p-4 rounded-lg border-2 transition-colors cursor-pointer ${
              usage.dataUsage === "light" 
                ? "border-[#00A9CE] bg-[#00A9CE]/5" 
                : "border-border hover:border-[#00A9CE]/50"
            }`} onClick={() => setUsage({ ...usage, dataUsage: "light" })}>
              <RadioGroupItem value="light" id="light" className="hidden" />
              <Label htmlFor="light" className="cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Light</p>
                  <p className="text-sm text-muted-foreground">
                    Mostly calls & texts
                  </p>
                </div>
              </Label>
            </div>
            <div className={`flex items-start p-4 rounded-lg border-2 transition-colors cursor-pointer ${
              usage.dataUsage === "moderate" 
                ? "border-[#00A9CE] bg-[#00A9CE]/5" 
                : "border-border hover:border-[#00A9CE]/50"
            }`} onClick={() => setUsage({ ...usage, dataUsage: "moderate" })}>
              <RadioGroupItem value="moderate" id="moderate" className="hidden" />
              <Label htmlFor="moderate" className="cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Moderate</p>
                  <p className="text-sm text-muted-foreground">
                    Some streaming & browsing
                  </p>
                </div>
              </Label>
            </div>
            <div className={`flex items-start p-4 rounded-lg border-2 transition-colors cursor-pointer ${
              usage.dataUsage === "heavy" 
                ? "border-[#00A9CE] bg-[#00A9CE]/5" 
                : "border-border hover:border-[#00A9CE]/50"
            }`} onClick={() => setUsage({ ...usage, dataUsage: "heavy" })}>
              <RadioGroupItem value="heavy" id="heavy" className="hidden" />
              <Label htmlFor="heavy" className="cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Heavy</p>
                  <p className="text-sm text-muted-foreground">
                    Lots of streaming & downloads
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </Card>

        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            Call Usage
          </Label>
          <RadioGroup
            value={usage.callUsage}
            onValueChange={(value: "low" | "medium" | "high") =>
              setUsage({ ...usage, callUsage: value })
            }
            className="grid grid-cols-3 gap-4"
          >
            <div className={`flex items-center p-4 rounded-lg border-2 transition-colors cursor-pointer ${
              usage.callUsage === "low" 
                ? "border-[#00A9CE] bg-[#00A9CE]/5" 
                : "border-border hover:border-[#00A9CE]/50"
            }`} onClick={() => setUsage({ ...usage, callUsage: "low" })}>
              <RadioGroupItem value="low" id="call-low" className="hidden" />
              <Label htmlFor="call-low" className="cursor-pointer">
                Low
              </Label>
            </div>
            <div className={`flex items-center p-4 rounded-lg border-2 transition-colors cursor-pointer ${
              usage.callUsage === "medium" 
                ? "border-[#00A9CE] bg-[#00A9CE]/5" 
                : "border-border hover:border-[#00A9CE]/50"
            }`} onClick={() => setUsage({ ...usage, callUsage: "medium" })}>
              <RadioGroupItem value="medium" id="call-medium" className="hidden" />
              <Label htmlFor="call-medium" className="cursor-pointer">
                Medium
              </Label>
            </div>
            <div className={`flex items-center p-4 rounded-lg border-2 transition-colors cursor-pointer ${
              usage.callUsage === "high" 
                ? "border-[#00A9CE] bg-[#00A9CE]/5" 
                : "border-border hover:border-[#00A9CE]/50"
            }`} onClick={() => setUsage({ ...usage, callUsage: "high" })}>
              <RadioGroupItem value="high" id="call-high" className="hidden" />
              <Label htmlFor="call-high" className="cursor-pointer">
                High
              </Label>
            </div>
          </RadioGroup>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-semibold">Video Streaming</Label>
                <p className="text-sm text-muted-foreground">
                  Netflix, YouTube, etc.
                </p>
              </div>
              <Switch
                checked={usage.videoStreaming}
                onCheckedChange={(checked) =>
                  setUsage({ ...usage, videoStreaming: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-semibold">Gaming</Label>
                <p className="text-sm text-muted-foreground">
                  Online gaming & downloads
                </p>
              </div>
              <Switch
                checked={usage.gaming}
                onCheckedChange={(checked) =>
                  setUsage({ ...usage, gaming: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-semibold">Messaging</Label>
                <p className="text-sm text-muted-foreground">
                  WhatsApp, iMessage, etc.
                </p>
              </div>
              <Switch
                checked={usage.messaging}
                onCheckedChange={(checked) =>
                  setUsage({ ...usage, messaging: checked })
                }
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          size="lg"
          className="bg-[#00A9CE] hover:bg-[#0098b8] text-white px-8"
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

