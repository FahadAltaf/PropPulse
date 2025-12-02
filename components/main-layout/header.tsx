"use client";

import { Separator } from "@radix-ui/react-separator";

import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { RiScanLine } from "@remixicon/react";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Header({ title, url }: { title: string; url: string }) {
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger className="-ms-4" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  <RiScanLine size={22} aria-hidden="true" />
                  <span className="sr-only">Dashboard</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Link href={url}>{title}</Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreditsOpen(true)}
              className="gap-2"
            >
              <Coins className="h-4 w-4" />
              <span className="hidden sm:inline">Credits: 0</span>
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
              Overview of your current credits and how they are used in Prop
              Pulse.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pb-4">
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
              <h4 className="mb-2 text-sm font-semibold">How Credits Work</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Credits are used for property requests and actions.</li>
                <li>• Each advanced search or request may consume credits.</li>
                <li>• Credits can be purchased or awarded by admins.</li>
                <li>• Contact support if you need more details.</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
