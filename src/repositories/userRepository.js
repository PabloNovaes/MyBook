import { prisma } from "../db/db.prisma.js";

export class UserRepository {
  async create(data) {
    try {
      const newUser = await prisma.user.create({ data });
      return newUser;
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
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
    } finally {
      await prisma.$disconnect();
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
    } finally {
      await prisma.$disconnect();
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
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateUserData(data, userId) {
    try {
      const { name, nickname, cpf, email } = data;
      const updatedData = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          nickname: `@${nickname}`,
          email,
          cpf,
        },
      });

      return updatedData;
    } catch (error) {
      return error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getAllUsers(query) {
    try {
      const users = prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                startsWith: query, mode: "insensitive"
              }
            },
            {
              nickname: {
                startsWith: query, mode: "insensitive"
              }
            }
          ]
        }
      })

      return users
    } catch (error) {
      return error
    }
  }
}
