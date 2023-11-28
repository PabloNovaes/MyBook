import "https://unpkg.com/scrollreveal";
import { Post } from "../../../class/post.class.js";
import { commentsModal } from "../../../sweetAlert/sweet.js";
import { pageLoader } from "../../../components/pageLoader/index.js";

const postWithoutImage = (id, avatar_url, name, created_at, description) => {
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
<footer>
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
  image_url
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

<footer>
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

export async function renderPosts() {
  pageLoader.startLoader();
  const post = new Post();
  let allPosts = await post.getAllPosts();


  allPosts.posts.reverse().forEach((post) => {
    const postsLocation = document.querySelector("#posts-list");
    const { created_at, description, image_url } = post;
    const { name, avatar_url, id } = post.User;

    const postElement = document.createElement("div");

    postElement.classList.add("post");
    if (image_url == "" || image_url == null) {
      postElement.innerHTML = postWithoutImage(
        id,
        avatar_url,
        name,
        created_at,
        description
      );
      postsLocation.appendChild(postElement);
    } else {
      postElement.innerHTML = postWithImage(
        id,
        avatar_url,
        name,
        created_at,
        description,
        image_url
      );
      postsLocation.appendChild(postElement);
    }

    const postText = postElement.querySelector(".post-text p");

    if (postText.textContent == "") {
      postElement.removeChild(postElement.querySelector(".post-text"));
    }

    const commentBtn = postElement.querySelector("#comment-btn");
    commentBtn.addEventListener("click", commentsModal);
    const sr = ScrollReveal({ reset: true });

    sr.reveal(".post", {
      origin: "bottom",
      distance: "1.5rem",
      duration: 600,
      reset: false,
      beforeReveal: (post) => {
        post.style = `
        visibility: visible; opacity: 1; transition: opacity 0.6s cubic-bezier(0.5, 0, 0, 1) 0s, transform 0.6s cubic-bezier(0.5, 0, 0, 1) 0s;
        `;
        pageLoader.stopLoader();
      },
    });
  });
}
