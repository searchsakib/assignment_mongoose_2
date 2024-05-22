"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.porductServices = void 0;
const products_model_1 = require("./products.model");
//adding product
const addProductToDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_model_1.products.create(productData);
        return result;
    }
    catch (error) {
        throw new Error('Failed to add product to database');
    }
});
// for searching product
const searchProductsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_model_1.products.find({
            name: { $regex: query, $options: 'i' },
        });
        return result;
    }
    catch (error) {
        throw new Error('Failed to search products in database');
    }
});
// for all products
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_model_1.products.find();
        return result;
    }
    catch (error) {
        throw new Error('Failed to fetch products from database');
    }
});
// getting a single product by id
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_model_1.products.findOne({
            _id: id,
        });
        console.log(result);
        return result;
    }
    catch (error) {
        throw new Error('Product not found');
    }
});
// update single product by id
const updateSingleProductFromDB = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_model_1.products.findByIdAndUpdate({ _id: id }, productData, {
            new: true,
        });
        return result;
    }
    catch (error) {
        throw new Error('Failed to update product.');
    }
});
// delete single data
const deleteSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_model_1.products.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    catch (error) {
        throw new Error('Failed to delete product.');
    }
});
exports.porductServices = {
    addProductToDB,
    searchProductsFromDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateSingleProductFromDB,
    deleteSingleProductFromDB,
};
