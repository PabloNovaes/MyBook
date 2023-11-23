import { AdressesController } from "../controllers/adressesController.js";
import verifyToken from "../utils/middleware/verifyToken.js";
import { Router } from "express";

const adressController = new AdressesController();
const adressRoutes = Router();

adressRoutes.get("/adress/handle", verifyToken, adressController.handleAdress);
adressRoutes.post("/adress/create", verifyToken, adressController.create);

export default adressRoutes;
