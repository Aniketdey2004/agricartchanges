import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
const Managment = () => {

  return (
    <>
    <Navbar/>
    <h1>Order management</h1>
    <h1>Csa add form</h1>
    <Link
    to="/csa-plan-add">
    <button className="csa-add-button">Add CSA Plan</button>
    </Link>
    <h1>Add product form</h1>
    <Link
    to="/product-add">
    <button className="product-add">List your produce</button>
    </Link>
    <h1>Ready form-mail to customer</h1>
    <Footer/>
    </>
    )
}

export default Managment
