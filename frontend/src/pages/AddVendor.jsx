import { useRef, useState } from 'react';
import { createVendor } from '../api';  // API function to submit form data
import { useNavigate } from 'react-router-dom';

const AddVendor = () => {
  // State to hold form input data
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    occupation: '',
    email: '',
    description: '',
    location: '', // Added location field
    category: '', // Added category field
  });

  // State to hold profile image and gallery images
  const [profileImage, setProfileImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const navigate = useNavigate();
  const galleryInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleAddGalleryImage = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.click(); // Trigger the file input click
    }
  };

  const handleGalleryChange = (e) => {
    const newImages = Array.from(e.target.files);
    setGalleryImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.address || !formData.occupation || !formData.email || !formData.location || !formData.category) {
      alert("Please fill out all required fields.");
      return;
    }

    const data = new FormData();
    
    // Append form data to FormData object
    data.append('name', formData.name);
    data.append('address', formData.address);
    data.append('occupation', formData.occupation);
    data.append('email', formData.email);
    data.append('description', formData.description);
    data.append('location', formData.location); // Append location
    data.append('category', formData.category); // Append category

    // Append profile image if it exists
    if (profileImage) {
      data.append('image', profileImage);
    }

    // Append gallery images if any exist
    if (galleryImages.length > 0) {
      galleryImages.forEach((file) => data.append('gallery', file));
    }

    try {
      const response = await createVendor(data);
      const vendorId = response.data._id;
      navigate(`/vendor/${vendorId}`);
      
      // Reset the form
      setFormData({
        name: '',
        address: '',
        occupation: '',
        email: '',
        description: '',
        location: '',
        category: '',
      });
      setProfileImage(null);
      setGalleryImages([]);
    } catch (error) {
      console.error('Error creating vendor:', error);
      alert("Failed to create vendor. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h2 className="text-3xl font-bold text-center mb-6">Become a Vendor</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8" encType="multipart/form-data">
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Address Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Occupation Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="occupation">
            Occupation
          </label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Describe your services..."
          />
        </div>

        {/* Location Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Enter your location"
          />
        </div>

        {/* Category Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Enter your category"
          />
        </div>

        {/* Profile Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Profile Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="w-full px-4 py-2 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Gallery Images Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gallery">
            Gallery Images
          </label>
          <input
            type="file"
            name="gallery"
            accept="image/*"
            multiple
            className='bg-gray-600'
            onChange={handleGalleryChange}
            ref={galleryInputRef} // Reference to the input
            style={{ display: 'none' }} // Hide the file input
          />
          <button
            type="button"
            onClick={handleAddGalleryImage}
            className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Add Image
          </button>
          <div className="mt-2">
            {/* Display added gallery images */}
            {galleryImages.map((image, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="mr-2">{image.name}</span>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => {
                    const updatedImages = galleryImages.filter((_, i) => i !== index);
                    setGalleryImages(updatedImages);  // Remove the selected image from the gallery
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Submit Vendor
        </button>
      </form>
    </div>
  );
};

export default AddVendor;
