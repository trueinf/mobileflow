import { Device } from "../types/device";
import { Plus, Info } from "lucide-react";
import { Button } from "./ui/button";

interface DeviceCardProps {
  device: Device;
  onSelect?: (device: Device) => void;
  onCompare?: (device: Device) => void;
  variant?: "grid" | "carousel";
  gamingMode?: boolean;
}

export function DeviceCard({
  device,
  onSelect,
  onCompare,
  variant = "grid",
  gamingMode,
}: DeviceCardProps) {
  // Calculate gaming score for display
  const gamingScore = gamingMode ? calculateGamingScore(device) : 0;
  
  function calculateGamingScore(device: Device): number {
    let score = 60; // Base score
    
    if (device.specs.refreshRate === "120Hz") score += 20;
    if (device.specs.refreshRate === "144Hz") score += 25;
    
    const battery = parseInt(device.specs.battery);
    if (battery >= 5000) score += 15;
    else if (battery >= 4500) score += 10;
    
    if (device.specs.chipset.includes("8 Gen 3") || device.specs.chipset.includes("A17")) score += 5;
    
    return Math.min(95, score);
  }
  return (
    <div
      className={`bg-white rounded-2xl border border-border hover:border-[#00A9CE] hover:shadow-lg transition-all group ${
        variant === "carousel" ? "min-w-[280px]" : ""
      }`}
    >
      <div className="p-6">
        {/* Image */}
        <div className="relative aspect-square mb-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden">
          <img
            src={device.image}
            alt={device.name}
            className="w-3/4 h-3/4 object-contain group-hover:scale-105 transition-transform"
          />
          {device.matchScore && (
            <div className="absolute top-3 right-3 bg-[#00A9CE] text-white px-3 py-1 rounded-full">
              {device.matchScore}% match
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          {gamingMode && device.specs.refreshRate === "120Hz" && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Low-latency
            </span>
          )}
          {device.badges && device.badges.slice(0, gamingMode ? 1 : 2).map((badge, idx) => (
            <span
              key={idx}
              className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Best For */}
        {device.bestFor && (
          <p className="text-sm text-muted-foreground mb-3">{device.bestFor}</p>
        )}

        {/* Name */}
        <h3 className="mb-2">{device.name}</h3>

        {/* Quick Stats - Reorder for gaming mode */}
        <div className="space-y-2 mb-4">
          {gamingMode ? (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Gaming</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-purple-600 h-1.5 rounded-full"
                    style={{
                      width: device.specs.refreshRate === "120Hz" ? "95%" : "70%",
                    }}
                  />
                </div>
                <span className="text-xs text-purple-600 font-medium">{gamingScore}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Battery</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-[#00A9CE] h-1.5 rounded-full"
                    style={{
                      width:
                        parseInt(device.specs.battery) > 4500 ? "95%" : "75%",
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Camera</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-[#00A9CE] h-1.5 rounded-full"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Camera</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-[#00A9CE] h-1.5 rounded-full"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Gaming</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-[#00A9CE] h-1.5 rounded-full"
                    style={{
                      width: device.specs.refreshRate === "120Hz" ? "95%" : "70%",
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Battery</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-[#00A9CE] h-1.5 rounded-full"
                    style={{
                      width:
                        parseInt(device.specs.battery) > 4500 ? "95%" : "75%",
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-[#00A9CE]">${device.price36}</span>
            <span className="text-muted-foreground text-sm">/mo (36mo)</span>
          </div>
          <div className="text-xs text-muted-foreground">
            or ${device.price24}/mo (24mo)
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => onSelect?.(device)}
            className="flex-1 bg-[#00A9CE] hover:bg-[#0098b8]"
          >
            View details
          </Button>
          <Button
            onClick={() => onCompare?.(device)}
            variant="outline"
            size="icon"
            className="border-[#00A9CE] text-[#00A9CE] hover:bg-[#00A9CE] hover:text-white"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
