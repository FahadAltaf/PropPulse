"use client";

// components/header.tsx
import { Building2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight">Prop Pulse</span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="default"
            size="default"
            asChild
          >
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
          <Button
            variant="default"
            size="default"
            asChild
          >
            <Link href="/auth/login">
              Agent Login
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
