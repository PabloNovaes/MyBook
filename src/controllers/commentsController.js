import { Comment } from "../repositories/commentsRepository.js";

const commentRepository = new Comment()

export class CommentsController {
    async create(req, res) {
        try {
            const { sub } = req.user
            const data = {
                sub, ...req.body
            }
            const comment = await commentRepository.createComment(data)

            return res.status(201).json(comment)
        } catch (error) {
            return res.status(400).json({ message: "Ocorreu um erro inesperado!" })
        }
    }

    async handleComments(req, res) {
        try {
            const { id } = req.params
            const comments = await commentRepository.getCommentsByPost(id)

            return res.status(200).json(comments)
        } catch (error) {
            return res.status(400).json({ message: "Ocorreu um erro inesperado!" })
        }
    }
}