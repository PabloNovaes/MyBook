import { CommentsController } from "../controllers/commentsController.js";
import verifyToken from "../utils/middleware/verifyToken.js";

import { Router } from "express";

const commentsController = new CommentsController();
const commentsRoutes = Router();

commentsRoutes.post("/feed/create-comment", verifyToken, commentsController.create)
commentsRoutes.get("/feed/load-comments/id=:id", commentsController.handleComments)

export default commentsRoutes;
