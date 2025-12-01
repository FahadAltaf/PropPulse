"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Session, WeakPassword } from "@supabase/supabase-js";
import { AuthSignupData } from "@/modules/auth";
import {
  signIn as signInAction,
  signOut as signOutAction,
  signUp as signUpAction,
} from "@/modules/auth/services/auth-service";

import { usersService } from "@/modules/users";
import { User, UserRoles } from "@/types/types";
import { Settings, settingsService } from "@/modules/settings";
import Loader from "@/components/loader";
import { supabase } from "@/lib/supabase-auth-client";
import { LogOut, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkAuthentication } from "@/utils/check-authentication";

type AuthContextType = {
  user: User | null;
  userProfile: User | null;
  session: Session | null;
  loading: boolean;
  settings: Settings | null;
  signUp: (
    data: AuthSignupData
  ) => Promise<{ user: User | null; session: Session | null } | { user: User }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ user: User; session: Session; weakPassword?: WeakPassword }>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setUserProfile: (userProfile: any | null) => void;
  setSettings: (settings: Settings | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Settings | null>(null);

  // Define public routes that don't require authentication
  const PUBLIC_ROUTES = [
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/accept-invite",
    "/auth/callback",
    "/home", // Landing page
  ];

  // Define routes that authenticated users should be redirected from (e.g., login page)
  const AUTH_ROUTES = ["/auth/login", "/auth/signup"];

  // Function to get user data from Supabase and user_profile table
  const fetchUserData = async () => {
    try {
      const { user: userData, status } = await checkAuthentication();

      if (userData) {
        checkRouteAccess(window.location.pathname, userData as unknown as User);

        setUser(userData as unknown as User);

        // Fetch user profile_image data from user_profile table
        const userProfileData = await usersService.getUserById(
          userData?.id as string
        );
        if (userProfileData) {
          setUserProfile(userProfileData);
        }
      } else {
        setUser(null);
        setUserProfile(null);
        setSession(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
      setUserProfile(null);
      setSession(null);
      // signOut();
    }
    setLoading(false);
  };

  const fetchSettings = async () => {
    const settingsData = await settingsService.getSettingsById({
      type: UserRoles.ADMIN,
    });
    localStorage.setItem("UMS_PROJECT_SETTINGS", JSON.stringify(settingsData));
    if (settingsData) {
      setSettings(settingsData);
    } else {
      const getSettings = localStorage.getItem("UMS_PROJECT_SETTINGS");
      if (getSettings) {
        setSettings(JSON.parse(getSettings));
      } else {
        setSettings(null);
      }
    }
  };
  // Handle auth state and routing
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchSettings();
  }, []);

  const checkRouteAccess = (path: string, userData: User | null) => {
    const isPublicRoute = PUBLIC_ROUTES.some(
      (route) => path === route || path.startsWith(`${route}/`)
    );

    // Case 1: Unauthenticated user trying to access protected route
    if (!userData && !isPublicRoute) {
      // Redirect to login
      window.location.href = "/auth/login";
    }

    // Case 2: Authenticated user trying to access auth routes (login, signup)
    if (userData && AUTH_ROUTES.some((route) => path.startsWith(route))) {
      window.location.href = "/";
    }
  };

  const signUp = async (data: AuthSignupData) => {
    try {
      const result = await signUpAction(data);

      return result;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Call server action for sign in
      const result = await signInAction(email, password);

      // Refresh user data after successful sign in
      await fetchUserData();

      return result;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // Sign out on client side
      const client = supabase();
      await client.auth.signOut();

      // Also call server action to clear server-side session
      try {
        await signOutAction();
      } catch (serverError) {
        console.error("Server sign out error:", serverError);
      }

      setUser(null);
      setUserProfile(null);
      setSession(null);
      setSettings(null);
      window.location.href = "/auth/login";
    } catch (error) {
      setLoading(false);
      console.error("Sign out error:", error);
      throw error;
    }
  };

  // Show loading state or nothing while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (userProfile?.is_active === false) {
    return (
      <div className="h-[calc(100vh-100px)] flex justify-center items-center ">
        <div className="text-center mt-6 lg:w-[40%]">
          <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            Your account has been banned by the admin. You do not have
            permission to access this platform. Please contact your
            administrator if you believe this is an error.
          </p>
          <div className="flex justify-center w-full">
            <Button
              variant={"outline"}
              className="w-max mt-5"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const value = {
    user,
    userProfile,
    session,
    loading,
    settings,
    signUp,
    setUserProfile,
    signIn,
    signOut,
    setUser,
    setSettings,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext) as AuthContextType;
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
