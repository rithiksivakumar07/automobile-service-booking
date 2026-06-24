import { useState } from "react";
import API from "../services/api";

function AddVehicle() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    registrationNumber: "",
    fuelType: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/vehicles",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Vehicle Added Successfully");
      window.location.reload();

      console.log(res.data);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to add vehicle"
      );
    }
  };

  return (
    <div>
      <h1>Add Vehicle</h1>

      <input
        type="text"
        name="brand"
        placeholder="Brand"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="model"
        placeholder="Model"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="year"
        placeholder="Year"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="registrationNumber"
        placeholder="Registration Number"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="fuelType"
        placeholder="Fuel Type"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Add Vehicle
      </button>
    </div>
  );
}

export default AddVehicle;