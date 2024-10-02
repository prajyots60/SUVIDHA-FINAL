import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the vendor ID from the URL
import { getVendorById } from "../api"; // API call to fetch vendor data from the backend

const VendorProfile = () => {
  const { id } = useParams(); // Get vendor ID from URL
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch vendor data by ID
    const fetchVendorData = async () => {
      try {
        const response = await getVendorById(id); // Assuming you have an API to get vendor by ID
        setVendor(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
        setError("Failed to load vendor profile.");
        setLoading(false);
      }
    };

    fetchVendorData();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-6 text-red-600">{error}</div>;
  }

  if (!vendor) {
    return <div className="text-center mt-6">Vendor not found</div>;
  }

  const handleBookService = () => {
    // Handle the booking logic here, e.g., navigate to the booking page or open a modal
    console.log("Booking service for:", vendor.name);
    // You can use navigate("/booking") or similar logic based on your app structure
  };

  return (
    <div className="bg-gradient-to-b from-purple-300 to-purple-500 min-h-screen flex items-center justify-center py-8">
      <div className="max-w-4xl w-full mx-auto bg-white shadow-xl rounded-lg p-8">
        {/* Profile Header */}
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Profile</h2>

        {/* Header Section with Left and Right Division */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          {/* Left Section - Profile Image and Basic Info */}
          <div className="md:w-1/2 flex flex-col items-center md:items-start mb-4 md:mb-0">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-600 mb-4">
              <img
                src={vendor.image}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Vendor Info */}
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{vendor.name}</h2>
            <p className="text-lg text-purple-600 font-medium mb-1">{vendor.occupation}</p>
            <p className="text-sm text-gray-500">{vendor.email}</p>
          </div>

          {/* Right Section - Location and Category */}
          <div className="md:w-1/2 text-center md:text-left md:pl-8">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-purple-600">Location</h3>
              <p className="text-lg text-gray-700">{vendor.location}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-600">Category</h3>
              <p className="text-lg text-gray-700">{vendor.category}</p>
            </div>
          </div>
        </div>

        {/* Vendor Address */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-2xl font-semibold text-purple-600 mb-3">Address</h3>
          <p className="text-lg text-gray-700">{vendor.address}</p>
        </div>

        {/* Description Section */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-2xl font-semibold text-purple-600 mb-3">Description</h3>
          <p className="text-lg text-gray-700">{vendor.description}</p>
        </div>

        {/* Gallery Section */}
        {vendor.gallery.length > 0 && (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {vendor.gallery.map((imageUrl, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={imageUrl}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white font-semibold">Image {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Book Service Button */}
        <div className="mt-6">
          <button
            onClick={handleBookService}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-200"
          >
            Book Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
