import { z } from 'zod';

const orderValidationZodSchema = z.object({
  email: z.string().email('Invalid email format!'),
  productId: z.string().min(1, { message: 'productId is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  quantity: z
    .number()
    .positive({ message: 'Quantity must be a positive number' }),
});

export default orderValidationZodSchema;
