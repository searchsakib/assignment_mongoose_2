"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const productRouter = express_1.default.Router();
productRouter.post('/', product_controller_1.productControllers.addProduct);
productRouter.get('/', product_controller_1.productControllers.getAllProducts);
productRouter.get('/:productId', product_controller_1.productControllers.getSingleProduct);
productRouter.put('/:productId', product_controller_1.productControllers.updateSingleProduct);
productRouter.delete('/:productId', product_controller_1.productControllers.deleteSingleProduct);
exports.default = productRouter;
