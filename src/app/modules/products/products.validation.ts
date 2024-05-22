import { z } from 'zod';

const variantZodSchema = z.object({
  type: z.string().min(1, { message: 'Variant type is required' }),

  value: z.string().min(1, { message: 'Variant value is required' }),
});

const inventoryZodSchema = z.object({
  quantity: z.number().int().positive({ message: 'Quantity can not be zero' }),
  inStock: z.boolean({ message: 'inStock status is required' }),
});

const productValidationZodSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }).trim(),
  description: z
    .string()
    .min(1, { message: 'Product description is required' })
    .trim(),
  price: z
    .number()
    .positive({ message: 'Product price can not be negative or zero' }),
  category: z
    .string()
    .min(1, { message: 'Product category is required' })
    .trim(),
  tags: z
    .array(
      z.string().min(1, { message: 'Each tag must be a non-empty string' }),
    )
    .min(1, { message: 'Product tags are required' }),
  variants: z
    .array(variantZodSchema)
    .min(1, { message: 'Product variants are required' }),
  inventory: inventoryZodSchema,
});

export default productValidationZodSchema;
