import "https://unpkg.com/scrollreveal";
// import "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js";
// import "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";



const cards = document.querySelector("#cards");

export async function getdata() {
  const sr = ScrollReveal({ reset: true });

  fetch("../../pages/homePage/romance.json")
    .then((res) => res.json())
    .then((data) => {
      const books = data;
      books.forEach((book) => {
        const { bookName, bookPrice, bookAuthor, bookImg } = book;
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

      sr.reveal(".card", {
        origin: "bottom",
        distance: "1.5rem",
        duration: 1800,
        reset: false,
        zIndex: 0,
        beforeReveal: (card) => {
          card.style = "";
        },
      });
    });
}
