import { OrderController } from "../controllers/orderController.js";
import verifyToken from "../utils/middleware/verifyToken.js";
import { Router } from "express";

const orderController = new OrderController();
const orderRoutes = Router();

orderRoutes.post(
  "/order/create-order",
  verifyToken,
  orderController.createOrder
);
orderRoutes.get(
  "/order/get-orders",
  verifyToken,
  orderController.getUserOrders
);

export default orderRoutes;
