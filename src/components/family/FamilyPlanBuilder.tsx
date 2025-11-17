import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { StepNavigation } from "./StepNavigation";
import { StepHousehold } from "./steps/StepHousehold";
import { StepUsage } from "./steps/StepUsage";
import { StepRecommender } from "./steps/StepRecommender";
import { StepDevices } from "./steps/StepDevices";
import { StepSafety } from "./steps/StepSafety";
import { StepSummary } from "./steps/StepSummary";
import { Device } from "../../types/device";

interface FamilyPlanBuilderProps {
  onComplete: () => void;
  onViewDevice: (device: Device) => void;
  onBack?: () => void;
}

const steps = [
  { number: 1, title: "Household" },
  { number: 2, title: "Usage" },
  { number: 3, title: "Plan" },
  { number: 4, title: "Devices" },
  { number: 5, title: "Safety" },
  { number: 6, title: "Summary" },
];

export function FamilyPlanBuilder({ onComplete, onViewDevice, onBack }: FamilyPlanBuilderProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepHousehold onNext={handleNext} />;
      case 2:
        return <StepUsage onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <StepRecommender onNext={handleNext} onBack={handleBack} />;
      case 4:
        return (
          <StepDevices
            onNext={handleNext}
            onBack={handleBack}
            onViewDevice={onViewDevice}
          />
        );
      case 5:
        return <StepSafety onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <StepSummary onNext={onComplete} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-6">
        {onBack && currentStep === 1 && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        )}
        <StepNavigation
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
        {renderStep()}
      </div>
    </div>
  );
}

