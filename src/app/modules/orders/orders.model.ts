import { model, Schema } from 'mongoose';
import { products } from '../products/products.model';
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

// updating inventory quantity & inStock status based on ordered quantity

orderSchema.pre('save', async function (next) {
  const productId = this.productId;
  const orderQuantity = this.quantity;

  try {
    const product = await products.findById(productId);

    if (!product) {
      throw new Error('Product not found!');
    } else if (product?.inventory.quantity < orderQuantity) {
      throw new Error('Insufficient quantity in inventory');
    } else {
      product.inventory.quantity -= orderQuantity;
      product.inventory.inStock = product.inventory.quantity > 0;

      await product.save();
      next();
    }
  } catch (error) {
    throw new Error('Unexpected Error');
  }
});

export const orders = model<TOrder>('orders', orderSchema);
