import { BagRepository } from "../repositories/bagRepository.js";
const bagRepository = new BagRepository();

export class BagController {
  async addItensInBag(req, res) {
    try {
      const data = req.body;
      const addItem = await bagRepository.addItem(data);
      res.status(201).json({ item: addItem });
    } catch (error) {
      res.status(400).json({ message: `Ocorreu um erro inesperado ${error}` });
    }
  }

  async getItens(req, res) {
    try {
      const { userId } = req.body;
      const loadProducts = await bagRepository.loadBagProducts(userId);

      if (loadProducts.length <= 0) {
        return res.status(200).json({ message: "O carrinho está vazio!" });
      }

      const products = loadProducts.map((item) => {
        return item.Product;
      });

      console.log(products);

      res.status(200).json({products});
    } catch (error) {
      res.status(400).json({ message: `Ocorreu um erro inesperado ${error}` });
    }
  }
}
