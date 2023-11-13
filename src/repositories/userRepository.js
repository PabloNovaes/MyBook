import { prisma } from "../db/db.prisma.js";

export class UserRepository {
  async create(data) {
    try {
      const newUser = await prisma.user.create({ data });
      return newUser;
    } catch (error) {
      return error;
    }
  }

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

  async updateImg(url, email) {
    try {
      const setImg = await prisma.user.update({
        where: {
          email,
        },
        data: {
          avatar_url: url,
        },
      });

      return setImg;
    } catch (error) {
      return error;
    }
  }

  async goToUserProfile(id) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          posts: true,
        },
      });
      return user;
    } catch (error) {
      return error;
    }
  }
}
