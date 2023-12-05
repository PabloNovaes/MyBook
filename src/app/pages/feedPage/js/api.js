import { pageLoader } from "../../../components/pageLoader/index.js";
import { Comment } from "../../../class/comments.class.js"
import { Post } from "../../../class/post.class.js";

import "https://unpkg.com/scrollreveal";

const modalElement = document.querySelector("#comment-modal")
 const commentsList = modalElement.querySelector("ul#comments")
const modalCase = document.querySelector("#comment-modal-case")


const postWithoutImage = (id, avatar_url, name, created_at, description, postId) => {
  return ` <header>
  <a href="/users/id=${id}">
  <img
  class="user-img"
  src='${avatar_url}'
  alt=""
  />
  </a>
  <span class="name-our-date">
  <a href="/users/id=${id}">
  <p>${name}</p>
  </a>
    <p>${created_at}</p>
  </span>
  <i class="ph-bold ph-dots-three"></i>
</header>
<span class="post-text">
  <p>${description}</p>
</span>
<i class="divider"></i>
<footer post-id=${postId}>
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

const postWithImage = (
  id,
  avatar_url,
  name,
  created_at,
  description,
  image_url,
  postId
) => {
  return `  <header>
  <a href="/users/id=${id}">
  <img
  class="user-img"
  src='${avatar_url}'
  alt=""
  />
  </a>
  <span class="name-our-date">
  <a href="/users/id=${id}">
  <p>${name}</p>
  </a>
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
      loading="lazy"
      src=${image_url}
      alt=""
    />
  </div>
</div>
<i class="divider"></i>

<footer post-id=${postId}>
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

export function renderCommentsByPost(comment) {
  const { User, content, created } = comment
  const { name, avatar_url } = User

  const li = document.createElement("li")
  li.innerHTML = `
    <img src=${avatar_url} alt="" />
           <div>
           <div class="content">
           <span class="user-name">${name}</span>
           <span class="text-box">${content}</span>
         </div>
         <span class="created">${created}</span>
           </div>
    `

  return commentsList.appendChild(li)
}

export async function openCommentsModal(postId) {
  const modal = {
    postId: postId,

    openModal() {
      shadow.classList.toggle("viewShadow");
      modalElement.classList.toggle("open")
      document.documentElement.classList.toggle("hidden")
      document.documentElement.classList.toggle("shadow")
    },
    closeModal() {
      const commentsList = modalElement.querySelector("ul#comments")
      modalElement.classList.remove("dont-have-comments")

      commentsList.innerHTML = ""

      modalElement.classList.remove("open")
      shadow.classList.remove("viewShadow");
      document.documentElement.classList.remove("hidden")
      document.documentElement.classList.remove("shadow")

      setTimeout(() => {
        modalCase.style.display = "none"
      }, 200);
    },
    async init() {
      const closeModalBtn = document.querySelector("#close-modal")

      modalElement.querySelector("header").setAttribute("post-id", postId)
      modalCase.style.display = "flex"

      const commentsClass = new Comment()
      const comments = await commentsClass.getComments(postId)

      if (comments.length == 0) {
        this.openModal()
        closeModalBtn.addEventListener("click", this.closeModal)
        return modalElement.classList.toggle("dont-have-comments")
      }

      comments.forEach(comment => {
        renderCommentsByPost(comment)
      })

      commentsList.scrollTo(0, commentsList.scrollHeight + 1000);

      this.openModal()
      closeModalBtn.addEventListener("click", this.closeModal)
    }
  }
  try {
    pageLoader.startLoader()
    await modal.init()
  } catch (error) {
    throw new Error(error)
  } finally {
    pageLoader.stopLoader()
  }
}

export async function renderPosts() {
  pageLoader.startLoader();
  const post = new Post();
  let allPosts = await post.getAllPosts();


  allPosts.posts.forEach((post) => {
    const postsLocation = document.querySelector("#posts-list");
    const { created_at, description, image_url, id } = post;
    const { name, avatar_url, id: userId } = post.User;

    const postElement = document.createElement("div");
    modalCase.querySelector("header").setAttribute("post-id", id)

    postElement.classList.add("post");
    if (image_url == "" || image_url == null) {
      postElement.innerHTML = postWithoutImage(
        userId,
        avatar_url,
        name,
        created_at,
        description,
        id
      );
      postsLocation.appendChild(postElement);
    } else {
      postElement.innerHTML = postWithImage(
        userId,
        avatar_url,
        name,
        created_at,
        description,
        image_url,
        id
      );
      postsLocation.appendChild(postElement);
    }

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
  });
}
