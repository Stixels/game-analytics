// app/dashboard/teams/CreateTeamDialog.tsx
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
import { createTeam } from "./actions";

const createTeamSchema = z.object({
  name: z
    .string()
    .min(1, "Team name is required")
    .max(50, "Team name cannot exceed 50 characters"),
});

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTeamCreated: () => void;
}

export default function CreateTeamDialog({
  open,
  onOpenChange,
  onTeamCreated,
}: CreateTeamDialogProps) {
  const form = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: { name: "" },
  });

  async function onSubmit(values: z.infer<typeof createTeamSchema>) {
    const result = await createTeam(values);
    if (result.success) {
      toast.success("Team created successfully");
      form.reset();
      onOpenChange(false);
      onTeamCreated();
    } else {
      toast.error(result.error || "Failed to create team");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Team</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
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
            <Button
              type="submit"
              className="mt-4"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  Creating...
                </>
              ) : (
                "Create Team"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
