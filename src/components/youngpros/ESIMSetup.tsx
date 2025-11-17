import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useYoungProStore } from "../../stores/youngProStore";
import { CheckCircle2, QrCode, Smartphone, AlertCircle, Download, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface ESIMSetupProps {
  onBack?: () => void;
}

export function ESIMSetup({ onBack }: ESIMSetupProps) {
  const { esim, setESIMInfo, devices } = useYoungProStore();
  const [deviceModel, setDeviceModel] = useState("");
  const [qrCode, setQRCode] = useState<string | null>(null);

  useEffect(() => {
    // Check compatibility
    if (deviceModel) {
      const compatible = deviceModel.toLowerCase().includes("iphone") ||
                        deviceModel.toLowerCase().includes("pixel") ||
                        deviceModel.toLowerCase().includes("samsung");
      
      setESIMInfo({
        compatible,
        deviceInfo: {
          model: deviceModel,
          carrier: "Optus",
        },
      });

      if (compatible) {
        // Generate mock QR code
        setQRCode("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5lU0lNIFEgUiBDb2RlPC90ZXh0Pjwvc3ZnPg==");
      }
    }
  }, [deviceModel, setESIMInfo]);

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
            <Smartphone className="w-6 h-6 text-[#00A9CE]" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">eSIM Quick Setup</h1>
            <p className="text-muted-foreground">
              Activate your eSIM in minutes - no physical SIM card needed
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Check Compatibility</h3>
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
            </div>
            {deviceModel && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {esim.compatible ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold">Your device is eSIM compatible!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertCircle className="w-5 h-5" />
                    <span>Your device may not support eSIM. Please check with your device manufacturer.</span>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </Card>

        {esim.compatible && qrCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6 border-2 border-[#00A9CE]">
              <div className="flex items-center gap-3 mb-6">
                <QrCode className="w-6 h-6 text-[#00A9CE]" />
                <h3 className="text-xl font-bold">Your eSIM QR Code</h3>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="bg-white p-4 rounded-lg border-2 border-dashed border-[#00A9CE] inline-block">
                    <img
                      src={qrCode}
                      alt="eSIM QR Code"
                      className="w-48 h-48"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = qrCode;
                      link.download = "optus-esim-qr.png";
                      link.click();
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download QR Code
                  </Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Activation Steps</h4>
                    <ol className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-[#00A9CE]">1.</span>
                        <span>Open Settings on your device</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-[#00A9CE]">2.</span>
                        <span>Go to Cellular/Mobile Data settings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-[#00A9CE]">3.</span>
                        <span>Tap "Add Cellular Plan" or "Add eSIM"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-[#00A9CE]">4.</span>
                        <span>Scan this QR code with your device camera</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-[#00A9CE]">5.</span>
                        <span>Follow the on-screen instructions</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm">
                      <strong>Tip:</strong> Make sure you're connected to Wi-Fi during activation.
                      Your eSIM will be active within 5-10 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <Card className="p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">eSIM Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Instant Activation", desc: "No waiting for physical SIM delivery" },
              { title: "Dual SIM Support", desc: "Use two numbers on one device" },
              { title: "Travel Friendly", desc: "Easy to switch between carriers" },
            ].map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00A9CE] mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">{benefit.title}</p>
                  <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

