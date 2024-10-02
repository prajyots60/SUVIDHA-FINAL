import { useEffect, useState } from "react";
import { getVendors } from "../api.js";
import { Link } from "react-router-dom";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await getVendors();
        console.log("Fetched vendors:", response.data);
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setError("Failed to load vendors. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false once fetch is complete
      }
    };
    fetchVendors();
  }, []);

  if (loading) return <p>Loading vendors...</p>; // Loading state

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Vendors</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(vendors) && vendors.length > 0 ? (
          vendors.map((vendor) => (
            <div key={vendor._id} className="bg-white shadow-md rounded-lg p-6">
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{vendor.name}</h3>
              <p className="text-gray-700"><strong>Occupation:</strong> {vendor.occupation}</p>
              <p className="text-gray-700"><strong>Address:</strong> {vendor.address}</p>
              {vendor.description && ( // Display description if it exists
                <p className="text-gray-700"><strong>Description:</strong> {vendor.description}</p>
              )}
              {vendor.location && ( // Display location if it exists
                <p className="text-gray-700"><strong>Location:</strong> {vendor.location}</p>
              )}
              {vendor.category && ( // Display category if it exists
                <p className="text-gray-700"><strong>Category:</strong> {vendor.category}</p>
              )}
              <div className="mt-4">
                <Link to={`/vendor/${vendor._id}`}>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No vendors available.</div>
        )}
      </div>
    </div>
  );
};

export default VendorList;
