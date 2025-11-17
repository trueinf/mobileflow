import { Badge } from "../ui/badge";
import { DollarSign } from "lucide-react";

export function ValueBadge() {
  return (
    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
      <DollarSign className="w-3 h-3 mr-1" />
      Best Value
    </Badge>
  );
}

