import { useEffect, useState } from "react";
import API from "../services/api";
import AddVehicle from "./AddVehicle";
import BookService from "./BookService";
import MyBookings from "../components/MyBookings";
import "./../styles/dashboard.css";

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/vehicles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVehicles(res.data.vehicles);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          AutoServe
        </div>

        <div className="menu-item">
          🏠 Dashboard
        </div>

        <div className="menu-item">
          🚗 My Vehicles
        </div>

        <div className="menu-item">
          📅 Book Service
        </div>

        <div className="menu-item">
          📋 My Bookings
        </div>

        <div className="menu-item">
          👤 Profile
        </div>

        <div className="menu-item">
          🚪 Logout
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">

        <h1 className="welcome">
          Welcome Back, Rithik
        </h1>

        {/* Add Vehicle Form */}
        <AddVehicle />

        <br />

        {/* Book Service Form */}
        <BookService />

        <br />

        {/* Stats Cards */}
        <div className="stats">

          <div className="stat-card">
            <h3>Vehicles</h3>
            <p>{vehicles.length}</p>
          </div>

          <div className="stat-card">
            <h3>Bookings</h3>
            <p>0</p>
          </div>

          <div className="stat-card">
            <h3>Pending</h3>
            <p>0</p>
          </div>

          <div className="stat-card">
            <h3>Completed</h3>
            <p>0</p>
          </div>

        </div>

        {/* Vehicle Section */}
        <div className="vehicle-section">

          <h2>My Vehicles</h2>

          <br />

          <div className="vehicle-grid">

            {vehicles.length === 0 ? (
              <p>No vehicles added yet.</p>
            ) : (
              vehicles.map((vehicle) => (
                <div
                  className="vehicle-card"
                  key={vehicle._id}
                >
                  <h3>
                    {vehicle.brand} {vehicle.model}
                  </h3>

                  <p>
                    Year: {vehicle.year}
                  </p>

                  <p>
                    Fuel: {vehicle.fuelType}
                  </p>

                  <p>
                    Registration: {vehicle.registrationNumber}
                  </p>

                  <p>
                    Vehicle ID: {vehicle._id}
                  </p>
                </div>
              ))
            )}

          </div>

        </div>

        {/* My Bookings Section */}
        <MyBookings />

      </div>

    </div>
  );
}

export default Dashboard;