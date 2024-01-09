import { Chat } from "../../../class/chat.class.js";
// import { openAndCloseSidebar } from "../../../components/header/scripts/script.js";
const arrowBack = document.querySelector("#back-from-conversations");
const localMessages = document.querySelector(".local-messages ul");
const inputMessage = document.querySelector("#chat-body input");
const sendMessageBtn = document.querySelector("#sendMessage");
const chatBody = document.querySelector("#chat-body");
const sidebarBtn = document.querySelector("#sidebar_btn");

export const chatWindow = {
  renderMessage({ avatar_url, content, id, created }) {
    const sendIn = created.split(",")[1].split(":");
    const currentId = JSON.parse(localStorage.getItem("User"));

    const messageElement = document.createElement("li");
    messageElement.classList.add("message-box");
    messageElement.innerHTML = ` 
    <div>
      <img src=${avatar_url} alt="" />
       <div>
       <p class="content">${content}
       </p>
       <span class="send-in">${sendIn[0]}:${sendIn[1]}</span>
          
        </div>
    </div>
    `;

    if (currentId.id == id) {
      messageElement.style.flexDirection = "row-reverse";
      messageElement.querySelector("div").style.flexDirection = "row-reverse";
      messageElement.querySelector("div div").style.textAlign = "start";
    }
    localMessages.appendChild(messageElement);
  },

  async openChat({ name, image, chatId }) {
    const chat = new Chat();
    const chatHeader = document.querySelector("#user-in-chat");
    chatHeader.querySelector("p").innerText = name;
    chatHeader.querySelector("img").src = image;
    chatHeader.setAttribute("chat-id", chatId);

    if (window.innerWidth > 820) {
      await chat.loadMessages(chatWindow.renderMessage, chatId, localMessages);
    }

    chatBody.classList.toggle("open-chat");
    await chat.loadMessages(chatWindow.renderMessage, chatId, localMessages);
  },
  closeChat() {
    const chatHeader = document.querySelector("#user-in-chat");
    chatHeader.querySelector("p").innerText = "";
    chatHeader.querySelector("img").src = "";
    chatHeader.removeAttribute("chat-id");

    chatBody.classList.toggle("open-chat");
  },

  async sendMessage() {
    inputMessage.focus();
    const chat = new Chat();
    const chatId = document
      .querySelector("#user-in-chat")
      .getAttribute("chat-id");
    const value = inputMessage.value;

    if (inputMessage.value == "") {
      return;
    }

    const { avatar_url, id } = JSON.parse(localStorage.getItem("User"));

    const message = {
      content: value,
      created: new Date().toLocaleString(),
      avatar_url,
      id,
    };
    inputMessage.value = "";

    chat.sendMessage(chatId, message, localMessages);
  },
};

sendMessageBtn.addEventListener("click", chatWindow.sendMessage);

arrowBack.addEventListener("click", () => {
  if (window.innerWidth < 820) {
    chatWindow.closeChat();
    history.replaceState(null, null, "/chat");
    localMessages.innerHTML = "";
  }
});

inputMessage.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    chatWindow.sendMessage();
  }
});

localMessages.parentElement.addEventListener("touchmove", () =>
  inputMessage.blur()
);

// sidebarBtn.addEventListener("click", openAndCloseSidebar);

window.addEventListener("popstate", chatWindow.closeChat);
