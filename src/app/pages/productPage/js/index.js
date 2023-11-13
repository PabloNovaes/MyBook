const header = document.querySelector("#main-header");
const viewAll = document.querySelector("#show-all-comments");
const closeCommentsBtn = document.querySelector("#close-comments");

import { setData, recommendBooks } from "./api.js";

setData();

// recommendBooks();

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("translate");
    header.classList.add("header-shadow");
  } else {
    header.classList.remove("translate");
    header.classList.remove("header-shadow");
  }
});

const showAllComments = () => {
  const allComments = document.querySelector("#all-comments");
  allComments.classList.toggle("translate");
  const body = document.body;
  body.classList.toggle("hidden");
};

viewAll.addEventListener("click", showAllComments);
closeCommentsBtn.addEventListener("click", showAllComments);
