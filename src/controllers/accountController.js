import { JWTGenerate } from "../utils/jwt/jwt.js";
import { comparePasswords } from "../utils/encrypt/bcrypt.js";
import { AccountRepository } from "../repositories/accountRepository.js";

const accountRepository = new AccountRepository();
const jwtGenerate = new JWTGenerate();

export class AccountController {
  async singInWithGoogle(req, res) {
    const { email } = req.body;

    const accountAllReadyExists = await accountRepository.findUnique(email);

    if (!accountAllReadyExists) {
      res.status(200).json({
        status: "error",
        message: "Você precisa estar registrado para efetuar o login!",
      });
      return;
    }

    const token = await jwtGenerate.userToken(accountAllReadyExists);

    res.cookie("Auth", token, { maxAge: 3600000 * 24 * 14 });
    res.status(200).json({ status: "success", user: accountAllReadyExists });
  }

  async singInWithEmailAndPassword(req, res) {
    const { email, password } = req.body;

    const accountAllReadyExists = await accountRepository.findUnique(email);

    if (!accountAllReadyExists) {
      res.status(200).json({
        status: "error",
        message: "Você precisa estar registrado para efetuar o login!",
      });
      return;
    }
    
    if (!accountAllReadyExists.password) {
      return res.status(200).json({
        status: "error",
        message:
          "Essa email não foi registrado com senha! Tente novamente com outro.",
      });
    }

    const encryptedPassword = accountAllReadyExists.password;
    const verifyPassword = await comparePasswords(encryptedPassword, password);

    if (!verifyPassword) {
      return res.status(200).json({
        status: "error",
        message: "O email e/ou senha estão incorretos!",
      });
    }

    const token = await jwtGenerate.userToken(accountAllReadyExists);
    res.cookie("Auth", token, { maxAge: 3600000 * 24 });
    res.json({ status: "success", user: accountAllReadyExists });
  }
}
