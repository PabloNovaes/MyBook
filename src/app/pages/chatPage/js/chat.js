import {
  onSnapshot,
  doc,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { pageLoader } from "../../../components/pageLoader/index.js";
import { Chat, db } from "../../../class/chat.class.js";
import { chatWindow } from "./index.js";
import "https://unpkg.com/scrollreveal";

const searchUserInput = document.querySelector("#search-user");
const usersList = document.querySelector("#list-users");

const chat = new Chat();

function timeDiff(time) {
  const now = new Date();
  const messageTime = time.split(",")[0].split("/");

  const diff = Math.abs(
    now -
      new Date(
        `${messageTime[2]}-${messageTime[1]}-${messageTime[0]},  ${
          time.split(",")[1]
        }`
      )
  );
  const diffInDays = diff / (1000 * 60 * 60 * 24);
  return diffInDays;
}

const converseList = {
  async listingUsers() {
    pageLoader.startLoader();
    const message = document.querySelector("#message");
    const sr = ScrollReveal({ reset: true });

    const currentUser = JSON.parse(localStorage.getItem("User"));
    const users = await chat.listConversations(currentUser.id);

    if (users.length == 0) {
      message.style.display = "flex";
      message.classList.add("fade-in");
      return pageLoader.stopLoader();
    }
    const chatList = users.map((user) => {
      const { name, id, avatar_url, chatId } = user;

      const listElement = document.createElement("li");
      listElement.setAttribute("data-id", chatId);
      listElement.setAttribute("data-user-id", id);
      listElement.classList.add("user");

      listElement.innerHTML = `
      <img src="${avatar_url}" alt="" />
      <div class="name-and-final-message">
        <p>${name}</p>
        <span class="final-message">
      <p class="message"></p>
      <p class="send-in"></p>
        </span>
      </div>
      `;

      listElement.addEventListener("click", async (e) => {
        const data = {
          name: listElement.querySelector("div p").textContent,
          image: listElement.querySelector("img").src,
          chatId: listElement.getAttribute("data-id"),
        };

        const thisIsELement =
          e.target == "LI"
            ? listElement.classList.remove("has-new-message")
            : listElement.classList.remove("has-new-message");
        history.pushState(null, null, window.location.href);
        await chatWindow.openChat(data);
      });

      listElement.addEventListener("transitionrun", (e) => {
        const docRef = doc(db, "Mensagens", chatId);
        onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            const messages = doc.data().mensagens;
            if (messages.length == 0) return;
            converseList.setFinalMessageData(messages, listElement, e);
          }
        });
      });

      return listElement;
    });

    let itens = [...chatList];

    itens.sort((current, next) => {
      console.log(current);
      const timeCurrent = current.querySelector(
        ".final-message > .send-in"
      ).textContent;
      const timeNext = next.querySelector(
        ".final-message > .send-in"
      ).textContent;

      return timeCurrent - timeNext;
    });

    itens.forEach((item) => {
      usersList.appendChild(item);
    });

    sr.reveal(".user", {
      origin: "bottom",
      distance: "1.5rem",
      duration: 800,
      reset: false,
      beforeReveal: () => {
        pageLoader.stopLoader();
      },
    });
  },

  setFinalMessageData(messages, listElement, e) {
    const currentUser = JSON.parse(localStorage.getItem("User"));
    const { id } = currentUser;
    const localFinalMessage = listElement.querySelector(
      ".final-message .message"
    );
    const localSendIn = listElement.querySelector(".send-in");

    const finalMessage = messages[messages.length - 1];
    listElement.setAttribute("data-created", finalMessage.created);
    const messageUserId = finalMessage.id;

    const iSendMessage =
      messageUserId === id
        ? (localFinalMessage.innerText = `Você: ${finalMessage.content}`)
        : (localFinalMessage.innerText = finalMessage.content);

    const time = timeDiff(finalMessage.created);

    const sendIn = finalMessage.created.split(",")[1].split(":");
    localSendIn.innerText = `${sendIn[0]}:${sendIn[1]}`;
    if (time > 1) {
      localSendIn.innerText = "Ontem";
    } else if (time >= 2) {
      const sendIn = finalMessage.created.split(",")[0];
      localSendIn.innerText = sendIn;
    }

    converseList.setHasNewMessage(e.target);
  },

  searchUserInList() {
    const list = document.querySelectorAll("#list-users li");
    list.forEach((item) => {
      const userName = item.querySelector("p").textContent.toLowerCase();
      const value = searchUserInput.value;
      const include = !userName.includes(value)
        ? (item.style.display = "none")
        : (item.style.display = "flex");
    });
  },

  setHasNewMessage(target) {
    const chatId = document
      .querySelector("#chat-body header")
      .getAttribute("chat-id");

    const now = new Date();
    const fullTime = target.getAttribute("data-created");
    const time = fullTime.split(",")[1];
    const [days, mounth, year] = fullTime.split(",")[0].split("/");
    const elementChatId = target.getAttribute("data-id");

    const created = new Date(`${year}-${mounth}-${days}, ${time}`);

    const timeIsAceppted = now.getTime() < created.getTime() + 5000;

    if (chatId != elementChatId && timeIsAceppted) {
      target.classList.add("has-new-message");
    }
    usersList.removeChild(target);
    usersList.appendChild(target);
  },
};

searchUserInput.addEventListener("keyup", converseList.searchUserInList);
document.addEventListener("DOMContentLoaded", converseList.listingUsers);
