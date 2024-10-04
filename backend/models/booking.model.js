import mongoose from "mongoose";

// Define the booking schema
const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  serviceDate: {
    type: Date,
    required: true,
  },
  preferredTime: {
    type: String, // Store time in a string format
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"], // Optional, but useful for admin tracking
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically store the time when booking is created
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
