"use client";

import fetchUserData from "@/actions/fetchUserData";
import GitHubStatsCard from "@/components/GithubStatCard";
import GitHubStreakCard from "@/components/GithubStreakCard";
import HomePage from "@/components/Home";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserStats } from "@/types";
import { useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [stats, setStats] = useState<UserStats>();

  const streakData = {
    totalContributions: 4046,
    currentStreak: 350,
    longestStreak: 350,
    startDate: '2023-11-01',
    endDate: '2023-10-15'
  }

  const handleSearch = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { userStats } = await fetchUserData(searchValue);
    setStats(userStats);

    console.log(userStats);
  };

  return (
    <>
      <HomePage />
      {/* <Input
        placeholder="Search for a user"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>

      <GitHubStatsCard userName={searchValue} stats={stats} /> */}

      <GitHubStreakCard streak={streakData} />
    </>
  );
}
