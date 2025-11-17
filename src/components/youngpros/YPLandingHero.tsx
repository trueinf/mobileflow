import { Button } from "../ui/button";
import { Briefcase, Plane, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface YPLandingHeroProps {
  onStartScorer: () => void;
  onViewDevices: () => void;
  onViewTravel: () => void;
  onViewESIM: () => void;
}

export function YPLandingHero({
  onStartScorer,
  onViewDevices,
  onViewTravel,
  onViewESIM,
}: YPLandingHeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#00A9CE]/10 via-white to-blue-50 py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Plans Built for Your Career
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Premium devices, productivity features, and global connectivity.
            Everything you need to stay ahead.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#00A9CE] hover:bg-[#0098b8] text-white px-8 py-6 text-lg"
              onClick={onStartScorer}
            >
              Find Your Perfect Device
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg"
              onClick={onViewDevices}
            >
              Browse Devices
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { icon: Briefcase, title: "Productivity First", desc: "Work-optimized devices", action: onViewDevices },
            { icon: Plane, title: "Travel Ready", desc: "Global roaming included", action: onViewTravel },
            { icon: Zap, title: "eSIM Quick Setup", desc: "Activate in minutes", action: onViewESIM },
            { icon: TrendingUp, title: "Value & Prestige", desc: "Find your balance", action: onStartScorer },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#00A9CE]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-[#00A9CE]/20 transition-colors"
                  onClick={feature.action}
                >
                  <Icon className="w-8 h-8 text-[#00A9CE]" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

