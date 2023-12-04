import axios from "../../../services/axios/axios.js";

export class Comment {
    content
    created
    post_id

    /**
     * @param {string} content
     * @param {string} created
     * @param {string} post_id
     */
    constructor(content, created, post_id) {
        this.content = content;
        this.created = created;
        this.post_id = post_id;
    }

    async createComment(comment) {
        try {
            const response = await axios.post("/feed/create-post", comment)
            const data = await response.data
            return data
        } catch (error) {
            return error
        }
    }

    async getComments(postId) {
        try {
            console.log(postId);
            const response = await axios.get(`/feed/load-comments/id=${postId}`)
            const data = await response.data

            return data
        } catch (error) {
            return error
        }
    }

}
