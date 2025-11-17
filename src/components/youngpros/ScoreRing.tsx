import { motion } from "framer-motion";

interface ScoreRingProps {
  score: number;
  label: string;
  color?: string;
  size?: number;
}

export function ScoreRing({ score, label, color = "#00A9CE", size = 80 }: ScoreRingProps) {
  const circumference = 2 * Math.PI * (size / 2 - 8);
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 8}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 8}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>
            {score}
          </span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
}

