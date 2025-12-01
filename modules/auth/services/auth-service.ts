"use server";

import { emailService } from "@/lib/email-service";
import { supabase, supabaseAdmin } from "@/lib/supabase-auth-client";
import { createClient } from "@/lib/supabase-server-client";
import { rolesService } from "@/modules/roles";
import { usersService } from "@/modules/users";
import { cookies } from "next/headers";

export interface AuthSignupData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role_id?: string;
}

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function signUp({ email, password, firstName, lastName, role_id = "" }: AuthSignupData) {

    
    // First check if user exists with the given email
    const existingUser = await usersService.getUserByEmail({
    
        email: {
          eq: email
        }
      
    });

    
    if (existingUser) {
      throw new Error("User already registered with this email");
    }
    
    // Create the user in Supabase Auth if not exists
    const { data, error } = await supabase().auth.signUp({ 
      email, 
      password, 
      options: { data: { first_name: firstName, last_name: lastName } } 
    });
    if (error) throw error;

    if (data?.user) {
      try {
        // Get the default user role using GraphQL
        const roleId = await rolesService.getRoleByName();
        const payload = {
          id: data?.user?.id,
          email: data?.user?.email, 
          role_id: role_id || roleId,
          first_name: firstName || null,
          last_name: lastName || null,
          full_name: firstName + " " + lastName || null,
          is_active: true,
        }
        // Insert the user into the users table using GraphQL
        await usersService.insertUser(payload)
      } catch (profileError) {
        console.error('Error in profile_image creation:', profileError);
        throw profileError;
      }
    }

    return data;
}

export async function signIn(email: string, password: string) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;

    return data;
}

export async function signOut() {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { error } = await supabase.auth.signOut();
   
    if (error) throw error;
}

export async function sendInvites(emails: string[]) {
    for (const email of emails) {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: false,
      });
      if (error) throw error;

      emailService.sendInviteEmail(email, `${process.env.NEXT_PUBLIC_APP_URL}/auth/accept-invite/${data?.user?.id}`)
      if (data?.user) {
        // Wait a moment for the auth user to be fully created before inserting into users table
        await delay(2000);
        try {
          // Get the default user role using GraphQL
          const roleId = await rolesService.getRoleByName();
          const payload = {
            id: data?.user?.id,
            email: data?.user?.email,
            role_id: roleId,
            first_name: null,
            last_name: null,
            is_active: true,
          }
          // Insert the user into the users table using GraphQL
          await usersService.insertUser(payload)
        } catch (profileError) {
          console.error('Error in profile_image creation:', profileError);
        }
      }
      return data;
    }
}

export async function resendVerificationEmail(email: string) {
    const { data, error } = await supabaseAdmin.auth.resend({
      type: "signup",
      email: email,
    });

    if (error) throw error;
    return data;
}

export async function acceptInvite(token: string, password: string) {
    try {
      // Exchange the token for a session
      const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.updateUserById(token, {
        password: password,
        email_confirm:  true
      });
      if (sessionError) {
        throw new Error('Invalid or expired invite token');
      }

      if (!sessionData?.user) {
        throw new Error('No user found for this token');
      }
      return sessionData;
    } catch (error) {
      console.error('Error in acceptInvite:', error);
      throw error;
    }
}

export async function deleteUser(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    await signOut();
    return response.json();
}

export async function onAuthStateChange(callback: (event: any, session: any) => void) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    return supabase.auth.onAuthStateChange(callback);
}

export async function signInWithOtp(email: string) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false,
      },
    });

    if (error) throw error;
    return { success: true };
}

export async function verifyOtp(email: string, token: string) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { data, error } = await supabase.auth.verifyOtp({
      email: email,
      token: token,
      type: "email",
    });

    if (error) throw error;
    return data;
}

export async function signInWithOAuth(provider: "google" | "apple" | "facebook", redirectTo: string) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectTo,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) throw error;
    return data;
}

export async function resetPasswordForEmail(email: string, redirectTo: string) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo,
    });

    if (error) throw error;
    return { success: true };
}

export async function updatePassword(password: string) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) throw error;
    return { success: true };
}

export async function verifyRecoveryOtp(tokenHash: string) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "recovery",
    });

    if (error) throw error;
    return data;
}

export async function setSession(accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) throw error;
    return data;
} 