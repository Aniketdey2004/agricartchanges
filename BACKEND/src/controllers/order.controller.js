import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from '../models/order.model.js';
import { Product } from '../models/stock.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";
// Create a new order
const createOrder = async (req, res) => {
  const session = await Order.startSession();
  session.startTransaction();
  try {
    const { userId, products, address, pincode } = req.body;
    let totalAmount = 0;
    const productUpdates = [];

    // // Validate address
    // if (!address || typeof address !== 'object') {
    //   throw new Error('Address must be a valid object');
    // }

    // Calculate the total amount and check stock availability
    for (const item of products) {
      const product = await Product.findById(item.productId).session(session);

      if (!product) throw new Error(`Product with ID ${item.productId} not found`);

      if (typeof product.Mrp !== 'number' || isNaN(product.Mrp) || product.Mrp <= 0) {
        throw new Error(`Product ${product.product_id || item.productId} has an invalid price`);
      }

      if (product.units < item.quantity) throw new Error(`Not enough stock for ${product.description || item.productId}`);

      totalAmount += product.Mrp * item.quantity;

      productUpdates.push({
        updateOne: {
          filter: { _id: product._id },
          update: { $inc: { units: -item.quantity } },
        },
      });
    }

    // Create order in the database
    const order = new Order({
      userId,
      products,
      totalAmount,
      address,
      pincode
      // address: {
      //   street: address.street,
      //   city: address.city,
      //   state: address.state,
      //   zip: address.zip,
      //   country: address.country,
      // },
      // paymentDetails: {
      //   paymentMethod,
      //   status: 'Paid', // Assuming payment is successful
      //   transactionId: "dummyTransactionId", // Replace with actual transaction ID if available
      // },
    });

    await order.save({ session });
    await Product.bulkWrite(productUpdates, { session });

    await session.commitTransaction();
    session.endSession();

    return ApiResponse.success(res, 201, 'Order created successfully', { order });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return ApiResponse.error(res, 500, 'Error creating order', error.message);
  }
};
// Get an order by ID
// const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.orderId)
//     //.populate('products.productId');
//     if (!order) return ApiResponse.error(res, 404, 'Order not found');

//     return ApiResponse.success(res, 200, 'Order retrieved successfully', { order });
//   } catch (error) {
//     return ApiResponse.error(res, 500, 'Error retrieving order', error.message);
//   }
// };

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) return ApiResponse.error(res, 404, 'Order not found');

    return ApiResponse.success(res, 200, 'Order status updated', { order });
  } catch (error) {
    return ApiResponse.error(res, 500, 'Error updating order status', error.message);
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(req.params.orderId).session(session);
    if (!order) return ApiResponse.error(res, 404, 'Order not found');

    const productUpdates = order.products.map((item) => ({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { units: item.quantity } },
      },
    }));

    await Order.findByIdAndDelete(req.params.orderId).session(session);
    await Product.bulkWrite(productUpdates, { session });

    await session.commitTransaction();
    session.endSession();

    return ApiResponse.success(res, 200, 'Order deleted and stock restored successfully');
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return ApiResponse.error(res, 500, 'Error deleting order', error.message);
  }
};

// Controller to get all delivery partners
const getAllOrders = asyncHandler(async (req, res) => {
  const allOrders = await Order.find();

  if (!allOrders || allOrders.length === 0) {
      throw new ApiError("No orders found", 404);
  }

  return res.status(200).json({allOrders});
});

//get order by user id
const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ userId })
      .populate('userId', 'username name gender address pincode email phoneNumber')
      .populate({
        path: 'products.productId',
        select: 'photo description Mrp ', // Include photo in the selection
      });

    if (orders.length === 0 ) {
      return res.status(404).json({ message: 'Order not found for this user' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error retrieving cart:', error.message);
    res.status(500).json({ message: 'Error retrieving cart', error: error.message });
  }
};

import { Farmer } from '../models/farmer.model.js';  // Adjust the import based on your project structure

// const getOrderByFarmerId = async (req, res) => {
//   try {
//     const { email, username } = req.body;  // Get email and username from request body

//     // Find the farmer using email and username
//     const farmer = await Farmer.findOne({ email, username });
//     if (!farmer) {
//       return res.status(404).json({ message: 'Farmer not found' });
//     }

//     const farmerId = farmer._id;  // Get farmerId from the found farmer document

//     // Find orders by farmerId
//     const orders = await Order.find({ farmerId })  // Query based on farmerId
//       .populate('farmerId', 'name farmName address email phoneNumber')  // Populating farmer details
//       .populate({
//         path: 'products.productId',
//         select: 'photo description Mrp',  // Select photo, description, Mrp for products
//       });

//     if (orders.length === 0) {
//       return res.status(404).json({ message: 'No orders found for this farmer' });
//     }

//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error('Error retrieving orders:', error.message);
//     res.status(500).json({ message: 'Error retrieving orders', error: error.message });
//   }
// };
export const getOrdersByFarmerId = async (req, res) => {
  try {
    const { email, username } = req.body;  // Get email and username from request body

    // Step 1: Find the farmer using email and username
    const farmer = await Farmer.findOne({ email, username });
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    const farmerId = farmer._id;  // Get farmerId from the found farmer document

    // Step 2: Find all products listed by this farmer
    const products = await Product.find({ sellerDetails: farmerId });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this farmer' });
    }

    const productIds = products.map(product => product._id);  // Extract product IDs

    // Step 3: Find all orders containing these products
    const orders = await Order.find({ 'products.productId': { $in: productIds } })
      .populate('products.productId', 'photo description Mrp')  // Populate product details
      .populate({
        path: 'products.productId',
        populate: {
          path: 'sellerDetails',
          select: 'name farmName address email phoneNumber'
        }
      });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for these products' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error.message);
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
};



export { createOrder , getOrderByUserId , updateOrderStatus , deleteOrder , getAllOrders };
