import { Order } from "../../../class/order.class.js";
import { Checkout } from "../../../class/checkout.class.js";
import {
  orderAwaitingPaymentTemplate,
  communTemplate,
} from "./html-templates.js";
import { pageLoader } from "../../../components/pageLoader/index.js";

localStorage.removeItem("orders");

const orderPages = document.querySelectorAll(".order-page");

export async function getOrders() {
  try {
    const order = new Order();
    const reponse = order.getOrders();
    const orders = await reponse;

    return orders;
  } catch (error) {
    return error;
  }
}

async function setProductsToken(orders, orderId) {
  try {
    let orderProducts = orders.filter((order) => {
      if (order.id === orderId) {
        return order;
      }
    });

    const checkout = new Checkout();
    const reponse = await checkout.setTokenToProducts(orderProducts[0]);
    const setToken = await reponse;
    return setToken;
  } catch (error) {
    return error;
  }
}

export async function renderOrders(order) {
  try {
    const { products, id, status } = order;

    const li = document.createElement("li");
    li.setAttribute("order-id", id);
    li.innerHTML =
      status == "AWAITING_PAYMENT"
        ? orderAwaitingPaymentTemplate(order)
        : communTemplate(order);

    orderPages.forEach((page) => {
      if (page.getAttribute("data-id") === status) {
        page.querySelector(".dont-have-orders").style.display = "none";
        return page.querySelector(".orders ul").appendChild(li);
      }
    });

    li.querySelectorAll(".pay-now").forEach((button) => {
      button.addEventListener("click", async (e) => {
        pageLoader.startLoader();
        try {
          let orderId = e.target.parentElement.parentElement.parentElement;
          orderId = orderId.getAttribute("order-id");

          const createOrderToken = await setProductsToken(
            JSON.parse(localStorage.getItem("orders")),
            orderId
          );
          if (createOrderToken?.created) {
            const checkout = new Checkout();
            const data = await checkout.init();
            return data;
          }
        } catch (error) {
          throw new Error(err);
        } finally {
          return pageLoader.stopLoader();
        }
      });
    });

    if (products.length > 1) {
      products.forEach((product, indx) => {
        const dividerControll = indx + 1 == products.length;
        const { image, name, price, productId = id } = product;

        const formattedPrice = price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const productElement = document.createElement("li");
        productElement.setAttribute("product-id", productId);
        productElement.classList.add("product-detail");
        productElement.innerHTML = `
        <img src=${image} alt="ft do livro" />
        <span>
          <p class="name">${name}</p>
          <p class="price">${formattedPrice}</p>
        </span>
      `;

        const divider = document.createElement("i");
        divider.classList.add("divider");

        const currentPage = document.querySelector(`div[data-id=${status}]`);
        const listInPage = currentPage.querySelectorAll(".orders  ul li");
        listInPage.forEach((element) => {
          if (element.getAttribute("order-id") === id) {
            element.querySelector("ul.products").appendChild(productElement);
            if (!dividerControll) {
              element.querySelector("ul.products").appendChild(divider);
            }
          }
        });
      });
    } else {
      const { image, name, price, productId = id } = products[0];

      const formattedPrice = price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      const productElement = document.createElement("li");
      productElement.setAttribute("product-id", productId);
      productElement.classList.add("product-detail");
      productElement.innerHTML = `
      <img src=${image} alt="ft do livro" />
      <span>
        <p class="name">${name}</p>
        <p class="price">${formattedPrice}</p>
      </span>
    `;
      const getCurrentElement = document.querySelectorAll(".orders ul li");

      getCurrentElement.forEach((element) => {
        if (element.getAttribute("order-id") === id) {
          element.querySelector("ul.products").appendChild(productElement);
        }
      });
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function setOrdersQuantityPerStatus(orders, elements) {
  return orders.forEach((order) => {
    let orderQuantity = 0;
    const { status } = order;

    const orderStatus = Array.from(elements).filter((element) => {
      return element.getAttribute("data-id") == status;
    });

    if (orderStatus[0]) {
      orderQuantity += 1;
      const element = orderStatus[0];
      element.classList.add("have");
      element.querySelector(".order-quantity").innerText = orderQuantity;
    }
  });
}
