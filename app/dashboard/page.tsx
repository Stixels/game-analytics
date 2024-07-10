// app/dashboard/page.tsx
import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardLandingPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Valorant Team Performance Overview</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">68%</p>
            <p className="text-sm text-muted-foreground">
              +5% from last tournament
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Combat Score (ACS)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">265</p>
            <p className="text-sm text-muted-foreground">+15 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>First Blood Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">32%</p>
            <p className="text-sm text-muted-foreground">
              Top 10% in the league
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recent Highlights</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            JettMaster99 achieved a 35/5/8 KDA in the last match against Team
            Phantom
          </li>
          <li>Team&apos;s Spike plant success rate improved by 20% on Haven</li>
          <li>
            New Viper lineup on Icebox resulted in 3 round wins in overtime
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Quick Actions</h2>
        <div className="flex space-x-4">
          <Button asChild>
            <Link href="/dashboard/performance">View Detailed Stats</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/agents">Agent Composition Analysis</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLandingPage;
