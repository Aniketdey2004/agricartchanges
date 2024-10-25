//***--use diff username , email , phonenumber for new registration--***

import mongoose, { isValidObjectId } from "mongoose";
import { Farmer } from "../models/farmer.model.js";
import { Kisan } from "../models/kisanId.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Controller to add a new farmer
/*
const addFarmer = asyncHandler(async (req, res) => {
    const { username, name, password, gender, address, pincode, state , email, farmingCertifications, farmingDetails, phoneNumber , kisanID } = req.body;

    // if(
    //     [username, name, password, gender, address, pincode, email, farmingCertifications, farmingDetails, phoneNumber, kisanID].some((field) => {
    //     field?.trim() === ""
    //     }) 
    // ){
    //     //throw new ApiError(400,"name,username,password,email are required!")
    //     return res.status(400).json({
    //         statuscode : 400,
    //         message:"all fields are required!"
    //     })
    // }

    // Check if the Kisan ID is valid
    const validKisan = await Kisan.find({ kisanID });
    console.log("Kisan Query Result: ", validKisan); // Log the result
    if (!validKisan) {
        return res.status(400).json({
            statusCode: 400,
            message: "Invalid or non-existent Kisan ID!You are not authorized!",
        });
    }

    const existingFarmer = await Farmer.findOne({ $or: [{ username }, { email }] });
    if (existingFarmer) {
        return res.status(409).json({
            statuscode:409,
            message : "Username or email already exists!"
    });
    }

    const newFarmer = new Farmer({
        username,
        name,
        password,
        gender,
        address,
        pincode,
        state,
        email,
        farmingCertifications,
        farmingDetails,
        phoneNumber,
        kisanID
    });

    try {
        await newFarmer.save();
        return res.status(201).json({
            newFarmer,
            message:"farmer added successfully.farmer is authorized and has valid kisan Id."
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
*/
const addFarmer = asyncHandler(async (req, res) => {
    const { username, name, password, gender, address, pincode, state, email, farmingCertifications, farmingDetails, phoneNumber, kisanID } = req.body;

    // Validate required fields
    if (!username || !name || !password || !gender || !address || !pincode || !state || !email || !farmingCertifications || !farmingDetails || !phoneNumber || !kisanID) {
        return res.status(400).json({
            statuscode: 400,
            message: "All fields are required, including kisanID",
        });
    }

    // Check if the Kisan ID is valid
    const validKisan = await Kisan.find({ kisanID });  // Use findOne instead of find to get a single document
    console.log(kisanID)
    if (!validKisan) {
        return res.status(400).json({
            statusCode: 400,
            message: "Invalid or non-existent Kisan ID! You are not authorized!",
        });
    }

    // Check for existing farmer by username or email
    const existingFarmer = await Farmer.findOne({ $or: [{ username }, { email }] });
    if (existingFarmer) {
        return res.status(409).json({
            statuscode: 409,
            message: "Username or email already exists!",
        });
    }

    // Create the new farmer
    const newFarmer = new Farmer({
        username,
        name,
        password,
        gender,
        address,
        pincode,
        state,
        email,
        farmingCertifications,
        farmingDetails,
        phoneNumber,
        kisanID
    });

    try {
        await newFarmer.save();
        return res.status(201).json({
            newFarmer,
            message: "Farmer added successfully. Farmer is authorized and has a valid Kisan ID.",
        });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(409).json(new ApiResponse(
                409,
                null,
                "Duplicate key error/Username, email, or phone number already exists!"
            ));
        }
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

// Generate access and refresh tokens
    // const generateAccessandRefreshTokenFarmer = async (farmer) => {
    //     try {
    //         const accesstoken = farmer.generateAccessToken();
    //         const refreshtoken = farmer.generateRefreshToken();
    //         farmer.refreshtoken = refreshtoken;
    //         await farmer.save({ validateBeforeSave: false });
            

    //         // Use the tokens directly here
    //         // For example, set them in response headers or any other processing
    //         res.setHeader('Authorization', `Bearer ${accesstoken}`);
    //         res.setHeader('Refresh-Token', refreshtoken);
    //         return { accesstoken, refreshtoken };
    //     } catch (error) {
    //         console.log("server error:  ",501)
    //         throw new ApiError(501, "Something went wrong while generating tokens!");
    //     }
    // };

// Controller for farmer login
const loginFarmer = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        //throw new ApiError(400, "Username or email is required!");
        return res.status(400).json(new ApiResponse(
            400,
            null,
            "Username or email is required!"
        ));
    }

    // Find farmer by username or email
    const farmer = await Farmer.findOne({
        $and: [{ username }, { email }]
    });

    if (!farmer) {
        //throw new ApiError(404, "Farmer does not exist!");
        console.log("User not found! status code 404");
        return res.status(404).json({
            statuscode:404,
            message:"user not found"
        })
    }else{
        // Check if the password is correct
    const isPasswordValid = await farmer.isPasswordCorrect(password);
    if (!isPasswordValid) {
        //throw new ApiError(401, "Password is incorrect!");
        return res.status(401).json(new ApiResponse(
            401,
            null,
            "Password is incorrect!"
        ));
    }
    }

    

    // Generate access and refresh tokens
    const accessToken = farmer.generateAccessToken();
    const refreshToken = farmer.generateRefreshToken();

    // Save refresh token to the farmer's document
    farmer.refreshtoken = refreshToken;
    await farmer.save({ validateBeforeSave: false });

    // Exclude password and refresh token from the response
    const loggedInFarmer = await Farmer.findById(farmer._id).select("-password -refreshtoken");

    // Send tokens and farmer details in the response
    return res.status(200).json({
        loggedInFarmer,
        accessToken,
        refreshToken,
        message : "farmer logged in successfully"
    });
});


