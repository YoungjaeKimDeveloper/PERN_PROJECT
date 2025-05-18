import { create } from "zustand";
import api from "../config/axios.config.js";

const useProductStore = create((set, get) => ({
  // States
  // products
  // loading
  // error
  data: [],
  isLoading: false,
  errorMessage: "",
  alertMessage: "",
  // Actions

  // Action - fetchAllProducts
  fetchAllProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/products");
      const products = response.data.data;
      if (products != null) {
        set({ data: products, isLoading: false });
      } else {
        set({ isLoading: false, errorMessage: "No Products found" });
      }
    } catch (error) {
      set({ isLoading: false, errorMessage: error.message });
    }
  },
  // Action - fetch single product
  fetchSingleProduct: async (id) => {
    try {
      set({ isLoading: true });
      const response = await api.get(`/products/${id}`);
      if (response.data == null) {
        set({ data: [] });
        set({ isLoading: false });
      } else {
        set({ data: response.data.data });
        set({ isLoading: false });
      }
    } catch (error) {
      set({ errorMessage: error.message || "Failed to fetch a product" });
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
  // Action - Create a product
  createAProduct: async ({ name, image, price }) => {
    set({ isLoading: true });
    if (!name && !image && !price) {
      set({ errorMessage: "Nothing to update" });
      set({ isLoading: false });
      return;
    }
    try {
      const response = await api.post("/", { name, image, price });
      if (response.data == null) {
        set({ errorMessage: "Failed to create Post" });
        set({ isLoading: false });
        return;
      }
      set({ alertMessage: "Create a new Post Successfully" });
      set({ isLoading: false });
    } catch (error) {
      set({ errorMessage: `Failed to create new Post ${error.message || ""}` });
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
  // Action - update Product
  updateProduct: async (id, { name, image, price }) => {
    set({ isLoading: true });
    if (id == null) {
      set({ isLoading: false });
      set({ errorMessage: "ID is required" });
      return;
    }
    try {
      const response = await api.put(`/${id}`, { name, image, price });
      const updateProduct = response.data.data;
      if (updateProduct != null) {
        set({ data: updateProduct });
        set({ isLoading: false });
      } else {
        set({ errorMessage: "Failed to update Post" });
        set({ isLoading: false });
      }
    } catch (error) {
      set({ errorMessage: `Failed to update Post,${error.message || ""}` });
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
  deletePost: async (id) => {
    set({ isLoading: true });
    if (id == null) {
      set({ errorMessage: "ID is required to delete post" });
      set({ isLoading: false });
      return;
    }
    try {
      const response = await api.delete(`/${id}`);
      const data = response.data.data;
      if (data == null) {
        set({ errorMessage: "Failed to delete post" });
      } else {
        set({ message: "Success to delete post" });
      }
    } catch (error) {
      set({
        errorMessage: `INTERNAL ERROR IN deletePost ${error.message || " "}`,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useProductStore;

// 기본적으로 axios가 data로 덮어서 넘어오게됨
