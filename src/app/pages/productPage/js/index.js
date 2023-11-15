import { setData } from "../../../components/shoppingBag/script.js";
import axios from "../../../services/axios/axios.js";
import { error, success } from "../../../sweetAlert/sweet.js";
import { getProductId, loadProduct } from "./api.js";

const closeCommentsBtn = document.querySelector("#close-comments");
const viewAll = document.querySelector("#show-all-comments");
const bagBtn = document.querySelector("button#bag-btn");
const header = document.querySelector("#main-header");
const list = document.querySelector("#bagList-itens");

loadProduct()

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

const saveProduct = {
  async inBag(product) {
    try {
      const response = await axios.post("/bag/add-item", product);
      const item = await response.data;
      return item;
    } catch (error) {
      return error;
    }
  },
};

viewAll.addEventListener("click", showAllComments);

closeCommentsBtn.addEventListener("click", showAllComments);


bagBtn.addEventListener("click", async () => {
  try {
    const product = { productId: getProductId() };
    const addItem = await saveProduct.inBag(product);
    await setData();
    return success("Produto adicionado ao carrinho");
  } catch (err) {
    console.log(err);
    return error("Ocorreu um erro inesperado!");
  }
});
