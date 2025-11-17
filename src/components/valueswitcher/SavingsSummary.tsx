import { Card } from "../ui/card";
import { TrendingDown, CheckCircle2 } from "lucide-react";

export function SavingsSummary() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose Optus for Value?</h2>
          <p className="text-muted-foreground text-lg">
            Transparent pricing, no hidden fees, real savings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center border-2 border-green-200">
            <TrendingDown className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-green-600 mb-2">$200+</h3>
            <p className="text-muted-foreground">Average annual savings</p>
          </Card>
          <Card className="p-6 text-center border-2 border-blue-200">
            <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-blue-600 mb-2">0</h3>
            <p className="text-muted-foreground">Hidden fees or charges</p>
          </Card>
          <Card className="p-6 text-center border-2 border-purple-200">
            <CheckCircle2 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-purple-600 mb-2">100%</h3>
            <p className="text-muted-foreground">Transparent pricing</p>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">What You Get</h3>
              <ul className="space-y-2">
                {[
                  "No lock-in contracts (flexible plans)",
                  "BYO device support",
                  "Refurbished device options",
                  "Price match guarantee",
                  "Free number porting",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">What You Save</h3>
              <ul className="space-y-2">
                {[
                  "Up to 50% on first 6 months",
                  "$200+ on device bundles",
                  "No activation fees",
                  "No porting fees",
                  "Competitive plan pricing",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

