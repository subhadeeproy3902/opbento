import { NextRequest, NextResponse } from "next/server";
import fetchUserData from "@/actions/fetchUserData";
import { UserStats } from "@/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const { userStats } = await fetchUserData(username);
    if (!userStats) {
      throw new Error("User stats not found");
    }
    const svg = generateSvg(userStats, username);


    
    return NextResponse.json(
      {
        svg,
      },
      {
        headers: {
          "Content-Type": "image/svg+xml",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

const generateSvg = (stats: UserStats, username: string) => {
  const {
    "Star Earned": stars,
    Commits: commits,
    "Pull Requests": prs,
    Issues: issues,
    "Contributed To": contributedTo,
    Sponsors: sponsors,
    Followers: followers,
    Gists: gists,
    Organizations: organizations,
  } = stats;

  // This can be your dynamic SVG string
  return `
<svg
  width="500"
  height="300"
  viewBox="0 0 500 300"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="500" height="300" rx="15" fill="#1e1e2e" />

  {/* Title */}
  <text x="20" y="40" font-size="24" fill="#cdd6f4">
    ${username}'s GitHub Stats
  </text>

  {/* Bento grid layout */}
  <g transform="translate(20, 60)">
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
    <text x="60" y="35" font-size="16" fill="#cdd6f4" >
      Total Stars Earned
    </text>
    <text x="60" y="70" font-size="28" font-family="Verdana, sans-serif" font-weight="600" fill="#f9e2af">
      ${stars}
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
      <text x="60" y="35" font-size="16" fill="#cdd6f4" >
        Total Commits
      </text>
      <text x="60" y="70" font-size="28" font-family="Verdana, sans-serif" font-weight="600" fill="#94e2d5">
        ${commits}
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
      <text x="20" y="60" font-size="16" fill="#cdd6f4" >
        Total PRs
      </text>
      <text x="20" y="87" font-size="28" font-family="Verdana, sans-serif" font-weight="600" fill="#f38ba8">
        ${prs}
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
      <text x="20" y="60" font-size="16" fill="#cdd6f4" >
        Total Issues
      </text>
      <text x="20" y="87" font-size="28" font-family="Verdana, sans-serif" font-weight="600" fill="#fab387">
        ${issues}
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
      <text x="20" y="60" font-size="16" fill="#cdd6f4" >
        Contributed To
      </text>
      <text x="20" y="87" font-size="28" font-family="Verdana, sans-serif" font-weight="600" fill="#a6e3a1">
        ${contributedTo}
      </text>
    </g>
  </g>
</svg>
`;
};
