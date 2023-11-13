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

routes.use(productRoutes);
routes.use(accountRoutes);
routes.use(adressRoutes);
routes.use(orderRoutes);
routes.use(postRoutes);
routes.use(userRoutes);
routes.use(pageRoutes);
routes.use(bagRoutes);

export default routes;
