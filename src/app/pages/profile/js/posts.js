import { Post } from "../../../class/post.class.js";
import { pageLoader } from "../../../components/pageLoader/index.js";
import { openCommentsModal } from "../../feedPage/js/api.js"
import { initCreateCommentBtn } from "../../feedPage/js/index.js"
import { error } from "../../../sweetAlert/sweet.js";
import "https://unpkg.com/scrollreveal";

const modalCase = document.querySelector("#comment-modal-case")


export const postWithoutImage = (avatar_url, name, created_at, description, id) => {
  return `<header>
  <img
    class="user-img"
    src='${avatar_url}'
    alt=""
  />
  <span class="name-our-date">
    <p>${name}</p>
    <p>${created_at}</p>
  </span>
  <i class="ph-bold ph-dots-three"></i>
</header>
<span class="post-text">
  <p>${description}</p>
</span>
<i class="divider"></i>
<footer post-id=${id}>
  <ul>
    <li>
      <i class="ti ti-thumb-up"></i>
      <p class="like"></p>
    </li>
    <li id="comment-btn">
      <i class="ti ti-message"></i>
      <p class="coments"></p>
    </li>
  </ul>
</footer>`;
};

export const postWithImage = (
  avatar_url,
  name,
  created_at,
  description,
  image_url,
  id
) => {
  return `  <header>
  <img
    class="user-img"
    src='${avatar_url}'
    alt=""
  />
  <span class="name-our-date">
    <p>${name}</p>
    <p>${created_at}</p>
  </span>
  <i class="ph-bold ph-dots-three"></i>
</header>
<span class="post-text">
  <p>${description}</p>
</span>
<i class="divider"></i>
<div class="post-content">
  <div class="img">
    <img
      src=${image_url}
      alt=""
    />
  </div>
</div>
<i class="divider"></i>

<footer post-id=${id}>
  <ul>
    <li>
      <i class="ti ti-thumb-up"></i>
      <p class="like"></p>
    </li>
    <li id="comment-btn">
      <i class="ti ti-message"></i>
      <p class="coments"></p>
    </li>
  </ul>
</footer>`;
};

export async function renderPost(post) {

  const postsLocation = document.querySelector("#posts-list");
  const { created_at, description, image_url, id } = post;
  const { name, avatar_url, id: userId } = post.User;

  const postElement = document.createElement("div");
  modalCase.querySelector("header").setAttribute("post-id", id)

  postElement.classList.add("post");
  if (image_url == "" || image_url == null) {
    postElement.innerHTML = postWithoutImage(
      avatar_url,
      name,
      created_at,
      description,
      id
    );
    postsLocation.appendChild(postElement);
  } else {
    postElement.innerHTML = postWithImage(
      avatar_url,
      name,
      created_at,
      description,
      userId,
      image_url,
      id
    );
    postsLocation.appendChild(postElement);
  }

  initCreateCommentBtn()

  const postText = postElement.querySelector(".post-text p");

  if (postText.textContent == "") {
    postElement.removeChild(postElement.querySelector(".post-text"));
  }

  const sr = ScrollReveal({ reset: true });
  const commentBtn = postElement.querySelector("#comment-btn");

  commentBtn.addEventListener("click", (e) => {
    if (e.target.nodeName !== "I") return
    openCommentsModal(id)
  });

  sr.reveal(".post", {
    origin: "bottom",
    distance: "1.5rem",
    duration: 600,
    reset: false,
    zIndex: 0,
    beforeReveal: (post) => {
      post.style = `
      visibility: visible; opacity: 1; transition: opacity 0.6s cubic-bezier(0.5, 0, 0, 1) 0s, transform 0.6s cubic-bezier(0.5, 0, 0, 1) 0s;
      `;
      pageLoader.stopLoader();
    },
  });

}

export async function getPostsByUser() {
  pageLoader.startLoader();
  const postQuantity = document.querySelector("#post-quantity p");
  const allowedPost = document.querySelector("span#message");

  const post = new Post();
  const data = await post.getPostByUser();

  const allPosts = data.posts;
  postQuantity.innerText = allPosts.length;

  try {
    if (allPosts.length == 0) {
      allowedPost.classList.add("fade-in");
      allowedPost.style.display = "flex";
    } else {
      allPosts.map(async (post) => {
        await renderPost(post);
      });
    }
  } catch (err) {
    return error("Ocorreu algum erro");
  } finally {
    return pageLoader.stopLoader();
  }
}
