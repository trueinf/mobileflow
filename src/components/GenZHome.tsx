import { useState } from "react";
import { Sparkles, Zap, Gamepad2 } from "lucide-react";
import { Button } from "./ui/button";
import { DiscoveryCarousel } from "./DiscoveryCarousel";
import { SmartFilters } from "./SmartFilters";
import { InsightsBar } from "./InsightsBar";
import { ComparePanel } from "./ComparePanel";
import { FloatingAIAssistant } from "./FloatingAIAssistant";
import { AIPhoneFinder } from "./AIPhoneFinder";
import { DeviceCard } from "./DeviceCard";
import { GamingMicroWizard } from "./GamingMicroWizard";
import { GamingModeBanner } from "./GamingModeBanner";
import { Device } from "../types/device";
import { devices as allDevices } from "../data/devices";
import { toast } from "sonner";

interface GenZHomeProps {
  onViewDevice: (device: Device) => void;
  onCompareDevices: (devices: Device[]) => void;
  gamingMode?: boolean;
  onGamingModeChange?: (active: boolean) => void;
}

export function GenZHome({ onViewDevice, onCompareDevices, gamingMode: externalGamingMode, onGamingModeChange }: GenZHomeProps) {
  const [showFinder, setShowFinder] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [compareDevices, setCompareDevices] = useState<Device[]>([]);
  const [aiResults, setAiResults] = useState<Device[]>([]);
  const [gamingMode, setGamingMode] = useState(externalGamingMode || false);
  const [showGamingWizard, setShowGamingWizard] = useState(false);
  const [gamingBudget, setGamingBudget] = useState<string>("");
  const [gamingGameType, setGamingGameType] = useState<string>("");

  const handleToggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleGamingModeToggle = () => {
    const newMode = !gamingMode;
    setGamingMode(newMode);
    onGamingModeChange?.(newMode);
    
    if (newMode) {
      // Auto-select gaming filter
      if (!activeFilters.includes("gamer")) {
        setActiveFilters([...activeFilters, "gamer"]);
      }
      
      // Show toast
      toast("🎮 Gaming mode on", {
        description: "Lower latency, higher FPS, bigger battery prioritized.",
        duration: 3000,
      });

      // Show micro wizard after a brief delay
      setTimeout(() => {
        setShowGamingWizard(true);
      }, 500);
    } else {
      // Remove gaming filter
      setActiveFilters(activeFilters.filter(f => f !== "gamer"));
      setGamingBudget("");
      setGamingGameType("");
    }
  };

  const handleCreatorModeToggle = () => {
    if (!activeFilters.includes("creator")) {
      setActiveFilters([...activeFilters, "creator"]);
      toast("📸 Creator mode on", {
        description: "Camera quality, video features, and storage prioritized.",
        duration: 3000,
      });
    }
  };

  const handleGamingWizardApply = (budget: string, gameType: string) => {
    setGamingBudget(budget);
    setGamingGameType(gameType);
    
    // Apply budget filter if needed
    if (budget !== "flexible" && !activeFilters.includes(budget)) {
      setActiveFilters([...activeFilters, budget]);
    }
  };

  const handleAddToCompare = (device: Device) => {
    if (compareDevices.length < 3 && !compareDevices.find((d) => d.id === device.id)) {
      setCompareDevices([...compareDevices, device]);
    }
  };

  const handleRemoveFromCompare = (deviceId: string) => {
    setCompareDevices(compareDevices.filter((d) => d.id !== deviceId));
  };

  // Filter devices based on active filters
  const getFilteredDevices = () => {
    let devices = aiResults.length > 0 ? aiResults : [...allDevices];

    // Gaming mode re-ranking
    if (gamingMode) {
      devices = devices.map(d => ({
        ...d,
        gamingScore: calculateGamingScore(d),
      })).sort((a, b) => (b.gamingScore || 0) - (a.gamingScore || 0));
    }

    if (activeFilters.length === 0) {
      return devices;
    }

    return devices.filter((device) => {
      // Check category filters
      const categoryMatch = activeFilters.some((filter) =>
        device.category.includes(filter)
      );

      // Check price filters
      const priceMatch = 
        activeFilters.includes("under-50") ? device.price36 <= 50 :
        activeFilters.includes("under-40") ? device.price36 <= 40 :
        activeFilters.includes("under-60") ? device.price36 <= 60 :
        true;

      return categoryMatch || priceMatch;
    });
  };

  const calculateGamingScore = (device: Device): number => {
    let score = 0;
    
    // High refresh rate
    if (device.specs.refreshRate === "120Hz") score += 40;
    if (device.specs.refreshRate === "144Hz") score += 50;
    
    // Battery
    const battery = parseInt(device.specs.battery);
    if (battery >= 5000) score += 30;
    else if (battery >= 4500) score += 20;
    
    // Gaming chipsets
    if (device.specs.chipset.includes("8 Gen 3") || device.specs.chipset.includes("A17")) score += 30;
    
    return score;
  };

  const filteredDevices = getFilteredDevices();
  
  // Re-order carousels based on gaming mode
  const trendingDevices = allDevices.filter((d) => d.matchScore && d.matchScore >= 85);
  let gamingDevices = allDevices.filter((d) => d.category.includes("gamer"));
  const cameraDevices = allDevices.filter((d) => d.category.includes("creator"));
  
  // Apply gaming-specific filtering to gaming devices
  if (gamingMode) {
    gamingDevices = gamingDevices.map(d => ({
      ...d,
      bestFor: `Best for gaming • ${Math.min(95, (d.matchScore || 85) + 10)}% match`,
    }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-blue-50/30 pb-32">
      {/* Gaming Mode Banner */}
      {gamingMode && <GamingModeBanner onDismiss={() => handleGamingModeToggle()} />}
      
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Hero - AI Phone Finder */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Real Optus plans, no jargon</span>
          </div>
          <h1 className="mb-4">Find your perfect phone in 30 seconds</h1>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            AI-powered recommendations based on how you actually use your phone
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <Button
              onClick={() => setShowFinder(true)}
              size="lg"
              className="bg-[#00A9CE] hover:bg-[#0098b8] gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Find my phone (AI)
            </Button>
            <Button
              variant={gamingMode ? "default" : "outline"}
              size="lg"
              onClick={handleGamingModeToggle}
              className={gamingMode ? "bg-purple-600 hover:bg-purple-700 gap-2 animate-pulse" : "gap-2"}
            >
              {gamingMode ? <Gamepad2 className="w-5 h-5" /> : null}
              🎮 I'm a Gamer
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleCreatorModeToggle}
            >
              📸 I'm a Creator
            </Button>
          </div>

          {/* Helper text - changes based on mode */}
          {gamingMode && (
            <p className="text-sm text-purple-700 bg-purple-50 px-4 py-2 rounded-lg inline-block">
              We've boosted phones with 120/144Hz, gaming chipsets, thermal control, and large batteries.
            </p>
          )}

          {aiResults.length > 0 && (
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-2xl inline-flex items-center gap-3">
              <Zap className="w-5 h-5 text-[#00A9CE]" />
              <span>
                Showing {aiResults.length} AI-recommended phones based on your
                answers
              </span>
            </div>
          )}
        </div>

        {/* Gaming Micro Wizard */}
        {gamingMode && (
          <GamingMicroWizard
            isOpen={showGamingWizard}
            onClose={() => setShowGamingWizard(false)}
            onApply={handleGamingWizardApply}
          />
        )}

        {/* Gen Z Discovery Feed (TikTok-style) - Reordered based on gaming mode */}
        {aiResults.length === 0 && (
          <>
            {gamingMode ? (
              <>
                <DiscoveryCarousel
                  title="🎮 Top for Gaming"
                  devices={gamingDevices}
                  onSelectDevice={onViewDevice}
                  onCompareDevice={handleAddToCompare}
                  gamingMode={gamingMode}
                />

                <DiscoveryCarousel
                  title="🔥 Trending This Week"
                  devices={trendingDevices}
                  onSelectDevice={onViewDevice}
                  onCompareDevice={handleAddToCompare}
                  gamingMode={gamingMode}
                />

                <DiscoveryCarousel
                  title="📸 Best Cameras"
                  devices={cameraDevices}
                  onSelectDevice={onViewDevice}
                  onCompareDevice={handleAddToCompare}
                  gamingMode={gamingMode}
                />
              </>
            ) : (
              <>
                <DiscoveryCarousel
                  title="🔥 Trending This Week"
                  devices={trendingDevices}
                  onSelectDevice={onViewDevice}
                  onCompareDevice={handleAddToCompare}
                />

                <DiscoveryCarousel
                  title="🎮 Best for Gaming"
                  devices={gamingDevices}
                  onSelectDevice={onViewDevice}
                  onCompareDevice={handleAddToCompare}
                />

                <DiscoveryCarousel
                  title="📸 Best Cameras"
                  devices={cameraDevices}
                  onSelectDevice={onViewDevice}
                  onCompareDevice={handleAddToCompare}
                />
              </>
            )}
          </>
        )}

        {/* Smart Filters */}
        <div className="my-8">
          <h3 className="mb-4">Filter by</h3>
          <SmartFilters
            activeFilters={activeFilters}
            onToggleFilter={handleToggleFilter}
          />
        </div>

        {/* Optus Insights Bar */}
        <InsightsBar gamingMode={gamingMode} />

        {/* All Phones for You */}
        <div>
          <h2 className="mb-6">
            {aiResults.length > 0
              ? "Your AI Recommendations"
              : activeFilters.length > 0
              ? "Filtered Results"
              : "All Phones for You"}
          </h2>

          {filteredDevices.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-border">
              <p className="text-muted-foreground mb-4">
                No phones match your filters
              </p>
              <Button
                onClick={() => setActiveFilters([])}
                variant="outline"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDevices.map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onSelect={onViewDevice}
                  onCompare={handleAddToCompare}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Compare Panel */}
      <ComparePanel
        devices={compareDevices}
        onRemove={handleRemoveFromCompare}
        onCompare={() => onCompareDevices(compareDevices)}
        gamingMode={gamingMode}
      />

      {/* Floating AI Assistant */}
      <FloatingAIAssistant />

      {/* AI Phone Finder Modal */}
      <AIPhoneFinder
        isOpen={showFinder}
        onClose={() => setShowFinder(false)}
        onResults={(results) => {
          setAiResults(results);
          setActiveFilters([]);
        }}
      />
    </div>
  );
}
