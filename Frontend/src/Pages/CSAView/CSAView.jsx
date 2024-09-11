import React from 'react';
import './CSAView.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { useLocation } from 'react-router-dom';

export default function CSAView() {
    const location = useLocation();
    const details = location.state?.details;

    return (
        <>
            <Navbar />
            <div className="c-wrapper">
                <div className="c-container">
                    <h1 className="c-product-name">{details.product_culivated.productName}</h1>
                    <p className="c-category">{details.product_culivated.category}</p>

                    <div className="c-details-grid">
                        <div className="c-detail-card">
                            <h4>Product Description</h4>
                            <p>{details.product_culivated.description}</p>
                        </div>
                        <div className="c-detail-card">
                            <h4>Growing Practices</h4>
                            <p>{details.product_culivated.growingPractices}</p>
                        </div>
                        <div className="c-detail-card">
                            <h4>Place of Origin</h4>
                            <p>{details.product_culivated.placeOfOrigin}</p>
                        </div>
                        <div className="c-detail-card">
                            <h4>Estimated Units</h4>
                            <p>{details.product_culivated.estimated_units} Kg</p>
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

                    <button className="c-subscribe-btn">Subscribe Now</button>
                </div>
            </div>
            <Footer />
        </>
    );
}
