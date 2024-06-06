import { Request, Response } from 'express';
import { products } from '../products/products.model';
import { orderService } from './orders.service';
import orderValidationZodSchema from './orders.validation';
import { ZodError } from 'zod';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const validatedWithZodData = orderValidationZodSchema.parse(orderData);

    const product = await products.findById(validatedWithZodData.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    } else if (!product?.inventory?.inStock) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    } else {
      const result = await orderService.createOrderFromDB(validatedWithZodData);
      return res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Insufficient quantity available in inventory',
      error: error,
    });
  }
};

// get all products & search by email

const getOrder = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;

    const result = await orderService.getOrderFromDB(email ?? '');

    const message = email
      ? 'Orders fetched successfully for user email!'
      : 'Orders fetched successfully';

    return res.status(200).json({
      success: true,
      message: message,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetch orders!',
      error: error,
    });
  }
};

export const orderController = {
  createOrder,
  getOrder,
};
