/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPinIcon } from "lucide-react";
import Block from "./ui/Block";
import Navbar from "./Navbar";
import SocialsBlock from "./SocialBlock";
import { Highlight } from "./ui/highlight";
import BentoGrid from "./Bento1";
import BioBlock from "./BioBlock";
import { StreakStats, UserStats } from "@/types";
import GitHubStatsCard from "./GithubStatCard";

export interface ProjectType {
  title: string;
  description: string;
  imageUrl: string;
}

export default function HomePage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [email, setEmail] = useState("");
  const [portfolioURL, setPortfolioURL] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);

  const [stats, setStats] = useState<UserStats | undefined>(undefined);
  const [streak, setStreak] = useState<StreakStats | undefined>(undefined);

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
            name={name}
            setName={setName}
            githubURL={githubURL}
            setGithubURL={setGithubURL}
            setShowStats={setShowStats}
            setShowGraph={setShowGraph}
            twitterURL={twitterURL}
            setTwitterURL={setTwitterURL}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            setStats={setStats}
            setStreak={setStreak}
          />

          <BioBlock
            linkedinURL={linkedinURL}
            setLinkedinURL={setLinkedinURL}
            portfolioURL={portfolioURL}
            setPortfolioURL={setPortfolioURL}
            setBio={setBio}
            setJobRole={setJobRole}
            setExperience={setExperience}
            setSkills={setSkills}
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
        />
      </div>
    </div>
  );
}

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6 relative">
    {/* A badge */}
    <h1 className="mb-4 text-3xl sm:text-4xl font-bold sm:leading-normal">
      Make your Github Profile <Highlight>modern and trendy !</Highlight>
    </h1>
    <p className="flex items-center mt-10 gap-1 text-muted-foreground">
      Build your own bento grid, copy the HTML or Markdown code and paste it on
      to the top of your GitHub Profile readme to make your Github profile look
      cool. ✨
    </p>
    {/* <div className="flex items-start sm:items-center flex-col-reverse sm:flex-row sm:justify-between gap-2 my-3">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-800">
          <img
            src="https://avatars.githubusercontent.com/u/111780029?v=4"
            alt="Tom"
            className="w-full h-full rounded-full"
          />
        </div>
        <div>
          <p className="text-lg font-semibold">Subhadeep Roy</p>
          <p className="text-gray-400">Creator of OP Bento</p>
        </div>
      </div>
      <div className="w-fit h-9 rounded-3xl border-2 px-4 border-orange-400 text-gray-700 text-center bg-rose-100 inline-flex justify-center items-center font-semibold">
       
        <span className="text-sm font-bold text-rose-400">Product </span>
        <span className="text-sm font-semibold ml-1"> Of the Day </span>
        <span className="text-xl font-bold">🚀</span>
      </div>
    </div>

    <div className="mt-3 w-full sm:mt-0 justify-between flex items-center gap-3 ml-auto">
      <div className="bg-lime-200 rounded-lg px-3 py-1">
        <a
          href="http://mvp-subha.me/"
          target="_blank"
          rel="noreferrer"
          className="text-base text-lime-600 font-bold text-nowrap"
        >
          mvp-subha.me
        </a>
      </div>

      <div className="w-full flex items-center gap-3 justify-end">
        <a
          href="https://github.com/subhadeeproy3902"
          target="_blank"
          rel="noreferrer"
          className="text-gray-300 hover:text-gray-200"
        >
          <img
            src="https://img.icons8.com/?size=100&id=LoL4bFzqmAa0&format=png&color=000000"
            alt="Tom"
            className="w-9 h-9"
          />
        </a>

        <a
          href="https://www.linkedin.com/in/subhadeep3902/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-300 hover:text-gray-200"
        >
          <img
            src="https://img.icons8.com/?size=100&id=MR3dZdlA53te&format=png&color=000000"
            alt="Tom"
            className="w-10 h-10"
          />
        </a>

        <a
          href="https://x.com/mvp_Subha"
          target="_blank"
          rel="noreferrer"
          className="text-gray-300 hover:text-gray-200"
        >
          <img
            src="https://img.icons8.com/?size=100&id=yoQabS8l0qpr&format=png&color=000000"
            alt="Tom"
            className="w-10 h-10"
          />
        </a>

        <a
          href="https://www.instagram.com/mvp-subha/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-300 hover:text-gray-200"
        >
          <img
            src="https://img.icons8.com/?size=100&id=nj0Uj45LGUYh&format=png&color=000000"
            alt="Tom"
            className="w-10 h-10"
          />
        </a>
      </div>
    </div> */}
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
