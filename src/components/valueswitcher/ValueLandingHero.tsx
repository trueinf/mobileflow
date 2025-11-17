import { Button } from "../ui/button";
import { DollarSign, ArrowRight, Calculator, RefreshCw, GitCompare } from "lucide-react";
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
    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get the Best Deal, No Hidden Costs
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Transparent pricing, real savings, and honest comparisons.
            Find your perfect plan without the surprises.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
              onClick={onViewDeals}
            >
              <DollarSign className="w-5 h-5 mr-2" />
              View Best Deals
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg"
              onClick={onViewCalculator}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate True Cost
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
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 hover:bg-green-200 transition-colors">
                  <Icon className="w-8 h-8 text-green-600" />
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

