import { CSA_plans } from "../models/subscriptionCSA.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"; // Assuming you have a User model
export const subscriptionNew = asyncHandler(async (req, res) => {
    try{
    const { farmerId , product_culivated ,total_estimated_price ,initial_price , estimated_time_of_produce , subscribers } = req.body;

    // if(
    //     [farmerId , product_culivated ,total_estimated_price ,initial_price , estimated_time_of_produce , subscribers].some( (field) => {
    //     field?.trim() === ""
    //     }) 
    // ){
    //     throw new ApiError(400,"name,username,password,email are required!")
    //     // return res.status(400).json({
    //     //     statuscode : 400,
    //     //     message:"all fields are required!"
    //     // })
    // }

    const newSubscription = new CSA_plans({
        farmerId , 
        product_culivated,
        total_estimated_price ,
        initial_price , 
        estimated_time_of_produce 
    });

    try {
        await newSubscription.save();
        return res.status(201).json({
            newSubscription,
            message:"subscription plan added successfully!"
        });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(409).json(new ApiResponse(
                409,
                null,
                "Duplicate key error/Username , email or phonenumber already exists!"
            ));
        }
        return res.status(500).json({
            message : "internal server errors"
        });
    }
}catch(err){
    console.log(err);
    return res.status(501).json({
        message : "internal server error"
    })
}
});

export const getAllPlansByFarmerId = async (req, res) => {
    try {
      const farmerId = req.params.farmerId;
      
      const subscriptionPlans = await CSA_plans.find({ farmerId })
        .populate('farmerId', 'username,name,password,gender , address,pincode,state,email,farmingCertifications,farmingDetails,phoneNumber');
  
      if ( !subscriptionPlans ) {
        return res.status(404).json({ message: 'no subscription found for this farmer' });
      }

      if ( subscriptionPlans.length === 0 ) {
        return res.status(404).json({ message: 'subscription db is empty!' });
      }
  
      return res.status(200).json(subscriptionPlans);
    } catch (error) {
      console.error('Error retrieving cart:', error.message);
      res.status(500).json({ message: 'Error retrieving cart', error: error.message });
    }
  };

// Controller to get all delivery partners
export const getAllSubscriptions = asyncHandler(async (req, res) => {
    const allSubscriptions = await CSA_plans.find();
  
    if (!allSubscriptions || allSubscriptions.length === 0) {
        throw new ApiError("No orders found", 404);
    }
  
    return res.status(200).json({allSubscriptions});
  });


export const subscribeToCSA = asyncHandler(async (req, res) => {
    try {
        const { planId, username , email } = req.body;  // Get login details from the body

        // Find the user by email (or username) and validate password
        const user = await User.findOne({ $or : [{username} , {email}] });
        if (!user) { // Assuming you have a password check method
            return res.status(401).json({
                message: "Invalid login credentials",
            });
        }

        // Find the CSA plan by planId
        const csaPlan = await CSA_plans.findById(planId);
        if (!csaPlan) {
            return res.status(404).json({
                message: "CSA Plan not found",
            });
        }


        // Check if the subscriber (user) is already in the subscribers array
        const isAlreadySubscribed = csaPlan.subscribers.some(
            (subscriber) => subscriber.userId.toString() === user._id.toString()
        );

        if (isAlreadySubscribed) {
            return res.status(400).json({
                message: "Subscriber already added to this plan",
            });
        }

        // Dummy payment process (simulate payment success or failure)
        const paymentSuccess = true; // Simulate successful payment (can be set to false for failure)

        if (!paymentSuccess) {
            return res.status(400).json({
                message: "Payment failed. Please try again."
            });
        }

        // Add the userId (subscriber) to the subscribers array after mock payment success
        csaPlan.subscribers.push({
            userId: user._id,
        });

        // Save the updated CSA plan
        await csaPlan.save();

        return res.status(200).json({
            message: "Subscriber added successfully to the CSA plan!",
            csaPlan,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

 


