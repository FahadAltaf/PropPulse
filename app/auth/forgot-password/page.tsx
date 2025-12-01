"use client";
import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings } from "@/modules/settings";
import { resetPasswordForEmail } from "@/modules/auth/services/auth-service";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/logo";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { settings } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use Supabase's built-in password reset
      await resetPasswordForEmail(
        email,
        `${window.location.origin}/auth/reset-password`
      );

      setIsEmailSent(true);
      toast.success(
        "If your email exists in our system, a reset link has been sent."
      );
    } catch (err) {
      console.error("Password reset error:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to send reset email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 bg-sidebar hover:bg-sidebar-hover p-4 sm:p-6 lg:p-8 rounded-lg shadow">
        {!isEmailSent ? (
          <>
            <div className="flex flex-col items-center gap-2">
              <div
                className="flex shrink-0 items-center justify-center rounded-md border-sidebar-border relative"
                aria-hidden="true"
              >
                <Logo settings={settings as Settings} />
              </div>
              <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                Forgot Password?
              </h2>
              <p className="mt-2 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
                No worries! Enter your email address and we&apos;ll send you a
                link to reset your password.
              </p>
            </div>

            <form
              className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="email"
                    className="dark:text-gray-200 text-sm sm:text-base"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="hi@yourcompany.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600 h-10 sm:h-11 text-sm sm:text-base"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full text-white p-2 sm:p-2.5 rounded-md cursor-pointer transition-colors hover:shadow-sm hover:opacity-90 text-sm sm:text-base h-10 sm:h-11"
                disabled={isLoading}
                style={{
                  backgroundColor: settings?.primary_color || "#ec4899",
                }}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>

              <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline cursor-pointer"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2">
              <div
                className="flex shrink-0 items-center justify-center rounded-md border-sidebar-border relative"
                aria-hidden="true"
              >
                <Logo settings={settings as Settings} />
              </div>
              <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                Check Your Email
              </h2>
              <p className="mt-2 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-semibold text-gray-900 dark:text-white break-all">
                  {email}
                </span>
              </p>
            </div>

            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
              <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4">
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-blue-800 dark:text-blue-300">
                  <li>Check your inbox and spam folder</li>
                  <li>The link will expire in 1 hour</li>
                  <li>Click the link to create a new password</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2 sm:gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail("");
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-2.5 rounded-md cursor-pointer text-sm sm:text-base h-10 sm:h-11"
                >
                  Try Another Email
                </Button>

                <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 sm:mt-3">
                  Remember your password?{" "}
                  <Link
                    href="/auth/login"
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
