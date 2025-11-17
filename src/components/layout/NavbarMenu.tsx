import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Smartphone,
  Wifi,
  Users,
  Globe,
  Shield,
  Zap,
  Sparkles,
  TrendingUp,
  Gift,
  Phone,
  HelpCircle,
  FileText,
  Settings,
  MessageSquare,
  Search,
  ArrowRight,
  Gamepad2,
  GraduationCap,
  DollarSign,
  RefreshCw,
  MapPin,
  Briefcase,
  Plane,
  Lock,
  Calculator,
  GitCompare,
  ShoppingBag,
  Headphones,
  WifiOff,
  CheckCircle2,
  AlertCircle,
  Bot,
  Compass,
  Radio,
} from "lucide-react";

interface NavbarMenuProps {
  selectedPersona: string | null;
}

interface MenuItem {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  badge?: string;
  href?: string;
  onClick?: () => void;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export function NavbarMenu({ selectedPersona }: NavbarMenuProps) {
  const isGenZ = selectedPersona === "gen-z";
  const isFamily = selectedPersona === "families";
  const isYP = selectedPersona === "young-pros";
  const isValue = selectedPersona === "value-switchers";

  // PLANS - Baseline Categories
  const plansBaseline: MenuSection[] = [
    {
      title: "Mobile Plans",
      items: [
        { title: "Mobile Plans", icon: <Smartphone className="w-4 h-4" /> },
        { title: "SIM Only Plans", icon: <Smartphone className="w-4 h-4" /> },
        { title: "Device + Plan Bundles", icon: <Smartphone className="w-4 h-4" /> },
      ],
    },
    {
      title: "Family & Shared",
      items: [
        { title: "Family & Shared Plans", icon: <Users className="w-4 h-4" /> },
        { title: "Prepaid", icon: <Smartphone className="w-4 h-4" /> },
      ],
    },
    {
      title: "Home Internet",
      items: [
        { title: "nbn® Plans", icon: <Wifi className="w-4 h-4" /> },
        { title: "5G Home Internet", icon: <Wifi className="w-4 h-4" /> },
      ],
    },
    {
      title: "Extras",
      items: [
        { title: "International Calls Add-ons", icon: <Phone className="w-4 h-4" /> },
        { title: "Roaming Packs", icon: <Globe className="w-4 h-4" /> },
        { title: "Device Protection", icon: <Shield className="w-4 h-4" /> },
        { title: "Data Add-ons", icon: <Zap className="w-4 h-4" /> },
      ],
    },
  ];

  // PLANS - Persona-Enhanced Sections
  const plansPersonaModules: MenuSection[] = [];
  
  if (isGenZ) {
    plansPersonaModules.push({
      title: "Best for Gen Z",
      items: [
        { title: "Best Plans for Students", icon: <GraduationCap className="w-4 h-4" />, badge: "Popular" },
        { title: "Gaming-friendly plans (Low latency)", icon: <Gamepad2 className="w-4 h-4" /> },
        { title: "Best Under $50/mo", icon: <DollarSign className="w-4 h-4" /> },
        { title: "Trade In + Plan Combo", icon: <RefreshCw className="w-4 h-4" /> },
      ],
    });
  }

  if (isFamily) {
    plansPersonaModules.push({
      title: "Family Plans",
      items: [
        { title: "Build a Family Plan", icon: <Users className="w-4 h-4" />, badge: "New" },
        { title: "Shared Data Pools", icon: <Users className="w-4 h-4" /> },
        { title: "Kid Safety Add-ons", icon: <Shield className="w-4 h-4" /> },
        { title: "Multiple Line Discounts", icon: <DollarSign className="w-4 h-4" /> },
      ],
    });
  }

  if (isYP) {
    plansPersonaModules.push({
      title: "Professional Plans",
      items: [
        { title: "Hybrid Work Plans", icon: <Briefcase className="w-4 h-4" /> },
        { title: "Roaming & Travel Packs", icon: <Plane className="w-4 h-4" /> },
        { title: "Priority 5G Plans", icon: <Zap className="w-4 h-4" /> },
        { title: "Device Protection for Work Devices", icon: <Shield className="w-4 h-4" /> },
      ],
    });
  }

  if (isValue) {
    plansPersonaModules.push({
      title: "Value Plans",
      items: [
        { title: "Lowest Total Cost Plans", icon: <Calculator className="w-4 h-4" /> },
        { title: "Compare to Your Current Provider", icon: <GitCompare className="w-4 h-4" /> },
        { title: "BYO Device Plans", icon: <Smartphone className="w-4 h-4" /> },
        { title: "Plans Under $30/mo", icon: <DollarSign className="w-4 h-4" /> },
      ],
    });
  }

  // DEALS - Baseline Categories
  const dealsBaseline: MenuSection[] = [
    {
      title: "Current Offers",
      items: [
        { title: "Current Promotions", icon: <Gift className="w-4 h-4" /> },
        { title: "Phone + Plan Offers", icon: <Smartphone className="w-4 h-4" /> },
        { title: "Trade-in Bonus Deals", icon: <RefreshCw className="w-4 h-4" /> },
      ],
    },
    {
      title: "More Deals",
      items: [
        { title: "Home Internet Deals", icon: <Wifi className="w-4 h-4" /> },
        { title: "Bundled Offers", icon: <ShoppingBag className="w-4 h-4" /> },
        { title: "Student Discounts", icon: <GraduationCap className="w-4 h-4" /> },
      ],
    },
  ];

  // DEALS - Persona-Aware Deal Modules
  const dealsPersonaModules: MenuSection[] = [];
  
  if (isGenZ) {
    dealsPersonaModules.push({
      title: "Gen Z Deals",
      items: [
        { title: "Student Deals & Perks", icon: <GraduationCap className="w-4 h-4" />, badge: "Hot" },
        { title: "Budget Phones Under $20/mo", icon: <Smartphone className="w-4 h-4" /> },
        { title: "Gaming-Friendly Promos", icon: <Gamepad2 className="w-4 h-4" /> },
      ],
    });
  }

  if (isFamily) {
    dealsPersonaModules.push({
      title: "Family Deals",
      items: [
        { title: "Family Bundle Deals", icon: <Users className="w-4 h-4" />, badge: "Save More" },
        { title: "Safety Bundle Discounts", icon: <Shield className="w-4 h-4" /> },
        { title: "Home + Mobile Bundle Savings", icon: <Wifi className="w-4 h-4" /> },
      ],
    });
  }

  if (isYP) {
    dealsPersonaModules.push({
      title: "Professional Deals",
      items: [
        { title: "Travel Deals", icon: <Plane className="w-4 h-4" /> },
        { title: "Discounted roaming", icon: <Globe className="w-4 h-4" /> },
        { title: "International minutes", icon: <Phone className="w-4 h-4" /> },
        { title: "Work Phone Upgrades", icon: <Briefcase className="w-4 h-4" /> },
        { title: "Premium Device Discounts", icon: <TrendingUp className="w-4 h-4" /> },
      ],
    });
  }

  if (isValue) {
    dealsPersonaModules.push({
      title: "Value Deals",
      items: [
        { title: "Biggest Savings This Week", icon: <DollarSign className="w-4 h-4" />, badge: "Top" },
        { title: "Switch & Save: Compare Your Bill", icon: <GitCompare className="w-4 h-4" /> },
        { title: "Refurb Phone Deals", icon: <RefreshCw className="w-4 h-4" /> },
        { title: "Lowest Monthly Cost Combos", icon: <Calculator className="w-4 h-4" /> },
      ],
    });
  }

  // SUPPORT - Baseline Sections
  const supportBaseline: MenuSection[] = [
    {
      title: "Help & Support",
      items: [
        { title: "Help & FAQs", icon: <HelpCircle className="w-4 h-4" /> },
        { title: "Billing", icon: <FileText className="w-4 h-4" /> },
        { title: "Network Status", icon: <Radio className="w-4 h-4" /> },
      ],
    },
    {
      title: "Manage",
      items: [
        { title: "Manage My Services", icon: <Settings className="w-4 h-4" /> },
        { title: "Device Setup", icon: <Smartphone className="w-4 h-4" /> },
        { title: "Contact Support", icon: <MessageSquare className="w-4 h-4" /> },
      ],
    },
  ];

  // SUPPORT - Persona-Aware Enhancements
  const supportPersonaModules: MenuSection[] = [];
  
  if (isGenZ) {
    supportPersonaModules.push({
      title: "Gen Z Support",
      items: [
        { title: "AirPods / iPhone Setup Help", icon: <Headphones className="w-4 h-4" /> },
        { title: "Device Unlocking Guide", icon: <Lock className="w-4 h-4" /> },
        { title: "How to Keep Bills Low", icon: <DollarSign className="w-4 h-4" /> },
      ],
    });
  }

  if (isFamily) {
    supportPersonaModules.push({
      title: "Family Support",
      items: [
        { title: "Parental Controls Setup", icon: <Shield className="w-4 h-4" /> },
        { title: "How to Manage Multiple Lines", icon: <Users className="w-4 h-4" /> },
        { title: "Coverage Check for Your Home", icon: <MapPin className="w-4 h-4" /> },
      ],
    });
  }

  if (isYP) {
    supportPersonaModules.push({
      title: "Professional Support",
      items: [
        { title: "Work Device Setup", icon: <Briefcase className="w-4 h-4" /> },
        { title: "Roaming Setup Before Travel", icon: <Plane className="w-4 h-4" /> },
        { title: "eSIM Help for Work Travel", icon: <Smartphone className="w-4 h-4" /> },
        { title: "Device Protection & Claims", icon: <Shield className="w-4 h-4" /> },
      ],
    });
  }

  if (isValue) {
    supportPersonaModules.push({
      title: "Switching Support",
      items: [
        { title: "Porting Support (Switching Help)", icon: <RefreshCw className="w-4 h-4" /> },
        { title: "Understand Your Bill", icon: <FileText className="w-4 h-4" /> },
        { title: "BYO Device Setup", icon: <Smartphone className="w-4 h-4" /> },
        { title: "Refurb Device Warranty Help", icon: <Shield className="w-4 h-4" /> },
      ],
    });
  }

  // AI Shortcuts
  const plansAIShortcuts = [
    { title: "Plan Finder", description: "Tell us your usage → we match the best plan", icon: <Bot className="w-4 h-4" /> },
    { title: "Switching Assistant", description: "See your savings if you switch now", icon: <GitCompare className="w-4 h-4" /> },
    { title: "Travel Planner", description: "Going overseas? Get roaming recommendations", icon: <Plane className="w-4 h-4" /> },
  ];

  const dealsAIShortcuts = [
    { title: "Deal Radar", description: "Top 3 deals for you today", icon: <Sparkles className="w-4 h-4" /> },
    { title: "Savings Calculator", description: "Your potential savings: ~$X/mo", icon: <Calculator className="w-4 h-4" /> },
    { title: "Ending Soon", description: "Limited time offers expiring soon", icon: <AlertCircle className="w-4 h-4" /> },
  ];

  const supportAIShortcuts = [
    { title: "Instant Answer Bot", description: "Ask anything — billing, setup, or troubleshooting", icon: <Bot className="w-4 h-4" /> },
    { title: "Find My Problem", description: "What's going wrong? → AI narrows the issue", icon: <Search className="w-4 h-4" /> },
    { title: "Coverage Check", description: "Auto-check local network performance", icon: <MapPin className="w-4 h-4" /> },
    { title: "Outage Advisor", description: "Is Optus down near you?", icon: <WifiOff className="w-4 h-4" /> },
  ];

  // Dynamic Deal Radar - AI-generated personalized deals
  const getDealRadarContent = () => {
    if (!selectedPersona) return null;
    
    const mockDeals = [
      { title: "Student Plan Special", savings: "$15/mo", ending: "2 days", persona: "gen-z" },
      { title: "Family Bundle Save 20%", savings: "$45/mo", ending: "5 days", persona: "families" },
      { title: "Travel Pack Combo", savings: "$30/mo", ending: "3 days", persona: "young-pros" },
      { title: "Switch & Save Deal", savings: "$25/mo", ending: "1 day", persona: "value-switchers" },
    ];
    
    const personaDeal = mockDeals.find(d => 
      (d.persona === "gen-z" && isGenZ) ||
      (d.persona === "families" && isFamily) ||
      (d.persona === "young-pros" && isYP) ||
      (d.persona === "value-switchers" && isValue)
    ) || mockDeals[0];
    
    return personaDeal;
  };

  const renderMenuContent = (
    baseline: MenuSection[],
    personaModules: MenuSection[],
    aiShortcuts: typeof plansAIShortcuts,
    isDealsMenu: boolean = false
  ) => {
    const dealRadar = isDealsMenu ? getDealRadarContent() : null;
    
    return (
      <div className="w-[800px] p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Baseline Sections */}
          <div className="col-span-2 space-y-6">
            {/* Deal Radar - Dynamic Section for Deals */}
            {isDealsMenu && dealRadar && (
              <div className="mb-6 p-4 bg-gradient-to-r from-[#00A9CE]/10 via-purple-50/30 to-blue-50/30 rounded-xl border border-[#00A9CE]/20">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[#00A9CE]" />
                  <h4 className="text-sm font-bold text-[#00A9CE]">Deal Radar</h4>
                  <Badge className="bg-[#00A9CE] text-white text-xs ml-auto">AI-Powered</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Top deal for you today:</span>
                    <span className="text-sm font-bold text-green-600">{dealRadar.savings}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{dealRadar.title}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <AlertCircle className="w-3 h-3 text-amber-600" />
                    <span className="text-amber-600">Ending soon: {dealRadar.ending}</span>
                  </div>
                </div>
              </div>
            )}
            {baseline.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a
                        href={item.href || "#"}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <span className="text-muted-foreground group-hover:text-[#00A9CE] transition-colors">
                          {item.icon}
                        </span>
                        <span className="flex-1 text-sm font-medium">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Persona Modules */}
            {personaModules.length > 0 && (
              <div className="pt-4 border-t">
                <div className="mb-3">
                  <Badge variant="outline" className="bg-[#00A9CE]/10 text-[#00A9CE] border-[#00A9CE]/20">
                    Personalized for You
                  </Badge>
                </div>
                {personaModules.map((section, idx) => (
                  <div key={idx} className="mb-4">
                    <h4 className="text-sm font-semibold mb-3 text-[#00A9CE]">
                      {section.title}
                    </h4>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <a
                            href={item.href || "#"}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#00A9CE]/5 transition-colors group"
                          >
                            <span className="text-[#00A9CE] group-hover:text-[#0098b8] transition-colors">
                              {item.icon}
                            </span>
                            <span className="flex-1 text-sm font-medium">{item.title}</span>
                            {item.badge && (
                              <Badge className="bg-[#00A9CE] text-white text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Shortcuts */}
          <div className="border-l pl-6">
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
              AI Shortcuts
            </h4>
            <div className="space-y-3">
              {aiShortcuts.map((shortcut, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full justify-start h-auto p-3 hover:bg-[#00A9CE]/5 hover:border-[#00A9CE] group"
                >
                  <div className="flex items-start gap-3 w-full">
                    <span className="text-[#00A9CE] mt-0.5 group-hover:scale-110 transition-transform">
                      {shortcut.icon}
                    </span>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm mb-1">{shortcut.title}</div>
                      <div className="text-xs text-muted-foreground">{shortcut.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#00A9CE] transition-colors" />
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Plans */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Plans</NavigationMenuTrigger>
          <NavigationMenuContent>
            {renderMenuContent(plansBaseline, plansPersonaModules, plansAIShortcuts)}
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Deals */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Deals</NavigationMenuTrigger>
          <NavigationMenuContent>
            {renderMenuContent(dealsBaseline, dealsPersonaModules, dealsAIShortcuts, true)}
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Support */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Support</NavigationMenuTrigger>
          <NavigationMenuContent>
            {renderMenuContent(supportBaseline, supportPersonaModules, supportAIShortcuts)}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

