import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useValueStore } from "../../stores/valueStore";
import { CheckCircle2, XCircle, Smartphone, Info, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface BYOCheckerProps {
  onBack?: () => void;
}

export function BYOChecker({ onBack }: BYOCheckerProps) {
  const { byo, checkBYOCompatibility, setBYOInfo } = useValueStore();
  const [deviceModel, setDeviceModel] = useState(byo.deviceModel);
  const [imei, setIMEI] = useState(byo.imei || "");

  const handleCheck = () => {
    checkBYOCompatibility(deviceModel);
    if (imei) {
      setBYOInfo({ imei });
    }
  };

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
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Bring Your Own Device</h1>
            <p className="text-muted-foreground">
              Check if your device is compatible and find the best plan
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Device Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="device-model">Device Model</Label>
              <Input
                id="device-model"
                placeholder="e.g., iPhone 15 Pro, Samsung Galaxy S24"
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter your device make and model
              </p>
            </div>

            <div>
              <Label htmlFor="imei">IMEI (Optional)</Label>
              <Input
                id="imei"
                placeholder="Enter IMEI for detailed check"
                value={imei}
                onChange={(e) => setIMEI(e.target.value)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Find IMEI in Settings → About Phone
              </p>
            </div>

            <Button
              onClick={handleCheck}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Check Compatibility
            </Button>
          </div>
        </Card>

        {deviceModel && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4">Compatibility Status</h3>
              
              {byo.isCompatible ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-600">Device is Compatible!</p>
                      <p className="text-sm text-muted-foreground">
                        Your {deviceModel} works with Optus
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-2">SIM Type Support:</p>
                    <Badge variant="secondary" className="mr-2">
                      {byo.simType === 'both' ? 'Physical & eSIM' : byo.simType === 'esim' ? 'eSIM' : 'Physical SIM'}
                    </Badge>
                  </div>

                  {byo.planSuggestions.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-3">Recommended Plans:</p>
                      <div className="space-y-2">
                        {byo.planSuggestions.map((plan) => (
                          <Card key={plan.id} className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold">{plan.name}</p>
                                <p className="text-xs text-muted-foreground">{plan.data}</p>
                              </div>
                              <p className="text-xl font-bold text-green-600">
                                ${plan.price}
                                <span className="text-sm text-muted-foreground">/mo</span>
                              </p>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Start Switching with Your Device
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                    <XCircle className="w-8 h-8 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-600">Compatibility Unknown</p>
                      <p className="text-sm text-muted-foreground">
                        Please verify device compatibility with our support team
                      </p>
                    </div>
                  </div>

                  <Card className="p-4 bg-blue-50">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-semibold mb-1">Need Help?</p>
                        <p className="text-muted-foreground">
                          Contact our support team to verify your device compatibility.
                          Most modern smartphones are compatible with Optus.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </div>

      <Card className="p-6 mt-6 bg-muted/30">
        <h3 className="font-semibold mb-4">BYO Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "No Device Cost", desc: "Use your existing device" },
            { title: "Lower Plans", desc: "Plans start from $39/mo" },
            { title: "Flexible", desc: "No device contract" },
          ].map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">{benefit.title}</p>
                <p className="text-xs text-muted-foreground">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

