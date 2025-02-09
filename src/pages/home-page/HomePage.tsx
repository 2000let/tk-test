import React, { useState, useEffect } from "react";
import { useRepoStore } from "@/app/store/repoStore";
import { fetchReposFx } from "@/entities/repo/api";
import RepoList from "@/pages/home-page/ui/RepoList";
import Search from "@/features/search/Search";
import Pagination from "@/shared/ui/Pagination/Pagination";
import { RepoNode } from "@/entities/repo/model";
import PaginationWarning from "@/shared/ui/PaginationWarning/PaginationWarning";
import Loading from "@/shared/ui/Loading/Loading";

const HomePage: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    cursors,
    setCursors,
    allowSkipPages,
    setAllowSkipPages,
  } = useRepoStore();
  const [repos, setRepos] = useState<RepoNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pagesData, setPagesData] = useState<{ [key: number]: RepoNode[] }>({});

  const fetchPageData = async (pageNumber: number, cursor: string | null) => {
    const { edges, pageInfo } = await fetchReposFx({
      query: searchQuery,
      first: 10,
      after: cursor,
    });

    const newCursors = [...cursors];
    newCursors[pageNumber - 1] = pageInfo.endCursor;
    setCursors(newCursors);

    const pageRepos = edges.map(edge => edge.node);
    setPagesData(prev => ({ ...prev, [pageNumber]: pageRepos }));

    return {
      repos: pageRepos,
      endCursor: pageInfo.endCursor
    };
  };

  const handlePageChange = async (page: number) => {
    if (page === currentPage) return;
    
    setIsLoading(true);
    try {
      if (pagesData[page] && page < currentPage) {
        setRepos(pagesData[page]);
        setCurrentPage(page);
        return;

      }

      if (allowSkipPages && page > currentPage + 1) {
        let currentCursor = cursors[currentPage - 1];
        
        for (let i = currentPage + 1; i <= page; i++) {
          const result = await fetchPageData(i, currentCursor);
          currentCursor = result.endCursor;
          if (i === page) {
            setRepos(result.repos);
          }

        }
      } else {
        const prevPageIndex = page - 2;
        const cursor = prevPageIndex >= 0 ? cursors[prevPageIndex] : null;
        const { repos } = await fetchPageData(page, cursor);
        setRepos(repos);
      }


      setCurrentPage(page);
    } catch (error) {
      console.error("Error during page change:", error);
      setError("Failed to change page. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadRepos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { edges, pageInfo, repositoryCount } = await fetchReposFx({
          query: searchQuery,
          first: 10,
          after: null,
        });
        
        const pageRepos = edges.map(edge => edge.node);
        setRepos(pageRepos);
        setPagesData({ 1: pageRepos });
        setTotalPages(Math.ceil(repositoryCount / 10));

        const newCursors = [...cursors];
        newCursors[0] = pageInfo.endCursor;
        setCursors(newCursors);
      } catch (error) {
        setError("Failed to fetch repositories. Please try again later.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRepos();
  }, [searchQuery]);

  return (
    <div className="container">
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <RepoList repos={repos} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            allowSkipPages={allowSkipPages}
          />
          <PaginationWarning 
            checked={allowSkipPages}
            onChange={setAllowSkipPages}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
