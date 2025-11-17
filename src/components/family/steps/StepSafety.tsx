import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import { Input } from "../../ui/input";
import { Slider } from "../../ui/slider";
import { Badge } from "../../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { useFamilyStore, SafetySettings } from "../../../stores/familyStore";
import { 
  Shield, Clock, Moon, Users, MapPin, Filter, 
  Smartphone, Globe, ShoppingCart, MessageSquare, 
  FileText, Phone, Plus, X, ChevronDown, ChevronUp 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StepSafetyProps {
  onNext: () => void;
  onBack: () => void;
}

const APP_CATEGORIES = ["Social Media", "Games", "Video Streaming", "Shopping", "Dating"];
const WEBSITE_CATEGORIES = ["Adult Content", "Gambling", "Violence", "Social Media", "Gaming"];

export function StepSafety({ onNext, onBack }: StepSafetyProps) {
  const { household, safety, setSafetySettings } = useFamilyStore();
  const [settings, setSettings] = useState<SafetySettings[]>(
    safety.settings.length > 0
      ? safety.settings
      : household.members
          .filter((m) => m.role === "kid" || m.role === "teen")
          .map((member) => ({
            memberId: member.id,
            screenTimeLimit: member.role === "kid" ? 2 : 4,
            bedtimeMode: {
              enabled: true,
              startTime: "21:00",
              endTime: "07:00",
            },
            dataCap: member.role === "kid" ? 10 : 20,
            locationSharing: true,
            contentFiltering: member.role === "kid",
            appRestrictions: {
              enabled: member.role === "kid",
              blockedApps: [],
              allowedApps: [],
            },
            websiteBlocking: {
              enabled: member.role === "kid",
              blockedCategories: [],
            },
            purchaseRestrictions: member.role === "kid",
            socialMediaMonitoring: member.role === "teen",
            weeklyReports: true,
            emergencyContacts: [],
          }))
  );

  const [expandedSections, setExpandedSections] = useState<Record<string, Set<string>>>({});

  const toggleSection = (memberId: string, section: string) => {
    setExpandedSections(prev => {
      const memberSections = prev[memberId] || new Set();
      const newSections = new Set(memberSections);
      if (newSections.has(section)) {
        newSections.delete(section);
      } else {
        newSections.add(section);
      }
      return { ...prev, [memberId]: newSections };
    });
  };

  const isExpanded = (memberId: string, section: string) => {
    return expandedSections[memberId]?.has(section) ?? false;
  };

  const updateSetting = (memberId: string, updates: Partial<SafetySettings>) => {
    setSettings(
      settings.map((s) =>
        s.memberId === memberId ? { ...s, ...updates } : s
      )
    );
  };

  const handleNext = () => {
    settings.forEach(setting => {
      setSafetySettings(settings);
    });
    onNext();
  };

  const getMemberName = (memberId: string) => {
    const member = household.members.find((m) => m.id === memberId);
    return member?.name || `Member ${memberId}`;
  };

  const getMemberRole = (memberId: string) => {
    const member = household.members.find((m) => m.id === memberId);
    return member?.role || "kid";
  };

  const addContact = (memberId: string, contact: string) => {
    const setting = settings.find(s => s.memberId === memberId);
    if (setting && contact.trim()) {
      const contacts = setting.allowedContacts || [];
      if (!contacts.includes(contact.trim())) {
        updateSetting(memberId, {
          allowedContacts: [...contacts, contact.trim()],
        });
      }
    }
  };

  const removeContact = (memberId: string, contact: string) => {
    const setting = settings.find(s => s.memberId === memberId);
    if (setting) {
      updateSetting(memberId, {
        allowedContacts: (setting.allowedContacts || []).filter(c => c !== contact),
      });
    }
  };

  const addEmergencyContact = (memberId: string, contact: string) => {
    const setting = settings.find(s => s.memberId === memberId);
    if (setting && contact.trim()) {
      const contacts = setting.emergencyContacts || [];
      if (!contacts.includes(contact.trim())) {
        updateSetting(memberId, {
          emergencyContacts: [...contacts, contact.trim()],
        });
      }
    }
  };

  const removeEmergencyContact = (memberId: string, contact: string) => {
    const setting = settings.find(s => s.memberId === memberId);
    if (setting) {
      updateSetting(memberId, {
        emergencyContacts: (setting.emergencyContacts || []).filter(c => c !== contact),
      });
    }
  };

  const toggleBlockedCategory = (memberId: string, category: string, type: 'app' | 'website') => {
    const setting = settings.find(s => s.memberId === memberId);
    if (!setting) return;

    if (type === 'app') {
      const blocked = setting.appRestrictions?.blockedApps || [];
      const newBlocked = blocked.includes(category)
        ? blocked.filter(c => c !== category)
        : [...blocked, category];
      updateSetting(memberId, {
        appRestrictions: {
          ...setting.appRestrictions!,
          blockedApps: newBlocked,
        },
      });
    } else {
      const blocked = setting.websiteBlocking?.blockedCategories || [];
      const newBlocked = blocked.includes(category)
        ? blocked.filter(c => c !== category)
        : [...blocked, category];
      updateSetting(memberId, {
        websiteBlocking: {
          ...setting.websiteBlocking!,
          blockedCategories: newBlocked,
        },
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Set Up Parental Controls</h2>
        <p className="text-muted-foreground">
          Configure safety settings for each child. You can change these anytime.
        </p>
      </div>

      <div className="space-y-6">
        {settings.map((setting) => {
          const memberName = getMemberName(setting.memberId);
          const memberRole = getMemberRole(setting.memberId);
          const [newContact, setNewContact] = useState("");
          const [newEmergencyContact, setNewEmergencyContact] = useState("");

          return (
            <Card key={setting.memberId} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#00A9CE]/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#00A9CE]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{memberName}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {memberRole}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {memberRole === "kid" ? "Strict Mode" : "Teen Mode"}
                </Badge>
              </div>

              <div className="space-y-4">
                {/* Screen Time Limit with Slider */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#00A9CE]" />
                      <div>
                        <Label className="text-base font-semibold">
                          Daily Screen Time Limit
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Maximum hours per day
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#00A9CE]">
                        {setting.screenTimeLimit || 0}
                      </span>
                      <span className="text-sm text-muted-foreground">hours</span>
                    </div>
                  </div>
                  <Slider
                    value={[setting.screenTimeLimit || 0]}
                    onValueChange={([value]) =>
                      updateSetting(setting.memberId, {
                        screenTimeLimit: value,
                      })
                    }
                    min={0}
                    max={12}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0h</span>
                    <span>12h</span>
                  </div>
                </div>

                {/* Bedtime Mode */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Moon className="w-5 h-5 text-[#00A9CE]" />
                      <div>
                        <Label className="text-base font-semibold">
                          Bedtime Mode
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Restrict device use during sleep hours
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={setting.bedtimeMode?.enabled || false}
                      onCheckedChange={(checked) =>
                        updateSetting(setting.memberId, {
                          bedtimeMode: {
                            enabled: checked,
                            startTime: setting.bedtimeMode?.startTime || "21:00",
                            endTime: setting.bedtimeMode?.endTime || "07:00",
                          },
                        })
                      }
                    />
                  </div>
                  <AnimatePresence>
                    {setting.bedtimeMode?.enabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-4 mt-4"
                      >
                        <div className="flex-1">
                          <Label className="text-sm mb-2 block">Start Time</Label>
                          <Input
                            type="time"
                            value={setting.bedtimeMode.startTime}
                            onChange={(e) =>
                              updateSetting(setting.memberId, {
                                bedtimeMode: {
                                  ...setting.bedtimeMode!,
                                  startTime: e.target.value,
                                },
                              })
                            }
                            className="w-full"
                          />
                        </div>
                        <div className="flex-1">
                          <Label className="text-sm mb-2 block">End Time</Label>
                          <Input
                            type="time"
                            value={setting.bedtimeMode.endTime}
                            onChange={(e) =>
                              updateSetting(setting.memberId, {
                                bedtimeMode: {
                                  ...setting.bedtimeMode!,
                                  endTime: e.target.value,
                                },
                              })
                            }
                            className="w-full"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Data Cap with Slider */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-[#00A9CE]" />
                      <div>
                        <Label className="text-base font-semibold">
                          Monthly Data Cap
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Limit data usage per month
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#00A9CE]">
                        {setting.dataCap || 0}
                      </span>
                      <span className="text-sm text-muted-foreground">GB</span>
                    </div>
                  </div>
                  <Slider
                    value={[setting.dataCap || 0]}
                    onValueChange={([value]) =>
                      updateSetting(setting.memberId, {
                        dataCap: value,
                      })
                    }
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0 GB</span>
                    <span>100 GB</span>
                  </div>
                </div>

                {/* Location Sharing */}
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#00A9CE]" />
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
                      updateSetting(setting.memberId, {
                        locationSharing: checked,
                      })
                    }
                  />
                </div>

                {/* Content Filtering */}
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-[#00A9CE]" />
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
                      updateSetting(setting.memberId, {
                        contentFiltering: checked,
                      })
                    }
                  />
                </div>

                {/* App Restrictions - Collapsible */}
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(setting.memberId, 'apps')}
                    className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-[#00A9CE]" />
                      <div className="text-left">
                        <Label className="text-base font-semibold">
                          App Restrictions
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Control which apps can be used
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={setting.appRestrictions?.enabled || false}
                        onCheckedChange={(checked) =>
                          updateSetting(setting.memberId, {
                            appRestrictions: {
                              ...setting.appRestrictions!,
                              enabled: checked,
                            },
                          })
                        }
                        onClick={(e) => e.stopPropagation()}
                      />
                      {isExpanded(setting.memberId, 'apps') ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isExpanded(setting.memberId, 'apps') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 space-y-3"
                      >
                        <div>
                          <Label className="text-sm mb-2 block">Block App Categories</Label>
                          <div className="flex flex-wrap gap-2">
                            {APP_CATEGORIES.map((category) => (
                              <Badge
                                key={category}
                                variant={
                                  setting.appRestrictions?.blockedApps?.includes(category)
                                    ? "destructive"
                                    : "outline"
                                }
                                className="cursor-pointer"
                                onClick={() => toggleBlockedCategory(setting.memberId, category, 'app')}
                              >
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Website Blocking - Collapsible */}
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(setting.memberId, 'websites')}
                    className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-[#00A9CE]" />
                      <div className="text-left">
                        <Label className="text-base font-semibold">
                          Website Blocking
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Block inappropriate websites
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={setting.websiteBlocking?.enabled || false}
                        onCheckedChange={(checked) =>
                          updateSetting(setting.memberId, {
                            websiteBlocking: {
                              ...setting.websiteBlocking!,
                              enabled: checked,
                            },
                          })
                        }
                        onClick={(e) => e.stopPropagation()}
                      />
                      {isExpanded(setting.memberId, 'websites') ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isExpanded(setting.memberId, 'websites') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 space-y-3"
                      >
                        <div>
                          <Label className="text-sm mb-2 block">Block Website Categories</Label>
                          <div className="flex flex-wrap gap-2">
                            {WEBSITE_CATEGORIES.map((category) => (
                              <Badge
                                key={category}
                                variant={
                                  setting.websiteBlocking?.blockedCategories?.includes(category)
                                    ? "destructive"
                                    : "outline"
                                }
                                className="cursor-pointer"
                                onClick={() => toggleBlockedCategory(setting.memberId, category, 'website')}
                              >
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Purchase Restrictions */}
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-5 h-5 text-[#00A9CE]" />
                    <div>
                      <Label className="text-base font-semibold">
                        Purchase Restrictions
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Require approval for app purchases
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={setting.purchaseRestrictions || false}
                    onCheckedChange={(checked) =>
                      updateSetting(setting.memberId, {
                        purchaseRestrictions: checked,
                      })
                    }
                  />
                </div>

                {/* Social Media Monitoring */}
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-[#00A9CE]" />
                    <div>
                      <Label className="text-base font-semibold">
                        Social Media Monitoring
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Monitor social media activity
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={setting.socialMediaMonitoring || false}
                    onCheckedChange={(checked) =>
                      updateSetting(setting.memberId, {
                        socialMediaMonitoring: checked,
                      })
                    }
                  />
                </div>

                {/* Weekly Reports */}
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#00A9CE]" />
                    <div>
                      <Label className="text-base font-semibold">
                        Weekly Activity Reports
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly usage summaries
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={setting.weeklyReports || false}
                    onCheckedChange={(checked) =>
                      updateSetting(setting.memberId, {
                        weeklyReports: checked,
                      })
                    }
                  />
                </div>

                {/* Allowed Contacts - Collapsible */}
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(setting.memberId, 'contacts')}
                    className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#00A9CE]" />
                      <div className="text-left">
                        <Label className="text-base font-semibold">
                          Allowed Contacts
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Manage approved contacts
                        </p>
                      </div>
                    </div>
                    {isExpanded(setting.memberId, 'contacts') ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isExpanded(setting.memberId, 'contacts') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 space-y-3"
                      >
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter phone number or name"
                            value={newContact}
                            onChange={(e) => setNewContact(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addContact(setting.memberId, newContact);
                                setNewContact("");
                              }
                            }}
                            className="flex-1"
                          />
                          <Button
                            onClick={() => {
                              addContact(setting.memberId, newContact);
                              setNewContact("");
                            }}
                            size="icon"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(setting.allowedContacts || []).map((contact) => (
                            <Badge key={contact} variant="secondary" className="gap-2">
                              {contact}
                              <button
                                onClick={() => removeContact(setting.memberId, contact)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Emergency Contacts - Collapsible */}
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(setting.memberId, 'emergency')}
                    className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-red-500" />
                      <div className="text-left">
                        <Label className="text-base font-semibold">
                          Emergency Contacts
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Quick access emergency numbers
                        </p>
                      </div>
                    </div>
                    {isExpanded(setting.memberId, 'emergency') ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isExpanded(setting.memberId, 'emergency') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 space-y-3"
                      >
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter emergency contact"
                            value={newEmergencyContact}
                            onChange={(e) => setNewEmergencyContact(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addEmergencyContact(setting.memberId, newEmergencyContact);
                                setNewEmergencyContact("");
                              }
                            }}
                            className="flex-1"
                          />
                          <Button
                            onClick={() => {
                              addEmergencyContact(setting.memberId, newEmergencyContact);
                              setNewEmergencyContact("");
                            }}
                            size="icon"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(setting.emergencyContacts || []).map((contact) => (
                            <Badge key={contact} variant="destructive" className="gap-2">
                              {contact}
                              <button
                                onClick={() => removeEmergencyContact(setting.memberId, contact)}
                                className="ml-1 hover:text-destructive-foreground"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Card>
          );
        })}

        {settings.length === 0 && (
          <Card className="p-8 text-center">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No children in your household. Safety settings are not needed.
            </p>
          </Card>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          size="lg"
          className="bg-[#00A9CE] hover:bg-[#0098b8] text-white px-8"
          onClick={handleNext}
        >
          Continue to Summary
        </Button>
      </div>
    </div>
  );
}
