import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { useValueStore } from "../../stores/valueStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { GitCompare, TrendingDown, CheckCircle2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface CompareProvidersProps {
  onBack?: () => void;
}

const providers = [
  {
    name: 'Optus',
    monthlyCost: 49,
    data: '80GB',
    contractLength: 24,
    upfrontCost: 0,
    activationFee: 0,
    portingFee: 0,
    coverage: 'Excellent',
    perks: ['5G included', 'No lock-in', 'Free porting'],
  },
  {
    name: 'Telstra',
    monthlyCost: 59,
    data: '80GB',
    contractLength: 24,
    upfrontCost: 50,
    activationFee: 0,
    portingFee: 0,
    coverage: 'Excellent',
    perks: ['5G included', '24-month contract'],
  },
  {
    name: 'Vodafone',
    monthlyCost: 44,
    data: '60GB',
    contractLength: 24,
    upfrontCost: 30,
    activationFee: 0,
    portingFee: 0,
    coverage: 'Good',
    perks: ['5G included', '24-month contract'],
  },
];

export function CompareProviders({ onBack }: CompareProvidersProps) {
  const { profile, setProfile } = useValueStore();
  const [currentProvider, setCurrentProvider] = useState(profile.currentProvider);
  const [currentCost, setCurrentCost] = useState(profile.currentCost);
  const [usageLevel, setUsageLevel] = useState(profile.usageLevel);

  const handleCompare = () => {
    setProfile({
      currentProvider,
      currentCost,
      usageLevel,
    });
  };

  const calculateSavings = (provider: typeof providers[0]) => {
    const totalOptus = provider.name === 'Optus' 
      ? 0 
      : providers[0].monthlyCost * 24 + providers[0].upfrontCost;
    const totalProvider = provider.monthlyCost * provider.contractLength + provider.upfrontCost;
    return totalProvider - totalOptus;
  };

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
            <GitCompare className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Compare Providers</h1>
            <p className="text-muted-foreground">
              See how Optus compares to other providers
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Your Current Plan</h3>
          <div className="space-y-4">
            <div>
              <Label>Current Provider</Label>
              <Select value={currentProvider} onValueChange={setCurrentProvider}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="telstra">Telstra</SelectItem>
                  <SelectItem value="vodafone">Vodafone</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Monthly Cost</Label>
                <span className="text-sm font-semibold text-green-600">
                  ${currentCost}/mo
                </span>
              </div>
              <Slider
                value={[currentCost]}
                onValueChange={(value) => setCurrentCost(value[0])}
                min={20}
                max={150}
                step={5}
              />
            </div>

            <div>
              <Label>Usage Level</Label>
              <Select value={usageLevel} onValueChange={(value: any) => setUsageLevel(value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleCompare}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Compare Now
            </Button>
          </div>
        </Card>

        {profile.currentProvider && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4">Savings Estimate</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Potential Annual Savings</p>
                  <p className="text-3xl font-bold text-green-600">
                    ${Math.abs(calculateSavings(providers[0])) * 12}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <TrendingDown className="w-4 h-4" />
                  <span>Switch to Optus and save</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Provider Comparison</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider</TableHead>
              <TableHead>Monthly Cost</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Upfront</TableHead>
              <TableHead>24-Month Total</TableHead>
              <TableHead>Savings vs You</TableHead>
              <TableHead>Coverage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.map((provider) => {
              const totalCost = provider.monthlyCost * provider.contractLength + provider.upfrontCost;
              const yourTotal = currentCost * 24;
              const savings = yourTotal - totalCost;
              
              return (
                <TableRow
                  key={provider.name}
                  className={provider.name === 'Optus' ? 'bg-green-50' : ''}
                >
                  <TableCell className="font-semibold">
                    {provider.name}
                    {provider.name === 'Optus' && (
                      <Badge className="ml-2 bg-green-600">Recommended</Badge>
                    )}
                  </TableCell>
                  <TableCell>${provider.monthlyCost}/mo</TableCell>
                  <TableCell>{provider.data}</TableCell>
                  <TableCell>${provider.upfrontCost}</TableCell>
                  <TableCell className="font-semibold">${totalCost}</TableCell>
                  <TableCell className={savings > 0 ? 'text-green-600 font-semibold' : 'text-red-600'}>
                    {savings > 0 ? '+' : ''}${savings}
                  </TableCell>
                  <TableCell>{provider.coverage}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {providers.map((provider) => (
            <Card key={provider.name} className="p-4">
              <h4 className="font-semibold mb-2">{provider.name} Perks</h4>
              <ul className="space-y-1">
                {provider.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

