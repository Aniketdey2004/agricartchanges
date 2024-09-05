import mongoose from "mongoose";

const { Schema } = mongoose;

const csaPlan = new Schema(
    {
        farmerId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Farmer', // Reference to the User model
            required: true,
        },
        products: [
        {
            description: {
            type: String,
            default: " ",
            required : true,
            },
            growing_practices: {
            type: String,
            required: true,
            },
            place_of_origin: {
            type: String,
            required: true,
            },
            category: {
            type: String,
            enum: ['Grains', 'Pulses', 'Spices','Fruits', 'Vegetables'],
            required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1, // Ensuring at least 1product is ordered
            },
            },
        ],
        subscribers : [
            {
                userId : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User', // Reference to the    User model
                    required: true,
                }
            },
        ]
    },
    {
        timestamps: true,
    }
)

export const csa_plans = mongoose.model('CSA_Plans',csaPlan);
