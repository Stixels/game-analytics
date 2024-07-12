// app/dashboard/(dashboard-layout)/page.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Team Performance Overview</h1>
        <Button variant="outline">Refresh Data</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">68%</p>
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
            <p className="text-2xl font-bold">265</p>
            <p className="text-sm text-muted-foreground">+15 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>First Blood Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">32%</p>
            <p className="text-sm text-muted-foreground">
              Top 10% in the league
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              JettMaster99 achieved a 35/5/8 KDA in the last match against Team
              Phantom
            </li>
            <li>
              Team&apos;s Spike plant success rate improved by 20% on Haven
            </li>
            <li>
              New Viper lineup on Icebox resulted in 3 round wins in overtime
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button>View Detailed Stats</Button>
        <Button variant="outline">Agent Composition Analysis</Button>
      </div>
    </div>
  );
};

export default DashboardPage;
