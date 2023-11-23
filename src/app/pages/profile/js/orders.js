import { pageLoader } from "../../../components/pageLoader/index.js";
import { Checkout } from "../../../class/checkout.class.js";
import { Order } from "../../../class/order.class.js";
import {
  orderAwaitingPaymentTemplate,
  orderHaveMoreProductsTemplate,
  orderHaveOneProductTemplate,
  communTemplate,
} from "./html-templates.js";

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

export function setOrdersQuantityPerStatus(orders, elements) {
  return orders.forEach((order) => {
    const { status } = order;

    const orderStatus = Array.from(elements).filter((element) => {
      return element.getAttribute("data-id") == status;
    });

    const orderQuantity = orders.filter((order) => {
      return order.status == status;
    });

    const element = orderStatus[0];
    element.classList.add("have");
    element.querySelector(".order-quantity").innerText = orderQuantity.length;
  });
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
      orderHaveMoreProductsTemplate(product, indx, order);
    });
  } else {
    orderHaveOneProductTemplate(products, id);
  }
}
