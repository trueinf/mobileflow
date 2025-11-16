import { Users, Heart, Briefcase, DollarSign } from "lucide-react";

interface PersonaSelectionProps {
  onSelectPersona: (persona: string) => void;
}

const personaOptions = [
  {
    id: "gen-z",
    label: "Gen Z",
    description: "Latest tech, social plans, and entertainment",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    id: "families",
    label: "Families",
    description: "Family plans, parental controls, and shared data",
    icon: Heart,
    color: "bg-pink-500",
  },
  {
    id: "young-pros",
    label: "Young Pros",
    description: "Premium devices, business plans, and productivity",
    icon: Briefcase,
    color: "bg-blue-500",
  },
  {
    id: "value-switchers",
    label: "Value/Switchers",
    description: "Best deals, affordable plans, and flexible options",
    icon: DollarSign,
    color: "bg-green-500",
  },
];

export function PersonaSelection({ onSelectPersona }: PersonaSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00A9CE]/10 to-white flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <svg
            width="160"
            height="42"
            viewBox="0 0 120 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-6"
          >
            <path
              d="M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16z"
              fill="#00A9CE"
            />
            <path
              d="M16 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z"
              fill="white"
            />
            <text
              x="38"
              y="22"
              fill="#00A9CE"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="20"
              fontWeight="600"
            >
              Optus
            </text>
          </svg>
          <h1 className="mb-3">Welcome to Optus</h1>
          <p className="text-muted-foreground">
            Choose your profile to get personalized plans and offers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personaOptions.map((persona) => {
            const Icon = persona.icon;
            return (
              <button
                key={persona.id}
                onClick={() => onSelectPersona(persona.id)}
                className="bg-white rounded-2xl p-8 border border-border hover:border-[#00A9CE] hover:shadow-lg transition-all text-left group"
              >
                <div
                  className={`w-14 h-14 ${persona.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="mb-2">{persona.label}</h3>
                <p className="text-muted-foreground">{persona.description}</p>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button className="text-muted-foreground hover:text-foreground transition-colors underline">
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
