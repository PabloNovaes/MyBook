import { prisma } from "../db/db.prisma.js";

export class PostRepository {
  async create(userId, data) {
    try {
      const { image_url, description, created_at } = data;

      const newPost = await prisma.post.create({
        data: {
          description,
          created_at,
          image_url,
          userId,
        },
        include: {
          User: true,
        },
      });

      return newPost;
    } catch (error) {
      return error;
    }
  }

  async handlePosts(userId) {
    try {
      const posts = await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          User: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return posts;
    } catch (error) {
      return error;
    }
  }

  async handleAllPost() {
    try {
      const posts = await prisma.post.findMany({
        include: {
          User: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return posts;
    } catch (error) {
      return error;
    }
  }
}
