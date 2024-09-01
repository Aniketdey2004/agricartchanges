import React, { useState, useEffect } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useLocation } from 'react-router-dom';

export default function Categories() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = currentPage === 1 ? 15 : 9;
    const category = location.state?.categories || '';

    useEffect(() => {
        if (category) {
            fetch(`http://localhost:3026/api/v1/stocks/${category}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(`Data for category ${category}:`, data);
                    setProducts(data);
                })
                .catch((err) => {
                    console.error("Failed to fetch data:", err);
                });
        }
    }, [category]);

    const indexOfLastProduct = currentPage === 1 ? 15 : 15 + (currentPage - 2) * 9 + 9;
    const indexOfFirstProduct = currentPage === 1 ? 0 : 15 + (currentPage - 2) * 9;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil((products.length - 15) / 9) + 1;

    return (
        <>
            <Navbar />
            <div className="category-container my-5"> {/* Updated class name */}
                <h1><strong>{category}</strong></h1>
                <div className="row">
                    {
                        currentProducts.length !== 0 ?
                            currentProducts.map((product, index) => (
                                <ProductCard
                                    key={index}
                                    details={product}
                                />
                            )) :
                            <p>No products available.</p>
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
