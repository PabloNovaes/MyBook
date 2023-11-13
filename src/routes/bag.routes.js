import { BagController } from "../controllers/bagController.js";
import { Router } from "express";

const bagController = new BagController()
const bagRoutes = Router()

bagRoutes.post("/bag/add-item", bagController.addItensInBag)
bagRoutes.get("/bag/get-itens", bagController.getItens)

export default bagRoutes