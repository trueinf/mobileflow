import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ScoreRing } from "./ScoreRing";
import { ScorerResults } from "../../stores/youngProStore";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface ValuePrestigeResultCardProps {
  results: ScorerResults;
  onComplete: () => void;
  onBack: () => void;
}

export function ValuePrestigeResultCard({
  results,
  onComplete,
  onBack,
}: ValuePrestigeResultCardProps) {
  const getRecommendationColor = () => {
    if (results.recommendation === "value") return "text-green-600";
    if (results.recommendation === "prestige") return "text-purple-600";
    return "text-blue-600";
  };

  const getRecommendationIcon = () => {
    if (results.recommendation === "value") return TrendingDown;
    if (results.recommendation === "prestige") return TrendingUp;
    return Minus;
  };

  const Icon = getRecommendationIcon();

  return (
    <div className="space-y-6">
      <Card className="p-8 border-2 border-[#00A9CE]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Your Profile</h2>
          <Badge
            className={`text-lg px-4 py-2 ${getRecommendationColor()} bg-opacity-10`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {results.recommendation === "value"
              ? "Value Leaning"
              : results.recommendation === "prestige"
              ? "Prestige Leaning"
              : "Balanced"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <ScoreRing
            score={results.valueScore}
            label="Value Score"
            color="#10b981"
          />
          <ScoreRing
            score={results.prestigeScore}
            label="Prestige Score"
            color="#8b5cf6"
          />
          <ScoreRing
            score={results.workScore}
            label="Work Score"
            color="#00A9CE"
          />
        </div>

        <div className="bg-muted/50 rounded-lg p-6">
          <h3 className="font-semibold mb-4">What This Means</h3>
          <div className="space-y-3 text-sm">
            {results.recommendation === "value" && (
              <>
                <p>
                  You prioritize functionality and value. We'll recommend devices
                  that offer excellent performance without the premium price tag.
                </p>
                <p>
                  Focus on: Battery life, productivity features, and cost-effective
                  plans.
                </p>
              </>
            )}
            {results.recommendation === "prestige" && (
              <>
                <p>
                  You value premium design and cutting-edge features. We'll
                  recommend top-tier devices that reflect your professional image.
                </p>
                <p>
                  Focus on: Premium brands, advanced cameras, and flagship
                  performance.
                </p>
              </>
            )}
            {results.recommendation === "balanced" && (
              <>
                <p>
                  You seek the perfect balance between value and prestige. We'll
                  recommend devices that offer premium features at reasonable
                  prices.
                </p>
                <p>
                  Focus on: Mid-to-high tier devices with strong productivity
                  features.
                </p>
              </>
            )}
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Retake Quiz
        </Button>
        <Button
          size="lg"
          className="bg-[#00A9CE] hover:bg-[#0098b8] text-white px-8"
          onClick={onComplete}
        >
          View Recommended Devices
        </Button>
      </div>
    </div>
  );
}

