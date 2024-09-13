// app/dashboard/teams/JoinTeamDialog.tsx
import React from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { joinTeam } from "./actions";

const joinTeamSchema = z.object({
  inviteCode: z.string().length(8, "Invite code must be 8 characters"),
});

interface JoinTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTeamJoined: () => void;
}

export default function JoinTeamDialog({
  open,
  onOpenChange,
  onTeamJoined,
}: JoinTeamDialogProps) {
  const form = useForm<z.infer<typeof joinTeamSchema>>({
    resolver: zodResolver(joinTeamSchema),
    defaultValues: { inviteCode: "" },
  });

  async function onSubmit(values: z.infer<typeof joinTeamSchema>) {
    const result = await joinTeam(values);
    if (result.success) {
      toast.success("Joined team successfully");
      form.reset();
      onOpenChange(false);
      onTeamJoined();
    } else {
      toast.error(result.error || "Failed to join team");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join a Team</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
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
            <Button
              type="submit"
              className="mt-4"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  Joining...
                </>
              ) : (
                "Join Team"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
