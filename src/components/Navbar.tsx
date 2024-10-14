"use client";

import Image from "next/image";
import GitHubButton from "./GithubButton";
import Block from "./ui/Block";

export default function Navbar() {
  return (
    <Block className="col-span-12 text-3xl mb-8 bg-secondary/30 backdrop-blur-md leading-snug py-2 flex justify-between sticky top-2 z-50">
      <div className="flex items-center gap-4">
        <Image
          className="size-8 lg:size-12"
          src="/logo.png"
          alt=""
          width={30}
          height={30}
        />
        <p className="text-lg font-black md:text-xl lg:text-2xl">OP Bento</p>
      </div>
      <div className="flex items-center gap-8">
        <GitHubButton />
      </div>
    </Block>
  );
}
