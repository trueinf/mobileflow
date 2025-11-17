import { YPLandingHero } from "./YPLandingHero";
import { YPBenefits } from "./YPBenefits";

interface YPLandingProps {
  onStartScorer: () => void;
  onViewDevices: () => void;
  onViewTravel: () => void;
  onViewESIM: () => void;
  onViewPlans: () => void;
}

export function YPLanding({
  onStartScorer,
  onViewDevices,
  onViewTravel,
  onViewESIM,
  onViewPlans,
}: YPLandingProps) {
  return (
    <div>
      <YPLandingHero
        onStartScorer={onStartScorer}
        onViewDevices={onViewDevices}
        onViewTravel={onViewTravel}
        onViewESIM={onViewESIM}
      />
      <YPBenefits />
    </div>
  );
}

