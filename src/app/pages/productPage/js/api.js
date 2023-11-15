import axios from "../../../services/axios/axios.js";
import { pageLoader } from "../../../components/pageLoader/index.js";
import { error } from "../../../sweetAlert/sweet.js";
import { sr } from "../../homePage/js/api.js";

const cards = document.querySelector("#cards");

export const getProductId = () => {
  const locationId = window.location.href.split("/")[4];
  let id = locationId.split("id=")[1];
  return id;
};

async function recommendBooks(category) {
  const response = await axios.get(`/all-products/${category}`);
  const books = await response.data.sort(() => Math.random() - 0.5);
  let count = 1;

  books.forEach((book) => {
    const { name, price, author, image, id } = book;
    const formatedPrice = price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
     
    <a href=' /product/id=${id}'>
    
    <div class="img">
              <img loading="lazy" src="${image}" alt="">
              </div>
              </a>
            <div class="book-data">
            <a class="card-title" href=' /product/id=${id}'>${name}</a>
            <p class="card-author">${author}</p>
            <p class="card-price">${formatedPrice}</p>
            </div>
            </div>
            `;

    if (count <= 20) {
      cards.appendChild(card);
      return count++;
    }

    sr.reveal(".card", {
      origin: "bottom",
      distance: "2rem",
      reset: false,
      easing: "cubic-bezier(0.5, 0, 0, 1)",
      zIndex: 0,
    });
  });
}

const getData = async () => {
  const id = getProductId();
  const response = await axios.get(`/products/id=${id}`);
  const data = await response.data;
  return data;
};

export async function loadProduct() {
  try {
    // pageLoader.startLoader();
    const book = await getData();
    const { name, author, price, image, description, category, id } = book;
    const formatedPrice = price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    document.querySelector("#img img").src = image;
    document.querySelector("header h1").textContent = name;
    document.querySelector("#author").textContent = author;
    document.querySelector("#description-content").textContent = description;
    document.querySelector("#book-details #price").textContent = formatedPrice;

    await recommendBooks(category);
  } catch (err) {
    return error(`Ocorreu um erro inesperado! ${err}`);
  } finally {
    pageLoader.stopLoader();
  }
}
