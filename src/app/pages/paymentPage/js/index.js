import { pageLoader } from "../../../components/pageLoader/index.js";
import {
  setPaymentMethods,
  setAdressFromOrder,
  error,
  success,
} from "../../../sweetAlert/sweet.js";
import { creatOrder, loadOrderProducts, loadUserAdresses } from "./api.js";

const selectPaymentMethod = document.querySelector("#payment-methods");
const selectAdressOrder = document.querySelector("#address");
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
  try {
    pageLoader.startLoader();

    const productsList = document.querySelector(".list-case ul");
    const data = JSON.parse(localStorage.getItem("Products"));

    const [products, adresses] = await Promise.all([
      loadOrderProducts(data),
      loadUserAdresses(),
    ]);

    selectPaymentMethod.addEventListener("click", () => {
      setPaymentMethods(selectPaymentMethod);
    });

    selectAdressOrder.addEventListener("click", () =>
      setAdressFromOrder(selectAdressOrder, adresses)
    );

    products.forEach((product) => {
      const element = renderProduct(product);
      return productsList.appendChild(element);
    });

    setOrderValues(products);
  } catch (err) {
    return error(`Ocorreu um erro inesperado! ${err}`);
  } finally {
    return pageLoader.stopLoader();
  }
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
    const adressId = selectAdressOrder.getAttribute("adress-id");
    const products = JSON.parse(localStorage.getItem("Products"));

    const execute = await creatOrder(method, products, adressId);
    return success("Pedido relizado com sucesso!");
  } catch (err) {
    console.log(error);
    return error(`Ocorreu um erro inesperado! ${err}`);
  }
});
