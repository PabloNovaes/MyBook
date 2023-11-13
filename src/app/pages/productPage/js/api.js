import axios from "../../../services/axios/axios.js";
const cards = document.querySelector("#cards");

const getProductId = () => {
  const locationId = window.location.href.split("/")[4];
  let id = locationId.split("id=")[1];
  return id;
};

const getData = async () => {
  const id = getProductId();
  const response = await axios.get(`/products/id=${id}`);
  const data = await response.data;
  return data;
};

export async function setData() {
  const book = await getData();
  const { name, author, price, image, description } = book;
  const formatedPrice = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  document.querySelector("#img img").src = image;
  document.querySelector("header h1").textContent = name;
  document.querySelector("#author").textContent = author;
  document.querySelector("#description-content").textContent = description;
  document.querySelector("#book-details #price").textContent = formatedPrice;
  console.log(book);
}

export function recommendBooks() {
  const books = data;
  let i = 0;
  books.forEach((book) => {
    const { bookName, bookPrice, bookAuthor, bookImg } = book;
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="img">
              <img src="${bookImg}" alt="">
            </div>
            <div class="book-data">
            <p class="title">${bookName}</p>
            <p class="author">${bookAuthor}</p>
            <p class="price">${bookPrice}</p>
            </div>
          </div>
      `;
    if (i < 10) {
      cards.appendChild(card);
      i++;
    }
  });
}
