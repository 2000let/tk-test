type RepoNode = {
  id: string;
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  owner: {
    login: string;
  };
};


type RepoEdge = {
  node: RepoNode;
  cursor: string;
};

type PageInfo = {
  endCursor: string;
  hasNextPage: boolean;
};

type SearchReposResponse = {
  edges: RepoEdge[];
  repositoryCount: number;
  pageInfo: PageInfo;
};

interface RepoDetailsResponse {
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  owner: {
    avatarUrl: string;
    login: string;
    url: string;
  };
  languages: {
    edges: Array<{
      node: {
        name: string;
      };
    }>;
  };
  description: string | null;
}

export type {
  RepoNode,
  RepoEdge,
  PageInfo,
  SearchReposResponse,
  RepoDetailsResponse,
};
