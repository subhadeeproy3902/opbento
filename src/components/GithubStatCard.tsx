import React from "react";
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
      className="w-full h-full"
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f9e2af"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-star"
          x="20"
          y="20"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94e2d5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-activity"
            x="20"
            y="20"
          >
            <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f38ba8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-git-pull-request"
            x="20"
            y="14"
          >
            <circle cx="18" cy="18" r="3"></circle>
            <circle cx="6" cy="6" r="3"></circle>
            <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
            <line x1="6" x2="6" y1="9" y2="21"></line>
          </svg>
          <text x="20" y="60" fontSize="16" fill="#cdd6f4">
            Total PRs
          </text>
          <text x="20" y="87" fontSize="24" fontWeight="bold" fill="#f38ba8">
            {stats?.["Pull Requests"] || 0}
          </text>
        </g>

        {/* Issues */}
        <g transform="translate(160, 120)">
          <rect width="140" height="100" rx="10" fill="#313244" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fab387"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-alert"
            x="20"
            y="14"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="12"></line>
            <line x1="12" x2="12.01" y1="16" y2="16"></line>
          </svg>
          <text x="20" y="60" fontSize="16" fill="#cdd6f4">
            Total Issues
          </text>
          <text x="20" y="87" fontSize="24" fontWeight="bold" fill="#fab387">
            {stats?.Issues || 0}
          </text>
        </g>

        {/* Contributed To */}
        <g transform="translate(320, 120)">
          <rect width="140" height="100" rx="10" fill="#313244" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#a6e3a1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-git-branch"
            x="20"
            y="14"
          >
            <line x1="6" x2="6" y1="3" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
          </svg>
          <text x="20" y="60" fontSize="16" fill="#cdd6f4">
            Contributed To
          </text>
          <text x="20" y="87" fontSize="24" fontWeight="bold" fill="#a6e3a1">
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
