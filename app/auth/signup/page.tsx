"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Logo from "@/components/logo";
import { Settings } from "@/types/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  const id = useId();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { settings, signUp } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [userExists, setUserExists] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setUserExists(false);

    try {
      // Prepare signup data in the format expected by AuthContext
      const signupData = {
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: formData.firstName + " " + formData.lastName,
      };

      const result = await signUp(signupData);

      router.push("/auth/verify?email=" + formData.email);
    } catch (error: any) {
      // Handle specific error cases
      if (error.message?.includes("User already registered")) {
        setUserExists(true);
        toast.error(
          "An account with this email already exists. Please login instead."
        );
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : "An error occurred during registration"
        );
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6 sm:space-y-8 bg-sidebar hover:bg-sidebar-hover p-4 sm:p-6 lg:p-8 rounded-lg shadow">
          <div className="flex flex-col items-center gap-2">
            <Logo settings={settings as Settings} />

            <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Create an account
            </h2>
            <p className="mt-2 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
              We just need a few details to get you started.
            </p>
          </div>

          <form
            className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="text-red-600 dark:text-red-400 text-xs sm:text-sm text-center px-2">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor={`${id}-firstName`}
                  className="dark:text-gray-200 text-sm sm:text-base"
                >
                  First Name
                </Label>
                <Input
                  id={`${id}-firstName`}
                  name="firstName"
                  placeholder="John"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600 h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
              <div>
                <Label
                  htmlFor={`${id}-lastName`}
                  className="dark:text-gray-200 text-sm sm:text-base"
                >
                  Last Name
                </Label>
                <Input
                  id={`${id}-lastName`}
                  name="lastName"
                  placeholder="Doe"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600 h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
              <div>
                <Label
                  htmlFor={`${id}-email`}
                  className="dark:text-gray-200 text-sm sm:text-base"
                >
                  Email
                </Label>
                <Input
                  id={`${id}-email`}
                  name="email"
                  placeholder="hi@yourcompany.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600 h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
              <div>
                <Label
                  htmlFor={`${id}-password`}
                  className="dark:text-gray-200 text-sm sm:text-base"
                >
                  Password
                </Label>
                <Input
                  id={`${id}-password`}
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600 h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-white p-2 sm:p-2.5 rounded-md cursor-pointer hover:shadow-sm hover:opacity-90 text-sm sm:text-base h-10 sm:h-11"
              disabled={isLoading}
              style={{
                backgroundColor: settings?.primary_color || "#ec4899",
              }}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </Button>

            <div className="space-y-2 text-center">
              <p className="text-muted-foreground text-xs dark:text-gray-400 px-2">
                By signing up you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-primary underline hover:no-underline cursor-pointer"
                >
                  Terms
                </Link>
                .
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline cursor-pointer"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
