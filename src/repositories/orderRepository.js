import { prisma } from "../db/db.prisma.js";

export class OrderRepostitory {
  async createOrder(data, userId) {
    try {
      const status = "AWAITING_PAYMENT";
      console.log(data);
      const { products, paymentMethod, adressId } = data;

      const order = await prisma.order.create({
        data: {
          paymentMethod,
          status,
          userId,
          adressId,
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
      console.log(error);
      return error;
    }
  }

  async getOrders(id) {
    try {
      const orders = [];
      const allOrders = await prisma.order.findMany({
        where: {
          userId: id,
        },
        include: {
          Products_per_order: {
            include: {
              product: {
                select: {
                  name: true,
                  image: true,
                  price: true,
                  id: true,
                },
              },
            },
          },
        },
      });

      for (const order of allOrders) {
        const { adressId } = order;
        const deliveryAdress = await prisma.adress.findUnique({
          where: {
            id: adressId,
          },
        });
        orders.push({ ...order, deliveryAdress });
      }

      return orders;
    } catch (error) {
      return error;
    }
  }
}
