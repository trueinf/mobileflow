import { useState } from "react";
import { Header } from "./components/Header";
import { PersonaSelection } from "./components/PersonaSelection";
import { GenZHome } from "./components/GenZHome";
import { DeviceDetail } from "./components/DeviceDetail";
import { Compare } from "./components/Compare";
import { Checkout } from "./components/Checkout";
import { FamilyLanding } from "./components/family/FamilyLanding";
import { FamilyPlanBuilder } from "./components/family/FamilyPlanBuilder";
import { FamilyDeviceCatalog } from "./components/family/FamilyDeviceCatalog";
import { FamilyDeviceDetail } from "./components/family/FamilyDeviceDetail";
import { FamilySafetyHub } from "./components/family/FamilySafetyHub";
import { YPLanding } from "./components/youngpros/YPLanding";
import { ValuePrestigeScorer } from "./components/youngpros/ValuePrestigeScorer";
import { YPDeviceCatalog } from "./components/youngpros/YPDeviceCatalog";
import { YPDeviceDetail } from "./components/youngpros/YPDeviceDetail";
import { TravelAdvisor } from "./components/youngpros/TravelAdvisor";
import { ESIMSetup } from "./components/youngpros/ESIMSetup";
import { PlanOptimizer } from "./components/youngpros/PlanOptimizer";
import { ValueLanding } from "./components/valueswitcher/ValueLanding";
import { DealsRadar } from "./components/valueswitcher/DealsRadar";
import { TrueCostCalculator } from "./components/valueswitcher/TrueCostCalculator";
import { RefurbCatalog } from "./components/valueswitcher/RefurbCatalog";
import { RefurbDetail } from "./components/valueswitcher/RefurbDetail";
import { CompareProviders } from "./components/valueswitcher/CompareProviders";
import { BYOChecker } from "./components/valueswitcher/BYOChecker";
import { PortingFlow } from "./components/valueswitcher/PortingFlow";
import { Device } from "./types/device";
import { plans } from "./data/devices";
import { Toaster } from "./components/ui/sonner";
import { useFamilyStore } from "./stores/familyStore";
import { useYoungProStore } from "./stores/youngProStore";
import { useValueStore } from "./stores/valueStore";
import { Button } from "./components/ui/button";
import { RefurbDevice } from "./stores/valueStore";

type View = "home" | "device-detail" | "compare" | "checkout";
type FamilyView = "landing" | "builder" | "devices" | "device-detail" | "safety" | "checkout";
type YPView = "landing" | "scorer" | "devices" | "device-detail" | "travel" | "esim" | "plans" | "checkout";
type ValueView = "landing" | "deals" | "calculator" | "refurb" | "refurb-detail" | "compare" | "byo" | "porting" | "checkout";

