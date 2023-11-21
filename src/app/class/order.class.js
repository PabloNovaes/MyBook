import axios from "../services/axios/axios.js";

export class Order {
  paymentMethod;
  products;
  adressId;

  constructor(paymentMethod, products, adressId) {
    this.paymentMethod = paymentMethod;
    this.products = products;
    this.adressId = adressId;
  }

  async createOrder(data) {
    try {
      const { products } = data;
      if (!data || products.length <= 0) return;
      const response = await axios.post("/order/create-order", data);
      const order = await response.data;
      return order;
    } catch (error) {
      return error;
    }
  }

  async getOrders() {
    try {
      const response = await axios.get("/order/get-orders");
      const data = await response.data;
      return data;
    } catch (error) {
      return error;
    }
  }

  async loadOrderProducts(data) {
    try {
      const products = [];
      for (const product of data) {
        const { id } = product;
        const response = await axios.get(`/products/id=${id}`);
        products.push(response.data);
      }
      return products;
    } catch (error) {
      return error;
    }
  }
}
