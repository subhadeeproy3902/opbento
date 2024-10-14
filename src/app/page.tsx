"use client";

import fetchUserData from "@/actions/fetchUserData";
import HomePage from "@/components/Home";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { userStats } = await fetchUserData(searchValue);

    console.log(userStats);
  };

  return (
    <>
      <HomePage />
      <Input
        placeholder="Search for a user"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </>
  );
}
