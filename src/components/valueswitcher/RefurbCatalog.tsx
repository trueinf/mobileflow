import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Search, ArrowLeft } from "lucide-react";
import { devices } from "../../data/devices";
import { Device } from "../../types/device";
import { RefurbDevice } from "../../stores/valueStore";
import { RefurbBadge } from "./RefurbBadge";
import { ConditionBadge } from "./ConditionBadge";
import { BatteryHealthMeter } from "./BatteryHealthMeter";
import { DeviceCard } from "../DeviceCard";

interface RefurbCatalogProps {
  onViewDevice: (device: RefurbDevice) => void;
  onBack?: () => void;
}

// Convert regular devices to refurb devices with mock data
const createRefurbDevices = (): RefurbDevice[] => {
  return devices.slice(0, 6).map((device, idx) => ({
    ...device,
    condition: idx % 3 === 0 ? 'A' : idx % 3 === 1 ? 'B' : 'C' as 'A' | 'B' | 'C',
    warrantyMonths: idx % 3 === 0 ? 12 : idx % 3 === 1 ? 6 : 3,
    batteryHealth: 85 + (idx % 3 === 0 ? 10 : idx % 3 === 1 ? 5 : 0),
    estimatedLife: idx % 3 === 0 ? '2-3 years' : idx % 3 === 1 ? '1-2 years' : '1 year',
    refurbCertified: true,
    price24: Math.round(device.price24 * 0.6), // 40% discount
    price36: Math.round(device.price36 * 0.6),
  }));
};

export function RefurbCatalog({ onViewDevice, onBack }: RefurbCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const refurbDevices = createRefurbDevices();

  const getDevicesByCategory = (category: string) => {
    let filtered = refurbDevices;

    if (category === "lowest") {
      filtered = [...refurbDevices].sort((a, b) => a.price24 - b.price24);
    } else if (category === "bestValue") {
      filtered = [...refurbDevices].sort((a, b) => {
        const valueA = (a.price24 - b.price24) / a.price24;
        const valueB = (b.price24 - a.price24) / b.price24;
        return valueB - valueA;
      });
    } else if (category === "under20") {
      filtered = refurbDevices.filter((d) => d.price24 < 20);
    } else if (category === "gradeA") {
      filtered = refurbDevices.filter((d) => d.condition === 'A');
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
    { id: "all", label: "All Refurbs" },
    { id: "lowest", label: "Lowest Cost" },
    { id: "bestValue", label: "Best Value" },
    { id: "under20", label: "Under $20/mo" },
    { id: "gradeA", label: "Grade A Only" },
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
        <h1 className="text-4xl font-bold mb-4">Refurbished & Budget Devices</h1>
        <p className="text-muted-foreground text-lg">
          Certified refurbished devices with warranty - save up to 40%
        </p>
      </div>

      <div className="mb-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search refurbished devices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getDevicesByCategory(cat.id).map((device) => (
                  <Card
                    key={device.id}
                    className="p-4 cursor-pointer hover:shadow-lg transition-shadow border-2 border-green-200"
                    onClick={() => onViewDevice(device)}
                  >
                    <div className="relative mb-4">
                      <img
                        src={device.image}
                        alt={device.name}
                        className="w-full h-48 object-contain rounded-lg"
                      />
                      <div className="absolute top-2 right-2 flex flex-col gap-2">
                        <RefurbBadge />
                        <ConditionBadge condition={device.condition} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold">{device.name}</h3>
                      <p className="text-sm text-muted-foreground">{device.brand}</p>

                      <div className="flex items-center gap-2">
                        <BatteryHealthMeter health={device.batteryHealth} />
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-green-600">
                            ${device.price24}
                            <span className="text-sm text-muted-foreground">/mo</span>
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ${devices.find(d => d.id === device.id)?.price24 || device.price24}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {device.warrantyMonths} month warranty
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
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

