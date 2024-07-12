// app/dashboard/teams/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { createTeam, joinTeam } from "./actions";

const createTeamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
});

const joinTeamSchema = z.object({
  inviteCode: z.string().min(1, "Invite code is required"),
});

interface Team {
  id: string;
  name: string;
  invite_code: string;
  is_admin: boolean;
}

const SkeletonTeamCard = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="mb-2 h-4 w-1/2" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="mt-2 h-8 w-1/2" />
    </CardContent>
  </Card>
);

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const createTeamForm = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: { name: "" },
  });

  const joinTeamForm = useForm<z.infer<typeof joinTeamSchema>>({
    resolver: zodResolver(joinTeamSchema),
    defaultValues: { inviteCode: "" },
  });

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("team_members")
        .select(
          `
          team_id,
          role,
          teams (
            id,
            name,
            invite_code
          )
        `,
        )
        .eq("user_id", user.id);

      if (error) {
        toast.error("Failed to fetch teams: " + error.message);
      } else if (data) {
        const formattedTeams: Team[] = data.map((item: any) => ({
          id: item.teams.id,
          name: item.teams.name,
          invite_code: item.teams.invite_code,
          is_admin: item.role === "admin",
        }));
        setTeams(formattedTeams);
      }
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  async function onCreateTeamSubmit(values: z.infer<typeof createTeamSchema>) {
    const result = await createTeam(values);
    if (result.success) {
      toast.success("Team created successfully");
      createTeamForm.reset();
      fetchTeams();
    } else {
      toast.error(result.error);
    }
  }

  async function onJoinTeamSubmit(values: z.infer<typeof joinTeamSchema>) {
    const result = await joinTeam(values);
    if (result.success) {
      toast.success("Joined team successfully");
      joinTeamForm.reset();
      fetchTeams();
    } else {
      toast.error(result.error);
    }
  }

  const handleCopyInviteCode = (inviteCode: string) => {
    navigator.clipboard.writeText(inviteCode);
    toast.success("Invite code copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Teams</h1>

      <div className="flex space-x-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Team</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Team</DialogTitle>
            </DialogHeader>
            <Form {...createTeamForm}>
              <form onSubmit={createTeamForm.handleSubmit(onCreateTeamSubmit)}>
                <FormField
                  control={createTeamForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-4">
                  Create Team
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Join Team</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join a Team</DialogTitle>
            </DialogHeader>
            <Form {...joinTeamForm}>
              <form onSubmit={joinTeamForm.handleSubmit(onJoinTeamSubmit)}>
                <FormField
                  control={joinTeamForm.control}
                  name="inviteCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invite Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-4">
                  Join Team
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <SkeletonTeamCard key={index} />
            ))
          : teams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <CardTitle>{team.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {team.is_admin && (
                    <div>
                      <p className="font-bold">Invite Code:</p>
                      <p>{team.invite_code}</p>
                      <Button
                        onClick={() => handleCopyInviteCode(team.invite_code)}
                        className="mt-2"
                      >
                        Copy Invite Code
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
