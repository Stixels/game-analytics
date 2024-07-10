// actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function login(formData: z.infer<typeof loginSchema>) {
  const supabase = createClient();

  const { email, password } = loginSchema.parse(formData);

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function signup(formData: z.infer<typeof signupSchema>) {
  const supabase = createClient();

  const { email, password } = signupSchema.parse(formData);

  const { data: signUpData, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (signUpData.user) {
    // Create a profile entry for the new user
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({ id: signUpData.user.id });

    if (profileError) {
      console.error("Error creating profile:", profileError);
      return { error: "Failed to create profile: " + profileError.message };
    }
  }

  revalidatePath("/", "layout");
  return { success: true };
}
