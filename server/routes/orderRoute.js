import express from 'express';
import {addOrderController, getOrdersController,getOrderByIdController} from "../controllers/orderController.js";

const router = express.Router()

router.post('/order',addOrderController)
router.post('/getorders',getOrdersController)
router.get('/getorder/:id',getOrderByIdController)

export default router