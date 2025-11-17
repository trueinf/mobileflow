import { Device } from "../../types/device";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { ScoreRing } from "./ScoreRing";
import { ProductivityBadge } from "./ProductivityBadge";
import { PrestigeBadge } from "./PrestigeBadge";
import { TravelReadyBadge } from "./TravelReadyBadge";
import { Briefcase, Battery, Camera, Globe, CheckCircle2 } from "lucide-react";

interface YPDeviceDetailProps {
  device: Device;
  onBack: () => void;
  onAddToPlan: () => void;
}

export function YPDeviceDetail({
  device,
  onBack,
  onAddToPlan,
}: YPDeviceDetailProps) {
  // Calculate YP-specific scores
  const battery = parseInt(device.specs.battery) || 0;
  const batteryScore = Math.min(100, (battery / 5000) * 100);
  const workScore = Math.min(100,
    (device.specs.refreshRate.includes("120") ? 30 : 15) +
    (batteryScore * 0.4) +
    (device.price24 < 60 ? 30 : device.price24 < 80 ? 20 : 10)
  );
  const prestigeScore = Math.min(100,
    (device.price24 >= 80 ? 40 : device.price24 >= 60 ? 25 : 10) +
    (device.specs.camera.includes("MP") ? 30 : 15) +
    (device.brand === "Apple" || device.brand === "Samsung" ? 30 : 15)
  );
  const valueScore = Math.min(100,
    (device.price24 < 50 ? 40 : device.price24 < 70 ? 25 : 10) +
    (batteryScore * 0.3) +
    (workScore * 0.3)
  );

  const isTravelReady = batteryScore > 80 && device.specs.refreshRate.includes("120");

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
            {workScore > 70 && <ProductivityBadge />}
            {prestigeScore > 70 && <PrestigeBadge />}
            {isTravelReady && <TravelReadyBadge />}
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
            {/* YP Scores */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Young Professional Scores</h3>
              <div className="grid grid-cols-2 gap-6">
                <ScoreRing score={workScore} label="Work Score" color="#00A9CE" size={100} />
                <ScoreRing score={batteryScore} label="Battery" color="#10b981" size={100} />
                <ScoreRing score={prestigeScore} label="Prestige" color="#8b5cf6" size={100} />
                <ScoreRing score={valueScore} label="Value" color="#f59e0b" size={100} />
              </div>
            </Card>

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
              </div>
            </Card>

            {/* Work Features */}
            <Card className="p-6 bg-[#00A9CE]/5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#00A9CE]" />
                Work Features
              </h3>
              <ul className="space-y-2">
                {[
                  device.specs.refreshRate.includes("120") && "120Hz display for smooth multitasking",
                  batteryScore > 80 && "All-day battery life",
                  device.specs.chipset.includes("8 Gen") || device.specs.chipset.includes("A17") && "Flagship performance",
                  "5G connectivity",
                  "Fast charging support",
                ].filter(Boolean).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#00A9CE]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Travel Readiness */}
            {isTravelReady && (
              <Card className="p-6 bg-green-50">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  Travel Ready
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>eSIM compatible</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Long battery for travel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Global band support</span>
                  </li>
                </ul>
              </Card>
            )}

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
          </div>

          <Button
            size="lg"
            className="w-full bg-[#00A9CE] hover:bg-[#0098b8] text-white"
            onClick={onAddToPlan}
          >
            Add to Plan
          </Button>
        </div>
      </div>
    </div>
  );
}

