import { Comment } from "../repositories/commentsRepository.js";
import { testDate } from "../utils/momentJs/index.js";
import moment from "moment-timezone"

const commentRepository = new Comment()

moment.tz.setDefault("America/Sao_Paulo")

export class CommentsController {
    async create(req, res) {
        try {
            const { sub: userId } = req.user
            const data = {
                userId, ...req.body
            }
            const comment = await commentRepository.createComment(data)
            comment.created = "Agora mesmo"

            return res.status(201).json(comment)
        } catch (error) {
            return res.status(400).json({ message: "Ocorreu um erro inesperado!" })
        }
    }

    async handleComments(req, res) {
        try {
            const { id } = req.params
            const comments = await commentRepository.getCommentsByPost(id)

            await comments.forEach(async (comment) => {
                let date = comment.created.split(",");
                date = date[0] + date[1];
                const currentDate = moment(date, "DD/MM/YYYY HH:mm:ss");
                const commentDate = testDate(currentDate);

                comment.created = commentDate;
            });

            return res.status(200).json(comments)
        } catch (error) {
            return res.status(400).json({ message: "Ocorreu um erro inesperado!" })
        }
    }
}