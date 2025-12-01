"use server";

import { createClient } from "@/lib/supabase-server-client";
import { cookies } from "next/headers";

export async function checkAuthentication() {
  try {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { data } = await supabase.auth.getUser();
    const { user }: any = data;
    return { user: user, status: true, session: data };
  } catch (error: any) {
    console.log(error);
    return { user: "", status: false, session: "" };
  }
}
