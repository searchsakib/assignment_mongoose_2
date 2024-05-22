"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationZodSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format!'),
    productId: zod_1.z.string().min(1, { message: 'productId is required' }),
    price: zod_1.z.number().positive({ message: 'Price must be a positive number' }),
    quantity: zod_1.z
        .number()
        .positive({ message: 'Quantity must be a positive number' }),
});
exports.default = orderValidationZodSchema;
