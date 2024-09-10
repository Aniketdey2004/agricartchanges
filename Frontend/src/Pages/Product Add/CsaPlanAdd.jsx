import { useContext, useState } from 'react';
import './csaplanadd.css';
import { UserContext } from '../../contexts/UserContext';

export default function CSAPlanAdd() {
  const loggedData= useContext(UserContext)
  const [formData, setFormData] = useState({
    farmerId: loggedData.loggedUser.loggedInFarmer._id,
    productName: "",
    description: "",
    growingPractices: "",
    category: "",
    placeOfOrigin: "",
    estimated_units: "",
    total_estimated_price: "",
    initial_price: "",
    estimated_time_of_produce: "",
  });

  function submitForm(event) {
    event.preventDefault();

    const data = {
      farmerId: formData.farmerId,
      product_culivated: {
        productName: formData.productName,
        description: formData.description,
        growingPractices: formData.growingPractices,
        category: formData.category,
        placeOfOrigin: formData.placeOfOrigin,
        estimated_units: formData.estimated_units,
      },
      total_estimated_price: formData.total_estimated_price,
      initial_price: formData.initial_price,
      estimated_time_of_produce: formData.estimated_time_of_produce,
    };

    fetch("http://localhost:3026/api/v1/subscriptions/addSubscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Send the structured data as JSON
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleInput(event) {
    setFormData((prevDetails) => ({
      ...prevDetails,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <>
      <form className="add-form" onSubmit={submitForm}>

        <div className="division">
          <label className="add-form-label">Product Name:</label>
          <input type="text" className="add-form-input" name="productName" onChange={handleInput} required />
        </div>

        <div className="division">
          <label className="add-form-label">Description:</label>
          <textarea className="add-form-text" name="description" onChange={handleInput} required />
        </div>

        <div className="division">
          <label className="add-form-label">Growing Practices:</label>
          <input type="text" className="add-form-input" name="growingPractices" onChange={handleInput} required />
        </div>

        <div className="division">
          <label className="add-form-label">Category:</label>
          <select className="add-form-options" name="category" onChange={handleInput} required>
            <option value="">Select a Category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Grains">Grains</option>
            <option value="Pulses">Pulses</option>
            <option value="Fruits">Fruits</option>
            <option value="Spices">Spices</option>
          </select>
        </div>

        <div className="division">
          <label className="add-form-label">Place of Origin:</label>
          <input type="text" className="add-form-input" name="placeOfOrigin" onChange={handleInput} required />
        </div>

        <div className="division">
          <label className="add-form-label">Estimated Units:</label>
          <input type="number" className="add-form-input" name="estimated_units" onChange={handleInput} required />
        </div>

        <div className="division">
          <label className="add-form-label">Total Estimated Price:</label>
          <input type="number" className="add-form-input" name="total_estimated_price" onChange={handleInput} required />
        </div>

        <div className="division">
          <label className="add-form-label">Initial Price:</label>
          <input type="number" className="add-form-input" name="initial_price" onChange={handleInput} required />
        </div>

        <div className="division">
          <label className="add-form-label">Estimated Time of Produce:</label>
          <input type="text" className="add-form-input" name="estimated_time_of_produce" onChange={handleInput} required />
        </div>

        <button className="add-button" type="submit">Submit Plan</button>
      </form>
    </>
  );
}
