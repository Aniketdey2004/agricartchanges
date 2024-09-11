import { Router } from 'express';
import {
    addUser,
    //registerUser,
    getUserDetails,
    getAllUsers,
    updateUser,
    deleteUser,  // Import the new controller function
    loginUser,
    logOutUser
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// router.route("/register").post(
//     // upload.fields([
//     //     {
//     //         name : coverImage,
//     //         maxCount : 1
//     //     }
//     // ]),//accepts arrays of info
//     registerUser
// ); //http://localhost:8000/api/v1/users/register 
//works perfectly fpr registered user.. is user is not present or any credential is wrong server access is denied

//router.route("/login").post(login); ////http://localhost:8000/api/v1/users/login

router.post('/register', addUser);//http://localhost:3026/api/v1/users/register
router.post("/login",loginUser);//http://localhost:3026/api/v1/users/login
// router.get("/logout",verifyJWT,logOutUser)
router.post("/logout",logOutUser)//http://localhost:3026/api/v1/users/logout
// router.post("/login",loginUser);
router.get('/', getAllUsers);//http://localhost:3026/api/v1/users
router.get('/:userId', getUserDetails);//http://localhost:3026/api/v1/users/:userId
router.patch('/:userId', updateUser);//http://localhost:3026/api/v1/users/:userId
router.get('/:userId', deleteUser);//http://localhost:3026/api/v1/users/:userId


//exporting the router
export default router;
