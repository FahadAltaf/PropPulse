"use client";
import { useId, Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings } from "@/modules/settings";
import {
  resendVerificationEmail,
  signInWithOtp,
  verifyOtp,
  signInWithOAuth,
} from "@/modules/auth/services/auth-service";
import { toast } from "sonner";
import Logo from "@/components/logo";

function LoginForm() {
  const id = useId();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerificationLoading, setIsEmailVerificationLoading] =
    useState(false);
  const { signIn, settings } = useAuth();

  const [emailVerificationNeeded, setEmailVerificationNeeded] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">(
    "password"
  );
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSocialLoading, setIsSocialLoading] = useState<string | null>(null);

  // Check URL params for tab preference and email
  useEffect(() => {
    const tab = searchParams.get("tab");
    const emailParam = searchParams.get("email");

    if (tab === "otp") {
      setLoginMethod("otp");
    } else if (tab === "password") {
      setLoginMethod("password");
    }

    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setEmailVerificationNeeded(false);

    try {
      const result = await signIn(email, password);
      // If we get here, login was successful
      window.location.href = "/dashboard";
    } catch (error: any) {
      setIsLoading(false);

      // Handle specific error cases
      if (error.message?.includes("Email not confirmed")) {
        setEmailVerificationNeeded(true);
        setError(
          "Email not confirmed. Please verify your email or resend the verification link."
        );
      } else if (error.message?.includes("Invalid login credentials")) {
        setError("Invalid credentials. Please check your email and password.");
      } else {
        setError(
          error instanceof Error
            ? error.message
            : "An error occurred during login"
        );
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      setIsEmailVerificationLoading(true);
      await resendVerificationEmail(email);
      toast.success("Verification email sent. Please check your inbox.");
      setEmailVerificationNeeded(false);
      setError(null);
    } catch (error: any) {
      // If the error indicates user already exists, that's expected
      setError(
        error instanceof Error
          ? error.message
          : "Failed to resend verification email"
      );
    } finally {
      setIsEmailVerificationLoading(false);
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signInWithOtp(email);
      setOtpSent(true);
      toast.success("OTP sent to your email!");
    } catch (error: any) {
      setError(error.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await verifyOtp(email, otp);

      if (data.session && data.user) {
        // Session created successfully
        toast.success("Login successful! Redirecting...");

        // Wait for auth state to propagate
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Force reload to ensure auth context picks up the new session
        window.location.href = "/dashboard";
      } else {
        throw new Error("Failed to create session");
      }
    } catch (error: any) {
      setError(error.message || "Invalid OTP");
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "apple" | "facebook"
  ) => {
    try {
      setIsSocialLoading(provider);
      setError(null);

      const data = await signInWithOAuth(
        provider,
        `${window.location.origin}/auth/callback`
      );

      // The user will be redirected to the OAuth provider
      // The callback will handle the rest of the flow
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: unknown) {
      console.error(`${provider} login error:`, error);
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to sign in with ${provider}`
      );
      setIsSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 bg-sidebar hover:bg-sidebar-hover p-4 sm:p-6 lg:p-8 rounded-lg shadow">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex shrink-0 items-center justify-center rounded-md border-sidebar-border relative"
            aria-hidden="true"
          >
            <Logo settings={settings as Settings} />
          </div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
            Enter your credentials to login to your account.
          </p>
        </div>

        {/* Login Method Tabs */}
        <div className="flex gap-2 mb-4 sm:mb-6">
          <button
            type="button"
            onClick={() => {
              setLoginMethod("password");
              setOtpSent(false);
              setError(null);
              // Update URL without page reload
              const url = new URL(window.location.href);
              url.searchParams.set("tab", "password");
              window.history.pushState({}, "", url.toString());
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-md transition-colors text-sm sm:text-base ${
              loginMethod === "password"
                ? "text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
            style={{
              backgroundColor:
                loginMethod === "password"
                  ? settings?.primary_color || "#ec4899"
                  : "",
            }}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginMethod("otp");
              setOtpSent(false);
              setError(null);
              // Update URL without page reload
              const url = new URL(window.location.href);
              url.searchParams.set("tab", "otp");
              window.history.pushState({}, "", url.toString());
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-md transition-colors text-sm sm:text-base ${
              loginMethod === "otp"
                ? "text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
            style={{
              backgroundColor:
                loginMethod === "otp"
                  ? settings?.primary_color || "#ec4899"
                  : "",
            }}
          >
            OTP
          </button>
        </div>

        <form
          className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
          onSubmit={
            loginMethod === "password"
              ? handleSubmit
              : otpSent
                ? handleVerifyOTP
                : handleSendOTP
          }
        >
          {error && (
            <div className="text-red-600 dark:text-red-400 text-xs sm:text-sm text-center px-2">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <Label
                htmlFor={`${id}-email`}
                className="dark:text-gray-200 text-sm sm:text-base"
              >
                Email
              </Label>
              <Input
                id={`${id}-email`}
                placeholder="hi@yourcompany.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={otpSent}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600 h-10 sm:h-11 text-sm sm:text-base"
              />
            </div>

            {loginMethod === "password" && (
              <div>
                <Label
                  htmlFor={`${id}-password`}
                  className="dark:text-gray-200 text-sm sm:text-base"
                >
                  Password
                </Label>
                <Input
                  id={`${id}-password`}
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600 h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
            )}

            {loginMethod === "otp" && otpSent && (
              <div>
                <Label
                  htmlFor={`${id}-otp`}
                  className="dark:text-gray-200 text-sm sm:text-base"
                >
                  Enter OTP
                </Label>
                <Input
                  id={`${id}-otp`}
                  placeholder="Enter 6-digit OTP"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600 h-10 sm:h-11 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                  }}
                  className="text-xs sm:text-sm mt-2 hover:underline"
                  style={{
                    color: settings?.primary_color || "#ec4899",
                  }}
                >
                  Change email
                </button>
              </div>
            )}
          </div>

          {loginMethod === "password" && (
            <div className="flex flex-row justify-end sm:justify-between gap-2 sm:gap-2">
              <div className=" items-center gap-2 sm:flex hidden">
                <Checkbox
                  id={`${id}-remember`}
                  className="dark:border-gray-600 cursor-pointer"
                />
                <Label
                  htmlFor={`${id}-remember`}
                  className="text-muted-foreground font-normal dark:text-gray-400 cursor-pointer text-xs sm:text-sm"
                >
                  Remember me
                </Label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-xs sm:text-sm underline hover:no-underline text-primary cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <div className="flex flex-col gap-2 sm:gap-3">
            {emailVerificationNeeded && loginMethod === "password" && (
              <Button
                type="button"
                onClick={handleResendVerification}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-2.5 rounded-md cursor-pointer text-sm sm:text-base h-10 sm:h-11"
                disabled={isEmailVerificationLoading}
              >
                {isEmailVerificationLoading
                  ? "Sending..."
                  : "Resend Verification Email"}
              </Button>
            )}
            <Button
              type="submit"
              className="w-full text-white p-2 sm:p-2.5 rounded-md cursor-pointer hover:shadow-sm hover:opacity-90 text-sm sm:text-base h-10 sm:h-11"
              disabled={isLoading}
              style={{
                backgroundColor: settings?.primary_color || "#ec4899",
              }}
            >
              {isLoading
                ? loginMethod === "password"
                  ? "Signing in..."
                  : otpSent
                    ? "Verifying..."
                    : "Sending OTP..."
                : loginMethod === "password"
                  ? "Sign in"
                  : otpSent
                    ? "Verify OTP"
                    : "Send OTP"}
            </Button>
          </div>

          <div className="relative text-center text-xs sm:text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-300 dark:after:border-gray-600">
            <span className="relative z-10 bg-white dark:bg-sidebar px-2 text-gray-600 dark:text-gray-400">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <Button
              variant="outline"
              className="w-full h-10 sm:h-11 text-sm sm:text-base"
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={!!isSocialLoading}
            >
              {isSocialLoading === "google" ? (
                <svg
                  className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="font-medium">Google</span>
                </div>
              )}
            </Button>
          </div>
          <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 sm:mt-3">
            Already have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-primary hover:underline cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
