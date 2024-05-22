import { orderController } from './orders.controller';
import express from 'express';

const orderRouter = express.Router();

orderRouter.post('/', orderController.createOrder);
orderRouter.get('/', orderController.getOrder);

export default orderRouter;
