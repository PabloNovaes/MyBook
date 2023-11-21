import { postWithImage, postWithoutImage } from "../../profile/js/posts.js";
import { pageLoader } from "../../../components/pageLoader/index.js";
import {
  commentsModal,
  error,
  viewImageProfileModal,
} from "../../../sweetAlert/sweet.js";
import { User } from "../../../class/user.class.js";
import { Chat } from "../../../class/chat.class.js";

const user = new User();
const initChatBtn = document.querySelector("#init-chat");
const imgOptions = document.querySelector("#image-options");
const viewProfileImage = document.querySelector("#image-options ul li");
const controllsOptions = imgOptions.querySelectorAll("ul .option");
const hideImgOptions = imgOptions.querySelector("header");
const img = document.querySelector("#user-img");

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

async function renderPost(post, user) {
  const postsLocation = document.querySelector("#posts-list");
  const { created_at, description, image_url } = post;
  const { name, avatar_url } = user;

  const postElement = document.createElement("div");
  postElement.classList.add("post");
  if (image_url == "" || image_url == null) {
    postElement.innerHTML = postWithoutImage(
      avatar_url,
      name,
      created_at,
      description
    );
    postsLocation.appendChild(postElement);
  } else {
    postElement.innerHTML = postWithImage(
      avatar_url,
      name,
      created_at,
      description,
      image_url
    );
    postsLocation.appendChild(postElement);
  }

  const commentBtn = postElement.querySelector("#comment-btn");
  commentBtn.addEventListener("click", commentsModal);
  const sr = ScrollReveal({ reset: true });

  sr.reveal(".post", {
    origin: "bottom",
    distance: "1.5rem",
    duration: 600,
    reset: false,
  });
}

async function getData() {
  let userName, postQuantity, userImg, nickName;

  pageLoader.startLoader();

  const id = getVisitedUserId();
  const data = await user.renderAnotherUserData(id);

  const userData = data.user;
  const posts = data.posts;
  const { avatar_url, name, nickname } = userData;

  userName = document.querySelector("#name").innerText = name;
  nickName = document.querySelector("#user-name").innerText = nickname
  userImg = document.querySelector("#user-img").src = avatar_url;
  postQuantity = document.querySelector("#post-quantity p").innerText =
    posts.length;

  posts.forEach(async (post) => {
    await renderPost(post, userData);
    pageLoader.stopLoader();
  });
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
