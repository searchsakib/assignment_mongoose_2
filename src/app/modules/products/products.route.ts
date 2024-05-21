import express from 'express';
import { productControllers } from './product.controller';

const productRouter = express.Router();

productRouter.post('/', productControllers.addProduct);
productRouter.get('/', productControllers.getAllProducts);

export default productRouter;
