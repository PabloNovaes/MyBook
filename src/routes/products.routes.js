import { ProductController } from "../controllers/productsController.js";
import { Router } from "express";

const productController = new ProductController();
const productRoutes = Router();

productRoutes.get("/products", productController.loadProducts);

export default productRoutes;
