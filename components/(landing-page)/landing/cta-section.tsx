"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export function CTASection() {
  return (
    <section id="register-interest" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Register Your Interest
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Share what you’re looking for and get a curated list of matching
              properties with detailed PDFs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white hover:bg-gray-100 font-semibold text-lg px-8"
                asChild
              >
                <a href="#register-interest">
                  Register Interest <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-primary/10 font-semibold text-lg px-8"
                asChild
              >
                <a href="#properties">Browse Properties</a>
              </Button>
            </div>
            <p className="text-sm opacity-75 flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4 md:flex hidden" />
              No fees to register interest • PDFs sent after you submit details
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
