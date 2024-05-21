import { Request, Response } from 'express';
import { porductServices } from './products.service';

const addProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const result = await porductServices.addProduct(productData);

  res.json({
    success: true,
    message: 'Product created successfully!',
  });

  // console.log(req.body);
  // res.send('hi,hello');
};

export const productControllers = {
  addProduct: addProduct,
};
