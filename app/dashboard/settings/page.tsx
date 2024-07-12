// app/dashboard/settings/page.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const profileFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  riotId: z.string().min(2, {
    message: "Riot name must be at least 2 characters.",
  }),
});

const emailFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const passwordFormSchema = z.object({
  newPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const SkeletonForm = () => (
  <div className="space-y-4">
    <Skeleton className="h-4 w-[100px]" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-4 w-[100px]" />
    <Skeleton className="h-10 w-full" />
  </div>
);

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const supabase = createClient();

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "",
      riotId: "",
    },
  });

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  useEffect(() => {
    async function loadUserProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        emailForm.setValue("email", user.email || "");
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, riot_id")
          .eq("id", user.id)
          .single();
        if (profile) {
          profileForm.setValue("fullName", profile.full_name || "");
          profileForm.setValue("riotId", profile.riot_id || "");
        }
      }
      setLoading(false);
    }
    loadUserProfile();
  }, [supabase, profileForm, emailForm]);

  const onProfileSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    setProfileLoading(true);
    const { error: updateError } = await supabase.from("profiles").upsert({
      id: user?.id,
      full_name: values.fullName,
      riot_id: values.riotId,
    });

    if (updateError) {
      toast.error("Failed to update profile: " + updateError.message);
    } else {
      toast.success("Profile updated successfully");
    }
    setProfileLoading(false);
  };

  const onEmailSubmit = async (values: z.infer<typeof emailFormSchema>) => {
    setEmailLoading(true);
    const { error } = await supabase.auth.updateUser({ email: values.email });

    if (error) {
      toast.error("Failed to update email: " + error.message);
    } else {
      toast.success(
        "Email update initiated. Please check your new email for confirmation.",
      );
    }
    setEmailLoading(false);
  };

  const onPasswordSubmit = async (
    values: z.infer<typeof passwordFormSchema>,
  ) => {
    setPasswordLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: values.newPassword,
    });

    if (error) {
      toast.error("Failed to update password");
    } else {
      toast.success("Password updated successfully");
      passwordForm.reset();
    }
    setPasswordLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Account Settings</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your account profile details here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SkeletonForm />
            ) : (
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={profileForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="riotId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Riot ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Riot ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={profileForm.handleSubmit(onProfileSubmit)}
              disabled={profileLoading || loading}
            >
              {profileLoading ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  Updating Profile...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Address</CardTitle>
            <CardDescription>
              Change your account email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SkeletonForm />
            ) : (
              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={emailForm.handleSubmit(onEmailSubmit)}
              disabled={emailLoading || loading}
            >
              {emailLoading ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  Updating Email...
                </>
              ) : (
                "Update Email"
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your account password.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SkeletonForm />
            ) : (
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter new password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={passwordForm.handleSubmit(onPasswordSubmit)}
              disabled={passwordLoading || loading}
            >
              {passwordLoading ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  Updating Password...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
