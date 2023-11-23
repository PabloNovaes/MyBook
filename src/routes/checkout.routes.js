import { CheckoutController } from "../controllers/checkoutController.js";
import getProductsToToken from "../utils/middleware/getProductsOrderToken.js";
import verifyToken from "../utils/middleware/verifyToken.js";
import { Router } from "express";

const checkoutRoutes = Router();
const checkoutController = new CheckoutController();

checkoutRoutes.post(
  "/checkout-token",
  verifyToken,
  checkoutController.setProductsToken
);

checkoutRoutes.get(
  "/init-checkout",
  verifyToken,
  getProductsToToken,
  checkoutController.initSession
);

export default checkoutRoutes;
