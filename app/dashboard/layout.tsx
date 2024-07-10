// app/dashboard/layout.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Crosshair,
  Map,
  Award,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { logout } from "./actions";
import { toast } from "sonner";

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
      className={`flex items-center space-x-2 p-2 rounded-lg ${
        isActive ? "bg-secondary" : "hover:bg-secondary/50"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </Link>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

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

  const SidebarContent = () => (
    <>
      <Link
        href="/dashboard"
        className="text-2xl font-bold mb-8 hidden md:flex"
      >
        TeamTracker
      </Link>
      <nav className="space-y-2 flex-grow">
        <SidebarLink href="/dashboard" icon={LayoutDashboard}>
          Dashboard
        </SidebarLink>
        <SidebarLink href="/dashboard/agents" icon={Users}>
          Agents
        </SidebarLink>
        <SidebarLink href="/dashboard/performance" icon={Crosshair}>
          Performance
        </SidebarLink>
        <SidebarLink href="/dashboard/maps" icon={Map}>
          Map Stats
        </SidebarLink>
        <SidebarLink href="/dashboard/tournaments" icon={Award}>
          Tournaments
        </SidebarLink>
        <SidebarLink href="/dashboard/settings" icon={Settings}>
          Settings
        </SidebarLink>
      </nav>
      <Button variant="outline" className="w-full" onClick={handleLogout}>
        <LogOut className="w-4 h-4 mr-2" />
        Log Out
      </Button>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex flex-col w-64 bg-card text-card-foreground p-4 border-r border-border">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-64 bg-card text-card-foreground p-4 border-r border-border overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">TeamTracker</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-grow flex flex-col">
        <header className="bg-card text-card-foreground p-4 md:hidden border-b border-border">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="text-2xl font-bold">
              TeamTracker
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </header>
        <main className="flex-grow p-4 md:p-8">{children}</main>
        <footer className="bg-card text-card-foreground p-4 text-center border-t border-border">
          &copy; 2024 TeamTracker. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
