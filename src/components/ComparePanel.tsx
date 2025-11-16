import { Device } from "../types/device";
import { X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface ComparePanelProps {
  devices: Device[];
  onRemove: (deviceId: string) => void;
  onCompare: () => void;
  gamingMode?: boolean;
}

export function ComparePanel({ devices, onRemove, onCompare, gamingMode }: ComparePanelProps) {
  if (devices.length === 0) return null;

  const getAIHint = () => {
    if (devices.length === 2) {
      if (gamingMode) {
        const device1 = devices[0];
        const device2 = devices[1];
        
        const device1Hz = device1.specs.refreshRate;
        const device2Hz = device2.specs.refreshRate;
        const device1Battery = parseInt(device1.specs.battery);
        const device2Battery = parseInt(device2.specs.battery);
        
        if (device1Hz === device2Hz && device1Battery > device2Battery) {
          return `AI: Both have ${device1Hz} displays, but ${device1.name} has superior battery life for longer gaming sessions.`;
        } else if (device1Battery > device2Battery) {
          return `AI: ${device1.name} has better sustained FPS and battery. ${device2.name} has faster touch response.`;
        } else {
          return `AI: ${device2.name} offers better thermal management. ${device1.name} has lower latency on 5G.`;
        }
      }
      return `AI: ${devices[0].name} has better camera, ${devices[1].name} has longer battery. Compare to decide!`;
    }
    return "Select another device to compare";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-2xl z-40 animate-in slide-in-from-bottom">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-sm text-muted-foreground">
              Comparing ({devices.length}/3):
            </span>
            <div className="flex gap-3 flex-1 overflow-x-auto">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg whitespace-nowrap"
                >
                  <img
                    src={device.image}
                    alt={device.name}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-sm">{device.name}</span>
                  <button
                    onClick={() => onRemove(device.id)}
                    className="ml-2 hover:bg-white rounded-full p-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {devices.length >= 2 && (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-[#00A9CE] bg-blue-50 px-4 py-2 rounded-lg">
                <Sparkles className="w-4 h-4" />
                <span>{getAIHint()}</span>
              </div>
              <Button
                onClick={onCompare}
                className="bg-[#00A9CE] hover:bg-[#0098b8]"
              >
                Compare now
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
