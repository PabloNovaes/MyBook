import { CheckoutController } from "../controllers/checkoutController.js";
import { Router } from "express";
import express from "express";

import getProductsToToken from "../utils/middleware/getProductsOrderToken.js";
import verifyToken from "../utils/middleware/verifyToken.js";

const checkoutRoutes = Router();
const checkoutController = new CheckoutController();

checkoutRoutes.post(
  "/checkout-token",
  verifyToken,
  checkoutController.setProductsToken
);

checkoutRoutes.post(
  "/checkout-succeded",
  express.raw({ type: "application/json" }),
  checkoutController.updateOrderStatus
);

checkoutRoutes.get(
  "/init-checkout",
  verifyToken,
  getProductsToToken,
  checkoutController.initSession
);

export default checkoutRoutes;
