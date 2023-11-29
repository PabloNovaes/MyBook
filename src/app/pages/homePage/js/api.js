import "https://unpkg.com/scrollreveal";
import axios from "../../../services/axios/axios.js";
import { error } from "../../../sweetAlert/sweet.js";
import { pageLoader } from "../../../components/pageLoader/index.js";

const cards = document.querySelector("#cards");
export const sr = ScrollReveal({ reset: true });

//variaveis para "paginação"

let totalPages;
let totalProducts;
let currentPage = 0;
const productSkip = 40;

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
      beforeReveal: (card) => {
        card.style = "";
      },
    });

    cards.appendChild(element);
  });
}

export async function getProducts(button) {
  try {
    pageLoader.startLoader();

    const response = await axios.get("/all-products");
    const books = await response.data.products.sort(() => Math.random() - 0.5);

    totalPages = response.data.totalPages;
    totalProducts = response.data.total;

    totalProducts -= productSkip;

    button.innerText = `Mostrar mais ${totalProducts} produtos`;
    button.style.display = "flex";

    return renderBooks(books);
  } catch (err) {
    error(`Ocorreu um erro inesperado!`);
  } finally {
    return pageLoader.stopLoader();
  }
}

export async function getProductsWithParams(button) {
  try {
    currentPage++;
    totalProducts -= productSkip;

    if (currentPage >= totalPages) {
      return (button.style.display = "none");
    }

    pageLoader.startLoader();
    const response = await axios.get(
      `/all-products?skip=${productSkip * currentPage}&take=40`
    );
    const books = await response.data.products.sort(() => Math.random() - 0.5);

    button.innerText = `Mostrar mais ${totalProducts} produtos`;
    return renderBooks(books);
  } catch (err) {
    return error("Ocorreu um erro inesperado");
  } finally {
    pageLoader.stopLoader();
  }
}