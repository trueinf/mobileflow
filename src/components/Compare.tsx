import { Device } from "../types/device";
import { Button } from "./ui/button";
import { Sparkles, Check, X as XIcon } from "lucide-react";

interface CompareProps {
  devices: Device[];
  onBack: () => void;
  onSelectDevice: (device: Device) => void;
  gamingMode?: boolean;
}

export function Compare({ devices, onBack, onSelectDevice, gamingMode }: CompareProps) {
  if (devices.length < 2) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Select at least 2 devices to compare
          </p>
          <Button onClick={onBack}>Go back</Button>
        </div>
      </div>
    );
  }

  const [device1, device2] = devices;

  // AI Verdict
  const getAIVerdict = () => {
    if (gamingMode) {
      const device1Battery = parseInt(device1.specs.battery);
      const device2Battery = parseInt(device2.specs.battery);
      
      if (device1.specs.refreshRate === "120Hz" && device2.specs.refreshRate === "120Hz") {
        if (device1Battery > device2Battery) {
          return `Both deliver smooth 120Hz gaming. ${device1.name} will last longer in extended sessions with its ${device1.specs.battery} battery.`;
        } else {
          return `Both have 120Hz displays. ${device2.name} has superior thermal management for sustained performance.`;
        }
      } else if (device1.specs.refreshRate === "120Hz") {
        return `${device1.name} offers superior gaming with 120Hz refresh rate and lower touch latency. Pick this for competitive gaming.`;
      } else {
        return `${device2.name} is the gaming choice with high refresh rate and better thermal control for long sessions.`;
      }
    }
    
    if (device1.category.includes("creator")) {
      return `If you create content and love taking photos, pick ${device1.name}. For gaming and battery life, go with ${device2.name}.`;
    }
    return `${device1.name} offers better camera quality, while ${device2.name} excels in gaming performance.`;
  };

  const CompareRow = ({
    label,
    value1,
    value2,
    winner,
  }: {
    label: string;
    value1: string | number;
    value2: string | number;
    winner?: 1 | 2 | "tie";
  }) => (
    <div className="grid grid-cols-[1fr_2fr_2fr] gap-4 py-4 border-b border-border">
      <div className="text-muted-foreground">{label}</div>
      <div
        className={`flex items-center gap-2 ${
          winner === 1 ? "text-[#00A9CE]" : ""
        }`}
      >
        {winner === 1 && <Check className="w-5 h-5" />}
        {value1}
      </div>
      <div
        className={`flex items-center gap-2 ${
          winner === 2 ? "text-[#00A9CE]" : ""
        }`}
      >
        {winner === 2 && <Check className="w-5 h-5" />}
        {value2}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-blue-50/30 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Header */}
        <Button onClick={onBack} variant="ghost" className="mb-6">
          ← Back
        </Button>

        <h1 className="mb-8">Compare Phones</h1>

        {/* AI Verdict */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-[#00A9CE] mt-1" />
            <div>
              <h3 className="mb-2">AI Verdict</h3>
              <p className="text-muted-foreground">{getAIVerdict()}</p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-border overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-[1fr_2fr_2fr] gap-4 p-6 bg-secondary/50 border-b border-border">
            <div></div>
            <div>
              <img
                src={device1.image}
                alt={device1.name}
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
              <h3 className="text-center">{device1.name}</h3>
              <p className="text-center text-muted-foreground">
                ${device1.price36}/mo
              </p>
            </div>
            <div>
              <img
                src={device2.image}
                alt={device2.name}
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
              <h3 className="text-center">{device2.name}</h3>
              <p className="text-center text-muted-foreground">
                ${device2.price36}/mo
              </p>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="p-6">
            {gamingMode ? (
              <>
                <CompareRow
                  label="Refresh Rate (FPS)"
                  value1={device1.specs.refreshRate}
                  value2={device2.specs.refreshRate}
                  winner={
                    device1.specs.refreshRate === "120Hz" &&
                    device2.specs.refreshRate !== "120Hz"
                      ? 1
                      : device2.specs.refreshRate === "120Hz" &&
                        device1.specs.refreshRate !== "120Hz"
                      ? 2
                      : "tie"
                  }
                />
                <CompareRow
                  label="Sustained Gaming FPS"
                  value1="High (est. 85 FPS avg)"
                  value2="High (est. 80 FPS avg)"
                  winner={1}
                />
                <CompareRow
                  label="Battery Life (gaming)"
                  value1={device1.specs.battery}
                  value2={device2.specs.battery}
                  winner={
                    parseInt(device1.specs.battery) >
                    parseInt(device2.specs.battery)
                      ? 1
                      : 2
                  }
                />
                <CompareRow
                  label="Thermal Management"
                  value1="Vapor chamber cooling"
                  value2="Standard heat dissipation"
                  winner={1}
                />
                <CompareRow
                  label="Touch Sampling Rate"
                  value1="240Hz"
                  value2="180Hz"
                  winner={1}
                />
                <CompareRow
                  label="Network / 5G Latency"
                  value1="Low (optimized bands)"
                  value2="Low (optimized bands)"
                  winner="tie"
                />
                <CompareRow
                  label="Display"
                  value1={device1.specs.display}
                  value2={device2.specs.display}
                  winner={device1.specs.display.includes("6.8") ? 1 : 2}
                />
                <CompareRow
                  label="Chipset"
                  value1={device1.specs.chipset}
                  value2={device2.specs.chipset}
                />
                <CompareRow
                  label="Price/mo (36mo)"
                  value1={`$${device1.price36}`}
                  value2={`$${device2.price36}`}
                  winner={device1.price36 < device2.price36 ? 1 : 2}
                />
              </>
            ) : (
              <>
                <CompareRow
                  label="Camera"
                  value1={device1.specs.camera}
                  value2={device2.specs.camera}
                  winner={device1.specs.camera.includes("48MP") ? 1 : 2}
                />
                <CompareRow
                  label="Display"
                  value1={device1.specs.display}
                  value2={device2.specs.display}
                  winner={device1.specs.display.includes("6.8") ? 1 : 2}
                />
                <CompareRow
                  label="Refresh Rate"
                  value1={device1.specs.refreshRate}
                  value2={device2.specs.refreshRate}
                  winner="tie"
                />
                <CompareRow
                  label="Battery"
                  value1={device1.specs.battery}
                  value2={device2.specs.battery}
                  winner={
                    parseInt(device1.specs.battery) >
                    parseInt(device2.specs.battery)
                      ? 1
                      : 2
                  }
                />
                <CompareRow
                  label="Storage"
                  value1={device1.specs.storage}
                  value2={device2.specs.storage}
                  winner={
                    parseInt(device1.specs.storage) >
                    parseInt(device2.specs.storage)
                      ? 1
                      : 2
                  }
                />
                <CompareRow
                  label="Chipset"
                  value1={device1.specs.chipset}
                  value2={device2.specs.chipset}
                />
                <CompareRow
                  label="Price/mo (36mo)"
                  value1={`$${device1.price36}`}
                  value2={`$${device2.price36}`}
                  winner={device1.price36 < device2.price36 ? 1 : 2}
                />
                <CompareRow
                  label="Total cost (36mo)"
                  value1={`$${device1.price36 * 36}`}
                  value2={`$${device2.price36 * 36}`}
                  winner={device1.price36 < device2.price36 ? 1 : 2}
                />
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <Button
            onClick={() => onSelectDevice(device1)}
            size="lg"
            className="bg-[#00A9CE] hover:bg-[#0098b8]"
          >
            Choose {device1.name}
          </Button>
          <Button
            onClick={() => onSelectDevice(device2)}
            size="lg"
            className="bg-[#00A9CE] hover:bg-[#0098b8]"
          >
            Choose {device2.name}
          </Button>
        </div>
      </div>
    </div>
  );
}
