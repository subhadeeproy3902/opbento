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
  return (
    <>
      <HomePage />
    </>
  );
}
