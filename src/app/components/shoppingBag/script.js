const closeBagBtn = document.querySelector("#shopping-bag .ph-x");
const continueBtn = document.querySelector("#init-order-btn");
const selectAll = document.querySelector("#select-all input");
const purchaseValue = document.querySelector("#price");
const bag = document.querySelector("#shopping-bag");

let products = [];
let finalValue;

export const openAndCloseBag = () => {
  if (!window.innerWidth > 664) return;

  document.body.classList.toggle("hidden");
  shadow.classList.toggle("viewShadow");
  bag.classList.toggle("open-bag");

  localStorage.removeItem("Products");
};

export function createElement(book) {
  let element = document.createElement("li");
  element.classList.add("item");

  const { name, price, author, image, id } = book;
  const formatedPrice = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  element.innerHTML = `
    <div class="img">
      <img src='${image}' />
    </div>
    <div class="book-info">
      <p class="title">${name}</p>
      <p class="author">${author}</p>
      <span>
        <p class="price" id=${id}>${formatedPrice}</p>
        <input type="checkbox" name="" class="checked" />
      </span>
    </div>
  `;
  return element;
}

export async function setData() {
  const list = bag.querySelector("ul");

  const response = await axios.get("/bag/get-itens");
  const data = await response.data.products;

  if (response.data.message) return false;

  return data.map((book) => {
    const item = createElement(book);
    list.appendChild(item);
    return item;
  });
}

const setBagItens = async () => {
  const itens = await setData();
  if (!itens) return;
  return itens.map((li) => li.querySelector(".book-info .checked"));
};

const allCheckbox = await setBagItens();

const updatePurchaseValue = {
  add(newItem) {
    products.push(newItem);
    const formatedPrices = products.map((item) => {
      const price = parseFloat(item.price.replace("R$", "").replace(",", "."));
      return price;
    });
    finalValue = formatedPrices.reduce((accum, item) => accum + item, 0);
    this.setPurchaseValue(finalValue);
  },
  remove(product) {
    const price = parseFloat(product.price.replace("R$", "").replace(",", "."));
    finalValue -= price;
    products = products.filter((item) => {
      return item.id != product.id;
    });
    return this.setPurchaseValue(finalValue);
  },
  setPurchaseValue(value) {
    const price = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    purchaseValue.textContent = price;
  },
  addOrRemoveItem(element) {
    const product = {
      price: element.parentElement.querySelector(".price").textContent,
      id: element.parentElement.querySelector(".price").getAttribute("id"),
    };
    const target = element.checked;
    if (target) {
      return this.add(product);
    } else {
      return this.remove(product);
    }
  },
};

allCheckbox?.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allIsChecked = allCheckbox.every((btn) => btn.checked == true);
    updatePurchaseValue.addOrRemoveItem(e.target);
    if (allIsChecked) {
      return (selectAll.checked = true);
    } else {
      return (selectAll.checked = false);
    }
  });
});

selectAll.addEventListener("click", (e) => {
  const state = e.target.checked;
  allCheckbox.forEach((btn) => {
    if (btn.checked != state) {
      btn.checked = state;
      updatePurchaseValue.addOrRemoveItem(btn);
    }
  });
  if (!state) {
    products = [];
    finalValue = 0;
    updatePurchaseValue.setPurchaseValue(finalValue);
    return;
  }
});

continueBtn.addEventListener("click", () => {
  localStorage.setItem("Products", JSON.stringify(products));
  window.location.href = "/payment";
});

closeBagBtn.addEventListener("click", openAndCloseBag);
