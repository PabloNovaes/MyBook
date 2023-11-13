import { AccountController } from "../controllers/accountController.js";
import { Router } from "express";

const accountController = new AccountController();
const accountRoutes = Router();

accountRoutes.post("/auth", accountController.singInWithGoogle);
accountRoutes.post("/login", accountController.singInWithEmailAndPassword);

export default accountRoutes;
