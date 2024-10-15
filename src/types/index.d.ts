// types.ts
export interface UserStats {
  Followers: number;
  Repositories: number;
  Organizations: number;
  Gists: number;
  'Pull Requests': number;
  Issues: number;
  Commits: number;
  Sponsors: number;
  'Contributed To': number;
  'Star Earned': number;
}

export interface User {
  followers: { totalCount: number };
  gists: { totalCount: number };
  contributionsCollection: { totalCommitContributions: number };
  repositoriesContributedTo: { totalCount: number };
  pullRequests: { totalCount: number };
  issues: { totalCount: number };
  organizations: { totalCount: number };
  sponsors: { totalCount: number };
  repositoriesWithStargazerCount: {
    totalCount: number;
    nodes: { stargazerCount: number }[];
  };
}

export interface GitHubResponse {
  user: User;
  rateLimit: any;
}


export type StreakStats = {
  totalContributions: number;
  firstDateofContribution: string | null;
  longestStreak: number;
  longestStreakStartDate: string | null;
  longestStreakEndDate: string | null;
  currentStreak: number;
  currentStreakStartDate: string | null;
  currentStreakEndDate: string | null;
};
