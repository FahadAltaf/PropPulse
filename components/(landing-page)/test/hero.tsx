"use client";

// components/hero.tsx
import { ArrowRight, CheckCircle, BarChart3, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import RegisterInterestPopup from "./register-interest-popup";
import { useState } from "react";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="space-y-8 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Premium Property Platform for Agents
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Connect with{" "}
                <span className="text-primary">Premium Properties</span>{" "}
                Instantly
              </h1>
              <p className="text-xl text-muted-foreground">
                Prop Pulse streamlines property interest registration, providing
                agents with instant access to premium listings, detailed PDF
                reports, and direct communication channels.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                id="open-register-popup"
                className="gap-2"
                onClick={() => setIsOpen(true)}
              >
                Register Interest Now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Browse Properties
              </Button>
            </div>

            <div className="md:grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 hidden">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold">500+</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Active Properties
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold">1.2K+</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Registered Agents
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold">98%</span>
                </div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="inline-block p-4 rounded-xl bg-background shadow-lg mb-6">
                    <Building2 className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Property Dashboard Preview
                  </h3>
                  <p className="text-muted-foreground">
                    Interactive property search and registration
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-card p-4 rounded-xl shadow-lg border">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">Live Updates</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-lg border">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">
                  Instant PDF Download
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RegisterInterestPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
