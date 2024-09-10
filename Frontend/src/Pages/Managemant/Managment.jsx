import React from 'react'
import { useState,useContext } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './management.css'
const Managment = () => {
    const [subscriptions, setSubscriptions] = useState([]);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const loggedData = useContext(UserContext);
  const [buttonVisible, setButtonVisible] = useState(true); 
  function fetchSubscriptions(event) {
    event.preventDefault();
    fetch(`http://localhost:3026/api/v1/subscriptions/${loggedData.loggedUser.loggedInFarmer._id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log(data);
          setSubscriptions(data);
          setShowSubscriptions(true);
          setButtonVisible(false);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching subscriptions:", error);
      });
  }
  return (
    <>
    <Navbar/>
    <h1 className='heading'>Order management</h1>
    <div className="farmer-profile-page">
        <div className="profile-container">
        {buttonVisible && (
            <button className="show-subscriptions-btn" onClick={fetchSubscriptions}>
              Show All Subscriptions
            </button>
          )}
          {showSubscriptions && (
            <div className="subscriptions-section">
              <h2>Subscription Plans</h2>
              {subscriptions.length > 0 ? (
                <div className="subscriptions-list">
                  {subscriptions.map((subscription) => (
                    <div key={subscription._id} className="subscription-item">
                      <p><strong>Subscription ID:</strong> {subscription._id}</p>
                      <p><strong>Product Name:</strong> {subscription.product_culivated.productName}</p>
                      <p><strong>Total Estimated Price:</strong> ₹{subscription.total_estimated_price}</p>
                      <p><strong>Initial Price:</strong> ₹{subscription.initial_price}</p>
                      <p><strong>Estimated Time of Produce:</strong> {subscription.estimated_time_of_produce}</p>
                      <p><strong>Subscribers:</strong> {subscription.subscribers.length}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No subscriptions found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    <h1 className='heading'>Csa add form</h1>
    <Link
    to="/csa-plan-add">
    <button className="csa-add-button">Add CSA Plan</button>
    </Link>
    <h1 className='heading'>Add product form</h1>
    <Link
    to="/product-add">
    <button className="product-add">List your produce</button>
    </Link>
    <h1 className='heading'>Ready form-mail to customer</h1>
    <Footer/>
    </>
    )
}

export default Managment
