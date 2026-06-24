import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data.bookings);

    } catch (error) {
      console.error(error);
    }
  };
  const cancelBooking = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      `/bookings/${id}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Booking Cancelled");

    window.location.reload();

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="vehicle-section">

      <h2>My Bookings</h2>

      <br />

      <div className="vehicle-grid">

        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((booking) => (
            <div
              className="vehicle-card"
              key={booking._id}
            >
              <h3>{booking.serviceType}</h3>

              <p>
                Date: {new Date(
                  booking.bookingDate
                ).toLocaleDateString()}
              </p>

              <p>
                Time: {booking.timeSlot}
              </p>

              <p>
                Status: {booking.status}
              </p>
                <button
                    onClick={() => cancelBooking(booking._id)}
                >
                    Cancel Booking
                </button>

              <p>
                Vehicle: {booking.vehicle?.brand}{" "}
                {booking.vehicle?.model}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default MyBookings;