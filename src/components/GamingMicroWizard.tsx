import { useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface GamingMicroWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (budget: string, gameType: string) => void;
}

export function GamingMicroWizard({
  isOpen,
  onClose,
  onApply,
}: GamingMicroWizardProps) {
  const [budget, setBudget] = useState<string>("");
  const [gameType, setGameType] = useState<string>("");

  if (!isOpen) return null;

  const budgets = [
    { id: "under-40", label: "Under $40" },
    { id: "under-50", label: "Under $50" },
    { id: "under-60", label: "Under $60" },
    { id: "flexible", label: "Flexible" },
  ];

  const gameTypes = [
    { id: "shooter", label: "Shooter/Competitive", emoji: "🎯" },
    { id: "rpg", label: "RPG/Story", emoji: "⚔️" },
    { id: "casual", label: "Casual", emoji: "🎲" },
  ];

  const handleApply = () => {
    if (budget && gameType) {
      onApply(budget, gameType);
      onClose();
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 mb-6 animate-in slide-in-from-top">
      <div className="flex items-center justify-between mb-4">
        <h3>Quick gaming setup</h3>
        <button
          onClick={onClose}
          className="hover:bg-white/50 rounded-full p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Budget */}
      <div className="mb-4">
        <p className="text-sm mb-3">Budget target?</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {budgets.map((b) => (
            <button
              key={b.id}
              onClick={() => setBudget(b.id)}
              className={`p-3 rounded-xl text-sm transition-all ${
                budget === b.id
                  ? "bg-[#00A9CE] text-white shadow-md"
                  : "bg-white hover:bg-white/80"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Game Type */}
      <div className="mb-4">
        <p className="text-sm mb-3">Game type?</p>
        <div className="grid md:grid-cols-3 gap-2">
          {gameTypes.map((g) => (
            <button
              key={g.id}
              onClick={() => setGameType(g.id)}
              className={`p-3 rounded-xl text-sm transition-all ${
                gameType === g.id
                  ? "bg-[#00A9CE] text-white shadow-md"
                  : "bg-white hover:bg-white/80"
              }`}
            >
              <span className="mr-2">{g.emoji}</span>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={onClose}
          variant="outline"
          className="flex-1 bg-white"
        >
          Skip
        </Button>
        <Button
          onClick={handleApply}
          disabled={!budget || !gameType}
          className="flex-1 bg-[#00A9CE] hover:bg-[#0098b8]"
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
