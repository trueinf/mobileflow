import { X } from "lucide-react";

interface SmartFiltersProps {
  activeFilters: string[];
  onToggleFilter: (filter: string) => void;
}

const filterOptions = [
  { id: "iphone", label: "iPhones" },
  { id: "samsung", label: "Samsung" },
  { id: "gamer", label: "Gaming" },
  { id: "creator", label: "Creators" },
  { id: "under-50", label: "Best under $50/mo" },
  { id: "student", label: "Student" },
  { id: "premium", label: "Premium" },
];

export function SmartFilters({
  activeFilters,
  onToggleFilter,
}: SmartFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {filterOptions.map((filter) => {
        const isActive = activeFilters.includes(filter.id);
        return (
          <button
            key={filter.id}
            onClick={() => onToggleFilter(filter.id)}
            className={`
              px-4 py-2 rounded-full transition-all
              ${
                isActive
                  ? "bg-[#00A9CE] text-white shadow-md"
                  : "bg-white border border-border hover:border-[#00A9CE] text-foreground"
              }
            `}
          >
            {filter.label}
            {isActive && <X className="inline-block ml-2 w-4 h-4" />}
          </button>
        );
      })}
      {activeFilters.length > 0 && (
        <button
          onClick={() => activeFilters.forEach(onToggleFilter)}
          className="px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
