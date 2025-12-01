// components/features.tsx
import {
  Search,
  FileText,
  MessageSquare,
  Shield,
  Zap,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Search,
    title: "Smart Property Search",
    description:
      "Advanced auto-complete search with filters to find perfect property matches instantly.",
  },
  {
    icon: FileText,
    title: "Detailed PDF Reports",
    description:
      "Download comprehensive property details including images, pricing, and amenities.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Integration",
    description:
      "Submit your number for direct communication and property tracking.",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description:
      "Enterprise-grade security for all your property data and communications.",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Real-time alerts for new properties matching your criteria.",
  },
  {
    icon: Users,
    title: "Agent Network",
    description: "Connect with other premium agents and share insights.",
  },
];

export default function Features() {
  return (
    <section className="container px-4 md:px-6 py-12 md:py-24 mx-auto">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Core Features</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to streamline property registration and
          communication
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
