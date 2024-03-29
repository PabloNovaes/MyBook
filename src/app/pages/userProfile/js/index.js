import { postWithImage, postWithoutImage } from "../../userProfile/js/post-template.js";
import { openCommentsModal } from "../../feedPage/js/api.js"
import { Comment } from "../../../class/comments.class.js";
import { pageLoader } from "../../../components/pageLoader/index.js";
import { renderCommentsByPost } from "../../feedPage/js/api.js";
import {
  error,
  success,
  viewImageProfileModal,
} from "../../../sweetAlert/sweet.js";
import { User } from "../../../class/user.class.js";
import { Chat } from "../../../class/chat.class.js";

import "https://unpkg.com/scrollreveal";

const user = new User();
const initChatBtn = document.querySelector("#init-chat");
const imgOptions = document.querySelector("#image-options");
const viewProfileImage = document.querySelector("#image-options ul li");
const controllsOptions = imgOptions.querySelectorAll("ul .option");
const hideImgOptions = imgOptions.querySelector("header");
const img = document.querySelector("#user-img");

const modalElement = document.querySelector("#comment-modal")
const commentsList = modalElement.querySelector("ul#comments")
const modalCase = document.querySelector("#comment-modal-case")

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
      console.log(err)
      return error("Ocorreu um erro inesperado")
    }
  })
}

function viewOrHideOptions() {
  imgOptions.classList.toggle("view-image-options");
  document.body.classList.toggle("hidden");
  shadow.classList.toggle("viewShadow");
}

const getVisitedUserId = () => {
  const locationId = window.location.href.split("/")[4];
  let id = locationId.split("id=")[1];
  return id;
};

function renderPost(post, user) {
  const postsLocation = document.querySelector("#posts-list");
  const { created_at, description, image_url, id } = post;
  const { name, avatar_url, id: userId } = user

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

async function getData() {
  try {
    pageLoader.startLoader();
    let userName, postQuantity, userImg, nickName;


    const id = getVisitedUserId();
    const data = await user.renderAnotherUserData(id);

    const userData = data.user;
    const posts = data.posts;
    const { avatar_url, name, nickname } = userData;

    userName = document.querySelector("#name").innerText = name;
    nickName = document.querySelector("#user-name").innerText = nickname;
    userImg = document.querySelector("#user-img").src = avatar_url;
    postQuantity = document.querySelector("#post-quantity p").innerText =
      posts.length;

    if (posts.length == 0) return

    posts.forEach((post) => {
      renderPost(post, userData);
    });
  } catch {
    return error("Ocorreu um erro inesperado")
  } finally {
    pageLoader.stopLoader()
  }
}

initChatBtn.addEventListener("click", async () => {
  pageLoader.startLoader();
  try {
    const chat = new Chat();

    const { name, avatar_url, id } = JSON.parse(localStorage.getItem("User"));

    const currentUser = {
      id,
      name,
      avatar_url,
    };

    const visitedUser = {
      id: getVisitedUserId(),
      name: document.querySelector("#name").textContent,
      avatar_url: document.querySelector("#user-img").getAttribute("src"),
    };

    if (visitedUser.id == currentUser.id)
      return error(
        "Você não pode iniciar uma conversa com você mesmo, ta carente compra um hamster"
      );

    const chats = await chat.listConversations(currentUser.id);

    const chatAlredyExists = chats.some((chat) => {
      const { id } = chat;
      return visitedUser.id == id;
    });

    if (chatAlredyExists) return error("Essa conversa já existe!");

    await chat.initChat(currentUser, visitedUser);

    pageLoader.stopLoader();
    window.location.href = "/chat";
  } catch (err) {
    return error(err);
  } finally {
    pageLoader.stopLoader();
  }
});

controllsOptions.forEach((option) =>
  option.addEventListener("click", viewOrHideOptions)
);

hideImgOptions.addEventListener("click", viewOrHideOptions);

img.addEventListener("click", viewOrHideOptions);

viewProfileImage.addEventListener("click", () => {
  viewImageProfileModal(img.src);
});

getData();
