import { Device } from "../types/device";
import { DeviceCard } from "./DeviceCard";
import { TrendingExplanation } from "./TrendingExplanation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface DiscoveryCarouselProps {
  title: string;
  devices: Device[];
  onSelectDevice: (device: Device) => void;
  onCompareDevice: (device: Device) => void;
  gamingMode?: boolean;
}

export function DiscoveryCarousel({
  title,
  devices,
  onSelectDevice,
  onCompareDevice,
  gamingMode,
}: DiscoveryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2>{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {devices.map((device) => {
          const card = (
            <DeviceCard
              key={device.id}
              device={device}
              onSelect={onSelectDevice}
              onCompare={onCompareDevice}
              variant="carousel"
              gamingMode={gamingMode}
            />
          );

          // Show trending explanation only for "Trending This Week" carousel
          const isTrending = title.toLowerCase().includes("trending");
          if (isTrending) {
            return (
              <div key={device.id} className="flex-shrink-0">
                <TrendingExplanation device={device}>
                  <div className="cursor-help w-full h-full">{card}</div>
                </TrendingExplanation>
              </div>
            );
          }

          return card;
        })}
      </div>
    </div>
  );
}
