import { create } from "zustand";
import axios from "axios";
import { BASEURL } from "../config";

const useDataStore = create((set) => ({
  user: null,
  transactions: [],
  categories: [],
  loading: false,
  error: null,
  transactionIdToUpdate: "",
  categoryIdToUpdate: "",

  fetchData: async (token) => {
    set({ loading: true, error: null });

    const fetchAuth = axios.get(`${BASEURL}/auth/protected`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const fetchTransactions = axios.get(`${BASEURL}/transaction`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const fetchCategories = axios.get(`${BASEURL}/category`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    try {
      const [authResponse, transactionResponse, categoryResponse] =
        await Promise.all([fetchAuth, fetchTransactions, fetchCategories]);

      set({
        user: {
          username: authResponse.data.user.username,
          userId: authResponse.data.user.userId,
          settings: authResponse.data.user.settings,
        },
        transactions: transactionResponse.data.data,
        categories: categoryResponse.data.data,
        loading: false,
      });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  setTransactionIdToUpdate: (content) =>
    set({ transactionIdToUpdate: content }),
  setCategoryIdToUpdate: (content) => set({ categoryIdToUpdate: content }),
}));

export default useDataStore;
