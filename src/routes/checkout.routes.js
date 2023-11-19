import { CheckoutController } from "../controllers/checkoutController.js";
import getProductsToToken from "../utils/middleware/getProductsOrderToken.js"
import { Router } from "express";

const checkoutRoutes = Router();
const checkoutController = new CheckoutController();

checkoutRoutes.post("/checkout-token", checkoutController.setProductsToken);
checkoutRoutes.get("/init-checkout", getProductsToToken, checkoutController.initSession);

export default checkoutRoutes;
