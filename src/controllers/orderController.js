import { OrderRepostitory } from "../repositories/orderRepository.js";
const orderRepostitory = new OrderRepostitory();

export class OrderController {
  async createOrder(req, res) {
    try {
      const data = req.body;
      const { userId } = data;

      if (!data) {
        return res.status(400).json({ message: `Ocorreu um erro inesperado!` });
      }

      const order = await orderRepostitory.createOrder(data, userId);

      res.status(201).json({ message: "Pedido realizado com sucesso!", order });
    } catch (error) {
      res.status(400).json({ message: `Ocorreu um erro inesperado! ${error}` });
    }
  }

  async getUserOrders(req, res) {
    try {
      const { sub } = req.user;

      const getUserOrders = await orderRepostitory.getOrders(sub);

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
