import { pageLoader } from "../../../components/pageLoader/index.js";
import { Order } from "../../../class/order.class.js";

export async function creatOrder(paymentMethod, products) {
  try {
    pageLoader.startLoader();
    const orderClass = new Order(paymentMethod, products);
    const create = orderClass.createOrder(orderClass);
    return create;
  } catch (error) {
    return error;
  } finally {
    return pageLoader.stopLoader();
  }
}

export async function loadOrderProducts(data) {
  try {
    const orderClass = new Order();
    return await orderClass.loadOrderProducts(data);
  } catch (error) {
    return error;
  }
}
