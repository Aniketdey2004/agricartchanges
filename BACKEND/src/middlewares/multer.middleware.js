// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {//req get all the request and if some file is being uploaded that can also be stored. reason why we use multer 
//       //cb(null, 'Agricart/BACKEND/uploads')
//       cb(null, 'C:/Agricart/uploads')
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, file.originalname)//here we upload the folder as its original name which will temporarily be uploadedto cloudede and then stored in the desired area. Use the documentation to customize accoridng to needs
//     }
//   })
  
// export const upload = multer({ 
//     storage:storage, 
// })

import multer from "multer";
import { Product } from "../models/stock.model.js"
import { app } from "../app.js"
import { Router } from "express"
// Set up the storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder for uploads
        cb(null, 'C:/Agricart/Frontend/public');
    },
    filename: function (req, file, cb) {
        // Store the file with its original name
        cb(null, file.originalname);

        // Save the relative path from the 'public' folder onwards in req.filePath
        const relativePath = `../../.././public/${file.originalname}`;
        req.filePath = relativePath;
    }
});

// Export the upload function
export const upload = multer({ 
    storage: storage,
});

// Example of saving the relative path to the database
// Assuming you're using Mongoose and have a Product model
//import Product from '../models/stock.model.js';

const router = Router();
router.post('/upload', upload.single('photo'), async (req, res) => {
  
  const { Mrp, description, units, date_of_produce, growing_practices, place_of_origin, product_id, seller_name, sellerDetails ,  category } = req.body;
    try {
        // Save the product details including the relative path to the image
        const newStock = new Product({
            //...req.body,  // Other product details from the request body
            
            photo: req.filePath, 
            Mrp,
            description,
            units,
            date_of_produce,
            growing_practices,
            place_of_origin,
            product_id,
            seller_name,
            sellerDetails,
            category // Save the relative path to the photo
        });
        
        await newStock.save();
        res.status(201).send(newStock);
    } catch (err) {
      console.log(err)
        return res.status(500).json({ error: 'Failed to save product' });
    }
});

export default router