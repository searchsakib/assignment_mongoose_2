import { Request, Response } from 'express';
import { products } from './products.model';
import { porductServices } from './products.service';
import productValidationZodSchema from './products.validation';

// adding a product
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

// getting all products and getting serch results
const getAllProducts = async (req: Request, res: Response) => {
  try {
    if (req.query.searchTerm) {
      const query = req.query.searchTerm as string;
      const result = await porductServices.searchProductsFromDB(query);
      console.log(result);
      if (result?.length != 0) {
        res.status(200).json({
          success: true,
          message: 'Products fetched successfully!',
          data: result,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to fetch products!',
        });
      }
    } else {
      const result = await porductServices.getAllProductsFromDB();
      if (result) {
        res.status(200).json({
          success: true,
          message: 'Products fetched successfully!',
          data: result,
        });
      } else {
        throw new Error('Something wrong!!!');
      }
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong !!',
      error,
    });
  }
};

export const productControllers = {
  addProduct,
  getAllProducts,
};
