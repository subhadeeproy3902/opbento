"use server"

import getUserStats from "./getUserStats";
import githubGraphql from "./githubGraphql";

// Define the structure of the user data returned by the GraphQL query
interface User {
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

// Define the structure of the response from the GraphQL API
interface GitHubResponse {
  user: User;
  rateLimit: any; // You can specify a more precise type if needed
}

// Define the structure of the stats returned by getUserStats
interface UserStats {
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

const userStatsQuery = `
  following {
    totalCount
  }
  followers {
    totalCount
  }
  gists {
    totalCount
  }
  contributionsCollection {
    totalCommitContributions
  }
  repositoriesContributedTo(
    first: 1
    contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
  ) {
    totalCount
  }
  pullRequests(first: 1) {
    totalCount
  }
  issues(first: 1) {
    totalCount
  }
  organizations(first: 1) {
    totalCount
  }
  sponsoring(first: 1) {
    totalCount
  }
  sponsors{
    totalCount
  }
  createdAt
  updatedAt
  repositoriesWithStargazerCount: repositories(
    first: 100
    privacy: PUBLIC
    ownerAffiliations: OWNER
    orderBy: {field: STARGAZERS, direction: DESC}
  ) {
    totalCount
    nodes {
      stargazerCount
    }
  }
`;

const fetchUserData = async (login: string): Promise<{ userStats: UserStats }> => {
  const query = `
    query ($username: String!) {
      user(login: $username) {
        ${userStatsQuery}
      }
    }
    `;

  const response: GitHubResponse = await githubGraphql({
    query,
    variables: { username: login }
  });

  const { user } = response;

  const userStats: UserStats = getUserStats(user);

  return {
    userStats
  };
};

export default fetchUserData;
