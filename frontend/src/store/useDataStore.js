import { create } from "zustand";
import axios from "axios";
import { BASEURL } from "../config";

const useDataStore = create((set, get) => ({
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

  addTransaction: (transaction) => {
    set((state) => ({
      transactions: [...state.transactions, transaction],
    }));
  },

  updateTransaction: (updatedTransaction) => {
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction._id === updatedTransaction._id
          ? updatedTransaction
          : transaction
      ),
    }));
  },

  deleteTransaction: (deletedTransactionId) => {
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction._id !== deletedTransactionId
      ),
    }));
  },

  addCategory: (category) => {
    set((state) => ({
      categories: [...state.categories, category],
    }));
  },

  updateCategory: (updatedCategory) => {
    set((state) => ({
      categories: state.categories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      ),
    }));
  },

  deleteCategory: (deletedCategoryId) => {
    set((state) => ({
      categories: state.categories.filter(
        (category) => category._id !== deletedCategoryId
      ),
    }));
  },
}));

export default useDataStore;
