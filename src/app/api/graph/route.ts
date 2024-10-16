import { fetchYearContributions } from '@/actions/fetchYearContribution';
import { generateContributionGraph } from '@/utils/generate-graph';
import { NextRequest, NextResponse } from 'next/server';

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
    const currentYear = new Date().getFullYear();
    const contributionDays = await fetchYearContributions(username, currentYear);

    const svg = generateContributionGraph(contributionDays);

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return new NextResponse("Error fetching contributions", { status: 500 });
  }
}
