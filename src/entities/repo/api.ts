import { gql } from "@apollo/client";
import { client } from "@/shared/apolloClient";
import { RepoDetailsResponse, SearchReposResponse } from "./model";

export const fetchReposFx = async ({
  query,
  first = 10,
  after = null,
}: {
  query: string;
  first?: number;
  after?: string | null;
}): Promise<SearchReposResponse> => {
  const searchQuery = query.trim() 
    ? `${query} sort:updated-desc` 
    : `user:${localStorage.getItem('github_username') || ''} sort:updated-desc`;

  const GET_REPOS = gql`
    query SearchRepos($searchQuery: String!, $first: Int!, $after: String) {
      search(query: $searchQuery, type: REPOSITORY, first: $first, after: $after) {
        edges {
          node {
            ... on Repository {
              id
              name
              stargazerCount
              updatedAt
              url
              owner {
                login
              }
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
        repositoryCount
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: GET_REPOS,
      variables: { searchQuery, first, after },
    });
    
    if (!data.search) {
      throw new Error("Invalid data format from API");
    }

    return {
      edges: data.search.edges,
      repositoryCount: data.search.repositoryCount,
      pageInfo: data.search.pageInfo,
    };
  } catch (error) {
    console.error("Failed to fetch repos:", error);
    throw error;
  }
};

export const fetchRepoDetailsFx = async (name: string, owner: string): Promise<RepoDetailsResponse> => {
  const GET_REPO_DETAILS = gql`
    query GetRepoDetails($name: String!, $owner: String!) {
      repository(name: $name, owner: $owner) {
        name
        stargazerCount
        updatedAt
        url
        owner {
          avatarUrl
          login
          url
        }
        languages(first: 10) {
          edges {
            node {
              name
            }
          }
        }
        description
      }
    }
  `;

  const { data } = await client.query({
    query: GET_REPO_DETAILS,
    variables: { name, owner },
  });

  return data.repository;
};
