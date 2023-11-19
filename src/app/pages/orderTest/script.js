import { Checkout } from "../../class/checkout.class.js";
import { error, setPaymentMethods } from "../../sweetAlert/sweet.js";
const submitBtn = document.querySelector("button");
const KEY =
  "pk_test_51O9cVZF0DgXzIgTTyFmby9sYaoZD0GIQA4udOzugv2ZzvO7sm08sJUH7YW1X5rc00NDozrpbHDUSmP9YpMmCsF1g00NcEpcmB9";

async function setProductsToken() {
  try {
    const products = JSON.parse(localStorage.getItem("Products"));
    if (!products) return alert("sem produtos");
    const checkout = new Checkout();
    const setToken = await checkout.setTokenToProducts(products);
    return console.log(setToken);
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
