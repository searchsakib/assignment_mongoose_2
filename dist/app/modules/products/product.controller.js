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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllers = void 0;
const mongoose_1 = require("mongoose");
const products_service_1 = require("./products.service");
const products_validation_1 = __importDefault(require("./products.validation"));
// adding a product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const validatedWithZodData = products_validation_1.default.parse(productData);
        const result = yield products_service_1.porductServices.addProductToDB(validatedWithZodData);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Product created successfully!',
                data: result,
            });
        }
        else {
            throw new Error('Failed to add product');
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add product!',
            error: error,
        });
    }
});
// getting all products and getting serch results
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.searchTerm) {
            const query = req.query.searchTerm;
            const result = yield products_service_1.porductServices.searchProductsFromDB(query);
            console.log(result);
            if ((result === null || result === void 0 ? void 0 : result.length) !== 0) {
                res.status(200).json({
                    success: true,
                    message: `Products matching search term '${query}' fetched successfully!`,
                    data: result,
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    message: 'No products found matching the search term',
                });
            }
        }
        else {
            const result = yield products_service_1.porductServices.getAllProductsFromDB();
            if (result && result.length !== 0) {
                res.status(200).json({
                    success: true,
                    message: 'Products fetched successfully!',
                    data: result,
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    message: 'No products found',
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong !!',
            error: error,
        });
    }
});
// getting a single product by Id
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const objectId = new mongoose_1.Types.ObjectId(id).toString();
        const result = yield products_service_1.porductServices.getSingleProductFromDB(objectId);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Product fetched successfully',
                data: result,
            });
        }
        else {
            throw new Error('Something Went Wrong!!');
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Products failed to fetch with provided id!',
            error: error,
        });
    }
});
// update single product
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const productData = req.body;
        const objectId = new mongoose_1.Types.ObjectId(id).toString();
        const validatedWithZodData = products_validation_1.default.parse(productData);
        const result = yield products_service_1.porductServices.updateSingleProductFromDB(objectId, validatedWithZodData);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Product updated successfully!',
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'Product not found or update unsuccessful!',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error,
        });
    }
});
// delete single product
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const objectId = new mongoose_1.Types.ObjectId(id).toString();
        const result = yield products_service_1.porductServices.deleteSingleProductFromDB(objectId);
        if (result === true) {
            res.status(200).json({
                success: true,
                message: 'Product deleted successfully!',
                data: null,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'Product not found!',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!!',
            error: error,
        });
    }
});
exports.productControllers = {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};
