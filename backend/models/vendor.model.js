import mongoose from "mongoose";

// Define the schema
const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",  
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/300x200",
  },
  gallery: {
    type: [String],
    default: [],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"], // Simple email validation
  },
  // Modified category field for flexibility
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
