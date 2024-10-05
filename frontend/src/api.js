// src/api.js
import axiosInstance from './lib/axios.js'; // Adjust the import path as necessary

const API_URL = '/vendors'; // Updated to plural form for collections

// Fetch all vendors
export const getVendors = () => axiosInstance.get(`${API_URL}`);

// Fetch a vendor by user ID
export const getVendorByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}?userId=${userId}`); // Adjust the endpoint as needed
    return response; // Return the response directly
  } catch (error) {
    console.error('Error fetching vendor by user ID:', error);
    throw error; // Re-throw the error for further handling if needed
  }
};

// Fetch a vendor by ID

export const getVendorById = (id) => axiosInstance.get(`${API_URL}/${id}`);

export const getUserById = (userId) => axiosInstance.get(`/users/${userId}`);

// Create a new vendor
export const createVendor = (vendorData) => axiosInstance.post(`${API_URL}`, vendorData);
// export const createVendor = async (vendorData) => {
//   return await axiosInstance.post('/api/vendors', vendorData, {
//       headers: {
//           'Content-Type': 'multipart/form-data', // Ensure this is set
//       },
//   });
// };

// Update a vendor by ID
export const updateVendor = (id, vendorData) => axiosInstance.put(`${API_URL}/${id}`, vendorData);

// Delete a vendor by ID
export const deleteVendor = (id) => axiosInstance.delete(`${API_URL}/${id}`);
