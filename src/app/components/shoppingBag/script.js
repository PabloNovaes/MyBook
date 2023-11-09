localStorage.removeItem("itens");

const closeBagBtn = document.querySelector("#shopping-bag .ph-x");
const bag = document.querySelector("#shopping-bag");
const selectAll = document.querySelector("#select-all input");
const purchaseValue = document.querySelector("#price");
let finalValue = 0;
let startOrder = JSON.parse(localStorage.getItem("itens")) || [];

export const openAndCloseBag = () => {
  if (!window.innerWidth > 664) return;

  document.body.classList.toggle("hidden");
  shadow.classList.toggle("viewShadow");
  bag.classList.toggle("open-bag");
};

closeBagBtn.addEventListener("click", openAndCloseBag);

async function setData() {
  const response = await axios.get("../../components/shoppingBag/romance.json");
  const data = response.data;
  const list = bag.querySelector("ul");

  const items = data.map((book) => {
    let item = document.createElement("li");
    item.classList.add("item");

    const { bookName, bookPrice, bookAuthor, bookImg } = book;

    item.innerHTML = `
      <div class="img">
        <img src='${bookImg}' />
      </div>
      <div class="book-info">
        <p class="title">${bookName}</p>
        <p class="author">${bookAuthor}</p>
        <span>
          <p class="price">${bookPrice}</p>
          <input type="checkbox" name="" class="checked" />
        </span>
      </div>
    `;

    list.appendChild(item);

    return item;
  });

  return items;
}

const items = await setData();

const getCheckboxOnProducts = items.map((li) =>
  li.querySelector(".book-info .checked")
);

const isAllChecked = () => {
  const all = getCheckboxOnProducts.every((btn) => btn.checked);
  selectAll.checked = all;
  return all;
};

selectAll.addEventListener("click", function () {
  getCheckboxOnProducts.forEach((btn) => {
    btn.checked = this.checked;
    const data = btn.parentElement.parentElement;
    const book = {
      name: data.querySelector(".title").textContent,
      price: parseInt(data.querySelector(".price").textContent.split("R$")[1]),
    };
    if (btn.checked) {
      unselectItem(book);
      selectItem(book);
    } else {
      unselectItem(book);
    }
  });
});

getCheckboxOnProducts.forEach((btn) => {
  btn.addEventListener("click", () => {
    isAllChecked();
    const data = event.target.parentElement.parentElement;
    const book = {
      name: data.querySelector(".title").textContent,
      price: parseInt(data.querySelector(".price").textContent.split("R$")[1]),
    };
    if (btn.checked) {
      selectItem(book);
    } else {
      unselectItem(book);
    }
  });
});

const updatePurchaseValue = () => {
  finalValue = startOrder.reduce((accum, book) => accum + book.price, 0);
  purchaseValue.innerHTML = `R$${finalValue},00`;
};

const selectItem = (book) => {
  if (!book) {
    return;
  }

  const itemExists = startOrder.some((listBook) => listBook.name === book.name);

  if (!itemExists) {
    startOrder.push(book);
    localStorage.setItem("itens", JSON.stringify(startOrder));
    updatePurchaseValue();
  } else {
    unselectItem(book);
  }
};

const unselectItem = (book) => {
  startOrder = startOrder.filter((listBook) => listBook.name !== book.name);
  localStorage.setItem("itens", JSON.stringify(startOrder));
  updatePurchaseValue();
};
