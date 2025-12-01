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
              {/* Tagline/Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Stop Searching. <span className="text-primary">Start Closing.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                We deliver live, up-to-date availability straight to you. No more chasing leads or outdated listings. Focus on closing clients, not finding properties.
              </p>

              {/* Social Proof Badge */}
              <div className="inline-flex items-center gap-2 rounded-lg bg-green-500/10 px-4 py-2 text-sm font-medium">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                250+ agents now closing more deals
              </div>
            </div>

            {/* Call-to-Action */}
            <div className="space-y-3">
              <Button
                size="lg"
                variant="default"
                id="open-register-popup"
                className="gap-2 text-lg px-8 py-6 h-auto"
                onClick={() => setIsOpen(true)}
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
              <p className="text-sm text-muted-foreground">
                No credit card required • Instant access to live reports
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-left">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-base">Live availability updates—always current</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-base">Direct property details & contacts</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-base">Spend your time closing, not searching</span>
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
