import verifyToken from "../utils/middleware/verifyToken.js";
import { BagController } from "../controllers/bagController.js";
import { Router } from "express";

const bagController = new BagController();
const bagRoutes = Router();

bagRoutes.post("/bag/add-item", verifyToken, bagController.addItensInBag);
bagRoutes.get("/bag/get-itens", verifyToken, bagController.getItens);

export default bagRoutes;
