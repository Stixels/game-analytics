// app/dashboard/teams/TeamCard.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { deleteTeam } from "./actions";

interface TeamCardProps {
  team: {
    id: string;
    name: string;
    invite_code: string;
    is_admin: boolean;
    created_by: string;
  };
  onTeamDeleted: () => void;
  currentUserId: string;
}

export default function TeamCard({
  team,
  onTeamDeleted,
  currentUserId,
}: TeamCardProps) {
  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText(team.invite_code);
    toast.success("Invite code copied to clipboard");
  };

  const handleDeleteTeam = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this team? This action cannot be undone.",
      )
    ) {
      const result = await deleteTeam(team.id);
      if (result.success) {
        toast.success("Team deleted successfully");
        onTeamDeleted();
      } else {
        toast.error(result.error || "Failed to delete team");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{team.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {team.is_admin && (
          <div>
            <p className="font-bold">Invite Code:</p>
            <p className="font-mono">{team.invite_code}</p>
            <Button onClick={handleCopyInviteCode} className="mt-2" size="sm">
              Copy Invite Code
            </Button>
          </div>
        )}
        <div className="mt-4 flex space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              // TODO: Implement team details view
              toast.info("Team details view not implemented yet");
            }}
          >
            View Details
          </Button>
          {team.created_by === currentUserId && (
            <Button variant="destructive" onClick={handleDeleteTeam}>
              Delete Team
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
