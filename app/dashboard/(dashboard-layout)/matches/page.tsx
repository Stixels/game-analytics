// app/dashboard/(dashboard-layout)/matches/page.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const MatchesPage = () => {
  // Mock data for matches
  const matches = [
    {
      id: 1,
      opponent: "Team X",
      date: "2024-07-15",
      result: "Win",
      score: "13-7",
    },
    {
      id: 2,
      opponent: "Squad Y",
      date: "2024-07-10",
      result: "Loss",
      score: "11-13",
    },
    {
      id: 3,
      opponent: "Crew Z",
      date: "2024-07-05",
      result: "Win",
      score: "13-9",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Matches</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Match
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <Card key={match.id}>
            <CardHeader>
              <CardTitle>vs {match.opponent}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {match.date}</p>
              <p>Result: {match.result}</p>
              <p>Score: {match.score}</p>
              <Button className="mt-4 w-full" variant="outline">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MatchesPage;
