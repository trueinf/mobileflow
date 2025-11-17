import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { useYoungProStore } from "../../stores/youngProStore";
import { getRoamingPackForDestination, roamingPacks } from "../../data/roamingPacks";
import { Plane, Globe, CheckCircle2, MapPin, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface TravelAdvisorProps {
  onBack?: () => void;
}

export function TravelAdvisor({ onBack }: TravelAdvisorProps) {
  const { travel, setTravelDestination, setRoamingPack } = useYoungProStore();
  const [destination, setDestination] = useState(travel.destination);

  const handleSearch = () => {
    setTravelDestination(destination);
    const pack = getRoamingPackForDestination(destination);
    setRoamingPack(pack);
  };

  const popularDestinations = [
    "Singapore",
    "Thailand",
    "UK",
    "USA",
    "Europe",
    "Japan",
    "New Zealand",
  ];

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
            <Plane className="w-6 h-6 text-[#00A9CE]" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Travel & Roaming Advisor</h1>
            <p className="text-muted-foreground">
              Find the best roaming pack for your destination
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Where are you traveling?</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="Enter country or region"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-2"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="w-full bg-[#00A9CE] hover:bg-[#0098b8]"
            >
              Find Roaming Pack
            </Button>
          </div>

          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-3">Popular destinations:</p>
            <div className="flex flex-wrap gap-2">
              {popularDestinations.map((dest) => (
                <Badge
                  key={dest}
                  variant="outline"
                  className="cursor-pointer hover:bg-[#00A9CE]/10"
                  onClick={() => {
                    setDestination(dest);
                    setTravelDestination(dest);
                    const pack = getRoamingPackForDestination(dest);
                    setRoamingPack(pack);
                  }}
                >
                  {dest}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {travel.roamingPack && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-6 border-2 border-[#00A9CE]">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-[#00A9CE]" />
                <h3 className="text-xl font-bold">Recommended Pack</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold text-[#00A9CE]">
                    {travel.roamingPack.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {travel.roamingPack.destination}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Data</p>
                    <p className="font-semibold">{travel.roamingPack.data}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{travel.roamingPack.duration} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-semibold">${travel.roamingPack.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Countries</p>
                    <p className="font-semibold">
                      {Array.isArray(travel.roamingPack.countries)
                        ? travel.roamingPack.countries.length
                        : travel.roamingPack.countries}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm font-semibold mb-2">Coverage includes:</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(travel.roamingPack.countries)
                      ? travel.roamingPack.countries.slice(0, 6).map((country) => (
                          <Badge key={country} variant="secondary">
                            {country}
                          </Badge>
                        ))
                      : (
                        <Badge variant="secondary">
                          {travel.roamingPack.countries}
                        </Badge>
                      )}
                  </div>
                </div>
                <Button className="w-full bg-[#00A9CE] hover:bg-[#0098b8]">
                  Add to Plan
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold mb-4">All Roaming Packs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roamingPacks.map((pack) => (
            <Card
              key={pack.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => {
                setRoamingPack(pack);
                setTravelDestination(pack.destination);
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#00A9CE]" />
                <p className="font-semibold">{pack.name}</p>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{pack.data}</p>
              <p className="text-xl font-bold text-[#00A9CE]">${pack.price}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {pack.duration} days
              </p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

