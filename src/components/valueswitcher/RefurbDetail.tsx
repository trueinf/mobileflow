import { RefurbDevice } from "../../stores/valueStore";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { RefurbBadge } from "./RefurbBadge";
import { ConditionBadge } from "./ConditionBadge";
import { BatteryHealthMeter } from "./BatteryHealthMeter";
import { Shield, Clock, CheckCircle2 } from "lucide-react";

interface RefurbDetailProps {
  device: RefurbDevice;
  onBack: () => void;
  onAddToPlan: () => void;
}

export function RefurbDetail({ device, onBack, onAddToPlan }: RefurbDetailProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        ← Back to Catalog
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={device.image}
            alt={device.name}
            className="w-full h-auto rounded-2xl mb-4"
          />
          <div className="flex flex-wrap gap-2">
            <RefurbBadge />
            <ConditionBadge condition={device.condition} />
            <Badge variant="secondary">{device.warrantyMonths} month warranty</Badge>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-2">{device.name}</h1>
          <p className="text-xl text-muted-foreground mb-6">{device.brand}</p>

          <div className="space-y-6 mb-8">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Pricing</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>24-month contract</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${device.price24}
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>36-month contract</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${device.price36}
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </span>
                </div>
              </div>
            </Card>

            <BatteryHealthMeter health={device.batteryHealth} />

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Refurbishment Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>Condition Grade</span>
                  </div>
                  <ConditionBadge condition={device.condition} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span>Warranty</span>
                  </div>
                  <span className="font-semibold">{device.warrantyMonths} months</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Estimated Life</span>
                  <span className="font-semibold">{device.estimatedLife}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Certified</span>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-green-50">
              <h3 className="font-semibold mb-4">What's Included</h3>
              <ul className="space-y-2">
                {[
                  "Full device functionality test",
                  "Battery health check",
                  "Screen quality inspection",
                  "Charger and cables included",
                  `${device.warrantyMonths} month warranty`,
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

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
              </div>
            </Card>
          </div>

          <Button
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={onAddToPlan}
          >
            Add to Plan
          </Button>
        </div>
      </div>
    </div>
  );
}

