import { Badge } from "../ui/badge";
import { Shield } from "lucide-react";

export function KidFriendlyBadge() {
  return (
    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
      <Shield className="w-3 h-3 mr-1" />
      Kid-Friendly
    </Badge>
  );
}

