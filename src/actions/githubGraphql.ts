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

export async function fetchContributions(username: string): Promise<{ totalContributions: number, longestStreak: number, currentStreak: number }> {
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

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN!}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query ($user: String!) {
          user(login: $user) {
            contributionsCollection {
              contributionYears
            }
          }
        }
      `,
      variables: { user: username },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  const contributionYears = data.data.user.contributionsCollection.contributionYears;

  let totalContributions = 0;
  let allContributionDays: { date: string, contributionCount: number }[] = [];

  // Fetch contributions for each year and aggregate all contribution days
  for (const year of contributionYears) {
    const start = `${year}-01-01T00:00:00Z`;
    const end = `${year}-12-31T23:59:59Z`;

    const yearResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN!}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { user: username, from: start, to: end },
      }),
    });

    if (!yearResponse.ok) {
      throw new Error(`GitHub API request failed for year ${year}: ${yearResponse.statusText}`);
    }

    const yearData = await yearResponse.json();
    const weeks = yearData.data.user.contributionsCollection.contributionCalendar.weeks;

    // Collect all the contribution days for all years
    weeks.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        if (day.contributionCount > 0) {
          totalContributions += day.contributionCount;
        }
        allContributionDays.push({ date: day.date, contributionCount: day.contributionCount });
      });
    });
  }

  // Sort contribution days by date
  allContributionDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate the longest streak and current streak
  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;
  let lastDate: Date | null = null;
  let currentStreakStarted = false;

  for (let i = 0; i < allContributionDays.length; i++) {
    const currentDate = new Date(allContributionDays[i].date);
    
    // If the day has contributions
    if (allContributionDays[i].contributionCount > 0) {
      if (lastDate) {
        const dayDifference = (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

        // If it's a consecutive day, increase the streak
        if (dayDifference === 1) {
          tempStreak++;
          if (i === allContributionDays.length - 1) {
            currentStreak = tempStreak; // If the streak reaches till the end, it’s the current streak
          }
        } else {
          // Streak is broken, check if this was the longest streak
          if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
          }
          // Reset streak for non-consecutive days
          tempStreak = 1;

          // If current streak ends today, set it
          if (!currentStreakStarted && i === allContributionDays.length - 1) {
            currentStreakStarted = true;
            currentStreak = tempStreak;
          }
        }
      } else {
        // If it's the first contribution day
        tempStreak = 1;
      }
      lastDate = currentDate;
    } else {
      // Streak is broken on a non-contribution day
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
      tempStreak = 0; // Reset the streak if no contributions
    }
  }

  // Edge case: if the last streak is the longest streak
  if (tempStreak > longestStreak) {
    longestStreak = tempStreak;
  }

  return { totalContributions, longestStreak, currentStreak };
}