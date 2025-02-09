import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RepoStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
  cursors: string[];
  setCursors: (cursors: string[]) => void;
  allowSkipPages: boolean;
  setAllowSkipPages: (allow: boolean) => void;
}

export const useRepoStore = create<RepoStore>()(
  persist(
    (set) => ({
      searchQuery: "",
      setSearchQuery: (query) => set({ 
        searchQuery: query,
        currentPage: 1,
        cursors: [],
        totalPages: 1
      }),
      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page }),
      totalPages: 1,
      setTotalPages: (totalPages) => set({ totalPages }),
      cursors: [],
      setCursors: (cursors) => set({ cursors }),
      allowSkipPages: false,
      setAllowSkipPages: (allow) => set({ allowSkipPages: allow }),
    }),
    {
      name: 'repo-storage'
    }
  )
);
