import { prisma } from "../db/db.prisma.js";

export class OrderRepostitory {
  async createOrder(data, userId) {
    try {
      const status = "AWAITING_PAYMENT";
      const { products, paymentMethod } = data;

      const order = await prisma.order.create({
        data: {
          paymentMethod,
          status,
          userId,
        },
      });

      const orderProducts = products.map(async (product) => {
        const { id, quantity } = product;
        const orderProduct = await prisma.product_per_order.create({
          data: {
            orderId: order.id,
            productId: id,
            quantity,
          },
        });
        return orderProduct;
      });

      return orderProducts;
    } catch (error) {
      return error;
    }
  }
  async getOrders(user) {
    try {
      const { id } = user;
      const orders = await prisma.order.findMany({
        where: {
          userId: id,
        },
        include: {
          Products_per_order: {
            include: {
              product: true,
            },
          },
        },
      });

      return orders;
    } catch (error) {
      return error;
    }
  }
}
