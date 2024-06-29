// app/sign-up/page.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const SignUp: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="p-8 max-w-md w-full">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <Input placeholder="Name" type="text" required />
          </div>
          <div className="mb-4">
            <Input placeholder="Email" type="email" required />
          </div>
          <div className="mb-4">
            <Input placeholder="Password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default SignUp;
