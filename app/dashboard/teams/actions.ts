// app/dashboard/teams/actions.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createTeamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
});

const joinTeamSchema = z.object({
  inviteCode: z.string().min(1, "Invite code is required"),
});

export async function createTeam(formData: z.infer<typeof createTeamSchema>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated" };
  }

  const { name } = createTeamSchema.parse(formData);

  // Generate a unique invite code
  const invite_code = Math.random().toString(36).substring(2, 10).toUpperCase();

  // Create the team
  const { data: team, error } = await supabase
    .from("teams")
    .insert({ name, created_by: user.id, invite_code })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Add the creator as an admin member
  const { error: memberError } = await supabase
    .from("team_members")
    .insert({ team_id: team.id, user_id: user.id, role: "admin" });

  if (memberError) {
    return { error: memberError.message };
  }

  revalidatePath("/dashboard/teams");
  return { success: true, team };
}

export async function joinTeam(formData: z.infer<typeof joinTeamSchema>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated" };
  }

  const { inviteCode } = joinTeamSchema.parse(formData);

  // Find the team with the given invite code
  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("id")
    .eq("invite_code", inviteCode)
    .single();

  if (teamError || !team) {
    return { error: "Invalid invite code" };
  }

  // Check if user is already a member
  const { data: existingMember } = await supabase
    .from("team_members")
    .select()
    .eq("team_id", team.id)
    .eq("user_id", user.id)
    .single();

  if (existingMember) {
    return { error: "You are already a member of this team" };
  }

  // Add user to team
  const { error: memberError } = await supabase
    .from("team_members")
    .insert({ team_id: team.id, user_id: user.id, role: "member" });

  if (memberError) {
    return { error: memberError.message };
  }

  revalidatePath("/dashboard/teams");
  return { success: true };
}
