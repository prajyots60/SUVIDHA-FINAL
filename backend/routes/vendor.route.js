import express from "express";
import {upload} from "../config/cloudinary.js";
import {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor
} from "../controllers/vendor.controller.js";

const router = express.Router();

// Routes for CRUD operations
// Single image upload (profile) and multiple image upload (gallery)
router.post('/create', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), createVendor);
router.put('/update/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), updateVendor);
router.get("/get", getVendors);              // Get all vendors
router.get("/get/:id", getVendorById);       // Get a vendor by ID

router.delete("/delete/:id", deleteVendor);     // Delete a vendor by ID

export default router;
