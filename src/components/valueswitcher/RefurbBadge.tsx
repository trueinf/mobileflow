import { Badge } from "../ui/badge";
import { Shield } from "lucide-react";

export function RefurbBadge() {
  return (
    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
      <Shield className="w-3 h-3 mr-1" />
      Refurb Certified
    </Badge>
  );
}

