import "https://unpkg.com/scrollreveal";
import { Post } from "../../../class/post.class.js";
import { commentsModal } from "../../../sweetAlert/sweet.js";
import { pageLoader } from "../../../components/pageLoader/index.js";
import { Comment } from "../../../class/comments.class.js"

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

function renderCommentsByPost(comment) {
  const { User, content, created } = comment
  const { name, avatar_url } = User

  const li = document.createElement("li")
  li.innerHTML = `
    <img src=${avatar_url} alt="" />
              <div class="content">
                <span class="user-name">${name}</span>
                <span class="text-box">${content}</span>
              </div>
    `

  return li
}


async function openCommentsModal(postId) {
  try {
    pageLoader.startLoader()

    const commentMobileModal = document.querySelector("#comment-mobile-modal")
    const closeModalBtn = document.querySelector("#close-modal")

    const commentsClass = new Comment()
    const comments = await commentsClass.getComments(postId)

    if (window.innerWidth > 820) {
      return commentsModal()
    } else {
      const commentsList = commentMobileModal.querySelector("ul#comments")
      comments.forEach(comment => {
        const element = renderCommentsByPost(comment)
        commentsList.appendChild(element)
      })

      commentMobileModal.classList.toggle("open")
      document.documentElement.classList.toggle("hidden")

      closeModalBtn.addEventListener("click", () => {
        commentsList.innerHTML = ""
        commentMobileModal.classList.remove("open")
        document.documentElement.classList.remove("hidden")
      })
    }
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


  allPosts.posts.reverse().forEach((post) => {
    const postsLocation = document.querySelector("#posts-list");
    const { created_at, description, image_url, id: postId } = post;
    const { name, avatar_url, id } = post.User;

    const postElement = document.createElement("div");

    postElement.classList.add("post");
    if (image_url == "" || image_url == null) {
      postElement.innerHTML = postWithoutImage(
        id,
        avatar_url,
        name,
        created_at,
        description,
        postId
      );
      postsLocation.appendChild(postElement);
    } else {
      postElement.innerHTML = postWithImage(
        id,
        avatar_url,
        name,
        created_at,
        description,
        image_url,
        postId
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
      const postId = e.target.parentElement.parentElement.parentElement.getAttribute("post-id")
      openCommentsModal(postId)
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
