// app/dashboard/teams/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CreateTeamDialog from "./CreateTeamDialog";
import JoinTeamDialog from "./JoinTeamDialog";
import TeamCard from "./TeamCard";
import { fetchTeams } from "./actions";

interface Team {
  id: string;
  name: string;
  invite_code: string;
  is_admin: boolean;
  created_by: string;
}

const SkeletonTeamCard = () => (
  <div className="rounded-lg border p-4">
    <Skeleton className="mb-4 h-6 w-3/4" />
    <Skeleton className="mb-2 h-4 w-1/2" />
    <Skeleton className="mb-4 h-4 w-3/4" />
    <Skeleton className="h-8 w-1/2" />
  </div>
);

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const supabase = createClient();
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    async function getUserId() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUserId(user?.id ?? "");
    }
    getUserId();
  }, [supabase.auth]);

  const loadTeams = useCallback(async () => {
    setLoading(true);
    const result = await fetchTeams();
    if (result.success) {
      setTeams(result.teams);
    } else {
      toast.error(result.error || "Failed to fetch teams");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Teams</h1>

      <div className="flex space-x-4">
        <Button onClick={() => setCreateDialogOpen(true)}>Create Team</Button>
        <Button variant="outline" onClick={() => setJoinDialogOpen(true)}>
          Join Team
        </Button>
      </div>

      <CreateTeamDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onTeamCreated={loadTeams}
      />

      <JoinTeamDialog
        open={joinDialogOpen}
        onOpenChange={setJoinDialogOpen}
        onTeamJoined={loadTeams}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <SkeletonTeamCard key={index} />
            ))
          : teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onTeamDeleted={loadTeams}
                currentUserId={currentUserId}
              />
            ))}
      </div>

      {!loading && teams.length === 0 && (
        <p className="text-center text-muted-foreground">
          You haven&apos;t joined any teams yet. Create or join a team to get
          started!
        </p>
      )}
    </div>
  );
}
