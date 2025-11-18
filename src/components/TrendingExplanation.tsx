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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Calculate position based on viewport - only recalculate when isOpen changes or on scroll/resize
  useEffect(() => {
    if (!isOpen || !triggerRef.current) {
      // Reset position when closed
      setPosition({ top: 0, left: 0, side: "right" });
      return;
    }
    
    const calculatePosition = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const popoverWidth = 480;
      const popoverHeight = 520;
      const offset = 20;
      
      let newPosition: { top: number; left: number; side: "right" | "left" | "top" | "bottom" } = { top: 0, left: 0, side: "right" };
      
      // Try to position on the right first (preferred)
      if (rect.right + popoverWidth + offset < viewportWidth) {
        newPosition = {
          top: rect.top + window.scrollY - 10,
          left: rect.right + offset,
          side: "right" as const,
        };
      } 
      // Try left side
      else if (rect.left - popoverWidth - offset > 0) {
        newPosition = {
          top: rect.top + window.scrollY - 10,
          left: rect.left - popoverWidth - offset,
          side: "left" as const,
        };
      }
      // Try top
      else if (rect.top - popoverHeight - offset > 0) {
        newPosition = {
          top: rect.top - popoverHeight - offset + window.scrollY,
          left: Math.max(offset, Math.min(rect.left + (rect.width / 2) - (popoverWidth / 2), viewportWidth - popoverWidth - offset)),
          side: "top" as const,
        };
      }
      // Default to bottom
      else {
        newPosition = {
          top: rect.bottom + offset + window.scrollY,
          left: Math.max(offset, Math.min(rect.left + (rect.width / 2) - (popoverWidth / 2), viewportWidth - popoverWidth - offset)),
          side: "bottom" as const,
        };
      }
      
      // Ensure popover stays within viewport bounds
      newPosition.left = Math.max(10, Math.min(newPosition.left, viewportWidth - popoverWidth - 10));
      newPosition.top = Math.max(10 + window.scrollY, Math.min(newPosition.top, viewportHeight + window.scrollY - popoverHeight - 10));
      
      setPosition(newPosition);
    };
    
    // Calculate position immediately - no delay to prevent glitching
    calculatePosition();
    
    // Also recalculate on scroll/resize (debounced)
    let scrollTimeout: ReturnType<typeof setTimeout>;
    let resizeTimeout: ReturnType<typeof setTimeout>;
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(calculatePosition, 50);
    };
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculatePosition, 50);
    };
    
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(scrollTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const popoverContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay for better visibility - removed to prevent white screen */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, scale: 0.96, y: position.side === "top" ? 8 : position.side === "bottom" ? -8 : 0, x: position.side === "right" ? -8 : position.side === "left" ? 8 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed z-[9999] pointer-events-auto"
            style={{
              top: position.top > 0 ? `${position.top}px` : 'auto',
              left: position.left > 0 ? `${position.left}px` : 'auto',
              visibility: position.top > 0 && position.left > 0 ? 'visible' : 'hidden',
            }}
            onMouseEnter={() => {
              // Clear any pending close timeout immediately
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
              }
              setIsOpen(true);
            }}
            onMouseLeave={() => {
              // Clear any existing timeout
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              
              // Shorter delay for more responsive feel
              timeoutRef.current = setTimeout(() => {
                setIsOpen(false);
                timeoutRef.current = null;
              }, 150);
            }}
          >
            <Card className="w-[480px] p-0 shadow-2xl border border-gray-200/60 bg-white backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#00A9CE] to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                    <Network className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl leading-tight bg-gradient-to-r from-[#00A9CE] to-purple-600 bg-clip-text text-transparent tracking-tight">
                      Why {device.name} is Trending
                    </h3>
                    <p className="text-sm text-gray-500 font-medium mt-1 tracking-wide">
                      Neo4j Graph Database
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Neo4j Graph Visualization */}
              <Card className="p-4 mb-4 bg-gradient-to-br from-[#00A9CE]/5 via-purple-50/50 to-blue-50/50 border border-[#00A9CE]/20 rounded-xl overflow-hidden">
                <div className="relative h-[160px] rounded-lg overflow-hidden bg-gradient-to-br from-[#00A9CE]/10 via-purple-100/30 to-blue-100/30 flex items-center justify-center">
                  {/* Neo4j Graph Visualization - SVG representation */}
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 320 160"
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
                      <linearGradient id="feature-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#D97706" />
                      </linearGradient>
                      <linearGradient id="pattern-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#EF4444" />
                        <stop offset="100%" stopColor="#DC2626" />
                      </linearGradient>
                      {/* Animated pulse for connections */}
                      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="#00A9CE" opacity="0.6" />
                      </marker>
                    </defs>
                    
                    {/* Animated connection lines */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Connection: Gen Z -> Device */}
                      <line x1="90" y1="40" x2="140" y2="65" stroke="#9333EA" strokeWidth="2" strokeDasharray="3,2" opacity="0.6" markerEnd="url(#arrowhead)">
                        <animate attributeName="stroke-dashoffset" values="0;5" dur="2s" repeatCount="indefinite" />
                      </line>
                      
                      {/* Connection: Trending -> Device */}
                      <line x1="230" y1="40" x2="180" y2="65" stroke="#10B981" strokeWidth="2" strokeDasharray="3,2" opacity="0.6" markerEnd="url(#arrowhead)">
                        <animate attributeName="stroke-dashoffset" values="0;5" dur="2s" repeatCount="indefinite" />
                      </line>
                      
                      {/* Connection: Features -> Device */}
                      <line x1="70" y1="115" x2="135" y2="85" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.5" />
                      <line x1="250" y1="115" x2="165" y2="85" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.5" />
                      <line x1="160" y1="125" x2="160" y2="95" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.5" />
                      
                      {/* Connection: Gen Z -> Features */}
                      <line x1="85" y1="50" x2="65" y2="105" stroke="#9333EA" strokeWidth="1" strokeDasharray="1,1" opacity="0.4" />
                      <line x1="95" y1="50" x2="155" y2="115" stroke="#9333EA" strokeWidth="1" strokeDasharray="1,1" opacity="0.4" />
                    </motion.g>
                    
                    {/* Graph nodes with animation */}
                    {/* Device Node (Center) - Main Hub */}
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      <circle cx="160" cy="80" r="20" fill="url(#device-gradient)" stroke="white" strokeWidth="3" filter="drop-shadow(0 3px 6px rgba(0,169,206,0.4))" />
                      <text x="160" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Device</text>
                    </motion.g>
                    
                    {/* User Preference Nodes */}
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                    >
                      <circle cx="80" cy="35" r="16" fill="url(#genz-gradient)" stroke="white" strokeWidth="2.5" filter="drop-shadow(0 2px 4px rgba(147,51,234,0.4))" />
                      <text x="80" y="39" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Gen Z</text>
                    </motion.g>
                    
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                    >
                      <circle cx="240" cy="35" r="16" fill="url(#trending-gradient)" stroke="white" strokeWidth="2.5" filter="drop-shadow(0 2px 4px rgba(16,185,129,0.4))" />
                      <text x="240" y="39" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Trending</text>
                    </motion.g>
                    
                    {/* Feature Nodes */}
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                    >
                      <circle cx="60" cy="120" r="13" fill="url(#feature-gradient)" stroke="white" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(245,158,11,0.4))" />
                      <text x="60" y="124" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">120Hz</text>
                    </motion.g>
                    
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
                    >
                      <circle cx="160" cy="130" r="13" fill="#8B5CF6" stroke="white" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(139,92,246,0.4))" />
                      <text x="160" y="134" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Gaming</text>
                    </motion.g>
                    
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
                    >
                      <circle cx="260" cy="120" r="13" fill="url(#pattern-gradient)" stroke="white" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(239,68,68,0.4))" />
                      <text x="260" y="124" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Camera</text>
                    </motion.g>
                    
                    {/* Relationship labels with animation */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <text x="110" y="50" fill="#9333EA" fontSize="8" fontWeight="700" opacity="0.9">PREFERS</text>
                    </motion.g>
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <text x="200" y="50" fill="#10B981" fontSize="8" fontWeight="700" opacity="0.9">TRENDING</text>
                    </motion.g>
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0 }}
                    >
                      <text x="155" y="110" fill="#8B5CF6" fontSize="7" fontWeight="600" opacity="0.8">HAS</text>
                    </motion.g>
                  </svg>
                  
                  <div className="absolute bottom-2 left-2 right-2 z-10">
                    <Badge className="bg-gradient-to-r from-[#00A9CE] to-purple-600 text-white text-xs px-2.5 py-1 shadow-md font-medium">
                      <Network className="w-3 h-3 mr-1.5" />
                      Neo4j Graph
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Relationship Explanation */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-base mb-4 text-gray-800 tracking-tight flex items-center gap-2">
                    <span className="text-lg">🔥</span>
                    Why It's Hot
                  </h4>
                  <div className="space-y-2.5">
                    {reasons.map((reason, idx) => {
                      const Icon = reason.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center gap-3.5 p-3 rounded-lg bg-gray-50/80 hover:bg-gradient-to-r hover:from-[#00A9CE]/5 hover:to-purple-50/30 transition-all cursor-pointer border border-gray-100 hover:border-[#00A9CE]/30"
                        >
                          <div className={`p-2.5 rounded-lg ${reason.color.replace('text-', 'bg-')}/10 flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${reason.color}`} />
                          </div>
                          <p className="text-base flex-1 font-medium text-gray-800 leading-snug">{reason.text}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200/80">
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    <span className="font-semibold text-[#00A9CE]">Neo4j</span> analyzes relationships between user preferences, device features, and trending patterns to match Gen Z interests.
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
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          // Clear any pending close timeout immediately
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setIsOpen(true);
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          const relatedTarget = e.relatedTarget;
          
          // Check if we're moving to the content card - if so, do nothing
          if (relatedTarget instanceof Node && contentRef.current?.contains(relatedTarget)) {
            return;
          }
          
          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          
          // Shorter delay for more responsive feel
          timeoutRef.current = setTimeout(() => {
            // Check if we're hovering over trigger or content
            const isHoveringTrigger = triggerRef.current?.matches(':hover') || false;
            const isHoveringContent = contentRef.current?.matches(':hover') || false;
            
            // Only close if we're truly not hovering over anything
            if (!isHoveringTrigger && !isHoveringContent) {
              setIsOpen(false);
            }
            timeoutRef.current = null;
          }, 200);
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
