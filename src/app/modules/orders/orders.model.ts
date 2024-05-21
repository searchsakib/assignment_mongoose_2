import { model, Schema } from 'mongoose';
import { TOrder } from './orders.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    productId: {
      type: String,
      required: [true, 'productId is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be atleast 1'],
    },
  },
  { versionKey: false },
);

export const orders = model<TOrder>('orders', orderSchema);
