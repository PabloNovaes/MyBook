import { CheckoutController } from "../controllers/checkoutController.js";
import getProductsToToken from "../utils/middleware/getProductsOrderToken.js";
import verifyToken from "../utils/middleware/verifyToken.js";
import { Router } from "express";

const checkoutRoutes = Router();
const checkoutController = new CheckoutController();

checkoutRoutes.post(
  "/checkout-token",
  app.use(express.json()),
  verifyToken,
  checkoutController.setProductsToken
);

checkoutRoutes.get(
  "/init-checkout",
  app.use(express.json()),
  verifyToken,
  getProductsToToken,
  checkoutController.initSession
);

export default checkoutRoutes;
