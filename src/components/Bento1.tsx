/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { Clipboard, Linkedin, TwitterIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import GitHubStatsCard from "./GithubStatCard";
import { StreakStats, UserStats } from "@/types";
import GitHubStreakCard from "./GithubStreakCard";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "300", "600", "700", "500"],
});

const BentoGrid = ({
  name,
  githubURL,
  twitterURL,
  linkedinURL,
  imageUrl,
  stats,
  showStats,
  streak,
}: {
  name: string;
  githubURL: string;
  twitterURL: string;
  linkedinURL: string;
  imageUrl: string;
  stats: UserStats | undefined;
  showStats: boolean;
  streak: StreakStats | undefined;
}) => {
  const [bentoLink, setBentoLink] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const baseUrl = window.location.origin;
      const mdLink = `[![Bento Grid](${baseUrl}/api/bento?n=${encodeURIComponent(
        name
      )}&i=${encodeURIComponent(imageUrl)}&g=${encodeURIComponent(
        githubURL
      )}&x=${encodeURIComponent(twitterURL)})](${baseUrl})`;
      setBentoLink(mdLink);
    }
  }, [name, githubURL, twitterURL, imageUrl]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bentoLink).then(() => {
      console.log("Copied to clipboard");
      alert("Copied");
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div
        className={cn(
          "p-4 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mt-32 mb-8 w-full mx-auto",
          space.className
        )}
      >
        <div className="bg-muted py-6 px-8 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 to col-span-1 row-span-1 min-h-32">
          <p className="text-white text-xl">Hey Im</p>
          <h2 className="text-4xl text-white font-bold mb-2 capitalize">
            {name || "Nigga"}
          </h2>
        </div>

        <div className="bg-muted h-80 overflow-hidden rounded-lg col-span-2 row-span-2 flex items-center justify-center">
          <img
            src={
              imageUrl ||
              "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={name}
            width={500}
            height={500}
            className="size-full object-cover"
          />
        </div>

        <a
          href={"https://x.com/" + twitterURL}
          className="bg-gradient-to-br from-black to-blue-500 p-4 relative rounded-lg overflow-hidden col-span-1 row-span-1 min-h-[150px]"
        >
          <TwitterIcon
            className="absolute glow -top-3 -left-4"
            size={100}
            color="#29BEF0"
            strokeWidth={1}
          />
          <p className="z-20 absolute bottom-6 text-center w-full">
            @{twitterURL}
          </p>
        </a>

        <div className="bg-muted relative overflow-hidden rounded-lg col-span-1 row-span-2">
          <img
            src="https://i.pinimg.com/736x/cf/95/4b/cf954b8923fbafc5cfc0c66344b6a6f9.jpg"
            alt=""
            className="absolute saturate-150 size-full object-cover inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b to-black/80 from-transparent"></div>
          <p className="z-20 absolute bottom-6 text-center w-full">
            <a
              href={"https://github.com/" + githubURL}
              className="text-white font-semibold hover:underline p-2 px-4 bg-pink-600 opacity-80 rounded-md backdrop-blur"
            >
              @{githubURL}
            </a>
          </p>
        </div>

        <a
          href={"https://www.linkedin.com/in/" + twitterURL}
          className="bg-gradient-to-tl from-black to-blue-600 p-4 relative rounded-lg overflow-hidden col-span-1 columns-3 row-span-1 min-h-[150px]"
        >
          <Linkedin
            className="absolute glow -bottom-1 -right-2"
            size={80}
            color="#56d2ff"
            strokeWidth={1}
          />
          <p className="text-center w-full">@{linkedinURL}</p>
        </a>

        <div className="bg-muted p-4 rounded-lg col-span-2 row-span-1">
          <p className="text-cyan-500 text-xs mb-2">Los Angeles</p>
          <p className="text-white text-xs">The Midnight</p>
          <div className="flex justify-between mt-2">
            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
          </div>
        </div>

        <div className="bg-muted p-4 bg-gradient-to-br from-orange-600 via-yellow-600 to-rose-500 rounded-lg col-span-1 row-span-1 flex flex-col items-center justify-center min-h-32">
          <h2 className="text-3xl text- font-bold">Made using OP Bento</h2>
        </div>

        {stats && showStats && (
          <div>
            <GitHubStatsCard stats={stats} userName={githubURL} />
            <div className="col-span-4">
              <GitHubStreakCard streak={streak} />
            </div>
          </div>
        )}
      </div>
      <div className="relative mt-4">
        <Input value={bentoLink} readOnly />
        <Button className="absolute top-0 right-0" onClick={copyToClipboard}>
          <Clipboard />
        </Button>
      </div>
    </div>
  );
};

export default BentoGrid;
