"use client";

import Link from "next/link";
import GitHubButton from "./GithubButton";
import Block from "./ui/Block";
import Image from "next/image";

export default function Navbar() {
  return (
    <Block className="col-span-12 mb-8 bg-secondary/30 backdrop-blur-md leading-snug py-2 flex justify-between sticky top-2 z-50">
      <div className="flex text-3xl items-center gap-4">
        <Image
          className="size-8 lg:size-12"
          src="/logo.png"
          alt="OP Bento"
          width={36}
          height={36}
        />
        <p className="text-lg font-black md:text-xl lg:text-2xl hidden sm:block">
          OP Bento
        </p>
      </div>
      <div className="flex items-center gap-10">
        <Link
          href="/guide"
          className="hover:underline hover:text-primary duration-300 transition-all md:text-lg font-semibold"
        >
          Guide
        </Link>
        <Link
          href="/about"
          className="hover:underline hover:text-primary duration-300 transition-all md:text-lg font-semibold"
        >
          About
        </Link>
        <GitHubButton />
      </div>
    </Block>
  );
}
