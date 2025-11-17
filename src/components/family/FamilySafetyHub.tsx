import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { useFamilyStore } from "../../stores/familyStore";
import { Shield, Clock, Moon, Users, MapPin, Filter, Settings, ArrowLeft } from "lucide-react";
import { Badge } from "../ui/badge";

interface FamilySafetyHubProps {
  onBack?: () => void;
}

export function FamilySafetyHub({ onBack }: FamilySafetyHubProps) {
  const { household, safety, setSafetySettings } = useFamilyStore();
  const [settings, setSettings] = useState(safety.settings);

  const updateSetting = (memberId: string, updates: Partial<typeof settings[0]>) => {
    const newSettings = settings.map((s) =>
      s.memberId === memberId ? { ...s, ...updates } : s
    );
    setSettings(newSettings);
    setSafetySettings(newSettings);
  };

  const getMemberName = (memberId: string) => {
    const member = household.members.find((m) => m.id === memberId);
    return member?.name || `Member ${memberId}`;
  };

  const getMemberRole = (memberId: string) => {
    const member = household.members.find((m) => m.id === memberId);
    return member?.role || "kid";
  };

  const children = household.members.filter(
    (m) => m.role === "kid" || m.role === "teen"
  );

  if (children.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
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
        <div className="text-center py-20">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">No Children in Household</h2>
          <p className="text-muted-foreground">
            Parental controls are only needed for children and teens.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
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
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#00A9CE]/10 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-[#00A9CE]" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Family Safety Hub</h1>
            <p className="text-muted-foreground">
              Manage parental controls and safety settings for your family
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {children.map((child) => {
          const setting = settings.find((s) => s.memberId === child.id) || {
            memberId: child.id,
            screenTimeLimit: child.role === "kid" ? 2 : 4,
            bedtimeMode: {
              enabled: true,
              startTime: "21:00",
              endTime: "07:00",
            },
            dataCap: child.role === "kid" ? 10 : 20,
            locationSharing: true,
            contentFiltering: child.role === "kid",
          };

          return (
            <Card key={child.id} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">{getMemberName(child.id)}</h3>
                  <Badge variant="secondary" className="mt-1 capitalize">
                    {getMemberRole(child.id)}
                  </Badge>
                </div>
                <Settings className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="space-y-6">
                {/* Screen Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label className="text-base font-semibold">
                        Daily Screen Time
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {setting.screenTimeLimit || 0} hours per day
                      </p>
                    </div>
                  </div>
                  <Input
                    type="number"
                    min="0"
                    max="12"
                    value={setting.screenTimeLimit || 0}
                    onChange={(e) =>
                      updateSetting(child.id, {
                        screenTimeLimit: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-20"
                  />
                </div>

                {/* Bedtime Mode */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Moon className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <Label className="text-base font-semibold">
                          Bedtime Mode
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {setting.bedtimeMode?.enabled
                            ? `${setting.bedtimeMode.startTime} - ${setting.bedtimeMode.endTime}`
                            : "Disabled"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={setting.bedtimeMode?.enabled || false}
                      onCheckedChange={(checked) =>
                        updateSetting(child.id, {
                          bedtimeMode: {
                            enabled: checked,
                            startTime: setting.bedtimeMode?.startTime || "21:00",
                            endTime: setting.bedtimeMode?.endTime || "07:00",
                          },
                        })
                      }
                    />
                  </div>
                </div>

                {/* Data Cap */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label className="text-base font-semibold">
                        Monthly Data Cap
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {setting.dataCap || 0} GB limit
                      </p>
                    </div>
                  </div>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={setting.dataCap || 0}
                    onChange={(e) =>
                      updateSetting(child.id, {
                        dataCap: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-24"
                  />
                </div>

                {/* Location Sharing */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label className="text-base font-semibold">
                        Location Sharing
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Share location with parents
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={setting.locationSharing || false}
                    onCheckedChange={(checked) =>
                      updateSetting(child.id, { locationSharing: checked })
                    }
                  />
                </div>

                {/* Content Filtering */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label className="text-base font-semibold">
                        Content Filtering
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Block inappropriate content
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={setting.contentFiltering || false}
                    onCheckedChange={(checked) =>
                      updateSetting(child.id, { contentFiltering: checked })
                    }
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold mb-4">Safety Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Review and adjust settings regularly as your children grow</li>
          <li>• Have open conversations about online safety</li>
          <li>• Monitor usage patterns and adjust limits as needed</li>
          <li>• Use location sharing responsibly and with consent</li>
        </ul>
      </Card>
    </div>
  );
}

