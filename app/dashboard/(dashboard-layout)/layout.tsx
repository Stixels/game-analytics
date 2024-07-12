// app/dashboard/(dashboard-layout)/layout.tsx
"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, List, User } from "lucide-react";

const DashboardSharedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentTab = () => {
    if (pathname.includes("/matches")) return "matches";
    if (pathname.includes("/players")) return "players";
    return "dashboard";
  };

  return (
    <div className="space-y-6">
      <Tabs value={getCurrentTab()}>
        <TabsList>
          <TabsTrigger
            value="dashboard"
            onClick={() => router.push("/dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="matches"
            onClick={() => router.push("/dashboard/matches")}
          >
            <List className="mr-2 h-4 w-4" />
            Matches
          </TabsTrigger>
          <TabsTrigger
            value="players"
            onClick={() => router.push("/dashboard/players")}
          >
            <User className="mr-2 h-4 w-4" />
            Players
          </TabsTrigger>
        </TabsList>

        <TabsContent value={getCurrentTab()} className="mt-6">
          {children}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSharedLayout;
