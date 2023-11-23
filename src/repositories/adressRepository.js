import { prisma } from "../db/db.prisma.js";

export class AdressRepository {
  async create(userId, data) {
    try {
      const createAdress = await prisma.adress.create({ data });

      const { id } = createAdress;

      const insertRelationship = await prisma.adress_per_user.create({
        data: {
          userId: userId,
          adressId: id,
        },
      });

      return createAdress;
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getAll(userId) {
    try {
      const adressesId = await prisma.adress_per_user.findMany({
        where: {
          userId,
        },
        include: {
          Adress: true,
        },
      });

      const adresses = adressesId.map((item) => {
        return item.Adress;
      });

      return adresses;
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  }
}
