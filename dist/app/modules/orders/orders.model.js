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
exports.orders = void 0;
const mongoose_1 = require("mongoose");
const products_model_1 = require("../products/products.model");
const orderSchema = new mongoose_1.Schema({
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
}, { versionKey: false });
// updating inventory quantity & inStock status based on ordered quantity
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = this.productId;
        const orderQuantity = this.quantity;
        try {
            const product = yield products_model_1.products.findById(productId);
            if (!product) {
                throw new Error('Product not found!');
            }
            else if ((product === null || product === void 0 ? void 0 : product.inventory.quantity) < orderQuantity) {
                throw new Error('Insufficient quantity available in inventory');
            }
            else {
                product.inventory.quantity -= orderQuantity;
                product.inventory.inStock = product.inventory.quantity > 0;
                yield product.save();
                next();
            }
        }
        catch (error) {
            throw new Error('Unexpected Error');
        }
    });
});
exports.orders = (0, mongoose_1.model)('orders', orderSchema);
