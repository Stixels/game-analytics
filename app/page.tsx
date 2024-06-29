// app/page.tsx
import React from "react";
import Header from "../components/Header";

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-xl">Welcome to the Game Analytics Dashboard</h2>
        <p className="mt-2">
          Analyze and improve your game performance with our advanced analytics
          tools.
        </p>
      </main>
    </div>
  );
};

export default Home;
