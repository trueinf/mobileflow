import { Button } from "../ui/button";
import { Users, Shield, Wifi, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface FamilyHeroProps {
  onStartBuilder: () => void;
}

export function FamilyHero({ onStartBuilder }: FamilyHeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#00A9CE]/10 via-white to-pink-50 py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Plans Built for Your Family
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Shared data, parental controls, and devices that grow with your kids.
            All in one simple plan.
          </p>
          <Button
            size="lg"
            className="bg-[#00A9CE] hover:bg-[#0098b8] text-white px-8 py-6 text-lg"
            onClick={onStartBuilder}
          >
            Start Building Your Family Plan
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { icon: Users, title: "Shared Data", desc: "One pool for everyone" },
            { icon: Shield, title: "Parental Controls", desc: "Keep kids safe online" },
            { icon: Wifi, title: "5G Coverage", desc: "Fast speeds everywhere" },
            { icon: Heart, title: "Family Savings", desc: "Save up to 30%" },
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
                <div className="w-16 h-16 bg-[#00A9CE]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
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

