import { Badge } from "../ui/badge";
import { Camera, Battery } from "lucide-react";

export function TeenSuitableBadge() {
  return (
    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
      <Camera className="w-3 h-3 mr-1" />
      <Battery className="w-3 h-3 mr-1" />
      Teen Perfect
    </Badge>
  );
}

