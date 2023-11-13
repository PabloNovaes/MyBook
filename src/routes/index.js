import accountRoutes from "./account.routes.js";
import adressRoutes from "./adress.routes.js";
import pageRoutes from "./pages.routes.js";
import userRoutes from "./user.routes.js";
import postRoutes from "./post.routes.js";
import orderRoutes from "./order.routes.js";
import { Router } from "express";
export const routes = Router();

routes.use(accountRoutes);
routes.use(adressRoutes);
routes.use(userRoutes);
routes.use(pageRoutes);
routes.use(postRoutes);
routes.use(orderRoutes);
