import { ProductRepository } from "../repositories/productsRepository.js";
const productRepository = new ProductRepository();

export class ProductController {
  async loadProducts(req, res) {
    try {
      const query = req.body.query;

      const skip = Number(req?.query?.skip) || 0;
      const take = Number(req?.query?.take) || 40;
      const products = await productRepository.getProducts(query, skip, take);

      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ message: `Ocorreu um erro inesperado ${error}` });
    }
  }

  async loadProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await productRepository.getProductById(id);

      return res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: "Ocorreu um erro inesperado!" });
    }
  }
}
