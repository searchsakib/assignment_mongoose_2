"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_controller_1 = require("./orders.controller");
const express_1 = __importDefault(require("express"));
const orderRouter = express_1.default.Router();
orderRouter.post('/', orders_controller_1.orderController.createOrder);
orderRouter.get('/', orders_controller_1.orderController.getOrder);
exports.default = orderRouter;
