import React, { useState, useEffect } from "react";
import CsaCard from "../../Components/CsaCard/CsaCard";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import './CSA.css';

export default function CSA() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const subscriptionsPerPage = currentPage === 1 ? 15 : 9;

    useEffect(() => {
        fetch(`http://localhost:3026/api/v1/subscriptions/`)
            .then((response) => response.json())
            .then((data) => {
                console.log(`Subscriptions data:`, data);
                setSubscriptions(data.allSubscriptions)
            })
            .catch((err) => {
                console.error("Failed to fetch data:", err);
            });
    }, []);

    // Calculate the subscriptions to display based on the current page
    const indexOfLastSubscription = currentPage === 1 ? 15 : 15 + (currentPage - 2) * 9 + 9;
    const indexOfFirstSubscription = currentPage === 1 ? 0 : 15 + (currentPage - 2) * 9;
    const currentSubscriptions = Array.isArray(subscriptions) ? subscriptions.slice(indexOfFirstSubscription, indexOfLastSubscription) : [];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil((subscriptions.length - 15) / 9) + 1;

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <h1 className="csa-name"><strong>CSA Subscriptions</strong></h1>
                <div className="row">
                {
                    currentSubscriptions.length !== 0 ?
                        currentSubscriptions.map((subscription, index) => (
                            <CsaCard
                                key={index}
                                details={subscription}
                            />
                        )) :
                        <p>No subscriptions available.</p>
                }
                </div>
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        {[...Array(totalPages).keys()].map(pageNumber => (
                            <li key={pageNumber + 1} className={`page-item ${currentPage === pageNumber + 1 ? 'active' : ''}`}>
                                <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(pageNumber + 1)}
                                >
                                    {pageNumber + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <Footer />
        </>
    );
}
