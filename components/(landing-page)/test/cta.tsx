// components/newsletter-cta.tsx (optional)
import { Mail, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CTASection() {
  return (
    <section className="container px-4 md:px-6 py-12 md:py-24">
      <div className="rounded-2xl border bg-gradient-to-r from-card to-muted/50 p-8 md:p-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-lg bg-primary/10 px-4 py-2 text-sm">
              <Bell className="h-4 w-4 mr-2" />
              Property Updates
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Get Premium Property Alerts
            </h2>
            <p className="text-lg text-muted-foreground">
              Subscribe to receive weekly curated lists of premium properties,
              market insights, and exclusive deals directly to your inbox.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>New property listings every Monday</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Market trend analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Exclusive agent-only deals</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="you@agency.com"
                    className="pl-10"
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Property Interests
                </label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>All Property Types</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Luxury</option>
                  <option>Investment</option>
                </select>
              </div>
              <Button type="submit" className="w-full gap-2">
                Subscribe to Updates
              </Button>
            </form>
            <p className="text-sm text-muted-foreground text-center">
              By subscribing, you agree to our Privacy Policy. You may
              unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
