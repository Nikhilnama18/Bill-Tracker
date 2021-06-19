import express from 'express';
import userController from '../controllers/users/usercontroller';
import orgbillsController from '../controllers/orgDetails/orgdetailscontroller';
const router = express.Router();

router.use('/user', userController);

router.use('/org',);

router.use('/orgbills', orgbillsController);
export =router;