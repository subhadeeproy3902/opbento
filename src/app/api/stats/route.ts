import { NextRequest, NextResponse } from "next/server";
import fetchUserData from "@/actions/fetchUserData";
import { UserStats } from "@/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const { userStats } = await fetchUserData(username);

    // Now pass the stats to the SVG generation function
    const svg = generateSvg(userStats, username);

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml"
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}


const generateSvg = (stats: UserStats, username: string) => {
  const {
    'Star Earned': stars,
    Commits: commits,
    'Pull Requests': prs,
    Issues: issues,
    'Contributed To': contributedTo,
    Sponsors: sponsors,
    Followers: followers,
    Gists: gists,
    Organizations: organizations
  } = stats;

  // This can be your dynamic SVG string
  return `
    <svg width="500" height="300" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="300" rx="15" fill="#1e1e2e" />

      <text x="20" y="40" fontSize="20" fill="#cdd6f4">
        ${username}'s GitHub Stats
      </text>

      <g transform="translate(20, 60)">
        <rect width="220" height="100" rx="10" fill="#313244" />
        <text x="60" y="35" fontSize="16" fill="#cdd6f4">Total Stars Earned</text>
        <text x="60" y="70" fontSize="24" fontWeight="bold" fill="#f9e2af">${stars}</text>

        <g transform="translate(240, 0)">
          <rect width="220" height="100" rx="10" fill="#313244" />
          <text x="60" y="35" fontSize="16" fill="#cdd6f4">Total Commits</text>
          <text x="60" y="70" fontSize="24" fontWeight="bold" fill="#94e2d5">${commits}</text>
        </g>

        <g transform="translate(0, 120)">
          <rect width="140" height="100" rx="10" fill="#313244" />
          <text x="20" y="60" fontSize="16" fill="#cdd6f4">Total PRs</text>
          <text x="20" y="85" fontSize="24" fontWeight="bold" fill="#f38ba8">${prs}</text>
        </g>

        <g transform="translate(160, 120)">
          <rect width="140" height="100" rx="10" fill="#313244" />
          <text x="20" y="60" fontSize="16" fill="#cdd6f4">Total Issues</text>
          <text x="20" y="85" fontSize="24" fontWeight="bold" fill="#fab387">${issues}</text>
        </g>

        <g transform="translate(320, 120)">
          <rect width="140" height="100" rx="10" fill="#313244" />
          <text x="20" y="60" fontSize="16" fill="#cdd6f4">Contributed To</text>
          <text x="20" y="85" fontSize="24" fontWeight="bold" fill="#a6e3a1">${contributedTo}</text>
        </g>
      </g>

      <circle cx="450" cy="50" r="30" fill="none" stroke="#89b4fa" strokeWidth="4"/>
      <text x="450" y="58" fontSize="24" fontWeight="bold" fill="#89b4fa" textAnchor="middle">A</text>
    </svg>
  `;
};
