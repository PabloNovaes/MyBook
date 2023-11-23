import { AccountController } from "../controllers/accountController.js";
import { Router } from "express";

const accountController = new AccountController();
const accountRoutes = Router();

accountRoutes.post("/login", accountController.singInWithEmailAndPassword);
accountRoutes.post("/auth", accountController.singInWithGoogle);

export default accountRoutes;
