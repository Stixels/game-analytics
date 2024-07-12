// app/dashboard/(dashboard-layout)/players/page.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const PlayersPage = () => {
  // Mock data for players
  const players = [
    {
      id: 1,
      name: "Alex",
      role: "Duelist",
      rank: "Immortal",
      mainAgent: "Jett",
    },
    {
      id: 2,
      name: "Sam",
      role: "Controller",
      rank: "Diamond",
      mainAgent: "Omen",
    },
    {
      id: 3,
      name: "Jordan",
      role: "Sentinel",
      rank: "Platinum",
      mainAgent: "Cypher",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Players</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Player
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {players.map((player) => (
          <Card key={player.id}>
            <CardHeader>
              <CardTitle>{player.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Role: {player.role}</p>
              <p>Rank: {player.rank}</p>
              <p>Main Agent: {player.mainAgent}</p>
              <Button className="mt-4 w-full" variant="outline">
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlayersPage;
