const orderBtn = document.querySelector("#order");

import { getdata } from "./api.js";


orderBtn.addEventListener("click", () => {
  cards.classList.toggle("list-mode");
});


getdata();
