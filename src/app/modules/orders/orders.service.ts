import { TOrder } from './orders.interface';
import { orders } from './orders.model';

// create order
const createOrderFromDB = async (order: TOrder) => {
  const result = await orders.create(order);
  return result;
};

// get order
const getOrderFromDB = async (email: string) => {
  if (email) {
    const result = await orders.find({ email });
    return result;
  } else {
    const result = await orders.find();
    return result;
  }
};

export const orderService = {
  createOrderFromDB,
  getOrderFromDB,
};
