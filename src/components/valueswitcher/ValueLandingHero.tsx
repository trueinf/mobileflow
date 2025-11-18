import { Button } from "../ui/button";
import { DollarSign, Calculator, RefreshCw, GitCompare } from "lucide-react";
import { motion } from "framer-motion";

interface ValueLandingHeroProps {
  onViewDeals: () => void;
  onViewCalculator: () => void;
  onViewRefurb: () => void;
  onViewCompare: () => void;
  onViewBYO: () => void;
}

export function ValueLandingHero({
  onViewDeals,
  onViewCalculator,
  onViewRefurb,
  onViewCompare,
  onViewBYO,
}: ValueLandingHeroProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
              Get the Best Deal, No Hidden Costs
            </h1>
            <p className="text-xl text-gray-800 mb-8">
              Transparent pricing, real savings, and honest comparisons.
              Find your perfect plan without the surprises.
            </p>
            <div className="flex justify-center w-full">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-[#ffcd00] hover:bg-[#ffd633] text-[#121212] font-semibold"
                onClick={onViewCalculator}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate True Cost
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-background py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              { icon: DollarSign, title: "Best Deals", desc: "Find lowest prices", action: onViewDeals },
              { icon: Calculator, title: "True Cost", desc: "See real monthly cost", action: onViewCalculator },
              { icon: RefreshCw, title: "Refurb Devices", desc: "Save on certified refurbs", action: onViewRefurb },
              { icon: GitCompare, title: "Compare", desc: "See how we stack up", action: onViewCompare },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  className="text-center cursor-pointer"
                  onClick={feature.action}
                >
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 hover:bg-primary/10 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-700">{feature.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

