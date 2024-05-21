import { Request, Response } from 'express';
import { porductServices } from './products.service';
import productValidationZodSchema from './products.validation';

const addProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const validatedWithZodData = productValidationZodSchema.parse(productData);
    const result = await porductServices.addProductToDB(validatedWithZodData);

    if (result) {
      console.log(result);
      res.status(200).json({
        success: true,
        message: 'Product created successfully!',
        data: result,
      });
    } else {
      throw new Error('Something went very wrong');
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!!',
      error,
    });
  }
};

export const productControllers = {
  addProduct,
};
