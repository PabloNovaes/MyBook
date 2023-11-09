import { AdressRepository } from "../repositorys/adressRepository.js";
const adressRepository = new AdressRepository();

export class AdressesController {
  async create(req, res) {
    const { sub } = req.user;
    const data = req.body;

    const adressAlredyExists = await adressRepository.getAll(sub);

    if (adressAlredyExists.length !== 0) {
      const isEqual = adressAlredyExists.some((adress) => {
        return (
          adress["street"] === data["street"] &&
          adress["number"] === data["number"]
        );
      });

      if (isEqual) {
        return res.status(200).json({
          status: "error",
          message: "Este endereço já está cadastrado em sua conta!",
        });
      }
    }

    const createAdress = await adressRepository.create(sub, data);
    return res
      .status(200)
      .json({
        status: "success",
        message: "Endereço cadastrado com sucesso",
        adress: createAdress,
      });
  }

  async handleAdress(req, res) {
    try {
      const { sub } = req.user;
      const adresses = await adressRepository.getAll(sub);

      res.status(200).json({ status: "success", adresses });
    } catch (error) {
      res.status(200).json({ status: "error", message: error });
    }
  }
}
