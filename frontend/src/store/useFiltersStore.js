import { create } from "zustand";

const useFiltersStore = create((set) => ({
  filters: {
    categories: "all",
    type: "all",
    period: "this_month",
  },
  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters, // existing
        ...newFilters, // update new
      },
    })),
}));

export default useFiltersStore;
