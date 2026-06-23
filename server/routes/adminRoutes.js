const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getAllVehicles,
  getAllBookings,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/vehicles", protect, adminOnly, getAllVehicles);
router.get("/bookings", protect, adminOnly, getAllBookings);

module.exports = router;