const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");

// Book Service
const createBooking = async (req, res) => {
  try {
    const {
      vehicle,
      serviceType,
      bookingDate,
      timeSlot,
    } = req.body;

    // Check vehicle belongs to user
    const existingVehicle = await Vehicle.findOne({
      _id: vehicle,
      user: req.user.id,
    });

    if (!existingVehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      vehicle,
      serviceType,
      bookingDate,
      timeSlot,
    });

    res.status(201).json({
      success: true,
      message: "Service booked successfully",
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    }).populate("vehicle");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "Cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
};