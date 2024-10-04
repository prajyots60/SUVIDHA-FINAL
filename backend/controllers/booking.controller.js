import Booking from "../models/booking.model.js";

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const { vendorId, serviceDate, preferredTime } = req.body;
    const userId = req.user._id; // Assuming the user is authenticated and user info is available on req.user

    // Validate vendor ID (optional but recommended)
    if (!vendorId) {
      return res.status(400).json({ message: "Vendor ID is required" });
    }

    // Create a new booking instance
    const newBooking = new Booking({
      userId,                   // ID of the user who is booking
      vendorId,                 // ID of the vendor whose service is being booked
      name: req.user.name,       // You can also use the user's name
      serviceDate,
      preferredTime,
      status: "Pending",         // Default status
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking); // Respond with the created booking
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
};


// Get a single booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking); // Respond with the booking
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking by ID
export const updateBooking = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      serviceDate: req.body.serviceDate,
      preferredTime: req.body.preferredTime,
      status: req.body.status, // Allow status update
    };

    const booking = await Booking.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking); // Respond with the updated booking
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete booking by ID
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
