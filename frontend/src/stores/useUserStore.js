import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      set({ loading: false });
      return;
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data, loading: false });
      toast.success("Signed up successfully");
    } catch (error) {
      set({ loading: false });
      console.log("Error signing up zustand", error.response?.data);
      toast.error(error.response?.data.message || "An error occurred");
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      console.log("User: ", res.data);
      set({ user: res.data, loading: false });
      toast.success("Logged In successfully");
    } catch (error) {
      set({ loading: false });
      if (error.response) {
        console.log("Error login zustand", error.response?.data);
        toast.error(error.response?.data.message || "An error occurred");
      } else if (error.request) {
        console.log("No response received", error.request);
        toast.error("No response received from server");
      } else {
        console.log("Error in request setup", error.message);
        toast.error("Error in request setup: " + error.message);
      }
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error(error.response?.data?.message || "An error occurred during logout");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/current");
      console.log("User: ", res.data);
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      console.log("Error checking auth zustand", error.response?.data);
    }
  },

  updateUser: async (data) => {
    try {
      const res = await axios.patch("/auth/update", data); // Update route
      set((state) => ({
        user: { ...state.user, ...res.data }, // Correctly update user in store
      }));
      toast.success("Profile updated successfully!");
      return true; // Indicate success
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Profile update failed");
      return false; // Indicate failure
    }
  },

  // New method to update password
  updatePassword: async ({ newPassword }) => {
    set({ loading: true });
    try {
      const res = await axios.patch("/auth/update-password", { newPassword });
      set({ user: res.data, loading: false });
      toast.success("Password updated successfully!");
      return true; // Indicate success
    } catch (error) {
      console.error("Error updating password:", error);
      set({ loading: false });
      toast.error("Password update failed");
      return false; // Indicate failure
    }
  },

  refreshToken: async () => {
    // Prevent multiple simultaneous refresh attempts
    if (get().checkingAuth) return;

    set({ checkingAuth: true });
    try {
      const response = await axios.post("/auth/refresh-token");
      set({ checkingAuth: false });
      return response.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // If a refresh is already in progress, wait for it to complete
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        // Start a new refresh process
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or handle as needed
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        refreshPromise = null; // Ensure promise is cleared
      }
    }
    return Promise.reject(error);
  }
);
