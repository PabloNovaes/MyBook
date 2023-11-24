import checkoutRoutes from "./checkout.routes.js";
import productRoutes from "./products.routes.js";
import accountRoutes from "./account.routes.js";
import adressRoutes from "./adress.routes.js";
import orderRoutes from "./order.routes.js";
import pageRoutes from "./pages.routes.js";
import postRoutes from "./post.routes.js";
import userRoutes from "./user.routes.js";
import bagRoutes from "./bag.routes.js";

import express from "express";
import { Router } from "express";

const routes = Router();

routes.use(checkoutRoutes);
routes.use(productRoutes, express.json());
routes.use(accountRoutes, express.json());
routes.use(adressRoutes, express.json());
routes.use(orderRoutes, express.json());
routes.use(postRoutes, express.json());
routes.use(userRoutes, express.json());
routes.use(pageRoutes, express.json());
routes.use(bagRoutes, express.json());

export default routes;
