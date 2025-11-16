interface PersonaSwitcherProps {
  selectedPersona: string;
  onPersonaChange: (persona: string) => void;
}

const personas = [
  { id: "gen-z", label: "Gen Z" },
  { id: "families", label: "Families" },
  { id: "young-pros", label: "Young Pros" },
  { id: "value-switchers", label: "Value/Switchers" },
];

export function PersonaSwitcher({
  selectedPersona,
  onPersonaChange,
}: PersonaSwitcherProps) {
  return (
    <div className="inline-flex items-center gap-1 bg-secondary/50 rounded-full p-1">
      {personas.map((persona) => (
        <button
          key={persona.id}
          onClick={() => onPersonaChange(persona.id)}
          className={`
            px-4 py-1.5 rounded-full transition-all
            ${
              selectedPersona === persona.id
                ? "bg-[#00A9CE] text-white shadow-sm"
                : "text-foreground hover:bg-secondary"
            }
          `}
        >
          {persona.label}
        </button>
      ))}
    </div>
  );
}
