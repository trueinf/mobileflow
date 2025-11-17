import { useState, useEffect, useRef } from "react";
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
  Tablet,
  Watch,
  Battery,
  Camera,
  Laptop,
  Router,
  Package,
  CreditCard,
  Image,
  Music,
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

  // SHOP - Baseline Categories (Static)
  const shopBaseline: MenuSection[] = [
    {
      title: "Phones",
      items: [
        { title: "All Phones", icon: <Smartphone className="w-4 h-4" /> },
        { title: "iPhone", icon: <Smartphone className="w-4 h-4" /> },
        { title: "Samsung Galaxy", icon: <Smartphone className="w-4 h-4" /> },
        { title: "Google Pixel", icon: <Smartphone className="w-4 h-4" /> },
        { title: "Refurbished Phones", icon: <RefreshCw className="w-4 h-4" /> },
        { title: "Prepaid Phones", icon: <Smartphone className="w-4 h-4" /> },
      ],
    },
    {
      title: "Accessories",
      items: [
        { title: "Cases", icon: <Package className="w-4 h-4" /> },
        { title: "Chargers & Cables", icon: <Zap className="w-4 h-4" /> },
        { title: "Earbuds/Headphones", icon: <Headphones className="w-4 h-4" /> },
        { title: "Wearables (Apple Watch, Galaxy Watch)", icon: <Watch className="w-4 h-4" /> },
      ],
    },
    {
      title: "Home & Internet",
      items: [
        { title: "Modems", icon: <Router className="w-4 h-4" /> },
        { title: "Mesh WiFi", icon: <Wifi className="w-4 h-4" /> },
        { title: "5G Internet Devices", icon: <Wifi className="w-4 h-4" /> },
      ],
    },
    {
      title: "Trade-In & Upgrade",
      items: [
        { title: "Device Trade-In", icon: <RefreshCw className="w-4 h-4" /> },
        { title: "Upgrade Program", icon: <TrendingUp className="w-4 h-4" /> },
      ],
    },
    {
      title: "Tech & Entertainment",
      items: [
        { title: "Gaming Consoles", icon: <Gamepad2 className="w-4 h-4" /> },
        { title: "Streaming Devices", icon: <Image className="w-4 h-4" /> },
        { title: "Tablets & iPads", icon: <Tablet className="w-4 h-4" /> },
      ],
    },
  ];

  // SHOP - Persona-Aware Dynamic Sections
  const shopPersonaModules: MenuSection[] = [];
  
  if (isGenZ) {
    shopPersonaModules.push(
      {
        title: "Gen Z Picks",
        items: [
          { title: "Most Popular Phones Under $30/week", icon: <Smartphone className="w-4 h-4" />, badge: "Hot" },
          { title: "Best Camera Phones for TikTok", icon: <Camera className="w-4 h-4" /> },
          { title: "Budget-Friendly iPhones (Refurb)", icon: <Smartphone className="w-4 h-4" /> },
          { title: "Student Accessory Bundles (cases + chargers)", icon: <Package className="w-4 h-4" /> },
        ],
      },
      {
        title: "Lifestyle Add-ons",
        items: [
          { title: "AirPods & Beats Deals", icon: <Headphones className="w-4 h-4" /> },
          { title: "Portable Charging Kits", icon: <Battery className="w-4 h-4" /> },
          { title: "Colourful Cases & Custom Skins", icon: <Package className="w-4 h-4" /> },
        ],
      }
    );
  }

  if (isFamily) {
    shopPersonaModules.push(
      {
        title: "Family Shopping Hub",
        items: [
          { title: "Kid-Friendly Phones (Durable Models)", icon: <Shield className="w-4 h-4" />, badge: "Durable" },
          { title: "Best Phones for Parents (Battery + Camera)", icon: <Smartphone className="w-4 h-4" /> },
          { title: "Tablets for Kids (Learning + Entertainment)", icon: <Tablet className="w-4 h-4" /> },
          { title: "2–5 Line Device Bundles", icon: <Users className="w-4 h-4" />, badge: "Save" },
        ],
      },
      {
        title: "Family Safety Essentials",
        items: [
          { title: "Screen Protectors", icon: <Shield className="w-4 h-4" /> },
          { title: "Cases for Kids", icon: <Package className="w-4 h-4" /> },
          { title: "Device Insurance", icon: <Shield className="w-4 h-4" /> },
          { title: "GPS Watches for Kids", icon: <Watch className="w-4 h-4" /> },
        ],
      }
    );
  }

  if (isYP) {
    shopPersonaModules.push(
      {
        title: "Young Pro Essentials",
        items: [
          { title: "Premium Phones (iPhone Pro, Galaxy Ultra)", icon: <Smartphone className="w-4 h-4" />, badge: "Premium" },
          { title: "Work Accessories (Keyboards, Chargers)", icon: <Laptop className="w-4 h-4" /> },
          { title: "Laptop Hotspot Devices", icon: <Wifi className="w-4 h-4" /> },
          { title: "Noise-Cancelling Headphones", icon: <Headphones className="w-4 h-4" /> },
        ],
      },
      {
        title: "Travel Tech",
        items: [
          { title: "Universal Adapters", icon: <Zap className="w-4 h-4" /> },
          { title: "Portable WiFi Modems", icon: <Router className="w-4 h-4" /> },
          { title: "Dual SIM / eSIM Phones", icon: <Smartphone className="w-4 h-4" /> },
        ],
      }
    );
  }

  if (isValue) {
    shopPersonaModules.push(
      {
        title: "Best Value Devices",
        items: [
          { title: "Refurb Phones (Save up to 40%)", icon: <RefreshCw className="w-4 h-4" />, badge: "40% Off" },
          { title: "Low-Cost Android Phones", icon: <Smartphone className="w-4 h-4" /> },
          { title: "BYO Device Options", icon: <Smartphone className="w-4 h-4" /> },
          { title: "Phones with Long Battery Life", icon: <Battery className="w-4 h-4" /> },
        ],
      },
      {
        title: "Switching Essentials",
        items: [
          { title: "Compare Your Current Phone Value", icon: <GitCompare className="w-4 h-4" /> },
          { title: "Trade-In Boost Offers", icon: <TrendingUp className="w-4 h-4" /> },
          { title: "Phones Under $500", icon: <DollarSign className="w-4 h-4" /> },
          { title: "Budget Accessory Packs", icon: <Package className="w-4 h-4" /> },
        ],
      }
    );
  }

  // SHOP - AI Shopping Shortcuts
  const shopAIShortcuts = [
    { title: "Device Finder", description: "Tell us your usage → We recommend 3 phones", icon: <Bot className="w-4 h-4" /> },
    { title: "Camera/Gaming/Battery Filter Bot", description: "Find the best phone for: gaming / TikTok / travel / kids", icon: <Search className="w-4 h-4" /> },
    { title: "Trade-In Price Estimator", description: "Get your estimated trade-in value instantly", icon: <Calculator className="w-4 h-4" /> },
    { title: "Switch & Compare Device Tool", description: "Compare your current phone vs new ones", icon: <GitCompare className="w-4 h-4" /> },
    { title: "Accessory Match AI", description: "Find cases and accessories that fit your device", icon: <Package className="w-4 h-4" /> },
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
      <div className="w-[600px] p-4 bg-white">
        <div className="grid grid-cols-3 gap-3">
          {/* Baseline Sections */}
          <div className="col-span-2 space-y-4">
            {/* Deal Radar - Dynamic Section for Deals */}
            {isDealsMenu && dealRadar && (
              <div className="mb-4 p-3 bg-gradient-to-r from-[#00A9CE]/10 via-purple-50/30 to-blue-50/30 rounded-xl border border-[#00A9CE]/20">
                <div className="flex items-center gap-2 mb-2">
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
                <h4 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a
                        href={item.href || "#"}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors group"
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
              <div className="pt-3 border-t">
                <div className="mb-2">
                  <Badge variant="outline" className="bg-[#00A9CE]/10 text-[#00A9CE] border-[#00A9CE]/20 text-xs">
                    Personalized for You
                  </Badge>
                </div>
                {personaModules.map((section, idx) => (
                  <div key={idx} className="mb-3">
                    <h4 className="text-xs font-semibold mb-2 text-[#00A9CE]">
                      {section.title}
                    </h4>
                    <ul className="space-y-1">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <a
                            href={item.href || "#"}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#00A9CE]/5 transition-colors group"
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
          <div className="border-l pl-4">
            <h4 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
              AI Shortcuts
            </h4>
            <div className="space-y-2">
              {aiShortcuts.map((shortcut, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full justify-start h-auto p-2 hover:bg-[#00A9CE]/5 hover:border-[#00A9CE] group"
                >
                  <div className="flex items-start gap-2 w-full">
                    <span className="text-[#00A9CE] mt-0.5 group-hover:scale-110 transition-transform">
                      {shortcut.icon}
                    </span>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-xs mb-0.5">{shortcut.title}</div>
                      <div className="text-xs text-muted-foreground leading-tight">{shortcut.description}</div>
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

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menu when clicking outside - use click instead of mousedown to avoid conflicts
  useEffect(() => {
    if (!openMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Small delay to allow click handlers to process first
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      
      clickTimeoutRef.current = setTimeout(() => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setOpenMenu(null);
        }
      }, 10);
    };

    // Use click event instead of mousedown to avoid race conditions
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [openMenu]);

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>, menuName: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Clear any pending outside click handlers
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    const newState = openMenu === menuName ? null : menuName;
    setOpenMenu(newState);
  };

  return (
    <NavigationMenu ref={menuRef} viewport={false}>
      <NavigationMenuList>
        {/* Shop */}
        <NavigationMenuItem value="shop">
          <NavigationMenuTrigger
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleMenuClick(e, "shop");
            }}
            onPointerEnter={(e: React.PointerEvent<HTMLButtonElement>) => {
              e.preventDefault();
            }}
          >
            Shop
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            className={openMenu === "shop" ? "" : "hidden"}
            style={{ 
              display: openMenu === "shop" ? "block" : "none",
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: "0.375rem",
              zIndex: 1000,
              backgroundColor: "white",
              minWidth: "600px",
              maxHeight: "500px",
              overflowY: "auto",
              overflowX: "hidden"
            }}
          >
            {renderMenuContent(shopBaseline, shopPersonaModules, shopAIShortcuts)}
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Plans */}
        <NavigationMenuItem value="plans">
          <NavigationMenuTrigger
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleMenuClick(e, "plans");
            }}
            onPointerEnter={(e: React.PointerEvent<HTMLButtonElement>) => {
              e.preventDefault();
            }}
          >
            Plans
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            className={openMenu === "plans" ? "" : "hidden"}
            style={{ 
              display: openMenu === "plans" ? "block" : "none",
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: "0.375rem",
              zIndex: 1000,
              backgroundColor: "white",
              minWidth: "600px",
              maxHeight: "500px",
              overflowY: "auto",
              overflowX: "hidden"
            }}
          >
            {renderMenuContent(plansBaseline, plansPersonaModules, plansAIShortcuts)}
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Deals */}
        <NavigationMenuItem value="deals">
          <NavigationMenuTrigger
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleMenuClick(e, "deals");
            }}
            onPointerEnter={(e: React.PointerEvent<HTMLButtonElement>) => {
              e.preventDefault();
            }}
          >
            Deals
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            className={openMenu === "deals" ? "" : "hidden"}
            style={{ 
              display: openMenu === "deals" ? "block" : "none",
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: "0.375rem",
              zIndex: 1000,
              backgroundColor: "white",
              minWidth: "600px",
              maxHeight: "500px",
              overflowY: "auto",
              overflowX: "hidden"
            }}
          >
            {renderMenuContent(dealsBaseline, dealsPersonaModules, dealsAIShortcuts, true)}
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Support */}
        <NavigationMenuItem value="support">
          <NavigationMenuTrigger
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleMenuClick(e, "support");
            }}
            onPointerEnter={(e: React.PointerEvent<HTMLButtonElement>) => {
              e.preventDefault();
            }}
          >
            Support
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            className={openMenu === "support" ? "" : "hidden"}
            style={{ 
              display: openMenu === "support" ? "block" : "none",
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: "0.375rem",
              zIndex: 1000,
              backgroundColor: "white",
              minWidth: "600px",
              maxHeight: "500px",
              overflowY: "auto",
              overflowX: "hidden"
            }}
          >
            {renderMenuContent(supportBaseline, supportPersonaModules, supportAIShortcuts)}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

