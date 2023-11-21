import { Checkout } from "../../class/checkout.class.js";
import { Order } from "../../class/order.class.js";
import { error } from "../../sweetAlert/sweet.js";
const submitBtn = document.querySelector("button");
const KEY =
  "pk_test_51O9cVZF0DgXzIgTTyFmby9sYaoZD0GIQA4udOzugv2ZzvO7sm08sJUH7YW1X5rc00NDozrpbHDUSmP9YpMmCsF1g00NcEpcmB9";

const order = new Order()

try {
  const orders= await order.getOrders()
} catch (error) {
  console.log(error);
}

async function setProductsToken() {
  try {
    const products = JSON.parse(localStorage.getItem("Products"));
    if (!products) return alert("sem produtos");
    const checkout = new Checkout();
    const setToken = await checkout.setTokenToProducts(products);
    return setToken;
  } catch (error) {
    return error;
  }
}

window.addEventListener("load", setProductsToken);

submitBtn.addEventListener("click", async () => {
  try {
    const checkout = new Checkout();
    const data = await checkout.init();
    return data;
  } catch (err) {
    return error("Ocorreu um erro ao tentar inicialiar o pagamento");
  }
});
