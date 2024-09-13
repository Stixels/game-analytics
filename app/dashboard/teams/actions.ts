// app/dashboard/teams/actions.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createTeamSchema = z.object({
  name: z
    .string()
    .min(1, "Team name is required")
    .max(50, "Team name cannot exceed 50 characters"),
});

const joinTeamSchema = z.object({
  inviteCode: z.string().length(8, "Invite code must be 8 characters"),
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
  let invite_code;
  let isUnique = false;
  while (!isUnique) {
    invite_code = Math.random().toString(36).substring(2, 10).toUpperCase();
    const { data, error } = await supabase
      .from("teams")
      .select("id")
      .eq("invite_code", invite_code);
    isUnique = !data || data.length === 0;
  }

  // Use a transaction to ensure both operations succeed or fail together
  const { data, error } = await supabase.rpc("create_team_and_add_creator", {
    p_team_name: name,
    p_user_id: user.id,
    p_invite_code: invite_code,
  });

  if (error) {
    console.error("Error creating team:", error);
    return { error: "Failed to create team. Please try again." };
  }

  revalidatePath("/dashboard/teams");
  return { success: true, team: data };
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
  const { data: teams, error: teamError } = await supabase
    .from("teams")
    .select("id, name")
    .eq("invite_code", inviteCode);

  if (teamError) {
    console.error("Error querying teams:", teamError);
    return { error: "Failed to process invite code. Please try again." };
  }

  if (!teams || teams.length === 0) {
    return { error: "Invalid invite code. No team found." };
  }

  const team = teams[0];

  // Check if user is already a member
  const { data: existingMember, error: memberCheckError } = await supabase
    .from("team_members")
    .select()
    .eq("team_id", team.id)
    .eq("user_id", user.id)
    .single();

  if (memberCheckError && memberCheckError.code !== "PGRST116") {
    console.error("Error checking existing membership:", memberCheckError);
    return { error: "Failed to join team. Please try again." };
  }

  if (existingMember) {
    return { error: "You are already a member of this team" };
  }

  // Add user to team
  const { error: memberError } = await supabase
    .from("team_members")
    .insert({ team_id: team.id, user_id: user.id, role: "member" });

  if (memberError) {
    console.error("Error adding member to team:", memberError);
    return { error: "Failed to join team. Please try again." };
  }

  revalidatePath("/dashboard/teams");
  return { success: true, team: team.name };
}

export async function deleteTeam(teamId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated" };
  }

  // First, check if the user is the creator of the team
  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("created_by")
    .eq("id", teamId)
    .single();

  if (teamError) {
    console.error("Error fetching team:", teamError);
    return { error: "Failed to verify team ownership" };
  }

  if (team.created_by !== user.id) {
    return { error: "You don't have permission to delete this team" };
  }

  // Delete team members first (due to foreign key constraints)
  const { error: membersDeletionError } = await supabase
    .from("team_members")
    .delete()
    .eq("team_id", teamId);

  if (membersDeletionError) {
    console.error("Error deleting team members:", membersDeletionError);
    return { error: "Failed to delete team members" };
  }

  // Now delete the team
  const { error: teamDeletionError } = await supabase
    .from("teams")
    .delete()
    .eq("id", teamId);

  if (teamDeletionError) {
    console.error("Error deleting team:", teamDeletionError);
    return { error: "Failed to delete team" };
  }

  revalidatePath("/dashboard/teams");
  return { success: true };
}

export async function fetchTeams() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated" };
  }

  const { data, error } = await supabase
    .from("team_members")
    .select(
      `
      team_id,
      role,
      teams (
        id,
        name,
        invite_code,
        created_by
      )
    `,
    )
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching teams:", error);
    return { error: "Failed to fetch teams" };
  }

  const teams = data.map((item: any) => ({
    id: item.teams.id,
    name: item.teams.name,
    invite_code: item.teams.invite_code,
    is_admin: item.role === "admin",
    created_by: item.teams.created_by,
  }));

  return { success: true, teams };
}
