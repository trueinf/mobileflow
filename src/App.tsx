import { useState } from "react";
import { Header } from "./components/Header";
import { PersonaSelection } from "./components/PersonaSelection";
import { GenZHome } from "./components/GenZHome";
import { DeviceDetail } from "./components/DeviceDetail";
import { Compare } from "./components/Compare";
import { Checkout } from "./components/Checkout";
import { Device } from "./types/device";
import { plans } from "./data/devices";
import { Toaster } from "./components/ui/sonner";

type View = "home" | "device-detail" | "compare" | "checkout";

export default function App() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [compareDevices, setCompareDevices] = useState<Device[]>([]);
  const [gamingMode, setGamingMode] = useState(false);

  // If no persona selected, show persona selection screen
  if (!selectedPersona) {
    return <PersonaSelection onSelectPersona={setSelectedPersona} />;
  }

  const handleViewDevice = (device: Device) => {
    setSelectedDevice(device);
    setCurrentView("device-detail");
  };

  const handleCompareDevices = (devices: Device[]) => {
    setCompareDevices(devices);
    setCurrentView("compare");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedDevice(null);
  };

  const handleAddToPicks = () => {
    if (selectedDevice) {
      setCurrentView("checkout");
    }
  };

  const handleSelectFromCompare = (device: Device) => {
    setSelectedDevice(device);
    setCurrentView("device-detail");
  };

  // Main app with header and persona switcher
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <Header
        selectedPersona={selectedPersona}
        onPersonaChange={setSelectedPersona}
      />

      {/* Main Content Area - Route based on current view */}
      {currentView === "home" && selectedPersona === "gen-z" && (
        <GenZHome
          onViewDevice={handleViewDevice}
          onCompareDevices={handleCompareDevices}
          gamingMode={gamingMode}
          onGamingModeChange={setGamingMode}
        />
      )}

      {currentView === "home" && selectedPersona !== "gen-z" && (
        <main className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="text-center py-20">
            <h1 className="mb-4">
              {selectedPersona === "families"
                ? "Family Plans"
                : selectedPersona === "young-pros"
                ? "Young Professionals"
                : "Value & Switchers"}
            </h1>
            <p className="text-muted-foreground mb-8">
              Coming soon! We're building a personalized experience for you.
            </p>
            <p className="text-sm text-muted-foreground">
              For now, try the{" "}
              <button
                onClick={() => setSelectedPersona("gen-z")}
                className="text-[#00A9CE] underline hover:text-[#0098b8]"
              >
                Gen Z experience
              </button>{" "}
              to see the full journey.
            </p>
          </div>
        </main>
      )}

      {currentView === "device-detail" && selectedDevice && (
        <DeviceDetail
          device={selectedDevice}
          onBack={handleBackToHome}
          onAddToPicks={handleAddToPicks}
          gamingMode={gamingMode}
        />
      )}

      {currentView === "compare" && (
        <Compare
          devices={compareDevices}
          onBack={handleBackToHome}
          onSelectDevice={handleSelectFromCompare}
          gamingMode={gamingMode}
        />
      )}

      {currentView === "checkout" && selectedDevice && (
        <Checkout
          device={selectedDevice}
          plan={plans[1]}
          onBack={() => setCurrentView("device-detail")}
        />
      )}
    </div>
  );
}
