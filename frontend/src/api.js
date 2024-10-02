import axiosInstance from './lib/axios'; // Adjust the import path as necessary

const API_URL = '/vendor'; // Use relative path since baseURL is already set

// Fetch all vendors
export const getVendors = () => axiosInstance.get(`${API_URL}/get`);

// Fetch a vendor by ID
export const getVendorById = (id) => axiosInstance.get(`${API_URL}/get/${id}`);

// Create a new vendor
export const createVendor = (vendorData) => axiosInstance.post(`${API_URL}/create`, vendorData);

// Update a vendor by ID
export const updateVendor = (id, vendorData) => axiosInstance.put(`${API_URL}/update/${id}`, vendorData);

// Delete a vendor by ID
export const deleteVendor = (id) => axiosInstance.delete(`${API_URL}/delete/${id}`);
