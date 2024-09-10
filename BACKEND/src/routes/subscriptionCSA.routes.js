import { Router } from 'express';
import { subscriptionNew , getAllPlansByFarmerId , getAllSubscriptions} from '../controllers/subscriptionCSA.controller.js';

const router = Router();

// Route to add a new subscription by farmer
router.post('/addSubscription', subscriptionNew);
//http://localhost:3026/api/v1/subscriptions/addSubscription

// Route to get all subscriptions by under a farmer
router.get('/:farmerId', getAllPlansByFarmerId);
//http://localhost:3026/api/v1/subscriptions/:farmerId

// Route to get all subscriptions by under a farmer
router.get('/', getAllSubscriptions);
//http://localhost:3026/api/v1/subscriptions/

// // Route to get all subscriptions by under a farmer
// router.post('/:farmerId', getAllPlansByFarmerId);
// //http://localhost:3026/api/v1/subscriptions/addSubscription

export default router;
