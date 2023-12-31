import { pageLoader } from "../../../components/pageLoader/index.js";
import {
  setPaymentMethods,
  setAdressFromOrder,
  registerAdressModal,
  error,
  success,
} from "../../../sweetAlert/sweet.js";
import { creatOrder, loadOrderProducts, loadUserAdresses } from "./api.js";

const selectPaymentMethod = document.querySelector("#payment-methods");
const selectAdressOrder = document.querySelector("#address");
const makeOrder = document.querySelector("#buy-values button");

localStorage.removeItem("newAdress")

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

    const createAdressOnBuy = (adress) => {
      selectAdressOrder.addEventListener("click", () => {
        setAdressFromOrder(selectAdressOrder, [adress])
      });
    }

    selectPaymentMethod.addEventListener("click", () => {
      setPaymentMethods(selectPaymentMethod);
    });

    if (adresses.length == 0) {
      await registerAdressModal(createAdressOnBuy)
    } else {
      selectAdressOrder.addEventListener("click", () => {
        setAdressFromOrder(selectAdressOrder, adresses)
      });
    }

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
  const validate = selectPaymentMethod.getAttribute("method") === "unselected" && selectAdressOrder.getAttribute("adress") === "unselected"
  if (validate) {
    return error("Preencha todas as informações para realizar um pedido!")
  };

  try {
    pageLoader.startLoader();
    const paymentMethods = {
      boleto: "boleto",
      card: "card",
    };


    const methodType = selectPaymentMethod.getAttribute("method");

    const method = paymentMethods[methodType];
    const adressId = selectAdressOrder.getAttribute("adress-id");
    const products = JSON.parse(localStorage.getItem("Products"));

    await creatOrder(method, products, adressId);

    success("Pedido relizado com sucesso!");
    return window.location.href = "/profile"
  } catch (err) {
    return error(`Ocorreu um erro inesperado! ${err}`);
  } finally {
    return pageLoader.stopLoader();
  }
});
