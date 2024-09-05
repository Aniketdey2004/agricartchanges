import { CSA_plans } from "../models/csa_plan.model";
import { Farmer } from "../models/farmer.model.js";
import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const subscriptionNew = asyncHandler(async (req, res) => {
    const { farmerId , product_culivated ,total_estimated_price ,initial_price , estimated_time_of_produce , subscribers } = req.body;

    if(
        [farmerId , product_culivated ,total_estimated_price ,initial_price , estimated_time_of_produce , subscribers].some( (field) => {
        field?.trim() === ""
        }) 
    ){
        //throw new ApiError(400,"name,username,password,email are required!")
        return res.status(400).json({
            statuscode : 400,
            message:"all fields are required!"
        })
    }

    const { subscriptionId } = req.params.subscriptionId;

    const existedSubscription = await CSA_plans.exists({_id : subscriptionId})
    if (existedSubscription) {
        return res.status(409).json({
            statuscode:409,
            message : "this plan already exists!"
    });
    }

    const newSubscription = new CSA_plans({
        farmerId , 
        product_culivated ,
        total_estimated_price ,
        initial_price , 
        estimated_time_of_produce , 
        subscribers
    });

    try {
        await newSubscription.save();
        return res.status(201).json({
            newSubscription,
            message:"subscription plan added successfully"
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
});

export default {
    subscriptionNew ,
}