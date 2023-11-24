import checkoutRoutes from "./checkout.routes.js";
import productRoutes from "./products.routes.js";
import accountRoutes from "./account.routes.js";
import adressRoutes from "./adress.routes.js";
import orderRoutes from "./order.routes.js";
import pageRoutes from "./pages.routes.js";
import postRoutes from "./post.routes.js";
import userRoutes from "./user.routes.js";
import bagRoutes from "./bag.routes.js";

import { Router } from "express";
const routes = Router();

routes.use(checkoutRoutes);
routes.use(productRoutes, app.use(express.json()));
routes.use(accountRoutes, app.use(express.json()));
routes.use(adressRoutes, app.use(express.json()));
routes.use(orderRoutes, app.use(express.json()));
routes.use(postRoutes, app.use(express.json()));
routes.use(userRoutes, app.use(express.json()));
routes.use(pageRoutes, app.use(express.json()));
routes.use(bagRoutes, app.use(express.json()));

export default routes;
