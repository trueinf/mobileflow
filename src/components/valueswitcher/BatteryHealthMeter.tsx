import { Card } from "../ui/card";
import { Battery } from "lucide-react";

interface BatteryHealthMeterProps {
  health: number; // percentage
}

export function BatteryHealthMeter({ health }: BatteryHealthMeterProps) {
  const getColor = () => {
    if (health >= 90) return '#10b981'; // green
    if (health >= 75) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3 mb-3">
        <Battery className="w-5 h-5 text-muted-foreground" />
        <div className="flex-1">
          <p className="text-sm font-semibold">Battery Health</p>
          <div className="w-full bg-muted rounded-full h-2 mt-1">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${health}%`,
                backgroundColor: getColor(),
              }}
            />
          </div>
        </div>
        <span className="text-lg font-bold" style={{ color: getColor() }}>
          {health}%
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        {health >= 90
          ? 'Excellent condition'
          : health >= 75
          ? 'Good condition'
          : 'Fair condition'}
      </p>
    </Card>
  );
}

