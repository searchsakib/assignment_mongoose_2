import { Request, Response } from 'express';
import { products } from '../products/products.model';
import { orderService } from './orders.service';
import orderValidationZodSchema from './orders.validation';

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Order creation failed!',
      error: error,
    });
  }
};

// get all products & search by email

const getOrder = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;

    const result = await orderService.getOrderFromDB(email ?? '');

    return res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'Orders fetched successfully',
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
