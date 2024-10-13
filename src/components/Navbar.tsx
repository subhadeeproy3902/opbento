"use client";

import GitHubButton from "./GithubButton";
import { ThemeToggle } from "./ThemeToggle";
import Block from "./ui/Block";

export default function Navbar() {
  return (
    <Block className="col-span-12 text-3xl mb-8 leading-snug py-2 flex justify-between">
      <div className="flex items-center gap-4">
        <img className="h-8 w-8 lg:h-12 lg:w-12" src="/logo.png" alt="" />
        <p className="text-lg font-black md:text-xl lg:text-2xl">OP Bento</p>
      </div>
      <div className="flex items-center gap-8">
        <GitHubButton />
      </div>
    </Block>
  );
}
