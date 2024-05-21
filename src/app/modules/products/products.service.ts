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

// for searching product
const searchProductsFromDB = async (query: string) => {
  try {
    const result = await products.find({
      name: { $regex: query, $options: 'i' },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// for all products
const getAllProductsFromDB = async () => {
  try {
    const result = await products.find();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const porductServices = {
  addProductToDB,
  searchProductsFromDB,
  getAllProductsFromDB,
};
