"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-6 bg-background text-foreground">
      <Card className="max-w-3xl w-full border border-border/40 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Privacy Policy
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>

        <CardContent className="space-y-8 prose prose-invert max-w-none">
          <section>
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our website, services, or
              products. By using our services, you consent to the data practices
              described in this policy.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">2. Information We Collect</h2>
            <p>
              We may collect personal information such as your name, email
              address, contact details, and payment information. We may also
              collect non-personal data such as browser type, device
              information, and usage statistics.
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>Information you provide when creating an account</li>
              <li>
                Data collected automatically through cookies and analytics
              </li>
              <li>Communication and support interactions</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">
              3. How We Use Your Information
            </h2>
            <p>
              We use your information to improve our services, provide customer
              support, send important updates, and ensure platform security.
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>To operate and maintain our website and services</li>
              <li>To send administrative and promotional communications</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">
              4. Data Sharing & Disclosure
            </h2>
            <p>
              We do not sell your personal data. We may share information with
              trusted third-party service providers who assist in operating our
              business, as well as when required by law or to protect our legal
              rights.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">5. Cookies & Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your
              browsing experience, analyze site traffic, and understand user
              behavior. You can control cookie preferences through your browser
              settings.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">6. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your data
              from unauthorized access, alteration, disclosure, or destruction.
              However, please note that no system is 100% secure.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding
              your personal data, such as accessing, correcting, deleting, or
              restricting its use. You can contact us to exercise these rights.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will
              be reflected with a new “Last Updated” date at the top of this
              page. Continued use of our services after updates constitutes
              acceptance of the revised policy.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at{" "}
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
