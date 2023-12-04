import { prisma } from "../db/db.prisma.js"


export class Comment {
    async createComment({ content, created, postId, userId }) {
        try {
            const newComment = await prisma.comments.create({
                data: {
                    content,
                    created,
                    postId,
                    userId
                }
            })

            return newComment
        } catch (error) {
            return error
        }

    }

    async getCommentsByPost(postId) {
        try {
            const comments = await prisma.comments.findMany({
                where: {
                    postId
                }, include: {
                    User: true
                }
            })

            return comments
        } catch (error) {
            return error
        }
    }
}