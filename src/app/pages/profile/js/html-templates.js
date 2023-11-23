const methods = {
  card: "Cartão",
  boleto: "Boleto",
};

const orderStatus = {
  AWAITING_PAYMENT: "Pendente",
  AWAITING_SENT: "Preparando envio",
  ORDER_DISPATCHED: "Pedido enviado",
  EVALUATE_PRODUCT: "Avalie",
};

export const orderHaveOneProductTemplate = (products, id) => {
  const { image, name, price, id: productId } = products[0];

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
};

export const orderAwaitingPaymentTemplate = (order) => {
  const { products, paymentMethod, created, status, deliveryAdress } = order;
  const { street, number, district, city, uf, cep } = deliveryAdress;
  const date = new Date(created).toLocaleString("pt-BR");
  const quantity = products.length;

  return `
  <header>
  <span>
    <p>Pedido com ${quantity} ${quantity > 1 ? "produtos" : "produto"}</p>
    <p>Feito em ${date}</p>
  </span>
  <input type="checkbox" />
  <i class="ph-bold ph-caret-down"></i>
</header>

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
  <footer>
    <button class="pay-now">
    Pagar agora
    </button>
  </footer>
</div>
  `;
};

export const orderHaveMoreProductsTemplate = (
  product,
  indx,
  { products, status, id }
) => {
  const dividerControll = indx + 1 == products.length;
  const { image, name, price, id: productId } = product;

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
};

export const communTemplate = (order) => {
  const { products, paymentMethod, created, status, deliveryAdress } = order;
  const { street, number, district, city, uf, cep } = deliveryAdress;
  const date = new Date(created).toLocaleString("pt-BR");
  const quantity = products.length;

  return `
    <header>
    <span>
      <p>Pedido com ${quantity} ${quantity > 1 ? "produtos" : "produto"}</p>
      <p>Feito em ${date}</p>
    </span>
    <input type="checkbox" />
    <i class="ph-bold ph-caret-down"></i>
  </header>
  
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
};
