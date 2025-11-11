import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterState {
  selectedPlatform: string;
  selectedDifficulty: string;
  selectedDeadline: string;
  selectedLocation: string;
  sortBy: string;
  searchQuery: string;
  
  setSelectedPlatform: (platform: string) => void;
  setSelectedDifficulty: (difficulty: string) => void;
  setSelectedDeadline: (deadline: string) => void;
  setSelectedLocation: (location: string) => void;
  setSortBy: (sort: string) => void;
  setSearchQuery: (query: string) => void;
  clearAllFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      selectedPlatform: "All",
      selectedDifficulty: "All",
      selectedDeadline: "All",
      selectedLocation: "All",
      sortBy: "Newest",
      searchQuery: "",

      setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
      setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
      setSelectedDeadline: (deadline) => set({ selectedDeadline: deadline }),
      setSelectedLocation: (location) => set({ selectedLocation: location }),
      setSortBy: (sort) => set({ sortBy: sort }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      clearAllFilters: () => set({
        selectedPlatform: "All",
        selectedDifficulty: "All",
        selectedDeadline: "All",
        selectedLocation: "All",
        searchQuery: ""
      }),
    }),
    {
      name: 'challenge-filters',
    }
  )
);