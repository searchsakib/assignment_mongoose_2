import { Request, Response } from 'express';
import { Types } from 'mongoose';
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
      error: error.message,
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
      if (result?.length !== 0) {
        res.status(200).json({
          success: true,
          message: 'Products fetched successfully!',
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong !!',
      error: error.message,
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
      throw new Error('Something Wrong!!');
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Products failed to fetch with provided id!',
      error: error.message,
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error.message,
    });
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!!',
      error: error.message,
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
