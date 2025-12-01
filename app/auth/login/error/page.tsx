"use client";

import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { Suspense } from "react";
import { AlertCircle } from "lucide-react";
import Logo from "@/components/logo";
import { useAuth } from "@/context/AuthContext";
import { Settings } from "@/modules/settings";

function ErrorContent() {
  const searchParams = useSearchParams();
  const { settings } = useAuth();
  const errorType = searchParams.get("type") || "auth_callback_error";

  const errorMessages: Record<string, string> = {
    auth_callback_error:
      "There was a problem signing you in. Please try again.",
    profile_creation_error:
      "We couldn't create your profile. Please try again or contact support.",
    session_error: "Your session has expired. Please sign in again.",
    oauth_error: "OAuth authentication failed. Please try again.",
    default: "An error occurred during authentication. Please try again.",
  };

  const errorMessage = errorMessages[errorType] || errorMessages.default;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Logo settings={settings as Settings} />
          </div>
          <div className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">
              Authentication Error
            </CardTitle>
            <CardDescription>
              We encountered a problem while trying to authenticate you
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>

          <div className="text-sm text-muted-foreground text-center">
            If this problem persists, please contact support for assistance.
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button asChild className="w-full" size="lg">
            <Link href="/auth/login">Try Again</Link>
          </Button>

          <Button asChild variant="outline" className="w-full" size="lg">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
          <Card className="w-full max-w-md">
            <CardContent className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
