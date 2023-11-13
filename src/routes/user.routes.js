import { UserController } from "../controllers/userController.js";
import verifyToken from "../utils/middleware/verifyToken.js";
import { Router } from "express";

const userController = new UserController();
const userRoutes = Router();

userRoutes.post("/create", userController.createUser);
userRoutes.get("/users", verifyToken, userController.getUser);
userRoutes.post("/users/id", verifyToken, userController.goToUserProfile);
userRoutes.post("/users/update-image", verifyToken, userController.updateUserImg);
userRoutes.post("/users/update-data", verifyToken, userController.updateData);

export default userRoutes;
