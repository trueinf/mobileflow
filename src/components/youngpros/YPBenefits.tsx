import { Card } from "../ui/card";
import { CheckCircle2, Globe, Shield, Zap, Briefcase, DollarSign } from "lucide-react";

const benefits = [
  {
    icon: Briefcase,
    title: "Productivity Optimized",
    description: "Devices ranked by work performance, battery life, and 5G speed.",
  },
  {
    icon: Globe,
    title: "Global Connectivity",
    description: "Roaming packs and eSIM support for seamless international travel.",
  },
  {
    icon: Zap,
    title: "Fast Setup",
    description: "eSIM activation in minutes. No waiting, no physical SIM cards.",
  },
  {
    icon: DollarSign,
    title: "Value & Prestige Balance",
    description: "Find the perfect device that matches your style and budget.",
  },
];

export function YPBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose Young Professional Plans?</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to excel in your career
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card key={benefit.title} className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#00A9CE]/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#00A9CE]" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#00A9CE]/10 to-blue-50 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <ul className="space-y-2">
                {[
                  "2-minute device finder quiz",
                  "Productivity-focused recommendations",
                  "Instant eSIM activation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00A9CE]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

