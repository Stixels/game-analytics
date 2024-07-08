import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Crosshair, Users, Map } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">TeamTracker</h1>
          <div>
            <Button variant="ghost" className="mr-4" asChild>
              <Link href="/login?tab=login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/login?tab=signup">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Elevate Your Valorant Team&apos;s Performance
          </h2>
          <p className="text-xl mb-8">
            Gain powerful insights to optimize your team&apos;s strategy, player
            performance, and competitive edge
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/login?tab=signup">Get Started</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <BarChart className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Comprehensive Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Track team and individual player performance metrics, including
                ACS, K/D ratio, and economy rating.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Crosshair className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Agent Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Analyze agent-specific stats and compositions to optimize your
                team&apos;s strategy on each map.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Map className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Map Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Dive deep into map-specific performance data to identify
                strengths and areas for improvement.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>&copy; 2024 TeamTracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
