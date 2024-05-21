import { z } from 'zod';

const variantZodSchema = z.object({
  type: z
    .string()
    .min(1, { message: 'Variant type is required' })
    .refine((value) => value.charAt(0) === value.charAt(0).toUpperCase(), {
      message: 'Variant type should start with an uppercase letter',
    }),
  value: z.string().min(1, { message: 'Variant value is required' }),
});

const inventoryZodSchema = z.object({
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a non-neagative number' })
    .int()
    .positive({ message: 'Quantity can not be zero' }),
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
    .min(0, { message: 'Product price is required' })
    .nonnegative({ message: 'Product price must be non-negative' })
    .positive({ message: 'Product price can not be zero' }),
  category: z.string().min(1, { message: 'Product category is required' }),
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
