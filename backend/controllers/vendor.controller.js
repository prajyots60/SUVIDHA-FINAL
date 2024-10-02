import Vendor from "../models/vendor.model.js";

// Create Vendor
export const createVendor = async (req, res) => {
  try {
    const { name, address, occupation, email, description, location, category } = req.body; // Added location and category

    // Check if vendor with the same email already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Access Cloudinary URLs from req.files
    const profileImageUrl = req.files['image'] ? req.files['image'][0].path : ''; // Use the first image for profile
    const galleryUrls = req.files['gallery'] ? req.files['gallery'].map((file) => file.path) : [];

    const newVendor = new Vendor({
      name,
      address,
      occupation,
      email,
      description, // Added description here
      location,    // Added location here
      category,    // Added category here
      image: profileImageUrl,
      gallery: galleryUrls,
    });

    const savedVendor = await newVendor.save();
    res.status(201).json(savedVendor);
  } catch (error) {
    console.error('Error creating vendor:', error); // Log error for debugging
    res.status(500).json({ message: 'Error creating vendor' });
  }
};

// Get all vendors
export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single vendor by ID
export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update vendor by ID
export const updateVendor = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      address: req.body.address,
      occupation: req.body.occupation,
      email: req.body.email,
      description: req.body.description, // Ensure description is included here
      location: req.body.location,       // Ensure location is included here
      category: req.body.category,       // Ensure category is included here
      image: req.body.image,
      gallery: req.body.gallery,
    };

    const vendor = await Vendor.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete vendor by ID
export const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
