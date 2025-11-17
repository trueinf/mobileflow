import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { useYoungProStore } from "../../stores/youngProStore";
import { ScoreRing } from "./ScoreRing";
import { ValuePrestigeResultCard } from "./ValuePrestigeResultCard";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface ValuePrestigeScorerProps {
  onComplete: () => void;
  onBack: () => void;
}

const questions = [
  {
    id: "productivity",
    label: "How important is productivity for your work?",
    type: "slider",
    min: 1,
    max: 5,
    step: 1,
    marks: ["Not Important", "Slightly", "Moderate", "Very", "Critical"],
  },
  {
    id: "battery",
    label: "How important is battery life?",
    type: "slider",
    min: 1,
    max: 5,
    step: 1,
    marks: ["Not Important", "Slightly", "Moderate", "Very", "Critical"],
  },
  {
    id: "camera",
    label: "How important is camera quality?",
    type: "slider",
    min: 1,
    max: 5,
    step: 1,
    marks: ["Not Important", "Slightly", "Moderate", "Very", "Critical"],
  },
  {
    id: "design",
    label: "How important is design and premium feel?",
    type: "slider",
    min: 1,
    max: 5,
    step: 1,
    marks: ["Not Important", "Slightly", "Moderate", "Very", "Critical"],
  },
  {
    id: "budget",
    label: "What's your monthly budget comfort level?",
    type: "number",
    placeholder: "Enter monthly budget (e.g., 80)",
  },
  {
    id: "travel",
    label: "How often do you travel internationally?",
    type: "radio",
    options: [
      { value: "none", label: "Never" },
      { value: "occasional", label: "Occasionally (1-2x/year)" },
      { value: "frequent", label: "Frequently (3-6x/year)" },
      { value: "very-frequent", label: "Very Frequently (7+ times/year)" },
    ],
  },
  {
    id: "hybrid",
    label: "Do you work in a hybrid/remote setup?",
    type: "switch",
  },
];

export function ValuePrestigeScorer({ onComplete, onBack }: ValuePrestigeScorerProps) {
  const { scorer, setScorerAnswers, calculateScores } = useYoungProStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: any) => {
    setScorerAnswers({ [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScores();
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const getCurrentAnswer = () => {
    const question = questions[currentQuestion];
    return scorer.answers[question.id as keyof typeof scorer.answers];
  };

  if (showResults && scorer.results) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ValuePrestigeResultCard
            results={scorer.results}
            onComplete={onComplete}
            onBack={() => setShowResults(false)}
          />
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold">Value vs Prestige Scorer</h2>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <div
            className="bg-[#00A9CE] h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card className="p-8">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Label className="text-xl font-semibold mb-6 block">
            {question.label}
          </Label>

          {question.type === "slider" && (
            <div className="space-y-6">
              <Slider
                value={[getCurrentAnswer() as number || 3]}
                onValueChange={(value) => handleAnswer(question.id, value[0])}
                min={question.min}
                max={question.max}
                step={question.step}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                {question.marks?.map((mark, idx) => (
                  <span key={idx} className="text-center flex-1">
                    {mark}
                  </span>
                ))}
              </div>
              <div className="text-center mt-4">
                <span className="text-2xl font-bold text-[#00A9CE]">
                  {getCurrentAnswer() || 3}
                </span>
              </div>
            </div>
          )}

          {question.type === "number" && (
            <div className="space-y-4">
              <Input
                type="number"
                placeholder={question.placeholder}
                value={getCurrentAnswer() || ""}
                onChange={(e) => handleAnswer(question.id, parseInt(e.target.value) || 0)}
                className="text-lg"
              />
              <p className="text-sm text-muted-foreground">
                Enter your comfortable monthly payment amount
              </p>
            </div>
          )}

          {question.type === "radio" && (
            <RadioGroup
              value={getCurrentAnswer() as string || ""}
              onValueChange={(value) => handleAnswer(question.id, value)}
              className="space-y-3"
            >
              {question.options?.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === "switch" && (
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <Label className="text-base">Yes, I work hybrid/remotely</Label>
              <Switch
                checked={getCurrentAnswer() as boolean || false}
                onCheckedChange={(checked) => handleAnswer(question.id, checked)}
              />
            </div>
          )}
        </motion.div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            size="lg"
            className="bg-[#00A9CE] hover:bg-[#0098b8] text-white px-8"
            onClick={handleNext}
          >
            {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

