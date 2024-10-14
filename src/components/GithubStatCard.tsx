import React from "react";
import Image from "next/image";
import {
  Activity,
  GitBranch,
  GitPullRequest,
  Star,
  AlertCircle,
} from "lucide-react";

interface GitHubStats {
  username: string;
  stars: number;
  commits: string;
  prs: number;
  issues: number;
  contributedTo: number;
  grade: string;
}

export default function GitHubStatsCard({ stats }: { stats: GitHubStats }) {
  const { username, stars, commits, prs, issues, contributedTo, grade } = stats;

  return (
    <div className="w-[500px] bg-secondary rounded-[15px] p-5 text-[#cdd6f4] relative">
      <h2 className="text-xl mb-4">{username}&apos;s GitHub Stats</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-popover rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <Star className="w-6 h-6 text-[#f9e2af] mr-2" />
            <span>Total Stars Earned</span>
          </div>
          <span className="text-2xl font-bold text-[#f9e2af]">{stars}</span>
        </div>

        <div className="bg-popover rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <Activity className="w-6 h-6 text-[#94e2d5] mr-2" />
            <span>Total Commits</span>
          </div>
          <span className="text-2xl font-bold text-[#94e2d5]">{commits}</span>
        </div>

        <div className="bg-popover rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <GitPullRequest className="w-6 h-6 text-[#f38ba8] mr-2" />
            <span>Total PRs</span>
          </div>
          <span className="text-2xl font-bold text-[#f38ba8]">{prs}</span>
        </div>

        <div className="bg-popover rounded-lg p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-6 h-6 text-[#fab387] mr-2" />
            <span>Total Issues</span>
          </div>
          <span className="text-2xl font-bold text-[#fab387]">{issues}</span>
        </div>
      </div>

      <div className="bg-popover rounded-lg p-4 mt-4 flex items-center">
        <GitBranch className="w-6 h-6 text-[#a6e3a1] mr-2" />
        <span className="mr-2">Contributed To:</span>
        <span className="text-2xl font-bold text-[#a6e3a1]">
          {contributedTo}
        </span>
      </div>

      <div className="absolute top-4 right-4 w-16 h-16 rounded-full border-4 border-[#89b4fa] flex items-center justify-center">
        <span className="text-2xl font-bold text-[#89b4fa]">{grade}</span>
      </div>
    </div>
  );
}
