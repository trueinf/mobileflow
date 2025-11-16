import { useState } from "react";
import { X, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Device } from "../types/device";
import { devices } from "../data/devices";
import { Slider } from "./ui/slider";

interface AIPhoneFinderProps {
  isOpen: boolean;
  onClose: () => void;
  onResults: (results: Device[]) => void;
}

type Step = "style" | "budget" | "priority" | "ownership" | "results";

export function AIPhoneFinder({ isOpen, onClose, onResults }: AIPhoneFinderProps) {
  const [step, setStep] = useState<Step>("style");
  const [answers, setAnswers] = useState({
    style: "",
    budget: "",
    priority: 50, // 0=Camera, 50=Balanced, 100=Gaming
    ownership: "",
    tradeIn: false,
  });

  if (!isOpen) return null;

  const styles = [
    { id: "creator", label: "Creator", emoji: "📸" },
    { id: "gamer", label: "Gamer", emoji: "🎮" },
    { id: "student", label: "Student", emoji: "📚" },
    { id: "everyday", label: "Everyday", emoji: "✨" },
    { id: "travel", label: "Travel", emoji: "✈️" },
  ];

  const budgets = [
    { id: "under-40", label: "Under $40/mo", range: [0, 40] },
    { id: "under-50", label: "Under $50/mo", range: [0, 50] },
    { id: "under-60", label: "Under $60/mo", range: [0, 60] },
    { id: "flexible", label: "Flexible", range: [0, 150] },
  ];

  const calculateResults = () => {
    let filteredDevices = [...devices];

    // Filter by style
    if (answers.style) {
      filteredDevices = filteredDevices.filter((d) =>
        d.category.includes(answers.style)
      );
    }

    // Filter by budget
    if (answers.budget && answers.budget !== "flexible") {
      const budgetOption = budgets.find((b) => b.id === answers.budget);
      if (budgetOption) {
        filteredDevices = filteredDevices.filter(
          (d) => d.price36 <= budgetOption.range[1]
        );
      }
    }

    // Sort by priority (camera vs gaming)
    filteredDevices.sort((a, b) => {
      if (answers.priority < 40) {
        // Camera priority
        return a.name.includes("Pro") || a.name.includes("Pixel") ? -1 : 1;
      } else if (answers.priority > 60) {
        // Gaming priority
        return a.specs.refreshRate === "120Hz" ? -1 : 1;
      }
      return 0;
    });

    return filteredDevices.slice(0, 3);
  };

  const handleComplete = () => {
    const results = calculateResults();
    onResults(results);
    onClose();
  };

  const getPriorityLabel = () => {
    if (answers.priority < 33) return "Camera";
    if (answers.priority > 66) return "Gaming";
    return "Balanced";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#00A9CE] to-[#0098b8] text-white p-6 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            <div>
              <h2 className="text-white">AI Phone Finder</h2>
              <p className="text-white/80 text-sm">
                Answer 3-5 quick questions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4">
          <div className="flex gap-2">
            {["style", "budget", "priority", "ownership"].map((s, idx) => (
              <div
                key={s}
                className={`flex-1 h-1.5 rounded-full ${
                  ["style", "budget", "priority", "ownership"].indexOf(step) >=
                  idx
                    ? "bg-[#00A9CE]"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Style */}
          {step === "style" && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-2">What's your vibe?</h3>
                <p className="text-muted-foreground">
                  This helps us recommend the right features
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setAnswers({ ...answers, style: style.id })}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      answers.style === style.id
                        ? "border-[#00A9CE] bg-blue-50"
                        : "border-border hover:border-[#00A9CE]"
                    }`}
                  >
                    <div className="text-4xl mb-2">{style.emoji}</div>
                    <div>{style.label}</div>
                  </button>
                ))}
              </div>
              <Button
                onClick={() => setStep("budget")}
                disabled={!answers.style}
                className="w-full bg-[#00A9CE] hover:bg-[#0098b8]"
              >
                Next <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Budget */}
          {step === "budget" && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-2">What's your budget?</h3>
                <p className="text-muted-foreground">Monthly payment goal</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {budgets.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() =>
                      setAnswers({ ...answers, budget: budget.id })
                    }
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      answers.budget === budget.id
                        ? "border-[#00A9CE] bg-blue-50"
                        : "border-border hover:border-[#00A9CE]"
                    }`}
                  >
                    <div>{budget.label}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setStep("style")}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep("priority")}
                  disabled={!answers.budget}
                  className="flex-1 bg-[#00A9CE] hover:bg-[#0098b8]"
                >
                  Next <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Priority */}
          {step === "priority" && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-2">What matters most?</h3>
                <p className="text-muted-foreground">
                  Slide to set your priority
                </p>
              </div>
              <div className="py-8">
                <div className="flex justify-between mb-4">
                  <span className="text-sm">📸 Camera</span>
                  <span className="text-[#00A9CE]">
                    {getPriorityLabel()}
                  </span>
                  <span className="text-sm">Gaming 🎮</span>
                </div>
                <Slider
                  value={[answers.priority]}
                  onValueChange={(value) =>
                    setAnswers({ ...answers, priority: value[0] })
                  }
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setStep("budget")}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep("ownership")}
                  className="flex-1 bg-[#00A9CE] hover:bg-[#0098b8]"
                >
                  Next <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Ownership */}
          {step === "ownership" && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-2">How do you want to start?</h3>
                <p className="text-muted-foreground">Choose your setup</p>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() =>
                    setAnswers({ ...answers, ownership: "new-device" })
                  }
                  className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                    answers.ownership === "new-device"
                      ? "border-[#00A9CE] bg-blue-50"
                      : "border-border hover:border-[#00A9CE]"
                  }`}
                >
                  <h4>New device + plan</h4>
                  <p className="text-muted-foreground text-sm">
                    Get the latest phone with a plan
                  </p>
                </button>
                <button
                  onClick={() =>
                    setAnswers({ ...answers, ownership: "byo-device" })
                  }
                  className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                    answers.ownership === "byo-device"
                      ? "border-[#00A9CE] bg-blue-50"
                      : "border-border hover:border-[#00A9CE]"
                  }`}
                >
                  <h4>BYO device + SIM</h4>
                  <p className="text-muted-foreground text-sm">
                    Use your current phone with our plan
                  </p>
                </button>
              </div>

              {/* Trade-in */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={answers.tradeIn}
                    onChange={(e) =>
                      setAnswers({ ...answers, tradeIn: e.target.checked })
                    }
                    className="w-5 h-5 text-[#00A9CE] rounded"
                  />
                  <div>
                    <h4>I have a phone to trade in</h4>
                    <p className="text-sm text-muted-foreground">
                      Get extra credit toward your new device
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep("priority")}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={!answers.ownership}
                  className="flex-1 bg-[#00A9CE] hover:bg-[#0098b8]"
                >
                  See Results <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
