import { renderPosts, renderCommentsByPost } from "../../feedPage/js/api.js";
import { error, startPost, success } from "../../../sweetAlert/sweet.js";
import { Comment } from "../../../class/comments.class.js"

const header = document.querySelector("#main-header");
const startPostBtn = document.querySelector("#init-post");
const modalElement = document.querySelector("#comment-modal")
const commentsList = modalElement.querySelector("ul#comments")


export function initCreateCommentBtn() {
  const createCommentBtn = document.querySelector("#create-post")

  createCommentBtn.addEventListener("click", async () => {
    try {
      const modalInput = document.querySelector("#input-box input")
      const postId = modalElement.querySelector("header").getAttribute("post-id")

      if (modalInput.value.trim() == "") return
      const date = new Date().toLocaleString("pt-BR")
      const commentClass = new Comment(modalInput.value, date, postId)

      const newComment = await commentClass.createComment(commentClass)
      modalInput.value = ""
      modalElement.classList.remove("dont-have-comments")

      const { postId: newPostId } = newComment

      renderCommentsByPost(newComment, newPostId)
      commentsList.scrollTo(0, commentsList.scrollHeight + 1000);

      return success("Comentário publicado!")
    } catch (err) {
      console.log(err);
      return error("Ocorreu um erro inesperado")
    }
  })
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("header-shadow");
  } else {
    header.classList.remove("translate");
    header.classList.remove("header-shadow");
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  startPostBtn.addEventListener("click", async () => {
    const createPost = await startPost();
    return createPost;
  });

  await renderPosts()
  initCreateCommentBtn()
})
