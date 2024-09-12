import React, { useState, useContext } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './management.css';

const Management = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartOrders, setCartOrders] = useState([]); // This will store the entire cart data from the console output
  const loggedData = useContext(UserContext);
  const [buttonVisible, setButtonVisible] = useState(true);

  const farmer = loggedData?.loggedUser?.loggedInFarmer || {
    username: 'Unknown Farmer',
    email: 'Unknown Email',
  };

  // Fetch subscriptions
  const fetchSubscriptions = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3026/api/v1/subscriptions/${loggedData.loggedUser.loggedInFarmer._id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
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
  };

  // Display cart after subscribing
  const displayCart = () => {
    fetch("http://localhost:3026/api/v1/orders/farmer", {
      method: "POST",
      body: JSON.stringify(farmer),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched cart data:", data);
        if (data && Array.isArray(data)) {
          setCartOrders(data); // Set the entire response array to cartOrders state
        }
        setShowCart(true);
      })
      .catch((err) => {
        console.error("Error fetching cart data:", err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="management-container">
        <h1 className="heading">Order Management</h1>
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
                        <p><strong>Product Name:</strong> {subscription.product_culivated?.productName || 'N/A'}</p>
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

        <h1 className="heading">Cart</h1>
        <button className="display-cart-btn" onClick={displayCart}>
          Display Cart Items
        </button>

        {showCart && (
          <div className="cart-section">
            {cartOrders.length > 0 ? (
              cartOrders.map((order) => (
                <div key={order._id} className="cart-order">
                  <h3>Order ID: {order._id}</h3>
                  <p><strong>User ID:</strong> {order.userId}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                  <p><strong>Pincode:</strong> {order.pincode}</p>
                  <div className="cart-products">
                    <h4>Products:</h4>
                    {order.products.length > 0 ? (
                      order.products.map((product) => (
                        <div key={product._id} className="cart-product-item">
                          <p><strong>Product ID:</strong> {product.productId?._id || 'N/A'}</p>
                          <p><strong>Quantity:</strong> {product.quantity}</p>
                        </div>
                      ))
                    ) : (
                      <p>No products in this order.</p>
                    )}
                  </div>
                  <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                  <hr />
                </div>
              ))
            ) : (
              <p>No orders found in the cart.</p>
            )}
          </div>
        )}

        <h1 className="heading">CSA Add Form</h1>
        <Link to="/csa-plan-add">
          <button className="csa-add-button">Add CSA Plan</button>
        </Link>

        <h1 className="heading">Add Product Form</h1>
        <Link to="/product-add">
          <button className="product-add">List your produce</button>
        </Link>

      </div>
      <Footer />
    </>
  );
};

export default Management;