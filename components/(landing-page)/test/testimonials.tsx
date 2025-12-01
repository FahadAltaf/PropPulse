// components/testimonials.tsx
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Senior Property Agent",
    company: "Elite Properties",
    content:
      "Prop Pulse has revolutionized how we register interest. The PDF reports are incredibly detailed and professional.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Real Estate Broker",
    company: "Metro Realty",
    content:
      "The WhatsApp integration saves hours of back-and-forth communication. Highly recommended for serious agents.",
    rating: 5,
  },
  {
    name: "Jessica Williams",
    role: "Property Consultant",
    company: "Prime Consultants",
    content:
      "Clean interface, easy to use, and the auto-complete search is a game-changer for finding properties quickly.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="container px-4 md:px-6 py-12 md:py-24">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Trusted by Property Professionals
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join hundreds of agents who have streamlined their property
          registration process
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-base">
                    {testimonial.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground italic">
                "{testimonial.content}"
              </p>
              <div className="pt-4 border-t">
                <p className="text-sm font-medium">{testimonial.company}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
