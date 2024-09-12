import { Router } from 'express';
import {
    addFarmer,
    loginFarmer,
    logoutFarmer,
    getFarmerDetails,
    getAllFarmers,
    updateFarmer,
    deleteFarmer
} from "../controllers/farmer.controller.js";

const router = Router();

//add new farmer 
router.post('/registerFarmer', addFarmer);
http://localhost:3026/api/v1/farmers/registerFarmer

//login farmer
router.post('/loginFarmer', loginFarmer);
//http://localhost:3026/api/v1/farmers/loginFarmer

//logout farmer
router.post('/logoutFarmer', logoutFarmer);
//http://localhost:3026/api/v1/farmers/logoutFarmer

//get all farmer details
router.get('/', getAllFarmers);
//http://localhost:3026/api/v1/farmers

//get farmer details by id
router.get('/:farmerId', getFarmerDetails);
//http://localhost:3026/api/v1/farmers/:farmerId

//update farmer details
router.patch('/:farmerId', updateFarmer);
//http://localhost:3026/api/v1/farmers/:farmerId

//delete a farmer
router.delete('/:farmerId', deleteFarmer);
//http://localhost:3026/api/v1/farmers/:farmerId
export default router;
