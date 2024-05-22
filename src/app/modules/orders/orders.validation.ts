import { z } from 'zod';

const orderValidationZodSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email format!'),
  productId: z.string().min(1, { message: 'productId is required' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a positive number' }),
});

export default orderValidationZodSchema;
