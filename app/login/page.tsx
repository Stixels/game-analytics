"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { login, signup } from "./actions";

function SubmitButton() {
  return (
    <Button type="submit" className="w-full">
      Submit
    </Button>
  );
}

const AuthPages = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("login");
  const [loginState, loginAction] = useFormState(login, {
    error: null as string | null,
  });
  const [signupState, signupAction] = useFormState(signup, {
    error: null as string | null,
  });

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "login" || tab === "signup") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (loginState.error) {
      toast("Login Error", {
        description: loginState.error,
      });
    }
  }, [loginState.error]);

  useEffect(() => {
    if (signupState.error) {
      toast("Signup Error", {
        description: signupState.error,
      });
    }
  }, [signupState.error]);

  const redirectedFrom = searchParams.get("redirectedFrom") || "/dashboard";

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center bg-background">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <form action={loginAction}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <input
                  type="hidden"
                  name="redirectedFrom"
                  value={redirectedFrom}
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create an account to get started.
              </CardDescription>
            </CardHeader>
            <form action={signupAction}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthPages;
