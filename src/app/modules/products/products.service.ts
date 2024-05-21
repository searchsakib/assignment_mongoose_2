import { TProduct } from './products.interface';
import { products } from './products.model';

const addProduct = async (payload: TProduct) => {
  const result = await products.create(payload);
  return result;
};

export const porductServices = {
  addProduct,
};
