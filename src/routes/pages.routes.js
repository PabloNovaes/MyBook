import { PagesController } from "../controllers/pagesController.js";
import verifyAuthState from "../utils/middleware/verifyAuthState.js";
import verifyToken from "../utils/middleware/verifyToken.js";
import { Router } from "express";

const pagesController = new PagesController();
const pageRoutes = Router();

pageRoutes.get("/register", verifyAuthState, pagesController.registerPage);
pageRoutes.get("/profile", verifyToken, pagesController.profilePage);
pageRoutes.get("/login", verifyAuthState, pagesController.loginPage);
pageRoutes.get("/payment", verifyToken, pagesController.paymentPage);
pageRoutes.get("/chat", verifyToken, pagesController.chatPage);
pageRoutes.get("/feed", verifyToken, pagesController.feedPage);
pageRoutes.get("/category", pagesController.categoryPage);
pageRoutes.get("/users/id=:id", verifyToken, pagesController.userProfile);
pageRoutes.get("/product", pagesController.productPage);
pageRoutes.get("/", pagesController.homePage);

export default pageRoutes;