// Controller for farmer logout
const logoutFarmer = asyncHandler(async (req, res) => {
    const { username, email } = req.body;

    if (!username && !email) {
        return res.status(400).json({
            message : "Username or email is required!"
        });
    }

    // Find the farmer using both username and email
    const farmer = await Farmer.findOne({
        $and: [{ username }, { email }]
    });

    if (!farmer) {
        return res.status(400).json({
            message : "Farmer not found!"
        });
    }

    try {
        // Unset the refresh token in the database
        await Farmer.findByIdAndUpdate(
            farmer._id,
            {
                $unset: {
                    refreshtoken: 1 // Removes the refresh token field from the document
                }
            },
            {
                new: true
            }
        );

        const options = {
            httpOnly: true,
            secure: true
        };

        // Clear the refresh token cookie
        return res
            .status(200)
            .clearCookie("refreshToken", options)
            .json({
                message: "Farmer logged out successfully"
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, {}, "Internal server error"));
    }
});

// Controller for farmer logout
// const logoutFarmer = asyncHandler(async (req, res) => {
//     await Farmer.findByIdAndUpdate(req.user._id, {
//         $unset: {
//             refreshtoken: 1 // removes the refresh token from the document
//         }
//     }, {
//         new: true
//     });

//     const options = {
//         httpOnly: true,
//         secure: true
//     };

//     res.status(200)
//         .clearCookie("accessToken", options)
//         .clearCookie("refreshToken", options)
//         .json(new ApiResponse("Farmer logged out successfully"));
// });

// // Controller to get details of a specific farmer by ID
// const getFarmerDetails = asyncHandler(async (req, res) => {
//     const { farmerId } = req.params;

//     if (!isValidObjectId(farmerId)) {
//         throw new ApiError("Invalid Farmer ID", 400);
//     }

//     const farmer = await Farmer.findById(farmerId);

//     if (!farmer) {
//         throw new ApiError("Farmer not found", 404);
//     }

//     res.status(200).json(new ApiResponse("Farmer details retrieved successfully", farmer));
// });

// Controller to get details of a specific farmer by ID
const getFarmerDetails = asyncHandler(async (req, res) => {
    const { farmerId } = req.params;

    // if (!isValidObjectId(farmerId)) {
    //     throw new ApiError("Invalid User ID", 400);
    // }

    const farmer = await Farmer.findById(farmerId);

    if (!farmer) {
        throw new ApiError("User not found", 404);
    }

    res.status(200).json(new ApiResponse("farmer details retrieved successfully", farmer));
});

// Controller to get all farmers
const getAllFarmers = asyncHandler(async (req, res) => {
    const allFarmers = await Farmer.find();

    if (!allFarmers || allFarmers.length === 0) {
        throw new ApiError("No farmers found", 404);
    }

    return res.status(200).json(allFarmers);
});

// Controller to update a farmer by ID
const updateFarmer = asyncHandler(async (req, res) => {
    const { farmerId } = req.params;
    const updateData = req.body;

    if (!isValidObjectId(farmerId)) {
        throw new ApiError("Invalid Farmer ID", 400);
    }

    const updatedFarmer = await Farmer.findByIdAndUpdate(farmerId, updateData, { new: true, runValidators: true });

    if (!updatedFarmer) {
        //throw new ApiError("Farmer not found", 404);
        return res.status(404).json({
            message : "Farmer not found"
        })
    }

    return res.status(200).json({
        message : "farmer updates successfully",
        updatedFarmer
    });
});

// Controller to delete a farmer by ID
const deleteFarmer = asyncHandler(async (req, res) => {
    const { farmerId } = req.params;

    if (!isValidObjectId(farmerId)) {
        //throw new ApiError("Invalid Farmer ID", 400);
        return res.status(404).json({
            message : "Invalid farmerId"
        })
    }

    const deletedFarmer = await Farmer.findByIdAndDelete(farmerId);

    //check if deletion was successful or not
    // if (!deletedFarmer) {
    //     throw new ApiError("Farmer not found", 404);
    // }

    res.status(200).json(new ApiResponse("Farmer deleted successfully", deletedFarmer));
});

export {
    addFarmer,
    loginFarmer,
    logoutFarmer,
    getFarmerDetails,
    getAllFarmers,
    updateFarmer,
    deleteFarmer,
};
