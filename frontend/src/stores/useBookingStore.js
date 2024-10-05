import {create} from 'zustand';
import axiosInstance from '../lib/axios'; // Assuming you have an axios instance set up

export const useBookingStore = create((set) => ({
  bookings: [], // Initial state for bookings
  loading: false, // Loading state
  error: null, // Error state

  // Fetch all bookings
  fetchBookings: async () => {
    set({ loading: true, error: null }); // Set loading to true and reset error
    try {
      const response = await axiosInstance.get('/bookings/all-bookings'); // Adjust this endpoint based on your API
      set({ bookings: response.data, loading: false }); // Set bookings and stop loading
    } catch (error) {
      set({ error: error.message, loading: false }); // Set error and stop loading
      console.error('Error fetching bookings:', error);
    }
  },

  // Delete booking
  // deleteBooking: async (bookingId) => {
  //   set({ loading: true });
  //   try {
  //     await axiosInstance.delete(`/bookings/${bookingId}`); // Adjust this endpoint to match your delete logic
  //     set((state) => ({
  //       bookings: state.bookings.filter((booking) => booking._id !== bookingId), // Remove booking from state
  //       loading: false,
  //     }));
  //   } catch (error) {
  //     set({ error: error.message, loading: false });
  //     console.error('Error deleting booking:', error);
  //   }
  // },


  deleteBooking: async (bookingId) => {
    set({ loading: true });
    try {
      console.log("Deleting booking with ID:", bookingId);
        await axiosInstance.delete(`/bookings/${bookingId}`); // Send ID in the body
      set((state) => ({
        bookings: state.bookings.filter((booking) => booking._id !== bookingId), // Remove booking from state
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error deleting booking:', error);
    }
  },
  
}));
