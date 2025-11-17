import { Badge } from "../ui/badge";

interface ConditionBadgeProps {
  condition: 'A' | 'B' | 'C';
}

export function ConditionBadge({ condition }: ConditionBadgeProps) {
  const colors = {
    A: 'bg-green-100 text-green-800',
    B: 'bg-yellow-100 text-yellow-800',
    C: 'bg-orange-100 text-orange-800',
  };

  return (
    <Badge className={colors[condition]}>
      Grade {condition}
    </Badge>
  );
}

