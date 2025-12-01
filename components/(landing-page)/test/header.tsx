"use client";

// components/header.tsx
import { Building2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RegisterInterestPopup from "./register-interest-popup";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight">Prop Pulse</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Browse Properties
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            How It Works
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <Phone className="h-4 w-4 mr-2" />
            Agent Login
          </Button>
          <Button id="open-register-popup" onClick={() => setIsOpen(true)}>
            Register Interest
          </Button>
        </div>
      </div>
      <RegisterInterestPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
