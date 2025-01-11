import { fetchYearContributions } from "@/actions/fetchYearContribution";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  try {
    const currentYear = new Date().getFullYear();
    const contributionDays = await fetchYearContributions(
      username,
      currentYear,
    );

    return new NextResponse(JSON.stringify(contributionDays), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("Error fetching contributions", { status: 500 });
  }
}
