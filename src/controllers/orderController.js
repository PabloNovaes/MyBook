import { OrderRepostitory } from "../repositories/orderRepository.js";
const orderRepostitory = new OrderRepostitory();

export class OrderController {
  async createOrder(req, res) {
    try {
      const data = req.body;

      if (!data) {
        return res
          .status(400)
          .json({ message: `Ocorreu um erro inesperado! ${error}` });
      }

      const order = await orderRepostitory.createOrder(data);

      res.status(201).json({ message: "Pedido realizado com sucesso!", order });
    } catch (error) {
      res.status(400).json({ message: `Ocorreu um erro inesperado! ${error}` });
    }
  }

  async getUserOrders(req, res) {
    try {
      const user = req.body.user;

      const getUserOrders = await orderRepostitory.getOrders(user);

      const orders = getUserOrders.map((order) => {
        const { Products_per_order, ...all } = order;
        return {
          ...all,
          products: Products_per_order.map((product) => {
            const { ...all } = product.product;
            const { quantity } = product;
            return {
              quantity,
              ...all,
            };
          }),
        };
      });

      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ message: `Ocorreu um erro inesperado! ${error}` });
    }
  }
}
