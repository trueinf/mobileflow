import { Badge } from "../ui/badge";
import { Plane } from "lucide-react";

export function TravelReadyBadge() {
  return (
    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
      <Plane className="w-3 h-3 mr-1" />
      Travel Ready
    </Badge>
  );
}

