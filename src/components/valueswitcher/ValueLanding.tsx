import { ValueLandingHero } from "./ValueLandingHero";
import { SavingsSummary } from "./SavingsSummary";

interface ValueLandingProps {
  onViewDeals: () => void;
  onViewCalculator: () => void;
  onViewRefurb: () => void;
  onViewCompare: () => void;
  onViewBYO: () => void;
  onViewPorting: () => void;
}

export function ValueLanding({
  onViewDeals,
  onViewCalculator,
  onViewRefurb,
  onViewCompare,
  onViewBYO,
  onViewPorting,
}: ValueLandingProps) {
  return (
    <div>
      <ValueLandingHero
        onViewDeals={onViewDeals}
        onViewCalculator={onViewCalculator}
        onViewRefurb={onViewRefurb}
        onViewCompare={onViewCompare}
        onViewBYO={onViewBYO}
      />
      <SavingsSummary />
    </div>
  );
}

