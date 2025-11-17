import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Device, Plan } from "../types/device";
import { CreditCard, Lock, Check, ArrowLeft, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface PaymentProps {
  device: Device;
  plan: Plan;
  formData?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    postcode?: string;
  };
  onBack: () => void;
  onComplete: () => void;
}

export function Payment({ device, plan, formData, onBack, onComplete }: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "bank">("card");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const totalMonthly = device.price36 + plan.price;
  const upfront = device.upfront || 0;
  const totalFirstPayment = totalMonthly + upfront;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16) {
      value = value.match(/.{1,4}/g)?.join(" ") || value;
      setCardData({ ...cardData, cardNumber: value });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
      setCardData({ ...cardData, expiryDate: value });
    }
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCardData({ ...cardData, cvv: value });
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-blue-50/30 pb-20">
      <div className="max-w-[1000px] mx-auto px-6 py-8">
        <Button onClick={onBack} variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to checkout
        </Button>

        <h1 className="text-4xl font-bold mb-2">Payment</h1>
        <p className="text-muted-foreground mb-8">
          Complete your purchase securely
        </p>

        <div className="grid md:grid-cols-[1fr_400px] gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={device.image}
                  alt={device.name}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{device.name}</h4>
                  <p className="text-sm text-muted-foreground">{plan.name}</p>
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Device (36mo)</span>
                  <span>${device.price36}/mo</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Plan</span>
                  <span>${plan.price}/mo</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Upfront payment</span>
                  <span>${upfront}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                  <span>First payment</span>
                  <span className="text-[#00A9CE]">${totalFirstPayment}</span>
                </div>
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-muted-foreground">Then monthly</span>
                  <span className="text-[#00A9CE]">${totalMonthly}/mo</span>
                </div>
              </div>
            </Card>

            {/* Payment Method Selection */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Payment Method</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === "card"
                      ? "border-[#00A9CE] bg-blue-50"
                      : "border-border hover:border-[#00A9CE]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5" />
                    <div>
                      <h4>Credit or Debit Card</h4>
                      <p className="text-sm text-muted-foreground">
                        Visa, Mastercard, Amex
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === "paypal"
                      ? "border-[#00A9CE] bg-blue-50"
                      : "border-border hover:border-[#00A9CE]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-600 rounded"></div>
                    <div>
                      <h4>PayPal</h4>
                      <p className="text-sm text-muted-foreground">
                        Pay with your PayPal account
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("bank")}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === "bank"
                      ? "border-[#00A9CE] bg-blue-50"
                      : "border-border hover:border-[#00A9CE]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-600 rounded"></div>
                    <div>
                      <h4>Bank Transfer</h4>
                      <p className="text-sm text-muted-foreground">
                        Direct bank transfer
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </Card>

            {/* Card Details Form */}
            {paymentMethod === "card" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Card Details</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name on card</Label>
                      <Input
                        id="cardName"
                        placeholder="John Smith"
                        value={cardData.cardName}
                        onChange={(e) =>
                          setCardData({ ...cardData, cardName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={cardData.expiryDate}
                          onChange={handleExpiryChange}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={handleCVVChange}
                          maxLength={3}
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Security Notice */}
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-900 mb-1">
                    Secure Payment
                  </p>
                  <p className="text-green-700">
                    Your payment information is encrypted and secure. We never
                    store your full card details.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h3 className="font-semibold mb-4">Payment Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalMonthly}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Upfront payment</span>
                  <span>${upfront}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-semibold">
                  <span>Total to pay today</span>
                  <span className="text-[#00A9CE] text-lg">
                    ${totalFirstPayment}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground pt-2 border-t">
                  <p>Then ${totalMonthly}/mo for 36 months</p>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isProcessing || (paymentMethod === "card" && (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv))}
                className="w-full bg-[#00A9CE] hover:bg-[#0098b8] mb-3"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 w-5 h-5" />
                    Pay ${totalFirstPayment}
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                <Lock className="w-3 h-3" />
                <span>Secure SSL encrypted payment</span>
              </div>

              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  By completing this purchase, you agree to Optus terms &
                  conditions and privacy policy.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

