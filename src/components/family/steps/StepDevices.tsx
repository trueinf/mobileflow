import { useState } from "react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { DeviceCard } from "../../DeviceCard";
import { useFamilyStore } from "../../../stores/familyStore";
import { devices } from "../../../data/devices";
import { Device } from "../../../types/device";
import { KidFriendlyBadge } from "../KidFriendlyBadge";
import { TeenSuitableBadge } from "../TeenSuitableBadge";
import { CheckCircle2, Filter } from "lucide-react";
import { motion } from "framer-motion";

interface StepDevicesProps {
  onNext: () => void;
  onBack: () => void;
  onViewDevice: (device: Device) => void;
}

export function StepDevices({ onNext, onBack, onViewDevice }: StepDevicesProps) {
  const { household, devices: selectedDevices, addDevice, removeDevice } = useFamilyStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter devices by category
  const getDevicesByCategory = (category: string) => {
    if (category === "all") return devices;
    
    let filtered: Device[] = [];
    
    if (category === "kids") {
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
    
    return filtered;
  };

  const isDeviceSelected = (deviceId: string) => {
    return selectedDevices.selectedDevices.some((d) => d.deviceId === deviceId);
  };

  const handleToggleDevice = (device: Device) => {
    if (isDeviceSelected(device.id)) {
      removeDevice(device.id);
    } else {
      addDevice(device);
    }
  };

  const categories = [
    { id: "all", label: "All Devices" },
    { id: "kids", label: "Best for Kids" },
    { id: "teens", label: "Best for Teens" },
    { id: "parents", label: "Best for Parents" },
    { id: "affordable", label: "Affordable Options" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Choose Devices for Your Family</h2>
          <p className="text-muted-foreground">
            Select devices for each family member. You can assign them later.
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr relative z-0">
        {getDevicesByCategory(selectedCategory).map((device) => {
                const isSelected = isDeviceSelected(device.id);
                const isKidFriendly =
                  device.price24 < 50 &&
                  (device.specs.battery.includes("5000") ||
                    device.specs.battery.includes("4000"));
                const isTeenSuitable =
                  device.specs.camera.includes("MP") &&
                  (device.specs.refreshRate.includes("120") || device.gamingScore);

                return (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full relative"
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 z-10">
                        <div className="w-8 h-8 bg-[#00A9CE] rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                    <div className={isSelected ? "ring-2 ring-[#00A9CE] ring-offset-2 rounded-2xl" : ""}>
                      <DeviceCard
                        device={device}
                        onSelect={onViewDevice}
                        variant="grid"
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {isKidFriendly && <KidFriendlyBadge />}
                        {isTeenSuitable && <TeenSuitableBadge />}
                      </div>
                    </div>
                    <div className="mt-2 flex justify-center">
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleToggleDevice(device)}
                        className={isSelected ? "bg-[#00A9CE] hover:bg-[#0098b8]" : ""}
                      >
                        {isSelected ? "Selected" : "Select Device"}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
      </div>

      {getDevicesByCategory(selectedCategory).length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No devices found matching your criteria.
          </p>
        </div>
      )}

      {selectedDevices.selectedDevices.length > 0 && (
        <Card className="p-4 mb-6 bg-muted/30">
          <p className="font-semibold mb-2">
            {selectedDevices.selectedDevices.length} device(s) selected
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedDevices.selectedDevices.map((item) => (
              <Badge key={item.deviceId} variant="secondary">
                {item.device.name}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          size="lg"
          className="bg-[#00A9CE] hover:bg-[#0098b8] text-white px-8"
          onClick={onNext}
        >
          Continue to Safety
        </Button>
      </div>
    </div>
  );
}

