import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { useValueStore } from "../../stores/valueStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Calculator, TrendingDown, DollarSign, CheckCircle2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface TrueCostCalculatorProps {
  onBack?: () => void;
}

export function TrueCostCalculator({ onBack }: TrueCostCalculatorProps) {
  const { calculator, setCalculatorInputs } = useValueStore();
  const [deviceCost, setDeviceCost] = useState(calculator.deviceCost);
  const [planCost, setPlanCost] = useState(calculator.planCost);
  const [contractLength, setContractLength] = useState<24 | 36>(calculator.contractLength);
  const [promoValue, setPromoValue] = useState(calculator.promoValue);

  useEffect(() => {
    setCalculatorInputs({
      deviceCost,
      planCost,
      contractLength,
      promoValue,
    });
  }, [deviceCost, planCost, contractLength, promoValue, setCalculatorInputs]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {onBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      )}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">True Cost Calculator</h1>
            <p className="text-muted-foreground">
              See the real monthly cost - no hidden fees, no surprises
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Your Configuration</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Device Monthly Cost</Label>
                <span className="text-sm font-semibold text-green-600">
                  ${deviceCost}/mo
                </span>
              </div>
              <Slider
                value={[deviceCost]}
                onValueChange={(value) => setDeviceCost(value[0])}
                min={0}
                max={150}
                step={5}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Or enter upfront cost: ${deviceCost * contractLength}
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Plan Monthly Cost</Label>
                <span className="text-sm font-semibold text-green-600">
                  ${planCost}/mo
                </span>
              </div>
              <Slider
                value={[planCost]}
                onValueChange={(value) => setPlanCost(value[0])}
                min={20}
                max={150}
                step={5}
              />
            </div>

            <div>
              <Label className="mb-3 block">Contract Length</Label>
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all border-2 ${
                      contractLength === 24
                        ? "border-[#00A9CE] bg-[#00A9CE]/5 shadow-md"
                        : "border-border hover:border-[#00A9CE]/50 hover:bg-muted/30"
                    }`}
                    onClick={() => setContractLength(24)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-lg">24 months</p>
                          {contractLength === 24 && (
                            <CheckCircle2 className="w-5 h-5 text-[#00A9CE]" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">Standard</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all border-2 ${
                      contractLength === 36
                        ? "border-[#00A9CE] bg-[#00A9CE]/5 shadow-md"
                        : "border-border hover:border-[#00A9CE]/50 hover:bg-muted/30"
                    }`}
                    onClick={() => setContractLength(36)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-lg">36 months</p>
                          {contractLength === 36 && (
                            <CheckCircle2 className="w-5 h-5 text-[#00A9CE]" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">Lower monthly</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Promo Discount (per month)</Label>
                <span className="text-sm font-semibold text-green-600">
                  ${promoValue}/mo
                </span>
              </div>
              <Slider
                value={[promoValue]}
                onValueChange={(value) => setPromoValue(value[0])}
                min={0}
                max={50}
                step={5}
              />
              <p className="text-xs text-muted-foreground mt-1">
                First 6-12 months discount
              </p>
            </div>
          </div>
        </Card>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="p-6 border-2 border-green-200">
            <h3 className="text-xl font-bold mb-6">True Cost Breakdown</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                <span className="font-semibold">True Monthly Cost</span>
                <span className="text-3xl font-bold text-green-600">
                  ${calculator.trueMonthly.toFixed(2)}
                  <span className="text-sm text-muted-foreground">/mo</span>
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Device ({contractLength} months)</span>
                  <span>${(deviceCost * contractLength).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Plan ({contractLength} months)</span>
                  <span>${(planCost * contractLength).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Promo Savings</span>
                  <span>-${(promoValue * contractLength).toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t flex justify-between font-semibold">
                  <span>Total Cost</span>
                  <span className="text-lg">${calculator.totalCost.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {calculator.competitorCompare.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  Compare to Competitors
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Provider</TableHead>
                      <TableHead>Monthly</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Savings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculator.competitorCompare.map((comp) => (
                      <TableRow key={comp.provider}>
                        <TableCell className="font-medium">{comp.provider}</TableCell>
                        <TableCell>${comp.monthlyCost}/mo</TableCell>
                        <TableCell>${comp.totalCost.toFixed(2)}</TableCell>
                        <TableCell className={comp.savings > 0 ? 'text-green-600 font-semibold' : 'text-red-600'}>
                          {comp.savings > 0 ? '+' : ''}${comp.savings.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

