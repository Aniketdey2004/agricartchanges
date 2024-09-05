import React from 'react';
import './Profile.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';
export default function Profile() {
  const loggedData = useContext(UserContext);
  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
          <h1 className="profile-title">Account Details</h1>
          <div className="profile-content">
            <div className="profile-item">
              <span>Name:</span>
              <p>{loggedData.loggedUser.loggedInUser.name}</p>
            </div>
            <div className="profile-item">
              <span>Username:</span>
              <p>{loggedData.loggedUser.loggedInUser.username}</p>
            </div>
            <div className="profile-item">
              <span>Email:</span>
              <p>{loggedData.loggedUser.loggedInUser.email}</p>
            </div>
            <div className="profile-item">
              <span>Phone Number:</span>
              <p>{loggedData.loggedUser.loggedInUser.phoneNumber}</p>
            </div>
            <div className="profile-item">
              <span>Address:</span>
              <p>{loggedData.loggedUser.loggedInUser.address}</p>
            </div>
            <div className="profile-item">
              <span>Pincode:</span>
              <p>{loggedData.loggedUser.loggedInUser.pincode}</p>
            </div>
            <div className="profile-item">
              <span>Gender:</span>
              <p>{loggedData.loggedUser.loggedInUser.gender}</p>
            </div>
            <div className="profile-item">
              <span>Profile Created At:</span>
              <p>{loggedData.loggedUser.loggedInUser.createdAt}</p>
            </div>
            <div className="profile-item">
              <span>Last Updated At:</span>
              <p>{loggedData.loggedUser.loggedInUser.updatedAt}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
