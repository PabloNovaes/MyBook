const cards = document.querySelector("#cards");

export async function getdata() {
  fetch('../../pages/categoryPage/romance.json')
    .then((res) => res.json())
    .then((data) => {
      const books = data
      books.forEach((book) => {
        const { bookName, bookPrice, bookAuthor, bookImg } = book
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <div class="img">
                  <img src="${bookImg}" alt="">
                </div>
                <div id="book-info">
                <a href='/product' id='title'>${bookName}</a>
                <p id="author">${bookAuthor}</p>
                <p id="price">${bookPrice}</p>
                </div>
              </div>
          `;
        cards.appendChild(card);
      });
    });
}