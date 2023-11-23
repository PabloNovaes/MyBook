import { prisma } from "../db/db.prisma.js";

export class ProductRepository {
  async getProducts(filter = "", skip, take) {
    try {
      if (filter != "") {
        const products = await prisma.product.findMany({
          where: {
            category: filter,
          },
        });

        return products;
      }

      const [products, total] = await prisma.$transaction([
        prisma.product.findMany({
          select: {
            id: true,
            name: true,
            author: true,
            category: true,
            image: true,
            price: true,
          },
          skip,
          take,
        }),
        prisma.product.count(),
      ]);

      const totalPages = Math.ceil(total / take);

      return { total, products, totalPages };
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getProductById(id) {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id,
        },
      });

      return product;
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  }
}
