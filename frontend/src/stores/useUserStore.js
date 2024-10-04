
/* eslint-disable no-unused-vars */
import {create} from "zustand";
import axios from "../lib/axios.js";
import {toast} from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({name, email, password, confirmPassword}) => {
    set({loading: true});

    if(password !== confirmPassword) {
      toast.error("Passwords do not match");
      set({loading: false});
      return;
    }

    try {
      const res = await axios.post("/auth/signup", {name, email, password});
      set({user: res.data, loading:false});
      toast.success("Signed up successfully");
    } catch(error) {
      set({loading: false});
      console.log("Error signing up zustand", error.response.data);
      toast.error(error.response.data.message || "An error occurred");
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
            // Server responded with a status other than 2xx
            console.log("Error login zustand", error.response.data);
            toast.error(error.response.data.message || "An error occurred");
        } else if (error.request) {
            // Request was made but no response was received
            console.log("No response received", error.request);
            toast.error("No response received from server");
        } else {
            // Something happened in setting up the request
            console.log("Error in request setup", error.message);
            toast.error("Error in request setup: " + error.message);
        }
    }
},


  logout: async () => {
		try {
			await axios.post("/auth/logout");
			set({ user: null });
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred during logout");
		}
	},

  checkAuth: async () => {
    set({checkingAuth: true});
    try {
      const res = await axios.get("/auth/profile");
      set({user: res.data, checkingAuth:false});
    } catch(error) {
      set({checkingAuth: false, user: null});
      console.log("Error checking auth zustand", error.response.data);
    }
  },

  // updateUser: async (id, { name, email }) => {
  //   try {
  //     const res = await axios.put(`/auth/profile/${id}`, { name, email });
  //     set((state) => ({
  //       user: { ...state.user, name: res.data.name, email: res.data.email },
  //     }));
  //     toast.success("Profile updated successfully!");
  //     return true; // Indicate success
  //   } catch (error) {
  //     console.log("Error updating profile", error.response.data);
  //     toast.error(error.response.data.message || "An error occurred while updating profile");
  //     return false; // Indicate failure
  //   }
  // },

  updateUser: async (data) => {
    try {
      const res = await axios.patch('/auth/update', data); // Update route
      // Ensure set is called with a function that takes state
      set((state) => ({
        user: { ...state.user, ...res.data }, // Correctly update user in store
        
      }));
      toast.success('Profile updated successfully!');
      return true; // Indicate success
    } catch (error) {
      console.error('Error updating user:', error);
      return false; // Indicate failure
    }
  },
  

  // New method to update password
  updatePassword: async (id, { newPassword }) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/auth/update-password`, { newPassword });
      set({ user: res.data, loading: false });
      toast.success("Password updated successfully!");
      return true; // Indicate success
    } catch (error) {
      console.error("Error updating password:", error);
      set({ loading: false });
      return false; // Indicate failure
    }
  },
  
}));