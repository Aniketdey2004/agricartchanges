import { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import './productadd.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';
export default function ProductAdd() {
  const loggedData=useContext(UserContext)
  const [formData, setFormData] = useState({
    Mrp: "",
    description: "",
    units: "",
    date_of_produce: "",
    growing_practices: "",
    place_of_origin: "",
    product_id: "",
    seller_name: "",
    category: "",
    sellerDetails: loggedData.loggedUser.loggedInFarmer._id, // Ensure this is passed correctly
  });
  
  const [image, setImage] = useState(null);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // To disable the submit button if form is invalid
  const [message, setMessage] = useState(""); // For showing success/error message

  const webcamRef = useRef(null);

  // Validate form whenever formData changes
  useEffect(() => {
    const isValid = Object.values(formData).every(field => field !== "");
    setIsFormValid(isValid && image); // Form is valid if all fields are filled and image is selected
  }, [formData, image]);

  function handleInput(event) {
    const { name, value } = event.target;
    setFormData((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  function onInputChange(event) {
    setImage(event.target.files[0]);
  }

  function capture() {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => setImage(blob));
    }
  }

  function toggleMode() {
    setIsCameraMode((prevMode) => !prevMode);
  }

  function submitForm(event) {
    event.preventDefault();

    if (!isFormValid) {
      setMessage("Please fill in all fields and upload a photo.");
      return;
    }

    const data = new FormData();
    if (image) {
      data.append("photo", image);
    }
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    fetch("http://localhost:3026/api/v1/multer/upload", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage("Product added successfully!");
        setFormData({
          Mrp: "",
          description: "",
          units: "",
          date_of_produce: "",
          growing_practices: "",
          place_of_origin: "",
          product_id: "",
          seller_name: "",
          category: "",
          sellerDetails: loggedData.loggedUser.loggedInFarmer._id,
        });
        setImage(null);
      })
      .catch((err) => {
        setMessage("Error submitting the form. Please try again.");
        console.error(err);
      });
  }

  return (
    <>
      <Navbar />
      <form className="add-form" onSubmit={submitForm}>
        <div className="division">
          <label className="add-form-label">Upload Photo:</label>
          <div className="input-container">
            <button type="button" className="toggle-mode-btn" onClick={toggleMode}>
              <FontAwesomeIcon icon={faCamera} size="lg" />
            </button>
            {isCameraMode ? (
              <div className="camera-container">
                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width="100%" />
                <button type="button" onClick={capture}>Capture Photo</button>
                {image && <img src={URL.createObjectURL(image)} alt="Captured" />}
              </div>
            ) : (
              <input className="add-form-input" type="file" accept="image/*" onChange={onInputChange} />
            )}
          </div>
        </div>

        <div className="division">
          <label className="add-form-label">MRP:</label>
          <input type="number" className="add-form-input mrp-input" name="Mrp" onChange={handleInput} value={formData.Mrp} required />
        </div>

        <div className="division">
          <label className="add-form-label">Category:</label>
          <select className="add-form-options" name="category" onChange={handleInput} value={formData.category} required>
            <option value="">Select a Category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Grains">Grains</option>
            <option value="Pulses">Pulses</option>
            <option value="Fruits">Fruits</option>
            <option value="Spices">Spices</option>
          </select>
        </div>

        <div className="division">
          <label className="add-form-label">Description:</label>
          <textarea className="add-form-text" name="description" onChange={handleInput} value={formData.description} />
        </div>

        <div className="division">
          <label className="add-form-label">Units:</label>
          <input type="number" className="add-form-input units-input" name="units" onChange={handleInput} value={formData.units} required />
        </div>

        <div className="division">
          <label className="add-form-label">Date of Produce:</label>
          <input type="date" className="add-form-input date-input" name="date_of_produce" onChange={handleInput} value={formData.date_of_produce} required />
        </div>

        <div className="division">
          <label className="add-form-label">Growing Practices:</label>
          <input type="text" className="add-form-input growing-practices-input" name="growing_practices" onChange={handleInput} value={formData.growing_practices} required />
        </div>

        <div className="division">
          <label className="add-form-label">Place of Origin:</label>
          <input type="text" className="add-form-input origin-input" name="place_of_origin" onChange={handleInput} value={formData.place_of_origin} required />
        </div>

        <div className="division">
          <label className="add-form-label">Product ID:</label>
          <input type="text" className="add-form-input product-id-input" name="product_id" onChange={handleInput} value={formData.product_id} required />
        </div>

        <div className="division">
          <label className="add-form-label">Seller Name:</label>
          <input type="text" className="add-form-input seller-name-input" name="seller_name" onChange={handleInput} value={formData.seller_name} required />
        </div>

        <button className="add-button" type="submit" disabled={!isFormValid}>Submit Form</button>
        {message && <p className="message">{message}</p>}
      </form>
      <Footer />
    </>
  );
}
