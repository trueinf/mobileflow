import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Search, Filter } from "lucide-react";
import { devices } from "../../data/devices";
import { Device } from "../../types/device";
import { KidFriendlyBadge } from "./KidFriendlyBadge";
import { TeenSuitableBadge } from "./TeenSuitableBadge";
import { DeviceCard } from "../DeviceCard";

import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface FamilyDeviceCatalogProps {
  onViewDevice: (device: Device) => void;
  onBack?: () => void;
}

export function FamilyDeviceCatalog({ onViewDevice, onBack }: FamilyDeviceCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getDevicesByCategory = (category: string) => {
    let filtered: Device[] = [];

    if (category === "all") {
      filtered = devices;
    } else if (category === "kids") {
      // Kids: affordable, durable, good battery
      filtered = devices.filter((d) => {
        const batteryNum = parseInt(d.specs.battery.replace(/\D/g, "")) || 0;
        return d.price24 < 50 && batteryNum >= 4000;
      });
    } else if (category === "teens") {
      // Teens: good camera, high refresh rate, gaming capable
      filtered = devices.filter((d) => {
        const hasGoodCamera = d.specs.camera.includes("MP") || 
                             d.specs.camera.includes("48") || 
                             d.specs.camera.includes("50") ||
                             d.specs.camera.includes("200");
        const hasHighRefresh = d.specs.refreshRate.includes("120");
        const hasGamingFeatures = d.gamingScore || 
                                 d.specs.chipset.includes("8 Gen") ||
                                 d.specs.chipset.includes("A17") ||
                                 d.specs.chipset.includes("A16") ||
                                 d.specs.chipset.includes("Tensor");
        return hasGoodCamera && (hasHighRefresh || hasGamingFeatures);
      });
    } else if (category === "parents") {
      // Parents: premium devices
      filtered = devices.filter((d) => d.price24 >= 60);
    } else if (category === "affordable") {
      // Affordable: budget-friendly
      filtered = devices.filter((d) => d.price24 < 50);
    } else {
      filtered = devices;
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
    { id: "kids", label: "Best for Kids" },
    { id: "teens", label: "Best for Teens" },
    { id: "parents", label: "Best for Parents" },
    { id: "affordable", label: "Affordable Options" },
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
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">Family Device Catalog</h1>
            <p className="text-muted-foreground text-lg">
              Find the perfect devices for each family member
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="max-h-[400px] z-[100]" position="popper">
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id} className="cursor-pointer">
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search devices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr relative z-0">
        {getDevicesByCategory(selectedCategory).map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onSelect={onViewDevice}
          />
        ))}
      </div>

      {getDevicesByCategory(selectedCategory).length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No devices found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}

