import { Card } from "../ui/card";
import { CheckCircle2, Clock, Shield, DollarSign, Users } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Shared Data Pool",
    description: "One data plan for the whole family. No more worrying about individual limits.",
  },
  {
    icon: Shield,
    title: "Advanced Parental Controls",
    description: "Screen time limits, content filtering, and location sharing to keep your kids safe.",
  },
  {
    icon: DollarSign,
    title: "Family Bundle Savings",
    description: "Save up to 30% compared to individual plans. More lines = more savings.",
  },
  {
    icon: Clock,
    title: "Flexible Plans",
    description: "Mix and match devices and plans for each family member's needs.",
  },
];

export function FamilyBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose Family Plans?</h2>
          <p className="text-muted-foreground text-lg">
            Everything your family needs, all in one place
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

        <div className="mt-12 bg-gradient-to-r from-[#00A9CE]/10 to-pink-50 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <ul className="space-y-2">
                {[
                  "5-minute setup wizard",
                  "Personalized recommendations",
                  "No commitment until you're ready",
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

