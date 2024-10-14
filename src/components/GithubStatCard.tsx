import React from "react";
import {
  Activity,
  GitBranch,
  GitPullRequest,
  Star,
  AlertCircle,
} from "lucide-react";
import { UserStats } from "@/types";

export default function GitHubStatsCard({
  userName,
  stats,
}: {
  userName: String;
  stats: UserStats | undefined;
}) {
  return (
    <svg
      width="500"
      height="300"
      viewBox="0 0 500 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="500" height="300" rx="15" fill="#1e1e2e" />

      {/* Title */}
      <text x="20" y="40" fontSize="20" fill="#cdd6f4">
        {userName || "Subhadeep"}&apos;s GitHub Stats
      </text>

      {/* Bento grid layout */}
      <g transform="translate(20, 60)">
        {/* Stars */}
        <rect width="220" height="100" rx="10" fill="#313244" />
        <Star x="20" y="20" size="24" color="#f9e2af" />
        <text x="60" y="35" fontSize="16" fill="#cdd6f4">
          Total Stars Earned
        </text>
        <text x="60" y="70" fontSize="24" fontWeight="bold" fill="#f9e2af">
          {/* Stars */}
          {stats?.["Star Earned"] || 0}
        </text>

        {/* Commits */}
        <g transform="translate(240, 0)">
          <rect width="220" height="100" rx="10" fill="#313244" />
          <Activity x="20" y="20" size="24" color="#94e2d5" />
          <text x="60" y="35" fontSize="16" fill="#cdd6f4">
            Total Commits
          </text>
          <text x="60" y="70" fontSize="24" fontWeight="bold" fill="#94e2d5">
            {stats?.Commits || 0}
          </text>
        </g>

        {/* PRs */}
        <g transform="translate(0, 120)">
          <rect width="140" height="100" rx="10" fill="#313244" />
          <GitPullRequest x="20" y="20" size="24" color="#f38ba8" />
          <text x="20" y="60" fontSize="16" fill="#cdd6f4">
            Total PRs
          </text>
          <text x="20" y="85" fontSize="24" fontWeight="bold" fill="#f38ba8">
            {stats?.["Pull Requests"] || 0}
          </text>
        </g>

        {/* Issues */}
        <g transform="translate(160, 120)">
          <rect width="140" height="100" rx="10" fill="#313244" />
          <AlertCircle x="20" y="20" size="24" color="#fab387" />
          <text x="20" y="60" fontSize="16" fill="#cdd6f4">
            Total Issues
          </text>
          <text x="20" y="85" fontSize="24" fontWeight="bold" fill="#fab387">
            {stats?.Issues || 0}
          </text>
        </g>

        {/* Contributed To */}
        <g transform="translate(320, 120)">
          <rect width="140" height="100" rx="10" fill="#313244" />
          <GitBranch x="20" y="20" size="24" color="#a6e3a1" />
          <text x="20" y="60" fontSize="16" fill="#cdd6f4">
            Contributed To
          </text>
          <text x="20" y="85" fontSize="24" fontWeight="bold" fill="#a6e3a1">
            {stats?.["Contributed To"] || 0}
          </text>
        </g>
      </g>

      {/* Grade Circle */}
      <circle
        cx="450"
        cy="50"
        r="30"
        fill="none"
        stroke="#89b4fa"
        strokeWidth="4"
      />
      <text
        x="450"
        y="58"
        fontSize="24"
        fontWeight="bold"
        fill="#89b4fa"
        textAnchor="middle"
      >
        A+
      </text>
    </svg>
  );
}
