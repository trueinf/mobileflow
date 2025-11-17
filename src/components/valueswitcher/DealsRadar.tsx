import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useValueStore } from "../../stores/valueStore";
import { mockDeals, sortDeals, getDealsByCategory } from "../../data/valueDeals";
import { Deal } from "../../stores/valueStore";
import { DollarSign, Clock, Tag, TrendingDown, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface DealsRadarProps {
  onBack?: () => void;
}

export function DealsRadar({ onBack }: DealsRadarProps) {
  const { deals, setDeals, setDealSort, setSelectedDeal } = useValueStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    setDeals(mockDeals);
  }, [setDeals]);

  const sortedDeals = sortDeals(
    getDealsByCategory(selectedCategory),
    deals.sortBy
  );

  const getDiscountBadge = (deal: Deal) => {
    if (deal.discountType === 'percentage') {
      return `${deal.discount}% OFF`;
    } else if (deal.discountType === 'dollar') {
      return `$${deal.discount} OFF`;
    } else {
      return `$${deal.discount}/mo OFF`;
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      all: 'All Deals',
      device: 'Device Deals',
      plan: 'Plan Deals',
      bundle: 'Bundle Deals',
      refurb: 'Refurb Deals',
      limited: 'Limited Time',
    };
    return labels[category] || category;
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Deals Radar</h1>
            <p className="text-muted-foreground">
              Find the best deals and promotions available now
            </p>
          </div>
          <Select
            value={deals.sortBy}
            onValueChange={(value: any) => setDealSort(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lowestCost">Lowest Cost</SelectItem>
              <SelectItem value="biggestDiscount">Biggest Discount</SelectItem>
              <SelectItem value="under30">Under $30/mo</SelectItem>
              <SelectItem value="bestValue">Best Value</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-6">
          {['all', 'device', 'plan', 'bundle', 'refurb', 'limited'].map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {getCategoryLabel(cat)}
            </TabsTrigger>
          ))}
        </TabsList>

        {['all', 'device', 'plan', 'bundle', 'refurb', 'limited'].map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedDeals
                .filter(deal => cat === 'all' || deal.category === cat)
                .map((deal, idx) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-green-200">
                      <div className="flex items-start justify-between mb-4">
                        <Badge className="bg-green-600 text-white">
                          {getDiscountBadge(deal)}
                        </Badge>
                        {deal.category === 'limited' && (
                          <Badge variant="destructive">
                            <Clock className="w-3 h-3 mr-1" />
                            Limited
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {deal.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground line-through">
                            ${deal.originalPrice}/mo
                          </span>
                          <span className="text-2xl font-bold text-green-600">
                            ${deal.discountedPrice}
                            <span className="text-sm text-muted-foreground">/mo</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <TrendingDown className="w-4 h-4" />
                          <span>
                            Save ${(deal.originalPrice - deal.discountedPrice).toFixed(2)}/mo
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pt-4 border-t">
                        <span>Valid until {new Date(deal.validUntil).toLocaleDateString()}</span>
                      </div>

                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => setSelectedDeal(deal)}
                      >
                        Claim Deal
                      </Button>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

