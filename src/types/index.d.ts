// types.ts
export interface UserStats {
  following: number;
  followers: number;
  gists: number;
  totalCommitContributions: number;
  repositoriesContributedTo: number;
  pullRequests: number;
  issues: number;
  organizations: number;
  sponsoring: number;
  sponsors: number;
  publicRepositories: {
    totalCount: number;
    repositories: {
      name: string;
      description: string;
      stargazerCount: number;
    }[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface GitHubResponse {
  user: {
    following: { totalCount: number };
    followers: { totalCount: number };
    gists: { totalCount: number };
    contributionsCollection: { totalCommitContributions: number };
    repositoriesContributedTo: { totalCount: number };
    pullRequests: { totalCount: number };
    issues: { totalCount: number };
    organizations: { totalCount: number };
    sponsoring: { totalCount: number };
    sponsors: { totalCount: number };
    createdAt: string;
    updatedAt: string;
    publicRepositories: {
      totalCount: number;
      nodes: {
        name: string;
        description: string;
        stargazerCount: number;
      }[];
    };
  };
}
