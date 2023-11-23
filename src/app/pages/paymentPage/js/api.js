import { Order } from "../../../class/order.class.js";
import { Adress } from "../../../class/adress.class.js";

export async function creatOrder(paymentMethod, products, adressId) {
  try {
    const orderClass = new Order(paymentMethod, products, adressId);
    const create = orderClass.createOrder(orderClass);
    return create;
  } catch (error) {
    return error;
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

export async function loadUserAdresses() {
  try {
    const adress = new Adress();
    const reponse = await adress.getAdress();
    const adresses = await reponse;

    return adresses;
  } catch (error) {
    return error;
  }
}
