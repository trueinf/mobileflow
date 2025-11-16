import { Zap, Battery, MapPin, TrendingUp, Thermometer, Wifi } from "lucide-react";

interface InsightsBarProps {
  gamingMode?: boolean;
}

export function InsightsBar({ gamingMode }: InsightsBarProps) {
  const gamingInsights = [
    { icon: Wifi, text: "Latency predictor available for your suburb", emoji: "📡" },
    { icon: Zap, text: "120/144Hz panels prioritized", emoji: "⚡" },
    { icon: Thermometer, text: "Thermal management matters for long sessions", emoji: "🌡️" },
    { icon: Battery, text: "Large batteries for extended play", emoji: "🔋" },
  ];

  const regularInsights = [
    { icon: Zap, text: "High-refresh displays", emoji: "⚡" },
    { icon: Battery, text: "Battery matters", emoji: "🔋" },
    { icon: MapPin, text: "Nearest store 5 km", emoji: "📍" },
    { icon: TrendingUp, text: "Gen Z loves 120Hz", emoji: "📈" },
  ];

  const insights = gamingMode ? gamingInsights : regularInsights;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-[#00A9CE] rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <h3>Optus Insights (AI)</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="bg-white px-4 py-2 rounded-full border border-border flex items-center gap-2 hover:border-[#00A9CE] transition-colors cursor-pointer"
          >
            <span>{insight.emoji}</span>
            <span className="text-sm">{insight.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
