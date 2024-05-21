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
    throw new Error('Failed to search products in database');
  }
};

// for all products
const getAllProductsFromDB = async () => {
  try {
    const result = await products.find();
    return result;
  } catch (error) {
    throw new Error('Failed to fetch products from database');
  }
};

// getting a single product by id
const getSingleProductFromDB = async (id: string) => {
  try {
    const result = await products.findOne({
      _id: id,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

// update single product by id

const updateSingleProductFromDB = async (id: string, productData: TProduct) => {
  try {
    const result = await products.findByIdAndUpdate({ _id: id }, productData, {
      new: true,
    });
    return result;
  } catch (error) {
    throw new Error('Failed to update product.');
  }
};

// delete single data
const deleteSingleProductFromDB = async (id: string) => {
  try {
    const result = await products.deleteOne({ _id: id });
    return result.deletedCount > 0;
  } catch (error) {
    throw new Error('Failed to delete product.');
  }
};

export const porductServices = {
  addProductToDB,
  searchProductsFromDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
};
