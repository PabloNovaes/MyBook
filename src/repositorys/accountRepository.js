import { prisma } from "../db/db.prisma.js";

export class AccountRepository {
  async findUnique(email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      return error;
    }
  }
}
