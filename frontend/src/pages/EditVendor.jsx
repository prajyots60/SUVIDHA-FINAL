import { useEffect, useState } from "react";
import { getVendorById, updateVendor } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import VendorForm from "../components/VendorForm";

const EditVendor = () => {
  const { id } = useParams(); // Get the vendor ID from the URL parameters
  const navigate = useNavigate(); // Hook for navigation
  const [vendor, setVendor] = useState(null); // State to hold vendor data
  const [error, setError] = useState(null); // State to hold potential errors

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await getVendorById(id); // Fetch vendor data by ID
        setVendor(response.data); // Set the vendor data in state
      } catch (err) {
        setError("Vendor not found"); // Set error if vendor is not found
      }
    };
    fetchVendor(); // Fetch vendor on component mount
  }, [id]);

  const handleSubmit = async (vendorData) => {
    try {
      await updateVendor(id, vendorData); // Update vendor data
      navigate("/"); // Navigate back to the homepage after successful update
    } catch (err) {
      setError("Failed to update vendor"); // Set error if update fails
    }
  };

  if (error) return <p className="text-red-500">{error}</p>; // Display error if it exists
  if (!vendor) return <p>Loading...</p>; // Show loading text while fetching data

  return (
    <div>
      <h2>Edit Vendor</h2>
      <VendorForm onSubmit={handleSubmit} initialData={vendor} /> {/* Pass vendor data to form */}
    </div>
  );
};

export default EditVendor;
