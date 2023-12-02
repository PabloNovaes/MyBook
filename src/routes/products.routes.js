import { ProductController } from "../controllers/productsController.js";
import { Router } from "express";

const productController = new ProductController();
const productRoutes = Router();

productRoutes.get("/all-products/:category?", productController.loadProducts);
productRoutes.get("/products/id=:id", productController.loadProduct);
productRoutes.get("/products/:query", productController.findBook);

export default productRoutes;
