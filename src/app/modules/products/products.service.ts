// import { Types } from 'mongoose';
import { TProduct } from './products.interface';
import { products } from './products.model';

const addProductToDB = async (productData: TProduct) => {
  try {
    const result = await products.create(productData);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const porductServices = {
  addProductToDB,
};
