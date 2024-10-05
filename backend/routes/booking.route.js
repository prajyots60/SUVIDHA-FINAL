import express from "express";
import { createBooking, getBookingById, updateBooking, deleteBooking, getUserBookings } from "../controllers/booking.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/",authenticateUser, createBooking); // Create a new booking
// router.get("/:id", getBookingById); // Get a booking by ID
router.get("/all-bookings",authenticateUser ,getUserBookings);
router.put("/:id", updateBooking); // Update a booking by ID
router.delete("/:id", deleteBooking); // Delete a booking by ID

export default router;
