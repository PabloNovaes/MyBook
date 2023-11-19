import {
  setPaymentMethods,
  error,
  success,
} from "../../../sweetAlert/sweet.js";
import { creatOrder, loadOrderProducts } from "./api.js";

const selectPaymentMethod = document.querySelector("#payment-methods");
const makeOrder = document.querySelector("#buy-values button");

function renderProduct(product) {
  const { price, name, image, author } = product;
  const formattedPrice = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const li = document.createElement("li");
  li.classList.add("item");
  li.innerHTML = `
    <li class="item">
                    <div class="img">
                      <img src=${image} alt="">
                    </div>
                    <div id="book-info">
                      <p id="title">${name}</p>
                      <p id="author">${author}</p>
                      <p id="price">${formattedPrice}</p>
                    </div>
                  </li>
    `;

  return li;
}

function setOrderValues(products) {
  const values = {
    sub: products.reduce((accum, product) => accum + product.price, 0),
    total: products.reduce((accum, product) => accum + product.price, 0) + 12,
  };

  const subTotal = (document.querySelector("#sub-total").innerHTML = `
    ${values.sub.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}
  `);

  const total = (document.querySelector("#total").innerHTML = `
  ${values.total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}
`);
}

window.addEventListener("DOMContentLoaded", async () => {
  const productsList = document.querySelector(".list-case ul");
  const data = JSON.parse(localStorage.getItem("Products"));
  const products = await loadOrderProducts(data);

  products.forEach((product) => {
    const element = renderProduct(product);
    return productsList.appendChild(element);
  });

  setOrderValues(products);
});

selectPaymentMethod.addEventListener("click", async (e) => {
  setPaymentMethods(selectPaymentMethod);
});

makeOrder.addEventListener("click", async () => {
  const paymentMethods = {
    boleto: "boleto",
    card: "card",
  };

  try {
    if (selectPaymentMethod.getAttribute("method") == "unselected") return;

    const methodType = selectPaymentMethod.getAttribute("method");
    const method = paymentMethods[methodType];

    const products = JSON.parse(localStorage.getItem("Products"));

    const execute = await creatOrder(method, products);
    return success("Pedido relizado com sucesso!");
  } catch (err) {
    return error(`Ocorreu um erro inesperado! ${err}`);
  }
});
