import { Chat } from "../../../class/chat.class.js";
const orderItensBtn = document.querySelector("#order");
const chat = new Chat();

import { getdata } from "./api.js";
orderItensBtn.addEventListener("click", () => {
  cards.classList.toggle("list-mode");
});

getdata();
