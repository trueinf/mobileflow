import { Device } from "../types/device";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Network, TrendingUp, Users, Zap, Camera, Gamepad2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TrendingExplanationProps {
  device: Device;
  children: React.ReactNode;
}

export function TrendingExplanation({ device, children }: TrendingExplanationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number; side: "right" | "left" | "top" | "bottom" }>({ top: 0, left: 0, side: "right" });
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Generate trending reasons based on device properties
  const getTrendingReasons = (device: Device) => {
    const reasons = [];
    
    if (device.matchScore && device.matchScore >= 90) {
      reasons.push({
        icon: TrendingUp,
        text: "High match score with Gen Z preferences",
        color: "text-green-600",
      });
    }
    
    if (device.specs.refreshRate.includes("120")) {
      reasons.push({
        icon: Zap,
        text: "120Hz display - preferred by Gen Z",
        color: "text-purple-600",
      });
    }
    
    if (device.specs.camera.includes("48") || device.specs.camera.includes("50") || device.specs.camera.includes("200")) {
      reasons.push({
        icon: Camera,
        text: "High-resolution camera for content creation",
        color: "text-blue-600",
      });
    }
    
    if (device.category.includes("gamer")) {
      reasons.push({
        icon: Gamepad2,
        text: "Gaming performance trending this week",
        color: "text-orange-600",
      });
    }
    
    if (device.price36 < 60) {
      reasons.push({
        icon: Users,
        text: "Value proposition resonates with Gen Z",
        color: "text-teal-600",
      });
    }
    
    return reasons;
  };

  const reasons = getTrendingReasons(device);

  // Calculate position based on viewport
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const popoverWidth = 380;
      const popoverHeight = 480;
      const offset = 20; // Increased offset to avoid overlap
      
      let newPosition = { top: 0, left: 0, side: "right" as const };
      
      // Try to position on the right first (preferred)
      if (rect.right + popoverWidth + offset < viewportWidth) {
        newPosition = {
          top: rect.top + window.scrollY - 10,
          left: rect.right + offset,
          side: "right",
        };
      } 
      // Try left side
      else if (rect.left - popoverWidth - offset > 0) {
        newPosition = {
          top: rect.top + window.scrollY - 10,
          left: rect.left - popoverWidth - offset,
          side: "left",
        };
      }
      // Try top
      else if (rect.top - popoverHeight - offset > 0) {
        newPosition = {
          top: rect.top - popoverHeight - offset + window.scrollY,
          left: Math.max(offset, Math.min(rect.left + (rect.width / 2) - (popoverWidth / 2), viewportWidth - popoverWidth - offset)),
          side: "top",
        };
      }
      // Default to bottom
      else {
        newPosition = {
          top: rect.bottom + offset + window.scrollY,
          left: Math.max(offset, Math.min(rect.left + (rect.width / 2) - (popoverWidth / 2), viewportWidth - popoverWidth - offset)),
          side: "bottom",
        };
      }
      
      // Ensure popover stays within viewport bounds - adjust if needed
      newPosition.left = Math.max(10, Math.min(newPosition.left, viewportWidth - popoverWidth - 10));
      newPosition.top = Math.max(10 + window.scrollY, Math.min(newPosition.top, viewportHeight + window.scrollY - popoverHeight - 10));
      
      setPosition(newPosition);
    }
  }, [isOpen]);

  const popoverContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay for better visibility */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/5 pointer-events-none"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, scale: 0.95, y: position.side === "top" ? 10 : position.side === "bottom" ? -10 : 0, x: position.side === "right" ? -10 : position.side === "left" ? 10 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[9999] pointer-events-auto"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={(e) => {
              // Only close if we're not moving to the trigger
              const relatedTarget = e.relatedTarget as HTMLElement;
              if (!relatedTarget || !triggerRef.current?.contains(relatedTarget)) {
                setTimeout(() => {
                  if (!triggerRef.current?.matches(':hover')) {
                    setIsOpen(false);
                  }
                }, 100);
              }
            }}
          >
            <Card className="w-[380px] p-0 shadow-2xl border-2 border-[#00A9CE]/40 bg-white backdrop-blur-sm ring-4 ring-white/50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00A9CE] to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Network className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base bg-gradient-to-r from-[#00A9CE] to-purple-600 bg-clip-text text-transparent">
                      Why {device.name} is Trending
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium">
                      Neo4j Graph Database
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-red-100 hover:text-red-600 transition-all"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Neo4j Graph Visualization */}
              <Card className="p-3 mb-3 bg-gradient-to-br from-[#00A9CE]/5 via-purple-50/50 to-blue-50/50 border border-[#00A9CE]/20 rounded-xl overflow-hidden">
                <div className="relative h-[140px] rounded-lg overflow-hidden bg-gradient-to-br from-[#00A9CE]/10 via-purple-100/30 to-blue-100/30 flex items-center justify-center">
                  {/* Neo4j Graph Visualization - SVG representation */}
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 300 140"
                    className="absolute inset-0"
                  >
                    <defs>
                      <linearGradient id="gradient-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00A9CE" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#9333EA" stopOpacity="0.15" />
                      </linearGradient>
                      <linearGradient id="device-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00A9CE" />
                        <stop offset="100%" stopColor="#0098b8" />
                      </linearGradient>
                      <linearGradient id="genz-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9333EA" />
                        <stop offset="100%" stopColor="#7C3AED" />
                      </linearGradient>
                      <linearGradient id="trending-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                    
                    {/* Graph nodes and connections */}
                    {/* Device Node (Center) */}
                    <circle cx="150" cy="70" r="18" fill="url(#device-gradient)" stroke="white" strokeWidth="2.5" filter="drop-shadow(0 2px 4px rgba(0,169,206,0.3))" />
                    <text x="150" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Device</text>
                    
                    {/* User Preference Nodes */}
                    <circle cx="80" cy="35" r="14" fill="url(#genz-gradient)" stroke="white" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(147,51,234,0.3))" />
                    <text x="80" y="39" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Gen Z</text>
                    <line x1="94" y1="42" x2="135" y2="60" stroke="#9333EA" strokeWidth="2" strokeDasharray="2,2" opacity="0.7" />
                    
                    <circle cx="220" cy="35" r="14" fill="url(#trending-gradient)" stroke="white" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(16,185,129,0.3))" />
                    <text x="220" y="39" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Trending</text>
                    <line x1="206" y1="42" x2="165" y2="60" stroke="#10B981" strokeWidth="2" strokeDasharray="2,2" opacity="0.7" />
                    
                    {/* Feature Nodes */}
                    <circle cx="60" cy="110" r="12" fill="#F59E0B" stroke="white" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(245,158,11,0.3))" />
                    <text x="60" y="114" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">120Hz</text>
                    <line x1="72" y1="105" x2="138" y2="82" stroke="#F59E0B" strokeWidth="1.5" opacity="0.6" />
                    
                    <circle cx="240" cy="110" r="12" fill="#EF4444" stroke="white" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(239,68,68,0.3))" />
                    <text x="240" y="114" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">Camera</text>
                    <line x1="228" y1="105" x2="162" y2="82" stroke="#EF4444" strokeWidth="1.5" opacity="0.6" />
                    
                    {/* Relationship labels */}
                    <text x="110" y="50" fill="#9333EA" fontSize="7" fontWeight="600" opacity="0.8">PREFERS</text>
                    <text x="190" y="50" fill="#10B981" fontSize="7" fontWeight="600" opacity="0.8">TRENDING</text>
                  </svg>
                  
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 z-10">
                    <Badge className="bg-gradient-to-r from-[#00A9CE] to-purple-600 text-white text-xs px-2 py-0.5 shadow-md">
                      <Network className="w-2.5 h-2.5 mr-1" />
                      Neo4j Graph
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Relationship Explanation */}
              <div className="space-y-2.5">
                <div>
                  <h4 className="font-bold text-xs mb-2 text-gray-700 uppercase tracking-wide">Why It's Hot 🔥</h4>
                  <div className="space-y-1.5">
                    {reasons.map((reason, idx) => {
                      const Icon = reason.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-gradient-to-r from-white to-gray-50/50 hover:from-[#00A9CE]/5 hover:to-purple-50/30 transition-all cursor-pointer border border-transparent hover:border-[#00A9CE]/20 shadow-sm hover:shadow-md"
                        >
                          <div className={`p-1.5 rounded-lg ${reason.color.replace('text-', 'bg-')}/10`}>
                            <Icon className={`w-3.5 h-3.5 ${reason.color}`} />
                          </div>
                          <p className="text-xs flex-1 font-medium text-gray-700">{reason.text}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    <span className="font-bold text-[#00A9CE]">Neo4j</span> analyzes relationships between user preferences, device features, and trending patterns to match Gen Z interests.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div 
        ref={triggerRef}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          // Only close if we're not moving to the popover
          const relatedTarget = e.relatedTarget as HTMLElement;
          if (!relatedTarget || (!contentRef.current?.contains(relatedTarget) && !triggerRef.current?.contains(relatedTarget))) {
            // Small delay to allow moving to popover
            setTimeout(() => {
              if (contentRef.current && !contentRef.current.matches(':hover') && triggerRef.current && !triggerRef.current.matches(':hover')) {
                setIsOpen(false);
              }
            }, 150);
          }
        }}
        className="relative w-full h-full"
        style={{ 
          minWidth: 'inherit', 
          minHeight: 'inherit',
          pointerEvents: 'auto'
        }}
      >
        {children}
      </div>
      {typeof window !== "undefined" && createPortal(popoverContent, document.body)}
    </>
  );
}
