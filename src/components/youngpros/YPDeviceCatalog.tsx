import { useState, useMemo } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Search, ArrowLeft } from "lucide-react";
import { devices } from "../../data/devices";
import { Device } from "../../types/device";
import { DeviceCard } from "../DeviceCard";
import { ProductivityBadge } from "./ProductivityBadge";
import { PrestigeBadge } from "./PrestigeBadge";
import { TravelReadyBadge } from "./TravelReadyBadge";
import { useYoungProStore } from "../../stores/youngProStore";

interface YPDeviceCatalogProps {
  onViewDevice: (device: Device) => void;
  onBack?: () => void;
}

export function YPDeviceCatalog({ onViewDevice, onBack }: YPDeviceCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { scorer } = useYoungProStore();

  // Calculate device scores for YP
  const getDeviceScores = (device: Device) => {
    const battery = parseInt(device.specs.battery) || 0;
    const batteryScore = Math.min(100, (battery / 5000) * 100);
    const workScore = Math.min(100, 
      (device.specs.refreshRate.includes("120") ? 30 : 15) +
      (batteryScore * 0.4) +
      (device.price24 < 60 ? 30 : device.price24 < 80 ? 20 : 10)
    );
    const prestigeScore = Math.min(100,
      (device.price24 >= 80 ? 40 : device.price24 >= 60 ? 25 : 10) +
      (device.specs.camera.includes("MP") ? 30 : 15) +
      (device.brand === "Apple" || device.brand === "Samsung" ? 30 : 15)
    );
    return { batteryScore, workScore, prestigeScore };
  };

  const getDevicesByCategory = (category: string) => {
    let filtered = devices;

    if (category === "work") {
      filtered = devices
        .map(device => ({ device, ...getDeviceScores(device) }))
        .sort((a, b) => b.workScore - a.workScore)
        .map(item => item.device);
    } else if (category === "battery") {
      filtered = devices
        .map(device => ({ device, ...getDeviceScores(device) }))
        .sort((a, b) => b.batteryScore - a.batteryScore)
        .map(item => item.device);
    } else if (category === "value") {
      filtered = devices.filter((d) => d.price24 < 60).sort((a, b) => a.price24 - b.price24);
    } else if (category === "premium") {
      filtered = devices.filter((d) => d.price24 >= 80).sort((a, b) => b.price24 - a.price24);
    } else if (category === "productivity") {
      filtered = devices
        .filter((d) => d.specs.refreshRate.includes("120") || d.specs.battery.includes("5000"))
        .map(device => ({ device, ...getDeviceScores(device) }))
        .sort((a, b) => b.workScore - a.workScore)
        .map(item => item.device);
    }

    // Apply scorer results if available
    if (scorer.results) {
      if (scorer.results.recommendation === "value") {
        filtered = filtered.filter((d) => d.price24 < 70);
      } else if (scorer.results.recommendation === "prestige") {
        filtered = filtered.filter((d) => d.price24 >= 70);
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const categories = [
    { id: "all", label: "All Devices" },
    { id: "work", label: "Best for Work" },
    { id: "battery", label: "Battery Kings" },
    { id: "value", label: "Good Value" },
    { id: "premium", label: "Premium Choices" },
    { id: "productivity", label: "Power Productivity" },
  ];

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
        <h1 className="text-4xl font-bold mb-4">Young Professional Device Catalog</h1>
        <p className="text-muted-foreground text-lg">
          Devices optimized for productivity, performance, and professional use
        </p>
      </div>

      {scorer.results && (
        <Card className="p-4 mb-6 bg-[#00A9CE]/5 border-[#00A9CE]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Based on your profile:</p>
              <p className="text-sm text-muted-foreground">
                {scorer.results.recommendation === "value"
                  ? "Showing value-focused devices"
                  : scorer.results.recommendation === "prestige"
                  ? "Showing premium devices"
                  : "Showing balanced options"}
              </p>
            </div>
            <Badge variant="secondary">
              Work Score: {scorer.results.workScore}
            </Badge>
          </div>
        </Card>
      )}

      <div className="mb-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search devices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-6">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getDevicesByCategory(cat.id).map((device) => {
                  const scores = getDeviceScores(device);
                  return (
                    <div key={device.id} className="relative">
                      <DeviceCard
                        device={device}
                        onSelect={onViewDevice}
                      />
                      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        {scores.workScore > 70 && <ProductivityBadge />}
                        {scores.prestigeScore > 70 && <PrestigeBadge />}
                        {scores.batteryScore > 80 && <TravelReadyBadge />}
                      </div>
                    </div>
                  );
                })}
              </div>
              {getDevicesByCategory(cat.id).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No devices found matching your criteria.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

