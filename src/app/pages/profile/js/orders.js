import { Order } from "../../../class/order.class.js";
const orderList = document.querySelector(".orders ul");

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

export async function renderOrders(order) {
  const methods = {
    card: "Cartão",
    boleto: "Boleto",
  };

  const orderStatus = {
    AWAITING_PAYMENT: "Pendente",
    AWAITING_SENT: "Preparando envio",
  };

  try {
    const { products, paymentMethod, created, status, deliveryAdress, id } =
      order;
    const { street, number, district, city, uf, cep } = deliveryAdress;
    const date = new Date(created).toLocaleString("pt-BR");
    const quantity = products.length;

    const li = document.createElement("li");
    li.setAttribute("order-id", id);
    li.innerHTML = `
    <header>
    <span>
      <p>Pedido com ${quantity} ${quantity > 1 ? "produtos" : "produto"}</p>
      <p>Feito em ${date}</p>
    </span>
    <i class="ph-bold ph-caret-down"></i>
  </header>

  <input type="checkbox" />
  <div class="content">
    <div class="order-datails">
      <span>
        <p>Status</p>
        <p class="status">${orderStatus[status]}</p>
      </span>
      <span>
        <p>Data</p>
        <p>12/11/2023</p>
      </span>
      <span>
        <p>Pagamento</p>
        <p>${methods[paymentMethod]}</p>
      </span>
    </div>

    <div class="adress-order">
    Endereço de entrega:
    ${street}, ${number}, ${district}, ${city}, ${uf}, ${cep}
    </div>

    <ul class="products">
    </ul>
  </div>
    `;

    orderList.appendChild(li);

    if (products.length > 1) {
      products.forEach((product, indx) => {
        const dividerControll = indx + 1 == products.length;
        const { image, name, price } = product;

        const formattedPrice = price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const productElement = document.createElement("li");
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

        const getCurrentElement = document.querySelectorAll(".orders ul li");
        getCurrentElement.forEach((element) => {
          if (element.getAttribute("order-id") === id) {
            element.querySelector("ul.products").appendChild(productElement);
            if (!dividerControll) {
              element.querySelector("ul.products").appendChild(divider);
            }
          }
        });
      });
    } else {
      const { image, name, price } = products[0];

      const formattedPrice = price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      const productElement = document.createElement("li");
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
    throw new Error("Erro inesperado!");
  }
}

export function setOrdersQuantityPerStatus(orders, elements) {
  let orderQuantity = 0;
  return orders.forEach((order) => {
    const { status } = order;

    const orderStatus = Array.from(elements).filter((element) => {
      return element.getAttribute("data-id") == status;
    });

    if (orderStatus != 0) {
      orderQuantity += 1;
      const element = orderStatus[0];
      element.classList.add("have");
      element.querySelector(".order-quantity").innerText = orderQuantity;
    }
  });
}
