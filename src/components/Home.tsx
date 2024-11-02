/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Block from "./ui/Block";
import Navbar from "./Navbar";
import SocialsBlock from "./SocialBlock";
import { Highlight } from "./ui/highlight";
import BentoGrid from "./Bento1";
import BioBlock from "./BioBlock";
import { Graph, StreakStats, UserStats } from "@/types";

export interface ProjectType {
  title: string;
  description: string;
  imageUrl: string;
}

export default function HomePage() {
  const [name, setName] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [portfolioURL, setPortfolioURL] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  const [stats, setStats] = useState<UserStats | undefined>(undefined);
  const [streak, setStreak] = useState<StreakStats | undefined>(undefined);
  const [graph, setGraph] = useState<Graph[] | undefined>(undefined);

  return (
    <div className="w-full">
      <div className="min-h-svh p-4 max-w-7xl mx-auto w-full">
        <Navbar />
        <motion.div
          initial="initial"
          animate="animate"
          transition={{
            staggerChildren: 0.08,
          }}
          className="grid max-w-7x mx-auto grid-flow-dense grid-cols-12 gap-4 w-full"
        >
          <HeaderBlock />
          <SocialsBlock
            setName={setName}
            setGithubURL={setGithubURL}
            setShowStats={setShowStats}
            setShowGraph={setShowGraph}
            setTwitterURL={setTwitterURL}
            setImageUrl={setImageUrl}
            setStats={setStats}
            setStreak={setStreak}
            showStats={showStats}
            showGraph={showGraph}
            setGraph={setGraph}
          />

          <BioBlock
            setLinkedinURL={setLinkedinURL}
            setPortfolioURL={setPortfolioURL}
          />
        </motion.div>
        <BentoGrid
          name={name}
          githubURL={githubURL}
          twitterURL={twitterURL}
          linkedinURL={linkedinURL}
          imageUrl={imageUrl}
          stats={stats}
          showStats={showStats}
          streak={streak}
          showGraph={showGraph}
          graph={graph}
          portfolioUrl={portfolioURL}
        />
      </div>
    </div>
  );
}

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6 relative">
    <h1 className="mb-4 text-3xl sm:text-4xl font-bold sm:leading-normal">
      Make your Github Profile <Highlight>modern and trendy !</Highlight>
    </h1>
    <p className="flex items-center mt-10 gap-1 text-muted-foreground">
      Build your own bento grid, copy the HTML or Markdown code and paste it on
      to the top of your GitHub Profile readme to make your Github profile look
      cool. ✨
    </p>
  </Block>
);

export const Footer = () => {
  return (
    <footer className="mt-12 mb-4">
      <p className="text-center text-muted-foreground">
        Made with ❤️ by{" "}
        <a href="#" className="text-red-300 hover:underline">
          @RealDevs
        </a>
      </p>
    </footer>
  );
};
