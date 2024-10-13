"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MapPinIcon,
  Twitter,
  Youtube,
} from "lucide-react";
import Block from "./ui/Block";
import Navbar from "./Navbar";
import SocialsBlock from "./SocialBlock";

export interface SkillType {
  name: string;
  color: string;
}

export interface ProjectType {
  title: string;
  description: string;
  imageUrl: string;
}

export default function HomePage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [email, setEmail] = useState("");
  const [portfolioURL, setPortfolioURL] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  console.log(showStats, showGraph);

  return (
    <div className="bg-background w-full">
      <div className="min-h-screen px-4 py-4 max-w-7xl mx-auto text-zinc-50 w-full">
        <Navbar />
        <motion.div
          initial="initial"
          animate="animate"
          transition={{
            staggerChildren: 0.05,
          }}
          className="grid max-w-7xl mx-auto grid-flow-dense grid-cols-12 gap-4 w-full"
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
            linkedinURL={linkedinURL}
            setLinkedinURL={setLinkedinURL}
          />
          {/* <AboutBlock />
          <LocationBlock />
          <EmailListBlock /> */}
        </motion.div>
      </div>
    </div>
  );
}

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6 relative">
    {/* A badge */}
    <h1
      className="mb-4 text-3xl sm:text-4xl font-bold"
      style={{ lineHeight: "3rem" }}
    >
      Make your{" "}
      <span className="text-primary bg-rose-200 rounded-lg px-3 py-1 font-extraboldbold">
        Github
      </span>{" "}
      Profile modern and trendy
    </h1>
    <p className="flex items-center gap-1 text-gray-300">
      Build your own bento grid, copy the HTML or Markdown code and paste it on
      to the top of your GitHub Profile readme to make your Github profile look
      cool.
    </p>
    <div className="flex items-start sm:items-center flex-col-reverse sm:flex-row sm:justify-between gap-2 my-3">
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
        {/* A badge */}
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
    </div>
  </Block>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      My passion is building cool stuff.{" "}
      <span className="text-zinc-400">
        I build primarily with React, Tailwind CSS, and Framer Motion. I love
        this stack so much that I even built a website about it. I&apos;ve made
        over a hundred videos on the subject across YouTube and TikTok.
      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <MapPinIcon size={18} className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">Cyberspace</p>
  </Block>
);

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg">Join my mailing list</p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      <button
        type="submit"
        className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      >
        <Mail size={18} /> Join the list
      </button>
    </form>
  </Block>
);

const Footer = () => {
  return (
    <footer className="mt-12">
      <p className="text-center text-zinc-400">
        Made with ❤️ by{" "}
        <a href="#" className="text-red-300 hover:underline">
          @tomisloading
        </a>
      </p>
    </footer>
  );
};
