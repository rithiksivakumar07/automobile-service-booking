import { useState } from "react";
import API from "../services/api";

function BookService() {
  const [serviceType, setServiceType] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [vehicleId, setVehicleId] = useState("");

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/bookings",
        {
          vehicle: vehicleId,
          serviceType,
          bookingDate,
          timeSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Service Booked Successfully");
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert("Booking Failed");
    }
  };

  return (
    <div className="vehicle-card">
      <h2>Book Service</h2>

      <input
        placeholder="Vehicle ID"
        onChange={(e) => setVehicleId(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Service Type"
        onChange={(e) => setServiceType(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        onChange={(e) => setBookingDate(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Time Slot"
        onChange={(e) => setTimeSlot(e.target.value)}
      />

      <br /><br />

      <button onClick={handleBooking}>
        Book Service
      </button>
    </div>
  );
}

export default BookService;