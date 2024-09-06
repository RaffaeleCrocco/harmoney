import { create } from "zustand";
import axios from "axios";
import { BASEURL } from "../config";

const useFiltersStore = create((set) => ({
  filters: {
    categories: "all",
    type: "all",
    period: "this_month",
    selectedCategories: [],
  },
  loading: false,
  error: null,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters, // existing
        ...newFilters, // update new
      },
    })),

  fetchFilters: async (token) => {
    set({ loading: true, error: null });

    axios
      .get(`${BASEURL}/auth/protected`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        set({ filters: res.data.user.filters });
      })
      .catch((error) => {
        set({ loading: false, error: error.message });
      });
  },
}));

export default useFiltersStore;
