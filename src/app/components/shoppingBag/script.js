import { ShoppingBag } from "../../class/bag.class.js";
import { pageLoader } from "../pageLoader/index.js";

const closeBagBtn = document.querySelector("#shopping-bag .ph-x");
const selectAll = document.querySelector(".mark-all");
const continueBtn = document.querySelector("#init-order-btn");
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
  const { name, price, author, image, id } = book;
  const formatedPrice = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  let element = document.createElement("li");

  element.classList.add("item");
  element.setAttribute("data-id", id);

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
      <div class="quantity-buttons">
  <button class="ph-bold ph-minus" data-action="decrement"></button>
  <p class="quantity">1</p>
  <button class="ph-bold ph-plus" data-action="increment"></button>
</div>
    </div>
  `;
  return element;
}

export async function setData() {
  const bagClass = new ShoppingBag();
  const list = bag.querySelector("ul");
  list.innerHTML = "";

  const data = await bagClass.loadItens();
  if (data.message) return false;

  return data.products.map((book) => {
    const item = createElement(book);
    const quantityButtons = item.querySelectorAll(".quantity-buttons button");

    quantityButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const checkbox = item.querySelector("input[type='checkbox']");
        if (!checkbox.checked) return;
        const action = button.getAttribute("data-action");
        const data = {
          id: e.target.parentElement.parentElement
            .querySelector(".price")
            .getAttribute("id"),
        };

        quantityProductControlls[action](data);
      });
    });

    list.appendChild(item);
    return item;
  });
}

const listBagItens = async () => {
  const itens = await setData();
  if (!itens) return;
  return itens.map((li) => li.querySelector(".book-info .checked"));
};

let allCheckbox = await listBagItens();

const updatePurchaseValue = {
  add(newItem) {
    products.push(newItem);
    finalValue = products.reduce((accum, item) => accum + item.finalPrice, 0);
    this.setPurchaseValue();
  },
  remove(product) {
    const price = product.price;
    finalValue -= price;
    products = products.filter((item) => {
      return item.id != product.id;
    });
    return this.setPurchaseValue();
  },
  setPurchaseValue() {
    if (products.length <= 0) {
      finalValue = 0;
    }
    const price = finalValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    purchaseValue.textContent = price;
  },
  addOrRemoveItem(element) {
    let price = element.parentElement.querySelector(".price").textContent;
    price = parseFloat(price.replace("R$", "").replace(",", "."));

    const product = {
      quantity: 1,
      basePrice: price,
      finalPrice: 0,
      id: element.parentElement.querySelector(".price").getAttribute("id"),
      element: element.parentElement.parentElement,
    };
    const { quantity, basePrice } = product;
    product.finalPrice = basePrice * quantity;

    const target = element.checked;
    if (target) {
      return this.add(product);
    } else {
      return this.remove(product);
    }
  },
};

const quantityProductControlls = {
  displayValue: document.querySelector(".quantity-buttons p"),
  list: bag.querySelector("li.item"),

  increment(product) {
    const position = products.findIndex((item) => item.id == product.id);
    const item = products.splice(position)[0];
    item.quantity += 1;

    const { basePrice, quantity } = item;

    item.finalPrice = basePrice * quantity;
    updatePurchaseValue.add(item);
    return this.updateQuantityValue(quantity);
  },

  async decrement(product) {
    const position = products.findIndex((item) => item.id == product.id);
    const item = products.splice(position)[0];
    item.quantity -= 1;

    const { basePrice, quantity, id, element } = item;

    if (quantity <= 0) {
      bag.querySelector("ul").removeChild(element.parentElement);

      const bagClass = new ShoppingBag();
      const removedItem = await bagClass.removeItem({ productId: id });

      updatePurchaseValue.addOrRemoveItem(element);
      return;
    }

    item.finalPrice = basePrice * quantity;
    updatePurchaseValue.add(item);
    
    return this.updateQuantityValue(quantity);
  },

  updateQuantityValue(quantity) {
    this.displayValue.innerText = quantity;
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
