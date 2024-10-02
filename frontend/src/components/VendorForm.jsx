/* eslint-disable react/prop-types */
import { useState } from "react";

const VendorForm = ({ onSubmit, initialData }) => {
  // Add 'location' and 'category' to the vendor state object
  const [vendor, setVendor] = useState({
    name: initialData?.name || "",
    address: initialData?.address || "",
    occupation: initialData?.occupation || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    gallery: initialData?.gallery || [],
    email: initialData?.email || "",
    location: initialData?.location || "", // New field: location
    category: initialData?.category || "", // New field: category
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(vendor);
  };

  return (
    <form onSubmit={handleSubmit} className="vendor-form">
      {/* Name Field */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={vendor.name}
        onChange={handleChange}
        required
      />

      {/* Address Field */}
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={vendor.address}
        onChange={handleChange}
        required
      />

      {/* Occupation Field */}
      <input
        type="text"
        name="occupation"
        placeholder="Occupation"
        value={vendor.occupation}
        onChange={handleChange}
        required
      />

      {/* Description Field */}
      <textarea
        name="description"
        placeholder="Description"
        value={vendor.description}
        onChange={handleChange}
        rows="4"
        className="description-input"
      />

      {/* Email Field */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={vendor.email}
        onChange={handleChange}
        required
      />

      {/* Profile Image Field */}
      <input
        type="text"
        name="image"
        placeholder="Profile Image URL"
        value={vendor.image}
        onChange={handleChange}
      />

      {/* Gallery Field */}
      <input
        type="text"
        name="gallery"
        placeholder="Gallery Image URLs (comma separated)"
        value={vendor.gallery.join(",")}
        onChange={(e) =>
          setVendor({ ...vendor, gallery: e.target.value.split(",") })
        }
      />

      {/* New Location Field */}
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={vendor.location}
        onChange={handleChange}
        required
      />

      {/* New Category Field */}
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={vendor.category}
        onChange={handleChange}
        required
      />

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default VendorForm;
