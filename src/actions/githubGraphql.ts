"use server"

// await githubGraphql({
//   query,
//   variables: { username: login }
// });

const githubGraphql = async ({ query, variables }: {
  query: string;
  variables: Record<string, any>;
}) => {
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

export default githubGraphql;
