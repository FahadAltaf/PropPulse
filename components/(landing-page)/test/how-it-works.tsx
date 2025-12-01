// components/how-it-works.tsx
import {
  MousePointer,
  FileDown,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    step: "01",
    icon: MousePointer,
    title: "Register Interest",
    description:
      "Click Register Interest button to open the property search popup",
  },
  {
    step: "02",
    icon: FileDown,
    title: "Search & Download",
    description: "Find properties and download detailed PDF reports instantly",
  },
  {
    step: "03",
    icon: MessageSquare,
    title: "Submit WhatsApp",
    description: "Enter your WhatsApp number for communication and tracking",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Get Confirmed",
    description:
      "Receive confirmation with property details sent to your WhatsApp",
  },
];

export default function HowItWorks() {
  return (
    <section className="container px-4 md:px-6 py-12 md:py-24 bg-muted/50 mx-auto">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Simple four-step process to register interest and connect with
          properties
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {/* Connection lines for desktop */}
        <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-border -z-10" />

        {steps.map((step, index) => (
          <Card key={index} className="relative text-center">
            <CardContent className="pt-6">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
              </div>

              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
