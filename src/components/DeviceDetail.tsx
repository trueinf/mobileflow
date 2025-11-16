import { Device, Plan } from "../types/device";
import { plans } from "../data/devices";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, MapPin, Sparkles, Shield, Tv, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface DeviceDetailProps {
  device: Device;
  onBack: () => void;
  onAddToPicks: () => void;
  gamingMode?: boolean;
}

export function DeviceDetail({ device, onBack, onAddToPicks, gamingMode }: DeviceDetailProps) {
  const [selectedColor, setSelectedColor] = useState(device.colors[0]);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[1]);
  const [planLength, setPlanLength] = useState<24 | 36>(36);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const monthlyPrice = planLength === 36 ? device.price36 : device.price24;
  const totalCost = (monthlyPrice + selectedPlan.price) * planLength;

  const addons = [
    {
      id: "protection",
      name: "Device Protection",
      price: 12,
      icon: Shield,
      description: "Cover for damage, theft, and loss",
    },
    {
      id: "streaming",
      name: "Streaming Perks",
      price: 0,
      icon: Tv,
      description: "3 months free Netflix",
    },
    {
      id: "international",
      name: "International Pack",
      price: 10,
      icon: Globe,
      description: "Roaming in 80+ countries",
    },
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const getTotalMonthly = () => {
    const addonsCost = selectedAddons.reduce((sum, id) => {
      const addon = addons.find((a) => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);
    return monthlyPrice + selectedPlan.price + addonsCost;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-blue-50/30 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Back Button */}
        <Button onClick={onBack} variant="ghost" className="mb-6">
          ← Back to phones
        </Button>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Image */}
          <div>
            <div className="bg-white rounded-3xl p-12 border border-border mb-6 sticky top-24">
              <img
                src={device.image}
                alt={device.name}
                className="w-full aspect-square object-contain"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="mb-2">{device.name}</h1>
                <p className="text-muted-foreground">{device.brand}</p>
              </div>
              {device.matchScore && (
                <Badge className="bg-[#00A9CE] text-white px-4 py-2">
                  {device.matchScore}% match
                </Badge>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {gamingMode && (
                <>
                  {device.specs.refreshRate === "120Hz" && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Low Latency
                    </span>
                  )}
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                    {device.specs.refreshRate}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    Sustained FPS
                  </span>
                </>
              )}
              {device.badges && device.badges.slice(0, gamingMode ? 1 : 3).map((badge, idx) => (
                <span
                  key={idx}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* AI Why Section */}
            {device.bestFor && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#00A9CE] mt-1" />
                  <div>
                    <h4 className="mb-2">Why it's best for you</h4>
                    <p className="text-muted-foreground">{device.bestFor}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Colors */}
            <div className="mb-6">
              <h4 className="mb-3">Choose your color</h4>
              <div className="flex flex-wrap gap-3">
                {device.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl border-2 transition-all ${
                      selectedColor === color
                        ? "border-[#00A9CE] bg-blue-50"
                        : "border-border hover:border-[#00A9CE]"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Spec Bites */}
            <div className="mb-6">
              <h4 className="mb-3">{gamingMode ? "Gaming performance" : "Key specs"}</h4>
              {gamingMode ? (
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-200">
                    <p className="text-sm text-muted-foreground mb-1">Gaming FPS estimate</p>
                    <p>Call of Duty Mobile: 90 FPS • Genshin Impact: 60 FPS</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-200">
                    <p className="text-sm text-muted-foreground mb-1">Battery drain per hour</p>
                    <p>~15-20% while gaming (est.)</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-200">
                    <p className="text-sm text-muted-foreground mb-1">Thermal behavior</p>
                    <p>Improved sustained performance with vapor chamber</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-4 rounded-xl border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Display</p>
                      <p>{device.specs.display}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Battery</p>
                      <p>{device.specs.battery}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-4 rounded-xl border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Display</p>
                    <p>{device.specs.display}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Camera</p>
                    <p>{device.specs.camera}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Battery</p>
                    <p>{device.specs.battery}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Storage</p>
                    <p>{device.specs.storage}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Plan Selector */}
        <div className="bg-white rounded-3xl p-8 border border-border mb-8">
          <h2 className="mb-6">Choose your plan</h2>

          {/* 24 vs 36 months */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setPlanLength(24)}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                planLength === 24
                  ? "border-[#00A9CE] bg-blue-50"
                  : "border-border hover:border-[#00A9CE]"
              }`}
            >
              <div>24 months</div>
              <div className="text-[#00A9CE]">${device.price24}/mo</div>
            </button>
            <button
              onClick={() => setPlanLength(36)}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                planLength === 36
                  ? "border-[#00A9CE] bg-blue-50"
                  : "border-border hover:border-[#00A9CE]"
              }`}
            >
              <div>36 months</div>
              <div className="text-[#00A9CE]">${device.price36}/mo</div>
              <Badge className="bg-green-100 text-green-700 mt-1">
                Save ${(device.price24 - device.price36) * 36}
              </Badge>
            </button>
          </div>

          {/* Data Plans */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {plans.map((plan) => {
              const isRecommended = gamingMode && plan.id === "plan-150gb";
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-6 rounded-xl border-2 transition-all text-left relative ${
                    selectedPlan.id === plan.id
                      ? "border-[#00A9CE] bg-blue-50"
                      : "border-border hover:border-[#00A9CE]"
                  }`}
                >
                  {isRecommended && (
                    <Badge className="absolute -top-2 -right-2 bg-purple-600 text-white">
                      Recommended for gaming
                    </Badge>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4>{plan.name}</h4>
                      <p className="text-muted-foreground">{plan.data}</p>
                    </div>
                    <div className="text-[#00A9CE]">${plan.price}/mo</div>
                  </div>
                  <div className="space-y-1">
                    {plan.perks?.map((perk, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                  {isRecommended && (
                    <div className="mt-3 text-sm text-purple-600 bg-purple-50 p-2 rounded">
                      ✓ Recommended for multi-hour sessions & streaming
                    </div>
                  )}
                  {plan.studentDiscount && (
                    <div className="mt-3 text-sm text-green-600">
                      Student discount: -${plan.studentDiscount}/mo
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Add-ons */}
        <div className="bg-white rounded-3xl p-8 border border-border mb-8">
          <h2 className="mb-6">Add-ons (optional)</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {addons.map((addon) => {
              const Icon = addon.icon;
              const isSelected = selectedAddons.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? "border-[#00A9CE] bg-blue-50"
                      : "border-border hover:border-[#00A9CE]"
                  }`}
                >
                  <Icon className="w-8 h-8 text-[#00A9CE] mb-3" />
                  <h4 className="mb-1">{addon.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {addon.description}
                  </p>
                  <div className="text-[#00A9CE]">
                    {addon.price === 0 ? "Free" : `+$${addon.price}/mo`}
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Gaming-specific add-ons */}
          {gamingMode && (
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
              <h4 className="mb-3">🎮 Gaming accessories</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-lg text-sm">
                  <p className="mb-1">Cooling backplate</p>
                  <p className="text-muted-foreground text-xs">Keep temps low during long sessions</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-sm">
                  <p className="mb-1">Low-latency earbuds</p>
                  <p className="text-muted-foreground text-xs">Crystal clear comms, no lag</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stock & Delivery */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-green-600 mt-1" />
            <div className="flex-1">
              <h4 className="mb-2">Available for pickup</h4>
              <p className="text-muted-foreground mb-3">
                Optus Store Melbourne Central - 5km away
              </p>
              <p className="text-sm text-muted-foreground">
                Or get it delivered in 2-3 business days
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Summary */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-2xl z-40">
          <div className="max-w-[1200px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total monthly</p>
                <div className="text-[#00A9CE]">${getTotalMonthly()}/mo</div>
                <p className="text-xs text-muted-foreground">
                  Total over {planLength} months: ${totalCost.toFixed(0)}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="lg">
                  Compare
                </Button>
                <Button
                  onClick={onAddToPicks}
                  size="lg"
                  className="bg-[#00A9CE] hover:bg-[#0098b8]"
                >
                  Add to picks & Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
