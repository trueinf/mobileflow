import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useValueStore } from "../../stores/valueStore";
import { CheckCircle2, Clock, Phone, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface PortingFlowProps {
  onBack?: () => void;
}

export function PortingFlow({ onBack }: PortingFlowProps) {
  const { porting, setPortingStatus } = useValueStore();
  const [phoneNumber, setPhoneNumber] = useState(porting.number);

  const handleStartPorting = () => {
    if (phoneNumber) {
      setPortingStatus({
        number: phoneNumber,
        status: 'pending',
        steps: [
          { id: '1', title: 'Enter your number', completed: true },
          { id: '2', title: 'Verify account details', completed: false },
          { id: '3', title: 'Port request submitted', completed: false },
          { id: '4', title: 'Port complete', completed: false },
        ],
        estimatedCompletion: '24-48 hours',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'inProgress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

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
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Phone className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Number Porting</h1>
            <p className="text-muted-foreground">
              Keep your number when switching to Optus - it's free and easy
            </p>
          </div>
        </div>
      </div>

      {porting.status === 'notStarted' ? (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Enter Your Phone Number</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone-number">Current Phone Number</Label>
              <Input
                id="phone-number"
                placeholder="04XX XXX XXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter the number you want to keep
              </p>
            </div>

            <Button
              onClick={handleStartPorting}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!phoneNumber}
            >
              Start Porting Process
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="p-6 border-2 border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Porting Status</h3>
                <p className="text-sm text-muted-foreground">
                  Number: {porting.number}
                </p>
              </div>
              <Badge className={getStatusColor(porting.status)}>
                {porting.status === 'complete' ? 'Complete' :
                 porting.status === 'inProgress' ? 'In Progress' :
                 porting.status === 'pending' ? 'Pending' : 'Not Started'}
              </Badge>
            </div>

            {porting.estimatedCompletion && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Estimated completion: {porting.estimatedCompletion}</span>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-6">Porting Timeline</h3>
            <div className="space-y-4">
              {porting.steps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed
                      ? 'bg-green-600 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold">{idx + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${step.completed ? 'text-green-600' : ''}`}>
                      {step.title}
                    </p>
                    {step.estimatedTime && (
                      <p className="text-xs text-muted-foreground">
                        {step.estimatedTime}
                      </p>
                    )}
                  </div>
                  {idx < porting.steps.length - 1 && (
                    <div className="absolute left-5 top-12 w-0.5 h-8 bg-muted" />
                  )}
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-muted/30">
            <h3 className="font-semibold mb-4">Requirements Checklist</h3>
            <ul className="space-y-2">
              {[
                "Your current account is active",
                "You have account holder details",
                "No outstanding bills",
                "Account is not locked or suspended",
              ].map((requirement) => (
                <li key={requirement} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{requirement}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 bg-blue-50">
            <h3 className="font-semibold mb-2">What Happens Next?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Once your port request is submitted, we'll handle the transfer automatically.
              Your number will be active on Optus within 24-48 hours. You'll receive
              SMS updates throughout the process.
            </p>
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}

