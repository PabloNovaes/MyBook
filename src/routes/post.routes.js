import { Router } from "express";
import { PostController } from "../controllers/postController.js";
import verifyToken from "../utils/middleware/verifyToken.js";

const postController = new PostController();
const postRoutes = Router();

postRoutes.post("/post/create", verifyToken, postController.createPost);
postRoutes.get("/post/get", verifyToken, postController.getPosts);
postRoutes.get("/post/getAll", postController.getAllPosts);

export default postRoutes;
