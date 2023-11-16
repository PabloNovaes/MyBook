import { BagRepository } from "../repositories/bagRepository.js";
const bagRepository = new BagRepository();

export class BagController {
  async addItensInBag(req, res) {
    try {
      const data = req.body;
      const userId = req.user.sub;

      const products = await bagRepository.loadBagProducts(userId);

      const productIsAlreadyInBag = products.some((item) => {
        return item.productId == data.productId;
      });

      if (productIsAlreadyInBag) {
        return res
          .status(200)
          .json({ message: "produto ja existe no carrinho" });
      }

      const addItem = await bagRepository.addItem(data, userId);
      res.status(201).json(addItem.Product);
    } catch (error) {
      res.status(400).json({ message: `Ocorreu um erro inesperado ${error}` });
    }
  }

  async getItens(req, res) {
    try {
      const userId = req.user.sub;
      const loadProducts = await bagRepository.loadBagProducts(userId);
      if (loadProducts.length <= 0) {
        return res.status(200).json({ message: "O carrinho está vazio!" });
      }

      const products = loadProducts.map((item) => {
        return item.Product;
      });

      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ message: `Ocorreu um erro inesperado ${error}` });
    }
  }

  async removeItem(req, res) {
    try {
      const product = req.params.id;
      const userId = req.user.sub;

      const removedItem = await bagRepository.removeItemInBag(product, userId);

      return res.status(200).end();
    } catch (error) {
      return res.status(400).end();
    }
  }
}
