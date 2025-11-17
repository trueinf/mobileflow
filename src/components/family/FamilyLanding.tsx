import { FamilyHero } from "./FamilyHero";
import { FamilyBenefits } from "./FamilyBenefits";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Shield, Smartphone, Users } from "lucide-react";

interface FamilyLandingProps {
  onStartBuilder: () => void;
  onViewDevices?: () => void;
  onViewSafety?: () => void;
}

export function FamilyLanding({ onStartBuilder, onViewDevices, onViewSafety }: FamilyLandingProps) {
  return (
    <div>
      <FamilyHero onStartBuilder={onStartBuilder} />
      <FamilyBenefits />
      
      {(onViewDevices || onViewSafety) && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-[1400px] mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Users className="w-12 h-12 text-[#00A9CE] mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Plan Builder</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your custom family plan
                </p>
                <Button
                  onClick={onStartBuilder}
                  className="w-full bg-[#00A9CE] hover:bg-[#0098b8]"
                >
                  Start Building
                </Button>
              </Card>
              
              {onViewDevices && (
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <Smartphone className="w-12 h-12 text-[#00A9CE] mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Device Catalog</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse family-friendly devices
                  </p>
                  <Button
                    onClick={onViewDevices}
                    variant="outline"
                    className="w-full"
                  >
                    View Devices
                  </Button>
                </Card>
              )}
              
              {onViewSafety && (
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <Shield className="w-12 h-12 text-[#00A9CE] mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Safety Hub</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage parental controls
                  </p>
                  <Button
                    onClick={onViewSafety}
                    variant="outline"
                    className="w-full"
                  >
                    Safety Settings
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

