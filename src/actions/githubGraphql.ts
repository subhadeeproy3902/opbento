"use server"

// await githubGraphql({
//   query,
//   variables: { username: login }
// });

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

// Function to fetch GitHub GraphQL API
async function fetchGitHubData(query: string, variables: any): Promise<any> {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN!}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.statusText}`);
  }

  return response.json();
}

// Function to fetch contribution years
async function fetchContributionYears(username: string): Promise<number[]> {
  const query = `
    query ($user: String!) {
      user(login: $user) {
        contributionsCollection {
          contributionYears
        }
      }
    }
  `;
  
  const data = await fetchGitHubData(query, { user: username });
  return data.data.user.contributionsCollection.contributionYears;
}

// Function to fetch contributions for a given year
async function fetchYearContributions(username: string, year: number): Promise<{ date: string, contributionCount: number }[]> {
  const query = `
    query ($user: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $user) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const start = `${year}-01-01T00:00:00Z`;
  const end = `${year}-12-31T23:59:59Z`;

  const data = await fetchGitHubData(query, { user: username, from: start, to: end });
  const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;

  // Aggregate all the contribution days from the year
  let contributionDays: { date: string, contributionCount: number }[] = [];
  weeks.forEach((week: any) => {
    week.contributionDays.forEach((day: any) => {
      contributionDays.push({ date: day.date, contributionCount: day.contributionCount });
    });
  });
  
  return contributionDays;
}

// Function to calculate total contributions
function calculateTotalContributions(contributionDays: { date: string, contributionCount: number }[]): number {
  return contributionDays.reduce((total, day) => total + day.contributionCount, 0);
}

// Function to calculate the longest streak
function calculateLongestStreak(contributionDays: { date: string, contributionCount: number }[]): number {
  let longestStreak = 0, tempStreak = 0;
  let lastDate: Date | null = null;

  for (const day of contributionDays) {
    const currentDate = new Date(day.date);

    if (day.contributionCount > 0) {
      if (lastDate) {
        const dayDifference = (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
        if (dayDifference === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1; // Reset streak
        }
      } else {
        tempStreak = 1; // Start streak if it's the first contribution
      }
      lastDate = currentDate;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 0;
    }
  }

  return Math.max(longestStreak, tempStreak); // Handle edge case
}

// Function to calculate the current streak
function calculateCurrentStreak(contributionDays: { date: string, contributionCount: number }[]): number {
  let currentStreak = 0;
  let lastDate = new Date(); // Start from today

  // Loop from the most recent day backwards
  for (let i = contributionDays.length - 1; i >= 0; i--) {
    const currentDate = new Date(contributionDays[i].date);
    const dayDifference = (lastDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

    if (contributionDays[i].contributionCount > 0 && dayDifference <= 1) {
      currentStreak++;
      lastDate = currentDate; // Update lastDate to the current one
    } else if (dayDifference > 1) {
      break; // Streak is broken due to a gap in consecutive days
    }
  }

  return currentStreak;
}

// Main function to fetch contributions and calculate streaks
export async function fetchContributions(username: string): Promise<{ totalContributions: number, longestStreak: number, currentStreak: number }> {
  const contributionYears = await fetchContributionYears(username);
  let allContributionDays: { date: string, contributionCount: number }[] = [];

  for (const year of contributionYears) {
    const yearContributions = await fetchYearContributions(username, year);
    allContributionDays = allContributionDays.concat(yearContributions);
  }

  // Sort all days by date
  allContributionDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate total contributions, longest streak, and current streak
  const totalContributions = calculateTotalContributions(allContributionDays);
  const longestStreak = calculateLongestStreak(allContributionDays);
  const currentStreak = calculateCurrentStreak(allContributionDays);

  return { totalContributions, longestStreak, currentStreak };
}
