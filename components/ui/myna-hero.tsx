"use client";

import * as React from "react";
import {
  Activity,
  ArrowRight,
  Building2,
  CheckCircle,
  Menu,
  Sparkles,
  Zap,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const navigationItems = [
  { title: "HOME", href: "#" },
  { title: "BROWSE PROPERTIES", href: "#" },
  { title: "HOW IT WORKS", href: "#" },
  { title: "CONTACT", href: "#" },
];

const labels = [
  { icon: Sparkles, label: "Live Updates" },
  { icon: CheckCircle, label: "Verified Listings" },
  { icon: Activity, label: "Real-time Availability" },
];

const features = [
  {
    icon: CheckCircle,
    label: "Live Availability Updates",
    description: "Always current property information delivered straight to you—no more chasing outdated listings.",
  },
  {
    icon: Building2,
    label: "Direct Property Details",
    description: "Instant access to comprehensive property information and direct contact channels.",
  },
  {
    icon: Zap,
    label: "Close More Deals",
    description: "Spend your time closing clients, not searching for properties. Focus on what matters most.",
  },
];

export function MynaHero() {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const titleLine1 = ["STOP", "SEARCHING.", "🔍"];
  const titleLine2 = ["START", "CLOSING.", "🚀"];

  return (
    <div className="container mx-auto px-4 min-h-screen bg-background">
      <header>
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8" />
              <span className="font-mono text-xl font-bold">Prop Pulse</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="text-sm font-mono text-foreground hover:text-primary transition-colors"
              >
                {item.title}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="default"
              className="rounded-none hidden md:inline-flex font-mono !bg-black dark:!bg-white !text-white dark:!text-black hover:!bg-black/80 dark:hover:!bg-white/80 border-2 border-black dark:border-white"
              asChild
            >
              <Link href="/auth/login">
                AGENT LOGIN <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-6 mt-6">
                  {navigationItems.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="text-sm font-mono text-foreground hover:text-primary transition-colors"
                    >
                      {item.title}
                    </a>
                  ))}
                  <Button className="cursor-pointer rounded-none font-mono !bg-black dark:!bg-white !text-white dark:!text-black hover:!bg-black/80 dark:hover:!bg-white/80 border-2 border-black dark:border-white" asChild>
                    <Link href="/auth/login">
                      AGENT LOGIN <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        <section className="container py-24">
          <div className="flex flex-col items-center text-center">
            <motion.h1
              initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative font-mono text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight"
            >
              <div className="block">
                {titleLine1.map((text, index) => (
                  <motion.span
                    key={`line1-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.6
                    }}
                    className="inline-block mx-2 md:mx-4"
                  >
                    {text}
                  </motion.span>
                ))}
              </div>
              <div className="block mt-4">
                {titleLine2.map((text, index) => (
                  <motion.span
                    key={`line2-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: (titleLine1.length + index) * 0.15,
                      duration: 0.6
                    }}
                    className="inline-block mx-2 md:mx-4"
                  >
                    {text}
                  </motion.span>
                ))}
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mx-auto mt-8 max-w-2xl text-xl text-foreground font-mono"
            >
              We deliver live, up-to-date availability straight to you. No more chasing leads or outdated listings. Focus on closing clients, not finding properties.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-6"
            >
              {labels.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.2 + (index * 0.1),
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  className="flex items-center gap-2 px-6"
                >
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-mono">{feature.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.6,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              className="mt-12"
            >
              <Button
                size="lg"
                className="cursor-pointer rounded-none font-mono !bg-black dark:!bg-white !text-white dark:!text-black hover:!bg-black/80 dark:hover:!bg-white/80 border-2 border-black dark:border-white"
              >
                START FREE TRIAL <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="container" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 3.0,
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className="text-center text-4xl font-mono font-bold mb-6"
          >
            Why Choose Prop Pulse?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.6 }}
            className="grid md:grid-cols-3 max-w-6xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 3.2 + (index * 0.2),
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                className="flex flex-col items-center text-center p-8 bg-background border"
              >
                <div className="mb-6 rounded-full bg-primary/10 p-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 text-xl font-mono font-bold">
                  {feature.label}
                </h3>
                <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  );
}
