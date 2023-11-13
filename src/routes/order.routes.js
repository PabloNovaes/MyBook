import { Router } from "express";
import { OrderController } from "../controllers/orderController.js";
import verifyToken from "../utils/middleware/verifyToken.js";

const orderController = new OrderController();
const orderRoutes = Router();

orderRoutes.post("/order/create-order", orderController.createOrder);
orderRoutes.get("/order/get-orders", orderController.getUserOrders);

export default orderRoutes;
