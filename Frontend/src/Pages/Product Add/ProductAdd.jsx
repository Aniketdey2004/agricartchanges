import React, { useState, useContext } from 'react';
import './productadd.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { UserContext } from '../../contexts/UserContext';

export default function ProductAdd() {
  const loggedData = useContext(UserContext);

  const [formData, setFormData] = useState({
    photo: "",
    Mrp: "",
    description: "",
    units: "",
    date_of_produce: "",
    growing_practices: "",
    place_of_origin: "",
    product_id: "",
    seller_name: "",
    category: "", 
    sellerDetails: loggedData.loggedUser.loggedInFarmer._id // Use loggedData for sellerDetails
  });

  const [image, setImage] = useState(null);

  function submitForm(event) {
    event.preventDefault();
    
    const data = new FormData();
    data.append("photo", image); // Add the image file to the form data
    data.append("Mrp", formData.Mrp);
    data.append("description", formData.description);
    data.append("units", formData.units);
    data.append("date_of_produce", formData.date_of_produce);
    data.append("growing_practices", formData.growing_practices);
    data.append("place_of_origin", formData.place_of_origin);
    data.append("product_id", formData.product_id);
    data.append("seller_name", formData.seller_name);
    data.append("category", formData.category);
    data.append("sellerDetails", formData.sellerDetails); // Append sellerDetails to the form data

    fetch("http://localhost:3026/api/v1/multer/upload", {
      method: "POST",
      body: data, // Send the FormData object
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onInputChange(event) {
    setImage(event.target.files[0]); // Set the image file to state
  }

  function handleInput(event) {
    setFormData((prevDetails) => ({
      ...prevDetails,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <>
      <Navbar />
      <form className="add-form" onSubmit={submitForm}>
        <div className='division'>
          <input
            className="add-form-input"
            type="file"
            accept="image/*"
            onChange={onInputChange}
          />
        </div>
        <div className='division'>
          <label className='add-form-label'>MRP:</label>
          <input
            type="number"
            className="add-form-input mrp-input"
            onChange={handleInput}
            name="Mrp"
            value={formData.Mrp}
            required
          />
        </div>
        <div className='division'>
          <label className='add-form-label'>Category:</label>
          <select
            className="add-form-options"
            name="category"
            onChange={handleInput}
            value={formData.category}
            required
          >
            <option value="">Select a Category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Grains">Grains</option>
            <option value="Pulses">Pulses</option>
            <option value="Fruits">Fruits</option>
            <option value="Spices">Spices</option>
          </select>
        </div>
        <div className='division'>
          <label className='add-form-label'>Description:</label>
          <textarea
            className='add-form-text'
            name="description"
            onChange={handleInput}
            value={formData.description}
          />
        </div>
        <div className='division'>
          <label className='add-form-label'>Units:</label>
          <input
            type="number"
            className="add-form-input units-input"
            name="units"
            onChange={handleInput}
            value={formData.units}
            required
          />
        </div>
        <div className='division'>
          <label className='add-form-label'>Date of Produce:</label>
          <input
            type="date"
            className="add-form-input date-input"
            name="date_of_produce"
            onChange={handleInput}
            value={formData.date_of_produce}
            required
          />
        </div>
        <div className='division'>
          <label className='add-form-label'>Growing Practices:</label>
          <input
            type="text"
            className="add-form-input growing-practices-input"
            name="growing_practices"
            onChange={handleInput}
            value={formData.growing_practices}
            required
          />
        </div>
        <div className='division'>
          <label className='add-form-label'>Place of Origin:</label>
          <input
            type="text"
            className="add-form-input origin-input"
            name="place_of_origin"
            onChange={handleInput}
            value={formData.place_of_origin}
            required
          />
        </div>
        <div className='division'>
          <label className='add-form-label'>Product ID:</label>
          <input
            type="text"
            className="add-form-input product-id-input"
            onChange={handleInput}
            name="product_id"
            value={formData.product_id}
            required
          />
        </div>
        <div className='division'>
          <label className='add-form-label'>Seller Name:</label>
          <input
            type="text"
            className="add-form-input seller-name-input"
            onChange={handleInput}
            name="seller_name"
            value={formData.seller_name}
            required
          />
        </div>
        <button className="add-button" type="submit">
          Submit Form
        </button>
      </form>
      <Footer />
    </>
  );
}
