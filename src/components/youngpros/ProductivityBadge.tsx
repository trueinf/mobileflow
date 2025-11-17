import { Badge } from "../ui/badge";
import { Briefcase } from "lucide-react";

export function ProductivityBadge() {
  return (
    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
      <Briefcase className="w-3 h-3 mr-1" />
      Work Ready
    </Badge>
  );
}

