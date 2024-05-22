"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const variantZodSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: 'Variant type is required' }),
    value: zod_1.z.string().min(1, { message: 'Variant value is required' }),
});
const inventoryZodSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().positive({ message: 'Quantity can not be zero' }),
    inStock: zod_1.z.boolean({ message: 'inStock status is required' }),
});
const productValidationZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Product name is required' }).trim(),
    description: zod_1.z
        .string()
        .min(1, { message: 'Product description is required' })
        .trim(),
    price: zod_1.z.number().positive({ message: 'Product price can not be zero' }),
    category: zod_1.z
        .string()
        .min(1, { message: 'Product category is required' })
        .trim(),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, { message: 'Each tag must be a non-empty string' }))
        .min(1, { message: 'Product tags are required' }),
    variants: zod_1.z
        .array(variantZodSchema)
        .min(1, { message: 'Product variants are required' }),
    inventory: inventoryZodSchema,
});
exports.default = productValidationZodSchema;
