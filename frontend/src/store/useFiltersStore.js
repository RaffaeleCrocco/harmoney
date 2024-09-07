import { create } from "zustand";
import axios from "axios";
import { BASEURL } from "../config";

const useFiltersStore = create((set, get) => ({
  filters: {
    categories: "all",
    type: "all",
    period: "this_month",
    selectedCategories: [],
  },
  loading: false,
  error: null,

  setFilters: (newFilters, token) => {
    set((state) => ({
      filters: {
        ...state.filters, // existing filters
        ...newFilters, // apply new filters
      },
    }));
    const { updateFilters } = get();
    updateFilters(token);
  },

  fetchFilters: async (token) => {
    set({ loading: true, error: null });

    axios
      .get(`${BASEURL}/auth/protected`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.user.settings.isRememberFiltersOn) {
          //only if user wants to
          set({ filters: res.data.user.filters });
        }
      })
      .catch((error) => {
        set({ loading: false, error: error.message });
      });
  },

  updateFilters: async (token) => {
    set({ loading: true, error: null });

    const { filters } = get();
    const data = { filters };

    axios
      .put(`${BASEURL}/filters/update`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        set({ loading: false });
      })
      .catch((error) => {
        set({ loading: false, error });
      });
  },
}));

export default useFiltersStore;
