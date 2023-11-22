import axios from "../../../services/axios/axios.js";

export class Checkout {
  async init() {
    try {
      const response = await axios.get("/init-checkout");
      const data = await response.data;

      if (!data) {
        return;
      }
      const { url } = data;
      return (window.location.href = url);
    } catch (err) {
      throw new Error(err);
    }
  }

  async setTokenToProducts({ products, paymentMethod }) {
    try {
      const response = await axios.post("/checkout-token", {
        paymentMethod,
        products,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      throw new Error(`Unxpected error! ${error}`);
    }
  }
}
