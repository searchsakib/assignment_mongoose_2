import express, { Request, Response } from 'express';
import { products } from './products.model';

const productRouter = express.Router();

productRouter.post('/', async (req: Request, res: Response) => {
  const result = await products.create(req.body);
  res.json({
    success: true,
    message: 'Product created successfully!',
    data: result,
  });

  // console.log(req.body);
  // res.send('hi,hello');
});

export default productRouter;
