import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { porductServices } from './products.service';
import productValidationZodSchema from './products.validation';
import { ZodError } from 'zod';

// adding a product
const addProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const validatedWithZodData = productValidationZodSchema.parse(productData);
    const result = await porductServices.addProductToDB(validatedWithZodData);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product created successfully!',
        data: result,
      });
    } else {
      throw new Error('Failed to add product');
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      res.status(400).json({
        success: false,
        message: errorMessage,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to add product!',
        error: error,
      });
    }
  }
};

// getting all products and getting serch results
const getAllProducts = async (req: Request, res: Response) => {
  try {
    if (req.query.searchTerm) {
      const query = req.query.searchTerm as string;
      const result = await porductServices.searchProductsFromDB(query);
      console.log(result);
      if (result?.length !== 0) {
        res.status(200).json({
          success: true,
          message: `Products matching search term '${query}' fetched successfully!`,
          data: result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'No products found matching the search term',
        });
      }
    } else {
      const result = await porductServices.getAllProductsFromDB();
      if (result && result.length !== 0) {
        res.status(200).json({
          success: true,
          message: 'Products fetched successfully!',
          data: result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'No products found',
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong !!',
      error: error,
    });
  }
};

// getting a single product by Id
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.productId;
    const objectId = new Types.ObjectId(id).toString();
    const result = await porductServices.getSingleProductFromDB(objectId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully',
        data: result,
      });
    } else {
      throw new Error('Something Went Wrong!!');
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Products failed to fetch with provided id!',
      error: error,
    });
  }
};

// update single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.productId;
    const productData = req.body;
    const objectId = new Types.ObjectId(id).toString();
    const validatedWithZodData = productValidationZodSchema.parse(productData);
    const result = await porductServices.updateSingleProductFromDB(
      objectId,
      validatedWithZodData,
    );
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found or update unsuccessful!',
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      res.status(400).json({
        success: false,
        message: errorMessage,
        // Zod-specific error details
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: error,
      });
    }
  }
};

// delete single product

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.productId;
    const objectId = new Types.ObjectId(id).toString();
    const result = await porductServices.deleteSingleProductFromDB(objectId);
    if (result === true) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!!',
      error: error,
    });
  }
};

export const productControllers = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
