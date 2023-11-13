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
            description: true,
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
    }
  }
}
