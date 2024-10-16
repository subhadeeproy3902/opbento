import React from "react";
import { Star, Activity, GitPullRequest, Users, GitBranch } from "lucide-react";
import { UserStats } from "@/types";
import Image from "next/image";

const GitHubStatsCard = ({
  userName,
  stats,
}: {
  userName: string;
  stats: UserStats;
}) => {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-4 auto-rows-fr rounded-xl overflow-hidden size-full">
      <div className="bg-gradient-to-br from-amber-500/40 via-amber-500/10 to-transparent rounded-xl p-4 flex flex-col justify-between col-span-2 relative row-span-2">
        <div className="flex absolute top-2 px-3 left-0 items-center justify-between w-full opacity-70">
          <Star size={40} fill="gold" color="gold" />
          <Star size={40} fill="gold" color="gold" />
          <Star size={40} fill="gold" color="gold" />
          <Star size={40} fill="gold" color="gold" />
          <Star size={40} fill="gold" color="gold" />
        </div>
        <h3 className="text-2xl mt-16 text-end text-muted-foreground font-medium">
          Total Stars
        </h3>
        <div className="text-end text-yellow-400 text-7xl font-bold">
          {stats["Star Earned"]}
        </div>
      </div>

      <div className="bg-gradient-to-b from-pink-900/20 to-neutral-900/50 rounded-xl relative p-4 flex flex-col justify-between col-span-1 row-span-1">
        <GitPullRequest className="text-pink-400 absolute top-2" size={20} />
        <span className="text-gray-300 text-sm pt-4 font-medium">PRs</span>

        <div className="text-pink-400 text-3xl font-bold mt-2">
          {stats["Pull Requests"]}
        </div>
      </div>
      <div className="bg-gradient-to-tl from-rose-950/20 to-stone-900/50 relative rounded-xl p-4 flex flex-col justify-between col-span-1 row-span-1">
        <Users className="text-red-500 absolute top-2" size={20} />
        <span className="text-gray-300 text-sm pt-4 font-medium">
          Followers
        </span>

        <div className="text-red-500 text-4xl font-bold mt-2">
          {stats.Followers}
        </div>
      </div>
      <div className="bg-gradient-to-t from-black to-slate-800/50 overflow-hidden relative rounded-xl p-4 flex flex-col justify-between col-span-2 row-span-2">
        <Image
          src={"/surf.svg"}
          alt=""
          width={450}
          height={400}
          className="absolute inset-0 object-cover rotate-180"
        />
        <div className="flex items-center w-full">
          <Activity className="text-green-400" size={45} />
          <span className="text-muted-foreground w-full text-end text-2xl font-medium">
            Commits
          </span>
        </div>
        <div className="text-green-400 text-6xl text-end font-bold ">
          {stats.Commits}
        </div>
      </div>
      <div className="bg-muted/30 relative overflow-hidden rounded-xl p-4 flex flex-col justify-between col-span-2 row-span-1">
        <Image
          src={"/blocks.svg"}
          alt=""
          width={400}
          height={400}
          className="absolute -z-10 inset-0 object-cover brightness-150"
        />
        <GitBranch
          className="text-blue-400 glow absolute left-12 bottom-4"
          size={40}
        />
        <span className="text-muted-foreground text-center w-full text-sm font-medium">
          Contributed To
        </span>
        <div className="text-blue-400 text-4xl text-center font-bold mt-2">
          {stats["Contributed To"]}
        </div>
      </div>
    </div>
  );
};

export default GitHubStatsCard;
