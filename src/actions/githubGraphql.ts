"use server"

import { calculateCurrentStreak, calculateLongestStreak, calculateTotalContributions, formatDate } from "@/utils/calculations";
import { fetchContributionYears } from "./fetchContributionYears";
import { fetchYearContributions } from "./fetchYearContribution";

export async function githubGraphql({ query, variables }: {
  query: string;
  variables: Record<string, any>;
}) {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN!}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function fetchContributions(username: string): Promise<{
  totalContributions: number,
  firstDateofContribution: string | null,
  longestStreak: number,
  longestStreakStartDate: string | null,
  longestStreakEndDate: string | null,
  currentStreak: number,
  currentStreakStartDate: string | null,
  currentStreakEndDate: string | null,
}> {
  const contributionYears = await fetchContributionYears(username);
  let allContributionDays: { date: string, contributionCount: number }[] = [];

  for (const year of contributionYears) {
    const yearContributions = await fetchYearContributions(username, year);
    allContributionDays = allContributionDays.concat(yearContributions);
  }

  allContributionDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const { total, firstContributionDate } = calculateTotalContributions(allContributionDays);
  const firstDateofContribution = formatDate(firstContributionDate);
  const { longestStreak, startDate: longestStreakStart, endDate: longestStreakEnd } = calculateLongestStreak(allContributionDays);
  const longestStreakStartDate = formatDate(longestStreakStart);
  const longestStreakEndDate = formatDate(longestStreakEnd);
  const { currentStreak, startDate: currentStreakStart, endDate: currentStreakEnd } = calculateCurrentStreak(allContributionDays);
  const currentStreakStartDate = formatDate(currentStreakStart);
  const currentStreakEndDate = formatDate(currentStreakEnd);

  return {
    totalContributions: total,
    firstDateofContribution,
    longestStreak,
    longestStreakStartDate,
    longestStreakEndDate,
    currentStreak,
    currentStreakStartDate,
    currentStreakEndDate
  };
}
