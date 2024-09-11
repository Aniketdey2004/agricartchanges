import React from "react";
import './CsaCard.css';
import { Link } from "react-router-dom";

export default function CsaCard(props) {
    const cultivatedProduct = props.details?.product_culivated || {}; // Correct spelling here

    function call() {
        console.log(props.details);
    }

    return (
        <>
            {call()}
            <div className="col-md-4 mb-4">
                <div className="csa-card h-100">
                    <div className="csa-card-body">
                        <h5 className="csa-card-title">
                            {cultivatedProduct?.productName || "Product Name Not Available"}
                        </h5>
                        <p className="csa-card-text"><strong>Estimated Time of Produce:</strong> {props.details?.estimated_time_of_produce || "N/A"}</p>
                        <p className="csa-card-text"><strong>Subscription Price:</strong> ₹{props.details?.initial_price || "N/A"}</p>
                        <p className="csa-card-text"><strong>Category:</strong> {cultivatedProduct?.category || "N/A"}</p>
                        <p className="csa-card-text"><strong>Place of Origin:</strong> {cultivatedProduct?.placeOfOrigin || "N/A"}</p>
                        <p className="csa-card-text"><strong>Total Estimated Price:</strong> ₹{props.details?.total_estimated_price || "N/A"}</p>
                    </div>
                    <div className="csa-card-footer">
                        <Link to="/SubscriptionView" state={{ details: props.details }}>
                            <p className="btn btn-success w-100 csa-view">View Subscription</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
