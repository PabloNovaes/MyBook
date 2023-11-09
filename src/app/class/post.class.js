export class Post {
  description;
  created_at;
  image_url;
  /**
   * @param {string || null} image_url
   * @param {string} description
   * @param {string} created_at
   */
  constructor(description, created_at, image_url) {
    this.description = description;
    this.created_at = created_at;
    this.image_url = image_url;
  }

  async createPost(data) {
    try {
      JSON.stringify(data);
      const request = await axios.post("/post/create", data);
      const response = await request;

      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getPostByUser() {
    const request = await axios.get("/post/get");
    const response = await request.data;

    return response;
  }
  
  async getAllPosts() {
    try {
      const request = await axios.get("/post/getAll");
      const response = await request.data;

      return response
    } catch (error) {
      return error;
    }
  }
}