export default function App() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>("home");
  const [familyView, setFamilyView] = useState<FamilyView>("landing");
  const [ypView, setYPView] = useState<YPView>("landing");
  const [valueView, setValueView] = useState<ValueView>("landing");
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [selectedRefurbDevice, setSelectedRefurbDevice] = useState<RefurbDevice | null>(null);
  const [compareDevices, setCompareDevices] = useState<Device[]>([]);
  const [gamingMode, setGamingMode] = useState(false);
  const { addDevice } = useFamilyStore();
  const { setSelectedDevice: setYPDevice } = useYoungProStore();
  const { setRefurbDevice } = useValueStore();

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

  // Family-specific handlers
  const handleStartFamilyBuilder = () => {
    setFamilyView("builder");
  };

  const handleFamilyBuilderComplete = () => {
    setFamilyView("checkout");
  };

  const handleViewFamilyDevice = (device: Device) => {
    setSelectedDevice(device);
    setFamilyView("device-detail");
  };

  const handleAddFamilyDeviceToPlan = () => {
    if (selectedDevice) {
      addDevice(selectedDevice);
      setFamilyView("devices");
      setSelectedDevice(null);
    }
  };

  const handleBackToFamilyHome = () => {
    setFamilyView("landing");
    setSelectedDevice(null);
  };

  // Young Professionals handlers
  const handleYPStartScorer = () => {
    setYPView("scorer");
  };

  const handleYPScorerComplete = () => {
    setYPView("devices");
  };

  const handleYPViewDevice = (device: Device) => {
    setSelectedDevice(device);
    setYPDevice(device);
    setYPView("device-detail");
  };

  const handleYPAddDeviceToPlan = () => {
    if (selectedDevice) {
      setYPView("checkout");
    }
  };

  // Value Seekers handlers
  const handleValueViewRefurb = (device: RefurbDevice) => {
    setSelectedRefurbDevice(device);
    setRefurbDevice(device);
    setValueView("refurb-detail");
  };

  const handleValueAddRefurbToPlan = () => {
    if (selectedRefurbDevice) {
      setValueView("checkout");
    }
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

      {currentView === "home" && selectedPersona === "families" && (
        <>
          {familyView === "landing" && (
            <FamilyLanding
              onStartBuilder={handleStartFamilyBuilder}
              onViewDevices={() => setFamilyView("devices")}
              onViewSafety={() => setFamilyView("safety")}
            />
          )}
          {familyView === "builder" && (
            <FamilyPlanBuilder
              onComplete={handleFamilyBuilderComplete}
              onViewDevice={handleViewFamilyDevice}
              onBack={() => setFamilyView("landing")}
            />
          )}
          {familyView === "devices" && (
            <FamilyDeviceCatalog 
              onViewDevice={handleViewFamilyDevice}
              onBack={() => setFamilyView("landing")}
            />
          )}
          {familyView === "device-detail" && selectedDevice && (
            <FamilyDeviceDetail
              device={selectedDevice}
              onBack={() => setFamilyView("devices")}
              onAddToPlan={handleAddFamilyDeviceToPlan}
            />
          )}
          {familyView === "safety" && (
            <FamilySafetyHub onBack={() => setFamilyView("landing")} />
          )}
          {familyView === "checkout" && (
            <>
              {selectedDevice ? (
                <Checkout
                  device={selectedDevice}
                  plan={plans[1]}
                  onBack={() => setFamilyView("builder")}
                />
              ) : (
                <div className="max-w-4xl mx-auto px-6 py-8">
                  <div className="text-center py-20">
                    <h1 className="text-3xl font-bold mb-4">Family Plan Summary</h1>
                    <p className="text-muted-foreground mb-8">
                      Your family plan is ready! Review your selections and proceed to checkout.
                    </p>
                    <Button
                      onClick={() => setFamilyView("builder")}
                      variant="outline"
                    >
                      Back to Summary
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {currentView === "home" && selectedPersona === "young-pros" && (
        <>
          {ypView === "landing" && (
            <YPLanding
              onStartScorer={handleYPStartScorer}
              onViewDevices={() => setYPView("devices")}
              onViewTravel={() => setYPView("travel")}
              onViewESIM={() => setYPView("esim")}
              onViewPlans={() => setYPView("plans")}
            />
          )}
          {ypView === "scorer" && (
            <ValuePrestigeScorer
              onComplete={handleYPScorerComplete}
              onBack={() => setYPView("landing")}
            />
          )}
          {ypView === "devices" && (
            <YPDeviceCatalog 
              onViewDevice={handleYPViewDevice}
              onBack={() => setYPView("landing")}
            />
          )}
          {ypView === "device-detail" && selectedDevice && (
            <YPDeviceDetail
              device={selectedDevice}
              onBack={() => setYPView("devices")}
              onAddToPlan={handleYPAddDeviceToPlan}
            />
          )}
          {ypView === "travel" && (
            <TravelAdvisor onBack={() => setYPView("landing")} />
          )}
          {ypView === "esim" && (
            <ESIMSetup onBack={() => setYPView("landing")} />
          )}
          {ypView === "plans" && (
            <PlanOptimizer onBack={() => setYPView("landing")} />
          )}
          {ypView === "checkout" && selectedDevice && (
            <Checkout
              device={selectedDevice}
              plan={plans[1]}
              onBack={() => setYPView("device-detail")}
            />
          )}
        </>
      )}

      {currentView === "home" && selectedPersona === "value-switchers" && (
        <>
          {valueView === "landing" && (
            <ValueLanding
              onViewDeals={() => setValueView("deals")}
              onViewCalculator={() => setValueView("calculator")}
              onViewRefurb={() => setValueView("refurb")}
              onViewCompare={() => setValueView("compare")}
              onViewBYO={() => setValueView("byo")}
              onViewPorting={() => setValueView("porting")}
            />
          )}
          {valueView === "deals" && (
            <DealsRadar onBack={() => setValueView("landing")} />
          )}
          {valueView === "calculator" && (
            <TrueCostCalculator onBack={() => setValueView("landing")} />
          )}
          {valueView === "refurb" && (
            <RefurbCatalog 
              onViewDevice={handleValueViewRefurb}
              onBack={() => setValueView("landing")}
            />
          )}
          {valueView === "refurb-detail" && selectedRefurbDevice && (
            <RefurbDetail
              device={selectedRefurbDevice}
              onBack={() => setValueView("refurb")}
              onAddToPlan={handleValueAddRefurbToPlan}
            />
          )}
          {valueView === "compare" && (
            <CompareProviders onBack={() => setValueView("landing")} />
          )}
          {valueView === "byo" && (
            <BYOChecker onBack={() => setValueView("landing")} />
          )}
          {valueView === "porting" && (
            <PortingFlow onBack={() => setValueView("landing")} />
          )}
          {valueView === "checkout" && (selectedDevice || selectedRefurbDevice) && (
            <Checkout
              device={selectedDevice || selectedRefurbDevice}
              plan={plans[1]}
              onBack={() => setValueView("refurb-detail")}
            />
          )}
        </>
      )}

      {currentView === "home" && selectedPersona !== "gen-z" && selectedPersona !== "families" && selectedPersona !== "young-pros" && selectedPersona !== "value-switchers" && (
        <main className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="text-center py-20">
            <h1 className="mb-4">Welcome to Optus</h1>
            <p className="text-muted-foreground mb-8">
              Please select a persona to get started.
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
