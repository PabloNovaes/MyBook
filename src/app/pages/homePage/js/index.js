import { getProducts, getProductsWithParams } from "./api.js";
import { sr } from "./api.js";

const orderItensBtn = document.querySelector("#order");
const viewMoreBtn = document.querySelector("#view-more");

sr.reveal("#view-more", {
  origin: "right",
  distance: "2rem",
  opacity: 0,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

orderItensBtn.addEventListener("click", () => {
  cards.classList.toggle("list-mode");
});

viewMoreBtn.addEventListener("click", () => getProductsWithParams(viewMoreBtn));
document.addEventListener(
  "DOMContentLoaded",
  async () => await getProducts(viewMoreBtn)
);
