// components/Header.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-2xl">Game Analytics</h1>
      <div>
        <Link href="/sign-in">
          <Button variant="secondary" className="mr-2">
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="default">Sign Up</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
