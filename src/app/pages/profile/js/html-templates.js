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
