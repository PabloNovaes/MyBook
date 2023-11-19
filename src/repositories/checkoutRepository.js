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
          },
        });

        const returnProduct = {
          name: productData.name,
          image: productData.image,
          price: productData.price,
          quantity,
        };

        data.push(returnProduct);
      }
      return data;
    } catch (error) {
      return error;
    }
  }
}
