const cards = document.querySelector("#cards");

const getData = async () => {
  const data = await fetch("../../pages/productPage/romance.json");
  const response = await data.json();
  return response;
};

const data = await getData();

export function setData() {
  const img = document.querySelector("#img img");
  const title = document.querySelector("header h1");
  const author = document.querySelector("#author");
  const desc = document.querySelector("#description-content");
  const price = document.querySelector("#book-details #price");


  const book = data[1];
  const { bookName, bookAuthor, bookPrice, bookImg, description } = book;
  img.setAttribute("src", bookImg);
  title.textContent = bookName;
  author.textContent = bookAuthor;
  desc.textContent = description;
  price.innerHTML = bookPrice;

  console.log(price);
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
