import express from 'express';
import { productControllers } from './product.controller';

const productRouter = express.Router();

productRouter.post('/', productControllers.addProduct);
productRouter.get('/', productControllers.getAllProducts);
productRouter.get('/:productId', productControllers.getSingleProduct);
productRouter.put('/:productId', productControllers.updateSingleProduct);
productRouter.delete('/:productId', productControllers.deleteSingleProduct);

export default productRouter;
