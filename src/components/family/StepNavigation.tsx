import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "../ui/utils";

interface Step {
  number: number;
  title: string;
}

interface StepNavigationProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export function StepNavigation({ steps, currentStep, completedSteps }: StepNavigationProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.number);
          const isCurrent = currentStep === step.number;
          const isPast = step.number < currentStep;

          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                      isCompleted
                        ? "bg-[#00A9CE] border-[#00A9CE] text-white"
                        : isCurrent
                        ? "bg-[#00A9CE]/10 border-[#00A9CE] text-[#00A9CE]"
                        : "bg-muted border-border text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold">{step.number}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "h-1 flex-1 mx-2 transition-colors",
                        isPast || isCompleted
                          ? "bg-[#00A9CE]"
                          : "bg-border"
                      )}
                    />
                  )}
                </div>
                <p
                  className={cn(
                    "mt-2 text-xs text-center max-w-[100px]",
                    isCurrent ? "font-semibold text-[#00A9CE]" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

