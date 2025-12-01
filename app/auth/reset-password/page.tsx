"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings } from "@/modules/settings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  setSession,
  verifyRecoveryOtp,
  updatePassword,
  signOut,
} from "@/modules/auth/services/auth-service";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/logo";
import { Lock, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";

function ResetPasswordContent() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const { settings } = useAuth();

  // Check if user has valid session from reset email
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Wait a bit for Supabase to process the redirect
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Method 1: Check for hash fragment (access_token in URL)
        if (window.location.hash) {
          const hashParams = new URLSearchParams(
            window.location.hash.substring(1)
          );
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");
          const type = hashParams.get("type");

          if (type === "recovery" && accessToken) {
            try {
              const data = await setSession(accessToken, refreshToken || "");

              if (data.session) {
                setIsValidSession(true);
                window.history.replaceState(null, "", window.location.pathname);
                return;
              }
            } catch (error) {
              console.error("Session set error:", error);
              setIsValidSession(false);
              toast.error(
                "Invalid or expired reset link. Please request a new one."
              );
              return;
            }
          }
        }

        // Method 2: Check for query parameters (token_hash and type)
        const tokenHash = searchParams.get("token_hash");
        const type = searchParams.get("type");

        if (type === "recovery" && tokenHash) {
          try {
            // Exchange the token_hash for a session
            const data = await verifyRecoveryOtp(tokenHash);

            if (data.session) {
              setIsValidSession(true);
              // Clean URL
              window.history.replaceState(null, "", window.location.pathname);
              return;
            }
          } catch (error) {
            console.error("Token verification error:", error);
            setIsValidSession(false);
            toast.error(
              "Invalid or expired reset link. Please request a new one."
            );
            return;
          }
        }
      } catch (err) {
        console.error("Session check error:", err);
        setIsValidSession(false);
        toast.error("Something went wrong. Please try again.");
      }
    };

    checkSession();
  }, [searchParams]);

  // Password strength validation
  useEffect(() => {
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  const isPasswordStrong =
    passwordStrength.hasMinLength &&
    passwordStrength.hasUpperCase &&
    passwordStrength.hasLowerCase &&
    passwordStrength.hasNumber;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isPasswordStrong) {
      toast.error("Please meet all password requirements");
      return;
    }

    setIsLoading(true);

    try {
      await updatePassword(password);

      toast.success("Password reset successfully!");

      // Sign out user after password reset
      await signOut();

      // Redirect to login
      setTimeout(() => {
        router.push("/auth/login?reset=success");
      }, 1500);
    } catch (err) {
      console.error("Password reset error:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to reset password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidSession === null) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 bg-muted/30">
        <Card className="max-w-md w-full">
          <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
            <div className="flex justify-center">
              <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
            <p className="text-center mt-4 text-xs sm:text-sm text-muted-foreground">
              Verifying reset link...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isValidSession === false) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 bg-muted/30">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center px-4 sm:px-6 pt-4 sm:pt-6">
            <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-destructive/10 mb-3 sm:mb-4">
              <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-destructive" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Invalid Reset Link
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="space-y-3 sm:space-y-4">
              <Button
                className="w-full h-10 sm:h-11 text-sm sm:text-base"
                size="lg"
                asChild
              >
                <Link href="/auth/forgot-password">Request New Reset Link</Link>
              </Button>
              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 bg-muted/30">
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-3 sm:space-y-4 text-center px-4 sm:px-6 pt-4 sm:pt-6">
          <div className="flex justify-center">
            <Logo settings={settings as Settings} />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            Create New Password
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm px-2">
            Your new password must be different from previously used passwords.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">
                New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <Input
                  id="password"
                  placeholder="Enter new password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-9 sm:pl-10 pr-9 sm:pr-10 h-10 sm:h-11 text-sm sm:text-base"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm sm:text-base">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-9 sm:pl-10 pr-9 sm:pr-10 h-10 sm:h-11 text-sm sm:text-base"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <Alert className="p-3 sm:p-4">
              <AlertDescription>
                <p className="text-xs sm:text-sm font-semibold mb-2">
                  Password must contain:
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  <li
                    className={`flex items-center gap-2 ${
                      passwordStrength.hasMinLength
                        ? "text-secondary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {passwordStrength.hasMinLength ? (
                      <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    ) : (
                      <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 flex-shrink-0" />
                    )}
                    <span>At least 8 characters</span>
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      passwordStrength.hasUpperCase
                        ? "text-secondary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {passwordStrength.hasUpperCase ? (
                      <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    ) : (
                      <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 flex-shrink-0" />
                    )}
                    <span>One uppercase letter</span>
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      passwordStrength.hasLowerCase
                        ? "text-secondary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {passwordStrength.hasLowerCase ? (
                      <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    ) : (
                      <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 flex-shrink-0" />
                    )}
                    <span>One lowercase letter</span>
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      passwordStrength.hasNumber
                        ? "text-secondary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {passwordStrength.hasNumber ? (
                      <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    ) : (
                      <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 flex-shrink-0" />
                    )}
                    <span>One number</span>
                  </li>
                </ul>
              </AlertDescription>
            </Alert>

            <Button
              type="submit"
              className="w-full text-white p-2 sm:p-2.5 rounded-md cursor-pointer transition-colors hover:shadow-sm hover:opacity-90 text-sm sm:text-base h-10 sm:h-11"
              size="lg"
              disabled={isLoading || !isPasswordStrong}
              style={{
                backgroundColor: settings?.primary_color || "#ec4899",
              }}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
