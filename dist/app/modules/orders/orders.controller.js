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
exports.orderController = void 0;
const products_model_1 = require("../products/products.model");
const orders_service_1 = require("./orders.service");
const orders_validation_1 = __importDefault(require("./orders.validation"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const orderData = req.body;
        const validatedWithZodData = orders_validation_1.default.parse(orderData);
        const product = yield products_model_1.products.findById(validatedWithZodData.productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }
        else if (!((_a = product === null || product === void 0 ? void 0 : product.inventory) === null || _a === void 0 ? void 0 : _a.inStock)) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
        }
        else {
            const result = yield orders_service_1.orderService.createOrderFromDB(validatedWithZodData);
            return res.status(201).json({
                success: true,
                message: 'Order created successfully!',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Order creation failed!',
            error: error,
        });
    }
});
// get all products & search by email
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield orders_service_1.orderService.getOrderFromDB(email !== null && email !== void 0 ? email : '');
        return res.status(200).json({
            success: true,
            message: email
                ? 'Orders fetched successfully for user email!'
                : 'Orders fetched successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to fetch orders!',
            error: error,
        });
    }
});
exports.orderController = {
    createOrder,
    getOrder,
};
