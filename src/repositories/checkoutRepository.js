import { prisma } from "../db/db.prisma.js";

export class CheckoutRepository {
  async loadCheckoutProducts(products) {
    try {
      const data = [];
      for (const product of products) {
        const { quantity, id } = product;

        const productData = await prisma.product.findUnique({
          where: {
            id,
          },
          select: {
            name: true,
            image: true,
            price: true,
            id: true,
          },
        });

        const returnProduct = {
          name: productData.name,
          image: productData.image,
          price: productData.price,
          id: productData.id,
          quantity,
        };

        data.push(returnProduct);
      }
      return data;
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateOrderStatus(orderId) {
    try {
      const status = "AWAITING_SENT";
      const order = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status,
        },
      });

      return order;
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async removeItensToBag(products, userId) {
    try {
      const data = [];

      for (const productId of products) {
        const removedProduct = await prisma.productBag.deleteMany({
          where: {
            productId,
            userId,
          },
        });

        data.push(removedProduct);
      }
      return data;
    } catch (error) {
      return error;
    }
  }
}
