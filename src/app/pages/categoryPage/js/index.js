import { getdata } from "./api.js";

const orderBtn = document.querySelector("#order");

orderBtn.addEventListener("click", () => {
  cards.classList.toggle("list-mode");
});


document.addEventListener("DOMContentLoaded", getdata)