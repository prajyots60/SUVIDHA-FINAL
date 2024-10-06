import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";

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
    const { id } = req.params; // Destructure id from the request body
    console.log("Received ID:", id); // Debugging line
    
    if (!id) {
      return res.status(400).json({ message: "Booking ID is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Booking ID format." });
    }

    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};



export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure this is populated correctly
    

    // Find all bookings for the current logged-in user
    const bookings = await Booking.find({ userId })
      .populate({
        path: 'vendorId', // Populate vendor details
        select: 'profileImage category', // Fields to select from vendor
        populate: {
          path: 'userId', // Populate user details from vendor
          model: 'User',  // Specify the model to avoid errors
          select: 'name email' // Select only name and email from user
        }
      })
      .select(' id status preferredTime vendorId serviceDate createdAt'); // Select fields from booking

    // console.log(`Found bookings: ${JSON.stringify(bookings)}`);

    // If no bookings found for this user
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    // Construct response with booking history and vendor details
    const userBookings = bookings.map((booking) => ({
      id: booking.id,
      status: booking.status,               // From Booking model
      preferredTime: booking.preferredTime, // From Booking model
      serviceDate: booking.serviceDate,     // Include serviceDate
      createdAt: booking.createdAt,         // Include createdAt
      vendor: {
        name: booking.vendorId?.userId?.name || "Unknown Vendor", // Vendor's name
        email: booking.vendorId?.userId?.email || "Unknown Email", // Vendor's email
        profileImage: booking.vendorId?.profileImage || "default_image.png", // Vendor's profileImage
        category: booking.vendorId?.category || "Unknown Category" // Vendor's category
      }
    }));

    // console.log(`Returning user bookings: ${JSON.stringify(userBookings)}`);

    // Send the response
    return res.status(200).json(userBookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Controller to fetch bookings based on logged-in user
export const fetchVendorBookings = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure this is populated correctly

    // Find the vendorId associated with the userId
    const vendor = await Vendor.findOne({ userId });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Fetch bookings related to this vendorId and populate the user details
    const bookings = await Booking.find({ vendorId: vendor._id })
      .populate({
        path: 'userId', // Populate user details from the booking
        model: 'User',  // Specify the User model to avoid errors
        select: 'id name email' // Select the name and email fields from the user
      })
      .select('id status preferredTime serviceDate userId createdAt'); // Select booking fields

    // If no bookings are found
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this vendor' });
    }

    // Map through bookings to send structured data
    const vendorBookings = bookings.map((booking) => ({
      id: booking.id,
      userId: booking.userId?.id,
      status: booking.status,
      preferredTime: booking.preferredTime,
      serviceDate: booking.serviceDate,
      createdAt: booking.createdAt,
      user: {
        id: booking.userId?.id,
        name: booking.userId?.name || 'Unknown User', // User's name
        email: booking.userId?.email || 'Unknown Email' // User's email
      }
    }));

    // console.log(`Returning vendor bookings: ${JSON.stringify(vendorBookings)}`);

    // Send the response
    return res.status(200).json(vendorBookings);
  } catch (error) {
    console.error('Error fetching vendor bookings:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const updateBookingStatus = async (req , res) => {
  const {bookingId} = req.params;
  const {status} = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {status}, // Update the status field
      // {new: true }   // Return the updated whole document
      {new: true, select: 'status'}    // Return the updated status only
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    console.log("Updated booking status:", updatedBooking);
    // res.status(200).json(updatedBooking);
    res.status(200).json({status: updatedBooking.status});
  } catch (error) {
    console.log("Error updating booking status:", error);
    return res.status(500).json({ message: 'Server error' });
  }
}


