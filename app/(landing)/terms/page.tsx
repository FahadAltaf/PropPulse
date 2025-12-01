"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-6 bg-background text-foreground">
      <Card className="max-w-3xl w-full border border-border/40 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Terms of Service
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>

        <CardContent className="space-y-8 prose prose-invert max-w-none">
          <section>
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our website, services, or products, you
              agree to comply with and be bound by these Terms of Service. If
              you do not agree to these terms, please discontinue use
              immediately.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">
              2. Account Responsibilities
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities under your account. You
              must notify us immediately of any unauthorized use or security
              breach.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">3. Acceptable Use</h2>
            <p>
              You agree not to misuse our services. This includes but is not
              limited to: engaging in illegal activities, attempting to gain
              unauthorized access, distributing harmful software, or disrupting
              the integrity or performance of the platform.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">4. Privacy & Data</h2>
            <p>
              Your privacy is important to us. Our{" "}
              <Link href="/privacy" className="text-primary underline">
                Privacy Policy
              </Link>{" "}
              explains how we collect, use, and protect your data. By using our
              service, you consent to these practices.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">5. Service Modifications</h2>
            <p>
              We may modify, suspend, or discontinue any aspect of the service
              at any time without prior notice. We will strive to notify users
              of significant changes where possible.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">
              6. Limitation of Liability
            </h2>
            <p>
              We are not liable for any indirect, incidental, or consequential
              damages arising from your use or inability to use the service.
              Your sole remedy is to discontinue use.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">7. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of your local jurisdiction, without regard to conflict of
              law principles.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">8. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <Link
                href="mailto:support@example.com"
                className="text-primary underline"
              >
                support@example.com
              </Link>
              .
            </p>
          </section>

          <div className="pt-6 text-center">
            <Button asChild>
              <Link href="/auth/signup">Return to Sign Up</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
