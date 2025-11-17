import { Device } from "../../types/device";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { KidFriendlyBadge } from "./KidFriendlyBadge";
import { TeenSuitableBadge } from "./TeenSuitableBadge";
import { Shield, Battery, Star, CheckCircle2 } from "lucide-react";

interface FamilyDeviceDetailProps {
  device: Device;
  onBack: () => void;
  onAddToPlan: () => void;
}

export function FamilyDeviceDetail({
  device,
  onBack,
  onAddToPlan,
}: FamilyDeviceDetailProps) {
  const isKidFriendly =
    device.price24 < 50 &&
    (device.specs.battery.includes("5000") ||
      device.specs.battery.includes("4000"));
  const isTeenSuitable =
    device.specs.camera.includes("MP") &&
    (device.specs.refreshRate.includes("120") || device.gamingScore);

  // Calculate family suitability scores
  const durabilityScore = device.specs.battery.includes("5000") ? 95 : 75;
  const batteryScore = device.specs.battery.includes("5000") ? 90 : 70;
  const kidSafetyScore = isKidFriendly ? 90 : 60;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        ← Back to Catalog
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Device Image */}
        <div>
          <img
            src={device.image}
            alt={device.name}
            className="w-full h-auto rounded-2xl mb-4"
          />
          <div className="flex flex-wrap gap-2">
            {isKidFriendly && <KidFriendlyBadge />}
            {isTeenSuitable && <TeenSuitableBadge />}
            {device.badges?.map((badge) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        {/* Device Info */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{device.name}</h1>
          <p className="text-xl text-muted-foreground mb-6">{device.brand}</p>

          <div className="space-y-6 mb-8">
            {/* Pricing */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Pricing</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>24-month contract</span>
                  <span className="text-2xl font-bold">
                    ${device.price24}
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>36-month contract</span>
                  <span className="text-2xl font-bold">
                    ${device.price36}
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </span>
                </div>
                {device.upfront && (
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Upfront cost</span>
                    <span>${device.upfront}</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Family Suitability Scores */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Family Suitability</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Durability Score</span>
                    <span className="text-sm font-semibold">{durabilityScore}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-[#00A9CE] h-2 rounded-full"
                      style={{ width: `${durabilityScore}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Battery Life</span>
                    <span className="text-sm font-semibold">{batteryScore}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-[#00A9CE] h-2 rounded-full"
                      style={{ width: `${batteryScore}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Kid Safety Compatibility</span>
                    <span className="text-sm font-semibold">{kidSafetyScore}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-[#00A9CE] h-2 rounded-full"
                      style={{ width: `${kidSafetyScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Specifications */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Camera</p>
                  <p className="font-medium">{device.specs.camera}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Display</p>
                  <p className="font-medium">{device.specs.display}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Battery</p>
                  <p className="font-medium">{device.specs.battery}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Storage</p>
                  <p className="font-medium">{device.specs.storage}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Chipset</p>
                  <p className="font-medium">{device.specs.chipset}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Refresh Rate</p>
                  <p className="font-medium">{device.specs.refreshRate}</p>
                </div>
              </div>
            </Card>

            {/* Family Features */}
            {(isKidFriendly || isTeenSuitable) && (
              <Card className="p-6 bg-[#00A9CE]/5">
                <h3 className="font-semibold mb-4">Why This Works for Families</h3>
                <ul className="space-y-2">
                  {isKidFriendly && (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00A9CE]" />
                      <span className="text-sm">
                        Durable design perfect for kids
                      </span>
                    </li>
                  )}
                  {isTeenSuitable && (
                    <>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00A9CE]" />
                        <span className="text-sm">
                          Great camera for social media
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00A9CE]" />
                        <span className="text-sm">
                          Long battery life for all-day use
                        </span>
                      </li>
                    </>
                  )}
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A9CE]" />
                    <span className="text-sm">
                      Compatible with parental controls
                    </span>
                  </li>
                </ul>
              </Card>
            )}
          </div>

          <Button
            size="lg"
            className="w-full bg-[#00A9CE] hover:bg-[#0098b8] text-white"
            onClick={onAddToPlan}
          >
            Add to Family Plan
          </Button>
        </div>
      </div>
    </div>
  );
}

