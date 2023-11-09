import { UserRepository } from "../repositorys/userRepository.js";
import { webpConversion } from "../utils/sharp/webpConverter.js";
import { hashedPass } from "../utils/encrypt/bcrypt.js";
import { generateBase62Id } from "../utils/encrypt/idGenerator.js";
import { testDate } from "../utils/momentJs/index.js";
import moment from "moment";

const userRepository = new UserRepository();

export class UserController {
  async createUser(req, res) {
    const data = req.body;
    const { password, email } = data;

    const id = generateBase62Id(28);

    const userAlredyExists = await userRepository.findUnique(email);

    if (userAlredyExists !== null) {
      res
        .status(200)
        .json({ status: "error", message: "este e-mail já está em uso!" });
      return;
    }

    try {
      data.id = data.id ?? id;
      data.password = await hashedPass(password);

      const createUser = await userRepository.create(data);

      res.status(201).json({
        status: "success",
        message: "Conta criada com sucesso!",
        user: createUser,
      });
    } catch (err) {
      console.log(err);
      res.status(200).send(err);
    }
  }

  async getUser(req, res) {
    const { email } = req.user;

    const userAlredyExists = await userRepository.findUnique(email);

    if (!userAlredyExists) {
      res
        .status(200)
        .json({ status: "error", message: "conta não encontrada!" });
      return;
    }

    res.status(200).json({ status: "sucess", data: userAlredyExists });
  }

  async updateUserImg(req, res) {
    try {
      const { url } = req.body;
      const { email } = req.user;

      const userImage = await webpConversion(url);
      const image_url = userImage;

      const setNewUrl = await userRepository.updateImg(image_url, email);

      res.status(200).json({ status: "sucess", message: "imagem atualizada" });
    } catch (error) {
      console.log(error);
      res.status(200).json({ status: "error" });
    }
  }

  async goToUserProfile(req, res) {
    try {
      const { id } = req.body;
      const user = await userRepository.goToUserProfile(id);
      const { posts } = user;

      await posts.forEach(async (post) => {
        let date = post.created_at.split(",");
        date = date[0] + date[1];
        const currentDate = moment(date, "DD/MM/YYYY HH:mm:ss");
        const postDate = await testDate(currentDate);

        post.created_at = postDate;
      });

      return res.status(200).json({ status: "success", user: user, posts });
    } catch (error) {
      return res
        .status(200)
        .json({ status: "error", message: `Ocorreu um erro inesperado` });
    }
  }
}
