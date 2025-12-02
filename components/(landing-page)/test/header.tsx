"use client";

// components/header.tsx
import { Building2, Phone, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function Header() {
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">Prop Pulse</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreditsOpen(true)}
              className="gap-2"
            >
              <Coins className="h-4 w-4" />
              <span className="hidden sm:inline">Credits</span>
            </Button>
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

      <Dialog open={isCreditsOpen} onOpenChange={setIsCreditsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              Credits Information
            </DialogTitle>
            <DialogDescription>
              Your account credits and usage details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Available Credits</span>
                <span className="text-lg font-bold text-primary">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Used Credits</span>
                <span className="text-sm text-muted-foreground">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Credits</span>
                <span className="text-sm text-muted-foreground">0</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold mb-2">How Credits Work</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Credits are used for property requests and inquiries</li>
                <li>• Each property request consumes credits</li>
                <li>• Credits can be purchased or earned through referrals</li>
                <li>• Unused credits roll over to the next month</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
