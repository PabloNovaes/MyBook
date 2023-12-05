import { PostRepository } from "../repositories/postRepository.js";
import { webpConversion } from "../utils/sharp/webpConverter.js";
import { orderByCreated, testDate } from "../utils/momentJs/index.js";
import moment from "moment-timezone";

const postRepository = new PostRepository();

moment.tz.setDefault("America/Sao_Paulo")

export class PostController {
  async createPost(req, res) {
    try {
      const { sub } = req.user;
      const data = { ...req.body };

      if (data.image_url) {
        const img = data.image_url;
        const newImg = await webpConversion(img);

        data.image_url = newImg;
      }
      const post = await postRepository.create(sub, data);

      post.created_at = "Agora mesmo";

      return res.status(200).json({
        status: "success",
        message: "Publicação criada!",
        post,
      });
    } catch (error) {
      return res.status(200).json({
        status: "error",
        message: `Ocorreu um erro inesperado, ${error}`,
      });
    }
  }

  async getPosts(req, res) {
    try {
      const { sub } = req.user;
      let posts = await postRepository.handlePosts(sub);

      posts = orderByCreated(posts)

      await posts.forEach(async (post) => {
        let date = post.created_at.split(",");
        date = date[0] + date[1];
        const currentDate = moment(date, "DD/MM/YYYY HH:mm:ss");
        const postDate = testDate(currentDate);

        post.created_at = postDate;
      });

      return res.status(200).json({
        status: "success",
        posts,
      });
    } catch (error) {
      return res.status(200).json({
        status: "error",
        message: `Ocorreu um erro inesperado, ${error}`,
      });
    }
  }
  async getAllPosts(req, res) {
    try {
      let posts = await postRepository.handleAllPost();

      posts = orderByCreated(posts)

      await posts.forEach(async (post) => {
        let date = post.created_at.split(",");
        date = date[0] + date[1];
        const currentDate = moment(date, "DD/MM/YYYY HH:mm:ss");
        const postDate = testDate(currentDate);

        post.created_at = postDate;
      });

      return res.status(200).json({
        status: "succes",
        posts,
      });
    } catch (error) {
      return res.status(200).json({
        status: "error",
        message: `Ocorreu um erro inesperado, ${error}`,
      });
    }
  }
}
