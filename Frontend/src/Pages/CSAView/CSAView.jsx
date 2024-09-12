import React, { useState, useContext } from 'react';
import './CSAView.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

export default function CSAView() {
    const location = useLocation();
    const details = location.state?.details;
    const loggedData = useContext(UserContext);
    const [showPopup, setShowPopup] = useState(false);

    // Check if details and loggedData exist before using them
    if (!details) {
        return <p>No details available for this CSA plan.</p>;
    }

    const subscriber = {
        planId: details._id,
        email: loggedData?.loggedUser?.loggedInUser?.email || "No email available",
    };

    const handleClosePopup = () => setShowPopup(false);
    const handleShowPopup = () => setShowPopup(true);

    function addSubscriber() {
        console.log(subscriber);
        fetch('http://localhost:3026/api/v1/subscriptions/subscribeToCSA', {
            method: "POST",
            body: JSON.stringify(subscriber),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            handleClosePopup(); // Close the popup after subscribing
        })
        .catch((err) => {
            console.log("Error subscribing to CSA:", err);
        });
    }

    return (
        <>
            <Navbar />
            <div className="c-wrapper">
                <div className="c-container">
                    <h1 className="c-product-name">{details.product_culivated?.productName}</h1>
                    <p className="c-category">{details.product_culivated?.category}</p>

                    <div className="c-details-grid">
                        <div className="c-detail-card">
                            <h4>Product Description</h4>
                            <p>{details.product_culivated?.description}</p>
                        </div>
                        <div className="c-detail-card">
                            <h4>Growing Practices</h4>
                            <p>{details.product_culivated?.growingPractices}</p>
                        </div>
                        <div className="c-detail-card">
                            <h4>Place of Origin</h4>
                            <p>{details.product_culivated?.placeOfOrigin}</p>
                        </div>
                        <div className="c-detail-card">
                            <h4>Estimated Units</h4>
                            <p>{details.product_culivated?.estimated_units} Kg</p>
                        </div>
                        <div className="c-detail-card">
                            <h4>Total Estimated Price</h4>
                            <p>₹{details.total_estimated_price}</p>
                        </div>
                        <div className="c-detail-card">
                            <h4>Estimated Time of Produce</h4>
                            <p>{details.estimated_time_of_produce}</p>
                        </div>
                    </div>

                    <button className="c-subscribe-btn" onClick={handleShowPopup}>Subscribe Now</button>

                    {/* Custom Pop-up for Pay Now and Cancel */}
                    {showPopup && (
                        <div className="c-popup-overlay">
                            <div className="c-popup">
                                <h2>Proceed to Payment</h2>
                                <p>Are you sure you want to subscribe to this CSA?</p>
                                <div className="c-popup-buttons">
                                    <button className="c-cancel-btn" onClick={handleClosePopup}>
                                        Cancel
                                    </button>
                                    <button className="c-pay-now-btn" onClick={addSubscriber}>
                                        Pay Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
