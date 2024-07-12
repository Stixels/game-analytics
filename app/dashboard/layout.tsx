// app/dashboard/layout.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { logout } from "./actions";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SidebarLink = ({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 rounded-lg p-2 ${
        isActive ? "bg-secondary" : "hover:bg-secondary/50"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("Team A");
  const router = useRouter();

  const teams = ["Team A", "Team B", "Team C"]; // Example teams

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        toast.success("Logged out successfully");
        router.push("/");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleTeamChange = (team: string) => {
    setSelectedTeam(team);
    // Here you would typically fetch data for the selected team
    toast.success(`Switched to ${team}`);
  };

  const SidebarContent = () => (
    <>
      <Link
        href="/dashboard"
        className="mb-8 hidden text-2xl font-bold md:flex"
      >
        TeamTracker
      </Link>
      <nav className="flex-grow space-y-2">
        <SidebarLink href="/dashboard" icon={LayoutDashboard}>
          Dashboard
        </SidebarLink>
        <SidebarLink href="/dashboard/teams" icon={Users}>
          Teams
        </SidebarLink>
        <SidebarLink href="/dashboard/settings" icon={Settings}>
          Settings
        </SidebarLink>
      </nav>
    </>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Static sidebar for larger screens */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-border bg-card p-4 md:flex md:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed bottom-0 left-0 top-0 w-64 border-r border-border bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-2xl font-bold">TeamTracker</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-border bg-card p-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <span>{selectedTeam}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {teams.map((team) => (
                  <DropdownMenuItem
                    key={team}
                    onSelect={() => handleTeamChange(team)}
                  >
                    {team}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="/path-to-avatar.jpg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onSelect={() => router.push("/dashboard/settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
