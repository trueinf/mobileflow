import { Gamepad2, X } from "lucide-react";

interface GamingModeBannerProps {
  onDismiss: () => void;
}

export function GamingModeBanner({ onDismiss }: GamingModeBannerProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-6 animate-in slide-in-from-top">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Gamepad2 className="w-5 h-5" />
          <span className="text-sm">
            🎮 Gaming mode active — phones optimized for performance, low
            latency & battery
          </span>
        </div>
        <button
          onClick={onDismiss}
          className="hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
