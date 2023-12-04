import axios from "../../../services/axios/axios.js";

export class Comment {
    content
    created
    postId

    /**
     * @param {string} content
     * @param {string} created
     * @param {string} postId
     */
    constructor(content, created, postId) {
        this.content = content;
        this.created = created;
        this.postId = postId;
    }

    async createComment(comment) {
        try {
            const response = await axios.post("/feed/create-comment", comment)
            const data = await response.data
            return data
        } catch (error) {
            return error
        }
    }

    async getComments(postId) {
        try {
            const response = await axios.get(`/feed/load-comments/id=${postId}`)
            const data = await response.data

            return data
        } catch (error) {
            return error
        }
    }

}
