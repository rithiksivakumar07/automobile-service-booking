import { useEffect, useState } from "react";
import API from "../services/api";

function VehicleList() {
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

  const deleteVehicle = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/vehicles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Vehicle Deleted");

      fetchVehicles();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>My Vehicles</h2>

      {vehicles.map((vehicle) => (
        <div key={vehicle._id}>
          <p>
            {vehicle.brand} - {vehicle.model}
          </p>

          <button
            onClick={() => deleteVehicle(vehicle._id)}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default VehicleList;