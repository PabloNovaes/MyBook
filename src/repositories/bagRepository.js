import { prisma } from "../db/db.prisma.js";

export class BagRepository {
  async addItem(data, userId) {
    try {
      const { productId } = data;
      const insertItem = await prisma.productBag.create({
        data: {
          productId,
          userId,
        },
        include: {
          Product: true,
        },
      });

      return insertItem;
    } catch (error) {
      return error;
    }
  }

  async removeItemInBag(product, userId) {
    try {
      const removedItem = await prisma.productBag.deleteMany({
        where: {
          productId: product,
          userId,
        },
      });

      return removedItem
    } catch (error) {
      return error;
    }
  }

  async loadBagProducts(userId) {
    try {
      const userProductsBag = await prisma.productBag.findMany({
        where: {
          userId,
        },
        include: {
          Product: true,
        },
      });

      return userProductsBag;
    } catch (error) {
      return error;
    }
  }
}
