import verifyToken from "../utils/middleware/verifyToken.js";
import { BagController } from "../controllers/bagController.js";
import { Router } from "express";

const bagController = new BagController();
const bagRoutes = Router();

bagRoutes.post("/bag/add-item", verifyToken, bagController.addItensInBag);
bagRoutes.delete("/bag/remove-item/id=:id", verifyToken, bagController.removeItem);
bagRoutes.get("/bag/get-itens", verifyToken, bagController.getItens);

export default bagRoutes;
