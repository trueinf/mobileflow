import { Device, Plan } from "../types/device";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Check, MapPin, CreditCard, Phone, Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";

interface CheckoutProps {
  device: Device;
  plan: Plan;
  onBack: () => void;
}

export function Checkout({ device, plan, onBack }: CheckoutProps) {
  const [step, setStep] = useState<"details" | "delivery" | "payment" | "confirmation">("details");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneOption: "new",
    existingNumber: "",
    deliveryOption: "delivery",
    address: "",
    postcode: "",
  });

  const totalMonthly = device.price36 + plan.price;

  const handleComplete = () => {
    setStep("confirmation");
  };

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-12 max-w-2xl w-full text-center border border-border">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="mb-4">Order Confirmed! 🎉</h1>
          <p className="text-muted-foreground mb-8">
            Your {device.name} is on its way!
          </p>

          <div className="bg-secondary rounded-2xl p-6 mb-8 text-left">
            <div className="flex items-center justify-between mb-4">
              <span>Order number</span>
              <Badge className="bg-[#00A9CE] text-white">
                #OPT-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <p>Expected delivery: 2-3 business days</p>
              <p>We'll send tracking info to {formData.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-[#00A9CE] hover:bg-[#0098b8]">
              Track my order
            </Button>
            <Button variant="outline" className="w-full">
              View digital receipt
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-blue-50/30 pb-20">
      <div className="max-w-[1000px] mx-auto px-6 py-8">
        {/* Header */}
        <Button onClick={onBack} variant="ghost" className="mb-6">
          ← Back
        </Button>

        <h1 className="mb-8">Checkout</h1>

        <div className="grid md:grid-cols-[1fr_400px] gap-8">
          {/* Main Form */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 border border-border">
              <h3 className="mb-4">Your order</h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={device.image}
                  alt={device.name}
                  className="w-20 h-20 object-contain"
                />
                <div className="flex-1">
                  <h4>{device.name}</h4>
                  <p className="text-sm text-muted-foreground">{plan.name}</p>
                </div>
                <div className="text-[#00A9CE]">${totalMonthly}/mo</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-2">
                <Sparkles className="w-5 h-5 text-[#00A9CE] mt-0.5" />
                <p className="text-sm">
                  AI tip: You're getting a great deal! This combo saves you $180 over 36 months.
                </p>
              </div>
            </div>

            {/* Personal Details */}
            <div className="bg-white rounded-2xl p-6 border border-border">
              <h3 className="mb-4">Your details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="Smith"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="bg-white rounded-2xl p-6 border border-border">
              <h3 className="mb-4">Phone number</h3>
              <div className="space-y-4">
                <button
                  onClick={() =>
                    setFormData({ ...formData, phoneOption: "new" })
                  }
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    formData.phoneOption === "new"
                      ? "border-[#00A9CE] bg-blue-50"
                      : "border-border hover:border-[#00A9CE]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <div>
                      <h4>Get a new number</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll assign you a new number
                      </p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() =>
                    setFormData({ ...formData, phoneOption: "port" })
                  }
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    formData.phoneOption === "port"
                      ? "border-[#00A9CE] bg-blue-50"
                      : "border-border hover:border-[#00A9CE]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <div>
                      <h4>Keep my current number</h4>
                      <p className="text-sm text-muted-foreground">
                        Port your number (takes 1-2 business days)
                      </p>
                    </div>
                  </div>
                </button>
                {formData.phoneOption === "port" && (
                  <Input
                    placeholder="Enter your current number"
                    value={formData.existingNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        existingNumber: e.target.value,
                      })
                    }
                  />
                )}
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-2xl p-6 border border-border">
              <h3 className="mb-4">Delivery or pickup</h3>
              <div className="space-y-4">
                <button
                  onClick={() =>
                    setFormData({ ...formData, deliveryOption: "delivery" })
                  }
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    formData.deliveryOption === "delivery"
                      ? "border-[#00A9CE] bg-blue-50"
                      : "border-border hover:border-[#00A9CE]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <div>
                      <h4>Delivery</h4>
                      <p className="text-sm text-muted-foreground">
                        2-3 business days
                      </p>
                    </div>
                  </div>
                </button>
                {formData.deliveryOption === "delivery" && (
                  <div className="grid gap-4 mt-4">
                    <div>
                      <Label htmlFor="address">Delivery address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input
                        id="postcode"
                        value={formData.postcode}
                        onChange={(e) =>
                          setFormData({ ...formData, postcode: e.target.value })
                        }
                        placeholder="3000"
                      />
                    </div>
                  </div>
                )}
                <button
                  onClick={() =>
                    setFormData({ ...formData, deliveryOption: "pickup" })
                  }
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    formData.deliveryOption === "pickup"
                      ? "border-[#00A9CE] bg-blue-50"
                      : "border-border hover:border-[#00A9CE]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <div>
                      <h4>Store pickup</h4>
                      <p className="text-sm text-muted-foreground">
                        Optus Store Melbourne Central - Available tomorrow
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-border sticky top-24">
              <h3 className="mb-4">Order summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Device (36mo)</span>
                  <span>${device.price36}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span>${plan.price}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Upfront</span>
                  <span>${device.upfront || 0}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span>Monthly total</span>
                  <span className="text-[#00A9CE]">${totalMonthly}/mo</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total over 36 months: ${totalMonthly * 36}
                </div>
              </div>

              <Button
                onClick={handleComplete}
                className="w-full bg-[#00A9CE] hover:bg-[#0098b8] mb-3"
                size="lg"
              >
                <CreditCard className="mr-2 w-5 h-5" />
                Complete order
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By continuing, you agree to Optus terms & conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
