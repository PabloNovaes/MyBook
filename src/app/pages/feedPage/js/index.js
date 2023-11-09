import { renderPosts } from "../../feedPage/js/api.js";
import { startPost } from "../../../sweetAlert/sweet.js";
const header = document.querySelector("#main-header");
const startPostBtn = document.querySelector("#init-post");

document.addEventListener('DOMContentLoaded', renderPosts)

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("header-shadow");
  } else {
    header.classList.remove("translate");
    header.classList.remove("header-shadow");
  }
});

startPostBtn.addEventListener("click", async () => {
  const createPost = await startPost();
  return createPost;
});
