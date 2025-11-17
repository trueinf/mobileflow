import { Badge } from "../ui/badge";
import { Sparkles } from "lucide-react";

export function PrestigeBadge() {
  return (
    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
      <Sparkles className="w-3 h-3 mr-1" />
      Premium
    </Badge>
  );
}

