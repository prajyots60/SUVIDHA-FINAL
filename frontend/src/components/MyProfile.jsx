import { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore.js"; // Adjust the import path as necessary
import { getVendorByUserId } from "../api.js"; // Adjust the import path as necessary
import LoadingSpinner from "./LoadingSpinner"; // Optional loading spinner

const MyProfile = () => {
  const { user } = useUserStore(); // Get user state from zustand store
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendor = async () => {
      if (!user) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const userId = user._id; // Access user ID from the store
        console.log("Fetching vendor for user ID:", userId); // Debugging log
        const response = await getVendorByUserId(userId);

        // Log the full response from the API to inspect its structure
        console.log("Vendor response:", response);

        // Find vendor matching userId
        const matchedVendor = response.data.find(vendor => vendor.userId === userId);

        if (matchedVendor) {
          setVendor(matchedVendor);
        } else {
          setError("Vendor not found.");
        }

      } catch (err) {
        console.error("Error fetching vendor:", err);
        setError("Failed to fetch vendor profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [user]);

  if (loading) return <LoadingSpinner />; // Show a loading spinner while data is being fetched
  if (error) return <div>{error}</div>; // Show error message if something goes wrong

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-2xl font-bold text-emerald-400">Vendor Profile</h2>
      <div className="mt-4">
        {/* Display profile image or fallback if missing */}
        {vendor?.profileImage ? (
          <img
            src={vendor.profileImage}
            alt={`${user?.name}'s profile`} // Use user's name here
            className="w-32 h-32 rounded-full mb-4"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 mb-4" />
        )}

        {/* Display user name (from user object) */}
        <h3 className="text-xl font-semibold">{user?.name || "No name provided"}</h3>

        {/* Display email (from user object) */}
        <p><strong>Email:</strong> {user?.email || "No email provided"}</p>

        {/* Display occupation */}
        <p><strong>Occupation:</strong> {vendor?.occupation || "No occupation provided"}</p>

        {/* Display location */}
        <p><strong>Location:</strong> {vendor?.location || "No location provided"}</p>

        {/* Display description */}
        <p><strong>About:</strong> {vendor?.description || "No description provided"}</p>

        {/* Display category */}
        <p><strong>Category:</strong> {vendor?.category || "No category provided"}</p>

        {/* Display gallery images */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Gallery</h4>
          <div className="grid grid-cols-3 gap-4">
            {vendor?.galleryImages?.length > 0 ? (
              vendor.galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              ))
            ) : (
              <p>No gallery images available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
