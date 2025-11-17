import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingDown } from "lucide-react";

interface FamilyBundleSavingsProps {
  savings: number;
  originalTotal?: number;
}

export function FamilyBundleSavings({ savings, originalTotal }: FamilyBundleSavingsProps) {
  const percentage = originalTotal ? Math.round((savings / originalTotal) * 100) : 0;
  
  return (
    <Card className="p-4 bg-gradient-to-br from-[#00A9CE]/10 to-white border-[#00A9CE]/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-[#00A9CE]" />
          <div>
            <p className="text-sm text-muted-foreground">Family Bundle Savings</p>
            <p className="text-2xl font-bold text-[#00A9CE]">${savings}/mo</p>
          </div>
        </div>
        {percentage > 0 && (
          <Badge className="bg-[#00A9CE] text-white">
            Save {percentage}%
          </Badge>
        )}
      </div>
    </Card>
  );
}

