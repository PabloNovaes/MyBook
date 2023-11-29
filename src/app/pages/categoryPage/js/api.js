import "https://unpkg.com/scrollreveal";
import axios from "../../../services/axios/axios.js"
import { pageLoader } from "../../../components/pageLoader/index.js";
import { sr } from "../../homePage/js/api.js";
import { error } from "../../../sweetAlert/sweet.js";

const cards = document.querySelector("#cards");

function getProductsCategory() {
  let url = window.location.href.split("/")
  url = url[3].split("=")[1]
  return url.charAt(0).toUpperCase() + url.slice(1)
}

function renderBooks(books) {
  books.forEach((book) => {
    const element = document.createElement("div");

    const { name, price, author, image, id } = book;
    const formatedPrice = price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    element.classList.add("card");
    element.innerHTML = `
    <a href=' /product/id=${id}' id='title'>
    
    <div class="img">
              <img loading="lazy" src="${image}" alt="">
              </div>
              </a>
            <div id="book-info">
            <a href=' /product/id=${id}' id='title'>${name}</a>
            <p id="author">${author}</p>
            <p id="price">${formatedPrice}</p>
            </div>
            </div>
            `;

    sr.reveal(".card", {
      origin: "bottom",
      distance: "2rem",
      reset: false,
      easing: "cubic-bezier(0.5, 0, 0, 1)",
      zIndex: 0,
      beforeReveal: (post) => {
        post.style = "";
      },
    });

    cards.appendChild(element);
  });
}

export async function getdata() {
  try {
    pageLoader.startLoader()

    const category = getProductsCategory()
    const response = await axios.get(`/all-products/${category}`)
    const books = await response.data.sort(() => Math.random() - 0.5);

    const { data } = response

    const resultQuantity = document.querySelector("#results p").innerText = `${data.length} Resultados`

    return renderBooks(books)
  } catch (err) {
    error("Ocorreu um erro inesperado!")
    throw new Error(err)
  } finally {
    return pageLoader.stopLoader()
  }
}
