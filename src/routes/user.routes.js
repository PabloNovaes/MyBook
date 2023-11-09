import { UserController } from "../controllers/userController.js";
import verifyToken from "../utils/middleware/verifyToken.js";
import { Router } from "express";

const userController = new UserController();
export const userRoutes = Router();

userRoutes.post("/create", userController.createUser);
userRoutes.get("/users", verifyToken, userController.getUser);
userRoutes.post("/users/id", verifyToken, userController.goToUserProfile);
userRoutes.post("/users/update", verifyToken, userController.updateUserImg);
